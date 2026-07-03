// src/components/QuestionEnhanced.tsx
/* Hallmark · component: réponse Likert 7 points · genre: editorial · theme: Scrutin
 * states: default · hover · focus-visible · active · disabled · selected
 * échelle: intensité d'encre (pas de teinte : valence, daltonisme, rouge=gauche réservé)
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type QuestionProps = {
  question: { id: string; text: string; explanation?: string };
  onAnswer: (id: string, idx: number) => void;
  onBack: () => void;
  onRestart?: () => void;
  currentIndex: number;
  total: number;
  /** Index de la réponse déjà donnée pour cette question (0-6), ou null si non répondue. */
  answeredIdx?: number | null;
};

// Échelle divergente accord → désaccord : l'INTENSITÉ est portée par la densité
// d'encre du marqueur (symétrique autour du neutre creux), la DIRECTION par la
// position et le libellé. Aucune teinte : le vert/rouge portait un jugement
// (bien/mal), excluait les daltoniens, et le rouge est réservé au pôle gauche.
const MARKER_ALPHA = [1, 0.68, 0.4, 0, 0.4, 0.68, 1] as const;
const INK = "35, 32, 26"; // --color-ink
const PAPER = "246, 243, 236"; // --color-paper

export default function QuestionEnhanced({
  question,
  onAnswer,
  onBack,
  onRestart,
  currentIndex,
  total,
  answeredIdx = null,
}: QuestionProps) {
  const reduceMotion = useReducedMotion();
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(answeredIdx);
  // Transition en cours (délai d'animation avant de passer à la question suivante) :
  // distinct de la pré-sélection, qui elle doit rester modifiable.
  const [isAdvancing, setIsAdvancing] = useState(false);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isFirstQuestionRender = useRef(true);

  // Reset (et pré-sélection de la réponse déjà donnée) quand la question change.
  // Annule aussi tout timeout de transition en attente pour éviter une navigation fantôme.
  useEffect(() => {
    setSelectedIdx(answeredIdx);
    setShowExplanation(false);
    setIsAdvancing(false);

    // Ramène le focus sur l'énoncé à chaque nouvelle question : sans ça, un
    // utilisateur clavier repart du haut du document 101 fois de suite.
    if (isFirstQuestionRender.current) {
      isFirstQuestionRender.current = false;
    } else {
      titleRef.current?.focus();
    }

    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const handleRestart = () => {
    if (isAdvancing) return;
    const confirmed = window.confirm(
      "Recommencer effacera toutes vos réponses. Voulez-vous vraiment repartir de zéro ?"
    );
    if (!confirmed) return;
    if (onRestart) onRestart();
    else window.location.reload();
  };

  const handleAnswer = (idx: number) => {
    setSelectedIdx(idx);
    setIsAdvancing(true);
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }
    // Petit délai pour l'animation (raccourci quand le mouvement est réduit)
    advanceTimeoutRef.current = setTimeout(() => {
      advanceTimeoutRef.current = null;
      onAnswer(question.id, idx);
    }, reduceMotion ? 120 : 300);
  };

  const choices = [
    "Tout à fait d'accord",
    "D'accord",
    "Plutôt d'accord",
    "Neutre",
    "Plutôt pas d'accord",
    "Pas d'accord",
    "Pas du tout d'accord",
  ];

  const progress = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -20 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
      className="w-full px-3 sm:px-4 lg:px-6 py-4"
    >
      <div className="mx-auto w-full max-w-2xl md:max-w-3xl">
        {/* Annonce de progression pour les lecteurs d'écran */}
        <div aria-live="polite" className="sr-only">
          Question {currentIndex + 1} sur {total}
        </div>

        {/* En-tête : index éditorial + reprise */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl sm:text-3xl font-semibold text-ink tabular-nums leading-none">
              Q.{String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-ink2 font-medium tabular-nums">/ {total}</span>
            <span className="hidden sm:inline text-xs text-ink2 ml-1 tabular-nums">· {progress}%</span>
          </div>
          <button
            onClick={handleRestart}
            disabled={isAdvancing}
            className="text-xs sm:text-sm text-ink2 underline underline-offset-4 decoration-rule hover:text-ink hover:decoration-ink transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-ink2 disabled:hover:decoration-rule focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink rounded"
          >
            Recommencer
          </button>
        </div>

        {/* Énoncé (grotesque, pas de serif sur les questions).
            tabIndex=-1 : cible du focus programmatique à chaque nouvelle question. */}
        <motion.h2
          ref={titleRef}
          id="question-title"
          tabIndex={-1}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug mb-8 text-ink [text-wrap:balance] outline-none"
        >
          {question.text}
        </motion.h2>

        {/* Choix : rampe d'intensité d'encre, direction portée par position + libellé */}
        <div role="group" aria-labelledby="question-title" className="flex flex-col gap-2.5 mb-6">
          {choices.map((label, idx) => {
            const isSelected = selectedIdx === idx;
            const isDimmed = selectedIdx !== null && selectedIdx !== idx;
            const alpha = MARKER_ALPHA[idx];
            const markerRgb = isSelected ? PAPER : INK;
            return (
              <motion.button
                key={idx}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: isDimmed ? 0.55 : 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.22,
                  delay: reduceMotion || selectedIdx !== null ? 0 : 0.035 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => handleAnswer(idx)}
                disabled={isAdvancing}
                aria-pressed={isSelected}
                className={`group relative flex w-full items-center gap-3 text-left rounded-[5px] min-h-14 px-4 py-3 font-medium border transition-colors duration-150
                  ${
                    isSelected
                      ? "bg-ink text-paper border-ink"
                      : "bg-paper text-ink border-rule hover:bg-paper3 active:translate-y-px"
                  }
                  disabled:cursor-not-allowed
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink
                `}
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                  style={
                    alpha === 0
                      ? { border: `1.5px solid rgba(${markerRgb}, 0.55)` }
                      : { backgroundColor: `rgba(${markerRgb}, ${alpha})` }
                  }
                />
                <span className="flex-1">{label}</span>
                {isSelected && (
                  <motion.svg
                    initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="h-5 w-5 shrink-0"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Navigation + explication */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.35 }}
          className="flex flex-wrap gap-3 items-center justify-between"
        >
          <button
            onClick={onBack}
            disabled={currentIndex === 0 || isAdvancing}
            className="btn-outline px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
          >
            ← Précédent
          </button>

          {question.explanation && (
            <button
              onClick={() => setShowExplanation((v) => !v)}
              aria-expanded={showExplanation}
              aria-controls="q-explanation"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink2 hover:text-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink rounded"
            >
              {showExplanation ? "Masquer l'aide" : "Afficher l'aide"}
              <svg
                className={`w-4 h-4 transition-transform ${showExplanation ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </motion.div>

        {/* Explication avec animation */}
        <AnimatePresence>
          {showExplanation && question.explanation && (
            <motion.div
              id="q-explanation"
              initial={reduceMotion ? false : { opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-[4px] border-l-2 border-ink bg-paper3 text-ink2 text-sm leading-relaxed">
                <p>{question.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
