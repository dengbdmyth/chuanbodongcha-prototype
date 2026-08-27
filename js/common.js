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

  window.BrandInsightCommon = {
    qs: qs,
    qsa: qsa,
    showToast: showToast,
    formatNumber: formatNumber,
    openModal: openModal,
    closeModal: closeModal
  };

  initCommonInteractions();
})();
