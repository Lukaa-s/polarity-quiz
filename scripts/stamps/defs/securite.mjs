// Protecteur·trice — rond (position d'axe, côté droite), encre bleue. Le bouclier.
export default {
  frame: "round",
  ink: "right",
  rot: -1.5,
  picto: ({ P, C }) => `
    ${P("M34,36 Q34,30 40,30 L80,30 Q86,30 86,36 L86,56 C86,74 74,84 60,92 C46,84 34,74 34,56 Z", C)}
    <circle cx="60" cy="55" r="5.5" fill="${C}"/>`,
};
