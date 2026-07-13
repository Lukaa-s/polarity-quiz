// Action directe — carré (prise de position), encre rouge.
// La pancarte de manif : panneau sur manche, slogan suggéré en deux lignes.
export default {
  frame: "square",
  ink: "left",
  rot: -2.4,
  picto: ({ P, C }) => `
    ${P("M33,30 L87,30 L87,62 L33,62 Z", C)}
    ${P("M60,62 L60,90", C)}
    ${P("M42,41 L78,41", C, 'stroke-width="3.5"')}
    ${P("M42,51 L70,51", C, 'stroke-width="3.5"')}`,
};
