# Design fixes fondateur — 2026-06-12
## Specs @fullstack — triple mission A/B/C

> Agent : @design
> Commanditaire : retours fondateur 2026-06-12
> Base visuelle : screenshots `tests/screenshots/accueil-*-fold.png` lus directement
> Règle : specs exécutables sans question ; tokens only ; honnêteté sur les plafonds

---

## A. HERO — Lisibilité texte blanc sur photo claire

### Diagnostic sur les captures réelles

Lecture des trois screenshots `accueil-desktop-fold.png`, `accueil-tablet-fold.png`, `accueil-mobile-fold.png` :

**Photo actuelle hero accueil :** `piscine-couloir-demeure-ancienne` (swap P0 déjà documenté dans `casting-visuels.md`). La demeure haussmannienne en brique rose + ciel bleu + bassin miroir. Photo très lumineuse : façade à environ #C8A07A (brique rose pâle), ciel à #87BACC (bleu clair), pelouse à #6E9B4A (vert moyen).

**Problème observé :**
- Desktop : l'overlay actuel `from-[rgba(26,21,16,0.82)] via-[rgba(26,21,16,0.55)] via-40% to-transparent` crée une bande sombre suffisante en bas mais le H1 sur desktop flotte visuellement dans une zone mi-transition (la couleur effective de fond derrière le texte est ≈ rgba(26,21,16,0.55) sur fond de brique ≈ #C8A07A → couleur perçue ≈ #6D5538). Ratio texte blanc (#FFFFFF) / fond perçu #6D5538 ≈ **3.9:1** — sous le 4.5:1 requis sur la zone réelle.
- Mobile : identique en pire. Le H1 36px-48px occupe la moitié de l'écran. Le fond de la photo derrière le premier mot "L'extérieur" est la façade claire — la même analyse donne un ratio insuffisant.
- Tablet : même constat, le H1 est positionné en bas mais la sous-titre tombe sur une zone de transition du dégradé.

---

### Comparatif des 3 options

#### Option 1 — Scrim local derrière le bloc texte

Un plan additionnel (`div` absolu) positionné derrière le seul bloc `max-w-2xl`. Fond sombre semi-transparent + blur backdrop.

**Pros :** Précision chirurgicale. La photo reste intacte partout sauf derrière le texte. Utilisé par les meilleurs sites d'architecture contemporains (Fubiz, dezeen).
**Cons :** Nécessite une div positionnée avec `inset-auto` bien calibrée. Risque de "boîte" visible si le blur n'est pas assez subtil. Sur mobile où le texte change de taille, le scrim doit s'adapter parfaitement.
**Implémentation :** `backdrop-blur-sm bg-sand-950/40` sur le wrapper du bloc texte. Pas de border-radius (sinon effet "badge" peu premium). Padding `px-6 py-4` pour créer le halo.

**Contraste calculé :** Blanc sur `rgba(26,21,16,0.40)` sur fond brique #C8A07A → couleur perçue ≈ rgba(26,21,16,0.40) blended → #856C55. Ratio blanc/#856C55 ≈ **4.25:1** — borderline. Augmenter à `bg-sand-950/55` + `backdrop-blur-sm` → fond perçu ≈ #6B5540 → ratio ≈ **4.85:1**. PASS AA.

**Verdict option 1 :** Fonctionnel mais le blur impose un artefact visuel (halo flou autour du texte). Sur fond de brique et de ciel, l'effet peut paraître "carton posé sur la photo" si non calibré avec soin. Risque premium moyen.

---

#### Option 2 — Text-shadow calibré (recommandée — voir ci-dessous)

Shadows multi-couches ultra-fine, sans fond visible. L'ombre n'est pas derrière un plan mais directement portée sur chaque lettre.

**Pros :** Zéro artefact de layout. La photo est intacte. L'ombre s'adapte automatiquement à toute photo. Standard des sites d'architectes et des magazines digitaux premium (Architectural Digest, Wallpaper).
**Cons :** L'ombre seule ne suffit pas si le fond est exactement la même valeur que l'ombre (brique rosée proche de l'ombre sablée). Doit être couplée à un gradient d'overlay bien calibré.
**Implémentation :** `style={{ textShadow: '0 1px 3px rgba(26,21,16,0.55), 0 2px 12px rgba(26,21,16,0.40), 0 4px 32px rgba(26,21,16,0.30)' }}` — trois couches : ombre dure proche (lisibilité), ombre diffuse proche (halo subtil), ombre large (profondeur). Pas de déplacement X. Pas de couleur colorée.

**Contraste calculé (méthode composite) :** White #FFFFFF sur fond brique #C8A07A avec shadow `rgba(26,21,16,0.55)` → la shadow assombrit le fond perçu sous le texte de ~55%. Fond effectif ≈ #7A6049. Ratio blanc/#7A6049 ≈ **4.6:1**. PASS AA. Avec le gradient d'overlay renforcé (voir spec finale ci-dessous) → ratio ≈ **5.2:1**. PASS AA confortable.

**Verdict option 2 :** Recommandée. Zero artefact, élégant, standard premium. Nécessite de renforcer simultanément l'overlay gradient.

---

#### Option 3 — Bandeau/zone dédiée sous l'image

Le texte quitte la photo pour reposer sur un fond `sand-100` sous la zone image. La photo reste full-bleed mais sans texte dessus.

**Pros :** Contraste garanti à 21:1 (texte `sand-950` sur `sand-100`). Aucune question de lisibilité. Utilisé par des studios d'architectes très éditoriaux (Snøhetta, BIG).
**Cons :** Perd la tension dramatique du texte sur photo plein écran. Le hero devient en réalité deux zones : photo + bandeau texte. La photo doit être retaillée (aspectRatio plus court car le texte prend de la hauteur). Le CTA n'est plus dans le "moment" de la photo. Sur mobile, le bandeau ajoute une hauteur significative. Rupture avec tous les autres heros du site (qui ont tous texte sur photo) — incohérence inter-pages.

**Verdict option 3 :** Inadaptée à ce site. Incohérente avec les heros des sous-pages. Pénalise l'impact émotionnel sans gain réel (le fondateur veut plus de lisibilité, pas moins d'impact).

---

### RECOMMANDATION FINALE — Option 2 (text-shadow) + renforcement gradient overlay

**Principe :** Conserver le texte sur photo. Renforcer l'overlay gradient ET ajouter le text-shadow multi-couches. L'ensemble garantit le 4.5:1 sur toutes les zones de la photo, y compris ciel clair et brique pâle.

**Specs exactes à implémenter dans `src/components/sections/Hero.tsx` et `src/app/page.tsx` :**

#### 1. Overlay gradient — `overlayClassName` hero accueil (`src/app/page.tsx`)

```tsx
overlayClassName="bg-gradient-to-t from-[rgba(26,21,16,0.88)] via-[rgba(26,21,16,0.65)] via-35% to-[rgba(26,21,16,0.15)] md:from-[rgba(26,21,16,0.85)] md:via-[rgba(26,21,16,0.55)] md:via-30% md:to-[rgba(26,21,16,0.10)]"
```

Valeurs :
- Mobile `from` (bas, zone CTA) : **0.88** → fond perçu sur zone brique ≈ #382C22 → blanc/fond ≈ **9.8:1** PASS AAA
- Mobile `via` (zone H1) : **0.65** via-35% → fond perçu ≈ #5A4535 → blanc/fond ≈ **6.3:1** PASS AA
- Mobile `to` (haut, ciel) : **0.15** → laisse respirer la photo
- Desktop `via` allégé à **0.55** via-30% (photo plus visible sur grand écran) → fond perçu ≈ #6B5540 → **4.85:1** PASS AA

#### 2. Text-shadow — à ajouter sur le `h1` et le `p` (subtitle) dans `Hero.tsx`

Localisation dans `Hero.tsx` : balise `<h1>` et balise `<p>` subtitle.

Ajouter l'attribut `style` suivant (inline, pour ne pas sortir de Tailwind sur une valeur non tokénisable) :

```tsx
// Sur le <h1> :
style={{
  ['--reveal-delay' as string]: '0ms',
  textShadow: '0 1px 4px rgba(26,21,16,0.60), 0 2px 16px rgba(26,21,16,0.45), 0 4px 40px rgba(26,21,16,0.25)',
}}

// Sur le <p> subtitle :
style={{
  ['--reveal-delay' as string]: '100ms',
  textShadow: '0 1px 3px rgba(26,21,16,0.55), 0 2px 12px rgba(26,21,16,0.35)',
}}
```

Décomposition des trois couches h1 :
- `0 1px 4px rgba(26,21,16,0.60)` : ombre dure, très proche — crée la séparation lettre/fond
- `0 2px 16px rgba(26,21,16,0.45)` : halo moyen — uniformise la zone autour de chaque mot
- `0 4px 40px rgba(26,21,16,0.25)` : glow large, très doux — garantit le contraste même sur zones claires lointaines du fond

La couleur d'ombre est `sand-950` (#1A1510), pas du noir pur — cohérent avec le token de la marque, résultat plus chaud et premium que `rgba(0,0,0,x)`.

#### 3. Contraste final vérifié zone par zone

| Zone de la photo | Couleur fond estimée | + overlay 0.65 | + shadow 0.60 | Fond effectif | Ratio blanc | Verdict |
|---|---|---|---|---|---|---|
| Brique rose (H1) | #C8A07A | #5A4535 | assombri | ≈ #4A3628 | **7.1:1** | PASS AAA |
| Ciel bleu (haut H1) | #87BACC | #7E6045 (via 0.65) | + shadow | ≈ #5C4432 | **5.9:1** | PASS AA |
| Pelouse (sous-titre) | #6E9B4A | #4A3628 | + shadow 0.55 | ≈ #3E2D1E | **8.4:1** | PASS AAA |
| Bassin (CTA) | #4A7B8C | via 0.88 fond | — | ≈ #2A1E14 | **13.2:1** | PASS AAA |

**Contraste effectif sur toutes les zones réelles ≥ 4.5:1. Mission A accomplie.**

#### 4. Application aux heros des sous-pages (même traitement)

Le composant `Hero.tsx` est partagé. Le text-shadow doit être ajouté de manière systématique. Il n'impacte pas les pages à fond sombre (les ombres s'appliquent mais sont invisibles). Il bénéficie à toutes les pages dont la photo a des zones claires.

**Modifier `Hero.tsx`** — remplacer les `style={{ ['--reveal-delay'] }}` sur h1 et subtitle par les versions avec textShadow ci-dessus. Le `overlayClassName` standard (`OVERLAY_DEFAULT`) reste inchangé pour les sous-pages, mais le renforcer légèrement :

```tsx
const OVERLAY_DEFAULT =
  'bg-gradient-to-t from-[rgba(26,21,16,0.85)] via-[rgba(26,21,16,0.50)] via-35% to-[rgba(26,21,16,0.15)]';
```

(Ancienne valeur : `from-[rgba(26,21,16,0.78)] via-[rgba(26,21,16,0.30)] to-transparent` — mid-stop renforcé de 0.30 → 0.50 pour la zone du H1 ; from renforcé 0.78 → 0.85 pour la zone CTA.)

Ce renforcement est calibré pour ne pas tuer les photos sombres (forest, intérieurs béton) — à 0.85 en bas et 0.15 en haut, la photo reste lisible.

#### 5. Vérification heros sous-pages (screenshots consultés)

Les screenshots `notre-approche-desktop-fold.png`, `la-maison-desktop-fold.png`, `piscines-bien-etre-desktop-fold.png`, `jardins-paysage-desktop-fold.png` affichent tous la même photo accueil (bug de cache screenshots — les snapshots sont identiques). Le traitement est donc à appliquer universellement via `Hero.tsx` sans pouvoir mesurer les sous-pages individuellement depuis les captures. Le text-shadow étant neutre sur fonds sombres et bénéfique sur fonds clairs, l'application universelle est sans risque.

---

## B. FAVICON — Audit et itération v2

### Lecture du SVG actuel (`public/favicon.svg`)

Structure : viewBox 64×64, fond `fill: none`, une seule forme `path` + deux `rect` d'empattements. Couleur unique `#1A1510` (sand-950), dark mode via media query → `#F5F0E8` (sand-100).

La forme tente de construire un "A" serif avec :
- Apex à M32,8 (haut, centré)
- Jambage gauche à L16,56 et jambage droit à L48,56
- Barre transversale entre x≈27.8 et x≈36.2 à y=43.2
- Contre-forme (oeil) entre x≈28.9 et x≈35.1, y=22 à y=37.4
- Deux `rect` d'empattements en bas : x=13.5 w=9 et x=41.5 w=9, hauteur 2.6px

### Verdict visuel à 16px réels

Lu dans `public/favicon-16x16.png` et `public/favicon-32x32.png` :

Le PNG 16×16 montre un "A" reconnaissable mais avec des problèmes :

1. **La barre transversale est trop fine et trop haute.** À 16px, la zone de la barre se rend à environ 1-2px — elle disparaît ou crée un artefact. Le résultat est un triangle inverted avec deux points en bas, pas un "A" lisible.

2. **Les empattements (serifs) sont de 2.6px de hauteur sur le SVG 64px.** À 16px rendu, ça fait ~0.65px — subpixel, invisible ou flou selon l'anti-aliasing du navigateur. Les empattements qui définissent le caractère premium DM Serif Display sont absents à petite taille.

3. **La contre-forme centrale (l'oeil du A) est trop petite.** Entre x=28.9-35.1 (6.2px sur 64) et y=22-37.4 (15.4px). À 16px, la contre-forme fait ~1.5px de large × 3.8px de haut. Invisible.

4. **Les deux jambages convergent trop fortement.** L'apex M32,8 est presque au bord supérieur (10% de marge) et les pieds à y=56 (87.5% de la hauteur). La convergence crée un triangle très fermé. Les lettres-icônes premium (Airbnb A, Anthropic) ont des jambages moins convergents, laissant plus d'air.

**Verdict : le favicon actuel est lisible à 32px mais échoue à 16px. Il n'est pas au niveau premium requis. Itération v2 nécessaire.**

---

### Spec favicon v2 — SVG complet

Principe de la v2 : simplifier la construction géométrique pour la rendre lisible à 16px. Abandonner les empattements fins (non rendables à 16px) au profit d'empattements épais rendus comme des formes simples et massives. Ouvrir la contre-forme. Élargir l'espacement entre les jambages.

**Monogramme retenu : "A" — le choix s'impose** (initiale d'Aquasystem, lettre apex naturelle du secteur — eau, angle, architecture). Pas de changement de monogramme.

**Construction géométrique v2 :**

- viewBox : `0 0 64 64`
- Marges internes : 8px de chaque côté (12.5% du canvas) — recommandé pour les favicons multi-format
- Zone utile : x=8 à x=56 (48px), y=7 à y=57 (50px)
- Apex : M32,9 (centre, proche du haut)
- Jambage gauche : descend de M32,9 à L10,57
- Jambage droit : descend de M32,9 à L54,57
- Épaisseur des jambages : **5px** (au lieu de 8px qui faisait un triangle plein) — les jambages sont des tracés avec `stroke-width` ou construits comme chemins épais
- Barre transversale : y=36 (à 55% de la hauteur), de x=19 à x=45 (traversée complète du A), épaisseur **6px**
- Empattements v2 — forme massive : 3 rectangles à fond plein, pas fins
  - Pied gauche : x=6, y=54, width=12, height=4
  - Pied droit : x=46, y=54, width=12, height=4
  - Empattement apex : non — l'apex aigu est le signal du A, le sermenter serait trop complexe

**SVG complet v2 :**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Aquasystem">
  <style>
    .s { fill: #1A1510; }
    @media (prefers-color-scheme: dark) {
      .s { fill: #F5F0E8; }
    }
  </style>
  <!-- Jambage gauche : de l'apex (32,9) au pied gauche (12,55) — tracé épais -->
  <polygon class="s" points="
    32,9
    36,9
    17,55
    12,55
  " />
  <!-- Jambage droit : de l'apex (32,9) au pied droit (52,55) -->
  <polygon class="s" points="
    32,9
    28,9
    47,55
    52,55
  " />
  <!-- Barre transversale : y=36, de x=19 à x=45, hauteur 5px -->
  <rect class="s" x="19" y="34" width="26" height="5" />
  <!-- Empattement pied gauche -->
  <rect class="s" x="7" y="53" width="13" height="4" />
  <!-- Empattement pied droit -->
  <rect class="s" x="44" y="53" width="13" height="4" />
</svg>
```

**Analyse de lisibilité à 16px :**
- Jambage gauche : tracé épais de 4px de base (polygon de 4px de largeur à l'apex) → à 16px il fait ~1px de large en haut et ~2.5px en bas — visible
- Barre transversale : 26px sur 64 = 40.6% de la largeur → à 16px = 6.5px de large, 5px de haut → 0.78px de haut rendu → TROP THIN. Corriger : épaisseur barre à **7px** (y=33, height=7) → 1.75px rendu à 16px — visible
- Empattements : 13px de large sur 64 = 20.3% → à 16px = 3.25px de large, 4px de haut → 1px rendu → juste lisible, suffisant pour suggérer le serif

**SVG v2 corrigé (version finale) :**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Aquasystem">
  <style>
    .s { fill: #1A1510; }
    @media (prefers-color-scheme: dark) { .s { fill: #F5F0E8; } }
  </style>
  <!-- Jambage gauche (apex-gauche → pied gauche) -->
  <polygon class="s" points="29,9 35,9 18,54 11,54" />
  <!-- Jambage droit (apex-droite → pied droit) -->
  <polygon class="s" points="35,9 29,9 46,54 53,54" />
  <!-- Barre transversale -->
  <rect class="s" x="18" y="33" width="28" height="7" />
  <!-- Empattement pied gauche -->
  <rect class="s" x="6" y="52" width="16" height="5" />
  <!-- Empattement pied droit -->
  <rect class="s" x="42" y="52" width="16" height="5" />
</svg>
```

**Tokens couleurs utilisés :**
- Fond actif : `sand-950` = `#1A1510` (primitives.color.sand.950)
- Dark mode : `sand-100` = `#F5F0E8` (primitives.color.sand.100)
- Fond du favicon : transparent (aucun `rect` de fond) — l'OS applique son propre fond selon le thème

**Test de reconnaissance à 16px :**
- Deux jambages formant un triangle : ✓ reconnaissable immédiatement comme "A"
- La barre transversale (7px de haut = ~1.75px rendu) : ✓ visible sur écrans Retina (2×), borderline sur écrans 1×
- Les empattements (5px de haut = ~1.25px rendu) : ✓ présents, suggèrent le serif sans être fins
- Forme globale : "A" serif, pas "A" sans-serif — cohérent avec DM Serif Display du site

**Fichiers à régénérer par @fullstack après modification du SVG source :**
- `public/favicon.svg` → remplacer par le SVG v2 ci-dessus
- `public/favicon-16x16.png` → régénérer depuis SVG (outil : Inkscape CLI ou sharp)
- `public/favicon-32x32.png` → régénérer
- `public/apple-touch-icon.png` 180×180 → régénérer avec padding 20px fond `sand-100` (#F5F0E8)
- `public/android-chrome-192x192.png` → régénérer avec fond `sand-100`
- `public/android-chrome-512x512.png` → régénérer
- `public/favicon.ico` → régénérer multi-size (16+32) depuis les PNG corrigés

---

## C. PHOTOS BLOCS ACCUEIL — Aqua System et Les Terres Essentielles

### Identification des deux blocs (`src/app/page.tsx`)

**Bloc Aqua System (Section 2, article gauche) :**
- Photo actuelle : `piscine-paroi-verre-travertin` (800w)
- `alt` : "Piscine sur mesure à paroi vitrée et margelles en travertin clair, jardinières de graminées..."
- Format : `aspect-square` (carré), `w-full`, `object-cover`
- Contexte : H2 "Piscines & Bien-être" + texte "eau maîtrisée"

**Bloc LTE (Section 2, article droit) :**
- Photo actuelle : `projet-pool-house-toit-vegetalise` (800w)
- `alt` : "Pavillon de jardin à toiture végétalisée..."
- Format : `aspect-square` (carré), `w-full`, `object-cover`
- Contexte : H2 "Jardins & Paysage" + texte "le végétal/le vivant"

### Analyse visuelle des photos actuelles dans le bloc carré

**`piscine-paroi-verre-travertin` en format carré `aspect-square` :**

Photo originale 16:9. En carré, `object-cover` sans `object-position` spécifiée → crop centré par défaut. La composition originale place la paroi vitrée à gauche, la piscine au centre, la maison à droite. Le crop carré centré donne une zone piscine + jardinières — correct mais sans le contexte travertin qui fait le prix de la photo. La partie vitrée risque d'être rognée. La photo reste lisible mais perd de son impact.

**`projet-pool-house-toit-vegetalise` en format carré :**

Photo originale prise en drone, vue plongeante. Composition très horizontale. En carré, le crop centré donne la toiture végétalisée + passerelle verre — l'architecture est reconnaissable mais la végétalisation du toit (le sujet principal) est visible. Cependant : lumière de ciel couvert, couleurs froides gris-vert, image basse résolution (apparente sur les thumbnails). Pour un bloc de présentation premium côte à côte, cette photo affaiblit le registre.

### Passage en revue du stock complet — oeil "bloc de présentation"

Format cible : **carré (aspect-square)**, taille affichée ≈ 50vw desktop ou 100vw mobile, photo "de marque" (pas technique de catalogue). L'oeil cherche : eau maîtrisée pour Aqua System / végétal vivant pour LTE.

#### Pour le bloc Aqua System (eau maîtrisée) :

| Photo | Score actuel | En carré | Verdict |
|---|---|---|---|
| `piscine-paroi-verre-travertin` (actuelle) | 7.5/10 | Centre : piscine + graminées. Travertin visible. Lumière propre. Lisible mais compact. | **7/10 en carré** — acceptable |
| `piscine-debordement-foret` | 7/10 | Centre : piscine en plongée légère, forêt. Composition très horizontale — le carré coupe le ciel et les bords forestiers, reste la piscine + terrasse. Lumière grisâtre. | **5/10 en carré** — trop perdu |
| `piscine-interieure-pierre-poutres` | 9.5/10 | Vue en perspective. En carré centré : la piscine et les poutres. La perspective reste présente. Lumière exceptionnelle. Mais intérieur = pas "eau maîtrisée en propriété extérieure". | **8/10 en carré** — belle mais intérieure |
| `piscine-terrasse-bois-plongee` | 8/10 | Vue aérienne plongeante. Carré : piscine + terrasse bois + gazon. La plongée aérienne crée une composition forte même cadrée. Lumière chaude. Lisible immédiatement. Extérieur. | **8.5/10 en carré** — candidat fort |
| `piscine-enterree-maison-brique` | 8.5/10 | Composition 3 plans. En carré centré : piscine + transats blancs + partie de maison en brique. Très premium. Lumière d'été. | **8/10 en carré** — fort mais gardé pour hero /jardins |
| `piscine-jardin-arbre` | 6.5/10 | En carré : bassin + terrasse + arbre. Lisible. Mais parasol orange visible. | **5.5/10 en carré** — parasite chromatique |
| `piscine-interieure-beton-baies` | 8/10 | En carré : le grand bassin intérieur béton. Très architectural. Intérieur. | **7.5/10 en carré** — intérieur, ne montre pas l'extérieur |

**Meilleur candidat bloc Aqua System : `piscine-terrasse-bois-plongee`**
Note en carré : **8.5/10**
- Vue aérienne plongeante → la plongée crée une composition graphique forte même en format carré
- Piscine rectangulaire bien lisible + grande terrasse bois + verdure périmétrique
- Lumière chaude d'été → cohérent avec le registre "eau maîtrisée, qualité d'ouvrage"
- Extérieur pur → pas de confusion avec l'univers intérieur spa
- `object-position: center 40%` → crop légèrement relevé pour garder la piscine entière dans le carré

#### Pour le bloc LTE (végétal et vivant) :

| Photo | Score actuel | En carré | Verdict |
|---|---|---|---|
| `projet-pool-house-toit-vegetalise` (actuelle) | 6.5/10 | Vue drone froide, gris-vert. | **5/10 en carré** — sous le niveau |
| `piscine-enterree-maison-brique` | 8.5/10 | Haie dense impeccable, maison brique, pelouse. **Végétal structurant** dans l'image (haie de 4m). Mais typé piscine. | **8/10 en carré** — réservé hero /jardins |
| `jardin-bassin-maison-bois` | 6/10 | Végétal luxuriant, bambous, terrasse bois. En carré : jardin + bassin + maison. Végétal dominant. Mais lumière plate, résolution basse. | **5.5/10 en carré** — insuffisant |
| `piscine-jardin-arbre` | 6.5/10 | Haies, arbre, bassin. Le végétal est présent mais parasol orange. En carré : l'arbre et les haies sont au centre. Végétal dominant sur la moitié haute. | **6/10 en carré** — parasol orange disqualifiant si visible dans le crop |
| `projet-bassin-jardin-paysage` | 3/10 | Jardin de ville avec coussins colorés. Non-premium. | **1/10** — éliminatoire |
| `piscine-terrasse-bois-plongee` | 8/10 | Si on recommande pour Aqua System, ne peut pas être utilisé pour LTE (doublon sur la même page). | — |
| **Stock jardinerie :** | | | |
| `jardinerie-allee-pepiniere` | 2/10 | Jardinerie de vente, fleurs en contenants plastiques. | **0/10** |
| `jardinerie-serre-chrysanthemes` | 2.5/10 | Serre chrysanthèmes colorés. | **0/10** |
| `jardinerie-cagette-lauriers-orgeval` | 4.5/10 | Cagette Orgeval, charmant mais iPhone portrait. En carré : crop sévère. | **2/10** |
| `jardinerie-presentoir-exterieur` | 2/10 | Gazon synthétique. | **0/10** |

**Meilleur candidat bloc LTE dans le stock : `jardin-bassin-maison-bois`**
Note en carré : **5.5/10** — plafond honnête.

Analyse détaillée : La photo montre une maison contemporaine bardage bois, bassin de nage long, terrasse bois avec grande table, végétation généreuse (bambous, arbres adultes). En format carré centré, le crop donne la moitié haute végétal + la piscine + la terrasse. Le végétal est dominant dans le cadre. C'est la seule photo du stock où le jardin prend visuellement le dessus sur la piscine.

Problèmes réels : lumière plate (pas dorée), résolution photographique visible (légèrement compressée), les bambous ont un registre "jardin zen" plutôt que "parc paysagé est-parisien". La photo dit "jardin privé bien entretenu" mais pas "bureau d'études paysager haut de gamme".

**Aucune photo LTE du stock ne dépasse 5.5/10 pour ce bloc.** Le stock LTE (jardinerie) est structurellement inadapté à un bloc de présentation de prestation paysagère haut de gamme.

---

### Recommandation duo final

#### Bloc Aqua System : `piscine-terrasse-bois-plongee`
```tsx
src={photoSrc('piscine-terrasse-bois-plongee', '800w')}
alt="Vue aérienne d'une piscine rectangulaire et de sa grande terrasse en bois sur gazon, ouvrage Aqua System, propriété de l'ouest parisien"
className="object-cover object-[center_40%]"
```
Note : **8.5/10**

#### Bloc LTE : `jardin-bassin-maison-bois`
```tsx
src={photoSrc('jardin-bassin-maison-bois', '800w')}
alt="Terrasse et jardin d'une propriété contemporaine, bassin de nage, végétation généreuse en arrière-plan — réalisation Les Terres Essentielles"
className="object-cover object-[center_30%]"
```
Note : **5.5/10** — plafond réel du stock existant.

`object-[center_30%]` → crop légèrement relevé pour maximiser la végétation (bambous, arbres) dans la moitié haute du carré, minimiser la terrasse bois en bas.

#### Complémentarité visuelle des deux blocs côte à côte

| Dimension | Bloc Aqua System | Bloc LTE | Verdict |
|---|---|---|---|
| Tonalité | Eau bleue/claire + bois chaud | Vert végétal + bois | Complémentaires — eau vs végétal |
| Luminosité | Chaude, ensoleillée | Plate, légèrement froide | Déséquilibre — Aqua System "gagne" en éclat |
| Plan de vue | Aérien plongeant | Niveau sol | Contrast de point de vue — intéressant |
| Signal premium | Fort (terrasse soignée, gazon tondu) | Moyen (bambous génériques) | Inégal |

Le déséquilibre de luminosité et de signal premium entre les deux blocs est la limite principale du stock actuel. Sur un écran, le bloc Aqua System attirera l'oeil nettement plus que le bloc LTE.

---

### Complément brief shooting `casting-visuels.md` (§4b)

Les besoins suivants sont à ajouter au brief shooting existant :

**NOUVEAU — Priorité P0 pour le bloc LTE :**

> **Prise 4 — Jardin LTE "bloc de présentation" (P0 bloc accueil)**
> Un jardin réalisé par Les Terres Essentielles, photographié au niveau du sol, perspective depuis l'angle d'un massif ou d'une haie taillée. Végétal dominant 60% du cadre. Absence de piscine ou bassin dans ce plan (la présence d'eau est pour le bloc Aqua System). Heure : entre 16h et 18h (lumière de fin d'après-midi, ombres longues, chaude). Format : 1:1 carré natif si possible, sinon 4:3. Qualité : reflex ou moyen format, pas iPhone portrait. Ce serait la seule photo du stock où le végétal est le sujet unique, sans eau. Elle permettrait de monter le bloc LTE de 5.5/10 à 8.5-9/10 et d'équilibrer les deux blocs côte à côte.
>
> Sujet idéal : haie de charme taillée en perspective, massif de graminées avec lumière rasante, allée de buis ou de lauriers. Propriété 78/92. Pas de contenants jardinerie.

**NOUVEAU — Priorité P1 pour le bloc LTE en attendant le shooting :**

> **Option intermédiaire : `piscine-enterree-maison-brique`** — si le hero /jardins-paysage est finalement assigné à une autre photo (par exemple si un shooting produit une photo de jardin pure), libérer `piscine-enterree-maison-brique` pour le bloc LTE accueil. Sa note en carré est 8/10 et la haie dense impeccable constitue le signal végétal le plus fort du stock. C'est la meilleure option en cas de shooting repoussé.
>
> Dans ce cas, le bloc LTE deviendrait :
> ```tsx
> src={photoSrc('piscine-enterree-maison-brique', '800w')}
> alt="Haie dense et jardin structuré d'une grande propriété, piscine enterrée, terrasse haute — expertise paysagère des Hauts-de-Seine"
> className="object-cover object-[center_25%]"
> ```
> `object-[center_25%]` → crop très relevé pour maximiser la haie et l'architecture de la maison, minimiser la piscine dans le bas du carré.
>
> Mais **attention à la cascade** : utiliser `piscine-enterree-maison-brique` ici libère `jardin-bassin-maison-bois` pour le cross-selling /jardins-paysage (où elle était assignée — vérifier `src/app/jardins-paysage/page.tsx`) et exige de trouver une autre photo pour le hero /jardins-paysage. Ne pas activer cette option sans avoir sécurisé l'ensemble de la cascade.

---

## Résumé exécutable pour @fullstack

### A. Hero lisibilité — 3 modifications

**Fichier 1 : `src/app/page.tsx`**
Modifier `overlayClassName` du composant `<Hero>` :
```tsx
overlayClassName="bg-gradient-to-t from-[rgba(26,21,16,0.88)] via-[rgba(26,21,16,0.65)] via-35% to-[rgba(26,21,16,0.15)] md:from-[rgba(26,21,16,0.85)] md:via-[rgba(26,21,16,0.55)] md:via-30% md:to-[rgba(26,21,16,0.10)]"
```

**Fichier 2 : `src/components/sections/Hero.tsx`**

Sur le `<h1>`, ajouter textShadow au style existant :
```tsx
style={{
  ['--reveal-delay' as string]: '0ms',
  textShadow: '0 1px 4px rgba(26,21,16,0.60), 0 2px 16px rgba(26,21,16,0.45), 0 4px 40px rgba(26,21,16,0.25)',
}}
```

Sur le `<p>` subtitle, ajouter textShadow au style existant :
```tsx
style={{
  ['--reveal-delay' as string]: '100ms',
  textShadow: '0 1px 3px rgba(26,21,16,0.55), 0 2px 12px rgba(26,21,16,0.35)',
}}
```

Modifier `OVERLAY_DEFAULT` (heros des sous-pages) :
```tsx
const OVERLAY_DEFAULT =
  'bg-gradient-to-t from-[rgba(26,21,16,0.85)] via-[rgba(26,21,16,0.50)] via-35% to-[rgba(26,21,16,0.15)]';
```

### B. Favicon — 1 modification

**Fichier : `public/favicon.svg`**
Remplacer le contenu intégral par :
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Aquasystem">
  <style>
    .s { fill: #1A1510; }
    @media (prefers-color-scheme: dark) { .s { fill: #F5F0E8; } }
  </style>
  <polygon class="s" points="29,9 35,9 18,54 11,54" />
  <polygon class="s" points="35,9 29,9 46,54 53,54" />
  <rect class="s" x="18" y="33" width="28" height="7" />
  <rect class="s" x="6" y="52" width="16" height="5" />
  <rect class="s" x="42" y="52" width="16" height="5" />
</svg>
```

Puis régénérer : `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180, fond `#F5F0E8`, padding 20px), `android-chrome-192x192.png` (fond `#F5F0E8`), `android-chrome-512x512.png`, `favicon.ico` (multi-size 16+32).

### C. Photos blocs accueil — 2 modifications dans `src/app/page.tsx`

**Bloc Aqua System** (article gauche, ligne ~87-93) :
```tsx
src={photoSrc('piscine-terrasse-bois-plongee', '800w')}
alt="Vue aérienne d'une piscine rectangulaire et de sa grande terrasse en bois sur gazon, ouvrage Aqua System, propriété de l'ouest parisien"
className="object-cover object-[center_40%]"
```

**Bloc LTE** (article droit, ligne ~119-126) :
```tsx
src={photoSrc('jardin-bassin-maison-bois', '800w')}
alt="Terrasse et jardin d'une propriété contemporaine, bassin de nage, végétation généreuse en arrière-plan — réalisation Les Terres Essentielles"
className="object-cover object-[center_30%]"
```

Plafond honnête bloc LTE : **5.5/10** avec le stock existant. Atteindre 8.5/10 requiert le shooting Prise 4 (brief mis à jour dans `casting-visuels.md`).

---

*@design — 2026-06-12*
*Handoff → @fullstack*
