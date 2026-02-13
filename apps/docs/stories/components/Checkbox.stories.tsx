import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "@surface/ui/checkbox";
import type { CheckboxSize } from "@surface/ui/checkbox";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

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
    <StorySection title="Checkbox (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Selection controls: estado selecionado/não selecionado visível; uso para opções
              binárias ou listas. Indeterminate para “selecionar todos”. Disabled com opacidade
              reduzida (disabledOpacity).
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos (clique para alterar)">
            <InteractiveCheckboxGroup />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
