import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@surface/ui/chip";
import type { ChipVariant, ChipSize } from "@surface/ui/chip";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Chip> = {
  title: "Components/Atoms/Chip",
  component: Chip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pílula para filtros, seleção ou categorias. Usa componentShapeTokens.chip (full). Variantes de cor e onRemove opcional.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Conteúdo do chip.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      description: "Variante de cor.",
      control: "select",
      options: ["default", "primary", "success", "warning", "error"] as ChipVariant[],
      table: { type: { summary: "ChipVariant" }, defaultValue: { summary: "default" } },
    },
    size: {
      description: "Tamanho: sm, md.",
      control: "select",
      options: ["sm", "md"] as ChipSize[],
      table: { type: { summary: "ChipSize" }, defaultValue: { summary: "md" } },
    },
    selected: {
      description: "Destaca como selecionado.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    onRemove: {
      description: "Se definido, exibe botão de remover.",
      table: { type: { summary: "() => void" } },
      control: false,
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    children: "Chip",
    variant: "default",
    size: "md",
    selected: false,
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "Chip",
    variant: "default",
    size: "md",
    selected: false,
  },
};

export const WithRemove: Story = {
  args: {
    children: "Removível",
    onRemove: () => {},
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Chip (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Filtros, tags, seleção múltipla. Shape pill (componentShapeTokens.chip). onRemove
              opcional para chip removível.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Chip>Tag</Chip>
              <Chip variant="primary" selected>
                Selecionado
              </Chip>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
