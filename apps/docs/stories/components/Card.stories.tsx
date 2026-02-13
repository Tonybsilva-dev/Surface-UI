import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@surface/ui/card";
import type { CardVariant } from "@surface/ui/card";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Card> = {
  title: "Components/Atoms/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Container de conteúdo. Variantes: elevated (sombra), outlined (borda), filled (fundo). Tokens: elevation, shape, spacing.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outlined", "filled"] as CardVariant[],
      table: { type: { summary: "CardVariant" }, defaultValue: { summary: "elevated" } },
    },
  },
  args: {
    variant: "elevated",
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Card {...args}>Conteúdo do card. Use para agrupar texto, listas ou ações.</Card>
    </div>
  ),
  args: {
    variant: "elevated",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
      <Card variant="elevated">
        <strong>Elevated</strong> – sombra suave (elevation level1).
      </Card>
      <Card variant="outlined">
        <strong>Outlined</strong> – borda outline.
      </Card>
      <Card variant="filled">
        <strong>Filled</strong> – fundo surfaceVariant.
      </Card>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Card (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Containment: agrupa conteúdo. elevated (sombra), outlined (borda), filled
              (fundo). componentShapeTokens.card, elevationTokens, spacingTokens.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Card variant="elevated">
              Título do card
              <p style={{ margin: "8px 0 0", fontSize: 14, color: "#666" }}>
                Descrição ou conteúdo secundário.
              </p>
            </Card>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
