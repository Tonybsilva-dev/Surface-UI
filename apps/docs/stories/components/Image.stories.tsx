import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "@surface/ui/image";
import { StoryCard, StorySection } from "../foundation/shared";

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
    <div className="space-y-8 p-8">
      <StorySection title="Image (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Image</strong> é o átomo para exibição de imagem com fallback em caso de erro
                e estados de carregamento. <code>alt</code> é obrigatório para acessibilidade (use <code>alt=""</code> para
                imagens puramente decorativas). Suporta <code>objectFit</code> (cover, contain, fill, none),
                <code>radius</code> (tokens ou valor em px) e conteúdo de fallback quando o <code>src</code> falha.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props principais)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li><code>alt</code> — Texto alternativo (obrigatório).</li>
                <li><code>fallback</code> — ReactNode ou URL de imagem a mostrar em caso de erro.</li>
                <li><code>objectFit</code> — cover | contain | fill | none.</li>
                <li><code>radius</code> — string (ex.: &quot;0.5rem&quot;) ou número em px.</li>
                <li><code>className</code> — Aplicado ao wrapper; use com wrapper externo para aspect ratio.</li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Aspect ratio</h3>
              <p>
                O componente não expõe uma prop de aspect ratio. Para manter proporção fixa (ex.: 16/9 ou quadrado),
                envolva o <strong>Image</strong> num wrapper com <code>className=&quot;aspect-video&quot;</code> ou{" "}
                <code>aspect-square</code> (Tailwind) ou CSS <code>aspect-ratio: 16/9</code>, e passe{" "}
                <code>className=&quot;w-full h-full&quot;</code> ao Image para preencher o wrapper. Ver exemplo abaixo.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Cards, listagens, galerias, avatares e qualquer conteúdo visual. Combine com um wrapper com aspect
                ratio em grids e layouts responsivos para evitar saltos de layout (CLS).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Image com aspect ratio e fallback">
          <p className="mb-4 text-sm text-muted-foreground">
            Duas imagens: uma com wrapper aspect-video (16/9) e className w-full h-full; outra quadrada. A terceira simula falha com fallback.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="w-64 aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={placeholderUrl}
                alt="Placeholder 16:9"
                className="w-full h-full"
                objectFit="cover"
              />
            </div>
            <div className="w-40 aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={placeholderUrl}
                alt="Placeholder quadrado"
                className="w-full h-full"
                objectFit="cover"
              />
            </div>
            <div className="w-48 aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src="https://invalid-url.example/img.jpg"
                alt="Imagem que falha"
                fallback={<span className="text-muted-foreground text-sm">Falha ao carregar</span>}
                className="w-full h-full"
                objectFit="cover"
              />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
