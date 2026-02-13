/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh", padding: 16, boxSizing: "border-box" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export default preview;
