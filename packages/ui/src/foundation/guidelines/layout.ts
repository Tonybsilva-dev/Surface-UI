/**
 * Layout foundations – understanding + applying layout, spacing, parts, density, RTL
 */

/** Visão geral: o que é um bom layout */
export const layoutOverview = {
  goal:
    'Layouts organizam conteúdo em regiões claras (navegação + body), mantendo hierarquia, alinhamento e ritmo visual.',
  grid:
    'Use grids, gutters e margens consistentes para alinhar componentes e criar padrões previsíveis.',
} as const;

/** Spacing e partes do layout (navegação + body) */
export const layoutSpacingAndParts = {
  spacingScale:
    'Use a escala de spacing do sistema (base 4px) para padding, margin e gap; combine múltiplos em vez de valores arbitrários.',
  guttersAndMargins:
    'Mantenha gutters e margens externas consistentes entre telas; não encoste conteúdo nas bordas da janela.',
  navigationRegion:
    'A região de navegação (bottom bar, rail ou drawer) deve ser estável e previsível em toda a aplicação.',
  bodyRegion:
    'O body acomoda o conteúdo principal (listas, cards, detalhes); panes podem ser fixed ou flexible conforme o espaço.',
} as const;

/** Densidade de layout (comfort vs compact) */
export const layoutDensityGuidelines = {
  comfortable:
    'Densidade confortável: mais espaço entre elementos, textos com respiro e componentes maiores – ideal para touch.',
  compact:
    'Densidade compacta: menos espaçamento vertical, componentes mais densos – útil em telas grandes com muito conteúdo.',
  consistency:
    'Evite misturar densidades radicalmente diferentes na mesma tela; aplique densidade por contexto (ex.: lista de dados).',
} as const;

/** Considerações de hardware e entrada (touch, mouse, teclado) */
export const hardwareLayoutGuidelines = {
  touchTargets:
    'Mantenha alvos de toque mínimos (ex.: 48×48dp) e espaçamento adequado ao redor para evitar toques acidentais.',
  keyboardAndMouse:
    'Garanta foco visível e navegação por teclado; considere estados hover para dispositivos com cursor.',
  postures:
    'Considere posturas de uso (telefone em uma mão, tablet apoiado, desktop) ao escolher densidade, panes e padrões de navegação.',
} as const;

/** Bidirecionalidade (LTR/RTL) e alinhamento */
export const bidirectionalityGuidelines = {
  mirroring:
    'Em idiomas RTL, espelhe layout e navegação (ex.: rail e drawers mudam de lado), mantendo a hierarquia visual.',
  alignment:
    'Alinhe texto e componentes ao início lógico (start) em vez de “esquerda/direita” fixos para funcionar em LTR e RTL.',
  icons:
    'Alguns ícones também devem ser espelhados (ex.: setas de navegação); outros permanecem (ex.: play).',
} as const;

