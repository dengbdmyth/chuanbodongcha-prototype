(function () {
  "use strict";

  var Common = window.BrandInsightCommon;

  var projects = [
    {
      id: 1,
      title: "品牌数据清洗监测与预处理执行任务",
      type: "account",
      typeLabel: "媒体账号监测",
      status: "archived",
      statusLabel: "归档",
      channels: ["微博", "抖音", "快手", "懂车帝"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 2,
      title: "新车上市口碑实时跟踪任务",
      type: "keyword",
      typeLabel: "关键词监测",
      status: "archived",
      statusLabel: "归档",
      channels: ["微博", "抖音", "快手", "懂车帝"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 3,
      title: "多平台用户情感倾向分析任务",
      type: "keyword",
      typeLabel: "关键词监测",
      status: "draft",
      statusLabel: "草稿",
      channels: ["微博", "抖音", "快手", "懂车帝"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 4,
      title: "多平台用户情感倾向分析任务",
      type: "keyword",
      typeLabel: "关键词监测",
      status: "archived",
      statusLabel: "归档",
      channels: ["微博", "抖音", "快手"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 5,
      title: "品牌数据清洗监测与预处理执行任务",
      type: "account",
      typeLabel: "媒体账号监测",
      status: "draft",
      statusLabel: "草稿",
      channels: ["微博", "抖音", "快手"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 6,
      title: "汽车品牌全网声誉监测运行任务",
      type: "mixed",
      typeLabel: "关键词监测",
      status: "draft",
      statusLabel: "草稿",
      channels: ["微博", "抖音", "快手", "懂车帝"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 7,
      title: "质量投诉热点挖掘与归因任务",
      type: "keyword",
      typeLabel: "关键词监测",
      status: "running",
      statusLabel: "运行中",
      channels: ["微博", "抖音", "快手"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 8,
      title: "多平台用户监测",
      type: "account",
      typeLabel: "媒体账号监测",
      status: "running",
      statusLabel: "运行中",
      channels: ["微博", "抖音", "快手", "懂车帝"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    },
    {
      id: 9,
      title: "品牌数据清洗监测与预处理执行任务",
      type: "account",
      typeLabel: "媒体账号监测",
      status: "running",
      statusLabel: "运行中",
      channels: ["微博", "抖音", "快手", "懂车帝"],
      dataCount: 2540,
      comments: 75,
      positive: 72,
      negative: 8,
      neutral: 20,
      created: "2026-04-08"
    }
  ];

  var state = {
    tab: "all",
    view: "grid",
    keyword: "",
    monitorType: "all",
    sentiment: "all",
    created: "",
    platform: "all",
    projectStatus: "all",
    sort: "created-desc"
  };

  var channelClassMap = {
    "微博": "logo-weibo",
    "抖音": "logo-douyin",
    "快手": "logo-kuaishou",
    "懂车帝": "logo-auto"
  };

  function init() {
    bindEvents();
    animateKpi();
    renderTabs();
    renderProjects();
  }

  function bindEvents() {
    Common.qs("#homeApplyFilters").addEventListener("click", applyFilters);
    Common.qs("#homeResetFilters").addEventListener("click", resetFilters);
    Common.qs("#homeExpandFilters").addEventListener("click", toggleAdvancedFilters);
    Common.qs("#homeSort").addEventListener("change", function (event) {
      state.sort = event.target.value;
      renderProjects();
    });
    Common.qs("#homeCreateProject").addEventListener("click", function () {
      Common.openModal(Common.qs("#homeProjectModal"));
    });
    Common.qs("#homeProjectForm").addEventListener("submit", createProject);

    Common.qsa(".home-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        state.tab = tab.getAttribute("data-tab");
        state.projectStatus = "all";
        Common.qs("#homeProjectStatus").value = "all";
        renderTabs();
        renderProjects();
      });
    });

    Common.qsa(".home-view-switch button").forEach(function (button) {
      button.addEventListener("click", function () {
        state.view = button.getAttribute("data-view");
        renderViewSwitch();
        renderProjects();
      });
    });

    Common.qs("#homeProjectGrid").addEventListener("click", function (event) {
      var editButton = event.target.closest("[data-edit]");
      var moreButton = event.target.closest("[data-more]");
      var card = event.target.closest(".home-project-card");

      if (editButton) {
        Common.showToast("已进入“" + editButton.getAttribute("data-edit") + "”的配置编辑态");
        return;
      }

      if (moreButton) {
        Common.showToast("更多操作：复制项目、归档、查看运行日志");
        return;
      }

      if (card) {
        Common.showToast("项目详情页将在该模块独立开发时接入");
      }
    });
  }

  function animateKpi() {
    Common.qsa("[data-count-up]").forEach(function (node) {
      var target = Number(node.getAttribute("data-count-up"));
      var start = 0;
      var duration = 620;
      var startTime = performance.now();

      function tick(now) {
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Common.formatNumber(Math.round(start + (target - start) * eased));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
    });
  }

  function applyFilters() {
    state.keyword = Common.qs("#homeSearch").value.trim();
    state.monitorType = Common.qs("#homeMonitorType").value;
    state.sentiment = Common.qs("#homeSentiment").value;
    state.created = Common.qs("#homeCreatedDate").value;
    state.platform = Common.qs("#homePlatform").value;
    state.projectStatus = Common.qs("#homeProjectStatus").value;

    renderProjects();
    Common.showToast("筛选条件已应用");
  }

  function resetFilters() {
    state.keyword = "";
    state.monitorType = "all";
    state.sentiment = "all";
    state.created = "";
    state.platform = "all";
    state.projectStatus = "all";

    Common.qs("#homeSearch").value = "";
    Common.qs("#homeMonitorType").value = "all";
    Common.qs("#homeSentiment").value = "all";
    Common.qs("#homeCreatedDate").value = "";
    Common.qs("#homePlatform").value = "all";
    Common.qs("#homeProjectStatus").value = "all";

    renderProjects();
    Common.showToast("筛选条件已重置");
  }

  function toggleAdvancedFilters() {
    var row = Common.qs("#homeAdvancedFilters");
    var button = Common.qs("#homeExpandFilters");
    var isHidden = row.hasAttribute("hidden");

    if (isHidden) {
      row.removeAttribute("hidden");
      button.textContent = "收起";
    } else {
      row.setAttribute("hidden", "");
      button.textContent = "展开";
    }
  }

  function renderTabs() {
    var counts = projects.reduce(function (acc, project) {
      acc.all += 1;
      acc[project.status] += 1;
      return acc;
    }, { all: 0, running: 0, draft: 0, archived: 0 });

    Common.qsa(".home-tab").forEach(function (tab) {
      var tabValue = tab.getAttribute("data-tab");
      var countNode = tab.querySelector("span");
      var selected = state.tab === tabValue;

      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", selected ? "true" : "false");

      if (!countNode) {
        countNode = document.createElement("span");
        tab.appendChild(countNode);
      }

      countNode.textContent = counts[tabValue];
    });
  }

  function renderViewSwitch() {
    Common.qsa(".home-view-switch button").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-view") === state.view);
    });
  }

  function renderProjects() {
    var grid = Common.qs("#homeProjectGrid");
    var filtered = getFilteredProjects();

    grid.classList.toggle("is-list-view", state.view === "list");

    if (!filtered.length) {
      grid.innerHTML = '<div class="home-empty">未找到符合条件的监测项目</div>';
      return;
    }

    grid.innerHTML = filtered.map(renderProjectCard).join("");
  }

  function getFilteredProjects() {
    return projects
      .filter(function (project) {
        var keywordMatched = !state.keyword || project.title.indexOf(state.keyword) > -1;
        var tabMatched = state.tab === "all" || project.status === state.tab;
        var typeMatched = state.monitorType === "all" || project.type === state.monitorType;
        var dateMatched = !state.created || project.created === state.created;
        var platformMatched = state.platform === "all" || project.channels.indexOf(state.platform) > -1;
        var statusMatched = state.projectStatus === "all" || project.status === state.projectStatus;
        var sentimentMatched = getSentimentMatched(project);

        return keywordMatched && tabMatched && typeMatched && dateMatched && platformMatched && statusMatched && sentimentMatched;
      })
      .sort(sortProjects);
  }

  function getSentimentMatched(project) {
    if (state.sentiment === "all") {
      return true;
    }

    if (state.sentiment === "positive") {
      return project.positive >= project.negative && project.positive >= project.neutral;
    }

    if (state.sentiment === "negative") {
      return project.negative >= 8;
    }

    return project.neutral >= project.positive && project.neutral >= project.negative;
  }

  function sortProjects(a, b) {
    if (state.sort === "comments-desc") {
      return b.comments - a.comments || b.id - a.id;
    }

    if (state.sort === "data-desc") {
      return b.dataCount - a.dataCount || b.id - a.id;
    }

    return new Date(b.created).getTime() - new Date(a.created).getTime() || b.id - a.id;
  }

  function renderProjectCard(project) {
    var channels = project.channels.slice(0, 4).map(renderChannel).join("");
    var extra = project.channels.length > 3 ? '<span class="home-channel-chip">+3</span>' : "";

    return [
      '<article class="home-project-card" data-project-id="' + project.id + '">',
      '  <div class="home-card-body">',
      '    <div class="home-card-title-row">',
      '      <h3 class="home-card-title">' + escapeHtml(project.title) + '</h3>',
      '      <span class="home-status home-status-' + project.status + '">' + project.statusLabel + '</span>',
      '    </div>',
      '    <div class="home-monitor-line">',
      '      <span>' + project.typeLabel + '</span>',
      '      <span class="home-monitor-separator"></span>',
      channels,
      extra,
      '    </div>',
      '    <div class="home-card-stats">',
      '      <span>数据量 <strong>' + Common.formatNumber(project.dataCount) + '</strong></span>',
      '      <span>评论量 <strong>' + Common.formatNumber(project.comments) + '</strong></span>',
      '    </div>',
      '    <div class="home-sentiment">',
      '      <span>情感分析</span>',
      '      <span>正<strong>' + project.positive + '%</strong></span>',
      '      <span>负<strong>' + project.negative + '%</strong></span>',
      '      <span>中<strong>' + project.neutral + '%</strong></span>',
      '    </div>',
      '  </div>',
      '  <footer class="home-card-footer">',
      '    <span>创建于 ' + project.created + '</span>',
      '    <div class="home-card-actions">',
      '      <button class="home-more-button" type="button" data-more="' + project.id + '" aria-label="更多操作">...</button>',
      '      <button class="common-button home-edit-button" type="button" data-edit="' + escapeHtml(project.title) + '">编辑配置</button>',
      '    </div>',
      '  </footer>',
      '</article>'
    ].join("");
  }

  function renderChannel(channel) {
    var className = channelClassMap[channel] || "logo-weibo";
    var letter = channel.slice(0, 1);

    return [
      '<span class="home-channel-chip">',
      '  <span class="home-channel-logo ' + className + '">' + letter + '</span>',
      escapeHtml(channel),
      '</span>'
    ].join("");
  }

  function createProject(event) {
    event.preventDefault();

    var form = event.currentTarget;
    var formData = new FormData(form);
    var type = String(formData.get("type"));
    var platform = String(formData.get("platform"));
    var title = String(formData.get("title")).trim();

    if (!title) {
      Common.showToast("请输入项目名称");
      return;
    }

    projects.unshift({
      id: Date.now(),
      title: title,
      type: type,
      typeLabel: type === "account" ? "媒体账号监测" : type === "mixed" ? "混合监测" : "关键词监测",
      status: "running",
      statusLabel: "运行中",
      channels: [platform, "微博", "抖音", "快手"].filter(function (item, index, list) {
        return list.indexOf(item) === index;
      }),
      dataCount: 0,
      comments: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      created: new Date().toISOString().slice(0, 10)
    });

    form.reset();
    Common.closeModal(Common.qs("#homeProjectModal"));
    state.tab = "all";
    renderTabs();
    renderProjects();
    Common.showToast("新建监测项目已加入列表");
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
