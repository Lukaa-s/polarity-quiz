// Dignité par l'effort — rond (position d'axe, côté droite), encre bleue.
// L'enclume de profil : corne, table, pied évasé, en un trait continu.
export default {
  frame: "round",
  ink: "right",
  rot: 2.1,
  picto: ({ P, C }) => `
    ${P(
      "M26,48 C33,43 39,42 45,42 L88,42 L87,52 L73,54 L71,64 L84,77 L44,77 L57,64 L55,54 L41,52 C33,52 29,51 26,48 Z",
      C
    )}`,
};
