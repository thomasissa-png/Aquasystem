# Gate de perception — Aquasystem (13 pages) — Passe 1 → Passe 4 — 2026-06-12

## Verdict global ACTUEL (Passe 4) : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 4 (2026-06-12, recalibrage « juge plus dur ») : 8 changements post-passe-3 jugés en
> viewport réel. Le fondateur avait rejeté le drawer bottom-sheet et les cartouches de preuves
> pleins ; les deux sont refondus (drawer latéral droite focus-container, preuves en filets
> éditoriaux). Photo fondateur parasols sur le bloc LTE digne et équilibrée, 3 heros « cheap »
> résolus, fiche draft désormais page digne (visualDescription rendue + CTA contact), grille 24
> cartes homogène, footer LinkedIn/Facebook propres. **Zéro P0**, un seul P1 cosmétique
> non bloquant (eyebrow LTE petit). Détail : section « PASSE 4 ». Captures : `tests/screenshots/perception/p4-*.png`.

## Verdict Passe 3 : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 1 : **NON** (4 défauts D1-D4). Passe 2 : 4 corrigés, OUI avec 1 P1 favicon dark-mode.
> Passe 3 (2026-06-12, refonte IA) : page /la-maison fusionnée jugée en entier (mobile+desktop),
> placeholders « Visuel à venir » élégants et assumés, nav 5 entrées « Notre maison » non ambiguë,
> prescripteurs renvoyé au footer, favicon v3 (tuile pleine) **résout** le P1 dark-mode de la passe 2.
> Zéro P0, zéro P1 bloquant → **OUI**. Détail : section « PASSE 3 ».

## Verdict Passe 1 (historique) : PRÉSENTABLE AU FONDATEUR — **NON**

Passe 1 terminée : **13 pages jugées** en viewport réel mobile 390×844 + desktop 1440×900, fold + sections.

Un défaut de perception MAJEUR (cas canonique #5) est présent et **massivement répété** : le libellé
« **Fiche en cours de documentation** » apparaît sous **chaque** carte de réalisation — ~3 sur la home,
~17 sur la page Réalisations, + un encart explicite sur chaque fiche détail. La page qui doit prouver
30 ans de savoir-faire affiche « pas documenté » partout. Un client premium pressé lit « site pas fini /
agence qui n'a rien à montrer ». Verdict binaire → NON tant que ce libellé est visible.

Un **second inachevé** plus discret a été attrapé en finissant la passe : une note interne « À faire
valider par un avocat avant publication définitive » est rendue en prod en bas de la Politique de
confidentialité (D4, P1).

**Le reste du site (8 pages sur 13) est au niveau** : heros lisibles sur fond réel (cas #1 OK partout),
drawer propre, photos de demeures/piscines au standard maison premium (cas #4 OK), footer maîtrisé
desktop ET mobile (cas #6 OK), pas de tic typographique perçu (cas #2 OK), split marque/raison sociale
cohérent. Aucun autre défaut de perception. Le NON tient à 2 inachevés textuels, tous deux corrigeables
sans retoucher le design : supprimer le libellé « Fiche en cours de documentation » (carte + encart
détail) et la note « à faire valider par un avocat ».

**Périmètre non couvert par cette passe** : favicon/onglet à 16px (aucune capture d'onglet dans
gate-shots/) → à vérifier en passe 2 (cas canonique #3 non tranché).

Captures : `docs/reviews/gate-shots/` — viewport réel mobile 390×844 + desktop 1440×900, fold + sections.

---

## Défauts — synthèse

| # | Page(s) | Device | Défaut perçu | Sévérité | Capture |
|---|---|---|---|---|---|
| D1 | Home (section Réalisations) | desktop+mobile | « Fiche en cours de documentation » sous les 3 cartes | **P0** | `home-desktop-sec3.png`, `home-desktop-sec4.png` |
| D2 | Réalisations (grille) | desktop+mobile | « Fiche en cours de documentation » sous les ~17 cartes | **P0** | `realisations-desktop-fold/sec1/sec2.png` |
| D3 | Réalisation détail | desktop+mobile | Encart « Fiche en cours de documentation — sera bientôt publié » au centre, avant le CTA | **P0** (requalifié) | `realisation-detail-desktop-fold.png`, `realisation-detail-mobile-fold.png` |
| D4 | Politique de confidentialité | desktop+mobile | Note interne rendue en prod : « À faire valider par un avocat avant publication définitive » | **P1** | `confidentialite-mobile-sec4.png`, `confidentialite-desktop-sec2.png` |

**Pages OUI (8/13, hors libellé d'inachevé) : Piscines, Jardins, Notre approche, La maison, Architectes,
Contact, Merci, Mentions.** Pages NON : Home, Réalisations, Réalisation détail (D1/D2/D3 P0).
Politique de confidentialité : OUI avec réserve P1 (D4).

---

## PASSE 2 — Re-vérification ciblée après corrections D1-D4 — 2026-06-12

### Verdict Passe 2 : PRÉSENTABLE AU FONDATEUR — **OUI**

Les 4 défauts D1-D4 de la passe 1 sont corrigés et vérifiés **au rendu visuel** (pas seulement au HTML).
Aucune régression sur l'accueil. Cas canonique #3 (favicon 16px) tranché : lisible, **pas un NON**.
Reste un seul point cosmétique **P1 non bloquant** (favicon PNG peu contrasté en dark-mode d'onglet,
voir #3). Verdict binaire du gate (zéro P0, P1 cosmétique assumé) → **OUI**.

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3300`). Contrôle HTML préalable :
zéro occurrence de « en cours de documentation » / « sera bientôt publié » sur la home, la grille
/realisations et les 3 fiches testées ; zéro « valider par un avocat » sur /politique-confidentialite.
Le jugement ci-dessous porte sur le **rendu visuel** (captures viewport réel, contrainte clip ≤ 900px).

Captures passe 2 : `tests/screenshots/perception/p2-*.png`.

#### D1/D2 — /realisations (cartes) → **CORRIGÉ**
Grille desktop + mobile : chaque carte n'affiche plus que **type + zone + « Voir → »** (ex. « PROJET
COMPLET EAU + JARDIN / Yvelines (78) »). **Zéro occurrence** de « Fiche en cours de documentation ».
Photos au standard maison premium, grille équilibrée, fold + filtres propres. Idem section home (HTML
vérifié : 0 libellé). `p2-realisations-desktop-fold/grid.png`, `p2-realisations-mobile-grid.png`.

#### D3 — Fiche draft (galerie sobre) → **CORRIGÉ — digne, pas « page cassée »**
Fiche `piscine-debordement-foret` (tous champs éditoriaux `null`). Desktop : split 60/40, grande photo
premium + caption « Photo publiée avec l'autorisation du propriétaire », à droite titre serif + type +
zone + accroche « Ce projet vous inspire ? Parlons du vôtre. » + CTA. Mobile : photo, titre, type, zone,
CTA pleine largeur. **Aucun encart d'inachevé, aucun blanc cassé** ; le cross-sell « Votre piscine mérite
un jardin à sa mesure » enchaîne proprement. Perçu comme « belle réalisation présentée simplement », pas
comme une fiche vide. `p2-fiche-draft-desktop-fold.png`, `p2-fiche-draft-mobile-fold/info.png`.

#### D4 — /politique-confidentialite → **CORRIGÉ**
Tout-bas de page (mobile + desktop) : la mention finale est désormais « Cette politique a été rédigée en
conformité avec le RGPD et la loi Informatique et Libertés. » La phrase **« À faire valider par un avocat
avant publication définitive » a été retirée**. Section 8. Contact complète. Présentable.
`p2-confid-mobile-toutbas.png`, `p2-confid-desktop-toutbas.png`.

#### Cas canonique #3 — Favicon à 16px réels → **TRANCHÉ : lisible (pas un NON)**
Page de test 1:1 (PNG 16/32 + SVG, fonds clair ET sombre, capture 320px) + composites x10 au plus proche
voisin pour juger le contraste réel. **Sur fond clair** (cas dominant : barre d'onglet claire de
Chrome/Edge/Firefox, onglet actif blanc) : le « A » sérigraphié est **net et reconnaissable au premier
coup d'œil**, formes franches, aucune bouillie → cas #3 (logo détaillé illisible réduit) **ne déclenche
pas**. La ligne d'onglet simulée affiche « A + Aquasystem — Pisciniste & p… » lisible.
**Réserve P1 (non bloquante)** : le favicon PNG/ICO est figé en couleur sombre (#1A1510) et **quasi
invisible sur une barre d'onglet en dark-mode** (le SVG, lui, bascule en clair via `prefers-color-scheme`,
mais les navigateurs privilégient l'ICO/PNG pour l'onglet). Recommandation @fullstack : générer un PNG
dark-mode (ou un « A » avec léger contour/halo) pour couvrir le thème sombre. Impact perception : faible
(barre claire majoritaire) → P1 cosmétique, pas P0. `p2-favicon-1to1.png`,
`p2-favicon16-on-light-x10.png`, `p2-favicon16-on-dark-x10.png`.

#### Régression accueil → **AUCUNE**
Fold mobile : titre serif blanc « L'extérieur à la hauteur de votre propriété. » lisible sur la façade
(overlay/text-shadow tient — cas #1 reste corrigé), sous-titre + CTA nets. Fold desktop : demeure +
piscine miroir, titre lisible sur zone sombre, premium. Identique à passe 1, aucune dégradation introduite
par les corrections D1-D4. `p2-home-mobile-fold.png`, `p2-home-desktop-fold.png`.

#### Synthèse Passe 2
| Défaut P1 | Page(s) | Statut | Sévérité |
|---|---|---|---|
| D1/D2 « Fiche en cours de documentation » (cartes) | Home + Réalisations | ✅ corrigé | — |
| D3 encart d'inachevé fiche détail | Fiche draft | ✅ corrigé (galerie sobre digne) | — |
| D4 note « valider par un avocat » | Politique de confidentialité | ✅ corrigé | — |
| Favicon PNG peu contrasté en dark-mode d'onglet | Toutes (onglet) | ⚠ ouvert | **P1 cosmétique** non bloquant |

Zéro P0 restant. Un seul P1 cosmétique (favicon dark-mode) → verdict binaire du gate : **OUI**.

---

## PASSE 3 — Re-jugement de la refonte IA — 2026-06-12

### Verdict Passe 3 : PRÉSENTABLE AU FONDATEUR — **OUI**

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3400`). Redirect vérifié :
`/notre-approche` → `/la-maison` en 301 (présent dans `out/_redirects`), page `/notre-approche`
absente de `out/`. Captures en viewport réel mobile 390×844 + desktop 1440×900, clips ≤ 880px.
Captures : `tests/screenshots/perception/p3-*.png` (43 fichiers).

Quatre changements jugés, **aucun défaut de perception** sur le rendu réel. Détail ci-dessous.

#### (1) Page /la-maison fusionnée — jugée EN ENTIER → **OUI, rythme maîtrisé, pas indigeste**
Mobile (scrollHeight ~8600px) et desktop (~6500px) lus section par section. Enchaînement :
**hero split** (texte « La maison » gauche / photo spa premium droite) → **Notre histoire** (Aqua
System née à Freneuse, équipe de 8, partenariat LTE + portrait Nicolas Berg, Associé-Gérant) →
**méthode 5 étapes** (1. L'écoute, 2. Le bureau d'études, 3. La réalisation, 4. La livraison,
5. Le suivi annuel — timeline numérotée serif, sobre) → **deux maisons** (« Aqua System » eau +
« Les Terres Essentielles » végétal, photo pépinière réelle) → **ancrage territoire** (Le Vésinet,
Saint-Nom-la-Bretèche…, nappes phréatiques, PLU) → **valeurs** (Sur-mesure, confiance, photo
piscine premium) → **FAQ** (accordéon 4 questions) → **CTA dark**. Malgré la longueur, **jamais
indigeste** : alternance de fonds clairs/sombres, transitions serif en italique entre blocs, jamais
deux pavés de texte identiques d'affilée. Heros et corps lisibles sur fond réel (cas #1 OK).
`p3-lamaison-mobile-y0…8000.png`, `p3-lamaison-desktop-y0…4400.png`.

#### (2) Placeholders « Visuel à venir » restaurés → **ÉLÉGANTS et assumés (pas « inachevé »)**
Doctrine cohérente sur les 3 emplacements (bloc LTE/Jardins accueil, spa /piscines, pépinière
/jardins) : **cadre beige sobre + icône image discrète + libellé « VISUEL À VENIR » + caption
descriptive précise** (ex. « Spa extérieur HotSpring intégré à une terrasse, en soirée — propriété
78/92 » ; « Allée de la pépinière Les Terres Essentielles, végétaux en conteneurs alignés »), en
split avec un bloc éditorial soigné. **Ne déclenche PAS le cas canonique #5** : ce n'est pas une
étiquette technique d'inachevé ni une maquette cassée, mais un emplacement assumé qui annonce le
visuel à venir. Perçu comme une intention éditoriale, pas comme un manque. `p3-piscines-desktop-y1050.png`,
`p3-jardins-desktop-y1500.png`, `p3-home-mobile-y1700.png`.

#### (3) Nouvelles photos (blocs accueil pierre-poutres + hero la-maison) → **au standard premium**
Hero accueil (demeure + piscine miroir) et hero /la-maison (spa pierre-poutres, baie vitrée sur
jardin) au standard maison premium (cas #4 OK). Bloc Piscines accueil = vraie photo de spa intérieur
pierre/bois, lumineuse. Aucun visuel hors-niveau ni casting complaisant. `p3-home-desktop-y0.png`,
`p3-lamaison-desktop-y0.png`.

#### Nav 5 entrées + drawer — « Notre maison » → **NON AMBIGU**, prescripteurs absent
Nav desktop : « Réalisations · Piscines & Bien-être · Jardins & Paysage · **Notre maison** » + CTA.
Drawer mobile : mêmes 4 entrées + sous-titre « De la vision à la réalisation » sous « Notre maison ».
Lu **après** Piscines et Jardins, « Notre maison » n'est plus perçu comme une catégorie de service :
le sous-titre descriptif et la position finale lèvent toute ambiguïté → c'est clairement la page
« à propos / maison ». **Prescripteurs absent de la nav** (correctement renvoyé au footer).
`p3-home-desktop-y0.png`, `p3-drawer-mobile.png`.

#### Footer — lien prescripteurs → **à sa place, discret**
Footer dark structuré (Aquasystem + certifs + réseaux / Aqua System adresse / Les Terres Essentielles
adresse) puis ligne légale « **Espace prescripteurs & architectes** · Mentions légales · Politique de
confidentialité ». Lien prescripteurs dans la ligne utilitaire, ni mis en avant ni perdu. Proportions
footer maîtrisées mobile ET desktop (cas #6 OK). `p3-foot-desktop.png`, `p3-foot-mobile.png`.

#### (4) Favicon v3 (tuile eau + A sand + filet or) → **RÉSOUT le P1 dark-mode de la passe 2**
Re-jugé en rendu 1:1, PNG 16/32 sur fonds clair, gris (onglet inactif), sombre et sombre2 + lignes
d'onglet simulées clair/sombre. La tuile est désormais **pleine bleu-eau** avec « A » serif blanc et
filet or. À 16px réel : **net et reconnaissable au premier coup d'œil sur fond clair ET sombre** — la
tuile pleine se détache du noir, le A blanc reste lisible. Le **P1 de la passe 2** (favicon sombre
quasi invisible en dark-mode d'onglet) est **résolu** par ce fond plein. Aucune bouillie. Détail
mineur non bloquant : le filet or est peu perceptible à 16px (l'œil voit tuile bleue + A blanc) —
raffinement de marque sans incidence sur la lisibilité, **pas même un P1**. `p3-favicon-1to1.png`.

#### Synthèse Passe 3
| Élément jugé | Statut | Sévérité |
|---|---|---|
| /la-maison fusionnée (rythme, lisibilité, pas indigeste) | ✅ OUI | — |
| Placeholders « Visuel à venir » (LTE home, spa, pépinière) | ✅ élégants/assumés | — |
| Nouvelles photos (heros, blocs accueil) | ✅ standard premium | — |
| Nav « Notre maison » non ambiguë + prescripteurs au footer | ✅ OUI | — |
| Favicon v3 tuile pleine (P1 passe 2 dark-mode) | ✅ **résolu** | — |

**Zéro P0, zéro P1 bloquant.** Tous les changements de la refonte IA améliorent ou maintiennent la
perception. Le seul P1 ouvert de la passe 2 (favicon dark-mode) est corrigé. Verdict binaire : **OUI**.

#### Recommandation Passe 3 : **OUI — présentable au fondateur en l'état.**
Refonte IA validée au rendu réel. Aucun agent à relancer. (Optionnel, hors gate : @design peut
épaissir légèrement le filet or du favicon pour le rendre perceptible à 16px — pur raffinement.)

---

## PASSE 4 — Jugement « plus dur » des changements post-passe-3 — 2026-06-12

### Verdict Passe 4 : PRÉSENTABLE AU FONDATEUR — **OUI**

**Recalibrage appliqué** (nouveaux cas canoniques transmis) : un pattern « app mobile » n'est PAS un
pattern site premium (le fondateur a rejeté le drawer bottom-sheet validé en passe 2/3) ; des cartouches
pleins ne sont PAS un code éditorial (il a rejeté le bloc preuves en cartouches). J'ai donc jugé ces deux
refontes au standard maison premium, sans indulgence — et le reste avec le même œil dur.

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3500`). Routes réelles vérifiées :
`/piscines-bien-etre`, `/jardins-paysage`, `/la-maison` (les slugs `/piscines` et `/jardins` n'existent
pas — 404 attendus, hors périmètre). 24 fiches réalisations générées (et non 17). Captures viewport réel
mobile 390×844 + desktop 1440×900, clips ≤ 900px. Captures : `tests/screenshots/perception/p4-*.png`.

#### (2 & 4) DRAWER MOBILE refondu — latéral droite, focus-container → **OUI, premium (plus un bottom-sheet)**
Le drawer n'est plus une feuille qui remonte du bas (pattern « app ») : c'est un **panneau latéral droit**
qui couvre ~85% de la largeur, overlay sombre à gauche, focus dans le conteneur. En-tête « Aquasystem »
serif + **croix de fermeture SANS anneau ni cercle par défaut** (simple X top-right, conforme à la
consigne). Hiérarchie : 4 entrées serif séparées par filets fins (« Réalisations · Piscines & Bien-être ·
Jardins & Paysage · À propos »), **« À propos » en 4e position avec sous-titre « De la vision à la
réalisation »**, puis CTA pleine largeur « Parlez-nous de votre projet » ancré en bas. Lu APRÈS Piscines
et Jardins, « À propos » ne prête à **aucune ambiguïté** (page maison/à-propos, pas une catégorie de
service). Animation sobre, pas d'effet « app ». `p4-drawer-mobile.png`.

#### (4 bis) NAV « À propos » DESKTOP → **NON AMBIGU**
Barre desktop : « Réalisations · Piscines & Bien-être · Jardins & Paysage · À propos » + CTA. Même
lecture : « À propos » en fin de liste après les deux métiers = clairement la page maison. `p4-home-desktop-y0.png`.

#### (1) ACCUEIL — photo fondateur parasols sur le bloc LTE → **DIGNE et équilibrée**
Bloc à deux colonnes carrées de taille égale : gauche **Aqua System** (piscine intérieure pierre-poutres,
lumineuse, premium) ; droite **« EN PARTENARIAT AVEC LES TERRES ESSENTIELLES »** + photo fondateur
(terrasse à parasols en chaume, salon lounge, bassin, jardin mature, lumière chaude — vraie scène
extérieure haut de gamme, pas un cliché stock). `object` ~60% bien cadré, sujet centré. **Équilibre tenu**
avec le bloc Piscines pierre-poutres voisin : même format, même poids visuel, même niveau premium — aucun
des deux n'écrase l'autre. Cas #4 OK. `p4-home-desktop-lte-y780.png`, `p4-parasols-zoom.png`,
`p4-home-mobile-lte.png`.
*P1 cosmétique non bloquant* : l'eyebrow « EN PARTENARIAT AVEC LES TERRES ESSENTIELLES » est petit/discret
sur le coin de la photo — lisible mais pourrait gagner en présence. Sans incidence sur le verdict.

#### (8) Bloc preuves éditorial (filets) + claim GEO recomposé → **TENUE confirmée**
Bloc 4 colonnes séparées par **filets verticaux fins** (« 30+ ANS D'EXPERTISE · 350+ PISCINES ENTRETENUES
EN 78/92 · SOCOTEC CERTIFICATION CSP/ESP-001 · L'ESPRIT PISCINE RÉSEAU PISCINISTE ») — **code éditorial
en filets, PAS de cartouches pleins** (la correction demandée par le fondateur est appliquée). Dessous,
filet horizontal puis **claim GEO en ligne centrée, créditée** : « Aqua System : certifié Socotec CSP/ESP-001,
membre du réseau L'Esprit Piscine. Plus de 350 piscines entretenues… Trophée d'Or FPP 2024 (Piscine
intérieure, FPP). Award Bronze EUSA 2025… ». Recomposition lisible, sobre, factuelle, parfaitement cohérente
avec le bloc filets au-dessus. `p4-home-desktop-y2100.png`, `p4-home-mobile-geo.png`.

#### (3) HÉROS /piscines-bien-etre · /jardins-paysage · /la-maison → **« cheap » RÉSOLU (desktop + mobile)**
- **/piscines-bien-etre** : photo pierre-poutres (piscine intérieure, ~35% crop), titre serif blanc
  « Piscines & Bien-être » + sous-titre lisibles sur la zone basse plus sombre. Cas #1 OK.
- **/jardins-paysage** : photo jardin-bassin (maison + jardin + bassin, ~40%), titre blanc sur la zone
  végétale sombre, sous-titre lisible. Vraie scène, premium.
- **/la-maison** : split — colonne texte sur crème (eyebrow « AQUA SYSTEM × LES TERRES ESSENTIELLES »,
  titre « La maison », sous-titre, **ligne de preuve « 30 ans · Équipe de 8 · Yvelines & Hauts-de-Seine »
  + filet**) / photo veranda-soir (piscine sous véranda au crépuscule, lumière chaude). Traitement
  éditorial soigné.
  Les 3 heros tiennent aussi **en mobile** (texte sur bande suffisamment sombre ou empilé sur crème).
  Le « cheap » des passes antérieures n'est plus perçu. `p4-piscines-hero-desktop.png`,
  `p4-jardins-hero-desktop/mobile.png`, `p4-lamaison-hero-desktop/mobile.png`.

#### (5) FICHE réalisation draft → **PAGE DIGNE (visualDescription rendue + CTA contact)**
Fiche `piscine-debordement-foret`. Desktop split : grande photo premium gauche + caption « Réalisation
Aqua System, Ouest parisien. Photo publiée avec l'autorisation du propriétaire. » ; droite titre serif
« Piscine à débordement en lisière de forêt », type « PISCINE SUR MESURE », zone « Ouest parisien », puis
**un vrai paragraphe descriptif rendu** (visualDescription : « Le plan d'eau s'étend en lisière de forêt,
de plain-pied… un débordement prolongé par le reflet sombre des arbres. Une terrasse en bois et une bande
de pierre claire, où quelques transats s'alignent. ») — **texte réel, pas un placeholder**. Puis « Ce projet
vous inspire ? Parlons du vôtre. » + **CTA contact propre** (« Parlez-nous de votre projet »), à la place
du cross-sell. Aucun encart d'inachevé. Perçu comme une belle réalisation présentée simplement. Cas #5
OK. `p4-fiche-draft-desktop.png`, `p4-fiche-draft-desktop-low.png`, `p4-fiche-draft-mobile.png`.

#### (6) /realisations — grille 24 cartes (dont 10 nouvelles photos) → **HOMOGÈNE, rien d'indigne**
24 cartes (énumérées via DOM), 3 colonnes, filtres « Tous · Piscine · Spa & Sauna · Bassin & Parc · Projet
complet eau+jardin ». Libellés **consistants** : type (PISCINE SUR MESURE / PROJET COMPLET EAU + JARDIN /
ESPACE BIEN-ÊTRE / JARDIN & PARC) + zone « Ouest parisien » + « Voir → ». **Zéro libellé d'inachevé.**
Qualité homogène au standard premium : piscines extérieures, intérieures pierre-poutres, scènes eau+jardin,
demeures (brique, ancienne). Les candidates « à risque » (carte teintée chaude au crépuscule, demeure de
brique) inspectées en zoom = vraies propriétés haut de gamme, pas de photo hors-niveau. Cas #4 OK.
`p4-realisations-y0/y850/y1700/y2550.png`, `p4-real-zoom1.png`.

#### (7) FOOTER — icônes LinkedIn / Facebook → **PROPRES**
Deux icônes monochromes en traits fins (glyphe « in » LinkedIn + « f » Facebook), 36px, bien espacées sous
les badges « Certifié Socotec CSP/ESP-001 » / « Réseau L'Esprit Piscine ». Liens vérifiés : LinkedIn →
`linkedin.com/company/aqua-system`, Facebook → `facebook.com/LesTerresEssentielles/`, **aria-labels
explicites** + ouverture nouvel onglet. Reconnaissables, non cassées, non génériques. `p4-footer-icons.png`.

#### Synthèse Passe 4
| # | Changement jugé (œil dur) | Statut | Sévérité |
|---|---|---|---|
| 2/4 | Drawer mobile latéral droite, croix sans anneau, « À propos » non ambigu | ✅ premium (plus un bottom-sheet) | — |
| 4 | Nav « À propos » desktop | ✅ non ambigu | — |
| 1 | Photo fondateur parasols bloc LTE (équilibre pierre-poutres) | ✅ digne | P1 cosmétique (eyebrow petit) |
| 8 | Bloc preuves filets éditoriaux + claim GEO recomposé | ✅ tenue (plus de cartouches pleins) | — |
| 3 | Heros /piscines · /jardins · /la-maison (eyebrow/preuve/filet) | ✅ « cheap » résolu | — |
| 5 | Fiche draft (visualDescription rendue + CTA contact) | ✅ page digne | — |
| 6 | Grille 24 cartes (10 nouvelles photos) | ✅ homogène, rien d'indigne | — |
| 7 | Footer icônes LinkedIn/Facebook | ✅ propres | — |

**Zéro P0. Un seul P1 cosmétique non bloquant** (eyebrow LTE petit). Les deux patterns rejetés par le
fondateur (drawer bottom-sheet, cartouches preuves) sont **corrigés** et tiennent au standard premium.
Verdict binaire du gate (zéro P0, P1 cosmétique assumé) → **OUI**.

#### Recommandation Passe 4 : **OUI — présentable au fondateur en l'état.**
Aucun agent à relancer en bloquant. (Optionnel, hors gate : @design peut renforcer légèrement la présence
de l'eyebrow « EN PARTENARIAT AVEC LES TERRES ESSENTIELLES » sur le bloc LTE — pur raffinement.)

---

## Détail par page (Passe 1)

### Home — OUI (hors D1/D2)
Hero mobile + desktop OK (text-shadow/overlay corrigé, titre lisible sur façade claire — cas #1 corrigé).
Sections services au niveau, bloc chiffres lisible, CTA dark élégant, drawer mobile propre. D1 (P0) :
libellé d'inachevé sur les cartes réalisations.

### Réalisations — NON (D2 P0)
Fold + filtres premium. Grille ~17 cartes, photos au standard maison premium (cas #4 sain). D2 (P0) :
« Fiche en cours de documentation » sous CHAQUE carte → NON.

### Réalisation détail — NON (D3 P0, requalifié de P1)
Grande photo au niveau, mention autorisation propriétaire rassurante. D3 (P0) : encart boxé « Fiche en
cours de documentation — sera bientôt publié » avant le CTA, sur la page la plus engageante.

### Piscines, Jardins, Notre approche, La maison, Architectes, Contact, Merci, Mentions — OUI
Heros lisibles sur fond réel, sections éditoriales soignées, footers maîtrisés desktop ET mobile (cas #6
OK), split marque « Aquasystem » / raison sociale « Aqua System » cohérent. Aucun inachevé.

### Politique de confidentialité — OUI (avec D4 P1)
Politique RGPD complète et lisible. D4 (P1) : note interne « À faire valider par un avocat avant
publication définitive » rendue en prod avant le footer.

---

## Croisement specs (parti pris assumé vs vrai défaut)
- Libellé « Fiche en cours de documentation » (D1/D2/D3) : placeholder de contenu non documenté → défaut P0.
- Note « à faire valider par un avocat » (D4) : commentaire @legal laissé en prod → défaut P1.
- Split « Aquasystem » / « Aqua System » : cohérent et systématique → parti pris assumé, pas un défaut.

## Recommandation Passe 1 : **NON** (re-soumettre après correction)
1. Supprimer le libellé « Fiche en cours de documentation » (cartes + encart fiche détail).
2. Retirer la note « À faire valider par un avocat » de la Politique de confidentialité.
3. Passe 2 : capturer l'onglet/favicon à 16px (cas #3 non tranché) + re-vérifier les 3 pages corrigées.
