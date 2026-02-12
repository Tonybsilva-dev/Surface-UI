/**
 * Typography (Styles) – Material Design 3
 * Overview, fonts, type scale tokens, applying type, editorial treatments.
 * @see https://m3.material.io/styles/typography/overview
 * @see https://m3.material.io/styles/typography/fonts
 * @see https://m3.material.io/styles/typography/type-scale-tokens
 * @see https://m3.material.io/styles/typography/applying-type
 * @see https://m3.material.io/styles/typography/editorial-treatments
 */

/** Visão geral: tipografia no M3 */
export const typographyOverview = {
  title: "Typography",
  description:
    "Tipografia torna o conteúdo legível e bonito. O M3 usa uma type scale com Display, Headline, Title, Body e Label para organizar hierarquia.",
  principles: [
    "Use tipografia para estabelecer hierarquia visual e ritmo de leitura.",
    "Limite o número de famílias de fonte por produto (ex.: Roboto / Roboto Flex / Roboto Serif).",
    "Garanta contraste suficiente entre texto e fundo e tamanho adequado para acessibilidade.",
  ] as const,
  link: "https://m3.material.io/styles/typography/overview",
} as const;

/** Fonts: famílias padrão e fallback */
export const typographyFonts = {
  description:
    "Roboto é a família padrão do M3. Variantes como Roboto Flex (variable) e Roboto Serif ampliam expressão, mantendo legibilidade.",
  families: [
    "Roboto – typeface padrão do Android e da M3 type scale.",
    "Roboto Flex – fonte variável com múltiplos eixos (peso, largura, optical size, etc.).",
    "Roboto Serif – serifada, confortável para leitura em vários tamanhos.",
    "Roboto Mono – monoespaçada para código e números alinhados.",
    "Noto Sans – coleção global usada como fallback quando o script não é suportado.",
  ] as const,
  fallbackNote:
    "Configure fallback em ordem (ex.: Roboto Flex → Roboto → Noto Sans) para manter estilo consistente quando a fonte principal não estiver disponível.",
  link: "https://m3.material.io/styles/typography/fonts",
} as const;

/** Type scale: tokens e papéis */
export const typographyTypeScale = {
  description:
    "A type scale define tokens para Display, Headline, Title, Body e Label, cada um com variações large/medium/small.",
  roles: [
    "Display – textos muito grandes, hero e páginas iniciais.",
    "Headline – títulos de seções e telas.",
    "Title – títulos de componentes (cards, diálogos) e barras de app.",
    "Body – texto principal e descrições.",
    "Label – rótulos de botões, chips, inputs e pequenos elementos.",
  ] as const,
  tokensNote:
    "Tokens incluem fontFamily, fontSize, lineHeight, fontWeight e letterSpacing, permitindo que o sistema se adapte a outras famílias.",
  link: "https://m3.material.io/styles/typography/type-scale-tokens",
} as const;

/** Aplicando tipografia na UI */
export const typographyApplyingType = {
  description:
    "Aplicar tipografia é mapear tokens da type scale para elementos de UI: app bars, títulos, corpo de texto, labels de controles, etc.",
  applying: [
    "App bars e títulos de tela: geralmente Headline ou Title.",
    "Cards e diálogos: Title para o título, Body para o conteúdo.",
    "Botões e chips: Label (large/medium/small) conforme a densidade.",
    "Texto de suporte e hints: Body small, com contraste adequado.",
    "Use Roboto Mono ou fonte monoespaçada para números e código quando alinhamento vertical for importante.",
  ] as const,
  link: "https://m3.material.io/styles/typography/applying-type",
} as const;

/** Editorial treatments: uso expressivo em conteúdo longo */
export const typographyEditorialTreatments = {
  description:
    "Tratamentos editoriais usam a type scale de forma expressiva para artigos, marketing e conteúdo de leitura longa.",
  guidelines: [
    "Combine Display e Headline com Body para criar hierarquia clara em páginas editoriais.",
    "Limite o número de estilos diferentes por página para evitar ruído visual.",
    "Use largura de coluna e line-height confortáveis para leitura prolongada.",
    "Considere variações de peso e serif/sans para diferenciar voz editorial de UI funcional.",
  ] as const,
  link: "https://m3.material.io/styles/typography/editorial-treatments",
} as const;

