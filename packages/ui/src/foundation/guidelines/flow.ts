/**
 * Guidelines de fluxo e navegação – fluxo do usuário, destinos, pilha
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

/** Número recomendado de destinos na navigation bar */
export const navigationBarDestinations = { min: 3, max: 5 } as const;
