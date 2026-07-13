// Foi en l'Assemblée — rond (position d'axe, côté droite), encre bleue.
// L'hémicycle : trois travées concentriques ouvertes vers le bas, le perchoir au foyer.
export default {
  frame: "round",
  ink: "right",
  rot: 1.7,
  picto: ({ P, C }) => `
    ${P("M29.1,80.3 A32,32 0 1 1 90.9,80.3", C)}
    ${P("M37.8,78 A23,23 0 1 1 82.2,78", C)}
    ${P("M46.5,75.6 A14,14 0 1 1 73.5,75.6", C)}
    ${P("M55,80 L65,80", C)}`,
};
