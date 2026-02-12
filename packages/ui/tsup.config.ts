import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/button.tsx",
    "src/divider.tsx",
    "src/icon-button.tsx",
    "src/badge.tsx",
    "src/foundation/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options,
}));
