#!/usr/bin/env node
/**
 * Tunnel marketing en une commande : `npm run stats`.
 *
 * Lit les compteurs publics GoatCounter (voir docs/marketing-playbook.md §7 —
 * rituel du lundi). Nécessite le réglage GoatCounter « Allow using the visitor
 * counter » (déjà actif, c'est le même endpoint que la rareté des badges).
 *
 * Les chiffres sont des CUMULS depuis le lancement : noter la ligne chaque
 * semaine dans le tableau du playbook pour obtenir les deltas.
 * Référence au 15/07/2026 : 386 visites, 253 démarrés, 148 terminés, 6 partages.
 */

const BASE = "https://polarity-quiz.goatcounter.com/counter";

const PATHS = {
  "Visites accueil": "/",
  "Tests démarrés": "/events/test-started",
  "Tests terminés": "/events/test-completed",
  "Badges calculés (dénominateur rareté)": "/events/badges-computed",
  "Mode explorateur": "/events/explorer-mode",
  "Liens partagés ouverts": "/events/shared-results-opened",
  "→ dont relancent un test": "/events/shared-to-test",
  "Ko-fi (accueil)": "/events/support-kofi-home",
  "Ko-fi (résultats)": "/events/support-kofi",
};

// Chaque canal × emplacement ("" = menu du haut, "-footer" = bloc « À qui le
// tour ? » en fin de résultats — les deux emplacements se mesurent séparément).
const SHARE_CHANNELS = ["image", "image-download", "copy-link", "twitter", "whatsapp", "facebook", "discord", "native"];
const SHARE_ORIGINS = ["", "-footer"];

async function count(path) {
  const res = await fetch(`${BASE}${encodeURIComponent(path).replaceAll("%2F", "/")}.json`);
  if (res.status === 404) return 0; // jamais émis
  if (!res.ok) throw new Error(`${res.status} sur ${path}`);
  const body = await res.json();
  return Number(body.count) || 0;
}

const rows = [];
for (const [label, path] of Object.entries(PATHS)) {
  rows.push([label, await count(path)]);
}

let sharesTotal = 0;
let sharesFooter = 0;
const shareDetail = [];
for (const channel of SHARE_CHANNELS) {
  for (const origin of SHARE_ORIGINS) {
    const n = await count(`/events/share-${channel}${origin}`);
    if (n > 0) shareDetail.push([`  dont ${channel}${origin}`, n]);
    sharesTotal += n;
    if (origin === "-footer") sharesFooter += n;
  }
}
rows.push(["Partages (tous canaux)", sharesTotal]);
rows.push(["  dont bloc de fin (-footer)", sharesFooter]);
rows.push(...shareDetail);

const started = rows.find(([l]) => l === "Tests démarrés")[1];
const completed = rows.find(([l]) => l === "Tests terminés")[1];
const visits = rows.find(([l]) => l === "Visites accueil")[1];

const width = Math.max(...rows.map(([l]) => l.length)) + 2;
console.log(`\nPolarity Quiz — cumuls GoatCounter au ${new Date().toLocaleDateString("fr-FR")}\n`);
for (const [label, n] of rows) console.log(label.padEnd(width) + String(n).padStart(6));
console.log("");
if (visits > 0) console.log(`Taux de démarrage : ${((started / visits) * 100).toFixed(1)} % des visites`);
if (started > 0) console.log(`Taux de complétion : ${((completed / started) * 100).toFixed(1)} % des démarrés`);
if (completed > 0)
  console.log(
    `Taux de partage   : ${((sharesTotal / completed) * 100).toFixed(1)} % des terminés (objectif : 15 %)`
  );
console.log("");
