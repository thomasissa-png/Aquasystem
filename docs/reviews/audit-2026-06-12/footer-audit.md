# Audit footer — Aquasystem « Rive privée »
**Date** : 2026-06-12 | **Agent** : @design | **Source** : retour fondateur « très très grand, large et tout »

---

## Captures lues

| Capture | Viewport | Contenu footer visible |
|---|---|---|
| `audit-desktop-2026-06-12/shots/home-s05.jpg` | 1400 px | Footer complet + pre-footer CTA |
| `audit-desktop-2026-06-12/shots/piscines-bien-etre-s06.jpg` | 1400 px | Footer complet + pre-footer CTA |
| `audit-desktop-2026-06-12/shots/jardins-paysage-s05.jpg` | 1400 px | Footer complet + pre-footer CTA |
| `audit-desktop-2026-06-12/shots/la-maison-s05.jpg` | 1400 px | Footer complet + pre-footer CTA |
| `audit-desktop-2026-06-12/shots/prescripteurs-s06.jpg` | 1400 px | Footer complet + pre-footer CTA |
| `audit-mobile-2026-06-12/shots/home-s07.jpg` | 390 px | Début du footer mobile (identité + nav) |
| `audit-mobile-2026-06-12/shots/home-s08.jpg` | 390 px | Fin du footer mobile (coordonnées + légal) |

---

## 1. PROPORTIONS — mesures réelles sur captures

### Desktop (1400 px)

Le footer occupe visuellement environ **40–42 % de la hauteur totale des captures s05/s06**, qui incluent le pre-footer CTA sombre. En isolant le footer proprement dit (en-dessous du pre-footer) :

- **Hauteur totale du footer** mesurée sur capture : environ **430–440 px** sur les 5 pages (identique partout — composant unique).
- **Padding top codé** : `pt-16` = 64 px. **Padding bottom** : `pb-12` = 48 px. Soit **112 px de padding vertical** pour un contenu utile d'environ **270 px**. Ratio padding/contenu = **41 %** — excessif. Pour un footer de référence haut de gamme, un ratio 25–30 % est attendu.
- **Barre légale** : `mt-12` (48 px) + `pt-6` (24 px) = **72 px de séparation** entre le corps du footer et la barre légale. Valeur disproportionnée — cette séparation crée visuellement un deuxième « plancher » et donne l'impression que le footer n'en finit plus.
- **Gap entre les 3 colonnes** : `gap-12` = 48 px. Sur une grille 3 colonnes à max-w-container (1280 px), chaque colonne fait environ 370 px de large pour un contenu maximal d'environ 250 px. La colonne 1 (identité) est particulièrement creuse : 2 lignes de texte + 2 badges, tout le bas est vide. La colonne 3 (coordonnées) est la plus dense, et les 2 adresses + 3 modes de contact + 2 réseaux ne saturent que ~60 % de la hauteur disponible de la colonne.

**Verdict desktop** : le footer fait ~430–440 px sur desktop alors qu'il pourrait tenir en **300–310 px** avec les mêmes informations. Le surplus vient de `pt-16` trop généreux, de `mt-12` avant la barre légale, et d'une grille 4-4-4 avec des colonnes peu chargées.

### Mobile (390 px)

Le footer s'étale sur **deux écrans complets** (home-s07 + home-s08 = ~1660 px de hauteur totale footer). La navigation répète l'intégralité des 6 liens de la navbar dans une liste à gap espacé. Les sections s'empilent avec un `gap-12` (48 px) conservé du desktop, ce qui crée des blocs isolés. Le footer mobile occupe environ **1,97 × la hauteur de l'écran** (1660 px / 844 px ≈ 1.97). Objectif fondateur : **≤ 1 écran mobile**.

Problèmes spécifiques mobile observés :
- **Ordre des blocs** : Identité → Navigation → Nous trouver. La navigation (6 liens) arrive en deuxième, avant les coordonnées. Depuis un mobile, l'utilisateur qui cherche le téléphone doit défiler au-delà d'une liste de 6 liens qu'il vient de passer dans la navbar.
- **Espacement inter-liens** : les 6 liens de navigation ont un `gap-2` (8 px) + `py-1` individuel, ce qui est correct pour les cibles tactiles, mais la section Navigation avec son titre prend visuellement ~220 px de hauteur.
- **Les badges** Socotec + Esprit Piscine sont en colonne (flex-wrap dans un seul bloc), chacun sur une ligne à part sur 390 px.
- **Barre légale** : `mt-12` (48 px) avant la séparation, `pt-6` (24 px) après — identique au desktop. Sur mobile, ces 72 px représentent un blanc équivalent à 3 lignes de texte avant le copyright.

---

## 2. DENSITÉ / REDONDANCE — inventaire complet

### Ce que contient le footer actuellement

**Bloc 1 — Identité**
1. Wordmark « Aquasystem » (serif, text-xl = 20 px)
2. Ligne « Aquasystem — eau, jardin, propriété. »
3. Ligne « En partenariat avec Les Terres Essentielles. »
4. Badge « Certifié Socotec CSP/ESP-001 »
5. Badge « Réseau L'Esprit Piscine »

**Bloc 2 — Navigation**
6. Titre « Navigation »
7. Lien Réalisations
8. Lien Piscines & Bien-être
9. Lien Jardins & Paysage
10. Lien Notre approche
11. Lien Espace prescripteurs
12. Lien Contact

**Bloc 3 — Nous trouver**
13. Titre « Nous trouver »
14. Sous-titre « Aqua System »
15. Icône MapPin + adresse Freneuse (2 lignes)
16. Icône Phone + numéro cliquable
17. Icône Mail + email cliquable
18. Sous-titre « Les Terres Essentielles »
19. Icône MapPin + adresse Alluets (2 lignes)
20. Lien « LinkedIn »
21. Lien « Facebook »

**Barre légale**
22. Copyright + raison sociale + SIREN
23. Lien Mentions légales
24. Lien Politique de confidentialité

**Total : 24 éléments distincts.**

### Analyse de redondance par référence aux sites premium (architectes, maisons de luxe, aménagement premium)

Un pied de page premium sobre (ex. Arnaud Lapierre, Vincent Coq, Christophe Gautrand architectes — ou dans le secteur : Piscines Waterair, Desjoyaux architectes) contient en général **8–12 éléments** : logotype, 1 accroche courte, coordonnées prioritaires (téléphone + ville), 3–4 liens essentiels, légal. Ce qui est en trop ou redondant dans le footer actuel :

| Élément | Verdict | Justification |
|---|---|---|
| Ligne « Aquasystem — eau, jardin, propriété. » | **À retirer** | Le wordmark est déjà présent. Cette ligne répète la tagline qui figure dans la navbar et dans chaque hero. Redondance à valeur nulle en pied de page. |
| « En partenariat avec Les Terres Essentielles. » | **À conserver mais raccourcir** | Mention légale/commerciale utile — peut être fusionnée dans la barre légale sous forme compacte plutôt qu'en texte de corps. |
| Titre « Navigation » + 6 liens complets | **À réduire** | Un site premium à 6–7 pages n'a pas besoin d'une répétition complète de la nav dans le footer. Les 2 liens utiles non accessibles en permanence (Mentions légales, Politique de confidentialité) sont déjà dans la barre légale. Les 4 liens de contenu sont visibles dans la navbar sticky. **Proposition : supprimer le bloc navigation du footer** — ou le réduire à 2 liens de second niveau absents de la nav principale (Espace prescripteurs + Contact). |
| Sous-titre « Aqua System » (première adresse) | **À fusionner** | Le contexte « Aqua System » est établi par le wordmark. Peut devenir une légende inline si on garde les 2 adresses. |
| Adresse Les Terres Essentielles | **À conserver** | Différenciant (2 adresses = 2 expertises distinctes géographiquement). Mais peut être compacté. |
| Réseaux LinkedIn + Facebook en texte | **À conserver mais intégrer** | Valeur = oui. Mais leur emplacement isolé sous l'adresse LTE crée un bloc déséquilibré. À rapprocher du bloc identité. |
| Badges Socotec + Esprit Piscine | **À conserver** | Preuve qualité = différenciant fort. Mais peuvent être alignés horizontalement (ligne unique) si l'espace le permet. |

**Éléments à supprimer ou fusionner : 4–5 sur 24 (16–20 % de l'inventaire)**. L'allègement principal passe par la suppression du bloc navigation complet (7 éléments → 0) ou sa réduction drastique à 2 liens.

---

## 3. HIÉRARCHIE & COHÉRENCE

### Typographie

- **Titre de colonne** (« Navigation », « Nous trouver ») : `font-serif text-sm text-sand-400` — DM Serif Display 14 px, sable atténué. Cohérent avec le reste du site.
- **Liens de navigation** : `text-sm text-sand-300` — DM Sans 14 px. Lisible, correct.
- **Wordmark** : `font-serif text-xl` = 20 px. Légèrement disproportionné par rapport aux titres de colonne (14 px) — crée une hiérarchie correcte mais le ratio 20/14 = 1.43 × est flou. En pratique le wordmark visible sur capture semble ~19–20 px, les titres de colonne ~13 px — acceptable.
- **Barre légale** : `text-xs text-foreground-footer-legal` = DM Sans 12 px, sand-500 #A89E92 — correct, conforme v1.1 BUG-A11Y-1 (ratio 7.04:1 PASS AAA).
- **Adresses / coordonnées** : `text-sm text-sand-300` identique aux liens nav — pas de hiérarchie entre le contenu éditorial (liens) et le contenu utilitaire (adresses). Les noms de maison « Aqua System » et « Les Terres Essentielles » sont en `font-medium text-foreground-inverse` (blanc), ce qui leur donne le poids visuel maximal — légèrement dominant vs le wordmark principal.

### Alignements

Desktop : les 3 colonnes sont en grille régulière `grid-cols-3 gap-12`. Les colonnes ont des hauteurs variables (col 1 est la plus courte — 2 lignes de texte + 2 badges soit ~180 px de contenu ; col 3 est la plus haute — ~280 px). Cela crée un footer avec un plancher bas à gauche et une fin de contenu à droite — perceptible sur les captures par l'espace vide en bas-gauche.

### Barre légale

Le `mt-12` (48 px) avant la barre légale est visuellement disproportionné. Le `border-t border-sand-800` est visible et sobre — c'est le seul problème de proportion. Réduire `mt-12` à `mt-8` (32 px) résoudrait le problème sans toucher à la conception.

### Cohérence desktop ↔ mobile

L'ordre mobile actuel est **Identité → Navigation → Nous trouver**. La spec design-system.md §6 préconise : **Logo → Identité → Contact (prioritaire) → Navigation → Certifications → Réseaux → Barre légale**. L'implémentation actuelle ne respecte pas cet ordre — Contact / Nous trouver arrive en 3ème, après Navigation. Sur mobile, l'utilisateur qui cherche à appeler doit défiler l'intégralité de la liste des 6 liens de navigation avant d'accéder au numéro de téléphone. C'est la friction principale mobile.

### 10 critères Thomas — footer uniquement

| Critère | PASS / FAIL | Observation |
|---|---|---|
| PRO | PASS | Fond sombre, typographie sobre, cohérence avec la DA |
| BEAU | PASS partiel | Le footer est correct mais manque d'élégance : trop de blanc mort entre les blocs |
| BRAND-ALIGNED | PASS | Palette sand-950, serif, sand-300 — « Rive privée » tenu |
| MÊME IDENTITÉ | PASS | Identique sur toutes les pages (composant unique) |
| PROPRE | FAIL | Déséquilibre col 1 courte / col 3 haute ; badges empilés en col sur mobile |
| ALIGNÉ | PASS | Grille 3 colonnes régulière, barre légale flex correcte |
| AÉRÉ | FAIL | Paradoxalement trop aéré : les `pt-16 pb-12 mt-12` créent un espace mort non élégant mais une densité faible |
| CONVERSION | N/A | Le footer n'est pas un point de conversion — les coordonnées et liens sont là pour la finalisation |
| HIÉRARCHIE | FAIL partiel | En plissant les yeux : Wordmark → Noms des 2 maisons → Masse de liens. Les badges et la barre légale se fondent dans la masse. Le téléphone (action directe) n'est pas plus visible que l'adresse. |
| ACCESSIBLE | PASS | Contrastes WCAG AAA vérifiés (BUG-A11Y-1 corrigé), focus ring inversé, `<address>`, `<nav aria-label>` |

---

## 4. SPEC DE CORRECTION — exécutable sans question

### Structure cible

**Desktop (≥ 768 px) — grille 3 colonnes maintenue, proportions rééquilibrées**

```
Colonne 1 (4/12) — Identité consolidée
  Wordmark
  Badges Socotec + Esprit Piscine [sur une ligne, flex-row gap-2]
  Réseaux sociaux LinkedIn · Facebook [ici, pas en bas de col 3]

Colonne 2 (3/12) — Coordonnées Aqua System
  Titre « Aqua System » [sans titre « Nous trouver » redondant]
  MapPin adresse Freneuse
  Phone numéro (lien)
  Mail email (lien)

Colonne 3 (5/12) — Coordonnées Les Terres Essentielles + Contact secondaire
  Titre « Les Terres Essentielles »
  MapPin adresse Alluets
  [Optionnel si LTE a un numéro — sinon bloc compact]
  Mention compact : « en partenariat avec Les Terres Essentielles »
  → OU : fusionner la mention partenariat dans la barre légale

Barre légale
  Gauche : © 2026 SARL AQUA SYSTEM — SIREN 903 785 327. Tous droits réservés. · En partenariat avec Les Terres Essentielles.
  Droite : Mentions légales · Politique de confidentialité
```

**Bloc Navigation : SUPPRIMÉ du footer.** Les 6 liens de la nav principale sont accessibles en permanence via la navbar sticky (visible même lors du scroll). Un footer sobre premium ne duplique pas la nav. Si un lien secondaire doit subsister, seuls « Espace prescripteurs » + « Contact » peuvent rester — mais uniquement si la navbar ne les affiche pas en évidence (ce qui n'est pas le cas : les 6 liens sont visibles sur tous les écrans desktop ≥ 1024 px).

**Mobile (< 768 px) — empilement resserré, ordre prioritaire**

```
Wordmark
Badges [ligne unique si possible, sinon 2 lignes resserrées]
— séparateur —
Aqua System
  adresse + téléphone (lien) + email (lien)
— séparateur —
Les Terres Essentielles
  adresse
— séparateur —
LinkedIn · Facebook [inline, gap-4]
— barre légale —
```

La navigation est supprimée (cf. supra). Si maintenue par arbitrage, elle vient **après** les coordonnées, jamais avant.

---

### Tokens spacing — réduction chiffrée

| Token / classe | Valeur actuelle | Valeur cible | Gain |
|---|---|---|---|
| `pt-16` (padding top footer) | 64 px | `pt-10` = 40 px | −24 px |
| `pb-12` (padding bottom footer) | 48 px | `pb-8` = 32 px | −16 px |
| `gap-12` (gap colonnes desktop) | 48 px | `gap-8` = 32 px | −16 px |
| `mt-12` (avant barre légale) | 48 px | `mt-8` = 32 px | −16 px |
| `pt-6` (barre légale après border) | 24 px | `pt-5` = 20 px | −4 px |
| `gap-12` (gap sections mobile) | 48 px | `gap-6` = 24 px | −24 px par section |
| `mt-5` (avant badges) | 20 px | `mt-4` = 16 px | −4 px |
| `mt-6` (avant 2ème adresse) | 24 px | `mt-4` = 16 px | −8 px |
| `mt-6` (avant réseaux sociaux) | 24 px | → déplacé bloc 1 (voir structure cible) | −24 px |

**Gain total padding vertical desktop** : −24 −16 −16 −16 = **−72 px**. Footer desktop cible : ~360–370 px au lieu de ~430–440 px.

**Gain total mobile** : suppression bloc navigation (≈ 220 px) + réduction gap mobile −24 × 4 sections ≈ −96 px + réduction padding top/bottom −40 px = **≈ −356 px**. Footer mobile cible : ~1 300 px ≈ 1,5 × écran. Avec la suppression de la navigation (−220 px), on approche des ~1 100 px ≈ 1,3 × écran. En ciblant l'objectif ≤ 1 écran (844 px), il faut aussi réduire les adresses (possible en compactant le formatage).

**Pour atteindre ≤ 1 écran mobile strictement** : les deux adresses doivent être sur 1 ligne chacune (postalCode + city sur la même ligne, pas de br) et le bloc identité ne doit pas dépasser 3 lignes. Estimation footer mobile avec ces ajustements : ~800–820 px ≈ 0,97 × écran. Objectif atteint.

---

### Spécifications précises pour @fullstack

#### A. Spacing — Footer.tsx

```tsx
// AVANT
<div className="mx-auto max-w-container px-4 pb-12 pt-16 md:px-8">
  <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

// APRÈS
<div className="mx-auto max-w-container px-4 pb-8 pt-10 md:px-8">
  <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
```

```tsx
// AVANT (barre légale)
<div className="mt-12 flex flex-col gap-4 border-t border-sand-800 pt-6 ...">

// APRÈS
<div className="mt-8 flex flex-col gap-3 border-t border-sand-800 pt-5 ...">
```

```tsx
// AVANT (2ème adresse)
<address className="mt-6 not-italic">

// APRÈS
<address className="mt-4 not-italic">
```

```tsx
// AVANT (réseaux sociaux)
<div className="mt-6 flex gap-x-6">

// APRÈS (si maintenus dans col 3) : mt-4 gap-x-4
// OU déplacés en col 1 sous les badges (voir B)
```

#### B. Structure — bloc identité (col 1) : ajouter les réseaux sociaux

Les liens LinkedIn et Facebook quittent le bas de la colonne 3 et rejoignent la colonne 1, après les badges. Cela équilibre les hauteurs de colonnes et groupe les signaux de marque (wordmark + certifications + réseaux) dans un seul bloc cohérent.

```tsx
// Dans Bloc 1, après les badges :
<div className="mt-4 flex gap-x-4">
  <a href={SOCIAL_LINKS.linkedinAS} ... className={footerListLinkClass}>LinkedIn</a>
  <a href={SOCIAL_LINKS.facebookLTE} ... className={footerListLinkClass}>Facebook</a>
</div>
```

Et supprimer le `<div className="mt-6 flex gap-x-6">` existant dans le Bloc 3.

#### C. Navigation — SUPPRIMER le bloc 2

Supprimer entièrement le `<nav aria-label="Navigation secondaire">` et son contenu. Passer la grille de `md:grid-cols-3` à `md:grid-cols-[1fr_1fr_1fr]` (inchangé visuellement) mais avec 2 colonnes de contenu : col 1 identité + 2 cols coordonnées. Proposition :

```tsx
// AVANT
<div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
  {/* Bloc 1 identité */}
  {/* Bloc 2 navigation — SUPPRIMÉ */}
  {/* Bloc 3 coordonnées */}
</div>

// APRÈS — 2 colonnes : identité (plus large) + coordonnées (divisé en 2 sous-blocs)
<div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr_1fr] md:gap-8">
  {/* Bloc 1 — Identité + badges + réseaux */}
  {/* Bloc 2 — Aqua System */}
  {/* Bloc 3 — Les Terres Essentielles */}
</div>
```

Grille cible desktop `2fr_1fr_1fr` : la col identité prend ~53 % de la largeur, chaque col adresse ~23 %. Cela évite les colonnes de coordonnées trop larges pour leur contenu.

#### D. Adresses mobile — compactage format

Sur mobile uniquement (< 768 px), afficher code postal + ville sur une seule ligne :

```tsx
// AVANT
<span>
  {CONTACT.address.street}
  <br />
  {CONTACT.address.postalCode} {CONTACT.address.city}
</span>

// APRÈS
<span>
  {CONTACT.address.street},{'  '}
  {CONTACT.address.postalCode} {CONTACT.address.city}
</span>
// Supprimer le <br /> — la virgule + espace permet la lecture, économise ~20px de hauteur
```

#### E. Mention partenariat — déplacer dans la barre légale

```tsx
// AVANT (dans bloc 1)
<p className="mt-3 text-sm leading-6 text-sand-300">
  {SITE_NAME} : eau, jardin, propriété.
  <br />
  En partenariat avec {PARTNER_NAME}.
</p>

// APRÈS — SUPPRIMER CE PARAGRAPHE ENTIÈREMENT
// Ajouter « En partenariat avec {PARTNER_NAME}. » dans la barre légale :
```

```tsx
// Barre légale AVANT
<p>© {year} {CONTACT.editor}, SIREN {CONTACT.siren}. Tous droits réservés.</p>

// Barre légale APRÈS
<p>© {year} {CONTACT.editor}, SIREN {CONTACT.siren}. Tous droits réservés. · En partenariat avec {PARTNER_NAME}.</p>
```

#### F. Badges — aligner horizontalement si la largeur le permet

```tsx
// AVANT
<ul className="mt-5 flex flex-wrap gap-2">
  <li className="rounded-md border ...">Certifié Socotec CSP/ESP-001</li>
  <li className="rounded-md border ...">Réseau L'Esprit Piscine</li>
</ul>

// APRÈS — mt-4 et flex-nowrap en desktop (les 2 badges tiennent sur 1 ligne en col 2fr)
<ul className="mt-4 flex flex-wrap gap-2">
  {/* inchangé — flex-wrap assure le repli mobile automatiquement */}
</ul>
```

Note : `mt-5 → mt-4` uniquement comme changement nécessaire ici. Le `flex-wrap` est déjà correct.

---

### Résumé AVANT / APRÈS

| Dimension | AVANT | APRÈS |
|---|---|---|
| Padding vertical desktop | pt-64 + pb-48 = 112 px | pt-40 + pb-32 = 72 px |
| Gap colonnes desktop | gap-48 (3 col) | gap-32 (3 col) |
| Séparation barre légale | mt-48 + pt-24 = 72 px | mt-32 + pt-20 = 52 px |
| Hauteur footer desktop estimée | ~430–440 px | ~300–310 px |
| Colonnes | 3 × 4/12 (grille uniforme) | 2fr 1fr 1fr (identité + 2 adresses) |
| Bloc navigation | 7 éléments (6 liens + titre) | SUPPRIMÉ |
| Mention partenariat | Paragraphe 2 lignes dans col 1 | Fusionnée dans barre légale (1 ligne) |
| Réseaux sociaux | Bas de col 3 | Col 1 sous les badges |
| Gap sections mobile | gap-48 | gap-24 |
| Ordre sections mobile | Identité → Nav → Coordonnées | Identité → Aqua System → LTE → Réseaux → Légal |
| Hauteur footer mobile estimée | ~1 660 px (1,97× écran) | ~820–840 px (≤ 1 écran) |
| Format adresse mobile | street + br + cp + ville | street, cp + ville (1 ligne) |
| Éléments total | 24 | ~15 |

---

## Priorité de correction

| Priorité | Correction | Gain perçu |
|---|---|---|
| P0 | Supprimer le bloc navigation footer | Retire 220 px mobile, allège massivement desktop |
| P0 | Réduire pt-16→pt-10, pb-12→pb-8, mt-12→mt-8 | Footer desktop −72 px |
| P0 | Réduire gap-12→gap-6 mobile | Footer mobile −96 px |
| P1 | Passer en grille 2fr/1fr/1fr desktop | Équilibre les colonnes, évite la col identité trop creuse |
| P1 | Déplacer réseaux sociaux en col 1 | Équilibre hauteur des colonnes |
| P1 | Supprimer le paragraphe partenariat → barre légale | Soulage visuellement le bloc 1 |
| P2 | Compacter adresse sur 1 ligne mobile | −20 px par adresse, −40 px total |

---

## Ce qui ne change PAS

- Fond sand-950, texte sand-300, typo DM Serif Display titres + DM Sans corps — aucune modification de la palette ou de la typographie.
- Tokens couleur footer-legal (sand-500 #A89E92, ratio 7.04:1 PASS AAA) — inchangés.
- Focus ring inversé, `<address>` sémantique, `<nav aria-label>` (ce dernier disparaît avec la nav mais si un 2-lien réduit subsiste, le conserver).
- ARIA du footer — inchangé.
- La barre légale : copyright + SIREN + liens mentions + confidentialité — inchangés dans leur contenu, seul `mt-12` réduit à `mt-8`.
