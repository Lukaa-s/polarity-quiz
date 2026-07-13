// Porte-flambeau de la révolution — rond (axe rupture), encre rouge. Le flambeau.
export default {
  frame: "round",
  ink: "left",
  rot: -2.6,
  picto: ({ P, C }) => `
    ${P("M58,50 C46,42 52,26 63,21 C58,30 72,32 66,46 C64,49 61,51 58,50 Z", C)}
    ${P("M44,54 L76,54 M46,54 C48,66 54,70 60,70 C66,70 72,66 74,54", C)}
    ${P("M54,70 L59,93 M66,70 L61,93", C)}`,
};
