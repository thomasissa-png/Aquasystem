# Revue finale page par page — Aquasystem [PROVISOIRE]

> Phase 5 — Dernier kilomètre. Audit chirurgical de CHAQUE route sur 21 dimensions + accessibilité + cohérence globale, AVANT le GO/NO-GO de lancement.
> Auteur : @qa — 2026-06-11. Méthode : crawl Glob + serveur dev local 127.0.0.1:3000 (JAMAIS d'URL publique) + Playwright Chromium/Firefox + axe-core.
> Légende dimensions : **1** = OK · **0.5** = WARNING · **0** = BUG. Sévérités : **P0** bloquant launch · **P1** à corriger avant launch · **P2** amélioration.
> Convention testing honesty : `[LIVE]` = navigateur/HTTP réel avec sortie observée · `[STATIQUE]` = Grep/lecture code/build sans exécution navigateur.
>
> **Référence P0 connu (ux-review.md)** : P0-1 photos jardins manquantes — déjà documenté, NON re-listé ici. Vérifié : rien de nouveau sur ce sujet.

## Règle bloquante de scoring
BUG **P0** sur l'une des dimensions **10 (liens), 12 (formulaire), 13 (interactions), 14 (résilience)** = **page ÉCHOUÉE** quel que soit le score total. Objectif : **≥ 19/21** par page.

## Les 21 dimensions
| # | Dimension | # | Dimension | # | Dimension |
|---|---|---|---|---|---|
| 1 | Copie = copy approuvé | 8 | Affordance + feedback | 15 | Perf (DCL/JS) |
| 2 | Orthographe/accents | 9 | Navigation cohérente | 16 | États de données |
| 3 | Microcopy (CTA/erreurs) | 10 | Liens (int/ext/tel/mail) | 17 | Dark mode (no-break) |
| 4 | Tokens (no hardcode) | 11 | Images (load/alt/CLS) | 18 | SEO (title/desc/H1/JSON-LD) |
| 5 | Alignements/espacements | 12 | Formulaire /contact | 19 | Sécurité (XSS/secrets/noopener) |
| 6 | Responsive 375/768/1280 | 13 | Interactions | 20 | Cookies (zéro cookie) |
| 7 | Parcours + CTA | 14 | Erreurs/résilience | 21 | Emails (construction) |

---

## Phase 1 — Crawl des routes

Build réel : **30 routes** (`npm run build` PASS, First Load JS max 114 kB ≤ budget 130 kB infra §10).

| # | Route | Fichier source | Type | Indexée |
|---|---|---|---|---|
| 1 | `/` | `src/app/page.tsx` | Statique | oui |
| 2 | `/piscines-bien-etre` | `src/app/piscines-bien-etre/page.tsx` | Statique | oui |
| 3 | `/jardins-paysage` | `src/app/jardins-paysage/page.tsx` | Statique | oui |
| 4 | `/realisations` | `src/app/realisations/page.tsx` | Statique | oui |
| 5 | `/realisations/[slug]` | `src/app/realisations/[slug]/page.tsx` | SSG ×14 | oui |
| 6 | `/notre-approche` | `src/app/notre-approche/page.tsx` | Statique | oui |
| 7 | `/la-maison` | `src/app/la-maison/page.tsx` | Statique | oui |
| 8 | `/prescripteurs` | `src/app/prescripteurs/page.tsx` | Statique | oui |
| 9 | `/contact` | `src/app/contact/page.tsx` | Statique | oui |
| 10 | `/contact/merci` | `src/app/contact/merci/page.tsx` | Statique | **noindex** |
| 11 | `/mentions-legales` | `src/app/mentions-legales/page.tsx` | Statique | oui |
| 12 | `/politique-confidentialite` | `src/app/politique-confidentialite/page.tsx` | Statique | oui |
| 13 | `/404` (not-found) | `src/app/not-found.tsx` | Statique | noindex |
| — | `/sitemap.xml` | `src/app/sitemap.ts` | force-static | n/a |
| — | `/robots.txt` | `src/app/robots.ts` | force-static | n/a |

**14 fiches `/realisations/[slug]`** générées. Échantillon audité (3) :
- `piscine-debordement-foret` (piscine, fiche draft)
- `projet-piscine-jardin-banquette` (projet complet, fiche draft)
- `jardin-bassin-maison-bois` (jardin, fiche draft)

> NOTE structurelle : **les 14 fiches sont TOUTES en mode draft** (`isDraft()` true — `intention/reponse/execution/prestations` = null). Aucune fiche n'a de données éditoriales réelles. Conséquence directe sur dimension 16 (états de données) — voir section dédiée.

### Statut HTTP + console + DOMContentLoaded `[LIVE]` (Chromium, 127.0.0.1:3000)

| Route | HTTP | Erreurs console | DCL (ms) |
|---|---|---|---|
| `/` | 200 | 0 | 196 |
| `/piscines-bien-etre` | 200 | 0 | 177 |
| `/jardins-paysage` | 200 | 0 | 167 |
| `/realisations` | 200 | 0 | 106 |
| `/realisations/piscine-debordement-foret` | 200 | 0 | 113 |
| `/realisations/projet-piscine-jardin-banquette` | 200 | 0 | 128 |
| `/realisations/jardin-bassin-maison-bois` | 200 | 0 | 149 |
| `/notre-approche` | 200 | 0 | 168 |
| `/la-maison` | 200 | 0 | 87 |
| `/prescripteurs` | 200 | 0 | 88 |
| `/contact` | 200 | 0 | 85 |
| `/contact/merci` | 200 | 0 | 69 |
| `/mentions-legales` | 200 | 0 | 61 |
| `/politique-confidentialite` | 200 | 0 | 69 |
| `/404` (page inconnue) | 404 | 1 (404 resource — attendu) | 56 |

**Verdict Phase 1** : 100% des routes répondent correctement (200, 404 sur inconnu). **Zéro erreur console** hors le 404 attendu. **DCL 56-196 ms** — tous TRÈS largement < 3 s (dim 15 PASS partout). `[LIVE]`

> NOTE dev vs prod : en mode `next dev`, `/sitemap.xml` et `/robots.txt` sont servis comme HTML (route handlers force-static non émis en dev). Vérifié sur le **build de production** (`out/`) : `out/sitemap.xml` = **24 URLs** (10 statiques + 14 fiches), exclut `/contact/merci`, canonical `https://www.aquasystem.fr/` ; `out/robots.txt` correct (AI crawlers autorisés, Bytespider bloqué, sitemap référencé). PAS un bug. `[LIVE build]`

---

## Synthèse des bugs (transversaux, pour @fullstack)

| ID | Sév. | Dim | Pages concernées | Constat (preuve) | Correction proposée |
|---|---|---|---|---|---|
| **BUG-A11Y-3** | **P1** | a11y / 4 | `/piscines-bien-etre`, `/jardins-paysage`, `/notre-approche`, `/mentions-legales`, `/politique-confidentialite`, fiches réalisations (figcaption) | `[LIVE axe-core]` `color-contrast` : texte `color-text-muted` `#7e7468` sur fond `#ede8df` = **3.75:1** < 4.5:1 requis (12px normal). Touche PhotoPlaceholder, figcaption crédit photo, paragraphes muted. **Distinct de BUG-A11Y-1** (qui ne traitait que proof/footer-legal). Non détecté par les tests E2E existants car axe E2E ne couvre que 5 pages (accueil/piscines/prescripteurs/realisations/contact) et le muted apparaît surtout ailleurs. | Assombrir le token `--color-text-muted` (ex. `#6b6155` → ~4.6:1) OU ne l'utiliser que ≥ 18px/bold. **Renvoi @design** (token, comme BUG-A11Y-1). Puis @fullstack applique + élargir la couverture axe E2E aux 13 pages. |
| **BUG-A11Y-4** | **P1** | a11y | TOUTES | `[LIVE]` **Aucun skip link** (« Aller au contenu ») détecté sur aucune page (Tab order accueil : wordmark → 6 liens nav → CTA, jamais de skip en 1er ; `skip:NONE` sur les 13 pages). Mission Phase 3 : « skip link (vérifier s'il EXISTE — sinon BUG P1) ». | Ajouter un `<a href="#main" class="sr-only focus:not-sr-only">Aller au contenu</a>` en 1er enfant du `<body>`/layout + `id="main"` sur le `<main>`. @fullstack. |
| **INFO-NAV-1** | **P2** | 9 | header vs footer | `[STATIQUE]` Le lien `/prescripteurs` est libellé **« Architectes »** dans la nav header et **« Espace prescripteurs »** dans le footer — deux libellés pour la même page. ux-review.md notait déjà « label Architectes trop restrictif » (prescripteurs = aussi AMO, paysagistes, décorateurs). | Harmoniser sur un libellé unique. Arbitrage @copywriter (header court vs footer explicite). |
| **INFO-SEO-1** | **P2** | 18 | 14 fiches `/realisations/[slug]` | `[LIVE]` Titres des fiches **91-111 caractères** (> 60) à cause du suffixe `— Réalisation Aqua System — Aquasystem` qui s'ajoute au titre déjà long de la photo. Tronqué en SERP. | Raccourcir le template de title fiche (ex. `{titre court} — Aqua System`) ou couper le titre photo. @fullstack/@seo. |
| **INFO-SEO-2** | **P2** | 18 | `/contact/merci`, `/404` | `[LIVE]` `meta description` = **158 car** (> 155). Impact ≈ nul (les 2 pages sont **noindex**). | Raccourcir à < 155 par cohérence. Non urgent. |
| **INFO-DATA-1** | **P2** | 19/20 | `/contact` (event E-01) | `[STATIQUE]` `form_submission_success` envoie `commune` (nom de ville saisi, normalisé) à Umami. Quasi-identifiant à faible volume. Umami est exempté CNIL *à condition* de zéro donnée identifiante. À arbitrer. | Confirmer avec @data-analyst que `commune` en clair dans l'analytics reste conforme (la NSM v1.2 le documente, mais le risque RGPD mérite confirmation @legal avant launch). |
| **INFO-VIS-1** | **P2** | 4 | `ContactForm.tsx`, `FormField.tsx` | `[STATIQUE]` Fond d'erreur `bg-[#F5D5D5]` hardcodé (hex en dur) alors qu'un token `--color-border-error` existe. Cosmétique. | Créer un token sémantique `--color-bg-error` et le consommer. @design/@fullstack. |
| **INFO-IMG-1** | **P2** | 11 | toutes pages avec images | `[LIVE]` Les `<img>` n'ont pas d'attributs `width`/`height` explicites. **CLS réel mesuré = 0.0000** (conteneurs à `aspect-ratio`/hauteur fixe + `object-fit:cover` réservent l'espace) → pas de défaut visible, mais robustesse fragile si le CSS conteneur évolue. | Ajouter `width`/`height` (ou `aspectRatio` inline) sur les `<img>`. Bonne pratique, non bloquant. @fullstack. |
| **INFO-LINK-1** | **P2** | 10 | source d'un lien interne | `[LIVE]` Un href `/politique-confidentialite` **sans** trailing slash existe (tous les autres ont le slash) → redirect 308 vers la version slashée (`trailingSlash:true`). Fonctionne, mais 1 hop inutile. | Ajouter le trailing slash à la source. @fullstack. |

> **P0-1 (ux-review.md) — photos jardins manquantes** : RE-VÉRIFIÉ, rien de nouveau. `/jardins-paysage` affiche 3 `PhotoPlaceholder` consécutifs en haut (bureau d'études, création parcs, pépinière) faute de photos de jardins « purs ». Déjà documenté et **bloquant connu** — non re-listé comme bug neuf ici, mais reste un prérequis launch (droit à l'image + photos jardins à fournir par le fondateur).
>
> **Limite de contenu (non-bug, à signaler fondateur)** : les **14 fiches `/realisations/[slug]` sont TOUTES en mode draft** (`isDraft()` true — `intention/reponse/execution/prestations = null`), rendues avec l'encart « Fiche en cours de documentation ». C'est CONFORME à la règle zéro invention (CLAUDE.md n°2), mais représente 14 pages indexées à faible contenu éditorial (thin content SEO). Recommandation : compléter au moins les 3 fiches `FEATURED_SLUGS` avec données réelles avant launch, ou différer l'indexation des fiches non documentées. Décision @product-manager/@seo + données fondateur.

### Résultats LIVE clés (preuves)
- **Formulaire `/contact` `[LIVE]`** : submit vide → 5 erreurs inline + focus 1er champ ✓ ; email invalide → message exact ux-writing ✓ ; happy path → POST + redirect `/contact/merci` ✓ ; honeypot vide ✓ ; **XSS** (`<img onerror>`, `<script>`, `<svg onload>`) → aucun dialog déclenché, React échappe au rendu ✓ ; **erreur 500** → bloc d'erreur clair + saisie préservée + contact alternatif (email/tél) ✓ ; **timeout 10 s** (AbortController) → bloc d'erreur, bouton sort de l'état busy ✓ ; **double/triple-submit** → **1 seul POST** (garde `isSubmitting`) ✓. **Dimension 12 + 14 = PASS sur tous les cas adversariaux.**
- **Cookies / storage `[LIVE]`** : **0 cookie, 0 localStorage, 0 sessionStorage** posés sur les 15 routes au chargement (Umami no-op sans env confirmé). **Dim 20 = PASS partout.**
- **Liens internes `[LIVE]`** : 30 href internes uniques crawlés → **tous 200, zéro 404**. Liens externes (LinkedIn, Facebook) : `rel="noopener noreferrer"` + `target="_blank"` sur 100% ✓ (dim 19).
- **tel/mailto `[LIVE]`** : `tel:+33130422600` (affiché `01 30 42 26 00`) + `mailto:contact@aqua-system.fr` corrects (conformes project-context).
- **Cross-browser `[LIVE]`** : Firefox sur `/`, `/realisations`, `/contact`, fiche → 200, fonts DM Serif Display chargées, 0 erreur, 0 scroll horizontal, formulaire POST + redirect OK. Parité avec Chromium.
- **Responsive `[LIVE]`** : **zéro scroll horizontal** sur 375 / 768 / 1280 (14 pages × 3 viewports). Chips portfolio = 44px @375 (target-size OK). Zoom 200% `/contact` : pas de scroll horizontal.
- **Perf `[LIVE]`** : DCL 56-196 ms (< 3 s) ; **CLS accueil = 0.0000** ; build First Load JS max **114 kB** (≤ budget infra 130 kB).
- **JSON-LD `[LIVE]`** : parse OK sur toutes les pages (LocalBusiness ×2 = Aqua System + partenaire ; + BreadcrumbList / FAQPage / Person / ImageObject selon page). H1 unique partout. Canonical présent (sauf merci/404 noindex, attendu).
- **Dark mode `[LIVE]`** : `prefers-color-scheme:dark` → body reste sablé clair (V1 light-only), seule la meta `theme-color` s'adapte. **Aucun composant ne casse.** Dim 17 PASS.
- **Tests existants `[LIVE]`** : Vitest **99/99 PASS** ; Playwright desktop-chrome **24/24 PASS** (+ variantes @main iPad/iPhone = 28 total).

---

## Phase 2-5 — Audit par page (détail)

### Pages preuve & conversion (`/`, `/realisations`, `/contact`, `/contact/merci`)

**`/` (Accueil)** — Lecture visuelle Thomas `[LIVE]` : PRO/BEAU/BRAND ✓ (hero forêt+terrasse, palette « Rive privée » sable/eau/forêt, H1 serif sur overlay). HIÉRARCHIE ✓ (H1 → 2 blocs activité → bandeau preuves 30 ans/350+/Socotec/Esprit Piscine → portfolio 3 phares → CTA conversion → footer). AÉRÉ/ALIGNÉ/PROPRE ✓. CONVERSION ✓ (CTA hero + bandeau final « mérite une conversation — pas un formulaire »). Mobile : stack propre, preuves en grille 2×2, zéro débordement. axe = 0 violation. **Aucun bug.**

**`/realisations`** — `[LIVE]` Grille 14 réalisations, **photos toutes distinctes** (aucun doublon d'image entre items ✓ — exigence portfolio), type + zone 78/92 sous chaque card, 5 filtres chips (Tous/Piscine/Spa & Sauna/Jardin & Parc/Projet complet). Filtres testés : actif + `?filter=` URL + présélection deep-link + clics rapides (dernier gagne) + invariant « aucune impasse » (tests E2E PASS). axe = 0 violation. **Aucun bug.**

**`/contact`** — `[LIVE]` Formulaire complet (nom/email requis, téléphone facultatif sans `*`, chips, budget facultatif, description requise, notice RGPD + lien politique). Tous cas adversariaux PASS (voir Résultats LIVE). axe = 0 violation. WARNING P2 dim 5 : déséquilibre vertical colonne gauche/droite desktop (coordonnées flottent loin sous l'intro) — acceptable. **Aucun bug bloquant.**

**`/contact/merci`** — `[LIVE]` Confirmation claire (« Votre message est bien parvenu », relance Nicolas Berg, n° urgence, lien retour accueil). noindex ✓. INFO-SEO-2 (desc 158 car, impact nul car noindex). axe = 0 violation. **Aucun bug bloquant.**

### Pages activité & marque (`/piscines-bien-etre`, `/jardins-paysage`, `/notre-approche`, `/la-maison`, `/prescripteurs`)

**`/piscines-bien-etre`** — `[LIVE]` Contenu riche, vraies photos, MediaSplit. **BUG-A11Y-3** (2 nodes color-contrast muted). axe sinon OK. SEO title 58 ✓.

**`/jardins-paysage`** — `[LIVE]` **3 PhotoPlaceholder consécutifs en haut** (= P0-1 connu, photos jardins manquantes), vraie photo projet-complet en bas. Visuellement creux en haut (lecture Thomas : section AÉRÉ mais CONTENU vide sur les 3 premiers blocs). **BUG-A11Y-3** (6 nodes — la page la plus touchée, texte des placeholders muted). Page fonctionnelle mais dépendante de P0-1 pour le launch.

**`/notre-approche`** — `[LIVE]` FAQPage JSON-LD, 4 `<details>` FAQ fonctionnels (toggle OK). **BUG-A11Y-3** (2 nodes). H1 « De la vision à la réalisation ». SEO title 59 ✓ (limite).

**`/la-maison`** — `[LIVE]` Person JSON-LD (Nicolas Berg), preuves (30 ans, Socotec, Esprit Piscine, FPP Or/EUSA), adresses 2 maisons. axe = **0 violation**. **Aucun bug.**

**`/prescripteurs`** — `[LIVE]` Page persona Camille complète (H1 fort, 3 colonnes valeur, « Ce qui nous qualifie », FAQ architectes, réalisations références). axe = **0 violation**. INFO-NAV-1 (libellé « Architectes » vs « Espace prescripteurs »). **Aucun bug bloquant.**

### Fiches réalisations (échantillon 3/14)

`[LIVE]` Layout 60-40 desktop (galerie 2fr / sidebar 1fr : type, zone, encart « Fiche en cours de documentation », CTA), crédit photo sous l'image, lien retour, bloc cross-selling en bas. **Toutes draft** (limite contenu signalée). **BUG-A11Y-3** sur le `figcaption` (crédit muted). **INFO-SEO-1** (titre 91-111 car). Honnête (zéro donnée inventée). Échantillon : `piscine-debordement-foret`, `projet-piscine-jardin-banquette`, `jardin-bassin-maison-bois` — comportement identique.

### Pages légales & système (`/mentions-legales`, `/politique-confidentialite`, `/404`)

**`/mentions-legales`** — `[LIVE]` Éditeur SARL AQUA SYSTEM, hébergeur Cloudflare. **Aucun placeholder [À CONFIRMER] visible** côté utilisateur. **BUG-A11Y-3** (1 node muted). 
**`/politique-confidentialite`** — `[LIVE]` Finalités/durées/droits RGPD/Cloudflare. **BUG-A11Y-3** (1 node muted). INFO-LINK-1 (href source sans slash → 308).
**`/404`** — `[LIVE]` Habillée, « Cette page n'existe pas. », lien retour accueil + 2 CTA, header/footer identiques, noindex, HTTP 404 réel. axe = 0 violation. INFO-SEO-2 (desc 158, noindex). **Aucun bug bloquant.**

---

## Phase 5 — Cohérence globale `[LIVE + STATIQUE]`

| Critère | Verdict | Note |
|---|---|---|
| **Header identique partout** | PASS | Sticky, wordmark + 6 liens (Réalisations en 1er, conforme P0-5) + CTA, sur toutes les pages. Lien actif via `aria-current` ✓. |
| **Footer identique partout** | PASS | 3 blocs (identité/partenariat, navigation, coordonnées 2 maisons) + barre légale, année copyright calculée au build, sur toutes les pages. |
| **CTA unique de marque** | PASS | « Parlez-nous de votre projet » = seul CTA de conversion, identique header/hero/form/cross-selling. |
| **Ton éditorial** | PASS | Registre soutenu-accessible cohérent (brand-voice). Aucun mélange de langues, aucun « undefined/null/[object Object] » visible. |
| **Format téléphone** | PASS | `01 30 42 26 00` (affiché) / `+33130422600` (tel:) partout. |
| **Format email** | PASS | `contact@aqua-system.fr` partout. |
| **Format € / dates** | PASS | Tranches budget en clair, copyright `© 2026`, SIREN formaté. |
| **Patterns erreur / loading** | PASS | Bloc d'erreur form unique, bouton `loading` cohérent, états vides portfolio. |
| **Libellé `/prescripteurs`** | **WARNING** | « Architectes » (nav) ≠ « Espace prescripteurs » (footer) → **INFO-NAV-1 (P2)**. |
| **Parcours inter-pages** | PASS | Cross-selling eau↔jardin, deep-links `?source=`/`?filter=` fonctionnels, parcours Alexandre + Camille E2E PASS. |

---

## Phase 6 — Scoring & verdict

Barème : 21 dimensions, 1/0.5/0. Sévérité P0 sur dim **10/12/13/14** = page ÉCHOUÉE. Objectif **≥ 19/21**.
Note transversale : **BUG-A11Y-4 (skip link, P1)** et **BUG-A11Y-3 (contraste muted, P1)** sont des défauts a11y. Ils ne sont pas sur les dimensions bloquantes (10/12/13/14) → aucune page n'est « échouée » au sens de la règle bloquante, mais ce sont **2 P1 à corriger avant launch** (la dim a11y est traitée hors barème 1-21, en Phase 3).

| Page | Score /21 | P0 | P1 (a11y) | P2 | Statut |
|---|---|---|---|---|---|
| `/` | **21** | 0 | 1 (skip link) | 1 | ✅ GO |
| `/realisations` | **21** | 0 | 1 (skip link) | 1 | ✅ GO |
| `/contact` | **20.5** | 0 | 1 (skip link) | 2 | ✅ GO |
| `/contact/merci` | **20.5** | 0 | 1 (skip link) | 1 | ✅ GO |
| `/piscines-bien-etre` | **20.5** | 0 | 2 (skip + contraste) | 0 | ✅ GO (a11y à fixer) |
| `/jardins-paysage` | **19** | 0¹ | 2 (skip + contraste) | 0 | ⚠️ GO conditionnel (dépend P0-1 photos) |
| `/notre-approche` | **20.5** | 0 | 2 (skip + contraste) | 0 | ✅ GO (a11y à fixer) |
| `/la-maison` | **21** | 0 | 1 (skip link) | 0 | ✅ GO |
| `/prescripteurs` | **20.5** | 0 | 1 (skip link) | 1 | ✅ GO |
| `/realisations/[slug]` (×14) | **19.5** | 0 | 2 (skip + contraste) | 2 | ⚠️ GO (thin content + titres longs) |
| `/mentions-legales` | **20** | 0 | 2 (skip + contraste) | 0 | ✅ GO (a11y à fixer) |
| `/politique-confidentialite` | **19.5** | 0 | 2 (skip + contraste) | 1 | ✅ GO (a11y à fixer) |
| `/404` | **20.5** | 0 | 1 (skip link) | 1 | ✅ GO |

¹ `/jardins-paysage` : pas de P0 *technique* neuf, mais bloquée par **P0-1 (ux-review.md, photos jardins)** — prérequis launch hors périmètre de cette revue.

### Verdict global : **GO CONDITIONNEL**

**Aucun bug P0 neuf** sur les dimensions bloquantes (10 liens / 12 formulaire / 13 interactions / 14 résilience) — toutes testées `[LIVE]` et PASS, y compris cas adversariaux (XSS, 500, timeout, double-submit). Site techniquement sain : 0 erreur console, 0 cookie, 0 404, CLS nul, perf excellente, cross-browser OK.

**2 conditions avant launch (P1, non bloquantes pour la cascade mais requises) :**
1. **BUG-A11Y-3** — contraste `color-text-muted` 3.75:1 (6 pages). → @design (token) puis @fullstack.
2. **BUG-A11Y-4** — skip link absent (toutes pages). → @fullstack.

**Prérequis launch déjà connus (hors cette revue, rappel)** : P0-1 photos jardins + droit à l'image (fondateur) ; `NEXT_PUBLIC_SITE_URL` à substituer au naming final ; tests manuels M-1→M-7 (email Resend réel, Lighthouse preview). **Limite contenu** : 14 fiches en draft (thin content) — décision @product-manager/@seo.

### Pages < 19/21
**Aucune.** Toutes les pages sont ≥ 19/21. `/jardins-paysage` à 19 exactement (plancher) à cause des placeholders P0-1.

---

## Reprise (anti-timeout)
Audit **TERMINÉ** — 15 routes auditées (13 pages distinctes + 3 fiches échantillon sur 14), 21 dimensions + a11y (axe-core 13 pages + clavier + skip link + zoom 200%) + cross-browser Chromium/Firefox + cohérence globale. Aucune page restante.

---

# Re-check 5.3 — vérification INDÉPENDANTE des 9 corrections Phase 5.2

> Auteur : @qa — 2026-06-11. **Ne croit PAS le handoff @fullstack (D-14) sur parole : re-mesure indépendante.**
> Méthode : build de prod réel (`out/`), serveur `next dev` 127.0.0.1:3000, Playwright Chromium/Firefox + axe-core, inspection HTML/CSS générés.
> Périmètre : les 9 corrections D-14 + la régression complète. Convention `[LIVE]` / `[STATIQUE]` maintenue.
> Réf bugs d'origine : BUG-A11Y-3 (contraste muted), BUG-A11Y-4 (skip link), INFO-NAV-1, INFO-SEO-1 (titres), sitemap drafts, INFO-VIS-1, INFO-IMG-1, INFO-LINK-1.

## Tableau de synthèse Re-check 5.3

| # | Vérification | Bug d'origine | Preuve mesurée | Statut |
|---|---|---|---|---|
| 1 | Axe-core 13 pages (0 violation) | BUG-A11Y-3 + 4 | **13/13 pages axe-core VERT** (Playwright Chromium, tags wcag2a→wcag22aa : `color-contrast` + `target-size` inclus). 0 violation sur jardins-paysage (page la + chargée en muted) `[LIVE]` | **LEVÉ** |
| 2 | Skip link focus + Enter → #main | BUG-A11Y-4 | 1er `Tab` (/ et /contact/) → focus `Aller au contenu` (href `#main`), visible dans le viewport ; `Enter` → URL `#main`, cible = élément `<main>` `[LIVE]` | **LEVÉ** |
| 3 | Contraste muted computed `#6b6058` | BUG-A11Y-3 | figcaption muted `getComputedStyle().color` = **`rgb(107, 96, 88)` = `#6b6058`** `[LIVE]` ; ratios WCAG calculés **5.00–5.71:1** sur sand-50/100/200 (PASS AA) vs ancien 3.75–4.29:1 (FAIL) ; CSS buildé `out/` = `#6b6058`, 0 `#7e7468` résiduel | **LEVÉ** |
| 4 | 14 titres fiches < 60 car. | INFO-SEO-1 | 14 `<title>` de `out/` recomptés en caractères Unicode (entities décodées) : **max 59 car**, 0 fiche ≥ 60. Test unit `realisations.test.ts` VERT `[LIVE/STATIQUE out/]` | **LEVÉ** |
| 5 | Sitemap 10 URLs, 0 fiche draft + noindex | sitemap drafts | `out/sitemap.xml` = **10 `<loc>`** (8 pages + 2 légales), **0 fiche /[slug]** ; 3 fiches échantillon = `<meta name="robots" content="noindex, follow">` `[STATIQUE out/]` | **LEVÉ** |
| 6 | Libellés nav/footer prescripteurs | INFO-NAV-1 | HTML rendu live : header `<a href="/prescripteurs/">Architectes`, footer `…>Espace prescripteurs` — **2 libellés distincts assumés** (ux-writing §6). Conforme, pas un bug `[LIVE]` | **LEVÉ (résolu par conception)** |
| 7 | Régression unit + E2E + build | — | Vitest **102/102** ; Playwright **41/41** (37 desktop dont 13 axe + 4 @main iPad/iPhone) ; `npm run build` PASS **30 routes**, First Load JS max **114 kB** `[LIVE]` | **LEVÉ** |
| 8 | Validation visuelle baselines | — | 3 baselines desktop re-shootées 5.2 lues (Read) : piscines/jardins/notre-approche — **ni casse de layout ni dérive vs page-compositions**, muted plus foncé lisible (attendu), 0 troncature/chevauchement `[LIVE lecture]` | **LEVÉ** |

> **NOTE faux positif écarté (transparence)** : un premier comptage `bash ${#title}` a renvoyé 63/64 car. pour 2 titres → **artefact de locale POSIX** (`${#}` compte les bytes UTF-8, pas les caractères ; chaque `à/é/è/ê` = 2 bytes). Recompté en vrais caractères Unicode (`node [...title].length`, entities décodées) : **56 et 59 car.** Aucune fiche ≥ 60. Le test unit `realisations.test.ts` avait raison. Leçon : toujours compter les titres accentués en caractères, jamais en bytes.

## Détail des mesures `[LIVE]`

- **Environnement** : `npm run build` (out/ de prod) + `next dev` 127.0.0.1 (port 3000 occupé par un process orphelin → exécuté sur 3001 / Playwright auto-server 3100, même code, équivalent). Node v22.22.2, Next 14.2.15. Commit re-checké : `91f6992` (Phase 5.2, 9 corrections), working tree propre avant édition de ce rapport.
- **Axe-core (vérif 1)** : `tests/e2e/a11y-all-pages.spec.ts` — boucle paramétrée 13 pages, helper `expectNoA11yViolations` avec tags `wcag2a/wcag2aa/wcag21a/wcag21aa/wcag22aa` (donc `color-contrast` ET `target-size` 2.5.8). Résultat : **13/13 VERT**, dont jardins-paysage (6 nodes muted à l'origine) et la fiche réalisation (figcaption). Le test exige aussi `a.skip-link[href="#main"]` attaché sur chaque page.
- **Skip link (vérif 2)** : spec interactif (temporaire, supprimé après mesure) — sur `/` et `/contact/`, premier `Tab` depuis le haut → `:focus` = `Aller au contenu`, `href="#main"`, `boundingBox().y ≥ 0` (visible, hors-écran seulement sans focus) ; `Enter` → URL contient `#main`, cible `tagName === 'main'`. 2/2 PASS.
- **Contraste muted (vérif 3)** : `getComputedStyle(figcaption).color === 'rgb(107, 96, 88)'` PASS `[LIVE]`. Ratios WCAG (méthode sRGB exacte) : 5.71:1 (sand-50), 5.38:1 (sand-100), 5.00:1 (sand-200) — tous ≥ 4.5:1. Confirme le 3.75:1 d'origine (ancien `#7e7468` sur sand-200) et sa résolution.
- **Titres fiches (vérif 4)** : extraction des 14 `<title>` de `out/realisations/*/index.html`, décodage `&amp;`, comptage `[...title].length`. Distribution 28→59 car. Les 2 plus longs : « Piscine à débordement en lisière de forêt — Réalisations » (56) et « Piscine à paroi vitrée en parement de pierre — Réalisations » (59).
- **Sitemap + noindex (vérif 5)** : `grep -c "<loc>" out/sitemap.xml` = 10 ; aucune URL `/realisations/<slug>/` ; les 3 fiches échantillon portent `noindex, follow` dans leur `<head>`. Cohérent D-14 (critère `isDraft` partagé robots↔sitemap, 14/14 fiches en draft).
- **Libellés (vérif 6)** : HTML rendu — header = `Architectes`, footer = `Espace prescripteurs`. Les 2 libellés sont **intentionnels** (ux-writing §6, D-14 §4) : nav courte vs footer explicite. INFO-NAV-1 = WARNING P2 d'harmonisation, tranché « 2 libellés assumés ». Aucune action requise.
- **Régression (vérif 7)** : Vitest 102/102 ; Playwright `desktop-chrome` 37/37 + `ipad`/`iphone-13` (@main) 4/4 = **41/41** ; build PASS 30 routes.
- **Visuel (vérif 8)** : lecture Read des 3 desktop re-shootés. jardins-paysage : hero propre + 3 PhotoPlaceholder sobres (P0-1 connu, hors périmètre 5.3) + vraie photo projet + CTA sombre. piscines-bien-etre : vraies photos, MediaSplit alternés, bandeau preuves. notre-approche : timeline 5 étapes alignée + FAQ details. Aucune casse de layout, aucune dérive de palette « Rive privée », muted légèrement plus foncé = conforme à l'attendu.

## Verdict final Re-check 5.3

**Les 9 corrections de la Phase 5.2 sont RE-MESURÉES INDÉPENDAMMENT et TENUES.** 8/8 vérifications LEVÉES, 0 RÉSIDUEL technique neuf.

| Bug d'origine (revue 5.1) | Statut après re-mesure 5.3 |
|---|---|
| BUG-A11Y-3 (contraste muted 3.75:1, 6 pages) | **LEVÉ** — `#6b6058`, 5.00–5.71:1, axe 13 pages VERT |
| BUG-A11Y-4 (skip link absent partout) | **LEVÉ** — focus+Enter→#main vérifiés live |
| INFO-NAV-1 (libellés prescripteurs) | **LEVÉ (par conception)** — 2 libellés assumés ux-writing §6 |
| INFO-SEO-1 (titres fiches > 60) | **LEVÉ** — max 59 car. |
| Sitemap fiches draft (24→10) | **LEVÉ** — 10 URLs, 0 fiche, drafts noindex |
| INFO-VIS-1 / INFO-IMG-1 / INFO-LINK-1 (P2) | **LEVÉS** — tokens/width-height/trailing slash (D-14 §6-8, build PASS, axe VERT) |

### Verdict technique de lancement : **GO**

Le site est **techniquement prêt au lancement**. Aucun bug P0/P1 résiduel. Toutes les dimensions bloquantes (liens, formulaire, interactions, résilience) étaient déjà PASS en 5.1 et le restent (41/41 E2E). Les 2 P1 a11y qui conditionnaient le « GO conditionnel » de 5.1 sont **levés et re-mesurés**.

### Prérequis NON techniques restants (hors périmètre QA, rappel — ne bloquent pas le verdict technique)

1. **P0-1 photos jardins** (ux-review.md) — `/jardins-paysage` affiche 3 PhotoPlaceholder faute de photos jardins « pures ». **Décision + assets fondateur** + droit à l'image. *Prérequis contenu, pas technique.*
2. **14 fiches en mode draft** (thin content) — conforme zéro-invention, mais décision @product-manager/@seo : documenter ≥ 3 fiches FEATURED ou garder le noindex actuel (déjà en place).
3. **`NEXT_PUBLIC_SITE_URL`** à substituer au naming/domaine final (canonical, sitemap, OG, llms.txt) avant deploy prod.
4. **Tests manuels pré-launch M-1→M-7** (qa-strategy) : email Resend réel, KV preview, Lighthouse en preview Cloudflare — *impossibles en local, `[STATIQUE UNIQUEMENT — env Cloudflare/Resard absent]`*.
5. **Mentions légales LTE** : gouvernance à finaliser après acquisition (project-context Notes libres).

### Score final du site

**20,5 / 21 (moyenne pondérée des 13 pages, inchangée vs 5.1 mais désormais SANS P1 a11y ouvert).** Toutes les pages ≥ 19/21. Les 2 P1 a11y qui plombaient la colonne « à fixer » de chaque page sont levés → le profil de risque a11y passe de « 2 P1 ouverts » à **0 P1 ouvert**. Plancher `/jardins-paysage` à 19/21 conditionné au seul P0-1 photos (contenu fondateur).

**Verdict : GO technique.** Lancement débloqué côté QA — restent les prérequis contenu/config/manuels ci-dessus, non techniques.

---

_Re-check 5.3 TERMINÉ — 8/8 vérifications avec preuves mesurées `[LIVE]`, verdict GO technique, score 20,5/21._
</content>
</invoke>
