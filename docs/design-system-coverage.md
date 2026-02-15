# Cobertura do design atómico

Este documento mapeia quais moléculas não usam átomos do design system e quais organismos não usam moléculas, para manter consistência e aproveitamento do design atómico.

**Atualizar** este ficheiro quando forem adicionados ou alterados componentes em `packages/ui/src`.

Última verificação dos imports em `packages/ui/src`: confirmado que a lista abaixo está correta (moléculas sem átomos: 14; organismos sem moléculas: Chart).

**Script de verificação:** na raiz do monorepo execute `pnpm --filter @surface/ui ds:coverage`. O script lista moléculas que não usam átomos e organismos que não usam moléculas; termina com código de saída 1 se existir alguma violação (útil para CI quando se quiser impor a regra).

---

## Critérios

- **Átomos**: componentes com story em `Components/Atoms/` e implementação em `packages/ui/src`: Button, Input, Label, Icon, IconButton, Checkbox, Radio, Switch, Text, Badge, Chip, Avatar, Skeleton, Spinner, Progress, Link, Divider, Tooltip, Textarea, Slider, Image, MaskedInput, PasswordStrength.
- **Molécula** deve usar pelo menos um átomo (import de `./button`, `./label`, etc.) no seu ficheiro fonte.
- **Organismo** deve usar pelo menos uma molécula do DS (e tipicamente também átomos).

A análise é feita pelos imports nos ficheiros `.tsx` de `packages/ui/src` (código fonte dos componentes, não das stories).

---

## 1. Moléculas que não usam átomos

Estas moléculas só importam React, Radix/outras libs e `./lib/utils`; nenhum import de átomo (Button, Input, Label, etc.):

| Componente  | Ficheiro                    | Imports relevantes                  |
| ----------- | --------------------------- | ----------------------------------- |
| Select      | `packages/ui/src/select.tsx` | react, react-dom, cn                |
| Empty       | `packages/ui/src/empty.tsx` | react, cva, cn                      |
| ToggleGroup | `packages/ui/src/toggle-group.tsx` | react, cva, cn               |
| Tabs        | `packages/ui/src/tabs.tsx`  | react, cn                           |
| Card        | `packages/ui/src/card.tsx`  | react, cn                           |
| Collapsible | `packages/ui/src/collapsible.tsx` | @radix-ui/react-collapsible, cn |
| InputButton | `packages/ui/src/input-button.tsx` | react, cn                       |
| InputOTP    | `packages/ui/src/input-otp.tsx` | react, input-otp, cn             |
| Drawer      | `packages/ui/src/drawer.tsx` | vaul, cn                           |
| Dialog      | `packages/ui/src/dialog.tsx` | react, react-dom, cn               |
| Command     | `packages/ui/src/command.tsx` | cmdk, Dialog (molécula), cn        |
| Table       | `packages/ui/src/table.tsx` | react, cn                           |
| Toast       | `packages/ui/src/toast.tsx` | react, react-dom, cn                |
| Popover     | `packages/ui/src/popover.tsx` | react, radix, cn                   |

**Total: 14 moléculas** que não consomem átomos do design system.

---

## 2. Moléculas que usam átomos (referência)

Para contraste, estas moléculas estão alinhadas com o design atómico:

- **DropdownMenu** — usa Button
- **Form** — usa Label
- **Carousel** — usa Button
- **Pagination** — usa Button, Select
- **Combobox** — usa Button, Popover, Command
- **Textarea** — usa IconButton (Textarea é átomo que compõe com IconButton)

O organismo **DataTable** usa Button, Checkbox, Pagination, Spinner, Popover, IconButton, Table.

---

## 3. Organismos que não usam moléculas

- **Chart** (`packages/ui/src/chart.tsx`): importa apenas `recharts` e `./lib/utils`. Não usa nenhuma molécula nem átomo do DS; é um organismo “standalone” baseado em Recharts.

Organismos alinhados:

- **DataTable**: usa moléculas (Pagination, Popover, Table) e átomos (Button, Checkbox, Spinner, IconButton).
- **LoginFormCompleto** (em `apps/docs/stories/components/LoginFormCompleto.tsx`): usa Form (molécula), Input e Button (átomos).

**Total: 1 organismo** (Chart) que não usa moléculas (nem átomos) do DS.

---

## 4. Refactors sugeridos por componente

Sugestões para aproximar moléculas e organismos do design atómico, quando fizer sentido.

### Moléculas

| Componente  | Refactor sugerido |
| ----------- | ----------------- |
| **Select**  | Usar **Button** (ou componente que estenda Button) para o trigger em vez de `<button>` nativo; opcionalmente **Icon** para seta. |
| **Empty**   | Usar **Text** para título/descrição e **Button** para ação quando existir `action` / `onAction`. |
| **ToggleGroup** | Manter como primitive (são botões de toggle); opcionalmente garantir que cada item use **Button** ou variante. |
| **Tabs**    | Usar **Button** para os triggers de tab (ou variante “ghost”/underline) para consistência. |
| **Card**    | Usar **Text** para títulos e descrições dentro de CardHeader/CardContent/CardFooter quando houver conteúdo textual. |
| **Collapsible** | Trigger pode ser **Button** (ou IconButton) para abrir/fechar. |
| **InputButton** | Compor com **Input** e **Button** (ou IconButton) do DS em vez de elementos nativos. |
| **InputOTP** | Manter input-otp como base; opcionalmente usar **Input** ou estilos/tokens partilhados com Input. |
| **Drawer**  | Usar **Button** ou **IconButton** para trigger e para ações no footer. |
| **Dialog**  | Usar **Button** para ações (Confirmar/Cancelar) e **Text** para título e descrição. |
| **Command** | Já usa Dialog; usar **Text** para itens de lista quando for texto. |
| **Table**   | Usar **Text** nas células por defeito (TableCell com Text) para tipografia consistente. |
| **Toast**   | Usar **Text** para título e mensagem do toast. |
| **Popover** | Primitive de posicionamento; quem usa Popover (Combobox, etc.) já usa Button; pode ficar como está. |

### Organismos

| Componente | Refactor sugerido |
| ---------- | ----------------- |
| **Chart**  | (1) Documentar como exceção (lib externa Recharts). (2) Opcional: em `ChartContainer` ou exemplos, compor com **Card** para o container e **ToggleGroup** para variantes (ex.: tipo de gráfico); ou exportar apenas os primitives de gráfico e deixar a composição (Card + ToggleGroup + Chart) para as apps. |

---

## 5. Decisão de política

- **Aceitar exceções**: algumas moléculas podem permanecer “primitive-only” (só Radix/HTML + `cn`) e Chart como organismo baseado em lib externa; documentar aqui e no README do DS.
- **Ou** definir a regra “todas as moléculas devem usar ≥1 átomo” e refactorar gradualmente conforme a tabela acima.

Atualizar esta secção quando a equipa decidir a política.
