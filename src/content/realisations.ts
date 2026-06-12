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
      "Le plan d'eau s'arrête net sur la forêt de pins, sa lame de débordement prolongée par le reflet sombre des arbres. Une terrasse en bois et une bande de pelouse rase tiennent le bassin contre un long mur de pierre claire, où quelques transats s'alignent.",
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
      "Le bassin rectangulaire occupe le cœur d'un jardin clos, posé entre une pelouse tondue et une terrasse de bois ponctuée d'un parasol rouge. Les massifs de graminées et de bambous referment l'espace, tandis que les toits d'une demeure ancienne apparaissent au-dessus de la végétation.",
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
      "Face à une demeure de caractère aux façades enduites et aux volets bordeaux, le bassin renvoie la silhouette de la maison dans une eau parfaitement calme. La pelouse vient au ras des margelles, encadrée d'arbres adultes qui tiennent le jardin à distance de toute clôture visible.",
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
      "Surélevé, le bassin laisse voir son eau à travers une paroi de verre encadrée de travertin clair. Des jardinières de graminées et de buis taillés courent au pied du muret, prolongées par une terrasse de bois où patientent quelques assises basses, le tout adossé à la baie vitrée de la maison.",
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
      "Le bassin émerge de la pelouse, sa paroi de verre posée sur un soubassement de pierre grise appareillée en strates. Derrière, un salon de jardin abrité d'un parasol installe une zone de détente au pied de la maison, la lumière rasante accusant le relief du parement.",
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
      "Vu de haut, le bassin à l'eau sombre est cerné de margelles claires et d'une terrasse de bois qui descend vers une pelouse en contrebas. Une banquette maçonnée garnie de coussins suit le retrait du jardin, les toits d'une demeure ancienne fermant l'horizon derrière une haie épaisse.",
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
      "Prise en surplomb, l'image révèle un bassin rectangulaire enchâssé dans une vaste terrasse de bois qui se déploie en plusieurs niveaux. Des fauteuils filaires et des plantes en pot ponctuent le platelage, qu'une pelouse et un rideau d'arbres viennent ceinturer.",
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
      "Adossé à un muret de brique qui rattrape le dénivelé du terrain, le bassin à l'eau verte est ceint de margelles de pierre. Une terrasse haute équipée de transats domine le jardin, où la brique et le bois de la maison répondent à une haie dense qui clôt la parcelle.",
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
      "Le jardin se lit en plusieurs paliers tenus par des murets enduits d'ocre, le bassin rectangulaire calé sur le niveau intermédiaire entre des haies basses taillées au cordeau. Au premier plan, une longue banquette de bois garnie de coussins prolonge la terrasse, ouverte sur les toits du voisinage.",
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
      "Des volumes blancs décalés s'ouvrent par de larges baies sur le bassin abrité, reliés au jardin par une passerelle de verre affleurant la pelouse au-dessus de l'eau. De part et d'autre du cheminement, des rosiers rouges et des bandes engazonnées soulignent la géométrie, que la lumière de fin de journée vient réchauffer.",
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
      "Le béton brut habille murs et plafond, ce dernier percé d'une trame régulière de puits de lumière qui se reflètent à la surface du bassin. Des baies vitrées courent de chaque côté, ouvrant la pièce sur le jardin, tandis qu'un liseré de lames de bois adoucit le pourtour de l'eau jusqu'à un coin salon bas.",
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
      "Le couloir de nage file sous une charpente de bois apparente, encadré de murs en moellons de pierre où s'ouvrent de hautes fenêtres. Un dallage de travertin clair court le long du bassin jusqu'à des transats alignés, la pierre et le bois réchauffant la longueur de la pièce.",
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
      "Sous une véranda à charpente noire et toit vitré incliné, le bassin baigne dans une lumière de soirée qui détache la pierre ancienne d'un mur en fond. Le platelage de bois ceinture l'eau bleutée, des appliques chaudes posant des halos sur les moellons et sur les baies sombres.",
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
      "Le bassin à l'eau sombre se love au pied d'une maison à grandes baies coiffée d'un bardage de bois patiné, posé sur une pelouse que cernent des arbres adultes. La terrasse de bois et quelques transats tiennent la rive côté maison, le jardin boisé refermant complètement la perspective.",
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
      "À la tombée du jour, le bassin rayonne d'un bleu profond au centre d'une terrasse minérale claire. Un éclairage indirect souligne le pied des murets et les bandes de pelouse, détachant en arrière-plan un mur de pierre ancienne tendu de treillages, tandis qu'une banquette à coussins occupe le premier plan.",
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
      "Le bassin à l'eau sombre, équipé d'un volet immergé sous ses margelles claires, est posé à fleur d'une pelouse rase qui vient lécher la pierre. À droite, une plage minérale longe une maison aux enduits ocre, l'ensemble contenu par une haie taillée et un mur de clôture coloré.",
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
      "Le bassin à l'eau sombre s'encastre dans une large terrasse de bois qui se déploie devant une maison à lucarnes ouverte de plain-pied. De hautes graminées et un rideau de verdure ferment les côtés, pendant qu'au premier plan une assise basse et un bac planté animent le platelage.",
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
      "Au centre d'une vaste pelouse, le bassin aux margelles de pierre claire fait face à une demeure beige coiffée de lucarnes. Des massifs et des arbres adultes encadrent la perspective, laissant la maison et son reflet capter toute la lumière du jardin.",
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
      "Le bassin aux margelles de pierre claire repose à même la pelouse, le long d'un mur de pierre ancienne où court une vigne palissée. Un bouleau au feuillage léger et un grand conifère encadrent la scène, deux transats rayés posés sur une plage minérale en retrait.",
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
      "Un muret de rondins de bois sépare la pelouse de la plage du bassin, où quatre transats blancs s'alignent face à l'eau. Derrière, un mur de brique et le feuillage retombant d'un grand saule referment le jardin, la lumière filtrant à travers les arbres.",
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
      "Au crépuscule, le long bassin tend une surface parfaitement immobile au milieu d'une grande pelouse, ses margelles minérales nettes sur l'herbe. Une banquette latérale soulignée d'un éclairage chaud accompagne la rive, tandis que dépendances et arbres se découpent en silhouette sur le ciel encore clair.",
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
      "Cadré sur un angle, le bassin déploie une eau turquoise très claire d'où émerge un escalier immergé aux marches généreuses. La margelle et la plage de pierre claire conduisent à un transat rayé, sur fond de rosiers grimpants en fleurs et d'un mur de pierre ancienne.",
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
      "La surface du bassin disparaît sous un platelage de bois affleurant, le fond mobile remonté transformant l'eau en terrasse praticable au ras des margelles de pierre claire. Des massifs d'hortensias et une maison à volets bleus encadrent la scène, deux fines colonnes métalliques marquant l'accès.",
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
      "Dans une pièce aux enduits sombres, le bassin diffuse une lumière d'ambiance verte qui se propage sur les murs et la surface de l'eau. Une rangée de transats blancs s'aligne sous de larges suspensions noires, face à une porte vitrée qui referme l'espace sur son atmosphère feutrée.",
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
 * combiné avec « — Réalisations » (15 car.) le total doit rester < 60. Si le
 * tronc reste trop long, on retombe sur le type de card (toujours court).
 */
export function shortTitle(r: Realisation): string {
  const core = r.title
    .replace(/\s*,\s*(Yvelines|Hauts-de-Seine|ouest parisien).*$/iu, '')
    .trim();
  // « — Réalisations » = 15 car. → tronc max 44 pour rester STRICTEMENT < 60.
  return core.length <= 44 ? core : r.cardType;
}

/** True si la fiche n'a encore AUCUNE donnée éditoriale réelle. */
export function isDraft(r: Realisation): boolean {
  return (
    r.intention === null &&
    r.reponse === null &&
    r.execution === null &&
    r.prestations === null
  );
}
