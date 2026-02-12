/**
 * Design tokens de forma (shape) – Material Design 3
 * @see https://m3.material.io/foundations/design-tokens/overview
 * @see https://m3.material.io/styles/shape/shape-scale-tokens
 *
 * Corner radius: de nenhum (0) a fully rounded (9999px / 50%).
 * M3 usa uma escala de “roundness” (extra-small a full).
 */

export interface ShapeTokens {
  /** Cantos extra pequenos */
  extraSmall: string;
  /** Cantos pequenos */
  small: string;
  /** Cantos médios (default para muitos componentes) */
  medium: string;
  /** Cantos grandes */
  large: string;
  /** Cantos extra grandes */
  extraLarge: string;
  /** Totalmente arredondado (pill/circle) */
  full: string;
}

/** Escala de shape – referência M3 (0, 4, 8, 12, 16, 28, full) */
export const shapeTokens: ShapeTokens = {
  extraSmall: '4px',
  small: '8px',
  medium: '12px',
  large: '16px',
  extraLarge: '28px',
  full: '9999px',
};

/** Mapa de shapes por componente (opcional, para consistência) */
export const componentShapeTokens = {
  button: shapeTokens.full,
  card: shapeTokens.medium,
  chip: shapeTokens.full,
  dialog: shapeTokens.large,
  textField: shapeTokens.small,
  fab: shapeTokens.medium,
  sheet: shapeTokens.large,
} as const;
