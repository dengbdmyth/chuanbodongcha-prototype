(function () {
  "use strict";

  var Common = window.BrandInsightCommon;
  var role = document.body.getAttribute("data-disposal-role") || "verifier";
  var storageKey = "brand-insight-disposal-v3";

  var roleConfig = {
    verifier: {
      department: "负面信息运营部门",
      title: "负面核验与业务分发",
      breadcrumb: "信息处置 · 负面核验",
      description: "核验传播告警推送的信息，补充业务标签并向相关部门发送协作信息。",
      defaultStatus: "pending_verify",
      statuses: [["all", "全部信息"], ["pending_verify", "待核验"], ["pending_route", "待分发"], ["distributed", "已分发"]]
    },
    aftersales: {
      department: "售后服务部门",
      title: "产品质量信息核验",
      breadcrumb: "信息处置 · 售后核验",
      description: "独立核实产品质量投诉，整理沟通记录与产品材料，并向协作部门返回核验结论。",
      defaultStatus: "pending",
      statuses: [["all", "全部任务"], ["pending", "待核验"], ["in_progress", "核验中"], ["returned", "已回传"]]
    },
    operation: {
      department: "信息处置部门",
      title: "负面信息处置",
      breadcrumb: "信息处置 · 信息处置部门",
      description: "处理非论坛类负面信息，结合售后与取证材料独立研判、执行处置并跟踪删除结果。",
      defaultStatus: "pending",
      statuses: [["all", "全部负面"], ["pending", "未处置负面"], ["disposed", "已处置负面"], ["suspended", "挂起负面"]]
    },
    forum: {
      department: "论坛信息处置部门",
      title: "论坛与社区信息处置",
      breadcrumb: "信息处置 · 论坛处置部门",
      description: "处理论坛、贴吧及社区负面信息，结合协作材料独立执行处置并跟踪删除结果。",
      defaultStatus: "pending",
      statuses: [["all", "全部负面"], ["pending", "未处置负面"], ["disposed", "已处置负面"], ["suspended", "挂起负面"]]
    }
  };

  var dailyProjects = [
    { id: "enterprise", name: "长城企业", tasks: ["长城企业日常负面预警", "长城品牌声誉风险预警"] },
    { id: "tank", name: "坦克品牌", tasks: ["坦克品牌日常负面预警"] },
    { id: "wey", name: "魏牌品牌", tasks: ["魏牌口碑负面预警"] },
    { id: "haval", name: "哈弗品牌", tasks: ["哈弗产品与售后预警"] },
    { id: "ora", name: "欧拉品牌", tasks: ["欧拉口碑负面信息预警"] },
    { id: "pickup", name: "皮卡品牌", tasks: ["长城皮卡品牌风险预警"] }
  ];

  var specialProjects = [
    { id: "chengdu-show", name: "成都车展专项", period: "08-01 至 08-12", status: "active", tasks: ["成都车展单条负面预警"] },
    { id: "summer-quality", name: "夏季质量问题专项", period: "07-10 至 07-31", status: "ended", tasks: ["高温质量问题专项预警"] }
  ];

  var records = [
    makeRecord({
      id: "info-001", brand: "长城企业", projectId: "enterprise", title: "新车型交付后制动异响，车主称多次检修仍未解决", platform: "微博", author: "车主小秦", publishTime: "2026-08-04 09:06", alertTime: "2026-08-04 09:12", tags: ["产品质量", "制动系统"], quality: true, forum: false, sourceTask: "长城企业日常负面预警", verifierStatus: "distributed", aftersalesStatus: "pending", operationStatus: "pending", aftersalesDependency: "waiting", evidenceDependency: null, readVerifier: true, readOperation: false
    }),
    makeRecord({
      id: "info-002", brand: "长城企业", projectId: "enterprise", title: "品牌发布会参数被质疑夸大，短视频评论持续增加", platform: "抖音", author: "车圈观察站", publishTime: "2026-08-04 08:42", alertTime: "2026-08-04 08:49", tags: ["品牌争议", "参数质疑"], sourceTask: "长城品牌声誉风险预警", verifierStatus: "pending_verify"
    }),
    makeRecord({
      id: "info-003", brand: "长城企业", projectId: "enterprise", title: "售后服务响应慢引发集中讨论，相关内容被多个账号转载", platform: "小红书", author: "汽车生活手册", publishTime: "2026-08-03 18:20", alertTime: "2026-08-03 18:28", tags: ["售后服务", "集中转载"], sourceTask: "长城企业日常负面预警", verifierStatus: "pending_route", readVerifier: true
    }),
    makeRecord({
      id: "info-004", brand: "长城企业", projectId: "enterprise", title: "网传经销商大面积退网，品牌渠道稳定性受到质疑", platform: "微信公众号", author: "汽车渠道参考", publishTime: "2026-08-02 14:10", alertTime: "2026-08-02 14:21", tags: ["渠道经营", "不实信息"], sourceTask: "长城品牌声誉风险预警", verifierStatus: "distributed", operationStatus: "disposed", readVerifier: true, readOperation: true, disposedTime: "2026-08-02 16:35", deletionCheck: "deleted", deletedTime: "2026-08-03 09:40"
    }),
    makeRecord({
      id: "info-005", brand: "长城企业", projectId: "enterprise", title: "车友论坛集中反馈车机黑屏，帖子内存在多位车主跟帖", platform: "汽车之家论坛", author: "北方车友2025", publishTime: "2026-08-04 07:35", alertTime: "2026-08-04 07:44", tags: ["产品质量", "车机系统", "论坛贴吧"], quality: true, forum: true, community: "长城车友论坛 / 用车交流版", sourceTask: "长城企业日常负面预警", verifierStatus: "distributed", aftersalesStatus: "returned", forumStatus: "pending", aftersalesDependency: "returned", evidenceDependency: "complete", readVerifier: true, readForum: false, aftersalesConclusion: "部分属实", aftersalesAdvice: "已核实为早期软件版本兼容问题，建议处置夸大为普遍故障的表述，并附最新升级说明。", materialFiles: ["车机版本核验记录.pdf", "售后沟通截图.png"]
    }),
    makeRecord({
      id: "info-006", brand: "坦克品牌", projectId: "tank", title: "越野路况下底盘异响被描述为结构性缺陷", platform: "今日头条", author: "越野深度评", publishTime: "2026-08-04 10:05", alertTime: "2026-08-04 10:10", tags: ["产品质量", "底盘异响"], quality: true, sourceTask: "坦克品牌日常负面预警", verifierStatus: "distributed", aftersalesStatus: "in_progress", operationStatus: "pending", aftersalesDependency: "waiting", readVerifier: true
    }),
    makeRecord({
      id: "info-007", brand: "魏牌品牌", projectId: "wey", title: "论坛帖子引用旧款问题质疑新款可靠性", platform: "百度贴吧", author: "老车主聊车", publishTime: "2026-08-01 20:16", alertTime: "2026-08-01 20:26", tags: ["论坛贴吧", "产品可靠性"], forum: true, community: "魏牌吧 / 产品讨论", sourceTask: "魏牌口碑负面预警", verifierStatus: "distributed", forumStatus: "suspended", readForum: true
    }),
    makeRecord({
      id: "info-008", brand: "哈弗品牌", projectId: "haval", title: "自媒体声称新车碰撞测试数据存在隐瞒", platform: "抖音", author: "安全实验室", publishTime: "2026-08-03 11:12", alertTime: "2026-08-03 11:18", tags: ["产品安全", "疑似不实"], sourceTask: "哈弗产品与售后预警", verifierStatus: "distributed", operationStatus: "pending", evidenceDependency: "waiting", readOperation: false
    }),
    makeRecord({
      id: "info-009", brand: "欧拉品牌", projectId: "ora", title: "车主投诉续航与宣传差异较大并要求公开测试条件", platform: "微博", author: "新能源车主阿文", publishTime: "2026-08-04 06:58", alertTime: "2026-08-04 07:05", tags: ["产品质量", "续航争议"], quality: true, sourceTask: "欧拉口碑负面信息预警", verifierStatus: "distributed", aftersalesStatus: "in_progress", operationStatus: "pending", aftersalesDependency: "waiting"
    }),
    makeRecord({
      id: "info-010", brand: "皮卡品牌", projectId: "pickup", title: "皮卡论坛传播疑似停产消息，多个帖子引用同一匿名信源", platform: "皮卡论坛", author: "荒野驾驶员", publishTime: "2026-07-31 16:45", alertTime: "2026-07-31 16:53", tags: ["论坛贴吧", "停产传言"], forum: true, community: "皮卡论坛 / 行业动态", sourceTask: "长城皮卡品牌风险预警", verifierStatus: "distributed", forumStatus: "disposed", readForum: true, disposedTime: "2026-07-31 18:10", deletionCheck: "online"
    }),
    makeRecord({
      id: "info-011", brand: "长城企业", projectType: "special", projectId: "chengdu-show", title: "成都车展现场视频质疑展车配置与宣传版本不一致", platform: "快手", author: "成都看车团", publishTime: "2026-08-04 10:22", alertTime: "2026-08-04 10:25", tags: ["成都车展", "配置争议"], sourceTask: "成都车展单条负面预警", verifierStatus: "distributed", operationStatus: "pending", evidenceDependency: "complete", readOperation: false
    }),
    makeRecord({
      id: "info-012", brand: "坦克品牌", projectType: "special", projectId: "summer-quality", title: "高温环境下空调制冷效果差，投诉内容缺少车辆工况信息", platform: "小红书", author: "夏日车生活", publishTime: "2026-07-28 13:40", alertTime: "2026-07-28 13:48", tags: ["产品质量", "空调系统"], quality: true, sourceTask: "高温质量问题专项预警", verifierStatus: "distributed", aftersalesStatus: "returned", operationStatus: "disposed", aftersalesDependency: "returned", readOperation: true, disposedTime: "2026-07-29 09:18", deletionCheck: "deleted", deletedTime: "2026-07-30 15:20", aftersalesConclusion: "无法确认", aftersalesAdvice: "车辆工况和环境条件不完整，建议处置绝对化质量结论，保留正常使用建议。", materialFiles: ["售后排查说明.pdf"]
    })
  ];

  var state = {
    mode: "daily",
    projectId: "enterprise",
    status: roleConfig[role].defaultStatus,
    keyword: "",
    timeRange: "7d",
    tag: "all",
    platform: "all",
    sort: "alert_desc",
    selectedIds: [],
    modal: null,
    uploads: [],
    routeMode: "assist"
  };

  resetDemoDataOnReload();
  restoreData();
  init();

  function makeRecord(options) {
    var base = {
      projectType: "daily",
      excerpt: "传播告警识别到该信息包含明确负面判断，需人工核验并进入对应部门协作流程。",
      content: "该内容围绕品牌或产品问题作出明确负面陈述，并在评论区引发持续讨论。原文包含具体问题描述、用户观点和相关传播线索，需要结合业务材料判断后续处理方式。",
      url: "https://example.com/source",
      tags: [],
      quality: false,
      forum: false,
      community: "",
      verifierStatus: "pending_verify",
      aftersalesStatus: null,
      operationStatus: null,
      forumStatus: null,
      aftersalesDependency: null,
      evidenceDependency: null,
      readVerifier: false,
      readAftersales: false,
      readOperation: false,
      readForum: false,
      screenshot: true,
      routeDepartments: [],
      materialFiles: [],
      aftersalesConclusion: "",
      aftersalesAdvice: "",
      disposedTime: "",
      disposalMethod: "",
      disposalNote: "",
      deletionCheck: "pending",
      deletedTime: ""
    };
    Object.keys(options).forEach(function (key) { base[key] = options[key]; });
    return base;
  }

  function init() {
    bindEvents();
    render();
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      var modeTarget = event.target.closest("[data-dispose-mode]");
      var projectTarget = event.target.closest("[data-dispose-project]");
      var statusTarget = event.target.closest("[data-dispose-status]");
      var actionTarget = event.target.closest("[data-dispose-action]");

      if (modeTarget) {
        state.mode = modeTarget.getAttribute("data-dispose-mode");
        state.projectId = state.mode === "daily" ? dailyProjects[0].id : specialProjects[0].id;
        state.selectedIds = [];
        render();
        return;
      }

      if (projectTarget) {
        state.projectId = projectTarget.getAttribute("data-dispose-project");
        state.selectedIds = [];
        render();
        return;
      }

      if (statusTarget) {
        state.status = statusTarget.getAttribute("data-dispose-status");
        state.selectedIds = [];
        render();
        return;
      }

      if (actionTarget) {
        handleAction(actionTarget.getAttribute("data-dispose-action"), actionTarget);
      }
    });

    document.addEventListener("input", function (event) {
      if (event.target.id === "disposeKeyword") {
        state.keyword = event.target.value.trim();
        renderListArea();
      }
    });

    document.addEventListener("change", function (event) {
      if (event.target.hasAttribute("data-dispose-filter")) {
        state[event.target.getAttribute("data-dispose-filter")] = event.target.value;
        state.selectedIds = [];
        renderListArea();
        return;
      }

      if (event.target.hasAttribute("data-record-select")) {
        toggleSelection(event.target.getAttribute("data-record-select"), event.target.checked);
        return;
      }

      if (event.target.id === "disposeSelectAll") {
        state.selectedIds = event.target.checked ? getVisibleRecords().map(function (item) { return item.id; }) : [];
        renderListArea();
        return;
      }

      if (event.target.hasAttribute("data-material-upload")) {
        state.uploads = Array.prototype.slice.call(event.target.files || []).map(function (file) { return file.name; });
        renderModal();
        return;
      }

      if (event.target.hasAttribute("data-route-label") && state.modal && state.modal.type === "detail") {
        var routeItem = findRecord(state.modal.id);
        if (routeItem) {
          routeItem.quality = !!Common.qs('[data-route-label="quality"]:checked');
          routeItem.forum = !!Common.qs('[data-route-label="forum"]:checked');
          routeItem.evidenceDependency = Common.qs('[data-route-label="evidence"]:checked') ? "waiting" : null;
          renderModal();
        }
      }
    });
  }

  function render() {
    renderHeader();
    renderKpis();
    renderProjects();
    renderListArea();
  }

  function renderHeader() {
    var config = roleConfig[role];
    Common.qs("#disposeDepartment").textContent = config.department;
    Common.qs("#disposeTitle").textContent = config.title;
    Common.qs("#disposeDescription").textContent = config.description;
    Common.qs("#disposeBreadcrumb").textContent = config.breadcrumb;

    var actions = [];
    if (role === "verifier") {
      actions.push('<button class="dispose-button" type="button" data-dispose-action="open-routing-rules">自动分发规则</button>');
      actions.push('<button class="dispose-button is-primary" type="button" data-dispose-action="new-special">新建专项</button>');
    } else if (role === "operation" || role === "forum") {
      actions.push('<button class="dispose-button is-primary" type="button" data-dispose-action="open-report">今日工作日报</button>');
    } else {
      actions.push('<button class="dispose-button" type="button" data-dispose-action="export">导出当前结果</button>');
    }
    Common.qs("#disposeHeadActions").innerHTML = actions.join("");
  }

  function renderKpis() {
    var projectRows = getProjectRecords(false);
    var values;
    if (role === "verifier") {
      values = [
        ["待核验", countBy(projectRows, "verifierStatus", "pending_verify"), "需要人工确认"],
        ["待分发", countBy(projectRows, "verifierStatus", "pending_route"), "已确认负面"],
        ["今日已分发", countBy(projectRows, "verifierStatus", "distributed"), "部门协作信息"],
        ["今日已阅读", projectRows.filter(function (item) { return item.readVerifier; }).length, "本部门阅读记录"]
      ];
    } else if (role === "aftersales") {
      values = [
        ["待核验", countBy(projectRows, "aftersalesStatus", "pending"), "质量协作信息"],
        ["核验中", countBy(projectRows, "aftersalesStatus", "in_progress"), "本部门处理中"],
        ["今日已回传", countBy(projectRows, "aftersalesStatus", "returned"), "协作材料已返回"],
        ["未阅读", projectRows.filter(function (item) { return item.aftersalesStatus && !item.readAftersales; }).length, "本部门阅读状态"]
      ];
    } else {
      var statusField = role === "operation" ? "operationStatus" : "forumStatus";
      var readField = role === "operation" ? "readOperation" : "readForum";
      var pendingRows = projectRows.filter(function (item) { return item[statusField] === "pending"; });
      values = [
        ["未阅读", pendingRows.filter(function (item) { return !item[readField]; }).length, "当前未处置信息"],
        ["可以处置", pendingRows.filter(canDispose).length, "协作材料已齐"],
        ["等待协作", pendingRows.filter(function (item) { return !canDispose(item); }).length, "售后或取证材料"],
        ["今日已处置", projectRows.filter(function (item) { return item[statusField] === "disposed"; }).length, "本部门完成"],
        ["确认删除", projectRows.filter(function (item) { return item[statusField] === "disposed" && item.deletionCheck === "deleted"; }).length, "自动校验结果"]
      ];
    }
    Common.qs("#disposeKpis").innerHTML = values.map(function (item) {
      return '<article class="dispose-kpi"><span>' + item[0] + '</span><strong>' + item[1] + '</strong><em>' + item[2] + '</em></article>';
    }).join("");
  }

  function renderProjects() {
    Common.qs("#disposeModeSwitch").innerHTML = [
      '<button class="' + (state.mode === "daily" ? "is-active" : "") + '" type="button" data-dispose-mode="daily">日常监测</button>',
      '<button class="' + (state.mode === "special" ? "is-active" : "") + '" type="button" data-dispose-mode="special">专项监测</button>'
    ].join("");

    var list = state.mode === "daily" ? dailyProjects : specialProjects;
    Common.qs("#disposeProjectSummary").textContent = state.mode === "daily" ? "固定品牌分类 · 长期接收" : "临时专项 · 结束后只读留存";
    Common.qs("#disposeProjectStrip").innerHTML = list.map(function (project) {
      var count = getRoleRecords().filter(function (item) { return item.projectId === project.id; }).length;
      return [
        '<div class="dispose-project-item ' + (state.projectId === project.id ? "is-active" : "") + '">',
        '<button class="dispose-project-main" type="button" data-dispose-project="' + project.id + '"><strong>' + escapeHtml(project.name) + '</strong><span>' + (project.status === "ended" ? '<i class="dispose-project-ended">已结束</i> · ' : "") + count + ' 条信息' + (project.period ? " · " + escapeHtml(project.period) : "") + '</span></button>',
        role === "verifier" && state.mode === "daily" ? '<button class="dispose-project-config" type="button" title="配置告警来源" data-dispose-action="project-config" data-project-id="' + project.id + '">配置</button>' : "",
        '</div>'
      ].join("");
    }).join("");
  }

  function renderListArea() {
    renderStatusTabs();
    renderFilters();
    renderListActions();
    renderSelectionBar();
    renderTable();
    renderListFoot();
  }

  function renderStatusTabs() {
    Common.qs("#disposeStatusTabs").innerHTML = roleConfig[role].statuses.map(function (status) {
      var count = getProjectRecords(false).filter(function (item) { return matchesStatus(item, status[0]); }).length;
      return '<button class="' + (state.status === status[0] ? "is-active" : "") + '" type="button" data-dispose-status="' + status[0] + '">' + status[1] + '<b>' + count + '</b></button>';
    }).join("");
  }

  function renderFilters() {
    var tags = uniqueValues(getProjectRecords(false).reduce(function (all, item) { return all.concat(item.tags); }, []));
    var platforms = uniqueValues(getProjectRecords(false).map(function (item) { return item.platform; }));
    Common.qs("#disposeFilters").innerHTML = [
      '<label class="dispose-filter-field"><span>关键词</span><input id="disposeKeyword" type="search" value="' + escapeHtml(state.keyword) + '" placeholder="搜索标题、账号、标签"></label>',
      renderFilterSelect("timeRange", "时间范围", [["today", "今天"], ["3d", "近3天"], ["7d", "近7天"], ["30d", "近30天"], ["all", "全部时间"]], state.timeRange),
      renderFilterSelect("tag", "业务标签", [["all", "全部标签"]].concat(tags.map(toOption)), state.tag),
      renderFilterSelect("platform", role === "forum" ? "论坛/平台" : "平台", [["all", "全部平台"]].concat(platforms.map(toOption)), state.platform),
      renderFilterSelect("sort", "排序", [["alert_desc", "告警时间倒序"], ["alert_asc", "告警时间正序"], ["publish_desc", "发布时间倒序"], ["publish_asc", "发布时间正序"]], state.sort)
    ].join("");
  }

  function renderFilterSelect(key, label, options, value) {
    return '<label class="dispose-filter-field"><span>' + label + '</span><select data-dispose-filter="' + key + '">' + options.map(function (option) {
      return '<option value="' + escapeHtml(option[0]) + '"' + (option[0] === value ? " selected" : "") + '>' + escapeHtml(option[1]) + '</option>';
    }).join("") + '</select></label>';
  }

  function renderListActions() {
    var actions = ['<button class="dispose-button" type="button" data-dispose-action="export">导出当前结果</button>'];
    if (role === "operation" || role === "forum") {
      actions.unshift('<button class="dispose-button is-accent" type="button" data-dispose-action="open-report">工作统计</button>');
    }
    Common.qs("#disposeListActions").innerHTML = actions.join("");
  }

  function renderSelectionBar() {
    var bar = Common.qs("#disposeSelectionBar");
    if (!state.selectedIds.length) {
      bar.hidden = true;
      bar.innerHTML = "";
      return;
    }
    var actions = [];
    if (role === "verifier") {
      actions = [["batch-route", "批量分发"], ["batch-delete", "非负面删除"]];
    } else if (role === "aftersales") {
      actions = [["batch-start", "批量开始核验"]];
    } else if (state.status === "suspended") {
      actions = [["batch-restore", "批量恢复"], ["batch-delete", "彻底删除"]];
    } else {
      actions = [["batch-read", "批量标记已读"], ["batch-dispose", "批量标记已处置"], ["batch-suspend", "批量挂起"]];
    }
    bar.hidden = false;
    bar.innerHTML = '<span>已选择 <strong>' + state.selectedIds.length + '</strong> 条本部门任务</span><div class="dispose-inline-actions">' + actions.map(function (item) {
      return '<button class="dispose-button' + (item[0] === "batch-delete" ? " is-danger" : "") + '" type="button" data-dispose-action="' + item[0] + '">' + item[1] + '</button>';
    }).join("") + '</div>';
  }

  function renderTable() {
    var rows = getVisibleRecords();
    var table = Common.qs("#disposeTable");
    if (!rows.length) {
      table.innerHTML = '<div class="dispose-empty">当前项目和筛选条件下没有本部门任务</div>';
      return;
    }
    table.innerHTML = role === "verifier" ? renderVerifierTable(rows) : role === "aftersales" ? renderAftersalesTable(rows) : renderExecutionTable(rows);
  }

  function renderVerifierTable(rows) {
    return [
      '<table class="dispose-table"><thead><tr><th><input id="disposeSelectAll" type="checkbox"></th><th>阅读</th><th>负面信息</th><th>品牌 / 平台</th><th>标签</th><th>发布时间 / 告警时间</th><th>建议路由</th><th>本部门状态</th><th>操作</th></tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr><td>' + renderSelect(item) + '</td><td>' + renderRead(item.readVerifier) + '</td><td>' + renderInfo(item) + '</td><td>' + escapeHtml(item.brand) + '<br><span class="dispose-muted">' + escapeHtml(item.platform) + '</span></td><td>' + renderTags(item.tags) + '</td><td>' + renderTimes(item) + '</td><td>' + escapeHtml(getRouteSummary(item)) + '</td><td>' + renderRoleStatus(item) + '</td><td><div class="dispose-table-actions"><button class="dispose-button" type="button" data-dispose-action="open-detail" data-record-id="' + item.id + '">' + (item.verifierStatus === "distributed" ? "查看分发" : "核验分发") + '</button></div></td></tr>';
      }).join(""),
      '</tbody></table>'
    ].join("");
  }

  function renderAftersalesTable(rows) {
    return [
      '<table class="dispose-table"><thead><tr><th><input id="disposeSelectAll" type="checkbox"></th><th>阅读</th><th>质量信息</th><th>品牌 / 平台</th><th>质量标签</th><th>收到时间</th><th>协作来源</th><th>本部门状态</th><th>操作</th></tr></thead><tbody>',
      rows.map(function (item) {
        return '<tr><td>' + renderSelect(item) + '</td><td>' + renderRead(item.readAftersales) + '</td><td>' + renderInfo(item) + '</td><td>' + escapeHtml(item.brand) + '<br><span class="dispose-muted">' + escapeHtml(item.platform) + '</span></td><td>' + renderTags(item.tags) + '</td><td>' + escapeHtml(item.alertTime) + '</td><td>负面信息运营部门<br><span class="dispose-muted">业务协作信息</span></td><td>' + renderRoleStatus(item) + '</td><td><div class="dispose-table-actions"><button class="dispose-button" type="button" data-dispose-action="open-detail" data-record-id="' + item.id + '">' + (item.aftersalesStatus === "returned" ? "查看材料" : "进入核验") + '</button></div></td></tr>';
      }).join(""),
      '</tbody></table>'
    ].join("");
  }

  function renderExecutionTable(rows) {
    var isForum = role === "forum";
    return [
      '<table class="dispose-table"><thead><tr><th><input id="disposeSelectAll" type="checkbox"></th><th>阅读</th><th>负面信息</th><th>' + (isForum ? "论坛 / 发布账号" : "平台 / 发布账号") + '</th><th>标签</th><th>发布时间 / 告警时间</th><th>协作材料</th><th>截图取证</th><th>本部门状态</th><th>操作</th></tr></thead><tbody>',
      rows.map(function (item) {
        var readValue = isForum ? item.readForum : item.readOperation;
        return '<tr><td>' + renderSelect(item) + '</td><td>' + renderRead(readValue) + '</td><td>' + renderInfo(item) + '</td><td>' + escapeHtml(isForum && item.community ? item.community : item.platform) + '<br><span class="dispose-muted">' + escapeHtml(item.author) + '</span></td><td>' + renderTags(item.tags) + '</td><td>' + renderTimes(item) + '</td><td>' + renderDependencies(item) + '</td><td><button class="dispose-button" type="button" data-dispose-action="view-snapshot" data-record-id="' + item.id + '">查看截图</button></td><td>' + renderExecutionState(item) + '</td><td>' + renderExecutionActions(item) + '</td></tr>';
      }).join(""),
      '</tbody></table>'
    ].join("");
  }

  function renderExecutionActions(item) {
    var status = role === "operation" ? item.operationStatus : item.forumStatus;
    if (status === "suspended") {
      return '<div class="dispose-table-actions"><button class="dispose-button" type="button" data-dispose-action="restore" data-record-id="' + item.id + '">恢复</button><button class="dispose-button is-danger" type="button" data-dispose-action="delete-task" data-record-id="' + item.id + '">删除</button></div>';
    }
    if (status === "disposed") {
      return '<div class="dispose-table-actions"><button class="dispose-button" type="button" data-dispose-action="open-detail" data-record-id="' + item.id + '">查看结果</button></div>';
    }
    return '<div class="dispose-table-actions"><button class="dispose-button" type="button" data-dispose-action="open-detail" data-record-id="' + item.id + '">查看处置</button><button class="dispose-button" type="button" data-dispose-action="suspend" data-record-id="' + item.id + '">挂起</button></div>';
  }

  function renderSelect(item) {
    return '<input type="checkbox" data-record-select="' + item.id + '"' + (state.selectedIds.indexOf(item.id) > -1 ? " checked" : "") + ' aria-label="选择此信息">';
  }

  function renderRead(value) {
    return '<span class="dispose-read-state ' + (value ? "is-read" : "") + '">' + (value ? "已阅读" : "未阅读") + '</span>';
  }

  function renderInfo(item) {
    return '<div class="dispose-info-cell"><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.excerpt) + '</span></div>';
  }

  function renderTags(tags) {
    return '<div class="dispose-tag-list">' + tags.slice(0, 3).map(function (tag) { return '<span class="dispose-tag">' + escapeHtml(tag) + '</span>'; }).join("") + '</div>';
  }

  function renderTimes(item) {
    return escapeHtml(item.publishTime) + '<br><span class="dispose-muted">告警 ' + escapeHtml(item.alertTime) + '</span>';
  }

  function renderDependencies(item) {
    var rows = [];
    if (item.aftersalesDependency === "waiting") { rows.push('<span class="dispose-dependency is-waiting">待售后材料</span>'); }
    if (item.aftersalesDependency === "returned") { rows.push('<span class="dispose-dependency is-ready">售后材料已返回</span>'); }
    if (item.evidenceDependency === "waiting") { rows.push('<span class="dispose-dependency is-waiting">待取证材料</span>'); }
    if (item.evidenceDependency === "complete") { rows.push('<span class="dispose-dependency is-ready">取证材料已返回</span>'); }
    if (!rows.length) { rows.push('<span class="dispose-dependency is-ready">无前置协作</span>'); }
    return '<div class="dispose-dependency-list">' + rows.join("") + '</div>';
  }

  function renderRoleStatus(item) {
    var status = getRoleStatus(item);
    var labels = {
      pending_verify: ["待核验", "is-waiting"], pending_route: ["待分发", "is-ready"], distributed: ["已分发", "is-done"],
      pending: ["待核验", "is-waiting"], in_progress: ["核验中", "is-ready"], returned: ["已回传", "is-done"]
    };
    var value = labels[status] || [status, ""];
    return '<span class="dispose-status ' + value[1] + '">' + value[0] + '</span>';
  }

  function renderExecutionState(item) {
    var status = getRoleStatus(item);
    if (status === "pending") {
      return canDispose(item) ? '<span class="dispose-status is-ready">可以处置</span>' : '<span class="dispose-status is-waiting">等待协作</span>';
    }
    if (status === "suspended") { return '<span class="dispose-status is-suspended">已挂起</span>'; }
    if (item.deletionCheck === "deleted") { return '<span class="dispose-status is-deleted">已删除</span><br><span class="dispose-muted">' + escapeHtml(item.deletedTime) + '</span>'; }
    if (item.deletionCheck === "online") { return '<span class="dispose-status is-online">仍在线</span><br><span class="dispose-muted">处置 ' + escapeHtml(item.disposedTime) + '</span>'; }
    return '<span class="dispose-status is-done">已处置 · 待校验</span>';
  }

  function renderListFoot() {
    var count = getVisibleRecords().length;
    Common.qs("#disposeListFoot").innerHTML = '<span>共 ' + count + ' 条，本页 20 条</span><div class="dispose-pagination"><button type="button">‹</button><button class="is-active" type="button">1</button><button type="button">›</button></div>';
  }

  function handleAction(action, target) {
    var recordId = target.getAttribute("data-record-id");
    var item = recordId ? findRecord(recordId) : null;

    if (action === "close-modal") { closeModal(); return; }
    if (action === "open-detail") { openModal("detail", recordId); return; }
    if (action === "view-snapshot") { openModal("snapshot", recordId); return; }
    if (action === "project-config") { openModal("project-config", target.getAttribute("data-project-id")); return; }
    if (action === "open-routing-rules") { openModal("routing-rules"); return; }
    if (action === "new-special") { openModal("new-special"); return; }
    if (action === "open-report") { openModal("report"); return; }
    if (action === "export") { exportRows(); return; }

    if (action === "open-original" && item) {
      markRead(item);
      item.screenshot = true;
      persist();
      render();
      window.open(item.url, "_blank", "noopener");
      Common.showToast("已打开原文并记录本部门阅读时间，原文截图已归档");
      return;
    }

    if (action === "delete-nonnegative" && item) {
      records = records.filter(function (row) { return row.id !== item.id; });
      persist(); closeModal(); render(); Common.showToast("该信息已按非负面信息移出业务列表"); return;
    }

    if (action === "send-routing" && item) { sendRouting(item); return; }
    if (action === "start-aftersales" && item) { item.aftersalesStatus = "in_progress"; item.readAftersales = true; persist(); closeModal(); render(); Common.showToast("已进入本部门核验中"); return; }
    if (action === "return-materials" && item) { returnMaterials(item); return; }
    if (action === "mark-disposed" && item) { markDisposed(item); return; }
    if (action === "suspend" && item) { setExecutionStatus(item, "suspended"); Common.showToast("已移入本部门挂起列表"); return; }
    if (action === "restore" && item) { setExecutionStatus(item, "pending"); Common.showToast("已恢复到未处置负面"); return; }
    if (action === "delete-task" && item) { setExecutionStatus(item, null); Common.showToast("已从本部门业务列表彻底删除"); return; }
    if (action === "save-project-config") { persist(); closeModal(); Common.showToast("告警来源配置已保存"); return; }
    if (action === "save-routing-rules") { state.routeMode = Common.qs("#disposeRouteMode").value; persist(); closeModal(); Common.showToast("自动分发规则已保存"); return; }
    if (action === "create-special") { createSpecial(); return; }
    if (action === "send-report") { closeModal(); Common.showToast("今日工作日报已发送至钉钉接收人"); return; }
    if (action.indexOf("batch-") === 0) { handleBatch(action); }
  }

  function sendRouting(item) {
    var targets = Common.qsa("[data-route-target]:checked").map(function (input) { return input.value; });
    if (!targets.length) { Common.showToast("请至少选择一个接收部门"); return; }
    item.routeDepartments = targets;
    item.verifierStatus = "distributed";
    item.readVerifier = true;
    if (targets.indexOf("aftersales") > -1) { item.aftersalesStatus = item.aftersalesStatus || "pending"; item.aftersalesDependency = "waiting"; }
    if (targets.indexOf("operation") > -1) { item.operationStatus = item.operationStatus || "pending"; }
    if (targets.indexOf("forum") > -1) { item.forumStatus = item.forumStatus || "pending"; }
    if (Common.qs('[data-route-label="evidence"]') && Common.qs('[data-route-label="evidence"]').checked) { item.evidenceDependency = "waiting"; }
    persist(); closeModal(); render(); Common.showToast("协作信息已发送，各部门将独立安排本部门任务");
  }

  function returnMaterials(item) {
    var conclusion = Common.qs("#disposeAftersalesConclusion").value;
    var advice = Common.qs("#disposeAftersalesAdvice").value.trim();
    if (!conclusion || !advice) { Common.showToast("请填写核验结论和协作建议"); return; }
    item.aftersalesConclusion = conclusion;
    item.aftersalesAdvice = advice;
    item.materialFiles = item.materialFiles.concat(state.uploads);
    item.aftersalesStatus = "returned";
    item.aftersalesDependency = "returned";
    item.readAftersales = true;
    persist(); closeModal(); render(); Common.showToast("售后核验材料已返回相关协作部门");
  }

  function markDisposed(item) {
    if (!canDispose(item)) { Common.showToast("售后或取证材料尚未返回，本部门暂不能完成处置"); return; }
    var method = Common.qs("#disposeMethod");
    var note = Common.qs("#disposeNote");
    item.disposalMethod = method ? method.value : "平台举报";
    item.disposalNote = note ? note.value.trim() : "";
    item.disposedTime = "2026-08-04 15:26";
    item.deletionCheck = "pending";
    setExecutionStatus(item, "disposed", true);
    closeModal(); Common.showToast("已记录本部门处置结果，系统将持续校验原文状态");
  }

  function setExecutionStatus(item, status, skipRender) {
    if (role === "operation") { item.operationStatus = status; item.readOperation = true; }
    if (role === "forum") { item.forumStatus = status; item.readForum = true; }
    persist();
    if (!skipRender) { render(); }
  }

  function handleBatch(action) {
    var selected = records.filter(function (item) { return state.selectedIds.indexOf(item.id) > -1; });
    if (action === "batch-delete") {
      if (role === "verifier") { records = records.filter(function (item) { return state.selectedIds.indexOf(item.id) === -1; }); }
      else { selected.forEach(function (item) { if (role === "operation") { item.operationStatus = null; } else { item.forumStatus = null; } }); }
    }
    if (action === "batch-start") { selected.forEach(function (item) { if (item.aftersalesStatus === "pending") { item.aftersalesStatus = "in_progress"; } }); }
    if (action === "batch-read") { selected.forEach(markRead); }
    if (action === "batch-suspend") { selected.forEach(function (item) { if (role === "operation") { item.operationStatus = "suspended"; } else { item.forumStatus = "suspended"; } }); }
    if (action === "batch-restore") { selected.forEach(function (item) { if (role === "operation") { item.operationStatus = "pending"; } else { item.forumStatus = "pending"; } }); }
    if (action === "batch-dispose") {
      var ready = selected.filter(canDispose);
      ready.forEach(function (item) { if (role === "operation") { item.operationStatus = "disposed"; item.readOperation = true; } else { item.forumStatus = "disposed"; item.readForum = true; } item.disposedTime = "2026-08-04 15:26"; item.deletionCheck = "pending"; });
      if (ready.length !== selected.length) { Common.showToast("已处置材料齐备的信息，等待协作的信息未变更"); }
    }
    if (action === "batch-route") {
      selected.forEach(function (item) {
        item.verifierStatus = "distributed";
        if (item.forum) { item.forumStatus = item.forumStatus || "pending"; }
        else { item.operationStatus = item.operationStatus || "pending"; }
        if (item.quality) { item.aftersalesStatus = item.aftersalesStatus || "pending"; item.aftersalesDependency = "waiting"; }
      });
    }
    state.selectedIds = [];
    persist(); render();
    if (action !== "batch-dispose" || selected.every(canDispose)) { Common.showToast("批量操作已完成"); }
  }

  function toggleSelection(id, checked) {
    if (checked && state.selectedIds.indexOf(id) === -1) { state.selectedIds.push(id); }
    if (!checked) { state.selectedIds = state.selectedIds.filter(function (value) { return value !== id; }); }
    renderSelectionBar();
  }

  function openModal(type, id) {
    state.modal = { type: type, id: id || "" };
    state.uploads = [];
    renderModal();
    Common.qs("#disposeModalLayer").hidden = false;
  }

  function closeModal() {
    state.modal = null;
    Common.qs("#disposeModalLayer").hidden = true;
    Common.qs("#disposeModal").innerHTML = "";
  }

  function renderModal() {
    if (!state.modal) { return; }
    var modal = Common.qs("#disposeModal");
    modal.className = "dispose-modal";
    if (state.modal.type !== "detail" && state.modal.type !== "report") { modal.classList.add("is-medium"); }
    if (state.modal.type === "detail") { modal.innerHTML = renderDetailModal(findRecord(state.modal.id)); }
    if (state.modal.type === "snapshot") { modal.innerHTML = renderSnapshotModal(findRecord(state.modal.id)); }
    if (state.modal.type === "project-config") { modal.innerHTML = renderProjectConfigModal(state.modal.id); }
    if (state.modal.type === "routing-rules") { modal.innerHTML = renderRoutingRulesModal(); }
    if (state.modal.type === "new-special") { modal.innerHTML = renderSpecialModal(); }
    if (state.modal.type === "report") { modal.innerHTML = renderReportModal(); }
  }

  function renderDetailModal(item) {
    if (!item) { return ""; }
    return [
      modalHead(item.title, roleConfig[role].department + " · " + item.brand + " · " + item.platform),
      '<div class="dispose-modal-body"><div class="dispose-detail-grid"><div class="dispose-detail-stack">',
      renderSourceBlock(item),
      renderSnapshotBlock(item),
      '</div><div class="dispose-detail-stack">',
      role === "verifier" ? renderVerifierWork(item) : role === "aftersales" ? renderAftersalesWork(item) : renderExecutionWork(item),
      '</div></div></div>',
      renderDetailFooter(item)
    ].join("");
  }

  function renderSourceBlock(item) {
    return '<section class="dispose-block"><div class="dispose-block-head"><h3>信息原文</h3><button class="dispose-button" type="button" data-dispose-action="open-original" data-record-id="' + item.id + '">打开原文</button></div><h2 class="dispose-source-title">' + escapeHtml(item.title) + '</h2><div class="dispose-source-meta"><span>发布账号：' + escapeHtml(item.author) + '</span><span>平台：' + escapeHtml(item.platform) + '</span><span>发布时间：' + escapeHtml(item.publishTime) + '</span><span>告警时间：' + escapeHtml(item.alertTime) + '</span></div><div class="dispose-source-content">' + escapeHtml(item.content) + '</div></section>';
  }

  function renderSnapshotBlock(item) {
    return '<section class="dispose-block"><div class="dispose-block-head"><h3>原文截图取证</h3><span class="dispose-status is-ready">已归档</span></div>' + renderSnapshotVisual(item) + '</section>';
  }

  function renderSnapshotVisual(item) {
    return '<div class="dispose-snapshot"><div class="dispose-snapshot-bar"><i></i><i></i><i></i><span>原文快照 · ' + escapeHtml(item.alertTime) + '</span></div><div class="dispose-snapshot-body"><strong>' + escapeHtml(item.title) + '</strong><span></span><span></span><span style="width:48%"></span></div></div>';
  }

  function renderVerifierWork(item) {
    var sent = item.verifierStatus === "distributed";
    var recommended = getRecommendedTargets(item);
    return [
      '<section class="dispose-block is-tinted"><div class="dispose-block-head"><h3>负面核验</h3>' + renderRoleStatus(item) + '</div><div class="dispose-route-result"><div class="dispose-route-row"><div><strong>判断结果</strong><span>传播告警识别为负面，需人工确认业务标签</span></div><span class="dispose-status is-waiting">待人工确认</span></div></div></section>',
      '<section class="dispose-block"><div class="dispose-block-head"><h3>路由标签</h3><span class="dispose-muted">标签决定协作部门</span></div><div class="dispose-choice-grid">',
      routeChoice("quality", "产品质量", "需要售后部门提供核验材料", item.quality, sent),
      routeChoice("forum", "论坛贴吧", "最终由论坛信息处置部门处理", item.forum, sent),
      routeChoice("evidence", "需要识别取证", "最终处置前等待取证材料", item.evidenceDependency === "waiting" || item.evidenceDependency === "complete", sent),
      routeChoice("general", "普通负面", "由信息处置部门独立处理", !item.quality && !item.forum, sent),
      '</div></section>',
      '<section class="dispose-block"><div class="dispose-block-head"><h3>接收部门</h3><span class="dispose-muted">发送协作信息，不指定对方人员</span></div><div class="dispose-choice-grid">',
      targetChoice("aftersales", "售后服务部门", "返回质量核验材料", recommended.indexOf("aftersales") > -1, sent),
      targetChoice("operation", "信息处置部门", "处理非论坛类信息", recommended.indexOf("operation") > -1, sent),
      targetChoice("forum", "论坛信息处置部门", "处理论坛和贴吧信息", recommended.indexOf("forum") > -1, sent),
      '</div></section>',
      sent ? '<section class="dispose-block is-tinted"><h3>分发结果</h3><div class="dispose-route-result" style="margin-top:10px">' + (item.routeDepartments.length ? item.routeDepartments : recommended).map(function (value) { return '<div class="dispose-route-row"><div><strong>' + escapeHtml(departmentName(value)) + '</strong><span>协作信息已送达，对方部门独立安排处理</span></div><span class="dispose-status is-done">已发送</span></div>'; }).join("") + '</div></section>' : ""
    ].join("");
  }

  function routeChoice(value, title, desc, checked, disabled) {
    return '<label class="dispose-choice"><input type="checkbox" data-route-label="' + value + '"' + (checked ? " checked" : "") + (disabled ? " disabled" : "") + '><span><strong>' + title + '</strong><span>' + desc + '</span></span></label>';
  }

  function targetChoice(value, title, desc, checked, disabled) {
    return '<label class="dispose-choice"><input type="checkbox" value="' + value + '" data-route-target' + (checked ? " checked" : "") + (disabled ? " disabled" : "") + '><span><strong>' + title + '</strong><span>' + desc + '</span></span></label>';
  }

  function renderAftersalesWork(item) {
    if (item.aftersalesStatus === "returned") {
      return '<section class="dispose-block is-tinted"><div class="dispose-block-head"><h3>本部门核验结论</h3><span class="dispose-status is-done">已回传</span></div><div class="dispose-form-grid"><label class="dispose-form-field"><span>核验结论</span><input value="' + escapeHtml(item.aftersalesConclusion) + '" readonly></label><label class="dispose-form-field is-wide"><span>协作建议</span><textarea readonly>' + escapeHtml(item.aftersalesAdvice) + '</textarea></label></div>' + renderFiles(item.materialFiles) + '</section>';
    }
    return [
      '<section class="dispose-block is-tinted"><div class="dispose-block-head"><h3>协作信息</h3>' + renderRoleStatus(item) + '</div><div class="dispose-route-row"><div><strong>负面信息运营部门发送</strong><span>仅共享信息和业务标签，本部门独立核验并安排人员</span></div><span class="dispose-status is-ready">已接收</span></div></section>',
      '<section class="dispose-block"><div class="dispose-block-head"><h3>沟通与产品材料</h3><span class="dispose-muted">图片、视频、文档</span></div><label class="dispose-upload-zone">点击上传沟通记录或产品资料<input type="file" multiple data-material-upload></label>' + renderFiles(item.materialFiles.concat(state.uploads)) + '</section>',
      '<section class="dispose-block"><div class="dispose-block-head"><h3>核验结论</h3></div><div class="dispose-form-grid"><label class="dispose-form-field"><span>判断结果</span><select id="disposeAftersalesConclusion"><option value="">请选择</option><option>属实</option><option>部分属实</option><option>无法确认</option><option>明显不实</option><option>已沟通解决</option></select></label><label class="dispose-form-field is-wide"><span>返回协作部门的材料说明与建议</span><textarea id="disposeAftersalesAdvice" placeholder="填写事实核验结果和建议，最终处置由接收部门独立决定"></textarea></label></div></section>'
    ].join("");
  }

  function renderExecutionWork(item) {
    var status = getRoleStatus(item);
    var blocked = !canDispose(item);
    return [
      '<section class="dispose-block is-tinted"><div class="dispose-block-head"><h3>跨部门协作材料</h3>' + (blocked ? '<span class="dispose-status is-waiting">材料未齐</span>' : '<span class="dispose-status is-ready">材料已齐</span>') + '</div><div class="dispose-route-result">',
      item.aftersalesDependency ? '<div class="dispose-material-row"><div><strong>售后核验材料</strong><span>' + (item.aftersalesDependency === "returned" ? escapeHtml(item.aftersalesConclusion + " · " + item.aftersalesAdvice) : "售后部门独立核验中，尚未返回材料") + '</span></div><span class="dispose-status ' + (item.aftersalesDependency === "returned" ? "is-ready" : "is-waiting") + '">' + (item.aftersalesDependency === "returned" ? "已返回" : "等待中") + '</span></div>' : "",
      item.evidenceDependency ? '<div class="dispose-material-row"><div><strong>识别取证材料</strong><span>' + (item.evidenceDependency === "complete" ? "原文、互动区及账号页面证据已归档" : "取证部门处理中，尚未返回材料") + '</span></div><span class="dispose-status ' + (item.evidenceDependency === "complete" ? "is-ready" : "is-waiting") + '">' + (item.evidenceDependency === "complete" ? "已返回" : "等待中") + '</span></div>' : "",
      !item.aftersalesDependency && !item.evidenceDependency ? '<div class="dispose-material-row"><div><strong>无前置协作</strong><span>本部门可以直接进行独立研判与处置</span></div><span class="dispose-status is-ready">可以处置</span></div>' : "",
      '</div>' + renderFiles(item.materialFiles) + '</section>',
      status === "disposed" ? '<section class="dispose-block"><div class="dispose-block-head"><h3>本部门处置结果</h3>' + renderExecutionState(item) + '</div><div class="dispose-form-grid"><label class="dispose-form-field"><span>处置方式</span><input value="' + escapeHtml(item.disposalMethod || "平台举报") + '" readonly></label><label class="dispose-form-field"><span>处置时间</span><input value="' + escapeHtml(item.disposedTime) + '" readonly></label><label class="dispose-form-field is-wide"><span>处置说明</span><textarea readonly>' + escapeHtml(item.disposalNote || "已在线下完成举报并提交相关材料。") + '</textarea></label></div></section>' : '<section class="dispose-block"><div class="dispose-block-head"><h3>本部门处置记录</h3><span class="dispose-muted">最终判断由本部门完成</span></div><div class="dispose-form-grid"><label class="dispose-form-field"><span>处置方式</span><select id="disposeMethod"><option>平台举报</option><option>账号沟通</option><option>渠道反馈</option><option>其他方式</option></select></label><label class="dispose-form-field is-wide"><span>处置说明</span><textarea id="disposeNote" placeholder="记录线下处置情况和提交材料"></textarea></label></div></section>'
    ].join("");
  }

  function renderDetailFooter(item) {
    var buttons = ['<button class="dispose-button" type="button" data-dispose-action="close-modal">关闭</button>'];
    if (role === "verifier" && item.verifierStatus !== "distributed") {
      buttons.unshift('<button class="dispose-button is-danger" type="button" data-dispose-action="delete-nonnegative" data-record-id="' + item.id + '">非负面删除</button>');
      buttons.push('<button class="dispose-button is-primary" type="button" data-dispose-action="send-routing" data-record-id="' + item.id + '">确认负面并发送协作信息</button>');
    }
    if (role === "aftersales" && item.aftersalesStatus === "pending") { buttons.push('<button class="dispose-button is-primary" type="button" data-dispose-action="start-aftersales" data-record-id="' + item.id + '">开始本部门核验</button>'); }
    if (role === "aftersales" && item.aftersalesStatus === "in_progress") { buttons.push('<button class="dispose-button is-primary" type="button" data-dispose-action="return-materials" data-record-id="' + item.id + '">完成核验并返回材料</button>'); }
    if ((role === "operation" || role === "forum") && getRoleStatus(item) === "pending") { buttons.push('<button class="dispose-button is-primary" type="button" data-dispose-action="mark-disposed" data-record-id="' + item.id + '"' + (!canDispose(item) ? " disabled" : "") + '>标记本部门已处置</button>'); }
    return '<footer class="dispose-modal-foot"><div class="dispose-modal-actions">' + buttons.join("") + '</div></footer>';
  }

  function renderSnapshotModal(item) {
    return modalHead("原文截图取证", item.title) + '<div class="dispose-modal-body">' + renderSnapshotVisual(item) + '<div class="dispose-source-content" style="margin-top:12px">截图生成时间：' + escapeHtml(item.alertTime) + '。快照包含当时页面正文、发布账号、互动量和原文地址。</div></div><footer class="dispose-modal-foot"><button class="dispose-button" type="button" data-dispose-action="close-modal">关闭</button></footer>';
  }

  function renderProjectConfigModal(projectId) {
    var project = dailyProjects.filter(function (item) { return item.id === projectId; })[0];
    var tasks = ["品牌日常负面单条预警", "重点媒体负面预警", "产品质量投诉预警", "论坛贴吧负面预警"];
    return modalHead(project.name + "接入配置", "配置本日常分类接收的传播告警任务") + '<div class="dispose-modal-body"><div class="dispose-form-grid"><label class="dispose-form-field is-wide"><span>已关联传播告警任务</span></label>' + tasks.map(function (task, index) { return '<label class="dispose-choice"><input type="checkbox"' + (index < 2 ? " checked" : "") + '><span><strong>' + escapeHtml(task) + '</strong><span>运行中 · 单条负面信息</span></span></label>'; }).join("") + '</div></div><footer class="dispose-modal-foot"><button class="dispose-button" type="button" data-dispose-action="close-modal">取消</button><button class="dispose-button is-primary" type="button" data-dispose-action="save-project-config">保存配置</button></footer>';
  }

  function renderRoutingRulesModal() {
    return modalHead("自动分发规则", "配置业务标签与接收部门的路由关系") + '<div class="dispose-modal-body"><div class="dispose-form-grid"><label class="dispose-form-field is-wide"><span>分发模式</span><select id="disposeRouteMode"><option value="manual"' + (state.routeMode === "manual" ? " selected" : "") + '>人工分发</option><option value="assist"' + (state.routeMode === "assist" ? " selected" : "") + '>辅助分发</option><option value="auto"' + (state.routeMode === "auto" ? " selected" : "") + '>规则自动分发</option></select></label></div><div class="dispose-route-result" style="margin-top:12px"><div class="dispose-route-row"><div><strong>产品质量 + 非论坛</strong><span>发送售后服务部门和信息处置部门</span></div><span class="dispose-status is-ready">并行协作</span></div><div class="dispose-route-row"><div><strong>产品质量 + 论坛贴吧</strong><span>发送售后服务部门和论坛信息处置部门</span></div><span class="dispose-status is-ready">并行协作</span></div><div class="dispose-route-row"><div><strong>普通论坛贴吧</strong><span>发送论坛信息处置部门</span></div><span class="dispose-status is-done">单部门</span></div><div class="dispose-route-row"><div><strong>其他负面信息</strong><span>发送信息处置部门</span></div><span class="dispose-status is-done">单部门</span></div></div></div><footer class="dispose-modal-foot"><button class="dispose-button" type="button" data-dispose-action="close-modal">取消</button><button class="dispose-button is-primary" type="button" data-dispose-action="save-routing-rules">保存规则</button></footer>';
  }

  function renderSpecialModal() {
    return modalHead("新建专项监测", "专项结束后停止进入新数据，历史结果继续保留") + '<div class="dispose-modal-body"><div class="dispose-form-grid"><label class="dispose-form-field is-wide"><span>专项名称</span><input id="disposeSpecialName" placeholder="例如：新车型上市负面处置专项"></label><label class="dispose-form-field"><span>开始日期</span><input id="disposeSpecialStart" type="date" value="2026-08-04"></label><label class="dispose-form-field"><span>结束日期</span><input id="disposeSpecialEnd" type="date" value="2026-08-20"></label><label class="dispose-form-field is-wide"><span>关联传播告警任务</span><select id="disposeSpecialTask"><option>新品上市单条负面预警</option><option>车展专项负面预警</option><option>产品质量投诉预警</option></select></label></div></div><footer class="dispose-modal-foot"><button class="dispose-button" type="button" data-dispose-action="close-modal">取消</button><button class="dispose-button is-primary" type="button" data-dispose-action="create-special">创建并启动</button></footer>';
  }

  function renderReportModal() {
    var rows = getProjectRecords(false);
    var statusField = role === "operation" ? "operationStatus" : "forumStatus";
    var readField = role === "operation" ? "readOperation" : "readForum";
    var total = rows.filter(function (item) { return item[statusField]; }).length;
    var read = rows.filter(function (item) { return item[statusField] && item[readField]; }).length;
    var disposed = rows.filter(function (item) { return item[statusField] === "disposed"; }).length;
    var deleted = rows.filter(function (item) { return item[statusField] === "disposed" && item.deletionCheck === "deleted"; }).length;
    return modalHead("今日工作日报", roleConfig[role].department + " · 2026-08-04") + '<div class="dispose-modal-body"><div class="dispose-report-metrics">' + reportMetric("今日进入", total, "本部门任务") + reportMetric("今日已读", read, percent(read, total) + " 阅读率") + reportMetric("今日已处置", disposed, percent(disposed, Math.max(1, rows.filter(canDispose).length)) + " 可处置完成率") + reportMetric("确认删除", deleted, percent(deleted, Math.max(1, disposed)) + " 删除有效率") + '</div><div class="dispose-report-band"><div>平均首读时效<strong>18 分钟</strong></div><div>平均处置时效<strong>2.4 小时</strong></div><div>平均删除时效<strong>8.6 小时</strong></div></div><section class="dispose-block"><div class="dispose-block-head"><h3>今日工作摘要</h3><span class="dispose-muted">不计入跨部门协作等待时长</span></div><div class="dispose-report-row"><div><strong>待处理积压</strong><span>等待协作材料与可以处置任务分别统计</span></div><span>' + rows.filter(function (item) { return item[statusField] === "pending"; }).length + ' 条</span></div><label class="dispose-form-field" style="margin-top:10px"><span>补充说明</span><textarea placeholder="补充重点问题、协作事项或明日安排"></textarea></label><label class="dispose-form-field" style="margin-top:10px"><span>钉钉接收人</span><select><option>品牌传播负责人</option><option>部门负责人群</option><option>信息处置日报群</option></select></label></section></div><footer class="dispose-modal-foot"><button class="dispose-button" type="button" data-dispose-action="close-modal">关闭</button><button class="dispose-button" type="button" data-dispose-action="export">导出日报</button><button class="dispose-button is-primary" type="button" data-dispose-action="send-report">发送钉钉</button></footer>';
  }

  function modalHead(title, desc) {
    return '<header class="dispose-modal-head"><div><h2 id="disposeModalTitle">' + escapeHtml(title) + '</h2><p>' + escapeHtml(desc || "") + '</p></div><button class="dispose-modal-close" type="button" data-dispose-action="close-modal" aria-label="关闭">×</button></header>';
  }

  function reportMetric(label, value, note) {
    return '<article class="dispose-report-metric"><span>' + label + '</span><strong>' + value + '</strong><em>' + note + '</em></article>';
  }

  function renderFiles(files) {
    if (!files.length) { return ""; }
    return '<div class="dispose-file-list">' + files.map(function (file) { return '<div class="dispose-file-item"><span>' + escapeHtml(file) + '</span><span>已归档</span></div>'; }).join("") + '</div>';
  }

  function createSpecial() {
    var name = Common.qs("#disposeSpecialName").value.trim();
    if (!name) { Common.showToast("请填写专项名称"); return; }
    var id = "special-" + Date.now();
    specialProjects.unshift({ id: id, name: name, period: "08-04 至 08-20", status: "active", tasks: [Common.qs("#disposeSpecialTask").value] });
    state.mode = "special";
    state.projectId = id;
    persist(); closeModal(); render(); Common.showToast("专项监测已创建并开始接收信息");
  }

  function exportRows() {
    var rows = getVisibleRecords();
    var csv = ["标题,品牌,平台,发布时间,告警时间,标签,本部门状态"].concat(rows.map(function (item) {
      return [item.title, item.brand, item.platform, item.publishTime, item.alertTime, item.tags.join("/"), getRoleStatus(item)].map(csvValue).join(",");
    })).join("\n");
    var blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = roleConfig[role].title + "-当前筛选结果.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    Common.showToast("当前筛选结果已导出");
  }

  function getVisibleRecords() {
    var rows = getProjectRecords(true).filter(function (item) { return matchesStatus(item, state.status); });
    rows = rows.filter(function (item) {
      var text = [item.title, item.author, item.brand, item.platform].concat(item.tags).join(" ").toLowerCase();
      return (!state.keyword || text.indexOf(state.keyword.toLowerCase()) > -1)
        && (state.tag === "all" || item.tags.indexOf(state.tag) > -1)
        && (state.platform === "all" || item.platform === state.platform)
        && matchesTime(item);
    });
    var field = state.sort.indexOf("publish") === 0 ? "publishTime" : "alertTime";
    var direction = state.sort.indexOf("_asc") > -1 ? 1 : -1;
    rows.sort(function (a, b) { return a[field] === b[field] ? 0 : a[field] > b[field] ? direction : -direction; });
    return rows;
  }

  function getProjectRecords(applyRole) {
    var rows = applyRole === false ? getRoleRecords() : getRoleRecords();
    return rows.filter(function (item) { return item.projectType === state.mode && item.projectId === state.projectId; });
  }

  function getRoleRecords() {
    if (role === "verifier") { return records.slice(); }
    if (role === "aftersales") { return records.filter(function (item) { return !!item.aftersalesStatus; }); }
    if (role === "operation") { return records.filter(function (item) { return !!item.operationStatus; }); }
    return records.filter(function (item) { return !!item.forumStatus; });
  }

  function matchesStatus(item, target) {
    var status = getRoleStatus(item);
    if (target === "all") {
      if (role === "operation" || role === "forum") { return status === "pending" || status === "disposed"; }
      return true;
    }
    return status === target;
  }

  function matchesTime(item) {
    if (state.timeRange === "all") { return true; }
    var date = item.publishTime.slice(0, 10);
    if (state.timeRange === "today") { return date === "2026-08-04"; }
    if (state.timeRange === "3d") { return date >= "2026-08-02"; }
    if (state.timeRange === "7d") { return date >= "2026-07-29"; }
    return date >= "2026-07-06";
  }

  function getRoleStatus(item) {
    if (role === "verifier") { return item.verifierStatus; }
    if (role === "aftersales") { return item.aftersalesStatus; }
    if (role === "operation") { return item.operationStatus; }
    return item.forumStatus;
  }

  function markRead(item) {
    if (role === "verifier") { item.readVerifier = true; }
    if (role === "aftersales") { item.readAftersales = true; }
    if (role === "operation") { item.readOperation = true; }
    if (role === "forum") { item.readForum = true; }
  }

  function canDispose(item) {
    return item.aftersalesDependency !== "waiting" && item.evidenceDependency !== "waiting";
  }

  function getRecommendedTargets(item) {
    var targets = [];
    if (item.quality) { targets.push("aftersales"); }
    targets.push(item.forum ? "forum" : "operation");
    return targets;
  }

  function getRouteSummary(item) {
    return getRecommendedTargets(item).map(departmentName).join(" + ");
  }

  function departmentName(value) {
    return { aftersales: "售后服务部门", operation: "信息处置部门", forum: "论坛信息处置部门" }[value] || value;
  }

  function findRecord(id) {
    return records.filter(function (item) { return item.id === id; })[0] || null;
  }

  function countBy(rows, field, value) {
    return rows.filter(function (item) { return item[field] === value; }).length;
  }

  function uniqueValues(values) {
    var seen = {};
    return values.filter(function (value) { if (!value || seen[value]) { return false; } seen[value] = true; return true; });
  }

  function toOption(value) { return [value, value]; }
  function percent(value, total) { return total ? Math.round(value / total * 100) + "%" : "0%"; }
  function csvValue(value) { return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"'; }

  function persist() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ version: 3, records: records, specialProjects: specialProjects, routeMode: state.routeMode }));
    } catch (error) {
      return;
    }
  }

  function restoreData() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(storageKey) || "null");
      if (saved && saved.version === 3 && Array.isArray(saved.records)) {
        records = saved.records;
        specialProjects = saved.specialProjects || specialProjects;
        state.routeMode = saved.routeMode || state.routeMode;
      }
    } catch (error) {
      return;
    }
  }

  function resetDemoDataOnReload() {
    try {
      var entries = window.performance.getEntriesByType && window.performance.getEntriesByType("navigation");
      var type = entries && entries[0] ? entries[0].type : "";
      if (type === "reload" || (window.performance.navigation && window.performance.navigation.type === 1)) {
        window.localStorage.removeItem(storageKey);
      }
    } catch (error) {
      return;
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
