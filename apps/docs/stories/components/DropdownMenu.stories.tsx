import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "@surface/ui/dropdown-menu";
import { StoryCard, StorySection } from "../foundation/shared";

function noop(): void {}

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
    <div className="space-y-8 p-8">
      <StorySection title="DropdownMenu (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>DropdownMenu</strong> é uma molécula compound que exibe um menu de
                ações (itens clicáveis ou links) ao abrir um trigger. Suporta grupos com
                Label, separadores (Separator) e itens com variante destructive.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
              <p>
                Composição: <strong>DropdownMenu.Root</strong> (open, onOpenChange),{" "}
                <strong>DropdownMenu.Trigger</strong> (abre o menu),{" "}
                <strong>DropdownMenu.Content</strong> (portal, posicionamento),{" "}
                <strong>DropdownMenu.Item</strong> (onClick),{" "}
                <strong>DropdownMenu.Label</strong> (texto de grupo),{" "}
                <strong>DropdownMenu.Separator</strong> (divisor entre grupos).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>Root</code> — open (controlado), onOpenChange.
                </li>
                <li>
                  <code>Trigger</code> — conteúdo que abre o menu (ex.: botão ou texto).
                </li>
                <li>
                  <code>Content</code> — props de posicionamento/portal (align, side, etc.).
                </li>
                <li>
                  <code>Item</code> — onClick, variant (destructive para ações destrutivas),
                  disabled.
                </li>
                <li>
                  <code>Label</code> — texto de grupo (não clicável).
                </li>
                <li>
                  <code>Separator</code> — divisor visual entre itens.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o DropdownMenu é usado na coluna de
                ações de cada linha (ex.: “Ações” com opções Editar, Excluir), definido nas
                colunas pelo consumidor através do cell renderer.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Componentes utilizados</h3>
              <p className="mb-2">
                O Trigger renderiza tipicamente um <strong>Button</strong> ou elemento
                clicável. Content e Item são partes do compound (Radix UI ou equivalente),
                com estilos do design system.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="DropdownMenu com Label, Separator e itens normais e destructive">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo com grupos (Label), Separator, itens normais e item destructive.
          </p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>Ações</DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Conta</DropdownMenu.Label>
              <DropdownMenu.Item onClick={noop}>Perfil</DropdownMenu.Item>
              <DropdownMenu.Item onClick={noop}>Definições</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Label>Sair</DropdownMenu.Label>
              <DropdownMenu.Item onClick={noop} variant="destructive">
                Terminar sessão
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
