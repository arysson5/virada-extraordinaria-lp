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
    gramadoParallax: "assets/images/gramado%201.webp",
    iranPhoto: "assets/persons/iran%20mariano.jpeg",
    gledisonPhoto: "assets/persons/gleidison.jpg",
    denisPhoto: "assets/persons/denisfaco.jpg",
  },

  /* ----------------------------------------------------------------------
     CRONOGRAMA / FORMATO DA NOITE
     ----------------------------------------------------------------------
     Textos editáveis da seção “Cronograma”. Mantenha tom contextual —
     não inclua horários nem temas por palestrante se ainda não estiverem
     definidos; o layout só usa estes campos. */
  cronograma: {
    eyebrow: "Formato da noite",
    title: "Uma noite em formato de jantar de gala",
    lead:
      "A Virada Extraordinária não é uma sequência seca de falas. É uma imersão onde conteúdo para líderes e linguagem artística caminham juntos — para você ouvir, sentir e integrar, sempre dentro da experiência do jantar.",
    blocks: [
      {
        tag: "Experiência",
        title: "O que é esse evento",
        text:
          "É uma noite única: ambiente de gala, ritmo pensado para líderes que precisam baixar o ruído mental — com acolhimento, densidade quando importa e espaço para respirar.",
      },
      {
        tag: "Conteúdo",
        title: "Palestras com propósito",
        text:
          "Haverá momentos de conteúdo executivo — governança de si, liderança, decisão e próximo ciclo — sem enrolação: cada bloco existe para devolver clareza e direção.",
      },
      {
        tag: "Arte",
        title: "Apresentações cênicas no fluxo",
        text:
          "Entre os blocos de conteúdo, entram apresentações teatrais e artísticas — sempre associadas ao tema em discussão, para que a mensagem também atravesse imagem, ritmo e emoção.",
      },
      {
        tag: "Integração",
        title: "Jantar e alta gastronomia",
        text:
          "O jantar não é um ‘intervalo’ à parte: faz parte do formato. Alta gastronomia e serviço refinado sustentam a noite — presença, conversa e imersão do começo ao fim.",
      },
      {
        tag: "Ritmo",
        title: "Como a noite se organiza",
        text:
          "Falas e cenas se alternam de forma intencional — você absorve o conteúdo, o palco traduz em arte e você volta ao próximo nível da conversa. Detalhes de ordem e tempos finos são conduzidos pela equipe na sala.",
      },
    ],
    closingNote:
      "Sem promessa de minutagem fixa nesta página: o importante é o formato — gala, conteúdo de alto nível e arte que conversa com o que está em jogo na sua vida.",
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
        "Performance ao vivo de Gledison Martins",
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
