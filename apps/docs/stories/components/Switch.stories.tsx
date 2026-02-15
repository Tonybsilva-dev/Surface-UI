import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Switch } from "@surface/ui/switch";
import type { SwitchSize } from "@surface/ui/switch";
import { StoryCard, StorySection } from "../foundation/shared";

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

function SwitchPreferencesDemo() {
  const [email, setEmail] = useState(true);
  const [dark, setDark] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <Switch checked={email} onChange={(e) => setEmail(e.target.checked)}>
        Notificações por email
      </Switch>
      <Switch checked={dark} onChange={(e) => setDark(e.target.checked)}>
        Modo escuro
      </Switch>
      <Switch checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}>
        Newsletter semanal
      </Switch>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Switch (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Switch</strong> é um controlo de seleção para alternar entre dois
                estados (ligado/desligado). Estilo alinhado aos tokens (primary, outline,
                motionTokens para a transição do thumb).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>checked</code> / <code>onChange</code> — estado controlado.
                </li>
                <li>
                  <code>size</code> — sm, md (dimensões do interruptor).
                </li>
                <li>
                  <code>disabled</code> — desativa o switch.
                </li>
                <li>
                  <code>children</code> — rótulo opcional ao lado.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em páginas de preferências, formulários de configuração e listas onde se
                ativa/desativa uma opção (notificações, modo escuro, newsletter).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Switch: preferências (notificações, modo escuro, newsletter)">
          <p className="mb-4 text-sm text-muted-foreground">
            Bloco de preferências com três switches reais: notificações por email, modo
            escuro e newsletter semanal.
          </p>
          <SwitchPreferencesDemo />
        </StoryCard>
      </StorySection>
    </div>
  ),
};
