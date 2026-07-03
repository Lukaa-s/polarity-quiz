#!/usr/bin/env node
// Optimise en place les PNG de src/badges/ : redimensionne à 512x512 max et
// compresse pour rester sous ~150 Ko/fichier. Garde le même nom de fichier et
// le même format (.png) pour ne pas casser src/data/badges.tsx (import.meta.glob).
//
// Usage: npm run optimize:badges

import sharp from "sharp";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BADGES_DIR = path.resolve(__dirname, "..", "src", "badges");
const MAX_DIMENSION = 512;
const TARGET_BYTES = 150 * 1024;
const QUALITY_STEPS = [82, 78, 74, 70, 66, 62, 58, 54, 50, 45, 40];

async function optimizeOne(filePath) {
  const before = await readFile(filePath);
  const beforeSize = before.length;

  const resized = sharp(before).resize(MAX_DIMENSION, MAX_DIMENSION, {
    fit: "inside",
    withoutEnlargement: true,
  });

  let best = null;
  for (const quality of QUALITY_STEPS) {
    const buf = await resized
      .clone()
      .png({ quality, compressionLevel: 9, palette: true, effort: 10 })
      .toBuffer();
    best = buf;
    if (buf.length <= TARGET_BYTES) break;
  }

  await writeFile(filePath, best);

  const meta = await sharp(best).metadata();
  return {
    file: path.basename(filePath),
    beforeSize,
    afterSize: best.length,
    width: meta.width,
    height: meta.height,
    format: meta.format,
  };
}

async function main() {
  const entries = await readdir(BADGES_DIR);
  const pngFiles = entries.filter((f) => f.toLowerCase().endsWith(".png"));

  if (pngFiles.length === 0) {
    console.log("Aucun PNG trouvé dans", BADGES_DIR);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const overTarget = [];

  for (const name of pngFiles) {
    const filePath = path.join(BADGES_DIR, name);
    const result = await optimizeOne(filePath);
    totalBefore += result.beforeSize;
    totalAfter += result.afterSize;
    if (result.afterSize > TARGET_BYTES) overTarget.push(result);
    console.log(
      `${result.file}: ${(result.beforeSize / 1024).toFixed(0)} Ko -> ${(result.afterSize / 1024).toFixed(0)} Ko ` +
        `(${result.width}x${result.height} ${result.format})`
    );
  }

  console.log("");
  console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(1)} Mo -> ${(totalAfter / 1024 / 1024).toFixed(1)} Mo`);
  if (overTarget.length > 0) {
    console.log(`⚠️  ${overTarget.length} fichier(s) au-dessus de 150 Ko malgré la compression maximale:`);
    for (const r of overTarget) {
      console.log(`   - ${r.file}: ${(r.afterSize / 1024).toFixed(0)} Ko`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
