// Propriétaire de ses jours — rond (axe temps libre), encre rouge. Le hamac.
export default {
  frame: "round",
  ink: "left",
  rot: -1.4,
  picto: ({ P, C }) => `
    ${P("M31,42 L31,86 M89,42 L89,86", C)}
    ${P("M31,48 L42,60 M89,48 L78,60", C, 'stroke-width="3.5"')}
    ${P("M42,60 C50,69 70,69 78,60 C70,76 50,76 42,60 Z", C, 'stroke-width="4.5"')}
    ${P("M52,72 L52,78 M60,74 L60,80 M68,72 L68,78", C, 'stroke-width="3.5"')}`,
};
