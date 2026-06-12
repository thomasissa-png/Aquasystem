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

/** Adapte une liste FAQ readonly au format attendu par faqPageJsonLd. */
export function toFaqJsonLd(items: readonly { q: string; a: string }[]) {
  return items.map((i) => ({ q: i.q, a: i.a }));
}
