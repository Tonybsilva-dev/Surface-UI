import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "@surface/ui/link";
import type { LinkVariant } from "@surface/ui/link";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Link> = {
  title: "Components/Atoms/Link",
  component: Link,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Âncora estilizada. Variantes de cor (default, primary, muted) e sublinhado (always, hover, none). Usa tokens de tipografia e cor das guidelines.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Conteúdo do link.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      description: "Variante de cor: default (onSurface), primary (ênfase), muted (secundário).",
      control: "select",
      options: ["default", "primary", "muted"] as LinkVariant[],
      table: { type: { summary: "LinkVariant" }, defaultValue: { summary: "primary" } },
    },
    underline: {
      description: "Sublinhado: always, hover (ao passar o mouse), none.",
      control: "select",
      options: ["always", "hover", "none"],
      table: { type: { summary: "string" }, defaultValue: { summary: "hover" } },
    },
    href: {
      description: "URL do link (atributo nativo).",
      control: "text",
      table: { type: { summary: "string" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    children: "Link de exemplo",
    variant: "primary",
    underline: "hover",
    href: "#",
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Link de exemplo",
    variant: "primary",
    underline: "hover",
    href: "#",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Link href="#" variant="default">
        Link default
      </Link>
      <Link href="#" variant="primary">
        Link primary
      </Link>
      <Link href="#" variant="muted">
        Link muted
      </Link>
    </div>
  ),
};

export const Underline: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Link href="#" underline="always">
        Sempre sublinhado
      </Link>
      <Link href="#" underline="hover">
        Sublinhado ao passar o mouse
      </Link>
      <Link href="#" underline="none">
        Sem sublinhado
      </Link>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Link (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Links usam cor primary para ênfase (guidelines de cor). Estado hover com sublinhado
              opcional. Contraste e acessibilidade conforme foundation.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="#">Link primary</Link>
              <Link href="#" variant="muted">
                Link secundário
              </Link>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
