// Citoyen·ne du monde — rond (axe nation/monde côté ouverture), encre rouge.
// Le globe : cercle, équateur, méridien en ellipse verticale.
export default {
  frame: "round",
  ink: "left",
  rot: -1.5,
  picto: ({ P, C }) => `
    <circle cx="60" cy="60" r="21" fill="none" stroke="${C}" stroke-width="5.5"/>
    ${P("M39,60 L81,60", C, 'stroke-width="3.5"')}
    ${P("M60,39 A9.5,21 0 0 1 60,81 A9.5,21 0 0 1 60,39", C, 'stroke-width="3.5"')}`,
};
