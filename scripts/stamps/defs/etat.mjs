// État-stratège — rond (axe État/marché côté État), encre rouge.
// Le gouvernail : cercle, moyeu plein, six poignées courtes.
export default {
  frame: "round",
  ink: "left",
  rot: 1.6,
  picto: ({ P, C }) => `
    <circle cx="60" cy="60" r="22" fill="none" stroke="${C}" stroke-width="5.5"/>
    <circle cx="60" cy="60" r="7" fill="${C}"/>
    ${P(
      "M60,38 L60,27 M79.05,49 L88.58,43.5 M79.05,71 L88.58,76.5 M60,82 L60,93 M40.95,71 L31.42,76.5 M40.95,49 L31.42,43.5",
      C
    )}`,
};
