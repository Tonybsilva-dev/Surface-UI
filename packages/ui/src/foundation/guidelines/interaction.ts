/**
 * Interaction – gestures, inputs, selection, states (overview, state layers, applying states)
 */

/** Princípio: interações previsíveis e feedback claro */
export const interactionPrinciple =
  "Cada interação deve ter resultado previsível e feedback visual e, quando apropriado, tátil ou auditivo.";

/** Gestos comuns e uso recomendado */
export const gestureGuidelines = {
  tap: "Toque único: ação principal (selecionar, ativar, navegar). Resposta imediata.",
  longPress: "Toque prolongado: ações secundárias, contexto (menu, drag para reordenar). Evite como única forma de ação crítica.",
  swipe: "Deslizar: navegação horizontal (tabs, carrossel), dismiss (ex.: fechar card), revelar ações (listas).",
  drag: "Arrastar: reordenar itens, sliders, drawer. Indique área válida e estado dragged.",
  pinch: "Pinch: zoom in/out em conteúdo (mapas, imagens). Opcional com gestos de teclado/mouse.",
} as const;

/** Tipos de input e boas práticas */
export const inputGuidelines = {
  overview: "Inputs devem deixar claro o que pode ser editado, o estado (vazio, preenchido, erro) e dar feedback ao alterar.",
  text: "Campos de texto: label visível ou placeholder, validação em momento adequado, autocomplete quando útil.",
  selectionControls: "Checkbox, radio, switch: estado selecionado/não selecionado visível; use para opções binárias ou listas pequenas.",
  slider: "Slider: valor atual visível; suporte a teclado (setas) e acessibilidade.",
  feedback: "Sempre feedback visual (e se possível tátil) na alteração; mensagens de erro claras e acionáveis.",
} as const;

/** Padrões de seleção */
export const selectionGuidelines = {
  single: "Seleção única: um item por vez (ex.: radio, lista de navegação). Estado selecionado destacado.",
  multiple: "Seleção múltipla: vários itens (ex.: checkboxes). Confirme com ação explícita (aplicar, salvar) quando fizer sentido.",
  range: "Seleção em intervalo: útil em listas longas (Shift+clique). Mostre claramente o intervalo selecionado.",
  discoverability: "Deixe óbvio o que é selecionável e qual o estado atual; evite seleção implícita sem feedback.",
} as const;

/** Visão geral de estados interativos */
export const statesOverview = {
  purpose: "Estados comunicam se um elemento está disponível, em foco, sendo pressionado ou arrastado.",
  types: ["hover", "focus", "pressed", "dragged", "disabled"] as const,
  consistency: "Use state layers (overlay com opacidade) de forma consistente em todos os componentes interativos.",
} as const;

/** State layers: overlay sobre a superfície do componente */
export const stateLayersGuidelines = {
  description: "State layers são overlays com opacidade aplicados sobre a cor do container (surface ou variant).",
  color: "A cor do overlay é geralmente a cor primária ou on-surface; a opacidade define a intensidade do estado.",
  notReplacement: "State layers não substituem o conteúdo; eles se somam à superfície para indicar interação.",
} as const;

/** Aplicação prática dos estados (alinhado aos tokens stateLayerTokens) */
export const applyingStatesGuidelines = {
  hover: "Hover: cursor pointer + state layer (ex.: 8% opacidade). Apenas em dispositivos com cursor.",
  focus: "Focus: state layer (ex.: 12% opacidade) + focus ring visível para acessibilidade (teclado e foco visível).",
  pressed: "Pressed: state layer na mesma ou maior opacidade que focus; feedback imediato ao clicar/tocar.",
  dragged: "Dragged: state layer mais intensa (ex.: 16%) + indicador visual de arraste (elevação, opacidade).",
  disabled: "Disabled: reduzir opacidade do conteúdo (ex.: 38%); sem state layer e sem interação.",
} as const;
