import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tab, Tabs } from "@surface/ui/tabs";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Tabs> = {
  title: "Components/Atoms/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navegação por abas. Tabs (value, onChange) + Tab (value, children). Tokens: typography, color, motion.",
      },
    },
  },
  argTypes: {
    value: {
      description: "Chave do tab ativo.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

function TabsControlled() {
  const [value, setValue] = useState("1");
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value="1">Tab 1</Tab>
      <Tab value="2">Tab 2</Tab>
      <Tab value="3">Tab 3</Tab>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <TabsControlled />
      <div style={{ padding: 16, fontSize: 14, color: "#666" }}>
        Conteúdo da aba selecionada (controlado pelo estado da aplicação).
      </div>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <Tabs value={value} onChange={setValue}>
        <Tab value="a">Primeira</Tab>
        <Tab value="b" disabled>
          Desabilitada
        </Tab>
        <Tab value="c">Terceira</Tab>
      </Tabs>
    );
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Tabs (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Navegação: Tabs (value, onChange) agrupa Tab (value, children). Tab ativo
              com borda inferior primary. label.large, motionTokens.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <TabsControlled />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
