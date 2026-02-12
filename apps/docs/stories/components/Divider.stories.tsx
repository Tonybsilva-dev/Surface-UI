import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@surface/ui/divider";
import type { DividerOrientation, DividerVariant } from "@surface/ui/divider";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Divider> = {
  title: "Components/Atoms/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Separador visual (linha horizontal ou vertical). Opcionalmente com rótulo no centro. Usa token outline.",
      },
    },
  },
  argTypes: {
    orientation: {
      description: "Orientação da linha.",
      control: "select",
      options: ["horizontal", "vertical"] as DividerOrientation[],
      table: { type: { summary: "DividerOrientation" }, defaultValue: { summary: "horizontal" } },
    },
    variant: {
      description: "fullWidth: linha de ponta a ponta. inset: margem nas laterais.",
      control: "select",
      options: ["fullWidth", "inset"] as DividerVariant[],
      table: { type: { summary: "DividerVariant" }, defaultValue: { summary: "fullWidth" } },
    },
    children: {
      description: "Conteúdo opcional no centro (quebra a linha em dois segmentos).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    orientation: "horizontal",
    variant: "fullWidth",
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    variant: "fullWidth",
  },
};

export const WithLabel: Story = {
  args: {
    orientation: "horizontal",
    variant: "fullWidth",
    children: "ou",
  },
};

export const Inset: Story = {
  args: {
    orientation: "horizontal",
    variant: "inset",
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ display: "flex", height: 80, alignItems: "stretch" }}>
      <span>Item 1</span>
      <Divider {...args} />
      <span>Item 2</span>
      <Divider {...args} />
      <span>Item 3</span>
    </div>
  ),
  args: {
    orientation: "vertical",
    variant: "fullWidth",
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Divider (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px" }}>
              Separador horizontal ou vertical. Variantes: fullWidth (linha inteira) ou inset (com
              margem). Opcional: texto no centro.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ marginBottom: 8 }}>FullWidth</div>
                <Divider />
              </div>
              <div>
                <div style={{ marginBottom: 8 }}>Inset</div>
                <Divider variant="inset" />
              </div>
              <div>
                <div style={{ marginBottom: 8 }}>Com rótulo</div>
                <Divider>ou</Divider>
              </div>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
