// Collectiviste social — rond (axe logement/commun côté collectif), encre rouge.
// Les trois toits : trois maisons identiques accolées sur un même sol.
export default {
  frame: "round",
  ink: "left",
  rot: -2.8,
  picto: ({ P, C }) => `
    ${P("M27,58 L38,45 L49,58 L60,45 L71,58 L82,45 L93,58", C)}
    ${P("M27,58 L27,79 M49,58 L49,79 M71,58 L71,79 M93,58 L93,79", C, 'stroke-width="4"')}
    ${P("M26,79 L94,79", C)}`,
};
