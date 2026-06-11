# Assumption Map — Hypothèses critiques
## Site vitrine [NOM OMBRELLE] — Aqua System × Les Terres Essentielles

> Toute hypothèse non validée = risque produit. Ce document pilote les priorités de test post-launch.
> Hypothèses classées par criticité : P0 (bloquante), P1 (importante), P2 (à surveiller).
> Dernière mise à jour : 2026-06-11 | Agent : @product-manager

---

## Grille d'évaluation

| Niveau de preuve | Définition |
|-----------------|------------|
| Fort | Validé par données terrain, verbatims réels, benchmark confirmé |
| Moyen | Cohérent avec profil persona, analogies sectorielles, logique métier |
| Faible | Intuition fondateur ou déduction — à tester en priorité |

---

## Hypothèses P0 — Critiques (tester avant ou immédiatement après launch)

---

### HYP-01 — Le persona premium préfère un formulaire qualifiant court

**Hypothèse** : Alexandre (propriétaire 45-60 ans, capital élevé) est plus susceptible de soumettre un formulaire de 6-7 champs courts (prénom, email, téléphone, type de projet, commune, description libre) qu'un formulaire long à qualification forcée (budget obligatoire, superficie, délai...).

**Raisonnement** : La cible valorise sa propre efficacité. Un formulaire trop intrusif signal un manque de confiance dans la relation. Elle soumet ce qu'elle juge bon de partager — elle rappellera pour le reste.

**Niveau de preuve** : Moyen — [HYPOTHÈSE : basée sur profil persona + positionnement vitrine conviction-first, aucune donnée terrain]

**Risque si faux** : Formulaire trop court = leads non qualifiés, perte de temps côté Nicolas. Formulaire trop long = taux de complétion effondré, KPI North Star manqué.

**Test de validation** :
- Analyser le taux de complétion du formulaire V1 sur les 30 premiers soumis
- Analyser la qualité des descriptions libres : sont-elles suffisamment détaillées pour qualifier ?
- Décision : si < 60% de leads qualifiables → ajouter 1 champ obligatoire (commune ou budget fourchette)
- Délai : 6-8 semaines post-launch

**Statut** : [NON TESTÉ — à valider post-launch]

---

### HYP-02 — La réunion des deux maisons crédibilise au lieu de diluer

**Hypothèse** : Présenter Aqua System et Les Terres Essentielles sous une marque ombrelle unique renforce la perception de valeur (intégration premium) plutôt que de créer de la confusion ou une image de "généraliste".

**Raisonnement** : Le différenciateur central est l'intégration eau + jardin. Aucun concurrent local ne l'offre. La cible est mature : elle comprend la complémentarité. La marque ombrelle doit être perçue comme un "atelier d'architecture extérieure" premium, pas comme un ensemble hétérogène.

**Niveau de preuve** : Faible — [HYPOTHÈSE : aucun test utilisateur réalisé ; le competitive-benchmark confirme l'espace libre mais pas la réception de la cible]

**Risque si faux** : Alexandre perçoit le site comme un "répertoire de services" généraliste → perd confiance dans la spécialité piscine → contacte un pisciniste pur player. Cela invaliderait le positionnement ombrelle.

**Test de validation** :
- Analyse des formulaires soumis : % mentionnant "projet complet" vs "piscine seule" ou "jardin seul" — signal de compréhension du positionnement intégré
- Interview de 3-5 premiers contacts post-formulaire : "Qu'avez-vous compris de notre offre ?" — délai : 2 mois post-launch
- Seuil d'alerte : si 0 lead "projet complet" dans les 3 premiers mois → revoir le copy d'intégration

**Statut** : [NON TESTÉ — hypothèse centrale du modèle]

---

### HYP-03 — Les prescripteurs utilisent le site comme outil de recommandation

**Hypothèse** : Camille (architecte, 35-55 ans) partage activement le lien vers l'espace prescripteurs du site à ses clients comme justification de sa recommandation. Elle cherche une page professionnelle qu'elle peut envoyer par email.

**Raisonnement** : Camille a besoin de légitimer ses recommandations. Un site daté ou généraliste la met en risque professionnel. Une section dédiée avec portfolio et certifications est un outil concret de prescription.

**Niveau de preuve** : Faible — [HYPOTHÈSE : déduite des frustrations Camille (personas.md) + espace libre concurrentiel ; aucune donnée terrain]

**Risque si faux** : La page prescripteurs ne génère pas de trafic prescripteur → les 2 leads prescripteurs/mois prévus ne se matérialisent pas → le cross-selling B2B échoue en V1.

**Test de validation** :
- Tracking event : clics sur le CTA prescripteur depuis la page dédiée (voir tracking-plan.md)
- % de formulaires soumis avec mention "prescripteur/architecte" dans type de projet
- Entretien direct avec 2-3 architectes de l'ouest parisien sur leur usage du site (en Phase 1, via Nicolas Berg)
- Délai : 3 mois post-launch

**Statut** : [NON TESTÉ — à déclencher dès activation du site]

---

### HYP-04 — Les photos du book Calameo sont accessibles et suffisantes pour le portfolio V1

**Hypothèse** : Les photos disponibles dans le book Calameo (https://www.calameo.com/read/0061881082b3b1e358f6f?authid=U7NQqdhG904V) et sur aqua-system.fr sont en qualité suffisante (résolution, droits d'auteur, droit à l'image) pour alimenter un portfolio premium en V1.

**Raisonnement** : C'est la seule source photo disponible à ce stade. Si elle est insuffisante, le site ne peut pas être lancé sans shooting dédié — délai et coût non négligeables.

**Niveau de preuve** : Faible — [HYPOTHÈSE : le book existe, mais qualité/droits non vérifiés ; authid requis pour accès fichiers sources]

**Risque si faux** : Portfolio V1 visuellement faible → Alexandre quitte le site → KPI North Star manqué. C'est le RISQUE N°1 du projet.

**Test de validation** :
- AVANT launch : Nicolas Berg fournit les fichiers sources haute définition des photos du book
- Vérification droits à l'image : autorisation des propriétaires des biens photographiés (voir orchestration-plan.md section "Infos à demander au fondateur")
- Plan B si insuffisant : sélection réduite (8-10 réalisations phares) + shooting ciblé 1 journée sur 2-3 chantiers récents
- Décision bloquante : à trancher au checkpoint fondateur Phase 0

**Statut** : [BLOQUANT — à résoudre avant Phase 1 design/contenu]

---

## Hypothèses P1 — Importantes (valider dans les 3 mois post-launch)

---

### HYP-05 — La cible principale recherche sur Google avant de contacter

**Hypothèse** : Alexandre passe par une recherche Google ("pisciniste haut de gamme 78", "paysagiste Yvelines") avant de contacter — le SEO on-page est donc un levier pertinent pour le KPI North Star.

**Niveau de preuve** : Moyen — [HYPOTHÈSE : comportement standard B2C haut de gamme ; confirmé par la présence longue durée de aqua-system.fr dans l'index Google]

**Test de validation** : Source de trafic dans Cloudflare Web Analytics à 3 mois — si < 30% de trafic organique → réviser la stratégie acquisition vers LinkedIn/réseau prescripteurs.

**Statut** : [NON TESTÉ]

---

### HYP-06 — Le bouche-à-oreille est le premier vecteur d'acquisition actuel

**Hypothèse** : La majorité des clients actuels d'Aqua System viennent via recommandation de proches ou de prescripteurs — le site est un outil de confirmation, pas un outil de découverte.

**Niveau de preuve** : Moyen — [HYPOTHÈSE : cohérent avec le profil haut de gamme ; le site actuel très daté continue à générer des contacts, signe que le trafic direct/brand est fort]

**Implication produit** : Si cette hypothèse est vraie, la performance du site dépend autant de sa qualité perçue à la réception (confirmation d'une bonne impression) que de son référencement (découverte).

**Test de validation** : Champ "comment nous avez-vous connu ?" dans le formulaire de contact (optionnel, texte libre) — [À CONFIRMER : ajouter ou non en V1 sans alourdir le formulaire]

**Statut** : [NON TESTÉ]

---

### HYP-07 — L'architecture i18n n'est pas nécessaire en V1 pour les leads

**Hypothèse** : L'absence de version EN du site n'est pas un frein à la génération de leads en V1 — la cible principale (Alexandre, 78/92) est francophone. La version EN est pour la crédibilité internationale et les prescripteurs étrangers (Phase 2).

**Niveau de preuve** : Fort — [HYPOTHÈSE validée par la logique de zone de chalandise 78/92 et la décision fondateur (FR d'abord)]

**Test de validation** : Analyse des formulaires soumis en V1 — si 0 soumission en anglais dans les 6 premiers mois → confirmer le report EN en V2. Si > 5% → accélérer la V2 EN.

**Statut** : [HYPOTHÈSE ACCEPTABLE — architecture i18n-ready intégrée dès V1 sans contenu EN]

---

### HYP-08 — 10 leads/mois est atteignable avec le trafic organique seul en V1

**Hypothèse** : Sans budget publicité, en s'appuyant uniquement sur le SEO local et le bouche-à-oreille, le site peut atteindre 10 leads qualifiés/mois dans les 6 mois suivant le lancement.

**Niveau de preuve** : Faible — [HYPOTHÈSE : basée sur la force du positionnement + ancienneté du domaine aqua-system.fr si redirection 301 ; aucune projection trafic disponible]

**Risque si faux** : Dépasser 6 mois sans atteindre l'objectif → déclencher une stratégie acquisition payante (Google Ads local, LinkedIn).

**Test de validation** : Revue mensuelle du KPI North Star à partir du mois 2 post-launch. Seuil d'alerte : < 5 leads qualifiés/mois à 3 mois → déclencher budget acquisition.

**Statut** : [NON TESTÉ — hypothèse de croissance à surveiller de près]

---

## Hypothèses P2 — À surveiller (6-12 mois post-launch)

---

### HYP-09 — Le budget indicatif optionnel dans le formulaire améliore la qualification

**Hypothèse** : Proposer un champ "budget indicatif" optionnel (fourchettes : < 50k€ / 50-100k€ / 100k€+) permet à Nicolas de pré-qualifier les leads sans décourager les soumissions.

**Niveau de preuve** : Faible — [HYPOTHÈSE : risque double de biais de sélection et de découragement ; à évaluer sur les 30 premiers leads]

**Test de validation** : Analyser le taux de remplissage du champ budget et la qualité perçue des leads avec/sans — feedback Nicolas Berg à 2 mois.

**Statut** : [NON TESTÉ — inclus en V1 comme optionnel, à évaluer]

---

### HYP-10 — Le blog/journal des réalisations améliorera le SEO en V2

**Hypothèse** : Un blog ou journal des réalisations alimenté régulièrement (1 article/mois) améliorerait le référencement long tail et la crédibilité de marque. Reporté en V2 car dépend du rythme de production réel de Nicolas Berg.

**Niveau de preuve** : Fort — [HYPOTHÈSE standard SEO content marketing ; mais applicable uniquement si le rythme de publication est tenu]

**Test de validation** : Après 3 mois de site live, évaluer la capacité de Nicolas à produire 1 fiche de réalisation/mois → GO/NO-GO blog V2.

**Statut** : [REPORTÉ V2 — dépendance rythme production contenu]

---

## Tableau de synthèse

| ID | Hypothèse courte | Niveau de preuve | Priorité | Statut | Test |
|----|-----------------|-----------------|----------|--------|------|
| HYP-01 | Formulaire court préféré par le premium | Moyen | P0 | Non testé | 30 premiers leads, 6-8 sem. |
| HYP-02 | Réunion 2 maisons = crédibilisation | Faible | P0 | Non testé | Analyse formulaires + interviews |
| HYP-03 | Prescripteurs utilisent le site pour recommander | Faible | P0 | Non testé | Tracking + % formulaires prescripteurs |
| HYP-04 | Photos Calameo suffisantes pour portfolio premium | Faible | P0 BLOQUANT | Non testé | Validation fichiers sources avant Phase 1 |
| HYP-05 | Cible recherche sur Google | Moyen | P1 | Non testé | Source trafic à 3 mois |
| HYP-06 | Bouche-à-oreille = 1er vecteur actuel | Moyen | P1 | Non testé | Champ formulaire optionnel |
| HYP-07 | i18n non bloquant en V1 | Fort | P1 | Acceptable | Analyse formulaires soumis |
| HYP-08 | 10 leads/mois atteignable sans pub | Faible | P1 | Non testé | Revue mensuelle NSM |
| HYP-09 | Budget optionnel améliore qualification | Faible | P2 | Non testé | Feedback Nicolas à 2 mois |
| HYP-10 | Blog améliorera SEO V2 | Fort | P2 | Reporté V2 | GO/NO-GO à 3 mois post-launch |

---

*Fichier produit par @product-manager — 2026-06-11*
