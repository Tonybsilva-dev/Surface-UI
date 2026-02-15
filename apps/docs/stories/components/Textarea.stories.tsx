import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextArea } from "@surface/ui/textarea";
import type { TextAreaSize, TextAreaStatus } from "@surface/ui/textarea";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof TextArea> = {
  title: "Components/Atoms/Textarea",
  component: TextArea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campo de texto multilinha. Compound: TextArea.Root + TextArea.Input. allowClear para botão de limpar. Consistente com TextInput (status, size).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"] as TextAreaSize[],
      table: { type: { summary: "TextAreaSize" }, defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: ["default", "error", "warning"] as TextAreaStatus[],
      table: { type: { summary: "TextAreaStatus" }, defaultValue: { summary: "default" } },
    },
    placeholder: { control: "text" },
    rows: { control: "number" },
    disabled: { control: "boolean" },
    allowClear: {
      description: "Mostra botão para limpar o conteúdo.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    size: "md",
    status: "default",
    placeholder: "Escreva aqui...",
    rows: 4,
    disabled: false,
    allowClear: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: "Escreva aqui...",
    rows: 4,
  },
};

export const WithValue: Story = {
  render: function WithValueRender(args) {
    const [value, setValue] = useState("Texto inicial");
    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: 320 }}
      />
    );
  },
};

export const StatusError: Story = {
  args: {
    status: "error",
    placeholder: "Campo com erro",
    style: { width: 320 },
  },
};

export const StatusWarning: Story = {
  args: {
    status: "warning",
    placeholder: "Aviso",
    style: { width: 320 },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Desabilitado",
    value: "Conteúdo",
    style: { width: 320 },
  },
};

export const AllowClear: Story = {
  args: {
    allowClear: true,
    placeholder: "Digite e use o botão para limpar...",
    rows: 3,
    style: { width: 320 },
  },
};

export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>resize: vertical</div>
        <TextArea.Root style={{ width: 320 }}>
          <TextArea.Input placeholder="vertical" resize="vertical" rows={3} />
        </TextArea.Root>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>resize: none</div>
        <TextArea.Root style={{ width: 320 }}>
          <TextArea.Input placeholder="none" resize="none" rows={3} />
        </TextArea.Root>
      </div>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <TextArea.Root size="md" status="default" style={{ width: 360 }}>
      <TextArea.Input
        placeholder="Modo compound: TextArea.Root + TextArea.Input"
        rows={4}
      />
    </TextArea.Root>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="Textarea (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>TextArea</strong> é um campo de texto multilinha. Suporta
                compound (TextArea.Root + TextArea.Input), tamanhos (sm/md/lg), estados
                (default, error, warning) e botão de limpar (allowClear). Consistente
                com o Input do design system.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>size</code> — sm, md, lg.
                </li>
                <li>
                  <code>status</code> — default, error, warning.
                </li>
                <li>
                  <code>placeholder</code>, <code>rows</code>, <code>disabled</code>.
                </li>
                <li>
                  <code>allowClear</code> — mostra botão para limpar o conteúdo.
                </li>
                <li>
                  Modo compound: <code>TextArea.Root</code> + <code>TextArea.Input</code>
                  ; Input aceita <code>resize</code> (vertical, none).
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Em formulários para descrições, notas, comentários e conteúdo longo.
                Use label visível ou placeholder; validação em momento adequado. Combine
                com <strong>Form</strong> e <strong>Label</strong>.
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="Textarea: Descrição do projeto, Notas e estado de erro">
          <p className="mb-4 text-sm text-muted-foreground">
            Campo &quot;Descrição do projeto&quot; com allowClear, &quot;Notas&quot; simples e um
            exemplo em estado erro.
          </p>
          <div className="flex flex-col gap-6 max-w-[400px]">
            <div>
              <label htmlFor="textarea-desc" className="mb-1 block text-sm font-medium">
                Descrição do projeto
              </label>
              <TextArea
                id="textarea-desc"
                placeholder="Descreva o objetivo, scope e requisitos do projeto..."
                rows={4}
                allowClear
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label htmlFor="textarea-notes" className="mb-1 block text-sm font-medium">
                Notas
              </label>
              <TextArea
                id="textarea-notes"
                placeholder="Notas internas ou comentários adicionais."
                rows={3}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label htmlFor="textarea-error" className="mb-1 block text-sm font-medium text-destructive">
                Mensagem (com erro)
              </label>
              <TextArea
                id="textarea-error"
                placeholder="Este campo é obrigatório."
                status="error"
                rows={2}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
