<div align="center">

# @surface/eslint-config

![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint)

**Presets ESLint compartilhados do monorepo Surface-UI**

</div>

---

## 📖 Sobre

Configurações ESLint reutilizáveis para bibliotecas, apps React e Storybook, alinhadas ao estilo do monorepo (inclui integração com Turbo e Storybook).

---

## 📦 Uso

No `eslint.config.js` (ou equivalente) do package/app:

```js
import base from '@surface/eslint-config/library.js';   // libs
// ou
import react from '@surface/eslint-config/react.js';     // apps React
// ou
import storybook from '@surface/eslint-config/storybook.js'; // docs/stories
```

---

## 📋 Presets

| Arquivo         | Uso                    |
|-----------------|------------------------|
| `library.js`    | Pacotes (ex.: @surface/ui) |
| `react.js`      | Aplicações React       |
| `storybook.js`  | Projeto Storybook / stories |

---

## 👨‍💻 Autor

**Antonio Silva** — [me.antoniobsilva.com.br](https://me.antoniobsilva.com.br) · [LinkedIn](https://www.linkedin.com/in/tony-silva/) · [contato@antoniobsilva.com.br](mailto:contato@antoniobsilva.com.br)

---

<div align="center">[⬆ Voltar ao topo](#surfaceeslint-config)</div>
