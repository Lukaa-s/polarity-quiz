// Conservateur·trice — rond (position d'axe, côté droite), encre bleue. Le gland de chêne.
export default {
  frame: "round",
  ink: "right",
  rot: -2.7,
  picto: ({ P, C }) => `
    ${P("M60,36 Q61,28 67,26", C)}
    ${P("M40,52 a20,16 0 0 1 40,0 Z", C)}
    ${P("M52,41 L51,50 M60,38 L60,50 M68,41 L69,50", C, 'stroke-width="3.5"')}
    ${P("M44,54 C44,70 51,82 60,84 C69,82 76,70 76,54", C)}`,
};
