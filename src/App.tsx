// src/App.tsx
import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import questionsData from "./data/questions.json";
import { ideologicalAxes } from "./data/axisexplaination";
import type { QuestionDef } from "./utils/scoring";
import QuestionEnhanced from "./components/QuestionEnhanced";
import PoleFaceoff from "./components/PoleFaceoff";
import Footer from "./components/Footer";
import { calculatePoleScores } from "./utils/scoring";
import { evaluateBadges } from "./utils/badges";
import { decodeResults } from "./utils/shareResults";
import { initAnalytics, trackTestStarted, trackTestCompleted, trackExplorerMode } from "./utils/analytics";

// Heroicons
import { UserGroupIcon } from "@heroicons/react/24/solid";

// ResultEnhanced embarque recharts + html2canvas : chargement différé pour
// ne pas alourdir le bundle initial (écran d'accueil / questions).
const ResultEnhanced = lazy(() => import("./components/ResultEnhanced"));

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

// ---- Persistance de la progression (localStorage) ----
const PROGRESS_STORAGE_KEY = "pq_progress_v1";

type SavedProgress = {
  answers: Record<string, number>;
  seedKey: string;
  savedAtISO: string;
};

function readSavedProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.answers && typeof parsed.answers === "object") {
      return parsed as SavedProgress;
    }
    return null;
  } catch {
    // localStorage indisponible (navigation privée, quota, etc.)
    return null;
  }
}

function writeSavedProgress(data: SavedProgress) {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignoré : pas de persistance possible, l'app reste utilisable
  }
}

function clearSavedProgress() {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    // ignoré
  }
}

const App: React.FC = () => {
  const { key: seedKey, seed } = useMemo(getDailySeed, []);
  const questions = useMemo(() => shuffleWithSeed(questionsData as QuestionDef[], seed), [seed]);

  // Constantes dynamiques
  const AXES_COUNT = ideologicalAxes.length;

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [explorerMode, setExplorerMode] = useState(false);
  const [sharedResultsName, setSharedResultsName] = useState<string | undefined>(undefined);
  const [isViewingSharedResults, setIsViewingSharedResults] = useState(false);
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(null);

  // Initialiser analytics au chargement de l'app
  useEffect(() => {
    initAnalytics();
  }, []);

  // Détecter une progression non soumise au chargement (pour proposer une reprise)
  useEffect(() => {
    const existing = readSavedProgress();
    if (existing && Object.keys(existing.answers).length > 0) {
      setSavedProgress(existing);
    }
  }, []);

  // Sauvegarder la progression à chaque réponse (tant que le test est en cours)
  useEffect(() => {
    if (!hasStarted || submitted || isViewingSharedResults) return;
    if (Object.keys(answers).length === 0) return;
    writeSavedProgress({ answers, seedKey, savedAtISO: new Date().toISOString() });
  }, [answers, hasStarted, submitted, isViewingSharedResults, seedKey]);

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
      clearSavedProgress();
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
    clearSavedProgress();
    setSavedProgress(null);
  };

  const handleResumeProgress = () => {
    if (!savedProgress) return;
    const restoredAnswers = savedProgress.answers;
    const firstUnanswered = questions.findIndex((q) => !(q.id in restoredAnswers));
    setAnswers(restoredAnswers);
    if (firstUnanswered === -1) {
      // Toutes les questions du jour ont déjà une réponse : on va directement aux résultats.
      setSubmitted(true);
    } else {
      setCurrentIndex(firstUnanswered);
    }
    setHasStarted(true);
    setSavedProgress(null);
  };

  const handleDiscardProgress = () => {
    clearSavedProgress();
    setSavedProgress(null);
  };

  const poleScores = useMemo(() => calculatePoleScores(answers, questions), [answers, questions]);
  const unlockedBadges = useMemo(() => evaluateBadges(answers, questions, poleScores), [answers, questions, poleScores]);

  // ──────────────────────────────────────────────────────────────────────────────
  // MODE EXPLORATEUR
  // ──────────────────────────────────────────────────────────────────────────────
  if (explorerMode) {
    return (
      <div className="min-h-dvh w-full bg-paper text-ink flex flex-col px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full card text-ink p-4 sm:p-6 md:p-8 max-w-screen-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl space-y-4 sm:space-y-6">
            {/* Header avec retour */}
            <div className="flex items-start justify-between gap-3 border-b border-rule pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink2 font-semibold mb-1">
                  Polarity Quiz
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
                  Explorateur de profils
                </h1>
              </div>
              <button
                onClick={() => setExplorerMode(false)}
                className="btn-outline shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:ring-ink"
              >
                ← Retour
              </button>
            </div>

            {/* Utilisation de ResultEnhanced en mode explorateur */}
            <Suspense fallback={<ResultFallback />}>
              <ResultEnhanced
                poleScores={{}}
                questions={questions}
                badges={[]}
                onRestart={handleRestart}
                currentAnswers={{}}
                explorerMode={true}
              />
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // ÉCRAN D'ACCUEIL : une éditoriale (masthead, hero, spectre, sommaire, features)
  // ──────────────────────────────────────────────────────────────────────────────
  if (!hasStarted && !isViewingSharedResults) {
    return (
      <div className="relative min-h-dvh w-full bg-paper text-ink overflow-x-clip pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">

        {/* Masthead : nameplate « Polarity Quiz » */}
        <header className="relative z-10 border-b-2 border-ink">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-none">
              Polarity Quiz
            </h1>
            <p className="mt-3 text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] text-ink2">
              Test de positionnement politique
            </p>
          </div>
        </header>

        {/* Hero : aéré, l'animation est la pièce maîtresse */}
        <section className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="flex min-h-[72dvh] flex-col justify-center py-14 sm:py-20 space-y-10 sm:space-y-14">

            {/* La question */}
            <h2 className="text-center font-display font-semibold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-6xl [text-wrap:balance]">
              Où vous situez-vous&nbsp;?
            </h2>

            {/* Face-à-face cinétique : les 2 pôles de chaque clivage */}
            <PoleFaceoff />

            {/* Reprise d'une progression non soumise */}
            {savedProgress && (
              <div className="mx-auto w-full max-w-lg rounded-md border border-rule bg-paper2 px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
                <p className="text-sm text-ink2 text-center sm:text-left">
                  Une progression a été enregistrée sur cet appareil.
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleResumeProgress}
                    className="btn-ink inline-flex justify-center items-center px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                  >
                    Reprendre le test ({Object.keys(savedProgress.answers).length}/{questions.length} répondues)
                  </button>
                  <button
                    onClick={handleDiscardProgress}
                    className="btn-outline inline-flex justify-center items-center px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                  >
                    Repartir de zéro
                  </button>
                </div>
              </div>
            )}

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setHasStarted(true);
                  trackTestStarted();
                }}
                className="btn-ink inline-flex justify-center items-center px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:ring-ink w-full sm:w-auto"
              >
                Commencer le test
              </button>

              <button
                onClick={() => {
                  setExplorerMode(true);
                  trackExplorerMode();
                }}
                className="btn-outline inline-flex justify-center items-center gap-2.5 px-7 sm:px-9 py-4 text-base sm:text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:ring-ink w-full sm:w-auto"
              >
                <UserGroupIcon className="w-5 h-5" />
                Explorer les profils
              </button>
            </div>

            {/* Durée honnête du test (nombre de questions réel, pas un nombre en dur) */}
            <p className="text-center text-xs sm:text-sm text-ink2 tabular-nums">
              {questions.length} questions · environ 15 minutes
            </p>
          </div>
        </section>

        {/* Trois repères, sobres : motif ◊ en écho à l'animation */}
        <section className="relative z-10 border-t border-rule bg-paper2">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 sm:gap-10">
              {[
                `${AXES_COUNT} clivages, deux pôles sur chaque idée.`,
                "Un profil détaillé, nuancé et partageable.",
                "Sans inscription ni compte à créer.",
              ].map((point) => (
                <div key={point} className="flex flex-col items-center sm:items-start gap-3 text-center sm:text-left">
                  <span className="block h-2 w-2 rotate-45 bg-ink" aria-hidden="true" />
                  <p className="text-ink font-medium leading-snug max-w-[26ch]">{point}</p>
                </div>
              ))}
            </div>
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
    <div className="min-h-dvh w-full bg-paper text-ink flex flex-col px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full card text-ink p-4 sm:p-6 md:p-8 max-w-screen-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-4 sm:space-y-6">
          {/* Barre de progression sticky (cachée si on consulte des résultats partagés) */}
          {!isViewingSharedResults && (
            <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pt-0.5 pb-2 bg-paper2">
              <div className="h-px bg-rule overflow-hidden">
                <div
                  className="h-full bg-ink transition-[width] duration-500 ease-out"
                  style={{
                    width: `${Math.min(100, Math.round(((submitted ? questions.length : currentIndex) / questions.length) * 100))}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Bannière si on consulte des résultats partagés */}
          {isViewingSharedResults && (
            <div className="bg-paper3 border border-rule rounded-md p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-ink">
                  {sharedResultsName
                    ? `Résultats de ${sharedResultsName}`
                    : "Résultats partagés"}
                </h2>
                <p className="text-sm text-ink2">
                  Vous consultez des résultats partagés. Faites votre propre test pour comparer.
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
                className="btn-outline px-4 py-2 text-sm font-medium shrink-0"
              >
                Faire mon test
              </button>
            </div>
          )}

          {(submitted || isViewingSharedResults) && (
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {isViewingSharedResults
                ? sharedResultsName
                  ? `Résultats de ${sharedResultsName}`
                  : "Résultats partagés"
                : "Votre profil politique"}
            </h1>
          )}

          {!submitted ? (
            <QuestionEnhanced
              question={questions[currentIndex]}
              currentIndex={currentIndex}
              total={questions.length}
              onAnswer={handleAnswer}
              onBack={handleBack}
              onRestart={handleRestart}
              answeredIdx={answers[questions[currentIndex]?.id] ?? null}
            />
          ) : (
            <Suspense fallback={<ResultFallback />}>
              <ResultEnhanced
                poleScores={poleScores}
                questions={questions}
                badges={unlockedBadges}
                onRestart={handleRestart}
                currentAnswers={answers}
              />
            </Suspense>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Fallback simple pendant le chargement différé de ResultEnhanced (recharts + html2canvas)
function ResultFallback() {
  return (
    <div className="w-full py-16 text-center text-ink2">
      Chargement des résultats…
    </div>
  );
}

export default App;
