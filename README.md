# Virada Extraordinária — Landing Page

Landing page premium estática (HTML/CSS/JS vanilla) para o evento presencial
**Virada Extraordinária** em Gramado/RS. Construída para alta conversão, alta
performance (PageSpeed > 85) e edição rápida sem build step.

---

## 1. Estrutura

```
landing page/
├── index.html               (página única — todas as 10 seções)
├── css/
│   ├── reset.css            (reset moderno + acessibilidade)
│   ├── tokens.css           (cores, fontes, spacing — fonte única de verdade)
│   ├── base.css             (tipografia, container, ruído de fundo)
│   ├── components.css       (botões, badges, sticky, toast, modal, FAQ)
│   ├── sections.css         (estilos das 10 seções)
│   └── animations.css       (keyframes auxiliares + estados iniciais)
├── js/
│   ├── config.js            ⭐ ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR
│   ├── main.js              (bootstrap, Lenis, render dos ingressos)
│   ├── animations.js        (7 animações GSAP do briefing)
│   ├── countdown.js         (cronômetro do evento, persistente)
│   ├── conversion.js        (sticky bar, exit-intent, toast, vagas, progress)
│   ├── faq.js               (acordeão acessível)
│   ├── testimonials.js      (Swiper de depoimentos)
│   └── analytics.js         (Pixel Meta + GA4 + Clarity opcionais)
├── assets/
│   ├── icons/favicon.svg
│   └── images/og-image.jpg  (substitua pela arte oficial 1200x630)
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 2. Como editar — passo a passo

Tudo que precisa ser alterado fica em **`js/config.js`**. Os outros arquivos
não exigem edição manual.

### 2.1. Data e hora do evento (countdown)

```js
event: {
  ...
  eventDate: "2026-08-15T19:00:00-03:00",
}
```

Use ISO 8601 com fuso `-03:00` (Brasília). O countdown recalcula em tempo
real e exibe automaticamente nas duas instâncias da página (hero e CTA final).

### 2.2. Vagas (gatilho de escassez)

```js
slots: {
  initialSlots: 47,        // exibido na primeira visita
  minSlots: 12,            // piso do decréscimo automático
  decrementMinIntervalMin: 8,
  decrementMaxIntervalMin: 15,
}
```

O número decrementa visualmente em intervalos aleatórios entre `min` e `max`
minutos. Persiste por sessão (não reseta entre abas).

### 2.3. WhatsApp de suporte

```js
whatsapp: {
  number: "5551999999999",   // só dígitos: DDI + DDD + número
  message: "Olá! Quero saber mais sobre a Virada Extraordinária...",
}
```

Aplicado automaticamente nos links do rodapé e do popup de exit-intent.

### 2.4. Links de checkout (Greenn)

```js
tickets: [
  {
    id: "diamond",
    name: "Diamond Individual",
    price: "R$ 397",
    featured: true,                   // borda dourada animada + badge
    featuredLabel: "★ Mais Escolhido",
    checkoutUrl: "https://greenn.com.br/SEU_CHECKOUT_REAL",
    benefits: [...],
  },
  // ...outros 3
]
```

Apenas **um** ingresso pode ter `featured: true` — ele recebe o destaque
visual e o badge "Mais Escolhido".

### 2.5. Pixel Meta, GA4, Clarity

```js
analytics: {
  metaPixelId: "1234567890123456",   // vazio = desativado
  ga4Id: "G-XXXXXXXXXX",
  clarityId: "abcdef1234",
}
```

Cada um carrega **somente se o ID estiver preenchido**. PageView é disparado
automaticamente. Cliques em qualquer `[data-cta]` são rastreados como
`InitiateCheckout` (Pixel) e `select_content` (GA4).

### 2.6. Depoimentos e toasts

Listas `testimonials` e `toastEntries` no `config.js` — adicione/remova à
vontade. O Swiper e o gatilho de social proof se adaptam automaticamente.

---

## 3. Substituindo as imagens

Por padrão, a página usa imagens do **Unsplash** com auto-format WebP/AVIF
para acelerar o primeiro carregamento. Para substituir por imagens próprias:

1. Salve as imagens em `assets/images/` em formato WebP
   (recomendado) ou JPG otimizado.
2. Atualize os atributos `src`/`srcset` no `index.html`:
   - **Hero**: linhas com `photo-1606851094291-6efae152bb87`
   - **Mentores**: `photo-1560250097...` (Iran), `photo-1549213783...` (Gledison)
   - **Gramado**: `photo-1483728642387...` (parallax) e galeria
   - **CTA Final**: `photo-1496715976403...`
3. Substitua `assets/images/og-image.jpg` pela arte oficial **1200x630**
   (exigência do Open Graph para compartilhamento em redes).

Dica: use [squoosh.app](https://squoosh.app) para gerar WebP otimizado.

---

## 4. Deploy

### Opção 1 — GitHub Pages (este repositório)

O workflow em `.github/workflows/deploy.yml` publica automaticamente em cada
push na branch `main`.

**Antes do primeiro deploy funcionar**, habilite o Pages uma vez:

1. Abra **Settings** → **Pages** no repositório.
2. Em **Build and deployment** → **Source**, escolha **GitHub Actions** (não
   “Deploy from a branch”).
3. Faça um novo push ou rode o workflow manualmente em **Actions**.

URL típica: `https://SEU-USUARIO.github.io/NOME-DO-REPO/`

Se você vir erro na action `configure-pages`: este projeto **não usa** mais
esse passo — HTML estático só precisa de `upload-pages-artifact` +
`deploy-pages`.

### Opção 2 — Netlify (drag-and-drop)

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta inteira `landing page/`
3. Pronto. URL pública gerada em segundos.

### Opção 3 — Vercel

```bash
npm i -g vercel
vercel deploy --prod
```

### Opção 4 — Hospedagem tradicional (FTP)

Suba todos os arquivos para o `public_html/`. Funciona em qualquer servidor
estático (Apache, Nginx, etc.) — não precisa de Node.js, PHP ou banco.

---

## 5. Stack utilizada (CDN, sem instalação)

| Lib            | Versão | Função                                        |
| -------------- | ------ | --------------------------------------------- |
| GSAP + ScrollTrigger | 3.12.5 | animações scroll-driven                  |
| SplitType      | 0.3.4  | substituto open-source do SplitText (pago)    |
| Lenis          | 1.1.13 | smooth scroll de alto desempenho              |
| Swiper.js      | 11     | carrossel de depoimentos                      |
| CountUp.js     | 2.8.0  | contadores animados                           |

> **Por que SplitType e não SplitText?**
> O `SplitText` é plugin pago (Club GreenSock). O `SplitType` é open-source,
> tem API equivalente e produz o mesmo efeito de stagger por caractere
> exigido pelo briefing.

---

## 6. Acessibilidade & Performance

- Mobile-first com breakpoints 375 / 768 / 1024 / 1280
- Contraste AA garantido (texto principal ≈ 14:1)
- Skip link, foco visível, `aria-expanded` no FAQ, `aria-live` em vagas/toasts
- `prefers-reduced-motion` respeitado (animações desligam)
- Fontes com `font-display: swap` + preconnect
- Imagens `loading="lazy"` (exceto hero, com `fetchpriority="high"`)
- CSS crítico inline + scripts com `defer`
- Hero pré-carregado via `<link rel="preload" imagesrcset="...">`

---

## 7. Checklist de homologação (do briefing)

- [x] Responsivo mobile-first (375px, 768px, 1280px)
- [x] PageSpeed mirado > 85 (WebP, lazy load, CSS crítico inline, defer)
- [ ] Todos os CTAs apontando para Greenn — **substituir URLs em `config.js`**
- [x] Countdown com data real e persistência localStorage
- [x] Toast de social proof a cada 90s
- [x] Exit intent (desktop) com WhatsApp, sem desconto
- [x] Sticky bar aparece após 500px de scroll
- [x] Card misterioso com pulse dourado infinito
- [ ] Pixel Meta — **preencher `analytics.metaPixelId` em `config.js`**
- [ ] WhatsApp — **preencher `whatsapp.number` em `config.js`**
- [x] Fontes com `font-display: swap`

---

## 8. Suporte

Edite `js/config.js` e republique. Não há build, não há servidor, não há
banco. É HTML, CSS e JS estáticos servidos por qualquer host.

> *"Você não está exausto por falta de força. Está exausto por excesso de ruído."*
