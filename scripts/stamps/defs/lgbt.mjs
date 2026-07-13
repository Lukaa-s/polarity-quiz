// Allié·e — carré (question q92), encre rouge.
// Le drapeau rayé qui flotte : la hampe, l'étoffe ondulée, trois rayures.
export default {
  frame: "square",
  ink: "left",
  rot: -2.9,
  picto: ({ P, C, PAPER }) => `
    <path d="M39,35 C54,30 70,40 86,34 L86,62 C70,68 54,58 39,63 Z" fill="${PAPER}" stroke="${C}" stroke-width="5.5" stroke-linejoin="round"/>
    ${P("M39,42 C54,37 70,47 86,41 M39,49 C54,44 70,54 86,48 M39,56 C54,51 70,61 86,55", C, 'stroke-width="3.5"')}
    ${P("M37,30 L37,90", C)}`,
};
