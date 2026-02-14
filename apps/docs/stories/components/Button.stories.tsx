import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@surface/ui/button";
import type { ButtonVariant, ButtonSize } from "@surface/ui/button";
import {
  lightColorScheme,
  typographyTokens,
  componentShapeTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Primeiro átomo: Button. Usa tokens de cor, tipografia, shape e estados para ações primárias, secundárias e ghost.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Texto ou conteúdo do botão.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    variant: {
      description:
        "Variante visual: default, destructive, outline, secondary, ghost, link.",
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ] as ButtonVariant[],
      table: {
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "Tamanho: default, sm, lg, icon (quadrado).",
      control: "select",
      options: ["default", "sm", "lg", "icon"] as ButtonSize[],
      table: {
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      description: "Desabilita o botão (opacidade reduzida, sem interação).",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    type: {
      description: "Tipo nativo do botão.",
      control: "select",
      options: ["button", "submit", "reset"],
      table: {
        type: { summary: "string" },
      },
    },
    fullWidth: {
      description: "Se true, o botão ocupa 100% da largura disponível.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    leadingIcon: {
      description: "Ícone ou elemento exibido antes do texto.",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
    trailingIcon: {
      description: "Ícone ou elemento exibido depois do texto.",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
    style: {
      description: "Estilos inline (sobrescrevem os do componente).",
      control: "object",
      table: {
        type: { summary: "CSSProperties" },
      },
    },
    asChild: {
      description:
        "Se true, renderiza o filho único com o estilo do botão (como Slot).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    children: "Hello",
    variant: "default",
    size: "default",
    fullWidth: false,
    disabled: false,
    type: "button",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/** Use esta story para testar todas as props no painel Controls. */
export const Default: Story = {
  args: {
    children: "Hello",
    variant: "default",
    size: "default",
    fullWidth: false,
    disabled: false,
    type: "button",
  },
};

/** Com asChild, o filho único (ex.: <a>) recebe o estilo do botão. */
export const AsChild: Story = {
  render: () => (
    <Button asChild variant="outline">
      <a href="#as-child">Link estilizado como botão</a>
    </Button>
  ),
};

const typo = {
  fontFamily: typographyTokens.fontFamily.default,
  body: 14,
  muted: "#666",
};

export const Overview: Story = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Button (overview)">
        <TwoColumn
          left={
            <StoryCard title="Papel do botão">
              <p style={{ margin: "0 0 12px" }}>
                Botões disparam ações primárias e secundárias. Eles usam:
              </p>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
                <li style={{ marginBottom: 4 }}>Cor: primary / onPrimary / surface / outline.</li>
                <li style={{ marginBottom: 4 }}>Tipografia: `typographyTokens.label.large`.</li>
                <li style={{ marginBottom: 4 }}>Shape: `componentShapeTokens.button` (raio 6px).</li>
                <li style={{ marginBottom: 4 }}>Estados: disabled com `disabledOpacity`.</li>
              </ul>
              <p style={{ margin: 0, fontSize: 13, color: typo.muted }}>
                Variantes: <code>default</code>, <code>destructive</code>, <code>outline</code>,{" "}
                <code>secondary</code>, <code>ghost</code>, <code>link</code>. Tamanhos:{" "}
                <code>default</code>, <code>sm</code>, <code>lg</code>, <code>icon</code>.
              </p>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplos">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Button>Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon" leadingIcon={<span aria-hidden>→</span>} />
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Disabled outline
                  </Button>
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const VisualTokens: Story = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Tokens aplicados">
        <TwoColumn
          left={
            <StoryCard title="Shape e tipografia">
              <p style={{ margin: "0 0 12px" }}>
                O botão usa o radius de <code>componentShapeTokens.button</code> e o estilo tipográfico de{" "}
                <code>typographyTokens.label.large</code>.
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
                <li>
                  <code>border-radius</code>: {componentShapeTokens.button}
                </li>
                <li>
                  <code>font-size</code>: {typographyTokens.label.large.fontSize}
                </li>
                <li>
                  <code>line-height</code>: {typographyTokens.label.large.lineHeight}
                </li>
                <li>
                  <code>font-weight</code>: {typographyTokens.label.large.fontWeight}
                </li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Cores em uso">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Swatch name="primary" value={lightColorScheme.primary} />
                  <Swatch name="onPrimary" value={lightColorScheme.onPrimary} />
                  <Swatch name="surface" value={lightColorScheme.surface} />
                  <Swatch name="outline" value={lightColorScheme.outline} />
                </div>
                <div style={{ fontSize: 11, color: typo.muted }}>
                  Primary button: fundo <code>primary</code>, texto <code>onPrimary</code>. Secondary: fundo{" "}
                  <code>surface</code>, borda <code>outline</code>, texto <code>primary</code>.
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 32,
          height: 24,
          borderRadius: 6,
          backgroundColor: value,
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      />
      <div style={{ fontSize: 11 }}>
        <div style={{ color: typo.muted }}>{name}</div>
        <code>{value}</code>
      </div>
    </div>
  );
}

