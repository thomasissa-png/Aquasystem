# Wireframes — Site vitrine umbrella
## Aqua System × Les Terres Essentielles

> Source de vérité de la structure fonctionnelle. @design ajuste les proportions visuelles sans modifier la structure.
> En cas de conflit layout : @ux arbitre (la fonction prime sur l'esthétique).
> Dernière mise à jour : 2026-06-11 | Agent : @ux

---

## Conventions de lecture

- **[Photo : description]** = slot image réel, jamais générique, jamais placeholder non balisé
- **[TOKEN]** = valeur substituable (nom de marque, couleur, texte)
- **ABOVE FOLD** = visible sans scroll au breakpoint concerné
- Colonnes = grille 12 colonnes (desktop), 4 colonnes (mobile)
- Touch target minimum = 44×44px sur tous les éléments interactifs mobiles
- Sticky = reste visible au scroll

---

## Composants transversaux (présents sur toutes les pages)

### Header (sticky, full-width)

**Desktop (≥ 1024px)**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo [TOKEN]] col 1-2   [Nav : Réalisations · Piscines & Bien-être ·        │
│                           Jardins & Paysage · Notre approche ·              │
│                           La maison · Architectes] col 3-10                 │
│                           [Bouton primaire : Parlez-nous de votre projet]    │
│                           col 11-12  (hauteur 64px, padding H 24px)         │
└─────────────────────────────────────────────────────────────────────────────┘
```
- Fond : couleur brand (définie par @design)
- Logo : SVG, lien vers /
- Nav links : texte, hover = underline ou couleur secondaire
- Bouton CTA : background contraste fort, hauteur 44px minimum
- Event : cta_clicked (position: "navbar") au clic sur le bouton

**Mobile (< 768px)**
```
┌───────────────────────────────────────────┐
│ [Logo [TOKEN]]              [≡ Menu] 44px │
└───────────────────────────────────────────┘
```
Drawer ouvert (full-screen overlay, fond sombre 90% opacité) :
```
┌───────────────────────────────────────────┐
│                                   [✕ 44px]│
│  Piscines & Bien-être                     │
│  Jardins & Paysage                        │
│  Notre approche                           │
│  Réalisations                             │
│  La maison                                │
│  Architectes                              │
│  ───────────────────────────────          │
│  [Parlez-nous de votre projet]  (btn 44px)│
└───────────────────────────────────────────┘
```
Fermeture : tap extérieur, swipe gauche, bouton ✕.
Focus piégé dans le drawer (accessibilité WCAG 2.2).

**Tablette (768px-1023px)** : header desktop simplifié, nav réduite aux 4 liens prioritaires + menu "…" pour les autres + bouton CTA. Alternatively full hamburger si les liens ne tiennent pas.

---

### Footer (full-width, statique)

**Desktop — grille 3 colonnes (4-4-4)**
```
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ [Logo [TOKEN]]       │ Navigation           │ Contact              │
│ Aqua System          │ Piscines & Bien-être │ 01 30 42 26 00       │
│ en partenariat avec  │ Jardins & Paysage    │ contact@aqua-system  │
│ Les Terres           │ Notre approche       │ .fr                  │
│ Essentielles         │ Réalisations         │ 45 Route Nationale   │
│                      │ La maison            │ 78840 Freneuse       │
│ [Socotec badge]      │ Espace prescripteurs │                      │
│ [Esprit Piscine      │ Contact              │ [Lien LinkedIn]      │
│  badge]              │                      │ [Lien Facebook]      │
└──────────────────────┴──────────────────────┴──────────────────────┘
© [ANNÉE] SARL AQUA SYSTEM · Mentions légales · Politique de confidentialité
```

**Mobile — stack vertical**
```
[Logo]
Aqua System / en partenariat avec Les Terres Essentielles
[Liens nav condensés en 2 colonnes]
[Contact : tel + email]
[Badges certifications]
[Réseaux sociaux]
© [ANNÉE] · Mentions légales · Confidentialité
```

---

### Composant CTA sectionnel (réutilisable)

Utilisé en bas de chaque section de contenu principal avant le footer.
```
┌─────────────────────────────────────────────────────────────────┐
│               [Texte d'amorce contextuel — 1 ligne]             │
│         [Bouton : Parlez-nous de votre projet →]  (centré)      │
└─────────────────────────────────────────────────────────────────┘
```
- Fond légèrement différencié (couleur brand secondaire ou neutre foncé)
- Bouton : hauteur 52px desktop, 48px mobile, width auto avec padding H 32px
- Event : cta_clicked (position: "footer" ou "section_milieu" selon placement)

---

### Composant preuves (proof points)

4 éléments en ligne desktop / 2×2 mobile.
```
Desktop :
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  30+ ans     │ 350+ piscines│ Certification│ Réseau       │
│  d'expertise │ entretenues  │ Socotec      │ L'Esprit     │
│              │ 78/92        │ CSP/ESP-001  │ Piscine      │
└──────────────┴──────────────┴──────────────┴──────────────┘

Mobile :
┌──────────────┬──────────────┐
│  30+ ans     │ 350+ piscines│
│  d'expertise │ entretenues  │
├──────────────┼──────────────┤
│ Socotec      │ L'Esprit     │
│ CSP/ESP-001  │ Piscine      │
└──────────────┴──────────────┘
```

---

### Composant cross-selling

Split 50/50 desktop / stack mobile (photo dessus, texte dessous).

```
Desktop :
┌──────────────────────────┬──────────────────────────────────┐
│ [Photo : réalisation     │  "Votre piscine mérite un jardin │
│  jardin/piscine intégrée │   à sa mesure."                  │
│  — format 16:9]          │                                  │
│                          │  Texte complémentarité (2-3      │
│                          │  lignes max)                     │
│                          │                                  │
│                          │  [CTA secondaire : Voir nos      │
│                          │   créations paysagères →]        │
└──────────────────────────┴──────────────────────────────────┘
Event : cross_selling_clicked (source_univers, destination_univers)

Mobile :
┌──────────────────────────────────────────┐
│ [Photo : réalisation — format 16:9]      │
├──────────────────────────────────────────┤
│ "Votre piscine mérite un jardin          │
│  à sa mesure."                           │
│ Texte complémentarité (2-3 lignes)       │
│ [CTA secondaire : Voir nos créations →]  │
└──────────────────────────────────────────┘
```

---

## WF-01 — Page d'accueil (/)

### Structure complète

**ABOVE FOLD — Desktop (1280px)**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Photo : piscine à débordement intégrée dans un parc paysager de          │
│   propriété 78 ou 92 — plein écran, format 16:9, hauteur 90vh max]         │
│                                                                             │
│  Overlay gradient bas vers haut (transparent → semi-opaque) :              │
│                                                                             │
│  H1 : "L'extérieur à la hauteur de votre propriété."                       │
│  Sous-titre : "Un seul interlocuteur pour l'eau et le jardin —             │
│                depuis plus de 30 ans dans l'ouest parisien."               │
│                                                                             │
│  [CTA : Parlez-nous de votre projet →]                                     │
│                                                                             │
│  Positionnement du texte : bas gauche, col 1-6, padding-bottom 64px        │
└─────────────────────────────────────────────────────────────────────────────┘
```

Event : cta_clicked (position: "hero") au clic sur le CTA hero.

**ABOVE FOLD — Mobile (375px)**
```
┌──────────────────────────────────────────┐
│ [HEADER]                                 │
├──────────────────────────────────────────┤
│ [Photo : même réalisation — 100vw,       │
│  hauteur 60vh — portrait ou square crop] │
│                                          │
│ H1 : "L'extérieur à la hauteur de       │
│       votre propriété."                  │
│                                          │
│ Sous-titre : "Un seul interlocuteur —   │
│ 30 ans dans l'ouest parisien."           │
│                                          │
│ [CTA : Parlez-nous de votre projet →]    │
│ (width 100%, hauteur 52px)               │
└──────────────────────────────────────────┘
```

---

**BELOW FOLD — Section deux univers**

Desktop — 2 colonnes égales (6-6) :
```
┌────────────────────────────┬───────────────────────────────┐
│ [Photo : piscine sur       │ [Photo : parc paysager        │
│  mesure — format carré     │  d'exception — format carré]  │
│  ou 4:3]                   │                               │
│                            │                               │
│  H2 : "Piscines &          │  H2 : "Jardins &              │
│        Bien-être"          │        Paysage"               │
│  Texte intro (2-3 lignes)  │  Texte intro (2-3 lignes)     │
│  Aqua System               │  en partenariat avec          │
│                            │  Les Terres Essentielles      │
│  [Lien : Découvrir →]      │  [Lien : Découvrir →]         │
└────────────────────────────┴───────────────────────────────┘
```

Mobile — stack vertical (piscines d'abord, jardins ensuite) :
```
[Photo piscine — 100vw, 200px height]
H2 : Piscines & Bien-être
Texte (2-3 lignes)
[Lien : Découvrir →]

[Photo jardins — 100vw, 200px height]
H2 : Jardins & Paysage
Texte (2-3 lignes)
[Lien : Découvrir →]
```

---

**BELOW FOLD — Section preuves**

[Composant preuves — voir composants transversaux]
Fond légèrement différencié. Padding V 48px.

---

**BELOW FOLD — Extrait portfolio (3 réalisations phares)**

Desktop — grille 3 colonnes (4-4-4) :
```
┌──────────────────┬──────────────────┬──────────────────┐
│ [Photo : piscine │ [Photo : jardin  │ [Photo : projet  │
│  à débordement   │  parc de grande  │  intégré piscine │
│  Le Vésinet]     │  propriété 92]   │  + terrasse + vé-│
│                  │                  │  gétal, 78]      │
│ Type : Piscine   │ Type : Jardin    │ Type : Projet    │
│ Zone : 78        │ Zone : 92        │ complet          │
└──────────────────┴──────────────────┴──────────────────┘
         [Voir toutes les réalisations →]  (centré)
```

Mobile — 1 colonne, scroll vertical :
```
[Photo réalisation 1 — 100vw, 220px]
Type : Piscine — Zone : 78

[Photo réalisation 2 — 100vw, 220px]
Type : Jardin — Zone : 92

[Photo réalisation 3 — 100vw, 220px]
Type : Projet complet — Zone : 78

[Voir toutes les réalisations →]
```

---

**BELOW FOLD — Section CTA final**

[Composant CTA sectionnel]
Texte d'amorce : "Un projet d'extérieur mérite une conversation — pas un formulaire."

---

**BELOW FOLD — Footer**

[Composant footer — voir composants transversaux]

---

### États applicables — WF-01

| État | Comportement |
|------|-------------|
| Default | Contenu complet chargé |
| Loading (connexion lente 3G) | Texte hero visible en premier (priorité CSS), image chargée en LCP — jamais de layout shift |
| Photo hero indisponible (erreur CDN) | Fond uni couleur brand + texte hero lisible — CTA toujours visible |
| Sans JavaScript | Navigation fonctionne (HTML pur), formulaire non disponible (fallback : numéro téléphone visible) |

### Points de sortie depuis WF-01

- Hero CTA → /contact
- "Découvrir" piscines → /piscines-bien-etre
- "Découvrir" jardins → /jardins-paysage
- Photo réalisation extrait → /realisations
- "Voir toutes les réalisations" → /realisations
- Nav : toutes les pages

---

## WF-02 — Page Piscines & Bien-être (/piscines-bien-etre)

### Structure complète

**ABOVE FOLD — Desktop**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Photo : piscine sur mesure premium — pleine largeur, hauteur 60vh         │
│  format 21:9 ou 16:9 — pas de personnes dans l'eau, propriété seule]       │
│                                                                             │
│  H1 : "Piscines & Bien-être"                                               │
│  Sous-titre : "Notre maison Aqua System — conception sur mesure           │
│                depuis plus de 30 ans en Yvelines et Hauts-de-Seine."       │
└─────────────────────────────────────────────────────────────────────────────┘
```

**BELOW FOLD — Prestations (grid 2 colonnes desktop)**

Colonne gauche (texte) / colonne droite (photo) — pattern alterné :
```
Bloc 1 :
[Texte : Conception et construction sur mesure (H2)]
[Corps : 2-3 lignes, vocabulaire Aqua System, pas de jargon]
         |
[Photo : piscine en cours de construction ou vue finale]

Bloc 2 (inversé) :
[Photo : spa HotSpring intégré en terrasse]
         |
[Texte : Spas, saunas, hammams (H2)]
[Corps : 2-3 lignes]

Bloc 3 :
[Texte : Entretien annuel & SAV (H2)]
[Corps : 2-3 lignes — pilier relation long terme]
         |
[Photo : technicien Aqua System (si autorisation photo) ou équipement]
```

Mobile — stack vertical, photo au-dessus du texte pour chaque bloc :
```
[Photo bloc 1]
H2 : Conception et construction
Corps (2-3 lignes)

[Photo bloc 2]
H2 : Spas, saunas, hammams
Corps (2-3 lignes)
```

---

**BELOW FOLD — Composant preuves (certifications Aqua System)**

[Composant preuves] + badge Socotec + badge L'Esprit Piscine

---

**BELOW FOLD — Composant cross-selling**

[Composant cross-selling — source: piscines → destination: jardins]
Texte : "Votre piscine mérite un jardin à sa mesure — en partenariat avec Les Terres Essentielles."

---

**BELOW FOLD — Composant CTA sectionnel**

Texte d'amorce : "Votre projet commence par une conversation."

---

### États applicables — WF-02

| État | Comportement |
|------|-------------|
| Default | Contenu complet |
| Photo bloc indisponible | Fond gris sobre (couleur neutre brand) — pas d'image cassée |
| Mobile < 375px | Stack maintenu, texte pas tronqué |

---

## WF-03 — Page Jardins & Paysage (/jardins-paysage)

Structure symétrique à WF-02, avec adaptations :

**ABOVE FOLD**
```
H1 : "Jardins & Paysage"
Sous-titre : "En partenariat avec Les Terres Essentielles — bureau d'études
              paysager, création de parcs et jardins d'exception."
[Photo : parc de grande propriété 78/92 — pleine largeur]
```

**Prestations — 3 blocs**
1. Bureau d'études paysager (H2)
2. Création de parcs et jardins (H2)
3. Entretien et pépinière (H2)

Chaque bloc : texte + photo alternés (même pattern que WF-02).

**Formulation légale obligatoire** : "en partenariat avec Les Terres Essentielles" visible dans le sous-titre hero ET dans chaque bloc prestation à la première mention du nom.

**Cross-selling** : direction inverse — source: jardins → destination: piscines.
Texte : "Un jardin d'exception autour d'une piscine sur mesure — notre maison Aqua System les conçoit ensemble."

---

## WF-04 — Page Notre approche (/notre-approche)

### Structure complète

**ABOVE FOLD — Desktop**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ H1 : "De la vision à la réalisation"                         col 1-8       │
│ Sous-titre : "Comment nous portons un projet d'extérieur       col 1-6      │
│               de bout en bout — et pourquoi cela change tout."             │
│ [Photo : propriété transformée — vue d'ensemble piscine+jardin] col 9-12   │
└─────────────────────────────────────────────────────────────────────────────┘
```

Hero : split 60-40 (texte gauche, photo droite). Mobile : texte seul above fold, photo après.

**BELOW FOLD — Timeline des étapes (5 étapes, disposition verticale)**

Desktop : timeline centrale avec numéro + titre H2 à gauche, texte à droite (alternance).
Mobile : stack vertical linéaire.

```
Étape 1 — [icône ou numéro]  "L'écoute"
  Texte : "Nous commençons par comprendre votre vision — l'espace,
           les usages, ce que vous imaginez. Pas un formulaire, une conversation."

Étape 2 — [icône ou numéro]  "Le bureau d'études"
  Texte : "Piscine et jardin conçus ensemble dès le plan. Les deux maisons
           coordonnent dès cette étape — zéro interface à gérer pour vous."

Étape 3 — [icône ou numéro]  "La réalisation"
  Texte : "Un seul interlocuteur sur le chantier. Nous gérons les corps
           de métier, les délais, les interfaces techniques."

Étape 4 — [icône ou numéro]  "La livraison"
  Texte : "Réception conjointe de la piscine et du jardin. Pas de
           livraison partielle qui laisse votre propriété en chantier."

Étape 5 — [icône ou numéro]  "Le suivi annuel"
  Texte : "Votre piscine est entretenue par ceux qui l'ont conçue.
           L'équipe connaît votre équipement — pas besoin de tout réexpliquer."
```

**BELOW FOLD — Ancrage local**
```
H2 : "Nous connaissons ces propriétés — et leurs contraintes"
Texte : connaissance nappes phréatiques, PLU locaux, sol argilo-calcaire.
        Communes nommées : Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray,
        Marnes-la-Coquette, Saint-Cloud.
[Photo : carte visuelle zone 78/92 OU photo d'un chantier en contexte local]
```

**BELOW FOLD — CTA**
[Composant CTA sectionnel]
Texte d'amorce : "Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble."

---

### États — WF-04

| État | Comportement |
|------|-------------|
| Default | Timeline complète en 5 étapes |
| Mobile | Stack linéaire, numéro étape en grand (lisibilité en démonstration Nicolas) |

---

## WF-05 — Page Portfolio (/realisations)

### Structure complète

**ABOVE FOLD — Desktop**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ H1 : "Réalisations"                                                         │
│ Sous-titre : "30 ans de chantiers dans les propriétés de l'ouest parisien" │
│                                                                             │
│ [Filtres — full-width, horizontal]                                          │
│ [Tous] [Piscine] [Spa & Sauna] [Jardin & Parc] [Projet complet eau+jardin] │
└─────────────────────────────────────────────────────────────────────────────┘
```

Filtres : boutons pill, état actif = fond coloré, label lisible, hauteur 40px (≥ 44px avec padding vertical).
Event au clic : portfolio_filter_clicked (filtre: valeur).

**ABOVE FOLD — Mobile**
```
H1 : "Réalisations"
[Filtres — scroll horizontal sur une ligne, pas de retour à la ligne]
[Tous] [Piscine] [Spa & Sauna] [Jardin & Parc] [Projet complet]
```
Filtres mobiles : scroll horizontal (overflow-x: auto, snap), sans retour à la ligne. Le filtre actif toujours visible (pas de coupure visuelle à gauche).

**BELOW FOLD — Grille réalisations**

Desktop — grille 3 colonnes (4-4-4) :
```
┌──────────────────┬──────────────────┬──────────────────┐
│ [Photo : ...]    │ [Photo : ...]    │ [Photo : ...]    │
│ format 4:3       │ format 4:3       │ format 4:3       │
│                  │                  │                  │
│ Piscine sur      │ Projet complet   │ Jardin & Parc    │
│ mesure           │ eau + jardin     │ grande propriété │
│ Yvelines (78)    │ Hauts-de-Seine   │ Yvelines (78)    │
│                  │ (92)             │                  │
│ [Voir →]         │ [Voir →]         │ [Voir →]         │
└──────────────────┴──────────────────┴──────────────────┘
```

Mobile — 1 colonne :
```
[Photo réalisation — 100vw, 220px]
Piscine sur mesure — Yvelines (78)
[Voir →]
```

Ou 2 colonnes serrées (recommandé pour affichage rapide en démonstration) :
```
┌──────────────────┬──────────────────┐
│ [Photo — 160px]  │ [Photo — 160px]  │
│ Piscine — 78     │ Jardin — 92      │
└──────────────────┴──────────────────┘
```
Arbitrage responsive : 2 colonnes sur mobile si les photos sont suffisamment larges. @design tranche sur la proportion.

**Minimum V1 : 8 réalisations** (6 piscines + 2 jardins si photos jardins disponibles, ou 8 piscines avec filtre jardins vide géré proprement).

---

### État "filtre sans résultat"

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│         [Filtre actif : Spa & Sauna]                                     │
│                                                                          │
│         Aucune réalisation dans cette catégorie pour le moment.          │
│                                                                          │
│         [← Voir toutes les réalisations]                                 │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Pas de message d'erreur — message humain, sobre. CTA = réinitialiser le filtre (pas une promesse de contenu futur).

---

### WF-05b — Fiche réalisation (page détail)

Route : /realisations/[slug]

**Desktop — Layout 60-40**
```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Retour aux réalisations                                              │
├─────────────────────────────────────────────────────┬──────────────────┤
│ [Photo principale — format 16:9 ou carré large]     │ Type de projet   │
│ col 1-8                                              │ Zone géographique│
│                                                      │ Prestations      │
│ [Photo 2 si disponible — format 4:3]                │ réalisées        │
│                                                      │                  │
│ [Photo 3 si disponible — format 4:3]                │ [Composant       │
│                                                      │  cross-selling   │
│                                                      │  si piscine      │
│                                                      │  seule]          │
│                                                      │                  │
│                                                      │ [CTA : Parlez-   │
│                                                      │  nous de votre   │
│                                                      │  projet →]       │
└─────────────────────────────────────────────────────┴──────────────────┘
```

Mobile — stack vertical :
```
← Retour
[Photo principale — 100vw]
[Photo 2 — 100vw si disponible]
Type de projet | Zone géo
Prestations réalisées
[Cross-selling si applicable]
[CTA pleine largeur]
```

**Données par fiche réalisation** (source JSON statique) :
- `type` : piscine | spa_sauna | jardin_parc | projet_complet
- `zone_geo` : "Yvelines (78)" | "Hauts-de-Seine (92)"
- `prestations` : liste courte (3 lignes max)
- `photos` : 1 à 3 URLs — jamais de nom de propriétaire, jamais d'adresse précise
- `slug` : identifiant URL (ex: "piscine-debordement-vesinet-01")

Event : portfolio_realisation_viewed (E-06) au chargement de la fiche.

**État "photo non disponible"** : fond gris sobre (couleur neutre brand), hauteur maintenue — pas d'image cassée, pas d'icône générique.

---

### États applicables — WF-05

| État | Comportement |
|------|-------------|
| Default — 8+ réalisations | Grille complète, filtre "Tous" actif par défaut |
| Filtre sans résultat | Message sobre + CTA réinitialiser (voir ci-dessus) |
| Photo manquante | Fond neutre maintenu, layout intact |
| Mobile démonstration (Nicolas en RDV) | 2 colonnes, photos grandes, filtres accessibles en 1 tap |
| Chargement lent | Skeleton placeholder (rectangles gris) à la place des photos — layout stable, pas de CLS |

---

## WF-06 — Page La maison (/la-maison)

### Structure complète

**ABOVE FOLD**
```
H1 : "La maison"
Sous-titre : "Plus de 30 ans d'expertise dans les plus belles propriétés
              de l'ouest parisien — et une conviction : le détail fait tout."
[Photo : Nicolas Berg si autorisation / chantier Aqua System en contexte /
         photo d'équipe si autorisée — jamais de banque d'images]
```

Si aucune photo de personne disponible : photo d'une réalisation représentative en contexte d'abord.

**BELOW FOLD — Sections**

```
H2 : "Notre histoire"
Texte : "Plus de 30 ans d'expertise" (jamais "société créée il y a 30 ans").
        Ancrage local 78/92. L'équipe de 8 (sans nommer si pas d'autorisation).

H2 : "Aqua System"
Texte : conception, construction, entretien de piscines — certifications.
[Badge Socotec] [Badge L'Esprit Piscine]

H2 : "En partenariat avec Les Terres Essentielles"
Texte : bureau d'études paysager, parcs et jardins d'exception.
        Adresse : CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi.
```

**BELOW FOLD — Valeurs (3 piliers, non liste générique)**

Desktop — 3 colonnes (4-4-4) :
```
┌──────────────────┬──────────────────┬──────────────────┐
│ Exigence         │ Confiance        │ Sur-mesure       │
│ [2-3 lignes de   │ [2-3 lignes de   │ [2-3 lignes de   │
│  texte ancré     │  texte ancré     │  texte ancré     │
│  sur des preuves]│  sur des preuves]│  sur des preuves]│
└──────────────────┴──────────────────┴──────────────────┘
```

Mobile — stack vertical, chaque valeur avec texte ancré (pas de liste bullet générique).

**BELOW FOLD — CTA**
[Composant CTA sectionnel]

---

## WF-07 — Page Espace prescripteurs (/prescripteurs)

### Structure complète

**ABOVE FOLD — Desktop (priorité Camille)**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ H1 : "L'exécutant haut de gamme que vos clients méritent"    col 1-7       │
│       "— et qui fait honneur à votre prescription."                         │
│                                                                             │
│ Sous-titre : "Pour les architectes, paysagistes et décorateurs              │
│               d'intérieur — un partenaire qui travaille sur votre plan."    │
│                                                                             │
│ [CTA "Présentons-nous →"] (position: above_fold)                col 1-4    │
│                                                                             │
│ [Badges Socotec + L'Esprit Piscine] (visibles above fold)       col 1-4    │
│                                                          ┌───────────────┐  │
│                                                          │[Photo : détail│  │
│                                                          │ chantier haute│  │
│                                                          │ finition,     │  │
│                                                          │ dallage ou    │  │
│                                                          │ margelle prec.│  │
│                                                          │ col 8-12]     │  │
│                                                          └───────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
Event : prescripteur_page_viewed (E-07) au chargement.
Event : prescripteur_cta_clicked (E-08, position: "above_fold") au clic CTA.
```

**ABOVE FOLD — Mobile**
```
H1 : "L'exécutant haut de gamme que vos clients méritent."
Sous-titre (condensé 1 ligne)
[Badges certifications — compacts]
[CTA : Présentons-nous →] (full width, 52px)
[Photo — 100vw après fold]
```

**BELOW FOLD — 3 blocs valeur pour Camille**

Desktop — 3 colonnes (4-4-4) :
```
┌──────────────────┬──────────────────┬──────────────────┐
│ Votre plan,      │ Votre relation   │ Vos délais,      │
│ respecté         │ client, protégée │ tenus            │
│                  │                  │                  │
│ Bureau d'études  │ Protocole de     │ Interlocuteur    │
│ intégré. Lecture │ communication    │ dédié. Points    │
│ et retours avant │ défini en début  │ d'avancement     │
│ exécution.       │ de mission.      │ à la demande.    │
└──────────────────┴──────────────────┴──────────────────┘
```

Mobile — stack vertical.

**BELOW FOLD — Preuves détaillées**

```
H2 : "Ce qui nous qualifie"

[Certification Socotec CSP/ESP-001 — label + description 2 lignes]
[Réseau L'Esprit Piscine — label + description 2 lignes]
[30+ ans d'activité en 78/92 — preuve temporelle]
[Bureau d'études paysager intégré (Les Terres Essentielles) — capacité projet global]
```

**BELOW FOLD — Accès au portfolio**

```
H2 : "Nos réalisations — références vérifiables"
[Photo preview 3 réalisations — grille 3 colonnes desktop, 1 colonne mobile]
[CTA secondaire : Voir toutes les réalisations → (filtre "Projet complet")]
```

**BELOW FOLD — CTA principal Camille**

```
H2 : "Travaillons ensemble"
Texte : "Présentez-nous votre projet. Nous vous répondons avec
         notre portfolio, nos références et notre méthode de collaboration."
[CTA : Présentons-nous →] (position: "milieu_page" ou "footer_page")
Event : prescripteur_cta_clicked (E-08, position: "milieu_page")
```

**BELOW FOLD — Footer**
[Composant footer]

---

### États applicables — WF-07

| État | Comportement |
|------|-------------|
| Default | Contenu complet |
| Visiteur non-prescripteur (Alexandre arrive ici par erreur) | Page lisible — le retour à l'accueil est toujours accessible via le header, pas de page fermée |
| Mobile | Stack vertical, CTA above fold maintenu |

---

## WF-08 — Page Contact + Formulaire (/contact)

### Structure complète

**ABOVE FOLD — Desktop**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├───────────────────────────────────────────┬─────────────────────────────────┤
│ H1 : "Parlez-nous de votre projet"  col 1-5│                                │
│                                            │                                │
│ Texte intro (col 1-5) :                    │                                │
│ "Décrivez-nous ce que vous imaginez.       │                                │
│  Nous revenons vers vous sous [X] jours    │ [FORMULAIRE] col 6-12          │
│  ouvrés pour une première conversation."   │                                │
│                                            │                                │
│ Coordonnées discrètes (col 1-5) :          │                                │
│ 01 30 42 26 00                             │                                │
│ contact@aqua-system.fr                     │                                │
│ 45 Route Nationale, 78840 Freneuse         │                                │
└───────────────────────────────────────────┴─────────────────────────────────┘
```

Le formulaire est visible above fold sur desktop (côté droit) — pas besoin de scroll pour commencer à remplir.

**ABOVE FOLD — Mobile**
```
H1 : "Parlez-nous de votre projet"
Texte intro (2 lignes)
[FORMULAIRE — pleine largeur, directement sous le texte]
```

---

### Formulaire qualifiant — détail UX

Ordre des champs (optimisé pour engagement progressif) :

```
┌────────────────────────────────────────────────────────────────────────┐
│ FORMULAIRE                                                             │
│                                                                        │
│ Prénom et nom *                                                        │
│ ┌──────────────────────────────────────────────────────────────────┐  │
│ │ Alexandre Moreau                                                  │  │
│ └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│ Email *                                                                │
│ ┌──────────────────────────────────────────────────────────────────┐  │
│ │ votre@email.fr                                                    │  │
│ └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│ Téléphone  (optionnel)                                                 │
│ ┌──────────────────────────────────────────────────────────────────┐  │
│ │ 06 12 34 56 78                                                    │  │
│ └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│ Votre projet *                                                         │
│ ┌──────────────────────────────────────────────────────────────┐      │
│ │ □ Piscine sur mesure                                          │      │
│ │ □ Spa, sauna ou hammam                                        │      │
│ │ □ Jardin & paysage                                            │      │
│ │ □ Projet complet eau + jardin                                 │      │
│ │ □ Architecte ou prescripteur                                  │      │
│ └──────────────────────────────────────────────────────────────┘      │
│ (multi-select — au moins 1 obligatoire)                                │
│                                                                        │
│ Commune *                                                              │
│ ┌──────────────────────────────────────────────────────────────────┐  │
│ │ Le Vésinet                                                        │  │
│ └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│ Budget indicatif  (optionnel)                                          │
│ ┌──────────────────────────────────────────────────────────────────┐  │
│ │ ▾ Sélectionner...                                                │  │
│ └──────────────────────────────────────────────────────────────────┘  │
│   Options : Moins de 50 000 € / 50 000 – 100 000 € /                  │
│             100 000 – 200 000 € / Plus de 200 000 € /                  │
│             Je préfère en discuter de vive voix                        │
│                                                                        │
│ Décrivez votre projet *                                                │
│ ┌──────────────────────────────────────────────────────────────────┐  │
│ │ J'ai un terrain de 2 000 m² et...                               │  │
│ │                                                                   │  │
│ │                                                                   │  │
│ └──────────────────────────────────────────────────────────────────┘  │
│   Minimum 20 caractères                                                │
│                                                                        │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄   │
│ [Champ honeypot masqué — anti-spam, invisible pour l'utilisateur]      │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄   │
│                                                                        │
│ [Parlez-nous de votre projet]  ← bouton primaire, width 100%, 52px    │
│                                                                        │
│ ───────────────────────────────────────────────────────────────────    │
│ Les informations recueillies dans ce formulaire sont utilisées         │
│ exclusivement pour traiter votre demande et établir un éventuel        │
│ devis. Elles sont conservées 3 ans et ne sont partagées avec aucun     │
│ tiers commercial. Conformément au RGPD, vous disposez d'un droit       │
│ d'accès, de rectification et d'opposition : contact@aqua-system.fr.   │
│ [Politique de confidentialité complète →]                              │
└────────────────────────────────────────────────────────────────────────┘
```

**Source mention RGPD** : rgpd-checklist.md section D — version courte avec lien politique complète.

---

### Règles de validation inline (au blur, pas à la soumission)

| Champ | Validation | Message d'erreur exact |
|-------|-----------|----------------------|
| Prénom et nom | Non vide | "Merci de renseigner votre nom." |
| Email | Format email valide (RFC basique) | "Format d'email invalide — vérifiez votre adresse." |
| Téléphone | 10 chiffres (format FR, espaces acceptés) | "Format de téléphone invalide (ex : 06 12 34 56 78)." |
| Type de projet | ≥ 1 case cochée | "Merci de sélectionner au moins un type de projet." |
| Commune | Non vide | "Merci d'indiquer votre commune." |
| Description | ≥ 20 caractères | "Décrivez votre projet en quelques mots (20 caractères minimum)." |

Placement des erreurs : directement sous le champ concerné, couleur d'erreur (rouge accessible, contraste ≥ 4,5:1), icône d'alerte, texte en 14px minimum.

Smart defaults :
- Si l'utilisateur vient de /prescripteurs → "Architecte ou prescripteur" pré-coché.
- Si l'utilisateur vient de /piscines-bien-etre → "Piscine sur mesure" pré-coché.
- Si l'utilisateur vient de /jardins-paysage → "Jardin & paysage" pré-coché.

---

### États du formulaire

**État default**
Formulaire vide, labels visibles, placeholder en texte léger.

**État "en cours de remplissage"**
Champ actif : border focus visible (outline WCAG 2.2, couleur brand, largeur ≥ 2px).
Pas de compteur de caractères visible (arbitrage P2-1 : contraignant et administratif pour le persona Alexandre — message d'erreur uniquement si < 20 chars à la soumission).
Event : form_start (E-02) au focus du premier champ.

**État "soumission en cours" (loading)**
```
[Envoi en cours...]  ← bouton désactivé, spinner visible, texte changé
```
Le bouton est disabled pendant l'envoi (prévention du double-clic, US-03 edge case).
L'état du formulaire est préservé (pas de reset avant confirmation).

**État "succès"**

Après soumission réussie, redirect vers la page distincte `/contact/merci` (route statique Next.js). Ce bloc ci-dessous = contenu de cette page — PAS un remplacement inline de `/contact` (arbitrage P0-4 : tracking E-01 fiable, anti-double soumission au refresh).

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   Votre message est bien parvenu.                                      │
│                                                                        │
│   Nicolas Berg reviendra vers vous [À CONFIRMER : délai de réponse    │
│   réel de Nicolas] pour un premier échange autour de votre projet.    │
│                                                                        │
│   Si votre demande est urgente, appelez-nous directement :            │
│   01 30 42 26 00                                                       │
│                                                                        │
│   [← Retour à l'accueil]                                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```
Event : form_submission_success (E-01) déclenché AVANT le redirect (ou via useEffect au chargement de `/contact/merci` — décision @fullstack, à documenter).

**État "erreur réseau"** (Pages Function échoue)
```
┌────────────────────────────────────────────────────────────────────────┐
│   Une erreur est survenue lors de l'envoi.                             │
│                                                                        │
│   Vos informations sont préservées — vous pouvez réessayer.           │
│   Ou contactez-nous directement :                                      │
│   01 30 42 26 00 · contact@aqua-system.fr                             │
│                                                                        │
│   [Réessayer]  [← Retour à l'accueil]                                 │
└────────────────────────────────────────────────────────────────────────┘
```
Le formulaire n'est PAS vidé — l'utilisateur peut réessayer sans ressaisir.

---

## WF-09 — Page 404

Structure minimale, sobre, cohérente avec le ton brand.

**Desktop et Mobile**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [HEADER STICKY]                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   (centré verticalement)                                                    │
│                                                                             │
│   "Cette page n'existe pas."                                                │
│                                                                             │
│   "Ce que vous cherchez est peut-être par ici :"                           │
│                                                                             │
│   [← Retour à l'accueil]                                                   │
│   [Voir les réalisations →]                                                 │
│   [Parlez-nous de votre projet →]                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
[FOOTER]
```

Ton : sobre, humain, sans humour forcé (brand-platform.md section 4). Pas de code "404" en grand — pas de registre technique pour le grand public.

---

## WF-10 — Pages légales (/mentions-legales, /politique-confidentialite)

Structure identique pour les deux pages. Contenu produit par @legal (mentions-legales-draft.md, privacy-policy.md).

```
[HEADER STICKY]

H1 : "Mentions légales" (ou "Politique de confidentialité")

[Contenu textuel structuré — H2 par section, liste si besoin]
[Liens croisés entre les deux pages]
[Lien retour accueil en bas de page]

[FOOTER]
```

Pas de mise en page complexe — lisibilité maximale, texte seul.

---

## Tableau de synthèse — Couverture des events par écran

| Page / Écran | Events couverts | Notes |
|---|---|---|
| Accueil | E-04 (hero + section + footer), E-10 auto | — |
| Piscines & Bien-être | E-04 (section + footer), E-09 cross-sell, E-10 auto | — |
| Jardins & Paysage | E-04 (section + footer), E-09 cross-sell, E-10 auto | — |
| Notre approche | E-04 (footer), E-10 auto | — |
| Réalisations (liste) | E-05 (filtres), E-06 (clic réalisation), E-04 (footer) | — |
| Réalisation (fiche) | E-06, E-04, E-09 si cross-sell | — |
| La maison | E-04 (footer), E-10 auto | — |
| Prescripteurs | E-07 (page load), E-08 (CTA × 2), E-05, E-06 | E-07 = P1 |
| Contact | E-02 (start), E-01 (success), E-03 (abandon) | E-01 = NSM P0 |
| 404 | E-04 si clic CTA, E-10 auto | — |

---

## Handoff @design

**Écrans à styler (par priorité) :**

1. WF-01 Accueil — hero + section univers (décision visuelle la plus impactante)
2. WF-05 Portfolio + WF-05b Fiche réalisation — les photos sont la matière première, le layout doit les mettre en valeur
3. WF-08 Contact/Formulaire — états error/success doivent être soignés (c'est le seul point de conversion)
4. WF-07 Prescripteurs — ton pro distinct du reste du site
5. WF-02/WF-03 Univers — cohérents avec le système défini sur WF-01
6. WF-04 Approche — timeline des 5 étapes (composant iconique à concevoir)
7. WF-06 À propos — dépend de la disponibilité photos Nicolas Berg
8. WF-09 404 — rapide, sobre

**Ambiance attendue (brief @design) :**
- Registre : expert discret, haut de gamme sobre — ni bling-bling, ni minimalisme vide. Closer d'un magazine architecture que d'un site de concession.
- Photos = premier niveau de hiérarchie visuelle. Tout le système de design sert à mettre les photos en valeur, pas à rivaliser avec elles.
- Palette : à définir par @design depuis le brief creative (brand-platform.md) — suggestion : fonds neutres chauds, une couleur d'accent unique pour les CTA.
- Typographie : sérieux, lisible, légèrement classique — ni condensé sportif, ni script décoratif.
- CTA "Parlez-nous de votre projet" : couleur d'accent, toujours identique, jamais modifié visuellement selon la page.

**Points d'attention UX → @design :**
- Les filtres du portfolio doivent avoir un état actif clairement différencié (pas seulement une variation de couleur légère).
- Le focus outline (clavier) doit être visible sur fond clair ET fond sombre — vérifier sur le hero et les overlay.
- Les badges certifications (Socotec, L'Esprit Piscine) : intégrés sobrement, jamais en trop grand sur le hero — ils valident, ils ne vendent pas.
- Les composants cross-selling : visuellement distinct du contenu principal mais pas intrusif — frontière nette entre "contenu" et "suggestion".

---

## Handoff @data-analyst — Points de décision non couverts par le tracking existant

Les 9 events actuels (E-01 à E-09) couvrent l'essentiel des flows. Les points suivants ne sont pas couverts et méritent évaluation :

1. **Temps passé sur la page portfolio avant clic CTA** : signal de conviction fort. Mesurable via IntersectionObserver (complexité P1-P2) ou heuristiquement via la durée de session analytics.
2. **Chemin de conviction complet** (accueil → univers → portfolio → contact vs accueil → contact direct) : l'event `cta_clicked.page_source` donne la dernière page, pas le chemin complet. Solution possible : Umami permet de consulter les séquences de pageviews — documenter la requête dans dashboard-specs.md.
3. **Cross-selling → formulaire type_projet = projet_complet** : la connexion entre un clic cross-selling et une soumission avec "projet complet" est inférable mais pas directement mesurée. Proxy : corréler E-09 sessions avec E-01.type_projet = "projet_complet" dans la même session (si Umami le permet).
4. **Sessions prescripteur non-converties** : un prescripteur qui consulte la page et repart sans contacter n'est pas mesurable différemment d'un visiteur ordinaire. Seul `prescripteur_page_viewed` (E-07) le distingue — le taux de rebond de cette page est le seul signal disponible.

---

*Fichier produit par @ux — 2026-06-11*
