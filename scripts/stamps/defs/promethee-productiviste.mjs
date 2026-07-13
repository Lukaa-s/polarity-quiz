// Apôtre de l'abondance — rond (position d'axe, côté droite), encre bleue.
// L'éclair : zigzag bold en contour fermé rempli, pointe en bas.
export default {
  frame: "round",
  ink: "right",
  rot: -1.7,
  picto: ({ C }) => `
    <path d="M66,26 L44,62 L58,62 L50,94 L78,52 L63,52 Z" fill="${C}" stroke="${C}" stroke-width="4" stroke-linejoin="round"/>`,
};
