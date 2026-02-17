import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";

/** Descobre automaticamente os entry points a partir de `src/` (arquivos .tsx e pastas com index.ts). */
const getEntries = (): Record<string, string> => {
	const srcDir = path.resolve(__dirname, "src");

	const entries: Record<string, string> = {
		// Barrel principal para DX (`@surface/ui`)
		index: "src/index.ts",
		// Entradas fixas não-componentes
		"foundation": "src/foundation/index.ts",
		"foundation/theme.css": "src/foundation/theme.css",
		"lib/utils": "src/lib/utils.ts",
	};

	const dirents = fs.readdirSync(srcDir, { withFileTypes: true });

	for (const dirent of dirents) {
		if (dirent.isDirectory()) {
			// Para a migração futura: cada pasta (ex.: Drawer, Button) com `index.ts`
			// passa a ter um bundle próprio automaticamente.
			if (dirent.name === "foundation" || dirent.name === "lib") continue;
			const indexPath = path.join("src", dirent.name, "index.ts");
			if (fs.existsSync(path.resolve(__dirname, indexPath))) {
				// PascalCase -> kebab-case (DataTable -> data-table) para coincidir com exports
				const key = dirent.name
					.replace(/([a-z])([A-Z])/g, "$1-$2")
					.toLowerCase();
				if (!entries[key]) {
					entries[key] = indexPath;
				}
			}
		} else if (dirent.isFile() && dirent.name.endsWith(".tsx")) {
			// Enquanto os componentes ainda estiverem como arquivos soltos em src/,
			// continuamos a gerar bundles individuais (button, drawer, etc.).
			const base = path.basename(dirent.name, ".tsx");
			const relPath = path.join("src", dirent.name);
			if (!entries[base]) {
				entries[base] = relPath;
			}
		}
	}

	return entries;
};

export default defineConfig((options) => {
	const entries = getEntries();

	return {
		entry: entries,
		clean: true,
		splitting: true,
		format: ["cjs", "esm"],
		// Mantém o comportamento atual de gerar tipos por entry (exceto CSS).
		dts: { entry: Object.values(entries).filter((e) => !e.endsWith(".css")) },
		loader: {
			".css": "copy",
		},
		external: ["react", "react-dom", "recharts"],
		treeshake: true,
		minify: !options.watch,
		...options,
	};
});

