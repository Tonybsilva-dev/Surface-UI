import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@surface/ui/label";
import type { LabelSize } from "@surface/ui/label";
import { Checkbox } from "@surface/ui/checkbox";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Label> = {
  title: "Components/Atoms/Label",
  component: Label,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Rótulo acessível associado a um controlo (htmlFor/id). Alinhado a typographyTokens.label e inputGuidelines.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Conteúdo do rótulo.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    size: {
      description: "Tamanho tipográfico: labelSmall, labelMedium, labelLarge.",
      control: "select",
      options: ["labelSmall", "labelMedium", "labelLarge"] as LabelSize[],
      table: { type: { summary: "LabelSize" }, defaultValue: { summary: "labelMedium" } },
    },
    required: {
      description: "Mostra asterisco para campo obrigatório.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "Estado desabilitado (opacidade reduzida).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    children: "Nome do campo",
    size: "labelMedium",
    required: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Nome do campo",
  },
};

export const Required: Story = {
  args: {
    children: "Email",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Campo desabilitado",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label size="labelSmall" htmlFor="s">
        Label small
      </Label>
      <Label size="labelMedium" htmlFor="m">
        Label medium
      </Label>
      <Label size="labelLarge" htmlFor="l">
        Label large
      </Label>
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <Label htmlFor="cb1" style={{ display: "block", marginBottom: 8 }}>
          Aceito os termos
        </Label>
        <Checkbox id="cb1">(ou use children do Checkbox)</Checkbox>
      </div>
      <div>
        <Label htmlFor="cb2" required style={{ display: "block", marginBottom: 8 }}>
          Obrigatório
        </Label>
        <Checkbox id="cb2" />
      </div>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Label (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Labels devem estar associados ao controlo via htmlFor e id. Use required para
              indicar campo obrigatório (asterisco). Disabled reflete o estado do controlo
              associado. inputGuidelines: label visível ou placeholder, validação em momento
              adequado.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <Label htmlFor="ex1" required style={{ display: "block", marginBottom: 8 }}>
              Email
            </Label>
            <input
              id="ex1"
              type="email"
              placeholder="seu@email.com"
              style={{
                padding: "8px 12px",
                border: "1px solid #888",
                borderRadius: 4,
                width: 240,
              }}
            />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
