/* ═══════════════ 데이터 모델 ═══════════════
 nodes: {id,type:'module'|'section'|'screen'|'table',name,x,y,meta}
   module : {icon,desc,homeType:'auto'|'cards'|'erp'|'dashboard'}
   section: {icon}
   screen : {file,kind:'input'|'status'|'other'}
   table  : {cols:[{name,label,type:'text'|'num'|'date'|'bool',pk,req,sample,formula,unit,decimals,calcStore}], autoNo:{enabled,prefix,date,digits,sep}, alert:{enabled,dateCol,days}, approval:{enabled,lock,routeTemplate,assignees:{writer,reviewer,confirmer,approver}}} // assignees=users.user_key · formula/전자결재/결재자
 edges: {id,from,to,kind:'contains'|'uses'|'ref'|'flow',label}
*/
const TYPE={module:{name:'대메뉴',color:'#3f5f7d',w:170},section:{name:'중분류',color:'#6b8bb5',w:160},screen:{name:'화면',color:'#2e7d5b',w:190},table:{name:'테이블',color:'#7a4fb8',w:210}};
const KIND={contains:'포함',uses:'사용',ref:'참조',flow:'흐름'};
const LS='sysdesign.v1';
let D={nodes:[],edges:[]},sel=null,view={x:40,y:40,k:1},uid=()=>Math.random().toString(36).slice(2,9);
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const N=id=>D.nodes.find(n=>n.id===id);
const DELETE_UNDO_LIMIT=30;
let deleteUndo=[];
const cloneUndo=o=>JSON.parse(JSON.stringify(o));
function updateUndoUI(){
 const b=$('undoBtn');if(!b)return;const a=deleteUndo[deleteUndo.length-1];
 b.disabled=!a;b.title=a?`삭제 되돌리기: ${a.label||'마지막 항목'} (Ctrl+Z)`:'되돌릴 삭제 내역이 없습니다 (Ctrl+Z)';
}
function rememberDelete(a){deleteUndo.push(a);if(deleteUndo.length>DELETE_UNDO_LIMIT)deleteUndo.shift();updateUndoUI()}
function clearDeleteUndo(){deleteUndo=[];updateUndoUI()}
function undoDelete(){
 const a=deleteUndo.pop();if(!a){updateUndoUI();return}
 if(a.kind==='node'){
  if(!N(a.node.id))D.nodes.push(cloneUndo(a.node));
  for(const e of a.edges||[]){
   if(N(e.from)&&N(e.to)&&!D.edges.some(x=>x.id===e.id))D.edges.push(cloneUndo(e));
  }
  select({node:a.node.id});
  $('stat').textContent=`↶ 되돌림 — '${a.node.name}' 블록과 연결 ${(a.edges||[]).length}개를 복구했습니다.`;
 }else if(a.kind==='edge'){
  const e=a.edge;
  if(N(e.from)&&N(e.to)&&!D.edges.some(x=>x.id===e.id)){D.edges.push(cloneUndo(e));select({edge:e.id});$('stat').textContent=`↶ 되돌림 — '${a.label||'연결'}'을 복구했습니다.`}
  else{$('stat').textContent='되돌릴 연결의 양쪽 블록이 없어 복구하지 못했습니다.'}
 }
 updateUndoUI();save();
}
function save(){try{localStorage.setItem(LS,JSON.stringify({D,view}))}catch(e){}}

/* ═══════════════ 노드 크기 ═══════════════ */
function size(n){let w=TYPE[n.type].w;let h=46;
 if(n.type==='table'){const cols=n.meta.cols||[];h=46+Math.max(1,cols.length)*17+8;
  const wide=Math.max(...cols.map(c=>(c.name.length+String(c.label||'').length+String(c.sample||'').length+String(c.formula||'').length*.35)*6.6+54),0);
  w=Math.min(420,Math.max(w,wide))}
 else if(n.type==='screen')h=58;
 return{w,h}}
function ports(n){const{w,h}=size(n);return{out:{x:n.x+w,y:n.y+h/2},in:{x:n.x,y:n.y+h/2}}}

/* ═══════════════ 렌더 ═══════════════ */
function render(){
 $('world').setAttribute('transform',`translate(${view.x},${view.y}) scale(${view.k})`);
 const ng=$('nodes');ng.innerHTML='';
 for(const n of D.nodes){
  const{w,h}=size(n),t=TYPE[n.type];
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','node'+(sel&&sel.node===n.id?' sel':''));g.setAttribute('transform',`translate(${n.x},${n.y})`);g.dataset.id=n.id;
  let body='';
  if(n.type==='table'){const cols=n.meta.cols||[];body=cols.length?cols.map((c,i)=>`<text class="col${c.pk?' pk':''}" x="10" y="${44+i*17}">${c.pk?'🔑 ':''}${esc(c.name)}<tspan fill="#8a94a6"> ${esc(c.label||'')}</tspan><tspan fill="#b0b8c4" font-size="10"> ${c.type}${c.formula?' ƒx':''}</tspan>${c.sample?`<tspan fill="#2e7d5b" font-size="10.5"> ${esc(c.sample)}</tspan>`:''}${typeof parseFlow==='function'&&parseFlow(c)?`<tspan fill="#2f6fb5" font-size="10"> ⇢${parseFlow(c).steps.length}단계</tspan>`:''}</text>`).join(''):`<text class="sub" x="10" y="44">컬럼 없음 — 우측에서 추가</text>`}
  else if(n.type==='screen')body=`<text class="sub" x="10" y="46">${n.meta.locked?'🔒 ':''}${esc(n.meta.file||'(파일명 없음)')} · ${n.meta.kind==='input'?'등록':n.meta.kind==='status'?'현황':n.meta.kind==='check'?'체크시트':n.meta.kind==='board'?'보드':n.meta.kind==='perm'?'권한관리':n.meta.kind==='paste'?'붙여넣기':n.meta.kind==='dash'?'대시보드':'기타'}${detailOf(n)?' · 헤더+명세':''}${n.meta.skin&&typeof SKIN!=='undefined'&&SKIN[n.meta.skin]?' · 🎨'+SKIN[n.meta.skin].name.replace(/^mm /,''):''}${n.meta.origin&&typeof originUrl==='function'&&originUrl(n)?' · 📎원본':''}</text>`;
  else body=`<text class="sub" x="10" y="38">${esc(n.meta.desc||n.meta.icon||'')}</text>`;
  g.innerHTML=`<rect class="box" width="${w}" height="${h}"/><rect class="head" width="${w}" height="26" fill="${t.color}"/><rect width="${w}" height="8" y="18" fill="${t.color}"/>
   <text class="title" x="10" y="18">${esc(n.name)}</text><text class="title" x="${w-8}" y="18" text-anchor="end" font-size="10" opacity=".7">${esc(n.type==='table'&&n.meta.host?String(n.meta.host).slice(0,14):t.name)}</text>${body}
   <circle class="port" data-port="out" cx="${w}" cy="${h/2}" r="6"/><circle class="port" data-port="in" cx="0" cy="${h/2}" r="6" style="cursor:default"/>`;
  ng.appendChild(g);
 }
 const eg=$('edges');eg.innerHTML='';
 for(const e of D.edges){
  const a=N(e.from),b=N(e.to);if(!a||!b)continue;
  const p=edgePath(a,b),m=p.mid;
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','edge'+(sel&&sel.edge===e.id?' sel':''));g.dataset.id=e.id;
  const lbl=e.label||KIND[e.kind];const lw=Math.max(28,lbl.length*7+14);
  g.innerHTML=`<path class="hit" d="${p.d}"/><path class="vis k-${e.kind}" d="${p.d}" marker-end="url(#${e.kind==='contains'?'arr':'arr-'+e.kind})"/>
   <rect class="lb" x="${m.x-lw/2}" y="${m.y-10}" width="${lw}" height="20"/><text x="${m.x}" y="${m.y+4}" text-anchor="middle">${esc(lbl)}</text>`;
  eg.appendChild(g);
 }
 $('stat').textContent=`블록 ${D.nodes.length} · 연결 ${D.edges.length}  (자동 저장됨)`;
 updateUndoUI();save();
 if(typeof practiceRefresh==='function')practiceRefresh();
}
function edgePath(a,b){
 const p1=ports(a).out,p2=ports(b).in;
 const dx=Math.max(40,Math.abs(p2.x-p1.x)/2);
 const c1={x:p1.x+dx,y:p1.y},c2={x:p2.x-dx,y:p2.y};
 const t=.5,mx=Math.pow(1-t,3)*p1.x+3*Math.pow(1-t,2)*t*c1.x+3*(1-t)*t*t*c2.x+t*t*t*p2.x,my=Math.pow(1-t,3)*p1.y+3*Math.pow(1-t,2)*t*c1.y+3*(1-t)*t*t*c2.y+t*t*t*p2.y;
 return{d:`M${p1.x} ${p1.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`,mid:{x:mx,y:my}};
}

/* ═══════════════ 마우스 ═══════════════ */
function ddToggle(btn){const dd=btn.parentElement;const open=dd.classList.contains('open');document.querySelectorAll('.dd.open').forEach(x=>x.classList.remove('open'));if(!open)dd.classList.add('open')}
function openGuide(){guideDlg.classList.add('on');setTimeout(()=>{const b=guideDlg.querySelector('.manual-body');if(b)b.scrollTop=0},0)}
function guideGo(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}

/* ═══════════════ 사용안내 · 실습하기 ═══════════════ */
const PRACTICE_BACKUP_KEY='sysdesign.practice.backup.v1';
let practiceState={key:null};
const P_COL=(name,label,type='text',pk=false,req=false)=>({name,label,type,pk,req});
const PRACTICES={
 prod:{level:'입문',title:'생산실적 등록',desc:'가장 기본적인 구조를 직접 만듭니다. 대메뉴부터 자료 저장 테이블까지 한 줄로 연결하는 연습입니다.',
  nodes:[
   {type:'module',name:'생산관리',meta:{icon:'⚙',desc:'생산 실적 관리'}},
   {type:'section',name:'생산실적',meta:{icon:'▣'}},
   {type:'screen',name:'작업실적 등록',meta:{file:'prod_input.html',kind:'input'}},
   {type:'table',name:'production_log'}],
  columns:{production_log:[P_COL('work_date','작업일자','date',false,true),P_COL('machine','설비'),P_COL('item_code','품번','text',false,true),P_COL('qty','수량','num'),P_COL('worker','작업자')]},
  edges:[['생산관리','생산실적','contains'],['생산실적','작업실적 등록','contains'],['작업실적 등록','production_log','uses']],
  steps:[
   ['대메뉴 만들기','[＋ 추가]에서 대메뉴를 추가하고 이름을 “생산관리”로 바꾸세요.',{node:'생산관리'},'대메뉴를 클릭한 뒤 오른쪽의 이름 칸에서 수정합니다.'],
   ['중분류 만들기','중분류 “생산실적”을 만들고 생산관리 아래에 연결하세요.',{edge:['생산관리','생산실적','contains']},'생산관리를 선택한 뒤 중분류를 추가하면 자동 연결되기 쉽습니다.'],
   ['등록 화면 만들기','화면 “작업실적 등록”을 만들고 화면 종류를 등록으로 두세요.',{node:'작업실적 등록'},'화면을 클릭하면 오른쪽에서 화면 종류를 바꿀 수 있습니다.'],
   ['메뉴와 화면 연결','생산실적 → 작업실적 등록이 포함 선으로 연결되어야 합니다.',{edge:['생산실적','작업실적 등록','contains']},'블록 오른쪽 ○를 끌어 화면 블록에 놓으세요.'],
   ['자료표 만들기','테이블 이름을 “production_log”로 만들고 작업일자·설비·품번·수량·작업자 항목을 넣으세요.',{cols:'production_log'},'테이블을 선택하면 오른쪽의 항목 표에서 열을 추가하고 이름/표시명을 바꿀 수 있습니다.'],
   ['화면과 자료표 연결','작업실적 등록 → production_log를 사용 선으로 연결하세요.',{edge:['작업실적 등록','production_log','uses']},'화면 오른쪽 ○에서 테이블까지 끌면 “사용” 선이 자동 선택됩니다.'] ]},
 auto_cols:{level:'자동 ①',title:'추천 칼럼 자동추가',desc:'생산실적용 빈 테이블을 만든 뒤 [⚡ 추천 칼럼 자동추가]와 [⚡ 키·필수 자동선택]을 직접 눌러 보는 실습입니다.',
  nodes:[{type:'module',name:'생산관리',meta:{icon:'⚙',desc:'생산 실적 관리'}},{type:'section',name:'생산실적',meta:{icon:'▣'}},{type:'screen',name:'생산실적 등록',meta:{file:'',kind:'input'}},{type:'table',name:'production_auto',meta:{cols:[]}}],
  columns:{production_auto:[P_COL('work_no','작업번호'),P_COL('work_date','작업일자','date'),P_COL('item_no','품번'),P_COL('process','공정'),P_COL('equipment','설비'),P_COL('worker','작업자')]},
  edges:[['생산관리','생산실적','contains'],['생산실적','생산실적 등록','contains'],['생산실적 등록','production_auto','uses']],
  steps:[
   ['자동추가용 화면 뼈대 만들기','생산관리 → 생산실적 → 생산실적 등록을 만들고 연결하세요.',{edges:[['생산관리','생산실적','contains'],['생산실적','생산실적 등록','contains']]},'생산관리 블록을 선택하고 중분류를 추가한 다음, 생산실적을 선택하고 화면을 추가하면 자동 연결이 쉽습니다.'],
   ['빈 테이블 연결하기','production_auto 테이블을 만들고 생산실적 등록 화면과 연결하세요. 칼럼은 비워 두어도 됩니다.',{edge:['생산실적 등록','production_auto','uses']},'화면 오른쪽 ○를 테이블로 끌면 “사용” 선이 만들어집니다.'],
   ['추천 칼럼 자동추가 사용하기','production_auto를 선택한 뒤 오른쪽 [🧩 기본 칼럼 도우미]의 [⚡ 추천 칼럼 자동추가]를 눌러 보세요.',{autoCols:{table:'production_auto',labels:['작업번호','작업일자','품번','공정','설비','작업자']}},'테이블을 클릭하면 오른쪽 아래에 “기본 칼럼 도우미”가 보입니다. 파란색 [⚡ 추천 칼럼 자동추가] 버튼을 누르세요.'],
   ['키·필수 자동선택 사용하기','같은 테이블에서 [⚡ 키·필수 자동선택]을 눌러 기본키와 필수 항목을 자동으로 체크하세요.',{keyReq:'production_auto'},'칼럼 표 아래쪽의 파란색 [⚡ 키·필수 자동선택] 버튼을 누르면 번호/코드와 업무 필수 항목을 자동 판정합니다.'] ]},
 auto_screen:{level:'자동 ②',title:'화면 자동완성',desc:'대메뉴·중분류·화면까지만 만든 뒤 [⚡ 화면 자동완성] 한 번으로 테이블과 기본 설정이 만들어지는 과정을 연습합니다.',
  nodes:[{type:'module',name:'출하관리',meta:{icon:'▣',desc:'출하 업무'}},{type:'section',name:'출하업무',meta:{icon:'▣'}},{type:'screen',name:'출하등록',meta:{file:'',kind:'input'}}],
  columns:{},edges:[['출하관리','출하업무','contains'],['출하업무','출하등록','contains']],
  steps:[
   ['대메뉴와 중분류 만들기','대메뉴 “출하관리”와 중분류 “출하업무”를 만들고 연결하세요.',{edge:['출하관리','출하업무','contains']},'출하관리 블록을 선택한 상태에서 중분류를 추가하면 쉽게 연결됩니다.'],
   ['화면 하나만 만들기','출하업무 아래에 “출하등록” 화면을 만들고 화면 종류를 등록으로 두세요. 테이블은 아직 만들지 않습니다.',{edge:['출하업무','출하등록','contains']},'출하업무 블록을 선택한 상태에서 화면을 추가하고 이름을 출하등록으로 바꾸세요.'],
   ['화면 자동완성 실행하기','출하등록 화면을 선택하고 오른쪽 [⚡ 화면 자동완성]을 눌러 보세요.',{autoScreen:'출하등록'},'화면을 클릭하면 파일명 아래에 파란색 [⚡ 화면 자동완성] 버튼이 있습니다. 이 버튼 하나가 테이블 → 기본 칼럼 → 키·필수 → 칼럼명 → 파일명 순서로 처리합니다.'],
   ['자동완성 결과 확인하기','연결된 테이블에 출하번호·출하일자·품번·수량 같은 칼럼이 있고 파일명도 자동 생성되었는지 확인하세요.',{autoScreenDetail:'출하등록'},'출하등록 화면과 연결된 테이블을 클릭해 칼럼을 확인하고, 다시 화면을 클릭해 파일명이 .html로 만들어졌는지 확인하세요.'] ]},
 auto_section:{level:'자동 ③',title:'중분류 화면 자동추천',desc:'중분류 하나만 만든 뒤 업무 성격을 보고 여러 화면과 공용 테이블을 자동으로 만드는 기능을 연습합니다.',
  nodes:[{type:'module',name:'품질관리',meta:{icon:'✓',desc:'검사 및 불량 관리'}},{type:'section',name:'검사관리',meta:{icon:'▣'}}],
  columns:{},edges:[['품질관리','검사관리','contains']],
  steps:[
   ['품질관리 중분류 만들기','대메뉴 “품질관리”와 중분류 “검사관리”를 만들고 연결하세요.',{edge:['품질관리','검사관리','contains']},'품질관리 블록을 선택한 상태에서 중분류를 추가하고 이름을 검사관리로 바꾸세요.'],
   ['중분류 자동추천 실행하기','검사관리 블록을 선택하면 오른쪽에 [⚡ 중분류 화면 자동추천]이 나옵니다. 기본 체크 상태로 [⚡ 선택 화면 한꺼번에 만들기]를 눌러 보세요.',{autoSection:{section:'검사관리',screens:['검사결과 등록','검사결과 현황','불량현황','품질대시보드']}},'검사관리 블록을 클릭하세요. 오른쪽 자동추천 영역에서 만들 화면들이 체크되어 있습니다. [⚡ 선택 화면 한꺼번에 만들기]를 누르면 됩니다.'],
   ['자동생성 결과 확인하기','추천 화면들이 검사관리 아래에 연결되고, 공용 테이블과 품질 기본 칼럼이 함께 만들어졌는지 확인하세요.',{autoSectionDetail:{section:'검사관리',screens:['검사결과 등록','검사결과 현황','불량현황','품질대시보드']}},'자동 생성된 화면 하나를 클릭하면 파일명이 만들어져 있고, 연결된 테이블에는 검사번호·검사일자·품번·판정 같은 칼럼이 들어 있습니다.'] ]},
 quality:{level:'기본',title:'품질검사 등록 + 불량현황',desc:'등록 화면과 조회 화면이 같은 검사자료를 함께 사용하는 구조를 연습합니다.',
  nodes:[{type:'module',name:'품질관리',meta:{icon:'✓',desc:'검사 및 불량 관리'}},{type:'section',name:'검사관리',meta:{icon:'▣'}},{type:'screen',name:'검사결과 등록',meta:{file:'quality_input.html',kind:'input'}},{type:'screen',name:'불량현황',meta:{file:'quality_status.html',kind:'status'}},{type:'table',name:'quality_results'}],
  columns:{quality_results:[P_COL('inspect_date','검사일','date'),P_COL('item_code','품번'),P_COL('lot_no','LOT번호'),P_COL('result','판정'),P_COL('defect_qty','불량수량','num'),P_COL('inspector','검사자')]},
  edges:[['품질관리','검사관리','contains'],['검사관리','검사결과 등록','contains'],['검사관리','불량현황','contains'],['검사결과 등록','quality_results','uses'],['불량현황','quality_results','uses'],['검사결과 등록','불량현황','flow']],
  steps:[
   ['메뉴 뼈대 만들기','대메뉴 “품질관리”와 중분류 “검사관리”를 만들고 연결하세요.',{edge:['품질관리','검사관리','contains']},'품질관리 선택 → [＋ 추가] → 중분류 순서로 만들면 쉽습니다.'],
   ['등록 화면 만들기','“검사결과 등록” 화면을 만들고 검사관리 아래에 연결하세요.',{edge:['검사관리','검사결과 등록','contains']},'화면 종류는 “등록”을 사용합니다.'],
   ['조회 화면 만들기','“불량현황” 화면을 만들고 화면 종류를 “현황”으로 설정한 뒤 검사관리 아래에 연결하세요.',{all:[{edge:['검사관리','불량현황','contains']},{node:'불량현황'}]},'오른쪽 화면 종류에서 “현황”을 선택하세요.'],
   ['검사자료 만들기','quality_results 테이블에 검사일·품번·LOT번호·판정·불량수량·검사자 항목을 만드세요.',{cols:'quality_results'},'테이블의 표시명에는 한글을 사용해도 됩니다.'],
   ['등록 화면 연결','검사결과 등록 → quality_results를 연결하세요.',{edge:['검사결과 등록','quality_results','uses']},'화면에서 테이블로 연결하면 사용 선입니다.'],
   ['조회 화면도 연결','불량현황 → quality_results도 연결하세요.',{edge:['불량현황','quality_results','uses']},'같은 테이블을 여러 화면이 함께 사용할 수 있습니다.'],
   ['화면 흐름 연결','검사결과 등록 → 불량현황을 흐름 선으로 연결하세요.',{edge:['검사결과 등록','불량현황','flow']},'화면에서 화면으로 선을 연결하면 흐름 선이 됩니다.'] ]},
 mold:{level:'기본',title:'금형점검 관리',desc:'금형대장과 점검내역 두 자료표를 만들고 서로 참조시키는 연습입니다.',
  nodes:[{type:'module',name:'금형관리',meta:{icon:'◆',desc:'금형 대장과 점검'}},{type:'section',name:'예방점검',meta:{icon:'▣'}},{type:'screen',name:'금형점검표',meta:{file:'mold_check.html',kind:'check'}},{type:'table',name:'molds'},{type:'table',name:'mold_checks'}],
  columns:{molds:[P_COL('mold_no','금형번호','text',true,true),P_COL('item_code','품번'),P_COL('location','보관위치')],mold_checks:[P_COL('check_date','점검일','date'),P_COL('mold_no','금형번호'),P_COL('result','판정'),P_COL('action','조치내용'),P_COL('inspector','점검자')]},
  edges:[['금형관리','예방점검','contains'],['예방점검','금형점검표','contains'],['금형점검표','mold_checks','uses'],['금형점검표','molds','uses'],['mold_checks','molds','ref']],
  steps:[
   ['금형 메뉴 만들기','금형관리 → 예방점검 → 금형점검표를 순서대로 만들고 연결하세요.',{edge:['예방점검','금형점검표','contains']},'대메뉴를 만든 뒤 그 블록을 선택한 상태로 다음 블록을 추가하세요.'],
   ['체크시트로 바꾸기','금형점검표 화면 종류를 “체크시트”로 설정하세요.',{node:'금형점검표'},'화면 블록을 클릭한 뒤 오른쪽의 화면 종류에서 체크시트를 고릅니다.'],
   ['금형대장 만들기','molds 테이블에 금형번호·품번·보관위치를 만드세요.',{cols:'molds'},'금형번호를 대표 항목(PK)으로 두면 좋습니다.'],
   ['점검내역 만들기','mold_checks 테이블에 점검일·금형번호·판정·조치내용·점검자를 만드세요.',{cols:'mold_checks'},'점검 결과가 계속 쌓이는 이력 자료표입니다.'],
   ['점검표와 자료 연결','금형점검표가 molds와 mold_checks 두 테이블을 모두 사용하도록 연결하세요.',{edges:[['금형점검표','molds','uses'],['금형점검표','mold_checks','uses']]},'한 화면에서 두 개의 테이블을 사용할 수 있습니다.'],
   ['테이블 관계 만들기','mold_checks → molds를 참조 선으로 연결하세요.',{edge:['mold_checks','molds','ref']},'점검내역의 금형번호가 어느 금형인지 찾기 위한 연결입니다.'] ]},
 stock:{level:'중급',title:'자재 입·출고 관리',desc:'자재 기준정보와 입출고 이력을 나누고, 등록/현황 화면을 연결하는 연습입니다.',
  nodes:[{type:'module',name:'자재관리',meta:{icon:'▦',desc:'재고와 입출고'}},{type:'section',name:'재고관리',meta:{icon:'▣'}},{type:'screen',name:'입출고 등록',meta:{file:'stock_input.html',kind:'input'}},{type:'screen',name:'재고현황',meta:{file:'stock_status.html',kind:'status'}},{type:'table',name:'materials'},{type:'table',name:'stock_moves'}],
  columns:{materials:[P_COL('material_code','자재코드','text',true,true),P_COL('material_name','자재명'),P_COL('unit','단위'),P_COL('safe_qty','안전재고','num')],stock_moves:[P_COL('move_date','처리일','date'),P_COL('material_code','자재코드'),P_COL('move_type','구분'),P_COL('qty','수량','num'),P_COL('worker','담당자')]},
  edges:[['자재관리','재고관리','contains'],['재고관리','입출고 등록','contains'],['재고관리','재고현황','contains'],['입출고 등록','stock_moves','uses'],['입출고 등록','materials','uses'],['재고현황','stock_moves','uses'],['재고현황','materials','uses'],['stock_moves','materials','ref']],
  steps:[
   ['메뉴와 화면 만들기','자재관리 → 재고관리 아래에 “입출고 등록”과 “재고현황” 화면을 만드세요.',{edges:[['자재관리','재고관리','contains'],['재고관리','입출고 등록','contains'],['재고관리','재고현황','contains']]},'등록 화면과 현황 화면은 같은 중분류 아래에 둘 수 있습니다.'],
   ['자재 기준정보 만들기','materials 테이블에 자재코드·자재명·단위·안전재고를 만드세요.',{cols:'materials'},'자재코드는 중복되지 않는 대표 코드로 사용합니다.'],
   ['입출고 이력 만들기','stock_moves 테이블에 처리일·자재코드·구분·수량·담당자를 만드세요.',{cols:'stock_moves'},'구분에는 입고/출고 같은 값을 넣는 구조입니다.'],
   ['등록 화면 연결','입출고 등록 화면이 materials와 stock_moves를 모두 사용하도록 연결하세요.',{edges:[['입출고 등록','materials','uses'],['입출고 등록','stock_moves','uses']]},'자재를 선택하고 입출고 내역을 저장하기 때문에 두 자료표를 함께 씁니다.'],
   ['현황 화면 연결','재고현황 화면도 materials와 stock_moves를 모두 사용하도록 연결하세요.',{edges:[['재고현황','materials','uses'],['재고현황','stock_moves','uses']]},'기준정보와 이력을 합쳐 재고를 보여 주는 구조입니다.'],
   ['자료표 관계 만들기','stock_moves → materials를 참조 선으로 연결하세요.',{edge:['stock_moves','materials','ref']},'입출고 이력의 자재코드가 자재대장의 자재코드를 가리키도록 합니다.'] ]},
 safety:{level:'중급',title:'위험성평가 + 개선조치',desc:'위험요인을 등록하고 개선조치로 이어지는 업무 흐름을 설계합니다.',
  nodes:[{type:'module',name:'안전관리',meta:{icon:'⚠',desc:'위험성평가와 개선'}},{type:'section',name:'위험성평가',meta:{icon:'▣'}},{type:'screen',name:'위험요인 등록',meta:{file:'risk_input.html',kind:'input'}},{type:'screen',name:'개선조치 관리',meta:{file:'action_input.html',kind:'input'}},{type:'table',name:'risk_assessments'},{type:'table',name:'risk_actions'}],
  columns:{risk_assessments:[P_COL('assess_date','평가일','date'),P_COL('process','공정'),P_COL('hazard','유해위험요인'),P_COL('risk_level','위험도','num'),P_COL('assessor','평가자')],risk_actions:[P_COL('action_date','조치일','date'),P_COL('risk_id','위험요인번호'),P_COL('action','개선대책'),P_COL('owner','담당자'),P_COL('status','진행상태')]},
  edges:[['안전관리','위험성평가','contains'],['위험성평가','위험요인 등록','contains'],['위험성평가','개선조치 관리','contains'],['위험요인 등록','risk_assessments','uses'],['개선조치 관리','risk_actions','uses'],['개선조치 관리','risk_assessments','uses'],['위험요인 등록','개선조치 관리','flow'],['risk_actions','risk_assessments','ref']],
  steps:[
   ['메뉴 만들기','안전관리 → 위험성평가 아래에 위험요인 등록과 개선조치 관리 화면을 만드세요.',{edges:[['안전관리','위험성평가','contains'],['위험성평가','위험요인 등록','contains'],['위험성평가','개선조치 관리','contains']]},'대메뉴 1개, 중분류 1개, 화면 2개입니다.'],
   ['평가 자료표 만들기','risk_assessments에 평가일·공정·유해위험요인·위험도·평가자를 만드세요.',{cols:'risk_assessments'},'위험도는 숫자 형식으로 둘 수 있습니다.'],
   ['개선 자료표 만들기','risk_actions에 조치일·위험요인번호·개선대책·담당자·진행상태를 만드세요.',{cols:'risk_actions'},'개선조치가 여러 건 쌓일 수 있는 이력 자료표입니다.'],
   ['각 화면 연결','위험요인 등록은 risk_assessments, 개선조치 관리는 risk_actions와 risk_assessments를 사용하도록 연결하세요.',{edges:[['위험요인 등록','risk_assessments','uses'],['개선조치 관리','risk_actions','uses'],['개선조치 관리','risk_assessments','uses']]},'개선 화면은 원래 위험요인도 함께 봐야 하므로 두 테이블을 씁니다.'],
   ['업무 흐름 만들기','위험요인 등록 → 개선조치 관리를 흐름 선으로 연결하세요.',{edge:['위험요인 등록','개선조치 관리','flow']},'화면끼리 연결하면 초록 점선 흐름선이 만들어집니다.'],
   ['자료 관계 만들기','risk_actions → risk_assessments를 참조 선으로 연결하세요.',{edge:['risk_actions','risk_assessments','ref']},'어떤 위험요인에 대한 개선조치인지 찾기 위한 관계입니다.'] ]},
 mes:{level:'종합',title:'수주 → 생산 → 출하',desc:'화면 3개와 테이블 3개를 연결해 하나의 업무 흐름을 완성하는 종합 실습입니다.',
  nodes:[{type:'module',name:'통합업무',meta:{icon:'▣',desc:'수주·생산·출하'}},{type:'section',name:'업무진행',meta:{icon:'▣'}},{type:'screen',name:'수주등록',meta:{file:'order_input.html',kind:'input'}},{type:'screen',name:'생산실적등록',meta:{file:'prod_result_input.html',kind:'input'}},{type:'screen',name:'출하등록',meta:{file:'shipment_input.html',kind:'input'}},{type:'table',name:'orders'},{type:'table',name:'prod_results'},{type:'table',name:'shipments'}],
  columns:{orders:[P_COL('order_no','수주번호','text',true,true),P_COL('order_date','수주일','date'),P_COL('customer','거래처'),P_COL('item_code','품번'),P_COL('order_qty','수주수량','num')],prod_results:[P_COL('work_date','작업일','date'),P_COL('order_no','수주번호'),P_COL('good_qty','양품수량','num'),P_COL('defect_qty','불량수량','num'),P_COL('worker','작업자')],shipments:[P_COL('ship_date','출하일','date'),P_COL('order_no','수주번호'),P_COL('ship_qty','출하수량','num'),P_COL('vehicle','차량'),P_COL('worker','담당자')]},
  edges:[['통합업무','업무진행','contains'],['업무진행','수주등록','contains'],['업무진행','생산실적등록','contains'],['업무진행','출하등록','contains'],['수주등록','orders','uses'],['생산실적등록','prod_results','uses'],['생산실적등록','orders','uses'],['출하등록','shipments','uses'],['출하등록','orders','uses'],['수주등록','생산실적등록','flow'],['생산실적등록','출하등록','flow'],['prod_results','orders','ref'],['shipments','orders','ref']],
  steps:[
   ['메뉴와 화면 3개 만들기','통합업무 → 업무진행 아래에 수주등록·생산실적등록·출하등록 화면을 만드세요.',{edges:[['통합업무','업무진행','contains'],['업무진행','수주등록','contains'],['업무진행','생산실적등록','contains'],['업무진행','출하등록','contains']]},'화면 3개를 같은 중분류에 넣습니다.'],
   ['수주 자료 만들기','orders 테이블에 수주번호·수주일·거래처·품번·수주수량을 만드세요.',{cols:'orders'},'수주번호를 대표 항목으로 두면 관계 연결이 쉽습니다.'],
   ['생산 자료 만들기','prod_results 테이블에 작업일·수주번호·양품수량·불량수량·작업자를 만드세요.',{cols:'prod_results'},'생산실적은 수주번호를 갖고 있어야 어떤 수주 작업인지 연결할 수 있습니다.'],
   ['출하 자료 만들기','shipments 테이블에 출하일·수주번호·출하수량·차량·담당자를 만드세요.',{cols:'shipments'},'출하도 수주번호로 원래 수주와 연결합니다.'],
   ['화면과 자료 연결','수주등록은 orders, 생산실적등록은 prod_results+orders, 출하등록은 shipments+orders를 사용하도록 연결하세요.',{edges:[['수주등록','orders','uses'],['생산실적등록','prod_results','uses'],['생산실적등록','orders','uses'],['출하등록','shipments','uses'],['출하등록','orders','uses']]},'생산과 출하 화면에서 원 수주 내용을 볼 수 있게 orders도 연결합니다.'],
   ['업무 흐름 연결','수주등록 → 생산실적등록 → 출하등록 순서로 흐름 선을 만드세요.',{edges:[['수주등록','생산실적등록','flow'],['생산실적등록','출하등록','flow']]},'화면에서 화면으로 순서대로 연결합니다.'],
   ['자료 관계 연결','prod_results → orders, shipments → orders를 참조 선으로 연결하세요.',{edges:[['prod_results','orders','ref'],['shipments','orders','ref']]},'생산실적과 출하내역이 어느 수주에 속하는지 표시하는 관계입니다.'] ]}
};
function pNorm(v){return String(v??'').trim().replace(/\s+/g,'').toLowerCase()}
function practiceCfg(){return PRACTICES[practiceState.key]||null}
function practiceNodeByName(name){const cfg=practiceCfg(),sp=cfg?.nodes.find(x=>pNorm(x.name)===pNorm(name));return D.nodes.find(n=>pNorm(n.name)===pNorm(name)&&(!sp||n.type===sp.type))}
function practiceNodeDone(name){const cfg=practiceCfg(),sp=cfg?.nodes.find(x=>pNorm(x.name)===pNorm(name)),n=practiceNodeByName(name);return !!(n&&(!sp?.meta?.kind||n.meta?.kind===sp.meta.kind))}
function practiceEdgeDone(a,b,k){const A=practiceNodeByName(a),B=practiceNodeByName(b);return !!(A&&B&&D.edges.some(e=>e.from===A.id&&e.to===B.id&&e.kind===k))}
function practiceColsDone(table){const cfg=practiceCfg(),t=practiceNodeByName(table),req=cfg?.columns?.[table]||[];if(!t||t.type!=='table')return false;const cols=t.meta?.cols||[];return req.every(r=>cols.some(c=>pNorm(c.name)===pNorm(r.name)||pNorm(c.label)===pNorm(r.label)))}
function practiceAutoColsDone(spec){const t=practiceNodeByName(spec?.table);if(!t||t.type!=='table')return false;const cols=t.meta?.cols||[];return (spec.labels||[]).every(l=>cols.some(c=>pNorm(c.label)===pNorm(l)))}
function practiceKeyReqDone(name){const t=practiceNodeByName(name);if(!t||t.type!=='table')return false;const cols=t.meta?.cols||[];return cols.some(c=>c.pk&&c.req)&&cols.filter(c=>c.req).length>=2}
function practiceAutoScreenDone(name,detail){const s=practiceNodeByName(name);if(!s||s.type!=='screen')return false;const t=typeof firstUseTable==='function'?firstUseTable(s):null;if(!t)return false;const cols=t.meta?.cols||[];const base=cols.length>=6&&cols.some(c=>c.pk)&&cols.some(c=>c.req)&&String(s.meta?.file||'').toLowerCase().endsWith('.html');if(!detail)return base;return base&&cols.some(c=>/출하번호/.test(c.label||''))&&cols.some(c=>/출하일/.test(c.label||''))&&cols.some(c=>/품번/.test(c.label||''))&&cols.some(c=>/수량/.test(c.label||''))}
function practiceSectionAutoDone(spec,detail){const sec=practiceNodeByName(spec?.section);if(!sec||sec.type!=='section')return false;const names=spec?.screens||[];const screens=sectionDirectScreens(sec);if(!names.every(n=>screens.some(s=>pNorm(s.name)===pNorm(n))))return false;if(!detail)return true;const made=screens.filter(s=>names.some(n=>pNorm(n)===pNorm(s.name)));const tables=made.map(s=>firstUseTable(s)).filter(Boolean);if(!tables.length)return false;const shared=tables[0];if(!made.every(s=>firstUseTable(s)?.id===shared.id))return false;const cols=shared.meta?.cols||[];return cols.length>=6&&cols.some(c=>/검사번호/.test(c.label||''))&&cols.some(c=>/판정/.test(c.label||''))&&made.every(s=>String(s.meta?.file||'').toLowerCase().endsWith('.html'))}
function practiceCheckOne(ch){
 if(!ch)return false;
 if(ch.node)return practiceNodeDone(ch.node);
 if(ch.all)return ch.all.every(x=>practiceCheckOne(x));
 if(ch.cols)return practiceColsDone(ch.cols);
 if(ch.edge)return practiceEdgeDone(...ch.edge);
 if(ch.edges)return ch.edges.every(e=>practiceEdgeDone(...e));
 if(ch.autoCols)return practiceAutoColsDone(ch.autoCols);
 if(ch.keyReq)return practiceKeyReqDone(ch.keyReq);
 if(ch.autoScreen)return practiceAutoScreenDone(ch.autoScreen,false);
 if(ch.autoScreenDetail)return practiceAutoScreenDone(ch.autoScreenDetail,true);
 if(ch.autoSection)return practiceSectionAutoDone(ch.autoSection,false);
 if(ch.autoSectionDetail)return practiceSectionAutoDone(ch.autoSectionDetail,true);
 return false;
}
function practiceResults(){const cfg=practiceCfg();return cfg?cfg.steps.map(s=>practiceCheckOne(s[2])):[]}
function practiceRefresh(){
 const cfg=practiceCfg(),P=$('practicePanel');if(!cfg||!P||!P.classList.contains('on'))return;
 const r=practiceResults(),done=r.filter(Boolean).length,idx=r.findIndex(x=>!x),cur=idx<0?cfg.steps.length-1:idx,pct=Math.round(done/r.length*100);
 $('practiceTitle').textContent=cfg.title;$('practiceLevel').textContent=cfg.level;$('practiceDesc').textContent=cfg.desc;$('practiceBar').style.width=pct+'%';$('practiceCount').textContent=`${done} / ${r.length} 단계 완료 · ${pct}%`;
 $('practiceSteps').innerHTML=cfg.steps.map((s,i)=>`<div class="practice-step ${r[i]?'done':i===cur?'now':''}"><span class="ico">${r[i]?'✓':i===cur?'▶':'○'}</span><span>${i+1}. ${esc(s[0])}</span></div>`).join('');
 if(idx<0){$('practiceNowTitle').textContent='🎉 실습 완료';$('practiceNowText').textContent='모든 단계가 완성되었습니다. [✓ 설계검증]이나 [▶ 시스템 생성]도 눌러 보세요.';$('practiceMsg').className='practice-msg ok';$('practiceMsg').textContent='잘 만들었습니다. 이제 같은 방식으로 회사 업무에 맞는 화면을 직접 설계할 수 있습니다.'}
 else{$('practiceNowTitle').textContent=`${idx+1}단계 · ${cfg.steps[idx][0]}`;$('practiceNowText').textContent=cfg.steps[idx][1];if($('practiceMsg').classList.contains('ok')){$('practiceMsg').className='practice-msg';$('practiceMsg').textContent='현재 단계를 직접 진행해 보세요. 막히면 [💡 방법 힌트]를 먼저 확인하세요.'}}
}
function practiceStart(key){
 const cfg=PRACTICES[key];if(!cfg)return;
 if(practiceState.key){if(!confirm(`현재 “${practiceCfg()?.title||'실습'}”을 끝내고 “${cfg.title}” 실습으로 바꿀까요?`))return}
 else{
  if(D.nodes.length&&!confirm(`“${cfg.title}” 실습을 시작하면 현재 설계 대신 빈 실습 화면이 열립니다.\n현재 설계는 자동으로 백업하며 나중에 복원할 수 있습니다.\n\n실습을 시작할까요?`))return;
  try{localStorage.setItem(PRACTICE_BACKUP_KEY,JSON.stringify({D:cloneUndo(D),view:cloneUndo(view),curName,sysName:$('sysName')?.value||''}))}catch(e){}
 }
 clearDeleteUndo();D={nodes:[],edges:[]};sel=null;view={x:40,y:40,k:1};practiceState={key};
 if($('sysName'))$('sysName').value='실습 - '+cfg.title;
 guideDlg.classList.remove('on');$('practicePanel').classList.add('on');renderPanel();render();
 $('practiceMsg').className='practice-msg';$('practiceMsg').textContent='1단계부터 직접 만들어 보세요. 막히면 [💡 방법 힌트] → [▶ 다음 한 단계 완성] 순서로 사용하세요.';
 $('stat').textContent=`🧩 실습 중 — ${cfg.title} · 왼쪽 아래 실습 도우미를 따라 만들어 보세요.`;practiceRefresh();
}
function practiceHint(){const cfg=practiceCfg();if(!cfg)return;const r=practiceResults(),i=r.findIndex(x=>!x);const msg=$('practiceMsg');msg.className='practice-msg warn';msg.textContent=i<0?'이미 모든 단계를 완료했습니다.':`💡 ${cfg.steps[i][3]}`}
function practiceCheckNow(){const cfg=practiceCfg();if(!cfg)return;const r=practiceResults(),done=r.filter(Boolean).length,i=r.findIndex(x=>!x),msg=$('practiceMsg');if(i<0){msg.className='practice-msg ok';msg.textContent='✓ 모든 단계가 완료되었습니다. 설계검증과 시스템 생성도 시험해 보세요.'}else{msg.className='practice-msg warn';msg.textContent=`현재 ${done}/${r.length}단계 완료. 다음은 “${cfg.steps[i][0]}”입니다.`}practiceRefresh()}
function practiceReset(){const cfg=practiceCfg();if(!cfg)return;if(D.nodes.length&&!confirm(`“${cfg.title}” 실습 내용을 모두 지우고 처음부터 다시 할까요?`))return;clearDeleteUndo();D={nodes:[],edges:[]};sel=null;view={x:40,y:40,k:1};renderPanel();render();$('practiceMsg').className='practice-msg';$('practiceMsg').textContent='처음부터 다시 시작합니다. 직접 해보고 막힐 때만 다음 한 단계 완성을 사용하세요.'}
function practiceSpecNode(name){const cfg=practiceCfg();return cfg?.nodes?.find(x=>pNorm(x.name)===pNorm(name))||null}
function practiceEnsureNode(name){let n=practiceNodeByName(name);if(n)return n;const sp=practiceSpecNode(name);if(!sp)return null;const cnt=D.nodes.filter(x=>x.type===sp.type).length,base={module:40,section:270,screen:500,table:780}[sp.type]??40;let meta=cloneUndo(sp.meta||{});if(sp.type==='table'){meta={...meta,cols:cloneUndo(meta.cols||[])}}n=addNode(sp.type,sp.name,meta,base,50+cnt*90);return n}
function practiceEnsureEdge(a,b,k){const A=practiceEnsureNode(a),B=practiceEnsureNode(b);if(!A||!B)return false;if(!D.edges.some(e=>e.from===A.id&&e.to===B.id&&e.kind===k))addEdge(A.id,B.id,k,'',{quiet:true,noSelect:true});return true}
function practiceEnsureCols(table){const cfg=practiceCfg(),t=practiceEnsureNode(table);if(!t||t.type!=='table')return false;t.meta.cols=t.meta.cols||[];for(const r of cfg?.columns?.[table]||[]){if(!t.meta.cols.some(c=>pNorm(c.name)===pNorm(r.name)||pNorm(c.label)===pNorm(r.label)))t.meta.cols.push(cloneUndo(r))}return true}
function practiceCompleteCheck(ch){
 if(!ch)return false;
 if(ch.node){practiceEnsureNode(ch.node);return true}
 if(ch.all){for(const x of ch.all)practiceCompleteCheck(x);return true}
 if(ch.cols){practiceEnsureCols(ch.cols);return true}
 if(ch.edge){practiceEnsureEdge(...ch.edge);return true}
 if(ch.edges){for(const e of ch.edges)practiceEnsureEdge(...e);return true}
 if(ch.autoCols){const t=practiceEnsureNode(ch.autoCols.table);if(!t)return false;addRecommendedBasicColumns(t);return true}
 if(ch.keyReq){const t=practiceEnsureNode(ch.keyReq);if(!t)return false;autoKeyRequired(t);return true}
 if(ch.autoScreen||ch.autoScreenDetail){const name=ch.autoScreen||ch.autoScreenDetail,s=practiceEnsureNode(name);if(!s)return false;autoCompleteScreen(s,{quiet:true});return true}
 if(ch.autoSection||ch.autoSectionDetail){const sp=ch.autoSection||ch.autoSectionDetail,sec=practiceEnsureNode(sp.section);if(!sec)return false;const r=sectionScreenRecommendations(sec),want=r.profile.items.filter(x=>(sp.screens||[]).some(n=>pNorm(n)===pNorm(x.name))).map(x=>x.key);createRecommendedScreens(sec,want);return true}
 return false;
}
function practiceCompleteNextStep(){
 const cfg=practiceCfg();if(!cfg)return;const r=practiceResults(),i=r.findIndex(x=>!x),msg=$('practiceMsg');
 if(i<0){msg.className='practice-msg ok';msg.textContent='✓ 이미 모든 단계를 완료했습니다.';return}
 const step=cfg.steps[i];practiceCompleteCheck(step[2]);save();renderPanel();render();autoLayout();fitAll();practiceRefresh();
 const after=practiceResults();if(after[i]){msg.className='practice-msg ok';msg.textContent=`▶ ${i+1}단계 “${step[0]}”만 완성했습니다. 자동으로 전체 정답을 만들지 않습니다. 다음 단계는 직접 해보세요.`}else{msg.className='practice-msg warn';msg.textContent=`이 단계는 화면에서 직접 확인이 더 필요합니다. 💡 ${step[3]||step[1]}`}
}
function practiceEndKeep(){if(!practiceState.key){$('practicePanel')?.classList.remove('on');return}if(!confirm('실습 도우미를 닫을까요? 현재 실습 설계는 그대로 남습니다.'))return;practiceState={key:null};$('practicePanel').classList.remove('on');$('stat').textContent='실습 도우미를 닫았습니다. 현재 설계는 그대로 사용할 수 있습니다.'}
function practiceRestoreBackup(){
 let b=null;try{b=JSON.parse(localStorage.getItem(PRACTICE_BACKUP_KEY)||'null')}catch(e){}
 if(!b||!b.D){alert('복원할 실습 전 설계가 없습니다.');return}
 if(!confirm('실습 전 설계로 돌아갈까요? 현재 실습 내용은 화면에서 사라집니다.'))return;
 clearDeleteUndo();D=b.D||{nodes:[],edges:[]};view=b.view||{x:40,y:40,k:1};curName=b.curName||'';if($('sysName')&&b.sysName)$('sysName').value=b.sysName;practiceState={key:null};$('practicePanel')?.classList.remove('on');try{localStorage.removeItem(PRACTICE_BACKUP_KEY)}catch(e){}updateTitle();select(null);render();$('stat').textContent=`↩ 실습 전 설계를 복원했습니다 — 블록 ${D.nodes.length} · 연결 ${D.edges.length}`;
}
document.addEventListener('click',e=>{if(!e.target.closest('.dd'))document.querySelectorAll('.dd.open').forEach(x=>x.classList.remove('open'))});
document.addEventListener('click',e=>{if(e.target.closest('.dd .menu button'))document.querySelectorAll('.dd.open').forEach(x=>x.classList.remove('open'))});
const svg=$('svg');let drag=null,lastHit={id:null,t:0};
const toWorld=e=>{const r=svg.getBoundingClientRect();return{x:(e.clientX-r.left-view.x)/view.k,y:(e.clientY-r.top-view.y)/view.k}};
svg.addEventListener('pointerdown',e=>{
 const port=e.target.closest('.port'),node=e.target.closest('.node'),edge=e.target.closest('.edge');
 svg.setPointerCapture(e.pointerId);
 if(port&&port.dataset.port==='out'){drag={type:'link',from:node.dataset.id};return}
 if(node){const n=N(node.dataset.id),w=toWorld(e);
  /* 더블클릭 판정을 직접 한다 — 선택할 때마다 블록을 다시 그리기 때문에 브라우저 dblclick 이 안 잡힌다 */
  const now=Date.now();
  if(lastHit.id===n.id&&now-lastHit.t<450){
   lastHit={id:null,t:0};drag=null;try{svg.releasePointerCapture(e.pointerId)}catch(_){}
   select({node:n.id});
   if(['module','section','screen'].includes(n.type))previewNode(n.id);
   else{const inp=$('f_name');if(inp){inp.focus();inp.select()}}
   return}
  lastHit={id:n.id,t:now};
  drag={type:'node',id:n.id,ox:w.x-n.x,oy:w.y-n.y,moved:false};select({node:n.id});return}
 if(edge){select({edge:edge.dataset.id});return}
 drag={type:'pan',sx:e.clientX,sy:e.clientY,vx:view.x,vy:view.y};svg.classList.add('panning');select(null);
});
svg.addEventListener('pointermove',e=>{
 if(!drag)return;
 if(drag.type==='pan'){view.x=drag.vx+e.clientX-drag.sx;view.y=drag.vy+e.clientY-drag.sy;$('world').setAttribute('transform',`translate(${view.x},${view.y}) scale(${view.k})`);return}
 if(drag.type==='node'){const n=N(drag.id),w=toWorld(e);n.x=Math.round((w.x-drag.ox)/8)*8;n.y=Math.round((w.y-drag.oy)/8)*8;drag.moved=true;render();return}
 if(drag.type==='link'){const a=N(drag.from),p=ports(a).out,w=toWorld(e);$('temp').setAttribute('d',`M${p.x} ${p.y} L${w.x} ${w.y}`)}
});
svg.addEventListener('pointerup',e=>{
 if(drag&&drag.type==='link'){$('temp').setAttribute('d','');
  const el=document.elementFromPoint(e.clientX,e.clientY),node=el&&el.closest('.node');
  if(node&&node.dataset.id!==drag.from)addEdge(drag.from,node.dataset.id)}
 svg.classList.remove('panning');drag=null;save();
});
svg.addEventListener('wheel',e=>{e.preventDefault();const r=svg.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,k=e.deltaY<0?1.1:1/1.1;
 view.x=mx-(mx-view.x)*k;view.y=my-(my-view.y)*k;view.k*=k;render()},{passive:false});
svg.addEventListener('dblclick',e=>{const node=e.target.closest('.node');if(!node)return;
 const n=N(node.dataset.id);if(n&&['module','section','screen'].includes(n.type))previewNode(n.id);
 else{const inp=$('f_name');if(inp){inp.focus();inp.select()}}});
document.addEventListener('keydown',e=>{const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'&&!typing){e.preventDefault();undoDelete();return}if((e.key==='Delete'||e.key==='Backspace')&&sel&&!typing){e.preventDefault();deleteSel()}});
function zoomBy(k){const r=svg.getBoundingClientRect(),mx=r.width/2,my=r.height/2;view.x=mx-(mx-view.x)*k;view.y=my-(my-view.y)*k;view.k*=k;render()}
function fitAll(){if(!D.nodes.length)return;const r=svg.getBoundingClientRect();if(!r.width||!r.height)return;
 let x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;for(const n of D.nodes){const s=size(n);x1=Math.min(x1,n.x);y1=Math.min(y1,n.y);x2=Math.max(x2,n.x+s.w);y2=Math.max(y2,n.y+s.h)}
 const k=Math.min(1.4,(r.width-60)/(x2-x1),(r.height-60)/(y2-y1));view.k=k;view.x=(r.width-(x2-x1)*k)/2-x1*k;view.y=(r.height-(y2-y1)*k)/2-y1*k;render()}

/* ═══════════════ 편집 ═══════════════ */
/* 연결 규칙을 한 곳에서 관리한다. 수동 연결·모듈 삽입·문답 생성이 같은 규칙을 사용한다. */
function inferredKind(a,b){
 if(!a||!b)return null;
 if(a.type==='module'&&(b.type==='section'||b.type==='screen'))return 'contains';
 if(a.type==='section'&&b.type==='screen')return 'contains';
 if(a.type==='screen'&&b.type==='table')return 'uses';
 if(a.type==='screen'&&b.type==='screen')return 'flow';
 if(a.type==='table'&&b.type==='table')return 'ref';
 return null;
}
/* "선택한 블록 아래에 새 블록 추가" 때는 계층/사용 관계만 자동으로 만든다.
   화면→화면 흐름, 테이블→테이블 FK는 의미 확인이 필요하므로 자동 생성하지 않는다. */
function contextKind(a,b){
 const k=inferredKind(a,b);return(k==='contains'||k==='uses')?k:null;
}
function hasEdge(from,to,kind){return D.edges.some(e=>e.from===from&&e.to===to&&(!kind||e.kind===kind))}
/* ═══ 부모 자동판단 엔진 ═══
   대분류→중분류→화면 계층은 가능한 한 자동 연결한다.
   1) 현재 선택/그 선택의 상위 경로  2) 최근 작업 경로  3) 이름 유사성  4) 화면 거리 순으로 점수를 매긴다.
   후보 하나 또는 점수 차가 충분하면 자동 연결, 애매하면 사용자에게 후보를 확인받는다. */
const LAST_CTX={module:null,section:null,screen:null};
let PARENT_PICK=null,REPAIR_QUEUE=[],REPAIR_COUNT=0;
function containsParents(id){return D.edges.filter(e=>e.kind==='contains'&&e.to===id).map(e=>N(e.from)).filter(Boolean)}
function screenForTable(id){return D.edges.filter(e=>e.kind==='uses'&&e.to===id).map(e=>N(e.from)).filter(n=>n&&n.type==='screen')}
function rememberContext(n){
 if(!n)return;
 if(n.type==='module')LAST_CTX.module=n.id;
 if(n.type==='section'){
  LAST_CTX.section=n.id;const m=containsParents(n.id).find(x=>x.type==='module');if(m)LAST_CTX.module=m.id;
 }
 if(n.type==='screen'){
  LAST_CTX.screen=n.id;const p=containsParents(n.id)[0];
  if(p?.type==='section'){LAST_CTX.section=p.id;const m=containsParents(p.id).find(x=>x.type==='module');if(m)LAST_CTX.module=m.id}
  else if(p?.type==='module')LAST_CTX.module=p.id;
 }
 if(n.type==='table'){
  const sc=screenForTable(n.id);if(sc.length===1)rememberContext(sc[0]);
 }
}
function parentTypesFor(type){return type==='section'?['module']:type==='screen'?['section','module']:type==='table'?['screen']:[]}
function contextParentsFor(childType,contextNode){
 const out=[];const put=n=>{if(n&&!out.some(x=>x.id===n.id)&&parentTypesFor(childType).includes(n.type))out.push(n)};
 if(!contextNode)return out;
 put(contextNode);
 if(childType==='section'){
  if(contextNode.type==='section')containsParents(contextNode.id).forEach(put);
  if(contextNode.type==='screen'){
   const p=containsParents(contextNode.id)[0];put(p);if(p?.type==='section')containsParents(p.id).forEach(put);
  }
  if(contextNode.type==='table'){
   const sc=screenForTable(contextNode.id);if(sc.length===1){const p=containsParents(sc[0].id)[0];put(p);if(p?.type==='section')containsParents(p.id).forEach(put)}
  }
 }else if(childType==='screen'){
  if(contextNode.type==='screen')containsParents(contextNode.id).forEach(put);
  if(contextNode.type==='table'){
   const sc=screenForTable(contextNode.id);if(sc.length===1)containsParents(sc[0].id).forEach(put);
  }
 }else if(childType==='table'){
  if(contextNode.type==='table')screenForTable(contextNode.id).forEach(put);
 }
 return out;
}
function textAffinity(a,b){
 a=String(a||'').toLowerCase().replace(/관리|현황|등록|조회|화면|메뉴/g,' ').trim();
 b=String(b||'').toLowerCase().replace(/관리|현황|등록|조회|화면|메뉴/g,' ').trim();
 if(!a||!b)return 0;
 let pre=0;while(pre<Math.min(a.length,b.length)&&a[pre]===b[pre])pre++;
 const A=a.split(/[\s_\-./()·]+/).filter(x=>x.length>1),B=b.split(/[\s_\-./()·]+/).filter(x=>x.length>1);
 const same=A.filter(x=>B.some(y=>x===y||x.includes(y)||y.includes(x))).length;
 let sc=Math.min(18,pre*4)+Math.min(14,same*7);
 if(a.length>=2&&b.includes(a.slice(0,2))||b.length>=2&&a.includes(b.slice(0,2)))sc+=6;
 return Math.min(30,sc);
}
function rankParentCandidates(child,contextNode){
 const pts=parentTypesFor(child.type);if(!pts.length)return[];
 const ctx=contextParentsFor(child.type,contextNode||null),ctxIds=new Set(ctx.map(x=>x.id));
 const recent=new Set(pts.map(t=>LAST_CTX[t]).filter(Boolean));
 const hasSections=child.type==='screen'&&D.nodes.some(n=>n.type==='section');
 return D.nodes.filter(p=>p.id!==child.id&&pts.includes(p.type)).map(p=>{
  let score=0,reasons=[];
  if(ctxIds.has(p.id)){score+=120;reasons.push('현재 작업 위치')}
  if(recent.has(p.id)){score+=68;reasons.push('최근 작업 위치')}
  if(child.type==='screen'&&p.type==='section'){score+=hasSections?20:8;reasons.push('중분류 우선')}
  const aff=textAffinity(p.name,child.name);if(aff){score+=aff;reasons.push('이름 유사')}
  const dx=(child.x??0)-(p.x??0),dy=(child.y??0)-(p.y??0),dist=Math.hypot(dx,dy);
  const near=Math.max(0,28-Math.floor(dist/45));if(near){score+=near;reasons.push('가까운 위치')}
  if(dx>0){score+=8;reasons.push('왼쪽 상위블록')}
  return{node:p,score,reasons:[...new Set(reasons)]};
 }).sort((a,b)=>b.score-a.score||a.node.y-b.node.y||a.node.x-b.node.x);
}
function clearParentDecision(cands){
 if(!cands.length)return null;if(cands.length===1)return cands[0];
 const a=cands[0],b=cands[1];
 if(a.score>=105)return a;
 if(a.score>=72&&a.score-b.score>=28)return a;
 return null;
}
function existingParent(child){
 if(child.type==='section'||child.type==='screen')return D.edges.some(e=>e.kind==='contains'&&e.to===child.id);
 if(child.type==='table')return D.edges.some(e=>e.kind==='uses'&&e.to===child.id);
 return true;
}
function attachToParent(parent,children){
 let count=0,names=[];
 for(const child of children){if(!child||existingParent(child))continue;const k=contextKind(parent,child);if(!k)continue;
  if(!hasEdge(parent.id,child.id,k)){D.edges.push({id:uid(),from:parent.id,to:child.id,kind:k,label:''});count++;names.push(child.name)}}
 if(count)save();return{count,names};
}
function openParentChoice(children,cands,title,onDone){
 children=(Array.isArray(children)?children:[children]).filter(Boolean);if(!children.length||!cands.length){onDone?.(null);return}
 PARENT_PICK={childIds:children.map(x=>x.id),cands,onDone};
 $('parentTitle').textContent=title||'상위 분류 자동 연결';
 const ct=children[0],more=children.length>1?` 외 ${children.length-1}개`:'';
 $('parentGuide').innerHTML=`<b>${esc(ct.name)}${more}</b> 의 상위 분류가 여러 개 가능합니다. 가장 알맞은 위치를 선택하세요.`;
 $('parentList').innerHTML=cands.slice(0,10).map((c,i)=>`<label style="display:grid;grid-template-columns:22px 1fr auto;gap:8px;align-items:center;padding:10px;border:1px solid ${i===0?'#8bb4f4':'var(--line)'};border-radius:6px;background:${i===0?'#f7fbff':'#fff'};cursor:pointer">
   <input type="radio" name="parentCandidate" value="${esc(c.node.id)}" ${i===0?'checked':''}>
   <span><b>${esc(c.node.name)}</b> <small style="color:#8a94a6">${TYPE[c.node.type].name}</small><br><small style="color:#8a94a6">${esc(c.reasons.join(' · ')||'후보')}</small></span>
   <span style="font-size:11px;color:#8a94a6">추천 ${c.score}</span></label>`).join('');
 $('parentMsg').textContent='';parentDlg.classList.add('on');
}
function parentPickFinish(parent){
 const st=PARENT_PICK;PARENT_PICK=null;parentDlg.classList.remove('on');if(!st)return;
 let r={count:0,names:[]};if(parent){const kids=st.childIds.map(N).filter(Boolean);r=attachToParent(parent,kids);if(r.count)$('stat').textContent=`${parent.name} → ${r.names.join(', ')} 자동 연결`}
 st.onDone?.(parent,r);
}
function parentPickApply(){if(!PARENT_PICK)return;const id=document.querySelector('input[name="parentCandidate"]:checked')?.value;parentPickFinish(N(id))}
function parentPickNone(){parentPickFinish(null)}
function parentPickCancel(){parentPickFinish(null)}
function autoParentNode(child,opts){
 opts=opts||{};if(!child||existingParent(child)||!parentTypesFor(child.type).length)return{status:'none',cands:[]};
 const cands=rankParentCandidates(child,opts.contextNode||null);if(!cands.length)return{status:'none',cands};
 const best=clearParentDecision(cands);
 if(best){const r=attachToParent(best.node,[child]);return{status:r.count?'attached':'none',parent:best.node,cands,r}}
 if(opts.dialog!==false){openParentChoice([child],cands,opts.title||'상위 분류 자동 연결',opts.onDone);return{status:'pending',cands}}
 return{status:'ambiguous',cands};
}
function addNode(type,name,meta,x,y){
 const manual=arguments.length===1,contextNode=manual&&sel&&sel.node?N(sel.node):null;
 const r=svg.getBoundingClientRect();
 const n={id:uid(),type,name:name||TYPE[type].name+' '+(D.nodes.filter(z=>z.type===type).length+1),
  x:x??Math.round(((r.width/2-view.x)/view.k-60+Math.random()*80)/8)*8,y:y??Math.round(((r.height/2-view.y)/view.k-30+Math.random()*80)/8)*8,
  meta:meta||(type==='table'?{cols:[{name:'code',label:'코드',type:'text',pk:true,req:true},{name:'name',label:'명칭',type:'text'}]}
   :type==='screen'?{file:'',kind:'input'}
   :{icon:'▣',desc:''})};
 D.nodes.push(n);
 let ar={status:'none'};
 if(manual)ar=autoParentNode(n,{contextNode,dialog:true,title:type==='section'?'중분류의 대분류 선택':type==='screen'?'화면의 중분류 선택':type==='table'?'테이블의 사용 화면 선택':'상위 분류 자동 연결'});
 select({node:n.id});
 if(ar.status==='attached'&&ar.parent)$('stat').textContent=`블록 추가 · ${ar.parent.name} → ${n.name} 자동 연결`;
 else if(ar.status==='pending')$('stat').textContent=`블록 추가 · '${n.name}' 상위 분류 후보 확인 필요`;
 return n;
}
function addEdge(from,to,kind,label,opts){
 opts=opts||{};const a=N(from),b=N(to);if(!a||!b)return null;
 const expected=inferredKind(a,b);kind=kind||expected;
 if(!expected||kind!==expected){
  if(!opts.quiet)alert(`'${a.name}' (${TYPE[a.type]?.name||a.type}) → '${b.name}' (${TYPE[b.type]?.name||b.type}) 연결은 만들 수 없습니다.\n허용 관계: 대메뉴→중분류/화면, 중분류→화면, 화면→테이블/화면, 테이블→테이블`);
  return null;
 }
 const same=D.edges.find(e=>e.from===from&&e.to===to&&e.kind===kind);
 if(same){if(!opts.noSelect)select({edge:same.id});return same}
 const e={id:uid(),from,to,kind,label:label||''};D.edges.push(e);if(!opts.noSelect)select({edge:e.id});else save();return e;
}
function deleteSel(){
 if(!sel)return;
 let msg='';
 if(sel.node){
  const n=N(sel.node);if(!n)return;if(!confirm(`'${n.name}' 블록과 연결된 선을 모두 삭제할까요?\n\n삭제 후 상단 [↶ 되돌리기] 또는 Ctrl+Z 로 복구할 수 있습니다.`))return;
  const edges=D.edges.filter(e=>e.from===n.id||e.to===n.id);
  rememberDelete({kind:'node',node:cloneUndo(n),edges:cloneUndo(edges),label:n.name});
  D.nodes=D.nodes.filter(x=>x.id!==n.id);D.edges=D.edges.filter(e=>e.from!==n.id&&e.to!==n.id);
  msg=`'${n.name}' 삭제됨 · ↶ 되돌리기 가능`;
 }else{
  const e=D.edges.find(x=>x.id===sel.edge);if(!e)return;const a=N(e.from),b=N(e.to);
  rememberDelete({kind:'edge',edge:cloneUndo(e),label:`${a?.name||''} → ${b?.name||''}`});
  D.edges=D.edges.filter(x=>x.id!==e.id);msg='연결 삭제됨 · ↶ 되돌리기 가능';
 }
 select(null);$('stat').textContent=msg;updateUndoUI();save();
}
function select(s){sel=s;if(s&&s.node)rememberContext(N(s.node));renderPanel();render()}
function renderPanel(){
 const P=$('panel'),T=$('pType');
 if(!sel){$('pTitle').textContent='선택 없음';T.style.display='none';P.innerHTML='<div class="empty">블록이나 선을 클릭하면 여기서 편집합니다.<br><br><b>대메뉴 → 중분류 → 화면</b> 을 "포함" 으로 잇고,<br>화면이 쓰는 <b>테이블</b>을 "사용" 으로 이으면<br>[▶ 시스템 생성] 이 전체를 만들어 줍니다.</div>';return}
 if(sel.edge){const e=D.edges.find(x=>x.id===sel.edge);const a=N(e.from),b=N(e.to);
  $('pTitle').textContent='연결';T.style.display='';T.textContent=KIND[e.kind];T.style.background={contains:'#6b7686',uses:'#3b82f6',ref:'#8b5cf6',flow:'#2fb27c'}[e.kind];
  P.innerHTML=`<div class="f"><label>연결</label><div style="font-weight:600">${esc(a.name)} <span style="color:#8a94a6">→</span> ${esc(b.name)}</div></div>
   <div class="f"><label>관계 종류</label><select id="e_kind">${Object.entries(KIND).map(([k,v])=>`<option value="${k}" ${e.kind===k?'selected':''}>${v}</option>`).join('')}</select></div>
   ${e.kind==='ref'?`<div class="f"><label>관계 형태</label><select id="e_card">
     <option value="" ${!e.card?'selected':''}>N : 1 — 코드·기준정보 참조</option>
     <option value="1N" ${e.card==='1N'?'selected':''}>1 : N — 명세(전표 라인). ${esc(N(e.from)?.name||'')} 가 ${esc(N(e.to)?.name||'')} 의 상세</option>
     </select><div style="color:#8a94a6;font-size:11.5px;margin-top:2px">1:N 으로 두면 부모 테이블을 쓰는 <b>등록 화면</b>이 "헤더 + 명세 그리드" 형태로 생성됩니다.</div></div>`:''}
   <div class="f"><label>선에 표시할 내용 (관계 설명)</label><textarea id="e_label" placeholder="예: 수주번호로 조회 / customer_name → vendors.vendor_name">${esc(e.label)}</textarea></div>
   <div class="acts"><button class="btn" onclick="flipEdge()">↔ 방향 바꾸기</button><button class="btn danger" onclick="deleteSel()">✕ 연결 삭제</button></div>`;
  $('e_kind').onchange=v=>{e.kind=v.target.value;if(e.kind!=='ref')delete e.card;render();renderPanel()};
  if($('e_card'))$('e_card').onchange=v=>{e.card=v.target.value||undefined;
   if(e.card==='1N'&&!e.label)e.label='1:N 명세';render();renderPanel()};$('e_label').oninput=v=>{e.label=v.target.value;render()};return}
 const n=N(sel.node),t=TYPE[n.type];
 $('pTitle').textContent=n.name;T.style.display='';T.textContent=t.name;T.style.background=t.color;
 let h=`<div class="f"><label>이름 ${n.type==='screen'?'(화면명 = 메뉴명 = 권한키)':n.type==='table'?'(DB 테이블명, 영문)':''}</label><input id="f_name" value="${esc(n.name)}"></div>`;
 if(n.type==='module'){h+=`<div class="row2"><div class="f"><label>아이콘</label><input id="f_icon" value="${esc(n.meta.icon||'')}" placeholder="▣"></div><div class="f"><label>설명 (대분류 홈)</label><input id="f_desc" value="${esc(n.meta.desc||'')}"></div></div>
   <div class="f"><label>대분류 홈 유형</label><select id="f_homeType">
    <option value="auto" ${(n.meta.homeType||'auto')==='auto'?'selected':''}>자동 — 현재 테마에 맞춤</option>
    <option value="cards" ${n.meta.homeType==='cards'?'selected':''}>카드형 — 중분류를 큰 카드로 표시</option>
    <option value="erp" ${n.meta.homeType==='erp'?'selected':''}>ERP형 — 조밀한 업무 메뉴판</option>
    <option value="dashboard" ${n.meta.homeType==='dashboard'?'selected':''}>현황형 — 주요 현황/대시보드 화면 우선</option>
   </select><div style="color:#8a94a6;font-size:11.5px">대분류를 클릭하면 이 형식의 업무영역 홈이 열립니다. 실제 업무 수치는 만들지 않고 설계된 메뉴·화면 구조만 자동 요약합니다.</div></div>
   <div class="acts" style="margin-bottom:2px"><button class="btn primary" onclick="previewNode('${n.id}')">▶ 대분류 홈 미리보기</button></div>`}
 if(n.type==='section'){h+=`<div class="f"><label>아이콘</label><input id="f_icon" value="${esc(n.meta.icon||'')}" placeholder="▣"></div>
   <div class="acts" style="margin-bottom:2px"><button class="btn primary" onclick="previewNode('${n.id}')">▶ 중분류 홈 미리보기</button></div>
   ${sectionAutoAssistantHtml(n)}`}
 if(n.type==='screen'){h+=`<div class="row2"><div class="f"><label>파일명</label><input id="f_file" value="${esc(n.meta.file||'')}" placeholder="order_input.html"></div>
   <div class="f"><label>화면 종류</label><select id="f_kind"><option value="input" ${n.meta.kind==='input'?'selected':''}>등록 (입력폼+목록)</option><option value="status" ${n.meta.kind==='status'?'selected':''}>현황 (조회+상세)</option><option value="check" ${n.meta.kind==='check'?'selected':''}>체크시트 (헤더+점검항목 OK/NG)</option><option value="board" ${n.meta.kind==='board'?'selected':''}>파이프라인 보드 (제번·부품×공정·업체·요청)</option><option value="perm" ${n.meta.kind==='perm'?'selected':''}>권한관리 (사용자+메뉴별 4권한 트리)</option><option value="paste" ${n.meta.kind==='paste'?'selected':''}>엑셀 붙여넣기 등록 (대량 품목)</option><option value="dash" ${n.meta.kind==='dash'?'selected':''}>대시보드 (KPI·알림·그룹별 상태표·자동갱신)</option><option value="other" ${n.meta.kind==='other'?'selected':''}>기타 (빈 화면)</option></select></div></div>
   <div class="acts" style="margin-top:-3px"><button class="btn primary" id="autoScreenComplete" title="테이블 연결부터 기본 칼럼·키/필수·칼럼명·파일명까지 한 번에 완성합니다">⚡ 화면 자동완성</button><button class="btn" id="autoFileName" title="중분류 → 화면 → 연결 테이블의 대표 라벨 순서로 영문 약자를 조합합니다">⚡ 자동파일명</button><span id="autoFileHint" style="font-size:11px;color:#8a94a6">자동완성: 테이블 → 기본 칼럼 → 키·필수 → 칼럼명 → 파일명</span></div>
   <div class="f"><label>화면 CSS 테마 (이 화면만)</label><select id="f_skin"><option value="">설계 전체 테마 따름 — ${esc(SKIN[skinId()].name)}</option>${Object.entries(SKIN).map(([k,v])=>`<option value="${k}" ${n.meta.skin===k?'selected':''}>${esc(v.name)}</option>`).join('')}</select></div>
   <div class="acts" style="margin-bottom:2px"><button class="btn primary" onclick="previewScreen()">▶ 화면 미리보기</button></div>
   <label class="ck" style="padding:4px 0 4px 25px"><input id="f_lock" type="checkbox" ${n.meta.locked?'checked':''}>이 화면은 직접 수정함 — 다시 생성해도 덮어쓰지 않기</label>
   <div class="f"><label>사용 테이블 (자동: "사용" 연결)</label><div style="color:#4a5568">${D.edges.filter(e=>e.from===n.id&&e.kind==='uses').map(e=>esc(N(e.to)?.name)).join(', ')||'<span style="color:#8a94a6">없음 — 오른쪽 ○ 를 테이블로 끌어 연결</span>'}</div></div>
   ${originPanelHtml(n)}`}
 if(n.type==='table'){const cols=n.meta.cols||(n.meta.cols=[]),pk0=cols.find(c=>c.pk)||cols[0],auto=autoNoConfig(n),al=alertConfig(n),ap=approvalConfig(n),dateCols=cols.filter(c=>c.type==='date'&&!c.formula);
  h+=`<div class="f"><label>컬럼 (🔑 = 기본키, ✱ = 필수, ƒx = 자동 계산)</label><div class="cols"><table><thead><tr><th>컬럼명</th><th>라벨</th><th>예시</th><th title="데이터 형식">형식</th><th title="계산식">ƒx</th><th>🔑</th><th>✱</th><th></th></tr></thead><tbody>
   ${cols.map((c,i)=>`<tr><td><input data-i="${i}" data-k="name" value="${esc(c.name)}"></td><td><input data-i="${i}" data-k="label" value="${esc(c.label||'')}"></td>
    <td><input data-i="${i}" data-k="sample" value="${esc(c.sample||'')}" placeholder="예시값" style="color:#2e7d5b" ${c.formula!==undefined||c.calc?'disabled title="계산값은 수식으로 자동 생성"':''}></td>
    <td><select data-i="${i}" data-k="type">${[['text','문자'],['num','숫자'],['date','날짜'],['bool','체크']].map(([v,l])=>`<option value="${v}" ${c.type===v?'selected':''}>${l}</option>`).join('')}</select></td>
    <td style="text-align:center"><input type="checkbox" data-calc-toggle="${i}" ${c.formula!==undefined||c.calc?'checked':''} title="계산식 사용"></td>
    <td><input type="checkbox" data-i="${i}" data-k="pk" ${c.pk?'checked':''} ${c.formula!==undefined||c.calc?'disabled':''}></td><td><input type="checkbox" data-i="${i}" data-k="req" ${c.req?'checked':''}></td>
    <td><button class="x" data-del="${i}">×</button></td></tr>
    ${(c.formula!==undefined||c.calc)?`<tr><td colspan="8" style="background:#f3f7fb;padding:5px 6px"><div style="display:grid;grid-template-columns:auto 1fr 52px 54px auto;gap:5px;align-items:center"><b style="color:#2f6fb5">ƒx</b><input data-i="${i}" data-k="formula" value="${esc(c.formula||'')}" placeholder="예: qty * unit_price  /  IF(plan_qty == 0, 0, result_qty / plan_qty * 100)" style="border:1px solid #b9cce2;background:#fff"><input data-i="${i}" data-k="unit" value="${esc(c.unit||'')}" placeholder="단위"><input data-i="${i}" data-k="decimals" type="number" min="0" max="8" value="${esc(c.decimals??'')}" placeholder="소수"><label class="ck" title="체크하면 계산 결과도 DB 컬럼에 저장"><input type="checkbox" data-i="${i}" data-k="calcStore" ${c.calcStore?'checked':''}>DB</label></div><div style="font-size:10.8px;color:#6b7686;margin-top:3px">사용: + − ×(*) ÷(/) %, 비교(>, &lt;, ==), IF(), ROUND(), MIN(), MAX(), ABS(), COALESCE(), TODAY(), DAYS(시작일,종료일)</div></td></tr>`:''}
    ${(FLOW_COL.test(c.name)||c.flow)?`<tr><td colspan="8" style="background:#f7f9fb;padding:2px 6px 5px"><span style="font-size:11px;color:#8a94a6">⇢ 상태흐름</span> <input data-i="${i}" data-k="flow" value="${esc(c.flow||'')}" placeholder="대기 > 승인 > 발주 > 입고완료 | 취소, 보류  (비우면 라벨 괄호 안 순서)" style="width:calc(100% - 70px);border:1px solid #dbe3ea;background:#fff">${parseFlow(c)?`<div style="font-size:11px;color:#2e7d5b;margin-top:2px">→ ${parseFlow(c).steps.join(' › ')}${parseFlow(c).ends.length?' · 종료: '+parseFlow(c).ends.join(', '):''}</div>`:''}</td></tr>`:''}`).join('')}</tbody></table></div>
   ${basicColumnAssistantHtml(n)}
   <div class="acts"><button class="btn" id="addCol">＋ 컬럼</button><button class="btn" id="addStd">＋ 기본 컬럼 (비고·수정일)</button><button class="btn" id="addCalcEx">ƒx 계산식 예제</button><button class="btn primary" id="autoColNames" title="중분류 → 화면 → 라벨의 영문 약자를 조합해 컬럼명을 자동으로 만듭니다">⚡ 자동칼럼명</button><button class="btn primary" id="autoKeyReq" title="라벨과 컬럼명을 보고 기본키(🔑)와 필수(✱) 항목을 자동으로 선택합니다. 자동선택 뒤에도 직접 수정할 수 있습니다.">⚡ 키·필수 자동선택</button><button class="btn" onclick="openPaste()">📋 항목 붙여넣기</button><button class="btn" onclick="sampleOne()">⇩ 실제 데이터 1건</button><span class="msg" id="smpMsg" style="font-size:11.5px;color:#8a94a6"></span></div>
   <div style="font-size:11px;color:#8a94a6;line-height:1.55">계산식은 같은 행의 <b>컬럼명</b>을 사용합니다. 예: <code>amount = qty * unit_price</code>, <code>defect_rate = IF(total_qty == 0, 0, defect_qty / total_qty * 100)</code>. 기본은 화면 계산이며, ƒx 행의 <b>DB</b>를 체크한 경우에만 계산값 컬럼을 DB에도 생성·저장합니다.</div></div>
   <section class="src" style="margin-top:2px"><h4>⚙ 운영 자동화</h4>
    <div class="acts"><button class="btn primary" id="addOpsEx">전자결재적용</button><button class="btn danger" id="removeOpsEx" title="전자결재용 표준 컬럼과 결재 흐름을 제거합니다">전자결재적용해제</button><span style="font-size:11.5px;color:#8a94a6">작성→검토→확인→승인 전자결재와 자동번호·기한알림을 적용합니다. 해제하면 이 버튼으로 추가된 내용만 삭제·원상복구합니다.</span></div>
    <div style="display:grid;gap:7px">
     <div style="border-top:1px solid #e5e9ee;padding-top:7px"><label class="ck"><input id="f_auto_enable" type="checkbox" ${auto.enabled?'checked':''} ${pk0?.type!=='text'?'disabled':''}><b>자동번호</b> — 기본키가 비어 있으면 자동 채번</label>
      <div class="row3" style="margin-top:5px"><div class="f"><label>접두어</label><input id="f_auto_prefix" value="${esc(auto.prefix)}" placeholder="PO"></div><div class="f"><label>날짜형식</label><select id="f_auto_date"><option value="NONE" ${auto.date==='NONE'?'selected':''}>없음</option><option value="YYMM" ${auto.date==='YYMM'?'selected':''}>YYMM</option><option value="YYMMDD" ${auto.date==='YYMMDD'?'selected':''}>YYMMDD</option><option value="YYYYMMDD" ${auto.date==='YYYYMMDD'?'selected':''}>YYYYMMDD</option><option value="YYYY" ${auto.date==='YYYY'?'selected':''}>YYYY</option></select></div><div class="f"><label>일련번호 자리</label><input id="f_auto_digits" type="number" min="1" max="8" value="${auto.digits}"></div></div>
      <div style="font-size:11px;color:#6b7686;margin-top:3px">예: <b>${esc(autoNoPreview(n))}</b>${pk0?.type!=='text'?' · 자동번호는 text 기본키에서 사용합니다.':''}</div></div>
     <div style="border-top:1px solid #e5e9ee;padding-top:7px"><label class="ck"><input id="f_alert_enable" type="checkbox" ${al.enabled?'checked':''}><b>기한 알림</b> — 등록/조회/대시보드에서 임박·초과 표시</label>
      <div class="row2" style="margin-top:5px"><div class="f"><label>기준 날짜 컬럼</label><select id="f_alert_date"><option value="">선택 안 함</option>${dateCols.map(c=>`<option value="${esc(c.name)}" ${al.dateCol===c.name?'selected':''}>${esc(c.label||c.name)} (${esc(c.name)})</option>`).join('')}</select></div><div class="f"><label>몇 일 전부터 알림</label><input id="f_alert_days" type="number" min="0" max="365" value="${al.days}"></div></div></div>
     <div style="border-top:1px solid #e5e9ee;padding-top:7px"><label class="ck"><input id="f_appr_enable" type="checkbox" ${ap.enabled?'checked':''}><b>결재 담당자 지정</b> — <code>users.user_key</code> 기준으로 작성 · 검토 · 확인 · 승인자를 지정</label>
      <div class="row2" style="margin-top:5px">${ap.roles.map(r=>`<div class="f"><label>${esc(r.step)}자 사용자키</label><input data-appr="${r.key}" value="${esc(r.assignee||'')}" placeholder="예: U0001 · 비우면 사용자정보에서 선택"></div>`).join('')}</div>
      <div class="row2" style="margin-top:5px"><div class="f"><label>결재선 템플릿 코드</label><input id="f_appr_template" value="${esc(ap.routeTemplate||'')}" placeholder="예: STD_APPROVAL"></div><div class="f"><label>기준정보</label><button class="btn" id="addApprMasters" type="button">👥 사용자·권한관리 기준정보 추가</button></div></div>
      <label class="ck" style="margin-top:5px"><input id="f_appr_lock" type="checkbox" ${ap.lock?'checked':''}>설계에서 지정/템플릿으로 지정한 담당자를 생성 화면에서 변경하지 못하게 고정</label>
      <div style="font-size:11px;color:#6b7686;margin-top:3px">생성 화면의 결재자 선택은 <b>users</b>의 활성 사용자에서 가져옵니다. 검토·확인·승인은 사용자정보의 <code>can_review / can_confirm / can_approve</code> 권한으로 필터링합니다. 템플릿 코드를 지정하면 <b>approval_route_templates</b>의 결재선을 자동 적용합니다.</div></div>
    </div>
   </section>
   <div class="row2"><div class="f"><label>Supabase 주소 (프로젝트 ref 또는 URL)</label><input id="f_host" value="${esc(n.meta.host||'')}" placeholder="abcd1234 또는 https://abcd1234.supabase.co"></div>
    <div class="f"><label>anon / publishable 키</label><input id="f_apikey" value="${esc(n.meta.apikey||'')}" placeholder="sb_publishable_..."></div></div>`}
 const outs=D.edges.filter(e=>e.from===n.id),ins=D.edges.filter(e=>e.to===n.id);
 h+=`<div class="f"><label>연결 (${outs.length+ins.length})</label><div class="links">${outs.map(e=>`<button onclick="select({edge:'${e.id}'})"><b>→ ${esc(N(e.to)?.name)}</b><small>${KIND[e.kind]}${e.label?' · '+esc(e.label):''}</small></button>`).join('')}
  ${ins.map(e=>`<button onclick="select({edge:'${e.id}'})"><b>← ${esc(N(e.from)?.name)}</b><small>${KIND[e.kind]}${e.label?' · '+esc(e.label):''}</small></button>`).join('')}${outs.length+ins.length?'':'<span style="color:#8a94a6;font-size:12px">없음</span>'}</div></div>`;
 h+=`<div class="acts">${['module','section','screen'].includes(n.type)?`<button class="btn" onclick="wizardFrom('${n.id}')">❓ 문답으로 채우기</button>`:''}${['module','section','screen'].includes(n.type)?`<button class="btn" onclick="saveNodeAsModule('${n.id}')" title="이 블록과 딸린 화면·사용 테이블(FK 포함)을 한 모듈로 저장">📦 모듈로 저장 (화면+DB)</button>`:''}<button class="btn" onclick="cloneNode()">⧉ 복제</button><button class="btn danger" onclick="deleteSel()">✕ 블록 삭제</button></div>`;
 P.innerHTML=h;
 $('f_name').oninput=e=>{n.name=e.target.value;$('pTitle').textContent=n.name;render()};
 if($('f_icon'))$('f_icon').oninput=e=>{n.meta.icon=e.target.value;render()};
 if($('f_desc'))$('f_desc').oninput=e=>{n.meta.desc=e.target.value;render()};
 if($('f_homeType'))$('f_homeType').onchange=e=>{const v=e.target.value;if(v&&v!=='auto')n.meta.homeType=v;else delete n.meta.homeType;save();render()};
 if($('f_file'))$('f_file').oninput=e=>{n.meta.file=e.target.value.trim();render()};
 if($('autoScreenComplete'))$('autoScreenComplete').onclick=()=>{autoCompleteScreen(n);renderPanel();render()};
 if($('autoFileName'))$('autoFileName').onclick=()=>{autoScreenFileName(n);renderPanel();render()};
 if($('f_kind'))$('f_kind').onchange=e=>{n.meta.kind=e.target.value;render()};
 if($('f_repo'))$('f_repo').onchange=e=>{const v=e.target.value;if(v)n.meta.repo=v;else delete n.meta.repo;if(!originUrl(n))delete n.meta.origin;save();render();renderPanel()};
 if($('f_src'))$('f_src').onchange=e=>{const v=e.target.value.trim();if(v)n.meta.src=v;else delete n.meta.src;if(!originUrl(n))delete n.meta.origin;save();render();renderPanel()};
 if($('f_origin'))$('f_origin').onchange=e=>{if(e.target.checked)n.meta.origin=true;else delete n.meta.origin;save();render();renderPanel()};
 if($('f_lock'))$('f_lock').onchange=e=>{n.meta.locked=e.target.checked;render()};
 if($('f_skin'))$('f_skin').onchange=e=>{const v=e.target.value;if(v)n.meta.skin=v;else delete n.meta.skin;save();
  if(pvDlg.classList.contains('on')&&pvNode===n)previewNode(n.id)};
 if(n.type==='section'){
  if($('secAutoAll'))$('secAutoAll').onclick=()=>P.querySelectorAll('[data-sec-auto]:not(:disabled)').forEach(x=>x.checked=true);
  if($('secAutoNone'))$('secAutoNone').onclick=()=>P.querySelectorAll('[data-sec-auto]:not(:disabled)').forEach(x=>x.checked=false);
  if($('autoCreateScreens'))$('autoCreateScreens').onclick=()=>{const keys=[...P.querySelectorAll('[data-sec-auto]:checked')].map(x=>x.dataset.secAuto);createRecommendedScreens(n,keys);renderPanel();render()};
 }
 if(n.type==='table'){
  P.querySelectorAll('.cols [data-k]').forEach(el=>{const ev=el.type==='checkbox'||el.tagName==='SELECT'?'change':'input';
   el.addEventListener(ev,()=>{const c=n.meta.cols[+el.dataset.i];let v=el.type==='checkbox'?el.checked:el.value.trim();if(el.dataset.k==='decimals')v=v===''?'':Math.max(0,Math.min(8,Number(v)||0));c[el.dataset.k]=v;render()})});
  P.querySelectorAll('[data-calc-toggle]').forEach(el=>el.onchange=()=>{const c=n.meta.cols[+el.dataset.calcToggle];if(el.checked){if(c.formula===undefined)c.formula='';c.calc=true;c.pk=false}else{delete c.formula;delete c.calc;delete c.unit;delete c.decimals;delete c.calcStore}renderPanel();render()});
  P.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{n.meta.cols.splice(+b.dataset.del,1);renderPanel();render()});
  $('addCol').onclick=()=>{n.meta.cols.push({name:'col'+(n.meta.cols.length+1),label:'',type:'text'});renderPanel();render();const last=P.querySelectorAll('.cols input[data-k=name]');last[last.length-1].focus()};
  if($('f_host'))$('f_host').oninput=e=>{n.meta.host=e.target.value.trim();render()};
  if($('f_apikey'))$('f_apikey').oninput=e=>{n.meta.apikey=e.target.value.trim()};
  $('addStd').onclick=()=>{for(const c of [{name:'remark',label:'비고',type:'text'},{name:'updated_at',label:'수정일',type:'date'}])if(!n.meta.cols.some(x=>x.name===c.name))n.meta.cols.push(c);renderPanel();render()};
  $('addCalcEx').onclick=()=>{addCalcExamples(n);renderPanel();render()};
  if($('autoBasicCols'))$('autoBasicCols').onclick=()=>{addRecommendedBasicColumns(n);renderPanel();render()};
  if($('addManualBasicCol'))$('addManualBasicCol').onclick=()=>{const v=$('manualBasicCol')?.value||'';addManualBasicColumn(n,v);renderPanel();render()};
  if($('manualBasicCol'))$('manualBasicCol').onchange=e=>updateManualBasicHint(n,e.target.value);
  $('autoColNames').onclick=()=>{autoColumnNames(n);renderPanel();render()};
  if($('autoKeyReq'))$('autoKeyReq').onclick=()=>{autoKeyRequired(n);renderPanel();render()};
  $('addOpsEx').onclick=()=>{addOperationsExamples(n);renderPanel();render()};
  if($('removeOpsEx'))$('removeOpsEx').onclick=()=>{removeOperationsExamples(n);renderPanel();render()};
  if($('f_auto_enable'))$('f_auto_enable').onchange=e=>{const a=n.meta.autoNo||(n.meta.autoNo={});a.enabled=e.target.checked;save();renderPanel()};
  if($('f_auto_prefix'))$('f_auto_prefix').oninput=e=>{const a=n.meta.autoNo||(n.meta.autoNo={});a.prefix=e.target.value.trim().toUpperCase();save()};
  if($('f_auto_date'))$('f_auto_date').onchange=e=>{const a=n.meta.autoNo||(n.meta.autoNo={});a.date=e.target.value;save();renderPanel()};
  if($('f_auto_digits'))$('f_auto_digits').onchange=e=>{const a=n.meta.autoNo||(n.meta.autoNo={});a.digits=Math.max(1,Math.min(8,Number(e.target.value)||3));save();renderPanel()};
  if($('f_alert_enable'))$('f_alert_enable').onchange=e=>{const a=n.meta.alert||(n.meta.alert={});a.enabled=e.target.checked;save();renderPanel()};
  if($('f_alert_date'))$('f_alert_date').onchange=e=>{const a=n.meta.alert||(n.meta.alert={});a.dateCol=e.target.value;save()};
  if($('f_alert_days'))$('f_alert_days').onchange=e=>{const a=n.meta.alert||(n.meta.alert={});a.days=Math.max(0,Math.min(365,Number(e.target.value)||0));save();renderPanel()};
  if($('f_appr_enable'))$('f_appr_enable').onchange=e=>{const a=n.meta.approval||(n.meta.approval={assignees:{}});a.enabled=e.target.checked;save();renderPanel()};
  if($('f_appr_lock'))$('f_appr_lock').onchange=e=>{const a=n.meta.approval||(n.meta.approval={assignees:{}});a.lock=e.target.checked;save()};
  if($('f_appr_template'))$('f_appr_template').oninput=e=>{const a=n.meta.approval||(n.meta.approval={assignees:{}});a.routeTemplate=e.target.value.trim().toUpperCase();save()};
  if($('addApprMasters'))$('addApprMasters').onclick=()=>addApprovalMasterPack();
  P.querySelectorAll('[data-appr]').forEach(el=>el.oninput=()=>{const a=n.meta.approval||(n.meta.approval={});a.assignees=a.assignees||{};a.assignees[el.dataset.appr]=el.value.trim();save()});
 }
}
function flipEdge(){const e=D.edges.find(x=>x.id===sel.edge);[e.from,e.to]=[e.to,e.from];render();renderPanel()}
function cloneNode(){const n=N(sel.node);const c=JSON.parse(JSON.stringify(n));c.id=uid();c.name=n.name+' 복사';c.x+=24;c.y+=24;D.nodes.push(c);select({node:c.id})}
