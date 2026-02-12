/**
 * Guidelines de adaptive design – large screens, canonical layouts.
 * Apps adaptativos mudam layout conforme o tamanho da janela (window size classes).
 */

/** Window size classes de largura (referência) */
export const windowWidthClasses = {
  compact: {
    label: 'compact',
    description: 'Telefones em portrait; uma coluna / um pane visível',
  },
  medium: {
    label: 'medium',
    description: 'Tablets em portrait; duas colunas possíveis ou pane secundário',
  },
  expanded: {
    label: 'expanded',
    description: 'Tablets em landscape e maiores; multi‑pane (ex.: list-detail)',
  },
} as const;

/** Window size classes de altura (resumidas) */
export const windowHeightClasses = {
  compact: 'compact',
  medium: 'medium',
  expanded: 'expanded',
} as const;

/** Layouts canônicos para telas adaptativas */
export const canonicalLayouts = {
  /** Lista + detalhe; em telas grandes, ambos panes lado a lado */
  listDetail: 'list-detail',
  /** Feed de conteúdo em grid/lista, ideal para cards e conteúdo longo */
  feed: 'feed',
  /** Pane secundário que apoia o conteúdo principal (ex.: filtros, detalhes) */
  supportingPane: 'supporting-pane',
} as const;

/** Padrões de navegação adaptativa (ex.: bottom bar -> rail) */
export const adaptiveNavigationPatterns = {
  /** Compact: bottom navigation bar, app bar superior */
  compact: {
    navigation: 'bottom-bar',
    panesVisible: 1,
  },
  /** Medium: navigation rail ou drawer + body em 1–2 panes */
  medium: {
    navigation: 'navigation-rail-or-drawer',
    panesVisible: 2,
  },
  /** Expanded: navigation rail/drawer + até 3 panes (ex.: list-detail + supporting) */
  expanded: {
    navigation: 'navigation-rail-or-drawer',
    panesVisible: 2,
  },
} as const;

