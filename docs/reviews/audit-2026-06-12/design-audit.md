# Audit visuel design — Site Aquasystem en ligne
## aquasystem.pages.dev — DA "Rive privée" — design-tokens v1.2.0

> Agent : @design
> Date : 2026-06-12
> Référentiels : art-direction.md, design-system.md v1.2, page-compositions.md
> Matériel : 40 screenshots baselines (3 viewports × pages), src/components, src/app
> Standard de référence : Villa & Jardin / Empreintes Architectes (déclaré dans art-direction.md)

---

## Note globale : **7,5 / 10**

Le site est propre, cohérent, et livrable en l'état. Il dépasse nettement le site actuel aqua-system.fr et tient le rang d'un site vitrine professionnel premium. Il n'atteint pas encore le niveau Villa & Jardin / Empreintes — l'écart est identifié, mesurable, et corrigible sans refonte.

---

## Critère 1 — PRO : 8 / 10

**Verdict PASS avec réserves.**

Le site est incontestablement professionnel : typographie propre (DM Serif Display / DM Sans), palette sobre et cohérente, photos de réalisations réelles à plein cadre, footer structuré avec informations légales complètes. La NavBar est sobre et bien calibrée. Le formulaire de contact est soigné jusque dans ses états d'erreur (contact-error-state-desktop.png : messages en rouge brique WCAG AA, champs bordés, hiérarchie claire).

**Preuve du -2 :** La page `/realisations` (realisations-desktop.png) affiche 14 cartes toutes intitulées "Fiche en cours de documentation" avec un pictogramme clipboard. La grille elle-même est excellente (4 colonnes, photos réelles de qualité, ratios 4:3 homogènes), mais ces 14 labels en état draft créent une friction de professionnalisme mesurable — un visiteur qui ouvre 3 fiches consécutives voit le même message. C'est le seul point qui trahit le stade de production.

**Correction P1 :**
- Afficher les métadonnées disponibles (lieu, type, année si connue) à la place du texte générique "Fiche en cours de documentation"
- Ou : retirer le texte en corps de fiche et conserver uniquement le titre + localisation (déjà affichés en card) — la fiche devient une galerie d'images sans corps de texte plutôt qu'un draft visible

---

## Critère 2 — BEAU : 7 / 10

**Verdict PASS avec friction identifiée.**

**Ce qui est beau :** Le hero de l'accueil (accueil-desktop.png) est réussi — la photo de piscine en lisière de forêt avec overlay sablé, la tagline en DM Serif Display 72px positionnée bas-gauche, le CTA eau bien calibré. La page prescripteurs (prescripteurs-desktop.png) est visuellement élégante : hero portrait en grand format, trois colonnes "Ce qui nous qualifie" avec badges certifications bien hiérarchisés, photo de réalisation 3 colonnes en bas.

La page `/notre-approche` (notre-approche-desktop.png) tient bien : la numérotation 1-5 en DM Serif Display crée un rythme éditorial, la zone FAQ accordéon est sobre.

**Preuve du -3 :**

1. Page `/jardins-paysage` (jardins-paysage-desktop.png) : les blocs de texte sont très denses, sans image opposée sur plusieurs sections. Les rubriques "Bureau d'études / Pépinière / Jardinerie & expertise" s'affichent comme trois encadrés avec titres en fond doré — ces encadrés font visuellement "carte de visite" plutôt qu'éditorial. Le fond doré (gold-100 #EDD9B8) est le seul endroit où il apparaît sur cette page, sans le contrepoids d'une photo, ce qui le fait paraître plaqué. Sur mobile (jardins-paysage-mobile.png), la densité de texte sans rupture visuelle (pas de photo intercalée sur les 4 premières sections) fatigue l'œil.

2. Page `/piscines-bien-etre` (piscines-bien-etre-desktop.png) : la section proof-badges au centre de la page — chiffres 30+, 350+, Socotec, Esprit Piscine — est correcte mais son fond doré pâle (#EDD9B8) crée une zone rectangulaire qui interrompt le rythme sablé de la page sans justification de composition forte. La transition entre la section "équipe" (fond primaire sable) et la section proof (fond doré) et la section suivante (fond sable) manque de respiration.

**Corrections P1 :**
- `/jardins-paysage` : les trois encadrés "Bureau d'études / Pépinière / Jardinerie" → retirer le fond doré, utiliser le fond secondaire `--color-bg-secondary` (#EDE8DF), bordure gauche `--color-border` 2px. Ou conserver le fond doré mais l'étirer en section pleine largeur avec une photo à gauche (MediaSplit) pour donner un contrepoids visuel.
- `/piscines-bien-etre` : ajouter `py-16` (64px, `--spacing-3xl`) de marge verticale supplémentaire entre la section proof et ses voisines pour respirer sans restructurer.

---

## Critère 3 — BRAND-ALIGNED ("Rive privée" respirée ?) : 8 / 10

**Verdict PASS.**

La DA "Rive privée" est fidèlement traduite : sable chaud #F5F0E8 en fond dominant, eau #3A6675 pour tous les CTA primaires, vert sous-bois #3B5240 uniquement sur `/jardins-paysage` et le cross-selling bloc, DM Serif Display sur tous les titres sans exception. L'or discret #C4924A (maintenant remappé vers #8B6130 pour les textes) apparaît uniquement en contexte proof, jamais en décoration gratuite.

Le duopôle eau / végétal est traduit graphiquement de manière lisible : sur l'accueil (accueil-desktop.png), les deux colonnes "Piscines & Bien-être" / "Jardins & Paysage" ont bien leurs teintes de fond distinctes (eau pâle / végétal pâle) et leurs accents respectifs sur les liens "Découvrir →".

**Preuve du -2 :**

La photo hero de `/jardins-paysage` (jardins-paysage-desktop.png) montre ce qui ressemble à une verrière/serre de jardinerie — ce n'est pas une "propriété privée en lisière de forêt". L'art-direction §6 spécifie : "parc paysagé d'une grande propriété, allée bordée de haies taillées, perspective végétale structurée". La serre de jardinerie est factuelle et honnête, mais elle ancre visuellement la page dans le registre "jardinerie de vente" plutôt que "paysagiste haut de gamme". C'est le compromis "faisons avec ce qu'on a" documenté par le fondateur, mais il crée une tension brand-alignment mesurable.

**Correction [BLOQUÉ FONDATEUR] :**
- Obtenir une photo de réalisation paysagère ou à défaut une photo de propriété de la zone 78/92 en contexte végétal structuré (parc, allée, pergola) pour remplacer ou compléter la photo hero de `/jardins-paysage`. La serre peut rester en illustration de la section "Jardinerie & expertise" mais ne devrait pas occuper le hero.

---

## Critère 4 — MÊME IDENTITÉ (cohérence inter-pages) : 9 / 10

**Verdict PASS.**

La cohérence transversale est le point fort du site. En passant mentalement d'une page à l'autre via les screenshots :
- NavBar identique sur toutes les pages (logo "Aquasystem" DM Serif Display, 6 liens, CTA eau)
- Footer identique : 3 colonnes (marque / navigation / nous trouver), barre légale avec SIREN
- Système de SectionHeading (titre DM Serif Display + surtitre DM Sans small caps) homogène
- Transition accueil → pages univers → fiches → contact : même rythme, mêmes tokens de spacing

**Preuve du -1 :**

Sur la page `/contact` (contact-desktop.png et contact-mobile.png), la zone gauche (texte + coordonnées) est visuellement déséquilibrée par rapport à la zone droite (formulaire). Sur desktop, le côté gauche affiche le H1, 2 lignes de texte, puis les 3 coordonnées (téléphone, email, adresse) avec un grand vide entre les deux blocs. Ce vide est estimé à ~200px sans aucun contenu — le formulaire à droite est nettement plus dense. Sur les autres pages, les splits 50/50 ou 60/40 sont bien équilibrés. Le contact crée une asymétrie de densité.

**Correction P2 :**
- Ajouter un élément dans la zone gauche du contact pour combler le vide : soit une citation de type "Un projet, c'est d'abord une conversation" en DM Serif Display 24px italic, soit une preuve compacte (ProofBadges miniature 2 chiffres), soit rapprocher les coordonnées du texte (supprimer le gap actuel entre le chapeau et les coordonnées, remplacer par `gap-8` ou `mt-8`).

---

## Critère 5 — PROPRE (finitions) : 8 / 10

**Verdict PASS.**

Les finitions sont globalement soignées : pas de débordement horizontal (vérifié mobile 375px sur toutes les pages), pas d'image non chargée visible, pas de texte tronqué hors-grille. Le formulaire de contact affiche des états d'erreur propres (contact-error-state-desktop.png) avec messages en rouge brique alignés sous chaque champ. La page 404 (404-desktop.png) est sobre et fonctionnelle.

**Preuve du -2 :**

1. La page `/contact/merci` (contact-merci-desktop.png) est extrêmement épurée — H1 + 3 lignes de texte + lien retour + footer. Il n'y a aucune image, aucun visuel de réassurance, aucun élément de marque au-delà du texte. La page fait ~300px de contenu utile puis directement le footer. C'est fonctionnel mais visuellement creux. Comparé au niveau de soin des autres pages, la finition est en-dessous.

2. Sur la fiche réalisation mobile (realisation-fiche-mobile.png), la sidebar métadonnées disparaît (stack mobile correct), mais le CTA "Parlez-nous de votre projet" apparaît en pleine largeur avec le fond eau — le bloc cross-selling en-dessous (piscine → jardin) fonctionne visuellement mais le texte du CTA est court et le bouton parait un peu solitaire dans beaucoup d'espace vertical.

**Corrections P2 :**
- `/contact/merci` : ajouter une photo de réalisation entre le texte et le footer (même composant que le cross-selling — photo pleine largeur avec overlay sablé et une ligne de texte sobre). Ou simplement l'illustration d'ambiance déjà utilisée comme hero accueil, recadrée en 16:9 noscaption.
- Fiche mobile : pas de correction nécessaire sur la structure (stack mobile est correct selon specs WF-05b), signaler uniquement.

---

## Critère 6 — ALIGNÉ (grilles) : 9 / 10

**Verdict PASS.**

L'alignement sur la grille 12 colonnes / 8 tablette / 4 mobile est respecté. Vérification visuelle :
- Accueil desktop : les deux colonnes "deux univers" sont parfaitement équilibrées (50/50)
- Réalisations desktop : grille 4 colonnes régulière, gutters homogènes, aucune carte débordante
- Prescripteurs desktop : les trois colonnes "Ce qui nous qualifie" sont bien alignées
- Contact desktop : layout 50/50 (H1+texte gauche / formulaire droite) bien cadré dans le max-width

**Preuve du -1 :**

Sur la page `/notre-approche` desktop (notre-approche-desktop.png), la section "Nous connaissons ces propriétés — et leurs contraintes" est un bloc de texte long en pleine largeur de colonne, sans la photo latérale spécifiée dans page-compositions.md WF-04 ("photo de propriété typique 78/92, position droite"). Le texte s'étale sur toute la largeur de la colonne sans contrepoids, créant une ligne de texte très longue (~100-120 caractères). Le standard est 65-75 caractères pour un corps de texte lisible.

**Correction P1 :**
- Soit : ajouter la photo spécifiée en MediaSplit comme prévu dans la composition WF-04
- Soit : contraindre la largeur du bloc texte à `max-w-2xl` (672px) centré si la photo n'est pas disponible, pour préserver la lisibilité de la ligne

---

## Critère 7 — AÉRÉ (rythme vertical) : 7 / 10

**Verdict PASS avec frictions.**

La majorité des pages respire bien. L'accueil est le meilleur exemple : hero 90vh, section deux univers avec `py-24` (96px), section proof avec fond doré, section portfolio preview, section CTA finale sombre — le rythme alterne fond/contenu et les respirations sont respectées.

**Preuve du -3 :**

1. `/jardins-paysage` mobile (jardins-paysage-mobile.png) : les 4 premières sections de la page (BUREAU D'ETUDES, CREATION, PIERRE, VEGETAUX) s'enchaînent sans photo de rupture. Chaque section est un bloc titre H2 + 2-3 paragraphes. Le rythme texte-texte-texte sur mobile crée une densité pénalisante. L'art-direction §6 spécifiait une photo pour chaque section prestation — les `[Photo]` slots sont des PhotoPlaceholders (illustrés par un pictogramme discret) mais visuellement la page manque d'air sur ce viewport.

2. `/piscines-bien-etre` mobile (piscines-bien-etre-mobile.png) : la section proof (30+, 350+, Socotec, L'Esprit Piscine) en fond doré est très dense sur 375px — les 4 éléments s'empilent en 2 colonnes sur fond doré, ce qui est correct, mais le bloc qui suit immédiatement (cross-selling vers jardins) crée une succession de blocs colorés sans blanc intermédiaire.

3. Sur `/notre-approche` desktop, la section FAQ accordéon est directement accolée à la section géo (notre-approche-desktop.png) sans séparateur visuel clair — seul le titre H2 "Questions fréquentes" différencie les deux sections, sans padding vertical supérieur à `py-12`.

**Corrections P1 :**
- `/jardins-paysage` : les PhotoPlaceholders des 4 sections prestation devraient être remplacés dès que possible par des photos réelles. En attendant, augmenter leur hauteur de `h-48` à `h-64` (256px) pour créer plus de rupture visuelle même en état placeholder.
- `/notre-approche` : ajouter `pt-16` (64px) sur la section FAQ pour créer une respiration avant le bloc accordéon.

---

## Critère 8 — CONVERSION (CTA visibles sans agressivité) : 8 / 10

**Verdict PASS.**

Le site a une action primaire claire sur chaque page : "Parlez-nous de votre projet" en bouton plein eau (#3A6675) visible dès la NavBar et répété en fin de page. Il n'y a aucun popup, aucune barre flottante, aucun compte à rebours — conforme à la DA et au brief (CTAs conviction-first, zéro agression commerciale). Le CTA se démarque visuellement sans agressivité.

**Preuve du -2 :**

1. Sur la page `/realisations` (realisations-desktop.png), la zone de conversion en pied de page ("Un projet d'extérieur mérite une conversation — pas un formulaire") a un fond sombre (#1A1510) avec le CTA eau visible. Mais les cartes de réalisation elles-mêmes n'ont pas de CTA ou de lien visible sans survol — sur mobile (realisations-mobile.png), les 14 cartes sont cliquables mais rien dans l'état statique ne le signale clairement (pas d'icône ArrowRight, pas de "Voir →"). La grille portfolio est visuellement belle mais muette en termes de signalisation d'action.

2. Sur `/notre-approche` (notre-approche-desktop.png), le CTA de fin de page "Découvrez-vous côte à côte" en fond sombre est bien visible. Mais entre le Hero (pas de CTA sur cette page) et le CTA de fin, il n'y a aucun CTA intermédiaire sur une page de ~4 écrans — la longueur de la page sans CTA intermédiaire fait que le visiteur doit scroller jusqu'au bout pour trouver la prochaine étape.

**Corrections P2 :**
- `/realisations` cards : ajouter un label "Voir la réalisation →" en DM Sans 13px, `color-text-secondary`, visible en état statique en bas de carte (pas uniquement au survol)
- `/notre-approche` : ajouter un CTA secondaire (ButtonLink ghost "Parlez-nous de votre projet →") après la section géo (avant la FAQ), visible à mi-parcours de la page

---

## Critère 9 — HIÉRARCHIE (typo, en plissant les yeux) : 8 / 10

**Verdict PASS.**

En plissant les yeux sur chaque page, les 3 éléments les plus importants sont identifiables :
- Hero accueil : H1 blanc sur overlay sombre > CTA eau > sous-titre
- Réalisations : titre de page DM Serif Display > grille photos > CTA de fin
- Contact : H1 > formulaire > CTA "Parlez-nous de votre projet" (bouton plein eau, 100% de largeur)
- Prescripteurs : H1 hero sur fond sombre > "Ce qui nous qualifie" > CTA "Travaillons ensemble"

**Preuve du -2 :**

1. Sur `/la-maison` (la-maison-desktop.png), la hiérarchie est plus confuse. Il y a deux colonnes "Aqua System" et "Les Terres Essentielles" avec des blocs de texte de même taille, suivis de trois blocs "Exigence / Confiance / Sur mesure". En plissant les yeux, aucun élément ne domine clairement — les 6 blocs de texte ont des densités similaires. La photo de la propriété en bas de page est bien mais intervient trop tard dans la hiérarchie.

2. Sur `/jardins-paysage`, les H2 (DM Serif Display 36px) des 4 sections prestation ont le même poids visuel que le H2 des encadrés "Bureau d'études / Pépinière / Jardinerie". Il y a cinq H2 de taille identique en compétition sur la même page.

**Corrections P1 :**
- `/la-maison` : augmenter la taille du portrait Nicolas Berg (actuellement petit cercle) ou ajouter un overtitre de section plus lisible au-dessus "Notre histoire" pour créer un point d'entrée clair.
- `/jardins-paysage` : différencier les encadrés "Bureau d'études / Pépinière / Jardinerie" — utiliser DM Sans 18px semibold au lieu de DM Serif Display 36px pour ces sous-titres fonctionnels (ils ne sont pas des sections éditoriales mais des services). Cela libère la hiérarchie des H2 éditoriaux.

---

## Critère 10 — ACCESSIBLE (contrastes, focus, targets) : 9 / 10

**Verdict PASS.**

Les corrections BUG-A11Y-1, A11Y-2, A11Y-3, A11Y-4 sont toutes confirmées dans les baselines Phase 5.3 :
- Contrastes : 20 paires WCAG AA/AAA dans design-system.md v1.2 — tous PASS (4.5:1 minimum pour texte normal, 3:1 pour grand texte)
- Skip link "Aller au contenu" ajouté et fonctionnel
- Targets tactiles ≥ 44px (h-11 sur inputs, FormField, Chip)
- axe-core 13 pages VERT, 0 violation color-contrast ou target-size

Visuellement, les états de focus ne sont pas observables sur screenshot statique, mais les tokens sont en place (`focus-visible:ring-2 focus-visible:ring-color-border-focus focus-visible:ring-offset-2`) et le rapport qa-strategy.md confirme les tests axe.

**Preuve du -1 :**

Sur la page `/contact` mobile (contact-mobile.png), les chips "Piscine & bien-être", "Jardin & paysage", "Projet complet", "Je suis prescripteur" s'affichent en 3 rangées avec rupture entre "Jardin & paysage" et "Projet complet" sur la deuxième ligne. "Je suis prescripteur" se retrouve seul sur la troisième ligne — ce n'est pas une violation WCAG mais visuellement crée une asymétrie. Le chip isolé peut paraître moins important ou "séparé" de la logique des trois autres.

**Correction P2 :**
- Soit ordonner les chips pour que "Je suis prescripteur" se retrouve naturellement en ligne 2 (avec "Projet complet") : réorganiser l'ordre → "Piscine & bien-être" / "Projet complet" / "Jardin & paysage" / "Je suis prescripteur"
- Soit si le reflow est imprévisible, forcer `flex-wrap: nowrap` sur le container chips + overflow-x auto (scroll horizontal) à 375px — mais cela dégrade l'accessibilité mobile. Option 1 préférable.

---

## Critère 11 — QUALITÉ PHOTO : 6 / 10

**Verdict FAIL partiel — PhotoPlaceholders impactants.**

C'est le critère le plus impactant sur la note globale et le seul qui fait réellement chuter le niveau en-dessous des références sectorielles.

**Ce qui tient le rang :**

Les photos de réalisations Aqua System (esprit-piscine.fr) sont de bonne qualité : piscines en contexte végétal, plans d'eau en lumière naturelle, propriétés reconnaissables comme premium ouest parisien. La grille réalisations (realisations-desktop.png) avec 14 photos réelles en ratio 4:3 homogène est la section la plus convaincante du site — elle prouve le niveau réel du travail.

Le hero de l'accueil (piscine en lisière de forêt, lumière dorée) correspond exactement à la scène de référence du moodboard §9 de l'art-direction.

Les photos de jardinerie intégrées (serre, cagette lauriers Orgeval) sont honnêtes et bien cadrées.

**Ce qui casse l'effet :**

1. Hero `/jardins-paysage` (jardins-paysage-desktop.png) : la photo de verrière/serre en plein cadre hero 90vh signale une jardinerie de vente au détail, pas un bureau d'études paysager. C'est la seule photo qui crée une dissonance avec le positionnement "haut de gamme paysager" affiché. [BLOQUÉ FONDATEUR]

2. Sur `/piscines-bien-etre` (piscines-bien-etre-desktop.png), la section "équipe" (MediaSplit) montre une photo qui ressemble à des chaises longues en bord de piscine avec parasols. L'art-direction §9 précise explicitement : "Zéro chaises longues colorées (trop vacances club)". Si cette lecture est correcte (résolution screenshot limitée), c'est une violation directe de la DA.

3. Fiches réalisations (realisation-fiche-desktop.png) : la photo principale est belle et bien cadrée (piscine en lisière de forêt, Yvelines). Mais la légende "Réalisation Aqua System, Yvelines (78) — photo publiée avec l'autorisation du propriétaire" est parfaite en termes de droits. En termes de disposition, elle occupe une ligne complète sous la photo en texte très petit, ce qui est correct mais peu lu.

4. Les 14 PhotoPlaceholders sur les fiches de réalisations (icône clipboard + "Fiche en cours de documentation") créent une zone grise visuellement inerte dans la grille. Ce n'est pas un problème de la grille elle-même — les photos des cards sont réelles — mais en cliquant sur une fiche, le visiteur n'obtient pas le 60-40 (galerie + métadonnées) promis mais un formulaire "fiche en cours". Le delta entre la promesse de la grille et le contenu de la fiche est notable.

**Corrections :**

- [BLOQUÉ FONDATEUR P0] : Photo hero `/jardins-paysage` — demander au fondateur une photo de propriété paysagée (même une propriété de référence type 78/92, pas forcément une réalisation LTE). Alternative : recadrer la photo de la serre pour n'en montrer que la structure végétale/architecturale (pas le contexte boutique).

- [P0 — à vérifier] : Vérifier si la photo "équipe" sur `/piscines-bien-etre` montre des chaises longues colorées. Si oui, la remplacer par une photo de piscine en contexte ou une photo d'équipe en chantier.

- [P1 FONDATEUR] : Documenter au minimum 3-4 fiches de réalisation avec données réelles (type piscine, zone, année) pour les sortir du mode draft. Même un titre + zone + type sans photo supplémentaire suffit à sortir du mode "en cours".

---

## Récapitulatif des scores

| # | Critère | Score | Priorité correctif |
|---|---------|-------|--------------------|
| 1 | PRO | 8/10 | P1 — fiches en mode draft |
| 2 | BEAU | 7/10 | P1 — densité jardins + proof section |
| 3 | BRAND-ALIGNED | 8/10 | [BLOQUÉ FONDATEUR] — hero jardins |
| 4 | MÊME IDENTITÉ | 9/10 | P2 — vide contact zone gauche |
| 5 | PROPRE | 8/10 | P2 — page merci creuse |
| 6 | ALIGNÉ | 9/10 | P1 — photo manquante notre-approche |
| 7 | AÉRÉ | 7/10 | P1 — rythme jardins mobile + FAQ |
| 8 | CONVERSION | 8/10 | P2 — signalisation cards réalisations |
| 9 | HIÉRARCHIE | 8/10 | P1 — la-maison + jardins H2 |
| 10 | ACCESSIBLE | 9/10 | P2 — ordre chips mobile |
| 11 | QUALITÉ PHOTO | 6/10 | P0 FONDATEUR + P1 fiches |
| **—** | **GLOBAL** | **7,5/10** | |

---

## Plan de corrections priorisé

### P0 — Bloquant (dépend de la décision/asset fondateur)

| ID | Page | Problème | Correction |
|----|------|----------|------------|
| P0-PHOTO-1 | `/jardins-paysage` hero | Serre de jardinerie ≠ paysagiste premium | Nouvelle photo propriété végétalisée 78/92 — demander au fondateur |
| P0-PHOTO-2 | `/piscines-bien-etre` MediaSplit équipe | Possible chaises longues colorées (violation DA §9) | Vérifier + remplacer si confirmé par photo piscine en contexte ou photo chantier |

### P1 — Impactant, corrigible sans asset nouveau

| ID | Page | Problème | Correction tokens |
|----|------|----------|-------------------|
| P1-JARDINS-1 | `/jardins-paysage` | Encadrés services fond doré sans contrepoids | `bg-color-bg-secondary` + `border-l-2 border-color-border` au lieu de fond doré. Ou section pleine largeur avec photo MediaSplit |
| P1-JARDINS-2 | `/jardins-paysage` mobile | PlaceholderPhotos trop petits, page trop dense | Hauteur placeholder `h-64` au lieu de `h-48` — tokens `--spacing-3xl` |
| P1-APPROCHE-1 | `/notre-approche` | Bloc texte "contraintes" sans photo, lignes trop longues | `max-w-2xl mx-auto` sur le bloc texte si photo indisponible |
| P1-APPROCHE-2 | `/notre-approche` | Pas de CTA à mi-parcours (4 écrans sans CTA) | Ajouter `<ButtonLink variant="ghost">` après section géo |
| P1-FAQ-1 | `/notre-approche` | Transition section géo → FAQ sans respiration | `pt-16` (`--spacing-3xl`) sur section FAQ |
| P1-HIERAR-1 | `/jardins-paysage` | 5 H2 DM Serif Display identiques en compétition | Encadrés services → `DM Sans 18px font-semibold` au lieu de H2 DM Serif Display |
| P1-HIERAR-2 | `/la-maison` | 6 blocs de densité identique, pas d'entrée claire | Augmenter portrait Nicolas Berg, ou overtitre "Notre histoire" plus présent |
| P1-FICHES-1 | `/realisations/[slug]` | 14 fiches en mode "en cours", impact pro | Afficher uniquement titre + zone + type (données existantes) sans corps de texte draft |

### P2 — Finition, corrigible sans arbitrage

| ID | Page | Problème | Correction tokens |
|----|------|----------|-------------------|
| P2-CONTACT-1 | `/contact` | Zone gauche desktop : vide entre chapeau et coordonnées | Retirer gap ou ajouter citation/preuve, `gap-8` au lieu du gap actuel |
| P2-MERCI-1 | `/contact/merci` | Page creuse, pas d'image, ~300px de contenu | Ajouter photo ambiance pleine largeur (hero recadré) au-dessus du footer |
| P2-REALISA-1 | `/realisations` | Cards silencieuses (pas de "Voir →" statique) | Ajouter `<span>Voir la réalisation →</span>` en bas de card, `text-color-text-secondary text-sm` |
| P2-CHIPS-1 | `/contact` mobile | "Je suis prescripteur" seul sur ligne 3 | Réordonner : "Piscine" / "Projet complet" / "Jardin" / "Je suis prescripteur" |

---

## Note de position

Le site Aquasystem atteint le niveau d'un site vitrine professionnel premium livrable en production. Il surpasse nettement les codes visuels du secteur pisciniste (bleu saturé, grille catalogue, photos de mode). Il n'atteint pas encore Villa & Jardin ou Empreintes Architectes principalement pour deux raisons structurelles : (1) l'absence de photos de jardins paysagers premium (la seule contrainte externe — fondateur), et (2) la densité de `/jardins-paysage` qui dilue l'effet éditorial. Tout le reste est corrigible par tokens et spacing sans refonte de composant.

La note 7,5/10 à ce stade de production (avec des assets partiels) est honnête et encourageante : les fondations permettent d'atteindre 8,5/10 en levant uniquement les P0 et P1 ci-dessus.

---

*@design — audit visuel final — 2026-06-12*
*Handoff → @fullstack (corrections P1/P2), @orchestrator (synthèse)*
