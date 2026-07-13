// Référendumiste — carré (question q29, côté gauche), encre rouge.
// L'urne et le bulletin marqué d'une croix.
export default {
  frame: "square",
  ink: "left",
  rot: -2,
  picto: ({ P, C, PAPER }) => `
    ${P("M32,60 L88,60", C)}
    ${P("M36,60 L36,86 L84,86 L84,60", C)}
    <path d="M52,32 L69,36 L64,56 L47,52 Z" fill="${PAPER}" stroke="${C}" stroke-width="5" stroke-linejoin="round"/>
    ${P("M54,40 L60,47 M61,40 L53,47", C, 'stroke-width="3.5"')}`,
};
