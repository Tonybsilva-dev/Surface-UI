import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputButton } from "@surface/ui/input-button";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const meta: Meta<typeof InputButton.Provider> = {
  title: "Components/Molecules/InputButton",
  component: InputButton.Provider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Botão que expande para input. Compound: InputButton.Provider, InputButton.Action, InputButton.Submit, InputButton.Input.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputButton.Provider>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <InputButton.Provider>
        <InputButton.Action>Escrever email</InputButton.Action>
        <InputButton.Input placeholder="seu@email.com" />
        <InputButton.Submit icon={<ArrowIcon />}>Enviar</InputButton.Submit>
      </InputButton.Provider>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ width: 360 }}>
        <InputButton.Provider showInput={show} setShowInput={setShow}>
          <InputButton.Action>Expandir</InputButton.Action>
          <InputButton.Input placeholder="Digite..." />
          <InputButton.Submit icon={<ArrowIcon />}>OK</InputButton.Submit>
        </InputButton.Provider>
        <p style={{ marginTop: 8, fontSize: 14 }}>Aberto: {String(show)}</p>
      </div>
    );
  },
};

export const Overview: Story = {
  render: () => (
    <StorySection title="InputButton (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Provider envolve Action (botão inicial), Input (campo quando expandido) e
              Submit (ícone quando fechado, texto quando aberto). Clique em Action ou
              Submit para alternar.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <div style={{ width: 320 }}>
              <InputButton.Provider>
                <InputButton.Action>Escrever</InputButton.Action>
                <InputButton.Input placeholder="..." />
                <InputButton.Submit icon={<ArrowIcon />}>Enviar</InputButton.Submit>
              </InputButton.Provider>
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
