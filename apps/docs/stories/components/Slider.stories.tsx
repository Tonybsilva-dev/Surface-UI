import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "@surface/ui/slider";
import type { SliderSize } from "@surface/ui/slider";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Slider> = {
  title: "Components/Atoms/Slider",
  component: Slider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Controlo de intervalo (range). Tokens de cor, shape e motion. Acessível (ARIA value/min/max/step).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"] as SliderSize[],
      table: { type: { summary: "SliderSize" }, defaultValue: { summary: "md" } },
    },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Slider {...args} defaultValue={50} />
    </div>
  ),
};

export const WithValue: Story = {
  render: function WithValueRender(args) {
    const [val, setVal] = useState(30);
    return (
      <div style={{ width: 280 }}>
        <Slider
          {...args}
          value={val}
          onValueChange={setVal}
        />
        <p style={{ marginTop: 8, fontSize: 14 }}>Valor: {val}</p>
      </div>
    );
  },
};

export const MinMaxStep: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 280 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>0–100, step 1</div>
        <Slider min={0} max={100} step={1} defaultValue={50} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>0–10, step 0.5</div>
        <Slider min={0} max={10} step={0.5} defaultValue={5} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Slider disabled defaultValue={60} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 280 }}>
      <Slider size="sm" defaultValue={40} />
      <Slider size="md" defaultValue={70} />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Slider (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Selection controls: valor numérico em intervalo. Use min, max, step e
              onValueChange. Tamanhos sm (track fino) e md. Focus ring e estados
              desabilitados com tokens.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplo">
            <div style={{ width: 240 }}>
              <Slider min={0} max={100} defaultValue={50} onValueChange={(v) => console.log(v)} />
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
