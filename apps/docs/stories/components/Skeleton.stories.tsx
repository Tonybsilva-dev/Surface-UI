import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@surface/ui/skeleton";
import type { SkeletonVariant } from "@surface/ui/skeleton";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Atoms/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Placeholder de carregamento com animação de pulse. Variantes rectangular, circular e text. Usa motionTokens.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Forma: rectangular, circular, text.",
      control: "select",
      options: ["rectangular", "circular", "text"] as SkeletonVariant[],
      table: { type: { summary: "SkeletonVariant" }, defaultValue: { summary: "rectangular" } },
    },
    width: {
      description: "Largura (ex.: 200, '100%').",
      control: "text",
      table: { type: { summary: "string | number" } },
    },
    height: {
      description: "Altura (ex.: 20, '1em' para text).",
      control: "text",
      table: { type: { summary: "string | number" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    variant: "rectangular",
    width: 200,
    height: 20,
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 20,
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 40,
    height: 40,
  },
};

export const Text: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Skeleton variant="text" width="100%" height={24} style={{ marginBottom: 8 }} />
      <Skeleton variant="text" width="90%" height={16} style={{ marginBottom: 8 }} />
      <Skeleton variant="text" width="70%" height={16} />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Skeleton (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Placeholder animado (pulse) para conteúdo em carregamento. rectangular, circular ou
              text. motionTokens para duração e easing.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Skeleton width={200} height={24} />
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
