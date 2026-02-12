/**
 * Icons (Styles)
 * Princípios de overview, designing e applying icons.
 * Pode adotar Lucide, Phosphor ou outra biblioteca com consistência de escala e peso.
 */

/** Visão geral: papel dos ícones na UI */
export const iconOverview = {
  title: "Icons",
  description:
    "Ícones comunicam ações, estados e categorias de forma rápida e universal. Mantenha consistência visual (peso, tamanho, estilo) e use em conjunto com labels quando a clareza exigir.",
  libraryNote:
    "Este design system pode utilizar Lucide Icons ou Phosphor Icons, com princípios de consistência e escala. Ambas oferecem stroke consistente, múltiplos pesos e boa cobertura de símbolos.",
} as const;

/** Princípios de desenho (adaptados para Lucide/Phosphor) */
export const iconDesigningGuidelines = {
  description:
    "Ícones devem ser reconhecíveis, simples e consistentes entre si. Ao usar Lucide ou Phosphor, mantenha um único peso (stroke ou variante) por contexto para não poluir visualmente.",
  keyPoints: [
    "Consistência: use a mesma biblioteca (Lucide ou Phosphor) e o mesmo peso/tamanho dentro de um mesmo nível hierárquico.",
    "Simplicidade: preferir símbolos diretos; evitar detalhes desnecessários que não leem bem em tamanhos pequenos.",
    "Escala: definir tamanhos padrão (ex.: 16, 20, 24px) e usar sempre que possível; evite valores arbitrários.",
    "Grid: Lucide e Phosphor seguem viewBox padronizado; alinhe ícones em um grid lógico (ex.: 24×24) para alinhamento com texto e botões.",
    "Acessibilidade: ícones decorativos devem ter aria-hidden; ícones que comunicam informação devem ter texto alternativo (visible ou sr-only).",
  ] as const,
  lucideRef: "https://lucide.dev/guide/design",
  phosphorRef: "https://phosphoricons.com/",
} as const;

/** Aplicação de ícones na interface */
export const iconApplyingGuidelines = {
  description:
    "Use ícones para reforçar ações (botões, links), indicar tipo de conteúdo (lista, arquivo) e estados (sucesso, erro). Não substitua texto crítico apenas por ícone quando o contexto for ambíguo.",
  keyPoints: [
    "Ação: ícone + label em botões primários quando espaço permitir; ícone sozinho em icon buttons com tooltip ou aria-label.",
    "Navegação: ícones em bottom bar, rail e menus devem ser consistentes em tamanho e peso.",
    "Feedback: ícones de estado (check, alert, info) em mensagens e notificações.",
    "Tamanho: ícones em linha com texto geralmente 1em ou 1.25em; em botões, respeitar touch target (ex.: 24px ícone em área 48×48).",
  ] as const,
} as const;

/** Tamanhos recomendados (compatíveis com Lucide/Phosphor) */
export const iconSizeRecommendations = {
  small: "16px – inline com body text, list items",
  medium: "20px – botões, chips",
  large: "24px – app bar, FAB, icon buttons (área clicável ≥ 48px)",
} as const;
