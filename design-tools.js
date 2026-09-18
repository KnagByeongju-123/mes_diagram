/* ═══════════════ 화면 스킨 (mes_screen.css 테마) ═══════════════
   PV_CSS(기본 뼈대) 뒤에 덧씌우는 CSS. 클래스 규약(.screen/.title/.body/.panel/.cap/
   .filters/.lab/.field/.formgrid/.tablewrap/.btn/.modal)은 그대로 두고 겉모습만 바꾼다.
   → 미리보기 · ▶시스템 생성(mes_screen.css) · 단일 index.html 모두 같은 스킨을 쓴다. */
const SKIN={
 base:{name:'MES 표준 (기본)',desc:'생성기 기본 폼 — 태진 금형제작 계열을 일반화한 밝은 ERP. 원본 그대로는 아래 [태진 금형제작] 테마',css:'',shell:''},

 'mm-dark':{name:'mm 현장 다크',desc:'mm_main 원본 — index.html · head_moldpart_input · mold_repair · work_status (slate #0f172a + ice)',
  css:`/* ── mm 현장 다크 (mm_main 원본 팔레트) ── */
:root{--line:#334155;--line2:#475569;--blue:#7dd3fc;--blue2:rgba(125,211,252,.22);--ink:#e2e8f0;--bg:#0f172a;--sel:#0ea5e9;
 --mm-card:#1e293b;--mm-hi:#283447;--mm-deep:#16202f;--mm-sub:#94a3b8;--mm-dim:#64748b;--mm-ice:#7dd3fc;--mm-green:#4ade80;--mm-rose:#fca5a5;--mm-orange:#fdba74;--mm-purple:#c4b5fd}
body{font-family:-apple-system,BlinkMacSystemFont,"Malgun Gothic","Apple SD Gothic Neo",sans-serif;font-size:13px;color:var(--ink);
 background:radial-gradient(circle at 0% 0%,rgba(56,189,248,.10) 0%,transparent 45%),radial-gradient(circle at 100% 100%,rgba(139,92,246,.10) 0%,transparent 45%),linear-gradient(180deg,#0b1220 0%,#0f172a 100%);background-attachment:fixed}
::-webkit-scrollbar-thumb{background:#334155}
.screen{background:transparent}
.title{height:auto;min-height:54px;padding:13px 14px;border-bottom:1px solid rgba(125,211,252,.18);background:linear-gradient(180deg,rgba(15,23,42,.96),rgba(15,23,42,.84))}
.title h1{font-size:19px;font-weight:700;color:#f1f5f9}
.title h1:before{content:'';display:inline-block;width:4px;height:17px;margin-right:9px;border-radius:2px;background:var(--mm-ice);vertical-align:-2px}
.title small{color:var(--mm-sub)}
.body{padding:10px;gap:10px}
.foot{background:rgba(15,23,42,.92);border-top:1px solid var(--line);color:var(--mm-sub)}
.foot .msg,.msg{color:var(--mm-sub)}.foot .right,.rightmsg{color:var(--mm-dim)}
.panel{background:var(--mm-card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.cap,.box-title,.grid-title{height:36px;padding:0 12px;background:transparent;border-bottom:1px solid var(--line);color:#f1f5f9;font-weight:700}
.cap:before{content:'';width:4px;height:15px;margin-right:8px;border-radius:2px;background:var(--mm-ice);flex-shrink:0}
.cap .right{color:var(--mm-sub);font-weight:500}
.filters{padding:9px;gap:6px;border-bottom:1px solid var(--line)}
.filters .lab{min-width:0}
.lab,.label{background:transparent;border:0;color:var(--mm-sub);font-size:12px;font-weight:600;justify-content:flex-start;min-height:30px;padding:0 2px}
.field,.check{height:30px;background:var(--mm-hi);border:1px solid var(--line);border-radius:8px;padding:0 10px;color:var(--ink)}
.field:focus{outline:0;border-color:var(--mm-ice);box-shadow:0 0 0 2px rgba(125,211,252,.20)}
.field[readonly]{background:var(--mm-deep);color:var(--mm-dim)}
.field.req{border-left:3px solid #ef4444}
textarea.field{padding:7px 10px}
.formgrid{border:0;gap:8px 10px;padding:11px;grid-template-columns:repeat(3,minmax(74px,max-content) minmax(0,1fr))}
.formgrid>*{border:0}
.formgrid>.field,.formgrid>.check{border:1px solid var(--line)}
@media(max-width:1400px){.formgrid{grid-template-columns:repeat(2,minmax(74px,max-content) minmax(0,1fr))}}
@media(max-width:880px){.formgrid{grid-template-columns:minmax(74px,max-content) minmax(0,1fr)}}
.tablewrap{background:transparent}
th{background:var(--mm-deep);color:var(--mm-sub);border-bottom:1px solid var(--line2);font-weight:700}
th,td{border-right:0;border-bottom:1px solid #2a3647;padding:8px 10px}
tbody tr:hover{background:var(--mm-hi)}
tbody tr.sel,tbody tr.on{background:rgba(14,165,233,.30);color:#f8fafc}
td.num,td.money{color:#e8eef6}
tr.dirty td:first-child{box-shadow:inset 3px 0 0 var(--mm-orange)}
.empty{color:var(--mm-dim)}
.group-title{height:30px;background:var(--mm-deep);border-bottom:1px solid var(--line);color:var(--mm-ice)}
.row-item{min-height:32px;border-bottom:1px solid #2a3647}
.row-item span{border-right:0;padding:7px 10px}
.row-item:hover{background:var(--mm-hi)}.row-item.on{background:rgba(14,165,233,.30);color:#f8fafc}
.actions{padding:8px;gap:8px}
.btn{height:34px;min-width:66px;padding:0 13px;border:1px solid var(--line);border-radius:8px;background:var(--mm-hi);color:#cbd5e1;font-weight:600}
.btn:hover{background:#31405a;border-color:var(--line2)}
.btn.primary{background:linear-gradient(135deg,#0284c7,#0ea5e9);border-color:#0ea5e9;color:#f0f9ff}
.btn.warn{background:linear-gradient(135deg,#b91c1c,#dc2626);border-color:#ef4444;color:#fee2e2}
.btn.pink{background:linear-gradient(135deg,#7e22ce,#a855f7);border-color:#c4b5fd;color:#f5f3ff}
.btn.sm{height:27px;min-width:0;padding:0 9px}
.modal{background:var(--mm-card);border:1px solid var(--line2);border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.55)}
.modal .t{height:42px;padding:0 14px;background:linear-gradient(135deg,#0284c7,#0ea5e9);color:#f0f9ff;border-radius:12px 12px 0 0}
.modal .bd{padding:14px}
.modal .bt{background:var(--mm-deep);border-top:1px solid var(--line)}
.modal-bg{background:rgba(2,6,16,.62)}
#toast{border-radius:10px;background:#15803d}#toast.err{background:#b91c1c}#toast.warn{background:#c2410c}
@media(max-width:680px){.title{min-height:46px;padding:10px 12px}.title h1{font-size:17px}}`,
  shell:`:root{--steel:#0b1220;--steel-2:#111a2b;--steel-3:#1e293b;--paper:#0f172a;--white:#1e293b;
 --ink:#e2e8f0;--ink-2:#cbd5e1;--ink-3:#94a3b8;--line:#334155;--line-2:#1e293b;--amber:#7dd3fc;--green:#4ade80;--red:#fca5a5;--blue:#38bdf8;--gray:#64748b}
body{background:linear-gradient(180deg,#0b1220 0%,#0f172a 100%);color:var(--ink)}`},

 'mm-card':{name:'mm 밝은 카드',desc:'mm_main 원본 — purchase_order.html (배경 #f4f6fa · 남색 #1e40af · 좌측 4px 카드)',
  css:`/* ── mm 밝은 카드 (purchase_order.html 원본 팔레트) ── */
:root{--line:#e5e7eb;--line2:#cbd5e1;--blue:#2563eb;--blue2:#dbeafe;--ink:#1f2937;--bg:#f4f6fa;--sel:#2563eb;--mm-navy:#1e40af;--mm-sub:#6b7280}
body{font-family:"Malgun Gothic","맑은 고딕",sans-serif;font-size:13px;color:var(--ink);background:#f4f6fa}
.screen{background:#f4f6fa}
.title{height:auto;min-height:56px;padding:14px 16px 12px;border-bottom:2px solid #cbd5e1;background:#f4f6fa}
.title h1{font-size:21px;font-weight:700;color:var(--mm-navy)}
.title h1:before{content:'▣';color:#2563eb;margin-right:8px}
.title small{color:var(--mm-sub)}
.body{padding:12px;gap:12px}
.foot{background:#fff;border-top:1px solid #e5e7eb;color:var(--mm-sub)}
.foot .msg,.msg{color:var(--mm-sub)}
.panel{background:#fff;border:1px solid #e5e7eb;border-left:4px solid #2563eb;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden}
.cap,.box-title,.grid-title{height:40px;padding:0 14px;background:#fff;border-bottom:1px solid #e5e7eb;color:var(--mm-navy);font-size:15px;font-weight:700}
.cap .right{color:var(--mm-sub);font-weight:500;font-size:13px}
.filters{padding:10px 12px;gap:6px;background:#f8fafc;border-bottom:1px solid #e5e7eb}
.lab,.label{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;color:#475569;font-weight:600;min-height:32px}
.field,.check{height:32px;border:1px solid #cbd5e1;border-radius:6px;padding:0 9px;background:#fff}
.field:focus{outline:0;border-color:#2563eb;box-shadow:0 0 0 2px #dbeafe}
.field[readonly]{background:#f1f5f9;color:#64748b}
.field.req{border-left:3px solid #ef4444}
.formgrid{border:0;gap:7px 8px;padding:12px}
.formgrid>*{border:0}
.formgrid>.field,.formgrid>.check{border:1px solid #cbd5e1}
.tablewrap{background:#fff}
th{background:var(--mm-navy);color:#fff;border-bottom:0;border-right:1px solid #2b4fbd;font-weight:600}
th,td{padding:7px 10px;border-right:0;border-bottom:1px solid #eef2f7}
tbody tr:hover{background:#f1f5f9}
tbody tr.sel,tbody tr.on{background:#dbeafe;color:#1e3a8a}
tbody tr.sel a,tbody tr.on a{color:#1e3a8a}
tr.dirty td:first-child{box-shadow:inset 3px 0 0 #f59e0b}
.empty{color:#94a3b8;padding:36px 0}
.group-title{height:32px;background:#eef2ff;border-bottom:1px solid #dbe3f5;color:var(--mm-navy)}
.row-item{min-height:32px;border-bottom:1px solid #eef2f7}
.row-item span{padding:7px 10px;border-right:0}
.row-item:hover{background:#f1f5f9}.row-item.on{background:#dbeafe;color:#1e3a8a}
.actions{padding:8px;gap:7px}
.btn{height:32px;min-width:68px;padding:0 13px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#374151;font-weight:500}
.btn:hover{background:#f1f5f9;border-color:#2563eb;color:var(--mm-navy)}
.btn.primary{background:#2563eb;border-color:#2563eb;color:#fff;font-weight:600}
.btn.primary:hover{background:#1d4ed8;color:#fff}
.btn.warn{background:#dc2626;border-color:#dc2626;color:#fff}.btn.warn:hover{background:#b91c1c;color:#fff}
.btn.pink{background:#db2777;border-color:#db2777;color:#fff}
.btn.sm{height:26px;min-width:0;padding:0 9px;font-size:12px}
.modal{border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 12px 40px rgba(15,23,42,.22)}
.modal .t{height:44px;padding:0 16px;background:var(--mm-navy);border-radius:12px 12px 0 0}
.modal .bd{padding:14px}
.modal .bt{background:#f8fafc;border-top:1px solid #e5e7eb}
#toast{border-radius:8px}
@media(max-width:680px){.title{min-height:48px}.title h1{font-size:18px}}`,
  shell:`:root{--steel:#1e40af;--steel-2:#1d4ed8;--steel-3:#2563eb;--paper:#f4f6fa;--line:#e5e7eb;--line-2:#1d4ed8;--amber:#f59e0b;--ink:#1f2937;--ink-2:#4b5563;--ink-3:#6b7280;--blue:#2563eb}`},

 'mm-erp':{name:'mm PC ERP 블루',desc:'mm_main 원본 — mes_main.html 통합 프레임 (#2d66ad · 12px 조밀 그리드)',
  css:`/* ── mm PC ERP 블루 (mes_main.html 원본 팔레트) ── */
:root{--line:#a9b6c4;--line2:#c8d1da;--blue:#2d66ad;--blue2:#dce8f6;--ink:#25313d;--bg:#eef2f5;--sel:#2d66ad;--mm-dark:#1f4f8c;--mm-muted:#667483}
body{font-family:"Malgun Gothic","맑은 고딕",Arial,sans-serif;font-size:12px;color:var(--ink);background:#dfe5ea}
.screen{background:#eef2f5}
.title{height:44px;padding:0 12px;border-bottom:2px solid #2d66ad;background:linear-gradient(#f7fafc,#e7edf3)}
.title h1{font-size:17px;font-weight:700;color:var(--mm-dark)}
.title h1:before{content:'▪';color:#2d66ad;margin-right:7px}
.title small{color:var(--mm-muted)}
.body{padding:7px;gap:7px}
.foot{height:26px;background:#e7edf3;border-top:1px solid #9aa8b5;color:var(--mm-muted)}
.panel{border:1px solid #8494a4;background:#fff}
.cap,.box-title,.grid-title{height:28px;background:#edf2f6;border-bottom:1px solid #aab6c1;color:var(--mm-dark)}
.cap .right{color:var(--mm-muted)}
.filters{background:#fff;border-bottom:1px solid #d6dde4;padding:4px}
.lab,.label{background:#e7edf3;border:1px solid #c8d1da;color:#3c4d5e;font-weight:600;min-height:24px}
.field,.check{height:24px;border:1px solid #b2bec9}
.field:focus{outline:0;border-color:#2d66ad;box-shadow:0 0 0 1px #dce8f6}
.field.req{border-left:3px solid #c0392b}
.formgrid{border:1px solid #a9b6c4;border-right:0;border-bottom:0}
.formgrid>*{border-right:1px solid #b2bec9;border-bottom:1px solid #b2bec9}
th{background:linear-gradient(#f2f6f9,#dfe7ee);color:#31465c;border-bottom:1px solid #aab6c1;font-weight:700}
th,td{padding:4px 8px;border-right:1px solid #dde3e9;border-bottom:1px solid #dde3e9}
tbody tr:hover{background:#eaf2fa}
tbody tr.sel,tbody tr.on{background:#2d66ad;color:#fff}
.group-title{background:#e7edf3;border-bottom:1px solid #aab6c1;color:var(--mm-dark)}
.row-item:hover{background:#eaf2fa}.row-item.on{background:#2d66ad;color:#fff}
.btn{height:26px;min-width:68px;background:linear-gradient(#fdfefe,#e3eaef);border:1px solid #9aa8b5}
.btn:hover{background:#fff;border-color:#2d66ad}
.btn.primary{background:linear-gradient(#e9f2fb,#cfe0f2);color:var(--mm-dark);border-color:#7ea4c8;font-weight:700}
.btn.warn{background:linear-gradient(#fff,#f6dcdc);color:#9c2b2b;border-color:#c89b9b}
.btn.sm{height:22px;min-width:0;padding:0 7px;font-size:11px}
.modal{border:1px solid #6f8296}
.modal .t{height:30px;background:linear-gradient(#3d76b5,#2d66ad)}
.modal .bt{background:#eef2f5;border-top:1px solid #c8d1da}`,
  shell:`:root{--steel:#2d66ad;--steel-2:#1f4f8c;--steel-3:#3d76b5;--paper:#dfe5ea;--line:#c8d1da;--line-2:#1f4f8c;--amber:#f2a93b;--ink:#25313d;--ink-2:#3c4d5e;--ink-3:#667483;--blue:#2d66ad}`},
 'tjd-mold':{name:'태진 금형제작',desc:'ESG_Smart_Factory_Mold 원본 — 파란 표머리(#e8f1f8→#c8dbe9) · 얼룩무늬 행 · 라벨 우측정렬 · 48px 제목',
  css:`/* ── 태진 금형제작 (ESG_Smart_Factory_Mold 원본 팔레트) ── */
:root{--line:#9ba8b4;--line2:#c6d0d8;--blue:#2f75b5;--blue2:#d7e7f2;--ink:#344757;--bg:#f6f8fa;--sel:#2d75b7;--head1:#e8f1f8;--head2:#c8dbe9}
body{font-family:"Malgun Gothic","맑은 고딕",Arial,sans-serif;font-size:12px;color:var(--ink)}
.title{height:48px;padding:8px 14px 5px;border-bottom:2px solid #3978ae}
.title h1{font-size:22px;font-weight:500;color:#4b5c6a}
.title h1:before{content:'\\25ef';margin-right:6px;color:#8c9aa5}
.foot{height:42px;padding:5px 14px;background:#eef2f5}
.foot .msg,.msg{color:#687784}.foot .right,.rightmsg{color:#7c8993}
.cap,.box-title,.grid-title{color:#4b5c6a}
/* 입력폼 — 테두리 격자 대신 여백 배치 + 우측정렬 라벨 */
.formgrid{border:0;background:#fafbfc;border-bottom:1px solid var(--line2);gap:4px 5px;padding:8px 14px;
 grid-template-columns:repeat(3,72px minmax(96px,1fr));align-items:center}
.formgrid>*{border:0}
.lab,.label{background:transparent;border:0;font-weight:700;justify-content:flex-end;text-align:right;padding-right:4px;color:#4b5c6a;min-height:27px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:27px}
.field,.check{height:27px;border:1px solid #aab6c1}
.field:focus{border-color:var(--blue);box-shadow:0 0 0 1px var(--blue2)}
@media(max-width:1400px){.formgrid{grid-template-columns:repeat(2,72px minmax(96px,1fr))}}
@media(max-width:880px){.formgrid{grid-template-columns:72px minmax(96px,1fr)}}
/* 표 — 파란 헤더 · 얼룩무늬 */
th{background:linear-gradient(var(--head1),var(--head2));color:#405266;text-align:center;border-bottom:1px solid var(--line)}
tbody tr:nth-child(even) td{background:#fafcfd}
tbody tr:hover td{background:#edf6fd}
tbody tr.sel td,tbody tr.on td{background:#2d75b7;color:#fff}
.group-title{background:linear-gradient(var(--head1),var(--head2));color:#405266;border-bottom:1px solid var(--line)}
.row-item:hover{background:#edf6fd}.row-item.on{background:#2d75b7;color:#fff}
.btn{height:29px;min-width:62px;border:1px solid #9ba8b4;background:linear-gradient(#fff,#dfe6eb)}
.btn:hover{background:#fff}
.btn.primary{background:linear-gradient(#f9ffff,#d2e7f6);color:#1e5e91;border-color:#7fa6c9}
.modal .t{background:linear-gradient(#5f8fb5,#2f75b5)}`,
  shell:`:root{--steel:#2f75b5;--steel-2:#26639c;--steel-3:#3d82c0;--paper:#f6f8fa;--line:#c6d0d8;--line-2:#26639c;--amber:#f2a93b;--ink:#344757;--ink-2:#4b5c6a;--ink-3:#7c8993;--blue:#2f75b5}`},
 'esg-check':{name:'ESG 체크시트 다크',desc:'ESG 스마트팩토리 원본 — P_machine_check · P_mold_check · QC_dim · fire_check · approval_report (slate #0f172a · Noto Sans KR · 큰 터치 버튼)',
  font:'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap',
  css:`/* ── ESG 체크시트 다크 (smtec_main2 원본 팔레트 · 모바일 우선) ── */
:root{--line:#475569;--line2:#334155;--blue:#f59e0b;--blue2:rgba(245,158,11,.22);--ink:#e2e8f0;--bg:#0f172a;--sel:#f59e0b;
 --es-surface:#1e293b;--es-surface2:#334155;--es-accent:#f59e0b;--es-accent2:#d97706;--es-ok:#22c55e;--es-ng:#ef4444;--es-text2:#94a3b8;--es-text3:#64748b;--es-radius:12px}
body{font-family:'Noto Sans KR',-apple-system,"Malgun Gothic",sans-serif;font-size:13px;color:var(--ink);background:var(--bg);-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar-thumb{background:#334155}
.screen{background:var(--bg)}
.title{height:auto;min-height:60px;padding:16px 16px 13px;border:0;background:linear-gradient(135deg,#78350f,#b45309);position:relative;overflow:hidden}
.title:after{content:'';position:absolute;inset:-50%;background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.02) 10px,rgba(255,255,255,.02) 20px);pointer-events:none}
.title h1{font-size:18px;font-weight:900;letter-spacing:-.3px;color:#fff;position:relative}
.title h1:before{content:none}
.title small{color:#fcd34d;font-size:11px;position:relative}
.title select{background:rgba(0,0,0,.25);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px}
.body{padding:12px;gap:12px}
.foot{height:auto;min-height:44px;background:var(--es-surface);border-top:1px solid rgba(255,255,255,.06);color:var(--es-text2)}
.foot .msg,.msg{color:var(--es-text2)}.foot .right,.rightmsg{color:var(--es-text3)}
.panel{background:var(--es-surface);border:1px solid rgba(255,255,255,.06);border-radius:var(--es-radius);overflow:hidden}
.cap,.box-title,.grid-title{height:40px;padding:0 16px;background:transparent;border-bottom:1px solid rgba(255,255,255,.06);color:var(--es-accent);font-size:12px;font-weight:700;letter-spacing:.5px}
.cap:before{content:'';width:3px;height:14px;margin-right:8px;border-radius:2px;background:var(--es-accent);flex-shrink:0}
.cap .right{color:var(--es-text3);font-weight:500;letter-spacing:0}
.filters{padding:10px 12px;gap:8px;border-bottom:1px solid rgba(255,255,255,.06)}
.filters .lab{min-width:0}
.lab,.label{background:transparent;border:0;color:var(--es-text2);font-size:11px;font-weight:600;justify-content:flex-start;min-height:34px;padding:0 2px}
.field,.check{height:40px;background:var(--bg);border:1.5px solid var(--line);border-radius:8px;padding:0 12px;font-size:15px;color:var(--ink)}
.field:focus{outline:0;border-color:var(--es-accent);box-shadow:none}
.field[readonly]{background:#0b1220;color:var(--es-text3)}
.field.req{border-left:3px solid var(--es-ng)}
textarea.field{padding:10px 12px;min-height:80px}
.formgrid{border:0;gap:10px 12px;padding:14px 16px;grid-template-columns:repeat(2,minmax(70px,max-content) minmax(0,1fr))}
.formgrid>*{border:0}
.formgrid>.field,.formgrid>.check{border:1.5px solid var(--line)}
@media(max-width:880px){.formgrid{grid-template-columns:minmax(70px,max-content) minmax(0,1fr)}}
.tablewrap{background:transparent}
th{background:var(--es-surface2);color:var(--es-text2);border-bottom:1px solid var(--line);font-size:11px;font-weight:600}
th,td{border-right:0;border-bottom:1px solid rgba(255,255,255,.04);padding:8px 8px}
tbody tr:hover{background:rgba(255,255,255,.03)}
tbody tr.sel,tbody tr.on{background:rgba(245,158,11,.18);color:#fde68a}
tr.dirty td:first-child{box-shadow:inset 3px 0 0 var(--es-accent)}
.empty{color:var(--es-text3)}
.group-title{height:32px;background:transparent;border-bottom:0;color:var(--es-text2);font-size:11px}
.row-item{min-height:44px;background:var(--bg);border:1.5px solid rgba(255,255,255,.06);border-radius:10px;margin:0 8px 6px}
.row-item span{border-right:0;padding:10px 12px;font-size:14px}
.row-item:hover{border-color:var(--line)}.row-item.on{background:rgba(245,158,11,.14);border-color:rgba(245,158,11,.4);color:#fde68a}
.actions{padding:10px 12px;gap:8px}
.btn{height:44px;min-width:0;flex:1 1 auto;padding:0 14px;border:1.5px solid var(--line);border-radius:10px;background:transparent;color:var(--es-text2);font-size:14px;font-weight:700;font-family:inherit;transition:transform .1s}
.btn:active{transform:scale(.97)}
.btn:hover{background:rgba(255,255,255,.04);color:var(--ink)}
.btn.primary{background:linear-gradient(135deg,#b45309,#f59e0b);border:0;color:#fff;font-weight:800;box-shadow:0 4px 16px rgba(245,158,11,.25)}
.btn.warn{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.4);color:#fca5a5}
.btn.pink{background:rgba(168,85,247,.15);border-color:rgba(168,85,247,.4);color:#d8b4fe}
.btn.sm{height:30px;flex:0 0 auto;padding:0 10px;font-size:11px;border-radius:6px}
/* 체크시트 — 원본 .check-item / .okng-btn */
.screen .item{grid-template-columns:32px minmax(0,1fr) 168px;min-height:52px;margin:0 8px 6px;padding:2px 4px;background:var(--bg);border:1.5px solid rgba(255,255,255,.06);border-radius:10px}
.screen .item .no{color:var(--es-text3);font-size:11px}
.screen .item .nm{font-size:14px;font-weight:500}
.screen .tg button{height:34px;border:1.5px solid var(--line);background:transparent;border-radius:7px;color:var(--es-text3);font-weight:700;font-size:13px}
.screen .tg button.ok.on{background:var(--es-ok);border-color:var(--es-ok);color:#fff;box-shadow:0 2px 8px rgba(34,197,94,.3)}
.screen .tg button.ng.on{background:var(--es-ng);border-color:var(--es-ng);color:#fff;box-shadow:0 2px 8px rgba(239,68,68,.3)}
.screen .tg button.na.on{background:var(--es-surface2);border-color:var(--es-surface2);color:#cbd5e1}
.screen .sum{background:transparent;border-top:1px solid rgba(255,255,255,.06);color:var(--es-text2)}
.screen .sum .ng{color:#fca5a5}.screen .sum .res{background:var(--es-ok);border-radius:8px}.screen .sum .res.bad{background:var(--es-ng)}
/* 대시보드 타일 */
.screen .st{background:var(--es-surface);border:1px solid rgba(255,255,255,.06);border-left:3px solid var(--es-accent);border-radius:10px}
.screen .st .l{color:var(--es-text3)}.screen .st .v{color:var(--ink)}
.screen .st.ok{border-left-color:var(--es-ok)}.screen .st.ok .v{color:#86efac}
.screen .st.ng{border-left-color:var(--es-ng)}.screen .st.ng .v{color:#fca5a5}
.screen .st.warn{border-left-color:var(--es-accent)}.screen .st.warn .v{color:#fcd34d}
.screen .st.sum{border-left-color:#38bdf8}.screen .st.sum .v{color:#7dd3fc}
.screen .chip{background:var(--es-surface);border:1px solid var(--line);color:var(--es-text2);height:30px;border-radius:8px}
.screen .chip.on{background:var(--es-accent);border-color:var(--es-accent);color:#000}
.screen .cg{background:var(--es-surface);border:1px solid rgba(255,255,255,.06);border-radius:12px;overflow:hidden}
.screen .cg-hdr{background:var(--es-surface2);border-bottom:0}.screen .cg-hdr h2{color:#f1f5f9}.screen .cg-hdr .s{color:var(--es-text2)}
.screen .alert{background:#422006;border:1px solid #eab308;border-radius:12px}.screen .alert h3{color:#fbbf24}.screen .alert .it{background:rgba(0,0,0,.25);border-color:rgba(234,179,8,.4);color:#fde68a}
.screen .prog{background:var(--es-surface2)}
.modal{background:var(--es-surface);border:1px solid var(--line);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6)}
.modal .t{height:46px;padding:0 16px;background:linear-gradient(135deg,#78350f,#b45309);color:#fff;border-radius:14px 14px 0 0}
.modal .bd{padding:16px}.modal .bt{background:#0b1220;border-top:1px solid rgba(255,255,255,.06)}
.modal-bg{background:rgba(2,6,16,.7)}
#toast{border-radius:20px;background:rgba(0,0,0,.9);top:auto;bottom:70px;transform:translateX(-50%)}#toast.show{transform:translateX(-50%)}
@media(max-width:680px){.title{min-height:56px}.actions .btn{flex:1 1 40%}.screen .item{grid-template-columns:26px minmax(0,1fr) 150px}}`,
  shell:`:root{--steel:#0f172a;--steel-2:#1e293b;--steel-3:#334155;--paper:#0f172a;--white:#1e293b;--ink:#e2e8f0;--ink-2:#cbd5e1;--ink-3:#94a3b8;--line:#334155;--line-2:#334155;--amber:#f59e0b;--green:#22c55e;--red:#ef4444;--blue:#38bdf8;--gray:#64748b}
body{background:#0f172a;color:var(--ink);font-family:'Noto Sans KR',Pretendard,-apple-system,sans-serif}`},

 'esg-light':{name:'ESG 라이트 (모바일)',desc:'ESG 스마트팩토리 원본 — defect · board · material_upload · mold_parts · line_patrol · check_dashboard (#f0f2f5 · 빨강 헤더 · 흰 카드 그림자)',
  font:'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap',
  css:`/* ── ESG 라이트 (smtec_main2 defect.html 원본 팔레트 · 모바일 우선) ── */
:root{--line:#e0e0e0;--line2:#eeeeee;--blue:#1565c0;--blue2:#e3f2fd;--ink:#212121;--bg:#f0f2f5;--sel:#1565c0;
 --es-primary:#c62828;--es-primary-l:#ffebee;--es-accent:#1565c0;--es-accent-l:#e3f2fd;--es-ok:#2e7d32;--es-ok-l:#e8f5e9;--es-warn:#e65100;--es-gray:#888;--es-shadow:0 2px 8px rgba(0,0,0,.06);--es-radius:12px}
body{font-family:'Noto Sans KR',-apple-system,"Malgun Gothic",sans-serif;font-size:13px;color:var(--ink);background:var(--bg);-webkit-tap-highlight-color:transparent}
.screen{background:var(--bg)}
.title{height:auto;min-height:54px;padding:14px 16px;border:0;background:linear-gradient(135deg,#b71c1c,#c62828);color:#fff}
.title h1{font-size:17px;font-weight:800;letter-spacing:-.5px;color:#fff}
.title h1:before{content:none}
.title small{color:rgba(255,255,255,.7);font-size:10px}
.title select{background:rgba(255,255,255,.15);color:#fff;border:0;border-radius:6px}
.body{padding:12px;gap:12px}
.foot{height:auto;min-height:44px;background:#fff;border-top:1px solid var(--line);color:#555}
.foot .msg,.msg{color:#555}.foot .right,.rightmsg{color:var(--es-gray)}
.panel{background:#fff;border:0;border-radius:var(--es-radius);box-shadow:var(--es-shadow);overflow:hidden}
.cap,.box-title,.grid-title{height:42px;padding:0 14px;background:#fff;border-bottom:1px solid #f0f0f0;color:#212121;font-size:14px;font-weight:700}
.cap .right{color:var(--es-gray);font-weight:500;font-size:12px}
.filters{padding:10px 12px;gap:8px;background:#fafafa;border-bottom:1px solid #f0f0f0}
.filters .lab{min-width:0}
.lab,.label{background:transparent;border:0;color:var(--es-accent);font-size:11px;font-weight:700;letter-spacing:-.3px;justify-content:flex-start;min-height:36px;padding:0 2px}
.field,.check{height:38px;border:1.5px solid #ddd;border-radius:8px;padding:0 10px;font-size:14px;background:#fff}
.field:focus{outline:0;border-color:var(--es-accent);box-shadow:0 0 0 2px var(--es-accent-l)}
.field[readonly]{background:#f5f5f5;color:#777}
.field.req{border-left:3px solid var(--es-primary)}
textarea.field{padding:10px;min-height:60px}
.formgrid{border:0;gap:8px 10px;padding:14px;grid-template-columns:repeat(2,minmax(70px,max-content) minmax(0,1fr))}
.formgrid>*{border:0}
.formgrid>.field,.formgrid>.check{border:1.5px solid #ddd}
@media(max-width:880px){.formgrid{grid-template-columns:minmax(70px,max-content) minmax(0,1fr)}}
th{background:#f5f5f5;color:#555;border-bottom:2px solid var(--line);font-size:12px;font-weight:700}
th,td{border-right:0;border-bottom:1px solid #f0f0f0;padding:8px 10px}
tbody tr:hover{background:#fafafa}
tbody tr.sel,tbody tr.on{background:var(--es-accent-l);color:#0d47a1}
tbody tr.sel a,tbody tr.on a{color:#0d47a1}
tr.dirty td:first-child{box-shadow:inset 3px 0 0 var(--es-warn)}
.empty{color:#999}
.group-title{height:32px;background:#fafafa;border-bottom:1px solid #f0f0f0;color:#555;font-size:12px}
.row-item{min-height:44px;border-bottom:1px solid #f0f0f0}
.row-item span{border-right:0;padding:10px 12px;font-size:14px}
.row-item:hover{background:#fafafa}.row-item.on{background:var(--es-accent-l);color:#0d47a1}
.actions{padding:10px 12px;gap:8px}
.btn{height:44px;min-width:0;flex:1 1 auto;padding:0 14px;border:1px solid #ddd;border-radius:10px;background:#f5f5f5;color:#555;font-size:14px;font-weight:700;font-family:inherit;transition:transform .1s}
.btn:active{transform:scale(.97)}
.btn:hover{background:#eee;color:#212121;border-color:#ccc}
.btn.primary{background:linear-gradient(135deg,#c62828,#e53935);border:0;color:#fff;box-shadow:0 2px 8px rgba(198,40,40,.25)}
.btn.warn{background:#ef6c00;border:0;color:#fff}.btn.warn:hover{background:#e65100;color:#fff}
.btn.pink{background:linear-gradient(135deg,#1565c0,#42a5f5);border:0;color:#fff;box-shadow:0 2px 8px rgba(21,101,192,.2)}
.btn.sm{height:32px;flex:0 0 auto;padding:0 12px;font-size:12px;border-radius:8px}
/* 체크시트 */
.screen .item{min-height:48px;margin:0 8px 6px;padding:2px 4px;background:#fff;border:1.5px solid #eee;border-radius:10px}
.screen .item .nm{font-size:14px}
.screen .tg button{height:34px;border:1.5px solid #ddd;background:#fff;border-radius:7px;color:#999;font-weight:700}
.screen .tg button.ok.on{background:var(--es-ok);border-color:var(--es-ok);color:#fff}
.screen .tg button.ng.on{background:var(--es-primary);border-color:var(--es-primary);color:#fff}
.screen .sum{background:#fafafa;border-top:1px solid #f0f0f0}.screen .sum .res{border-radius:8px}
/* 대시보드 타일 */
.screen .st{background:#fff;border:0;border-left:4px solid #bbb;border-radius:10px;box-shadow:var(--es-shadow)}
.screen .st.sum{border-left-color:var(--es-accent)}.screen .st.sum .v{color:var(--es-accent)}
.screen .chip{border-radius:8px;height:30px;border-color:#ddd;color:#555}
.screen .chip.on{background:var(--es-primary);border-color:var(--es-primary);color:#fff}
.screen .cg{border:0;border-radius:12px;box-shadow:var(--es-shadow);overflow:hidden}
.screen .cg-hdr{background:#fff;border-bottom:1px solid #f0f0f0}
.screen .alert{border-radius:12px;background:var(--es-primary-l);border-color:#ffcdd2}
.modal{border:0;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.25)}
.modal .t{height:46px;padding:0 16px;background:linear-gradient(135deg,#b71c1c,#c62828);border-radius:14px 14px 0 0}
.modal .bd{padding:16px}.modal .bt{background:#fafafa;border-top:1px solid #f0f0f0}
#toast{border-radius:20px;background:rgba(0,0,0,.85);top:auto;bottom:70px}#toast.show{transform:translateX(-50%)}
@media(max-width:680px){.actions .btn{flex:1 1 40%}}`,
  shell:`:root{--steel:#b71c1c;--steel-2:#c62828;--steel-3:#e53935;--paper:#f0f2f5;--line:#e0e0e0;--line-2:#c62828;--amber:#ffb74d;--ink:#212121;--ink-2:#555;--ink-3:#888;--blue:#1565c0;--green:#2e7d32;--red:#c62828}
body{font-family:'Noto Sans KR',Pretendard,-apple-system,sans-serif}`},

 'esg-mon':{name:'ESG MES 모니터 다크',desc:'ESG 스마트팩토리 원본 — index.html 허브 · mes_work · env_dashboard · material_attach · twin_factory (#0f1117 · sky #38bdf8 · KPI 타일)',
  font:'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap',
  css:`/* ── ESG MES 모니터 다크 (smtec_main2 mes_work.html 원본 팔레트) ── */
:root{--line:#2a2e3d;--line2:#3a3f52;--blue:#38bdf8;--blue2:rgba(56,189,248,.22);--ink:#e8eaf0;--bg:#0f1117;--sel:#38bdf8;
 --es-card:#1a1d27;--es-card2:#222838;--es-sub:#8b8fa3;--es-accent:#38bdf8;--es-green:#22c55e;--es-red:#ef4444;--es-yellow:#eab308;--es-orange:#f97316;--es-radius:12px}
body{font-family:'Noto Sans KR',-apple-system,"Malgun Gothic",sans-serif;font-size:13px;color:var(--ink);background:var(--bg)}
::-webkit-scrollbar-thumb{background:#2a2e3d}
.screen{background:var(--bg)}
.title{height:auto;min-height:56px;padding:14px 20px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,#181b26,var(--bg))}
.title h1{font-size:17px;font-weight:800;color:var(--es-accent)}
.title h1:before{content:none}
.title small{color:var(--es-sub);font-size:11px}
.title .live{color:var(--es-sub)}.title .dot{background:var(--es-green)}
.title select{background:var(--es-card);color:var(--ink);border:1px solid var(--line);border-radius:6px}
.body{padding:14px;gap:12px}
.foot{background:var(--es-card);border-top:1px solid var(--line);color:var(--es-sub)}
.foot .msg,.msg{color:var(--es-sub)}.foot .right,.rightmsg{color:#6b7085}
.panel{background:var(--es-card);border:1px solid var(--line);border-radius:var(--es-radius);overflow:hidden}
.cap,.box-title,.grid-title{height:40px;padding:0 16px;background:#334155;border-bottom:0;color:#f1f5f9;font-size:14px;font-weight:700}
.cap .right{color:#cbd5e1;font-weight:500;font-size:12px}
.filters{padding:10px 12px;gap:6px;border-bottom:1px solid var(--line)}
.filters .lab{min-width:0}
.lab,.label{background:transparent;border:0;color:var(--es-sub);font-size:12px;font-weight:600;justify-content:flex-start;min-height:34px;padding:0 2px}
.field,.check{height:36px;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:0 12px;color:var(--ink);font-size:13px}
.field:focus{outline:0;border-color:var(--es-accent);box-shadow:none}
.field[readonly]{background:#0b0d13;color:#6b7085}
.field.req{border-left:3px solid var(--es-red)}
.formgrid{border:0;gap:8px 10px;padding:14px 16px}
.formgrid>*{border:0}
.formgrid>.field,.formgrid>.check{border:1px solid var(--line)}
.tablewrap{background:transparent}
th{background:var(--es-card);color:var(--es-sub);border-bottom:2px solid var(--line);font-size:10px;font-weight:600;text-transform:uppercase}
th,td{border-right:0;border-bottom:1px solid rgba(42,46,61,.5);padding:7px 8px;font-size:12px}
tbody tr:hover{background:rgba(255,255,255,.03)}
tbody tr.sel,tbody tr.on{background:rgba(56,189,248,.16);color:#e0f2fe}
.empty{color:#6b7085}
.group-title{height:36px;background:#334155;border-bottom:0;color:#f1f5f9}
.row-item{min-height:36px;border-bottom:1px solid rgba(42,46,61,.5)}
.row-item span{border-right:0}
.row-item:hover{background:rgba(255,255,255,.03)}.row-item.on{background:rgba(56,189,248,.16);color:#e0f2fe}
.actions{padding:10px 12px;gap:8px}
.btn{height:38px;min-width:0;padding:0 18px;border:0;border-radius:10px;background:var(--es-card2);color:var(--ink);font-size:13px;font-weight:700;font-family:inherit}
.btn:hover{background:#2b3245}
.btn.primary{background:var(--es-accent);color:#0f172a}
.btn.warn{background:linear-gradient(135deg,#c2410c,var(--es-orange));color:#fff}
.btn.pink{background:linear-gradient(135deg,#7e22ce,#a855f7);color:#fff}
.btn.sm{height:28px;padding:0 12px;font-size:11px;border-radius:8px;border:1px solid var(--line);background:var(--es-card);color:var(--es-sub)}
/* 대시보드 — 원본 .stats/.st/.cg/.alert-box/.fbtn */
.screen .stats{grid-template-columns:repeat(auto-fit,minmax(110px,1fr))}
.screen .st{background:var(--es-card);border:0;border-left:3px solid var(--es-accent);border-radius:10px;text-align:center;padding:10px}
.screen .st .l{color:var(--es-sub);font-size:10px}.screen .st .v{font-size:20px;font-weight:800;color:var(--ink)}
.screen .st.ok{border-left-color:var(--es-green)}.screen .st.ok .v{color:var(--es-green)}
.screen .st.ng{border-left-color:var(--es-red)}.screen .st.ng .v{color:#fca5a5}
.screen .st.warn{border-left-color:var(--es-yellow)}.screen .st.warn .v{color:#fbbf24}
.screen .st.sum{border-left-color:var(--es-accent)}.screen .st.sum .v{color:var(--es-accent)}
.screen .alert{background:#422006;border:1px solid var(--es-yellow);border-radius:12px}.screen .alert h3{color:var(--es-yellow)}.screen .alert .it{background:rgba(0,0,0,.25);border-color:rgba(234,179,8,.4);color:#fde68a}
.screen .chip{height:28px;padding:0 12px;border:1px solid var(--line);background:var(--es-card);color:var(--es-sub);border-radius:8px;font-size:11px;font-weight:600}
.screen .chip.on{background:var(--es-accent);border-color:var(--es-accent);color:#0f172a}
.screen .cg{background:var(--es-card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.screen .cg-hdr{background:#334155;border-bottom:0}.screen .cg-hdr h2{color:#f1f5f9;font-size:14px}.screen .cg-hdr .s{color:#cbd5e1}
.screen .cg-hdr .gr{color:var(--es-green)}.screen .cg-hdr .rd{color:#fca5a5}
.screen .badge{border-radius:6px}
.screen .prog{background:#334155;height:6px;width:48px}
.screen tr.dim td{color:#6b7085;background:transparent}
/* 체크시트 */
.screen .item{min-height:44px;border-bottom:1px solid rgba(42,46,61,.6)}
.screen .tg button{height:30px;border:1px solid var(--line);background:var(--es-card2);border-radius:6px;color:var(--es-sub);font-weight:700}
.screen .tg button.ok.on{background:var(--es-green);border-color:var(--es-green);color:#fff}
.screen .tg button.ng.on{background:var(--es-red);border-color:var(--es-red);color:#fff}
.screen .sum{background:var(--es-card);border-top:1px solid var(--line)}
.modal{background:var(--es-card);border:1px solid var(--line);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6)}
.modal .t{height:44px;padding:0 16px;background:#334155;color:#f1f5f9;border-radius:14px 14px 0 0}
.modal .bd{padding:16px}.modal .bt{background:#0b0d13;border-top:1px solid var(--line)}
.modal-bg{background:rgba(0,0,0,.7)}
#toast{border-radius:20px;background:rgba(0,0,0,.9);top:auto;bottom:70px}#toast.show{transform:translateX(-50%)}
@media(max-width:680px){.screen .stats{grid-template-columns:repeat(3,1fr)}.actions .btn{flex:1 1 40%}}`,
  shell:`:root{--steel:#0f1117;--steel-2:#1a1d27;--steel-3:#222838;--paper:#0f1117;--white:#1a1d27;--ink:#e8eaf0;--ink-2:#cbd5e1;--ink-3:#8b8fa3;--line:#2a2e3d;--line-2:#2a2e3d;--amber:#38bdf8;--green:#22c55e;--red:#ef4444;--blue:#38bdf8;--gray:#6b7085}
body{background:#0f1117;color:var(--ink);font-family:'Noto Sans KR',Pretendard,-apple-system,sans-serif}`},
 'gi-erp':{name:'GI MES ERP (경일)',desc:'Gyeongil 원본 ki_style.css — HC Smart 준용 · 맑은고딕 12px · #2469a8 블루 · 교차 줄무늬 그리드 · 신규(분홍)/저장(파랑)/삭제(빨강) 버튼',
  css:`/* ── GI MES ERP (Gyeongil ki_style.css 원본 팔레트) ── */
:root{--line:#aeb8c2;--line2:#d1d9e0;--blue:#2469a8;--blue2:#dbe8f5;--ink:#273746;--bg:#dfe4e9;--sel:#c9ddf3;--gi-dark:#1d568c;--gi-sel:#2e77bd}
body{font-family:"Malgun Gothic","맑은 고딕",Arial,sans-serif;font-size:12px;color:var(--ink);background:#d7dde3}
.screen{background:#fff;border:1px solid #8f9cab;box-shadow:0 1px 3px rgba(24,45,67,.15)}
.title{height:32px;padding:0 9px;border-bottom:1px solid #a9b6c2;background:linear-gradient(#fbfcfd,#e8edf2)}
.title h1{font-size:14px;font-weight:800;color:#41556a}
.title h1:before{content:'◯';color:#76879a;font-size:13px;margin-right:5px}
.title small{font-size:10px;color:#8894a0}
.body{padding:7px;gap:7px}
.foot{height:24px;padding:0 10px;background:#e7edf3;border-top:1px solid #9aa8b5;color:#667483;font-size:11px}
.panel{border:1px solid #a9b6c3;background:#f7f9fb}
.cap,.box-title,.grid-title{height:28px;padding:0 8px;background:#edf2f6;border-bottom:1px solid #aab6c1;color:#33506b;font-size:11px;font-weight:800}
.cap:before{content:'📌';margin-right:5px;font-size:10px}
.cap .right{color:#8b98a5;font-weight:400}
.filters{background:#f7f9fb;border-bottom:1px solid #d6dde4;padding:4px}
.lab,.label{background:#edf2f6;border:1px solid #d1d9e0;color:#526171;font-weight:700;min-height:24px;justify-content:flex-start}
.field,.check{height:24px;border:1px solid #aeb9c4;background:#fff;color:#42515f}
.field:focus{outline:0;border-color:var(--gi-sel);box-shadow:0 0 0 1px #dbe8f5}
.field[readonly]{background:#eef2f6;color:#68757f}
.field.req{border-left:3px solid #c0392b}
.formgrid{border:1px solid #a9b6c3;border-right:0;border-bottom:0;background:#f7f9fb}
.formgrid>*{border-right:1px solid #d1d9e0;border-bottom:1px solid #d6dde4}
.tablewrap{border:1px solid #8494a4;background:#fff}
th{height:27px;background:linear-gradient(#f3f6f8,#dce3e9);border-right:1px solid #aab7c3;border-bottom:1px solid #aab7c3;color:#33506b;font-weight:800}
td{height:26px;border-right:1px solid #d0d7de;border-bottom:1px solid #d9dfe5;padding:0 6px}
tbody tr:nth-child(even) td{background:#fafbfc}
tbody tr:hover td{background:#e8f1fa}
tbody tr.sel,tbody tr.on{background:#c9ddf3;color:#123a61;font-weight:700}
tbody tr.sel td,tbody tr.on td{background:#c9ddf3}
tbody tr.sel td:first-child,tbody tr.on td:first-child{box-shadow:inset 3px 0 0 #2f68ad}
tbody tr.sel a,tbody tr.on a{color:#123a61}
tr.dirty td:first-child{box-shadow:inset 3px 0 0 #e2a8c4}
.group-title{background:#eef2f6;border-top:1px solid #dfe5ea;border-bottom:1px solid #dfe5ea;color:#2f4559;font-weight:800}
.row-item{border-bottom:1px solid #eceff2}
.row-item:hover{background:#e8f1fa}.row-item.on{background:var(--gi-sel);color:#fff}
.actions{padding:6px 7px;background:#eef2f6;border-top:1px solid #d1d9e0;gap:5px}
.btn{height:24px;min-width:0;padding:0 10px;border:1px solid #9aa8b6;background:linear-gradient(#fff,#e1e7ec);color:#405163}
.btn:hover{border-color:#6e8fb3;background:#edf5fd}
.btn.primary{background:linear-gradient(#4f84c0,#2e67a8);color:#fff;border-color:#24578f;font-weight:700}
.btn.primary:hover{background:linear-gradient(#5b90cc,#3a73b4);color:#fff}
.btn.warn{background:linear-gradient(#fff,#fdecec);border-color:#daa;color:#b23030}.btn.warn:hover{background:#fbe0e0}
.btn.pink{background:linear-gradient(#fff,#fdeaf3);border-color:#e2a8c4;color:#a4356b;font-weight:700}.btn.pink:hover{background:#fbdcea;border-color:#d287ac}
.btn.sm{height:22px;padding:0 8px;font-size:11px}
/* 뱃지 (b-wait/run/done/late) */
.screen .badge{border-radius:2px;border:1px solid transparent;color:#1f4f8c;background:#e6f0fb;border-color:#b8cfe9}
.screen .badge.ok{background:#e6f5eb;color:#15803d;border-color:#b4ddc3}.screen .badge.ng{background:#fdecec;color:#b91c1c;border-color:#eab8b8}.screen .badge.warn{background:#fdf3e0;color:#8a5b12;border-color:#e6cfa2}
.screen .st{border:1px solid #a9b6c3;background:#fff;border-left:4px solid #2e67a8}
.screen .prog{background:#e6ebf0;border:1px solid #c8d2dc;border-radius:0;height:12px}.screen .prog i{background:linear-gradient(#5b93cd,#2e67a8)}
.screen .chip{border-radius:2px;height:24px;border-color:#9aa8b6;background:linear-gradient(#fff,#eef2f6);color:#546270;font-weight:700}
.screen .chip.on{background:linear-gradient(#3b4a5a,#25313d);border-color:#25313d;color:#fff}
.screen .cg{border:1px solid #8494a4}.screen .cg-hdr{background:#edf2f6;border-bottom:1px solid #aab6c1}
.screen .tg button.ok.on{background:#15803d;border-color:#15803d}.screen .tg button.ng.on{background:#b91c1c;border-color:#b91c1c}
.modal{border:1px solid #737f8a}
.modal .t{height:30px;background:linear-gradient(#4f84c0,#2e67a8)}
.modal .bt{background:#eef2f6;border-top:1px solid #d1d9e0}`,
  shell:`:root{--steel:#edf1f4;--steel-2:#e5edf5;--steel-3:#dce5ee;--paper:#dfe4e9;--line:#b2bdc6;--line-2:#c8d0d7;--amber:#265eb8;--ink:#273746;--ink-2:#546270;--ink-3:#8b98a5;--blue:#2469a8}
body{font-family:"Malgun Gothic","맑은 고딕",Arial,sans-serif}
.top{color:#546270;background:linear-gradient(#fafbfc,#edf1f4)}
.top .brand b,.top button{color:#546270}.top .brand .mark{color:#fff}`},

 'gi-mobile':{name:'GI 현장 QR (모바일)',desc:'Gyeongil 원본 — lot_qr · lot_vendor · qr_home · mobile_home (#eef2f6 · 15px 큰 글자 · 파랑 그라데이션 상단바 · 14px 둥근 카드 · 56px 하단 버튼)',
  css:`/* ── GI 현장 QR 모바일 (Gyeongil lot_qr.html 원본 팔레트) ── */
:root{--line:#dbe3ea;--line2:#e8eef3;--blue:#2668a8;--blue2:#dbe8f5;--ink:#16202b;--bg:#eef2f6;--sel:#2668a8;--gi-sub:#6b7a89;--gi-blue-d:#1b4b7d;--gi-green:#1f8a4c;--gi-orange:#e07b1c;--gi-red:#c0392b}
body{font:15px/1.6 'Malgun Gothic','맑은 고딕',-apple-system,sans-serif;color:var(--ink);background:var(--bg);-webkit-tap-highlight-color:transparent}
.screen{background:var(--bg)}
.title{height:auto;min-height:54px;padding:13px 15px;border:0;background:linear-gradient(135deg,#3579b8,#22537f);color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.14)}
.title h1{font-size:16px;font-weight:800;color:#fff}
.title h1:before{content:'▣';margin-right:8px;color:rgba(255,255,255,.8)}
.title small{color:rgba(255,255,255,.85);font-size:12px;font-weight:700;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);padding:3px 10px;border-radius:20px;margin-left:auto}
.body{padding:12px;gap:12px;max-width:600px;margin:0 auto;width:100%}
.foot{height:auto;min-height:48px;background:#fff;border-top:1px solid var(--line);color:var(--gi-sub);font-size:13px}
.panel{background:#fff;border:0;border-radius:14px;box-shadow:0 1px 3px rgba(20,40,60,.09);overflow:hidden}
.cap,.box-title,.grid-title{height:auto;min-height:38px;padding:12px 15px 4px;background:#fff;border:0;color:var(--gi-sub);font-size:12.5px;font-weight:800;letter-spacing:.3px}
.cap .right{color:#9aa7b3;font-weight:700;font-size:12px}
.filters{padding:10px 15px;gap:8px;border-bottom:1px solid #f0f3f6}
.filters .lab{min-width:0}
.lab,.label{background:transparent;border:0;color:var(--gi-sub);font-size:12px;font-weight:700;justify-content:flex-start;min-height:34px;padding:0 2px}
.field,.check{height:46px;border:1.5px solid var(--line);border-radius:10px;padding:0 13px;font-size:16px;background:#fff}
.field:focus{outline:0;border-color:var(--blue);box-shadow:0 0 0 3px rgba(38,104,168,.15)}
.field[readonly]{background:#f1f5f9;color:var(--gi-sub)}
.field.req{border-left:3px solid var(--gi-red)}
textarea.field{padding:10px 13px;min-height:70px}
.formgrid{border:0;gap:8px 10px;padding:6px 15px 15px;grid-template-columns:minmax(70px,max-content) minmax(0,1fr)}
.formgrid>*{border:0}
.formgrid>.field,.formgrid>.check{border:1.5px solid var(--line)}
.formgrid .span2,.formgrid .span3{grid-column:span 1}
th{background:#f1f5f9;color:#41556a;border-bottom:1px solid var(--line);font-size:12px;font-weight:800}
th,td{padding:9px 10px;border-right:0;border-bottom:1px solid #f0f3f6;font-size:13px}
tbody tr:hover{background:#f6f9fc}
tbody tr.sel,tbody tr.on{background:var(--blue2);color:var(--gi-blue-d);font-weight:700}
.empty{color:#9aa7b3;padding:36px 0}
.group-title{background:#f1f5f9;border-bottom:1px solid var(--line);color:#41556a;font-weight:800;height:34px;padding:0 15px}
.row-item{min-height:50px;border-bottom:1px solid #f0f3f6}
.row-item span{border-right:0;padding:12px 15px;font-size:14px}
.row-item:hover{background:#f6f9fc}.row-item.on{background:var(--blue2);color:var(--gi-blue-d)}
.actions{padding:10px 12px;gap:8px}
.btn{height:56px;min-width:0;flex:1 1 auto;padding:0 16px;border:1.5px solid var(--line);border-radius:14px;background:#fff;color:#41556a;font-size:16px;font-weight:800;transition:transform .1s}
.btn:active{transform:scale(.97)}
.btn:hover{border-color:var(--blue);color:var(--gi-blue-d)}
.btn.primary{background:linear-gradient(135deg,#3579b8,#1f5286);border:0;color:#fff;box-shadow:0 4px 14px rgba(38,104,168,.28)}
.btn.warn{background:linear-gradient(135deg,#f0902e,#cf6c11);border:0;color:#fff}
.btn.pink{background:linear-gradient(135deg,#27a35c,#187a43);border:0;color:#fff}
.btn.sm{height:34px;flex:0 0 auto;padding:0 12px;font-size:13px;border-radius:8px;font-weight:700}
/* 칩 · 태그 · 상태 히어로 */
.screen .chip{background:#f1f5f9;border:0;border-radius:8px;height:32px;padding:0 12px;font-size:12px;color:#41556a;font-weight:700}
.screen .chip.on{background:var(--blue);color:#fff}
.screen .badge{border-radius:6px;padding:2px 8px;font-size:11px;font-weight:800}
.screen .st{background:#fff;border:0;border-radius:14px;box-shadow:0 1px 3px rgba(20,40,60,.09);border-left:4px solid var(--blue)}
.screen .st .v{font-size:26px;font-weight:900;letter-spacing:-1px}
.screen .st.ok{border-left-color:var(--gi-green)}.screen .st.ok .v{color:var(--gi-green)}
.screen .st.ng{border-left-color:var(--gi-red)}.screen .st.warn{border-left-color:var(--gi-orange)}
.screen .cg{border:0;border-radius:14px;box-shadow:0 1px 3px rgba(20,40,60,.09);overflow:hidden}
.screen .cg-hdr{background:#fff;border-bottom:1px solid #f0f3f6}
.screen .item{min-height:52px;margin:0 10px 8px;background:#fff;border:1.5px solid var(--line);border-radius:12px;padding:2px 6px}
.screen .item .nm{font-size:15px;font-weight:700}
.screen .tg button{height:38px;border:1.5px solid var(--line);border-radius:9px;font-size:14px;font-weight:800;color:#9aa7b3}
.screen .tg button.ok.on{background:var(--gi-green);border-color:var(--gi-green);color:#fff}
.screen .tg button.ng.on{background:var(--gi-red);border-color:var(--gi-red);color:#fff}
.modal{border:0;border-radius:16px;box-shadow:0 12px 40px rgba(20,40,60,.3)}
.modal .t{height:50px;padding:0 16px;background:linear-gradient(135deg,#3579b8,#22537f);border-radius:16px 16px 0 0;font-size:15px}
.modal .bd{padding:16px}.modal .bt{background:#f6f9fc;border-top:1px solid #f0f3f6}
#toast{border-radius:20px;background:rgba(22,32,43,.92);top:auto;bottom:80px}#toast.show{transform:translateX(-50%)}
@media(max-width:680px){.actions .btn{flex:1 1 40%}}`,
  shell:`:root{--steel:#22537f;--steel-2:#2b649a;--steel-3:#3579b8;--paper:#eef2f6;--line:#dbe3ea;--line-2:#1b4b7d;--amber:#f0902e;--ink:#16202b;--ink-2:#41556a;--ink-3:#6b7a89;--blue:#2668a8;--green:#1f8a4c;--red:#c0392b}
body{font-family:'Malgun Gothic','맑은 고딕',-apple-system,sans-serif}`}
};
const skinId=()=>(SKIN[D.skin]?D.skin:'base');
const skinCss=id=>{const k=SKIN[SKIN[id]?id:'base'];return (k.font?`@import url('${k.font}');\n`:'')+PV_CSS+(k.css?'\n\n'+k.css+'\n':'')};
/* 화면 블록에 따로 지정한 스킨이 있으면 그걸, 없으면 설계 전체 스킨 */
const skinOf=n=>skinCss((n&&n.meta&&n.meta.skin&&SKIN[n.meta.skin])?n.meta.skin:skinId());
function setSkin(id){
 if(!SKIN[id])return;
 D.skin=id==='base'?undefined:id;save();renderPanel();
 $('stat').textContent=`화면 테마: ${SKIN[id].name} — 미리보기와 [▶ 시스템 생성]의 mes_screen.css 에 함께 적용됩니다.`;
 if(pvDlg.classList.contains('on')&&pvNode)previewNode(pvNode.id);
}

/* ═══════════════ 원본 파일 그대로 사용 ═══════════════
   화면 블록에 repo(저장소) + origin(체크)을 두면 [▶ 시스템 생성] 때 화면을 생성하는 대신
   저장소의 원본 HTML(+ 그 파일이 부르는 상대경로 .js/.css)을 받아 그대로 넣는다.
   받은 파일에는 ⚙ 설정의 "생성 시스템 Supabase 주소/키"와 치환 규칙이 적용된다. */
const REPO={
 mm_main:{name:'mm_main — TJ MES 통합 (금형부품·수리·생산일보)',raw:'https://raw.githubusercontent.com/KnagByeongju-123/mm_main/main/'},
 smtec_main2:{name:'smtec_main2 — ESG 스마트팩토리 (점검·불량·IQC)',raw:'https://raw.githubusercontent.com/KnagByeongju-123/smtec_main2/main/'},
 Gyeongil:{name:'Gyeongil — GI MES · SCM Smart (ki_)',raw:'https://raw.githubusercontent.com/KnagByeongju-123/Gyeongil/main/'},
 ESG_Smart_Factory_Mold:{name:'ESG_Smart_Factory_Mold — 태진 금형제작 MES',raw:'https://raw.githubusercontent.com/KnagByeongju-123/ESG_Smart_Factory_Mold/main/'}
};
const GENCFG_LS='design.gencfg';
let GENCFG=(()=>{try{return JSON.parse(localStorage.getItem(GENCFG_LS)||'{}')}catch(e){return{}}})();
const baseFile=f=>String(f||'').split(/[?#]/)[0];
function originUrl(n){if(!n||!n.meta)return '';if(n.meta.src)return n.meta.src;const r=REPO[n.meta.repo];return r?r.raw+baseFile(n.meta.file):''}
/* Supabase 주소·키 + 사용자 치환 규칙 */
function originSub(text){
 let t=String(text);
 if(GENCFG.url)t=t.replace(/https:\/\/[a-z0-9]{15,}\.supabase\.co/g,GENCFG.url.replace(/\/$/,''));
 if(GENCFG.key)t=t.replace(/sb_publishable_[A-Za-z0-9_-]{10,}/g,GENCFG.key).replace(/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/g,GENCFG.key);
 for(const line of String(GENCFG.rep||'').split('\n')){const m=line.match(/^(.+?)\s*=>\s*(.*)$/);if(m&&m[1].trim())t=t.split(m[1].trim()).join(m[2].trim())}
 return t;
}
const ORIGIN_CACHE={};
async function fetchText(url){
 if(ORIGIN_CACHE[url]!==undefined)return ORIGIN_CACHE[url];
 const r=await fetchOne(url,'auto');const html=r.html;
 if(/^\s*(404|Not Found)\s*$/i.test(html)||(url.includes('raw.githubusercontent.com')&&/^404: Not Found/.test(html)))throw new Error('404');
 ORIGIN_CACHE[url]=html;return html;
}
/* 파일이 부르는 상대경로 자산(.js/.css) — 같은 저장소 폴더에서 받는다 */
function relAssets(html){
 const out=new Set();
 for(const m of html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi))out.add(m[1]);
 for(const m of html.matchAll(/<link[^>]+href=["']([^"']+\.css)(?:\?[^"']*)?["']/gi))out.add(m[1]);
 return [...out].filter(u=>!/^(https?:)?\/\//.test(u)&&!u.startsWith('/')&&!u.startsWith('data:')).map(u=>u.split(/[?#]/)[0]);
}
/* origin 체크된 화면들을 한꺼번에 받는다 → {screenId:{file,html,assets:{name:text}}} · 실패한 것은 null */
async function fetchOrigins(){
 const scr=D.nodes.filter(n=>n.type==='screen'&&n.meta.origin&&originUrl(n));
 const out={};if(!scr.length)return out;
 const files={};for(const s of scr){const b=baseFile(s.meta.file);(files[b]=files[b]||[]).push(s)}
 let done=0;const total=Object.keys(files).length;
 $('stat').textContent=`원본 파일 받는 중… 0/${total}`;
 await Promise.all(Object.entries(files).map(async([b,list])=>{
  const url=originUrl(list[0]);
  try{
   let html=await fetchText(url);
   const dir=url.slice(0,url.lastIndexOf('/')+1);const assets={};
   await Promise.all(relAssets(html).map(async a=>{try{assets[a]=originSub(await fetchText(dir+a))}catch(e){}}));
   html=originSub(html);
   for(const s of list)out[s.id]={file:b,html,assets,url};
  }catch(e){for(const s of list)out[s.id]=null;console.warn('원본 실패',url,e.message)}
  $('stat').textContent=`원본 파일 받는 중… ${++done}/${total}`;
 }));
 return out;
}
/* 단일 index.html 용 — 상대경로 자산을 파일 안에 넣는다 */
function inlineAssets(html,assets){
 let h=html;
 for(const [name,text] of Object.entries(assets||{})){
  const re1=new RegExp('<script([^>]*)\\ssrc=["\']'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:\\?[^"\']*)?["\'][^>]*>\\s*<\\/script>','gi');
  const re2=new RegExp('<link[^>]+href=["\']'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:\\?[^"\']*)?["\'][^>]*>','gi');
  if(/\.css$/i.test(name))h=h.replace(re2,()=>'<style>/* '+name+' */\n'+text+'</style>');
  else h=h.replace(re1,()=>'<script>/* '+name+' */\n'+_sc(text)+'<\/script>');
 }
 return h;
}
let ORIGIN_FILES={};   /* 마지막 생성에서 원본으로 넣은 파일 → assets */
function originPanelHtml(n){
 const url=originUrl(n);
 return `<div class="src" style="margin-top:2px"><h4>📎 원본 파일 그대로 사용</h4>
  <div class="row2"><div class="f"><label>저장소</label><select id="f_repo"><option value="">(없음)</option>${Object.entries(REPO).map(([k,v])=>`<option value="${k}" ${n.meta.repo===k?'selected':''}>${esc(v.name)}</option>`).join('')}</select></div>
   <div class="f"><label>직접 URL (있으면 저장소보다 우선)</label><input id="f_src" value="${esc(n.meta.src||'')}" placeholder="https://…/screen.html"></div></div>
  <label class="ck"><input id="f_origin" type="checkbox" ${n.meta.origin?'checked':''} ${url?'':'disabled'}>생성하지 않고 이 원본을 그대로 넣기 <small style="color:#8a94a6">(${url?esc(url):'저장소나 URL을 먼저 고르세요'})</small></label>
  <div style="color:#8a94a6;font-size:11.5px;line-height:1.5">받은 파일의 Supabase 주소·키는 ⚙ 설정의 "생성 시스템" 값으로 바뀌고, 그 파일이 부르는 상대경로 .js/.css 도 같이 받습니다. 원본은 자체 로그인(PIN 등)을 그대로 씁니다.</div>
  ${n.meta.origin&&url?`<div class="acts"><button class="btn" onclick="previewScreen()">▶ 원본 미리보기</button><a class="btn" href="${esc(url)}" target="_blank" style="display:inline-flex;align-items:center;text-decoration:none">↗ 원본 열기</a></div>`:''}</div>`;
}


/* ═══════════════ 상태전이 (status flow) ═══════════════
   테이블 컬럼에 flow:"대기 > 승인 > 발주 > 입고완료 | 취소, 보류" 를 적어 두면
   · 등록/헤더명세 화면: 그 칸이 select 가 되고, 폼 위에 단계 바 + [→ 다음단계] [↩ 이전] [취소…] 버튼이 붙는다
   · 현황/등록 목록: 상태 칸이 진행 뱃지로 표시된다
   · schema.sql: check 제약 + 첫 단계 기본값
   flow 를 안 적어도 컬럼명이 status/state/stage 이고 라벨이 "상태(대기/승인/완료)" 꼴이면 괄호 안을 순서로 쓴다. */
const FLOW_COL=/status|state|stage|phase|step|progress/i;
function parseFlow(c){
 if(!c)return null;
 let src=String(c.flow||'').trim();
 if(!src){if(!FLOW_COL.test(c.name))return null;const m=String(c.label||'').match(/\(([^)]+)\)/);if(!m||!/[\/>→,]/.test(m[1]))return null;src=m[1].replace(/\//g,'>')}
 const [a,b='']=src.split('|');
 const steps=a.split(/\s*(?:>|→|›|\/)\s*/).map(x=>x.trim()).filter(Boolean);
 const ends=b.split(/\s*[,/]\s*/).map(x=>x.trim()).filter(Boolean);
 return steps.length>=2?{col:c.name,label:c.label||c.name,steps,ends}:null;
}
const flowOf=t=>{for(const c of colsOf(t)){const f=parseFlow(c);if(f)return f}return null};

/* ═══════════════ 계산식 (formula) ═══════════════
   컬럼 formula 예: qty * unit_price, IF(total_qty == 0, 0, defect_qty / total_qty * 100)
   안전한 소형 파서를 사용하며 eval/Function 은 쓰지 않는다. */
function calcEvalFormula(src,row){
 try{
  const s=String(src||'').trim();if(!s)return '';
  let i=0,t={k:'eof',v:''};
  const num=v=>{const n=Number(v);return Number.isFinite(n)?n:0};
  const blank=v=>v===null||v===undefined||v==='';
  function next(){while(/\s/.test(s[i]||''))i++;if(i>=s.length)return t={k:'eof',v:''};const ch=s[i];
   if(/[0-9.]/.test(ch)){let j=i+1;while(/[0-9.eE+-]/.test(s[j]||'')){if((s[j]=='+'||s[j]=='-')&&!/[eE]/.test(s[j-1]||''))break;j++}const v=s.slice(i,j);i=j;return t={k:'num',v:Number(v)}}
   if(ch==='"'||ch==="'"){const q=ch;let j=++i,v='';while(i<s.length&&s[i]!==q){if(s[i]==='\\'&&i+1<s.length){v+=s[i+1];i+=2}else v+=s[i++]}i++;return t={k:'str',v}}
   if(/[A-Za-z_가-힣]/.test(ch)){let j=i+1;while(/[A-Za-z0-9_가-힣]/.test(s[j]||''))j++;const v=s.slice(i,j);i=j;return t={k:'id',v}}
   const two=s.slice(i,i+2);if(['>=','<=','==','!=','&&','||'].includes(two)){i+=2;return t={k:'op',v:two}}
   i++;return t={k:'op',v:ch};}
  const eat=v=>{if(t.v===v){next();return true}return false};
  function primary(){if(t.k==='num'||t.k==='str'){const v=t.v;next();return v}
   if(t.k==='id'){const id=t.v,u=id.toUpperCase();next();if(eat('(')){const a=[];if(!eat(')')){do{a.push(expr())}while(eat(','));if(!eat(')'))throw Error(')')}
      if(u==='IF')return a[0]?a[1]:a[2];if(u==='ROUND'){const d=Math.max(0,Math.min(8,num(a[1]||0))),p=10**d;return Math.round(num(a[0])*p)/p}
      if(u==='MIN')return Math.min(...a.map(num));if(u==='MAX')return Math.max(...a.map(num));if(u==='ABS')return Math.abs(num(a[0]));
      if(u==='COALESCE')return a.find(v=>!blank(v))??'';if(u==='TODAY'){const d=new Date(),z=new Date(d.getTime()-d.getTimezoneOffset()*60000);return z.toISOString().slice(0,10);}
      if(u==='DAYS'){const a0=new Date(a[0]),a1=new Date(a[1]);return Number.isFinite(+a0)&&Number.isFinite(+a1)?Math.round((a1-a0)/86400000):0}
      if(u==='YEAR'||u==='MONTH'||u==='DAY'){const d=new Date(a[0]);if(!Number.isFinite(+d))return 0;return u==='YEAR'?d.getFullYear():u==='MONTH'?d.getMonth()+1:d.getDate()}
      return ''}
    if(u==='TRUE')return true;if(u==='FALSE')return false;if(u==='NULL')return '';return Object.prototype.hasOwnProperty.call(row,id)?row[id]:''}
   if(eat('(')){const v=expr();if(!eat(')'))throw Error(')');return v}throw Error('값')}
  function unary(){if(eat('-'))return-num(unary());if(eat('+'))return num(unary());if(eat('!'))return!unary();return primary()}
  function pow(){let v=unary();while(eat('^'))v=Math.pow(num(v),num(unary()));return v}
  function mul(){let v=pow();for(;;){if(eat('*'))v=num(v)*num(pow());else if(eat('/')){const d=num(pow());v=d===0?0:num(v)/d}else if(eat('%')){const d=num(pow());v=d===0?0:num(v)%d}else break}return v}
  function add(){let v=mul();for(;;){if(eat('+'))v=num(v)+num(mul());else if(eat('-'))v=num(v)-num(mul());else break}return v}
  function cmp(){let v=add();for(;;){const op=t.v;if(!['>','<','>=','<='].includes(op))break;next();const b=add(),an=Number(v),bn=Number(b),numeric=Number.isFinite(an)&&Number.isFinite(bn)&&v!==''&&b!=='';const a0=numeric?an:String(v),b0=numeric?bn:String(b);v=op==='>'?a0>b0:op==='<'?a0<b0:op==='>='?a0>=b0:a0<=b0}return v}
  function eq(){let v=cmp();while(t.v==='=='||t.v==='!='){const op=t.v;next();const b=cmp();v=op==='=='?String(v)==String(b):String(v)!=String(b)}return v}
  function and(){let v=eq();while(eat('&&'))v=!!v&&!!eq();return v}
  function expr(){let v=and();while(eat('||'))v=!!v||!!and();return v}
  next();const out=expr();if(t.k!=='eof')throw Error('끝');return out;
 }catch(e){return ''}
}
function calcApplyRow(row,cols){
 row=row||{};const cs=(cols||[]).filter(c=>c&&String(c.formula||'').trim());
 for(let pass=0;pass<Math.max(1,cs.length);pass++)for(const c of cs){let v=calcEvalFormula(c.formula,row);
  if(c.type==='num'&&v!==''){v=Number(v);if(!Number.isFinite(v))v=0;if(c.decimals!==''&&c.decimals!==undefined&&c.decimals!==null){const d=Math.max(0,Math.min(8,Number(c.decimals)||0)),p=10**d;v=Math.round(v*p)/p}}
  else if(c.type==='bool')v=!!v;else if(c.type==='text'&&v!==''&&v!=null)v=String(v);
  row[c.name]=v}
 return row;
}
function calcFormat(v,c,withUnit=true){if(v===null||v===undefined||v==='')return '';let s='';if(c?.type==='num'){const d=c.decimals===''||c.decimals===undefined?null:Math.max(0,Math.min(8,Number(c.decimals)||0));s=Number(v).toLocaleString('ko-KR',d==null?{}:{minimumFractionDigits:d,maximumFractionDigits:d})}else if(c?.type==='bool')s=v?'✓':'';else s=String(v);if(withUnit&&c?.unit&&s!=='')s+=c.unit==='%'?'%':' '+c.unit;return s}
function calcFormulaRefs(src){const z=String(src||'').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,' '),out=[];for(const m of z.matchAll(/[A-Za-z_][A-Za-z0-9_]*/g)){const id=m[0],rest=z.slice(m.index+id.length);if(/^\s*\(/.test(rest))continue;if(!['TRUE','FALSE','NULL'].includes(id.toUpperCase())&&!out.includes(id))out.push(id)}return out}
function calcRuntimeJs(){return [calcEvalFormula,calcApplyRow,calcFormat].map(f=>f.toString()).join('\n')}
function autoNoConfig(t){
 const cols=t?.meta?.cols||[],pk=cols.find(c=>c.pk)||cols[0]||{},a=t?.meta?.autoNo||{};
 const raw=String(t?.name||pk.name||'DOC').replace(/[^A-Za-z0-9]/g,'').toUpperCase();
 return{enabled:a.enabled!==undefined?!!a.enabled:pk.type==='text',prefix:String(a.prefix!==undefined?a.prefix:(raw.slice(0,3)||'DOC')).toUpperCase(),date:a.date||'YYMMDD',digits:Math.max(1,Math.min(8,Number(a.digits)||3)),sep:a.sep===undefined?'-':String(a.sep)};
}
function autoNoPreview(t){const a=autoNoConfig(t),d=new Date(),y=String(d.getFullYear()),m=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');let ds=a.date==='YYYYMMDD'?y+m+dd:a.date==='YYMMDD'?y.slice(-2)+m+dd:a.date==='YYMM'?y.slice(-2)+m:a.date==='YYYY'?y:'';const parts=[a.prefix,ds].filter(Boolean),base=parts.join(a.sep);return (base?base+a.sep:'')+String(1).padStart(a.digits,'0')}
function alertConfig(t){
 const cols=t?.meta?.cols||[],a=t?.meta?.alert||{},def=cols.find(c=>c.type==='date'&&/due|deadline|next_|eta|planned|plan_date|_due/i.test(c.name));
 return{enabled:a.enabled!==undefined?!!a.enabled:!!def,dateCol:a.dateCol||def?.name||'',days:Math.max(0,Math.min(365,Number(a.days??3)||0))};
}
function approvalConfig(t){
 const a=t?.meta?.approval||{},as=a.assignees||{},fl=flowOf(t),approvalFlow=!!fl&&['작성','검토','확인','승인'].some(x=>fl.steps.includes(x)),cols=t?.meta?.cols||[];
 const pick=(fixed,label)=>cols.find(c=>c.name===fixed)?.name||cols.find(c=>String(c.label||'').replace(/\s/g,'')===label)?.name||fixed;
 const roles=[
  {key:'writer',step:'작성',label:'작성자',col:pick('requested_by','작성자'),dateCol:pick('written_at','작성일'),perm:''},
  {key:'reviewer',step:'검토',label:'검토자',col:pick('reviewed_by','검토자'),dateCol:pick('reviewed_at','검토일'),perm:'can_review'},
  {key:'confirmer',step:'확인',label:'확인자',col:pick('confirmed_by','확인자'),dateCol:pick('confirmed_at','확인일'),perm:'can_confirm'},
  {key:'approver',step:'승인',label:'승인자',col:pick('approved_by','승인자'),dateCol:pick('approved_at','승인일'),perm:'can_approve'}
 ].map(r=>({...r,assignee:String(as[r.key]??a[r.key]??'').trim()}));
 return{enabled:a.enabled!==undefined?!!a.enabled:approvalFlow,lock:a.lock!==undefined?!!a.lock:false,routeTemplate:String(a.routeTemplate||'').trim(),statusCol:a.statusCol||fl?.col||pick('status','승인상태'),roles};
}
function addOperationsExamples(t){
 const cols=t.meta.cols||(t.meta.cols=[]),by=new Map(cols.map(c=>[c.name,c]));let n=0;
 const snap=v=>v===undefined?{exists:false}:{exists:true,value:cloneUndo(v)};
 if(!t.meta._electronicApprovalBackup){
  t.meta._electronicApprovalBackup={autoNo:snap(t.meta.autoNo),alert:snap(t.meta.alert),approval:snap(t.meta.approval)};
 }
 const ensure=c=>{let o=by.get(c.name);if(!o){o={...c,_electronicApprovalAdded:true};cols.push(o);by.set(c.name,o);n++}return o};
 const due=ensure({name:'due_date',label:'완료예정일·납기',type:'date'});
 const st=ensure({name:'status',label:'승인상태',type:'text'});
 if(!st._electronicApprovalAdded&&!st._electronicApprovalPrevFlow){
  st._electronicApprovalPrevFlow=Object.prototype.hasOwnProperty.call(st,'flow')?{exists:true,value:st.flow}:{exists:false};
 }
 st.flow='작성 > 검토 > 확인 > 승인 > 완료 | 반려';
 ensure({name:'requested_by',label:'작성자',type:'text'});ensure({name:'written_at',label:'작성일',type:'date'});
 ensure({name:'reviewed_by',label:'검토자',type:'text'});ensure({name:'reviewed_at',label:'검토일',type:'date'});
 ensure({name:'confirmed_by',label:'확인자',type:'text'});ensure({name:'confirmed_at',label:'확인일',type:'date'});
 ensure({name:'approved_by',label:'승인자',type:'text'});ensure({name:'approved_at',label:'승인일',type:'date'});ensure({name:'reject_reason',label:'반려사유',type:'text'});
 const raw=String(t.name||'DOC').replace(/[^A-Za-z0-9]/g,'').toUpperCase();
 t.meta.autoNo={enabled:true,prefix:(raw.slice(0,3)||'DOC'),date:'YYMMDD',digits:3,sep:'-'};
 t.meta.alert={enabled:true,dateCol:due.name,days:3};
 const old=t.meta.approval||{},oldAs=old.assignees||{};
 t.meta.approval={enabled:true,lock:!!old.lock,routeTemplate:old.routeTemplate||'STD_APPROVAL',assignees:{writer:oldAs.writer||'',reviewer:oldAs.reviewer||'',confirmer:oldAs.confirmer||'',approver:oldAs.approver||''}};
 $('stat').textContent=`전자결재적용 완료 — 결재용 컬럼 ${n}개 자동 추가 · 작성→검토→확인→승인 Workflow · 자동번호(${autoNoPreview(t)}) · ${due.label||due.name} 3일 전 알림.`;
}
function removeOperationsExamples(t){
 const b=t.meta._electronicApprovalBackup;
 const cols=t.meta.cols||(t.meta.cols=[]);
 /* 전자결재 전용 표준 컬럼은 "적용" 표시가 남아 있지 않은 예전 설계/샘플에서도
    해제 시 함께 정리한다. due_date/status 같은 일반 업무 컬럼은 자동 추가 표시가 있을 때만 삭제한다. */
 const APPR_ONLY=new Set(['requested_by','written_at','reviewed_by','reviewed_at','confirmed_by','confirmed_at','approved_by','approved_at','reject_reason']);
 const APPR_FLOW='작성 > 검토 > 확인 > 승인 > 완료 | 반려';
 const norm=v=>String(v||'').replace(/\s+/g,'');
 let removed=0,restored=0,clearedFlow=0;
 t.meta.cols=cols.filter(c=>{
  if(!c)return true;
  if(c._electronicApprovalAdded||APPR_ONLY.has(c.name)){removed++;return false}
  return true;
 });
 for(const c of t.meta.cols){
  if(!c)continue;
  if(c._electronicApprovalPrevFlow){
   const p=c._electronicApprovalPrevFlow;
   /* 적용 전부터 똑같은 전자결재 흐름이 들어 있던 샘플은 '해제' 의미에 맞게 흐름도 제거 */
   if(p.exists&&norm(p.value)!==norm(APPR_FLOW)){c.flow=p.value;restored++}
   else{delete c.flow;clearedFlow++}
   delete c._electronicApprovalPrevFlow;
  }else if(c.flow&&norm(c.flow)===norm(APPR_FLOW)){
   delete c.flow;clearedFlow++;
  }
 }
 /* 자동번호/기한알림은 적용 전 값이 있으면 그대로 돌려놓고, 전자결재 설정은 확실히 해제한다. */
 const restore=(key,s)=>{if(s&&s.exists)t.meta[key]=cloneUndo(s.value);else delete t.meta[key]};
 if(b){restore('autoNo',b.autoNo);restore('alert',b.alert)}
 delete t.meta.approval;
 delete t.meta._electronicApprovalBackup;
 save();
 const extra=[];
 if(clearedFlow)extra.push(`결재 상태흐름 ${clearedFlow}개 제거`);
 if(restored)extra.push(`기존 상태흐름 ${restored}개 복원`);
 $('stat').textContent=`전자결재적용해제 완료 — 결재용 컬럼 ${removed}개 삭제${extra.length?' · '+extra.join(' · '):''}${b?' · 자동번호·기한알림은 적용 전 상태로 복원':''}.`;
}

function addCalcExamples(t){
 const cols=t.meta.cols||(t.meta.cols=[]),by=new Map(cols.map(c=>[c.name,c]));
 const need=[
  {name:'qty',label:'수량',type:'num',sample:'10'},{name:'unit_price',label:'단가',type:'num',sample:'2500'},
  {name:'good_qty',label:'양품수량',type:'num',sample:'980'},{name:'defect_qty',label:'불량수량',type:'num',sample:'20'},
  {name:'plan_qty',label:'계획수량',type:'num',sample:'1200'},{name:'result_qty',label:'실적수량',type:'num',sample:'1080'},
  {name:'order_qty',label:'발주수량',type:'num',sample:'100'},{name:'receipt_qty',label:'입고수량',type:'num',sample:'72'},
  {name:'due_date',label:'납기일',type:'date',sample:new Date(Date.now()+5*864e5).toISOString().slice(0,10)}];
 for(const c of need)if(!by.has(c.name)){cols.push({...c});by.set(c.name,c)}
 const ex=[
  {name:'amount',label:'금액',type:'num',formula:'qty * unit_price',unit:'원',decimals:0},
  {name:'total_qty',label:'총생산수량',type:'num',formula:'good_qty + defect_qty',unit:'EA',decimals:0},
  {name:'defect_rate',label:'불량률',type:'num',formula:'IF(total_qty == 0, 0, defect_qty / total_qty * 100)',unit:'%',decimals:2},
  {name:'achievement_rate',label:'달성률',type:'num',formula:'IF(plan_qty == 0, 0, result_qty / plan_qty * 100)',unit:'%',decimals:1},
  {name:'balance_qty',label:'미입고수량',type:'num',formula:'order_qty - receipt_qty',unit:'EA',decimals:0},
  {name:'remaining_days',label:'납기잔여일',type:'num',formula:'DAYS(TODAY(), due_date)',unit:'일',decimals:0},
  {name:'judge',label:'불량률판정',type:'text',formula:'IF(defect_rate > 3, "주의", "정상")'}];
 let n=0;for(const c of ex){const old=by.get(c.name);if(old){if(!old.formula){Object.assign(old,c);n++}}else{cols.push({...c,calc:true});by.set(c.name,c);n++}}
 $('stat').textContent=`ƒx 계산식 예제 ${n}개를 추가/설정했습니다. 수식과 원본 컬럼의 예시값을 바꿔 미리보기에서 확인하세요.`;
}
/* 생성된 등록 화면 HTML 에 상태전이 UI 를 덧붙인다 */
function applyFlow(html,t){
 const fl=flowOf(t);if(!fl)return html;const ap=approvalConfig(t);
 const opts=[...fl.steps,...fl.ends].map(v=>`<option>${esc(v)}</option>`).join('');
 const re=new RegExp(`<input id="f_${fl.col}" class="field( req)?"[^>]*>`);
 if(!re.test(html))return html;
 html=html.replace(re,(m,req)=>`<select id="f_${fl.col}" class="field${req||''}"><option value=""></option>${opts}</select>`);
 const bar=`<div class="steps" id="flowbar"></div>`;
 if(/<div class="formgrid"/.test(html))html=html.replace(/(<div class="cap">[^\n]*<\/div>\n)(\s*<div class="formgrid")/,`$1      ${bar}\n$2`);
 else html=html.replace('<div class="body">','<div class="body">'+bar);
 const css=`<style>.steps{display:flex;flex-wrap:wrap;align-items:center;gap:4px;padding:6px 8px;border-bottom:1px solid var(--line2);font-size:12px}
.steps .stp{padding:4px 10px;border-radius:12px;background:#eef2f5;color:#8a94a6;border:1px solid transparent;display:inline-flex;flex-direction:column;line-height:1.2;min-width:58px;text-align:center}.steps .stp b{font-size:12px}.steps .stp small{font-size:10px;font-weight:500;margin-top:2px;max-width:90px;overflow:hidden;text-overflow:ellipsis}.steps .stp.done{background:#e6f5eb;color:#15803d}.steps .stp.cur{background:var(--sel);color:#fff;font-weight:700}
.steps i{color:#b0b8c4;font-style:normal}.steps .end{margin-left:auto;display:flex;gap:4px}.wf-fixed{background:#f3f7fb!important;color:#2f6fb5!important;font-weight:600}
.badge{display:inline-block;padding:1px 8px;border-radius:9px;font-size:11px;font-weight:700;color:#fff;background:#9aa4b5}.badge.ok{background:#2e7d32}.badge.ng{background:#c62828}.badge.run{background:#2f6fb5}</style>`;
 html=html.replace('</head>',css+'</head>');
 const js=`<script>/* 상태전이 + 결재 담당자 */
const FLOW=${JSON.stringify(fl)},APPR=${JSON.stringify(ap)};
const WF_USER_NAMES={},WF_USERS=[];
function roleForStep(step){return APPR.enabled?APPR.roles.find(r=>r.step===step):null}
function roleName(step){const r=roleForStep(step);if(!r)return '';const el=$('f_'+r.col),key=String(el?.value||r.assignee||'').trim();return WF_USER_NAMES[key]||key}
function workflowDefaults(){if(!APPR.enabled)return;for(const r of APPR.roles){const el=$('f_'+r.col);if(!el)continue;if(!el.value&&r.assignee)el.value=r.assignee;if(APPR.lock&&(r.assignee||el.value)){el.disabled=true;el.classList.add('wf-fixed');el.title=r.step+' 담당자 '+roleName(r.step)+' (고정)'}else{el.disabled=false;el.classList.remove('wf-fixed')}}}
function wfAllowed(u,r){if(!r.perm)return true;if(!(r.perm in u))return true;return u[r.perm]===true||u[r.perm]===1||String(u[r.perm]).toLowerCase()==='true'}
function wfOptions(r){return '<option value="">선택</option>'+WF_USERS.filter(u=>wfAllowed(u,r)).map(u=>'<option value="'+esc(u.user_key||'')+'">'+esc([u.name,u.department_name,u.position_name].filter(Boolean).join(' · ')||u.user_key)+'</option>').join('')}
function wfSelectFor(r){let old=$('f_'+r.col);if(!old)return null;const cur=String(old.value||r.assignee||'');if(old.tagName==='SELECT'){old.innerHTML=wfOptions(r);old.value=cur;return old}const sel=document.createElement('select');sel.id=old.id;sel.className=old.className;sel.innerHTML=wfOptions(r);sel.value=cur;old.replaceWith(sel);return sel}
async function loadWorkflowUsers(){if(!APPR.enabled||!window.MESDB)return;try{await MESDB.ready}catch(e){}if(!MESDB.online)return;try{const rs=await MESDB.table('users').select('select=*&limit=500');WF_USERS.length=0;WF_USERS.push(...rs.filter(u=>u.is_active!==false&&u.user_key));for(const u of WF_USERS)WF_USER_NAMES[u.user_key]=[u.name,u.department_name,u.position_name].filter(Boolean).join(' · ')||u.user_key;for(const r of APPR.roles)wfSelectFor(r);if(APPR.routeTemplate){try{const q='select=*&template_code=eq.'+encodeURIComponent(APPR.routeTemplate)+'&is_active=eq.true&limit=1',rr=await MESDB.table('approval_route_templates').select(q),rt=rr&&rr[0];if(rt){const map={writer:'writer_key',reviewer:'reviewer_key',confirmer:'confirmer_key',approver:'approver_key'};for(const r of APPR.roles){const el=$('f_'+r.col),v=rt[map[r.key]];if(el&&v&&!el.value)el.value=v}}}catch(e){}}workflowDefaults();flowRender()}catch(e){}}
function workflowReady(step){if(!APPR.enabled)return true;const r=roleForStep(step);if(!r)return true;const el=$('f_'+r.col);if(!el)return true;if(!String(el.value||'').trim()){if(typeof msg==='function')msg(r.label+'를 사용자정보에서 지정하세요.');el.focus();return false}return true}
function stampStep(step){if(!APPR.enabled)return;const r=roleForStep(step);if(!r)return;const d=$('f_'+r.dateCol);if(d&&!d.value)d.value=new Date().toISOString().slice(0,10)}
function flowRender(){const el=$('f_'+FLOW.col),b=$('flowbar');if(!el||!b)return;workflowDefaults();const v=el.value,i=FLOW.steps.indexOf(v);
 b.innerHTML=FLOW.steps.map((s,k)=>'<span class="stp'+(k<i?' done':k===i?' cur':'')+'"><b>'+esc(s)+'</b>'+(roleName(s)?'<small>'+esc(roleName(s))+'</small>':'')+'</span>').join('<i>›</i>')
  +(i>=0&&i<FLOW.steps.length-1?' <button class="btn sm primary" onclick="flowTo(FLOW.steps['+(i+1)+'])">→ 다음: '+esc(FLOW.steps[i+1])+'</button>':i<0&&!FLOW.ends.includes(v)?' <button class="btn sm primary" onclick="flowTo(FLOW.steps[0])">→ 시작: '+esc(FLOW.steps[0])+'</button>':'')
  +(i>0?' <button class="btn sm" onclick="flowTo(FLOW.steps['+(i-1)+'])">↩ 이전</button>':'')
  +(FLOW.ends.length?'<span class="end">'+FLOW.ends.map(e=>'<button class="btn sm warn" onclick="flowTo(\\''+esc(e)+'\\')">'+esc(e)+'</button>').join('')+'</span>':'');}
function flowTo(v){const el=$('f_'+FLOW.col);if(!el)return;if(!workflowReady(v))return;
 if(FLOW.ends.includes(v)&&!confirm(v+' 처리할까요?'))return;
 if(/반려|취소|보류/i.test(v)){const rr=$('f_reject_reason');if(rr){const why=prompt(v+' 사유를 입력하세요.',rr.value||'');if(why===null)return;rr.value=why}}
 el.value=v;stampStep(v);flowRender();if(typeof sel!=='undefined'&&sel!=null)save();}
(function(){const _pick=window.pick,_clear=window.clearForm,_save=window.save,_cell=window.cell;
 if(_pick)window.pick=function(){_pick.apply(this,arguments);workflowDefaults();flowRender()};
 if(_clear)window.clearForm=function(){_clear.apply(this,arguments);const el=$('f_'+FLOW.col);if(el&&!el.value)el.value=FLOW.steps[0];workflowDefaults();flowRender()};
 if(_save)window.save=function(){workflowDefaults();const el=$('f_'+FLOW.col);if(el&&!workflowReady(el.value||FLOW.steps[0]))return;stampStep(el?.value||FLOW.steps[0]);const r=_save.apply(this,arguments);flowRender();return r};
 if(_cell)window.cell=function(r,f){if(f===FLOW.col&&r&&r[f]){const i=FLOW.steps.indexOf(r[f]);return '<span class="badge '+(i<0?'ng':i===FLOW.steps.length-1?'ok':'run')+'">'+esc(r[f])+'</span>'}return _cell.apply(this,arguments)};
 const el=$('f_'+FLOW.col);if(el){el.addEventListener('change',()=>{workflowDefaults();flowRender()});if(!el.value)el.value=FLOW.steps[0]}workflowDefaults();flowRender();setTimeout(loadWorkflowUsers,500);setTimeout(loadWorkflowUsers,1800);
})();<\/script>`;
 return html.replace('<script src="mes_db.js">',js+'\n<script src="mes_db.js">');
}
/* 현황 화면: 상태 칸 뱃지 */
function applyFlowStatus(html,t){
 const fl=flowOf(t);if(!fl)return html;
 const css=`<style>.badge{display:inline-block;padding:1px 8px;border-radius:9px;font-size:11px;font-weight:700;color:#fff;background:#9aa4b5}.badge.ok{background:#2e7d32}.badge.ng{background:#c62828}.badge.run{background:#2f6fb5}</style>`;
 html=html.replace('</head>',css+'</head>');
 const js=`<script>/* 상태 뱃지 */const FLOW=${JSON.stringify(fl)};(function(){const _cell=window.cell;if(!_cell)return;window.cell=function(r,f){if(f===FLOW.col&&r&&r[f]){const i=FLOW.steps.indexOf(r[f]);return '<span class="badge '+(i<0?'ng':i===FLOW.steps.length-1?'ok':'run')+'">'+esc(r[f])+'</span>'}return _cell.apply(this,arguments)}})();<\/script>`;
 return html.replace('<script src="mes_db.js">',js+'\n<script src="mes_db.js">');
}

/* ═══════════════ 기준정보 통합 ═══════════════
   캔버스에 같은 뜻의 마스터 테이블이 여럿(vendors · ki_vendor · pr_product · items …) 있으면
   하나의 공통 테이블로 합치고 선을 옮겨 붙인다. 원본 파일(📎)은 자기 테이블을 그대로 쓰므로 영향 없음. */
const MASTER_SYN=[
 {canon:'vendors',   label:'거래처(협력사)', re:/^(vendors?|ki_vendor|partners?|suppliers?|outsourcing_vendor)$/i},
 {canon:'customers', label:'고객사',        re:/^(customers?|ki_customer|clients?)$/i},
 {canon:'items',     label:'품목',          re:/^(items?|products?|pr_product|item_master|parts?)$/i},
 {canon:'machines',  label:'설비(호기)',     re:/^(machines?|ki_machine|pr_machine|equipments?|equipment_master)$/i},
 {canon:'processes', label:'공정',          re:/^(process(es)?|ki_process|machining_process(es)?|process_master)$/i},
 {canon:'molds',     label:'금형',          re:/^(molds?|ki_mold|ki_mold_master|mm_mold_master|mold_master|molds_master)$/i},
 {canon:'materials', label:'소재',          re:/^(materials?|ki_material|raw_materials?)$/i},
 {canon:'users',     label:'사용자(사원)',   re:/^(users?|ki_employee|mm_user_pin|user_pin|employees?|pr_worker)$/i},
 {canon:'departments',label:'부서',         re:/^(departments?|dept|depts)$/i}
];
function masterGroups(){
 const tabs=D.nodes.filter(n=>n.type==='table');const out=[];
 for(const s of MASTER_SYN){const hit=tabs.filter(t=>s.re.test(t.name));const canonNode=hit.find(t=>t.name===s.canon);
  const dups=hit.filter(t=>t!==canonNode);if(!dups.length)continue;out.push({...s,canonNode,dups})}
 return out;
}
function openMerge(){
 const gs=masterGroups();
 if(!gs.length){$('stat').textContent='합칠 중복 기준정보 테이블이 없습니다 (vendors·customers·items·machines·processes·molds·materials·users 계열).';return}
 const body=gs.map((g,i)=>`<label class="ck" style="align-items:flex-start;padding:6px 0;border-bottom:1px solid var(--line)"><input type="checkbox" data-g="${i}" checked style="margin-top:3px">
  <span><b>${esc(g.label)}</b> → <code>${esc(g.canon)}</code> ${g.canonNode?'<small style="color:#2fb27c">(있음 · 컬럼 합침)</small>':'<small style="color:#3b82f6">(새로 만듦)</small>'}<br>
  <small style="color:#8a94a6">합쳐질 테이블: ${g.dups.map(d=>esc(d.name)+' ('+colsOf(d).length+'컬럼 · 연결 '+D.edges.filter(e=>e.from===d.id||e.to===d.id).length+')').join(', ')}</small></span></label>`).join('');
 const dlg=document.createElement('div');dlg.className='mbg on';dlg.id='mergeDlg';
 dlg.innerHTML=`<div class="modal" style="width:min(640px,94vw)"><div class="t">◈ 기준정보 통합 <span class="x" onclick="mergeDlg.remove()">×</span></div>
  <div class="bd" style="grid-template-columns:1fr;min-height:0;padding:14px;display:block">
   <div style="color:#4a5568;margin-bottom:8px;line-height:1.6">같은 뜻의 마스터 테이블을 공통 테이블 하나로 합칩니다. 컬럼은 이름 기준으로 합집합이 되고, 화면·테이블 연결선은 공통 테이블로 옮겨집니다.<br>
   <b>📎 원본 파일 화면은 자기 DB 테이블을 그대로 쓰므로 영향이 없습니다</b> — 통합은 생성 화면·schema.sql 에만 반영됩니다.</div>${body}</div>
  <div class="bt"><button class="btn primary" onclick="doMerge()">합치기</button><button class="btn" onclick="mergeDlg.remove()">취소</button></div></div>`;
 document.body.appendChild(dlg);
}
function doMerge(){
 const gs=masterGroups();const picked=[...document.querySelectorAll('#mergeDlg [data-g]:checked')].map(x=>gs[+x.dataset.g]).filter(Boolean);
 let merged=0,moved=0;
 for(const g of picked){
  let canon=g.canonNode;
  if(!canon){const ax=Math.round(g.dups.reduce((a,d)=>a+d.x,0)/g.dups.length/8)*8,ay=Math.round(g.dups.reduce((a,d)=>a+d.y,0)/g.dups.length/8)*8;
   canon={id:uid(),type:'table',name:g.canon,x:ax,y:ay,meta:{cols:[],merged_from:[]}};D.nodes.push(canon)}
  canon.meta.merged_from=canon.meta.merged_from||[];
  for(const d of g.dups){
   for(const c of colsOf(d)){if(canon.meta.cols.some(x=>x.name===c.name))continue;const nc={...c};if(nc.pk&&canon.meta.cols.some(x=>x.pk))nc.pk=false;canon.meta.cols.push(nc)}
   if(!canon.meta.cols.some(x=>x.pk)&&canon.meta.cols[0])canon.meta.cols[0].pk=true;
   for(const e of D.edges){if(e.from===d.id)e.from=canon.id;if(e.to===d.id)e.to=canon.id;}
   canon.meta.merged_from.push(d.name);D.nodes=D.nodes.filter(n=>n!==d);merged++;
  }
  /* 자기 자신을 가리키거나 겹치는 선 정리 */
  const seen=new Set();D.edges=D.edges.filter(e=>{if(e.from===e.to)return false;const k=e.from+'>'+e.to;if(seen.has(k))return false;seen.add(k);moved++;return true});
 }
 document.getElementById('mergeDlg')?.remove();select(null);render();
 $('stat').textContent=`기준정보 통합 — 테이블 ${merged}개를 ${picked.length}개 공통 테이블로 합쳤습니다. 연결 ${D.edges.length}개.`;
}

function skinMenuHtml(){
 return Object.entries(SKIN).map(([k,v])=>`<button onclick="setSkin('${k}')"><span class="dot" style="background:${k==='mm-dark'?'#0f172a':k==='mm-card'?'#2563eb':k==='mm-erp'?'#2d66ad':k==='esg-check'?'#f59e0b':k==='esg-light'?'#c62828':k==='esg-mon'?'#38bdf8':k==='gi-erp'?'#2469a8':k==='gi-mobile'?'#3579b8':k==='tjd-mold'?'#2f75b5':'#c7d2db'}"></span>${esc(v.name)}</button>`).join('');
}

let pvNode=null;
function pvSetToolbar(type){
 const screen=type==='screen';
 document.querySelectorAll('#pvDlg .pv-screen-only').forEach(b=>b.style.display=screen?'':'none');
 const t=$('pv_title');if(t)t.textContent=type==='module'?'대분류 홈 미리보기':type==='section'?'중분류 홈 미리보기':'화면 미리보기';
}
function containsKidsOf(id,type){
 return D.edges.filter(e=>e.from===id&&e.kind==='contains').map(e=>N(e.to)).filter(n=>n&&(!type||n.type===type)).sort((a,b)=>(a.y-b.y)||(a.x-b.x));
}
function parentModuleOfSection(sec){
 return D.edges.filter(e=>e.to===sec.id&&e.kind==='contains').map(e=>N(e.from)).find(n=>n&&n.type==='module')||null;
}
function parentPathOfScreen(sc){
 const p=D.edges.filter(e=>e.to===sc.id&&e.kind==='contains').map(e=>N(e.from)).filter(Boolean)[0]||null;
 if(!p)return{module:null,section:null};
 if(p.type==='module')return{module:p,section:null};
 if(p.type==='section')return{module:parentModuleOfSection(p),section:p};
 return{module:null,section:null};
}
function landingModeModule(n){
 const forced=n.meta.homeType||'auto',sid=skinId();
 if(forced==='erp')return'mod-erp';
 if(forced==='dashboard')return'mod-dashboard'+(/dark|check|mon/i.test(sid)?' mod-dark':'');
 if(forced==='cards')return /dark|check|mon/i.test(sid)?'mod-dark':'';
 if(/erp|tjd/i.test(sid))return'mod-erp';
 if(/dark|check|mon/i.test(sid))return'mod-dashboard mod-dark';
 return'';
}
function landingModeSection(){
 const sid=skinId();
 if(/dark|check|mon/i.test(sid))return'sec-dark';
 if(/erp|tjd/i.test(sid))return'sec-erp';
 return'sec-cards';
}
function landingPreviewCss(){
 const shell=(SKIN[skinId()]&&SKIN[skinId()].shell)||'';
 return `:root{--steel:#1f2733;--steel-2:#28323f;--steel-3:#343f50;--paper:#f1f3f6;--white:#fff;--ink:#1c2430;--ink-2:#4a5568;--ink-3:#8a94a6;--line:#dfe3ea;--line-2:#303b4c;--amber:#f2a93b;--green:#2fb27c;--red:#e05a4a;--blue:#3b82f6;--r:6px}
${shell}
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}body{font-family:Pretendard,-apple-system,"Malgun Gothic",sans-serif;color:var(--ink);background:var(--paper);overflow:auto}button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.pv-crumb{height:40px;display:flex;align-items:center;gap:7px;padding:0 18px;background:var(--white);border-bottom:1px solid var(--line);font-size:12px;color:var(--ink-3);position:sticky;top:0;z-index:5}.pv-crumb button{color:var(--blue);font-weight:700}.pv-crumb b{color:var(--ink)}
.sec-home{min-height:calc(100vh - 40px);overflow:auto;background:var(--paper);padding:18px 22px}
.sec-hero{background:var(--white);border:1px solid var(--line);border-radius:var(--r);padding:17px 20px;margin-bottom:14px;display:flex;align-items:center;gap:14px}
.sec-hero .ico{width:42px;height:42px;border-radius:10px;display:grid;place-items:center;background:var(--steel);color:#fff;font-size:20px;flex:0 0 auto}.sec-hero h1{font-size:20px;margin-bottom:3px}.sec-hero p{font-size:12px;color:var(--ink-3)}.sec-count{margin-left:auto;font-size:12px;color:var(--ink-3);white-space:nowrap}
.sec-groups{display:grid;gap:12px}.sec-group{background:var(--white);border:1px solid var(--line);border-radius:var(--r);padding:14px}.sec-group h3{font-size:13px;color:var(--ink-2);margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}.sec-group h3 small{font-weight:400;color:var(--ink-3)}
.sec-items{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.sec-item{min-height:74px;border:1px solid var(--line);border-radius:var(--r);background:var(--white);padding:11px 12px;text-align:left;display:flex;flex-direction:column;justify-content:space-between;gap:7px}.sec-item b{font-size:13px}.sec-item small{font-size:11px;color:var(--ink-3)}.sec-item:hover{border-color:var(--blue);box-shadow:0 0 0 1px var(--blue);color:var(--blue)}.sec-cards .sec-item{border-left:4px solid var(--blue)}
.sec-erp{padding:10px}.sec-erp .sec-hero{border-radius:0;padding:10px 12px;margin-bottom:8px;background:linear-gradient(#f8fafc,#e9eef3)}.sec-erp .sec-hero .ico{width:32px;height:32px;border-radius:3px;background:var(--blue);font-size:15px}.sec-erp .sec-group{border-radius:0;padding:8px}.sec-erp .sec-group h3{padding:0 4px 6px;margin-bottom:6px;border-bottom:1px solid var(--line)}.sec-erp .sec-items{grid-template-columns:repeat(5,minmax(0,1fr));gap:5px}.sec-erp .sec-item{min-height:46px;border-radius:2px;padding:7px 9px;background:linear-gradient(#fff,#f2f5f8)}.sec-erp .sec-item small{display:none}
.sec-dark .sec-hero,.sec-dark .sec-group,.sec-dark .sec-item{background:var(--white)}.sec-dark .sec-hero .ico{background:var(--blue);color:#fff}.sec-dark .sec-item:hover{background:var(--steel-3);color:#fff}
.module-home{min-height:calc(100vh - 40px);overflow:auto;background:var(--paper);padding:18px 22px;display:grid;gap:14px;align-content:start}.mod-hero{background:var(--white);border:1px solid var(--line);border-radius:var(--r);padding:18px 20px;display:flex;align-items:center;gap:14px}.mod-hero>.ico{width:50px;height:50px;border-radius:12px;display:grid;place-items:center;background:var(--steel);color:#fff;font-size:23px;flex:0 0 auto}.mod-hero h1{font-size:22px;margin-bottom:3px}.mod-hero p{font-size:12px;color:var(--ink-3)}
.mod-kpis{margin-left:auto;display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.mod-kpi{min-width:88px;border:1px solid var(--line);border-radius:var(--r);background:var(--paper);padding:8px 10px;text-align:center}.mod-kpi b{display:block;font-size:18px;color:var(--ink)}.mod-kpi small{font-size:10.5px;color:var(--ink-3)}
.mod-block{background:var(--white);border:1px solid var(--line);border-radius:var(--r);padding:14px}.mod-block>h3{font-size:13px;color:var(--ink-2);margin-bottom:11px;display:flex;justify-content:space-between;align-items:center}.mod-block>h3 small{font-weight:400;color:var(--ink-3)}
.mod-sections{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.mod-sec{border:1px solid var(--line);border-radius:var(--r);background:var(--white);padding:13px;text-align:left;min-height:126px;display:flex;flex-direction:column;gap:8px}.mod-sec:hover{border-color:var(--blue);box-shadow:0 0 0 1px var(--blue)}.mod-sec .head{display:flex;align-items:center;gap:8px}.mod-sec .head .ico{width:30px;height:30px;border-radius:7px;background:var(--paper);display:grid;place-items:center}.mod-sec .head b{font-size:14px}.mod-sec .head small{margin-left:auto;color:var(--ink-3);font-size:10.5px}.mod-sec .screens{display:flex;flex-wrap:wrap;gap:4px;margin-top:auto}.mod-sec .screens span{font-size:10.5px;color:var(--ink-2);background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:2px 7px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}.mod-link{border:1px solid var(--line);border-radius:var(--r);padding:9px 10px;text-align:left;background:var(--white);display:grid;gap:3px}.mod-link:hover{border-color:var(--blue);color:var(--blue)}.mod-link small{color:var(--ink-3);font-size:10.5px}
.mod-erp{padding:10px;gap:8px}.mod-erp .mod-hero{border-radius:0;padding:10px 12px;background:linear-gradient(#f8fafc,#e9eef3)}.mod-erp .mod-hero>.ico{width:34px;height:34px;border-radius:3px;background:var(--blue);font-size:16px}.mod-erp .mod-hero h1{font-size:17px}.mod-erp .mod-kpi{padding:4px 8px;min-width:74px;border-radius:2px}.mod-erp .mod-kpi b{font-size:14px}.mod-erp .mod-block{border-radius:0;padding:8px}.mod-erp .mod-sections{grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.mod-erp .mod-sec{min-height:78px;border-radius:2px;padding:8px;background:linear-gradient(#fff,#f2f5f8)}.mod-erp .mod-sec .head .ico{width:24px;height:24px;border-radius:2px}.mod-erp .mod-sec .screens span{border-radius:2px;padding:1px 5px}
.mod-dashboard .mod-hero{border-left:5px solid var(--blue)}.mod-dashboard .mod-links{grid-template-columns:repeat(3,minmax(0,1fr))}.mod-dark .mod-hero,.mod-dark .mod-block,.mod-dark .mod-sec,.mod-dark .mod-link{background:var(--white)}.mod-dark .mod-hero>.ico{background:var(--blue)}.mod-dark .mod-sec:hover,.mod-dark .mod-link:hover{background:var(--steel-3);color:#fff}
.empty-note{color:var(--ink-3);padding:18px}
@media(max-width:1100px){.sec-items,.sec-erp .sec-items{grid-template-columns:repeat(3,minmax(0,1fr))}.mod-sections{grid-template-columns:repeat(2,minmax(0,1fr))}.mod-links,.mod-dashboard .mod-links{grid-template-columns:repeat(3,minmax(0,1fr))}.mod-erp .mod-sections{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:760px){.sec-home,.module-home{padding:10px}.sec-items,.sec-erp .sec-items{grid-template-columns:repeat(2,minmax(0,1fr))}.sec-hero,.mod-hero{padding:12px}.sec-count,.mod-kpis{display:none}.mod-sections,.mod-erp .mod-sections{grid-template-columns:1fr}.mod-links,.mod-dashboard .mod-links{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
}
function buildModulePreview(n){
 const secs=containsKidsOf(n.id,'section');
 const direct=containsKidsOf(n.id,'screen');
 const secData=secs.map(sec=>({sec,screens:containsKidsOf(sec.id,'screen')}));
 const all=[...secData.flatMap(x=>x.screens),...direct];
 const seen=new Set(),unique=all.filter(x=>!seen.has(x.id)&&(seen.add(x.id),true));
 const status=unique.filter(x=>/현황|대시보드|모니터|실적|일보|진행|추적|집계|통계/i.test(x.name)).slice(0,8);
 const quick=(status.length?status:unique.slice(0,8));
 const cards=secData.map(({sec,screens})=>`<button class="mod-sec" data-id="${sec.id}" onclick="parent.previewNode(this.dataset.id)"><span class="head"><span class="ico">${esc(sec.meta.icon||'▣')}</span><b>${esc(sec.name)}</b><small>${screens.length}개</small></span><span class="screens">${screens.slice(0,5).map(x=>`<span>${esc(x.name)}</span>`).join('')}${screens.length>5?`<span>+${screens.length-5}</span>`:''}</span></button>`).join('');
 const directCard=direct.length?`<div class="mod-block"><h3><span>대분류 직속 화면</span><small>중분류 없이 직접 연결된 화면</small></h3><div class="mod-links">${direct.map(x=>`<button class="mod-link" data-id="${x.id}" onclick="parent.previewNode(this.dataset.id)"><b>${esc(x.name)}</b><small>화면 열기</small></button>`).join('')}</div></div>`:'';
 const links=quick.map(x=>{const path=parentPathOfScreen(x);return`<button class="mod-link" data-id="${x.id}" onclick="parent.previewNode(this.dataset.id)"><b>${esc(x.name)}</b><small>${esc(path.section?.name||n.name)}</small></button>`}).join('');
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${landingPreviewCss()}</style></head><body>
 <div class="pv-crumb"><b>${esc(n.name)}</b><span>›</span><span>대분류 홈 미리보기</span></div>
 <div class="module-home ${landingModeModule(n)}">
  <div class="mod-hero"><div class="ico">${esc(n.meta.icon||'▣')}</div><div><h1>${esc(n.name)}</h1><p>${esc(n.meta.desc||'업무영역 홈')} · 중분류를 선택하거나 주요 화면으로 바로 이동합니다.</p></div>
   <div class="mod-kpis"><div class="mod-kpi"><b>${secs.length}</b><small>중분류</small></div><div class="mod-kpi"><b>${unique.length}</b><small>화면</small></div><div class="mod-kpi"><b>${direct.length}</b><small>직속 화면</small></div></div></div>
  <section class="mod-block"><h3><span>중분류</span><small>선택하면 중분류 홈으로 이동</small></h3><div class="mod-sections">${cards||'<div class="empty-note">이 대분류에 연결된 중분류가 없습니다.</div>'}</div></section>
  ${directCard}
  ${links?`<section class="mod-block"><h3><span>${status.length?'주요 현황 바로가기':'빠른 실행'}</span><small>${status.length?'현황·대시보드·실적 계열 화면 자동 선별':'등록된 화면 중 앞쪽 항목'}</small></h3><div class="mod-links">${links}</div></section>`:''}
 </div></body></html>`;
}
function buildSectionPreview(n){
 const mod=parentModuleOfSection(n),screens=containsKidsOf(n.id,'screen');
 const items=screens.map(x=>`<button class="sec-item" data-id="${x.id}" onclick="parent.previewNode(this.dataset.id)"><b>${esc(x.name)}</b><small>${esc(mod?.name||'상위 대분류 미연결')} › ${esc(n.name)} › 화면 열기</small></button>`).join('');
 const crumb=mod?`<button data-id="${mod.id}" onclick="parent.previewNode(this.dataset.id)">${esc(mod.name)}</button><span>›</span>`:'<span>상위 대분류 미연결</span><span>›</span>';
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${landingPreviewCss()}</style></head><body>
 <div class="pv-crumb">${crumb}<b>${esc(n.name)}</b><span>›</span><span>중분류 홈 미리보기</span></div>
 <div class="sec-home ${landingModeSection()}"><div class="sec-hero"><div class="ico">${esc(n.meta.icon||'▣')}</div><div><h1>${esc(n.name)}</h1><p>${esc(mod?.name||'상위 대분류 미연결')}의 중분류 · 관련 화면을 한 곳에서 선택합니다.</p></div><div class="sec-count">화면 ${screens.length}개</div></div>
  <div class="sec-groups"><section class="sec-group"><h3><span>업무 화면</span><small>${screens.length}개</small></h3><div class="sec-items">${items||'<div class="empty-note">이 중분류에 연결된 화면이 없습니다.</div>'}</div></section></div>
 </div></body></html>`;
}
function openLandingPreview(n,html){
 pvNode=n;pvSetToolbar(n.type);
 $('pv_name').textContent=n.type==='module'?`${n.name} · 대분류 홈`: `${n.name} · 중분류 홈`;
 pvScale=1;pvResetPos();$('pv_frame').srcdoc=html;$('pv_msg').textContent='미리보기 안의 항목을 클릭하면 다음 단계 화면으로 이동합니다.';pvDlg.classList.add('on');pvApply();
}
function previewModule(id){const n=N(id||(sel&&sel.node));if(!n||n.type!=='module')return;openLandingPreview(n,buildModulePreview(n))}
function previewSection(id){const n=N(id||(sel&&sel.node));if(!n||n.type!=='section')return;openLandingPreview(n,buildSectionPreview(n))}
function previewNode(id){
 const n=N(id||(sel&&sel.node));if(!n)return;
 if(n.type==='module')return previewModule(n.id);
 if(n.type==='section')return previewSection(n.id);
 if(n.type==='screen')return previewScreen(n.id);
}
window.previewNode=previewNode;
function tablesOf(n){return D.edges.filter(e=>e.from===n.id&&e.kind==='uses').map(e=>N(e.to)).filter(t=>t&&t.type==='table')}
function sampleRows(t,cnt){
 const cols=colsOf(t);const out=[];
 for(let i=0;i<cnt;i++){const r={};
  for(const c of cols){
   if(c.formula)continue;
   const sv=c.sample;
   if(sv!==undefined&&sv!==''){r[c.name]=c.type==='num'?(Number(String(sv).replace(/[^0-9.-]/g,''))||0)+i:(c.type==='bool'?(String(sv)!=='false'):(i?String(sv)+(c.pk?'-'+(i+1):''):sv));continue}
   if(/^chk_/i.test(c.name)){r[c.name]=(i===1&&cols.filter(x=>/^chk_/i.test(x.name)).indexOf(c)%3===1)?'NG':'OK';continue}
   {const fl=parseFlow(c);if(fl){r[c.name]=fl.steps[Math.min(i,fl.steps.length-1)];continue}}
   r[c.name]=c.type==='num'?(i+1)*10:c.type==='date'?new Date(Date.now()-i*864e5).toISOString().slice(0,10):c.type==='bool'?(i%2===0):(c.label||c.name)+' '+(i+1);
  }
  /* 체크시트: NG수·판정을 항목 결과에서 다시 계산 */
  const chk=cols.filter(x=>/^chk_/i.test(x.name));
  if(chk.length){const ng=chk.filter(x=>r[x.name]==='NG').length;if('ng_count' in r)r.ng_count=ng;if('result' in r)r.result=ng?'NG':'OK';if(/time/.test(cols.map(x=>x.name).join())){for(const x of cols)if(/time/.test(x.name)&&x.type!=='date')r[x.name]=String(8+i).padStart(2,'0')+':30'}}
  calcApplyRow(r,cols);out.push(r)}
 return out;
}
function buildPreview(n,kindOverride){
 const ts=tablesOf(n);
 const t=ts[0];
 const kind=kindOverride||n.meta.kind||'input';
 if(!t)return {html:`<!doctype html><meta charset="utf-8"><style>${skinOf(n)}</style><div class="screen"><div class="title"><h1>${esc(n.name)}</h1></div><div class="body"><section class="panel"><div class="empty">이 화면에 "사용" 연결된 테이블이 없습니다.<br>블록 오른쪽 ○ 를 끌어 테이블에 연결하면 입력칸이 만들어집니다.</div></section></div></div>`,code:''};
 const isChk=kind==='check'||(kind==='input'&&isCheckTable(t));
 const isBoard=kind==='board',isPerm=kind==='perm',isPaste=kind==='paste',isDash=kind==='dash';
 const md=(kind==='status'||isChk||isBoard||isPerm||isPaste||isDash)?null:detailOf(n);
 let html=md?applyFlow(masterDetailScreen(n,md.parent,md.child,md.edge,'미리보기',[]),md.parent)
   :isDash?dashScreen(n,ts,'미리보기')
   :isPaste?pasteScreen(n,ts,'미리보기')
   :isPerm?permScreen(n,ts,'미리보기')
   :isBoard?boardScreen(n,ts,'미리보기')
   :isChk?checkScreen(n,t,'미리보기')
   :kind==='status'?applyFlowStatus(statusScreen(n,t,'미리보기'),t):applyFlow(inputScreen(n,t,'미리보기',ts.slice(1)),t);
 const code=html;
 /* 외부 파일 의존을 떼고 샘플 자료를 넣는다 */
 html=html.replace(/<script src="app_config\.js"><\/script>/,'')
          .replace(/<link rel="stylesheet" href="mes_screen\.css"\s*\/?>/g,'<style>'+skinOf(n)+'</style>')
          .replace(/<script src="mes_db\.js"><\/script>[\s\S]*?<\/script>/,'');
 const arr=kind==='status'?'data':'rows';const isChkK=isChk;
 const pt=md?md.parent:t;
 const seed=JSON.stringify(sampleRows(pt,md?2:3));
 let extraSeed='';
 if(md){const lk=linkCol(md.parent,md.child,md.edge);
  const ls=sampleRows(md.child,3).map((r,i)=>({...r,[lk.child]:JSON.parse(seed)[0][lk.parent]}));
  extraSeed=`lines.push(...${JSON.stringify(ls)});pick(String(rows[0][PK]));`}
 if(isDash){const R=dashRoles(ts);const f=R.f;
  const G=['1라인','2라인','3라인'],ST=R.statusVals.length?R.statusVals:['가동','비가동','점검'];
  const rows=[];for(let i=0;i<9;i++){const r={};r[f.key]=(R.keyLabel||'대상')+' '+(i+1);
   if(f.group)r[f.group]=G[i%3];if(f.status)r[f.status]=ST[i%ST.length]||ST[0];
   for(const c of R.nums){r[c.name]=c===R.target?100:(c===R.actual?[92,55,20,88,73,0,66,41,97][i]:(i+1)*7)}
   for(const c of R.texts)if(!r[c.name])r[c.name]=(c.label||c.name)+' '+(i+1);
   if(f.time)r[f.time]=new Date(Date.now()-i*7*60000).toISOString().slice(0,16).replace('T',' ');rows.push(r)}
  let logs=[];if(R.log){const lf=R.lf;for(let i=0;i<6;i++){const l={};l[lf.key]=rows[i%3][f.key];if(lf.time)l[lf.time]=new Date(Date.now()-i*23*60000).toISOString().slice(0,16).replace('T',' ');
   if(lf.text)l[lf.text]=['정지 — 금형 교체','가동 재개','NG 3건 발생','점검 시작','가동 재개','자재 대기'][i];logs.push(l)}}
  html=html.replace('</body>',`<script>try{ROWS.push(...${JSON.stringify(rows)});LOGS.push(...${JSON.stringify(logs)});boot();if(window.msg)msg('미리보기 — 그룹 칩으로 거르고, 행을 누르면 상세·이벤트가 열립니다. 자동갱신 ${'5'}분.');}catch(e){document.body.insertAdjacentHTML('afterbegin','<pre style="color:#c00;padding:8px">'+e.message+'</pre>')}<\/script></body>`);
  return{html,code};}
 if(isPaste){const R=pasteRoles(ts);
  const rows=[1,2,3].map(i=>{const o={};for(const c of R.body)o[c.name]=(c.type==='num'?i:(c.label||c.name)+' '+i);
   o[R.f.key]='M-00'+i;if(R.f.parent)o[R.f.parent]='J-2609-01';if(R.pk)o[R.pk.name]=i*10;return o});
  html=html.replace('</body>',`<script>try{DATA.push(...${JSON.stringify(rows)});boot();if(window.msg)msg('미리보기 — 엑셀에서 복사해 아래 칸에 Ctrl+V 하면 열을 자동으로 읽습니다.');}catch(e){document.body.insertAdjacentHTML('afterbegin','<pre style="color:#c00;padding:8px">'+e.message+'</pre>')}<\/script></body>`);
  return{html,code};}
 if(isPerm){const R=permRoles(ts);
  const us=[{[R.f.ukey]:'10300_장소율',[R.f.uname]:'장소율'},{[R.f.ukey]:'10100_김현우',[R.f.uname]:'김현우'},{[R.f.ukey]:'20100_박민서',[R.f.uname]:'박민서'}];
  const dep=['품질관리팀','설계','구매/가공'],pos=['팀장','과장','사원'],rol=['master','user','user'];
  us.forEach((u,i)=>{if(R.f.udept)u[R.f.udept]=dep[i];if(R.f.upos)u[R.f.upos]=pos[i];if(R.f.urole)u[R.f.urole]=rol[i];if(R.f.uactive)u[R.f.uactive]=true;if(R.f.uid)u[R.f.uid]=['jsy','khw','pms'][i]});
  const tr=designTree();const first=tr[0]&&tr[0].secs[0]?tr[0].name+'/'+tr[0].secs[0].name:'';
  const ps=first?[{[R.f.pkey]:'10100_김현우',[R.f.pmenu]:first,[R.f.pview]:true,[R.f.psave]:true,[R.f.pedit]:false,[R.f.pdel]:false}]:[];
  html=html.replace('</body>',`<script>try{window.__TREE=${JSON.stringify(tr)};USERS.push(...${JSON.stringify(us)});PERMS.push(...${JSON.stringify(ps)});boot();if(window.msg)msg('미리보기 — 왼쪽에서 사용자를 고르고 아래 트리에서 메뉴별 조회·저장·수정·삭제를 체크한 뒤 [권한저장]');}catch(e){document.body.insertAdjacentHTML('afterbegin','<pre style="color:#c00;padding:8px">'+e.message+'</pre>')}<\/script></body>`);
  return{html,code};}
 if(isBoard){const R=boardRoles(ts);
  const jobs=sampleRows(R.jobs,3).map((r,i)=>({...r,[R.f.job]:'J-2609-0'+(i+1),...(R.f.item?{[R.f.item]:['프레스금형 A','트랜스퍼 금형','프로그레시브 금형'][i]}:{})}));
  const PN=['MC','GR','HT','WE','LA'];const parts=[];
  const routes=[{[R.f.rno]:1,[R.f.rname]:'MC→GR',[R.f.rsteps]:['MC','GR']},{[R.f.rno]:2,[R.f.rname]:'MC→GR→HT',[R.f.rsteps]:['MC','GR','HT']},{[R.f.rno]:3,[R.f.rname]:'MC→GR→HT→WE',[R.f.rsteps]:['MC','GR','HT','WE']},{[R.f.rno]:4,[R.f.rname]:'MC→HT→WE→LA→PL',[R.f.rsteps]:['MC','HT','WE','LA','PL']}];
  jobs.forEach((j,ji)=>{for(let k=0;k<4;k++){const p={};p[R.f.pjob]=j[R.f.job];p[R.f.part]='P-'+(ji+1)+'0'+(k+1);if(R.f.pname)p[R.f.pname]=['상형 다이','하형 펀치','스트리퍼','가이드 블록'][k];if(R.f.pqty)p[R.f.pqty]=k+1;
   const rt=(k===3)?null:routes[(k+ji)%3];p[R.f.steps]=rt?rt[R.f.rsteps].slice():[];if(R.f.pstd)p[R.f.pstd]=rt?rt[R.f.rname]:'';parts.push(p)}});
  const vendors=['미래써모텍','민성하이텍','보람테크','성광정밀','성보테크','승지금속','신성금속','우창정밀'].map((v,i)=>({[R.f.vname]:v}));
  const lines=[{[R.f.ljob]:'J-2609-01',[R.f.lpart]:'P-101',[R.f.lstep]:1,[R.f.lmp]:'MC',[R.f.lstatus]:'입고확정',[R.f.lvendor]:'보람테크'},{[R.f.ljob]:'J-2609-01',[R.f.lpart]:'P-101',[R.f.lstep]:2,[R.f.lmp]:'GR',[R.f.lstatus]:'입고',[R.f.lvendor]:'성광정밀'},{[R.f.ljob]:'J-2609-01',[R.f.lpart]:'P-102',[R.f.lstep]:1,[R.f.lmp]:'MC',[R.f.lstatus]:'발주',[R.f.lvendor]:'미래써모텍'}];
  html=html.replace('</body>',`<script>try{JOBS.push(...${JSON.stringify(jobs)});PARTS.push(...${JSON.stringify(parts)});VENDORS.push(...${JSON.stringify(vendors)});LINES.push(...${JSON.stringify(lines)});ROUTES.push(...${JSON.stringify(routes)});init();pickJob(JOBS[0]);if(window.msg)msg('미리보기 — 공정 없는 부품은 [가공공정표준]에서 선택 · 녹색 칸 클릭 → 업체 → 요청추가 → 발주등록 · 셀 더블클릭 → 입고/입고확정(금액)/발주취소');}catch(e){document.body.insertAdjacentHTML('afterbegin','<pre style="color:#c00;padding:8px">'+e.message+'</pre>')}<\/script></body>`);
  return{html,code};}
 html=html.replace('</body>',`<script>
try{const seed=${seed};${arr}.push(...seed);
 ${md?extraSeed:(kind==='status'?'search();':'render();')}
 if(window.msg)msg('미리보기 — 예시 자료 3건. 저장·삭제는 화면 안에서만 동작합니다.');
}catch(e){document.body.insertAdjacentHTML('afterbegin','<pre style="color:#c00;padding:8px">'+e.message+'</pre>')}
<\/script></body>`);
 return{html,code};
}
let pvScale=1;
const PV_STEPS=[0.5,0.6,0.7,0.8,0.9,1,1.1,1.25];
function pvApply(){
 const w=$('pv_wrap'),f=$('pv_frame');if(!w||!f)return;
 const s=pvScale;
 /* 축소하면 iframe 을 배율의 역수만큼 키워 화면(폼·표)이 더 넓게 그려진 뒤 줄여 보인다 → 잘리던 칸이 다 보임 */
 f.style.transform=`scale(${s})`;
 f.style.width=(100/s)+'%';f.style.height=(100/s)+'%';
 $('pv_zoom').textContent=Math.round(s*100)+'%';
}
function pvZoom(d){
 let i=PV_STEPS.findIndex(x=>Math.abs(x-pvScale)<.01);if(i<0)i=5;
 i=Math.max(0,Math.min(PV_STEPS.length-1,i+d));
 pvScale=PV_STEPS[i];pvApply();
}
let pvPos={x:0,y:0};
function pvMove(x,y){
 const m=pvDlg.querySelector('.modal');
 /* 화면 밖으로 완전히 나가지 않게 제한 (제목줄이 항상 잡히도록) */
 const r=m.getBoundingClientRect(),vw=innerWidth,vh=innerHeight;
 const bx=Math.max(-(r.width-120),Math.min(vw-120,x)),by=Math.max(0,Math.min(vh-48,y));
 pvPos={x:bx,y:by};m.style.transform=`translate(${bx}px,${by}px)`;
}
function pvResetPos(){pvPos={x:0,y:0};const m=pvDlg.querySelector('.modal');if(m)m.style.transform='';}
/* 제목줄 드래그로 창 이동 — 버튼·× 는 제외, 전체화면에서는 비활성 */
(function(){
 const t=pvDlg.querySelector('.t'),m=pvDlg.querySelector('.modal');
 let dg=null;
 t.addEventListener('pointerdown',e=>{
  if(e.target.closest('button,.x'))return;
  if(m.classList.contains('full'))return;
  dg={sx:e.clientX-pvPos.x,sy:e.clientY-pvPos.y};
  m.classList.add('dragging');t.setPointerCapture(e.pointerId);e.preventDefault();
 });
 t.addEventListener('pointermove',e=>{if(!dg)return;pvMove(e.clientX-dg.sx,e.clientY-dg.sy)});
 const end=e=>{if(!dg)return;dg=null;m.classList.remove('dragging');try{t.releasePointerCapture(e.pointerId)}catch(_){}}; 
 t.addEventListener('pointerup',end);t.addEventListener('pointercancel',end);
})();
function pvFull(){
 const m=pvDlg.querySelector('.modal');m.classList.toggle('full');
 $('pv_full').textContent=m.classList.contains('full')?'▣ 창 크기':'⛶ 전체화면';
 pvResetPos();
 pvApply();
}
function previewScreen(id,kind){
 const n=N(id||(sel&&sel.node));if(!n||n.type!=='screen')return;
 pvNode=n;pvSetToolbar('screen');
 if(n.meta.origin&&originUrl(n)&&!kind){return previewOrigin(n)}
 const {html}=buildPreview(n,kind);
 $('pv_name').textContent=`${n.name} · ${n.meta.file||''} · ${(kind||n.meta.kind)==='status'?'현황':(kind||n.meta.kind)==='input'?'등록':(kind||n.meta.kind)==='check'?'체크시트':(kind||n.meta.kind)==='board'?'보드':(kind||n.meta.kind)==='perm'?'권한관리':(kind||n.meta.kind)==='paste'?'붙여넣기':(kind||n.meta.kind)==='dash'?'대시보드':'기타'}`;
 pvScale=1;pvResetPos();
 $('pv_frame').srcdoc=html;$('pv_msg').textContent='';pvDlg.classList.add('on');
 pvApply();
 /* 열릴 때 폭이 모자라면 자동으로 한 단계씩 축소해 다 보이게 맞춘다 */
 const f=$('pv_frame');
 f.onload=()=>{try{
  const need=Math.max(f.contentDocument.documentElement.scrollWidth,f.contentDocument.body?f.contentDocument.body.scrollWidth:0);
  const have=$('pv_wrap').clientWidth;
  if(need>have+8){
   let s=Math.max(0.5,Math.floor(have/need*20)/20);
   pvScale=PV_STEPS.reduce((a,b)=>Math.abs(b-s)<Math.abs(a-s)&&b<=s+0.01?b:a,0.5);
   pvApply();
   $('pv_msg').textContent=`화면 폭이 넓어 ${Math.round(pvScale*100)}% 로 자동 축소했습니다. ＋/− 로 조절하거나 ⛶ 전체화면을 쓰세요.`;
  }
 }catch(e){}};
}

/* ═══ 원본 미리보기 안전장치 ═══
   원본 화면은 대개 로그인 가드가 있어, 세션이 없으면 location.href='index.html' 로 튕긴다.
   미리보기(iframe)에서는 그 주소가 저장소 raw 주소라 브라우저가 프레임을 막아 빈 화면이 된다.
   → ① 화면 이동을 막고 ② 가짜(메모리) 세션을 넣어 가드를 통과시킨다. 미리보기에서만 적용. */
function pvGuardScript(){
 const now=Date.now(),day=864e5;
 const seedL={
  mm_user_session:JSON.stringify({role:'admin',id:'preview',name:'미리보기',factory:'',dept:'설계',position:'',exp:now+day}),
  esg_pin_auth:JSON.stringify({name:'미리보기',pin:'',dept:'설계',position:'',emp_id:'PV',exp:now+day}),
  ki_sess:JSON.stringify({access_token:'preview',refresh_token:'preview',exp:now+day,uid:'preview',email:'preview@local'})};
 const seedS={
  ESG_USER:JSON.stringify({name:'미리보기',dept:'설계',position:'',emp_id:'PV'}),
  ki_me_cache:JSON.stringify({uid:'preview',me:{emp_no:'PV',emp_name:'미리보기',role:'관리자',dept:'설계',is_active:true},perm:{},ts:now})};
 return `<script>(function(){
 function mk(seed){var m=Object.assign({},seed);var o={getItem:function(k){return Object.prototype.hasOwnProperty.call(m,k)?m[k]:null},
  setItem:function(k,v){m[k]=String(v)},removeItem:function(k){delete m[k]},clear:function(){m={}},key:function(i){return Object.keys(m)[i]||null}};
  Object.defineProperty(o,'length',{get:function(){return Object.keys(m).length}});return o}
 try{Object.defineProperty(window,'localStorage',{configurable:true,get:function(){return mk(${JSON.stringify(seedL)})}})}catch(e){}
 try{Object.defineProperty(window,'sessionStorage',{configurable:true,get:function(){return mk(${JSON.stringify(seedS)})}})}catch(e){}
 function blocked(u){try{parent.postMessage({pvNav:String(u||'')},'*')}catch(e){}}
 Object.defineProperty(window,'__pvNav',{configurable:true,set:blocked,get:function(){return location.href}});
 window.__pvGo=blocked;window.open=function(u){blocked(u);return null};
 window.alert=function(m){try{parent.postMessage({pvAlert:String(m||'')},'*')}catch(e){}};
 window.addEventListener('submit',function(e){e.preventDefault();blocked('form submit')},true);
})();<\/script>`;
}
/* 인라인된 스크립트의 화면 이동 호출을 미리보기용으로 무력화 */
function pvNeutralizeNav(html){
 return html
  .replace(/(?:window\.|document\.|top\.|parent\.|self\.)?location\s*\.\s*href\s*=(?!=)/g,'window.__pvNav=')
  .replace(/(?:window\.|document\.|top\.|parent\.|self\.)?location\s*\.\s*(?:replace|assign)\s*\(/g,'window.__pvGo(')
  .replace(/(?:window\.|document\.|top\.|parent\.|self\.)?location\s*\.\s*reload\s*\(\s*\)/g,'void 0');
}
if(!window.__pvNavListener){window.__pvNavListener=true;
 window.addEventListener('message',e=>{const d=e&&e.data;if(!d)return;
  if(d.pvNav!==undefined)$('pv_msg').textContent=`이 화면이 '${String(d.pvNav).slice(0,60)}' 로 이동하려 했습니다 — 미리보기에서는 막았습니다 (생성된 시스템에서는 정상 이동).`;
  else if(d.pvAlert!==undefined)$('pv_msg').textContent='화면 알림: '+String(d.pvAlert).slice(0,80);});
}
async function previewOrigin(n){
 const url=originUrl(n);pvScale=1;pvResetPos();
 $('pv_name').textContent=`${n.name} · ${n.meta.file||''} · 📎 원본 (${url})`;
 $('pv_frame').srcdoc='<p style="font:14px sans-serif;padding:24px;color:#666">원본 파일 받는 중… '+esc(url)+'</p>';$('pv_msg').textContent='';pvDlg.classList.add('on');pvApply();
 try{let html=await fetchText(url);const dir=url.slice(0,url.lastIndexOf('/')+1);const assets={};
  await Promise.all(relAssets(html).map(async a=>{try{assets[a]=await fetchText(dir+a)}catch(e){}}));
  html=pvNeutralizeNav(inlineAssets(originSub(html),assets));
  html=html.replace(/<head[^>]*>/i,m=>m+(/<base\s/i.test(html)?'':`<base href="${dir}">`)+pvGuardScript());
  if(pvNode!==n)return;$('pv_frame').srcdoc=html;$('pv_msg').textContent='원본 화면 — 미리보기는 임시 세션으로 화면만 띄웁니다. 자료는 실제 Supabase 가 연결돼야 조회됩니다.';
  setTimeout(()=>{if(pvNode!==n)return;let blank=false;try{const d=$('pv_frame').contentDocument;blank=!d||!d.body||d.body.innerText.trim().length<5}catch(e){blank=true}
   if(blank&&!/이동하려|알림/.test($('pv_msg').textContent))$('pv_msg').textContent='원본이 비어 보입니다 — 그 화면이 DB(Supabase) 조회에 실패했거나 로그인 세션을 요구하는 경우입니다. [↗ 원본 열기]로 실제 동작을 확인하세요.'},2500);
 }catch(e){$('pv_frame').srcdoc='<p style="font:14px sans-serif;padding:24px;color:#c00">원본을 받지 못했습니다: '+esc(e.message)+'<br><br>'+esc(url)+'</p>'}
}
function pvMode(k){if(!pvNode||pvNode.type!=='screen')return;pvNode.meta.kind=k;render();renderPanel();previewScreen(pvNode.id,k)}
function pvCode(){if(!pvNode||pvNode.type!=='screen')return;const {code}=buildPreview(pvNode);
 GEN={[(pvNode.meta.file||'screen.html')]:code};genCur=Object.keys(GEN)[0];pvDlg.classList.remove('on');showGen();}

/* ═══ 기존 설계의 미연결 중분류/화면 자동 연결 ═══ */
function autoLinkOrphans(){
 const orphans=D.nodes.filter(n=>(n.type==='section'||n.type==='screen')&&!D.edges.some(e=>e.kind==='contains'&&e.to===n.id));
 if(!orphans.length){$('stat').textContent='연결이 필요한 기존 중분류/화면이 없습니다.';return}
 REPAIR_QUEUE=orphans.map(n=>n.id);REPAIR_COUNT=0;processRepairQueue();
}
function processRepairQueue(){
 while(REPAIR_QUEUE.length){
  const child=N(REPAIR_QUEUE.shift());if(!child||existingParent(child))continue;
  const cands=rankParentCandidates(child,null);if(!cands.length)continue;
  const best=clearParentDecision(cands);
  if(best){const r=attachToParent(best.node,[child]);REPAIR_COUNT+=r.count;continue}
  openParentChoice([child],cands,'기존 미연결 항목 자동 연결',(p,r)=>{REPAIR_COUNT+=r.count||0;processRepairQueue()});return;
 }
 render();$('stat').textContent=`기존 미연결 항목 자동 연결 완료 · 자동 연결 ${REPAIR_COUNT}건`;
}

/* ═══════════════ 설계 검증 ═══════════════ */
let LAST_VALIDATION={errors:[],warnings:[]};
function validateDesign(show){
 const errors=[],warnings=[];
 const push=(level,msg,refType,refId,detail='')=>{(level==='error'?errors:warnings).push({level,msg,refType,refId,detail})};
 const dbName=/^[a-zA-Z_][a-zA-Z0-9_]*$/;   /* 대문자 섞인 컬럼("procName")은 원본 DB에 실제 있는 경우 — schema.sql 에서 따옴표로 감싼다 */
 const dup=(arr,key)=>{const m=new Map();for(const x of arr){const k=key(x);if(!k)continue;if(!m.has(k))m.set(k,[]);m.get(k).push(x)}return[...m.entries()].filter(([,v])=>v.length>1)};
 const allowed={contains:(a,b)=>(a==='module'&&(b==='section'||b==='screen'))||(a==='section'&&b==='screen'),uses:(a,b)=>a==='screen'&&b==='table',ref:(a,b)=>a==='table'&&b==='table',flow:(a,b)=>a==='screen'&&b==='screen'};

 if(!D.nodes.some(n=>n.type==='module'))push('error','대메뉴 블록이 하나 이상 필요합니다.');

 // 끊어진 연결 / 관계 종류 검사
 for(const e of D.edges){
  const a=N(e.from),b=N(e.to);
  if(!a||!b){push('error','존재하지 않는 블록을 가리키는 연결이 있습니다.','edge',e.id);continue}
  if(e.from===e.to)push('error',`'${a.name}' 블록이 자기 자신과 연결되어 있습니다.`,'edge',e.id);
  if(!allowed[e.kind]||!allowed[e.kind](a.type,b.type))push('error',`잘못된 관계: ${a.name} (${TYPE[a.type]?.name||a.type}) → ${b.name} (${TYPE[b.type]?.name||b.type}) 를 '${KIND[e.kind]||e.kind}' 관계로 연결할 수 없습니다.`,'edge',e.id,'관계 종류 또는 연결 방향을 수정하세요.');
  if(e.kind==='ref'&&!String(e.label||'').trim())push('warning',`테이블 참조 '${a.name} → ${b.name}' 의 참조 컬럼 설명이 없습니다.`,'edge',e.id,'예: order_no → orders.order_no');
 }

 // 완전히 같은 연결이 중복되면 생성 결과가 예측하기 어려우므로 잡는다.
 for(const [key,rows] of dup(D.edges,e=>`${e.from}|${e.to}|${e.kind}`))for(const e of rows.slice(1))push('warning','같은 두 블록 사이에 동일한 관계가 중복되어 있습니다.','edge',e.id,'중복 연결은 하나만 남기는 것을 권장합니다.');

 // 대메뉴명은 APP 객체의 키로 사용되므로 고유해야 한다.
 for(const [name,rows] of dup(D.nodes.filter(n=>n.type==='module'),n=>n.name.trim()))for(const n of rows)push('error',`대메뉴명 '${name}' 이(가) 중복됩니다.`,'node',n.id,'대메뉴명은 생성 시스템의 메뉴 키이므로 고유해야 합니다.');
 // 중복 화면명: 메뉴/권한/PAGES 키 충돌
 for(const [name,rows] of dup(D.nodes.filter(n=>n.type==='screen'),n=>n.name.trim()))for(const n of rows)push('error',`화면명 '${name}' 이(가) 중복됩니다.`,'node',n.id,'화면명은 메뉴명·권한키로 사용되므로 고유해야 합니다.');
 // 중복 테이블명
 for(const [name,rows] of dup(D.nodes.filter(n=>n.type==='table'),n=>n.name.trim().toLowerCase()))for(const n of rows)push('error',`테이블명 '${n.name}' 이(가) 중복됩니다.`,'node',n.id);
 // 중복 파일명
 for(const [name,rows] of dup(D.nodes.filter(n=>n.type==='screen'),n=>(n.meta.file||'').trim().toLowerCase()))for(const n of rows)push('error',`화면 파일명 '${name}' 이(가) 중복됩니다.`,'node',n.id,'각 화면 파일명은 고유해야 합니다.');

 // 메뉴 계층
 for(const m of D.nodes.filter(n=>n.type==='module')){
  const kids=D.edges.filter(e=>e.from===m.id&&e.kind==='contains').map(e=>N(e.to)).filter(Boolean);
  if(!kids.length)push('warning',`대메뉴 '${m.name}' 아래에 중분류/화면이 없습니다.`,'node',m.id);
  const secs=kids.filter(n=>n.type==='section');
  for(const [name,rows] of dup(secs,n=>n.name.trim()))for(const n of rows)push('error',`대메뉴 '${m.name}' 아래 중분류명 '${name}' 이(가) 중복됩니다.`,'node',n.id,'같은 대메뉴 안의 중분류명은 고유하게 지정하세요.');
 }
 for(const sec of D.nodes.filter(n=>n.type==='section')){
  const kids=D.edges.filter(e=>e.from===sec.id&&e.kind==='contains').map(e=>N(e.to)).filter(n=>n&&n.type==='screen');
  if(!kids.length)push('warning',`중분류 '${sec.name}' 아래에 화면이 없습니다.`,'node',sec.id);
  const parents=D.edges.filter(e=>e.to===sec.id&&e.kind==='contains').map(e=>N(e.from)).filter(Boolean);
  if(!parents.length)push('warning',`중분류 '${sec.name}' 이(가) 어떤 대메뉴에도 포함되지 않았습니다.`,'node',sec.id);
  if(parents.length>1)push('warning',`중분류 '${sec.name}' 이(가) ${parents.length}개의 상위 메뉴에 연결되어 있습니다.`,'node',sec.id);
 }

 // 화면 검사
 for(const sc of D.nodes.filter(n=>n.type==='screen')){
  const parents=D.edges.filter(e=>e.to===sc.id&&e.kind==='contains').map(e=>N(e.from)).filter(Boolean);
  if(!parents.length)push('warning',`화면 '${sc.name}' 이(가) 메뉴 계층에 포함되지 않아 메뉴에서 접근할 수 없습니다.`,'node',sc.id);
  if(parents.length>1)push('warning',`화면 '${sc.name}' 이(가) ${parents.length}개의 메뉴 위치에 포함되어 있습니다.`,'node',sc.id,'의도한 공용 화면인지 확인하세요.');
  const uses=D.edges.filter(e=>e.from===sc.id&&e.kind==='uses').map(e=>N(e.to)).filter(n=>n&&n.type==='table');
  if(sc.meta.kind!=='other'&&!uses.length&&!(sc.meta.origin&&originUrl(sc)))push('error',`화면 '${sc.name}' 에 연결된 사용 테이블이 없습니다.`,'node',sc.id,'화면 오른쪽 포트를 테이블에 연결하세요.');
  const f=(sc.meta.file||'').trim();
  for(const t of uses)for(const c of colsOf(t))if(FLOW_COL.test(c.name)&&!parseFlow(c)&&(sc.meta.kind==='input'||!sc.meta.kind))push('warning',`'${t.name}.${c.name}' 에 상태흐름이 없습니다.`,'node',t.id,'테이블 컬럼의 ⇢ 상태흐름에 "대기 > 승인 > 완료 | 취소" 처럼 적으면 등록 화면에 단계 버튼이 생깁니다.');
  if(!f)push('warning',`화면 '${sc.name}' 의 파일명이 비어 있어 자동 생성됩니다.`,'node',sc.id);
  else if(!/^[A-Za-z0-9_.-]+\.html(?:\?.*)?$/.test(f))push('warning',`화면 '${sc.name}' 의 파일명 '${f}' 형식을 확인하세요.`,'node',sc.id,'영문/숫자/._- 조합의 .html 파일명을 권장합니다.');
 }

 // 테이블/컬럼 검사
 for(const t of D.nodes.filter(n=>n.type==='table')){
  const tn=(t.name||'').trim();
  if(!dbName.test(tn))push('error',`테이블명 '${tn||'(빈 이름)'}' 은 DB 식별자로 사용하기 어렵습니다.`,'node',t.id,'소문자 영문/숫자/_ 만 사용하고 첫 글자는 영문 또는 _ 로 시작하세요.');
  const cols=t.meta.cols||[];
  if(!cols.length){push('error',`테이블 '${tn}' 에 컬럼이 없습니다.`,'node',t.id);continue}
  if(!cols.some(c=>c.pk))push('error',`테이블 '${tn}' 에 기본키(🔑)가 없습니다.`,'node',t.id,'기본키 컬럼을 하나 이상 지정하세요.');
  for(const [name,rows] of dup(cols,c=>String(c.name||'').trim().toLowerCase()))if(name)push('error',`테이블 '${tn}' 의 컬럼 '${name}' 이(가) ${rows.length}번 중복됩니다.`,'node',t.id);
  for(const c of cols){
   const cn=String(c.name||'').trim();
   if(!cn)push('error',`테이블 '${tn}' 에 이름이 비어 있는 컬럼이 있습니다.`,'node',t.id);
   else if(!dbName.test(cn))push('error',`테이블 '${tn}' 의 컬럼명 '${cn}' 형식이 올바르지 않습니다.`,'node',t.id,'소문자 영문/숫자/_ 형식을 권장합니다.');
   if(!['text','num','date','bool'].includes(c.type))push('error',`테이블 '${tn}' 의 컬럼 '${cn}' 형 '${c.type}' 을 지원하지 않습니다.`,'node',t.id);
   if(c.formula!==undefined||c.calc){const fx=String(c.formula||'').trim();if(!fx)push('error',`테이블 '${tn}' 의 계산 컬럼 '${cn}' 에 계산식이 없습니다.`,'node',t.id,'ƒx 계산식에 예: qty * unit_price 처럼 입력하세요.');if(c.pk)push('error',`계산 컬럼 '${tn}.${cn}' 은 기본키(🔑)로 사용할 수 없습니다.`,'node',t.id);const names=new Set(cols.map(x=>x.name));for(const ref of calcFormulaRefs(fx))if(!names.has(ref))push('error',`계산식 '${tn}.${cn}' 이 존재하지 않는 컬럼 '${ref}' 을 참조합니다.`,'node',t.id);if(calcFormulaRefs(fx).includes(cn))push('error',`계산식 '${tn}.${cn}' 이 자기 자신을 참조합니다.`,'node',t.id);}
  }
  const ap=approvalConfig(t);if(ap.enabled){const names=new Set(cols.map(c=>c.name));const fl=flowOf(t);if(!fl)push('error',`테이블 '${tn}' 의 결재 담당자 기능이 켜져 있지만 상태 Workflow가 없습니다.`,'node',t.id,'status 컬럼에 작성 > 검토 > 확인 > 승인 > 완료 순서를 지정하세요.');for(const r of ap.roles)if(!names.has(r.col))push('error',`결재 단계 '${r.step}'의 담당자 컬럼 '${r.col}' 이 없습니다.`,'node',t.id,'[전자결재적용]을 다시 실행하거나 해당 컬럼을 추가하세요.');const ut=D.nodes.find(n=>n.type==='table'&&n.name==='users');if(!ut)push('error',`테이블 '${tn}' 은 결재 기능을 사용하지만 사용자정보(users)가 없습니다.`,'node',t.id,'[설계 › 👥 사용자·권한관리 기준정보 추가]를 실행하세요.');else{const un=new Set((ut.meta.cols||[]).map(c=>c.name));if(!un.has('user_key'))push('error',`사용자정보(users)에 user_key 컬럼이 없습니다.`,'node',ut.id);for(const p of ['can_review','can_confirm','can_approve'])if(!un.has(p))push('warning',`users.${p}가 없어 결재권한 필터가 적용되지 않습니다.`,'node',ut.id,'기준정보 팩을 적용하면 자동 추가됩니다.')}if(ap.routeTemplate&&!D.nodes.some(n=>n.type==='table'&&n.name==='approval_route_templates'))push('warning',`결재선 템플릿 '${ap.routeTemplate}' 을 사용하지만 approval_route_templates 테이블이 없습니다.`,'node',t.id,'기준정보 팩을 추가하거나 템플릿 코드를 비우세요.');}
  const pkc=cols.find(c=>c.pk),an=autoNoConfig(t),ac=alertConfig(t);
  if(an.enabled&&pkc&&pkc.type!=='text')push('warning',`테이블 '${tn}' 자동번호는 text 기본키에서만 적용됩니다.`,'node',t.id,'기본키 형식을 text로 바꾸거나 자동번호를 끄세요.');
  if(ac.enabled){const dc=cols.find(c=>c.name===ac.dateCol);if(!ac.dateCol)push('warning',`테이블 '${tn}' 기한 알림의 기준 날짜 컬럼이 선택되지 않았습니다.`,'node',t.id);else if(!dc)push('error',`테이블 '${tn}' 기한 알림이 없는 컬럼 '${ac.dateCol}' 을 참조합니다.`,'node',t.id);else if(dc.type!=='date')push('warning',`기한 알림 기준 '${tn}.${ac.dateCol}' 은 date 형식을 권장합니다.`,'node',t.id);}
  const used=D.edges.some(e=>(e.to===t.id&&e.kind==='uses')||(e.from===t.id&&e.kind==='ref')||(e.to===t.id&&e.kind==='ref'));
  if(!used)push('warning',`테이블 '${tn}' 이(가) 어떤 화면/테이블과도 연결되어 있지 않습니다.`,'node',t.id);
 }

 LAST_VALIDATION={errors,warnings};
 if(show!==false)showValidation(LAST_VALIDATION);
 return{ok:!errors.length,errors,warnings};
}
function showValidation(r=LAST_VALIDATION){
 const E=r.errors||[],W=r.warnings||[],total=E.length+W.length;
 $('valSummary').innerHTML=E.length
  ?`<span class="valpill err">오류 ${E.length}</span><span class="valpill warn">경고 ${W.length}</span><span>오류를 수정해야 시스템을 생성할 수 있습니다.</span>`
  :`<span class="valpill ok">✓ 생성 가능</span><span class="valpill warn">경고 ${W.length}</span><span>${W.length?'경고를 확인한 뒤 생성할 수 있습니다.':'현재 설계에서 구조 오류가 발견되지 않았습니다.'}</span>`;
 const all=[...E,...W];
 $('valList').innerHTML=total?all.map((x,i)=>`<button class="valitem ${x.level==='error'?'err':'warn'}" onclick="validationJump('${x.refType||''}','${x.refId||''}')"><span class="ico">${x.level==='error'?'✕':'!'}</span><span><b>${esc(x.msg)}</b>${x.detail?`<small>${esc(x.detail)}</small>`:''}</span><span class="go">${x.refId?'찾아가기 →':''}</span></button>`).join('')
  :'<div class="empty"><b>✓ 검증 완료</b><br>오류나 경고가 없습니다.</div>';
 $('valMsg').textContent=`블록 ${D.nodes.length} · 연결 ${D.edges.length}`;
 valDlg.classList.add('on');
}
function validationJump(type,id){
 valDlg.classList.remove('on');if(!id)return;
 if(type==='edge'){select({edge:id});return}
 const n=N(id);if(!n)return;select({node:id});
 const r=svg.getBoundingClientRect(),s=size(n);view.x=r.width/2-(n.x+s.w/2)*view.k;view.y=r.height/2-(n.y+s.h/2)*view.k;render();
}
