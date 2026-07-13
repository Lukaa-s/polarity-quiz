// Progressiste moral — rond (axe mœurs à gauche), encre rouge. La porte entrouverte.
export default {
  frame: "round",
  ink: "left",
  rot: -1.8,
  picto: ({ P, C, PAPER }) => `
    ${P("M40,90 L40,30 L80,30 L80,90", C)}
    <path d="M40,31 L64,24 L64,94 L40,89 Z" fill="${PAPER}" stroke="${C}" stroke-width="5.5" stroke-linejoin="round"/>
    <circle cx="57.5" cy="59" r="3.6" fill="${C}"/>`,
};
