/**
 * Design system coverage check.
 * Finds molecules that do not use any atom, and organisms that do not use any molecule.
 * Run: pnpm --filter @surface/ui ds:coverage
 */
const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");

const ATOMS = new Set([
  "button",
  "input",
  "label",
  "icon",
  "icon-button",
  "checkbox",
  "radio",
  "switch",
  "text",
  "badge",
  "chip",
  "avatar",
  "skeleton",
  "spinner",
  "progress",
  "link",
  "divider",
  "tooltip",
  "textarea",
  "slider",
  "image",
  "masked-input",
  "password-strength",
]);

const MOLECULES = new Set([
  "select",
  "form",
  "combobox",
  "empty",
  "toggle-group",
  "tabs",
  "card",
  "collapsible",
  "carousel",
  "input-button",
  "input-otp",
  "drawer",
  "dialog",
  "command",
  "pagination",
  "table",
  "dropdown-menu",
  "toast",
  "popover",
]);

const ORGANISMS = new Set(["chart", "data-table"]);

function getLocalImports(content) {
  const imports = [];
  const re = /from\s+["']\.\/([^"']+)["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const spec = m[1];
    if (spec === "lib/utils") continue;
    const segment = spec.split("/")[0].split(".")[0];
    imports.push(segment);
  }
  return imports;
}

function getTsxFiles(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (e.name === "lib" || e.name === "foundation") continue;
      files.push(...getTsxFiles(path.join(dir, e.name), rel));
    } else if (e.name.endsWith(".tsx")) {
      files.push({ path: path.join(dir, e.name), rel });
    }
  }
  return files;
}

function main() {
  const files = getTsxFiles(SRC_DIR);
  const moleculesWithoutAtoms = [];
  const organismsWithoutMolecules = [];

  for (const { path: filePath, rel } of files) {
    const baseName = rel.replace(/\.tsx$/, "").replace(/^.*\//, "");
    const content = fs.readFileSync(filePath, "utf8");
    const imports = getLocalImports(content);

    if (MOLECULES.has(baseName)) {
      const usesAtom = imports.some((i) => ATOMS.has(i));
      if (!usesAtom) {
        moleculesWithoutAtoms.push({ name: baseName, file: rel });
      }
    }

    if (ORGANISMS.has(baseName)) {
      const usesMolecule = imports.some((i) => MOLECULES.has(i));
      if (!usesMolecule) {
        organismsWithoutMolecules.push({ name: baseName, file: rel });
      }
    }
  }

  const ok = moleculesWithoutAtoms.length === 0 && organismsWithoutMolecules.length === 0;

  console.log("Design system coverage (atoms/molecules/organisms)\n");

  if (moleculesWithoutAtoms.length > 0) {
    console.log("Moléculas que não usam átomos:");
    moleculesWithoutAtoms.forEach(({ name, file }) => console.log(`  - ${name} (${file})`));
    console.log("");
  }

  if (organismsWithoutMolecules.length > 0) {
    console.log("Organismos que não usam moléculas:");
    organismsWithoutMolecules.forEach(({ name, file }) => console.log(`  - ${name} (${file})`));
    console.log("");
  }

  if (ok) {
    console.log("OK: Todas as moléculas usam pelo menos um átomo e todos os organismos usam pelo menos uma molécula.");
  } else {
    console.log(
      "Ver docs/design-system-coverage.md para refactors sugeridos e política do DS."
    );
    process.exit(1);
  }
}

main();
