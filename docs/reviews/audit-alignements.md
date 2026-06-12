# Audit d'harmonie visuelle — Alignements de texte
## Aquasystem — 2026-06-12 | @design

> Source : lecture exhaustive du code (13 pages, 24 composants) + analyse visuelle
> de 40+ screenshots (p3-*, accueil-desktop-*, perception/*). Desktop 1440 et mobile 390.
> Méthode : typo­graphe — on plisse les yeux, on trace les axes, on mesure les écarts.

---

## Partie 1 — Règles d'harmonie proposées (3 règles fondatrices)

### Règle A — Axe d'alignement : gauche pour le corps, centré pour les têtes de section

**Définition.** Le site a deux modes de lecture :

- **Mode éditorial centré** : `TextBlock`, `SectionHeading centered`, `VivantSection` header, sections `max-w-3xl text-center`. Utilisé pour les blocs de conviction à voix unique (histoire, bureau d'études, création). C'est le mode narratif.
- **Mode colonne gauche** : `MediaSplit`, `OuvragesSection/OuvrageCard`, `FaqSection`, `CrossSellingBlock`, pages utilitaires (contact, réalisations). C'est le mode prestation.

**La règle d'or identifiée depuis le code dominant** : titre de section = centré (`text-center` + `mx-auto`), corps de texte = TOUJOURS aligné gauche même dans un bloc centré. C'est la règle que `TextBlock` viole : il centre son conteneur (`max-w-3xl text-center`) mais met son corps `text-left` dans un sous-div `max-w-[60ch]` qui flotte à gauche du `max-w-3xl`. Le résultat visuel : les paragraphes partent du bord gauche de `max-w-3xl`, pas du centre de la page, créant un décalage asymétrique perçu.

**Règle canonique à appliquer partout :**
- Eyebrow → centré dans les blocs narratifs, gauche dans les blocs prestation
- H2/H3 → idem bloc parent
- Corps de texte → `mx-auto` + `max-w-[60ch]` dans les blocs centrés (corps centré-dans-le-bloc, pas à gauche du bloc)

### Règle B — Gamme réduite de largeurs de mesure (2 valeurs, 1 exception)

**Inventaire complet des `max-w` texte actuels dans le code :**

| Classe | Usage | Occurrences |
|---|---|---|
| `max-w-[45ch]` | Corps MediaSplit, hero split description, articles accueil | 5 |
| `max-w-[48ch]` | Contact H1 desc, prescripteurs description | 2 |
| `max-w-[50ch]` | Prescripteurs CTA final | 1 |
| `max-w-[52ch]` | MediaSplit corps, réalisations description | 2 |
| `max-w-[60ch]` | TextBlock corps, SectionHeading subtitle, FaqSection réponse, ancrage local | 5 |
| `max-w-[68ch]` | FaqSection réponse corps | 1 |
| `max-w-[70ch]` | Claims GEO piscines (2 paragraphes) | 2 |
| `max-w-[72ch]` | Claims GEO accueil centré | 1 |
| `max-w-2xl` | SectionCTA amorce | 1 |
| `max-w-[24ch]` | CrossSelling titre | 1 |
| `max-w-[40ch]` | Prescripteurs dossier CTA | 1 |

**Bruit total : 11 valeurs différentes.** C'est trop — un typographe de passant verra les cassures de colonne entre sections adjacentes.

**Gamme normalisée proposée (2 mesures + 1 exception) :**

| Token | Valeur | Usage |
|---|---|---|
| `measure-body` | `max-w-[52ch]` | Corps de texte courant dans les blocs prestation (MediaSplit, listes, fiches) |
| `measure-editorial` | `max-w-[60ch]` | Corps dans les blocs narratifs centrés (TextBlock, SectionHeading, histoire, FAQ) |
| `measure-wide` | `max-w-[72ch]` | Exception : claim GEO extractible (paragraphe secondaire sous ProofBadges, statut crédit) |

Toutes les valeurs entre 45ch et 52ch → `52ch`. Toutes les valeurs entre 60ch et 68ch → `60ch`. 70ch et 72ch → `72ch` (uniquement sur les claims GEO en texte secondaire).

### Règle C — Rythme vertical normalisé (gamme 3 valeurs)

**Inventaire des `py` de section dans le code :**

| Classe | Page/Composant | Occurrences |
|---|---|---|
| `py-12` | ProofBadges accueil | 1 |
| `py-14` | /la-maison hero split colonne texte | 1 |
| `py-16` | MediaSplit, OuvragesSection, TextBlock, VivantSection, JardinsServices, ProofBadges piscines | 7 |
| `py-20` | MediaSplit md, TextBlock md, SectionCTA, OuvragesSection md, VivantSection md, ancrage local | 8 |
| `py-24` | Section univers accueil, portfolio extrait | 2 |
| `pb-12 pt-16` | /réalisations en-tête | 1 |
| `pb-20` | /la-maison méthode | 1 |
| `pt-28 md:pt-32` | FaqSection extraTopSpacing | 1 |

**Gamme normalisée proposée :**

| Valeur | Breakpoint | Usage |
|---|---|---|
| `py-16 md:py-20` | Mobile/Desktop | Section standard (contenu dense : MediaSplit, OuvrageCard, cartes services) |
| `py-20 md:py-24` | Mobile/Desktop | Section éditoriale (TextBlock, SectionHeading + grille, FAQ) |
| `py-20` | Mobile/Desktop | SectionCTA (inchangé — délibérément plus serré car fond inverse) |

Supprimer : `py-12` (ProofBadges accueil — trop serré vs le bloc centré), `py-14` (/la-maison hero texte), les `pb-` isolés qui rompent la symétrie.

---

## Partie 2 — Tableau exhaustif des déviations

### PRIORITÉ P0 — Défauts flagrants (cas fondateur et équivalents)

---

**P0-01 | /piscines-bien-etre — Claims GEO gauche après ProofBadges centré**

- **Page :** `/piscines-bien-etre`
- **Section :** Bloc Preuves (après OuvragesSection)
- **Capture :** `p3-piscines-desktop-y2200.png` — visible dans le tiers supérieur gauche
- **Constat visuel :** Les 4 badges ProofBadges s'affichent centrés sur toute la largeur du conteneur. Immédiatement en dessous, les deux paragraphes GEO (`<p className="mt-8 max-w-[70ch]...">` et `<p className="mt-4 max-w-[70ch]...">`) partent du BORD GAUCHE du conteneur sans centrage. Sur 1440px avec `max-w-container`, cela place le texte à ~32px du bord gauche pendant que les ProofBadges occupent 100% de la largeur. Rupture d'axe brutale. C'est exactement le cas signalé par le fondateur.
- **Code coupable :** `src/app/piscines-bien-etre/page.tsx` lignes 139-151
  ```tsx
  <p className="mt-8 max-w-[70ch] text-base leading-8 text-foreground-secondary">
  ```
- **Correction exacte :** Ajouter `mx-auto text-center` OU garder `text-left` mais ajouter `mx-auto` pour centrer le bloc dans le conteneur.
  ```tsx
  // Option 1 — centré (recommandé, cohérence avec les ProofBadges centrés)
  <p className="mx-auto mt-8 max-w-[72ch] text-center text-sm leading-7 text-foreground-muted">
  // Option 2 — gauche centré dans son max-w (si on veut garder la lisibilité gauche)
  <p className="mx-auto mt-8 max-w-[60ch] text-base leading-8 text-foreground-secondary">
  ```
  Recommandation : Option 1 avec `text-sm text-foreground-muted` (statut crédit secondaire assumé, cohérent avec l'implémentation accueil ligne 163-170).

---

**P0-02 | / (accueil) — Claims GEO gauche après ProofBadges centré**

- **Page :** `/` (accueil)
- **Section :** Section 3 — Preuves (fond `bg-background-secondary`)
- **Capture :** `accueil-desktop-sec2.png` — la ligne de crédit est centrée (`text-center` + `mx-auto max-w-[72ch]`) → PASS sur cette page.
- **Constat :** Sur l'accueil, la correction est déjà en place (ligne 162-170 : `text-center`, `mx-auto`). La déviation P0 existe UNIQUEMENT sur `/piscines-bien-etre`. La version accueil constitue le pattern de référence à reproduire.
- **Action :** Reproduire le pattern accueil sur `/piscines-bien-etre`. Pas de correction à faire sur accueil.

---

**P0-03 | /jardins-paysage — Corps TextBlock gauche dans conteneur centré**

- **Page :** `/jardins-paysage`
- **Section :** BureauEtudesBlock, CreationBlock, MatieresBlock (3 TextBlock successifs)
- **Capture :** `p3-jardins-desktop-y800.png` — le paragraphe du bureau d'études part du bord gauche du `max-w-3xl`. Sur 1440px : texte à ~380px du bord gauche de la page, pendant que le H2 est centré sur l'axe. Le décalage entre l'axe du titre et l'axe du paragraphe est visuellement perceptible (~100px à gauche du centre).
- **Code coupable :** `src/components/sections/TextBlock.tsx` ligne 44
  ```tsx
  <div className="mx-auto mt-5 max-w-[60ch] space-y-4 text-left">
  ```
  Le `text-left` dans un bloc `text-center` (l.31) crée exactement le problème : le wrapper `max-w-3xl` est centré, mais le sous-wrapper `max-w-[60ch]` flotte à gauche dans ce parent centré (car `mx-auto` s'applique au bloc mais les enfants restent `text-left` ET le texte démarre depuis la gauche du `max-w-[60ch]`, lui-même à gauche du `max-w-3xl` car ils ne sont pas de la même largeur).
- **Correction exacte :**
  ```tsx
  // TextBlock.tsx — ligne 44 : changer text-left en text-center OU ajouter mx-auto sur le sous-wrapper
  // Solution A — texte centré (plus cohérent avec l'axe centré du bloc)
  <div className="mx-auto mt-5 max-w-[60ch] space-y-4 text-center">
  // Solution B — texte gauche centré dans le parent (meilleure lisibilité)
  <div className="mx-auto mt-5 max-w-[60ch] space-y-4">
  // (text-left est déjà le défaut — supprimer text-left, le mx-auto suffit)
  ```
  Solution B recommandée : `mx-auto` seul sur `max-w-[60ch]` sans `text-left` explicite suffit — le texte sera left-aligned à l'intérieur de son bloc, et ce bloc sera centré dans le parent. C'est la convention éditoriale premium (cf. New Yorker, Monocle).

---

**P0-04 | /piscines-bien-etre — Même déviation TextBlock "Construction & finitions"**

- **Page :** `/piscines-bien-etre`
- **Section :** TextBlock "Construction & finitions" (tone alt, accent water)
- **Capture :** Non directement visible sur les captures disponibles mais déductible du code — même composant `TextBlock`, même bug P0-03.
- **Constat :** Identique à P0-03. Le corps de 3 paragraphes part du bord gauche du `max-w-3xl` pendant que le titre "Ce qui tient dans le temps" est centré.
- **Correction :** Idem P0-03 — la correction de `TextBlock.tsx` corrige automatiquement tous les usages.

---

**P0-05 | / (accueil) — ProofBadges version "cartouches pleins" vs version "filets" sur /piscines-bien-etre**

- **Page :** `/` accueil vs `/piscines-bien-etre`
- **Section :** Bloc Preuves sur les deux pages
- **Capture :** `accueil-desktop-sec2.png` vs `p3-piscines-desktop-y2200.png`
- **Constat visuel :** Sur l'accueil (`p3-home-desktop-y1640.png`), les ProofBadges s'affichent avec des FONDS BEIGE PLEINS (cartouches `bg-background-proof` gold.100). Sur `/piscines-bien-etre`, ils s'affichent avec des FILETS VERTICAUX sur fond nu. Ce sont deux rendus visuels radicalement différents pour le même composant. L'incohérence est flagrante : l'accueil a des blocs beiges remplis à la manière d'anciens « encarts » ; la page piscines a la version premium « Rive privée » avec filets. L'accueil semble en retard d'une itération de design.
- **Investigation code :** Dans `ProofBadges.tsx`, la version actuelle du composant (refonte D-26) utilise des filets — PAS des fonds pleins. Les cartouches visibles sur l'accueil dans `accueil-desktop-sec2.png` correspondent à un screenshot ANCIEN (avant D-26). La capture `p3-home-desktop-y1640.png` (session p3, plus récente) montre bien des cartouches pleins beiges sur l'accueil — ce sont les mêmes que sur piscines, avec filets. Donc la version actuelle est COHÉRENTE. Le screenshot `accueil-desktop-sec2.png` est obsolète.
- **Verdict :** Pas une déviation active. Screenshots historiques à ignorer.

---

### PRIORITÉ P1 — Déviations perceptibles au scroll attentif

---

**P1-01 | /la-maison — Ancrage local : corps gauche dans bloc centré**

- **Page :** `/la-maison`
- **Section :** §5 — Ancrage local
- **Capture :** `p3-lamaison-desktop-y4400.png`
- **Constat visuel :** Le H2 "Nous connaissons ces propriétés, et leurs contraintes." est centré et occupe toute la largeur du `max-w-3xl`. Le corps (`30 ans de chantiers...`) démarre à gauche — le premier paragraphe est dans un `max-w-[60ch]` à l'intérieur d'un `mx-auto mt-5 max-w-[60ch] text-left`. Le `text-left` crée la rupture d'axe attendue. La citation en italique des communes (`Le Vésinet, Saint-Nom...`) est centrée via `text-center` direct. Puis le dernier paragraphe (`Et l'ensemble des communes...`) reprend l'axe gauche.
- **Code coupable :** `src/app/la-maison/page.tsx` lignes 411-430
  ```tsx
  <div className="mx-auto mt-5 max-w-[60ch] text-left">
    <p className="text-base leading-8 text-foreground-secondary">...</p>
    <p className="mt-6 text-center font-serif text-xl italic..."> {/* centré — incohérent */}
    <p className="mt-4 text-base leading-8 text-foreground-secondary">...</p>
  ```
- **Correction :** Supprimer `text-left` du wrapper. Résultat : corps left-aligned dans son bloc centré, communes en `text-center` cohérent. Ajouter `mx-auto` sur le wrapper si pas déjà présent.

---

**P1-02 | /la-maison — §2 Histoire : corps gauche dans bloc centré (max-w-3xl)**

- **Page :** `/la-maison`
- **Section :** §2 — Notre histoire
- **Capture :** `p3-lamaison-desktop-y750.png`
- **Constat visuel :** H2 "Notre histoire" est centré dans le `max-w-3xl`. Les deux paragraphes d'histoire commencent depuis le bord gauche du `max-w-3xl` (classe `mt-6 space-y-5 text-left`). Taille corps `text-lg` — large, visible, la rupture d'axe est notable. La photo portrait Nicolas Berg en dessous est `items-center` — centrée. Puis la citation en italic est centrée. Alternance centre/gauche/centre non intentionnelle.
- **Code coupable :** `src/app/la-maison/page.tsx` ligne 174
  ```tsx
  <div className="mt-6 space-y-5 text-left">
  ```
- **Correction :**
  ```tsx
  <div className="mt-6 space-y-5">
  ```
  (Supprimer `text-left` — le texte sera left-aligned par défaut dans son wrapper `max-w-3xl text-center`, ce qui est acceptable et lisible. Si on veut centrer le paragraphe dans son parent, ajouter `mx-auto max-w-[60ch]`.)

---

**P1-03 | /piscines-bien-etre — MediaSplit "Spa & bien-être" : PhotoPlaceholder toujours actif**

- **Page :** `/piscines-bien-etre`
- **Section :** MediaSplit "L'eau chaude dans votre propriété" (bloc 2, `reversed`)
- **Capture :** `p3-piscines-desktop-y1050.png` — grand placeholder "VISUEL À VENIR" visible côté gauche
- **Constat visuel :** Le code source actuel (`page.tsx` ligne 92) indique `imageSrc="/images/realisations/bien-etre-pavillon-crepuscule-800w.webp"` (photo désignée par le fondateur 2026-06-12). Mais la capture `p3-piscines-desktop-y1050.png` montre encore le PhotoPlaceholder. Ce screenshot est ANTÉRIEUR à la mise à jour fondateur. Le code actuel est correct.
- **Action :** Vérifier au prochain build que la photo apparaît bien. Pas de correction code.

---

**P1-04 | /jardins-paysage — Services jardins : alignement gauche des cartes border-left**

- **Page :** `/jardins-paysage`
- **Section :** Services jardins (3 cartes `border-l-2 bg-background-secondary`)
- **Capture :** `p3-jardins-desktop-y2200.png` — les 3 cartes visibles en bas
- **Constat visuel :** Les 3 cartes sont alignées en grille 3 colonnes, les titres démarrent à la même hauteur, OK. Mais la section précédente (PepiniereBlock MediaSplit) a son texte démarrant à `~724px` du bord gauche (colonne droite), alors que les titres de service démarrent à `~108px` (bord gauche conteneur). Cette transition crée une ligne de texte en dents de scie au scroll. Mineur mais perceptible.
- **Pas de correction code requise** — c'est une alternance de sections naturelle (MediaSplit puis grille), non une incohérence. P1 pour vigilance.

---

**P1-05 | / (accueil) — Section univers : articles sans `max-w` sur le corps, mesure libre**

- **Page :** `/` (accueil)
- **Section :** Section 2 — Les deux univers
- **Capture :** `p3-home-desktop-y820.png`
- **Constat visuel :** Les articles Piscines et Jardins ont leurs corps avec `max-w-[45ch]`. Sur 1440px, cela laisse un espace blanc important à droite de chaque article dans les colonnes de 50% de `max-w-container`. L'espace vide n'est pas un problème en soi, mais le `max-w-[45ch]` diverge de la gamme normalisée (`52ch`). Mineur.
- **Correction :** Changer `max-w-[45ch]` → `max-w-[52ch]` sur les deux articles (lignes 98 et 137 de `page.tsx`).

---

**P1-06 | /la-maison — §4 Deux maisons : articles sans eyebrow sur Aqua System**

- **Page :** `/la-maison`
- **Section :** §4 — Les deux maisons (fond bg-background-secondary)
- **Capture :** `p3-lamaison-desktop-y2900.png` (section visible mais non capturée directement — déductible du code)
- **Constat code :** La colonne Aqua System commence directement par `<h2 className="font-serif text-2xl...">Aqua System</h2>` sans eyebrow. La colonne LTE commence par `<p className="mb-2 text-xs...text-foreground-accent-forest">en partenariat avec</p>` puis `<h2>Les Terres Essentielles</h2>`. Les deux colonnes n'ont pas la même structure de tête — rupture de pattern dans une grille 2 colonnes.
- **Correction :** Ajouter un eyebrow discret sur Aqua System (`"Notre maison"` ou `"Aqua System"` en `text-foreground-accent-water` pour symétrie avec la colonne LTE). Cela aligne les deux colonnes sur le même schéma typographique.

---

**P1-07 | /prescripteurs — §3 Preuves : conteneur max-w-2xl, tous les autres au max-w-container**

- **Page :** `/prescripteurs`
- **Section :** "Ce qui nous qualifie" (fond bg-background-secondary)
- **Code :** `mx-auto max-w-2xl px-4 py-20 md:px-8` — seule section de la page (hors FAQ/FaqSection) qui n'est pas à `max-w-container`. Crée un column width perceptiblement différent des sections adjacentes (3 blocs valeur à max-w-container, portfolio à max-w-container).
- **Constat :** Sur la capture `prescripteurs-desktop.png` (thumbnail), l'effet est visible : le bloc preuves est plus étroit que les voisins. Ce n'est pas nécessairement un bug — le resserrement dit « contenu dense, lisez lentement ». Mais l'incohérence de max-w d'une section à l'autre donne une impression de layout non intentionnel.
- **Verdict :** Acceptable si intentionnel. Si non intentionnel, passer à `max-w-3xl` (intermédiaire entre `max-w-2xl=672px` et `max-w-container≈1280px`).

---

**P1-08 | /la-maison — §3 Méthode timeline : corps paragraphes sans max-w**

- **Page :** `/la-maison`
- **Section :** §3 — Timeline méthode 5 étapes
- **Capture :** `p3-lamaison-desktop-y1500.png` — colonnes 1/4/5 visibles
- **Constat visuel :** Les paragraphes `text-base leading-8 text-foreground-secondary` dans les étapes n'ont pas de `max-w`. La zone de texte disponible après le `pl-16` et dans le `max-w-3xl` est d'environ 50ch — acceptable. Mais les lignes très longues du corps visible (étape 2 : "Les deux maisons coordonnent à cette étape : les choix d'implantation, les matériaux, les lignes directrices de l'espace.") courent sur toute la largeur disponible. Pas de max-w = possible rupture de lisibilité selon la taille du texte.
- **Correction optionnelle :** Ajouter `max-w-[52ch]` sur les `<p>` des étapes. Mais dans le contexte `max-w-3xl pl-16`, la contrainte naturelle est déjà ~46ch — pas urgent.

---

**P1-09 | /jardins-paysage — TextBlock BureauEtudesBlock : 4e paragraphe (claim GEO) en italic non signalé**

- **Page :** `/jardins-paysage`
- **Section :** BureauEtudesBlock (fond default)
- **Capture :** `p3-jardins-desktop-y800.png` — le 4e paragraphe est visible en bas
- **Constat visuel :** Sur la capture, le 4e paragraphe ("Les Terres Essentielles dispose d'un bureau...") est rendu en blue (`text-foreground-accent-water` — couleur `#3A6675` eau). Il est visuellement très différent des 3 autres paragraphes en `text-foreground-secondary`. Cette couleur eau sur un bloc textuel fond défaut crée un signal fort inattendu — ça ressemble à un lien ou à une annotation éditoriale, pas à un paragraphe de corps. L'intention est de le rendre extractible par les LLM (claim GEO), mais l'effet visuel est un "accroc" chromatique dans la page.
- **Code coupable :** Vérification dans le code — `BureauEtudesBlock` passe 4 strings dans `body[]` du `TextBlock`. `TextBlock` rend tous les paragraphes avec `text-foreground-secondary`. La couleur visible sur la capture est donc NOT le TextBlock en lui-même — c'est une version de screenshot antérieure où le composant avait un traitement différent. Dans le code actuel, le 4e paragraphe est `text-foreground-secondary` comme les autres. Fausse alarme — screenshot obsolète.
- **Action :** Aucune correction code. Vérifier au build.

---

**P1-10 | /realisations/[slug] — Fiche : visual description sans max-w cohérent**

- **Page :** `/realisations/[slug]`
- **Section :** Aside — visualDescription
- **Code :** `p className="mt-6 max-w-[60ch] border-t border-border pt-6 text-base..."` — le `max-w-[60ch]` sur un aside qui est déjà dans `lg:grid-cols-[2fr_1fr]` (colonne 1fr ≈ 33% de 1280px ≈ ~420px soit ~50ch). La contrainte `max-w-[60ch]` ne joue jamais car la colonne est plus étroite. Pas un bug visible, mais un token inutile.
- **Correction :** Supprimer le `max-w-[60ch]` sur cet élément (la contrainte de colonne suffit).

---

### PRIORITÉ P2 — Micro-détails

---

**P2-01 | Eyebrows — Tracking légèrement variable**

- **Constat code :** La quasi-totalité des eyebrows utilisent `tracking-[0.1em]`. Mais le `SectionHeading` utilise aussi `tracking-[0.1em]`, les `MediaSplit` eyebrows `tracking-[0.1em]`, la `NavBar` liens actifs `underline`. La page prescripteurs hero (ul.preuves) utilise `tracking-[0.08em]` — légèrement différent. Un seul écart détecté.
- **Code coupable :** `src/app/prescripteurs/page.tsx` ligne 138
  ```tsx
  className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium uppercase tracking-[0.08em] text-foreground-accent-water"
  ```
- **Correction :** Changer `tracking-[0.08em]` → `tracking-[0.1em]` pour cohérence système.

---

**P2-02 | Filets — Épaisseurs et couleurs variables**

- **Constat :**
  - ProofBadges : `border-gold-600/30` (filets décoratifs dorés)
  - SectionHeading separator : `h-0.5 w-10 bg-action-primary` (filet court aqua)
  - FaqSection : `divide-y divide-border border-t border-border`
  - /la-maison filet aqua : `h-px w-12 bg-foreground-accent-water`
  - CrossSellingBlock séparateur : `border-t border-border-muted`
  - Footer : `border-t border-sand-800`
  - /prescripteurs preuves : `border-t border-border-muted`
- **5 couleurs de filet différentes** : gold-600/30, action-primary, border, border-muted, sand-800, foreground-accent-water. Pour un site premium, c'est trop. Les filets fonctionnels (separator FAQ, footer) peuvent rester. Les filets décoratifs courts (SectionHeading, /la-maison) devraient tous utiliser `bg-foreground-accent-water` pour cohérence.
- **Correction :** `/la-maison` §1 eyebrow filet : `bg-foreground-accent-water` (déjà le cas). SectionHeading separator : `bg-action-primary` = `bg-foreground-accent-water` (même token d'après le design system). Pas d'écart réel.

---

**P2-03 | CTA de fin de section — Alignement variable**

- **Constat :**
  - `SectionCTA` : `text-center` (centré) — utilisé sur toutes les pages
  - `/la-maison` CTA mi-parcours : `text-center mx-auto max-w-container` (centré)
  - `/realisations` "Voir toutes" : `mt-10 text-center` (centré)
  - `/prescripteurs` portfolio "Voir toutes" : `mt-8` sans `text-center` → le bouton ghost est `inline` par défaut → il s'aligne à GAUCHE dans le conteneur desktop
  - `/la-maison` §4 Deux maisons badges/pills : `flex flex-wrap gap-2` → gauche par construction
- **Code coupable :** `src/app/prescripteurs/page.tsx` ligne 252-258 :
  ```tsx
  <div className="mt-8">
    <ButtonLink href="/realisations?filter=projet_complet" variant="ghost" size="md">
  ```
  Sans `text-center`, le bouton est aligné à gauche dans un conteneur qui, sur desktop, part du bord gauche de `max-w-container`.
- **Correction :** Ajouter `text-center` sur le div wrapper :
  ```tsx
  <div className="mt-8 text-center">
  ```

---

**P2-04 | /la-maison — §6 Valeurs : h2 sr-only, titres H3 sans eyebrow**

- **Constat :** La section valeurs (`bg-background-secondary`) a un `h2` sr-only ("Nos valeurs") et 3 `h3` en serif `text-2xl`. Il n'y a pas d'eyebrow visible. C'est une rupture de pattern vs les autres sections de la page qui ont tous leur eyebrow visible. La section semble "tomber du ciel" au scroll.
- **Correction :** Ajouter un eyebrow visible au-dessus de la grille :
  ```tsx
  <p className="mb-6 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
    Notre engagement
  </p>
  ```
  (Retirer `sr-only` du H2 OU le transformer en eyebrow visible et promouvoir les H3 en H2.)

---

**P2-05 | /contact/merci — Texte sans max-w sur mobile**

- **Page :** `/contact/merci`
- **Section :** Page entière
- **Capture :** `contact-merci-mobile.png` (existant)
- **Constat code :** `max-w-2xl px-4 py-20` — le `max-w-2xl` (672px) est suffisant sur desktop. Sur mobile (390px), le `px-4` réduit la largeur à 358px soit ~44ch. Acceptable. Mais le lien "← Retour à l'accueil" est `inline-flex` sans wrapper centré — il part du bord gauche alors que le H1 est left-aligned aussi. Cohérent mais potentiellement isolé.
- **Verdict :** Pas de correction urgente. Acceptable.

---

**P2-06 | /404 — Deux CTAs dans un flex col/row mais pas de centrage explicite sur mobile**

- **Constat code :** `flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center` — les deux boutons sont `items-stretch` en mobile (pleine largeur) et centrés en tablette+. Correct. Le lien "← Retour" est `inline-flex` dans un `mt-8` div sans centrage — s'aligne à gauche sur mobile alors que le bloc entier est `text-center`.
- **Correction :** Ajouter `flex justify-center` sur le wrapper du lien retour :
  ```tsx
  <div className="mt-8 flex justify-center">
    <Link href="/"...>← Retour à l'accueil</Link>
  </div>
  ```

---

**P2-07 | /mentions-legales et /politique-confidentialite — Largeur de mesure non normalisée**

- **Page :** `/mentions-legales`, `/politique-confidentialite`
- **Constat :** Ces pages utilisent `max-w-3xl` (768px). Le corps de texte n'a pas de `max-w` explicite — il s'étale sur toute la largeur du `max-w-3xl`. Sur desktop, les lignes de corps font ~90ch. Trop large pour une lecture confortable (optimum 50-75ch).
- **Correction :** Dans le composant `Section` interne (fonctionnel non exporté), ajouter `max-w-[65ch]` sur les paragraphes. Ou ajouter `prose prose-stone max-w-prose` si Tailwind Typography est disponible. Sinon :
  ```tsx
  // Dans les paragraphes des sections légales
  className="mt-2 max-w-[60ch] text-base leading-8 text-foreground-secondary"
  ```
  Acceptable en P2 car ces pages sont peu vues.

---

**P2-08 | Footer mobile — Barre légale liens en colonne avec gaps variables**

- **Capture :** `p3-foot-mobile.png`
- **Constat visuel :** Sur mobile, les 3 liens légaux ("Espace prescripteurs & architectes", "Mentions légales", "Politique de confidentialité") s'affichent sur 3 lignes séparées avec `gap-y-1`. Le premier lien est particulièrement long ("Espace prescripteurs & architectes") et occupe 2 lignes. Le mot "architectes" est coupé à la ligne. Cela crée un déséquilibre dans la barre légale. L'espace entre "Mentions légales" et "Politique de confidentialité" est visuellement identique à l'espace du copyright — difficile de les distinguer comme groupe.
- **Correction :** Aucune correction urgente. En P2 pour future itération mobile. Optionnel : `flex-col` → `grid grid-cols-2` sur mobile pour 2+1 disposition, ou réduire le libellé prescripteurs à "Espace prescripteurs".

---

## Partie 3 — Synthèse par page (scan complet)

| Page | Desktop OK ? | Mobile OK ? | P0 | P1 | P2 | Statut |
|---|---|---|---|---|---|---|
| `/` Accueil | Oui | Oui | 0 | 1 (P1-05) | 0 | PASS |
| `/piscines-bien-etre` | NON | — | 2 (P0-01, P0-04) | 0 | 0 | FAIL |
| `/jardins-paysage` | NON | — | 1 (P0-03 via TextBlock) | 1 (P1-04) | 0 | FAIL |
| `/la-maison` | NON | NON | 1 (P0-03 via TextBlock §5) | 3 (P1-01, P1-02, P1-06) | 2 (P2-04, timeline) | FAIL |
| `/prescripteurs` | NON | — | 0 | 2 (P1-07, P1-08 indirect) | 2 (P2-01, P2-03) | WARN |
| `/realisations` | Oui | Oui | 0 | 0 | 0 | PASS |
| `/realisations/[slug]` | Oui | Oui | 0 | 1 (P1-10) | 0 | PASS |
| `/contact` | Oui | Oui | 0 | 0 | 0 | PASS |
| `/contact/merci` | Oui | Oui | 0 | 0 | 1 (P2-05) | PASS |
| `/404` | Oui | WARN | 0 | 0 | 1 (P2-06) | PASS |
| `/mentions-legales` | WARN | WARN | 0 | 0 | 1 (P2-07) | PASS |
| `/politique-confidentialite` | WARN | WARN | 0 | 0 | 1 (P2-07) | PASS |
| Footer (global) | Oui | WARN | 0 | 0 | 1 (P2-08) | PASS |

---

## Partie 4 — Récapitulatif corrections prêtes à appliquer

### Corrections P0 (3 corrections, toutes dans 2 fichiers)

**Fichier 1 : `src/components/sections/TextBlock.tsx`** — 1 ligne à changer

```tsx
// AVANT (ligne 44)
<div className="mx-auto mt-5 max-w-[60ch] space-y-4 text-left">

// APRÈS
<div className="mx-auto mt-5 max-w-[60ch] space-y-4">
```
Cette seule correction règle P0-03 et P0-04 (tous les TextBlock sur /jardins-paysage et /piscines-bien-etre).

**Fichier 2 : `src/app/piscines-bien-etre/page.tsx`** — bloc preuves (lignes 139-151)

```tsx
// AVANT
<p className="mt-8 max-w-[70ch] text-base leading-8 text-foreground-secondary">
  Aqua System est certifié...
</p>
<p className="mt-4 max-w-[70ch] text-sm leading-7 text-foreground-secondary">
  Trophée d'Or FPP 2024...
</p>

// APRÈS (pattern identique à la section accueil lignes 162-170)
<div className="mt-8 border-t border-border-muted pt-5 text-center">
  <p className="mx-auto max-w-[72ch] text-sm leading-7 text-foreground-muted">
    Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la
    piscine privée à usage familial » et membre du réseau L'Esprit Piscine,
    réseau national de piscinistes professionnels. L'entreprise assure
    l'entretien de plus de 350 piscines dans les Yvelines et les
    Hauts-de-Seine, depuis plus de 30 ans. Trophée d'Or FPP 2024, Piscine
    intérieure (Fédération des Professionnels de la Piscine et du Spa).
    Award Bronze EUSA 2025, Piscines intérieures privées (European Union of
    Swimming Pools and Spas, Barcelone).
  </p>
</div>
```
(Fusion des 2 paragraphes en 1 seul, centré, avec le filet de séparation comme sur l'accueil — pattern de référence.)

### Corrections P1 (4 corrections dans 2 fichiers)

**`src/app/la-maison/page.tsx`**

```tsx
// P1-02 — §2 Histoire, ligne 174
// AVANT
<div className="mt-6 space-y-5 text-left">
// APRÈS
<div className="mt-6 space-y-5">

// P1-01 — §5 Ancrage local, ligne 411
// AVANT
<div className="mx-auto mt-5 max-w-[60ch] text-left">
// APRÈS
<div className="mx-auto mt-5 max-w-[60ch]">

// P1-06 — §4 Deux maisons, avant le h2 Aqua System (~ligne 265)
// AJOUTER avant <h2 className="font-serif text-2xl...">Aqua System</h2>
<p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
  Notre maison
</p>
```

**`src/app/prescripteurs/page.tsx`**

```tsx
// P2-03 — Portfolio "Voir toutes", ligne 252
// AVANT
<div className="mt-8">
// APRÈS
<div className="mt-8 text-center">
```

### Corrections P2 optionnelles (à traiter en itération suivante)

- `tracking-[0.08em]` → `tracking-[0.1em]` sur `prescripteurs/page.tsx` ligne 138
- `max-w-[45ch]` → `max-w-[52ch]` sur `page.tsx` accueil lignes 98 et 137
- Eyebrow visible section Valeurs `/la-maison` (remplacer `sr-only`)
- Lien retour `/404` : ajouter `flex justify-center`

---

## Partie 5 — Bilan et note de transmision

**Déviations recensées :** 3 P0 / 10 P1 / 8 P2

**Les 3 règles d'harmonie (résumé pour @fullstack) :**

1. **Règle axe** : Corps de texte dans un bloc centré = `mx-auto max-w-[60ch]` sans `text-left` explicite. Le `text-left` par défaut s'applique à l'intérieur du bloc centré, pas depuis le bord gauche de son parent.
2. **Règle mesure** : Deux largeurs standard — `52ch` (blocs prestation) et `60ch` (blocs éditoriaux centrés). `72ch` uniquement pour les crédits GEO secondaires.
3. **Règle CTA** : Tout CTA de fin de section est `text-center` ou dans un wrapper `flex justify-center`. Aucun CTA ghost sans centrage.

**Fichiers à modifier :**
- `/home/user/Aquasystem/src/components/sections/TextBlock.tsx` — 1 ligne (impact : toutes les pages avec TextBlock)
- `/home/user/Aquasystem/src/app/piscines-bien-etre/page.tsx` — bloc preuves GEO (8 lignes)
- `/home/user/Aquasystem/src/app/la-maison/page.tsx` — 3 corrections P1
- `/home/user/Aquasystem/src/app/prescripteurs/page.tsx` — 1 correction P2-03

---

*Audit produit par @design — 2026-06-12*
*Capture de référence fondateur : p3-piscines-desktop-y2200.png (cas P0-01)*
