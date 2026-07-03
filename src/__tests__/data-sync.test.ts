// Tests de synchronisation des données : questions ↔ axes ↔ profils ↔ badges.
// Ils verrouillent la classe de bugs « clé de jointure désynchronisée »
// (ex. apostrophe droite vs typographique) qui rendait 2 axes invisibles.
import { describe, it, expect } from "vitest";
import questionsData from "../data/questions.json";
import { ideologicalAxes } from "../data/axisexplaination";
import { referenceProfiles } from "../data/referenceProfiles";
import { calculatePoleScores, axisIdForName, QuestionDef } from "../utils/scoring";
import { badges } from "../data/badges";

const questions = questionsData as QuestionDef[];
const normalize = (s: string) => s.replace(/’/g, "'").trim();
const AXIS_IDS = new Set(ideologicalAxes.map((a) => a.id));

describe("questions.json ↔ axisexplaination", () => {
  it("chaque question référence un axe connu", () => {
    for (const q of questions) {
      const id = axisIdForName(q.axis);
      expect(AXIS_IDS.has(id), `q.axis inconnu pour ${q.id} : « ${q.axis} »`).toBe(true);
    }
  });

  it("les pôles de chaque question correspondent aux libellés de l'axe", () => {
    const byId = new Map(ideologicalAxes.map((a) => [a.id, a]));
    for (const q of questions) {
      const axis = byId.get(axisIdForName(q.axis))!;
      expect(normalize(q.leftPole), `leftPole de ${q.id}`).toBe(normalize(axis.left.label));
      expect(normalize(q.rightPole), `rightPole de ${q.id}`).toBe(normalize(axis.right.label));
    }
  });

  it("chaque axe a au moins une question et un favoredPole valide partout", () => {
    const counts = new Map<string, number>();
    for (const q of questions) {
      expect(["left", "right"]).toContain(q.favoredPole);
      const id = axisIdForName(q.axis);
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    for (const a of ideologicalAxes) {
      expect(counts.get(a.id) ?? 0, `axe sans question : ${a.id}`).toBeGreaterThan(0);
    }
  });

  it("les ids de questions sont uniques", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("scoring", () => {
  it("agrège par id d'axe et produit les 14 axes pour un jeu complet de réponses", () => {
    const answers = Object.fromEntries(questions.map((q) => [q.id, 0]));
    const scores = calculatePoleScores(answers, questions);
    expect(Object.keys(scores).sort()).toEqual([...AXIS_IDS].sort());
  });

  it("inverse bien les questions favoredPole=right", () => {
    const q = questions.find((x) => x.favoredPole === "right" && (x.weight ?? 1) > 0)!;
    const scores = calculatePoleScores({ [q.id]: 0 }, [q]);
    const s = scores[axisIdForName(q.axis)];
    expect(s.right).toBeGreaterThan(s.left);
  });

  it("réponse neutre = 50/50 sur l'axe", () => {
    const q = questions.find((x) => (x.weight ?? 1) > 0)!;
    const scores = calculatePoleScores({ [q.id]: 3 }, [q]);
    const s = scores[axisIdForName(q.axis)];
    expect(s.left).toBeCloseTo(s.right, 6);
  });
});

describe("referenceProfiles ↔ questions.json", () => {
  const questionIds = new Set(questions.map((q) => q.id));

  it("chaque réponse de profil référence une question existante", () => {
    for (const p of referenceProfiles) {
      for (const qid of Object.keys(p.answers)) {
        expect(questionIds.has(qid), `${p.id} répond à ${qid} qui n'existe pas`).toBe(true);
      }
    }
  });

  it("chaque profil couvre toutes les questions", () => {
    for (const p of referenceProfiles) {
      const missing = [...questionIds].filter((qid) => !(qid in p.answers));
      expect(missing, `${p.id} ne répond pas à : ${missing.join(", ")}`).toEqual([]);
    }
  });

  it("les réponses sont des entiers entre 0 et 6", () => {
    for (const p of referenceProfiles) {
      for (const [qid, v] of Object.entries(p.answers)) {
        expect(Number.isInteger(v) && v >= 0 && v <= 6, `${p.id}/${qid} = ${v}`).toBe(true);
      }
    }
  });
});

describe("badges", () => {
  it("les badges ne consultent que des ids d'axes valides", () => {
    const answers = Object.fromEntries(questions.map((q) => [q.id, 0]));
    const scores = calculatePoleScores(answers, questions);
    for (const b of badges) {
      const requested: string[] = [];
      const proxy = new Proxy(scores, {
        get(target, key: string) {
          requested.push(key);
          return target[key];
        },
      });
      b.test({ answers, axisScores: proxy });
      for (const key of requested) {
        expect(AXIS_IDS.has(key), `badge ${b.id} consulte la clé « ${key} »`).toBe(true);
      }
    }
  });

  it("aucun badge ne plante, ni sur réponses complètes ni sur réponses vides", () => {
    const fullAnswers = Object.fromEntries(questions.map((q) => [q.id, 0]));
    const fullScores = calculatePoleScores(fullAnswers, questions);
    for (const b of badges) {
      expect(() => b.test({ answers: fullAnswers, axisScores: fullScores }), b.id).not.toThrow();
      expect(() => b.test({ answers: {}, axisScores: {} }), `${b.id} (vide)`).not.toThrow();
    }
  });

  it("aucun badge n'est décerné sur des réponses vides", () => {
    for (const b of badges) {
      expect(b.test({ answers: {}, axisScores: {} }), b.id).toBe(false);
    }
  });

  it("chaque badge est obtenable : il existe un jeu de réponses uniforme qui le déclenche", () => {
    // Balayage grossier : toutes les réponses à la même valeur v ∈ [0..6],
    // ou moitié 0 / moitié 6. Ne prouve pas l'inverse, mais détecte les badges
    // structurellement morts (clé d'axe cassée, seuil impossible).
    const answerSets: Record<string, number>[] = [];
    for (let v = 0; v <= 6; v++) {
      answerSets.push(Object.fromEntries(questions.map((q) => [q.id, v])));
    }
    answerSets.push(
      Object.fromEntries(questions.map((q, i) => [q.id, i % 2 === 0 ? 0 : 6]))
    );
    answerSets.push(
      Object.fromEntries(questions.map((q) => [q.id, q.favoredPole === "left" ? 0 : 6]))
    );
    answerSets.push(
      Object.fromEntries(questions.map((q) => [q.id, q.favoredPole === "left" ? 6 : 0]))
    );
    // Profil croisé : écologiste à gauche, tout le reste à droite
    // (nécessaire pour des badges combinés comme productiviste_vert).
    answerSets.push(
      Object.fromEntries(
        questions.map((q) => {
          const wantLeft = axisIdForName(q.axis) === "ecology";
          const towardLeft = q.favoredPole === "left" ? 0 : 6;
          const towardRight = q.favoredPole === "left" ? 6 : 0;
          return [q.id, wantLeft ? towardLeft : towardRight];
        })
      )
    );
    const unreachable = badges.filter(
      (b) =>
        !answerSets.some((answers) =>
          b.test({ answers, axisScores: calculatePoleScores(answers, questions) })
        )
    );
    expect(unreachable.map((b) => b.id)).toEqual([]);
  });
});
