/**
 * Design tokens – Material Design 3
 * @see https://m3.material.io/foundations/design-tokens/overview
 * @see https://m3.material.io/foundations/design-tokens/how-to-use-tokens
 *
 * Exporta todos os tokens para uso em temas e componentes.
 */

// Color
export {
  lightColorScheme,
  darkColorScheme,
  type ColorScheme,
} from './color';

// Typography
export { typographyTokens, type TypographyTokens, type TypeScaleToken } from './typography';

// Shape
export { shapeTokens, componentShapeTokens, type ShapeTokens } from './shape';

// Elevation
export { elevationTokens, type ElevationTokens, type ElevationLevel } from './elevation';

// State (state layers)
export { stateLayerTokens, disabledOpacity, type StateLayerTokens } from './state';

// Motion
export { motionTokens, type MotionTokens } from './motion';

// Spacing
export { spacingTokens, type SpacingTokens } from './spacing';
