// src/data/badges.tsx

export type Badge = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  /**
   * test() reçoit :
   * - answers[q.id] = idx ∈ [0..6]
   * - axisScores calculés à partir des idx
   */
  test: (args: {
    answers: Record<string, number>;
    axisScores: Record<string, { left: number; right: number }>;
  }) => boolean;
};

export const badges: Badge[] = [
  {
    id: "pro_nuclear",
    label: "Pro-nucléaire",
    description:
      "Tu soutiens activement le nucléaire",
    icon: "../src/badges/nuclear.png",
    test: ({ answers, axisScores }) => {
      const idx = answers["q89"];
      return idx === 0;
    },
  },
  {
    id: "vegan",
    label: "Ami des bêtes",
    description:
      "Tu refuses catégoriquement l’exploitation animale.",
    icon: "../src/badges/vegan.png",
    test: ({ answers, axisScores }) => {
      const idx = answers["q90"];
      return idx === 0;
    },
  },
  {
    id: "assertive",
    label: "Sûr·e de soi",
    description: "Au moins 75 % de tes réponses sont soit 'Tout a fait d'accord' soit 'Pas du tout d'accord'",
    icon: "../src/badges/surdesoi.png",
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
    description: "Ton score écologique d'écologie radicale est ≥ 75 %.",
    icon: "../src/badges/eco-guerrier.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Modèle écologique"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.left / total) * 100 >= 75;
    },
  },
  {
    id: "equilibriste",
    label: "Équilibriste",
    description: "Tu restes modéré·e dans plus de 75 % de tes réponses.",
    icon: "../src/badges/equilibriste.png",
    test: ({ answers }) => {
      const all = Object.values(answers);
      const moderate = all.filter((v) => v >= 2 && v <= 4).length;
      return moderate / all.length >= 0.75;
    },
  },
  {
    id: "mondialiste",
    label: "Citoyen·ne du monde",
    description: "Tu es ultra-internationaliste (≥ 75 % à gauche sur l’axe 'Échelle de souveraineté').",
    icon: "../src/badges/mondialiste.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Échelle de souveraineté"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.left / total) * 100 >= 75;
    },
  },
  {
    id: "technosceptique",
    label: "Technosceptique averti·e",
    description: "Tu es méfiant·e envers les nouvelles technologies (≥ 75 % côté technosceptique).",
    icon: "../src/badges/technosceptique.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Progrès technologique et enjeux sociaux"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.left / total) * 100 >= 75;
    },
  },
  {
    id: "techno_prophete",
    label: "Techno-prophète",
    description: "Tu crois profondément au progrès technique pour résoudre les grands problèmes.",
    icon: "../src/badges/technophile.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Progrès technologique et enjeux sociaux"];
      if (!sc) return false;
      const total = sc.left + sc.right || 1;
      return (sc.right / total) * 100 >= 75;
    },
  },
  {
    id: "authoritaire",
    label: "Autoritaire",
    description: "Tu estimes qu’une société forte passe par une autorité affirmée.",
    icon: "../src/badges/authoritaire.png",
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
    description: "Tu es difficile à ranger : aucun axe n’a une domination > 65 %.",
    icon: "../src/badges/inclassable.png",
    test: ({ axisScores }) => {
      return Object.values(axisScores).every((sc) => {
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
    description: "Tu combines un anticapitalisme fort, une préférence nette pour l'intervention de l'État, et une vision collectiviste de la propriété.",
    icon: "../src/badges/communiste.png",
    test: ({ axisScores }) => {
      const eco = axisScores["Finalité de l’activité économique"];
      const etat = axisScores["Rôle de l’État dans l’économie"];
      const propriete = axisScores["Modèle de propriété"];
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
    description: "Tu veux un monde sans chefs, mais aussi plus doux et plus juste.",
    icon: "../src/badges/anarchiste-poetique.png",
    test: ({ axisScores, answers }) => {
      const pow = axisScores["Organisation du pouvoir"];
      return (
        pow && (pow.left / (pow.left + pow.right || 1)) >= 0.75 &&
        answers["q64"] <= 1 && // justice réparatrice
        answers["q65"] <= 1
      );
    },
  },
  {
    id: "liberal",
    label: "Libéral·e assumé·e",
    description: "Tu fais davantage confiance au marché qu’à l’État.",
    icon: "../src/badges/liberal.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Rôle de l’État dans l’économie"];
      return sc && (sc.right / (sc.left + sc.right || 1)) >= 0.75;
    },
  },
  {
    id: "reformiste_tranquille",
    label: "Réformiste tranquille",
    description: "Tu refuses les ruptures, mais veux améliorer les choses pas à pas.",
    icon: "../src/badges/reformiste.png",
    test: ({ axisScores }) => {
      const chg = axisScores["Rapport au changement social"];
      const total = chg.left + chg.right || 1;
      return (chg.right / total) * 100 >= 70;
    },
  },
  {
    id: "spiritualiste",
    label: "Spiritualiste moderne",
    description: "Tu penses que la foi peut encore guider la société.",
    icon: "../src/badges/spiritualiste.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Place du religieux dans la vie publique"];
      return sc && (sc.right / (sc.left + sc.right || 1)) >= 0.7;
    },
  },
  {
    id: "decisif",
    label: "Décisif·ve",
    description: "Tu n’as jamais répondu de façon neutre : chaque question t’a fait pencher d’un côté.",
    icon: "../src/badges/decisif.png",
    test: ({ answers }) => {
      return !Object.values(answers).includes(3);
    },
  },
  {
    id: "protecteur",
    label: "Protecteur·trice",
    description: "Tu donnes clairement la priorité à la sécurité sur les libertés individuelles.",
    icon: "../src/badges/securite.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Équilibre entre liberté et sécurité"];
      if (!sc) return false;
      return sc.right / (sc.left + sc.right || 1) >= 0.75;
    },
  },
  {
    id: "libre_par_principe",
    label: "Libre par principe",
    description: "Tu rejettes l’autorité, les règles imposées et la répression, au nom d’une liberté fondamentale.",
    icon: "../src/badges/libertaire.png",
    test: ({ axisScores }) => {
      const pow = axisScores["Organisation du pouvoir"];
      const law = axisScores["Équilibre entre liberté et sécurité"];
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
    description: "Tu privilégies la solidarité, la redistribution et l'égalité économique.",
    icon: "../src/badges/collectiviste.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Modèle de propriété"];
      return sc && (sc.left / (sc.left + sc.right || 1)) >= 0.75;
    },
  },
  {
    id: "souverainiste",
    label: "Souverainiste",
    description: "Tu es attaché·e à l'indépendance nationale et à la souveraineté populaire.",
    icon: "../src/badges/souverainiste.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Échelle de souveraineté"];
      return sc && (sc.right / (sc.left + sc.right || 1)) >= 0.75;
    }
  },
  {
    id: "productiviste_vert",
    label: "Productiviste vert·e",
    description: "Tu combines foi en la croissance et sensibilité écologique.",
    icon: "../src/badges/productiviste-vert.png",
    test: ({ axisScores }) => {
      const eco = axisScores["Modèle écologique"];
      const prog = axisScores["Progrès technologique et enjeux sociaux"];
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
    description: "Tu sembles équilibrer protection sociale et économie de marché.",
    icon: "../src/badges/social-liberal.png",
    test: ({ axisScores }) => {
      const eco = axisScores["Finalité de l’activité économique"];
      const etat = axisScores["Rôle de l’État dans l’économie"];
      if (!eco || !etat) return false;
      const ecoRatio = eco.right / (eco.left + eco.right || 1);
      const etatRatio = etat.left / (etat.left + etat.right || 1);
      return ecoRatio >= 0.4 && ecoRatio <= 0.65 && etatRatio >= 0.4 && etatRatio <= 0.65;
    },
  },
  {
    id: "etat_stratege",
    label: "État-stratège",
    description: "Tu veux un État fort qui oriente l’économie et planifie l’avenir.",
    icon: "../src/badges/etat.png",
    test: ({ axisScores }) => {
      const sc = axisScores["Rôle de l’État dans l’économie"];
      return sc && sc.left / (sc.left + sc.right || 1) >= 0.75;
    },
  },
  {
    id: "egalitariste",
    label: "Égalitariste",
    description: "Tu valorises fortement l’égalité, qu’elle soit économique, sociale ou politique.",
    icon: "../src/badges/egalite.png",
    test: ({ axisScores }) => {
      const eq = axisScores["Modèle de propriété"];
      const soc = axisScores["Vision du progrès sociétal"];
      return (
        eq && soc &&
        eq.left / (eq.left + eq.right || 1) >= 0.7 &&
        soc.left / (soc.left + soc.right || 1) >= 0.7
      );
    },
  },
  {
    id: "conservateur_culturel",
    label: "Conservateur·trice",
    description: "Tu veux préserver les traditions et l’ordre moral.",
    icon: "../src/badges/conservateur.png",
    test: ({ axisScores }) => {
      const soc = axisScores["Vision du progrès sociétal"];
      return soc && soc.right / (soc.left + soc.right || 1) >= 0.75;
    },
  },
  {
    id: "hesitant",
    label: "Hésitant·e",
    description: "Tu utilises très fréquemment le centre exact (‘Ni d’accord ni pas d’accord’).",
    icon: "../src/badges/hesitant.png",
    test: ({ answers }) => {
      const count = Object.values(answers).filter((v) => v === 3).length;
      return count >= 8;
    },
  },
  {
    id: "decentralisateur",
    label: "Décentralisateur·trice",
    description: "Tu veux donner plus de pouvoir aux collectivités locales et à la société civile.",
    icon: "../src/badges/decentralisation.png",
    test: ({ axisScores }) => {
      const pow = axisScores["Forme de démocratie"];
      return pow && pow.left / (pow.left + pow.right || 1) >= 0.75;
    },
  },
  {
    id: "progressiste_moral",
    label: "Progressiste moral",
    description: "Tu remets en question les normes traditionnelles sur les mœurs, la famille ou la religion.",
    icon: "../src/badges/progressiste-moral.png",
    test: ({ axisScores }) => {
      const soc = axisScores["Vision du progrès sociétal"];
      return soc && soc.left / (soc.left + soc.right || 1) >= 0.75;
    },
  },
  {
    id: "dissident_tranquille",
    label: "Dissident·e tranquille",
    description: "Tu rejettes l’ordre établi, sans provocation ni radicalité.",
    icon: "../src/badges/dissident.png",
    test: ({ axisScores }) => {
      const pow = axisScores["Organisation du pouvoir"];
      const soc = axisScores["Vision du progrès sociétal"];
      return (
        pow.left / (pow.left + pow.right || 1) >= 0.65 &&
        soc.left / (soc.left + soc.right || 1) >= 0.65
      );
    },
  },
  {
    id: "constructiviste",
    label: "Constructiviste",
    description: "Tu penses que les règles sociales, économiques et politiques sont faites pour être repensées.",
    icon: "../src/badges/constructiviste.png",
    test: ({ axisScores }) => {
      const soc = axisScores["Vision du progrès sociétal"];
      const propriete = axisScores["Modèle de propriété"];
      return (
        soc && propriete &&
        soc.left / (soc.left + soc.right || 1) >= 0.65 &&
        propriete.left / (propriete.left + propriete.right || 1) >= 0.65
      );
    },
  },
  {
    id: "anarchiste",
    label: "Anarchiste",
    description: "Tu veux abolir les chefs, les ordres venus d’en haut et toute domination verticale.(Anarchisme >=85%)",
    icon: "../src/badges/anarchiste.png",
    test: ({ axisScores }) => {
      const pow = axisScores["Organisation du pouvoir"];
      if (!pow) return false;
      const ratio = pow.left / (pow.left + pow.right || 1);
      return ratio >= 0.85;
    },
  },
  {
    id: "pro_europeen",
    label: "Européen·ne convaincu·e",
    description: "Tu considères l’Union européenne comme un projet politique légitime et porteur d’avenir.",
    icon: "../src/badges/europe.png",
    test: ({ answers }) => {
      const idx = answers["q91"];
      return idx === 0 || idx === 1;
    },
  },
  {
    id: "pro_lgbt",
    label: "Allié·e",
    description: "Tu défends sans ambiguïté les droits et libertés des personnes LGBTQ+.",
    icon: "../src/badges/lgbt.png",
    test: ({ answers }) => {
      const idx = answers["q92"];
      return idx === 0;
    },
  },
  {
    id: "eugeniste_pragmatique",
    label: "Optimiseur·se génétique",
    description: "Tu considères légitime de recourir à la sélection génétique pour améliorer la santé publique.",
    icon: "../src/badges/eugenisme.png",
    test: ({ answers }) => {
      return answers["q93"] <= 1;
    },
  },
  {
    id: "legaliseur",
    label: "Légaliseur",
    description: "Tu défends la légalisation des drogues au nom de la liberté individuelle et du bon sens.",
    icon: "../src/badges/legaliseur.png",
    test: ({ answers }) => {
      return answers["q94"] <= 1;
    },
  },

  {
    id: "cosmonaute",
    label: "Cosmonaute convaincu·e",
    description: "Tu vois dans l’espace une chance, une nécessité, ou un horizon pour l’humanité.",
    icon: "../src/badges/cosmonaute.png",
    test: ({ answers }) => {
      return answers["q95"] <= 1;
    },
  },
  {
    id: "rationaliste_pur",
    label: "Rationaliste pur·e",
    description: "Tu crois que seule la raison scientifique doit guider les décisions collectives.",
    icon: "../src/badges/rationaliste.png",
    test: ({ answers }) => {
      return answers["q96"] <= 1;
    },
  },
  {
    id: "anti_censure_absolue",
    label: "Anti-censure absolue",
    description: "Pour toi, la liberté d’expression inclut le droit de choquer.",
    icon: "../src/badges/anti-censure.png",
    test: ({ answers }) => answers["q76a"] <= 1,
  },
  {
    id: "chasseur_de_fakes",
    label: "Chasseur·se de fakes",
    description: "Limiter la désinformation est, pour toi, une nécessité.",
    icon: "../src/badges/fact-check.png",
    test: ({ answers }) => answers["q76b"] <= 1,
  },
  {
    id: "oeil_de_camera",
    label: "Œil de caméra",
    description: "Tu fais confiance à la vidéosurveillance pour prévenir la délinquance.",
    icon: "../src/badges/videosurveillance.png",
    test: ({ answers }) => answers["q79"] <= 1,
  },
  {
    id: "hors_champ",
    label: "Hors-champ",
    description: "Tu refuses l’État d’urgence permanent et la société sous caméras.",
    icon: "../src/badges/hors-champ.png",
    test: ({ answers }) => answers["q79"] >= 5 && answers["q80"] >= 5,
  },
  {
    id: "restrictionniste",
    label: "Restrictionniste",
    description: "Tu veux durcir l’accueil et prioriser l’aide nationale.",
    icon: "../src/badges/restrictionniste.png",
    test: ({ answers }) => answers["q50"] <= 1 && answers["q52"] <= 1,
  },
  {
    id: "referendumiste",
    label: "Référendumiste",
    description: "Tu veux soumettre les lois majeures au vote direct.",
    icon: "../src/badges/referendum.png",
    test: ({ answers }) => answers["q29"] <= 1,
  },
  {
    id: "elitiste",
    label: "Élitiste pragmatique",
    description: "Tu fais davantage confiance aux décideurs très instruits.",
    icon: "../src/badges/elite.png",
    test: ({ answers }) => answers["q33"] <= 1,
  },
  {
    id: "action_directe",
    label: "Action directe",
    description: "Pour toi, les ruptures et mobilisations radicales peuvent être nécessaires.",
    icon: "../src/badges/action-directe.png",
    test: ({ answers }) => answers["q35"] <= 1 || answers["q40"] <= 1,
  },
  {
    id: "anticarceral",
    label: "Anticarcéral",
    description: "Tu privilégies la réparation et les alternatives à la prison.",
    icon: "../src/badges/anticarceral.png",
    test: ({ answers }) => answers["q67"] <= 1 && answers["q68"] <= 1,
  },
  {
    id: "euro_sceptique",
    label: "Euro-sceptique",
    description: "Tu doutes fortement du projet politique de l’UE.",
    icon: "../src/badges/eurosceptique.png",
    test: ({ answers }) => answers["q91"] >= 5,
  },
  {
    id: "bastion_du_proprietaire",
    label: "Gardien du patrimoine",
    description: "Tu vois dans la propriété privée un rempart essentiel des libertés. (Propriété ≥ 75 %)",
    icon: "../src/badges/bastion-proprietaire.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Modèle de propriété"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "capitaine_dindustrie",
    label: "Bâtisseur de richesse",
    description: "Tu fais confiance aux investisseurs et entrepreneurs pour tirer l’économie. (Finalité éco ≥ 75 % à droite)",
    icon: "../src/badges/capitaine-industrie.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Finalité de l’activité économique"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "voix_du_parlement",
    label: "Foi·e dans l’Assemblée",
    description: "Tu crois qu’élire des représentants pour décider au nom de tous est la meilleure garantie d’une démocratie efficace. (Démocratie ≥ 75 % côté parlementariste)",
    icon: "../src/badges/voix-parlement.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Forme de démocratie"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "sentinelle_de_lordre",
    label: "Sentinelle de l’ordre",
    description: "La peine doit protéger et dissuader avant tout. (Justice ≥ 75 % côté répressif)",
    icon: "../src/badges/sentinelle-ordre.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Objectif du système judiciaire"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },
  {
    id: "artisan_du_travail",
    label: "Dignité par l’effort",
    description: "Tu considères que le travail est une valeur centrale, donnant sens, reconnaissance et dignité à chacun. (Travail ≥ 75 % côté travailliste)",
    icon: "../src/badges/artisan-travail.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Sens et fonction du travail"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },

  {
    id: "promethee_productiviste",
    label: "Apôtre de l’abondance",
    description: "Pour toi, produire et croître sont les meilleurs moyens de relever les défis écologiques, sans sacrifier le confort ni l’élan humain. (Écologie ≥ 75 % côté productiviste)",
    icon: "../src/badges/promethee-productiviste.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Modèle écologique"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.right / total >= 0.75;
    },
  },
  {
    id: "porte_flambeau_revolution",
    label: "Porte-flambeau de la révolution",
    description: "Tu portes haut l’étendard du changement radical, prêt·e à renverser l’ordre établi pour bâtir un nouvel horizon. (Changement social ≥ 75 % côté révolution)",
    icon: "../src/badges/porte-flambeau-revolution.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Rapport au changement social"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.left / total >= 0.75;
    },
  },
  {
    id: "gardien_de_la_laicite",
    label: "Gardien de la laïcité",
    description: "Tu défends une séparation stricte entre religion et vie publique, pour garantir l’égalité de tous, croyants ou non. (Religion ≥ 75 % côté laïcisme)",
    icon: "../src/badges/gardien-laicite.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Place du religieux dans la vie publique"]; if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.left / total >= 0.75;
    },
  },
  {
    id: "proprietaire_de_ses_jours",
    label: "Propriétaire de ses jours",
    description: "Chaque jour est le tien, modelé selon tes envies et ton rythme, loin des horaires imposés.",
    icon: "../src/badges/proprietaire-jours.png",
    test: ({ axisScores }) => {
      const ax = axisScores["Sens et fonction du travail"];
      if (!ax) return false;
      const total = ax.left + ax.right || 1;
      return ax.left / total >= 0.75;
    },
  },


  // … ajoute ici d’autres badges avec la même logique idx/axisScores …
];
