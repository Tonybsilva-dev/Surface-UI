/**
 * Content Design – Material Design 3
 * Conteúdo efetivo: overview, alt text, global writing, notificações, style guide.
 * @see https://m3.material.io/foundations/content-design/overview
 * @see https://m3.material.io/foundations/content-design/alt-text
 * @see https://m3.material.io/foundations/content-design/global-writing/overview
 * @see https://m3.material.io/foundations/content-design/global-writing/word-choice
 * @see https://m3.material.io/foundations/content-design/notifications
 * @see https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices
 * @see https://m3.material.io/foundations/content-design/style-guide/word-choice
 * @see https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation
 */

/** Princípio central do Content Design M3 */
export const contentDesignPrinciple =
  'Conteúdo compreensível por qualquer pessoa, em qualquer lugar.';

/** Boas práticas de alt text (imagens, ícones, avatares) */
export const altTextGuidelines = {
  describeFunction: 'Descreva a função ou o conteúdo relevante, não só “imagem” ou “ícone”.',
  beConcise: 'Seja conciso; evite começar com “Imagem de…” ou “Ícone de…” quando desnecessário.',
  decorative: 'Para elementos puramente decorativos, use alt vazio (alt="") ou role="presentation".',
  complexImages: 'Para gráficos/diagramas complexos, forneça descrição longa (aria-describedby ou texto próximo).',
} as const;

/** Global writing: escolha de palavras e tom para audiência global */
export const globalWritingGuidelines = {
  overview: 'Escreva para ser entendido em diferentes idiomas e culturas; evite jargão e referências locais quando o produto for global.',
  wordChoice: [
    'Prefira palavras simples e familiares.',
    'Evite gírias, siglas não explicadas e metáforas que não traduzem bem.',
    'Use termos consistentes para os mesmos conceitos em todo o produto.',
  ] as const,
} as const;

/** Tipos e boas práticas de notificações (M3) */
export const notificationGuidelines = {
  types: ['snackbar', 'banner', 'dialog', 'toast'] as const,
  practices: [
    'Mensagem clara e acionável quando houver ação (ex.: Desfazer).',
    'Duração e dismiss adequados (não bloquear sem necessidade).',
    'Hierarquia: não usar diálogo para informação de baixa importância.',
  ] as const,
} as const;

/** Style guide: UX writing best practices (resumo) */
export const styleGuideUxWriting = {
  explainConsequences: 'Use linguagem neutra e direta; explique o resultado da ação e como desfazer.',
  scannableFormat: 'Títulos e headings específicos; organize com subheadings para leitura em diagonal.',
  sentenceCase: 'Sentence case em títulos, labels, botões, navegação (só primeira letra em maiúscula).',
  avoidAbbreviations: 'Evite abreviações; escreva por extenso (ex.: “por exemplo” em vez de “e.g.”).',
} as const;

/** Style guide: word choice */
export const styleGuideWordChoice = {
  simpleWords: 'Prefira palavras simples e diretas.',
  consistentTerms: 'Use o mesmo termo para o mesmo conceito em todo o produto.',
  avoidJargon: 'Evite jargão técnico na UI voltada ao usuário final.',
} as const;

/** Style guide: grammar and punctuation */
export const styleGuideGrammar = {
  punctuation: 'Siga convenções de pontuação do idioma (ex.: sem ponto em labels curtos, ponto em frases).',
  lists: 'Use listas quando facilitar a leitura; paralelismo nos itens.',
  tone: 'Tom consistente (formal ou informal) conforme o produto.',
} as const;
