// Rationaliste pur·e — carré (question q96), encre bleue.
// L'éprouvette inclinée : le tube à essai, deux graduations, une bulle.
export default {
  frame: "square",
  ink: "right",
  rot: 2,
  picto: ({ P, C }) => `
    ${P("M68.2,30.6 L42.2,76.6 A 9 9 0 0 0 57.8,85.4 L83.8,39.4", C)}
    ${P("M60.3,44.5 L67.7,48.7 M55.4,53.2 L62.8,57.4", C, 'stroke-width="3.5"')}
    <circle cx="56.3" cy="69.8" r="3.6" fill="none" stroke="${C}" stroke-width="3.5"/>`,
};
