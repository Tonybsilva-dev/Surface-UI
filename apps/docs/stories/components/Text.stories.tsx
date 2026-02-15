import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@surface/ui/text";
import type { TextVariant, TextTone, TextAs } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

const variants: TextVariant[] = [
  "displayLarge",
  "displayMedium",
  "displaySmall",
  "headlineLarge",
  "headlineMedium",
  "headlineSmall",
  "titleLarge",
  "titleMedium",
  "titleSmall",
  "bodyLarge",
  "bodyMedium",
  "bodySmall",
  "labelLarge",
  "labelMedium",
  "labelSmall",
];

const meta: Meta<typeof Text> = {
  title: "Components/Atoms/Text",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Átomo de tipografia. Aplica a type scale (Display, Headline, Title, Body, Label) e tons de cor das guidelines. Use para hierarquia visual e contraste acessível.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Conteúdo do texto.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      description:
        "Variante da type scale: Display (hero), Headline (seções), Title (componentes), Body (corpo), Label (rótulos).",
      control: "select",
      options: variants,
      table: { type: { summary: "TextVariant" }, defaultValue: { summary: "bodyMedium" } },
    },
    tone: {
      description: "Tom de cor: default (principal), muted (secundário), primary, error, inverse.",
      control: "select",
      options: ["default", "muted", "primary", "error", "inverse"] as TextTone[],
      table: { type: { summary: "TextTone" }, defaultValue: { summary: "default" } },
    },
    as: {
      description: "Elemento HTML (semântica). span (padrão), p, div, h1–h6.",
      control: "select",
      options: ["span", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6"] as TextAs[],
      table: { type: { summary: "TextAs" }, defaultValue: { summary: "span" } },
    },
    truncate: {
      description: "Se true, aplica ellipsis em uma linha quando transborda.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    align: {
      description: "Alinhamento do texto.",
      control: "select",
      options: ["start", "center", "end"],
      table: { type: { summary: "textAlign" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    variant: "bodyMedium",
    tone: "default",
    as: "span",
    truncate: false,
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    variant: "bodyMedium",
    tone: "default",
    as: "span",
    truncate: false,
  },
};

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text variant="displaySmall">Display Small</Text>
      <Text variant="headlineSmall">Headline Small</Text>
      <Text variant="titleMedium">Title Medium</Text>
      <Text variant="bodyLarge">Body Large – texto de leitura principal.</Text>
      <Text variant="bodyMedium">Body Medium – padrão para parágrafos.</Text>
      <Text variant="labelLarge">Label Large</Text>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text variant="bodyMedium" tone="default">
        Default (onSurface)
      </Text>
      <Text variant="bodyMedium" tone="muted">
        Muted (onSurfaceVariant)
      </Text>
      <Text variant="bodyMedium" tone="primary">
        Primary
      </Text>
      <Text variant="bodyMedium" tone="error">
        Error
      </Text>
      <Text variant="bodyMedium" tone="inverse" style={{ backgroundColor: "#262626", padding: 8 }}>
        Inverse (sobre fundo escuro)
      </Text>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text as="h1" variant="headlineLarge">
        Heading 1
      </Text>
      <Text as="h2" variant="titleLarge">
        Heading 2
      </Text>
      <Text as="p" variant="bodyMedium">
        Parágrafo com <Text as="span" tone="primary">ênfase</Text> no meio.
      </Text>
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ maxWidth: 200 }}>
      <Text variant="bodyMedium" truncate>
        Este texto será truncado com ellipsis quando não couber na largura.
      </Text>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Text (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Text</strong> é um átomo de tipografia que aplica a type scale do design
                system (Display, Headline, Title, Body, Label), cada um com variantes large,
                medium e small. Garante hierarquia visual e contraste acessível através de
                variantes e tons de cor.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>children</code> — conteúdo do texto.
                </li>
                <li>
                  <code>variant</code> — variante da type scale (Display, Headline, Title, Body,
                  Label com large/medium/small).
                </li>
                <li>
                  <code>tone</code> — tom de cor: default, muted, primary, error, inverse.
                </li>
                <li>
                  <code>as</code> — elemento HTML (span, p, div, h1–h6) para semântica.
                </li>
                <li>
                  <code>truncate</code> — se true, aplica ellipsis quando transborda numa linha.
                </li>
                <li>
                  <code>align</code> — alinhamento (start, center, end).
                </li>
                <li>
                  <code>style</code> — estilos inline.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o Text é usado nas células para exibir
                nome, email e outros campos (ex.: bodyMedium para nomes, bodySmall tone muted para
                emails), garantindo tipografia consistente em toda a tabela.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Text: variantes, tons e semântica">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa variantes da type scale (Display, Headline, Title, Body, Label),
            tons (default, muted, primary, error), elemento semântico (as) e truncate.
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <Text variant="displaySmall" className="block mb-2">
                Display Small
              </Text>
              <Text variant="headlineSmall" className="block mb-2">
                Headline Small
              </Text>
              <Text variant="titleMedium" className="block mb-2">
                Title Medium – títulos de componentes
              </Text>
              <Text variant="bodyLarge" className="block mb-2">
                Body Large – texto de leitura principal.
              </Text>
              <Text variant="bodyMedium" className="block mb-2">
                Body Medium – padrão para parágrafos.
              </Text>
              <Text variant="labelLarge">Label Large</Text>
            </div>
            <div className="flex flex-col gap-2">
              <Text variant="bodyMedium" tone="default">
                Tom default
              </Text>
              <Text variant="bodyMedium" tone="muted">
                Tom muted (suporte)
              </Text>
              <Text variant="bodyMedium" tone="primary">
                Tom primary
              </Text>
              <Text variant="bodyMedium" tone="error">
                Tom error
              </Text>
            </div>
            <div>
              <Text as="h2" variant="titleLarge" className="block mb-2">
                Semântica (as)
              </Text>
              <Text as="p" variant="bodyMedium">
                Parágrafo com <Text as="span" tone="primary">ênfase</Text> no meio.
              </Text>
            </div>
            <div className="max-w-[200px]">
              <Text variant="bodySmall" truncate>
                Este texto será truncado com ellipsis quando não couber na largura.
              </Text>
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
