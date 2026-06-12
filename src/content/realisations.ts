/**
 * Manifeste typé des réalisations RÉELLES Aqua System.
 *
 * SOURCE DES PHOTOS :
 * 1. esprit-piscine.fr/aqua-system (fallback HYP-04, project-context.md) —
 *    réalisations PROPRES d'Aqua System (originaux WordPress 1280×720).
 * 2. aqua-system.fr/galerie (moisson D-27, 2026-06-12 — droits accordés
 *    fondateur « tu as mon accord pour tout utiliser »). Originaux 1920px
 *    sur cdn.website-editor.net : meilleure résolution + nouvelles réalisations
 *    absentes du premier set. Cf. dev-decisions.md D-27 pour le bilan
 *    récupérées / ajoutées / remplacées / écartées.
 *
 * DROIT À L'IMAGE : ACCORD GLOBAL fondateur (project-context.md, validations
 * 2026-06-12, §1). Crédits photo d'origine : Philippe Leroy, Fred Pieau.
 *
 * RÈGLE ZÉRO INVENTION (CLAUDE.md n°2) :
 * - `type` et `title` sont DÉDUITS du contenu visuel de la photo (type de bassin),
 *   jamais d'une commune précise ni d'un détail de chantier inventé.
 * - `zone` = « Ouest parisien » pour TOUTES les entrées : zone d'activité
 *   documentée (toujours vraie), JAMAIS une attribution départementale par
 *   réalisation (non vérifiée projet par projet). La commune/le département
 *   précis restent à confirmer par Nicolas Berg (docs/photos-a-fournir.md).
 * - `visualDescription` décrit UNIQUEMENT ce qui est visible sur la photo
 *   (matériaux, implantation, lumière, rapport au jardin/à la maison) — jamais
 *   d'intention client, de durée, de commune ni de technique non visible.
 * - Les champs éditoriaux (intention/réponse/exécution, prestations) sont
 *   balisés `null` → rendus comme « fiche en cours de documentation » tant que
 *   Nicolas Berg ne les a pas fournis (site-copy WF-05b).
 *
 * Tailles WebP disponibles par photo : 1280w (hero/galerie), 800w (card), 400w (thumb).
 * Générées par scripts/build-realisation-images.mjs (set initial) et
 * scripts/build-new-realisation-images.mjs (moisson galerie D-27).
 */

export type RealisationType =
  | 'piscine_bien_etre'
  | 'jardin_paysage'
  | 'projet_complet';

/** Filtres de la grille /realisations (WF-05 FilterBar). */
export type FilterValue =
  | 'tous'
  | 'piscine'
  | 'spa_sauna'
  | 'jardin_parc'
  | 'projet_complet';

export interface RealisationPhoto {
  /** Nom de base (sans suffixe de taille ni extension). */
  base: string;
  /** Description factuelle UNIQUE de la photo (slot [Photo] — jamais de doublon). */
  alt: string;
  /** Crédit photo d'origine (esprit-piscine.fr). */
  credit: string;
}

export interface Realisation {
  slug: string;
  type: RealisationType;
  /** Valeurs de filtre auxquelles cette réalisation répond (WF-05). */
  filters: Exclude<FilterValue, 'tous'>[];
  /** Titre FACTUEL générique (type de bassin déduit — jamais de commune précise). */
  title: string;
  /** Type affiché sur la card (site-copy WF-05). */
  cardType: string;
  /**
   * Zone : TOUJOURS « Ouest parisien » — zone d'activité documentée (toujours
   * vraie). Jamais une attribution départementale par réalisation (D-27).
   * Commune/département précis : [À CONFIRMER Nicolas Berg] par réalisation.
   */
  zone: string;
  /** Photos associées (1 à 3). La première est la principale (hero fiche, card). */
  photos: RealisationPhoto[];
  /**
   * Description éditoriale de CE QUI EST VISIBLE sur la photo principale
   * (matériaux, implantation, lumière, rapport au jardin/à la maison).
   * Ton brand-voice soutenu-accessible, 2-3 phrases, UNIQUE par fiche.
   * Zéro intention client / durée / commune / technique non visible (D-27).
   */
  visualDescription: string;
  /**
   * Champs éditoriaux RÉELS — `null` tant que non fournis par le fondateur.
   * [DONNÉES PROJET RÉEL : à compléter avec Nicolas] — template site-copy WF-05b.
   */
  prestations: string[] | null;
  intention: string | null;
  reponse: string | null;
  execution: string | null;
}

const IMG = '/images/realisations';

/** Construit le srcset multi-tailles d'une photo (WebP, images.unoptimized). */
export function photoSrc(base: string, size: '400w' | '800w' | '1280w'): string {
  return `${IMG}/${base}-${size}.webp`;
}

/**
 * Dérive la variante 800w (mobile, ~121 ko) d'un chemin photo généré par
 * `photoSrc`, quelle que soit sa taille d'origine. Utilisé par Hero/MediaSplit
 * pour servir une image plus légère sous 768px (perf P1 @infrastructure D7).
 * Retourne null si le chemin n'a pas le suffixe de taille attendu.
 */
export function toWidthVariant(
  src: string,
  size: '400w' | '800w' | '1280w',
): string | null {
  const replaced = src.replace(/-(400|800|1280)w\.webp$/, `-${size}.webp`);
  return replaced === src && !src.includes(`-${size}.webp`) ? null : replaced;
}

export const REALISATIONS: Realisation[] = [
  {
    slug: 'piscine-debordement-foret',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine à débordement en lisière de forêt',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-debordement-foret',
        alt: "Piscine à débordement bordée d'une terrasse en bois et d'une pelouse, plan d'eau ouvert sur une forêt de pins, mur en pierre, transats au bord — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "La lame de débordement disparaît dans une goulotte invisible le long du mur de pierre calcaire appareillée : l'eau semble continuer jusqu'à la forêt de pins, sans limite perçue. Ce parti pris suppose un terrain en dénivelé suffisant pour que le trop-plein soit géré par un bac tampon dissimulé, et une terrasse en bois qui absorbe la transition entre les niveaux. Si votre terrain présente une pente et une vue à valoriser, le débordement est souvent la réponse la plus juste.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'projet-piscine-jardin-banquette',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine et jardin intégrés autour d’une terrasse',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'projet-piscine-jardin-banquette',
        alt: "Bassin rectangulaire en béton dans un jardin clos structuré, pelouse, banquette de terrasse en bois avec coussins, demeure ancienne en arrière-plan — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le bassin à l'eau sombre est enchâssé dans une terrasse en bois multi-niveaux dont les margelles en grès gris affleurent le platelage : l'eau et le bois forment un seul plan horizontal, sans rupture. Concevoir ce type de transition demande de coordonner la hauteur finie du bassin, la cote de la terrasse et l'assise des marches au même moment, depuis le bureau d'études. Si vous souhaitez que la piscine disparaisse dans la continuité d'une terrasse, la question du niveau relatif des deux ouvrages se pose dès le plan.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-couloir-demeure-ancienne',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Bassin miroir devant une demeure de caractère',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-couloir-demeure-ancienne',
        alt: "Long bassin miroir face à une demeure ancienne en pierre et brique, grande pelouse, arbres adultes, reflet de la façade dans l'eau — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Devant la villa Belle-Époque, le bassin miroir est cerné de margelles en brique ancienne qui reprennent exactement le matériau de la façade : la continuité est totale, le bassin semble avoir toujours été là. Un effet miroir aussi net exige des tolérances de niveau millimétriques sur le pourtour de la plage, pour que l'eau affleure sans jamais déborder. Si votre demeure a du caractère, le choix de la margelle est ce qui fait qu'un bassin dialogue avec elle ou lui tourne le dos.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-paroi-verre-travertin',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine à paroi vitrée et margelles en travertin',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-paroi-verre-travertin',
        alt: "Piscine surélevée à paroi vitrée transparente, margelles et muret en travertin clair, jardinières de graminées, terrasse bois et transats — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le bassin est surélevé hors-sol sur un muret de travertin dont une face est remplacée par une paroi de verre : on voit le volume d'eau depuis le jardin, à hauteur d'œil. Ce type d'ouvrage implique un soubassement maçonné capable de porter la charge de l'eau et la pression exercée sur la vitre, les joints devant rester étanches sur la durée. Si vous envisagez un bassin compact intégré à l'architecture de la maison, le travertin et le verre offrent une densité visuelle difficile à atteindre avec d'autres matières.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-paroi-verre-pierre',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine à paroi vitrée en parement de pierre',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-paroi-verre-pierre',
        alt: "Piscine surélevée à paroi de verre transparente, parement en pierre grise empilée, pelouse, salon de jardin et parasol devant une maison — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le soubassement en pierre grise ardoisée, appareillée en assises régulières, porte une paroi de verre qui dévoile l'eau turquoise depuis la pelouse : le bassin surélevé s'offre à lire comme une sculpture. La pierre à strates donne au muret la même lisibilité que les couches géologiques d'un mur de jardin ancien — une cohérence entre le bâti et la nature du sol qu'on ne produit pas avec un enduit. Si votre propriété comporte déjà des murs en pierre naturelle, ce type de paroi de verre prolonge leur logique plutôt qu'elle ne la contredit.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-jardin-arbre',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine intégrée dans un jardin arboré',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-jardin-arbre',
        alt: "Bassin sombre encadré de margelles claires, jardin en contrebas, terrasse de bois, demeure ancienne en arrière-plan, banquette à coussins — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le jardin est strictement composé : muret enduit terracotta, buis taillés en boule, pelouse géométrique et bassin à margelles minérales sur un même axe, le tout dans l'enceinte d'un ancien mur de brique. La banquette en bois massif au premier plan est maçonnée dans la continuité de la terrasse, pas ajoutée après coup. Quand le bassin et le jardin sont conçus ensemble, le mobilier fixe trouve naturellement sa place dans la structure : c'est ce que permet un même bureau d'études pour les deux ouvrages.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-terrasse-bois-plongee',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine et large terrasse en bois',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-terrasse-bois-plongee',
        alt: "Vue plongeante sur un bassin rectangulaire bordé d'une vaste terrasse en bois, pelouse, transats et fauteuils design, végétation périphérique — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "La terrasse en bois clair s'étend de chaque côté du bassin en plusieurs plans décalés, les margelles en grès sombre se fondant dans le platelage sans saillie perceptible : l'ensemble est une seule surface travaillée. Ce résultat demande de définir la trame des lames de bois, la profondeur des margelles et la cote de fond de bassin dans un ordre précis, avant tout coulage. Si votre extérieur est aujourd'hui une succession de zones disparates, ce type d'ouvrage montre ce qu'une conception unifiée produit.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-enterree-maison-brique',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine enterrée au pied d’une maison en brique',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-enterree-maison-brique',
        alt: "Bassin à l'eau verte bordé de pierre, muret en brique, terrasse haute avec parasols, maison contemporaine en brique et bois, haie dense — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Un muret de brique maçonné en plein air rattrape le dénivelé entre la maison et la pelouse, le bassin en eau turquoise posé dans la poche ainsi créée, cerné d'une plage bois et d'un dallage minéral. Le bambou dense côté fond assure l'intimité sans réduire la luminosité, complétant le travail du muret. Si votre terrain présente un dénivelé à absorber, cette solution de soubassement appareillé montre qu'une contrainte de terrain peut devenir une écriture architecturale.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'projet-bassin-jardin-paysage',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Bassin dans un jardin paysagé en terrasses',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'projet-bassin-jardin-paysage',
        // Photo remplacée par version HD galerie (ARN26, 1920px) — vue d'ensemble.
        alt: "Bassin rectangulaire au cœur d'un jardin paysagé en terrasses, murets enduits ocre, haies basses taillées, banquette de bois à coussins au premier plan, demeures en arrière-plan — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le jardin est organisé en trois niveaux distincts tenus par des murets enduits couleur terracotta : terrasse bois en bas, pelouse et bassin au centre, zone de repos avec transats en haut contre le mur de végétation. La géométrie des buis en boule et des haies taillées sert à articuler chaque palier sans que rien ne semble forcé. Travailler un jardin en terrasses suppose de placer le bassin sur le bon niveau dès le plan : trop bas, il s'isole ; trop haut, il domine et perd la pelouse.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'projet-pool-house-toit-vegetalise',
    type: 'projet_complet',
    filters: ['projet_complet', 'jardin_parc'],
    title: 'Pool-house à toiture végétalisée et jardin structuré',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'projet-pool-house-toit-vegetalise',
        // Photo remplacée par version HD galerie (GIR60, 1920px) — passerelle vitrée frontale.
        alt: "Pavillon de piscine aux volumes blancs et baies vitrées, passerelle de verre posée au sol au-dessus de l'eau, massifs de rosiers rouges et bandes de pelouse de part et d'autre, lumière de fin de journée — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System — Architecte SKP',
      },
    ],
    visualDescription:
      "Le pool-house conçu par l'architecte SKP est composé de volumes blancs décalés reliés par une passerelle vitrée qui court au ras de la pelouse au-dessus du bassin couvert : on voit l'eau directement sous ses pieds. Cette passerelle est une verrière zénithale intégrée à la structure, pas un ajout décoratif, ce qui suppose une coordination étroite entre l'architecte, le bureau d'études piscine et le gros-œuvre. Si votre projet associe une architecture signée et un bassin couvert, la bonne question à poser en amont est : qui coordonne les deux ?",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-interieure-beton-baies',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Piscine intérieure en béton brut, ouverte sur le jardin',
    cardType: 'Espace bien-être',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-interieure-beton-baies',
        // Photo remplacée par version HD galerie (ABA10, 1920px) — bassin en eau, vue d'ensemble.
        alt: "Piscine intérieure aux murs et plafond en béton brut percé de puits de lumière, longues baies vitrées ouvertes sur le jardin de part et d'autre, contour en lames de bois, fauteuil et canapé bas en fond — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "La dalle de béton armé brut, visible en plafond avec ses traces de coffrage, est percée d'une trame de puits de lumière zénithaux qui projettent des carrés de soleil à la surface du couloir de nage. Les baies vitrées sur trois côtés évacuent l'humidité et maintiennent le lien visuel avec le jardin : en piscine intérieure, la maîtrise de l'hygrométrie et l'apport de lumière naturelle sont les deux contraintes qui conditionnent tous les autres choix. Si vous envisagez un espace de nage couvert et ouvert sur votre jardin, la question du traitement de l'air mérite d'être posée avant celle du revêtement.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-interieure-pierre-poutres',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Couloir de nage intérieur sous charpente bois',
    cardType: 'Espace bien-être',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-interieure-pierre-poutres',
        alt: "Long couloir de nage intérieur, murs en pierre apparente, plafond à poutres de bois, dallage en travertin, baies vitrées sur le jardin, transats — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le couloir de nage intérieur est délimité par des murs en moellons de pierre calcaire apparente et coiffé d'une charpente bois dont les solives rythment la longueur de la pièce ; le dallage en travertin clair unifie le sol du bord de bassin jusqu'aux chaises longues. Pierre, bois, travertin : ces matières supportent sans traitement spécifique l'atmosphère humide d'un espace de nage couvert, ce qui est précisément leur raison d'être ici. Si vous disposez d'un bâtiment existant ou d'une dépendance à reconvertir, ce type d'espace montre ce qu'une structure ancienne peut accueillir.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-interieure-veranda-soir',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Piscine intérieure sous véranda, ambiance de soirée',
    cardType: 'Espace bien-être',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-interieure-veranda-soir',
        // Photo remplacée par version HD galerie (SOL25, 1920px) — vue intérieure mur de pierre éclairé.
        alt: "Piscine couverte sous une véranda à charpente métallique noire et toit vitré incliné, mur en pierre ancienne mis en lumière, terrasse de bois ceinturant le bassin, eau bleutée, éclairage chaud de soirée — réalisation Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "La véranda à charpente métallique noire et toit vitré en deux pentes prolonge la maison et abrite le bassin sur sa plage de bois massif, le mur de moellons anciens servant de fond de scène éclairé en soirée. Ce type de structure métallique vitrée, adossée au bâti existant, est un ouvrage de second-œuvre qui demande d'articuler l'étanchéité de la jonction toit/mur, la ventilation et le chauffage du volume. Si vous souhaitez nager en toute saison sans construire un bâtiment à part entière, la véranda de piscine est la réponse architecturale la plus économe d'emprise.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'jardin-bassin-maison-bois',
    type: 'jardin_paysage',
    filters: ['jardin_parc', 'projet_complet', 'piscine'],
    title: 'Jardin paysagé et bassin de nage devant une maison bois',
    cardType: 'Jardin & Parc',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'jardin-bassin-maison-bois',
        alt: "Bassin de nage à l'eau sombre devant une maison à grandes baies et bardage bois, pelouse et terrasse de bois, jardin boisé dense, transats — jardin et bassin Aqua System, ouest parisien",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le bassin à l'eau sombre côtoie une maison mid-century à grandes baies vitrées et bardage bois foncé : les margelles en grès anthracite reprennent la palette de la façade, la terrasse en bois assure la continuité jusqu'aux baies de plain-pied. Ce dialogue entre la couleur d'eau et les matières de la maison n'est pas un hasard : la teinte du revêtement intérieur du bassin est le premier choix à faire, car elle détermine tout ce qu'on voit depuis les fenêtres. Si vous rénovez une maison contemporaine avec un projet de piscine, la cohérence de palette entre les deux ouvrages vaut mieux qu'un catalogue.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  // ── Réalisations ajoutées par la moisson galerie (D-27, 2026-06-12) ──────────
  {
    slug: 'piscine-nocturne-murets-eclaires',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine et terrasse éclairées à la tombée du jour',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-nocturne-murets-eclaires',
        alt: "Vue plongeante nocturne sur un bassin rectangulaire éclairé en bleu, terrasse minérale claire, murets et bandes de pelouse soulignés d'un éclairage indirect, mur de pierre ancienne en fond, banquette à coussins au premier plan — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "À la nuit tombée, la terrasse minérale et les murets enduits clairs sont révélés par une ligne de lumière indirecte qui souligne leur base : les buis taillés en boule deviennent des volumes, le bassin illuminé en bleu devient le centre optique de l'ensemble. Ce type de scénographie lumière se câble lors du gros-œuvre, les gaines passant sous les murets et les dalles avant coulage : c'est la raison pour laquelle l'éclairage d'extérieur ne s'ajoute pas en fin de chantier. Si vous envisagez votre jardin comme un espace de vie en soirée, les choix d'éclairage appartiennent au plan, pas aux finitions.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-terrasse-engazonnee-volet',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine d’angle bordée de pelouse et de terrasse',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-terrasse-engazonnee-volet',
        alt: "Bassin rectangulaire à l'eau sombre et volet immergé, margelles claires affleurant une pelouse rase, plage minérale et maison ocre à droite, haie taillée en fond — réalisation Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "Les margelles de pierre calcaire blanche affleurent au niveau de la pelouse, si bien que le bassin à l'eau sombre semble posé à même l'herbe : le volet immergé se loge sous les margelles et disparaît entièrement, sans coffre apparent. Un volet à plage immergée exige que la première marche du bassin soit conçue pour accueillir le coffre de roulement sous le niveau d'eau, ce qui se décide lors du dimensionnement du bassin. Si vous voulez que la couverture de votre piscine ne s'impose pas visuellement, il faut l'intégrer à la structure dès l'origine.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-terrasse-bois-mur-vegetal',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine sur terrasse bois adossée à un mur végétal',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-terrasse-bois-mur-vegetal',
        alt: "Bassin sombre encastré dans une large terrasse de bois, devant une maison contemporaine à lucarnes, assises colorées et bac planté au premier plan, hautes graminées et mur végétal de part et d'autre — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le couloir de nage en grès anthracite est encadré d'une terrasse en bois gris clair aux lames larges, avec une main courante en inox discret côté entrée : l'ensemble est compact, chaque centimètre est utilisé. Ce type de bassin allongé dans un espace contraint demande de calibrer la largeur utile de nage, la profondeur et la position des refoulements pour garantir un courant de nage réel, pas seulement une forme. Si votre propriété est limitée en surface mais que vous pratiquez la natation régulièrement, les proportions du couloir sont la variable à travailler en premier.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-pierre-demeure-beige',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Bassin de pierre claire devant une demeure de famille',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-pierre-demeure-beige',
        alt: "Bassin rectangulaire à margelles de pierre claire au milieu d'une grande pelouse, devant une demeure beige à lucarnes et volets, massifs et arbres de part et d'autre — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le bassin est centré dans la pelouse, ses margelles en pierre beige très claire donnant à l'ensemble une sobriété qui laisse toute la place à la demeure ancienne en fond de jardin. L'eau bleu-ciel clair trahit un revêtement de teinte pâle : la couleur d'eau est le reflet direct du choix de l'étanchéité intérieure, et ici elle a été choisie pour ne pas dominer le jardin. Si votre propriété a une architecture forte que vous souhaitez mettre en valeur plutôt qu'en concurrence, le bassin peut s'effacer — à condition que ce soit une décision consciente.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-pierre-mur-ancien',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Bassin à margelles de pierre le long d’un mur ancien',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-pierre-mur-ancien',
        alt: "Bassin rectangulaire aux margelles de pierre claire posé dans une pelouse, transats à rayures, vigne palissée et mur de pierre ancienne en fond, bouleau et grand conifère sur les côtés — réalisation Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "Le bassin en eau turquoise vive est bordé de larges margelles et d'une plage en pierre calcaire beige-crème, posées le long d'un mur de pierre ancienne où une vigne s'est palissée : la pierre du bassin et celle du mur sont de la même famille, séparées seulement par la pelouse. Choisir une margelle calcaire qui répond au mur existant n'est pas seulement esthétique : c'est s'assurer que la même teinte vieillit de la même façon, sans créer un décalage dans dix ans. Si votre jardin possède déjà des murs en pierre, la margelle est le joint entre deux patrimoines.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-mur-brique-jardin',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine et jardin adossés à un mur de brique',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-mur-brique-jardin',
        alt: "Bassin aux margelles claires longé d'un muret de bois bordant la pelouse, transats blancs alignés sur une plage gravillonnée, mur de brique et grand saule en arrière-plan — projet complet eau et jardin Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "La palissade de bois brut sépare la pelouse basse de la plage du bassin surélevée : c'est un muret de soutènement de terre maçonné derrière le bois, pas un simple habillage. Cette coexistence de deux niveaux de pelouse et d'une plage dallée autour d'un même bassin oblige à concevoir les relevés de terrain et les évacuations des eaux de pluie dès le plan de masse. Si votre jardin comporte plusieurs niveaux naturels, la piscine peut s'y inscrire sans que le terrain ne soit uniformisé.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'bassin-miroir-crepuscule',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Bassin miroir au crépuscule',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'bassin-miroir-crepuscule',
        alt: "Long bassin rectangulaire à l'eau immobile dans une grande pelouse au crépuscule, margelles minérales, banquette latérale soulignée d'un éclairage chaud, dépendances et arbres en silhouette à l'horizon — réalisation Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "Ce couloir de nage extérieur est très long, ses margelles en grès gris foncé réduites au strict nécessaire pour que la surface d'eau domine la pelouse comme un miroir horizontal. Une banquette éclairée en bande chaude côtoie la rive : l'éclairage rasant à cette heure révèle que les margelles affleurent exactement au niveau de l'herbe, sur tout le périmètre. Ce résultat suppose une mise en œuvre en deux temps : fondations et structure coulées au niveau calculé, puis margelles posées à la côte finie en s'alignant sur la hauteur du gazon. Si votre terrain est plat et que vous souhaitez un bassin qui s'efface dans le paysage, ce type de calage au sol mérite une conversation de plan.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'bassin-pierre-rosiers',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Bassin aux margelles de pierre et rosiers grimpants',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'bassin-pierre-rosiers',
        alt: "Gros plan sur l'angle d'un bassin à l'eau turquoise, margelles et plage en pierre claire, escalier immergé, transat à rayures, rosiers grimpants et mur de pierre ancienne en fond — réalisation Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "La plage et les margelles en pierre calcaire blanc-crème sont très larges, donnant au bord du bassin la générosité d'une terrasse à part entière ; dans l'angle, un escalier immergé à deux marches larges facilite l'entrée dans l'eau et offre une assise immergée pour une mi-saison. Maçonner un escalier immergé dans l'angle d'un bassin en béton armé se décide au ferraillage : les marches sont coulées dans la masse, pas posées après. Si vous avez des enfants ou envisagez d'utiliser le bassin comme espace de détente autant que de nage, la position et la largeur de l'escalier méritent d'être pensées avant la forme du bassin.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-fond-mobile-terrasse',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine à fond mobile sous terrasse bois',
    cardType: 'Piscine sur mesure',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'piscine-fond-mobile-terrasse',
        alt: "Bassin dont la surface est recouverte par une terrasse de bois affleurante (fond mobile remonté), margelles de pierre claire, massifs d'hortensias, maison à volets bleus et grilles métalliques de sécurité au premier plan — réalisation Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "Ce qu'on voit est une terrasse de bois ordinaire : des lames d'ipé posées sur une surface plane, deux poteaux inox discrets marquant l'accès, des hortensias de chaque côté. Sous ce platelage, le fond mobile est remonté au niveau des margelles en pierre claire et cache un bassin de pleine profondeur. Réaliser un fond mobile suppose d'intégrer le mécanisme de levage, son motoréducteur et les guides dans la structure béton du bassin avant coulage : l'ouvrage est avant tout mécanique et hydraulique. Si vous avez un terrain où l'espace extérieur sert autant de lieu de vie que de bassin, ce type d'ouvrage peut vous amener à ne pas choisir.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  // ── Création paysagère LTE (photo fondateur, 2026-06-12 — droits accordés) ───
  {
    slug: 'jardin-terrasses-plongee',
    type: 'projet_complet',
    filters: ['projet_complet', 'jardin_parc', 'piscine'],
    title: 'Jardin en terrasses étagées et couloir de nage',
    cardType: 'Projet complet eau + jardin',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'jardin-terrasses-plongee',
        alt: "Vue plongeante sur un jardin en terrasses étagées : terrasse en bois exotique et transats au bord d'un couloir de nage à l'eau sombre en haut, volées d'escaliers en pierre claire et massifs de graminées au centre, sol pavé et plantes graphiques en bas — création paysagère Les Terres Essentielles, ouest parisien",
        credit: 'Les Terres Essentielles',
      },
    ],
    visualDescription:
      "Vu de haut, le terrain se lit en plusieurs niveaux reliés par des volées d'escaliers en pierre claire : la terrasse en bois exotique et son couloir de nage à l'eau sombre occupent le palier haut, les paliers intermédiaires sont plantés de graminées et de vivaces, le sol pavé ferme le plan bas. Un jardin en pente comme celui-ci impose de tenir chaque niveau par un mur de soutènement et de caler les marches sur la cote finie de chaque palier, avant la plantation — l'ordre dans lequel les terrasses sont posées conditionne tout le reste. Si votre terrain présente un dénivelé marqué, l'étagement n'est pas une contrainte à effacer mais l'écriture même du jardin.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'bien-etre-eclairage-ambiance',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Espace bien-être intérieur en lumière d’ambiance',
    cardType: 'Espace bien-être',
    zone: 'Ouest parisien', // zone précise [À CONFIRMER Nicolas Berg]
    photos: [
      {
        base: 'bien-etre-eclairage-ambiance',
        alt: "Bassin intérieur en eau, parois enduites baignées d'une lumière d'ambiance verte, sol et plinthe sombres, suspensions noires au-dessus d'une rangée de transats blancs, porte vitrée au fond — réalisation Aqua System, ouest parisien",
        credit: 'aqua-system.fr / Aqua System',
      },
    ],
    visualDescription:
      "La lumière immergée verte inonde les parois et le plafond d'une teinte uniforme : le bassin couloir intérieur est ici un élément scénographique autant qu'un outil de nage, avec des suspensions design, des transats blancs épurés et un dallage anthracite mat. En piscine intérieure, la couleur de l'éclairage immergé peut être pilotée par domotique et modifie radicalement l'ambiance de la pièce selon les usages — un outil que l'on câble lors du gros-œuvre, pas en retouche. Si vous concevez un espace bien-être où la piscine et l'atmosphère forment un tout, l'éclairage chromatique est l'une des rares variables que vous pourrez ajuster à vie.",
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
];

/** Réalisations mises en avant sur l'accueil (3 phares, types variés). */
export const FEATURED_SLUGS = [
  'piscine-debordement-foret',
  // casting-visuels §5 swap 3 : remplace `piscine-couloir-demeure-ancienne`
  // (passée en hero accueil) — évite le doublon hero/card sur la même session.
  'piscine-enterree-maison-brique',
  'projet-piscine-jardin-banquette',
] as const;

export function getRealisation(slug: string): Realisation | undefined {
  return REALISATIONS.find((r) => r.slug === slug);
}

export function getFeatured(): Realisation[] {
  return FEATURED_SLUGS.map((s) => getRealisation(s)).filter(
    (r): r is Realisation => Boolean(r),
  );
}

/**
 * Titre court pour la balise <title> des fiches (SEO — INFO-SEO-1).
 * Les `title` n'incluent plus de suffixe de zone départementale (D-27 : zones
 * passées à « Ouest parisien », jamais affirmées dans le titre). On retire par
 * sécurité un éventuel suffixe géographique résiduel, puis on borne la longueur :
 * combiné avec « | Réalisations » (15 car.) le total doit rester < 60. Si le
 * tronc reste trop long, on retombe sur le type de card (toujours court).
 */
export function shortTitle(r: Realisation): string {
  const core = r.title
    .replace(/\s*,\s*(Yvelines|Hauts-de-Seine|ouest parisien).*$/iu, '')
    .trim();
  // « | Réalisations » = 15 car. → tronc max 44 pour rester STRICTEMENT < 60.
  return core.length <= 44 ? core : r.cardType;
}

/**
 * True si la fiche n'est PAS publiable (= sans contenu extractible minimal).
 *
 * Règle publiable (D-35, megalot SEO P0-01 / audit-seo T4) : une fiche avec une
 * `visualDescription` non vide EST indexable. Chaque réalisation possède une
 * `visualDescription` rédigée d'après la photo (D-27) → les 24 fiches sont donc
 * indexables (robots index + sitemap). Le contenu éditorial complet
 * (intention/réponse/exécution/prestations) reste un ENRICHISSEMENT futur, pas un
 * prérequis d'indexation : ces champs restent disponibles dans le manifeste pour
 * basculer la fiche sur le rendu FicheEditorial dès que Nicolas Berg les fournit.
 *
 * Le critère étant « visualDescription absente » (jamais le cas en pratique),
 * le mécanisme draft est neutralisé : aucune fiche n'est noindex aujourd'hui.
 */
export function isDraft(r: Realisation): boolean {
  return r.visualDescription.trim().length === 0;
}
