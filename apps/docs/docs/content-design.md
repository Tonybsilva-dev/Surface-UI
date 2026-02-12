# Content Design – Material Design 3

Referência de **content design**: escrita efetiva, alt text, global writing, notificações e style guide. Fica **fora** dos Design Foundations; complementa com foco em conteúdo e copy.

Fontes oficiais:

- [Content design – Overview](https://m3.material.io/foundations/content-design/overview)
- [Alt text](https://m3.material.io/foundations/content-design/alt-text)
- [Global writing – Overview](https://m3.material.io/foundations/content-design/global-writing/overview)
- [Global writing – Word choice](https://m3.material.io/foundations/content-design/global-writing/word-choice)
- [Notifications](https://m3.material.io/foundations/content-design/notifications)
- [Style guide – UX writing best practices](https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices)
- [Style guide – Word choice](https://m3.material.io/foundations/content-design/style-guide/word-choice)
- [Style guide – Grammar and punctuation](https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation)

Referências relacionadas (customização e tokens):

- [Customization](https://m3.material.io/foundations/customization)
- [Design tokens – Overview](https://m3.material.io/foundations/design-tokens/overview)
- [Design tokens – How to use](https://m3.material.io/foundations/design-tokens/how-to-use-tokens)

---

## Visão geral

Content design no M3 visa **conteúdo compreensível por qualquer pessoa, em qualquer lugar**. Isso inclui:

- Texto de interface (labels, botões, títulos, mensagens de erro).
- Alt text e descrições para imagens e ícones.
- Escrita pensada para audiência global (idiomas, culturas).
- Notificações claras e acionáveis.
- Style guide consistente (palavras, gramática, pontuação).

---

## Alt text

- **Função primeiro:** descreva a **função** ou o **conteúdo relevante** (ex.: “Fechar”, “Foto de perfil de João”), não apenas “imagem” ou “ícone”.
- **Conciso:** evite começar com “Imagem de…” quando o contexto já for óbvio.
- **Decorativo:** elementos puramente decorativos devem ter `alt=""` ou `role="presentation"` para serem ignorados por leitores de tela.
- **Conteúdo complexo:** gráficos ou diagramas devem ter descrição longa (por exemplo via `aria-describedby` ou texto próximo).

Para avatares e ilustrações (ex.: 3D avatars), o alt deve descrever o que é relevante para o contexto (identidade, estado, ação), não cada detalhe visual.

---

## Global writing

- **Overview:** escreva pensando em tradução e em diferentes culturas; evite gírias, siglas não explicadas e referências muito locais.
- **Word choice:**
  - Prefira palavras simples e familiares.
  - Use os mesmos termos para os mesmos conceitos em todo o produto.
  - Evite jargão na UI voltada ao usuário final.

---

## Notifications

- **Tipos comuns:** snackbar, banner, dialog, toast.
- **Boas práticas:**
  - Mensagem clara; quando houver ação (ex.: Desfazer), torne-a explícita.
  - Duração e forma de dismiss adequados; não bloquear sem necessidade.
  - Use hierarquia correta: não use diálogo para informação de baixa importância.

---

## Style guide

### UX writing best practices

- **Explicar consequências:** linguagem neutra e direta; diga o que acontece ao agir e como desfazer.
- **Formato escaneável:** títulos e headings específicos; subheadings para quem lê em diagonal.
- **Sentence case:** em títulos, labels, botões e navegação (só a primeira letra em maiúscula).
- **Abreviações:** evite; prefira “por exemplo” a “e.g.”, “e mais” a “etc.”.

### Word choice

- Palavras simples e diretas.
- Termos consistentes para o mesmo conceito.
- Evitar jargão na UI do usuário final.

### Grammar and punctuation

- Pontuação conforme o idioma (ex.: sem ponto em labels curtos, ponto em frases).
- Listas com itens em paralelo quando fizer sentido.
- Tom consistente (formal ou informal) em todo o produto.

---

## Customization e design tokens

- **Customization:** o M3 permite personalizar tema (cor, tipografia, shape) mantendo consistência; ver [Customization](https://m3.material.io/foundations/customization).
- **Design tokens:** cores, tipo, shape, elevação etc. são expostos como tokens para uso em temas e componentes; no nosso DS isso está em **Foundation / Design Tokens** e em `@surface/ui/foundation`.

Content design aplica-se ao **conteúdo** (copy, alt text, notificações); customization e tokens aplicam-se à **aparência** e ao **comportamento** dos componentes.
