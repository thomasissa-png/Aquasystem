/**
 * Manifeste typé des réalisations RÉELLES Aqua System.
 *
 * SOURCE DES PHOTOS (HYP-04 — fallback validé fondateur, project-context.md) :
 * réalisations PROPRES d'Aqua System publiées sur
 * https://www.esprit-piscine.fr/aqua-system/ (originaux WordPress 1280×720,
 * suffixe `-400x400` retiré pour récupérer la pleine résolution).
 * aqua-system.fr a renvoyé 403 (bloqué) — source secondaire non exploitable.
 *
 * DROIT À L'IMAGE : [À CONFIRMER fondateur] — les photos sont des réalisations
 * Aqua System, mais l'autorisation de republication sur le site umbrella doit
 * être confirmée par Nicolas Berg avant mise en ligne (project-context.md Annexe B).
 * Crédits photo d'origine (esprit-piscine.fr) : Philippe Leroy, Fred Pieau,
 * Fred Delouvée selon les fichiers.
 *
 * RÈGLE ZÉRO INVENTION (CLAUDE.md n°2) :
 * - `type` et `title` sont DÉDUITS du contenu visuel de la photo (type de bassin),
 *   jamais d'une commune précise ni d'un détail de chantier inventé.
 * - Les champs éditoriaux (intention/réponse/exécution, prestations, zone précise)
 *   sont balisés `null` → rendus comme « fiche en cours de documentation »
 *   tant que Nicolas Berg ne les a pas fournis (site-copy WF-05b).
 *
 * Tailles WebP disponibles par photo : 1280w (hero/galerie), 800w (card), 400w (thumb).
 * Générées par scripts/build-realisation-images.mjs.
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
  /** Zone : seulement « Yvelines (78) / Hauts-de-Seine (92) » — large, non inventée. */
  zone: string;
  /** Photos associées (1 à 3). La première est la principale (hero fiche, card). */
  photos: RealisationPhoto[];
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
    title: 'Piscine à débordement en lisière de forêt, Yvelines',
    cardType: 'Piscine sur mesure',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'piscine-debordement-foret',
        alt: "Piscine à débordement bordée d'une terrasse en bois et d'une pelouse, plan d'eau ouvert sur une forêt de pins, mur en pierre, transats au bord — réalisation Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'projet-piscine-jardin-banquette',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine et jardin intégrés autour d’une terrasse, Yvelines',
    cardType: 'Projet complet eau + jardin',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'projet-piscine-jardin-banquette',
        alt: "Bassin rectangulaire en béton dans un jardin clos structuré, pelouse, banquette de terrasse en bois avec coussins, demeure ancienne en arrière-plan — projet complet eau et jardin Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-couloir-demeure-ancienne',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Bassin miroir devant une demeure de caractère, Yvelines',
    cardType: 'Projet complet eau + jardin',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'piscine-couloir-demeure-ancienne',
        alt: "Long bassin miroir face à une demeure ancienne en pierre et brique, grande pelouse, arbres adultes, reflet de la façade dans l'eau — projet complet eau et jardin Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-paroi-verre-travertin',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine à paroi vitrée et margelles en travertin, Yvelines',
    cardType: 'Piscine sur mesure',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'piscine-paroi-verre-travertin',
        alt: "Piscine surélevée à paroi vitrée transparente, margelles et muret en travertin clair, jardinières de graminées, terrasse bois et transats — réalisation Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-paroi-verre-pierre',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine à paroi vitrée en parement de pierre, Hauts-de-Seine',
    cardType: 'Piscine sur mesure',
    zone: 'Hauts-de-Seine (92)',
    photos: [
      {
        base: 'piscine-paroi-verre-pierre',
        alt: "Piscine surélevée à paroi de verre transparente, parement en pierre grise empilée, pelouse, salon de jardin et parasol devant une maison — réalisation Aqua System, Hauts-de-Seine (92)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-jardin-arbre',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Piscine intégrée dans un jardin arboré, Yvelines',
    cardType: 'Projet complet eau + jardin',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'piscine-jardin-arbre',
        alt: "Bassin sombre encadré de margelles claires, arbre planté en bord de bassin, terrasse bois, jardin dense et maison contemporaine, parasol orange — projet complet eau et jardin Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-terrasse-bois-plongee',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine et large terrasse en bois, Hauts-de-Seine',
    cardType: 'Piscine sur mesure',
    zone: 'Hauts-de-Seine (92)',
    photos: [
      {
        base: 'piscine-terrasse-bois-plongee',
        alt: "Vue plongeante sur un bassin rectangulaire bordé d'une vaste terrasse en bois, pelouse, transats et fauteuils design, végétation périphérique — réalisation Aqua System, Hauts-de-Seine (92)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-enterree-maison-brique',
    type: 'piscine_bien_etre',
    filters: ['piscine'],
    title: 'Piscine enterrée au pied d’une maison en brique, Hauts-de-Seine',
    cardType: 'Piscine sur mesure',
    zone: 'Hauts-de-Seine (92)',
    photos: [
      {
        base: 'piscine-enterree-maison-brique',
        alt: "Bassin à l'eau verte bordé de pierre, muret en brique, terrasse haute avec parasols, maison contemporaine en brique et bois, haie dense — réalisation Aqua System, Hauts-de-Seine (92)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'projet-bassin-jardin-paysage',
    type: 'projet_complet',
    filters: ['projet_complet', 'piscine', 'jardin_parc'],
    title: 'Bassin compact dans un jardin paysagé en terrasses, Hauts-de-Seine',
    cardType: 'Projet complet eau + jardin',
    zone: 'Hauts-de-Seine (92)',
    photos: [
      {
        base: 'projet-bassin-jardin-paysage',
        alt: "Petit bassin intégré dans un jardin paysagé en terrasses, murets ocre, emmarchements en bois, banquette à coussins, végétation luxuriante — projet complet eau et jardin Aqua System, Hauts-de-Seine (92)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'projet-pool-house-toit-vegetalise',
    type: 'projet_complet',
    filters: ['projet_complet', 'jardin_parc'],
    title: 'Pool-house à toiture végétalisée et jardin structuré, Yvelines',
    cardType: 'Projet complet eau + jardin',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'projet-pool-house-toit-vegetalise',
        alt: "Pavillon de piscine vitré à toiture végétalisée, passerelle vitrée au sol au-dessus de l'eau, jardin structuré avec massifs fleuris et pelouse — projet complet eau et jardin Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System — Architecte SKP',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-interieure-beton-baies',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Piscine intérieure en béton brut, ouverte sur le jardin, Yvelines',
    cardType: 'Espace bien-être',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'piscine-interieure-beton-baies',
        alt: "Piscine intérieure aux murs et plafond en béton brut, larges baies vitrées ouvertes sur le jardin, terrasse en bois, salon bas — réalisation Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-interieure-pierre-poutres',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Couloir de nage intérieur sous charpente bois, Yvelines',
    cardType: 'Espace bien-être',
    zone: 'Yvelines (78)',
    photos: [
      {
        base: 'piscine-interieure-pierre-poutres',
        alt: "Long couloir de nage intérieur, murs en pierre apparente, plafond à poutres de bois, dallage en travertin, baies vitrées sur le jardin, transats — réalisation Aqua System, Yvelines (78)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'piscine-interieure-veranda-soir',
    type: 'piscine_bien_etre',
    filters: ['piscine', 'spa_sauna'],
    title: 'Piscine intérieure sous véranda, ambiance de soirée, Hauts-de-Seine',
    cardType: 'Espace bien-être',
    zone: 'Hauts-de-Seine (92)',
    photos: [
      {
        base: 'piscine-interieure-veranda-soir',
        alt: "Piscine couverte sous une véranda à structure métallique noire, terrasse en bois, mur en pierre, éclairage chaud de soirée — réalisation Aqua System, Hauts-de-Seine (92)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
    prestations: null,
    intention: null,
    reponse: null,
    execution: null,
  },
  {
    slug: 'jardin-bassin-maison-bois',
    type: 'jardin_paysage',
    filters: ['jardin_parc', 'projet_complet', 'piscine'],
    title: 'Jardin paysagé et bassin de nage devant une maison bois, Hauts-de-Seine',
    cardType: 'Jardin & Parc',
    zone: 'Hauts-de-Seine (92)',
    photos: [
      {
        base: 'jardin-bassin-maison-bois',
        alt: "Long bassin de nage intégré dans une terrasse en bois, grande table conviviale, massif de bambous, maison contemporaine à bardage bois — jardin et bassin Aqua System, Hauts-de-Seine (92)",
        credit: 'esprit-piscine.fr / Aqua System',
      },
    ],
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
 * Le `title` éditorial inclut le suffixe « — Zone » et reste affiché en H1,
 * mais il dépasse 60 car. une fois le suffixe marque ajouté → tronqué en SERP.
 * On retire le suffixe de zone (« — Yvelines (78) » etc.) pour le <title> ;
 * combiné avec « — Réalisations » (14 car.) le total reste < 60. Si le tronc
 * reste trop long, on retombe sur le type de card (toujours court).
 */
export function shortTitle(r: Realisation): string {
  const core = r.title.replace(/\s*,\s*(Yvelines|Hauts-de-Seine).*$/u, '').trim();
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
