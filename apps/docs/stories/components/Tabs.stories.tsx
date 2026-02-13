import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tab, Tabs } from "@surface/ui/tabs";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Atoms/Tabs",
  component: Tabs.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navegação por abas. API compound: Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content. Tokens: typography, color, motion.",
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

type Story = StoryObj<typeof Tabs.Root>;

function TabsWithContent() {
  const [value, setValue] = useState("1");
  return (
    <Tabs.Root value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">
        <div style={{ padding: 16, fontSize: 14, color: "#333" }}>
          Conteúdo da aba 1.
        </div>
      </Tabs.Content>
      <Tabs.Content value="2">
        <div style={{ padding: 16, fontSize: 14, color: "#333" }}>
          Conteúdo da aba 2.
        </div>
      </Tabs.Content>
      <Tabs.Content value="3">
        <div style={{ padding: 16, fontSize: 14, color: "#333" }}>
          Conteúdo da aba 3.
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

/** Nova API: Tabs.Root + Tabs.List + Tabs.Trigger + Tabs.Content. */
export const Default: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <TabsWithContent />
    </div>
  ),
};

/** Uso legado: Tabs (root+list) + Tab (trigger); conteúdo fora. */
export const LegacyAPI: Story = {
  render: () => {
    const [value, setValue] = useState("1");
    return (
      <div style={{ width: "100%" }}>
        <Tabs value={value} onChange={setValue}>
          <Tab value="1">Tab 1</Tab>
          <Tab value="2">Tab 2</Tab>
          <Tab value="3">Tab 3</Tab>
        </Tabs>
        <div style={{ padding: 16, fontSize: 14, color: "#666" }}>
          Conteúdo controlado pela aplicação (tab ativo: {value}).
        </div>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <Tabs.Root value={value} onChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="a">Primeira</Tabs.Trigger>
          <Tabs.Trigger value="b" disabled>
            Desabilitada
          </Tabs.Trigger>
          <Tabs.Trigger value="c">Terceira</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Conteúdo A</Tabs.Content>
        <Tabs.Content value="b">Conteúdo B (tab desabilitada)</Tabs.Content>
        <Tabs.Content value="c">Conteúdo C</Tabs.Content>
      </Tabs.Root>
    );
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Tabs (overview)">
      <TwoColumn
        left={
          <StoryCard title="API">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              <strong>Nova:</strong> Tabs.Root (value, onChange), Tabs.List (wrapper dos
              triggers), Tabs.Trigger (value, children), Tabs.Content (value, children —
              painel exibido quando ativo).
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
              Tab ativo: borda inferior primary. label.large, motionTokens.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <TabsWithContent />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
