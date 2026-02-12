/**
 * Design tokens de estado (state layers) – Material Design 3
 * @see https://m3.material.io/foundations/design-tokens/overview
 * @see https://m3.material.io/foundations/interaction/states
 *
 * Estados interativos usam “state layers” (overlay com opacidade).
 * Valores em 0–1 para aplicar sobre a cor do container.
 */

export interface StateLayerTokens {
  hover: number;
  focus: number;
  pressed: number;
  dragged?: number;
}

/** Opacidade das state layers – referência M3 */
export const stateLayerTokens: StateLayerTokens = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  dragged: 0.16,
};

/** Opacidade para conteúdo desabilitado */
export const disabledOpacity = 0.38;
