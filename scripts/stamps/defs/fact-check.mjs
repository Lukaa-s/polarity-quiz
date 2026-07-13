// Chasseur·se d'infox — carré (question q76b), encre bleue.
// La loupe posée sur l'infox : le verre, le manche, la croix repérée.
export default {
  frame: "square",
  ink: "right",
  rot: -1.3,
  picto: ({ P, C }) => `
    <circle cx="54" cy="52" r="17" fill="none" stroke="${C}" stroke-width="5.5"/>
    ${P("M67,65 L84,82", C, 'stroke-width="7"')}
    ${P("M49,47 L59,57 M59,47 L49,57", C, 'stroke-width="3.5"')}`,
};
