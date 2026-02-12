/**
 * Typography (Styles)
 * Overview, fonts, type scale tokens, applying type, editorial treatments.
 */

/** Visão geral: tipografia */
export const typographyOverview = {
  title: "Typography",
  description:
    "Tipografia torna o conteúdo legível e bonito. O sistema usa uma type scale com Display, Headline, Title, Body e Label para organizar hierarquia.",
  principles: [
    "Use tipografia para estabelecer hierarquia visual e ritmo de leitura.",
    "Limite o número de famílias de fonte por produto.",
    "Garanta contraste suficiente entre texto e fundo e tamanho adequado para acessibilidade.",
  ] as const,
} as const;

/** Fonts: famílias padrão e fallback */
export const typographyFonts = {
  description:
    "Escolha uma família padrão para a UI; variáveis (peso, largura) e serifadas ampliam expressão. Mono para código e números alinhados.",
  families: [
    "Fonte padrão – typeface principal da type scale (ex.: Inter, Source Sans).",
    "Fonte variável – múltiplos eixos (peso, largura, optical size) para flexibilidade.",
    "Serifada – leitura confortável em artigos e editorial.",
    "Monoespaçada – código e números alinhados.",
    "Fallback – coleção global para scripts não suportados pela principal.",
  ] as const,
  fallbackNote:
    "Configure fallback em ordem (fonte principal → alternativa → genérica) para manter estilo consistente quando a fonte principal não estiver disponível.",
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
    "Use fonte monoespaçada para números e código quando alinhamento vertical for importante.",
  ] as const,
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
} as const;

