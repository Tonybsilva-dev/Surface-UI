import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "@surface/ui/select";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Select.Root> = {
  title: "Components/Molecules/Select",
  component: Select.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Dropdown de seleção única. Compound: Select.Root, Select.Trigger, Select.Value, Select.Content, Select.Item, Select.Label, Select.Separator.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select.Root>;

export const Default: Story = {
  render: () => (
    <Select.Root defaultValue="a" onValueChange={(v) => console.log(v)}>
      <Select.Trigger>
        <Select.Value placeholder="Escolha uma opção" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="a">Opção A</Select.Item>
        <Select.Item value="b">Opção B</Select.Item>
        <Select.Item value="c">Opção C</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState<string | undefined>("apple");
    return (
      <div>
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value placeholder="Frutas" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="apple">Maçã</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="orange">Laranja</Select.Item>
          </Select.Content>
        </Select.Root>
        <p style={{ marginTop: 8, fontSize: 14 }}>Valor: {value}</p>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <Select.Root defaultValue="react">
      <Select.Trigger>
        <Select.Value placeholder="Framework" />
      </Select.Trigger>
      <Select.Content>
        <Select.Label>Frontend</Select.Label>
        <Select.Item value="react">React</Select.Item>
        <Select.Item value="vue">Vue</Select.Item>
        <Select.Separator />
        <Select.Label>Backend</Select.Label>
        <Select.Item value="node">Node</Select.Item>
        <Select.Item value="go">Go</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select.Root disabled defaultValue="x">
      <Select.Trigger>
        <Select.Value placeholder="Desabilitado" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="x">Opção</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Select (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Select.Root com value/onValueChange (controlado) ou defaultValue.
              Select.Trigger + Select.Value (placeholder). Select.Content (portal) com
              Select.Item (value + children). Select.Label e Select.Separator para
              agrupamento.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Select.Root defaultValue="1" onValueChange={(v) => console.log(v)}>
              <Select.Trigger>
                <Select.Value placeholder="Selecione" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="1">Um</Select.Item>
                <Select.Item value="2">Dois</Select.Item>
              </Select.Content>
            </Select.Root>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
