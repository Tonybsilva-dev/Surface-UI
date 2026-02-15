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
    <div className="space-y-8 p-8">
      <StorySection title="Button (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Button</strong> é um átomo para ações primárias e secundárias. Usa tokens
                de cor, tipografia (typographyTokens.label.large) e shape
                (componentShapeTokens.button). Suporta variantes visuais e tamanhos (sm, default,
                lg, icon).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>children</code> — texto ou conteúdo do botão.
                </li>
                <li>
                  <code>variant</code> — default, destructive, outline, secondary, ghost, link.
                </li>
                <li>
                  <code>size</code> — default, sm, lg, icon (quadrado).
                </li>
                <li>
                  <code>disabled</code> — desabilita o botão (opacidade reduzida).
                </li>
                <li>
                  <code>type</code> — tipo nativo (button, submit, reset).
                </li>
                <li>
                  <code>fullWidth</code> — se true, ocupa 100% da largura.
                </li>
                <li>
                  <code>leadingIcon</code> / <code>trailingIcon</code> — ícone antes/depois do
                  texto.
                </li>
                <li>
                  <code>asChild</code> — se true, renderiza o filho único com o estilo do botão.
                </li>
                <li>
                  <code>style</code> — estilos inline.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o Button é usado na toolbar como trigger
                “Personalizar colunas” (variante button com texto + chevron) e em botões de ação
                (ex.: “Ver mais”).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Button: variantes, tamanhos, ícones e estados">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa variantes (default, destructive, outline, secondary, ghost, link),
            tamanhos (sm, default, lg, icon), leadingIcon, disabled e asChild.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" leadingIcon={<span aria-hidden>→</span>} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled outline
              </Button>
            </div>
            <div>
              <Button asChild variant="outline">
                <a href="#overview">Link estilizado como botão (asChild)</a>
              </Button>
            </div>
          </div>
        </StoryCard>
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

