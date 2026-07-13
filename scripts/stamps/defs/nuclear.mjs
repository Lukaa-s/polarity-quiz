// Pro-nucléaire — carré (prise de position, côté droite), encre bleue.
// L'atome : noyau plein, deux orbites croisées à ±45°.
export default {
  frame: "square",
  ink: "right",
  rot: 2.3,
  picto: ({ C }) => `
    <circle cx="60" cy="60" r="5" fill="${C}"/>
    <ellipse cx="60" cy="60" rx="32" ry="13.5" fill="none" stroke="${C}" stroke-width="4" transform="rotate(45 60 60)"/>
    <ellipse cx="60" cy="60" rx="32" ry="13.5" fill="none" stroke="${C}" stroke-width="4" transform="rotate(-45 60 60)"/>`,
};
