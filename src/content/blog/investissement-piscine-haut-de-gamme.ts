import type { ContentBlock } from './types';

/**
 * A4 — Ce qui fait le prix d'une piscine haut de gamme : les vraies raisons.
 * Source : docs/copy/blog/a4-prix-piscine-haut-de-gamme.md (VALIDÉ).
 * Corps transcrit MOT POUR MOT. Le bloc « Regard de Nicolas Berg »
 * [CITATION À VALIDER NB] (avant le CTA final) est EXCLU — citation en attente
 * de validation NB. Le tableau de fourchettes du .md est rendu en liste
 * structurée (forme extractible GEO conservée — données publiques de marché,
 * jamais présentées comme les tarifs d'Aqua System).
 */
export const a4Body: ContentBlock[] = [
  {
    kind: 'p',
    text: "C'est la question que tout propriétaire se pose avant de lancer un projet. Pas pour négocier — pour comprendre. Parce que comprendre ce qui compose le coût d'une piscine sur mesure, c'est aussi comprendre ce qu'on achète et ce qu'on protège sur le long terme.",
  },
  {
    kind: 'p',
    text: "Ce guide ne donne pas de prix fermes. Le coût d'un ouvrage sur mesure dans les Yvelines et les Hauts-de-Seine dépend de chaque terrain, de chaque configuration, de chaque choix. Ce qu'il fait : décortiquer les variables réelles qui distinguent une piscine à 35 000 euros d'une piscine à 120 000 euros — et pourquoi cette différence existe.",
  },

  { kind: 'h2', text: "La structure : le poste qui ne se voit pas mais qui dure" },
  { kind: 'h3', text: 'Béton armé contre coque polyester' },
  {
    kind: 'p',
    text: "La structure conditionne tout ce qui vient après. Une piscine en béton armé et une piscine en coque polyester ne sont pas deux versions du même produit à des prix différents : ce sont deux ouvrages de nature distincte.",
  },
  {
    kind: 'p',
    text: "La coque polyester est une forme fabriquée en usine, posée dans une excavation. Elle est rapide à mettre en oeuvre, son coût initial est plus bas, ses formes sont standardisées. Elle convient à des terrains stables, des configurations simples, des budgets maîtrisés.",
  },
  {
    kind: 'p',
    text: "Le béton armé est coulé sur place, adapté à chaque terrain et à chaque forme. Il accepte tous les dénivelés, les ouvertures en débordement, les configurations intérieures, les parois de verre. Sa longévité structurelle est supérieure. Son coût initial reflète cette différence.",
  },
  {
    kind: 'p',
    text: "Pour une propriété de l'ouest parisien où la piscine est un ouvrage permanent, pensé pour durer au-delà d'une génération, le béton armé est la structure cohérente avec le niveau d'exigence attendu.",
  },

  { kind: 'h3', text: 'Le génie civil sur terrain complexe' },
  {
    kind: 'p',
    text: "Tous les terrains ne se valent pas. Une pente importante, une nappe phréatique haute, un sous-sol rocheux ou au contraire argileux : chacune de ces configurations modifie le calcul structurel et, par conséquent, le coût.",
  },
  {
    kind: 'p',
    text: "Sur un terrain en pente, le bassin nécessite des murs de soutènement dimensionnés pour absorber les poussées latérales du sol. Sur terrain avec nappe phréatique, le béton et le système d'étanchéité sont renforcés pour résister à la pression hydraulique inverse (le sol pousse sur le fond du bassin quand il est vide en hiver). Sur sous-sol rocheux, le terrassement lui-même peut représenter un poste de coût significatif.",
  },
  {
    kind: 'p',
    text: "Ces contraintes ne sont pas des aléas de chantier : elles se lisent au sol, en amont, lors de la phase de conception. Un bureau d'études qui intègre la compétence génie civil ne découvre pas ces contraintes pendant le chantier. Il les anticipe dans le prix.",
  },

  { kind: 'h3', text: 'Ce que le bureau d’études intégré change' },
  {
    kind: 'p',
    text: "Notre bureau d'études réunit en interne la conception de la piscine et la compétence génie civil. Ce n'est pas un détail organisationnel : c'est la garantie que le dimensionnement structurel est réalisé par les mêmes personnes qui conçoivent l'ouvrage, sous un seul marché, avec une seule garantie décennale.",
  },
  {
    kind: 'p',
    text: "Quand la conception structurelle est sous-traitée à une société séparée, la responsabilité se fragmente. En cas de problème structurel — fissure, déformation, infiltration — il faut identifier qui répond de quoi. Avec un marché unique, la réponse est simple.",
  },

  {
    kind: 'h2',
    text: 'Les finitions : là où la piscine haut de gamme se distingue visuellement',
  },
  { kind: 'h3', text: 'Le revêtement intérieur' },
  {
    kind: 'p',
    text: "La teinte du revêtement intérieur détermine la couleur de l'eau. C'est souvent ce que les propriétaires voient en premier dans les photos de réalisations : l'eau sombre et profonde d'une piscine en revêtement anthracite, l'eau turquoise d'un revêtement plus clair, l'eau quasi transparente d'un revêtement blanc.",
  },
  {
    kind: 'p',
    text: "Les revêtements disponibles vont de la membrane PVC standard à la mosaïque de verre en passant par la pierre naturelle et les revêtements minéraux. L'écart de coût entre un PVC uni et une mosaïque posée en plein eau est significatif, en raison du matériau lui-même et du temps de pose.",
  },
  {
    kind: 'p',
    text: "Le choix du revêtement est d'abord un choix esthétique — il définit l'ambiance visuelle du bassin. Il est aussi un choix de durabilité : certains revêtements sont plus sensibles aux chocs thermiques, aux traitements de l'eau, aux UV.",
  },

  { kind: 'h3', text: 'Les margelles et la plage' },
  {
    kind: 'p',
    text: "Les margelles bordent le bassin et font la jonction avec la plage. La plage est la surface aménagée qui entoure l'eau. Ces deux éléments représentent souvent une surface significative et un choix matière déterminant pour l'ambiance globale de l'espace.",
  },
  {
    kind: 'p',
    text: "Le travertin — pierre calcaire claire à surface légèrement alvéolée — est récurrent dans nos réalisations. Il s'accorde avec la couleur de l'eau, reste frais sous les pieds l'été, et vieillit bien. Le grès cérame offre une alternative contemporaine avec une gamme de formats et de finitions étendue. Le bois (platelage en ipé ou en essences thermotraitées) apporte de la chaleur autour des bassins où l'on souhaite une ambiance plus naturelle.",
  },
  {
    kind: 'p',
    text: "La gamme de prix de ces matériaux varie considérablement. La pose sur terrain en pente ou sur une surface non plane ajoute du temps et de la complexité.",
  },

  { kind: 'h3', text: 'L’escalier, les banquettes, les encastrements' },
  {
    kind: 'p',
    text: "Ces éléments font partie de l'ouvrage maçonné. Un escalier droit dans le coin du bassin a un coût de conception et de réalisation différent d'un escalier roman immergé qui suit la courbure du bassin sur toute une longueur. Une banquette sur la largeur est à la fois un élément de confort (assise dans l'eau) et un élément architectural qui modifie le volume apparent du bassin.",
  },
  {
    kind: 'p',
    text: "Les encastrements — projecteurs, buses de refoulement, prise balai, skimmers — sont dimensionnés selon la surface et la forme du bassin. Sur un ouvrage haut de gamme, l'implantation de ces éléments fait l'objet d'un plan précis pour qu'ils disparaissent visuellement dans l'ouvrage.",
  },

  { kind: 'h2', text: 'Les équipements : filtration, volet, éclairage' },
  { kind: 'h3', text: 'La filtration' },
  {
    kind: 'p',
    text: "Le circuit de filtration comprend la pompe, le filtre, le réchauffeur, et l'ensemble des équipements de traitement de l'eau. Sa qualité conditionne la clarté de l'eau et les coûts d'exploitation sur la durée.",
  },
  {
    kind: 'p',
    text: "Un circuit optimisé, avec une pompe à vitesse variable et un filtre bien dimensionné, consomme moins d'énergie et maintient une eau plus claire avec moins de produits de traitement. Sur la durée d'un ouvrage qui dure vingt à trente ans, la différence d'exploitation est réelle.",
  },
  {
    kind: 'p',
    text: "La filtration est un poste qui peut être réduit lors de la construction et qui se paie en consommation et en interventions dans les années suivantes — ou qui peut être conçu sérieusement dès le départ.",
  },

  { kind: 'h3', text: 'Le volet immergé' },
  {
    kind: 'p',
    text: "Le volet de piscine est un équipement de sécurité (conforme aux normes applicables), de confort (maintien de la température, réduction de l'évaporation) et d'esthétique. Les quatre grandes familles de volets immergés répondent à des besoins différents.",
  },
  {
    kind: 'p',
    text: "Le volet hors-sol, posé sur le bord du bassin, est le plus simple à installer et à rénover. Le volet immergé caillebotis intègre le coffre sous un caillebotis, hors du bassin. Le volet immergé à plage intégrée intègre le coffre dans la première marche ou banquette du bassin. Le volet fond de fosse, le plus discret, loge le coffre sous le fond du bassin : invisible depuis l'extérieur, il préserve les lignes de l'ouvrage.",
  },
  {
    kind: 'p',
    text: "L'écart de coût entre le volet hors-sol et le volet fond de fosse est significatif. Il traduit une différence de complexité de conception et d'intégration structurelle — le coffre fond de fosse doit être prévu dans les plans du bassin, il ne peut pas être ajouté après.",
  },

  { kind: 'h3', text: 'L’éclairage d’ambiance' },
  {
    kind: 'p',
    text: "L'éclairage d'une piscine haut de gamme n'est pas un projecteur unique au fond du bassin. C'est une scénographie qui joue sur la couleur de l'eau, les reflets sur les surfaces environnantes, la lisibilité de l'espace la nuit.",
  },
  {
    kind: 'p',
    text: "Plusieurs de nos réalisations intègrent un éclairage immergé multipoints, complété par un éclairage indirect des murets ou des margelles. La lumière froide qui remonte d'un bassin à l'eau sombre produit un effet très différent de la lumière chaude qui souligne les volumes.",
  },
  {
    kind: 'p',
    text: "Cet investissement dans l'éclairage transforme l'usage du bassin, qui devient un espace de vie nocturne, pas seulement un bassin de baignade.",
  },

  {
    kind: 'h2',
    text: 'Le type d’ouvrage : pourquoi un débordement, un miroir ou un fond mobile coûtent plus',
  },
  {
    kind: 'p',
    text: "Une piscine standard rectangulaire enterrée est l'ouvrage de référence. Dès qu'on s'en écarte, des équipements et des contraintes de conception s'ajoutent.",
  },
  {
    kind: 'def',
    term: 'La piscine à débordement',
    text: "nécessite une goulotte de récupération, un bassin de compensation, et une ou plusieurs pompes de récupération dédiées au circuit de débordement. La conception hydraulique est plus complexe.",
  },
  {
    kind: 'def',
    term: 'La piscine miroir',
    text: "exige une précision millimétrique sur le niveau d'eau de tout le pourtour. Le moindre défaut de niveau se voit. La conception et l'exécution sont plus exigeantes.",
  },
  {
    kind: 'def',
    term: 'La piscine à fond mobile',
    text: "intègre un mécanisme motorisé qui soulève et abaisse le plancher du bassin. Ce mécanisme est conçu en amont, intégré dans la structure, et nécessite un entretien spécifique. On ne l'ajoute pas à une piscine existante.",
  },
  {
    kind: 'p',
    text: "Ces ouvrages coûtent plus non parce qu'ils sont plus beaux — mais parce qu'ils sont plus complexes à concevoir et à réaliser, et que la complexité se paie dans la durée.",
  },

  { kind: 'h2', text: 'Ce que la garantie décennale comprend' },
  {
    kind: 'p',
    text: "La garantie décennale est la responsabilité légale du constructeur sur l'ouvrage pendant dix ans après la réception. Elle couvre les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination.",
  },
  {
    kind: 'p',
    text: "Pour une piscine en béton armé construite par un interlocuteur unique qui porte à la fois la conception et l'exécution, cette garantie s'applique à l'ensemble : structure, étanchéité, équipements intégrés au gros-oeuvre.",
  },
  {
    kind: 'p',
    text: "La garantie décennale n'est pas une clause de style dans un contrat. Pour un ouvrage à 70 000 ou 120 000 euros, c'est une protection réelle sur dix ans. Elle suppose que le constructeur sera encore là dans dix ans pour y répondre — ce qui n'est pas le cas de tous les intervenants du marché.",
  },
  {
    kind: 'p',
    text: "Aqua System est présent dans le 78 et le 92 depuis plus de 30 ans. Les piscines que nous avons construites il y a quinze ans, nous en assurons encore l'entretien.",
  },

  { kind: 'h2', text: 'Fourchettes indicatives : données publiques 2026' },
  {
    kind: 'p',
    text: "Ces fourchettes sont des données de marché issues de sources sectorielles publiques (travaux.com, comparateurs sectoriels, publications professionnelles — consultées en juin 2026). Elles permettent de calibrer un projet, pas d'estimer un ouvrage spécifique. Le coût réel de votre projet dépend de votre terrain, de vos choix de finitions et d'équipements, et de la configuration de l'ouvrage.",
  },
  {
    kind: 'ul',
    items: [
      'Piscine béton sur mesure, configuration standard : 30 000 à 60 000 euros TTC',
      'Piscine béton haut de gamme (débordement, miroir, finitions pierre) : 70 000 à 120 000 euros TTC',
      'Piscine béton + fond mobile sur mesure : 70 000 à 120 000 euros TTC',
    ],
  },
  {
    kind: 'p',
    text: "Ces fourchettes ne sont pas les tarifs d'Aqua System. Elles reflètent l'état du marché tel qu'il est documenté par les sources sectorielles. Chaque projet fait l'objet d'une conception spécifique et d'un chiffrage adapté.",
  },

  // [CITATION À VALIDER NB] — « Regard de Nicolas Berg » : EXCLU du rendu
  // (citation en attente de validation NB).

  {
    kind: 'h2',
    text: 'Ce que vaut votre projet : une conversation, pas un formulaire en ligne',
  },
  {
    kind: 'p',
    text: "Comprendre les postes de coût est un début. Comprendre ce que valent ces postes pour votre terrain, votre configuration, votre vision : c'est une autre conversation.",
  },
  {
    kind: 'p',
    text: "Pour les propriétaires qui envisagent un projet dans les Yvelines ou les Hauts-de-Seine, notre approche commence par une lecture du terrain, pas par une liste de prix. Retrouvez nos [réalisations de piscines sur mesure](/piscines-bien-etre/) pour calibrer le niveau d'ouvrage, et [notre bureau d'études intégré, de la vision au suivi annuel,](/la-maison/) pour comprendre ce qu'un interlocuteur unique change dans le résultat.",
  },
];
