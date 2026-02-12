# Typography (Styles)

Tipografia torna o conteúdo **legível e bonita**. O sistema fornece uma **type scale** completa (Display, Headline, Title, Body, Label), famílias recomendadas e tokens para aplicar tipografia de forma consistente.

No Storybook: **Styles → Typography** (conceitos à esquerda, exemplos visuais à direita).

---

## Overview

- Typography deve **organizar hierarquia** (o que é mais importante) e apoiar a leitura.
- Use poucos estilos por tela e mantenha **consistência** entre telas e plataformas.
- A type scale usa cinco papéis: Display, Headline, Title, Body e Label.

Em código: `typographyOverview`.

---

## Fonts

- **Fonte padrão** – typeface principal da type scale (ex.: Inter, Source Sans).
- **Fonte variável** – múltiplos eixos (peso, largura) para flexibilidade.
- **Serifada** – leitura confortável em artigos e editorial.
- **Monoespaçada** – código e números alinhados.
- **Fallback** – família global para scripts não suportados pela principal.

Configure fallback em ordem (fonte principal → alternativa → genérica) para manter a identidade visual.

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
- Use fontes monoespaçadas para código e números alinhados.

Em código: `typographyApplyingType`.

---

## Editorial treatments

Para conteúdo editorial (artigos, marketing, landing pages):

- Combine Display/Headline com Body para criar hierarquia clara.
- Limite o número de estilos diferentes por página.
- Garanta largura de coluna e line-height confortáveis.
- Use variações de peso ou serif/sans para diferenciar voz editorial de UI funcional.

Em código: `typographyEditorialTreatments`.
