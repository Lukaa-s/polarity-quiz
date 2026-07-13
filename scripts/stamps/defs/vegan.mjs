// Ami des bêtes — carré (question q90), encre rouge.
// La patte : le coussinet plein, quatre doigts en arc au-dessus.
export default {
  frame: "square",
  ink: "left",
  rot: -1.1,
  picto: ({ C }) => `
    <path d="M60,57 C70,57 79,64 78,73 C77,83 68,88 60,88 C52,88 43,83 42,73 C41,64 50,57 60,57 Z" fill="${C}"/>
    <circle cx="38" cy="50" r="5" fill="${C}"/>
    <circle cx="51" cy="41" r="5.5" fill="${C}"/>
    <circle cx="69" cy="41" r="5.5" fill="${C}"/>
    <circle cx="82" cy="50" r="5" fill="${C}"/>`,
};
