export const ideologicalAxes = [
  {
  id: "progress",
  sortIndex: 1,
  axis: "Vision du progrès sociétal",
  question: "Faut-il remettre en cause les normes établies ?",
  left: {
    label: "Progressisme",
    response:
      "Une société juste ne peut se figer dans ses traditions. Certaines normes, jadis considérées comme naturelles (qu’il s’agisse de la place des femmes, des minorités ou de la structure familiale), peuvent aujourd’hui entretenir des inégalités. Remettre ces cadres en question, c’est permettre à chacun de trouver sa place dans un monde qui change. Pour les progressistes, des évolutions comme le mariage pour tous, la reconnaissance des identités de genre ou la réforme de l’éducation illustrent la capacité d’une société à s’améliorer en s’ouvrant à plus d’égalité et de liberté.",
  },
  right: {
    label: "Conservatisme",
    response:
      "Les normes établies sont le fruit d’une longue histoire : elles garantissent la stabilité et transmettent un cadre moral commun. Les bouleversements trop rapides (qu’il s’agisse de repenser les rôles familiaux, les traditions nationales ou l’autorité à l’école) risquent de déstabiliser le lien social et de créer de nouvelles tensions. Pour les conservateurs, le progrès ne consiste pas à effacer le passé, mais à le faire évoluer avec prudence, en conservant les repères qui permettent à la société de tenir ensemble.",
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
        "L’économie devrait avoir pour but de répondre aux besoins de toutes et tous, et non d’accumuler du capital. Quand le profit devient sa seule boussole, elle produit des injustices : salaires écrasés pour gonfler les dividendes, surexploitation des ressources, crises financières à répétition qui frappent d’abord les plus fragiles. Pour les anticapitalistes, des outils comme les coopératives, l’économie sociale et solidaire ou des services gratuits financés par l’impôt montrent qu’une autre logique est possible. L’objectif n’est pas de produire toujours plus, mais de mieux partager ce qui est produit et de remettre l’humain et le vivant au centre des choix économiques.",
    },
    right: {
      label: "Capitalisme entrepreneurial",
      response:
        "Créer une entreprise, investir, prendre des risques et réussir : c’est ce moteur qui fait avancer la société et élève le niveau de vie général. L’économie de marché récompense ceux qui innovent, travaillent dur et répondent à un besoin réel, et cette récompense incite chacun à se dépasser. Pour ses partisans, l’histoire montre que l’initiative privée a sorti des centaines de millions de personnes de la pauvreté, des révolutions industrielles aux start-up technologiques. La recherche du profit n’est pas un défaut mais un signal utile : elle oriente les ressources vers ce qui crée de la valeur, à condition que la concurrence reste loyale.",
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
        "Quand une minorité possède l’essentiel des terres, des entreprises et des logements, le reste de la population se retrouve en situation de dépendance, contraint de louer son travail ou son toit à ceux qui détiennent le capital. Pour les collectivistes, les biens véritablement essentiels (le logement, l’eau, l’énergie, les grands moyens de production) devraient être contrôlés collectivement ou par celles et ceux qui les font vivre au quotidien. Des formes comme les coopératives ouvrières, les logements sociaux ou la propriété publique des infrastructures visent à empêcher qu’une rente s’installe et à garantir que la richesse profite à l’ensemble plutôt qu’à quelques propriétaires.",
    },
    right: {
      label: "Propriétarisme",
      response:
        "Le droit de posséder, d’acheter, de vendre et de transmettre ses biens est une liberté fondamentale, indissociable de la responsabilité individuelle. Sans propriété privée garantie, il n’y a ni incitation à entretenir ce que l’on détient, ni sécurité juridique pour investir sur le long terme. Pour les propriétaristes, l’accès à la propriété (d’un logement, d’une entreprise, d’un terrain) est aussi un facteur d’autonomie et d’ascension sociale, qui permet à chacun de bâtir un patrimoine et de le transmettre. L’État doit avant tout protéger ce droit et faire respecter les contrats, plutôt que de redistribuer ou de socialiser les biens.",
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
        "La démocratie ne devrait pas se réduire à un vote tous les cinq ans suivi d’une longue délégation. Entre deux élections, les citoyens devraient garder un pouvoir réel : référendums d’initiative populaire, budgets participatifs, assemblées citoyennes tirées au sort, contrôle et révocabilité des élus. Pour les participationnistes, ces outils rapprochent la décision de celles et ceux qu’elle concerne, limitent l’écart entre gouvernants et gouvernés et redonnent confiance dans la vie publique. Des expériences comme la Convention citoyenne pour le climat ou les budgets participatifs locaux montrent que des citoyens informés peuvent débattre et trancher des sujets complexes.",
    },
    right: {
      label: "Parlementarisme",
      response:
        "La démocratie repose sur l’élection de représentants chargés de décider au nom du peuple, puis de rendre des comptes devant les électeurs. Confier chaque choix à des consultations directes risque de rendre l’action publique lente, instable et vulnérable aux passions du moment ou à la désinformation. Pour les parlementaristes, des élus qui travaillent à plein temps, s’entourent d’experts et débattent dans la durée prennent des décisions plus cohérentes, y compris quand elles sont impopulaires mais nécessaires. La force de ce modèle tient à la qualité du débat parlementaire, à la séparation des pouvoirs et à la sanction régulière des urnes.",
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
        "Punir ne suffit pas à rendre une société plus sûre ni plus juste. Une justice efficace cherche d’abord à comprendre les causes d’un acte, à réparer le tort causé à la victime et à offrir une véritable seconde chance à l’auteur. Pour les partisans de la justice réparatrice, la prison sèche, en coupant la personne de tout lien et de toute perspective, nourrit souvent la récidive. Mieux vaut investir dans la prévention, l’accompagnement social, la formation et les peines alternatives comme les travaux d’intérêt général ou la médiation entre victime et coupable. L’objectif final est la réinsertion, plus utile à tous que l’exclusion durable.",
    },
    right: {
      label: "Pénalisme répressif",
      response:
        "Sans sanction claire et appliquée, la loi perd toute autorité et les victimes ne sont pas reconnues. La première fonction de la justice est de protéger la société, de dissuader le passage à l’acte et de marquer une limite ferme entre ce qui est permis et ce qui ne l’est pas. Pour les tenants d’une ligne répressive, des peines certaines et suffisamment sévères, une réponse rapide et une exécution réelle des sanctions sont la condition de la sécurité et de la confiance dans les institutions. La fermeté n’exclut pas la réinsertion, mais elle passe d’abord par le respect de la règle et la protection des citoyens honnêtes.",
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
        "Les grands défis du siècle (climat, pandémies, fiscalité des multinationales, conflits armés) ignorent les frontières et ne peuvent être traités par un pays seul. Pour les internationalistes, la coopération entre nations et des règles communes, par exemple au sein de l’Union européenne, de l’ONU ou des accords climatiques, sont plus efficaces que le repli national. Accepter de partager une part de souveraineté permet d’obtenir en échange une protection collective, un marché commun ou la défense partagée des droits humains. Cette vision valorise la solidarité au-delà des nations et considère que les intérêts des peuples sont souvent mieux servis ensemble que séparément.",
    },
    right: {
      label: "Souverainisme",
      response:
        "Chaque peuple doit pouvoir décider librement de ses lois, de ses frontières et de son modèle de société, sans se voir imposer des règles par des instances qu’il ne contrôle pas. Pour les souverainistes, la démocratie n’a de sens que dans un cadre national, là où existe un peuple uni par une histoire et une langue, capable de demander des comptes à ses dirigeants. Transférer le pouvoir à des organisations supranationales éloigne la décision des citoyens et affaiblit leur capacité à choisir leur destin. Défendre la souveraineté, c’est préserver l’indépendance économique, le contrôle des frontières et la maîtrise des choix collectifs.",
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
        "Pour garantir l’égalité entre croyants des différentes confessions et non-croyants, l’État doit rester strictement neutre en matière religieuse. La religion relève de la conscience et de la sphère privée : chacun est libre de croire ou de ne pas croire, mais aucune doctrine ne doit s’imposer dans les lois, l’école publique ou les institutions communes. Pour les laïques, cette séparation protège à la fois la liberté de culte et la liberté de ne pas en avoir, et empêche qu’une majorité religieuse n’impose ses normes à tous. La neutralité de l’espace public est vue comme la condition d’une coexistence apaisée dans une société diverse.",
    },
    right: {
      label: "Spiritualisme politique",
      response:
        "Les traditions religieuses ont façonné la culture, le droit et la morale d’une société, et continuent d’offrir des repères utiles, notamment sur le sens de la vie, la solidarité ou la dignité humaine. Pour les tenants de cette vision, vouloir effacer totalement le religieux de l’espace public revient à appauvrir le lien social et à priver les citoyens d’une source de cohésion et de valeurs partagées. Reconnaître la place du fait religieux, dans le calendrier, le patrimoine ou le débat moral, n’interdit pas la tolérance : il s’agit d’assumer un héritage spirituel plutôt que de le reléguer entièrement à la sphère privée.",
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
        "Certaines injustices sont si profondément enracinées dans les structures économiques et politiques qu’aucune retouche partielle ne suffira à les corriger. Pour les révolutionnaires, espérer transformer un système qui produit lui-même les inégalités en l’aménageant à la marge revient à reculer indéfiniment le changement réel. Il faut parfois rompre franchement avec l’ordre existant, par un mouvement social d’ampleur ou une refondation institutionnelle, pour reconstruire sur de nouvelles bases plus égalitaires. Cette position assume que les avancées majeures de l’histoire, du suffrage universel aux droits sociaux, ont souvent été arrachées par des ruptures et des rapports de force, et non par de simples ajustements.",
    },
    right: {
      label: "Réformisme",
      response:
        "Les changements durables se construisent progressivement, par des réformes négociées et évaluées plutôt que par des ruptures brutales aux conséquences imprévisibles. Pour les réformistes, vouloir tout renverser d’un coup expose au chaos, à la violence et souvent à un résultat pire que le point de départ, comme l’ont montré de nombreuses révolutions. Mieux vaut améliorer le système existant étape par étape, en s’appuyant sur le compromis, le débat démocratique et l’expérimentation. Cette approche valorise la stabilité, la prudence et la capacité à corriger le tir : avancer sûrement, en préservant ce qui fonctionne, plutôt que de parier sur un grand soir aux promesses incertaines.",
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
        "Le travail ne devrait pas être le centre absolu de l’existence ni la mesure de la valeur d’une personne. Pour les anti-productivistes, l’obsession de la productivité et de la croissance épuise les individus comme la planète, au détriment du temps libre, des liens sociaux et des activités non marchandes (soin, culture, engagement, vie familiale). On peut viser une société où l’on travaille moins mais mieux, grâce à la réduction du temps de travail, au partage de l’emploi ou à des dispositifs comme le revenu universel. L’objectif est de libérer du temps et du sens, et de reconnaître que beaucoup d’activités utiles ne passent pas par un salaire.",
    },
    right: {
      label: "Travaillisme",
      response:
        "Le travail reste un pilier de l’épanouissement personnel et de la vie collective : il permet de contribuer à la société, d’acquérir des compétences, de se réaliser et de gagner légitimement son revenu. Pour les travaillistes, l’effort et le mérite doivent être valorisés, et le plein emploi demeure un objectif central, car le chômage prolongé fragilise autant l’économie que la dignité des personnes. Cette vision défend la valeur travail face à l’assistanat, tout en reconnaissant l’importance de bonnes conditions et d’une juste rémunération. Travailler, c’est aussi prendre part à un projet commun et financer, par ses cotisations, la solidarité dont chacun bénéficie.",
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
        "La liberté individuelle doit primer, même lorsqu’elle complique la tâche des autorités. Pour les libertaires, chaque restriction (surveillance généralisée, fichage, contrôles d’identité étendus, état d’urgence prolongé) doit rester l’exception, strictement encadrée et temporaire, car les pouvoirs accordés au nom de la sécurité reviennent rarement en arrière. L’histoire montre que la peur sert souvent à justifier des atteintes durables aux droits fondamentaux. Mieux vaut accepter une part de risque inhérente à une société libre que de sacrifier la vie privée, la liberté d’expression ou la présomption d’innocence. La protection ne doit jamais se construire au prix d’une société de surveillance.",
    },
    right: {
      label: "Securitarisme",
      response:
        "La sécurité est la première des libertés : sans protection contre la violence, le terrorisme ou la criminalité, les autres droits deviennent théoriques. Pour les tenants de cette vision, il est légitime que la collectivité accepte certaines restrictions (vidéosurveillance, renseignement, contrôles renforcés) lorsqu’elles permettent de prévenir des drames et de garantir l’ordre public. Ceux qui respectent la loi n’ont rien à craindre de ces mesures, qui visent d’abord à protéger les citoyens et à dissuader les menaces. L’équilibre penche ici du côté de la responsabilité collective : un État capable d’assurer la sûreté de tous est la condition d’une vie sociale paisible.",
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
        "Le progrès technique n’est pas neutre et mérite d’être évalué avant d’être adopté. Pour les technosceptiques, des innovations comme l’intelligence artificielle, la reconnaissance faciale ou la collecte massive de données peuvent accroître les inégalités, détruire des emplois, menacer la vie privée et concentrer un pouvoir immense entre les mains de quelques entreprises. L’automatisation profite rarement à ceux qu’elle remplace, et certaines technologies posent des questions éthiques majeures. Sans interdire le progrès, il s’agit de le soumettre au débat démocratique, au principe de précaution et à une régulation stricte, afin que la technique serve la société plutôt que de s’imposer à elle.",
    },
    right: {
      label: "Techno-optimisme",
      response:
        "L’innovation technologique est l’un des principaux moteurs de l’amélioration des conditions de vie : médecine, accès à l’information, productivité, énergies nouvelles. Pour les techno-optimistes, freiner le progrès par excès de précaution revient à se priver de solutions à des problèmes majeurs, du cancer au changement climatique, et à laisser d’autres pays prendre l’avance. Les craintes suscitées par chaque vague d’innovation, de l’imprimerie à Internet, se sont souvent révélées exagérées, tandis que les bénéfices, eux, ont été immenses. Plutôt que de brider la recherche, mieux vaut encourager son développement rapide et accompagner les transitions, en faisant confiance à la capacité humaine à s’adapter.",
    },
  },
];
