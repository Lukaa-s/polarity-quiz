// Anticarcéral — carré (questions q67 + q68, côté gauche), encre rouge.
// Les barreaux écartés : les deux du centre ploient, l'ouverture est là.
export default {
  frame: "square",
  ink: "left",
  rot: 2.5,
  picto: ({ P, C }) => `
    ${P("M36,32 L36,88", C)}
    ${P("M84,32 L84,88", C)}
    ${P("M52,32 L52,46 C45,54 45,66 52,74 L52,88", C)}
    ${P("M68,32 L68,46 C75,54 75,66 68,74 L68,88", C)}`,
};
