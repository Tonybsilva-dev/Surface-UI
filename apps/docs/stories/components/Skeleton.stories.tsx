import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@surface/ui/skeleton";
import type { SkeletonVariant } from "@surface/ui/skeleton";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Atoms/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Placeholder de carregamento com animação de pulse. Variantes rectangular, circular e text. Usa motionTokens.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Forma: rectangular, circular, text.",
      control: "select",
      options: ["rectangular", "circular", "text"] as SkeletonVariant[],
      table: { type: { summary: "SkeletonVariant" }, defaultValue: { summary: "rectangular" } },
    },
    width: {
      description: "Largura (ex.: 200, '100%').",
      control: "text",
      table: { type: { summary: "string | number" } },
    },
    height: {
      description: "Altura (ex.: 20, '1em' para text).",
      control: "text",
      table: { type: { summary: "string | number" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    variant: "rectangular",
    width: 200,
    height: 20,
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 20,
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 40,
    height: 40,
  },
};

export const Text: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Skeleton variant="text" width="100%" height={24} style={{ marginBottom: 8 }} />
      <Skeleton variant="text" width="90%" height={16} style={{ marginBottom: 8 }} />
      <Skeleton variant="text" width="70%" height={16} />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Skeleton (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Skeleton</strong> é um placeholder animado (pulse) para indicar
                conteúdo em carregamento. Reduz a perceção de espera e mantém o layout
                estável. Usa motionTokens para duração e easing.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>variant</code> — rectangular, circular, text.
                </li>
                <li>
                  <code>width</code> / <code>height</code> — dimensões (número ou string,
                  ex.: 200, &quot;100%&quot;, &quot;1em&quot; para text).
                </li>
                <li>
                  <code>style</code> — estilos inline.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em cards de utilizador, listas de itens, tabelas e páginas que carregam
                dados. Combine variantes (circular para avatar, text para linhas,
                rectangular para botões ou imagens).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Skeleton: card de loading (avatar + linhas + botão)">
          <p className="mb-4 text-sm text-muted-foreground">
            Simulação de um card de perfil em carregamento: avatar circular, duas linhas
            de texto e um botão retangular.
          </p>
          <div className="max-w-[280px] rounded-xl border border-border p-4">
            <div className="flex items-start gap-3">
              <Skeleton variant="circular" width={48} height={48} className="shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={16} />
              </div>
            </div>
            <div className="mt-4">
              <Skeleton variant="rectangular" width={120} height={36} className="rounded-md" />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
