import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/button.tsx",
    "src/divider.tsx",
    "src/icon-button.tsx",
    "src/badge.tsx",
    "src/text.tsx",
    "src/link.tsx",
    "src/checkbox.tsx",
    "src/chip.tsx",
    "src/avatar.tsx",
    "src/skeleton.tsx",
    "src/spinner.tsx",
    "src/text-input.tsx",
    "src/switch.tsx",
    "src/radio.tsx",
    "src/progress.tsx",
    "src/tooltip.tsx",
    "src/card.tsx",
    "src/tabs.tsx",
    "src/foundation/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options,
}));
