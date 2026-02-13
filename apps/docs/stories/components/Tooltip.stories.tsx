import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../../../../packages/ui/src/tooltip";
import type { TooltipPlacement } from "../../../../packages/ui/src/tooltip";
import { Button } from "@surface/ui/button";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

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
    <StorySection title="Tooltip (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Comunicação: texto ao hover/focus. placement top/bottom/left/right. Usa
              inverseSurface para fundo, motionTokens para transição.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Tooltip title="Clique para enviar" placement="top">
              <Button>Enviar</Button>
            </Tooltip>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
