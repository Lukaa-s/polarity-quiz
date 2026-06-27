// src/components/Question.tsx
import React, { useState } from "react";

export type QuestionProps = {
  question: { id: string; text: string; explanation?: string };
  onAnswer: (id: string, idx: number) => void;
  onBack: () => void;
  onRestart?: () => void;
  currentIndex: number;
  total: number;
};

// Palette par niveau (plus visible, flat, cohérente avec la vibe hero)
// +++ accord fort → --- désaccord fort
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

export default function Question({
  question,
  onAnswer,
  onBack,
  onRestart,
  currentIndex,
  total,
}: QuestionProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleRestart = () => {
    if (onRestart) onRestart();
    else window.location.reload();
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

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4">
      <div className="mx-auto w-full max-w-2xl md:max-w-3xl">
        {/* Header minimal */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-white/90 mb-4">
          <p aria-live="polite" className="inline-flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">
              Question {currentIndex + 1} / {total}
            </span>
          </p>
          <button
            onClick={handleRestart}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
          >
            Recommencer
          </button>
        </div>

        {/* Énoncé */}
        <h2 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight mb-5 text-white">
          {question.text}
        </h2>

        {/* Choix : flat, très colorés, sans chevron ni relief */}
        <div className="flex flex-col gap-3 mb-6">
          {choices.map((label, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(question.id, idx)}
              className="w-full text-left rounded-2xl min-h-12 px-4 py-3 font-medium transition md:hover:translate-x-[1px] md:hover:brightness-105 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
              style={{ backgroundColor: BTN_BG[idx], color: BTN_TEXT[idx] }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Navigation + explication */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <button
            onClick={onBack}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-sm rounded-full border border-white/15 bg-white/5 text-white/95 hover:bg-white/10 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
          >
            ← Précédent
          </button>

          <button
            onClick={() => setShowExplanation((v) => !v)}
            aria-expanded={showExplanation}
            aria-controls="q-explanation"
            className="px-4 py-2 text-sm rounded-full border border-white/15 bg-white/5 text-white/95 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
          >
            {showExplanation ? "Masquer l'explication" : "Afficher l'explication"}
          </button>
        </div>

        {/* Explication */}
        {showExplanation && question.explanation && (
          <div
            id="q-explanation"
            className="mt-3 p-4 rounded-2xl border border-white/15 bg-white/5 text-white/90 text-sm leading-relaxed backdrop-blur-sm"
          >
            {question.explanation}
          </div>
        )}
      </div>
    </div>
  );
}
