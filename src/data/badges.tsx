// src/data/badges.tsx

export type Badge = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  /** % estimé de profils qui obtiennent le badge (cf. ESTIMATED_RARITY). */
  rarity?: number;
  /**
   * test() reçoit :
   * - answers[q.id] = idx ∈ [0..6]
   * - axisScores calculés à partir des idx, clés par id d'axe
   *   (voir ideologicalAxes[].id dans axisexplaination.tsx)
   */
  test: (args: {
    answers: Record<string, number>;
    axisScores: Record<string, { left: number; right: number }>;
  }) => boolean;
};

// Résolution des icônes via Vite : les SVG de src/badges/ (les « tampons du
// dépouillement », générés par scripts/generate-stamps.mjs depuis
// scripts/stamps/defs/) sont bundlés et reçoivent une URL hashée valable en
// production (Vercel).
const ICON_URLS = import.meta.glob("../badges/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function resolveIcon(path?: string): string | undefined {
  if (!path) return undefined;
  const file = path.split("/").pop();
  return file ? ICON_URLS[`../badges/${file}`] ?? path : path;
}

const rawBadges: Badge[] = [
  {
    id: "pro_nuclear",
    label: "Pro-nucléaire",
    description:
      "Vous soutenez activement le nucléaire",
    icon: "../src/badges/nuclear.svg",
    test: ({ answers }) => {
      const idx = answers["q89"];
      return idx === 0;
    },
  },
  {
    id: "vegan",
    label: "Ami des bêtes",
    description:
      "Vous refusez catégoriquement l’exploitation animale.",
    icon: "../src/badges/vegan.svg",
    test: ({ answers }) => {
      const idx = answers["q90"];
      return idx === 0;
    },
  },
  {
    id: "assertive",
    label: "Sûr·e de soi",
    description: "Au moins 75 % de vos réponses sont soit « Tout à fait d'accord » soit « Pas du tout d'accord ».",
    icon: "../src/badges/surdesoi.svg",
    test: ({ answers }) => {
      const all = Object.values(answers);
      if (all.length === 0) return false;
      const extremes = all.filter((v) => v === 0 || v === 6).length;
      return extremes / all.length >= 0.75;
    },
  },

  {
    id: "eco_warrior",
    label: "Éco-guerrier·e",
    description: "Votre score d'écologie radicale est ≥ 75 %.",
    icon: "../src/badges/eco-guerrier.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["ecology"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.left / total) * 100 >= 75;
    },
  },
  {
    id: "equilibriste",
    label: "Équilibriste",
    description: "Vous restez modéré·e dans au moins 75 % de vos réponses.",
    icon: "../src/badges/equilibriste.svg",
    test: ({ answers }) => {
      const all = Object.values(answers);
      if (all.length === 0) return false;
      const moderate = all.filter((v) => v >= 2 && v <= 4).length;
      return moderate / all.length >= 0.75;
    },
  },
  {
    id: "mondialiste",
    label: "Citoyen·ne du monde",
    description: "Vous êtes ultra-internationaliste (≥ 75 % à gauche sur l’axe 'Échelle de souveraineté').",
    icon: "../src/badges/mondialiste.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["sovereignty"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.left / total) * 100 >= 75;
    },
  },
  {
    id: "technosceptique",
    label: "Technosceptique averti·e",
    description: "Vous êtes méfiant·e envers les nouvelles technologies (≥ 75 % côté technosceptique).",
    icon: "../src/badges/technosceptique.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["technology"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.left / total) * 100 >= 75;
    },
  },
  {
    id: "techno_prophete",
    label: "Techno-prophète",
    description: "Vous croyez profondément au progrès technique pour résoudre les grands problèmes.",
    icon: "../src/badges/technophile.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["technology"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.right / total) * 100 >= 75;
    },
  },
  {
    id: "authoritaire",
    label: "Autoritaire",
    description: "Vous estimez qu’une société forte passe par une autorité affirmée.",
    icon: "../src/badges/authoritaire.svg",
    test: ({ answers }) => {
      return (
        answers["q25"] <= 1 &&
        answers["q27"] <= 1 &&
        answers["q23"] <= 1
      );
    },
  },
  {
    id: "inclassable",
    label: "Inclassable",
    description: "Vous êtes difficile à ranger : aucun axe n’a une domination > 65 %.",
    icon: "../src/badges/inclassable.svg",
    test: ({ axisScores }) => {
      const values = Object.values(axisScores);
      if (values.length === 0) return false;
      return values.every((sc) => {
        const total = sc.left + sc.right || 1;
        const leftPct = (sc.left / total) * 100;
        const rightPct = (sc.right / total) * 100;
        return leftPct <= 65 && rightPct <= 65;
      });
    },
  },
  {
    id: "communiste",
    label: "Communiste",
    description: "Vous combinez un anticapitalisme fort, une préférence nette pour l'intervention de l'État, et une vision collectiviste de la propriété.",
    icon: "../src/badges/communiste.svg",
    test: ({ axisScores }) => {
      const eco = axisScores["economic_goal"];
      const etat = axisScores["state_vs_market"];
      const propriete = axisScores["property"];
      if (!eco || !etat || !propriete) return false;

      const ecoLeft = eco.left / (eco.left + eco.right || 1);
      const etatLeft = etat.left / (etat.left + etat.right || 1);
      const propLeft = propriete.left / (propriete.left + propriete.right || 1);

      return ecoLeft >= 0.65 && etatLeft >= 0.65 && propLeft >= 0.65;
    },
  },
  {
    id: "anarchiste_poetique",
    label: "Anarchiste poétique",
    description: "Vous voulez un monde sans chefs, mais aussi plus doux et plus juste.",
    icon: "../src/badges/anarchiste-poetique.svg",
    test: ({ axisScores, answers }) => {
      const pow = axisScores["power"];
      return (
        !!pow && (pow.left / (pow.left + pow.right || 1)) >= 0.75 &&
        answers["q64"] <= 1 && // justice réparatrice
        answers["q65"] <= 1
      );
    },
  },
  {
    id: "liberal",
    label: "Libéral·e assumé·e",
    description: "Vous faites davantage confiance au marché qu’à l’État.",
    icon: "../src/badges/liberal.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["state_vs_market"];
      return !!sc && (sc.right / (sc.left + sc.right || 1)) >= 0.75;
    },
  },
  {
    id: "reformiste_tranquille",
    label: "Réformiste tranquille",
    description: "Vous refusez les ruptures, mais voulez améliorer les choses pas à pas.",
    icon: "../src/badges/reformiste.svg",
    test: ({ axisScores }) => {
      const chg = axisScores["reform"];
      if (!chg) return false;
      const total = chg.left + chg.right || 1;
      return (chg.right / total) * 100 >= 70;
    },
  },
  {
    id: "spiritualiste",
    label: "Spiritualiste moderne",
    description: "Vous pensez que la foi peut encore guider la société.",
    icon: "../src/badges/spiritualiste.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["religion"];
      return !!sc && (sc.right / (sc.left + sc.right || 1)) >= 0.7;
    },
  },
  {
    id: "decisif",
    label: "Décisif·ve",
    description: "Vous n’avez jamais répondu de façon neutre : chaque question vous a fait pencher d’un côté.",
    icon: "../src/badges/decisif.svg",
    test: ({ answers }) => {
      const all = Object.values(answers);
      return all.length > 0 && !all.includes(3);
    },
  },
  {
    id: "protecteur",
    label: "Protecteur·trice",
    description: "Vous donnez clairement la priorité à la sécurité sur les libertés individuelles.",
    icon: "../src/badges/securite.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["freedom_vs_security"];
      if (!sc) return false;
      return sc.right / (sc.left + sc.right || 1) >= 0.75;
    },
  },
  {
    id: "libre_par_principe",
    label: "Libre par principe",
    description: "Vous rejetez l’autorité, les règles imposées et la répression, au nom d’une liberté fondamentale.",
    icon: "../src/badges/libertaire.svg",
    test: ({ axisScores }) => {
      const pow = axisScores["power"];
      const law = axisScores["freedom_vs_security"];
      if (!pow || !law) return false;
      return (
        pow.left / (pow.left + pow.right || 1) >= 0.75 &&
        law.left / (law.left + law.right || 1) >= 0.75
      );
    },
  },
  {
    id: "collectiviste_social",
    label: "Collectiviste social",
    description: "Vous privilégiez la solidarité, la redistribution et l'égalité économique.",
    icon: "../src/badges/collectiviste.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["property"];
      return !!sc && (sc.left / (sc.left + sc.right || 1)) >= 0.75;
    },
  },
  {
    id: "souverainiste",
    label: "Souverainiste",
    description: "Vous êtes attaché·e à l'indépendance nationale et à la souveraineté populaire.",
    icon: "../src/badges/souverainiste.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["sovereignty"];
      return !!sc && (sc.right / (sc.left + sc.right || 1)) >= 0.75;
    }
  },
  {
    id: "productiviste_vert",
    label: "Productiviste vert·e",
    description: "Vous combinez foi en la croissance et sensibilité écologique.",
    icon: "../src/badges/productiviste-vert.svg",
    test: ({ axisScores }) => {
      const eco = axisScores["ecology"];
      const prog = axisScores["technology"];
      if (!eco || !prog) return false;
      return (
        eco.left / (eco.left + eco.right || 1) >= 0.6 &&
        prog.right / (prog.left + prog.right || 1) >= 0.6
      );
    },
  },
  {
    id: "social_liberal",
    label: "Social-libéral·e",
    description: "Vous semblez équilibrer protection sociale et économie de marché.",
    icon: "../src/badges/social-liberal.svg",
    test: ({ axisScores }) => {
      const eco = axisScores["economic_goal"];
      const etat = axisScores["state_vs_market"];
      if (!eco || !etat) return false;
      const ecoRatio = eco.right / (eco.left + eco.right || 1);
      const etatRatio = etat.left / (etat.left + etat.right || 1);
      return ecoRatio >= 0.4 && ecoRatio <= 0.65 && etatRatio >= 0.4 && etatRatio <= 0.65;
    },
  },
  {
    id: "etat_stratege",
    label: "État-stratège",
    description: "Vous voulez un État fort qui oriente l’économie et planifie l’avenir.",
    icon: "../src/badges/etat.svg",
    test: ({ axisScores }) => {
      const sc = axisScores["state_vs_market"];
      return !!sc && sc.left / (sc.left + sc.right || 1) >= 0.75;
    },
  },
  {
    id: "egalitariste",
    label: "Égalitariste",
    description: "Vous valorisez fortement l’égalité, qu’elle soit économique, sociale ou politique.",
    icon: "../src/badges/egalite.svg",
    test: ({ axisScores }) => {
      const eq = axisScores["property"];
      const soc = axisScores["progress"];
      return (
        !!eq && !!soc &&
        eq.left / (eq.left + eq.right || 1) >= 0.7 &&
        soc.left / (soc.left + soc.right || 1) >= 0.7
      );
    },
  },
  {
    id: "conservateur_culturel",
    label: "Conservateur·trice",
    description: "Vous voulez préserver les traditions et l’ordre moral.",
    icon: "../src/badges/conservateur.svg",
    test: ({ axisScores }) => {
      const soc = axisScores["progress"];
      return !!soc && soc.right / (soc.left + soc.right || 1) >= 0.75;
    },
  },
  {
    id: "hesitant",
    label: "Hésitant·e",
    description: "Vous avez répondu « Ni d’accord ni pas d’accord » à au moins 8 questions.",
    icon: "../src/badges/hesitant.svg",
    test: ({ answers }) => {
      const count = Object.values(answers).filter((v) => v === 3).length;
      return count >= 8;
    },
  },
  {
    id: "decentralisateur",
    label: "Démocrate direct·e",
    description: "Vous voulez que les citoyens décident plus directement, sans tout déléguer aux élus. (Démocratie ≥ 75 % côté participatif)",
    icon: "../src/badges/decentralisation.svg",
    test: ({ axisScores }) => {
      const pow = axisScores["democracy"];
      return !!pow && pow.left / (pow.left + pow.right || 1) >= 0.75;
    },
  },
  {
    id: "progressiste_moral",
    label: "Progressiste moral",
    description: "Vous remettez en question les normes traditionnelles sur les mœurs, la famille ou la religion.",
    icon: "../src/badges/progressiste-moral.svg",
    test: ({ axisScores }) => {
      const soc = axisScores["progress"];
      return !!soc && soc.left / (soc.left + soc.right || 1) >= 0.75;
    },
  },
  {
    id: "dissident_tranquille",
    label: "Dissident·e tranquille",
    description: "Vous rejetez l’ordre établi, sans provocation ni radicalité.",
    icon: "../src/badges/dissident.svg",
    test: ({ axisScores }) => {
      const pow = axisScores["power"];
      const soc = axisScores["progress"];
      if (!pow || !soc) return false;
      return (
        pow.left / (pow.left + pow.right || 1) >= 0.65 &&
        soc.left / (soc.left + soc.right || 1) >= 0.65
      );
    },
  },
  {
    id: "constructiviste",
    label: "Constructiviste",
    description: "Vous pensez que les règles sociales, économiques et politiques sont faites pour être repensées.",
    icon: "../src/badges/constructiviste.svg",
    test: ({ axisScores }) => {
      const soc = axisScores["progress"];
      const propriete = axisScores["property"];
      return (
        !!soc && !!propriete &&
        soc.left / (soc.left + soc.right || 1) >= 0.65 &&
        propriete.left / (propriete.left + propriete.right || 1) >= 0.65
      );
    },
  },
  {
    id: "anarchiste",
    label: "Anarchiste",
    description: "Vous voulez abolir les chefs, les ordres venus d’en haut et toute domination verticale. (Anarchisme ≥ 85 %)",
    icon: "../src/badges/anarchiste.svg",
    test: ({ axisScores }) => {
      const pow = axisScores["power"];
      if (!pow) return false;
      const ratio = pow.left / (pow.left + pow.right || 1);
      return ratio >= 0.85;
    },
  },
  {
    id: "pro_europeen",
    label: "Européen·ne convaincu·e",
    description: "Vous considérez l’Union européenne comme un projet politique légitime et porteur d’avenir.",
    icon: "../src/badges/europe.svg",
    test: ({ answers }) => {
      const idx = answers["q91"];
      return idx === 0 || idx === 1;
    },
  },
  {
    id: "pro_lgbt",
    label: "Allié·e",
    description: "Vous défendez sans ambiguïté les droits et libertés des personnes LGBTQ+.",
    icon: "../src/badges/lgbt.svg",
    test: ({ answers }) => {
      const idx = answers["q92"];
      return idx === 0;
    },
  },
  {
    id: "eugeniste_pragmatique",
    label: "Médecine génomique",
    description: "Vous jugez légitime la sélection génétique quand elle évite une maladie grave à un enfant.",
    icon: "../src/badges/eugenisme.svg",
    test: ({ answers }) => {
      return answers["q93"] <= 1;
    },
  },
  {
    id: "legaliseur",
    label: "Pro-légalisation",
    description: "Vous défendez la légalisation des drogues au nom de la liberté individuelle et du bon sens.",
    icon: "../src/badges/legaliseur.svg",
    test: ({ answers }) => {
      return answers["q94"] <= 1;
    },
  },

  {
    id: "cosmonaute",
    label: "Cosmonaute convaincu·e",
    description: "Vous voyez dans l’espace une chance, une nécessité, ou un horizon pour l’humanité.",
    icon: "../src/badges/cosmonaute.svg",
    test: ({ answers }) => {
      return answers["q95"] <= 1;
    },
  },
  {
    id: "rationaliste_pur",
    label: "Rationaliste pur·e",
    description: "Vous croyez que seule la raison scientifique doit guider les décisions collectives.",
    icon: "../src/badges/rationaliste.svg",
    test: ({ answers }) => {
      return answers["q96"] <= 1;
    },
  },
  {
    id: "anti_censure_absolue",
    label: "Anti-censure absolue",
    description: "Pour vous, la liberté d’expression inclut le droit de choquer.",
    icon: "../src/badges/anti-censure.svg",
    test: ({ answers }) => answers["q76a"] <= 1,
  },
  {
    id: "chasseur_de_fakes",
    label: "Chasseur·se d’infox",
    description: "Limiter la désinformation est, pour vous, une nécessité.",
    icon: "../src/badges/fact-check.svg",
    test: ({ answers }) => answers["q76b"] <= 1,
  },
  {
    id: "oeil_de_camera",
    label: "Œil de caméra",
    description: "Vous faites confiance à la vidéosurveillance pour prévenir la délinquance.",
    icon: "../src/badges/videosurveillance.svg",
    test: ({ answers }) => answers["q79"] <= 1,
  },
  {
    id: "hors_champ",
    label: "Hors-champ",
    description: "Vous refusez l’État d’urgence permanent et la société sous caméras.",
    icon: "../src/badges/hors-champ.svg",
    test: ({ answers }) => answers["q79"] >= 5 && answers["q80"] >= 5,
  },
  {
    id: "restrictionniste",
    label: "Restrictionniste",
    description: "Vous voulez durcir l’accueil et prioriser l’aide nationale.",
    icon: "../src/badges/restrictionniste.svg",
    test: ({ answers }) => answers["q50"] <= 1 && answers["q52"] <= 1,
  },
  {
    id: "referendumiste",
    label: "Référendumiste",
    description: "Vous voulez soumettre les lois majeures au vote direct.",
    icon: "../src/badges/referendum.svg",
    test: ({ answers }) => answers["q29"] <= 1,
  },
  {
    id: "elitiste",
    label: "Confiance aux experts",
    description: "Vous préférez que les grandes décisions soient prises par des représentants entourés d’experts plutôt que par vote direct.",
    icon: "../src/badges/elite.svg",
    test: ({ answers }) => answers["q33"] <= 1,
  },
  {
    id: "action_directe",
    label: "Action directe",
    description: "Pour vous, les ruptures et mobilisations radicales peuvent être nécessaires.",
    icon: "../src/badges/action-directe.svg",
    test: ({ answers }) => answers["q35"] <= 1 || answers["q40"] <= 1,
  },
  {
    id: "anticarceral",
    label: "Anticarcéral",
    description: "Vous privilégiez la réparation et les alternatives à la prison.",
    icon: "../src/badges/anticarceral.svg",
    test: ({ answers }) => answers["q67"] <= 1 && answers["q68"] <= 1,
  },
  {
    id: "euro_sceptique",
    label: "Euro-sceptique",
    description: "Vous doutez fortement du projet politique de l’UE.",
    icon: "../src/badges/eurosceptique.svg",
    test: ({ answers }) => answers["q91"] >= 5,
  },
  {
    id: "bastion_du_proprietaire",
    label: "Gardien du patrimoine",
    description: "Vous voyez dans la propriété privée un rempart essentiel des libertés. (Propriété ≥ 75 %)",
    icon: "../src/badges/bastion-proprietaire.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["property"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "capitaine_dindustrie",
    label: "Bâtisseur de richesse",
    description: "Vous faites confiance aux investisseurs et entrepreneurs pour tirer l’économie. (Finalité éco ≥ 75 % à droite)",
    icon: "../src/badges/capitaine-industrie.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["economic_goal"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "voix_du_parlement",
    label: "Foi en l’Assemblée",
    description: "Vous croyez qu’élire des représentants pour décider au nom de tous est la meilleure garantie d’une démocratie efficace. (Démocratie ≥ 75 % côté parlementariste)",
    icon: "../src/badges/voix-parlement.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["democracy"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "sentinelle_de_lordre",
    label: "Sentinelle de l’ordre",
    description: "La peine doit protéger et dissuader avant tout. (Justice ≥ 75 % côté répressif)",
    icon: "../src/badges/sentinelle-ordre.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["justice"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },
  {
    id: "artisan_du_travail",
    label: "Dignité par l’effort",
    description: "Vous considérez que le travail est une valeur centrale, donnant sens, reconnaissance et dignité à chacun. (Travail ≥ 75 % côté travailliste)",
    icon: "../src/badges/artisan-travail.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["work"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "promethee_productiviste",
    label: "Apôtre de l’abondance",
    description: "Pour vous, produire et croître sont les meilleurs moyens de relever les défis écologiques, sans sacrifier le confort ni l’élan humain. (Écologie ≥ 75 % côté productiviste)",
    icon: "../src/badges/promethee-productiviste.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["ecology"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },
  {
    id: "porte_flambeau_revolution",
    label: "Porte-flambeau de la révolution",
    description: "Vous portez haut l’étendard du changement radical, prêt·e à renverser l’ordre établi pour bâtir un nouvel horizon. (Changement social ≥ 75 % côté révolution)",
    icon: "../src/badges/porte-flambeau-revolution.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["reform"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.left / total >= 0.75;
    },
  },
  {
    id: "gardien_de_la_laicite",
    label: "Gardien de la laïcité",
    description: "Vous défendez une séparation stricte entre religion et vie publique, pour garantir l’égalité de tous, croyants ou non. (Religion ≥ 75 % côté laïcisme)",
    icon: "../src/badges/gardien-laicite.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["religion"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.left / total >= 0.75;
    },
  },
  {
    id: "proprietaire_de_ses_jours",
    label: "Propriétaire de ses jours",
    description: "Chaque jour est le vôtre, modelé selon vos envies et votre rythme, loin des horaires imposés.",
    icon: "../src/badges/proprietaire-jours.svg",
    test: ({ axisScores }) => {
      const ax = axisScores["work"];
      if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.left / total >= 0.75;
    },
  },


  // … ajoute ici d’autres badges avec la même logique idx/axisScores …
];

// Rareté estimée de chaque badge (% de profils qui l'obtiennent).
// ESTIMATIONS À LA MAIN, pas des mesures : déduites de la sévérité des
// conditions (seuils ≥ 75 %, conditions cumulées…) et du public attendu d'un
// quiz politique en ligne (jeune, plutôt urbain). Ce sont des valeurs de
// REPLI : quand les compteurs publics GoatCounter répondent et que le volume
// suffit, la rareté réelle mesurée les remplace à l'affichage — voir
// utils/badgeStats.ts (lecture) et analytics.ts/trackBadgesUnlocked (écriture).
const ESTIMATED_RARITY: Record<string, number> = {
  // Réponse forte à une question unique — fréquents à moyens
  pro_nuclear: 18,
  vegan: 7,
  pro_europeen: 38,
  euro_sceptique: 22,
  pro_lgbt: 33,
  eugeniste_pragmatique: 34,
  legaliseur: 28,
  cosmonaute: 31,
  rationaliste_pur: 36,
  anti_censure_absolue: 41,
  chasseur_de_fakes: 46,
  oeil_de_camera: 30,
  referendumiste: 43,
  elitiste: 17,
  action_directe: 39,
  // Deux questions cumulées — moyens à rares
  restrictionniste: 13,
  hors_champ: 8,
  anticarceral: 9,
  authoritaire: 4,
  // Style de réponse global
  hesitant: 32,
  decisif: 6,
  equilibriste: 7,
  assertive: 2,
  inclassable: 3,
  // Un axe dominé à ≥ 70-75 %
  eco_warrior: 16,
  mondialiste: 12,
  technosceptique: 7,
  techno_prophete: 11,
  liberal: 8,
  etat_stratege: 13,
  collectiviste_social: 15,
  bastion_du_proprietaire: 6,
  conservateur_culturel: 7,
  progressiste_moral: 26,
  decentralisateur: 19,
  voix_du_parlement: 5,
  sentinelle_de_lordre: 10,
  protecteur: 9,
  spiritualiste: 5,
  gardien_de_la_laicite: 29,
  reformiste_tranquille: 12,
  porte_flambeau_revolution: 8,
  artisan_du_travail: 10,
  proprietaire_de_ses_jours: 13,
  promethee_productiviste: 5,
  souverainiste: 11,
  capitaine_dindustrie: 6,
  anarchiste: 4,
  // Conditions croisées sur plusieurs axes — rares
  communiste: 9,
  egalitariste: 12,
  social_liberal: 14,
  dissident_tranquille: 21,
  constructiviste: 18,
  productiviste_vert: 8,
  libre_par_principe: 5,
  anarchiste_poetique: 3,
};

// Icônes résolues en URLs bundlées (valables en production) + rareté estimée.
export const badges: Badge[] = rawBadges.map((b) => ({
  ...b,
  icon: resolveIcon(b.icon),
  rarity: ESTIMATED_RARITY[b.id],
}));
