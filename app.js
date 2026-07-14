export const PAGES = [
  { id: 'home', icon: '首', label: '首页总览', title: '首页总览', subtitle: '项目、成果、经费、流程与质量问题的统一入口' },
  { id: 'project', icon: '项', label: '项目管理', title: '项目全景页', subtitle: '以项目编号为主线查看项目全生命周期链条' },
  { id: 'achievement', icon: '果', label: '成果管理', title: '成果归集页', subtitle: '成果登记、项目绑定、作者维护与附件上传' },
  { id: 'quality', icon: '质', label: '数据质量', title: '数据质量监控页', subtitle: '缺失、重复、关联断裂、金额异常、时间异常集中整改' },
  { id: 'asset', icon: '资', label: '资产目录', title: '数据资产目录页', subtitle: '从业务、技术、管理三类视角说明学院拥有哪些数据资产' },
  { id: 'map', icon: '图', label: '数据地图', title: '数据地图页', subtitle: '组织、人员、项目、成果、经费、流程、附件、评审、统计指标关系可视化' },
  { id: 'report', icon: '报', label: '统计报表', title: '统计报表页', subtitle: '年度总结、考核评优与项目复盘的统计分析出口' },
];

export function resolvePage(id) {
  return PAGES.find((page) => page.id === id) ?? PAGES[0];
}

const nav = (active) => PAGES.map((page) => `<button class="nav-item ${page.id === active ? 'active' : ''}" data-page="${page.id}"><span class="nav-icon">${page.icon}</span>${page.label}</button>`).join('');
const pill = (label, value) => `<span class="filter"><b>${label}</b>${value}</span>`;
const badge = (text, tone = 'blue') => `<span class="badge ${tone}">${text}</span>`;
const panel = (title, content, note = '', className = '') => `<section class="panel ${className}"><div class="panel-head"><div><h3>${title}</h3>${note ? `<p>${note}</p>` : ''}</div></div>${content}</section>`;
const metric = (label, value, hint, tone = 'blue') => `<article class="metric"><span>${label}</span><strong class="${tone}">${value}</strong><small>${hint}</small><button title="查看详情" class="quiet-link">查看</button></article>`;
const bars = (items) => `<div class="bar-list">${items.map(([name, value, tone = 'blue']) => `<div class="bar-row"><span>${name}</span><i><em class="${tone}" style="width:${value}%"></em></i><b>${Math.round(value / 100 * 146)}</b></div>`).join('')}</div>`;
const table = (headers, rows, cls = '') => `<div class="table-wrap ${cls}"><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const lineChart = () => `<div class="line-chart"><div class="grid-lines"></div><svg viewBox="0 0 600 150" preserveAspectRatio="none" aria-label="年度项目与成果趋势"><polyline class="line teal-line" points="20,125 125,106 230,83 335,68 440,51 555,61"/><polyline class="line blue-line" points="20,115 125,93 230,70 335,52 440,34 555,45"/>${[20,125,230,335,440,555].map((x, i) => `<circle class="point teal-point" cx="${x}" cy="${[125,106,83,68,51,61][i]}" r="4"/><circle class="point blue-point" cx="${x}" cy="${[115,93,70,52,34,45][i]}" r="4"/>`).join('')}</svg><div class="axis"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span><span>预测</span></div></div>`;
const commonExplanation = (page) => `<footer class="inside-note"><b>${page.title}说明：</b> 功能说明：本页对应报告中的数据治理功能模块，以项目、成果、质量规则和统计指标为统一口径，支持从明细到全景的追溯分析。</footer>`;

function home() {
  const projectRows = [
    ['KY–2026–018', '跨境电商企业数字化转型研究', '王明', '国际贸易系', badge('执行中', 'green'), badge('2 条', 'amber')],
    ['JY–2026–011', '数字经济课程案例库建设', '李婷', '数字经济教研室', badge('审核中'), badge('缺附件', 'red')],
    ['HX–2025–006', '湾区供应链韧性评价模型', '陈舟', '工商管理系', badge('结题', 'green'), badge('通过', 'green')],
    ['XS–2026–023', '学生创新创业训练项目数据集', '赵妍', '学院办公室', badge('待补正', 'amber'), badge('4 条', 'red')],
  ];
  return `<div class="filters">${pill('年度', '2026')}${pill('部门', '国际商学院')}${pill('项目类型', '科研项目 / 教研项目')}${pill('状态', '全部')}</div>
    <div class="metrics six">${metric('项目总数', '128', '较上年 +18')}${metric('执行中项目', '46', '科研 28 / 教研 18 查看', 'green')}${metric('待审核项目', '17', '其中 6 项缺附件', 'amber')}${metric('成果数', '312', '论文 146 / 教改 58')}${metric('经费使用率', '68.4%', '余额 82.6 万', 'green')}${metric('质量问题数', '29', '关联断裂 11 条', 'red')}</div>
    <div class="split two-three"><div>${panel('年度项目与成果趋势', lineChart(), '统计分析域：项目数、成果数、经费使用率')}</div><div>${panel('项目类型分布', '<div class="donut"><strong>128</strong></div><div class="legend"><span><i class="dot blue"></i>科研 55</span><span><i class="dot teal"></i>教研 35</span><span><i class="dot light"></i>横向 20</span><span><i class="dot pale"></i>学生 18</span></div>')}</div></div>
    <div class="split two-three"><div>${panel('近期项目动态', table(['项目编号', '项目名称', '负责人', '部门', '状态', '质量'], projectRows), '点击项目编号进入全景页')}</div><div>${panel('质量问题类型', bars([['关联断裂', 38], ['缺失字段', 31, 'teal'], ['金额异常', 16, 'muted'], ['重复记录', 11, 'teal'], ['时间异常', 7]]))}</div></div>`;
}

function project() {
  const flow = ['申报', '初审', '复审', '立项', '中期', '结题', '归档'];
  return `<div class="filters">${pill('项目编号', 'KY–2026–018')}${pill('负责人', '王明')}${pill('所属组织', '国际贸易系')}${pill('项目状态', '执行中')}</div>
  <div class="split two-three"><div>${panel('项目基础信息', `<div class="field-grid">${[['项目编号 project_code','KY–2026–018'],['项目名称 project_name','跨境电商企业数字化转型研究'],['项目类型 project_type','科研项目'],['项目级别 project_level','省部级'],['负责人 leader_person_id','王明 / P–T–014'],['所属组织 org_id','国际贸易系 / ORG–IBS–02'],['开始日期 start_date','2026–03–01'],['结束日期 end_date','2027–02–28'],['项目状态 project_status','执行中']].map(([a,b])=>`<div class="field"><small>${a}</small><b>${b}</b></div>`).join('')}</div>`, badge('执行中','green'))}</div><div>${panel('经费概况', `<div class="fund"><span>经费使用率</span><strong>72.5%</strong><div class="progress"><i style="width:72.5%"></i></div><p>到账 18.0 万 <em>余额 4.95 万</em></p><small>规则：balance_amount = received_amount − used_amount；已通过本周校验。</small></div>`)}</div></div>
  ${panel('项目流程轨迹', `<div class="flow">${flow.map((step, index) => `<div class="flow-step ${index < 4 ? 'done' : index === 4 ? 'current' : ''}"><b>${step}</b><span>${['2026–02–18','2026–02–22','2026–02–28','2026–03–01','2026–09–10','2027–02–28','结题后 7 日'][index]}</span><small>${['教师提交','学院办公室','专家组通过','编号生成','材料准备','待处理','自动提醒'][index]}</small></div>`).join('')}</div>`, 'd_process 流程节点表')}
  <div class="triple">${panel('项目成员', table(['人员', '角色', '贡献'], [['王明','负责人','45%'],['李婷','成员','25%'],['周航','学生助研','15%'],['赵妍','数据整理','15%']]))}${panel('关联成果', table(['成果编号', '类型', '状态'], [['ACH–2026–041','论文',badge('通过','green')],['ACH–2026–058','研究报告',badge('待审')],['ACH–2026–067','案例库',badge('补正','amber')]]))}${panel('附件与评审', `<div class="info-list"><div><b>附件归档</b><span>${badge('完整')}申报书、合同 v2、中期材料 v1，共 9 份</span></div><div><b>评审记录</b><span>${badge('可追溯')}立项评审 86.5 分；复审结论：通过</span></div><div><b>操作日志</b><span>${badge('留痕')}王明在 2026–06–12 更新材料</span></div></div>`)}</div>`;
}

function achievement() {
  return `<div class="filters">${pill('成果类型', '论文 / 专利 / 教改成果')}${pill('审核状态', '待审核')}${pill('项目绑定', '全部')}${pill('发表年度', '2026')}</div><div class="split two-three"><div class="stack">${panel('成果登记表单', `<div class="field-grid">${[['成果编号 achievement_code','ACH–2026–058'],['成果类型 achievement_type','研究报告'],['成果名称 achievement_name','跨境电商企业数字化转型路径研究报告'],['关联项目 project_id','PRJ–2026–018 / KY–2026–018'],['第一作者 first_author_id','王明 / P–T–014'],['发表/获得日期 publish_date','2026–06–12'],['成果级别 level','学院重点成果'],['审核状态 status','待审核'],['独立来源说明 independent_reason','已绑定项目，无需填写']].map(([a,b])=>`<div class="field"><small>${a}</small><b>${b}</b></div>`).join('')}`, 'd_achievement 成果信息表')}
  <div class="split even">${panel('作者维护', table(['姓名','身份','顺序'],[['王明','教师','第一作者'],['周航','学生','第二作者'],['李婷','教师','通讯作者']]))}${panel('附件上传', '<div class="upload-box"><b>成果证明_ACH–2026–058.pdf</b><span>研审室文_v1.docx</span><small>支持按成果编号自动归档</small></div>')}</div></div><div class="stack">${panel('项目绑定检查', `<div class="callout ok"><b>自动带出</b><span>负责人：王明；所属组织：国际贸易系；项目状态：执行中。</span></div><div class="callout warn"><b>例外路径</b><span>未绑定项目时，必须填写独立成果来源说明并提交管理员复核。</span></div>`)}${panel('成果类型筛选', `<div class="info-list"><div><b>论文</b><span>${badge('已审')}146 条，其中 CSSCI 18 条</span></div><div><b>专利</b><span>${badge('补证')}22 条，授权证明缺失 3 条</span></div><div><b>教改成果</b><span>${badge('待审')}58 条，需绑定课程项目</span></div></div>`)}</div></div>${panel('成果归集列表', table(['成果编号','成果名称','类型','关联项目','第一作者','状态','质量提示'], [['ACH–2026–058','跨境电商企业数字化转型路径研究报告','研究报告','KY–2026–018','王明',badge('待审核'),'附件完整'],['ACH–2026–041','数字贸易国际化研究','论文','KY–2026–018','李婷',badge('通过','green'),'已归档'],['ACH–2026–067','课程案例库','教改成果','JY–2026–011','周航',badge('补正','amber'),'项目未绑定']]))}`;
}

function quality() {
  const rows = [['DQ–26061',badge('关联断裂','red'),'d_achievement.project_id 为空，independent_reason 未填','陈舟','待处理','本周五'],['DQ–26062',badge('金额异常','amber'),'d_fund.balance_amount 与到账减使用不一致','经费岗','处理中','今日'],['DQ–26063',badge('时间异常','amber'),'d_project.end_date 早于 start_date','李婷','待处理','本周四'],['DQ–26064',badge('缺失字段','red'),'d_attachment.file_type 为空','王明','退回补正','本周五'],['DQ–26065',badge('重复记录','amber'),'同负责人同年度项目名称完全重复','办公室','待确认','下周一']];
  return `<div class="filters">${pill('问题类型','全部')}${pill('责任人','全部')}${pill('处理状态','待处理 / 处理中')}${pill('复核周期','本周')}</div><div class="metrics five">${metric('缺失字段','9','附件类型、负责人','red')}${metric('重复记录','3','项目名相近','amber')}${metric('关联断裂','11','成果未绑定','red')}${metric('金额异常','4','余额公式不符','amber')}${metric('时间异常','2','结束早于开始','amber')}</div><div class="split two-three"><div>${panel('质量问题台账', table(['问题编号','类型','对象与字段','责任人','状态','复核'],rows), '按问题类型、责任人、处理状态筛选')}</div><div>${panel('治理闭环', `<div class="checklist">${[['规则扫描','定时执行 quality_check.sql','done'],['生成问题','按字段、表、责任人分派','done'],['责任人整改','补填、合并、修正关联','current'],['管理员复核','通过后进入质量报告','']].map(([a,b,c])=>`<div class="check ${c}"><b>${a}</b><span>${b}</span></div>`).join('')}</div>`)}</div></div>${panel('规则示例', `<div class="rule-grid"><code>项目编号不能为空且不能重复<br>GROUP BY project_code HAVING COUNT(*) &gt; 1</code><code>成果必须绑定项目或填写独立来源<br>project_id IS NULL AND independent_reason = ''</code><code>经费余额公式校验<br>balance_amount = received_amount − used_amount</code></div>`)}`;
}

function asset() {
  const rows = [['d_project','项目信息表','申报表、历史项目台账','申报、审核、结题、统计','科研/教研管理岗','实时','编号唯一、负责人存在、状态合法'],['d_person','人员信息表','人事信息、学生名单、专家库','负责人、成员、专家身份识别','学院办公室','月度','人员编号唯一、状态可用'],['d_org','组织机构表','学院组织架构','部门统计、权限控制','学院办公室','学期','组织编码统一、层级不循环'],['d_achievement','成果信息表','成果登记表、证明附件','成果归集、验收、评优','成果管理岗','实时','必须绑定项目或说明独立来源'],['d_fund','经费信息表','经费台账、报销记录','预算执行、年度统计','经费管理岗','月度','金额非负、余额公式正确'],['d_process','流程节点表','审核流转记录','进度查看、逾期提醒','业务审核岗','实时','节点状态合法、时间逻辑一致'],['d_attachment','附件材料表','申报书、合同、评审表','材料归档、历史追溯','材料审核岗','实时','附件类型合规、版本清楚'],['d_review','评审记录表','专家评分、审核意见','评审留痕、结论复核','评审组织岗','实时','评分 0–100、退回必须有意见'],['d_stat_indicator','统计指标表','主题库与报表口径','年度报告、项目画像','统计分析岗','季度','指标口径明确、来源可追溯']];
  return `<div class="filters">${pill('数据域','项目 / 成果 / 经费')}${pill('来源','申报表 / 台账 / 系统导出')}${pill('责任部门','全部')}${pill('更新频率','月度 / 实时')}</div>${panel('数据资产目录', table(['表名','中文名','来源','用途','责任部门','更新','质量规则'],rows), '业务、技术、管理三视角合并展示') }<div class="triple"><div class="text-card"><h3>业务视角</h3><p>说明数据支撑哪些业务场景，如项目申报、成果登记、经费统计、评审归档和年度总结。</p></div><div class="text-card"><h3>技术视角</h3><p>说明表名、字段名、主键、外键、数据类型、来源系统和更新频率。</p></div><div class="text-card"><h3>管理视角</h3><p>说明责任部门、数据责任人、质量规则、复核周期和异常处理要求。</p></div></div>`;
}

function dataMap() {
  return `<div class="filters">${pill('中心字段','d_project.project_id')}${pill('分析范围','九类核心数据域')}${pill('影响报表','年度总结 / 考核评优')}${pill('关系深度','2 层')}</div>${panel('数据地图', `<div class="map-canvas"><div class="node org" style="left:5%;top:10%"><b>组织 d_org</b><span>学院、系部、平台</span><em>组织域</em></div><div class="node review" style="left:24%;top:18%"><b>评审 d_review</b><span>专家、评分、意见</span><em>负责人/评审人</em></div><div class="node person" style="left:5%;bottom:10%"><b>人员 d_person</b><span>教师、学生、专家</span><em>人员域</em></div><div class="node stat" style="left:24%;bottom:2%"><b>统计 d_stat_indicator</b><span>项目数、成果数、经费使用率</span><em>统计分析域</em></div><div class="node core"><b>项目 d_project</b><span>项目编号主键<br>project_id / project_code</span><em>核心主数据</em></div><div class="node achievement"><b>成果 d_achievement</b><span>论文、专利、教改成果</span><em>成果域</em></div><div class="node fund"><b>经费 d_fund</b><span>预算、到账、使用、余额</span><em>经费域</em></div><div class="node process"><b>流程 d_process</b><span>申报、初审、中期、结题</span><em>流程域</em></div><div class="node attachment"><b>附件 d_attachment</b><span>申报书、合同、证明</span><em>附件域</em></div><i class="connector c1"></i><i class="connector c2"></i><i class="connector c3"></i><i class="connector c4"></i><i class="connector c5"></i><i class="connector c6"></i></div>`)}<div class="split even">${panel('字段血缘路径', `<div class="mini-grid"><div><b>来源</b><span>申报表项目编号、历史项目台账</span></div><div><b>主题库</b><span>d_project.project_id / project_code</span></div><div><b>下游表</b><span>d_achievement、d_fund、d_process、d_attachment、d_review</span></div><div><b>应用</b><span>项目全景视图、质量问题台账、统计报表</span></div></div>`)}${panel('影响报表', bars([['年度项目清单', 88],['成果归属统计', 84,'teal'],['经费使用率', 73,'muted'],['结题验收清单', 64,'teal'],['评优分析表', 57]]))}</div>`;
}

function report() {
  return `<div class="filters">${pill('年度','2022–2026')}${pill('部门','国际商学院')}${pill('项目类型','科研 / 教研 / 横向')}${pill('成果类型','论文 / 专利 / 奖项')}</div><div class="metrics four">${metric('年度项目数','128','科研 55 / 教研 35')}${metric('结题率','81.6%','应结题 49 / 已结题 40','green')}${metric('成果转化率','42.3%','成果绑定项目 264 条')}${metric('导出报表','12','年度总结、复盘、评优')}</div><div class="split two-three"><div>${panel('按年度统计项目与成果', `<div class="year-bars">${[['2022',41],['2023',63],['2024',86],['2025',99],['2026',128],['预测',118]].map(([year,v],i)=>`<div><i class="${i%2?'teal':''}" style="height:${v/1.4}px"></i><b>${v}</b><span>${year}</span></div>`).join('')}</div>`, '年度总结与项目复盘')}</div><div>${panel('成果类型结构', bars([['论文',100],['教改成果',40,'teal'],['研究报告',32,'muted'],['专利',15,'teal'],['奖项',27]]))}</div></div><div class="split even">${panel('部门分布', bars([['国际贸易系',72],['工商管理系',58,'teal'],['数字经济教研室',45,'muted'],['学院办公室',31,'teal']]))}${panel('导出表预览', table(['年度','部门','项目类型','项目数','成果数','经费使用率','结题率'],[['2026','国际贸易系','科研项目','45','118','72.5%','83.0%'],['2026','数字经济教研室','教研项目','28','64','61.8%','78.2%'],['2026','工商管理系','横向项目','20','46','69.1%','80.4%'],['2026','学院办公室','学生项目','18','34','54.6%','74.1%']]))}</div>`;
}

const content = { home, project, achievement, quality, asset, map: dataMap, report };

function asideFor(page) {
  const copy = {
    home: ['首页辅助信息', ['今日重点|待审核项目 17 项，其中 6 项缺少附件；质量问题 29 条，关联断裂占比最高。','九类数据域覆盖|项目、成果、人员、组织、经费、流程、附件、评审、统计分析均可从首页进入明细。','治理提醒|建议优先处理 d_achievement.project_id 为空且未填写 independent_reason 的成果记录。']],
    project: ['字段与血缘', ['主数据字段|project_code：KY–2026–018；project_id：PRJ–2026–018；leader_person_id：P–T–014。','关联范围|引用成果 4 条、经费记录 3 条、流程节点 7 个、附件 9 份、评审记录 2 条。','质量规则|项目编号唯一；结束日期不得早于开始日期；项目负责人必须存在于 d_person。']],
    achievement: ['成果治理规则', ['绑定要求|成果必须绑定项目；如确为独立成果，必须填写 independent_reason。','作者维护|first_author_id 必须存在于 d_person；共同作者可维护贡献顺序与所属组织。','附件要求|成果证明、论文首页、专利授权书或获奖证书应进入 d_attachment 并关联成果编号。']],
    quality: ['质量规则库', ['完整性|负责人、所属组织、成果日期、附件类型等关键字段不得为空。','唯一性|项目编号、成果编号、人员编号设置唯一约束，避免重复统计。','逻辑校验|经费余额 = 到账金额 − 已使用金额；结束日期不得早于开始日期。','可追溯性|关键表记录 created_at、updated_at、updated_by 和审核意见。']],
    asset: ['资产详情', ['业务含义|项目状态用于区分草稿、审核中、已立项、执行中、已结题、已归档、已终止。','技术定义|字段类型 varchar(20)，必须来自状态代码表；来源为项目审核流程。','管理责任|由学院科研/教研管理岗位维护，每周复核异常状态。']],
    map: ['血缘与影响', ['选中字段|d_project.project_id / 项目主键，是成果、经费、流程、附件、评审和统计指标共同引用的核心字段。','血缘路径|申报表项目编号 → d_project.project_id → d_achievement.project_id → 年度成果统计报表。','影响报表|项目全景视图、结题验收清单、成果归属统计、经费使用率、年度项目画像。']],
    report: ['指标口径', ['年度项目数|按 project_status 排除草稿和已终止项目，统计周期为年度。','经费使用率|used_amount / received_amount，冻结经费单独列示，不混入正常使用率。','结题率|已结题项目数 / 应结题项目数，延期结题项目在复盘表中单独标识。']],
  }[page.id];
  return `<aside class="right-rail"><header><h2>${copy[0]}</h2><p>对应报告章节与字段标准。</p></header>${copy[1].map((item) => { const [title, text] = item.split('|'); return `<div class="aside-card"><h3>${title}</h3><p>${text}</p></div>`; }).join('')}<code>核心主线：project_code → project_id → 成果 / 经费 / 流程 / 附件 / 评审</code></aside>`;
}

function render() {
  const page = resolvePage(location.hash.slice(1));
  document.title = `${page.title}｜国商科研/教研数据治理平台`;
  document.querySelector('#app').innerHTML = `<header class="topbar"><div class="brand"><span>国</span><div><h1>国商科研/教研数据治理平台</h1><p>国际商学院科研/教研项目及成果管理数据治理</p></div></div><div class="top-actions"><button>当前年度 2026</button><button>数据管理员：学院科研教研</button><button>消息 7</button></div></header><main class="layout"><aside class="sidebar"><h2>功能导航</h2>${nav(page.id)}<div class="govern"><h3>治理对象</h3><p>项目、成果、人员、组织、经费、流程、附件、评审、统计分析九类核心数据域统一纳入项目编号主线。</p></div></aside><section class="workspace"><header class="page-title"><div><h2>${page.title}</h2><p>${page.subtitle}</p></div><div class="commands"><button class="primary">${page.id === 'report' ? '导出 Excel' : '导出总览'}</button><button>${page.id === 'quality' ? '生成周报' : page.id === 'map' ? '影响分析' : '查看问题台账'}</button></div></header><div class="page-content">${content[page.id]()}${commonExplanation(page)}</div></section>${asideFor(page)}</main><footer class="statusbar"><span>数据更新时间：2026–06–16 09:30</span><span>责任部门：国际商学院科研/教研管理相关部门</span><span>附件材料：第三小组课程实训展示 UI</span></footer><div class="toast" role="status"></div>`;
  document.querySelectorAll('[data-page]').forEach((button) => button.addEventListener('click', () => { location.hash = button.dataset.page; }));
  document.querySelectorAll('.commands button, .quiet-link').forEach((button) => button.addEventListener('click', () => showToast(`${button.textContent.trim()}：前端原型已准备完成`)));
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', render);
  render();
}
