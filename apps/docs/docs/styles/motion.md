# Motion (Styles) – Material Design 3

Motion comunica **mudança de estado**, **direção** e **hierarquia**. Use **duração** e **easing** consistentes (tokens) e padrões de **transição** para uma experiência previsível e acessível.

Fontes oficiais:

- [Motion – How it works](https://m3.material.io/styles/motion/overview/how-it-works)
- [Motion – Specs](https://m3.material.io/styles/motion/overview/specs)
- [Easing and duration – Applying](https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration)
- [Easing and duration – Tokens & specs](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)
- [Transitions – Transition patterns](https://m3.material.io/styles/motion/transitions/transition-patterns)
- [Transitions – Applying transitions](https://m3.material.io/styles/motion/transitions/applying-transitions)

No Storybook: **Styles → Motion** (conceitos à esquerda, exemplos visuais à direita).

---

## Overview

- Motion deve ter **propósito**: guiar o olhar, confirmar ações ou revelar relações entre elementos.
- Evite animações puramente decorativas que distraem.
- Use os **tokens** (`motionTokens.duration`, `motionTokens.easing`) em CSS ou JS para transições consistentes.

---

## Easing e duration

- **Duração:** short (50–200ms), medium (250–400ms), long (450–600ms). Escolha conforme a complexidade da mudança.
- **Easing:** standard (geral), emphasized (entrada/saída com mais peso), legacy (compatibilidade). Variantes Accelerate/Decelerate para início ou fim mais rápidos.
- **Aplicação:** transições gerais → medium + standard/emphasized; hover/focus → short; modals/sheets → emphasized.
- Respeite **prefers-reduced-motion**: reduza ou desative animações quando o usuário preferir menos movimento.

Tokens em `@surface/ui/foundation`: `motionTokens.duration`, `motionTokens.easing`.

---

## Transitions

- **Container transform:** elemento que muda de tamanho/posição entre telas (ex.: card → detalhe).
- **Shared axis:** navegação com direção consistente (ex.: próximo/voltar na mesma linha).
- **Fade through:** conteúdo some e outro aparece (dissolve) quando não há relação espacial direta.

Use o mesmo padrão para o mesmo tipo de navegação e sempre combine com os tokens de duration e easing.

---

Os dados em código estão em `@surface/ui/foundation`: `motionOverview`, `motionEasingAndDuration`, `motionTransitions`, `motionTokens`.
