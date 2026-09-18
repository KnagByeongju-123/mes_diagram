/* ═══════════════ 시스템 생성 ═══════════════ */
let GEN={},genCur='';
async function generate(){
 const vr=validateDesign(false);if(!vr.ok){showValidation(vr);return}
 const ORIG=await fetchOrigins();ORIGIN_FILES={};
 const mods=D.nodes.filter(n=>n.type==='module');
 if(!mods.length)return alert('대메뉴 블록이 하나 이상 필요합니다.');
 const kids=(id,k='contains')=>D.edges.filter(e=>e.from===id&&e.kind===k).map(e=>N(e.to)).filter(Boolean);
 const sortY=a=>a.slice().sort((p,q)=>p.y-q.y||p.x-q.x);
 GEN={};const warn=[];const skipped=[];
 /* app_config.js */
 const MODULES=[],APP={},PAGES={},ICON={},DESC={},MODHOME={};
 for(const m of sortY(mods)){MODULES.push(m.name);ICON[m.name]=m.meta.icon||'▣';DESC[m.name]=m.meta.desc||'';MODHOME[m.name]=m.meta.homeType||'auto';
  const secs=sortY(kids(m.id).filter(n=>n.type==='section')),direct=sortY(kids(m.id).filter(n=>n.type==='screen'));
  const secondary=[],menus={};
  for(const s of secs){secondary.push({name:s.name,icon:s.meta.icon||'▣'});const scr=sortY(kids(s.id).filter(n=>n.type==='screen'));menus[s.name]=[{name:s.name,items:scr.map(x=>x.name)}];
   for(const x of scr)PAGES[x.name]=x.meta.file||(slug(x.name)+'.html')}
  if(direct.length){secondary.push({name:m.name,icon:m.meta.icon||'▣'});menus[m.name]=[{name:m.name,items:direct.map(x=>x.name)}];for(const x of direct)PAGES[x.name]=x.meta.file||(slug(x.name)+'.html')}
  if(!secondary.length)warn.push(`'${m.name}' 대메뉴에 연결된 중분류/화면이 없습니다.`);
  APP[m.name]={secondary,menus}}
 if(!MODULES.includes('사용메뉴얼')){MODULES.push('사용메뉴얼');APP['사용메뉴얼']={secondary:[{name:'사용메뉴얼',icon:'📖'}],menus:{'사용메뉴얼':[{name:'사용메뉴얼',items:['사용메뉴얼']}]}};PAGES['사용메뉴얼']='user_manual.html';ICON['사용메뉴얼']='📖';DESC['사용메뉴얼']='시스템 사용 안내'}
 if(!PAGES['사용자정보'])warn.push("'사용자정보' 화면이 메뉴에 없습니다. 권한 관리를 하려면 기준정보 아래에 추가하세요 (파일 user_information.html).");
 const quick=Object.keys(PAGES).filter(k=>k!=='사용메뉴얼').slice(0,8);
 GEN['app_config.js']=`/* app_config.js — 시스템 설계도에서 생성 (${new Date().toLocaleString('ko-KR')}) */
(function(){
const C={};
C.APP_VER='1';
C.APP_NAME='${esc1($('sysName').value.trim()||'SAMPLE MES')}';
C.APP_SHORT='MES';
C.MARK='M';
C.LOGIN_HTML='<b>'+C.APP_NAME+'</b>';
C.LOGIN_SUB='시스템 로그인';
C.STORAGE='${slug($('sysName').value.trim()||'samplemes')}';
C.MODE='json';
C.SEED_FILE='db.js';
C.EMAIL_DOMAIN='mes.local';
C.SUPABASE={url:'${esc1(GENCFG.url||'https://YOUR_PROJECT_REF.supabase.co')}',key:'${esc1(GENCFG.key||'sb_publishable_YOUR_ANON_KEY')}'};
C.HELP_MODULE='사용메뉴얼';
C.MODULES=${JSON.stringify(MODULES)};
C.APP=${JSON.stringify(APP,null,1)};
C.PAGES=${JSON.stringify(PAGES,null,1)};
C.MENU_LABEL={};
C.MOD_ICON=${JSON.stringify(ICON)};
C.MOD_DESC=${JSON.stringify(DESC)};
C.MOD_HOME=${JSON.stringify(MODHOME)};
C.QUICK=${JSON.stringify(quick)};
C.HOT=[];
C.SHELL_STYLE='${skinId()}';
C.pageRegistry={};
for(const [name,file] of Object.entries(C.PAGES)){const id=file.replace(/\\.html.*$/,'').replace(/[^a-zA-Z0-9_]/g,'_');C.pageRegistry[name]={id,file,title:name}}
C.menuTree=function(){return C.MODULES.filter(m=>m!==C.HELP_MODULE&&C.APP[m]).map(m=>({name:m,secs:(C.APP[m].secondary||[]).map(s=>({name:s.name,items:(C.APP[m].menus?.[s.name]||[]).flatMap(g=>g.items)}))}))};
window.APP_CONFIG=C;
if(C.MODE==='json'){C.SUPABASE={url:'local://db',key:'local'};const v='?v='+C.APP_VER;
  if(document.readyState==='loading')document.write('<script src="'+C.SEED_FILE+v+'"><\\/script><script src="mes_local.js'+v+'"><\\/script>');
  else [C.SEED_FILE,'mes_local.js'].forEach(f=>{try{const x=new XMLHttpRequest();x.open('GET',f+v,false);x.send();if(x.status<400||x.status===0)(0,eval)(x.responseText)}catch(e){console.error(f,e)}})}
})();
`;
 /* db.js + schema.sql */
 const tables=D.nodes.filter(n=>n.type==='table');
 const core={users:'user_key',user_permissions:'user_key,menu_name',user_initial_passwords:'user_id',_auth:'email',page_state:'page',error_log:'err_id',ui_layout:'page,elem_id,user_key'};
 const pk={...core},seed={};
 for(const t of tables){const p=(t.meta.cols||[]).filter(c=>c.pk).map(c=>c.name);if(!p.length)warn.push(`테이블 '${t.name}' 에 기본키(🔑)가 없습니다.`);pk[t.name]=p.join(',')||(t.meta.cols[0]?.name||'id');seed[t.name]=[]}
 /* 설계에 users 같은 공통 테이블을 그려 넣었더라도 로그인 계정은 유지되어야 하므로 공통 테이블이 마지막에 덮어쓴다 */
 const db={_meta:{pk},...seed,_auth:[{email:'hcsmart@mes.local',password:'000000'}],
  users:[{user_key:'00000_관리자',user_id:'hcsmart',name:'최초설정',department_name:'시스템',is_active:true,auth_email:'hcsmart@mes.local',role:'master',can_review:true,can_confirm:true,can_approve:true}],
  user_permissions:[],user_initial_passwords:[{user_id:'hcsmart',temp_password:null,issued_by:'bootstrap',changed_by_user:false}],page_state:[],error_log:[],ui_layout:[]};
 GEN['db.js']=`/* db.js — 시스템 설계도에서 생성. 최초 실행 시 마스터 ID/비밀번호를 설정합니다. */\nwindow.MES_SEED = ${JSON.stringify(db,null,1)};\n`;
 const sqlType={text:'text',num:'numeric',date:'date',bool:'boolean'};
 const qid=n=>/[A-Z]/.test(n)?'"'+n+'"':n;
 let sql=`-- schema.sql — 시스템 설계도에서 생성. mes_template 의 schema.sql(공통 테이블·함수) 을 먼저 실행한 뒤 이 파일을 실행한다.\n`;
 for(const t of tables){if(['users','user_permissions'].includes(t.name))continue;const cols=dbColsOf(t);const p=cols.filter(c=>c.pk).map(c=>c.name);
  sql+=`\ncreate table if not exists public.${t.name}(\n${cols.map(c=>{const fl=parseFlow(c);return `  ${qid(c.name)} ${sqlType[c.type]||'text'}${c.req||c.pk?' not null':''}${fl?` default '${fl.steps[0].replace(/'/g,"''")}' check (${qid(c.name)} in (${[...fl.steps,...fl.ends].map(v=>`'${v.replace(/'/g,"''")}'`).join(',')}))`:''}`}).join(',\n')}${p.length?`,\n  primary key(${p.map(qid).join(',')})`:''}\n);\nalter table public.${t.name} enable row level security;\ndrop policy if exists auth_all on public.${t.name};\ncreate policy auth_all on public.${t.name} for all to authenticated using(true) with check(true);\n`;
  for(const e of D.edges.filter(e=>e.from===t.id&&e.kind==='ref'))sql+=`-- 참조: ${t.name} → ${N(e.to)?.name}  ${e.label||''}\n`}
 GEN['schema.sql']=sql;
 /* 화면 */
 for(const s of D.nodes.filter(n=>n.type==='screen')){
  const file=s.meta.file||(slug(s.name)+'.html');if(file==='user_information.html'||file==='user_manual.html')continue;
  if(s.meta.locked){skipped.push(file);continue}
  if(s.meta.origin&&originUrl(s)){const o=ORIG[s.id];
   if(o){GEN[o.file]=o.html;for(const [an,at] of Object.entries(o.assets))GEN[an]=at;ORIGIN_FILES[o.file]=o.assets;continue}
   warn.push(`화면 '${s.name}' 의 원본(${originUrl(s)})을 받지 못해 생성 화면으로 대체했습니다.`)}
  const use=D.edges.filter(e=>e.from===s.id&&e.kind==='uses').map(e=>N(e.to)).filter(t=>t&&t.type==='table');
  const t=use[0];const loc=locate(s.name);
  if(s.meta.kind==='other'||!t){if(s.meta.kind!=='other')warn.push(`화면 '${s.name}' 에 "사용" 테이블이 없어 빈 화면으로 만듭니다.`);GEN[file]=blankScreen(s,loc);continue}
  if(s.meta.kind==='dash'){GEN[file]=dashScreen(s,use,loc);continue}
  if(s.meta.kind==='paste'){GEN[file]=pasteScreen(s,use,loc);continue}
  if(s.meta.kind==='perm'){GEN[file]=permScreen(s,use,loc);continue}
  if(s.meta.kind==='board'){GEN[file]=boardScreen(s,use,loc);continue}
  if(s.meta.kind==='check'||(s.meta.kind==='input'&&isCheckTable(t))){GEN[file]=checkScreen(s,t,loc);continue}
  const md=detailOf(s);
  if(md)GEN[file]=applyFlow(masterDetailScreen(s,md.parent,md.child,md.edge,loc,use.filter(x=>x!==md.parent&&x!==md.child)),md.parent);
  else GEN[file]=s.meta.kind==='status'?applyFlowStatus(statusScreen(s,t,loc,use.slice(1)),t):applyFlow(inputScreen(s,t,loc,use.slice(1)),t);
 }
 /* 화면 CSS — 설계 전체 테마. 화면 블록에 따로 지정한 테마가 있으면 그 화면에만 덧붙인다 */
 GEN['mes_screen.css']=skinCss(skinId());
 for(const s2 of D.nodes.filter(n=>n.type==='screen')){
  const f=s2.meta.file||(slug(s2.name)+'.html');
  if(!GEN[f]||!s2.meta.skin||s2.meta.skin===skinId()||!SKIN[s2.meta.skin])continue;
  GEN[f]=GEN[f].replace(/(<link rel="stylesheet" href="mes_screen\.css"\s*\/?>)/,
   `$1<style>/* ${s2.meta.skin} — 이 화면 전용 테마 */\n${SKIN[s2.meta.skin].font?`@import url('${SKIN[s2.meta.skin].font}');\n`:''}${SKIN[s2.meta.skin].css}</style>`);
 }
 /* 앱 프레임(index.html) 도 같은 테마로 */
 if(SKIN[skinId()].shell||Object.keys(ORIGIN_FILES).length)GEN['index.html']=shellHtml(skinId());
 GEN['설계_관계정리.md']=relationsDoc();
 if(skipped.length)GEN['건너뛴_화면.txt']='아래 화면은 "직접 수정함(🔒)" 으로 표시되어 다시 생성하지 않았습니다.\n기존 파일을 그대로 두세요.\n\n'+skipped.map(f=>'· '+f).join('\n');
 if(warn.length)GEN['경고.txt']=warn.join('\n');
 showGen();
 function locate(name){for(const [m,c] of Object.entries(APP))for(const [sn,gs] of Object.entries(c.menus))for(const g of gs)if(g.items.includes(name))return m+' · '+sn;return ''}
}
const esc1=s=>String(s).replace(/'/g,"\\'");
function slug(s){return s.replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_|_$/g,'').toLowerCase()||'screen_'+uid()}
const colsOf=t=>(t.meta.cols||[]).filter(c=>c.name);
const dbColsOf=t=>colsOf(t).filter(c=>!c.formula||c.calcStore);
const mapOf=t=>'{'+dbColsOf(t).map(c=>`${c.name}:${c.type==='text'?`'${c.name}'`:`{col:'${c.name}',type:'${c.type}'}`}`).join(',')+'}';
