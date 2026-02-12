# Pontos customizáveis para nova identidade visual

O design system mantém a **estrutura de princípios** (roles, escalas, estados, acessibilidade). Os itens abaixo são os que você pode alterar ao seu critério para adotar uma nova identidade visual sem quebrar a estrutura.

---

## Recomendação: impacto máximo com mínimo de mudança (estilo Ant Design)

Para um visual próximo ao **Ant Design** (limpo, azul primário, sombras suaves) com o menor impacto na estrutura, altere só estes pontos:

| O que | Onde | O que mudamos (exemplo já aplicado) |
|-------|------|-------------------------------------|
| **Cor primária + superfícies** | `tokens/color.ts` | Primary `#1677ff` (azul Ant); surface branco/`#fafafa`; outline cinza neutro; error vermelho Ant. |
| **Shape dos componentes** | `tokens/shape.ts` | Escala 2/6/8/12/16px; **botão** = `small` (6px), não pill; **card/dialog** = `medium` (8px). |
| **Sombras** | `tokens/elevation.ts` | Sombras bem suaves (opacidade ~0.02–0.08), duas camadas, estilo Ant. |
| **Fonte** | `tokens/typography.ts` | System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...` |

Com isso a estrutura (roles, estados, type scale, níveis de elevação) permanece igual; só a **identidade visual** fica próxima do Ant Design.

---

## 1. Cor

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Paleta light** | `packages/ui/src/foundation/tokens/color.ts` → `lightColorScheme` | Trocar valores hex de `primary`, `onPrimary`, `surface`, etc. |
| **Paleta dark** | `packages/ui/src/foundation/tokens/color.ts` → `darkColorScheme` | Idem para tema escuro. |
| **Nomes dos roles** | Opcional: manter primary/secondary/tertiary/error/surface ou renomear (ex.: brand, accent). | Requer ajuste em todos os usos do token. |
| **Contraste** | Guidelines de acessibilidade; testes com ferramentas de contraste. | Garantir que on-variant sobre container cumpra WCAG. |

**Estrutura que se mantém:** roles semânticos (ação principal, superfície, erro, outline), variantes container/on-*, esquema light + dark.

---

## 2. Tipografia

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Família padrão** | `packages/ui/src/foundation/tokens/typography.ts` → `fontFamily.default` e `brand` | Trocar "Roboto" pela sua fonte (ex.: Inter, Source Sans). |
| **Fonte monoespaçada** | `typography.ts` → `fontFamily.mono` | Código e números alinhados. |
| **Tamanhos da type scale** | `typography.ts` → `display`, `headline`, `title`, `body`, `label` (cada um com large/medium/small) | Ajustar `fontSize` e `lineHeight` (em rem ou px). |
| **Pesos** | `typography.ts` → `fontWeight` em cada token | Ex.: 400, 500, 600, 700. |
| **Letter spacing** | `typography.ts` → `letterSpacing` | Opcional; para títulos grandes costuma ser negativo. |

**Estrutura que se mantém:** papéis Display, Headline, Title, Body, Label com tamanhos large/medium/small.

---

## 3. Shape (cantos)

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Escala de corner radius** | `packages/ui/src/foundation/tokens/shape.ts` → `shapeTokens` | Valores de `extraSmall` a `full` (ex.: 0, 4px, 8px, 12px, 16px, 28px, 9999px). |
| **Shape por componente** | `packages/ui/src/foundation/tokens/shape.ts` → `componentShapeTokens` | Ex.: botão = full (pill) ou medium; card = medium ou large. |

**Estrutura que se mantém:** escala única + mapeamento componente → estilo de shape.

---

## 4. Elevação

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Número de níveis** | `packages/ui/src/foundation/tokens/elevation.ts` → níveis 0–5 | Pode reduzir ou aumentar (ex.: 0–3). |
| **Sombras por nível** | `elevation.ts` → `elevationTokens` (um ou mais box-shadows por nível) | Valores de sombra (offset, blur, spread, cor). |

**Estrutura que se mantém:** níveis discretos para “superfície acima de outra”.

---

## 5. Motion

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Durações** | `packages/ui/src/foundation/tokens/motion.ts` → `motionTokens.duration` | short/medium/long em ms (ex.: 150ms, 300ms, 500ms). |
| **Curvas de easing** | `motion.ts` → `motionTokens.easing` | cubic-bezier ou nomes (ease-in-out, etc.). |

**Estrutura que se mantém:** escala short/medium/long + curvas para entrada/saída/ênfase.

---

## 6. State layers (estados interativos)

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Opacidades hover / focus / pressed** | `packages/ui/src/foundation/tokens/state.ts` → `stateLayerTokens` | Valores 0–1 (ex.: hover 0.08, focus 0.12). |
| **Opacidade disabled** | `state.ts` → `disabledOpacity` | Ex.: 0.38. |

**Estrutura que se mantém:** overlay por estado (hover, focus, pressed, disabled).

---

## 7. Espaçamento

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Escala de spacing** | `packages/ui/src/foundation/tokens/spacing.ts` → `spacingTokens` | Base (ex.: 4px ou 8px); múltiplos 0, 1, 2, … até 64. |

**Estrutura que se mantém:** escala consistente para padding, margin e gap.

---

## 8. Ícones

| O que | Onde / como | Exemplo de mudança |
|-------|-------------|--------------------|
| **Biblioteca** | Guidelines e componentes | Lucide, Phosphor, Heroicons, etc. |
| **Tamanhos recomendados** | `packages/ui/src/foundation/guidelines/iconStyles.ts` (e componentes) | Ex.: 16px, 20px, 24px para small/medium/large. |

**Estrutura que se mantém:** escala de tamanhos + uso semântico (ação, indicador, decorativo).

---

## 9. Acessibilidade (valores mínimos)

| O que | Onde | Exemplo de mudança |
|-------|------|--------------------|
| **Touch target mínimo** | `packages/ui/src/foundation/guidelines/accessibility.ts` → `touchTarget` | Ex.: 48px (recomendado) ou maior. |
| **Contraste** | Guidelines e tokens de cor | Manter contraste mínimo (WCAG AA/AAA) em on-variant sobre container. |
| **Focus ring** | Guidelines e CSS dos componentes | Espessura e cor do anel de foco. |

**Estrutura que se mantém:** alvo de toque, contraste, foco visível.

---

## Resumo

- **Tokens em código** (`tokens/*.ts`): cor, tipografia, shape, elevation, motion, state, spacing são o núcleo da identidade; altere os valores, mantendo tipos e nomes dos tokens se quiser compatibilidade.
- **Guidelines** (texto em `guidelines/*.ts` e docs): descrevem princípios (roles, escalas, estados); você pode reescrever exemplos e nomes de referência, mantendo a lógica.
- **Componentes**: consomem os tokens; ao mudar tokens, a identidade visual dos componentes segue automaticamente.

Assim você adota uma nova identidade visual preservando a mesma estrutura de princípios (semântica de cores, hierarquia tipográfica, estados, acessibilidade).
