// Libéral·e assumé·e — rond (axe État & marché à droite), encre bleue. L'étal de marché.
export default {
  frame: "round",
  ink: "right",
  rot: 1.8,
  picto: ({ P, C }) => `
    ${P("M30,42 L90,42", C)}
    ${P("M30,42 a7.5,7.5 0 0,0 15,0 m0,0 a7.5,7.5 0 0,0 15,0 m0,0 a7.5,7.5 0 0,0 15,0 m0,0 a7.5,7.5 0 0,0 15,0", C)}
    ${P("M36,52 L36,80 M84,52 L84,80", C)}
    ${P("M28,80 L92,80", C)}`,
};
