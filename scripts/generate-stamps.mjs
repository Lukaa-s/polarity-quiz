/**
 * Génère les 56 icônes de badge SVG (src/badges/<nom>.svg) depuis les defs
 * de scripts/stamps/defs/. Idempotent : à relancer après toute modification
 * d'un def. Voir scripts/stamps/lib.mjs pour la grammaire.
 */
import { readdirSync, writeFileSync } from "fs";
import { buildStamp } from "./stamps/lib.mjs";

const here = new URL(".", import.meta.url).pathname;
const defsDir = `${here}stamps/defs`;
const outDir = `${here}../src/badges`;

const names = readdirSync(defsDir)
  .filter((f) => f.endsWith(".mjs"))
  .map((f) => f.replace(/\.mjs$/, ""));

for (const name of names) {
  const { default: def } = await import(`./stamps/defs/${name}.mjs`);
  writeFileSync(`${outDir}/${name}.svg`, buildStamp(def) + "\n");
}
console.log(`${names.length} tampons générés dans src/badges/`);
