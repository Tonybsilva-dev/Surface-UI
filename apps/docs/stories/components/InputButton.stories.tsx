import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { InputButton } from "@surface/ui/input-button";
import { StoryCard, StorySection } from "../foundation/shared";

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
        <InputButton.Submit icon={<ArrowRight className="size-4" aria-hidden />}>Enviar</InputButton.Submit>
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
          <InputButton.Submit icon={<ArrowRight className="size-4" aria-hidden />}>OK</InputButton.Submit>
        </InputButton.Provider>
        <p style={{ marginTop: 8, fontSize: 14 }}>Aberto: {String(show)}</p>
      </div>
    );
  },
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="InputButton (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>InputButton</strong> é um botão que expande para mostrar um
                campo de input. Quando fechado mostra o Action e o Submit (ícone); quando
                aberto mostra o Input e o Submit com texto. Compound: Provider, Action,
                Input, Submit.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
              <p>
                <strong>InputButton.Provider</strong> envolve{" "}
                <strong>InputButton.Action</strong> (botão inicial),{" "}
                <strong>InputButton.Input</strong> (campo quando expandido) e{" "}
                <strong>InputButton.Submit</strong> (ícone quando fechado, texto quando
                aberto). Clique em Action ou Submit para alternar. Opcional: showInput,
                setShowInput para controlo externo.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
				Subscrever newsletter, adicionar email à lista, pesquisa rápida na barra
				e ações que precisam de um valor antes de submeter (ex.: convite por
				email).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="InputButton: Subscrever newsletter">
          <p className="mb-4 text-sm text-muted-foreground">
            Botão &quot;Adicionar email&quot; que expande para campo de email e botão
            &quot;Subscrever&quot;.
          </p>
          <div className="max-w-[360px]">
            <InputButton.Provider>
              <InputButton.Action>Adicionar email</InputButton.Action>
              <InputButton.Input placeholder="seu@email.com" />
              <InputButton.Submit icon={<ArrowRight className="size-4" aria-hidden />}>Subscrever</InputButton.Submit>
            </InputButton.Provider>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
