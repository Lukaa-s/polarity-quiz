// Équilibriste — losange (style de réponse), encre noire.
// Le balancier : pivot triangulaire, barre posée dessus, deux poids pleins.
export default {
  frame: "losange",
  ink: "meta",
  rot: -1.2,
  picto: ({ P, C }) => `
    <path d="M60,58 L68,74 L52,74 Z" fill="${C}"/>
    ${P("M36,58 L84,58", C)}
    <circle cx="36" cy="51" r="4.5" fill="${C}"/>
    <circle cx="84" cy="51" r="4.5" fill="${C}"/>`,
};
