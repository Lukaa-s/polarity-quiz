// Spiritualiste moderne — rond (position d'axe, côté droite), encre bleue. La bougie sur sa coupelle.
export default {
  frame: "round",
  ink: "right",
  rot: 1.8,
  picto: ({ P, C }) => `
    <path d="M60,26 C67,34 67,41 60,44 C53,41 53,34 60,26 Z" fill="${C}"/>
    ${P("M60,50 L60,45", C, 'stroke-width="3.5"')}
    ${P("M52,50 L68,50 L68,84 L52,84 Z", C)}
    ${P("M42,84 a18,9 0 0 0 36,0", C)}`,
};
