/**
 * Gabarit commun des tampons de badge — « le tampon du dépouillement ».
 *
 * Grammaire :
 * - le CADRE dit comment le badge est gagné : rond = position d'axe,
 *   carré = prise de position sur une question, losange = style de réponse ;
 * - l'ENCRE dit de quel côté : rouge = pôle gauche, bleu = pôle droite,
 *   noir = méta / mixte (aucun camp) ;
 * - trait unique à bouts ronds (même voix que la croix de la marque),
 *   légère rotation fixe par badge pour l'effet « coup de tampon ».
 *
 * Un badge = un fichier de def dans scripts/stamps/defs/<fichier-icone>.mjs :
 *   export default {
 *     frame: "round" | "square" | "losange",
 *     ink:   "left"  | "right"  | "meta",
 *     rot:   number,            // degrés, entre -3 et 3
 *     picto: ({ P, C, INK, PAPER }) => string,  // SVG interne, dessiné en C
 *   }
 */

export const INK = "#23201A";
export const LEFT = "#C62828";
export const RIGHT = "#1565C0";
export const PAPER = "#F6F3EC";

export const inkOf = (side) => (side === "left" ? LEFT : side === "right" ? RIGHT : INK);

const diamond = (x, y, s = 3.2) =>
  `<path d="M ${x - s},${y} L ${x},${y - s} L ${x + s},${y} L ${x},${y + s} Z" fill="${INK}"/>`;

/** Les trois cadres, dessinés à l'encre noire quel que soit le pictogramme. */
export const FRAMES = {
  round: `
    <circle cx="60" cy="60" r="54" fill="none" stroke="${INK}" stroke-width="3"/>
    <circle cx="60" cy="60" r="46.5" fill="none" stroke="${INK}" stroke-width="1.25"/>
    ${diamond(9.75, 60)} ${diamond(110.25, 60)}`,
  square: `
    <rect x="16" y="16" width="88" height="88" rx="7" fill="none" stroke="${INK}" stroke-width="3"/>
    <rect x="23.5" y="23.5" width="73" height="73" rx="4" fill="none" stroke="${INK}" stroke-width="1.25"/>
    ${diamond(19.75, 60)} ${diamond(100.25, 60)}`,
  losange: `
    <path d="M 60,6 L 114,60 L 60,114 L 6,60 Z" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 60,16.5 L 103.5,60 L 60,103.5 L 16.5,60 Z" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linejoin="round"/>`,
};

/**
 * Trait de pictogramme : épaisseur 5.5 par défaut, bouts et angles ronds.
 * Passe un `stroke-width` dans `extra` pour les détails fins (3–4).
 */
export function P(d, color, extra = "") {
  const sw = /stroke-width/.test(extra) ? "" : 'stroke-width="5.5"';
  return `<path d="${d}" fill="none" stroke="${color}" ${sw} stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
}

/** SVG final (fond transparent) — c'est ce qui part dans src/badges/. */
export function buildStamp(def) {
  const C = inkOf(def.ink);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <g transform="rotate(${def.rot ?? 0} 60 60)">
    ${FRAMES[def.frame]}
    ${def.picto({ P, C, INK, PAPER })}
  </g>
</svg>`;
}

/** Variante sur fond papier, uniquement pour les previews de QA. */
export function buildPreview(def) {
  return buildStamp(def).replace(
    /(<svg[^>]*>)/,
    `$1\n  <rect width="120" height="120" fill="${PAPER}"/>`
  );
}
