// Confiance aux experts — carré (question q33), encre bleue.
// La toque universitaire : plateau en losange, calotte, gland qui pend.
export default {
  frame: "square",
  ink: "right",
  rot: 1.5,
  picto: ({ P, C, PAPER }) => `
    ${P("M45,50 L45,64 Q60,72 75,64 L75,50", C)}
    <path d="M60,35 L88,46 L60,57 L32,46 Z" fill="${PAPER}" stroke="${C}" stroke-width="5.5" stroke-linejoin="round"/>
    ${P("M60,46 L85,51 L85,62", C, 'stroke-width="3.5"')}
    <circle cx="85" cy="66.5" r="3.8" fill="${C}"/>`,
};
