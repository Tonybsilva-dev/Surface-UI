/**
 * Elevation (Styles)
 * Overview, applying elevation e tokens.
 */

/** Visão geral de elevação */
export const elevationOverview = {
  title: 'Elevation',
  description:
    'Elevation representa a distância relativa entre superfícies no eixo z. Níveis 0–5 combinam sombras em múltiplas camadas para comunicar hierarquia e sobreposição.',
} as const;

/** Applying elevation – quando e como usar níveis diferentes */
export const applyingElevationGuidelines = {
  description:
    'Use elevação para indicar o que está acima de outra coisa (ex.: cards sobre o background, sheets sobre cards, dialogs sobre tudo).',
  keyPoints: [
    'Level 0–1: superfícies de fundo e containers básicos (cards planos, app bar).',
    'Level 2–3: elementos que precisam se destacar sem bloquear o fluxo (FAB, sheets, menus).',
    'Level 4–5: superfícies modais e de alto foco (dialogs, side sheets importantes).',
    'Combine elevation com state layers: ao focar/pressionar, o componente pode ganhar leve aumento de elevação + overlay.',
  ] as const,
} as const;

/** Resumo dos tokens de elevação */
export const elevationTokensSummary = {
  description:
    'Tokens de elevação definem sombras e, opcionalmente, surface tint para cada nível. Eles são aplicados como box-shadow em superfícies.',
  levels: [
    { level: 'level0', label: 'Level 0', dp: '0dp' },
    { level: 'level1', label: 'Level 1', dp: '1–3dp' },
    { level: 'level2', label: 'Level 2', dp: '3–6dp' },
    { level: 'level3', label: 'Level 3', dp: '6–8dp' },
    { level: 'level4', label: 'Level 4', dp: '8–12dp' },
    { level: 'level5', label: 'Level 5', dp: '12+dp' },
  ] as const,
} as const;

