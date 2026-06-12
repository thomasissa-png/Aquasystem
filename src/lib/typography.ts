/**
 * Typographie française au rendu (D-44, retour fondateur 2026-06-12 : « ne
 * jamais commencer une ligne par une ponctuation, ni PC ni mobile »).
 *
 * Remplace l'espace sécable devant la ponctuation double (: ; ! ?) et la
 * fermante », ainsi qu'après l'ouvrante «, par une espace INSÉCABLE (U+00A0) :
 * le navigateur ne peut plus rejeter la ponctuation seule en début de ligne.
 *
 * Appliqué AU RENDU dans les composants partagés (cards, headings, FAQ,
 * corps d'articles) — les fichiers de contenu restent en espaces normales,
 * lisibles et diffables. Toute nouvelle surface de texte doit passer par lui.
 */
export function frTypo(text: string): string {
  return text
    .replace(/ ([:;!?\u00BB])/g, '\u00A0$1')
    .replace(/\u00AB /g, '\u00AB\u00A0');
}
