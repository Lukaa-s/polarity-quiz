// Libre par principe — rond (pouvoir + libertés à gauche), encre rouge.
// Le maillon rompu : la chaîne a cédé, les deux bouts sautent hors du trait.
export default {
  frame: "round",
  ink: "left",
  rot: 1.2,
  picto: ({ P, C }) => `
    ${P("M67,46 L72,46 A14,14 0 0 1 72,74 L48,74 A14,14 0 0 1 48,46 L53,46", C)}
    ${P("M53,46 L50,39", C)}
    ${P("M67,46 L70,39", C)}
    ${P("M55,32 L57,26 M65,32 L63,26", C, 'stroke-width="3.5"')}`,
};
