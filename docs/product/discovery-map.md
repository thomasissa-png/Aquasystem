# Discovery Map — Opportunity Solution Tree
## Site vitrine [NOM OMBRELLE] — Aqua System × Les Terres Essentielles

> Source de vérité produit. Chaque feature de la roadmap DOIT pointer vers une opportunité de ce document.
> Dernière mise à jour : 2026-06-11 | Agent : @product-manager

---

## Outcome cible (KPI North Star)

> **10 leads entrants qualifiés / mois** — demandes de contact projet haut de gamme, toutes activités confondues, via le formulaire du site.

Définition d'un lead qualifié : formulaire soumis avec a minima — type de projet identifiable, commune dans la zone 78/92/27/95, description projet non vide.

---

## Arbre Opportunités → Solutions → Expériments

---

### PERSONA ALEXANDRE (propriétaire patrimonial 78/92)

---

#### OPP-A1 — Être trouvé au bon moment

**Problème persona** : Alexandre recherche un pisciniste ou un paysagiste haut de gamme dans l'ouest parisien via Google. Le site actuel aqua-system.fr est très daté (signal de confiance négatif). Les Terres Essentielles n'ont aucune présence web propre. Le [NOM OMBRELLE] n'existe pas encore en ligne.

**Niveau de preuve actuel** : faible — [HYPOTHÈSE : comportement de recherche présumé sur la base du profil persona ; aucune donnée trafic GA exploitable]

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-A1.1 | SEO on-page local 78/92 : title tags, H1, balises meta, ancrage géographique dans le copy (communes cibles : Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray, Marnes-la-Coquette, Neuilly, Saint-Cloud) | Page d'accueil, pages univers, page réalisations |
| S-A1.2 | Architecture de pages pensée pour le crawl : URLs sémantiques, sitemap XML, robots.txt, données structurées LocalBusiness + ProfessionalService | Infrastructure technique V1 |
| S-A1.3 | OG/social cards pour partage réseau social et messageries (WhatsApp, Signal — canaux bouche-à-oreille premium) | Toutes les pages |
| S-A1.4 | Performance Core Web Vitals premium : LCP < 2,5s, CLS < 0,1, FID < 100ms — Google favorise les sites rapides ; la cible perçoit la vitesse comme un signal de sérieux | Infrastructure technique V1 |

**Expériment de validation post-launch** : positions SEO sur requêtes cibles à 3 mois (ex. "piscine sur mesure Yvelines", "paysagiste haut de gamme 78") — seuil : top 5 sur ≥ 3 requêtes cibles.

---

#### OPP-A2 — Être convaincu par les preuves

**Problème persona** : Alexandre arrive sur le site après un bouche-à-oreille ou une recherche. Il cherche à confirmer une impression. S'il ne trouve pas de preuves tangibles (photos réelles, ancienneté, certifications) dans les 30 premières secondes, il quitte. La cible ne tolère pas le générique.

**Niveau de preuve actuel** : fort — comportement documenté dans personas.md + verbatims [HYPOTHÈSE confirmés par le profil type]

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-A2.1 | Portfolio de réalisations filtrable par type de projet (piscine, spa/sauna, jardin, projet intégré) avec photos réelles issues du book Calameo + site existant | Page réalisations / portfolio |
| S-A2.2 | Page "Approche / méthode" : narration du processus "de la vision à la réalisation" (étapes clés, bureau d'études, pas de sous-traitance forcée) | Page approche |
| S-A2.3 | Proof points non négociables intégrés dès la page d'accueil : 30+ ans, 350+ piscines entretenues, Socotec CSP/ESP-001, L'Esprit Piscine | Composant preuves réutilisable sur toutes les pages |
| S-A2.4 | Pages univers séparées (piscines & bien-être / jardins & paysage) avec détail des prestations et exemples de réalisations contextualisés | Pages univers |

**Expériment de validation post-launch** : taux de navigation page d'accueil → page réalisations (objectif : > 40% des visiteurs) ; profondeur de session (objectif : ≥ 3 pages/session).

---

#### OPP-A3 — Être rassuré sur la fiabilité

**Problème persona** : Alexandre a peur d'être déçu comme il l'a été par le passé (fragmentation, SAV absent, interlocuteur qui change). Il cherche des signaux de continuité et de sérieux avant de prendre contact.

**Niveau de preuve actuel** : fort — frustrations documentées et quantifiées dans personas.md (5 frustrations archétypales)

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-A3.1 | Page "Maison / À propos" avec Nicolas Berg visible (nom, rôle, ancrage), histoire de la marque, valeurs, équipe — humaniser sans être marketing | Page à propos / maison |
| S-A3.2 | Logos certifications intégrés discrètement (Socotec, L'Esprit Piscine) sur les pages pertinentes — preuves tierces objectives | Composant preuves |
| S-A3.3 | Section "Relation de long terme" dans la page approche : contrats d'entretien annuels, interlocuteur stable, mémoire du projet | Page approche |

**Expériment de validation post-launch** : taux de rebond page à propos < 60% ; [HYPOTHÈSE : NPS in-app ou enquête post-contact à 3 mois]

---

#### OPP-A4 — Faciliter la prise de contact sans friction

**Problème persona** : Alexandre veut parler à quelqu'un, pas remplir un formulaire de devis standardisé. Un formulaire trop court perd la qualification ; un formulaire trop long décourage. L'équilibre est critique.

**Niveau de preuve actuel** : moyen — [HYPOTHÈSE : préférence formulaire court qualifiant basée sur le profil premium ; à valider avec les 10 premiers leads]

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-A4.1 | Formulaire qualifiant court : prénom/nom, email, téléphone, type de projet (multi-select : piscine / spa-sauna / jardin-parc / projet complet), commune, budget indicatif (optionnel), description libre "votre projet" + mention RGPD | Page contact + formulaire |
| S-A4.2 | CTA unique "Parlez-nous de votre projet" — cohérent sur toutes les pages, jamais "devis gratuit" | Composant CTA global |
| S-A4.3 | Page de confirmation post-soumission : message humain, délai de réponse annoncé, pas de redirection vers accueil (rupture de parcours) | Page confirmation |
| S-A4.4 | Formulaire accessible depuis toutes les pages sans scroll excessif (CTA in-page + lien footer + page dédiée /contact) | Architecture de navigation |

**Expériment de validation post-launch** : taux de complétion du formulaire > 70% des démarrages ; taux de leads qualifiés (tous champs obligatoires remplis + commune zone) > 80% des soumissions.

---

### PERSONA CAMILLE (architecte prescripteur)

---

#### OPP-C1 — Servir les prescripteurs comme outil de recommandation

**Problème persona** : Camille a besoin d'une page qu'elle peut partager à son client pour légitimer sa recommandation. Elle cherche : portfolio vérifiable, certifications, protocole de collaboration. Elle ne trouvera pas cela sur aqua-system.fr V1 actuel (trop daté). Espace prescripteurs absent chez tous les concurrents locaux identifiés — espace libre.

**Niveau de preuve actuel** : fort — compétitive-benchmark.md confirme l'absence de section prescripteurs chez les acteurs locaux

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-C1.1 | Page dédiée prescripteurs/architectes : valeur prop spécifique (respect cahier des charges, interlocuteur dédié, références 78/92), CTA distinct "Présentons-nous — portfolio et références disponibles" | Page espace prescripteurs |
| S-C1.2 | Portfolio filtrable accessible depuis l'espace prescripteurs (filtre "projet intégré" = argument fort pour Camille) | Page réalisations |
| S-C1.3 | Section téléchargeable ou accessible sur demande : certifications, références (accessible via formulaire prescription — à définir en Phase 1) | Page prescripteurs |

**Expériment de validation post-launch** : % de formulaires soumis avec type "prescripteur/architecte" ; [HYPOTHÈSE : objectif 2 leads prescripteurs/mois dans les 6 mois]

---

#### OPP-C2 — Distinguer les deux maisons sans diluer la marque ombrelle

**Problème persona Camille** : elle a besoin de savoir précisément qui fait quoi (Aqua System vs Les Terres Essentielles) pour prescription précise. Si les deux maisons sont floues, elle ne peut pas recommander avec certitude.

**Problème persona Alexandre** : la réunion des 2 maisons doit crédibiliser (intégration), pas diluer (trop généraliste).

**Niveau de preuve actuel** : faible — [HYPOTHÈSE centrale, voir assumption-map.md OPP-C2]

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-C2.1 | Architecture de pages avec univers distincts ET lien explicite entre eux : "Aqua System — piscines & bien-être" + "Les Terres Essentielles — jardins & paysage" + cross-selling dans les deux univers | Pages univers + navigation |
| S-C2.2 | Composant cross-selling contextuel : sur la page piscines, mention de l'offre jardin complémentaire (et vice-versa) | Composant cross-selling |
| S-C2.3 | Copy légal conforme : "en partenariat avec Les Terres Essentielles" (formulation validée @legal) — jamais "nos deux sociétés" | Toutes les pages mentionnant LTE |

**Expériment de validation post-launch** : taux de navigation entre les deux univers (piscines → jardins ou jardins → piscines) ; % de formulaires mentionnant "projet complet eau + jardin".

---

### TRANSVERSALE — Cross-selling des deux maisons

---

#### OPP-T1 — Transformer un prospect piscine en projet global

**Problème business** : un client Aqua System qui ignore Les Terres Essentielles rate l'opportunité d'un projet intégré (valeur ticket × 1,5 à 2). L'intégration est la différence clé vs la concurrence.

**Niveau de preuve actuel** : faible — [HYPOTHÈSE : basée sur le positionnement ombrelle ; à mesurer avec les premiers leads]

| Solution | Description | Feature associée |
|----------|-------------|-----------------|
| S-T1.1 | Composant cross-selling sur chaque page univers | Pages univers |
| S-T1.2 | Page d'accueil présentant les deux univers comme complémentaires (pas séparés) — proposition de valeur intégrée dès le hero | Page d'accueil |
| S-T1.3 | Formulaire avec option "projet complet eau + jardin" en premier choix | Formulaire contact |

**Expériment de validation post-launch** : % de formulaires soumis avec type "projet complet" ; évolution dans le temps (signal d'ancrage du positionnement intégré).

---

## Matrice de synthèse

| Opportunité | Persona | Priorité | Solutions associées | Feature roadmap |
|-------------|---------|----------|---------------------|-----------------|
| OPP-A1 | Alexandre | P0 | S-A1.1/2/3/4 | SEO on-page, infra technique, OG cards |
| OPP-A2 | Alexandre | P0 | S-A2.1/2/3/4 | Portfolio, page approche, pages univers |
| OPP-A3 | Alexandre | P0 | S-A3.1/2/3 | Page à propos, composant preuves |
| OPP-A4 | Alexandre | P0 | S-A4.1/2/3/4 | Formulaire, CTA, page confirmation |
| OPP-C1 | Camille | P0 | S-C1.1/2/3 | Page prescripteurs (OBLIGATOIRE V1) |
| OPP-C2 | Camille + Alexandre | P0 | S-C2.1/2/3 | Architecture navigation, composant cross-selling |
| OPP-T1 | Transversal | P1 | S-T1.1/2/3 | Composant cross-selling, formulaire |

---

*Fichier produit par @product-manager — 2026-06-11*
