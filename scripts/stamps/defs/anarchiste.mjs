// Anarchiste — rond (axe autorité, pôle libertaire), encre rouge. La couronne barrée.
export default {
  frame: "round",
  ink: "left",
  rot: 2.8,
  picto: ({ P, C, PAPER }) => `
    ${P("M38,78 L34,46 L50,58 L60,38 L70,58 L86,46 L82,78 Z", C)}
    ${P("M32,88 L88,32", PAPER, 'stroke-width="9.5"')}
    ${P("M32,88 L88,32", C, 'stroke-width="6.5"')}`,
};
