function myModules(){try{return JSON.parse(localStorage.getItem(LIB_LS)||'[]')}catch(e){return []}}
function setMy(list){try{localStorage.setItem(LIB_LS,JSON.stringify(list))}catch(e){}}
let LIBALL=[];                                   /* 화면에 뿌린 내 모듈 (로컬 + ☁) */
function libAnchorText(){
 const a=sel&&sel.node?N(sel.node):null,el=$('lb_anchor');if(!el)return;
 if(!a){el.innerHTML='선택한 블록이 없어도 <b>기존 대분류/중분류/화면을 후보로 자동 판단</b>합니다. 후보가 비슷하면 선택창이 뜹니다.';return}
 const next=a.type==='module'?'중분류 또는 화면':a.type==='section'?'화면':a.type==='screen'?'테이블':'자동 연결 없음 (FK는 직접 지정)';
 el.innerHTML=`현재 선택: <b>${esc(a.name)}</b> (${TYPE[a.type].name}) → 삽입 모듈의 <b>${next}</b>를 자동 연결합니다.`;
}
function openLib(){libDlg.classList.add('on');$('lb_msg').textContent='';$('lb_name').value='';libAnchorText();renderLib()}
/* ═══ 기본 모듈 수정·삭제(숨김) — 브라우저에 오버레이로 저장 ═══ */
const BI_HIDE_LS='design.bihide', BI_OVR_LS='design.biovr';
function biHide(){try{return JSON.parse(localStorage.getItem(BI_HIDE_LS)||'[]')}catch(e){return[]}}
function setBiHide(a){try{localStorage.setItem(BI_HIDE_LS,JSON.stringify(a))}catch(e){}}
function biOvr(){try{return JSON.parse(localStorage.getItem(BI_OVR_LS)||'{}')}catch(e){return{}}}
function setBiOvr(o){try{localStorage.setItem(BI_OVR_LS,JSON.stringify(o))}catch(e){}}
function builtinAt(i){const m=BUILTIN[i];const o=biOvr()[m.name];
 return o&&o.data?{...m,desc:o.desc||m.desc,data:o.data,ovr:true}:m}
function editBuiltin(i){const m=builtinAt(i);
 insertModule(m.data,m.name,{auto:false});$('lb_name').value=m.name;libDlg.classList.add('on');
 $('lb_msg').textContent=`'${m.name}' 를 캔버스에 넣었습니다. 고친 뒤 블록을 고르고 [＋ 모듈로 저장](또는 블록 패널의 📦)에서 같은 이름으로 저장하면 이 기본 모듈이 업데이트됩니다.`;}
function hideBuiltin(i){const m=builtinAt(i);
 if(!confirm(`기본 모듈 '${m.name}' 을 목록에서 삭제할까요?\n(코드 원본은 남아 있으며, 구분 제목의 [↺ 복원]으로 되돌릴 수 있습니다)`))return;
 setBiHide([...new Set([...biHide(),m.name])]);renderLib();}
function restoreBuiltins(cat){
 const names=BUILTIN.filter(m=>(m.cat||'공통 기본')===cat).map(m=>m.name);
 setBiHide(biHide().filter(n=>!names.includes(n)));renderLib();}
function resetBuiltin(i){const m=BUILTIN[i];
 if(!confirm(`'${m.name}' 을 원본 기본 모듈 내용으로 되돌릴까요?`))return;
 const o=biOvr();delete o[m.name];setBiOvr(o);renderLib();}
function renderLib(){
 const hide=new Set(biHide());
 const cats=[...new Set(BUILTIN.map(m=>m.cat||'공통 기본'))];
 $('lb_builtin').innerHTML=cats.map(c=>{
  const items=BUILTIN.map((m,i)=>({m:builtinAt(i),i})).filter(x=>(x.m.cat||'공통 기본')===c);
  const shown=items.filter(x=>!hide.has(x.m.name));
  const hid=items.length-shown.length;
  return `<div class="libcat">${esc(c)}${hid?` <a href="#" onclick="event.preventDefault();restoreBuiltins('${esc(c)}')" style="float:right;color:#3b82f6;font-weight:400">↺ 숨긴 모듈 ${hid}개 복원</a>`:''}</div>`+
   (shown.length?shown.map(({m,i})=>`<button onclick="insertModule(builtinAt(${i}).data,'${esc(m.name)}')"><b>${esc(m.name)}</b>${m.ovr?' <i style="color:#f2a93b;font-style:normal;font-size:10.5px">●수정됨</i>':''} <small>${esc(m.desc)} · 블록 ${m.data.nodes.length}
    &nbsp;<a href="#" onclick='event.preventDefault();event.stopPropagation();editBuiltin(${i})' style="color:#3b82f6">✎ 수정</a>${m.ovr?` · <a href="#" onclick='event.preventDefault();event.stopPropagation();resetBuiltin(${i})' style="color:#3b82f6">↺ 원본</a>`:''}
    · <a href="#" onclick='event.preventDefault();event.stopPropagation();hideBuiltin(${i})' style="color:#e05a4a">✕ 삭제</a></small></button>`).join(''):'<span style="color:#8a94a6;font-size:12px;padding:2px 8px">모두 숨김</span>')
 }).join('');
 const local=myModules().map(m=>({...m,where:'local'}));
 const cloudOnly=LIBALL.filter(m=>m.where==='cloud'&&!local.some(l=>l.name===m.name));
 LIBALL=[...local,...cloudOnly];
 paintMine();
 if(SB.url&&SB.key)loadCloudModules();
}
function paintMine(){
 $('lb_mine').innerHTML=LIBALL.length?LIBALL.map(m=>{const n=esc(m.name),j=JSON.stringify(m.name);
  return `<button onclick='insertModule(modData(${j}),${j})'><b>${m.where==='cloud'?'☁ ':''}${n}</b>
   <small>블록 ${(m.data.nodes||[]).length} · ${new Date(m.at||m.updated_at||Date.now()).toLocaleDateString('ko-KR')}
   &nbsp;<a href="#" onclick='event.preventDefault();event.stopPropagation();editModule(${j})' style="color:#3b82f6">편집</a>
   · <a href="#" onclick='event.preventDefault();event.stopPropagation();renameModule(${j})' style="color:#3b82f6">이름</a>
   · <a href="#" onclick='event.preventDefault();event.stopPropagation();overwriteModule(${j})' style="color:#3b82f6">덮어쓰기</a>
   · <a href="#" onclick='event.preventDefault();event.stopPropagation();delModule(${j})' style="color:#e05a4a">삭제</a></small></button>`}).join('')
  :'<span style="color:#8a94a6;font-size:12px">아직 없습니다 — 블록을 고르고 위에서 저장하세요.</span>';
}
const modData=name=>(LIBALL.find(m=>m.name===name)||{}).data;
async function loadCloudModules(){
 try{const rs=await sb('design_modules?select=name,data,updated_at&order=updated_at.desc');
  for(const r of rs)if(!LIBALL.some(m=>m.name===r.name))LIBALL.push({name:r.name,data:r.data,updated_at:r.updated_at,where:'cloud'});
  paintMine();
 }catch(e){}
}
/* 모듈을 캔버스로 불러와 고친 뒤 같은 이름으로 다시 저장 */
function editModule(name){
 const m=LIBALL.find(x=>x.name===name);if(!m)return;
 insertModule(m.data,name,{auto:false});
 $('lb_name').value=name;libDlg.classList.add('on');
 $('lb_msg').textContent=`'${name}' 를 캔버스에 넣었습니다. 고친 뒤 블록을 고르고 [＋ 모듈로 저장] 하면 같은 이름으로 덮어씁니다.`;
}
/* 이름만 바꾸기 */
function renameModule(name){
 const nn=(prompt('새 모듈 이름',name)||'').trim();if(!nn||nn===name)return;
 if(LIBALL.some(m=>m.name===nn))return alert('같은 이름의 모듈이 이미 있습니다.');
 const my=myModules();const i=my.findIndex(m=>m.name===name);
 const src=LIBALL.find(m=>m.name===name);if(!src)return;
 if(i>=0){my[i]={...my[i],name:nn};setMy(my)}else my.push({name:nn,data:src.data,at:Date.now()}),setMy(my);
 if(SB.url&&SB.key){
  sb('design_modules?on_conflict=name',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
   body:JSON.stringify([{name:nn,data:src.data,updated_at:new Date().toISOString()}])})
   .then(()=>sb('design_modules?name=eq.'+encodeURIComponent(name),{method:'DELETE'})).catch(()=>{});
 }
 LIBALL=LIBALL.filter(m=>m.name!==name);renderLib();$('lb_msg').textContent=`'${name}' → '${nn}' 로 바꿨습니다.`;
}
/* 지금 선택한 블록(과 연결분)으로 내용만 교체 */
function overwriteModule(name){
 if(!sel||!sel.node)return alert('덮어쓸 내용이 될 블록을 캔버스에서 먼저 클릭하세요.');
 if(!confirm(`'${name}' 모듈을 지금 선택한 블록 내용으로 덮어쓸까요?`))return;
 $('lb_name').value=name;saveModule(false,true);
}
function delModule(name){
 if(!confirm(`'${name}' 모듈을 지울까요?`))return;
 setMy(myModules().filter(m=>m.name!==name));
 LIBALL=LIBALL.filter(m=>m.name!==name);
 if(SB.url&&SB.key)sb('design_modules?name=eq.'+encodeURIComponent(name),{method:'DELETE'}).catch(()=>{});
 renderLib();$('lb_msg').textContent=`'${name}' 삭제했습니다.`;
}
/* 선택한 블록(과 연결된 블록)을 모듈로 저장 */
/* ═══ 블록 묶음 → 모듈 저장 공용 ═══
   collectModuleIds: 뿌리 블록에서 아래로만 따라간다 —
   포함(contains) 하위 화면, 화면이 사용(uses)하는 테이블, 테이블 간 FK(ref)는 양방향.
   flow(업무 흐름)나 상위 블록으로는 번지지 않아 설계 전체가 딸려오지 않는다. */
function collectModuleIds(rootId){
 const ids=new Set([rootId]);let q=[rootId];
 while(q.length){const cur=q.shift();
  for(const e of D.edges){
   let o=null;
   if(e.from===cur&&(e.kind==='contains'||e.kind==='uses'))o=e.to;
   else if(e.kind==='ref'&&(e.from===cur||e.to===cur)
     &&N(e.from)?.type==='table'&&N(e.to)?.type==='table')o=e.from===cur?e.to:e.from;
   if(o&&!ids.has(o)&&N(o)){ids.add(o);q.push(o)}
  }}
 return [...ids];
}
function packIdsAsModule(ids,name){
 ids=ids.filter(id=>N(id));
 if(!ids.length)return null;
 const idx=new Map(ids.map((id,i)=>[id,i]));
 const nodes=ids.map(id=>{const n=N(id);return{type:n.type,name:n.name,meta:JSON.parse(JSON.stringify(n.meta)),dx:n.x,dy:n.y}});
 const edges=D.edges.filter(e=>idx.has(e.from)&&idx.has(e.to)).map(e=>e.card?[idx.get(e.from),idx.get(e.to),e.kind,e.label||'',e.card]:[idx.get(e.from),idx.get(e.to),e.kind,e.label||'']);
 const mod={name,data:{nodes,edges},at:Date.now()};
 /* 이름이 기본 모듈과 같으면 → 기본 모듈 자체를 이 내용으로 업데이트(오버레이) */
 if(BUILTIN.some(b=>b.name===name)){
  if(!confirm(`'${name}' 은 기본 모듈입니다. 이 내용으로 기본 모듈을 업데이트할까요?\n(구분 목록에 ●수정됨 으로 표시되고 [↺ 원본]으로 되돌릴 수 있습니다)`))return null;
  const o=biOvr();o[name]={data:mod.data,at:Date.now()};setBiOvr(o);renderLib();
  return{nodes:nodes.length,edges:edges.length};
 }
 const my=myModules();const at=my.findIndex(m=>m.name===name);
 if(at>=0){if(!confirm(`'${name}' 모듈이 이미 있습니다. 덮어쓸까요?`))return null;my[at]=mod}else my.push(mod);
 LIBALL=LIBALL.filter(m=>m.name!==name);
 setMy(my);
 if(SB.url&&SB.key)sb('design_modules?on_conflict=name',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
  body:JSON.stringify([{name,data:mod.data,updated_at:new Date().toISOString()}])}).catch(()=>{});
 return{nodes:nodes.length,edges:edges.length};
}
/* 블록 패널 [📦 모듈로 저장] — 선택 블록 + 부속 화면·테이블을 한 모듈로 */
function saveNodeAsModule(id){
 const n=N(id);if(!n)return;
 const ids=collectModuleIds(id);
 const tCnt=ids.filter(x=>N(x)?.type==='table').length,sCnt=ids.filter(x=>N(x)?.type==='screen').length;
 const name=(prompt(`모듈 이름 (화면 ${sCnt} · 테이블 ${tCnt} · 블록 ${ids.length}개 저장)`,n.name)||'').trim();
 if(!name)return;
 const r=packIdsAsModule(ids,name);
 if(r)$('stat').textContent=`'${name}' 모듈 저장 — 블록 ${r.nodes} · 연결 ${r.edges}. [📦 모듈 보관함]의 내 모듈에서 꺼내 쓸 수 있습니다.`;
}
/* 웹 가져오기 결과 → 모듈 저장 */
let LAST_IMPORT=[],LAST_IMPORT_NAME='';
function updateImpBtn(){const b=$('c_savemod');if(!b)return;
 const alive=LAST_IMPORT.filter(id=>N(id));
 b.disabled=!alive.length;
 b.textContent=alive.length?`📦 가져온 화면·DB를 모듈로 저장 (블록 ${alive.length})`:'📦 가져온 화면·DB를 모듈로 저장';
}
function saveImportAsModule(){
 const ids=LAST_IMPORT.filter(id=>N(id));
 if(!ids.length)return $('c_msg').textContent='먼저 위에서 가져오기를 실행하세요.';
 const tCnt=ids.filter(x=>N(x).type==='table').length,sCnt=ids.filter(x=>N(x).type==='screen').length;
 const name=(prompt(`모듈 이름 (화면 ${sCnt} · 테이블 ${tCnt} · 블록 ${ids.length}개 저장)`,LAST_IMPORT_NAME||'가져온 모듈')||'').trim();
 if(!name)return;
 const r=packIdsAsModule(ids,name);
 if(r){$('c_msg').textContent=`'${name}' 모듈 저장 완료 — 블록 ${r.nodes} · 연결 ${r.edges}`;
  clog(`📦 모듈 저장: '${name}' (블록 ${r.nodes} · 연결 ${r.edges}) — 모듈 보관함 › 내 모듈`);}
}
function saveModule(whole,force){
 const name=($('lb_name').value||'').trim();
 if(!name)return $('lb_msg').textContent='모듈 이름을 입력하세요.';
 let ids;
 if(whole)ids=D.nodes.map(n=>n.id);
 else{
  if(!sel||!sel.node)return $('lb_msg').textContent='저장할 블록을 먼저 클릭하세요.';
  ids=$('lb_deep').checked?collectModuleIds(sel.node):[sel.node];
 }
 const idx=new Map(ids.map((id,i)=>[id,i]));
 const nodes=ids.map(id=>{const n=N(id);return{type:n.type,name:n.name,meta:JSON.parse(JSON.stringify(n.meta)),dx:n.x,dy:n.y}});
 const edges=D.edges.filter(e=>idx.has(e.from)&&idx.has(e.to)).map(e=>e.card?[idx.get(e.from),idx.get(e.to),e.kind,e.label||'',e.card]:[idx.get(e.from),idx.get(e.to),e.kind,e.label||'']);
 const mod={name,data:{nodes,edges},at:Date.now()};
 /* 기본 모듈과 같은 이름이면 기본 모듈을 업데이트(오버레이) */
 if(BUILTIN.some(b=>b.name===name)){
  if(!force&&!confirm(`'${name}' 은 기본 모듈입니다. 이 내용으로 기본 모듈을 업데이트할까요?`))return;
  const o=biOvr();o[name]={data:mod.data,at:Date.now()};setBiOvr(o);renderLib();
  $('lb_msg').textContent=`기본 모듈 '${name}' 업데이트됨 (블록 ${nodes.length} · 연결 ${edges.length}) — [↺ 원본]으로 복원 가능`;
  return;
 }
 const my=myModules();const at=my.findIndex(m=>m.name===name);
 if(at>=0){if(!force&&!confirm(`'${name}' 모듈을 덮어쓸까요?`))return;my[at]=mod}else my.push(mod);
 LIBALL=LIBALL.filter(m=>m.name!==name);
 setMy(my);renderLib();$('lb_msg').textContent=`'${name}' 저장됨 (블록 ${nodes.length} · 연결 ${edges.length})`;
 if(SB.url&&SB.key)sb('design_modules?on_conflict=name',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
  body:JSON.stringify([{name,data:mod.data,updated_at:new Date().toISOString()}])}).catch(()=>{});
}
/* 삽입 모듈의 "외부 진입점"을 찾아 현재 선택 블록과 안전하게 연결한다.
   - 대메뉴 선택 + 중분류 묶음 → 대메뉴→중분류
   - 대메뉴/중분류 선택 + 화면 묶음 → →화면
   - 화면 선택 + 테이블 묶음 → 화면→대표 테이블
   모듈 안에 이미 상위 계층이 들어 있으면 그 내부 구조를 존중하고 억지로 재부모화하지 않는다. */
function autoAttachModule(anchor,made,data){
 if(!anchor||!made.length)return{count:0,skipped:0,names:[]};
 const dn=data.nodes||[],de=data.edges||[];
 const has=t=>dn.some(n=>n.type===t),incomingContains=i=>de.some(e=>e[1]===i&&e[2]==='contains');
 let idx=[];
 if(anchor.type==='module'&&!has('module')){
  idx=dn.map((n,i)=>({n,i})).filter(x=>x.n.type==='section'&&!incomingContains(x.i)).map(x=>x.i);
  if(!idx.length&&!has('section'))idx=dn.map((n,i)=>({n,i})).filter(x=>x.n.type==='screen'&&!incomingContains(x.i)).map(x=>x.i);
 }else if(anchor.type==='section'&&!has('module')&&!has('section')){
  idx=dn.map((n,i)=>({n,i})).filter(x=>x.n.type==='screen'&&!incomingContains(x.i)).map(x=>x.i);
 }else if(anchor.type==='screen'&&!has('module')&&!has('section')&&!has('screen')){
  const first=dn.findIndex(n=>n.type==='table');if(first>=0)idx=[first];
 }
 let count=0,skipped=0,names=[];
 for(const i of idx){const child=made[i],k=contextKind(anchor,child);if(!child||!k||child.id===anchor.id)continue;
  /* 메뉴 자식은 기본적으로 한 부모만 갖게 한다. 이미 다른 부모가 있으면 자동연결은 건너뛴다. */
  if(k==='contains'&&D.edges.some(e=>e.kind==='contains'&&e.to===child.id&&e.from!==anchor.id)){skipped++;continue}
  if(!hasEdge(anchor.id,child.id,k)){D.edges.push({id:uid(),from:anchor.id,to:child.id,kind:k,label:''});count++;names.push(child.name)}
 }
 return{count,skipped,names};
}
function moduleExternalRoots(made,data){
 const dn=data.nodes||[],de=data.edges||[];if(dn.some(n=>n.type==='module'))return[];
 const incoming=(i,k)=>de.some(e=>e[1]===i&&e[2]===k);
 let idx=dn.map((n,i)=>({n,i})).filter(x=>x.n.type==='section'&&!incoming(x.i,'contains')).map(x=>x.i);
 if(idx.length)return idx.map(i=>made[i]).filter(Boolean);
 idx=dn.map((n,i)=>({n,i})).filter(x=>x.n.type==='screen'&&!incoming(x.i,'contains')).map(x=>x.i);
 if(idx.length)return idx.map(i=>made[i]).filter(Boolean);
 const first=dn.findIndex(n=>n.type==='table');return first>=0&&made[first]?[made[first]]:[];
}
function autoAttachModuleSmart(made,data,label,contextNode){
 const roots=moduleExternalRoots(made,data);if(!roots.length)return{count:0,skipped:0,names:[],status:'none'};
 const cands=rankParentCandidates(roots[0],contextNode||null);if(!cands.length)return{count:0,skipped:0,names:[],status:'none'};
 const best=clearParentDecision(cands);
 if(best){const r=attachToParent(best.node,roots);return{...r,skipped:0,status:r.count?'attached':'none',parent:best.node}}
 openParentChoice(roots,cands,`모듈 '${label||''}' 상위 분류 선택`,(p,r)=>{
  if(p&&r.count)$('stat').textContent=`모듈 '${label||''}' · ${p.name} 아래 ${r.count}개 자동 연결`;
  else if(!p)$('stat').textContent=`모듈 '${label||''}' 삽입 · 상위 분류 연결은 보류됨`;
 });
 return{count:0,skipped:0,names:[],status:'pending'};
}
/* 모듈을 현재 설계에 넣는다. 테이블·같은 대메뉴는 재사용하고,
   중분류/화면은 같은 부모 아래에 있을 때만 재사용하여 엉뚱한 메뉴와 합쳐지는 것을 막는다. */
function insertModule(data,label,opts){
 opts=opts||{};if(!data||!data.nodes)return;
 const autoOn=opts.auto!==false;  /* 일반 모듈 삽입은 항상 자동 연결. 편집용 내부 호출만 auto:false 허용 */
 const contextNode=autoOn&&sel&&sel.node?N(sel.node):null;
 const dn0=data.nodes||[],de0=data.edges||[];
 const has0=t=>dn0.some(n=>n.type===t),inc0=(i,k)=>de0.some(e=>e[1]===i&&e[2]===k);
 let rootType=null;
 if(!has0('module')){const si=dn0.findIndex((n,i)=>n.type==='section'&&!inc0(i,'contains')),ci=dn0.findIndex((n,i)=>n.type==='screen'&&!inc0(i,'contains'));rootType=si>=0?'section':ci>=0?'screen':dn0.some(n=>n.type==='table')?'table':null}
 const anchor=contextNode&&rootType&&contextKind(contextNode,{type:rootType})?contextNode:null;
 const r=svg.getBoundingClientRect();
 let ox=Math.round(((r.width/2-view.x)/view.k-140)/8)*8, oy=Math.round(((60-view.y)/view.k)/8)*8;
 while(D.nodes.some(n=>Math.abs(n.x-ox)<30&&Math.abs(n.y-oy)<30))oy+=40;
 const made=[];
 const parentIdx=i=>{const e=(data.edges||[]).find(e=>e[1]===i&&e[2]==='contains');return e?e[0]:-1};
 const uniqueName=(type,base)=>{let nm=base,n=2;while(D.nodes.some(x=>x.type===type&&x.name===nm))nm=`${base} (${n++})`;return nm};
 const uniqueFile=file=>{if(!file)return file;const clean=String(file).split('?')[0],q=String(file).slice(clean.length),m=clean.match(/^(.*?)(\.html?)$/i);
  let stem=m?m[1]:clean,ext=m?m[2]:'.html',out=clean,n=2;const used=v=>D.nodes.some(x=>x.type==='screen'&&String(x.meta.file||'').split('?')[0].toLowerCase()===v.toLowerCase());
  while(used(out))out=`${stem}_${n++}${ext}`;return out+q};
 data.nodes.forEach((n,i)=>{
  let dup=null;
  if(n.type==='table'||n.type==='module')dup=D.nodes.find(x=>x.type===n.type&&x.name===n.name);
  else if(n.type==='section'||n.type==='screen'){
   const pi=parentIdx(i),parent=pi>=0?made[pi]:null;
   const ctx=!parent&&anchor&&contextKind(anchor,{type:n.type})==='contains'?anchor:null;
   const p=parent||ctx;
   if(p)dup=D.nodes.find(x=>x.type===n.type&&x.name===n.name&&D.edges.some(e=>e.kind==='contains'&&e.from===p.id&&e.to===x.id));
  }
  if(dup){made[i]=dup;return}
  const meta=JSON.parse(JSON.stringify(n.meta||{}));let nodeName=n.name;
  /* 화면명/파일명은 생성 시스템의 전역 키이므로 다른 메뉴에 같은 화면이 있으면 안전하게 새 이름을 준다. */
  if(n.type==='screen'){nodeName=uniqueName('screen',nodeName);if(meta.file)meta.file=uniqueFile(meta.file)}
  const node={id:uid(),type:n.type,name:nodeName,meta,
   x:ox+(n.dx!=null?(n.dx-data.nodes[0].dx||0):(n.type==='table'?300:0)),
   y:oy+(n.dy!=null?(n.dy-data.nodes[0].dy||0):i*70)};
  D.nodes.push(node);made[i]=node;
 });
 let internal=0;
 for(const [a,b,kind,lab,card] of (data.edges||[]))
  if(made[a]&&made[b]&&!D.edges.some(e=>e.from===made[a].id&&e.to===made[b].id&&e.kind===kind)){
   const ex=inferredKind(made[a],made[b]);if(ex===kind){D.edges.push({id:uid(),from:made[a].id,to:made[b].id,kind,label:lab||'',...(card?{card}:{})});internal++}}
 let at={count:0,skipped:0,names:[],status:'none'};
 if(autoOn)at=anchor?{...autoAttachModule(anchor,made,data),status:'attached'}:autoAttachModuleSmart(made,data,label,contextNode);
 libDlg.classList.remove('on');
 select({node:made[0].id});
 const ext=at.count?` · 자동 연결 ${at.count}건 (${at.names.join(', ')})`:at.status==='pending'?' · 상위 분류 후보 확인 필요':autoOn?' · 자동 연결 대상 없음':'';
 const skip=at.skipped?` · 기존 부모가 있어 ${at.skipped}건 건너뜀`:'';
 $('stat').textContent=`모듈 '${label||''}' 삽입 — 블록 ${made.length}개 · 내부 연결 ${internal}건${ext}${skip}`;
}


/* 어떤 화면이 "헤더 + 명세" 인지 판단한다.
   화면이 쓰는 테이블 중 부모(P)를 고르고, P 를 1:N 으로 가리키는 자식 테이블(C)이 있으면 명세 화면. */
function detailOf(scrNode){
 if(!scrNode||scrNode.type!=='screen'||scrNode.meta.kind==='status')return null;
 const used=D.edges.filter(e=>e.from===scrNode.id&&e.kind==='uses').map(e=>N(e.to)).filter(t=>t&&t.type==='table');
 if(!used.length)return null;
 for(const parent of used){
  const ln=D.edges.find(e=>e.kind==='ref'&&e.card==='1N'&&e.to===parent.id&&N(e.from)&&N(e.from).type==='table');
  if(ln)return{parent,child:N(ln.from),edge:ln};
 }
 return null;
}
/* 자식 테이블에서 부모를 가리키는 연결 컬럼 찾기 (선 설명 'order_no → orders.order_no' 도 읽는다) */
function linkCol(parent,child,edge){
 const pk=(colsOf(parent).find(c=>c.pk)||colsOf(parent)[0]||{}).name;
 const lab=String(edge&&edge.label||'');
 const m=lab.match(/([A-Za-z_]\w*)\s*(?:→|->)/);
 if(m&&colsOf(child).some(c=>c.name===m[1]))return{child:m[1],parent:pk};
 if(colsOf(child).some(c=>c.name===pk))return{child:pk,parent:pk};
 const cand=colsOf(child).find(c=>/_no$|_key$|_id$/.test(c.name)&&!c.pk);
 return{child:cand?cand.name:pk,parent:pk};
}
