// Techno-prophète — rond (position d'axe, côté droite), encre bleue. L'ampoule.
export default {
  frame: "round",
  ink: "right",
  rot: 2.4,
  picto: ({ P, C }) => `
    <circle cx="60" cy="47" r="19" fill="none" stroke="${C}" stroke-width="5.5"/>
    ${P("M52,57 C56,53 56,50 55.5,46 a4.5,4.5 0 1 1 9,0 C64,50 64,53 68,57", C, 'stroke-width="3.5"')}
    ${P("M51,73 L69,73 M54,81 L66,81", C)}`,
};
