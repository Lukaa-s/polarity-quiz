// Gardien de la laïcité — rond (axe laïcité), encre rouge. Le fronton de mairie.
export default {
  frame: "round",
  ink: "left",
  rot: 1.4,
  picto: ({ P, C }) => `
    ${P("M30,46 L60,26 L90,46 Z", C)}
    ${P("M44,54 L44,82 M76,54 L76,82", C)}
    ${P("M34,89 L86,89", C, 'stroke-width="6"')}`,
};
