// Éco-guerrier·e — rond (axe écologie à gauche), encre rouge. La pousse enracinée.
export default {
  frame: "round",
  ink: "left",
  rot: -1.2,
  picto: ({ P, C }) => `
    ${P("M60,86 C60,72 60,62 60,46", C)}
    ${P("M60,64 C46,64 38,54 37,42 C51,42 59,50 60,64 Z", C)}
    ${P("M60,48 C74,48 82,38 83,26 C69,26 61,34 60,48 Z", C)}
    ${P("M42,86 L78,86", C)}`,
};
