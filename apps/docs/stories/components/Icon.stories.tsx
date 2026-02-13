import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@surface/ui/icon";
import type { IconSize } from "@surface/ui/icon";
import { lightColorScheme } from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

/** Placeholder SVG (stroke) – em produção use Lucide/Phosphor. */
function PlaceholderIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

const meta: Meta<typeof Icon> = {
  title: "Components/Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Átomo presentacional para exibir um ícone (SVG/ReactNode) com tamanho e cor padronizados. Tamanhos conforme iconSizeRecommendations (16/20/24px). Ícones decorativos: aria-hidden; informativos: ariaLabel.",
      },
    },
  },
  argTypes: {
    size: {
      description: "sm 16px, md 20px, large 24px.",
      control: "select",
      options: ["sm", "md", "large"] as IconSize[],
      table: { type: { summary: "IconSize" }, defaultValue: { summary: "md" } },
    },
    ariaHidden: {
      description: "true para ícones decorativos.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    ariaLabel: {
      description: "Texto para leitores de tela quando o ícone é informativo.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
  args: {
    size: "md",
    ariaHidden: true,
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => (
    <Icon {...args}>
      <PlaceholderIcon size={24} />
    </Icon>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Icon size="sm">
        <PlaceholderIcon size={16} />
      </Icon>
      <Icon size="md">
        <PlaceholderIcon size={20} />
      </Icon>
      <Icon size="large">
        <PlaceholderIcon size={24} />
      </Icon>
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Icon color={lightColorScheme.onSurface} size="large">
        <PlaceholderIcon size={24} />
      </Icon>
      <Icon color={lightColorScheme.primary} size="large">
        <PlaceholderIcon size={24} />
      </Icon>
      <Icon color={lightColorScheme.error} size="large">
        <PlaceholderIcon size={24} />
      </Icon>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ margin: 0, fontSize: 14 }}>
        Decorativo (aria-hidden): <Icon ariaHidden><PlaceholderIcon size={20} /></Icon>
      </p>
      <p style={{ margin: 0, fontSize: 14 }}>
        Informativo (aria-label):{" "}
        <Icon ariaHidden={false} ariaLabel="Relógio">
          <PlaceholderIcon size={20} />
        </Icon>
      </p>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Icon (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              iconSizeRecommendations: small 16px (inline com texto), medium 20px (botões,
              chips), large 24px (app bar, icon buttons). Ícones decorativos: aria-hidden.
              Ícones que comunicam informação: role="img" e aria-label.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Icon size="sm">
                <PlaceholderIcon size={16} />
              </Icon>
              <Icon size="md" color={lightColorScheme.primary}>
                <PlaceholderIcon size={20} />
              </Icon>
              <Icon size="large">
                <PlaceholderIcon size={24} />
              </Icon>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
