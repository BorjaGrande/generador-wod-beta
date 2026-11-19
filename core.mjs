// Generador WOD beta — motor local, independiente de la interfaz y sin servicios externos.
export const VERSION = '1.0.0-beta';
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
export function makeAmount(m,mode,duration,level){
 const i=level==='principiante'?0:level==='avanzado'?2:1;
 const spec={reps:[8,12,15],sec:[20,30,40],meters:[100,200,300],cals:[6,10,13],climbs:[1,1,2]};let amount=spec[m.unit]?.[i]||10;
 if(mode==='tabata')return '20 s';
 if(mode==='emom')amount=m.unit==='meters'?Math.min(amount,150):m.unit==='sec'?25:Math.max(3,Math.round(amount*.7));
 if(m.id==='doubles')amount=level==='avanzado'?35:25;
 if(m.id==='singles')amount=40;
 if(m.id==='running'&&mode==='fortime')amount=200;
 if(mode==='fortime'&&m.unit==='reps')amount=Math.max(5,Math.round(amount*1.15));
 return `${amount} ${m.unit==='meters'?'m':m.unit==='cals'?'cal':m.unit==='sec'?'s':m.unit==='climbs'?'ascensos':'reps'}`;
}
function chooseWeighted(pool,rng){const weights=pool.map(o=>Math.max(0.001,o.weight));const total=weights.reduce((a,b)=>a+b,0);let n=rng()*total;for(let i=0;i<pool.length;i++){n-=weights[i];if(n<=0)return pool[i];}return pool[pool.length-1];}
export function generateWod({state,mode='random',strategy='libre',duration=15,level='intermedio',objective='mixto',date,rng=Math.random}){
 if(!isISODate(date))throw new Error('Elige una fecha válida.');
 const profile=state.profiles.find(p=>p.id===state.activeProfile)||state.profiles[0];
 if(strategy==='inteligente'&&!state.plan.length)throw new Error('Para usar WOD extra inteligente, carga primero tu programación oficial de CrossFit.');
 if(strategy==='inteligente'&&!state.plan.some(p=>Math.abs(daysApart(p.date,date))<=2))throw new Error('No hay sesiones oficiales en los dos días anteriores o posteriores a la fecha elegida. Importa esa parte de la programación antes de generar un WOD extra inteligente.');
 const formats=['amrap','fortime','emom','tabata'];if(mode==='random')mode=formats[Math.floor(rng()*formats.length)];if(!formats.includes(mode))throw new Error('Modalidad no válida.');
 duration=Math.round(Number(duration));if(duration<4||duration>60)throw new Error('La duración debe estar entre 4 y 60 minutos.');
 const stress=getStress(strategy==='inteligente'?state.plan:[],strategy==='inteligente'?state.logs:[],date);
 const candidatePool=eligibleMovements(profile,state.skills,level);
 const overloaded=new Set(strategy==='inteligente'?Object.entries(stress.scores).filter(([,v])=>v>=2.3).map(([p])=>p):[]);
 const pool=candidatePool.filter(m=>!m.patterns.some(p=>overloaded.has(p)));
 if(pool.length<2)throw new Error(strategy==='inteligente'?'La programación cercana y la carga registrada dejan menos de dos movimientos sin patrones sobrecargados. No se recomienda generar un WOD extra con estos criterios; revisa recuperación o consulta al entrenador.':'No hay suficientes movimientos compatibles. Activa material o usa otro nivel.');
 const target=mode==='tabata'?2:mode==='emom'?Math.min(4,Math.max(2,Math.round(duration/5))):duration<10?3:4;
 const selected=[];
 const requirements=objective==='cardio'?['cardio']:objective==='gimnasia'?['pull','core','push']:objective==='fuerza-resistencia'?['squat','hinge','push']:[];
 while(selected.length<Math.min(target,pool.length)){
  const available=pool.filter(m=>!selected.some(s=>s.id===m.id));
  const options=available.map(m=>{
   const overlap=selected.flatMap(x=>x.patterns).filter(p=>m.patterns.includes(p)).length;
   const stressWeight=strategy==='inteligente'?m.patterns.reduce((sum,p)=>sum+(stress.scores[p]||0),0):0;
   const objectiveBoost=requirements.some(p=>m.patterns.includes(p))?1.65:1;
   const typeBoost=selected.length===0&&m.patterns.includes('cardio')?1.2:1;
   return {m,weight:(objectiveBoost*typeBoost)/(1+overlap*1.9+stressWeight*1.35)};
  });
  const chosen=chooseWeighted(options,rng).m;selected.push(chosen);
 }
 const movementEntries=selected.map(m=>({...m,amount:makeAmount(m,mode,duration,level)}));
 const activeStress=Object.entries(stress.scores).filter(([,v])=>v>=2.3).sort((a,b)=>b[1]-a[1]).map(([p])=>PATTERN_NAMES[p]||p);
 const interval=mode==='emom'?60:mode==='tabata'?30:0;
 const rounds=mode==='tabata'?Math.max(1,Math.floor(duration*60/30)):mode==='fortime'?(duration<=12?3:5):null;
 const effectiveDuration=mode==='tabata'?rounds*30/60:mode==='emom'?duration:duration;
 const notes=strategy==='inteligente'?(stress.details.length?`Se han ponderado ${stress.details.length} sesiones cercanas. ${activeStress.length?'Precaución con: '+activeStress.slice(0,3).join(', ')+'.':'No se detectan picos claros de carga con los datos cargados.'} Revisa intensidad, técnica y recuperación.`:'No hay sesiones cercanas registradas; selección basada en el material y nivel.'): 'WOD aleatorio condicionado por material y nivel; revisa cargas antes de comenzar.';
 const advice=mode==='amrap'?'Máximas rondas y repeticiones en el tiempo indicado.':mode==='fortime'?`${rounds} rondas por tiempo. Time cap sugerido: ${duration} minutos.`:mode==='emom'?`Cada minuto inicia un nuevo trabajo. Rota los ${movementEntries.length} ejercicios durante ${duration} minutos.`:`${rounds} rondas de 20 s de trabajo y 10 s de descanso; alterna ejercicios.`;
 return {id:`wod-${Date.now()}-${Math.floor(rng()*1e7)}`,date,mode,strategy,level,objective,duration:effectiveDuration,cap:duration,rounds,interval,title:mode==='amrap'?`AMRAP ${duration}'`:mode==='fortime'?`FOR TIME · CAP ${duration}'`:mode==='emom'?`EMOM ${duration}'`:`TABATA ${rounds}×(20/10)`,movements:movementEntries,patterns:[...new Set(selected.flatMap(m=>m.patterns))],notes,advice,profileName:profile.name,createdAt:new Date().toISOString(),intensity:strategy==='inteligente'?(activeStress.length?'RPE 5–6/10 orientativo':'RPE 6–7/10 orientativo'):'RPE 7/10 orientativo'};
}
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
 const movements=w.movements.map((m,i)=>`${i+1}. ${m.amount} ${m.name}`).join('\n');
 return `${header}\n\n${movements}\n\n*Formato:* ${w.advice}\n*Intensidad:* ${w.intensity}\n*Control de interferencias:* ${w.notes}\n\nRevisar cargas y escalados antes de entrenar.`;
}
export function toCSV(rows,headers){const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;return [headers.join(';'),...rows.map(r=>headers.map(h=>q(r[h])).join(';'))].join('\r\n');}
