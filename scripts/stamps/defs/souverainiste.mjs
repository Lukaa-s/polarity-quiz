// Souverainiste — rond (position d'axe, côté droite), encre bleue. L'Hexagone, point sur la capitale.
export default {
  frame: "round",
  ink: "right",
  rot: 2.2,
  picto: ({ P, C }) => `
    ${P("M60,26 L89.4,43 L89.4,77 L60,94 L30.6,77 L30.6,43 Z", C)}
    <circle cx="60" cy="60" r="6" fill="${C}"/>`,
};
