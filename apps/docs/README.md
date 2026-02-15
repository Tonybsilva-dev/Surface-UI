<div align="center">

# Docs — Surface-UI Storybook

![Storybook](https://img.shields.io/badge/Storybook-8.x-FF4785?style=for-the-badge&logo=storybook)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)

**Documentação e playground dos componentes `@surface/ui`**

</div>

---

## 📖 Sobre

App de documentação do Design System Surface-UI. Utiliza **Storybook** com **Vite** para carregamento rápido e hot reload. Consome `@surface/ui` via workspace.

- Stories em `stories/`
- Suporte a aliases como `@surface/ui`
- Documentação em MDX

---

## 🚀 Uso

Os comandos devem ser executados **na raiz do monorepo**:

```bash
# Desenvolvimento (Storybook em http://localhost:6006)
pnpm dev

# Build do Storybook estático
pnpm build

# Preview do build (serve storybook-static)
pnpm preview-storybook
```

Dentro de `apps/docs`:

```bash
pnpm run dev          # storybook dev -p 6006
pnpm run build        # build do Storybook
pnpm run preview-storybook  # serve storybook-static
pnpm run lint         # ESLint nos stories
```

---

## 📂 Estrutura relevante

```
apps/docs/
├── stories/           # Stories dos componentes
├── .storybook/        # Configuração do Storybook
├── package.json
└── README.md
```

---

## 👨‍💻 Autor

**Antonio Silva** — [me.antoniobsilva.com.br](https://me.antoniobsilva.com.br) · [LinkedIn](https://www.linkedin.com/in/tony-silva/) · [contato@antoniobsilva.com.br](mailto:contato@antoniobsilva.com.br)

---

<div align="center">[⬆ Voltar ao topo](#docs--surface-ui-storybook)</div>
