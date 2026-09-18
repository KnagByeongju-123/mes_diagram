/* 업종별 구성 보관함 데이터 — 화면/기능 코드와 분리하여 이 파일만 수정하면 업종 구성을 늘릴 수 있습니다. */
const CONFIG_PRESETS=[
 {cat:'제조업',name:'프레스 · 금형 제조업',icon:'🔩',desc:'수주부터 프레스 생산, 금형, 품질, 자재, 설비, 안전까지 기본 MES 구성',modules:[
  {name:'영업관리',icon:'📑',sections:[{name:'수주·영업',profile:'order',screens:[['수주등록','input'],['수주현황','status'],['수주대시보드','dash']]},{name:'출하·납품',profile:'shipping',screens:[['출하등록','input'],['출하현황','status'],['납품현황','status']]}]},
  {name:'생산관리',icon:'⚙',sections:[{name:'생산계획',profile:'production',screens:[['생산계획 등록','input'],['생산계획 현황','status']]},{name:'생산실적',profile:'production',screens:[['생산실적 등록','input'],['생산현황','status'],['생산대시보드','dash']]}]},
  {name:'금형관리',icon:'🧰',sections:[{name:'금형대장',profile:'die',screens:[['금형등록','input'],['금형현황','status']]},{name:'금형점검',profile:'die',screens:[['금형점검 등록','check'],['금형점검 현황','status']]},{name:'금형수리',profile:'die',screens:[['금형수리이력','input'],['수리현황','status']]}]},
  {name:'품질관리',icon:'✓',sections:[{name:'공정검사',profile:'quality',screens:[['검사결과 등록','input'],['검사결과 현황','status']]},{name:'불량관리',profile:'quality',screens:[['불량등록','input'],['불량현황','status'],['품질대시보드','dash']]}]},
  {name:'자재관리',icon:'📦',sections:[{name:'자재·재고',profile:'material',screens:[['자재입고','input'],['자재출고','input'],['재고현황','status']]}]},
  {name:'설비관리',icon:'🏭',sections:[{name:'설비·보전',profile:'equipment',screens:[['설비등록','input'],['예방점검 등록','check'],['고장이력','input'],['설비현황','status']]}]},
  {name:'안전환경',icon:'🦺',sections:[{name:'위험성평가',profile:'safety',screens:[['위험성평가 등록','input'],['개선조치','input'],['위험성평가 현황','status']]},{name:'안전교육',profile:'common',screens:[['교육일지 등록','input'],['교육현황','status']]}]}
 ]},
 {cat:'제조업',name:'자동차부품 제조업',icon:'🚗',desc:'수주·생산·LOT 추적·품질·출하 중심의 자동차부품 기본 구성',modules:[
  {name:'영업·납품',icon:'🚚',sections:[{name:'수주·영업',profile:'order',screens:[['수주등록','input'],['수주현황','status']]},{name:'출하·납품',profile:'shipping',screens:[['출하등록','input'],['납품현황','status']]}]},
  {name:'생산관리',icon:'⚙',sections:[{name:'생산실적',profile:'production',screens:[['생산실적 등록','input'],['생산현황','status'],['생산대시보드','dash']]},{name:'LOT 추적',profile:'production',screens:[['LOT 실적등록','input'],['LOT 추적현황','status']]}]},
  {name:'품질관리',icon:'🔎',sections:[{name:'수입검사',profile:'quality',screens:[['수입검사 등록','input'],['수입검사 현황','status']]},{name:'공정검사',profile:'quality',screens:[['공정검사 등록','input'],['공정불량 현황','status']]},{name:'출하검사',profile:'quality',screens:[['출하검사 등록','input'],['출하검사 현황','status']]}]},
  {name:'자재·재고',icon:'📦',sections:[{name:'원부자재',profile:'material',screens:[['입고등록','input'],['출고등록','input'],['재고현황','status']]}]},
  {name:'설비·금형',icon:'🧰',sections:[{name:'설비보전',profile:'equipment',screens:[['설비점검 등록','check'],['고장이력','input'],['설비현황','status']]},{name:'금형관리',profile:'die',screens:[['금형등록','input'],['금형점검','check'],['금형현황','status']]}]},
  {name:'기준정보',icon:'▦',sections:[{name:'품목기준',profile:'item',screens:[['품목관리','input']]},{name:'거래처기준',profile:'vendor',screens:[['거래처관리','input']]},{name:'공정기준',profile:'process',screens:[['공정관리','input']]}]}
 ]},
 {cat:'제조업',name:'일반 제조업 · MES',icon:'🏭',desc:'업종에 관계없이 가장 많이 쓰는 수주·생산·품질·재고·설비 기본형',modules:[
  {name:'영업관리',icon:'📑',sections:[{name:'수주·영업',profile:'order',screens:[['수주등록','input'],['수주현황','status']]},{name:'출하관리',profile:'shipping',screens:[['출하등록','input'],['출하현황','status']]}]},
  {name:'생산관리',icon:'⚙',sections:[{name:'생산실적',profile:'production',screens:[['생산실적 등록','input'],['생산현황','status'],['생산대시보드','dash']]}]},
  {name:'품질관리',icon:'✓',sections:[{name:'품질검사',profile:'quality',screens:[['검사결과 등록','input'],['검사현황','status'],['불량현황','status']]}]},
  {name:'자재관리',icon:'📦',sections:[{name:'자재·재고',profile:'material',screens:[['입고등록','input'],['출고등록','input'],['재고현황','status']]}]},
  {name:'설비관리',icon:'🔧',sections:[{name:'설비·보전',profile:'equipment',screens:[['설비등록','input'],['점검등록','check'],['고장이력','input'],['설비현황','status']]}]},
  {name:'기준정보',icon:'▦',sections:[{name:'품목기준',profile:'item',screens:[['품목관리','input']]},{name:'거래처기준',profile:'vendor',screens:[['거래처관리','input']]}]}
 ]},
 {cat:'제조업',name:'기계가공 · 정밀가공',icon:'⚙',desc:'가공공정, 외주가공, 공구, 검사, 설비를 중심으로 한 기본 구성',modules:[
  {name:'영업관리',icon:'📑',sections:[{name:'수주·견적',profile:'order',screens:[['견적등록','input'],['수주등록','input'],['수주현황','status']]}]},
  {name:'가공관리',icon:'🛠',sections:[{name:'가공계획',profile:'production',screens:[['가공계획 등록','input'],['가공계획 현황','status']]},{name:'가공실적',profile:'production',screens:[['가공실적 등록','input'],['가공현황','status']]},{name:'외주가공',profile:'purchase',screens:[['외주발주 등록','input'],['외주입고 현황','status']]}]},
  {name:'품질관리',icon:'🔎',sections:[{name:'가공검사',profile:'quality',screens:[['측정결과 등록','input'],['검사현황','status'],['불량현황','status']]}]},
  {name:'공구·설비',icon:'🔧',sections:[{name:'공구관리',profile:'equipment',screens:[['공구등록','input'],['교체이력','input']]},{name:'설비보전',profile:'equipment',screens:[['설비점검','check'],['고장이력','input'],['설비현황','status']]}]},
  {name:'자재·재고',icon:'📦',sections:[{name:'소재재고',profile:'material',screens:[['소재입고','input'],['소재출고','input'],['재고현황','status']]}]}
 ]},
 {cat:'제조업',name:'조립 · 전자부품 제조업',icon:'🔌',desc:'BOM·조립실적·검사·자재·출하·A/S를 중심으로 구성',modules:[
  {name:'제품기준',icon:'▦',sections:[{name:'품목기준',profile:'item',screens:[['품목관리','input']]},{name:'BOM관리',profile:'bom',screens:[['BOM등록','input'],['BOM현황','status']]}]},
  {name:'생산관리',icon:'⚙',sections:[{name:'조립생산',profile:'production',screens:[['조립실적 등록','input'],['생산현황','status'],['생산대시보드','dash']]}]},
  {name:'품질관리',icon:'✓',sections:[{name:'검사관리',profile:'quality',screens:[['검사결과 등록','input'],['불량현황','status']]}]},
  {name:'자재관리',icon:'📦',sections:[{name:'부품재고',profile:'material',screens:[['부품입고','input'],['부품출고','input'],['재고현황','status']]}]},
  {name:'영업·출하',icon:'🚚',sections:[{name:'수주관리',profile:'order',screens:[['수주등록','input'],['수주현황','status']]},{name:'출하관리',profile:'shipping',screens:[['출하등록','input'],['출하현황','status']]}]},
  {name:'고객서비스',icon:'☎',sections:[{name:'A/S관리',profile:'service',screens:[['A/S 접수','input'],['처리현황','status']]}]}
 ]},
 {cat:'유통·무역',name:'철강 · 소재 · 수입무역',icon:'🚢',desc:'견적·수주·해외발주·수입통관·창고·출하·정산 기본 구성',modules:[
  {name:'영업관리',icon:'📑',sections:[{name:'견적·수주',profile:'order',screens:[['견적등록','input'],['수주등록','input'],['수주현황','status']]}]},
  {name:'구매·수입',icon:'🚢',sections:[{name:'해외발주',profile:'purchase',screens:[['해외발주 등록','input'],['발주현황','status']]},{name:'수입통관',profile:'import',screens:[['선적정보 등록','input'],['통관현황','status']]}]},
  {name:'재고관리',icon:'📦',sections:[{name:'창고재고',profile:'material',screens:[['입고등록','input'],['출고등록','input'],['재고현황','status']]}]},
  {name:'출하관리',icon:'🚚',sections:[{name:'납품·출하',profile:'shipping',screens:[['출하등록','input'],['납품현황','status']]}]},
  {name:'정산관리',icon:'₩',sections:[{name:'매입·매출',profile:'finance',screens:[['매입등록','input'],['매출등록','input'],['정산현황','status']]}]},
  {name:'기준정보',icon:'▦',sections:[{name:'거래처기준',profile:'vendor',screens:[['거래처관리','input']]},{name:'품목기준',profile:'item',screens:[['강종·품목관리','input']]}]}
 ]},
 {cat:'유통·무역',name:'유통 · 재고 · 물류',icon:'📦',desc:'상품·구매·입고·재고·주문·출고·배송을 한 흐름으로 관리',modules:[
  {name:'상품관리',icon:'▦',sections:[{name:'상품기준',profile:'item',screens:[['상품등록','input'],['상품현황','status']]},{name:'거래처기준',profile:'vendor',screens:[['거래처관리','input']]}]},
  {name:'구매관리',icon:'🛒',sections:[{name:'구매·발주',profile:'purchase',screens:[['발주등록','input'],['발주현황','status']]}]},
  {name:'재고관리',icon:'📦',sections:[{name:'입출고·재고',profile:'material',screens:[['입고등록','input'],['출고등록','input'],['재고현황','status'],['재고대시보드','dash']]}]},
  {name:'주문관리',icon:'🧾',sections:[{name:'주문·판매',profile:'order',screens:[['주문등록','input'],['주문현황','status']]}]},
  {name:'배송관리',icon:'🚚',sections:[{name:'출고·배송',profile:'shipping',screens:[['출고등록','input'],['배송현황','status']]}]}
 ]},
 {cat:'건설·서비스',name:'건설 · 설비공사',icon:'🏗',desc:'프로젝트·견적계약·공정·자재·작업일보·안전·기성 정산 기본 구성',modules:[
  {name:'프로젝트관리',icon:'🏗',sections:[{name:'프로젝트',profile:'project',screens:[['프로젝트 등록','input'],['프로젝트 현황','status']]},{name:'견적·계약',profile:'order',screens:[['견적등록','input'],['계약현황','status']]}]},
  {name:'공정관리',icon:'📅',sections:[{name:'공정계획',profile:'project',screens:[['공정계획 등록','input'],['공정현황','status']]},{name:'작업일보',profile:'service',screens:[['작업일보 등록','input'],['작업현황','status']]}]},
  {name:'자재관리',icon:'📦',sections:[{name:'현장자재',profile:'material',screens:[['자재입고','input'],['자재사용','input'],['재고현황','status']]}]},
  {name:'안전관리',icon:'🦺',sections:[{name:'위험성평가',profile:'safety',screens:[['위험성평가 등록','input'],['개선조치','input'],['안전현황','status']]}]},
  {name:'정산관리',icon:'₩',sections:[{name:'기성·정산',profile:'finance',screens:[['기성등록','input'],['정산현황','status']]}]}
 ]},
 {cat:'건설·서비스',name:'시설관리 · 유지보수 서비스',icon:'🧑‍🔧',desc:'고객계약·작업요청·설비점검·보수이력·일정·비용 관리',modules:[
  {name:'고객관리',icon:'👥',sections:[{name:'고객·계약',profile:'vendor',screens:[['고객등록','input'],['계약현황','status']]}]},
  {name:'작업관리',icon:'🧑‍🔧',sections:[{name:'작업요청',profile:'service',screens:[['작업요청 등록','input'],['처리현황','status']]},{name:'정기점검',profile:'equipment',screens:[['점검등록','check'],['점검현황','status']]}]},
  {name:'자산·설비',icon:'🔧',sections:[{name:'설비대장',profile:'equipment',screens:[['설비등록','input'],['설비현황','status']]},{name:'보수이력',profile:'equipment',screens:[['보수이력 등록','input'],['고장이력','status']]}]},
  {name:'일정관리',icon:'📅',sections:[{name:'방문일정',profile:'service',screens:[['일정등록','input'],['일정현황','status']]}]},
  {name:'비용관리',icon:'₩',sections:[{name:'작업비용',profile:'finance',screens:[['비용등록','input'],['비용현황','status']]}]}
 ]},
 {cat:'식품·환경',name:'식품 제조 · HACCP',icon:'🍱',desc:'원료입고·배치생산·HACCP 점검·품질·재고·출하·추적성 기본 구성',modules:[
  {name:'원료관리',icon:'📦',sections:[{name:'원료입고',profile:'material',screens:[['원료입고 등록','input'],['원료재고 현황','status']]}]},
  {name:'생산관리',icon:'⚙',sections:[{name:'배치생산',profile:'production',screens:[['배치생산 등록','input'],['생산현황','status']]}]},
  {name:'품질·HACCP',icon:'🧪',sections:[{name:'품질검사',profile:'quality',screens:[['검사결과 등록','input'],['검사현황','status']]},{name:'HACCP점검',profile:'haccp',screens:[['CCP 점검등록','check'],['점검현황','status']]}]},
  {name:'재고·출하',icon:'🚚',sections:[{name:'제품재고',profile:'material',screens:[['제품입고','input'],['재고현황','status']]},{name:'출하관리',profile:'shipping',screens:[['출하등록','input'],['출하현황','status']]}]},
  {name:'추적관리',icon:'🔗',sections:[{name:'LOT추적',profile:'quality',screens:[['LOT 추적조회','status'],['회수이력 등록','input']]}]},
  {name:'위생관리',icon:'🧹',sections:[{name:'위생점검',profile:'haccp',screens:[['위생점검 등록','check'],['위생점검 현황','status']]}]}
 ]},
 {cat:'식품·환경',name:'ESG · 안전 · 환경 통합',icon:'🌱',desc:'위험성평가, 교육, 환경, 에너지, 폐기물, ESG 지표를 통합 관리',modules:[
  {name:'안전관리',icon:'🦺',sections:[{name:'위험성평가',profile:'safety',screens:[['위험성평가 등록','input'],['개선조치','input'],['위험성평가 현황','status']]},{name:'안전교육',profile:'common',screens:[['교육일지 등록','input'],['교육현황','status']]}]},
  {name:'환경관리',icon:'🌿',sections:[{name:'환경점검',profile:'esg',screens:[['환경점검 등록','check'],['환경현황','status']]},{name:'폐기물관리',profile:'esg',screens:[['폐기물 실적등록','input'],['폐기물 현황','status']]}]},
  {name:'에너지관리',icon:'⚡',sections:[{name:'에너지·탄소',profile:'esg',screens:[['에너지 실적등록','input'],['탄소배출 현황','status'],['ESG 대시보드','dash']]}]},
  {name:'법규·점검',icon:'📚',sections:[{name:'법규준수',profile:'common',screens:[['법규목록 등록','input'],['점검이력','input'],['준수현황','status']]}]}
 ]}
];
