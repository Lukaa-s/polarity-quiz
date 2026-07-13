// Européen·ne convaincu·e — carré (question q91), encre rouge.
// La ronde d'étoiles : huit losanges pleins en cercle, centre vide.
const star = (x, y, s = 4.5) => `M ${x - s},${y} L ${x},${y - s} L ${x + s},${y} L ${x},${y + s} Z`;
const ring = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4 - Math.PI / 2;
  return star(+(60 + 22 * Math.cos(a)).toFixed(2), +(60 + 22 * Math.sin(a)).toFixed(2));
}).join(" ");
export default {
  frame: "square",
  ink: "left",
  rot: 1.1,
  picto: ({ C }) => `
    <path d="${ring}" fill="${C}"/>`,
};
