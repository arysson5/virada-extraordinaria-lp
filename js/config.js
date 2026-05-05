/* =========================================================================
   VIRADA EXTRAORDINÁRIA — CONFIGURAÇÃO CENTRAL
   -------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para personalizar a
   landing page. Ajuste data, links, números e textos abaixo. Não toque
   em nenhum outro JS — todos consomem este config.
   ========================================================================= */

window.SITE_CONFIG = {
  /* ----------------------------------------------------------------------
     EVENTO
     ---------------------------------------------------------------------- */
  event: {
    name: "Virada Extraordinária",
    edition: "Edição 2026",
    city: "Gramado, RS",
    venue: "Sociedade Recreio Gramadense",
    address: "Rua Garibaldi, 328 - Centro - Gramado/RS",
    /* Data e hora do evento no formato ISO 8601 com fuso horário (BRT = -03:00).
       O countdown calcula contra esta data em tempo real.
       Evento: sexta, 26 jun 2026, 18h00 - 22h30 (Brasília). */
    eventDate: "2026-06-26T18:00:00-03:00",
  },

  /* ----------------------------------------------------------------------
     CHECKOUT GREENN
     ----------------------------------------------------------------------
     Todos os 4 ingressos apontam para o mesmo link de pré-checkout da
     Greenn — a seleção de modalidade (Individual / Diamond / Duplo)
     acontece dentro da própria plataforma. Para trocar, basta alterar
     a constante abaixo. */
  checkoutUrl: "https://payfast.greenn.com.br/pre-checkout/bn4k2gq",

  /* ----------------------------------------------------------------------
     IMAGENS LOCAIS
     ----------------------------------------------------------------------
     Caminhos das imagens próprias do projeto. Coloque os arquivos nas
     pastas indicadas e ajuste apenas o nome se necessário. */
  images: {
    heroBackground: "assets/images/ruido.jpg",
    iranPhoto: "assets/persons/iran%20mariano.jpeg",
    gledisonPhoto: "assets/persons/gleidison.jpg",
  },

  /* ----------------------------------------------------------------------
     VAGAS (gatilho de escassez)
     ----------------------------------------------------------------------
     - initialSlots: número exibido na primeira visita (briefing pede 47).
     - minSlots: piso mínimo para o decréscimo automático parar.
     - decrementMinIntervalMin / decrementMaxIntervalMin: a cada quantos
       minutos, em média, o número decrementa visualmente (random entre
       os dois). O valor fica em sessionStorage por aba. */
  slots: {
    initialSlots: 47,
    minSlots: 12,
    decrementMinIntervalMin: 8,
    decrementMaxIntervalMin: 15,
  },

  /* ----------------------------------------------------------------------
     WHATSAPP DE SUPORTE
     ----------------------------------------------------------------------
     number: DDI + DDD + número, somente dígitos (ex.: 5551999999999).
     message: mensagem pré-preenchida (será URL-encoded automaticamente). */
  whatsapp: {
    number: "5551999999999",
    message:
      "Olá! Quero saber mais sobre a Virada Extraordinária em Gramado e as opções de ingresso.",
  },

  /* ----------------------------------------------------------------------
     INGRESSOS / CHECKOUT GREENN
     ----------------------------------------------------------------------
     Cada card lê esta lista. Para destacar como "Mais Escolhido", marque
     featured: true (apenas um por edição). checkoutUrl deve apontar para
     a URL final do produto na Greenn. */
  tickets: [
    {
      id: "individual",
      name: "Ingresso Individual",
      tagline: "Acesso completo à imersão",
      price: "R$ 297",
      installments: "ou 12x de R$ 29,40",
      featured: false,
      ctaLabel: "Quero o Individual",
      benefits: [
        "5 horas de imersão presencial",
        "Performance ao vivo de Gledison Maestro",
        "Metodologia Partitura do Legado",
        "Coffee break premium",
        "Certificado de participação",
      ],
    },
    {
      id: "diamond",
      name: "Diamond Individual",
      tagline: "A experiência completa do líder",
      price: "R$ 397",
      installments: "ou 12x de R$ 39,30",
      featured: true,
      featuredLabel: "★ Mais Escolhido",
      ctaLabel: "Quero o Diamond",
      benefits: [
        "Tudo do Individual",
        "Jantar de Gala no Recreio Gramadense",
        "Mesa premium com Iran Mariano",
        "Material físico Partitura do Legado",
        "Acesso ao grupo VIP de pós-evento",
      ],
    },
    {
      id: "duplo",
      name: "Experience Duplo",
      tagline: "Para você e quem decide com você",
      price: "R$ 497",
      installments: "ou 12x de R$ 49,20",
      featured: false,
      ctaLabel: "Quero o Duplo",
      benefits: [
        "2 ingressos completos",
        "Performance e metodologia para os dois",
        "Coffee break premium",
        "Material físico individual",
        "Network direto com outros líderes",
      ],
    },
    {
      id: "diamondDuplo",
      name: "Diamond Duplo",
      tagline: "O legado em casal ou em sociedade",
      price: "R$ 597",
      installments: "ou 12x de R$ 59,10",
      featured: false,
      ctaLabel: "Quero o Diamond Duplo",
      benefits: [
        "Tudo do Experience Duplo",
        "Jantar de Gala para dois",
        "Mesa premium com Iran Mariano",
        "Material físico Partitura do Legado",
        "Acesso ao grupo VIP de pós-evento",
      ],
    },
  ],

  /* ----------------------------------------------------------------------
     DEPOIMENTOS (Swiper)
     ---------------------------------------------------------------------- */
  testimonials: [
    {
      name: "Marcelo Bastos",
      role: "CEO · Indústria de embalagens",
      city: "Caxias do Sul, RS",
      quote:
        "Cheguei achando que precisava de mais informação. Saí entendendo que precisava de silêncio. Em 5 horas a Virada virou meu próximo trimestre.",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3&w=160&q=70&fm=webp",
    },
    {
      name: "Renata Klein",
      role: "Empresária · Varejo",
      city: "Porto Alegre, RS",
      quote:
        "Eu estava decidindo no automático havia meses. A Partitura do Legado me deu uma rota — não inspiração. Voltei com clareza pra demitir, contratar e recomeçar.",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=160&q=70&fm=webp",
    },
    {
      name: "Pr. André Ferraz",
      role: "Pastor · Equipe de 40 líderes",
      city: "Curitiba, PR",
      quote:
        "Pastoreio uma comunidade grande, mas estava sem governo de mim. A noite em Gramado me devolveu o lugar que eu tinha abandonado dentro de casa.",
      photo:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=3&w=160&q=70&fm=webp",
    },
    {
      name: "Carla Menezes",
      role: "Sócia-fundadora · Tech",
      city: "Florianópolis, SC",
      quote:
        "A performance do Gledison fez meu cérebro parar pela primeira vez em três anos. Foi onde minha próxima decisão estratégica nasceu.",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=3&w=160&q=70&fm=webp",
    },
    {
      name: "Eduardo Lemos",
      role: "CEO · Holding agro",
      city: "Cuiabá, MT",
      quote:
        "Sou cético com 'imersão'. Fui pelo formato executivo. Saí sabendo, com nome e sobrenome, quais ciclos da minha empresa eu precisava encerrar.",
      photo:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=3&w=160&q=70&fm=webp",
    },
    {
      name: "Patrícia Vidal",
      role: "Diretora executiva",
      city: "Belo Horizonte, MG",
      quote:
        "A Virada não é palestra. É um exercício de presença. O jantar de gala mexeu mais comigo do que qualquer coach nos últimos 5 anos.",
      photo:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=3&w=160&q=70&fm=webp",
    },
  ],

  /* ----------------------------------------------------------------------
     SOCIAL PROOF TOAST
     ---------------------------------------------------------------------- */
  toastEntries: [
    { name: "João R.", city: "Porto Alegre, RS", ticket: "Diamond" },
    { name: "Marina S.", city: "Caxias do Sul, RS", ticket: "Individual" },
    { name: "Pr. Carlos T.", city: "Curitiba, PR", ticket: "Diamond Duplo" },
    { name: "Felipe A.", city: "São Paulo, SP", ticket: "Diamond" },
    { name: "Ana P.", city: "Florianópolis, SC", ticket: "Experience Duplo" },
    { name: "Rodrigo M.", city: "Belo Horizonte, MG", ticket: "Diamond" },
    { name: "Eduardo L.", city: "Cuiabá, MT", ticket: "Diamond Duplo" },
    { name: "Carla V.", city: "Joinville, SC", ticket: "Diamond" },
    { name: "Tiago F.", city: "Pelotas, RS", ticket: "Individual" },
    { name: "Pr. Daniel R.", city: "Goiânia, GO", ticket: "Diamond" },
    { name: "Renata K.", city: "Porto Alegre, RS", ticket: "Diamond Duplo" },
    { name: "Marcelo B.", city: "Caxias do Sul, RS", ticket: "Diamond" },
  ],

  /* ----------------------------------------------------------------------
     ANALYTICS / PIXEL
     ----------------------------------------------------------------------
     Deixe vazio ("") para desativar. Carregamento condicional. */
  analytics: {
    metaPixelId: "", // ex.: "1234567890123456"
    ga4Id: "",       // ex.: "G-XXXXXXXXXX"
    clarityId: "",   // ex.: "abcdef1234"
  },

  /* ----------------------------------------------------------------------
     COMPORTAMENTO
     ---------------------------------------------------------------------- */
  behavior: {
    stickyBarThresholdPx: 500,
    exitIntentEnabled: true,
    exitIntentMinViewportPx: 1024,
    socialToastFirstDelayMs: 25000,
    socialToastIntervalMs: 90000,
    socialToastVisibleMs: 6000,
  },
};
