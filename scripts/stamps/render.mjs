/**
 * Rendu de QA : rasterise un ou plusieurs tampons en PNG 240px sur fond
 * papier, dans scripts/stamps/preview/ (gitignoré). À relire VISUELLEMENT
 * après chaque itération de dessin — aucun tampon ne s'intègre sans avoir
 * été vu.
 *
 *   node scripts/stamps/render.mjs communiste liberal
 *   node scripts/stamps/render.mjs --all
 */
import sharp from "sharp";
import { mkdirSync, readdirSync } from "fs";
import { buildPreview } from "./lib.mjs";

const here = new URL(".", import.meta.url).pathname;
const previewDir = `${here}preview`;
mkdirSync(previewDir, { recursive: true });

let names = process.argv.slice(2);
if (names[0] === "--all") {
  names = readdirSync(`${here}defs`)
    .filter((f) => f.endsWith(".mjs"))
    .map((f) => f.replace(/\.mjs$/, ""));
}
if (names.length === 0) {
  console.error("usage: node scripts/stamps/render.mjs <nom>… | --all");
  process.exit(1);
}

for (const name of names) {
  const { default: def } = await import(`./defs/${name}.mjs`);
  const svg = buildPreview(def);
  await sharp(Buffer.from(svg)).resize(240, 240).png().toFile(`${previewDir}/${name}.png`);
  console.log(`${previewDir}/${name}.png`);
}
