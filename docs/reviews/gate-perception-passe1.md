# Gate de perception — Aquasystem (14 pages) — Passe 1 → Passe 8 — 2026-06-12

## Verdict global ACTUEL (Passe 8) : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 8 (2026-06-12, œil dur, recalibrages cumulés) : jugement du plus gros lot — méga-lot SEO/GEO,
> **BLOG complet entièrement neuf**, fixes primitives + alignements. Le blog (/notre-regard index + 2
> articles longs entiers + teaser accueil + footer) est jugé **digne d'un magazine de maison** : typographie
> de lecture maîtrisée, encadrés GEO propres, AuthorBlock crédible (Nicolas Berg + preuves Socotec/30 ans),
> « À lire également », CTA cohérent. Les 3 cas fondateur post-fix passent : claims GEO piscines centrés sur
> axe propre, TextBlocks jardins/la-maison alignés, **bloc LTE désormais arrondi = cohérent avec le bloc AS
> voisin**, cross-sell mobile arrondi. Titres d'onglet : « | » partout, zéro « — ». Anti-régression OK.
> **Zéro P0. Aucun défaut bloquant.** Section détaillée : « PASSE 8 » en bas de fichier.

## Verdict global précédent (Passe 7) : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 7 (2026-06-12) : re-vérif ciblée post-corrections (doublon CTA fiches levé via D-33, lot CTA
> système, 2 photos fondateur insérées). Les 3 cas nommés du fondateur + le P0 + les photos sont jugés
> en viewport réel — **tout passe**. Le P0 bloquant de la passe 6 (double-CTA fiches) est **résolu**.
> Section détaillée : « PASSE 7 » en bas de fichier.

## Verdict global précédent (Passe 6) : PRÉSENTABLE AU FONDATEUR — **NON**
> Passe 6 (2026-06-12, œil dur, recalibrages cumulés) : cycle « fond jardins + textes réalisations
> + resserrage piscines » jugé en viewport réel. **Le fond est là, l'exécution éditoriale aussi** —
> mais un **défaut de perception P0 systématique** sur les **4 fiches réalisations** bloque le verdict :
> le **même CTA est rendu DEUX FOIS de suite**, accolé (titre serif clair « Ce projet vous inspire ?
> Parlons du vôtre. » + bouton « Parlez-nous de votre projet », IMMÉDIATEMENT suivi du bloc CTA sombre
> pleine largeur reprenant EXACTEMENT le même titre + le même bouton, ~80px d'écart, sans contenu
> intercalaire). Un client premium pressé lit « template mal monté / doublon d'affichage ». Présent sur
> les 4 fiches jugées (debordement-foret, fond-mobile-terrasse, interieure-pierre-poutres,
> nocturne-murets). **C'est un défaut d'intégration** (`src/app/realisations/[slug]/page.tsx` : `<aside>`
> CTA inline l.187-199 + `<SectionCTA amorce="Ce projet vous inspire ?…">` l.208 → même amorce).
> **Tout le reste du cycle est au standard** : /jardins-paysage enrichie a du FOND réel sans fausse
> promesse, /piscines-bien-etre resserrée respire mieux sans fait perdu, textes D-31 donnent envie de
> contacter, zéro régression accueil/piscines. **Verdict binaire → NON** tant que le double-CTA des fiches
> est visible. Correctif trivial (retirer l'aside OU différencier l'amorce). Détail : section « PASSE 6 ».
> Captures : `tests/screenshots/perception/p6-*.png`.

## Verdict Passe 5 : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 5 (2026-06-12, œil dur, recalibrages cumulés) : changements post-passe-4 jugés en viewport
> réel. /piscines-bien-etre enrichie (3 nouvelles sections : grille « Ce que nous savons construire »
> 6 cards 4:3 homogènes premium, « Construit pour durer », « La matière qui reste ») — page devenue
> longue mais **digeste** (alternance MediaSplit / placeholder / grille / texte centré / preuves).
> /jardins-paysage : bloc « Pierre, végétal, sol » inséré = **fluide**, même registre éditorial.
> /prescripteurs (D-29, 1re passe) **au standard** : hero pierre-mur titre noir lisible, preuves filets,
> encart qualification éditorial, cards dont la nocturne premium. Fold accueil mobile sans régression.
> **Zéro P0.** Un seul P1 éditorial assumé (resserrage piscines, arbitrage de rythme — pas un défaut
> d'exécution). Détail : section « PASSE 5 ». Captures : `tests/screenshots/perception/p5-*.png`.

## Verdict Passe 4 : PRÉSENTABLE AU FONDATEUR — **OUI**
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

## PASSE 5 — Jugement des changements post-passe-4 (œil dur) — 2026-06-12

### Verdict Passe 5 : PRÉSENTABLE AU FONDATEUR — **OUI**

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3600`). Routes vérifiées 200 :
`/piscines-bien-etre`, `/jardins-paysage`, `/prescripteurs`, `/`. Captures viewport réel mobile 390×844
+ desktop 1440×900, clips ≤ 900px, images ≤ 1900px. Captures : `tests/screenshots/perception/p5-*.png`.
Recalibrages cumulés appliqués (pattern app-mobile ≠ premium ; cartouches pleins ≠ éditorial ; juge dur).

#### (1) /piscines-bien-etre ENRICHIE — 3 nouvelles sections + rythme global → **DIGESTE, pas indigeste**
Page longue jugée EN ENTIER, desktop (~6140px) et mobile (~10470px), section par section.
- **« Ce que nous savons construire »** (grille 6 cards) → **OK premium.** 3 colonnes × 2 rangées, 6 ouvrages
  (Piscine à débordement · Bassin miroir · Couloir de nage · Piscine intérieure · Paroi de verre + 1) :
  **photo 4:3 + titre serif + paragraphe** par card. Les 6 photos sont **homogènes et au standard maison
  premium** (piscine pierre-poutres, bassin miroir sur demeure, couloir de nage pergola, paroi de verre sur
  travertin) — aucune hors-niveau, grille équilibrée, hiérarchie crédible (titre serif > corps). Cas #4 OK.
- **« Construit pour durer »** (eyebrow CONSTRUCTION) → bloc texte centré sobre, factuel (béton armé, Avis
  Technique CSTB, garantie décennale, Socotec). Lisible sur fond crème, pas un pavé indigeste.
- **« La matière qui reste »** → texte pierres/teinte d'eau/terrasses, enchaîne sur le bloc preuves filets
  (30+ / 350+ / Socotec / L'Esprit Piscine) + claim GEO crédité — cohérent avec la home (cas #2/#8 OK).
- **Rythme GLOBAL** : malgré la longueur, **alternance soutenue** (MediaSplit Conception → placeholder spa →
  MediaSplit Suivi → grille 6 cards → texte Construction centré → texte Matière → preuves filets → cross-sell
  dark). Jamais deux blocs de même nature d'affilée. **Lecture réelle digeste**, pas de sensation de tunnel.
- **Redondance signalée (MediaSplit Conception vs Construction)** : en lecture réelle, « De la feuille blanche
  à l'inauguration » (CONCEPTION — parcours, 1 interlocuteur, écoute du terrain) et « Construit pour durer »
  (CONSTRUCTION — structure béton/CSTB/décennale) traitent d'**angles distincts** (parcours vs garantie
  technique). Proximité thématique légère mais **ne gêne pas la lecture** ; les deux sont séparés par la grille
  6 cards et le placeholder. → **arbitrage éditorial, pas un défaut d'exécution.**
  `p5-piscines-bien-etre-desktop-hero…y5400.png`, `p5-piscines-grid-r1/r2.png`, `p5-piscines-mobile-00…11.png`.
- **P1 éditorial assumé (non bloquant)** : la page est dense (2 blocs « matière/durée » + grille + 3 MediaSplit) ;
  un **resserrage** possible (fusionner « Construit pour durer » et « La matière qui reste », ou alléger un
  MediaSplit) gagnerait en nervosité. C'est un **arbitrage de rythme @copywriter/@product**, pas un défaut
  visible. N'affecte pas le verdict.

#### (2) /jardins-paysage — bloc « Pierre, végétal, sol : ce que nous assemblons » → **FLUIDE, pas une rupture**
Inséré entre « La réalisation, du premier arbre à la dernière pierre » (CRÉATION) et « Des végétaux
sélectionnés pour durer » (ENTRETIEN & PÉPINIÈRE). **Même registre éditorial** que les autres sections (eyebrow
MATIÈRES + titre serif centré + 3 paragraphes sur crème), jumeau du bloc « matière » de piscines. Enchaînement
logique CRÉATION → MATIÈRES → ENTRETIEN, transition de fond douce. **Pas de rupture perçue**, desktop ET mobile.
Léger recouvrement lexical avec le bloc suivant (sol argilo-calcaire / essences à croissance lente) — à
surveiller mais **invisible à la lecture**. `p5-jardins-pvs-before/block/after.png`, `p5-jardins-pvs-mobile.png`.

#### (3) /prescripteurs (D-29, 1re passe en gate) — page ENTIÈRE → **AU STANDARD**
Mobile (~6300px) + desktop (~4020px) jugés en entier.
- **Hero pierre-mur-ancien** : titre serif **noir** « L'exécutant haut de gamme que vos clients méritent… »
  sur la **zone crème à gauche** (la photo demeure/piscine/mur de pierre est confinée à droite) → **net,
  aucun texte clair sur fond clair de photo**, cas #1 sain. Sous-titre + eyebrow preuves filets (Socotec /
  L'Esprit Piscine) propres. `p5-presc-hero-zoom.png`.
- **Preuves filets** : 3 colonnes (« Un exécutant qui lit les plans » / « Votre relation… reste la vôtre » /
  « 30 ans de réalisations 78/92 ») séparées par filets — **code éditorial, pas de cartouches pleins** (recalibrage
  fondateur respecté). `p5-prescripteurs-desktop-01.png`.
- **Encart qualification éditorial** (« Ce qui nous qualifie ») : liste en filets horizontaux (Socotec / 30 ans /
  bureau d'études paysager) + « Dossier de qualification complet disponible sur demande » + CTA « Présentons-nous ».
  Sobre, éditorial. FAQ accordéon 4 questions en filets fins. `p5-prescripteurs-desktop-02/03.png`.
- **Cards « Nos réalisations : références vérifiables »** (dont la NOCTURNE) → **au standard premium.** 3 cards :
  bien-être pierre-poutres (clair) · **projet complet eau+jardin NOCTURNE** (piscine éclairée le soir, banquettes
  lumineuses, ambiance bleu/ambre — vraie scène crépusculaire haut de gamme, **pas un cliché sombre/bruité**) ·
  projet eau+jardin extérieur. Libellés cohérents (type + « Ouest parisien » + « Voir → »), zéro inachevé.
  Cas #4 OK. `p5-presc-nocturne2.png`.
- **CTA dark « Travaillons ensemble » + footer** cohérent (Aquasystem / Aqua System / Les Terres Essentielles,
  icônes LinkedIn/Facebook). Mobile : hero titre noir lisible, qualification empilée propre, CTA pleine largeur.
  `p5-prescripteurs-mobile-00/04.png`, `p5-prescripteurs-desktop-04.png`.

#### (4) Anti-régression — fold accueil mobile → **AUCUNE RÉGRESSION**
Façade demeure, titre serif blanc « L'extérieur à la hauteur de votre propriété. » lisible (overlay/text-shadow
tient — cas #1 reste corrigé), sous-titre + CTA nets. Identique aux passes antérieures. `p5-home-mobile-fold.png`.

#### Synthèse Passe 5
| # | Changement jugé (œil dur) | Statut | Sévérité |
|---|---|---|---|
| 1 | /piscines enrichie — grille 6 cards 4:3 + 2 blocs matière/durée | ✅ homogène premium | — |
| 1 | /piscines — rythme global page longue (digestibilité) | ✅ digeste | **P1 éditorial** (resserrage, assumé) |
| 1 | /piscines — redondance Conception/Construction | ✅ angles distincts, ne gêne pas | — |
| 2 | /jardins — bloc « Pierre, végétal, sol » inséré | ✅ fluide (pas une rupture) | — |
| 3 | /prescripteurs — hero pierre-mur titre noir lisible | ✅ cas #1 sain | — |
| 3 | /prescripteurs — preuves filets + encart qualification | ✅ éditorial (pas de cartouches) | — |
| 3 | /prescripteurs — cards dont nocturne | ✅ standard premium | — |
| 4 | Anti-régression fold accueil mobile | ✅ aucune régression | — |

**Zéro P0. Un seul P1 éditorial assumé** (resserrage du rythme de /piscines — arbitrage @copywriter/@product,
pas un défaut d'exécution visible). Tous les changements améliorent ou maintiennent la perception. Les deux
patterns rejetés par le fondateur (app-mobile, cartouches pleins) restent absents. Verdict binaire du gate
(zéro P0, P1 assumé) → **OUI**.

#### Recommandation Passe 5 : **OUI — présentable au fondateur en l'état.**
Aucun agent à relancer en bloquant. (Optionnel, hors gate : @copywriter/@product peut resserrer le bas de
/piscines-bien-etre — fusion possible « Construit pour durer » + « La matière qui reste » — pur arbitrage de
rythme.)

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

---

## PASSE 6 — Jugement du cycle « fond jardins + textes réalisations + resserrage piscines » (œil dur) — 2026-06-12

### Verdict Passe 6 : PRÉSENTABLE AU FONDATEUR — **NON** (1 P0 systématique sur les fiches)

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3700`). Routes 200 vérifiées :
`/jardins-paysage`, `/piscines-bien-etre`, 4 fiches, `/`. Captures viewport réel mobile 390×844 +
desktop 1440×900, clips ≤ 900px (viewport bandé, jamais fullPage), images ≤ 1900px. Lots ≤ 3.
Captures : `tests/screenshots/perception/p6-*.png`. Recalibrages cumulés appliqués (juge dur).

#### (1) /jardins-paysage ENRICHIE — du FOND, sans fausse promesse → **OK premium**
Page jugée EN ENTIER, mobile (~8870px) et desktop (~5990px), section par section.
- **Hero** lisible (titre serif clair sur zone sombre de la photo, contraste réel OK — cas #1 OK).
- **Bureau d'études (4 §)** : « Un projet pensé avant d'être planté » → texte concret et crédible
  (lecture du terrain, ombres portées, vues depuis l'intérieur, circulations, co-étude piscine+jardin,
  bureau intégré aux Alluets-le-Roi). Du **fond réel**, aucune promesse creuse. Cas #5 OK.
- **« Ce que le vivant impose »** (eyebrow LE VIVANT, grille 4 entrées) : placeholders « Visuel à venir »
  **sobres, bien dimensionnés, légendés descriptivement** (« Haie de charme… lumière rasante… »), titres
  « Le choix des essences » / « Le sol comme contrainte réelle » (entrée **text-only** assumée, alignée
  haut, pas de trou perçu) / « L'entretien au bon moment ». Textes concrets (essences à maturité, sol
  argilo-calcaire 78/92, calendrier de taille). Rythme alterné **digeste** (placeholder ↔ titre ↔ texte).
- **Pépinière réécrite** : photo réelle de pépinière + « Des végétaux sélectionnés pour durer » (sélection
  sur la plante pas sur catalogue) + preuves filets (Bureau d'études / Pépinière / Jardinerie depuis 2015)
  + photo piscine-jardin (cross-sell). Cohérent, pas de fausse promesse.
- **Cross-sell + CTA + footer** : « Découvrir nos piscines sur mesure » → CTA conversation → footer maîtrisé
  (ne déborde pas mobile — cas #6 OK). **Verdict page : du fond, rythme bon, zéro fausse promesse → OK.**

#### (2) /piscines-bien-etre RESSERRÉE — fusion « Ce qui tient dans le temps » → **respire mieux, zéro fait perdu**
Page jugée EN ENTIER, mobile (~10205px) et desktop (~5842px).
- **« Ce qui tient dans le temps »** (eyebrow CONSTRUCTION & FINITIONS) **fusionne** construction (béton
  armé, bureau d'études, **Avis Technique CSTB**), responsabilité (un seul marché, **garantie décennale**,
  **Socotec CSP/ESP-001**, **Propiscines Certifié**) et finitions (margelles pierre/travertin, grès cérame,
  teinte d'eau, cross-sell pierre). **Aucun fait perdu** vs l'ancien découpage : décennale, CSTB, Socotec,
  Propiscines, 30 ans, 350 piscines tous présents. Bloc dense mais structuré (3 § thématiques).
- **Bas de page** : preuves chiffrées filets (30+ / 350+ / Socotec / L'Esprit Piscine) → cross-sell jardin
  avec photo réelle « Votre piscine mérite un jardin à sa mesure » → CTA conversation → footer. Plus de
  bloc redondant en fin de page : **le bas respire mieux**. Anti-régression piscines mobile **OK**.

#### (3) FICHES réalisations (4 jugées) — textes D-31 excellents MAIS double-CTA → **P0**
Mobile, ~2100-2240px chacune (3 bandes), **longueur OK mobile**.
- **Textes D-31** (debordement-foret, fond-mobile-terrasse, interieure-pierre-poutres, nocturne-murets) :
  concrets, narratifs, techniques justes (lame de débordement + bac tampon ; motoréducteur + guides béton ;
  moellons + charpente + travertin + atmosphère humide ; scénographie lumière câblée au gros-œuvre). Chacun
  **se termine par une projection vers le lecteur** (« Si vous disposez… », « Si vous envisagez… ») →
  **donnent envie de contacter.** Eyebrows variés (Piscine sur mesure / Espace bien-être / Projet complet
  eau + jardin). Photos réelles au standard maison (cas #4 OK). **Le fond éditorial est au niveau.**
- **DÉFAUT P0 (perception, cas #2 répétition / #5 inachevé) — sur les 4 fiches** : le **même CTA rendu
  DEUX FOIS accolé**. Titre serif clair « Ce projet vous inspire ? Parlons du vôtre. » + bouton
  « Parlez-nous de votre projet → », **IMMÉDIATEMENT suivi** (sans contenu intercalaire, ~80px) du bloc
  CTA sombre pleine largeur reprenant **EXACTEMENT** le même titre + le même bouton. Vérifié en bande
  continue (`p6-fiche-cta-zoom.png`) : ce n'est pas un artefact de scroll. Source :
  `src/app/realisations/[slug]/page.tsx` → `<aside>` CTA inline (l.187-199) **+** `<SectionCTA
  amorce="Ce projet vous inspire ? Parlons du vôtre.">` (l.208) = même amorce + même bouton.
  Un client premium pressé lit « doublon d'affichage / template mal monté ». **Pas un parti pris crédible**
  (personne ne pose volontairement deux CTA identiques collés). **Correctif d'intégration trivial**
  (@fullstack) : retirer l'`<aside>` inline OU différencier l'amorce du `SectionCTA`.

#### (4) Anti-régression — **OK**
- **Folds accueil** mobile (~5393px) + desktop (~3621px) : hero « L'extérieur à la hauteur de votre
  propriété. » lisible sur fond réel (cas #1 OK), bloc Piscines premium, nom de marque « Aquasystem »
  uniforme. **Zéro régression.**
- **Piscines mobile** : aucune régression de fold ni de footer (cas #6 OK).

### Défauts Passe 6
| Page | Device | Défaut perçu | Sévérité | Capture |
|---|---|---|---|---|
| 4 fiches réalisations | mobile (et desktop) | CTA dédoublé : même titre « Ce projet vous inspire ? Parlons du vôtre. » + même bouton, rendus 2× accolés (~80px) | **P0** | `p6-fiche-*-mobile-01.png`, `p6-fiche-cta-zoom.png` |
| /jardins-paysage | desktop | Entrée text-only de la grille « Ce que le vivant impose » laisse un grand vide sous le texte vs card placeholder voisine plus haute | P1 cosmétique (parti pris grille hauteurs naturelles — non bloquant) | `p6-jardins-desktop-03.png` |

### Recommandation Passe 6 : **NON** → relancer @fullstack
1. **P0 bloquant** : supprimer le dédoublement CTA des fiches (`src/app/realisations/[slug]/page.tsx`).
   Garder UN seul CTA en bas de fiche (le `SectionCTA` sombre suffit), ou différencier nettement l'amorce
   de l'aside inline si les deux doivent coexister. Re-soumettre les 4 fiches en passe 7.
2. **P1 (optionnel)** : équilibrer la hauteur de l'entrée text-only de la grille jardins desktop (centrer
   verticalement le texte dans la cellule, ou borner la hauteur) — non bloquant pour le verdict.
3. Tout le reste du cycle (jardins enrichie, piscines resserrée, textes D-31, accueil) est **au standard** :
   ne pas y retoucher.

---

## PASSE 7 — Re-vérification ciblée post-corrections (doublon levé, lot CTA D-33, 2 photos fondateur) — 2026-06-12

### Verdict Passe 7 : PRÉSENTABLE AU FONDATEUR — **OUI**
> Build `npm run build` OK (export statique 24 fiches + pages), `npx serve out -l 3800`. Re-jugement en
> viewport réel des **3 cas nommés du fondateur + le P0 passe 6 + les 2 photos fondateur + anti-régression**.
> Contraintes respectées (clips ≤900px, jamais fullPage, lots ≤3, images sources ≤800w). **Zéro P0 restant.**

#### (1) Drawer mobile 390 ET 320 — **OK**
- **390×844** (`p7-drawer-390.png`) : burger ouvert, menu « Aquasystem / Réalisations / Piscines & Bien-être /
  Jardins & Paysage / À propos », CTA sombre pleine largeur **« Parlez-nous de votre projet → » sur UNE ligne**,
  flèche collée au texte. Propre.
- **320×640** (`p7-drawer-320.png`) : à la largeur la plus contrainte, le **CTA tient toujours sur UNE seule
  ligne** (seul l'item de menu « Piscines & Bien-être » wrappe sur 2 lignes — comportement normal et lisible
  d'un item long à 320px, pas un défaut). **Cas validé.**

#### (2) Fiches réalisation (debordement-foret + fond-mobile) mobile — **UN SEUL CTA, doublon levé — OK**
- `p7-fiche-foret-pre-390.png` → `p7-fiche-foret-cta-390.png` → `p7-fiche-foret-end-390.png` (bande continue) et
  idem fond-mobile (`p7-fiche-fondmobile-cta-390.png` / `-end-390.png`) : le texte éditorial se termine
  (« …le débordement est souvent la réponse la plus juste. ») puis **directement le bloc sombre unique**
  « Ce projet vous inspire ? Parlons du vôtre. » + bouton « Parlez-nous de votre projet → », **suivi du footer**.
  **Aucun CTA inline intercalaire.** Confirmé en source : l'`<aside>` CTA inline est retiré (commentaire l.186-188),
  un seul `SectionCTA` subsiste (l.197-201). **Le P0 bloquant de la passe 6 est résolu.**

#### (3) /prescripteurs — flèche orpheline du « Voir toutes les réalisations » — **OK**
- Desktop (`p7-prescripteurs-voir-desktop.png`) : sous la grille 3 cartes, lien ghost
  **« Voir toutes les réalisations → » sur UNE ligne**, flèche collée. Pas d'orphelin.
- Mobile (`p7-prescripteurs-voir-mobile.png`) : bouton ghost centré, **texte + flèche sur UNE ligne**.
  **Plus de flèche seule en 2e ligne. Cas validé.**

#### (4) Photos fondateur — **bien rendues, cadrage digne — OK**
- **Bulbes printemps** (jardins, bloc « Entretien & pépinière ») `p7-photo-bulbes-desktop.png` /
  `-mobile.png` : narcisses jaunes + jacinthes bleues en pots sur étals, palissade bois, photo nette,
  couleurs vives, registre jardinerie authentique. Sert la preuve « pépinière propre ». Source 800w (≤1900px). Digne.
- **Pavillon crépuscule** (piscines, bloc « Spa & bien-être ») `p7-photo-pavillon-desktop.png` /
  `-mobile.png` : pavillon vitré, intérieur éclairé chaud, vu de l'extérieur sur pelouse à la tombée du
  jour. Registre architectural premium, lumière soignée, cadrage propre. alt descriptif correct. Digne.
- Aucune distorsion, aucun placeholder résiduel, intégration 2-col desktop / stacked mobile propre.

#### (5) Anti-régression (clamp lg) — **OK, rien de cassé**
- **Accueil fold mobile** (`p7-accueil-fold-mobile.png`) : hero « L'extérieur à la hauteur de votre
  propriété. » lisible sur bandeau dégradé, sous-titre net, CTA sur une ligne. Titre serif en taille mobile
  cohérente — le clamp lg ne casse pas le fold.
- **Piscines fold mobile** (`p7-piscines-fold-mobile.png`) : hero « Piscines & Bien-être » lisible sur photo,
  bloc « De la feuille blanche à l'inauguration » net. Aucune coupure, aucun débordement.

### Défauts Passe 7
| Page | Device | Défaut | Sévérité |
|---|---|---|---|
| — | — | Aucun défaut P0/P1 nouveau. P0 doublon CTA fiches (passe 6) **résolu**. P1 hauteur entrée text-only grille jardins desktop reste **non bloquant** (parti pris hauteurs naturelles, hors périmètre passe 7). | — |

### Recommandation Passe 7 : **OUI — présentable au fondateur.**
Les 3 cas nommés du fondateur sont corrigés, le P0 levé, les 2 photos fondateur au standard maison. Ne plus
retoucher le périmètre jugé. Captures : `tests/screenshots/perception/p7-*.png` (17 fichiers).

---

# PASSE 8 — Méga-lot SEO/GEO + BLOG complet + fixes primitives & alignements (2026-06-12)

> Œil dur, recalibrages cumulés. Jugé en viewport réel (`npm run build && npx serve out -l 3900`).
> Contraintes respectées : images ≤1900px, viewport/clip ≤900px, jamais fullPage, lots ≤3.

## Verdict Passe 8 : PRÉSENTABLE AU FONDATEUR — **OUI**

## 1. BLOG (entièrement neuf — jugement complet)

| Élément | Device | Jugement | Sév. | Capture |
|---|---|---|---|---|
| /notre-regard index | desktop+mobile | Grille ArticleCard 3 col (desktop) / 1 col (mobile), eyebrow « NOTRE REGARD », titre serif « Le regard d'un pisciniste sur les projets d'exception. », intro, date + excerpt + « Lire l'article → ». Photos premium. **Premium, oui.** | OK | `p8-blog-index-{desktop,mobile}-{fold,grid}.png` |
| Article a1 (débordement terrain en pente) | desktop+mobile | Hero bandeau pleine largeur + titre serif overlay lisible + fil d'Ariane + date. Typo de lecture **magazine** : mesure ~75 car. (desktop) / ~38 (mobile), interlignes généreux, H2/H3 serif, lead-ins gras. Encadré GEO (bord accent gauche, fond beige, format question). AuthorBlock « L'AUTEUR / Nicolas Berg / Fondateur Aqua System… Socotec CSP/ESP-001 ». « À lire également » (2 cards). CTA final propre. Crédit photo italique + droit à l'image. | OK | `p8-a1-*.png` |
| Article a4 (investissement / prix) | desktop+mobile | Hero manoir + titre serif. Contenu expert dense (béton vs coque, génie civil, bureau d'études). **Fourchettes prix avec disclaimer explicite** « Ces fourchettes ne sont pas les tarifs d'Aqua System… sources sectorielles » (anti-invention conforme). Liens internes cross-sell. AuthorBlock + CTA « une conversation, pas un formulaire ». | OK | `p8-a4-*.png` |
| Teaser accueil | desktop+mobile | 2 ArticleCards (même composant que l'index) avant le CTA final, intro « NOTRE REGARD / Ce que trente ans de chantiers nous apprennent. » + bouton « Lire tous nos articles → ». **S'intègre, ne dépareille pas.** | OK | `p8-home-twin.png`, `p8-home-AS-LTE.png` |
| Lien footer | desktop | « Notre regard » présent dans le footer (+ confirmé dans le HTML home). | OK | `p8-footer-link.png` |

**Blog = digne d'un magazine de maison premium.** Fond éditorial réel, preuves factuelles, GEO bien intégré, zéro Lorem / placeholder / badge technique.

## 2. ALIGNEMENTS post-fix

| Page | Élément | Jugement | Capture |
|---|---|---|---|
| /piscines-bien-etre | Claims GEO « Ce qui tient dans le temps » (CAS FONDATEUR initial) | 4 claims (30+ ans / 350+ piscines 78/92 / Socotec / L'Esprit Piscine) **centrés sur axe propre**, séparateurs verticaux réguliers, chiffres et labels alignés. Paragraphe support centré équilibré. **Axe propre — défaut initial corrigé.** | `p8-pisc-1.png` |
| /jardins-paysage | TextBlock « Un projet pensé avant d'être planté » | H2 centré + eyebrow + corps centré, axe propre. | `p8-jard-0.png` |
| /la-maison | TextBlocks « Notre histoire » + timeline numérotée | Portrait + nom centrés, pull-quote serif centrée, timeline 1→5 avec filet vertical aligné. Axes propres. | `p8-lm-{0,1}.png` |

## 3. PRIMITIVES

| Cas | Jugement | Capture |
|---|---|---|
| Accueil bloc LTE (Jardins & Paysage) vs bloc AS (Piscines & Bien-être) — **LE cas fondateur** | Les deux cartes « expertise maison » ont désormais **le même arrondi** (photos top arrondies identiques, cartes cohérentes). Défaut LTE carré/AS arrondi **résolu.** | `p8-home-AS-LTE.png`, `p8-home-AS-LTE-m.png` |
| Cross-sell mobile (« Votre piscine mérite un jardin à sa mesure ») | Carte photo **4 coins arrondis** + copy cross-sell + « Voir nos créations paysagères → ». Arrondi cohérent design system. | `p8-xsell-card2.png` |

## 4. Titres d'onglet — spot-check (6 pages vérifiées dans le HTML)
Tous au séparateur **« | »**, **zéro « — »** : accueil, /notre-regard, /piscines-bien-etre, /la-maison,
/realisations, article a4. ✅

## 5. Anti-régression
- Accueil fold desktop : photo manoir+piscine, titre serif blanc lisible (contraste OK, pas de cas n°1). ✅ `p8-home-desktop-fold.png`
- Réalisations grille (24) : 3 col, cards arrondies, tags catégorie, photos premium, espacement régulier. ✅ `p8-realisations-grid.png`
- La-maison fold mobile : eyebrow double-marque, « À propos », ligne de preuve, photo piscine intérieure. ✅ `p8-lamaison-mobile-fold.png`
- Footer : proportions saines (pas 2 écrans mobiles), 2 entités + adresses + liens légaux + « Notre regard ». ✅ `p8-footer-link.png`

## Défauts Passe 8

| Page | Device | Défaut perçu | Sévérité | Capture |
|---|---|---|---|---|
| — | — | **Aucun défaut P0/P1.** Les 3 cas fondateur post-fix (claims GEO centrés, LTE arrondi cohérent avec AS, cross-sell arrondi) sont corrigés. Blog au standard magazine. Anti-régression propre. | — | — |

## Recommandation Passe 8 : **OUI — présentable au fondateur.**
Le plus gros lot (SEO/GEO + blog neuf complet + fixes) passe sans réserve. Le blog hisse la perception
de marque au niveau « maison premium » visé. Ne plus retoucher le périmètre jugé.
Captures : `tests/screenshots/perception/p8-*.png`.

---

## Passe 9 (2026-06-12) — GATE-P9

Périmètre : 7 surfaces modifiées par 4 lots depuis la passe 8 (OUI). Captures viewport réel
375 (iPhone) + 1280 (desktop), folds + sections. Jugement perception, specs non lues d'abord.

### Constats par surface

**1. /jardins-paysage — slot « Création » (MediaSplit) + section « vivant »**
- Hero mobile INCHANGÉ (D-37) : titre « Jardins & Paysage » et sous-titre lisibles sur la photo, OK.
- Slot Création : eyebrow « CRÉATION » + titre « La réalisation, du premier arbre à la dernière
  pierre », photo à droite d'un massif exotique (palmiers, agaves, escalier en pierre). Vraie photo
  de jardin, bien exposée, au niveau premium. Cohérente avec le propos « pierre + végétal ».
- Section « vivant » (4 réalités) : les slots photo sont passés de placeholder à de vraies images
  (palmier/agaves, rudbeckias jaunes, feuillages pourpres, pépinière). Castings crédibles, pas de
  visuel hors-niveau. Lisibilité des textes sur fond clair OK en 375 et 1280.
- **Aucun défaut.** Premium.

**2. /notre-regard — filtre catégories + eyebrow card + dates échelonnées**
- Filtre : chips « Tous 6 / Types de piscine 3 / Eau & jardin 1 / Investissement & projet 2 ».
  Chip actif en teal de marque, autres en pilules claires avec badge compteur. Propre, premium,
  lisible en mobile (chips passent sur 2 lignes sans casse).
- Cards : eyebrow catégorie (« TYPES DE PISCINE », « INVESTISSEMENT & PROJET ») + date sur une
  même ligne discrète. Ex. lu net : « TYPES DE PISCINE · 28 mai 2026 ».
- Dates : échelonnées, aucune date future visible (plus récente lue = 12 juin 2026 = aujourd'hui,
  donc dans la borne). Le défaut « dates futures » de passes antérieures est corrigé.
- **Aucun défaut.**

**3. Article (/notre-regard/renovation-piscine-haut-de-gamme/) — catégorie linkée près de la date**
- Méta sous le titre : « INVESTISSEMENT & PROJET · Publié le 12 juin 2026 », la catégorie est un
  lien-chip discret accolé à la date. Back-link « ← Tous nos articles » sobre. Titre éditorial fort.
- Lisibilité corps sur fond clair OK (375 + 1280). **Aucun défaut.**

**4. Footer — badge LOGO blanc « l'esprit piscine » cliquable**
- Sur fond sombre, le logotype inversé blanc « l'esprit piscine » est lisible et reconnaissable,
  posé à côté de la pilule « Certifié Socotec CSP/ESP-001 ». Rend bien en blanc sur sombre, à sa
  place, lisible en desktop ET mobile.
- Réserve cosmétique mineure (P1, non bloquante) : léger écart de traitement entre les deux
  badges — la certif est une pilule bordée, le logo esprit-piscine est posé sans cadre. Cohabitation
  acceptable au standard premium ; à harmoniser un jour si l'occasion se présente, pas un blocage.
- Proportions footer mobile : footer long mais NORMAL, n'occupe pas 2 écrans absurdes. OK.

**5. /la-maison — mention « réseau L'Esprit Piscine » devenue lien souligné**
- Dans la colonne « Aqua System » du bloc certifications, « L'Esprit Piscine » porte un soulignement
  fin, dans la couleur du texte, discret et premium (pas de bleu lien, pas d'épaisseur criarde).
  Lecture inline naturelle. **Aucun défaut.**

**6. / (accueil) bloc Aqua System + /piscines-bien-etre spa**
- Accueil : bande de preuves (30+ / 350+ / Socotec / L'Esprit Piscine) + paragraphe claims propre
  (déjà au niveau en passe 8, anti-régression OK).
- /piscines-bien-etre : cartes typologie « Piscine intérieure » (béton brut, puits de lumière),
  « Fond mobile », « Paroi de verre », « Couloir de nage » — photos réelles, bien exposées, premium.
- **Aucun défaut.**

**7. /realisations — grille 25 cards + fiche /realisations/jardin-terrasses-plongee/**
- Grille : rangées homogènes, labels cohérents (« PISCINE SUR MESURE / Ouest parisien »,
  « PROJET COMPLET EAU + JARDIN »). Aucun placeholder, aucun badge « en cours de documentation »,
  aucun trou. La 25e fiche s'insère sans casser le rythme.
- Fiche jardin-terrasses-plongee : photo aérienne forte (terrasses étagées, escaliers pierre,
  couloir de nage à l'eau sombre, deck bois), eyebrow « PROJET COMPLET EAU + JARDIN », caption
  « Réalisation Aqua System, Ouest parisien. Photo publiée avec l'autorisation du propriétaire ».
  Lisibilité corps OK (375 + 1280). Au niveau premium. **Aucun défaut.**

### Croisement specs (parti pris vs défaut)
- Hero /jardins-paysage inchangé = parti pris assumé documenté (D-37) ; rendu lisible → conforme,
  pas un défaut.
- Écart de traitement des deux badges footer : non documenté mais purement cosmétique et mineur →
  P1 non bloquant, signalé à @design pour harmonisation ultérieure.

### Verdict Passe 9 : **PRÉSENTABLE AU FONDATEUR : OUI**
Zéro P0 sur les 7 surfaces. Les 6 cas canoniques (hero illisible, tic cadratins, favicon, photos
hors-niveau, badges d'inachevé, footer 2 écrans) seraient tous attrapés et sont absents ici.
Les 4 lots depuis la passe 8 améliorent la perception (vraies photos jardin, filtre blog premium,
dates assainies, logo réseau propre, lien souligné discret) sans régression.

**Correctifs bloquants : aucun.**
P1 cosmétique non bloquant (à traiter quand l'occasion se présente, n'empêche PAS la présentation) :
- Footer : harmoniser le traitement visuel des deux badges (pilule Socotec bordée vs logo
  esprit-piscine sans cadre). → @design.

Captures : `tests/screenshots/perception/p9-*.png`.

---

**Handoff → @orchestrator**
- Verdict : PRÉSENTABLE OUI
- P0 : aucun. P1 cosmétique non bloquant : harmonisation badges footer (@design).
- Captures : `tests/screenshots/perception/p9-*.png`

---

## Passe 10 (2026-06-12) — GATE-P10

**Lots jugés** : D-40 (heros haute résolution 1920px + photo entretien), D-41/D-42 (FAQ jardins + FAQ articles + maillage fiches/services). Build prod `/out/`. Méthode protocole : captures viewport réel 375 + 1280, fold + zooms piqué, LU avant lecture specs. Captures `tests/screenshots/perception/p10-*`.

### Constats par surface

**1. / (accueil) — hero demeure ancienne servi en 1920px — NETTETÉ**
Desktop 1280 (`p10-accueil-desktop-fold` + zoom serré `p10-accueil-desktop-zoom`) et mobile 375 (`p10-accueil-mobile-fold`). Le piqué est FRANC : pierre, encadrements de fenêtres, feuillage et margelle nets au zoom 1:1, aucun flou perçu. Le défaut fondateur « photos floues » est levé sur ce hero. H1 « L'extérieur à la hauteur de votre propriété. » lisible (texte clair sur la masse sombre de la façade/bassin), sous-titre lisible. **OK.**

**2. /piscines-bien-etre — hero ENTIÈREMENT NOUVEAU (Spa Corniche)**
Desktop 1280 (`p10-piscines-desktop-fold` + zoom) + mobile 375 (`p10-piscines-mobile-fold`). Bassin intérieur d'ambiance, transats, suspensions noires : **premium, net, registre vitrine tenu.** H1 « Piscines & Bien-être » lisible sur la zone sombre du bassin, sous-titre lisible (desktop ET mobile). Cohérent avec l'intitulé de page. Le remplacement du couloir pierre-poutres est une montée en gamme nette. **OK** — sous réserve P1 nom de marque ci-dessous.

**3. /jardins-paysage**
- Hero nouveau cadrage maison-bois 16:9 (`p10-jardins-desktop-fold` + zoom, `p10-jardins-mobile-fold`) : **net, premium**, plein format propre, H1 « Jardins & Paysage » + sous-titre lisibles sur l'overlay sombre bas (desktop + mobile). **OK.**
- Section « Ce que le vivant impose » / « La réalisation, du premier arbre… » — 4 slots photos (`p10-jardins-vivant`, `p10-jardins-entretien`) : la **nouvelle photo « L'entretien au bon moment »** (transats alignés, pelouse tondue ras, soutènement traverses bois, bassin) est **nette et au niveau maison premium**. Pépinière, essences, terrasses étagées : toutes nettes, castées juste. **OK.**
- Nouvelle section « Questions fréquentes » (`p10-jardins-faq2`) : titre serif, accordéon sobre, chevrons accent forest discrets, questions au registre client haut de gamme, placée avant le cross-sell. **Registre premium tenu. OK.**

**4. Article /notre-regard/fond-mobile-terrasse-piscine/ — bloc « Questions fréquentes » fin d'article**
`p10-article-faq2` : intégré après l'encart auteur Nicolas Berg, même typographie de lecture, accordéon identique, aucune rupture de registre. **OK.**

**5. /piscines-bien-etre cards « ouvrages » (Ce que nous savons construire)**
`p10-piscines-ouvrages` + hover `p10-piscines-ouvrages-hover` : 3 des 6 cards (Piscine intérieure, Fond mobile, Paroi de verre) portent un lien « Voir cette réalisation → » discret, en bas du corps de card, style accent muté. **Discret et propre. OK.**

**6. Fiche /realisations/piscine-fond-mobile-terrasse/ — lien « Notre savoir-faire »**
`p10-fiche-savoirfaire3` : eyebrow « NOTRE SAVOIR-FAIRE » + lien « Piscines & Bien-être » placé après le corps descriptif, avant le CTA de clôture. **À sa place, sobre. OK.**

### Croisement specs (parti pris assumé vs vrai défaut)

**P1 — Nom de marque : cohabitation « Aquasystem » (header) / « Aqua System » (sous-titre hero piscines).**
Sur le NOUVEAU fold piscines, le wordmark header « Aquasystem » (un mot) et la 1re ligne du sous-titre « Notre maison Aqua System » (deux mots) coexistent à ~50 px. Vérif specs : `project-context.md` documente « Aquasystem » comme wordmark ombrelle PROVISOIRE, tandis que l'entité légale est « SARL AQUA SYSTEM » (JSON-LD `legalName`/`name` = « Aqua System ») — la cohabitation est donc un **parti pris documenté**, déjà présent en passe 9 (corps jardins/fiches) et validé. **Ce n'est PAS une invention ni une régression de fond.** MAIS c'est la 1re fois que les deux graphies se télescopent dans un même FOLD vitrine (hero piscines neuf). Un client premium pressé peut le percevoir comme une hésitation. **Non bloquant** (convention intentionnelle), signalé en P1 cosmétique → @copywriter : envisager de retirer « Aqua System » de cette ligne de hero (« Notre maison conçoit sur mesure depuis plus de 30 ans… ») pour éviter le télescopage header/sous-titre, en attendant la bascule naming finale.

Aucun autre écart : aucun flou, aucun badge d'inachevé, aucun placeholder, aucune proportion absurde, footer non recapturé (inchangé, validé passe 8/9). Favicon inchangé (validé passe antérieures).

### Verdict

## PRÉSENTABLE AU FONDATEUR : **OUI**

Zéro P0. Les 6 surfaces livrées sont au standard maison premium : heros nets (défaut « photos floues » levé), nouveau hero piscines premium et lisible, nouvelle photo entretien au niveau, FAQ et maillage intégrés sans rupture de registre. Seule réserve : 1 P1 cosmétique non bloquant (télescopage Aquasystem/Aqua System dans le fold piscines) — parti pris documenté, à arbitrer @copywriter.

**Recommandation** : OUI, déployable. Relance par défaut → @copywriter (P1 nom de marque hero piscines, à traiter au fil de l'eau, sans bloquer le déploiement).
