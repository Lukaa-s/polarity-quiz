// src/components/ShareCard.tsx
/* Hallmark · component: carte de partage 1080×1350 · genre: editorial · theme: Scrutin
 * pre-emit critique: P4 H5 E4 S5 R4 V4
 * Carte composée UNIQUEMENT pour l'export image (type recap Strava) : rendue
 * hors écran à taille fixe, capturée par html2canvas-pro. Aucun état interactif.
 * Rouge #C62828 = pôle gauche, bleu #1565C0 = pôle droit (fonctionnels).
 */
import type { Badge } from "../data/badges";
import { useLocale } from "../i18n/LocaleContext";

export type ShareCardGauge = {
  id: string;
  shortLabel: string;
  leftLabel: string;
  rightLabel: string;
  /** Phrase-valeur vouvoyée du pôle (claim) — même voix que l'écran de
      résultats : la carte s'adresse à la personne testée (« Vous redoutez… »). */
  leftClaim: string;
  rightClaim: string;
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
  const { t, locale } = useLocale();
  const hero = top3[0];
  // Les 3 clivages où la position est la plus nette : le héros de la carte.
  const sharpest = [...gauges]
    .map((g) => {
      const side: "left" | "right" = g.pctLeft >= g.pctRight ? "left" : "right";
      return {
        ...g,
        dominantPct: Math.max(g.pctLeft, g.pctRight),
        dominantLabel: side === "left" ? g.leftLabel : g.rightLabel,
        dominantClaim: side === "left" ? g.leftClaim : g.rightClaim,
        dominantColor: side === "left" ? LEFT_COLOR : RIGHT_COLOR,
      };
    })
    .sort((a, b) => b.dominantPct - a.dominantPct)
    .slice(0, 3);
  // Les 5 badges les PLUS RARES obtenus (rareté croissante) : ce sont eux
  // qui donnent envie de se comparer, pas les 5 premiers déclarés.
  const shownBadges = [...badges]
    .sort((a, b) => (a.rarity ?? 999) - (b.rarity ?? 999))
    .slice(0, 5);
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
          {/* Date du test façon « une » de journal — pas de slogan. */}
          <span className="font-body font-medium text-ink2" style={{ fontSize: 24 }}>
            {new Date().toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div style={{ height: 2, backgroundColor: "#23201A" }} />

        {/* Héros : les convictions les plus fortes — les mots des pôles,
            la matière du test, pas un score de compatibilité. */}
        <div style={{ paddingTop: 22, paddingBottom: 16 }}>
          <div
            className="font-body font-semibold text-ink2"
            style={{ fontSize: 21, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            {t("sharecard.sharpest")}
          </div>
          <div style={{ marginTop: 2 }}>
            {sharpest.map((g) => (
              <div
                key={g.id}
                className="flex items-baseline justify-between"
                style={{ gap: 24, paddingTop: 8, paddingBottom: 8, borderBottom: "1px solid #EDE9DE" }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    className="font-display font-semibold"
                    style={{ fontSize: 36, lineHeight: 1.08, color: g.dominantColor }}
                  >
                    {g.dominantLabel}
                  </div>
                  {/* Ce que le pôle dit du partageur, pas ce à quoi il s'oppose :
                      la phrase-valeur porte le sens, le thème est déjà dans la
                      grille des 14 axes plus bas. */}
                  <div className="font-body text-ink" style={{ fontSize: 19, marginTop: 3 }}>
                    {g.dominantClaim}
                  </div>
                </div>
                <span
                  className="font-display font-semibold tabular-nums"
                  style={{ fontSize: 34, whiteSpace: "nowrap", color: g.dominantColor }}
                >
                  {g.dominantPct} %
                </span>
              </div>
            ))}
          </div>
          {/* La figure la plus proche passe en signature. */}
          {hero && (
            <div className="font-body text-ink2" style={{ fontSize: 21, marginTop: 10 }}>
              {t("sharecard.closest", { name: hero.name, score: hero.similarity })}
            </div>
          )}
        </div>
        <div style={{ height: 1, backgroundColor: "#D8D2C4" }} />

        {/* Les 14 axes : jauges compactes en 2 colonnes */}
        <div style={{ paddingTop: 18, paddingBottom: 6 }}>
          <div className="flex items-center justify-between" style={{ paddingBottom: 12 }}>
            <span
              className="font-body font-semibold text-ink2"
              style={{ fontSize: 20, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              {t("sharecard.axes")}
            </span>
            <span className="font-body font-medium text-ink2" style={{ fontSize: 20 }}>
              <span style={{ color: LEFT_COLOR, fontWeight: 700 }}>■</span> {t("sharecard.left")}
              <span style={{ margin: "0 10px" }}>·</span>
              <span style={{ color: RIGHT_COLOR, fontWeight: 700 }}>■</span> {t("sharecard.right")}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 44,
              rowGap: 12,
            }}
          >
            {gauges.map((g) => {
              // Même réglette que l'écran de résultats : pôle gauche à gauche,
              // curseur-losange, un seul pourcentage (couleur = côté dominant).
              const cursorPos = Math.min(Math.max(g.pctRight, 4), 96);
              const dominantColor = g.pctLeft >= g.pctRight ? LEFT_COLOR : RIGHT_COLOR;
              return (
              <div key={g.id}>
                <div className="flex items-baseline justify-between" style={{ marginBottom: 2 }}>
                  <span className="font-body font-semibold text-ink" style={{ fontSize: 21 }}>
                    {g.shortLabel}
                  </span>
                  <span
                    className="font-body font-bold tabular-nums"
                    style={{ fontSize: 19, color: dominantColor }}
                  >
                    {Math.max(g.pctLeft, g.pctRight)} %
                  </span>
                </div>
                <div style={{ position: "relative", height: 22 }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 10, height: 2, backgroundColor: "#23201A" }} />
                  <div style={{ position: "absolute", left: "50%", top: 5, height: 12, width: 1.5, backgroundColor: "#5E594F" }} />
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      left: `${cursorPos}%`,
                      height: 14,
                      width: 14,
                      backgroundColor: "#23201A",
                      borderRadius: 3,
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  />
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Badges (uniquement s'il y en a) */}
        {shownBadges.length > 0 && (
          <>
            <div style={{ height: 1, backgroundColor: "#D8D2C4", marginTop: 14 }} />
            <div className="flex items-center" style={{ gap: 28, paddingTop: 16 }}>
              <span
                className="font-body font-semibold text-ink2"
                style={{ fontSize: 20, letterSpacing: "0.16em", textTransform: "uppercase", flexShrink: 0 }}
              >
                {t("sharecard.badges")}
              </span>
              <div className="flex" style={{ gap: 26, flex: 1, minWidth: 0 }}>
                {shownBadges.map((b) => (
                  <div key={b.id} className="flex flex-col items-center" style={{ width: 132 }}>
                    {/* Tampon SVG : cadre intégré au dessin, aucun rognage. */}
                    {b.icon && (
                      <img
                        src={b.icon}
                        alt=""
                        width={84}
                        height={84}
                      />
                    )}
                    <span
                      className="font-body font-medium text-ink text-center"
                      style={{ fontSize: 16, lineHeight: 1.2, marginTop: 8 }}
                    >
                      {b.label}
                    </span>
                    {b.rarity != null && (
                      <span
                        className="font-body text-ink2 tabular-nums"
                        style={{ fontSize: 14, marginTop: 3 }}
                      >
                        ~{b.rarity} %
                      </span>
                    )}
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
            {t("sharecard.footer")}
          </span>
        </div>
      </div>
    </div>
  );
}
