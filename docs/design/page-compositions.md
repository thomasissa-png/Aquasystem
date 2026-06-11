# Compositions de page — Source de vérité @fullstack
## Aquasystem [PROVISOIRE] × Aqua System × Les Terres Essentielles

> Ce fichier est la référence absolue pour la boucle visuelle Phase 2.
> @fullstack compare chaque screenshot à ces specs. @qa valide les écarts.
> Conventions : [Photo : description] = slot réel obligatoire (JAMAIS deux fois la même description)
> Toutes les valeurs spacing sont exprimées en tokens sémantiques (design-tokens.json)
> Dernière mise à jour : 2026-06-11 | Agent : @design

---

## Sommaire

1. [WF-01 — Accueil (/)](#wf-01)
2. [WF-02 — Piscines & Bien-être (/piscines-bien-etre)](#wf-02)
3. [WF-03 — Jardins & Paysage (/jardins-paysage)](#wf-03)
4. [WF-04 — Notre approche (/notre-approche)](#wf-04)
5. [WF-05 — Portfolio (/realisations)](#wf-05)
6. [WF-05b — Fiche réalisation (/realisations/[slug])](#wf-05b)
7. [WF-06 — La maison (/la-maison)](#wf-06)
8. [WF-07 — Espace prescripteurs (/prescripteurs)](#wf-07)
9. [WF-08 — Contact (/contact)](#wf-08)
10. [WF-09 — Page 404](#wf-09)
11. [Favicon & icônes](#favicon)

---

## WF-01 — Accueil (/) {#wf-01}

### Section 1 — Hero full-bleed

**Composant** : Hero variante `hero-home`
**Layout** : pleine largeur, hauteur 90vh desktop / 60vh mobile
**Photo** :
[Photo : piscine à débordement intégrée dans un parc paysagé d'une propriété des Yvelines — vue depuis la terrasse, plan d'eau calme en premier plan, végétation dense structurée en arrière-plan, lumière dorée de fin d'après-midi, aucune personne visible]

**Overlay** : dégradé linéaire to top, de rgba(26,21,16,0.72) en bas à transparent à 50% de hauteur
**Typographie** :
- H1 : DM Serif Display 72px (display) / 48px mobile, line-height 64px, texte sand-100 (#F5F0E8), max-width 7 mots, position bas-gauche
- Sous-titre : DM Sans 18px, texte sand-100 opacity 0.9, line-height 32px, max-width 45ch, margin-top 16px
- CTA : Button primary lg, margin-top 32px

**Rythme vertical** : padding-bottom 64px (3xl) depuis le bas du viewport
**Responsive 375px** : texte centré, H1 48px, sous-titre tronqué à 2 lignes max, CTA width 100%
**Responsive 768px** : texte bas-gauche col 1-5, H1 52px
**Responsive 1280px** : texte bas-gauche col 1-6, H1 72px
**Animation entrée** : fade-up (translateY 20px → 0, opacity 0 → 1), 400ms ease-out — H1 0ms, sous-titre 100ms, CTA 200ms. Reduced-motion : visible immédiatement.

---

### Section 2 — Deux univers

**Composant** : grille 2 colonnes (col 6+6), dans container max-width 1280px
**Layout** : 2 colonnes égales desktop, stack vertical mobile (piscines en premier)
**Padding vertical section** : 96px top / 96px bottom (4xl)

**Colonne gauche — Piscines & Bien-être**
- Fond de colonne : water-50 (#EAF2F5) → voir si discernable, sinon fond sand-200 avec border-right water-200
- Photo :
[Photo : piscine sur mesure avec margelles en pierre naturelle calcaire, eau claire turquoise-grise, pas de personnes, propriété de l'ouest parisien en été]
- Format photo : ratio carré 1:1, object-cover, radius 8px
- H2 : DM Serif Display 36px, sand-900, line-height 48px, margin-top 24px
- Texte intro : DM Sans 16px, sand-700, line-height 32px, max-width 45ch, 2-3 lignes
- Mention : "Aqua System" en DM Sans 12px medium, water-600, text-transform uppercase, margin-bottom 8px avant le H2
- Lien "Découvrir →" : DM Sans 14px medium, water-600, ArrowRight 14px, padding-top 16px

**Colonne droite — Jardins & Paysage**
- Fond colonne : forest-50 (#EBF2EB)
- Photo :
[Photo : parc paysagé d'une grande propriété dans les Hauts-de-Seine — allée bordée de haies taillées, perspective végétale structurée, lumière de matinée, aucune personne]
- Format photo : ratio carré 1:1, object-cover, radius 8px
- H2 : DM Serif Display 36px, sand-900, line-height 48px
- Texte intro : DM Sans 16px, sand-700, line-height 32px, 2-3 lignes
- Mention : "en partenariat avec Les Terres Essentielles" en DM Sans 12px medium, forest-600, margin-bottom 8px
- Lien "Découvrir →" : DM Sans 14px medium, forest-600, ArrowRight 14px, padding-top 16px

**Responsive 375px** : stack vertical, chaque colonne pleine largeur, photo 200px height, gap 48px entre les deux
**Responsive 768px** : stack vertical, photos 240px height
**Responsive 1280px** : 2 colonnes côte à côte, gap 0 (les colonnes se touchent — frontière eau/végétal)

---

### Section 3 — Preuves

**Composant** : ProofBadges
**Layout** : fond sand-200 (#EDE8DF), padding vertical 48px (2xl), pleine largeur
**Hiérarchie** : 4 badges en ligne avec séparateurs verticaux 1px sand-400
**Responsive** : 2×2 sur mobile, 4 en ligne ≥ 768px

---

### Section 4 — Extrait portfolio (3 réalisations)

**Composant** : SectionHeading + grille 3 × Card réalisation
**Layout** : container max-width 1280px, padding horizontal 32px desktop
**Padding vertical section** : 96px top / 48px bottom

**SectionHeading** :
- Surtitre : "Réalisations" (DM Sans 12px, water-600, uppercase)
- H2 : "Quelques propriétés que nous avons transformées" — DM Serif Display 36px, centré
- Pas de sous-titre ici (les photos parlent)

**3 cartes — photos UNIQUES et distinctes** :
[Photo : piscine à débordement sur une propriété du Vésinet — vue latérale au crépuscule, plan d'eau reflétant le ciel rosé, margelles en travertin, sans personne]
[Photo : parc de grande propriété dans les Hauts-de-Seine (92) — prairie structurée avec massifs de vivaces et arbres adultes, vue depuis la terrasse de la maison]
[Photo : projet intégré piscine et aménagement paysager — terrasse en pierre calcaire avec bassin rectangulaire intégré dans un jardin structuré, commune de 78]

**Lien "Voir toutes les réalisations →"** : centré, Button ghost md, margin-top 32px
**Responsive 375px** : 1 colonne, cards pleine largeur
**Responsive 768px** : 2 colonnes
**Responsive 1280px** : 3 colonnes, gap 24px

---

### Section 5 — CTA final

**Composant** : Composant CTA sectionnel
**Layout** : pleine largeur, fond sand-950 (#1A1510)
**Padding** : 80px vertical (section 20 spacing)
**Texte amorce** : DM Serif Display 36px, sand-100, centré, "Un projet d'extérieur mérite une conversation — pas un formulaire."
**CTA** : Button primary lg centré, margin-top 32px
**Responsive** : Stack vertical, texte 28px sur mobile, button width 100%

---

### Section 6 — Footer

**Composant** : Footer
**Layout** : fond sand-950, voir design-system.md section Footer

---

## WF-02 — Piscines & Bien-être (/piscines-bien-etre) {#wf-02}

### Section 1 — Hero page

**Composant** : Hero variante `hero-page`
**Hauteur** : 60vh desktop / 50vh mobile
**Photo** :
[Photo : piscine sur mesure avec spa intégré — vue depuis le jardin, eau dormante turquoise-grise, carrelage de bord en pierre naturelle, propriété en arrière-plan reconnaissable comme haut de gamme, fin de journée]

**H1** : "Piscines & Bien-être" — DM Serif Display 60px, sand-100, bas-gauche col 1-8
**Sous-titre** : "Notre maison Aqua System — conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine." — DM Sans 20px, sand-100 opacity 0.85, line-height 32px

**Rythme** : padding-bottom 48px (2xl) depuis le bas de la section hero

---

### Section 2 — Bloc 1 : Conception et construction

**Layout** : split 60-40 (texte gauche col 1-7, photo droite col 8-12) desktop / stack mobile (photo dessus, texte dessous)
**Padding section** : 80px top, 64px bottom

**Texte** :
- Surtitre DM Sans 12px water-600 uppercase : "Conception sur mesure"
- H2 DM Serif Display 30px sand-900 : "De la feuille blanche à l'inauguration"
- Corps DM Sans 16px sand-700, line-height 32px, 3 lignes max, pas de jargon technique
- Spacing texte → photo : 48px desktop

**Photo** :
[Photo : bassin de piscine en cours de carrelage — vue de dessus montrant le travail artisanal de pose de mosaïque gris-bleu, mains de technicien visibles, contexte de chantier propre et maîtrisé]

Ratio 3:2, radius 8px
**Responsive 375px** : photo 100vw, 220px height, puis texte dessous padding 24px

---

### Section 3 — Bloc 2 : Spas, saunas, hammams (inversé)

**Layout** : split 40-60 (photo gauche col 1-5, texte droite col 6-12) — inversé / stack mobile (photo dessus)
**Padding section** : 64px top, 64px bottom, fond sand-200 (#EDE8DF) pour alterner visuellement

**Photo** :
[Photo : spa HotSpring encastré dans une terrasse en bois exotique, vapeur légère, entourage en pierre naturelle, jardin visible en arrière-plan flou, soir]

**Texte** :
- Surtitre water-600 : "Spa & bien-être"
- H2 : "L'eau chaude dans votre propriété"
- Corps 3 lignes, mention "Partenaire HotSpring" sobre

---

### Section 4 — Bloc 3 : Entretien annuel

**Layout** : split 60-40 (texte gauche, photo droite) / stack mobile
**Padding** : 64px top/bottom

**Photo** :
[Photo : technicien en tenue Aqua System (logo discret) contrôlant les paramètres d'eau d'une piscine avec tablette numérique, piscine propre en arrière-plan, lumière de matin]

**Texte** :
- Surtitre water-600 : "Suivi annuel"
- H2 : "L'équipe qui connaît votre piscine de l'intérieur"
- Corps 3 lignes — pilier relation long terme

---

### Section 5 — ProofBadges Aqua System

**Composant** : ProofBadges (4 badges)
**Fond** : sand-100 (fond neutre — différence avec la section sombre précédente)
**Padding** : 64px top/bottom

---

### Section 6 — CrossSellSplit

**Composant** : CrossSellSplit variante `water→forest`
**Photo côté gauche** :
[Photo : piscine et jardin paysagé vus ensemble depuis un point de vue élevé — eau et végétal dialoguent dans un espace harmonieux, propriété 78/92]

**Texte côté droit** : fond forest-50, "Votre piscine mérite un jardin à sa mesure — en partenariat avec Les Terres Essentielles."
**CTA** : Button ghost forest, "Voir nos créations paysagères →"

---

### Section 7 — CTA sectionnel

Texte : "Votre projet commence par une conversation."
Fond sand-950

---

### Section 8 — Footer

---

## WF-03 — Jardins & Paysage (/jardins-paysage) {#wf-03}

### Section 1 — Hero page

**Photo** :
[Photo : parc de propriété 78/92 — large pelouse structurée avec arbres adultes en perspective, massifs de fleurs en bord de propriété, lumière de fin de matinée, aucune personne]

**H1** : "Jardins & Paysage" — DM Serif Display 60px
**Sous-titre** : "En partenariat avec Les Terres Essentielles — bureau d'études paysager, création de parcs et jardins d'exception." — DM Sans 20px

---

### Section 2 — Bloc 1 : Bureau d'études paysager

**Photo** :
[Photo : plans de jardin déroulés sur une grande table, réglettes et crayons, mains d'un paysagiste en train de travailler, lumière de bureau naturelle, atmosphère de conception professionnelle]

**H2** : "Un projet pensé avant d'être planté"
**Mention légale** : "en partenariat avec Les Terres Essentielles" dans le corps du texte à la première occurrence

---

### Section 3 — Bloc 2 : Création de parcs et jardins (inversé, fond sand-200)

**Photo** :
[Photo : chantier de création d'un jardin — ouvriers posant des pavés naturels sur une allée dans une grande propriété, arbres fraîchement plantés, sol travaillé, après-midi ensoleillé]

**H2** : "La réalisation, du premier arbre à la dernière pierre"

---

### Section 4 — Bloc 3 : Entretien et pépinière

**Photo** :
[Photo : serre de pépinière Les Terres Essentielles — plants en rangées, végétaux prêts à la vente ou à la plantation, lumière naturelle tamisée, ambiance de production artisanale soignée]

**H2** : "Des végétaux sélectionnés pour durer"

---

### Section 5 — ProofBadges (3 éléments, sans certifications Aqua System)

Adaptation : afficher uniquement les preuves pertinentes jardins — "Bureau d'études intégré", "Pépinière propre", "30+ ans en 78/92"

---

### Section 6 — CrossSellSplit variante `forest→water`

**Photo côté gauche** :
[Photo : jardin de grande propriété avec piscine visible en fond — végétation dense premier plan, bassin turquoise-gris en perspective, harmonie eau/vert parfaite]

**Texte** : "Un jardin d'exception autour d'une piscine sur mesure — notre maison Aqua System les conçoit ensemble."
**CTA** : Button ghost primary (water), "Découvrir nos piscines sur mesure →"

---

### Sections 7-8 — CTA + Footer (identiques WF-02)

---

## WF-04 — Notre approche (/notre-approche) {#wf-04}

### Section 1 — Hero split

**Composant** : Hero variante `hero-split` (60-40)
**Layout desktop** : texte gauche col 1-7, photo droite col 8-12 — pas d'overlay plein écran
**Fond texte** : sand-100 (pas de fond sombre sur la partie texte)

**Texte** :
- H1 DM Serif Display 60px sand-900 : "De la vision à la réalisation"
- Sous-titre DM Sans 20px sand-700 line-height 32px : "Comment nous portons un projet d'extérieur de bout en bout — et pourquoi cela change tout."
- Padding top 96px, padding-bottom jusqu'à la fin du hero

**Photo** :
[Photo : propriété transformée vue d'ensemble — piscine et jardin intégrés dans un même espace cohérent, architecture de la maison visible en arrière-plan, lumière de début de soirée, zone 78]

Ratio 4:5 (portrait), height 100% de la section, object-cover
**Responsive 375px** : texte seul above fold (H1 + sous-titre), photo après (100vw, 260px)
**Responsive 768px** : texte seul above fold, photo après
**Responsive 1280px** : split horizontal, texte gauche, photo droite, min-height 70vh

---

### Section 2 — Timeline des 5 étapes

**Layout** : colonne centrale max-width 720px, centrée dans le container
**Fond** : sand-100
**Padding vertical** : 96px top/bottom

Chaque étape : numéro DM Serif Display 60px water-600 (accent fort pour la lisibilité Nicolas en démonstration), titre H2 DM Serif Display 28px sand-900, texte DM Sans 16px sand-700, padding-bottom 48px entre les étapes. Ligne verticale de connexion 2px sand-300 entre les numéros.

**Responsive 375px** : stack linéaire, numéro 48px, titre 24px, gap 40px entre étapes

---

### Section 3 — Ancrage local

**Layout** : split 50-50 desktop (texte gauche, élément cartographique ou photo droite)
**Fond** : sand-200
**Padding** : 80px vertical

**Photo** :
[Photo : vue aérienne d'une commune de l'ouest parisien (78 ou 92) montrant des propriétés avec jardins et piscines dans un quartier résidentiel arboré — shot drone, lumière de journée]

**Texte** :
- SectionHeading : H2 "Nous connaissons ces propriétés — et leurs contraintes"
- Corps : connaissance nappes phréatiques, PLU, sol argilo-calcaire
- Liste typographiée des communes : Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray, Marnes-la-Coquette, Saint-Cloud — en DM Serif Display italic (caractère stylistique) ou avec tiret cadratin

---

### Section 4 — CTA

Texte amorce DM Serif Display 36px : "Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble."
Fond sand-950, CTA Button primary lg centré

---

### Section 5 — Footer

---

## WF-05 — Portfolio (/realisations) {#wf-05}

### Section 1 — En-tête page

**Layout** : pas de hero photo — section texto sobre
**Fond** : sand-100
**Padding** : 64px top / 32px bottom

**SectionHeading** :
- H1 DM Serif Display 60px sand-900 (pas de surtitre ici — H1 direct)
- Sous-titre DM Sans 20px sand-700 : "30 ans de chantiers dans les propriétés de l'ouest parisien"

**FilterBar** : pleine largeur, margin-top 32px, pills horizontaux, fond pills sand-200, actif water-600

---

### Section 2 — Grille réalisations

**Layout** : grille 3 col desktop, gap 24px / 2 col tablette, gap 16px / 1 col mobile
**Fond** : sand-100
**Padding section** : 48px top / 96px bottom

**8 cards minimum avec photos TOUTES DISTINCTES** :

[Photo : piscine rectangulaire à débordement vue depuis le jardin — eau calme, propriété Le Vésinet en arrière-plan reconnaissable, haies taillées, fin d'après-midi]
Type : Piscine sur mesure | Zone : Yvelines (78)

[Photo : spa encastré en terrasse avec vue sur jardin paysagé — bord en pierre de lave, vapeur légère, végétation environnante, propriété Hauts-de-Seine]
Type : Spa & Sauna | Zone : Hauts-de-Seine (92)

[Photo : projet complet piscine et jardin — bassin miroir avec débordement côté jardin, allée en graviers blancs bordée de buis, propriété Saint-Nom-la-Bretèche]
Type : Projet complet eau+jardin | Zone : Yvelines (78)

[Photo : grand parc paysagé — pelouse anglaise, arbres centenaires, massifs de rosiers, propriété à Ville-d'Avray, lumière d'automne dorée]
Type : Jardin & Parc | Zone : Hauts-de-Seine (92)

[Photo : piscine en L avec plage immergée — dallage en travertin blanc, eau turquoise-grise, propriété Marnes-la-Coquette, lumière matinale]
Type : Piscine sur mesure | Zone : Hauts-de-Seine (92)

[Photo : sauna en bois de cèdre intégré dans une cabane de jardin — vue intérieure avec baie vitrée donnant sur le jardin enneigé, hiver, ambiance chaleureuse]
Type : Spa & Sauna | Zone : Yvelines (78)

[Photo : jardin structuré avec potager encadré de buis — allées en pierre, serre en verre, propriété Saint-Cloud, lumière de printemps]
Type : Jardin & Parc | Zone : Hauts-de-Seine (92)

[Photo : rénovation piscine — avant/après suggéré par une vue de piscine entièrement rénovée avec nouveau carrelage foncé anthracite, eau claire, propriété Rueil-Malmaison]
Type : Piscine sur mesure (rénovation) | Zone : Hauts-de-Seine (92)

---

### États de la grille

**Filtre sans résultat** : message sobre centré "Aucune réalisation dans cette catégorie pour le moment." + lien "← Voir toutes les réalisations", padding 80px vertical
**Chargement skeleton** : rectangles sand-300 animate-pulse, ratio 4:3 préservé pour chaque card, grille stable (pas de CLS)

---

### Section 3 — Footer

---

## WF-05b — Fiche réalisation (/realisations/[slug]) {#wf-05b}

### Section 1 — Breadcrumb + navigation

**Layout** : pleine largeur, fond sand-100, padding 24px top/bottom
**Breadcrumb** : "← Retour aux réalisations" — Button ghost sm, ArrowLeft Lucide 16px, water-600

---

### Section 2 — Contenu principal

**Layout desktop** : split 60-40 (galerie gauche col 1-8, infos droite col 9-12), padding 64px top
**Colonne galerie** :
Photo principale ratio 16:9, priority (LCP)

Exemple pour la fiche "piscine-debordement-vesinet-01" :
[Photo : piscine à débordement Le Vésinet — vue principale, plan d'eau et végétation en composition harmonieuse, lumière fin de journée, qualité éditoriale]

Photo 2 si disponible (ratio 4:3, lazy) :
[Photo : détail margelles piscine Le Vésinet — texture pierre naturelle calcaire, raccord eau précis, travail artisanal visible]

Photo 3 si disponible :
[Photo : vue depuis la piscine Le Vésinet vers la maison — perspective propriété entière, jardin en cadre, soirée lumineuse]

**Colonne infos** :
- Type de projet : DM Sans 12px medium water-600 uppercase
- Zone géographique : DM Sans 16px sand-700
- Prestations réalisées : liste DM Sans 14px sand-900, 3 items max, icône CheckCircle 14px water-600
- Séparateur sand-300 margin 24px
- CrossSellSplit conditionnel (si piscine seule → vers jardins)
- CTA Button primary lg : "Parlez-nous de votre projet →"

**Responsive 375px** : photo principale 100vw, photos 2-3 en dessous 100vw, puis infos en dessous, CTA pleine largeur

---

## WF-06 — La maison (/la-maison) {#wf-06}

### Section 1 — Hero page

**Photo** :
[Photo : portrait de Nicolas Berg debout devant une piscine réalisée par Aqua System — si autorisation photo obtenue et confirmée par fondateur. FALLBACK si non autorisé : [Photo : équipe Aqua System sur un chantier, ouvriers en tenue professionnelle devant une piscine en cours de finition, contexte de travail sérieux]]

H1 : "La maison" — DM Serif Display 60px
Sous-titre : "Plus de 30 ans d'expertise dans les plus belles propriétés de l'ouest parisien — et une conviction : le détail fait tout." — DM Sans 20px

---

### Section 2 — Notre histoire

**Layout** : texte seul, centré, max-width 720px, fond sand-100, padding 80px
**H2** : "Notre histoire" — DM Serif Display 36px, centré
**Corps** : DM Sans 18px sand-700, line-height 32px, paragraphes 3-4 lignes, mentions "plus de 30 ans d'expertise" (jamais "société créée il y a 30 ans"), ancrage 78/92

---

### Section 3 — Les deux maisons

**Layout desktop** : 2 colonnes (6+6), fond sand-200, padding 80px
**Colonne Aqua System** :
- H2 DM Serif Display 28px
- Corps DM Sans 16px, certifications
- Badges Socotec + L'Esprit Piscine (SVG intégrés discrètement)

**Colonne Les Terres Essentielles** :
- Surtitre : "en partenariat avec" DM Sans 12px forest-600
- H2 DM Serif Display 28px
- Corps DM Sans 16px
- Adresse : CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi

---

### Section 4 — Valeurs (3 piliers)

**Layout** : 3 colonnes desktop (4-4-4), fond sand-100, padding 80px
**Typographie par pilier** :
- Titre valeur : DM Serif Display 24px sand-900
- Corps 3 lignes ancré sur preuves : DM Sans 16px sand-700, line-height 32px
- Pas d'icônes génériques — les mots suffisent

**Responsive 375px** : stack vertical, gap 40px

---

### Section 5 — Photo équipe / propriété représentative

[Photo : propriété rénovée de grande ampleur — vue sur la terrasse avec piscine et jardin en arrière-plan, ambiance de fin de chantier réussi, sans personnes, lumière d'été]

Pleine largeur, hauteur 480px desktop, object-cover, pas d'overlay
**Responsive 375px** : 280px height

---

### Section 6 — CTA + Footer

---

## WF-07 — Espace prescripteurs (/prescripteurs) {#wf-07}

### Section 1 — Hero prescripteur

**Composant** : Hero variante `hero-prescripteur`
**Layout** : texte gauche col 1-7 (fond sand-100 transparent), photo droite col 8-12 — split sans overlay plein écran. Min-height 70vh.

**H1** : DM Serif Display 48px sand-900 : "L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription."
**Sous-titre** : DM Sans 18px sand-700 : "Pour les architectes, paysagistes et décorateurs d'intérieur — un partenaire qui travaille sur votre plan."
**CTA above fold** : Button primary md, "Présentons-nous →", margin-top 32px
**Badges certifications** : ProofBadges réduit (Socotec + L'Esprit Piscine uniquement, format compact), visible above fold col 1-5

**Photo** :
[Photo : détail de finition de chantier haut de gamme — margelle en pierre reconstituée posée avec précision, joint parfait, niveau à bulle en appui, focus sur le travail artisanal, aucune personne identifiable]

Ratio 4:5, object-cover, radius 8px côté gauche seulement (bord droit = bord de la colonne)
**Responsive mobile** : texte + badges + CTA above fold, photo après

---

### Section 2 — 3 blocs valeur Camille

**Layout** : 3 colonnes (4-4-4), fond sand-100, padding 80px
**Typographie** :
- Titre bloc : DM Serif Display 24px sand-900
- Corps : DM Sans 16px sand-700, 3-4 lignes, vocabulaire pair-à-pair

---

### Section 3 — Preuves détaillées

**Layout** : liste verticale, centré, max-width 640px, fond sand-200, padding 80px
**H2** : "Ce qui nous qualifie"
**Chaque preuve** : titre DM Sans 16px medium water-600 + description 2 lignes DM Sans 14px sand-700
**Séparateur** : sand-300 1px, margin 20px

---

### Section 4 — Accès portfolio

**Layout** : grille 3 col desktop, 1 col mobile
**Photos** — UNIQUEMENT des réalisations avec finitions haute qualité (preuves visuelles pour prescripteurs) :

[Photo : détail piscine haut de gamme — carrelage mosaïque gris anthracite posé à la main, eau claire, margelle bord affleurant, qualité irréprochable visible]
Type : Piscine sur mesure | Zone : 78

[Photo : jardin de maître — jardin à la française revisité, taille de haies parfaite, perspective vers la propriété, soin visible]
Type : Jardin & Parc | Zone : 92

[Photo : projet intégré eau+jardin — terrasse en pierre naturelle, bassin à débordement, jardin structuré, vue d'ensemble d'une réalisation complète]
Type : Projet complet | Zone : 78

CTA secondaire : "Voir toutes les réalisations →", filtre "Projet complet" présélectionné

---

### Section 5 — CTA principal Camille

**Fond** : sand-950, padding 96px
**H2** : "Travaillons ensemble" — DM Serif Display 36px sand-100, centré
**Texte** : DM Sans 18px sand-300, centré, max-width 50ch
**CTA** : Button primary lg centré, "Présentons-nous →"

---

### Section 6 — Footer

---

## WF-08 — Contact (/contact) {#wf-08}

### Section 1 — En-tête et formulaire

**Layout desktop** : split asymétrique (col 1-5 texte, col 6-12 formulaire), min-height 80vh, fond sand-100
**Padding desktop** : 96px top, 64px bottom

**Colonne gauche** :
- H1 DM Serif Display 52px sand-900 : "Parlez-nous de votre projet"
- Texte intro DM Sans 18px sand-700 line-height 32px, 3 lignes
- Coordonnées : DM Sans 14px sand-700, icônes Lucide 16px, gap 12px entre items
- Margin-top auto pour pousser les coordonnées en bas de la colonne

**Colonne droite — Formulaire** :
- Fond sand-200 radius 12px
- Padding 32px intérieur
- Tous les champs du formulaire dans l'ordre WF-08 wireframes.md
- Button submit : Button primary lg width 100%
- NoticeRGPD en-dessous

**Responsive 375px** :
- H1 40px, texte intro visible (2 lignes)
- Formulaire pleine largeur directement sous le texte
- Pas de split : colonne unique
- Coordonnées masquées sur mobile (accessibles via le footer)

**Responsive 768px** :
- Toujours une colonne (le formulaire est long, le split tablette apporterait trop de contrainte)

---

### Section 2 — Footer

---

## WF-09 — Page 404 {#wf-09}

### Structure complète

**Layout** : fond sand-100, min-height calc(100dvh - 64px), centré verticalement et horizontalement
**Header sticky** : présent (lien retour accueil accessible)

**Typographie** :
- "Cette page n'existe pas." : DM Serif Display 36px sand-900, centré
- "Ce que vous cherchez est peut-être par ici :" : DM Sans 18px sand-700, centré, margin-top 16px

**3 liens** (stack vertical, gap 12px, margin-top 32px) :
- "← Retour à l'accueil" : Button ghost md
- "Voir les réalisations →" : Button ghost md
- "Parlez-nous de votre projet →" : Button primary md

**Responsive 375px** : identique, buttons width 100%

**Pas de photo** : la sobriété de cette page est sa force — aucun élément visuel superflu
**Pas de code "404" en gros** : incompatible avec le registre brand

---

## Favicon & icônes {#favicon}

### Specs favicon

**SVG source** (base pour tous les formats) :
- Canvas 1:1 (carré)
- Marges internes 10% du canvas
- Élément graphique : wordmark [Aquasystem] initial (lettre "A" stylisée) en DM Serif Display, couleur sand-950 (#1A1510) sur fond transparent
- Lisible à 16×16px (tester — simplifier si illisible : une initiale seule suffit)
- Dark mode via CSS media query dans le SVG :
```xml
<style>
  @media (prefers-color-scheme: dark) {
    .icon-shape { fill: #F5F0E8; }
  }
</style>
```

**Note substituabilité** : le favicon utilise l'initiale du nom de travail [Aquasystem]. Quand le naming final sera validé (Orvère / Thalweg / Rive & Clos ou autre), le favicon.svg est le SEUL asset à recréer. Tous les autres assets peuvent être régénérés depuis le SVG source.

### Fichiers à générer dans `/public/`

| Fichier | Dimensions | Format | Notes |
|---|---|---|---|
| `favicon.ico` | 16×16 + 32×32 (multi-size) | ICO | Générer depuis favicon-32.png |
| `favicon-16x16.png` | 16×16 | PNG | |
| `favicon-32x32.png` | 32×32 | PNG | |
| `favicon.svg` | vectoriel | SVG | Avec dark mode CSS |
| `apple-touch-icon.png` | 180×180 | PNG | Padding 20px intérieur + fond sand-100 (#F5F0E8), PAS de coins arrondis dans le fichier |
| `android-chrome-192x192.png` | 192×192 | PNG | |
| `android-chrome-512x512.png` | 512×512 | PNG | |

**NE PAS générer** (obsolètes 2026) : safari-pinned-tab.svg, mstile-*.png, browserconfig.xml

### OG image — `og-image.jpg`

**Dimensions** : 1200×630px
**Format** : JPEG, < 200ko
**Composition** :
- Fond : sand-950 (#1A1510) plein
- Centre : wordmark [Aquasystem] en DM Serif Display 72px, sand-100
- Sous le wordmark : tagline "L'extérieur à la hauteur de votre propriété." en DM Sans 24px, sand-400
- Bas gauche : "Aqua System | Les Terres Essentielles" en DM Sans 14px, sand-600
- Focal centré — pas de photo (la photo change par page si og:image dynamique, mais le default est sobre)

**Note OG dynamique** : pour les pages portfolio (WF-05b), l'OG peut être générée dynamiquement avec la photo de la réalisation comme fond (Next.js og() API). Composant og à documenter lors de l'implémentation.

### site.webmanifest

```json
{
  "name": "Aquasystem",
  "short_name": "Aquasystem",
  "description": "L'extérieur à la hauteur de votre propriété.",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#F5F0E8",
  "background_color": "#F5F0E8",
  "display": "standalone"
}
```

**theme_color** : sand-100 (#F5F0E8) en mode clair — correspond à `semantic.color.background.primary` dans design-tokens.json.

### Balises `<head>` à implémenter par @fullstack

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#F5F0E8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1A1510" media="(prefers-color-scheme: dark)">
```

---

## Règles d'anti-placeholder galerie (rappel obligatoire)

1. Chaque slot [Photo : ...] ci-dessus a une description UNIQUE — aucun doublon dans ce document.
2. Si une photo réelle n'est pas disponible pour un slot : la section EST commentée (`{/* Section à activer dès réception des photos Nicolas Berg */}`), jamais remplacée par une image générique ou identique relabellée.
3. Source prioritaire : book Calameo (authid: U7NQqdhG904V). Source secondaire : aqua-system.fr existant + esprit-piscine.fr/aqua-system. Vérifier les droits à l'image avant tout usage.
4. Aucune piscine avec éclairage LED de couleur, aucune piscine avec personnes identifiables sans droits confirmés.

---

*Document produit par @design — 2026-06-11*
*Ce fichier est la référence de la boucle visuelle Phase 2 — @fullstack compare chaque screenshot à ces specs.*
*Handoff → @fullstack : implémentation Tailwind depuis design-tokens.json, composants depuis design-system.md, layouts depuis ce fichier.*
