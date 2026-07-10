// src/utils/profiles.ts
import { sanitizeAnswers } from "./shareResults";

export type AnswerMap = Record<string, number>;

export type SavedProfile = {
  id: string;
  name: string;
  createdAtISO: string;
  seedKey?: string;         // optionnel: clé de seed du jour (si tu l'utilises)
  answers: AnswerMap;       // ex: { "q1":0, "q2":6, ... }
  color?: string;          // Couleur pour le graphique
  isReference?: boolean;   // True si profil de référence (politicien)
};

const STORAGE_KEY = "poliquiz_profiles_v1";

// Garde : un localStorage corrompu (JSON valide mais pas un profil attendu)
// ne doit pas faire planter la page résultats. On valide id/name/answers.
function isSavedProfile(p: unknown): p is SavedProfile {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    !!o.answers &&
    typeof o.answers === "object" &&
    !Array.isArray(o.answers)
  );
}

function read(): SavedProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Doit être un tableau ; chaque entrée est validée et ses réponses assainies
    // (mêmes règles que le partage : ids connus, entiers 0–6).
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(isSavedProfile)
      .map((p) => ({ ...p, answers: sanitizeAnswers(p.answers) ?? {} }));
  } catch {
    return [];
  }
}

// Renvoie true si l'écriture a réellement persisté (false = localStorage
// indisponible : navigation privée, quota dépassé, etc.).
function write(list: SavedProfile[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function listProfiles(): SavedProfile[] {
  return read();
}

// Renvoie true si le profil a bien été enregistré, false sinon.
export function saveProfile(input: {
  name: string;
  answers: AnswerMap;
  seedKey?: string;
}): boolean {
  const id =
    globalThis.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2);
  const profile: SavedProfile = {
    id,
    name: input.name,
    answers: input.answers,
    seedKey: input.seedKey,
    createdAtISO: new Date().toISOString(),
  };
  const list = read();
  list.unshift(profile); // plus récent d'abord
  return write(list);
}

export function deleteProfile(id: string) {
  write(read().filter((p) => p.id !== id));
}
