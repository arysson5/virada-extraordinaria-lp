/* =========================================================================
   MAIN — bootstrap geral
   - Lenis smooth scroll
   - GSAP + ScrollTrigger registrados
   - Render dos ingressos a partir do config
   - Links do WhatsApp populados
   - Ano do rodapé
   - Smooth-scroll para âncoras internas
   ========================================================================= */

(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  if (!cfg) {
    console.warn("[Virada] config.js não carregou — abortando bootstrap.");
    return;
  }

  /* ----------------------------------------------------------------------
     Detecta libs (carregadas com defer; bootstrap depende do DOMContentLoaded)
     ---------------------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  /* ----------------------------------------------------------------------
     LENIS smooth scroll + integração com ScrollTrigger
     ---------------------------------------------------------------------- */
  function initLenis() {
    if (typeof Lenis === "undefined") return null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return null;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((t) => lenis.raf(t * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }

    window.__lenis = lenis;
    return lenis;
  }

  /* ----------------------------------------------------------------------
     Escape HTML — textos vindos do config (cronograma, etc.)
     ---------------------------------------------------------------------- */
  function escapeHtml(text) {
    if (text == null || text === "") return "";
    const d = document.createElement("div");
    d.textContent = String(text);
    return d.innerHTML;
  }

  /* ----------------------------------------------------------------------
     RENDER — Cronograma (textos em SITE_CONFIG.cronograma)
     ---------------------------------------------------------------------- */
  function renderCronograma() {
    const mount = document.getElementById("cronogramaMount");
    const data = cfg.cronograma;
    if (!mount || !data) return;

    const blocks = Array.isArray(data.blocks)
      ? data.blocks
          .map(
            (b) => `
        <li class="cronograma-step">
          <div class="cronograma-step__rail" aria-hidden="true">
            <span class="cronograma-step__dot"></span>
          </div>
          <div class="cronograma-step__content">
            <article class="cronograma-card">
              <span class="cronograma-card__tag">${escapeHtml(b.tag)}</span>
              <h3 class="cronograma-card__title">${escapeHtml(b.title)}</h3>
              <p class="cronograma-card__text">${escapeHtml(b.text)}</p>
            </article>
          </div>
        </li>`
          )
          .join("")
      : "";

    const note = data.closingNote
      ? `<p class="cronograma-note">${escapeHtml(data.closingNote)}</p>`
      : "";

    mount.innerHTML = `
      <header class="section__head">
        <span class="eyebrow">${escapeHtml(data.eyebrow)}</span>
        <h2 class="section__title">${escapeHtml(data.title)}</h2>
        <p class="section__lead">${escapeHtml(data.lead)}</p>
      </header>
      <ol class="cronograma-timeline" aria-label="Fluxo da experiência na ordem da noite">${blocks}</ol>
      ${note}
    `;

    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  /* ----------------------------------------------------------------------
     RENDER — Ingressos (Seção 7)
     ---------------------------------------------------------------------- */
  function renderTickets() {
    const grid = document.getElementById("ticketsGrid");
    if (!grid || !Array.isArray(cfg.tickets)) return;

    const checkSvg = `
      <svg class="ticket-card__check" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    const fallbackUrl = cfg.checkoutUrl || "#";

    grid.innerHTML = cfg.tickets
      .map((t) => {
        const featured = t.featured ? " ticket-card--featured" : "";
        const badge = t.featured && t.featuredLabel
          ? `<span class="ticket-card__badge">${t.featuredLabel}</span>`
          : "";
        const benefits = (t.benefits || [])
          .map((b) => `<li>${checkSvg}<span>${b}</span></li>`)
          .join("");
        const ctaClass = t.featured ? "btn btn--primary cta-main" : "btn btn--ghost";
        const url = t.checkoutUrl || fallbackUrl;
        return `
          <article class="ticket-card${featured}" data-ticket="${t.id}">
            ${badge}
            <h3 class="ticket-card__name">${t.name}</h3>
            <p class="ticket-card__tagline">${t.tagline || ""}</p>
            <div class="ticket-card__price">${t.price}</div>
            <div class="ticket-card__installments">${t.installments || ""}</div>
            <ul class="ticket-card__benefits" role="list">${benefits}</ul>
            <a class="${ctaClass}" href="${url}" target="_blank" rel="noopener noreferrer" data-cta="ticket-${t.id}">
              ${t.ctaLabel || "Garantir vaga"}
            </a>
          </article>
        `;
      })
      .join("");
  }

  /* ----------------------------------------------------------------------
     WHATSAPP — gera URLs com mensagem pré-preenchida
     ---------------------------------------------------------------------- */
  function buildWhatsAppUrl() {
    const wp = cfg.whatsapp || {};
    const num = (wp.number || "").replace(/\D/g, "");
    const msg = encodeURIComponent(wp.message || "");
    return `https://wa.me/${num}${msg ? `?text=${msg}` : ""}`;
  }

  function applyWhatsApp() {
    const url = buildWhatsAppUrl();
    const targets = document.querySelectorAll(
      "#footerWhatsapp, #exitWhatsapp, [data-whatsapp]"
    );
    targets.forEach((el) => {
      el.setAttribute("href", url);
    });
  }

  /* ----------------------------------------------------------------------
     ANO DO RODAPÉ
     ---------------------------------------------------------------------- */
  function applyFooterYear() {
    const y = document.getElementById("footerYear");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ----------------------------------------------------------------------
     IMAGENS — aplica caminhos do config (sobrescreve src do HTML se houver)
     ---------------------------------------------------------------------- */
  function applyImages() {
    const imgs = cfg.images || {};
    const map = [
      { selector: ".hero__bg img", src: imgs.heroBackground },
      { selector: ".gramado-bg img", src: imgs.gramadoParallax },
      { selector: ".mentor-card--gold .mentor-card__photo img", src: imgs.iranPhoto },
      { selector: ".mentor-card--cyan .mentor-card__photo img", src: imgs.gledisonPhoto },
      { selector: ".mentor-card--warm .mentor-card__photo img", src: imgs.denisPhoto },
    ];
    map.forEach(({ selector, src }) => {
      if (!src) return;
      const el = document.querySelector(selector);
      if (el && el.getAttribute("src") !== src) {
        el.setAttribute("src", src);
      }
    });
  }

  /* ----------------------------------------------------------------------
     SMOOTH SCROLL para âncoras internas (#hero, #ingressos etc.)
     ---------------------------------------------------------------------- */
  function bindAnchorScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ----------------------------------------------------------------------
     BOOTSTRAP
     ---------------------------------------------------------------------- */
  ready(() => {
    document.documentElement.classList.add("js-ready");

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    initLenis();
    renderCronograma();
    renderTickets();
    applyWhatsApp();
    applyFooterYear();
    applyImages();
    bindAnchorScroll();

    document.dispatchEvent(new CustomEvent("virada:ready"));
  });
})();
