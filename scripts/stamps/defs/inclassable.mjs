// Inclassable — losange (style de réponse), encre noire.
// Hors case : la case losange reste vide, la coche s'est posée à côté.
export default {
  frame: "losange",
  ink: "meta",
  rot: 2.6,
  picto: ({ P, C }) => `
    ${P("M34,60 L46,48 L58,60 L46,72 Z", C, 'stroke-width="4"')}
    <circle cx="76" cy="60" r="6" fill="${C}"/>`,
};
