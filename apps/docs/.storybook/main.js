"use strict";

const { resolve } = require("path");

// #region agent log
const _log = (msg, data) => {
  try {
    console.error("[storybook-config]", msg, typeof data === "object" ? JSON.stringify(data) : data);
  } catch (_) {}
};
// #endregion

const uiPath = resolve(__dirname, "../../../packages/ui/");

let config;
try {
  // #region agent log
  _log("config-load-start", { __dirname, cwd: process.cwd(), uiPath });
  // #endregion
  config = {
    stories: ["../stories/**/*.stories.tsx"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: {
      name: "@storybook/react-vite",
      options: {},
    },
    core: {},
    async viteFinal(viteConfig) {
      return {
        ...viteConfig,
        define: { "process.env": {} },
        resolve: {
          ...viteConfig.resolve,
          alias: [
            {
              find: "ui",
              replacement: uiPath,
            },
          ],
        },
      };
    },
    docs: {
      autodocs: true,
    },
  };
  // #region agent log
  _log("config-load-done", null);
  // #endregion
} catch (err) {
  // #region agent log
  console.error("[storybook-config] ERROR loading config:", err?.message ?? err);
  if (err?.stack) console.error("[storybook-config] stack:", err.stack);
  // #endregion
  throw err;
}

module.exports = config;
