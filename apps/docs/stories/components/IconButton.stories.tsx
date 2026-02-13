import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@surface/ui/icon-button";
import type { IconButtonVariant, IconButtonSize } from "@surface/ui/icon-button";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

function IconMock({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <title>Ícone</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

const meta: Meta<typeof IconButton> = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Botão apenas com ícone. Mesmas variantes do Button: default, primary, destructive, outline, secondary, ghost, link. Tamanhos: sm 32px, default/md 40px, lg 48px. Requer aria-label.",
      },
    },
  },
  argTypes: {
    icon: {
      description: "Ícone (SVG ou elemento).",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
    "aria-label": {
      description: "Label acessível (obrigatório).",
      control: "text",
      table: { type: { summary: "string" } },
    },
    variant: {
      description: "Variante visual (alinhada ao Button).",
      control: "select",
      options: [
        "default",
        "primary",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ] as IconButtonVariant[],
      table: { type: { summary: "IconButtonVariant" }, defaultValue: { summary: "default" } },
    },
    size: {
      description: "Tamanho da área clicável: sm 32px, default/md 40px, lg 48px.",
      control: "select",
      options: ["default", "sm", "md", "lg"] as IconButtonSize[],
      table: { type: { summary: "IconButtonSize" }, defaultValue: { summary: "default" } },
    },
    disabled: {
      description: "Desabilita o botão.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    type: {
      description: "Tipo nativo do botão.",
      control: "select",
      options: ["button", "submit", "reset"],
      table: { type: { summary: "string" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    icon: null,
    "aria-label": "Abrir menu",
    variant: "default",
    size: "default",
    disabled: false,
    type: "button",
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => (
    <IconButton
      {...args}
      icon={
        <IconMock
          size={
            args.size === "sm"
              ? 18
              : args.size === "lg"
                ? 24
                : 22
          }
        />
      }
    />
  ),
  args: {
    "aria-label": "Abrir menu",
    variant: "default",
    size: "default",
    disabled: false,
    type: "button",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <IconButton icon={<IconMock />} aria-label="Default" variant="default" />
      <IconButton icon={<IconMock />} aria-label="Primary" variant="primary" />
      <IconButton icon={<IconMock />} aria-label="Destructive" variant="destructive" />
      <IconButton icon={<IconMock />} aria-label="Outline" variant="outline" />
      <IconButton icon={<IconMock />} aria-label="Secondary" variant="secondary" />
      <IconButton icon={<IconMock />} aria-label="Ghost" variant="ghost" />
      <IconButton icon={<IconMock />} aria-label="Link" variant="link" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton icon={<IconMock size={18} />} aria-label="Small" size="sm" />
      <IconButton icon={<IconMock size={22} />} aria-label="Default" size="default" />
      <IconButton icon={<IconMock size={22} />} aria-label="Medium" size="md" />
      <IconButton icon={<IconMock size={24} />} aria-label="Large" size="lg" />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="IconButton (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px" }}>
              Botão só com ícone. Sempre forneça <code>aria-label</code> para acessibilidade.
              Variantes e tamanhos alinhados ao Button.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <IconButton icon={<IconMock />} aria-label="Default" variant="default" />
              <IconButton icon={<IconMock />} aria-label="Destructive" variant="destructive" />
              <IconButton icon={<IconMock />} aria-label="Outline" variant="outline" />
              <IconButton icon={<IconMock />} aria-label="Disabled" disabled />
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
