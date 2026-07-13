// Dissident·e tranquille — rond (style de position discret), encre rouge. Le parapluie.
export default {
  frame: "round",
  ink: "left",
  rot: 2.6,
  picto: ({ P, C }) => `
    ${P("M26,58 C26,36 42,26 60,26 C78,26 94,36 94,58 Q82.7,50 71.3,58 Q60,50 48.7,58 Q37.3,50 26,58 Z", C)}
    ${P("M60,58 L60,82 C60,91 48,92 48,84", C)}
    ${P("M60,25 L60,20", C, 'stroke-width="4"')}`,
};
