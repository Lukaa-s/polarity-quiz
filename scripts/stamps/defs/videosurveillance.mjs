// Œil de caméra — carré (question q79, côté droite), encre bleue.
// La caméra de surveillance sur son support.
export default {
  frame: "square",
  ink: "right",
  rot: 1.5,
  picto: ({ P, C, PAPER }) => `
    <path d="M32,40 L74,32 L78,49 L36,57 Z" fill="${PAPER}" stroke="${C}" stroke-width="5.5" stroke-linejoin="round"/>
    <circle cx="70" cy="42.5" r="3.75" fill="${C}"/>
    ${P("M44,57 L42,74", C)}
    ${P("M30,74 L56,74", C)}`,
};
