import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx", "src/foundation/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options,
}));
