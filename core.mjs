import {OFFICIAL_MOVEMENT_CATALOG,OFFICIAL_LIBRARY_URL} from './catalog.mjs?v=1.0.17';
export {OFFICIAL_MOVEMENT_CATALOG,OFFICIAL_LIBRARY_URL};
// Generador WOD beta — motor local, independiente de la interfaz y sin servicios externos.
export const VERSION = '1.0.17-beta';
export const EQUIPMENT_GROUPS = [
 {title:'Máquinas',items:[['airbike','Assault / Echo Bike'],['bikeerg','BikeErg'],['skierg','SkiErg'],['rowerg','RowErg / remo'],['treadmill','Cinta de correr']]},
 {title:'Pesos y cargas',items:[['db','Mancuernas (DB)'],['kb','Kettlebells (KB)'],['barbell','Barra olímpica'],['plates','Discos bumper'],['rack','Rack para sentadillas'],['sandbag','Sandbag'],['wallball','Wall Ball'],['walltarget','Objetivo / diana para Wall Ball'],['slamball','Slam Ball'],['medball','Balón medicinal']]},
 {title:'Gimnasia y estructuras',items:[['rig','Estructura de dominadas'],['rings','Anillas'],['ropeclimb','Cuerda de trepa'],['dipbars','Paralelas / barras de fondos'],['ghd','GHD'],['wall','Pared para HSPU']]},
 {title:'Funcional y accesorios',items:[['jumprope','Comba'],['box','Cajón'],['sled','Trineo'],['bands','Bandas elásticas'],['bench','Banco'],['abmat','AbMat'],['mat','Esterilla']]},
 {title:'Espacios',items:[['run','Pista / espacio para correr'],['floor','Espacio libre para burpees'],['carry','Espacio para desplazamientos'],['outdoor','Zona exterior']]}
];
export const EQUIPMENT = Object.fromEntries(EQUIPMENT_GROUPS.flatMap(group => group.items));
export const SKILLS = [["pullup","Dominada estricta"],["ttb","Toes-to-bar estricto"],["c2b","Chest-to-bar estricto"],["bmu","Bar Muscle-up kipping"],["rmu","Ring Muscle-up kipping"],["hspu","Kipping HSPU"],["rope","Rope Climb con pies"],["du","Double-under"],["olympic","Olímpicos (selección antigua: confirmar cada levantamiento)"],["barbell_snatch","Snatch con barra (incl. power/hang)"],["barbell_clean","Clean con barra (incl. power/hang)"],["barbell_jerk","Jerk con barra"],["overhead_squat","Overhead Squat / movilidad"],["front_rack","Front rack seguro con barra"],["db_snatch","Dumbbell Snatch"],["kb_snatch","Kettlebell Snatch"],["sdlhp","Sumo Deadlift High Pull"],["ghd_situp","GHD Sit-up"],["ghd_extension","Extensiones técnicas en GHD"],["pistol","Pistol Squat"],["kipping_pullup","Kipping Pull-up"],["butterfly_pullup","Butterfly Pull-up"],["kipping_c2b","Kipping Chest-to-bar"],["kipping_ttb","Kipping Toes-to-bar"],["knees_to_elbows","Knees-to-elbows"],["strict_hspu","HSPU estricto"],["chestwall_hspu","HSPU mirando a pared"],["deficit_hspu","HSPU con déficit"],["free_hspu","HSPU libre"],["handstand_walk","Handstand Walk"],["wall_walk","Wall Walk"],["strict_bmu","Bar Muscle-up estricto"],["strict_rmu","Ring Muscle-up estricto"],["ring_dip","Ring Dip"],["dip","Dip en paralelas"],["ring_pushup","Ring Push-up"],["legless_rope","Rope Climb sin piernas"],["l_sit","L-sit"],["ring_l_sit","L-sit en anillas"],["hanging_l_sit","L-sit colgado"],["windshield","Windshield Wiper"],["skin_the_cat","Skin the Cat"],["swing_roll","Roll en anillas"],["shoot_through","Shoot-through"],["press_handstand","Straddle Press to Handstand"],["handstand","Handstand"],["handstand_pirouette","Handstand Pirouette"],["roll_support","Forward Roll From Support"],["inverted_burpee","Inverted Burpee"],["pullover","Pull-over en barra"],["l_pullup","L Pull-up"],["toes_rings","Toes-to-rings"],["shoulder_stand","L-sit to Shoulder Stand"],["lsit_rope","L-sit Rope Climb"],["glide_kip","Glide Kip"],["db_overhead","Dumbbell Overhead Squat / Lunge"],["db_jerk","Dumbbell Push Jerk"],["turkish_getup","Dumbbell Turkish Get-up"]];
// El generador usa exclusivamente la biblioteca curada y los movimientos WOD añadidos explícitamente.
// No se modifica la programación ORIGIN original ni los ejercicios de WODs históricos.
export const MOVEMENTS = OFFICIAL_MOVEMENT_CATALOG.filter(m=>m.auto);
export function unavailableRequirements(m,profile,skills=[]){
 const material=(m.req||[]).filter(id=>!profile?.equipment?.[id]?.enabled);
 const technique=(m.skillsRequired||[]).filter(id=>!skills.includes(id));
 return {material,technique};
}
export function canGenerateMovement(m,profile,skills=[],level='intermedio'){
 const tiers={principiante:1,intermedio:2,avanzado:3};
 const blocked=unavailableRequirements(m,profile,skills);
 return !!m.auto&&m.tier<=(tiers[level]||2)&&blocked.material.length===0&&blocked.technique.length===0;
}
export const PATTERN_NAMES = {squat:'Piernas (sentadilla)',legs:'Piernas / carrera',hinge:'Cadena posterior',pull:'Tracción',push:'Empuje',overhead:'Hombros / overhead',grip:'Agarre',core:'Core',cardio:'Cardio'};
// 1.0.9: parámetros opcionales compatibles con las copias de versiones anteriores.
export const DEFAULT_READINESS = Object.freeze({fatigue:'media',soreness:'ninguna',effort:'productivo'});
export function normalizeReadiness(value){
 const raw=value&&typeof value==='object'?value:{};
 return {fatigue:['baja','media','alta'].includes(raw.fatigue)?raw.fatigue:'media',
  soreness:['ninguna','piernas','hombros','lumbar','tronco'].includes(raw.soreness)?raw.soreness:'ninguna',
  effort:['controlado','productivo','exigente'].includes(raw.effort)?raw.effort:'productivo'};
}
export const DEFAULT_STATE = () => ({version:VERSION,profiles:[{id:'principal',name:'Mi material',equipment:{}}],activeProfile:'principal',skills:[],plan:[],wods:[],logs:[],lastWod:null,lastRecommendation:null,generationHistory:[],readiness:normalizeReadiness()});
export function sanitizeState(raw) {
 const d=DEFAULT_STATE(); if(!raw||typeof raw!=='object')return d;
 const profiles=Array.isArray(raw.profiles)?raw.profiles.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&p.equipment&&typeof p.equipment==='object').slice(0,15):[];
 return {version:VERSION,profiles:profiles.length?profiles:d.profiles,activeProfile:typeof raw.activeProfile==='string'?raw.activeProfile:d.activeProfile,skills:Array.isArray(raw.skills)?raw.skills.filter(x=>SKILLS.some(s=>s[0]===x)):[],plan:Array.isArray(raw.plan)?raw.plan.filter(p=>p&&isISODate(p.date)&&typeof p.title==='string').slice(0,1000):[],wods:Array.isArray(raw.wods)?raw.wods.filter(w=>w&&Array.isArray(w.movements)).slice(0,1000):[],logs:Array.isArray(raw.logs)?raw.logs.filter(w=>w&&typeof w.date==='string').slice(0,2000):[],lastWod:raw.lastWod&&Array.isArray(raw.lastWod.movements)&&raw.lastWod.kind!=='recovery'?raw.lastWod:null,lastRecommendation:raw.lastRecommendation?.kind==='recovery'&&Array.isArray(raw.lastRecommendation.movements)?raw.lastRecommendation:null,generationHistory:Array.isArray(raw.generationHistory)?raw.generationHistory.filter(x=>x&&isISODate(x.date)&&['amrap','fortime','emom','tabata'].includes(x.mode)&&Array.isArray(x.ids)).slice(0,12).map(x=>({date:x.date,mode:x.mode,ids:x.ids.filter(id=>typeof id==='string').slice(0,6)})):[],readiness:normalizeReadiness(raw.readiness)};
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
 return MOVEMENTS.filter(m=>canGenerateMovement(m,profile,skills,level));
}
// v1.0.3: reglas heurísticas de equilibrio, sin prometer una carga personalizada.
const MAIN_PATTERNS=['squat','hinge','overhead'];
const TABATA_SAFE=new Set(['airsquat','burpees','pushups','absitups','situps','singles','doubles','boxsteps','row','bike','bikeerg','ski','kbswing','walkinglunge']);
// Estimaciones aproximadas para construir estaciones de 25–45 s; no son predicciones individuales.
const SEC_PER_REP={absitups:2.7,ghdsitups:3.5,walkinglunge:2.4,overheadsquat:4.5,hangpowersnatch:5.0,hangpowerclean:5.0,dbfrontsquat:3.5,dbpowerclean:3.9,dbhangpowerclean:3.6,burpeebox:5.5,airsquat:1.9,lunges:2.4,burpees:4.6,pushups:2.7,situps:2.7,
 mountain:1.2,jumping:1.0,dbsnatch:3.6,dbthruster:4.2,dbdeadlift:2.8,
 dbpushpress:3.3,dblob:3.8,kbswing:2.8,kbgoblet:2.9,kbdeadlift:2.9,kbclean:3.7,
 deadlift:4.0,frontsquat:4.0,backsquat:4.2,powerclean:5.0,powersnatch:5.0,
 barthruster:4.5,pushpress:3.8,pullups:3.0,kneeraises:2.7,ttb:3.2,
 c2b:3.4,bmu:5.0,ringrows:3.2,ringdips:3.6,rmu:5.5,hspu:4.5,
 singles:0.6,doubles:0.8,boxsteps:3.0,boxjumps:3.5,
 wallballs:3.1,medball:3.5,sandbag:4.2};
const LOW_REP_CAP=new Set(['snatch','clean','cleanjerk','hangsnatch','hangpowersnatch','ghdsitups','deadlift','frontsquat','backsquat','powerclean','powersnatch','barthruster','pushpress','bmu','rmu','hspu']);
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
// El núcleo suplementario de versiones previas (reverse crunch, dead bug, hollow)
// ya NO se incorpora al pool de generación. Se preserva sólo en WODs históricos.
const SUPPLEMENTARY_CORE = [];
const CORE_FAMILY={situps:'flexión',absitups:'flexión',ghdsitups:'flexión',lsit:'estabilidad',ttb:'suspensión',kippingttb:'suspensión',hanglsit:'estabilidad'};
const EXTRA_COMPLEX_EXCLUDED=new Set([
 'deadlift','frontsquat','backsquat','powerclean','powersnatch','barthruster','pushpress',
 'wallballs','sled','ropeclimb','bmu','rmu','hspu','dbsnatch','dbthruster','dbpushpress','ghdsitups','kbsnatch'
]);
const EXTRA_IMPACT=new Set(['running','shuttle','boxjumps','burpees','mountain','doubles']);
const EXTRA_EXPLOSIVE=new Set(['kbswing','medball','sandbag']);
const EXTRA_TABATA=new Set(['absitups','situps','singles','airsquat','pushups','bike','bikeerg','row','ski','walkinglunge','boxsteps']);
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
  const factor=p==='cardio'?cardioFactor:p==='legs'&&['singles','bike','bikeerg'].includes(m.id)?0.28:p==='legs'&&m.id==='row'?0.55:p==='overhead'?1.25:p==='core'?0.7:p==='grip'?0.75:1;
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
 if(m.id==='absitups'||m.id==='situps')return {amount:`${dose(12,14,16)} reps`,estimateSeconds:dose(33,38,43)};
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
 hollowhold_extra:0.070,plank:0.064,situps:0.135,absitups:0.135,ghdsitups:0.22,
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
 // La elegibilidad técnica y de material se comprueba ANTES de llegar aquí.
 // El día cercano a ORIGIN nunca se habilita un elemento complejo por tener perfil RX.
 if(m.unit==='climbs')return false;
 if(mode==='tabata'&&!EXTRA_TABATA.has(m.id))return false;
 if(m.tier>=3&&(assessment.closeOfficial||readiness.fatigue==='alta'))return false;
 const sore=SORENESS_PATTERNS[readiness.soreness]||[];
 if([...m.patterns,...Object.keys(SECONDARY_PATTERNS[m.id]||{})].some(p=>sore.includes(p)))return false;
 if((stress.scores.overhead||0)>=3.4&&m.patterns.includes('overhead'))return false;
 if((stress.scores.squat||0)>=3.6&&m.patterns.includes('squat'))return false;
 if((stress.scores.push||0)>=3.0&&m.patterns.includes('push'))return false;
 if((stress.scores.grip||0)>=3.7&&m.patterns.includes('grip'))return false;
 if((stress.scores.hinge||0)>=2.5&&EXTRA_EXPLOSIVE.has(m.id))return false;
 if(assessment.closeOfficial&&EXTRA_IMPACT.has(m.id)&&readiness.fatigue!=='baja')return false;
 if(assessment.closeOfficial&&m.tier>=3)return false;
 // Cargas olímpicas pesadas y ejercicios de fuerza máxima no son candidatos para
 // un extra junto a sesiones oficiales. Pueden entrar variantes con dosis reducida
 // sólo en días más alejados de ORIGIN y con la habilidad comprobada.
 if(assessment.closeOfficial&&EXTRA_COMPLEX_EXCLUDED.has(m.id))return false;
 if(assessment.closeOfficial&&['snatch','clean','cleanjerk','powersnatch','powerclean','pushjerk','barthruster','wallballs','ghdsitups'].includes(m.id))return false;
 const risk=extraFatigueRisk(m,stress);
 const riskLimit=assessment.closeOfficial?4.5:readiness.fatigue==='alta'?4.0:6.0;
 if(risk>riskLimit)return false;
 if(m.tier>=3&&risk>3.5)return false;
 return true;
}
function estimateStationSeconds110(m,units,approx){
 // Estimaciones conservadoras de tiempo de estación, no cronometrajes individuales.
 if(m.id==='running')return Math.round(units/3.0);
 if(m.id==='shuttle')return Math.round(units/2.4);
 if(m.id==='dbcarry')return Math.round(units/1.25);
 if(m.id==='handstandwalk')return Math.round(units/0.8);
 if(m.id==='singles')return Math.round(units*0.64);
 if(m.id==='doubles')return Math.round(units*0.85);
 if(m.unit==='sec')return units;
 if(m.unit==='cals')return Math.round(units*3.9);
 if(m.unit==='reps')return Math.round(units*(SEC_PER_REP[m.id]||(
  m.tier>=3?4.5:isLoaded(m)?3.7:2.8)));
 return Math.round(approx);
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
 else units=Math.max(3,units);
 let amount;
 if(m.unit==='sec')amount=`${units} s`;
 else if(m.unit==='cals')amount=`${units} cal · ritmo sostenible`;
 else if(m.unit==='meters')amount=`${units} m${isLoaded(m)?' · carga moderada ajustada a técnica':''}`;
 else if(m.id==='kbdeadlift'||m.id==='dbdeadlift')amount=`${units} reps · carga moderada, sin fallo`;
 else amount=`${units} reps`;
 return {amount,units,estimateSeconds:estimateStationSeconds110(m,units,baseline.estimateSeconds)};
}
function minimumUsefulDose110(m,entry,cycles,mode){
 if(mode==='tabata')return true;
 if(m.unit==='cals')return entry.units>=5;
 if(m.unit==='sec')return entry.units>=20;
 if(m.unit==='meters'){
  if(m.id==='running')return entry.units>=100;
  if(isLoaded(m))return entry.units>=25;
  return entry.units>=30;
 }
 if(m.id==='singles')return entry.units>=40;
 if(m.id==='doubles')return entry.units>=12;
 if(m.id==='absitups'||m.id==='situps')return entry.units>=10;
 if(m.id==='airsquat'||m.id==='walkinglunge')return entry.units>=10;
 if(isLoaded(m))return entry.units >= (m.tier>=3?4:6);
 if(m.patterns.includes('pull')||m.patterns.includes('push'))return entry.units>=4;
 if(m.patterns.includes('squat'))return entry.units>=8;
 if(m.unit==='reps')return entry.units>=6;
 return true;
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
 // AMRAP a ritmo sostenido: tiempos de transición y recuperación breves
 // entre rondas. Estimación fraccionaria para no contar una ronda extra completa.
 const perCycle=seconds+movements.length*6+15;
 const cycles=duration*60/perCycle;
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
  if(!minimumUsefulDose110(m,adjusted,current.cycles,mode))return null;
  if(m.unit==='meters'&&isLoaded(m)&&adjusted.units<25)return null;
  movements=movements.map((x,i)=>i===chosen?{...selected[i],...adjusted}:x);
 }
 const metrics=estimateCycles109(mode,duration,rounds,movements);
 if(movements.some(m=>!minimumUsefulDose110(m,m,metrics.cycles,mode)))return null;
 if(mode==='emom'&&movements.some(m=>m.estimateSeconds<19||m.estimateSeconds>46))return null;
 // Los presupuestos genéricos no representan el coste técnico de Muscle-ups,
 // HSPU, movimientos olímpicos o dominadas complejas. Limitar volumen total.
 const complexCaps={bmu:16,strictbmu:12,rmu:12,strictmuscleup:10,
  hspu:24,stricthspu:20,deficithspu:15,freestandinghspu:12,
  snatch:16,powersnatch:20,hangsnatch:16,hangpowersnatch:20,
  cleanjerk:16,clean:20,powerclean:24,hangcleanjerk:16,
  kippingttb:36,kippingc2b:30,ttb:36,c2b:30,ghdsitups:30};
 if(movements.some(m=>m.unit==='reps'&&complexCaps[m.id]!==undefined&&
   m.units*metrics.cycles>complexCaps[m.id]*(readiness.fatigue==='baja'?1.15:1)))return null;
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
 if(workFraction<0.53)return null;
 if(objective==='cardio'&&!cardio)return null;
 if(objective==='gimnasia'&&!domains.some(d=>['traccion','empuje','core'].includes(d)))return null;
 if(objective==='fuerza-resistencia'&&!movements.some(isLoaded)&&!domains.some(d=>['traccion','empuje','piernas'].includes(d)))return null;
 if(mode!=='tabata'&&movements.some(m=>(['situps','absitups','ghdsitups'].includes(m.id)&&m.units<10)||(m.id==='singles'&&m.units<40)||(m.id==='jumping'&&m.units<30)))return null;
 const volumeRatio=Math.max(0,...ratios);
 const overlapCost=movements.reduce((n,m)=>n+extraFatigueRisk(m,stress),0)/movements.length;
 const stimulus=clamp(100-122*Math.abs(workFraction-0.79)-(movements.length===2?4:0),0,100);
 const compliance=clamp(100-13*overlapCost-14*Math.max(0,readiness.fatigue==='alta'?1:0),0,100);
 const volume=clamp(100-85*Math.pow(Math.abs(volumeRatio-0.67),1.35),0,100);
 const diversity=domains.length>=3?95:domains.length===2?77:30;
 const objectiveBonus=(objective==='mixto'&&domains.length>=3?3:0);
 // Pesos acordados: estímulo 40%, compatibilidad 25%, volumen 20%, variedad 15%.
 const novelty=novelty110(movements,state,date);
 const score=0.40*stimulus+0.25*compliance+0.20*volume+0.15*diversity+objectiveBonus+novelty;
 return {score,movements,domains,metrics,total,volumeRatio,workFraction,overlapCost,rounds};
}
function history110(state){
 const hist=Array.isArray(state.generationHistory)?state.generationHistory:[];
 if(hist.length)return hist.slice(0,12);
 return state.lastWod&&Array.isArray(state.lastWod.movements)?[{date:state.lastWod.date,mode:state.lastWod.mode,ids:state.lastWod.movements.map(m=>m.id)}]:[];
}
function novelty110(movements,state,date){
 const ids=new Set(movements.map(m=>m.id));
 let cost=0;
 for(const [i,prev] of history110(state).slice(0,5).entries()){
  const previous=new Set(prev.ids||[]);
  const shared=[...ids].filter(id=>previous.has(id)).length;
  const similarity=shared/Math.max(1,new Set([...ids,...previous]).size);
  const sameDate=prev.date===date?1.5:1;
  cost=Math.max(cost,similarity*(21/(1+i*.3))*sameDate);
 }
 return -cost;
}
function randomModes110(formats,state,date,rng){
 const recent=history110(state).slice(0,7);
 return formats.map(mode=>({mode,penalty:recent.reduce((p,h,i)=>p+(h.mode===mode?(h.date===date?1.4:1)/(1+i*.45):0),0)+(rng()*.2)}))
  .sort((a,b)=>a.penalty-b.penalty).map(x=>x.mode);
}
function createCandidateSelection109(pool,template,stress,rng,state,date){
 const chosen=[];
 const history=history110(state).slice(0,4);
 for(const domain of template){
  const options=pool.filter(m=>stimulusDomain(m)===domain&&!chosen.some(x=>x.id===m.id)&&
   !(domain==='cardio'&&chosen.some(x=>stimulusDomain(x)==='cardio'&&SELECT_FAMILIES[x.id]===SELECT_FAMILIES[m.id]))&&
   !(domain==='core'&&chosen.some(x=>stimulusDomain(x)==='core'&&CORE_FAMILY[x.id]===CORE_FAMILY[m.id])));
  if(!options.length)return null;
  const lastIds=new Set(history[0]?.ids||[]);
  const freshCount=options.filter(m=>!lastIds.has(m.id)).length;
  const sorted=options.map(m=>{
   const repetition=history.reduce((n,h,i)=>n+((h.ids||[]).includes(m.id)?1.7/(1+i*.7):0),0);
   // No repetir la misma estación si hay opciones elegibles equivalentes.
   const repeatPenalty=lastIds.has(m.id)&&freshCount>0?2.8:0;
   return {m,rank:extraFatigueRisk(m,stress)+((m.tier||1)-1)*.20+repetition+repeatPenalty};
  }).sort((a,b)=>a.rank-b.rank);
  const shortlist=sorted.slice(0,Math.min(sorted.length,12));
  chosen.push(chooseFrom(shortlist,rng).m);
 }
 return chosen;
}
function buildOptimizedExtra({state,mode,date,level,objective,duration,requestedDuration=duration,profile,stress,assessment,rng,effort,readiness,forcedAgainstAdvice}){
 const effortCfg={controlado:{rpe:'5–6',name:'controlado'},productivo:{rpe:'6–7',name:'productivo'},exigente:{rpe:'7–8',name:'exigente'}}[effort];
 const supplementary=SUPPLEMENTARY_CORE.filter(m=>level!=='principiante'||m.tier===1);
 const excludeFromExtra=new Set(['goodmorning','zerchersquat','benchpress','snatchbalance','dbturkish']);
 const pool=[...eligibleMovements(profile,state.skills,level),...supplementary].filter(m=>!excludeFromExtra.has(m.id)&&candidateAllowed109(m,stress,mode,readiness,assessment));
 const {budgets,weekly}=getPatternBudgets(state,date,stress,readiness,assessment);
 const domainCount=new Set(pool.map(stimulusDomain)).size;
 // Si sólo hay cardio y core viables, acortamos TABATA 14' a 9', nunca
 // repetimos bloques de impacto para fingir mayor diversidad.
 const clipped=mode==='tabata'?(duration>=14&&domainCount>=3?14:duration>=9?9:4):Math.min(duration,readiness.fatigue==='alta'||['amrap','fortime','emom'].includes(mode)&&assessment.shouldRecover||stress.details.some(d=>d.source==='Planificación'&&d.offset===0)?12:effort==='controlado'?12:20);
 const blocks=mode==='tabata'?(clipped===14?3:clipped===9?2:1):0;
 const templates=objective==='cardio'?
  [['cardio','core'],['cardio','piernas'],['cardio','carga'],['cardio','traccion'],['cardio','empuje'],['cardio','cardio','core'],['cardio','carga','piernas'],['cardio','traccion','core']]:
  objective==='fuerza-resistencia'?
  [['carga','piernas'],['carga','traccion'],['carga','empuje'],['carga','cardio'],['piernas','traccion','cardio'],['carga','core','cardio'],['empuje','traccion','piernas'],['carga','piernas','core']]:
  objective==='gimnasia'?
  [['traccion','core'],['empuje','core'],['traccion','cardio'],['empuje','cardio'],['traccion','piernas'],['empuje','traccion','cardio'],['core','traccion','piernas'],['core','empuje','cardio']]:
  [['cardio','core','carga'],['cardio','piernas','traccion'],['cardio','carga'],['cardio','core'],
   ['cardio','empuje','traccion'],['piernas','core','cardio'],['carga','traccion','cardio'],['core','empuje','cardio'],
   ['cardio','piernas'],['traccion','core','carga'],['cardio','traccion'],['carga','empuje','cardio'],
   ['cardio','cardio','piernas'],['piernas','empuje','core'],['carga','piernas','core'],['traccion','piernas','core'],
   ['cardio','traccion','piernas','core'],['carga','cardio','empuje','piernas'],['cardio','core','traccion','carga'],['cardio','piernas','empuje','core']];
 const candidates=[];
 for(let i=0;i<240;i++){
  const template=templates[i%templates.length];
  if(mode==='tabata'&&template.length<blocks)continue;
  if(mode==='amrap'&&template.length<3)continue;
  const picked=createCandidateSelection109(pool,mode==='tabata'?template.slice(0,blocks):template,stress,rng,state,date);
  if(!picked)continue;
  const selected=mode==='tabata'?picked.slice(0,blocks):picked;
  for(const factor of [0.78,0.92,1.06,1.18]){
   const roundsList=mode==='fortime'?[3,4,5]:[null];
   for(const rounds of roundsList){
    const result=evaluate109(selected,{state,date,stress,assessment,readiness,mode,duration:clipped,level,objective,budgets,effort,multiplier:factor,rounds});
    if(result)candidates.push(result);
   }
  }
 }
 if(!candidates.length&&mode==='tabata'&&clipped>4){
  // Una secuencia de 14 minutos requiere tres bloques completos; si no cabe,
  // comprobar una de 9 minutos y después una de 4, sin falsificar la duración.
  return buildOptimizedExtra({state,mode,date,level,objective,duration:clipped===14?9:4,requestedDuration,profile,stress,assessment,rng,effort,readiness,forcedAgainstAdvice});
 }
 if(!candidates.length){
  throw new Error('No encuentro un WOD con estímulo suficiente que respete los límites de carga de esta fecha. Prueba menor intensidad, más material o prioriza la recuperación.');
 }
 candidates.sort((a,b)=>b.score-a.score);
 const winner=chooseFrom(candidates.filter(x=>x.score>=candidates[0].score-4.5).slice(0,24),rng);
 const {movements,domains,metrics,rounds,workFraction,volumeRatio,score}=winner;
 const actualObjective=objective==='mixto'&&domains.length>=3?`mixto (${domains.join(', ')})`:domains.join(' + ')+' (objetivo adaptado)';
 const estimatedMinutes=Math.round(metrics.elapsedSeconds/60*10)/10;
 const totalText=Object.entries(winner.total).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([p,v])=>`${PATTERN_NAMES[p]||p} ${v.toFixed(1)}/${(budgets[p]||0).toFixed(1)}`).join('; ');
 const closest=stress.details.filter(x=>x.source==='Planificación').some(x=>Math.abs(x.offset)<=1);
 const overlap=winner.overlapCost;
 const warningRisk=assessment.shouldRecover?'Moderada-alta':closest&&overlap>2.8?'Moderada-alta':overlap>2.5||volumeRatio>0.90?'Moderada':'Baja-moderada';
 const title=mode==='fortime'?`FOR TIME OPTIMIZADO · CAP ${clipped}'`:mode==='amrap'?`AMRAP OPTIMIZADO ${clipped}'`:mode==='emom'?`EMOM OPTIMIZADO ${clipped}'`:`INTERVALOS 20/10 · ${clipped}'`;
 const advice=mode==='fortime'?`${rounds} rondas por tiempo (CAP ${clipped}'). Tiempo estimado aproximado: ${String(estimatedMinutes).replace('.',',')} min, sin garantizarlo. Mantén técnica y deja margen de esfuerzo en los movimientos cargados; en carries, no pierdas la postura ni el agarre.`:
  mode==='amrap'?`AMRAP ${clipped} min con ritmo sostenible, sin sprint. Prevé unos 10–20 s de transición/recuperación por ronda (incluidos en la estimación de carga). Registra rondas reales y RPE.`:
  mode==='emom'?`EMOM ${clipped} min. Alterna las ${movements.length} estaciones; ajusta para trabajar 20–45 s y descansar el resto del minuto.`:
  `${blocks} bloques de 8×(20 s trabajo / 10 s descanso)${blocks>1?', con 60 s entre bloques':''}; trabaja con intensidad sostenible.`;
 const notes=`${forcedAgainstAdvice?'GENERADO CON CONFIRMACIÓN pese a recomendar recuperación. ':''}`+
  `${assessment.reason?assessment.reason+' ':''}Estado previo: fatiga ${readiness.fatigue}, molestias ${readiness.soreness}, objetivo RPE ${effortCfg.rpe}. `+
  `La selección ha comparado alternativas por estímulo (40%), compatibilidad (25%), volumen (20%) y variedad (15%). `+
  `Presupuestos relativos de carga utilizados: ${totalText}. `+
  `La programación y el registro cercano modifican estos límites; sólo se estiman patrones, no volumen fisiológico real. `+
  `${clipped<requestedDuration?`Duración reducida de ${requestedDuration} a ${clipped} min. `:''}`+
  `Interferencia estimada: ${warningRisk.toLowerCase()} (heurística). Registra RPE real y recuperación posterior. `+
  `Si aparece dolor, se deteriora la técnica o hay fatiga marcada, detén la sesión. Prioriza el rendimiento del WOD oficial.`;
 return {id:`wod-${Date.now()}-${Math.floor(rng()*1e7)}`,kind:'wod',forcedAgainstAdvice:!!forcedAgainstAdvice,
  date,mode,strategy:'inteligente',level,objective:actualObjective,requestedObjective:objective,
  duration:clipped,requestedDuration,cap:clipped,rounds,interval:mode==='emom'?60:mode==='tabata'?30:0,
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
 const randomRequested=mode==='random';
 const candidateModes=randomRequested?randomModes110(formats,state,date,rng):[mode];
 if(randomRequested)mode=candidateModes[0];
 if(!['amrap','fortime','emom','tabata'].includes(mode))throw new Error('Modalidad no válida.');
 if(mode==='tabata'&&duration>20)throw new Error('Para TABATA elige entre 4 y 20 minutos. Para sesiones más largas utiliza otro formato.');
 const profile=state.profiles.find(p=>p.id===state.activeProfile)||state.profiles[0];
 const stress=getStress(strategy==='inteligente'?state.plan:[],strategy==='inteligente'?state.logs:[],date);
 const assessment=strategy==='inteligente'?assessIntelligentDay(stress):null;
 if(strategy==='inteligente'){
  const prior=normalizeReadiness({...state.readiness,...readiness,effort});
  if(assessment.shouldRecover&&forceExtra!==true)return recoveryRecommendation(date,level,objective,stress,assessment);
  let lastError=null;
  let successful=[];
  // Buscar primero la duración más próxima a la solicitada. Si el presupuesto
  // de carga hace inviable una sesión larga, probar duraciones menores sin
  // relajar requisitos técnicos ni contar WODs sin ejecutar como fatiga.
  // No sustituimos una modalidad seleccionada por otra; solo el modo
  // Aleatoria compara formatos diferentes.
  const durationTrials=[duration];
  if(duration>8){
   for(const proposed of [20,18,16,14,12,10,8]){
    if(duration>20&&proposed===20)continue; // la primera prueba ya se recorta a 20 min
    if(proposed<duration&&proposed>=8&&!durationTrials.includes(proposed))durationTrials.push(proposed);
   }
  }
  for(const trialDuration of durationTrials){
   const current=[];
   for(const format of candidateModes){
    // El muestreo de ejercicios es estocástico: repetir una vez puede
    // rescatar una alternativa sin ignorar ningún presupuesto de fatiga.
    for(let attempt=0;attempt<(randomRequested?2:2);attempt++){
     try{
      const w=buildOptimizedExtra({state,mode:format,date,level,objective,duration:trialDuration,requestedDuration:duration,profile,stress,assessment,rng,effort:prior.effort,readiness:prior,forcedAgainstAdvice:assessment.shouldRecover});
      current.push(w);break;
     }catch(err){lastError=err;}
    }
    if(!randomRequested)break;
   }
   if(current.length){successful=current;break;}
  }
  if(successful.length){
   if(!randomRequested)return successful[0];
   const recent=history110(state);
   const lastMode=recent[0]?.mode;
   // Con alternativas compatibles no repetir automáticamente el último formato.
   const alternatives=successful.length>1?successful.filter(w=>w.mode!==lastMode):[];
   const choices=alternatives.length?alternatives:successful;
   const weights=choices.map(w=>{
    const times=recent.slice(0,8).reduce((n,h,i)=>n+(h.mode===w.mode?1/(1+i*.5):0),0);
    const durationPenalty=w.requestedDuration&&w.duration<w.requestedDuration*.65?0.75:1;
    return durationPenalty/(0.65+times);
   });
   const total=weights.reduce((n,x)=>n+x,0);
   let roll=rng()*total;
   for(let i=0;i<choices.length;i++){roll-=weights[i];if(roll<0)return choices[i];}
   return choices[choices.length-1];
  }
  const detail=`No se ha encontrado una combinación compatible con tu material, nivel y presupuesto de carga, incluso probando duraciones menores. ${lastError?.message||''} Prueba otro objetivo, formato o revisa la programación y los resultados realmente realizados.`;
  if(forceExtra===true||!assessment.shouldRecover)throw new Error(detail);
  return recoveryRecommendation(date,level,objective,stress,{...assessment,reason:detail,highPatterns:assessment.highPatterns});
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
 const header=`*${w.edited?'WOD EDITADO MANUALMENTE':w.forcedAgainstAdvice?'WOD EXTRA CON PRECAUCIÓN':w.strategy==='inteligente'?'WOD EXTRA INTELIGENTE':'WOD ALEATORIO'}*\n*${w.title}* · ${w.date}\nNivel: ${w.level} · Objetivo: ${w.objective}`;
 const movements=w.movements.map((m,i)=>w.mode==='tabata'?`Bloque ${i+1}: 8×20/10 · ${m.name}${w.edited?` · ${m.amount}`:''}`:`${i+1}. ${m.amount} ${m.name}${w.mode==='emom'&&m.estimateSeconds?` (≈${m.estimateSeconds} s)`:''}`).join('\n');
 return `${header}${w.forcedAgainstAdvice?'\n*AVISO:* Generado por confirmación expresa pese a recomendar recuperación.':''}\n\n${movements}\n\n*Formato:* ${w.advice}\n*Intensidad:* ${w.intensity}\n*Control de interferencias:* ${w.notes}\n\nRevisar cargas y escalados antes de entrenar.`;
}
export function toCSV(rows,headers){const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;return [headers.join(';'),...rows.map(r=>headers.map(h=>q(r[h])).join(';'))].join('\r\n');}

/** URL de preparación de cronómetro. No envía programación, nombres ni resultados. */
export function contadorUrlForWod(w) {
 if (!w || w.kind === 'recovery' || !['amrap','fortime','emom','tabata'].includes(w.mode)) throw new Error('Genera primero un WOD con formato compatible.');
 const url = new URL('https://borjagrande.github.io/contador-wod/');
 const q = url.searchParams;
 q.set('from', 'generador-wod');
 q.set('v', '1');
 q.set('mode', w.mode);
 // La instantánea mínima viaja en fragmento (#), nunca se solicita al servidor.
 // Permite identificar el WOD aunque Safari y las PWA tengan almacenamientos separados.
 const snapshot={id:String(w.id||'').slice(0,100),date:w.date,title:String(w.title||'').slice(0,140),mode:w.mode,
  level:w.level,strategy:w.strategy,objective:String(w.objective||'').slice(0,140),profileName:String(w.profileName||'').slice(0,80),
  movements:(w.movements||[]).slice(0,8).map(m=>({id:String(m.id||'').slice(0,80),name:String(m.name||'').slice(0,100),amount:String(m.amount||'').slice(0,100)})),
  patterns:(w.patterns||[]).slice(0,12).map(p=>String(p).slice(0,30)),readiness:w.readiness||null,effort:w.effort||''};
 if(!/^wod-[a-zA-Z0-9-]{1,95}$/.test(snapshot.id)||!isISODate(snapshot.date)||!snapshot.movements.length)
  throw new Error('Faltan datos para enlazar el resultado con este WOD.');
 q.set('wodid',snapshot.id);
 url.hash='gw='+encodeURIComponent(JSON.stringify(snapshot));
 const positiveInt = (value,min,max,label) => { const n=Number(value); if(!Number.isInteger(n)||n<min||n>max)throw new Error(`No puedo configurar el contador: ${label} no válido.`); return n; };
 if (w.mode === 'amrap') q.set('minutes', String(positiveInt(w.duration,1,180,'duración')));
 else if (w.mode === 'fortime') q.set('cap',String(positiveInt(w.cap ?? w.duration,0,60,'tiempo máximo')));
 else if (w.mode === 'emom') {
  const seconds=positiveInt(w.interval||60,10,600,'duración de intervalo');
  const totalMinutes=positiveInt(w.duration,1,120,'duración EMOM');
  const totalSeconds=totalMinutes*60;
  if(totalSeconds%seconds!==0)throw new Error('La duración del EMOM no coincide con la de sus intervalos.');
  q.set('intervals',String(positiveInt(totalSeconds/seconds,1,120,'número de intervalos')));
  q.set('seconds',String(seconds));
 } else {
  const t=w.tabata||{};
  const blocks=positiveInt(t.blocks||1,1,6,'bloques TABATA');
  const perBlock=positiveInt(t.roundsPerBlock||8,1,60,'rondas por bloque');
  const work=positiveInt(t.workSeconds||20,5,600,'segundos de trabajo');
  const rest=positiveInt(t.restSeconds||10,5,600,'segundos de descanso');
  const pause=positiveInt(t.betweenBlocksSeconds||0,0,600,'pausa entre bloques');
  positiveInt(blocks*perBlock,1,60,'rondas TABATA');
  q.set('rounds',String(blocks*perBlock));q.set('work',String(work));q.set('rest',String(rest));
  if(blocks>1){q.set('blocks',String(blocks));q.set('perblock',String(perBlock));q.set('break',String(pause));}
 }
 return url.href;
}


/** Recibe un resultado finalizado del Contador por URL fragment. No guarda datos automáticamente. */
export function parseCounterTransfer(hash) {
 const raw=new URLSearchParams(String(hash||'').replace(/^#/, '')).get('wodresult');
 if(raw===null)return null;
 if(raw.length>7000)throw new Error('El resultado del contador supera el tamaño permitido.');
 let d;try{d=JSON.parse(raw)}catch{throw new Error('Datos del contador dañados.');}
 const idOk=x=>typeof x==='string'&&/^wod-[a-zA-Z0-9-]{1,95}$/.test(x);
 if(!d||d.version!==1||d.from!=='contador-wod'||!['amrap','fortime','emom','tabata'].includes(d.mode)||
    !/^[a-zA-Z0-9-]{6,110}$/.test(d.runId||'')||!Number.isSafeInteger(d.finishedAt)||d.finishedAt<=0||
    !Number.isSafeInteger(d.elapsedMs)||d.elapsedMs<0||d.elapsedMs>12*3600*1000||
    !['manual','limit'].includes(d.finishReason)||!Number.isInteger(d.splitsCount)||d.splitsCount<0||d.splitsCount>10000||
    !Number.isInteger(d.extraReps)||d.extraReps<0||d.extraReps>999||
    !Number.isInteger(d.doneIntervals)||d.doneIntervals<0||d.doneIntervals>120||
    (d.splitTimesMs!==undefined&&(!Array.isArray(d.splitTimesMs)||d.splitTimesMs.length>120||!d.splitTimesMs.every(x=>Number.isSafeInteger(x)&&x>=0&&x<=12*3600*1000)))||
    (d.markedIntervals!==undefined&&(!Array.isArray(d.markedIntervals)||d.markedIntervals.length>120||!d.markedIntervals.every(x=>Number.isInteger(x)&&x>=1&&x<=120)))||
    !d.wod||!idOk(d.wod.id)||!isISODate(d.wod.date)||d.wod.mode!==d.mode||
    typeof d.wod.title!=='string'||d.wod.title.length>140||!d.wod.title.trim()||
    !Array.isArray(d.wod.movements)||d.wod.movements.length<1||d.wod.movements.length>8||
    !d.wod.movements.every(m=>m&&typeof m.name==='string'&&m.name.length<=100&&typeof m.amount==='string'&&m.amount.length<=100))
  throw new Error('Enlace de resultado incompleto o incompatible.');
 const summary=String(d.result||'').slice(0,180);
 if(!summary)throw new Error('El Contador no envió un resultado interpretable.');
 return {...d,result:summary};
}

// 1.0.17: ediciones explícitas, independientes de la selección automática.
// Se estiman los nuevos volúmenes sin reutilizar la puntuación del WOD original.
const EDIT_UNITS={reps:'reps',meters:'m',cals:'cal',sec:'s',climbs:'ascensos'};
export function editorMovements(state,w,profile){
 return MOVEMENTS.filter(m=>canGenerateMovement(m,profile,state.skills,w.level)&&
   (w.mode!=='tabata'||(w.strategy==='inteligente'?EXTRA_TABATA:TABATA_SAFE).has(m.id)));
}
export function editWod(original,draft,state,profile){
 if(!original||original.kind==='recovery'||!['amrap','fortime','emom','tabata'].includes(original.mode))throw new Error('No hay un WOD editable.');
 const mode=original.mode, smart=original.strategy==='inteligente';
 const integer=(v,min,max,label)=>{if(v===''||!Number.isInteger(Number(v))||Number(v)<min||Number(v)>max)throw new Error(`${label}: introduce un entero entre ${min} y ${max}.`);return Number(v)};
 const optional=(v,max,label)=>{if(v===''||v==null)return null;const n=Number(v);if(!Number.isFinite(n)||n<0||n>max)throw new Error(`${label}: introduce un valor entre 0 y ${max}.`);return n;};
 const rows=draft.movements||[],limit=mode==='tabata'?6:8;
 if(!Array.isArray(rows)||rows.length<1||rows.length>limit)throw new Error(`Añade entre 1 y ${limit} movimientos.`);
 const readiness=normalizeReadiness(original.readiness||state.readiness),stress=getStress(state.plan,state.logs,original.date),assessment=assessIntelligentDay(stress);
 const {budgets}=getPatternBudgets(state,original.date,stress,readiness,assessment);
 const warnings=[], allowed=new Map(editorMovements(state,original,profile).map(m=>[m.id,m]));
 let duration,rounds=null,interval=0,tabata,cap;
 if(mode==='tabata'){
  // Mantiene los bloques estándar compatibles con el Contador 2.2.3.
  const pause=rows.length===1?0:integer(draft.pause,0,600,'Pausa entre bloques');
  tabata={blocks:rows.length,roundsPerBlock:8,workSeconds:20,restSeconds:10,betweenBlocksSeconds:pause};
  rounds=rows.length*8;interval=30;duration=(rows.length*240+(rows.length-1)*pause)/60;
 }else{
  duration=integer(draft.duration,1,mode==='amrap'?180:mode==='fortime'?60:120,mode==='fortime'?'CAP':'Duración');
  if(mode==='fortime')rounds=integer(draft.rounds,1,100,'Rondas');
  if(mode==='emom'){
   interval=integer(draft.interval,10,600,'Intervalo');
   if(duration*60%interval||duration*60/interval>120)throw new Error('El tiempo debe contener entre 1 y 120 intervalos completos.');
   if(duration*60/interval<rows.length)throw new Error('Debe haber al menos un intervalo por estación.');
  }
 }
 cap=duration;
 const moves=rows.map((r,i)=>{
  const m=allowed.get(r.id);if(!m)throw new Error(`Movimiento ${i+1}: no disponible para el material, nivel, habilidades o formato seleccionados.`);
  const units=mode==='tabata'?20:integer(r.units,1,m.unit==='meters'?50000:m.unit==='sec'?3600:1000,`Cantidad de ${m.name}`);
  const kg=optional(r.kg,400,`Peso de ${m.name}`),height=optional(r.height,1000,`Altura de ${m.name}`);
  if(kg!==null&&!isLoaded(m)&&!m.req.includes('slamball'))throw new Error(`${m.name}: el catálogo no especifica carga externa.`);
  if(kg!==null)for(const id of m.req.filter(x=>['db','kb','barbell','wallball','sandbag','medball','slamball'].includes(x))){
   const max=profile.equipment[id]?.load;if(max!==''&&max!=null&&Number(max)>0&&kg>Number(max))throw new Error(`${m.name}: el peso supera el máximo del perfil (${max} kg).`);
  }
  if(height!==null&&!m.req.some(x=>['box','walltarget','wall','ropeclimb','rig','rings'].includes(x)))throw new Error(`${m.name}: el catálogo no especifica una altura de material.`);
  if(smart&&!candidateAllowed109(m,stress,mode,readiness,assessment))warnings.push(`${m.name}: el filtro inteligente actual desaconseja este movimiento.`);
  const estimateSeconds=mode==='tabata'?20:Math.max(1,estimateStationSeconds110(m,units,units*(m.unit==='climbs'?15:3)));
  const amount=(mode==='tabata'?'20 s (máx. reps / trabajo)':`${units} ${EDIT_UNITS[m.unit]}`)+(kg===null?'':` · ${kg} kg`)+(height===null?'':` · ${height} cm`);
  return {...m,units,amount,estimateSeconds,editKg:kg,editHeight:height,...(mode==='tabata'?{block:i+1}:{})};
 });
 const sums=moves.reduce((s,m)=>s+m.estimateSeconds,0), n=moves.length;
 let counts,elapsed;
 if(mode==='fortime'){counts=moves.map(()=>rounds);elapsed=(sums+n*6)*rounds;}
 else if(mode==='emom'){const total=duration*60/interval;counts=moves.map((_,i)=>Math.floor(total/n)+(i<total%n?1:0));elapsed=duration*60;
  moves.forEach(m=>{if(m.estimateSeconds>=interval)warnings.push(`${m.name}: el trabajo estimado ocupa o supera su intervalo.`);else if(m.estimateSeconds>interval*.77)warnings.push(`${m.name}: queda poco margen de descanso en su intervalo.`);});}
 else if(mode==='tabata'){counts=moves.map(()=>1);elapsed=duration*60;}
 else {counts=moves.map(()=>duration*60/(sums+n*6+15));elapsed=duration*60;}
 const costs=mergeCosts(moves.map((m,i)=>patternDose109(m,m,counts[i],mode)));
 const ratios=Object.entries(costs).map(([p,v])=>v/Math.max(.01,budgets[p]??5));
 const budgetUse=Math.round(Math.max(0,...ratios)*100);
 const domains=[...new Set(moves.map(stimulusDomain))];
 if(smart){
  if(!state.plan.length||!state.plan.some(p=>Math.abs(daysApart(p.date,original.date))<=2))warnings.push('No consta programación oficial cercana: contexto insuficiente para valorar interferencias.');
  if(assessment.shouldRecover)warnings.push(assessment.reason);
  const over=Object.entries(costs).filter(([p,v])=>v>(budgets[p]??5)*1.001);
  if(over.length)warnings.push(`Presupuesto superado: ${over.map(([p])=>PATTERN_NAMES[p]||p).join(', ')}.`);
  if(moves.some(m=>m.editKg!==null||m.editHeight!==null))warnings.push('El cálculo relativo no incorpora los kilos ni la altura introducidos; revisa manualmente su impacto.');
 }
 if(mode==='fortime'&&elapsed>cap*60)warnings.push('El tiempo estimado supera el CAP.');
 const expectedMinutes=Math.round(elapsed/6)/10;
 const interference=smart?(warnings.length?'Requiere revisión':'Dentro de los presupuestos relativos (orientativo)'):'No evaluada en modo libre';
 const name=String(draft.name||'').trim().slice(0,65),extraNotes=String(draft.notes||'').trim().slice(0,500);
 const fmt=formatMinutes(duration);
 const base=mode==='fortime'?`FOR TIME · CAP ${fmt}'`:mode==='amrap'?`AMRAP ${fmt}'`:mode==='emom'?`EMOM ${fmt}'`:`TABATA ${fmt}'`;
 const title=name?`${base} · ${name}`:base;
 const advice=mode==='fortime'?`${rounds} rondas por tiempo (CAP ${cap}'). Tiempo estimado orientativo: ${formatMinutes(expectedMinutes)} min.`:mode==='amrap'?`Máximas rondas y repeticiones en ${fmt} minutos.`:mode==='emom'?`${duration*60/interval} intervalos de ${interval} s, alternando ${n} estaciones.`:`${n} bloques de 8×(20 s trabajo / 10 s descanso)${n>1?`, ${tabata.betweenBlocksSeconds} s entre bloques`:''}. Duración total ${fmt} min.`;
 const costText=Object.entries(costs).sort((a,b)=>b[1]-a[1]).map(([p,v])=>`${PATTERN_NAMES[p]||p}: ${v.toFixed(1)}${smart?`/${(budgets[p]??5).toFixed(1)}`:''}`).join('; ');
 const notes=`Edición manual: no validada por la selección automática. Carga relativa estimada: ${costText}. ${smart?'Comparada con programación y resultados registrados. ':'Modo libre: sin validación de interferencias. '}${warnings.length?'Avisos: '+warnings.join(' '):''} Las cargas y alturas son prescripciones, no ajustes del modelo; no se garantiza el RPE ni la seguridad.${extraNotes?' Notas del atleta: '+extraNotes:''}`;
 const edited={...original,id:original.id,kind:'wod',title,mode,duration,cap,rounds,interval,tabata,movements:moves,patterns:[...new Set(moves.flatMap(m=>m.patterns))],profileName:profile.name,advice,notes,edited:true,editName:name,editNotes:extraNotes,objective:original.requestedObjective||original.objective,readiness:smart?readiness:original.readiness,
  stimulusReport:{domains,interference,budgetUse:smart?budgetUse:null,expectedMinutes,advice:'Estimación manual sin puntuación de generación automática.'}, editWarnings:warnings,editedFrom:original.id};
 // Valida el mismo protocolo que se usa al pulsar Abrir contador WOD.
 contadorUrlForWod(edited);
 return {wod:edited,warnings,costs,budgets:smart?budgets:null,expectedMinutes};
}
