import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@surface/ui/chip";
import type { ChipVariant, ChipSize } from "@surface/ui/chip";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Chip> = {
  title: "Components/Atoms/Chip",
  component: Chip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pílula para filtros, seleção ou categorias. Usa componentShapeTokens.chip (full). Variantes de cor e onRemove opcional.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Conteúdo do chip.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      description: "Variante de cor.",
      control: "select",
      options: ["default", "primary", "success", "warning", "error"] as ChipVariant[],
      table: { type: { summary: "ChipVariant" }, defaultValue: { summary: "default" } },
    },
    size: {
      description: "Tamanho: sm, md.",
      control: "select",
      options: ["sm", "md"] as ChipSize[],
      table: { type: { summary: "ChipSize" }, defaultValue: { summary: "md" } },
    },
    selected: {
      description: "Destaca como selecionado.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    onRemove: {
      description: "Se definido, exibe botão de remover.",
      table: { type: { summary: "() => void" } },
      control: false,
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    children: "Chip",
    variant: "default",
    size: "md",
    selected: false,
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "Chip",
    variant: "default",
    size: "md",
    selected: false,
  },
};

export const WithRemove: Story = {
  args: {
    children: "Removível",
    onRemove: () => {},
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Chip (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Chip</strong> é uma pílula para filtros, tags, categorias ou
                seleção múltipla. Forma pill (rounded-full), variantes de cor e
                onRemove opcional para chip removível. Usa tokens de borda e cor.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>variant</code> — default, primary, success, warning, error.
                </li>
                <li>
                  <code>size</code> — sm, md.
                </li>
                <li>
                  <code>selected</code> — destaca como selecionado (primary).
                </li>
                <li>
                  <code>onRemove</code> — se definido, exibe botão de remover.
                </li>
                <li>
                  <code>children</code> — conteúdo do chip.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Filtros de listagem, tags de categorias, seleção múltipla em
                formulários e qualquer contexto de escolhas em formato compacto.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Chip: variantes, selecionado e removível">
          <p className="mb-4 text-sm text-muted-foreground">
            Tags para categorias, chip selecionado e chip removível (onRemove).
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip variant="default">React</Chip>
            <Chip variant="primary">TypeScript</Chip>
            <Chip variant="primary" selected>
              Selecionado
            </Chip>
            <Chip variant="success">Aprovado</Chip>
            <Chip variant="warning">Pendente</Chip>
            <Chip variant="error">Erro</Chip>
            <Chip onRemove={() => {}}>Removível</Chip>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
