import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@surface/ui/radio";

function RadioGroupWithState() {
  const [value, setValue] = useState("2");
  return (
    <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
      <Radio value="1">Opção 1</Radio>
      <Radio value="2">Opção 2</Radio>
      <Radio value="3">Opção 3</Radio>
    </RadioGroup>
  );
}
import type { RadioSize } from "@surface/ui/radio";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Radio> = {
  title: "Components/Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seleção única (radio). Uso standalone ou dentro de RadioGroup. Estilo Ant Design com nossos tokens.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Rótulo do radio.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    size: {
      description: "Tamanho do círculo: sm (16px), md (18px).",
      control: "select",
      options: ["sm", "md"] as RadioSize[],
      table: { type: { summary: "RadioSize" }, defaultValue: { summary: "md" } },
    },
    value: {
      description: "Valor deste item (em RadioGroup).",
      control: "text",
      table: { type: { summary: "string | number" } },
    },
    checked: {
      description: "Selecionado (controlado, uso standalone).",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    children: "Opção",
    size: "md",
    checked: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [checked, setChecked] = useState(Boolean(args.checked));
    useEffect(() => {
      setChecked(Boolean(args.checked));
    }, [args.checked]);
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    children: "Opção",
    checked: false,
  },
};

export const WithGroup: Story = {
  render: function WithGroupRender() {
    const [value, setValue] = useState<string | undefined>("b");
    return (
      <RadioGroup
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="demo"
      >
        <Radio value="a">Opção A</Radio>
        <Radio value="b">Opção B</Radio>
        <Radio value="c">Opção C</Radio>
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Radio size="sm">Small</Radio>
      <Radio size="md">Medium</Radio>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Radio disabled>Desabilitado não selecionado</Radio>
      <Radio disabled checked>
        Desabilitado selecionado
      </Radio>
      <RadioGroup value="x" disabled>
        <Radio value="x">Grupo desabilitado (selecionado)</Radio>
        <Radio value="y">Grupo desabilitado</Radio>
      </RadioGroup>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Radio (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Seleção única em lista. Use RadioGroup para value/onChange centralizados.
              Tamanhos sm/md. Tokens: primary, outline, motion.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo (clique para alterar)">
            <RadioGroupWithState />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
