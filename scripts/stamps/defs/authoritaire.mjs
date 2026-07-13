// Autoritaire — carré (questions q25 et suivantes), encre bleue.
// Les chevrons de grade : trois galons emboîtés, pointe en haut.
export default {
  frame: "square",
  ink: "right",
  rot: 2.7,
  picto: ({ P, C }) => `
    ${P("M38,48 L60,32 L82,48", C)}
    ${P("M38,66 L60,50 L82,66", C)}
    ${P("M38,84 L60,68 L82,84", C)}`,
};
