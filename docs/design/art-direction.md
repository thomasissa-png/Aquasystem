# Direction artistique — Site vitrine umbrella
## Aquasystem [PROVISOIRE] × Aqua System × Les Terres Essentielles

> Document fondateur du design. Toute décision visuelle (@fullstack, @qa) doit s'y référer.
> Sources : brand-platform.md, creative-brief.md, personas.md, wireframes.md
> Dernière mise à jour : 2026-06-11 | Agent : @design

---

## 1. Recherche concurrentielle — Espaces libres

Secteur audité : piscinistes haut de gamme + paysagistes premium France (codes visuels dominants, espaces libres).

**Codes visuels dominants à éviter** (saturés dans le secteur) :
- Bleu piscine saturé (#007AFF, cyan chlore) en couleur primaire — signal discount ou fabricant industriel
- Gradients verts sur fond blanc — registre startup jardinage, pas bureau d'études
- Photos splash avec personnes en maillot de bain — trop promotionnel, cible Alexandre veut voir la propriété, pas un style de vie affiché
- Grilles carrées uniformes type Pinterest — pas de hiérarchie, pas de conviction
- Typographie condensée / bold agressif — éloigné du registre AD/Côté Maison

**Espaces libres identifiés** :
- Le duopôle eau + végétal traité comme unité esthétique (vs deux univers côte à côte)
- La pierre, l'ardoise, le lin comme couleurs dominantes (vs blanc pur ou gris corporate)
- Le format éditorial magazine appliqué à un site de services artisanaux haut de gamme
- La typographie serif à la française dans un contexte digital (rare dans le secteur)

**Design systems de référence sectorielle** :
1. Remy Cointreau / Champagne maisons — sobriété, blanc cassé, serif fin, photos plein cadre
2. Villa & Jardin (magazine Mondadori) — grille éditoriale, typographie mixte, aération
3. Empreintes Architectes — mise en valeur des réalisations sans surcharge graphique

---

## 2. Trois pistes d'ambiance

### Piste A — "Héritage minéral"
Inspiration : pierre de taille, eau calme, lumière de fin d'après-midi.

**Palette** : ivoire chaud #F7F3EE, pierre #C4B8A8, ardoise #4A4540, eau profonde #2E5F6B, accent végétal #3D5A3E
**Typographie** : Playfair Display (titres) + Source Sans 3 (corps)
**Photos** : focus sur matériaux — margelles, enduits, surfaces d'eau réfléchissantes
**Ambiance** : très sobre, risque de paraître froid si les photos ne sont pas suffisamment lumineuses
**Verdict** : cohérente avec le positionnement mais manque de chaleur pour la relation de confiance centrale à la marque

### Piste B — "Jardin d'architecte"
Inspiration : modernisme français, jardin structuré à la Le Nôtre revisité, lignes nettes.

**Palette** : blanc cassé #FAFAF8, béton clair #D8D0C8, anthracite #2C2C2C, vert architecte #4B6B4A, eau claire #6B9FAB
**Typographie** : Cormorant Garamond (titres) + Inter (corps)
**Photos** : plans d'eau géométriques, taille de haies structurée, vues aériennes
**Ambiance** : très architectural, risque de s'éloigner du "sur-mesure chaleureux" pour glisser vers le froid institutionnel
**Verdict** : correspond aux prescripteurs Camille mais moins à Alexandre qui veut se projeter dans une propriété vivante

### Piste C — "Rive privée" (RETENUE)
Inspiration : rive d'eau douce en fin d'été, propriété en lisière de forêt, lumière dorée, eau dormante.

**Palette** : sable clair #F5F0E8, lin foncé #2A2420, eau dormante #3A6675, vert sous-bois #3B5240, or discret #C4924A
**Typographie** : DM Serif Display (titres) + DM Sans (corps)
**Photos** : piscines en contexte végétal dense, lumière rasante, reflets, propriétés réelles 78/92
**Ambiance** : chaleureux sans être rustique, contemporain sans être froid, ancré sans être provincial
**Verdict** : RETENU — voir justification ci-dessous

---

## 3. Direction retenue : "Rive privée"

### Justification persona

**Pour Alexandre (propriétaire 45-60 ans, 78/92)** :
La piste "Rive privée" active le registre du domaine privé — l'eau calme, le végétal dense, la lumière de fin de journée. Ce n'est pas une publicité pour la piscine comme produit, c'est une évocation de ce que devient sa propriété. Le sable clair et le lin foncé rappellent les matériaux des intérieurs haut de gamme qu'il connaît (architectes d'intérieur, rénovation de caractère) — cohérence de son univers quotidien. La chaleur de la palette (sable, or discret) évite la froideur minérale qui pourrait générer une distance émotionnelle.

**Pour Camille (architecte prescripteur)** :
La sobriété de la palette et la typographie mixte (DM Serif Display / DM Sans) signalent immédiatement le registre professionnel. L'absence de bleu piscine saturé confirme qu'on n'est pas chez un fabricant de kits — on est chez un bureau d'études. Le vert sous-bois comme couleur végétale distingue visuellement les deux univers sans les fragmenter.

**Versus concurrents** :
La piste "Rive privée" occupe l'espace libre identifié : sobre, éditorial, matériaux réels. Elle évite les deux pièges du secteur — le bleu piscine clinique et le vert jardinage discount.

**Cohérence brand-platform.md** :
Facette physique Kapferer : "Eau, végétal, pierre, lumière. La propriété transformée." La piste traduit exactement ces quatre éléments en décisions visuelles concrètes.

---

## 4. Palette — Hex exacts

### Architecture 3 niveaux (preview — détail dans design-tokens.json)

**Neutres — base minérale**

| Nom sémantique | Hex | Usage |
|---|---|---|
| Fond primaire | #F5F0E8 | Fond de page, sections claires |
| Fond secondaire | #EDE8DF | Sections alternées, cartes |
| Fond sombre | #1A1510 | Hero overlay, sections contrastées |
| Texte primaire | #2A2420 | Corps, titres sur fond clair |
| Texte secondaire | #6B6058 | Labels, métadonnées, captions |
| Texte inversé | #F5F0E8 | Texte sur fond sombre |
| Bordure | #D4CCC0 | Séparateurs, bordures de champ |
| Bordure forte | #A89E92 | Champs focus, éléments actifs |

**Accents — eau (piscine, Aqua System)**

| Nom sémantique | Hex | Usage |
|---|---|---|
| Eau primaire | #3A6675 | CTA primaire, liens actifs, accent fort |
| Eau claire | #5A8A9A | Hover états, états actifs filtres |
| Eau pâle | #B8D4DC | Backgrounds subtils section piscine |

**Accents — végétal (jardins, Les Terres Essentielles)**

| Nom sémantique | Hex | Usage |
|---|---|---|
| Vert sous-bois | #3B5240 | CTA section jardins, liens jardin |
| Vert moyen | #587A5F | Hover états section jardins |
| Vert pâle | #C4D9C6 | Backgrounds subtils section jardins |

**Fonctionnels**

| Nom sémantique | Hex | Usage |
|---|---|---|
| Succès | #2E5E3A | Feedback positif formulaire |
| Erreur | #8B2E2E | Erreurs formulaire, messages d'alerte |
| Or discret | #C4924A | Numéros proof (30+, 350+), éléments stylistiques |
| Or pâle | #EDD9B8 | Backgrounds accent preuve |

**Note duopôle eau/végétal** : Aqua System = famille eau (#3A6675). Les Terres Essentielles = famille végétal (#3B5240). Sur la page d'accueil, les deux colonnes univers utilisent chacune leur accent respectif. La marque ombrelle utilise l'accent eau comme primaire (piscine = activité principale commerciale) et le végétal comme complémentaire.

---

## 5. Typographie

### Choix typographique

**Polices retenues** (open source, Google Fonts, next/font) :

| Rôle | Famille | Variantes chargées | Fallback |
|---|---|---|---|
| Titres (H1-H3) | DM Serif Display | Regular 400 uniquement | Georgia, serif |
| Corps + UI | DM Sans | Regular 400, Medium 500, SemiBold 600 | system-ui, sans-serif |

**Justification DM Serif Display** :
- Serif moderne à contraste fort, lisible à toutes tailles en digital
- Évoque le registre éditorial (AD, Côté Maison) sans le côté daté de Garamond
- Les empattements fins traduisent la précision, la maîtrise — cohérent avec le positionnement
- Variable font disponible → chargement optimisé
- 100% free, Google Fonts, intégration next/font directe

**Justification DM Sans** :
- Même famille que DM Serif Display → cohérence optique parfaite
- Lisibilité excellente en corps de texte petite taille
- 3 poids suffisants (400/500/600) — pas de bold 700 qui casserait le registre sobre
- Excellent rendu sur fonds sablés (pas de graisses parasites)

### Stratégie de chargement (next/font)

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

**Budget fonts** : 2 familles max, subset latin uniquement (aucun caractère cyrillique, grec), display: swap (LCP non bloqué). DM Serif Display Regular seul = ~22ko WOFF2. DM Sans 3 poids = ~65ko WOFF2. Total : ~87ko — acceptable pour LCP < 2.5s.

---

## 6. Traitement photo

**Principes non négociables** (issues creative-brief.md) :
- Photos réelles des réalisations Aqua System / Les Terres Essentielles UNIQUEMENT
- Lumière naturelle — préférence fin de journée (lumière dorée, ombres longues, reflets sur l'eau)
- Zéro personne dans l'eau ou identifiable sans droit à l'image confirmé
- Zéro filtre lourd, colorisation ou vignettage artificiel — la photo réelle est la star
- Zéro image de banque générique (villa anonyme, piscine catalogue)

**Ratios constants par usage** :
| Usage | Ratio | Exemple |
|---|---|---|
| Hero full-bleed | 16:9 desktop / crop carré mobile | Page d'accueil, pages univers |
| Cartes portfolio | 4:3 | Grille réalisations |
| Blocs prestation (alternés) | 3:2 | WF-02, WF-03 |
| Photo split 50/50 | 1:1 carré | Cross-selling, WF-04 |
| Photo prescripteur | 4:3 paysage | WF-07 |

**Format de livraison** : AVIF (principal) + WebP (fallback) — détail dans design-system.md section Performance.

**Overlay hero** : dégradé linéaire du bas vers le haut, transparent → `rgba(26, 21, 16, 0.72)`. Pas de couleur — fond neutre sombre naturel. Assure la lisibilité du texte blanc (ratio ≥ 4.5:1 vérifié : blanc #FFFFFF sur overlay #1A1510 à 72% opacité effective).

---

## 7. Iconographie

**Principes** :
- Trait fin, 1.5px, arrondi (stroke-linecap: round, stroke-linejoin: round)
- Taille affichage : 20px × 20px (UI) / 24px × 24px (section) / 48px × 48px (timeline étapes)
- Couleur : hérite du texte courant (currentColor) — jamais codée en dur
- Bibliothèque : Lucide Icons (open source, tree-shakable, cohérent avec Radix UI)
- JAMAIS d'icônes seules sans label dans le backoffice ou les éléments de navigation

**Icônes utilisées** (liste exhaustive V1) :
- Navigation : Menu (hamburger), X (fermeture drawer), ArrowRight (liens), ChevronLeft (breadcrumb, retour)
- Formulaire : CheckSquare (checkbox), ChevronDown (select), AlertCircle (erreur), CheckCircle (succès), Loader2 (spinner)
- Footer/Contact : Phone, Mail, MapPin, Linkedin, Facebook
- Timeline approche : les 5 étapes utilisent des numéros typographiés (1-5 en DM Serif Display) plutôt que des icônes — plus sobre, plus scalable

---

## 8. Le duopôle eau / végétal — Traduction graphique

### Problème à résoudre
Deux univers distincts (piscine Aqua System, jardin Les Terres Essentielles) sous une identité ombrelle commune. Comment les distinguer sans fragmenter la marque ?

### Solution retenue : distinction par accent, unité par typographie + neutres

**Ce qui est commun aux deux univers** (identité ombrelle) :
- Fond neutre sablé (fond primaire #F5F0E8)
- Typographie DM Serif Display pour les titres — identique sur les deux univers
- Espacement et rythme vertical — identique
- CTA principal "Parlez-nous de votre projet" — couleur eau (#3A6675) sur les deux (la marque ombrelle prime)

**Ce qui distingue les deux univers** :
- Page Piscines & Bien-être : accent eau (#3A6675 et famille), photo hero = eau calme/plan d'eau, section preuve = badges Socotec/Esprit Piscine
- Page Jardins & Paysage : accent végétal (#3B5240 et famille), photo hero = parc dense/végétal structuré, section preuve = sans badges certifications
- Composant cross-selling : la moitié "source" utilise son accent, la moitié "destination" préfigure l'accent de l'autre univers — transition visuelle douce

**Sur la page d'accueil** :
- Section "deux univers" : deux colonnes, colonne gauche (piscine) = teinte eau pâle #B8D4DC en fond, colonne droite (jardins) = teinte végétal pâle #C4D9C6 en fond
- Les deux colonnes côte à côte créent un dialogue visuel — eau et végétal en conversation
- Au scroll, le visiteur comprend immédiatement le duopôle sans qu'il soit nécessaire d'écrire "deux expertises"

---

## 9. Moodboard textuel

**Scène de référence** :
Une propriété de Saint-Nom-la-Bretèche en fin d'après-midi de septembre. La piscine à débordement reflète les dernières lumières du soleil. Le bassin disparaît dans le parc paysagé — on ne voit pas la limite. La terrasse en pierre naturelle porte encore la chaleur de la journée. L'eau est immobile. Le jardin structure l'espace sans l'encombrer.

**Références images** :
- Piscines à débordement intégrées dans des parcs (Renzo Piano Foundation à Gênes pour l'esprit eau+architecture, pas le style)
- Villa Ephrussi de Rothschild (jardin formé, eau calme, pierre — esprit, pas copier)
- Réalisations du book Calameo Aqua System : source principale et obligatoire

**Textures** :
- Pierre calcaire de l'ouest parisien (sablée, non polie)
- Lin naturel non blanchi
- Eau dormante, reflets légèrement troubles
- Végétation à l'état de structure (haies taillées, pas de jardin sauvage)

**Ce qui ne doit PAS être visible** :
- Piscines avec éclairage LED de couleur (bling-bling absolu)
- Gazon parfaitement synthétique (trop catalog)
- Architecture contemporaine à toit plat sur fond de ciel blanc (trop architectural magazine générique)
- Chaises longues colorées (trop vacances club)

---

## 10. Dark mode — Décision et positionnement

**Décision : Dark mode DIFFÉRÉ en V2.**

**Justification** :
Le site est photo-heavy et la palette "Rive privée" est construite autour de fonds sablés chauds (#F5F0E8) qui mettent en valeur les photos de réalisations en lumière naturelle. Un dark mode remapperait ces fonds vers des gris 900 (≈ #1A1510) — les photos de jour sur fond sombre créent un registre funèbre incompatible avec l'ambiance "propriété vivante" recherchée.

De plus, la cible Alexandre consulte le plus souvent en journée sur desktop (RDV, recherche active). La priorité LCP < 2.5s prime sur la feature dark mode en V1.

**En V1** : respecter `prefers-color-scheme: dark` via une media query sur le background uniquement (atténuer le blanc éclatant en sombre → fond #1A1510 sur le scroll, header transparent dark). Les tokens sémantiques sont structurés pour permettre le remapping complet en V2 sans refonte.

---

*Document produit par @design — 2026-06-11*
*Handoff : @fullstack (tokens + composants), @copywriter (slots typographiques)*
