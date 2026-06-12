/**
 * Manifeste typé des photos de la JARDINERIE Les Terres Essentielles.
 *
 * NATURE DES PHOTOS — IMPORTANT (honnêteté éditoriale, CLAUDE.md n°2) :
 * ces images montrent le POINT DE VENTE / la pépinière (serres, présentoirs,
 * étals) — PAS des réalisations paysagères. Elles ne sont utilisées QUE là où
 * c'est honnête (ambiance jardinerie / pépinière), JAMAIS comme preuve de
 * création de jardin. Les `alt` sont strictement factuels (« serre de la
 * jardinerie », jamais « jardin réalisé »).
 *
 * SOURCE : fournie par le fondateur (Nicolas Berg), page Facebook Les Terres
 * Essentielles. DROITS : accordés le 2026-06-12 (project-context.md →
 * « Validations fondateur (2026-06-12) »).
 *
 * Tailles WebP disponibles par photo : 1280w / 800w / 400w.
 * Générées par scripts/build-jardinerie-images.mjs.
 * Les 5 photos saisonnières/boutique sont rangées hors public/ dans
 * assets/social-media/ (social uniquement, jamais shippées).
 */

export interface JardineriePhoto {
  /** Nom de base (sans suffixe de taille ni extension). */
  base: string;
  /** Description FACTUELLE de la photo (jardinerie, jamais « réalisation »). */
  alt: string;
  /** Provenance des droits (transparence). */
  source: string;
}

const IMG = '/images/jardinerie';

/** Construit le chemin d'une photo jardinerie à la taille demandée (WebP). */
export function jardinerieSrc(
  base: string,
  size: '400w' | '800w' | '1280w',
): string {
  return `${IMG}/${base}-${size}.webp`;
}

const SOURCE =
  'Fournie par le fondateur (page Facebook Les Terres Essentielles), droits accordés 2026-06-12';

export const JARDINERIE_PHOTOS = {
  'jardinerie-serre-chrysanthemes': {
    base: 'jardinerie-serre-chrysanthemes',
    alt: "Serre de la jardinerie Les Terres Essentielles : présentoir de chrysanthèmes multicolores en pots, allée intérieure, lumière naturelle",
    source: SOURCE,
  },
  'jardinerie-presentoir-exterieur': {
    base: 'jardinerie-presentoir-exterieur',
    alt: "Présentoir extérieur de la jardinerie Les Terres Essentielles : plantes fleuries rouges et topiaires en pots alignés",
    source: SOURCE,
  },
  'jardinerie-allee-pepiniere': {
    base: 'jardinerie-allee-pepiniere',
    alt: "Allée de la pépinière Les Terres Essentielles : cannas pourpres et marguerites jaunes en pots disposés le long du passage",
    source: SOURCE,
  },
  'jardinerie-cagette-lauriers-orgeval': {
    base: 'jardinerie-cagette-lauriers-orgeval',
    alt: "Lauriers-roses présentés dans une cagette en bois ancienne « A. Feroux Orgeval » à la jardinerie Les Terres Essentielles",
    source: SOURCE,
  },
} as const satisfies Record<string, JardineriePhoto>;

export function getJardineriePhoto(
  base: string,
): JardineriePhoto | undefined {
  return (JARDINERIE_PHOTOS as Record<string, JardineriePhoto>)[base];
}
