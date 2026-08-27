(function () {
  "use strict";

  var Common = window.BrandInsightCommon;

  var state = {
    view: "list",
    selectedTaskId: "task-launch",
    editingTaskId: null,
    selectedInflectionId: "bp-media-topic",
    selectedItemId: "item-negative-quality",
    resultTab: "inflection",
    singleAdvancedFilter: {
      platform: "all",
      level: "all",
      status: "all",
      account: "all"
    },
    inflectionPage: 1,
    inflectionPageSize: 4,
    inflectionFilter: {
      type: "all",
      level: "all",
      decision: "all"
    },
    singleFilter: "all",
    singleRuleTab: "negative",
    singlePage: 1,
    singlePageSize: 5,
    wizardStep: 1,
    trendGuideStep: 1,
    projectScope: "recent",
    projectPage: 1,
    projectPageSize: 5,
    projectFilter: {
      keyword: "",
      scene: "all",
      status: "all"
    },
    wizard: {
      projectId: "monitor-launch",
      project: "新车上市口碑实时跟踪任务",
      mode: "inflection",
      rules: ["volume-rhythm", "natural-amplification", "important-media-voice", "topic-shift", "viewpoint-frame", "sentiment-turn", "risk-escalation", "opportunity-amplification"],
      trend: {
        monitoringType: "campaign",
        phase: "preheat",
        sourcePolicy: "natural-priority",
        sources: ["owned", "constructed", "natural"],
        lowBaseFloor: "50 条",
        absoluteIncrease: "20 条",
        sustainWindows: "连续 2 个窗口",
        confirmation: "至少 2 类传播证据共同成立",
        highImpactPolicy: "直接确认正式预警"
      },
      compare: {
        preset: "low-volume",
        currentWindow: "24 小时",
        baselineType: "最近窗口移动平均",
        baselinePeriod: "近 7 天",
        compareWindow: "前 1 个窗口",
        alignByTime: true,
        minSample: "20 条",
        lowSampleStrategy: "合并相邻窗口"
      },
      receivers: ["赵涛", "周环牞", "周薇", "郑国"],
      pushContent: ["预警结论", "判断依据", "关键样本", "趋势数据", "建议动作"]
    },
    filter: {
      keyword: "",
      mode: "all",
      status: "all"
    }
  };

  var monitorProjects = [
    {
      id: "monitor-launch",
      name: "新车上市口碑实时跟踪任务",
      brand: "远行汽车",
      scene: "event",
      sceneLabel: "专项事件",
      status: "running",
      statusLabel: "运行中",
      platforms: ["微博", "抖音", "懂车帝", "快手"],
      dataCount: 168420,
      today: 8642,
      updated: "2026-07-24 09:28",
      favorite: true,
      recent: true,
      keywords: "上市 发布会 价格 配置 试驾"
    },
    {
      id: "monitor-reputation",
      name: "汽车品牌全网声誉监测运行任务",
      brand: "远行汽车",
      scene: "daily",
      sceneLabel: "日常声誉",
      status: "running",
      statusLabel: "运行中",
      platforms: ["微博", "小红书", "抖音", "快手"],
      dataCount: 92180,
      today: 4206,
      updated: "2026-07-24 09:16",
      favorite: true,
      recent: true,
      keywords: "品牌 声誉 口碑 用户评价"
    },
    {
      id: "monitor-complaint",
      name: "质量投诉热点挖掘与归因任务",
      brand: "远行汽车",
      scene: "risk",
      sceneLabel: "投诉风险",
      status: "running",
      statusLabel: "运行中",
      platforms: ["懂车帝", "微博", "黑猫投诉"],
      dataCount: 41760,
      today: 1386,
      updated: "2026-07-24 08:55",
      favorite: false,
      recent: true,
      keywords: "质量 投诉 维权 售后"
    },
    {
      id: "monitor-auto-show",
      name: "上海车展品牌传播追踪项目",
      brand: "远行汽车",
      scene: "event",
      sceneLabel: "专项事件",
      status: "archived",
      statusLabel: "已归档",
      platforms: ["微博", "抖音", "B站", "小红书"],
      dataCount: 242680,
      today: 0,
      updated: "2026-06-02 19:40",
      favorite: true,
      recent: false,
      keywords: "车展 展台 媒体日 发布"
    },
    {
      id: "monitor-campaign",
      name: "夏季试驾活动传播效果监测",
      brand: "远行汽车",
      scene: "campaign",
      sceneLabel: "传播活动",
      status: "running",
      statusLabel: "运行中",
      platforms: ["抖音", "小红书", "微博"],
      dataCount: 63110,
      today: 2720,
      updated: "2026-07-24 08:42",
      favorite: false,
      recent: true,
      keywords: "试驾 活动 体验 种草"
    },
    {
      id: "monitor-price",
      name: "竞品价格口碑对比监测",
      brand: "远行汽车",
      scene: "daily",
      sceneLabel: "日常声誉",
      status: "running",
      statusLabel: "运行中",
      platforms: ["懂车帝", "微博", "汽车之家"],
      dataCount: 78540,
      today: 3106,
      updated: "2026-07-24 08:20",
      favorite: false,
      recent: false,
      keywords: "竞品 价格 优惠 配置"
    },
    {
      id: "monitor-owner",
      name: "真实车主口碑证言监测",
      brand: "远行汽车",
      scene: "campaign",
      sceneLabel: "传播活动",
      status: "running",
      statusLabel: "运行中",
      platforms: ["小红书", "抖音", "微博"],
      dataCount: 35190,
      today: 970,
      updated: "2026-07-24 07:58",
      favorite: true,
      recent: false,
      keywords: "车主 体验 好评 推荐 家用"
    }
  ];

  var tasks = [
    {
      id: "task-launch",
      name: "新车上市发布会趋势预警任务",
      project: "新车上市口碑实时跟踪任务",
      mode: "inflection",
      modeLabel: "趋势预警",
      status: "running",
      statusLabel: "运行中",
      owner: "品牌公关值班组",
      latest: "2026-07-24 09:26",
      today: 12,
      unread: 6,
      highOpen: 3,
      transferred: 4,
      dingGroup: "品牌传播应急群",
      ruleSummary: "阶段基线、自然扩散、重要媒体、议题与风险组合识别",
      inflectionRuleSummary: "车展/发布会专项：按阶段基线识别声量、自然扩散、重要媒体、议题和风险变化",
      singleRuleSummary: "未启用单条信息预警",
      sourcePolicy: "自然重要发声触发拐点，主动邀约/投放只标注",
      resultStats: {
        inflection: 4,
        importantMedia: 1,
        singlePositive: 0,
        singleNegative: 0,
        pendingSingle: 0
      }
    },
    {
      id: "task-launch-single",
      name: "新车上市发布会单条信息预警任务",
      project: "新车上市口碑实时跟踪任务",
      mode: "single",
      modeLabel: "单条信息预警",
      status: "running",
      statusLabel: "运行中",
      owner: "品牌公关值班组",
      latest: "2026-07-24 09:21",
      today: 8,
      unread: 2,
      highOpen: 2,
      transferred: 4,
      dingGroup: "品牌传播应急群",
      ruleSummary: "关键词表达式、情感、风险标签、高影响账号组合命中",
      inflectionRuleSummary: "未启用趋势预警",
      singleRuleSummary: "负面风险转处置，正面机会进入素材或简报",
      sourcePolicy: "逐条内容命中，不判断传播过程趋势",
      resultStats: { inflection: 0, importantMedia: 0, singlePositive: 3, singleNegative: 4, pendingSingle: 2 }
    },
    {
      id: "task-reputation",
      name: "汽车品牌全网声誉日常预警任务",
      project: "汽车品牌全网声誉监测运行任务",
      mode: "single",
      modeLabel: "单条信息预警",
      status: "running",
      statusLabel: "运行中",
      owner: "用户运营组",
      latest: "2026-07-24 08:58",
      today: 9,
      unread: 2,
      highOpen: 1,
      transferred: 1,
      dingGroup: "市场传播日报群",
      ruleSummary: "正面机会进入素材沉淀，负面风险进入稿件处置",
      inflectionRuleSummary: "未启用传播拐点规则",
      singleRuleSummary: "日常单篇监测：负面风险转处置，正面机会入素材",
      sourcePolicy: "逐条信息命中，不判断传播过程拐点",
      resultStats: {
        inflection: 0,
        importantMedia: 0,
        singlePositive: 1,
        singleNegative: 2,
        pendingSingle: 2
      }
    },
    {
      id: "task-complaint",
      name: "质量投诉热点拐点预警任务",
      project: "质量投诉热点挖掘与归因任务",
      mode: "inflection",
      modeLabel: "趋势预警",
      status: "paused",
      statusLabel: "已暂停",
      owner: "舆情研判组",
      latest: "2026-07-23 21:14",
      today: 4,
      unread: 0,
      highOpen: 0,
      transferred: 2,
      dingGroup: "公关策略研判群",
      ruleSummary: "投诉议题聚类、负面情绪反转、平台迁移监控",
      inflectionRuleSummary: "稳健复盘：投诉议题聚类、情绪结构、平台迁移、风险升级",
      singleRuleSummary: "未启用单篇正负面即时规则",
      sourcePolicy: "按投诉样本聚类，不进入单篇处置流",
      resultStats: {
        inflection: 2,
        importantMedia: 0,
        singlePositive: 0,
        singleNegative: 0,
        pendingSingle: 0
      }
    },
    {
      id: "task-owner-draft",
      name: "真实车主口碑机会预警草稿",
      project: "真实车主口碑证言监测",
      mode: "single",
      modeLabel: "单条信息预警",
      status: "draft",
      statusLabel: "草稿",
      owner: "市场传播组",
      latest: "尚未启动",
      today: 0,
      unread: 0,
      highOpen: 0,
      transferred: 0,
      dingGroup: "市场传播日报群",
      ruleSummary: "强正面车主证言、高互动内容、负面服务反馈",
      inflectionRuleSummary: "未启用传播拐点规则",
      singleRuleSummary: "车主身份、使用场景、情感强度、互动价值组合命中",
      sourcePolicy: "草稿尚未开始采集与推送",
      resultStats: { inflection: 0, importantMedia: 0, singlePositive: 0, singleNegative: 0, pendingSingle: 0 }
    },
    {
      id: "task-auto-show-completed",
      name: "上海车展传播复盘预警任务",
      project: "上海车展品牌传播追踪项目",
      mode: "inflection",
      modeLabel: "趋势预警",
      status: "completed",
      statusLabel: "已完成",
      owner: "品牌策略组",
      latest: "2026-06-02 19:40",
      today: 0,
      unread: 0,
      highOpen: 0,
      transferred: 8,
      dingGroup: "品牌传播应急群",
      ruleSummary: "车展阶段基线、自然媒体、议题与风险趋势复盘",
      inflectionRuleSummary: "车展专项：媒体自然发声、议题转向、平台迁移、机会放大",
      singleRuleSummary: "未启用单条信息预警",
      sourcePolicy: "任务周期结束，历史预警结果保留，可编辑后重新激活",
      resultStats: { inflection: 16, importantMedia: 5, singlePositive: 0, singleNegative: 0, pendingSingle: 0 }
    }
  ];

  var inflections = [
    {
      id: "bp-media-topic",
      taskId: "task-launch",
      title: "讨论焦点从“上市亮点”转向“价格质疑”",
      type: "议题转向拐点",
      level: "high",
      levelLabel: "高",
      time: "2026-07-24 09:18",
      conclusion: "近 30 分钟内，垂直汽车媒体与自然用户讨论焦点由产品亮点转向价格和配置对比，说明传播主议题发生转向。",
      evidence: [
        { label: "声量增长", value: "+240%" },
        { label: "媒体样本", value: "12 条" },
        { label: "自然用户", value: "1,860 条" },
        { label: "负面变化", value: "18%→42%" },
        { label: "核心平台", value: "微博/懂车帝" },
        { label: "相似观点", value: "76 条" }
      ],
      topics: ["价格不匹配", "配置缩水", "竞品对比劣势", "发布会承诺落差"],
      samples: [
        { source: "懂车帝认证媒体", text: "新车价格区间高于预期，用户讨论焦点开始从外观转向配置性价比。" },
        { source: "微博汽车 KOL", text: "如果把同价位竞品放进来对比，这次发布会给出的配置解释还不够清楚。" },
        { source: "自然用户评论", text: "发布会看完感觉亮点有，但价格和配置需要再等等真实车主反馈。" }
      ],
      path: ["09:02 懂车帝媒体首发观点", "09:08 微博 KOL 二次解读", "09:15 用户评论区集中讨论", "09:22 抖音短视频评论区出现相似表达"],
      phases: [
        { title: "拐点前", text: "讨论集中在外观、发布会流程和上市权益，负面占比保持在 18% 左右。" },
        { title: "拐点发生", text: "媒体和 KOL 同步转向价格与配置对比，观点密度快速上升。" },
        { title: "拐点后", text: "自然用户开始复述同类表达，议题从专业媒体扩散到泛用户讨论。" }
      ],
      impact: "该拐点已从媒体评价扩散到用户讨论，若 2 小时内继续增长，可能影响上市首日口碑判断。",
      advice: ["同步钉钉给品牌负责人", "准备价格/配置口径说明", "持续观察竞品对比讨论", "将代表样本加入传播日报"],
      points: [18, 22, 24, 30, 38, 51, 88, 126, 156, 148, 171, 196]
    },
    {
      id: "bp-important-media-natural",
      taskId: "task-launch",
      title: "央媒与行业权威媒体自然发声确认安全卖点",
      type: "重要媒体自然发声拐点",
      level: "high",
      levelLabel: "高",
      time: "2026-07-24 09:26",
      conclusion: "近 30 分钟内，媒体矩阵库识别到央媒/党媒与行业权威媒体出现非邀约、非投放的自然发声，核心表达从产品报道转向安全与合规背书，传播含义明显升级。",
      evidence: [
        { label: "自然重要发声", value: "4 个" },
        { label: "主动构建排除", value: "7 条" },
        { label: "央媒/党媒", value: "2 个" },
        { label: "行业权威媒体", value: "2 个" },
        { label: "传播权重变化", value: "+46%" },
        { label: "二次引用", value: "63 条" }
      ],
      topics: ["安全技术背书", "合规表达", "权威媒体自然报道", "行业媒体二次解读"],
      samples: [
        { source: "央媒账号 · 自然发声", text: "报道聚焦新车安全技术和智能驾驶合规边界，未命中邀约名单与投放计划。" },
        { source: "行业权威媒体 · 自然发声", text: "文章从技术路线角度解释安全冗余，对用户信任建立有正向推动。" },
        { source: "品牌邀约媒体 · 主动构建标注", text: "该批内容命中邀约名单，仅作为传播铺排效果展示，不计入自然拐点触发。" }
      ],
      path: ["09:04 央媒账号自然发布安全技术报道", "09:12 行业权威媒体二次解读合规边界", "09:19 垂直媒体开始引用权威表达", "09:26 自然重要发声权重较基线上升 46%"],
      phases: [
        { title: "拐点前", text: "传播以发布会信息、配置卖点和价格讨论为主，权威媒体自然发声较少。" },
        { title: "拐点发生", text: "央媒/党媒与行业权威媒体自然发声出现，且未命中邀约、投放和通稿链路。" },
        { title: "拐点后", text: "行业媒体与用户开始引用权威表达，安全与合规成为新的正向解释框架。" }
      ],
      impact: "该拐点说明传播从产品信息扩散进入权威背书阶段，适合推送领导判断是否加大正向传播资源。",
      advice: ["钉钉推送品牌负责人和公关负责人", "标注自然发声与主动构建样本", "将权威表达加入传播日报", "联动媒体矩阵复盘自然发声来源"],
      points: [12, 14, 16, 19, 22, 28, 44, 66, 82, 118, 146, 151]
    },
    {
      id: "bp-kol-spread",
      taskId: "task-launch",
      title: "真实试驾评价形成正面机会放大",
      type: "机会放大拐点",
      level: "medium",
      levelLabel: "中",
      time: "2026-07-24 08:42",
      conclusion: "头部试驾内容发布后，腰部账号和自然用户开始复述“续航稳定、智驾成熟”等卖点，正面内容从单点好评进入可扩散状态。",
      evidence: [
        { label: "声量增长", value: "+136%" },
        { label: "KOL 样本", value: "18 条" },
        { label: "正面变化", value: "54%→71%" },
        { label: "高频卖点", value: "续航/智驾" },
        { label: "二次传播", value: "42 条" },
        { label: "核心平台", value: "抖音/微博" }
      ],
      topics: ["真实续航表现", "智能驾驶稳定", "座舱体验升级"],
      samples: [
        { source: "抖音头部汽车 KOL", text: "这次试驾最明显的感知是智驾稳定性提升，城市路段表现比上一代更从容。" },
        { source: "微博腰部达人", text: "很多人关心续航，今天几个试驾反馈都提到了电耗表现比较稳。" }
      ],
      path: ["08:16 KOL 发布试驾短视频", "08:25 腰部达人转述续航卖点", "08:35 用户评论区集中询问试驾预约", "08:44 品牌卖点词云出现明显聚集"],
      phases: [
        { title: "拐点前", text: "内容以发布会信息复述为主，用户互动相对分散。" },
        { title: "拐点发生", text: "头部 KOL 体验内容带出具体卖点，腰部达人开始转述。" },
        { title: "拐点后", text: "自然用户围绕续航和智驾提出购买意向问题。" }
      ],
      impact: "该拐点偏正面，可作为品牌传播机会进入素材库或日报。",
      advice: ["加入正面传播素材", "钉钉推送市场传播团队", "引导官方账号二次扩散"],
      points: [14, 18, 21, 22, 29, 37, 63, 80, 91, 110, 116, 118]
    },
    {
      id: "bp-platform-migration",
      taskId: "task-launch",
      title: "价格讨论从微博迁移到短视频评论区",
      type: "平台迁移拐点",
      level: "medium",
      levelLabel: "中",
      time: "2026-07-24 07:55",
      conclusion: "微博上的价格讨论被短视频账号引用后，在抖音评论区出现同类表达，说明议题正在从社交平台迁移到短视频评论场域。",
      evidence: [
        { label: "迁移平台", value: "微博→抖音" },
        { label: "相似评论", value: "284 条" },
        { label: "视频样本", value: "9 条" },
        { label: "负面变化", value: "+16%" },
        { label: "扩散时长", value: "42 分钟" },
        { label: "触发规则", value: "平台迁移拐点" }
      ],
      topics: ["价格偏高", "竞品更香", "等待优惠"],
      samples: [
        { source: "抖音汽车解读账号", text: "上市权益看起来不少，但评论区最关心的还是最终落地价。" },
        { source: "微博用户", text: "这个价格如果没有终端优惠，很容易被竞品卡住。" }
      ],
      path: ["07:10 微博出现价格质疑", "07:34 短视频账号引用微博观点", "07:48 抖音评论区出现相似句式", "07:55 系统识别平台迁移拐点"],
      phases: [
        { title: "拐点前", text: "价格讨论主要集中在微博汽车圈层。" },
        { title: "拐点发生", text: "短视频账号引用并二次解读微博观点。" },
        { title: "拐点后", text: "评论区开始出现大量简短负面表达。" }
      ],
      impact: "平台迁移刚开始，建议观察是否进入更泛化人群。",
      advice: ["监控短视频评论高频表达", "同步内容运营准备问答口径"],
      points: [9, 11, 14, 18, 21, 28, 36, 55, 69, 84, 90, 98]
    },
    {
      id: "bp-complaint-risk",
      taskId: "task-complaint",
      title: "质量投诉议题从零散反馈聚合为集中维权表达",
      type: "风险升级拐点",
      level: "high",
      levelLabel: "高",
      time: "2026-07-23 21:14",
      conclusion: "投诉样本在 1 小时内从分散售后反馈转为质量问题集中表达，相似投诉和维权词同时上升，已构成投诉风险拐点。",
      evidence: [
        { label: "投诉样本", value: "74 条" },
        { label: "相似聚类", value: "3 组" },
        { label: "负面占比", value: "38%→67%" },
        { label: "高频标签", value: "质量/售后" },
        { label: "维权表达", value: "+41%" },
        { label: "核心平台", value: "懂车帝/黑猫" }
      ],
      topics: ["质量反馈集中", "售后响应慢", "维权诉求明确"],
      samples: [
        { source: "黑猫投诉用户", text: "同一个问题反复维修没有解决，希望厂家给出明确处理方案。" },
        { source: "懂车帝车主圈", text: "最近看到不少类似反馈，不知道是不是同一批次问题。" }
      ],
      path: ["20:26 黑猫出现首批投诉", "20:48 懂车帝车主圈出现相似反馈", "21:02 维权表达集中出现", "21:14 系统识别风险升级拐点"],
      phases: [
        { title: "拐点前", text: "样本多为个人售后体验反馈，未形成明确聚集。" },
        { title: "拐点发生", text: "相似投诉集中出现，质量和售后标签同时上升。" },
        { title: "拐点后", text: "用户开始复述同类问题，维权表达增加。" }
      ],
      impact: "该拐点可能进入处置业务链路，需要尽快确认事实、批次和售后响应口径。",
      advice: ["同步舆情研判组", "联动售后核查样本事实", "准备投诉处置 FAQ"],
      points: [8, 9, 11, 12, 16, 22, 31, 48, 73, 91, 98, 104]
    },
    {
      id: "bp-complaint-platform",
      taskId: "task-complaint",
      title: "投诉讨论从垂直社区迁移到公开投诉平台",
      type: "平台迁移拐点",
      level: "medium",
      levelLabel: "中",
      time: "2026-07-23 18:36",
      conclusion: "原本集中在车主社区的质量讨论开始迁移至公开投诉平台，说明议题从内部交流进入公开维权场域。",
      evidence: [
        { label: "迁移平台", value: "车主圈→黑猫" },
        { label: "公开投诉", value: "26 条" },
        { label: "相似内容", value: "58 条" },
        { label: "迁移时长", value: "1.5 小时" },
        { label: "负面变化", value: "+22%" },
        { label: "触发规则", value: "平台迁移" }
      ],
      topics: ["公开投诉", "售后响应", "车主圈扩散"],
      samples: [
        { source: "车主社区", text: "大家有没有遇到同样的问题？准备一起找厂家确认。" },
        { source: "公开投诉平台", text: "车辆问题迟迟没有解决，要求厂家给出明确处理方案。" }
      ],
      path: ["17:04 车主圈出现集中讨论", "17:42 用户建议转公开投诉", "18:18 黑猫出现相似投诉", "18:36 系统识别平台迁移拐点"],
      phases: [
        { title: "拐点前", text: "讨论主要在车主社区内部发酵。" },
        { title: "拐点发生", text: "用户开始把同类问题迁移到公开投诉平台。" },
        { title: "拐点后", text: "公开投诉样本增加，议题可见度明显提升。" }
      ],
      impact: "平台迁移会提高公开可见度，建议与处置业务做好承接。",
      advice: ["持续监控公开投诉平台", "建立样本去重和事实核查清单"],
      points: [5, 7, 8, 10, 14, 16, 28, 34, 52, 64, 66, 70]
    }
  ];

  var singleAlerts = [
    {
      id: "item-negative-quality",
      taskId: "task-launch",
      type: "negative",
      typeLabel: "负面预警",
      level: "high",
      levelLabel: "高",
      platform: "微博",
      author: "汽车观察员林某",
      accountType: "认证 KOL",
      time: "2026-07-24 09:21",
      summary: "质疑新车配置与发布会表述不一致，评论区出现多条“配置缩水”表达。",
      content: "发布会说得很满，但细看配置表还是有落差，尤其是辅助驾驶和舒适配置，用户说配置缩水不是没有原因。",
      rules: ["强负面情绪", "媒体/KOL负面发布", "高互动负面内容"],
      sentiment: "强负面",
      interactions: 8460,
      status: "未处理",
      suggestion: "建议转入稿件处置，先确认配置表事实，再准备评论区答复口径。",
      related: ["近 2 小时内出现 76 条相似表达", "关联传播拐点：媒体集中发声推动“价格质疑”议题发酵"]
    },
    {
      id: "item-positive-kol",
      taskId: "task-launch",
      type: "positive",
      typeLabel: "正面预警",
      level: "medium",
      levelLabel: "中",
      platform: "抖音",
      author: "试驾研究所",
      accountType: "头部 KOL",
      time: "2026-07-24 08:39",
      summary: "试驾视频高度认可智驾稳定性与续航表现，评论区出现购买意向。",
      content: "今天试了这台新车，智驾稳定性比上一代明显成熟，续航也不是纸面参数，城市快速路这一段表现挺有说服力。",
      rules: ["强正面评价", "媒体/KOL正向推荐", "高互动正面内容"],
      sentiment: "强正面",
      interactions: 12890,
      status: "已加入简报",
      suggestion: "建议加入传播素材库，推送市场传播团队做二次扩散。",
      related: ["关联传播拐点：头部 KOL 正向体验内容引发二次传播", "近 1 小时内同类正面卖点内容 42 条"]
    },
    {
      id: "item-negative-service",
      taskId: "task-launch",
      type: "negative",
      typeLabel: "负面预警",
      level: "medium",
      levelLabel: "中",
      platform: "懂车帝",
      author: "普通用户",
      accountType: "自然用户",
      time: "2026-07-24 08:12",
      summary: "用户质疑预售权益解释不清，评论区跟帖集中询问订金规则。",
      content: "权益看着很多，但订金、置换和金融方案到底能不能叠加没说清楚，销售也解释不一致。",
      rules: ["负面情绪", "权益争议标签"],
      sentiment: "负面",
      interactions: 920,
      status: "已转处置",
      suggestion: "建议联动销售运营确认权益规则，更新 FAQ 口径。",
      related: ["近 24 小时出现 31 条权益规则疑问", "已转稿件处置：CL-20260724-031"]
    },
    {
      id: "item-positive-user",
      taskId: "task-launch",
      type: "positive",
      typeLabel: "正面预警",
      level: "low",
      levelLabel: "低",
      platform: "小红书",
      author: "真实车主小周",
      accountType: "自然用户",
      time: "2026-07-24 07:48",
      summary: "用户以真实体验方式认可座舱舒适度，适合沉淀为用户证言。",
      content: "这台车座舱最打动我的是细节，孩子坐后排不晕车，语音也能听懂老人说话。",
      rules: ["高价值用户证言", "强正面评价"],
      sentiment: "正面",
      interactions: 586,
      status: "未处理",
      suggestion: "建议加入正面素材候选，后续可用于口碑报告。",
      related: ["同类座舱体验正面内容 18 条", "可关联车型卖点：家庭舒适座舱"]
    },
    {
      id: "item-reputation-negative-service",
      taskId: "task-reputation",
      type: "negative",
      typeLabel: "负面预警",
      level: "medium",
      levelLabel: "中",
      platform: "微博",
      author: "售后体验记录",
      accountType: "普通用户",
      time: "2026-07-24 08:58",
      summary: "用户集中吐槽售后等待时间长，命中服务体验负面规则。",
      content: "预约保养等了很久，客服回复也比较慢，希望品牌能把售后体验跟上。",
      rules: ["负面情绪", "服务风险标签", "关键词表达式命中"],
      sentiment: "负面",
      interactions: 814,
      status: "未处理",
      suggestion: "建议转给用户运营与售后团队确认服务节点，并沉淀统一回复口径。",
      related: ["近 24 小时出现 19 条服务等待相关表达", "可联动处置业务新建稿件处置"]
    },
    {
      id: "item-reputation-positive-owner",
      taskId: "task-reputation",
      type: "positive",
      typeLabel: "正面预警",
      level: "low",
      levelLabel: "低",
      platform: "小红书",
      author: "城市通勤车主",
      accountType: "真实车主",
      time: "2026-07-24 08:31",
      summary: "真实车主认可日常通勤能耗，命中正面用户证言规则。",
      content: "最近一周上下班通勤能耗很稳定，车机路线规划也比之前顺手不少。",
      rules: ["正面情绪", "用户证言", "卖点标签命中"],
      sentiment: "正面",
      interactions: 452,
      status: "已加入素材",
      suggestion: "建议沉淀为日常口碑素材，可用于声誉日报正面样本。",
      related: ["同类通勤能耗正面内容 11 条", "已加入传播素材候选"]
    },
    {
      id: "item-reputation-negative-price",
      taskId: "task-reputation",
      type: "negative",
      typeLabel: "负面预警",
      level: "high",
      levelLabel: "高",
      platform: "懂车帝",
      author: "准车主问价",
      accountType: "潜客",
      time: "2026-07-24 07:56",
      summary: "潜客质疑终端优惠不清晰，命中价格权益负面规则。",
      content: "不同门店给的优惠说法不一样，感觉价格权益不够透明，准备再看看竞品。",
      rules: ["负面情绪", "价格/权益风险标签", "潜客身份命中"],
      sentiment: "负面",
      interactions: 1260,
      status: "未处理",
      suggestion: "建议联动销售运营确认价格权益口径，避免潜客流失。",
      related: ["近 12 小时出现 8 条潜客价格疑问", "可转销售运营处置"]
    }
  ];

  var inflectionHistory = [
    {
      taskId: "task-launch",
      time: "2026-07-23 18:42",
      type: "情绪结构拐点",
      title: "上市权益解释后负面情绪阶段性回落",
      desc: "官方账号补充权益说明后，价格质疑相关负面占比从 39% 回落到 24%。",
      state: "已归档"
    },
    {
      taskId: "task-launch",
      time: "2026-07-23 15:18",
      type: "圈层扩散拐点",
      title: "试驾体验内容带动自然用户讨论上升",
      desc: "多位真实用户围绕智驾和座舱体验发布正面反馈，自然声量较上一周期增长 112%。",
      state: "已加入简报"
    },
    {
      taskId: "task-launch",
      time: "2026-07-22 20:36",
      type: "平台迁移拐点",
      title: "价格讨论由微博迁移到懂车帝评论区",
      desc: "微博价格讨论被懂车帝用户复述，形成 2 小时内 160 条相似表达。",
      state: "已研判"
    }
  ];

  var singleAlertHistory = [
    {
      id: "item-history-negative-rights",
      taskId: "task-launch",
      type: "negative",
      typeLabel: "负面预警",
      level: "medium",
      levelLabel: "中",
      platform: "懂车帝",
      author: "准车主阿梁",
      accountType: "自然用户",
      time: "2026-07-23 19:06",
      summary: "用户质疑权益叠加规则不清晰，询问订金、置换和金融方案能否同时使用。",
      content: "发布页写了好几种权益，但订金、置换和金融方案到底能不能叠加没看懂，问销售也说法不一样。",
      rules: ["负面情绪", "价格/权益风险标签"],
      sentiment: "负面",
      interactions: 1368,
      status: "已转处置",
      suggestion: "建议联动销售运营确认权益规则，并补充 FAQ 口径。",
      related: ["已转稿件处置：CL-20260723-087", "同类权益疑问近 24 小时出现 31 条"]
    },
    {
      id: "item-history-positive-family",
      taskId: "task-launch",
      type: "positive",
      typeLabel: "正面预警",
      level: "low",
      levelLabel: "低",
      platform: "小红书",
      author: "周末带娃出行",
      accountType: "真实车主",
      time: "2026-07-23 16:44",
      summary: "真实车主分享家庭出行座舱体验，认可后排舒适度和语音交互。",
      content: "周末带孩子跑了一趟郊区，后排空间和座椅舒适度确实友好，老人用语音开空调也能识别。",
      rules: ["高价值用户证言", "品牌卖点命中"],
      sentiment: "正面",
      interactions: 742,
      status: "已加入素材",
      suggestion: "建议沉淀为家庭场景口碑素材，可加入周报。",
      related: ["已加入传播素材库", "关联卖点：家庭舒适座舱"]
    },
    {
      id: "item-history-negative-competitor",
      taskId: "task-launch",
      type: "negative",
      typeLabel: "负面预警",
      level: "medium",
      levelLabel: "中",
      platform: "微博",
      author: "车圈价格观察",
      accountType: "认证 KOL",
      time: "2026-07-22 21:10",
      summary: "KOL 对竞品价格优势进行对比评论，带出“同价位竞品更香”表达。",
      content: "如果只看价格和核心配置，同价位竞品确实给得更直接，新车需要把权益和配置讲得更明白。",
      rules: ["高影响来源负面发布", "相似负面内容聚集"],
      sentiment: "负面",
      interactions: 3520,
      status: "已完成",
      suggestion: "已完成研判，可作为价格沟通口径参考。",
      related: ["历史同类价格对比内容 58 条", "研判结论：需强化权益解释"]
    }
  ];

  var inflectionRules = [
    {
      id: "volume-rhythm",
      title: "声量节奏拐点",
      desc: "识别声量突然上升、下降、停滞或二次抬升，判断传播热度是否进入新阶段。",
      selected: true,
      config: [
        { label: "识别方向", type: "select", options: ["上升/下降/二次抬升", "仅上升", "仅下降", "停滞后再升"] },
        { label: "变化阈值", type: "number", value: 160, unit: "%", recommended: 160, min: 20, max: 500, step: 10 },
        { label: "最小新增量", type: "number", value: 20, unit: "条", recommended: 20, min: 5, max: 500, step: 5 }
      ]
    },
    {
      id: "actor-structure",
      title: "传播主体结构拐点",
      desc: "识别媒体、KOL、自然用户、官方、竞品、第三方机构等发声结构变化。",
      selected: true,
      config: [
        { label: "关注结构", type: "select", options: ["媒体/KOL/自然用户", "官方介入", "第三方机构", "竞品关联"] },
        { label: "结构变化阈值", type: "number", value: 20, unit: "%", recommended: 20, min: 5, max: 80, step: 5 }
      ]
    },
    {
      id: "natural-amplification",
      title: "自然扩散接力拐点",
      desc: "识别自有稿件、邀约或投放之后，外部媒体、KOL、用户是否开始自然接力，让声量从可预期动作变成真实扩散。",
      selected: true,
      config: [
        { label: "观测口径", type: "select", options: ["自然声量与自然占比", "自然声量与接力率", "仅自然声量"] },
        { label: "自然占比提升", type: "number", value: 15, unit: "个百分点", recommended: 15, min: 5, max: 80, step: 5 },
        { label: "自然新增量", type: "number", value: 20, unit: "条", recommended: 20, min: 5, max: 500, step: 5 }
      ]
    },
    {
      id: "important-media-voice",
      title: "重要媒体自然发声拐点",
      desc: "识别央媒党媒、行业权威媒体、地方重点媒体和头部KOL的自然发声是否改变传播含义；主动邀约发声只做标注，不作为自然拐点。",
      selected: true,
      config: [
        { label: "媒体层级", type: "select", options: ["央媒/党媒", "行业权威媒体", "地方重点媒体", "财经/科技媒体", "头部KOL"] },
        { label: "发声来源", type: "select", options: ["仅自然发声触发", "自然发声优先，主动构建只标注", "主动/自然都展示但分层"] },
        { label: "新增发声数", type: "number", value: 3, unit: "个", recommended: 3, min: 1, max: 50, step: 1 },
        { label: "传播权重变化", type: "number", value: 30, unit: "%", recommended: 30, min: 5, max: 100, step: 5 }
      ]
    },
    {
      id: "topic-shift",
      title: "议题转向拐点",
      desc: "识别讨论焦点从一个议题转向另一个议题，例如从产品亮点转向价格质疑。",
      selected: true,
      config: [
        { label: "议题变化", type: "select", options: ["新主议题出现", "风险议题上升", "机会议题上升"] },
        { label: "主议题占比", type: "number", value: 25, unit: "%", recommended: 25, min: 5, max: 80, step: 5 }
      ]
    },
    {
      id: "viewpoint-frame",
      title: "观点框架拐点",
      desc: "识别新的论点、解释框架、统一话术或可被复述的表达开始成型。",
      selected: true,
      config: [
        { label: "观点形态", type: "select", options: ["新观点首次出现", "观点被大量复述", "话术统一化"] },
        { label: "相似内容", type: "number", value: 30, unit: "条", recommended: 30, min: 5, max: 500, step: 5 }
      ]
    },
    {
      id: "sentiment-turn",
      title: "情绪结构拐点",
      desc: "发现正负面比例突然变化，例如正面活动传播转为价格质疑，或负面议题被正面体验冲淡。",
      selected: false,
      config: [
        { label: "情绪方向", type: "select", options: ["负面上升", "正面上升", "正负反转"] },
        { label: "变化阈值", type: "number", value: 20, unit: "%", recommended: 20, min: 5, max: 80, step: 5 }
      ]
    },
    {
      id: "platform-migration",
      title: "平台迁移拐点",
      desc: "发现议题从微博、懂车帝等平台迁移到抖音、小红书评论区等新场域。",
      selected: false,
      config: [
        { label: "扩散平台数", type: "select", options: ["2 个及以上", "3 个及以上", "4 个及以上"] },
        { label: "迁移窗口", type: "select", options: ["30 分钟内", "1 小时内", "2 小时内", "6 小时内"] }
      ]
    },
    {
      id: "circle-spread",
      title: "圈层扩散拐点",
      desc: "识别讨论从垂直汽车圈、车主圈、潜客圈扩散到大众消费圈或地域圈层。",
      selected: false,
      config: [
        { label: "扩散方向", type: "select", options: ["垂直到大众", "车主到潜客", "地域到全国"] },
        { label: "圈层占比变化", type: "number", value: 20, unit: "%", recommended: 20, min: 5, max: 80, step: 5 }
      ]
    },
    {
      id: "format-mutation",
      title: "内容形态拐点",
      desc: "识别图文、评论、截图、短视频、二创、梗图等内容形态变化带来的传播加速。",
      selected: false,
      config: [
        { label: "内容形态", type: "select", options: ["短视频化", "截图搬运", "二创/梗化", "长文测评"] },
        { label: "样本阈值", type: "number", value: 15, unit: "条", recommended: 15, min: 5, max: 200, step: 5 }
      ]
    },
    {
      id: "risk-escalation",
      title: "风险升级拐点",
      desc: "识别普通讨论升级为投诉、维权、事故、安全、监管、品牌信任等需要业务响应的风险。",
      selected: true,
      config: [
        { label: "风险方向", type: "select", options: ["质量/安全", "价格/权益", "售后/服务", "品牌信任"] },
        { label: "风险内容数", type: "number", value: 20, unit: "条", recommended: 20, min: 5, max: 500, step: 5 },
        { label: "高影响账号数", type: "number", value: 5, unit: "个", recommended: 5, min: 1, max: 100, step: 1 }
      ]
    },
    {
      id: "opportunity-amplification",
      title: "机会放大拐点",
      desc: "识别正面内容从单点好评变成可传播机会，例如用户证言、卖点复述、购买意向增长。",
      selected: false,
      config: [
        { label: "机会方向", type: "select", options: ["用户证言", "卖点复述", "KOL推荐", "购买意向"] },
        { label: "互动阈值", type: "number", value: 1000, unit: "次", recommended: 1000, min: 100, max: 100000, step: 100 },
        { label: "复述数量", type: "number", value: 20, unit: "条", recommended: 20, min: 5, max: 500, step: 5 }
      ]
    }
  ];

  var trendRuleProfileMap = {
    "volume-rhythm": { main: "总声量偏离短期趋势和同阶段基线", verify: "低基数绝对新增、连续窗口、自然声量是否同步", upgrade: "出现重要主体、议题或风险变化时提升等级" },
    "natural-amplification": { main: "自然声量、自然占比或自然接力率上升", verify: "排除自有稿件、邀约和投放链路", upgrade: "自然媒体/KOL/用户同时增加时确认外部扩散" },
    "actor-structure": { main: "媒体、KOL、自然用户、官方等主体占比变化", verify: "变化是否连续并由自然主体贡献", upgrade: "高影响主体进入后提升为决策型拐点" },
    "important-media-voice": { main: "重要媒体或关键 KOL 首次自然发声", verify: "未命中邀约、投放、通稿及协同名单", upgrade: "权威层级、原创内容、二次引用共同决定等级" },
    "topic-shift": { main: "新议题占比上升或主议题排名变化", verify: "新议题在连续窗口增长并达到最小样本", upgrade: "关联风险标签、价格/权益等业务主题时提升等级" },
    "viewpoint-frame": { main: "新的核心论点首次出现或被持续复述", verify: "相似表达聚类数量与复述速度", upgrade: "被媒体/KOL引用或跨平台复述时确认" },
    "sentiment-turn": { main: "正负面比例或情绪指数发生方向变化", verify: "排除少量高互动内容造成的偶发波动", upgrade: "与风险议题、主体结构变化同时出现时提升等级" },
    "platform-migration": { main: "同一议题进入新的传播平台", verify: "源平台与目标平台的时间差和目标增长", upgrade: "从垂直平台进入大众平台时提升等级" },
    "circle-spread": { main: "议题从垂直圈层扩散至新圈层", verify: "账号画像、平台和内容语义共同确认圈层", upgrade: "从车主/汽车圈进入潜客/大众圈时提升等级" },
    "format-mutation": { main: "截图搬运、短视频二创、梗化等内容形态突变", verify: "新形态样本数与增长率同时满足", upgrade: "新形态带来更快互动或跨平台转载时提升等级" },
    "risk-escalation": { main: "普通讨论升级为投诉、维权、安全或信任风险", verify: "风险内容数、风险标签与高影响账号共同判断", upgrade: "公开投诉、权威媒体或多平台出现时直接提高等级" },
    "opportunity-amplification": { main: "正面卖点、证言或购买意向从单点内容形成扩散", verify: "自然复述、互动价值和主体质量", upgrade: "权威媒体/KOL自然推荐或多平台复述时提升等级" }
  };

  var singleRules = [
    {
      group: "negative",
      title: "负面预警判断逻辑",
      desc: "用于发现一篇具体内容是否构成风险，并流转到后续稿件处置。",
      rules: [
        {
          id: "negative-strong",
          title: "强负面情绪",
          desc: "AI 情感判断为负面或强负面，并出现质疑、投诉、维权、失望等表达。",
          selected: true,
          config: [
            { label: "情绪阈值", type: "select", options: ["负面及以上", "强负面"] },
            { label: "命中方式", type: "select", options: ["AI+关键词同时命中", "任一命中"] }
          ]
        },
        {
          id: "negative-risk-tag",
          title: "风险标签命中",
          desc: "内容涉及质量、安全、价格、售后、事故、权益不清等品牌风险标签。",
          selected: true,
          config: [
            { label: "风险标签", type: "select", options: ["质量/安全/维权", "价格/权益", "售后/服务"] },
            { label: "标签数量", type: "number", value: 1, unit: "个", recommended: 1, min: 1, max: 10, step: 1 }
          ]
        },
        {
          id: "negative-influence",
          title: "高影响来源负面发布",
          desc: "媒体、认证账号、KOL 或核心社区用户发布负面内容，优先级自动上调。",
          selected: false,
          config: [
            { label: "账号类型", type: "select", options: ["媒体/KOL/认证账号", "仅媒体", "仅 KOL"] },
            { label: "粉丝阈值", type: "number", value: 5, unit: "万", recommended: 5, min: 1, max: 500, step: 1 }
          ]
        },
        {
          id: "negative-cluster",
          title: "相似负面内容聚集",
          desc: "同类负面表达短时间多次出现，说明风险不是孤立单篇。",
          selected: false,
          config: [
            { label: "聚集窗口", type: "select", options: ["30 分钟", "1 小时", "3 小时"] },
            { label: "相似数量", type: "number", value: 20, unit: "条", recommended: 20, min: 1, max: 500, step: 1 }
          ]
        }
      ]
    },
    {
      group: "positive",
      title: "正面预警判断逻辑",
      desc: "用于发现一篇具体内容是否具备传播价值，进入素材库、简报或二次扩散。",
      rules: [
        {
          id: "positive-strong",
          title: "强正面评价",
          desc: "内容明确表达认可、推荐、惊喜、购买意愿或对品牌卖点的正向反馈。",
          selected: true,
          config: [
            { label: "情绪阈值", type: "select", options: ["正面及以上", "强正面"] },
            { label: "表达强度", type: "select", options: ["明确认可", "强推荐", "购买意向"] }
          ]
        },
        {
          id: "positive-testimony",
          title: "高价值用户证言",
          desc: "真实用户用具体场景表达产品价值，适合进入口碑素材或报告。",
          selected: true,
          config: [
            { label: "场景标签", type: "select", options: ["家庭/通勤/长途", "智驾/续航", "座舱/舒适"] },
            { label: "内容长度", type: "number", value: 30, unit: "字", recommended: 30, min: 5, max: 500, step: 5 }
          ]
        },
        {
          id: "positive-influence",
          title: "媒体/KOL 正向推荐",
          desc: "高影响力账号发布正面体验、专业测评或明确推荐。",
          selected: false,
          config: [
            { label: "账号类型", type: "select", options: ["媒体/KOL/认证账号", "仅媒体", "仅 KOL"] },
            { label: "互动阈值", type: "number", value: 1000, unit: "次", recommended: 1000, min: 0, max: 100000, step: 100 }
          ]
        },
        {
          id: "positive-sellpoint",
          title: "品牌卖点命中",
          desc: "内容命中续航、智驾、安全、座舱、服务等品牌核心传播卖点。",
          selected: false,
          config: [
            { label: "卖点标签", type: "select", options: ["续航/智驾", "安全/品质", "座舱/舒适"] },
            { label: "素材价值", type: "select", options: ["可加入简报", "可二次扩散", "仅沉淀"] }
          ]
        }
      ]
    }
  ];

  var singleRuleBuilders = {
    negative: {
      title: "负面信息精准命中规则",
      desc: "用于更精准地找到需要进入稿件处置或风险研判的单条信息。",
      preview: {
        count: "预计今日命中 18 条",
        risk: "误伤风险：中",
        sample: "样本：KOL质疑配置缩水，命中“配置缩水 AND 价格偏高”，情感=强负面，账号类型=认证KOL。"
      },
      sections: [
        {
          title: "关键词表达式",
          fields: [
            { label: "包含表达式", type: "expression", value: "(配置缩水 OR 价格偏高 OR 权益不清) AND 新车", help: "表达式命中 = 正文分词/短语匹配满足 AND/OR/NOT 逻辑；支持括号优先级。" },
            { label: "排除表达式", type: "expression", value: "玩笑 OR 反讽段子 OR 官方说明", help: "排除命中 = 内容命中排除词后不触发，降低误伤。" },
            { label: "AI相似表达扩展", type: "select", options: ["开启，严格扩展", "开启，宽松扩展", "关闭"], help: "AI会把同义表达、近义说法、口语化表达归入同一命中集合，例如“配置缩水≈减配”。" }
          ]
        },
        {
          title: "情感与标签",
          fields: [
            { label: "情感条件", type: "select", options: ["负面及以上", "强负面", "负面或中性质疑"], help: "情感命中 = sentiment 属于所选范围且 confidence 达到系统推荐置信度。" },
            { label: "情绪置信度", type: "number", value: 80, unit: "%", recommended: 80, min: 50, max: 100, step: 5, help: "置信度阈值 = 情感模型 confidence；低于阈值时不触发或降低等级。" },
            { label: "风险标签", type: "chips", values: ["质量", "安全", "事故", "维权", "投诉", "售后", "价格", "权益", "服务", "品牌信任"], selected: ["质量", "安全", "维权", "价格", "权益"], help: "标签命中 = content_tags 与所选风险标签有交集；可由词表和AI共同识别。" }
          ]
        },
        {
          title: "实体、来源和内容",
          fields: [
            { label: "实体条件", type: "chips", values: ["品牌", "车型", "竞品", "高管", "经销商", "活动名称", "地域"], selected: ["品牌", "车型", "竞品"], help: "实体命中 = NER识别到所选实体类型，且实体与监测项目相关。" },
            { label: "来源条件", type: "chips", values: ["媒体", "KOL", "认证账号", "普通用户", "车主", "潜客", "黑名单账号"], selected: ["媒体", "KOL", "认证账号", "黑名单账号"], help: "来源命中 = account_type 或账号库标签属于所选范围。" },
            { label: "内容类型", type: "chips", values: ["原创", "转发", "评论", "视频", "图文", "截图", "长文", "测评", "投诉帖"], selected: ["原创", "评论", "视频", "投诉帖"], help: "内容类型由平台字段和AI识别共同判断，用于区分投诉帖、评论扩散、视频搬运等场景。" }
          ]
        },
        {
          title: "互动传播与触发逻辑",
          fields: [
            { label: "互动量阈值", type: "number", value: 500, unit: "次", recommended: 500, min: 0, max: 100000, step: 100, help: "互动量 = 点赞 + 评论 + 转发 + 收藏；达到阈值提升预警等级。" },
            { label: "相似聚集数量", type: "number", value: 20, unit: "条", recommended: 20, min: 1, max: 500, step: 1, help: "相似聚集 = 同 cluster_id 或同 viewpoint_id 的内容数量，达到阈值说明不是孤立信息。" },
            { label: "命中逻辑", type: "select", options: ["核心条件 + 任一辅助条件", "满足全部条件", "满足任一条件", "高危条件直接预警"], help: "核心条件通常是关键词/情感/标签；辅助条件为来源、互动、内容类型、实体等。" }
          ]
        }
      ]
    },
    positive: {
      title: "正面信息精准命中规则",
      desc: "用于发现可进入素材库、简报或二次扩散的单条正面机会。",
      preview: {
        count: "预计今日命中 12 条",
        risk: "误伤风险：低",
        sample: "样本：真实车主认可智驾和续航，命中“用户证言 + 卖点复述 + 强正面”。"
      },
      sections: [
        {
          title: "关键词表达式",
          fields: [
            { label: "包含表达式", type: "expression", value: "(推荐 OR 好开 OR 智驾稳定 OR 续航扎实 OR 值得买)", help: "表达式命中 = 正文满足正面词、卖点词或购买意向词组合。" },
            { label: "排除表达式", type: "expression", value: "反讽 OR 广告嫌疑 OR 抽奖转发", help: "排除低价值或疑似营销噪声内容，减少素材误入。" },
            { label: "AI相似表达扩展", type: "select", options: ["开启，严格扩展", "开启，宽松扩展", "关闭"], help: "AI扩展用户口语表达，例如“续航很顶≈续航扎实”“智驾放心≈智驾稳定”。" }
          ]
        },
        {
          title: "情感与机会标签",
          fields: [
            { label: "情感条件", type: "select", options: ["正面及以上", "强正面", "正面或购买意向"], help: "情感命中 = sentiment 属于所选范围且 confidence 达到系统推荐置信度。" },
            { label: "情绪置信度", type: "number", value: 75, unit: "%", recommended: 75, min: 50, max: 100, step: 5, help: "置信度阈值越高，命中更准但数量更少。" },
            { label: "机会标签", type: "chips", values: ["好评", "推荐", "购买意向", "用户证言", "试驾认可", "卖点复述", "媒体背书", "KOL推荐"], selected: ["推荐", "购买意向", "用户证言", "卖点复述"], help: "机会标签由词表和AI识别，用于判断内容能否沉淀或放大。" }
          ]
        },
        {
          title: "实体、来源和内容",
          fields: [
            { label: "实体条件", type: "chips", values: ["品牌", "车型", "竞品", "活动名称", "地域", "核心卖点"], selected: ["品牌", "车型", "核心卖点"], help: "实体命中 = 内容明确关联品牌、车型或核心卖点，避免泛泛好评。" },
            { label: "来源条件", type: "chips", values: ["媒体", "KOL", "认证账号", "普通用户", "真实车主", "潜客"], selected: ["媒体", "KOL", "真实车主"], help: "真实车主和高影响账号会提升素材价值评分。" },
            { label: "内容类型", type: "chips", values: ["原创", "评论", "视频", "图文", "长文", "测评", "用户笔记"], selected: ["原创", "视频", "测评", "用户笔记"], help: "不同内容类型进入不同后续动作：视频适合扩散，长文适合报告，评论适合口碑证据。" }
          ]
        },
        {
          title: "互动传播与触发逻辑",
          fields: [
            { label: "互动量阈值", type: "number", value: 1000, unit: "次", recommended: 1000, min: 0, max: 100000, step: 100, help: "互动量达到阈值，说明正面内容已有传播潜力。" },
            { label: "卖点复述数量", type: "number", value: 20, unit: "条", recommended: 20, min: 1, max: 500, step: 1, help: "同一卖点被多条内容复述，说明正面机会从单点好评变为可传播主题。" },
            { label: "命中逻辑", type: "select", options: ["关键词 + 情感 + 任一机会条件", "满足全部条件", "满足任一条件", "高价值来源直接预警"], help: "用于控制命中精度：越严格越少误报，越宽松越容易发现机会。" }
          ]
        }
      ]
    }
  };

  var recipients = [
    { id: "p-zhaotao", name: "赵涛", selected: true },
    { id: "p-zhouhuan", name: "周环牞", selected: true },
    { id: "p-zhouwei", name: "周薇", selected: true },
    { id: "p-zhengguo", name: "郑国", selected: true },
    { id: "p-fengyanyan", name: "冯毅艳", selected: false },
    { id: "p-hexuan", name: "何咬", selected: false },
    { id: "p-fengyan", name: "冯丽妍", selected: false },
    { id: "p-chen", name: "陈总", selected: false },
    { id: "p-wang", name: "王经理", selected: false },
    { id: "p-duty", name: "品牌公关值班人", selected: false }
  ];

  var compareFormulaMap = {
    currentWindow: "当前窗口 Vt：按所选窗口聚合舆情条数、互动量、议题占比、情绪占比等指标。所有拐点都先在这个窗口内计算。",
    compareWindow: "前置窗口 Vt-1：用前 1 个窗口或前 N 个窗口均值作为短期对比。前后变化 = (Vt - Vt-1) / max(Vt-1, 1)。",
    baselineType: "历史基线 B：历史同时间段基线 = 最近 N 天同星期/同小时均值；移动平均 = 最近 N 个窗口均值；活动前基线 = 任务启动前稳定期均值。",
    baselinePeriod: "基线周期 N：参与计算 B 的历史天数。周期越长越稳定，周期越短越敏感。变化率 = (Vt - B) / max(B, 1)。",
    minSample: "最小样本量 S：当前窗口样本数 < S 时，拐点置信度降低或按样本不足策略处理，避免少量数据造成误报。",
    lowSampleStrategy: "样本不足处理：合并相邻窗口会扩大 Vt；降低置信度展示会保留预警但标注低置信；不触发拐点则直接过滤。",
    alignByTime: "同时间段对齐：B 只取同星期/同小时历史窗口，减少早晚高峰、周末、工作日自然波动导致的误判。"
  };

  var helpGuideMap = {
    "选择监测场景": { meaning: "决定系统是否按活动生命周期理解变化。专项活动会随预热、爆发和尾波调整判断尺度；连续监测以日常波动为参照。", example: "做成都车展选“专项活动监测”；监测品牌全年口碑、没有固定节点时选“连续监测”。" },
    "当前处于哪个传播阶段": { meaning: "决定系统对同一变化采用多敏感的判断尺度，避免预热期的小增量被误判为爆发，也避免发布当天错过快速变化。", example: "车展前一周选“预热期”；发布会当天选“发布/爆发期”；活动结束后持续讨论时选“发酵期”。" },
    "设置正式预警确认条件": { meaning: "决定候选证据何时真正推送给负责人，平衡“尽早发现”与“减少打扰”。", example: "风险敏感活动可选连续 2 个窗口和至少 2 类证据；领导日报场景可提高到连续 3 个窗口和至少 3 类证据。" },
    "设置正式预警升级条件": { meaning: "决定候选证据何时真正推送给负责人，平衡“尽早发现”与“减少打扰”。", example: "风险敏感活动可选连续 2 个窗口和至少 2 类证据；领导日报场景可提高到连续 3 个窗口和至少 3 类证据。" },
    "设置检查频次与判断时间": { meaning: "决定系统发现变化的速度和抗噪声能力，不直接决定是否告警。窗口越短，发现越快但波动更多；窗口越长，结论更稳但更晚发现。", example: "发布会直播期可选 15 或 30 分钟；车展预热期可选 24 小时；日报复盘可选 1 小时。" },
    "自定义检查与比较时间": { meaning: "用于已有明确研判方法的专业人员手动定义一次变化识别的时间口径，替代系统按传播阶段推荐的方案。", example: "车展发布当天希望每 30 分钟看一次，并与前 30 分钟和近 7 天同一时段比较，可在此自定义。" },
    "当前观察窗口": { meaning: "决定每次计算纳入多长时间的数据，是发现速度的主要控制项。", example: "选 15 分钟适合直播或争议突发；选 24 小时适合预热期低声量活动。" },
    "前置对比窗口": { meaning: "决定系统用刚刚发生的数据如何作为短期参照，识别的是“此刻是否突然变化”。", example: "选“前 1 个窗口”能最快发现突增；选“前 3 个窗口均值”能平滑一次偶发波动。" },
    "历史基线口径": { meaning: "决定什么被视为正常水平，帮助区分自然规律和真正异常。", example: "有明显周内节律时选“历史同时间段基线”；刚开始专项监测、历史不足时选“活动开始前基线”。" },
    "历史基线周期": { meaning: "决定正常水平由多少历史数据构成。周期越长越稳，周期越短越能跟上近期传播环境变化。", example: "选近 7 天适合一周内的车展专项；选近 14 或 30 天适合长期品牌监测。" },
    "最小样本量": { meaning: "防止几条内容造成倍数很高的假异常。样本门槛越高，结果更可靠，但低声量阶段越晚出现候选证据。", example: "预热期每天只有十几条信息时选 20 条；发布当天数据充足时可选 50 条。" },
    "样本不足处理": { meaning: "决定数据不够时系统是继续观察、标记低可信，还是直接不产出拐点。", example: "怕漏早期信号选“合并相邻窗口”；值班需看到线索选“降低置信度展示”；领导汇报场景选“不触发拐点”。" },
    "按同星期/同小时对齐历史基线": { meaning: "用于消除工作日、周末和早晚高峰本来就会出现的规律性波动。", example: "每周末汽车内容自然更活跃时开启；没有明显时间规律的突发舆情可关闭以获得更灵敏响应。" },
    "低声量信号如何处理": { meaning: "规定低基数阶段的量化变化是否只能作为观察线索，避免 5 条变 15 条这类倍数变化直接打扰业务。", example: "车展刚立项、每日不足 20 条时设为 50 条；发布当天本身量大时可设为 100 条。" },
    "候选信号要持续多久": { meaning: "用于过滤只在一个窗口内出现的短时波动。持续时间越长，推送越稳，但响应越慢。", example: "抢突发风险可选连续 2 个窗口；日常品牌监测或日报场景可选连续 3 个窗口。" },
    "需要几类传播证据共同成立": { meaning: "要求不同维度相互印证，避免只凭声量、情绪或单个平台的单一变化做决策。", example: "选择至少 2 类，可要求“声量加速 + 自然扩散”同时出现；选择至少 3 类，适合重大推送前增加“议题转向”或“高影响媒体发声”确认。" },
    "重要媒体自然发声如何处理": { meaning: "决定高影响媒体自然发声是否可作为高优先级例外。它与普通量化变化不同，可能直接改变传播含义和外部判断。", example: "人民网、新华网等自然发声需要业务立即研判时选“直接确认正式预警”；需先核对是否引发扩散时选“仍需与其他信号组合”。" },
    "包含表达式": { meaning: "决定哪些文本进入单条信息命中范围，是精确识别的第一道门。", example: "风险预警可填“(配置缩水 OR 价格偏高) AND 新车”；正面机会可填“(推荐 OR 值得买) AND 车型名”。" },
    "排除表达式": { meaning: "排除虽包含关键词、但不需要预警的语境，直接降低误报和无效处置。", example: "把“反讽”“抽奖转发”“官方说明”排除，可避免玩笑、营销转发和官方回应反复触发。" },
    "AI相似表达扩展": { meaning: "决定是否把用户的同义、口语和变体表达一起纳入命中，扩大召回但也可能带来更多需要复核的内容。", example: "想严控处置误报选“严格扩展”；专项摸排新话术时选“宽松扩展”；已有完整词表时可关闭。" },
    "情感条件": { meaning: "决定单条内容需要达到何种情绪方向才参与命中，控制风险和机会的业务边界。", example: "紧急风险处置选“强负面”；想提前发现质疑苗头选“负面或中性质疑”；沉淀强背书素材选“强正面”。" },
    "情绪置信度": { meaning: "决定情感模型结果达到多高可信度才使用。阈值越高，命中更准但可能漏掉表达隐晦的内容。", example: "自动流转处置可选 80% 以上；人工审核队列可放宽到 70%，以便尽早发现线索。" },
    "风险标签": { meaning: "将单条预警聚焦到业务真正需要处置的风险类型，便于后续按质量、安全、维权等流程分派。", example: "新车上市重点勾选“质量、价格、权益”；售后事件重点勾选“投诉、服务、维权”。" },
    "机会标签": { meaning: "将正面单条内容聚焦到可沉淀、可扩散或可进入简报的机会类型。", example: "做种草内容筛选时勾选“用户证言、卖点复述”；做转化机会时勾选“推荐、购买意向”。" },
    "实体条件": { meaning: "确保命中内容和当前品牌、车型、活动或卖点确实相关，避免泛泛讨论进入预警。", example: "车展专项勾选“品牌、车型、活动名称”；产品卖点传播可额外勾选“核心卖点”。" },
    "来源条件": { meaning: "决定哪些发声主体值得进入单条预警，不同来源对应不同处置优先级和传播价值。", example: "风险处置优先勾选“媒体、KOL、认证账号”；口碑研究可增加“真实车主、潜客”。" },
    "内容类型": { meaning: "按内容形态区分后续动作和噪声来源，避免无价值转发与高价值原创混在一起。", example: "要找可扩散素材勾选“原创、视频、测评”；要找投诉风险勾选“投诉帖、评论”。" },
    "互动量阈值": { meaning: "用互动规模衡量单条内容是否已经具备扩散影响，帮助区分普通表达与需要优先处理或放大的内容。", example: "负面风险可设 500 次优先介入；正面内容准备二次扩散时可设 1000 次。" },
    "相似聚集数量": { meaning: "判断一条负面是否已变成多人重复表达的共性问题，而非孤立个案。", example: "选择 20 条，表示同一质疑在窗口内至少被 20 条相似内容重复后才升级。" },
    "卖点复述数量": { meaning: "判断正面卖点是否从单点好评变为可传播的话题，帮助挑选值得放大的内容方向。", example: "选择 20 条，表示同一卖点被至少 20 条相似内容复述后，进入扩散或简报候选。" },
    "命中逻辑": { meaning: "决定单条内容的多个条件采用“都满足”还是“满足部分即可”，是控制精度与召回量的总开关。", example: "自动进入处置选“满足全部条件”；人工研判池可选“核心条件 + 任一辅助条件”；明确高危词可选“高危条件直接预警”。" }
  };

  var comparePresets = [
    {
      id: "low-volume",
      title: "低声量预热",
      tag: "预热期推荐",
      desc: "适合活动早期每天只有少量信息的阶段。按天观察，避免小数字的倍数增长被直接判成重大拐点。",
      explain: "每天汇总一次，和前一天及近 7 天正常水平比较；样本少时先记录观察信号，等待自然接力或连续增长确认。",
      compare: {
        currentWindow: "24 小时",
        compareWindow: "前 1 个窗口",
        baselineType: "最近窗口移动平均",
        baselinePeriod: "近 7 天",
        minSample: "20 条",
        lowSampleStrategy: "合并相邻窗口",
        alignByTime: true
      }
    },
    {
      id: "balanced",
      title: "事件专项推荐",
      tag: "推荐",
      desc: "适合发布会、车展、上市活动。系统每 30 分钟判断一次是否出现传播节点。",
      explain: "看现在 30 分钟是否明显不同于刚才 30 分钟，同时再和近 7 天同时间段正常水平比较。",
      compare: {
        currentWindow: "30 分钟",
        compareWindow: "前 1 个窗口",
        baselineType: "历史同时间段基线",
        baselinePeriod: "近 7 天",
        minSample: "30 条",
        lowSampleStrategy: "合并相邻窗口",
        alignByTime: true
      }
    },
    {
      id: "sensitive",
      title: "高敏感值班",
      tag: "更快发现",
      desc: "适合舆情值班、直播发布、争议发酵期。更快发现异常，但提示会更多。",
      explain: "每 15 分钟滚动观察，只要当前窗口相对刚才或短期移动均值明显变化就提醒。",
      compare: {
        currentWindow: "15 分钟",
        compareWindow: "前 2 个窗口均值",
        baselineType: "最近窗口移动平均",
        baselinePeriod: "近 3 天",
        minSample: "20 条",
        lowSampleStrategy: "降低置信度展示",
        alignByTime: false
      }
    },
    {
      id: "stable",
      title: "稳健复盘汇报",
      tag: "更少误报",
      desc: "适合领导汇报、日报复盘和非实时活动。强调确认过的拐点，减少噪声。",
      explain: "每 1 小时聚合一次，和近 14 天同时间段水平比较，样本不足时不触发拐点。",
      compare: {
        currentWindow: "1 小时",
        compareWindow: "前 3 个窗口均值",
        baselineType: "历史同时间段基线",
        baselinePeriod: "近 14 天",
        minSample: "50 条",
        lowSampleStrategy: "不触发拐点",
        alignByTime: true
      }
    },
    {
      id: "custom",
      title: "自定义检查与比较时间",
      tag: "专业配置",
      desc: "自行设置时间窗口、前后对比和历史基线。适合已有明确研判方法的专业人员。",
      explain: "选择后展开全部对比参数，由用户决定系统如何观察和比较数据。"
    }
  ];

  var trendGoalGroups = [
    {
      id: "momentum",
      title: "传播有没有突然加速",
      short: "传播升温",
      question: "声量为什么上升，外部是否开始自然接力，是否有重要媒体加入？",
      result: "输出声量节奏、自然扩散和重要媒体发声拐点。",
      help: "适合车展、发布会、上市等专项活动。系统会区分自有、主动构建和自然发声，避免把集中发稿误判为自然爆发。",
      rules: ["volume-rhythm", "natural-amplification", "important-media-voice"]
    },
    {
      id: "direction",
      title: "大家讨论的方向变了吗",
      short: "方向变化",
      question: "是否出现新议题、新论点，或正负面情绪发生反转？",
      result: "输出议题、观点框架和情绪结构拐点。",
      help: "用于解释声量变化背后的内容原因，例如讨论从产品亮点转向价格质疑，或一个新观点开始被大量复述。",
      rules: ["topic-shift", "viewpoint-frame", "sentiment-turn"]
    },
    {
      id: "spread",
      title: "声音扩散到新的人群了吗",
      short: "扩散范围",
      question: "推动主体、传播平台、讨论圈层或内容形态是否发生变化？",
      result: "输出主体结构、平台迁移、圈层扩散和内容形态拐点。",
      help: "适合活动爆发和发酵阶段，用来发现声音从汽车垂直圈扩散到大众平台、从图文演变为短视频或二创。",
      rules: ["actor-structure", "platform-migration", "circle-spread", "format-mutation"]
    },
    {
      id: "action",
      title: "是否需要业务立即行动",
      short: "风险与机会",
      question: "是否出现需要介入处置的风险，或值得主动放大的正面机会？",
      result: "输出风险升级和机会放大拐点，并给出建议动作。",
      help: "风险拐点用于决定是否介入处置；机会拐点用于决定是否主动引导、扩散或沉淀为传播素材。",
      rules: ["risk-escalation", "opportunity-amplification"]
    }
  ];

  var inflectionExplainMap = {
    "volume-rhythm": {
      method: "规则计算声量窗口变化，识别上升、下降、停滞后再升等传播节奏变化。",
      formula: "R = (Vt - B) / max(B, 1)；D = (Vt - Vt-1) / max(Vt-1, 1)。R 或 D 超过阈值即触发。",
      recommend: "标准推荐：30分钟窗口，变化阈值 160%。"
    },
    "actor-structure": {
      method: "对每条舆情识别发声主体，比较媒体、KOL、自然用户、官方、机构等占比变化。",
      formula: "主体占比 P = 某主体内容数 / 总内容数；结构变化 S = sum(abs(Pt - Pt-1))。",
      recommend: "标准推荐：主体占比变化 20%，媒体/KOL/自然用户结构共同观察。"
    },
    "important-media-voice": {
      method: "先用媒体矩阵库识别账号层级，再排除主动邀约、投放、通稿和官方协同发声，剩余自然发声才判断为拐点。",
      formula: "重要发声权重 W = sum(媒体层级权重 * 原创系数 * 自然发声系数)；权重变化 = (Wt - B) / max(B, 1)。",
      recommend: "标准推荐：新增自然重要发声 3 个，或传播权重较基线上升 30%。"
    },
    "topic-shift": {
      method: "对内容做议题聚类，比较主议题排名、占比和新增议题增长。",
      formula: "议题占比 Ptopic = 某议题内容数 / 总内容数；新议题增长 = (Ct - Btopic) / max(Btopic, 1)。",
      recommend: "标准推荐：新主议题占比 25%，进入 Top3 后触发。"
    },
    "viewpoint-frame": {
      method: "抽取观点和话术，将相似表达归并为观点簇，识别新论点成型。",
      formula: "观点复述量 C = 同 viewpoint_id 内容数；复述率 = C / Vt；扩散速度 = Ct / max(Ct-1, 1)。",
      recommend: "标准推荐：相似观点 30 条，观点复述率明显上升。"
    },
    "sentiment-turn": {
      method: "统计正负中情绪结构，识别负面上升、正面上升或正负反转。",
      formula: "负面变化 = Pneg_t - Pneg_t-1；情绪指数 E = (正面数 - 负面数) / 总数。",
      recommend: "标准推荐：情绪占比变化 20%。"
    },
    "platform-migration": {
      method: "按同一议题/观点统计平台分布，识别从源平台迁移到目标平台的扩散。",
      formula: "平台议题占比 = 某平台某议题声量 / 该议题总声量；迁移时间差 = 目标平台增长时间 - 源平台增长时间。",
      recommend: "标准推荐：2小时内新增 2 个及以上平台。"
    },
    "circle-spread": {
      method: "根据账号画像、平台和内容语义识别圈层，比较圈层占比变化。",
      formula: "圈层占比 Pcircle = 某圈层内容数 / 总内容数；圈层变化 = Pcircle_t - Pcircle_t-1。",
      recommend: "标准推荐：新增圈层占比变化 20%。"
    },
    "format-mutation": {
      method: "识别图文、短视频、截图搬运、二创、梗化等内容形态变化。",
      formula: "形态占比 = 某内容形态数 / 总内容数；形态增长率 = Ct / max(Ct-1, 1)。",
      recommend: "标准推荐：同形态样本 15 条以上且增长明显。"
    },
    "risk-escalation": {
      method: "统计风险标签、高危内容和高影响账号介入，判断普通讨论是否升级为业务风险。",
      formula: "风险占比 = 风险标签内容数 / 总内容数；高影响风险数 = 媒体/KOL/认证账号风险内容数。",
      recommend: "标准推荐：风险内容 20 条或高影响账号 5 个。"
    },
    "opportunity-amplification": {
      method: "统计正面机会内容、卖点复述和高互动正面内容，识别可放大的传播机会。",
      formula: "机会占比 = 正面机会内容数 / 总数；卖点复述量 = 同卖点内容数；互动 = 赞+评+转+藏。",
      recommend: "标准推荐：互动 1000 次或复述 20 条。"
    }
  };

  var ruleFormulaMap = {
    "volume-rhythm::识别方向": "先计算声量变化率 R = (Vt - B) / max(B, 1)，再计算前后变化 D = (Vt - Vt-1) / max(Vt-1, 1)。按选择方向判断上升、下降或二次抬升。",
    "volume-rhythm::变化阈值": "触发条件示例：R >= 阈值 或 abs(D) >= 阈值；二次抬升 = Vt >= 上一峰值 * 阈值比例。",
    "volume-rhythm::最小新增量": "最小新增量只属于“声量节奏”这一类识别标准。当前窗口新增内容数 Vt - Vt-1 >= 设置值时，才认为声量变化具有足够的绝对量；命中后先生成候选信号，仍需下一步升级条件确认是否告警。",
    "natural-amplification::观测口径": "自然声量 Vn = 未命中自有、邀约、投放和协同名单的内容数；自然占比 Pn = Vn / Vtotal；自然接力率 A = Vn / max(Vowned + Vconstructed, 1)。",
    "natural-amplification::自然占比提升": "当前自然占比与前置窗口/阶段基线相比的提升值。仅自有内容增加时该值不会上升，可避免把预期发稿误判为外部扩散。",
    "natural-amplification::自然新增量": "低基数时同时要求自然内容达到最小绝对新增量，并结合持续窗口、议题或主体变化确认，避免少量内容倍增造成误报。",
    "actor-structure::关注结构": "按舆情账号识别媒体、KOL、自然用户、官方、第三方等主体，主体占比 P = 该主体内容数 / 当前窗口总内容数。",
    "actor-structure::结构变化阈值": "结构变化 = sum(abs(Pt主体 - Pt-1主体))；单主体变化 = Pt主体 - Pt-1主体。超过阈值即触发。",
    "important-media-voice::媒体层级": "媒体矩阵库会给账号打层级：央媒/党媒、行业权威、地方重点、财经科技、头部KOL等。不同层级对应不同传播权重。",
    "important-media-voice::发声来源": "自然发声 = 未命中邀约名单、投放计划、通稿素材链路、官方协同账号；主动构建 = 命中任一主动传播来源，只标注不作为自然拐点。",
    "important-media-voice::新增发声数": "新增自然重要发声数 C = 当前窗口首次发声的重要账号数；C >= 阈值时触发或提升拐点等级。",
    "important-media-voice::传播权重变化": "传播权重 W = sum(媒体层级权重 * 原创系数 * 自然发声系数 * 互动修正)；变化 = (Wt - B) / max(B, 1)。",
    "topic-shift::议题变化": "语义聚类生成 topic_id，议题占比 Ptopic = 当前议题内容数 / 当前窗口总内容数，比较主议题排名和新议题占比。",
    "topic-shift::主议题占比": "触发条件：新议题 Ptopic >= 阈值，或当前 Top1 议题 != 前置窗口 Top1 议题，且新议题增长率 >= 推荐阈值。",
    "viewpoint-frame::观点形态": "观点抽取模型生成 viewpoint_id，相似表达归并为观点簇，判断首次出现、复述扩散或话术统一。",
    "viewpoint-frame::相似内容": "观点复述量 C = 同一 viewpoint_id 内容数；观点复述率 = C / Vt；C 超过阈值且复述率上升则触发。",
    "sentiment-turn::情绪方向": "情绪占比 Pneg/Ppos/Pneu = 各情绪内容数 / 当前窗口总内容数；情绪指数 E = (正面数 - 负面数) / 总数。",
    "sentiment-turn::变化阈值": "触发条件：Pneg_t - Pneg_t-1 >= 阈值，或 Ppos_t - Ppos_t-1 >= 阈值，或 abs(E_t - E_t-1) >= 阈值。",
    "platform-migration::扩散平台数": "按同一 topic_id/viewpoint_id 统计平台分布，新增平台数 = 当前出现该议题的平台数 - 前置窗口平台数。",
    "platform-migration::迁移窗口": "迁移时间差 = 目标平台首次明显增长时间 - 源平台首次增长时间；在所选窗口内且目标平台增长率达标则触发。",
    "circle-spread::扩散方向": "根据账号画像、平台、内容语义识别圈层，如车主、潜客、垂直汽车圈、大众消费圈、地域圈层。",
    "circle-spread::圈层占比变化": "圈层占比 Pcircle = 该圈层内容数 / 当前窗口总内容数；变化 = Pcircle_t - Pcircle_t-1。",
    "format-mutation::内容形态": "识别内容形态 content_type，如图文、视频、评论、截图搬运、二创、梗化、长文测评。",
    "format-mutation::样本阈值": "形态增长率 = 当前形态内容数 / max(前置窗口形态内容数, 1)；样本数和增长率同时达标则触发。",
    "risk-escalation::风险方向": "标签词表与语义规则识别风险标签，如质量、安全、维权、权益、售后、品牌信任，并统计高危标签内容。",
    "risk-escalation::风险内容数": "风险内容数 = 命中风险标签的舆情条数；达到阈值说明普通讨论可能升级为业务风险。",
    "risk-escalation::高影响账号数": "高影响账号数 = 媒体/KOL/认证账号中发布风险内容的账号数量；达到阈值会提升预警等级。",
    "opportunity-amplification::机会方向": "标签词表与语义规则识别正面机会标签，如用户证言、卖点复述、KOL推荐、购买意向。",
    "opportunity-amplification::互动阈值": "正面互动量 = 点赞 + 评论 + 转发 + 收藏；互动超过阈值说明该正面内容具备扩散价值。",
    "opportunity-amplification::复述数量": "复述数量 = 同一卖点或同一正面观点的相似内容数；超过阈值说明机会点正在被多人重复表达。",
    "negative-strong::情绪阈值": "情感模型输出 sentiment 与 confidence，触发条件：sentiment=负面/强负面 且 confidence >= 系统推荐值。",
    "negative-strong::命中方式": "AI+关键词同时命中 = 情绪条件 AND 关键词表达式；任一命中 = 情绪条件 OR 关键词表达式。",
    "negative-risk-tag::风险标签": "标签命中 = content_tags 与所选风险标签集合存在交集，如质量、安全、维权、价格、权益、售后。",
    "negative-risk-tag::标签数量": "触发条件：命中风险标签数量 >= 设置值；风险等级可按标签权重求和。",
    "negative-influence::账号类型": "账号类型由账号库或 AI 识别，触发条件：account_type 属于所选媒体/KOL/认证账号范围。",
    "negative-influence::粉丝阈值": "影响力过滤：粉丝数 >= 阈值 或 历史平均互动 >= 系统推荐值，命中后提升预警等级。",
    "negative-cluster::聚集窗口": "在所选窗口内按相似内容/相同观点聚类，统计同类负面内容是否集中出现。",
    "negative-cluster::相似数量": "相似负面聚集量 C = 同一 cluster_id 的负面内容数；C >= 阈值则触发。",
    "positive-strong::情绪阈值": "情感模型输出 sentiment=正面/强正面 且 confidence >= 系统推荐值。",
    "positive-strong::表达强度": "AI 识别认可、推荐、购买意向等强表达；强表达命中后提高正面机会等级。",
    "positive-testimony::场景标签": "AI 提取真实使用场景标签，如家庭、通勤、长途、智驾、续航、座舱舒适。",
    "positive-testimony::内容长度": "内容长度过滤：正文有效字数 >= 阈值，避免短句好评误判为高价值证言。",
    "positive-influence::账号类型": "正面来源过滤：account_type 属于媒体/KOL/认证账号时，判断为可扩散正面机会。",
    "positive-influence::互动阈值": "正面互动量 = 点赞 + 评论 + 转发 + 收藏；互动量 >= 阈值则触发或提升等级。",
    "positive-sellpoint::卖点标签": "AI/词表识别品牌卖点标签，如续航、智驾、安全、座舱、服务。",
    "positive-sellpoint::素材价值": "素材价值由卖点标签、情绪强度、互动量、账号影响力综合评分，进入简报/扩散/沉淀队列。"
  };

  function init() {
    bindEvents();
    renderTaskList();
    renderKpis();
    renderWizard();
    showView("list");
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      var actionTarget = event.target.closest("[data-action]");
      var createTarget = event.target.closest("[data-open-create]");
      var backListTarget = event.target.closest("[data-back-list]");
      var backResultTarget = event.target.closest("[data-back-result]");
      var resultTarget = event.target.closest("[data-view-results]");
      var wizardStepTarget = event.target.closest("[data-wizard-step]");
      var projectTarget = event.target.closest("[data-select-project]");
      var modeTarget = event.target.closest("[data-select-mode]");
      var ruleTarget = event.target.closest("[data-toggle-rule]");
      var wizardNextTarget = event.target.closest("[data-wizard-next]");
      var wizardPrevTarget = event.target.closest("[data-wizard-prev]");
      var launchTarget = event.target.closest("[data-launch-task]");
      var resultTabTarget = event.target.closest("[data-result-tab]");
      var singleFilterTarget = event.target.closest("[data-single-filter]");
      var inflectionTarget = event.target.closest("[data-open-inflection]");
      var itemTarget = event.target.closest("[data-open-item]");
      var projectScopeTarget = event.target.closest("[data-project-scope]");
      var projectSelectTarget = event.target.closest("[data-select-project-id]");
      var receiverCloseTarget = event.target.closest("[data-recipient-close]");
      var removeReceiverTarget = event.target.closest("[data-remove-receiver]");
      var recommendTarget = event.target.closest("[data-use-recommend]");
      var singleRuleTabTarget = event.target.closest("[data-single-rule-tab]");
      var conditionChipTarget = event.target.closest("[data-condition-chip]");
      var comparePresetTarget = event.target.closest("[data-compare-preset]");
      var trendPhaseTarget = event.target.closest("[data-trend-phase]");
      var trendMonitoringTarget = event.target.closest("[data-trend-monitoring]");
      var trendSourceTarget = event.target.closest("[data-trend-source]");
      var trendPolicyTarget = event.target.closest("[data-trend-policy]");
      var trendGuideStepTarget = event.target.closest("[data-trend-guide-step]");
      var trendGuideNextTarget = event.target.closest("[data-trend-guide-next]");
      var trendGuidePrevTarget = event.target.closest("[data-trend-guide-prev]");
      var trendGuideCompleteTarget = event.target.closest("[data-trend-guide-complete]");
      var trendGoalTarget = event.target.closest("[data-trend-goal]");
      var editRuleTarget = event.target.closest("[data-edit-rule]");
      var editCurrentRuleTarget = event.target.closest("[data-edit-current-rule]");
      var taskLifecycleTarget = event.target.closest("[data-task-lifecycle]");
      var taskStatusTabTarget = event.target.closest("[data-task-status-tab]");
      var inflectionDecisionTarget = event.target.closest("[data-inflection-decision]");

      if (createTarget) {
        resetWizard();
        showView("create");
      }

      if (backListTarget) {
        state.editingTaskId = null;
        showView("list");
      }

      if (editRuleTarget) {
        openTaskEditor(editRuleTarget.getAttribute("data-edit-rule"));
      }

      if (editCurrentRuleTarget) {
        openTaskEditor(getCurrentTask().id);
      }

      if (taskLifecycleTarget) {
        updateTaskLifecycle(
          taskLifecycleTarget.getAttribute("data-task-lifecycle"),
          taskLifecycleTarget.getAttribute("data-task-id")
        );
      }

      if (taskStatusTabTarget) {
        state.filter.status = taskStatusTabTarget.getAttribute("data-task-status-tab");
        renderTaskList();
      }

      if (backResultTarget) {
        showView("result");
      }

      if (resultTarget) {
        state.selectedTaskId = resultTarget.getAttribute("data-view-results");
        state.resultTab = getDefaultResultTab(getCurrentTask());
        state.singlePage = 1;
        state.inflectionPage = 1;
        showView("result");
      }

      if (wizardStepTarget) {
        state.wizardStep = Number(wizardStepTarget.getAttribute("data-wizard-step"));
        renderWizard();
      }

      if (projectTarget) {
        state.wizard.project = projectTarget.getAttribute("data-select-project");
        renderWizard();
      }

      if (projectScopeTarget) {
        state.projectScope = projectScopeTarget.getAttribute("data-project-scope");
        state.projectPage = 1;
        renderProjectPicker();
      }

      if (projectSelectTarget) {
        selectProject(projectSelectTarget.getAttribute("data-select-project-id"));
      }

      if (comparePresetTarget) {
        applyComparePreset(comparePresetTarget.getAttribute("data-compare-preset"));
      }

      if (trendPhaseTarget) {
        state.wizard.trend.phase = trendPhaseTarget.getAttribute("data-trend-phase");
        applyRecommendedPresetForCurrentStage();
        renderRuleWorkspace();
        Common.showToast("传播阶段已更新，判断尺度已同步为：" + getCurrentComparePreset().title);
      }

      if (trendMonitoringTarget) {
        state.wizard.trend.monitoringType = trendMonitoringTarget.getAttribute("data-trend-monitoring");
        applyRecommendedPresetForCurrentStage();
        renderRuleWorkspace();
        Common.showToast("监测场景已更新，判断尺度已同步为：" + getCurrentComparePreset().title);
      }

      if (trendSourceTarget) {
        toggleTrendSource(trendSourceTarget.getAttribute("data-trend-source"));
        renderRuleWorkspace();
      }

      if (trendPolicyTarget) {
        state.wizard.trend.sourcePolicy = trendPolicyTarget.getAttribute("data-trend-policy");
        renderRuleWorkspace();
      }

      if (trendGuideStepTarget) {
        state.trendGuideStep = Number(trendGuideStepTarget.getAttribute("data-trend-guide-step"));
        renderRuleWorkspace();
      }

      if (trendGuideNextTarget) {
        state.trendGuideStep = Math.min(Number(trendGuideNextTarget.getAttribute("data-trend-guide-next")), 4);
        renderRuleWorkspace();
      }

      if (trendGuidePrevTarget) {
        state.trendGuideStep = Math.max(Number(trendGuidePrevTarget.getAttribute("data-trend-guide-prev")), 1);
        renderRuleWorkspace();
      }

      if (trendGuideCompleteTarget) {
        state.wizardStep = 4;
        renderWizard();
      }

      if (trendGoalTarget && !event.target.closest(".alert-help")) {
        toggleTrendGoal(trendGoalTarget.getAttribute("data-trend-goal"));
        renderRuleWorkspace();
      }

      if (modeTarget) {
        state.wizard.mode = modeTarget.getAttribute("data-select-mode");
        state.trendGuideStep = 1;
        applyModeDefaultRules();
        renderWizard();
      }

      if (ruleTarget) {
        toggleRule(ruleTarget.getAttribute("data-toggle-rule"));
        renderWizard();
      }

      if (wizardNextTarget) {
        state.wizardStep = Math.min(state.wizardStep + 1, 5);
        renderWizard();
      }

      if (wizardPrevTarget) {
        state.wizardStep = Math.max(state.wizardStep - 1, 1);
        renderWizard();
      }

      if (launchTarget) {
        launchTask();
      }

      if (resultTabTarget) {
        state.resultTab = resultTabTarget.getAttribute("data-result-tab");
        state.inflectionPage = 1;
        renderResultView();
      }

      if (singleFilterTarget) {
        state.singleFilter = singleFilterTarget.getAttribute("data-single-filter");
        state.singlePage = 1;
        renderSingleAlerts();
      }

      if (inflectionTarget) {
        state.selectedInflectionId = inflectionTarget.getAttribute("data-open-inflection");
        showView("breakpoint");
      }

      if (itemTarget) {
        state.selectedItemId = itemTarget.getAttribute("data-open-item");
        showView("item");
      }

      if (inflectionDecisionTarget) {
        updateInflectionDecision(
          inflectionDecisionTarget.getAttribute("data-inflection-decision"),
          inflectionDecisionTarget.getAttribute("data-inflection-id")
        );
      }

      if (receiverCloseTarget) {
        closeRecipientModal();
      }

      if (removeReceiverTarget) {
        removeReceiver(removeReceiverTarget.getAttribute("data-remove-receiver"));
      }

      if (recommendTarget) {
        var control = recommendTarget.closest(".alert-number-control");
        var input = control ? control.querySelector("input") : null;
        var recommendValue = recommendTarget.getAttribute("data-recommend-value");

        if (input && recommendValue) {
          input.value = recommendValue;
        }

        Common.showToast("已套用系统推荐值：" + recommendTarget.getAttribute("data-use-recommend"));
      }

      if (singleRuleTabTarget) {
        state.singleRuleTab = singleRuleTabTarget.getAttribute("data-single-rule-tab");
        renderRuleWorkspace();
      }

      if (conditionChipTarget) {
        conditionChipTarget.classList.toggle("is-active");
      }

      if (actionTarget) {
        handleAction(actionTarget.getAttribute("data-action"));
      }
    });

    document.addEventListener("change", function (event) {
      var recipientInput = event.target.closest("[data-recipient-id]");
      var pushContentInput = event.target.closest("[data-push-content]");
      var compareField = event.target.closest("[data-compare-field]");
      var compareCheck = event.target.closest("[data-compare-check]");
      var trendField = event.target.closest("[data-trend-field]");

      if (recipientInput) {
        toggleReceiver(recipientInput.getAttribute("data-recipient-id"), recipientInput.checked);
        renderRecipientModal();
        renderReceiverChips();
      }

      if (pushContentInput) {
        updatePushContent();
      }

      if (compareField) {
        state.wizard.compare[compareField.getAttribute("data-compare-field")] = compareField.value;
        state.wizard.compare.preset = "custom";
        renderRuleWorkspace();
      }

      if (compareCheck) {
        state.wizard.compare[compareCheck.getAttribute("data-compare-check")] = compareCheck.checked;
        state.wizard.compare.preset = "custom";
        renderRuleWorkspace();
      }

      if (trendField) {
        var trendKey = trendField.getAttribute("data-trend-field");
        state.wizard.trend[trendKey] = trendField.value;

        if (trendKey === "sourcePolicy" && trendField.value === "natural-required" && state.wizard.trend.sources.indexOf("natural") === -1) {
          state.wizard.trend.sources.push("natural");
        }

        renderRuleWorkspace();
      }
    });

    Common.qs("#alertProjectSearch").addEventListener("input", function (event) {
      state.projectFilter.keyword = event.target.value.trim();
      state.projectPage = 1;
      renderProjectPicker();
    });

    Common.qs("#alertProjectScene").addEventListener("change", function (event) {
      state.projectFilter.scene = event.target.value;
      state.projectPage = 1;
      renderProjectPicker();
    });

    Common.qs("#alertProjectStatus").addEventListener("change", function (event) {
      state.projectFilter.status = event.target.value;
      state.projectPage = 1;
      renderProjectPicker();
    });

    Common.qs("#alertProjectReset").addEventListener("click", function () {
      state.projectFilter.keyword = "";
      state.projectFilter.scene = "all";
      state.projectFilter.status = "all";
      state.projectPage = 1;
      Common.qs("#alertProjectSearch").value = "";
      Common.qs("#alertProjectScene").value = "all";
      Common.qs("#alertProjectStatus").value = "all";
      renderProjectPicker();
    });

    Common.qs("#alertProjectPrev").addEventListener("click", function () {
      state.projectPage = Math.max(1, state.projectPage - 1);
      renderProjectPicker();
    });

    Common.qs("#alertProjectNext").addEventListener("click", function () {
      var maxPage = Math.max(1, Math.ceil(getFilteredProjects().length / state.projectPageSize));
      state.projectPage = Math.min(maxPage, state.projectPage + 1);
      renderProjectPicker();
    });

    Common.qs("#alertSinglePrev").addEventListener("click", function () {
      state.singlePage = Math.max(1, state.singlePage - 1);
      renderSingleAlerts();
    });

    Common.qs("#alertSingleNext").addEventListener("click", function () {
      var maxPage = Math.max(1, Math.ceil(getFilteredSingleItems().length / state.singlePageSize));
      state.singlePage = Math.min(maxPage, state.singlePage + 1);
      renderSingleAlerts();
    });

    Common.qs("#alertSinglePlatform").addEventListener("change", function (event) {
      state.singleAdvancedFilter.platform = event.target.value;
      state.singlePage = 1;
      renderSingleAlerts();
    });

    Common.qs("#alertSingleLevel").addEventListener("change", function (event) {
      state.singleAdvancedFilter.level = event.target.value;
      state.singlePage = 1;
      renderSingleAlerts();
    });

    Common.qs("#alertSingleStatus").addEventListener("change", function (event) {
      state.singleAdvancedFilter.status = event.target.value;
      state.singlePage = 1;
      renderSingleAlerts();
    });

    Common.qs("#alertSingleAccount").addEventListener("change", function (event) {
      state.singleAdvancedFilter.account = event.target.value;
      state.singlePage = 1;
      renderSingleAlerts();
    });

    Common.qs("#alertSingleReset").addEventListener("click", function () {
      state.singleAdvancedFilter = { platform: "all", level: "all", status: "all", account: "all" };
      state.singleFilter = "all";
      state.singlePage = 1;
      Common.qs("#alertSinglePlatform").value = "all";
      Common.qs("#alertSingleLevel").value = "all";
      Common.qs("#alertSingleStatus").value = "all";
      Common.qs("#alertSingleAccount").value = "all";
      renderSingleAlerts();
    });

    Common.qs("#alertInflectionPrev").addEventListener("click", function () {
      state.inflectionPage = Math.max(1, state.inflectionPage - 1);
      renderInflectionResults();
    });

    Common.qs("#alertInflectionNext").addEventListener("click", function () {
      var maxPage = Math.max(1, Math.ceil(getFilteredInflections().length / state.inflectionPageSize));
      state.inflectionPage = Math.min(maxPage, state.inflectionPage + 1);
      renderInflectionResults();
    });

    Common.qs("#alertInflectionType").addEventListener("change", function (event) {
      state.inflectionFilter.type = event.target.value;
      state.inflectionPage = 1;
      renderInflectionResults();
    });

    Common.qs("#alertInflectionLevel").addEventListener("change", function (event) {
      state.inflectionFilter.level = event.target.value;
      state.inflectionPage = 1;
      renderInflectionResults();
    });

    Common.qs("#alertInflectionDecision").addEventListener("change", function (event) {
      state.inflectionFilter.decision = event.target.value;
      state.inflectionPage = 1;
      renderInflectionResults();
    });

    Common.qs("#alertInflectionReset").addEventListener("click", function () {
      state.inflectionFilter = { type: "all", level: "all", decision: "all" };
      state.inflectionPage = 1;
      Common.qs("#alertInflectionType").value = "all";
      Common.qs("#alertInflectionLevel").value = "all";
      Common.qs("#alertInflectionDecision").value = "all";
      renderInflectionResults();
    });

    Common.qs("#alertOpenReceivers").addEventListener("click", openRecipientModal);

    Common.qs("#alertRecipientSearch").addEventListener("input", renderRecipientModal);

    Common.qs("#alertRecipientClear").addEventListener("click", function () {
      state.wizard.receivers = [];
      renderRecipientModal();
      renderReceiverChips();
    });

    Common.qs("#alertRecipientConfirm").addEventListener("click", function () {
      closeRecipientModal();
      renderReceiverChips();
      Common.showToast("钉钉接收人已更新");
    });

    Common.qs("#alertApplyFilter").addEventListener("click", function () {
      state.filter.keyword = Common.qs("#alertTaskSearch").value.trim();
      state.filter.mode = Common.qs("#alertModeFilter").value;
      renderTaskList();
      Common.showToast("告警任务筛选已应用");
    });

    Common.qs("#alertResetFilter").addEventListener("click", function () {
      state.filter.keyword = "";
      state.filter.mode = "all";
      state.filter.status = "all";
      Common.qs("#alertTaskSearch").value = "";
      Common.qs("#alertModeFilter").value = "all";
      renderTaskList();
      Common.showToast("筛选条件已重置");
    });

    Common.qs("#alertNoticeClose").addEventListener("click", function () {
      Common.qs("#alertLiveNotice").setAttribute("hidden", "");
    });

    Common.qs("#alertNoticeResult").addEventListener("click", function () {
      Common.qs("#alertLiveNotice").setAttribute("hidden", "");
      state.selectedTaskId = "task-launch";
      showView("result");
    });

    Common.qs("#alertNoticeDetail").addEventListener("click", function () {
      Common.qs("#alertLiveNotice").setAttribute("hidden", "");
      state.selectedTaskId = "task-launch";
      state.selectedInflectionId = "bp-media-topic";
      showView("breakpoint");
    });
  }

  function handleAction(action) {
    if (action === "simulate-notice") {
      showLiveNotice();
      return;
    }

    if (action === "test-push") {
      Common.showToast("钉钉测试推送已发送到品牌传播应急群");
      return;
    }

    if (action === "push-current") {
      Common.showToast("已生成钉钉传播拐点分析卡片");
      return;
    }

    if (action === "brief-current") {
      Common.showToast("已加入传播简报素材候选");
      return;
    }

    if (action === "transfer-item") {
      Common.showToast("已创建稿件处置单，占位编号 CL-20260724-052");
      return;
    }

    if (action === "material-item") {
      Common.showToast("已加入正面传播素材库");
      return;
    }
  }

  function updateTaskLifecycle(action, taskId) {
    var task = getTaskById(taskId);
    if (!task) {
      return;
    }

    if (action === "pause") {
      task.status = "paused";
      task.statusLabel = "已暂停";
      state.filter.status = "paused";
      Common.showToast("告警任务已暂停，历史预警结果继续保留");
    }

    if (action === "resume" || action === "activate") {
      task.status = "running";
      task.statusLabel = "运行中";
      task.latest = "刚刚重新开始监测";
      state.filter.status = "running";
      Common.showToast(action === "activate" ? "已重新激活任务，开始产生新的预警结果" : "告警任务已启用，继续按现有规则监测");
    }

    if (action === "complete") {
      task.status = "completed";
      task.statusLabel = "已完成";
      task.latest = "刚刚结束任务";
      state.filter.status = "completed";
      Common.showToast("告警任务已完成，历史结果保留用于复盘，可随时编辑后重新激活");
    }

    renderKpis();
    renderTaskList();
  }

  function getDefaultRulesForMode(mode) {
    if (mode === "inflection") {
      return ["volume-rhythm", "natural-amplification", "important-media-voice", "topic-shift", "viewpoint-frame", "sentiment-turn", "risk-escalation", "opportunity-amplification"];
    }

    if (mode === "single") {
      return ["negative-strong", "negative-risk-tag", "positive-strong", "positive-testimony"];
    }

    return ["volume-rhythm", "natural-amplification", "important-media-voice", "topic-shift", "viewpoint-frame", "sentiment-turn", "risk-escalation", "opportunity-amplification"];
  }

  function openTaskEditor(taskId) {
    var task = getTaskById(taskId);

    if (!task) {
      return;
    }

    var project = monitorProjects.filter(function (item) { return item.name === task.project; })[0] || monitorProjects[0];

    state.editingTaskId = task.id;
    state.selectedTaskId = task.id;
    state.wizardStep = 1;
    state.trendGuideStep = 1;
    state.projectScope = "all";
    state.projectPage = 1;
    state.projectFilter = { keyword: "", scene: "all", status: "all" };
    state.wizard = {
      projectId: project.id,
      project: project.name,
      mode: task.mode,
      rules: (task.ruleIds || getDefaultRulesForMode(task.mode)).slice(),
      compare: task.compare ? Object.assign({}, task.compare) : {
        preset: "low-volume",
        currentWindow: "24 小时",
        baselineType: "最近窗口移动平均",
        baselinePeriod: "近 7 天",
        compareWindow: "前 1 个窗口",
        alignByTime: true,
        minSample: "20 条",
        lowSampleStrategy: "合并相邻窗口"
      },
      trend: task.trend ? Object.assign({}, task.trend, {
        sources: (task.trend.sources || ["owned", "constructed", "natural"]).slice()
      }) : {
        monitoringType: "campaign",
        phase: "preheat",
        sourcePolicy: "natural-priority",
        sources: ["owned", "constructed", "natural"],
        lowBaseFloor: "50 条",
        absoluteIncrease: "20 条",
        sustainWindows: "连续 2 个窗口",
        confirmation: "至少 2 类传播证据共同成立",
        highImpactPolicy: "直接确认正式预警"
      },
      receivers: (task.receivers || ["赵涛", "周环牞", "周薇", "郑国"]).slice(),
      pushContent: (task.pushContent || ["预警结论", "判断依据", "关键样本", "趋势数据", "建议动作"]).slice()
    };

    Common.qs("#alertProjectSearch").value = "";
    Common.qs("#alertProjectScene").value = "all";
    Common.qs("#alertProjectStatus").value = "all";
    Common.qs("#alertDingGroup").value = task.dingGroup || "品牌传播应急群";
    Common.qs("#alertFrequency").value = task.pushFrequency || "高优先级即时，普通预警 30 分钟聚合";
    showView("create");
    renderWizard();
  }

  function showView(view) {
    state.view = view;
    Common.qsa(".alert-view").forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute("data-alert-view") === view);
    });

    var titleMap = {
      list: "传播告警",
      create: state.editingTaskId ? "编辑告警任务" : "新建告警任务",
      result: "预警结果页",
      breakpoint: "传播拐点详情",
      item: "单条信息详情"
    };

    Common.qs("#alertBreadcrumbTitle").textContent = titleMap[view] || "传播告警";

    if (view === "result") {
      renderResultView();
    }

    if (view === "breakpoint") {
      renderBreakpointDetail();
    }

    if (view === "item") {
      renderItemDetail();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderKpis() {
    var running = tasks.filter(function (task) { return task.status === "running"; }).length;
    var today = tasks.reduce(function (sum, task) { return sum + task.today; }, 0);
    var highOpen = tasks.reduce(function (sum, task) { return sum + task.highOpen; }, 0);

    Common.qs("#alertKpiRunning").textContent = Common.formatNumber(running);
    Common.qs("#alertKpiToday").textContent = Common.formatNumber(today);
    Common.qs("#alertKpiOpen").textContent = Common.formatNumber(highOpen);
  }

  function renderTaskList() {
    var list = Common.qs("#alertTaskList");
    renderTaskStatusTabs();
    var filtered = tasks.filter(function (task) {
      var keywordMatched = !state.filter.keyword || (task.name + task.project).indexOf(state.filter.keyword) > -1;
      var modeMatched = state.filter.mode === "all" || task.mode === state.filter.mode;
      var statusMatched = state.filter.status === "all" || task.status === state.filter.status;
      return keywordMatched && modeMatched && statusMatched;
    });

    if (!filtered.length) {
      list.innerHTML = '<div class="alert-empty">暂无符合筛选条件的告警任务</div>';
      return;
    }

    list.innerHTML = filtered.map(renderTaskCard).join("");
  }

  function renderTaskStatusTabs() {
    ["all", "running", "paused", "draft", "completed"].forEach(function (status) {
      var count = status === "all" ? tasks.length : tasks.filter(function (task) { return task.status === status; }).length;
      var countNode = Common.qs('[data-task-status-count="' + status + '"]');
      if (countNode) {
        countNode.textContent = count;
      }
    });

    Common.qsa("[data-task-status-tab]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-task-status-tab") === state.filter.status);
    });
  }

  function renderTaskCard(task) {
    var stats = getTaskStats(task);
    var inflectionEnabled = task.mode !== "single";
    var singleEnabled = task.mode !== "inflection";

    return [
      '<article class="alert-task-card">',
      '  <div class="alert-task-card-head">',
      '    <div>',
      '      <h2>' + escapeHtml(task.name) + '</h2>',
      '      <p class="alert-task-card-desc">关联监测项目：' + escapeHtml(task.project) + ' · 负责人：' + escapeHtml(task.owner) + '</p>',
      '    </div>',
      '    <span class="alert-state alert-state-' + task.status + '">' + task.statusLabel + '</span>',
      '  </div>',
      '  <div class="alert-task-tags">',
      '    <span class="alert-tag">' + task.modeLabel + '</span>',
      '    <span class="alert-tag">钉钉：' + escapeHtml(task.dingGroup) + '</span>',
      '    <span class="alert-tag">' + escapeHtml(task.ruleSummary) + '</span>',
      '  </div>',
      '  <div class="alert-task-rule-structure">',
      renderTaskRuleBlock("趋势预警规则", inflectionEnabled, task.inflectionRuleSummary),
      renderTaskRuleBlock("单篇信息规则", singleEnabled, task.singleRuleSummary),
      '  </div>',
      renderTaskQuickFocus(task, stats),
      '  <div class="alert-task-metrics">',
      '    <div><span>今日预警</span><strong>' + task.today + '</strong></div>',
      '    <div><span>待研判</span><strong>' + task.unread + '</strong></div>',
      '    <div><span>高优先级未处理</span><strong>' + task.highOpen + '</strong></div>',
      '    <div><span>待转处置</span><strong>' + stats.pendingSingle + '</strong></div>',
      '  </div>',
      '  <div class="alert-task-actions">',
      renderTaskLifecycleActions(task),
      '    <button class="common-button common-button-light" type="button" data-action="test-push">测试推送</button>',
      task.status === "draft" ? '' : '<button class="common-button common-button-primary" type="button" data-view-results="' + task.id + '">查看预警结果</button>',
      '  </div>',
      '</article>'
    ].join("");
  }

  function renderTaskQuickFocus(task, stats) {
    var focus = task.status === "draft" ? "草稿尚未启动，请先补齐规则和钉钉推送配置。" :
      task.status === "paused" ? "任务暂停中，历史预警结果保留；启用后继续按原规则监测。" :
      task.status === "completed" ? "任务已完成，历史结果仅供复盘；重新激活后将按当前规则继续监测。" :
      (task.highOpen ? "当前有 " + task.highOpen + " 条高优先级预警待研判，建议优先进入预警结果页。" :
        stats.pendingSingle ? "当前有 " + stats.pendingSingle + " 条单篇信息待后续处置或素材沉淀。" : "当前无高优先级待办，持续观察最新传播变化。");

    return '<div class="alert-task-quick-focus"><span>当前重点</span><strong>' + escapeHtml(focus) + '</strong><em>最近触发：' + escapeHtml(task.latest) + '</em></div>';
  }

  function renderTaskLifecycleActions(task) {
    if (task.status === "running") {
      return '<button class="common-button common-button-light" type="button" data-task-lifecycle="pause" data-task-id="' + task.id + '">暂停任务</button><button class="common-button common-button-light" type="button" data-task-lifecycle="complete" data-task-id="' + task.id + '">结束任务</button><button class="common-button common-button-light" type="button" data-edit-rule="' + task.id + '">编辑规则</button>';
    }

    if (task.status === "paused") {
      return '<button class="common-button common-button-primary" type="button" data-task-lifecycle="resume" data-task-id="' + task.id + '">启用任务</button><button class="common-button common-button-light" type="button" data-edit-rule="' + task.id + '">编辑规则</button>';
    }

    if (task.status === "draft") {
      return '<button class="common-button common-button-primary" type="button" data-edit-rule="' + task.id + '">编辑并启动</button>';
    }

    return '<button class="common-button common-button-primary" type="button" data-task-lifecycle="activate" data-task-id="' + task.id + '">重新激活</button><button class="common-button common-button-light" type="button" data-edit-rule="' + task.id + '">编辑规则</button>';
  }

  function renderTaskRuleBlock(title, enabled, summary) {
    return [
      '<section class="alert-task-rule-block' + (enabled ? "" : " is-disabled") + '">',
      '<div><span>' + escapeHtml(title) + '</span><strong>' + (enabled ? "已启用" : "未启用") + '</strong></div>',
      '<p>' + escapeHtml(summary || "暂无规则摘要") + '</p>',
      '</section>'
    ].join("");
  }

  function getTaskStats(task) {
    var stats = task.resultStats || {};

    return {
      inflection: stats.inflection || 0,
      importantMedia: stats.importantMedia || 0,
      singlePositive: stats.singlePositive || 0,
      singleNegative: stats.singleNegative || 0,
      pendingSingle: stats.pendingSingle || 0
    };
  }

  function renderProjectPicker() {
    var filtered = getFilteredProjects();
    var maxPage = Math.max(1, Math.ceil(filtered.length / state.projectPageSize));
    if (state.projectPage > maxPage) {
      state.projectPage = maxPage;
    }
    var start = (state.projectPage - 1) * state.projectPageSize;
    var pageRows = filtered.slice(start, start + state.projectPageSize);
    var selected = getSelectedMonitorProject();

    Common.qs("#alertSelectedProject").innerHTML = [
      '<span>当前已选监测项目</span>',
      '<strong>' + escapeHtml(selected.name) + '</strong>',
      '<em>' + selected.sceneLabel + ' · ' + selected.platforms.join("、") + ' · 数据量 ' + Common.formatNumber(selected.dataCount) + ' · 今日新增 ' + Common.formatNumber(selected.today) + '</em>'
    ].join("");

    Common.qsa("[data-project-scope]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-project-scope") === state.projectScope);
    });

    Common.qs("#alertProjectCount").textContent = "共 " + filtered.length + " 个项目";
    Common.qs("#alertProjectPage").textContent = state.projectPage + " / " + maxPage;
    Common.qs("#alertProjectPrev").disabled = state.projectPage === 1;
    Common.qs("#alertProjectNext").disabled = state.projectPage === maxPage;

    if (!pageRows.length) {
      Common.qs("#alertProjectTableBody").innerHTML = '<tr><td colspan="6"><div class="alert-empty">没有找到符合条件的监测项目</div></td></tr>';
      return;
    }

    Common.qs("#alertProjectTableBody").innerHTML = pageRows.map(function (project) {
      var selectedClass = project.id === state.wizard.projectId ? " class=\"is-selected\"" : "";
      var buttonClass = project.id === state.wizard.projectId ? "common-button common-button-primary" : "common-button common-button-light";
      var buttonText = project.id === state.wizard.projectId ? "已选择" : "选择";

      return [
        '<tr' + selectedClass + '>',
        '  <td><div class="alert-project-name"><strong>' + escapeHtml(project.name) + '</strong><span>' + escapeHtml(project.brand) + ' · 关键词：' + escapeHtml(project.keywords) + '</span></div></td>',
        '  <td><span class="alert-tag">' + project.sceneLabel + '</span><span class="alert-row-meta">' + project.statusLabel + '</span></td>',
        '  <td>' + project.platforms.map(function (platform) { return '<span class="alert-tag">' + escapeHtml(platform) + '</span>'; }).join(" ") + '</td>',
        '  <td><strong>' + Common.formatNumber(project.dataCount) + '</strong><span class="alert-row-meta">今日 +' + Common.formatNumber(project.today) + '</span></td>',
        '  <td>' + project.updated + '</td>',
        '  <td><button class="' + buttonClass + '" type="button" data-select-project-id="' + project.id + '">' + buttonText + '</button></td>',
        '</tr>'
      ].join("");
    }).join("");
  }

  function getFilteredProjects() {
    return monitorProjects.filter(function (project) {
      var scopeMatched = state.projectScope === "all" || (state.projectScope === "recent" && project.recent) || (state.projectScope === "favorite" && project.favorite);
      var keywordText = (project.name + project.brand + project.keywords + project.platforms.join("")).toLowerCase();
      var keywordMatched = !state.projectFilter.keyword || keywordText.indexOf(state.projectFilter.keyword.toLowerCase()) > -1;
      var sceneMatched = state.projectFilter.scene === "all" || project.scene === state.projectFilter.scene;
      var statusMatched = state.projectFilter.status === "all" || project.status === state.projectFilter.status;

      return scopeMatched && keywordMatched && sceneMatched && statusMatched;
    });
  }

  function selectProject(projectId) {
    var project = monitorProjects.filter(function (item) { return item.id === projectId; })[0];

    if (!project) {
      return;
    }

    state.wizard.projectId = project.id;
    state.wizard.project = project.name;
    renderProjectPicker();
    Common.showToast("已选择监测项目：" + project.name);
  }

  function getSelectedMonitorProject() {
    return monitorProjects.filter(function (project) { return project.id === state.wizard.projectId; })[0] || monitorProjects[0];
  }

  function renderWizard() {
    var editingTask = state.editingTaskId ? getTaskById(state.editingTaskId) : null;
    var isDraftEditor = editingTask && editingTask.status === "draft";

    Common.qs("#alertWizardPageTitle").textContent = editingTask ? "编辑告警任务" : "新建告警任务";
    Common.qs("#alertWizardPageDesc").textContent = editingTask ? "正在编辑“" + editingTask.name + "”。可调整数据源、预警模式、规则和钉钉推送；保存后仅更新该任务。" : "选择一个已有监测项目，配置传播拐点与正负面单篇信息预警规则，启动后即可持续产出预警结果。";
    Common.qs("#alertWizardConfirmTitle").textContent = editingTask ? "确认并保存" : "确认并启动";
    Common.qs("#alertWizardConfirmDesc").textContent = isDraftEditor ? "保存后草稿将立即启动并开始产生预警结果。" : (editingTask ? "保存只更新当前任务规则和推送配置，不改变任务的运行、暂停或完成状态。" : "确认后任务进入运行状态，预警结果会持续沉淀在任务结果页，单条负面预警可继续流转到处置业务。");
    Common.qsa(".alert-step").forEach(function (step) {
      var stepNumber = Number(step.getAttribute("data-wizard-step"));
      step.classList.toggle("is-active", stepNumber === state.wizardStep);
      step.classList.toggle("is-done", stepNumber < state.wizardStep);
    });

    Common.qsa(".alert-wizard-panel").forEach(function (panel) {
      panel.classList.toggle("is-active", Number(panel.getAttribute("data-step-panel")) === state.wizardStep);
    });

    Common.qsa("[data-select-project]").forEach(function (button) {
      button.classList.toggle("is-selected", button.getAttribute("data-select-project") === state.wizard.project);
    });

    Common.qsa("[data-select-mode]").forEach(function (button) {
      button.classList.toggle("is-selected", button.getAttribute("data-select-mode") === state.wizard.mode);
    });

    Common.qsa("[data-toggle-rule]").forEach(function (button) {
      button.classList.toggle("is-selected", state.wizard.rules.indexOf(button.getAttribute("data-toggle-rule")) > -1);
    });

    var usesTrendGuide = state.wizardStep === 3 && state.wizard.mode === "inflection";
    Common.qs("[data-wizard-prev]").disabled = state.wizardStep === 1;
    Common.qs("[data-wizard-next]").hidden = state.wizardStep === 5;
    Common.qs("[data-launch-task]").hidden = state.wizardStep !== 5;
    Common.qs(".alert-wizard-footer").hidden = usesTrendGuide;
    Common.qs("[data-launch-task]").textContent = isDraftEditor ? "保存并启动任务" : (editingTask ? "保存规则" : "启动任务");

    renderProjectPicker();
    renderRuleWorkspace();
    renderReceiverChips();
    syncPushContentInputs();

    if (state.wizardStep === 5) {
      renderWizardSummary();
    }
  }

  function renderRuleWorkspace() {
    var workspace = Common.qs("#alertRuleWorkspace");

    if (!workspace) {
      return;
    }

    if (state.wizard.mode === "inflection") {
      workspace.innerHTML = renderTrendGuidedWorkspace();
      return;
    }

    if (state.wizard.mode === "single") {
      workspace.innerHTML = [
        '<div class="alert-rule-note">' + getRuleModeNote() + '</div>',
        renderSingleRuleSection()
      ].join("");
      return;
    }

    workspace.innerHTML = '<div class="alert-rule-note">' + getRuleModeNote() + '</div>';
  }

  function getRuleModeNote() {
    if (state.wizard.mode === "inflection") {
      return "当前模式只配置趋势预警（传播拐点）。它关注专项事件中传播过程是否出现重要节点，例如声量、自然扩散、主体、重要媒体自然发声、议题、观点、情绪、平台、圈层、内容形态、风险和机会变化。";
    }

    if (state.wizard.mode === "single") {
      return "当前模式只配置单篇信息预警。它关注一条具体内容是否命中正面或负面规则，后续可进入素材沉淀或稿件处置。";
    }

    return "请在第二步选择趋势预警或单条信息预警。两类任务分别创建、分别运行，避免传播研判和单篇处置混在同一个任务中。";
  }

  function renderTrendGuidedWorkspace() {
    var guideTitles = [
      { step: 1, title: "明确传播场景", desc: "现在处于什么阶段" },
      { step: 2, title: "选择关注目标", desc: "具体要发现什么" },
      { step: 3, title: "设置预警升级条件", desc: "信号如何组合告警" },
      { step: 4, title: "确认预警逻辑", desc: "系统将如何工作" }
    ];

    return [
      '<section class="alert-trend-guide">',
      '  <header class="alert-trend-guide-intro">',
      '    <div><span>趋势预警规则向导</span><h3>回答 4 个业务问题，系统自动生成传播拐点规则</h3><p>不需要理解算法。按当前传播业务依次选择，系统会自动带出对比窗口、推荐阈值和拐点组合。</p></div>',
      '    <em>已关联：' + escapeHtml(state.wizard.project) + '</em>',
      '  </header>',
      '  <nav class="alert-trend-guide-nav" aria-label="趋势预警规则配置进度">',
      guideTitles.map(function (item) {
        var status = item.step === state.trendGuideStep ? " is-active" : (item.step < state.trendGuideStep ? " is-done" : "");
        return '<button class="' + status + '" type="button" data-trend-guide-step="' + item.step + '"><span>' + item.step + '</span><strong>' + item.title + '</strong><small>' + item.desc + '</small></button>';
      }).join(""),
      '  </nav>',
      '  <div class="alert-trend-guide-layout">',
      '    <main class="alert-trend-guide-main">' + renderTrendGuidePane() + '</main>',
      '  </div>',
      '</section>'
    ].join("");
  }

  function renderTrendGuidePane() {
    if (state.trendGuideStep === 1) {
      return renderTrendScenePane();
    }

    if (state.trendGuideStep === 2) {
      return renderTrendGoalPane();
    }

    if (state.trendGuideStep === 3) {
      return renderTrendScalePane();
    }

    return renderTrendReviewPane();
  }

  function renderTrendScenePane() {
    var trend = state.wizard.trend;
    var phaseMap = { preheat: "预热期", approach: "临近期", burst: "发布/爆发期", fermentation: "发酵期", tail: "尾波期" };
    var phaseHelp = "传播阶段决定系统如何理解变化：预热期重点防止低基数误报；爆发期重点识别自然占比、议题和情绪的结构变化；尾波期重点识别异常反弹。";

    return [
      '<section class="alert-trend-guide-pane">',
      '  <header><span class="alert-trend-question">问题 1</span><h3>现在是什么传播场景？</h3><p>先告诉系统当前传播所处的业务环境。相同的声量增长，在预热期和发布当天含义完全不同。</p></header>',
      '  <div class="alert-trend-question-block">',
      '    <h4>' + renderSettingLabel("选择监测场景", "专项活动有明确的预热、爆发和尾波阶段；连续监测没有固定活动节点，系统使用移动平均识别日常异常。") + '</h4>',
      '    <div class="alert-trend-choice-row">',
      renderTrendChoice("campaign", "专项活动监测", "车展、发布会、上市活动等，有明确传播节点", trend.monitoringType === "campaign", "data-trend-monitoring"),
      renderTrendChoice("continuous", "连续监测", "日常品牌、长期议题，没有明确活动节点", trend.monitoringType === "continuous", "data-trend-monitoring"),
      '    </div>',
      '  </div>',
      trend.monitoringType === "campaign" ? [
        '  <div class="alert-trend-question-block">',
        '    <h4>' + renderSettingLabel("当前处于哪个传播阶段", phaseHelp) + '</h4>',
        '    <p class="alert-trend-block-hint">按任务启动时的实际阶段选择。后续进入新阶段，可在任务中编辑规则切换。</p>',
        '    <div class="alert-trend-phase-row">',
        Object.keys(phaseMap).map(function (phase) {
          return '<button class="' + (trend.phase === phase ? "is-active" : "") + '" type="button" data-trend-phase="' + phase + '">' + phaseMap[phase] + '</button>';
        }).join(""),
        '    </div>',
        '    <div class="alert-trend-context-tip"><strong>' + phaseMap[trend.phase] + '判断重点</strong><span>' + escapeHtml(getTrendPhaseHint(trend.monitoringType, trend.phase)) + '</span></div>',
        '  </div>'
      ].join("") : "",
      renderTrendGuideActions(1),
      '</section>'
    ].join("");
  }

  function renderTrendScalePane() {
    var compare = state.wizard.compare;
    var trend = state.wizard.trend;
    var preset = getCurrentComparePreset();

    return [
      '<section class="alert-trend-guide-pane">',
      '  <header><span class="alert-trend-question">问题 3</span><h3>' + renderSettingLabel("设置正式预警确认条件", "第二步每个关注目标按各自识别标准发现变化，命中后形成候选信号。本页不再识别新变化，只负责判断候选信号是否需要升级为正式预警：普通信号需满足持续性和组合证据，高影响媒体自然发声可按例外规则处理。") + '</h3><p>本页决定何时推送：候选信号要持续多久、需要几类信号共同出现，以及高影响媒体自然发声是否直接告警。</p></header>',
      '  <div class="alert-trend-question-block">',
      '    <h4>' + renderSettingLabel("设置检查频次与判断时间", "这里设置系统多久检查一次已选关注目标，以及每次检查时，当前数据要与哪个前后时间段、哪段历史正常水平比较。它影响发现变化的速度，不直接决定是否正式告警。") + '</h4>',
      '    <p class="alert-trend-block-hint">简单说：系统多久检查一次、每次拿多长时间的数据来算、再和什么时期的数据比较。它只为第二步各类识别标准提供计算时间，不是正式告警门槛。</p>',
      '    <p class="alert-trend-auto-note">系统已根据“' + escapeHtml(getCurrentTrendStageLabel()) + '”自动推荐“' + escapeHtml(getRecommendedPresetTitle()) + '”。业务需要不同时可以手动切换。</p>',
      '    <div class="alert-trend-preset-grid">',
      comparePresets.map(renderTrendPresetChoice).join(""),
      '    </div>',
      compare.preset === "custom" ? [
        '  <div class="alert-trend-custom-scale">',
        '    <header><strong>' + renderSettingLabel("自定义检查与比较时间", "这六项共同定义一次变化识别的时间和样本口径，不是六个独立的告警条件。系统先按“当前观察窗口”汇总本次数据，再用“前置对比窗口”判断刚刚是否发生变化；随后按“历史基线口径”从“历史基线周期”中取正常水平，判断变化是否偏离日常波动。若数据不足“最小样本量”，则按“样本不足处理”执行；勾选同星期/同小时对齐，只影响历史基线取数，用于排除早晚高峰和周末规律。") + '</strong><span>设置后立即替代推荐方案</span></header>',
        '    <div class="alert-compare-steps">',
        '      <section class="alert-compare-step">',
        '        <span class="alert-compare-step-index">01</span>',
        '        <div class="alert-compare-step-copy"><strong>本次要看多久的数据</strong><p>先定义一个当前窗口，系统只用这段时间内的数据计算本次声量、情绪、议题和主体结构。</p><em>当前会每 ' + escapeHtml(compare.currentWindow) + ' 形成一次待判断的数据。</em></div>',
        '        <div class="alert-compare-step-controls alert-compare-step-controls-single">',
        renderCompareSelect("currentWindow", "当前观察窗口", compare.currentWindow, ["15 分钟", "30 分钟", "1 小时", "3 小时", "6 小时", "12 小时", "24 小时"]),
        '        </div>',
        '      </section>',
        '      <section class="alert-compare-step">',
        '        <span class="alert-compare-step-index">02</span>',
        '        <div class="alert-compare-step-copy"><strong>这次变化和刚刚比什么</strong><p>在步骤 01 的当前窗口之外，取前面的窗口作为短期参照，用来判断此刻是否突然加速、回落或转向。</p><em>当前 ' + escapeHtml(compare.currentWindow) + ' 会与' + escapeHtml(compare.compareWindow) + '比较短时变化。</em></div>',
        '        <div class="alert-compare-step-controls alert-compare-step-controls-single">',
        renderCompareSelect("compareWindow", "前置对比窗口", compare.compareWindow, ["前 1 个窗口", "前 2 个窗口均值", "前 3 个窗口均值"]),
        '        </div>',
        '      </section>',
        '      <section class="alert-compare-step">',
        '        <span class="alert-compare-step-index">03</span>',
        '        <div class="alert-compare-step-copy"><strong>这次变化和平常比什么</strong><p>短期变快不一定异常；系统还要用一段历史正常水平判断，这次变化是否脱离活动或日常传播规律。</p><em>系统会以' + escapeHtml(compare.baselinePeriod + compare.baselineType) + '作为长期参照。</em></div>',
        '        <div class="alert-compare-step-controls">',
        renderCompareSelect("baselineType", "历史基线口径", compare.baselineType, ["历史同时间段基线", "最近窗口移动平均", "活动开始前基线"]),
        renderCompareSelect("baselinePeriod", "历史基线周期", compare.baselinePeriod, ["近 3 天", "近 7 天", "近 14 天", "近 30 天"]),
        '          <label class="alert-compare-check"><input type="checkbox" data-compare-check="alignByTime"' + (compare.alignByTime ? " checked" : "") + '>' + renderSettingLabel("按同星期/同小时对齐历史基线", compareFormulaMap.alignByTime) + '<span>排除早晚高峰、周末等自然规律</span></label>',
        '        </div>',
        '      </section>',
        '      <section class="alert-compare-step">',
        '        <span class="alert-compare-step-index">04</span>',
        '        <div class="alert-compare-step-copy"><strong>数据不够时怎么办</strong><p>当当前窗口的数据量太小，比例变化容易失真；在这里设定可信样本门槛和不足时的处理办法。</p><em>少于 ' + escapeHtml(compare.minSample) + ' 时，系统会按“' + escapeHtml(compare.lowSampleStrategy) + '”处理。</em></div>',
        '        <div class="alert-compare-step-controls">',
        renderCompareSelect("minSample", "最小样本量", compare.minSample, ["20 条", "30 条", "50 条", "100 条"]),
        renderCompareSelect("lowSampleStrategy", "样本不足处理", compare.lowSampleStrategy, ["合并相邻窗口", "降低置信度展示", "不触发拐点"]),
        '        </div>',
        '      </section>',
        '    </div>',
        '  </div>'
      ].join("") : [
        '  <div class="alert-trend-translation">',
        '    <div><span>当前选择</span><strong>' + escapeHtml(preset.title) + '</strong><p>' + escapeHtml(preset.explain || getCompareSummary()) + '</p></div>',
        '    <div class="alert-trend-compare-sentence"><span>系统实际会这样比较</span><strong>当前 ' + escapeHtml(compare.currentWindow) + ' → 对比' + escapeHtml(compare.compareWindow) + ' → 再核对' + escapeHtml(compare.baselinePeriod + compare.baselineType) + '</strong></div>',
        '  </div>'
      ].join(""),
      '  </div>',
      '  <div class="alert-trend-question-block">',
      '    <h4>' + renderSettingLabel("设置正式预警升级条件", getTrendUpgradeExampleText()) + '</h4>',
      '    <p class="alert-trend-block-hint">四项不是并列叠加的四个数值：低声量是限制条件；持续确认和信号组合必须同时满足；重要媒体自然发声是可单独处理的高影响例外。</p>',
      '    <div class="alert-trend-business-controls">',
      renderTrendThresholdControl("lowBaseFloor", "低声量信号如何处理", "声量低于该数量时，量化变化只能先作为观察信号，不能单独告警。", trend.lowBaseFloor, ["20 条", "50 条", "100 条", "200 条"], "填写一个条数 L。当当前窗口声量 Vt < L 时，声量、占比等量化识别标准即使命中，也只能进入观察队列；需要后续持续或与其他候选信号组合才可升级。"),
      renderTrendThresholdControl("sustainWindows", "候选信号要持续多久", "过滤只出现一次的短时波动，要求候选信号在多个窗口保持成立。", trend.sustainWindows, ["单窗口即观察", "连续 2 个窗口", "连续 3 个窗口"], "选择连续窗口数量 N。候选信号连续满足 N 个窗口后，才具备升级资格。N 越大误报越少，但发现时间更晚。"),
      renderTrendThresholdControl("confirmation", "需要几类传播证据共同成立", "决定第二步已选目标中，要有多少类不同的变化证据同时满足才告警。", trend.confirmation, ["至少 2 类传播证据共同成立", "至少 3 类传播证据共同成立"], "第二步每个关注目标会产生一类传播证据，例如声量加速、自然扩散、议题转向或风险升级。选择“至少 2 类”，表示任意两类不同证据在同一判断周期内共同成立，才具备正式预警资格。"),
      renderTrendThresholdControl("highImpactPolicy", "重要媒体自然发声如何处理", "决定高影响媒体自然发声是否需要等待其他信号再告警。", trend.highImpactPolicy || "直接确认正式预警", ["直接确认正式预警", "仍需与其他信号组合"], "重要媒体自然发声本身可能改变传播含义。选择直接确认时，已在媒体矩阵中标记为高影响且属于自然发声的内容，可跳过持续确认直接形成正式预警。"),
      '    </div>',
      '  </div>',
      renderTrendGuideActions(3),
      '</section>'
    ].join("");
  }

  function renderTrendPresetChoice(preset) {
    var active = state.wizard.compare.preset === preset.id;
    var recommended = getRecommendedPresetForPhase() === preset.id;
    var scaleText = preset.compare ? preset.compare.currentWindow + "观察 · " + preset.compare.baselinePeriod + "基线" : "点击后设置时间窗口与历史基线";

    return [
      '<button class="alert-trend-preset' + (active ? " is-active" : "") + '" type="button" data-compare-preset="' + preset.id + '">',
      '  <span>' + (recommended ? "当前阶段推荐" : escapeHtml(preset.tag)) + '</span>',
      '  <strong>' + escapeHtml(preset.title) + '</strong>',
      '  <em>' + escapeHtml(preset.desc) + '</em>',
      '  <small>' + escapeHtml(scaleText) + '</small>',
      '</button>'
    ].join("");
  }

  function applyRecommendedPresetForCurrentStage() {
    var presetId = getRecommendedPresetForPhase();
    var preset = comparePresets.filter(function (item) { return item.id === presetId; })[0];

    if (preset) {
      state.wizard.compare = Object.assign({ preset: preset.id }, preset.compare);
    }
  }

  function getRecommendedPresetForPhase() {
    if (state.wizard.trend.monitoringType === "continuous") {
      return "balanced";
    }

    var map = {
      preheat: "low-volume",
      approach: "balanced",
      burst: "sensitive",
      fermentation: "balanced",
      tail: "stable"
    };

    return map[state.wizard.trend.phase] || "balanced";
  }

  function getRecommendedPresetTitle() {
    var presetId = getRecommendedPresetForPhase();
    var preset = comparePresets.filter(function (item) { return item.id === presetId; })[0];
    return preset ? preset.title : "事件专项推荐";
  }

  function getCurrentTrendStageLabel() {
    if (state.wizard.trend.monitoringType === "continuous") {
      return "连续监测";
    }

    var phaseMap = { preheat: "预热期", approach: "临近期", burst: "发布/爆发期", fermentation: "发酵期", tail: "尾波期" };
    return phaseMap[state.wizard.trend.phase] || "预热期";
  }

  function renderTrendThresholdControl(key, title, desc, value, options, help) {
    return [
      '<label class="alert-trend-select alert-trend-threshold-control">',
      '  <strong>' + renderSettingLabel(title, help) + '</strong>',
      '  <p>' + escapeHtml(desc) + '</p>',
      '  <select data-trend-field="' + key + '">',
      options.map(function (option) { return '<option' + (option === value ? " selected" : "") + '>' + option + '</option>'; }).join(""),
      '  </select>',
      '</label>'
    ].join("");
  }

  function getTrendUpgradeExampleText() {
    var trend = state.wizard.trend;
    return "示例：第二步已启用“传播升温”和“方向变化”。当声量加速命中其识别标准时，先产生一类候选证据；当自然扩散或议题转向也命中时，产生另一类候选证据。若总量仍低于 " + trend.lowBaseFloor + "，先保持观察；当候选证据满足“" + trend.sustainWindows + "”且达到“" + trend.confirmation + "”，才形成正式预警。若媒体矩阵识别到高影响媒体自然发声，则按“" + (trend.highImpactPolicy || "直接确认正式预警") + "”处理。";
  }

  function renderTrendGoalPane() {
    var selectedGroups = getSelectedTrendGoalGroups();

    return [
      '<section class="alert-trend-guide-pane">',
      '  <header><span class="alert-trend-question">问题 2</span><h3>这次任务最关心哪些传播问题？</h3><p>按业务问题选择，不需要从 12 类算法中逐个辨认。每个目标下的参数是“识别标准”，用于判断某类变化有没有发生。</p></header>',
      '  <div class="alert-trend-goal-grid">',
      trendGoalGroups.map(renderTrendGoalChoice).join(""),
      '  </div>',
      selectedGroups.length ? [
        '  <section class="alert-trend-selected-rules">',
        '    <header><div><h4>已生成的识别标准</h4><p>这些参数只负责识别某类变化是否发生，命中后先形成候选信号；是否正式告警由下一步的升级条件决定。</p></div><span>已启用 ' + state.wizard.rules.length + ' 类拐点</span></header>',
        selectedGroups.map(renderTrendGoalRuleGroup).join(""),
        '  </section>'
      ].join("") : '<div class="alert-trend-empty-goal">至少选择一个关注目标，系统才能生成趋势预警规则。</div>',
      renderTrendGuideActions(2),
      '</section>'
    ].join("");
  }

  function renderTrendGoalChoice(group) {
    var count = group.rules.filter(function (ruleId) { return state.wizard.rules.indexOf(ruleId) > -1; }).length;
    var active = count > 0;

    return [
      '<article class="alert-trend-goal' + (active ? " is-active" : "") + '">',
      '  <button type="button" data-trend-goal="' + group.id + '" aria-pressed="' + active + '"><span class="alert-trend-goal-check">' + (active ? "✓" : "") + '</span><strong>' + escapeHtml(group.title) + '</strong><p>' + escapeHtml(group.question) + '</p><em>' + escapeHtml(group.result) + '</em></button>',
      '  ' + renderHelpIcon(group.title, getTrendGoalHelp(group)),
      '  <small>' + (active ? "已启用 " + count + "/" + group.rules.length + " 类拐点" : "点击启用该业务目标") + '</small>',
      '</article>'
    ].join("");
  }

  function renderTrendGoalRuleGroup(group) {
    return [
      '<details class="alert-trend-rule-group"' + (group.id === "momentum" ? " open" : "") + '>',
      '  <summary><span>' + escapeHtml(group.short) + '</span><strong>' + escapeHtml(group.result) + '</strong><em>展开细化</em></summary>',
      '  <div class="alert-trend-compact-rules">',
      group.rules.map(function (ruleId) {
        var rule = getInflectionRuleById(ruleId);
        return rule ? renderTrendCompactRule(rule) : "";
      }).join(""),
      '  </div>',
      '</details>'
    ].join("");
  }

  function getInflectionRuleById(ruleId) {
    return inflectionRules.filter(function (rule) { return rule.id === ruleId; })[0];
  }

  function renderTrendCompactRule(rule) {
    var checked = state.wizard.rules.indexOf(rule.id) > -1;
    var explain = inflectionExplainMap[rule.id];

    return [
      '<article class="alert-trend-compact-rule' + (checked ? " is-selected" : "") + '">',
      '  <header>',
      '    <button type="button" data-toggle-rule="' + rule.id + '" aria-pressed="' + checked + '"><span>' + (checked ? "✓" : "") + '</span></button>',
      '    <div><strong>' + escapeHtml(rule.title) + (explain ? renderHelpIcon(rule.title, getInflectionHelpText(rule, explain)) : "") + '</strong><p>' + escapeHtml(rule.desc) + '</p></div>',
      '  </header>',
      checked ? '<details><summary>细化识别条件</summary><div class="alert-rule-config">' + renderTrendRuleConfig(rule) + '</div></details>' : '',
      '</article>'
    ].join("");
  }

  function renderTrendRuleConfig(rule) {
    return rule.config.map(function (item) {
      var formula = ruleFormulaMap[rule.id + "::" + item.label] || "该设置参与当前规则计算，系统会结合监测项目数据自动识别。";
      var help = getRuleSettingHelp(rule, item, formula);

      if (item.type === "select") {
        return '<label>' + renderSettingLabel(item.label, help) + '<select>' + item.options.map(function (option) { return '<option>' + escapeHtml(option) + '</option>'; }).join("") + '</select></label>';
      }

      return [
        '<label>',
        renderSettingLabel(item.label, help),
        '<div class="alert-number-control">',
        '<input type="number" value="' + item.value + '" min="' + (item.min || 0) + '" max="' + (item.max || 999999) + '" step="' + (item.step || 1) + '">',
        '<span>' + escapeHtml(item.unit || "") + '</span>',
        '<button type="button" data-recommend-value="' + escapeHtml(item.recommended) + '" data-use-recommend="' + escapeHtml(item.label + " " + item.recommended + (item.unit || "")) + '">推荐</button>',
        '</div>',
        '</label>'
      ].join("");
    }).join("");
  }

  function renderTrendReviewPane() {
    var groups = getSelectedTrendGoalGroups();
    var phaseMap = { preheat: "预热期", approach: "临近期", burst: "发布/爆发期", fermentation: "发酵期", tail: "尾波期" };
    var stage = state.wizard.trend.monitoringType === "campaign" ? phaseMap[state.wizard.trend.phase] : "连续监测";

    return [
      '<section class="alert-trend-guide-pane">',
      '  <header><span class="alert-trend-question">问题 4</span><h3>确认系统会如何发现并推送拐点</h3><p>下面已经把业务选择翻译成系统执行逻辑。确认无误后进入下一步设置钉钉接收人和推送频率。</p></header>',
      '  <div class="alert-trend-review-grid">',
      '    <section><span>传播场景</span><strong>' + escapeHtml(stage) + '</strong><p>' + escapeHtml(getTrendPhaseHint(state.wizard.trend.monitoringType, state.wizard.trend.phase)) + '</p><button type="button" data-trend-guide-step="1">修改场景</button></section>',
      '    <section><span>关注目标与识别标准</span><strong>' + escapeHtml(groups.map(function (group) { return group.short; }).join("、") || "尚未选择") + '</strong><p>系统已启用 ' + state.wizard.rules.length + ' 类识别标准，命中后先形成候选信号。</p><button type="button" data-trend-guide-step="2">修改目标</button></section>',
      '    <section><span>预警升级条件</span><strong>' + escapeHtml(getCurrentComparePreset().title + " · " + state.wizard.trend.confirmation) + '</strong><p>候选信号需' + escapeHtml(state.wizard.trend.sustainWindows) + '；高影响媒体自然发声按“' + escapeHtml(state.wizard.trend.highImpactPolicy || "直接确认正式预警") + '”处理。</p><button type="button" data-trend-guide-step="3">修改条件</button></section>',
      '  </div>',
      '  <div class="alert-trend-escalation alert-trend-escalation-review" aria-label="趋势预警升级链">',
      '    <article><span>1</span><div><strong>观察信号</strong><p>单一变化或低基数增长只沉淀线索，不打扰领导。</p></div></article>',
      '    <article><span>2</span><div><strong>候选拐点</strong><p>变化达到持续条件，系统补充自然来源、核心议题和推动主体。</p></div></article>',
      '    <article><span>3</span><div><strong>确认拐点</strong><p>满足“' + escapeHtml(state.wizard.trend.confirmation) + '”后生成结果并进入钉钉推送。</p></div></article>',
      '  </div>',
      '  <section class="alert-trend-push-preview">',
      '    <header><span>预警结果示例</span><em>钉钉和系统结果页都会看到</em></header>',
      '    <strong>自然声量持续上升，行业媒体开始自发讨论“价格竞争力”</strong>',
      '    <p>系统将展示发生了什么、为什么判断为拐点、谁在推动、核心观点是什么，并给出持续观察、主动引导或介入处置建议。</p>',
      '  </section>',
      renderTrendGuideActions(4),
      '</section>'
    ].join("");
  }

  function getTrendSourcePolicyLabel() {
    var map = {
      "natural-priority": "自然发声优先",
      "natural-required": "必须有自然发声",
      "all-observe": "全部来源分层观察"
    };

    return map[state.wizard.trend.sourcePolicy] || map["natural-priority"];
  }

  function getSelectedTrendGoalGroups() {
    return trendGoalGroups.filter(function (group) {
      return group.rules.some(function (ruleId) {
        return state.wizard.rules.indexOf(ruleId) > -1;
      });
    });
  }

  function toggleTrendGoal(goalId) {
    var group = trendGoalGroups.filter(function (item) { return item.id === goalId; })[0];

    if (!group) {
      return;
    }

    var active = group.rules.some(function (ruleId) {
      return state.wizard.rules.indexOf(ruleId) > -1;
    });

    if (active) {
      state.wizard.rules = state.wizard.rules.filter(function (ruleId) {
        return group.rules.indexOf(ruleId) === -1;
      });
      return;
    }

    group.rules.forEach(function (ruleId) {
      if (state.wizard.rules.indexOf(ruleId) === -1) {
        state.wizard.rules.push(ruleId);
      }
    });
  }

  function renderTrendGuideActions(step) {
    if (step === 1) {
      return '<footer class="alert-trend-guide-actions"><button class="common-button common-button-light" type="button" data-wizard-prev>返回选择模式</button><button class="common-button common-button-primary" type="button" data-trend-guide-next="2">下一步：选择关注目标</button></footer>';
    }

    if (step === 2) {
      return '<footer class="alert-trend-guide-actions"><button class="common-button common-button-light" type="button" data-trend-guide-prev="1">上一步</button><button class="common-button common-button-primary" type="button" data-trend-guide-next="3">下一步：设置升级条件</button></footer>';
    }

    if (step === 3) {
      return '<footer class="alert-trend-guide-actions"><button class="common-button common-button-light" type="button" data-trend-guide-prev="2">上一步</button><button class="common-button common-button-primary" type="button" data-trend-guide-next="4">下一步：确认预警逻辑</button></footer>';
    }

    return '<footer class="alert-trend-guide-actions"><button class="common-button common-button-light" type="button" data-trend-guide-prev="3">上一步</button><button class="common-button common-button-primary" type="button" data-trend-guide-complete>完成规则配置，设置钉钉推送</button></footer>';
  }

  function renderInflectionCompareSection() {
    var compare = state.wizard.compare;
    var trend = state.wizard.trend;
    var preset = getCurrentComparePreset();
    var phaseMap = { preheat: "预热期", approach: "临近期", burst: "发布/爆发期", fermentation: "发酵期", tail: "尾波期" };

    return [
      '<section class="alert-rule-section alert-compare-section">',
      '  <header>',
      '    <div><h3>第一步：定义“什么是正常传播”</h3><p>趋势预警不是只看声量倍数。先定义活动阶段、声量来源和正常波动，再判断变化是否需要研判。</p></div>',
      '    <span class="alert-tag">趋势预警基础口径</span>',
      '  </header>',
      '  <div class="alert-trend-foundation">',
      '    <section><h4>监测场景</h4><div class="alert-trend-choice-row">',
      renderTrendChoice("campaign", "专项活动监测", "车展、发布会、上市等有明确节点的传播", trend.monitoringType === "campaign", "data-trend-monitoring"),
      renderTrendChoice("continuous", "连续监测", "日常品牌、长期议题或没有明确活动节点的监测", trend.monitoringType === "continuous", "data-trend-monitoring"),
      '    </div></section>',
      trend.monitoringType === "campaign" ? '    <section><h4>当前传播阶段</h4><p>同一增长在预热期、爆发期和尾波期含义不同。系统按阶段取基线并给出推荐敏感度。</p><div class="alert-trend-phase-row">' +
        Object.keys(phaseMap).map(function (phase) { return '<button class="' + (trend.phase === phase ? 'is-active' : '') + '" type="button" data-trend-phase="' + phase + '">' + phaseMap[phase] + '</button>'; }).join("") +
        '    </div></section>' : '',
      '    <section><h4>传播来源口径</h4><p>自有与主动构建用于解释预期动作；自然发声才是判断外部接力和传播拐点的核心证据。</p><div class="alert-trend-source-grid">',
      renderTrendSource("owned", "自有发声", "官方账号、已标记自发稿件", trend.sources.indexOf("owned") > -1),
      renderTrendSource("constructed", "主动构建", "邀约、投放、合作 KOL、通稿协同", trend.sources.indexOf("constructed") > -1),
      renderTrendSource("natural", "自然发声", "未命中自有/邀约/投放链路的外部发声", trend.sources.indexOf("natural") > -1),
      '    </div><label class="alert-trend-select">' + renderSettingLabel("趋势触发来源", "总声量用于发现变化；自有和主动构建用于解释增长；自然声量、自然占比和自然接力率用于确认外部扩散。") + '<select data-trend-field="sourcePolicy"><option value="natural-priority"' + (trend.sourcePolicy === "natural-priority" ? " selected" : "") + '>自然发声优先，主动构建仅解释</option><option value="natural-required"' + (trend.sourcePolicy === "natural-required" ? " selected" : "") + '>必须出现自然发声才确认拐点</option><option value="all-observe"' + (trend.sourcePolicy === "all-observe" ? " selected" : "") + '>全部来源均观察，但分层展示</option></select></label></section>',
      '  </div>',
      '  <div class="alert-trend-baseline-head"><div><h4>第二步：用“短期变化 + 阶段正常水平”判断异常</h4><p>' + escapeHtml(getTrendPhaseHint(trend.monitoringType, trend.phase)) + '</p></div><span>当前：' + (trend.monitoringType === "campaign" ? phaseMap[trend.phase] : "连续监测") + '</span></div>',
      '  <div class="alert-compare-presets">',
      comparePresets.map(renderComparePreset).join(""),
      '  </div>',
      '  <div class="alert-compare-flow">',
      '    <div class="alert-flow-main">',
      '      <div><span>历史正常水平</span><strong>' + escapeHtml(compare.baselinePeriod + " · " + compare.baselineType) + '</strong></div>',
      '      <i></i>',
      '      <div><span>刚才窗口</span><strong>' + escapeHtml(compare.compareWindow) + '</strong></div>',
      '      <i></i>',
      '      <div><span>当前窗口</span><strong>' + escapeHtml(compare.currentWindow) + '</strong></div>',
      '    </div>',
      '    <aside>',
      '      <strong>当前方案：' + escapeHtml(preset.title) + '</strong>',
      '      <p>' + escapeHtml(preset.explain || getCompareSummary()) + '</p>',
      '    </aside>',
      '  </div>',
      '  <div class="alert-trend-guard-grid">',
      renderTrendSelect("lowBaseFloor", "低基数判定", trend.lowBaseFloor, ["20 条", "50 条", "100 条", "200 条"], "当前窗口低于该数量时，不只按倍数触发。"),
      renderTrendSelect("absoluteIncrease", "低基数最小新增", trend.absoluteIncrease, ["10 条", "20 条", "50 条", "100 条"], "低基数下必须达到该绝对新增量，才进入观察信号。"),
      renderTrendSelect("sustainWindows", "持续确认", trend.sustainWindows, ["单窗口即观察", "连续 2 个窗口", "连续 3 个窗口"], "声量变化需持续多久，才从观察升级为候选拐点。"),
      renderTrendSelect("confirmation", "证据组合", trend.confirmation, ["至少 2 类传播证据共同成立", "至少 3 类传播证据共同成立"], "不同传播证据可来自声量、自然接力、主体、论点、情绪或平台变化。"),
      '  </div>',
      '  <div class="alert-trend-escalation" aria-label="趋势预警升级链">',
      '    <article><span>1</span><div><strong>观察信号</strong><p>出现单一变化，或处于低基数但达到最小新增量。保留线索，不立即推送为重大预警。</p></div></article>',
      '    <article><span>2</span><div><strong>候选拐点</strong><p>变化达到持续确认条件，进入待研判队列；系统补充自然来源、核心议题和推动主体。</p></div></article>',
      '    <article><span>3</span><div><strong>确认拐点</strong><p>满足已选的传播证据组合，生成钉钉推送与拐点研判页，支持引导、观察或介入处置。</p></div></article>',
      '  </div>',
      '  <details class="alert-compare-advanced">',
      '    <summary>高级参数：需要更细控制时再调整</summary>',
      '    <div class="alert-compare-grid">',
      renderCompareSelect("currentWindow", "当前观察窗口", compare.currentWindow, ["15 分钟", "30 分钟", "1 小时", "3 小时"]),
      renderCompareSelect("compareWindow", "前置对比窗口", compare.compareWindow, ["前 1 个窗口", "前 2 个窗口均值", "前 3 个窗口均值"]),
      renderCompareSelect("baselineType", "历史基线口径", compare.baselineType, ["历史同时间段基线", "最近窗口移动平均", "活动开始前基线"]),
      renderCompareSelect("baselinePeriod", "历史基线周期", compare.baselinePeriod, ["近 3 天", "近 7 天", "近 14 天", "近 30 天"]),
      renderCompareSelect("minSample", "最小样本量", compare.minSample, ["20 条", "30 条", "50 条", "100 条"]),
      renderCompareSelect("lowSampleStrategy", "样本不足处理", compare.lowSampleStrategy, ["合并相邻窗口", "降低置信度展示", "不触发拐点"]),
      '    </div>',
      '    <label class="alert-compare-check"><input type="checkbox" data-compare-check="alignByTime"' + (compare.alignByTime ? " checked" : "") + '>' + renderSettingLabel("按同星期/同小时对齐历史基线", compareFormulaMap.alignByTime) + '<span>避免早晚高峰、周末波动误判</span></label>',
      '  </details>',
      '</section>'
    ].join("");
  }

  function renderTrendChoice(value, title, desc, active, attribute) {
    return '<button class="alert-trend-choice' + (active ? ' is-active' : '') + '" type="button" ' + attribute + '="' + value + '"><strong>' + title + '</strong><span>' + desc + '</span></button>';
  }

  function renderTrendSource(value, title, desc, active) {
    return '<button class="alert-trend-source' + (active ? ' is-active' : '') + '" type="button" data-trend-source="' + value + '"><strong>' + title + '</strong><span>' + desc + '</span></button>';
  }

  function renderTrendSelect(key, label, value, options, help) {
    return '<label class="alert-trend-select">' + renderSettingLabel(label, help) + '<select data-trend-field="' + key + '">' + options.map(function (option) { return '<option' + (option === value ? ' selected' : '') + '>' + option + '</option>'; }).join("") + '</select></label>';
  }

  function toggleTrendSource(source) {
    var sources = state.wizard.trend.sources;
    var index = sources.indexOf(source);

    if (index > -1 && sources.length > 1) {
      sources.splice(index, 1);
      return;
    }

    if (index === -1) {
      sources.push(source);
    }
  }

  function getTrendPhaseHint(monitoringType, phase) {
    if (monitoringType === "continuous") {
      return "连续监测以最近窗口移动平均和同周期历史水平为基线；单一波动先进入观察，只有持续变化或出现传播结构变化才确认拐点。";
    }

    var hints = {
      preheat: "预热期通常是低基数传播。系统优先识别自然新增、重要媒体首发与议题萌芽；10 条到 40 条会先作为观察信号，需满足最小新增和持续性才升级。",
      approach: "临近期重点看自有/邀约动作之后是否出现外部自然接力、讨论范围扩大或新的核心论点；同阶段基线用于排除常规预热增长。",
      burst: "发布/爆发期总声量高，单看倍数容易失真。系统更关注自然占比、重要主体、议题和情绪是否同步变化，并用多个信号确认拐点。",
      fermentation: "发酵期重点识别是否有二次扩散、观点转向、平台迁移或风险升级；持续性比单窗口峰值更重要。",
      tail: "尾波期预期应回落。持续上升、风险反弹或新主体重新带动讨论，才会被判定为需要关注的异常拐点。"
    };

    return hints[phase] || hints.preheat;
  }

  function renderComparePreset(preset) {
    var active = state.wizard.compare.preset === preset.id;

    return [
      '<button class="alert-compare-preset' + (active ? " is-active" : "") + '" type="button" data-compare-preset="' + preset.id + '">',
      '<span>' + escapeHtml(preset.tag) + '</span>',
      '<strong>' + escapeHtml(preset.title) + '</strong>',
      '<em>' + escapeHtml(preset.desc) + '</em>',
      '</button>'
    ].join("");
  }

  function applyComparePreset(presetId) {
    var preset = comparePresets.filter(function (item) { return item.id === presetId; })[0];

    if (!preset) {
      return;
    }

    if (preset.id === "custom") {
      state.wizard.compare.preset = "custom";
    } else {
      state.wizard.compare = Object.assign({ preset: preset.id }, preset.compare);
    }
    renderRuleWorkspace();
    Common.showToast("已切换为：" + preset.title);
  }

  function getCurrentComparePreset() {
    var match = comparePresets.filter(function (item) {
      return item.id === state.wizard.compare.preset;
    })[0];

    return match || {
      id: "custom",
      title: "自定义对比方案",
      tag: "自定义",
      desc: "你已经手动调整过高级参数。",
      explain: getCompareSummary()
    };
  }

  function renderCompareSelect(key, label, value, options) {
    return [
      '<label class="alert-form-field">',
      renderSettingLabel(label, compareFormulaMap[key]),
      '<select data-compare-field="' + key + '">',
      options.map(function (option) {
        return '<option' + (option === value ? " selected" : "") + '>' + option + '</option>';
      }).join(""),
      '</select>',
      '</label>'
    ].join("");
  }

  function renderInflectionRuleSection() {
    return [
      '<section class="alert-rule-section">',
      '  <header>',
      '    <div><h3>第三步：选择需要发现的传播拐点</h3><p>每类拐点都由异常证据、阶段验证和升级条件共同判断。勾选的是业务关注方向，不是让用户自己填写算法。</p></div>',
      '    <span class="alert-tag">12 类传播拐点</span>',
      '  </header>',
      '  <div class="alert-rule-grid">',
      inflectionRules.map(renderRuleCard).join(""),
      '  </div>',
      '</section>'
    ].join("");
  }

  function renderSingleRuleSection() {
    var builder = singleRuleBuilders[state.singleRuleTab] || singleRuleBuilders.negative;

    return [
      '<section class="alert-rule-section">',
      '  <header>',
      '    <div><h3>第二套规则：单篇信息预警规则</h3><p>用于逐条命中。先用关键词表达式圈定内容，再叠加情感、标签、实体、来源、内容类型、互动传播和命中逻辑。</p></div>',
      '    <span class="alert-tag">正负面单篇规则</span>',
      '  </header>',
      '  <div class="alert-single-rule-tabs">',
      '    <button class="' + (state.singleRuleTab === "negative" ? "is-active" : "") + '" type="button" data-single-rule-tab="negative">负面信息预警</button>',
      '    <button class="' + (state.singleRuleTab === "positive" ? "is-active" : "") + '" type="button" data-single-rule-tab="positive">正面信息预警</button>',
      '  </div>',
      '  <div class="alert-single-builder">',
      '    <header><div><h4>' + escapeHtml(builder.title) + '</h4><p>' + escapeHtml(builder.desc) + '</p></div><span class="alert-tag">' + (state.singleRuleTab === "negative" ? "转处置上游" : "素材/简报上游") + '</span></header>',
      '    <div class="alert-builder-sections">',
      builder.sections.map(renderBuilderSection).join(""),
      '    </div>',
      '  </div>',
      '</section>'
    ].join("");
  }

  function renderBuilderSection(section) {
    return [
      '<section class="alert-builder-section">',
      '<h5>' + escapeHtml(section.title) + '</h5>',
      '<div class="alert-builder-fields">',
      section.fields.map(renderBuilderField).join(""),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderBuilderField(field) {
    var label = renderSettingLabel(field.label, field.help || "该条件参与单条信息命中计算。");

    if (field.type === "expression") {
      return '<label class="alert-builder-field alert-builder-field-wide">' + label + '<textarea rows="2">' + escapeHtml(field.value) + '</textarea></label>';
    }

    if (field.type === "select") {
      return '<label class="alert-builder-field">' + label + '<select>' + field.options.map(function (option) { return '<option>' + escapeHtml(option) + '</option>'; }).join("") + '</select></label>';
    }

    if (field.type === "number") {
      return [
        '<label class="alert-builder-field">',
        label,
        '<div class="alert-number-control">',
        '<input type="number" value="' + field.value + '" min="' + (field.min || 0) + '" max="' + (field.max || 999999) + '" step="' + (field.step || 1) + '">',
        '<span>' + escapeHtml(field.unit || "") + '</span>',
        '<button type="button" data-recommend-value="' + escapeHtml(field.recommended) + '" data-use-recommend="' + escapeHtml(field.label + " " + field.recommended + (field.unit || "")) + '">推荐</button>',
        '</div>',
        '</label>'
      ].join("");
    }

    if (field.type === "chips") {
      return [
        '<div class="alert-builder-field alert-builder-field-wide">',
        label,
        '<div class="alert-condition-chips">',
        field.values.map(function (value) {
          var active = field.selected && field.selected.indexOf(value) > -1;
          return '<button class="' + (active ? "is-active" : "") + '" type="button" data-condition-chip>' + escapeHtml(value) + '</button>';
        }).join(""),
        '</div>',
        '</div>'
      ].join("");
    }

    return '<label class="alert-builder-field">' + label + '<input type="text" value="' + escapeHtml(field.value || "") + '"></label>';
  }

  function renderRuleCard(rule) {
    var checked = state.wizard.rules.indexOf(rule.id) > -1;
    var explain = inflectionExplainMap[rule.id];
    var profile = trendRuleProfileMap[rule.id] || {};
    var configHtml = rule.config.map(function (item) {
      var formula = ruleFormulaMap[rule.id + "::" + item.label] || "该设置参与当前规则的命中条件计算，系统会结合所选监测项目数据自动计算。";
      var help = getRuleSettingHelp(rule, item, formula);

      if (item.type === "select") {
        return '<label>' + renderSettingLabel(item.label, help) + '<select>' + item.options.map(function (option) { return '<option>' + escapeHtml(option) + '</option>'; }).join("") + '</select></label>';
      }

      if (item.type === "number") {
        return [
          '<label>',
          renderSettingLabel(item.label, help),
          '<div class="alert-number-control">',
          '<input type="number" value="' + item.value + '" min="' + (item.min || 0) + '" max="' + (item.max || 999999) + '" step="' + (item.step || 1) + '">',
          '<span>' + escapeHtml(item.unit || "") + '</span>',
          '<button type="button" data-recommend-value="' + escapeHtml(item.recommended) + '" data-use-recommend="' + escapeHtml(item.label + " " + item.recommended + (item.unit || "")) + '">推荐</button>',
          '</div>',
          '</label>'
        ].join("");
      }

      return '<label>' + renderSettingLabel(item.label, help) + '<input type="text" value="' + escapeHtml(item.value) + '"></label>';
    }).join("");

    return [
      '<article class="alert-rule-card' + (checked ? " is-selected" : "") + '">',
      '  <label class="alert-rule-card-head">',
      '    <input type="checkbox" data-toggle-rule="' + rule.id + '"' + (checked ? " checked" : "") + '>',
      '    <span class="alert-rule-card-copy"><strong class="alert-rule-title">' + escapeHtml(rule.title) + (explain ? renderHelpIcon(rule.title, getInflectionHelpText(rule, explain)) : "") + '</strong><span>' + escapeHtml(rule.desc) + '</span></span>',
      '  </label>',
      '  <div class="alert-rule-profile">',
      '    <div><span>异常证据</span><strong>' + escapeHtml(profile.main || "当前指标发生明显变化") + '</strong></div>',
      '    <div><span>阶段验证</span><strong>' + escapeHtml(profile.verify || "与阶段基线和连续窗口共同验证") + '</strong></div>',
      '    <div><span>升级</span><strong>' + escapeHtml(profile.upgrade || "多信号同时满足时提升预警等级") + '</strong></div>',
      '  </div>',
      '  <div class="alert-rule-config">' + configHtml + '</div>',
      '</article>'
    ].join("");
  }

  function getTrendGoalHelp(group) {
    var examples = {
      momentum: "例如成都车展预热期，选择后系统同时观察声量是否加速、自然内容是否增多、是否有重要媒体自然加入。",
      direction: "例如发布后讨论从“产品亮点”转向“价格质疑”，选择后可尽早知道内容方向已经变化。",
      spread: "例如一个汽车垂直圈的话题开始进入短视频平台和大众消费圈，选择后可判断是否需要主动引导。",
      action: "例如质量质疑被高影响账号接力时可进入处置；真实车主集中推荐时可进入放大或简报。"
    };
    var ruleNames = group.rules.map(function (ruleId) {
      var rule = getInflectionRuleById(ruleId);
      return rule ? rule.title : ruleId;
    }).join("、");

    return {
      calculation: "系统会为该业务目标启用“" + ruleNames + "”等识别标准，并按当前窗口、前置对比和历史基线计算变化。",
      meaning: group.help,
      example: examples[group.id] || "选择后，系统只针对该目标下的传播变化生成候选证据。"
    };
  }

  function getRuleSettingHelp(rule, item, calculation) {
    var recommended = item.recommended ? "系统建议先使用“" + item.recommended + (item.unit || "") + "”，后续可根据命中量和误报情况调整。" : "先使用当前推荐选项；需要更早发现时选择更敏感的选项，需要减少误报时选择更稳健的选项。";

    return {
      calculation: calculation,
      meaning: "该项用于限定“" + rule.title + "”何时成立。" + rule.desc + "它只产生该类候选证据，是否正式告警仍由升级条件决定。",
      example: recommended
    };
  }

  function getInflectionHelpText(rule, explain) {
    return {
      calculation: "识别方式：" + explain.method + " 计算公式：" + explain.formula,
      meaning: rule.desc + "用于帮助业务判断传播是否进入新阶段，而不是把单次波动直接当作告警。",
      example: explain.recommend
    };
  }

  function renderSettingLabel(label, formula) {
    return [
      '<span class="alert-setting-label">',
      escapeHtml(label),
      renderHelpIcon(label, formula),
      '</span>'
    ].join("");
  }

  function getHelpDetail(label, content) {
    var guide = helpGuideMap[label] || {};
    var detail = typeof content === "object" && content !== null ? content : { calculation: content };

    return {
      calculation: detail.calculation || "系统会使用该项参与当前规则计算。",
      meaning: detail.meaning || guide.meaning || "该设置用于定义“" + label + "”在当前规则中的数据口径，影响候选证据是否成立，最终仍受正式预警升级条件约束。",
      example: detail.example || guide.example || "可先使用系统推荐值；需要更早发现时选择更敏感的选项，希望减少误报时选择更稳健的选项。"
    };
  }

  function renderHelpIcon(label, formula) {
    var detail = getHelpDetail(label, formula);

    return [
      '<span class="alert-help" tabindex="0" aria-label="' + escapeHtml(label) + '说明">?',
      '<span class="alert-help-pop">',
      '<span class="alert-help-section"><b>计算逻辑</b><span>' + escapeHtml(detail.calculation) + '</span></span>',
      '<span class="alert-help-section"><b>业务决策意义</b><span>' + escapeHtml(detail.meaning) + '</span></span>',
      '<span class="alert-help-section"><b>选择示例</b><span>' + escapeHtml(detail.example) + '</span></span>',
      '</span>',
      '</span>'
    ].join("");
  }

  function renderReceiverChips() {
    var container = Common.qs("#alertReceiverChips");

    if (!container) {
      return;
    }

    if (!state.wizard.receivers.length) {
      container.innerHTML = '<span class="alert-tag">暂未选择接收人</span>';
      return;
    }

    container.innerHTML = state.wizard.receivers.map(function (name) {
      return [
        '<span class="alert-receiver-chip">',
        '<span class="alert-person-avatar">' + escapeHtml(name.slice(0, 1)) + '</span>',
        escapeHtml(name),
        '<button type="button" data-remove-receiver="' + escapeHtml(name) + '" aria-label="移除' + escapeHtml(name) + '">×</button>',
        '</span>'
      ].join("");
    }).join("");
  }

  function openRecipientModal() {
    Common.qs("#alertRecipientModal").removeAttribute("hidden");
    Common.qs("#alertRecipientModal").setAttribute("aria-hidden", "false");
    renderRecipientModal();
  }

  function closeRecipientModal() {
    Common.qs("#alertRecipientModal").setAttribute("hidden", "");
    Common.qs("#alertRecipientModal").setAttribute("aria-hidden", "true");
  }

  function renderRecipientModal() {
    var keyword = Common.qs("#alertRecipientSearch").value.trim().toLowerCase();
    var rows = recipients.filter(function (person) {
      return !keyword || person.name.toLowerCase().indexOf(keyword) > -1;
    });

    Common.qs("#alertRecipientList").innerHTML = rows.map(function (person, index) {
      var checked = state.wizard.receivers.indexOf(person.name) > -1;

      return [
        '<label class="alert-recipient-row' + (index === 1 ? " is-focused" : "") + '">',
        '<input type="checkbox" data-recipient-id="' + person.id + '"' + (checked ? " checked" : "") + '>',
        '<span class="alert-person-avatar">' + escapeHtml(person.name.slice(0, 1)) + '</span>',
        '<span>' + escapeHtml(person.name) + '</span>',
        '</label>'
      ].join("");
    }).join("");

    Common.qs("#alertRecipientSelectedTitle").textContent = "已选（" + state.wizard.receivers.length + "/10000）人";
    Common.qs("#alertRecipientSelected").innerHTML = state.wizard.receivers.map(function (name) {
      return [
        '<span class="alert-selected-person">',
        '<span class="alert-person-avatar">' + escapeHtml(name.slice(0, 1)) + '</span>',
        escapeHtml(name),
        '<button type="button" data-remove-receiver="' + escapeHtml(name) + '" aria-label="移除' + escapeHtml(name) + '">×</button>',
        '</span>'
      ].join("");
    }).join("");
  }

  function toggleReceiver(personId, checked) {
    var person = recipients.filter(function (item) { return item.id === personId; })[0];

    if (!person) {
      return;
    }

    if (checked && state.wizard.receivers.indexOf(person.name) === -1) {
      state.wizard.receivers.push(person.name);
    }

    if (!checked) {
      removeReceiver(person.name, true);
    }
  }

  function removeReceiver(name, silent) {
    state.wizard.receivers = state.wizard.receivers.filter(function (item) {
      return item !== name;
    });
    renderReceiverChips();
    renderRecipientModal();

    if (!silent) {
      Common.showToast("已移除接收人：" + name);
    }
  }

  function updatePushContent() {
    state.wizard.pushContent = Common.qsa("[data-push-content]").filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.getAttribute("data-push-content");
    });

    if (state.wizardStep === 5) {
      renderWizardSummary();
    }
  }

  function syncPushContentInputs() {
    Common.qsa("[data-push-content]").forEach(function (input) {
      input.checked = state.wizard.pushContent.indexOf(input.getAttribute("data-push-content")) > -1;
    });
  }

  function renderWizardSummary() {
    var modeMap = {
      inflection: "趋势预警（传播拐点）",
      single: "单条信息预警"
    };
    var rows = [
      '<div class="alert-summary-row"><span>关联监测项目</span><strong>' + escapeHtml(state.wizard.project) + '</strong></div>',
      '<div class="alert-summary-row"><span>预警模式</span><strong>' + modeMap[state.wizard.mode] + '</strong></div>'
    ];

    if (state.wizard.mode === "inflection") {
      rows.push('<div class="alert-summary-row"><span>前后对比口径</span><strong>' + escapeHtml(getCompareSummary()) + '</strong></div>');
      rows.push('<div class="alert-summary-row"><span>阶段与低基数保护</span><strong>' + escapeHtml(getTrendSummary()) + '</strong></div>');
    }

    rows = rows.concat([
      '<div class="alert-summary-row"><span>已选规则</span><strong>' + escapeHtml(state.wizard.rules.map(getRuleTitle).join("、")) + '</strong></div>',
      state.wizard.mode === "single" ? '<div class="alert-summary-row"><span>单篇命中维度</span><strong>关键词表达式、情感条件、风险/机会标签、实体、来源、内容类型、互动传播、命中逻辑、预警等级</strong></div>' : "",
      '<div class="alert-summary-row"><span>钉钉推送</span><strong>' + escapeHtml(Common.qs("#alertDingGroup").value) + ' · ' + escapeHtml(state.wizard.receivers.join("、")) + '</strong></div>',
      '<div class="alert-summary-row"><span>推送频率</span><strong>' + escapeHtml(Common.qs("#alertFrequency").value) + '</strong></div>',
      '<div class="alert-summary-row"><span>推送内容</span><strong>' + escapeHtml(state.wizard.pushContent.join("、")) + '</strong></div>'
    ]);

    Common.qs("#alertWizardSummary").innerHTML = rows.join("");
  }

  function getCompareSummary() {
    var compare = state.wizard.compare;
    var align = compare.alignByTime ? "按同星期/同小时对齐" : "不做同时间段对齐";

    return compare.currentWindow + "当前窗口，对比" + compare.compareWindow + "，基线为" + compare.baselinePeriod + compare.baselineType + "，最小样本" + compare.minSample + "，样本不足时" + compare.lowSampleStrategy + "，" + align;
  }

  function getTrendSummary() {
    var trend = state.wizard.trend;
    var phaseMap = { preheat: "预热期", approach: "临近期", burst: "发布/爆发期", fermentation: "发酵期", tail: "尾波期" };
    var sourcePolicyMap = {
      "natural-priority": "自然发声优先确认",
      "natural-required": "必须有自然发声确认",
      "all-observe": "全部来源分层观察"
    };
    var stage = trend.monitoringType === "campaign" ? phaseMap[trend.phase] : "连续监测";
    return (trend.monitoringType === "campaign" ? "专项活动 · " : "连续监测 · ") + stage + "，低声量低于" + trend.lowBaseFloor + "时先观察，候选信号需" + trend.sustainWindows + "并满足" + trend.confirmation + "，" + sourcePolicyMap[trend.sourcePolicy];
  }

  function resetWizard() {
    state.editingTaskId = null;
    state.wizardStep = 1;
    state.trendGuideStep = 1;
    state.projectScope = "recent";
    state.projectPage = 1;
    state.projectFilter = {
      keyword: "",
      scene: "all",
      status: "all"
    };
    state.wizard = {
      projectId: "monitor-launch",
      project: "新车上市口碑实时跟踪任务",
      mode: "inflection",
      rules: ["volume-rhythm", "natural-amplification", "important-media-voice", "topic-shift", "viewpoint-frame", "sentiment-turn", "risk-escalation", "opportunity-amplification"],
      trend: {
        monitoringType: "campaign",
        phase: "preheat",
        sourcePolicy: "natural-priority",
        sources: ["owned", "constructed", "natural"],
        lowBaseFloor: "50 条",
        absoluteIncrease: "20 条",
        sustainWindows: "连续 2 个窗口",
        confirmation: "至少 2 类传播证据共同成立",
        highImpactPolicy: "直接确认正式预警"
      },
      compare: {
        preset: "low-volume",
        currentWindow: "24 小时",
        baselineType: "最近窗口移动平均",
        baselinePeriod: "近 7 天",
        compareWindow: "前 1 个窗口",
        alignByTime: true,
        minSample: "20 条",
        lowSampleStrategy: "合并相邻窗口"
      },
      receivers: ["赵涛", "周环牞", "周薇", "郑国"],
      pushContent: ["预警结论", "判断依据", "关键样本", "趋势数据", "建议动作"]
    };
    Common.qs("#alertProjectSearch").value = "";
    Common.qs("#alertProjectScene").value = "all";
    Common.qs("#alertProjectStatus").value = "all";
    renderWizard();
  }

  function toggleRule(rule) {
    var index = state.wizard.rules.indexOf(rule);

    if (index > -1) {
      state.wizard.rules.splice(index, 1);
    } else {
      state.wizard.rules.push(rule);
    }
  }

  function applyModeDefaultRules() {
    if (state.wizard.mode === "inflection") {
      state.wizard.rules = ["volume-rhythm", "natural-amplification", "important-media-voice", "topic-shift", "viewpoint-frame", "sentiment-turn", "risk-escalation", "opportunity-amplification"];
      return;
    }

    if (state.wizard.mode === "single") {
      state.wizard.rules = ["negative-strong", "negative-risk-tag", "positive-strong", "positive-testimony"];
      return;
    }

    state.wizard.rules = ["volume-rhythm", "natural-amplification", "important-media-voice", "topic-shift", "viewpoint-frame", "sentiment-turn", "risk-escalation", "opportunity-amplification"];
  }

  function getRuleTitle(ruleId) {
    var allRules = inflectionRules.concat(singleRules.reduce(function (list, group) {
      return list.concat(group.rules);
    }, []));
    var match = allRules.filter(function (rule) { return rule.id === ruleId; })[0];

    return match ? match.title : ruleId;
  }

  function launchTask() {
    if (state.wizardStep !== 5) {
      Common.showToast("请完成全部配置后在确认页启动任务");
      return;
    }

    if (!state.wizard.rules.length) {
      Common.showToast("请至少选择一条预警规则");
      return;
    }

    if (!state.wizard.receivers.length) {
      Common.showToast("请至少选择一位钉钉接收人");
      return;
    }

    if (state.editingTaskId) {
      saveEditedTask();
      return;
    }

    var task = {
      id: "task-custom-" + Date.now(),
      name: state.wizard.project.replace("任务", "") + "告警任务",
      project: state.wizard.project,
      mode: state.wizard.mode,
      modeLabel: state.wizard.mode === "single" ? "单条信息预警" : "趋势预警",
      status: "running",
      statusLabel: "运行中",
      owner: "当前用户",
      latest: "2026-07-24 09:30",
      today: 0,
      unread: 0,
      highOpen: 0,
      transferred: 0,
      dingGroup: Common.qs("#alertDingGroup").value,
      ruleSummary: state.wizard.rules.slice(0, 3).map(getRuleTitle).join("、"),
      inflectionRuleSummary: state.wizard.mode === "single" ? "未启用趋势预警规则" : getCompareSummary(),
      singleRuleSummary: state.wizard.mode === "inflection" ? "未启用单篇信息规则" : "已配置正负面单篇精准命中规则",
      sourcePolicy: "自然重要发声触发拐点，主动邀约/投放只标注",
      ruleIds: state.wizard.rules.slice(),
      compare: state.wizard.compare,
      trend: state.wizard.trend,
      receivers: state.wizard.receivers.slice(),
      pushContent: state.wizard.pushContent.slice(),
      pushFrequency: Common.qs("#alertFrequency").value,
      resultStats: {
        inflection: 0,
        importantMedia: 0,
        singlePositive: 0,
        singleNegative: 0,
        pendingSingle: 0
      }
    };

    tasks.unshift(task);
    state.selectedTaskId = task.id;
    renderKpis();
    renderTaskList();
    Common.showToast("告警任务已启动，预警结果页已创建");
    showView("result");
  }

  function saveEditedTask() {
    var task = getTaskById(state.editingTaskId);
    var draftTask = task && task.status === "draft";

    if (!task) {
      Common.showToast("未找到需要编辑的告警任务");
      return;
    }

    task.project = state.wizard.project;
    task.mode = state.wizard.mode;
    task.modeLabel = state.wizard.mode === "single" ? "单条信息预警" : "趋势预警";
    task.dingGroup = Common.qs("#alertDingGroup").value;
    task.pushFrequency = Common.qs("#alertFrequency").value;
    task.ruleIds = state.wizard.rules.slice();
    task.compare = state.wizard.compare;
    task.trend = state.wizard.trend;
    task.receivers = state.wizard.receivers.slice();
    task.pushContent = state.wizard.pushContent.slice();
    task.ruleSummary = state.wizard.rules.slice(0, 3).map(getRuleTitle).join("、");
    task.inflectionRuleSummary = state.wizard.mode === "single" ? "未启用趋势预警规则" : getCompareSummary();
    task.singleRuleSummary = state.wizard.mode === "inflection" ? "未启用单篇信息规则" : "已配置正负面单篇精准命中规则";

    if (draftTask) {
      task.status = "running";
      task.statusLabel = "运行中";
      task.latest = "刚刚启动监测";
      state.filter.status = "running";
    }

    state.selectedTaskId = task.id;
    state.editingTaskId = null;
    renderKpis();
    renderTaskList();
    Common.showToast(draftTask ? "草稿已保存并启动监测" : "告警任务规则已保存");
    showView("list");
  }

  function getSimilarAlertHint(rows) {
    var joined = rows.join(" · ");
    var match = joined.match(/(\d[\d,]*)\s*条/);
    var count = match ? Number(match[1].replace(/,/g, "")) : 0;

    return count ? { count: count, text: "同一议题或相似表达已聚合" } : null;
  }

  function getHistoricalInflections(taskId) {
    return inflectionHistory.filter(function (item) {
      return !taskId || item.taskId === taskId;
    }).map(function (item) {
      var historyIndex = inflectionHistory.indexOf(item);
      var similar = getSimilarAlertHint([item.desc]);

      return {
        id: "history-inflection-" + historyIndex,
        taskId: item.taskId,
        title: item.title,
        type: item.type,
        level: "low",
        levelLabel: "低",
        time: item.time,
        conclusion: item.desc,
        evidence: [
          { label: "归档状态", value: item.state },
          { label: "相似表达", value: similar ? similar.count + " 条" : "已归档" }
        ],
        topics: [item.type],
        samples: [],
        path: [],
        phases: [],
        impact: "该拐点已完成当期研判，保留在同一任务的拐点队列中供后续复盘与相似情况比对。",
        advice: ["查看归档研判结论", "必要时重新激活专项监测"],
        points: [12, 14, 18, 21, 26, 31, 28, 24],
        decision: "archived",
        historical: true
      };
    });
  }

  function getTaskAllInflections(taskId) {
    return getTaskInflections(taskId).concat(getHistoricalInflections(taskId)).sort(function (a, b) {
      return b.time.localeCompare(a.time);
    });
  }

  function getInflectionDecision(item) {
    return item.decision || (item.historical ? "archived" : "pending");
  }

  function getInflectionDecisionLabel(decision) {
    return {
      pending: "待研判",
      guide: "主动引导",
      observe: "持续观察",
      intervene: "介入处置",
      archived: "已归档"
    }[decision] || "待研判";
  }

  function getFilteredInflections() {
    var filter = state.inflectionFilter;

    return getTaskAllInflections(getCurrentTask().id).filter(function (item) {
      var typeMatched = filter.type === "all" || item.type === filter.type;
      var levelMatched = filter.level === "all" || item.level === filter.level;
      var decisionMatched = filter.decision === "all" || getInflectionDecision(item) === filter.decision;
      return typeMatched && levelMatched && decisionMatched;
    });
  }

  function renderInflectionResults() {
    var rows = getFilteredInflections();
    var maxPage = Math.max(1, Math.ceil(rows.length / state.inflectionPageSize));

    if (state.inflectionPage > maxPage) {
      state.inflectionPage = maxPage;
    }

    Common.qs("#alertInflectionCount").textContent = "共 " + rows.length + " 个传播拐点";
    Common.qs("#alertInflectionPage").textContent = state.inflectionPage + " / " + maxPage;
    Common.qs("#alertInflectionPrev").disabled = state.inflectionPage === 1;
    Common.qs("#alertInflectionNext").disabled = state.inflectionPage === maxPage;
    renderInflections(rows.slice((state.inflectionPage - 1) * state.inflectionPageSize, state.inflectionPage * state.inflectionPageSize));
  }

  function renderResultView() {
    var task = getCurrentTask();
    var taskInflections = getTaskInflections(task.id);
    var taskAllInflections = getTaskAllInflections(task.id);
    var taskItems = getTaskItems(task.id);
    var positives = taskItems.filter(function (item) { return item.type === "positive"; });
    var negatives = taskItems.filter(function (item) { return item.type === "negative"; });

    if (!isResultTabEnabled(task, state.resultTab)) {
      state.resultTab = getDefaultResultTab(task);
    }

    Common.qs("#alertResultTitle").textContent = task.name;
    Common.qs("#alertResultDesc").textContent = "关联监测项目：" + task.project + " · " + task.modeLabel + " · 最近触发：" + task.latest;
    Common.qs("#alertResultTotal").textContent = taskAllInflections.length + taskItems.length;
    Common.qs("#alertResultInflection").textContent = taskAllInflections.length;
    Common.qs("#alertResultPositive").textContent = positives.length;
    Common.qs("#alertResultNegative").textContent = negatives.length;
    Common.qs("#alertResultTransfer").textContent = taskItems.filter(function (item) { return item.status === "已转处置"; }).length;
    renderResultComposition(task, {
      inflection: taskAllInflections.length,
      importantMedia: taskInflections.filter(isImportantMediaInflection).length,
      singlePositive: positives.length,
      singleNegative: negatives.length,
      pendingSingle: taskItems.filter(function (item) { return item.status === "未处理"; }).length
    });

    Common.qsa("[data-result-tab]").forEach(function (button) {
      var tab = button.getAttribute("data-result-tab");
      button.hidden = !isResultTabEnabled(task, tab);
      button.classList.toggle("is-active", tab === state.resultTab);
    });

    Common.qsa("[data-result-pane]").forEach(function (pane) {
      pane.classList.toggle("is-active", pane.getAttribute("data-result-pane") === state.resultTab);
    });

    renderTrendChart(Common.qs("#alertTrendChart"), taskInflections[0] ? taskInflections[0].points : [4, 8, 11, 14, 19, 21, 25, 29]);
    renderInflectionResults();
    renderSingleAlerts();
  }

  function getDefaultResultTab(task) {
    return task.mode === "single" ? "single" : "inflection";
  }

  function isResultTabEnabled(task, tab) {
    if (task.mode === "single") {
      return tab === "single";
    }

    if (task.mode === "inflection") {
      return tab === "inflection";
    }

    return tab === "inflection" || tab === "single";
  }

  function renderResultComposition(task, stats) {
    var container = Common.qs("#alertResultComposition");

    if (!container) {
      return;
    }

    container.innerHTML = [
      '<article>',
      '<span>趋势预警规则产出</span>',
      '<strong>' + stats.inflection + ' 个拐点</strong>',
      '<p>' + escapeHtml(task.inflectionRuleSummary || "未启用趋势预警规则") + '</p>',
      '</article>',
      '<article>',
      '<span>重要媒体自然发声</span>',
      '<strong>' + stats.importantMedia + ' 个</strong>',
      '<p>' + escapeHtml(task.sourcePolicy || "按媒体矩阵识别自然发声与主动构建") + '</p>',
      '</article>',
      '<article>',
      '<span>单篇信息规则产出</span>',
      '<strong>' + stats.singleNegative + ' 负面 / ' + stats.singlePositive + ' 正面</strong>',
      '<p>' + escapeHtml(task.singleRuleSummary || "未启用单篇信息规则") + '</p>',
      '</article>',
      '<article>',
      '<span>后续业务动作</span>',
      '<strong>' + stats.pendingSingle + ' 条待处理</strong>',
      '<p>负面单篇可转稿件处置，正面单篇可加入传播素材；传播拐点用于钉钉决策推送。</p>',
      '</article>'
    ].join("");
  }

  function renderInflections(items) {
    var list = Common.qs("#alertInflectionList");

    if (!items.length) {
      list.innerHTML = '<div class="alert-empty">该任务暂无传播拐点预警，系统会持续识别声量、结构、议题和情绪变化。</div>';
      return;
    }

    list.innerHTML = items.map(function (item) {
      var decision = getInflectionDecision(item);
      var similar = getSimilarAlertHint(item.evidence.map(function (evidence) { return evidence.label + " " + evidence.value; }));
      return [
        '<article class="alert-inflection-card">',
        '  <div class="alert-card-topline">',
        '    <span class="alert-tag">' + item.type + '</span>',
        '    <span class="alert-level alert-level-' + item.level + '">' + item.levelLabel + '优先级</span>',
        '    <span class="alert-inflection-decision alert-inflection-decision-' + decision + '">' + getInflectionDecisionLabel(decision) + '</span>',
        '  </div>',
        '  <h3>' + escapeHtml(item.title) + '</h3>',
        '  <p>' + escapeHtml(item.conclusion) + '</p>',
        renderInflectionFlags(item),
        '  <div class="alert-evidence-grid">',
        item.evidence.slice(0, 6).map(function (evidence) {
          return '<div><span>' + evidence.label + '</span><strong>' + evidence.value + '</strong></div>';
        }).join(""),
        '  </div>',
        similar ? '  <div class="alert-inflection-similar">相似拐点线索：' + Common.formatNumber(similar.count) + ' 条同议题/相似表达，建议结合核心论点与推动主体一起研判。</div>' : '',
        '  <div class="alert-inflection-card-foot">',
        '    <span class="alert-tag">' + item.time + '</span>',
        '    <button class="common-button common-button-primary" type="button" data-open-inflection="' + item.id + '">进入拐点研判</button>',
        '  </div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderInflectionFlags(item) {
    var flags = [];

    if (isImportantMediaInflection(item)) {
      flags = ["媒体矩阵识别", "自然发声触发", "主动构建已排除"];
    } else if (item.type === "机会放大拐点") {
      flags = ["正面机会", "可入素材", "适合二次扩散"];
    } else if (item.level === "high") {
      flags = ["高优先级", "建议钉钉推送", "需业务研判"];
    }

    if (!flags.length) {
      return "";
    }

    return '<div class="alert-result-flags">' + flags.map(function (flag) {
      return '<span>' + escapeHtml(flag) + '</span>';
    }).join("") + '</div>';
  }

  function isImportantMediaInflection(item) {
    return item.type === "重要媒体自然发声拐点";
  }

  function renderSingleAlerts() {
    var body = Common.qs("#alertSingleTableBody");
    var items = getFilteredSingleItems();
    var maxPage = Math.max(1, Math.ceil(items.length / state.singlePageSize));

    if (state.singlePage > maxPage) {
      state.singlePage = maxPage;
    }

    var start = (state.singlePage - 1) * state.singlePageSize;
    var pageRows = items.slice(start, start + state.singlePageSize);

    Common.qsa("[data-single-filter]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-single-filter") === state.singleFilter);
    });

    Common.qs("#alertSingleCount").textContent = "共 " + items.length + " 条告警信息";
    Common.qs("#alertSinglePage").textContent = state.singlePage + " / " + maxPage;
    Common.qs("#alertSinglePrev").disabled = state.singlePage === 1;
    Common.qs("#alertSingleNext").disabled = state.singlePage === maxPage;

    if (!pageRows.length) {
      body.innerHTML = '<tr><td colspan="7"><div class="alert-empty">当前筛选下暂无单条信息预警</div></td></tr>';
      return;
    }

    body.innerHTML = pageRows.map(function (item) {
      return [
        '<tr>',
        '  <td><span class="alert-item-type alert-type-' + item.type + '">' + item.typeLabel + '</span><span class="alert-row-meta">' + item.levelLabel + '优先级</span></td>',
        '  <td><strong>' + escapeHtml(item.platform) + '</strong><span class="alert-row-meta">' + escapeHtml(item.author) + ' · ' + escapeHtml(item.accountType) + '</span></td>',
        '  <td><div class="alert-summary-text">' + escapeHtml(item.summary) + '</div><span class="alert-row-meta">' + item.time + '</span></td>',
        '  <td>' + item.rules.slice(0, 2).map(function (rule) { return '<span class="alert-tag">' + escapeHtml(rule) + '</span>'; }).join(" ") + '</td>',
        '  <td><strong>' + Common.formatNumber(item.interactions) + '</strong><span class="alert-row-meta">' + item.sentiment + '</span></td>',
        '  <td><span class="alert-tag">' + item.status + '</span></td>',
        '  <td><div class="alert-row-actions"><button class="common-button common-button-light" type="button" data-open-item="' + item.id + '">查看详情</button>' + renderItemRowAction(item) + '</div></td>',
        '</tr>'
      ].join("");
    }).join("");
  }

  function getFilteredSingleItems() {
    var task = getCurrentTask();
    var filter = state.singleAdvancedFilter;

    return getTaskItems(task.id).filter(function (item) {
      var platformMatched = filter.platform === "all" || item.platform === filter.platform;
      var levelMatched = filter.level === "all" || item.level === filter.level;
      var statusMatched = filter.status === "all" || item.status === filter.status;
      var accountMatched = filter.account === "all" || item.accountType === filter.account;

      if (!platformMatched || !levelMatched || !statusMatched || !accountMatched) {
        return false;
      }

      if (state.singleFilter === "all") {
        return true;
      }

      if (state.singleFilter === "open") {
        return item.status === "未处理";
      }

      return item.type === state.singleFilter;
    }).sort(function (a, b) {
      return b.time.localeCompare(a.time);
    });
  }

  function renderItemRowAction(item) {
    if (item.type === "negative") {
      return '<button class="common-button common-button-primary" type="button" data-action="transfer-item">转处置</button>';
    }

    return '<button class="common-button common-button-primary" type="button" data-action="material-item">加素材</button>';
  }

  function updateInflectionDecision(decision, inflectionId) {
    var item = inflections.filter(function (row) { return row.id === inflectionId; })[0];

    if (!item) {
      Common.showToast("该历史拐点已归档，可查看原研判结论");
      return;
    }

    item.decision = decision;
    Common.showToast("拐点决策已更新为：" + getInflectionDecisionLabel(decision));
    renderInflectionResults();
    renderBreakpointDetail();
  }

  function renderInflectionDecision(item) {
    var decision = getInflectionDecision(item);
    var recommendation = item.level === "high" ? "优先完成事实与传播路径研判，再决定是否主动引导或直接联动处置。" : "结合声量持续性、核心论点和推动主体决定是持续观察还是采取引导动作。";

    if (item.historical) {
      return '<div class="alert-decision-summary"><span class="alert-inflection-decision alert-inflection-decision-archived">已归档</span><p>该拐点已完成当期研判，历史结论保留用于复盘和相似情形比对。</p></div>';
    }

    return [
      '<div class="alert-decision-summary"><span class="alert-inflection-decision alert-inflection-decision-' + decision + '">' + getInflectionDecisionLabel(decision) + '</span><p>' + recommendation + '</p></div>',
      '<div class="alert-decision-actions">',
      '<button class="common-button common-button-light" type="button" data-inflection-decision="observe" data-inflection-id="' + item.id + '">持续观察</button>',
      '<button class="common-button common-button-light" type="button" data-inflection-decision="guide" data-inflection-id="' + item.id + '">主动引导</button>',
      '<button class="common-button common-button-primary" type="button" data-inflection-decision="intervene" data-inflection-id="' + item.id + '">介入处置</button>',
      '</div>'
    ].join("");
  }

  function renderBreakpointDetail() {
    var item = getInflectionById(state.selectedInflectionId);

    Common.qs("#alertBreakpointTitle").textContent = item.title;
    Common.qs("#alertBreakpointConclusion").textContent = item.conclusion;
    renderTrendChart(Common.qs("#alertBreakpointChart"), item.points);
    Common.qs("#alertBreakpointPhases").innerHTML = item.phases.map(function (phase) {
      return '<article class="alert-phase"><strong>' + escapeHtml(phase.title) + '</strong><span>' + escapeHtml(phase.text) + '</span></article>';
    }).join("");
    Common.qs("#alertBreakpointEvidence").innerHTML = '<div class="alert-detail-metric-list">' + item.evidence.map(function (evidence) {
      return '<div class="alert-detail-metric"><span>' + evidence.label + '</span><strong>' + evidence.value + '</strong></div>';
    }).join("") + '</div>';
    Common.qs("#alertBreakpointTopics").innerHTML = '<div class="alert-pill-list">' + item.topics.map(function (topic) {
      return '<span class="alert-pill">' + escapeHtml(topic) + '</span>';
    }).join("") + '</div>';
    Common.qs("#alertBreakpointSamples").innerHTML = item.samples.length ? item.samples.map(function (sample) {
      return '<article class="alert-sample-card"><strong>' + escapeHtml(sample.source) + '</strong><p>' + escapeHtml(sample.text) + '</p></article>';
    }).join("") : '<div class="alert-empty">该历史拐点未保留单条样本，已归档为研判摘要。</div>';
    Common.qs("#alertBreakpointPath").innerHTML = item.path.length ? item.path.map(function (node) {
      return '<article class="alert-path-node"><strong>扩散节点</strong><span>' + escapeHtml(node) + '</span></article>';
    }).join("") : '<div class="alert-empty">该历史拐点未保留完整扩散路径。</div>';
    Common.qs("#alertBreakpointImpact").innerHTML = '<p class="alert-summary-text">' + escapeHtml(item.impact) + '</p>';
    Common.qs("#alertBreakpointAdvice").innerHTML = '<div class="alert-pill-list">' + item.advice.map(function (advice) {
      return '<span class="alert-pill">' + escapeHtml(advice) + '</span>';
    }).join("") + '</div>';
    Common.qs("#alertBreakpointDecision").innerHTML = renderInflectionDecision(item);
  }

  function renderItemDetail() {
    var item = getItemById(state.selectedItemId);
    var actionHtml = item.type === "negative"
      ? '<button class="common-button common-button-primary" type="button" data-action="transfer-item">发起稿件处置</button>'
      : '<button class="common-button common-button-primary" type="button" data-action="material-item">加入传播素材</button>';

    Common.qs("#alertItemTitle").textContent = item.typeLabel + "：" + item.summary;
    Common.qs("#alertItemSubTitle").textContent = item.platform + " · " + item.author + " · " + item.time;
    Common.qs("#alertItemActions").innerHTML = '<button class="common-button common-button-light" type="button" data-action="test-push">推送钉钉</button>' + actionHtml;
    Common.qs("#alertItemTypeBadge").innerHTML = '<span class="alert-item-type alert-type-' + item.type + '">' + item.typeLabel + '</span> <span class="alert-level alert-level-' + item.level + '">' + item.levelLabel + '优先级</span>';
    Common.qs("#alertItemContent").textContent = item.content;
    Common.qs("#alertItemMeta").innerHTML = [
      '<div><span>平台</span><strong>' + escapeHtml(item.platform) + '</strong></div>',
      '<div><span>账号类型</span><strong>' + escapeHtml(item.accountType) + '</strong></div>',
      '<div><span>处理状态</span><strong>' + escapeHtml(item.status) + '</strong></div>'
    ].join("");
    Common.qs("#alertItemRules").innerHTML = '<div class="alert-pill-list">' + item.rules.map(function (rule) {
      return '<span class="alert-pill">' + escapeHtml(rule) + '</span>';
    }).join("") + '</div>';
    Common.qs("#alertItemMetrics").innerHTML = [
      '<div class="alert-detail-metric-list">',
      '<div class="alert-detail-metric"><span>互动量</span><strong>' + Common.formatNumber(item.interactions) + '</strong></div>',
      '<div class="alert-detail-metric"><span>情感判断</span><strong>' + escapeHtml(item.sentiment) + '</strong></div>',
      '<div class="alert-detail-metric"><span>发布时间</span><strong>' + item.time.slice(11) + '</strong></div>',
      '<div class="alert-detail-metric"><span>预警等级</span><strong>' + item.levelLabel + '</strong></div>',
      '</div>'
    ].join("");
    Common.qs("#alertItemSuggestion").innerHTML = '<p class="alert-summary-text">' + escapeHtml(item.suggestion) + '</p>';
    Common.qs("#alertItemRelated").innerHTML = item.related.map(function (related) {
      return '<article class="alert-related-item"><strong>关联信息</strong><span>' + escapeHtml(related) + '</span></article>';
    }).join("");
  }

  function renderTrendChart(container, points) {
    var width = 860;
    var height = 260;
    var padding = 28;
    var max = Math.max.apply(null, points) || 1;
    var totalPath = buildPolyline(points, width, height, padding, max);
    var mediaPath = buildPolyline(points.map(function (point) { return Math.round(point * 0.34); }), width, height, padding, max);
    var kolPath = buildPolyline(points.map(function (point) { return Math.round(point * 0.22); }), width, height, padding, max);
    var userPath = buildPolyline(points.map(function (point) { return Math.round(point * 0.44); }), width, height, padding, max);
    var peakIndex = points.indexOf(max);
    var peakX = padding + ((width - padding * 2) / (points.length - 1)) * peakIndex;
    var peakY = height - padding - (max / max) * (height - padding * 2);

    container.innerHTML = [
      '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="传播趋势折线图">',
      '<polyline points="' + userPath + '" fill="none" stroke="#ffb12e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.72"></polyline>',
      '<polyline points="' + kolPath + '" fill="none" stroke="#00a978" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.78"></polyline>',
      '<polyline points="' + mediaPath + '" fill="none" stroke="#2878ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.78"></polyline>',
      '<polyline points="' + totalPath + '" fill="none" stroke="#ff3046" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>',
      '<line x1="' + peakX + '" y1="22" x2="' + peakX + '" y2="' + (height - 28) + '" stroke="#ff3046" stroke-dasharray="6 6" opacity="0.55"></line>',
      '<circle cx="' + peakX + '" cy="' + peakY + '" r="7" fill="#ffffff" stroke="#ff3046" stroke-width="4"></circle>',
      '<text x="' + (peakX + 12) + '" y="' + (peakY + 5) + '" fill="#d81932" font-size="13" font-weight="700">拐点</text>',
      '</svg>'
    ].join("");
  }

  function buildPolyline(points, width, height, padding, max) {
    var step = (width - padding * 2) / (points.length - 1);

    return points.map(function (point, index) {
      var x = padding + step * index;
      var y = height - padding - (point / max) * (height - padding * 2);
      return x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
  }

  function showLiveNotice() {
    var notice = Common.qs("#alertLiveNotice");
    notice.removeAttribute("hidden");
    Common.qs("#alertNoticeTitle").textContent = "媒体集中发声推动“价格质疑”议题发酵";
    Common.qs("#alertNoticeText").textContent = "系统识别到高优先级传播拐点，已同步进入任务结果页，建议查看判断依据与样本内容。";
  }

  function getCurrentTask() {
    return tasks.filter(function (task) { return task.id === state.selectedTaskId; })[0] || tasks[0];
  }

  function getTaskById(taskId) {
    return tasks.filter(function (task) { return task.id === taskId; })[0];
  }

  function getTaskInflections(taskId) {
    if (taskId.indexOf("task-custom") === 0) {
      return [];
    }

    return inflections.filter(function (item) { return item.taskId === taskId; });
  }

  function getTaskItems(taskId) {
    if (taskId.indexOf("task-custom") === 0) {
      return [];
    }

    if (taskId === "task-launch") {
      return [];
    }

    if (taskId === "task-launch-single") {
      return singleAlerts.concat(singleAlertHistory).filter(function (item) { return item.taskId === "task-launch"; });
    }

    return singleAlerts.concat(singleAlertHistory).filter(function (item) { return item.taskId === taskId; });
  }

  function getInflectionById(id) {
    return inflections.concat(getHistoricalInflections()).filter(function (item) { return item.id === id; })[0] || inflections[0];
  }

  function getItemById(id) {
    var items = singleAlerts.concat(singleAlertHistory);
    return items.filter(function (item) { return item.id === id; })[0] || items[0];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  init();
})();
