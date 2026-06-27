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

// Échelle divergente accord → désaccord. Tons assourdis (terreux, papier) pour
// rester éditorial. Neutre central en stone chaud, jamais bleuté.
const BTN_BG = [
  "#3F6F47", // +++ vert profond mat
  "#6E9A6E", // ++ vert moyen mat
  "#AEC4A6", // + vert pâle
  "#D8D2C4", // 0 neutre, stone (papier)
  "#D8B3A8", // - terracotta pâle
  "#B5685E", // -- brique mat
  "#9C3B33", // --- rouge brique profond
] as const;

const BTN_TEXT = [
  "#F6F3EC", // sur vert profond
  "#23201A", // sur vert moyen → encre
  "#23201A", // sur vert pâle → encre
  "#23201A", // neutre → encre
  "#23201A", // sur terracotta pâle → encre
  "#F6F3EC", // sur brique
  "#F6F3EC", // sur rouge brique
] as const;

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
            className="text-xs sm:text-sm text-ink2 underline underline-offset-4 decoration-rule hover:text-ink hover:decoration-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink rounded"
          >
            Recommencer
          </button>
        </div>

        {/* Énoncé (grotesque, pas de serif sur les questions) */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug mb-8 text-ink [text-wrap:balance]"
        >
          {question.text}
        </motion.h2>

        {/* Choix avec animations */}
        <div className="flex flex-col gap-2.5 mb-6">
          {choices.map((label, idx) => {
            const isSelected = selectedIdx === idx;
            const isDimmed = selectedIdx !== null && selectedIdx !== idx;
            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: isDimmed ? 0.55 : 1, y: 0 }}
                transition={{ duration: 0.22, delay: selectedIdx === null ? 0.035 * idx : 0, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleAnswer(idx)}
                disabled={selectedIdx !== null}
                className={`group relative flex w-full items-center justify-between gap-3 text-left rounded-[5px] min-h-14 px-4 py-3 font-medium transition-[filter,box-shadow] duration-150
                  ${isSelected ? "ring-2 ring-inset ring-ink" : "hover:brightness-[0.96]"}
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink
                `}
                style={{
                  backgroundColor: BTN_BG[idx],
                  color: BTN_TEXT[idx],
                }}
              >
                <span>{label}</span>
                {isSelected && (
                  <motion.svg
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
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
