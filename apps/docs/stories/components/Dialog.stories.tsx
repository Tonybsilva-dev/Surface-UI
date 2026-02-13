import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@surface/ui/dialog";
import { Button } from "@surface/ui/button";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Dialog.Root> = {
  title: "Components/Molecules/Dialog",
  component: Dialog.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Modal com overlay. Compound: Dialog.Root, Dialog.Trigger, Dialog.Content, Dialog.Header, Dialog.Body, Dialog.Footer, Dialog.Title, Dialog.Description, Dialog.Close.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog.Root>;

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Abrir dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Título do dialog</Dialog.Title>
          <Dialog.Description>
            Descrição opcional. O conteúdo aparece aqui.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
            Corpo do dialog. Use Escape ou clique no overlay para fechar.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="outline" onClick={() => {}}>
            Cancelar
          </Button>
          <Button>Confirmar</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Sem botão X</Button>
      </Dialog.Trigger>
      <Dialog.Content hideCloseButton>
        <Dialog.Header>
          <Dialog.Title>Apenas overlay e Escape</Dialog.Title>
          <Dialog.Description>Não há ícone de fechar no canto.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p style={{ margin: 0 }}>Feche com Escape ou clique fora.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close
            style={{
              padding: "8px 16px",
              fontFamily: "inherit",
              fontSize: 14,
              border: "none",
              borderRadius: 6,
              background: "transparent",
              color: "rgb(22, 119, 255)",
              cursor: "pointer",
            }}
          >
            Fechar
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Dialog (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Root (open, onOpenChange), Trigger (abre), Content (portal + overlay).
              Header, Body, Footer para estrutura. Title e Description para a11y.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>Abrir</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Título</Dialog.Title>
                  <Dialog.Description>Descrição.</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>Conteúdo.</Dialog.Body>
                <Dialog.Footer>
                  <Button>OK</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
