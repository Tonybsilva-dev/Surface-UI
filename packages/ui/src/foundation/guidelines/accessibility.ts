/**
 * Guidelines de acessibilidade – Material Design 3
 * @see https://m3.material.io/foundations/designing/overview
 * @see https://m3.material.io/foundations/designing/color-contrast
 * @see https://m3.material.io/styles/color/the-color-system/accessibility
 *
 * Contraste, foco visível e requisitos mínimos para acessibilidade.
 */

/** Razões de contraste mínimas (WCAG 2.1 / referência M3) */
export const contrastRatios = {
  /** Texto normal (< 18px ou < 14px bold): mínimo 4.5:1 */
  textNormal: 4.5,
  /** Texto grande (≥ 18px ou ≥ 14px bold): mínimo 3:1 */
  textLarge: 3,
  /** Elementos gráficos e UI: mínimo 3:1 */
  graphicalObjects: 3,
  /** AA: 4.5:1 normal, 3:1 large. AAA: 7:1 normal, 4.5:1 large */
  aa: { normal: 4.5, large: 3 },
  aaa: { normal: 7, large: 4.5 },
} as const;

/** Espessura mínima do anel de foco visível (M3 / WCAG 2.4.7) */
export const focusRing = {
  width: '2px',
  offset: '2px',
  /** Cor do outline deve contrastar com o fundo (ex.: primary ou onSurface) */
  style: 'solid',
} as const;

/** Área mínima de toque (M3) */
export const touchTarget = {
  minHeight: 48,
  minWidth: 48,
  unit: 'px' as const,
} as const;
