import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "@surface/ui/select";
import { StoryCard, StorySection } from "../foundation/shared";

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
    <div className="space-y-8 p-8">
      <StorySection title="Select (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Select</strong> é um dropdown de seleção única. Compound:
                Select.Root, Select.Trigger, Select.Value, Select.Content, Select.Item,
                Select.Label, Select.Separator. O conteúdo abre em portal.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
              <p>
                <strong>Select.Root</strong> com value/onValueChange (controlado) ou
                defaultValue. <strong>Select.Trigger</strong> +{" "}
                <strong>Select.Value</strong> (placeholder).{" "}
                <strong>Select.Content</strong> (portal) com{" "}
                <strong>Select.Item</strong> (value + children).{" "}
                <strong>Select.Label</strong> e <strong>Select.Separator</strong> para
                agrupamento.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Formulários: país, moeda, prioridade, categoria, qualquer escolha única
                numa lista. Para listas longas com busca use o Combobox.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Select: País, Prioridade e Moeda (com grupos opcional)">
          <p className="mb-4 text-sm text-muted-foreground">
            Três selects reais: País (Portugal, Espanha, França), Prioridade (Baixa,
            Média, Alta) e Moeda (EUR, USD, GBP). O último usa Label e Separator para
            agrupar por região.
          </p>
          <div className="flex flex-col gap-6 max-w-[280px]">
            <div>
              <span className="mb-1 block text-sm font-medium" aria-hidden>País</span>
              <Select.Root defaultValue="pt">
                <Select.Trigger>
                  <Select.Value placeholder="Selecione o país" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="pt">Portugal</Select.Item>
                  <Select.Item value="es">Espanha</Select.Item>
                  <Select.Item value="fr">França</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
            <div>
              <span className="mb-1 block text-sm font-medium" aria-hidden>Prioridade</span>
              <Select.Root defaultValue="medium">
                <Select.Trigger>
                  <Select.Value placeholder="Prioridade" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="low">Baixa</Select.Item>
                  <Select.Item value="medium">Média</Select.Item>
                  <Select.Item value="high">Alta</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
            <div>
              <span className="mb-1 block text-sm font-medium" aria-hidden>Moeda</span>
              <Select.Root defaultValue="eur">
                <Select.Trigger>
                  <Select.Value placeholder="Moeda" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Label>Europa</Select.Label>
                  <Select.Item value="eur">EUR (Euro)</Select.Item>
                  <Select.Item value="gbp">GBP (Libra)</Select.Item>
                  <Select.Separator />
                  <Select.Label>Américas</Select.Label>
                  <Select.Item value="usd">USD (Dólar)</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
