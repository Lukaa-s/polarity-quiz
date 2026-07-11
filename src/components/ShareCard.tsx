// src/components/ShareCard.tsx
/* Hallmark · component: carte de partage 1080×1350 · genre: editorial · theme: Scrutin
 * pre-emit critique: P4 H5 E4 S5 R4 V4
 * Carte composée UNIQUEMENT pour l'export image (type recap Strava) : rendue
 * hors écran à taille fixe, capturée par html2canvas-pro. Aucun état interactif.
 * Rouge #C62828 = pôle gauche, bleu #1565C0 = pôle droit (fonctionnels).
 */
import type { Badge } from "../data/badges";

export type ShareCardGauge = {
  id: string;
  shortLabel: string;
  pctLeft: number;
  pctRight: number;
};

export type ShareCardProps = {
  top3: { name: string; similarity: number }[];
  gauges: ShareCardGauge[];
  badges: Badge[];
};

const LEFT_COLOR = "#C62828";
const RIGHT_COLOR = "#1565C0";

/** Marque « croix du bulletin » (même géométrie que favicon.svg). */
function Mark({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect x="11" y="11" width="42" height="42" rx="4" fill="none" stroke="#23201A" strokeWidth="5" />
      <path d="M21.5 22 L43 42.5" stroke={LEFT_COLOR} strokeWidth="7" strokeLinecap="round" />
      <path d="M42.5 21.5 L21 42" stroke={RIGHT_COLOR} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export default function ShareCard({ top3, gauges, badges }: ShareCardProps) {
  const hero = top3[0];
  const shownBadges = badges.slice(0, 5);
  const extraBadges = badges.length - shownBadges.length;

  return (
    <div
      id="share-card"
      style={{ width: 1080, height: 1350, backgroundColor: "#F6F3EC", padding: 28 }}
    >
      {/* Cadre éditorial (même langage que l'og-image) */}
      <div
        className="flex h-full w-full flex-col"
        style={{ border: "3px solid #23201A", padding: "40px 56px 0" }}
      >
        {/* Masthead */}
        <div className="flex items-center justify-between" style={{ paddingBottom: 28 }}>
          <div className="flex items-center" style={{ gap: 18 }}>
            <Mark size={64} />
            <span className="font-display font-semibold text-ink" style={{ fontSize: 40 }}>
              Polarity Quiz
            </span>
          </div>
          <span className="font-body font-medium text-ink2" style={{ fontSize: 24 }}>
            Mon profil politique
          </span>
        </div>
        <div style={{ height: 2, backgroundColor: "#23201A" }} />

        {/* Héros : personnalité la plus proche */}
        <div style={{ paddingTop: 36, paddingBottom: 30 }}>
          <div
            className="font-body font-semibold text-ink2"
            style={{ fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            Plus proche de
          </div>
          <div className="flex items-baseline justify-between" style={{ gap: 24, marginTop: 8 }}>
            <span
              className="font-display font-semibold text-ink"
              style={{ fontSize: 60, lineHeight: 1.05 }}
            >
              {hero?.name ?? "—"}
            </span>
            <span
              className="font-display font-semibold text-ink tabular-nums"
              style={{ fontSize: 44, whiteSpace: "nowrap" }}
            >
              {hero ? `${hero.similarity}/100` : ""}
            </span>
          </div>
          {top3.length > 1 && (
            <div className="font-body text-ink2" style={{ fontSize: 25, marginTop: 14 }}>
              {top3.slice(1, 3).map((p, i) => (
                <span key={p.name}>
                  {i > 0 && <span style={{ margin: "0 14px" }}>·</span>}
                  <span className="font-semibold text-ink">{i + 2}.</span> {p.name}
                  <span className="tabular-nums"> · {p.similarity}/100</span>
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={{ height: 1, backgroundColor: "#D8D2C4" }} />

        {/* Les 14 axes : jauges compactes en 2 colonnes */}
        <div style={{ paddingTop: 24, paddingBottom: 8 }}>
          <div className="flex items-center justify-between" style={{ paddingBottom: 18 }}>
            <span
              className="font-body font-semibold text-ink2"
              style={{ fontSize: 20, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              Mes 14 axes
            </span>
            <span className="font-body font-medium text-ink2" style={{ fontSize: 20 }}>
              <span style={{ color: LEFT_COLOR, fontWeight: 700 }}>■</span> gauche
              <span style={{ margin: "0 10px" }}>·</span>
              <span style={{ color: RIGHT_COLOR, fontWeight: 700 }}>■</span> droite
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 44,
              rowGap: 17,
            }}
          >
            {gauges.map((g) => (
              <div key={g.id}>
                <div
                  className="font-body font-semibold text-ink"
                  style={{ fontSize: 21, marginBottom: 6 }}
                >
                  {g.shortLabel}
                </div>
                <div
                  className="flex overflow-hidden"
                  style={{ height: 26, borderRadius: 4, border: "1px solid #D8D2C4" }}
                >
                  <div
                    className="flex items-center font-body font-bold text-paper tabular-nums"
                    style={{ width: `${g.pctLeft}%`, backgroundColor: LEFT_COLOR, fontSize: 16, paddingLeft: 8 }}
                  >
                    {g.pctLeft > 14 && `${g.pctLeft}%`}
                  </div>
                  <div
                    className="flex items-center justify-end font-body font-bold text-paper tabular-nums"
                    style={{ width: `${g.pctRight}%`, backgroundColor: RIGHT_COLOR, fontSize: 16, paddingRight: 8 }}
                  >
                    {g.pctRight > 14 && `${g.pctRight}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges (uniquement s'il y en a) */}
        {shownBadges.length > 0 && (
          <>
            <div style={{ height: 1, backgroundColor: "#D8D2C4", marginTop: 20 }} />
            <div className="flex items-center" style={{ gap: 28, paddingTop: 22 }}>
              <span
                className="font-body font-semibold text-ink2"
                style={{ fontSize: 20, letterSpacing: "0.16em", textTransform: "uppercase", flexShrink: 0 }}
              >
                Badges
              </span>
              <div className="flex" style={{ gap: 26, flex: 1, minWidth: 0 }}>
                {shownBadges.map((b) => (
                  <div key={b.id} className="flex flex-col items-center" style={{ width: 132 }}>
                    {b.icon && (
                      <img
                        src={b.icon}
                        alt=""
                        width={84}
                        height={84}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                    <span
                      className="font-body font-medium text-ink text-center"
                      style={{ fontSize: 16, lineHeight: 1.2, marginTop: 8 }}
                    >
                      {b.label}
                    </span>
                  </div>
                ))}
                {extraBadges > 0 && (
                  <div
                    className="flex items-center justify-center font-display font-semibold text-ink2"
                    style={{ width: 84, height: 84, borderRadius: "50%", border: "2px solid #D8D2C4", fontSize: 26 }}
                  >
                    +{extraBadges}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Pied : bande paper2 façon og-image */}
        <div
          className="flex items-center justify-center"
          style={{
            marginTop: "auto",
            marginLeft: -56,
            marginRight: -56,
            height: 74,
            backgroundColor: "#EDE9DE",
            borderTop: "1px solid #D8D2C4",
          }}
        >
          <span className="font-body text-ink2" style={{ fontSize: 24 }}>
            <span className="font-semibold text-ink">polarity-quiz.fr</span>
            <span style={{ margin: "0 12px" }}>·</span>
            101 questions · 14 axes idéologiques · gratuit, sans compte
          </span>
        </div>
      </div>
    </div>
  );
}
