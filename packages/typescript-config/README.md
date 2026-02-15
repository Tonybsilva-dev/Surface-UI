<div align="center">

# @surface/typescript-config

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)

**Configurações TypeScript compartilhadas do monorepo Surface-UI**

</div>

---

## 📖 Sobre

Pacote interno com `tsconfig` reutilizáveis para apps e libraries do monorepo, garantindo consistência de target, módulos e strictness.

---

## 📦 Uso

No `tsconfig.json` do seu app ou package:

```json
{
  "extends": "@surface/typescript-config/react-app.json"
}
```

Ou para bibliotecas React:

```json
{
  "extends": "@surface/typescript-config/react-library.json"
}
```

---

## 📋 Exports

| Export                  | Uso típico        |
|-------------------------|--------------------|
| `base.json`             | Base compartilhada |
| `react-app.json`        | Apps (ex.: Storybook) |
| `react-library.json`    | Libs React (ex.: @surface/ui) |

---

## 👨‍💻 Autor

**Antonio Silva** — [me.antoniobsilva.com.br](https://me.antoniobsilva.com.br) · [LinkedIn](https://www.linkedin.com/in/tony-silva/) · [contato@antoniobsilva.com.br](mailto:contato@antoniobsilva.com.br)

---

<div align="center">[⬆ Voltar ao topo](#surfacetypescript-config)</div>
