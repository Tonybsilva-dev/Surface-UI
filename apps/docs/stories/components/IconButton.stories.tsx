import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "lucide-react";
import { IconButton } from "@surface/ui/icon-button";
import type { IconButtonVariant, IconButtonSize } from "@surface/ui/icon-button";
import { StoryCard, StorySection } from "../foundation/shared";

function iconClassName(size: "default" | "sm" | "md" | "lg"): string {
  return size === "sm" ? "size-[18px]" : size === "lg" ? "size-6" : "size-[22px]";
}

const meta: Meta<typeof IconButton> = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Botão apenas com ícone. Mesmas variantes do Button: default, primary, destructive, outline, secondary, ghost, link. Tamanhos: sm 32px, default/md 40px, lg 48px. Requer aria-label.",
      },
    },
  },
  argTypes: {
    icon: {
      description: "Ícone (SVG ou elemento).",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
    "aria-label": {
      description: "Label acessível (obrigatório).",
      control: "text",
      table: { type: { summary: "string" } },
    },
    variant: {
      description: "Variante visual (alinhada ao Button).",
      control: "select",
      options: [
        "default",
        "primary",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ] as IconButtonVariant[],
      table: { type: { summary: "IconButtonVariant" }, defaultValue: { summary: "default" } },
    },
    size: {
      description: "Tamanho da área clicável: sm 32px, default/md 40px, lg 48px.",
      control: "select",
      options: ["default", "sm", "md", "lg"] as IconButtonSize[],
      table: { type: { summary: "IconButtonSize" }, defaultValue: { summary: "default" } },
    },
    disabled: {
      description: "Desabilita o botão.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    type: {
      description: "Tipo nativo do botão.",
      control: "select",
      options: ["button", "submit", "reset"],
      table: { type: { summary: "string" } },
    },
    style: {
      description: "Estilos inline.",
      control: "object",
      table: { type: { summary: "CSSProperties" } },
    },
  },
  args: {
    icon: null,
    "aria-label": "Abrir menu",
    variant: "default",
    size: "default",
    disabled: false,
    type: "button",
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => (
    <IconButton
      {...args}
      icon={<Settings className={iconClassName(args.size)} aria-hidden />}
    />
  ),
  args: {
    "aria-label": "Abrir menu",
    variant: "default",
    size: "default",
    disabled: false,
    type: "button",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Default" variant="default" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Primary" variant="primary" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Destructive" variant="destructive" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Outline" variant="outline" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Secondary" variant="secondary" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Ghost" variant="ghost" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Link" variant="link" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton icon={<Settings className="size-[18px]" aria-hidden />} aria-label="Small" size="sm" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Default" size="default" />
      <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Medium" size="md" />
      <IconButton icon={<Settings className="size-6" aria-hidden />} aria-label="Large" size="lg" />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="IconButton (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>IconButton</strong> é um átomo que exibe apenas um ícone como ação
                clicável. Usa as mesmas variantes visuais do Button (default, primary,
                destructive, outline, secondary, ghost, link) e tamanhos (sm 32px, default/md 40px,
                lg 48px). Requer <code>aria-label</code> para acessibilidade.
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>icon</code> — ícone (SVG ou elemento ReactNode).
                </li>
                <li>
                  <code>aria-label</code> — label acessível (obrigatório).
                </li>
                <li>
                  <code>variant</code> — default, primary, destructive, outline, secondary, ghost,
                  link.
                </li>
                <li>
                  <code>size</code> — default, sm, md, lg (área clicável 32px / 40px / 48px).
                </li>
                <li>
                  <code>disabled</code> — desabilita o botão.
                </li>
                <li>
                  <code>type</code> — tipo nativo (button, submit, reset).
                </li>
                <li>
                  <code>style</code> — estilos inline.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                No organismo <strong>DataTable</strong>, o IconButton é usado na toolbar como
                botão de refresh (atualizar) e como trigger em ícone do seletor de colunas
                visíveis (quando columnVisibilityTriggerVariant é &quot;icon&quot;).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="IconButton: variantes, tamanhos e estados">
          <p className="mb-4 text-sm text-muted-foreground">
            Exemplo que agrupa variantes, tamanhos (sm, default, md, lg) e estado disabled.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3 items-center">
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Default" variant="default" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Primary" variant="primary" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Destructive" variant="destructive" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Outline" variant="outline" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Secondary" variant="secondary" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Ghost" variant="ghost" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Link" variant="link" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Disabled" disabled />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <IconButton icon={<Settings className="size-[18px]" aria-hidden />} aria-label="Small" size="sm" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Default" size="default" />
              <IconButton icon={<Settings className="size-[22px]" aria-hidden />} aria-label="Medium" size="md" />
              <IconButton icon={<Settings className="size-6" aria-hidden />} aria-label="Large" size="lg" />
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
