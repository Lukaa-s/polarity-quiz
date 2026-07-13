// Réformiste tranquille — rond (position d'axe, côté droite), encre bleue. L'escalier, marche après marche.
export default {
  frame: "round",
  ink: "right",
  rot: -2.4,
  picto: ({ P, C }) => `
    ${P("M30,82 L30,71 L45,71 L45,60 L60,60 L60,49 L75,49 L75,38 L90,38", C)}`,
};
