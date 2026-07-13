// Sûr·e de soi — losange (style de réponse), encre noire.
// Le point d'exclamation dessiné : hampe effilée vers le bas, point plein.
export default {
  frame: "losange",
  ink: "meta",
  rot: -2,
  picto: ({ C }) => `
    <path d="M55.5,35 L64.5,35 L62,66 L58,66 Z" fill="${C}" stroke="${C}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="60" cy="79" r="5" fill="${C}"/>`,
};
