# Color (Styles)

Sistema de cores: overview, como funciona, roles, **color schemes** (estático/dinâmico) e customizações **avançadas**. No Storybook: **Styles → Color** (com abas em Color Schemes e Advanced).

---

## Sistema de cores

O sistema usa **roles** (primary, secondary, tertiary, error, surface/outline). Cada role tem variantes (container, on-variant) para criar esquemas consistentes e acessíveis em light e dark. As cores são derivadas de uma cor primária (e opcionalmente secondary/tertiary); o sistema gera tons que garantem contraste adequado entre superfícies e conteúdo.

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
- **Static (baseline):** Paletas predefinidas ou custom. Ideal quando a marca exige cores específicas e consistência total.
- **Dynamic (choosing a source):** Cores extraídas de uma fonte (imagem, wallpaper, tema do OS) para esquema personalizado.

---

## Advanced (tabs)

- **Overview:** Customizações avançadas: aplicar cores a componentes, definir novas cores, ajustar tons existentes.
- **Apply colors:** Mapear roles para elementos da UI e garantir estados (hover, disabled) com variantes corretas.
- **Define new colors:** Roles customizados (ex.: success, warning) integrados ao sistema de tokens.
- **Adjust existing colors:** Clarear ou escurecer tons para contraste ou identidade, mantendo container/on-container.

---

## Color resources

Ferramentas para gerar paletas, validar contraste e exportar tokens (Figma, código).
