/**
 * Manifeste typé des articles du blog « Notre regard » (/notre-regard).
 *
 * SOURCES (toutes validées) :
 * - Architecture : docs/seo/blog-program.md §1 (URL, JSON-LD, AuthorBlock, RSS,
 *   teaser accueil ≥ 2 articles, footer).
 * - Corps + frontmatter : docs/copy/blog/a[1-6].md (VALIDÉS, corrections
 *   adversariales appliquées — docs/seo/blog-validation-croisee.md).
 *
 * IMAGES HERO : mapping vers nos photos de réalisations existantes (pas de
 * génération — brief LOT BLOG 2/2). Vérifié : chaque `heroBase` existe dans
 * /public/images/realisations/ et dans REALISATIONS (src/content/realisations.ts).
 *
 * DATES (échelonnement « programme en cours » — tous publiés en ligne au
 * lancement, datés dans l'ORDRE de publication du programme A1, A4, A5, A2,
 * A3, A6, à 15 jours d'intervalle, en REMONTANT depuis le jour du lancement.
 * JAMAIS de date future (retour fondateur 2026-06-12 + pénalité SEO) :
 *   A1 2026-03-29 · A4 2026-04-13 · A5 2026-04-28 · A2 2026-05-13 ·
 *   A3 2026-05-28 · A6 2026-06-12 — prochain article : ~2026-06-27.
 *
 * CITATIONS [CITATION À VALIDER NB] : EXCLUES du rendu (non validées). Voir le
 * commentaire dédié dans chaque fichier src/content/blog/<slug>.ts.
 */
import type { ContentBlock } from './blog/types';
import type { BlogCategory } from './blog-categories';
import { a1Body } from './blog/piscine-debordement-terrain-en-pente';
import { a4Body } from './blog/investissement-piscine-haut-de-gamme';
import { a5Body } from './blog/piscine-jardin-concevoir-ensemble';
import { a2Body } from './blog/piscine-interieure-guide-complet';
import { a3Body } from './blog/fond-mobile-terrasse-piscine';
import { a6Body } from './blog/renovation-piscine-haut-de-gamme';

export interface Article {
  slug: string;
  /** Titre éditorial (H1 + card). */
  title: string;
  /** <title> de la page — frontmatter meta_title. Jamais de cadratin. */
  metaTitle: string;
  /** Meta description — frontmatter meta_description (≤ 155 car.). */
  metaDescription: string;
  /** Requête(s) cible(s) SEO — frontmatter requete_cible (documentaire). */
  requeteCible: string;
  /** Catégorie éditoriale (taxonomie blog-categories.ts) — filtre + eyebrow. */
  category: BlogCategory;
  /** Date de publication ISO (YYYY-MM-DD) — pilote tri, JSON-LD, RSS. */
  datePublished: string;
  /**
   * Base de la photo de réalisation servant de hero (sans suffixe de taille).
   * Doit exister dans /public/images/realisations/<base>-{400,800,1280}w.webp.
   */
  heroBase: string;
  /** Alt descriptif du hero (factuel — décrit la photo). */
  heroAlt: string;
  /** Accroche 2 phrases extraites de l'intro (card + meta og + excerpt). */
  excerpt: string;
  /** Corps en blocs structurés (parse du .md, citations NB exclues). */
  body: ContentBlock[];
  /**
   * FAQ de fin d'article (R-10 re-audit SEO) — 2-3 Q/R rendues en bloc visible
   * « Questions fréquentes » + FAQPage JSON-LD (@id `/notre-regard/<slug>/#faq`).
   * RÈGLE ZÉRO INVENTION : chaque réponse est une reformulation/condensation
   * STRICTE du corps de CE MÊME article (l'article y répond déjà), 2-4 phrases,
   * auto-contenue. Aucun fait/chiffre/commune nouveau. Optionnel.
   */
  faq?: { q: string; a: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'piscine-debordement-terrain-en-pente',
    title: 'Piscine à débordement : comment un terrain en pente devient un atout',
    metaTitle: 'Piscine à débordement sur terrain en pente | Aqua System',
    metaDescription:
      "Un terrain en pente dans les Yvelines n'est pas un obstacle. C'est souvent un atout. Nicolas Berg, pisciniste 30 ans en 78/92, explique pourquoi.",
    requeteCible: 'piscine à débordement Yvelines / terrain en pente piscine',
    category: 'types-piscine',
    datePublished: '2026-03-29',
    heroBase: 'piscine-debordement-foret',
    heroAlt:
      "Piscine à débordement bordée d'une terrasse en bois, plan d'eau ouvert sur une forêt de pins, mur en pierre — réalisation Aqua System, ouest parisien",
    excerpt:
      "Un terrain en pente, dans les Yvelines ou les Hauts-de-Seine, n'est pas un obstacle à une piscine à débordement. Dans la plupart des cas, c'est exactement le contraire.",
    body: a1Body,
    // Reformulation stricte du corps A1 : Q1 = geo block « terrain en pente
    // adapté ? » ; Q2 = defs débordement/miroir ; Q3 = §génie civil interne.
    faq: [
      {
        q: 'Un terrain en pente est-il adapté à une piscine à débordement ?',
        a: "Souvent plus qu'un terrain plat. Sur terrain plat, la lame de débordement est construite intégralement par un travail sur les niveaux et les hauteurs de structure. Sur terrain incliné, le dénivelé oriente naturellement l'eau vers le point bas et crée la lame sans artifice : la pente devient un atout de conception.",
      },
      {
        q: 'Quelle est la différence entre une piscine à débordement et une piscine miroir ?',
        a: "Dans une piscine à débordement, l'eau déborde d'un ou plusieurs côtés dans une goulotte de récupération : la lame d'eau est visible et crée une continuité vers l'horizon, qu'on peut orienter côté aval sur un terrain en pente. Dans une piscine miroir, l'eau affleure au ras de la plage sur tout le pourtour, sans cascade : la surface devient un reflet statique du ciel et de la végétation.",
      },
      {
        q: 'Le génie civil est-il géré en interne sur un terrain complexe ?',
        a: "Oui. Notre bureau d'études réunit la compétence technique piscine et la compétence génie civil : les collaborateurs spécialisés dimensionnent les murs de soutènement et intègrent les contraintes du sous-sol dès la conception. Ce n'est pas une sous-traitance, mais un seul marché, un seul responsable, une seule garantie décennale.",
      },
    ],
  },
  {
    slug: 'investissement-piscine-haut-de-gamme',
    title: 'Ce qui fait le prix d’une piscine haut de gamme : les vraies raisons',
    metaTitle: 'Prix d’une piscine haut de gamme | Aqua System',
    metaDescription:
      "Pas de fourchettes inventées : une explication honnête des postes de coût d'une piscine sur mesure béton. Structure, finitions, équipements, garantie.",
    requeteCible:
      'prix piscine sur mesure / investissement piscine haut de gamme',
    category: 'investissement-projet',
    datePublished: '2026-04-13',
    heroBase: 'piscine-couloir-demeure-ancienne',
    heroAlt:
      "Long bassin miroir face à une demeure ancienne en pierre et brique, grande pelouse, arbres adultes — réalisation Aqua System, ouest parisien",
    excerpt:
      "C'est la question que tout propriétaire se pose avant de lancer un projet. Pas pour négocier — pour comprendre ce qu'on achète, et ce qu'on protège.",
    body: a4Body,
    // Reformulation stricte du corps A4 : Q1 = §béton/coque ; Q2 = §fourchettes
    // (données publiques) ; Q3 = §garantie décennale.
    faq: [
      {
        q: 'Quelle différence de coût entre une piscine béton armé et une coque polyester ?',
        a: "Ce sont deux ouvrages de nature distincte, pas deux versions du même produit. La coque polyester est fabriquée en usine et posée dans une excavation : coût initial plus bas, formes standardisées, terrains simples. Le béton armé est coulé sur place, accepte tous les dénivelés, débordements et parois de verre, et sa longévité structurelle est supérieure : son coût initial reflète cette différence.",
      },
      {
        q: "Quel est le prix d'une piscine sur mesure haut de gamme ?",
        a: "Les données publiques de marché 2026 indiquent 30 000 à 60 000 euros TTC pour une piscine béton sur mesure standard, et 70 000 à 120 000 euros TTC pour un ouvrage haut de gamme (débordement, miroir, finitions pierre). Ce ne sont pas les tarifs d'Aqua System : le coût réel dépend du terrain, des finitions et de la configuration, et se chiffre projet par projet.",
      },
      {
        q: 'Que couvre la garantie décennale sur une piscine ?',
        a: "Elle engage la responsabilité du constructeur pendant dix ans sur les dommages qui compromettent la solidité de l'ouvrage. Pour une piscine en béton armé construite par un interlocuteur unique, elle s'applique à l'ensemble — structure, étanchéité, équipements intégrés au gros-œuvre. Elle suppose que le constructeur sera encore là dans dix ans pour y répondre.",
      },
    ],
  },
  {
    slug: 'piscine-jardin-concevoir-ensemble',
    title: 'Piscine et jardin conçus ensemble : ce que ça change',
    metaTitle: 'Piscine et jardin conçus ensemble : ce que ça change | Aqua System',
    metaDescription:
      "Concevoir la piscine et le jardin depuis le même bureau d'études — pas en deux temps. Ce que ça change dans le résultat, dans l'ouest parisien.",
    requeteCible:
      'piscine et jardin sur mesure / pisciniste paysagiste Yvelines',
    category: 'eau-jardin',
    datePublished: '2026-04-28',
    heroBase: 'projet-bassin-jardin-paysage',
    heroAlt:
      "Bassin intégré dans un jardin paysagé, margelles claires, massifs plantés et cheminements composés ensemble — projet complet Aqua System, ouest parisien",
    excerpt:
      "La plupart des projets extérieurs fonctionnent en deux temps : la piscine d'abord, le jardin ensuite. Résultat : on rattrape, on adapte, on compromet. Ce n'est pas notre façon de travailler.",
    body: a5Body,
    // Reformulation stricte du corps A5 : Q1 = §« logique des niveaux » + intro ;
    // Q2 = §synergie pierre Kei-Stone ; Q3 = §« ce que vous gagnez » (1 marché).
    faq: [
      {
        q: 'Pourquoi concevoir la piscine et le jardin en même temps ?',
        a: "Parce que les niveaux d'une propriété extérieure se décident ensemble ou ne se décident pas vraiment : la hauteur de la terrasse, de la plage et l'orientation de la pente conditionnent à la fois la piscine et le jardin. Conçus séparément, on obtient deux ouvrages cohérents chacun dans sa logique mais qui n'ont pas été pensés pour se répondre. Conçus ensemble, on obtient un espace.",
      },
      {
        q: "Pourquoi la pierre du bassin et celle du jardin sont-elles cohérentes ?",
        a: "Les margelles en travertin ou en pierre naturelle que nous posons autour des bassins sont les mêmes matériaux que Les Terres Essentielles distribue via Kei-Stone pour les dalles, allées et murets des jardins. Cette continuité permet que la pierre du bassin réponde à celle du cheminement, du muret et de l'escalier : l'espace extérieur se lit comme un tout, pas comme une juxtaposition.",
      },
      {
        q: "Qu'est-ce qu'un seul interlocuteur change concrètement ?",
        a: "Un seul bureau d'études lit le terrain une fois et construit les plans une fois ; les allers-retours entre plan piscine et plan jardin se font en interne, pas dans des réunions de coordination que vous organisez. Un seul marché couvre l'ensemble de l'ouvrage, et la garantie décennale s'applique à l'ensemble.",
      },
    ],
  },
  {
    slug: 'piscine-interieure-guide-complet',
    title:
      'Piscine intérieure : ce que l’hygrométrie impose (et ce que personne ne dit)',
    metaTitle:
      'Piscine intérieure : l’hygrométrie, la vraie contrainte | Aqua System',
    metaDescription:
      "4 piscines intérieures construites dans les Yvelines (78) et les Hauts-de-Seine. Nicolas Berg explique ce que l'hygrométrie impose dès la conception.",
    requeteCible:
      'piscine intérieure sur mesure 78 / piscine intérieure hygrométrie',
    category: 'types-piscine',
    datePublished: '2026-05-13',
    heroBase: 'piscine-interieure-pierre-poutres',
    heroAlt:
      "Couloir de nage intérieur sous charpente en bois et murs en pierre, perspective sur le bassin — réalisation Aqua System, ouest parisien",
    excerpt:
      "L'erreur la plus fréquente dans un projet de piscine intérieure : concentrer toute l'attention sur le bassin et négliger l'air. L'enjeu n°1 n'est pas la piscine — c'est l'hygrométrie.",
    body: a2Body,
    // Reformulation stricte du corps A2 : Q1 = geo block hygrométrie ; Q2 = geo
    // block conséquences ; Q3 = geo block configurations.
    faq: [
      {
        q: "Qu'est-ce que l'hygrométrie d'une piscine intérieure ?",
        a: "C'est le taux d'humidité relative de l'air dans l'espace qui contient le bassin. Une piscine intérieure en usage génère une évaporation continue : surface d'eau exposée, température de l'eau et de l'air créent un flux d'humidité permanent. Sans déshumidification adaptée, ce taux dépasse vite les niveaux acceptables pour la conservation des structures et des finitions.",
      },
      {
        q: "Que se passe-t-il si l'hygrométrie n'est pas maîtrisée ?",
        a: "Une humidité excessive entraîne condensation sur les vitrages, moisissures sur les murs et la charpente bois, corrosion des menuiseries aluminium et détérioration des matériaux poreux. Ces dégradations débutent dès les deux à trois premières années si le traitement de l'air est sous-dimensionné ou absent : c'est pourquoi il se calcule au bureau d'études, avant le premier plan.",
      },
      {
        q: "Quelles sont les configurations possibles d'une piscine intérieure ?",
        a: "Quatre principales : intégrée à la maison principale, dans un bâtiment dédié, sous un abri adossé, ou dans une véranda dimensionnée pour accueillir le bassin. Chaque configuration impose des contraintes différentes de structure, de ventilation et de traitement de l'air.",
      },
    ],
  },
  {
    slug: 'fond-mobile-terrasse-piscine',
    title: 'Fond mobile : quand la terrasse devient piscine (et réciproquement)',
    metaTitle:
      'Fond mobile : la piscine qui devient terrasse | Aqua System Yvelines',
    metaDescription:
      "Un fond mobile ne s'ajoute pas à une piscine — il se conçoit avec elle. Notre réalisation dans les Yvelines et ce que cet ouvrage change au quotidien.",
    requeteCible: 'piscine fond mobile / fond mobile terrasse piscine',
    category: 'types-piscine',
    datePublished: '2026-05-28',
    heroBase: 'piscine-fond-mobile-terrasse',
    heroAlt:
      "Piscine à fond mobile avec platelage bois affleurant, fond remonté formant une terrasse praticable — réalisation Aqua System, ouest parisien",
    excerpt:
      "L'ouvrage le plus rare de notre portfolio. Pas parce qu'il est compliqué à désirer, mais parce qu'il exige une conception rigoureuse en amont : un fond mobile ne s'ajoute pas à une piscine, il se décide avec elle.",
    body: a3Body,
    // Reformulation stricte du corps A3 : Q1 = geo block fond mobile vs terrasse
    // mobile ; Q2 = §conception au plan ; Q3 = geo block prix.
    faq: [
      {
        q: 'Quelle est la différence entre un fond mobile et une terrasse mobile ?',
        a: "Le fond mobile est un plancher motorisé qui se déplace verticalement dans le bassin : remonté, la piscine devient une terrasse praticable ; descendu, le bassin se remplit à la profondeur choisie. La terrasse mobile, elle, est une terrasse qui coulisse horizontalement à côté du bassin pour le découvrir ou le recouvrir, le fond restant fixe. Deux ouvrages distincts qu'il ne faut pas confondre dans un projet.",
      },
      {
        q: 'Peut-on ajouter un fond mobile à une piscine existante ?',
        a: "Non, dans la grande majorité des cas. La fosse du mécanisme de levage, la structure du plancher motorisé et les gaines hydrauliques se conçoivent et se réalisent en même temps que le bassin. La décision doit être prise avant le gros-œuvre, idéalement avant le premier plan.",
      },
      {
        q: "Quel est le prix d'un fond mobile de piscine ?",
        a: "Les fourchettes de marché 2026 sont de l'ordre de 45 000 à 90 000 euros TTC pour le mécanisme seul, et de 70 000 à 120 000 euros TTC pour un projet complet (piscine sur mesure avec fond mobile intégré). Ce sont des données publiques, pas les tarifs d'Aqua System : le coût exact dépend des dimensions, de la profondeur et des finitions.",
      },
    ],
  },
  {
    slug: 'renovation-piscine-haut-de-gamme',
    title: 'Rénover une piscine haut de gamme : quand et pourquoi',
    metaTitle:
      'Rénover une piscine haut de gamme : quand et pourquoi | Aqua System',
    metaDescription:
      "Les signes qui imposent une rénovation (et ceux qui ne signalent qu'un entretien insuffisant). Le regard du pisciniste, en Yvelines et Hauts-de-Seine.",
    requeteCible: 'rénovation piscine 78 / rénover piscine béton',
    category: 'investissement-projet',
    datePublished: '2026-06-12',
    heroBase: 'piscine-pierre-mur-ancien',
    heroAlt:
      "Piscine bordée de margelles en pierre claire le long d'un mur ancien restauré, abords minéraux soignés — réalisation Aqua System, ouest parisien",
    excerpt:
      "Une piscine en béton armé bien construite dure. Pas indéfiniment. Après 10-15 ans, certains signes ne trompent pas — d'autres ne sont qu'un défaut d'entretien qu'on confond avec une usure structurelle.",
    body: a6Body,
    // Reformulation stricte du corps A6 : Q1 = geo block « quand rénover » ;
    // Q2 = geo block test du seau ; Q3 = geo block meilleure saison.
    faq: [
      {
        q: 'Quand faut-il rénover une piscine ?',
        a: "Quand au moins un signal structurel est présent : fissures qui traversent l'ouvrage et évoluent (distinctes des micro-fissures superficielles du revêtement), revêtement en fin de vie, perte d'eau anormale confirmée, ou équipements obsolètes comme une filtration sous-dimensionnée. Ces signaux ne se règlent pas par un entretien renforcé : ils nécessitent une intervention sur l'ouvrage.",
      },
      {
        q: 'Comment détecter une fuite avec le test du seau ?',
        a: "Posez un seau d'eau sur la première marche du bassin, au niveau de l'eau, et marquez le niveau dans le seau et dans le bassin. Après 24 heures, pompe en marche, comparez : si le bassin a perdu plus d'eau que le seau — qui ne perd que par évaporation — il y a une fuite. Une perte de plus de deux centimètres par jour sans vent ni forte chaleur justifie une investigation.",
      },
      {
        q: 'Quelle est la meilleure saison pour rénover une piscine ?',
        a: "L'automne, de septembre à novembre. Le bassin vient de finir la saison de baignade et peut être mis hors service sans perdre de temps de natation, les chantiers sont disponibles, et les travaux réalisés en automne-hiver permettent de profiter du bassin rénové dès le printemps suivant. Qui décide en octobre a sa piscine prête en mai.",
      },
    ],
  },
];

/** Articles triés par date de publication décroissante (le plus récent d'abord). */
export const ARTICLES_BY_DATE: Article[] = [...ARTICLES].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);

/** Récupère un article par slug (undefined si inconnu). */
export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/**
 * Articles liés (« Pour aller plus loin ») : les `count` articles les plus
 * récents hors article courant. Maillage interne sans dépendance dynamique.
 */
export function getRelatedArticles(slug: string, count = 2): Article[] {
  return ARTICLES_BY_DATE.filter((a) => a.slug !== slug).slice(0, count);
}

/** Date formatée en français long (ex. « 12 juin 2026 ») pour l'affichage. */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
