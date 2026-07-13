// Communiste — rond (3 axes économiques à gauche), encre rouge. L'épi de blé.
export default {
  frame: "round",
  ink: "left",
  rot: -2.5,
  picto: ({ P, C }) => `
    ${P("M60,88 L60,32", C)}
    ${P("M60,50 L45,39 M60,50 L75,39", C)}
    ${P("M60,63 L45,52 M60,63 L75,52", C)}
    ${P("M60,76 L45,65 M60,76 L75,65", C)}`,
};
