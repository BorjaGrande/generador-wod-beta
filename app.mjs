import {VERSION,EQUIPMENT_GROUPS,SKILLS,MOVEMENTS,OFFICIAL_MOVEMENT_CATALOG,OFFICIAL_LIBRARY_URL,unavailableRequirements,canGenerateMovement,PATTERN_NAMES,DEFAULT_STATE,sanitizeState,normalizeReadiness,isISODate,daysApart,getStress,generateWod,parsePlanCSV,formatWhatsapp,toCSV,contadorUrlForWod,parseCounterTransfer,editorMovements,editWod,searchMovements,suggestSubstitutions} from './core.mjs?v=1.0.18';
import {analyzeTrainingResults} from './analytics.mjs?v=1.0.18';
const STORAGE_KEY='generador-wod-beta-v1';
// La etiqueta de versión depende del motor importado, no sólo del HTML.
document.querySelector('.version').textContent=`v${VERSION.replace('-beta',' BETA')}`;
let pendingRecoveryOptions=null;
let pendingCounterResult=null;
const $=id=>document.getElementById(id);
const now=()=>{const t=new Date();return [t.getFullYear(),String(t.getMonth()+1).padStart(2,'0'),String(t.getDate()).padStart(2,'0')].join('-')};
const node=(tag,text,klass)=>{const e=document.createElement(tag);if(text!==undefined&&text!==null)e.textContent=String(text);if(klass)e.className=klass;return e;};
let state=DEFAULT_STATE();try{state=sanitizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));}catch{state=DEFAULT_STATE()}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(err){notice('No se han podido guardar los cambios. Exporta una copia y revisa el almacenamiento de Safari.','error');console.error(err)}}
function readReadiness(){return normalizeReadiness({fatigue:$('readiness-fatigue').value,soreness:$('readiness-soreness').value,effort:$('readiness-effort').value});}
function renderReadiness(){state.readiness=normalizeReadiness(state.readiness);$('readiness-fatigue').value=state.readiness.fatigue;$('readiness-soreness').value=state.readiness.soreness;$('readiness-effort').value=state.readiness.effort;updateReadinessVisibility();}
function updateReadinessVisibility(){const strategy=document.querySelector('input[name="strategy"]:checked')?.value||'libre';$('readiness-panel').classList.toggle('hidden',strategy!=='inteligente');}
for(const el of document.querySelectorAll('input[name="strategy"]'))el.addEventListener('change',updateReadinessVisibility);
for(const id of ['readiness-fatigue','readiness-soreness','readiness-effort'])$(id).addEventListener('change',()=>{state.readiness=readReadiness();save();});

function notice(message,type='success'){const el=$('notice');el.textContent=message;el.className=`notice show ${type}`;el.scrollIntoView({behavior:'auto',block:'nearest'});}
function clearNotice(){$('notice').className='notice';$('notice').textContent=''}
// Un error anterior no debe aparecer como resultado de una fecha nueva.
for(const id of ['wod-date','mode','duration','level','objective','profile-select','readiness-fatigue','readiness-soreness','readiness-effort'])$(id).addEventListener('change',clearNotice);
function btn(title,callback,style='ghost'){const b=node('button',title,`button ${style}`);b.type='button';b.addEventListener('click',callback);return b;}
function option(value,label){const e=document.createElement('option');e.value=value;e.textContent=label;return e;}
function downloadFile(filename,content,type){const b=new Blob([content],{type});const a=document.createElement('a');const url=URL.createObjectURL(b);a.href=url;a.download=filename;a.style.display='none';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}
// Compartir directamente por la hoja nativa del dispositivo (iOS / Android).
// La llamada a navigator.share se realiza en el gesto del usuario, sin awaits
// previos para no perder la activación transitoria necesaria en Safari/PWA.
async function copyText(content){
 try{
  if(navigator.clipboard?.writeText){
   await navigator.clipboard.writeText(content);
   notice('Menú nativo no disponible. Texto copiado; puedes pegarlo en la aplicación que quieras.');
   return;
  }
  throw new Error('Portapapeles moderno no disponible');
 }catch{
  const area=node('textarea');area.value=content;
  area.readOnly=true;area.setAttribute('aria-label','Texto del entrenamiento para copiar');
  area.style.cssText='position:fixed;top:0;left:0;opacity:0;width:1px;height:1px;';
  document.body.append(area);area.focus();area.select();
  area.setSelectionRange(0,area.value.length);
  let copied=false;
  try{copied=document.execCommand('copy');}catch{}
  area.remove();
  if(copied)notice('Menú nativo no disponible. Texto copiado; puedes pegarlo donde quieras.');
  else{
   // Dejar el contenido accesible para selección manual si tampoco hay portapapeles.
   const panel=$('wod-result');
   const fallback=node('textarea',null,'share-fallback');fallback.value=content;
   fallback.readOnly=true;fallback.rows=8;fallback.style.width='100%';
   panel.append(node('p','No se ha podido compartir ni copiar automáticamente. Selecciona el texto y cópialo manualmente.','wod-info'),fallback);
   fallback.focus();fallback.select();
   notice('Compartir no disponible: el texto está seleccionado para copiar manualmente.','warn');
  }
 }
}
async function shareWod(w){
 const content=formatWhatsapp(w);
 if(typeof navigator.share==='function'){
  try{
   await navigator.share({title:'Entrenamiento · Generador WOD',text:content});
   return;
  }catch(err){
   // Cerrar la hoja de compartir es una elección normal: no copiar sin permiso.
   if(err?.name==='AbortError')return;
   console.warn('Compartir nativo no disponible:',err);
  }
 }
 await copyText(content);
}
function shareWodButton(w,label='Compartir WOD'){
 const b=btn(label,()=>{void shareWod(w);},'ghost');
 b.setAttribute('aria-label',label+' mediante el menú de compartir del dispositivo');
 return b;
}
function showView(which){document.querySelectorAll('.view').forEach(el=>el.classList.toggle('hidden',el.id!==`view-${which}`));document.querySelectorAll('.tab').forEach(el=>{const active=el.dataset.view===which;el.classList.toggle('active',active);el.setAttribute('aria-current',active?'page':'false')});clearNotice();window.scrollTo({top:0,behavior:'instant'});if(which==='historial')renderLogs();}
for(const tab of document.querySelectorAll('.tab'))tab.addEventListener('click',()=>showView(tab.dataset.view));
function getProfile(){return state.profiles.find(p=>p.id===state.activeProfile)||state.profiles[0]}
function changeProfile(id){if(!state.profiles.some(p=>p.id===id))return;state.activeProfile=id;save();renderProfiles();renderInventory();renderCatalog();}
function renderProfiles(){for(const id of ['profile-select','inventory-profile']){const s=$(id);const prev=state.activeProfile;s.replaceChildren();for(const p of state.profiles)s.append(option(p.id,p.name));s.value=prev;} }
$('profile-select').addEventListener('change',e=>changeProfile(e.target.value));$('inventory-profile').addEventListener('change',e=>changeProfile(e.target.value));
$('new-profile').addEventListener('click',()=>{const name=prompt('Nombre del nuevo perfil de material (ej.: Gimnasio completo):');if(!name?.trim())return;const id=`perfil-${Date.now()}`;state.profiles.push({id,name:name.trim().slice(0,55),equipment:{}});state.activeProfile=id;save();renderProfiles();renderInventory();renderCatalog();notice('Perfil creado. Selecciona el material disponible.');});
$('rename-profile').addEventListener('click',()=>{const p=getProfile();const name=prompt('Nuevo nombre del perfil:',p.name);if(!name?.trim())return;p.name=name.trim().slice(0,55);save();renderProfiles();notice('Perfil renombrado.');});
$('delete-profile').addEventListener('click',()=>{if(state.profiles.length===1){notice('Debes conservar al menos un perfil.','warn');return}const p=getProfile();if(!confirm(`¿Eliminar el perfil «${p.name}»? Esta acción no elimina los WODs ya registrados.`))return;state.profiles=state.profiles.filter(a=>a.id!==p.id);state.activeProfile=state.profiles[0].id;save();renderProfiles();renderInventory();renderCatalog();notice('Perfil eliminado.');});
function renderInventory(){const profile=getProfile();$('equipment-groups').replaceChildren();let count=0;for(const group of EQUIPMENT_GROUPS){const wrapper=node('div',null,'equipment-group');wrapper.append(node('h4',group.title));const grid=node('div',null,'check-grid');for(const [id,label] of group.items){const material=profile.equipment[id]||{enabled:false,qty:1,load:''};if(material.enabled)count++;const item=node('div',null,'equip-row');const checklabel=node('label');const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=!!material.enabled;checkbox.setAttribute('aria-label',label);checklabel.append(checkbox,node('span',label));item.append(checklabel);const meta=node('div',null,'equip-meta');const qtyLabel=node('span','Cantidad:');const qty=document.createElement('input');qty.type='number';qty.min='1';qty.max='99';qty.value=material.qty||1;qty.setAttribute('aria-label',`Cantidad de ${label}`);const weightLabel=node('span','Peso máx. (kg):');const load=document.createElement('input');load.type='number';load.min='0';load.max='400';load.step='0.5';load.placeholder='—';load.value=material.load||'';load.setAttribute('aria-label',`Peso máximo para ${label} (kg)`);load.disabled=!checkbox.checked;qty.disabled=!checkbox.checked;
function update(){profile.equipment[id]={enabled:checkbox.checked,qty:Number(qty.value)||1,load:load.value===''?'':Number(load.value)};save();renderCatalog();const selected=Object.values(profile.equipment).filter(e=>e.enabled).length;$('selected-count').textContent=`${selected} activos`;qty.disabled=!checkbox.checked;load.disabled=!checkbox.checked;}
checkbox.addEventListener('change',update);qty.addEventListener('change',update);load.addEventListener('change',update);meta.append(qtyLabel,qty,weightLabel,load);item.append(meta);grid.append(item)}wrapper.append(grid);$('equipment-groups').append(wrapper)}$('selected-count').textContent=`${count} activos`;
const skills=$('skill-options');skills.replaceChildren();
skills.classList.remove('check-grid');
const groupFor=id=>{
 if(['olympic','barbell_snatch','barbell_clean','barbell_jerk','overhead_squat','front_rack','db_snatch','kb_snatch','sdlhp','db_overhead','db_jerk','turkish_getup'].includes(id))return 'Halterofilia y cargas';
 if(/hspu|handstand|wall_walk|press_handstand|inverted_burpee|pirouette/.test(id))return 'Invertidos y HSPU';
 if(/ghd|l_sit|hanging_l|ring_l|windshield|pistol|shoot_through|skin_the_cat|swing_roll|roll_support|shoulder_stand/.test(id))return 'Core y habilidades avanzadas';
 if(/rope/.test(id))return 'Trepa de cuerda';
 if(id==='du')return 'Comba';
 return 'Dominadas, fondos y anillas';
};
const grouped=new Map();for(const entry of SKILLS){const name=groupFor(entry[0]);if(!grouped.has(name))grouped.set(name,[]);grouped.get(name).push(entry);}
for(const [groupName,items] of grouped){const details=node('details',null,'skill-category');
 details.open=groupName==='Halterofilia y cargas'&&items.some(([id])=>state.skills.includes(id));
 const title=node('summary',`${groupName} · ${items.filter(([id])=>state.skills.includes(id)).length}/${items.length} habilitados`);
 details.append(title);const grid=node('div',null,'check-grid');
 for(const [id,name] of items){const label=node('label');const inp=document.createElement('input');inp.type='checkbox';inp.checked=state.skills.includes(id);inp.addEventListener('change',()=>{
  state.skills=inp.checked?[...new Set([...state.skills,id])]:state.skills.filter(x=>x!==id);
  title.textContent=`${groupName} · ${items.filter(([key])=>state.skills.includes(key)).length}/${items.length} habilitados`;
  save();renderCatalog();
 });label.append(inp,node('span',name));const wrap=node('div',null,'skill-row');wrap.append(label);grid.append(wrap)}
 details.append(grid);skills.append(details)
}
}
function renderCatalog(){
 const target=$('movement-catalog');if(!target)return;
 const filter=String($('catalog-search')?.value||'').toLocaleLowerCase('es').trim();
 const only=$('catalog-filter')?.value||'all';
 const equipment=$('catalog-equipment').value,skill=$('catalog-skill').value;
 const profile=getProfile();const skills=state.skills;
 const allowedLevel=$('level')?.value||'intermedio';
 const count=OFFICIAL_MOVEMENT_CATALOG.filter(m=>canGenerateMovement(m,profile,skills,allowedLevel)).length;
 $('catalog-count').textContent=`${count} disponibles de ${OFFICIAL_MOVEMENT_CATALOG.length} fichas · nivel ${allowedLevel}`;
 const results=searchMovements(OFFICIAL_MOVEMENT_CATALOG,filter).filter(m=>{
  const eligible=canGenerateMovement(m,profile,skills,allowedLevel);
  if(equipment==='none'&&m.req.length||equipment!=='all'&&equipment!=='none'&&!m.req.includes(equipment))return false;
  if(skill==='none'&&m.skillsRequired.length||skill!=='all'&&skill!=='none'&&!m.skillsRequired.includes(skill))return false;
  if(only==='ready'&&!eligible||only==='blocked'&&eligible||only==='reference'&&m.auto)return false;
  return true;
 });
 target.replaceChildren();
 if(!results.length){target.append(node('p','No hay movimientos con esos filtros.','hint'));return;}
 for(const m of results){
  const ready=canGenerateMovement(m,profile,skills,allowedLevel);
  const missing=unavailableRequirements(m,profile,skills);
  const wrap=node('details',null,'movement-catalog-card');
  const summary=node('summary',null,'catalog-summary');
  const names=node('span',m.name,'catalog-name');
  const status=node('span',ready?'Disponible':m.auto?'Bloqueado':'Referencia','catalog-status');
  if(ready)status.classList.add('is-ready');
  summary.append(names,status);wrap.append(summary);
  const body=node('div',null,'catalog-body');
  body.append(node('p',`Ejecución (resumen orientativo): ${m.cue}`));
  if(!m.auto)body.append(node('p','Movimiento de referencia o progresión técnica. No se incorpora automáticamente a los WODs.','hint'));
  if(m.tier>({principiante:1,intermedio:2,avanzado:3}[allowedLevel]||2))body.append(node('p',`Nivel necesario: ${m.tier===3?'avanzado':'intermedio'}.`,'hint'));
  if(missing.material.length)body.append(node('p',`Material pendiente: ${missing.material.map(id=>EQUIPMENT_GROUPS.flatMap(g=>g.items).find(e=>e[0]===id)?.[1]||id).join(', ')}`,'hint'));
  if(missing.technique.length)body.append(node('p',`Habilidad sin habilitar: ${missing.technique.map(id=>SKILLS.find(s=>s[0]===id)?.[1]||id).join(', ')}`,'hint'));
  body.append(node('p',`Material: ${m.req.map(id=>EQUIPMENT_GROUPS.flatMap(g=>g.items).find(e=>e[0]===id)?.[1]||id).join(', ')||'Sin material específico'}. · Skills: ${m.skillsRequired.map(id=>SKILLS.find(s=>s[0]===id)?.[1]||id).join(', ')||'Sin requisito específico'}.`,'hint'));
  if(m.source==='wod')body.append(node('p','Movimiento utilizado en WODs de CrossFit; no forma parte del índice principal de demostraciones.','hint'));
  const a=node('a',m.sourceUrl===OFFICIAL_LIBRARY_URL?'Consultar biblioteca CrossFit':'Ver demostración CrossFit','catalog-official');
  a.href=m.sourceUrl;a.target='_blank';a.rel='noopener noreferrer';body.append(a);wrap.append(body);target.append(wrap);
 }
}
for(const group of EQUIPMENT_GROUPS)for(const [id,label] of group.items)$('catalog-equipment').append(option(id,label));
for(const [id,label] of SKILLS)$('catalog-skill').append(option(id,label));
for(const id of ['catalog-search','catalog-filter','catalog-equipment','catalog-skill'])$(id)?.addEventListener(id==='catalog-search'?'input':'change',renderCatalog);
$('level')?.addEventListener('change',renderCatalog);
function renderPlan(){const list=$('plan-list');list.replaceChildren();$('plan-count').textContent=`${state.plan.length} sesiones`;if(!state.plan.length){list.append(node('div','No hay programación cargada. Importa un CSV o añade sesiones manualmente.','empty'));return}for(const p of [...state.plan].sort((a,b)=>a.date.localeCompare(b.date))){const e=node('div',null,'entry');const head=node('div',null,'entry-head');head.append(node('b',`${p.date} · ${p.title}`),btn('Eliminar',()=>{if(!confirm('¿Eliminar esta sesión de programación?'))return;state.plan=state.plan.filter(q=>q.id!==p.id);save();renderPlan()},'danger-ghost small'));e.append(head,node('small',`${p.movements||''}\nRPE ${p.rpe||7}${p.notes?' · '+p.notes:''}`));list.append(e)}}
$('plan-form').addEventListener('submit',ev=>{ev.preventDefault();const f=ev.currentTarget;const d=Object.fromEntries(new FormData(f));if(!isISODate(d.date)||!String(d.title||'').trim()||!String(d.movements||'').trim()){notice('Revisa fecha, nombre y movimientos.','error');return}const p={id:`plan-${Date.now()}`,date:d.date,title:d.title.trim(),movements:d.movements.trim(),rpe:Math.min(10,Math.max(1,Number(d.rpe)||7)),notes:d.notes||''};state.plan.push(p);save();renderPlan();f.reset();f.elements.date.value=now();notice('Sesión oficial registrada.');});
$('download-template').addEventListener('click',()=>downloadFile('plantilla-programacion-crossfit.csv','fecha;nombre;movimientos;rpe;notas\r\n2026-11-20;Ejemplo de sesión;Thrusters / Pull-ups;7;Fila ilustrativa: sustituir por tu programación real\r\n','text/csv;charset=utf-8'));
$('plan-file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>1_000_000)throw new Error('El archivo supera 1 MB.');const items=parsePlanCSV(await file.text());if(items.length>800)throw new Error('Demasiadas sesiones para una única importación.');let added=0;for(const item of items){const idx=state.plan.findIndex(x=>x.date===item.date&&x.title.toLowerCase()===item.title.toLowerCase());if(idx>=0)state.plan[idx]={...item,id:state.plan[idx].id};else{state.plan.push(item);added++}}save();renderPlan();notice(`CSV importado: ${items.length} sesiones leídas, ${added} nuevas. Revisa los ejercicios para que el análisis de carga sea útil.`)}catch(err){notice(`Error de importación: ${err.message}`,'error')}e.target.value='';});
$('clear-plan').addEventListener('click',()=>{if(!state.plan.length)return;if(!confirm('¿Borrar todas las sesiones oficiales cargadas? Exporta una copia primero si las necesitas.'))return;state.plan=[];save();renderPlan();notice('Programación eliminada.');});
function renderWod(w){
 const panel=$('wod-result');panel.replaceChildren();panel.classList.toggle('recovery',w?.kind==='recovery');panel.classList.toggle('caution',!!w?.forcedAgainstAdvice);
 if(!w){panel.classList.add('hidden');return}
 panel.classList.remove('hidden');
 if(w.kind==='recovery'){
  panel.append(node('div','AVISO DE COMPATIBILIDAD · NO SE GENERA WOD','wod-kicker'),node('h2',w.title,'wod-title'));
  panel.append(node('p','El análisis aconseja priorizar la recuperación. Este aviso no se añadirá a los WODs guardados ni a los resultados.','wod-info'));
  for(const m of w.movements){const line=node('div',null,'wod-movement');line.append(node('div',m.amount,'wod-amount'),node('div',m.name,'wod-name'));panel.append(line)}
  const info=node('div',null,'wod-advice');info.append(node('b',w.advice),node('p',`Intensidad: ${w.intensity}`),node('p',`Motivo: ${w.notes}`));panel.append(info);
  const actions=node('div',null,'wod-actions');actions.append(shareWodButton(w,'Compartir recomendación'),btn('Generar de todos modos',()=>askRecoveryConfirmation(pendingRecoveryOptions),'caution-action'));panel.append(actions);
  return;
 }
 panel.append(node('div',w.edited?'WOD EDITADO MANUALMENTE':w.forcedAgainstAdvice?'WOD EXTRA CON PRECAUCIÓN':w.strategy==='inteligente'?'WOD EXTRA INTELIGENTE':'WOD LIBRE','wod-kicker'),node('h2',w.title,'wod-title'));
 if(w.forcedAgainstAdvice)panel.append(node('p','Se ha generado a petición tuya pese a recomendar recuperación. La selección busca un estímulo útil con dosis controladas. No garantiza compatibilidad: ajusta el peso y el ritmo a tus sensaciones.','wod-info')); 
 const tags=node('div');for(const t of [w.date,w.level,w.objective,w.profileName])tags.append(node('span',t,'tag'));panel.append(tags);
 for(const m of w.movements){const line=node('div',null,'wod-movement');const label=w.mode==='tabata'?(`BLOQUE ${m.block||w.movements.indexOf(m)+1}`):m.amount;const detail=w.mode==='tabata'?(`${m.name} · 8×(20/10)${w.edited?` · ${m.amount}`:''}`):w.mode==='emom'&&m.estimateSeconds?`${m.name} · ≈${m.estimateSeconds} s de trabajo`:m.name;line.append(node('div',label,'wod-amount'),node('div',detail,'wod-name'));
  const ref=OFFICIAL_MOVEMENT_CATALOG.find(x=>x.id===m.id);
  if(ref){const a=node('a',ref.sourceUrl===OFFICIAL_LIBRARY_URL?'Biblioteca de movimientos':'Ver técnica / vídeo oficial','catalog-official');a.href=ref.sourceUrl;a.target='_blank';a.rel='noopener noreferrer';line.append(a);}
  panel.append(line)}
 const info=node('div',null,'wod-advice');info.append(node('b',w.advice),node('p',`Intensidad: ${w.intensity}`));if(w.stimulusReport){const r=w.stimulusReport;info.append(node('p',`Estímulo previsto: ${r.domains.join(' + ')}. Interferencia estimada: ${r.interference}.`));if(Number.isFinite(r.score))info.append(node('p',`Evaluación heurística: ${r.score}/100 · Uso máximo del presupuesto de carga: ${r.budgetUse}%${Number.isFinite(r.expectedMinutes)&&w.mode==='fortime'?` · Tiempo aproximado ${r.expectedMinutes} min`:''}. No equivale a seguridad o RPE real.`));}info.append(node('p',`Control de interferencias: ${w.notes}`));panel.append(info);
 const actions=node('div',null,'wod-actions');
 const timer=node('a','Abrir contador WOD','button primary');
 try { timer.href=contadorUrlForWod(w); timer.setAttribute('aria-label',`Abrir contador con ${w.mode} y tiempo ya configurados`); }
 catch(err) { timer.href='#'; timer.setAttribute('aria-disabled','true'); timer.addEventListener('click',e=>{e.preventDefault();notice(err.message,'warn');}); }
 // Navegación normal del enlace: Safari decide cómo abrir la otra PWA.
 actions.append(timer);
 actions.append(shareWodButton(w));
 actions.append(btn('Guardar WOD',()=>{if(!state.wods.some(x=>x.id===w.id))state.wods.push(w);save();renderLogWodOptions();notice('WOD guardado para registrar resultados.');},'ghost'));
 actions.append(btn('Editar WOD',()=>openWodEditor(w),'ghost'));
 panel.append(actions);
}
function renderLogWodOptions(){const select=$('log-wod');const prev=select.value;select.replaceChildren();const unique=[...(pendingCounterResult?.fallbackWod?[pendingCounterResult.fallbackWod]:[]),...(state.lastWod?[state.lastWod]:[]),...state.wods].filter((w,i,arr)=>arr.findIndex(x=>x.id===w.id)===i).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));if(!unique.length){select.append(option('','Primero genera un WOD'));return}for(const w of unique)select.append(option(w.id,`${w.date} · ${w.title} (${w.strategy})`));if(unique.some(w=>w.id===prev))select.value=prev;}
function getGenerateOptions(){const readiness=readReadiness();return {mode:$('mode').value,strategy:document.querySelector('input[name="strategy"]:checked').value,duration:Number($('duration').value),level:$('level').value,objective:$('objective').value,date:$('wod-date').value,readiness,effort:readiness.effort};}
function displayGenerated(wod){
 if(wod.kind==='recovery'){state.lastRecommendation=wod;state.lastWod=null;}
 else {state.lastWod=wod;state.lastRecommendation=null;state.generationHistory=[{date:wod.date,mode:wod.mode,ids:wod.movements.map(m=>m.id)},...(state.generationHistory||[])].slice(0,12);}
 save();renderWod(wod);renderLogWodOptions();clearNotice();
 $('wod-result').scrollIntoView({behavior:'smooth',block:'start'});
}
const recoveryDialog=$('recovery-dialog');
function askRecoveryConfirmation(options){
 if(!options){notice('Vuelve a pulsar GENERAR WOD para evaluar la fecha y el material actuales.','warn');return;}
 const current=getGenerateOptions();
 if(['mode','strategy','duration','level','objective','date'].some(key=>current[key]!==options[key])){
  notice('Has cambiado la configuración: vuelve a pulsar GENERAR WOD para reevaluarla.','warn');return;
 }
 // Los controles previos pueden cambiar tras mostrar el aviso.
 pendingRecoveryOptions={...options,readiness:current.readiness,effort:current.effort};
 const r=normalizeReadiness(pendingRecoveryOptions.readiness);
 $('recovery-ready-summary').textContent=`Fatiga ${r.fatigue} · Molestias: ${r.soreness} · ${r.effort==='controlado'?'RPE 5–6':r.effort==='exigente'?'RPE 7–8':'RPE 6–7'}`;
 if(typeof recoveryDialog.showModal==='function')recoveryDialog.showModal();
 else if(confirm('La programación aconseja recuperación. ¿Quieres generar un WOD productivo (RPE objetivo 6–7) pese al consejo de recuperación?'))confirmForcedExtra();
}
function confirmForcedExtra(){
 const options=pendingRecoveryOptions;
 if(recoveryDialog.open)recoveryDialog.close();
 if(!options)return;
 // Recalcular sobre el estado actual (programación/material) en vez de usar
 // un resultado anterior guardado en caché o asumir compatibilidad.
 const effort=options.effort||'productivo';
 try{const wod=generateWod({state,...options,forceExtra:true,effort});
  if(wod.kind==='recovery')throw new Error('No hay una alternativa adecuada con estímulo suficiente para esta fecha.');
  pendingRecoveryOptions=null;displayGenerated(wod);
 }catch(err){notice(err.message,'error');}
}
$('recovery-no').addEventListener('click',()=>recoveryDialog.close());
$('recovery-yes').addEventListener('click',confirmForcedExtra);
$('generate').addEventListener('click',()=>{
 try{
  const options=getGenerateOptions();pendingRecoveryOptions=null;
  const wod=generateWod({state,...options});
  if(wod.kind==='recovery')pendingRecoveryOptions=options;
  displayGenerated(wod);
  if(wod.kind==='recovery')askRecoveryConfirmation(options);
 }catch(err){notice(err.message,'error');}
});
function getLogWod(id){return [pendingCounterResult?.fallbackWod,state.lastWod,...state.wods].find(w=>w?.id===id)}
function forgetImportedResult(){
 pendingCounterResult=null;
 $('counter-import-banner').classList.add('hidden');
 if(location.hash.startsWith('#wodresult='))history.replaceState(null,'',location.pathname+location.search);
}
function importCounterResultFromHash(){
 let transfer;try{transfer=parseCounterTransfer(location.hash);}catch(err){
  showView('historial');notice('No se pudo leer el enlace del Contador: '+err.message,'error');return;
 }
 if(!transfer)return;
 showView('historial');
 if(state.logs.some(l=>l.counterRunId===transfer.runId)){
  forgetImportedResult();notice('Esta ejecución del Contador ya está registrada. No se ha creado un duplicado.','warn');return;
 }
 const meta=transfer.wod;
 const fallbackWod={id:meta.id,title:meta.title,date:meta.date,mode:meta.mode,strategy:meta.strategy||'inteligente',
  level:meta.level||'intermedio',objective:meta.objective||'mixto',profileName:meta.profileName||'',
  movements:meta.movements.map(m=>({id:m.id||'',name:m.name,amount:m.amount})),
  patterns:Array.isArray(meta.patterns)?meta.patterns.filter(x=>typeof x==='string').slice(0,12):[],
  readiness:meta.readiness||null,effort:meta.effort||'',createdAt:new Date(transfer.finishedAt).toISOString(),
  notes:'WOD restaurado desde el enlace del Contador. No sustituye la programación oficial.'};
 const saved=getLogWod(meta.id);
 pendingCounterResult={transfer,fallbackWod:saved||fallbackWod};
 renderLogWodOptions();
 const f=$('log-form');f.elements.wod.value=meta.id;
 const done=new Date(transfer.finishedAt);
 f.elements.date.value=[done.getFullYear(),String(done.getMonth()+1).padStart(2,'0'),String(done.getDate()).padStart(2,'0')].join('-');
 f.elements.result.value=transfer.result;
 f.elements.rpe.value=''; // El RPE nunca se inventa: lo introduce el atleta.
 f.elements.weights.value='';f.elements.notes.value='';
 const banner=$('counter-import-banner');banner.classList.remove('hidden');
 $('counter-import-text').textContent=`${meta.title} · ${transfer.result} · Tiempo medido ${Math.floor(transfer.elapsedMs/60000)}:${String(Math.floor(transfer.elapsedMs/1000)%60).padStart(2,'0')}. Completa RPE y cargas para guardarlo.${!saved?' El WOD original no estaba en este almacenamiento: se ha recuperado del enlace. Si estás en Safari, este registro puede no aparecer en el Generador instalado.':''}`;
 notice('Resultado recibido del Contador. Comprueba el WOD y completa el RPE real.');
 banner.scrollIntoView({behavior:'auto',block:'start'});
}
$('dismiss-counter-import').addEventListener('click',()=>{forgetImportedResult();renderLogWodOptions();notice('Importación descartada. El resultado original sigue en el Contador.','warn');});
$('log-form').addEventListener('submit',ev=>{ev.preventDefault();const f=ev.currentTarget;const d=Object.fromEntries(new FormData(f));const w=getLogWod(d.wod);if(!w){notice('Genera un WOD antes de registrar su resultado.','error');return}if(!isISODate(d.date)||!d.result?.trim()){notice('Introducir fecha y resultado válido.','error');return}
 if(!Number.isInteger(Number(d.rpe))||Number(d.rpe)<1||Number(d.rpe)>10){notice('Introduce tu RPE real (entre 1 y 10).','error');return}
 if(pendingCounterResult&&pendingCounterResult.transfer.wod.id!==w.id){notice('El resultado del Contador corresponde a otro WOD. Descarta la transferencia antes de registrar uno distinto.','error');return}
 if(pendingCounterResult&&state.logs.some(l=>l.counterRunId===pendingCounterResult.transfer.runId)){notice('Esta ejecución del Contador ya está registrada.','warn');return}
 const log={id:`log-${Date.now()}`,wodId:w.id,date:d.date,title:w.title,mode:w.mode,strategy:w.strategy,patterns:w.patterns,movementsText:w.movements.map(m=>m.name).join(', '),result:d.result.trim(),weights:d.weights?.trim()||'',notes:d.notes?.trim()||'',rpe:Math.min(10,Math.max(1,Number(d.rpe)||7)),scale:d.scale,preFatigue:w.readiness?.fatigue||'',preSoreness:w.readiness?.soreness||'',targetEffort:w.effort||'',recoveryNext:d.recoveryNext||'sin-evaluar',nextSessionImpact:d.nextSessionImpact||'sin-evaluar',createdAt:new Date().toISOString()};
 if(pendingCounterResult){const t=pendingCounterResult.transfer;
  Object.assign(log,{source:'contador-wod',counterRunId:t.runId,counterElapsedMs:t.elapsedMs,
   counterFinishedAt:t.finishedAt,counterFinishReason:t.finishReason,counterRounds:t.splitsCount,
   counterAdditionalReps:t.extraReps,counterDoneIntervals:t.doneIntervals,counterMode:t.mode,
   counterSplitTimesMs:t.splitTimesMs||[],counterMarkedIntervals:t.markedIntervals||[]});
 }
 state.logs.unshift(log);if(!state.wods.some(x=>x.id===w.id))state.wods.push(w);save();forgetImportedResult();renderLogs();f.reset();f.elements.date.value=now();notice('Resultado guardado en el historial local.');});
function renderAnalytics(){
 const holder=$('analysis-panel');if(!holder)return;
 const summary=$('analysis-summary');summary.replaceChildren();
 const a=analyzeTrainingResults(state);
 const metric=(label,value,context='')=>{
  const div=node('div',null,'analysis-metric');
  div.append(node('small',label),node('strong',value));
  if(context)div.append(node('span',context));
  return div;
 };
 const formatRpe=v=>v===null?'—':`${v.toFixed(1).replace('.',',')}/10`;
 const cards=node('div',null,'analysis-metrics');
 cards.append(metric('Sesiones registradas',String(a.total),'Sólo en este navegador'),
  metric('Desde Contador',String(a.linkedFromCounter),'Enlaces guardados'),
  metric('RPE real medio',formatRpe(a.averageRpe),'Sólo registros con RPE'),
  metric('Tiempos comparables',String(a.comparisons.length),'FOR TIME con rondas marcadas'));
 summary.append(cards);
 if(a.total===0){summary.append(node('p','Todavía no hay resultados guardados. Entrena un WOD, devuelve el resultado desde el Contador y registra tu RPE real. El análisis aparecerá aquí.','analysis-empty'));return;}
 const quality=node('div',null,'analysis-block');
 quality.append(node('h4','Calidad del registro'),
  node('p',`${a.measuredCount} con tiempo medido · ${a.withWeights} con pesos registrados · ${a.recoveryReported} con recuperación posterior · ${a.impactReported} con impacto en la siguiente sesión.`, 'analysis-explain'));
 summary.append(quality);
 const formats=node('div',null,'analysis-block');
 formats.append(node('h4','Resultados por modalidad'));
 const formatsGrid=node('div',null,'analysis-formats');
 for(const item of a.byMode){
  const div=node('div',null,'analysis-mode');
  div.append(node('b',item.label),node('span',`${item.count} registro${item.count===1?'':'s'}`),node('small',`RPE observado: ${formatRpe(item.averageRpe)}`));formatsGrid.append(div);
 }
 formats.append(formatsGrid);summary.append(formats);
 const rpe=node('div',null,'analysis-block');
 rpe.append(node('h4','Esfuerzo real frente al RPE previsto'));
 if(a.rpeMatches.comparable){
  rpe.append(node('p',`${a.rpeMatches.within} dentro del rango previsto · ${a.rpeMatches.above} por encima · ${a.rpeMatches.below} por debajo.`, 'analysis-explain'));
  rpe.append(node('p',`Comparación disponible en ${a.rpeMatches.comparable} de ${a.total} registros. Los objetivos sin dato fiable no se comparan.`, 'analysis-hint'));
 }else rpe.append(node('p','Aún no hay suficientes datos de RPE previsto y real para compararlos.', 'analysis-explain'));
 summary.append(rpe);
 const times=node('div',null,'analysis-block');
 times.append(node('h4','Tiempo real frente al estimado · FOR TIME'));
 if(a.comparisons.length){
  for(const c of a.comparisons.slice(0,4)){
   const div=node('div',null,'analysis-time');
   div.append(node('b',`${c.date} · ${c.title}`),node('span',`Previsto: ${c.predictedMinutes.toFixed(1).replace('.',',')} min · Cronometrado: ${c.observedMinutes.toFixed(1).replace('.',',')} min · Diferencia: ${c.differenceMinutes>=0?'+':''}${c.differenceMinutes.toFixed(1).replace('.',',')} min`));
   times.append(div);
  }
  times.append(node('p','Se muestran únicamente sesiones detenidas manualmente con las rondas previstas marcadas y una estimación previa. Marcar rondas no demuestra que el WOD se haya completado correctamente. No se compara el CAP ni otros formatos como si fueran tiempos de finalización.','analysis-hint'));
 }else times.append(node('p','Sin comparaciones válidas por ahora: hacen falta un FOR TIME cronometrado, sus rondas marcadas y la estimación original. Los resultados manuales no se tratan como tiempos medidos.', 'analysis-explain'));
 summary.append(times);
 const follow=node('div',null,'analysis-block');
 follow.append(node('h4','Recuperación e interferencias observadas'),
  node('p',`Recuperación: buena ${a.followup.good}, normal ${a.followup.normal}, mala ${a.followup.bad}. Siguiente sesión: sin impacto aparente ${a.impact.none}, posible interferencia ${a.impact.possible}, interferencia clara ${a.impact.clear}.`, 'analysis-explain'));
 summary.append(follow);
 const foot=node('p',a.enoughForReview?
  `Hay ${a.total} registros: puedes revisar tendencias descriptivas, pero no permiten atribuir una mejora o una interferencia al WOD extra. La generación no se reajusta automáticamente.`:
  `Muestra pequeña: ${a.total} de ${5} registros como referencia inicial. No es suficiente para calibrar el algoritmo; sólo se muestran datos descriptivos.`, 'analysis-warning');
 summary.append(foot);
}
function renderLogs(){renderAnalytics();const list=$('log-list');list.replaceChildren();$('log-count').textContent=`${state.logs.length} resultados`;renderLogWodOptions();if(!state.logs.length){list.append(node('div','No has registrado resultados todavía.','empty'));return}for(const l of [...state.logs].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,250)){const e=node('div',null,'entry');const head=node('div',null,'entry-head');head.append(node('b',`${l.date} · ${l.title}`),btn('Eliminar',()=>{if(!confirm('¿Eliminar este resultado?'))return;state.logs=state.logs.filter(x=>x.id!==l.id);save();renderLogs()},'danger-ghost small'));e.append(head,node('small',`Resultado: ${l.result} · RPE ${l.rpe}/10 · ${l.scale}\nPesos: ${l.weights||'No indicados'}${l.preFatigue?'\nFatiga previa: '+l.preFatigue+' · Molestias: '+l.preSoreness:''}${l.recoveryNext&&l.recoveryNext!=='sin-evaluar'?'\nRecuperación posterior: '+l.recoveryNext:''}${l.nextSessionImpact&&l.nextSessionImpact!=='sin-evaluar'?'\nSiguiente sesión: '+l.nextSessionImpact:''}${l.notes?'\nNotas: '+l.notes:''}`));list.append(e)}}
$('export-backup').addEventListener('click',()=>{downloadFile(`generador-wod-copia-${now()}.json`,JSON.stringify(state,null,2),'application/json');notice('Copia JSON exportada. Guárdala fuera del iPhone si es posible.');});
$('export-logs').addEventListener('click',()=>{const headers=['date','title','mode','strategy','result','source','counterRunId','counterElapsedMs','counterRounds','counterAdditionalReps','counterDoneIntervals','weights','rpe','scale','preFatigue','preSoreness','targetEffort','recoveryNext','nextSessionImpact','notes'];downloadFile(`resultados-wod-${now()}.csv`,toCSV(state.logs,headers),'text/csv;charset=utf-8');notice('Resultados exportados en CSV.');});
$('restore-file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>3_000_000)throw new Error('La copia supera 3 MB.');const raw=JSON.parse(await file.text());if(!raw||typeof raw!=='object'||!Array.isArray(raw.profiles)||!Array.isArray(raw.plan)||!Array.isArray(raw.logs)||!Array.isArray(raw.wods))throw new Error('Formato de copia incompatible.');if(!confirm('Esto sustituirá TODOS los perfiles, programación y resultados actuales. ¿Continuar?'))return;state=sanitizeState(raw);save();renderAll();notice('Copia restaurada.');}catch(err){notice(`No se pudo restaurar: ${err.message}`,'error')}finally{e.target.value=''}});
function renderAll(){renderProfiles();renderInventory();renderCatalog();renderReadiness();renderPlan();renderWod(state.lastRecommendation||state.lastWod);renderLogs();}
function connection(){const offline=!navigator.onLine;$('connectivity').textContent=offline?'Sin conexión · datos locales':'Con conexión · datos locales'}window.addEventListener('online',connection);window.addEventListener('offline',connection);
const date=now();$('wod-date').value=date;$('plan-form').elements.date.value=date;$('log-form').elements.date.value=date;renderAll();connection();importCounterResultFromHash();
if('serviceWorker' in navigator && location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('No se pudo activar modo offline:',err));

// Editor transaccional: el WOD original no cambia hasta aplicar los cambios.
function openWodEditor(original){
 const profile=getProfile();
 const catalog=editorMovements(state,original,profile).sort((a,b)=>a.name.localeCompare(b.name,'es'));
 const byId=new Map(catalog.map(m=>[m.id,m]));
 const mode=original.mode,max=mode==='tabata'?6:8;
 const unitLabels={reps:'Repeticiones',meters:'Distancia (m)',cals:'Calorías',sec:'Tiempo (s)',climbs:'Ascensos'};
 const draft={duration:original.duration,rounds:original.rounds||3,interval:original.interval||60,pause:original.tabata?.betweenBlocksSeconds||0,name:original.editName||'',notes:original.editNotes||'',movements:original.movements.map(m=>({id:m.id,units:Number.parseFloat(m.amount)||m.units||10,kg:m.editKg??'',height:m.editHeight??''}))};
 const dialog=node('dialog',null,'editor-dialog');dialog.setAttribute('aria-label','Editar WOD');
 const header=node('div',null,'editor-head');header.append(node('h2','Editar WOD'),btn('Cancelar',()=>dialog.close(),'ghost small'));dialog.append(header,node('p',`Formato: ${mode.toUpperCase()} · Material: ${profile.name}. El original no se modifica hasta aplicar.`,'hint'));
 const settings=node('div',null,'form-grid');
 function field(parent,label,value,onChange,config={}){
  const l=node('label',label);if(config.full)l.classList.add('full');
  const input=node(config.textarea?'textarea':'input');if(!config.textarea)input.type=config.type||'number';
  if(config.min!==undefined)input.min=config.min;if(config.max!==undefined)input.max=config.max;if(config.step!==undefined)input.step=config.step;if(config.length)input.maxLength=config.length;
  if(config.textarea)input.rows=2;input.value=value??'';
  input.addEventListener('input',()=>{onChange(input.value);refresh()});l.append(input);parent.append(l);return input;
 }
 if(mode!=='tabata')field(settings,mode==='fortime'?'CAP (min)':'Duración (min)',draft.duration,v=>draft.duration=v,{min:1,max:mode==='amrap'?180:mode==='fortime'?60:120});
 if(mode==='fortime')field(settings,'Rondas',draft.rounds,v=>draft.rounds=v,{min:1,max:100});
 if(mode==='emom')field(settings,'Intervalo (s)',draft.interval,v=>draft.interval=v,{min:10,max:600});
 if(mode==='tabata')field(settings,'Pausa entre bloques (s)',draft.pause,v=>draft.pause=v,{min:0,max:600});
 field(settings,'Nombre opcional',draft.name,v=>draft.name=v,{type:'text',full:true,length:65});
 dialog.append(settings,node('h3',mode==='tabata'?'Bloques · 8×20/10':'Movimientos'));
 const list=node('div',null,'editor-list');dialog.append(list);let expanded=null;
 function defaultRow(m){return {id:m.id,units:mode==='tabata'?20:m.unit==='meters'?100:m.unit==='sec'?30:m.unit==='cals'?8:m.unit==='climbs'?1:8,kg:'',height:''};}
 const add=btn('Añadir movimiento',()=>{if(!catalog.length||draft.movements.length>=max)return;const r=defaultRow(catalog[0]);draft.movements.push(r);expanded=r;renderRows();refresh();list.lastElementChild?.querySelector('input[type=search]')?.focus()},'ghost');dialog.append(add);
 const noteGrid=node('div',null,'form-grid');field(noteGrid,'Notas del entrenamiento',draft.notes,v=>draft.notes=v,{textarea:true,full:true,length:500});dialog.append(noteGrid);
 const preview=node('div',null,'editor-preview');preview.setAttribute('aria-live','polite');dialog.append(preview);
 const apply=btn('Aplicar cambios',()=>{
  let result;try{result=editWod(original,draft,state,profile);}catch(err){refresh();return;}
  if(result.warnings.length&&!confirm('La edición tiene avisos de compatibilidad o duración. No está validada por el algoritmo. ¿Aplicar igualmente?\n\n'+result.warnings.join('\n')))return;
  // Nuevo identificador para no alterar resultados previos. Conserva el original si estaba guardado.
  const id=`wod-${Date.now()}-${Math.floor(Math.random()*1e9)}`;
  const w={...result.wod,id,createdAt:new Date().toISOString()};
  state.lastWod=w;state.lastRecommendation=null;save();dialog.close();renderWod(w);renderLogWodOptions();notice('WOD editado. Revisa los avisos antes de entrenar.');
 },'primary');
 const actions=node('div',null,'editor-actions');actions.append(apply,btn('Cancelar cambios',()=>dialog.close(),'ghost'));dialog.append(actions);
 function refresh(){
  preview.replaceChildren();try{
   const r=editWod(original,draft,state,profile);apply.disabled=false;
   preview.append(node('strong',`Duración programada: ${Number(r.wod.duration.toFixed(2))} min`));
   if(mode==='fortime')preview.append(node('p',`Tiempo estimado: ${r.expectedMinutes} min · CAP ${r.wod.cap} min`));
   if(mode==='emom')preview.append(node('p',r.wod.advice));
   preview.append(node('p',r.wod.notes));
   if(r.warnings.length)preview.classList.add('editor-warning');else preview.classList.remove('editor-warning');
  }catch(err){apply.disabled=true;preview.classList.add('editor-warning');preview.append(node('strong',err.message));}
 }
 function renderRows(){
  list.replaceChildren();draft.movements.forEach((r,i)=>{
   const row=node('div',null,'editor-movement');const controls=node('div',null,'editor-row-head');
   const m=byId.get(r.id)||original.movements.find(x=>x.id===r.id);
   const summary=()=>`${mode==='tabata'?'20 s':`${r.units||'—'} ${({reps:'reps',meters:'m',cals:'cal',sec:'s',climbs:'asc.'})[m?.unit]||''}`} · ${m?.name||r.id}${r.kg!==''&&r.kg!=null?` · ${r.kg} kg`:''}${r.height!==''&&r.height!=null?` · ${r.height} cm`:''}`;
   const toggle=btn(summary(),()=>{expanded=expanded===r?null:r;renderRows()},'editor-toggle');toggle.setAttribute('aria-expanded',String(expanded===r));toggle.setAttribute('aria-label',`Editar movimiento ${i+1}: ${summary()}`);
   const up=btn('↑',()=>{[draft.movements[i-1],draft.movements[i]]=[draft.movements[i],draft.movements[i-1]];renderRows();refresh()},'ghost small');up.disabled=i===0;up.setAttribute('aria-label',`Subir movimiento ${i+1}`);
   const down=btn('↓',()=>{[draft.movements[i],draft.movements[i+1]]=[draft.movements[i+1],draft.movements[i]];renderRows();refresh()},'ghost small');down.disabled=i===draft.movements.length-1;down.setAttribute('aria-label',`Bajar movimiento ${i+1}`);
   controls.append(toggle,up,down);row.append(controls);list.append(row);
   if(expanded!==r)return;
   row.classList.add('is-expanded');
   const grid=node('div',null,'form-grid');const searchLabel=node('label','Buscar o sustituir ejercicio','full');const search=node('input');search.type='search';search.placeholder='Ej.: HSPU, DU, snatch, DB';search.autocomplete='off';searchLabel.append(search);grid.append(searchLabel);
   const choices=node('div',null,'editor-choices full');grid.append(choices);
   function selectMovement(next,units){const replacement=defaultRow(next);if(units!=null)replacement.units=units;draft.movements[i]=replacement;expanded=replacement;renderRows();refresh();}
   const matchList=()=>{choices.replaceChildren();const q=search.value.trim();if(!q)return;const matches=searchMovements(catalog,q);choices.append(node('p',`${matches.length} compatibles${matches.length>15?' · primeros 15':''}`,'hint'));for(const x of matches.slice(0,15)){const b=btn(x.name,()=>selectMovement(x),'ghost');b.append(node('small',x.req.map(id=>EQUIPMENT_GROUPS.flatMap(g=>g.items).find(e=>e[0]===id)?.[1]||id).join(' · ')||'Sin material específico'));choices.append(b);}if(!matches.length)choices.append(node('p','Sin coincidencias compatibles. Revisa material, nivel o habilidades.','hint'));};
   search.addEventListener('input',matchList);search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const hits=searchMovements(catalog,search.value);if(search.value.trim()&&hits.length===1)selectMovement(hits[0]);}});
   const browse=btn('Ver todos los compatibles',()=>{choices.replaceChildren();for(const x of catalog){choices.append(btn(x.name,()=>selectMovement(x),'ghost'));}},'ghost small');grid.append(browse);
   const suggestions=node('div',null,'editor-suggestions full');grid.append(suggestions);
   function updateSummary(){toggle.textContent=summary();toggle.setAttribute('aria-label',`Editar movimiento ${i+1}: ${summary()}`);}
   function renderSuggestions(){suggestions.replaceChildren();const suggestionsList=suggestSubstitutions(m,catalog,r.units,mode);if(!suggestionsList.length)return;suggestions.append(node('strong','Alternativas de estímulo parecido'),node('p','Orientativas por patrón y tiempo. No garantizan equivalencia ni RPE; revisa las cargas y avisos.','hint'));for(const x of suggestionsList){const u=({reps:'reps',meters:'m',cals:'cal',sec:'s',climbs:'asc.'})[x.movement.unit];suggestions.append(btn(`${x.movement.name} · ${mode==='tabata'?'20 s':`${x.units} ${u}`}`,()=>selectMovement(x.movement,x.units),'ghost'));}}
   if(mode!=='tabata')field(grid,unitLabels[m?.unit]||'Cantidad',r.units,v=>{r.units=v;updateSummary();renderSuggestions()},{min:1,max:m?.unit==='meters'?50000:m?.unit==='sec'?3600:1000});
   if(m?.req?.some(x=>['db','kb','barbell','sandbag','medball','wallball','slamball'].includes(x)))field(grid,'Peso (kg, opcional)',r.kg,v=>{r.kg=v;updateSummary()},{min:0,max:400,step:'0.5'});
   if(m?.req?.some(x=>['box','walltarget','wall','ropeclimb','rig','rings'].includes(x)))field(grid,'Altura (cm, opcional)',r.height,v=>{r.height=v;updateSummary()},{min:0,max:1000,step:'1'});
   row.append(grid);renderSuggestions();
   const tools=node('div',null,'editor-row-tools');const duplicate=btn('Duplicar',()=>{const copy={...r};draft.movements.splice(i+1,0,copy);expanded=copy;renderRows();refresh()},'ghost small');duplicate.disabled=draft.movements.length>=max;
   const remove=btn('Eliminar',()=>{draft.movements.splice(i,1);expanded=null;renderRows();refresh()},'danger-ghost small');remove.disabled=draft.movements.length<=1;tools.append(duplicate,remove);row.append(tools);
  });add.disabled=draft.movements.length>=max||!catalog.length;
 }
 dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);renderRows();refresh();dialog.showModal();
}
