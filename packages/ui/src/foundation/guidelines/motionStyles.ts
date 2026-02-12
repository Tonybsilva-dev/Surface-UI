/**
 * Motion (Styles)
 * Overview, easing & duration (applying, tokens), transitions (patterns, applying).
 */

/** Visão geral: como o motion funciona */
export const motionOverview = {
  title: "Motion",
  description:
    "Motion comunica mudança de estado, direção e hierarquia. Use duração e easing consistentes (tokens) para transições previsíveis e acessíveis.",
  howItWorks:
    "Animações devem ter propósito: guiar o olhar, confirmar ações ou revelar relações entre elementos. Evite motion puramente decorativo que distrai.",
} as const;

/** Easing e duration: aplicação e tokens */
export const motionEasingAndDuration = {
  description:
    "Duração (short, medium, long) e easing (standard, emphasized, legacy) definem o ritmo das transições. Combine conforme o tipo de mudança.",
  applying: [
    "Transições gerais: duration medium (ex.: 300–400ms) + easing standard ou emphasized.",
    "Entrada/saída de elementos (modals, sheets): emphasized easing para sensação de peso.",
    "Mudanças rápidas (hover, focus): duration short (50–200ms).",
    "Respeite preferência de movimento reduzido (prefers-reduced-motion) desabilitando ou encurtando animações.",
  ] as const,
} as const;

/** Transitions: padrões e aplicação */
export const motionTransitions = {
  description:
    "Padrões de transição ajudam o usuário a entender o que mudou: aparecer/desaparecer, compartilhado entre telas, ou mudança de estado no mesmo elemento.",
  patterns: [
    "Container transform: elemento que muda de tamanho/posição entre telas (ex.: card que vira detalhe).",
    "Shared axis: navegação horizontal/vertical com direção consistente (ex.: próximo/voltar).",
    "Fade through: conteúdo some e outro aparece (dissolve) para mudanças sem relação espacial direta.",
  ] as const,
  applying: [
    "Use o mesmo padrão para o mesmo tipo de navegação em todo o app.",
    "Duração e easing devem vir dos tokens (motionTokens.duration, motionTokens.easing).",
  ] as const,
} as const;
