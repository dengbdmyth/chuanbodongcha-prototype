(function () {
  "use strict";

  var Common = window.BrandInsightCommon;

  var state = {
    workbench: "screening",
    screeningView: "workbench",
    screeningScope: "all",
    handlingScope: "mine",
    screeningFilter: "all",
    handlingFilter: "all",
    filtersExpanded: false,
    advancedFilters: {
      timeRange: "3d",
      startDate: "2026-07-29",
      endDate: "2026-07-31",
      brand: "all",
      platform: "all",
      type: "all",
      level: "all"
    },
    recordPage: 1,
    keyword: "",
    selectedScreeningId: "case-001",
    selectedHandlingId: "case-004",
    selectedNewsId: "news-001",
    selectedPlanId: "plan-platform-004",
    strictness: "standard",
    modal: null,
    evidenceUploads: [],
    nodeUploads: [],
    selectedRecipient: "周薇"
  };

  var actingUsers = {
    screening: "赵涛",
    handling: "周薇"
  };

  var alertTasks = [
    { id: "task-gwm", brand: "长城汽车", name: "成都车展负面单条预警", enabled: true, today: 32, sync: "10:28" },
    { id: "task-haval", brand: "哈弗", name: "哈弗品牌日常负面监测", enabled: true, today: 18, sync: "10:27" },
    { id: "task-tank", brand: "坦克", name: "坦克新品上市风险预警", enabled: true, today: 11, sync: "10:25" },
    { id: "task-ora", brand: "欧拉", name: "欧拉口碑负面信息预警", enabled: true, today: 7, sync: "10:24" },
    { id: "task-wey", brand: "魏牌", name: "魏牌重点账号负面预警", enabled: true, today: 9, sync: "10:22" },
    { id: "task-poer", brand: "长城炮", name: "长城炮品牌风险预警", enabled: true, today: 6, sync: "10:20" },
    { id: "task-svw", brand: "灵魂摩托", name: "灵魂摩托上市负面预警", enabled: false, today: 0, sync: "未接入" }
  ];

  var recipients = [
    { name: "周薇", role: "账号治理执行", load: "进行中 6 个" },
    { name: "郑国", role: "平台投诉执行", load: "进行中 4 个" },
    { name: "冯毅艳", role: "行政路径执行", load: "进行中 3 个" },
    { name: "何咬", role: "诉讼材料协同", load: "进行中 2 个" },
    { name: "冯丽妍", role: "账号治理执行", load: "进行中 5 个" },
    { name: "王经理", role: "治理负责人", load: "进行中 2 个" }
  ];

  var cases = [
    {
      id: "case-001",
      caseNo: "QZ-20260731-0016",
      brand: "长城汽车",
      status: "review",
      level: "高",
      accountName: "张翼说车",
      accountUid: "DY-82947105",
      accountAttribute: "汽车垂类自媒体，长期发布新车测评",
      socialRelation: "与多家竞品经销商账号存在频繁互动，暂未发现品牌合作关系",
      ip: "北京",
      platform: "抖音",
      homepage: "https://www.douyin.com/user/zhangyi",
      target: "长城汽车 / 新车产品",
      infringementType: "商业诋毁",
      basicFacts: "账号连续发布配置缩水和安全风险相关内容，使用绝对化结论引导评论区集中质疑，已有跨平台搬运迹象。",
      aiReason: "接口判断：内容包含未经来源支撑的配置缩水断言，侵权对象明确，账号与原始内容可定位，具备网页、视频及互动区固证条件。",
      aiConfidence: 91,
      reviewer: "赵涛",
      evidenceFiles: [],
      assignedBy: "",
      assignee: "",
      assignedAt: "",
      selectedNewsId: "news-001",
      news: [
        {
          id: "news-001",
          title: "新车所谓高配只是营销，实际配置缩水严重",
          time: "2026-07-31 09:18",
          sourceTask: "成都车展负面单条预警",
          excerpt: "视频中称新车配置表与发布内容不一致，并使用“缩水”“虚假宣传”等明确表述。",
          content: "这台新车发布时把智能和安全说得很满，但实际配置表一看就知道缩水严重。所谓升级更多是营销说法，消费者要擦亮眼睛。",
          url: "https://www.douyin.com/video/001",
          interactions: "赞 8,421 · 评 1,208 · 转 626"
        },
        {
          id: "news-002",
          title: "安全配置到底减没减？评论区已经吵翻了",
          time: "2026-07-31 10:02",
          sourceTask: "成都车展负面单条预警",
          excerpt: "同一账号再次发布跟进视频，引用首条评论并强化配置与安全质疑。",
          content: "上一条发完以后很多人问安全配置，我把公开资料又对了一遍。品牌如果认为没有减配，就应该把不同版本差异完整解释清楚。",
          url: "https://www.douyin.com/video/002",
          interactions: "赞 3,190 · 评 536 · 转 211"
        }
      ],
      strategyDraft: "",
      strategyConfirmed: false,
      aiStrategy: "",
      plans: []
    },
    {
      id: "case-002",
      caseNo: "QZ-20260731-0015",
      brand: "魏牌",
      status: "evidence_ready",
      level: "中",
      accountName: "汽车消费情报站",
      accountUid: "WB-3288129",
      accountAttribute: "微博汽车资讯账号，原创与转载混合",
      socialRelation: "未发现品牌合作，历史上曾参与多个品牌争议话题",
      ip: "上海",
      platform: "微博",
      homepage: "https://weibo.com/u/3288129",
      target: "魏牌 / 售后服务",
      infringementType: "造谣传谣",
      basicFacts: "账号发布“售后大面积拒保”内容，引用来源无法核实，多名用户要求提供真实案例。",
      aiReason: "接口判断：负面断言涉及明确品牌与售后政策，原始信源不清但传播量快速上升，适合先固证后核查。",
      aiConfidence: 83,
      reviewer: "赵涛",
      evidenceFiles: [
        { name: "微博正文及账号截图.png", type: "PNG", time: "2026-07-31 09:42" },
        { name: "评论区高赞内容录屏.mp4", type: "MP4", time: "2026-07-31 09:46" }
      ],
      assignedBy: "",
      assignee: "",
      assignedAt: "",
      selectedNewsId: "news-003",
      news: [
        {
          id: "news-003",
          title: "多地车主反馈售后拒保，品牌回应仍然缺位",
          time: "2026-07-31 08:54",
          sourceTask: "魏牌重点账号负面预警",
          excerpt: "内容声称多地出现拒保，但未展示车主、工单和地区明细。",
          content: "最近收到不少车主反馈，多个地区都出现了售后拒保情况。目前品牌没有给出明确回应，建议准车主慎重考虑。",
          url: "https://weibo.com/3288129/003",
          interactions: "赞 1,904 · 评 463 · 转 388"
        }
      ],
      strategyDraft: "",
      strategyConfirmed: false,
      aiStrategy: "",
      plans: []
    },
    {
      id: "case-003",
      caseNo: "QZ-20260730-0098",
      brand: "坦克",
      status: "pending_strategy",
      level: "高",
      accountName: "硬派越野研究社",
      accountUid: "XHS-885190",
      accountAttribute: "越野圈层头部内容账号",
      socialRelation: "非品牌邀约账号，与竞品改装机构有商业合作",
      ip: "广东",
      platform: "小红书",
      homepage: "https://www.xiaohongshu.com/user/885190",
      target: "坦克 / 产品质量",
      infringementType: "商业诋毁",
      basicFacts: "账号发布长文称车辆存在普遍性底盘缺陷，文中案例来源和检测结论均不完整，已被多个越野群转载。",
      aiReason: "接口判断：内容以行业测评身份发布普遍性质量结论，品牌和车型明确，具有持续扩散能力和完整固证条件。",
      aiConfidence: 94,
      reviewer: "赵涛",
      evidenceFiles: [
        { name: "小红书长文完整截图.pdf", type: "PDF", time: "2026-07-30 17:28" },
        { name: "账号主页及商业合作信息.png", type: "PNG", time: "2026-07-30 17:31" },
        { name: "转载群聊线索录屏.mp4", type: "MP4", time: "2026-07-30 17:36" }
      ],
      assignedBy: "赵涛",
      assignee: "周薇",
      assignedAt: "2026-07-30 17:42",
      selectedNewsId: "news-004",
      news: [
        {
          id: "news-004",
          title: "这款越野车底盘问题不是个例，买之前一定要看",
          time: "2026-07-30 15:13",
          sourceTask: "坦克新品上市风险预警",
          excerpt: "长文使用“普遍缺陷”等结论，未附检测报告，评论区出现多个转述案例。",
          content: "根据我收到的案例，这款车的底盘问题并不是个例。厂家如果一直不正面回应，后续只会有更多车主出来发声。",
          url: "https://www.xiaohongshu.com/explore/004",
          interactions: "赞 6,320 · 评 892 · 藏 1,407"
        }
      ],
      strategyDraft: "",
      strategyConfirmed: false,
      aiStrategy: "建议先走平台投诉路径，针对“普遍缺陷”但缺少检测依据的表述提交不实信息投诉；同步准备事实澄清材料并监测转载扩散。若平台路径未解决，再评估律师函沟通和行政投诉。暂不建议直接启动诉讼路径，需先补充车辆检测和具体损害证明。",
      plans: buildPlanTemplates("case-003")
    },
    {
      id: "case-004",
      caseNo: "QZ-20260729-0076",
      brand: "长城汽车",
      status: "processing",
      level: "高",
      accountName: "车圈爆料君",
      accountUid: "DY-5011288",
      accountAttribute: "跨平台爆料账号，频繁发布争议性汽车内容",
      socialRelation: "与有偿删帖中介账号存在公开互动，未发现品牌合作",
      ip: "湖南",
      platform: "抖音",
      homepage: "https://www.douyin.com/user/5011288",
      target: "长城汽车 / 品牌声誉",
      infringementType: "非法经营",
      basicFacts: "账号发布未经证实的内部资料截图，并在私信中暗示付费后可停止持续发布，已形成连续三条内容。",
      aiReason: "接口判断：账号存在连续负面发布、疑似有偿删帖导向和可识别交易线索，适合完整固证并进入账号治理。",
      aiConfidence: 96,
      reviewer: "赵涛",
      evidenceFiles: [
        { name: "三条视频完整录屏.mp4", type: "MP4", time: "2026-07-29 18:10" },
        { name: "私信沟通截图组.zip", type: "ZIP", time: "2026-07-29 18:14" },
        { name: "账号主页与关联账号.pdf", type: "PDF", time: "2026-07-29 18:18" }
      ],
      assignedBy: "赵涛",
      assignee: "周薇",
      assignedAt: "2026-07-29 18:26",
      selectedNewsId: "news-005",
      news: [
        {
          id: "news-005",
          title: "品牌内部资料曝光，后续还有更多内容",
          time: "2026-07-29 15:42",
          sourceTask: "长城品牌负面账号预警",
          excerpt: "视频展示来源不明的内部截图，并暗示将连续发布更多材料。",
          content: "今天先放第一批资料，后面还有更多。品牌如果想解决问题，应该知道怎么联系我。",
          url: "https://www.douyin.com/video/005",
          interactions: "赞 12,632 · 评 2,104 · 转 1,026"
        },
        {
          id: "news-006",
          title: "第二批资料继续公开，回应没有诚意",
          time: "2026-07-29 17:08",
          sourceTask: "长城品牌负面账号预警",
          excerpt: "账号继续发布截图，并在评论区引导私信联系。",
          content: "对方目前的回应没有诚意，第二批资料继续公开。如果真正想沟通，就不要只做表面工作。",
          url: "https://www.douyin.com/video/006",
          interactions: "赞 8,493 · 评 1,207 · 转 780"
        }
      ],
      strategyDraft: "先固定连续发布、私信暗示和关联中介账号证据；首选平台举报并提交疑似有偿删帖和不实信息证据。平台未有效处理时，启动属地行政投诉并由法务评估是否满足进一步路径条件。所有对外沟通统一由指定人员执行，避免业务人员私下接触。",
      strategyConfirmed: true,
      aiStrategy: "建议将账号行为按疑似网络水军或有偿删帖线索处理。优先平台举报，同时保留私信、交易暗示、连续发布链路；若平台处置失败，准备属地行政投诉材料。涉及进一步法律路径时需法务复核。",
      plans: buildProcessingPlans("case-004")
    },
    {
      id: "case-005",
      caseNo: "QZ-20260725-0031",
      brand: "欧拉",
      status: "closed_failed",
      level: "中",
      accountName: "新能源车主观察",
      accountUid: "WB-782011",
      accountAttribute: "普通汽车话题账号",
      socialRelation: "未发现商业关系",
      ip: "江苏",
      platform: "微博",
      homepage: "https://weibo.com/u/782011",
      target: "欧拉 / 用户权益",
      infringementType: "侮辱诽谤",
      basicFacts: "账号发布侮辱性评论，传播量较低，原始内容在固证后删除。",
      aiReason: "接口判断：对象明确且具备固证条件，内容包含明显侮辱性表达。",
      aiConfidence: 79,
      reviewer: "赵涛",
      evidenceFiles: [{ name: "原文及评论截图.pdf", type: "PDF", time: "2026-07-25 13:20" }],
      assignedBy: "赵涛",
      assignee: "周薇",
      assignedAt: "2026-07-25 13:35",
      selectedNewsId: "news-007",
      news: [
        {
          id: "news-007",
          title: "针对品牌用户的侮辱性评论",
          time: "2026-07-25 11:08",
          sourceTask: "欧拉口碑负面信息预警",
          excerpt: "内容已删除，传播范围有限。",
          content: "原始内容已删除，系统保留固证材料。",
          url: "",
          interactions: "删除前赞 42 · 评 16 · 转 3"
        }
      ],
      strategyDraft: "尝试平台投诉和账号沟通，若均无法识别真实主体则停止推进。",
      strategyConfirmed: true,
      aiStrategy: "",
      closeReason: "平台反馈原内容已删除，不再受理；账号无可验证联系方式，无法确认真实主体，后续路径缺少必要身份材料。",
      plans: [
        makePlan("plan-platform-005", "平台投诉", "平台路径", "failed", [
          makeNode("p5-1", "提交原文固证与账号信息", "向平台提交侵权投诉", "done", "平台已接收材料"),
          makeNode("p5-2", "平台反馈", "记录平台受理与处置结果", "done", "平台反馈原文已删除，不再受理")
        ], "原内容已删除，平台不再受理"),
        makePlan("plan-contact-005", "账号沟通", "沟通路径", "failed", [
          makeNode("p5-3", "查找公开联系方式", "核验主页及历史内容中的联系方式", "done", "未找到有效联系方式")
        ], "账号无公开联系方式，无法核验真实主体")
      ]
    }
  ];

  function buildPlanTemplates(caseId) {
    return [
      makePlan("plan-platform-" + caseId, "平台投诉", "平台路径", "upcoming", [
        makeNode("node-1-" + caseId, "准备投诉材料", "整理原文、账号、事实说明和权利证明", "pending", ""),
        makeNode("node-2-" + caseId, "提交平台投诉", "记录投诉入口、提交时间和受理编号", "pending", ""),
        makeNode("node-3-" + caseId, "跟进平台反馈", "记录审核、补充材料和最终处理结果", "pending", "")
      ]),
      makePlan("plan-contact-" + caseId, "律师函与沟通", "沟通路径", "upcoming", [
        makeNode("node-4-" + caseId, "法务复核材料", "确认事实、主体和沟通边界", "pending", ""),
        makeNode("node-5-" + caseId, "发送函件或正式沟通", "记录送达方式和对方回应", "pending", ""),
        makeNode("node-6-" + caseId, "评估沟通结果", "确认是否删除、更正或停止传播", "pending", "")
      ]),
      makePlan("plan-admin-" + caseId, "行政投诉", "行政路径", "upcoming", [
        makeNode("node-7-" + caseId, "确定受理渠道", "匹配属地与主管部门", "pending", ""),
        makeNode("node-8-" + caseId, "提交投诉材料", "记录提交清单和受理编号", "pending", ""),
        makeNode("node-9-" + caseId, "跟进处理结果", "补充材料并记录部门反馈", "pending", "")
      ])
    ];
  }

  function buildProcessingPlans(caseId) {
    return [
      makePlan("plan-platform-004", "平台举报", "平台路径", "active", [
        makeNode("node-401", "整理举报材料", "汇总连续发布、私信和关联账号证据", "done", "已完成材料清单并由负责人复核"),
        makeNode("node-402", "提交平台举报", "提交疑似有偿删帖和不实信息材料", "active", ""),
        makeNode("node-403", "跟进平台处置", "记录补充材料、审核进展和结果", "pending", "")
      ]),
      makePlan("plan-admin-004", "属地行政投诉", "行政路径", "upcoming", [
        makeNode("node-404", "确定受理部门", "根据账号主体与行为发生地匹配渠道", "pending", ""),
        makeNode("node-405", "准备并提交材料", "整理行为链路、账号信息和平台反馈", "pending", ""),
        makeNode("node-406", "跟进受理结果", "记录受理编号与处理意见", "pending", "")
      ]),
      makePlan("plan-legal-004", "进一步法律路径评估", "专业复核", "upcoming", [
        makeNode("node-407", "法务或律师评估", "判断现有材料是否满足进一步路径条件", "pending", ""),
        makeNode("node-408", "补充必要材料", "按专业意见补充主体、损害和交易线索", "pending", ""),
        makeNode("node-409", "决定是否启动", "记录最终评估结论和审批意见", "pending", "")
      ])
    ];
  }

  function makePlan(id, title, channel, status, nodes, failReason) {
    return {
      id: id,
      title: title,
      channel: channel,
      status: status,
      nodes: nodes,
      failReason: failReason || ""
    };
  }

  function makeNode(id, title, desc, status, summary) {
    return {
      id: id,
      title: title,
      desc: desc,
      status: status,
      summary: summary || "",
      attachments: []
    };
  }

  function init() {
    bindEvents();
    render();
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      var workbenchTarget = event.target.closest("[data-workbench]");
      var viewTarget = event.target.closest("[data-screening-view]");
      var scopeTarget = event.target.closest("[data-scope]");
      var filterTarget = event.target.closest("[data-case-filter]");
      var recordTarget = event.target.closest("[data-open-record]");
      var caseTarget = event.target.closest("[data-case-id]");
      var newsTarget = event.target.closest("[data-news-id]");
      var actionTarget = event.target.closest("[data-evidence-action]");
      var planTarget = event.target.closest("[data-plan-id]");
      var strictnessTarget = event.target.closest("[data-strictness]");
      var recipientTarget = event.target.closest("[data-recipient]");

      if (workbenchTarget) {
        state.workbench = workbenchTarget.getAttribute("data-workbench");
        state.keyword = "";
        Common.qs("#evidenceSearch").value = "";
        render();
        return;
      }

      if (viewTarget) {
        state.screeningView = viewTarget.getAttribute("data-screening-view");
        state.recordPage = 1;
        render();
        return;
      }

      if (scopeTarget) {
        setCurrentScope(scopeTarget.getAttribute("data-scope"));
        state.recordPage = 1;
        render();
        return;
      }

      if (filterTarget) {
        setCurrentFilter(filterTarget.getAttribute("data-case-filter"));
        state.recordPage = 1;
        render();
        return;
      }

      if (recordTarget) {
        state.screeningView = "workbench";
        state.selectedScreeningId = recordTarget.getAttribute("data-open-record");
        render();
        return;
      }

      if (caseTarget && !caseTarget.closest("[data-plan-id]")) {
        selectCase(caseTarget.getAttribute("data-case-id"));
        render();
        return;
      }

      if (newsTarget) {
        var currentCase = getCurrentCase();
        if (currentCase) {
          currentCase.selectedNewsId = newsTarget.getAttribute("data-news-id");
          state.selectedNewsId = currentCase.selectedNewsId;
          renderWorkspace();
        }
        return;
      }

      if (planTarget) {
        state.selectedPlanId = planTarget.getAttribute("data-plan-id");
        renderWorkspace();
        return;
      }

      if (strictnessTarget) {
        state.strictness = strictnessTarget.getAttribute("data-strictness");
        renderModal();
        return;
      }

      if (recipientTarget) {
        state.selectedRecipient = recipientTarget.getAttribute("data-recipient");
        renderModal();
        return;
      }

      if (actionTarget) {
        handleAction(actionTarget.getAttribute("data-evidence-action"), actionTarget);
      }
    });

    document.addEventListener("input", function (event) {
      if (event.target.id === "evidenceSearch") {
        state.keyword = event.target.value.trim();
        state.recordPage = 1;
        renderWorkspace();
        return;
      }

      if (event.target.hasAttribute("data-case-field")) {
        var caseItem = getCurrentCase();
        if (caseItem) {
          caseItem[event.target.getAttribute("data-case-field")] = event.target.value;
        }
        return;
      }

      if (event.target.hasAttribute("data-strategy-draft")) {
        var handlingCase = getCurrentCase();
        if (handlingCase) {
          handlingCase.strategyDraft = event.target.value;
        }
      }
    });

    document.addEventListener("change", function (event) {
      if (event.target.hasAttribute("data-advanced-filter")) {
        state.advancedFilters[event.target.getAttribute("data-advanced-filter")] = event.target.value;
        state.recordPage = 1;
        render();
        return;
      }

      if (event.target.hasAttribute("data-alert-task-toggle")) {
        var taskId = event.target.getAttribute("data-alert-task-toggle");
        var task = alertTasks.filter(function (row) { return row.id === taskId; })[0];
        if (task) {
          task.enabled = event.target.checked;
        }
      }

      if (event.target.hasAttribute("data-evidence-upload")) {
        state.evidenceUploads = Array.prototype.slice.call(event.target.files || []).map(function (file) {
          return { name: file.name, type: getFileType(file.name), time: "待保存" };
        });
        renderModal();
      }

      if (event.target.hasAttribute("data-node-upload")) {
        state.nodeUploads = Array.prototype.slice.call(event.target.files || []).map(function (file) {
          return { name: file.name, type: getFileType(file.name) };
        });
        renderModal();
      }
    });
  }

  function render() {
    renderHeader();
    renderKpis();
    renderToolbar();
    renderWorkspace();
  }

  function renderHeader() {
    var isScreening = state.workbench === "screening";
    Common.qs("#evidencePageDescription").textContent = isScreening
      ? "按账号归并传播告警中的负面信息，完成二次初筛、证据获取与执行派发。"
      : "查看派发给我的账号案件，确认治理策略并依次执行多套治理方案。";

    Common.qsa("[data-workbench]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-workbench") === state.workbench);
    });

    Common.qs("#screeningBadge").textContent = cases.filter(function (item) {
      return ["review", "evidence_ready"].indexOf(item.status) > -1;
    }).length;
    Common.qs("#handlingBadge").textContent = cases.filter(function (item) {
      return ["pending_strategy", "processing"].indexOf(item.status) > -1;
    }).length;
  }

  function renderKpis() {
    var kpis;

    if (state.workbench === "screening") {
      kpis = [
        ["待阅读", countStatus("review"), "需要人工复核"],
        ["未派发", countStatus("review") + countStatus("evidence_ready"), "仍在初筛环节"],
        ["已发送", countStatus("pending_strategy") + countStatus("processing") + countStatus("closed_success") + countStatus("closed_failed"), "已进入账号处置"],
        ["未结束", countStatus("review") + countStatus("evidence_ready") + countStatus("pending_strategy") + countStatus("processing"), "仍需继续推进"]
      ];
    } else {
      kpis = [
        ["策略待确认", countMineStatus("pending_strategy"), "等待2号员工研判"],
        ["方案执行中", countMineStatus("processing"), "按优先顺序推进"],
        ["成功关闭", countMineStatus("closed_success"), "已有成功佐证"],
        ["无法推进关闭", countMineStatus("closed_failed"), "已填写总体原因"]
      ];
    }

    Common.qs("#evidenceKpis").innerHTML = kpis.map(function (item) {
      return '<article class="evidence-kpi"><span>' + item[0] + '</span><strong>' + item[1] + '</strong><em>' + item[2] + '</em></article>';
    }).join("");
  }

  function renderToolbar() {
    var currentScope = getCurrentScope();
    var currentFilter = getCurrentFilter();
    var filters = state.workbench === "screening"
      ? [["all", "全部"], ["review", "待阅读"], ["evidence_ready", "待派发"], ["pending_strategy", "策略待确认"], ["processing", "执行中"], ["closed", "已完成"]]
      : [["all", "全部"], ["pending_strategy", "待定策略"], ["processing", "执行中"], ["closed", "已关闭"]];
    var toolbar = Common.qs(".evidence-toolbar");
    var viewTabs = Common.qs("#evidenceViewTabs");
    var filterButton = Common.qs('[data-evidence-action="toggle-filters"]');
    var activeFilterCount = getActiveAdvancedFilterCount();

    toolbar.classList.toggle("is-handling", state.workbench !== "screening");
    viewTabs.hidden = state.workbench !== "screening";
    filterButton.hidden = state.workbench !== "screening";
    viewTabs.innerHTML = state.workbench === "screening" ? [
      '<button class="' + (state.screeningView === "workbench" ? "is-active" : "") + '" type="button" data-screening-view="workbench">作业工作台</button>',
      '<button class="' + (state.screeningView === "records" ? "is-active" : "") + '" type="button" data-screening-view="records">全部记录</button>'
    ].join("") : "";

    Common.qs("#evidenceScopeTabs").innerHTML = [
      '<button class="' + (currentScope === "all" ? "is-active" : "") + '" type="button" data-scope="all">全部案件</button>',
      '<button class="' + (currentScope === "mine" ? "is-active" : "") + '" type="button" data-scope="mine">我的案件</button>'
    ].join("");

    Common.qs("#evidenceFilterTabs").innerHTML = filters.map(function (filter) {
      return '<button class="' + (currentFilter === filter[0] ? "is-active" : "") + '" type="button" data-case-filter="' + filter[0] + '">' + filter[1] + '</button>';
    }).join("");

    filterButton.classList.toggle("is-active", state.filtersExpanded || activeFilterCount > 0);
    filterButton.innerHTML = '<span class="evidence-filter-icon" aria-hidden="true"></span>筛选' + (activeFilterCount ? " " + activeFilterCount : "");
    renderAdvancedFilters();
  }

  function renderWorkspace() {
    var workspace = Common.qs("#evidenceWorkspace");
    var visibleCases = getVisibleCases();
    var selected = getCurrentCase();

    if (state.workbench === "screening" && state.screeningView === "records") {
      workspace.innerHTML = renderRecordsView(visibleCases);
      return;
    }

    if (!visibleCases.length) {
      workspace.innerHTML = '<div class="evidence-empty" style="grid-column: 1 / -1; min-height: 520px;">当前筛选条件下没有账号案件</div>';
      return;
    }

    if (!selected || !visibleCases.some(function (item) { return item.id === selected.id; })) {
      selectCase(visibleCases[0].id);
      selected = visibleCases[0];
    }

    workspace.innerHTML = [
      renderCasePanel(visibleCases),
      state.workbench === "screening" ? renderScreeningDetail(selected) : renderHandlingDetail(selected)
    ].join("");
  }

  function renderAdvancedFilters() {
    var panel = Common.qs("#evidenceAdvancedFilters");
    var filters = state.advancedFilters;

    panel.hidden = state.workbench !== "screening" || !state.filtersExpanded;
    if (panel.hidden) {
      panel.innerHTML = "";
      return;
    }

    panel.innerHTML = [
      renderAdvancedSelect("timeRange", "接入时间", [
        ["3d", "近 3 天"],
        ["today", "今天"],
        ["7d", "近 7 天"],
        ["30d", "近 30 天"],
        ["all", "全部时间"],
        ["custom", "自定义时间"]
      ], filters.timeRange),
      filters.timeRange === "custom" ? renderAdvancedDate("startDate", "开始日期", filters.startDate) : "",
      filters.timeRange === "custom" ? renderAdvancedDate("endDate", "结束日期", filters.endDate) : "",
      renderAdvancedSelect("brand", "品牌", [["all", "全部品牌"]].concat(getCaseOptions("brand")), filters.brand),
      renderAdvancedSelect("platform", "平台", [["all", "全部平台"]].concat(getCaseOptions("platform")), filters.platform),
      renderAdvancedSelect("type", "侵权类型", [["all", "全部类型"]].concat(getCaseOptions("infringementType")), filters.type),
      renderAdvancedSelect("level", "等级", [["all", "全部等级"], ["高", "高"], ["中", "中"], ["低", "低"]], filters.level),
      '<button class="evidence-button evidence-button-secondary" type="button" data-evidence-action="clear-filters">重置筛选</button>'
    ].join("");
  }

  function renderAdvancedSelect(key, label, options, value) {
    return [
      '<label class="evidence-advanced-field"><span>' + label + '</span>',
      '<select data-advanced-filter="' + key + '">',
      options.map(function (option) {
        return '<option value="' + escapeHtml(option[0]) + '"' + (option[0] === value ? " selected" : "") + '>' + escapeHtml(option[1]) + '</option>';
      }).join(""),
      '</select></label>'
    ].join("");
  }

  function renderAdvancedDate(key, label, value) {
    return '<label class="evidence-advanced-field"><span>' + label + '</span><input type="date" value="' + escapeHtml(value) + '" data-advanced-filter="' + key + '"></label>';
  }

  function renderRecordsView(rows) {
    var pageSize = 20;
    var pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    state.recordPage = Math.min(state.recordPage, pageCount);
    var pageRows = rows.slice((state.recordPage - 1) * pageSize, state.recordPage * pageSize);

    return [
      '<section class="evidence-records-panel">',
      '<header class="evidence-records-head"><div><h2>全部案件记录</h2><p>按账号归并查看初筛、派发、执行和关闭全过程，点击记录可回到工作台查看完整材料。</p></div><span class="evidence-records-count">共 ' + rows.length + ' 个账号案件</span></header>',
      pageRows.length ? [
        '<div class="evidence-table-wrap"><table class="evidence-records-table">',
        '<thead><tr><th>接入时间</th><th>案件编号</th><th>账号</th><th>品牌 / 平台</th><th>等级</th><th>侵权类型</th><th>关联信息</th><th>当前状态</th><th>作业流转</th><th>最近更新</th><th>操作</th></tr></thead>',
        '<tbody>',
        pageRows.map(function (item) {
          var latestDate = getCaseDateTime(item);
          var flow = item.assignee ? item.reviewer + " → " + item.assignee : item.reviewer;
          var updatedAt = item.assignedAt || getLatestEvidenceTime(item) || latestDate;
          return [
            '<tr>',
            '<td>' + escapeHtml(latestDate) + '</td>',
            '<td><strong>' + escapeHtml(item.caseNo) + '</strong></td>',
            '<td class="evidence-record-account"><strong>' + escapeHtml(item.accountName) + '</strong><span>' + escapeHtml(item.accountUid) + '</span></td>',
            '<td>' + escapeHtml(item.brand) + '<br><span class="evidence-muted">' + escapeHtml(item.platform) + '</span></td>',
            '<td>' + escapeHtml(item.level) + '</td>',
            '<td>' + escapeHtml(item.infringementType) + '</td>',
            '<td>' + item.news.length + ' 条</td>',
            '<td>' + renderStatus(item.status) + '</td>',
            '<td>' + escapeHtml(flow) + '</td>',
            '<td>' + escapeHtml(updatedAt) + '</td>',
            '<td><button class="evidence-button evidence-button-secondary" type="button" data-open-record="' + item.id + '">' + (item.status === "review" ? "继续初筛" : item.status === "evidence_ready" ? "查看并派发" : "查看记录") + '</button></td>',
            '</tr>'
          ].join("");
        }).join(""),
        '</tbody></table></div>'
      ].join("") : '<div class="evidence-empty" style="min-height: 360px;">当前筛选条件下没有案件记录</div>',
      '<footer class="evidence-records-foot"><span>每页 20 条，第 ' + state.recordPage + ' / ' + pageCount + ' 页</span>',
      '<div class="evidence-pagination">',
      '<button type="button" data-evidence-action="records-prev"' + (state.recordPage <= 1 ? " disabled" : "") + ' aria-label="上一页">‹</button>',
      '<button class="is-active" type="button">' + state.recordPage + '</button>',
      '<button type="button" data-evidence-action="records-next"' + (state.recordPage >= pageCount ? " disabled" : "") + ' aria-label="下一页">›</button>',
      '</div></footer>',
      '</section>'
    ].join("");
  }

  function renderCasePanel(rows) {
    var title = state.workbench === "screening" ? "账号初筛队列" : "账号处置任务";
    var actor = actingUsers[state.workbench];

    return [
      '<aside class="evidence-case-panel">',
      '<header><h2>' + title + '</h2><p>当前作业人：' + escapeHtml(actor) + ' · ' + rows.length + ' 个账号案件</p></header>',
      '<div class="evidence-case-list">',
      rows.map(renderCaseCard).join(""),
      '</div>',
      '</aside>'
    ].join("");
  }

  function renderCaseCard(item) {
    var selectedId = state.workbench === "screening" ? state.selectedScreeningId : state.selectedHandlingId;
    var latestNews = item.news[0];

    return [
      '<button class="evidence-case-card' + (item.id === selectedId ? " is-active" : "") + '" type="button" data-case-id="' + item.id + '">',
      '<div class="evidence-case-top"><span>' + escapeHtml(item.caseNo) + '</span>' + renderStatus(item.status) + '</div>',
      '<div class="evidence-account-line"><span class="evidence-account-avatar">' + escapeHtml(item.accountName.slice(0, 1)) + '</span><span><strong>' + escapeHtml(item.accountName) + '</strong><span>' + escapeHtml(item.platform + " · " + item.brand) + '</span></span></div>',
      '<p>' + escapeHtml(latestNews ? latestNews.title : item.basicFacts) + '</p>',
      '<div class="evidence-card-foot"><span>' + item.news.length + ' 条关联信息 · ' + item.evidenceFiles.length + ' 份固证</span><span>' + escapeHtml(item.infringementType) + '</span></div>',
      '</button>'
    ].join("");
  }

  function renderScreeningDetail(item) {
    var selectedNews = getSelectedNews(item);
    var assigned = ["pending_strategy", "processing", "closed_success", "closed_failed"].indexOf(item.status) > -1;

    return [
      '<section class="evidence-detail-panel">',
      '<header class="evidence-detail-head">',
      '<div><h2>' + escapeHtml(item.accountName) + '</h2><p>' + escapeHtml(item.caseNo + " · " + item.platform + " · " + item.news.length + " 条负面信息归并为同一账号案件") + '</p></div>',
      '<div class="evidence-detail-head-actions">',
      '<button class="evidence-button evidence-button-danger" type="button" data-evidence-action="delete-news"' + (assigned ? " disabled" : "") + '>删除当前信息</button>',
      '<button class="evidence-button" type="button" data-evidence-action="open-evidence"' + (assigned ? " disabled" : "") + '>开始固证</button>',
      '<button class="evidence-button evidence-button-primary" type="button" data-evidence-action="open-assign"' + (!item.evidenceFiles.length || assigned ? " disabled" : "") + '>' + (assigned ? "已推送" : "推送执行人员") + '</button>',
      '</div>',
      '</header>',
      renderInfoStrip(item, true),
      '<div class="evidence-screening-grid">',
      '<div>',
      '<section class="evidence-section">',
      '<header class="evidence-section-head"><div><h3>关联负面信息</h3><p>同平台同账号自动归并，逐条阅读并选择当前处理信息。</p></div><span class="evidence-chip">' + item.news.length + ' 条</span></header>',
      '<div class="evidence-news-list">' + item.news.map(function (news, index) {
        return renderNewsCard(news, index, news.id === selectedNews.id);
      }).join("") + '</div>',
      renderNewsReading(selectedNews),
      '</section>',
      renderEvidenceFiles(item),
      '</div>',
      '<div>',
      renderScreeningDossier(item, assigned),
      '</div>',
      '</div>',
      '</section>'
    ].join("");
  }

  function renderInfoStrip(item, screening) {
    var fifthLabel = screening ? "初筛人员" : "派发时间";
    var fifthValue = screening ? item.reviewer : (item.assignedAt || "未派发");

    return [
      '<section class="evidence-info-strip">',
      '<article><span>案件等级</span><strong>' + escapeHtml(item.level) + '</strong></article>',
      '<article><span>侵权对象</span><strong>' + escapeHtml(item.target) + '</strong></article>',
      '<article><span>疑似类型</span><strong>' + escapeHtml(item.infringementType) + '</strong></article>',
      '<article><span>账号 IP</span><strong>' + escapeHtml(item.ip || "待补充") + '</strong></article>',
      '<article><span>' + fifthLabel + '</span><strong>' + escapeHtml(fifthValue) + '</strong></article>',
      '</section>'
    ].join("");
  }

  function renderNewsCard(news, index, active) {
    return [
      '<button class="evidence-news-card' + (active ? " is-active" : "") + '" type="button" data-news-id="' + news.id + '">',
      '<span class="evidence-news-index">' + String(index + 1).padStart(2, "0") + '</span>',
      '<span><strong>' + escapeHtml(news.title) + '</strong><p>' + escapeHtml(news.excerpt) + '</p><small>' + escapeHtml(news.time + " · " + news.sourceTask) + '</small></span>',
      '<em>' + escapeHtml(news.interactions) + '</em>',
      '</button>'
    ].join("");
  }

  function renderNewsReading(news) {
    if (!news) {
      return '<div class="evidence-empty">当前账号没有可阅读的信息</div>';
    }

    return [
      '<article class="evidence-news-reading">',
      '<h4>' + escapeHtml(news.title) + '</h4>',
      '<p>' + escapeHtml(news.content) + '</p>',
      news.url ? '<a href="' + escapeHtml(news.url) + '" target="_blank" rel="noopener">查看原始内容</a>' : '<span class="evidence-chip" style="margin-top: 10px;">原文已删除</span>',
      '</article>'
    ].join("");
  }

  function renderScreeningDossier(item, readOnly) {
    var disabled = readOnly ? " disabled" : "";

    return [
      '<section class="evidence-section">',
      '<header class="evidence-section-head"><div><h3>账号案件档案</h3><p>系统自动信息先核对，带星号项目由初筛人员确认。</p></div><span class="evidence-ai-mark">接口已预填</span></header>',
      '<div class="evidence-form-grid">',
      renderInputField("案件编号", "caseNo", item.caseNo, true, false),
      renderInputField("账号名称", "accountName", item.accountName, readOnly, false),
      renderSelectField("案件等级", "level", item.level, ["高", "中", "低"], readOnly, true),
      renderInputField("账号属性", "accountAttribute", item.accountAttribute, readOnly, true),
      renderInputField("社会关系", "socialRelation", item.socialRelation, readOnly, true, true),
      renderInputField("账号 IP", "ip", item.ip, readOnly, false),
      renderInputField("平台", "platform", item.platform, true, false),
      renderInputField("主页链接", "homepage", item.homepage, readOnly, false),
      renderSelectField("侵权对象", "target", item.target, ["长城汽车 / 新车产品", "长城汽车 / 品牌声誉", "魏牌 / 售后服务", "坦克 / 产品质量", "欧拉 / 用户权益", "其它对象"], readOnly, true),
      renderSelectField("疑似类型", "infringementType", item.infringementType, ["造谣传谣", "侮辱诽谤", "侵害隐私", "商业诋毁", "商业泄密", "非法经营", "敲诈勒索"], readOnly, true),
      '<div class="evidence-field evidence-field-wide"><label><span class="is-required">基本案情</span><textarea data-case-field="basicFacts"' + disabled + '>' + escapeHtml(item.basicFacts) + '</textarea></label></div>',
      '</div>',
      '<div class="evidence-ai-reason" style="margin-top: 10px;"><strong>负面可取证初判接口结果 · 置信度 ' + item.aiConfidence + '%</strong>' + escapeHtml(item.aiReason) + '</div>',
      '</section>'
    ].join("");
  }

  function renderInputField(label, key, value, readOnly, required, wide) {
    return [
      '<div class="evidence-field' + (wide ? " evidence-field-wide" : "") + '"><label><span' + (required ? ' class="is-required"' : "") + '>' + label + '</span>',
      '<input type="text" data-case-field="' + key + '" value="' + escapeHtml(value || "") + '"' + (readOnly ? " readonly" : "") + '>',
      '</label></div>'
    ].join("");
  }

  function renderSelectField(label, key, value, options, readOnly, required) {
    return [
      '<div class="evidence-field"><label><span' + (required ? ' class="is-required"' : "") + '>' + label + '</span>',
      '<select data-case-field="' + key + '"' + (readOnly ? " disabled" : "") + '>',
      options.map(function (option) { return '<option' + (option === value ? " selected" : "") + '>' + escapeHtml(option) + '</option>'; }).join(""),
      '</select></label></div>'
    ].join("");
  }

  function renderEvidenceFiles(item) {
    var content = item.evidenceFiles.length
      ? item.evidenceFiles.map(function (file) {
        return '<article class="evidence-file-item"><span class="evidence-file-icon">' + escapeHtml(file.type) + '</span><span><strong>' + escapeHtml(file.name) + '</strong><span>' + escapeHtml(file.time) + '</span></span><span class="evidence-status is-green">已固证</span></article>';
      }).join("")
      : '<div class="evidence-empty">尚未上传固证图片、视频或材料</div>';

    return [
      '<section class="evidence-section">',
      '<header class="evidence-section-head"><div><h3>固证材料</h3><p>材料随账号案件整体流转给执行人员。</p></div><span class="evidence-chip">' + item.evidenceFiles.length + ' 份</span></header>',
      '<div class="evidence-file-list">' + content + '</div>',
      '</section>'
    ].join("");
  }

  function renderHandlingDetail(item) {
    var selectedPlan = getSelectedPlan(item);

    return [
      '<section class="evidence-detail-panel">',
      '<header class="evidence-detail-head">',
      '<div><h2>' + escapeHtml(item.accountName) + '</h2><p>' + escapeHtml(item.caseNo + " · 由 " + (item.assignedBy || "待分配") + " 于 " + (item.assignedAt || "--") + " 推送给 " + (item.assignee || "--")) + '</p></div>',
      '<div class="evidence-detail-head-actions">' + renderStatus(item.status) + '<span class="evidence-priority' + (item.level === "中" ? " is-medium" : "") + '">' + escapeHtml(item.level) + '等级</span></div>',
      '</header>',
      renderInfoStrip(item, false),
      '<div class="evidence-handling-overview">',
      '<div>',
      renderCaseOverview(item),
      renderEvidenceFiles(item),
      '</div>',
      '<div>',
      renderStrategySection(item),
      '</div>',
      '</div>',
      item.strategyConfirmed ? renderPlanWorkspace(item, selectedPlan) : "",
      '</section>'
    ].join("");
  }

  function renderCaseOverview(item) {
    return [
      '<section class="evidence-section">',
      '<header class="evidence-section-head"><div><h3>案件与负面信息</h3><p>查看初筛人员填写的档案和全部关联信息。</p></div><span class="evidence-chip">' + item.news.length + ' 条信息</span></header>',
      '<div class="evidence-source-summary">',
      '<article class="evidence-source-item"><span class="evidence-file-icon">案</span><span><strong>基本案情</strong><span>' + escapeHtml(item.basicFacts) + '</span></span><span class="evidence-status">' + escapeHtml(item.infringementType) + '</span></article>',
      item.news.map(function (news) {
        return '<article class="evidence-source-item"><span class="evidence-file-icon">文</span><span><strong>' + escapeHtml(news.title) + '</strong><span>' + escapeHtml(news.time + " · " + news.interactions) + '</span></span><button class="evidence-button" type="button" data-evidence-action="view-source" data-source-id="' + news.id + '">查看</button></article>';
      }).join(""),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderStrategySection(item) {
    var closed = item.status === "closed_success" || item.status === "closed_failed";

    return [
      '<section class="evidence-strategy-card">',
      '<header><div><h3>治理策略</h3><p>策略接口读取案件、负面信息与固证材料后返回建议。</p></div><span class="evidence-ai-mark">接口结果</span></header>',
      item.aiStrategy
        ? '<div class="evidence-strategy-recommendation"><strong>建议治理策略</strong>' + escapeHtml(item.aiStrategy) + '</div>'
        : '<div class="evidence-strategy-recommendation"><strong>历史案件</strong>当前案件已完成策略确认，不再重复请求接口结果。</div>',
      !item.strategyConfirmed && !closed ? [
        '<div class="evidence-strategy-actions">',
        '<button class="evidence-button evidence-button-success" type="button" data-evidence-action="adopt-strategy">采纳建议</button>',
        '<button class="evidence-button" type="button" data-evidence-action="reject-strategy">不采纳</button>',
        '</div>'
      ].join("") : "",
      '<div class="evidence-strategy-edit"><label>最终治理策略</label><textarea class="evidence-strategy-textarea" data-strategy-draft' + (item.strategyConfirmed || closed ? " readonly" : "") + ' placeholder="采纳接口建议后可继续人工修改，或直接输入治理策略。">' + escapeHtml(item.strategyDraft || "") + '</textarea></div>',
      !item.strategyConfirmed && !closed ? '<button class="evidence-button evidence-button-primary" style="margin-top: 10px;" type="button" data-evidence-action="confirm-strategy">确认策略并生成方案</button>' : '<span class="evidence-status is-green" style="margin-top: 10px;">策略已确认</span>',
      '</section>'
    ].join("");
  }

  function renderPlanWorkspace(item, selectedPlan) {
    if (!item.plans.length) {
      return '<div class="evidence-empty">确认策略后将生成治理方案</div>';
    }

    if (!selectedPlan) {
      selectedPlan = item.plans[0];
      state.selectedPlanId = selectedPlan.id;
    }

    return [
      '<section class="evidence-plan-workspace">',
      '<aside class="evidence-plan-list">',
      '<header><h3>治理方案</h3><p>按顺序尝试；前一方案无法推进后再启动下一方案。</p></header>',
      item.plans.map(function (plan, index) {
        return [
          '<button class="evidence-plan-card' + (plan.id === selectedPlan.id ? " is-active" : "") + '" type="button" data-plan-id="' + plan.id + '">',
          '<div class="evidence-plan-head"><strong>' + (index + 1) + '. ' + escapeHtml(plan.title) + '</strong>' + renderPlanStatus(plan.status) + '</div>',
          '<p>' + escapeHtml(plan.channel + (plan.failReason ? " · " + plan.failReason : "")) + '</p>',
          '</button>'
        ].join("");
      }).join(""),
      '</aside>',
      renderPlanDetail(item, selectedPlan),
      '</section>'
    ].join("");
  }

  function renderPlanDetail(item, plan) {
    var closed = item.status === "closed_success" || item.status === "closed_failed";
    var canStart = plan.status === "upcoming" && !closed && canStartPlan(item, plan);
    var allFailed = item.plans.length > 0 && item.plans.every(function (row) { return row.status === "failed"; });

    return [
      '<div class="evidence-plan-detail">',
      '<header><div><h3>' + escapeHtml(plan.title) + '</h3><p>' + escapeHtml(plan.channel + " · 每个节点都可记录总结并上传执行佐证") + '</p></div>',
      canStart ? '<button class="evidence-button evidence-button-primary" type="button" data-evidence-action="start-plan">开始本方案</button>' : renderPlanStatus(plan.status),
      '</header>',
      '<div class="evidence-node-list">',
      plan.nodes.map(function (node, index) {
        var action = node.status === "active" && !closed
          ? '<button class="evidence-button" type="button" data-evidence-action="record-node" data-node-id="' + node.id + '">记录节点</button>'
          : "";
        return [
          '<article class="evidence-node is-' + node.status + '">',
          '<span class="evidence-node-index">' + (node.status === "done" ? "✓" : index + 1) + '</span>',
          '<div class="evidence-node-copy"><strong>' + escapeHtml(node.title) + '</strong><p>' + escapeHtml(node.desc) + '</p>',
          node.summary ? '<em>节点记录：' + escapeHtml(node.summary) + (node.attachments.length ? " · " + node.attachments.length + " 份附件" : "") + '</em>' : "",
          '</div>',
          action,
          '</article>'
        ].join("");
      }).join(""),
      '</div>',
      plan.status === "failed" ? '<div class="evidence-close-panel"><strong>本方案无法推进：</strong>' + escapeHtml(plan.failReason) + '</div>' : "",
      allFailed && item.status !== "closed_failed" ? '<button class="evidence-button evidence-button-danger" type="button" data-evidence-action="open-close-failed">填写总体原因并关闭任务</button>' : "",
      item.status === "closed_failed" ? '<div class="evidence-close-panel"><strong>任务已关闭：</strong>' + escapeHtml(item.closeReason || "全部方案均无法推进") + '</div>' : "",
      item.status === "closed_success" ? '<div class="evidence-close-panel" style="background:#eef9f3;border-color:#b9dfcc;"><strong>任务已成功关闭：</strong>' + escapeHtml(item.closeReason || "治理方案执行成功，佐证已归档") + '</div>' : "",
      '</div>'
    ].join("");
  }

  function handleAction(action, target) {
    var item = getCurrentCase();

    if (action === "toggle-filters") {
      state.filtersExpanded = !state.filtersExpanded;
      renderToolbar();
      return;
    }

    if (action === "clear-filters") {
      state.advancedFilters = {
        timeRange: "3d",
        startDate: "2026-07-29",
        endDate: "2026-07-31",
        brand: "all",
        platform: "all",
        type: "all",
        level: "all"
      };
      state.screeningFilter = "all";
      state.keyword = "";
      Common.qs("#evidenceSearch").value = "";
      state.recordPage = 1;
      render();
      return;
    }

    if (action === "records-prev") {
      state.recordPage = Math.max(1, state.recordPage - 1);
      renderWorkspace();
      return;
    }

    if (action === "records-next") {
      state.recordPage += 1;
      renderWorkspace();
      return;
    }

    if (action === "open-settings") {
      openModal("settings");
      return;
    }

    if (action === "close-modal") {
      closeModal();
      return;
    }

    if (!item && action !== "save-settings") {
      return;
    }

    if (action === "delete-news") {
      openModal("delete", { caseId: item.id, newsId: item.selectedNewsId });
      return;
    }

    if (action === "confirm-delete") {
      deleteSelectedNews();
      return;
    }

    if (action === "open-evidence") {
      state.evidenceUploads = [];
      openModal("evidence", { caseId: item.id });
      return;
    }

    if (action === "external-proof") {
      Common.showToast("已打开外部固证系统入口（原型占位）");
      return;
    }

    if (action === "save-evidence") {
      saveEvidence();
      return;
    }

    if (action === "open-assign") {
      if (!item.evidenceFiles.length) {
        Common.showToast("请先完成固证");
        return;
      }
      state.selectedRecipient = "周薇";
      openModal("assign", { caseId: item.id });
      return;
    }

    if (action === "confirm-assign") {
      assignCase();
      return;
    }

    if (action === "save-settings") {
      closeModal();
      render();
      Common.showToast("接入任务与初判严格程度已保存");
      return;
    }

    if (action === "view-source") {
      var sourceId = target.getAttribute("data-source-id");
      var source = item.news.filter(function (news) { return news.id === sourceId; })[0];
      openModal("source", { source: source });
      return;
    }

    if (action === "adopt-strategy") {
      item.strategyDraft = item.aiStrategy;
      renderWorkspace();
      Common.showToast("已采纳接口建议，可继续人工修改");
      return;
    }

    if (action === "reject-strategy") {
      item.strategyDraft = "";
      renderWorkspace();
      Common.showToast("已清空建议，请人工填写最终治理策略");
      return;
    }

    if (action === "confirm-strategy") {
      if (!item.strategyDraft.trim()) {
        Common.showToast("请先填写或采纳治理策略");
        return;
      }
      item.strategyConfirmed = true;
      item.status = "processing";
      if (!item.plans.length) {
        item.plans = buildPlanTemplates(item.id);
      }
      item.plans[0].status = "active";
      item.plans[0].nodes[0].status = "active";
      state.selectedPlanId = item.plans[0].id;
      render();
      Common.showToast("治理策略已确认，已生成 3 套执行方案");
      return;
    }

    if (action === "start-plan") {
      var plan = getSelectedPlan(item);
      if (plan) {
        plan.status = "active";
        var firstPending = plan.nodes.filter(function (node) { return node.status === "pending"; })[0];
        if (firstPending) {
          firstPending.status = "active";
        }
        renderWorkspace();
        Common.showToast("已开始执行“" + plan.title + "”");
      }
      return;
    }

    if (action === "record-node") {
      var selectedPlan = getSelectedPlan(item);
      var nodeId = target.getAttribute("data-node-id");
      state.nodeUploads = [];
      openModal("node", { caseId: item.id, planId: selectedPlan.id, nodeId: nodeId });
      return;
    }

    if (action === "save-node") {
      saveNodeRecord();
      return;
    }

    if (action === "open-close-failed") {
      openModal("close-failed", { caseId: item.id });
      return;
    }

    if (action === "confirm-close-failed") {
      closeFailedCase();
    }
  }

  function openModal(type, payload) {
    state.modal = { type: type, payload: payload || {} };
    Common.qs("#evidenceModalLayer").hidden = false;
    renderModal();
  }

  function closeModal() {
    state.modal = null;
    Common.qs("#evidenceModalLayer").hidden = true;
    Common.qs("#evidenceModal").innerHTML = "";
  }

  function renderModal() {
    var modal = Common.qs("#evidenceModal");
    if (!state.modal) {
      return;
    }

    var type = state.modal.type;
    modal.className = "evidence-modal" + (type === "settings" || type === "evidence" ? " is-wide" : "");

    if (type === "settings") {
      modal.innerHTML = renderSettingsModal();
    } else if (type === "evidence") {
      modal.innerHTML = renderEvidenceModal();
    } else if (type === "assign") {
      modal.innerHTML = renderAssignModal();
    } else if (type === "delete") {
      modal.innerHTML = renderDeleteModal();
    } else if (type === "source") {
      modal.innerHTML = renderSourceModal(state.modal.payload.source);
    } else if (type === "node") {
      modal.innerHTML = renderNodeModal();
    } else if (type === "close-failed") {
      modal.innerHTML = renderCloseFailedModal();
    }
  }

  function renderModalHead(title, desc) {
    return '<header class="evidence-modal-head"><div><h2 id="evidenceModalTitle">' + escapeHtml(title) + '</h2><p>' + escapeHtml(desc || "") + '</p></div><button class="evidence-modal-close" type="button" data-evidence-action="close-modal" aria-label="关闭">×</button></header>';
  }

  function renderSettingsModal() {
    var strictnessCopy = {
      strict: ["严格", "只推送侵权对象、账号主体和取证条件都较明确的信息，人工量最少。"],
      standard: ["标准", "推送具备明确负面线索、可由人工进一步核验的信息，推荐日常使用。"],
      loose: ["宽松", "保留更多疑似线索，适合专项摸排，但1号员工复核量更大。"]
    };

    return [
      renderModalHead("接入与初判设置", "这里是模块内唯一的智能体配置入口；其它智能能力均直接使用接口结果。"),
      '<div class="evidence-modal-body">',
      '<section class="evidence-setting-section"><header><h3>接入传播告警任务</h3><p>仅接收已启用任务中的负面单条信息，并按平台账号自动归并。</p></header>',
      '<div class="evidence-alert-task-list">',
      alertTasks.map(function (task) {
        return '<article class="evidence-alert-task"><label class="evidence-switch"><input type="checkbox" data-alert-task-toggle="' + task.id + '"' + (task.enabled ? " checked" : "") + '><i></i></label><span><strong>' + escapeHtml(task.brand + " · " + task.name) + '</strong><span>最近同步 ' + escapeHtml(task.sync) + '</span></span><span><strong>' + task.today + ' 条</strong><span>今日负面</span></span><span class="evidence-status' + (task.enabled ? " is-green" : "") + '">' + (task.enabled ? "已接入" : "未接入") + '</span></article>';
      }).join(""),
      '</div></section>',
      '<section class="evidence-setting-section"><header><h3>负面可取证初判智能体严格程度</h3><p>只控制接口向初筛库推送多少信息，不改变后续人工判断流程。</p></header>',
      '<div class="evidence-strictness">',
      Object.keys(strictnessCopy).map(function (key) {
        return '<button class="' + (state.strictness === key ? "is-active" : "") + '" type="button" data-strictness="' + key + '"><strong>' + strictnessCopy[key][0] + '</strong><span>' + strictnessCopy[key][1] + '</span></button>';
      }).join(""),
      '</div></section>',
      '</div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button" type="button" data-evidence-action="close-modal">取消</button><button class="evidence-button evidence-button-primary" type="button" data-evidence-action="save-settings">保存设置</button></footer>'
    ].join("");
  }

  function renderEvidenceModal() {
    var item = findCase(state.modal.payload.caseId);
    var uploadList = state.evidenceUploads.length
      ? '<div class="evidence-file-list" style="margin-top: 12px;">' + state.evidenceUploads.map(function (file) {
        return '<article class="evidence-file-item"><span class="evidence-file-icon">' + escapeHtml(file.type) + '</span><span><strong>' + escapeHtml(file.name) + '</strong><span>等待保存到案件</span></span><span class="evidence-status">待保存</span></article>';
      }).join("") + '</div>'
      : "";

    return [
      renderModalHead("固证结果上传", item.caseNo + " · " + item.accountName),
      '<div class="evidence-modal-body">',
      '<div class="evidence-ai-reason"><strong>当前固证对象</strong>将当前账号下的负面原文、账号主页、评论互动和扩散线索作为一个固证包保存。</div>',
      '<div style="display:flex;justify-content:flex-end;margin:12px 0;"><button class="evidence-button" type="button" data-evidence-action="external-proof">打开外部固证系统</button></div>',
      '<label class="evidence-upload-zone"><span><strong>上传本地固证结果</strong><span>支持图片、视频、PDF、压缩包等材料，可多选上传。</span><input type="file" multiple accept="image/*,video/*,.pdf,.zip" data-evidence-upload></span></label>',
      uploadList,
      '<div class="evidence-field" style="margin-top: 12px;"><label><span>固证说明</span><textarea id="evidenceUploadNote" placeholder="说明本次上传包含的页面、互动区、账号信息或其它证据。"></textarea></label></div>',
      '</div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button" type="button" data-evidence-action="close-modal">取消</button><button class="evidence-button evidence-button-primary" type="button" data-evidence-action="save-evidence">保存固证</button></footer>'
    ].join("");
  }

  function renderAssignModal() {
    var item = findCase(state.modal.payload.caseId);

    return [
      renderModalHead("推送执行人员", item.caseNo + " · " + item.accountName + " · " + item.evidenceFiles.length + " 份固证材料"),
      '<div class="evidence-modal-body">',
      '<div class="evidence-recipient-grid">',
      recipients.map(function (person) {
        return '<button class="evidence-recipient' + (state.selectedRecipient === person.name ? " is-active" : "") + '" type="button" data-recipient="' + escapeHtml(person.name) + '"><span>' + escapeHtml(person.name.slice(0, 1)) + '</span><span><strong>' + escapeHtml(person.name) + '</strong><small>' + escapeHtml(person.role + " · " + person.load) + '</small></span></button>';
      }).join(""),
      '</div></div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button" type="button" data-evidence-action="close-modal">取消</button><button class="evidence-button evidence-button-primary" type="button" data-evidence-action="confirm-assign">确认推送</button></footer>'
    ].join("");
  }

  function renderDeleteModal() {
    var item = findCase(state.modal.payload.caseId);
    var news = item.news.filter(function (row) { return row.id === state.modal.payload.newsId; })[0];
    var last = item.news.length === 1;

    return [
      renderModalHead("删除负面信息", "删除后不会进入固证和账号处置流程"),
      '<div class="evidence-modal-body"><div class="evidence-confirm-copy">确定删除“' + escapeHtml(news ? news.title : "当前信息") + '”吗？' + (last ? "<br>这是该账号的最后一条信息，删除后账号案件也会同时直接删除。" : "<br>该账号下其它关联信息仍会保留。") + '</div></div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button" type="button" data-evidence-action="close-modal">取消</button><button class="evidence-button evidence-button-danger" type="button" data-evidence-action="confirm-delete">确认删除</button></footer>'
    ].join("");
  }

  function renderSourceModal(source) {
    return [
      renderModalHead("负面信息原文", source ? source.time + " · " + source.sourceTask : ""),
      '<div class="evidence-modal-body">',
      source ? '<article class="evidence-news-reading" style="margin-top:0;"><h4>' + escapeHtml(source.title) + '</h4><p>' + escapeHtml(source.content) + '</p><span class="evidence-chip" style="margin-top:10px;">' + escapeHtml(source.interactions) + '</span></article>' : '<div class="evidence-empty">信息不存在</div>',
      '</div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button evidence-button-primary" type="button" data-evidence-action="close-modal">关闭</button></footer>'
    ].join("");
  }

  function renderNodeModal() {
    var item = findCase(state.modal.payload.caseId);
    var plan = item.plans.filter(function (row) { return row.id === state.modal.payload.planId; })[0];
    var node = plan.nodes.filter(function (row) { return row.id === state.modal.payload.nodeId; })[0];
    var uploads = state.nodeUploads.length
      ? '<div class="evidence-file-list" style="margin-top:10px;">' + state.nodeUploads.map(function (file) {
        return '<article class="evidence-file-item"><span class="evidence-file-icon">' + escapeHtml(file.type) + '</span><span><strong>' + escapeHtml(file.name) + '</strong><span>等待保存到节点</span></span><span class="evidence-status">待保存</span></article>';
      }).join("") + '</div>'
      : "";

    return [
      renderModalHead("记录执行节点", plan.title + " · " + node.title),
      '<div class="evidence-modal-body">',
      '<div class="evidence-field"><label><span class="is-required">节点执行总结</span><textarea id="nodeSummary" placeholder="记录做了什么、对方或平台如何反馈、当前判断是什么。">' + escapeHtml(node.summary || "") + '</textarea></label></div>',
      '<div class="evidence-field" style="margin-top:10px;"><label><span class="is-required">节点结果</span><select id="nodeResult"><option value="continue">完成本节点，继续方案</option><option value="success">确认方案成功并关闭任务</option><option value="blocked">本方案无法继续</option></select></label></div>',
      '<label class="evidence-upload-zone" style="min-height:96px;margin-top:12px;"><span><strong>上传执行佐证</strong><span>可上传截图、视频、平台回执、法院或部门材料。</span><input type="file" multiple accept="image/*,video/*,.pdf,.zip" data-node-upload></span></label>',
      uploads,
      '</div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button" type="button" data-evidence-action="close-modal">取消</button><button class="evidence-button evidence-button-primary" type="button" data-evidence-action="save-node">保存节点记录</button></footer>'
    ].join("");
  }

  function renderCloseFailedModal() {
    var item = findCase(state.modal.payload.caseId);
    return [
      renderModalHead("关闭账号处置任务", item.caseNo + " · 所有治理方案均无法继续"),
      '<div class="evidence-modal-body"><div class="evidence-field"><label><span class="is-required">总体无法推进原因</span><textarea id="caseCloseReason" placeholder="汇总各方案失败原因，说明为什么当前案件无法继续推进。"></textarea></label></div></div>',
      '<footer class="evidence-modal-foot"><button class="evidence-button" type="button" data-evidence-action="close-modal">取消</button><button class="evidence-button evidence-button-danger" type="button" data-evidence-action="confirm-close-failed">确认关闭</button></footer>'
    ].join("");
  }

  function deleteSelectedNews() {
    var item = findCase(state.modal.payload.caseId);
    var newsId = state.modal.payload.newsId;
    item.news = item.news.filter(function (news) { return news.id !== newsId; });

    if (!item.news.length) {
      cases = cases.filter(function (row) { return row.id !== item.id; });
      state.selectedScreeningId = "";
      closeModal();
      render();
      Common.showToast("信息与账号案件已直接删除");
      return;
    }

    item.selectedNewsId = item.news[0].id;
    closeModal();
    render();
    Common.showToast("当前负面信息已直接删除");
  }

  function saveEvidence() {
    var item = findCase(state.modal.payload.caseId);
    if (!state.evidenceUploads.length) {
      Common.showToast("请先选择本地固证文件");
      return;
    }

    var now = "2026-07-31 10:36";
    state.evidenceUploads.forEach(function (file) {
      item.evidenceFiles.push({ name: file.name, type: file.type, time: now });
    });
    item.status = "evidence_ready";
    closeModal();
    render();
    Common.showToast("固证已保存，可以推送执行人员");
  }

  function assignCase() {
    var item = findCase(state.modal.payload.caseId);
    item.assignedBy = actingUsers.screening;
    item.assignee = state.selectedRecipient;
    item.assignedAt = "2026-07-31 10:38";
    item.status = "pending_strategy";
    item.aiStrategy = buildAiStrategy(item);
    item.plans = buildPlanTemplates(item.id);
    state.selectedHandlingId = item.id;
    closeModal();
    render();
    Common.showToast("账号案件已推送给 " + item.assignee);
  }

  function buildAiStrategy(item) {
    return "建议优先使用平台投诉路径，围绕“" + item.infringementType + "”整理原文、账号和事实材料；同步准备正式沟通方案。若平台处理无效，再根据账号主体和现有证据评估行政或其它专业路径。涉及进一步法律程序时需法务或律师复核。";
  }

  function saveNodeRecord() {
    var item = findCase(state.modal.payload.caseId);
    var plan = item.plans.filter(function (row) { return row.id === state.modal.payload.planId; })[0];
    var node = plan.nodes.filter(function (row) { return row.id === state.modal.payload.nodeId; })[0];
    var summary = Common.qs("#nodeSummary").value.trim();
    var result = Common.qs("#nodeResult").value;

    if (!summary) {
      Common.showToast("请填写节点执行总结");
      return;
    }

    if (result === "success" && !state.nodeUploads.length) {
      Common.showToast("方案成功时必须上传成功佐证");
      return;
    }

    node.summary = summary;
    node.attachments = state.nodeUploads.slice();
    node.status = "done";

    if (result === "success") {
      plan.status = "success";
      item.status = "closed_success";
      item.closeReason = "“" + plan.title + "”执行成功，成功佐证已归档。";
      item.plans.forEach(function (other) {
        if (other.id !== plan.id && other.status === "upcoming") {
          other.status = "skipped";
        }
      });
    } else if (result === "blocked") {
      plan.status = "failed";
      plan.failReason = summary;
    } else {
      var nodeIndex = plan.nodes.findIndex(function (row) { return row.id === node.id; });
      var nextNode = plan.nodes[nodeIndex + 1];
      if (nextNode) {
        nextNode.status = "active";
      }
    }

    closeModal();
    render();
    Common.showToast(result === "success" ? "方案已成功，任务完成" : result === "blocked" ? "已结束本方案，可开始下一方案" : "节点记录已保存");
  }

  function closeFailedCase() {
    var item = findCase(state.modal.payload.caseId);
    var reason = Common.qs("#caseCloseReason").value.trim();
    if (!reason) {
      Common.showToast("请填写总体无法推进原因");
      return;
    }
    item.closeReason = reason;
    item.status = "closed_failed";
    closeModal();
    render();
    Common.showToast("账号处置任务已关闭并留存");
  }

  function getVisibleCases() {
    var scope = getCurrentScope();
    var filter = getCurrentFilter();
    var actor = actingUsers[state.workbench];

    return cases.filter(function (item) {
      var inWorkbench = state.workbench === "screening"
        ? ["review", "evidence_ready", "pending_strategy", "processing", "closed_success", "closed_failed"].indexOf(item.status) > -1
        : ["pending_strategy", "processing", "closed_success", "closed_failed"].indexOf(item.status) > -1;
      var scopeMatched = scope === "all" || (state.workbench === "screening" ? item.reviewer === actor : item.assignee === actor);
      var filterMatched;

      if (filter === "all") {
        filterMatched = true;
      } else if (filter === "assigned") {
        filterMatched = ["pending_strategy", "processing", "closed_success", "closed_failed"].indexOf(item.status) > -1;
      } else if (filter === "closed") {
        filterMatched = item.status === "closed_success" || item.status === "closed_failed";
      } else {
        filterMatched = item.status === filter;
      }

      var keywordText = [item.caseNo, item.brand, item.accountName, item.platform, item.infringementType]
        .concat(item.news.map(function (news) { return news.title; }))
        .join(" ")
        .toLowerCase();

      var advancedMatched = state.workbench !== "screening" || matchesAdvancedFilters(item);

      return inWorkbench && scopeMatched && filterMatched && advancedMatched && (!state.keyword || keywordText.indexOf(state.keyword.toLowerCase()) > -1);
    });
  }

  function matchesAdvancedFilters(item) {
    var filters = state.advancedFilters;
    var caseDate = getCaseDate(item);
    var timeMatched = true;

    if (filters.timeRange === "today") {
      timeMatched = caseDate === "2026-07-31";
    } else if (filters.timeRange === "3d") {
      timeMatched = caseDate >= "2026-07-29" && caseDate <= "2026-07-31";
    } else if (filters.timeRange === "7d") {
      timeMatched = caseDate >= "2026-07-25" && caseDate <= "2026-07-31";
    } else if (filters.timeRange === "30d") {
      timeMatched = caseDate >= "2026-07-02" && caseDate <= "2026-07-31";
    } else if (filters.timeRange === "custom") {
      timeMatched = (!filters.startDate || caseDate >= filters.startDate) && (!filters.endDate || caseDate <= filters.endDate);
    }

    return timeMatched
      && (filters.brand === "all" || item.brand === filters.brand)
      && (filters.platform === "all" || item.platform === filters.platform)
      && (filters.type === "all" || item.infringementType === filters.type)
      && (filters.level === "all" || item.level === filters.level);
  }

  function getCaseOptions(field) {
    var seen = {};
    return cases.reduce(function (options, item) {
      var value = item[field];
      if (value && !seen[value]) {
        seen[value] = true;
        options.push([value, value]);
      }
      return options;
    }, []);
  }

  function getCaseDate(item) {
    return getCaseDateTime(item).slice(0, 10);
  }

  function getCaseDateTime(item) {
    var times = item.news.map(function (news) { return news.time; }).sort().reverse();
    return times[0] || item.assignedAt || "";
  }

  function getLatestEvidenceTime(item) {
    var times = item.evidenceFiles.map(function (file) { return file.time; }).filter(function (time) {
      return /^\d{4}-\d{2}-\d{2}/.test(time);
    }).sort().reverse();
    return times[0] || "";
  }

  function getActiveAdvancedFilterCount() {
    var filters = state.advancedFilters;
    var count = filters.timeRange === "3d" ? 0 : 1;
    ["brand", "platform", "type", "level"].forEach(function (key) {
      if (filters[key] !== "all") {
        count += 1;
      }
    });
    return count;
  }

  function selectCase(caseId) {
    var item = findCase(caseId);
    if (!item) {
      return;
    }
    if (state.workbench === "screening") {
      state.selectedScreeningId = caseId;
    } else {
      state.selectedHandlingId = caseId;
      state.selectedPlanId = item.plans.length ? item.plans[0].id : "";
    }
  }

  function getCurrentCase() {
    return findCase(state.workbench === "screening" ? state.selectedScreeningId : state.selectedHandlingId);
  }

  function findCase(caseId) {
    return cases.filter(function (item) { return item.id === caseId; })[0] || null;
  }

  function getSelectedNews(item) {
    return item.news.filter(function (news) { return news.id === item.selectedNewsId; })[0] || item.news[0] || null;
  }

  function getSelectedPlan(item) {
    return item.plans.filter(function (plan) { return plan.id === state.selectedPlanId; })[0] || item.plans[0] || null;
  }

  function getCurrentScope() {
    return state.workbench === "screening" ? state.screeningScope : state.handlingScope;
  }

  function setCurrentScope(scope) {
    if (state.workbench === "screening") {
      state.screeningScope = scope;
    } else {
      state.handlingScope = scope;
    }
  }

  function getCurrentFilter() {
    return state.workbench === "screening" ? state.screeningFilter : state.handlingFilter;
  }

  function setCurrentFilter(filter) {
    if (state.workbench === "screening") {
      state.screeningFilter = filter;
    } else {
      state.handlingFilter = filter;
    }
  }

  function countStatus(status) {
    return cases.filter(function (item) { return item.status === status; }).length;
  }

  function countMineStatus(status) {
    return cases.filter(function (item) {
      return item.status === status && item.assignee === actingUsers.handling;
    }).length;
  }

  function countNews(statuses) {
    return cases.filter(function (item) { return statuses.indexOf(item.status) > -1; })
      .reduce(function (sum, item) { return sum + item.news.length; }, 0);
  }

  function canStartPlan(item, plan) {
    var planIndex = item.plans.findIndex(function (row) { return row.id === plan.id; });
    if (planIndex === 0) {
      return true;
    }
    return item.plans.slice(0, planIndex).every(function (row) {
      return row.status === "failed";
    });
  }

  function renderStatus(status) {
    var map = {
      review: ["待阅读", "is-orange"],
      evidence_ready: ["待派发", "is-green"],
      pending_strategy: ["策略待确认", "is-orange"],
      processing: ["执行中", ""],
      closed_success: ["成功关闭", "is-green"],
      closed_failed: ["无法推进关闭", "is-red"]
    };
    var value = map[status] || [status, ""];
    return '<span class="evidence-status ' + value[1] + '">' + value[0] + '</span>';
  }

  function renderPlanStatus(status) {
    var map = {
      upcoming: ["待开始", ""],
      active: ["执行中", "is-orange"],
      failed: ["无法推进", "is-red"],
      success: ["已成功", "is-green"],
      skipped: ["无需执行", ""]
    };
    var value = map[status] || [status, ""];
    return '<span class="evidence-status ' + value[1] + '">' + value[0] + '</span>';
  }

  function getFileType(name) {
    var parts = String(name).split(".");
    return parts.length > 1 ? parts.pop().toUpperCase().slice(0, 4) : "FILE";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  init();
})();
