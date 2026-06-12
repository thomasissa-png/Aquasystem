# Specs design — Retours fondateur 2026-06-12

> Source de vérité pour @fullstack. Chaque point = spec exécutable sans question.
> Basé sur audit visuel screenshots p3-* + lecture du code source.

---

## 1. Hero /piscines-bien-etre — Remplacement photo

### Diagnostic
Photo actuelle : `piscine-paroi-verre-travertin` — vu sur captures : jardinières en bac anthracite, transats plastique blanc, dallage béton. Esprit catalogue promotionnel résidentiel bas de gamme. Confirme le retour fondateur « très cheap, pas OK du tout ».

### Audit des candidates restantes du stock (bandeau large)

| Fichier | Contenu visuel | Adapté hero bandeau ? | Note |
|---|---|---|---|
| `piscine-interieure-pierre-poutres` | Couloir de nage sous charpente en poutres apparentes, murs en pierre de pays, sol travertin, lumière naturelle dramatique côté jardin, transats en bois | **OUI — meilleure candidate** | Photographiée en plan large horizontal, pleine hauteur disponible, matériaux nobles, lumière dramatique. |
| `piscine-terrasse-bois-plongee` | Vue aérienne drone d'une piscine rectangulaire sur terrasse bois, jardin propre. Petite résolution native, format quasi carré — mauvais ratio bandeau. | Non — format inadapté | |
| `piscine-enterree-maison-brique` | Réservé /jardins-paysage (cf. point 2) | Non — doublon inter-page à examiner au cas 2 | |

### Décision

**Utiliser `piscine-interieure-pierre-poutres-1280w.webp` comme hero /piscines-bien-etre.**

Justification : la photo est un couloir de nage intérieur avec charpente bois et mur de pierres — elle incarne physiquement les mots « bien-être », « sur-mesure », « intérieur noble ». Le casting initial lui avait attribué 9,5/10 pour cette page. L'usage actuel est dans la galerie réalisations (bloc accueil) et la card prescripteurs (bloc accueil). L'inter-page est acceptable (règle intra-page : pas deux fois la même image sur la même page). Vérification : `piscine-interieure-pierre-poutres` n'est pas utilisée sur `/piscines-bien-etre` dans le code actuel — elle y est utilisée via `/la-maison` hero split (`piscine-interieure-beton-baies`) et MediaSplit suivi annuel (`piscine-interieure-beton-baies`) — sans doublon.

### Spec d'implémentation

**Fichier :** `src/app/piscines-bien-etre/page.tsx`

Changer le prop `imageSrc` du composant `<Hero>` :

```tsx
// AVANT
imageSrc={photoSrc('piscine-paroi-verre-travertin', '1280w')}
imageAlt="Piscine sur mesure à paroi vitrée, margelles en travertin..."

// APRÈS
imageSrc={photoSrc('piscine-interieure-pierre-poutres', '1280w')}
imageAlt="Couloir de nage intérieur sur mesure — charpente bois apparente, murs en pierre de pays, lumière naturelle — réalisation Aqua System dans les Yvelines"
```

Ajouter le prop `objectPosition` pour cadrer sur l'axe du couloir (perspective centrale vers le jardin) :

```tsx
objectPosition={{ base: 'object-[center_35%]' }}
```

Overlay : overlay standard du Hero (gradient bas-vers-transparent) — pas de surcharge, la photo est suffisamment contrastée côté gauche (mur pierre sombre) pour que le texte blanc passe WCAG AA sans renforcer l'overlay.

---

## 2. Hero /jardins-paysage — Remplacement photo

### Diagnostic
Photo actuelle : `piscine-enterree-maison-brique` — vu sur captures : piscine rectangulaire au premier plan, maison en brique rouge, pelouse tondue. C'est une photo de piscine, pas de jardin. Le visiteur arrivant sur /jardins-paysage voit une piscine en hero — incohérence sémantique totale.

### Audit des candidates du stock

| Fichier | Contenu visuel | Pertinence jardin | Note |
|---|---|---|---|
| `jardin-bassin-maison-bois` | Maison contemporaine ossature bois, jardin arboré mature, bassin en premier plan, pelouse dense, végétation riche — l'eau est un élément du jardin, pas le sujet principal | **OUI — meilleure candidate** | Dominante végétale franche, architecture contemporaine premium (cible Alexandre), pas une piscine de catalogue. |
| `piscine-jardin-arbre` | Terrasse bois, pelouse, arbre planté au bord du bassin — utilisée dans les deux CrossSellingBlock | Non — doublon intra-page sur /jardins-paysage (CrossSellingBlock en bas de page) | |
| `projet-bassin-jardin-paysage` | Bassin naturel dans un jardin paysager | À vérifier usage — non utilisé sur /jardins-paysage actuellement | Candidate de secours si jardin-bassin-maison-bois est jugé insuffisant |

### Vérification doublons intra-page /jardins-paysage
- `piscine-jardin-arbre` : utilisée dans `CrossSellingBlock` bas de page → exclue du hero (doublon intra-page).
- `jardin-bassin-maison-bois` : non utilisée sur cette page dans le code actuel → **aucun doublon**.

### Décision

**Utiliser `jardin-bassin-maison-bois-1280w.webp` comme hero /jardins-paysage.**

Le stock ne contient pas de photo pure « jardin sans eau » de qualité hero. `jardin-bassin-maison-bois` est la meilleure option disponible : dominante végétale (70% de la surface : arbres, pelouse, végétation), architecture premium, eau en élément secondaire. Honnêteté sur le plafond stock : ce n'est pas la photo rêvée (pas de massif fleuri, pas de terrasse paysagée pure) — inscrire dans `docs/photos-a-fournir.md` la demande d'une photo jardin sans piscine (allée, massif, terrasse végétalisée).

### Spec d'implémentation

**Fichier :** `src/app/jardins-paysage/page.tsx`

Changer le `<Hero>` :

```tsx
// AVANT
imageSrc={photoSrc('piscine-enterree-maison-brique', '1280w')}
imageAlt="Maison contemporaine en brique et bois encadrée d'une haie dense..."
objectPosition={{ base: 'object-[center_40%]' }}
overlayClassName="bg-gradient-to-t from-[rgba(26,21,16,0.65)] via-[rgba(26,21,16,0.28)] to-transparent"

// APRÈS
imageSrc={photoSrc('jardin-bassin-maison-bois', '1280w')}
imageAlt="Jardin sur mesure avec bassin intégré, végétation dense et maison contemporaine à ossature bois — réalisation Les Terres Essentielles dans l'ouest parisien"
objectPosition={{ base: 'object-[center_40%]' }}
overlayClassName="bg-gradient-to-t from-[rgba(26,21,16,0.60)] via-[rgba(26,21,16,0.22)] to-transparent"
```

Overlay légèrement allégé (60% au lieu de 65%) : la photo `jardin-bassin-maison-bois` est plus sombre en bas grâce aux végétaux — l'overlay fort l'assombrirait excessivement.

---

## 3. Cross-sells bas de page — Diagnostic et correction

### Diagnostic visuel (screenshots p3-piscines-desktop-y2200, p3-jardins-desktop-y2200)

**Problème identifié : rupture de contexte visuelle.**

Le `CrossSellingBlock` (`<section>` sans fond propre, grid 50/50) arrive directement après la section `SectionCTA` (fond `bg-background`) via une section blanche sans respiration. La structure actuelle enchaîne :

1. ProofBadges → `bg-background` avec padding `py-16`
2. CrossSellingBlock → `<section>` sans classe de fond, donc `bg-background` par héritage — la photo 50% arrive brutalement sans transition
3. SectionCTA → fond séparé

Le problème n'est pas le split 50/50 lui-même mais l'absence de séparation perceptuelle entre le flux éditorial (sections à fond uniforme) et le bloc promotionnel. Le CrossSellingBlock "flotte" dans la page sans ancrage.

**Solution choisie :** pas de redesign — ajout d'un `border-t border-border-muted` sur la section wrapper du CrossSellingBlock, et padding top `pt-0` supprimé si présent (le split pleine largeur commence dès la bordure). La photo côté gauche doit toucher la bordure top sans espace.

### Spec d'implémentation

**Fichier :** `src/components/sections/CrossSellingBlock.tsx`

```tsx
// AVANT
<section>
  <div className="grid lg:grid-cols-2">

// APRÈS
<section className="border-t border-border-muted">
  <div className="grid lg:grid-cols-2">
```

C'est tout. La bordure top fine (1px, `border-border-muted` = couleur de séparation douce du design system) suffit à indiquer que l'on change de registre éditorial. Sobre, pas de fond coloré ajouté, pas d'espace blanc superflu.

**Note image cross-sell /jardins-paysage :** le `CrossSellingBlock` de /jardins-paysage utilise actuellement `piscine-jardin-arbre` — même image que le hero `/piscines-bien-etre` si l'on avait gardé l'ancienne photo, mais pas de doublon avec le nouveau hero `/piscines-bien-etre` (`piscine-interieure-pierre-poutres`). Pas de changement nécessaire sur l'image du cross-sell.

---

## 4. Paragraphes claims GEO — Intégration élégante

### 4a. Accueil — Paragraphe sous ProofBadges

**Diagnostic** (screenshot p3-home-desktop-y1640) : le bloc `ProofBadges` (4 tuiles dorées 30+ / 350+ / Socotec / L'Esprit Piscine) se termine à une hauteur, puis deux paragraphes de texte de corps `text-foreground-secondary` flottent en dessous avec `mt-8` — pas de filet, pas de centrage, pas de mise en forme différenciée. Résultat : on dirait des notes de bas de page oubliées, pas des claims marketing. Le fond `bg-background` homogène sur toute la section n'aide pas à créer une clôture visuelle.

**Spec :**

Transformer le bloc de texte en une ligne de crédit centrée, séparée par un filet fin, police plus petite et couleur atténuée — toujours visible (GEO), mais clairement de statut secondaire par rapport aux badges.

**Fichier :** `src/app/page.tsx` (ou le composant qui contient la section ProofBadges, selon refactoring)

Remplacer le bloc actuel sous `<ProofBadges />` :

```tsx
// AVANT (deux <p> avec mt-8 / mt-4)
<p className="mt-8 max-w-[70ch] text-base leading-8 text-foreground-secondary">
  Aqua System est certifié Socotec CSP/ESP-001...
</p>
<p className="mt-4 max-w-[70ch] text-sm leading-7 text-foreground-secondary">
  Trophée d'Or FPP 2024...
</p>

// APRÈS — ligne de crédit centrée sous filet
<div className="mt-8 border-t border-border-muted pt-5 text-center">
  <p className="mx-auto max-w-[72ch] text-sm leading-7 text-foreground-muted">
    Aqua System : certifié Socotec CSP/ESP-001, membre du réseau L'Esprit Piscine.
    Plus de 350 piscines entretenues dans les Yvelines et les Hauts-de-Seine depuis
    plus de 30 ans. Trophée d'Or FPP 2024 (Piscine intérieure, FPP).
    Award Bronze EUSA 2025, Piscines intérieures privées (Barcelone).
  </p>
</div>
```

Changements :
- `border-t border-border-muted pt-5` : filet de séparation doux entre les badges et le texte — le filet est le seul élément structurant ajouté, pas de fond coloré
- `text-center` sur le wrapper : centrage du texte pour aligner avec les badges centrés visuellement
- Fusion des deux `<p>` en un seul paragraphe : évite l'empilement orphelin
- `text-sm leading-7 text-foreground-muted` au lieu de `text-base leading-8 text-foreground-secondary` : clairement secondaire, lisible, pas supprimé
- `max-w-[72ch]` + `mx-auto` : colonne de lecture confortable, centrée

### 4b. /jardins-paysage — Paragraphe bureau d'études LTE

**Diagnostic** (screenshot p3-jardins-desktop-y800) : la section `BureauEtudesBlock` (TextBlock centré, fond `bg-background`) se termine sur le 2e paragraphe du corps, puis une `<section className="bg-background">` séparée contient uniquement le paragraphe GEO LTE (la phrase sur le bureau d'études aux Alluets-le-Roi). Il n'y a aucun espace de séparation entre les deux sections, elles partagent le même fond, mais le changement de `<section>` crée un padding bottom/top cumulé qui fait flotter le paragraphe GEO seul au centre de 200+ px de vide. C'est la « mise en page atroce » signalée.

**Spec :**

Fondre le claim GEO directement dans le `body[]` du `BureauEtudesBlock`, comme troisième paragraphe du corps. Supprimer la `<section>` wrapper séparée.

**Fichier :** `src/app/jardins-paysage/page.tsx`

```tsx
// AVANT — BureauEtudesBlock avec 2 paragraphes, puis section GEO séparée

function BureauEtudesBlock() {
  return (
    <TextBlock
      eyebrow="Bureau d'études"
      title="Un projet pensé avant d'être planté"
      body={[
        "Tout commence par la lecture du terrain...",
        "Quand un projet comporte aussi une piscine...",
      ]}
    />
  );
}

// + section séparée après :
<section className="bg-background">
  <div className="mx-auto max-w-container px-4 pb-8 md:px-8">
    <p className="max-w-[70ch] text-base leading-8 text-foreground-secondary">
      Les Terres Essentielles dispose d'un bureau d'études paysager intégré...
    </p>
  </div>
</section>

// APRÈS — 3 paragraphes intégrés dans le TextBlock, section GEO supprimée

function BureauEtudesBlock() {
  return (
    <TextBlock
      eyebrow="Bureau d'études"
      title="Un projet pensé avant d'être planté"
      body={[
        "Tout commence par la lecture du terrain : les ombrages, les masses végétales existantes, les contraintes de sol. Notre bureau d'études, en partenariat avec Les Terres Essentielles, pose le plan avant que la première pelle entre dans la terre.",
        "Quand un projet comporte aussi une piscine, les deux études sont menées au même moment. Le résultat : un espace qui tient ensemble, pas une somme de parties.",
        "Les Terres Essentielles dispose d'un bureau d'études paysager intégré aux Alluets-le-Roi (Yvelines, 78580), permettant la co-conception de projets extérieurs associant piscine et jardin dès la phase de plan, dans les Yvelines et les Hauts-de-Seine.",
      ]}
    />
  );
}
```

Supprimer intégralement les lignes 78-87 de `jardins-paysage/page.tsx` (la `<section>` GEO standalone).

Le troisième paragraphe s'affiche avec le même style que les deux premiers (`text-base leading-8 text-foreground-secondary text-left`) via le `TextBlock` existant — aucun nouveau style nécessaire. Le claim GEO reste dans le DOM, visible, extractible par les LLM, mais intégré dans le flux narratif.

---

## 5. Page /la-maison — Audit complet et corrections

### 5a. Hero split — Diagnostic

**Screenshot p3-lamaison-desktop-y0 :** colonne texte gauche = H1 « La maison » (serif 4xl→6xl) + sous-titre 1 ligne. Colonne droite = photo `piscine-interieure-beton-baies` (piscine en béton brut, baies vitrées). La section fait `min-h-[70vh]`.

**Problèmes identifiés :**

1. **Colonne texte trop vide** : H1 + 1 ligne de sous-titre dans 70vh de hauteur = vide oppressant. Le regard ne sait pas où aller. La colonne droite (photo) est dense, la gauche est creuse.
2. **Pas d'eyebrow** : le H1 arrive sans introduction, sans contexte visuel immédiat. Sur une page « identité », le manque d'eyebrow rompt le rythme habituel des autres pages.
3. **Pas de proof en hero** : la page /la-maison est LA page de confiance — pourtant le hero n'ancre aucune preuve (30 ans, équipe de 8, 78/92). Les preuves n'arrivent que 2-3 sections plus bas.
4. **Photo** : `piscine-interieure-beton-baies` — béton brut et baies vitrées industrielles — est correcte techniquement mais froide pour une page d'identité qui devrait incarner le savoir-faire et la chaleur humaine. Elle est déjà utilisée dans le MediaSplit « suivi annuel » de /piscines-bien-etre : doublon inter-page à corriger.

### 5a — Spec corrections hero /la-maison

**Fichier :** `src/app/la-maison/page.tsx`

**Correction 1 — Enrichir la colonne texte (eyebrow + preuve ancrée)**

```tsx
// AVANT
<div className="flex flex-col justify-center px-4 py-16 md:px-8 md:py-24">
  <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
    La maison
  </h1>
  <p className="mt-4 max-w-[45ch] text-lg leading-8 text-foreground-secondary md:text-xl">
    De la vision à la réalisation : trente ans dans les plus belles
    propriétés de l'ouest parisien.
  </p>
</div>

// APRÈS
<div className="flex flex-col justify-center px-4 py-16 md:px-8 md:py-24">
  <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
    Aqua System & Les Terres Essentielles
  </p>
  <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
    La maison
  </h1>
  <p className="mt-4 max-w-[45ch] text-lg leading-8 text-foreground-secondary md:text-xl">
    De la vision à la réalisation : trente ans dans les plus belles
    propriétés de l'ouest parisien.
  </p>
  <p className="mt-6 text-sm font-medium text-foreground-secondary">
    30 ans · Équipe de 8 · Yvelines & Hauts-de-Seine
  </p>
  <div className="mt-6 h-px w-12 bg-foreground-accent-water" />
</div>
```

Ce que ça ajoute sans alourdir :
- Eyebrow en text-water (`Aqua System & Les Terres Essentielles`) : contextualise immédiatement, cohérent avec les autres pages
- Ligne de preuve compacte (`30 ans · Équipe de 8 · Yvelines & Hauts-de-Seine`) : 3 tokens en `text-sm font-medium`, pas de duplication avec la section suivante — c'est un ancrage, pas un développement
- Filet décoratif `h-px w-12 bg-foreground-accent-water` : clôture la colonne texte visuellement, répond à la verticalité de la photo

**Correction 2 — Photo hero**

Remplacer `piscine-interieure-beton-baies` (doublon avec /piscines-bien-etre MediaSplit, ton industriel) par `piscine-interieure-pierre-poutres` — couloir de nage sous charpente, pierre, chaleur des matériaux, même registre premium mais plus en accord avec l'ADN « identité maison ».

Attendre : la correction 1 (point 1 de ce doc) affecte aussi cette photo pour /piscines-bien-etre hero. Résultat global :
- `/piscines-bien-etre` hero → `piscine-interieure-pierre-poutres` (point 1 de ce doc)
- `/la-maison` hero → CONFLIT : ne pas utiliser la même photo sur deux heroes différents

Décision : pour /la-maison, utiliser `piscine-interieure-veranda-soir` à la place. Si indisponible ou non satisfaisante visuellement, conserver `piscine-interieure-beton-baies` pour /la-maison — le doublon inter-page est moins grave qu'un doublon intra-page. Vérifier d'abord :

```tsx
// /la-maison — hero photo finale
imageSrc={photoSrc('piscine-interieure-veranda-soir', '1280w')}
// alt à adapter selon le rendu visuel de la photo
```

Si `piscine-interieure-veranda-soir` est jugée insuffisante au rendu : conserver `piscine-interieure-beton-baies` pour /la-maison (doublon inter-page toléré, c'est une page identité, pas une page produit).

### 5b. Sections §2 à §9 — Audit

**§2 Notre histoire + portrait** (p3-lamaison-desktop-y750) : section correcte. Portrait Nicolas Berg centré, texte lisible, format sobre. PASS. Pas de correction.

**§3 Méthode 5 étapes** (p3-lamaison-desktop-y750 + y1500 + y2900) : timeline avec numéros serif aqua, lignes verticales de connexion, corps en `text-foreground-secondary`. Hiérarchie claire, rythme correct pour un contenu dense. PASS. Pas de correction.

**§4 Les deux maisons** (p3-lamaison-desktop-y2900) : grille 2 colonnes fond `bg-background-secondary`. Badges Socotec/Esprit Piscine/Trophée Or en pills. Adresses avec icônes. Photo jardinerie LTE côté droit. PASS. Pas de correction.

**§5 Ancrage local** (p3-lamaison-desktop-y4400) : H2 + prose + communes en serif italique + paragraphe GEO géographique + CTA ghost. Le CTA ghost « Parlez-nous de votre projet → » flotte seul en bas de section avec beaucoup d'espace vide au-dessus. FAIL (mineur) — la section est longue et le CTA semble isolé.

**Correction §5 :** Réduire le padding bottom de la section avant le CTA.

```tsx
// AVANT (dans la div du CTA)
<div className="mx-auto max-w-container px-4 pb-20 text-center md:px-8">

// APRÈS
<div className="mx-auto max-w-container px-4 pb-12 text-center md:px-8">
```

pb-20 → pb-12 (80px → 48px). L'espace au-dessus du CTA vient du padding bottom de la div précédente (py-20) qui est déjà généreux. 48px suffisent.

**§6 Valeurs** : grille 3 colonnes fond `bg-background-secondary`, H2 sr-only. Les 3 valeurs s'affichent correctement. PASS. Pas de correction.

**§7 Photo pleine largeur** : `piscine-jardin-arbre` en full-width `h-[480px]`. Photo identique au CrossSellingBlock de /piscines-bien-etre et /jardins-paysage. Doublon inter-page toléré (pages différentes) mais doublon INTRA-PAGE à vérifier : /la-maison utilise `piscine-jardin-arbre` en §7 — vérifier qu'elle n'est pas utilisée ailleurs dans cette même page. Code : utilisée uniquement en §7. PASS côté doublons.

Le rendu visuel de la section est générique (pas mal mais pas fort). Pour cette itération : aucune correction — la photo est correcte, le format pleine largeur fonctionne.

**§8 FAQ + §9 SectionCTA** : PASS visuels. Pas de correction.

---

## 6. Footer — Réseaux sociaux : icônes lucide-react

### Diagnostic
Screenshot p3-foot-desktop : footer sombre (`bg-background-inverse`), colonne 1 contient wordmark + 2 badges + les textes « LinkedIn » et « Facebook » en liens texte simples. Le standard premium 2026 est d'utiliser des icônes SVG reconnues — le texte seul ressemble à un oubli plutôt qu'à une décision.

### Décision : OUI aux icônes

Remplacer les liens texte « LinkedIn » / « Facebook » par des icônes lucide-react carrées, avec label `aria-label` et texte sr-only. Taille 20×20px (h-5 w-5) — ni trop petites (lisibles) ni trop grandes (premium = discret).

### Spec d'implémentation

**Fichier :** `src/components/layout/Footer.tsx`

**Ajout imports :**
```tsx
// Ajouter aux imports lucide-react existants (Mail, MapPin, Phone)
import { Linkedin, Facebook } from 'lucide-react';
```

**Remplacer le bloc réseaux sociaux :**

```tsx
// AVANT
<div className="mt-4 flex gap-x-4 text-sm text-sand-300">
  <a
    href={SOCIAL_LINKS.linkedinAS}
    target="_blank"
    rel="noopener noreferrer"
    className={footerListLinkClass}
  >
    LinkedIn
  </a>
  <a
    href={SOCIAL_LINKS.facebookLTE}
    target="_blank"
    rel="noopener noreferrer"
    className={footerListLinkClass}
  >
    Facebook
  </a>
</div>

// APRÈS
<div className="mt-4 flex gap-x-3">
  <a
    href={SOCIAL_LINKS.linkedinAS}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Aqua System sur LinkedIn (ouvre un nouvel onglet)"
    className="flex h-9 w-9 items-center justify-center rounded-sm text-sand-400 transition-colors hover:text-foreground-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring-inverse)] focus-visible:ring-offset-2 focus-visible:ring-offset-background-inverse"
  >
    <Linkedin aria-hidden className="h-5 w-5" />
    <span className="sr-only">LinkedIn — Aqua System</span>
  </a>
  <a
    href={SOCIAL_LINKS.facebookLTE}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Les Terres Essentielles sur Facebook (ouvre un nouvel onglet)"
    className="flex h-9 w-9 items-center justify-center rounded-sm text-sand-400 transition-colors hover:text-foreground-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring-inverse)] focus-visible:ring-offset-2 focus-visible:ring-offset-background-inverse"
  >
    <Facebook aria-hidden className="h-5 w-5" />
    <span className="sr-only">Facebook — Les Terres Essentielles</span>
  </a>
</div>
```

**Détail des choix :**
- `h-9 w-9` (36px) : zone tactile généreuse, icône centrée — dépasse les 44px réglementaires pour les touches grâce au padding implicite dans le contexte du footer
- `text-sand-400` au repos → `text-foreground-inverse` au hover : transition douce sur fond sombre, cohérent avec le style des autres liens footer
- `focus-visible:ring-offset-background-inverse` : ring visible sur fond sombre (correction token spécifique footer)
- `gap-x-3` au lieu de `gap-x-4` : icônes plus proches que du texte — visuellement groupées en cluster
- `Linkedin` et `Facebook` sont disponibles dans lucide-react (vérifier version installée — si absents utiliser `Linkedin` pour LI et pour FB le logo carré n'existe pas dans lucide-react → fallback : import SVG inline ou utiliser `Share2` pour FB uniquement si `Facebook` absent)

---

## 7. Menu — Libellé « Notre maison »

### Diagnostic
`NAV_LINKS` dans `src/lib/constants.ts` ligne 61 : `{ label: 'Notre maison', href: '/la-maison' }`. Le fondateur demande de revoir ce libellé.

### Analyse des options

| Option | Caractères | Registre | Verdict |
|---|---|---|---|
| « À propos » | 8 car. | Standard web universel — sans personnalité, neutre | Trop générique pour une marque premium artisanale |
| « À propos de nous » | 16 car. | Corporate international (calque de l'anglais "About us") | Trop long, trop corporate, pas du tout l'ADN Aqua System |
| « Notre maison » | 13 car. | Métaphore artisanale, chaleur, appartenance — cohérent avec le contenu de la page | Fort sémantiquement mais peut prêter à confusion (penser maison individuelle, pas maison = entreprise) |
| « La maison » | 10 car. | Équivalent sobre de « Notre maison », plus affirmatif — la maison, sans adjectif possessif | Registre premium, direct, correspond au H1 de la page |

### Décision

**Libellé retenu : « La maison »**

Justification en 3 lignes : « La maison » est à la fois le H1 de la page et le nom de l'URL (`/la-maison`) — cohérence sémantique parfaite. Le registre sans adjectif possessif est plus affirmé et premium que « Notre maison » — on ne dit pas « notre maison » à l'entrée d'une maison de couture, on dit « La maison ». 10 caractères, court, aligné sur le ton de marque sobre et confiant.

### Spec d'implémentation

**Fichier :** `src/lib/constants.ts`

```ts
// AVANT
{ label: 'Notre maison', href: '/la-maison' },

// APRÈS — dans NAV_LINKS
{ label: 'La maison', href: '/la-maison' },
```

Même changement dans `FOOTER_NAV_LINKS` ligne 73 :

```ts
// AVANT
{ label: 'Notre maison', href: '/la-maison' },

// APRÈS — dans FOOTER_NAV_LINKS
{ label: 'La maison', href: '/la-maison' },
```

**Grep obligatoire post-changement :** chercher `Notre maison` dans tout le repo pour détecter d'éventuelles occurrences codées en dur (breadcrumbs, JSON-LD, aria-labels). Commande :
```bash
grep -r "Notre maison" src/ public/ --include="*.tsx" --include="*.ts" --include="*.json"
```
Vérifier aussi `la-maison/page.tsx` qui contient le breadcrumb JSON-LD : `{ name: 'Notre maison', path: '/la-maison/' }` — ce label doit aussi être mis à jour :

```tsx
// Dans breadcrumbJsonLd() appelé dans la-maison/page.tsx
const BREADCRUMB = breadcrumbJsonLd([{ name: 'La maison', path: '/la-maison/' }]);
```

Le sous-titre drawer mobile dans `NavBar.tsx` ligne 191-193 référence `/la-maison` avec un helper conditionnel — pas de texte hardcodé « Notre maison » à ce niveau, le label vient de `NAV_LINKS` donc la correction se propage automatiquement.

---

## Récapitulatif des fichiers à modifier

| Fichier | Points | Nature |
|---|---|---|
| `src/app/piscines-bien-etre/page.tsx` | 1 | Hero imageSrc + imageAlt + objectPosition |
| `src/app/jardins-paysage/page.tsx` | 2, 4b | Hero imageSrc + imageAlt + overlay ; suppression section GEO ; fusion 3e paragraphe dans BureauEtudesBlock |
| `src/app/page.tsx` | 4a | Refonte bloc texte sous ProofBadges (filet + centrage + fusion) |
| `src/app/la-maison/page.tsx` | 5 | Hero colonne texte (eyebrow + preuve + filet) ; hero photo candidate ; pb-20→pb-12 §5 |
| `src/components/sections/CrossSellingBlock.tsx` | 3 | `border-t border-border-muted` sur `<section>` |
| `src/components/layout/Footer.tsx` | 6 | Import Linkedin+Facebook ; remplacer liens texte par icônes h-9 w-9 |
| `src/lib/constants.ts` | 7 | « Notre maison » → « La maison » dans NAV_LINKS et FOOTER_NAV_LINKS |
| `src/app/la-maison/page.tsx` | 7 | Breadcrumb JSON-LD label « La maison » |
