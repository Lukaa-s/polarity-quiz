// src/components/PoleFaceoff.tsx
// Face-à-face cinétique : boucle sur les 14 clivages, chacun avec ses 2 pôles.
// Principe : 2 pôles par idée, jamais un axe global.
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocalizedAxes } from "../i18n/data";

const LEFT_COLOR = "#C62828";
const RIGHT_COLOR = "#1565C0";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function PoleFaceoff() {
  const reduce = useReducedMotion();
  // Axes localisés (les libellés de pôles suivent la langue courante).
  const localizedAxes = useLocalizedAxes();
  const axes = useMemo(
    () => [...localizedAxes].sort((a, b) => a.sortIndex - b.sortIndex),
    [localizedAxes]
  );
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % axes.length), 3200);
    return () => clearInterval(id);
  }, [reduce, axes.length]);

  const axis = axes[i % axes.length];

  return (
    <div className="select-none flex min-h-[9rem] sm:min-h-[7rem] items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={axis.id}
          className="w-full"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Nom du clivage */}
          <p className="text-center text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-ink2 mb-4 sm:mb-5">
            {axis.axis}
          </p>

          {/* Les deux pôles, entrant par les côtés */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <motion.span
              initial={reduce ? false : { opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-display text-2xl sm:text-3xl md:text-[2.6rem] font-semibold leading-tight text-center sm:text-right sm:flex-1 sm:min-w-0 [text-wrap:balance]"
              style={{ color: LEFT_COLOR }}
            >
              {axis.left.label}
            </motion.span>

            {/* Charnière */}
            <span className="block h-2 w-2 rotate-45 bg-ink shrink-0" aria-hidden="true" />

            <motion.span
              initial={reduce ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: 28 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-display text-2xl sm:text-3xl md:text-[2.6rem] font-semibold leading-tight text-center sm:text-left sm:flex-1 sm:min-w-0 [text-wrap:balance]"
              style={{ color: RIGHT_COLOR }}
            >
              {axis.right.label}
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
