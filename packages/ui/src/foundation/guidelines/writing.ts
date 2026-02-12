/**
 * Guidelines de escrita e texto – best practices, truncation, resizing
 */

/** Boas práticas de escrita */
export const writingBestPractices = {
  /** Use linguagem neutra e direta; evite avisos alarmantes */
  explainConsequences: 'explain-consequences',
  /** Títulos, headings e subheadings claros para conteúdo escaneável */
  scannableFormat: 'scannable-format',
  /** Sentence case em toda a UI: só a primeira letra da primeira palavra em maiúscula */
  sentenceCase: 'sentence-case',
  /** Evite abreviações; escreva por extenso (ex.: "for example" em vez de "e.g.") */
  avoidAbbreviations: 'avoid-abbreviations',
  /** Texto compreensível por qualquer pessoa, em qualquer contexto */
  understandableAnywhere: 'understandable-anywhere',
} as const;

/** Opções de truncamento de texto (CSS) */
export const textTruncation = {
  /** Uma linha com reticências (...) */
  singleLine: {
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
  },
  /** Múltiplas linhas: use line-clamp (CSS). Valores comuns 1, 2, 3. */
  lineClamp: (lines: number) => ({
    display: '-webkit-box' as const,
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden' as const,
  }),
  /** Número máximo de linhas antes de truncar (referência para componentes) */
  maxLines: { one: 1, two: 2, three: 3 } as const,
} as const;

/** Requisitos de redimensionamento de texto (WCAG 1.4.4) */
export const textResizing = {
  /** Texto deve poder ser ampliado até 200% sem perda de conteúdo ou função */
  maxScalePercent: 200,
  /** Use unidades relativas (rem, em, %) para tamanho de fonte; evite px fixo para texto */
  preferredUnits: ['rem', 'em', '%'] as const,
  /** Ao redimensionar: sem clipping, sem sobreposição, layout pode refluir */
  requirements: [
    'no-clipping',
    'no-overlap',
    'interactive-remaining-usable',
    'reflow-allowed',
  ] as const,
} as const;
