import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@surface/ui/progress";
import type { ProgressSize, ProgressStatus } from "@surface/ui/progress";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Progress> = {
  title: "Components/Atoms/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Barra de progresso linear. percent (0–100), indeterminado se omitido. size, status, showInfo. Tokens: motion, color.",
      },
    },
  },
  argTypes: {
    percent: {
      description: "Percentual 0–100. Omitir = indeterminado.",
      control: { type: "number", min: 0, max: 100 },
      table: { type: { summary: "number" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"] as ProgressSize[],
      table: { type: { summary: "ProgressSize" }, defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: ["normal", "success", "exception"] as ProgressStatus[],
      table: { type: { summary: "ProgressStatus" }, defaultValue: { summary: "normal" } },
    },
    showInfo: {
      description: "Mostra percentual ao lado.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    percent: 45,
    size: "md",
    status: "normal",
    showInfo: false,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    percent: 45,
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithInfo: Story = {
  args: {
    percent: 70,
    showInfo: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Indeterminate: Story = {
  args: {
    percent: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Progress percent={30} size="sm" />
      <Progress percent={50} size="md" />
      <Progress percent={80} size="lg" />
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Progress percent={40} status="normal" showInfo />
      <Progress percent={100} status="success" showInfo />
      <Progress percent={60} status="exception" showInfo />
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Progress.Root percent={55} size="md" status="normal">
        <Progress.Bar />
        <Progress.Info />
      </Progress.Root>
      <Progress.Root percent={undefined} size="lg">
        <Progress.Bar />
      </Progress.Root>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Progress (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Progress</strong> é uma barra de progresso linear. Exibe um
                percentual entre 0 e 100 ou fica indeterminada (animação) quando{" "}
                <code>percent</code> é omitido. Usa tokens de motion e cor.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>percent</code> — valor 0–100; omitir = barra indeterminada.
                </li>
                <li>
                  <code>size</code> — sm, md, lg (altura da barra).
                </li>
                <li>
                  <code>status</code> — normal, success, exception (cor da barra).
                </li>
                <li>
                  <code>showInfo</code> — mostra o percentual ao lado da barra.
                </li>
                <li>
                  Modo compound: <code>Progress.Root</code> + <code>Progress.Bar</code> +{" "}
                  <code>Progress.Info</code>.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em cards de tarefa, upload de ficheiros, passos de wizard e listas com
                estado de carregamento. Combine com <strong>Text</strong> e{" "}
                <strong>Card</strong> para contextos ricos.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Progress: upload, tarefa, sucesso, erro e indeterminado">
          <p className="mb-4 text-sm text-muted-foreground">
            Cenários reais: upload de ficheiro com nome e percentual, tarefa em progresso,
            conclusão (100% success), falha (exception) e barra indeterminada.
          </p>
          <div className="flex flex-col gap-8 max-w-[400px]">
            <div className="space-y-2">
              <Text variant="labelSmall" tone="muted">
                relatório-2024.pdf
              </Text>
              <Progress percent={72} size="sm" showInfo />
            </div>
            <div className="space-y-2">
              <Text variant="labelSmall" tone="muted">
                Tarefa em progresso
              </Text>
              <Progress percent={65} size="md" status="normal" showInfo />
            </div>
            <div className="space-y-2">
              <Text variant="labelSmall" tone="muted">
                Concluído
              </Text>
              <Progress percent={100} size="md" status="success" showInfo />
            </div>
            <div className="space-y-2">
              <Text variant="labelSmall" tone="muted">
                Falha no envio
              </Text>
              <Progress percent={60} size="md" status="exception" showInfo />
            </div>
            <div className="space-y-2">
              <Text variant="labelSmall" tone="muted">
                A carregar…
              </Text>
              <Progress percent={undefined} size="md" />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
