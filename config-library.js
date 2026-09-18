/* ═══════════════ 구성 보관함 ═══════════════
   모듈 보관함 = 작은 기능 묶음, 구성 보관함 = 업종별 전체 시스템 뼈대.
   CONFIG_PRESETS는 data/config-presets.js에 따로 두어 업종 추가 시 큰 본체를 수정하지 않아도 된다. */
const CFG_LS='sysdesign.configs.v1';
const CFG_CUSTOM_COLS={
 vendor:[['vendor_code','업체코드','text',1,1],['vendor_name','업체명','text',0,1],['vendor_type','업체구분','text'],['manager','담당자','text'],['phone','전화번호','text'],['email','이메일','text'],['address','주소','text'],['active','사용여부','bool'],['remark','비고','text']],
 item:[['item_code','품번','text',1,1],['item_name','품명','text',0,1],['spec','규격','text'],['material','재질','text'],['unit','단위','text'],['unit_price','단가','num'],['customer','고객사','text'],['active','사용여부','bool'],['remark','비고','text']],
 process:[['process_code','공정코드','text',1,1],['process_name','공정명','text',0,1],['equipment','설비','text'],['std_ct','표준CT','num'],['worker_count','표준인원','num'],['active','사용여부','bool'],['remark','비고','text']],
 bom:[['bom_no','BOM번호','text',1,1],['item_code','모품번','text',0,1],['child_code','자품번','text',0,1],['qty','소요수량','num',0,1],['unit','단위','text'],['effective_date','적용일','date'],['remark','비고','text']],
 service:[['request_no','작업번호','text',1,1],['request_date','접수일','date',0,1],['customer','고객사','text'],['place','작업장소','text'],['title','작업내용','text',0,1],['owner','담당자','text'],['due_date','예정일','date'],['status','상태','text'],['remark','비고','text']],
 project:[['project_no','프로젝트번호','text',1,1],['project_name','프로젝트명','text',0,1],['customer','발주처','text'],['site','현장','text'],['start_date','시작일','date'],['due_date','완료예정일','date'],['owner','담당자','text'],['progress','진척률','num'],['status','상태','text'],['remark','비고','text']],
 finance:[['doc_no','전표번호','text',1,1],['doc_date','일자','date',0,1],['vendor','거래처','text'],['category','구분','text'],['amount','금액','num',0,1],['tax','세액','num'],['due_date','지급·수금예정일','date'],['status','상태','text'],['remark','비고','text']],
 import:[['import_no','수입관리번호','text',1,1],['po_no','발주번호','text'],['vendor','해외거래처','text'],['item_code','품목','text'],['invoice_no','Invoice No.','text'],['bl_no','B/L No.','text'],['etd','ETD','date'],['eta','ETA','date'],['qty','수량','num'],['amount','금액','num'],['status','통관상태','text'],['remark','비고','text']],
 haccp:[['check_no','점검번호','text',1,1],['check_date','점검일','date',0,1],['process','공정','text'],['item','점검항목','text',0,1],['standard','관리기준','text'],['result_value','측정값','text'],['judgement','판정','text',0,1],['checker','점검자','text'],['action','조치내용','text'],['remark','비고','text']]
};
function cfgClone(o){return JSON.parse(JSON.stringify(o))}
function cfgMy(){try{return JSON.parse(localStorage.getItem(CFG_LS)||'[]')}catch(e){return[]}}
function cfgSetMy(a){try{localStorage.setItem(CFG_LS,JSON.stringify(a))}catch(e){}}
function cfgCounts(p){let m=(p.modules||[]).length,s=0,c=0;for(const x of p.modules||[])for(const y of x.sections||[]){s++;c+=(y.screens||[]).length}return{m,s,c}}
function cfgAll(){return [...CONFIG_PRESETS.map((x,i)=>({...x,_kind:'builtin',_idx:i})),...cfgMy().map((x,i)=>({...x,_kind:'mine',_idx:i,cat:'내 구성',icon:x.icon||'⭐'}))]}
function openConfigLibrary(){
 configDlg.classList.add('on');$('cfgSearch').value='';
 const cats=['전체',...new Set(CONFIG_PRESETS.map(x=>x.cat)),'내 구성'];$('cfgCat').innerHTML=cats.map(x=>`<option>${esc(x)}</option>`).join('');
 renderConfigLibrary();
}
function renderConfigLibrary(){
 const cat=$('cfgCat')?.value||'전체',q=String($('cfgSearch')?.value||'').trim().toLowerCase(),all=cfgAll();
 const rows=all.filter(p=>(cat==='전체'||p.cat===cat)&&(!q||`${p.name} ${p.desc||''} ${p.cat} ${(p.modules||[]).map(m=>m.name).join(' ')}`.toLowerCase().includes(q)));
 $('cfgList').innerHTML=rows.length?rows.map(p=>{const c=p.data?{m:p.data.nodes?.filter(n=>n.type==='module').length||0,s:p.data.nodes?.filter(n=>n.type==='section').length||0,c:p.data.nodes?.filter(n=>n.type==='screen').length||0}:cfgCounts(p);const key=`${p._kind}:${p._idx}`;
  return `<div class="config-card"><div class="ct"><span style="font-size:18px">${esc(p.icon||'🗂')}</span><b>${esc(p.name)}</b><span class="tag">${esc(p.cat)}</span></div><small>${esc(p.desc||'저장한 전체 설계 구성')}</small><span class="config-count">대분류 ${c.m} · 중분류 ${c.s} · 화면 ${c.c}</span><div class="acts"><button class="btn" onclick="showConfigDetail('${key}')">구성보기</button><button class="btn primary" onclick="applyConfigPreset('${key}','replace')">새 설계로 적용</button><button class="btn" onclick="applyConfigPreset('${key}','append')">현재 설계에 추가</button>${p._kind==='mine'?`<button class="btn danger" onclick="deleteMyConfig(${p._idx})">삭제</button>`:''}</div></div>`}).join(''):'<div class="config-empty">조건에 맞는 구성이 없습니다.</div>';
 if(rows[0])showConfigDetail(`${rows[0]._kind}:${rows[0]._idx}`);else $('cfgDetail').innerHTML='<div class="config-empty">구성을 선택하세요.</div>';
}
function cfgGet(key){const [k,n]=String(key).split(':'),i=Number(n);return k==='builtin'?CONFIG_PRESETS[i]:cfgMy()[i]}
function showConfigDetail(key){const p=cfgGet(key);if(!p)return;if(p.data){const mods=(p.data.nodes||[]).filter(n=>n.type==='module');$('cfgDetail').innerHTML=`<h3>${esc(p.icon||'⭐')} ${esc(p.name)}</h3><p>${esc(p.desc||'내가 저장한 전체 설계 구성')}</p><div class="manual-note">저장된 설계 전체를 그대로 다시 불러오는 내 구성입니다. 블록 ${(p.data.nodes||[]).length}개 · 연결 ${(p.data.edges||[]).length}개</div>`;return}
 const tree=(p.modules||[]).map(m=>`<div class="config-mod"><div>${esc(m.icon||'▣')} ${esc(m.name)}</div>${(m.sections||[]).map(sec=>`<div class="config-sec"><b>└ ${esc(sec.name)}</b><div class="config-screens">${(sec.screens||[]).map(x=>esc(x[0])).join(' · ')}</div></div>`).join('')}</div>`).join('');
 const c=cfgCounts(p);$('cfgDetail').innerHTML=`<h3>${esc(p.icon||'🗂')} ${esc(p.name)}</h3><p>${esc(p.desc||'')}</p><div class="config-count" style="margin-bottom:10px">대분류 ${c.m} · 중분류 ${c.s} · 화면 ${c.c}</div><div class="config-tree">${tree}</div>`;
}
function cfgFindDirect(parent,type,name){return D.edges.filter(e=>e.kind==='contains'&&e.from===parent.id).map(e=>N(e.to)).find(x=>x?.type===type&&sameScreenName(x.name,name))||null}
function cfgEnsureModule(spec,append){let n=append?D.nodes.find(x=>x.type==='module'&&sameScreenName(x.name,spec.name)):null;if(!n){n={id:uid(),type:'module',name:spec.name,x:0,y:0,meta:{icon:spec.icon||'▣',desc:spec.desc||''}};D.nodes.push(n)}return n}
function cfgEnsureSection(mod,spec,append){let n=append?cfgFindDirect(mod,'section',spec.name):null;if(!n){n={id:uid(),type:'section',name:spec.name,x:0,y:0,meta:{icon:spec.icon||'▣'}};D.nodes.push(n);D.edges.push({id:uid(),from:mod.id,to:n.id,kind:'contains',label:''})}return n}
function cfgEnsureScreen(sec,spec,append){let n=append?cfgFindDirect(sec,'screen',spec[0]):null;if(!n){n={id:uid(),type:'screen',name:spec[0],x:0,y:0,meta:{file:'',kind:spec[1]||'input'}};D.nodes.push(n);D.edges.push({id:uid(),from:sec.id,to:n.id,kind:'contains',label:''})}return n}
function cfgAddColumns(t,profile){t.meta=t.meta||{};t.meta.cols=t.meta.cols||[];let defs=[];
 if(CFG_CUSTOM_COLS[profile])defs=CFG_CUSTOM_COLS[profile].map(x=>({name:x[0],label:x[1],type:x[2]||'text',pk:!!x[3],req:!!x[4]}));
 else if(typeof BASIC_PROFILE!=='undefined'&&BASIC_PROFILE[profile])defs=BASIC_PROFILE[profile].keys.map(k=>BASIC_COL_LIBRARY[k]).filter(Boolean).map((d,i)=>({...cfgClone(d),name:BASIC_PROFILE[profile].keys[i]||d.name}));
 else {addRecommendedBasicColumns(t);return}
 for(const d of defs){const norm=basicColNorm(d.label||d.name);if(!t.meta.cols.some(c=>basicColNorm(c.label||c.name)===norm))t.meta.cols.push(cfgClone(d))}
}
function cfgBuildPreset(p,mode,autoTable){const append=mode==='append';if(!append){clearDeleteUndo();D={nodes:[],edges:[]};curName='';try{localStorage.removeItem('sysdesign.name')}catch(e){}updateTitle()}
 let madeM=0,madeS=0,madeSc=0,madeT=0;
 for(const ms of p.modules||[]){const beforeM=D.nodes.length,mod=cfgEnsureModule(ms,append);if(D.nodes.length>beforeM)madeM++;
  for(const ss of ms.sections||[]){const beforeS=D.nodes.length,sec=cfgEnsureSection(mod,ss,append);if(D.nodes.length>beforeS)madeS++;const screens=[];
   for(const sp of ss.screens||[]){const before=D.nodes.length,sc=cfgEnsureScreen(sec,sp,append);if(D.nodes.length>before)madeSc++;screens.push(sc)}
   if(autoTable&&screens.length){let t=null;for(const sc of screens){t=firstUseTable(sc);if(t)break}if(!t){t=createTableForScreen(screens[0]);madeT++}for(const sc of screens)if(!D.edges.some(e=>e.kind==='uses'&&e.from===sc.id&&e.to===t.id))D.edges.push({id:uid(),from:sc.id,to:t.id,kind:'uses',label:''});cfgAddColumns(t,ss.profile||sectionProfileId(sec));autoKeyRequired(t);autoColumnNames(t);for(const sc of screens)autoScreenFileName(sc)}
  }
 }
 autoLayout();select(null);save();render();fitAll();return{madeM,madeS,madeSc,madeT}}
function cfgApplySaved(p,mode){if(mode==='replace'){clearDeleteUndo();D={nodes:[],edges:[]};curName='';try{localStorage.removeItem('sysdesign.name')}catch(e){}updateTitle()}
 insertModule(p.data,p.name,{auto:false});autoLayout();select(null);save();render();fitAll()}
function applyConfigPreset(key,mode){const p=cfgGet(key);if(!p)return;if(mode==='replace'&&D.nodes.length&&!confirm(`현재 설계를 지우고 '${p.name}' 구성으로 시작할까요?`))return;configDlg.classList.remove('on');
 if(p.data){cfgApplySaved(p,mode);$('stat').textContent=`🗂 ${p.name} 구성 적용 완료 — 저장된 전체 설계를 ${mode==='replace'?'새 설계로':'현재 설계에 추가'}했습니다.`;return}
 const r=cfgBuildPreset(p,mode,$('cfgAutoTable')?.checked!==false);$('stat').textContent=`🗂 ${p.name} 구성 적용 완료 — 대분류 ${r.madeM} · 중분류 ${r.madeS} · 화면 ${r.madeSc}${$('cfgAutoTable')?.checked!==false?` · 테이블 ${r.madeT}`:''} 추가`;
}
function saveCurrentAsConfig(){if(!D.nodes.length)return $('cfgMsg').textContent='저장할 설계가 없습니다.';const name=(prompt('내 구성 이름',($('sysName')?.value||'내 시스템')+' 구성')||'').trim();if(!name)return;const desc=(prompt('간단한 설명 (선택)','현재 설계 전체를 저장한 구성')||'').trim();const ids=D.nodes.map(n=>n.id),map=new Map(ids.map((id,i)=>[id,i]));const minx=Math.min(...D.nodes.map(n=>n.x||0)),miny=Math.min(...D.nodes.map(n=>n.y||0));const data={nodes:D.nodes.map(n=>({type:n.type,name:n.name,meta:cfgClone(n.meta||{}),dx:(n.x||0)-minx,dy:(n.y||0)-miny})),edges:D.edges.filter(e=>map.has(e.from)&&map.has(e.to)).map(e=>e.card?[map.get(e.from),map.get(e.to),e.kind,e.label||'',e.card]:[map.get(e.from),map.get(e.to),e.kind,e.label||''])};let a=cfgMy(),i=a.findIndex(x=>x.name===name);const rec={name,desc,icon:'⭐',data,at:Date.now()};if(i>=0){if(!confirm(`'${name}' 구성이 이미 있습니다. 덮어쓸까요?`))return;a[i]=rec}else a.push(rec);cfgSetMy(a);$('cfgCat').value='내 구성';renderConfigLibrary();$('cfgMsg').textContent=`'${name}' 구성을 저장했습니다.`}
function deleteMyConfig(i){let a=cfgMy(),p=a[i];if(!p||!confirm(`'${p.name}' 구성을 삭제할까요?`))return;a.splice(i,1);cfgSetMy(a);renderConfigLibrary();$('cfgMsg').textContent='내 구성을 삭제했습니다.'}
