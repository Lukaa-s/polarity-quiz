// Productiviste vert·e — rond (mixte croissance × écologie), encre noire. L'éolienne.
export default {
  frame: "round",
  ink: "meta",
  rot: 1,
  picto: ({ P, C }) => `
    ${P("M60,50 L60,92", C)}
    ${P("M50,92 L70,92", C)}
    ${P("M60,50 L64.5,24.4 M60,50 L79.9,66.7 M60,50 L35.6,58.9", C)}
    <circle cx="60" cy="50" r="5.5" fill="${C}"/>`,
};
