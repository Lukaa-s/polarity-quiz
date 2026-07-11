// Tests de synchronisation de la surcouche i18n (FR canonique ↔ overlays EN).
// Ils verrouillent la classe de bugs « overlay désynchronisé » : un id de
// question/axe/badge manquant côté EN retomberait silencieusement sur le FR, et
// un profil du roster EN incomplet fausserait le scoring du comparateur.
import { describe, it, expect } from "vitest";
import questionsData from "../data/questions.json";
import questionsEn from "../data/questions.en.json";
import { ideologicalAxes } from "../data/axisexplaination";
import axesEn from "../data/axes.en.json";
import { badges } from "../data/badges";
import badgesEn from "../data/badges.en.json";
import { referenceProfiles } from "../data/referenceProfiles";
import { referenceProfilesEn } from "../data/referenceProfiles.en";
import { STRINGS } from "../i18n/strings";

const QUESTION_IDS = new Set((questionsData as { id: string }[]).map((q) => q.id));
const AXIS_IDS = new Set(ideologicalAxes.map((a) => a.id));
const BADGE_IDS = new Set(badges.map((b) => b.id));

describe("overlay questions.en.json", () => {
  const en = questionsEn as { id: string; text: string; explanation: string }[];

  it("couvre EXACTEMENT les ids de questions.json", () => {
    const enIds = en.map((q) => q.id);
    expect(new Set(enIds).size).toBe(enIds.length); // pas de doublon
    expect(new Set(enIds)).toEqual(QUESTION_IDS);
  });

  it("fournit un text et une explanation non vides pour chaque question", () => {
    for (const q of en) {
      expect(typeof q.text === "string" && q.text.trim().length > 0, `${q.id}.text`).toBe(true);
      expect(
        typeof q.explanation === "string" && q.explanation.trim().length > 0,
        `${q.id}.explanation`
      ).toBe(true);
    }
  });
});

describe("overlay axes.en.json", () => {
  const en = axesEn as Record<string, { axis: string; left: { label: string }; right: { label: string } }>;

  it("couvre EXACTEMENT les ids d'axes", () => {
    expect(new Set(Object.keys(en))).toEqual(AXIS_IDS);
  });

  it("fournit un libellé d'axe et de pôles pour chaque axe", () => {
    for (const [id, a] of Object.entries(en)) {
      expect(a.axis?.trim().length ?? 0, `${id}.axis`).toBeGreaterThan(0);
      expect(a.left?.label?.trim().length ?? 0, `${id}.left.label`).toBeGreaterThan(0);
      expect(a.right?.label?.trim().length ?? 0, `${id}.right.label`).toBeGreaterThan(0);
    }
  });
});

describe("overlay badges.en.json", () => {
  const en = badgesEn as Record<string, { label: string; description: string }>;

  it("couvre EXACTEMENT les ids de badges", () => {
    expect(new Set(Object.keys(en))).toEqual(BADGE_IDS);
  });

  it("fournit un label et une description pour chaque badge", () => {
    for (const [id, b] of Object.entries(en)) {
      expect(b.label?.trim().length ?? 0, `${id}.label`).toBeGreaterThan(0);
      expect(b.description?.trim().length ?? 0, `${id}.description`).toBeGreaterThan(0);
    }
  });
});

describe("roster anglophone referenceProfiles.en", () => {
  it("compte 14 profils", () => {
    expect(referenceProfilesEn.length).toBe(14);
  });

  it("a des ids uniques", () => {
    const ids = referenceProfilesEn.map((p) => p.id);
    expect(new Set(ids).size, `ids: ${ids.join(", ")}`).toBe(ids.length);
  });

  it("a des couleurs uniques", () => {
    const colors = referenceProfilesEn.map((p) => p.color);
    expect(colors.every((c) => typeof c === "string" && c.length > 0)).toBe(true);
    expect(new Set(colors).size, `colors: ${colors.join(", ")}`).toBe(colors.length);
  });

  it("chaque profil couvre EXACTEMENT les 101 ids de questions, en entiers 0–6", () => {
    for (const p of referenceProfilesEn) {
      const ids = Object.keys(p.answers);
      const missing = [...QUESTION_IDS].filter((qid) => !(qid in p.answers));
      const extra = ids.filter((qid) => !QUESTION_IDS.has(qid));
      expect(missing, `${p.id} ne répond pas à : ${missing.join(", ")}`).toEqual([]);
      expect(extra, `${p.id} répond à des ids inconnus : ${extra.join(", ")}`).toEqual([]);
      for (const [qid, v] of Object.entries(p.answers)) {
        expect(Number.isInteger(v) && v >= 0 && v <= 6, `${p.id}/${qid} = ${v}`).toBe(true);
      }
    }
  });

  it("inclut Obama (2012) avec des réponses identiques au profil FR canonique", () => {
    const en = referenceProfilesEn.find((p) => p.id === "obama_2012");
    const fr = referenceProfiles.find((p) => p.id === "obama_2012");
    expect(en, "obama_2012 absent du roster EN").toBeTruthy();
    expect(fr, "obama_2012 absent du roster FR").toBeTruthy();
    expect(en!.answers).toEqual(fr!.answers);
  });
});

describe("dictionnaire STRINGS", () => {
  it("les tables fr et en portent EXACTEMENT les mêmes clés", () => {
    const frKeys = Object.keys(STRINGS.fr).sort();
    const enKeys = Object.keys(STRINGS.en).sort();
    expect(enKeys).toEqual(frKeys);
  });

  it("aucune valeur vide dans l'une ou l'autre langue", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const [key, value] of Object.entries(STRINGS[locale])) {
        expect(typeof value === "string" && value.length > 0, `${locale}.${key}`).toBe(true);
      }
    }
  });
});
