import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@surface/ui/progress";
import type { ProgressSize, ProgressStatus } from "@surface/ui/progress";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta<typeof Progress> = {
  title: "Components/Atoms/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Barra de progresso linear. percent (0–100), indeterminado se omitido. size, status, showInfo. Tokens: motion, color.",
      },
    },
  },
  argTypes: {
    percent: {
      description: "Percentual 0–100. Omitir = indeterminado.",
      control: { type: "number", min: 0, max: 100 },
      table: { type: { summary: "number" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"] as ProgressSize[],
      table: { type: { summary: "ProgressSize" }, defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: ["normal", "success", "exception"] as ProgressStatus[],
      table: { type: { summary: "ProgressStatus" }, defaultValue: { summary: "normal" } },
    },
    showInfo: {
      description: "Mostra percentual ao lado.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    percent: 45,
    size: "md",
    status: "normal",
    showInfo: false,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    percent: 45,
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithInfo: Story = {
  args: {
    percent: 70,
    showInfo: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Indeterminate: Story = {
  args: {
    percent: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Progress percent={30} size="sm" />
      <Progress percent={50} size="md" />
      <Progress percent={80} size="lg" />
    </div>
  ),
};

export const Status: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Progress percent={40} status="normal" showInfo />
      <Progress percent={100} status="success" showInfo />
      <Progress percent={60} status="exception" showInfo />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <StorySection title="Progress (overview)">
      <TwoColumn
        left={
          <StoryCard title="Guidelines">
            <p style={{ margin: "0 0 12px", fontSize: 14 }}>
              Barra de progresso. percent 0–100 ou indeterminado. size (sm/md/lg), status
              (normal/success/exception). motionTokens para transição.
            </p>
          </StoryCard>
        }
        right={
          <StoryCard title="Exemplos">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Progress percent={60} showInfo style={{ width: "100%" }} />
              <Progress percent={undefined} style={{ width: "100%" }} />
            </div>
          </StoryCard>
        }
      />
    </StorySection>
  ),
};
