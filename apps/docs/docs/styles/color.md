# Color (Styles) – Material Design 3

Sistema de cores M3: overview, como funciona, roles, **color schemes** (estático/dinâmico) e customizações **avançadas**. No Storybook: **Styles → Color** (com abas em Color Schemes e Advanced).

Fontes oficiais:

**Sistema**

- [Color system – Overview](https://m3.material.io/styles/color/system/overview)
- [Color system – How the system works](https://m3.material.io/styles/color/system/how-the-system-works)
- [Color roles](https://m3.material.io/styles/color/roles)

**Color schemes**

- [Choosing a scheme](https://m3.material.io/styles/color/choosing-a-scheme)
- [Static (baseline)](https://m3.material.io/styles/color/static/baseline)
- [Dynamic – Choosing a source](https://m3.material.io/styles/color/dynamic/choosing-a-source)

**Advanced**

- [Advanced – Overview](https://m3.material.io/styles/color/advanced/overview)
- [Apply colors](https://m3.material.io/styles/color/advanced/apply-colors)
- [Define new colors](https://m3.material.io/styles/color/advanced/define-new-colors)
- [Adjust existing colors](https://m3.material.io/styles/color/advanced/adjust-existing-colors)

**Recursos**

- [Color resources](https://m3.material.io/styles/color/resources)

---

## Sistema de cores

O M3 usa um sistema baseado em **roles** (primary, secondary, tertiary, error, surface/outline). Cada role tem variantes (container, on-variant) para criar esquemas consistentes e acessíveis em light e dark. As cores são derivadas de uma cor primária (e opcionalmente secondary/tertiary); o sistema gera tons que garantem contraste adequado entre superfícies e conteúdo.

- **Roles** definem a função da cor (ação principal, superfície, erro), não o valor absoluto.
- Cada role tem pares **container + on-container** para elementos que “contêm” conteúdo.
- **Light e dark** invertem relações de luminância mantendo contraste legível.

---

## Roles

| Role | Uso |
|------|-----|
| **Primary** | Ação principal, elementos de destaque (botões, links, FAB). |
| **Secondary** | Ações secundárias, elementos que complementam o primary. |
| **Tertiary** | Contraste adicional (badges, avatares, estados especiais). |
| **Error** | Erros, destrutivo, alertas. Sempre distinto do primary. |
| **Surface** | Fundo principal da UI; surfaceVariant para cards e chips. |
| **Outline** | Bordas, divisores, ícones secundários. |

Os tokens em `@surface/ui/foundation` (`lightColorScheme`, `darkColorScheme`) implementam esses roles.

---

## Color schemes (tabs)

- **Choosing a scheme:** Escolha entre esquema **estático** (cores fixas da marca) ou **dinâmico** (cores extraídas de imagem/tema do sistema). Considere identidade e acessibilidade.
- **Static (baseline):** Paletas predefinidas (baseline M3 ou custom). Ideal quando a marca exige cores específicas e consistência total.
- **Dynamic (choosing a source):** Cores extraídas de uma fonte (imagem, wallpaper, tema do OS) para esquema personalizado.

---

## Advanced (tabs)

- **Overview:** Customizações avançadas: aplicar cores a componentes, definir novas cores, ajustar tons existentes.
- **Apply colors:** Mapear roles para elementos da UI e garantir estados (hover, disabled) com variantes corretas.
- **Define new colors:** Roles customizados (ex.: success, warning) integrados ao sistema de tokens.
- **Adjust existing colors:** Clarear ou escurecer tons para contraste ou identidade, mantendo container/on-container.

---

## Color resources

Ferramentas e referências oficiais do M3 para gerar paletas, validar contraste e exportar tokens (Figma, código): [Color resources](https://m3.material.io/styles/color/resources).
