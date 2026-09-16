(function () {
  "use strict";

  var toastTimer = null;

  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function showToast(message) {
    var toast = qs("#commonToast");

    if (!toast) {
      return;
    }

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");

    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("zh-CN").format(value);
  }

  function openModal(modal) {
    if (!modal) {
      return;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    var focusable = modal.querySelector("input, select, button");
    if (focusable) {
      window.setTimeout(function () {
        focusable.focus();
      }, 30);
    }
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function initCommonInteractions() {
    document.addEventListener("click", function (event) {
      var comingTarget = event.target.closest("[data-coming]");
      var sidebarToggle = event.target.closest("[data-action='toggle-sidebar']");
      var modalClose = event.target.closest("[data-modal-close]");

      if (comingTarget) {
        showToast(comingTarget.getAttribute("data-coming"));
      }

      if (sidebarToggle) {
        qs(".app-shell").classList.toggle("is-sidebar-collapsed");
      }

      if (modalClose) {
        closeModal(modalClose.closest(".common-modal"));
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }

      qsa(".common-modal.is-open").forEach(closeModal);
    });
  }

  function initSystemManagementNavigation() {
    var inPages = window.location.pathname.replace(/\\/g, "/").indexOf("/pages/") > -1;
    var prefix = inPages ? "./" : "./pages/";
    var activePage = document.body.getAttribute("data-system-page") || "";

    qsa(".common-nav-section").forEach(function (section) {
      var heading = section.querySelector("h2");
      if (!heading || heading.textContent.trim() !== "系统管理") {
        return;
      }

      var accountItem = qsa(".common-nav-item", section).filter(function (item) {
        return item.textContent.trim() === "账号管理";
      })[0];

      if (accountItem && accountItem.tagName !== "A") {
        var accountLink = document.createElement("a");
        accountLink.className = accountItem.className;
        accountLink.href = prefix + "module-account-management.html";
        accountLink.innerHTML = accountItem.innerHTML;
        accountItem.replaceWith(accountLink);
        accountItem = accountLink;
      }

      if (accountItem) {
        accountItem.classList.toggle("is-active", activePage === "accounts");
      }

      var roleItem = qsa(".common-nav-item", section).filter(function (item) {
        return item.textContent.trim() === "角色管理";
      })[0];
      if (!roleItem && accountItem) {
        roleItem = document.createElement("a");
        roleItem.className = "common-nav-item";
        roleItem.href = prefix + "module-role-management.html";
        roleItem.innerHTML = '<span class="common-nav-icon common-icon-role" aria-hidden="true"></span><span>角色管理</span>';
        accountItem.insertAdjacentElement("afterend", roleItem);
      }
      if (roleItem) {
        roleItem.classList.toggle("is-active", activePage === "roles");
      }
    });
  }

  window.BrandInsightCommon = {
    qs: qs,
    qsa: qsa,
    showToast: showToast,
    formatNumber: formatNumber,
    openModal: openModal,
    closeModal: closeModal
  };

  initSystemManagementNavigation();
  initCommonInteractions();
})();
