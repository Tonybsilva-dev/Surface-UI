import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextArea } from "@surface/ui/textarea";
import type { TextAreaSize, TextAreaStatus } from "@surface/ui/textarea";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof TextArea> = {
  title: "Components/Atoms/Textarea",
  component: TextArea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campo de texto multilinha. Compound: TextArea.Root + TextArea.Input. Consistente com TextInput (status, size).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"] as TextAreaSize[],
      table: { type: { summary: "TextAreaSize" }, defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: ["default", "error", "warning"] as TextAreaStatus[],
      table: { type: { summary: "TextAreaStatus" }, defaultValue: { summary: "default" } },
    },
    placeholder: { control: "text" },
    rows: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    status: "default",
    placeholder: "Escreva aqui...",
    rows: 4,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: "Escreva aqui...",
    rows: 4,
  },
};

export const WithValue: Story = {
  render: function WithValueRender(args) {
    const [value, setValue] = useState("Texto inicial");
    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: 320 }}
      />
    );
  },
};

export const StatusError: Story = {
  args: {
    status: "error",
    placeholder: "Campo com erro",
    style: { width: 320 },
  },
};

export const StatusWarning: Story = {
  args: {
    status: "warning",
    placeholder: "Aviso",
    style: { width: 320 },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Desabilitado",
    value: "Conteúdo",
    style: { width: 320 },
  },
};

export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>resize: vertical</div>
        <TextArea.Root style={{ width: 320 }}>
          <TextArea.Input placeholder="vertical" resize="vertical" rows={3} />
        </TextArea.Root>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>resize: none</div>
        <TextArea.Root style={{ width: 320 }}>
          <TextArea.Input placeholder="none" resize="none" rows={3} />
        </TextArea.Root>
      </div>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <TextArea.Root size="md" status="default" style={{ width: 360 }}>
      <TextArea.Input
        placeholder="Modo compound: TextArea.Root + TextArea.Input"
        rows={4}
      />
    </TextArea.Root>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Textarea (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              inputGuidelines: label visível ou placeholder; validação em momento adequado.
              Textarea com status error/warning e tamanhos sm/md/lg alinhados ao TextInput.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <TextArea
              placeholder="Descrição"
              rows={3}
              style={{ width: "100%", maxWidth: 320 }}
            />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
