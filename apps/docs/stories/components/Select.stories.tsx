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
    <div className="w-full max-w-[260px] space-y-2">
      <span className="block text-sm font-medium" aria-hidden>Categoria</span>
      <Select.Root defaultValue="eletronica">
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Escolha uma categoria" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="eletronica">Eletrónica</Select.Item>
          <Select.Item value="vestuario">Vestuário</Select.Item>
          <Select.Item value="alimentacao">Alimentação</Select.Item>
          <Select.Item value="livros">Livros</Select.Item>
          <Select.Item value="casa">Casa e jardim</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState<string | undefined>("medium");
    return (
      <div className="w-full max-w-[260px] space-y-2">
        <span className="block text-sm font-medium" aria-hidden>Prioridade</span>
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger className="w-full">
            <Select.Value placeholder="Selecione a prioridade" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="low">Baixa</Select.Item>
            <Select.Item value="medium">Média</Select.Item>
            <Select.Item value="high">Alta</Select.Item>
            <Select.Item value="urgent">Urgente</Select.Item>
          </Select.Content>
        </Select.Root>
        <p className="text-sm text-muted-foreground">Valor actual: {value ?? "—"}</p>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <div className="w-full max-w-[260px] space-y-2">
      <span className="block text-sm font-medium" aria-hidden>Moeda</span>
      <Select.Root defaultValue="eur">
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Selecione a moeda" />
        </Select.Trigger>
        <Select.Content>
          <Select.Label>Europa</Select.Label>
          <Select.Item value="eur">Euro (EUR)</Select.Item>
          <Select.Item value="gbp">Libra (GBP)</Select.Item>
          <Select.Item value="chf">Franco suíço (CHF)</Select.Item>
          <Select.Separator />
          <Select.Label>Américas</Select.Label>
          <Select.Item value="usd">Dólar (USD)</Select.Item>
          <Select.Item value="brl">Real (BRL)</Select.Item>
          <Select.Separator />
          <Select.Label>Ásia</Select.Label>
          <Select.Item value="jpy">Iene (JPY)</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const SizeSm: Story = {
  render: () => (
    <div className="w-full max-w-[260px] space-y-2">
      <span className="block text-sm font-medium" aria-hidden>Tamanho (sm)</span>
      <Select.Root size="sm" defaultValue="s">
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Tamanho" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="s">S</Select.Item>
          <Select.Item value="m">M</Select.Item>
          <Select.Item value="l">L</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-[260px] space-y-2">
      <span className="block text-sm font-medium" aria-hidden>Estado</span>
      <Select.Root disabled defaultValue="draft">
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Estado" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="draft">Rascunho</Select.Item>
          <Select.Item value="published">Publicado</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

function OverviewFormDemo() {
  const [country, setCountry] = useState("pt");
  const [priority, setPriority] = useState("medium");
  const [currency, setCurrency] = useState("eur");
  return (
    <div className="w-full max-w-md space-y-5 rounded-lg border border-border bg-card p-6">
      <h3 className="text-sm font-semibold text-foreground">Configuração</h3>
      <div className="flex flex-col gap-4">
        <div>
          <span className="mb-1.5 block text-sm font-medium" aria-hidden>País</span>
          <Select.Root value={country} onValueChange={setCountry}>
            <Select.Trigger className="w-full">
              <Select.Value placeholder="Selecione o país" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="pt">Portugal</Select.Item>
              <Select.Item value="es">Espanha</Select.Item>
              <Select.Item value="fr">França</Select.Item>
              <Select.Item value="de">Alemanha</Select.Item>
              <Select.Item value="it">Itália</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-medium" aria-hidden>Prioridade</span>
          <Select.Root value={priority} onValueChange={setPriority}>
            <Select.Trigger className="w-full">
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
          <span className="mb-1.5 block text-sm font-medium" aria-hidden>Moeda</span>
          <Select.Root value={currency} onValueChange={setCurrency}>
            <Select.Trigger className="w-full">
              <Select.Value placeholder="Moeda" />
            </Select.Trigger>
            <Select.Content>
              <Select.Label>Europa</Select.Label>
              <Select.Item value="eur">Euro (EUR)</Select.Item>
              <Select.Item value="gbp">Libra (GBP)</Select.Item>
              <Select.Separator />
              <Select.Label>Outras</Select.Label>
              <Select.Item value="usd">Dólar (USD)</Select.Item>
              <Select.Item value="brl">Real (BRL)</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <div className="border-t border-border pt-4 text-sm text-muted-foreground">
        País={country} · Prioridade={priority} · Moeda={currency}
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Select (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Select</strong> é um dropdown de seleção única (compound component).
                Composição: Select.Root, Select.Trigger, Select.Value, Select.Content, Select.Item;
                opcionalmente Select.Label e Select.Separator para agrupar itens. O conteúdo abre em
                portal (body). Sem bordas arredondadas, alinhado ao design system.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (componentes)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li><code>Select.Root</code> — value / defaultValue, onValueChange, disabled, size (sm | default).</li>
                <li><code>Select.Trigger</code> — botão que abre o dropdown; use className para largura (ex.: w-full).</li>
                <li><code>Select.Value</code> — placeholder e valor exibido.</li>
                <li><code>Select.Content</code> — lista em portal; posição calculada pelo trigger.</li>
                <li><code>Select.Item</code> — value (string) + children (label visível).</li>
                <li><code>Select.Label</code> / <code>Select.Separator</code> — agrupamento visual.</li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Formulários: país, moeda, prioridade, categoria, tamanho, estado — qualquer
                escolha única numa lista curta. Para listas longas com busca use o <strong>Combobox</strong>.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo: um único select">
        <StoryCard title="Categoria com várias opções">
          <p className="mb-4 text-sm text-muted-foreground">
            Select com label e trigger em largura total.
          </p>
          <div className="w-full max-w-[260px] space-y-2">
            <span className="block text-sm font-medium" aria-hidden>Categoria</span>
            <Select.Root defaultValue="eletronica">
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Escolha uma categoria" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="eletronica">Eletrónica</Select.Item>
                <Select.Item value="vestuario">Vestuário</Select.Item>
                <Select.Item value="alimentacao">Alimentação</Select.Item>
                <Select.Item value="livros">Livros</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo: formulário com vários selects">
        <StoryCard title="País, Prioridade e Moeda (com grupos)">
          <p className="mb-4 text-sm text-muted-foreground">
            Três selects controlados no mesmo bloco; o de moeda usa Label e Separator. Valores em baixo.
          </p>
          <OverviewFormDemo />
        </StoryCard>
      </StorySection>
    </div>
  ),
};
