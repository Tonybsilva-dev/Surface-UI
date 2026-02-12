/**
 * Icons (Styles) – Material Design 3
 * Princípios de overview, designing e applying icons.
 * Este design system pode adotar ícones do Lucide ou Phosphor Icons,
 * aplicando os mesmos princípios M3 (consistência, escala, peso, uso semântico).
 * @see https://m3.material.io/styles/icons/overview
 * @see https://m3.material.io/styles/icons/designing-icons
 * @see https://m3.material.io/styles/icons/applying-icons
 */

/** Visão geral: papel dos ícones na UI */
export const iconOverview = {
  title: "Icons",
  description:
    "Ícones comunicam ações, estados e categorias de forma rápida e universal. Mantenha consistência visual (peso, tamanho, estilo) e use em conjunto com labels quando a clareza exigir.",
  libraryNote:
    "Este design system pode utilizar Lucide Icons ou Phosphor Icons, aplicando os princípios de consistência e escala do M3. Ambas as bibliotecas oferecem stroke consistente, múltiplos pesos (Lucide: stroke width; Phosphor: regular, bold, fill) e boa cobertura de símbolos.",
  link: "https://m3.material.io/styles/icons/overview",
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
  link: "https://m3.material.io/styles/icons/designing-icons",
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
  link: "https://m3.material.io/styles/icons/applying-icons",
} as const;

/** Tamanhos recomendados (compatíveis com Lucide/Phosphor) */
export const iconSizeRecommendations = {
  small: "16px – inline com body text, list items",
  medium: "20px – botões, chips",
  large: "24px – app bar, FAB, icon buttons (área clicável ≥ 48px)",
} as const;
