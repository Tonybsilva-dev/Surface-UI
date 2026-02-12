# Design Foundations – Material Design 3

Referência dos princípios de design que guiam o sistema: **overview**, **acessibilidade** (incluindo contraste de cor), **estrutura**, **flow** e **elementos**.

Fontes oficiais:

- [Designing overview](https://m3.material.io/foundations/designing/overview)
- [Color contrast](https://m3.material.io/foundations/designing/color-contrast)
- [Structure](https://m3.material.io/foundations/designing/structure)
- [Flow](https://m3.material.io/foundations/designing/flow)
- [Elements](https://m3.material.io/foundations/designing/elements)
- [Writing best practices](https://m3.material.io/foundations/writing/best-practices)
- [Text truncation](https://m3.material.io/foundations/writing/text-truncation)
- [Text resizing](https://m3.material.io/foundations/writing/text-resizing)
- [Adaptive design](https://m3.material.io/foundations/adaptive-design/large-screens/overview)
- [Building for all – User needs](https://m3.material.io/foundations/building-for-all/user-needs)
- [Building for all – Co-design](https://m3.material.io/foundations/building-for-all/co-design)

---

## Overview (visão geral)

O Material Design 3 prioriza:

- **Acessibilidade** – produtos utilizáveis por pessoas com diferentes capacidades (visão, mobilidade, cognição).
- **Hierarquia visual** – ênfase clara entre elementos (cores, tipografia, elevação).
- **Estrutura** – layout previsível (navegação + corpo, panes).
- **Fluxo** – navegação e transições que orientam o usuário.
- **Elementos** – componentes consistentes e categorizados (ação, contenção, navegação, etc.).

Ao construir componentes e telas, seguir esses princípios garante consistência e usabilidade.

---

## Acessibilidade e Color contrast

- **Contraste** é essencial para leitura e uso da interface. Contraste de **luminância** (claro/escuro) importa mais que só cor (matiz).
- **Quem se beneficia:** pessoas com baixa visão, daltonismo e algumas dificuldades cognitivas ou de leitura.
- **Requisitos (WCAG / M3):**
  - Texto normal: contraste mínimo **4.5:1** (AA) ou **7:1** (AAA).
  - Texto grande (≥ 18px ou ≥ 14px em negrito): mínimo **3:1** (AA) ou **4.5:1** (AAA).
  - Elementos gráficos e controles de UI: mínimo **3:1**.
- **Ajustes possíveis:** escurecer/clarear cores, aumentar peso ou tamanho da fonte, usar fontes com melhor contraste inerente.

Os tokens de cor do sistema (ex.: `onPrimary`, `onSurface`) já são pensados para contraste. Ao criar novos pares texto/fundo, validar com ferramentas de contraste (ex.: APCA / WCAG 3).

---

## Structure (estrutura)

- **Duas regiões principais:**
  1. **Navigation** – drawer, rail ou bar na borda da janela.
  2. **Body** – conteúdo principal (listas, cards, app bar, busca).
- **Panes:** o body é organizado em **1–3 panes** (como “painéis”):
  - **Fixed** – largura fixa.
  - **Flexible** – cresce/encolhe com o espaço. Todo layout deve ter **pelo menos um pane flexible** para ser responsivo.
- **Breakpoints** (referência): compact (&lt; 600px), medium (600px+), expanded (840px+). Layout e número de panes podem mudar conforme o tamanho da janela.

---

## Flow (fluxo)

- **Pilha de navegação (back stack):** cada tela/destino visitado é uma entrada na pilha; voltar remove a entrada atual.
- **Transições:** navegação deve usar **animações consistentes** (duração e easing dos tokens de motion).
- **Estado:** manter estado dos itens na pilha quando fizer sentido (ex.: scroll, formulário não enviado).
- **Layout adaptativo:** em telas grandes, **múltiplos destinos** podem ser exibidos ao mesmo tempo (ex.: lista + detalhe).
- **Navigation bar (M3):** ideal para **3–5 destinos** de importância similar; manter os mesmos destinos entre telas quando possível.

---

## Adaptive design (layouts adaptativos)

- **Apps adaptativos** mudam o layout com base no **tamanho da janela**, postura do dispositivo (foldables) e densidade de tela, em vez de só esticar componentes.
- O M3 usa **window size classes** (largura/altura) para decidir layouts:
  - **Compact** – telefones em portrait; 1 pane visível (lista *ou* detalhe), bottom navigation.
  - **Medium** – tablets em portrait; até 2 panes (ex.: lista + detalhe em navegação por etapas), navigation rail ou drawer.
  - **Expanded** – tablets em landscape e desktops; 2–3 panes visíveis (ex.: list-detail + supporting pane).
- **Layouts canônicos** (padrões base):
  - **List-detail** – lista de itens + detalhe da seleção; em compact/medium, alterna entre lista e detalhe; em expanded, mostra os dois lados.
  - **Feed** – grid/lista de cards para conteúdo longo.
  - **Supporting pane** – conteúdo principal + pane secundário para filtros, info adicional, etc.
- **Navegação adaptativa:** em telas menores usar **bottom navigation bar**; em telas maiores trocar para **navigation rail** ou drawer lateral mantendo os mesmos destinos.

No design system, componentes de layout/navegação devem considerar esses breakpoints e layouts canônicos ao definir variações (ex.: `NavigationBar` vs `NavigationRail`, `List` + `DetailPane` para telas maiores).

---

## Building for all (projetar para todes)

- **User needs:** considere uma gama ampla de necessidades (sensoriais, motoras, cognitivas, linguagem/cultura, ambiente, tecnologia) em cada decisão de UI.
- **Não é “modo acessível” separado:** acessibilidade e inclusão são requisitos de base, não um tema alternativo.
- **Co-design:** sempre que possível, envolva pessoas reais — especialmente grupos historicamente excluídos — na pesquisa, prototipagem e validação (não só em testes finais).

Sugestão de perguntas ao criar/alterar componentes e fluxos:

- Quem pode ter dificuldade de usar isso? (baixa visão, uso só teclado, leitor de tela, conexão lenta, etc.)
- O componente continua usável em contextos de **stress** (pouco tempo, ambiente barulhento, exposição ao sol)?
- Há caminhos claros de **recuperação de erro** (mensagens compreensíveis, opções de desfazer)?

Checklist mínimo para componentes/padrões:

- Funciona somente com **teclado** (tab/shift+tab/enter/space) e ordem de foco faz sentido.
- Tem labels, roles e textos alternativos adequados para leitores de tela.
- Respeita tokens de contraste, tamanho de alvo de toque e text resizing (até 200%).
- Não depende apenas de **cor** para comunicar estado/erro (usa também ícone, texto ou padrão adicional).

---

## Elements (elementos / componentes)

Componentes são agrupados por **categoria** para manter padrões claros:

| Categoria     | Exemplos |
|---------------|----------|
| **Action**    | Button (filled, tonal, outlined, text), FAB, Icon button, Segmented/Split button |
| **Containment** | Card, Badge, Divider, Loading/Progress |
| **Communication** | Snackbar, Banner, Dialog, Tooltip |
| **Navigation** | Navigation bar, Drawer, Rail, Tabs, Bottom sheet |
| **Selection** | Checkbox, Chip, Date/Time picker, Radio, Switch |
| **Text input** | Text field (filled, outlined), Search bar |

Ao adicionar novos componentes, classificá-los em uma dessas categorias e seguir os tokens (cor, tipografia, shape, elevation, state, motion) e as guidelines de acessibilidade (contraste, foco visível, área de toque mínima).

---

## Writing (escrita e texto)

### Best practices

- **Explicar consequências:** use linguagem neutra e direta; descreva o resultado das ações e como desfazer, em vez de avisos alarmantes.
- **Formato escaneável:** organize com títulos, headings e subheadings claros para quem lê rápido ou em diagonal.
- **Sentence case:** em toda a UI (títulos, botões, labels, navegação), capitalize só a primeira letra da primeira palavra.
- **Abreviações:** use com moderação; prefira “por exemplo” a “e.g.” e “e mais” a “etc.” para leitores de tela e compreensão geral.
- **Objetivo:** texto compreensível por qualquer pessoa, em qualquer contexto.

### Text truncation

- **Uma linha:** `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`.
- **Várias linhas:** use `-webkit-line-clamp` com `display: -webkit-box` e `overflow: hidden` (ex.: limite de 1, 2 ou 3 linhas). Sempre indicar visualmente que o texto foi cortado (reticências).
- Use truncamento quando o espaço for limitado; onde possível, prefira ver o texto completo (tooltip, expandir, ou mais espaço).

### Text resizing (WCAG 1.4.4 / M3)

- O texto deve poder ser **ampliado até 200%** (zoom apenas de texto ou da página) sem perda de conteúdo ou de função.
- **Unidades relativas:** use `rem`, `em` ou `%` para tamanho de fonte; evite `px` fixo para texto de conteúdo.
- Ao redimensionar: sem clipping ou corte de texto, sem sobreposição que esconda conteúdo, botões/links/formulários continuam utilizáveis; o layout pode refluir e a navegação não pode ser prejudicada.
- Beneficia pessoas com baixa visão, usuários com presbiopia, dislexia e necessidades temporárias de ampliação.
