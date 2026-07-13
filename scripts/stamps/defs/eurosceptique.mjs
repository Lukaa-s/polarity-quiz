// Euro-sceptique — carré (prise de position, côté droite), encre bleue.
// La ronde qui se défait : sept points en cercle, le huitième s'échappe.
const dot = (x, y, r = 4.3) =>
  `M ${x - r},${y} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0`;

export default {
  frame: "square",
  ink: "right",
  rot: -2.1,
  picto: ({ P, C }) => `
    <path d="${dot(75, 64)} ${dot(69.4, 77.4)} ${dot(56, 83)} ${dot(42.6, 77.4)} ${dot(37, 64)} ${dot(42.6, 50.6)} ${dot(56, 45)}" fill="${C}"/>
    <circle cx="81" cy="39" r="4.5" fill="${C}"/>
    ${P("M67.3,48.5 L71.5,44.3 M71.5,52.7 L75.7,48.5", C, 'stroke-width="3.5"')}`,
};
