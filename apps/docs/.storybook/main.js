"use strict";

const { resolve } = require("path");
const tailwindcssModule = require("@tailwindcss/vite");
const tailwindcss = typeof tailwindcssModule === "function" ? tailwindcssModule : tailwindcssModule.default;

// #region agent log
const _log = (msg, data) => {
  try {
    console.error("[storybook-config]", msg, typeof data === "object" ? JSON.stringify(data) : data);
  } catch (_) {}
};
// #endregion

const uiPath = resolve(__dirname, "../../../packages/ui/");
const uiThemeSource = resolve(uiPath, "src/foundation/theme.css");

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
    staticDirs: ["../public"],
    managerHead: (head) =>
      `<link rel="icon" type="image/png" sizes="32x32" href="/surface-icon.png" />
    <link rel="shortcut icon" type="image/png" href="/surface-icon.png" />
    ${head}
    <style>
      /* Expandir logo ao máximo na sidebar do Storybook */
      a[href="/"] {
        display: block !important;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
      }
      a[href="/"] img {
        margin: 0 !important;
        width: 100% !important;
        max-height: 56px;
        height: auto;
        object-fit: contain;
        display: block;
      }
    </style>`,
    async viteFinal(viteConfig) {
      return {
        ...viteConfig,
        plugins: [...(viteConfig.plugins || []), tailwindcss()],
        define: { "process.env": {} },
        build: {
          ...viteConfig.build,
          sourcemap: false,
        },
        resolve: {
          ...viteConfig.resolve,
          alias: [
            // Tema do source para o Tailwind escanear packages/ui/src/**/*.tsx (dist não tem .tsx)
            {
              find: "@surface/ui/foundation/theme.css",
              replacement: uiThemeSource,
            },
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
