/**
 * Design tokens de elevação – Material Design 3
 * @see https://m3.material.io/foundations/design-tokens/overview
 * @see https://m3.material.io/styles/elevation/elevation-overview
 *
 * Elevation = distância relativa entre superfícies no eixo z.
 * Níveis 0–5; cada nível define shadow + surface tint (opcional).
 */

export interface ElevationLevel {
  boxShadow: string;
  /** Cor do tint sobre a superfície (opcional, M3) */
  surfaceTint?: string;
}

export interface ElevationTokens {
  level0: ElevationLevel;
  level1: ElevationLevel;
  level2: ElevationLevel;
  level3: ElevationLevel;
  level4: ElevationLevel;
  level5: ElevationLevel;
}

/** Níveis de elevação – referência M3 (sombras em múltiplas camadas) */
export const elevationTokens: ElevationTokens = {
  level0: {
    boxShadow: 'none',
  },
  level1: {
    boxShadow:
      '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  },
  level2: {
    boxShadow:
      '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
  },
  level3: {
    boxShadow:
      '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
  },
  level4: {
    boxShadow:
      '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
  },
  level5: {
    boxShadow:
      '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
  },
};
