// Décisif·ve — losange (style de réponse), encre noire.
// La croix franche : une croix de bulletin, deux traits épais, rien d'autre.
export default {
  frame: "losange",
  ink: "meta",
  rot: 1.6,
  picto: ({ P, C }) => `
    ${P("M44,44 L76,76", C, 'stroke-width="7.5"')}
    ${P("M76,44 L44,76", C, 'stroke-width="7.5"')}`,
};
