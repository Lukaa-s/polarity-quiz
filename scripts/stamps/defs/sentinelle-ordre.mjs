// Sentinelle de l'ordre — rond (position d'axe, côté droite), encre bleue.
// Le marteau de juge : tête cylindrique oblique, manche, socle.
export default {
  frame: "round",
  ink: "right",
  rot: -2.3,
  picto: ({ P, C }) => `
    <rect x="31" y="35" width="34" height="16" rx="6.5" fill="none" stroke="${C}" stroke-width="5.5" transform="rotate(-45 48 43)"/>
    ${P("M53,48 L76,71", C)}
    ${P("M52,85 L84,85", C)}`,
};
