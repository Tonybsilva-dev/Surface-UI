import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "@surface/ui/link";
import type { LinkVariant } from "@surface/ui/link";
import { StoryCard, StorySection } from "../foundation/shared";

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
    <div className="space-y-8 p-8">
      <StorySection title="Link (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Link</strong> é uma âncora estilizada com variantes de cor e
                sublinhado. Usa tokens de tipografia e cor das guidelines. Ideal para
                navegação e referências em texto.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>variant</code> — default (onSurface), primary (ênfase), muted
                  (secundário).
                </li>
                <li>
                  <code>underline</code> — always, hover, none.
                </li>
                <li>
                  <code>href</code> — URL (atributo nativo).
                </li>
                <li>
                  <code>children</code> — conteúdo do link.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em rodapés, parágrafos de ajuda, mensagens de erro com link para
                recuperação, e navegação secundária. Combine com <strong>Text</strong>{" "}
                para blocos de conteúdo.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Link: variantes e sublinhado em contexto (rodapé e parágrafo)">
          <p className="mb-4 text-sm text-muted-foreground">
            Links em contexto real: rodapé com Política de privacidade, Suporte e
            Documentação; parágrafo com link primary; variantes default, primary e muted.
          </p>
          <div className="space-y-8">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Parágrafo com link: Consulte a{" "}
                <Link href="#" variant="primary" underline="hover">
                  Documentação
                </Link>{" "}
                para mais detalhes ou contacte o{" "}
                <Link href="#" variant="primary" underline="hover">
                  Suporte
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="#" variant="default" underline="hover">
                Política de privacidade
              </Link>
              <Link href="#" variant="primary" underline="hover">
                Suporte
              </Link>
              <Link href="#" variant="muted" underline="none">
                Documentação
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="#" underline="always">
                Sempre sublinhado
              </Link>
              <Link href="#" underline="hover">
                Sublinhado ao hover
              </Link>
              <Link href="#" underline="none" variant="muted">
                Sem sublinhado (muted)
              </Link>
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
