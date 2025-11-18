import { badges, Badge } from "../data/badges";
import type { QuestionDef } from "./scoring";

/**
 * Mélange un tableau de manière déterministe à partir d'une seed.
 */
function seededShuffle<T>(array: T[], seed: number): T[] {
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Évalue chaque badge via badge.test({ answers, axisScores })
 * et renvoie la liste de ceux qui passent, ou tous les badges si dev=true.
 * Les badges sont ensuite mélangés avec une seed.
 */
export function evaluateBadges(
  answers: Record<string, number>,
  _questions: QuestionDef[],
  axisScores: Record<string, { left: number; right: number }>,
  dev = false,
  seed = 42
): Badge[] {
  const evaluated = dev
    ? badges
    : badges.filter((badge) => badge.test({ answers, axisScores }));
  return seededShuffle(evaluated, seed);
}

/**
 * Renvoie la liste de tous les badges disponibles, sans les évaluer,
 * mais mélangés avec une seed.
 */
export function allBadges(seed = 42): Badge[] {
  return seededShuffle(badges, seed);
}
