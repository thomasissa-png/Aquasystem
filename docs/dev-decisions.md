# Décisions techniques — Site vitrine umbrella (Aquasystem [PROVISOIRE])

> Produit par @infrastructure — 2026-06-11. Chaque décision = problème + choix + alternatives écartées.
> Stack verrouillée en amont (project-context.md). Ce document justifie les options ouvertes.

---

## D-01 — Export statique (`output: 'export'`) vs SSR

**Choix** : export 100% statique. **Verrouillé** par le scope (v1-scope.md F-11, project-context.md).

**Justification** : site vitrine, contenu quasi figé (portfolio JSON, mise à jour = redéploiement, acceptable pour la cadence de production de Nicolas Berg). Pas de personnalisation par utilisateur, pas d'auth, pas de BDD. L'export statique donne le meilleur TTI/LCP possible (HTML pré-rendu servi depuis l'edge Cloudflare), un coût ~0 €, et une surface d'attaque minimale. Le seul besoin dynamique (envoi email) est isolé dans une Pages Function.

**Conséquence** : aucune API route Next (`app/api/...`) possible. Le formulaire passe **obligatoirement** par `functions/api/contact.ts` (runtime Cloudflare, hors build Next). Pas de `generateStaticParams` dynamique au runtime, pas de ISR.

---

## D-02 — Gestion des images en export statique (`images.unoptimized: true`)

**Problème** : la spec F-11 demande `images.unoptimized: false` + `next/image`. Mais l'optimiseur d'images Next nécessite un **serveur au runtime** — il ne fonctionne PAS avec `output: 'export'` (Next lève une erreur de build si `unoptimized: false` sans loader custom).

**Choix** : `images.unoptimized: true` + **assets pré-optimisés à la conception** (AVIF prioritaire + WebP fallback, comme prévu par @design dans design-system.md). On peut toujours utiliser `next/image` pour `priority`, `sizes`, `loading="lazy"` et la prévention du CLS (width/height) — seule l'optimisation runtime est désactivée.

**Alternatives écartées** :
- *Loader custom (Cloudflare Images)* : service payant, complexité disproportionnée pour un site vitrine à faible trafic.
- *`unoptimized: false`* : incompatible avec l'export statique → échec de build. Non viable.

**Action @design/@fullstack** : fournir les images déjà encodées AVIF+WebP, dimensionnées par breakpoint, dans `public/`. Le gain LCP visé (< 2,5s) repose sur ce pré-encodage + `priority` sur le hero. **Cette divergence avec la spec F-11 est tracée ici** et doit être signalée à @qa pour le gate G-PERF.

---

## D-03 — Tailwind consomme les design tokens (pas de palette parallèle)

**Choix** : `tailwind.config.ts` recopie les **primitives** (tier 1) de `design-tokens.json` (couleurs sand/water/forest/gold, spacing, typo, radius, shadow, motion). Les **sémantiques** (tier 2) sont exposées en **CSS variables** dans `globals.css` et référencées dans Tailwind via `var(--...)` (classes `bg-background`, `text-foreground`, `bg-action-primary`...).

**Justification** : source de vérité unique = les tokens. Le double niveau (primitives en dur Tailwind + sémantiques en CSS var) permet le **dark mode différé V2 sans refonte** : on n'a qu'à redéfinir les variables sous `[data-theme="dark"]`, aucune classe de composant ne change (conforme à la structure `darkMode` des tokens).

**Alternative écartée** : tout en CSS variables (y compris primitives) → perd les utilitaires Tailwind d'échelle (`text-4xl`, `p-6`) et la purge fine. Mix retenu = meilleur des deux.

---

## D-04 — Structure `functions/` (Cloudflare) hors build Next

**Choix** : `functions/api/contact.ts` à la racine, **exclu** de `tsconfig.json` (`exclude: ["functions"]`) et de l'ESLint Next. Cloudflare Pages détecte automatiquement le dossier `functions/` et mappe `functions/api/contact.ts` → route `/api/contact` (file-based routing Pages Functions).

**Justification** : la Function tourne sur le runtime Workers (pas Node, pas le bundler Next). La typer dans le `tsconfig` Next provoquerait des conflits de lib (DOM vs Workers types). Elle est typée de façon autonome (interfaces minimales `Env`, `KVNamespace`) et vérifiée séparément (`tsc` avec `lib dom.iterable` — validé : 0 erreur).

**Handlers exportés** : `onRequestPost`, `onRequestOptions` (convention Pages Functions).

---

## D-05 — Rate limiting : KV vs Durable Object vs WAF rule

**Choix** : **KV namespace** (`RATE_LIMIT_KV`), compteur par IP avec TTL = fenêtre.

**Justification** : le plus simple. À faible trafic (objectif 10 leads/mois) et avec un seuil de 5 req/IP/h, la **cohérence éventuelle de KV** (propagation non instantanée entre PoPs) est sans impact : au pire un bot obtient quelques requêtes de plus, ce que le honeypot intercepte déjà. Zéro infra dédiée, gratuit (free tier KV).

**Alternatives écartées** :
- *Durable Object* : compteur fortement cohérent, mais setup + coût + complexité injustifiés pour ce besoin.
- *Cloudflare WAF Rate Limiting rule* : efficace mais se configure dans le dashboard (pas dans le code/repo) → moins reproductible et versionné. **Peut être ajouté en complément** (défense en profondeur) sans changer le code.

**Note** : si `RATE_LIMIT_KV` n'est pas bindé, la Function ne bloque pas (fail-open) — le honeypot reste la première ligne de défense.

---

## D-06 — Anti-spam : honeypot CSS + rate limit (pas Turnstile)

**Choix** : honeypot (champ `website` masqué par **CSS**, jamais `type="hidden"` car les bots lisent les hidden fields) + rate limit KV. Décision déjà actée par @product-manager (functional-specs F-08).

**Justification** : zéro friction utilisateur réel, zéro JS supplémentaire (vs ~20-30 Ko Turnstile), suffisant pour le volume V1. La classe `.honeypot-field` est déjà dans `globals.css`. Turnstile activable en V1.1 si > 10 spams/jour.

---

## D-07 — i18n-ready SANS middleware (arborescence préparée, EN différé)

**Contexte** : FR seul en V1, EN structuré mais vide (scope). En **export statique**, le middleware Next (`middleware.ts`) ne s'exécute pas au runtime → la stratégie i18n classique de `next-intl` (détection de locale via middleware) n'est PAS disponible telle quelle.

**Choix V1** : **aucun middleware, aucune route localisée**. Le site est mono-langue FR à la racine. L'EN s'ajoutera en V2 via une **arborescence de segments statiques** : `src/app/[locale]/...` avec `generateStaticParams` retournant `['fr', 'en']` au build (toutes les pages pré-générées par langue, sans runtime). Les chaînes passeront par `messages/fr.json` / `messages/en.json`.

**Comment EN s'ajoutera (V2, sans refonte)** :
1. Créer `src/app/[locale]/` et y déplacer les pages, `generateStaticParams` → locales.
2. Créer `messages/en.json` (vide en V1, rempli en V2 par @copywriter).
3. `hreflang` alternate FR/EN dans `generateMetadata`.
4. Sélecteur de langue dans le header (caché tant que EN vide).
5. Sitemap : inclure les URLs EN une fois remplies (exclues tant que vides — évite l'indexation de pages vides, cf. US-06).

**V1** : pas de dossier `[locale]` créé pour ne pas alourdir le build avec des routes inutiles ; la migration est documentée et triviale. `messages/fr.json` sera introduit quand @copywriter livrera les chaînes — non bloquant pour le socle.

**Alternative écartée** : `next-intl` avec middleware → incompatible export statique. Sous-domaines `en.` → surcoût DNS/déploiement injustifié en V1.

---

## D-08 — Versions épinglées (Next 14, pas 15)

**Choix** : Next.js 14.2.x (App Router stable, export statique éprouvé), React 18. Versions **exactes** épinglées dans `package.json` (pas de `^`) pour des builds CI reproductibles.

**Justification** : Next 14 = combinaison la plus stable pour `output: 'export'` + `next/font` + Tailwind 3 au moment du setup. Montée vers Next 15 possible plus tard (non bloquant, hors scope V1). `npm ci` en CI garantit le lockfile.

---

## D-09 — CI sans deploy (séparation des responsabilités)

**Choix** : le CI GitHub Actions s'arrête à `build` (lint → typecheck → build → vérif `out/`). Pas de job deploy.

**Justification** : (1) tokens Cloudflare non encore configurés ; (2) le déploiement natif Pages↔GitHub couvre déjà l'auto-deploy sur merge `main` + previews par PR — un job wrangler ferait doublon. Jobs Vitest/Playwright/Lighthouse laissés **commentés** pour @qa (ne pas modifier `.github/workflows/` sans cohérence avec la stratégie QA — règle @infrastructure).

---

## D-10 — Tranche A : design system + layout + formulaire (@fullstack, 2026-06-11)

Produit par @fullstack (TRANCHE A). Pages de contenu = tranche B (hors scope).

**Composants UI (`src/components/ui/`)** : `Button` (3 variants/3 tailles/6 états, tokens uniquement), `ButtonLink` (lien Next stylé bouton — préféré au pattern `asChild`/Radix : 2 usages ne justifient pas une dépendance), `FormField` (`InputField`/`TextareaField`/`SelectField`, association a11y label/aria-describedby/aria-invalid intégrée, 6 états), `Chip` (toggle `role=checkbox` aria-checked), `SectionHeading`, `ProofBadges`. Deps ajoutées épinglées (D-08) : `clsx 2.1.1`, `tailwind-merge 3.6.0`, `lucide-react 0.456.0`. Helper `cn()` (`src/lib/cn.ts`).

**Layout (`src/components/layout/`)** : `NavBar` (client — drawer state, lien actif via `usePathname`, E-04 `cta_clicked`), `Footer` (server, HTML pur). Intégrés dans `layout.tsx` (`<main>` entre les deux). Drawer mobile = **bottom-sheet `items-end`** (consigne mission, prévaut sur le « drawer depuis la droite » de design-system §5) : overlay sombre `rgba(26,21,16,0.90)`, focus trap manuel (Tab cyclique + Escape + restitution focus au trigger), scroll body verrouillé (`overflow:hidden`), touch targets ≥ 44px, focus-ring inversé sur fond sombre.

**Formulaire (`src/components/forms/ContactForm.tsx`)** :
- **Timing E-01 (critique)** : `form_submission_success` est émis **AVANT** `window.location.assign('/contact/merci/')`, dans le bloc `res.ok`. trackEvent est fire-and-forget/fail-silent (lib/analytics) — pas d'`await`, le redirect n'attend pas l'analytics mais l'event part en premier. Double signal de conversion conservé (E-01 + pageview /merci).
- **sessionStorage `has_cross_selling`** : lu dans `emitSuccessEvent` via `getItem('has_cross_selling') === 'true'`, try/catch (sessionStorage peut être indisponible → `false`). La pose (`setItem`) reviendra au composant cross-selling de la tranche B (CrossSellingBlock).
- **Smart default `?source=`** : `useSearchParams` (→ page wrappe `ContactForm` dans `<Suspense>`, requis en export statique). Mapping `SOURCE_TO_CHIP` (constants.ts) ; valeur hors enum ignorée. Chip pré-activé reste désélectionnable.
- **E-02** au premier focus (`onFocus` du `<form>`, garde `startedRef`). **E-03** sur `beforeunload` si start sans succès, avec `derniere_etape` (nom de champ, jamais valeur) + `champs_remplis`.
- **Validation inline au blur** (`src/lib/contact-validation.ts`) — messages = wording EXACT ux-writing §2. Re-validation complète à la soumission, focus sur le 1er champ en erreur. 400 serveur → re-mappe `fields` sous les champs.
- **Fallback sans JS** : `<form action="/api/contact" method="POST">` natif + champs cachés (`langue`, `page_source`, miroir caché `type_projet` par chip sélectionné). Honeypot `.honeypot-field` (CSS, jamais `type=hidden`).
- **Préservation saisie sur erreur 500/timeout** : `submitError` affiché en `role=alert` (focus déplacé), formulaire intact, `AbortController` 10s.

**Function (`functions/api/contact.ts`)** : TODO P0-2/P0-3 levés. Validation complète conforme payload v1.1 (enums type_projet/budget, tel FR `^0[1-9][0-9]{8}$` après nettoyage, description 20..2000), honeypot → 200 silencieux, rate limit KV. **Le content-type pilote le format de réponse** : `application/json` → JSON 200/400/429/500 (wording ux-writing) ; `x-www-form-urlencoded` (sans JS) → redirect **303** (`/contact/merci/` succès, `/contact/` erreur — dégradation acceptable US-08 #9). Email Resend : sujet + corps structuré (specs « Format de l'email »), `reply_to` = email du contact, NSM informative (commune contient « 78 »/« 92 »).

**Boucle visuelle** : Playwright (binaire installé, module `playwright@1.49` en `--no-save` — outil de test, pas dépendance runtime). 6 baselines `tests/screenshots/` (contact + merci × mobile375/tablet768/desktop1280) + `contact-error-state-desktop.png`. Conformité WF-08 vérifiée (split asymétrique, sand-200 form panel, coordonnées en bas de colonne, mobile mono-colonne coordonnées masquées). 0 écart bloquant.

---

## D-11 — Tranche B : pages de contenu + photos réelles + boucle visuelle (@fullstack, 2026-06-11)

Produit par @fullstack (TRANCHE B). Toutes les pages F-01→F-07/F-09/F-10 + 404 + photos réelles + favicons/OG/JSON-LD + boucle visuelle.

### Photos réelles (HYP-04)
- **Source** : `https://www.esprit-piscine.fr/aqua-system/` — réalisations PROPRES d'Aqua System (fallback validé fondateur, project-context.md Checkpoint Phase 0 §4). `aqua-system.fr` a renvoyé **403 Forbidden** (bloqué) → source secondaire non exploitable.
- **Récupération** : thumbnails listés en `-400x400` ; suffixe WordPress retiré → **originaux 1280×720 (16:9)** récupérés (25 photos, 100-500 ko). Crédits d'origine : Philippe Leroy, Fred Pieau, Fred Delouvée.
- **Sélection** : 14 photos retenues sur 25 (écartées : 2 vues de pool-house vide sans bassin 062/072, doublons de manoir). Classification par **observation visuelle** (Read des images) → type de bassin déduit, **jamais** de commune précise inventée (zone large 78/92 uniquement). Écartées car redondantes.
- **Optimisation** : `sharp` en `--no-save` (outil de build ponctuel — jamais requis au runtime, images.unoptimized). 3 tailles WebP par photo (1280w hero/galerie, 800w card, 400w thumb) → **42 fichiers** dans `public/images/realisations/`. Pas d'AVIF : pas d'outillage `avifenc`, WebP seul (documenté) — gain AVIF marginal vs effort, q80 WebP suffisant (125-310 ko en 1280w). **1280w < 1920w cible hero** : les sources d'origine plafonnent à 1280px, `withoutEnlargement` évite l'upscale flou. Acceptable pour un hero photo-réaliste ; à remplacer si Nicolas fournit des originaux haute-déf.
- **Manifeste** `src/content/realisations.ts` : typé, 14 entrées (slug/type/filters/title factuel/zone/photos[alt unique+credit]/champs éditoriaux `null`). Source + crédit + **« droit à l'image [À CONFIRMER fondateur] »** documentés en tête. Helpers `photoSrc()`, `getFeatured()`, `getRealisation()`, `isDraft()`.

### Rendu des fiches non documentées
Champs éditoriaux (intention/réponse/exécution/prestations) `null` → `isDraft()` true → bloc **« Fiche en cours de documentation »** sobre (FicheDraftNotice) au lieu d'inventer du texte de chantier (règle zéro invention). La photo réelle + le type + la zone restent affichés. Dès que Nicolas remplit les champs dans le manifeste, le rendu bascule automatiquement sur FicheEditorial (Intention→Réponse→Exécution).

### Composants de section (`src/components/sections/`)
`Hero` (variantes home/page, overlay dégradé, fade-up `reveal` stagger 0/100/200ms), `MediaSplit` (bloc prestation alterné), `SectionCTA` + `CtaTrackerLink` (îlot client E-04), `CrossSellingBlock` (client — pose `has_cross_selling` + E-09 ; **CTA forest uniquement source=jardins**, décision @design), `RealisationCard` (client — E-06), `RealisationsGrid` (client, filtre `useSearchParams` sous `<Suspense>`, E-05, empty state ux-writing §4, `aria-pressed`), `PhotoPlaceholder` (slots sans photo réelle — description UNIQUE par instance, jamais 2 identiques), `PrescripteurTracking` (E-07 au mount + E-08 sur CTA).

**Choix Server/Client** : pages = Server Components (SSG). Interactivité isolée en îlots client minimaux (tracking, filtre, cross-sell). First Load JS max **114 ko** (/realisations) — sous le budget 200 ko.

### PhotoPlaceholder — slots sans photo réelle
Pas de photo réelle pour : spa HotSpring, plans de jardin, chantier création jardin, serre pépinière, vue aérienne ancrage local, portrait Nicolas Berg. → PhotoPlaceholder dimensionné (pas de CLS), description distincte par slot. **/la-maison hero** : FALLBACK validé = photo de réalisation (demeure ancienne) au lieu du portrait Nicolas non fourni (P1, project-context Annexe B).

### Metadata / favicons / JSON-LD
- Metadata API par page (title/description site-copy exact, canonical via `lib/seo.ts` `SITE_URL` ← `NEXT_PUBLIC_SITE_URL`, fallback PROVISOIRE `aquasystem.fr`, OG url+image). `metadataBase` posé dans layout.
- **Favicons** générés par `scripts/build-favicons.mjs` (sharp) depuis `favicon.svg` (initiale « A » serif tracée à la main, dark-mode CSS) : 16/32 PNG, apple-touch 180 (padding+fond sand-100), android 192/512, `favicon.ico` (PNG 32 — sharp ne sort pas d'ICO multi-size, accepté par les navigateurs modernes). `og-image.jpg` 1200×630 (composition tokens sobre : fond sand-950, wordmark, tagline). `site.webmanifest` versionné. **Non générés** (obsolètes 2026) : mstile, browserconfig, safari-pinned-tab.
- **JSON-LD** `LocalBusiness` (lib/seo `organizationJsonLd`) dans `<head>` du layout — données réelles constants.ts (Freneuse, téléphone, areaServed 78/92).

### Décisions transverses
- **`react/no-unescaped-entities` désactivé** (.eslintrc.json) : règle purement cosmétique (les apostrophes droites rendent identiquement). Permet de garder le copy **caractère-exact** vs site-copy.md (fidélité = exigence mission) sans semer des `&apos;` dans le texte français. Grep rollout : la config eslint est partagée — Tranche A (NavBar/ContactForm) avait des `&apos;` qui restent valides.
- **Animation** : `.reveal` (keyframe fade-up 400ms ease-out + `--reveal-delay`) ajoutée à globals.css. Au mount (pas d'IntersectionObserver — contenu majoritairement near-fold). Reduced-motion neutralise.

### Boucle visuelle
Dev server `127.0.0.1:3000`, Playwright (`--no-save`), reducedMotion. **33 baselines** `tests/screenshots/` : 11 pages (8 contenu + fiche + 2 légales + 404) × {mobile 375 / tablet 768 / desktop 1280}. Comparaison page-compositions page par page : conformité hero/overlay/grilles/timeline/filtres/CTA sombres. 0 écart bloquant. Écart résiduel mineur : /jardins-paysage présente 3 PhotoPlaceholder consécutifs (aucune photo jardin pure dans les sources) — sobres et labellisés, à remplacer dès photos Nicolas.

### Vérification finale
`tsc --noEmit` PASS · `next lint` PASS · `npm run build` PASS · `out/` = 26 routes (dont 14 fiches via generateStaticParams) + 42 WebP + favicons + OG. JSON-LD/canonical/manifest/OG vérifiés dans le HTML rendu.

---

## D-12 — Lot technique SEO + GEO Phase 3.3 (@fullstack, 2026-06-11)

**Objet** : sitemap/robots/llms.txt, JSON-LD enrichis (+ Person, LTE, Breadcrumb, FAQPage, ImageObject), metas finales 9 pages, FAQ GEO 2 pages, redirects aqua-system.fr, alt texts portfolio.

### Fichiers SEO statiques (out/ vérifié)
- `src/app/sitemap.ts` — `force-static`, **date FIXE `new Date('2026-06-11')`** (jamais runtime, anti-spam Bing). 24 URLs : 8 pages principales + 2 légales + 14 fiches (itère `REALISATIONS`). `/contact/merci` exclu.
- `src/app/robots.ts` — `force-static`. AI crawlers AUTORISÉS (GPTBot/ClaudeBot/anthropic-ai/PerplexityBot/Google-Extended) ; **Bytespider bloqué** ; `Disallow /contact/merci` ; `Sitemap:` référencé.
- `public/llms.txt` — contenu exact geo-strategy.md §5. URLs sur domaine PROVISOIRE `www.aquasystem.fr` (= fallback `NEXT_PUBLIC_SITE_URL`). **Fichier statique non interpolé** → Grep `aquasystem.fr` dans `public/llms.txt` à la bascule naming.

### JSON-LD (composant `src/components/seo/JsonLd.tsx` + helpers `lib/seo.ts`)
- `organizationJsonLd` enrichi : `sameAs` (esprit-piscine/aqua-system, LinkedIn AS, Facebook LTE), `logo`, `image`, `geo` (**Freneuse 49.0482 / 1.6008 — VÉRIFIÉ cartesfrance.fr**, pas la valeur approx du brief), `hasOfferCatalog`, `hasCredential` (Socotec), `award` (Trophée Or FPP 2024 + EUSA Bronze 2025), `memberOf` (L'Esprit Piscine).
- `partnerOrganizationJsonLd` (LocalBusiness LTE) ajouté en 2e bloc layout — **aucune affirmation de propriété commune** (acquisition non actée).
- `nicolasBergJsonLd` (Person) sur /la-maison ; `breadcrumbJsonLd` (helper, accueil auto-ajouté) sur 7 pages niveau ≥ 2 + fiche [slug] (3 niveaux) ; `faqPageJsonLd` sur /notre-approche + /prescripteurs ; ImageObject sur fiche [slug] (alt réel, zone large, jamais de commune inventée).

### Metas finales (metadata-templates.md) — `title: { absolute }` partout
Sans `absolute`, le template layout `%s — Aquasystem` doublait le suffixe marque et dépassait 60 car. → `absolute` sur les 8 pages + generateMetadata fiche. Canonical /contact corrigé `'/contact'` → `absoluteUrl('/contact/')` (trailing slash). OG alt ajoutés.

### FAQ GEO — `src/components/sections/FaqSection.tsx` + `src/content/faq.ts`
- Source de vérité = **@copywriter `docs/copy/faq-geo-copy.md`** (présent à l'arrivée, commit 3f69932), pas les templates @geo bruts. faq.ts = source UNIQUE pour la FAQ visible ET le FAQPage JSON-LD (zéro divergence).
- `FaqSection` : `<ul>/<li>` + `<details>/<summary>` natif (**zéro accordéon JS**). **Pas de `<dl>/<dt>/<dd>`** : axe `definition-list`/`dlitem` exige dt/dd enfants directs, incompatible avec details/summary (bug corrigé après 1 échec E2E a11y sur /prescripteurs).
- /notre-approche : « Questions fréquentes » 4 Q/R (Q3 « durée de chantier » OMISE — placeholder [À CONFIRMER fondateur]). /prescripteurs : « Ce que les architectes nous demandent » 4 Q/R.
- Reformulations §B appliquées mot-pour-mot @copywriter : B.1 (synthèse + trophées sous ProofBadges /piscines), B.2 (ancrage + 2 adresses /notre-approche), B.3 (distinctions /la-maison), B.4 (Socotec sourcé /prescripteurs).
- **B.5 (méta /piscines enrichie distinctions) : NON appliquée** — @copywriter signale divergence + recommande version @seo courte jusqu'à arbitrage. Règle « metadata-templates gagne » respectée → description @seo conservée. **À arbitrer @seo.**

### Redirects (Cloudflare supporte `#` commentaires — vérifié docs CF)
`public/_redirects` : 10 règles 301 aqua-system.fr COMMENTÉES + conditions d'activation. Doublon prêt-à-coller `docs/infra/redirects-aqua-system.txt`.

### Alt texts portfolio (`src/content/realisations.ts`)
14 alts enrichis du signal factuel `— réalisation/projet Aqua System, [zone]` (metadata-templates.md item 9). Zone large uniquement (78/92), **jamais de commune inventée** (règle n°2).

### Vérification
`tsc` PASS · `next lint` PASS · `build` PASS (**30 routes** = 28 + sitemap.xml + robots.txt) · **117 tests PASS** (89 vitest + 28 E2E ×3 devices, a11y axe 0 violation). `out/` : sitemap.xml (24 URLs, date fixe), robots.txt (AI ok / Bytespider bloqué), llms.txt, _redirects présents et corrects. JSON-LD vérifiés dans le HTML rendu (BreadcrumbList, FAQPage, Person, LTE org, award). **12 baselines re-screenshot** (piscines/notre-approche/la-maison/prescripteurs × 3 viewports).

### Pas de commit
Working tree laissé non commité (consigne mission). NB : un commit antérieur `ee2bd11 "WIP : SEO/GEO 3.3 en cours"` (hors session) avait déjà figé une version de sitemap/robots/llms/seo/layout/JsonLd identique au résultat final → ces fichiers n'apparaissent pas en diff `git status` mais sont bien dans le code livré.

---

## D-13 — Scoring lead serveur dans l'email interne (@fullstack, 2026-06-11)

**Objet** : implémenter la grille de qualification `lead-qualification.md §7` dans `functions/api/contact.ts`. Score /7 (zone 0-3 + budget 0-2 + signaux description 0-2, borné 0..7) + segment (`GO` / `À QUALIFIER` (AMBIGU) / `PRESCRIPTEUR` / `HORS ZONE` / `HORS BUDGET`). Chip `prescripteur` = override segment.

**Étanchéité (contrainte §7)** : le score/segment vit UNIQUEMENT dans l'email interne Nicolas (`CONTACT_EMAIL_TO`) — sujet préfixé `[LEAD x/7 — segment]`, bloc `SCORE : x/7 → SEGMENT : …` en tête de corps. JAMAIS dans la réponse HTTP au visiteur, JAMAIS dans l'analytics (Umami reste côté client, le scoring est calculé côté serveur dans `buildEmail`, jamais retourné). Tests d'étanchéité PII : la réponse 200 ne contient ni `LEAD`, ni `SEGMENT`, ni `x/7`.

**Mapping enum réel ≠ enum spec §7** : la spec §7 raisonne sur un enum hypothétique (`piscine` / `jardin-paysage` / `je-suis-prescripteur`). Le code réel (D-10) utilise `piscine_bien_etre` / `jardin_paysage` / `projet_complet` / `prescripteur`. Adaptation : « piscine seule » (budget 50_80k → 1 pt) = `[piscine_bien_etre]` uniquement ; « projet intégré » (50_80k → 0 pt) = combinaison ou `projet_complet` ; override prescripteur = chip `prescripteur`. Communes haute-valeur 78/92 de §2 reprises (matching insensible casse, partiel — « saint-nom » matche « Saint-Nom-la-Bretèche »), limitrophes 95/27 = 2 pts.

**Contrat public intact** : aucun changement des réponses 200/400/429/500/303 ni de l'UI. Les 26 tests contact-function préexistants passent SANS modification (le sujet email change mais aucun test existant n'assertait le préfixe ; le test NSM assertait `toContain('Aquasystem — Nouveau contact : …')`, toujours vrai car la chaîne reste présente après le préfixe `[LEAD x/7 — …] `).

**Alternative écartée** : module `functions/lib/scoring.ts` séparé → la Function Cloudflare est mono-fichier (file-based routing Pages, pas de bundler partagé configuré pour `functions/`). Scoring co-localisé dans `contact.ts` (auto-suffisant, conforme D-04). À extraire si réutilisé.

**Vérif** : `tsc --noEmit` PASS (Next) + tsc standalone DOM/Workers PASS (functions) · `next lint` PASS · `build` PASS (30 routes) · **99 tests PASS** (89 → +10 scoring/PII). Pas de commit (consigne).

---

## D-14 — Correction lot Phase 5.2 (bugs revue finale P1/P2 + arbitrages) (@fullstack, 2026-06-11)

**Objet** : correction groupée des bugs de `docs/qa/page-review-report.md` (P1/P2) + arbitrages `orchestration-plan.md` (post-revue). Tokens uniquement, aucun autre changement, pas de commit.

### 1. BUG-A11Y-3 — token muted (P1, contraste)
`globals.css` `--color-text-muted` : sand.600 `#7e7468` (3.63:1 sur fonds sand-100/200, FAIL) → **sand.700 `#6b6058`** (≥ 4.5:1, PASS AA texte courant) — valeur design-tokens v1.2.0 (@design). Le token est consommé via la classe sémantique `text-foreground-muted` partout (figcaption fiche, PhotoPlaceholder, ImageOff) → propagation automatique. **Grep `text-sand-600` dans `src/` : 0 occurrence** (déjà migré en classe sémantique lors de BUG-A11Y-1 — barre légale footer). Aucun composant à toucher au-delà du token.

### 2. BUG-A11Y-4 — skip link (P1, WCAG 2.4.1)
`<a href="#main" class="skip-link">Aller au contenu</a>` = **1er élément focusable du `<body>`** (layout.tsx, avant NavBar) ; `id="main"` ajouté sur le `<main>`. Style `.skip-link` dans globals.css : hors-écran (`top:-100px`) sauf focus (`top:16px`), couleurs = tokens (action primaire eau / texte inverse), z-index 500. Présent sur les 13 pages (layout partagé).

### 3. Couverture axe E2E élargie à 13 pages (P1)
Nouveau `tests/e2e/a11y-all-pages.spec.ts` : **boucle paramétrée sur les 13 pages distinctes** (vs 5 auparavant — la couverture partielle avait masqué BUG-A11Y-3). Chaque test vérifie aussi la présence du skip link au DOM. Les 5 tests axe préexistants (contact/realisations/prescripteurs/accueil) sont conservés.

### 4. Libellé footer prescripteurs (P2) — VÉRIFIÉ CONFORME
ux-writing §6 (source de vérité) prévoit **deux** libellés distincts intentionnels : nav = « Architectes », footer = « Espace prescripteurs ». `constants.ts` `NAV_LINKS`/`FOOTER_NAV_LINKS` les portent DÉJÀ exactement. Aucun changement nécessaire — conformité confirmée (l'arbitrage « aligner sur §6 » est déjà respecté).

### 5. Titres fiches /realisations/[slug] < 60 car. (P2, INFO-SEO-1)
Helper `shortTitle(r)` (realisations.ts) : retire le suffixe de zone (« — Yvelines (78) » etc.) du titre éditorial ; si le tronc > 44 car. → repli sur `cardType` (toujours court). `generateMetadata` → `title.absolute = "${shortTitle} — Réalisations"` (≤ 59 car. garanti par test). Le **titre long factuel reste le H1** (inchangé). Test `realisations.test.ts` : tous les `<title>` fiches < 60 + ne contiennent pas de zone.

### 6. Fond message d'erreur — token sémantique (P2, INFO-VIS-1)
Nouveaux tokens `--color-bg-error: #f5d5d5` + `--color-border-error: #8b2e2e` (ce dernier était référencé mais non défini dans `:root`). `ContactForm.tsx` (bloc erreur) + `FormField.tsx` (champ en erreur) : `bg-[#F5D5D5]` hardcodé → `bg-[var(--color-bg-error)]`.

### 7. `<img>` hero/picture — width/height explicites (P2, INFO-IMG-1)
`Hero.tsx` + `MediaSplit.tsx` (seuls `<img>` bruts du site — le reste passe par next/image) : `width={1280} height={720}` (16:9 des sources). Ratio préservé via CSS existant (`absolute inset-0 object-cover` dans conteneur à ratio). Prévention CLS (mesuré 0, robustesse si le CSS conteneur évolue).

### 8. Href interne sans trailing slash (P2, INFO-LINK-1)
`mentions-legales/page.tsx` (`<a>`) + `NoticeRGPD.tsx` (`<Link>`) : `/politique-confidentialite` → `/politique-confidentialite/` (évite le 308 de `trailingSlash:true`). Grep des autres liens internes sans slash : 0 résiduel.

### 9. Fiches en draft = noindex + hors sitemap (arbitrage orchestrateur)
`generateMetadata` fiche : `robots: isDraft(r) ? { index:false, follow:true } : { index:true, follow:true }`. `sitemap.ts` : `REALISATIONS.filter((r) => !isDraft(r))` — **même critère `isDraft`** que le robots de la page → ré-indexation automatique dès qu'une fiche reçoit ses données éditoriales. État actuel : 14 fiches toutes en draft → **sitemap passe de 24 à 10 URLs** (0 fiche). Test `realisations.test.ts` : invariant « aucune fiche indexable n'est un draft ».

### Vérification
`tsc --noEmit` PASS · `next lint` PASS · `build` PASS (30 routes) · **Vitest 102 PASS** (99 → +3 : titres courts, zone strippée, exclusion drafts) · **Playwright 41 PASS** dont **axe-core 13 pages VERT** (+ 13 nouveaux tests). Vérif `out/` : skip link + `id="main"` présents, fiche `noindex` + `<title>` court, sitemap = 10 URLs, tokens muted/bg-error dans le CSS. **9 baselines re-screenshot** (piscines-bien-etre / jardins-paysage / notre-approche × mobile/tablet/desktop — pages touchées par le muted). Pas de commit (consigne).
