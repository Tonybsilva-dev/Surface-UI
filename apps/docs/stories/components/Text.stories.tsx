import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@surface/ui/text";
import type { TextVariant, TextTone, TextAs } from "@surface/ui/text";
import { typographyTokens } from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

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
    <StorySection title="Text (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines – Type scale">
            <p style={{ fontFamily: typographyTokens.fontFamily.default, fontSize: 14, margin: "0 0 12px" }}>
              Display (hero), Headline (seções), Title (componentes), Body (corpo), Label (botões,
              chips). Cada um com large/medium/small. Contraste e hierarquia conforme foundation.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text variant="titleMedium">Título de card</Text>
              <Text variant="bodyMedium" tone="default">
                Corpo de texto principal.
              </Text>
              <Text variant="bodySmall" tone="muted">
                Texto de suporte ou hint.
              </Text>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
