// Anarchiste poétique — rond (style de réponse libre et lyrique), encre rouge.
// La plume d'écriture : hampe courbe, barbes, pointe fine en bas.
export default {
  frame: "round",
  ink: "left",
  rot: -2,
  picto: ({ P, C }) => `
    ${P("M42,82 C46,60 58,40 82,28 C80,50 64,72 44,84", C)}
    ${P("M44,83 C54,66 66,48 79,33", C, 'stroke-width="3.5"')}
    ${P("M60,70 L66,60 M52,77 L58,67", C, 'stroke-width="3"')}
    ${P("M44,83 L38,92", C, 'stroke-width="3.5"')}`,
};
