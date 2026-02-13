import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "@surface/ui/image";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Image> = {
  title: "Components/Atoms/Image",
  component: Image,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Exibição de imagem com fallback e loading. alt obrigatório (altTextGuidelines). Opcional: fallback, objectFit, radius.",
      },
    },
  },
  argTypes: {
    alt: {
      description: "Texto alternativo (obrigatório). Use '' se decorativa.",
      control: "text",
    },
    objectFit: {
      control: "select",
      options: ["cover", "contain", "fill", "none"],
    },
  },
  args: {
    alt: "Descrição da imagem",
    objectFit: "cover",
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

const placeholderUrl = "https://placehold.co/320/200/eee?text=Placeholder";

export const Default: Story = {
  args: {
    src: placeholderUrl,
    alt: "Imagem de exemplo",
    width: 320,
    height: 200,
    style: { display: "block" },
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid-url-that-will-fail.example/img.jpg",
    alt: "Imagem que falha",
    fallback: "Falha ao carregar",
    width: 320,
    height: 200,
    style: { display: "block" },
  },
};

export const ObjectFit: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>cover</div>
        <Image
          src={placeholderUrl}
          alt="Cover"
          objectFit="cover"
          width={160}
          height={120}
          style={{ display: "block" }}
        />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>contain</div>
        <Image
          src={placeholderUrl}
          alt="Contain"
          objectFit="contain"
          width={160}
          height={120}
          style={{ display: "block" }}
        />
      </div>
    </div>
  ),
};

export const Radius: Story = {
  args: {
    src: placeholderUrl,
    alt: "Com bordas arredondadas",
    radius: 12,
    width: 200,
    height: 120,
    style: { display: "block" },
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Image (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              altTextGuidelines: alt obrigatório para acessibilidade. Use alt="" para
              imagens decorativas. Fallback quando o carregamento falha. objectFit e
              radius com tokens.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Image
              src={placeholderUrl}
              alt="Placeholder"
              width={240}
              height={140}
              style={{ display: "block" }}
            />
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
