import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@surface/ui/spinner";
import type { SpinnerSize } from "@surface/ui/spinner";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Spinner> = {
  title: "Components/Atoms/Spinner",
  component: Spinner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Indicador de carregamento (círculo girando). API alinhada ao Spin do Ant Design: size (sm/md/lg), spinning, tip. Usa motionTokens.",
      },
    },
  },
  argTypes: {
    size: {
      description: "Tamanho: sm (20px), md (28px), lg (36px). Equivalente ao size do Spin (small/default/large).",
      control: "select",
      options: ["sm", "md", "lg"] as SpinnerSize[],
      table: { type: { summary: "SpinnerSize" }, defaultValue: { summary: "md" } },
    },
    variant: {
      description: "Cor: primary ou default (outline).",
      control: "select",
      options: ["primary", "default"],
      table: { type: { summary: "string" }, defaultValue: { summary: "primary" } },
    },
    spinning: {
      description: "Se true, o indicador gira; se false, fica estático (como Spin do Ant Design).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    tip: {
      description: "Texto ou conteúdo abaixo do indicador (como description do Spin).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    delay: {
      description: "Atraso em ms antes de exibir (evita flash). Padrão: motionTokens.duration.short4 (200ms).",
      control: { type: "number", min: 0 },
      table: { type: { summary: "number" }, defaultValue: { summary: "200 (short4)" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    size: "md",
    variant: "primary",
    spinning: true,
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "primary",
    spinning: true,
  },
};

export const WithTip: Story = {
  args: {
    tip: "Carregando...",
    size: "md",
  },
};

export const Static: Story = {
  args: {
    spinning: false,
    tip: "Spinning desligado",
  },
};

export const WithDelay: Story = {
  args: {
    delay: 800,
    tip: "Aparece após 800 ms",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner variant="primary" />
      <Spinner variant="default" />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Spinner (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Spinner</strong> é um átomo que exibe um indicador de carregamento
                (círculo animado). API alinhada ao Spin do Ant Design: tamanhos sm/md/lg, variante
                de cor (primary ou default), spinning (ligado/desligado) e tip (texto abaixo). Usa
                motionTokens para a animação.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>size</code> — sm (20px), md (28px), lg (36px).
                </li>
                <li>
                  <code>variant</code> — primary ou default (outline).
                </li>
                <li>
                  <code>spinning</code> — se true, o indicador gira; se false, fica estático.
                </li>
                <li>
                  <code>tip</code> — texto ou conteúdo abaixo do indicador.
                </li>
                <li>
                  <code>delay</code> — atraso em ms antes de exibir (evita flash).
                </li>
                <li>
                  <code>style</code> — estilos inline.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o Spinner é exibido no corpo da tabela
                quando a prop <code>loading</code> é true, indicando que os dados estão a
                carregar.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Spinner: tamanhos, variantes, tip e estado estático">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa tamanhos (sm, md, lg), variantes (primary, default), tip e
            spinning=false (estático).
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-6 items-center">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              <Spinner variant="primary" />
              <Spinner variant="default" />
            </div>
            <div>
              <Spinner tip="Carregando..." size="md" />
            </div>
            <div>
              <Spinner spinning={false} tip="Spinning desligado" />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
