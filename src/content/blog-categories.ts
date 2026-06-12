/**
 * Taxonomie du blog « Notre regard » (/notre-regard).
 *
 * Dérivée du planning 12 sujets (docs/seo/blog-program.md §2). Pensée LECTEUR,
 * pas SEO interne : un visiteur navigue par ce qu'il cherche (un type d'ouvrage,
 * une question de projet/budget, l'articulation eau↔jardin). 3 catégories qui
 * couvrent les 12 sujets sans orphelin ni fourre-tout :
 *
 *  - « Types de piscine »      → A1 débordement, A2 intérieure, A3 fond mobile,
 *                                A7 miroir, A10 couloir de nage
 *  - « Eau & jardin »          → A5 piscine+jardin, A8 pool-house, A11 margelles
 *  - « Investissement & projet »→ A4 prix, A6 rénovation, A9 entretien,
 *                                A12 préparer son projet
 *
 * Au lancement (6 articles), les 3 catégories sont peuplées : Types (A1,A2,A3),
 * Investissement (A4,A6), Eau & jardin (A5) — aucune chip vide.
 *
 * La valeur sert de clé d'URL (?categorie=…) et de propriété de tracking.
 */
export type BlogCategory =
  | 'types-piscine'
  | 'eau-jardin'
  | 'investissement-projet';

export interface BlogCategoryDef {
  value: BlogCategory;
  /** Libellé affiché (chip + eyebrow card + page article). */
  label: string;
  /** aria-label de la chip (filtrage). */
  aria: string;
}

/** Catégories dans l'ordre d'affichage des chips (après « Tous »). */
export const BLOG_CATEGORIES: BlogCategoryDef[] = [
  {
    value: 'types-piscine',
    label: 'Types de piscine',
    aria: 'Filtrer : types de piscine',
  },
  {
    value: 'eau-jardin',
    label: 'Eau & jardin',
    aria: 'Filtrer : eau et jardin',
  },
  {
    value: 'investissement-projet',
    label: 'Investissement & projet',
    aria: 'Filtrer : investissement et projet',
  },
];

const LABELS: Record<BlogCategory, string> = Object.fromEntries(
  BLOG_CATEGORIES.map((c) => [c.value, c.label]),
) as Record<BlogCategory, string>;

/** Libellé d'affichage d'une catégorie (eyebrow card, page article). */
export function categoryLabel(value: BlogCategory): string {
  return LABELS[value];
}
