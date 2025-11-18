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

// Palette par niveau (plus visible, flat, cohérente avec la vibe hero)
const BTN_BG = [
  "#2E7D32", // +++ vert soutenu
  "#43A047", // ++ vert
  "#81C784", // + vert clair
  "#CFD8E6", // 0 neutre légèrement bleuté
  "#FFCDD2", // - rose clair
  "#EF5350", // -- rouge
  "#C62828", // --- rouge soutenu
] as const;

const BTN_TEXT = [
  "#F8F9FA", // sur vert foncé
  "#F8F9FA",
  "#0B1220", // sur vert clair
  "#0B1220", // neutre bleuté
  "#7A1F26", // sur rose clair
  "#F8F9FA", // sur rouge moyen
  "#F8F9FA", // sur rouge foncé
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
        {/* Header avec compteur et boutons */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-white/90 mb-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium backdrop-blur">
              Question {currentIndex + 1} / {total}
            </span>
            <span className="hidden sm:inline text-white/70">
              {progress}% complété
            </span>
          </div>
          <button
            onClick={handleRestart}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
          >
            🔄 Recommencer
          </button>
        </div>

        {/* Barre de progression visuelle */}
        <div className="mb-6 h-2 rounded-full bg-white/10 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Énoncé */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight mb-6 text-white"
        >
          {question.text}
        </motion.h2>

        {/* Choix avec animations */}
        <div className="flex flex-col gap-3 mb-6">
          {choices.map((label, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
              onClick={() => handleAnswer(idx)}
              disabled={selectedIdx !== null}
              className={`group relative w-full text-left rounded-2xl min-h-14 px-4 py-3 font-medium transition-all
                ${selectedIdx === idx ? "scale-105 shadow-2xl" : "hover:scale-[1.02] active:scale-[0.98]"}
                ${selectedIdx !== null && selectedIdx !== idx ? "opacity-50" : ""}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50
                shadow-lg hover:shadow-xl
              `}
              style={{
                backgroundColor: BTN_BG[idx],
                color: BTN_TEXT[idx],
              }}
            >
              <span>{label}</span>

              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Navigation + explication */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 items-center justify-between"
        >
          <button
            onClick={onBack}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-sm rounded-full border border-white/15 bg-white/5 text-white/95 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
          >
            ← Précédent
          </button>

          {question.explanation && (
            <button
              onClick={() => setShowExplanation((v) => !v)}
              aria-expanded={showExplanation}
              aria-controls="q-explanation"
              className="px-4 py-2 text-sm rounded-full border border-white/15 bg-white/5 text-white/95 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
            >
              {showExplanation ? "Masquer 🔼" : "Aide 💡"}
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
              <div className="p-4 rounded-2xl border border-white/15 bg-white/10 text-white/90 text-sm leading-relaxed backdrop-blur-sm shadow-lg">
                <div className="flex items-start gap-2">
                  <span className="text-xl shrink-0">💡</span>
                  <p>{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
