/**
 * Analytics simple et gratuit avec GoatCounter
 * - Compteur d'utilisateurs anonyme
 * - Anti-bot intégré
 * - Conforme RGPD (pas de cookies)
 * - 100% gratuit
 */

/**
 * Vérifie que GoatCounter est réellement configuré (script présent dans le
 * document ET data-goatcounter renseigné avec un vrai code, pas le placeholder
 * "YOUR-CODE"). Évite d'émettre des requêtes réseau vers un domaine inexistant
 * tant que le propriétaire du site n'a pas créé son compte GoatCounter.
 */
function isGoatCounterConfigured(): boolean {
  if (typeof document === 'undefined') return false;
  const script = document.querySelector<HTMLScriptElement>('script[data-goatcounter]');
  if (!script) return false;
  const code = script.getAttribute('data-goatcounter') ?? '';
  if (!code || code.includes('YOUR-CODE')) return false;
  return true;
}

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

  if (!isGoatCounterConfigured()) {
    console.log('📊 [Analytics] GoatCounter non configuré (placeholder ou script absent) - tracking désactivé');
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

  if (!isGoatCounterConfigured()) {
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
