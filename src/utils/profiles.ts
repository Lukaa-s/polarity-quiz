// src/utils/profiles.ts
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

function read(): SavedProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedProfile[]) : [];
  } catch {
    return [];
  }
}

function write(list: SavedProfile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listProfiles(): SavedProfile[] {
  return read();
}

export function saveProfile(input: {
  name: string;
  answers: AnswerMap;
  seedKey?: string;
}): SavedProfile {
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
  write(list);
  return profile;
}

export function deleteProfile(id: string) {
  write(read().filter((p) => p.id !== id));
}
