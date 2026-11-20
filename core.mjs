// Generador WOD beta — motor local, independiente de la interfaz y sin servicios externos.
export const VERSION = '1.0.9-beta';
export const EQUIPMENT_GROUPS = [
 {title:'Máquinas',items:[['airbike','Assault / Echo Bike'],['bikeerg','BikeErg'],['skierg','SkiErg'],['rowerg','RowErg / remo'],['treadmill','Cinta de correr']]},
 {title:'Pesos y cargas',items:[['db','Mancuernas (DB)'],['kb','Kettlebells (KB)'],['barbell','Barra olímpica'],['plates','Discos bumper'],['rack','Rack para sentadillas'],['sandbag','Sandbag'],['wallball','Wall Ball'],['medball','Balón medicinal']]},
 {title:'Gimnasia y estructuras',items:[['rig','Estructura de dominadas'],['rings','Anillas'],['ropeclimb','Cuerda de trepa'],['dipbars','Paralelas / barras de fondos'],['ghd','GHD'],['wall','Pared para HSPU']]},
 {title:'Funcional y accesorios',items:[['jumprope','Comba'],['box','Cajón'],['sled','Trineo'],['bands','Bandas elásticas'],['bench','Banco'],['abmat','AbMat'],['mat','Esterilla']]},
 {title:'Espacios',items:[['run','Pista / espacio para correr'],['floor','Espacio libre para burpees'],['carry','Espacio para desplazamientos'],['outdoor','Zona exterior']]}
];
export const EQUIPMENT = Object.fromEntries(EQUIPMENT_GROUPS.flatMap(group => group.items));
export const SKILLS = [
 ['pullup','Dominadas'],['ttb','Toes to Bar'],['c2b','Chest to Bar'],['bmu','Bar Muscle-up'],['rmu','Ring Muscle-up'],['hspu','Handstand Push-up'],['rope','Rope Climb'],['du','Double Unders'],['olympic','Levantamientos olímpicos']
];
// req: todos los implementos indicados. patterns: estímulos prioritarios. tier: 1/2/3.
export const MOVEMENTS = [
 ['airsquat','Air Squat',[],['squat'],1,'reps'],['lunges','Reverse Lunges',[],['squat'],1,'reps'],['burpees','Burpees',[],['push','cardio'],1,'reps'],['pushups','Push-ups',[],['push'],1,'reps'],['situps','Sit-ups',[],['core'],1,'reps'],['plank','Plank',[],['core'],1,'sec'],['mountain','Mountain Climbers',[],['core','cardio'],1,'reps'],['jumping','Jumping Jacks',[],['cardio'],1,'reps'],
 ['running','Running',['run'],['cardio','legs'],1,'meters'],['shuttle','Shuttle Runs',['carry'],['cardio','legs'],1,'meters'],
 ['dbsnatch','Alternating DB Snatch',['db'],['hinge','overhead'],2,'reps'],['dbthruster','DB Thruster',['db'],['squat','overhead'],2,'reps'],['dbdeadlift','DB Deadlift',['db'],['hinge'],1,'reps'],['dbpushpress','DB Push Press',['db'],['overhead'],2,'reps'],['dblob','DB Front Rack Lunges',['db'],['squat'],2,'reps'],['dbcarry','DB Farmer Carry',['db','carry'],['grip','core'],1,'meters'],
 ['kbswing','KB Swing',['kb'],['hinge'],2,'reps'],['kbgoblet','Goblet Squat',['kb'],['squat'],1,'reps'],['kbdeadlift','KB Deadlift',['kb'],['hinge'],1,'reps'],['kbclean','KB Clean',['kb'],['hinge','pull'],2,'reps'],
 ['deadlift','Barbell Deadlift',['barbell','plates'],['hinge'],2,'reps'],['frontsquat','Front Squat',['barbell','plates'],['squat'],2,'reps'],['backsquat','Back Squat',['barbell','plates','rack'],['squat'],2,'reps'],['powerclean','Power Clean',['barbell','plates'],['hinge','pull'],3,'reps','olympic'],['powersnatch','Power Snatch',['barbell','plates'],['hinge','overhead'],3,'reps','olympic'],['barthruster','Barbell Thruster',['barbell','plates'],['squat','overhead'],2,'reps'],['pushpress','Barbell Push Press',['barbell','plates'],['overhead'],2,'reps'],
 ['pullups','Pull-ups',['rig'],['pull','grip'],2,'reps','pullup'],['kneeraises','Hanging Knee Raises',['rig'],['core','grip'],2,'reps'],['ttb','Toes to Bar',['rig'],['core','grip'],3,'reps','ttb'],['c2b','Chest to Bar',['rig'],['pull','grip'],3,'reps','c2b'],['bmu','Bar Muscle-ups',['rig'],['pull','push','grip'],3,'reps','bmu'],['ringrows','Ring Rows',['rings'],['pull'],1,'reps'],['ringdips','Ring Dips',['rings'],['push'],2,'reps'],['rmu','Ring Muscle-ups',['rings'],['pull','push'],3,'reps','rmu'],['ropeclimb','Rope Climb',['ropeclimb'],['pull','grip'],3,'climbs','rope'],['hspu','Handstand Push-ups',['wall'],['overhead','push'],3,'reps','hspu'],
 ['singles','Single Unders',['jumprope'],['cardio'],1,'reps'],['doubles','Double Unders',['jumprope'],['cardio'],3,'reps','du'],['boxsteps','Box Step-ups',['box'],['squat'],1,'reps'],['boxjumps','Box Jumps',['box'],['squat','cardio'],2,'reps'],
 ['row','RowErg',['rowerg'],['cardio','pull'],1,'cals'],['ski','SkiErg',['skierg'],['cardio','pull'],1,'cals'],['bike','Air Bike',['airbike'],['cardio','legs'],1,'cals'],['bikeerg','BikeErg',['bikeerg'],['cardio','legs'],1,'cals'],
 ['wallballs','Wall Balls',['wallball'],['squat','overhead'],2,'reps'],['medball','Med Ball Cleans',['medball'],['hinge','squat'],2,'reps'],['sandbag','Sandbag Clean',['sandbag'],['hinge','pull'],2,'reps'],['sled','Sled Push',['sled','carry'],['legs'],2,'meters']
].map(([id,name,req,patterns,tier,unit,skill])=>({id,name,req,patterns,tier,unit,skill:skill||null}));
export const PATTERN_NAMES = {squat:'Piernas (sentadilla)',legs:'Piernas / carrera',hinge:'Cadena posterior',pull:'Tracción',push:'Empuje',overhead:'Hombros / overhead',grip:'Agarre',core:'Core',cardio:'Cardio'};
// 1.0.9: parámetros opcionales compatibles con las copias de versiones anteriores.
export const DEFAULT_READINESS = Object.freeze({fatigue:'media',soreness:'ninguna',effort:'productivo'});
export function normalizeReadiness(value){
 const raw=value&&typeof value==='object'?value:{};
 return {fatigue:['baja','media','alta'].includes(raw.fatigue)?raw.fatigue:'media',
  soreness:['ninguna','piernas','hombros','lumbar','tronco'].includes(raw.soreness)?raw.soreness:'ninguna',
  effort:['controlado','productivo','exigente'].includes(raw.effort)?raw.effort:'productivo'};
}
export const DEFAULT_STATE = () => ({version:VERSION,profiles:[{id:'principal',name:'Mi material',equipment:{}}],activeProfile:'principal',skills:[],plan:[],wods:[],logs:[],lastWod:null,lastRecommendation:null,readiness:normalizeReadiness()});
export function sanitizeState(raw) {
 const d=DEFAULT_STATE(); if(!raw||typeof raw!=='object')return d;
 const profiles=Array.isArray(raw.profiles)?raw.profiles.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&p.equipment&&typeof p.equipment==='object').slice(0,15):[];
 return {version:VERSION,profiles:profiles.length?profiles:d.profiles,activeProfile:typeof raw.activeProfile==='string'?raw.activeProfile:d.activeProfile,skills:Array.isArray(raw.skills)?raw.skills.filter(x=>SKILLS.some(s=>s[0]===x)):[],plan:Array.isArray(raw.plan)?raw.plan.filter(p=>p&&isISODate(p.date)&&typeof p.title==='string').slice(0,1000):[],wods:Array.isArray(raw.wods)?raw.wods.filter(w=>w&&Array.isArray(w.movements)).slice(0,1000):[],logs:Array.isArray(raw.logs)?raw.logs.filter(w=>w&&typeof w.date==='string').slice(0,2000):[],lastWod:raw.lastWod&&Array.isArray(raw.lastWod.movements)&&raw.lastWod.kind!=='recovery'?raw.lastWod:null,lastRecommendation:raw.lastRecommendation?.kind==='recovery'&&Array.isArray(raw.lastRecommendation.movements)?raw.lastRecommendation:null,readiness:normalizeReadiness(raw.readiness)};
}
export function isISODate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;}
export function daysApart(a,b){const x=Date.parse(a+'T12:00:00Z'),y=Date.parse(b+'T12:00:00Z');return Number.isFinite(x)&&Number.isFinite(y)?Math.round((x-y)/86400000):Infinity;}
const rules=[
 ['overhead',/snatch|overhead|thruster|push.press|shoulder.press|handstand|hspu|jerk|wall.ball/i],
 ['squat',/squat|lunge|thruster|wall.ball|box.jump|step.up|front.rack/i],
 ['hinge',/deadlift|clean|snatch|swing|good.morning|hinge|peso muerto/i],
 ['pull',/pull.up|pullup|chest.to.bar|c2b|muscle.up|rope.climb|row|remo|dominada|toes.to.bar|ttb/i],
 ['push',/push.up|burpee|dip|press|hspu|muscle.up|flexion/i],
 ['grip',/pull.up|toes.to.bar|ttb|hang|rope|farmer|deadlift|grip|agarre/i],
 ['legs',/run|correr|running|bike|burpee|jump|box|lunge|squat|sentadilla/i],
 ['core',/sit.up|plank|toes.to.bar|ttb|hollow|abmat|core|abdominal/i],
 ['cardio',/run|row|remo|bike|ski|burpee|jump|comba|carrera|assault/i]
];
export function inferPatterns(input){const text=String(input||'');return rules.filter(([,r])=>r.test(text)).map(([id])=>id);}
// La estimación de fatiga NO sustituye a una medición de recuperación real.
// +1 significa sesión oficial mañana, -1 significa sesión oficial ayer.
export function getStress(plan,logs,date){
 const scores={}; const details=[];
 for(const p of plan){
  const offset=daysApart(p.date,date); const diff=Math.abs(offset);
  if(diff>2)continue;
  // Mayor protección de la próxima sesión oficial que de la ya realizada.
  const base=offset===0?3.4:offset===1?2.7:offset===-1?2.1:offset===2?1.0:0.75;
  const rpe=Math.max(1,Math.min(10,Number(p.rpe)||7));
  const weight=base*(rpe/7);
  const patterns=inferPatterns(`${p.title} ${p.movements||''}`);
  for(const pattern of patterns)scores[pattern]=(scores[pattern]||0)+weight;
  details.push({date:p.date,title:p.title,source:'Planificación',patterns,rpe,offset,weight});
 }
 for(const l of logs){
  const offset=daysApart(l.date,date);
  if(offset>0||offset< -2)continue; // No anticipamos resultados de fechas futuras.
  const diff=Math.abs(offset);
  const base=diff===0?2.8:diff===1?2.2:0.7;
  const rpe=Math.max(1,Math.min(10,Number(l.rpe)||7));
  const weight=base*(rpe/7);
  const patterns=Array.isArray(l.patterns)&&l.patterns.length?l.patterns:inferPatterns(l.movementsText||'');
  for(const pattern of patterns)scores[pattern]=(scores[pattern]||0)+weight;
  details.push({date:l.date,title:l.title||'WOD registrado',source:'Registro',patterns,rpe,offset,weight});
 }
 return {scores,details};
}
// Evaluamos el riesgo de forma conservadora. Si la información es insuficiente
// no afirmamos que la propuesta esté libre de interferencias.
export function assessIntelligentDay(stress){
 const official=stress.details.filter(d=>d.source==='Planificación');
 const before=official.filter(d=>d.offset===-1);
 const after=official.filter(d=>d.offset===1);
 const today=official.filter(d=>d.offset===0);
 const logs=stress.details.filter(d=>d.source==='Registro'&&d.offset>=-1);
 const overlaps=new Set(before.flatMap(d=>d.patterns).filter(p=>after.some(d=>d.patterns.includes(p))));
 const highPatterns=Object.entries(stress.scores).filter(([,v])=>v>=3.7).map(([p])=>p);
 const recentVeryHard=logs.some(d=>d.rpe>=9);
 const tomorrowHard=after.some(d=>d.rpe>=8&&d.patterns.length>=3);
 const denseBothSides=before.length>0&&after.length>0&&(
  overlaps.size>=2 || highPatterns.length>=3 || (before.some(d=>d.rpe>=7)&&after.some(d=>d.rpe>=7))
 );
 const sameDay=today.some(d=>d.rpe>=7);
 const shouldRecover=denseBothSides||sameDay||(recentVeryHard&&after.length>0)||tomorrowHard&&recentVeryHard;
 let reason='';
 if(denseBothSides)reason='Hay sesiones oficiales exigentes a ambos lados de esta fecha; añadir un WOD podría comprometer la recuperación para la siguiente sesión.';
 else if(sameDay)reason='Ya hay una sesión oficial de intensidad moderada-alta programada para hoy.';
 else if(recentVeryHard&&after.length)reason='Consta un entrenamiento reciente con RPE muy alto y hay otra sesión oficial próxima.';
 const keySessions=[...before,...today,...after].map(d=>`${d.date} · ${d.title}`).slice(0,3);
 return {shouldRecover,reason,keySessions,highPatterns,closeOfficial:official.some(d=>Math.abs(d.offset)<=1)};
}
function recoveryRecommendation(date,level,objective,stress,assessment){
 const key=assessment.keySessions.join(' | ');
 const hot=assessment.highPatterns.map(p=>PATTERN_NAMES[p]||p).slice(0,4);
 return {
  id:`recovery-${date}`,kind:'recovery',date,mode:'recuperacion',strategy:'inteligente',
  level,objective,title:'Priorizar recuperación',movements:[
   {name:'Movilidad suave sin fatiga adicional',amount:'8–10 min'},
   {name:'Caminar tranquilo o respiración relajada',amount:'5 min (opcional)'}
  ],intensity:'RPE 2–4/10, sin buscar fatiga',profileName:'Sin material obligatorio',
  advice:'No se propone un WOD extra con carga. La sesión de recuperación es opcional; también puedes descansar completamente.',
  notes:`${assessment.reason} ${hot.length?'Patrones a proteger: '+hot.join(', ')+'. ':''}${key?'Sesiones consideradas: '+key+'. ':''}La programación y el RPE son estimaciones: confirma tu recuperación real.`,
  patterns:[],createdAt:new Date().toISOString()
 };
}
// Patrones auxiliares: el movimiento puede fatigar zonas adicionales aunque no
// sean su patrón principal (ej.: hombros en swing y empujes, agarre en deadlift).
const SECONDARY_PATTERNS={
 pushups:{overhead:0.6},plank:{push:0.65,overhead:0.5},burpees:{legs:0.7,overhead:0.4},
 kbswing:{grip:0.7,overhead:0.35},kbclean:{grip:0.8},
 dbdeadlift:{grip:0.7},dbsnatch:{grip:0.7},
 mountain:{push:0.5},dblob:{core:0.35}
};
function movementStress(m,stress){
 let score=m.patterns.reduce((n,p)=>n+(stress.scores[p]||0),0);
 for(const [p,f] of Object.entries(SECONDARY_PATTERNS[m.id]||{}))score+=(stress.scores[p]||0)*f;
 return score;
}
function smartAllowed(m,stress){
 // Un patrón cargado ayer o previsto mañana debe evitarse, no solo penalizarse.
 if(m.patterns.some(p=>(stress.scores[p]||0)>=1.9))return false;
 const secondary=SECONDARY_PATTERNS[m.id]||{};
 if(Object.entries(secondary).some(([p,mult])=>(stress.scores[p]||0)*mult>=1.75))return false;
 // Movimientos olímpicos y complejos de alta exigencia no son buen extra
 // próximo a las sesiones oficiales salvo baja carga observada.
 if(m.tier>=3&&stress.details.some(d=>Math.abs(d.offset)<=1))return false;
 return true;
}
export function eligibleMovements(profile,skills=[],level='intermedio'){
 const tiers={principiante:1,intermedio:2,avanzado:3};const allowed=tiers[level]||2;
 return MOVEMENTS.filter(m=>m.tier<=allowed&&m.req.every(e=>profile?.equipment?.[e]?.enabled)&&(!m.skill||skills.includes(m.skill)));
}
// v1.0.3: reglas heurísticas de equilibrio, sin prometer una carga personalizada.
const MAIN_PATTERNS=['squat','hinge','overhead'];
const TABATA_SAFE=new Set([
 'airsquat','lunges','burpees','pushups','situps','plank','mountain','jumping',
 'singles','doubles','boxsteps','row','ski','bike','bikeerg'
]);
// Estimaciones aproximadas para construir estaciones de 25–45 s; no son predicciones individuales.
const SEC_PER_REP={airsquat:1.9,lunges:2.4,burpees:4.6,pushups:2.7,situps:2.7,
 mountain:1.2,jumping:1.0,dbsnatch:3.6,dbthruster:4.2,dbdeadlift:2.8,
 dbpushpress:3.3,dblob:3.8,kbswing:2.8,kbgoblet:2.9,kbdeadlift:2.9,kbclean:3.7,
 deadlift:4.0,frontsquat:4.0,backsquat:4.2,powerclean:5.0,powersnatch:5.0,
 barthruster:4.5,pushpress:3.8,pullups:3.0,kneeraises:2.7,ttb:3.2,
 c2b:3.4,bmu:5.0,ringrows:3.2,ringdips:3.6,rmu:5.5,hspu:4.5,
 singles:0.6,doubles:0.8,boxsteps:3.0,boxjumps:3.5,
 wallballs:3.1,medball:3.5,sandbag:4.2};
const LOW_REP_CAP=new Set(['deadlift','frontsquat','backsquat','powerclean','powersnatch','barthruster','pushpress','bmu','rmu','hspu']);
function stationDose(m,level){
 const aim=level==='principiante'?29:level==='avanzado'?39:35;
 if(m.unit==='climbs')return null; // Ascensos no son comparables con estaciones de un minuto.
 if(m.unit==='sec')return {amount:`${aim} s`,estimate:aim};
 if(m.unit==='meters'){
  const speed=m.id==='running'?3.5:m.id==='shuttle'?2.7:1.3;
  const distance=Math.max(20,Math.round(aim*speed/10)*10);
  return {amount:`${distance} m`,estimate:Math.round(distance/speed)};
 }
 if(m.unit==='cals'){
  const cals=Math.max(5,Math.round(aim/3.5));
  return {amount:`${cals} cal`,estimate:Math.round(cals*3.5)};
 }
 const per=SEC_PER_REP[m.id]||3.3;
 let reps=Math.max(3,Math.round(aim/per));
 const cap=LOW_REP_CAP.has(m.id)?10:m.id==='burpees'?12:m.id==='singles'?85:m.id==='doubles'?50:m.id==='jumping'||m.id==='mountain'?60:22;
 reps=Math.min(cap,reps);
 if(m.id==='singles')reps=Math.max(10,Math.round(reps/5)*5);
 if(m.id==='doubles')reps=Math.max(5,Math.round(reps/5)*5);
 const estimate=Math.round(reps*per);
 return estimate>=25&&estimate<=45?{amount:`${reps} reps`,estimate}:null;
}
export function makeAmount(m,mode,duration,level){
 if(mode==='tabata')return '20 s';
 if(mode==='emom')return stationDose(m,level)?.amount||'—';
 const i=level==='principiante'?0:level==='avanzado'?2:1;
 const spec={reps:[8,10,12],sec:[20,30,35],meters:[100,150,200],cals:[6,9,12],climbs:[1,1,2]};
 let amount=spec[m.unit]?.[i]||10;
 if(m.unit==='reps'&&LOW_REP_CAP.has(m.id))amount=Math.min(amount,level==='avanzado'?10:8);
 if(m.id==='burpees')amount=level==='principiante'?6:level==='avanzado'?12:9;
 if(m.id==='jumping')amount=level==='principiante'?30:level==='avanzado'?60:45;
 if(m.id==='mountain')amount=level==='principiante'?24:level==='avanzado'?45:36;
 if(m.id==='singles')amount=level==='principiante'?30:level==='avanzado'?60:45;
 if(m.id==='doubles')amount=level==='avanzado'?35:20;
 if(m.id==='running')amount=mode==='fortime'?200:150;
 if(mode==='fortime'&&m.unit==='reps'&&!LOW_REP_CAP.has(m.id))amount=Math.max(5,Math.round(amount*1.15));
 return `${amount} ${m.unit==='meters'?'m':m.unit==='cals'?'cal':m.unit==='sec'?'s':m.unit==='climbs'?'ascensos':'reps'}`;
}
function chooseWeighted(pool,rng){const weights=pool.map(o=>Math.max(0.001,o.weight));const total=weights.reduce((a,b)=>a+b,0);let n=Math.max(0,Math.min(.999999,Number(rng())||0))*total;for(let i=0;i<pool.length;i++){n-=weights[i];if(n<=0)return pool[i];}return pool[pool.length-1];}
function isLoaded(m){return m.req.some(id=>['db','kb','barbell','sandbag','medball','wallball'].includes(id));}
function hasDomain(m,domain){
 if(domain==='cardio')return m.patterns.includes('cardio');
 if(domain==='carga')return isLoaded(m);
 if(domain==='core')return m.patterns.includes('core')||m.patterns.includes('pull')||m.patterns.includes('push');
 if(domain==='gimnasia')return m.patterns.includes('pull')||m.patterns.includes('core')||m.patterns.includes('push');
 if(domain==='piernas')return m.patterns.includes('squat')||m.patterns.includes('hinge');
 return true;
}
function compatible(m,selected){
 if(selected.some(x=>x.id===m.id))return false;
 // Nunca duplicar el mismo patrón de fuerza dominante dentro de un WOD.
 if(selected.some(x=>MAIN_PATTERNS.some(p=>m.patterns.includes(p)&&x.patterns.includes(p))))return false;
 // No duplicar la misma tarea aislada de core cuando haya alternativas.
 if(m.patterns.length===1&&m.patterns[0]==='core'&&selected.some(x=>x.patterns.length===1&&x.patterns[0]==='core'))return false;
 return true;
}
function selectBalanced(pool,target,objective,strategy,stress,rng){
 const priorities=objective==='cardio'?['cardio','core','cardio','carga']:
 objective==='gimnasia'?['gimnasia','cardio','core','carga']:
 objective==='fuerza-resistencia'?['carga','core','cardio','piernas']:
 ['cardio','carga','core','any'];
 const selected=[];
 for(let i=0;i<Math.min(target,pool.length);i++){
  const available=pool.filter(m=>compatible(m,selected));
  if(!available.length)break;
  const wanted=priorities[i]||'any';
  const filtered=available.filter(m=>hasDomain(m,wanted));
  const candidates=filtered.length?filtered:available;
  const options=candidates.map(m=>{
   // Patrones secundarios cuentan como penalización de redundancia, no como veto total.
   const overlap=selected.reduce((sum,x)=>sum+m.patterns.filter(p=>x.patterns.includes(p)).length,0);
   const stressWeight=strategy==='inteligente'?movementStress(m,stress):0;
   const secondaryLoad=selected.filter(x=>isLoaded(x)).length;
   return {m,weight:1/(1+overlap*2.5+stressWeight*1.5+(isLoaded(m)?secondaryLoad*.7:0))};
  });
  selected.push(chooseWeighted(options,rng).m);
 }
 return selected;
}
function tabataLayout(minutes){
 // Cada bloque consta de 8×(20 s trabajo + 10 s descanso) = 4 min.
 // Permitir 30–120 s de recuperación entre bloques, con duración resultante explícita.
 const requested=minutes*60;
 const designs=[];
 for(let blocks=1;blocks<=Math.min(5,Math.floor(requested/240));blocks++){
  for(let rest=blocks===1||blocks===2?0:30;rest<=(blocks===1?0:120);rest+=10){
   const total=blocks*240+(blocks-1)*rest;
   if(total>requested)continue;
   const delta=requested-total;
   const preferred=blocks===1?0:Math.abs(rest-75)/80;
   designs.push({blocks,rest,total,rank:delta+preferred});
  }
 }
 if(!designs.length)throw new Error('TABATA requiere al menos 4 minutos.');
 designs.sort((a,b)=>a.rank-b.rank||b.blocks-a.blocks);
 return designs[0];
}
function safeSmartAmount(m,mode,duration,level,stress){
 const normal=makeAmount(m,mode,duration,level);
 if(mode==='tabata'||mode==='emom')return normal;
 // Control de dosis: el número de rondas puede multiplicar el volumen.
 if(m.unit!=='reps')return normal;
 let n=Number.parseInt(normal,10);
 if(!Number.isFinite(n))return normal;
 const near=movementStress(m,stress)>0.9;
 // FOR TIME inteligente = 3 rondas: máximo 24–30 reps de movimientos
 // exigentes, incluso en días con carga cercana.
 const maxPerRound=mode==='fortime'?(m.patterns.includes('push')||m.patterns.includes('overhead')||m.patterns.includes('hinge')?8:10):
  (m.patterns.includes('overhead')||m.patterns.includes('hinge')?10:14);
 n=Math.min(n,maxPerRound);
 if(near)n=Math.max(4,Math.round(n*0.7));
 return `${n} reps`;
}

// v1.0.7: optimizar estímulo útil / coste de fatiga tras confirmar la alerta.
// Heurística, NO predicción de recuperación ni garantía de compatibilidad.
// Combina restricciones duras (movimientos demasiado agresivos) y penalizaciones
// suaves (permitir trabajo dosificado cuando comparte una capacidad).
const SUPPLEMENTARY_CORE = [
 {id:'hollowhold_extra',name:'Hollow Hold',req:[],patterns:['core'],tier:2,unit:'sec',family:'estabilidad'},
 {id:'reversecrunch_extra',name:'Reverse Crunch controlado',req:[],patterns:['core'],tier:1,unit:'reps',family:'flexión'},
 {id:'deadbug_extra',name:'Dead Bug contralateral',req:[],patterns:['core'],tier:1,unit:'reps',family:'control'}
];
const CORE_FAMILY={situps:'flexión',plank:'estabilidad',hollowhold_extra:'estabilidad',reversecrunch_extra:'flexión',deadbug_extra:'control'};
const EXTRA_COMPLEX_EXCLUDED=new Set([
 'deadlift','frontsquat','backsquat','powerclean','powersnatch','barthruster','pushpress',
 'wallballs','sled','ropeclimb','bmu','rmu','hspu','dbsnatch','dbthruster','dbpushpress','kbclean'
]);
const EXTRA_IMPACT=new Set(['running','shuttle','boxjumps','burpees','mountain','doubles']);
const EXTRA_EXPLOSIVE=new Set(['kbswing','medball','sandbag']);
const EXTRA_TABATA=new Set(['situps','deadbug_extra','reversecrunch_extra','hollowhold_extra','singles','jumping','airsquat','lunges','pushups','plank','bike','bikeerg','row','ski']);
function chooseFrom(items,rng){
 const n=Number(rng());return items[Math.max(0,Math.min(items.length-1,Math.floor((Number.isFinite(n)?n:0)*items.length)))];
}
function stimulusDomain(m){
 if(m.patterns.includes('cardio'))return 'cardio';
 if(isLoaded(m))return 'carga';
 if(m.patterns.includes('core'))return 'core';
 if(m.patterns.includes('pull'))return 'traccion';
 if(m.patterns.includes('push'))return 'empuje';
 if(m.patterns.includes('squat'))return 'piernas';
 return 'otro';
}
function extraFatigueRisk(m,stress){
 // La fatiga cardiovascular no implica por sí misma que toda actividad aeróbica
 // deba prohibirse. Se modula por impacto y dosis, sin ocultar el solapamiento.
 const cardioFactor=['singles','bikeerg','bike','row','ski'].includes(m.id)?0.45:0.60;
 let risk=0;
 for(const p of m.patterns){
  const factor=p==='cardio'?cardioFactor:p==='overhead'?1.25:p==='core'?0.7:p==='grip'?0.75:1;
  risk+=(stress.scores[p]||0)*factor;
 }
 for(const [p,f] of Object.entries(SECONDARY_PATTERNS[m.id]||{}))risk+=(stress.scores[p]||0)*f;
 if(isLoaded(m))risk+=0.35;
 return risk;
}
function extraCandidateAllowed(m,stress,mode){
 if(m.tier>2||EXTRA_COMPLEX_EXCLUDED.has(m.id))return false;
 if(mode==='tabata'&&!EXTRA_TABATA.has(m.id))return false;
 if(m.unit==='climbs')return false;
 if((stress.scores.overhead||0)>=3.4&&(m.patterns.includes('overhead')||m.id==='plank'))return false;
 if((stress.scores.squat||0)>=3.4&&m.patterns.includes('squat'))return false;
 if((stress.scores.push||0)>=2.5&&(m.patterns.includes('push')||m.id==='mountain'))return false;
 if((stress.scores.legs||0)>=3.4&&EXTRA_IMPACT.has(m.id))return false;
 if((stress.scores.hinge||0)>=1.9&&EXTRA_EXPLOSIVE.has(m.id))return false;
 if((stress.scores.grip||0)>=3.5&&m.patterns.includes('grip'))return false;
 return extraFatigueRisk(m,stress)<=4.25;
}
// Las tres opciones modifican dosis y tiempo, no sólo la etiqueta de RPE.
// Son objetivos subjetivos: la respuesta real depende de la capacidad y la carga elegida.
function extraDose(m,mode,level,stress,effort='productivo'){
 const dose=(controlled,productive,challenging)=>effort==='exigente'?challenging:effort==='controlado'?controlled:productive;
 if(mode==='tabata')return {amount:'20 s',estimateSeconds:20};
 if(m.id==='hollowhold_extra')return {amount:dose('25–30 s','30–35 s','35–40 s'),estimateSeconds:dose(28,33,38)};
 if(m.id==='plank')return {amount:dose('25–30 s','30–35 s','35–40 s'),estimateSeconds:dose(28,33,38)};
 if(m.id==='deadbug_extra')return {amount:dose('12 reps (6/6) controladas','14 reps (7/7) controladas','16 reps (8/8) controladas'),estimateSeconds:dose(35,39,44)};
 if(m.id==='reversecrunch_extra')return {amount:dose('12 reps controladas','14 reps controladas','16 reps controladas'),estimateSeconds:dose(33,38,43)};
 if(m.id==='situps')return {amount:`${dose(12,14,16)} reps`,estimateSeconds:dose(33,38,43)};
 if(m.id==='singles')return {amount:`${mode==='emom'?dose(50,60,65):dose(45,65,80)} reps`,estimateSeconds:mode==='emom'?dose(30,36,39):dose(27,39,48)};
 if(m.id==='jumping')return {amount:`${mode==='emom'?dose(35,40,45):dose(30,40,50)} reps`,estimateSeconds:mode==='emom'?dose(35,40,45):dose(30,40,50)};
 if(m.id==='dbdeadlift'||m.id==='kbdeadlift')return {amount:`${dose(8,10,12)} reps · ${effort==='exigente'?'carga moderada':'carga ligera'} (sin fallo)`,estimateSeconds:dose(24,30,36)};
 if(m.id==='dbcarry')return {amount:`${dose(30,40,50)} m · carga moderada`,estimateSeconds:dose(30,38,44)};
 if(m.unit==='cals')return {amount:`${mode==='emom'?dose(7,8,9):dose(7,9,11)} cal · ritmo ${effort==='exigente'?'vivo':'controlado'}`,estimateSeconds:mode==='emom'?dose(31,36,40):dose(31,39,45)};
 if(m.id==='pushups')return {amount:`${dose(8,10,12)} reps con margen`,estimateSeconds:dose(25,31,37)};
 if(m.id==='airsquat'||m.id==='lunges')return {amount:`${dose(10,12,14)} reps totales`,estimateSeconds:dose(27,32,38)};
 const normal=makeAmount(m,mode,12,level);
 const station=stationDose(m,level);
 return {amount:normal,estimateSeconds:station?.estimate||30};
}
function chooseStimulusCandidates(candidates,objective,stress,mode,rng){
 const domains=objective==='cardio'?['cardio','core','carga']:
  objective==='fuerza-resistencia'?['carga','cardio','core']:
  objective==='gimnasia'?['core','cardio','carga']:
  ['cardio','core','carga'];
 // Si el modo exige un bloque por estación, respetar los bloques disponibles.
 const target=mode==='tabata'?3:3;
 const selected=[];
 for(const domain of domains){
  if(selected.length>=target)break;
  const options=candidates.filter(m=>stimulusDomain(m)===domain&&!selected.some(x=>x.id===m.id));
  if(!options.length)continue;
  const sorted=options.map(m=>{
   const risk=extraFatigueRisk(m,stress);
   // Preferencia por trabajo medible; penalizar coste elevado sin prohibir
   // automáticamente la capacidad aeróbica o una carga pequeña.
   const fatigue=mode==='tabata'&&domain==='carga'?10:risk;
   return {m,score:fatigue+Math.max(0,m.tier-1)*0.22};
  }).sort((a,b)=>a.score-b.score);
  const best=sorted[0].score;
  const near=sorted.filter(x=>x.score<=best+0.55).map(x=>x.m);
  selected.push(chooseFrom(near,rng));
 }
 // Si no existen tres dominios distintos, permitir segundo trabajo de core
 // de familia diferente, pero nunca declarar que un WOD sólo de core es mixto.
 if(selected.length<target){
  const remaining=candidates.filter(m=>!selected.some(x=>x.id===m.id)).sort((a,b)=>extraFatigueRisk(a,stress)-extraFatigueRisk(b,stress));
  for(const m of remaining){
   if(selected.length>=target)break;
   const group=stimulusDomain(m);
   if(selected.some(x=>group==='cardio'&&stimulusDomain(x)==='cardio'))continue;
   if(group==='core'&&selected.some(x=>stimulusDomain(x)==='core'&&(CORE_FAMILY[x.id]||'core')===(CORE_FAMILY[m.id]||'core')))continue;
   if(group==='carga'&&selected.some(x=>stimulusDomain(x)==='carga'))continue;
   selected.push(m);
  }
 }
 return selected;
}
// v1.0.9 — Evaluación de volumen por patrón y selección multi-candidata.
// Todos los pesos son unidades heurísticas de entrenamiento; no son valores
// fisiológicos ni predicciones de lesiones, DOMS o rendimiento.
const BASE_PATTERN_BUDGET={cardio:21,core:12,squat:10,legs:12,hinge:11,pull:10,push:9,overhead:7,grip:10};
const MOVEMENT_UNIT_COST={
 singles:0.015,jumping:0.016,deadbug_extra:0.105,reversecrunch_extra:0.13,
 hollowhold_extra:0.070,plank:0.064,situps:0.135,
 kbdeadlift:0.28,dbdeadlift:0.28,dbcarry:0.047,
 pushups:0.32,airsquat:0.20,lunges:0.25,
 bike:0.33,bikeerg:0.33,row:0.35,ski:0.35,
 boxsteps:0.25,ringrows:0.27,running:0.012,shuttle:0.017
};
const SORENESS_PATTERNS={ninguna:[],piernas:['squat','legs','hinge'],hombros:['overhead','push','pull'],lumbar:['hinge','core'],tronco:['core']};
const SELECT_FAMILIES={singles:'impacto',doubles:'impacto',jumping:'impacto',bike:'bicicleta',bikeerg:'bicicleta',row:'remo',ski:'esquí',running:'carrera',shuttle:'carrera'};
function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function getWeeklyExposure(state,date){
 const exposure={};const logCount={};
 const add=(patterns,weight,target)=>{for(const p of patterns)target[p]=(target[p]||0)+weight;};
 // A diferencia de la proximidad, esto es sólo exposición estimada de patrones.
 for(const p of state.plan){const days=daysApart(p.date,date);if(days< -6||days>2)continue;
  add(inferPatterns(`${p.title} ${p.movements||''}`),days>0?0.45:0.65,exposure);
 }
 for(const l of state.logs){const days=daysApart(l.date,date);if(days< -6||days>0)continue;
  const patterns=Array.isArray(l.patterns)?l.patterns:inferPatterns(l.movementsText||'');
  const intensity=clamp(Number(l.rpe)||7,1,10)/7;
  add(patterns,0.55*intensity,exposure);add(patterns,1,logCount);
 }
 return {exposure,logCount};
}
function getPatternBudgets(state,date,stress,readiness,assessment){
 const {exposure,logCount}=getWeeklyExposure(state,date),budgets={};
 const future=new Set(stress.details.filter(d=>d.source==='Planificación'&&d.offset>=0&&d.offset<=1).flatMap(d=>d.patterns));
 const affected=SORENESS_PATTERNS[readiness.soreness];
 for(const [pattern,base] of Object.entries(BASE_PATTERN_BUDGET)){
  if(affected.includes(pattern)){budgets[pattern]=0;continue;}
  const pressure=stress.scores[pattern]||0;
  const proximity=clamp(1.05-pressure*0.085,0.30,1.05);
  const tomorrow=future.has(pattern)?0.78:1;
  const fatigue={baja:1.10,media:0.86,alta:0.63}[readiness.fatigue];
  const weekly=clamp(1-0.055*(exposure[pattern]||0)-0.035*(logCount[pattern]||0),0.76,1);
  const sameDay=stress.details.some(d=>d.source==='Planificación'&&d.offset===0&&d.patterns.includes(pattern))?0.72:1;
  budgets[pattern]=Number((base*proximity*tomorrow*fatigue*weekly*sameDay).toFixed(2));
 }
 return {budgets,weekly:exposure};
}
function candidateAllowed109(m,stress,mode,readiness,assessment){
 if(!extraCandidateAllowed(m,stress,mode))return false;
 const sore=SORENESS_PATTERNS[readiness.soreness]||[];
 if([...m.patterns,...Object.keys(SECONDARY_PATTERNS[m.id]||{})].some(p=>sore.includes(p)))return false;
 if(readiness.fatigue==='alta'&&m.tier>1&&assessment.closeOfficial)return false;
 if(assessment.closeOfficial&&EXTRA_IMPACT.has(m.id)&&readiness.fatigue!=='baja')return false;
 if(stress.details.some(d=>d.source==='Planificación'&&d.offset===0)&&EXTRA_EXPLOSIVE.has(m.id))return false;
 return true;
}
function dose109(m,mode,level,stress,effort,multiplier){
 const baseline=extraDose(m,mode,level,stress,effort);
 if(mode==='tabata')return {amount:'20 s',estimateSeconds:20,units:20};
 const sourceAmount=baseline.amount;
 const number=Number.parseFloat(sourceAmount);
 if(!Number.isFinite(number))return null;
 let units=Math.max(1,Math.round(number*multiplier));
 if(m.unit==='sec')units=Math.max(15,Math.min(45,Math.round(units/5)*5));
 else if(m.unit==='cals')units=Math.max(4,Math.min(15,units));
 else if(m.unit==='meters')units=Math.max(10,Math.round(units/5)*5);
 else if(m.id==='singles')units=Math.max(25,Math.round(units/5)*5);
 else if(m.id==='jumping')units=Math.max(18,units);
 else units=Math.max(4,units);
 let amount;
 if(m.unit==='sec')amount=`${units} s`;
 else if(m.unit==='cals')amount=`${units} cal · ritmo sostenible`;
 else if(m.unit==='meters')amount=`${units} m${isLoaded(m)?' · carga ligera a moderada':''}`;
 else if(m.id==='deadbug_extra') {units=Math.max(4,Math.round(units/2)*2);amount=`${units} reps (${units/2}/${units/2}) controladas`;}
 else if(m.id==='kbdeadlift'||m.id==='dbdeadlift') amount=`${units} reps · carga ligera a moderada, sin fallo`;
 else amount=`${units} reps${m.id==='reversecrunch_extra'?' controladas':m.id==='pushups'?' con margen':''}`;
 const estimateSeconds=clamp(Math.round(baseline.estimateSeconds*units/number),6,60);
 return {amount,units,estimateSeconds};
}
function patternDose109(m,dose,cycles,mode){
 // Coste relativo por repetición, segundo, cal o metro, corregido por carga secundaria.
 const unitCost=MOVEMENT_UNIT_COST[m.id]||(isLoaded(m)?0.30:m.unit==='cals'?0.34:m.unit==='sec'?0.07:m.unit==='meters'?0.018:0.20);
 let units=dose.units;
 if(mode==='tabata')units=(m.unit==='sec'?20:Math.max(1,Math.round(20/(SEC_PER_REP[m.id]||(['singles','doubles'].includes(m.id)?0.65:2.7)))))*8;
 const base=units*unitCost*cycles;
 const cost={};
 for(const p of m.patterns){cost[p]=(cost[p]||0)+base*(p==='legs'&&m.patterns.includes('cardio')?0.40:p==='core'&&m.id==='dbcarry'?0.35:1);}
 for(const [p,factor] of Object.entries(SECONDARY_PATTERNS[m.id]||{}))cost[p]=(cost[p]||0)+base*factor*0.55;
 // La comba añade impacto local aunque la categoría original sólo marque cardio.
 if(['singles','jumping'].includes(m.id))cost.legs=(cost.legs||0)+base*0.20;
 if(m.id==='dbdeadlift'||m.id==='kbdeadlift')cost.core=(cost.core||0)+base*0.15;
 return cost;
}
function mergeCosts(groups){const out={};for(const group of groups)for(const [key,value] of Object.entries(group))out[key]=(out[key]||0)+value;return out;}
function estimateCycles109(mode,duration,rounds,movements){
 const seconds=movements.reduce((n,m)=>n+m.estimateSeconds,0);
 if(mode==='fortime')return {cycles:rounds,activeSeconds:seconds*rounds,elapsedSeconds:(seconds+movements.length*6)*rounds};
 if(mode==='emom'){const cycles=Math.ceil(duration/movements.length);return {cycles,activeSeconds:seconds*cycles,elapsedSeconds:duration*60};}
 if(mode==='tabata')return {cycles:1,activeSeconds:movements.length*8*20,elapsedSeconds:duration*60};
 const perCycle=seconds+movements.length*6;
 const cycles=Math.ceil(duration*60/perCycle);
 return {cycles,activeSeconds:seconds*cycles,elapsedSeconds:duration*60};
}
function evaluate109(selected,{state,date,stress,assessment,readiness,mode,duration,level,objective,budgets,effort,multiplier,rounds}){
 if(selected.length<(mode==='tabata'?1:2))return null;
 let movements=selected.map(m=>{const dose=dose109(m,mode,level,stress,effort,multiplier);return dose?{...m,...dose}:null;});
 if(movements.some(x=>!x))return null;
 if(mode==='emom'&&movements.some(m=>m.estimateSeconds<19||m.estimateSeconds>46))return null;
 // Ajustar *cada* estación según presupuesto, sin recortar todo el WOD
 // cuando, por ejemplo, la bisagra está cargada pero el cardio es viable.
 if(mode!=='tabata')for(let pass=0;pass<6;pass++){
  const current=estimateCycles109(mode,duration,rounds,movements);
  const costs=movements.map(m=>patternDose109(m,m,current.cycles,mode));
  const totals=mergeCosts(costs);
  const overloaded=Object.entries(totals).filter(([p,v])=>v>(budgets[p]??5)*1.001);
  if(!overloaded.length)break;
  const target=overloaded.sort((a,b)=>b[1]/Math.max(0.1,budgets[b[0]]||1)-a[1]/Math.max(0.1,budgets[a[0]]||1))[0][0];
  const candidates=movements.map((m,i)=>({i,c:costs[i][target]||0,loaded:isLoaded(m)})).filter(x=>x.c>0).sort((a,b)=>b.c-a.c);
  if(!candidates.length)return null;
  const chosen=candidates[0].i,m=movements[chosen];
  const otherCost=totals[target]-costs[chosen][target];
  const allowed=Math.max(0,(budgets[target]||0)-otherCost);
  const shrink=clamp(0.98*allowed/Math.max(.01,costs[chosen][target]),.18,.94);
  const adjusted=dose109(selected[chosen],mode,level,stress,effort,multiplier*(m.units/Math.max(1,Number.parseFloat(extraDose(selected[chosen],mode,level,stress,effort).amount)))*shrink);
  if(!adjusted||adjusted.units>=m.units)return null;
  if(m.unit==='reps'&&adjusted.units<(isLoaded(m)?4:6))return null;
  if(m.unit==='meters'&&isLoaded(m)&&adjusted.units<20)return null;
  movements=movements.map((x,i)=>i===chosen?{...selected[i],...adjusted}:x);
 }
 const metrics=estimateCycles109(mode,duration,rounds,movements);
 if(mode==='emom'&&movements.some(m=>m.estimateSeconds<19||m.estimateSeconds>46))return null;
 const total=mergeCosts(movements.map(m=>patternDose109(m,m,metrics.cycles,mode)));
 const ratios=Object.entries(total).map(([p,cost])=>cost/Math.max(0.01,budgets[p]??5));
 if(ratios.some(x=>x>1.001))return null; // veto por presupuesto, no sólo penalización
 if(mode==='fortime'){
  const fraction=metrics.elapsedSeconds/(duration*60);
  if(fraction<0.66||fraction>1.02)return null;
 }
 if(mode==='emom'&&metrics.activeSeconds/(duration*60)>0.77)return null;
 const domains=[...new Set(movements.map(stimulusDomain))];
 if(domains.length<(mode==='tabata'?1:2))return null;
 const cardio=movements.some(m=>m.patterns.includes('cardio'));
 const workFraction=mode==='fortime'?metrics.elapsedSeconds/(duration*60):mode==='emom'?metrics.activeSeconds/(duration*60):mode==='tabata'?.666:Math.min(0.9,metrics.activeSeconds/(duration*60));
 if(workFraction<0.53||mode!=='tabata'&&!cardio&&domains.length<3)return null;
 if(mode!=='tabata'&&movements.some(m=>(['situps','deadbug_extra','reversecrunch_extra'].includes(m.id)&&m.units<10)||(m.id==='singles'&&m.units<40)||(m.id==='jumping'&&m.units<30)))return null;
 const volumeRatio=Math.max(0,...ratios);
 const overlapCost=movements.reduce((n,m)=>n+extraFatigueRisk(m,stress),0)/movements.length;
 const stimulus=clamp(100-145*Math.abs(workFraction-0.77)+(movements.some(m=>m.id==='singles')?5:0)-(movements.some(m=>m.id==='jumping')?5:0),0,100);
 const compliance=clamp(100-13*overlapCost-14*Math.max(0,readiness.fatigue==='alta'?1:0),0,100);
 const volume=clamp(100-85*Math.pow(Math.abs(volumeRatio-0.67),1.35),0,100);
 const diversity=domains.length>=3?95:domains.length===2?70:30;
 const objectiveBonus=(objective==='mixto'&&domains.includes('carga')&&domains.includes('cardio')?4:0);
 // Pesos acordados: estímulo 40%, compatibilidad 25%, volumen 20%, variedad 15%.
 const score=0.40*stimulus+0.25*compliance+0.20*volume+0.15*diversity+objectiveBonus;
 return {score,movements,domains,metrics,total,volumeRatio,workFraction,overlapCost,rounds};
}
function createCandidateSelection109(pool,template,stress,rng){
 const chosen=[];
 for(const domain of template){
  const options=pool.filter(m=>stimulusDomain(m)===domain&&!chosen.some(x=>x.id===m.id)&&
   !(domain==='cardio'&&chosen.some(x=>stimulusDomain(x)==='cardio'&&SELECT_FAMILIES[x.id]===SELECT_FAMILIES[m.id]))&&
   !(domain==='core'&&chosen.some(x=>stimulusDomain(x)==='core'&&CORE_FAMILY[x.id]===CORE_FAMILY[m.id])));
  if(!options.length)return null;
  const sorted=options.map(m=>({m,rank:extraFatigueRisk(m,stress)+((m.tier||1)-1)*0.15}))
   .sort((a,b)=>a.rank-b.rank);
  const shortlist=sorted.slice(0,Math.min(sorted.length,5));
  chosen.push(chooseFrom(shortlist,rng).m);
 }
 return chosen;
}
function buildOptimizedExtra({state,mode,date,level,objective,duration,profile,stress,assessment,rng,effort,readiness,forcedAgainstAdvice}){
 const effortCfg={controlado:{rpe:'5–6',name:'controlado'},productivo:{rpe:'6–7',name:'productivo'},exigente:{rpe:'7–8',name:'exigente'}}[effort];
 const supplementary=SUPPLEMENTARY_CORE.filter(m=>level!=='principiante'||m.tier===1);
 const pool=[...eligibleMovements(profile,state.skills,level),...supplementary].filter(m=>candidateAllowed109(m,stress,mode,readiness,assessment));
 const {budgets,weekly}=getPatternBudgets(state,date,stress,readiness,assessment);
 const domainCount=new Set(pool.map(stimulusDomain)).size;
 // Si sólo hay cardio y core viables, acortamos TABATA 14' a 9', nunca
 // repetimos bloques de impacto para fingir mayor diversidad.
 const clipped=mode==='tabata'?(duration>=14&&domainCount>=3?14:duration>=9?9:4):Math.min(duration,readiness.fatigue==='alta'||mode==='amrap'&&assessment.shouldRecover||stress.details.some(d=>d.source==='Planificación'&&d.offset===0)?12:effort==='controlado'?12:20);
 const blocks=mode==='tabata'?(clipped===14?3:clipped===9?2:1):0;
 const templates=objective==='cardio'?[['cardio','core','cardio'],['cardio','cardio','core'],['cardio','core','carga']]:
  objective==='fuerza-resistencia'?[['carga','cardio','core'],['cardio','core','carga'],['cardio','core','empuje']]:
  [['cardio','core','carga'],['cardio','core','piernas'],['cardio','core','traccion'],['cardio','core','empuje'],['cardio','core','cardio'],['cardio','core']];
 const candidates=[];
 for(let i=0;i<180;i++){
  const template=templates[i%templates.length];
  if(mode==='tabata'&&template.length<blocks)continue;
  const picked=createCandidateSelection109(pool,mode==='tabata'?template.slice(0,blocks):template,stress,rng);
  if(!picked)continue;
  const selected=mode==='tabata'?picked.slice(0,blocks):picked;
  for(const factor of [0.75,0.90,1.00,1.10]){
   const roundsList=mode==='fortime'?[3,4,5,6]:[null];
   for(const rounds of roundsList){
    const result=evaluate109(selected,{state,date,stress,assessment,readiness,mode,duration:clipped,level,objective,budgets,effort,multiplier:factor,rounds});
    if(result)candidates.push(result);
   }
  }
 }
 if(!candidates.length){
  throw new Error('No encuentro un WOD con estímulo suficiente que respete los límites de carga de esta fecha. Prueba menor intensidad, más material o prioriza la recuperación.');
 }
 candidates.sort((a,b)=>b.score-a.score);
 const winner=chooseFrom(candidates.filter(x=>x.score>=candidates[0].score-2.5).slice(0,12),rng);
 const {movements,domains,metrics,rounds,workFraction,volumeRatio,score}=winner;
 const actualObjective=domains.includes('cardio')&&domains.includes('core')&&domains.includes('carga')?'mixto (cardio, core y carga dosificada)':
  domains.includes('cardio')&&domains.includes('core')?'acondicionamiento y core (objetivo adaptado)':
  domains.join(' + ')+' (objetivo adaptado)';
 const estimatedMinutes=Math.round(metrics.elapsedSeconds/60*10)/10;
 const totalText=Object.entries(winner.total).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([p,v])=>`${PATTERN_NAMES[p]||p} ${v.toFixed(1)}/${(budgets[p]||0).toFixed(1)}`).join('; ');
 const warningRisk=assessment.shouldRecover||volumeRatio>0.88?'Moderada-alta':volumeRatio>0.70?'Moderada':'Baja-moderada';
 const title=mode==='fortime'?`FOR TIME OPTIMIZADO · CAP ${clipped}'`:mode==='amrap'?`AMRAP OPTIMIZADO ${clipped}'`:mode==='emom'?`EMOM OPTIMIZADO ${clipped}'`:`INTERVALOS 20/10 · ${clipped}'`;
 const advice=mode==='fortime'?`${rounds} rondas por tiempo (CAP ${clipped}'). Tiempo estimado aproximado: ${String(estimatedMinutes).replace('.',',')} min, sin garantizarlo. Mantén técnica y 2–4 repeticiones de margen en cargas.`:
  mode==='amrap'?`AMRAP ${clipped} min. Ritmo continuo sostenible, sin fallo; registra las rondas reales.`:
  mode==='emom'?`EMOM ${clipped} min. Alterna las ${movements.length} estaciones; ajusta para trabajar 20–45 s y descansar el resto del minuto.`:
  `${blocks} bloques de 8×(20 s trabajo / 10 s descanso)${blocks>1?', con 60 s entre bloques':''}; trabaja con intensidad sostenible.`;
 const notes=`${forcedAgainstAdvice?'GENERADO CON CONFIRMACIÓN pese a recomendar recuperación. ':''}`+
  `${assessment.reason?assessment.reason+' ':''}Estado previo: fatiga ${readiness.fatigue}, molestias ${readiness.soreness}, objetivo RPE ${effortCfg.rpe}. `+
  `La selección ha comparado alternativas por estímulo (40%), compatibilidad (25%), volumen (20%) y variedad (15%). `+
  `Presupuestos relativos de carga utilizados: ${totalText}. `+
  `La programación y el registro cercano modifican estos límites; sólo se estiman patrones, no volumen fisiológico real. `+
  `${clipped<duration?`Duración reducida de ${duration} a ${clipped} min. `:''}`+
  `Interferencia estimada: ${warningRisk.toLowerCase()} (heurística). Registra RPE real y recuperación posterior. `+
  `Si aparece dolor, se deteriora la técnica o hay fatiga marcada, detén la sesión. Prioriza el rendimiento del WOD oficial.`;
 return {id:`wod-${Date.now()}-${Math.floor(rng()*1e7)}`,kind:'wod',forcedAgainstAdvice:!!forcedAgainstAdvice,
  date,mode,strategy:'inteligente',level,objective:actualObjective,requestedObjective:objective,
  duration:clipped,requestedDuration:duration,cap:clipped,rounds,interval:mode==='emom'?60:mode==='tabata'?30:0,
  ...(mode==='tabata'?{tabata:{blocks,roundsPerBlock:8,workSeconds:20,restSeconds:10,betweenBlocksSeconds:blocks>1?60:0}}:{}),
  title,movements:movements.map((m,i)=>({...m,...(mode==='tabata'?{block:i+1}:{})})),
  patterns:[...new Set(movements.flatMap(m=>m.patterns))],notes,advice,profileName:profile.name,
  createdAt:new Date().toISOString(),effort,readiness:{...readiness},
  intensity:`RPE ${effortCfg.rpe}/10 objetivo (${effortCfg.name}), sin llegar al fallo. El esfuerzo real puede diferir.`,
  stimulusReport:{domains,interference:warningRisk,score:Math.round(score),budgetUse:Math.round(volumeRatio*100),expectedMinutes:estimatedMinutes,advice:'Evaluación heurística; el RPE real puede ser distinto.'},
  progression:'Registra rendimiento, RPE real, molestias y recuperación para ajustar la siguiente sesión.'};
}

export function generateWod({state,mode='random',strategy='libre',duration=15,level='intermedio',objective='mixto',date,rng=Math.random,forceExtra=false,effort='productivo',readiness=null}){
 if(!isISODate(date))throw new Error('Elige una fecha válida.');
 if(!['libre','inteligente'].includes(strategy))throw new Error('Estrategia no válida.');
 if(!['principiante','intermedio','avanzado'].includes(level))throw new Error('Nivel no válido.');
 if(!['mixto','cardio','fuerza-resistencia','gimnasia'].includes(objective))throw new Error('Objetivo no válido.');
 duration=Number(duration);if(!Number.isInteger(duration)||duration<4||duration>60)throw new Error('La duración debe estar entre 4 y 60 minutos.');
 if(strategy==='inteligente'&&!state.plan.length)throw new Error('Para usar WOD extra inteligente, carga primero tu programación oficial de CrossFit.');
 if(strategy==='inteligente'&&!state.plan.some(p=>Math.abs(daysApart(p.date,date))<=2))throw new Error('No hay sesiones oficiales en los dos días anteriores o posteriores a la fecha elegida. Importa esa parte de la programación antes de generar un WOD extra inteligente.');
 const formats=duration>20?['amrap','fortime','emom']:['amrap','fortime','emom','tabata'];
 if(mode==='random')mode=formats[Math.floor(rng()*formats.length)];
 if(!['amrap','fortime','emom','tabata'].includes(mode))throw new Error('Modalidad no válida.');
 if(mode==='tabata'&&duration>20)throw new Error('Para TABATA elige entre 4 y 20 minutos. Para sesiones más largas utiliza otro formato.');
 const profile=state.profiles.find(p=>p.id===state.activeProfile)||state.profiles[0];
 const stress=getStress(strategy==='inteligente'?state.plan:[],strategy==='inteligente'?state.logs:[],date);
 const assessment=strategy==='inteligente'?assessIntelligentDay(stress):null;
 if(strategy==='inteligente'){
  const prior=normalizeReadiness({...state.readiness,...readiness,effort});
  if(assessment.shouldRecover&&forceExtra!==true)return recoveryRecommendation(date,level,objective,stress,assessment);
  try{return buildOptimizedExtra({state,mode,date,level,objective,duration,profile,stress,assessment,rng,effort:prior.effort,readiness:prior,forcedAgainstAdvice:assessment.shouldRecover});}
  catch(err){if(forceExtra===true)throw err;
   return recoveryRecommendation(date,level,objective,stress,{...assessment,reason:`${err.message} Se recomienda recuperar o ajustar los controles.`,highPatterns:assessment.highPatterns});}
 }
 // El modo libre conserva las reglas de 1.0.8.
 const requestedDuration=duration;
 if(strategy==='inteligente'&&assessment.closeOfficial)duration=Math.min(duration,12);

 const candidatePool=eligibleMovements(profile,state.skills,level);
 const overloaded=new Set(strategy==='inteligente'?Object.entries(stress.scores).filter(([,v])=>v>=1.9).map(([p])=>p):[]);
 let pool=candidatePool.filter(m=>strategy!=='inteligente'||smartAllowed(m,stress));
 if(mode==='tabata')pool=pool.filter(m=>TABATA_SAFE.has(m.id));
 if(mode==='emom')pool=pool.filter(m=>stationDose(m,level)!==null);
 if(pool.length<(mode==='tabata'?1:2)){if(strategy==='inteligente')return recoveryRecommendation(date,level,objective,stress,{...assessment,reason:'La carga detectada no deja suficientes ejercicios de bajo riesgo para componer un WOD extra.',highPatterns:Object.keys(stress.scores).filter(k=>stress.scores[k]>=1.9)});throw new Error('No hay suficientes ejercicios compatibles con esta modalidad, material y nivel. Prueba otro formato o selecciona más equipamiento.');}
 const layout=mode==='tabata'?tabataLayout(duration):null;
 const target=mode==='tabata'?Math.min(layout.blocks,pool.length):mode==='emom'?Math.min(4,Math.max(2,Math.round(duration/5))):duration<10?3:4;
 const selected=selectBalanced(pool,target,objective,strategy,stress,rng);
 if(selected.length<(mode==='tabata'&&layout.blocks===1?1:2)){if(strategy==='inteligente')return recoveryRecommendation(date,level,objective,stress,{...assessment,reason:'No hay una combinación equilibrada de ejercicios que respete las restricciones de carga.',highPatterns:Object.keys(stress.scores).filter(k=>stress.scores[k]>=1.9)});throw new Error('No se puede crear un WOD equilibrado con los ejercicios habilitados; selecciona más material, otro nivel u otra modalidad.');}
 const stations=mode==='tabata'?Array.from({length:layout.blocks},(_,i)=>selected[i%selected.length]):selected;
 const movementEntries=stations.map((m,i)=>({...m,amount:strategy==='inteligente'?safeSmartAmount(m,mode,duration,level,stress):makeAmount(m,mode,duration,level),...(mode==='emom'?{estimateSeconds:stationDose(m,level).estimate}:{}),...(mode==='tabata'?{block:i+1}:{} )}));
 const activeStress=Object.entries(stress.scores).filter(([,v])=>v>=2.3).sort((a,b)=>b[1]-a[1]).map(([p])=>PATTERN_NAMES[p]||p);
 const rounds=mode==='tabata'?layout.blocks*8:mode==='fortime'?(strategy==='inteligente'?3:(duration<=12?3:5)):null;
 const effectiveDuration=mode==='tabata'?layout.total/60:duration;
 const noteDuration=mode==='tabata'&&layout.total!==duration*60?` Duración solicitada: ${duration} min; ajustada a ${formatMinutes(effectiveDuration)} para respetar bloques completos y descansos.`:'';
 const notes=strategy==='inteligente'?`Se han considerado ${stress.details.length} sesiones de programación y registro cercanas. ${activeStress.length?'Patrones protegidos: '+activeStress.slice(0,4).join(', ')+'. ':''}${duration<requestedDuration?'Duración ajustada de '+requestedDuration+' a '+duration+' min para limitar carga. ':''}Se han excluido movimientos de patrones exigidos recientemente o próximos. La compatibilidad es orientativa y depende de la recuperación real.`:'WOD aleatorio condicionado por material y nivel; revisa cargas antes de comenzar.';
 const advice=mode==='amrap'?'Máximas rondas y repeticiones en el tiempo indicado.':
 mode==='fortime'?`${rounds} rondas por tiempo. Time cap sugerido: ${duration} minutos.`:
 mode==='emom'?`Una estación por minuto, en orden, durante ${duration} min. Dosis orientativas de 25–45 s de trabajo; descansa el tiempo restante. Si no cabe con buena técnica, reduce repeticiones.`:
 `${layout.blocks} ${layout.blocks===1?'bloque':'bloques'} de 8×(20 s trabajo / 10 s descanso), 4 min por bloque${layout.blocks>1?layout.rest===0?', sin pausa adicional entre bloques':` y ${layout.rest} s de recuperación entre bloques`:''}. ${rounds} intervalos de trabajo en total.${noteDuration}`;
 const title=mode==='amrap'?`AMRAP ${duration}'`:mode==='fortime'?`FOR TIME · CAP ${duration}'`:mode==='emom'?`EMOM ${duration}'`:layout.blocks===1?`TABATA 4'`:`TABATA POR BLOQUES ${formatMinutes(effectiveDuration)}'`;
 return {id:`wod-${Date.now()}-${Math.floor(rng()*1e7)}`,date,mode,strategy,level,objective,duration:effectiveDuration,requestedDuration,cap:duration,rounds,interval:mode==='emom'?60:mode==='tabata'?30:0,
 ...(layout?{tabata:{blocks:layout.blocks,roundsPerBlock:8,workSeconds:20,restSeconds:10,betweenBlocksSeconds:layout.rest}}:{}),
 title,movements:movementEntries,patterns:[...new Set(selected.flatMap(m=>m.patterns))],notes,advice,profileName:profile.name,createdAt:new Date().toISOString(),intensity:strategy==='inteligente'?(activeStress.length?'RPE 4–5/10 orientativo':'RPE 5–6/10 orientativo'):'RPE 6–7/10 orientativo'};
}
function formatMinutes(value){return Number.isInteger(value)?String(value):String(Number(value.toFixed(1))).replace('.',',');}
export function readCSV(text){
 const rows=[];const raw=String(text).replace(/^\uFEFF/,'');const first=raw.split(/\r?\n/,1)[0];const sep=first.split(';').length>first.split(',').length?';':',';let cell='',row=[],inQuotes=false;
 for(let i=0;i<raw.length;i++){
  const ch=raw[i];if(ch==='"'){if(inQuotes&&raw[i+1]==='"'){cell+='"';i++;}else inQuotes=!inQuotes;}
  else if(ch===sep&&!inQuotes){row.push(cell.trim());cell='';}
  else if((ch==='\n'||ch==='\r')&&!inQuotes){if(ch==='\r'&&raw[i+1]==='\n')i++;row.push(cell.trim());if(row.some(x=>x!==''))rows.push(row);row=[];cell='';}
  else cell+=ch;
 }
 if(inQuotes)throw new Error('CSV con comillas sin cerrar.');row.push(cell.trim());if(row.some(x=>x!==''))rows.push(row);return rows;
}
export function parsePlanCSV(text){
 const rows=readCSV(text);if(rows.length<2)throw new Error('El CSV debe contener encabezados y al menos una sesión.');
 const cols=rows.shift().map(s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim());
 const find=(...names)=>names.find(n=>cols.includes(n));const dateCol=find('fecha','date','dia'),titleCol=find('nombre','titulo','title','sesion','wod');
 if(!dateCol||!titleCol)throw new Error('El CSV debe incluir columnas fecha y nombre.');
 const get=(r,...keys)=>{const c=find(...keys);return c?r[cols.indexOf(c)]||'':'';};
 const items=rows.map((r,i)=>({id:`plan-${Date.now()}-${i}`,date:get(r,'fecha','date','dia'),title:get(r,'nombre','titulo','title','sesion','wod'),movements:get(r,'movimientos','ejercicios','movements','contenido'),rpe:Math.min(10,Math.max(1,Number(get(r,'rpe','intensidad'))||7)),notes:get(r,'notas','observaciones','notes')}));
 const invalid=items.find(p=>!isISODate(p.date)||!p.title.trim());if(invalid)throw new Error('Fecha o nombre incorrectos. Usa fechas AAAA-MM-DD.');return items;
}
export function formatWhatsapp(w){
 if(w.kind==='recovery')return `*RECUPERACIÓN RECOMENDADA* · ${w.date}\n*No se propone WOD extra con carga*\n\n${w.movements.map((m,i)=>`${i+1}. ${m.amount} · ${m.name}`).join('\n')}\n\n*Motivo:* ${w.notes}\n*Intensidad:* ${w.intensity}\n\n${w.advice}`;

 const names={amrap:'AMRAP',fortime:'FOR TIME',emom:'EMOM',tabata:'TABATA'};
 const header=`*${w.forcedAgainstAdvice?'WOD EXTRA CON PRECAUCIÓN':w.strategy==='inteligente'?'WOD EXTRA INTELIGENTE':'WOD ALEATORIO'}*\n*${w.title}* · ${w.date}\nNivel: ${w.level} · Objetivo: ${w.objective}`;
 const movements=w.movements.map((m,i)=>w.mode==='tabata'?`Bloque ${i+1}: 8×20/10 · ${m.name}`:`${i+1}. ${m.amount} ${m.name}${w.mode==='emom'&&m.estimateSeconds?` (≈${m.estimateSeconds} s)`:''}`).join('\n');
 return `${header}${w.forcedAgainstAdvice?'\n*AVISO:* Generado por confirmación expresa pese a recomendar recuperación.':''}\n\n${movements}\n\n*Formato:* ${w.advice}\n*Intensidad:* ${w.intensity}\n*Control de interferencias:* ${w.notes}\n\nRevisar cargas y escalados antes de entrenar.`;
}
export function toCSV(rows,headers){const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;return [headers.join(';'),...rows.map(r=>headers.map(h=>q(r[h])).join(';'))].join('\r\n');}
