import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@surface/ui/badge";
import type { BadgeVariant, BadgeSize } from "@surface/ui/badge";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Badge> = {
  title: "Components/Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Badge numérico ou ponto (dot). Pode envolver um elemento (ex.: ícone) e posicionar o badge no canto. Variantes: default, primary, success, warning, error.",
      },
    },
  },
  argTypes: {
    count: {
      description: "Número exibido. Acima de overflowCount vira overflowCount+.",
      control: { type: "number", min: 0 },
      table: { type: { summary: "number" } },
    },
    badgeContent: {
      description: "Conteúdo customizado (sobrescreve count).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      description: "Variante de cor.",
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "error",
      ] as BadgeVariant[],
      table: { type: { summary: "BadgeVariant" }, defaultValue: { summary: "default" } },
    },
    size: {
      description: "Tamanho do badge.",
      control: "select",
      options: ["sm", "md"] as BadgeSize[],
      table: { type: { summary: "BadgeSize" }, defaultValue: { summary: "md" } },
    },
    dot: {
      description: "Se true, exibe apenas um ponto (sem número).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    overflowCount: {
      description: "Valor máximo antes de exibir N+ (ex.: 99+).",
      control: { type: "number", min: 1 },
      table: { type: { summary: "number" }, defaultValue: { summary: "99" } },
    },
    showZero: {
      description: "Se true, mostra 0 quando count === 0.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    children: {
      description: "Elemento sobre o qual o badge é posicionado (canto superior direito).",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
    style: {
      description: "Estilos inline no wrapper.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    count: 5,
    variant: "default",
    size: "md",
    dot: false,
    overflowCount: 99,
    showZero: false,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
    variant: "default",
    size: "md",
    dot: false,
    overflowCount: 99,
    showZero: false,
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        style={{
          display: "inline-flex",
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "#f0f0f0",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        🔔
      </span>
    </Badge>
  ),
  args: {
    count: 3,
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <Badge count={1} variant="default" />
      <Badge count={2} variant="primary" />
      <Badge count={3} variant="success" />
      <Badge count={4} variant="warning" />
      <Badge count={5} variant="error" />
    </div>
  ),
};

export const Dot: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        style={{
          display: "inline-flex",
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "#f0f0f0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        •
      </span>
    </Badge>
  ),
  args: {
    dot: true,
    variant: "primary",
  },
};

export const Overflow: Story = {
  args: {
    count: 150,
    overflowCount: 99,
    variant: "primary",
  },
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Badge (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Badge</strong> é um átomo que exibe um contador numérico ou um ponto
                (dot). Pode envolver um elemento (ícone, avatar) e posicionar o badge no canto
                superior direito. Oferece variantes de cor e suporte a overflow (ex.: 99+).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>count</code> — número exibido; acima de overflowCount exibe N+.
                </li>
                <li>
                  <code>badgeContent</code> — conteúdo customizado (sobrescreve count).
                </li>
                <li>
                  <code>variant</code> — variante de cor (default, primary, secondary, destructive,
                  outline, success, warning, error).
                </li>
                <li>
                  <code>size</code> — tamanho (sm, md).
                </li>
                <li>
                  <code>dot</code> — se true, exibe apenas um ponto (sem número).
                </li>
                <li>
                  <code>overflowCount</code> — valor máximo antes de exibir N+ (ex.: 99).
                </li>
                <li>
                  <code>showZero</code> — se true, mostra 0 quando count === 0.
                </li>
                <li>
                  <code>children</code> — elemento sobre o qual o badge é posicionado.
                </li>
                <li>
                  <code>style</code> — estilos inline no wrapper.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o Badge é usado nas células para exibir
                perfil (ex.: admin, editor) e status (ativo/inativo), com variantes outline ou
                success/error conforme o contexto.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Badge: variantes, tamanhos, dot, overflow e com children">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa contador, showZero, variantes de cor, tamanhos sm/md, dot, overflow
            (99+) e badge sobre um elemento (children).
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Badge count={5} variant="default" />
            <Badge count={0} showZero variant="primary" />
            <Badge count={1} variant="default" size="sm" />
            <Badge count={2} variant="primary" size="md" />
            <Badge count={3} variant="success" />
            <Badge count={4} variant="warning" />
            <Badge count={5} variant="error" />
            <Badge count={150} overflowCount={99} variant="primary" />
            <Badge dot variant="primary">
              <span
                className="inline-flex size-8 items-center justify-center rounded-lg bg-muted text-xs"
                aria-hidden
              >
                •
              </span>
            </Badge>
            <Badge count={3} variant="primary">
              <span
                className="inline-flex size-10 items-center justify-center rounded-lg bg-muted text-sm"
                aria-hidden
              >
                🔔
              </span>
            </Badge>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
