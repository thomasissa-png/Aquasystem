import type { ContentBlock } from './types';

/**
 * A6 — Rénover une piscine haut de gamme : quand et pourquoi.
 * Source : docs/copy/blog/a6-renovation-haut-de-gamme.md (VALIDÉ).
 * Corps transcrit MOT POUR MOT. Le bloc « Nicolas Berg » [CITATION À VALIDER NB]
 * (avant le CTA final) est EXCLU — citation en attente de validation NB.
 * Formulation LTE conforme legal-audit.md §B.
 */
export const a6Body: ContentBlock[] = [
  {
    kind: 'p',
    text: "Une piscine en béton armé bien construite dure. Pas indéfiniment. Après dix à quinze ans, certains signes ne trompent pas. Pas tous les signes qu'on voit circuler sur internet : certains sont des alarmes réelles, d'autres signalent un entretien insuffisant qu'on confond trop vite avec une usure structurelle. Ce guide distingue les deux : ce qui impose vraiment une rénovation, ce qui se règle autrement, et pourquoi l'automne est la fenêtre à ne pas manquer pour intervenir efficacement.",
  },

  { kind: 'h2', text: 'Les signes qui imposent une rénovation' },
  {
    kind: 'geo',
    question: 'Quand faut-il rénover une piscine ?',
    answer:
      "Une rénovation s'impose quand au moins un de ces signaux est présent : fissures structurelles dans le bassin (distinctes des micro-fissures superficielles du revêtement), revêtement en fin de vie (liner décollé ou percé, carrelage qui se désolidarise, PVC décoloré ou déformé), perte d'eau anormale vérifiée par le test du seau, ou équipements structurellement obsolètes (filtration sous-dimensionnée, absence de dispositif de sécurité). Ces signaux ne se règlent pas par un entretien renforcé : ils nécessitent une intervention sur l'ouvrage.",
  },
  {
    kind: 'h3',
    text: 'Les fissures structurelles, distinctes des micro-fissures superficielles',
  },
  {
    kind: 'p',
    text: "Première chose à comprendre : toutes les fissures ne sont pas des fissures structurelles. Une piscine en béton armé peut présenter des micro-fissures superficielles dans son revêtement — PVC armé, carrelage, ou enduit — sans que la structure soit compromise. Ces micro-fissures résultent souvent de mouvements thermiques normaux ou d'un vieillissement du revêtement seul.",
  },
  {
    kind: 'p',
    text: "Une fissure structurelle, c'est autre chose : elle traverse l'ouvrage, elle évolue dans le temps, elle s'accompagne souvent d'une perte d'eau mesurable. Sur une piscine ancienne, les fissures structurelles se manifestent généralement dans les angles, en bas des parois, ou à la jonction entre le fond et les murs. Ce sont ces fissures qui imposent une intervention sur le béton, pas seulement sur le revêtement.",
  },
  {
    kind: 'p',
    text: "Pour distinguer les deux, le test le plus fiable reste l'observation dans le temps : une micro-fissure superficielle ne progresse pas. Une fissure structurelle, si.",
  },

  { kind: 'h3', text: 'Le revêtement en fin de vie' },
  {
    kind: 'p',
    text: "Un liner décollé ou percé, un carrelage qui se désolidarise par plaques, un PVC armé décoloré ou devenu poreux : ce sont les signes d'un revêtement qui a atteint sa durée de vie. Selon les matériaux et les conditions d'usage, un revêtement PVC dure entre huit et douze ans ; un carrelage bien posé peut tenir vingt ans ou davantage si la structure ne bouge pas.",
  },
  {
    kind: 'p',
    text: "Un revêtement en fin de vie n'est pas une catastrophe structurelle. Mais il s'accompagne souvent d'une perte d'étanchéité progressive et, à terme, d'infiltrations dans le béton sous-jacent. Intervenir sur le revêtement au bon moment, avant que les infiltrations n'attaquent la structure, est toujours moins coûteux qu'attendre.",
  },

  { kind: 'h3', text: "Les défauts d'étanchéité : le test du seau" },
  {
    kind: 'p',
    text: "La perte d'eau est normale en été : l'évaporation d'un bassin est réelle, surtout par temps chaud et venteux. La question est de distinguer l'évaporation d'une fuite. Le test du seau est simple et fiable.",
  },
  {
    kind: 'geo',
    question:
      'Comment faire le test du seau pour détecter une fuite de piscine ?',
    answer:
      "Remplir un seau d'eau et le poser sur la première marche du bassin, au niveau de l'eau. Marquer le niveau d'eau dans le seau et dans le bassin. Attendre 24 heures (pompe en marche, les mêmes conditions que d'habitude). Si le bassin a perdu davantage d'eau que le seau — qui perd uniquement par évaporation — il y a une fuite. Ce test simple permet de distinguer l'évaporation normale d'une perte d'eau anormale.",
  },
  {
    kind: 'p',
    text: "Une perte de plus de deux centimètres par jour en l'absence de vent excessif et de fortes chaleurs justifie une investigation plus poussée.",
  },

  { kind: 'h3', text: 'Les équipements devenus obsolètes' },
  {
    kind: 'p',
    text: "Une piscine construite il y a quinze ans a été équipée avec les technologies disponibles à l'époque. La filtration, le volet, l'éclairage : ces équipements vieillissent différemment selon les conditions d'usage et d'entretien.",
  },
  {
    kind: 'p',
    text: "Une filtration sous-dimensionnée ou vétuste ne maintient plus la qualité de l'eau dans les normes. Un volet hors-sol datant de 2008 peut ne plus être conforme à la norme NF P90-308 (sécurité des piscines privées enterrées) — la rénovation est l'occasion de vérifier la conformité du dispositif en place et, si nécessaire, de le remplacer. L'absence de tout dispositif de sécurité agréé (volet, barrière, alarme ou abri) est, depuis la loi de 2004, une obligation légale pour les piscines privées enterrées. Une rénovation est l'occasion naturelle de mettre à niveau ces équipements.",
  },

  { kind: 'h2', text: 'Ce que la rénovation permet, au-delà du revêtement' },
  {
    kind: 'p',
    text: "La rénovation d'une piscine haut de gamme n'est pas une réparation. C'est une remise à niveau — souvent une transformation réelle de l'ouvrage.",
  },

  { kind: 'h3', text: 'Repenser le revêtement : le retour des matériaux nobles' },
  {
    kind: 'p',
    text: "La tendance observée sur les rénovations de 2025 et 2026 : le retour de la mosaïque et de la pierre naturelle comme revêtements intérieurs ou comme finitions de plage et de margelles. Après une décennie de dominance du PVC armé en gris anthracite ou en bleu nuit, les propriétaires qui rénovent expriment une demande forte pour des matériaux qui résistent à la mode.",
  },
  {
    kind: 'p',
    text: "Le travertin en margelles, la mosaïque en revêtement de bassin, la pierre naturelle en plage : ces matériaux ont une longévité supérieure au PVC armé et une cohérence esthétique avec les propriétés haut de gamme de l'ouest parisien. Ils coûtent davantage à la pose. Ils durent davantage et ils se bonifiront dans le temps.",
  },

  { kind: 'h3', text: 'Intégrer des équipements manquants' },
  {
    kind: 'p',
    text: "Une rénovation est l'occasion la plus naturelle pour intégrer ce qui manquait à l'ouvrage initial. Trois équipements reviennent fréquemment dans les projets de rénovation que nous réalisons dans le 78 et le 92.",
  },
  {
    kind: 'def',
    term: 'Le volet immergé fond de fosse',
    text: "Le plus discret des volets : le coffre est noyé dans le fond du bassin, invisible. En position fermée, la surface du bassin est couverte sans aucun élément visible depuis la plage. Cette famille de volet est inaccessible sur un bassin existant non prévu pour l'accueillir — sauf rénovation complète qui permet d'intégrer le coffre dans la structure. C'est une décision à prendre au moment de la rénovation structurelle.",
  },
  {
    kind: 'def',
    term: "L'éclairage d'ambiance",
    text: "Scénographie lumière immergée, éclairage indirect des parois, variation de couleur et d'intensité : l'éclairage transforme un bassin la nuit. Sur une piscine existante sans éclairage ou avec un éclairage datant de dix ans, une rénovation permet de repenser entièrement ce registre. Les encastrements sont intégrés au nouveau revêtement, les gaines tirées lors de la remise à sec du bassin.",
  },
  {
    kind: 'def',
    term: 'La régulation automatique',
    text: "Un système de régulation automatique du traitement de l'eau — analyse des paramètres, injection dosée — réduit la consommation de produits et maintient une qualité d'eau constante sans intervention quotidienne. C'est un équipement qui n'existait pas ou coûtait très cher il y a quinze ans. Il est aujourd'hui accessible et fiable.",
  },

  { kind: 'h3', text: "Repenser l'abord : plage, margelles, intégration paysagère" },
  {
    kind: 'p',
    text: "Le bassin est rarement seul. La plage, les margelles, les abords minéraux et végétaux : une rénovation du bassin est l'occasion naturelle de repenser l'ensemble.",
  },
  {
    kind: 'p',
    text: "Une plage en pierre naturelle ou en travertin qui a vieilli peut être refaite lors de la rénovation du bassin, avec des matériaux cohérents avec le nouveau revêtement choisi. Les margelles, si elles sont en béton brossé ou en pierre qui s'est dégradée, peuvent être remplacées par des matériaux nobles : travertin, grès cérame, pierre calcaire.",
  },
  {
    kind: 'p',
    text: "Aqua System travaille, en partenariat avec Les Terres Essentielles, sur les abords minéraux des piscines rénovées dans les Yvelines et les Hauts-de-Seine. La distribution Kei-Stone (dallages et margelles en pierre naturelle) assure la cohérence des matériaux entre le bassin et les cheminements de la propriété.",
  },

  { kind: 'h2', text: "Pourquoi l'automne est la bonne saison" },
  {
    kind: 'geo',
    question: 'Quelle est la meilleure saison pour rénover une piscine ?',
    answer:
      "L'automne — de septembre à novembre — est la fenêtre idéale pour une rénovation de piscine. La logique est simple : le bassin vient de finir la saison de baignade, il peut être mis hors service sans manquer de temps de natation. Les chantiers sont disponibles. Les travaux réalisés en automne et en hiver permettent de profiter du bassin rénové dès le printemps suivant. Les propriétaires qui décident en octobre ont leur piscine prête en mai. Ceux qui décident en mai ont raté la saison.",
  },
  {
    kind: 'p',
    text: "C'est une logique de flux de chantiers. Un bassin rénové en automne ne monopolise pas les équipes en plein été. Les matériaux posés ont le temps de sécher et de se stabiliser avant les premières mises en eau du printemps. Les délais de livraison des matériaux (carrelage, pierre naturelle, équipements) sont plus courts hors saison.",
  },
  {
    kind: 'p',
    text: "Et pour le propriétaire : décider en octobre, c'est avoir du temps pour choisir les matériaux, valider les options d'équipements, et prendre une décision sans la pression d'un été qui approche.",
  },

  { kind: 'h2', text: 'Le cas particulier de la rénovation haut de gamme' },
  {
    kind: 'p',
    text: "Rénover une piscine haut de gamme, ce n'est pas seulement remettre à neuf ce qui s'est dégradé. C'est l'occasion de remettre l'ouvrage au niveau de ce qu'il devrait être — au niveau de la propriété.",
  },
  {
    kind: 'p',
    text: "Une propriété qui a évolué — agrandissement, travaux de jardin, rénovation de la maison — mérite que sa piscine soit cohérente avec ce qu'elle est devenue. Un bassin avec un revêtement PVC bleu clair datant de 2009 peut devenir, après rénovation, un bassin en mosaïque noire ou en pierre naturelle qui répond à l'architecture repensée de la maison.",
  },
  {
    kind: 'p',
    text: "C'est cet angle que nous défendons : la rénovation comme mise à niveau, pas comme réparation. Un volet immergé fond de fosse là où il y avait un volet hors-sol vieillissant. Un éclairage de scénographie là où il y avait deux spots d'origine. Des margelles en travertin là où il y avait du béton brossé.",
  },
  {
    kind: 'p',
    text: "La rénovation n'est pas le retour à l'état initial. C'est l'occasion de faire mieux.",
  },

  { kind: 'h2', text: "Ce qu'Aqua System prend en charge dans une rénovation" },
  {
    kind: 'p',
    text: "La [rénovation de piscine dans les Yvelines et les Hauts-de-Seine](/piscines-bien-etre/) est une activité à part entière d'Aqua System. Elle couvre l'ensemble de l'ouvrage : diagnostic initial, étanchéité, revêtement, équipements (volet, éclairage, filtration, régulation), et abords si inclus dans le projet.",
  },
  {
    kind: 'p',
    text: "Interlocuteur unique et marché unique : un seul contrat avec une seule entreprise qui engage sa responsabilité sur l'ensemble de la rénovation. La garantie décennale couvre les parties structurelles réalisées. Aqua System assure également le suivi annuel des piscines rénovées dans le cadre d'un contrat d'entretien.",
  },
  {
    kind: 'p',
    text: "Près de 350 piscines sont actuellement suivies par Aqua System dans l'ouest parisien. Sur ces piscines, certaines ont été construites par nos équipes il y a vingt ans. D'autres ont été rénovées et confiées à notre service d'entretien. La continuité de la relation — connaître l'ouvrage, connaître son historique — est un avantage réel dans la conduite d'une rénovation.",
  },

  // [CITATION À VALIDER NB] — « Nicolas Berg, fondateur Aqua System » : EXCLU
  // du rendu (citation en attente de validation NB).

  {
    kind: 'p',
    text: "Votre piscine montre des signes ? L'automne est le bon moment pour y répondre. Aqua System peut réaliser un diagnostic et vous accompagner dans la définition du périmètre de rénovation — avec honnêteté sur ce qui est nécessaire et ce qui ne l'est pas.",
  },
];
