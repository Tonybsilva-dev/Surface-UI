/**
 * Shape (Styles)
 * Overview (principles), corner radius scale, shape morph.
 */

/** Visão geral: princípios de shape */
export const shapeOverview = {
  title: "Shape",
  description:
    "O sistema de shape inclui formas originais, uma escala de corner radius e morphing de formas. Componentes usam essa escala para definir retângulos como botões, cards e diálogos.",
  principles: [
    "Shape comunica hierarquia e agrupamento: cantos mais arredondados podem indicar interatividade ou destaque.",
    "Use a escala de corner radius de forma consistente; evite valores arbitrários.",
    "Formas simétricas (mesmo raio em todos os cantos) ou assimétricas (cantos internos em menus, split buttons) usam a mesma escala.",
  ] as const,
} as const;

/** Escala de corner radius e aplicação */
export const shapeCornerRadiusScale = {
  description:
    "O sistema usa uma escala baseada em tamanho com vários níveis (None 0dp, Extra small 4dp, Small 8dp, Medium 12dp, Large 16dp, até Full). Estilos são atribuídos aos componentes conforme a quantidade de arredondamento desejada.",
  scale: [
    "None – 0dp",
    "Extra small – 4dp",
    "Small – 8dp",
    "Medium – 12dp",
    "Large – 16dp",
    "Large increased – 20dp",
    "Extra large – 28dp",
    "Extra large increased – 32dp",
    "Extra extra large – 48dp",
    "Full – totalmente arredondado (pill/circle)",
  ] as const,
  symmetry:
    "Componentes podem ter formas simétricas (mesmo valor em todos os cantos) ou assimétricas (cantos internos em itens agrupados).",
  customizing: [
    "Customização no estilo: alterar o tamanho de um estilo (ex.: medium) afeta todos os componentes mapeados a ele.",
    "Customização no componente: remapear um componente para outro estilo (ex.: button de full para small) afeta só esse componente.",
    "Optical roundness: em elementos aninhados, use raio interno proporcional (raio externo − padding = raio interno) para evitar cantos desbalanceados.",
  ] as const,
} as const;

/** Shape morph: transição entre formas */
export const shapeMorph = {
  description:
    "Morphing de formas: transições animadas entre um shape e outro (ex.: FAB que vira barra, chip que expande). Use com os tokens de motion para duração e easing consistentes.",
  whenToUse: [
    "Transições entre estados do mesmo componente (ex.: FAB → extended FAB).",
    "Revelar ou ocultar conteúdo mantendo continuidade visual.",
    "Evite morphing em conteúdo denso ou texto longo; priorize elementos focados.",
  ] as const,
} as const;
