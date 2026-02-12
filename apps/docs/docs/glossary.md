# Glossary

Termos e definições usados nas foundations do design system. No Storybook, use **Foundation → Glossary** para navegar por categoria (ex.: esquerda = definição, direita = contexto visual).

---

## Tokens & superfícies

| Termo | Definição |
|-------|-----------|
| **Design token** | Valor nomeado que define uma propriedade de design (cor, espaçamento, tipografia, elevação, etc.). Permite consistência e temas (ex.: claro/escuro). |
| **State layer** | Overlay com opacidade aplicado sobre a superfície de um componente para indicar estado interativo (hover, focus, pressed, dragged). Não substitui o conteúdo. |
| **Surface** | Área de fundo onde o conteúdo e os componentes são exibidos. Surfaces têm roles (surface, surfaceVariant) e podem receber state layers. |
| **Container** | Variante de cor que “contém” conteúdo relacionado a um role (ex.: primaryContainer, errorContainer). O texto sobre o container usa o role “on” correspondente. |
| **Elevation** | Sombra e separação visual entre superfícies. É expressa por níveis (0–5) com box-shadow; ajuda a comunicar hierarquia e sobreposição. |

---

## Layout

| Termo | Definição |
|-------|-----------|
| **Pane** | Região do layout que agrupa conteúdo. Pode ser fixed (largura fixa) ou flexible (cresce com o espaço). Layouts têm 1–3 panes; pelo menos um deve ser flexible. |
| **Window size class** | Classificação da largura (ou altura) da janela: compact, medium, expanded. Usada para decidir número de panes, tipo de navegação e layout canônico. |
| **Canonical layout** | Padrão de estrutura reconhecível: list-detail (lista + detalhe), feed (grid/lista de conteúdo), supporting-pane (pane secundário de apoio). |
| **Breakpoint** | Valor de largura (ex.: 600px, 840px) a partir do qual o layout muda (ex.: de 1 para 2 panes, ou de bottom bar para navigation rail). |
| **Density** | Quantidade de espaço entre elementos e tamanho relativo dos componentes. Comfortable (mais espaço, touch-friendly) vs compact (mais informação na tela). |

---

## Interação

| Termo | Definição |
|-------|-----------|
| **Focus ring** | Indicador visual de foco (geralmente outline ou borda) para elementos focados via teclado ou leitor de tela. Essencial para acessibilidade. |
| **Touch target** | Área mínima clicável/tocável de um controle (ex.: 48×48dp). Garante que usuários possam ativar elementos com precisão e acessibilidade. |
| **Gesture** | Ação do usuário por entrada direta: tap, long press, swipe, drag, pinch. Cada gesto deve ter comportamento previsível e feedback adequado. |
| **State** | Condição visual e comportamental de um componente: hover, focus, pressed, dragged, disabled. Comunicada por state layers e mudanças de estilo. |

---

## Componentes & geral

| Termo | Definição |
|-------|-----------|
| **Component** | Elemento reutilizável da UI (botão, card, text field, etc.) que segue os tokens e guidelines do sistema para aparência e comportamento. |
| **Role** | Função semântica de uma cor ou elemento (ex.: primary, secondary, error, surface). Permite temas consistentes e acessibilidade (contraste). |
| **Hierarchy** | Ordem de importância visual e informacional. Criada por tipografia, cor, elevação e espaçamento para guiar o usuário. |

---

Os dados do glossário em código estão em `@surface/ui/foundation`: `glossaryEntries`, `glossaryByCategory()` e `glossaryCategoryLabels`.
