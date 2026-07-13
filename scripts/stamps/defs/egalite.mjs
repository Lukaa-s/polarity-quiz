// Égalitariste — rond (axe égalité côté redistribution), encre rouge.
// Le signe égal : deux barres épaisses, rien d'autre.
export default {
  frame: "round",
  ink: "left",
  rot: -1,
  picto: ({ P, C }) => `
    ${P("M38,51 L82,51", C, 'stroke-width="7.5"')}
    ${P("M38,69 L82,69", C, 'stroke-width="7.5"')}`,
};
