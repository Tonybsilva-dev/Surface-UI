import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "@surface/ui/checkbox";
import type { CheckboxSize } from "@surface/ui/checkbox";
import { StoryCard, StorySection } from "../foundation/shared";

function noop(): void {}

const meta: Meta<typeof Checkbox> = {
  title: "Components/Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Caixa de seleção. Estados checked, indeterminate e disabled. Alinhado às guidelines de selection controls (inputGuidelines, selectionGuidelines).",
      },
    },
  },
  argTypes: {
    children: {
      description: "Rótulo do checkbox (opcional).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    size: {
      description: "Tamanho do quadro: sm (18px), md (20px).",
      control: "select",
      options: ["sm", "md"] as CheckboxSize[],
      table: { type: { summary: "CheckboxSize" }, defaultValue: { summary: "md" } },
    },
    checked: {
      description: "Estado selecionado (controlado).",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    indeterminate: {
      description: "Estado indeterminado (ex.: selecionar todos).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "Desabilita o checkbox (opacidade reduzida).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    style: {
      description: "Estilos inline no wrapper (label).",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    children: "Opção",
    size: "md",
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [checked, setChecked] = useState(Boolean(args.checked));
    const [indeterminate, setIndeterminate] = useState(Boolean(args.indeterminate));
    return (
      <Checkbox
        {...args}
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => {
          if (args.indeterminate !== true) {
            setChecked(e.target.checked);
            setIndeterminate(false);
          }
        }}
      />
    );
  },
  args: {
    children: "Opção",
    size: "md",
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export const WithLabel: Story = {
  render: function WithLabelRender(args) {
    const [checked, setChecked] = useState(Boolean(args.checked));
    return (
      <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    );
  },
  args: {
    children: "Aceito os termos",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: "Selecionado",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: "Selecionar todos",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox disabled>Desmarcado desabilitado</Checkbox>
      <Checkbox disabled checked>
        Marcado desabilitado
      </Checkbox>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
    </div>
  ),
};

function InteractiveCheckboxGroup() {
  const [values, setValues] = useState({ a: false, b: true, all: false });
  const setAll = (checked: boolean) => {
    setValues({ a: checked, b: checked, all: checked });
  };
  const setA = (v: boolean) => {
    const next = { ...values, a: v };
    next.all = next.a && next.b;
    setValues(next);
  };
  const setB = (v: boolean) => {
    const next = { ...values, b: v };
    next.all = next.a && next.b;
    setValues(next);
  };
  const allIndeterminate = values.a !== values.b;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Checkbox
        checked={values.all}
        indeterminate={allIndeterminate}
        onChange={(e) => setAll(e.target.checked)}
      >
        Selecionar todos
      </Checkbox>
      <Checkbox checked={values.a} onChange={(e) => setA(e.target.checked)}>
        Opção A
      </Checkbox>
      <Checkbox checked={values.b} onChange={(e) => setB(e.target.checked)}>
        Opção B
      </Checkbox>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Checkbox (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Checkbox</strong> é um átomo de controlo de seleção para opções binárias
                ou listas. Exibe estados checked, unchecked e indeterminate (ex.: “selecionar
                todos”). Desabilitado usa opacidade reduzida (disabledOpacity). Alinhado às
                guidelines de selection controls.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>children</code> — rótulo opcional do checkbox.
                </li>
                <li>
                  <code>size</code> — sm (18px), md (20px).
                </li>
                <li>
                  <code>checked</code> — estado selecionado (controlado).
                </li>
                <li>
                  <code>indeterminate</code> — estado indeterminado (ex.: selecionar todos).
                </li>
                <li>
                  <code>disabled</code> — desabilita o checkbox.
                </li>
                <li>
                  <code>onChange</code> — callback ao alterar (evento nativo).
                </li>
                <li>
                  <code>style</code> — estilos inline no wrapper (label).
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o Checkbox é usado na coluna de seleção
                de linhas (cabeçalho “selecionar todos” e cada linha) e no popover de colunas
                visíveis para marcar/desmarcar cada coluna.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Checkbox: tamanhos, estados e grupo “selecionar todos”">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa tamanhos (sm, md), estados (unchecked, checked, indeterminate,
            disabled) e um grupo interativo com “selecionar todos”.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <Checkbox size="sm">Small</Checkbox>
              <Checkbox size="md">Medium</Checkbox>
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              <Checkbox onChange={noop}>Unchecked</Checkbox>
              <Checkbox checked onChange={noop}>
                Checked
              </Checkbox>
              <Checkbox indeterminate onChange={noop}>
                Indeterminate
              </Checkbox>
              <Checkbox disabled>Disabled</Checkbox>
              <Checkbox disabled checked>
                Disabled checked
              </Checkbox>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Grupo interativo (clique para alterar):</p>
              <InteractiveCheckboxGroup />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
