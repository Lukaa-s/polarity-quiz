// src/i18n/LanguageToggle.tsx
//
// Sélecteur de langue éditorial « FR · EN » : la langue active en encre pleine,
// l'autre en ink2, séparateur point médian. Pas de drapeau. Placé sur le
// masthead de l'accueil et dans le footer.
import { useLocale } from "./LocaleContext";
import type { Locale } from "./strings";

// aria-label de chaque bouton : endonyme (pas besoin de traduction).
const LANGS: { code: Locale; label: string; aria: string }[] = [
  { code: "fr", label: "FR", aria: "Français" },
  { code: "en", label: "EN", aria: "English" },
];

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("lang.groupLabel")}
      className={`inline-flex items-center gap-1.5 text-sm leading-none ${className}`}
    >
      {LANGS.map((lang, i) => {
        const active = locale === lang.code;
        return (
          <div key={lang.code} className="inline-flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-ink2 select-none">
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => setLocale(lang.code)}
              aria-pressed={active}
              aria-label={lang.aria}
              className={`rounded px-0.5 font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:ring-ink ${
                active ? "text-ink" : "text-ink2 hover:text-ink"
              }`}
            >
              {lang.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
