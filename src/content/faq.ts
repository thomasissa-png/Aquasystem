/**
 * Contenu FAQ — source unique pour l'affichage (FaqSection) ET le JSON-LD
 * (faqPageJsonLd). Évite toute divergence contenu visible / données structurées.
 *
 * SOURCE DE VÉRITÉ : @copywriter docs/copy/faq-geo-copy.md (wording finalisé,
 * claims sourcés, formulations LTE vérifiées). Zéro texte inventé (CLAUDE.md n°2).
 *
 * NOTE DE REPRISE : la Q3 /notre-approche (« durée moyenne d'un chantier »,
 * faq-geo-copy.md Partie 1 Q3) est VOLONTAIREMENT ABSENTE — sa réponse contient
 * un placeholder [À CONFIRMER fondateur : durée réelle]. À réintégrer ici une
 * fois la fourchette confirmée par Nicolas Berg (elle apparaîtra alors
 * automatiquement dans la FAQ visible ET le JSON-LD). Voir dev-decisions.md D-12.
 */

export const FAQ_NOTRE_APPROCHE = [
  {
    q: 'Est-il possible de faire appel à Aqua System pour la piscine uniquement, sans le jardin ?',
    a: "Oui. Aqua System intervient indépendamment pour la conception, la construction, la rénovation ou l'entretien de piscines. Membre du réseau L'Esprit Piscine et certifié Socotec CSP/ESP-001. L'association avec Les Terres Essentielles pour le jardin est proposée quand le projet le justifie, jamais imposée.",
  },
  {
    q: 'Intervenez-vous uniquement dans les Yvelines ?',
    a: "Aqua System intervient dans les Yvelines (78), les Hauts-de-Seine (92), le Val-d'Oise (95) et l'Eure (27). Le cœur de notre activité est l'ouest parisien, où nous travaillons depuis plus de 30 ans.",
  },
  {
    q: 'Êtes-vous certifiés pour les piscines sur mesure ?',
    a: "Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial » et membre du réseau L'Esprit Piscine : deux certifications délivrées par des organismes tiers indépendants, Socotec Certification France et le GIE L'Esprit Piscine.",
  },
  {
    q: 'Comment se déroule la première prise de contact ?',
    a: "Vous nous décrivez votre projet en quelques mots, sans plan ni budget précis. Nous vous recontactons pour fixer un rendez-vous sur votre propriété. Il n'y a rien à préparer au préalable.",
  },
] as const;

export const FAQ_PRESCRIPTEURS = [
  {
    q: "Travaillez-vous sur un DCE fourni par l'architecte, ou produisez-vous votre propre conception ?",
    a: "Les deux. Nous travaillons sur votre DCE ou votre plan de référence, ou nous co-concevons depuis notre bureau d'études si la conception n'est pas encore arrêtée. Dans les deux cas, votre plan est respecté et votre relation avec votre client reste la vôtre.",
  },
  {
    q: 'Quelles certifications pouvez-vous fournir pour un dossier de prescription ?',
    a: "Nous fournissons la certification Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial » (Socotec Certification France), l'attestation de membership au réseau L'Esprit Piscine, et des références de réalisations en Yvelines (78) et Hauts-de-Seine (92) vérifiables sur site. Ces documents sont disponibles sur demande.",
  },
  {
    q: 'Comment gérez-vous la relation avec le propriétaire pendant le chantier ?',
    a: "Vous nous présentez à votre client si vous le souhaitez, ou pas. Nous nous adaptons au protocole que vous définissez. Aucune décision modifiant le plan ou le budget n'est prise sans votre accord préalable.",
  },
  {
    q: 'Intervenez-vous sur des projets intégrant jardin et piscine simultanément ?',
    a: "Oui. En partenariat avec Les Terres Essentielles, bureau d'études paysager établi aux Alluets-le-Roi (Yvelines, 78), nous assurons la co-conception eau et végétal depuis un interlocuteur unique : piscine et jardin pensés ensemble dès la phase de plan, dans les Yvelines et les Hauts-de-Seine.",
  },
] as const;

/**
 * FAQ /piscines-bien-etre (P1-GEO-03, megalot §4) — 3 Q/R conversationnelles
 * extractibles : types d'ouvrage, fond mobile, piscine intérieure. Réponses
 * < 3 phrases, claims sourcés (savoir-faire-facts.md + slugs prouvés). Source de
 * vérité : docs/copy/validations-megalot.md §4 (wording @copywriter exact).
 */
export const FAQ_PISCINES = [
  {
    q: 'Quels types de piscines Aqua System réalise-t-il ?',
    a: "Aqua System réalise six types de bassins : piscines à débordement, bassins miroir, couloirs de nage, piscines intérieures, piscines à fond mobile et piscines à paroi de verre. Tous ces ouvrages ont été réalisés dans les Yvelines et les Hauts-de-Seine. Le bureau d'études intégré adapte chaque type au terrain, à l'architecture et aux usages du propriétaire.",
  },
  {
    q: 'Aqua System réalise-t-il des piscines à fond mobile ?',
    a: "Oui. Aqua System conçoit et réalise des piscines à fond mobile dans l'ouest parisien : un plancher motorisé transforme le bassin en terrasse de plain-pied et ajuste la profondeur selon les usages. C'est un ouvrage d'exception, qui se décide impérativement en phase de conception, avant le terrassement.",
  },
  {
    q: "Qu'est-ce qu'une piscine intérieure réalisée par Aqua System ?",
    a: "Une piscine intérieure Aqua System est un bassin intégré au bâti, avec traitement de l'air dimensionné dès la conception pour maîtriser l'hygrométrie. Aqua System compte quatre réalisations de ce type dans l'ouest parisien, en béton brut, sous charpente bois ou sous véranda. La certification Socotec CSP/ESP-001 couvre la construction et l'entretien.",
  },
] as const;

/**
 * FAQ /jardins-paysage (R-07 re-audit SEO) — 4 Q/R conversationnelles
 * extractibles (PAA paysagisme Yvelines). RÈGLE ZÉRO INVENTION : chaque réponse
 * est une reformulation STRICTE de contenu déjà validé, aucun fait/chiffre
 * /commune nouveau. Sources :
 *  - Q1 « piscine + jardin conçus ensemble » : BureauEtudesBlock §3 + A5
 *    (« deux études menées au même moment », src/content/blog/piscine-jardin-
 *    concevoir-ensemble.ts).
 *  - Q2 « bureau d'études avant plantation » : BureauEtudesBlock §1-2
 *    (jardins-paysage/page.tsx, « pose le plan avant que la première pelle
 *    entre dans la terre »).
 *  - Q3 « végétaux / pépinière / reprise » : PepiniereBlock + CreationBlock +
 *    MatieresBlock (sélection sur la plante, sol argilo-calcaire ouest parisien).
 *  - Q4 « entretien dans la durée » : PepiniereBlock §1 (geste régulier vs
 *    rattrapage ponctuel).
 * Formulations LTE conformes : « en partenariat avec Les Terres Essentielles ».
 */
export const FAQ_JARDINS = [
  {
    q: 'Pouvez-vous concevoir le jardin en même temps que la piscine ?',
    a: "Oui. En partenariat avec Les Terres Essentielles, les deux études sont menées au même moment, depuis le même bureau d'études : piscine et jardin sont pensés ensemble dès la phase de plan, pas en deux temps. Le résultat est un espace qui tient ensemble, pas une somme de parties.",
  },
  {
    q: 'Faites-vous une étude avant de planter ?',
    a: "Oui. Tout commence par la lecture du terrain : les ombrages, les masses végétales existantes, les contraintes de sol. Notre bureau d'études, en partenariat avec Les Terres Essentielles, pose le plan avant que la première pelle entre dans la terre — un jardin qui ne tient pas compte des vues depuis la maison ou des circulations quotidiennes se reprend.",
  },
  {
    q: "D'où viennent les végétaux et comment sont-ils choisis ?",
    a: "Nos végétaux sont sélectionnés ou issus de notre pépinière aux Alluets-le-Roi, ce qui nous permet de les choisir sur la plante, pas sur catalogue. Ils sont adaptés au sol argilo-calcaire de l'ouest parisien : essences à croissance lente, vivaces qui résistent à la sécheresse, arbres de haie qui s'épaississent avec les années.",
  },
  {
    q: 'Assurez-vous aussi l’entretien des jardins que vous créez ?',
    a: "Oui. Un jardin suivi dans la durée ne ressemble pas à un jardin entretenu en urgence : taille de forme à la bonne période, suivi des massifs saison après saison, détection d'un problème de sol avant qu'il devienne visible dans les végétaux. C'est ce que le geste régulier construit, pas le rattrapage ponctuel.",
  },
] as const;

/** Adapte une liste FAQ readonly au format attendu par faqPageJsonLd. */
export function toFaqJsonLd(items: readonly { q: string; a: string }[]) {
  return items.map((i) => ({ q: i.q, a: i.a }));
}
