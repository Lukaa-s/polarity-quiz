// src/App.tsx
import { useState, useMemo, useEffect } from "react";
import questionsData from "./data/questions.json";
import { ideologicalAxes } from "./data/axisexplaination";
import type { QuestionDef } from "./utils/scoring";
import QuestionEnhanced from "./components/QuestionEnhanced";
import ResultEnhanced from "./components/ResultEnhanced";
import Footer from "./components/Footer";
import { calculatePoleScores } from "./utils/scoring";
import { evaluateBadges } from "./utils/badges";
import { badges as allBadges } from "./data/badges";
import { decodeResults } from "./utils/shareResults";
import { initAnalytics, trackTestStarted, trackTestCompleted, trackExplorerMode } from "./utils/analytics";

// Heroicons
import {
  ScaleIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

// ---- Seeded RNG + date Paris ----
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    // FNV-1a 32-bit
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parisDayKey(d = new Date()): string {
  // "YYYY-MM-DD" à l'heure de Paris, stable toute la journée
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(d); // ex: "2025-08-24"
}

function getDailySeed(): { key: string; seed: number } {
  const urlSeed = new URLSearchParams(window.location.search).get("seed");
  const key = urlSeed ?? parisDayKey();
  return { key, seed: fnv1a(key) };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const App: React.FC = () => {
  const { key: seedKey, seed } = useMemo(getDailySeed, []);
  const questions = useMemo(() => shuffleWithSeed(questionsData as QuestionDef[], seed), [seed]);
  console.log("[Questions seed] key=%s seed=%d", seedKey, seed);

  // Constantes dynamiques
  const AXES_COUNT = ideologicalAxes.length;
  const QUESTIONS_COUNT = questionsData.length;

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [explorerMode, setExplorerMode] = useState(false);
  const [sharedResultsName, setSharedResultsName] = useState<string | undefined>(undefined);
  const [isViewingSharedResults, setIsViewingSharedResults] = useState(false);

  // Initialiser analytics au chargement de l'app
  useEffect(() => {
    initAnalytics();
  }, []);

  // Détecter les résultats partagés dans l'URL au chargement
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsParam = urlParams.get('results');

    if (resultsParam) {
      const decodedResults = decodeResults(resultsParam);

      if (decodedResults) {
        // Charger les résultats partagés
        setAnswers(decodedResults.answers);
        setSharedResultsName(decodedResults.name);
        setSubmitted(true);
        setIsViewingSharedResults(true);

        console.log('[Shared Results] Loaded results from URL', {
          name: decodedResults.name,
          timestamp: decodedResults.timestamp,
          questionsCount: Object.keys(decodedResults.answers).length,
        });
      } else {
        console.error('[Shared Results] Failed to decode results from URL');
      }
    }
  }, []);

  const handleAnswer = (id: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [id]: idx }));
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setSubmitted(true);
      // Track la complétion du test
      trackTestCompleted();
    }
  };

  const handleBack = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setHasStarted(false);
    setExplorerMode(false);
  };

  const poleScores = calculatePoleScores(answers, questions);
  const unlockedBadges = evaluateBadges(answers, questions, poleScores);
  console.log("📝 [App] answers:", answers);
  console.log("📝 [App] poleScores:", poleScores);
  console.log("📝 [App] unlockedBadges:", unlockedBadges);

  const LEFT_COLOR = "#C62828";
  const RIGHT_COLOR = "#1565C0";

  // ──────────────────────────────────────────────────────────────────────────────
  // MODE EXPLORATEUR
  // ──────────────────────────────────────────────────────────────────────────────
  if (explorerMode) {
    return (
      <div className="min-h-dvh w-full bg-[#10284f] text-white flex flex-col px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full bg-white/5 backdrop-blur-sm text-[#F8F9FA] p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl border border-white/10 max-w-screen-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl space-y-4 sm:space-y-6">
            {/* Header avec retour */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold">Exploration des profils politiques</h1>
              <button
                onClick={() => setExplorerMode(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-white/15 bg-white/5 text-white/95 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
              >
                ← Retour
              </button>
            </div>

            {/* Utilisation de ResultEnhanced en mode explorateur */}
            <ResultEnhanced
              poleScores={{}}
              questions={questions}
              badges={[]}
              onRestart={handleRestart}
              currentAnswers={{}}
              explorerMode={true}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // ÉCRAN D'ACCUEIL — HERO (sauf si on consulte des résultats partagés)
  // ──────────────────────────────────────────────────────────────────────────────
  if (!hasStarted && !isViewingSharedResults) {
    return (
      <div className="relative min-h-dvh w-full bg-[#10284f] text-white overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* décor radial hero, plus bleu, plus léger */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-20"
            style={{ background: `radial-gradient(50% 50% at 50% 50%, ${RIGHT_COLOR} 0%, rgba(0,0,0,0) 60%)` }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-10"
            style={{ background: `radial-gradient(50% 50% at 50% 50%, ${LEFT_COLOR} 0%, rgba(0,0,0,0) 60%)` }}
          />
        </div>

        {/* HERO principal */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-dvh flex items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="w-full max-w-4xl text-center space-y-8 sm:space-y-10">

              {/* Badge du jour */}
              <div className="flex justify-center">
                <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs sm:text-sm text-white/90 backdrop-blur-md shadow-lg">
                  <ClockIcon className="mr-2 h-4 w-4 opacity-80" />
                  Test du jour : <span className="ml-1.5 font-semibold text-white">{seedKey}</span>
                </p>
              </div>

              {/* Titre principal */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                  <span
                    className="block text-transparent bg-clip-text drop-shadow-2xl"
                    style={{ backgroundImage: `linear-gradient(135deg, ${LEFT_COLOR}, ${RIGHT_COLOR})` }}
                  >
                    Polarity Quiz
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90 tracking-tight">
                  Test de positionnement politique
                </p>
              </div>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed px-4">
                Répondez à une série d'affirmations concrètes pour situer vos convictions sur plusieurs axes politiques clés. À la fin du test, vous obtiendrez un profil clair, nuancé et facilement partageable.
              </p>

              {/* Stats rapides */}
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm sm:text-base text-white/75 font-medium">
                <span className="inline-flex items-center gap-2">
                  <QuestionMarkCircleIcon className="h-5 w-5 opacity-80" />
                  {QUESTIONS_COUNT} affirmations
                </span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="inline-flex items-center gap-2">
                  <ScaleIcon className="h-5 w-5 opacity-80" />
                  {AXES_COUNT} axes
                </span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="inline-flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 opacity-80" />
                  15–20 min
                </span>
              </div>

              {/* Boutons CTA */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setHasStarted(true);
                    trackTestStarted();
                  }}
                  className="group relative inline-flex justify-center items-center rounded-full px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold shadow-2xl shadow-black/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 text-white w-full sm:w-auto transition-all hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${LEFT_COLOR}, ${RIGHT_COLOR})` }}
                >
                  <span className="relative z-10">Commencer le test</span>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>

                <button
                  onClick={() => {
                    setExplorerMode(true);
                    trackExplorerMode();
                  }}
                  className="inline-flex justify-center items-center gap-2.5 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold shadow-xl shadow-black/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/30 text-white w-full sm:w-auto border-2 border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/35 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                >
                  <UserGroupIcon className="w-5 h-5" />
                  Explorer les profils
                </button>
              </div>

              {/* Note explicative */}
              <p className="mt-6 text-xs sm:text-sm text-white/60 max-w-2xl mx-auto italic px-4">
                Si une question vous semble floue, une explication vous est proposée. En cas d'hésitation, évitez la réponse <em className="text-white/70 not-italic font-medium">neutre</em> et choisissez plutôt <em className="text-white/70 not-italic font-medium">plutôt d'accord</em> ou <em className="text-white/70 not-italic font-medium">plutôt pas d'accord</em>.
              </p>
            </div>
          </div>
        </div>

        {/* Bande Features sous le hero (nouvel emplacement) */}
        <section className="relative z-10 border-t border-white/10 bg-white/5/20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 opacity-90" />
                <span className="text-white/90">Positionnement détaillé sur chaque axe</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 opacity-90" />
                <span className="text-white/90">Profil visuel interactif</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 opacity-90" />
                <span className="text-white/90">Indice de proximité avec des figures politiques</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 opacity-90" />
                <span className="text-white/90">Aucune inscription, résultats instantanés</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // ÉCRAN PRINCIPAL (pendant / après)
  // ──────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh w-full bg-[#10284f] text-white flex flex-col px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full bg-white/5 backdrop-blur-sm text-[#F8F9FA] p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl border border-white/10 max-w-screen-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-4 sm:space-y-6">
          {/* Barre de progression sticky (cachée si on consulte des résultats partagés) */}
          {!isViewingSharedResults && (
            <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pt-1">
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.min(100, Math.round(((submitted ? questions.length : currentIndex) / questions.length) * 100))}%`,
                    background: `linear-gradient(90deg, ${LEFT_COLOR}, ${RIGHT_COLOR})`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Bannière si on consulte des résultats partagés */}
          {isViewingSharedResults && (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white">
                  {sharedResultsName
                    ? `Résultats de ${sharedResultsName}`
                    : "Résultats partagés"}
                </h2>
                <p className="text-sm text-white/70">
                  Vous consultez des résultats partagés. Faites votre propre test pour comparer !
                </p>
              </div>
              <button
                onClick={() => {
                  // Nettoyer l'URL et recommencer
                  window.history.replaceState({}, '', window.location.pathname);
                  setIsViewingSharedResults(false);
                  setSharedResultsName(undefined);
                  handleRestart();
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition border border-white/20"
              >
                Faire mon test
              </button>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold">
            {isViewingSharedResults
              ? sharedResultsName
                ? `Résultats de ${sharedResultsName}`
                : "Résultats partagés"
              : "Ton Profil Politique"}
          </h1>

          {!submitted ? (
            <QuestionEnhanced
              question={questions[currentIndex]}
              currentIndex={currentIndex}
              total={questions.length}
              onAnswer={handleAnswer}
              onBack={handleBack}
              onRestart={handleRestart}
            />
          ) : (
            <ResultEnhanced
              poleScores={poleScores}
              questions={questions}
              badges={unlockedBadges}
              onRestart={handleRestart}
              currentAnswers={answers}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
