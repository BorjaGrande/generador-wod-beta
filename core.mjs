// Generador WOD beta — motor local, independiente de la interfaz y sin servicios externos.
export const VERSION = '1.0.3-beta';
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
export const DEFAULT_STATE = () => ({version:VERSION,profiles:[{id:'principal',name:'Mi material',equipment:{}}],activeProfile:'principal',skills:[],plan:[],wods:[],logs:[],lastWod:null});
export function sanitizeState(raw) {
 const d=DEFAULT_STATE(); if(!raw||typeof raw!=='object')return d;
 const profiles=Array.isArray(raw.profiles)?raw.profiles.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&p.equipment&&typeof p.equipment==='object').slice(0,15):[];
 return {version:VERSION,profiles:profiles.length?profiles:d.profiles,activeProfile:typeof raw.activeProfile==='string'?raw.activeProfile:d.activeProfile,skills:Array.isArray(raw.skills)?raw.skills.filter(x=>SKILLS.some(s=>s[0]===x)):[],plan:Array.isArray(raw.plan)?raw.plan.filter(p=>p&&isISODate(p.date)&&typeof p.title==='string').slice(0,1000):[],wods:Array.isArray(raw.wods)?raw.wods.filter(w=>w&&Array.isArray(w.movements)).slice(0,1000):[],logs:Array.isArray(raw.logs)?raw.logs.filter(w=>w&&typeof w.date==='string').slice(0,2000):[],lastWod:raw.lastWod&&Array.isArray(raw.lastWod.movements)?raw.lastWod:null};
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
export function getStress(plan,logs,date){
 const scores={};const details=[];
 for(const p of plan){const diff=Math.abs(daysApart(p.date,date));if(diff>2)continue;const weight=[3,2,0.8][diff]*(Math.max(1,Math.min(10,Number(p.rpe)||7))/7);const patterns=inferPatterns(`${p.title} ${p.movements||''} ${p.notes||''}`);for(const pattern of patterns)scores[pattern]=(scores[pattern]||0)+weight;details.push({date:p.date,title:p.title,source:'Planificación',patterns});}
 for(const l of logs){const diff=daysApart(date,l.date);if(diff<0||diff>2)continue;const weight=[2.6,1.8,0.6][diff]*(Math.max(1,Math.min(10,Number(l.rpe)||7))/7);const patterns=Array.isArray(l.patterns)&&l.patterns.length?l.patterns:inferPatterns(l.movementsText||'');for(const pattern of patterns)scores[pattern]=(scores[pattern]||0)+weight;details.push({date:l.date,title:l.title||'WOD registrado',source:'Registro',patterns});}
 return {scores,details};
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
   const stressWeight=strategy==='inteligente'?m.patterns.reduce((sum,p)=>sum+(stress.scores[p]||0),0):0;
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
export function generateWod({state,mode='random',strategy='libre',duration=15,level='intermedio',objective='mixto',date,rng=Math.random}){
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
 const candidatePool=eligibleMovements(profile,state.skills,level);
 const overloaded=new Set(strategy==='inteligente'?Object.entries(stress.scores).filter(([,v])=>v>=2.3).map(([p])=>p):[]);
 let pool=candidatePool.filter(m=>!m.patterns.some(p=>overloaded.has(p)));
 if(mode==='tabata')pool=pool.filter(m=>TABATA_SAFE.has(m.id));
 if(mode==='emom')pool=pool.filter(m=>stationDose(m,level)!==null);
 if(pool.length<(mode==='tabata'?1:2))throw new Error(strategy==='inteligente'?'La carga de sesiones próximas no deja suficiente variedad segura para este WOD. Reduce el estímulo o prioriza recuperación.':'No hay suficientes ejercicios compatibles con esta modalidad, material y nivel. Prueba otro formato o selecciona más equipamiento.');
 const layout=mode==='tabata'?tabataLayout(duration):null;
 const target=mode==='tabata'?Math.min(layout.blocks,pool.length):mode==='emom'?Math.min(4,Math.max(2,Math.round(duration/5))):duration<10?3:4;
 const selected=selectBalanced(pool,target,objective,strategy,stress,rng);
 if(selected.length<(mode==='tabata'&&layout.blocks===1?1:2))throw new Error('No se puede crear un WOD equilibrado con los ejercicios habilitados; selecciona más material, otro nivel u otra modalidad.');
 const stations=mode==='tabata'?Array.from({length:layout.blocks},(_,i)=>selected[i%selected.length]):selected;
 const movementEntries=stations.map((m,i)=>({...m,amount:makeAmount(m,mode,duration,level),...(mode==='emom'?{estimateSeconds:stationDose(m,level).estimate}:{}),...(mode==='tabata'?{block:i+1}:{} )}));
 const activeStress=Object.entries(stress.scores).filter(([,v])=>v>=2.3).sort((a,b)=>b[1]-a[1]).map(([p])=>PATTERN_NAMES[p]||p);
 const rounds=mode==='tabata'?layout.blocks*8:mode==='fortime'?(duration<=12?3:5):null;
 const effectiveDuration=mode==='tabata'?layout.total/60:duration;
 const noteDuration=mode==='tabata'&&layout.total!==duration*60?` Duración solicitada: ${duration} min; ajustada a ${formatMinutes(effectiveDuration)} para respetar bloques completos y descansos.`:'';
 const notes=strategy==='inteligente'?(stress.details.length?`Se han ponderado ${stress.details.length} sesiones cercanas. ${activeStress.length?'Precaución con: '+activeStress.slice(0,3).join(', ')+'.':'No se detectan picos claros de carga con los datos cargados.'} Revisa intensidad, técnica y recuperación.`:'No hay sesiones cercanas registradas; selección basada en el material y nivel.'):'WOD aleatorio condicionado por material y nivel; revisa cargas antes de comenzar.';
 const advice=mode==='amrap'?'Máximas rondas y repeticiones en el tiempo indicado.':
 mode==='fortime'?`${rounds} rondas por tiempo. Time cap sugerido: ${duration} minutos.`:
 mode==='emom'?`Una estación por minuto, en orden, durante ${duration} min. Dosis orientativas de 25–45 s de trabajo; descansa el tiempo restante. Si no cabe con buena técnica, reduce repeticiones.`:
 `${layout.blocks} ${layout.blocks===1?'bloque':'bloques'} de 8×(20 s trabajo / 10 s descanso), 4 min por bloque${layout.blocks>1?layout.rest===0?', sin pausa adicional entre bloques':` y ${layout.rest} s de recuperación entre bloques`:''}. ${rounds} intervalos de trabajo en total.${noteDuration}`;
 const title=mode==='amrap'?`AMRAP ${duration}'`:mode==='fortime'?`FOR TIME · CAP ${duration}'`:mode==='emom'?`EMOM ${duration}'`:layout.blocks===1?`TABATA 4'`:`TABATA POR BLOQUES ${formatMinutes(effectiveDuration)}'`;
 return {id:`wod-${Date.now()}-${Math.floor(rng()*1e7)}`,date,mode,strategy,level,objective,duration:effectiveDuration,requestedDuration:duration,cap:duration,rounds,interval:mode==='emom'?60:mode==='tabata'?30:0,
 ...(layout?{tabata:{blocks:layout.blocks,roundsPerBlock:8,workSeconds:20,restSeconds:10,betweenBlocksSeconds:layout.rest}}:{}),
 title,movements:movementEntries,patterns:[...new Set(selected.flatMap(m=>m.patterns))],notes,advice,profileName:profile.name,createdAt:new Date().toISOString(),intensity:strategy==='inteligente'?(activeStress.length?'RPE 5–6/10 orientativo':'RPE 6–7/10 orientativo'):'RPE 6–7/10 orientativo'};
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
 const names={amrap:'AMRAP',fortime:'FOR TIME',emom:'EMOM',tabata:'TABATA'};
 const header=`*WOD ${w.strategy==='inteligente'?'EXTRA INTELIGENTE':'ALEATORIO'}*\n*${w.title}* · ${w.date}\nNivel: ${w.level} · Objetivo: ${w.objective}`;
 const movements=w.movements.map((m,i)=>w.mode==='tabata'?`Bloque ${i+1}: 8×20/10 · ${m.name}`:`${i+1}. ${m.amount} ${m.name}${w.mode==='emom'&&m.estimateSeconds?` (≈${m.estimateSeconds} s)`:''}`).join('\n');
 return `${header}\n\n${movements}\n\n*Formato:* ${w.advice}\n*Intensidad:* ${w.intensity}\n*Control de interferencias:* ${w.notes}\n\nRevisar cargas y escalados antes de entrenar.`;
}
export function toCSV(rows,headers){const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;return [headers.join(';'),...rows.map(r=>headers.map(h=>q(r[h])).join(';'))].join('\r\n');}
