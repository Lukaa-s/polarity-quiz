// src/data/referenceProfiles.ts
// Profils de référence de personnalités politiques

export type ReferenceProfile = {
  id: string;
  name: string;
  description: string;
  color?: string;
  answers: Record<string, number>;
  isReference: true; // Flag pour distinguer des profils utilisateurs
};

export const referenceProfiles: ReferenceProfile[] = [
  {
  id: "sarkozy_2007",
  name: "Nicolas Sarkozy (Président)",
  description: "Droite libérale et sécuritaire, pro-UE, volontarisme politique, autorité, économie de marché",
  color: "#1B3A8A",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 5,  // salariés co-décident → non
    "q2": 3,  // accumulation logements → neutre/libéral
    "q3": 1,  // propriété = moteur → oui
    "q4": 6,  // réquisition logements → non
    "q5": 1,  // propriété = liberté → oui

    // Libéralisme + État régalien
    "q6": 1,  // concurrence > État → oui
    "q7": 3,  // contrôle prix → neutre/rare
    "q8": 4,  // privatiser santé/école → plutôt non
    "q9": 1,  // hauts salaires → oui
    "q10": 5, // casser grands groupes → non
    "q11": 2, // investissements publics → plutôt oui (plan relance 2008)
    "q97": 2, // accessibilité → plutôt oui

    // Finalité économie
    "q12": 6, // milliardaires = exploitation → non
    "q13": 2, // limite richesse → plutôt non
    "q14": 1, // argent moteur innovation → oui
    "q15": 1, // mérite entrepreneurial → oui
    "q16": 5, // entreprise au service société → non

    // --- TRAVAIL ---
    "q17": 5, // réduire temps Travail → non (“travailler plus pour gagner plus”)
    "q18": 3, // revaloriser métiers soin/nettoyage → neutre
    "q19": 1, // travail dur → oui
    "q20": 2, // effort > richesse → plutôt oui
    "q21": 2, // travail = valeur centrale → oui

    // --- AUTORITÉ ---
    "q22": 5, // autorité critiquable → non
    "q23": 0, // autorité centrale forte → oui fort
    "q24": 4, // concentration pouvoir dangereuse → plutôt non
    "q25": 1, // appliquer la loi strictement → oui
    "q26": 1, // règles fortes → oui
    "q27": 1, // école discipline → oui

    // --- DÉMOCRATIE ---
    "q28": 2, // gouverner verticalement → plutôt oui
    "q29": 5, // référendums fréquents → non
    "q30": 3, // élus suivent opinion → neutre
    "q31": 4, // démocratie participative → plutôt non
    "q32": 1, // démocratie directe = risques → oui
    "q33": 2, // élites > masse → plutôt oui
    "q34": 2, // long terme > opinion → plutôt oui

    // --- CHANGEMENT SOCIAL ---
    "q35": 6, // grèves sauvages → rejet total
    "q36": 3, // institutions bloquent changement → neutre
    "q37": 2, // changement lent → plutôt oui
    "q38": 2, // convaincre par discours → plutôt oui
    "q39": 1, // ordre = stabilité → oui
    "q40": 6, // changement radical modèle → non

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 2, // incivilités = problème d’autorité → plutôt oui
    "q42": 2, // famille/nation/tradition → plutôt oui
    "q43": 2, // père+mère → plutôt oui
    "q44": 4, // visibiliser minorités → plutôt non
    "q45": 5, // abandon normes traditionnelles → non
    "q46": 5, // genre = construction sociale → non
    "q47": 5, // discrimination positive → non
    "q48": 1, // “se cacher derrière couleur peau” → oui
    "q90": 4, // cause animale → plutôt non
    "q92": 3, // libertés LGBTQ+ → neutre/acceptable mais non militant
    "q99": 3, // égalité femmes/hommes → neutre

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 5, // frontières absurdes → non
    "q50": 1, // migrants profitent → plutôt oui
    "q51": 2, // accords internationaux < souveraineté → plutôt oui
    "q52": 1, // priorité nationaux → oui
    "q53": 3, // aider peuples étrangers → neutre
    "q54": 5, // autorité mondiale > États → non
    "q91": 2, // UE → plutôt oui, mais réforme (pas fédéraliste)

    // --- RELIGION ---
    "q55": 1, // financement religions → non
    "q56": 1, // lois religieuses dangereuses → oui
    "q57": 3, // absence spiritualité → neutre
    "q58": 3, // méfiance religions → neutre
    "q59": 3, // traditions religieuses → neutre/équilibré
    "q60": 2, // rôle social religion → plutôt oui (discours de Latran)

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 1,  // peines plus sévères → oui (priorité)
    "q62": 1,  // impunité → oui
    "q63": 2,  // peines incompressibles → plutôt oui
    "q64": 4,  // justice restaurative → plutôt non
    "q65": 4,  // réinsertion → plutôt non (priorité punition)
    "q66": 2,  // perpétuité → plutôt oui
    "q67": 5,  // prison cause récidive → non
    "q68": 5,  // alternatives prison → non
    "q98": 4,  // cruauté animale → plutôt non

    // --- ÉCOLOGIE ---
    "q69": 4,  // sobriété → plutôt non
    "q70": 1,  // écologie punitive = menace → oui
    "q71": 4,  // capitalisme vert = illusion → plutôt non
    "q72": 2,  // éco-anxiété = luxe → plutôt oui
    "q73": 3,  // taxes écologiques → neutre
    "q74": 1,  // technologie > sobriété → oui
    "q89": 1,  // nucléaire = avenir → oui

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 2, // surveillance État → plutôt oui
    "q76a": 2, // liberté expression → plutôt oui
    "q76b": 3, // censure fake news → neutre
    "q77": 1, // contrôles d’identité → oui fort
    "q78": 1, // pouvoir police → oui
    "q79": 2, // vidéosurveillance → plutôt oui
    "q80": 2, // état d’urgence → plutôt oui (post-2005)

    // --- TECHNOLOGIE & AVENIR ---
    "q81": 3, // tech détruit emplois → neutre
    "q82": 3, // méfiance IA opaque → neutre
    "q83": 2, // génétique médicale → plutôt oui
    "q84": 2, // réseaux sociaux = problème → plutôt oui
    "q85": 3, // automatisation → neutre
    "q86": 3, // régulation tech → neutre
    "q87": 2, // numérique modernise démocratie → plutôt oui
    "q88": 1, // tech sans entraves → oui
    "q93": 1, // génétique pour maladies → oui
    "q95": 2, // exploration spatiale → plutôt oui
    "q96": 1  // science > tradition → oui
  }
},
{
  id: "hollande_2012",
  name: "François Hollande (2012)",
  description: "Centre-gauche social-démocrate, redistributif, progressiste, pro-UE, président consensuel",
  color: "#ED4E6E",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 3,  // salariés participent à la gestion → neutre/pas prioritaire
    "q2": 2,  // accumulation de logements → plutôt oui (encadrement)
    "q3": 2,  // propriété moteur → oui modéré
    "q4": 4,  // réquisition logements → plutôt non (sauf extrême urgence)
    "q5": 2,  // propriété = liberté → plutôt oui

    // État / marché : social-démocratie
    "q6": 3,  // concurrence vs monopole public → neutre
    "q7": 2,  // contrôle des prix (essence, énergie) → plutôt oui
    "q8": 5,  // privatisation santé/école → non
    "q9": 3,  // liberté hauts salaires → neutre (taxe 75%)
    "q10": 4, // casser grands groupes → plutôt non
    "q11": 1, // investissements publics (emplois, relance) → oui
    "q97": 2, // accessibilité handicap → plutôt oui

    // Finalité économie
    "q12": 3, // milliardaires exploitent → neutre (critique modérée)
    "q13": 3, // limite richesse → neutre/équilibré
    "q14": 2, // argent moteur → plutôt oui
    "q15": 2, // mérite entrepreneurial → plutôt oui
    "q16": 3, // entreprise doit servir société → neutre

    // --- TRAVAIL ---
    "q17": 4, // réduire temps de travail → plutôt non (pas de 32h)
    "q18": 2, // revalorisation métiers humains → plutôt oui
    "q19": 4, // travail mal payé = noble → plutôt non
    "q20": 2, // effort doit être récompensé → plutôt oui
    "q21": 3, // travail comme sens → neutre

    // --- AUTORITÉ ---
    "q22": 2, // autorité critiquable → plutôt oui
    "q23": 4, // autorité centrale forte → plutôt non (président “normal”)
    "q24": 3, // concentration pouvoir = menace → neutre
    "q25": 3, // appliquer loi même imparfaite → neutre
    "q26": 2, // règles nécessaires → plutôt oui
    "q27": 4, // école doit inculquer discipline → plutôt non

    // --- DÉMOCRATIE ---
    "q28": 4,  // gouverner sans consulter → non
    "q29": 3,  // référendums réguliers → neutre (méfiance PS depuis 2005)
    "q30": 2,  // élus suivent majorité → plutôt oui
    "q31": 2,  // démocratie participative → plutôt oui
    "q32": 3,  // démocratie directe = risque → neutre
    "q33": 4,  // élites > peuple → plutôt non
    "q34": 4,  // ignorer volonté pour long terme → plutôt non

    // --- CHANGEMENT SOCIAL ---
    "q35": 4,  // grèves sauvages → plutôt non
    "q36": 3,  // changer institutions → neutre
    "q37": 2,  // changement lent → plutôt oui
    "q38": 2,  // convaincre par pédagogie → plutôt oui
    "q39": 3,  // stabilité = ordre → neutre
    "q40": 5,  // rupture radicale → non

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 4,  // incivilités → plutôt non
    "q42": 4,  // valeurs traditionnelles → plutôt non
    "q43": 4,  // père+mère obligatoires → plutôt non (mariage pour tous)
    "q44": 2,  // rendre visibles discriminations → plutôt oui
    "q45": 2,  // abandon normes excluantes → plutôt oui
    "q46": 2,  // genre construction sociale → plutôt oui (modérément)
    "q47": 3,  // discrimination positive → neutre/équilibré
    "q48": 4,  // “on se cache derrière couleur peau” → plutôt non
    "q90": 3,  // abolition exploitation animale → neutre
    "q92": 1,  // droits LGBTQ+ → oui (mariage pour tous)
    "q99": 2,  // égalité femmes/hommes → plutôt oui

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 4, // frontières absurdes → plutôt non
    "q50": 5, // migrants profitent système → non
    "q51": 3, // accords internationaux < peuple → neutre
    "q52": 4, // priorité pauvres nationaux → plutôt non
    "q53": 2, // aider peuples en danger → plutôt oui
    "q54": 3, // autorité mondiale > États → neutre
    "q91": 2, // UE → plutôt oui (PS pro-européen)

    // --- RELIGION ---
    "q55": 1, // financer religion → non
    "q56": 1, // lois inspirées religion = danger → oui
    "q57": 3, // absence spiritualité = décadence → neutre
    "q58": 3, // méfiance religion → neutre
    "q59": 4, // absence repères religieux = déclin → plutôt non
    "q60": 2, // religion = lien social → plutôt oui

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 3,  // peines plus sévères → neutre
    "q62": 3,  // impunité cause violence → neutre
    "q63": 5,  // peines incompressibles → plutôt non
    "q64": 2,  // justice restaurative → plutôt oui
    "q65": 2,  // réinsertion → plutôt oui
    "q66": 4,  // perpétuité stricte → plutôt non
    "q67": 3,  // prison fabrique récidive → neutre
    "q68": 2,  // alternatives prison → plutôt oui
    "q98": 3,  // cruauté animale → neutre

    // --- ÉCOLOGIE ---
    "q69": 2,  // réduire consommation → plutôt oui
    "q70": 3,  // écologie menace économie → neutre
    "q71": 4,  // capitalisme vert = illusion → plutôt non
    "q72": 3,  // éco-anxiété → neutre
    "q73": 3,  // taxes écolo injustes → neutre
    "q74": 2,  // technologie > sobriété → plutôt oui
    "q89": 4,  // nucléaire = avenir → plutôt non (fermeture Fessenheim)

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 4, // surveillance numérique → plutôt non
    "q76a": 2, // liberté expression → plutôt oui
    "q76b": 4, // censure fake news → plutôt non
    "q77": 4, // contrôles d’identité renforcés → plutôt non
    "q78": 4, // plus de pouvoir police → plutôt non
    "q79": 3, // vidéosurveillance → neutre
    "q80": 4, // état d’urgence → plutôt non

    // --- TECHNOLOGIES & FUTUR ---
    "q81": 3, // tech détruit emplois → neutre
    "q82": 3, // méfiance IA opaque → neutre
    "q83": 2, // génétique médicale → plutôt oui
    "q84": 3, // réseaux sociaux → neutre
    "q85": 3, // automatisation → neutre
    "q86": 3, // régulation technologie → neutre/équilibré
    "q87": 2, // numérique modernise démocratie → plutôt oui
    "q88": 3, // tech sans entraves → neutre
    "q93": 2, // génétique pour maladies → plutôt oui
    "q95": 2, // exploration spatiale → plutôt oui
    "q96": 1  // science > tradition → oui
  }
}
,
{
  id: "obama_2012",
  name: "Barack Obama (2012)",
  description: "Centre-gauche social-libéral, pro-État social, pro-marché, progressiste et internationaliste",
  color: "#1565C0",
  isReference: true,
  answers: {
    // Modèle de propriété
    "q1": 4,
    "q2": 3,
    "q3": 2,
    "q4": 4,
    "q5": 2,

    // Rôle de l’État dans l’économie
    "q6": 2,
    "q7": 2,
    "q8": 5,
    "q9": 4,
    "q10": 2,
    "q11": 1,
    "q97": 2,

    // Finalité de l’activité économique
    "q12": 5,
    "q13": 3,
    "q14": 2,
    "q15": 2,
    "q16": 2,

    // Sens et fonction du travail
    "q17": 4,
    "q18": 2,
    "q19": 2,
    "q20": 2,
    "q21": 2,

    // Organisation du pouvoir
    "q22": 1,
    "q23": 2,
    "q24": 2,
    "q25": 2,
    "q26": 1,
    "q27": 4,

    // Forme de démocratie
    "q28": 4,
    "q29": 3,
    "q30": 3,
    "q31": 2,
    "q32": 3,
    "q33": 4,
    "q34": 3,

    // Rapport au changement social
    "q35": 4,
    "q36": 5,
    "q37": 1,
    "q38": 1,
    "q39": 2,
    "q40": 4,

    // Vision du progrès sociétal
    "q41": 3,
    "q42": 3,
    "q43": 5,
    "q44": 1,
    "q45": 2,
    "q46": 2,
    "q47": 2,
    "q48": 5,
    "q90": 5,
    "q92": 1,
    "q99": 1,

    // Échelle de souveraineté
    "q49": 4,
    "q50": 6,
    "q51": 4,
    "q52": 3,
    "q53": 2,
    "q54": 2,
    "q91": 2,

    // Place du religieux
    "q55": 4,
    "q56": 1,
    "q57": 2,
    "q58": 3,
    "q59": 4,
    "q60": 1,

    // Objectif du système judiciaire
    "q61": 3,
    "q62": 3,
    "q63": 2,
    "q64": 2,
    "q65": 2,
    "q66": 3,
    "q67": 2,
    "q68": 2,
    "q98": 4,

    // Modèle écologique
    "q69": 2,
    "q70": 3,
    "q71": 5,
    "q72": 4,
    "q73": 3,
    "q74": 2,
    "q89": 2,

    // Liberté / sécurité
    "q75": 2,
    "q76a": 2,
    "q76b": 3,
    "q77": 3,
    "q78": 3,
    "q79": 2,
    "q80": 2,
    "q94": 4,

    // Progrès technologique et enjeux sociaux
    "q81": 3,
    "q82": 2,
    "q83": 2,
    "q84": 2,
    "q85": 3,
    "q86": 2,
    "q87": 2,
    "q88": 3,
    "q93": 1,
    "q95": 2,
    "q96": 2
  }
},
{
  id: "donald_trump",
  name: "Donald Trump",
  description: "Droite populiste, nationaliste, anti-immigration, conservatrice et pro-business (mandat 2016–2020)",
  color: "#C62828",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 6,
    "q2": 2,
    "q3": 1,
    "q4": 6,
    "q5": 1,

    "q6": 1,
    "q7": 5,
    "q8": 6,
    "q9": 1,
    "q10": 6,
    "q11": 3,
    "q97": 4,

    // Finalité économique
    "q12": 6,
    "q13": 1,
    "q14": 1,
    "q15": 1,
    "q16": 6,

    // --- TRAVAIL ---
    "q17": 6,
    "q18": 3,
    "q19": 1,
    "q20": 1,
    "q21": 1,

    // --- AUTORITÉ ---
    "q22": 6,
    "q23": 0,
    "q24": 6,
    "q25": 1,
    "q26": 1,
    "q27": 1,

    // --- DÉMOCRATIE ---
    "q28": 1,
    "q29": 5,
    "q30": 5,
    "q31": 6,
    "q32": 1,
    "q33": 1,
    "q34": 1,

    // --- CHANGEMENT SOCIAL ---
    "q35": 6,
    "q36": 4,
    "q37": 2,
    "q38": 6,
    "q39": 1,
    "q40": 6,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 1,
    "q42": 1,
    "q43": 1,
    "q44": 6,
    "q45": 6,
    "q46": 6,
    "q47": 6,
    "q48": 1,
    "q90": 6,
    "q92": 6,
    "q99": 4,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 1,
    "q51": 1,
    "q52": 0,
    "q53": 5,
    "q54": 6,
    "q91": 6,

    // --- RELIGION ---
    "q55": 3,
    "q56": 3,
    "q57": 2,
    "q58": 4,
    "q59": 1,
    "q60": 2,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 1,
    "q62": 1,
    "q63": 2,
    "q64": 6,
    "q65": 6,
    "q66": 1,
    "q67": 6,
    "q68": 6,
    "q98": 6,

    // --- ÉCOLOGIE ---
    "q69": 6,
    "q70": 1,
    "q71": 6,
    "q72": 1,
    "q73": 4,
    "q74": 1,
    "q89": 3, // plutôt pro-fossile que pro-nucléaire

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 3,
    "q76a": 3,
    "q76b": 2,
    "q77": 1,
    "q78": 1,
    "q79": 2,
    "q80": 2,
    "q94": 6,

    // --- TECHNOLOGIE & FUTUR ---
    "q81": 4,
    "q82": 6,
    "q83": 4,
    "q84": 3,
    "q85": 3,
    "q86": 4,
    "q87": 5,
    "q88": 2,
    "q93": 3,
    "q95": 3,
    "q96": 4
  }
},
{
  id: "angela_merkel",
  name: "Angela Merkel",
  description: "Centre-droit modéré, pro-UE, économie sociale de marché, pragmatique et consensuelle",
  color: "#2E86C1",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 4,
    "q2": 3,
    "q3": 2,
    "q4": 5,
    "q5": 2,

    "q6": 2,
    "q7": 3,
    "q8": 5,
    "q9": 2,
    "q10": 5,
    "q11": 2,
    "q97": 2,

    // Finalité économique
    "q12": 5,
    "q13": 3,
    "q14": 2,
    "q15": 2,
    "q16": 3,

    // --- TRAVAIL ---
    "q17": 5,
    "q18": 3,
    "q19": 3,
    "q20": 2,
    "q21": 3,

    // --- AUTORITÉ ---
    "q22": 3,
    "q23": 3,
    "q24": 3,
    "q25": 2,
    "q26": 2,
    "q27": 3,

    // --- DÉMOCRATIE ---
    "q28": 4,
    "q29": 3,
    "q30": 2,
    "q31": 3,
    "q32": 3,
    "q33": 4,
    "q34": 3,

    // --- CHANGEMENT SOCIAL ---
    "q35": 4,
    "q36": 3,
    "q37": 2,
    "q38": 2,
    "q39": 2,
    "q40": 5,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 3,
    "q42": 3,
    "q43": 4,
    "q44": 2,
    "q45": 3,
    "q46": 4,
    "q47": 4,
    "q48": 4,
    "q90": 3,
    "q92": 3,
    "q99": 2,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 4,
    "q50": 5,
    "q51": 4,
    "q52": 4,
    "q53": 2,
    "q54": 4,
    "q91": 1,

    // --- RELIGION ---
    "q55": 4,
    "q56": 2,
    "q57": 3,
    "q58": 3,
    "q59": 3,
    "q60": 2,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 3,
    "q62": 3,
    "q63": 4,
    "q64": 3,
    "q65": 3,
    "q66": 4,
    "q67": 4,
    "q68": 3,
    "q98": 3,

    // --- ÉCOLOGIE ---
    "q69": 2,
    "q70": 3,
    "q71": 4,
    "q72": 3,
    "q73": 3,
    "q74": 2,
    "q89": 5, // sortie du nucléaire

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 3,
    "q76a": 2,
    "q76b": 4,
    "q77": 3,
    "q78": 3,
    "q79": 3,
    "q80": 4,
    "q94": 3,

    // --- TECHNOLOGIE ---
    "q81": 3,
    "q82": 3,
    "q83": 3,
    "q84": 3,
    "q85": 3,
    "q86": 3,
    "q87": 3,
    "q88": 3,
    "q93": 2,
    "q95": 3,
    "q96": 2
  }
},
{
  id: "xi_jinping",
  name: "Xi Jinping",
  description: "Autoritarisme étatique, capitalisme d'État, nationalisme, contrôle social et surveillance",
  color: "#B71C1C",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 1,
    "q2": 3,
    "q3": 5,
    "q4": 2,
    "q5": 5,

    "q6": 6,
    "q7": 1,
    "q8": 6,
    "q9": 4,
    "q10": 1,
    "q11": 1,
    "q97": 3,

    // Finalité économique
    "q12": 5,
    "q13": 6,
    "q14": 4,
    "q15": 4,
    "q16": 0, // entreprise doit servir l'État

    // --- TRAVAIL ---
    "q17": 6,
    "q18": 3,
    "q19": 1,
    "q20": 1,
    "q21": 1,

    // --- AUTORITÉ ---
    "q22": 6,
    "q23": 0,
    "q24": 6,
    "q25": 1,
    "q26": 1,
    "q27": 1,

    // --- DÉMOCRATIE ---
    "q28": 0,
    "q29": 6,
    "q30": 6,
    "q31": 6,
    "q32": 0,
    "q33": 0,
    "q34": 0,

    // --- CHANGEMENT SOCIAL ---
    "q35": 6,
    "q36": 2,
    "q37": 1,
    "q38": 6,
    "q39": 0,
    "q40": 6,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 1,
    "q42": 1,
    "q43": 1,
    "q44": 6,
    "q45": 6,
    "q46": 6,
    "q47": 6,
    "q48": 1,
    "q90": 6,
    "q92": 6,
    "q99": 4,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 6,
    "q51": 0,
    "q52": 0,
    "q53": 4,
    "q54": 6,
    "q91": 6,

    // --- RELIGION ---
    "q55": 0,
    "q56": 1,
    "q57": 6,
    "q58": 1,
    "q59": 6,
    "q60": 6,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 0,
    "q62": 0,
    "q63": 0,
    "q64": 6,
    "q65": 6,
    "q66": 1,
    "q67": 6,
    "q68": 6,
    "q98": 6,

    // --- ÉCOLOGIE ---
    "q69": 3,
    "q70": 2,
    "q71": 4,
    "q72": 5,
    "q73": 3,
    "q74": 1,
    "q89": 2, // nucléaire oui mais pas comme priorité politique centrale

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 0,
    "q76a": 5,
    "q76b": 0,
    "q77": 0,
    "q78": 0,
    "q79": 0,
    "q80": 0,
    "q94": 6,

    // --- TECHNOLOGIE & FUTUR ---
    "q81": 3,
    "q82": 0,
    "q83": 3,
    "q84": 0,
    "q85": 3,
    "q86": 0,
    "q87": 6,
    "q88": 1,
    "q93": 3,
    "q95": 2,
    "q96": 2
  }
},
{
  id: "netanyahou_2025",
  name: "Benjamin Netanyahou (2025)",
  description: "Droite nationaliste, ultra-sécuritaire, libérale économiquement, conservatrice religieuse (Israël 2025)",
  color: "#003F8C",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 5,
    "q2": 2,
    "q3": 1,
    "q4": 6,
    "q5": 1,

    "q6": 1,
    "q7": 4,
    "q8": 6,
    "q9": 2,
    "q10": 5,
    "q11": 4,
    "q97": 3,

    // Finalité économique
    "q12": 6,
    "q13": 2,
    "q14": 1,
    "q15": 1,
    "q16": 5,

    // --- TRAVAIL ---
    "q17": 5,
    "q18": 3,
    "q19": 2,
    "q20": 2,
    "q21": 2,

    // --- AUTORITÉ ---
    "q22": 5,
    "q23": 0,
    "q24": 6,
    "q25": 1,
    "q26": 1,
    "q27": 1,

    // --- DÉMOCRATIE ---
    "q28": 1,
    "q29": 5,
    "q30": 5,
    "q31": 6,
    "q32": 1,
    "q33": 2,
    "q34": 1,

    // --- CHANGEMENT SOCIAL ---
    "q35": 6,
    "q36": 3,
    "q37": 2,
    "q38": 5,
    "q39": 1,
    "q40": 6,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 1,
    "q42": 1,
    "q43": 1,
    "q44": 6,
    "q45": 6,
    "q46": 6,
    "q47": 6,
    "q48": 1,
    "q90": 6,
    "q92": 5,
    "q99": 4,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 1,
    "q51": 1,
    "q52": 0,
    "q53": 4,
    "q54": 6,
    "q91": 6,

    // --- RELIGION ---
    "q55": 3,
    "q56": 4,
    "q57": 3,
    "q58": 3,
    "q59": 1,
    "q60": 2,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 1,
    "q62": 1,
    "q63": 2,
    "q64": 6,
    "q65": 6,
    "q66": 1,
    "q67": 6,
    "q68": 6,
    "q98": 6,

    // --- ÉCOLOGIE ---
    "q69": 5,
    "q70": 1,
    "q71": 6,
    "q72": 3,
    "q73": 4,
    "q74": 2,
    "q89": 2,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 2,
    "q76a": 3,
    "q76b": 2,
    "q77": 1,
    "q78": 1,
    "q79": 2,
    "q80": 1,
    "q94": 6,

    // --- TECHNOLOGIE & FUTUR ---
    "q81": 3,
    "q82": 2,
    "q83": 3,
    "q84": 3,
    "q85": 3,
    "q86": 3,
    "q87": 3,
    "q88": 2,
    "q93": 2,
    "q95": 2,
    "q96": 3
  }
},
{
  id: "philippe_poutou",
  name: "Philippe Poutou",
  description: "Extrême gauche anticapitaliste, anti-police, antiproductiviste, rupture totale avec le capitalisme",
  color: "#D50000",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 0,
    "q2": 5,
    "q3": 6,
    "q4": 0,
    "q5": 6,

    "q6": 6,
    "q7": 1,
    "q8": 6,
    "q9": 6,
    "q10": 1,
    "q11": 0,
    "q97": 3,

    // Finalité économique
    "q12": 0,
    "q13": 0,
    "q14": 6,
    "q15": 6,
    "q16": 1,

    // --- TRAVAIL ---
    "q17": 0,
    "q18": 1,
    "q19": 6,
    "q20": 5,
    "q21": 5,

    // --- AUTORITÉ ---
    "q22": 0,
    "q23": 6,
    "q24": 1,
    "q25": 5,
    "q26": 4,
    "q27": 6,

    // --- DÉMOCRATIE ---
    "q28": 6,
    "q29": 3,
    "q30": 3,
    "q31": 0,
    "q32": 6,
    "q33": 6,
    "q34": 5,

    // --- CHANGEMENT SOCIAL ---
    "q35": 0,
    "q36": 1,
    "q37": 6,
    "q38": 3,
    "q39": 6,
    "q40": 0,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 6,
    "q42": 5,
    "q43": 6,
    "q44": 1,
    "q45": 1,
    "q46": 1,
    "q47": 2,
    "q48": 5,
    "q90": 3,
    "q92": 1,
    "q99": 1,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 1,
    "q50": 6,
    "q51": 6,
    "q52": 6,
    "q53": 2,
    "q54": 0,
    "q91": 2,

    // --- RELIGION ---
    "q55": 4,
    "q56": 2,
    "q57": 6,
    "q58": 3,
    "q59": 6,
    "q60": 4,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 6,
    "q62": 6,
    "q63": 6,
    "q64": 1,
    "q65": 1,
    "q66": 6,
    "q67": 2,
    "q68": 2,
    "q98": 4,

    // --- ÉCOLOGIE ---
    "q69": 1,
    "q70": 6,
    "q71": 1,
    "q72": 2,
    "q73": 3,
    "q74": 4,
    "q89": 6,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 6,
    "q76a": 1,
    "q76b": 6,
    "q77": 6,
    "q78": 6,
    "q79": 6,
    "q80": 6,
    "q94": 6,

    // --- TECHNOLOGIE & AVENIR ---
    "q81": 4,
    "q82": 3,
    "q83": 3,
    "q84": 4,
    "q85": 4,
    "q86": 2,
    "q87": 4,
    "q88": 5,
    "q93": 4,
    "q95": 3,
    "q96": 3
  }
},
{
  id: "sandrine_rousseau",
  name: "Sandrine Rousseau",
  description: "Écoféminisme radical, écologie forte, transformation sociale profonde, anti-normes traditionnelles",
  color: "#43A047",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 1,
    "q2": 4,
    "q3": 4,
    "q4": 1,
    "q5": 5,

    "q6": 5,
    "q7": 2,
    "q8": 6,
    "q9": 6,
    "q10": 2,
    "q11": 1,
    "q97": 2,

    // Finalité économique
    "q12": 1,
    "q13": 2,
    "q14": 5,
    "q15": 5,
    "q16": 1,

    // --- TRAVAIL ---
    "q17": 2,
    "q18": 1,
    "q19": 5,
    "q20": 4,
    "q21": 5,

    // --- AUTORITÉ ---
    "q22": 1,
    "q23": 6,
    "q24": 2,
    "q25": 4,
    "q26": 3,
    "q27": 5,

    // --- DÉMOCRATIE ---
    "q28": 5,
    "q29": 3,
    "q30": 3,
    "q31": 1,
    "q32": 6,
    "q33": 6,
    "q34": 5,

    // --- CHANGEMENT SOCIAL ---
    "q35": 2,
    "q36": 1,
    "q37": 5,
    "q38": 2,
    "q39": 6,
    "q40": 2,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 6,
    "q42": 6,
    "q43": 6,
    "q44": 1,
    "q45": 1,
    "q46": 1,
    "q47": 2,
    "q48": 6,
    "q90": 1,
    "q92": 1,
    "q99": 1,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 3,
    "q50": 6,
    "q51": 6,
    "q52": 6,
    "q53": 2,
    "q54": 2,
    "q91": 2,

    // --- RELIGION ---
    "q55": 5,
    "q56": 3,
    "q57": 6,
    "q58": 3,
    "q59": 6,
    "q60": 5,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 6,
    "q62": 6,
    "q63": 6,
    "q64": 1,
    "q65": 1,
    "q66": 6,
    "q67": 2,
    "q68": 2,
    "q98": 1,

    // --- ÉCOLOGIE ---
    "q69": 0,
    "q70": 6,
    "q71": 1,
    "q72": 1,
    "q73": 2,
    "q74": 6,
    "q89": 6,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 6,
    "q76a": 1,
    "q76b": 6,
    "q77": 6,
    "q78": 6,
    "q79": 6,
    "q80": 6,
    "q94": 5,

    // --- TECHNOLOGIE & AVENIR ---
    "q81": 4,
    "q82": 5,
    "q83": 5,
    "q84": 5,
    "q85": 4,
    "q86": 5,
    "q87": 4,
    "q88": 6,
    "q93": 4,
    "q95": 3,
    "q96": 4
  }
},
{
  id: "valerie_pecresse_2022",
  name: "Valérie Pécresse (2022)",
  description: "Droite libérale, sécuritaire, conservatisme modéré, pro-UE",
  color: "#1E88E5",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 5,
    "q2": 1,
    "q3": 1,
    "q4": 6,
    "q5": 1,

    "q6": 2,
    "q7": 4,
    "q8": 6,
    "q9": 2,
    "q10": 5,
    "q11": 4,
    "q97": 3,

    // Finalité économique
    "q12": 6,
    "q13": 2,
    "q14": 1,
    "q15": 1,
    "q16": 4,

    // --- TRAVAIL ---
    "q17": 5,
    "q18": 4,
    "q19": 2,
    "q20": 2,
    "q21": 2,

    // --- AUTORITÉ ---
    "q22": 5,
    "q23": 1,
    "q24": 6,
    "q25": 2,
    "q26": 2,
    "q27": 2,

    // --- DÉMOCRATIE ---
    "q28": 3,
    "q29": 4,
    "q30": 4,
    "q31": 4,
    "q32": 2,
    "q33": 3,
    "q34": 2,

    // --- CHANGEMENT SOCIAL ---
    "q35": 4,
    "q36": 3,
    "q37": 2,
    "q38": 4,
    "q39": 1,
    "q40": 4,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 3,
    "q42": 2,
    "q43": 4,
    "q44": 4,
    "q45": 5,
    "q46": 5,
    "q47": 4,
    "q48": 2,
    "q90": 4,
    "q92": 3,
    "q99": 3,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 1,
    "q51": 1,
    "q52": 1,
    "q53": 3,
    "q54": 6,
    "q91": 5,

    // --- RELIGION ---
    "q55": 3,
    "q56": 3,
    "q57": 4,
    "q58": 3,
    "q59": 2,
    "q60": 3,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 2,
    "q62": 2,
    "q63": 3,
    "q64": 6,
    "q65": 6,
    "q66": 2,
    "q67": 5,
    "q68": 5,
    "q98": 4,

    // --- ÉCOLOGIE ---
    "q69": 4,
    "q70": 2,
    "q71": 5,
    "q72": 4,
    "q73": 3,
    "q74": 2,
    "q89": 1,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 3,
    "q76a": 2,
    "q76b": 3,
    "q77": 2,
    "q78": 2,
    "q79": 3,
    "q80": 2,
    "q94": 4,

    // --- TECHNOLOGIE & FUTUR ---
    "q81": 4,
    "q82": 2,
    "q83": 4,
    "q84": 3,
    "q85": 3,
    "q86": 3,
    "q87": 3,
    "q88": 2,
    "q93": 2,
    "q95": 3,
    "q96": 3
  }
},
{
  id: "winston_churchill",
  name: "Winston Churchill",
  description: "Droite conservatrice libérale, nationaliste impérial, défenseur des libertés démocratiques, anti-totalitaire",
  color: "#5D4037",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 5,
    "q2": 1,
    "q3": 1,
    "q4": 6,
    "q5": 1,

    "q6": 3,
    "q7": 4,
    "q8": 6,
    "q9": 2,
    "q10": 5,
    "q11": 4,
    "q97": 3,

    // Finalité économique
    "q12": 5,
    "q13": 3,
    "q14": 1,
    "q15": 1,
    "q16": 5,

    // --- TRAVAIL ---
    "q17": 5,
    "q18": 3,
    "q19": 2,
    "q20": 1,
    "q21": 2,

    // --- AUTORITÉ ---
    "q22": 6,
    "q23": 1,
    "q24": 5,
    "q25": 1,
    "q26": 1,
    "q27": 1,

    // --- DÉMOCRATIE ---
    "q28": 5,
    "q29": 5,
    "q30": 5,
    "q31": 5,
    "q32": 1,
    "q33": 6,
    "q34": 4,

    // --- CHANGEMENT SOCIAL ---
    "q35": 5,
    "q36": 3,
    "q37": 1,
    "q38": 5,
    "q39": 1,
    "q40": 5,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 2,
    "q42": 1,
    "q43": 2,
    "q44": 5,
    "q45": 5,
    "q46": 5,
    "q47": 5,
    "q48": 1,
    "q90": 5,
    "q92": 4,
    "q99": 3,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 1,
    "q51": 1,
    "q52": 1,
    "q53": 3,
    "q54": 6,
    "q91": 5,

    // --- RELIGION ---
    "q55": 3,
    "q56": 3,
    "q57": 3,
    "q58": 3,
    "q59": 3,
    "q60": 3,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 2,
    "q62": 2,
    "q63": 2,
    "q64": 6,
    "q65": 6,
    "q66": 1,
    "q67": 6,
    "q68": 5,
    "q98": 4,

    // --- ÉCOLOGIE ---
    "q69": 5,
    "q70": 1,
    "q71": 6,
    "q72": 3,
    "q73": 2,
    "q74": 1,
    "q89": 4,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 5,
    "q76a": 2,
    "q76b": 5,
    "q77": 3,
    "q78": 3,
    "q79": 4,
    "q80": 4,
    "q94": 5,

    // --- TECHNOLOGIE & AVENIR ---
    "q81": 4,
    "q82": 2,
    "q83": 4,
    "q84": 2,
    "q85": 3,
    "q86": 4,
    "q87": 3,
    "q88": 3,
    "q93": 2,
    "q95": 3,
    "q96": 2
  }
},
{
  id: "fidel_castro",
  name: "Fidel Castro",
  description: "Communisme autoritaire, parti unique, économie planifiée, anti-impérialisme nationaliste",
  color: "#006400",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 0,
    "q2": 6,
    "q3": 6,
    "q4": 0,
    "q5": 6,

    "q6": 6,
    "q7": 0,
    "q8": 6,
    "q9": 6,
    "q10": 0,
    "q11": 0,
    "q97": 2,

    // Finalité économique
    "q12": 0,
    "q13": 0,
    "q14": 6,
    "q15": 6,
    "q16": 0,

    // --- TRAVAIL ---
    "q17": 0,
    "q18": 1,
    "q19": 6,
    "q20": 6,
    "q21": 4,

    // --- AUTORITÉ ---
    "q22": 6,
    "q23": 0,
    "q24": 6,
    "q25": 1,
    "q26": 1,
    "q27": 1,

    // --- DÉMOCRATIE ---
    "q28": 0,
    "q29": 6,
    "q30": 6,
    "q31": 6,
    "q32": 0,
    "q33": 0,
    "q34": 0,

    // --- CHANGEMENT SOCIAL ---
    "q35": 6,
    "q36": 1,
    "q37": 6,
    "q38": 4,
    "q39": 5,
    "q40": 1,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 3,
    "q42": 3,
    "q43": 2,
    "q44": 4,
    "q45": 6,
    "q46": 6,
    "q47": 4,
    "q48": 2,
    "q90": 4,
    "q92": 4,
    "q99": 3,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 6,
    "q51": 3,
    "q52": 1,
    "q53": 5,
    "q54": 6,
    "q91": 6,

    // --- RELIGION ---
    "q55": 1,
    "q56": 2,
    "q57": 6,
    "q58": 3,
    "q59": 6,
    "q60": 5,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 0,
    "q62": 0,
    "q63": 0,
    "q64": 6,
    "q65": 6,
    "q66": 1,
    "q67": 6,
    "q68": 6,
    "q98": 6,

    // --- ÉCOLOGIE ---
    "q69": 3,
    "q70": 2,
    "q71": 4,
    "q72": 3,
    "q73": 3,
    "q74": 2,
    "q89": 4,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 0,
    "q76a": 5,
    "q76b": 0,
    "q77": 0,
    "q78": 0,
    "q79": 0,
    "q80": 0,
    "q94": 6,

    // --- TECHNOLOGIE & AVENIR ---
    "q81": 3,
    "q82": 1,
    "q83": 2,
    "q84": 1,
    "q85": 3,
    "q86": 2,
    "q87": 3,
    "q88": 2,
    "q93": 2,
    "q95": 2,
    "q96": 2
  }
},
{
  id: "vladimir_putin_2025",
  name: "Vladimir Poutine (2025)",
  description: "Nationalisme autoritaire, conservatisme moral, État fort, impérialisme, démocratie contrôlée",
  color: "#8B0000",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 4,
    "q2": 1,
    "q3": 4,
    "q4": 5,
    "q5": 3,

    "q6": 2,
    "q7": 3,
    "q8": 6,
    "q9": 3,
    "q10": 4,
    "q11": 2,
    "q97": 3,

    // Finalité économique
    "q12": 5,
    "q13": 3,
    "q14": 2,
    "q15": 2,
    "q16": 4,

    // --- TRAVAIL ---
    "q17": 5,
    "q18": 3,
    "q19": 2,
    "q20": 2,
    "q21": 3,

    // --- AUTORITÉ ---
    "q22": 6,
    "q23": 0,
    "q24": 6,
    "q25": 1,
    "q26": 1,
    "q27": 1,

    // --- DÉMOCRATIE ---
    "q28": 1,
    "q29": 6,
    "q30": 6,
    "q31": 6,
    "q32": 0,
    "q33": 1,
    "q34": 1,

    // --- CHANGEMENT SOCIAL ---
    "q35": 6,
    "q36": 4,
    "q37": 1,
    "q38": 6,
    "q39": 0,
    "q40": 6,

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 1,
    "q42": 1,
    "q43": 1,
    "q44": 6,
    "q45": 6,
    "q46": 6,
    "q47": 6,
    "q48": 1,
    "q90": 6,
    "q92": 5,
    "q99": 4,

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6,
    "q50": 1,
    "q51": 1,
    "q52": 1,
    "q53": 4,
    "q54": 6,
    "q91": 6,

    // --- RELIGION ---
    "q55": 2,
    "q56": 2,
    "q57": 6,
    "q58": 3,
    "q59": 6,
    "q60": 6,

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 1,
    "q62": 1,
    "q63": 2,
    "q64": 6,
    "q65": 6,
    "q66": 1,
    "q67": 6,
    "q68": 6,
    "q98": 6,

    // --- ÉCOLOGIE ---
    "q69": 5,
    "q70": 1,
    "q71": 6,
    "q72": 3,
    "q73": 3,
    "q74": 1,
    "q89": 2,

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 1,
    "q76a": 6,
    "q76b": 1,
    "q77": 1,
    "q78": 1,
    "q79": 1,
    "q80": 1,
    "q94": 6,

    // --- TECHNOLOGIE & AVENIR ---
    "q81": 3,
    "q82": 2,
    "q83": 3,
    "q84": 2,
    "q85": 3,
    "q86": 3,
    "q87": 6,
    "q88": 3,
    "q93": 2,
    "q95": 3,
    "q96": 3
  }
},
  {
  id: "de_gaulle",
  name: "Charles de Gaulle",
  description: "Gaullisme : souveraineté nationale, État stratège, conservatisme modéré, autorité, unité nationale",
  color: "#0A3D62",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 4,  // salariés cogestion → plutôt non
    "q2": 3,  // accumulation logements → neutre
    "q3": 2,  // propriété moteur → plutôt oui
    "q4": 5,  // réquisition logements → non
    "q5": 1,  // propriété = liberté → oui

    // État / marché : État stratège + économie mixte
    "q6": 2,  // concurrence → plutôt oui mais avec encadrement
    "q7": 2,  // contrôle des prix → plutôt oui si national
    "q8": 5,  // privatiser santé/école → plutôt non
    "q9": 2,  // hauts salaires → plutôt oui
    "q10": 3, // casser grands groupes → neutre (État pilotait champions nationaux)
    "q11": 0, // investissements publics massifs → oui fort
    "q97": 3, // accessibilité → neutre (pas thème années 60)

    // Finalité économie
    "q12": 5, // milliardaires = exploitation → non
    "q13": 2, // aucune limite richesse → plutôt oui
    "q14": 1, // argent moteur innovation → oui
    "q15": 1, // entrepreneur récompensé → oui
    "q16": 3, // entreprise au service nation → neutre (plutôt oui mais pas socialiste)

    // --- TRAVAIL ---
    "q17": 5, // réduire temps travail → non
    "q18": 3, // valorisation métiers essentiels → neutre
    "q19": 2, // travail dur = respect → plutôt oui
    "q20": 2, // effort > richesse → plutôt oui
    "q21": 2, // travail comme devoir → oui

    // --- AUTORITÉ ---
    "q22": 4, // autorité critiquable → plutôt non
    "q23": 0, // autorité centrale forte → oui très fort (présidence Vᵉ)
    "q24": 4, // concentration pouvoir menace → plutôt non
    "q25": 1, // appliquer loi même imparfaite → oui
    "q26": 1, // règles nécessaires → oui
    "q27": 1, // école disciplinée → oui

    // --- DÉMOCRATIE ---
    "q28": 1,  // gouverner verticalement → oui
    "q29": 3,  // référendum → neutre (il en a fait quelques-uns stratégiques)
    "q30": 3,  // élus suivent opinion → neutre
    "q31": 5,  // participation citoyenne large → non
    "q32": 1,  // démocratie directe = risque → plutôt oui
    "q33": 1,  // élites instruites > masse → oui modéré
    "q34": 1,  // long terme > volonté immédiate → oui

    // --- CHANGEMENT SOCIAL ---
    "q35": 5,  // grèves → plutôt contre
    "q36": 3,  // institutions à réformer → neutre
    "q37": 1,  // évolution lente → oui
    "q38": 2,  // convaincre plutôt qu’affronter → plutôt oui
    "q39": 1,  // ordre, stabilité → oui
    "q40": 6,  // changement radical → non

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 1,  // incivilités → effondrement autorité → oui
    "q42": 1,  // famille nation tradition → oui
    "q43": 1,  // père + mère → oui
    "q44": 5,  // rendre visibles minorités → non
    "q45": 5,  // abandon normes traditionnelles → non
    "q46": 5,  // genre = construction sociale → non
    "q47": 5,  // discrimination positive → non
    "q48": 1,  // “on se réfugie derrière couleur peau” → oui
    "q90": 4,  // cause animale → plutôt non (pas un sujet)
    "q92": 4,  // libertés LGBTQ+ → plutôt non (contexte 1960)
    "q99": 3,  // égalité femmes-hommes → neutre (pas combat majeur)

    // --- IMMIGRATION / SOUVERAINETÉ ---
    "q49": 5, // frontières absurdes → non
    "q50": 2, // migrants profitent → plutôt oui mais modéré
    "q51": 0, // accords internationaux < souveraineté → oui fort
    "q52": 1, // priorité nationaux → oui
    "q53": 3, // aider peuples étrangers → neutre
    "q54": 6, // autorité mondiale > États → rejet total
    "q91": 4, // UE actuelle → plutôt contre (Europe des nations)

    // --- RELIGION ---
    "q55": 1, // financement religion → non (laïcité)
    "q56": 1, // lois inspirées religion = danger → oui
    "q57": 2, // absence spiritualité = décadence → plutôt oui
    "q58": 3, // méfiance religions → neutre
    "q59": 2, // traditions religieuses = repères → plutôt oui
    "q60": 2, // religion = cohésion → plutôt oui

    // --- JUSTICE / SÉCURITÉ ---
    "q61": 2,  // peines plus sévères → plutôt oui
    "q62": 2,  // impunité → plutôt oui
    "q63": 4,  // peines incompressibles → plutôt non
    "q64": 5,  // justice restaurative → non
    "q65": 4,  // réinsertion → plutôt non
    "q66": 2,  // perpétuité → plutôt oui
    "q67": 5,  // prison fabrique récidive → non
    "q68": 5,  // alternatives à prison → non
    "q98": 3,  // cause animale → neutre

    // --- ÉCOLOGIE ---
    "q69": 4,  // réduire consommation → plutôt non
    "q70": 2,  // écologie menace économie → plutôt oui
    "q71": 3,  // capitalisme vert illusion → neutre
    "q72": 3,  // éco-anxiété → neutre
    "q73": 3,  // taxes écolo injustes → neutre
    "q74": 1,  // progrès techno → oui
    "q89": 1,  // nucléaire = avenir → oui (gaullisme énergétique)

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 3, // surveillance État → neutre/équilibré
    "q76a": 2, // liberté expression → plutôt oui
    "q76b": 4, // censurer fake news → plutôt non
    "q77": 2, // contrôles identité → plutôt oui
    "q78": 2, // pouvoir police → plutôt oui
    "q79": 2, // vidéosurveillance → plutôt oui
    "q80": 2, // état d'urgence → plutôt oui

    // --- TECHNOLOGIE & FUTUR ---
    "q81": 3, // tech détruit emplois → neutre
    "q82": 3, // méfiance IA opaque → neutre
    "q83": 3, // génétique médicale → neutre (anachronique)
    "q84": 3, // réseaux sociaux → neutre (non pertinent)
    "q85": 3, // automatisation → neutre
    "q86": 3, // régulation techno → neutre
    "q87": 3, // numérique pour démocratie → neutre
    "q88": 2, // tech sans entraves → plutôt oui (industrialisme)
    "q93": 3, // génétique maladies → neutre/anachronique
    "q95": 1, // exploration spatiale → oui (France puissance scientifique)
    "q96": 1  // science > tradition → oui
  }
}
,
  {
  id: "marx",
  name: "Karl Marx",
  description: "Philosophe du communisme scientifique, critique radical du capitalisme et théoricien de la lutte des classes",
  color: "#B71C1C",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 0,  // les travailleurs décident & partagent → cœur du programme
    "q2": 6,  // accumulation de capital immobilier → forme de rente → rejet total
    "q3": 6,  // propriété privée capitaliste = exploitation → rejet
    "q4": 0,  // réquisition → oui (abolition propriété bourgeoise)
    "q5": 6,  // sacralisation du droit de propriété → non

    "q6": 6,  // concurrence = destruction, baisse tendancielle du profit → rejet total
    "q7": 1,  // contrôle des prix → intervention acceptable mais secondaire
    "q8": 6,  // privatisation santé/école = reproduction de classe
    "q9": 6,  // hauts salaires "libres" = extraction de plus-value
    "q10": 0, // casser les monopoles privés = abolition capital privée → oui
    "q11": 1, // investissement public (énergie/agri) → cohérent avec transition vers socialisme
    "q97": 3, // accessibilité bâtiments → hors de son cadre → neutre

    // --- FINALITÉ DE L’ÉCONOMIE ---
    "q12": 0, // devenir milliardaire = exploitation → oui
    "q13": 6, // richesse « honnête » illimitée → non
    "q14": 2, // profit = moteur d’innovation → reconnaît MAIS critique
    "q15": 1, // mérite entrepreneurial → non (capital = valeur volée)
    "q16": 0, // production orientée vers besoins → oui

    // --- TRAVAIL ---
    "q17": 1,  // réduction du temps de travail → encourage l’émancipation
    "q18": 1,  // valoriser métiers de reproduction sociale → oui
    "q19": 1,  // travailleur exploité = force productive → empathie
    "q20": 1,  // effort > richesse → travail source de valeur
    "q21": 2,  // travail central mais pas aliéné → nuance

    // --- AUTORITÉ ---
    "q22": 1,  // autorité critiquable/remplaçable → oui
    "q23": 2,  // centralisation temporaire possible, mais méfiance de l’État bourgeois
    "q24": 0,  // concentration du pouvoir = domination de classe
    "q25": 5,  // obéir aux lois injustes → non (lutte révolutionnaire)
    "q26": 3,  // chaos sans règles → neutre (analyse historique)
    "q27": 5,  // apprendre à obéir aveuglément → non

    // --- DÉMOCRATIE ---
    "q28": 5,  // élus gouvernant seuls → rejet
    "q29": 2,  // démocratie directe → plutôt favorable
    "q30": 2,  // élus liés à la volonté populaire → oui
    "q31": 1,  // démocratie = participation réelle → oui
    "q32": 4,  // démocratie directe = minorités militantes ? → pas d’accord
    "q33": 6,  // élite instruite > peuple → rejet total
    "q34": 4,  // dirigeant "visionnaire" = fiction bourgeoise

    // --- CHANGEMENT SOCIAL ---
    "q35": 1,  // grèves/occupations = moteur de lutte
    "q36": 0,  // sans changer les structures → pas de changement réel
    "q37": 6,  // réformes lentes > ruptures → non
    "q38": 3,  // éducation vs révolution → neutre
    "q39": 6,  // ordre social > rupture → non
    "q40": 0,  // changement radical → oui

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 4,  // discours "incivilités / autorité" = idéologie conservatrice
    "q42": 4,  // famille/nation/religion = superstructure → pas central
    "q43": 6,  // modèle familial unique → non
    "q44": 2,  // valoriser différences pour justice → oui (lutte des opprimés)
    "q45": 1,  // abandon de normes excluantes → oui
    "q46": 1,  // genres = construction sociale → oui
    "q47": 2,  // discrimination positive → mesure transitoire acceptable
    "q48": 5,  // discours d’exclusion racial → rejet
    "q90": 2,  // libération animale → pas central mais compatible
    "q92": 1,  // libertés LGBTQ+ → oui dans logique d’émancipation
    "q99": 1,  // égalité H/F → oui dans extension moderne

    // --- SOUVERAINETÉ / INTERNATIONALISME ---
    "q49": 1, // frontières = artefact historique → internationalisme
    "q50": 6, // migrants profitent des aides → non
    "q51": 4, // nation > accords internationaux → Marx pense en termes de classe
    "q52": 4, // priorité nationale → pas d’accord
    "q53": 1, // solidarité internationale → oui
    "q54": 2, // autorité mondiale → plutôt favorable si supranationale de classe
    "q91": 3, // UE → anachronique → neutre

    // --- RELIGION ---
    "q55": 1, // pas de financement religieux → oui
    "q56": 0, // lois religieuses = domination idéologique
    "q57": 5, // société laïque = décadente → non
    "q58": 1, // méfiance envers religion → oui
    "q59": 6, // absence de religion = décadence → non
    "q60": 4, // religion = lien social → il y voit une idéologie de classe

    // --- JUSTICE ---
    "q61": 4, // peines sévères = mécanique bourgeoise
    "q62": 3, // impunité → pas son cadre d’analyse
    "q63": 5, // peines incompressibles → non
    "q64": 1, // justice restaurative → oui (humanisme)
    "q65": 1, // réinsertion → oui
    "q66": 5, // enfermement sans fin → non
    "q67": 1, // prison fabrique délinquance → oui
    "q68": 2, // alternatives → plutôt oui
    "q98": 2, // cruauté animale → plutôt oui

    // --- ÉCOLOGIE ---
    "q69": 1,  // sobriété → compatible avec critique du capitalisme
    "q70": 4,  // freiner industrie = menace → pas d’accord
    "q71": 1,  // capitalisme vert = illusion
    "q72": 4,  // éco-anxiété = luxe de bourgeois → pas d’accord
    "q73": 3,  // taxes écologiques injustes → neutre
    "q74": 4,  // foi aveugle en progrès techno → critique
    "q89": 3,  // nucléaire → anachronique → neutre

    // --- LIBERTÉS / SÉCURITÉ ---
    "q75": 6, // surveillance de masse → non
    "q76a": 1, // liberté d’expression → oui
    "q76b": 4, // censure anti-fake news → méfiance (pouvoir bourgeois)
    "q77": 4, // contrôles policiers renforcés → non
    "q78": 6, // plus de force policière → non
    "q79": 4, // vidéosurveillance → non
    "q80": 5, // état d’urgence → non
    "q94": 2, // liberté sur drogues → plutôt oui

    // --- TECHNOLOGIE ---
    "q81": 3, // IA = dynamique capitaliste → neutre
    "q82": 2, // algorithmes opaques = domination technique → oui
    "q83": 2, // génétique = prudence
    "q84": 2, // réseaux sociaux → plutôt critique
    "q85": 2, // automatisation = armée industrielle de réserve
    "q86": 2, // réguler technologie → oui
    "q87": 3, // numérique participatif → neutre
    "q88": 5, // développement « sans entrave » → non
    "q93": 2, // génétique = éviter maladies → oui
    "q95": 4, // exploration spatiale = luxe bourgeois
    "q96": 2  // science > tradition → oui
  }
}
,
{
  id: "hitler_1933_39",
  name: "Adolf Hitler (régime nazi)",
  description: "Dictature national-socialiste (Allemagne, années 1930)",
  color: "#424242",
  isReference: true,
  answers: {
    // Modèle de propriété : capitalisme autoritaire, propriété privée conservée mais contrôlée
    "q1": 5, // pouvoir des salariés → rejet
    "q2": 1, // grandes propriétés privées → plutôt accepté
    "q3": 1, // propriété privée comme moteur → plutôt d’accord
    "q4": 5, // réquisition immeubles par la mairie → rejet (hors logique raciale/étatique)
    "q5": 1, // remettre en cause la propriété = menace liberté → plutôt d’accord

    // Rôle de l’État dans l’économie : étatisme autoritaire + grandes entreprises privées
    "q6": 2, // concurrence plutôt qu’entreprise d’État → assez favorable à l’économie de marché encadrée
    "q7": 2, // contrôle des prix en crise → interventionnisme autoritaire oui
    "q8": 4, // santé/école privées → plutôt pas d’accord, État très présent/idéologique
    "q9": 1, // liberté de fixer des rémunérations très inégales → plutôt d’accord
    "q10": 4, // casser les grands groupes → plutôt pas d’accord (proximité avec grands cartels)
    "q11": 1, // investissement public massif dans énergie/agri → oui (autarcie, réarmement)
    "q97": 3, // accessibilité bâtiments anciens → anachronique → neutre

    // Finalité de l’activité économique : nationalisme + hiérarchie des fortunes
    "q12": 5, // milliardaires = exploitation → rejet (anticommunisme)
    "q13": 1, // aucune limite à la richesse “honnête” → plutôt d’accord
    "q14": 1, // argent comme moteur d’innovation → plutôt d’accord
    "q15": 1, // prendre des risques mérite enrichissement → plutôt d’accord
    "q16": 4, // entreprise d’abord au service des gens pas des propriétaires → plutôt pas d’accord (priorité à la nation et aux élites économiques alliées)

    // Sens et fonction du travail : culte du travail, sacrifice pour la nation
    "q17": 5, // travailler moins même si économie ralentit → non
    "q18": 3, // mieux payer soignant/nettoyeur qu’un trader → pas dans ses catégories → neutre
    "q19": 1, // fierté du travail dur/mal payé → oui (valorisation de l’ouvrier dévoué)
    "q20": 2, // respect pour l’effort plus que pour la richesse → plutôt d’accord (mais hiérarchie maintenue)
    "q21": 1, // travail comme sens de la vie → oui (discipline, devoir)

    // Organisation du pouvoir : autoritarisme total
    "q22": 6, // autorité critiquable/remplaçable → rejet total
    "q23": 0, // autorité centrale forte en crise → tout à fait d’accord
    "q24": 6, // concentration du pouvoir menace l’intérêt collectif → rejet
    "q25": 0, // mieux appliquer la loi même imparfaite → tout à fait d’accord
    "q26": 0, // groupe sans règles s’enlise → accord fort
    "q27": 0, // école doit apprendre à respecter des règles même injustes → accord fort

    // Forme de démocratie : culte du chef, anti-parlementaire
    "q28": 0, // élu gouverne sans consulter → accord fort (Führerprinzip)
    "q29": 5, // lois majeures au vote direct des citoyens → rejet
    "q30": 5, // élus doivent suivre la majorité → rejet (primat du chef)
    "q31": 5, // limiter démocratie au vote affaiblit les citoyens → rejet (il préfère encore moins de démocratie)
    "q32": 1, // démocratie directe = minorités militantes → plutôt d’accord
    "q33": 0, // décisions par élite instruite plutôt que majorité ignorante → tout à fait d’accord
    "q34": 0, // bon dirigeant doit parfois ignorer la population → tout à fait d’accord

    // Rapport au changement social : ordre, discipline, anti-grèves
    "q35": 6, // interdire grèves sauvages = empêcher luttes décisives → rejet complet (il interdit ces luttes)
    "q36": 4, // tant que grandes institutions restent, pas de vrai changement → plutôt pas d’accord, il croit à la “révolution nationale”
    "q37": 1, // changement lent et légal plus durable → plutôt d’accord une fois au pouvoir
    "q38": 2, // éducation/propagande plutôt que mouvements de rue → plutôt d’accord (propagande massive)
    "q39": 0, // société stable = ordre et discipline → tout à fait d’accord
    "q40": 2, // changer radicalement le modèle face aux crises → il l’a prôné, mais par la nation et la guerre (plutôt d’accord)

    // Vision du progrès sociétal : conservatisme extrême, raciste et patriarcal
    "q41": 0, // “excuser les incivilités” fragilise la cohésion → tout à fait d’accord
    "q42": 0, // supprimer repères famille/religion/nation = dangereux → tout à fait d’accord
    "q43": 0, // enfant a besoin d’un père et d’une mère → tout à fait d’accord
    "q44": 6, // rendre visibles les différences pour lutter contre discriminations → rejet total (idéologie raciste hiérarchisante)
    "q45": 6, // abandonner une norme qui empêche certains d’être reconnus → rejet
    "q46": 6, // rôles masculins/féminins = constructions à déconstruire → rejet complet
    "q47": 6, // priorité à une personne “issue de la diversité” → rejet
    "q48": 1, // “beaucoup se cachent derrière leur couleur de peau” → plutôt d’accord dans sa rhétorique raciste
    "q90": 6, // élevage/expérimentation animale = barbarie → rejet (utilisation massive d’animaux)
    "q92": 6, // liberté totale pour LGBTQ+ → rejet total
    "q99": 6, // actions spécifiques pour égalité femmes/hommes → rejet

    // Échelle de souveraineté : nationalisme extrême, expansionniste
    "q49": 6, // frontières absurdes → rejet
    "q50": 0, // migrants profitent du système → tout à fait d’accord (rhétorique xénophobe)
    "q51": 0, // accords internationaux < volonté du peuple/nation → tout à fait d’accord
    "q52": 0, // priorité aux pauvres nationaux d’abord → tout à fait d’accord
    "q53": 4, // refuser d’aider un peuple en danger = lâcheté → plutôt pas d’accord, sauf si intérêt national direct
    "q54": 6, // autorité mondiale imposant des règles aux États → rejet complet
    "q91": 6, // UE construction souhaitable → rejet (anachronique mais clairement anti-supranational)

    // Place du religieux : instrumentalisation de la religion au service de l’État
    "q55": 5, // État ne doit jamais valoriser une religion → plutôt pas d’accord (religion instrumentalisée)
    "q56": 4, // lois inspirées d’interdits religieux = dangereux → plutôt pas d’accord
    "q57": 1, // société sans spiritualité → décadence → plutôt d’accord
    "q58": 5, // méfiance générale envers les religions parce qu’elles freinent les droits → plutôt pas d’accord (il vise certaines, pas le principe)
    "q59": 1, // absence de repères religieux = décadence → plutôt d’accord
    "q60": 2, // religions peuvent jouer un rôle positif dans le lien social → plutôt d’accord si subordonnées à l’État

    // Objectif du système judiciaire : pénalisme répressif extrême
    "q61": 0, // peines plus sévères → tout à fait d’accord
    "q62": 0, // sentiment d’impunité cause majeure de violence → tout à fait d’accord
    "q63": 0, // certains crimes sans remise de peine → tout à fait d’accord
    "q64": 6, // procès juste même sans punition sévère → rejet
    "q65": 6, // système qui ne réinsère pas échoue → rejet
    "q66": 0, // violeur récidiviste enfermé à vie → tout à fait d’accord
    "q67": 6, // prison fabrique des monstres → rejet
    "q68": 6, // sanctions alternatives comme norme → rejet
    "q98": 5, // mêmes peines pour cruauté animale que pour humain → plutôt pas d’accord

    // Modèle écologique : productivisme national, priorité à industrie et armée
    "q69": 5, // réduire consommation/déplacements → plutôt pas d’accord
    "q70": 0, // freiner technologies/industrie au nom de l’écologie menace l’économie → tout à fait d’accord
    "q71": 4, // capitalisme vert est une illusion → plutôt pas d’accord (il veut surtout puissance industrielle)
    "q72": 2, // éco-anxiété = luxe de privilégiés → plutôt d’accord
    "q73": 2, // taxes écologiques créent rejet chez ceux qui n’ont pas le choix → plutôt d’accord si ça touche classes moyennes/ouvrières
    "q74": 1, // on a toujours trouvé des solutions par le progrès → plutôt d’accord
    "q89": 2, // nucléaire d’avenir → plutôt d’accord si on transpose (industrie lourde, puissance énergétique)

    // Liberté vs sécurité : sécuritarisme total, surveillance et répression
    "q75": 0, // surveillance des communications indispensable → tout à fait d’accord
    "q76a": 5, // droit d’insulter/choquer → pas d’accord (répression de la critique)
    "q76b": 0, // limiter fausses infos pour protéger la société → tout à fait d’accord (censure)
    "q77": 0, // contrôles d’identité renforcés → tout à fait d’accord
    "q78": 0, // police utilisant la force plus librement → tout à fait d’accord
    "q79": 0, // vidéosurveillance comme dissuasion → tout à fait d’accord
    "q80": 0, // état d’urgence suspendant libertés → tout à fait d’accord

    // Progrès technologique et enjeux sociaux : techno-autoritarisme (militaire et industriel)
    "q81": 4, // technologies détruisent plus d’emplois → plutôt pas d’accord (il les voit comme outils de puissance)
    "q82": 4, // IA/algorithmes trop opaques pour faire confiance → plutôt pas d’accord, confiance dans la technique au service de l’État
    "q83": 1, // modifier génétiquement l’humain pose problèmes éthiques → dans sa logique eugéniste, il serait plutôt favorable aux manipulations → donc “plutôt pas d’accord” avec la prudence → 1
    "q84": 4, // réseaux sociaux affaiblissent débat démocratique → anachronique, mais il aurait utilisé ces outils → plutôt pas d’accord
    "q85": 3, // automatisation = chômage massif → neutre (il s’en soucie peu, main-d’œuvre exploitée)
    "q86": 3, // réguler strictement la technologie pour éviter dérives → neutre (il veut la contrôler politiquement, pas moralement)
    "q87": 2, // innovations numériques rendent la société plus connectée → plutôt d’accord si au service de la propagande
    "q88": 1, // développer sans entrave les technologies émergentes pour rester compétitifs → plutôt d’accord
    "q93": 0, // éviter la naissance d’enfants avec maladies graves via génétique → tout à fait d’accord (eugénisme)
    "q95": 2, // exploration spatiale pour défis à long terme → plutôt d’accord si puissance nationale
    "q96": 3  // science > croyances pour décider → neutre (mélange pseudo-science / idéologie raciale / irrationnel)
  }
},
{
  id: "staline_1930_53",
  name: "Joseph Staline (URSS stalinienne)",
  description: "Dictature totalitaire communiste (URSS industrielle, 1930–1953)",
  color: "#8B0000",
  isReference: true,
  answers: {
    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 0, // salariés décident + partagent → il impose contrôle total d'État
    "q2": 0, // accumulation de logements → propriété privée abolie → tout à fait d'accord
    "q3": 6, // propriété privée moteur de progrès → rejet total
    "q4": 0, // réquisition immeubles vides → oui
    "q5": 6, // sacralisation du droit de propriété → rejet total

    // État & économie : planification totale, étatisation
    "q6": 6, // concurrence > monopole d'État → rejet total
    "q7": 0, // contrôle des prix → oui (planification)
    "q8": 6, // confier santé/école au privé → rejet total
    "q9": 6, // liberté absolue des hauts salaires → rejet
    "q10": 0, // casser grandes entreprises privées → oui (tout nationalisé)
    "q11": 0, // investissements massifs publics → oui
    "q97": 3, // accessibilité handicap → anachronique → neutre

    // Activité économique
    "q12": 0, // milliardaires = exploitation → oui
    "q13": 6, // aucune limite à richesse → rejet
    "q14": 4, // profit moteur innovation → plutôt pas d’accord
    "q15": 6, // enrichissement par risque → rejet
    "q16": 0, // entreprise au service des besoins collectifs → oui

    // --- TRAVAIL ---
    "q17": 6, // travailler moins → rejet (stakhanovisme)
    "q18": 2, // valoriser soin/nettoyage → plutôt oui (ouvriérisme)
    "q19": 0, // fierté du travail dur/mal payé → oui
    "q20": 2, // admirer effort plus que richesse → plutôt oui
    "q21": 0, // travail comme sens de la vie → oui (idéologie productiviste)

    // --- POUVOIR & AUTORITARISME ---
    "q22": 6, // autorité critiquable → rejet
    "q23": 0, // autorité centrale forte → accord total
    "q24": 6, // concentration pouvoir = menace → rejet
    "q25": 0, // mieux appliquer loi même imparfaite → oui (justice politique)
    "q26": 0, // groupe sans règles = chaos → oui
    "q27": 0, // école doit apprendre à obéir → oui

    // --- DÉMOCRATIE ---
    "q28": 0, // élu gouverne sans consulter → oui
    "q29": 6, // référendums → rejet (centralisme)
    "q30": 6, // élus suivent majorité → rejet
    "q31": 6, // participation citoyenne = essentiel → rejet
    "q32": 2, // démocratie directe → plutôt pas
    "q33": 0, // élite dirigeante > masse → oui (nomenklatura)
    "q34": 0, // dirigeant ignore population → oui

    // --- CHANGEMENT SOCIAL ---
    "q35": 6, // grèves sauvages → interdites → rejet total
    "q36": 0, // institutions doivent changer radicalement → oui (révolution)
    "q37": 6, // réformes lentes suffisent → rejet
    "q38": 0, // éducation/propagande plutôt que contestation → oui
    "q39": 0, // ordre et discipline = stabilité → oui
    "q40": 0, // changement radical modèle → oui (Révolution + industrialisation forcée)

    // --- SOCIÉTÉ & VALEURS ---
    "q41": 1, // discours sur incivilités/autorité → assez d’accord (discipline)
    "q42": 1, // préserver famille/nation → plutôt oui (conservatisme social soviétique)
    "q43": 1, // père + mère nécessaires → plutôt oui
    "q44": 6, // valoriser minorités discriminées → rejet (anti-individualisme)
    "q45": 6, // abandonner normes excluantes → rejet
    "q46": 6, // rôles genrés = construits socialement → rejet (conservateur)
    "q47": 6, // discrimination positive → rejet fort
    "q48": 2, // “se cacher derrière sa couleur” → plutôt d’accord (idéologie “aveugle à la race”)
    "q90": 6, // abolition exploitation animale → rejet
    "q92": 6, // liberté LGBTQ+ → rejet
    "q99": 6, // actions égalité femmes/hommes → rejet (officiellement égalité, mais conservatisme réel)

    // --- SOUVERAINETÉ & INTERNATIONAL ---
    "q49": 4, // frontières = absurdes → plutôt pas (État fort centralisé)
    "q50": 4, // migrants profitent du système → plutôt pas (enjeu marginal)
    "q51": 0, // accords internationaux < souveraineté → oui
    "q52": 2, // priorité pauvres nationaux → oui (mais rhétorique internationaliste)
    "q53": 6, // refuser aider peuple en danger = lâcheté → rejet (interventions calculées)
    "q54": 6, // autorité mondiale au-dessus des États → rejet
    "q91": 6, // UE → rejet anachronique

    // --- RELIGION ---
    "q55": 0, // pas de financement public religions → oui
    "q56": 0, // lois inspirées religion = danger → oui
    "q57": 6, // société sans spiritualité = décadence → rejet
    "q58": 0, // méfiance envers religions car freins sociaux → oui
    "q59": 6, // absence repères religieux = décadence → rejet
    "q60": 4, // religions jouent rôle positif → plutôt pas

    // --- JUSTICE & RÉPRESSION ---
    "q61": 0, // peines plus sévères → oui (répression massive)
    "q62": 0, // impunité cause violence → oui (logique punitive)
    "q63": 0, // peines incompressibles → oui
    "q64": 6, // justice restaurative → rejet
    "q65": 6, // réinsertion priorité → rejet
    "q66": 0, // enfermer à vie → oui
    "q67": 6, // prison fabrique monstres → rejet
    "q68": 6, // sanctions alternatives → rejet
    "q98": 4, // cruauté animale aussi grave qu’humain → plutôt pas

    // --- ÉCOLOGIE ---
    "q69": 6, // réduire consommation/déplacements → rejet (productivisme)
    "q70": 0, // frein écologie = menace économie → oui
    "q71": 3, // capitalisme vert illusoire → neutre
    "q72": 2, // éco-anxiété luxe → plutôt oui
    "q73": 3, // taxes écologiques injustes → neutre
    "q74": 1, // solution = progrès technologique → plutôt oui
    "q89": 3, // nucléaire → neutre (anachronique)

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 0, // surveillance masse → oui
    "q76a": 6, // liberté d’insulter/choquer → rejet
    "q76b": 0, // limiter fausses infos = protéger → oui
    "q77": 0, // contrôles d'identité → oui
    "q78": 0, // police plus libre d'utiliser force → oui
    "q79": 0, // vidéosurveillance → oui
    "q80": 0, // état d’urgence suspendant libertés → oui

    // --- TECHNO / PROGRÈS ---
    "q81": 4, // technologies détruisent emplois → plutôt pas (priorité productiviste)
    "q82": 6, // méfiance envers algorithmes opaques → rejet (État seul décide)
    "q83": 3, // modification génétique → neutre (pas conceptuellement important)
    "q84": 3, // réseaux sociaux affaiblissent débat → neutre
    "q85": 3, // automatisation = chômage massif → neutre
    "q86": 2, // réguler technologie → plutôt oui (contrôle étatique)
    "q87": 2, // innovations numériques = société plus connectée → plutôt d’accord si contrôlé
    "q88": 1, // technologies émergentes sans entrave → plutôt d’accord si au service du plan
    "q93": 2, // éviter maladies via génétique → plutôt oui
    "q95": 2, // exploration spatiale → plutôt oui (prestige national)
    "q96": 1  // science > traditions → plutôt d’accord (marxisme-léninisme)
  }
},
{
  id: "bardella_2027",
  name: "Jordan Bardella (2027)",
  description: "National-conservateur, souverainiste, sécurité et identité, économie libérale modérée",
  color: "#003366",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ / ÉCONOMIE ---
    "q1": 5,  // salariés décident + partagent → plutôt contre
    "q2": 4,  // accumulation de logements → plutôt pas d’accord (anti-rente modérée)
    "q3": 1,  // propriété privée moteur → plutôt oui
    "q4": 5,  // réquisition logements vides → non
    "q5": 1,  // propriété = liberté → plutôt oui

    // État / économie : libéral mais intervention étatique ciblée
    "q6": 2,  // concurrence > monopolisation Etat → plutôt oui
    "q7": 2,  // contrôle des prix en crise → plutôt oui (mesures ponctuelles)
    "q8": 4,  // santé/école au privé → plutôt pas
    "q9": 2,  // liberté des hauts salaires → plutôt oui
    "q10": 4, // casser grands groupes → plutôt non
    "q11": 1, // investissements publics stratégiques → oui
    "q97": 3, // accessibilité bâtiments → neutre

    // Finalité de l'économie
    "q12": 5, // milliardaires = exploitation → non
    "q13": 2, // aucune limite à la richesse → plutôt oui
    "q14": 2, // argent moteur innovation → plutôt oui
    "q15": 2, // mérite entrepreneurial → plutôt oui
    "q16": 4, // entreprise doit servir besoins collectifs → plutôt non

    // --- TRAVAIL ---
    "q17": 4, // travailler moins → plutôt non
    "q18": 2, // valoriser soin/nettoyage → plutôt oui
    "q19": 1, // fierté du travail dur/mal payé → plutôt oui
    "q20": 2, // effort > richesse → plutôt oui
    "q21": 2, // travail = sens → plutôt oui

    // --- AUTORITÉ & ORDRE ---
    "q22": 4, // autorité critiquable/remplaçable → plutôt pas
    "q23": 1, // autorité centrale forte → oui
    "q24": 4, // concentration pouvoir dangereuse → plutôt pas
    "q25": 1, // appliquer la loi même imparfaite → oui
    "q26": 1, // groupe sans règles → oui
    "q27": 1, // école doit apprendre discipline → oui

    // --- DÉMOCRATIE ---
    "q28": 3, // élus gouvernant seuls → neutre/équilibré
    "q29": 2, // référendums fréquents → plutôt oui (référendum sur immigration)
    "q30": 2, // élus suivent majorité → plutôt oui
    "q31": 4, // limiter démocratie à élections affaiblit → plutôt pas
    "q32": 2, // démocratie directe = minorités → plutôt oui
    "q33": 3, // élite vs masse → neutre
    "q34": 4, // ignorer volonté du peuple pour long terme → plutôt non

    // --- CHANGEMENT SOCIÉTAL ---
    "q35": 5, // grèves sauvages → plutôt contre
    "q36": 4, // institutions inchangées = immobilisme → plutôt pas
    "q37": 1, // changement lent > rupture → oui
    "q38": 3, // éducation plus que mouvements de rue → neutre
    "q39": 1, // stabilité = ordre et discipline → oui
    "q40": 4, // changement radical modèle → plutôt pas

    // --- VALEURS SOCIALES / CULTURE ---
    "q41": 1, // relativisme des règles → plutôt d’accord avec critique
    "q42": 1, // famille/religion/nation → plutôt oui
    "q43": 1, // père + mère → plutôt oui
    "q44": 5, // visibiliser différence pour lutter discriminations → non
    "q45": 4, // abandon normes excluantes → plutôt non
    "q46": 5, // rôles genrés sociaux → plutôt non
    "q47": 6, // discriminations positives → rejet total
    "q48": 1, // “se cacher derrière sa couleur” → plutôt d’accord
    "q90": 5, // abolition exploitation animale → non
    "q92": 4, // libertés LGBTQ+ → plutôt pas
    "q99": 4, // politiques pro-égalité femmes/hommes → plutôt sceptique

    // --- IMMIGRATION / SOUVERAINETÉ ---
    "q49": 6, // frontières absurdes → rejet total
    "q50": 0, // migrants profitent du système → accord fort (rhétorique RN)
    "q51": 1, // accords internationaux < peuple national → oui
    "q52": 0, // priorité pauvres nationaux → accord fort
    "q53": 4, // refuser aider peuple en danger = lâcheté → plutôt non
    "q54": 6, // autorité mondiale au-dessus des États → rejet total
    "q91": 5, // UE au centre des décisions → plutôt non (souveraineté nationale)

    // --- RELIGION ---
    "q55": 2, // pas de financement public religions → plutôt oui
    "q56": 2, // lois inspirées religion = danger → plutôt oui
    "q57": 3, // société sans spiritualité = décadence → neutre
    "q58": 3, // méfiance envers religion en général → neutre
    "q59": 4, // absence repères religieux = décadence → plutôt non
    "q60": 1, // religions peuvent renforcer cohésion → plutôt oui

    // --- JUSTICE / SÉCURITÉ ---
    "q61": 0, // peines plus sévères → oui
    "q62": 0, // impunité cause violence → oui
    "q63": 0, // peines incompressibles pour crimes graves → oui
    "q64": 5, // justice restaurative → plutôt non
    "q65": 5, // priorité réinsertion → non
    "q66": 0, // enfermer violeurs récidivistes à vie → oui
    "q67": 6, // prison fabrique monstres → rejet
    "q68": 5, // alternatives à prison → non
    "q98": 3, // peines cruauté animale → neutre/mi-sévère

    // --- ÉCOLOGIE ---
    "q69": 4, // réduire consommation → plutôt non
    "q70": 0, // écologie punitive menace économie → très d’accord
    "q71": 4, // capitalisme vert illusion → plutôt non
    "q72": 2, // éco-anxiété luxe → plutôt oui
    "q73": 1, // taxes injustes pour travailleurs → d’accord
    "q74": 1, // progrès technologique résout problèmes → plutôt oui
    "q89": 2, // nucléaire = avenir → oui

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 2, // surveillance des communications → plutôt oui modéré
    "q76a": 2, // liberté d’expression choquante → plutôt oui
    "q76b": 4, // limiter fake news par censure → plutôt non
    "q77": 1, // contrôles d’identité renforcés → oui
    "q78": 1, // plus de marge pour police → oui
    "q79": 1, // vidéosurveillance → oui
    "q80": 3, // état d’urgence → neutre / technique

    // --- TECH / FUTUR ---
    "q81": 3, // technologies détruisent emplois → neutre
    "q82": 3, // méfiance IA opaque → neutre
    "q83": 3, // manipulations génétiques → neutre
    "q84": 3, // réseaux sociaux dégradent débat → neutre
    "q85": 3, // automatisation → neutre
    "q86": 3, // réguler technologie → neutre
    "q87": 3, // numérique rend société plus connectée → neutre-positif
    "q88": 1, // tech sans entrave → plutôt oui si souveraineté respectée
    "q93": 2, // génétique pour éviter maladies → plutôt oui
    "q95": 3, // exploration spatiale → neutre
    "q96": 2  // science > traditions → plutôt oui
  }
},
{
  id: "melenchon_2027",
  name: "Jean-Luc Mélenchon (2027)",
  description: "Écosocialiste, démocratie populaire, redistribution, transition écologique radicale",
  color: "#A60000",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 0,  // salariés décident + partagent → oui
    "q2": 1,  // accumulation de logements/airbnb → plutôt contre
    "q3": 6,  // propriété privée = moteur → rejet
    "q4": 0,  // réquisition immeubles vides → oui
    "q5": 6,  // propriété = liberté → plutôt non

    // État / économie : étatisme, planification écologique
    "q6": 5,  // concurrence > monopolisation État → plutôt non
    "q7": 0,  // contrôle des prix → oui
    "q8": 6,  // confier santé/école au privé → non
    "q9": 5,  // libertés des très hauts salaires → plutôt non
    "q10": 0, // casser les grands groupes → oui
    "q11": 0, // investissements publics massifs → oui
    "q97": 2, // accessibilité bâtiments → plutôt oui

    // Finalité de l’économie
    "q12": 1,  // milliardaires = exploitation → oui
    "q13": 6,  // aucune limite à la richesse → non
    "q14": 4,  // argent moteur → plutôt non
    "q15": 5,  // enrichissement entrepreneurial → plutôt non
    "q16": 0,  // entreprise doit servir besoins collectifs → oui

    // --- TRAVAIL ---
    "q17": 0,  // travailler moins → 32h → oui
    "q18": 1,  // valoriser soins/nettoyage → oui
    "q19": 4,  // fierté travail dur mal payé → plutôt non
    "q20": 2,  // effort > richesse → plutôt oui
    "q21": 4,  // travail comme sens → plutôt non (émancipation plus large)

    // --- AUTORITÉ & ORDRE ---
    "q22": 1,  // autorité critiquable/remplaçable → oui
    "q23": 5,  // autorité centrale forte → plutôt non (anti-présidentialisme)
    "q24": 1,  // concentration pouvoir = danger → oui
    "q25": 4,  // appliquer loi même imparfaite → plutôt non
    "q26": 2,  // règles nécessaires → plutôt oui
    "q27": 4,  // école doit apprendre obéissance → plutôt non

    // --- DÉMOCRATIE ---
    "q28": 5,  // élu gouverne sans consulter → non
    "q29": 0,  // référendums d’initiative citoyenne → oui
    "q30": 1,  // élus suivent volonté majoritaire → plutôt oui
    "q31": 0,  // démocratie participative = essentielle → oui
    "q32": 5,  // démocratie directe = prise en otage par minorités → non
    "q33": 5,  // élites > masse → non
    "q34": 6,  // ignorer opinion pour long terme → non

    // --- CHANGEMENT SOCIAL ---
    "q35": 1,  // grèves/occupations → plutôt oui comme outil
    "q36": 2,  // changer institutions pour vrai changement → plutôt oui
    "q37": 4,  // changement lent > rupture → plutôt non
    "q38": 1,  // convaincre/éduquer → oui
    "q39": 5,  // stabilité via ordre → plutôt non
    "q40": 1,  // changement radical modèle → oui (planification écologique)

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 4,  // punir incivilités vs comprendre causes sociales → plutôt non
    "q42": 5,  // défendre famille traditionnelle/religion/nation → plutôt non
    "q43": 5,  // père+mère obligatoire → non
    "q44": 1,  // rendre visibles discriminations → oui
    "q45": 1,  // abandon normes excluantes → oui
    "q46": 1,  // genre = construction sociale → oui
    "q47": 1,  // discrimination positive → plutôt oui
    "q48": 5,  // “on se cache derrière couleur de peau” → non
    "q90": 2,  // cause animale → plutôt oui
    "q92": 1,  // liberté totale LGBTQ+ → oui
    "q99": 1,  // actions fortes égalité femmes/hommes → oui

    // --- SOUVERAINETÉ & INTERNATIONAL ---
    "q49": 2,  // frontières absurdes → plutôt oui (internationalisme)
    "q50": 6,  // migrants "profitent du système" → non
    "q51": 3,  // accords internationaux < volonté du peuple → neutre (mais anti-UE libérale)
    "q52": 4,  // priorité pauvres nationaux → plutôt non
    "q53": 2,  // solidarité internationale → oui
    "q54": 4,  // autorité mondiale → plutôt non mais pas par nationalisme
    "q91": 4,  // UE → plutôt contre l’UE actuelle

    // --- RELIGION ---
    "q55": 1,  // pas de financement religion → oui
    "q56": 1,  // lois inspirées religion = danger → oui
    "q57": 4,  // société sans spiritualité = décadence → non
    "q58": 2,  // méfiance envers religions → plutôt oui si elles s'imposent
    "q59": 5,  // absence repères religieux = décadence → non
    "q60": 2,  // rôle social des religions → plutôt oui si pacifique

    // --- JUSTICE ---
    "q61": 4,  // peines plus sévères → plutôt non
    "q62": 3,  // impunité cause violence → neutre
    "q63": 5,  // peines incompressibles → non
    "q64": 1,  // justice restaurative → oui
    "q65": 1,  // réinsertion → oui
    "q66": 4,  // enfermer à vie → plutôt non
    "q67": 1,  // prison fabrique récidive → oui
    "q68": 2,  // alternatives → plutôt oui
    "q98": 2,  // protection animaux → plutôt oui

    // --- ÉCOLOGIE ---
    "q69": 1,  // réduire consommation/transport → oui
    "q70": 6,  // écologie ≠ menace économie → rejet (écologie = industrie nouvelle)
    "q71": 1,  // capitalisme vert illusion → oui
    "q72": 4,  // éco-anxiété luxe de privilégiés → non
    "q73": 1,  // taxes injustes si mal conçues → oui
    "q74": 4,  // progrès techno résout tout → plutôt non
    "q89": 6,  // nucléaire d’avenir → non (sortie progressive)

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 5,  // surveillance → plutôt non
    "q76a": 1, // liberté d’expression large → oui
    "q76b": 4, // censurer fake news → plutôt non
    "q77": 5,  // contrôles d’identité renforcés → non
    "q78": 5,  // plus de force policière → non
    "q79": 4,  // vidéosurveillance généralisée → plutôt non
    "q80": 5,  // état d’urgence → non

    // --- TECH / FUTUR ---
    "q81": 3,  // technologies détruisent emplois → neutre
    "q82": 2,  // méfiance IA opaque → plutôt oui
    "q83": 2,  // modification génétique → plutôt oui avec régulation
    "q84": 3,  // réseaux sociaux dégradent débat → neutre
    "q85": 2,  // automatisation et chômage → plutôt oui
    "q86": 1,  // régulation stricte technologies → oui
    "q87": 2,  // numérique participatif → plutôt oui
    "q88": 5,  // tech sans entraves → non
    "q93": 1,  // génétique pour éviter maladies → oui
    "q95": 3,  // exploration spatiale → neutre (pas priorité)
    "q96": 1   // science > tradition pour décisions publiques → oui
  }
},
{
  id: "macron_2018",
  name: "Emmanuel Macron (2018)",
  description: "Centre gauche réformiste, pro-européen, social-libéral, progressiste et technocrate",
  color: "#FFD700",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 4,  // salariés décident + partagent → plutôt non (management participatif limité)
    "q2": 3,  // accumulation logement → neutre (régulation Airbnb modérée)
    "q3": 1,  // propriété privée moteur → oui
    "q4": 5,  // réquisition logements vides → non
    "q5": 1,  // propriété = liberté → plutôt oui

    // État / économie : social-libéralisme
    "q6": 2,  // concurrence > monopole public → plutôt oui
    "q7": 2,  // contrôle des prix ponctuel → plutôt oui
    "q8": 4,  // privatiser santé/école → plutôt non
    "q9": 2,  // liberté hauts salaires → plutôt oui
    "q10": 5, // casser grands groupes → plutôt non
    "q11": 1, // investissement public (transition, innovation) → oui
    "q97": 2, // accessibilité bâtiments → plutôt oui

    // Finalité économie
    "q12": 5, // milliardaires = exploitation → non
    "q13": 2, // aucune limite richesse → plutôt oui (schéma méritocratique)
    "q14": 1, // argent moteur innovation → oui
    "q15": 1, // mérite entrepreneurial → oui
    "q16": 4, // entreprise au service besoin collectif → plutôt non (pas anti-profit)

    // --- TRAVAIL ---
    "q17": 4,  // travailler moins → plutôt non
    "q18": 2,  // valoriser soin/nettoyage → plutôt oui (mais pas révolution salariale)
    "q19": 4,  // fierté travail dur mal payé → plutôt non
    "q20": 3,  // effort > richesse → neutre
    "q21": 2,  // travail comme sens → plutôt oui (valeur travail)

    // --- AUTORITÉ / ÉTAT ---
    "q22": 2,  // autorité critiquable/remplaçable → plutôt oui
    "q23": 2,  // autorité centrale forte → plutôt oui (présidentialisme assumé)
    "q24": 3,  // concentration pouvoir menace → neutre
    "q25": 2,  // appliquer la loi même imparfaite → plutôt oui
    "q26": 2,  // règles nécessaires → plutôt oui
    "q27": 4,  // école = discipline stricte → plutôt non

    // --- DÉMOCRATIE ---
    "q28": 3,  // élu gouverne sans consulter → neutre (verticalité + consultations)
    "q29": 4,  // référendums fréquents → plutôt non
    "q30": 2,  // élus suivent majorité → plutôt oui
    "q31": 3,  // participation citoyenne large → neutre
    "q32": 3,  // démocratie directe = minorités bruyantes → neutre
    "q33": 2,  // élite instruite > masse → plutôt oui (technocratisme)
    "q34": 4,  // ignorer opinion pour long terme → plutôt non (mais parfois)

    // --- CHANGEMENT SOCIAL ---
    "q35": 5,  // grèves sauvages → plutôt contre
    "q36": 3,  // institutions + mentalités → neutre
    "q37": 1,  // changement progressif → oui
    "q38": 2,  // éducation/réformes > rue → plutôt oui
    "q39": 3,  // ordre = stabilité → neutre
    "q40": 5,  // changement radical du modèle → non

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 4,  // incivilités = perte d’autorité → plutôt non (lecture social-libérale)
    "q42": 4,  // conserver famille/religion/nation → plutôt non (progressisme)
    "q43": 4,  // père+mère indispensables → plutôt non
    "q44": 2,  // rendre visibles discriminations → plutôt oui
    "q45": 2,  // abandon normes excluantes → plutôt oui
    "q46": 2,  // genre construction sociale → plutôt oui
    "q47": 3,  // discrimination positive → neutre/équilibré
    "q48": 4,  // “se cacher derrière couleur peau” → plutôt non
    "q90": 4,  // abolition exploitation animale → plutôt non
    "q92": 1,  // droits LGBTQ+ → oui
    "q99": 2,  // actions égalité femmes/hommes → plutôt oui

    // --- IMMIGRATION / SOUVERAINETÉ ---
    "q49": 4, // frontières absurdes → plutôt non
    "q50": 5, // migrants profitent de l’État → non
    "q51": 4, // accords internationaux < peuple → plutôt non
    "q52": 4, // priorité pauvres nationaux → plutôt non
    "q53": 2, // aider peuples en danger → plutôt oui
    "q54": 2, // autorité mondiale (climat) → plutôt oui
    "q91": 1, // UE souhaitable → oui fort

    // --- RELIGION ---
    "q55": 1,  // pas de financement religions → oui
    "q56": 1,  // lois religieuses dangereuses → oui
    "q57": 3,  // absence de spiritualité = décadence → neutre
    "q58": 3,  // méfiance envers religion → neutre
    "q59": 4,  // absence repères religieux = décadence → plutôt non
    "q60": 2,  // rôle social positif → plutôt oui

    // --- JUSTICE / SÉCURITÉ ---
    "q61": 3,  // peines plus sévères → neutre/modéré
    "q62": 3,  // impunité cause violence → neutre
    "q63": 4,  // peines incompressibles → plutôt non
    "q64": 2,  // justice restaurative → plutôt oui
    "q65": 2,  // réinsertion → plutôt oui
    "q66": 4,  // enfermer à vie → plutôt non
    "q67": 3,  // prison fabrique monstres → neutre
    "q68": 2,  // alternatives à prison → plutôt oui
    "q98": 3,  // peine cruauté animale → neutre

    // --- ÉCOLOGIE ---
    "q69": 2,  // réduire consommation → plutôt oui
    "q70": 4,  // écologie = menace économie → plutôt non
    "q71": 4,  // capitalisme vert = illusion → plutôt non
    "q72": 3,  // éco-anxiété = luxe → neutre
    "q73": 3,  // taxes injustes → neutre
    "q74": 1,  // solutions techno → oui
    "q89": 1,  // nucléaire = avenir → oui fort

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 3,  // surveillance communications → neutre (sécurité vs libertés)
    "q76a": 1, // liberté expression large → oui
    "q76b": 3, // réguler fake news → neutre
    "q77": 3,  // contrôles identité → neutre
    "q78": 3,  // plus de force policière → neutre/modéré
    "q79": 3,  // vidéosurveillance → neutre
    "q80": 3,  // état d'urgence → neutre (fin de l’EI mais attentats récents)

    // --- TECHNO / FUTUR ---
    "q81": 3,  // tech détruit emplois → neutre
    "q82": 3,  // IA opaque → neutre
    "q83": 2,  // génétique médicale → plutôt oui
    "q84": 3,  // réseaux sociaux → neutre
    "q85": 3,  // automatisation → neutre
    "q86": 2,  // régulation tech → plutôt oui
    "q87": 1,  // numérique = démocratie participative → oui (grand débat)
    "q88": 2,  // tech sans entraves → plutôt oui
    "q93": 1,  // éviter maladies via génétique → oui
    "q95": 2,  // exploration spatiale → plutôt oui (NewSpace)
    "q96": 1   // science > traditions → oui
  }
},
{
  id: "macron_2026",
  name: "Emmanuel Macron (2026)",
  description: "Centre-droit technocrate, pro-entreprise, sécuritaire, pro-UE et techno-optimiste",
  color: "#DAA520",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 5,  // salariés décident/partagent → plutôt non
    "q2": 3,  // accumulation logements → neutre (lutte Airbnb légère)
    "q3": 1,  // propriété moteur → oui
    "q4": 6,  // réquisition logements vides → non
    "q5": 1,  // propriété = liberté → oui

    // État vs marché : centre-droit pro-business
    "q6": 1,  // concurrence > monopole public → oui
    "q7": 3,  // contrôle prix ponctuel → neutre
    "q8": 5,  // privatiser santé/école → plutôt non mais ouverture gestion privée
    "q9": 1,  // liberté hauts salaires → oui
    "q10": 5, // casser grands groupes → non
    "q11": 1, // investissements publics stratégiques → oui
    "q97": 2, // accessibilité → plutôt oui

    // Finalité économie : compétitivité
    "q12": 6, // milliardaires = exploitation → rejet
    "q13": 2, // aucune limite richesse → plutôt oui
    "q14": 1, // argent = innovation → oui
    "q15": 1, // risque entrepreneurial récompensé → oui
    "q16": 5, // entreprise d’abord sociale → plutôt non

    // --- TRAVAIL ---
    "q17": 5, // réduire temps travail → non
    "q18": 2, // valorisation métiers essentiels → plutôt oui
    "q19": 4, // fierté travail mal payé → plutôt non
    "q20": 3, // effort > richesse → neutre
    "q21": 2, // travail au centre → plutôt oui

    // --- AUTORITÉ ---
    "q22": 4, // autorité critiquable/remplaçable → plutôt non (verticalité)
    "q23": 1, // autorité centrale forte → oui
    "q24": 4, // concentration pouvoir = menace → plutôt non
    "q25": 2, // appliquer la loi même imparfaite → plutôt oui
    "q26": 1, // règles nécessaires → oui
    "q27": 4, // école = discipline stricte → plutôt non

    // --- DÉMOCRATIE ---
    "q28": 2,  // gouverner sans consulter → plutôt oui (verticalité amortie)
    "q29": 5,  // référendums → non (méfiance)
    "q30": 3,  // suivre majorité → neutre
    "q31": 4,  // participation citoyenne large → plutôt non
    "q32": 2,  // démocratie directe = minorités → plutôt oui
    "q33": 2,  // élite instruite > masse → plutôt oui
    "q34": 3,  // ignorer volonté pour long terme → neutre

    // --- CHANGEMENTS SOCIAUX ---
    "q35": 5,  // grèves sauvages → plutôt contre
    "q36": 4,  // institutions inchangées = blocage → plutôt non
    "q37": 1,  // progrès lent → oui
    "q38": 2,  // éducation/réformes > rue → plutôt oui
    "q39": 2,  // société stable = ordre → oui
    "q40": 5,  // changement radical → non

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 2,  // incivilités = problème d’autorité → plutôt oui
    "q42": 3,  // repères traditionnels → neutre
    "q43": 4,  // père+mère indispensables → plutôt non
    "q44": 3,  // rendre visibles discriminations → neutre
    "q45": 3,  // abandon normes excluantes → neutre
    "q46": 2,  // genre construction sociale → plutôt oui
    "q47": 4,  // discrimination positive → plutôt non
    "q48": 4,  // “se cacher derrière couleur peau” → plutôt non
    "q90": 4,  // abolition exploitation animale → plutôt non
    "q92": 2,  // libertés LGBTQ+ → oui
    "q99": 2,  // actions égalité femmes/hommes → plutôt oui

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 5, // frontières absurdes → plutôt non
    "q50": 2, // migrants profitent système → plutôt oui (virage 2023-2025)
    "q51": 3, // accords internationaux < peuple → neutre
    "q52": 2, // priorité pauvres nationaux → plutôt oui
    "q53": 3, // aider peuples en danger → neutre
    "q54": 2, // autorité mondiale pour enjeux → plutôt oui
    "q91": 1, // UE centrale → oui fort

    // --- RELIGION ---
    "q55": 1, // pas de financement religion → oui
    "q56": 1, // lois religieuses = danger → oui
    "q57": 3, // absence spiritualité = décadence → neutre
    "q58": 3, // méfiance envers religions → neutre
    "q59": 4, // absence repères religieux = problème → plutôt non
    "q60": 2, // religion = lien social parfois positif → plutôt oui

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 2,  // peines plus sévères → plutôt oui modéré
    "q62": 2,  // impunité = cause violence → plutôt oui
    "q63": 4,  // peines incompressibles → plutôt non
    "q64": 4,  // justice restaurative → plutôt non
    "q65": 3,  // réinsertion → neutre
    "q66": 2,  // peine perpétuelle pour crimes graves → plutôt oui
    "q67": 4,  // “prison fabrique monstres” → plutôt non
    "q68": 4,  // alternatives à prison → plutôt non
    "q98": 3,  // cruauté animale → neutre

    // --- ÉCOLOGIE ---
    "q69": 3,  // sobriété → neutre (pas punitive)
    "q70": 1,  // écologie punitive = menace → oui
    "q71": 3,  // capitalisme vert = illusion → neutre
    "q72": 2,  // éco-anxiété luxe → plutôt oui
    "q73": 3,  // taxes écologiques injustes → neutre
    "q74": 0,  // progrès technologique > sobriété → oui fort
    "q89": 1,  // nucléaire = avenir → oui fort

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 2, // surveillance numérique → plutôt oui
    "q76a": 2, // liberté expression large → plutôt oui
    "q76b": 3, // censure fake news → neutre
    "q77": 2, // contrôles identité renforcés → plutôt oui
    "q78": 2, // pouvoir police → plutôt oui
    "q79": 2, // vidéosurveillance → plutôt oui
    "q80": 3, // état d’urgence → neutre

    // --- TECHNOLOGIES & FUTUR ---
    "q81": 3, // tech détruit emplois → neutre
    "q82": 3, // méfiance IA opaque → neutre
    "q83": 2, // génétique médicale → plutôt oui
    "q84": 3, // réseaux sociaux = problème → neutre
    "q85": 3, // automatisation → neutre
    "q86": 3, // réguler technologie → neutre
    "q87": 1, // numérique modernise démocratie → oui
    "q88": 1, // tech sans entraves → oui (innovation first)
    "q93": 1, // génétique pour éviter maladies → oui
    "q95": 1, // exploration spatiale → oui
    "q96": 1  // science > tradition → oui fort
  }
},
{
  id: "zemmour_2027",
  name: "Éric Zemmour (2027)",
  description: "Nationaliste identitaire, conservateur radical, anti-immigration, libéral sur l’économie, régalien dur",
  color: "#222222",
  isReference: true,
  answers: {

    // --- PROPRIÉTÉ & ÉCONOMIE ---
    "q1": 6,  // salariés décident + partagent → non
    "q2": 3,  // accumulation logements → neutre (libéralisation foncière modérée)
    "q3": 1,  // propriété moteur → oui
    "q4": 6,  // réquisition logements vides → non
    "q5": 1,  // propriété = liberté → oui

    // État / marché : libéralisme à la Sarkozy + État régalien
    "q6": 1,  // concurrence > entreprises publiques → oui
    "q7": 4,  // contrôle des prix → plutôt non
    "q8": 4,  // santé/école au privé → plutôt non mais pas hostile
    "q9": 1,  // hauts salaires → oui
    "q10": 5, // casser les grands groupes → non
    "q11": 2, // investissements publics stratégiques → plutôt oui (armée)
    "q97": 3, // accessibilité handicap → neutre

    // Finalité économie
    "q12": 6, // milliardaires = exploitation → rejet total
    "q13": 2, // aucune limite richesse → plutôt oui
    "q14": 1, // argent moteur innovation → oui
    "q15": 1, // mérite entrepreneurial → oui
    "q16": 5, // entreprise doit servir collectivité → plutôt non

    // --- TRAVAIL ---
    "q17": 5, // réduire temps travail → non
    "q18": 3, // revaloriser métiers du soin → neutre
    "q19": 1, // fierté du travail dur → oui
    "q20": 2, // respect effort → plutôt oui
    "q21": 2, // travail comme sens → plutôt oui

    // --- AUTORITÉ ---
    "q22": 5, // autorité critiquable/remplaçable → non
    "q23": 0, // autorité centrale forte → oui fort
    "q24": 5, // concentration pouvoir = menace → non
    "q25": 1, // appliquer la loi même imparfaite → oui
    "q26": 1, // règles nécessaires → oui
    "q27": 1, // école doit inculquer discipline/obéissance → oui

    // --- DÉMOCRATIE ---
    "q28": 2,  // gouverner verticalement → plutôt oui
    "q29": 4,  // référendums fréquents → plutôt non (pas un populiste directiste)
    "q30": 3,  // élus suivent majorité → neutre
    "q31": 5,  // participation citoyenne large → non
    "q32": 1,  // démocratie directe favorise minorités militantes → oui
    "q33": 1,  // élites instruites > masse → plutôt oui
    "q34": 2,  // ignorer population pour long terme → plutôt oui

    // --- CHANGEMENT SOCIAL ---
    "q35": 6,  // grèves sauvages → rejet total
    "q36": 3,  // institutions → neutre
    "q37": 2,  // changement lent → plutôt oui
    "q38": 2,  // valorise persuasion plutôt que mobilisation → plutôt oui
    "q39": 1,  // stabilité = ordre, discipline → oui
    "q40": 6,  // changement radical modèle socio-éco → non

    // --- PROGRÈS SOCIÉTAL ---
    "q41": 1,  // incivilités = effondrement autorité → oui
    "q42": 0,  // famille, nation, tradition → oui très fort
    "q43": 0,  // un père + une mère → oui
    "q44": 6,  // visibiliser minorités pour lutter discriminations → non total
    "q45": 6,  // abandon normes traditionnelles → non
    "q46": 6,  // genre = construction sociale → rejet total
    "q47": 6,  // discrimination positive → rejet
    "q48": 0,  // “on se cache derrière couleur peau” → oui (rhétorique)
    "q90": 6,  // abolition domination animale → non
    "q92": 4,  // libertés LGBTQ+ → plutôt non
    "q99": 5,  // politiques égalité femmes/hommes → plutôt contre

    // --- IMMIGRATION & SOUVERAINETÉ ---
    "q49": 6, // frontières absurdes → non
    "q50": 0, // migrants profitent du système → accord total
    "q51": 0, // accords internationaux < peuple / nation → oui total
    "q52": 0, // priorité pauvres nationaux → oui total
    "q53": 5, // aider peuples en danger → plutôt non
    "q54": 6, // autorité mondiale au-dessus États → rejet total
    "q91": 6, // UE → rejet très fort (Frexit implicite, projet d’affrontement)

    // --- RELIGION ---
    "q55": 2, // pas financer religion → plutôt oui (mais pro-culture chrétienne)
    "q56": 1, // lois inspirées religion = danger → oui (laïcité stricte)
    "q57": 1, // disparition spiritualité = décadence → plutôt oui
    "q58": 3, // méfiance religion → neutre (différencié selon religions)
    "q59": 2, // absence repères religieux = décadence → plutôt oui
    "q60": 2, // religion peut renforcer cohésion → plutôt oui pour christianisme

    // --- JUSTICE & SÉCURITÉ ---
    "q61": 0, // peines plus sévères → oui très fort
    "q62": 0, // impunité cause violence → oui
    "q63": 0, // peines incompressibles → oui
    "q64": 6, // justice restaurative → non
    "q65": 6, // priorité réinsertion → non
    "q66": 0, // enfermement perpétuel → oui
    "q67": 6, // prison fabrique récidive → non
    "q68": 6, // alternatives à prison → rejet total
    "q98": 3, // cruauté animale → neutre (pas un axe majeur)

    // --- ÉCOLOGIE ---
    "q69": 5,  // réduire consommation → plutôt non (anti-sobriété)
    "q70": 1,  // écologie punitive = menace économie → oui fort
    "q71": 4,  // capitalisme vert illusion → plutôt non
    "q72": 1,  // éco-anxiété = luxe → oui
    "q73": 1,  // taxes écolo injustes → oui
    "q74": 1,  // technologie > sobriété → oui
    "q89": 1,  // nucléaire = avenir → oui

    // --- LIBERTÉS PUBLIQUES ---
    "q75": 1, // surveillance numérique → plutôt oui
    "q76a": 2, // liberté d’expression → plutôt oui (sauf “wokisme”)
    "q76b": 5, // censure fake news → plutôt non (anti-censure)
    "q77": 0, // contrôles d’identité renforcés → oui total
    "q78": 1, // pouvoir police → oui
    "q79": 1, // vidéosurveillance → oui
    "q80": 2, // état d’urgence → plutôt oui

    // --- TECHNOLOGIES & FUTUR ---
    "q81": 3, // tech détruit emplois → neutre
    "q82": 4, // méfiance IA opaque → plutôt non
    "q83": 2, // génétique médicale → plutôt oui
    "q84": 2, // réseaux sociaux → plutôt oui, outil culturel/identitaire
    "q85": 3, // automatisation → neutre
    "q86": 3, // régulation tech → neutre
    "q87": 3, // numérique pour démocratie → neutre
    "q88": 1, // tech sans entraves → oui
    "q93": 1, // génétique pour éviter maladies → oui
    "q95": 2, // exploration spatiale → plutôt oui (civilisation occidentale)
    "q96": 2   // science > tradition → plutôt oui (sauf culture/identité)
  }
}


];
