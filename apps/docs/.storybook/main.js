import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

// #region agent log
const _log = (msg, data) => {
  try {
    console.error("[storybook-config]", msg, typeof data === "object" ? JSON.stringify(data) : data);
  } catch (_) {}
};
// #endregion

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

let config;
try {
  // #region agent log
  _log("config-load-start", { __dirname, cwd: process.cwd() });
  // #endregion
  const uiPath = resolve(__dirname, "../../../packages/ui/");
  // #region agent log
  _log("alias-ui-path", { uiPath });
  // #endregion
  config = {
    stories: ["../stories/**/*.stories.tsx"],
    addons: [
      getAbsolutePath("@storybook/addon-links"),
      getAbsolutePath("@storybook/addon-essentials"),
    ],
    framework: {
      name: getAbsolutePath("@storybook/react-vite"),
      options: {},
    },

    core: {},

    async viteFinal(config) {
      return {
        ...config,
        define: { "process.env": {} },
        resolve: {
          ...config.resolve,
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

export default config;
