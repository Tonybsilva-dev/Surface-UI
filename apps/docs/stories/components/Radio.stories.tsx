import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@surface/ui/radio";

import type { RadioSize } from "@surface/ui/radio";
import { StoryCard, StorySection } from "../foundation/shared";

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

function RadioOverviewShipping() {
  const [method, setMethod] = useState("email");
  return (
    <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)} name="shipping">
      <Radio value="email">Email</Radio>
      <Radio value="correio">Correio</Radio>
      <Radio value="levantamento">Levantamento em loja</Radio>
    </RadioGroup>
  );
}

function RadioOverviewPeriod() {
  const [period, setPeriod] = useState("month");
  return (
    <RadioGroup value={period} onChange={(e) => setPeriod(e.target.value)} name="period">
      <Radio value="week">Última semana</Radio>
      <Radio value="month">Mês</Radio>
      <Radio value="year">Ano</Radio>
    </RadioGroup>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Radio (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Radio</strong> permite seleção única numa lista. Use standalone
                (controlado com checked/onChange) ou dentro de{" "}
                <strong>RadioGroup</strong> para value/onChange centralizados. Estilo
                alinhado aos tokens (primary, outline, motion).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>value</code> — valor deste item (em RadioGroup).
                </li>
                <li>
                  <code>checked</code> / <code>onChange</code> — uso controlado
                  standalone.
                </li>
                <li>
                  <code>size</code> — sm, md (tamanho do círculo).
                </li>
                <li>
                  <code>disabled</code> — desativa o item ou use em RadioGroup para
                  desativar todo o grupo.
                </li>
                <li>
                  RadioGroup: <code>value</code>, <code>onChange</code>, <code>name</code>
                  .
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em formulários de escolha única: método de envio, período de relatório,
                tipo de notificação, opções de pagamento. Combine com{" "}
                <strong>Label</strong> e <strong>Form</strong>.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Radio: método de envio e período (RadioGroup)">
          <p className="mb-4 text-sm text-muted-foreground">
            Dois cenários reais: escolha do método de envio (Email, Correio, Levantamento)
            e do período (Última semana, Mês, Ano).
          </p>
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-2 text-sm font-medium">Método de envio</p>
              <RadioOverviewShipping />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Período</p>
              <RadioOverviewPeriod />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
