# Usability – Material Design 3

Usabilidade no M3 significa **clareza**, **previsibilidade** e **recuperação de erros**, aplicada de forma expressiva (cores, shape, motion) sem perder acessibilidade. Os exemplos estão disponíveis no Storybook em **Foundation → Usability**.

Fontes oficiais:

- [Usability – Overview](https://m3.material.io/foundations/usability/overview)
- [Usability – Applying M3 expressive](https://m3.material.io/foundations/usability/applying-m-3-expressive)

---

## Overview

- Interfaces devem ser **legíveis, previsíveis e fáceis de aprender**.
- Reduza o esforço cognitivo: menos passos, padrões consistentes e navegação clara entre tarefas.
- Mensagens de erro ajudam a entender o que aconteceu, por que e como corrigir (idealmente, com **desfazer**).

Tokens/guidelines relevantes em `@surface/ui/foundation`:

- `usabilityPrinciple`, `usabilitySignals`
- `applyingExpressiveUsability`, `cognitiveLoadGuidelines`, `accessibleUsability`

---

## Usability signals

- **Legibilidade:** contraste adequado, tamanhos confortáveis, hierarquia de texto clara.
- **Previsibilidade:** componentes se comportam da mesma forma em todo o produto; ações semelhantes produzem resultados semelhantes.
- **Recuperação de erro:** mensagens explicam o problema, sugerem solução e, quando possível, oferecem **desfazer**.

As stories mostram bons/maus exemplos de contraste e um banner de erro com ação clara.

---

## Applying M3 expressive

- **Cor:** usa roles (primary, secondary, error) para hierarquia e estados, sem depender apenas de cor para significado.
- **Shape:** variações de corner radius diferenciam containers, botões e superfícies interativas.
- **Motion:** animações cuidadosas explicam transições e foco; evite exageros que distraiam ou causem desconforto.

Use a expressividade do M3 para reforçar a usabilidade, não para competir com o conteúdo.

---

## Cognitive load

- **Chunking:** agrupe informações em blocos lógicos (cards, seções).
- **Progressive disclosure:** mostre só o necessário para a próxima decisão; esconda detalhes avançados atrás de ações explícitas.
- **Familiaridade:** aproveite padrões conhecidos (ícones, posição de botões) antes de experimentar.

No Storybook, a story **Cognitive load** mostra uma lista “antes” (densa e plana) e “depois” (agrupada por temas).

---

## Usability & accessibility

Usabilidade e acessibilidade são inseparáveis:

- **Perceivable:** conteúdo visível/audível (contraste, texto alternativo, suporte a leitores de tela).
- **Operable:** interação completa via teclado, leitores de tela e dispositivos assistivos; alvos de toque adequados.
- **Understandable:** linguagem clara, labels específicos e feedback que explica o que está acontecendo.

A story **AccessibleUsability** descreve um fluxo de ação com foco visível, feedback de carregamento e mensagens claras de erro e recuperação.

