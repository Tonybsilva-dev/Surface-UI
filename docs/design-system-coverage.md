# Cobertura do design atómico

Este documento mapeia quais moléculas não usam átomos do design system e quais organismos não usam moléculas, para manter consistência e aproveitamento do design atómico.

**Atualizar** este ficheiro quando forem adicionados ou alterados componentes em `packages/ui/src`.

Última verificação: após refactors, **0 moléculas** sem átomos e **0 organismos** sem moléculas (script `ds:coverage` termina com código 0).

**Script de verificação:** na raiz do monorepo execute `pnpm --filter @surface/ui ds:coverage`. O script lista moléculas que não usam átomos e organismos que não usam moléculas; termina com código de saída 1 se existir alguma violação (útil para CI quando se quiser impor a regra).

---

## Critérios

- **Átomos**: componentes com story em `Components/Atoms/` e implementação em `packages/ui/src`: Button, Input, Label, Icon, IconButton, Checkbox, Radio, Switch, Text, Badge, Chip, Avatar, Skeleton, Spinner, Progress, Link, Divider, Tooltip, Textarea, Slider, Image, MaskedInput, PasswordStrength.
- **Molécula** deve usar pelo menos um átomo (import de `./button`, `./label`, etc.) no seu ficheiro fonte.
- **Organismo** deve usar pelo menos uma molécula do DS (e tipicamente também átomos).

A análise é feita pelos imports nos ficheiros `.tsx` de `packages/ui/src` (código fonte dos componentes, não das stories).

---

## 1. Moléculas que não usam átomos

**Nenhuma.** Todas as moléculas foram refatoradas para usar pelo menos um átomo (Button, Text, Input, etc.). Execute `pnpm --filter @surface/ui ds:coverage` para verificar.

---

## 2. Moléculas que usam átomos

Todas as moléculas usam pelo menos um átomo. Exemplos: **Select** (Button), **Empty** (Text), **ToggleGroup** (Button), **Tabs** (Button), **Card** (Text), **Collapsible** (Button), **InputButton** (Input, Button), **InputOTP** (Text), **Drawer** (Button, Text), **Dialog** (Button, Text), **Command** (Dialog, Text), **Table** (Text), **Toast** (Text, Button), **Popover** (Button), **DropdownMenu** (Button), **Form** (Label), **Carousel** (Button), **Pagination** (Button, Select), **Combobox** (Button, Popover, Command), **List** (Text, Skeleton).

O organismo **DataTable** usa Button, Checkbox, Pagination, Spinner, Popover, IconButton, Table. O organismo **Chart** usa Card.

---

## 3. Organismos que não usam moléculas

**Nenhum.** **Chart** foi refatorado para usar a molécula **Card** (ChartContainer envolve o gráfico em Card). **DataTable** usa moléculas (Pagination, Popover, Table) e átomos. **LoginFormCompleto** (apps/docs) usa Form, Input e Button.


## 4. Refactors sugeridos por componente (aplicados)

Os refactors abaixo foram aplicados; a tabela mantém-se como referência histórica.

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

## 5. Decisão de política (regra obrigatória)

- **Regra obrigatória:** Todas as moléculas devem usar pelo menos um átomo; todos os organismos devem usar pelo menos uma molécula; templates devem usar pelo menos um organismo ou uma molécula do DS para formar a página.
- Sem exceções: componentes que não cumprirem devem ser refatorados conforme a secção 4.

---

## 6. Templates

- **Onde estão:** Templates de página vivem em `apps/docs/stories/templates/` (ex.: Login).
- **Regra:** Um template deve usar pelo menos um organismo ou uma molécula do DS para formar a page (e em geral também átomos).
- **Templates existentes:**

| Template | Ficheiro | O que usa |
| -------- | -------- | --------- |
| **Login** | `apps/docs/stories/templates/Login.stories.tsx` | Layout (`LoginPageLayout`) com **LoginFormCompleto**, que usa **Form** (molécula), **Input** e **Button** (átomos). |

Novos templates devem seguir a mesma regra (compor com organismo ou molécula do DS).
