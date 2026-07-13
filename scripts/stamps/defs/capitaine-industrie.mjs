// Bâtisseur de richesse — rond (position d'axe, côté droite), encre bleue. L'usine et sa cheminée.
export default {
  frame: "round",
  ink: "right",
  rot: -1.9,
  picto: ({ P, C }) => `
    ${P("M28,86 L92,86", C)}
    ${P("M34,86 L34,62 L54,48 L54,62 L74,48 L74,86", C)}
    ${P("M79,86 L79,44 L88,44 L88,86", C)}
    ${P("M76,36 q4,-6 8,-2 q4,4 8,-2", C, 'stroke-width="3.5"')}`,
};
