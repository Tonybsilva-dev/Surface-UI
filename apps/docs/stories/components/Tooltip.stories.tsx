import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@surface/ui/tooltip";
import type { TooltipPlacement } from "@surface/ui/tooltip";
import { Button } from "@surface/ui/button";
import { IconButton } from "@surface/ui/icon-button";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Texto ou conteúdo ao passar o mouse/foco. placement (top/bottom/left/right). Tokens: typography, color, motion.",
      },
    },
  },
  argTypes: {
    title: {
      description: "Conteúdo do tooltip.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"] as TooltipPlacement[],
      table: { type: { summary: "TooltipPlacement" }, defaultValue: { summary: "top" } },
    },
  },
  args: {
    title: "Dica do tooltip",
    placement: "top",
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: "Passe o mouse aqui",
    placement: "top",
  },
  render: (args) => (
    <div style={{ padding: 48 }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div style={{ padding: 48 }}>
      <Tooltip placement="top">
        <Tooltip.Trigger>
          <Button>Composição: Trigger + Content</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Conteúdo do tooltip por composição.</Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        minHeight: 200,
        flexWrap: "wrap",
      }}
    >
      <Tooltip title="Tooltip top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="Tooltip bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="Tooltip left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip title="Tooltip right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Tooltip (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Tooltip</strong> exibe texto ou conteúdo ao passar o rato ou
                ao receber foco. Posicionamento configurável (top, bottom, left, right).
                Usa inverseSurface para o fundo e motionTokens para a transição.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>title</code> — conteúdo do tooltip (ReactNode).
                </li>
                <li>
                  <code>placement</code> — top, bottom, left, right.
                </li>
                <li>
                  Modo compound: <code>Tooltip.Trigger</code> +{" "}
                  <code>Tooltip.Content</code> para conteúdo customizado.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Acessibilidade</h3>
              <p>
                O tooltip é mostrado ao hover e ao foco. Use texto curto e descritivo.
                Para ícones sem rótulo visível, o tooltip funciona como alternativa
                textual (a11y).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Tooltip: botões de ação e ícone com dica">
          <p className="mb-4 text-sm text-muted-foreground">
            Botões com tooltips reais (Guardar, Eliminar, Editar, Copiar link) e um
            ícone com tooltip &quot;Mais opções&quot;.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip title="Guardar" placement="top">
              <Button variant="outline" size="sm">
                Guardar
              </Button>
            </Tooltip>
            <Tooltip title="Eliminar" placement="top">
              <Button variant="outline" size="sm">
                Eliminar
              </Button>
            </Tooltip>
            <Tooltip title="Editar" placement="top">
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </Tooltip>
            <Tooltip title="Copiar link" placement="top">
              <Button variant="outline" size="sm">
                Copiar link
              </Button>
            </Tooltip>
            <Tooltip title="Mais opções" placement="bottom">
              <IconButton icon={<span aria-hidden>⋯</span>} aria-label="Mais opções" />
            </Tooltip>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
