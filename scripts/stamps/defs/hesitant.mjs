// Hésitant·e — losange (méta : ≥8 réponses neutres), encre noire.
// Trois cases neutres (le losange du bulletin) cochées à la chaîne.
export default {
  frame: "losange",
  ink: "meta",
  rot: 2.2,
  picto: ({ P, C }) => `
    ${P("M30,60 L40,50 L50,60 L40,70 Z", C, 'stroke-width="4"')}
    ${P("M50,60 L60,50 L70,60 L60,70 Z", C, 'stroke-width="4"')}
    ${P("M70,60 L80,50 L90,60 L80,70 Z", C, 'stroke-width="4"')}`,
};
