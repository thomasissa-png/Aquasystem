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
}

export const ARTICLES: Article[] = [
  {
    slug: 'piscine-debordement-terrain-en-pente',
    title: 'Piscine à débordement : comment un terrain en pente devient un atout',
    metaTitle:
      'Piscine à débordement sur terrain en pente | Aqua System 78/92',
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
  },
  {
    slug: 'investissement-piscine-haut-de-gamme',
    title: 'Ce qui fait le prix d’une piscine haut de gamme : les vraies raisons',
    metaTitle:
      'Prix d’une piscine haut de gamme : les vraies raisons | Aquasystem',
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
