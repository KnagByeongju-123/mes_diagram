/* ═══ 항목 붙여넣기 ═══
   엑셀 표(머리글+데이터 한 줄)나 "영문명, 라벨, 형" 목록을 붙여넣어 컬럼을 한 번에 만든다.
   한글 머리글은 사전으로 영문 컬럼명을 지어 준다 (없으면 col1·col2 — 나중에 고치면 됨). */
let _lab2eng=null;
function LAB2ENG_(){
 if(_lab2eng)return _lab2eng;
 const m=new Map();
 try{for(const [k,v] of Object.entries(DICT))if(!m.has(v))m.set(v,k)}catch(e){}
 for(const [k,v] of [['일자','work_date'],['날짜','work_date'],['등록일','reg_date'],['납기','due_date'],['납기일','due_date'],
  ['설비','machine_code'],['설비명','machine_name'],['호기','machine_code'],['품번','item_code'],['품명','item_name'],['규격','spec'],
  ['수량','qty'],['단가','unit_price'],['금액','amount'],['중량','weight'],['단위','unit'],['거래처','customer_name'],['고객사','customer_name'],
  ['업체','vendor_name'],['담당자','worker'],['작업자','worker'],['검사자','inspector'],['공정','process'],['상태','status'],['구분','kind'],
  ['비고','remark'],['특기사항','note'],['사유','reason'],['LOT','lot_no'],['로트','lot_no'],['번호','doc_no'],['순번','seq'],
  ['양품','good_qty'],['불량','defect_qty'],['불량수량','defect_qty'],['금형','mold_code'],['시작','start_time'],['종료','end_time']])m.set(k,v);
 _lab2eng=m;return m}
function engCol(label,i,used){
 const t=String(label||'').replace(/\(.*?\)/g,'').replace(/[*:：]/g,'').trim();
 let base=(t.match(/[A-Za-z][A-Za-z0-9_ ]*/)||[])[0];
 if(base)base=base.trim().replace(/\s+/g,'_').toLowerCase();
 const L=LAB2ENG_();
 if(!base&&L.has(t))base=L.get(t);
 if(!base)for(const [k,v] of L)if(t.includes(k)){base=v;break}
 if(!base)base='col'+(i+1);
 let n=base,k=2;while(used.has(n))n=base+'_'+(k++);
 used.add(n);return n;
}
const guessTy=v=>{const s=String(v??'').trim();
 if(!s)return 'text';
 if(/^(Y|N|true|false|O|X|✓)$/i.test(s))return 'bool';
 if(/^\d{4}[-./]\d{1,2}[-./]\d{1,2}/.test(s))return 'date';
 if(/^-?[\d,]+(\.\d+)?$/.test(s.replace(/\s/g,''))&&/\d/.test(s))return 'num';
 return 'text'};
function parsePaste(txt,useSample){
 const raw=String(txt||'').replace(/\r/g,'').split('\n').map(l=>l.trim()).filter(Boolean);
 if(!raw.length)return [];
 const tabbed=raw[0].includes('\t');
 const used=new Set(),cols=[];
 if(tabbed||(raw[0].split(/\s{2,}/).length>2&&!raw[0].includes(','))){
  /* 엑셀 가로 표: 1행=머리글, 2행=예시값 */
  const split=l=>tabbed?l.split('\t'):l.split(/\s{2,}/);
  const head=split(raw[0]).map(x=>x.trim());
  const vals=(useSample&&raw[1])?split(raw[1]).map(x=>x.trim()):[];
  head.forEach((h,i)=>{if(!h)return;
   const c={name:engCol(h,i,used),label:h,type:vals[i]?guessTy(vals[i]):'text'};
   if(vals[i])c.sample=vals[i].slice(0,22);
   cols.push(c)});
 }else{
  /* 세로 목록: "영문명, 라벨, 형" 또는 "라벨" 한 줄씩 */
  raw.forEach((l,i)=>{
   const p=l.split(/[,\t|]/).map(x=>x.trim()).filter(x=>x!=='');
   if(!p.length)return;
   let name,label,type,sample;
   if(p.length===1){label=p[0];name=engCol(label,i,used)}
   else{
    if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(p[0])){name=p[0];used.add(name);label=p[1]||'';type=p[2]}
    else{label=p[0];name=engCol(label,i,used);type=p[1]}
   }
   if(type&&!['text','num','date','bool'].includes(type)){sample=type;type=guessTy(sample)}
   cols.push({name,label:label||'',type:type||'text',...(sample?{sample}:{})});
  });
 }
 if(cols.length&&!cols.some(c=>c.pk))cols[0].pk=true;
 return cols;
}
function openPaste(){
 if(!sel||!sel.node)return;const n=N(sel.node);if(n.type!=='table')return;
 $('pst_tbl').textContent=n.name;$('pst_txt').value='';$('pst_prev').textContent='';$('pst_msg').textContent='';
 pasteDlg.classList.add('on');setTimeout(()=>$('pst_txt').focus(),50);
 $('pst_txt').oninput=$('pst_sample').onchange=previewPaste;
}
function previewPaste(){
 const cols=parsePaste($('pst_txt').value,$('pst_sample').checked);
 $('pst_prev').textContent=cols.length
  ? cols.map(c=>`${c.pk?'🔑 ':'   '}${c.name.padEnd(16)} ${(c.label||'').padEnd(12)} ${c.type}${c.sample?'  예) '+c.sample:''}`).join('\n')
  : '붙여넣으면 만들어질 항목이 여기 보입니다.';
 $('pst_msg').textContent=cols.length?`${cols.length}개 항목`:'';
}
function applyPaste(){
 const n=N(sel&&sel.node);if(!n)return;
 const cols=parsePaste($('pst_txt').value,$('pst_sample').checked);
 if(!cols.length)return $('pst_msg').textContent='읽을 내용이 없습니다.';
 const mode=document.querySelector('input[name=pst_mode]:checked').value;
 if(mode==='replace')n.meta.cols=cols;
 else{const ex=new Set((n.meta.cols||[]).map(c=>c.name));
  for(const c of cols){if(ex.has(c.name))continue;if((n.meta.cols||[]).length)delete c.pk;n.meta.cols.push(c);ex.add(c.name)}}
 pasteDlg.classList.remove('on');renderPanel();render();
 $('stat').textContent=`'${n.name}' 에 항목 ${cols.length}개를 ${mode==='replace'?'새로 넣었습니다':'추가했습니다'}.`;
}
/* ═══ 화면 미리보기 ═══
   설계대로 만들어질 화면을 그 자리에서 띄워 본다. DB 없이 예시값으로 샘플 행을 넣어 보여준다. */
const PV_CSS=`/* mes_screen.css — 탭 화면(iframe) 공통 스타일
 * 화면 <head> 에 <link rel="stylesheet" href="mes_screen.css"> 한 줄만 넣으면 동일 포맷이 된다.
 * 레이아웃 뼈대:  .screen > .title / .body / .foot       (foot 의 #message 는 mes_ctx.js 가 감시)
 * 패널:           .panel > .cap / .filters / .tablewrap  ·  .formgrid > .lab + .field
 * 버튼:           .btn  .btn.primary  .btn.warn  .btn.sm
 */
:root{--line:#9aa7b3;--line2:#c7d2db;--blue:#2c73b4;--blue2:#d7e7f2;--ink:#354858;--bg:#f6f8fa;--sel:#2f76b7}
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{font-family:"Malgun Gothic","맑은 고딕",Arial,sans-serif;font-size:12px;color:var(--ink);background:#fff;overflow:hidden}
button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer}
input,select{min-width:0;max-width:100%}
::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:#c2c9d4;border-radius:4px}

/* 화면 뼈대 */
.screen{height:100%;display:flex;flex-direction:column;background:#fff}
.title{height:50px;padding:8px 14px 5px;border-bottom:2px solid #3978ae;display:flex;align-items:center;gap:8px;flex-shrink:0}
.title h1{margin:0;font-size:22px;font-weight:500;color:#4d5d69}
.title h1:before{content:'◯';margin-right:6px;color:#8c9aa5}
.title small{color:#8a97a5;font-size:12px;margin-left:4px}
.body{flex:1;min-height:0;display:grid;gap:8px;padding:7px 10px}
.body.two{grid-template-columns:36% 64%}          /* 좌 목록 / 우 상세 */
.body.form-list{grid-template-rows:auto minmax(0,1fr)}  /* 상 입력폼 / 하 목록 */
.foot{height:40px;display:flex;align-items:center;padding:5px 10px;border-top:1px solid var(--line);background:#edf2f5;gap:5px;flex-shrink:0}
.foot .msg,.msg{margin-left:8px;color:#687784;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.foot .right,.rightmsg{margin-left:auto;color:#7d8993;white-space:nowrap}

/* 패널 */
.panel{border:1px solid var(--line);background:#fff;min-height:0;display:flex;flex-direction:column}
.cap,.box-title,.grid-title{height:28px;display:flex;align-items:center;padding:0 8px;background:linear-gradient(#f5f8fa,#e6edf2);border-bottom:1px solid var(--line);font-weight:700;flex-shrink:0}
.cap .right{margin-left:auto;font-weight:400;color:#7d8993}
.filters{display:flex;flex-wrap:wrap;gap:3px;padding:5px;border-bottom:1px solid var(--line2);align-items:center}
.filters .lab{min-width:74px}
.filters .field{width:140px}

/* 라벨 / 입력 */
.lab,.label{background:#eef2f5;border:1px solid #c4cdd5;display:flex;align-items:center;justify-content:center;min-height:25px;padding:0 8px;white-space:nowrap}
.field{height:25px;border:1px solid #b7c1ca;background:#fff;padding:0 6px}
.field:focus{outline:0;border-color:var(--blue);box-shadow:0 0 0 1px var(--blue2)}
.field[readonly]{background:#f2f4f6;color:#555}
.field.req{border-left:3px solid #e05a4a}
textarea.field{height:auto;min-height:50px;padding:4px 6px;resize:vertical}
.check{height:25px;border:1px solid #b7c1ca;display:flex;align-items:center;padding-left:8px;background:#fff}

/* 입력폼 그리드 — 라벨/필드 교대. 폭에 따라 3열 → 2열 → 1열 */
.formgrid{display:grid;grid-template-columns:repeat(3,minmax(78px,max-content) minmax(0,1fr));gap:0;border:1px solid var(--line);border-right:0;border-bottom:0}
.formgrid>*{border-top:0;border-left:0;border-right:1px solid #b7c1ca;border-bottom:1px solid #b7c1ca;width:100%;min-width:0}
.formgrid .span2{grid-column:span 3}
.formgrid .span3{grid-column:span 5}
@media(max-width:1400px){.formgrid{grid-template-columns:repeat(2,minmax(78px,max-content) minmax(0,1fr))}.formgrid .span3{grid-column:span 3}}
@media(max-width:880px){.formgrid{grid-template-columns:minmax(78px,max-content) minmax(0,1fr)}.formgrid .span2,.formgrid .span3{grid-column:span 1}.body.two{grid-template-columns:1fr}}
html[data-mw="xs"] .formgrid{grid-template-columns:minmax(78px,max-content) minmax(0,1fr)}

/* 표 */
.tablewrap{flex:1;min-height:0;overflow:auto;background:#fff}
table{width:100%;border-collapse:collapse;table-layout:fixed}
th,td{border-bottom:1px solid #e0e6eb;border-right:1px solid #e0e6eb;padding:5px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
th{position:sticky;top:0;background:linear-gradient(#f5f8fa,#e6edf2);border-bottom:1px solid var(--line);font-weight:700;z-index:1}
td.c,th.c{text-align:center}td.r,th.r{text-align:right}
tbody tr:hover{background:#eef6fc}
tbody tr.sel,tbody tr.on{background:var(--sel);color:#fff}
tbody tr.sel a,tbody tr.on a{color:#fff}
td.num,td.money{text-align:right;font-variant-numeric:tabular-nums}
tr.dirty td:first-child{box-shadow:inset 3px 0 0 #f2a93b}
.empty{color:#8b98a4;text-align:center;padding:30px 0}

/* 목록행(카드형) — 사용자정보 등에서 사용 */
.group-title{height:25px;display:flex;align-items:center;padding:0 8px;background:#edf3f7;border-bottom:1px solid #c8d3dc;color:#3b556d;font-weight:700}
.row-item{display:grid;min-height:26px;border-bottom:1px solid #e0e6eb;cursor:pointer}
.row-item span{padding:5px 8px;border-right:1px solid #e0e6eb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row-item:hover{background:#eef6fc}.row-item.on{background:var(--sel);color:#fff}

/* 버튼 */
.actions{display:flex;flex-wrap:wrap;align-items:center;gap:5px;padding:3px}
.btn{height:29px;min-width:72px;padding:0 10px;border:1px solid #9ba8b4;background:linear-gradient(#fff,#dfe6eb);white-space:nowrap}
.btn:hover{background:#fff}
.btn:disabled{opacity:.45;cursor:default}
.btn.primary{background:linear-gradient(#f9ffff,#d2e7f6);color:#1e5e91;border-color:#7fa6c9}
.btn.warn{background:linear-gradient(#fff,#f7dede);color:#a12a2a;border-color:#c99}
.btn.pink{background:linear-gradient(#fff5fa,#f6cfe1);color:#8d2a5b;border-color:#d99ab8}
.btn.sm{height:24px;min-width:0;padding:0 8px;font-size:11px}

/* 토스트 */
#toast{position:fixed;left:50%;top:22px;transform:translateX(-50%) translateY(-14px);z-index:99999;padding:10px 22px;border-radius:4px;font-size:13px;color:#fff;background:#2e7d32;box-shadow:0 4px 16px rgba(0,0,0,.22);opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
#toast.err{background:#c62828}#toast.warn{background:#ef6c00}

/* 상세 팝업 */
.modal-bg{position:fixed;inset:0;background:rgba(20,28,35,.38);display:none;align-items:center;justify-content:center;z-index:1000}
.modal-bg.on{display:flex}
.modal{background:#fff;border:1px solid #7f8f9c;box-shadow:0 6px 24px rgba(0,0,0,.3);min-width:340px;max-width:min(920px,94vw);max-height:90vh;display:flex;flex-direction:column}
.modal .t{height:30px;display:flex;align-items:center;padding:0 12px;color:#fff;background:linear-gradient(#5f7f9f,#3f5f7d);font-weight:700}
.modal .t .x{margin-left:auto;cursor:pointer;font-size:16px}
.modal .bd{padding:12px;overflow:auto}
.modal .bt{padding:8px 12px;display:flex;justify-content:flex-end;gap:5px;background:#f7f9fa;border-top:1px solid #e3e9ed}

/* 모바일 */
@media(max-width:680px){
  .title{height:42px}.title h1{font-size:17px}
  .filters .field{width:100%}.filters .lab{width:100%}
  .body{padding:5px}.foot{flex-wrap:wrap;height:auto;min-height:40px}
  .actions .btn{flex:1 1 30%}
}
`;
