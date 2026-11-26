/**
 * Análisis descriptivo de entrenamientos realizados. No modifica resultados ni
 * parámetros del generador. Separación deliberada entre estimación y medición.
 * Sólo compara FOR TIME cuando se han marcado al menos las rondas previstas,
 * el contador se ha detenido por objetivo o manualmente y existe estimación previa guardada.
 */
export const ANALYTICS_MIN_SAMPLES = 5;
export const MODES = Object.freeze([
  ['fortime','FOR TIME'],['amrap','AMRAP'],['emom','EMOM'],['tabata','TABATA']
]);
const EFFORT_RANGES = Object.freeze({controlado:[5,6],productivo:[6,7],exigente:[7,8]});
const average=values=>values.length?values.reduce((a,b)=>a+b,0)/values.length:null;
const finite=n=>typeof n==='number'&&Number.isFinite(n);
function expectedRpe(log,wod){
  const effort=log.targetEffort||wod?.effort;
  if(EFFORT_RANGES[effort])return EFFORT_RANGES[effort];
  // Compatibilidad limitada con WODs antiguos sin campo de intensidad objetivo.
  const value=String(wod?.intensity||'').match(/RPE\s*(\d+)\s*[–-]\s*(\d+)/i);
  if(value&&Number(value[1])>=1&&Number(value[2])<=10)return [Number(value[1]),Number(value[2])];
  return null;
}
export function analyzeTrainingResults(state){
  const logs=Array.isArray(state?.logs)?state.logs.filter(x=>x&&typeof x==='object'):[];
  const candidates=[...(Array.isArray(state?.wods)?state.wods:[]),state?.lastWod].filter(x=>x&&typeof x.id==='string');
  const wods=new Map(candidates.map(w=>[w.id,w]));
  const byMode=MODES.map(([id,label])=>({id,label,count:0,rpes:[],timed:0}));
  const groups=Object.fromEntries(byMode.map(x=>[x.id,x]));
  const observedRpe=[];
  const rpeMatches={within:0,above:0,below:0,unknown:0};
  const comparisons=[];
  let linkedFromCounter=0;
  let recoveryReported=0;
  let impactReported=0;
  let fatigueReported=0;
  let withWeights=0;
  let measuredCount=0;
  const followup={good:0,normal:0,bad:0};
  const impact={none:0,possible:0,clear:0};
  for(const log of logs){
    const mode=String(log.mode||'');
    const group=groups[mode];
    if(group)group.count++;
    const rpe=Number(log.rpe);
    const validRpe=Number.isFinite(rpe)&&rpe>=1&&rpe<=10&&log.rpe!==null&&log.rpe!=='';
    if(validRpe){observedRpe.push(rpe);if(group)group.rpes.push(rpe);}
    const wod=wods.get(log.wodId);
    const range=expectedRpe(log,wod);
    if(validRpe&&range){
      if(rpe<range[0])rpeMatches.below++;
      else if(rpe>range[1])rpeMatches.above++;
      else rpeMatches.within++;
    } else rpeMatches.unknown++;
    const counterLinked=log.source==='contador-wod'&&typeof log.counterRunId==='string'&&!!log.counterRunId;
    if(counterLinked)linkedFromCounter++;
    if(counterLinked&&Number.isSafeInteger(log.counterElapsedMs)&&log.counterElapsedMs>0){measuredCount++;if(group)group.timed++;}
    if(log.weights&&String(log.weights).trim())withWeights++;
    if(['baja','media','alta'].includes(log.preFatigue))fatigueReported++;
    if(['buena','normal','mala'].includes(log.recoveryNext)){
      recoveryReported++;
      if(log.recoveryNext==='buena')followup.good++;
      if(log.recoveryNext==='normal')followup.normal++;
      if(log.recoveryNext==='mala')followup.bad++;
    }
    if(['ninguno','posible','claro'].includes(log.nextSessionImpact)){
      impactReported++;
      if(log.nextSessionImpact==='ninguno')impact.none++;
      if(log.nextSessionImpact==='posible')impact.possible++;
      if(log.nextSessionImpact==='claro')impact.clear++;
    }
    // Comparación estricta: no equiparar una pausa o CAP con el tiempo de
    // finalización real. Vueltas marcadas no prueban ejecución correcta;
    // esto es un indicador de registro, no validación fisiológica.
    const estimate=wod?.stimulusReport?.expectedMinutes;
    const expectedRounds=Number(wod?.rounds);
    if(counterLinked&&mode==='fortime'&&['manual','goal'].includes(log.counterFinishReason)&&
       Number.isFinite(estimate)&&estimate>=1&&estimate<=180&&
       Number.isSafeInteger(log.counterElapsedMs)&&log.counterElapsedMs>=30_000&&
       Number.isFinite(expectedRounds)&&expectedRounds>=1&&
       Number.isFinite(Number(log.counterRounds))&&Number(log.counterRounds)===expectedRounds){
      const actual=log.counterElapsedMs/60_000;
      comparisons.push({wodId:log.wodId,date:log.date||'',title:log.title||wod?.title||'FOR TIME',
        predictedMinutes:estimate,observedMinutes:Math.round(actual*10)/10,
        differenceMinutes:Math.round((actual-estimate)*10)/10,
        differencePercent:Math.round((actual-estimate)/estimate*100),
        countedRounds:Number(log.counterRounds),expectedRounds});
    }
  }
  const matches=rpeMatches.within+rpeMatches.above+rpeMatches.below;
  return {
    total:logs.length,linkedFromCounter,measuredCount,averageRpe:average(observedRpe),
    withWeights,fatigueReported,recoveryReported,impactReported,followup,impact,
    rpeMatches:{...rpeMatches,comparable:matches},
    byMode:byMode.map(({id,label,count,rpes,timed})=>({id,label,count,timed,averageRpe:average(rpes)})),
    comparisons:comparisons.sort((a,b)=>String(b.date).localeCompare(String(a.date))),
    enoughForReview:logs.length>=ANALYTICS_MIN_SAMPLES,
    // No se utiliza para actualizar la selección: exclusivamente informe.
    proposedChangesApplied:false
  };
}
