# User Flows — Site vitrine umbrella
## Aqua System × Les Terres Essentielles

> Source de vérité des parcours utilisateurs. Toute décision de navigation doit s'y référer.
> Dernière mise à jour : 2026-06-11 | Agent : @ux

---

## Principes directeurs non négociables

- **Conviction-first** : aucun CTA de contact au premier écran. Le hero est une déclaration, pas une capture.
- **CTA unique** : "Parlez-nous de votre projet" — jamais "Demander un devis", jamais "Contactez-nous maintenant".
- **Time-to-conviction, pas time-to-click** : l'objectif est que le visiteur parte convaincu, pas qu'il clique vite.
- **Zéro popup** sur tout le site.
- **Photos = matière première de conviction** : chaque réalisation visible avant tout argument textuel.

---

## Architecture de navigation V1

### Hiérarchie des pages

```
/ (Accueil)
├── /piscines-bien-etre        (F-02 — Univers piscines)
├── /jardins-paysage           (F-03 — Univers jardins)
├── /notre-approche            (F-04 — Méthode)
├── /realisations              (F-05 — Portfolio filtrable)
├── /la-maison                 (F-06 — À propos)
├── /prescripteurs             (F-07 — Espace prescripteurs)
├── /contact                   (F-08 — Formulaire)
└── /mentions-legales          (F-09 — Légal)
    └── /politique-confidentialite
```

### Navigation principale

**Desktop (≥ 1024px) — barre horizontale fixe en haut**

```
[Logo Aquasystem] | Piscines & Bien-être · Jardins & Paysage · Notre approche · Réalisations · La maison · Architectes | [Parlez-nous de votre projet →]
```

Règles :
- Logo = lien vers /
- CTA nav = bouton distinct, style primaire, toujours visible
- "Architectes" = label court pour /prescripteurs (vocabulaire Camille)
- Pas de mega-menu en V1 — navigation plate, 6 liens + CTA
- Position fixe (sticky) au scroll — le CTA reste accessible à tout moment

**Mobile (< 768px) — menu hamburger**

```
[Logo]                              [≡]
```

Menu ouvert = drawer plein écran (depuis la droite), fond sombre semi-transparent :
```
  Piscines & Bien-être
  Jardins & Paysage
  Notre approche
  Réalisations
  La maison
  Architectes
  ─────────────────────
  [Parlez-nous de votre projet]
```

Ordre : les univers d'abord (réalisations), puis l'institutionnel, CTA en bas bien séparé.
Fermeture : tap en dehors du drawer, swipe gauche, ou croix en haut à droite.

### Footer

Commun à toutes les pages, 3 colonnes desktop / stack mobile :

```
Colonne 1 — Identité         Colonne 2 — Navigation          Colonne 3 — Contact
[Logo Aquasystem]            Piscines & Bien-être             01 30 42 26 00
Aqua System                  Jardins & Paysage                contact@aqua-system.fr
en partenariat avec          Notre approche                   45 Route Nationale
Les Terres Essentielles      Réalisations                     78840 Freneuse
                             La maison
                             Espace prescripteurs             [Socotec logo]
                             Contact                          [Esprit Piscine logo]

──────────────────────────────────────────────────────────────────
© [Année] SARL Aqua System · Mentions légales · Politique de confidentialité
```

---

## Flow 1 — Alexandre : Découverte → Conviction → Contact

### Profil du visiteur

Alexandre, 48 ans, propriétaire à Saint-Nom-la-Bretèche. Il veut transformer son extérieur (piscine + jardin) mais a été déçu par la fragmentation des prestataires sur un précédent projet. Il consulte en soirée sur mobile, parfois depuis sa tablette le week-end.

### Entrées dans le parcours

| Canal d'entrée | Page d'arrivée | Contexte mental |
|----------------|---------------|-----------------|
| Bouche-à-oreille (voisin ou ami) | Accueil (/) | Confirmation d'une impression positive — il vient valider |
| Recommandation d'un architecte | Accueil (/) ou /prescripteurs | Délégation de confiance — il vient vérifier le sérieux |
| Google "pisciniste sur mesure Yvelines" | /piscines-bien-etre | Intention précise — il compare |
| Google "paysagiste haut de gamme 92" | /jardins-paysage | Intention précise — il compare |
| Google Business Profile | Accueil (/) | Découverte locale — curiosité qualifiée |
| Site montré en RDV par Nicolas | Accueil (/) | Contexte démonstration — visuel prime |

### Parcours type (happy path)

```
Entrée (accueil ou univers)
    │
    ▼
[1] HERO — 10 secondes de décision
    Tagline + photo réalisation premium
    → Il reste ? → OUI si photo = référence comparable à sa propriété
    → Tracking : page_viewed (automatique)
    │
    ▼
[2] EXPLORATION UNIVERS — 2-4 minutes
    Scroll accueil → deux univers présentés → clique sur piscines OU jardins
    → Voir les réalisations sur la page univers (3-4 photos situées)
    → Composant preuves : 30+ ans, 350+ piscines, Socotec
    → Tracking : cta_clicked (position: hero_univers)
    │
    ▼
[3] PORTFOLIO — 3-5 minutes
    → Navigation vers /realisations
    → Filtre par type (piscine, projet complet)
    → Voit une réalisation comparable à son projet (piscine + jardin, zone 78/92)
    → AHA MOMENT : "Ils ont déjà fait exactement ça près de chez moi"
    → Tracking : portfolio_filter_clicked, portfolio_realisation_viewed
    │
    ▼
[4] VALIDATION — 1-2 minutes
    → Navigation vers /notre-approche OU /la-maison
    → Comprend le process (vision → réalisation) et l'ancrage local
    → Frustration adressée : interlocuteur unique, zéro coordination à sa charge
    → Tracking : page_viewed (notre-approche)
    │
    ▼
[5] DÉCLENCHEUR DE CONTACT — CTA en bas de page approche ou réalisations
    → Clique "Parlez-nous de votre projet"
    → Tracking : cta_clicked (position: section_milieu ou footer)
    │
    ▼
[6] FORMULAIRE — 3 minutes max
    → Décrit son projet (type, commune, description)
    → Soumet
    → Tracking : form_start → form_submission_success
```

### Time-to-conviction cible et justification

**Cible : 3 à 5 pages, 8 à 15 minutes de navigation totale.**

Justification : Alexandre ne se décide pas sur la première page — c'est une décision à 70 000 €+. Il a besoin de voir des preuves (portfolio), comprendre le process (méthode), et avoir confiance dans l'ancrage local (à propos). La conviction vient de la séquence réalisations → méthode → contact, pas d'un seul argument. Un time-to-click inférieur à 3 minutes serait le signe d'un visiteur non qualifié ou d'un CTA trop agressif.

**Aha moment** : Voir dans le portfolio une réalisation identifiable géographiquement (commune proche) ET intégrant piscine + jardin. Ce moment valide les deux différenciateurs simultanément (double expertise + ancrage local).

### Audit heuristique Nielsen 10 — Flow Alexandre

| # | Heuristique | Statut | Evidence |
|---|-------------|--------|----------|
| H1 | Visibilité de l'état du système | PASS | Navigation sticky visible en permanence ; filtre portfolio indique l'état actif visuellement ; formulaire indique le champ en cours |
| H2 | Correspondance système/monde réel | PASS | Vocabulaire "propriété", "réalisation", "maison" — aligné sur le vocabulaire d'Alexandre défini en personas.md |
| H3 | Contrôle et liberté | PASS | Navigation toujours visible ; retour accueil depuis tout point ; filtre portfolio réinitialisable ; pas de modal bloquante |
| H4 | Cohérence et standards | PASS | CTA unique identique sur toutes les pages ; nav identique desktop/mobile (même ordre) ; footer identique |
| H5 | Prévention des erreurs | PASS | Formulaire : validation inline au blur (pas uniquement à la soumission) ; budget optionnel clairement indiqué |
| H6 | Reconnaissance plutôt que rappel | PASS | Portfolio filtrable (labels visuels) — pas besoin de mémoriser les catégories ; navigation plate sans sous-menus |
| H7 | Flexibilité et efficacité | PASS | Alexandre avancé peut aller directement à /realisations depuis la nav ; Camille accède directement à /prescripteurs |
| H8 | Design minimaliste | PASS | Hero : tagline + photo + CTA unique. Chaque page : un objectif, une action principale. Aucun élément décoratif sans rôle |
| H9 | Messages d'erreur | PASS | Erreur formulaire : "Format d'email invalide — vérifiez votre adresse" ; erreur réseau : numéro de téléphone comme fallback |
| H10 | Aide et documentation | PASS | Page méthode = guide implicite du process ; mention RGPD sous formulaire = aide contextuelle |

### Cognitive walkthrough — Flow Alexandre (first-time user)

Simulation étape par étape, sans aide extérieure.

**Étape 1 — Arrivée sur l'accueil**
- Sait-il quoi faire ? OUI — tagline et photo sont immédiatement lisibles.
- L'action est-elle visible ? OUI — CTA "Parlez-nous de votre projet" visible dans la nav et en bas du hero.
- Le lien but-action est-il clair ? OUI — "L'extérieur à la hauteur de votre propriété" répond à son JTBD.
- Le feedback est-il immédiat ? OUI — page chargée, contenu visible, pas de FOUC.

**Étape 2 — Cherche les réalisations**
- Sait-il quoi faire ? OUI — "Réalisations" dans la navigation principale est explicite.
- L'action est-elle visible ? OUI — nav sticky toujours présente.
- Le lien but-action est-il clair ? OUI — "Réalisations" = preuve de savoir-faire.
- Le feedback est-il immédiat ? OUI — page portfolio avec grille de photos chargée.

**Étape 3 — Filtre les réalisations**
- Sait-il quoi faire ? OUI — filtres visuels en haut de la grille avec labels clairs.
- L'action est-elle visible ? OUI — boutons filtres en évidence au-dessus de la grille.
- Le lien but-action est-il clair ? OUI — "Piscine", "Projet complet eau + jardin" sont des labels auto-explicatifs.
- Le feedback est-il immédiat ? OUI — grille se met à jour visuellement, filtre actif mis en évidence.

**Étape 4 — Veut comprendre le process**
- Sait-il quoi faire ? OUI — "Notre approche" dans la navigation.
- L'action est-elle visible ? OUI — nav toujours visible.
- Le lien but-action est-il clair ? ATTENTION — "Notre approche" est moins explicite que "Comment ça marche". [FRICTION H2] : À l'étape 4, le first-time user peut hésiter entre "Notre approche" et "La maison". Solution : sous-titre court sous "Notre approche" dans la nav mobile (tooltip desktop) : "De la vision à la réalisation".
- Le feedback est-il immédiat ? OUI — page méthode avec étapes visuelles.

**Étape 5 — Décide de contacter**
- Sait-il quoi faire ? OUI — CTA "Parlez-nous de votre projet" visible en bas de toutes les pages.
- L'action est-elle visible ? OUI — bouton stylisé, non confondu avec les liens de nav.
- Le lien but-action est-il clair ? OUI — le wording "Parlez-nous de votre projet" est conversationnel, pas transactionnel.
- Le feedback est-il immédiat ? OUI — navigation vers /contact avec formulaire visible.

**Étape 6 — Remplit le formulaire**
- Sait-il quoi faire ? OUI — formulaire clair, labels visibles, champs dans l'ordre logique.
- L'action est-elle visible ? OUI — bouton de soumission "Parlez-nous de votre projet" visible sans scroll sur mobile.
- Le lien but-action est-il clair ? OUI — formulaire court (4-6 champs), budget optionnel clairement indiqué.
- Le feedback est-il immédiat ? OUI — validation inline au blur ; message de succès après soumission.

### Métriques HEART — Flow Alexandre

**Dimension primaire : Task Success** (conversion = lead qualifié soumis)

| Dimension | Signal observable | Cible | Méthode de mesure |
|-----------|------------------|-------|-------------------|
| Task Success | form_submission_success avec commune 78/92 + type_projet + description ≥ 20 chars | ≥ 10 leads qualifiés/mois à M+6 (NSM kpi-framework.md) | Event analytics (Umami) + email reçu par Nicolas (source de vérité) |
| Adoption | Taux d'accès au portfolio depuis l'accueil | ≥ 30% des sessions accueil → /realisations (kpi-framework.md étape 2) | Pageviews analytics |
| Engagement | Profondeur de navigation + temps sur site | ≥ 2,5 pages/session, > 2 min (kpi-framework.md étape 2) | Analytics |
| Retention | Taux de retour (signal de considération longue) | Non cible primaire en V1 — surveiller seulement | Analytics |
| Happiness | CSAT implicite : % leads avec description utile (≥ 50 mots) | ≥ 70% (HYP-01 kpi-framework.md) | Review manuelle Nicolas |

### Events de tracking — Flow Alexandre

| Étape du flow | Event | Propriétés critiques |
|---------------|-------|---------------------|
| Arrivée accueil | page_viewed (E-10, automatique) | page_path: "/" |
| Clic CTA hero vers univers | cta_clicked (E-04) | position: "hero", page_source: "accueil" |
| Arrivée portfolio | page_viewed (E-10) | page_path: "/realisations" |
| Filtre portfolio | portfolio_filter_clicked (E-05) | filtre: "piscine" ou "projet_complet" |
| Vue réalisation | portfolio_realisation_viewed (E-06) | type_projet, zone_geo |
| Clic CTA vers contact | cta_clicked (E-04) | position: "section_milieu" ou "footer", page_source |
| Début formulaire | form_start (E-02) | page_source: "contact", device_type |
| Soumission | form_submission_success (E-01) | type_projet, commune, budget_renseigne, has_description |

**Point de décision non couvert** (à signaler @data-analyst) :
- Temps passé sur la page portfolio avant le clic CTA — signal de conviction fort, non mesurable avec les 9 events actuels sans IntersectionObserver.
- Navigation "à propos → contact" vs "portfolio → contact" : le chemin de conviction n'est pas tracé (on sait que le CTA a été cliqué, mais pas depuis quelle étape du parcours de conviction). L'event cta_clicked.page_source couvre partiellement cela.

### Critères de validation UX — Flow Alexandre

- [ ] L'objectif "voir une réalisation comparable + comprendre l'intégration eau+jardin" est atteignable sans aide en < 3 clics depuis l'accueil.
- [ ] Chaque écran principal (accueil, portfolio, approche, contact) a ≤ 3 actions principales visibles.
- [ ] Edge case : retour sur le site après 30 jours (tab restoré) — la nav sticky et le CTA permettent une reprise immédiate sans reconstruire le contexte.
- [ ] Edge case : portfolio avec 8 réalisations seulement (minimum V1) — la grille reste esthétiquement cohérente (wireframes.md).
- [ ] Edge case : erreur réseau lors de la soumission formulaire — fallback téléphone visible sur la page de confirmation d'erreur.
- [ ] WCAG 2.2 AA : contrastes ≥ 4,5:1 sur les textes courants, ≥ 3:1 sur les gros titres et les UI. Cibles tactiles ≥ 44px. Focus visible sur tous les éléments interactifs. Navigation clavier complète (nav, filtres portfolio, formulaire, CTA).
- [ ] Hiérarchie headings : H1 unique par page, H2 pour les sections, H3 pour les sous-sections. Jamais de heading sauté.

---

## Flow 2 — Camille : Arrivée prescripteur → Conviction pro → Contact

### Profil du visiteur

Camille, 42 ans, architecte en cabinet à Paris, cliente à 200 000 € de travaux extérieurs à Marnes-la-Coquette. Elle recherche un pisciniste ET un paysagiste fiables pour un client. Elle a été déçue par des exécutants qui court-circuitent la relation client.

### Entrées dans le parcours

| Canal d'entrée | Page d'arrivée | Contexte mental |
|----------------|---------------|-----------------|
| Recommandation d'un confrère architecte | /prescripteurs | Validation du sérieux — confiance partielle déléguée |
| Recherche Google "pisciniste certifié 78 architecte" | /prescripteurs ou /piscines-bien-etre | Recherche qualifiée, intention pro |
| Lien partagé par Nicolas Berg | /prescripteurs | Approche directe — évaluation |
| Navigation accueil → "Architectes" dans la nav | /prescripteurs | Découverte de la section dédiée |

### Parcours type (happy path)

```
Entrée (/prescripteurs ou accueil → /prescripteurs)
    │
    ▼
[1] VALIDATION DU SÉRIEUX — 60 secondes
    → Accroche : "L'exécutant haut de gamme que vos clients méritent"
    → Certification Socotec visible above the fold
    → Tracking : prescripteur_page_viewed (E-07)
    │
    ▼
[2] LECTURE DES PREUVES — 2 minutes
    → Certifications, bureau d'études intégré, 30+ ans
    → Protocole de collaboration : respect du cahier des charges, non court-circuit de la relation client
    → C'est ici qu'elle juge si la marque "parle son langage"
    │
    ▼
[3] VALIDATION PAR LE PORTFOLIO — 3 minutes
    → Lien vers /realisations (filtre "Projet intégré" pré-sélectionné)
    → Cherche des projets en zone 78/92 avec spécifications proches de son client
    → Tracking : portfolio_filter_clicked (filtre: "projet_complet"), portfolio_realisation_viewed
    │
    ▼
[4] DÉCLENCHEUR DE CONTACT — CTA "Présentons-nous"
    → Tracking : prescripteur_cta_clicked (E-08) (position: above_fold ou milieu_page)
    │
    ▼
[5] FORMULAIRE — type "prescripteur" pré-sélectionné
    → Soumet sa demande de prise de contact professionnelle
    → Tracking : form_start → form_submission_success (type_projet: "prescripteur")
```

### Audit heuristique Nielsen 10 — Flow Camille

| # | Heuristique | Statut | Evidence |
|---|-------------|--------|----------|
| H1 | Visibilité de l'état | PASS | Section prescripteurs identifiable dans la nav ("Architectes") ; CTA dédié "Présentons-nous" distinct du CTA général |
| H2 | Vocabulaire du monde réel | PASS | "Cahier des charges", "bureau d'études", "certification", "interlocuteur technique" — vocabulaire Camille (personas.md) |
| H3 | Contrôle et liberté | PASS | Camille peut naviguer librement entre prescripteurs et portfolio sans perte de contexte |
| H4 | Cohérence | PASS | CTA "Présentons-nous" cohérent avec le CTA global ; navigation identique |
| H5 | Prévention des erreurs | PASS | Type "prescripteur" pré-sélectionné dans le formulaire quand on vient de /prescripteurs — évite l'erreur de catégorie |
| H6 | Reconnaissance > rappel | PASS | Lien vers portfolio depuis /prescripteurs avec filtre suggéré — pas besoin de mémoriser |
| H7 | Flexibilité | PASS | Camille experte peut aller directement à /realisations depuis la nav |
| H8 | Minimalisme | PASS | Page prescripteurs focalisée sur ses 3 besoins : preuves, protocole de collaboration, portfolio |
| H9 | Messages d'erreur | PASS | Identiques au flow Alexandre |
| H10 | Aide | PASS | Page prescripteurs = aide contextuelle pour son processus de recommandation |

**[FRICTION H2] détectée** : Le label "Architectes" dans la nav est exact mais peut être vu comme exclusif par les décorateurs d'intérieur ou paysagistes prescripteurs. Solution : laisser "Architectes" (label court, SEO) et préciser sur la page elle-même "Pour les architectes, paysagistes et décorateurs d'intérieur".

### Cognitive walkthrough — Flow Camille

**Étape 1 — Arrivée /prescripteurs**
- Sait-elle quoi faire ? OUI — contenu immédiatement pertinent, ton pro reconnaissable.
- L'action est-elle visible ? OUI — CTA "Présentons-nous" distinct et accessible.
- Le lien but-action est-il clair ? OUI — "L'exécutant que vos clients méritent" répond directement à sa peur première.
- Le feedback est-il immédiat ? OUI — page chargée, contenu visible.

**Étape 2 — Cherche des références vérifiables**
- Sait-elle quoi faire ? OUI — lien "Voir les réalisations" explicite depuis la page prescripteurs.
- L'action est-elle visible ? OUI — lien en évidence, filtre "Projet intégré" suggéré.
- Le lien but-action est-il clair ? OUI — elle cherche des projets comparables.
- Le feedback est-il immédiat ? OUI — portfolio filtré immédiatement.

**Étape 3 — Décide de contacter**
- Sait-elle quoi faire ? OUI — CTA "Présentons-nous" visible.
- L'action est-elle visible ? OUI — bouton distinct, présent sur la page prescripteurs.
- Le lien but-action est-il clair ? OUI — wording professionnel, pas "Demander un devis".
- Le feedback est-il immédiat ? OUI — formulaire avec type pré-sélectionné.

### Métriques HEART — Flow Camille

**Dimension primaire : Adoption** (les prescripteurs trouvent et utilisent la page dédiée)

| Dimension | Signal observable | Cible | Méthode de mesure |
|-----------|------------------|-------|-------------------|
| Adoption | prescripteur_page_viewed / sessions totales | ≥ 3% des sessions (kpi-framework.md étape 6) | Event analytics E-07 |
| Task Success | form_submission_success avec type_projet = "prescripteur" | ≥ 1 lead prescripteur à M+3, ≥ 5% des leads à M+6 (kpi-framework.md) | Event analytics + email |
| Engagement | Taux clic CTA prescripteur depuis la page | ≥ 20% des vues /prescripteurs (kpi-framework.md étape 6) | Event E-08 / E-07 |
| Happiness | Signal indirect : Camille partage la page à son client (taux de trafic referrer interne) | Non cible chiffrée en V1 | Analytics referrer |
| Retention | Non pertinent en V1 pour Camille (relation ponctuelle par projet) | — | — |

### Events de tracking — Flow Camille

| Étape | Event | Propriétés |
|-------|-------|-----------|
| Arrivée /prescripteurs | prescripteur_page_viewed (E-07) | referrer_type, device_type |
| Vue portfolio depuis prescripteurs | portfolio_filter_clicked (E-05) | filtre: "projet_complet" |
| Vue réalisation | portfolio_realisation_viewed (E-06) | type_projet, zone_geo |
| Clic CTA "Présentons-nous" | prescripteur_cta_clicked (E-08) | position: "above_fold" ou "milieu_page" |
| Début formulaire | form_start (E-02) | page_source: "prescripteurs", device_type |
| Soumission | form_submission_success (E-01) | type_projet: "prescripteur", commune, budget_renseigne |

**Point de décision non couvert** (à signaler @data-analyst) :
- La distinction entre un prescripteur qui navigue seul et un prescripteur qui montre la page à son client n'est pas mesurable avec les events actuels. Signal proxy possible : session longue sur /prescripteurs depuis un lien direct.

### Critères de validation UX — Flow Camille

- [ ] "Présentons-nous" → formulaire avec type pré-sélectionné : zéro friction supplémentaire.
- [ ] La page prescripteurs est lisible et crédible pour quelqu'un qui la découvre pour la première fois (pas de jargon interne). Validable par le testeur-prescripteur recommandé en fin de fichier.
- [ ] ≤ 3 actions principales sur la page prescripteurs : lire les preuves, voir le portfolio, contacter.
- [ ] WCAG 2.2 AA identique au flow Alexandre.

---

## Flow 3 — Cross-selling : visiteur d'un univers exposé à l'autre

### Objectif

Qu'un visiteur entré par l'univers "piscine" découvre naturellement l'offre jardin — et inversement — sans quitter la page, sans que cela soit perçu comme une publicité intrusive.

### Règle de conception du composant cross-selling

- **Placement** : en bas de chaque page univers (F-02, F-03), après le contenu principal et les preuves, avant le CTA de contact. Aussi en bas de certaines fiches réalisation du portfolio (pour les projets piscine-seule : cross-selling vers jardin ; pour les projets jardin-seul : cross-selling vers piscine).
- **Ton** : complémentarité, pas upsell. "Votre piscine mérite un jardin à sa mesure" — pas "Découvrez aussi nos jardins !".
- **Format** : split visuel 50/50 — photo univers destination à gauche, texte à droite. Un seul CTA "Voir nos créations paysagères" (ou inverse).
- **Formulation légale** : sur F-03 (jardins), inclure "en partenariat avec Les Terres Essentielles" conforme à la décision @legal.

### Parcours cross-selling — Entrée piscine → Jardin

```
/piscines-bien-etre
    │ scroll bas de page
    ▼
[Composant cross-selling]
"Votre piscine mérite un jardin à sa mesure.
Les Terres Essentielles conçoit l'ensemble."
[Voir nos créations paysagères →]
    │ clic
    ▼
/jardins-paysage
    │
    ▼
Découverte de l'offre jardin
    │ si convaincu
    ▼
CTA "Parlez-nous de votre projet" → /contact
    → type_projet : "projet_complet eau+jardin" (pré-suggéré, modifiable)
```

### Parcours cross-selling — Entrée jardin → Piscine

```
/jardins-paysage
    │ scroll bas de page
    ▼
[Composant cross-selling]
"Un jardin d'exception autour d'une piscine sur mesure.
Notre maison Aqua System les conçoit ensemble."
[Découvrir nos piscines →]
    │ clic
    ▼
/piscines-bien-etre
```

### Event de tracking

| Étape | Event | Propriétés |
|-------|-------|-----------|
| Clic cross-selling | cross_selling_clicked (E-09) | source_univers: "piscines" ou "jardins", destination_univers: "jardins" ou "piscines" |

### Cible : cross_selling_clicked ≥ 10% des sessions sur les pages univers (kpi-framework.md HYP-02).

---

## Flow 4 — Nicolas (parcours "carte de visite" en rendez-vous)

### Contexte

Nicolas Berg montre le site sur son téléphone ou tablette pendant un premier rendez-vous avec un prospect. Le site doit fonctionner comme une carte de visite visuelle haute qualité, pas comme un formulaire de contact.

### Ce que Nicolas cherche dans ce parcours

1. Aller directement au portfolio (réalisations comparables à la propriété du prospect)
2. Afficher une réalisation en plein écran pour montrer la qualité des photos
3. Montrer les certifications (Socotec, L'Esprit Piscine) rapidement si questionné
4. Montrer la page "La maison" si le prospect veut en savoir plus sur l'équipe

### Parcours type

```
Nicolas sur son téléphone : tape l'URL ou ouvre un favori
    │
    ▼
Accueil (/) — photo hero = première impression, 10 secondes
    │ tap nav hamburger → "Réalisations"
    ▼
/realisations — grille de photos en plein écran mobile-first
    │ tap filtre "Piscine" ou "Projet complet"
    ▼
Réalisations filtrées
    │ tap une réalisation comparable
    ▼
Photo en grand — description sobre (type, zone, prestations)
    │ si questions sur les certifications : nav → "La maison"
    ▼
/la-maison — preuves : 30+ ans, Socotec, L'Esprit Piscine
```

### Contraintes UX critiques pour ce flow

- **Les photos doivent être le premier élément visible** sur /realisations, au-dessus de tout texte.
- **Touch targets ≥ 44px** pour les filtres et les cartes réalisations — utilisé pendant une démonstration, pas le droit à l'erreur.
- **Chargement rapide en 4G** : LCP < 4s sur mobile (seuil dégradé US-03 edge case).
- **Pas de menu complexe** à parcourir — la navigation doit permettre de passer de /realisations à /la-maison en 2 taps maximum.

---

## Agents spécialisés recommandés

| Agent | Type | Rôle | Justification liée au parcours | Priorité |
|-------|------|------|-------------------------------|----------|
| @testeur-persona (Alexandre) | Testeur | Simuler le parcours Alexandre sur desktop et mobile, évaluer le time-to-conviction réel | Le parcours repose sur des hypothèses sur le comportement d'Alexandre — un testeur persona le valide ou l'invalide avant dev | P1 |
| @testeur-prescripteur (Camille) | Testeur | Valider la page prescripteurs du point de vue d'une architecte réelle | Le vocabulaire et les preuves attendus par Camille sont des hypothèses — risque de faux pas sur la page la plus différenciante | P1 |

---

*Fichier produit par @ux — 2026-06-11*
