# Icons (Styles) – Material Design 3

Princípios de **overview**, **designing** e **applying** ícones. Este design system pode utilizar **Lucide Icons** ou **Phosphor Icons**, aplicando os mesmos princípios M3 de consistência, escala e uso semântico.

Fontes oficiais M3:

- [Icons – Overview](https://m3.material.io/styles/icons/overview)
- [Icons – Designing icons](https://m3.material.io/styles/icons/designing-icons)
- [Icons – Applying icons](https://m3.material.io/styles/icons/applying-icons)

Referências das bibliotecas adotáveis:

- [Lucide](https://lucide.dev) – ícones em stroke, design limpo, React/SVG.
- [Phosphor Icons](https://phosphoricons.com/) – variantes regular, bold, fill; boa cobertura.

No Storybook: **Styles → Icons** (conceitos à esquerda, exemplos visuais à direita).

---

## Overview

- Ícones comunicam **ações**, **estados** e **categorias** de forma rápida e universal.
- Mantenha **consistência visual** (peso, tamanho, estilo) em toda a UI.
- Use ícones **em conjunto com labels** quando a clareza exigir; ícone sozinho só quando o contexto for óbvio (ex.: icon button com tooltip).

**Lucide e Phosphor:** ambas oferecem stroke consistente, múltiplos pesos e boa cobertura. Escolha uma biblioteca por produto e aplique os princípios M3 (escala, grid, acessibilidade).

---

## Designing icons (princípios adaptados)

- **Consistência:** mesma biblioteca e mesmo peso/tamanho dentro de um nível hierárquico.
- **Simplicidade:** símbolos diretos; evitar detalhe que não lê bem em tamanhos pequenos.
- **Escala:** tamanhos padrão (ex.: 16, 20, 24px); evitar valores arbitrários.
- **Grid:** viewBox padronizado (ex.: 24×24); alinhar ícones em grid para alinhamento com texto e botões.
- **Acessibilidade:** ícones decorativos → `aria-hidden`; ícones que comunicam informação → texto alternativo (visível ou sr-only).

---

## Applying icons

- **Ação:** ícone + label em botões quando houver espaço; ícone sozinho em icon buttons com tooltip ou `aria-label`.
- **Navegação:** ícones em bottom bar, rail e menus com tamanho e peso consistentes.
- **Feedback:** ícones de estado (check, alert, info) em mensagens e notificações.
- **Tamanho:** em linha com texto → 1em ou 1.25em; em botões → ícone 24px em área clicável ≥ 48×48px (touch target).

---

## Tamanhos recomendados

| Tamanho | Uso |
|--------|-----|
| **16px** | Inline com body text, itens de lista. |
| **20px** | Botões, chips. |
| **24px** | App bar, FAB, icon buttons (área ≥ 48×48). |

Os dados em código estão em `@surface/ui/foundation`: `iconOverview`, `iconDesigningGuidelines`, `iconApplyingGuidelines`, `iconSizeRecommendations`.
