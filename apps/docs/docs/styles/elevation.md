# Elevation (Styles) – Material Design 3

Elevação comunica **hierarquia e sobreposição** entre superfícies no eixo z. No Storybook: **Styles → Elevation** (overview, applying e tokens com exemplos visuais).

Fontes oficiais:

- [Elevation – Overview](https://m3.material.io/styles/elevation/overview)
- [Elevation – Applying elevation](https://m3.material.io/styles/elevation/applying-elevation)
- [Elevation – Tokens](https://m3.material.io/styles/elevation/tokens)

---

## Overview

- Elevação representa a **distância relativa** entre superfícies (z-index visual).
- O M3 usa níveis **0–5** com sombras em múltiplas camadas para cada nível.
- Mais elevação = maior destaque e prioridade na hierarquia visual.

Tokens relevantes em `@surface/ui/foundation`:

- `elevationTokens.level0` … `level5` (box-shadow e opcionalmente surfaceTint).

---

## Applying elevation

- **Level 0–1:** superfícies de fundo e containers básicos (background, cards planos, app bar).
- **Level 2–3:** elementos que precisam se destacar sem bloquear tudo (FAB, menus, bottom/side sheets).
- **Level 4–5:** superfícies modais e de alto foco (dialogs, side sheets importantes).
- Combine elevação com **state layers**: ao focar/pressionar, o componente pode ganhar leve aumento de elevação + overlay.

No Storybook, a story **ApplyingElevation** mostra cards e dialogs em diferentes níveis de elevação lado a lado.

---

## Tokens

- Cada nível de elevação tem um `boxShadow` que combina várias camadas.
- Valores típicos (referência em dp):
  - **Level 0:** 0dp
  - **Level 1:** 1–3dp
  - **Level 2:** 3–6dp
  - **Level 3:** 6–8dp
  - **Level 4:** 8–12dp
  - **Level 5:** 12+dp

Use esses níveis de forma consistente para que usuários reconheçam padrões de hierarquia e profundidade.

