/**
 * Glossary – Material Design 3
 * Termos e definições usados nas foundations do design system.
 * @see https://m3.material.io/foundations/glossary
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  category: 'tokens' | 'layout' | 'interaction' | 'components' | 'general';
}

/** Entradas do glossário M3 (ordenadas por categoria e termo) */
export const glossaryEntries: GlossaryEntry[] = [
  // Tokens & surfaces
  {
    term: 'Design token',
    definition: 'Valor nomeado que define uma propriedade de design (cor, espaçamento, tipografia, elevação, etc.). Permite consistência e temas (ex.: claro/escuro).',
    category: 'tokens',
  },
  {
    term: 'State layer',
    definition: 'Overlay com opacidade aplicado sobre a superfície de um componente para indicar estado interativo (hover, focus, pressed, dragged). Não substitui o conteúdo.',
    category: 'tokens',
  },
  {
    term: 'Surface',
    definition: 'Área de fundo onde o conteúdo e os componentes são exibidos. No M3, surfaces têm roles (surface, surfaceVariant) e podem receber state layers.',
    category: 'tokens',
  },
  {
    term: 'Container',
    definition: 'Variante de cor que “contém” conteúdo relacionado a um role (ex.: primaryContainer, errorContainer). O texto sobre o container usa o role “on” correspondente (onPrimaryContainer, onErrorContainer).',
    category: 'tokens',
  },
  {
    term: 'Elevation',
    definition: 'Sombra e separação visual entre superfícies. No M3 é expressa por níveis (0–5) com box-shadow; ajuda a comunicar hierarquia e sobreposição.',
    category: 'tokens',
  },
  // Layout
  {
    term: 'Pane',
    definition: 'Região do layout que agrupa conteúdo. Pode ser fixed (largura fixa) ou flexible (cresce com o espaço). Layouts têm 1–3 panes; pelo menos um deve ser flexible.',
    category: 'layout',
  },
  {
    term: 'Window size class',
    definition: 'Classificação da largura (ou altura) da janela: compact, medium, expanded. Usada para decidir número de panes, tipo de navegação e layout canônico.',
    category: 'layout',
  },
  {
    term: 'Canonical layout',
    definition: 'Padrão de estrutura reconhecível: list-detail (lista + detalhe), feed (grid/lista de conteúdo), supporting-pane (pane secundário de apoio).',
    category: 'layout',
  },
  {
    term: 'Breakpoint',
    definition: 'Valor de largura (ex.: 600px, 840px) a partir do qual o layout muda (ex.: de 1 para 2 panes, ou de bottom bar para navigation rail).',
    category: 'layout',
  },
  {
    term: 'Density',
    definition: 'Quantidade de espaço entre elementos e tamanho relativo dos componentes. Comfortable (mais espaço, touch-friendly) vs compact (mais informação na tela).',
    category: 'layout',
  },
  // Interaction
  {
    term: 'Focus ring',
    definition: 'Indicador visual de foco (geralmente outline ou borda) para elementos focados via teclado ou leitor de tela. Essencial para acessibilidade.',
    category: 'interaction',
  },
  {
    term: 'Touch target',
    definition: 'Área mínima clicável/tocável de um controle (ex.: 48×48dp). Garante que usuários possam ativar elementos com precisão e acessibilidade.',
    category: 'interaction',
  },
  {
    term: 'Gesture',
    definition: 'Ação do usuário por entrada direta: tap, long press, swipe, drag, pinch. Cada gesto deve ter comportamento previsível e feedback adequado.',
    category: 'interaction',
  },
  {
    term: 'State',
    definition: 'Condição visual e comportamental de um componente: hover, focus, pressed, dragged, disabled. Comunicada por state layers e mudanças de estilo.',
    category: 'interaction',
  },
  // Components & general
  {
    term: 'Component',
    definition: 'Elemento reutilizável da UI (botão, card, text field, etc.) que segue os tokens e guidelines do sistema para aparência e comportamento.',
    category: 'components',
  },
  {
    term: 'Role',
    definition: 'Função semântica de uma cor ou elemento (ex.: primary, secondary, error, surface). Permite temas consistentes e acessibilidade (contraste).',
    category: 'general',
  },
  {
    term: 'Hierarchy',
    definition: 'Ordem de importância visual e informacional. Criada por tipografia, cor, elevação e espaçamento para guiar o usuário.',
    category: 'general',
  },
];

/** Agrupa entradas por categoria para exibição */
export function glossaryByCategory(): Record<GlossaryEntry['category'], GlossaryEntry[]> {
  const byCategory = {
    tokens: [] as GlossaryEntry[],
    layout: [] as GlossaryEntry[],
    interaction: [] as GlossaryEntry[],
    components: [] as GlossaryEntry[],
    general: [] as GlossaryEntry[],
  };
  for (const entry of glossaryEntries) {
    byCategory[entry.category].push(entry);
  }
  return byCategory;
}

/** Labels amigáveis das categorias */
export const glossaryCategoryLabels: Record<GlossaryEntry['category'], string> = {
  tokens: 'Tokens & superfícies',
  layout: 'Layout',
  interaction: 'Interação',
  components: 'Componentes',
  general: 'Geral',
};
