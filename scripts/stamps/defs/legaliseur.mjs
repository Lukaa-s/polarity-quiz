// Pro-légalisation — carré (prise de position), encre rouge.
// La fiole ronde : ballon de chimie, bouchon en tiret, niveau de liquide.
export default {
  frame: "square",
  ink: "left",
  rot: 2.9,
  picto: ({ P, C }) => `
    ${P("M54,34 L54,54 A19 19 0 1 0 66,54 L66,34", C)}
    ${P("M50,30 L70,30", C)}
    ${P("M45,74 Q60,79 75,74", C, 'stroke-width="3.5"')}`,
};
