// Démocrate direct·e — rond (axe démocratie côté direct), encre rouge.
// L'agora : sept points en cercle, centre vide.
export default {
  frame: "round",
  ink: "left",
  rot: 2,
  picto: ({ P, C }) => `
    ${P(
      "M60,39 L60,39 M76.4,46.9 L76.4,46.9 M80.5,64.7 L80.5,64.7 M69.1,78.9 L69.1,78.9 M50.9,78.9 L50.9,78.9 M39.5,64.7 L39.5,64.7 M43.6,46.9 L43.6,46.9",
      C,
      'stroke-width="9"'
    )}`,
};
