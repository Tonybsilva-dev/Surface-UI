# Interaction

Fundações de **interação**: gestos, inputs, seleção e estados (overview, state layers, applying states). Use os exemplos no Storybook em **Foundation → Interaction**.

---

## Princípio

Cada interação deve ter **resultado previsível** e **feedback visual** (e, quando apropriado, tátil ou auditivo). Consistência entre gestos, inputs e estados melhora a usabilidade e acessibilidade.

---

## Gestures

- **Tap:** ação principal (selecionar, ativar, navegar). Resposta imediata.
- **Long press:** ações secundárias, contexto (menu, drag para reordenar). Evite como única forma de ação crítica.
- **Swipe:** navegação horizontal (tabs, carrossel), dismiss, revelar ações em listas.
- **Drag:** reordenar, sliders, drawer. Indique área válida e estado dragged.
- **Pinch:** zoom em conteúdo (mapas, imagens). Suporte opcional com teclado/mouse.

---

## Inputs

- Deixe claro o que pode ser editado e o estado (vazio, preenchido, erro).
- **Texto:** label ou placeholder, validação no momento adequado, autocomplete quando útil.
- **Selection controls (checkbox, radio, switch):** estado selecionado/não selecionado visível; use para opções binárias ou listas pequenas.
- **Slider:** valor atual visível; suporte a teclado (setas) e acessibilidade.
- Sempre **feedback visual** (e se possível tátil) na alteração; mensagens de erro claras e acionáveis.

---

## Selection

- **Single:** um item por vez (ex.: radio, navegação). Estado selecionado destacado.
- **Multiple:** vários itens (ex.: checkboxes). Confirme com ação explícita (aplicar, salvar) quando fizer sentido.
- **Range:** intervalo em listas longas (ex.: Shift+clique). Mostre claramente o intervalo selecionado.
- Deixe óbvio o que é selecionável e qual o estado atual; evite seleção implícita sem feedback.

---

## States (overview)

Estados comunicam se um elemento está **disponível**, **em foco**, **sendo pressionado** ou **arrastado**. Tipos: **hover**, **focus**, **pressed**, **dragged**, **disabled**. Use **state layers** (overlay com opacidade) de forma consistente em todos os componentes interativos.

---

## State layers

- **State layers** são overlays com opacidade aplicados sobre a cor do container (surface ou variant).
- A cor do overlay é geralmente a cor primária ou on-surface; a **opacidade** define a intensidade do estado.
- State layers **não substituem** o conteúdo; somam-se à superfície para indicar interação.

Os tokens em `@surface/ui/foundation` (`stateLayerTokens`) definem: **hover** (8%), **focus** (12%), **pressed** (12%), **dragged** (16%). Conteúdo **disabled** usa `disabledOpacity` (38%).

---

## Applying states

- **Hover:** cursor pointer + state layer (ex.: 8%). Apenas em dispositivos com cursor.
- **Focus:** state layer (ex.: 12%) + **focus ring** visível para acessibilidade (teclado e foco visível).
- **Pressed:** state layer na mesma ou maior opacidade que focus; feedback imediato ao clicar/tocar.
- **Dragged:** state layer mais intensa (ex.: 16%) + indicador visual de arraste (elevação, opacidade).
- **Disabled:** reduzir opacidade do conteúdo (ex.: 38%); sem state layer e sem interação.

No Storybook, **Foundation → Interaction** traz exemplos práticos à esquerda e exemplos visuais à direita para cada tópico.
