<div align="center">

# Surface-UI — Design System Monorepo

![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge)
![Turborepo](https://img.shields.io/badge/Turborepo-2.x-blue?style=for-the-badge&logo=turborepo)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Storybook](https://img.shields.io/badge/Storybook-8.x-FF4785?style=for-the-badge&logo=storybook)

**Biblioteca de componentes React em TypeScript — Turborepo + Storybook**

[Repositório](https://github.com/Tonybsilva-dev/Surface-UI) • [Documentação (Storybook)](https://surface-ui-docs.vercel.app)

</div>

---

## 📖 Sobre o Projeto

Monorepo de Design System com **Turborepo**, contendo:

- **`@surface/ui`** — Componentes React reutilizáveis (Button, Card, Form, Data Table, etc.)
- **apps/docs** — Documentação interativa com Storybook (Vite)
- **@surface/typescript-config** — Configurações TypeScript compartilhadas
- **@surface/eslint-config** — Presets ESLint compartilhados

Build com **tsup** (ESM + CJS), lint e formatação unificados, e **Changesets** para versionamento e publicação.

---

## 🛠️ Stack Tecnológica

| Área           | Tecnologia                          |
|----------------|-------------------------------------|
| Monorepo       | Turborepo, pnpm workspaces          |
| UI             | React 18, TypeScript 5               |
| Build (lib)     | tsup (esbuild)                      |
| Docs           | Storybook 8, Vite                   |
| Estilo         | Tailwind CSS, Radix UI (primitive)   |
| Qualidade      | ESLint, Prettier                    |
| Versionamento  | Changesets                          |

---

## 📦 Instalação e Desenvolvimento

### Pré-requisitos

- **Node.js** 18+
- **pnpm** 8.x (recomendado; o projeto usa `packageManager: "pnpm@8.15.6"`)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Tonybsilva-dev/Surface-UI.git
cd Surface-UI

# Instale as dependências (na raiz do monorepo)
pnpm install
```

### Comandos principais (na raiz)

| Comando                | Descrição |
|------------------------|-----------|
| `pnpm dev`             | Sobe o Storybook em modo desenvolvimento (`http://localhost:6006`) |
| `pnpm build`           | Build de todos os packages (incluindo docs) |
| `pnpm lint`            | Lint em todos os workspaces |
| `pnpm clean`           | Remove `node_modules` e pastas `dist` / `.turbo` |
| `pnpm format`          | Formata código com Prettier |
| `pnpm changeset`        | Cria um changeset para release |
| `pnpm release`          | Build + publicação (via Changesets) |
| `pnpm preview-storybook` | Serve o Storybook estático (após `pnpm build`) |

### Desenvolvimento local

```bash
pnpm dev
```

A documentação fica disponível em **http://localhost:6006**.

### Build para produção

```bash
pnpm build
```

Gera `packages/ui/dist` (componentes) e `apps/docs/storybook-static` (site do Storybook).

---

## 📂 Estrutura do Projeto

```
Surface-UI/
├── apps/
│   └── docs/                 # Storybook (documentação dos componentes)
├── packages/
│   ├── ui/                   # @surface/ui — componentes React
│   ├── typescript-config/    # @surface/typescript-config
│   └── eslint-config/        # @surface/eslint-config
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

## 📚 Apps e Packages

| Caminho                    | Nome                   | Descrição |
|----------------------------|------------------------|-----------|
| `apps/docs`                | docs                   | Site Storybook com stories e documentação dos componentes |
| `packages/ui`              | @surface/ui            | Biblioteca de componentes (Button, Card, Form, Table, etc.) |
| `packages/typescript-config` | @surface/typescript-config | `tsconfig` base e variantes (react-app, react-library) |
| `packages/eslint-config`   | @surface/eslint-config | Presets ESLint (library, react, storybook) |

Para instalar uma dependência no monorepo: `pnpm add -w <pacote>` (raiz) ou dentro do package/app desejado.

---

## 👨‍💻 Autor

**Antonio Silva**

- 🌐 Site: [me.antoniobsilva.com.br](https://me.antoniobsilva.com.br)
- 💼 LinkedIn: [tony-silva](https://www.linkedin.com/in/tony-silva/)
- 📧 Contato: [contato@antoniobsilva.com.br](mailto:contato@antoniobsilva.com.br)

---

<div align="center">

**Desenvolvido com ❤️**

[⬆ Voltar ao topo](#surface-ui--design-system-monorepo)

</div>
