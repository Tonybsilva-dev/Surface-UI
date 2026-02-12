# Layout – Material Design 3

Fundações de **layout**: entendimento de estrutura (overview, spacing, partes do layout, densidade, hardware, bidirecionalidade) e aplicação com **window size classes** e **canonical layouts**. Use os exemplos práticos e visuais no Storybook em **Foundation → Layout**.

Fontes oficiais:

- [Understanding layout – Overview](https://m3.material.io/foundations/layout/understanding-layout/overview)
- [Understanding layout – Spacing](https://m3.material.io/foundations/layout/understanding-layout/spacing)
- [Understanding layout – Parts of layout](https://m3.material.io/foundations/layout/understanding-layout/parts-of-layout)
- [Understanding layout – Density](https://m3.material.io/foundations/layout/understanding-layout/density)
- [Understanding layout – Hardware considerations](https://m3.material.io/foundations/layout/understanding-layout/hardware-considerations)
- [Understanding layout – Bidirectionality (RTL)](https://m3.material.io/foundations/layout/understanding-layout/bidirectionality-rtl)
- [Applying layout – Pane layouts](https://m3.material.io/foundations/layout/applying-layout/pane-layouts)
- [Applying layout – Window size classes](https://m3.material.io/foundations/layout/applying-layout/window-size-classes)
- [Applying layout – Compact / Medium / Expanded / Large+](https://m3.material.io/foundations/layout/applying-layout/compact)
- [Canonical layouts – Overview](https://m3.material.io/foundations/layout/canonical-layouts/overview)
- [Canonical layouts – List-detail](https://m3.material.io/foundations/layout/canonical-layouts/list-detail)
- [Canonical layouts – Supporting pane](https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane)
- [Canonical layouts – Feed](https://m3.material.io/foundations/layout/canonical-layouts/feed)

---

## Overview

Um bom layout M3:

- Organiza conteúdo em **regiões claras** (navegação + body).
- Usa **grid, gutters e margens consistentes** para criar ritmo visual.
- Adapta a estrutura conforme o **tamanho da janela** e o dispositivo, não só esticando componentes.

Tokens e guidelines relevantes:

- `layoutRegions`, `paneTypes`, `layoutBreakpoints` em `@surface/ui/foundation`.
- `spacingTokens` para escala de spacing.

---

## Spacing & parts of layout

- Use a **escala de spacing** (base 4px) para padding, margin e gap – evite valores “mágicos”.
- **Gutters e margens externas** devem ser consistentes entre telas; não encoste conteúdo nas bordas da janela.
- A região de **navegação** (bottom bar, rail, drawer) é estável e previsível.
- O **body** acomoda o conteúdo principal; panes podem ser fixed (largura fixa) ou flexible (cresce com o espaço).

No Storybook, veja como a escala de spacing é representada visualmente e como navigation + body se relacionam.

---

## Density

- **Comfortable:** mais espaço entre elementos, textos com respiro, componentes maiores – ideal para touch.
- **Compact:** menos espaçamento vertical, componentes mais densos – útil em telas grandes com muito conteúdo.
- Aplique densidade por **contexto** (ex.: tabelas densas, cards mais confortáveis) e evite misturar densidades extremas na mesma tela.

As stories de Layout mostram a mesma lista em versões comfortable e compact lado a lado.

---

## Hardware considerations

- Mantenha **touch targets mínimos** (ex.: 48×48dp) e espaçamento adequado ao redor.
- Garanta **foco visível** e navegação por teclado; considere estados hover para dispositivos com cursor.
- Leve em conta **posturas de uso** (telefone em uma mão, tablet apoiado, desktop) ao escolher densidade, número de panes e padrões de navegação.

---

## Bidirectionality (RTL)

- Em idiomas RTL, **espelhe layout e navegação** (rail/drawers mudam de lado), mantendo a hierarquia visual.
- Use alinhamento lógico (**start/end**) em vez de “esquerda/direita” fixos – isso facilita suporte LTR/RTL.
- Ícones de direção (setas de navegação, ícones de próximo/anterior) também podem ser espelhados; outros (como “play”) permanecem.

As stories trazem um exemplo simples de app bar em LTR e RTL lado a lado.

---

## Applying layout

- Use **window size classes** (`windowWidthClasses`) para definir quando mudar de 1 para 2 ou 3 panes (compact, medium, expanded).
- Combine com **adaptiveNavigationPatterns** para decidir se usa bottom bar, navigation rail ou drawer em cada classe.
- **Canonical layouts** (`canonicalLayouts`) ajudam a escolher estruturas estáveis:
  - `list-detail`: lista + detalhe, ambos visíveis em telas maiores.
  - `feed`: conteúdo em lista/grid, ideal para cards.
  - `supporting-pane`: pane secundário que apoia o conteúdo principal (filtros, detalhes, preview).

No Storybook, **Foundation → Layout → Applying layout** mostra como size classes, navegação adaptativa e canonical layouts se combinam na prática.

