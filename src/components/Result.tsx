// src/components/Result.tsx
import React, { useState } from "react";
import { QuestionDef } from "../utils/scoring";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ideologicalAxes } from "../data/axisexplaination";
import type { Badge } from "../data/badges";

// ──────────────────────────────────────────────────────────────────────────────
// Tooltip Radar (responsive + labels gauche/droite)
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
  const pctLeft = Math.round(
    Number(payload[0]?.value ?? payload[0]?.payload?.pctLeft ?? 0)
  );
  const pctRight = 100 - pctLeft;
  const meta =
    axisLabelMap.get(String(label)) ?? { left: "Gauche", right: "Droite" };

  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm">
      <div className="mb-1 font-medium text-white/90">{label}</div>
      <div className="text-white/90">
        {meta.left} {pctLeft}% · {meta.right} {pctRight}%
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────

export type ResultProps = {
  poleScores: Record<string, { left: number; right: number }>;
  questions: QuestionDef[];
  badges: Badge[];
  onRestart: () => void;
};

const LEFT_COLOR = "#C62828"; // Rouge (part gauche)
const RIGHT_COLOR = "#1565C0"; // Bleu (part droite)

export default function Result({
  poleScores,
  questions,
  onRestart,
  badges,
}: ResultProps) {
  const [activeTab, setActiveTab] =
    useState<"results" | "explained" | "diagram">("results");

  // ordre stable des axes = celui défini par ideologicalAxes
  const axes = ideologicalAxes.map((a) => a.axis).filter((a) => poleScores[a]);

  const axisLabelMap = React.useMemo(
    () =>
      new Map(
        ideologicalAxes.map((a) => [
          a.axis,
          { left: a.left.label, right: a.right.label },
        ])
      ),
    []
  );

  const radarData = axes.map((axis) => {
    const { left, right } = poleScores[axis];
    const total = left + right || 1;
    const pctLeft = Math.round((left / total) * 100);
    return { axis, pctLeft };
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Onglets (scrollable sur mobile) */}
      <div className="border-b border-white/15">
        <div className="flex gap-1 overflow-x-auto no-scrollbar -mb-px">
          {[
            { key: "results", label: "Résultats" },
            { key: "explained", label: "Explications" },
            { key: "diagram", label: "Diagramme" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`inline-flex items-center px-4 py-3 text-sm sm:text-base font-semibold whitespace-nowrap border-b-2 transition-colors rounded-t-lg
                ${
                  activeTab === t.key
                    ? "border-white text-white bg-white/5"
                    : "border-transparent text-white/70 hover:text-white bg-transparent hover:bg-white/5"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────── Onglet : Résultats ────────────── */}
      {activeTab === "results" && (
        <>
          <h2 className="text-2xl sm:text-4xl mb-4 sm:mb-8 text-center text-white">
            Vos résultats
          </h2>

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
                className={`space-y-2 px-3 sm:px-4 py-3 rounded-lg mb-3 sm:mb-4 border border-white/10 ${
                  idx % 2 === 0 ? "bg-white/5" : "bg-white/10"
                }`}
              >
                <div className="flex justify-between text-sm sm:text-base font-semibold text-white/90">
                  <span className="truncate pr-2">{labels.left}</span>
                  <span className="truncate pl-2">{labels.right}</span>
                </div>

                {/* Barre à 2 segments responsive, sans float */}
                <div className="relative w-full h-6 sm:h-7 rounded-md overflow-hidden border border-white/15 bg-white/5">
                  <div
                    className="grid h-full"
                    style={{
                      gridTemplateColumns: `${pctLeft}% ${pctRight}%`,
                    }}
                  >
                    <div
                      className="flex items-center px-2 text-[11px] sm:text-sm font-bold text-white"
                      style={{ backgroundColor: LEFT_COLOR }}
                    >
                      {pctLeft > 7 && `${pctLeft}%`}
                    </div>
                    <div
                      className="flex items-center justify-end px-2 text-[11px] sm:text-sm font-bold text-white"
                      style={{ backgroundColor: RIGHT_COLOR }}
                    >
                      {pctRight > 7 && `${pctRight}%`}
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs italic text-white/70">
                  {axis}
                </div>
              </div>
            );
          })}

          {/* Badges */}
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center text-white">
              Badges obtenus
            </h2>

            {badges.length === 0 ? (
              <p className="text-center text-sm text-white/80">
                Aucun badge pour l’instant. Réessaie avec d’autres réponses !
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 place-items-center">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="relative group flex flex-col items-center"
                    title={badge.description}
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-transform group-hover:scale-110">
                      <img
                        src={badge.icon}
                        alt={badge.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2 text-xs sm:text-sm text-white text-center">
                      {badge.label}
                    </span>

                    {/* Tooltip desktop */}
                    <div
                      className="pointer-events-none hidden md:block absolute bottom-full mb-3 w-56 px-3 py-2 bg-white/10 text-white text-sm rounded-md text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-white/15 backdrop-blur-sm"
                    >
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={onRestart}
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg active:scale-[0.98] transition"
              style={{
                background: `linear-gradient(90deg, ${LEFT_COLOR}, ${RIGHT_COLOR})`,
              }}
            >
              Recommencer le test
            </button>
          </div>
        </>
      )}

      {/* ────────────── Onglet : Explications ────────────── */}
      {activeTab === "explained" && (
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
            Explication des axes
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-prose mx-auto px-1">
  Les positions en <span style={{ color: LEFT_COLOR }} className="font-semibold">rouge</span> sont
  associées à la gauche, et celles en{" "}
  <span style={{ color: RIGHT_COLOR }} className="font-semibold">bleu</span> à la droite, selon des codes
  politiques classiques, mais avec de nombreuses exceptions.  
  <br /><br />
  Certaines idées dites “de gauche” peuvent être reprises par la droite, et inversement : par exemple, un
  discours d’ordre et de sécurité peut être défendu à gauche au nom de la justice sociale, tandis que des
  politiques de régulation économique peuvent être soutenues à droite pour protéger la nation ou les
  petites entreprises.  
  <br /><br />
  Il est aussi possible d’adhérer à des éléments “rouges” et “bleus” d’une même idée : on peut vouloir un
  État fort qui encadre le marché, tout en refusant la hiérarchie rigide dans l’entreprise.  
  <br /><br />
  Ce test cherche à donner une vision d’ensemble cohérente de vos orientations, mais il ne peut pas
  refléter toutes les nuances et contradictions qui composent une pensée politique réelle.
</p>


          {ideologicalAxes
            .sort((a, b) => a.sortIndex - b.sortIndex)
            .map(({ id, axis, question, left, right }) => (
              <div
                key={id}
                className="border border-white/10 rounded-xl p-4 sm:p-5 bg-white/5 text-white/90"
              >
                <div className="text-base sm:text-lg font-semibold mb-2 text-white">
                  {axis}
                </div>
                <div className="text-xs sm:text-sm italic text-white/70 mb-4">
                  {question}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                  {/* Bloc gauche (rouge corrigé vers la palette hero) */}
                  <div
                    className="sm:w-1/2 rounded-lg p-3 sm:p-4"
                    style={{
                      backgroundColor: "rgba(198, 40, 40, 0.12)",
                      border: "1px solid rgba(198, 40, 40, 0.35)",
                    }}
                  >
                    <div className="font-semibold mb-2" style={{ color: LEFT_COLOR }}>
                      {left.label}
                    </div>
                    <div className="text-sm leading-snug text-white/90">
                      {left.response}
                    </div>
                  </div>

                  {/* Bloc droite (bleu corrigé vers la palette hero) */}
                  <div
                    className="sm:w-1/2 rounded-lg p-3 sm:p-4"
                    style={{
                      backgroundColor: "rgba(21, 101, 192, 0.12)",
                      border: "1px solid rgba(21, 101, 192, 0.35)",
                    }}
                  >
                    <div className="font-semibold mb-2" style={{ color: RIGHT_COLOR }}>
                      {right.label}
                    </div>
                    <div className="text-sm leading-snug text-white/90">
                      {right.response}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="border-t border-white/15 pt-6 sm:pt-10 text-sm sm:text-base text-white/85 max-w-prose mx-auto px-1">
            <h3 className="text-base sm:text-lg font-semibold text-center mb-2 text-white">
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
              Ce test ne cherche pas à te coller une étiquette, mais à t’aider
              à comprendre où tu te situes sur différents axes.
            </p>
          </div>
        </div>
      )}

      {/* ────────────── Onglet : Diagramme ────────────── */}
      {activeTab === "diagram" && (
        <>
          <h3 className="text-lg sm:text-xl text-center mb-2 sm:mb-4 text-white">
            Position idéologique
            <span className="block text-xs sm:text-sm text-white/80">
              Le polygone <span style={{color: LEFT_COLOR}} className="font-semibold">rouge</span> montre ta part “gauche” par axe (0 à 100%).
            </span>
          </h3>

          <div className="w-full h-72 sm:h-96 md:h-[28rem] px-2 sm:px-4 md:px-6 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={radarData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 10 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Radar
                  name="Position"
                  dataKey="pctLeft"
                  stroke={LEFT_COLOR}
                  fill={LEFT_COLOR}
                  fillOpacity={0.45}
                  dot={false}
                />
                <Tooltip content={<RadarTooltip axisLabelMap={axisLabelMap} />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <h3 className="text-base sm:text-xl text-center mt-2 sm:mt-4 mb-0 text-white">
            Ici prochainement, un comparateur
          </h3>
        </>
      )}
    </div>
  );
}
