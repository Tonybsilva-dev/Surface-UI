<div align="center">

# @surface/ui

![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![tsup](https://img.shields.io/badge/tsup-8.x-blue?style=for-the-badge)

**Biblioteca de componentes React em TypeScript**

</div>

---

## 📖 Sobre

Pacote principal do Design System Surface-UI: componentes React acessíveis e reutilizáveis, construídos com **Radix UI**, **Tailwind** e **TypeScript**. Exportados em ESM e CJS via **tsup**.

---

## 📦 Instalação

Dentro do monorepo o pacote é referenciado como `workspace:*`. Em outro projeto:

```bash
pnpm add @surface/ui react react-dom
# ou
npm install @surface/ui react react-dom
```

---

## ✨ Uso

Importe apenas os componentes necessários (tree-shakeable):

```tsx
import { Button } from '@surface/ui/button';
import { Card } from '@surface/ui/card';
import '@surface/ui/foundation/theme.css'; // tema/base (quando necessário)
```

Utilitários:

```tsx
import { cn } from '@surface/ui/lib/utils';
```

---

## 📋 Componentes disponíveis

| Categoria    | Componentes |
|-------------|-------------|
| **Layout**  | `divider`, `card`, `empty`, `collapsible` |
| **Botões**  | `button`, `icon-button`, `input-button` |
| **Formulário** | `input`, `textarea`, `checkbox`, `radio`, `switch`, `label`, `select`, `slider`, `form`, `input-otp`, `password-strength` |
| **Feedback** | `toast`, `progress`, `spinner`, `skeleton`, `tooltip` |
| **Navegação** | `tabs`, `link`, `pagination` |
| **Overlay** | `dialog`, `drawer`, `dropdown-menu`, `popover`, `command`, `combobox` |
| **Exibição** | `text`, `badge`, `chip`, `avatar`, `image`, `icon`, `chart` |
| **Data**     | `table`, `data-table` |
| **Outros**   | `carousel`, `toggle-group` |

Consulte o **Storybook** ([apps/docs](https://github.com/Tonybsilva-dev/Surface-UI/tree/main/apps/docs)) para exemplos e props.

---

## 🛠️ Scripts

| Comando     | Descrição        |
|------------|------------------|
| `pnpm build` | Compila com tsup (dist/) |
| `pnpm lint`  | ESLint em `src/` |
| `pnpm clean` | Remove `dist` e `.turbo` |

---

## 👨‍💻 Autor

**Antonio Silva** — [me.antoniobsilva.com.br](https://me.antoniobsilva.com.br) · [LinkedIn](https://www.linkedin.com/in/tony-silva/) · [contato@antoniobsilva.com.br](mailto:contato@antoniobsilva.com.br)

---

<div align="center">[⬆ Voltar ao topo](#surfaceui)</div>
