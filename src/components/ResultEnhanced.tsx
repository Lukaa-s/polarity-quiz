// src/components/ResultEnhanced.tsx
import React, { useState, useMemo } from "react";
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
  Legend,
} from "recharts";
import { ideologicalAxes } from "../data/axisexplaination";
import type { Badge } from "../data/badges";
import { evaluateBadges } from "../utils/badges";
import { referenceProfiles } from "../data/referenceProfiles";
import { TrashIcon, UserGroupIcon, ArrowDownTrayIcon, ShareIcon, CheckIcon } from "@heroicons/react/24/solid";
import html2canvas from "html2canvas";
import { generateShareURL, copyToClipboard, getTwitterShareURL, getWhatsAppShareURL, getFacebookShareURL, getDiscordShareURL, shareViaWebAPI } from "../utils/shareResults";
import { trackShare } from "../utils/analytics";

// ──────────────────────────────────────────────────────────────────────────────
// Tooltip Radar amélioré
// ──────────────────────────────────────────────────────────────────────────────
type RadarTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: any[];
  axisLabelMap: Map<string, { left: string; right: string }>;
};

const RadarTooltip: React.FC<RadarTooltipProps> = ({
  active,
  label,
  payload,
  axisLabelMap,
}) => {
  if (!active || !payload?.length) return null;

  const meta = axisLabelMap.get(String(label)) ?? { left: "Gauche", right: "Droite" };

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
};

const LEFT_COLOR = "#C62828";
const RIGHT_COLOR = "#1565C0";
const USER_COLOR = "#23201A"; // Encre, "Vous" : proéminent mais neutre (aucun camp)

// Palette catégorielle mate pour le radar : ni rouge ni bleu purs (réservés aux pôles).
const RADAR_PALETTE = ["#9A6A00", "#2F6F6A", "#7A4A6B", "#566573"]; // ocre, sarcelle, prune, ardoise
const MAX_COMPARE = 4;

// Libellés courts pour les axes du radar (le tooltip garde le nom complet).
// Évite tout chevauchement / coupe des longs intitulés autour du cercle.
const RADAR_SHORT_LABELS: Record<string, string> = {
  "Vision du progrès sociétal": "Progrès sociétal",
  "Organisation du pouvoir": "Pouvoir",
  "Rôle de l’État dans l’économie": "État & économie",
  "Modèle écologique": "Écologie",
  "Finalité de l’activité économique": "Finalité éco.",
  "Modèle de propriété": "Propriété",
  "Forme de démocratie": "Démocratie",
  "Objectif du système judiciaire": "Justice",
  "Échelle de souveraineté": "Souveraineté",
  "Place du religieux dans la vie publique": "Religion",
  "Rapport au changement social": "Changement social",
  "Sens et fonction du travail": "Travail",
  "Équilibre entre liberté et sécurité": "Liberté & sécurité",
  "Progrès technologique et enjeux sociaux": "Technologie",
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
function RadarAxisTick(props: any) {
  const { x, y, cy, payload, textAnchor } = props;
  const full = String(payload?.value ?? "");
  const label = RADAR_SHORT_LABELS[full] ?? full;
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
  const pos = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div
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
          <span>Gauche</span>
          <span>Droite</span>
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

  // ordre stable des axes - en mode explorateur, on utilise tous les axes
  const axes = explorerMode
    ? ideologicalAxes.map((a) => a.axis)
    : ideologicalAxes.map((a) => a.axis).filter((a) => poleScores[a]);

  const axisLabelMap = useMemo(
    () =>
      new Map(
        ideologicalAxes.map((a) => [
          a.axis,
          { left: a.left.label, right: a.right.label },
        ])
      ),
    []
  );

  // Données radar pour l'utilisateur (seulement en mode normal)
  const radarData = useMemo(() => {
    if (explorerMode) return []; // Pas utilisé en mode explorateur
    return axes.map((axis) => {
      const axisScore = poleScores[axis];
      if (!axisScore) return { axis, pctLeft: 0 };
      const { left, right } = axisScore;
      const total = left + right || 1;
      const pctLeft = Math.round((left / total) * 100);
      return { axis, pctLeft };
    });
  }, [axes, poleScores, explorerMode]);

  // Supprimer un profil
  const handleDeleteProfile = (id: string) => {
    if (confirm("Supprimer ce profil ?")) {
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
      // Attendre un cycle de rendu pour que la désactivation prenne effet
      await new Promise((resolve) => setTimeout(resolve, 100));

      const element = document.getElementById("results-card");
      if (!element) {
        alert("Erreur: élément non trouvé");
        setDisableAnimations(false);
        return;
      }

      // Attendre que toutes les images soient chargées
      const images = element.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve(true);
              } else {
                img.onload = () => resolve(true);
                img.onerror = () => resolve(true);
              }
            })
        )
      );

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
        htmlEl.style.webkitBackdropFilter = 'none';
      });

      const canvas = await html2canvas(element, {
        backgroundColor: "#F6F3EC",
        scale: 2,
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
          // Ignorer les tooltips et éléments cachés
          return element.classList.contains('opacity-0') ||
                 element.classList.contains('hidden');
        },
        // Callback pour corriger le rendu des textes
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("results-card");
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

      const link = document.createElement("a");
      link.download = `mes-resultats-politiques.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      alert("Erreur lors de l'export de l'image");
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
    const userWantsName = confirm(
      "Voulez-vous ajouter votre nom aux résultats partagés ?\n\n" +
      "⚠️ ATTENTION : Si vous ajoutez un nom, il sera visible par toute personne ayant accès au lien.\n\n" +
      "Cliquez sur 'OK' pour ajouter un nom, ou 'Annuler' pour partager anonymement."
    );

    if (!userWantsName) {
      return undefined; // Partage anonyme
    }

    const name = prompt(
      "Entrez le nom à afficher dans les résultats partagés :\n\n" +
      "⚠️ Ce nom sera visible dans l'URL et par toute personne consultant le lien."
    );

    // Si l'utilisateur annule ou entre une chaîne vide, partager anonymement
    return name?.trim() || undefined;
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
    const shareWindow = window.open(getTwitterShareURL(shareURL, name), '_blank');
    if (shareWindow) shareWindow.opener = null;
  };

  const handleShareWhatsApp = () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    trackShare('whatsapp');
    const shareWindow = window.open(getWhatsAppShareURL(shareURL, name), '_blank');
    if (shareWindow) shareWindow.opener = null;
  };

  const handleShareFacebook = () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    trackShare('facebook');
    const shareWindow = window.open(getFacebookShareURL(shareURL), '_blank');
    if (shareWindow) shareWindow.opener = null;
  };

  const handleShareDiscord = async () => {
    const name = promptForShareName();
    const shareURL = generateShareURL(currentAnswers, name);
    const discordMessage = getDiscordShareURL(shareURL, name);
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
    const success = await shareViaWebAPI(shareURL, name);

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
    if (score >= 90) return "Très compatible";
    if (score >= 75) return "Compatible";
    if (score >= 60) return "Quelques divergences";
    if (score >= 40) return "Positions différentes";
    return "Opposé";
  };

  // Calcul de distance avec récompense des accords forts
  const calculateDistance = (profile: SavedProfile): number => {
    const profileScores = calculatePoleScores(profile.answers, questions);
    let totalSimilarity = 0; // On calcule une similarité (0-100)
    let strongAgreements = 0; // Compteur d'accords forts
    let count = 0;

    axes.forEach((axis) => {
      const user = poleScores[axis];
      const ref = profileScores[axis];
      if (user && ref) {
        const userPct = (user.left / (user.left + user.right || 1)) * 100;
        const refPct = (ref.left / (ref.left + ref.right || 1)) * 100;

        // Distance brute sur cet axe (0-100)
        const axisDiff = Math.abs(userPct - refPct);

        // Similarité de base sur cet axe (100 = identique, 0 = opposé)
        let axisSimilarity = 100 - axisDiff;

        // Détecter si les deux sont dans le même camp ET avec position forte (>60% ou <40%)
        const userIsLeft = userPct > 60;
        const userIsRight = userPct < 40;
        const refIsLeft = refPct > 60;
        const refIsRight = refPct < 40;

        // Bonus si accord fort (même camp + positions tranchées)
        if ((userIsLeft && refIsLeft) || (userIsRight && refIsRight)) {
          strongAgreements++;
          // Augmenter la similarité de 15% (bonus pour accord fort)
          axisSimilarity = Math.min(100, axisSimilarity * 1.15);
        } else if ((userIsLeft && refIsRight) || (userIsRight && refIsLeft)) {
          // Pénalité si opposition forte (camps opposés)
          // Réduire la similarité de 30%
          axisSimilarity = axisSimilarity * 0.7;
        }
        // Si au moins un est centriste, pas de modification

        totalSimilarity += axisSimilarity;
        count++;
      }
    });

    if (count === 0) return 0;

    // Similarité moyenne (0-100)
    let avgSimilarity = totalSimilarity / count;

    // Bonus global basé sur le nombre d'accords forts
    // Chaque accord fort ajoute 1% de similarité finale
    const agreementBonus = (strongAgreements / count) * 5; // Max 5% si tous les axes sont des accords forts

    avgSimilarity = Math.min(100, avgSimilarity + agreementBonus);

    // On retourne la DISTANCE (100 - similarité) pour garder la compatibilité
    return Math.max(0, 100 - avgSimilarity);
  };

  // Profils de référence triés par proximité (seulement en mode normal)
  const sortedReferenceProfiles = useMemo(() => {
    if (explorerMode) return []; // Pas utilisé en mode explorateur
    return [...referenceProfiles]
      .map((p) => ({ ...p, distance: calculateDistance(p) }))
      .sort((a, b) => a.distance - b.distance);
  }, [poleScores, explorerMode]);

  // Données radar avec profils sélectionnés
  const multiRadarData = useMemo(() => {
    const data = axes.map((axis) => {
      const result: any = { axis };

      // Ajouter "Vous" seulement si on n'est pas en mode explorateur
      if (!explorerMode && poleScores[axis]) {
        const { left, right } = poleScores[axis];
        const total = left + right || 1;
        result.Vous = Math.round((left / total) * 100);
      }

      selectedProfiles.forEach((profileId) => {
        const profile = [...referenceProfiles, ...savedProfiles].find(
          (p) => p.id === profileId
        );
        if (profile) {
          const profileScores = calculatePoleScores(profile.answers, questions);
          const axisScore = profileScores[axis];
          if (axisScore) {
            const axisTotal = axisScore.left + axisScore.right || 1;
            result[profile.name] = Math.round((axisScore.left / axisTotal) * 100);
          }
        }
      });

      return result;
    });
    return data;
  }, [selectedProfiles, poleScores, savedProfiles, explorerMode, axes]);

  const profileColors = useMemo(() => {
    const colors: Record<string, string> = {};

    // Ajouter "Vous" seulement en mode normal
    if (!explorerMode) {
      colors.Vous = USER_COLOR;
    }

    selectedProfiles.forEach((id, idx) => {
      const profile = [...referenceProfiles, ...savedProfiles].find((p) => p.id === id);
      if (profile) {
        colors[profile.name] = RADAR_PALETTE[idx % RADAR_PALETTE.length];
      }
    });
    return colors;
  }, [selectedProfiles, savedProfiles, explorerMode]);

  // Penchant global gauche↔droite de chaque profil de référence (0 = gauche, 100 = droite).
  const profileLean = useMemo(() => {
    const map: Record<string, number> = {};
    referenceProfiles.forEach((p) => {
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
  }, [questions]);

  // Profils de référence triés de gauche à droite (effet « hémicycle »).
  const profilesByLean = useMemo(
    () => [...referenceProfiles].sort((a, b) => (profileLean[a.id] ?? 50) - (profileLean[b.id] ?? 50)),
    [profileLean]
  );

  const tabs = explorerMode
    ? [
        { key: "profiles", label: "Profils politiques" },
        { key: "diagram", label: "Comparateur" },
        { key: "explained", label: "Explications" },
      ]
    : [
        { key: "results", label: "Résultats" },
        { key: "diagram", label: "Comparateur" },
        { key: "explained", label: "Explications" },
      ];

  return (
    <div className="space-y-6 font-body">
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
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">Vos résultats</h2>
            <div className="flex gap-2 relative">
              {/* Bouton Télécharger */}
              <button
                onClick={handleExportImage}
                disabled={isExporting}
                className="btn-outline flex items-center gap-2 px-4 py-2 text-sm font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span className="hidden sm:inline">{isExporting ? "Export…" : "Télécharger"}</span>
              </button>

              {/* Bouton Partager */}
              <button
                onClick={handleShare}
                className="btn-ink flex items-center gap-2 px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
              >
                <ShareIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Partager</span>
                <span className="sm:hidden">Partager</span>
              </button>

              {/* Menu de partage (dropdown) */}
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-paper2 border border-rule rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b border-ink/10">
                    <p className="text-sm font-semibold text-ink">Partager mes résultats</p>
                  </div>

                  {/* Copier le lien */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-paper3 transition text-left"
                  >
                    {linkCopied ? (
                      <>
                        <CheckIcon className="w-5 h-5 text-green-700" />
                        <span className="text-sm text-green-700">Lien copié !</span>
                      </>
                    ) : (
                      <>
                        <ShareIcon className="w-5 h-5 text-ink/80" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-ink">Copier le lien</p>
                          <p className="text-xs text-ink/60">Partager directement</p>
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
                      <p className="text-xs text-ink/60">Tweeter mes résultats</p>
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
                      <p className="text-xs text-ink/60">Envoyer sur WhatsApp</p>
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
                      <p className="text-xs text-ink/60">Copier pour Discord</p>
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
                      <p className="text-xs text-ink/60">Partager sur Facebook</p>
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
                      <p className="text-sm font-medium text-ink">Partager...</p>
                      <p className="text-xs text-ink/60">SMS, Telegram, etc.</p>
                    </div>
                  </button>

                  {/* Bouton fermer */}
                  <button
                    onClick={() => setShowShareMenu(false)}
                    className="w-full px-4 py-2 text-sm text-ink/60 hover:text-ink transition border-t border-ink/10"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Top 3 des personnalités les plus proches */}
          <div className="mb-8 bg-paper2 rounded-md p-5 border border-rule">
            <h3 className="text-lg sm:text-xl font-semibold text-ink mb-1">
              Vos 3 personnalités les plus proches
            </h3>
            <div className="rule mb-4 mt-3" />
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
                    {/* Tooltip explicative au survol (desktop uniquement) */}
                    <div className="hidden sm:block absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-paper text-ink text-xs rounded-[4px] px-3 py-2 whitespace-nowrap shadow-lg border border-ink/15 z-10">
                      Ce score reflète la compatibilité de vos positions politiques.
                      <br />
                      Ce n'est pas une mesure scientifique exacte.
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {axes.map((axis, idx) => {
            const { left, right } = poleScores[axis];
            const total = left + right || 1;
            const pctLeft = Math.round((left / total) * 100);
            const pctRight = 100 - pctLeft;
            const labels = axisLabelMap.get(axis) ?? {
              left: "Gauche",
              right: "Droite",
            };

            return (
              <div
                key={axis}
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
                  {axis}
                </div>
              </div>
            );
          })}

          {/* Badges */}
          <div className="mt-10 pt-8 border-t border-rule">
            <h2 className="text-lg sm:text-xl font-semibold mb-5 text-center text-ink">
              Badges obtenus
            </h2>

            {badges.length === 0 ? (
              <p className="text-center text-sm text-ink2 py-8 bg-paper2 rounded-md border border-rule">
                Aucun badge pour l'instant. Réessaie avec d'autres réponses.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 place-items-center">
                {badges.map((badge, idx) => (
                  <div
                    key={badge.id}
                    className="relative group flex flex-col items-center"
                    title={badge.description}
                    style={{
                      animation: disableAnimations ? 'none' : `popIn 0.4s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-1 ring-rule bg-paper transition-transform duration-200 group-hover:scale-105">
                      <img
                        src={badge.icon}
                        alt={badge.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2 text-xs sm:text-sm text-ink text-center font-medium leading-normal">
                      {badge.label}
                    </span>

                    {/* Tooltip desktop */}
                    <div className="pointer-events-none hidden md:block absolute bottom-full mb-3 w-56 px-3 py-2 bg-paper text-ink text-sm rounded-[4px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-ink/15 shadow-xl">
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onRestart}
              className="btn-ink px-7 py-3 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
            >
              Recommencer le test
            </button>
          </div>
        </div>
      )}

      {/* ────────────── Onglet : Diagramme + Comparateur ────────────── */}
      {activeTab === "diagram" && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-semibold">
              Comparateur de profils
            </h3>
            <p className="text-sm text-ink2 mt-1">
              Choisissez jusqu'à {MAX_COMPARE} figures à superposer sur le diagramme.
            </p>
          </div>

          {/* Sélection des profils de référence */}
          <div className="rounded-xl border border-rule bg-paper2 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-rule">
              <h4 className="flex items-center gap-2 text-xs font-semibold text-ink2 uppercase tracking-[0.15em]">
                <UserGroupIcon className="w-4 h-4" />
                Figures politiques
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

          {/* Profils sauvegardés */}
          {savedProfiles.length > 0 && (
            <div className="bg-paper2 rounded-xl p-4 border border-rule">
              <h4 className="text-xs font-semibold text-ink2 mb-3 uppercase tracking-[0.15em]">
                Vos profils sauvegardés
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
                        {new Date(profile.createdAtISO).toLocaleDateString()}
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
          <div className="w-full h-80 sm:h-96 md:h-[32rem] px-2 sm:px-4 md:px-6 min-w-0 bg-paper2 rounded-xl border border-rule p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={multiRadarData}
                margin={{ top: 16, right: 56, bottom: 20, left: 56 }}
              >
                <PolarGrid stroke="rgba(35,32,26,0.15)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={<RadarAxisTick />}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(35,32,26,0.55)", fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                />

                {/* Radar pour "Vous" - seulement en mode normal */}
                {!explorerMode && (
                  <Radar
                    name="Vous"
                    dataKey="Vous"
                    stroke={USER_COLOR}
                    fill={USER_COLOR}
                    fillOpacity={0.18}
                    strokeWidth={3}
                    isAnimationActive={false}
                  />
                )}

                {/* Radars pour les profils sélectionnés */}
                {selectedProfiles.map((profileId) => {
                  const profile = [...referenceProfiles, ...savedProfiles].find(
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

                <Tooltip content={<RadarTooltip axisLabelMap={axisLabelMap} />} />
                <Legend
                  wrapperStyle={{ color: "#23201A" }}
                  iconType="circle"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {selectedProfiles.length === 0 && (
            <p className="text-center text-ink2 text-sm">
              Sélectionnez des profils ci-dessus pour les comparer sur le graphique.
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
                  Annuaire des figures politiques
                </h3>
                <p className="text-ink2 text-sm mt-1">
                  Classées de gauche à droite. Choisissez une figure pour voir ses positions, axes et badges.
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
                          Voir →
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
                const profile = referenceProfiles.find((p) => p.id === selectedPoliticalProfile);
                if (!profile) return null;

                const profileScores = calculatePoleScores(profile.answers, questions);
                const profileBadges = evaluateBadges(profile.answers, questions, profileScores);
                const sortedAxes = [...ideologicalAxes].sort((a, b) => a.sortIndex - b.sortIndex);

                return (
                  <div className="space-y-6">
                    {/* Bouton retour */}
                    <button
                      onClick={() => setSelectedPoliticalProfile(null)}
                      className="btn-outline inline-flex items-center gap-2 px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                    >
                      ← Retour à la liste
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
                      <h3 className="text-xl font-bold mb-4 text-ink">Positions sur les axes</h3>
                      <div className="space-y-6">
                        {sortedAxes.map((axisInfo) => {
                          const axisScore = profileScores[axisInfo.axis];
                          if (!axisScore) return null;

                          const { left, right } = axisScore;
                          const total = left + right || 1;
                          const leftPct = Math.round((left / total) * 100);
                          const rightPct = Math.round((right / total) * 100);

                          return (
                            <div key={axisInfo.axis} className="space-y-2">
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
                          Badges obtenus
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 place-items-center">
                          {profileBadges.map((badge, idx) => (
                            <div
                              key={badge.id}
                              className="relative group flex flex-col items-center"
                              title={badge.description}
                              style={{
                                animation: disableAnimations ? 'none' : `popIn 0.4s ease-out ${idx * 0.1}s both`,
                              }}
                            >
                              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-1 ring-rule bg-paper transition-transform duration-200 group-hover:scale-105">
                                <img
                                  src={badge.icon}
                                  alt={badge.label}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <span className="mt-2 text-xs sm:text-sm text-ink text-center font-medium">
                                {badge.label}
                              </span>

                              {/* Tooltip desktop */}
                              <div className="pointer-events-none hidden md:block absolute bottom-full mb-3 w-56 px-3 py-2 bg-paper text-ink text-sm rounded-[4px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-ink/15 shadow-xl">
                                {badge.description}
                              </div>
                            </div>
                          ))}
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
            Explication des axes
          </h2>
          <p className="text-sm sm:text-base text-ink/85 max-w-prose mx-auto px-1 leading-relaxed">
            Les positions en <span style={{ color: LEFT_COLOR }} className="font-semibold">rouge</span> sont
            associées à la gauche, et celles en{" "}
            <span style={{ color: RIGHT_COLOR }} className="font-semibold">bleu</span> à la droite, selon des codes
            politiques classiques, mais avec de nombreuses exceptions.
            <br /><br />
            Certaines idées dites "de gauche" peuvent être reprises par la droite, et inversement : par exemple, un
            discours d'ordre et de sécurité peut être défendu à gauche au nom de la justice sociale, tandis que des
            politiques de régulation économique peuvent être soutenues à droite pour protéger la nation ou les
            petites entreprises.
            <br /><br />
            Il est aussi possible d'adhérer à des éléments "rouges" et "bleus" d'une même idée : on peut vouloir un
            État fort qui encadre le marché, tout en refusant la hiérarchie rigide dans l'entreprise.
            <br /><br />
            Ce test cherche à donner une vision d'ensemble cohérente de vos orientations, mais il ne peut pas
            refléter toutes les nuances et contradictions qui composent une pensée politique réelle.
          </p>

          {ideologicalAxes
            .sort((a, b) => a.sortIndex - b.sortIndex)
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
              À propos
            </h3>
            <p className="mb-2">
              Le code couleur rouge/bleu renvoie aux tendances classiquement
              associées à la gauche et à la droite.
            </p>
            <p className="mb-2">
              Mais ces catégories se croisent souvent : certains partis de
              gauche défendent des idées jugées conservatrices, tandis que des
              partis de droite reprennent des revendications sociales.
            </p>
            <p>
              Ce test ne cherche pas à te coller une étiquette, mais à t'aider
              à comprendre où tu te situes sur différents axes.
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
