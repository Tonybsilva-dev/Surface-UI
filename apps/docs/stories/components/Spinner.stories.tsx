import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@surface/ui/spinner";
import type { SpinnerSize } from "@surface/ui/spinner";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Spinner> = {
  title: "Components/Atoms/Spinner",
  component: Spinner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Indicador de carregamento (círculo girando). API alinhada ao Spin do Ant Design: size (sm/md/lg), spinning, tip. Usa motionTokens.",
      },
    },
  },
  argTypes: {
    size: {
      description: "Tamanho: sm (20px), md (28px), lg (36px). Equivalente ao size do Spin (small/default/large).",
      control: "select",
      options: ["sm", "md", "lg"] as SpinnerSize[],
      table: { type: { summary: "SpinnerSize" }, defaultValue: { summary: "md" } },
    },
    variant: {
      description: "Cor: primary ou default (outline).",
      control: "select",
      options: ["primary", "default"],
      table: { type: { summary: "string" }, defaultValue: { summary: "primary" } },
    },
    spinning: {
      description: "Se true, o indicador gira; se false, fica estático (como Spin do Ant Design).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    tip: {
      description: "Texto ou conteúdo abaixo do indicador (como description do Spin).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    delay: {
      description: "Atraso em ms antes de exibir (evita flash). Padrão: motionTokens.duration.short4 (200ms).",
      control: { type: "number", min: 0 },
      table: { type: { summary: "number" }, defaultValue: { summary: "200 (short4)" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    size: "md",
    variant: "primary",
    spinning: true,
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "primary",
    spinning: true,
  },
};

export const WithTip: Story = {
  args: {
    tip: "Carregando...",
    size: "md",
  },
};

export const Static: Story = {
  args: {
    spinning: false,
    tip: "Spinning desligado",
  },
};

export const WithDelay: Story = {
  args: {
    delay: 800,
    tip: "Aparece após 800 ms",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner variant="primary" />
      <Spinner variant="default" />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Spinner (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Indicador de loading. Tamanhos sm/md/lg. Cores primary ou neutro. motionTokens para
              animação.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Spinner />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
