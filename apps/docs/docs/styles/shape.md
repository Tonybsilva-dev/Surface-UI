# Shape (Styles)

O sistema de shape inclui **formas originais**, uma **escala de corner radius** e **morphing de formas**. Use os tokens (`shapeTokens`, `componentShapeTokens`) para consistência.

No Storybook: **Styles → Shape** (conceitos à esquerda, exemplos visuais à direita).

---

## Princípios

- Shape comunica **hierarquia** e **agrupamento**; cantos mais arredondados podem indicar interatividade.
- Use a **escala de corner radius** de forma consistente (evite valores arbitrários).
- Formas **simétricas** (mesmo raio em todos os cantos) ou **assimétricas** (cantos internos em menus, split buttons) usam a mesma escala.

---

## Corner radius scale

Escala de referência: None 0dp → Extra small 4dp → Small 8dp → Medium 12dp → Large 16dp → … → Full (totalmente arredondado).

- **Customização no estilo:** alterar um estilo (ex.: medium) afeta todos os componentes mapeados a ele.
- **Customização no componente:** remapear um componente (ex.: button de full para small) afeta só esse componente.
- **Optical roundness:** em elementos aninhados, raio interno = raio externo − padding, para cantos proporcionais.

Tokens em `@surface/ui/foundation`: `shapeTokens` (extraSmall, small, medium, large, extraLarge, full), `componentShapeTokens` (button, card, chip, dialog, textField, fab, sheet).

---

## Shape morph

Transições animadas entre um shape e outro (ex.: FAB → extended FAB, chip que expande). Use com `motionTokens` para duração e easing. Aplique em componentes focados; evite em conteúdo denso ou texto longo.

---

Os dados em código estão em `@surface/ui/foundation`: `shapeOverview`, `shapeCornerRadiusScale`, `shapeMorph`, `shapeTokens`, `componentShapeTokens`.
