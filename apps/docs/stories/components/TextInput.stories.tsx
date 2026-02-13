import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextInput } from "@surface/ui/text-input";
import type { TextInputSize, TextInputStatus } from "@surface/ui/text-input";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof TextInput> = {
  title: "Components/Atoms/TextInput",
  component: TextInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campo de texto (Input). Estilo Ant Design com nossos tokens: size, status, addonBefore/addonAfter, allowClear.",
      },
    },
  },
  argTypes: {
    size: {
      description: "Tamanho: sm (24px), md (32px), lg (40px).",
      control: "select",
      options: ["sm", "md", "lg"] as TextInputSize[],
      table: { type: { summary: "TextInputSize" }, defaultValue: { summary: "md" } },
    },
    status: {
      description: "Estado de validação: default, error, warning.",
      control: "select",
      options: ["default", "error", "warning"] as TextInputStatus[],
      table: { type: { summary: "TextInputStatus" }, defaultValue: { summary: "default" } },
    },
    placeholder: {
      control: "text",
      table: { type: { summary: "string" } },
    },
    disabled: {
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    allowClear: {
      description: "Mostra botão para limpar quando há valor.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    addonBefore: {
      description: "Texto ou conteúdo antes do input (prefixo).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    addonAfter: {
      description: "Texto ou conteúdo depois do input (sufixo).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
  },
  args: {
    size: "md",
    status: "default",
    placeholder: "Digite aqui",
    disabled: false,
    allowClear: false,
    addonBefore: "",
    addonAfter: "",
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 320 }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          addonBefore={args.addonBefore ? args.addonBefore : undefined}
          addonAfter={args.addonAfter ? args.addonAfter : undefined}
        />
      </div>
    );
  },
  args: {
    placeholder: "Digite aqui",
  },
};

export const WithValue: Story = {
  render: function WithValueRender(args) {
    const [value, setValue] = useState("Texto inicial");
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: 280 }}
      />
    );
  },
  args: {
    placeholder: "Controlado",
    allowClear: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <TextInput size="sm" placeholder="Small" />
      <TextInput size="md" placeholder="Medium (default)" />
      <TextInput size="lg" placeholder="Large" />
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <TextInput status="default" placeholder="Default" />
      <TextInput status="error" placeholder="Erro" />
      <TextInput status="warning" placeholder="Aviso" />
    </div>
  ),
};

export const WithAddons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
      <TextInput addonBefore="https://" placeholder="site.com" style={{ width: "100%" }} />
      <TextInput addonAfter=".com" placeholder="site" style={{ width: "100%" }} />
      <TextInput
        addonBefore="R$"
        addonAfter=",00"
        placeholder="0"
        style={{ width: "100%" }}
      />
    </div>
  ),
};

export const Composition: Story = {
  render: function CompositionRender() {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
        <TextInput.Root size="md" status="default" allowClear style={{ width: "100%" }}>
          <TextInput.Leading>https://</TextInput.Leading>
          <TextInput.Input
            placeholder="site.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </TextInput.Root>
        <TextInput.Root size="md" allowClear style={{ width: "100%" }}>
          <TextInput.Leading>R$</TextInput.Leading>
          <TextInput.Input placeholder="0" />
          <TextInput.Trailing>,00</TextInput.Trailing>
        </TextInput.Root>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Desabilitado",
    disabled: true,
    value: "Valor desabilitado",
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="TextInput (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Campo de texto alinhado ao Input do Ant Design: tamanhos sm/md/lg, status
              (error/warning), addonBefore/addonAfter, allowClear. Usa tokens de tipografia,
              shape (textField), cor e motion.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <TextInput placeholder="Placeholder" style={{ width: 280 }} />
              <TextInput
                status="error"
                placeholder="Campo com erro"
                style={{ width: 280 }}
              />
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
