export const ideologicalAxes = [
  {
  id: "progress",
  sortIndex: 1,
  axis: "Vision du progrès sociétal",
  question: "Faut-il remettre en cause les normes établies ?",
  left: {
    label: "Progressisme",
    response:
      "Une société juste ne peut se figer dans ses traditions. Certaines normes, jadis considérées comme naturelles — qu’il s’agisse de la place des femmes, des minorités, ou de la structure familiale — peuvent aujourd’hui entretenir des inégalités. Remettre ces cadres en question, c’est permettre à chacun de trouver sa place dans un monde qui change. Pour les progressistes, des évolutions comme le mariage pour tous, la reconnaissance des identités de genre ou la réforme de l’éducation illustrent la capacité d’une société à s’améliorer en s’ouvrant à plus d’égalité et de liberté.",
  },
  right: {
    label: "Conservatisme",
    response:
      "Les normes établies sont le fruit d’une longue histoire : elles garantissent la stabilité et transmettent un cadre moral commun. Les bouleversements trop rapides — qu’il s’agisse de repenser les rôles familiaux, les traditions nationales ou l’autorité à l’école — risquent de déstabiliser le lien social et de créer de nouvelles tensions. Pour les conservateurs, le progrès ne consiste pas à effacer le passé, mais à le faire évoluer avec prudence, en conservant les repères qui permettent à la société de tenir ensemble.",
  },
  },
{
  id: "power",
  sortIndex: 2,
  axis: "Organisation du pouvoir",
  question: "Comment doit être exercé le pouvoir dans une société ?",
  left: {
    label: "Anarchisme",
    response:
      "Le pouvoir n’est jamais neutre et doit toujours pouvoir être remis en question. L’anarchisme prône une organisation horizontale de la société, fondée sur la coopération libre et la responsabilité individuelle. Plutôt qu’un État centralisé, il valorise l’autogestion dans les communes, les associations ou les entreprises. Pour ses partisans, moins de hiérarchie signifie plus de liberté et moins d’abus de pouvoir.",
  },
  right: {
    label: "Étatisme",
    response:
      "L’État constitue le garant de la justice et de la cohésion sociale. Un pouvoir central fort permet d’assurer la sécurité, de réguler l’économie et de protéger les citoyens contre les dérives individuelles ou les puissances privées. Dans cette vision, les institutions doivent rester au-dessus des intérêts particuliers, qu’il s’agisse de l’armée, de la justice ou de la santé publique, afin de préserver l’ordre et l’intérêt général.",
  },
},
  {
  id: "state_vs_market",
  sortIndex: 3,
  axis: "Rôle de l’État dans l’économie",
  question: "L’État doit-il diriger l’économie ou s’effacer ?",
  left: {
    label: "Interventionnisme",
    response:
      "L’État doit encadrer le marché pour éviter ses dérives. En investissant dans des secteurs stratégiques comme l’énergie, les transports ou la santé, il protège l’intérêt collectif et préserve les biens communs. La régulation permet de limiter les abus, d’empêcher les monopoles et de réduire les inégalités. Pour les partisans de l’intervention publique, des politiques comme la fixation du SMIC, les nationalisations ou les services publics sont des outils essentiels pour garantir la justice sociale.",
  },
  right: {
    label: "Libéralisme économique",
    response:
      "Le marché fonctionne mieux quand il est libre. La concurrence favorise l’innovation, la baisse des prix et la responsabilité individuelle. Trop d’intervention étatique freine la croissance, crée de la bureaucratie et décourage l’initiative. Selon cette vision, l’État doit se limiter à fixer les règles du jeu, garantir la sécurité, la justice et les infrastructures, tout en laissant les entreprises et les citoyens décider librement de leurs échanges.",
  },
}
,{
  id: "ecology",
  sortIndex: 4,
  axis: "Modèle écologique",
  question: "Faut-il changer nos modes de vie pour préserver la planète ?",
  left: {
    label: "Écologisme radical",
    response:
      "Faire face à la crise climatique suppose une remise en cause profonde de notre modèle de société. Réduire les émissions ne suffit pas : il faut repenser nos modes de production, de transport et de consommation, quitte à renoncer à un certain confort matériel. Manger local, limiter les trajets aériens ou réduire la place de la voiture sont vus comme des actes nécessaires pour éviter un effondrement écologique et social. Le changement doit être global, pas seulement technologique.",
  },
  right: {
    label: "Productivisme",
    response:
      "Les défis écologiques doivent être relevés sans freiner le développement humain. L’innovation, les énergies propres et la croissance verte offrent des solutions plus efficaces que la décroissance ou les restrictions. Miser sur la recherche, les technologies de captation du carbone ou le nucléaire permettrait de concilier progrès économique et protection de l’environnement. Il n’est pas nécessaire de bouleverser nos modes de vie si le progrès peut rendre la production plus durable.",
  },
}
, {
    id: "economic_goal",
    sortIndex: 5,
    axis: "Finalité de l’activité économique",
    question: "À quoi devrait servir l’économie ?",
    left: {
      label: "Anticapitalisme",
      response:
        "L’économie doit répondre aux besoins de toutes et tous. Quand elle privilégie le profit, elle devient source d’injustices, d’exploitation et de crises à répétition.",
    },
    right: {
      label: "Capitalisme entrepreneurial",
      response:
        "Créer, investir, réussir : c’est ce qui fait avancer la société. L’économie récompense ceux qui prennent des risques, innovent et travaillent dur.",
    },
  },
  {
    id: "property",
    sortIndex: 6,
    axis: "Modèle de propriété",
    question: "Qui devrait posséder les entreprises et les logements ?",
    left: {
      label: "Collectivisme",
      response:
        "Quand une minorité possède tout, le reste dépend d’elle. Les biens essentiels devraient être contrôlés collectivement ou par ceux qui les font vivre.",
    },
    right: {
      label: "Propriétarisme",
      response:
        "Chacun a le droit d’acheter, vendre ou transmettre des biens. Sans ce droit fondamental, il n’y a ni liberté ni responsabilité individuelle.",
    },
  },
  {
    id: "democracy",
    sortIndex: 7,
    axis: "Forme de démocratie",
    question: "Qui doit décider dans une démocratie ?",
    left: {
      label: "Participationnisme",
      response:
        "Les citoyens doivent avoir plus de pouvoir entre les élections : référendums, assemblées tirées au sort, contrôle direct des décisions publiques.",
    },
    right: {
      label: "Parlementarisme",
      response:
        "La démocratie repose sur l’élection de représentants compétents. Les décisions doivent rester efficaces, même si elles déplaisent parfois.",
    },
  },
  {
    id: "justice",
    sortIndex: 8,
    axis: "Objectif du système judiciaire",
    question: "La justice doit-elle punir ou réparer ?",
    left: {
      label: "Justicialisme réparateur",
      response:
        "Punir ne suffit pas. Une société juste cherche à comprendre, réparer les torts et donner une seconde chance. La réinsertion est plus utile que l’exclusion.",
    },
    right: {
      label: "Pénalisme répressif",
      response:
        "Sans sanction ferme, il n’y a pas de justice. Il faut protéger la société, dissuader les récidives et faire respecter les règles par l’autorité.",
    },
  },
  {
    id: "sovereignty",
    sortIndex: 9,
    axis: "Échelle de souveraineté",
    question: "Un pays doit-il faire passer ses lois avant tout ?",
    left: {
      label: "Internationalisme",
      response:
        "Les frontières ne doivent pas empêcher la coopération ni la défense des droits humains. Les grands défis exigent des règles communes au-delà des nations.",
    },
    right: {
      label: "Souverainisme",
      response:
        "Chaque peuple doit décider librement de ses lois, sans pression extérieure. La souveraineté est une condition de la démocratie.",
    },
  },
  {
    id: "religion",
    sortIndex: 10,
    axis: "Place du religieux dans la vie publique",
    question: "La religion doit-elle influencer la vie publique ?",
    left: {
      label: "Laïcisme",
      response:
        "Pour garantir l’égalité entre croyants et non-croyants, l’État doit rester neutre. La religion relève du privé, pas de l’espace public.",
    },
    right: {
      label: "Spiritualisme politique",
      response:
        "Les traditions religieuses peuvent offrir des repères moraux utiles à tous. Les exclure totalement affaiblit le lien social.",
    },
  },
  {
    id: "reform",
    sortIndex: 11,
    axis: "Rapport au changement social",
    question: "Faut-il transformer le système ou l’adapter ?",
    left: {
      label: "Révolutionnisme",
      response:
        "Certaines injustices sont trop enracinées pour être corrigées à moitié. Il faut parfois rompre avec le système actuel pour reconstruire sur de nouvelles bases.",
    },
    right: {
      label: "Réformisme",
      response:
        "Changer les choses prend du temps. Mieux vaut améliorer le système existant pas à pas que tout détruire sans garantie d’un mieux.",
    },
  },
  {
    id: "work",
    sortIndex: 12,
    axis: "Sens et fonction du travail",
    question: "Le travail doit-il structurer nos vies ?",
    left: {
      label: "Anti-productivisme",
      response:
        "Le travail ne doit pas être une fin en soi. On peut viser une société où l’on travaille moins, mais mieux, pour libérer du temps et du sens.",
    },
    right: {
      label: "Travaillisme",
      response:
        "Le travail permet de contribuer, de se réaliser et de mériter son revenu. Il reste un pilier essentiel de la vie collective.",
    },
  },
  {
    id: "freedom_vs_security",
    sortIndex: 13,
    axis: "Équilibre entre liberté et sécurité",
    question: "Comment équilibrer liberté individuelle et protection collective ?",
    left: {
      label: "Libertarisme",
      response:
        "La liberté individuelle doit être prioritaire, même si cela complique la sécurité collective. Les restrictions doivent être minimales.",
    },
    right: {
      label: "Securitarisme",
      response:
        "La protection collective justifie certaines restrictions des libertés individuelles, notamment pour garantir l’ordre et la sécurité.",
    },
  },
  {
    id: "technology",
    sortIndex: 14,
    axis: "Progrès technologique et enjeux sociaux",
    question: "Les technologies sont-elles une chance ou un risque pour la société ?",
    left: {
      label: "Technoscepticisme",
      response:
        "La technologie peut accroître les inégalités, menacer la vie privée et engendrer des risques éthiques. Elle doit être surveillée et régulée avec prudence.",
    },
    right: {
      label: "Techno-optimisme",
      response:
        "Les innovations technologiques améliorent la vie, créent des emplois et résolvent des problèmes sociaux. Il faut encourager leur développement rapide.",
    },
  },
];
