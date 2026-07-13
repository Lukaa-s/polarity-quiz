// Social-libéral·e — rond (équilibre entre pôles), encre noire. La réglette centrée.
export default {
  frame: "round",
  ink: "meta",
  rot: -1.6,
  picto: ({ P, C }) => `
    ${P("M26,66 L94,66", C)}
    ${P("M28,59 L28,73 M92,59 L92,73", C, 'stroke-width="4.5"')}
    ${P("M60,66 L60,78", C, 'stroke-width="3.5"')}
    <path d="M60,43 L69,53.5 L60,64 L51,53.5 Z" fill="${C}"/>`,
};
