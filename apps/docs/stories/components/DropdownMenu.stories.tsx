import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "@surface/ui/dropdown-menu";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof DropdownMenu.Root> = {
  title: "Components/Molecules/DropdownMenu",
  component: DropdownMenu.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Menu de ações (links/botões). Compound: DropdownMenu.Root, Trigger, Content, Item, Label, Separator.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.Root>;

export const Default: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Ações</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => alert("Guardar")}>
          Guardar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => alert("Copiar")}>
          Copiar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => alert("Eliminar")} variant="destructive">
          Eliminar
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Opções</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Conta</DropdownMenu.Label>
        <DropdownMenu.Item onClick={() => {}}>Perfil</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => {}}>Definições</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Sair</DropdownMenu.Label>
        <DropdownMenu.Item onClick={() => {}} variant="destructive">
          Terminar sessão
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="DropdownMenu (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Root (open, onOpenChange), Trigger (abre o menu), Content (portal).
              Item (onClick), Label (texto de grupo), Separator (divisor).
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={() => {}}>Opção 1</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => {}}>Opção 2</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
