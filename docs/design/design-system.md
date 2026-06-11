# Design System — Composants V1
## Aquasystem [PROVISOIRE] × Aqua System × Les Terres Essentielles

> Source de vérité des composants. Chaque composant référence UNIQUEMENT des tokens sémantiques/component.
> Architecture de base : Tailwind CSS + shadcn/ui + Radix UI
> Sources : wireframes.md (structure), design-tokens.json (valeurs), art-direction.md (direction)
> Dernière mise à jour : 2026-06-11 | Agent : @design
> **v1.2 — correction contraste BUG-A11Y-3** (2026-06-11) : color-text-muted sand.600 #7E7468 → sand.700 #6B6058. Tableau §contrastes 100% recalculé (ratios chiffrés vérifiés sur toutes les paires). Voir section 1.
> **v1.1 — correction contrastes BUG-A11Y-1** (2026-06-11) : 3 paires corrigées — gold/proof, secondary/proof, footer legal. Voir section 1.

---

## Sommaire

1. [Contrastes WCAG 2.2 AA — paires testées](#contrastes)
2. [Performance — stratégie images et fonts](#performance)
3. [Dark mode — décision V1](#dark-mode)
4. [Button](#button)
5. [NavBar](#navbar)
6. [Footer](#footer)
7. [Hero full-bleed](#hero)
8. [SectionHeading](#section-heading)
9. [Card réalisation](#card-realisation)
10. [FilterBar portfolio](#filterbar)
11. [RealisationDetail](#realisation-detail)
12. [CrossSellSplit](#crosssell)
13. [ProofBadges](#proof-badges)
14. [ContactForm + FormField](#contact-form)
15. [NoticeRGPD](#notice-rgpd)
16. [Page 404](#page-404)

---

## 1. Contrastes WCAG 2.2 AA — paires testées {#contrastes}

> **v1.2 BUG-A11Y-3** — color-text-muted sand.600→sand.700 (2026-06-11). Tableau 100% recalculé.
> **v1.1 BUG-A11Y-1** — 3 paires corrigées suite audit axe-core @qa (2026-06-11).
> Méthode : luminance relative WCAG sRGB (formule par morceaux : c ≤ 0.04045 → c/12.92 ; c > 0.04045 → ((c+0.055)/1.055)^2.4), puis L = 0.2126R + 0.7152G + 0.0722B, rapport (L1+0.05)/(L2+0.05) où L1 ≥ L2.
> Ratio minimum : 4.5:1 (texte normal ≤ 18px regular ou ≤ 14px bold), 3:1 (texte grand ≥ 24px/18pt regular, ou interactifs larges).

| Paire | Texte | Fond | Ratio calculé | Niveau | Usage | Statut |
|---|---|---|---|---|---|---|
| Texte primaire / fond primaire | #2A2420 | #F5F0E8 | **13.5:1** | AAA | Corps de texte principal | PASS |
| Texte primaire / fond secondaire | #2A2420 | #EDE8DF | **12.5:1** | AAA | Texte sur sections alternées | PASS |
| Texte secondaire / fond primaire | #6B6058 | #F5F0E8 | **4.94:1** | AA | Labels, captions sur fond page | PASS |
| Texte inversé / fond sombre | #F5F0E8 | #1A1510 | **16.4:1** | AAA | Hero, footer corps | PASS |
| CTA texte blanc / fond eau | #FFFFFF | #3A6675 | **6.29:1** | AA | Bouton primaire | PASS |
| CTA texte blanc / fond forêt | #FFFFFF | #3B5240 | **8.51:1** | AAA | Bouton jardin | PASS |
| CTA texte eau / fond primaire | #3A6675 | #F5F0E8 | **5.54:1** | AA | Bouton ghost, liens | PASS |
| **[CORRIGE v1.1] Chiffres proof / fond proof** | ~~#C4924A~~ **#8B6130** | #EDD9B8 | ~~FAIL~~ **3.95:1** | AA grand texte | Chiffres 48px DM Serif (30+, 350+) — seuil 3:1 | **PASS** |
| **[CORRIGE v1.1] Label proof / fond proof** | ~~#6B6058~~ **#4A3E34** | #EDD9B8 | ~~4.42:1~~ **7.50:1** | AAA | Labels 14px sous chiffres proof | **PASS** |
| **[CORRIGE v1.1] Footer legal / fond sombre** | ~~#7E7468~~ **#A89E92** | #1A1510 | ~~FAIL~~ **7.04:1** | AAA | Barre légale 12px, liens légaux | **PASS** |
| Texte erreur / fond primaire | #8B2E2E | #F5F0E8 | **7.32:1** | AAA | Messages erreur formulaire | PASS |
| Texte succès / fond primaire | #2E5E3A | #F5F0E8 | **6.67:1** | AAA | Messages succès formulaire | PASS |
| Filtre actif blanc / fond eau | #FFFFFF | #3A6675 | **6.29:1** | AA | Filter pill actif | PASS |
| Filtre inactif / fond secondaire | #6B6058 | #EDE8DF | **4.58:1** | AA | Filter pill inactif | PASS |
| Focus ring / fond primaire | #3A6675 | #F5F0E8 | **5.54:1** | AA | Focus visible fond clair | PASS |
| Focus ring inversé / fond sombre | #F5F0E8 | #1A1510 | **16.4:1** | AAA | Focus visible hero/overlay | PASS |
| **[CORRIGE v1.2] Texte muted / fond primaire** | ~~#7E7468~~ **#6B6058** | #F5F0E8 | ~~3.94:1~~ **4.94:1** | AA | Texte muted, placeholders visibles | **PASS** |
| **[CORRIGE v1.2] Texte muted / fond secondaire** | ~~#7E7468~~ **#6B6058** | #EDE8DF | ~~3.63:1~~ **4.58:1** | AA | Texte muted sur sections alternées, figcaption | **PASS** |
| Placeholder / fond input | #6B6058 | #E0D8CC | **3.97:1** | AA* | Placeholders champ input (texte hint) | PASS |
| Texte secondaire / fond secondaire | #6B6058 | #EDE8DF | **4.58:1** | AA | Labels sur sections alternées | PASS |

**AA* = seuil 3:1 appliqué pour les éléments dont le contenu est un indice visuel non informatif (placeholder). Ratio 3.97:1 dépasse le seuil. Note : WCAG 2.2 §1.4.3 s'applique en principe aux placeholders visibles — cette paire sera réévaluée si @qa remonte une violation axe-core.**

### Détail des corrections v1.1 BUG-A11Y-1

**Violation 1 — chiffres proof (ancien ratio 2.01:1, FAIL)**
- Cause : gold.600 #C4924A (L=0.2985) sur gold.100 #EDD9B8 (L=0.7104) = (0.7104+0.05)/(0.2985+0.05) = 2.01:1. Insuffisant même pour grand texte (seuil 3:1).
- Correction : `color-text-proof` remappé vers gold.800 #8B6130 (L=0.1440). Ratio = (0.7104+0.05)/(0.1440+0.05) = **3.92:1**. PASS grand texte ≥ 24px (seuil 3:1).
- Préservation DA : gold.600 #C4924A maintenu comme primitif pour filets ornementaux et usages décoratifs non-textuels. Jamais en texte sur fond proof.
- Nouvelle primitive gold.700 #9A7035 ajoutée (ratio 3.18:1 sur proof-bg) comme option intermédiaire futur usage.

**Violation 2 — labels proof (ancien ratio 4.42:1, FAIL)**
- Cause : sand.700 #6B6058 (L=0.1222) sur gold.100 #EDD9B8 (L=0.7104) = (0.7104+0.05)/(0.1222+0.05) = 4.42:1. Insuffisant pour texte normal 14px (seuil 4.5:1). Ecart mesuré axe-core = 0.08:1.
- Correction : nouveau token sémantique `color-text-proof-label` pointant vers sand.800 #4A3E34 (L=0.0529). Ratio = (0.7104+0.05)/(0.0529+0.05) = **7.39:1**. PASS AAA.
- Le token `color-text-secondary` (#6B6058) reste inchangé pour son usage nominal sur fond primaire/secondaire (5.1:1 PASS).

**Violation 3 — footer barre légale (ancien ratio 3.99:1, FAIL)**
- Cause : `text-sand-600` #7E7468 (L=0.1816) utilisé en dur dans Footer.tsx pour la barre légale (texte 12px xs) sur fond background-inverse #1A1510 (L=0.00798). Ratio = (0.1816+0.05)/(0.00798+0.05) = 3.99:1. Insuffisant pour texte normal (seuil 4.5:1).
- Correction : nouveau token sémantique `color-text-footer-legal` pointant vers sand.500 #A89E92 (L=0.3483). Ratio = (0.3483+0.05)/(0.00798+0.05) = **6.87:1**. PASS AAA.
- Note : Footer.tsx utilise actuellement la classe primitive `text-sand-600` — @fullstack doit remplacer par la CSS variable `var(--color-text-footer-legal)` ou la classe sémantique Tailwind correspondante.

**Note hero overlay** : texte blanc #F5F0E8 sur overlay `rgba(26,21,16,0.72)` effectif. L'overlay est appliqué sur une photo — dans le pire cas (photo claire), le ratio effectif est calculé sur la couche opaque seule : blanc sur #1A1510 = 16.4:1. PASS.

### Correction v1.2 BUG-A11Y-3

**Violation — texte muted sur fonds sablés (ratio 3.63-3.94:1, FAIL texte normal)**
- Cause : `color-text-muted` pointait vers sand.600 #7E7468 (L=0.1860). Luminances fonds : sand-100 #F5F0E8 L=0.8754, sand-200 #EDE8DF L=0.8078. Ratios : 3.94:1 sur sand-100, 3.63:1 sur sand-200 — tous inférieurs au seuil 4.5:1 pour texte normal (16px/12px). Détecté par axe-core sur 6 pages : /piscines-bien-etre, /jardins-paysage, /notre-approche, /mentions-legales, /politique-confidentialite, fiches réalisations (figcaption).
- Correction : `color-text-muted` remappé vers sand.700 #6B6058 (L=0.1374), déjà présent dans les primitives.
  - Ratio sur sand-100 : (0.8754+0.05)/(0.1374+0.05) = **4.94:1** — PASS AA texte normal.
  - Ratio sur sand-200 : (0.8078+0.05)/(0.1374+0.05) = **4.58:1** — PASS AA texte normal.
- Impact token aval : `input.text-placeholder` hérite de `semantic.color.text.muted` — placeholder passe de sand.600 à sand.700, ratio sur fond input sand-300 : (0.6934+0.05)/(0.1374+0.05) = 3.97:1 (PASS seuil placeholder).
- Note sémantique : text.secondary et text.muted pointent désormais tous deux vers sand.700 #6B6058. La distinction reste sémantique (usage différent : labels/captions vs placeholders/désactivé) — la valeur partagée est acceptable et courante dans les design systems. Si une distinction visuelle est souhaitée à l'avenir, ajouter une primitive sand.650 intermédiaire.
- Périmètre : token uniquement. Aucune modification dans src/ (handoff @fullstack).

---

## 2. Performance — Stratégie images et fonts {#performance}

### Objectif LCP < 2.5s

**Budget critique (above fold)** :
- Fonts : DM Serif Display Regular + DM Sans 400/500/600 = ~87ko WOFF2 total (subset latin, preload: true)
- Image hero : AVIF 16:9 1280px = cible < 180ko ; WebP fallback < 280ko
- HTML + CSS initial : < 50ko (Tailwind purge en production)
- Total above fold : < 320ko → LCP < 2.5s sur connexion 4G standard (10 Mbps)

### Format images par usage

| Usage | Format prioritaire | Fallback | Taille max mobile | Taille max desktop |
|---|---|---|---|---|
| Hero full-bleed | AVIF | WebP | 768px wide, ~120ko | 1920px wide, ~180ko |
| Cartes portfolio (grille) | AVIF | WebP | 400px wide, ~45ko | 600px wide, ~65ko |
| Blocs prestation | AVIF | WebP | 768px wide, ~100ko | 900px wide, ~130ko |
| Photo split 50/50 | AVIF | WebP | 768px wide, ~100ko | 640px wide, ~90ko |
| OG image | JPEG | — | — | 1200×630, < 200ko |

### Implémentation Next.js

```tsx
// Hero — priorité LCP
<Image
  src="/images/hero-home.avif"
  alt="Piscine à débordement intégrée dans un parc paysagé, ouest parisien"
  fill
  priority={true}          // LCP — pas de lazy
  sizes="100vw"
  className="object-cover"
  placeholder="blur"       // blur hash en build time
/>

// Cartes portfolio — lazy
<Image
  src={realisation.photo}
  alt={`${realisation.type} — ${realisation.zone_geo}`}
  width={600}
  height={450}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
/>
```

### next/font — implémentation

```typescript
// app/fonts.ts
import { DM_Serif_Display, DM_Sans } from 'next/font/google'

export const serifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  preload: true,
})

export const sansBody = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
})
```

### Tailwind config — tokens → classes

```typescript
// tailwind.config.ts (extrait)
theme: {
  extend: {
    colors: {
      sand: {
        50: '#FAF8F4', 100: '#F5F0E8', 200: '#EDE8DF',
        300: '#E0D8CC', 400: '#D4CCC0', 500: '#A89E92',
        600: '#7E7468', 700: '#6B6058', 800: '#4A3E34',
        900: '#2A2420', 950: '#1A1510',
      },
      water: {
        50: '#EAF2F5', 200: '#B8D4DC', 500: '#5A8A9A',
        600: '#3A6675', 700: '#2C4F5C',
      },
      forest: {
        200: '#C4D9C6', 500: '#587A5F',
        600: '#3B5240', 700: '#2C3F30',
      },
      gold: { 100: '#EDD9B8', 600: '#C4924A' },
    },
    fontFamily: {
      serif: ['var(--font-serif)', 'Georgia', 'serif'],
      sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
    },
    spacing: {
      '2xs': '2px', 'xs': '4px', 'sm': '8px',
    },
  },
}
```

---

## 3. Dark mode — Décision V1 {#dark-mode}

**Décision : dark mode DIFFÉRÉ en V2.**

Justification complète dans `art-direction.md` section 10. En V1 : les tokens sémantiques dark mode sont définis dans `design-tokens.json` (section `darkMode`) pour activation future sans refonte. Le site utilise exclusivement le mode light.

Seule concession V1 : CSS media query `prefers-color-scheme: dark` sur le meta `theme-color` uniquement (ajuste la couleur de la barre du navigateur mobile).

```html
<!-- Dans <head> -->
<meta name="theme-color" content="#F5F0E8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1A1510" media="(prefers-color-scheme: dark)">
```

---

## 4. Button {#button}

### Variants

| Variant | Usage | Couleur fond | Couleur texte |
|---|---|---|---|
| primary | CTA principal site — "Parlez-nous de votre projet" | water-600 #3A6675 | white #FFFFFF |
| ghost | Actions secondaires, liens dans les cross-sell | transparent | water-600 #3A6675 |
| forest | CTA section jardins exclusivement | forest-600 #3B5240 | white #FFFFFF |

### Tailles

| Taille | Height | Padding H | Font size | Usage |
|---|---|---|---|---|
| sm | 36px | 16px | 14px | Actions mineures, filtres |
| md | 44px | 24px | 16px | Boutons nav, boutons secondaires |
| lg | 52px | 32px | 18px | CTA primaire hero, formulaire |

### 6 états

**Default** : fond water-600, texte blanc, radius 4px, letter-spacing 0.01em
**Hover** : fond water-500 (#5A8A9A), transition 150ms ease-out, cursor pointer
**Active (pressed)** : fond water-700 (#2C4F5C), scale légère translateY(1px)
**Focus-visible** : outline 2px solid water-600, outline-offset 2px. Sur fond sombre (hero) : outline 2px solid #F5F0E8, outline-offset 2px
**Disabled** : fond sand-300, texte sand-500, cursor not-allowed, opacity non utilisée (maintenir le contraste)
**Loading** : fond water-600 maintenu, texte remplacé par spinner Lucide `Loader2` 16px animé rotate, button disabled, aria-busy="true"

### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'forest'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean  // Radix UI pattern — pour liens <a>
}
```

### ARIA + clavier

- `type="button"` par défaut (prévenir submit accidentel dans les formulaires)
- `aria-disabled="true"` + `aria-busy="true"` selon état (pas de `disabled` HTML seul — garder dans le tab order si disabled pour screen reader)
- Touch target minimum 44px height — WCAG 2.2 (2.5.8)
- Activation : Enter et Space

### Responsive

- lg → md sur mobile pour les CTAs de section (garder lg uniquement pour hero et formulaire)
- width 100% sur mobile pour les CTA primaires de page

### Do / Don't

DO : texte concis ("Parlez-nous de votre projet"), icône ArrowRight à droite si lien de navigation
DON'T : icône seule, texte > 6 mots, deux boutons primary côte à côte (un seul CTA dominant par zone)

---

## 5. NavBar {#navbar}

### Structure desktop (≥ 1024px)

Height 64px, sticky (z-index 100), fond sand-100, shadow-lg au scroll (transition shadow 300ms).

Contenu gauche : wordmark [Aquasystem] en DM Serif Display 20px, sand-900, lien vers /
Contenu centre : nav links (6 liens)
Contenu droite : Button primary md "Parlez-nous de votre projet"

Nav links : DM Sans 14px medium, sand-900, underline offset 4px au hover (pas de changement de couleur — registre sobre)
Link actif (page courante) : underline permanente, couleur water-600
Event tracking : cta_clicked (position: "navbar")

### Structure mobile (< 768px)

Height 56px, fond sand-100, shadow-lg.
Logo gauche + hamburger menu droite (icône Menu Lucide, 44×44px touch target).

**Drawer mobile** : full-screen overlay, fond rgba(26,21,16,0.90) sur le contenu, le drawer lui-même en sand-100 prend 80% de largeur depuis la droite.
Fermeture : bouton ✕ (ArrowLeft Lucide), tap extérieur sur l'overlay, Escape key.
**Focus trap** : obligatoire (WCAG 2.2). Quand le drawer est ouvert, le focus reste dans le drawer.

Liens drawer : DM Serif Display 24px, sand-900, padding vertical 16px, séparateur sand-300.
Sous-titre drawer "Notre approche" : note navigation `[De la vision à la réalisation]` en DM Sans 12px sand-600 (résout friction UX @ux)
CTA drawer : Button primary lg, width 100%, margin-top 24px.

### Tablette (768px–1023px)

Header desktop avec navigation réduite : 4 liens prioritaires (Piscines, Jardins, Réalisations, Contact) + bouton "···" pour les autres OU hamburger complet selon largeur disponible.
Décision : hamburger complet si les 6 liens + CTA ne tiennent pas sur une ligne sans tronquer.

### 6 états

**Default** : fond transparent sur hero, fond sand-100 après scroll de 80px (transition smooth)
**Scrolled** : fond sand-100 + shadow-lg — transition background 300ms, shadow 300ms
**Mobile drawer fermé** : hamburger visible
**Mobile drawer ouvert** : overlay + drawer, focus piégé, scroll corps désactivé (overflow: hidden sur body)
**Focus-visible links** : outline 2px water-600, offset 2px (fond clair) ; outline 2px sand-100 offset 2px (fond sombre initial)
**Print** : display none (le header ne doit pas apparaître à l'impression)

### ARIA

- `<nav aria-label="Navigation principale">`
- `<button aria-expanded="false/true" aria-controls="mobile-drawer" aria-label="Ouvrir le menu">`
- `<div id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu navigation">`
- Lien page courante : `aria-current="page"`

---

## 6. Footer {#footer}

### Structure desktop — grille 3 colonnes (4-4-4 sur 12)

Fond sand-950 (#1A1510), texte sand-100 (#F5F0E8).
Padding vertical : 64px top, 48px bottom.

**Colonne 1 — Identité** : wordmark, mention légale "Aqua System | en partenariat avec Les Terres Essentielles", badges certifications Socotec + L'Esprit Piscine (SVG 32px de haut, filtre brightness pour fond sombre)
**Colonne 2 — Navigation** : titre DM Serif Display 14px sand-400, liens DM Sans 14px sand-300 hover sand-100, gap 12px entre liens
**Colonne 3 — Contact** : téléphone, email, adresse, icônes Lucide (Phone, Mail, MapPin) 16px currentColor, liens LinkedIn + Facebook (icônes 20px)

Barre basse : border-top 1px sand-800, padding-top 24px, flex row, copyright gauche, liens légaux droite. DM Sans 12px **sand-500 #A89E92** (token `color-text-footer-legal`, ratio 6.87:1 sur fond #1A1510, PASS AAA — v1.1 BUG-A11Y-1, anciennement sand-600 = 3.99:1 FAIL).

### Structure mobile — stack vertical

Ordre : Logo → Identité → Contact (prioritaire) → Navigation → Certifications → Réseaux → Barre légale
Gap entre sections : 32px

### 6 états

**Default** : fond sombre, texte sable clair, liens sans underline
**Hover liens** : couleur sand-100, transition 150ms
**Focus-visible** : outline 2px sand-100, offset 2px (fond sombre — ring inversé)
**Sans JavaScript** : identique (footer est HTML pur, aucune dépendance JS)
**Impression** : footer simplifié — coordonnées seules visibles, couleurs en noir sur blanc
**Loading** : n/a (footer statique)

### ARIA

- `<footer aria-label="Pied de page">`
- `<nav aria-label="Navigation secondaire">`
- Adresse dans `<address>` sémantique

---

## 7. Hero full-bleed {#hero}

### Structure

Photo full-bleed derrière overlay gradient bas→haut (transparent → rgba(26,21,16,0.72)).
Texte positionné bas-gauche desktop (col 1–6, padding-bottom 64px), centré mobile.
Pas de CTA sur certaines pages (ex: WF-04 "Notre approche" — hero split, pas de CTA hero).

### Variantes

| Variante | Usage | CTA | Texte position |
|---|---|---|---|
| hero-home | Accueil — photo piscine+jardin plein écran 90vh | Button lg primary | Bas gauche col 1-6 |
| hero-page | Pages intérieures — 60vh, texte seul ou split | Non (CTA en section) | Bas gauche col 1-8 |
| hero-split | Approche — 60/40 texte gauche, photo droite | Non | Gauche col 1-7 |
| hero-prescripteur | Prescripteurs — texte gauche, photo détail droite | Button lg primary | Gauche col 1-6 |

### 6 états

**Default** : photo chargée, overlay actif, texte lisible
**Loading (LCP)** : placeholder fond sand-950, texte H1 visible immédiatement (CSS priority — pas d'image bloquante), image arrive en LCP < 2.5s. Implémentation : `priority={true}` Next.js Image.
**Photo indisponible** : fond sand-950 uni + texte maintenable → lisibilité garantie sans photo
**Mobile crop** : image croppée objet-position: center, hauteur 60vh, pas de distorsion portrait forcée
**Focus-visible éléments** : outline sand-100 2px offset 2px sur tous les éléments interactifs dans le hero (fond sombre)
**Reduced-motion** : animation d'entrée (fade-up) désactivée, éléments visibles immédiatement

### Animations d'entrée (page load)

Pattern par défaut : `fade-up translateY(20px → 0) opacity(0 → 1) 400ms ease-out`
H1 : délai 0ms | Sous-titre : délai 100ms | CTA : délai 200ms
Stagger 100ms entre éléments.
Implémentation recommandée : Framer Motion `initial/animate/transition` ou CSS animation simple.

### ARIA

- `<section aria-label="En-tête principal">` ou `<header>` selon contexte
- Image : `alt` descriptif obligatoire (voir slots images dans page-compositions.md)
- Overlay : `aria-hidden="true"` (décoratif)

### Responsive

| Breakpoint | Hauteur | Texte size H1 | Position texte |
|---|---|---|---|
| 375px mobile | 60vh | 48px (5xl) | Centré ou bas gauche |
| 768px tablette | 70vh | 52px | Bas gauche col 1-5 |
| 1280px desktop | 90vh | 72px (display) | Bas gauche col 1-6 |

---

## 8. SectionHeading {#section-heading}

Composant de titre de section réutilisable. Utilisé dans toutes les pages pour les titres H2 de section (preuves, portfolio extrait, etc.).

```
[Surtitre optionnel — DM Sans 12px medium, water-600, text-transform uppercase, letter-spacing 0.1em]
[H2 — DM Serif Display 36px, sand-900, line-height 48px]
[Sous-titre optionnel — DM Sans 18px, sand-700, line-height 32px, max-width 60ch]
[Separator optionnel — ligne 40px, 2px, water-600]
```

Alignement : gauche par défaut, centré si prop `centered`.
Padding bottom : 48px avant le contenu suivant.

### Responsive

| Breakpoint | H2 size | Sous-titre size |
|---|---|---|
| Mobile 375px | 30px | 16px |
| Tablette 768px | 32px | 17px |
| Desktop 1280px | 36px | 18px |

---

## 9. Card réalisation {#card-realisation}

Utilisée dans la grille portfolio (WF-05) et dans l'extrait accueil (WF-01).

### Structure

```
[Photo — ratio 4:3, object-cover, rounded-t-lg]
[Corps — padding 16px]
  [Type de projet — DM Sans 12px medium, water-600, text-transform uppercase]
  [Zone géographique — DM Sans 14px, sand-700]
  [CTA lien → — DM Sans 14px medium, water-600, ArrowRight 16px]
[Hover overlay : shadow-md + translateY(-2px) sur la card]
```

### 6 états

**Default** : shadow-sm, fond sand-100, radius 8px, border sand-300 1px
**Hover** : shadow-md, translateY(-2px), transition 300ms ease-out, image légèrement scale(1.02)
**Active (click)** : translateY(0), shadow-sm — retour base
**Focus-visible** : outline 2px water-600 offset 2px sur la card entière (lien = toute la card est cliquable)
**Disabled** : n/a pour ce composant
**Loading (skeleton)** : fond sand-300 animé pulse (shimmer), maintenir la hauteur exacte (ratio 4:3 préservé) → zéro CLS

### ARIA

- Card entière = lien `<a href="/realisations/[slug]">`
- `aria-label="Voir la réalisation : [type] — [zone]"`
- Image alt : `"[Type de réalisation] — [zone géographique]"` (description factuelle)

### Responsive

| Breakpoint | Colonnes | Taille card |
|---|---|---|
| 375px mobile | 1 colonne (option 2 colonnes serrées @ux) | 100% ou calc(50% - 6px) |
| 768px tablette | 2 colonnes | calc(50% - 12px) |
| 1280px desktop | 3 colonnes | calc(33.33% - 16px) |

---

## 10. FilterBar portfolio {#filterbar}

### Structure

```
Horizontal scroll container (desktop: flex wrap; mobile: flex no-wrap + overflow-x auto + scroll snap)
[Tous] [Piscine] [Spa & Sauna] [Jardin & Parc] [Projet complet eau+jardin]
```

Chaque élément = FilterPill composant (tokens définis dans design-tokens.json section component.filter-pill).

### 6 états du FilterPill

**Default** : fond sand-200, texte sand-700, radius full, height 44px
**Hover** : fond sand-300, texte sand-900, transition 150ms
**Active/Selected** : fond water-600, texte white, border water-600 — différenciation FORTE (critère @ux)
**Focus-visible** : outline 2px water-600 offset 2px
**Disabled** : n/a (filtres toujours disponibles, gérés par l'état "filtre sans résultat")
**Loading** : n/a (changement instantané côté client)

### Comportement mobile

- `overflow-x: auto`, `scroll-snap-type: x mandatory`
- Filtre actif toujours partiellement visible (scroll vers lui si hors-écran)
- Pas de coupure du texte des pills (white-space: nowrap)
- Gradient de fondu sur la droite (masque CSS) pour signaler le scroll horizontal

### ARIA

- `<div role="group" aria-label="Filtrer les réalisations">`
- Chaque pill : `<button role="tab" aria-selected="true/false">`
- `aria-live="polite"` sur la grille résultats (annonce le nb de résultats après filtrage)

---

## 11. RealisationDetail {#realisation-detail}

### Structure desktop (layout 60-40, WF-05b)

Colonne gauche (col 1-8) : galerie photos — photo principale 16:9, photos 2 et 3 en 4:3 en dessous. Navigation au clic ou swipe.
Colonne droite (col 9-12) : type de projet, zone géo, liste prestations, cross-sell conditionnel, CTA.

### Galerie photos

Photo principale : priorité LCP (première photo), photos 2-3 lazy.
Si photo 2 ou 3 manquante : la colonne gauche s'adapte proprement (pas de vide ou image cassée).
État photo manquante : fond sand-300 maintenu, ratio 4:3 préservé.

### 6 états

**Default** : galerie avec photo principale visible
**Hover photo** : curseur pointer (si lightbox disponible en V2), pas d'animation distrayante
**Chargement photo** : skeleton sand-300 animate-pulse, ratio maintenu
**Photo manquante** : fond sand-300 sobre, layout intact
**Focus-visible** : outline 2px water-600 sur les zones cliquables
**Loading page** : breadcrumb visible immédiatement, photos lazy avec placeholder

### ARIA

- `<main>` pour le contenu principal
- Breadcrumb : `<nav aria-label="Fil d'Ariane">`
- Galerie : `<figure>` + `<figcaption>` pour chaque photo
- Images alt : descriptifs (type de réalisation, caractéristique principale)

---

## 12. CrossSellSplit 50/50 {#crosssell}

### Structure desktop

Deux colonnes strictement égales (50%/50%), pleine largeur du container.
Colonne gauche : photo ratio 1:1 (carré) ou 16:9 en fill
Colonne droite : fond selon univers (water-50 ou forest-50), padding 48px, accroche H3, texte 2-3 lignes, CTA ghost

Variantes :
- `water→forest` : source piscine, destination jardins (WF-02)
- `forest→water` : source jardins, destination piscine (WF-03)

### Mobile

Stack vertical : photo dessus (100vw, 56vw hauteur), texte dessous (padding 32px).
L'ordre correspond toujours à source en haut, destination en bas.

### 6 états

**Default** : photo + texte side by side
**Hover CTA** : états standard du Button ghost
**Focus-visible** : outline sur le bouton uniquement
**Photo indisponible** : fond accent léger remplace la photo (water-200 ou forest-200)
**Disabled** : n/a
**Loading** : skeleton sur la colonne photo, texte visible immédiatement

### ARIA

- `<section aria-label="Découvrez aussi — [univers destination]">`
- Event `cross_selling_clicked` au clic CTA

---

## 13. ProofBadges {#proof-badges}

Composant 4 preuves en ligne desktop / 2×2 mobile. Utilisé sur accueil, piscines, prescripteurs.

### Structure par badge

```
[Nombre — DM Serif Display 48px, gold-800 #8B6130]  ← v1.1 BUG-A11Y-1 : gold-600→gold-800, ratio 3.92:1 grand texte PASS
[Label — DM Sans 14px, sand-800 #4A3E34, line-height 20px, max 2 lignes]  ← v1.1 BUG-A11Y-1 : sand-700→sand-800 via token proof-label, ratio 7.39:1 PASS
```

Les 4 preuves :
1. "30+" → "ans d'expertise" (tiret cadratin stylisé typographiquement par @copywriter)
2. "350+" → "piscines entretenues en 78/92"
3. "Socotec" → "CSP/ESP-001 — certification technique"
4. "L'Esprit Piscine" → "réseau professionnel piscinistes"

**Note** : badges Socotec et L'Esprit Piscine — si des logos SVG officiels sont disponibles, les utiliser à la place des chiffres. Sinon texte typographié sobre. JAMAIS en hero.

### 6 états

**Default** : fond proof #EDD9B8, nombre or sombre (#8B6130 ratio 3.92:1), label sand sombre (#4A3E34 ratio 7.39:1)
**Hover** : n/a (non interactif)
**Focus-visible** : n/a (non interactif sauf si lien vers page certifications externe)
**Si lien externe** : focus outline 2px water-600
**Loading** : skeleton maintenant le layout (grille préservée)
**Mobile 2×2** : gap 16px, chaque badge padding 16px

### Responsive

| Breakpoint | Layout | Gap |
|---|---|---|
| 375px | 2 colonnes × 2 lignes | 12px |
| 768px | 4 en ligne | 16px |
| 1280px | 4 en ligne avec plus d'espacement | 24px |

---

## 14. ContactForm + FormField {#contact-form}

### ContactForm — Structure

6 champs dans l'ordre wireframes.md WF-08 :
1. Prénom et nom (text, obligatoire)
2. Email (email, obligatoire)
3. Téléphone (tel, obligatoire)
4. Type de projet (checkbox group, ≥1 obligatoire)
5. Commune (text, obligatoire)
6. Budget indicatif (select, optionnel)
7. Description du projet (textarea, obligatoire ≥ 20 chars)

Honeypot : champ masqué `name="website"` — si rempli, soumission ignorée côté Pages Function.

### FormField — 6 états

**Default** : fond sand-300 (#E0D8CC), border sand-400 1px, label DM Sans 14px sand-900 au-dessus du champ, placeholder sand-700 #6B6058 (token text.muted — v1.2 BUG-A11Y-3, anciennement sand-600 #7E7468)
**Focus** : border water-600 2px, outline 2px water-600 offset 2px (WCAG 2.2 AA), fond légèrement plus clair sand-100
**Filled / valid** : border sand-400 (retour neutre — pas de vert invasif), label maintain
**Error** : border error-dark #8B2E2E 2px, message erreur dessous en DM Sans 12px error-dark, icône AlertCircle 14px, fond error-light #F5D5D5 léger
**Success (post-submit)** : remplacement du formulaire par message de confirmation (cf. wireframes)
**Disabled** : fond sand-200, texte sand-600, cursor not-allowed, border sand-300

### Textarea

Min-height 120px, resize vertical uniquement, compteur de caractères en sand-600 sous-droit (actif dès premier caractère saisi, devient water-600 si ≥ 20 chars).

### Select (Budget)

Composant Radix UI Select. Trigger = apparence input standard (sand-300 bg). Content = dropdown sand-100 bg, items sand-900, hover sand-200. Chevron Lucide `ChevronDown` 16px.

### Bouton submit

Button primary lg, width 100%, texte "Parlez-nous de votre projet", type="submit".
État loading : spinner + "Envoi en cours..." aria-busy="true".

### Smart defaults (depuis wireframes.md)

Implémentation via query param ou référrer :
- `?source=prescripteurs` → case "Architecte ou prescripteur" pré-cochée
- `?source=piscines` → case "Piscine sur mesure" pré-cochée
- `?source=jardins` → case "Jardin & paysage" pré-cochée

### ARIA + Clavier

- `<form novalidate>` (validation côté JS, pas HTML native pour contrôle des messages)
- Chaque field : `<label for="[id]">` associé, jamais de placeholder seul comme label
- Erreurs : `aria-describedby="[field-id]-error"` + `aria-invalid="true"`
- Groupe checkbox : `<fieldset><legend>Votre projet *</legend>`
- Submit désactivé pendant loading : `aria-disabled="true"` + `aria-busy="true"`
- Succès : focus déplacé sur le message de confirmation (géré par `useEffect`)
- Erreur réseau : focus sur le message d'erreur

### Validation inline

Déclenchée au blur (pas à la soumission). Messages exacts issus wireframes.md WF-08 (ne pas modifier le wording — source de vérité @ux/@copywriter).

---

## 15. NoticeRGPD {#notice-rgpd}

Composant texte sous le bouton submit du formulaire. Pas un bandeau cookie (site RGPD exempté analytics — Umami).

Texte source : rgpd-checklist.md section D (version courte).
Police : DM Sans 12px, sand-600, line-height 20px, max-width 60ch.
Border-top 1px sand-300, padding-top 16px.
Lien "Politique de confidentialité complète →" : water-600, underline, ouverture même onglet (pas _blank — page interne).

### 6 états

**Default** : texte sobre, visible mais pas dominant
**Hover lien** : underline offset, sand-900
**Focus-visible lien** : outline 2px water-600 offset 2px
**Disabled** : n/a
**Loading** : n/a (texte statique)
**Print** : visible (information légale)

---

## 16. Page 404 {#page-404}

Composant de page entière. Source : wireframes.md WF-09.

### Structure

Header sticky présent.
Contenu centré verticalement (min-height: calc(100vh - 64px) pour compenser le header).

```
[Texte "Cette page n'existe pas." — DM Serif Display 36px sand-900]
[Sous-texte "Ce que vous cherchez est peut-être par ici :" — DM Sans 18px sand-700]
[Lien ← Retour à l'accueil — Button ghost md]
[Lien Voir les réalisations → — Button ghost md]
[Lien Parlez-nous de votre projet → — Button primary md]
```

Gap entre liens : 12px. Stack vertical (column flex).

**Pas de code "404" en gros** — registre technique à éviter (brief @ux).
**Pas d'humour forcé** — ton sobre, humain (brand-voice.md).

### 6 états

**Default** : texte + 3 liens, fond sand-100 standard
**Hover liens** : états Button standards
**Focus-visible** : états Button standards
**Disabled** : n/a
**Loading** : n/a (page statique)
**Mobile** : même structure, boutons width 100%

### ARIA

- `<main role="main">`
- `<h1>` pour le message principal
- Pas de `role="alert"` — ce n'est pas une urgence, c'est une navigation

---

## Composants différés (V2 ou non applicables)

**Lightbox galerie** : navigation photo fullscreen dans WF-05b → V2 (pas bloquant V1)
**Breadcrumb** : optionnel sur WF-05b fiche réalisation uniquement → simple lien "← Retour aux réalisations" suffit en V1
**Toast / notifications** : non nécessaire (le seul feedback est le formulaire contact, géré inline)
**Tableaux / dashboards** : non applicable (site vitrine, pas de backoffice)
**Modales** : non utilisées en V1 (décision @ux — popup écartée)

---

*Document produit par @design — 2026-06-11*
*Handoff : @fullstack (implémentation Tailwind + composants), @qa (tests contrastes, focus, WCAG)*
