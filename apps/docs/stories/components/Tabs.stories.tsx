import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tab, Tabs } from "@surface/ui/tabs";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Atoms/Tabs",
  component: Tabs.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navegação por abas. API compound: Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content. Tokens: typography, color, motion.",
      },
    },
  },
  argTypes: {
    value: {
      description: "Chave do tab ativo.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs.Root>;

function TabsWithContent() {
  const [value, setValue] = useState("1");
  return (
    <Tabs.Root value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">
        <div style={{ padding: 16, fontSize: 14, color: "#333" }}>
          Conteúdo da aba 1.
        </div>
      </Tabs.Content>
      <Tabs.Content value="2">
        <div style={{ padding: 16, fontSize: 14, color: "#333" }}>
          Conteúdo da aba 2.
        </div>
      </Tabs.Content>
      <Tabs.Content value="3">
        <div style={{ padding: 16, fontSize: 14, color: "#333" }}>
          Conteúdo da aba 3.
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

/** Nova API: Tabs.Root + Tabs.List + Tabs.Trigger + Tabs.Content. */
export const Default: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <TabsWithContent />
    </div>
  ),
};

/** Uso legado: Tabs (root+list) + Tab (trigger); conteúdo fora. */
export const LegacyAPI: Story = {
  render: () => {
    const [value, setValue] = useState("1");
    return (
      <div style={{ width: "100%" }}>
        <Tabs value={value} onChange={setValue}>
          <Tab value="1">Tab 1</Tab>
          <Tab value="2">Tab 2</Tab>
          <Tab value="3">Tab 3</Tab>
        </Tabs>
        <div style={{ padding: 16, fontSize: 14, color: "#666" }}>
          Conteúdo controlado pela aplicação (tab ativo: {value}).
        </div>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <Tabs.Root value={value} onChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="a">Primeira</Tabs.Trigger>
          <Tabs.Trigger value="b" disabled>
            Desabilitada
          </Tabs.Trigger>
          <Tabs.Trigger value="c">Terceira</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Conteúdo A</Tabs.Content>
        <Tabs.Content value="b">Conteúdo B (tab desabilitada)</Tabs.Content>
        <Tabs.Content value="c">Conteúdo C</Tabs.Content>
      </Tabs.Root>
    );
  },
};

function TabsSettingsDemo() {
  const [value, setValue] = useState("geral");
  return (
    <Tabs.Root value={value} onChange={setValue} className="w-full max-w-[480px]">
      <Tabs.List>
        <Tabs.Trigger value="geral">Geral</Tabs.Trigger>
        <Tabs.Trigger value="notificacoes">Notificações</Tabs.Trigger>
        <Tabs.Trigger value="seguranca">Segurança</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="geral" className="pt-4">
        <Text variant="bodySmall" tone="muted" as="p">
          Nome, email e idioma da conta. Estas definições aplicam-se ao seu perfil em
          toda a aplicação.
        </Text>
      </Tabs.Content>
      <Tabs.Content value="notificacoes" className="pt-4">
        <Text variant="bodySmall" tone="muted" as="p">
          Escolha como deseja receber notificações: email, push ou nenhuma. Pode alterar
          a qualquer momento.
        </Text>
      </Tabs.Content>
      <Tabs.Content value="seguranca" className="pt-4">
        <Text variant="bodySmall" tone="muted" as="p">
          Alterar palavra-passe, ativar autenticação de dois fatores e gerir sessões
          ativas.
        </Text>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Tabs (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                As <strong>Tabs</strong> permitem navegação por abas: um conjunto de
                triggers e painéis de conteúdo. A aba ativa tem borda inferior na cor
                primary. Usa tokens de tipografia, cor e motion.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
              <p>
                API compound: <strong>Tabs.Root</strong> (value, onChange),{" "}
                <strong>Tabs.List</strong> (wrapper dos triggers),{" "}
                <strong>Tabs.Trigger</strong> (value, children),{" "}
                <strong>Tabs.Content</strong> (value, children — painel exibido quando
                ativo).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>Tabs.Root</code> — value (chave do tab ativo), onChange.
                </li>
                <li>
                  <code>Tabs.Trigger</code> — value, disabled, children.
                </li>
                <li>
                  <code>Tabs.Content</code> — value, children (conteúdo do painel).
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em páginas de definições, detalhes de entidade (perfil, projeto) e
                qualquer contexto com secções alternáveis. Combine com{" "}
                <strong>Text</strong> e formulários.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Tabs: Definições (Geral, Notificações, Segurança)">
          <p className="mb-4 text-sm text-muted-foreground">
            Bloco de definições com três abas e conteúdo real: geral (perfil), notificações
            e segurança.
          </p>
          <TabsSettingsDemo />
        </StoryCard>
      </StorySection>
    </div>
  ),
};
