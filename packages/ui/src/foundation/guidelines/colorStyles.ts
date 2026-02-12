/**
 * Color (Styles) – Material Design 3
 * System overview, roles, color schemes (choosing, static, dynamic), advanced, resources.
 * @see https://m3.material.io/styles/color/system/overview
 * @see https://m3.material.io/styles/color/system/how-the-system-works
 * @see https://m3.material.io/styles/color/roles
 * @see https://m3.material.io/styles/color/choosing-a-scheme
 * @see https://m3.material.io/styles/color/static/baseline
 * @see https://m3.material.io/styles/color/dynamic/choosing-a-source
 * @see https://m3.material.io/styles/color/advanced/overview
 * @see https://m3.material.io/styles/color/resources
 */

/** System overview: o que é o sistema de cores M3 */
export const colorSystemOverview = {
  title: "Sistema de cores",
  description:
    "O M3 usa um sistema baseado em roles (primary, secondary, tertiary, error, surface/outline). Cada role tem variantes (container, on-variant) para criar esquemas consistentes e acessíveis em light e dark.",
  link: "https://m3.material.io/styles/color/system/overview",
} as const;

/** Como o sistema funciona (tonalidade, contraste, temas) */
export const colorSystemHowItWorks = {
  description:
    "Cores são derivadas de uma cor primária (e opcionalmente secondary/tertiary). O sistema gera tons que garantem contraste adequado entre superfícies e conteúdo (on-primary, on-surface, etc.).",
  keyPoints: [
    "Roles definem a função da cor (ação principal, superfície, erro), não o valor absoluto.",
    "Cada role tem pares container + on-container para elementos que “contêm” conteúdo.",
    "Light e dark schemes invertem relações de luminância mantendo contraste legível.",
  ] as const,
  link: "https://m3.material.io/styles/color/system/how-the-system-works",
} as const;

/** Resumo dos roles de cor M3 */
export const colorRolesSummary = {
  primary: "Ação principal, elementos de destaque (botões, links, FAB).",
  secondary: "Ações secundárias, elementos que complementam o primary.",
  tertiary: "Contraste adicional (badges, avatares, estados especiais).",
  error: "Erros, destrutivo, alertas. Sempre distinto do primary.",
  surface: "Fundo principal da UI; surfaceVariant para cards e chips.",
  outline: "Bordas, divisores, ícones secundários.",
  link: "https://m3.material.io/styles/color/roles",
} as const;

/** Abas de Color Schemes: conteúdo por tab */
export const colorSchemeTabs = {
  choosing: {
    label: "Choosing a scheme",
    description:
      "Escolha entre esquema estático (cores fixas da marca) ou dinâmico (cores extraídas de uma imagem ou tema do sistema). Considere identidade da marca e acessibilidade (contraste).",
    link: "https://m3.material.io/styles/color/choosing-a-scheme",
  },
  static: {
    label: "Static (baseline)",
    description:
      "Esquema estático usa paletas predefinidas (baseline M3 ou cores customizadas). Ideal quando a marca exige cores específicas e consistência total entre dispositivos.",
    link: "https://m3.material.io/styles/color/static/baseline",
  },
  dynamic: {
    label: "Dynamic (choosing a source)",
    description:
      "Dynamic color extrai tons de uma fonte (imagem, wallpaper ou tema do OS) para criar um esquema personalizado. Bom para apps que querem se adaptar ao gosto do usuário.",
    link: "https://m3.material.io/styles/color/dynamic/choosing-a-source",
  },
} as const;

/** Abas de Advanced: conteúdo por tab */
export const colorAdvancedTabs = {
  overview: {
    label: "Overview",
    description:
      "Customizações avançadas permitem aplicar cores a componentes específicos, definir novas cores além dos roles padrão e ajustar tons existentes (clarear/escurecer) mantendo harmonia.",
    link: "https://m3.material.io/styles/color/advanced/overview",
  },
  apply: {
    label: "Apply colors",
    description:
      "Aplicar cores aos componentes: mapear roles para elementos da UI (botões, app bar, cards) e garantir que estados (hover, disabled) usem as variantes corretas (container, on-surface).",
    link: "https://m3.material.io/styles/color/advanced/apply-colors",
  },
  define: {
    label: "Define new colors",
    description:
      "Definir novas cores além do palette padrão: roles customizados para marcas ou funcionalidades (ex.: success, warning). Integre ao sistema de tokens para manter consistência.",
    link: "https://m3.material.io/styles/color/advanced/define-new-colors",
  },
  adjust: {
    label: "Adjust existing colors",
    description:
      "Ajustar cores existentes: clarear ou escurecer tons para atingir contraste desejado ou adequar a uma identidade visual, sem quebrar a relação entre container e on-container.",
    link: "https://m3.material.io/styles/color/advanced/adjust-existing-colors",
  },
} as const;

/** Color resources (ferramentas, referências) */
export const colorResources = {
  title: "Color resources",
  description:
    "Ferramentas e referências oficiais do M3 para gerar paletas, validar contraste e exportar tokens (Figma, código).",
  link: "https://m3.material.io/styles/color/resources",
} as const;
