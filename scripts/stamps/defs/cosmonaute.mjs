// Cosmonaute convaincu·e — carré (prise de position, côté droite), encre bleue.
// La fusée : corps ogival, deux ailerons, hublot, deux traits de flamme.
export default {
  frame: "square",
  ink: "right",
  rot: -2.5,
  picto: ({ P, C }) => `
    ${P("M60,31 C69,38 72,47 72,57 L72,76 L48,76 L48,57 C48,47 51,38 60,31 Z", C)}
    <path d="M48,60 L36,78 L48,78 Z M72,60 L84,78 L72,78 Z" fill="${C}" stroke="${C}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="60" cy="51" r="6.5" fill="none" stroke="${C}" stroke-width="4"/>
    ${P("M55,83 L55,91 M65,83 L65,89", C, 'stroke-width="4"')}`,
};
