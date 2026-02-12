/**
 * Guidelines de estrutura e layout – regiões, panes, hierarquia
 */

/** Regiões principais do layout */
export const layoutRegions = {
  /** Navegação: drawer, rail ou bar na borda da janela */
  navigation: 'navigation',
  /** Conteúdo principal: listas, cards, app bar, busca */
  body: 'body',
} as const;

/** Tipos de pane no body (1–3 panes) */
export const paneTypes = {
  /** Largura fixa */
  fixed: 'fixed',
  /** Cresce/encolhe com o espaço (pelo menos 1 flexible por layout) */
  flexible: 'flexible',
} as const;

/** Larguras de referência para breakpoints (layout responsivo) */
export const layoutBreakpoints = {
  compact: 0,
  medium: 600,
  expanded: 840,
  unit: 'px' as const,
} as const;
