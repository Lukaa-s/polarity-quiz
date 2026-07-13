// Hors-champ — carré (prise de position), encre rouge.
// L'œil barré : amande en deux arcs, pupille, diagonale franche par-dessus.
export default {
  frame: "square",
  ink: "left",
  rot: 1.8,
  picto: ({ P, C, PAPER }) => `
    ${P("M30,60 Q60,36 90,60", C)}
    ${P("M30,60 Q60,84 90,60", C)}
    <circle cx="60" cy="60" r="7" fill="${C}"/>
    ${P("M33,85 L81,31", PAPER, 'stroke-width="11"')}
    ${P("M33,85 L81,31", C)}`,
};
