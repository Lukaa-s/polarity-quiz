// src/i18n/strings.ts
//
// Dictionnaire de chaînes de l'interface (surcouche i18n FR/EN).
//
// Les DONNÉES canoniques (questions, axes, badges, profils) restent françaises
// et sont traduites par overlay ailleurs (voir src/i18n/data.ts). Ce fichier ne
// concerne QUE les chaînes d'interface des composants « propriétaires » de la
// vague 1 : accueil, échelle de vote, garde-fou, footer (mentions légales +
// politique de confidentialité intégrales).
//
// `en` est typé `Record<StringKey, string>` : le compilateur garantit que les
// deux tables portent EXACTEMENT les mêmes clés (impossible d'oublier une
// traduction). Les valeurs peuvent contenir :
//   - des variables `{nom}` interpolées par `translate()` ;
//   - du gras `**…**` et du code `` `…` `` rendus par <RichText /> (Footer).

export type Locale = "fr" | "en";

// espace insécable
const NBSP = " ";

const fr = {
  // ── Accueil : masthead / hero ─────────────────────────────────────────────
  "masthead.subtitle": "Test de positionnement politique",
  "hero.question": `Où vous situez-vous${NBSP}?`,

  // ── Accueil : reprise d'une progression ───────────────────────────────────
  "resume.notice": "Une progression a été enregistrée sur cet appareil.",
  "resume.button": "Reprendre le test ({count}/{total} répondues)",
  "resume.discard": "Repartir de zéro",

  // ── Accueil : CTA / durée / soutien ───────────────────────────────────────
  "cta.start": "Commencer le test",
  "cta.explore": "Explorer les profils",
  "meta.duration": "{count} questions · environ 15 minutes",
  "support.free": "Gratuit et sans publicité",
  "support.link": "soutenir le projet",

  // ── Accueil : trois repères ───────────────────────────────────────────────
  "features.axes": "{axes} clivages, deux pôles sur chaque idée.",
  "features.profile": "Un profil détaillé, nuancé et partageable.",
  "features.noAccount": "Sans inscription ni compte à créer.",

  // ── Mode explorateur ──────────────────────────────────────────────────────
  "explorer.title": "Explorateur de profils",
  "explorer.back": "← Retour",
  "explorer.error.title": "Impossible de charger l'explorateur",
  "explorer.error.desc":
    "Le chargement des profils a échoué (réseau ou mise à jour du site). Réessayez ou rechargez la page.",

  // ── Résultats partagés / écran principal ──────────────────────────────────
  "shared.heading.named": "Résultats de {name}",
  "shared.heading.anon": "Résultats partagés",
  "shared.notice":
    "Vous consultez des résultats partagés. Faites votre propre test pour comparer.",
  "shared.cta": "Faire mon test",
  "results.title": "Votre profil politique",
  "results.error.title": "Impossible de charger les résultats",
  "results.error.desc":
    "Le chargement a échoué (réseau ou mise à jour du site). Vos réponses restent enregistrées sur cet appareil : réessayez ou rechargez la page.",
  "results.loading": "Chargement des résultats…",
  "skip.link": "Aller au contenu",

  // ── Question / échelle de vote ────────────────────────────────────────────
  "question.restart": "Recommencer",
  "question.restartConfirm":
    "Recommencer effacera toutes vos réponses. Voulez-vous vraiment repartir de zéro ?",
  "question.progress": "Question {current} sur {total}",
  "question.previous": "← Précédent",
  "question.showHelp": "Afficher l'aide",
  "question.hideHelp": "Masquer l'aide",

  "scale.anchor.disagree": "Pas d'accord",
  "scale.anchor.agree": "D'accord",
  "scale.choice.0": "Tout à fait d'accord",
  "scale.choice.1": "D'accord",
  "scale.choice.2": "Plutôt d'accord",
  "scale.choice.3": "Neutre",
  "scale.choice.4": "Plutôt pas d'accord",
  "scale.choice.5": "Pas d'accord",
  "scale.choice.6": "Pas du tout d'accord",

  // ── Sélecteur de langue ───────────────────────────────────────────────────
  "lang.groupLabel": "Langue",

  // ── Garde-fou (ErrorBoundary) ─────────────────────────────────────────────
  "errorboundary.defaultTitle": "Une erreur est survenue",
  "errorboundary.defaultDesc":
    "Quelque chose n'a pas pu s'afficher. Votre progression enregistrée sur cet appareil est conservée.",
  "errorboundary.retry": "Réessayer",
  "errorboundary.reload": "Recharger la page",

  // ── Footer ────────────────────────────────────────────────────────────────
  "footer.legal": "Mentions légales",
  "footer.privacy": "Politique de confidentialité",
  "footer.copyright": "© {year} Polarity Quiz - Tous droits réservés",
  "footer.close": "Fermer",

  // ── Mentions légales ──────────────────────────────────────────────────────
  "legal.title": "Mentions Légales",
  "legal.editor.heading": "Éditeur du site",
  "legal.editor.body":
    "Site édité à titre personnel et non professionnel. Conformément à l'article 6, III-2 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), l'éditeur a transmis ses coordonnées personnelles à l'hébergeur.",
  "legal.contactLabel": "Contact :",
  "legal.hosting.heading": "Hébergement",
  "legal.hosting.hostLabel": "Hébergeur :",
  "legal.hosting.addressLabel": "Adresse :",
  "legal.ip.heading": "Propriété intellectuelle",
  "legal.ip.body1":
    "L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de l'éditeur, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.",
  "legal.ip.body2":
    "Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès par écrit de l'éditeur.",
  "legal.liability.heading": "Limitation de responsabilité",
  "legal.liability.body1":
    "Les informations fournies par ce site le sont à titre indicatif. Ce test de positionnement politique n'a aucune valeur scientifique ou officielle et ne constitue en aucun cas un diagnostic ou une analyse professionnelle.",
  "legal.liability.body2":
    "L'éditeur ne saurait être tenu responsable de l'interprétation faite des résultats ou de leur utilisation.",

  // ── Politique de confidentialité ──────────────────────────────────────────
  "privacy.title": "Politique de Confidentialité",
  "privacy.banner.title": "✅ Votre vie privée est respectée",
  "privacy.banner.body":
    "Aucune donnée personnelle n'est collectée. Seules des statistiques de fréquentation anonymes sont mesurées via GoatCounter, sans cookies.",
  "privacy.collected.heading": "Données personnelles collectées : aucune",
  "privacy.collected.body":
    "Cette application ne collecte, ne stocke et ne transmet **aucune donnée personnelle** sur nos serveurs.",
  "privacy.collected.li1": "Pas de compte utilisateur",
  "privacy.collected.li2": "Pas de demande d'email, nom ou téléphone",
  "privacy.collected.li3": "Pas de cookies de tracking",
  "privacy.collected.li4":
    "Pas de Google Analytics, Facebook Pixel ou autre outil de suivi",
  "privacy.collected.li5": "Pas de publicité ciblée",
  "privacy.collected.footnote":
    "Des statistiques de fréquentation anonymes et agrégées (pages vues, appareils, tests complétés) sont mesurées via GoatCounter — voir la section « Analyse d'audience » ci-dessous.",
  "privacy.local.heading": "Stockage local (localStorage)",
  "privacy.local.body":
    "Les résultats de votre test et vos profils sauvegardés sont stockés **uniquement dans votre navigateur** via le localStorage.",
  "privacy.local.li1": "Ces données ne quittent jamais votre appareil",
  "privacy.local.li2": "Elles ne sont jamais transmises à nos serveurs",
  "privacy.local.li3":
    "Vous pouvez les supprimer à tout moment en vidant le cache de votre navigateur",
  "privacy.share.heading": "Partage de résultats via URL",
  "privacy.share.body":
    'Lorsque vous partagez vos résultats via le bouton "Partager" :',
  "privacy.share.li1":
    "Vos réponses sont encodées directement dans l'URL (paramètre `?results=...`)",
  "privacy.share.li2":
    "Si vous fournissez un nom, il sera visible dans l'URL partagée",
  "privacy.share.li3":
    "**Aucune donnée n'est stockée sur nos serveurs** - le lien contient tout",
  "privacy.share.li4":
    "Toute personne avec le lien peut voir les résultats partagés",
  "privacy.share.warning":
    "⚠️ **Attention :** Si vous partagez un lien avec votre nom, celui-ci sera visible par toute personne accédant au lien.",
  "privacy.cookies.heading": "Cookies",
  "privacy.cookies.body":
    "Cette application **n'utilise AUCUN cookie**, ni de première partie ni de tierce partie.",
  "privacy.audience.heading": "Analyse d'audience",
  "privacy.audience.body":
    "Nous utilisons **GoatCounter**, un outil d'analyse respectueux de la vie privée, pour collecter des statistiques anonymes sur l'utilisation du site afin d'améliorer votre expérience.",
  "privacy.audience.collectedLabel": "**Données collectées (anonymes) :**",
  "privacy.audience.collected.li1": "Pages visitées",
  "privacy.audience.collected.li2": "Nombre de tests complétés",
  "privacy.audience.collected.li3":
    "Plateforme de partage utilisée (Twitter, WhatsApp, etc.)",
  "privacy.audience.collected.li4": "Type d'appareil (mobile/desktop)",
  "privacy.audience.notCollectedLabel": "**Données NON collectées :**",
  "privacy.audience.notCollected.li1": "Aucune adresse IP",
  "privacy.audience.notCollected.li2": "Aucune donnée personnelle identifiable",
  "privacy.audience.notCollected.li3": "Aucun cookie de tracking",
  "privacy.audience.notCollected.li4": "Aucun identifiant unique",
  "privacy.audience.moreInfo":
    "Ces données sont agrégées et ne permettent pas de vous identifier. Pour en savoir plus :",
  "privacy.audience.linkLabel": "Politique de confidentialité GoatCounter",
  "privacy.rights.heading": "Vos droits",
  "privacy.rights.intro": "Vous disposez à tout moment du droit de :",
  "privacy.rights.li1":
    "**Supprimer vos données locales :** Videz le cache et les données de navigation de votre navigateur",
  "privacy.rights.li2":
    "**Supprimer vos profils sauvegardés :** Utilisez le bouton de suppression (icône poubelle) sur chaque profil",
  "privacy.rights.li3":
    "**Ne pas partager de données :** Vous n'êtes jamais obligé de partager vos résultats",
  "privacy.changes.heading": "Modifications de cette politique",
  "privacy.changes.body":
    "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. La date de dernière mise à jour sera toujours indiquée en haut de cette page.",
  "privacy.contact.heading": "Contact",
  "privacy.contact.body":
    "Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse :",
  "privacy.lastUpdatedLabel": "Dernière mise à jour :",

  // ── Résultats : onglets ───────────────────────────────────────────────────
  "result.tab.results": "Résultats",
  "result.tab.compare": "Comparateur",
  "result.tab.explained": "Explications",
  "result.tab.profiles": "Profils politiques",

  // ── Résultats : en-tête + export image ────────────────────────────────────
  "result.heading": "Vos résultats",
  "result.export.download": "Partager l'image",
  "result.export.loading": "Export…",
  "result.export.inProgress": "Export en cours…",
  "result.export.aria": "Partager l'image de mes résultats",
  "result.export.notFound": "Erreur : élément non trouvé",
  "result.export.error":
    "Erreur lors de l'export de l'image.\n\nDétail technique : {detail}",
  "result.export.shareTitle": "Mes résultats Polarity Quiz",
  "result.export.fileName": "mon-profil-politique.png",

  // ── Résultats : menu de partage ───────────────────────────────────────────
  "result.share.button": "Lien",
  "result.share.menuTitle": "Partager le lien",
  "result.share.copyLink": "Copier le lien",
  "result.share.copyLinkSub": "Vos résultats en version interactive",
  "result.share.copied": "Lien copié !",
  "result.share.twitterSub": "Tweeter mes résultats",
  "result.share.whatsappSub": "Envoyer sur WhatsApp",
  "result.share.discordSub": "Copier pour Discord",
  "result.share.facebookSub": "Partager sur Facebook",
  "result.share.native": "Partager…",
  "result.share.nativeSub": "SMS, Telegram, etc.",
  "result.share.close": "Fermer",
  "result.share.nameLabel": "Votre prénom (facultatif)",
  "result.share.namePlaceholder": "Anonyme",
  "result.share.nameHint": "Visible par toute personne ayant le lien.",

  // ── Résultats : convictions les plus fortes ───────────────────────────────
  "result.sharpest.title": "Vos convictions les plus fortes",
  "result.sharpest.hint":
    "Les trois idées sur lesquelles vos réponses penchent le plus nettement d'un côté.",
  // Description complète d'un axe pour les lecteurs d'écran (la réglette
  // n'affiche visuellement que le pourcentage dominant).
  "result.axis.sr": "{axis} : {left} {pctLeft} % · {right} {pctRight} %",

  // ── Résultats : repères (figures les plus proches) ────────────────────────
  "result.top3.title": "Repères : les figures les plus proches de vos réponses",
  "result.top3.disclaimer":
    "Score fondé sur l'écart moyen entre vos positions et les siennes, axe par axe. Un repère de lecture, pas une mesure scientifique exacte.",

  // ── Résultats : badges ────────────────────────────────────────────────────
  "result.badges.title": "Badges obtenus",
  "result.badges.hint": "Touchez un badge pour afficher sa signification.",
  "result.badges.empty": "Aucun badge pour l'instant. Réessayez avec d'autres réponses.",
  "result.badges.rarity": "~{rarity} % des profils",

  // ── Pied de page : lien vers la page statique méthodologie ────────────────
  "footer.methodology": "Méthodologie",

  // ── Résultats : relais de partage (fin de lecture) ────────────────────────
  "result.shareCta.title": "Qui vous connaît vraiment ?",
  "result.shareCta.text":
    "Envoyez votre résultat à la personne qui vous connaît le mieux — et voyez si elle l'avait vu venir.",

  // ── Résultats : soutien + relance ─────────────────────────────────────────
  "result.support.text":
    "Ce test est gratuit, sans publicité et sans compte. S'il vous a été utile, vous pouvez soutenir son développement.",
  "result.support.button": "Soutenir le projet",
  "result.restart": "Recommencer le test",

  // ── Résultats : comparateur ───────────────────────────────────────────────
  "result.compare.title": "Comparateur de profils",
  "result.compare.subtitle":
    "Choisissez jusqu'à {max} figures à superposer sur le diagramme.",
  "result.compare.figures": "Figures politiques",
  "result.compare.hint":
    "Sélectionnez des profils ci-dessus pour les comparer sur le graphique.",
  "result.you": "Vous",
  "result.radar.aria":
    "Radar de positionnement sur les {count} axes idéologiques ; les valeurs détaillées sont listées au-dessus.",

  // ── Résultats : sauvegarde de profil ──────────────────────────────────────
  "result.save.title": "Sauvegarder mon profil",
  "result.save.placeholder": "Nom du profil (ex. Moi)",
  "result.save.button": "Sauvegarder",
  "result.save.saved": "Sauvegardé ✓",
  "result.save.hint":
    "Stocké uniquement dans votre navigateur, pour retrouver et comparer vos résultats dans le temps.",
  "result.save.error":
    "Stockage local indisponible (navigation privée ou espace saturé) : le profil n'a pas pu être enregistré.",
  "result.saved.title": "Vos profils sauvegardés",
  "result.deleteConfirm": "Supprimer ce profil ?",

  // ── Résultats : annuaire des figures ──────────────────────────────────────
  "result.directory.title": "Annuaire des figures politiques",
  "result.directory.subtitle":
    "Classées de gauche à droite. Choisissez une figure pour voir ses positions, axes et badges.",
  "result.directory.see": "Voir →",
  "result.directory.back": "← Retour à la liste",
  "result.directory.positions": "Positions sur les axes",
  "result.lean.left": "Gauche",
  "result.lean.right": "Droite",
  "result.lean.aria":
    "Positionnement gauche-droite : {value} sur 100 (0 = gauche, 100 = droite)",

  // ── Résultats : explication des axes ──────────────────────────────────────
  "result.color.red": "rouge",
  "result.color.blue": "bleu",
  "result.explained.title": "Explication des axes",
  "result.explained.intro.before": "Les positions en ",
  "result.explained.intro.mid": " sont associées à la gauche, et celles en ",
  "result.explained.intro.after":
    " à la droite, selon des codes politiques classiques, mais avec de nombreuses exceptions.",
  "result.explained.intro.p2":
    "Certaines idées dites « de gauche » peuvent être reprises par la droite, et inversement : par exemple, un discours d'ordre et de sécurité peut être défendu à gauche au nom de la justice sociale, tandis que des politiques de régulation économique peuvent être soutenues à droite pour protéger la nation ou les petites entreprises.",
  "result.explained.intro.p3":
    "Il est aussi possible d'adhérer à des éléments « rouges » et « bleus » d'une même idée : on peut vouloir un État fort qui encadre le marché, tout en refusant la hiérarchie rigide dans l'entreprise.",
  "result.explained.intro.p4":
    "Ce test cherche à donner une vision d'ensemble cohérente de vos orientations, mais il ne peut pas refléter toutes les nuances et contradictions qui composent une pensée politique réelle.",
  "result.explained.aboutTitle": "À propos",
  "result.explained.about1":
    "Le code couleur rouge/bleu renvoie aux tendances classiquement associées à la gauche et à la droite.",
  "result.explained.about2":
    "Mais ces catégories se croisent souvent : certains partis de gauche défendent des idées jugées conservatrices, tandis que des partis de droite reprennent des revendications sociales.",
  "result.explained.about3":
    "Ce test ne cherche pas à vous coller une étiquette, mais à vous aider à comprendre où vous vous situez sur différents axes.",

  // ── Carte de partage (image exportée) ─────────────────────────────────────
  // Rubriques neutres façon journal : les phrases-valeurs vouvoient la
  // personne testée, la carte ne dit ni « mes » ni « je ».
  "sharecard.sharpest": "Convictions les plus fortes",
  "sharecard.closest": "Figure la plus proche : {name} · {score}/100",
  "sharecard.axes": "Les 14 axes",
  "sharecard.left": "gauche",
  "sharecard.right": "droite",
  "sharecard.badges": "Badges",
  "sharecard.footer": "101 questions · 14 axes idéologiques · gratuit, sans compte",

  // ── Textes de partage (messages pré-remplis réseaux sociaux) ──────────────
  "share.text.named":
    "Découvrez les résultats politiques de {name} sur Polarity Quiz ! 🗳️",
  "share.text.anon": "Découvrez mes résultats politiques sur Polarity Quiz ! 🗳️",
  // Variantes « accroche » : utilisées quand les résultats fournissent la
  // conviction la plus forte et la figure la plus proche (voir ShareHook).
  "share.text.hook.named":
    "Le profil politique de {name} — conviction la plus forte : « {pole} » ({pct} %), figure la plus proche : {figure}. Et vous, vous êtes où ? 🗳️",
  "share.text.hook.anon":
    "101 questions plus tard : ma conviction la plus forte est « {pole} » ({pct} %) et ma figure la plus proche est {figure}. Et vous, vous êtes où ? 🗳️",
  "share.webTitle": "Polarity Quiz - Résultats",
};

export type StringKey = keyof typeof fr;

const en: Record<StringKey, string> = {
  // ── Home: masthead / hero ─────────────────────────────────────────────────
  "masthead.subtitle": "Political positioning test",
  "hero.question": "Where do you stand?",

  // ── Home: resume in-progress run ──────────────────────────────────────────
  "resume.notice": "A run in progress is saved on this device.",
  "resume.button": "Resume the test ({count}/{total} answered)",
  "resume.discard": "Start over",

  // ── Home: CTA / duration / support ────────────────────────────────────────
  "cta.start": "Start the test",
  "cta.explore": "Explore the profiles",
  "meta.duration": "{count} questions · about 15 minutes",
  "support.free": "Free and ad-free",
  "support.link": "support the project",

  // ── Home: three highlights ────────────────────────────────────────────────
  "features.axes": "{axes} divides, two poles on every idea.",
  "features.profile": "A detailed, nuanced and shareable profile.",
  "features.noAccount": "No sign-up, no account to create.",

  // ── Explorer mode ─────────────────────────────────────────────────────────
  "explorer.title": "Profile explorer",
  "explorer.back": "← Back",
  "explorer.error.title": "Couldn't load the explorer",
  "explorer.error.desc":
    "The profiles failed to load (network issue or a site update). Try again or reload the page.",

  // ── Shared results / main screen ──────────────────────────────────────────
  "shared.heading.named": "{name}'s results",
  "shared.heading.anon": "Shared results",
  "shared.notice":
    "You're viewing shared results. Take the test yourself to compare.",
  "shared.cta": "Take my test",
  "results.title": "Your political profile",
  "results.error.title": "Couldn't load your results",
  "results.error.desc":
    "Loading failed (network issue or a site update). Your answers stay saved on this device: try again or reload the page.",
  "results.loading": "Loading your results…",
  "skip.link": "Skip to content",

  // ── Question / voting scale ───────────────────────────────────────────────
  "question.restart": "Start over",
  "question.restartConfirm":
    "Starting over will erase all your answers. Do you really want to start from scratch?",
  "question.progress": "Question {current} of {total}",
  "question.previous": "← Previous",
  "question.showHelp": "Show help",
  "question.hideHelp": "Hide help",

  "scale.anchor.disagree": "Disagree",
  "scale.anchor.agree": "Agree",
  "scale.choice.0": "Strongly agree",
  "scale.choice.1": "Agree",
  "scale.choice.2": "Somewhat agree",
  "scale.choice.3": "Neutral",
  "scale.choice.4": "Somewhat disagree",
  "scale.choice.5": "Disagree",
  "scale.choice.6": "Strongly disagree",

  // ── Language selector ─────────────────────────────────────────────────────
  "lang.groupLabel": "Language",

  // ── Error boundary ────────────────────────────────────────────────────────
  "errorboundary.defaultTitle": "Something went wrong",
  "errorboundary.defaultDesc":
    "Something couldn't be displayed. The progress saved on this device is kept.",
  "errorboundary.retry": "Try again",
  "errorboundary.reload": "Reload the page",

  // ── Footer ────────────────────────────────────────────────────────────────
  "footer.legal": "Legal notice",
  "footer.privacy": "Privacy policy",
  "footer.copyright": "© {year} Polarity Quiz — All rights reserved",
  "footer.close": "Close",

  // ── Legal notice ──────────────────────────────────────────────────────────
  "legal.title": "Legal Notice",
  "legal.editor.heading": "Site publisher",
  "legal.editor.body":
    "This site is published on a personal, non-professional basis. In accordance with Article 6, III-2 of French Law No. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), the publisher has provided their personal contact details to the host.",
  "legal.contactLabel": "Contact:",
  "legal.hosting.heading": "Hosting",
  "legal.hosting.hostLabel": "Host:",
  "legal.hosting.addressLabel": "Address:",
  "legal.ip.heading": "Intellectual property",
  "legal.ip.body1":
    "All content on this site (text, images, graphics, logo, icons, etc.) is the exclusive property of the publisher, with the exception of trademarks, logos or content belonging to other partner companies or authors.",
  "legal.ip.body2":
    "Any reproduction, distribution, modification, adaptation, retransmission or publication of these elements is strictly prohibited without the publisher's express written consent.",
  "legal.liability.heading": "Limitation of liability",
  "legal.liability.body1":
    "The information provided on this site is given for general guidance only. This political positioning test has no scientific or official value and in no way constitutes a diagnosis or a professional assessment.",
  "legal.liability.body2":
    "The publisher cannot be held responsible for how the results are interpreted or used.",

  // ── Privacy policy ────────────────────────────────────────────────────────
  "privacy.title": "Privacy Policy",
  "privacy.banner.title": "✅ Your privacy is respected",
  "privacy.banner.body":
    "No personal data is collected. Only anonymous traffic statistics are measured via GoatCounter, without cookies.",
  "privacy.collected.heading": "Personal data collected: none",
  "privacy.collected.body":
    "This app collects, stores and transmits **no personal data** to our servers.",
  "privacy.collected.li1": "No user account",
  "privacy.collected.li2": "No request for your email, name or phone number",
  "privacy.collected.li3": "No tracking cookies",
  "privacy.collected.li4":
    "No Google Analytics, Facebook Pixel or other tracking tools",
  "privacy.collected.li5": "No targeted advertising",
  "privacy.collected.footnote":
    "Anonymous, aggregated traffic statistics (page views, devices, completed tests) are measured via GoatCounter — see the “Audience analytics” section below.",
  "privacy.local.heading": "Local storage (localStorage)",
  "privacy.local.body":
    "Your test results and saved profiles are stored **only in your browser** via localStorage.",
  "privacy.local.li1": "This data never leaves your device",
  "privacy.local.li2": "It is never sent to our servers",
  "privacy.local.li3":
    "You can delete it at any time by clearing your browser's cache",
  "privacy.share.heading": "Sharing results via URL",
  "privacy.share.body": 'When you share your results using the "Share" button:',
  "privacy.share.li1":
    "Your answers are encoded directly in the URL (the `?results=...` parameter)",
  "privacy.share.li2":
    "If you provide a name, it will be visible in the shared URL",
  "privacy.share.li3":
    "**No data is stored on our servers** - the link contains everything",
  "privacy.share.li4": "Anyone with the link can view the shared results",
  "privacy.share.warning":
    "⚠️ **Warning:** If you share a link with your name, it will be visible to anyone who opens the link.",
  "privacy.cookies.heading": "Cookies",
  "privacy.cookies.body":
    "This app uses **NO cookies**, neither first-party nor third-party.",
  "privacy.audience.heading": "Audience analytics",
  "privacy.audience.body":
    "We use **GoatCounter**, a privacy-friendly analytics tool, to collect anonymous statistics about site usage in order to improve your experience.",
  "privacy.audience.collectedLabel": "**Data collected (anonymous):**",
  "privacy.audience.collected.li1": "Pages visited",
  "privacy.audience.collected.li2": "Number of completed tests",
  "privacy.audience.collected.li3":
    "Sharing platform used (Twitter, WhatsApp, etc.)",
  "privacy.audience.collected.li4": "Device type (mobile/desktop)",
  "privacy.audience.notCollectedLabel": "**Data NOT collected:**",
  "privacy.audience.notCollected.li1": "No IP address",
  "privacy.audience.notCollected.li2": "No personally identifiable data",
  "privacy.audience.notCollected.li3": "No tracking cookies",
  "privacy.audience.notCollected.li4": "No unique identifier",
  "privacy.audience.moreInfo":
    "This data is aggregated and cannot be used to identify you. Learn more:",
  "privacy.audience.linkLabel": "GoatCounter privacy policy",
  "privacy.rights.heading": "Your rights",
  "privacy.rights.intro": "At any time, you have the right to:",
  "privacy.rights.li1":
    "**Delete your local data:** Clear your browser's cache and browsing data",
  "privacy.rights.li2":
    "**Delete your saved profiles:** Use the delete button (trash icon) on each profile",
  "privacy.rights.li3":
    "**Not share any data:** You are never required to share your results",
  "privacy.changes.heading": "Changes to this policy",
  "privacy.changes.body":
    "We reserve the right to change this privacy policy at any time. The date of the last update will always be shown at the top of this page.",
  "privacy.contact.heading": "Contact",
  "privacy.contact.body":
    "For any question about this privacy policy, you can contact us at:",
  "privacy.lastUpdatedLabel": "Last updated:",

  // ── Results: tabs ─────────────────────────────────────────────────────────
  "result.tab.results": "Results",
  "result.tab.compare": "Comparator",
  "result.tab.explained": "Explanations",
  "result.tab.profiles": "Political profiles",

  // ── Results: heading + image export ───────────────────────────────────────
  "result.heading": "Your results",
  "result.export.download": "Share the image",
  "result.export.loading": "Exporting…",
  "result.export.inProgress": "Export in progress…",
  "result.export.aria": "Share the image of my results",
  "result.export.notFound": "Error: element not found",
  "result.export.error":
    "Error while exporting the image.\n\nTechnical detail: {detail}",
  "result.export.shareTitle": "My Polarity Quiz results",
  "result.export.fileName": "my-political-profile.png",

  // ── Results: share menu ───────────────────────────────────────────────────
  "result.share.button": "Link",
  "result.share.menuTitle": "Share the link",
  "result.share.copyLink": "Copy the link",
  "result.share.copyLinkSub": "Your results as an interactive page",
  "result.share.copied": "Link copied!",
  "result.share.twitterSub": "Tweet my results",
  "result.share.whatsappSub": "Send on WhatsApp",
  "result.share.discordSub": "Copy for Discord",
  "result.share.facebookSub": "Share on Facebook",
  "result.share.native": "Share…",
  "result.share.nativeSub": "SMS, Telegram, etc.",
  "result.share.close": "Close",
  "result.share.nameLabel": "Your first name (optional)",
  "result.share.namePlaceholder": "Anonymous",
  "result.share.nameHint": "Visible to anyone with the link.",

  // ── Results: strongest convictions ────────────────────────────────────────
  "result.sharpest.title": "Your strongest convictions",
  "result.sharpest.hint":
    "The three ideas where your answers lean most clearly to one side.",
  "result.axis.sr": "{axis}: {left} {pctLeft}% · {right} {pctRight}%",

  // ── Results: landmarks (closest figures) ──────────────────────────────────
  "result.top3.title": "Landmarks: the figures closest to your answers",
  "result.top3.disclaimer":
    "Score based on the average gap between your positions and theirs, axis by axis. A reading aid, not an exact scientific measure.",

  // ── Results: badges ───────────────────────────────────────────────────────
  "result.badges.title": "Badges earned",
  "result.badges.hint": "Tap a badge to reveal its meaning.",
  "result.badges.empty": "No badge yet. Try again with different answers.",
  "result.badges.rarity": "~{rarity} % of profiles",

  // ── Footer: link to the static methodology page (French-only page) ───────
  "footer.methodology": "Methodology",

  // ── Results: share relay (end of reading) ─────────────────────────────────
  "result.shareCta.title": "Who really knows you?",
  "result.shareCta.text":
    "Send your result to the person who knows you best — and see if they saw it coming.",

  // ── Results: support + restart ────────────────────────────────────────────
  "result.support.text":
    "This test is free, ad-free and account-free. If it was useful to you, you can support its development.",
  "result.support.button": "Support the project",
  "result.restart": "Restart the test",

  // ── Results: comparator ───────────────────────────────────────────────────
  "result.compare.title": "Profile comparator",
  "result.compare.subtitle": "Choose up to {max} figures to overlay on the chart.",
  "result.compare.figures": "Political figures",
  "result.compare.hint": "Select profiles above to compare them on the chart.",
  "result.you": "You",
  "result.radar.aria":
    "Positioning radar across the {count} ideological axes; the detailed values are listed above.",

  // ── Results: save profile ─────────────────────────────────────────────────
  "result.save.title": "Save my profile",
  "result.save.placeholder": "Profile name (e.g. Me)",
  "result.save.button": "Save",
  "result.save.saved": "Saved ✓",
  "result.save.hint":
    "Stored only in your browser, to find and compare your results over time.",
  "result.save.error":
    "Local storage unavailable (private browsing or full storage): the profile could not be saved.",
  "result.saved.title": "Your saved profiles",
  "result.deleteConfirm": "Delete this profile?",

  // ── Results: directory of figures ─────────────────────────────────────────
  "result.directory.title": "Directory of political figures",
  "result.directory.subtitle":
    "Ranked left to right. Choose a figure to see their positions, axes and badges.",
  "result.directory.see": "View →",
  "result.directory.back": "← Back to the list",
  "result.directory.positions": "Positions on the axes",
  "result.lean.left": "Left",
  "result.lean.right": "Right",
  "result.lean.aria":
    "Left-right positioning: {value} out of 100 (0 = left, 100 = right)",

  // ── Results: explanation of the axes ──────────────────────────────────────
  "result.color.red": "red",
  "result.color.blue": "blue",
  "result.explained.title": "Explanation of the axes",
  "result.explained.intro.before": "Positions in ",
  "result.explained.intro.mid":
    " are associated with the left, and those in ",
  "result.explained.intro.after":
    " with the right, following classic political conventions, but with many exceptions.",
  "result.explained.intro.p2":
    "Some ideas labelled “left-wing” can be taken up by the right, and vice versa: for example, a discourse of order and security can be defended on the left in the name of social justice, while economic-regulation policies can be supported on the right to protect the nation or small businesses.",
  "result.explained.intro.p3":
    "It is also possible to endorse both “red” and “blue” elements of the same idea: one can want a strong state that regulates the market while rejecting rigid hierarchy within the company.",
  "result.explained.intro.p4":
    "This test aims to give a coherent overall picture of your orientations, but it cannot reflect all the nuances and contradictions that make up a real political outlook.",
  "result.explained.aboutTitle": "About",
  "result.explained.about1":
    "The red/blue colour code refers to the tendencies classically associated with the left and the right.",
  "result.explained.about2":
    "But these categories often overlap: some left-wing parties defend ideas seen as conservative, while right-wing parties take up social demands.",
  "result.explained.about3":
    "This test does not seek to pin a label on you, but to help you understand where you stand on different axes.",

  // ── Share card (exported image) ───────────────────────────────────────────
  "sharecard.sharpest": "Strongest convictions",
  "sharecard.closest": "Closest figure: {name} · {score}/100",
  "sharecard.axes": "The 14 axes",
  "sharecard.left": "left",
  "sharecard.right": "right",
  "sharecard.badges": "Badges",
  "sharecard.footer": "101 questions · 14 ideological axes · free, no account",

  // ── Share text (pre-filled social messages) ───────────────────────────────
  "share.text.named": "Check out {name}'s political results on Polarity Quiz! 🗳️",
  "share.text.anon": "Check out my political results on Polarity Quiz! 🗳️",
  "share.text.hook.named":
    "{name}'s political profile — strongest conviction: “{pole}” ({pct}%), closest figure: {figure}. Where do you stand? 🗳️",
  "share.text.hook.anon":
    "101 questions later: my strongest conviction is “{pole}” ({pct}%) and my closest political figure is {figure}. Where do you stand? 🗳️",
  "share.webTitle": "Polarity Quiz - Results",
};

export const STRINGS: Record<Locale, Record<StringKey, string>> = { fr, en };

/**
 * Traduit `key` dans `locale`, avec repli sur le français clé par clé, puis sur
 * la clé elle-même. Interpole les variables `{nom}` fournies dans `vars`.
 */
export function translate(
  locale: Locale,
  key: StringKey,
  vars?: Record<string, string | number>
): string {
  const table = STRINGS[locale] ?? STRINGS.fr;
  let out = table[key] ?? STRINGS.fr[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.split(`{${name}}`).join(String(value));
    }
  }
  return out;
}
