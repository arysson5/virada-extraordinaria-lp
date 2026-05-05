/* =========================================================================
   COUNTDOWN — alimenta TODOS os blocos [data-countdown] da página
   - Lê config.event.eventDate (ISO 8601)
   - Persiste data alvo em localStorage (apenas para detectar mudança/refresh
     mantendo a mesma URL); o valor exibido é sempre recalculado contra Date.now()
   - Atualiza dias/horas/min/seg sincronizados em todas as instâncias
   ========================================================================= */

(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  if (!cfg || !cfg.event || !cfg.event.eventDate) {
    console.warn("[Virada] eventDate não encontrado em config.event.eventDate.");
    return;
  }

  const STORAGE_KEY = "virada:eventDate";

  // Persistência: se a data do evento mudar no config, atualizamos o storage.
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== cfg.event.eventDate) {
      localStorage.setItem(STORAGE_KEY, cfg.event.eventDate);
    }
  } catch (e) {
    /* localStorage indisponível — segue sem cache */
  }

  const targetMs = new Date(cfg.event.eventDate).getTime();
  if (Number.isNaN(targetMs)) {
    console.warn("[Virada] eventDate inválido:", cfg.event.eventDate);
    return;
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function update() {
    const now = Date.now();
    const diff = Math.max(0, targetMs - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const groups = document.querySelectorAll("[data-countdown]");
    groups.forEach((group) => {
      const d = group.querySelector('[data-cd="days"]');
      const h = group.querySelector('[data-cd="hours"]');
      const m = group.querySelector('[data-cd="minutes"]');
      const s = group.querySelector('[data-cd="seconds"]');
      if (d) d.textContent = pad(days);
      if (h) h.textContent = pad(hours);
      if (m) m.textContent = pad(minutes);
      if (s) s.textContent = pad(seconds);
    });

    if (diff === 0) {
      // Evento iniciou — substitui pelo aviso
      groups.forEach((group) => {
        group.innerHTML =
          '<span class="countdown__live">A noite começou. Boa Virada.</span>';
      });
      clearInterval(timer);
    }
  }

  function start() {
    update();
    return setInterval(update, 1000);
  }

  let timer;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => (timer = start()), {
      once: true,
    });
  } else {
    timer = start();
  }
})();
