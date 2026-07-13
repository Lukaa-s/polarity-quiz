// Restrictionniste — carré (questions q50 et q52), encre bleue.
// La barrière : la lisse rayée en diagonale sur ses deux poteaux.
export default {
  frame: "square",
  ink: "right",
  rot: -2.6,
  picto: ({ P, C, PAPER }) => `
    ${P("M38,66 L38,88 M82,52 L82,88", C)}
    ${P("M30,68 L90,48", C, 'stroke-width="10"')}
    <path d="M47,57 L53,71 M59,53 L65,67 M71,49 L77,63" fill="none" stroke="${PAPER}" stroke-width="4.5" stroke-linecap="butt"/>`,
};
