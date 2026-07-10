// Génère les assets de partage/SEO dans public/ à partir de SVG inline :
//  - apple-touch-icon.png (180×180)
//  - og-image.png (1200×630, image Open Graph / Twitter card)
// Usage : node scripts/generate-share-assets.mjs
// À relancer si le thème ou l'accroche change.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

// Tokens du thème « Scrutin » (voir tokens.css) — rouge = pôle gauche, bleu = pôle droit.
const PAPER = "#F6F3EC";
const PAPER2 = "#EFEAE0";
const INK = "#23201A";
const INK2 = "#5C564A";
const LEFT = "#C62828";
const RIGHT = "#1565C0";

// « La croix du bulletin » : case de scrutin à l'encre, croix rouge (pôle
// gauche) / bleue (pôle droit) qui se croisent — même marque que favicon.svg.
const touchIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${PAPER}"/>
  <rect x="34" y="34" width="112" height="112" rx="11" fill="none" stroke="${INK}" stroke-width="13"/>
  <path d="M62 63 L118 117" stroke="${LEFT}" stroke-width="18" stroke-linecap="round"/>
  <path d="M117 62 L61 116" stroke="${RIGHT}" stroke-width="18" stroke-linecap="round"/>
</svg>`;

// Polices : librsvg n'embarque pas Fraunces/Libre Franklin, on reste sur les
// familles génériques serif/sans-serif, cohérentes avec l'esprit éditorial.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${INK}" stroke-width="3"/>
  <line x1="24" y1="120" x2="1176" y2="120" stroke="${INK}" stroke-width="2"/>

  <text x="600" y="86" text-anchor="middle" font-family="serif" font-size="52" font-weight="600" fill="${INK}">Polarity Quiz</text>

  <text x="600" y="300" text-anchor="middle" font-family="serif" font-size="88" font-weight="600" fill="${INK}">Où vous situez-vous ?</text>

  <g>
    <text x="530" y="410" text-anchor="end" font-family="serif" font-size="44" font-weight="600" fill="${LEFT}">Égalité</text>
    <rect x="578" y="372" width="44" height="44" rx="5" fill="none" stroke="${INK}" stroke-width="4.5"/>
    <path d="M588 383 L611 405" stroke="${LEFT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M610.5 382.5 L587.5 404.5" stroke="${RIGHT}" stroke-width="7" stroke-linecap="round"/>
    <text x="670" y="410" text-anchor="start" font-family="serif" font-size="44" font-weight="600" fill="${RIGHT}">Mérite</text>
  </g>

  <rect x="24" y="502" width="1152" height="104" fill="${PAPER2}"/>
  <line x1="24" y1="502" x2="1176" y2="502" stroke="${INK2}" stroke-width="1"/>
  <text x="600" y="565" text-anchor="middle" font-family="sans-serif" font-size="30" fill="${INK2}">101 questions · 14 axes idéologiques · gratuit, sans compte</text>
</svg>`;

await sharp(Buffer.from(touchIconSvg)).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, "og-image.png"));
console.log("public/apple-touch-icon.png et public/og-image.png générés.");
