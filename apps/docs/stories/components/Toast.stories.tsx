import type { Meta, StoryObj } from "@storybook/react";
import { Toast, toast } from "@surface/ui/toast";
import { Button } from "@surface/ui/button";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Toast.Provider> = {
  title: "Components/Molecules/Toast",
  component: Toast.Provider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Notificações efêmeras. Envolver a app em Toast.Provider e usar toast.success(), toast.error(), etc.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Toast.Provider>
        <Story />
      </Toast.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toast.Provider>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button onClick={() => toast.success("Guardado com sucesso.")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Ocorreu um erro.")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Atenção.")}>
        Warning
      </Button>
      <Button variant="ghost" onClick={() => toast.info("Informação.")}>
        Info
      </Button>
      <Button variant="ghost" onClick={() => toast.message("Mensagem neutra.")}>
        Message
      </Button>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Toast (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Envolver a aplicação em <code>Toast.Provider</code>. Depois usar{" "}
              <code>toast.success(msg)</code>, <code>toast.error(msg)</code>,{" "}
              <code>toast.warning(msg)</code>, <code>toast.info(msg)</code> ou{" "}
              <code>toast.message(msg)</code>. Fecham automaticamente ou pelo ×.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <Button onClick={() => toast.success("Exemplo de toast.")}>
              Mostrar toast
            </Button>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
