import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@surface/ui/badge";
import type { BadgeVariant, BadgeSize } from "@surface/ui/badge";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

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
    <StorySection title="Badge (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px" }}>
              Contador ou indicador (dot). Pode envolver um elemento (ícone, avatar) e posicionar o
              badge no canto. Variantes de cor e overflow (99+).
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              <Badge count={5} />
              <Badge count={0} showZero />
              <Badge dot variant="primary">
                <span style={{ width: 32, height: 32, background: "#eee", borderRadius: 6 }} />
              </Badge>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
