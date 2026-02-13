import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@surface/ui/avatar";
import type { AvatarSize } from "@surface/ui/avatar";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Avatar> = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Imagem ou iniciais em círculo. Tamanhos sm/md/lg. Usa surfaceVariant e onSurfaceVariant quando sem imagem.",
      },
    },
  },
  argTypes: {
    src: {
      description: "URL da imagem.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    alt: {
      description: "Texto alternativo da imagem.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    initials: {
      description: "Iniciais quando não há src (ex.: nome para derivar AB).",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description: "Tamanho: sm (32px), md (40px), lg (48px).",
      control: "select",
      options: ["sm", "md", "lg"] as AvatarSize[],
      table: { type: { summary: "AvatarSize" }, defaultValue: { summary: "md" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    initials: "AB",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initials: "AB",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
      <Avatar initials="S" size="sm" />
      <Avatar initials="M" size="md" />
      <Avatar initials="L" size="lg" />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    alt: "Avatar",
    size: "md",
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Avatar (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Círculo com imagem (src/alt) ou iniciais. Tamanhos sm/md/lg. Fallback com surfaceVariant.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar initials="JD" />
              <Avatar initials="Maria Silva" />
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
