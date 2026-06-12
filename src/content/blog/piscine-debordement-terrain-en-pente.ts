import type { ContentBlock } from './types';

/**
 * A1 — Piscine à débordement : comment un terrain en pente devient un atout.
 * Source : docs/copy/blog/a1-debordement-terrain-pente.md (VALIDÉ).
 * Corps transcrit MOT POUR MOT. Le bloc « Regard de Nicolas Berg »
 * [CITATION À VALIDER NB] (entre les questions à poser et le CTA) est EXCLU —
 * citation en attente de validation NB (blog-program.md §4.2).
 */
export const a1Body: ContentBlock[] = [
  {
    kind: 'p',
    text: "Un terrain en pente, dans les Yvelines ou les Hauts-de-Seine, n'est pas un obstacle à une piscine à débordement. Dans la plupart des cas, c'est exactement le contraire. Le dénivelé crée la condition naturelle du débordement sans artifice. Ce que d'autres piscinistes présentent comme une contrainte à surmonter, nous l'abordons comme un parti pris de conception. Ce que ça implique techniquement, ce que ça change dans le résultat.",
  },

  { kind: 'h2', text: "Pourquoi la pente n'est pas un obstacle" },
  { kind: 'h3', text: 'Ce que la topographie permet' },
  {
    kind: 'geo',
    question:
      'Un terrain en pente est-il adapté à une piscine à débordement ?',
    answer:
      "Un terrain en pente est souvent plus favorable qu'un terrain plat pour une piscine à débordement. Sur terrain plat, la lame de débordement est entièrement construite par un travail sur les niveaux et les hauteurs de structure. Sur terrain incliné, le dénivelé oriente naturellement l'eau vers le point bas et crée la lame sans artifice. La pente devient un atout de conception.",
  },
  {
    kind: 'p',
    text: "Une piscine à débordement fonctionne sur un principe simple : l'eau déborde d'un ou plusieurs côtés dans une goulotte de récupération, créant une lame d'eau qui semble sans limite visuelle. Sur un terrain plat, cette lame est construite intégralement, par un travail sur les niveaux, les décrochements, les hauteurs de structure.",
  },
  {
    kind: 'p',
    text: "Sur un terrain en pente, le dénivelé fait une partie du travail. La lame de débordement s'oriente naturellement vers le point bas. L'eau semble se jeter dans le paysage — forêt, vallée, horizon dégagé — sans que l'ouvrage ait eu à le forcer. Le terrain, loin d'être un problème, devient un argument visuel que le bureau d'études intègre dès le premier plan.",
  },
  {
    kind: 'p',
    text: "Les propriétés en pente de l'ouest parisien — autour de Freneuse, Mantes-la-Jolie, Saint-Nom-la-Bretèche, Marnes-la-Coquette — offrent précisément ces configurations. Le dénivelé naturel donne à ces terrains un potentiel que les terrains plats n'ont pas.",
  },

  {
    kind: 'h3',
    text: 'La différence entre une piscine à débordement et une piscine miroir',
  },
  {
    kind: 'p',
    text: 'Ces deux ouvrages sont souvent confondus. Ils fonctionnent différemment et produisent des effets différents.',
  },
  {
    kind: 'def',
    term: 'Piscine à débordement',
    text: "l'eau déborde d'un ou plusieurs côtés dans une goulotte de récupération. La lame d'eau est visible, dynamique. Elle crée un effet de continuité vers l'horizon. Le débordement peut être orienté côté aval sur un terrain en pente.",
  },
  {
    kind: 'def',
    term: 'Piscine miroir',
    text: "l'eau affleure au ras de la plage sur tout le pourtour du bassin, sans cascade visible. La surface devient un miroir du ciel et de la végétation environnante. L'effet est statique, contemplatif. Sur terrain plat, c'est l'ouvrage le plus épuré visuellement.",
  },
  {
    kind: 'p',
    text: "Les deux ouvrages sont disponibles sur nos réalisations. Sur terrain en pente, le débordement côté aval est souvent la réponse la plus juste : il valorise le dénivelé au lieu de le masquer.",
  },

  { kind: 'h2', text: 'Les variables techniques qui comptent' },
  { kind: 'h3', text: 'La goulotte de récupération' },
  {
    kind: 'p',
    text: "La goulotte est l'élément technique central d'une piscine à débordement. Elle recueille l'eau qui déborde et la renvoie vers le bassin de compensation, puis vers le circuit de filtration. Son dimensionnement dépend de la surface du bassin, du débit de débordement, et de l'exposition au vent.",
  },
  {
    kind: 'p',
    text: "Sur terrain incliné, la goulotte est positionnée côté aval, là où la pente oriente naturellement l'eau. Ce positionnement simplifie parfois la conception : le dénivelé crée le tirant d'eau sans recours à une structure sur-élevée artificielle.",
  },
  {
    kind: 'p',
    text: "Le bassin de compensation — le bac tampon qui stocke l'eau en attente de recyclage — est intégré dans la structure. Son volume est calculé par notre bureau d'études en fonction de l'usage prévu et des conditions météorologiques locales.",
  },

  { kind: 'h3', text: 'La structure béton armé sur terrain incliné' },
  {
    kind: 'p',
    text: "Une piscine sur terrain en pente, surtout avec un débordement, est un ouvrage de génie civil avant d'être un ouvrage de piscine. Le terrain incliné peut créer des poussées latérales sur les parois du bassin. La nappe phréatique, fréquente dans certaines zones argileuses de l'ouest parisien, impose des précautions de ferraillage et d'étanchéité.",
  },
  {
    kind: 'p',
    text: "Notre bureau d'études réunit en interne la compétence technique piscine et la compétence génie civil. Les collaborateurs spécialisés génie civil dimensionnent les murs de soutènement, calculent les charges, et intègrent les contraintes du sous-sol au plan dès la conception. Ce n'est pas une sous-traitance — c'est un seul marché, un seul responsable, une seule garantie décennale.",
  },
  {
    kind: 'p',
    text: "Pour les propriétés de l'ouest parisien, cette organisation est souvent déterminante. Les terrains de Saint-Germain-en-Laye, de la vallée de la Seine ou du plateau des Yvelines présentent chacun des conditions spécifiques que trente ans de présence locale nous permettent de lire avant le premier sondage.",
  },

  { kind: 'h3', text: "L'intégration paysagère" },
  {
    kind: 'p',
    text: "Un terrain en pente crée des niveaux. Ces niveaux, une fois la piscine implantée, définissent des espaces naturels : une terrasse haute au niveau de la maison, une plage intermédiaire, un espace bas avec vue sur le bassin et le paysage. Ce sont autant d'occasions de concevoir un extérieur complet, cohérent, qui n'existe pas en catalogue.",
  },
  {
    kind: 'p',
    text: "C'est pourquoi nous concevons la piscine et le jardin depuis le même bureau d'études. La pente ne se règle pas après la piscine : elle se lit avant, et elle dicte l'organisation de l'espace dans son ensemble. En [partenariat avec Les Terres Essentielles](/jardins-paysage/), nous intégrons dès le départ les choix paysagers — plantations, cheminements, revêtements, niveaux — à la conception hydraulique et structurelle.",
  },

  { kind: 'h2', text: 'Notre réalisation : la lame sur la forêt de pins' },
  {
    kind: 'p',
    text: "Le projet commençait par une vue. Le propriétaire avait un terrain qui descendait vers une forêt de pins. Il voulait une piscine qui prolonge cette vue, pas une piscine qui la bloque.",
  },
  {
    kind: 'def',
    term: 'Intention',
    text: "Un bassin discret, orienté vers la forêt, dont l'eau semblerait se fondre dans le paysage. Pas de clôture de verre, pas d'ouvrage ostentatoire. La piscine comme prolongement naturel du terrain.",
  },
  {
    kind: 'def',
    term: 'Réponse',
    text: "Une piscine à débordement orientée côté aval, vers la forêt. La lame de débordement visible depuis la terrasse haute crée la continuité visuelle demandée. La goulotte est intégrée dans le soubassement, invisible depuis le bassin. Les margelles en travertin reprennent la teinte claire du terrain environnant.",
  },
  {
    kind: 'def',
    term: 'Exécution',
    text: "La structure béton armé a été conçue pour absorber la poussée du terrain côté amont. La plage bois multiplie les niveaux et fait la transition entre la terrasse de la maison et le bassin. Le dénivelé a guidé chaque décision, pas contraint.",
  },
  {
    kind: 'caption',
    text: "Réalisation Aqua System — photo publiée avec l'autorisation du propriétaire.",
  },

  { kind: 'h2', text: "Ce qui détermine le coût d'une piscine à débordement" },
  { kind: 'h3', text: 'Les variables réelles' },
  {
    kind: 'p',
    text: "Le coût d'une piscine à débordement sur terrain en pente dépend de plusieurs postes qui s'articulent :",
  },
  {
    kind: 'ul',
    items: [
      "La goulotte et le bassin de compensation : dimensionnement selon le débit, le volume, l'exposition",
      "Les pompes de récupération : circuit hydraulique dédié au retour de l'eau depuis la goulotte",
      'La structure génie civil : murs de soutènement, épaisseur des parois selon les charges latérales',
      'Les finitions : margelles, plage, revêtement intérieur — des choix qui varient considérablement dans la gamme',
      "L'intégration paysagère : terrasses, niveaux, cheminements conçus ensemble",
    ],
  },
  {
    kind: 'p',
    text: "Chaque ouvrage est différent. Une piscine à débordement sur un terrain légèrement incliné avec une vue dégagée n'a pas le même coût qu'un projet sur un fort dénivelé avec nappe phréatique. Ces variables se lisent sur le terrain, pas sur une liste de prix.",
  },
  {
    kind: 'p',
    text: 'Pour les fourchettes de marché sur les piscines sur mesure en béton armé, notre article [Ce qui fait le prix d’une piscine haut de gamme](/notre-regard/investissement-piscine-haut-de-gamme/) décortique les postes de coût en détail.',
  },

  { kind: 'h2', text: 'Les questions à poser à votre pisciniste' },
  {
    kind: 'p',
    text: "Avant d'engager un projet de piscine à débordement sur terrain en pente, quatre questions méritent une réponse précise :",
  },
  {
    kind: 'ol',
    items: [
      "Le génie civil est-il géré en interne ? Sur terrain complexe, la séparation entre la conception de la piscine et la conception structurelle est une source fréquente de conflits et de responsabilités diluées. Un bureau d'études qui maîtrise les deux, sous un seul marché, évite ce problème.",
      "La goulotte est-elle dimensionnée pour votre débit et votre exposition ? Une goulotte sous-dimensionnée déborde en dehors du bassin de compensation dans les conditions de vent. La note de calcul doit être explicite.",
      "Le jardin est-il pensé en même temps que la piscine ? Sur terrain en pente, les niveaux se décident ensemble. Revenir sur l'implantation des terrasses après la piscine signifie presque toujours des compromis.",
      "La garantie décennale couvre-t-elle l'intégralité de l'ouvrage, structure incluse ? Pour un bassin sur terrain incliné avec génie civil, la garantie décennale sur les parties structurelles est une protection réelle. Elle doit être explicitement dans le contrat.",
    ],
  },

  // [CITATION À VALIDER NB] — « Regard de Nicolas Berg » : citation en attente
  // de validation NB, EXCLUE du rendu (rien de non validé ne se publie).

  { kind: 'h2', text: 'Votre terrain en pente : parlons-en' },
  {
    kind: 'p',
    text: "Une [piscine à débordement sur mesure](/piscines-bien-etre/) sur un terrain incliné commence par une lecture du terrain. Pas par un catalogue, pas par un formulaire en ligne.",
  },
];
