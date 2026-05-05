/* =========================================================================
   ANIMATIONS — implementa exatamente os 7 snippets GSAP do briefing
   - Hero headline (SplitType — substituto open-source do SplitText pago)
   - Pain checklist reveal
   - Pillars scale reveal
   - CTA pulse dourado
   - Parallax Gramado
   - Counters animados (CountUp.js)
   - Mystery card pulse infinito
   Respeita prefers-reduced-motion via gsap.matchMedia.
   ========================================================================= */

(function () {
  "use strict";

  function whenReady(fn) {
    if (window.gsap && window.ScrollTrigger) return fn();
    document.addEventListener("virada:ready", fn, { once: true });
  }

  function init() {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;

    /* ============================================================
       gsap.matchMedia — desativa tudo se prefers-reduced-motion
       ============================================================ */
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Animações ricas (apenas para quem aceita movimento)
        rich: "(prefers-reduced-motion: no-preference)",
        // Versão suave (para reduced-motion)
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { rich, reduced } = ctx.conditions;

        // ---------------------------------------------------------
        // 1. Hero headline — entrada staggered por caractere
        // ---------------------------------------------------------
        const h1 = document.querySelector(".hero-h1");
        if (h1 && typeof window.SplitType !== "undefined" && rich) {
          const split = new window.SplitType(h1, {
            types: "chars,words",
            tagName: "span",
          });
          gsap.from(split.chars, {
            opacity: 0,
            y: 80,
            rotationX: -40,
            stagger: 0.025,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.4,
          });
        } else if (h1) {
          // Fallback simples para reduced-motion ou sem SplitType
          gsap.from(h1, {
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        // ---------------------------------------------------------
        // 2. Checklist de dores — reveal no scroll
        // ---------------------------------------------------------
        const painItems = gsap.utils.toArray(".pain-item");
        if (painItems.length) {
          gsap.set(painItems, { opacity: 1 });
          gsap.from(painItems, {
            scrollTrigger: {
              trigger: ".pain-section",
              start: "top 65%",
            },
            opacity: 0,
            x: rich ? -50 : 0,
            stagger: rich ? 0.12 : 0.04,
            duration: rich ? 0.7 : 0.3,
            ease: "power2.out",
          });
        }

        // Frase de fechamento da seção de dor
        const painClosing = document.querySelector(".pain-closing");
        if (painClosing) {
          gsap.from(painClosing, {
            scrollTrigger: { trigger: painClosing, start: "top 80%" },
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: "power2.out",
          });
        }

        // ---------------------------------------------------------
        // 3. Cards dos pilares — scale reveal
        // ---------------------------------------------------------
        const pilarCards = gsap.utils.toArray(".pilar-card");
        if (pilarCards.length) {
          gsap.set(pilarCards, { opacity: 1 });
          gsap.from(pilarCards, {
            scrollTrigger: {
              trigger: ".pillars-section",
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            scale: rich ? 0.88 : 0.96,
            y: rich ? 60 : 16,
            stagger: rich ? 0.18 : 0.06,
            duration: rich ? 0.8 : 0.4,
            ease: rich ? "back.out(1.4)" : "power2.out",
          });
        }

        // ---------------------------------------------------------
        // 4. CTA pulse — brilho dourado infinito
        //    (override do CSS — animação suave em todos .cta-main)
        // ---------------------------------------------------------
        const ctas = gsap.utils.toArray(".cta-main");
        if (ctas.length && rich) {
          // Remove animação CSS para evitar conflito com a do GSAP
          ctas.forEach((el) => (el.style.animation = "none"));
          gsap.to(ctas, {
            boxShadow:
              "0 0 35px rgba(212, 168, 67, 0.7), 0 0 60px rgba(212, 168, 67, 0.3)",
            repeat: -1,
            yoyo: true,
            duration: 1.8,
            ease: "sine.inOut",
          });
        }

        // ---------------------------------------------------------
        // 5. Parallax Gramado
        // ---------------------------------------------------------
        const gramadoBg = document.querySelector(".gramado-bg");
        if (gramadoBg && rich) {
          gsap.to(gramadoBg, {
            scrollTrigger: {
              trigger: ".gramado-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
            y: -100,
            ease: "none",
          });
        }

        // ---------------------------------------------------------
        // 6. Contadores animados (CountUp.js)
        // ---------------------------------------------------------
        const startCounters = () => {
          if (typeof window.countUp === "undefined" && typeof window.CountUp === "undefined") {
            // Fallback nativo simples
            document.querySelectorAll(".counter").forEach((el) => {
              const end = parseInt(el.dataset.end || "0", 10);
              const duration = 1800;
              const start = performance.now();
              const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(end * eased).toString();
                if (p < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });
            return;
          }

          const Ctor =
            (window.countUp && window.countUp.CountUp) ||
            window.CountUp;

          document.querySelectorAll(".counter").forEach((el) => {
            const end = parseInt(el.dataset.end || "0", 10);
            try {
              const cu = new Ctor(el, end, {
                duration: 2,
                useEasing: true,
                separator: ".",
              });
              if (!cu.error) cu.start();
              else el.textContent = end.toString();
            } catch (e) {
              el.textContent = end.toString();
            }
          });
        };

        ScrollTrigger.create({
          trigger: ".counters-section",
          start: "top 75%",
          once: true,
          onEnter: startCounters,
        });

        // ---------------------------------------------------------
        // 7. Card misterioso — pulse dourado infinito
        // ---------------------------------------------------------
        const mystery = document.querySelector(".mystery-card");
        if (mystery && rich) {
          // Remove animação CSS pra evitar conflito
          mystery.style.animation = "none";
          gsap.to(mystery, {
            boxShadow:
              "0 0 20px rgba(212, 168, 67, 0.5), 0 0 60px rgba(212, 168, 67, 0.25)",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });
        }

        // ---------------------------------------------------------
        // BÔNUS — Reveal dos cards de mentores e depoimentos
        // ---------------------------------------------------------
        const mentorCards = gsap.utils.toArray(".mentor-card");
        if (mentorCards.length) {
          gsap.set(mentorCards, { opacity: 1 });
          gsap.from(mentorCards, {
            scrollTrigger: {
              trigger: ".mentors-section",
              start: "top 70%",
            },
            opacity: 0,
            y: rich ? 40 : 12,
            stagger: rich ? 0.15 : 0.05,
            duration: rich ? 0.9 : 0.4,
            ease: "power3.out",
          });
        }

        // Reveal dos cards de ingressos
        ScrollTrigger.create({
          trigger: ".tickets-section",
          start: "top 70%",
          once: true,
          onEnter: () => {
            const cards = gsap.utils.toArray(".ticket-card");
            if (!cards.length) return;
            gsap.from(cards, {
              opacity: 0,
              y: rich ? 40 : 12,
              stagger: rich ? 0.12 : 0.04,
              duration: rich ? 0.7 : 0.35,
              ease: "power2.out",
            });
          },
        });

        // Section heads
        gsap.utils.toArray(".section__head").forEach((head) => {
          gsap.from(head, {
            scrollTrigger: { trigger: head, start: "top 80%" },
            opacity: 0,
            y: rich ? 24 : 8,
            duration: rich ? 0.7 : 0.35,
            ease: "power2.out",
          });
        });

        return () => {
          // cleanup automático de matchMedia
        };
      }
    );

    // Refresca ScrollTrigger após imagens carregarem
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }

  whenReady(init);
})();
