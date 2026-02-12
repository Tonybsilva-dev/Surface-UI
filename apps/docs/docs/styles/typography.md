# Typography (Styles) – Material Design 3

Tipografia torna o conteúdo **legível e bonita**. O M3 fornece uma **type scale** completa (Display, Headline, Title, Body, Label), famílias recomendadas e tokens para aplicar tipografia de forma consistente.

Fontes oficiais:

- [Typography – Overview](https://m3.material.io/styles/typography/overview)
- [Typography – Fonts](https://m3.material.io/styles/typography/fonts)
- [Typography – Type scale tokens](https://m3.material.io/styles/typography/type-scale-tokens)
- [Typography – Applying type](https://m3.material.io/styles/typography/applying-type)
- [Typography – Editorial treatments](https://m3.material.io/styles/typography/editorial-treatments)

No Storybook: **Styles → Typography** (conceitos à esquerda, exemplos visuais à direita).

---

## Overview

- Typography deve **organizar hierarquia** (o que é mais importante) e apoiar a leitura.
- Use poucos estilos por tela e mantenha **consistência** entre telas e plataformas.
- A type scale M3 usa cinco famílias de papel: Display, Headline, Title, Body e Label.

Em código: `typographyOverview`.

---

## Fonts

- **Roboto** é o typeface padrão da M3.
- **Roboto Flex** (variable font) adiciona mais pesos, larguras e ajustes óticos.
- **Roboto Serif** é serifada, voltada para leitura confortável em vários tamanhos.
- **Roboto Mono** é monoespaçada, ótima para código e números alinhados.
- **Noto Sans** é a família global fallback para scripts não cobertos.

Configure fallback em ordem (por exemplo: Roboto Flex → Roboto → Noto Sans) para manter a identidade visual mesmo quando a fonte principal não estiver disponível.

Em código: `typographyFonts`.

---

## Type scale tokens

A type scale inclui tokens para:

- **Display** (large/medium/small) – heróis e páginas iniciais.
- **Headline** – títulos de seções.
- **Title** – títulos de componentes (cards, diálogos, app bars).
- **Body** – texto corrido e descrições.
- **Label** – rótulos de botões, chips e campos.

Tokens em `@surface/ui/foundation`: `typographyTokens` (fontFamily, fontSize, lineHeight, fontWeight, letterSpacing).

Em código: `typographyTypeScale`.

---

## Applying type

- App bars e telas: use Headline ou Title.
- Cards e diálogos: Title para o título, Body para o conteúdo.
- Botões e chips: Label (geralmente medium ou large).
- Texto de suporte: Body small, com contraste adequado.
- Use fontes monoespaçadas (como Roboto Mono) para código e números alinhados.

Em código: `typographyApplyingType`.

---

## Editorial treatments

Para conteúdo editorial (artigos, marketing, landing pages):

- Combine Display/Headline com Body para criar hierarquia clara.
- Limite o número de estilos diferentes por página.
- Garanta largura de coluna e line-height confortáveis.
- Use variações de peso ou serif/sans para diferenciar voz editorial de UI funcional.

Em código: `typographyEditorialTreatments`.
