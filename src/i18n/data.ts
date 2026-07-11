// src/i18n/data.ts
//
// Fusion « données canoniques FR + overlay EN » pour l'affichage.
//
// Contrat : les DONNÉES restent françaises et sont la source de vérité du
// scoring et des jointures par id (qui ne changent JAMAIS). L'anglais est une
// SURCOUCHE d'affichage : quand la locale vaut « en », on superpose, par id, les
// champs de chaîne fournis par les overlays. Tout overlay vide/partiel retombe
// sur le français, champ par champ — l'app reste fonctionnelle même overlays vides.
//
// Les hooks renvoient exactement les MÊMES formes que les données canoniques,
// afin que les composants consommateurs (ex. ResultEnhanced en vague 2) puissent
// remplacer un import direct par le hook sans autre changement.
import { useMemo } from "react";
import { useLocale } from "./LocaleContext";
import questionsData from "../data/questions.json";
import questionsEn from "../data/questions.en.json";
import { ideologicalAxes } from "../data/axisexplaination";
import axesEn from "../data/axes.en.json";
import { badges as badgesFr, type Badge } from "../data/badges";
import badgesEn from "../data/badges.en.json";
import { referenceProfiles, type ReferenceProfile } from "../data/referenceProfiles";
import { referenceProfilesEn } from "../data/referenceProfiles.en";
import type { QuestionDef } from "../utils/scoring";
import type { Locale } from "./strings";

// ── Formes des overlays (tous les champs sont optionnels : partiel toléré) ────
type QuestionOverlay = { id: string; text?: string; explanation?: string };
type PoleOverlay = { label?: string; response?: string };
type AxisOverlay = {
  axis?: string;
  question?: string;
  left?: PoleOverlay;
  right?: PoleOverlay;
};
type BadgeOverlay = { label?: string; description?: string };

// `as unknown as …` : robuste face aux placeholders vides (`[]`, `{}`) comme aux
// versions remplies par les autres agents (les champs superflus sont ignorés).
const QUESTIONS_EN = questionsEn as unknown as QuestionOverlay[];
const AXES_EN = axesEn as unknown as Record<string, AxisOverlay>;
const BADGES_EN = badgesEn as unknown as Record<string, BadgeOverlay>;

type Axis = (typeof ideologicalAxes)[number];

// ── Fusions pures (testables, sans hook) ──────────────────────────────────────

export function localizeQuestions(locale: Locale): QuestionDef[] {
  const canonical = questionsData as QuestionDef[];
  if (locale !== "en") return canonical;
  const overlay = new Map(QUESTIONS_EN.map((q) => [q.id, q]));
  return canonical.map((q) => {
    const o = overlay.get(q.id);
    if (!o) return q;
    return {
      ...q,
      text: o.text ?? q.text,
      explanation: o.explanation ?? q.explanation,
    };
  });
}

export function localizeAxes(locale: Locale): Axis[] {
  if (locale !== "en") return ideologicalAxes;
  return ideologicalAxes.map((a) => {
    const o = AXES_EN[a.id];
    if (!o) return a;
    return {
      ...a,
      axis: o.axis ?? a.axis,
      question: o.question ?? a.question,
      left: {
        ...a.left,
        label: o.left?.label ?? a.left.label,
        response: o.left?.response ?? a.left.response,
      },
      right: {
        ...a.right,
        label: o.right?.label ?? a.right.label,
        response: o.right?.response ?? a.right.response,
      },
    };
  });
}

export function localizeBadges(locale: Locale): Badge[] {
  if (locale !== "en") return badgesFr;
  // `test` (fonction de scoring) et `icon` sont préservés via le spread : seuls
  // les libellés d'affichage sont superposés.
  return badgesFr.map((b) => {
    const o = BADGES_EN[b.id];
    if (!o) return b;
    return { ...b, label: o.label ?? b.label, description: o.description ?? b.description };
  });
}

export function localizeProfiles(locale: Locale): ReferenceProfile[] {
  // Cas à part des autres overlays : le roster anglophone est un ENSEMBLE DE
  // FIGURES DISTINCT (avec ses propres réponses), pas une traduction des profils
  // FR. En « en », on remplace donc entièrement le roster (repli sur FR tant que
  // le roster EN est vide, pour rester fonctionnel). Le scoring ne change jamais :
  // les réponses sont codées contre les mêmes ids de questions.
  if (locale === "en" && referenceProfilesEn.length > 0) return referenceProfilesEn;
  return referenceProfiles;
}

// ── Hooks (mémoïsés par locale) ───────────────────────────────────────────────

export function useLocalizedQuestions(): QuestionDef[] {
  const { locale } = useLocale();
  return useMemo(() => localizeQuestions(locale), [locale]);
}

export function useLocalizedAxes(): Axis[] {
  const { locale } = useLocale();
  return useMemo(() => localizeAxes(locale), [locale]);
}

export function useLocalizedBadges(): Badge[] {
  const { locale } = useLocale();
  return useMemo(() => localizeBadges(locale), [locale]);
}

export function useLocalizedProfiles(): ReferenceProfile[] {
  const { locale } = useLocale();
  return useMemo(() => localizeProfiles(locale), [locale]);
}
