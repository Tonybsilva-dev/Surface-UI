import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputOTP } from "@surface/ui/input-otp";
import { Button } from "@surface/ui/button";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof InputOTP.Root> = {
  title: "Components/Molecules/InputOTP",
  component: InputOTP.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campos de dígitos para código OTP. Compound: InputOTP.Root, InputOTP.Group, InputOTP.Slot, InputOTP.Separator.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputOTP.Root>;

function SlotRow({ length = 6 }: { length?: number }) {
  // Slots are static (no reorder); index is the slot identity.
  const slots = Array.from({ length }, (_, i) => ({ id: `slot-${i}`, index: i }));
  return (
    <>
      {slots.map((slot) => (
        <InputOTP.Slot key={slot.id} index={slot.index} />
      ))}
    </>
  );
}

function SlotRowWithSeparator({ length = 6 }: { length?: number }) {
  const slots = Array.from({ length }, (_, i) => i);
  return (
    <>
      {slots.map((i) => (
        <span key={`otp-sep-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <InputOTP.Slot index={i} />
          {i < slots.length - 1 && <InputOTP.Separator>−</InputOTP.Separator>}
        </span>
      ))}
    </>
  );
}

export const Default: Story = {
  render: () => (
    <InputOTP.Root maxLength={6} onValueChange={(v) => console.log("OTP:", v)}>
      <InputOTP.Group>
        <SlotRow length={6} />
      </InputOTP.Group>
    </InputOTP.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState("");
    return (
      <div>
        <InputOTP.Root value={value} onValueChange={setValue} maxLength={6}>
          <InputOTP.Group>
            <SlotRow length={6} />
          </InputOTP.Group>
        </InputOTP.Root>
        <p style={{ marginTop: 8, fontSize: 14 }}>Valor: {value || "(vazio)"}</p>
      </div>
    );
  },
};

export const WithSeparator: Story = {
  render: () => (
    <InputOTP.Root maxLength={6} onValueChange={(v) => console.log(v)}>
      <InputOTP.Group>
        <SlotRowWithSeparator length={6} />
      </InputOTP.Group>
    </InputOTP.Root>
  ),
};

export const FourDigits: Story = {
  render: () => (
    <InputOTP.Root maxLength={4} onValueChange={(v) => console.log(v)}>
      <InputOTP.Group>
        <SlotRow length={4} />
      </InputOTP.Group>
    </InputOTP.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputOTP.Root maxLength={6} disabled defaultValue="123">
      <InputOTP.Group>
        <SlotRow length={6} />
      </InputOTP.Group>
    </InputOTP.Root>
  ),
};

function InputOTPVerificationDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-4 max-w-[320px]">
      <div>
        <span className="mb-1 block text-sm font-medium" aria-hidden>Código de verificação</span>
        <p className="mb-2 text-sm text-muted-foreground">
          Introduza o código de 6 dígitos que enviámos para o seu email.
        </p>
        <InputOTP.Root value={value} onValueChange={setValue} maxLength={6}>
          <InputOTP.Group>
            <SlotRow length={6} />
          </InputOTP.Group>
        </InputOTP.Root>
      </div>
      <Button size="sm" disabled={value.length !== 6}>
        Verificar
      </Button>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <StorySection title="InputOTP (overview)">
        <StoryCard title="Documentação">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="mb-2 font-semibold">O que é</h3>
              <p>
                O <strong>InputOTP</strong> são campos de dígitos para código OTP ou
                verificação. Cada slot é um input de um caractere; o foco avança
                automaticamente. Compound: Root, Group, Slot, Separator (opcional).
              </p>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">API (props)</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <code>InputOTP.Root</code> — value, onValueChange, maxLength,
                  disabled, defaultValue.
                </li>
                <li>
                  <code>InputOTP.Group</code> — envolve os slots.
                </li>
                <li>
                  <code>InputOTP.Slot</code> — index (posição do dígito).
                </li>
                <li>
                  <code>InputOTP.Separator</code> — carácter entre slots (ex.: −).
                </li>
              </ul>
            </section>
            <section>
              <h3 className="mb-2 font-semibold">Onde é usado</h3>
              <p>
                Verificação de email ou telefone, autenticação de dois fatores (2FA) e
                códigos de ativação. Use com label e botão de submissão (ex.:
                Verificar).
              </p>
            </section>
          </div>
        </StoryCard>
      </StorySection>
      <StorySection title="Exemplo completo">
        <StoryCard title="InputOTP: Código de verificação (6 dígitos + Verificar)">
          <p className="mb-4 text-sm text-muted-foreground">
            Bloco de verificação com label, descrição, 6 dígitos e botão Verificar
            (activo só quando os 6 dígitos estão preenchidos).
          </p>
          <InputOTPVerificationDemo />
        </StoryCard>
      </StorySection>
    </div>
  ),
};
