// src/utils/scoring.ts

export type AnswerMap = Record<string, number>;

export type QuestionDef = {
  id: string;
  text: string;
  explanation?: string;
  axis: string;
  leftPole: string;
  rightPole: string;
  favoredPole?: "left" | "right";
  weight?: number;
};

/**
 * Pour chaque question :
 * - on récupère l’index 0…6 de la réponse (0 = Tout à fait d’accord, …, 6 = Pas du tout d’accord)
 * - si favoredPole === "right", on inverse l’index (pour que "Tout à fait d’accord" signifie +10 à droite)
 * - on calcule linéairement leftPts + rightPts = 10 * weight
 * - on agrège par axis
 */

export function calculatePoleScores(
  answers: AnswerMap,
  questions: QuestionDef[]
): Record<string, { left: number; right: number }> {
  const result: Record<string, { left: number; right: number }> = {};
  const MAX_IDX = 6;   // 7 choix : index 0…6
  const MAX_PTS = 10;  // total de points par question

  questions.forEach((q) => {
    // 1) Récupère l'index ; défaut = neutre (3)
    let idx = answers[q.id] ?? Math.floor(MAX_IDX / 2);

    // 2) Si la question est "favorisée" à droite, on inverse l'index
    if (q.favoredPole === "right") {
      idx = MAX_IDX - idx;
    }

    // 3) Calcule les points bruts
    const w = q.weight ?? 1;
    const leftPts  = ((MAX_IDX - idx) / MAX_IDX) * MAX_PTS * w;
    const rightPts = (idx / MAX_IDX)       * MAX_PTS * w;

    // 4) Agrège dans le résultat
    if (!result[q.axis]) {
      result[q.axis] = { left: 0, right: 0 };
    }
    result[q.axis].left  += leftPts;
    result[q.axis].right += rightPts;
  });

  return result;
}
