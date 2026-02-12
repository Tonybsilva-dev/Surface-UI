/**
 * Design tokens de forma (shape) – design system
 * Corner radius: de nenhum (0) a fully rounded (9999px).
 * Escala de “roundness” (extra-small a full).
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

/** Escala de shape – estilo Ant Design (2–8px para UI, full para chip) */
export const shapeTokens: ShapeTokens = {
  extraSmall: '2px',
  small: '6px',
  medium: '8px',
  large: '12px',
  extraLarge: '16px',
  full: '9999px',
};

/** Mapa de shapes por componente (botão/card com cantos moderados, não pill) */
export const componentShapeTokens = {
  button: shapeTokens.small,
  card: shapeTokens.medium,
  chip: shapeTokens.full,
  dialog: shapeTokens.medium,
  textField: shapeTokens.small,
  fab: shapeTokens.medium,
  sheet: shapeTokens.medium,
} as const;
