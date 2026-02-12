/**
 * Design tokens de elevação – distância relativa entre superfícies no eixo z.
 * Níveis 0–5; cada nível define shadow + surface tint (opcional).
 */

export interface ElevationLevel {
  boxShadow: string;
  /** Cor do tint sobre a superfície (opcional) */
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

/** Níveis de elevação – sombras suaves estilo Ant Design (pouca opacidade) */
export const elevationTokens: ElevationTokens = {
  level0: {
    boxShadow: 'none',
  },
  level1: {
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
  },
  level2: {
    boxShadow:
      '0 2px 4px -2px rgba(0, 0, 0, 0.05), 0 4px 8px -4px rgba(0, 0, 0, 0.05)',
  },
  level3: {
    boxShadow:
      '0 4px 8px -4px rgba(0, 0, 0, 0.08), 0 8px 16px -8px rgba(0, 0, 0, 0.06)',
  },
  level4: {
    boxShadow:
      '0 8px 16px -8px rgba(0, 0, 0, 0.1), 0 12px 24px -12px rgba(0, 0, 0, 0.08)',
  },
  level5: {
    boxShadow:
      '0 12px 24px -12px rgba(0, 0, 0, 0.12), 0 16px 32px -16px rgba(0, 0, 0, 0.1)',
  },
};
