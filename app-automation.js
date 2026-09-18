/* ═══════════════ 빠른 자동설계 ═══════════════
   ① 화면 자동완성: 화면에 테이블이 없으면 만들고 → 기본 칼럼 → 키·필수 → 자동칼럼명 → 자동파일명 순서로 처리한다.
   ② 중분류 자동설계: 중분류 성격에 맞는 여러 화면을 선택해 만들고, 공용 업무 테이블과 기본 칼럼을 함께 구성한다.
   자동기능은 기존 칼럼/화면을 지우지 않고 없는 항목만 보완하는 것을 원칙으로 한다. */
const SECTION_SCREEN_PROFILE={
 production:{name:'생산',items:[
  {key:'prod_input',name:'생산실적 등록',kind:'input'},
  {key:'prod_status',name:'생산현황',kind:'status'},
  {key:'prod_dash',name:'생산대시보드',kind:'dash'}]},
 quality:{name:'품질·검사',items:[
  {key:'qa_input',name:'검사결과 등록',kind:'input'},
  {key:'qa_status',name:'검사결과 현황',kind:'status'},
  {key:'qa_defect',name:'불량현황',kind:'status'},
  {key:'qa_dash',name:'품질대시보드',kind:'dash'}]},
 die:{name:'금형',items:[
  {key:'die_master',name:'금형등록',kind:'input'},
  {key:'die_check',name:'금형점검 등록',kind:'input'},
  {key:'die_repair',name:'금형수리이력',kind:'input'},
  {key:'die_status',name:'금형현황',kind:'status'}]},
 safety:{name:'안전·위험성평가',items:[
  {key:'risk_input',name:'위험성평가 등록',kind:'input'},
  {key:'risk_action',name:'개선조치',kind:'input'},
  {key:'risk_status',name:'위험성평가 현황',kind:'status'},
  {key:'risk_dash',name:'안전대시보드',kind:'dash'}]},
 shipping:{name:'출하',items:[
  {key:'ship_input',name:'출하등록',kind:'input'},
  {key:'ship_status',name:'출하현황',kind:'status'},
  {key:'delivery_status',name:'납품현황',kind:'status'}]},
 purchase:{name:'구매·발주',items:[
  {key:'po_input',name:'발주등록',kind:'input'},
  {key:'po_status',name:'발주현황',kind:'status'},
  {key:'po_due',name:'납기현황',kind:'status'}]},
 order:{name:'수주·영업',items:[
  {key:'order_input',name:'수주등록',kind:'input'},
  {key:'order_status',name:'수주현황',kind:'status'},
  {key:'order_dash',name:'수주대시보드',kind:'dash'}]},
 material:{name:'자재·재고·물류',items:[
  {key:'mat_in',name:'자재입고',kind:'input'},
  {key:'mat_out',name:'자재출고',kind:'input'},
  {key:'stock_status',name:'재고현황',kind:'status'},
  {key:'stock_dash',name:'재고대시보드',kind:'dash'}]},
 equipment:{name:'설비·보전',items:[
  {key:'eq_master',name:'설비등록',kind:'input'},
  {key:'eq_check',name:'예방점검 등록',kind:'input'},
  {key:'eq_history',name:'고장이력',kind:'input'},
  {key:'eq_status',name:'설비현황',kind:'status'}]},
 hr:{name:'인사·교육',items:[
  {key:'emp_input',name:'사원정보',kind:'input'},
  {key:'attendance',name:'근태현황',kind:'status'},
  {key:'training',name:'교육이력',kind:'input'}]},
 esg:{name:'ESG·환경',items:[
  {key:'esg_input',name:'ESG 실적등록',kind:'input'},
  {key:'esg_status',name:'ESG 현황',kind:'status'},
  {key:'esg_dash',name:'ESG 대시보드',kind:'dash'}]},
 permission:{name:'사용자·권한',items:[
  {key:'user_info',name:'사용자정보',kind:'input'},
  {key:'permission',name:'권한관리',kind:'perm'}]},
 common:{name:'공통 업무',items:[
  {key:'common_input',name:'업무등록',kind:'input'},
  {key:'common_status',name:'업무현황',kind:'status'}]}
};
function sectionProfileId(sec){
 let mod=null;if(sec?.type==='section')mod=D.edges.filter(e=>e.kind==='contains'&&e.to===sec.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;
 const text=`${mod?.name||''} ${sec?.name||''}`;let id='common';
 if(/권한|사용자|계정/.test(text))id='permission';
 else if(/품질|검사|불량|측정|검측/.test(text))id='quality';
 else if(/금형|다이|die|몰드|mold/i.test(text))id='die';
 else if(/위험성|안전|재해|유해|산업안전/.test(text))id='safety';
 else if(/출하|납품|배송/.test(text))id='shipping';
 else if(/구매|발주|협력사/.test(text))id='purchase';
 else if(/수주|영업|견적|고객/.test(text))id='order';
 else if(/자재|재고|입고|출고|창고|물류/.test(text))id='material';
 else if(/설비|보전|보수|정비/.test(text))id='equipment';
 else if(/인사|사원|근태|교육|직원/.test(text))id='hr';
 else if(/ESG|환경|에너지|탄소|폐기물/i.test(text))id='esg';
 else if(/생산|작업|실적|공정/.test(text))id='production';
 return id;
}
function sectionDirectScreens(sec){
 return D.edges.filter(e=>e.kind==='contains'&&e.from===sec.id).map(e=>N(e.to)).filter(x=>x?.type==='screen');
}
function sameScreenName(a,b){return String(a||'').toLowerCase().replace(/[\s_\-·.()]/g,'')===String(b||'').toLowerCase().replace(/[\s_\-·.()]/g,'')}
function sectionScreenRecommendations(sec){const id=sectionProfileId(sec);return{id,profile:SECTION_SCREEN_PROFILE[id]||SECTION_SCREEN_PROFILE.common}}
function sectionAutoAssistantHtml(sec){
 const r=sectionScreenRecommendations(sec),existing=sectionDirectScreens(sec);
 const rows=r.profile.items.map((x,i)=>{const ex=existing.some(s=>sameScreenName(s.name,x.name));return `<label class="ck" style="padding:5px 8px 5px 26px;border:1px solid #e4e9f0;border-radius:5px;background:${ex?'#f5f6f8':'#fff'}"><input type="checkbox" data-sec-auto="${esc(x.key)}" ${ex?'disabled':'checked'}>${esc(x.name)} <span style="color:#8a94a6;font-size:11px">· ${x.kind==='input'?'등록':x.kind==='status'?'현황':x.kind==='dash'?'대시보드':x.kind==='perm'?'권한관리':x.kind}</span>${ex?' <b style="color:#2e7d5b;font-size:11px">이미 있음</b>':''}</label>`}).join('');
 return `<section class="src" style="margin-top:4px;background:#f9fbff"><h4>⚡ 중분류 화면 자동추천</h4>
  <div style="font-size:11.5px;color:#4a5568;line-height:1.6"><b>자동판정:</b> ${esc(r.profile.name)}형 · 필요한 화면을 고른 뒤 한 번에 만듭니다.<br><span style="color:#8a94a6">선택 화면에는 테이블 연결 · 기본 칼럼 · 키/필수 · 자동칼럼명 · 자동파일명까지 함께 적용합니다.</span></div>
  <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px">${rows}</div>
  <div class="acts"><button class="btn primary" id="autoCreateScreens">⚡ 선택 화면 한꺼번에 만들기</button><button class="btn" id="secAutoAll">전체 선택</button><button class="btn" id="secAutoNone">선택 해제</button></div>
 </section>`;
}
function uniqueTableName(base){
 base=String(base||'data').toLowerCase().replace(/[^a-z0-9_]+/g,'_').replace(/^_+|_+$/g,'')||'data';if(!/^[a-z_]/.test(base))base='t_'+base;base=base.slice(0,55);
 const used=new Set(D.nodes.filter(x=>x.type==='table').map(x=>String(x.name||'').toLowerCase()));let n=base,i=2;while(used.has(n))n=(base.slice(0,51)+'_'+i++);return n;
}
function autoTableNameForScreen(scr){
 const c=autoScreenFileContext(scr),sec=autoAbbrText(c.sec?.name||c.mod?.name||'공통','section')||'com',sc=autoAbbrText(scr.name||'화면','screen')||'scr';
 const st=new Set(sec.split('_')),rest=sc.split('_').filter(x=>x&&!st.has(x));return uniqueTableName([...sec.split('_'),...(rest.length?rest:['data'])].join('_'));
}
function createTableForScreen(scr){
 const t={id:uid(),type:'table',name:autoTableNameForScreen(scr),x:(scr.x||0)+270,y:scr.y||0,meta:{cols:[]}};D.nodes.push(t);D.edges.push({id:uid(),from:scr.id,to:t.id,kind:'uses',label:''});return t;
}
function firstUseTable(scr){return D.edges.filter(e=>e.kind==='uses'&&e.from===scr.id).map(e=>N(e.to)).find(x=>x?.type==='table')||null}
function autoCompleteScreen(scr,opts){
 opts=opts||{};if(!scr||scr.type!=='screen')return null;let t=opts.table||firstUseTable(scr),created=false;
 if(!t){t=createTableForScreen(scr);created=true}else if(!D.edges.some(e=>e.kind==='uses'&&e.from===scr.id&&e.to===t.id))D.edges.push({id:uid(),from:scr.id,to:t.id,kind:'uses',label:''});
 const before=(t.meta?.cols||[]).length;addRecommendedBasicColumns(t);const added=(t.meta?.cols||[]).length-before;autoKeyRequired(t);autoColumnNames(t);autoScreenFileName(scr);save();
 if(!opts.quiet)$('stat').textContent=`⚡ 화면 자동완성 완료 · ${scr.name} · ${created?'테이블 새로 생성':'기존 테이블 사용'}(${t.name}) · 기본 칼럼 ${added}개 추가 · 키/필수 · 자동칼럼명 · 자동파일명 적용`;
 return{table:t,created,added};
}
function sectionPrimaryTable(sec){
 const screens=sectionDirectScreens(sec).sort((a,b)=>(a.meta?.kind==='input'?-1:0)-(b.meta?.kind==='input'?-1:0));
 for(const s of screens){const t=firstUseTable(s);if(t)return t}return null;
}
function createRecommendedScreens(sec,keys){
 if(!sec||sec.type!=='section')return;const r=sectionScreenRecommendations(sec),want=new Set(keys||[]),specs=r.profile.items.filter(x=>want.has(x.key));
 if(!specs.length){$('stat').textContent='⚡ 만들 화면을 하나 이상 선택하세요.';return}
 const existing=sectionDirectScreens(sec),created=[];let shared=sectionPrimaryTable(sec),tableWasNew=false;
 const baseY=existing.length?Math.max(...existing.map(x=>x.y||0))+84:(sec.y||0),sx=(sec.x||0)+230;
 for(const sp of specs){if(existing.some(x=>sameScreenName(x.name,sp.name)))continue;const scr={id:uid(),type:'screen',name:sp.name,x:sx,y:baseY+created.length*84,meta:{file:'',kind:sp.kind}};D.nodes.push(scr);D.edges.push({id:uid(),from:sec.id,to:scr.id,kind:'contains',label:''});created.push(scr)}
 if(!created.length){$('stat').textContent='⚡ 선택한 화면은 이미 모두 만들어져 있습니다.';return}
 if(!shared){shared=createTableForScreen(created[0]);tableWasNew=true}
 for(const scr of created){if(!D.edges.some(e=>e.kind==='uses'&&e.from===scr.id&&e.to===shared.id))D.edges.push({id:uid(),from:scr.id,to:shared.id,kind:'uses',label:''})}
 const before=(shared.meta?.cols||[]).length;addRecommendedBasicColumns(shared);const added=(shared.meta?.cols||[]).length-before;autoKeyRequired(shared);autoColumnNames(shared);for(const scr of created)autoScreenFileName(scr);save();
 select({node:sec.id});$('stat').textContent=`⚡ 중분류 자동설계 완료 · ${r.profile.name}형 · 화면 ${created.length}개 생성 · ${tableWasNew?'공용 테이블 생성':'기존 테이블 사용'}(${shared.name}) · 기본 칼럼 ${added}개 추가 · 파일명/칼럼명/키·필수 자동 적용`;
}

/* ═══════════════ 자동 컬럼명 ═══════════════
   테이블이 연결된 중분류 → 화면 → 라벨을 읽어 영문 약자를 조합한다.
   예) 생산관리 → 생산실적등록 → 작업일자 = prod_perf_reg_work_dt
   사전에 없는 한글은 초성 기반 영문 코드로 보완한다. */
const AUTO_SEC_EXACT={
 '생산관리':'prod','품질관리':'qa','금형관리':'die','자재관리':'mat','수주관리':'ord','출하관리':'ship','설비관리':'eqp','안전관리':'safe','구매관리':'pur','재고관리':'inv','인사관리':'hr','영업관리':'sales','기준정보':'master','공정관리':'proc','원가관리':'cost','물류관리':'logi','개발관리':'dev','프로젝트관리':'prj','환경관리':'env','ESG관리':'esg','위험성평가':'risk'
};
const AUTO_SCR_EXACT={
 '생산실적등록':'perf_reg','생산실적':'perf','생산현황':'prod_sts','수주등록':'ord_reg','수주현황':'ord_sts','수주대시보드':'ord_dash','출하등록':'ship_reg','출하현황':'ship_sts','품질검사등록':'insp_reg','불량현황':'defect_sts','금형점검':'die_chk','금형점검등록':'die_chk_reg','자재입고':'mat_rcv','자재출고':'mat_iss','위험성평가':'risk_eval','개선조치':'imp_act','사용자정보':'user','권한관리':'perm'
};
const AUTO_LBL_EXACT={
 '작업일자':'work_dt','작업자':'worker','작업자명':'worker','설비':'eqp','설비명':'eqp','품번':'item_no','품목':'item','품목명':'item','수량':'qty','계획수량':'plan_qty','실적수량':'result_qty','양품수량':'good_qty','불량수량':'defect_qty','불량률':'defect_rate','달성률':'ach_rate','단가':'price','금액':'amt','수주번호':'ord_no','발주번호':'po_no','출하번호':'ship_no','납기일':'due_dt','완료예정일':'due_dt','입고수량':'rcv_qty','출고수량':'iss_qty','발주수량':'po_qty','작성자':'writer','작성일':'write_dt','검토자':'reviewer','검토일':'review_dt','확인자':'confirmer','확인일':'confirm_dt','승인자':'approver','승인일':'approve_dt','승인상태':'appr_sts','반려사유':'reject_reason','비고':'rmk','수정일':'upd_dt','수정일시':'upd_at','등록일':'reg_dt','등록일시':'reg_at','코드':'cd','명칭':'name','이름':'name','상태':'sts','구분':'type','일자':'dt','날짜':'dt','일시':'at'
};
const AUTO_KO_TERMS=[
 ['완료예정일','due_dt'],['반려사유','reject_reason'],['생산실적','perf'],['품질검사','insp'],['사용여부','active'],['계획수량','plan_qty'],['실적수량','result_qty'],['양품수량','good_qty'],['불량수량','defect_qty'],['발주수량','po_qty'],['입고수량','rcv_qty'],['출고수량','iss_qty'],['수주번호','ord_no'],['발주번호','po_no'],['출하번호','ship_no'],['작업일자','work_dt'],['전화번호','tel'],['휴대폰번호','mobile'],['프로젝트','prj'],['대시보드','dash'],['위험성','risk'],['거래처','vendor'],['고객사','customer'],['완료예정','due'],
 ['생산','prod'],['실적','perf'],['등록','reg'],['현황','sts'],['품질','qa'],['검사','insp'],['불량','defect'],['금형','die'],['점검','chk'],['수주','ord'],['발주','po'],['출하','ship'],['출고','iss'],['입고','rcv'],['자재','mat'],['설비','eqp'],['공정','proc'],['안전','safe'],['위험','risk'],['평가','eval'],['개선','imp'],['조치','act'],['계획','plan'],['작업자','worker'],['담당자','owner'],['작업','work'],['지시','inst'],['고객','customer'],['품번','item_no'],['품목','item'],['제품','product'],['차종','model'],['일자','dt'],['날짜','dt'],['일시','at'],['시간','time'],['수량','qty'],['단가','price'],['금액','amt'],['번호','no'],['코드','cd'],['명칭','name'],['이름','name'],['구분','type'],['유형','type'],['상태','sts'],['단계','step'],['순번','seq'],['사번','emp_no'],['로트','lot'],['LOT','lot'],['비고','rmk'],['재질','matl'],['두께','thk'],['중량','wt'],['폭','wid'],['피치','pitch'],['길이','len'],['높이','hgt'],['외경','od'],['내경','id'],['온도','temp'],['습도','hum'],['압력','press'],['속도','speed'],['횟수','cnt'],['사유','reason'],['원인','cause'],['대책','counter'],['결과','result'],['판정','judg'],['기준','std'],['완료','done'],['예정','plan'],['납기','due'],['요청','req'],['작성자','writer'],['작성','write'],['검토자','reviewer'],['검토','review'],['확인자','confirmer'],['확인','confirm'],['승인자','approver'],['승인','approve'],['반려','reject'],['수정','upd'],['생성','crt'],['이메일','email'],['전화','tel'],['휴대폰','mobile'],['부서','dept'],['공장','plant'],['사업부','biz'],['사용','use'],['활성','active'],['주소','addr'],['제목','title'],['내용','content'],['설명','desc'],['첨부','attach'],['파일','file'],['사진','img'],['양품','good'],['불량률','defect_rate'],['관리','mgt']
].sort((a,b)=>b[0].length-a[0].length);
const AUTO_EN_ABBR={production:'prod',management:'mgt',manager:'mgr',registration:'reg',register:'reg',status:'sts',performance:'perf',quantity:'qty',number:'no',date:'dt',datetime:'at',equipment:'eqp',inspection:'insp',quality:'qa',material:'mat',shipping:'ship',shipment:'ship',customer:'cust',project:'prj',department:'dept',amount:'amt',price:'price',weight:'wt',width:'wid',height:'hgt',length:'len',remark:'rmk',remarks:'rmk',description:'desc'};
function hangulInitialCode(s){
 const onset=['g','gg','n','d','dd','r','m','b','bb','s','ss','','j','jj','c','k','t','p','h'];let out='';
 for(const ch of String(s||'')){const cp=ch.charCodeAt(0);if(cp>=0xAC00&&cp<=0xD7A3){const i=Math.floor((cp-0xAC00)/588);out+=onset[i]||'x'}}
 return out.slice(0,8);
}
function autoAbbrText(text,role){
 let raw=String(text||'').trim();if(!raw)return '';
 const exact=role==='section'?AUTO_SEC_EXACT[raw]:role==='screen'?AUTO_SCR_EXACT[raw]:AUTO_LBL_EXACT[raw];if(exact)return exact;
 raw=raw.replace(/\([^)]*\)|\[[^\]]*\]/g,' ').trim();
 const original=raw;let work=raw.replace(/([a-z0-9])([A-Z])/g,'$1_$2');
 for(const [ko,en] of AUTO_KO_TERMS)work=work.split(ko).join(' '+en+' ');
 work=work.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]+/g,' ').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_+|_+$/g,'').toLowerCase();
 let tok=work.split('_').filter(Boolean).map(x=>AUTO_EN_ABBR[x]||x);
 if(role==='section'&&tok.length>1)tok=tok.filter(x=>x!=='mgt');
 let code=tok.join('_').replace(/_+/g,'_');
 if(!code&&/[가-힣]/.test(original))code=hangulInitialCode(original);
 return code;
}
function autoColumnContext(t){
 const screens=D.edges.filter(e=>e.kind==='uses'&&e.to===t.id).map(e=>N(e.from)).filter(x=>x&&x.type==='screen');
 const scr=screens.find(x=>x.meta?.kind==='input')||screens[0]||null;
 let sec=null,mod=null;
 if(scr){sec=D.edges.filter(e=>e.kind==='contains'&&e.to===scr.id).map(e=>N(e.from)).find(x=>x?.type==='section')||null;
  if(sec)mod=D.edges.filter(e=>e.kind==='contains'&&e.to===sec.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;
  else mod=D.edges.filter(e=>e.kind==='contains'&&e.to===scr.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;}
 return{scr,sec,mod};
}
function autoScreenFileContext(scr){
 let sec=D.edges.filter(e=>e.kind==='contains'&&e.to===scr.id).map(e=>N(e.from)).find(x=>x?.type==='section')||null;
 let mod=null;if(sec)mod=D.edges.filter(e=>e.kind==='contains'&&e.to===sec.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;
 else mod=D.edges.filter(e=>e.kind==='contains'&&e.to===scr.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;
 const tables=D.edges.filter(e=>e.kind==='uses'&&e.from===scr.id).map(e=>N(e.to)).filter(x=>x?.type==='table');
 let table=null,col=null;
 for(const t of tables){const cs=t.meta?.cols||[];
  const pick=cs.find(c=>c.pk&&String(c.label||'').trim())||cs.find(c=>String(c.label||'').trim()&&!['비고','수정일','수정일시','등록일','등록일시','작성일'].includes(String(c.label||'').trim()))||cs.find(c=>String(c.label||'').trim());
  if(pick){table=t;col=pick;break}
 }
 return{sec,mod,table,col};
}
function autoScreenFileName(scr){
 if(!scr||scr.type!=='screen')return;
 const ctx=autoScreenFileContext(scr),secName=ctx.sec?.name||ctx.mod?.name||'공통',screenName=scr.name||'화면',label=String(ctx.col?.label||'').trim();
 const sec=autoAbbrText(secName,'section')||'com',screen=autoAbbrText(screenName,'screen')||'scr',lab=autoAbbrText(label,'label');
 const seen=new Set(),tokens=[...sec.split('_'),...screen.split('_'),...(lab?lab.split('_'):[])].filter(x=>x&&!seen.has(x)&&(seen.add(x),true));
 let base=tokens.join('_').replace(/_+/g,'_').replace(/^_+|_+$/g,'').toLowerCase()||'screen';
 if(!/^[a-z]/.test(base))base='scr_'+base;base=base.slice(0,72).replace(/_+$/,'');
 const taken=new Set(D.nodes.filter(x=>x.type==='screen'&&x.id!==scr.id).map(x=>String(x.meta?.file||'').split('?')[0].toLowerCase()));
 let fn=base+'.html',i=2;while(taken.has(fn.toLowerCase()))fn=base.slice(0,68)+'_'+i+++'.html';
 scr.meta.file=fn;save();
 const path=`${ctx.sec?.name||ctx.mod?.name||'공통'} → ${screenName}${label?' → '+label:''}`;
 $('stat').textContent=`⚡ 자동파일명 적용: ${fn} · 기준: ${path}${label?'':' · 연결 테이블의 라벨이 없어 중분류+화면만 사용'}`;
}

function autoColumnNames(t){
 const cols=t?.meta?.cols||[];if(!cols.length){$('stat').textContent='⚡ 자동칼럼명 — 컬럼이 없습니다.';return}
 const ctx=autoColumnContext(t),secName=ctx.sec?.name||ctx.mod?.name||'공통',scrName=ctx.scr?.name||t.name||'화면';
 let sec=autoAbbrText(secName,'section')||'com',scr=autoAbbrText(scrName,'screen')||'scr';
 const secTok=new Set(sec.split('_').filter(Boolean));let scrTok=scr.split('_').filter(x=>x&&!secTok.has(x));if(!scrTok.length)scrTok=['scr'];scr=scrTok.join('_');
 const used=new Set(),rename={};let changed=0,skipped=0;
 for(let i=0;i<cols.length;i++){
  const c=cols[i],old=String(c.name||'').trim(),lab=String(c.label||'').trim();let fld=autoAbbrText(lab,'label');
  if(!fld){if(/^[a-z_][a-z0-9_]*$/i.test(old))fld=old.toLowerCase();else fld='fld'+String(i+1).padStart(2,'0');skipped++}
  const seen=new Set(),parts=[...sec.split('_'),...scr.split('_'),...fld.split('_')].filter(x=>x&&!seen.has(x)&&(seen.add(x),true));
  let base=parts.join('_').replace(/_+/g,'_').replace(/^_+|_+$/g,'').toLowerCase();if(!/^[a-z_]/.test(base))base='f_'+base;
  base=base.slice(0,60).replace(/_+$/,'')||('field_'+(i+1));let name=base,n=2;while(used.has(name))name=(base.slice(0,57)+'_'+n++);used.add(name);
  if(old!==name){rename[old]=name;c.name=name;changed++}
 }
 const rkeys=Object.keys(rename).filter(Boolean);
 if(rkeys.length){
  for(const c of cols)if(c.formula)c.formula=String(c.formula).replace(/[A-Za-z_][A-Za-z0-9_]*/g,m=>rename[m]||m);
  if(t.meta?.alert?.dateCol&&rename[t.meta.alert.dateCol])t.meta.alert.dateCol=rename[t.meta.alert.dateCol];
  if(t.meta?.approval?.statusCol&&rename[t.meta.approval.statusCol])t.meta.approval.statusCol=rename[t.meta.approval.statusCol];
 }
 save();
 const path=`${ctx.sec?.name||ctx.mod?.name||'공통'} → ${ctx.scr?.name||'(연결 화면 없음)'}`;
 $('stat').textContent=`⚡ 자동칼럼명 ${changed}개 적용 · 기준: ${path}${skipped?' · 약자 미등록 라벨 '+skipped+'개는 기존명/자동코드 사용':''}`;
}


/* ═══════════════ 기본키 · 필수 자동선택 ═══════════════
   - 기본키: ID/키/번호/코드/제번 등 고유값 성격의 항목을 우선 판정한다.
   - 복합 기본키가 이미 2개 이상이면 사용자가 의도한 것으로 보고 유지한다.
   - 필수: 기본키 + 날짜/대상/작업자/수량 등 핵심 업무 항목을 체크한다.
   - 비고/메모/첨부/사진/감사(수정·승인 등) 항목은 자동 필수에서 제외한다.
   자동판정 후 사용자가 체크를 자유롭게 바꿀 수 있다. */
function autoKeyRequired(t){
 const cols=t?.meta?.cols||[];
 if(!cols.length){$('stat').textContent='⚡ 키·필수 자동선택 — 컬럼이 없습니다.';return}
 const txt=c=>(String(c.label||'')+' '+String(c.name||'')).toLowerCase().replace(/\s+/g,' ');
 const label=c=>String(c.label||'').trim();
 const name=c=>String(c.name||'').trim().toLowerCase();
 const isCalc=c=>c.formula!==undefined||c.calc;
 const optionalRe=/(비고|메모|특기|설명|상세|내용|첨부|사진|이미지|파일|remark|memo|note|desc|attach|photo|image|file|수정일|수정일시|updated|created_at|생성일|등록일시|검토일|확인일|승인일|반려사유|전화|휴대폰|이메일|주소)/i;
 const pkScore=c=>{
  if(isCalc(c))return -999;
  const l=label(c),n=name(c),x=txt(c);let sc=0;
  /* 라벨을 가장 신뢰하고, 컬럼명은 보조로 사용한다. */
  if(/(^|[^a-z])(id|key)([^a-z]|$)/i.test(n)||/(식별키|고유키|기본키|아이디|ID)$/i.test(l))sc+=120;
  if(/(번호|제번)$/i.test(l)||/(^|_)(no|number)$/i.test(n))sc+=105;
  if(/코드$/i.test(l)||/(^|_)(code|cd)$/i.test(n))sc+=95;
  if(/번호|제번|코드|식별|키|ID/i.test(l))sc+=35;
  if(/(_id|_key|_no|_code)$/.test(n))sc+=30;
  if(/(일자|날짜|시간|수량|금액|단가|비고|상태|구분|이름|명칭|작업자|담당자|검사자|결과|판정)$/i.test(l))sc-=55;
  if(optionalRe.test(x))sc-=80;
  if(c.type==='bool')sc-=80;
  return sc;
 };
 let pkCols=cols.filter(c=>c.pk&&!isCalc(c)),pkMsg='';
 if(pkCols.length>=2){
  pkCols.forEach(c=>c.req=true);pkMsg=`복합 기본키 ${pkCols.length}개 유지`;
 }else{
  let best=null,bestScore=-999;
  for(const c of cols){const sc=pkScore(c);if(sc>bestScore){best=c;bestScore=sc}}
  const current=pkCols[0]||null,currentScore=current?pkScore(current):-999;
  /* 기존 키가 충분히 그럴듯하면 유지하고, 약한 키보다 훨씬 좋은 후보가 있으면 교체한다. */
  let pick=current;
  if(!pick||(best&&bestScore>=70&&bestScore>currentScore+25))pick=best;
  if(pick&&pkScore(pick)>=45){
   cols.forEach(c=>{if(!isCalc(c))c.pk=(c===pick)});pick.pk=true;pick.req=true;
   pkMsg=`기본키: ${label(pick)||name(pick)}`;
  }else{
   if(current&&currentScore<45)current.pk=false;
   pkMsg='기본키 후보 없음 (번호·코드·ID 항목 확인 필요)';
  }
 }
 const requiredRe=/(번호|제번|코드|ID|아이디|일자|작업일|검사일|수주일|발주일|출하일|입고일|품번|품목|품명|제품|설비|작업자|담당자|검사자|거래처|고객사|공정|금형|수량|판정|검사결과|결과명|제목)/i;
 const reqNameRe=/(^|_)(id|key|no|code|work_date|inspect_date|order_date|ship_date|item_no|item_code|item_name|machine|equipment|worker|inspector|customer|vendor|process|mold|qty|quantity|judg|result|title)(_|$)/i;
 let added=0;
 for(const c of cols){
  if(isCalc(c))continue;
  if(c.pk){if(!c.req){c.req=true;added++}continue}
  const x=txt(c),l=label(c),n=name(c);
  if(optionalRe.test(x)||c.type==='bool'||/(상태|진행상태|승인상태|구분|유형|순번|단계)$/i.test(l))continue;
  if(requiredRe.test(l)||reqNameRe.test(n)){if(!c.req){c.req=true;added++}}
 }
 save();
 const reqCount=cols.filter(c=>c.req).length;
 $('stat').textContent=`⚡ 키·필수 자동선택 완료 · ${pkMsg} · 필수 ${reqCount}개${added?` (${added}개 자동 추가)`:''} · 자동선택 후 직접 수정 가능`;
}


/* ═══════════════ 기본 칼럼 도우미 ═══════════════
   1) 자동: 연결된 중분류·화면명·화면종류를 읽어 일반적으로 필요한 칼럼을 추천/추가한다.
   2) 수동: 현재 설계의 전체 모듈에 있는 테이블 칼럼을 드롭다운으로 모아 현재 테이블에 복사한다.
   - 기존 칼럼은 지우지 않는다.
   - 같은 라벨/같은 이름은 중복 추가하지 않는다.
   - 다른 모듈 칼럼을 가져와도 이름은 현재 중분류 → 화면 → 라벨 기준으로 다시 만든다. */
const BASIC_COL_LIBRARY={
 record_no:{label:'관리번호',type:'text',sample:'REC-001',req:true,pk:true},
 work_no:{label:'작업번호',type:'text',sample:'W-001',req:true,pk:true},
 work_date:{label:'작업일자',type:'date',sample:'2026-09-19',req:true},
 worker:{label:'작업자',type:'text',sample:'홍길동',req:true},
 process:{label:'공정',type:'text',sample:'PRESS',req:true},
 equipment:{label:'설비',type:'text',sample:'300T-01',req:true},
 item_no:{label:'품번',type:'text',sample:'A-100',req:true},
 item_name:{label:'품명',type:'text',sample:'BRACKET'},
 plan_qty:{label:'계획수량',type:'num',sample:'1000'},
 result_qty:{label:'실적수량',type:'num',sample:'980',req:true},
 good_qty:{label:'양품수량',type:'num',sample:'970'},
 defect_qty:{label:'불량수량',type:'num',sample:'10'},
 qty:{label:'수량',type:'num',sample:'100',req:true},
 status:{label:'상태',type:'text',sample:'진행'},
 remark:{label:'비고',type:'text',sample:''},
 updated_at:{label:'수정일',type:'date',sample:'2026-09-19'},
 created_at:{label:'등록일',type:'date',sample:'2026-09-19'},
 insp_no:{label:'검사번호',type:'text',sample:'INSP-001',req:true,pk:true},
 insp_date:{label:'검사일자',type:'date',sample:'2026-09-19',req:true},
 inspector:{label:'검사자',type:'text',sample:'김검사',req:true},
 insp_qty:{label:'검사수량',type:'num',sample:'100',req:true},
 lot_no:{label:'LOT',type:'text',sample:'L260919-01'},
 judgement:{label:'판정',type:'text',sample:'OK',req:true},
 defect_type:{label:'불량유형',type:'text',sample:'찍힘'},
 die_no:{label:'금형번호',type:'text',sample:'DIE-001',req:true,pk:true},
 check_date:{label:'점검일자',type:'date',sample:'2026-09-19',req:true},
 checker:{label:'점검자',type:'text',sample:'홍점검',req:true},
 hit_count:{label:'누적타수',type:'num',sample:'125000'},
 die_status:{label:'금형상태',type:'text',sample:'정상'},
 problem:{label:'이상내용',type:'text',sample:''},
 action:{label:'조치내용',type:'text',sample:''},
 next_due:{label:'다음점검일',type:'date',sample:'2026-10-19'},
 order_no:{label:'수주번호',type:'text',sample:'ORD-001',req:true,pk:true},
 order_date:{label:'수주일자',type:'date',sample:'2026-09-19',req:true},
 customer:{label:'고객사',type:'text',sample:'A사',req:true},
 due_date:{label:'납기일',type:'date',sample:'2026-09-30',req:true},
 unit_price:{label:'단가',type:'num',sample:'2500'},
 amount:{label:'금액',type:'num',sample:'250000'},
 ship_no:{label:'출하번호',type:'text',sample:'SHIP-001',req:true,pk:true},
 ship_date:{label:'출하일자',type:'date',sample:'2026-09-19',req:true},
 destination:{label:'납품처',type:'text',sample:'A공장'},
 vehicle_no:{label:'차량번호',type:'text',sample:'12가3456'},
 po_no:{label:'발주번호',type:'text',sample:'PO-001',req:true,pk:true},
 po_date:{label:'발주일자',type:'date',sample:'2026-09-19',req:true},
 vendor:{label:'거래처',type:'text',sample:'B사',req:true},
 material_code:{label:'자재코드',type:'text',sample:'MAT-001',req:true},
 material_name:{label:'자재명',type:'text',sample:'SPCC 1.0T'},
 txn_no:{label:'입출고번호',type:'text',sample:'TXN-001',req:true,pk:true},
 txn_date:{label:'입출고일자',type:'date',sample:'2026-09-19',req:true},
 warehouse:{label:'창고',type:'text',sample:'원자재창고'},
 location:{label:'위치',type:'text',sample:'A-01'},
 unit:{label:'단위',type:'text',sample:'EA'},
 equipment_no:{label:'설비번호',type:'text',sample:'EQ-001',req:true,pk:true},
 equipment_name:{label:'설비명',type:'text',sample:'300T PRESS',req:true},
 result:{label:'결과',type:'text',sample:'정상'},
 risk_no:{label:'평가번호',type:'text',sample:'RA-001',req:true,pk:true},
 eval_date:{label:'평가일자',type:'date',sample:'2026-09-19',req:true},
 work_name:{label:'작업명',type:'text',sample:'금형 교체',req:true},
 hazard:{label:'유해위험요인',type:'text',sample:'협착',req:true},
 risk_before:{label:'현재위험도',type:'num',sample:'9',req:true},
 countermeasure:{label:'개선대책',type:'text',sample:'안전블록 사용',req:true},
 risk_after:{label:'개선후위험도',type:'num',sample:'3'},
 owner:{label:'담당자',type:'text',sample:'홍길동',req:true},
 done_date:{label:'완료일',type:'date',sample:'2026-09-25'},
 emp_no:{label:'사번',type:'text',sample:'E001',req:true,pk:true},
 emp_name:{label:'성명',type:'text',sample:'홍길동',req:true},
 department:{label:'부서',type:'text',sample:'생산팀',req:true},
 position:{label:'직위',type:'text',sample:'주임'},
 join_date:{label:'입사일',type:'date',sample:'2020-01-01'},
 phone:{label:'연락처',type:'text',sample:'010-0000-0000'},
 active:{label:'사용여부',type:'bool',sample:'true'},
 category:{label:'구분',type:'text',sample:'에너지'},
 target:{label:'목표',type:'num',sample:'100'},
 result_value:{label:'실적값',type:'num',sample:'95'},
 title:{label:'제목',type:'text',sample:'업무 제목',req:true},
 user_key:{label:'사용자키',type:'text',sample:'U0001',req:true,pk:true},
 user_name:{label:'사용자명',type:'text',sample:'홍길동',req:true}
};
const BASIC_PROFILE={
 production:{name:'생산',keys:['work_no','work_date','item_no','process','equipment','worker','plan_qty','result_qty','good_qty','defect_qty','status','remark']},
 quality:{name:'품질·검사',keys:['insp_no','insp_date','item_no','lot_no','process','inspector','insp_qty','defect_qty','judgement','defect_type','status','remark']},
 die:{name:'금형',keys:['die_no','item_no','check_date','checker','hit_count','die_status','problem','action','next_due','remark']},
 order:{name:'수주·영업',keys:['order_no','order_date','customer','item_no','item_name','qty','due_date','unit_price','amount','status','remark']},
 shipping:{name:'출하',keys:['ship_no','ship_date','customer','item_no','item_name','qty','destination','vehicle_no','status','remark']},
 purchase:{name:'구매·발주',keys:['po_no','po_date','vendor','item_no','material_code','material_name','qty','unit_price','amount','due_date','status','remark']},
 material:{name:'자재·재고·물류',keys:['txn_no','txn_date','material_code','material_name','lot_no','warehouse','location','qty','unit','status','remark']},
 equipment:{name:'설비·보전',keys:['equipment_no','equipment_name','check_date','checker','result','problem','action','next_due','status','remark']},
 safety:{name:'안전·위험성평가',keys:['risk_no','eval_date','process','work_name','hazard','risk_before','countermeasure','risk_after','owner','due_date','done_date','status','remark']},
 hr:{name:'인사·사용자',keys:['emp_no','emp_name','department','position','join_date','phone','active','remark']},
 esg:{name:'ESG·환경',keys:['eval_date','category','title','target','result_value','unit','judgement','owner','status','remark']},
 permission:{name:'사용자·권한',keys:['user_key','user_name','department','active','remark']},
 common:{name:'공통 업무',keys:['record_no','work_date','title','owner','status','remark']}
};
function basicColNorm(s){return String(s||'').toLowerCase().replace(/[\s_\-·.()\[\]\/]/g,'')}
function tableContextAll(t){
 const screens=D.edges.filter(e=>e.kind==='uses'&&e.to===t.id).map(e=>N(e.from)).filter(x=>x?.type==='screen');
 const sections=[],modules=[];
 for(const scr of screens){
  const sec=D.edges.filter(e=>e.kind==='contains'&&e.to===scr.id).map(e=>N(e.from)).find(x=>x?.type==='section')||null;
  let mod=null;if(sec)mod=D.edges.filter(e=>e.kind==='contains'&&e.to===sec.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;
  else mod=D.edges.filter(e=>e.kind==='contains'&&e.to===scr.id).map(e=>N(e.from)).find(x=>x?.type==='module')||null;
  if(sec&&!sections.some(x=>x.id===sec.id))sections.push(sec);if(mod&&!modules.some(x=>x.id===mod.id))modules.push(mod);
 }
 return{screens,sections,modules};
}
function recommendedBasicColumns(t){
 const a=tableContextAll(t),ctx=autoColumnContext(t);
 const text=[...a.modules.map(x=>x.name),...a.sections.map(x=>x.name),...a.screens.map(x=>x.name),t?.name||''].join(' ');
 const kinds=a.screens.map(x=>x.meta?.kind||'');let id='common';
 if(/권한|사용자|계정/.test(text)||kinds.includes('perm'))id='permission';
 else if(/품질|검사|불량|측정|검측/.test(text))id='quality';
 else if(/금형|다이|die|몰드|mold/i.test(text))id='die';
 else if(/위험성|안전|재해|유해|산업안전/.test(text))id='safety';
 else if(/출하|납품|배송/.test(text))id='shipping';
 else if(/구매|발주|협력사/.test(text))id='purchase';
 else if(/수주|영업|견적|고객/.test(text))id='order';
 else if(/자재|재고|입고|출고|창고|물류/.test(text))id='material';
 else if(/설비|보전|보수|정비/.test(text))id='equipment';
 else if(/인사|사원|근태|교육|직원/.test(text))id='hr';
 else if(/ESG|환경|에너지|탄소|폐기물/i.test(text))id='esg';
 else if(/생산|작업|실적|공정/.test(text))id='production';
 let keys=[...BASIC_PROFILE[id].keys];
 if(kinds.includes('check'))keys=[...keys.slice(0,-2),'check_date','checker','judgement','action','status','remark'];
 if(kinds.includes('board'))keys=[...keys,'owner','due_date','status'];
 keys=[...new Set(keys.filter(k=>BASIC_COL_LIBRARY[k]))];
 const path=`${ctx.mod?.name||a.modules[0]?.name||'공통'} → ${ctx.sec?.name||a.sections[0]?.name||'미분류'} → ${ctx.scr?.name||a.screens[0]?.name||'연결 화면 없음'}`;
 return{id,profile:BASIC_PROFILE[id].name,keys,path};
}
function makeBasicColumnName(t,label,fallback){
 const ctx=autoColumnContext(t),sec=autoAbbrText(ctx.sec?.name||ctx.mod?.name||'공통','section')||'com',scr0=autoAbbrText(ctx.scr?.name||t.name||'화면','screen')||'scr';
 const secTok=new Set(sec.split('_').filter(Boolean));let scr=scr0.split('_').filter(x=>x&&!secTok.has(x));if(!scr.length)scr=['scr'];
 let fld=autoAbbrText(label,'label');
 if(!fld&&fallback&&/^[a-z_][a-z0-9_]*$/i.test(fallback))fld=String(fallback).toLowerCase().split('_').slice(-2).join('_');
 if(!fld)fld='field';
 const seen=new Set(),parts=[...sec.split('_'),...scr,...fld.split('_')].filter(x=>x&&!seen.has(x)&&(seen.add(x),true));
 let base=parts.join('_').replace(/_+/g,'_').replace(/^_+|_+$/g,'').toLowerCase();if(!/^[a-z_]/.test(base))base='f_'+base;base=base.slice(0,60).replace(/_+$/,'')||'field';
 const used=new Set((t.meta?.cols||[]).map(c=>String(c.name||'').toLowerCase()));let name=base,i=2;while(used.has(name))name=(base.slice(0,56)+'_'+i++);return name;
}
function hasBasicColumn(t,def){
 const ln=basicColNorm(def.label),nn=basicColNorm(def.name);
 return (t.meta?.cols||[]).some(c=>basicColNorm(c.label)===ln||(nn&&basicColNorm(c.name)===nn));
}
function addBasicColumnDef(t,def){
 if(!t||!def)return false;t.meta.cols=t.meta.cols||[];
 const d={...def};if(hasBasicColumn(t,d))return false;
 const c={name:makeBasicColumnName(t,d.label,d.name),label:d.label||d.name||'항목',type:d.type||'text'};
 if(d.sample!==undefined)c.sample=d.sample;if(d.req)c.req=true;if(d.unit)c.unit=d.unit;if(d.decimals!==undefined)c.decimals=d.decimals;
 if(d.flow)c.flow=d.flow;if(d.pk&&!t.meta.cols.some(x=>x.pk)){c.pk=true;c.req=true}
 t.meta.cols.push(c);return true;
}
function addRecommendedBasicColumns(t){
 const r=recommendedBasicColumns(t);let added=0;
 for(const k of r.keys)if(addBasicColumnDef(t,BASIC_COL_LIBRARY[k]))added++;
 save();
 $('stat').textContent=`🧩 기본 칼럼 자동추가 · ${r.profile}형 · ${added}개 추가${added?'':' (이미 모두 있음)'} · 기존 칼럼은 유지 · 기준: ${r.path}`;
}
function allModuleColumnSources(current){
 const rows=[];for(const t of D.nodes.filter(x=>x.type==='table'&&x.id!==current.id)){
  const ctx=autoColumnContext(t),mod=ctx.mod?.name||'미연결/공통',sec=ctx.sec?.name||'미분류',scr=ctx.scr?.name||'화면 없음';
  (t.meta?.cols||[]).forEach((c,i)=>{if(c.formula!==undefined||c.calc)return;const label=String(c.label||c.name||'').trim();if(!label)return;rows.push({table:t,index:i,col:c,mod,sec,scr})});
 }
 const curMod=autoColumnContext(current).mod?.name||'';
 rows.sort((a,b)=>(a.mod===curMod?-1:0)-(b.mod===curMod?-1:0)||a.mod.localeCompare(b.mod,'ko')||a.sec.localeCompare(b.sec,'ko')||a.scr.localeCompare(b.scr,'ko')||String(a.col.label||a.col.name).localeCompare(String(b.col.label||b.col.name),'ko'));
 return rows;
}
function builtinModuleColumnSources(){
 const rows=[];
 /* 모듈 보관함의 기본 모듈(BUILTIN) 전체를 수동선택 원천으로 사용한다. */
 for(let bi=0;bi<BUILTIN.length;bi++){
  const pack=BUILTIN[bi],nodes=pack?.data?.nodes||[],edges=pack?.data?.edges||[];
  for(let ti=0;ti<nodes.length;ti++){
   const t=nodes[ti];if(t?.type!=='table')continue;
   const use=edges.find(e=>e[1]===ti&&e[2]==='uses'),scr=use?nodes[use[0]]:null;
   const c1=scr?edges.find(e=>e[1]===use[0]&&e[2]==='contains'):null,sec=c1?nodes[c1[0]]:null;
   const c2=sec?edges.find(e=>e[1]===c1[0]&&e[2]==='contains'):null,mod=c2?nodes[c2[0]]:null;
   (t.meta?.cols||[]).forEach((c,ci)=>{if(c.formula!==undefined||c.calc)return;const label=String(c.label||c.name||'').trim();if(!label)return;rows.push({bi,ti,ci,col:c,pack,table:t,mod:mod?.name||pack.name,sec:sec?.name||pack.cat||'기본 모듈',scr:scr?.name||'연결 화면 없음'})});
  }
 }
 return rows;
}
function basicManualOptions(t){
 const r=recommendedBasicColumns(t),parts=['<option value="">수동으로 추가할 칼럼 선택…</option>'];
 parts.push(`<optgroup label="★ 현재 화면 추천 — ${esc(r.profile)}">${r.keys.map(k=>{const c=BASIC_COL_LIBRARY[k];return `<option value="rec:${k}">${esc(c.label)} · ${c.type==='num'?'숫자':c.type==='date'?'날짜':c.type==='bool'?'체크':'문자'}</option>`}).join('')}</optgroup>`);
 const all=Object.entries(BASIC_COL_LIBRARY).filter(([k])=>!r.keys.includes(k));
 parts.push(`<optgroup label="공통 기본 칼럼 전체">${all.map(([k,c])=>`<option value="rec:${k}">${esc(c.label)} · ${c.type==='num'?'숫자':c.type==='date'?'날짜':c.type==='bool'?'체크':'문자'}</option>`).join('')}</optgroup>`);
 const built=builtinModuleColumnSources(),bgroups=new Map();for(const x of built){const g=`${x.pack.cat} · ${x.pack.name}`;if(!bgroups.has(g))bgroups.set(g,[]);bgroups.get(g).push(x)}
 for(const [g,arr] of bgroups){parts.push(`<optgroup label="📚 기본 모듈 · ${esc(g)}">${arr.map(x=>`<option value="lib:${x.bi}:${x.ti}:${x.ci}">${esc(x.sec)} › ${esc(x.scr)} › ${esc(x.col.label||x.col.name)} (${esc(x.table.name)})</option>`).join('')}</optgroup>`)}
 const rows=allModuleColumnSources(t),groups=new Map();for(const x of rows){if(!groups.has(x.mod))groups.set(x.mod,[]);groups.get(x.mod).push(x)}
 for(const [mod,arr] of groups){parts.push(`<optgroup label="🧩 현재 설계 · ${esc(mod)}">${arr.map(x=>`<option value="src:${x.table.id}:${x.index}">${esc(x.sec)} › ${esc(x.scr)} › ${esc(x.col.label||x.col.name)} (${esc(x.table.name)})</option>`).join('')}</optgroup>`)}
 return parts.join('');
}
function basicColumnAssistantHtml(t){
 const r=recommendedBasicColumns(t),labels=r.keys.slice(0,9).map(k=>BASIC_COL_LIBRARY[k].label).join(' · ')+(r.keys.length>9?' …':'');
 return `<section class="src" style="margin-top:2px;background:#f9fbff"><h4>🧩 기본 칼럼 도우미</h4>
  <div style="font-size:11.5px;color:#4a5568;line-height:1.6"><b>자동판정:</b> ${esc(r.profile)}형 · ${esc(r.path)}<br><span style="color:#8a94a6">추천: ${esc(labels)}</span></div>
  <div class="acts"><button class="btn primary" id="autoBasicCols" title="현재 중분류·화면의 성격을 보고 없는 기본 칼럼만 추가합니다">⚡ 추천 칼럼 자동추가</button></div>
  <div class="f"><label>수동 선택 — 현재 화면 추천 + 공통 기본 칼럼 + <b>모듈 보관함 전체 + 현재 설계 전체</b></label><div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px"><select id="manualBasicCol">${basicManualOptions(t)}</select><button class="btn" id="addManualBasicCol" type="button">＋ 선택 칼럼 추가</button></div><div id="manualBasicHint" style="font-size:11px;color:#8a94a6;line-height:1.5">모듈 보관함과 현재 설계의 모든 테이블에서 선택할 수 있습니다. 계산식 칼럼은 안전을 위해 목록에서 제외하며, 가져온 칼럼명은 현재 중분류 → 화면 → 라벨 기준으로 다시 만듭니다.</div></div>
 </section>`;
}
function resolveManualBasicChoice(v){
 if(!v)return null;if(v.startsWith('rec:')){const key=v.slice(4),c=BASIC_COL_LIBRARY[key];return c?{def:{...c},source:'기본 칼럼'}:null}
 if(v.startsWith('src:')){const p=v.split(':'),t=N(p[1]),i=Number(p[2]),c=t?.meta?.cols?.[i];if(!c)return null;const ctx=autoColumnContext(t);return{def:{name:c.name,label:c.label||c.name,type:c.type||'text',sample:c.sample||'',req:!!c.req,pk:!!c.pk,unit:c.unit,decimals:c.decimals,flow:c.flow},source:`현재 설계 · ${ctx.mod?.name||'공통'} → ${ctx.sec?.name||'미분류'} → ${ctx.scr?.name||t.name}`}}
 if(v.startsWith('lib:')){const p=v.split(':'),bi=Number(p[1]),ti=Number(p[2]),ci=Number(p[3]),pack=BUILTIN[bi],t=pack?.data?.nodes?.[ti],c=t?.meta?.cols?.[ci];if(!c)return null;return{def:{name:c.name,label:c.label||c.name,type:c.type||'text',sample:c.sample||'',req:!!c.req,pk:!!c.pk,unit:c.unit,decimals:c.decimals,flow:c.flow},source:`모듈 보관함 · ${pack.cat} → ${pack.name} → ${t.name}`}}
 return null;
}
function addManualBasicColumn(t,v){
 const x=resolveManualBasicChoice(v);if(!x){$('stat').textContent='🧩 추가할 칼럼을 드롭다운에서 먼저 선택하세요.';return}
 const ok=addBasicColumnDef(t,x.def);if(ok){save();$('stat').textContent=`🧩 수동 칼럼 추가: ${x.def.label||x.def.name} · 출처: ${x.source} · 현재 화면 기준 칼럼명으로 등록됨`}
 else $('stat').textContent=`🧩 '${x.def.label||x.def.name}' 항목은 이미 있어 추가하지 않았습니다.`;
}
function updateManualBasicHint(t,v){
 const el=$('manualBasicHint');if(!el)return;const x=resolveManualBasicChoice(v);if(!x){el.textContent='모듈 보관함과 현재 설계의 모든 테이블에서 선택할 수 있습니다. 계산식 칼럼은 안전을 위해 목록에서 제외하며, 가져온 칼럼명은 현재 중분류 → 화면 → 라벨 기준으로 다시 만듭니다.';return}
 const d=x.def;el.innerHTML=`선택: <b>${esc(d.label||d.name)}</b> · 형식 ${d.type==='num'?'숫자':d.type==='date'?'날짜':d.type==='bool'?'체크':'문자'}${d.req?' · 필수':''}${d.pk?' · 기본키 후보':''} · 출처: ${esc(x.source)}`;
}

/* ═══════════════ 자동정렬 (계층: 대메뉴 → 중분류 → 화면 → 테이블) ═══════════════ */
function autoLayout(){
 const colX={module:0,section:230,screen:440,table:700};const ys={module:0,section:0,screen:0,table:0};
 const order=[];const seen=new Set();
 const kids=id=>D.edges.filter(e=>e.from===id&&e.kind==='contains').map(e=>N(e.to)).filter(Boolean);
 for(const m of D.nodes.filter(n=>n.type==='module'))for(const s of [m,...kids(m.id)])for(const x of [s,...kids(s.id)])if(!seen.has(x.id)){seen.add(x.id);order.push(x)}
 for(const n of D.nodes)if(!seen.has(n.id)){seen.add(n.id);order.push(n)}
 for(const n of order){n.x=colX[n.type];n.y=ys[n.type];ys[n.type]+=size(n).h+22;if(n.type==='module')ys.section=Math.max(ys.section,ys.module-size(n).h-22);if(n.type==='section')ys.screen=Math.max(ys.screen,ys.section-size(n).h-22)}
 render();fitAll();
}

/* ═══════════════ 저장/열기 ═══════════════ */
function exportJson(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(D,null,1)],{type:'application/json'}));a.download='system_design.json';a.click()}
function importJson(){const i=document.createElement('input');i.type='file';i.accept='.json';i.onchange=()=>{const f=i.files[0];const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.nodes)throw 0;clearDeleteUndo();D=d;select(null);fitAll()}catch(e){alert('설계 파일 형식이 아닙니다.')}};r.readAsText(f)};i.click()}



/* ═══ 문답으로 만들기 ═══
   대분류 → 중분류 → 화면 → 테이블(6H 기본 + 추가 항목) → 관계 순서로 묻고, 답할 때마다 캔버스에 바로 그린다.
   블록 패널의 [✎ 문답으로 채우기] 를 누르면 그 블록 아래부터 묻는다. */
const H6=[
 {name:'work_date',label:'일자 (언제)',type:'date',req:true},
 {name:'place_code',label:'장소·설비 (어디서)',type:'text'},
 {name:'worker',label:'담당자 (누가)',type:'text'},
 {name:'item_code',label:'품번·대상 (무엇을)',type:'text',req:true},
 {name:'method',label:'방법·구분 (어떻게)',type:'text'},
 {name:'reason',label:'사유 (왜)',type:'text'},
 {name:'qty',label:'수량 (얼마나)',type:'num'}];
let WZ={queue:[],done:[],cur:null};
const lines=v=>String(v||'').split(/\n|,|·/).map(x=>x.trim()).filter(Boolean);
function wizClose(){wizDlg.classList.remove('on');render()}
function startWizard(){
 WZ={queue:[{q:'mode'}],done:[],cur:null};
 wizDlg.classList.add('on');wizShow();
}
function wizardFrom(id){                          /* 블록 패널에서: 그 블록 아래부터 */
 const n=N(id);if(!n)return;
 const q=n.type==='module'?{q:'sections',mod:n.id}:n.type==='section'?{q:'screens',sec:n.id}:n.type==='screen'?{q:'table',scr:n.id}:null;
 if(!q)return;
 WZ={queue:[q],done:[],cur:null};wizDlg.classList.add('on');wizShow();
}
const wzKindOf=nm=>/현황|조회|집계|리스트|목록|보고|대시/.test(nm)?'status':'input';
function wizShow(){
 const q=WZ.cur=WZ.queue.shift();
 const B=$('wz_body');$('wz_msg').textContent='';$('wz_prev').disabled=!WZ.done.length;
 if(!q){B.innerHTML=`<div class="f"><label>끝났습니다</label><div style="line-height:1.7">블록 ${D.nodes.length}개 · 연결 ${D.edges.length}개가 그려졌습니다.<br>
   캔버스에서 다듬고, 화면 블록을 더블클릭해 미리보기로 확인한 뒤 [▶ 시스템 생성] 하세요.</div></div>`;
  $('wz_step').textContent='완료';$('wz_next').textContent='닫기';return}
 $('wz_next').textContent='다음 →';
 $('wz_step').textContent=`남은 질문 ${WZ.queue.length+1}`;
 const opts=(arr,sel)=>arr.map(x=>`<option value="${esc(x)}" ${x===sel?'selected':''}>${esc(x)}</option>`).join('');
 if(q.q==='mode'){
  B.innerHTML=`<div class="f"><label>어느 쪽에서 시작할까요?</label>
   <div class="links">
    <button onclick="wizPick('fwd')"><b>정방향 — 메뉴부터</b><small>대분류 → 중분류 → 화면 → 테이블 → 관계. 시스템 모양이 머릿속에 있을 때</small></button>
    <button onclick="wizPick('rev')"><b>역방향 — 출력물부터</b><small>필요한 보고서·현황·문서 → 거기 들어갈 항목 → 어디서 입력되나 → 어느 업무에 속하나. "이 결과가 필요하다"에서 시작할 때</small></button>
   </div></div>
   <div style="color:#8a94a6;font-size:11.5px">둘을 섞어도 됩니다. 역방향으로 뼈대를 잡고, 블록 패널의 [❓ 문답으로 채우기]로 정방향 질문을 이어 가면 됩니다.</div>`;
  $('wz_next').textContent='선택하세요';return}
 if(q.q==='rsystem'){
  B.innerHTML=`<div class="f"><label>1. 시스템 이름은?</label><input id="w_sys" value="${esc($('sysName').value||'')}"></div>
   <div class="f"><label>2. 이 시스템에서 <b>꼭 나와야 하는 출력물</b>은 무엇입니까? — 보고서·현황판·문서·집계표, 한 줄에 하나</label>
   <textarea id="w_outs" style="min-height:120px" placeholder="월간 생산실적 보고서
설비별 가동율 현황
납기준수율 집계
검사성적서"></textarea>
   <div style="color:#8a94a6;font-size:11.5px">출력물마다 "무슨 항목이 필요한가 → 그 항목은 어디서 입력되나 → 어느 업무인가"를 차례로 묻습니다.</div></div>`;
  $('w_outs').focus();return}
 if(q.q==='rcols'){
  const chk=H6.map((c,i)=>`<label class="ck"><input type="checkbox" data-h="${i}" checked>${esc(c.label)}</label>`).join('');
  B.innerHTML=`<div class="f"><label>출력물 <b>${esc(q.out)}</b> 에 들어가야 할 항목은?</label>
   <div style="display:flex;flex-wrap:wrap;gap:6px 14px;padding:4px 0">${chk}</div></div>
   <div class="f"><label>추가 항목 — "영문명, 라벨, 형(text/num/date/bool)" 한 줄씩. 계산 항목(가동율 등)은 라벨 뒤에 (계산) 이라고 적어 두세요</label>
   <textarea id="w_cols" style="min-height:90px" placeholder="machine_code, 설비코드
run_min, 가동시간(분), num
oee, 가동율 (계산), num"></textarea></div>
   <div class="f"><label>집계 단위 (선택)</label><input id="w_group" placeholder="예: 월 · 설비 · 품목 · 고객사"></div>`;
  $('w_cols').focus();return}
 if(q.q==='rsource'){
  const tbls=D.nodes.filter(n=>n.type==='table');
  B.innerHTML=`<div class="f"><label>출력물 <b>${esc(q.out)}</b> 의 항목들은 <b>어디서 입력</b>됩니까?</label>
   <div class="row2"><div class="f"><label>저장 테이블</label><select id="w_src"><option value="__new">새 테이블 만들기</option>${tbls.map(t=>`<option value="${t.id}">${esc(t.name)} (기존)</option>`).join('')}</select></div>
   <div class="f"><label>새 테이블명 (영문)</label><input id="w_tbl" value="${esc(tableNameFrom(q.out))}"></div></div>
   <div class="row2"><div class="f"><label>입력 화면 이름</label><input id="w_inp" value="${esc(q.out.replace(/보고서|현황|집계|집계표|성적서|일지|표$/g,'').trim()||q.out)} 등록"></div>
   <div class="f"><label>입력 주체·주기 (선택)</label><input id="w_who" placeholder="예: 생산팀 · 매일"></div></div>
   <div style="color:#8a94a6;font-size:11.5px">기존 테이블을 고르면 항목이 그 테이블에 합쳐지고, 새 입력 화면 대신 그 테이블의 기존 등록 화면을 씁니다.</div>`;
  return}
 if(q.q==='rplace'){
  const mods=D.nodes.filter(n=>n.type==='module'),secs=D.nodes.filter(n=>n.type==='section');
  B.innerHTML=`<div class="f"><label>입력 화면 <b>${esc(q.inp)}</b> 과 출력물 <b>${esc(q.out)}</b> 은 어느 업무에 속합니까?</label>
   <div class="row2"><div class="f"><label>대분류</label><input id="w_mod" list="dl_mod" placeholder="예: 생산관리"><datalist id="dl_mod">${mods.map(m=>`<option value="${esc(m.name)}">`).join('')}</datalist></div>
   <div class="f"><label>중분류 (선택)</label><input id="w_sec" list="dl_sec" placeholder="예: 실적"><datalist id="dl_sec">${secs.map(m=>`<option value="${esc(m.name)}">`).join('')}</datalist></div></div>
   <div style="color:#8a94a6;font-size:11.5px">있는 이름을 고르면 거기에 붙고, 새 이름이면 새로 만듭니다.</div>`;
  $('w_mod').focus();return}
 if(q.q==='system'){
  B.innerHTML=`<div class="f"><label>1. 시스템 이름은?</label><input id="w_sys" value="${esc($('sysName').value||'')}" placeholder="예: 태진 품질관리 시스템"></div>
   <div class="f"><label>2. 대분류(상단 메뉴)는 몇 개이고 무엇입니까? — 한 줄에 하나씩</label><textarea id="w_mods" style="min-height:110px" placeholder="영업관리
생산관리
품질관리
기준정보">${D.nodes.filter(n=>n.type==='module').map(n=>n.name).join('\n')}</textarea>
   <div style="color:#8a94a6;font-size:11.5px">이미 있는 대분류는 그대로 두고, 새 이름만 추가됩니다. 사용자·권한(기준정보 › 사용자정보)은 자동으로 붙습니다.</div></div>`;
  $('w_sys').focus();return}
 if(q.q==='sections'){const m=N(q.mod);
  B.innerHTML=`<div class="f"><label>대분류 <b>${esc(m.name)}</b> 의 중분류는 무엇입니까? — 한 줄에 하나씩 (없으면 비워 두면 대분류 바로 아래에 화면이 붙습니다)</label>
   <textarea id="w_secs" style="min-height:100px" placeholder="수주
출하">${D.edges.filter(e=>e.from===m.id&&e.kind==='contains').map(e=>N(e.to)).filter(n=>n&&n.type==='section').map(n=>n.name).join('\n')}</textarea></div>`;
  $('w_secs').focus();return}
 if(q.q==='screens'){const sc=N(q.sec);const par=q.mod?N(q.mod):null;
  B.innerHTML=`<div class="f"><label>${par?'대분류':'중분류'} <b>${esc(sc.name)}</b> 에 들어갈 화면은 무엇입니까? — 한 줄에 하나씩. 이름에 "등록/입력" 이면 입력화면, "현황/조회/집계" 면 조회화면으로 봅니다</label>
   <textarea id="w_scrs" style="min-height:110px" placeholder="${esc(sc.name)}등록
${esc(sc.name)}현황">${D.edges.filter(e=>e.from===sc.id&&e.kind==='contains').map(e=>N(e.to)).filter(n=>n&&n.type==='screen').map(n=>n.name).join('\n')}</textarea>
   <div style="color:#8a94a6;font-size:11.5px">뒤에 "|등록", "|현황", "|전표" 를 붙이면 종류를 지정할 수 있습니다. 예) 수주등록|전표</div></div>`;
  $('w_scrs').focus();return}
 if(q.q==='table'){const scr=N(q.scr);
  const used=D.edges.filter(e=>e.from===scr.id&&e.kind==='uses').map(e=>N(e.to)).filter(Boolean);
  const guess=used[0]?used[0].name:tableNameFrom(scr.name);
  const have=used[0]?colsOf(used[0]):[];
  const chk=H6.map((c,i)=>`<label class="ck"><input type="checkbox" data-h="${i}" ${(!have.length||have.some(x=>x.name===c.name))?'checked':''}>${esc(c.label)}</label>`).join('');
  B.innerHTML=`<div class="f"><label>화면 <b>${esc(scr.name)}</b> 이 저장하는 테이블</label><div class="row2"><input id="w_tbl" value="${esc(guess)}" placeholder="영문 테이블명">
    <input id="w_pk" value="${esc((have.find(c=>c.pk)||{}).name||'doc_no')}" placeholder="기본키 컬럼 (예: order_no)"></div></div>
   <div class="f"><label>6H 기본 항목 — 필요한 것만 남기세요</label><div style="display:flex;flex-wrap:wrap;gap:6px 14px;padding:4px 0">${chk}</div></div>
   <div class="f"><label>추가 항목 — 한 줄에 하나, "영문명, 라벨, 형(text/num/date/bool)" (형은 생략 가능)</label>
    <textarea id="w_cols" style="min-height:90px" placeholder="customer_name, 거래처
unit_price, 단가, num
due_date, 납기일, date">${have.filter(c=>!c.pk&&!H6.some(h=>h.name===c.name)).map(c=>[c.name,c.label,c.type].join(', ')).join('\n')}</textarea></div>`;
  $('w_cols').focus();return}
 if(q.q==='statusTable'){WZ.done.push(q);wizShow();return}      /* 조회화면은 등록 테이블에 자동 연결 — 물을 것 없음 */
 if(q.q==='relations'){const scr=N(q.scr);const mine=D.edges.filter(e=>e.from===scr.id&&e.kind==='uses').map(e=>N(e.to)).filter(Boolean);
  const others=D.nodes.filter(n=>n.type==='table'&&!mine.includes(n));
  const askDetail=scr.meta.kind!=='status'&&mine[0]&&!detailOf(scr);
  if(!others.length&&!askDetail){WZ.done.push(q);wizShow();return}
  const cur=new Set(D.edges.filter(e=>e.from===scr.id&&e.kind==='uses'&&e.label&&/불러오기|참조|목록/.test(e.label)).map(e=>e.to));
  B.innerHTML=`${others.length?`<div class="f"><label>화면 <b>${esc(scr.name)}</b> 에서 불러오거나 참조하는 다른 테이블이 있습니까? (거래처·품목 목록 등)</label>
    <div style="display:flex;flex-wrap:wrap;gap:6px 14px;padding:4px 0">${others.map(t=>`<label class="ck"><input type="checkbox" data-t="${t.id}" ${cur.has(t.id)?'checked':''}>${esc(t.name)}</label>`).join('')}</div></div>`:''}
   ${askDetail?`<div class="f"><label>화면 <b>${esc(scr.name)}</b> 이 전표(헤더+명세)라면, 명세(여러 줄) 테이블은? — 부모 <b>${esc(mine[0].name)}</b> 1건에 여러 행</label>
    <select id="w_detail"><option value="" ${scr.meta.wantDetail?'':'selected'}>없음 (단일 표)</option>${others.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('')}<option value="__new" ${scr.meta.wantDetail?'selected':''}>새로 만들기 (${esc(mine[0].name)}_lines)</option></select></div>`:''}`;
  return}
}
function tableNameFrom(nm){
 const WORD=[['수주','order'],['발주','purchase_order'],['견적','quotation'],['작업지시','work_order'],['생산일보','daily_report'],['생산','production'],
  ['출하','shipment'],['입고','receipt'],['출고','issue'],['재고','stock'],['원소재','raw_material'],['검사','inspection'],['점검','check'],
  ['부적합','ncr'],['불량','defect'],['클레임','claim'],['금형','mold'],['설비','machine'],['공정','process'],['품목','item'],['거래처','vendor'],['고객','customer'],
  ['계획','plan'],['실적','result'],['이력','history'],['사용자','users'],['부서','department'],['직급','position']];
 const m=String(nm).match(/[A-Za-z][A-Za-z0-9_]*/g);if(m)return m.join('_').toLowerCase();
 const out=[];let rest=nm;for(const [k,v] of WORD)if(rest.includes(k)){out.push(v);rest=rest.split(k).join('')}
 return out.slice(0,2).join('_')||'tbl_'+(D.nodes.filter(n=>n.type==='table').length+1);
}
function wizPick(mode){
 WZ.done.push(WZ.cur);WZ.cur=null;
 WZ.queue.unshift(mode==='rev'?{q:'rsystem'}:{q:'system'});wizShow();
}
function wizPrev(){if(!WZ.done.length)return;WZ.queue.unshift(WZ.cur);WZ.cur=null;WZ.queue.unshift(WZ.done.pop());wizShow()}
function wizNext(){
 const q=WZ.cur;if(!q){wizClose();return}
 const findBy=(type,name,parent)=>D.nodes.find(x=>x.type===type&&x.name===name&&(!parent||D.edges.some(e=>e.from===parent&&e.to===x.id)));
 const link=(a,b,kind,label)=>{if(!D.edges.some(e=>e.from===a&&e.to===b&&e.kind===kind))addEdge(a,b,kind,label)};
 if(q.q==='mode'){WZ.queue.unshift(q);$('wz_msg').textContent='위에서 한 쪽을 고르세요.';return}
 if(q.q==='rsystem'){
  const nm=$('w_sys').value.trim();if(nm)$('sysName').value=nm;
  const outs=lines($('w_outs').value);if(!outs.length){$('wz_msg').textContent='출력물을 한 개 이상 적어 주세요.';WZ.queue.unshift(q);return}
  WZ.queue.unshift(...outs.map(o=>({q:'rcols',out:o})));
 }
 else if(q.q==='rcols'){
  const cols=[];document.querySelectorAll('#wz_body [data-h]').forEach(c=>{if(c.checked)cols.push({...H6[+c.dataset.h]})});
  for(const raw of lines($('w_cols').value.replace(/,/g,'\u0001'))){const [n,l,t]=raw.split('\u0001').map(x=>(x||'').trim());
   if(!n||cols.some(c=>c.name===n))continue;cols.push({name:n.replace(/[^A-Za-z0-9_]/g,'_').toLowerCase(),label:l||n,type:['num','date','bool'].includes(t)?t:'text',calc:/\(계산\)/.test(l||'')})}
  WZ.queue.unshift({q:'rsource',out:q.out,cols,group:$('w_group').value.trim()});
 }
 else if(q.q==='rsource'){
  const srcId=$('w_src').value;let tb=srcId==='__new'?null:N(srcId);
  const stored=q.cols.filter(c=>!c.calc),calc=q.cols.filter(c=>c.calc);
  if(!tb){const tn=($('w_tbl').value||tableNameFrom(q.out)).trim();tb=findBy('table',tn);
   if(!tb)tb=addNode('table',tn,{cols:[{name:'doc_no',label:'번호',type:'text',pk:true,req:true},...stored,{name:'remark',label:'비고',type:'text'}]},0,0);
   else{const ex=new Set(tb.meta.cols.map(c=>c.name));for(const c of stored)if(!ex.has(c.name))tb.meta.cols.push(c)}}
  else{const ex=new Set(tb.meta.cols.map(c=>c.name));for(const c of stored)if(!ex.has(c.name))tb.meta.cols.push(c)}
  /* 입력 화면: 기존 테이블이면 그 등록 화면 재사용 */
  let inp=D.edges.filter(e=>e.to===tb.id&&e.kind==='uses'&&/저장/.test(e.label||'')).map(e=>N(e.from)).find(n=>n&&n.type==='screen');
  if(!inp){const nm=($('w_inp').value||q.out+' 등록').trim();inp=findBy('screen',nm)||addNode('screen',nm,{file:tb.name+'_input.html',kind:'input',owner:$('w_who').value.trim()},0,0);link(inp.id,tb.id,'uses','저장/수정')}
  /* 출력물 화면 (조회·집계) */
  let out=findBy('screen',q.out);
  const uniq=f=>{let x=f,i=2;while(D.nodes.some(n=>n.type==='screen'&&n.meta.file===x))x=f.replace(/\.html$/,'_'+(i++)+'.html');return x};
  if(!out)out=addNode('screen',q.out,{file:uniq(tableNameFrom(q.out)+'_'+(/집계|율|월간|보고/.test(q.out)?'summary':'status')+'.html'),kind:'status',kpi:calc.map(c=>c.label.replace(/\s*\(계산\)/,'')).join(' · '),group:q.group,calcCols:calc},0,0);
  link(out.id,tb.id,'uses',(q.group?q.group+' 기준 ':'')+'조회/집계'+(calc.length?' — 계산: '+calc.map(c=>c.label.replace(/\s*\(계산\)/,'')).join(', '):''));
  link(inp.id,out.id,'flow','입력 → 출력');
  WZ.queue.unshift({q:'rplace',out:q.out,inp:inp.name,inpId:inp.id,outId:out.id});
 }
 else if(q.q==='rplace'){
  const mn=($('w_mod').value||'업무관리').trim(),sn=($('w_sec').value||'').trim();
  let m=findBy('module',mn)||addNode('module',mn,{icon:'▣',desc:''},0,0);
  let holder=m;
  if(sn){let sc=findBy('section',sn,m.id)||addNode('section',sn,{icon:'▣'},0,0);link(m.id,sc.id,'contains','포함');holder=sc}
  if(!D.edges.some(e=>e.to===q.inpId&&e.kind==='contains'))link(holder.id,q.inpId,'contains','포함');
  link(holder.id,q.outId,'contains','포함');
  if(!findBy('screen','사용자정보')){let base=findBy('module','기준정보')||addNode('module','기준정보',{icon:'▦',desc:'사용자 · 공통'},0,0);
   let sec=findBy('section','공통',base.id)||addNode('section','공통',{icon:'⚙'},0,0);link(base.id,sec.id,'contains','포함');
   const u=addNode('screen','사용자정보',{file:'user_information.html',kind:'other'},0,0);link(sec.id,u.id,'contains','포함')}
 }
 else if(q.q==='system'){
  const nm=$('w_sys').value.trim();if(nm)$('sysName').value=nm;
  const names=lines($('w_mods').value);if(!names.length){$('wz_msg').textContent='대분류를 한 개 이상 적어 주세요.';WZ.queue.unshift(q);return}
  const next=[];
  for(const n of names){let m=findBy('module',n);if(!m)m=addNode('module',n,{icon:'▣',desc:''},0,0);next.push({q:'sections',mod:m.id})}
  /* 기준정보 › 사용자정보 자동 */
  if(!findBy('screen','사용자정보')){let base=findBy('module','기준정보')||addNode('module','기준정보',{icon:'▦',desc:'사용자 · 공통'},0,0);
   let sec=findBy('section','공통',base.id)||addNode('section','공통',{icon:'⚙'},0,0);link(base.id,sec.id,'contains','포함');
   const u=addNode('screen','사용자정보',{file:'user_information.html',kind:'other'},0,0);link(sec.id,u.id,'contains','포함')}
  WZ.queue.unshift(...next);
 }
 else if(q.q==='sections'){const m=N(q.mod);const names=lines($('w_secs').value);const next=[];
  if(!names.length)next.push({q:'screens',sec:m.id,mod:m.id});
  for(const n of names){let sc=findBy('section',n,m.id);if(!sc){sc=addNode('section',n,{icon:'▣'},0,0)}link(m.id,sc.id,'contains','포함');next.push({q:'screens',sec:sc.id})}
  WZ.queue.unshift(...next);
 }
 else if(q.q==='screens'){const sec=N(q.sec);const next=[];
  for(const raw of lines($('w_scrs').value)){
   const [nm0,k0]=raw.split('|').map(x=>x.trim());if(!nm0)continue;
   const kind=k0==='전표'?'input':k0==='등록'?'input':k0==='현황'?'status':wzKindOf(nm0);
   let sc=findBy('screen',nm0);if(!sc)sc=addNode('screen',nm0,{file:tableNameFrom(nm0)+(kind==='status'?'_status':'_input')+'.html',kind,wantDetail:k0==='전표'},0,0);
   link(sec.id,sc.id,'contains','포함');
   if(kind==='input')next.push({q:'table',scr:sc.id});else next.push({q:'statusTable',scr:sc.id});
  }
  WZ.queue.unshift(...next);
 }
 else if(q.q==='table'){const scr=N(q.scr);
  const tn=($('w_tbl').value||'').trim()||tableNameFrom(scr.name);const pk=($('w_pk').value||'doc_no').trim();
  let tb=findBy('table',tn);
  const cols=[{name:pk,label:'번호',type:'text',pk:true,req:true}];
  document.querySelectorAll('#wz_body [data-h]').forEach(c=>{if(c.checked)cols.push({...H6[+c.dataset.h]})});
  for(const raw of lines($('w_cols').value.replace(/,/g,'\u0001'))){const [n,l,t]=raw.split('\u0001').map(x=>(x||'').trim());
   if(!n||cols.some(c=>c.name===n))continue;cols.push({name:n.replace(/[^A-Za-z0-9_]/g,'_').toLowerCase(),label:l||n,type:['num','date','bool'].includes(t)?t:'text'})}
  if(!cols.some(c=>c.name==='remark'))cols.push({name:'remark',label:'비고',type:'text'});
  if(!tb)tb=addNode('table',tn,{cols},0,0);else{const ex=new Set(tb.meta.cols.map(c=>c.name));for(const c of cols)if(!ex.has(c.name))tb.meta.cols.push(c)}
  link(scr.id,tb.id,'uses','저장/수정');
  /* 같은 중분류의 현황 화면은 자동으로 이 테이블을 조회 */
  const sec=D.edges.find(e=>e.to===scr.id&&e.kind==='contains');
  if(sec)for(const e of D.edges.filter(e=>e.from===sec.from&&e.kind==='contains')){const o=N(e.to);if(o&&o.type==='screen'&&o.meta.kind==='status'&&!D.edges.some(x=>x.from===o.id&&x.kind==='uses'))link(o.id,tb.id,'uses','조회/수정')}
  WZ.queue.unshift({q:'relations',scr:scr.id});
 }
 else if(q.q==='statusTable'){/* 조회화면: 같은 중분류의 등록 테이블에 자동 연결됨 — 질문 없음 */}
 else if(q.q==='relations'){const scr=N(q.scr);
  document.querySelectorAll('#wz_body [data-t]').forEach(c=>{if(c.checked)link(scr.id,c.dataset.t,'uses','불러오기 (참조)')});
  const dsel=$('w_detail');
  if(dsel&&dsel.value){const parent=D.edges.filter(e=>e.from===scr.id&&e.kind==='uses').map(e=>N(e.to))[0];
   let child=dsel.value==='__new'?null:N(dsel.value);
   if(!child){const pk=(colsOf(parent).find(c=>c.pk)||{}).name||'doc_no';
    child=addNode('table',parent.name+'_lines',{cols:[{name:'line_key',label:'명세키',type:'text',pk:true},{name:pk,label:'상위 '+pk,type:'text'},{name:'item_code',label:'품번',type:'text'},{name:'qty',label:'수량',type:'num'},{name:'remark',label:'비고',type:'text'}]},0,0)}
   const e=addEdge(child.id,parent.id,'ref',(colsOf(parent).find(c=>c.pk)||{}).name+' → '+parent.name)||D.edges.find(x=>x.from===child.id&&x.to===parent.id);
   if(e){e.kind='ref';e.card='1N'}}
 }
 WZ.done.push(q);render();autoLayout();wizDlg.classList.add('on');wizShow();
}
/* ═══════════════ 통합 사용자 · 권한 · 조직 · 결재 기준정보 팩 ═══════════════ */
function addApprovalMasterPack(){
 const packs={
  users:[
   {name:'user_key',label:'사용자키',type:'text',pk:true,req:true},{name:'user_id',label:'로그인ID',type:'text',req:true},
   {name:'employee_no',label:'사번',type:'text'},{name:'name',label:'이름',type:'text',req:true},{name:'english_name',label:'성명(영문)',type:'text'},
   {name:'department_code',label:'부서코드',type:'text'},{name:'department_name',label:'부서명',type:'text'},
   {name:'position_code',label:'직급코드',type:'text'},{name:'position_name',label:'직급/직책',type:'text'},
   {name:'business_division',label:'사업부',type:'text'},{name:'factory',label:'공장',type:'text'},{name:'user_group',label:'사용자그룹',type:'text'},{name:'process_group',label:'공정그룹',type:'text'},
   {name:'mobile_phone',label:'휴대폰',type:'text'},{name:'phone',label:'전화번호',type:'text'},{name:'email',label:'이메일',type:'text'},
   {name:'auth_email',label:'로그인메일',type:'text'},{name:'auth_uid',label:'Auth UID',type:'text'},
   {name:'role',label:'시스템권한(user/admin/master)',type:'text'},
   {name:'can_review',label:'검토권한',type:'bool'},{name:'can_confirm',label:'확인권한',type:'bool'},{name:'can_approve',label:'승인권한',type:'bool'},
   {name:'delegate_key',label:'대결자 사용자키',type:'text'},{name:'registered_date',label:'등록일',type:'date'},{name:'last_login_at',label:'최종로그인',type:'date'},
   {name:'is_active',label:'사용',type:'bool'},{name:'remark',label:'비고',type:'text'}],
  user_permissions:[
   {name:'user_key',label:'사용자키',type:'text',pk:true,req:true},{name:'menu_name',label:'메뉴경로',type:'text',pk:true,req:true},{name:'menu_path',label:'경로배열',type:'text'},
   {name:'can_view',label:'조회',type:'bool'},{name:'can_save',label:'저장',type:'bool'},{name:'can_edit',label:'수정',type:'bool'},{name:'can_delete',label:'삭제',type:'bool'}],
  user_initial_passwords:[
   {name:'user_id',label:'아이디',type:'text',pk:true,req:true},{name:'temp_password',label:'발급 비밀번호',type:'text'},
   {name:'issued_by',label:'발급자',type:'text'},{name:'issued_at',label:'발급시각',type:'date'},{name:'changed_by_user',label:'본인변경',type:'bool'}],
  departments:[{name:'department_code',label:'부서코드',type:'text',pk:true,req:true},{name:'department_name',label:'부서명',type:'text',req:true},{name:'parent_department_code',label:'상위부서코드',type:'text'},{name:'manager_key',label:'부서장 사용자키',type:'text'},{name:'sort_order',label:'정렬순서',type:'num'},{name:'is_active',label:'사용',type:'bool'}],
  positions:[{name:'position_code',label:'직급코드',type:'text',pk:true,req:true},{name:'position_name',label:'직급/직책명',type:'text',req:true},{name:'grade_order',label:'직급순서',type:'num'},{name:'is_active',label:'사용',type:'bool'}],
  approval_route_templates:[{name:'template_code',label:'결재선코드',type:'text',pk:true,req:true},{name:'template_name',label:'결재선명',type:'text',req:true},{name:'document_type',label:'문서유형',type:'text'},{name:'department_code',label:'적용부서코드',type:'text'},{name:'writer_key',label:'작성자 사용자키',type:'text'},{name:'reviewer_key',label:'검토자 사용자키',type:'text'},{name:'confirmer_key',label:'확인자 사용자키',type:'text'},{name:'approver_key',label:'승인자 사용자키',type:'text'},{name:'is_active',label:'사용',type:'bool'}]
 };
 const ensureTable=(name,cs)=>{let t=D.nodes.find(n=>n.type==='table'&&n.name===name);if(!t)t=addNode('table',name,{cols:cloneUndo(cs)},0,0);else{t.meta.cols=t.meta.cols||[];for(const c of cs)if(!t.meta.cols.some(x=>x.name===c.name))t.meta.cols.push(cloneUndo(c))}return t};
 const ensureModule=name=>D.nodes.find(x=>x.type==='module'&&x.name===name)||addNode('module',name,{icon:'⚙',desc:'로그인·사용자·메뉴권한·조직·결재선 통합 관리'},0,0);
 const ensureSection=(m,name)=>{let n=D.nodes.find(x=>x.type==='section'&&x.name===name);
  if(!n&&name==='사용자·권한관리'){
   const legacy=['사용자·조직·결재','사용자 · 권한'];
   n=D.nodes.find(x=>x.type==='section'&&legacy.includes(x.name)&&D.edges.some(e=>e.kind==='contains'&&e.from===m.id&&e.to===x.id));
   if(n)n.name=name;
  }
  if(!n)n=addNode('section',name,{icon:'👥'},0,0);addEdge(m.id,n.id,'contains','포함',{quiet:true,noSelect:true});return n};
 const ensureScreen=(sec,name,file,kind='input')=>{let n=D.nodes.find(x=>x.type==='screen'&&x.name===name);if(!n)n=addNode('screen',name,{file,kind},0,0);else{n.meta.file=file;n.meta.kind=kind}addEdge(sec.id,n.id,'contains','포함',{quiet:true,noSelect:true});return n};
 const mod=ensureModule('시스템관리'),sec=ensureSection(mod,'사용자·권한관리');
 const users=ensureTable('users',packs.users),perms=ensureTable('user_permissions',packs.user_permissions),pws=ensureTable('user_initial_passwords',packs.user_initial_passwords),deps=ensureTable('departments',packs.departments),pos=ensureTable('positions',packs.positions),routes=ensureTable('approval_route_templates',packs.approval_route_templates);
 const su=ensureScreen(sec,'사용자정보','user_information.html','perm'),so=ensureScreen(sec,'조직정보','organization_management.html'),sr=ensureScreen(sec,'결재선 템플릿','approval_route_template.html');
 addEdge(su.id,users.id,'uses','계정·역할·결재권한',{quiet:true,noSelect:true});addEdge(su.id,perms.id,'uses','메뉴별 조회·저장·수정·삭제',{quiet:true,noSelect:true});addEdge(su.id,pws.id,'uses','초기 비밀번호 발급·재설정',{quiet:true,noSelect:true});
 addEdge(so.id,deps.id,'uses','부서 관리',{quiet:true,noSelect:true});addEdge(so.id,pos.id,'uses','직급 관리',{quiet:true,noSelect:true});
 addEdge(sr.id,routes.id,'uses','결재선 템플릿',{quiet:true,noSelect:true});addEdge(sr.id,users.id,'uses','결재자 선택',{quiet:true,noSelect:true});
 addEdge(perms.id,users.id,'ref','user_key → users.user_key',{quiet:true,noSelect:true});addEdge(pws.id,users.id,'ref','user_id → users.user_id',{quiet:true,noSelect:true});
 addEdge(users.id,deps.id,'ref','department_code → departments.department_code',{quiet:true,noSelect:true});addEdge(users.id,pos.id,'ref','position_code → positions.position_code',{quiet:true,noSelect:true});addEdge(routes.id,deps.id,'ref','department_code → departments.department_code',{quiet:true,noSelect:true});addEdge(routes.id,users.id,'ref','writer/reviewer/confirmer/approver_key → users.user_key',{quiet:true,noSelect:true});
 autoLayout();select({node:users.id});$('stat').textContent='👥 통합 사용자 기준정보 추가 완료 — 최초 마스터 로그인, ID/비밀번호, user/admin/master, 메뉴별 4권한, 검토/확인/승인, 조직·결재선을 한 구조로 관리합니다.';
}

/* ═══════════════ 신규작성 ═══════════════
   빈 화면 대신 최소 뼈대 한 벌을 놓는다.
   대분류 ─포함→ 중분류 ─포함→ 등록/조회 화면,  등록 ─저장/수정→ 테이블,  조회 ─조회/수정→ 테이블
   테이블 기본 컬럼은 5H(언제·어디서·누가·무엇을·어떻게·얼마나) 기준. */
function newDesign(withSkeleton){
 if(D.nodes.length&&!confirm('현재 설계를 지우고 새로 시작할까요? (필요하면 먼저 ☁ 저장 하세요)'))return;
 clearDeleteUndo();D={nodes:[],edges:[]};curName='';try{localStorage.removeItem('sysdesign.name')}catch(e){}updateTitle();
 if(!withSkeleton){select(null);view={x:40,y:40,k:1};render();
  $('stat').textContent='빈 설계 — [＋ 추가] 로 블록을 놓거나, [설계 › 문답으로 만들기] · [모듈 보관함] 으로 시작하세요.';return}
 const mod=addNode('module','대분류',{icon:'▣',desc:''},0,0);
 const sec=addNode('section','중분류',{icon:'▣'},0,0);
 const inp=addNode('screen','등록화면',{file:'new_input.html',kind:'input'},0,0);
 const sta=addNode('screen','조회화면',{file:'new_status.html',kind:'status'},0,0);
 const tbl=addNode('table','new_table',{cols:[
   {name:'doc_no',label:'번호',type:'text',pk:true,req:true},
   {name:'work_date',label:'일자 (언제)',type:'date',req:true},
   {name:'due_date',label:'완료예정일·납기',type:'date'},
   {name:'place_code',label:'장소·설비 (어디서)',type:'text'},
   {name:'worker',label:'담당자 (누가)',type:'text'},
   {name:'item_code',label:'품번 (무엇을)',type:'text',req:true},
   {name:'item_name',label:'품명',type:'text'},
   {name:'method',label:'방법·구분 (어떻게)',type:'text'},
   {name:'qty',label:'수량 (얼마나)',type:'num'},
   {name:'status',label:'승인상태',type:'text',flow:'작성 > 검토 > 확인 > 승인 > 완료 | 반려'},
   {name:'requested_by',label:'작성자',type:'text'},
   {name:'written_at',label:'작성일',type:'date'},
   {name:'reviewed_by',label:'검토자',type:'text'},
   {name:'reviewed_at',label:'검토일',type:'date'},
   {name:'confirmed_by',label:'확인자',type:'text'},
   {name:'confirmed_at',label:'확인일',type:'date'},
   {name:'approved_by',label:'승인자',type:'text'},
   {name:'approved_at',label:'승인일',type:'date'},
   {name:'reject_reason',label:'반려사유',type:'text'},
   {name:'remark',label:'비고',type:'text'},
   {name:'updated_at',label:'수정일시',type:'date'}],autoNo:{enabled:true,prefix:'DOC',date:'YYMMDD',digits:3,sep:'-'},alert:{enabled:true,dateCol:'due_date',days:3},approval:{enabled:true,lock:false,routeTemplate:'STD_APPROVAL',assignees:{writer:'',reviewer:'',confirmer:'',approver:''}}},0,0);
 addEdge(mod.id,sec.id,'contains','포함');
 addEdge(sec.id,inp.id,'contains','포함');
 addEdge(sec.id,sta.id,'contains','포함');
 addEdge(inp.id,tbl.id,'uses','저장/수정');
 addEdge(sta.id,tbl.id,'uses','조회/수정');
 addApprovalMasterPack();
 select(null);autoLayout();
 $('stat').textContent='새 설계 — 기본 업무화면과 통합 사용자·권한관리 기준정보까지 준비되었습니다. 블록 이름과 컬럼을 고쳐 쓰세요.';
}
/* ═══════════════ 샘플 (mes_template 의 SAMPLE MES) ═══════════════ */
function loadSample(){
 if(D.nodes.length&&!confirm('현재 설계를 지우고 샘플을 불러올까요?'))return;
 clearDeleteUndo();D={nodes:[],edges:[]};const M={},S={},SC={},T={};
 const mod=(n,icon,desc)=>M[n]=addNode('module',n,{icon,desc},0,0);
 const sec=(m,n,icon)=>{S[n]=addNode('section',n,{icon},0,0);addEdge(M[m].id,S[n].id,'contains')};
 const scr=(s,n,file,kind)=>{SC[n]=addNode('screen',n,{file,kind},0,0);addEdge(S[s].id,SC[n].id,'contains')};
 const tbl=(n,cols,meta={})=>T[n]=addNode('table',n,{...meta,cols},0,0);
 mod('영업관리','▣','수주 · 출하');sec('영업관리','수주','▣');scr('수주','수주등록','sample_input.html','input');scr('수주','수주현황','sample_status.html','status');scr('수주','수주 대시보드','sample_dashboard.html','dash');
 sec('영업관리','출하','⇪');scr('출하','출하등록','shipment_input.html','input');scr('출하','출하현황','shipment_status.html','status');
 mod('생산관리','⚙','계획 · 실적');sec('생산관리','실적','⚙');scr('실적','생산실적등록','prod_result_input.html','input');scr('실적','생산실적현황','prod_result_status.html','status');
 mod('기준정보','▦','거래처 · 품목');sec('기준정보','공통','⚙');scr('공통','거래처관리','vendor_management.html','input');scr('공통','품목관리','item_management.html','input');
 tbl('sample_orders',[{name:'order_no',label:'수주번호',type:'text',pk:true,req:true},{name:'order_date',label:'수주일',type:'date',req:true},{name:'due_date',label:'납기일',type:'date'},{name:'customer_name',label:'거래처',type:'text',req:true},{name:'item_name',label:'품목',type:'text',req:true},{name:'status',label:'승인상태',type:'text',flow:'작성 > 검토 > 확인 > 승인 > 완료 | 반려'},{name:'requested_by',label:'작성자',type:'text'},{name:'written_at',label:'작성일',type:'date'},{name:'reviewed_by',label:'검토자',type:'text'},{name:'reviewed_at',label:'검토일',type:'date'},{name:'confirmed_by',label:'확인자',type:'text'},{name:'confirmed_at',label:'확인일',type:'date'},{name:'approved_by',label:'승인자',type:'text'},{name:'qty',label:'수량',type:'num',sample:'10'},{name:'unit_price',label:'단가',type:'num',sample:'2500'},{name:'amount',label:'금액',type:'num',formula:'qty * unit_price',unit:'원',decimals:0},{name:'approved_at',label:'승인일',type:'date'},{name:'reject_reason',label:'반려사유',type:'text'},{name:'remark',label:'비고',type:'text'}],{autoNo:{enabled:true,prefix:'ORD',date:'YYMMDD',digits:3,sep:'-'},alert:{enabled:true,dateCol:'due_date',days:3},approval:{enabled:true,lock:false,routeTemplate:'STD_APPROVAL',assignees:{writer:'',reviewer:'',confirmer:'',approver:''}}});
 tbl('shipments',[{name:'ship_no',label:'출하번호',type:'text',pk:true,req:true},{name:'ship_date',label:'출하일',type:'date',req:true},{name:'order_no',label:'수주번호',type:'text',req:true},{name:'customer_name',label:'거래처',type:'text'},{name:'item_name',label:'품목',type:'text'},{name:'qty',label:'출하수량',type:'num'},{name:'remark',label:'비고',type:'text'}]);
 tbl('prod_results',[{name:'result_no',label:'실적번호',type:'text',pk:true,req:true},{name:'work_date',label:'작업일',type:'date',req:true},{name:'order_no',label:'수주번호',type:'text'},{name:'item_name',label:'품목',type:'text'},{name:'worker',label:'작업자',type:'text'},{name:'good_qty',label:'양품',type:'num',sample:'980'},{name:'defect_qty',label:'불량',type:'num',sample:'20'},{name:'total_qty',label:'총생산수량',type:'num',formula:'good_qty + defect_qty',unit:'EA',decimals:0},{name:'defect_rate',label:'불량률',type:'num',formula:'IF(total_qty == 0, 0, defect_qty / total_qty * 100)',unit:'%',decimals:2},{name:'remark',label:'비고',type:'text'}]);
 tbl('vendors',[{name:'vendor_code',label:'거래처코드',type:'text',pk:true,req:true},{name:'vendor_name',label:'거래처명',type:'text',req:true},{name:'vendor_type',label:'구분',type:'text'},{name:'phone',label:'전화',type:'text'},{name:'is_active',label:'사용',type:'bool'}]);
 tbl('items',[{name:'item_code',label:'품목코드',type:'text',pk:true,req:true},{name:'item_name',label:'품목명',type:'text',req:true},{name:'spec',label:'규격',type:'text'},{name:'unit',label:'단위',type:'text'},{name:'unit_price',label:'단가',type:'num'}]);
 const use=(s,t,l)=>addEdge(SC[s].id,T[t].id,'uses',l);
 use('수주등록','sample_orders','저장/수정');use('수주현황','sample_orders','조회');use('수주 대시보드','sample_orders','KPI·기한알림');use('출하등록','shipments','저장');use('출하현황','shipments','조회');use('생산실적등록','prod_results','저장');use('생산실적현황','prod_results','조회');
 use('거래처관리','vendors','');use('품목관리','items','');use('수주등록','vendors','거래처 목록');use('수주등록','items','품목 목록');
 addEdge(T.shipments.id,T.sample_orders.id,'ref','order_no → sample_orders.order_no');addEdge(T.prod_results.id,T.sample_orders.id,'ref','order_no');
 addEdge(T.sample_orders.id,T.vendors.id,'ref','customer_name → vendor_name');addEdge(T.sample_orders.id,T.items.id,'ref','item_name → item_name');
 addEdge(SC['수주등록'].id,SC['출하등록'].id,'flow','수주 완료 후 출하');addEdge(SC['수주등록'].id,SC['생산실적등록'].id,'flow','수주 → 생산');
 addApprovalMasterPack();
 select(null);autoLayout();
 LAST_IMPORT=D.nodes.map(n=>n.id);updateImpBtn();
}
