import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
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
    const uiPkg = resolve(__dirname, "../../../packages/ui");
    const uiSrc = resolve(uiPkg, "src");
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        ...config.resolve,
        alias: [
          {
            find: "@surface/ui/tooltip",
            replacement: resolve(uiSrc, "tooltip.tsx"),
          },
          {
            find: "ui",
            replacement: uiPkg,
          },
          {
            find: "@surface/ui",
            replacement: uiSrc,
          },
        ],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: ["@surface/ui"],
      },
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          allow: [uiPkg],
        },
      },
    };
  },

  docs: {
    autodocs: true,
  },
};

export default config;
