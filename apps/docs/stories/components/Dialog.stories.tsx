import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@surface/ui/dialog";
import { Button } from "@surface/ui/button";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

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
    <div className="space-y-8 p-8">
      <StorySection title="Dialog (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>Dialog</strong> é um modal com overlay. O conteúdo é
                renderizado num portal. Estrutura compound: Root, Trigger, Content,
                Header, Body, Footer, Title, Description, Close.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
              <p>
                <strong>Dialog.Root</strong> (open, onOpenChange),{" "}
                <strong>Dialog.Trigger</strong> (abre o dialog),{" "}
                <strong>Dialog.Content</strong> (portal + overlay). Dentro:{" "}
                <strong>Dialog.Header</strong>, <strong>Dialog.Title</strong>,{" "}
                <strong>Dialog.Description</strong> (a11y),{" "}
                <strong>Dialog.Body</strong>, <strong>Dialog.Footer</strong>,{" "}
                <strong>Dialog.Close</strong>.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Confirmações destrutivas (eliminar projeto, sair sem guardar), edição
                de perfil, formulários modais e avisos que exigem decisão do
                utilizador.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Dialog: Eliminar projeto (confirmação destrutiva)">
          <p className="mb-4 text-sm text-muted-foreground">
            Dialog de confirmação com título, descrição e botões Cancelar / Eliminar.
          </p>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button variant="outline">Eliminar projeto</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Eliminar projeto?</Dialog.Title>
                <Dialog.Description>
                  Esta ação não pode ser revertida. Todos os dados do projeto serão
                  removidos permanentemente.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <Text variant="bodySmall" tone="muted" as="p">
                  Se tiver dúvidas, cancele e exporte os dados antes de eliminar.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline">Cancelar</Button>
                <Button variant="destructive">Eliminar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
