// Technosceptique averti·e — rond (axe technologie à gauche), encre rouge.
// Le cordon débranché : la fiche à deux broches face à la prise murale,
// l'écart entre les deux se lit au premier regard.
export default {
  frame: "round",
  ink: "left",
  rot: 2.5,
  picto: ({ P, C }) => `
    <circle cx="83" cy="45" r="14" fill="none" stroke="${C}" stroke-width="5.5"/>
    <circle cx="79" cy="41" r="2.5" fill="${C}"/>
    <circle cx="87" cy="49" r="2.5" fill="${C}"/>
    <rect x="34" y="62" width="20" height="16" rx="6" fill="none" stroke="${C}" stroke-width="5.5" transform="rotate(-45 44 70)"/>
    ${P("M52,54 L59,47 M60,62 L67,55", C, 'stroke-width="4.5"')}
    ${P("M36,78 C30,84 34,90 28,92", C, 'stroke-width="4.5"')}`,
};
