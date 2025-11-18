/**
 * Analytics simple et gratuit avec GoatCounter
 * - Compteur d'utilisateurs anonyme
 * - Anti-bot intégré
 * - Conforme RGPD (pas de cookies)
 * - 100% gratuit
 */

/**
 * Initialise le tracking GoatCounter
 * À appeler une seule fois au chargement de l'app
 */
export function initAnalytics() {
  // Ne pas tracker en mode développement
  if (import.meta.env.DEV) {
    console.log('📊 [Analytics] Mode développement - tracking désactivé');
    return;
  }

  // Vérifier que window.goatcounter n'est pas déjà défini
  if (typeof window !== 'undefined' && !(window as any).goatcounter) {
    console.log('📊 [Analytics] GoatCounter initialisé');
  }
}

/**
 * Track un événement personnalisé
 * @param event Nom de l'événement (ex: "test_completed", "test_started")
 * @param path Chemin optionnel (par défaut: URL actuelle)
 */
export function trackEvent(event: string, path?: string) {
  // Ne pas tracker en mode développement
  if (import.meta.env.DEV) {
    console.log(`📊 [Analytics] Event: ${event}`, path);
    return;
  }

  // Vérifier que GoatCounter est chargé
  if (typeof window !== 'undefined' && (window as any).goatcounter) {
    (window as any).goatcounter.count({
      path: path || event,
      title: event,
      event: true,
    });
  }
}

/**
 * Track la complétion d'un test
 */
export function trackTestCompleted() {
  trackEvent('test_completed', '/events/test-completed');
}

/**
 * Track le début d'un test
 */
export function trackTestStarted() {
  trackEvent('test_started', '/events/test-started');
}

/**
 * Track un partage de résultats
 * @param platform Plateforme de partage (twitter, whatsapp, facebook, etc.)
 */
export function trackShare(platform: string) {
  trackEvent(`share_${platform}`, `/events/share-${platform}`);
}

/**
 * Track l'abandon du test
 * @param questionIndex Index de la question où l'utilisateur a abandonné
 */
export function trackTestAbandoned(questionIndex: number) {
  trackEvent(`test_abandoned_q${questionIndex}`, `/events/abandoned-q${questionIndex}`);
}

/**
 * Track l'utilisation du mode explorateur
 */
export function trackExplorerMode() {
  trackEvent('explorer_mode', '/events/explorer-mode');
}
