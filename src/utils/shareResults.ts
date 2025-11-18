/**
 * Utilitaires pour partager les résultats via URL
 */

export type SharedResults = {
  answers: Record<string, number>;
  name?: string;
  timestamp?: number;
};

/**
 * Encode les résultats en base64 pour partage via URL
 */
export function encodeResults(answers: Record<string, number>, name?: string): string {
  const data: SharedResults = {
    answers,
    name,
    timestamp: Date.now(),
  };

  const jsonString = JSON.stringify(data);
  // Encoder en base64 (compatible navigateur)
  const base64 = btoa(encodeURIComponent(jsonString));
  return base64;
}

/**
 * Décode les résultats depuis l'URL
 */
export function decodeResults(encoded: string): SharedResults | null {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    const data = JSON.parse(jsonString) as SharedResults;

    // Validation basique
    if (!data.answers || typeof data.answers !== 'object') {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors du décodage des résultats:', error);
    return null;
  }
}

/**
 * Génère l'URL de partage complète
 */
export function generateShareURL(answers: Record<string, number>, name?: string): string {
  const encoded = encodeResults(answers, name);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?results=${encoded}${name ? `&name=${encodeURIComponent(name)}` : ''}`;
}

/**
 * Copie le texte dans le presse-papier
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Erreur lors de la copie:', error);
    return false;
  }
}

/**
 * Génère le texte de partage pour les réseaux sociaux
 */
export function getShareText(name?: string): string {
  if (name) {
    return `Découvrez les résultats politiques de ${name} sur Polarity Quiz ! 🗳️`;
  }
  return `Découvrez mes résultats politiques sur Polarity Quiz ! 🗳️`;
}

/**
 * Génère l'URL de partage Twitter/X
 */
export function getTwitterShareURL(shareURL: string, name?: string): string {
  const text = getShareText(name);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareURL)}`;
}

/**
 * Génère l'URL de partage WhatsApp
 */
export function getWhatsAppShareURL(shareURL: string, name?: string): string {
  const text = `${getShareText(name)} ${shareURL}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Génère l'URL de partage Facebook
 */
export function getFacebookShareURL(shareURL: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
}

/**
 * Génère l'URL de partage Discord
 */
export function getDiscordShareURL(shareURL: string, name?: string): string {
  const text = getShareText(name);
  // Discord n'a pas d'URL de partage direct, on copie juste le message formaté
  return `${text}\n${shareURL}`;
}

/**
 * Utilise l'API Web Share native (mobile principalement)
 */
export async function shareViaWebAPI(shareURL: string, name?: string): Promise<boolean> {
  if (!navigator.share) {
    return false; // API non supportée
  }

  try {
    await navigator.share({
      title: 'Polarity Quiz - Résultats',
      text: getShareText(name),
      url: shareURL,
    });
    return true;
  } catch (error) {
    // L'utilisateur a annulé le partage, c'est normal
    if ((error as Error).name !== 'AbortError') {
      console.error('Erreur lors du partage:', error);
    }
    return false;
  }
}
