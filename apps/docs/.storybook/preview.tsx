// biome-ignore lint/nursery/noUnusedImports: needed for JSX in decorator
import React from "react";
import type { Preview } from "@storybook/react";

/**
 * Decorator global: envolve todas as stories num único wrapper.
 * Use para providers (ex.: tema, Tooltip) que precisam estar acima na árvore.
 * Documentação: https://storybook.js.org/docs/8/writing-stories/mocking-data-and-modules/mocking-providers
 */
const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", minHeight: "100%" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
