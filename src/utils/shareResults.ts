/**
 * Utilitaires pour partager les résultats via URL
 *
 * Deux formats de paramètre `?results=` coexistent :
 * - v2 (émis) : "v2_" + un caractère par question dans l'ordre de questions.json
 *   ("0"–"6" = réponse, "-" = non répondue). ~110 caractères au lieu de ~2 200
 *   pour l'ancien JSON base64 : l'URL survit aux messageries qui tronquent.
 *   Le nom éventuel voyage dans le paramètre `name` séparé.
 * - legacy (toujours décodé) : JSON base64 { answers, name, timestamp }, pour
 *   ne pas casser les liens déjà partagés.
 *
 * Tout ce qui vient de l'URL est une entrée non fiable : les réponses sont
 * filtrées (ids de questions connus, entiers 0–6 uniquement) et le nom est
 * borné et nettoyé avant d'atteindre le rendu ou le scoring.
 */

import questionsData from "../data/questions.json";
import { translate, type Locale } from "../i18n/strings";

export type SharedResults = {
  answers: Record<string, number>;
  name?: string;
  timestamp?: number;
};

// Ordre canonique = ordre du fichier questions.json (stable, versionné).
const QUESTION_IDS: string[] = (questionsData as { id: string }[]).map((q) => q.id);
const QUESTION_ID_SET = new Set(QUESTION_IDS);

const V2_PREFIX = "v2_";
const MAX_NAME_LENGTH = 40;
// Garde-fou contre les payloads legacy anormalement gros (le vrai fait ~2,2 Ko).
const MAX_LEGACY_ENCODED_LENGTH = 16384;

/** Nom affichable : borné, sans caractères de contrôle ni espaces parasites. */
export function sanitizeShareName(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  // eslint-disable-next-line no-control-regex
  const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, MAX_NAME_LENGTH);
  return cleaned || undefined;
}

/**
 * Ne conserve que des réponses valides : id de question connu, entier 0–6.
 * Exporté pour réutilisation par les autres entrées non fiables (progression et
 * profils sauvegardés dans localStorage), afin d'appliquer le même filtrage.
 */
export function sanitizeAnswers(raw: unknown): Record<string, number> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!QUESTION_ID_SET.has(key)) continue;
    if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 6) continue;
    out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : null;
}

/**
 * Encode les réponses au format compact v2 (voir en-tête du fichier).
 */
export function encodeResults(answers: Record<string, number>): string {
  const digits = QUESTION_IDS.map((id) => {
    const v = answers[id];
    return typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 6 ? String(v) : "-";
  }).join("");
  return `${V2_PREFIX}${digits}`;
}

function decodeResultsV2(encoded: string, name?: string): SharedResults | null {
  const digits = encoded.slice(V2_PREFIX.length);
  if (digits.length === 0 || digits.length > QUESTION_IDS.length) return null;
  if (!/^[0-6-]+$/.test(digits)) return null;

  const answers: Record<string, number> = {};
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === "-") continue;
    answers[QUESTION_IDS[i]] = Number(digits[i]);
  }
  if (Object.keys(answers).length === 0) return null;

  return { answers, name: sanitizeShareName(name) };
}

function decodeResultsLegacy(encoded: string): SharedResults | null {
  if (encoded.length > MAX_LEGACY_ENCODED_LENGTH) return null;
  const jsonString = decodeURIComponent(atob(encoded));
  const data = JSON.parse(jsonString) as Record<string, unknown>;

  const answers = sanitizeAnswers(data?.answers);
  if (!answers) return null;

  return {
    answers,
    name: sanitizeShareName(data?.name),
    timestamp: typeof data?.timestamp === "number" ? data.timestamp : undefined,
  };
}

/**
 * Décode les résultats depuis l'URL (format v2 ou legacy base64).
 * @param nameParam Valeur du paramètre `?name=` (format v2 uniquement)
 */
export function decodeResults(encoded: string, nameParam?: string | null): SharedResults | null {
  try {
    if (encoded.startsWith(V2_PREFIX)) {
      return decodeResultsV2(encoded, nameParam ?? undefined);
    }
    return decodeResultsLegacy(encoded);
  } catch (error) {
    console.error("Erreur lors du décodage des résultats:", error);
    return null;
  }
}

/**
 * Génère l'URL de partage complète
 */
export function generateShareURL(answers: Record<string, number>, name?: string): string {
  const encoded = encodeResults(answers);
  const safeName = sanitizeShareName(name);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?results=${encoded}${safeName ? `&name=${encodeURIComponent(safeName)}` : ""}`;
}

/**
 * Copie le texte dans le presse-papier
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Erreur lors de la copie:', error);
    return false;
  }
}

/**
 * Accroche facultative injectée dans le message pré-rempli : la conviction la
 * plus forte et la figure la plus proche donnent au destinataire une raison
 * d'ouvrir le lien (« Et vous, vous êtes où ? ») là où le message générique
 * n'en donnait aucune.
 */
export type ShareHook = {
  pole: string;
  pct: number;
  figure: string;
};

/**
 * Génère le texte de partage pour les réseaux sociaux (localisé).
 * Le `locale` par défaut reste « fr » : les appelants historiques (et les liens
 * générés côté FR) ne changent pas de comportement. Sans `hook`, le message
 * générique historique est conservé.
 */
export function getShareText(name?: string, locale: Locale = "fr", hook?: ShareHook): string {
  if (hook) {
    const vars = { pole: hook.pole, pct: String(hook.pct), figure: hook.figure };
    return name
      ? translate(locale, "share.text.hook.named", { ...vars, name })
      : translate(locale, "share.text.hook.anon", vars);
  }
  return name
    ? translate(locale, "share.text.named", { name })
    : translate(locale, "share.text.anon");
}

/**
 * Génère l'URL de partage Twitter/X
 */
export function getTwitterShareURL(shareURL: string, name?: string, locale: Locale = "fr", hook?: ShareHook): string {
  const text = getShareText(name, locale, hook);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareURL)}`;
}

/**
 * Génère l'URL de partage WhatsApp
 */
export function getWhatsAppShareURL(shareURL: string, name?: string, locale: Locale = "fr", hook?: ShareHook): string {
  const text = `${getShareText(name, locale, hook)} ${shareURL}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Génère l'URL de partage Facebook
 */
export function getFacebookShareURL(shareURL: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
}

/**
 * Génère l'URL de partage Discord
 */
export function getDiscordShareURL(shareURL: string, name?: string, locale: Locale = "fr", hook?: ShareHook): string {
  const text = getShareText(name, locale, hook);
  // Discord n'a pas d'URL de partage direct, on copie juste le message formaté
  return `${text}\n${shareURL}`;
}

/**
 * Utilise l'API Web Share native (mobile principalement)
 */
export async function shareViaWebAPI(shareURL: string, name?: string, locale: Locale = "fr", hook?: ShareHook): Promise<boolean> {
  if (!navigator.share) {
    return false; // API non supportée
  }

  try {
    await navigator.share({
      title: translate(locale, "share.webTitle"),
      text: getShareText(name, locale, hook),
      url: shareURL,
    });
    return true;
  } catch (error) {
    // L'utilisateur a annulé le partage, c'est normal
    if ((error as Error).name !== 'AbortError') {
      console.error('Erreur lors du partage:', error);
    }
    return false;
  }
}
