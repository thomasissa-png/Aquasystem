import type { ContentBlock } from './types';

/**
 * A2 — Piscine intérieure : ce que l'hygrométrie impose (et ce que personne
 * ne dit). Source : docs/copy/blog/a2-piscine-interieure-hygrometrie.md (VALIDÉ).
 * Corps transcrit MOT POUR MOT. Le bloc « Nicolas Berg » [CITATION À VALIDER NB]
 * (avant le CTA final) est EXCLU — citation en attente de validation NB.
 * Le Trophée d'Or FPP 2024 (piscine intérieure) est un claim PROUVÉ
 * (geo-strategy.md §2.1 + organizationJsonLd.award) — conservé.
 */
export const a2Body: ContentBlock[] = [
  {
    kind: 'p',
    text: "L'erreur la plus courante dans un projet de piscine intérieure : concentrer toute l'attention sur le bassin et négliger l'air qui l'entoure. Une piscine intérieure génère une évaporation permanente. Sans traitement de l'air dimensionné depuis la conception, les dégradations commencent dans les deux à trois premières années : moisissures, condensation sur les menuiseries, détérioration des structures bois et béton. Nous le voyons sur les chantiers de rénovation. Ce guide explique ce que l'hygrométrie impose, pourquoi c'est l'enjeu n°1 d'un projet de piscine intérieure sur mesure dans les Yvelines (78) et les Hauts-de-Seine (92), et ce que quatre réalisations nous ont appris.",
  },

  { kind: 'h2', text: 'La piscine intérieure : un ouvrage à part entière' },
  { kind: 'h3', text: "Ce qui la distingue d'une piscine extérieure couverte" },
  {
    kind: 'p',
    text: "Une piscine extérieure couverte — abri bas, abri haut, véranda posée sur un bassin existant — est un ouvrage qui protège. Une piscine intérieure est autre chose : c'est un ouvrage mixte, à mi-chemin entre la construction de piscine et la construction de bâtiment. Le bassin est intégré au bâti. Les deux sont indissociables, et leurs contraintes se croisent : l'eau influe sur l'air, l'air influe sur les structures, les structures encadrent l'eau.",
  },
  {
    kind: 'p',
    text: "C'est pourquoi le bureau d'études qui conçoit une piscine intérieure doit raisonner sur l'ensemble, pas sur le seul bassin. Chez Aqua System, nos collaborateurs génie civil travaillent sur les deux dimensions depuis le premier plan.",
  },

  { kind: 'h3', text: 'Les quatre configurations possibles' },
  {
    kind: 'geo',
    question:
      "Quelles sont les configurations d'une piscine intérieure ?",
    answer:
      "Quatre grandes configurations existent : intégrée à la maison principale (sous une aile du bâti existant), dans un bâtiment dédié construit pour l'occasion, sous un abri adossé à la maison, ou dans une véranda spécifiquement dimensionnée pour accueillir un bassin. Chaque configuration impose des contraintes différentes en termes de structure, de ventilation et de traitement de l'air.",
  },
  {
    kind: 'def',
    term: 'Intégrée à la maison principale',
    text: "Le bassin est conçu dans une pièce de la maison existante ou en extension directe. La gestion thermique et hydrique est la plus complexe : les échanges avec le reste de la maison doivent être maîtrisés.",
  },
  {
    kind: 'def',
    term: 'Bâtiment dédié',
    text: "Un bâtiment construit pour la piscine, indépendant ou relié par un passage couvert. C'est la configuration qui offre le plus de liberté architecturale et la meilleure maîtrise des enjeux hygriques.",
  },
  {
    kind: 'def',
    term: 'Abri adossé',
    text: "Structure légère (charpente acier ou aluminium) adossée à la maison. Économique à construire, mais les performances thermiques et hygriques demandent une attention particulière aux matériaux.",
  },
  {
    kind: 'def',
    term: 'Véranda piscine',
    text: "La véranda est dimensionnée pour accueillir le bassin, avec des vitrages adaptés à l'environnement humide. La gestion des condensations sur les parois vitrées est le point critique.",
  },

  { kind: 'h2', text: "L'hygrométrie : la contrainte n°1" },
  { kind: 'h3', text: "Ce que produit une piscine intérieure dans l'air" },
  {
    kind: 'geo',
    question: "Qu'est-ce que l'hygrométrie d'une piscine intérieure ?",
    answer:
      "L'hygrométrie désigne le taux d'humidité relative de l'air dans l'espace qui contient le bassin. Une piscine intérieure en usage génère une évaporation continue : la surface d'eau exposée, la température de l'eau et la température ambiante créent un flux d'humidité permanent dans l'air. Sans déshumidification adaptée, le taux d'humidité relative dépasse rapidement les niveaux acceptables pour la conservation des structures et des finitions.",
  },
  {
    kind: 'p',
    text: "L'évaporation d'un bassin dépend de trois facteurs : la surface d'eau exposée, l'écart de température entre l'eau et l'air ambiant, et l'intensité d'usage. Plus le bassin est grand, plus l'eau est chaude, plus le bassin est utilisé : plus l'évaporation est élevée. C'est le bureau d'études qui calcule ce débit d'évaporation en amont, pour dimensionner le système de traitement de l'air en conséquence.",
  },
  {
    kind: 'p',
    text: "Ce calcul ne s'improvise pas après coup. Il se fait avant le premier plan.",
  },

  { kind: 'h3', text: 'Ce que ça fait sans déshumidification adaptée' },
  {
    kind: 'geo',
    question:
      "Quelles sont les conséquences d'une hygrométrie non maîtrisée dans une piscine intérieure ?",
    answer:
      "Un taux d'humidité excessive dans un espace piscine intérieur entraîne plusieurs types de dégradation : condensation sur les surfaces vitrées (buée permanente, traces calcaires, dégradation des joints), moisissures sur les murs et plafonds (béton, bois de charpente), corrosion accélérée des menuiseries aluminium, et détérioration à long terme des matériaux poreux exposés. Ces dégradations débutent dans les deux à trois premières années si le système de traitement de l'air est sous-dimensionné ou absent.",
  },
  {
    kind: 'p',
    text: "Sur les chantiers de rénovation, nous voyons régulièrement des piscines intérieures construites sans déshumidification intégrée dès la conception. Les propriétaires ont ajouté des déshumidificateurs mobiles ou fixes après coup. Le résultat est rarement satisfaisant : un appareil rajouté en rattrapage n'est pas dimensionné pour l'espace, il ne pilote pas la ventilation, et sa position ne correspond pas au flux d'air naturel de la pièce.",
  },
  {
    kind: 'p',
    text: "Les matériaux les plus sensibles à l'excès d'humidité dans un espace piscine : le bois de charpente (gonflement, pourrissement à terme), les menuiseries aluminium (corrosion des profils non traités pour l'environnement chloré), les enduits et peintures murales (cloquage, décollage), les surfaces vitrées (condensation permanente en surface froide).",
  },

  { kind: 'h3', text: 'Comment on dimensionne la déshumidification' },
  {
    kind: 'p',
    text: "Le dimensionnement du système de traitement de l'air repose sur le calcul du débit d'évaporation du bassin, le volume d'air de l'espace, les apports de chaleur extérieure (vitrages, orientation), et l'usage prévu (fréquence, nombre d'utilisateurs). C'est ce calcul que réalise le bureau d'études en amont — pas l'installateur de déshumidificateur après la construction.",
  },
  {
    kind: 'p',
    text: "La déshumidification d'une piscine intérieure ne se résume pas à un appareil. C'est un système : déshumidificateur dimensionné, bouches de ventilation positionnées pour balayer les zones à risque (vitrages, parois froides), régulation automatique avec sonde hygrométrique. Ce système est intégré au projet dès la phase de conception, pas ajouté en corps de travaux séparé.",
  },

  { kind: 'h2', text: 'Ce que nos quatre réalisations nous ont appris' },
  {
    kind: 'p',
    text: "Aqua System a réalisé quatre piscines intérieures dans les Yvelines et les Hauts-de-Seine. Chacune a posé des questions différentes.",
  },
  {
    kind: 'def',
    term: 'Piscine en béton brut avec baies vitrées',
    text: "Parti pris architectural affirmé : murs et plafond en béton brut apparent, puits de lumière zénithal, baies vitrées sur un côté. La contrainte principale : les grandes surfaces vitrées sont des parois froides. En hiver, l'écart de température entre l'air chaud et humide du bassin et la paroi froide crée une condensation importante. La solution : vitrages à isolation thermique renforcée et flux de déshumidification dirigé spécifiquement vers les parois vitrées. Ce que cette réalisation nous a appris : le choix architectural (vitrage, béton, orientation) influe directement sur le dimensionnement du traitement de l'air. Les deux ne peuvent pas être décidés séparément.",
  },
  {
    kind: 'def',
    term: 'Piscine en pierre naturelle avec charpente bois apparente',
    text: "La charpente bois apparente, si elle confère un caractère remarquable à l'espace, est le matériau le plus vulnérable à l'humidité. Une charpente bois dans un espace piscine intérieur doit être traitée, protégée, et surtout : l'hygrométrie de l'air doit être maintenue dans une plage stricte. Ce que cette réalisation nous a appris : le choix du matériau de charpente conditionne les niveaux d'humidité à maintenir, donc le système de traitement de l'air. Le couloir de nage intégré à cette réalisation imposait aussi un dimensionnement thermique du bassin soigné.",
  },
  {
    kind: 'def',
    term: 'Piscine sous véranda le soir',
    text: "La configuration véranda pose la question des échanges thermiques nocturnes : le soir, les vitrages refroidissent rapidement, l'écart de température avec l'air humide du bassin est maximal. Ce que cette réalisation nous a appris : la régulation du traitement de l'air doit être dynamique, pas fixe. Un système à régulation automatique par sonde hygrométrique est indispensable dans cette configuration.",
  },
  {
    kind: 'def',
    term: "Espace bien-être avec éclairage d'ambiance",
    text: "La scénographie lumière — éclairage immergé, éclairage indirect des murs, variation de couleur — est un registre à part entière dans la conception d'un espace bien-être. Ce que cette réalisation nous a appris : l'éclairage ne se rajoute pas à un espace conçu sans lui. Les encastrements, les gaines, la position des appareils sont intégrés au gros-œuvre. La conception lumière, comme le traitement de l'air, se décide au bureau d'études.",
  },

  { kind: 'h2', text: "Le Trophée d'Or FPP 2024 : ce que la Fédération distingue" },
  {
    kind: 'p',
    text: "Aqua System a remporté le Trophée d'Or de la piscine intérieure aux Trophées de la Piscine et du Spa FPP 2024, décernés par la Fédération des Professionnels de la Piscine. Ce prix est attribué par un jury professionnel sur des critères techniques et esthétiques — il distingue des réalisations, pas des déclarations.",
  },
  {
    kind: 'p',
    text: "Ce que cette distinction signifie concrètement pour un propriétaire : une réalisation de piscine intérieure a été jugée, par des pairs, comme représentative de ce qui se fait de mieux dans la construction. Pas une autoproclamation. Une évaluation par le secteur.",
  },
  {
    kind: 'p',
    text: "Aqua System est également membre Propiscines Certifié (FPP) et détient la certification Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial ». Ces distinctions sont vérifiables.",
  },

  {
    kind: 'h2',
    text: 'Les questions à poser avant de lancer un projet de piscine intérieure',
  },
  {
    kind: 'p',
    text: "Un projet de piscine intérieure bien conduit commence par les bonnes questions. En voici cinq qui permettent de distinguer un prestataire qui maîtrise le sujet.",
  },
  {
    kind: 'def',
    term: "Le traitement de l'air est-il dimensionné dans les plans ?",
    text: "Si votre interlocuteur ne vous parle pas de déshumidification lors de la première conversation sur votre projet de piscine intérieure, posez la question directement. La réponse doit être précise : calcul du débit d'évaporation, positionnement des bouches, régulation automatique. Pas un appareil rajouté après coup.",
  },
  {
    kind: 'def',
    term: "La charpente est-elle prévue pour le chargement et l'humidité ?",
    text: "Le bois de charpente exposé à un environnement chloré et humide demande un traitement spécifique. Si vous optez pour une charpente apparente (poutres bois, structure visible), demandez quel traitement est prévu et quelle hygrométrie le système doit maintenir pour préserver le bois.",
  },
  {
    kind: 'def',
    term: 'Quel revêtement pour la longévité dans un contexte humide ?',
    text: "Le revêtement intérieur du bassin (sa couleur, sa texture) influe sur la perception de l'espace. Mais dans un contexte de piscine intérieure, il faut aussi raisonner sur la longévité des matériaux des parois extérieures au bassin : enduits, carrelages, pierres.",
  },
  {
    kind: 'def',
    term: "Le chauffage de l'eau est-il intégré au système de chauffage de la maison ?",
    text: "Une piscine intérieure bien conçue n'est pas un bassin chauffé de façon autonome : le système thermique est pensé en lien avec celui de la maison. L'énergie de déshumidification peut être récupérée pour le chauffage. Ce couplage réduit la consommation énergétique globale.",
  },
  {
    kind: 'def',
    term: 'Qui porte la garantie décennale sur le bâtiment et le bassin ensemble ?',
    text: "C'est la question décisive. Avec un interlocuteur unique et un marché unique, une seule garantie décennale couvre l'ensemble : la structure du bassin et le bâtiment qui l'abrite. Avec deux prestataires distincts (pisciniste + constructeur), les responsabilités se fragmentent et les litiges deviennent complexes.",
  },

  // [CITATION À VALIDER NB] — « Nicolas Berg, gérant d’Aqua System » : EXCLU
  // du rendu (citation en attente de validation NB).

  {
    kind: 'p',
    text: "Un projet de piscine intérieure dans les Yvelines ou les Hauts-de-Seine mérite une conversation avant les plans. Nos [réalisations de piscines intérieures](/piscines-bien-etre/) sont accessibles en portfolio. Notre [bureau d'études intégré, de la conception à l'entretien](/la-maison/), porte l'ensemble du projet depuis le premier plan.",
  },
];
