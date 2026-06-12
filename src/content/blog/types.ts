/**
 * Types du corps des articles « Notre regard ».
 *
 * Le corps de chaque article (.md validé docs/copy/blog/a[1-6].md) est transcrit
 * MOT POUR MOT en blocs typés (un fichier par article : src/content/blog/<slug>.ts).
 * Le rendu (notre-regard/[slug]/page.tsx) parcourt ces blocs et applique les
 * tokens du design system. Aucun markdown brut n'est rendu au runtime.
 *
 * RÈGLE PUBLICATION (blog-program.md §4.2 + blog-validation-croisee.md) :
 * les blocs « Regard de Nicolas Berg » balisés [CITATION À VALIDER NB] dans les
 * .md sont EXCLUS du corps transcrit — rien de non validé ne se publie. Leur
 * emplacement est documenté par un commentaire dans chaque fichier article.
 */

/** Niveau de sous-titre (le H1 est rendu par la page, pas par le corps). */
export type Heading = { kind: 'h2' | 'h3'; text: string };

/** Paragraphe courant. `links` : segments transformés en liens internes. */
export type Paragraph = {
  kind: 'p';
  /**
   * Texte du paragraphe. Les liens internes sont injectés via des marqueurs
   * `[texte](/chemin/)` que le rendu transforme en <Link>. Pas de HTML brut.
   */
  text: string;
};

/** Liste à puces ou numérotée. Chaque item peut contenir des marqueurs de lien. */
export type List = {
  kind: 'ul' | 'ol';
  items: string[];
};

/**
 * Encadré « Réponse directe (extractible GEO) » — question → réponse concise.
 * Rendu visuellement distinct (citation/callout), signal GEO pour les LLM.
 */
export type GeoCallout = {
  kind: 'geo';
  question: string;
  answer: string;
};

/** Définition mise en exergue (terme en gras + explication) dans le corps. */
export type Definition = {
  kind: 'def';
  term: string;
  text: string;
};

/** Légende / crédit en italique sous une section (ex. crédit réalisation). */
export type Caption = { kind: 'caption'; text: string };

export type ContentBlock =
  | Heading
  | Paragraph
  | List
  | GeoCallout
  | Definition
  | Caption;
