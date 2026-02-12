/**
 * Guidelines de fluxo e navegação – Material Design 3
 * @see https://m3.material.io/foundations/designing/flow
 *
 * Fluxo do usuário, destinos, pilha de navegação.
 */

/** Boas práticas de flow */
export const flowGuidelines = {
  /** Cada entrada na pilha representa um destino navegado */
  backStack: 'back-stack',
  /** Navegação deve atualizar a UI com animações consistentes */
  animatedTransitions: 'animated-transitions',
  /** Manter estado dos itens na pilha quando possível */
  stateRetention: 'state-retention',
  /** Layouts adaptativos: múltiplos destinos visíveis em telas grandes */
  adaptiveLayout: 'adaptive-layout',
} as const;

/** Número recomendado de destinos na navigation bar (M3) */
export const navigationBarDestinations = { min: 3, max: 5 } as const;
