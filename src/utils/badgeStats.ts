/**
 * Rareté RÉELLE des badges, mesurée via les compteurs publics GoatCounter.
 *
 * Écriture : à chaque complétion du test, analytics.ts émet un événement
 * « dénominateur » `/events/badges-computed` puis un événement
 * `/events/badge-<id>` par badge débloqué (trackBadgesUnlocked). Les deux
 * partent du même code au même instant : les ratios sont cohérents dès le
 * premier jour, sans dépendre de l'historique de `test_completed`.
 *
 * Lecture : endpoint public `<origine>/counter/<path>.json` (répond CORS `*`,
 * déjà couvert par le connect-src de vercel.json). Nécessite le réglage
 * GoatCounter « Public access » ≥ “counter”. Tout échec — réglage absent,
 * adblocker, offline, volume encore insuffisant — retombe SANS BRUIT sur les
 * raretés estimées à la main de badges.tsx (le repli, pas la référence).
 */
import { useEffect, useMemo, useState } from "react";
import type { Badge } from "../data/badges";

/** Chemin GoatCounter du dénominateur (complétions avec badges calculés). */
export const BASELINE_EVENT_PATH = "/events/badges-computed";
/** En-dessous de ce nombre de complétions, les ratios sont trop bruités. */
export const MIN_BASELINE = 20;

const CACHE_KEY = "pq_badge_stats_v1";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

/** GoatCounter renvoie les compteurs formatés (« 1 234 », espace fine). */
export function parseGcCount(raw: unknown): number | null {
  if (typeof raw !== "string" && typeof raw !== "number") return null;
  const digits = String(raw).replace(/[^\d]/g, "");
  if (!digits) return null;
  return parseInt(digits, 10);
}

/**
 * Rareté en % entier, bornée [1, 100]. `null` si le volume est insuffisant.
 * Le compte est plancher à 1 : l'utilisateur qui vient de finir a déclenché
 * l'événement, même si GoatCounter ne l'a pas encore ingéré.
 */
export function computeRarity(badgeCount: number, baseline: number): number | null {
  if (baseline < MIN_BASELINE) return null;
  const seen = Math.min(Math.max(badgeCount, 1), baseline);
  return Math.max(1, Math.round((seen / baseline) * 100));
}

/** Origine GoatCounter lue sur le tag <script data-goatcounter> (cf. analytics.ts). */
function goatCounterOrigin(): string | null {
  if (typeof document === "undefined") return null;
  const script = document.querySelector<HTMLScriptElement>("script[data-goatcounter]");
  const endpoint = script?.getAttribute("data-goatcounter") ?? "";
  if (!endpoint || endpoint.includes("YOUR-CODE")) return null;
  try {
    return new URL(endpoint).origin;
  } catch {
    return null;
  }
}

async function fetchCount(origin: string, path: string): Promise<number | null> {
  try {
    const res = await fetch(`${origin}/counter/${encodeURIComponent(path)}.json`);
    // 404 = chemin jamais compté : un vrai zéro, pas une erreur.
    if (res.status === 404) return 0;
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return parseGcCount((data as { count?: unknown })?.count);
  } catch {
    return null;
  }
}

type CacheShape = { at: number; key: string; rarities: Record<string, number> };

const cacheKeyOf = (ids: string[]) => [...ids].sort().join(",");

function readCache(ids: string[]): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (parsed.key !== cacheKeyOf(ids)) return null;
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.rarities;
  } catch {
    return null;
  }
}

function writeCache(ids: string[], rarities: Record<string, number>) {
  try {
    const payload: CacheShape = { at: Date.now(), key: cacheKeyOf(ids), rarities };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* stockage plein ou indisponible : tant pis pour le cache */
  }
}

/**
 * Raretés mesurées pour les badges donnés, ou `null` si indisponibles
 * (le rendu garde alors les estimations embarquées).
 */
export async function fetchBadgeRarities(ids: string[]): Promise<Record<string, number> | null> {
  const origin = goatCounterOrigin();
  if (!origin || ids.length === 0) return null;

  const cached = readCache(ids);
  if (cached) return cached;

  const baseline = await fetchCount(origin, BASELINE_EVENT_PATH);
  if (baseline == null || baseline < MIN_BASELINE) return null;

  const counts = await Promise.all(ids.map((id) => fetchCount(origin, `/events/badge-${id}`)));
  const rarities: Record<string, number> = {};
  ids.forEach((id, i) => {
    const count = counts[i];
    if (count == null) return; // échec réseau isolé : ce badge garde son estimation
    const rarity = computeRarity(count, baseline);
    if (rarity != null) rarities[id] = rarity;
  });

  if (Object.keys(rarities).length === 0) return null;
  writeCache(ids, rarities);
  return rarities;
}

/**
 * Superpose la rareté mesurée sur les badges débloqués. Rend d'abord les
 * estimations, puis les valeurs réelles quand la lecture aboutit — tri et
 * affichage (grille + ShareCard) suivent, puisqu'ils lisent `badge.rarity`.
 */
export function useLiveBadgeRarities(badges: Badge[]): Badge[] {
  const [measured, setMeasured] = useState<Record<string, number> | null>(null);
  const idsKey = useMemo(() => cacheKeyOf(badges.map((b) => b.id)), [badges]);

  useEffect(() => {
    if (!idsKey) {
      setMeasured(null);
      return;
    }
    let cancelled = false;
    fetchBadgeRarities(idsKey.split(",")).then((rarities) => {
      if (!cancelled) setMeasured(rarities);
    });
    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  return useMemo(() => {
    if (!measured) return badges;
    return badges.map((b) => (measured[b.id] != null ? { ...b, rarity: measured[b.id] } : b));
  }, [badges, measured]);
}
