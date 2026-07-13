// Gardien du patrimoine — rond (position d'axe, côté droite), encre bleue. La clé ancienne.
export default {
  frame: "round",
  ink: "right",
  rot: 1.3,
  picto: ({ P, C }) => `
    <circle cx="38" cy="58" r="13" fill="none" stroke="${C}" stroke-width="5.5"/>
    ${P("M51,58 L90,58", C)}
    ${P("M90,58 L90,72 M80,58 L80,68", C)}`,
};
