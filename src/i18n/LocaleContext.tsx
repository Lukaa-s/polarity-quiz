// src/i18n/LocaleContext.tsx
//
// Contexte de langue de l'application (surcouche i18n FR/EN).
//
// Résolution initiale de la locale, par priorité décroissante :
//   1. paramètre d'URL `?lang=en` (ou `?lang=fr`)
//   2. localStorage `pq_lang_v1`
//   3. `navigator.language` commençant par « en »
//   4. défaut « fr »
//
// `setLocale` persiste le choix dans localStorage, met à jour `?lang` dans l'URL
// via history.replaceState (sans rechargement, en préservant les autres
// paramètres — dont `?results=` et `?seed=`) et synchronise
// `document.documentElement.lang`.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Locale, type StringKey, translate } from "./strings";

const STORAGE_KEY = "pq_lang_v1";

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
};

function isLocale(v: unknown): v is Locale {
  return v === "fr" || v === "en";
}

export function resolveInitialLocale(): Locale {
  // 1. Paramètre d'URL (prioritaire, même sur un choix persisté).
  try {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(urlLang)) return urlLang;
  } catch {
    /* URL indisponible : on continue la résolution */
  }
  // 2. Choix persisté.
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* localStorage indisponible (navigation privée, quota…) */
  }
  // 3. Langue du navigateur.
  try {
    if (navigator.language?.toLowerCase().startsWith("en")) return "en";
  } catch {
    /* navigator indisponible */
  }
  // 4. Défaut.
  return "fr";
}

// Valeur par défaut fonctionnelle (français) : tout composant lu hors Provider
// (ex. garde-fou global avant montage) obtient malgré tout des chaînes valides.
export const LocaleContext = createContext<LocaleContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (key, vars) => translate("fr", key, vars),
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  // Synchronise l'attribut lang du document dès le montage et à chaque changement.
  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {
      /* ignoré */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* persistance impossible : le choix reste effectif pour la session */
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      // replaceState : pas de rechargement, autres paramètres préservés.
      window.history.replaceState(window.history.state, "", url.toString());
    } catch {
      /* ignoré */
    }
    try {
      document.documentElement.lang = next;
    } catch {
      /* ignoré */
    }
  }, []);

  const t = useCallback(
    (key: StringKey, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
