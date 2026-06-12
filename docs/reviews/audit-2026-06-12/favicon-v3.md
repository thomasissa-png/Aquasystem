# Favicon v3 — Monogramme premium « Rive privée »

**Date** : 2026-06-12 · **Agent** : @fullstack · **Déclencheur** : retour fondateur « pas très haut de gamme » sur la v2 (A géométrique brun, polygones nus — fix de lisibilité, pas un travail de marque).

## Objectif

Passer d'un correctif de lisibilité à un **monogramme de marque**. Standard de référence : pastilles d'onglet des maisons de luxe / cabinets d'architectes — **monogramme sur tuile de fond arrondie**. La tuile résout deux problèmes d'un coup : présence premium ET P1 dark-mode (un glyphe sombre disparaît sur barre d'onglet sombre ; une tuile colorée reste visible partout).

## Contraintes appliquées

- DA « Rive privée » : sand `#F5F0E8`, brun `#1A1510`, eau `#3A6675`, or discret `#C4924A`.
- Typo de marque DM Serif Display → « A » serif Didone réel (contraste plein/délié, empattements en dalle, apex pointu), pas une approximation polygonale.
- Lisible à **16px** ET visible sur barres d'onglets **claire et sombre**.
- « A » **substituable** si le naming final change : tracé isolé (`#glyphA`), construction par lettre remplaçable.
- Périmètre strict : `public/` (assets), `scripts/build-favicons.mjs`, `docs/`. Aucune modification de `src/` ni des baselines de pages.

## Les 3 options (SVG réels)

Sources : `favicon-v3-option-{a,b,c}.svg`. Comparatif rendu : `favicon-v3-composite.png` (chaque option en 16/32/48 sur barre claire | barre sombre).

| Opt | Construction | Forces | Faiblesses |
|-----|--------------|--------|------------|
| **(a)** | « A » serif brun sur tuile **sand** arrondie + filet or | Serif élégant à 32/48 ; classique | **Faible sur onglet clair** : la tuile sand se fond dans la barre claire (#E8E6E1) → présence molle, ne résout pas vraiment le contraste |
| **(b)** | Médaillon : « A » sand dans cercle finement filé or sur fond **brun** | Effet sceau / crest très « maison de luxe » ; tuile brune visible partout | À 16px, l'anneau or **encombre** le « A » → compteur et barre du A se brouillent ; lisibilité dégradée à petite taille |
| **(c)** | « A » sand **inversé** sur tuile **eau** arrondie + filet or | Meilleur contraste sur les deux barres ; « A » net dès 16px ; **distinctif** (eau = ADN piscine, ownable) ; meilleure tenue dark ; filet or = accent premium discret | Filet or quasi imperceptible à 16px (volontairement discret) |

Close-up de finesse du tracé (16/24/32 sur sand, eau, brun) : `favicon-v3-closeup.png`.

## Itération sur le glyphe

Le tracé « A » a été affiné en v2 avant décision (exigence du brief) : apex rendu plus pointu, **barre transversale remontée** pour ouvrir le compteur à 16px, empattements convertis en **dalles bracketées fines** (au lieu de rectangles blocs), jambage droit plein / gauche délié pour le contraste Didone. Résultat visible au close-up : le « A » reste lisible et élégant jusqu'à 16px sur les trois fonds.

## Choix retenu : **Option (c)**

Justification sur les 4 critères imposés :

1. **Lisibilité 16px** — la meilleure : sand sur eau offre le contraste le plus franc à petite taille (cf. `favicon-v3-final-check.png`, assets de prod réels).
2. **Élégance** — serif Didone soigné + filet or = signal premium sans surcharge.
3. **Distinctivité** — l'eau est l'élément le plus ownable de la marque (extérieur / bassin) ; aucune autre maison du secteur local ne possède cette pastille.
4. **Tenue dark** — la tuile eau a une présence **identique** sur barre claire et sombre → **P1 dark-mode résolu**.

(b) écartée malgré son cachet « sceau » : perte de lisibilité du « A » à 16px (anneau encombrant). (a) écartée : tuile sand invisible sur onglet clair = le problème de contraste persiste.

## Vérification finale (assets de production)

`favicon-v3-final-check.png` — rendus des PNG réellement générés (`public/favicon-16x16.png`, `-32`, `apple-touch-icon` @48) sur barre claire (ligne 1) et sombre (ligne 2) :
- 16px : « A » lisible, tuile + filet or présents sur les deux barres.
- 32px : serif net, filet or lisible.
- apple 48 : tuile bord-à-bord, sans filet (iOS masque/re-arrondit les bords → le filet serait rogné).

`npm run build` (output: 'export') **PASS** : 30/30 pages, assets v3 copiés dans `out/` (md5 `out/` == `public/` vérifié). NB : 2 runs intermédiaires ont échoué en phase post-compilation (collecte de traces `.nft.json` / page-data `robots.txt`) — flakiness sandbox non déterministe, sans rapport avec un changement `public/`-only ; run propre confirmé OK.

## Implémentation livrée

- `public/favicon.svg` — monogramme v3 tuilé (tracé `#glyphA` substituable). Pas de media-query dark : la tuile eau est visible dans les deux modes.
- `scripts/build-favicons.mjs` — réécrit : géométrie tuilée paramétrée (`rxFrac`, `pad`, `filet`, `safe`). Régénère les 6 dérivés + OG (médaillon tuilé sur fond brun).
- `public/` dérivés régénérés : favicon-16/32, android-chrome-192/512, apple-touch-icon, favicon.ico, og-image.jpg.
- `public/site.webmanifest` — `theme_color`/`background_color` restent sand `#F5F0E8` (cohérents avec le thème clair du site et `viewport.themeColor` du layout : la couleur de chrome navigateur ≠ couleur d'icône, sand correct). Inchangé.

## Cohérence theme colors

| Source | Light | Dark | Rôle |
|--------|-------|------|------|
| `layout.tsx` viewport.themeColor | `#F5F0E8` | `#1A1510` | chrome navigateur |
| `site.webmanifest` theme/background | `#F5F0E8` | — | splash PWA |
| Tuile favicon | `#3A6675` (eau) | `#3A6675` | icône (constante = visible partout) |

Cohérent : la tuile eau est un choix d'**icône** assumé distinct du chrome (sand), conforme aux pastilles de maisons premium où le monogramme tranche sur la barre.
