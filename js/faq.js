/* =========================================================================
   FAQ — comportamento de acordeão acessível
   - <details>/<summary> nativos cuidam de open/close e a11y.
   - Este script: anima a altura da resposta e fecha outros itens (modo
     "exclusivo"), mantendo o foco e o aria-expanded coerentes.
   ========================================================================= */

(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  }

  function init() {
    const items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach((item) => {
      const summary = item.querySelector("summary");
      const answer = item.querySelector(".faq-item__a");
      if (!summary || !answer) return;

      summary.setAttribute("role", "button");
      summary.setAttribute("aria-expanded", item.hasAttribute("open") ? "true" : "false");

      summary.addEventListener("click", (ev) => {
        ev.preventDefault();

        const isOpen = item.hasAttribute("open");

        // Modo exclusivo: fecha os outros
        if (!isOpen) {
          items.forEach((other) => {
            if (other !== item && other.hasAttribute("open")) {
              const oa = other.querySelector(".faq-item__a");
              const os = other.querySelector("summary");
              if (oa) collapse(other, oa);
              if (os) os.setAttribute("aria-expanded", "false");
            }
          });
        }

        if (isOpen) {
          collapse(item, answer);
        } else {
          expand(item, answer);
        }
        summary.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  function expand(item, answer) {
    item.setAttribute("open", "");
    answer.style.height = "0px";
    answer.style.overflow = "hidden";
    const target = answer.scrollHeight;
    requestAnimationFrame(() => {
      answer.style.transition = "height 320ms ease";
      answer.style.height = target + "px";
    });
    answer.addEventListener(
      "transitionend",
      () => {
        answer.style.height = "";
        answer.style.overflow = "";
        answer.style.transition = "";
      },
      { once: true }
    );
  }

  function collapse(item, answer) {
    const startH = answer.getBoundingClientRect().height;
    answer.style.height = startH + "px";
    answer.style.overflow = "hidden";
    answer.style.transition = "height 280ms ease";
    requestAnimationFrame(() => {
      answer.style.height = "0px";
    });
    answer.addEventListener(
      "transitionend",
      () => {
        item.removeAttribute("open");
        answer.style.height = "";
        answer.style.overflow = "";
        answer.style.transition = "";
      },
      { once: true }
    );
  }

  ready(init);
})();
