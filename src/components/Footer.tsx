import { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLocale } from "../i18n/LocaleContext";
import { RichText } from "../i18n/RichText";
import LanguageToggle from "../i18n/LanguageToggle";

/**
 * Piège le focus à l'intérieur d'une modale ouverte (WCAG 2.4.3 / APG Dialog) et
 * restitue le focus au bouton déclencheur à la fermeture, quelle qu'en soit la
 * cause (Échap, clic sur l'overlay, bouton Fermer).
 *
 * Retourne la ref à poser sur le conteneur du dialog.
 */
function useModalFocusTrap(
  isOpen: boolean,
  triggerRef: React.RefObject<HTMLButtonElement>
) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => el.offsetParent !== null
      );

    // À l'ouverture, on déplace le focus dans la modale (le bouton Fermer en
    // premier ; à défaut, le conteneur du dialog lui-même).
    const initial = getFocusable();
    (initial[0] ?? dialog).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restitue le focus au bouton qui a ouvert la modale.
      triggerRef.current?.focus();
    };
  }, [isOpen, triggerRef]);

  return dialogRef;
}

export default function Footer() {
  const { t, locale } = useLocale();
  const [showLegal, setShowLegal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Boutons déclencheurs, pour restituer le focus à la fermeture des modales.
  const legalTriggerRef = useRef<HTMLButtonElement>(null);
  const privacyTriggerRef = useRef<HTMLButtonElement>(null);

  const legalDialogRef = useModalFocusTrap(showLegal, legalTriggerRef);
  const privacyDialogRef = useModalFocusTrap(showPrivacy, privacyTriggerRef);

  // Fermer la modale ouverte avec Échap (attendu au clavier sur un dialogue).
  useEffect(() => {
    if (!showLegal && !showPrivacy) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLegal(false);
        setShowPrivacy(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showLegal, showPrivacy]);

  return (
    <>
      <footer className="text-center text-ink/70 text-xs py-6 border-t border-ink/10 mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            ref={legalTriggerRef}
            onClick={() => setShowLegal(true)}
            className="underline hover:text-ink/90 transition"
          >
            {t("footer.legal")}
          </button>
          <span className="text-ink/30">•</span>
          <button
            ref={privacyTriggerRef}
            onClick={() => setShowPrivacy(true)}
            className="underline hover:text-ink/90 transition"
          >
            {t("footer.privacy")}
          </button>
        </div>
        <p className="mt-2 text-ink/70">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
        <div className="mt-3 flex justify-center">
          <LanguageToggle />
        </div>
      </footer>

      {/* Modal Mentions Légales */}
      {showLegal && (
        <div
          className="fixed inset-0 bg-ink/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setShowLegal(false)}
        >
          <div
            ref={legalDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            tabIndex={-1}
            className="bg-paper border border-ink/20 rounded-2xl p-6 sm:p-8 max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 id="legal-modal-title" className="text-2xl sm:text-3xl font-bold text-ink">{t("legal.title")}</h2>
              <button
                onClick={() => setShowLegal(false)}
                className="p-2 hover:bg-ink/10 rounded-lg transition"
                aria-label={t("footer.close")}
              >
                <XMarkIcon className="w-6 h-6 text-ink/80" />
              </button>
            </div>

            <div className="space-y-6 text-ink/90 text-sm sm:text-base">
              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">{t("legal.editor.heading")}</h3>
                <div className="bg-ink/5 rounded-lg p-4 border border-ink/10">
                  {/* Éditeur non professionnel : anonymat public licite (LCEN art. 6, III-2),
                      l'identité complète est connue de l'hébergeur. Ne pas ajouter de
                      nom/adresse ici sans décision explicite du propriétaire. */}
                  <p className="mb-1">{t("legal.editor.body")}</p>
                  <p className="mb-1">
                    <strong>{t("legal.contactLabel")}</strong>{" "}
                    <a href="mailto:polarityquiz@gmail.com" className="text-right hover:underline">
                      polarityquiz@gmail.com
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">{t("legal.hosting.heading")}</h3>
                <div className="bg-ink/5 rounded-lg p-4 border border-ink/10">
                  <p className="mb-1">
                    <strong>{t("legal.hosting.hostLabel")}</strong> Vercel Inc.
                  </p>
                  <p className="mb-1">
                    <strong>{t("legal.hosting.addressLabel")}</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                  </p>
                  <p className="text-xs text-ink/70 mt-2">
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {t("legal.ip.heading")}
                </h3>
                <p className="leading-relaxed">{t("legal.ip.body1")}</p>
                <p className="leading-relaxed mt-2">{t("legal.ip.body2")}</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {t("legal.liability.heading")}
                </h3>
                <p className="leading-relaxed">{t("legal.liability.body1")}</p>
                <p className="leading-relaxed mt-2">{t("legal.liability.body2")}</p>
              </section>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowLegal(false)}
                className="px-6 py-3 bg-ink/10 hover:bg-ink/20 rounded-lg transition text-ink font-medium"
              >
                {t("footer.close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Politique de Confidentialité */}
      {showPrivacy && (
        <div
          className="fixed inset-0 bg-ink/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            ref={privacyDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            tabIndex={-1}
            className="bg-paper border border-ink/20 rounded-2xl p-6 sm:p-8 max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 id="privacy-modal-title" className="text-2xl sm:text-3xl font-bold text-ink">
                {t("privacy.title")}
              </h2>
              <button
                onClick={() => setShowPrivacy(false)}
                className="p-2 hover:bg-ink/10 rounded-lg transition"
                aria-label={t("footer.close")}
              >
                <XMarkIcon className="w-6 h-6 text-ink/80" />
              </button>
            </div>

            <div className="space-y-6 text-ink/90 text-sm sm:text-base">
              <div className="bg-green-700/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-800 font-semibold mb-2">
                  {t("privacy.banner.title")}
                </p>
                <p className="text-sm text-ink/80">
                  {t("privacy.banner.body")}
                </p>
              </div>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {t("privacy.collected.heading")}
                </h3>
                <p className="leading-relaxed">
                  <RichText text={t("privacy.collected.body")} />
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-ink/80">
                  <li>{t("privacy.collected.li1")}</li>
                  <li>{t("privacy.collected.li2")}</li>
                  <li>{t("privacy.collected.li3")}</li>
                  <li>{t("privacy.collected.li4")}</li>
                  <li>{t("privacy.collected.li5")}</li>
                </ul>
                <p className="leading-relaxed mt-2 text-sm text-ink/80">
                  {t("privacy.collected.footnote")}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {t("privacy.local.heading")}
                </h3>
                <p className="leading-relaxed">
                  <RichText text={t("privacy.local.body")} />
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-ink/80">
                  <li>{t("privacy.local.li1")}</li>
                  <li>{t("privacy.local.li2")}</li>
                  <li>{t("privacy.local.li3")}</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {t("privacy.share.heading")}
                </h3>
                <p className="leading-relaxed">
                  {t("privacy.share.body")}
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-ink/80">
                  <li>
                    <RichText text={t("privacy.share.li1")} />
                  </li>
                  <li>{t("privacy.share.li2")}</li>
                  <li>
                    <RichText text={t("privacy.share.li3")} />
                  </li>
                  <li>{t("privacy.share.li4")}</li>
                </ul>
                <div className="mt-3 bg-yellow-700/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <RichText text={t("privacy.share.warning")} />
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">{t("privacy.cookies.heading")}</h3>
                <p className="leading-relaxed">
                  <RichText text={t("privacy.cookies.body")} />
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">{t("privacy.audience.heading")}</h3>
                <p className="leading-relaxed mb-2">
                  <RichText text={t("privacy.audience.body")} />
                </p>
                <p className="leading-relaxed mb-2">
                  <RichText text={t("privacy.audience.collectedLabel")} />
                </p>
                <ul className="list-disc list-inside space-y-1 text-ink/80 text-sm">
                  <li>{t("privacy.audience.collected.li1")}</li>
                  <li>{t("privacy.audience.collected.li2")}</li>
                  <li>{t("privacy.audience.collected.li3")}</li>
                  <li>{t("privacy.audience.collected.li4")}</li>
                </ul>
                <p className="leading-relaxed mt-2">
                  <RichText text={t("privacy.audience.notCollectedLabel")} />
                </p>
                <ul className="list-disc list-inside space-y-1 text-ink/80 text-sm">
                  <li>{t("privacy.audience.notCollected.li1")}</li>
                  <li>{t("privacy.audience.notCollected.li2")}</li>
                  <li>{t("privacy.audience.notCollected.li3")}</li>
                  <li>{t("privacy.audience.notCollected.li4")}</li>
                </ul>
                <p className="leading-relaxed mt-3 text-sm">
                  {t("privacy.audience.moreInfo")}{" "}
                  <a
                    href="https://www.goatcounter.com/help/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-right hover:underline"
                  >
                    {t("privacy.audience.linkLabel")}
                  </a>
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">{t("privacy.rights.heading")}</h3>
                <p className="leading-relaxed mb-2">
                  {t("privacy.rights.intro")}
                </p>
                <ul className="list-disc list-inside space-y-1 text-ink/80">
                  <li>
                    <RichText text={t("privacy.rights.li1")} />
                  </li>
                  <li>
                    <RichText text={t("privacy.rights.li2")} />
                  </li>
                  <li>
                    <RichText text={t("privacy.rights.li3")} />
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {t("privacy.changes.heading")}
                </h3>
                <p className="leading-relaxed">
                  {t("privacy.changes.body")}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">{t("privacy.contact.heading")}</h3>
                <p className="leading-relaxed">
                  {t("privacy.contact.body")}{" "}
                  <a href="mailto:polarityquiz@gmail.com" className="text-right hover:underline">
                    polarityquiz@gmail.com
                  </a>
                </p>
              </section>

              <div className="bg-ink/5 rounded-lg p-4 border border-ink/10 text-xs text-ink/70">
                <p>
                  <strong>{t("privacy.lastUpdatedLabel")}</strong>{" "}
                  {new Date().toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-6 py-3 bg-ink/10 hover:bg-ink/20 rounded-lg transition text-ink font-medium"
              >
                {t("footer.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
