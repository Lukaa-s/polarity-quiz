// src/components/ResultEnhanced.tsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { QuestionDef, calculatePoleScores } from "../utils/scoring";
import { saveProfile, listProfiles, deleteProfile, SavedProfile } from "../utils/profiles";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Badge } from "../data/badges";
import { evaluateBadges } from "../utils/badges";
import { TrashIcon, UserGroupIcon, ArrowDownTrayIcon, ShareIcon, CheckIcon, HeartIcon } from "@heroicons/react/24/solid";
import { generateShareURL, copyToClipboard, getTwitterShareURL, getWhatsAppShareURL, getFacebookShareURL, getDiscordShareURL, shareViaWebAPI, sanitizeShareName } from "../utils/shareResults";
import { trackShare, trackEvent } from "../utils/analytics";
import { useLocale } from "../i18n/LocaleContext";
import type { Locale } from "../i18n/strings";
import { useLocalizedAxes, useLocalizedBadges, useLocalizedProfiles } from "../i18n/data";
import ShareCard from "./ShareCard";

// ──────────────────────────────────────────────────────────────────────────────
// Tooltip Radar amélioré
// ──────────────────────────────────────────────────────────────────────────────
type RadarTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: any[];
  axisLabelMap: Map<string, { left: string; right: string }>;
  fallbackMeta: { left: string; right: string };
};

const RadarTooltip: React.FC<RadarTooltipProps> = ({
  active,
  label,
  payload,
  axisLabelMap,
  fallbackMeta,
}) => {
  if (!active || !payload?.length) return null;

  const meta = axisLabelMap.get(String(label)) ?? fallbackMeta;

  return (
    <div className="rounded-[4px] border border-ink/15 bg-paper px-4 py-3 text-sm text-ink shadow-xl">
      <div className="mb-2 font-semibold text-ink border-b border-rule pb-1">{label}</div>
      {payload.map((entry, idx) => {
        const pctLeft = Math.round(Number(entry.value ?? 0));
        const pctRight = 100 - pctLeft;
        return (
          <div key={idx} className="flex items-center gap-2 mt-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.stroke }}
            />
            <span className="text-ink/90 text-xs">
              {entry.name}: {meta.left} {pctLeft}% · {meta.right} {pctRight}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────

export type ResultProps = {
  poleScores: Record<string, { left: number; right: number }>;
  questions: QuestionDef[];
  badges: Badge[];
  onRestart: () => void;
  currentAnswers: Record<string, number>;
  explorerMode?: boolean; // Mode exploration sans résultats utilisateur
  // Appelé une fois le composant monté avec succès. Sert à App pour n'effacer la
  // progression sauvegardée qu'une fois les résultats réellement affichés (si le
  // chunk échoue à charger, la progression survit à un rechargement).
  onReady?: () => void;
};

const LEFT_COLOR = "#C62828";
const RIGHT_COLOR = "#1565C0";
const USER_COLOR = "#23201A"; // Encre, "Vous" : proéminent mais neutre (aucun camp)

// Palette catégorielle mate pour le radar : ni rouge ni bleu purs (réservés aux pôles).
const RADAR_PALETTE = ["#9A6A00", "#2F6F6A", "#7A4A6B", "#566573"]; // ocre, sarcelle, prune, ardoise
const MAX_COMPARE = 4;

// Libellés courts pour les axes du radar (le tooltip garde le nom complet).
// Évite tout chevauchement / coupe des longs intitulés autour du cercle.
// Re-keyé par ID d'axe (stable dans les deux langues) et fourni par locale : les
// libellés complets diffèrent entre FR et EN, mais l'id reste la clé de jointure.
const RADAR_SHORT_LABELS: Record<Locale, Record<string, string>> = {
  fr: {
    progress: "Progrès sociétal",
    power: "Pouvoir",
    state_vs_market: "État & économie",
    ecology: "Écologie",
    economic_goal: "Finalité éco.",
    property: "Propriété",
    democracy: "Démocratie",
    justice: "Justice",
    sovereignty: "Souveraineté",
    religion: "Religion",
    reform: "Changement social",
    work: "Travail",
    freedom_vs_security: "Liberté & sécurité",
    technology: "Technologie",
  },
  en: {
    progress: "Societal Progress",
    power: "Power",
    state_vs_market: "State & Economy",
    ecology: "Ecology",
    economic_goal: "Economic Purpose",
    property: "Ownership",
    democracy: "Democracy",
    justice: "Justice",
    sovereignty: "Sovereignty",
    religion: "Religion",
    reform: "Social Change",
    work: "Work",
    freedom_vs_security: "Freedom & Security",
    technology: "Technology",
  },
};

// Initiales encre (monogramme), sans bulle colorée.
function profileInitials(name: string): string {
  return name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Découpe un libellé long en ≤ 2 lignes (sur les espaces, ~18 car. max/ligne).
function wrapLabel(label: string, max = 18): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur && (cur + " " + w).length > max) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  }
  if (cur) lines.push(cur);
  // Au plus 2 lignes : si davantage, on regroupe le surplus sur la 2e.
  if (lines.length > 2) return [lines[0], lines.slice(1).join(" ")];
  return lines;
}

// Tick personnalisé pour PolarAngleAxis : libellés courts, ≤ 2 lignes, sans chevauchement.
// `shortLabelMap` mappe le libellé complet d'axe (localisé) vers sa version courte.
function RadarAxisTick(props: any) {
  const { x, y, cy, payload, textAnchor, shortLabelMap } = props;
  const full = String(payload?.value ?? "");
  const label: string = (shortLabelMap as Map<string, string> | undefined)?.get(full) ?? full;
  const lines = wrapLabel(label, 16);
  const isTop = y < cy;
  const dyStart = lines.length > 1 ? (isTop ? -(lines.length - 1) * 11 : 0) : 0;
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill="rgba(35,32,26,0.9)"
      fontSize={11}
      fontWeight={500}
    >
      {lines.map((ln, i) => (
        <tspan key={i} x={x} dy={i === 0 ? dyStart : 12}>
          {ln}
        </tspan>
      ))}
    </text>
  );
}

// Indicateur de positionnement gauche↔droite : la couleur y est signifiante.
function LeanIndicator({ value, showLabels = false }: { value: number; showLabels?: boolean }) {
  const { t } = useLocale();
  const pos = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div
        role="img"
        aria-label={t("result.lean.aria", { value: Math.round(pos) })}
        className="relative h-1.5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${LEFT_COLOR} 0%, #D8D2C4 50%, ${RIGHT_COLOR} 100%)` }}
      >
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper ring-2 ring-ink shadow-sm"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />
      </div>
      {showLabels && (
        <div className="mt-1.5 flex justify-between text-[0.65rem] uppercase tracking-[0.15em] text-ink2">
          <span>{t("result.lean.left")}</span>
          <span>{t("result.lean.right")}</span>
        </div>
      )}
    </div>
  );
}

export default function ResultEnhanced({
  poleScores,
  questions,
  onRestart,
  badges,
  currentAnswers,
  explorerMode = false,
  onReady,
}: ResultProps) {
  const [activeTab, setActiveTab] = useState<"results" | "explained" | "diagram" | "profiles">(
    explorerMode ? "diagram" : "results"
  );
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>(listProfiles());
  const [isExporting, setIsExporting] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [selectedPoliticalProfile, setSelectedPoliticalProfile] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  // Badge dont la description est dépliée (tap/clic : le survol seul excluait le mobile)
  const [expandedBadgeId, setExpandedBadgeId] = useState<string | null>(null);
  const shareMenuRef = useRef<HTMLDivElement | null>(null);

  // ── Surcouche i18n ───────────────────────────────────────────────────────
  // Les DONNÉES restent jointes par id (scoring inchangé). Ici on récupère les
  // libellés localisés : axes (même forme qu'ideologicalAxes), roster de profils
  // (FR 22 / EN 14 distinct), et la Map des badges (id → label/description).
  const { t, locale } = useLocale();
  const localizedAxes = useLocalizedAxes();
  const localizedProfiles = useLocalizedProfiles();
  const localizedBadges = useLocalizedBadges();
  const youLabel = t("result.you");
  const shortById = RADAR_SHORT_LABELS[locale] ?? RADAR_SHORT_LABELS.fr;

  // Le prop `badges` reçu est la liste FR ÉVALUÉE (test/icon/rarity). On superpose
  // seulement label/description localisés via cette Map par id (rarity partagée).
  const badgeById = useMemo(
    () => new Map(localizedBadges.map((b) => [b.id, b])),
    [localizedBadges]
  );
  const localizeBadge = (b: Badge): Badge => badgeById.get(b.id) ?? b;
  const displayBadges = useMemo(() => badges.map(localizeBadge), [badges, badgeById]);

  // Signale à App que les résultats sont montés (chunk chargé) : App peut alors
  // effacer la progression sauvegardée en toute sûreté.
  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fermer le menu de partage à Échap ou au clic hors du menu (usage clavier + mobile).
  useEffect(() => {
    if (!showShareMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowShareMenu(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [showShareMenu]);

  // Ordre stable des axes (sortIndex), scores toujours consultés par id d'axe.
  // En mode explorateur, on utilise tous les axes.
  const sortedAxisDefs = useMemo(
    () => [...localizedAxes].sort((a, b) => a.sortIndex - b.sortIndex),
    [localizedAxes]
  );
  const axes = explorerMode
    ? sortedAxisDefs
    : sortedAxisDefs.filter((a) => poleScores[a.id]);

  const axisLabelMap = useMemo(
    () =>
      new Map(
        localizedAxes.map((a) => [
          a.axis,
          { left: a.left.label, right: a.right.label },
        ])
      ),
    [localizedAxes]
  );

  // Libellé complet d'axe (localisé) → libellé court, pour les ticks du radar.
  const radarShortByLabel = useMemo(
    () => new Map(localizedAxes.map((a) => [a.axis, shortById[a.id] ?? a.axis])),
    [localizedAxes, shortById]
  );

  // Sauvegarder les réponses courantes comme profil local (localStorage)
  const handleSaveCurrentProfile = () => {
    const name = saveName.trim();
    if (!name) return;
    const ok = saveProfile({ name, answers: currentAnswers });
    setSavedProfiles(listProfiles());
    if (ok) {
      // Succès réel : on vide le champ et on confirme.
      setSaveError(false);
      setSaveName("");
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    } else {
      // Stockage local indisponible (navigation privée, quota) : on prévient
      // sans effacer la saisie, pour laisser l'utilisateur réessayer.
      setProfileSaved(false);
      setSaveError(true);
      setTimeout(() => setSaveError(false), 4000);
    }
  };

  // Supprimer un profil
  const handleDeleteProfile = (id: string) => {
    if (confirm(t("result.deleteConfirm"))) {
      deleteProfile(id);
      setSavedProfiles(listProfiles());
      setSelectedProfiles(selectedProfiles.filter((p) => p !== id));
    }
  };

  // Toggle profile dans la sélection
  const toggleProfile = (id: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length >= MAX_COMPARE
        ? prev
        : [...prev, id]
    );
  };

  // Exporter l'image des résultats
  const handleExportImage = async () => {
    setIsExporting(true);

    // Désactiver les animations pour avoir un rendu instantané complet
    setDisableAnimations(true);

    try {
      // html2canvas-pro (fork maintenu de html2canvas : supporte les couleurs
      // oklch() de tokens.css, que l'original ne parse pas) ne sert qu'à
      // l'export : chargé à la demande pour ne pas alourdir le chunk résultats.
      const { default: html2canvas } = await import("html2canvas-pro");

      // Attendre un cycle de rendu pour que la désactivation prenne effet
      await new Promise((resolve) => setTimeout(resolve, 100));

      // On capture la carte de partage dédiée (format fixe 1080×1350, rendue
      // hors écran) — pas la page responsive, illisible une fois exportée.
      const element = document.getElementById("share-card");
      if (!element) {
        alert(t("result.export.notFound"));
        setDisableAnimations(false);
        return;
      }

      // Attendre que toutes les images soient chargées. Les badges sont en
      // loading="lazy" : hors viewport ils ne se chargent JAMAIS et cette
      // attente bloquait indéfiniment (bouton « Export… » figé — systématique
      // sur mobile où la carte est très haute). On force le chargement, avec
      // un garde-fou de 8 s au cas où une image ne répond pas.
      const images = element.querySelectorAll("img");
      await Promise.race([
        Promise.all(
          Array.from(images).map((img) => {
            img.loading = "eager";
            if (img.complete) return Promise.resolve(true);
            return new Promise((resolve) => {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            });
          })
        ),
        new Promise((resolve) => setTimeout(resolve, 8000)),
      ]);

      // Attendre un peu plus pour s'assurer que tout est rendu sans animations
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Supprimer temporairement les propriétés CSS problématiques
      const problematicElements = element.querySelectorAll('[class*="backdrop-blur"], [class*="overflow-hidden"]');
      const originalStyles: { element: HTMLElement; style: string }[] = [];

      problematicElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        originalStyles.push({ element: htmlEl, style: htmlEl.style.cssText });
        // Désactiver backdrop-filter qui cause des problèmes avec html2canvas
        htmlEl.style.backdropFilter = 'none';
        (htmlEl.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = 'none';
      });

      // iOS Safari plafonne la surface d'un canvas (~16,7 M pixels) et la
      // mémoire disponible sur mobile est bien plus basse : la carte de
      // résultats est très haute, un scale fixe de 2 dépasse les limites →
      // canvas silencieusement vide. Budget prudent de 8 M pixels.
      const area = element.offsetWidth * element.offsetHeight;
      const scale = Math.min(2, Math.sqrt(8_000_000 / area));

      const canvas = await html2canvas(element, {
        backgroundColor: "#F6F3EC",
        scale,
        logging: false, // Désactiver le logging
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 0,
        // Ignorer certains éléments problématiques
        ignoreElements: (element) => {
          // Ignorer les tooltips, éléments cachés et boutons d'action
          return element.classList.contains('opacity-0') ||
                 element.classList.contains('hidden') ||
                 element.hasAttribute('data-export-exclude');
        },
        // Callback pour corriger le rendu des textes
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("share-card");
          if (clonedElement) {
            // Forcer le rendu complet des textes
            const allText = clonedElement.querySelectorAll('div, span, p');
            allText.forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.overflow = 'visible';
              htmlEl.style.textOverflow = 'clip';
            });
          }
        },
      });

      // Restaurer les styles originaux
      originalStyles.forEach(({ element, style }) => {
        element.style.cssText = style;
      });

      // toBlob plutôt que toDataURL : iOS Safari ignore silencieusement les
      // liens download vers des data URLs de plusieurs Mo.
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!blob) throw new Error("canvas vide (limite de taille du navigateur)");

      // Mobile : feuille de partage native (enregistrer dans Photos, poster
      // sur un réseau…) — le lien <a download> ne déclenche rien sur beaucoup
      // de versions d'iOS. Fallback : téléchargement classique via blob URL.
      const file = new File([blob], t("result.export.fileName"), { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: t("result.export.shareTitle") });
          return;
        } catch (err) {
          if ((err as DOMException).name === "AbortError") return; // annulé par l'utilisateur
          // Autre refus (contexte, permission…) : on retombe sur le téléchargement
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = t("result.export.fileName");
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      // Message détaillé : sans lui, impossible de diagnostiquer les pannes
      // spécifiques à un appareil (limites canvas iOS, refus de partage…).
      const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      alert(t("result.export.error", { detail }));
    } finally {
      // Réactiver les animations après l'export
      setDisableAnimations(false);
      setIsExporting(false);
    }
  };

  // Fonction de partage des résultats
  const handleShare = async () => {
    setShowShareMenu(!showShareMenu);
  };

  // Demander un nom optionnel avec avertissement de confidentialité
  const promptForShareName = (): string | undefined => {
    const userWantsName = confirm(t("result.shareName.confirm"));

    if (!userWantsName) {
      return undefined; // Partage anonyme
    }

    const name = prompt(t("result.shareName.prompt"));

    // Si l'utilisateur annule ou entre une chaîne vide, partager anonymement.
    // Le nom est borné et nettoyé (il finit dans une URL publique).
    return sanitizeShareName(name);
  };

  const handleCopyLink = async () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    const success = await copyToClipboard(shareURL);

    if (success) {
      trackShare('copy-link');
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    trackShare('twitter');
    window.open(getTwitterShareURL(shareURL, name, locale), '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    trackShare('whatsapp');
    window.open(getWhatsAppShareURL(shareURL, name, locale), '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    trackShare('facebook');
    window.open(getFacebookShareURL(shareURL), '_blank', 'noopener,noreferrer');
  };

  const handleShareDiscord = async () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    const discordMessage = getDiscordShareURL(shareURL, name, locale);
    const success = await copyToClipboard(discordMessage);

    if (success) {
      trackShare('discord');
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleShareNative = async () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    const success = await shareViaWebAPI(shareURL, name, locale);

    if (success) {
      trackShare('native');
    } else {
      // Fallback : copier le lien si Web Share API non supportée
      const fallbackSuccess = await copyToClipboard(shareURL);
      if (fallbackSuccess) {
        trackShare('copy-link');
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    }
  };

  // Fonction helper pour obtenir le label de compatibilité
  const getCompatibilityLabel = (score: number): string => {
    if (score >= 90) return t("result.compat.veryHigh");
    if (score >= 75) return t("result.compat.high");
    if (score >= 60) return t("result.compat.some");
    if (score >= 40) return t("result.compat.diff");
    return t("result.compat.opposed");
  };

  // Distance = écart moyen (en points de %) entre les positions de l'utilisateur
  // et celles du profil, sur chaque axe. Similarité affichée = 100 - distance.
  // Volontairement sans bonus/malus : le score reste interprétable.
  const calculateDistance = (profile: { answers: Record<string, number> }): number => {
    const profileScores = calculatePoleScores(profile.answers, questions);
    let totalDiff = 0;
    let count = 0;

    axes.forEach((a) => {
      const user = poleScores[a.id];
      const ref = profileScores[a.id];
      if (user && ref) {
        const userPct = (user.left / (user.left + user.right || 1)) * 100;
        const refPct = (ref.left / (ref.left + ref.right || 1)) * 100;
        totalDiff += Math.abs(userPct - refPct);
        count++;
      }
    });

    if (count === 0) return 100;
    return totalDiff / count;
  };

  // Profils de référence triés par proximité (seulement en mode normal).
  // Les profils historiques marqués excludeFromMatching (ex. régimes totalitaires)
  // restent consultables dans l'annuaire mais sont exclus du classement.
  const sortedReferenceProfiles = useMemo(() => {
    if (explorerMode) return []; // Pas utilisé en mode explorateur
    return localizedProfiles
      .filter((p) => !p.excludeFromMatching)
      .map((p) => ({ ...p, distance: calculateDistance(p) }))
      .sort((a, b) => a.distance - b.distance);
  }, [poleScores, explorerMode, questions, localizedProfiles]);

  // Données de la carte de partage exportable (format fixe 1080×1350, cf.
  // ShareCard.tsx) : top 3 des personnalités, jauges compactes, badges.
  const shareCardData = useMemo(() => {
    if (explorerMode) return null;
    return {
      top3: sortedReferenceProfiles.slice(0, 3).map((p) => ({
        name: p.name,
        similarity: Math.round(100 - p.distance),
      })),
      gauges: axes.map((a) => {
        const { left, right } = poleScores[a.id];
        const total = left + right || 1;
        const pctLeft = Math.round((left / total) * 100);
        return {
          id: a.id,
          shortLabel: shortById[a.id] ?? a.axis,
          pctLeft,
          pctRight: 100 - pctLeft,
        };
      }),
    };
  }, [explorerMode, sortedReferenceProfiles, axes, poleScores, shortById]);

  // Données radar avec profils sélectionnés
  const multiRadarData = useMemo(() => {
    const data = axes.map((a) => {
      const result: Record<string, string | number> = { axis: a.axis };

      // Ajouter "Vous" seulement si on n'est pas en mode explorateur
      if (!explorerMode && poleScores[a.id]) {
        const { left, right } = poleScores[a.id];
        const total = left + right || 1;
        result[youLabel] = Math.round((left / total) * 100);
      }

      selectedProfiles.forEach((profileId) => {
        const profile = [...localizedProfiles, ...savedProfiles].find(
          (p) => p.id === profileId
        );
        if (profile) {
          const profileScores = calculatePoleScores(profile.answers, questions);
          const axisScore = profileScores[a.id];
          if (axisScore) {
            const axisTotal = axisScore.left + axisScore.right || 1;
            result[profile.name] = Math.round((axisScore.left / axisTotal) * 100);
          }
        }
      });

      return result;
    });
    return data;
  }, [selectedProfiles, poleScores, savedProfiles, explorerMode, axes, questions, localizedProfiles, youLabel]);

  const profileColors = useMemo(() => {
    const colors: Record<string, string> = {};

    // Ajouter "Vous" seulement en mode normal
    if (!explorerMode) {
      colors[youLabel] = USER_COLOR;
    }

    selectedProfiles.forEach((id, idx) => {
      const profile = [...localizedProfiles, ...savedProfiles].find((p) => p.id === id);
      if (profile) {
        colors[profile.name] = RADAR_PALETTE[idx % RADAR_PALETTE.length];
      }
    });
    return colors;
  }, [selectedProfiles, savedProfiles, explorerMode, localizedProfiles, youLabel]);

  // Penchant global gauche↔droite de chaque profil de référence (0 = gauche, 100 = droite).
  const profileLean = useMemo(() => {
    const map: Record<string, number> = {};
    localizedProfiles.forEach((p) => {
      const s = calculatePoleScores(p.answers, questions);
      let l = 0;
      let r = 0;
      Object.values(s).forEach((v) => {
        l += v.left;
        r += v.right;
      });
      map[p.id] = l + r > 0 ? (r / (l + r)) * 100 : 50;
    });
    return map;
  }, [questions, localizedProfiles]);

  // Profils de référence triés de gauche à droite (effet « hémicycle »).
  const profilesByLean = useMemo(
    () => [...localizedProfiles].sort((a, b) => (profileLean[a.id] ?? 50) - (profileLean[b.id] ?? 50)),
    [profileLean, localizedProfiles]
  );

  const tabs = explorerMode
    ? [
        { key: "profiles", label: t("result.tab.profiles") },
        { key: "diagram", label: t("result.tab.compare") },
        { key: "explained", label: t("result.tab.explained") },
      ]
    : [
        { key: "results", label: t("result.tab.results") },
        { key: "diagram", label: t("result.tab.compare") },
        { key: "explained", label: t("result.tab.explained") },
      ];

  return (
    <div className="space-y-6 font-body">
      {/* Carte de partage : rendue hors écran en permanence, capturée par
          l'export image. Ne pas la masquer via display:none ou la classe
          "hidden" — elle doit être rendue pour html2canvas, et ignoreElements
          saute la classe hidden. */}
      {shareCardData && (
        <div
          aria-hidden="true"
          style={{ position: "fixed", left: -12000, top: 0, pointerEvents: "none" }}
        >
          <ShareCard top3={shareCardData.top3} gauges={shareCardData.gauges} badges={displayBadges} />
        </div>
      )}

      {/* Onglets */}
      <div className="border-b border-rule">
        <div className="flex gap-6 overflow-x-auto no-scrollbar -mb-px">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`inline-flex items-center px-0.5 py-3 text-sm sm:text-base font-semibold whitespace-nowrap border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink rounded-sm
                ${
                  activeTab === t.key
                    ? "border-ink text-ink"
                    : "border-transparent text-ink2 hover:text-ink hover:border-rule"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────── Onglet : Résultats ────────────── */}
      {activeTab === "results" && (
        <div className={disableAnimations ? 'pb-8' : 'animate-fadeIn pb-8'} id="results-card">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">{t("result.heading")}</h2>
            {/* data-export-exclude : ces boutons n'ont pas de sens dans l'image
                exportée (le bouton Télécharger vide y apparaissait figé). */}
            <div className="flex gap-2 relative" data-export-exclude ref={shareMenuRef}>
              {/* Bouton Télécharger */}
              <button
                onClick={handleExportImage}
                disabled={isExporting}
                /* Sur mobile le libellé est masqué (icône seule) : sans aria-label
                   le bouton n'a aucun nom accessible. */
                aria-label={isExporting ? t("result.export.inProgress") : t("result.export.aria")}
                className="btn-outline flex items-center gap-2 px-4 py-2 text-sm font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span className="hidden sm:inline">{isExporting ? t("result.export.loading") : t("result.export.download")}</span>
              </button>

              {/* Bouton Partager */}
              <button
                onClick={handleShare}
                aria-haspopup="menu"
                aria-expanded={showShareMenu}
                className="btn-ink flex items-center gap-2 px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
              >
                <ShareIcon className="w-5 h-5" />
                <span className="hidden sm:inline">{t("result.share.button")}</span>
                <span className="sm:hidden">{t("result.share.button")}</span>
              </button>

              {/* Menu de partage (dropdown) */}
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-paper2 border border-rule rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b border-ink/10">
                    <p className="text-sm font-semibold text-ink">{t("result.share.menuTitle")}</p>
                  </div>

                  {/* Copier le lien */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left"
                  >
                    {linkCopied ? (
                      <>
                        <CheckIcon className="w-5 h-5 text-green-700" />
                        <span className="text-sm text-green-700">{t("result.share.copied")}</span>
                      </>
                    ) : (
                      <>
                        <ShareIcon className="w-5 h-5 text-ink/80" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-ink">{t("result.share.copyLink")}</p>
                          <p className="text-xs text-ink/60">{t("result.share.copyLinkSub")}</p>
                        </div>
                      </>
                    )}
                  </button>

                  {/* Twitter/X */}
                  <button
                    onClick={handleShareTwitter}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left border-t border-ink/10"
                  >
                    <svg className="w-5 h-5 text-ink/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">Twitter / X</p>
                      <p className="text-xs text-ink/60">{t("result.share.twitterSub")}</p>
                    </div>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left border-t border-ink/10"
                  >
                    <svg className="w-5 h-5 text-ink/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">WhatsApp</p>
                      <p className="text-xs text-ink/60">{t("result.share.whatsappSub")}</p>
                    </div>
                  </button>

                  {/* Discord */}
                  <button
                    onClick={handleShareDiscord}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left border-t border-ink/10"
                  >
                    <svg className="w-5 h-5 text-ink/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">Discord</p>
                      <p className="text-xs text-ink/60">{t("result.share.discordSub")}</p>
                    </div>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={handleShareFacebook}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left border-t border-ink/10"
                  >
                    <svg className="w-5 h-5 text-ink/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">Facebook</p>
                      <p className="text-xs text-ink/60">{t("result.share.facebookSub")}</p>
                    </div>
                  </button>

                  {/* Partage natif (SMS, Telegram, etc.) */}
                  <button
                    onClick={handleShareNative}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left border-t border-ink/10"
                  >
                    <svg className="w-5 h-5 text-ink/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">{t("result.share.native")}</p>
                      <p className="text-xs text-ink/60">{t("result.share.nativeSub")}</p>
                    </div>
                  </button>

                  {/* Bouton fermer */}
                  <button
                    onClick={() => setShowShareMenu(false)}
                    className="w-full px-4 py-2 text-sm text-ink/60 hover:text-ink transition border-t border-ink/10"
                  >
                    {t("result.share.close")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Top 3 des personnalités les plus proches */}
          <div className="mb-8 bg-paper2 rounded-md p-5 border border-rule">
            <h3 className="text-lg sm:text-xl font-semibold text-ink mb-1">
              {t("result.top3.title")}
            </h3>
            <div className="rule mb-3 mt-3" />
            <p className="text-xs text-ink2 leading-normal mb-4">
              {t("result.top3.disclaimer")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule border border-rule rounded-md overflow-hidden">
              {sortedReferenceProfiles.slice(0, 3).map((profile, idx) => {
                const similarity = Math.round(100 - profile.distance);
                const compatibilityLabel = getCompatibilityLabel(similarity);
                return (
                  <div
                    key={profile.id}
                    className="bg-paper p-4 group relative"
                    style={{
                      animation: disableAnimations ? 'none' : `popIn 0.4s ease-out ${idx * 0.15}s both`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-display text-3xl leading-none text-ink2 tabular-nums w-7 shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-ink mb-1">
                          {profile.name}
                        </div>
                        <div className="text-xs text-ink2 mb-2 leading-normal">
                          {profile.description}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-rule rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${similarity}%`,
                                  backgroundColor: profile.color,
                                }}
                              />
                            </div>
                            <span className="text-sm font-bold text-ink tabular-nums whitespace-nowrap">
                              {similarity}/100
                            </span>
                          </div>
                          <div className="text-xs font-medium text-ink2 leading-normal">
                            {compatibilityLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {axes.map((a, idx) => {
            const { left, right } = poleScores[a.id];
            const total = left + right || 1;
            const pctLeft = Math.round((left / total) * 100);
            const pctRight = 100 - pctLeft;
            const labels = { left: a.left.label, right: a.right.label };

            return (
              <div
                key={a.id}
                className="space-y-2 py-3 mb-2 border-b border-rule last:border-b-0"
                style={{
                  animation: disableAnimations ? 'none' : `slideIn 0.3s ease-out ${idx * 0.05}s both`,
                }}
              >
                <div className="flex justify-between text-sm sm:text-base font-semibold text-ink">
                  <span className="truncate pr-2">{labels.left}</span>
                  <span className="truncate pl-2">{labels.right}</span>
                </div>

                <div className="relative w-full h-7 sm:h-8 rounded-[4px] overflow-hidden border border-rule">
                  <div
                    className="grid h-full transition-all duration-500"
                    style={{
                      gridTemplateColumns: `${pctLeft}% ${pctRight}%`,
                    }}
                  >
                    <div
                      className="flex items-center px-2 text-xs sm:text-sm font-bold text-paper tabular-nums transition-all"
                      style={{ backgroundColor: LEFT_COLOR }}
                    >
                      {pctLeft > 10 && `${pctLeft}%`}
                    </div>
                    <div
                      className="flex items-center justify-end px-2 text-xs sm:text-sm font-bold text-paper tabular-nums transition-all"
                      style={{ backgroundColor: RIGHT_COLOR }}
                    >
                      {pctRight > 10 && `${pctRight}%`}
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-ink2 leading-relaxed pb-1">
                  {a.axis}
                </div>
              </div>
            );
          })}

          {/* Badges */}
          <div className="mt-10 pt-8 border-t border-rule">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-center text-ink">
              {t("result.badges.title")}
            </h2>
            <p className="text-xs text-ink2 text-center mb-5">
              {t("result.badges.hint")}
            </p>

            {displayBadges.length === 0 ? (
              <p className="text-center text-sm text-ink2 py-8 bg-paper2 rounded-md border border-rule">
                {t("result.badges.empty")}
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 items-start justify-items-center">
                {/* Tri par rareté croissante : les trophées les plus rares d'abord */}
                {[...displayBadges]
                  .sort((a, b) => (a.rarity ?? 999) - (b.rarity ?? 999))
                  .map((badge, idx) => {
                  const expanded = expandedBadgeId === badge.id;
                  return (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() => setExpandedBadgeId(expanded ? null : badge.id)}
                      aria-expanded={expanded}
                      className="flex w-full flex-col items-center rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                      style={{
                        animation: disableAnimations ? 'none' : `popIn 0.4s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      {/* Tampon SVG : le cadre fait partie du dessin, pas de
                          rognage circulaire ni d'anneau rapporté. */}
                      <span className="block w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-200 hover:scale-105">
                        <img
                          src={badge.icon}
                          alt=""
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </span>
                      <span className="mt-2 text-xs sm:text-sm text-ink text-center font-medium leading-normal">
                        {badge.label}
                      </span>
                      {badge.rarity != null && (
                        <span className="mt-0.5 text-[11px] text-ink2 tabular-nums">
                          {t("result.badges.rarity", { rarity: badge.rarity })}
                        </span>
                      )}
                      {expanded && (
                        <span className="mt-1 text-xs text-ink2 text-center leading-normal">
                          {badge.description}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Soutien : le test est gratuit et sans pub ; l'appui au moment où
              l'utilisateur vient de recevoir ses résultats. Lien sortant simple,
              aucun script tiers (la CSP reste intacte). */}
          <div className="mt-10 pt-8 border-t border-rule text-center">
            <p className="text-sm text-ink2 mb-4 [text-wrap:balance]">
              {t("result.support.text")}
            </p>
            <a
              href="https://ko-fi.com/lukaaasss"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("support_kofi", "/events/support-kofi")}
              className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
            >
              <HeartIcon className="w-4 h-4" aria-hidden="true" />
              {t("result.support.button")}
            </a>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onRestart}
              className="btn-ink px-7 py-3 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
            >
              {t("result.restart")}
            </button>
          </div>
        </div>
      )}

      {/* ────────────── Onglet : Diagramme + Comparateur ────────────── */}
      {activeTab === "diagram" && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-semibold">
              {t("result.compare.title")}
            </h3>
            <p className="text-sm text-ink2 mt-1">
              {t("result.compare.subtitle", { max: MAX_COMPARE })}
            </p>
          </div>

          {/* Sélection des profils de référence */}
          <div className="rounded-xl border border-rule bg-paper2 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-rule">
              <h4 className="flex items-center gap-2 text-xs font-semibold text-ink2 uppercase tracking-[0.15em]">
                <UserGroupIcon className="w-4 h-4" />
                {t("result.compare.figures")}
              </h4>
              <span className="text-xs text-ink2 tabular-nums">{selectedProfiles.length}/{MAX_COMPARE}</span>
            </div>
            <ul className="max-h-72 overflow-y-auto scrollbar-thin divide-y divide-rule">
              {(explorerMode ? profilesByLean : sortedReferenceProfiles).map((profile) => {
                const selected = selectedProfiles.includes(profile.id);
                const atCap = selectedProfiles.length >= MAX_COMPARE;
                const swatch = selected
                  ? RADAR_PALETTE[selectedProfiles.indexOf(profile.id) % RADAR_PALETTE.length]
                  : null;
                return (
                  <li key={profile.id}>
                    <button
                      onClick={() => toggleProfile(profile.id)}
                      disabled={!selected && atCap}
                      className="group flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-paper3 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                          selected ? "bg-ink border-ink" : "border-ink2"
                        }`}
                      >
                        {selected && (
                          <svg className="h-3 w-3 text-paper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                        {profile.name}
                      </span>
                      {!explorerMode && "distance" in profile && (
                        <span className="shrink-0 text-xs text-ink2 tabular-nums">
                          {Math.round(100 - (profile as { distance: number }).distance)}/100
                        </span>
                      )}
                      {swatch && (
                        <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: swatch }} aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sauvegarder son propre profil (stockage local uniquement) */}
          {!explorerMode && (
            <div className="bg-paper2 rounded-xl p-4 border border-rule">
              <h4 className="text-xs font-semibold text-ink2 mb-3 uppercase tracking-[0.15em]">
                {t("result.save.title")}
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveCurrentProfile();
                  }}
                  placeholder={t("result.save.placeholder")}
                  maxLength={40}
                  className="flex-1 rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink2/70 focus:outline-none focus:ring-2 focus:ring-ink"
                />
                <button
                  onClick={handleSaveCurrentProfile}
                  disabled={!saveName.trim()}
                  className="btn-outline px-4 py-2 text-sm font-medium disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  {profileSaved ? t("result.save.saved") : t("result.save.button")}
                </button>
              </div>
              <p className="mt-2 text-xs text-ink2">
                {t("result.save.hint")}
              </p>
              {saveError && (
                <p role="status" className="mt-2 text-xs text-ink2">
                  {t("result.save.error")}
                </p>
              )}
            </div>
          )}

          {/* Profils sauvegardés */}
          {savedProfiles.length > 0 && (
            <div className="bg-paper2 rounded-xl p-4 border border-rule">
              <h4 className="text-xs font-semibold text-ink2 mb-3 uppercase tracking-[0.15em]">
                {t("result.saved.title")}
              </h4>
              <div className="space-y-2">
                {savedProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between bg-paper rounded-lg p-2 border border-rule"
                  >
                    <button
                      onClick={() => toggleProfile(profile.id)}
                      className={`flex-1 text-left px-2 py-1 rounded text-sm transition ${
                        selectedProfiles.includes(profile.id)
                          ? "text-ink font-medium"
                          : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      {profile.name}
                      <span className="ml-2 text-xs opacity-60">
                        {new Date(profile.createdAtISO).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR")}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="p-1 text-red-600 hover:text-red-700 hover:bg-red-500/10 rounded transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Graphique radar */}
          <div
            role="img"
            aria-label={t("result.radar.aria", { count: axes.length })}
            className="w-full h-80 sm:h-96 md:h-[32rem] px-2 sm:px-4 md:px-6 min-w-0 bg-paper2 rounded-xl border border-rule p-4"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={multiRadarData}
                margin={{ top: 16, right: 56, bottom: 20, left: 56 }}
              >
                <PolarGrid stroke="rgba(35,32,26,0.15)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={<RadarAxisTick shortLabelMap={radarShortByLabel} />}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(35,32,26,0.55)", fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                />

                {/* Radar pour "Vous" - seulement en mode normal */}
                {!explorerMode && (
                  <Radar
                    name={youLabel}
                    dataKey={youLabel}
                    stroke={USER_COLOR}
                    fill={USER_COLOR}
                    fillOpacity={0.18}
                    strokeWidth={3}
                    isAnimationActive={false}
                  />
                )}

                {/* Radars pour les profils sélectionnés */}
                {selectedProfiles.map((profileId) => {
                  const profile = [...localizedProfiles, ...savedProfiles].find(
                    (p) => p.id === profileId
                  );
                  if (!profile) return null;
                  return (
                    <Radar
                      key={profileId}
                      name={profile.name}
                      dataKey={profile.name}
                      stroke={profileColors[profile.name]}
                      fill={profileColors[profile.name]}
                      fillOpacity={0.18}
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  );
                })}

                <Tooltip
                  content={
                    <RadarTooltip
                      axisLabelMap={axisLabelMap}
                      fallbackMeta={{ left: t("result.lean.left"), right: t("result.lean.right") }}
                    />
                  }
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Légende hors du graphique : la <Legend> interne de recharts prenait
              sa place DANS le conteneur à hauteur fixe — avec beaucoup de profils
              sélectionnés, le radar rétrécissait d'autant (surtout sur mobile).
              Ici elle s'étend librement sous le graphique. */}
          {(!explorerMode || selectedProfiles.length > 0) && (
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm text-ink">
              {!explorerMode && (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: USER_COLOR }}
                  />
                  {youLabel}
                </span>
              )}
              {selectedProfiles.map((profileId) => {
                const profile = [...localizedProfiles, ...savedProfiles].find(
                  (p) => p.id === profileId
                );
                if (!profile) return null;
                return (
                  <span key={profileId} className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: profileColors[profile.name] }}
                    />
                    {profile.name}
                  </span>
                );
              })}
            </div>
          )}

          {selectedProfiles.length === 0 && (
            <p className="text-center text-ink2 text-sm">
              {t("result.compare.hint")}
            </p>
          )}
        </div>
      )}

      {/* ────────────── Onglet : Profils politiques ────────────── */}
      {activeTab === "profiles" && (
        <div className="animate-fadeIn space-y-6">
          {!selectedPoliticalProfile ? (
            <>
              {/* En-tête de l'annuaire */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                  {t("result.directory.title")}
                </h3>
                <p className="text-ink2 text-sm mt-1">
                  {t("result.directory.subtitle")}
                </p>
                <div className="mt-4 max-w-md">
                  <LeanIndicator value={50} showLabels />
                </div>
              </div>

              {/* Annuaire éditorial */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule border border-rule rounded-md overflow-hidden">
                {profilesByLean.map((profile, idx) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedPoliticalProfile(profile.id)}
                    className="group flex items-center gap-4 bg-paper px-4 py-3.5 text-left transition hover:bg-paper3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
                  >
                    <span className="font-display text-sm font-semibold text-ink2 tabular-nums w-6 shrink-0 pt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-base sm:text-lg font-semibold text-ink truncate">
                          {profile.name}
                        </span>
                        <span className="hidden sm:inline shrink-0 text-sm text-ink2 group-hover:text-ink transition">
                          {t("result.directory.see")}
                        </span>
                      </span>
                      <span className="block text-xs sm:text-sm text-ink2 line-clamp-1 mb-2.5">
                        {profile.description}
                      </span>
                      <span className="block max-w-[16rem]">
                        <LeanIndicator value={profileLean[profile.id] ?? 50} />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Vue détaillée du profil sélectionné */}
              {(() => {
                const profile = localizedProfiles.find((p) => p.id === selectedPoliticalProfile);
                if (!profile) return null;

                const profileScores = calculatePoleScores(profile.answers, questions);
                const profileBadges = evaluateBadges(profile.answers, questions, profileScores).map(localizeBadge);

                return (
                  <div className="space-y-6">
                    {/* Bouton retour */}
                    <button
                      onClick={() => setSelectedPoliticalProfile(null)}
                      className="btn-outline inline-flex items-center gap-2 px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                    >
                      {t("result.directory.back")}
                    </button>

                    {/* Carte d'en-tête (papier/encre, monogramme sobre) */}
                    <div className="rounded-2xl border border-rule bg-paper2 p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-md border border-rule bg-paper3 font-display text-xl sm:text-2xl font-semibold text-ink">
                          {profileInitials(profile.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-display text-2xl font-semibold text-ink mb-1">{profile.name}</h2>
                          <p className="text-ink2 text-sm">{profile.description}</p>
                        </div>
                      </div>
                      <div className="mt-5 max-w-md">
                        <LeanIndicator value={profileLean[profile.id] ?? 50} showLabels />
                      </div>
                    </div>

                    {/* Positions sur les axes */}
                    <div className="rounded-2xl border border-rule bg-paper2 p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-4 text-ink">{t("result.directory.positions")}</h3>
                      <div className="space-y-6">
                        {sortedAxisDefs.map((axisInfo) => {
                          const axisScore = profileScores[axisInfo.id];
                          if (!axisScore) return null;

                          const { left, right } = axisScore;
                          const total = left + right || 1;
                          const leftPct = Math.round((left / total) * 100);
                          const rightPct = 100 - leftPct;

                          return (
                            <div key={axisInfo.id} className="space-y-2">
                              <div className="flex justify-between items-baseline text-xs sm:text-sm">
                                <span className="text-ink2">{axisInfo.left.label}</span>
                                <span className="text-ink2">{axisInfo.right.label}</span>
                              </div>

                              <div className="relative h-8 rounded-[5px] overflow-hidden bg-paper3 border border-rule">
                                <div
                                  className="absolute left-0 top-0 h-full transition-all duration-500"
                                  style={{ width: `${leftPct}%`, background: LEFT_COLOR }}
                                />
                                <div
                                  className="absolute right-0 top-0 h-full transition-all duration-500"
                                  style={{ width: `${rightPct}%`, background: RIGHT_COLOR }}
                                />
                                <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                                  <span className="text-paper font-bold tabular-nums">{leftPct}%</span>
                                  <span className="text-paper font-bold tabular-nums">{rightPct}%</span>
                                </div>
                              </div>

                              <div className="text-center text-xs text-ink2">{axisInfo.axis}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Badges */}
                    {profileBadges.length > 0 && (
                      <div className="rounded-2xl border border-rule bg-paper2 p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4 text-center text-ink">
                          {t("result.badges.title")}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 items-start justify-items-center">
                          {profileBadges.map((badge, idx) => {
                            const expanded = expandedBadgeId === badge.id;
                            return (
                              <button
                                key={badge.id}
                                type="button"
                                onClick={() => setExpandedBadgeId(expanded ? null : badge.id)}
                                aria-expanded={expanded}
                                className="flex w-full flex-col items-center rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                                style={{
                                  animation: disableAnimations ? 'none' : `popIn 0.4s ease-out ${idx * 0.1}s both`,
                                }}
                              >
                                <span className="block w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-200 hover:scale-105">
                                  <img
                                    src={badge.icon}
                                    alt=""
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                  />
                                </span>
                                <span className="mt-2 text-xs sm:text-sm text-ink text-center font-medium">
                                  {badge.label}
                                </span>
                                {expanded && (
                                  <span className="mt-1 text-xs text-ink2 text-center leading-normal">
                                    {badge.description}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* ────────────── Onglet : Explications ────────────── */}
      {activeTab === "explained" && (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-ink">
            {t("result.explained.title")}
          </h2>
          <p className="text-sm sm:text-base text-ink/85 max-w-prose mx-auto px-1 leading-relaxed">
            {t("result.explained.intro.before")}
            <span style={{ color: LEFT_COLOR }} className="font-semibold">{t("result.color.red")}</span>
            {t("result.explained.intro.mid")}
            <span style={{ color: RIGHT_COLOR }} className="font-semibold">{t("result.color.blue")}</span>
            {t("result.explained.intro.after")}
            <br /><br />
            {t("result.explained.intro.p2")}
            <br /><br />
            {t("result.explained.intro.p3")}
            <br /><br />
            {t("result.explained.intro.p4")}
          </p>

          {sortedAxisDefs
            .map(({ id, axis, question, left, right }, idx) => (
              <div
                key={id}
                className="border border-ink/10 rounded-xl p-4 sm:p-5 bg-ink/5 text-ink/90 hover:bg-paper3 transition-all"
                style={{
                  animation: disableAnimations ? 'none' : `slideIn 0.3s ease-out ${idx * 0.05}s both`,
                }}
              >
                <div className="text-base sm:text-lg font-semibold mb-2 text-ink">
                  {axis}
                </div>
                <div className="text-xs sm:text-sm italic text-ink/70 mb-4">
                  {question}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                  <div
                    className="sm:w-1/2 rounded-lg p-3 sm:p-4 transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "rgba(198, 40, 40, 0.12)",
                      border: "1px solid rgba(198, 40, 40, 0.35)",
                    }}
                  >
                    <div className="font-semibold mb-2" style={{ color: LEFT_COLOR }}>
                      {left.label}
                    </div>
                    <div className="text-sm leading-snug text-ink/90">
                      {left.response}
                    </div>
                  </div>

                  <div
                    className="sm:w-1/2 rounded-lg p-3 sm:p-4 transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "rgba(21, 101, 192, 0.12)",
                      border: "1px solid rgba(21, 101, 192, 0.35)",
                    }}
                  >
                    <div className="font-semibold mb-2" style={{ color: RIGHT_COLOR }}>
                      {right.label}
                    </div>
                    <div className="text-sm leading-snug text-ink/90">
                      {right.response}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="border-t border-ink/15 pt-6 sm:pt-10 text-sm sm:text-base text-ink/85 max-w-prose mx-auto px-1">
            <h3 className="text-base sm:text-lg font-semibold text-center mb-2 text-ink">
              {t("result.explained.aboutTitle")}
            </h3>
            <p className="mb-2">
              {t("result.explained.about1")}
            </p>
            <p className="mb-2">
              {t("result.explained.about2")}
            </p>
            <p>
              {t("result.explained.about3")}
            </p>
          </div>
        </div>
      )}


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
