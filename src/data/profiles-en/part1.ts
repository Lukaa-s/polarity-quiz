// src/data/profiles-en/part1.ts
// English-speaking reference profiles (part 1) — US progressive & center-left figures.
// Answer scale is identical to referenceProfiles.ts:
//   0 = "Tout à fait d'accord" (fully agree) … 3 = neutral … 6 = "Pas du tout d'accord" (fully disagree).
// Each answer is coded against the STATEMENT (favoredPole in questions.json), not the axis.

import type { ReferenceProfile } from "../referenceProfiles";

export const profilesEnPart1: ReferenceProfile[] = [
  {
    id: "bernie_sanders_2020",
    name: "Bernie Sanders (2020)",
    description:
      "Democratic-socialist left: state intervention and redistribution, worker power, anti-corporate stance; socially progressive; trade-skeptic and sovereigntist on globalization.",
    color: "#B45309",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 1,
      q2: 5,
      q3: 6,
      q4: 2,
      q5: 2,
      q6: 4,
      q7: 1,
      q8: 6,
      q9: 6,
      q10: 1,
      q11: 1,
      q97: 6,

      // Purpose of economic activity
      q12: 0,
      q13: 6,
      q14: 5,
      q15: 4,
      q16: 1,

      // --- WORK ---
      q17: 2,
      q18: 1,
      q19: 1,
      q20: 2,
      q21: 3,

      // --- AUTHORITY ---
      q22: 2,
      q23: 3,
      q24: 1,
      q25: 2,
      q26: 4,
      q27: 4,

      // --- DEMOCRACY ---
      q28: 4,
      q29: 2,
      q30: 2,
      q31: 2,
      q32: 4,
      q33: 3,
      q34: 4,

      // --- SOCIAL CHANGE ---
      q35: 2,
      q36: 2,
      q37: 3,
      q38: 4,
      q39: 3,
      q40: 1,

      // --- SOCIETAL PROGRESS ---
      q41: 5,
      q43: 6,
      q44: 4,
      q45: 1,
      q46: 2,
      q47: 2,
      q48: 5,
      q90: 4,
      q92: 1,
      q99: 1,

      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 4,
      q50: 5,
      q51: 3,
      q52: 4,
      q53: 2,
      q54: 2,
      q91: 3,

      // --- RELIGION ---
      q55: 2,
      q56: 1,
      q57: 4,
      q58: 3,
      q59: 4,
      q60: 4,

      // --- JUSTICE & SECURITY ---
      q61: 5,
      q62: 4,
      q63: 4,
      q64: 2,
      q65: 1,
      q66: 4,
      q67: 2,
      q68: 2,
      q98: 4,

      // --- ECOLOGY ---
      q69: 2,
      q70: 5,
      q71: 2,
      q72: 2,
      q73: 5,
      q74: 5,
      q89: 5,

      // --- PUBLIC LIBERTIES ---
      q75: 5,
      q76a: 2,
      q76b: 3,
      q77: 5,
      q78: 5,
      q79: 5,
      q80: 4,
      q94: 2,

      // --- TECHNOLOGY & FUTURE ---
      q81: 2,
      q82: 2,
      q83: 2,
      q84: 2,
      q86: 2,
      q88: 5,
      q93: 3,
      q95: 4,
      q96: 2,

      q100: 1,
      q101: 5,
      q102: 4,
      q103: 3,
    },
  },
  {
    id: "alexandria_ocasio_cortez_2024",
    name: "Alexandria Ocasio-Cortez (2024)",
    description:
      "Democratic-socialist and radical-ecologist left: Green New Deal, strong redistribution, decarceration and police reform, uncompromising social progressivism.",
    color: "#0F766E",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 1,
      q2: 5,
      q3: 6,
      q4: 2,
      q5: 2,
      q6: 4,
      q7: 1,
      q8: 6,
      q9: 6,
      q10: 1,
      q11: 1,
      q97: 6,

      // Purpose of economic activity
      q12: 1,
      q13: 6,
      q14: 5,
      q15: 4,
      q16: 1,

      // --- WORK ---
      q17: 2,
      q18: 1,
      q19: 2,
      q20: 2,
      q21: 4,

      // --- AUTHORITY ---
      q22: 2,
      q23: 3,
      q24: 1,
      q25: 4,
      q26: 4,
      q27: 4,

      // --- DEMOCRACY ---
      q28: 4,
      q29: 2,
      q30: 2,
      q31: 2,
      q32: 4,
      q33: 3,
      q34: 4,

      // --- SOCIAL CHANGE ---
      q35: 1,
      q36: 2,
      q37: 4,
      q38: 4,
      q39: 3,
      q40: 1,

      // --- SOCIETAL PROGRESS ---
      q41: 5,
      q43: 6,
      q44: 2,
      q45: 1,
      q46: 1,
      q47: 1,
      q48: 6,
      q90: 4,
      q92: 1,
      q99: 1,

      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 2,
      q50: 6,
      q51: 3,
      q52: 5,
      q53: 2,
      q54: 1,
      q91: 3,

      // --- RELIGION ---
      q55: 2,
      q56: 1,
      q57: 4,
      q58: 3,
      q59: 4,
      q60: 2,

      // --- JUSTICE & SECURITY ---
      q61: 6,
      q62: 4,
      q63: 5,
      q64: 2,
      q65: 1,
      q66: 4,
      q67: 1,
      q68: 1,
      q98: 2,

      // --- ECOLOGY ---
      q69: 2,
      q70: 6,
      q71: 2,
      q72: 2,
      q73: 6,
      q74: 6,
      q89: 4,

      // --- PUBLIC LIBERTIES ---
      q75: 5,
      q76a: 3,
      q76b: 3,
      q77: 6,
      q78: 6,
      q79: 5,
      q80: 5,
      q94: 2,

      // --- TECHNOLOGY & FUTURE ---
      q81: 2,
      q82: 2,
      q83: 2,
      q84: 3,
      q86: 2,
      q88: 5,
      q93: 3,
      q95: 4,
      q96: 1,

      q100: 1,
      q101: 5,
      q102: 3,
      q103: 4,
    },
  },
  {
    id: "joe_biden_2020",
    name: "Joe Biden (2020)",
    description:
      "Moderate center-left: regulated capitalism, institutionalist and Atlanticist, socially progressive but more security-minded on crime, policing and surveillance.",
    color: "#6D28D9",
    isReference: true,
    answers: {
      // --- PROPERTY & ECONOMY ---
      q1: 2,
      q2: 2,
      q3: 2,
      q4: 4,
      q5: 2,
      q6: 2,
      q7: 2,
      q8: 5,
      q9: 4,
      q10: 2,
      q11: 4,
      q97: 5,

      // Purpose of economic activity
      q12: 4,
      q13: 4,
      q14: 2,
      q15: 2,
      q16: 2,

      // --- WORK ---
      q17: 5,
      q18: 2,
      q19: 1,
      q20: 2,
      q21: 2,

      // --- AUTHORITY ---
      q22: 4,
      q23: 2,
      q24: 2,
      q25: 2,
      q26: 2,
      q27: 2,

      // --- DEMOCRACY ---
      q28: 2,
      q29: 4,
      q30: 4,
      q31: 4,
      q32: 2,
      q33: 2,
      q34: 2,

      // --- SOCIAL CHANGE ---
      q35: 3,
      q36: 5,
      q37: 2,
      q38: 2,
      q39: 2,
      q40: 4,

      // --- SOCIETAL PROGRESS ---
      q41: 4,
      q43: 5,
      q44: 2,
      q45: 2,
      q46: 2,
      q47: 2,
      q48: 4,
      q90: 5,
      q92: 1,
      q99: 1,

      // --- SOVEREIGNTY & IMMIGRATION ---
      q49: 4,
      q50: 4,
      q51: 4,
      q52: 4,
      q53: 2,
      q54: 2,
      q91: 1,

      // --- RELIGION ---
      q55: 3,
      q56: 2,
      q57: 2,
      q58: 4,
      q59: 2,
      q60: 2,

      // --- JUSTICE & SECURITY ---
      q61: 3,
      q62: 2,
      q63: 3,
      q64: 4,
      q65: 2,
      q66: 2,
      q67: 3,
      q68: 3,
      q98: 4,

      // --- ECOLOGY ---
      q69: 4,
      q70: 2,
      q71: 5,
      q72: 4,
      q73: 3,
      q74: 3,
      q89: 2,

      // --- PUBLIC LIBERTIES ---
      q75: 2,
      q76a: 2,
      q76b: 2,
      q77: 4,
      q78: 4,
      q79: 4,
      q80: 2,
      q94: 4,

      // --- TECHNOLOGY & FUTURE ---
      q81: 3,
      q82: 2,
      q83: 2,
      q84: 2,
      q86: 2,
      q88: 4,
      q93: 2,
      q95: 2,
      q96: 2,

      q100: 2,
      q101: 2,
      q102: 5,
      q103: 3,
    },
  },
];
