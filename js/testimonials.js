/* =========================================================================
   TESTIMONIALS — Swiper.js com depoimentos do config
   ========================================================================= */

(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSlides(track, items) {
    track.innerHTML = items
      .map(
        (t) => `
        <article class="swiper-slide testimonial-card">
          <p class="testimonial-card__quote">${escapeHtml(t.quote)}</p>
          <div class="testimonial-card__person">
            <img class="testimonial-card__photo"
                 src="${escapeHtml(t.photo)}"
                 alt="Foto de ${escapeHtml(t.name)}"
                 loading="lazy"
                 decoding="async"
                 width="56"
                 height="56" />
            <div>
              <span class="testimonial-card__name">${escapeHtml(t.name)}</span>
              <span class="testimonial-card__role">${escapeHtml(t.role)}</span>
              <span class="testimonial-card__city">${escapeHtml(t.city)}</span>
            </div>
          </div>
        </article>
      `
      )
      .join("");
  }

  function init() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;
    const list = cfg.testimonials || [];
    if (!list.length) return;

    const track = document.getElementById("testimonialsTrack");
    const root = document.querySelector(".testimonials-swiper");
    if (!track || !root) return;

    renderSlides(track, list);

    if (typeof window.Swiper === "undefined") {
      console.warn("[Virada] Swiper não carregou.");
      return;
    }

    new window.Swiper(root, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".testimonials-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".testimonials-swiper .swiper-button-prev",
        nextEl: ".testimonials-swiper .swiper-button-next",
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 20 },
        1280: { slidesPerView: 3, spaceBetween: 24 },
      },
      a11y: {
        prevSlideMessage: "Depoimento anterior",
        nextSlideMessage: "Próximo depoimento",
      },
    });
  }

  ready(init);
})();
