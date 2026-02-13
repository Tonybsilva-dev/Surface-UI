import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Switch } from "@surface/ui/switch";
import type { SwitchSize } from "@surface/ui/switch";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Switch> = {
  title: "Components/Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Interruptor on/off. Estilo Ant Design com nossos tokens: size (sm/md), checked, disabled.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Rótulo ao lado do switch.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    size: {
      description: "Tamanho: sm (28×16), md (44×22).",
      control: "select",
      options: ["sm", "md"] as SwitchSize[],
      table: { type: { summary: "SwitchSize" }, defaultValue: { summary: "md" } },
    },
    checked: {
      description: "Estado ligado (controlado).",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    size: "md",
    checked: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [checked, setChecked] = useState(Boolean(args.checked));
    useEffect(() => {
      setChecked(Boolean(args.checked));
    }, [args.checked]);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    children: "Opção",
    size: "md",
    checked: false,
  },
};

export const WithLabel: Story = {
  render: function WithLabelRender(args) {
    const [checked, setChecked] = useState(Boolean(args.checked));
    useEffect(() => {
      setChecked(Boolean(args.checked));
    }, [args.checked]);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    children: "Ativar notificações",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: "Ligado",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Switch size="sm" checked={a} onChange={(e) => setA(e.target.checked)}>
          Small
        </Switch>
        <Switch size="md" checked={b} onChange={(e) => setB(e.target.checked)}>
          Medium
        </Switch>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch disabled>Desligado desabilitado</Switch>
      <Switch disabled checked>
        Ligado desabilitado
      </Switch>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Switch (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Selection control para alternar entre dois estados. Tamanhos sm/md. Usa
              motionTokens para transição do thumb e primary/outline das foundations.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo (clique para alternar)">
            <Switch>Ativar</Switch>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
