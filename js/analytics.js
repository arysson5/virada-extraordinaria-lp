/* =========================================================================
   ANALYTICS — Pixel Meta + Google Analytics 4 + Microsoft Clarity
   - Carrega cada um SOMENTE se o ID estiver preenchido em config.analytics
   - Dispara PageView e captura cliques em qualquer [data-cta]
   ========================================================================= */

(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const a = cfg.analytics || {};

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  }

  /* ============================================================
     Meta Pixel
     ============================================================ */
  function loadMetaPixel(id) {
    if (!id) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  /* ============================================================
     Google Analytics 4
     ============================================================ */
  function loadGA4(id) {
    if (!id) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: true });
  }

  /* ============================================================
     Microsoft Clarity
     ============================================================ */
  function loadClarity(id) {
    if (!id) return;
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", id);
  }

  /* ============================================================
     Bind CTAs — track em todos elementos [data-cta]
     ============================================================ */
  function bindCtaTracking() {
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-cta]");
      if (!el) return;
      const ctaId = el.dataset.cta || "unknown";

      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", { content_name: ctaId });
      }
      if (window.gtag) {
        window.gtag("event", "select_content", {
          content_type: "cta",
          item_id: ctaId,
        });
      }
    });
  }

  ready(() => {
    loadMetaPixel(a.metaPixelId);
    loadGA4(a.ga4Id);
    loadClarity(a.clarityId);
    bindCtaTracking();
  });
})();
