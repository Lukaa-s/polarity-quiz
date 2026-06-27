// src/components/QuestionEnhanced.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type QuestionProps = {
  question: { id: string; text: string; explanation?: string };
  onAnswer: (id: string, idx: number) => void;
  onBack: () => void;
  onRestart?: () => void;
  currentIndex: number;
  total: number;
};

// Échelle divergente accord → désaccord. Verts/rouges = sémantique, conservés.
// Neutre central en gris papier chaud (et non bleuté) pour ne pas évoquer "droite".
const BTN_BG = [
  "#2E7D32", // +++ vert soutenu
  "#4F9D52", // ++ vert
  "#A7CFA2", // + vert clair
  "#D8D2C4", // 0 neutre, stone (papier)
  "#E8B7AE", // - rose terni
  "#D9594F", // -- rouge
  "#C62828", // --- rouge soutenu
] as const;

const BTN_TEXT = [
  "#F6F3EC", // sur vert foncé
  "#F6F3EC",
  "#23201A", // sur vert clair → encre
  "#23201A", // neutre → encre
  "#23201A", // sur rose terni → encre
  "#F6F3EC", // sur rouge moyen
  "#F6F3EC", // sur rouge foncé
] as const;

// Emojis retirés des boutons de réponse

export default function QuestionEnhanced({
  question,
  onAnswer,
  onBack,
  onRestart,
  currentIndex,
  total,
}: QuestionProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Reset animation when question changes
  useEffect(() => {
    setSelectedIdx(null);
    setShowExplanation(false);
  }, [question.id]);

  const handleRestart = () => {
    if (onRestart) onRestart();
    else window.location.reload();
  };

  const handleAnswer = (idx: number) => {
    setSelectedIdx(idx);
    // Petit délai pour l'animation
    setTimeout(() => {
      onAnswer(question.id, idx);
    }, 300);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full px-3 sm:px-4 lg:px-6 py-4"
    >
      <div className="mx-auto w-full max-w-2xl md:max-w-3xl">
        {/* Écho du spectre : motif de marque */}
        <div
          className="h-1 w-full rounded-full overflow-hidden mb-5"
          style={{ background: "linear-gradient(90deg, #C62828 0%, #D8D2C4 50%, #1565C0 100%)" }}
          aria-hidden="true"
        />

        {/* En-tête : index éditorial + reprise */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl sm:text-3xl font-semibold text-ink tabular-nums leading-none">
              Q.{String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-ink2 font-medium tabular-nums">/ {total}</span>
            <span className="hidden sm:inline text-xs text-ink2 ml-1 tabular-nums">· {progress}%</span>
          </div>
          <button
            onClick={handleRestart}
            className="text-xs sm:text-sm text-ink2 underline underline-offset-4 decoration-rule hover:text-ink hover:decoration-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink rounded"
          >
            Recommencer
          </button>
        </div>

        {/* Barre de progression visuelle */}
        <div className="mb-7 h-1 rounded-full bg-rule overflow-hidden">
          <motion.div
            className="h-full bg-ink"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Énoncé */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-semibold leading-[1.12] tracking-tight mb-7 text-ink [text-wrap:balance]"
        >
          {question.text}
        </motion.h2>

        {/* Choix avec animations */}
        <div className="flex flex-col gap-2.5 mb-3">
          {choices.map((label, idx) => {
            const isSelected = selectedIdx === idx;
            const isDimmed = selectedIdx !== null && selectedIdx !== idx;
            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: isDimmed ? 0.4 : 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.04 * idx, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleAnswer(idx)}
                disabled={selectedIdx !== null}
                className={`relative w-full text-left rounded-[4px] min-h-14 px-4 py-3 font-medium transition-[box-shadow,transform] duration-150
                  ${isSelected ? "ring-2 ring-ink ring-offset-2 ring-offset-paper2" : "hover:translate-x-0.5"}
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper2
                `}
                style={{
                  backgroundColor: BTN_BG[idx],
                  color: BTN_TEXT[idx],
                }}
              >
                <span>{label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Ancres de l'échelle */}
        <div className="flex items-center justify-between text-[0.7rem] sm:text-xs uppercase tracking-[0.15em] text-ink2 mb-6 px-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: "#2E7D32" }} aria-hidden="true" />
            D'accord
          </span>
          <span className="inline-flex items-center gap-1.5">
            Pas d'accord
            <span className="h-2 w-2 rounded-full" style={{ background: "#C62828" }} aria-hidden="true" />
          </span>
        </div>

        {/* Navigation + explication */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-3 items-center justify-between"
        >
          <button
            onClick={onBack}
            disabled={currentIndex === 0}
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
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
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
