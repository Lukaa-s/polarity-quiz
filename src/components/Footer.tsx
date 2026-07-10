import { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
            Mentions légales
          </button>
          <span className="text-ink/30">•</span>
          <button
            ref={privacyTriggerRef}
            onClick={() => setShowPrivacy(true)}
            className="underline hover:text-ink/90 transition"
          >
            Politique de confidentialité
          </button>
        </div>
        <p className="mt-2 text-ink/70">
          © {new Date().getFullYear()} Polarity Quiz - Tous droits réservés
        </p>
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
              <h2 id="legal-modal-title" className="text-2xl sm:text-3xl font-bold text-ink">Mentions Légales</h2>
              <button
                onClick={() => setShowLegal(false)}
                className="p-2 hover:bg-ink/10 rounded-lg transition"
                aria-label="Fermer"
              >
                <XMarkIcon className="w-6 h-6 text-ink/80" />
              </button>
            </div>

            <div className="space-y-6 text-ink/90 text-sm sm:text-base">
              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">Éditeur du site</h3>
                <div className="bg-ink/5 rounded-lg p-4 border border-ink/10">
                  {/* Éditeur non professionnel : anonymat public licite (LCEN art. 6, III-2),
                      l'identité complète est connue de l'hébergeur. Ne pas ajouter de
                      nom/adresse ici sans décision explicite du propriétaire. */}
                  <p className="mb-1">
                    Site édité à titre personnel et non professionnel. Conformément à
                    l'article 6, III-2 de la loi n° 2004-575 du 21 juin 2004 pour la
                    confiance dans l'économie numérique (LCEN), l'éditeur a transmis ses
                    coordonnées personnelles à l'hébergeur.
                  </p>
                  <p className="mb-1">
                    <strong>Contact :</strong>{" "}
                    <a href="mailto:polarityquiz@gmail.com" className="text-right hover:underline">
                      polarityquiz@gmail.com
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">Hébergement</h3>
                <div className="bg-ink/5 rounded-lg p-4 border border-ink/10">
                  <p className="mb-1">
                    <strong>Hébergeur :</strong> Vercel Inc.
                  </p>
                  <p className="mb-1">
                    <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                  </p>
                  <p className="text-xs text-ink/70 mt-2">
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  Propriété intellectuelle
                </h3>
                <p className="leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes,
                  etc.) est la propriété exclusive de l'éditeur, à l'exception des marques,
                  logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
                </p>
                <p className="leading-relaxed mt-2">
                  Toute reproduction, distribution, modification, adaptation, retransmission ou
                  publication de ces différents éléments est strictement interdite sans l'accord
                  exprès par écrit de l'éditeur.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  Limitation de responsabilité
                </h3>
                <p className="leading-relaxed">
                  Les informations fournies par ce site le sont à titre indicatif. Ce test de
                  positionnement politique n'a aucune valeur scientifique ou officielle et ne
                  constitue en aucun cas un diagnostic ou une analyse professionnelle.
                </p>
                <p className="leading-relaxed mt-2">
                  L'éditeur ne saurait être tenu responsable de l'interprétation faite des
                  résultats ou de leur utilisation.
                </p>
              </section>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowLegal(false)}
                className="px-6 py-3 bg-ink/10 hover:bg-ink/20 rounded-lg transition text-ink font-medium"
              >
                Fermer
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
                Politique de Confidentialité
              </h2>
              <button
                onClick={() => setShowPrivacy(false)}
                className="p-2 hover:bg-ink/10 rounded-lg transition"
                aria-label="Fermer"
              >
                <XMarkIcon className="w-6 h-6 text-ink/80" />
              </button>
            </div>

            <div className="space-y-6 text-ink/90 text-sm sm:text-base">
              <div className="bg-green-700/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-800 font-semibold mb-2">
                  ✅ Votre vie privée est respectée
                </p>
                <p className="text-sm text-ink/80">
                  Aucune donnée personnelle n'est collectée. Seules des statistiques de
                  fréquentation anonymes sont mesurées via GoatCounter, sans cookies.
                </p>
              </div>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  Données personnelles collectées : aucune
                </h3>
                <p className="leading-relaxed">
                  Cette application ne collecte, ne stocke et ne transmet <strong>aucune donnée
                  personnelle</strong> sur nos serveurs.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-ink/80">
                  <li>Pas de compte utilisateur</li>
                  <li>Pas de demande d'email, nom ou téléphone</li>
                  <li>Pas de cookies de tracking</li>
                  <li>Pas de Google Analytics, Facebook Pixel ou autre outil de suivi</li>
                  <li>Pas de publicité ciblée</li>
                </ul>
                <p className="leading-relaxed mt-2 text-sm text-ink/80">
                  Des statistiques de fréquentation anonymes et agrégées (pages vues, appareils,
                  tests complétés) sont mesurées via GoatCounter — voir la section « Analyse
                  d'audience » ci-dessous.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  Stockage local (localStorage)
                </h3>
                <p className="leading-relaxed">
                  Les résultats de votre test et vos profils sauvegardés sont stockés{" "}
                  <strong>uniquement dans votre navigateur</strong> via le localStorage.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-ink/80">
                  <li>Ces données ne quittent jamais votre appareil</li>
                  <li>Elles ne sont jamais transmises à nos serveurs</li>
                  <li>
                    Vous pouvez les supprimer à tout moment en vidant le cache de votre navigateur
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  Partage de résultats via URL
                </h3>
                <p className="leading-relaxed">
                  Lorsque vous partagez vos résultats via le bouton "Partager" :
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-ink/80">
                  <li>
                    Vos réponses sont encodées directement dans l'URL (paramètre{" "}
                    <code className="bg-ink/10 px-1 rounded">?results=...</code>)
                  </li>
                  <li>Si vous fournissez un nom, il sera visible dans l'URL partagée</li>
                  <li>
                    <strong>Aucune donnée n'est stockée sur nos serveurs</strong> - le lien
                    contient tout
                  </li>
                  <li>Toute personne avec le lien peut voir les résultats partagés</li>
                </ul>
                <div className="mt-3 bg-yellow-700/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ <strong>Attention :</strong> Si vous partagez un lien avec votre nom,
                    celui-ci sera visible par toute personne accédant au lien.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">Cookies</h3>
                <p className="leading-relaxed">
                  Cette application <strong>n'utilise AUCUN cookie</strong>, ni de première
                  partie ni de tierce partie.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">Analyse d'audience</h3>
                <p className="leading-relaxed mb-2">
                  Nous utilisons <strong>GoatCounter</strong>, un outil d'analyse respectueux de
                  la vie privée, pour collecter des statistiques anonymes sur l'utilisation du
                  site afin d'améliorer votre expérience.
                </p>
                <p className="leading-relaxed mb-2">
                  <strong>Données collectées (anonymes) :</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-ink/80 text-sm">
                  <li>Pages visitées</li>
                  <li>Nombre de tests complétés</li>
                  <li>Plateforme de partage utilisée (Twitter, WhatsApp, etc.)</li>
                  <li>Type d'appareil (mobile/desktop)</li>
                </ul>
                <p className="leading-relaxed mt-2">
                  <strong>Données NON collectées :</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-ink/80 text-sm">
                  <li>Aucune adresse IP</li>
                  <li>Aucune donnée personnelle identifiable</li>
                  <li>Aucun cookie de tracking</li>
                  <li>Aucun identifiant unique</li>
                </ul>
                <p className="leading-relaxed mt-3 text-sm">
                  Ces données sont agrégées et ne permettent pas de vous identifier. Pour en
                  savoir plus :{" "}
                  <a
                    href="https://www.goatcounter.com/help/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-right hover:underline"
                  >
                    Politique de confidentialité GoatCounter
                  </a>
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">Vos droits</h3>
                <p className="leading-relaxed mb-2">
                  Vous disposez à tout moment du droit de :
                </p>
                <ul className="list-disc list-inside space-y-1 text-ink/80">
                  <li>
                    <strong>Supprimer vos données locales :</strong> Videz le cache et les
                    données de navigation de votre navigateur
                  </li>
                  <li>
                    <strong>Supprimer vos profils sauvegardés :</strong> Utilisez le bouton de
                    suppression (icône poubelle) sur chaque profil
                  </li>
                  <li>
                    <strong>Ne pas partager de données :</strong> Vous n'êtes jamais obligé de
                    partager vos résultats
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  Modifications de cette politique
                </h3>
                <p className="leading-relaxed">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à
                  tout moment. La date de dernière mise à jour sera toujours indiquée en haut de
                  cette page.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink mb-2">Contact</h3>
                <p className="leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité, vous pouvez
                  nous contacter à l'adresse :{" "}
                  <a href="mailto:polarityquiz@gmail.com" className="text-right hover:underline">
                    polarityquiz@gmail.com
                  </a>
                </p>
              </section>

              <div className="bg-ink/5 rounded-lg p-4 border border-ink/10 text-xs text-ink/70">
                <p>
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-6 py-3 bg-ink/10 hover:bg-ink/20 rounded-lg transition text-ink font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
