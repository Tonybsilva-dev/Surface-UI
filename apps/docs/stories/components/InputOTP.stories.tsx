import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputOTP } from "@surface/ui/input-otp";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

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

export const Overview: Story = {
  render: () => (
    <StorySection title="InputOTP (overview)">
      <TwoColumn
        left={
          <StoryCard title="Uso">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Root define value/onValueChange e maxLength. Group envolve os Slot(index).
              Cada Slot é um input de um caractere; foco avança automaticamente.
              Separator opcional entre slots.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo 6 dígitos">
            <InputOTP.Root maxLength={6}>
              <InputOTP.Group>
                <SlotRow length={6} />
              </InputOTP.Group>
            </InputOTP.Root>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
