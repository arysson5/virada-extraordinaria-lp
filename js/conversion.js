/* =========================================================================
   CONVERSION — gatilhos psicológicos
   1. Sticky CTA bar — aparece após 500px de scroll
   2. Exit intent popup — desktop, 1x por sessão
   3. Social proof toast — a cada 90s
   4. Vagas decrescentes — sessionStorage
   5. Reading progress bar — barra dourada no topo
   ========================================================================= */

(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const slotsCfg = cfg.slots || { initialSlots: 47, minSlots: 12 };
  const behavior = cfg.behavior || {};
  const SLOTS_KEY = "virada:slots";
  const EXIT_KEY = "virada:exitShown";
  const TOAST_INDEX_KEY = "virada:toastIdx";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  }

  /* =====================================================================
     1. STICKY CTA BAR
     ===================================================================== */
  function initStickyBar() {
    const bar = document.getElementById("stickyCta");
    if (!bar) return;
    const threshold = behavior.stickyBarThresholdPx || 500;

    let visible = false;
    const onScroll = () => {
      const should = window.scrollY > threshold;
      if (should !== visible) {
        visible = should;
        bar.classList.toggle("is-visible", visible);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =====================================================================
     2. EXIT INTENT POPUP
     ===================================================================== */
  function initExitIntent() {
    if (behavior.exitIntentEnabled === false) return;
    const minVw = behavior.exitIntentMinViewportPx || 1024;
    if (window.innerWidth < minVw) return;

    const modal = document.getElementById("exitModal");
    if (!modal) return;

    let shown = false;
    try {
      shown = sessionStorage.getItem(EXIT_KEY) === "1";
    } catch (e) {
      /* noop */
    }
    if (shown) return;

    const open = () => {
      if (shown) return;
      shown = true;
      try {
        sessionStorage.setItem(EXIT_KEY, "1");
      } catch (e) {
        /* noop */
      }
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      if (window.__lenis) window.__lenis.stop();

      // Foco no primeiro botão acessível
      const focusable = modal.querySelector(".btn, [data-modal-close]");
      if (focusable) focusable.focus({ preventScroll: true });
    };

    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      if (window.__lenis) window.__lenis.start();
    };

    document.documentElement.addEventListener("mouseleave", (e) => {
      if (e.clientY < 0) open();
    });

    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-modal-close]")) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  /* =====================================================================
     3. SOCIAL PROOF TOAST
     ===================================================================== */
  function initSocialToast() {
    const toast = document.getElementById("socialToast");
    if (!toast) return;
    const entries = cfg.toastEntries || [];
    if (!entries.length) return;

    const elName = toast.querySelector(".toast__name");
    const elCity = toast.querySelector(".toast__city");
    const elTicket = toast.querySelector(".toast__ticket");

    let idx = 0;
    try {
      const stored = parseInt(sessionStorage.getItem(TOAST_INDEX_KEY) || "0", 10);
      if (!Number.isNaN(stored)) idx = stored % entries.length;
    } catch (e) {
      /* noop */
    }

    const visibleMs = behavior.socialToastVisibleMs || 6000;
    const intervalMs = behavior.socialToastIntervalMs || 90000;
    const firstDelayMs = behavior.socialToastFirstDelayMs || 25000;

    const show = () => {
      const e = entries[idx % entries.length];
      if (!e) return;
      if (elName) elName.textContent = e.name;
      if (elCity) elCity.textContent = e.city;
      if (elTicket) elTicket.textContent = e.ticket;
      toast.classList.add("is-visible");
      toast.setAttribute("aria-hidden", "false");

      setTimeout(() => {
        toast.classList.remove("is-visible");
        toast.setAttribute("aria-hidden", "true");
      }, visibleMs);

      idx = (idx + 1) % entries.length;
      try {
        sessionStorage.setItem(TOAST_INDEX_KEY, String(idx));
      } catch (e) {
        /* noop */
      }
    };

    setTimeout(() => {
      show();
      setInterval(show, intervalMs);
    }, firstDelayMs);
  }

  /* =====================================================================
     4. VAGAS DECRESCENTES (sessionStorage)
     ===================================================================== */
  function initSlots() {
    const initial = slotsCfg.initialSlots || 47;
    const min = slotsCfg.minSlots || 12;
    const minMin = slotsCfg.decrementMinIntervalMin || 8;
    const maxMin = slotsCfg.decrementMaxIntervalMin || 15;

    function read() {
      try {
        const v = parseInt(sessionStorage.getItem(SLOTS_KEY) || "", 10);
        if (!Number.isNaN(v) && v <= initial && v >= min) return v;
      } catch (e) {
        /* noop */
      }
      return initial;
    }
    function write(v) {
      try {
        sessionStorage.setItem(SLOTS_KEY, String(v));
      } catch (e) {
        /* noop */
      }
    }

    let current = read();
    write(current);

    function paint() {
      document.querySelectorAll("[data-slots]").forEach((el) => {
        el.textContent = String(current);
      });
    }
    paint();

    function scheduleNext() {
      if (current <= min) return;
      const minMs = minMin * 60 * 1000;
      const maxMs = maxMin * 60 * 1000;
      const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
      setTimeout(() => {
        if (current > min) {
          current -= 1;
          write(current);
          paint();
          scheduleNext();
        }
      }, delay);
    }
    scheduleNext();
  }

  /* =====================================================================
     5. READING PROGRESS BAR
     ===================================================================== */
  function initReadingProgress() {
    const bar = document.getElementById("readingProgressBar");
    if (!bar) return;

    let raf = null;
    function paint() {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, (scrollTop / docH) * 100) : 0;
      bar.style.width = pct.toFixed(2) + "%";
      raf = null;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (raf == null) raf = requestAnimationFrame(paint);
      },
      { passive: true }
    );
    paint();
  }

  ready(() => {
    initStickyBar();
    initExitIntent();
    initSocialToast();
    initSlots();
    initReadingProgress();
  });
})();
