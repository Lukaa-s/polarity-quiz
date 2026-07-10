// src/components/QuestionEnhanced.tsx
/* Hallmark · component: réponse Likert 7 points « bulletin » · genre: editorial · theme: Scrutin
 * pre-emit critique: P4 H5 E4 S5 R4 V5
 * states: default · hover · focus-visible · active · advancing (aria-disabled) · selected · dimmed
 * échelle: rang horizontal de cases à cocher de scrutin — taille = intensité (symétrique),
 * losange pivot au neutre, croix d'encre tracée à la sélection. Aucune teinte (valence,
 * daltonisme, rouge=gauche réservé) ; la direction est portée par la position + les ancrages.
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

// Bulletin de vote : 7 cases à cocher en rang horizontal. L'INTENSITÉ est portée
// par la TAILLE de la case (symétrique autour du neutre, marqué par un losange
// pivot), la DIRECTION par la position + les ancrages « D'accord / Pas d'accord ».
// Cocher trace une croix d'encre dans la case. dist = |idx - 3| → taille.
const BOX: Record<1 | 2 | 3, string> = {
  1: "h-6 w-6 sm:h-7 sm:w-7",
  2: "h-[30px] w-[30px] sm:h-9 sm:w-9",
  3: "h-9 w-9 sm:h-11 sm:w-11",
};

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
  // Roving tabindex du radiogroup : Tab entre sur le neutre (point d'entrée non
  // biaisé), les flèches déplacent le focus SANS sélectionner (la sélection
  // auto-avance, elle ne doit donc jamais suivre le focus), Entrée/Espace cochent.
  const [focusIdx, setFocusIdx] = useState<number>(answeredIdx ?? 3);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [groupFocused, setGroupFocused] = useState(false);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isFirstQuestionRender = useRef(true);

  // Reset (et pré-sélection de la réponse déjà donnée) quand la question change.
  // Annule aussi tout timeout de transition en attente pour éviter une navigation fantôme.
  useEffect(() => {
    setSelectedIdx(answeredIdx);
    setShowExplanation(false);
    setIsAdvancing(false);
    setFocusIdx(answeredIdx ?? 3);
    setHoverIdx(null);

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
    if (isAdvancing) return;
    setSelectedIdx(idx);
    setFocusIdx(idx);
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

  // Navigation aux flèches dans le radiogroup (roving tabindex, avec bouclage).
  const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (focusIdx + 1) % choices.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (focusIdx + choices.length - 1) % choices.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = choices.length - 1;
    if (next === null) return;
    e.preventDefault();
    setFocusIdx(next);
    optionRefs.current[next]?.focus();
  };

  // Libellé affiché sous l'échelle : survol > focus clavier > réponse cochée.
  const captionIdx = hoverIdx ?? (groupFocused ? focusIdx : null) ?? selectedIdx;

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

        {/* Échelle « bulletin » : 7 cases à cocher, l'accord à gauche, le désaccord
            à droite, le neutre en losange pivot. Cocher trace une croix d'encre. */}
        <div className="mb-6">
          {/* Ancrages de direction (les libellés exacts passent par aria-label + légende) */}
          <div
            aria-hidden="true"
            className="flex items-baseline justify-between mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] text-ink2"
          >
            <span>D'accord</span>
            <span>Pas d'accord</span>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="question-title"
            onKeyDown={handleGroupKeyDown}
            onFocus={() => setGroupFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setGroupFocused(false);
            }}
            className={`flex items-center gap-1 sm:gap-2 ${isAdvancing ? "pointer-events-none" : ""}`}
          >
            {choices.map((label, idx) => {
              const isSelected = selectedIdx === idx;
              const isDimmed = selectedIdx !== null && selectedIdx !== idx;
              const dist = Math.abs(idx - 3); // 3,2,1,0,1,2,3 — intensité
              return (
                <motion.button
                  key={idx}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={label}
                  /* aria-disabled (pas l'attribut disabled natif) : un bouton
                     désactivé nativement éjecte le focus vers <body> à chaque
                     réponse ; le garde est dans handleAnswer + pointer-events. */
                  aria-disabled={isAdvancing || undefined}
                  tabIndex={focusIdx === idx ? 0 : -1}
                  onClick={() => handleAnswer(idx)}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onFocus={() => setFocusIdx(idx)}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: isDimmed ? 0.55 : 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.22,
                    delay: reduceMotion || selectedIdx !== null ? 0 : 0.035 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex h-12 flex-1 items-center justify-center rounded active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
                >
                  {dist === 0 ? (
                    // Pivot neutre : losange (écho du motif d'accueil), plein quand coché
                    <span
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-45 border-[1.5px] transition-colors duration-150 ${
                        isSelected
                          ? "border-ink bg-ink"
                          : "border-ink2/70 bg-paper group-hover:bg-paper3"
                      }`}
                    />
                  ) : (
                    <span
                      className={`relative flex items-center justify-center rounded-[3px] border-[1.5px] transition-colors duration-150 ${BOX[dist as 1 | 2 | 3]} ${
                        isSelected
                          ? "border-ink bg-paper"
                          : "border-ink2/70 bg-paper group-hover:bg-paper3"
                      }`}
                    >
                      {isSelected && (
                        // Croix d'encre tracée dans la case (deux traits légèrement
                        // irréguliers : le geste du vote papier, pas une icône système)
                        <svg
                          viewBox="0 0 24 24"
                          className="absolute inset-0 h-full w-full p-[3px] text-ink"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.75}
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M6 6.5 L18 17.5"
                            initial={reduceMotion ? false : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
                          />
                          <motion.path
                            d="M18 6 L6.5 18"
                            initial={reduceMotion ? false : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.16,
                              delay: reduceMotion ? 0 : 0.1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        </svg>
                      )}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Légende : hauteur fixe (pas de décalage), redondante avec les aria-label */}
          <div aria-hidden="true" className="mt-3 h-6 text-center text-sm font-medium text-ink2">
            {captionIdx !== null ? choices[captionIdx] : ""}
          </div>
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
