/* ═══════════════ Supabase 저장 ═══════════════ */
const SB_DEFAULT={url:'https://jgvikmakenpllwxwdugk.supabase.co',key:''};
const SB_LS='sysdesign.supabase';
const SB_SQL=`create table if not exists public.design_modules(
  name text primary key, data jsonb not null, updated_at timestamptz not null default now()
);
alter table public.design_modules enable row level security;
drop policy if exists anon_all on public.design_modules;
create policy anon_all on public.design_modules for all to anon, authenticated using(true) with check(true);

create table if not exists public.system_designs(
  name text primary key,
  data jsonb not null,
  node_count int, edge_count int,
  updated_at timestamptz not null default now()
);
alter table public.system_designs enable row level security;
drop policy if exists anon_all on public.system_designs;
create policy anon_all on public.system_designs for all to anon, authenticated using(true) with check(true);`;
let SB=(()=>{try{return{...SB_DEFAULT,...JSON.parse(localStorage.getItem(SB_LS)||'{}')}}catch(e){return{...SB_DEFAULT}}})();
let curName=(()=>{try{return localStorage.getItem('sysdesign.name')||''}catch(e){return ''}})();
const sbH=()=>({'apikey':SB.key,'Authorization':'Bearer '+SB.key,'Content-Type':'application/json'});
async function sb(path,opt={}){
 if(!SB.url||!SB.key){openSettings();throw new Error('Supabase URL/키를 먼저 설정하세요.')}
 const r=await fetch(SB.url.replace(/\/$/,'')+'/rest/v1/'+path,{...opt,headers:{...sbH(),...(opt.headers||{})}});
 const t=await r.text();
 if(!r.ok){let m=t;try{m=JSON.parse(t).message||t}catch(e){}
  if(r.status===404||/system_designs/.test(m)&&/not exist|schema cache/.test(m))m='system_designs 테이블이 없습니다. ⚙ 설정의 SQL 을 실행하세요.';
  if(r.status===401||r.status===403)m='키가 잘못됐거나 권한이 없습니다 (RLS). ⚙ 설정을 확인하세요.';
  throw new Error(m)}
 return t?JSON.parse(t):null;
}
function openSettings(){$('s_url').value=SB.url||'';$('s_key').value=SB.key||'';$('g_url').value=GENCFG.url||'';$('g_key').value=GENCFG.key||'';$('g_rep').value=GENCFG.rep||'';{const b=Object.assign({mm:true,esg:true,gi:true},GENCFG.bridge||{});$('g_br_mm').checked=b.mm;$('g_br_esg').checked=b.esg;$('g_br_gi').checked=b.gi}$('s_sql').value=SB_SQL;$('s_edge').value=EDGE_SRC;$('setMsg').textContent='';setDlg.classList.add('on')}
function saveSettings(){SB={url:$('s_url').value.trim(),key:$('s_key').value.trim()};try{localStorage.setItem(SB_LS,JSON.stringify(SB))}catch(e){}
 GENCFG={url:$('g_url').value.trim(),key:$('g_key').value.trim(),rep:$('g_rep').value,bridge:{mm:$('g_br_mm').checked,esg:$('g_br_esg').checked,gi:$('g_br_gi').checked}};try{localStorage.setItem(GENCFG_LS,JSON.stringify(GENCFG))}catch(e){}$('setMsg').textContent='저장됨';updateTitle()}
async function testConn(){saveSettings();$('setMsg').textContent='확인 중…';try{const r=await sb('system_designs?select=name&limit=1');$('setMsg').textContent='연결 성공 (설계 '+(r.length?'있음':'없음')+')'}catch(e){$('setMsg').textContent='실패: '+e.message}}
function copySql(){navigator.clipboard.writeText(SB_SQL).then(()=>$('setMsg').textContent='SQL 복사됨')}
function updateTitle(){document.title=(curName?curName+' — ':'')+'시스템 설계도';const b=document.querySelector('.brand small');if(b)b.textContent=curName?'☁ '+curName:'메뉴 · 화면 · DB 관계'}
async function cloudPut(name){
 await sb('system_designs?on_conflict=name',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
  body:JSON.stringify([{name,data:{...D,sysName:$('sysName').value,view},node_count:D.nodes.length,edge_count:D.edges.length,updated_at:new Date().toISOString()}])});
 curName=name;try{localStorage.setItem('sysdesign.name',name)}catch(e){}updateTitle();
 $('stat').textContent=`☁ '${name}' 저장됨 · ${new Date().toLocaleTimeString('ko-KR')}`;
}
/* 저장: 이름이 있으면 그 이름으로 바로, 처음이면 이름을 묻는다 */
async function cloudSave(){
 let name=curName;
 if(!name){name=prompt('설계 이름',$('sysName').value.trim()||'설계1');if(!name)return;name=name.trim()}
 try{await cloudPut(name)}catch(e){alert('저장 실패: '+e.message)}
}
/* 다른 이름으로: 새 이름을 묻고, 같은 이름이 이미 있으면 덮어쓸지 확인 */
async function cloudSaveAs(){
 let name=prompt('새 설계 이름',curName?curName+' 복사':($('sysName').value.trim()||'설계1'));if(!name)return;name=name.trim();
 if(name===curName)return cloudSave();
 try{
  const ex=await sb('system_designs?select=name&name=eq.'+encodeURIComponent(name));
  if(ex.length&&!confirm(`'${name}' 설계가 이미 있습니다. 덮어쓸까요?`))return;
  await cloudPut(name);
 }catch(e){alert('저장 실패: '+e.message)}
}
async function cloudOpen(){
 cloudDlg.classList.add('on');$('cloudList').innerHTML='<div class="empty">불러오는 중…</div>';$('cloudMsg').textContent='';
 try{
  const rs=await sb('system_designs?select=name,node_count,edge_count,updated_at&order=updated_at.desc');
  $('cloudList').innerHTML=rs.length?rs.map(r=>`<button class="${r.name===curName?'on':''}" data-n="${esc(r.name)}"><span><b>${esc(r.name)}</b> <small>블록 ${r.node_count??'-'} · 연결 ${r.edge_count??'-'}</small></span><small>${new Date(r.updated_at).toLocaleString('ko-KR')} &nbsp;<a href="#" data-del="${esc(r.name)}" style="color:#e05a4a">삭제</a></small></button>`).join('')
   :'<div class="empty">저장된 설계가 없습니다.<br>[☁ 저장] 으로 현재 설계를 올리세요.</div>';
  $('cloudList').querySelectorAll('button').forEach(b=>b.onclick=e=>{if(e.target.dataset.del)return;cloudLoad(b.dataset.n)});
  $('cloudList').querySelectorAll('[data-del]').forEach(a=>a.onclick=async e=>{e.preventDefault();e.stopPropagation();const n=a.dataset.del;if(!confirm(`'${n}' 설계를 삭제할까요?`))return;
   try{await sb('system_designs?name=eq.'+encodeURIComponent(n),{method:'DELETE'});cloudOpen()}catch(err){$('cloudMsg').textContent='삭제 실패: '+err.message}});
 }catch(e){$('cloudList').innerHTML='<div class="empty">'+esc(e.message)+'</div>'}
}
async function cloudLoad(name){
 try{const rs=await sb('system_designs?select=data&name=eq.'+encodeURIComponent(name));if(!rs.length)throw new Error('없는 설계입니다.');
  const d=rs[0].data;clearDeleteUndo();D={nodes:d.nodes||[],edges:d.edges||[]};if(d.sysName)$('sysName').value=d.sysName;if(d.view)view=d.view;
  curName=name;try{localStorage.setItem('sysdesign.name',name)}catch(e){}updateTitle();cloudDlg.classList.remove('on');select(null);fitAll();
 }catch(e){$('cloudMsg').textContent='불러오기 실패: '+e.message}
}
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();cloudSave()}});


/* ═══════════════ 웹 사이트 가져오기 (사이트맵 + 폼 → 블록/선) ═══════════════ */
const EDGE_SRC=`// supabase/functions/fetch-page/index.ts  — 설계도의 "사이트 가져오기" 중계 서버
// 배포: 대시보드 Edge Functions › New function › 이름 fetch-page › 아래 코드 붙여넣기 › "Verify JWT" 끄고 Deploy
//   (CLI: supabase functions deploy fetch-page --no-verify-jwt)
const CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'apikey, authorization, content-type','Access-Control-Allow-Methods':'GET, OPTIONS'};
Deno.serve(async (req)=>{
  if(req.method==='OPTIONS')return new Response('ok',{headers:CORS});
  const u=new URL(req.url).searchParams.get('url')||'';
  if(!/^https?:\\/\\//i.test(u))return new Response('url 파라미터가 필요합니다',{status:400,headers:CORS});
  if(!req.headers.get('apikey'))return new Response('apikey 필요',{status:401,headers:CORS});   // 설계도만 쓰게 최소 확인
  try{
    const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0 (system-designer crawler)','Accept':'text/html,*/*'},redirect:'follow',signal:AbortSignal.timeout(12000)});
    const ct=r.headers.get('content-type')||'';
    if(!/text\\/html|xml|text\\/plain/i.test(ct))return new Response('HTML 이 아닙니다: '+ct,{status:415,headers:CORS});
    const t=(await r.text()).slice(0,1500000);
    return new Response(JSON.stringify({url:r.url,status:r.status,html:t}),{headers:{...CORS,'Content-Type':'application/json'}});
  }catch(e){return new Response('가져오기 실패: '+(e&&e.message||e),{status:502,headers:CORS})}
});`;
function copyEdge(){navigator.clipboard.writeText(EDGE_SRC).then(()=>$('setMsg').textContent='Edge Function 코드 복사됨')}
let crawlStop=false;
function openCrawl(){crawlDlg.classList.add('on');$('c_log').textContent='';$('c_msg').textContent='';if(!$('c_url').value)$('c_url').value='https://'}
const clog=t=>{const l=$('c_log');l.textContent+=t+'\n';l.scrollTop=l.scrollHeight};


/* GitHub 저장소 주소를 넣으면 저장소 안의 화면(.html)을 모두 읽는다.
   로그인 페이지만 index.html 인 경우(나머지 화면이 별도 파일)에도 전체 구조가 잡힌다. */
function ghRepo(u){try{const x=new URL(u);if(!/^(www\.)?github\.com$/.test(x.host))return null;
 const seg=x.pathname.replace(/^\/|\/$/g,'').split('/');if(seg.length<2)return null;
 const [own,repo,...rest]=seg;let branch=null,file='';
 if(rest[0]==='blob'||rest[0]==='tree'||rest[0]==='raw'){branch=rest[1];file=rest.slice(2).join('/')}else file=rest.join('/');
 return{own,repo,branch,file}}catch(e){return null}}
async function ghFiles(r){
 for(const b of (r.branch?[r.branch]:['main','master'])){
  try{const res=await fetch(`https://api.github.com/repos/${r.own}/${r.repo}/git/trees/${b}?recursive=1`);
   if(!res.ok)continue;const j=await res.json();if(!j.tree)continue;
   const all=j.tree.filter(t=>t.type==='blob').map(t=>t.path);
   return{branch:b,html:all.filter(f=>/\.html?$/i.test(f)&&!/\/(node_modules|vendor)\//.test(f)),js:all.filter(f=>/\.js$/i.test(f))};
  }catch(e){}
 }
 return null;
}
/* github.com 주소를 실제로 읽을 수 있는 raw 주소로 바꾼다 (CORS 허용 · 중계 서버 없이 직접 읽힘)
   github.com/u/r/index.html · /blob/main/... · 저장소 주소만 → raw.githubusercontent.com/u/r/{main|master}/... */
function urlCandidates(u){
 const out=[u];
 try{
  const x=new URL(u);
  if(/^(www\.)?github\.com$/.test(x.host)){
   const seg=x.pathname.replace(/^\/|\/$/g,'').split('/');
   if(seg.length>=2){
    const [own,repo,...rest]=seg;let branch=null,path=rest;
    if(rest[0]==='blob'||rest[0]==='tree'||rest[0]==='raw'){branch=rest[1];path=rest.slice(2)}
    const file=(path.join('/')||'index.html');
    const bs=branch?[branch]:['main','master'];
    out.length=0;
    for(const b of bs)out.push(`https://raw.githubusercontent.com/${own}/${repo}/${b}/${file}`);
    out.push(`https://${own}.github.io/${repo}/${file}`);      /* Pages 로도 시도 */
   }
  }
 }catch(e){}
 return out;
}
const _pageCache=new Map();
async function fetchPage(url,mode){
 const ck=mode+'|'+url;
 if(_pageCache.has(ck))return _pageCache.get(ck);
 const pr=_fetchPage(url,mode);_pageCache.set(ck,pr);
 try{return await pr}catch(e){_pageCache.delete(ck);throw e}
}
async function _fetchPage(url,mode){
 const cands=urlCandidates(url);
 if(cands.length>1||cands[0]!==url){let last;for(const c of cands){try{return await fetchOne(c,mode)}catch(e){last=e}}throw last}
 return fetchOne(url,mode);
}
async function fetchOne(url,mode){
 if(mode==='auto'){                      /* 직접 → Edge → 공개 프록시 순서로 시도 */
  const order=['none'];
  if(SB.url&&SB.key)order.push('edge');
  order.push('allorigins');
  let last;
  for(const m of order){try{return await fetchOne(url,m)}catch(e){last=e}}
  throw new Error((last&&last.message||'')+' — 중계 서버를 바꾸거나 ⚙ 설정에서 Edge Function 을 배포하세요.');
 }
 if(mode==='edge'){
  if(!SB.url||!SB.key)throw new Error('⚙ 설정에서 Supabase URL/키를 먼저 넣으세요.');
  let r;
  try{r=await fetch(SB.url.replace(/\/$/,'')+'/functions/v1/fetch-page?url='+encodeURIComponent(url),{headers:{apikey:SB.key,Authorization:'Bearer '+SB.key}})}
  catch(e){throw new Error('Edge Function 에 연결하지 못했습니다 (배포되지 않았거나 이름이 fetch-page 가 아닙니다)')}
  const t=await r.text();if(!r.ok)throw new Error(r.status===404?'fetch-page 함수가 없습니다 (⚙ 설정의 코드를 배포하세요)':t.slice(0,160));
  const j=JSON.parse(t);return{url:j.url||url,html:j.html};
 }
 if(mode==='allorigins'){let r;
  try{r=await fetch('https://api.allorigins.win/raw?url='+encodeURIComponent(url))}catch(e){throw new Error('공개 프록시에 연결하지 못했습니다')}
  if(!r.ok)throw new Error('공개 프록시 '+r.status);return{url,html:await r.text()}}
 let r;
 try{r=await fetch(url)}catch(e){throw new Error('직접 연결 실패 (그 사이트가 CORS 를 막고 있습니다)')}
 if(!r.ok)throw new Error('HTTP '+r.status);
 return{url:r.url||url,html:await r.text()};
}
const normUrl=(href,base)=>{try{const u=new URL(href,base);u.hash='';if(!/^https?:$/.test(u.protocol))return null;return u.href.replace(/\/$/,'')}catch(e){return null}};
const pathLabel=u=>{try{const p=new URL(u).pathname.replace(/\/$/,'');return p?decodeURIComponent(p.split('/').pop()).replace(/\.(html?|php|aspx?|jsp)$/i,''):'홈'}catch(e){return u}};

/* ── 단일 파일 앱 분석 : 탭 → 화면, 인라인 스크립트 → 테이블 ──────────────
   index.html 한 장에 탭으로 여러 화면이 들어 있고 Supabase REST 를 직접 부르는 형태
   (예: rest/v1/테이블, .from('테이블'), MESDB.table('테이블')) 를 읽는다. */

/* 무엇을 읽었는지 한 줄로 알려 준다 — 안 잡히는 항목을 바로 알 수 있게 */
function diag(p){
 clog(`   탭/메뉴 ${p.tabs?.length||0} · 링크메뉴 ${p.menu.length} · 폼 ${p.forms.length} · 스크립트 ${Math.round((p.jsLen||0)/1024)}KB · 테이블 ${p.tables?.length||0} · 키 ${Object.keys(p.creds||{}).length}`);
 if((p.tables?.length||0)===0&&(p.ext||[]).length&&(p.jsLen||0)<2000)
  clog(`   ⚠ 외부 스크립트 ${p.ext.length}개(${p.ext.slice(0,3).join(', ')})를 읽지 못했습니다 — ① 주소에서 가져오기를 쓰면 함께 읽습니다.`);
 if((p.tabs?.length||0)===0)clog('   ⚠ 화면 전환 메뉴를 찾지 못했습니다 — 메뉴가 스크립트로 그려지면 브라우저에서 개발자도구 Elements 의 <html> 을 복사해 붙여넣으세요.');
}
function parseTabs(doc){
 const out=[],seen=new Set();
 const NAVCALL=/(?:show|open|go|nav|move|switch|set|load|render|route|select)\w*\(\s*['"`]([\w\-.]{2,30})['"`]/i;
 const push=(key,el,textHint)=>{
  key=String(key||'').replace(/^#/,'').trim();if(!key)return;
  if(/^(javascript|void|0|true|false)$/i.test(key))return;
  let text=(el.querySelector('.lg,.label,.txt')?.textContent||el.textContent||textHint||'').trim().replace(/\s+/g,' ').slice(0,30);
  text=text.replace(/^[^\w가-힣(]+/,'').replace(/[▾▼▽>]+$/,'').trim();if(!text)text=key;
  /* 드롭다운·하위 메뉴 안이면 그 상위 항목 이름을 그룹으로 */
  const box=el.parentElement&&el.parentElement.closest('.dropdown,.dropdown-menu,.submenu,.sub,.mm,.menu-list,ul ul,[role=menu]');
  let group='';
  if(box){const trig=box.previousElementSibling||box.parentElement;
   group=((trig&&(trig.querySelector('.lg,.label')?.textContent||trig.childNodes[0]?.textContent||trig.textContent))||'').replace(/[▾▼▽]/g,'').trim().replace(/\s+/g,' ').slice(0,20)}
  else{const par=el.parentElement&&el.parentElement.closest('[data-t],[data-tab],[role=tab],.tab,li');
   if(par&&par!==el&&par.querySelector('.dropdown,.submenu,.mm,ul'))group=(par.querySelector('.lg')?.textContent||par.childNodes[0]?.textContent||'').replace(/[▾▼▽]/g,'').trim().replace(/\s+/g,' ').slice(0,20)}
  if(group===text)group='';
  if(seen.has(key)){                      /* 같은 화면을 가리키는 항목이 둘이면 하위메뉴 쪽 이름을 쓴다 */
   const old=out.find(o=>o.key===key);
   if(old&&group&&!old.group){old.text=text;old.group=group}
   return}
  seen.add(key);out.push({key,text,group});
 };
 /* 1) 화면 전환에 쓰이는 data-* 속성을 자동으로 찾아낸다 (data-t · data-pg · data-page … 이름이 뭐든) */
 const cand=new Map();
 for(const el of doc.querySelectorAll('a[data-],button[data-],li[data-],div[data-],span[data-],a,button,li,div,span')){
  if(!el.attributes)continue;
  for(const at of el.attributes){
   if(!/^data-/.test(at.name)||!at.value||at.value.length>30)continue;
   if(/^data-(bs-|aria|role|toggle|dismiss|target$)/.test(at.name)&&at.name!=='data-target')continue;
   if(!cand.has(at.name))cand.set(at.name,new Map());
   const m=cand.get(at.name);if(!m.has(at.value))m.set(at.value,el);
  }
 }
 const attrs=[...cand.entries()].filter(([n,m])=>m.size>=2&&m.size<=40)
  .sort((a,b)=>(/^data-(t|tab|pg|page|view|screen|menu|nav|target)$/.test(b[0])?1:0)-(/^data-(t|tab|pg|page|view|screen|menu|nav|target)$/.test(a[0])?1:0)||b[1].size-a[1].size);
 const known=attrs.filter(([n])=>/^data-(t|tab|pg|page|view|screen|menu|nav|target|panel|sec|route)$/.test(n));
 for(const [,m] of (known.length?known:attrs.slice(0,1)))for(const [val,el] of m)push(val,el);
 for(const el of doc.querySelectorAll('[role=tab],[aria-controls]'))push(el.getAttribute('aria-controls')||el.textContent,el);
 /* 2) onclick 으로 화면을 바꾸는 메뉴/버튼 (showPage('x') · go('x') · openTab('x') …) */
 for(const el of doc.querySelectorAll('[onclick]')){
  const oc=el.getAttribute('onclick')||'';const m=oc.match(NAVCALL);
  if(!m)continue;
  const inNav=el.closest('nav,header,.nav,.menu,.gnb,.lnb,.tabs,.topbar,.navbar,[role=navigation],[role=menubar],[role=menu],.dropdown,.submenu');
  if(!inNav)continue;
  push(m[1],el);
 }
 /* 3) 해시 링크 메뉴 (#daily 등) */
 for(const a of doc.querySelectorAll('nav a[href^="#"],header a[href^="#"],.menu a[href^="#"],.gnb a[href^="#"],.navbar a[href^="#"],[role=menu] a[href^="#"]')){
  const h=a.getAttribute('href');if(h.length>1)push(h,a);
 }
 /* 4) 그래도 없으면 .page / [id^=p-] 같은 화면 컨테이너 */
 if(!out.length)for(const pg of doc.querySelectorAll('.page[id],.view[id],.screen[id],[id^="p-"],[id^="page-"],[id^="view-"]')){
  const key=pg.id.replace(/^(p|page|view)[-_]/,'');if(seen.has(key))continue;seen.add(key);
  out.push({key,text:(pg.querySelector('h1,h2,.doc-hd h1,.title')?.textContent||key).trim().replace(/\s+/g,' ').slice(0,30),group:''});
 }
 return out;
}

/* ── 컬럼 한글 항목명(라벨) 찾기 ───────────────────────────────────────
   ① 화면의 <label>항목명</label> + 입력칸 id/name
   ② 표 머리글(th)에 붙은 data-k / data-col
   ③ 스크립트의 열 정의 (['pn','품번',…] · {k:'pn',t:'품번'} · {pn:'품번'})
   ④ DB 컬럼과 화면 필드가 다른 이름이면 저장 코드({item_code:pn})로 이어 붙인다
   ⑤ 그래도 없으면 흔한 이름 사전 + 접미사 규칙 */
const DICT={ymd:'일자',work_date:'작업일',led_date:'일자',date:'일자',machine_code:'설비코드',machine_name:'설비명',mc:'설비',
 item_code:'품번',item_name:'품명',pn:'품번',proc:'공정',process:'공정',cust:'고객사',customer:'고객사',customer_name:'고객사',
 worker:'작업자',qty:'수량',good_qty:'양품수량',actual_qty:'실제수량',mes_qty:'MES수량',diff_qty:'차이수량',ng:'불량',defect_qty:'불량수량',
 shot_qty:'쇼트수',normal_shot:'정상쇼트',abnormal_shot:'불량쇼트',unit_per_qty:'수량/쇼트',spm:'SPM',work:'근무시간',stop:'정지시간',
 brk:'휴식시간',run:'가동시간',run_min:'가동(분)',stop_min:'정지(분)',planned_min:'계획정지(분)',stop_events:'정지건수',planned_events:'계획정지건수',
 mold_code:'금형코드',work_order_no:'작업지시번호',heat_no:'히트번호',heat_nos:'히트번호',receipt_no:'입고번호',lot:'LOT',lot_no:'LOT번호',
 start_time:'시작시간',end_time:'종료시간',closed_at:'마감일시',created_at:'등록일시',updated_at:'수정일시',reg_date:'등록일',
 reason:'사유',memo:'메모',note:'비고',remark:'비고',kind:'구분',party:'거래처',status:'상태',category:'구분',payload:'내용',
 key:'키',value:'값',id:'ID',user_id:'아이디',name:'이름',price:'단가',unit_price:'단가',amount:'금액',weight:'중량',use_weight:'사용중량',
 use_date:'사용일',use_key:'사용키',raw_item_code:'원소재품번',machine:'설비',worker1:'작업자1',worker2:'작업자2'};
const SUF=[[/_code$/,'코드'],[/_name$/,'명'],[/_no$/,'번호'],[/_qty$/,'수량'],[/_date$/,'일자'],[/_at$/,'일시'],[/_time$/,'시간'],
 [/_min$/,'(분)'],[/_key$/,'키'],[/_id$/,'ID'],[/_cnt$|_count$/,'건수'],[/_rate$/,'율'],[/_amt$|_amount$/,'금액']];
function dictLabel(c){
 if(DICT[c])return DICT[c];
 for(const [re,suf] of SUF){const m=c.match(re);if(m){const head=c.slice(0,m.index);return (DICT[head]||head)+' '+suf}}
 return '';
}
const _labCache=new Map();
function collectLabels(doc,js){
 const ck=js.length+'|'+js.slice(0,120);
 let base=_labCache.get(ck);
 if(base===undefined&&js.length>60000){base=_collectLabels(null,js);_labCache.set(ck,base)}
 const own=_collectLabels(doc,base?'':js);
 if(base)for(const [k,v] of base)if(!own.has(k))own.set(k,v);
 return own;
}
function _collectLabels(doc,js){
 /* strong = 화면에서 직접 읽은 항목명(믿을 만함), weak = 스크립트에서 추측한 것 */
 const S1=new Map(),W=new Map();
 const norm=v=>String(v||'').replace(/\s+/g,' ').replace(/[*:：]/g,'').trim();
 const put=(k,v)=>{k=String(k||'').trim();v=norm(v);
  if(!k||!v||v.length>14||!/[가-힣A-Za-z]/.test(v))return;if(!S1.has(k))S1.set(k,v)};
 const putW=(k,v)=>{k=String(k||'').trim();v=norm(v);
  if(!k||!v||v.length>14||!/[가-힣A-Za-z]/.test(v))return;if(!W.has(k))W.set(k,v)};
 const L=S1;
 const strip=k=>String(k).replace(/^(f_|fld_|inp_|in_|txt_|sel_|chk_|dd_|q_)/,'');
 /* ① 입력칸 + 라벨 */
 for(const el of (doc?doc.querySelectorAll('input[id],select[id],textarea[id],input[name],select[name],textarea[name]'):[])){
  const key=el.id||el.getAttribute('name');if(!key)continue;
  let t='';const lf=el.id&&doc.querySelector('label[for="'+el.id.replace(/"/g,'')+'"]');
  if(lf)t=lf.textContent;
  if(!t&&el.closest('label'))t=el.closest('label').textContent;
  if(!t){const box=el.parentElement;const lb=box&&box.querySelector('label');if(lb)t=lb.textContent}
  if(!t)t=el.getAttribute('placeholder')||el.getAttribute('aria-label')||'';
  if(t){put(key,t);put(strip(key),t)}
 }
 /* ② 표 머리글 */
 for(const th of (doc?doc.querySelectorAll('th[data-k],th[data-col],th[data-key],td[data-k]'):[]))
  put(th.dataset.k||th.dataset.col||th.dataset.key,th.textContent);
 /* ③ 스크립트의 열 정의 */
 for(const m of js.matchAll(/\[\s*['"]([A-Za-z_]\w*)['"]\s*,\s*['"]([^'"]{1,14})['"]/g))put(m[1],m[2]);
 for(const m of js.matchAll(/\{[^{}]{0,120}?\b(?:k|key|id|field|col|name|prop)\s*:\s*['"]([A-Za-z_]\w*)['"][^{}]{0,120}?\b(?:t|label|title|nm|txt|head|header|hd|caption)\s*:\s*['"]([^'"]{1,14})['"]/g))put(m[1],m[2]);
 for(const m of js.matchAll(/['"]?([A-Za-z_]\w*)['"]?\s*:\s*['"]([가-힣][^'"]{0,12})['"]/g))putW(m[1],m[2]);   /* 값일 수도 있으니 약한 근거 */
 /* ④ DB 컬럼 ← 화면 필드 이름 잇기  (예: {item_code:pn, ymd:r.date}) */
 for(const m of js.matchAll(/([A-Za-z_]\w*)\s*:\s*(?:[A-Za-z_$]\w*\.)?([A-Za-z_]\w*)\b/g)){
  const col=m[1],src=m[2];if(col===src)continue;
  if(S1.has(src))putW(col,S1.get(src));else if(S1.has(strip(src)))putW(col,S1.get(strip(src)));
 }
 const out=new Map(S1);for(const [k,v] of W)if(!out.has(k))out.set(k,'~'+v);   /* ~ 표시 = 추측 */
 return out;
}
/* 화면에서 읽은 항목명 > 사전 > 스크립트 추측(~) 순서 */
function labelFor(L,c){
 const hit=L&&(L.get(c)||L.get(String(c).replace(/^(f_|q_)/,'')));
 if(hit&&!String(hit).startsWith('~'))return hit;
 const d=dictLabel(c);if(d)return d;
 return hit?String(hit).slice(1):'';
}
function parseScripts(doc,extraJs,sharedJs){
 const js=[...doc.querySelectorAll('script:not([src])')].map(s=>s.textContent).join('\n\n')+'\n'+(extraJs||'');
 const all=js+'\n'+(sharedJs||'');
 if(!js.trim())return{tables:[],hosts:[],creds:{},js:''};
 const hosts=[...new Set([...all.matchAll(/https:\/\/([a-z0-9-]+)\.supabase\.co/g)].map(m=>m[1]))];
 /* 스크립트에 박혀 있는 anon/publishable 키를 URL 과 짝지어 둔다 (샘플 데이터 조회용) */
 const urlAt=[...all.matchAll(/https:\/\/([a-z0-9-]+)\.supabase\.co/g)].map(m=>({h:m[1],i:m.index}));
 const creds={};
 for(const m of all.matchAll(/['"`](sb_publishable_[A-Za-z0-9_\-]+|eyJ[A-Za-z0-9_\-.]{60,})['"`]/g)){
  const near=urlAt.filter(u=>u.i<m.index).pop()||urlAt[0];if(near&&!creds[near.h])creds[near.h]=m[1]}
 const T=new Map();
 const push=(name,col,q)=>{name=String(name||'').trim();if(!name||/^rpc$/.test(name)||!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name))return null;
  if(!T.has(name))T.set(name,{name,cols:new Map(),hits:[]});const t=T.get(name);
  if(q)for(const c of (String(q).match(/select=([^&'"`\s]+)/)?.[1]||'').split(','))if(c&&c!=='*'&&/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(c))t.cols.set(c,'text');
  if(q)for(const m of String(q).matchAll(/[?&]([a-zA-Z_][a-zA-Z0-9_]*)=(?:eq|neq|gte|lte|gt|lt|in|is|like|ilike)\./g))t.cols.set(m[1],'text');
  if(q)for(const m of String(q).matchAll(/order=([a-zA-Z_][a-zA-Z0-9_]*)/g))t.cols.set(m[1],'text');
  if(q)for(const m of String(q).matchAll(/on_conflict=([a-zA-Z_,]+)/g))for(const c of m[1].split(','))t.cols.set(c,'pk');
  return t};
 for(const m of js.matchAll(/rest\/v1\/([a-zA-Z_][a-zA-Z0-9_]*)([^'"`\s)]*)/g))push(m[1],null,m[2]);
 for(const m of js.matchAll(/(?:MESDB\.table|supabase\.from|sb\.from|db\.from|\.from)\(\s*['"`]([a-zA-Z_][a-zA-Z0-9_]*)['"`]/g))push(m[1]);
 for(const m of js.matchAll(/(?:TABLE|TBL|SB_TABLE)\s*=\s*['"`]([a-zA-Z_][a-zA-Z0-9_]*)['"`]/g))push(m[1]);
 /* 테이블 이름을 상수로 모아 두고 TBL.xxx 로 쓰는 방식 (const TBL={mold:'ki_mold', …}) */
 const pref=(all.match(/DB_PREFIX\s*:\s*['"`]([a-z0-9]+_)['"`]/)||[])[1];
 const alias={};
 for(const m of all.matchAll(/['"`]?([A-Za-z_]\w*)['"`]?\s*:\s*['"`]([a-z][a-z0-9_]{2,40})['"`]/g)){
  const k=m[1],v=m[2];
  if(pref?v.startsWith(pref):/^[a-z]+_[a-z0-9_]+$/.test(v))alias[k]=v;
 }
 const aliasKeys=Object.keys(alias);
 if(aliasKeys.length){
  const usedKeys=new Set();
  for(const m of js.matchAll(/\b[A-Za-z_$][\w$]*\.([A-Za-z_]\w*)\b/g))if(alias[m[1]])usedKeys.add(m[1]);
  for(const m of js.matchAll(/\[\s*['"`]([A-Za-z_]\w*)['"`]\s*\]/g))if(alias[m[1]])usedKeys.add(m[1]);
  for(const k of usedKeys)if(alias[k]&&alias[k]!==pref&&alias[k].length>(pref||'').length+2)push(alias[k]);
 }
if(!js.trim()&&!(sharedJs||'').trim())return{tables:[],hosts:[],creds:{},js:''};
 return{tables:[...T.values()].map(t=>({name:t.name,cols:[...t.cols.entries()].map(([n,k])=>({name:n,label:'',type:'text',pk:k==='pk'}))})),hosts,creds,js};
}
/* 함수 단위로 쪼개 어떤 탭이 어떤 테이블을 쓰는지 추정 */
function attributeTables(js,tabs,tables){
 const map=new Map();if(!js)return map;
 const names=tables.map(t=>t.name);
 const chunks=[];const re=/(?:function\s+([A-Za-z0-9_$]+)|(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?(?:function|\([^)]*\)\s*=>))/g;let m,prev=null;
 while((m=re.exec(js))){if(prev)chunks.push({name:prev.n,body:js.slice(prev.i,m.index)});prev={n:m[1]||m[2],i:m.index}}
 if(prev)chunks.push({name:prev.n,body:js.slice(prev.i)});
 for(const c of chunks){
  const used=names.filter(n=>new RegExp('(rest\\/v1\\/|[\'"`])'+n+'[\'"`?&\\/]').test(c.body));if(!used.length)continue;
  for(const t of tabs){
   const k=t.key;if(k.length<2)continue;
   const cam=k[0].toUpperCase()+k.slice(1);
   const inName=new RegExp('(^|[^A-Za-z])'+k+'|[a-z0-9]'+cam).test(c.name);
   const inBody=new RegExp("['\"`](?:p-|page-|tab-)?"+k+"['\"`]").test(c.body);
   const hit=inName||inBody;
   if(!hit)continue;
   if(!map.has(k))map.set(k,new Set());for(const u of used)map.get(k).add(u);
  }
 }
 return map;
}


/* 설정 스크립트에 메뉴 트리가 통째로 들어 있는 경우
   (const MENU=[{name:'금형관리',second:[{name:'점검계획',groups:[{items:[{f:'plan_board.html',n:'점검 도래현황'}]}]}]}])
   → 대메뉴 · 중분류 · 화면을 그대로 살려 낸다. 데이터만 있는 배열일 때만 값을 읽는다(함수·계산식이 있으면 포기). */
const _treeCache=new Map();
function menuTreeFromJs(js){
 if(!js)return null;
 const ck=js.length+'|'+js.slice(0,120);
 if(_treeCache.has(ck))return _treeCache.get(ck);
 const r=_menuTree(js);_treeCache.set(ck,r);return r;
}
function _menuTree(js){
 if(!js)return null;
 const m=js.match(/(?:const|let|var)\s+(MENU|MENUS|MENU_TREE|NAV|NAVI|PAGES|SCREENS)\s*=\s*\[/);
 if(!m)return null;
 let i=js.indexOf('[',m.index),d=0,end=-1,q=null;
 for(let k=i;k<js.length;k++){const ch=js[k];
  if(q){if(ch==='\\'){k++;continue}if(ch===q)q=null;continue}
  if(ch==='\''||ch==='"'||ch==='`'){q=ch;continue}
  if(ch==='[')d++;else if(ch===']'){d--;if(!d){end=k;break}}}
 if(end<0)return null;
 let src=js.slice(i,end+1).replace(/\/\*[\s\S]*?\*\//g,'').replace(/(^|[^:'"])\/\/[^\n]*/g,'$1');
 /* 문자열 안의 괄호·기호는 무시하고, 코드 자리에 실행 가능한 문법이 있으면 포기한다 */
 const mask=src.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g,'""');
 if(/\bfunction\b|=>|\bnew\b|\(|\$\{|\bawait\b|\bimport\b/.test(mask))return null;
 let arr;try{arr=Function('"use strict";return ('+src+')')()}catch(e){return null}
 if(!Array.isArray(arr)||!arr.length)return null;
 const nameOf=o=>String(o.name??o.n??o.title??o.label??o.text??o.t??o.key??'').trim();
 const fileOf=o=>String(o.f??o.file??o.page??o.href??o.url??o.html??o.link??o.path??'').trim();
 const kidsOf=o=>{for(const k of ['second','secondary','subs','sub','children','groups','items','menus','list','pages'])
   if(Array.isArray(o[k])&&o[k].length)return o[k];return null};
 const out=[];
 const walk=(o,path)=>{
  const nm=nameOf(o),fl=fileOf(o);
  if(fl&&!/^https?:/i.test(fl)){out.push({file:fl,name:nm||fl,mod:path[0]||'',sec:path[1]||path[0]||''});return}
  const kids=kidsOf(o);if(!kids)return;
  const np=nm?[...path,nm]:path;
  for(const k of kids)walk(k,np);
 };
 for(const top of arr)walk(top,[]);
 return out.length?out:null;
}
/* 설정 스크립트에 메뉴가 배열로 들어 있는 경우 (예: MENUS:[{name:'수주',page:'order.html'}…]) */
function menusFromJs(js,baseUrl){
 const out=[];if(!js)return out;
 const re=/\{[^{}]{0,200}?['"]?(?:name|title|label|nm|t)['"]?\s*:\s*['"]([^'"]{1,24})['"][^{}]{0,200}?['"]?(?:page|file|href|url|html|link|path)['"]?\s*:\s*['"]([\w./-]+\.html?)['"]/g;
 const re2=/\{[^{}]{0,200}?['"]?(?:page|file|href|url|html|link|path)['"]?\s*:\s*['"]([\w./-]+\.html?)['"][^{}]{0,200}?['"]?(?:name|title|label|nm|t)['"]?\s*:\s*['"]([^'"]{1,24})['"]/g;
 const seen=new Set();
 const add=(text,file)=>{const u=normUrl(file,baseUrl);if(!u||seen.has(u))return;seen.add(u);out.push({url:u,text:text.trim(),group:''})};
 for(const m of js.matchAll(re))add(m[1],m[2]);
 for(const m of js.matchAll(re2))add(m[2],m[1]);
 return out;
}
function parsePage(html,url,extraJs,sharedJs){
 const doc=new DOMParser().parseFromString(html,'text/html');
 const title=(doc.querySelector('title')?.textContent||doc.querySelector('h1')?.textContent||pathLabel(url)).trim().replace(/\s+/g,' ').slice(0,40);
 /* 메뉴: nav/header/aside/role=navigation 안의 링크. 중첩 ul 은 상위 li 텍스트를 그룹으로 */
 const navs=[...doc.querySelectorAll('nav,header,aside,[role=navigation],.nav,.menu,.gnb,.lnb,#menu,#nav,#gnb')];
 const menu=[];const seen=new Set();
 for(const nv of navs)for(const a of nv.querySelectorAll('a[href]')){
  const u=normUrl(a.getAttribute('href'),url);if(!u)continue;
  const li=a.closest('li');const parentLi=li&&li.parentElement&&li.parentElement.closest('li');
  const hasKids=!!(li&&li.querySelector(':scope>ul,:scope>ol,:scope>div ul,:scope>div ol'));   /* 하위 메뉴가 있는 항목 = 중분류 */
  if(!hasKids){if(seen.has(u))continue;seen.add(u)}
  const group=parentLi?(parentLi.querySelector(':scope>a,:scope>span,:scope>button,:scope>div')?.textContent||'').trim().replace(/\s+/g,' ').slice(0,30):'';
  const text=(a.textContent||a.getAttribute('title')||'').trim().replace(/\s+/g,' ').slice(0,30);
  if(text)menu.push({url:u,text,group,hasChildren:hasKids});
 }
 const links=[];for(const a of doc.querySelectorAll('a[href]')){const u=normUrl(a.getAttribute('href'),url);if(u&&!links.includes(u))links.push(u)}
 /* 폼 → 테이블 후보 */
 const forms=[...doc.querySelectorAll('form')].map((f,i)=>{
  const cols=[];const seenN=new Set();
  for(const el of f.querySelectorAll('input,select,textarea')){
   const n=(el.getAttribute('name')||el.id||'').trim();const ty=(el.getAttribute('type')||el.tagName).toLowerCase();
   if(!n||seenN.has(n)||/^(submit|button|hidden|reset|image|password|csrf)/.test(ty)||/csrf|token|_token/i.test(n))continue;seenN.add(n);
   let label='';const lb=el.id&&doc.querySelector('label[for="'+(window.CSS&&CSS.escape?CSS.escape(el.id):el.id.replace(/"/g,''))+'"]');if(lb)label=lb.textContent;else if(el.closest('label'))label=el.closest('label').textContent;
   label=(label||el.getAttribute('placeholder')||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').replace(/[*:]/g,'').slice(0,20);
   cols.push({name:n.replace(/[^a-zA-Z0-9_]/g,'_').toLowerCase(),label,type:ty==='number'||ty==='range'?'num':ty==='date'||ty==='datetime-local'||ty==='month'?'date':ty==='checkbox'?'bool':'text'});
  }
  const name=(f.getAttribute('name')||f.id||(f.querySelector('legend,h1,h2,h3')?.textContent)||'').trim().replace(/\s+/g,' ').slice(0,30)||(pathLabel(url)+'_form'+(i+1));
  return{name,cols,action:normUrl(f.getAttribute('action')||'',url)};
 }).filter(f=>f.cols.length);
 const single=$('c_single')?.checked!==false;
 const tabs=single?parseTabs(doc):[];
 const sc=single?parseScripts(doc,extraJs,sharedJs):{tables:[],hosts:[],creds:{},js:''};
 const owns=single?attributeTables(sc.js,tabs,sc.tables):new Map();
 const labels=single?collectLabels(doc,(sc.js||'')+'\n'+(sharedJs||'')):new Map();
 if(single)for(const t of sc.tables)for(const c of t.cols)c.label=c.label||labelFor(labels,c.name);
 const tree=single?(menuTreeFromJs(sc.js)||menuTreeFromJs(sharedJs||'')):null;
 if(single&&!tree){const jm=menusFromJs(sc.js,url);for(const m of jm)if(!menu.some(x=>x.url===m.url))menu.push(m)}
 const ext=[...doc.querySelectorAll('script[src]')].map(x=>x.getAttribute('src')).filter(x=>x&&!/^https?:\/\/(cdn|unpkg|cdnjs|ajax)/i.test(x));
 return{title,menu,links,forms,tabs,tables:sc.tables,hosts:sc.hosts,creds:sc.creds||{},owns,labels,tree,ext,jsLen:(sc.js||'').length};
}
async function crawl(){
 let inp=$('c_url').value.trim();if(inp&&!/^https?:\/\//i.test(inp))inp='https://'+inp.replace(/^\/+/,'');
 const start=normUrl(inp,location.href);if(!start)return $('c_msg').textContent='URL 을 확인하세요.';
 $('c_url').value=inp;
 const depth=+$('c_depth').value,max=Math.max(1,+$('c_max').value||30),mode=$('c_proxy').value,wantForms=$('c_forms').checked,wantFlow=$('c_flow').checked;
 const host=new URL(start).host;crawlStop=false;$('c_go').disabled=true;$('c_log').textContent='';$('c_msg').textContent='가져오는 중…';
 const pages=new Map();const queue=[{url:start,d:0}];
 /* GitHub 저장소면 저장소 안의 html 을 전부 대상으로 삼고, 공용 js 는 배경 지식으로 함께 읽는다 */
 let repoJs='';
 const gr=ghRepo(start);
 if(gr){
  const fl=await ghFiles(gr);
  if(!fl)clog('   ⚠ GitHub 목록을 읽지 못했습니다 (호출 한도이거나 비공개 저장소) — 시작 파일만 읽습니다.');
  else{
   const raw=f=>`https://raw.githubusercontent.com/${gr.own}/${gr.repo}/${fl.branch}/${f}`;
   clog(`저장소 ${gr.own}/${gr.repo} (${fl.branch}) — 화면 ${fl.html.length}개 · 스크립트 ${fl.js.length}개`);
   if($('c_single').checked)for(const f of fl.js.slice(0,12)){
    try{const r=await fetchPage(raw(f),mode);repoJs+='\n'+r.html;clog('   + '+f)}catch(e){clog('   ✕ '+f+': '+e.message)}}
   queue.length=0;
   const order=fl.html.slice().sort((a,b)=>(a==='index.html'?-1:0)-(b==='index.html'?-1:0)||a.localeCompare(b));
   for(const f of order.slice(0,max))queue.push({url:raw(f),d:depth?1:0});
  }
 }
 while(queue.length&&pages.size<max&&!crawlStop){
  const{url,d}=queue.shift();if(pages.has(url))continue;
  clog(`[${pages.size+1}] ${url}`);$('c_msg').textContent=`가져오는 중… ${pages.size+1}/${Math.min(max,pages.size+queue.length+1)} 페이지`;
  try{const{html,url:fin}=await fetchPage(url,mode);
   let extra='';
   if($('c_single').checked){const tmp=parsePage(html,fin||url);
    for(const src of (tmp.ext||[]).slice(0,8)){const su=normUrl(src,fin||url);if(!su)continue;
     try{const r=await fetchPage(su,mode);extra+='\n'+r.html;clog('   + '+src)}catch(e){clog('   ✕ 스크립트 '+src+': '+e.message)}}}
   const p=parsePage(html,fin||url,extra,repoJs);p.finalUrl=fin||url;pages.set(url,p);diag(p);
   if(p.tree&&p.tree.length){clog(`   ▣ 설정에서 메뉴 ${p.tree.length}개 발견 — 해당 화면 파일도 읽습니다`);
    for(const t of p.tree){const tu=normUrl(t.file.split('?')[0],fin||url);
     if(tu&&!pages.has(tu)&&!queue.some(q=>q.url===tu)&&pages.size+queue.length<max)queue.push({url:tu,d:depth?1:0})}}
   if(d<depth)for(const m of (d===0?p.menu:p.menu.slice(0,40))){try{if(new URL(m.url).host!==host)continue}catch(e){continue}if(!pages.has(m.url)&&!queue.some(q=>q.url===m.url))queue.push({url:m.url,d:d+1})}
  }catch(e){clog('   ✕ '+e.message);if(pages.size===0){$('c_msg').textContent='실패: '+e.message;$('c_go').disabled=false;return}}
 }
 buildFromPages(start,pages,{wantForms,wantFlow,replace:document.querySelector('input[name=c_mode]:checked').value==='replace'});
 $('c_go').disabled=false;$('c_msg').textContent=`완료: 페이지 ${pages.size}개`;
 if($('c_sample').checked)await sampleAll();
 setTimeout(()=>crawlDlg.classList.remove('on'),600);
}
function buildFromPages(start,pages,o){
 if(o.replace){clearDeleteUndo();D={nodes:[],edges:[]}}
 const __before=new Set(D.nodes.map(n=>n.id));
 const host=new URL(start).host,root=pages.get(start);
 const appName=String(root?.title||host).split(/[|—–·]/)[0].trim().slice(0,20)||host;
 LAST_IMPORT_NAME=appName;
 const mod=addNode('module',appName,{icon:'🌐',desc:host},0,0);
 const secs=new Map();const scr=new Map();const tbls=new Map();
 const secOf=g=>{g=g||'메뉴';if(!secs.has(g))secs.set(g,(()=>{const n=addNode('section',g,{icon:'▣'},0,0);addEdge(mod.id,n.id,'contains');return n})());return secs.get(g)};
 const screenOf=(u,text,group)=>{if(scr.has(u))return scr.get(u);const n=addNode('screen',(text||pages.get(u)?.title||pathLabel(u)).slice(0,30),{file:(()=>{try{const p=new URL(u).pathname;return (p.replace(/\/$/,'').split('/').pop()||'index').replace(/\.[a-z]+$/i,'')+'.html'}catch(e){return 'page.html'}})(),kind:'other',url:u},0,0);
  addEdge(secOf(group).id,n.id,'contains','');scr.set(u,n);return n};
 /* 파일명으로도 화면을 찾을 수 있게 (github.com ↔ raw 주소가 달라도 매칭) */
 const fileKey=u=>{try{return (new URL(u).pathname.split('/').pop()||'').toLowerCase()}catch(e){return String(u).split('/').pop().toLowerCase()}};
 const findScr=u=>{if(scr.has(u))return scr.get(u);const f=fileKey(u);for(const [k,n] of scr)if(fileKey(k)===f)return n;return null};
 /* 설정에 들어 있던 메뉴 트리가 있으면 그걸 뼈대로 (대메뉴 · 중분류 · 화면 그대로) */
 const treePage=[...pages.values()].find(p=>p.tree&&p.tree.length);
 const mods=new Map();mods.set(appName,mod);
 const modOf=nm=>{nm=(nm||appName).slice(0,20);if(!mods.has(nm))mods.set(nm,addNode('module',nm,{icon:'▣',desc:host},0,0));return mods.get(nm)};
 if(treePage){
  const base=treePage.finalUrl||[...pages.entries()].find(([,p])=>p===treePage)[0];
  for(const t of treePage.tree){
   const u=normUrl(t.file.split('?')[0],base);if(!u)continue;
   const mn=modOf(t.mod),key=(t.mod||'')+'/'+(t.sec||'');
   if(!secs.has(key)){const sn=addNode('section',(t.sec||t.mod||'메뉴').slice(0,20),{icon:'▣'},0,0);addEdge(mn.id,sn.id,'contains');secs.set(key,sn)}
   if(scr.has(u))continue;
   const n=addNode('screen',t.name.slice(0,30),{file:t.file,kind:/등록|입력|계획|신규/.test(t.name)?'input':'status',url:u},0,0);
   addEdge(secs.get(key).id,n.id,'contains');scr.set(u,n);
  }
  if(!D.edges.some(e=>e.from===mod.id)&&mods.size>1){D.nodes=D.nodes.filter(x=>x.id!==mod.id);mods.delete(appName)}
 }
 if(root)for(const m of root.menu){if(m.hasChildren){secOf(m.text);continue}screenOf(m.url,m.text,m.group)}
 for(const [u,p] of pages)if(!findScr(p.finalUrl||u)&&u!==start)screenOf(u,(p.tree&&p.tree.length?null:p.title),'기타');
 if(!findScr(root?.finalUrl||start))screenOf(start,root?.title||'홈','메뉴');
 /* 단일 파일 앱: 탭 = 화면, 스크립트에서 찾은 테이블 연결 */
 for(const [u,p] of pages){
  if(!p.tabs||!p.tabs.length)continue;
  const host=(p.hosts&&p.hosts[0])||'';
  const own=scr.get(u);const pageScr=new Map();
  for(const t of p.tabs){const sec=secOf(t.group||(p.tabs.some(x=>x.group)?'기본 메뉴':appName));
   const n=addNode('screen',t.text,{file:(own?own.meta.file:'index.html')+'#'+t.key,kind:/등록|입력|new|input|cfg|대장/i.test(t.text+t.key)?'input':'status',tab:t.key},0,0);
   addEdge(sec.id,n.id,'contains','');pageScr.set(t.key,n)}
  if(own&&!D.edges.some(e=>e.to===own.id&&e.kind==='contains'&&false)){/* 파일 자체 화면은 탭들로 대체 */
   D.edges=D.edges.filter(e=>e.from!==own.id&&e.to!==own.id);D.nodes=D.nodes.filter(n=>n.id!==own.id);scr.delete(u)}
  const ownScr=findScr(p.finalUrl||u);
  for(const t of (p.tables||[])){const key='T:'+t.name;if(!tbls.has(key))tbls.set(key,addNode('table',t.name,{cols:t.cols.length?t.cols:[{name:'id',label:labelFor(p.labels,'id'),type:'text',pk:true}],host,apikey:(p.creds||{})[host]||'',labels:Object.fromEntries(p.labels||[])},0,0));
   const tb=tbls.get(key);let linked=false;
   for(const [k,set] of (p.owns||new Map()))if(set.has(t.name)&&pageScr.has(k)){addEdge(pageScr.get(k).id,tb.id,'uses',host&&pages.size>1?host:'');linked=true}
   if(!linked){
    if(ownScr)addEdge(ownScr.id,tb.id,'uses','공통');
    else for(const ps of pageScr.values())addEdge(ps.id,tb.id,'uses','공통');
   }
  }
 }
 for(const [u,p] of pages){
  if(p.tabs&&p.tabs.length)continue;
  const own=findScr(p.finalUrl||u);if(!own||!p.tables)continue;
  for(const t of p.tables){const key='T:'+t.name;
   if(!tbls.has(key))tbls.set(key,addNode('table',t.name,{cols:t.cols.length?t.cols:[{name:'id',type:'text',pk:true}],host:(p.hosts||[])[0]||'',apikey:(p.creds||{})[(p.hosts||[])[0]]||'',labels:Object.fromEntries(p.labels||[])},0,0));
   addEdge(own.id,tbls.get(key).id,'uses','')}
 }
 for(const [u,p] of pages){const s=findScr(p.finalUrl||u);if(!s)continue;
  if(o.wantForms)for(const f of p.forms){const key=f.cols.map(c=>c.name).join('|');let t=tbls.get(key);
   if(!t){t=addNode('table',f.name.replace(/[^a-zA-Z0-9_가-힣]/g,'_').slice(0,30)||'form',{cols:f.cols.map((c,i)=>({...c,label:c.label||dictLabel(c.name),pk:i===0,req:false}))},0,0);tbls.set(key,t)}
   addEdge(s.id,t.id,'uses',f.action&&f.action!==u?'→ '+pathLabel(f.action):'입력폼')}
  if(o.wantFlow)for(const l of p.links){const t=scr.get(l);if(t&&t!==s&&!D.edges.some(e=>e.from===s.id&&e.to===t.id))addEdge(s.id,t.id,'flow','')}
 }
 /* 자식이 없는 중분류는 지운다 (탭으로 대체된 경우 등) */
 for(const sc2 of D.nodes.filter(n=>n.type==='section'))
  if(!D.edges.some(e=>e.from===sc2.id&&e.kind==='contains')){D.nodes=D.nodes.filter(n=>n.id!==sc2.id);D.edges=D.edges.filter(e=>e.from!==sc2.id&&e.to!==sc2.id)}
 select(null);autoLayout();
}


/* 저장해 둔 HTML 파일·붙여넣은 소스에서 가져오기 (로그인 뒤 화면 · SPA 용) */
async function importSaved(){
 const files=[...$('c_files').files],paste=$('c_paste').value.trim();
 if(!files.length&&!paste)return $('c_msg').textContent='HTML 파일을 고르거나 소스를 붙여넣으세요.';
 let base=$('c_base').value.trim();if(base&&!/^https?:\/\//i.test(base))base='https://'+base;if(base&&!base.endsWith('/'))base+='/';
 const wantForms=$('c_forms').checked,wantFlow=$('c_flow').checked;
 $('c_log').textContent='';const pages=new Map();let start=null;
 const add=(name,html)=>{const url=((base||'https://saved.local/')+name.replace(/\.(mhtml|txt)$/i,'.html')).replace(/\/$/,'');if(!start)start=url;
  try{const p=parsePage(html,url);p.finalUrl=url;pages.set(url,p);clog(`[${pages.size}] ${name||'(붙여넣은 소스)'}`);diag(p)}catch(e){clog('   ✕ '+name+': '+e.message)}};
 for(const f of files)add(f.name,await f.text());
 if(paste)add('',paste);                                   /* 붙여넣은 소스 = 사이트 루트로 취급 */
 if(!pages.size)return $('c_msg').textContent='읽을 수 있는 페이지가 없습니다.';
 /* 메뉴가 가장 많은 페이지를 뼈대(시작)로 삼는다 */
 start=[...pages.entries()].sort((a,b)=>b[1].menu.length-a[1].menu.length)[0][0];
 buildFromPages(start,pages,{wantForms,wantFlow,replace:document.querySelector('input[name=c_mode]:checked').value==='replace'});
 $('c_msg').textContent=`완료: 페이지 ${pages.size}개`;
 if($('c_sample').checked)await sampleAll();
 setTimeout(()=>crawlDlg.classList.remove('on'),900);
}


/* ── 테이블 예시 데이터 가져오기 ─────────────────────────────────────
   화면 스크립트에 박혀 있던 Supabase URL·anon 키로 각 테이블의 실제 행 1건을 읽어
   컬럼 목록·형(type)·예시값을 채운다. 읽기 권한(RLS)이 없으면 그 테이블은 건너뛴다. */
const guessType=v=>v===null||v===undefined?null:typeof v==='boolean'?'bool':typeof v==='number'?'num'
 :(/^\d{4}-\d{2}-\d{2}([T ]|$)/.test(String(v))?'date':'text');
const shortVal=v=>{if(v===null||v===undefined)return '';if(typeof v==='object')return JSON.stringify(v).slice(0,20);
 let s=String(v);if(/^\d{4}-\d{2}-\d{2}T/.test(s))s=s.slice(0,16).replace('T',' ');return s.slice(0,22)};
async function sampleTable(n){
 const host=n.meta.host,key=n.meta.apikey;
 if(!host||!key)return{ok:false,msg:'이 테이블에는 Supabase 주소/키 정보가 없습니다. 블록을 고르고 직접 입력하거나 예시를 손으로 적으세요.'};
 const base=/^https?:\/\//.test(host)?host.replace(/\/$/,''):'https://'+host+'.supabase.co';
 try{
  const r=await fetch(base+'/rest/v1/'+encodeURIComponent(n.name)+'?select=*&limit=3',{headers:{apikey:key,Authorization:'Bearer '+key}});
  const t=await r.text();
  if(!r.ok)return{ok:false,msg:(r.status===401||r.status===403)?'읽기 권한 없음(RLS)':r.status+' '+t.slice(0,80)};
  const rows=JSON.parse(t||'[]');
  if(!rows.length)return{ok:true,msg:'빈 테이블',n:0};
  const cols=n.meta.cols||(n.meta.cols=[]);const byName=new Map(cols.map(c=>[c.name,c]));
  for(const k of Object.keys(rows[0])){
   let c=byName.get(k);if(!c){c={name:k,label:'',type:'text'};cols.push(c);byName.set(k,c)}
   if(!c.label)c.label=labelFor(new Map(Object.entries(n.meta.labels||{})),k);
   const v=rows.map(r=>r[k]).find(x=>x!==null&&x!==undefined&&x!=='');
   const ty=guessType(v);if(ty)c.type=ty;
   c.sample=shortVal(v);
  }
  return{ok:true,msg:`${rows.length}건 읽음 · 컬럼 ${cols.length}개`,n:rows.length};
 }catch(e){return{ok:false,msg:'접속 실패: '+(e.message||e)}}
}
async function sampleAll(){
 const ts=D.nodes.filter(n=>n.type==='table'&&n.meta.host&&n.meta.apikey);
 if(ts.length)$('c_msg')&&($('c_msg').textContent=`예시 데이터 읽는 중… (테이블 ${ts.length}개)`);
 if(!ts.length){if($('c_msg'))$('c_msg').textContent+=' · 키를 찾지 못해 예시 데이터는 건너뜀';return}
 let ok=0,done=0;
 const q=ts.slice();
 const worker=async()=>{while(q.length&&!crawlStop){const n=q.shift();const r=await sampleTable(n);
   clog(`   · ${n.name}: ${r.msg}`);if(r.ok&&r.n)ok++;if(++done%5===0)render()}};
 await Promise.all(Array.from({length:Math.min(6,ts.length)},worker));render();
 if($('c_msg'))$('c_msg').textContent+=` · 예시 데이터 ${ok}/${ts.length}개 테이블`;
}
async function sampleOne(){
 const n=N(sel.node);$('smpMsg')&&($('smpMsg').textContent='읽는 중…');
 const r=await sampleTable(n);renderPanel();render();
 const m=$('smpMsg');if(m)m.textContent=r.msg;
}
