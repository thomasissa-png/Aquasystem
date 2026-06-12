# Audit de cohérence des primitives visuelles — 2026-06-12

> Scope : audit exhaustif par Grep + lecture visuelle des screenshots (p3/p4).  
> Méthode : inventaire famille par famille, règle tranchée, déviations P0/P1/P2.  
> Intervenant : @design. Fix : @fullstack (lot dédié, aucune modification dans src/ ici).

---

## FAMILLE 1 — RAYONS (rounded-*)

### Règle tranchée

**Images/figures/cards : `rounded-lg` partout sans exception.**

Justification : le registre premium haut de gamme du projet tolère un rayon modéré (8px en Tailwind = `rounded-lg`) qui adoucit sans "arrondir" au sens bon marché. La majorité des composants utilisent déjà `rounded-lg`. L'angle vif (0px) serait cohérent dans un registre éditorial pur mais incohérent avec les boutons et inputs qui ont tous `rounded-md`. Trancher sur `rounded-lg` unifie les figures avec les cards et le PhotoPlaceholder.

**Boutons et inputs : `rounded-md` (déjà uniforme — aucune déviation).**

**Chips/FilterPills : `rounded-full` (déjà uniforme — aucune déviation).**

**Badges footer (Socotec, Esprit Piscine) : `rounded-md` — conforme.**

**Avatars/portraits : `rounded-full` — spécifique, justifié (portrait Nicolas Berg).**

---

### Inventaire exhaustif — RAYONS

| Composant / Page | Fichier | Ligne(s) | Valeur actuelle | Cible | Priorité |
|---|---|---|---|---|---|
| **P0 — CAS FONDATEUR** | | | | | |
| Section home §2 — image Aqua System (piscine-interieure-pierre-poutres) | `src/app/page.tsx` | 85 | `rounded-lg` | `rounded-lg` ✓ | — |
| Section home §2 — figure LTE (jardin-piscine-parasols) | `src/app/page.tsx` | 121 | **aucun rounded** (`<figure>` sans classe rayon) | `rounded-lg` | **P0** |
| **P1 — ENTRE PAGES** | | | | | |
| CrossSellingBlock — `<figure>` image gauche | `src/components/sections/CrossSellingBlock.tsx` | 60 | **aucun rounded** (`overflow-hidden` seul, pas de `rounded-*`) | `rounded-lg` (mobile uniquement, pas desktop full-bleed) | **P1** |
| /la-maison §4 — figure LTE (jardinerie-cagette-lauriers) | `src/app/la-maison/page.tsx` | 383 | `overflow-hidden rounded-lg` ✓ | `rounded-lg` ✓ | — |
| /la-maison §7 — photo propriété pleine largeur | `src/app/la-maison/page.tsx` | 474 | **aucun rounded** (full-bleed volontaire) | Maintenir 0 — full-bleed = exception documentée | — |
| /prescripteurs §hero — figure image droite | `src/app/prescripteurs/page.tsx` | 158 | **aucun rounded** (`overflow-hidden` seul) | 0 — full-bleed col droite split hero = exception documentée | — |
| /la-maison §1 — figure hero image droite | `src/app/la-maison/page.tsx` | 160 | **aucun rounded** (`overflow-hidden` seul) | 0 — full-bleed col droite split hero = exception documentée | — |
| Fiche réalisation — photo principale (aspect-video) | `src/app/realisations/[slug]/page.tsx` | 116 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| Fiche réalisation — photos secondaires (aspect-[4/3]) | `src/app/realisations/[slug]/page.tsx` | 134 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| OuvrageCard — `<figure>` (aspect-[4/3]) | `src/components/sections/OuvrageCard.tsx` | 27 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| MediaSplit — `<figure>` (aspect-[3/2]) | `src/components/sections/MediaSplit.tsx` | 82 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| PhotoPlaceholder | `src/components/ui/PhotoPlaceholder.tsx` | 33 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| RealisationCard — lien racine | `src/components/sections/RealisationCard.tsx` | 36 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| RealisationCard — div intérieure (photo) | `src/components/sections/RealisationCard.tsx` | 38 | **aucun rounded** (overflow-hidden seul, le rayon est sur le parent) | Conforme — le parent `rounded-lg` + `overflow-hidden` applique le clip | — |
| Portrait Nicolas Berg | `src/app/la-maison/page.tsx` | 204 | `rounded-full` ✓ | `rounded-full` — avatar, exception justifiée | — |
| VivantSection — card texte « sol » | `src/components/sections/VivantSection.tsx` | 116 | `rounded-lg` ✓ | `rounded-lg` ✓ | — |
| Jardins services cards | `src/app/jardins-paysage/page.tsx` | 109 | `rounded-md` | `rounded-md` — card sans image, taille plus petite, conforme | — |
| Badge preuve /la-maison | `src/app/la-maison/page.tsx` | 310–321 | `rounded-md` ✓ | `rounded-md` ✓ | — |
| Footer badges (Socotec, Esprit Piscine) | `src/components/layout/Footer.tsx` | 64–68 | `rounded-md` ✓ | `rounded-md` ✓ | — |
| Bouton Button.tsx | `src/components/ui/Button.tsx` | 64 | `rounded-md` ✓ | `rounded-md` ✓ | — |
| FormField inputs/textarea/select | `src/components/ui/FormField.tsx` | 29 | `rounded-md` ✓ | `rounded-md` ✓ | — |
| Chip | `src/components/ui/Chip.tsx` | 28 | `rounded-full` ✓ | `rounded-full` ✓ | — |
| FilterPill RealisationsGrid | `src/components/sections/RealisationsGrid.tsx` | 88 | `rounded-full` ✓ | `rounded-full` ✓ | — |
| SectionCTA — conteneur | `src/components/sections/SectionCTA.tsx` | — | aucun (section fond plein) | — aucun rayon sur sections plein fond | — |
| Liens icônes réseaux sociaux footer | `src/components/layout/Footer.tsx` | 81, 89 | `rounded-sm` ✓ | `rounded-sm` ✓ | — |
| Hamburger NavBar | `src/components/layout/NavBar.tsx` | 133 | `rounded-sm` ✓ | `rounded-sm` ✓ | — |
| Contact — wrapper formulaire | `src/app/contact/page.tsx` | 77 | `rounded-xl` | `rounded-xl` — encart contenant du formulaire, traitement différent, acceptable | — |

**Synthèse rayons — 2 déviations réelles :**

1. **P0** — `src/app/page.tsx` ligne 121 : `<figure>` LTE sans `rounded-lg`. Fix : ajouter `rounded-lg overflow-hidden` à la `<figure>` (actuellement `overflow-hidden` est sur la figure mais sans `rounded-*`).
2. **P1** — `src/components/sections/CrossSellingBlock.tsx` ligne 60 : `<figure>` sans `rounded-*`. Note : sur desktop, le bloc est full-bleed bord à bord (grille 2 col sans padding). La règle s'applique sur mobile uniquement où la figure n'est pas full-bleed. Fix précis : `rounded-lg lg:rounded-none` sur la `<figure>`.

---

## FAMILLE 2 — BORDURES & FILETS (border-*)

### Règle tranchée

- **Filets de séparation de section** : `border-t border-border` (hairline 1px, token sémantique `border`)
- **Filets de séparation discrets/contexte sombre** : `border-border-muted`
- **Filets décoratifs ProofBadges** : `border-gold-600/30` (excepté, décoratif, exempté WCAG)
- **Cards ouvrages jardins** : `border-l-2 border-border-default` (accent latéral intentionnel)
- **Preuves /la-maison** : `bg-background-proof` sans border (fond coloré, cohérent)
- **Badges footer** : `border border-sand-800` (fond sombre, couleur adaptée)
- **FAQ** : `divide-y divide-border border-t border-border` — filets identiques, cohérents

### Inventaire exhaustif — BORDURES

| Composant / Page | Fichier | Ligne(s) | Valeur actuelle | Conformité |
|---|---|---|---|---|
| Section preuves /accueil — filet sous badges | `src/app/page.tsx` | 162 | `border-t border-border-muted` | ✓ |
| ProofBadges — filets entre badges | `src/components/ui/ProofBadges.tsx` | 76–84 | `border-l border-gold-600/30` + `border-t border-gold-600/25` | ✓ décoratif exempté |
| Section preuves /piscines — filet | `src/app/piscines-bien-etre/page.tsx` | 151 | `border-t border-border-muted` | ✓ cohérent /accueil |
| FAQ — filets items | `src/components/sections/FaqSection.tsx` | 45 | `divide-y divide-border border-t border-border` | ✓ |
| Fiche réalisation — filets aside | `src/app/realisations/[slug]/page.tsx` | 182, 188 | `border-t border-border` | ✓ |
| Footer — barre légale | `src/components/layout/Footer.tsx` | 144 | `border-t border-sand-800` | ✓ fond sombre adapté |
| Footer badges | `src/components/layout/Footer.tsx` | 64–68 | `border border-sand-800` | ✓ |
| NavBar drawer — filet header | `src/components/layout/NavBar.tsx` | 157 | `border-b border-border-muted` | ✓ |
| NavBar drawer — filets items | `src/components/layout/NavBar.tsx` | 172 | `border-b border-border-muted/60` | ✓ discret |
| /la-maison home §4 — ligne d'accentuation | `src/app/la-maison/page.tsx` | 158 | `h-px w-12 bg-foreground-accent-water` | ✓ décoration intentionnelle |
| CrossSellingBlock — filet haut section | `src/components/sections/CrossSellingBlock.tsx` | 58 | `border-t border-border-muted` | ✓ |
| Jardins services — bordure gauche | `src/app/jardins-paysage/page.tsx` | 109 | `border-l-2 border-border-default` | ✓ intentionnel |
| Prescripteurs preuves — liste filets | `src/app/prescripteurs/page.tsx` | 209 | `divide-y divide-border` | ✓ |
| Contact wrapper formulaire | `src/app/contact/page.tsx` | — | aucune border visible (bg only) | ✓ |
| PhotoPlaceholder | `src/components/ui/PhotoPlaceholder.tsx` | 33 | `border border-border` | ✓ |

**Synthèse bordures** : gamme cohérente. Aucune déviation P0/P1/P2 détectée. Les 3 tokens utilisés (`border`, `border-muted`, `sand-800` sur fond sombre) sont justifiés contextuellement.

---

## FAMILLE 3 — OMBRES (shadow-*)

### Règle tranchée

**Une seule ombre active sur le site : `shadow-lg` sur la NavBar sticky (`shadow-lg` sur le `<header>`).**  
Toutes les autres sections, cards et figures : **zéro shadow** — le registre premium repose sur l'espace négatif et les filets, pas les ombres. Le drawer utilise `shadow-2xl` comme ombre de profondeur (layer system — justifié).

### Inventaire exhaustif — OMBRES

| Composant / Page | Fichier | Ligne(s) | Valeur actuelle | Conformité |
|---|---|---|---|---|
| NavBar sticky | `src/components/layout/NavBar.tsx` | 80 | `shadow-lg` | ✓ justifié (séparation sticky layer) |
| NavBar drawer panel | `src/components/layout/NavBar.tsx` | 155 | `shadow-2xl` | ✓ justifié (layer drawer au-dessus de l'overlay) |
| RealisationCard | `src/components/sections/RealisationCard.tsx` | — | aucune shadow | ✓ |
| OuvrageCard | `src/components/sections/OuvrageCard.tsx` | — | aucune shadow | ✓ |
| CrossSellingBlock | `src/components/sections/CrossSellingBlock.tsx` | — | aucune shadow | ✓ |
| Button / ButtonLink | `src/components/ui/Button.tsx` | — | aucune shadow | ✓ |
| Contact formulaire wrapper | `src/app/contact/page.tsx` | 77 | aucune shadow (bg only) | ✓ |
| PhotoPlaceholder | `src/components/ui/PhotoPlaceholder.tsx` | — | aucune shadow | ✓ |

**Synthèse ombres** : cohérence totale. Aucune déviation.

---

## FAMILLE 4 — TRAITEMENTS D'IMAGE

### Règle tranchée

- **object-fit** : `object-cover` partout sans exception (aucune image en `contain`)
- **Hover zoom** : `group-hover:scale-[1.03]` uniquement sur `RealisationCard` (les cards sont cliquables, le zoom est un signal interactif). Aucun hover zoom sur les figures non-interactives (MediaSplit, OuvrageCard, CrossSellingBlock) — conforme registre premium
- **Ratios par usage** :
  - Hero full-bleed : ratio libre (`min-h-[85svh]`), pas de ratio fixe — correct
  - Split hero (/la-maison, /prescripteurs) : colonne libre (`min-h-full`) — correct
  - Figures illustratives (MediaSplit) : `aspect-[3/2]`
  - Cards portfolio (RealisationCard) : `aspect-[4/3]`
  - Cards ouvrages (OuvrageCard) : `aspect-[4/3]`
  - Photo principale fiche : `aspect-video` (16/9)
  - Photos secondaires fiche : `aspect-[4/3]`
  - Section home §2 — **les deux photos** : `aspect-square`
  - CrossSellingBlock mobile : `aspect-[4/3]`
  - Photo portrait : `h-40 w-40` (160px carré)
- **Légendes/captions** : `text-xs leading-5 text-foreground-muted` — style unique, cohérent sur toutes les occurrences (fiche réalisation, /la-maison LTE)

### Inventaire exhaustif — TRAITEMENTS IMAGE

| Composant / Page | Fichier | Ligne(s) | Ratio | object-fit | Hover zoom | Conformité |
|---|---|---|---|---|---|---|
| Hero | `src/components/sections/Hero.tsx` | 88 | libre (svh) | `object-cover` | non | ✓ |
| Home §2 — image AS | `src/app/page.tsx` | 85 | `aspect-square` | `object-cover` | non | ✓ |
| Home §2 — figure LTE | `src/app/page.tsx` | 121 | `aspect-square` (via parent) | `object-cover` | non | ✓ ratio OK — problème = rayon (P0 ci-dessus) |
| MediaSplit figure | `src/components/sections/MediaSplit.tsx` | 82 | `aspect-[3/2]` | `object-cover` | non | ✓ |
| CrossSellingBlock figure | `src/components/sections/CrossSellingBlock.tsx` | 60 | `aspect-[4/3]` mob / `min-h-[420px]` desktop | `object-cover` | non | ✓ ratio logique |
| OuvrageCard figure | `src/components/sections/OuvrageCard.tsx` | 27 | `aspect-[4/3]` | `object-cover` | non | ✓ |
| RealisationCard div photo | `src/components/sections/RealisationCard.tsx` | 38 | `aspect-[4/3]` | `object-cover` | `scale-[1.03]` ✓ | ✓ |
| Fiche — photo principale | `src/app/realisations/[slug]/page.tsx` | 116 | `aspect-video` | `object-cover` | non | ✓ |
| Fiche — photos secondaires | `src/app/realisations/[slug]/page.tsx` | 134 | `aspect-[4/3]` | `object-cover` | non | ✓ cohérent |
| /la-maison §1 hero figure | `src/app/la-maison/page.tsx` | 160 | `min-h-full` | `object-cover` | non | ✓ split hero |
| /la-maison §2 portrait | `src/app/la-maison/page.tsx` | 199 | 160×160px | `object-cover` | non | ✓ avatar |
| /la-maison §4 figure LTE | `src/app/la-maison/page.tsx` | 383–392 | `aspect-[4/3]` | `object-cover` | non | ✓ |
| /la-maison §7 pleine largeur | `src/app/la-maison/page.tsx` | 474–482 | `h-[280px] md:h-[480px]` | `object-cover` | non | ✓ bande cinématique intentionnelle |
| /prescripteurs hero figure | `src/app/prescripteurs/page.tsx` | 158 | `min-h-full` | `object-cover` | non | ✓ split hero |
| Légende fiche principale | `src/app/realisations/[slug]/page.tsx` | 126 | — | — | — | `text-sm text-foreground-muted` |
| Légende /la-maison LTE | `src/app/la-maison/page.tsx` | 394 | — | — | — | `text-xs leading-5 text-foreground-muted` |

**Déviation P2 — légendes :**
- Fiche réalisation ligne 126 : `text-sm text-foreground-muted` (pas de `leading-5`)
- /la-maison ligne 394 : `text-xs leading-5 text-foreground-muted`
- **Fix** : aligner sur `text-xs leading-5 text-foreground-muted` partout (la version xs est plus sobre et premium).

| Déviation | Fichier | Ligne | Actuel | Cible | Priorité |
|---|---|---|---|---|---|
| Légende fiche réalisation | `src/app/realisations/[slug]/page.tsx` | 126 | `text-sm text-foreground-muted` | `text-xs leading-5 text-foreground-muted` | P2 |

---

## FAMILLE 5 — ICONOGRAPHIE (Lucide)

### Règle tranchée

- **Navigation principale (hamburger, X drawer)** : `h-6 w-6`, stroke Lucide par défaut (1.5)
- **Icônes de contenu (ArrowRight dans les liens, ArrowLeft, ChevronDown FAQ, CheckCircle fiche)** : `h-4 w-4`, stroke défaut
- **Icônes de contact/coordonnées (MapPin, Phone, Mail)** : `h-4 w-4`, stroke défaut
- **Icônes réseaux sociaux footer** : `h-5 w-5`, stroke défaut
- **Icône PhotoPlaceholder** : `h-8 w-8`, `strokeWidth={1.25}` (intentionnel — discret, fond placeholder)
- **Icône FAQ** : `h-5 w-5`, ChevronDown, stroke défaut
- **Icône erreur formulaire** : `h-3.5 w-3.5`, AlertCircle
- **Icône loading** : `h-4 w-4`, Loader2

### Inventaire exhaustif — ICONOGRAPHIE

| Contexte | Fichier | Icône | Taille | Stroke | Conformité |
|---|---|---|---|---|---|
| Hamburger nav | `NavBar.tsx` L134 | Menu | `h-6 w-6` | défaut | ✓ |
| Fermeture drawer | `NavBar.tsx` L163 | X | `h-6 w-6` | défaut | ✓ |
| Liens inline (ArrowRight) | `page.tsx` L108, L150 + partout | ArrowRight | `h-4 w-4` | défaut | ✓ |
| Retour réalisations | `[slug]/page.tsx` L103 | ArrowLeft | `h-4 w-4` | défaut | ✓ |
| 404 retour | `not-found.tsx` L32 | ArrowLeft | `h-4 w-4` | défaut | ✓ |
| FAQ chevron | `FaqSection.tsx` L53 | ChevronDown | `h-5 w-5` | défaut | ✓ |
| Select chevron | `FormField.tsx` L250 | ChevronDown | `h-4 w-4` | défaut | **P2 — incohérence de taille avec FAQ chevron (h-5 vs h-4). Contexte différent, tolérable.** |
| Erreur formulaire | `FormField.tsx` L88 | AlertCircle | `h-3.5 w-3.5` | défaut | ✓ contextuel |
| Loading bouton | `Button.tsx` L79 | Loader2 | `h-4 w-4` | défaut | ✓ |
| MapPin coordonnées | `Footer.tsx` L104, `la-maison/page.tsx` L325 | MapPin | `h-4 w-4` | défaut | ✓ |
| Phone coordonnées | `Footer.tsx` L114, contact, la-maison | Phone | `h-4 w-4` | défaut | ✓ |
| Mail coordonnées | `Footer.tsx` L118, contact, la-maison | Mail | `h-4 w-4` | défaut | ✓ |
| LinkedIn footer | `Footer.tsx` L83 | Linkedin | `h-5 w-5` | défaut | ✓ |
| Facebook footer | `Footer.tsx` L91 | Facebook | `h-5 w-5` | défaut | ✓ |
| CheckCircle fiche | `[slug]/page.tsx` L168 | CheckCircle | `h-4 w-4` | défaut | ✓ |
| PhotoPlaceholder | `PhotoPlaceholder.tsx` L40 | ImageIcon | `h-8 w-8` | `1.25` | ✓ intentionnel |

**Synthèse iconographie** : très cohérent. Règle de tailles bien établie (6 nav / 5 réseaux/FAQ / 4 contenu / 3.5 erreur). Aucune déviation P0/P1.

---

## FAMILLE 6 — ÉTATS INTERACTIFS (hover/focus)

### Règle tranchée

- **Focus-visible** : `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2` — uniforme sur tous les éléments interactifs fond clair
- **Focus-visible inverse** (fond sombre) : `focus-visible:ring-[var(--color-focus-ring-inverse)]` — uniforme footer, drawer overlay, SectionCTA
- **Hover liens texte** : `hover:underline` avec `underline-offset-4` — uniforme
- **Hover bouton primary** : `hover:bg-action-primary-hover` via token — uniforme
- **Hover cards interactives (RealisationCard)** : `group-hover:scale-[1.03]` photo + `group-hover:translate-x-1` flèche — cohérent
- **Hover liens inline ArrowRight** : `group-hover:translate-x-1` — uniforme sur tous les liens avec flèche
- **Transition** : `transition-colors duration-fast` (150ms) pour couleurs, `transition-transform duration-normal` (300ms) pour transforms

### Inventaire exhaustif — ÉTATS INTERACTIFS

| Composant | Fichier | Focus-ring | Hover | Transition | Conformité |
|---|---|---|---|---|---|
| Button.tsx | `Button.tsx` L66–70 | `ring-[var(--color-focus-ring)]` / inverse | bg-token | `duration-fast` | ✓ |
| ButtonLink.tsx | (wraps Button) | — identique | — identique | — identique | ✓ |
| NavBar liens desktop | `NavBar.tsx` L100 | `ring-[var(--color-focus-ring)]` | `hover:underline` | — | ✓ |
| NavBar hamburger | `NavBar.tsx` L133 | `ring-[var(--color-focus-ring)]` | — | — | ✓ |
| NavBar liens drawer | `NavBar.tsx` L178 | `ring-[var(--color-focus-ring)]` | — | — | ✓ |
| NavBar fermeture drawer | `NavBar.tsx` L163 | `ring-[var(--color-focus-ring)]` | `hover:text-foreground` | `transition-colors` | ✓ |
| RealisationCard (lien racine) | `RealisationCard.tsx` L36 | `ring-[var(--color-focus-ring)]` | `scale-[1.03]` photo | `duration-normal` | ✓ |
| Liens ArrowRight inline (/home) | `page.tsx` L105, L144 | `ring-[var(--color-focus-ring)]` (water/forest) | `hover:underline` + flèche translate | — | ✓ |
| Liens ArrowRight CrossSelling | `CrossSellingBlock.tsx` L86 | `ring-[var/forest]` | `hover:underline` + translate | — | ✓ |
| FaqSection details/summary | `FaqSection.tsx` L49 | `ring-[var(--color-focus-ring)]` | — (natif details) | `transition-transform` | ✓ |
| Footer liens | `Footer.tsx` L39 | `ring-[var(--color-focus-ring-inverse)]` | `hover:text-foreground-inverse hover:underline` | — | ✓ |
| Footer icônes sociales | `Footer.tsx` L81, 89 | `ring-[var(--color-focus-ring-inverse)]` | `hover:text-foreground-inverse` | `transition-colors` | ✓ |
| Chip | `Chip.tsx` L29 | `ring-[var(--color-focus-ring)]` | `hover:bg-background-tertiary` | `duration-fast` | ✓ |
| FilterPill RealisationsGrid | `RealisationsGrid.tsx` L88 | `ring-[var(--color-focus-ring)]` | `hover:border-border-strong` | `duration-fast` | ✓ |
| FormField input/textarea/select | `FormField.tsx` L29–31 | `ring-[var(--color-focus-ring)]` | — (focus:border-action-primary) | `duration-fast` | ✓ |
| Contact liens coordonnées | `contact/page.tsx` L50, 58 | — (manquant) | `hover:text-foreground` | — | **P2 — focus-visible absent sur les liens téléphone/email de /contact** |
| /la-maison liens coordonnées | `la-maison/page.tsx` L334, 342 | — (manquant) | `hover:underline` | — | **P2 — même problème, focus-visible absent** |

**Déviations états interactifs :**

| Déviation | Fichier | Ligne(s) | Actuel | Cible | Priorité |
|---|---|---|---|---|---|
| Liens tel/mailto /contact sans focus-visible | `src/app/contact/page.tsx` | 49–64 | `hover:text-foreground` seul | ajouter `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2` | P2 |
| Liens tel/mailto /la-maison sans focus-visible | `src/app/la-maison/page.tsx` | 334–344 | `underline-offset-2 hover:underline` | ajouter le ring focus-visible | P2 |

---

## TABLEAU DE SYNTHÈSE DES DÉVIATIONS

### P0 — Incohérence visible sur le même écran (cas fondateur)

| # | Description | Fichier | Ligne | Actuel | Fix |
|---|---|---|---|---|---|
| P0-1 | Section home §2 : image AS avec `rounded-lg`, figure LTE sans rayon — incohérence côte à côte sur le même viewport | `src/app/page.tsx` | 121 | `<figure className="relative aspect-square w-full overflow-hidden">` | `<figure className="relative aspect-square w-full overflow-hidden rounded-lg">` |

### P1 — Incohérence entre pages ou composants

| # | Description | Fichier | Ligne | Actuel | Fix |
|---|---|---|---|---|---|
| P1-1 | CrossSellingBlock figure sans rayon mobile (il en a sur MediaSplit, OuvrageCard) | `src/components/sections/CrossSellingBlock.tsx` | 60 | `className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px]"` | ajouter `rounded-lg lg:rounded-none` (full-bleed desktop préservé) |

### P2 — Micro-incohérences (polish, non bloquantes)

| # | Description | Fichier | Ligne | Actuel | Fix |
|---|---|---|---|---|---|
| P2-1 | Légende photo fiche réalisation en `text-sm` vs `text-xs` sur /la-maison | `src/app/realisations/[slug]/page.tsx` | 126 | `className="mt-3 text-sm text-foreground-muted"` | `className="mt-3 text-xs leading-5 text-foreground-muted"` |
| P2-2 | Liens tel/mailto /contact sans focus-visible ring (a11y) | `src/app/contact/page.tsx` | 48–64 | `className="hover:text-foreground"` | ajouter `rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2` |
| P2-3 | Liens tel/mailto /la-maison sans focus-visible ring (a11y) | `src/app/la-maison/page.tsx` | 334, 342 | `className="underline-offset-2 hover:underline"` | ajouter `rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2` |

---

## RÈGLES PAR FAMILLE (référence @fullstack)

1. **Rayons** : images/figures/cards = `rounded-lg`. Exception documentée : full-bleed col droite des split heroes (`/la-maison §1`, `/prescripteurs §hero`) et photos bande pleine largeur = `rounded-none`. Boutons = `rounded-md`. Pills/chips = `rounded-full`. Avatars = `rounded-full`.

2. **Bordures** : trois tokens autorisés — `border-border` (séparation standard), `border-border-muted` (discret/drawer), `border-sand-800` (fond sombre footer). Aucune valeur arbitraire. Bordure gauche intentionnelle `border-l-2 border-border-default` sur les services-cards jardins — exception documentée.

3. **Ombres** : `shadow-lg` NavBar sticky uniquement. `shadow-2xl` drawer (layer system). Zéro shadow sur cards, figures, sections.

4. **Images** : `object-cover` universel. Zoom hover (`scale-[1.03]`) réservé aux cards cliquables. Ratios — `aspect-[4/3]` cards/figures de contenu, `aspect-[3/2]` MediaSplit, `aspect-video` photo principale fiche, `aspect-square` duo home §2. Captions : `text-xs leading-5 text-foreground-muted` partout.

5. **Icônes Lucide** : 4 tailles — `h-6 w-6` nav, `h-5 w-5` réseaux/FAQ, `h-4 w-4` contenu/coordonnées, `h-3.5 w-3.5` erreur formulaire. Stroke défaut sauf PhotoPlaceholder (`1.25`). Aucune icône seule sans `aria-hidden` + alternative textuelle.

6. **États interactifs** : focus-ring = `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2` universel (fond clair). Variante inverse sur fond sombre. Hover liens = `hover:underline underline-offset-4`. Hover transforms = `duration-normal` (300ms). Hover couleurs = `duration-fast` (150ms).

---

*Audit produit par @design — 2026-06-12. Fix à appliquer par @fullstack (lot dédié). 1 déviation P0, 1 P1, 3 P2.*
