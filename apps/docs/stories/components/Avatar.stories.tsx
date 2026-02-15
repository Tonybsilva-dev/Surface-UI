import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@surface/ui/avatar";
import type { AvatarSize } from "@surface/ui/avatar";
import { StoryCard, StorySection } from "../foundation/shared";

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
    <div className="space-y-8 p-8">
      <StorySection title="Avatar (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Avatar</strong> é um átomo que exibe a representação do utilizador em
                círculo: imagem (src/alt) ou iniciais derivadas de um nome. Tamanhos sm (32px),
                md (40px), lg (48px). Quando não há imagem, usa fundo e texto (surfaceVariant /
                onSurfaceVariant ou tokens muted).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>src</code> — URL da imagem.
                </li>
                <li>
                  <code>alt</code> — texto alternativo da imagem.
                </li>
                <li>
                  <code>initials</code> — iniciais quando não há src (ex.: nome para derivar AB).
                </li>
                <li>
                  <code>size</code> — sm, md, lg.
                </li>
                <li>
                  <code>style</code> — estilos inline.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                O Avatar é usado em cabeçalhos de card, listas de utilizadores, menus de conta e
                em qualquer contexto onde se mostre a identidade do utilizador de forma compacta.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Avatar: imagem, iniciais, tamanhos e fallback">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa avatar com imagem, iniciais (1 letra, 2 letras, nome completo),
            tamanhos (sm, md, lg) e fallback sem imagem.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 items-end">
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Avatar"
                size="sm"
              />
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                alt="Avatar"
                size="md"
              />
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Joao"
                alt="Avatar"
                size="lg"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar initials="S" size="sm" />
              <Avatar initials="JD" size="md" />
              <Avatar initials="Maria Silva" size="lg" />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar size="md" />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
