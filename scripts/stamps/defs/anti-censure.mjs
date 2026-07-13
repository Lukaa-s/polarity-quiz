// Anti-censure absolue — carré (prise de position), encre rouge.
// Le mégaphone : pavillon conique, poignée, deux ondes devant l'embouchure.
export default {
  frame: "square",
  ink: "left",
  rot: -1.6,
  picto: ({ P, C }) => `
    ${P("M32,50 L68,34 L68,78 L32,62 Z", C)}
    ${P("M41,66 L41,82 L52,82 L52,71", C)}
    ${P("M76,48 Q82,56 76,64", C, 'stroke-width="3.5"')}
    ${P("M84,42 Q92,56 84,70", C, 'stroke-width="3.5"')}`,
};
