// Constructiviste — rond (axe constructivisme), encre rouge. Le compas ouvert.
export default {
  frame: "round",
  ink: "left",
  rot: -2.2,
  picto: ({ P, C }) => `
    ${P("M60,28 L60,19", C)}
    ${P("M40,84 L60,28 L80,84", C)}
    <circle cx="60" cy="28" r="6" fill="${C}"/>
    ${P("M43,92 Q60,99 77,92", C, 'stroke-width="3.5"')}`,
};
