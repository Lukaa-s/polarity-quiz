// Médecine génomique — carré (prise de position, côté droite), encre bleue.
// L'hélice ADN : deux brins sinusoïdaux croisés, trois barreaux fins.
export default {
  frame: "square",
  ink: "right",
  rot: 1.9,
  picto: ({ P, C }) => `
    ${P("M47,32 C47,44 73,50 73,60 C73,70 47,76 47,88", C)}
    ${P("M73,32 C73,44 47,50 47,60 C47,70 73,76 73,88", C)}
    ${P("M50,36 L70,36 M49,60 L71,60 M50,84 L70,84", C, 'stroke-width="3.5"')}`,
};
