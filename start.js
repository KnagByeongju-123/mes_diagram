/* ═══════════════ 시작 ═══════════════ */
/* 첫 인트로는 항상 빈 화면 (= 설계 › 신규작성(빈 화면) 과 동일).
   지난 작업은 자동으로 열지 않고, 있을 때만 상태줄의 [↩ 지난 작업 이어서] 로 되살린다.
   원본은 LS+'.prev' 에 한 벌 백업해 두므로 새로 그리기 시작해도 잃지 않는다. */
let LAST=null;
(function(){
 try{const s=JSON.parse(localStorage.getItem(LS)||'null');
  if(s&&s.D&&s.D.nodes&&s.D.nodes.length){LAST=s;
   try{localStorage.setItem(LS+'.prev',JSON.stringify(s))}catch(e){}}
 }catch(e){}
 D={nodes:[],edges:[]};curName='';updateTitle();
 select(null);view={x:40,y:40,k:1};render();introStat();
 try{$('skinMenu').innerHTML=skinMenuHtml()}catch(e){}
})();
function introStat(){
 $('stat').innerHTML='빈 설계 — [＋ 추가] 로 블록을 놓거나, [설계] 메뉴의 문답·모듈·샘플로 시작하세요.'
  +(LAST?' <button class="btn" style="height:20px;min-width:0;padding:0 8px;font-size:11px;margin-left:8px" onclick="resumeLast()">↩ 지난 작업 이어서</button>':'');
}
function resumeLast(){
 if(!LAST){try{LAST=JSON.parse(localStorage.getItem(LS+'.prev')||'null')}catch(e){}}
 if(!LAST||!LAST.D)return;
 clearDeleteUndo();D=LAST.D;view=LAST.view||{x:40,y:40,k:1};
 try{curName=localStorage.getItem('sysdesign.name')||''}catch(e){}
 updateTitle();select(null);render();save();
 $('stat').textContent=`지난 작업을 불러왔습니다 — 블록 ${D.nodes.length} · 연결 ${D.edges.length}`;
}
window.addEventListener('resize',()=>render());

/* ── 우측 패널 폭 조절 ───────────────────────────── */
const SIDE_DEF=420, SIDE_MIN=300, SIDE_KEY='sysdesign.sideW';
function sideMax(){return Math.max(SIDE_MIN,Math.round(window.innerWidth*0.7))}
function setSide(w,save){
 w=Math.max(SIDE_MIN,Math.min(sideMax(),Math.round(w)));
 document.documentElement.style.setProperty('--side',w+'px');
 if(save!==false){try{localStorage.setItem(SIDE_KEY,w)}catch(e){}}
 return w;
}
function curSide(){return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--side'))||SIDE_DEF}
function sideW(d){setSide(d?curSide()+d:SIDE_DEF);render()}
(function initResz(){
 try{const s=parseInt(localStorage.getItem(SIDE_KEY));if(s)setSide(s,false)}catch(e){}
 const h=document.getElementById('resz');if(!h)return;
 let drag=false;
 const move=e=>{if(!drag)return;const x=(e.touches?e.touches[0].clientX:e.clientX);setSide(window.innerWidth-x)};
 const up=()=>{if(!drag)return;drag=false;h.classList.remove('on');document.body.classList.remove('resizing');render()};
 const down=e=>{drag=true;h.classList.add('on');document.body.classList.add('resizing');e.preventDefault()};
 h.addEventListener('mousedown',down);
 h.addEventListener('touchstart',down,{passive:false});
 window.addEventListener('mousemove',move);
 window.addEventListener('touchmove',move,{passive:false});
 window.addEventListener('mouseup',up);
 window.addEventListener('touchend',up);
 h.addEventListener('dblclick',()=>{setSide(SIDE_DEF);render()});
 window.addEventListener('resize',()=>setSide(curSide(),false));
})();
