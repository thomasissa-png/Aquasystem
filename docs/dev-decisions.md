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

---

## D-15 — Intégration des visuels jardinerie fournis par le fondateur (@fullstack, 2026-06-12)

**Contexte** : 9 JPG fournis par le fondateur (page Facebook Les Terres Essentielles, droits accordés 2026-06-12). Ces photos montrent la **JARDINERIE** (point de vente, serres, présentoirs) — **PAS** des réalisations paysagères. Règle d'honnêteté : ne les utiliser QUE là où c'est honnête (ambiance jardinerie/pépinière), jamais comme preuve de création de jardin.

### Tri 4 SITE / 5 SOCIAL
- **4 photos SITE** → WebP q80 × 3 tailles (1280/800/400w) dans `public/images/jardinerie/` via `scripts/build-jardinerie-images.mjs` (calqué sur `build-realisation-images.mjs`, sharp `--no-save`) :
  - `jardinerie-serre-chrysanthemes` (serre intérieure, chrysanthèmes) — **utilisée** (/jardins-paysage bloc 3)
  - `jardinerie-cagette-lauriers-orgeval` (cagette « A. Feroux Orgeval ») — **utilisée** (/la-maison bloc LTE)
  - `jardinerie-presentoir-exterieur`, `jardinerie-allee-pepiniere` — converties, **disponibles non utilisées** (réserve ambiance honnête)
- **5 photos SOCIAL** (poinsettias, bulbes ×2, rose blanche, boutique diffuseurs) → originaux JPG déplacés **hors `public/`** dans `assets/social-media/` (jamais shippés dans le build statique) + `README.md` (contenu/usage/source/droits).
- **9 JPG supprimés de `templates/`** → ne reste que `project-context.md`.

### Manifeste `src/content/jardinerie.ts`
Typé comme `realisations.ts`. `JARDINERIE_PHOTOS` en `as const satisfies Record<string, JardineriePhoto>` (accès par clé littérale non-optionnel sous `noUncheckedIndexedAccess`). `alt` **100% factuels** (« Serre de la jardinerie Les Terres Essentielles… », jamais « jardin réalisé »). `source` = « Fournie par le fondateur (page Facebook Les Terres Essentielles), droits accordés 2026-06-12 ». Helper `jardinerieSrc(base, size)`.

### Intégrations (copy inchangé, alt factuels)
- **`/jardins-paysage` bloc 3 « Entretien & pépinière »** : `PhotoPlaceholder` → `MediaSplit` (accent forest, picture/srcset 800w mobile comme les autres) avec `jardinerie-serre-chrysanthemes`. **Blocs 1 (plans) et 2 (chantier) GARDENT leur PhotoPlaceholder** (toujours aucune photo réelle de réalisation).
- **`/la-maison` bloc « Les Terres Essentielles »** : l'`<article>` n'avait **aucun slot photo** (texte seul). Ajout sobre d'un `figure` next/image avec `jardinerie-cagette-lauriers-orgeval` (explicitement désignée « idéale » pour ce bloc) + légende factuelle « La jardinerie Les Terres Essentielles, route d'Orgeval. ».
- **§3c ambiance secondaire `/jardins-paysage`** : NON ajoutée — sobriété d'abord, la page a déjà sa photo serre. `presentoir-exterieur`/`allee-pepiniere` restent en réserve dans le manifeste.

### P0-1 PARTIELLEMENT levé
La pépinière/serre a désormais une vraie photo. **Restent en PhotoPlaceholder / sans photo réelle** : plans de jardin (bloc 1), chantier de création (bloc 2), et toutes les réalisations de jardins (aucune photo réelle de création paysagère). À demander au fondateur : photos de plans, de chantier paysager et de jardins réalisés.

### Vérification
`tsc --noEmit` PASS · `next lint` PASS · `build` PASS (28 routes) · **Vitest 102 PASS**. Vérif `out/images/jardinerie/` = 12 WebP présents. **6 baselines re-screenshot** (jardins-paysage / la-maison × mobile/tablet/desktop) — vérif visuelle Playwright : bloc serre = vraie photo, blocs 1-2 toujours placeholder, photo cagette visible dans le bloc LTE (desktop + mobile pleine largeur). Pas de commit (consigne).

---

## D-17 — Correction bailout CSR export statique + lot audit 10/10 itération 1 (@fullstack, 2026-06-12)

**Contexte** : boucle d'audit 10/10. 6 rapports (`docs/reviews/audit-2026-06-12/`). P0 RACINE confirmé en live : `/realisations/` et `/contact/` sortaient VIDES du HTML pré-rendu (curl : 0 carte, 0 `<form>`).

### Cause racine et correctif (P0)
`useSearchParams()` de `next/navigation` provoque le **bailout client de TOUTE la page** en `output: 'export'` : tout le sous-arbre sous `<Suspense>` est retiré du HTML statique (grille + formulaire). Conséquence : invisible pour Google/Bing/LLM **et** fallback no-JS cassé.

**Stratégie retenue** (la plus simple — pas de hook abstrait, lecture inline `window.location.search`) :
- `RealisationsGrid.tsx` : `useSearchParams()` → état local `active` (défaut `'tous'`) + lecture du `?filter=` dans un `useEffect` après montage. Le filtre clic met à jour `setActive` + `window.history.replaceState` (URL partageable, sans router Next). **Le rendu serveur émet la grille COMPLÈTE (14 cartes) dans le HTML statique.**
- `ContactForm.tsx` : `useSearchParams()` → lecture du `?source=` via `window.location.search` dans le `useEffect` existant. **Le `<form>` COMPLET (tous les champs + honeypot + action POST native) est dans le HTML statique** → fallback no-JS réellement opérationnel.
- `realisations/page.tsx` + `contact/page.tsx` : `<Suspense>` + fallbacks (`GridFallback`/`FormSkeleton`) supprimés (devenus inutiles — plus de composant suspendant).
- Hook `useQueryParam` créé puis **supprimé** (orphelin : les 2 lectures inline de 3 lignes valent mieux qu'un helper partagé non réutilisé ailleurs).

**Preuve out/** : `grep` → `out/realisations/index.html` = **14 liens fiches** ; `out/contact/index.html` = **1 `<form>`** avec prenom_nom/email/telephone/commune/budget_tranche/description/langue/page_source/website. Garde anti-régression : `tests/e2e/static-html-no-js.spec.ts` (JS désactivé → 14 cartes + form complet). **Aucun autre `useSearchParams` dans `src/`** (seul usage était ces 2 composants).

### Lot audit (P0/P1/P2 traités — wording strictement audits)
- **ux P0-D1** : badge sobre « En cours de documentation » sur `RealisationCard` si `isDraft` (tokens `bg-background-secondary/95` + `text-foreground-muted`, bottom-left). 14 badges dans out/.
- **ux P0-C1 / copy F1-03** : encart « Dossier de qualification complet disponible sur demande. » + CTA « Présentons-nous → » dans « Ce qui nous qualifie » (/prescripteurs). Hero subtitle « partenaire » → « exécutant qui travaille sur votre plan et respecte votre relation client. »
- **copy P1** : « d'exception » ×4 supprimés (layout fallback, page.tsx jardins, jardins-paysage hero, CrossSellingBlock) → grep `d.exception` = **0** dans src/ ET out/ ; espaces insécables U+00A0 avant `?` dans `faq.ts` (8 questions, vérif out/ = NBSP rendu) + avant `—` Socotec (/prescripteurs) ; footer `constants.ts` « Piscines & Bien-être » / « Jardins & Paysage » ; hero accueil = phrase signature ; description layout sans « d'exception ». P2 : contact intro 48h (sans « sans engagement »), erreur ContactForm « par email ou téléphone », /piscines « réseau national de piscinistes professionnels ».
- **geo P1** : `AREA_SERVED` + Val-d'Oise (95) + Eure (27) (propagé seo.ts org + partner) ; sameAs LTE enrichi (Pappers + societe.com) ; date llms.txt → 2026-06-12. P2 : `<p>` synthèse accueil (post-ProofBadges) + bureau d'études /jardins (post-BureauEtudesBlock) + Charte Gens de Confiance /la-maison (texte visible).
- **design P1** : `pt-28/32` (extraTopSpacing) sur FAQ /notre-approche ; PhotoPlaceholders jardins `min-h-64` ; CTA mi-page ghost /notre-approche ; sous-titres services /jardins déjà en MediaSplit (la structure « encadrés fond doré » de l'audit était obsolète — page déjà refactorée). `max-w-2xl` /notre-approche : texte déjà dans une colonne 50% avec `max-w-[52ch]` + PhotoPlaceholder → déjà mitigé.
- **ux P1/P2** : badges Socotec + Esprit Piscine en colonne 1 du footer (toutes pages) ; bouton submit sticky-bottom mobile sur /contact (P1-F1, un seul bouton, pas de second submit → zéro ambiguïté a11y) ; sous-titre drawer « Maîtres d'œuvre & prescripteurs » sous « Architectes » (P2-C2).

### REPORTÉ (dépendance fondateur — hors périmètre code)
- ux P1-M1 / design P0-PHOTO-1/2 / testeurs : photos réalisations jardins, hero jardins paysager, vérif chaises longues, fiches documentées, décennale, délais chiffrés, référence prescripteur, charte signable → **[BLOQUÉ FONDATEUR]** (assets/données non fournis). Le badge draft + la ligne qualification mitigent en attendant.
- ux P1-A1 (cardType home) : **déjà conforme** — `RealisationCard` (utilisé sur l'accueil) affiche déjà `cardType`.

### Vérification finale
`tsc --noEmit` PASS · `next lint` PASS · `build` PASS (30 routes) · **Vitest 102/102** · **Playwright 43/43** (41 existants intacts + 2 no-JS). Baselines re-screenshot : 11 pages × 3 viewports (`scripts/screenshots.mjs`) + contact × 3. Pas de commit (consigne). Pas de déploiement (orchestrateur).

---

## D-18 — Itération 3 CODE/COPY (re-audit-iteration2 §3 — NF-1/2/3)

> Produit par @fullstack — 2026-06-12. Périmètre STRICT 3 findings. Tokens uniquement. Pas de commit, pas de déploiement.

**NF-1 (P1) — placeholder photo client-facing** : `PhotoPlaceholder.tsx` n'affiche plus aucun texte technique. L'étiquette uppercase « Image à remplacer » (irritant Alexandre n°2) est remplacée par un traitement sobre et assumé : bordure neutre `border-border-muted` (plus de bordure pointillée d'alerte), icône `Image` discrète à 60 % d'opacité, libellé « Visuel à venir » en DM Sans + la description du visuel attendu en `foreground-muted`. L'`aria-label` passe à « Visuel à venir : … ». **Preuve out/** : `grep -i "image à remplacer"` sur tout `out/` = **0 occurrence** ; « Visuel à venir » présent ×8 sur `out/jardins-paysage/index.html` (2 slots).

**NF-2 (P1) — encadrés services /jardins-paysage sur fond doré** : **CORRECTION HONNÊTE — la D-17 a déclaré ce point réglé à tort** (« sous-titres services déjà en MediaSplit, structure obsolète » : FAUX, le fond doré venait du composant `ProofBadges` réutilisé pour 3 *services* — « Bureau d'études / Pépinière / Jardinerie & expertise »). `ProofBadges` (fond `bg-background-proof` + chiffres serif) est conçu pour des *preuves chiffrées*, pas pour des services fonctionnels → mauvaise sémantique et 3 « H2 » serif en compétition. Correction réelle appliquée conforme à design-audit P1-JARDINS-1 + P1-HIERAR-1 : remplacement local par des cartes neutres `bg-background-secondary` + `border-l-2 border-border-default`, titres en **DM Sans 18px `font-semibold`** (libère la hiérarchie des H2 éditoriaux). `ProofBadges` **inchangé** (toujours légitimement utilisé sur /accueil et /piscines-bien-etre avec de vraies preuves — Grep `ProofBadges` : 4 fichiers, 1 modifié (jardins, retiré), 3 ignorés car usage preuve valide). **Preuve out/** : `bg-background-proof` = **0** sur `out/jardins-paysage/index.html`, `border-border-default` ×6 + `font-semibold` ×6.

**NF-3 (P2) — submit sticky mobile rendu avant le textarea obligatoire** : le bloc submit était déjà en dernier dans l'ordre DOM, mais `sticky bottom-3` le faisait flotter par-dessus le textarea pendant la saisie des champs amont (risque de clic prématuré → erreur de validation au 1er essai). Solution la plus simple sans casser a11y ni le test no-JS : le sticky ne s'active qu'**après la première interaction** (`hasInteracted`, dérivé de `values` — aucun hook supplémentaire, Rules of Hooks respectées). Avant interaction et **sans JS**, le bouton reste en flux normal (`mt-1`, `static`) → jamais par-dessus le textarea ; markup et ordre DOM identiques (a11y préservée). Une fois la saisie commencée, le sticky bas réapparaît (intention ux P1-F1 conservée). **Preuve** : `contact-mobile.png` re-baseliné — bouton en fin de formulaire au chargement.

**Vérification finale** : `tsc --noEmit` PASS · `next lint` PASS · `build` PASS (30 routes) · **Vitest 102/102** · **Playwright 43/43** (les 9 « échecs » d'un run full-parallel étaient des flakes de cold-start du dev server — confirmé en ré-exécution `--workers=4` : 43/43, et spec static-html isolée verte). Re-baselines : `jardins-paysage` ×3 viewports + `contact-mobile` (`scripts/screenshots-iter3.mjs`, build statique `out/` servi). Pas de commit, pas de déploiement (consigne).

---

## D-19 — Casting visuels : swaps hero accueil + jardins + FEATURED (audit-2026-06-12 §5)

> Produit par @fullstack — 2026-06-12. Périmètre STRICT (3 swaps du rapport `casting-visuels.md §5`). Tokens/props propres. Pas de commit, pas de déploiement.

**Hero — props rétro-compatibles (zéro impact autres pages).** Le `Hero` avait un overlay et un cadrage figés (`object-cover` sans position, gradient 0.78 en dur). Deux props **optionnelles** ajoutées : `objectPosition?: { base?; md?; lg? }` (classes Tailwind `object-[...]` par viewport, défaut `object-center`) et `overlayClassName?` (défaut = constante `OVERLAY_DEFAULT` = l'overlay 0.78 d'origine). Toutes les pages sans ces props rendent **strictement** comme avant — vérifié : seuls accueil et jardins passent les nouvelles props. Pas de style inline : tout en classes Tailwind via `cn()`.

**Swap P0 — hero accueil (`src/app/page.tsx`)** : `piscine-debordement-foret` → `piscine-couloir-demeure-ancienne`. `objectPosition` = `40% 30%` mobile / `center 30%` md / `center 35%` lg (§3a). `overlayClassName` = `from-[rgba(26,21,16,0.75)] via-[rgba(26,21,16,0.30)] to-transparent` (§3b — allégé à 0.75 car photo lumineuse). Texte bas-gauche : **déjà acquis** par le composant (`items-end` + `text-left` par défaut), aucune modif de position nécessaire. **Alt** : ré-écrit factuel cohérent avec l'alt source de `realisations.ts` (« demeure ancienne en pierre et brique » — PAS « haussmannienne/brique rose » du rapport, règle zéro-invention CLAUDE.md n°2). **Relecture visuelle** : demeure + ciel bleu + arbres + bassin miroir tous lisibles ; titre/CTA contrastés sur le bas ; non noyé.

**Swap P1 — hero `/jardins-paysage`** : `projet-pool-house-toit-vegetalise` → `piscine-enterree-maison-brique`. `objectPosition` = `center 40%` (§5 — garde maison + haie). `overlayClassName` = `from-[rgba(26,21,16,0.65)] via-[rgba(26,21,16,0.28)] to-transparent` (base 0.65 du rapport, conservé en gradient cohérent avec le pattern Hero plutôt qu'aplat opaque). **Alt** factuel mis à jour. `projet-pool-house-toit-vegetalise` reste en section « univers végétal » de l'accueil (cohérent §2d).

**Swap P1 — `FEATURED_SLUGS`** : `piscine-couloir-demeure-ancienne` retirée (passe en hero accueil → anti-doublon hero/card même session), remplacée par `piscine-enterree-maison-brique`. Nouveau triptyque : `piscine-debordement-foret` / `piscine-enterree-maison-brique` / `projet-piscine-jardin-banquette` (types variés conservés).

**Vérif anti-doublon (Grep des 4 slugs dans `src/` : 16 occurrences).** Accueil après swap : hero `couloir-demeure`, univers eau `paroi-verre-travertin`, univers végétal `pool-house`, cards `debordement-foret`/`enterree-brique`/`jardin-banquette` → **0 doublon intra-page**. Jardins après swap : hero `enterree-brique`, cross-sell `jardin-bassin-maison-bois` → **0 doublon**. `enterree-brique` est désormais hero jardins ET card accueil : pages différentes → conforme à la règle (doublon interdit = même page, ou même hero sur 2 pages). **Point d'attention signalé (hors mandat)** : `la-maison` garde `couloir-demeure` en hero → cette photo est maintenant hero sur 2 pages (accueil + la-maison). Le rapport §5 ne mandate PAS de toucher `la-maison` et la consigne impose un périmètre strict + « anciens usages restent valides » → non modifié, à arbitrer par @design/@orchestrator. `prescripteurs` = grille portfolio (cards, pas hero) → usage valide inchangé. Fiche `couloir-demeure` garde sa photo.

**Re-baselines** : `accueil` + `jardins-paysage` × 3 viewports (`scripts/screenshots-casting.mjs`, build statique `out/` servi via `npx serve`). 6 PNG mis à jour dans `tests/screenshots/`.

**Vérification finale** : `tsc --noEmit` PASS · `next lint` PASS · `build` PASS (30 routes) · **Vitest 102/102**. Relecture visuelle hero accueil (desktop + mobile) et hero jardins (desktop) : conformes au rapport, lisibilité validée. Pas de commit, pas de déploiement (consigne).

---


## D-21 — Révision typographique cadratin (reprise après interruption) (@fullstack, 2026-06-12)

> Reprise du lot cadratin interrompu. Source : `docs/copy/dash-revision.md` (34 RÉÉCRIRE, décision fondateur). Tokens uniquement. Pas de commit, pas de déploiement.

**Vérification ligne par ligne du tableau des 34 réécritures** : à la reprise, l'intégralité des 34 RÉÉCRIRE était **déjà appliquée en source** (vérifié fichier par fichier sur les lignes du tableau) — y compris la regex `realisations.ts` L390 (`/\s*,\s*(Yvelines|Hauts-de-Seine).*$/u`, virgule à la place du cadratin), les 14 titres de fiches (virgule avant la zone), les 2 amorces SectionCTA (`page.tsx` L186 + `realisations/page.tsx` L58 → virgule), les sous-titres hero, H2, meta-descriptions, FAQ (`faq.ts`) et messages d'erreur (`contact-validation.ts`). Les GARDER (meta-titles SEO `— SITE_NAME`, OG titles, alt OG, JSON-LD `seo.ts` L96/106/107) sont intacts.

**Preuve out/ (après build)** : analyse Python du rendu `out/**/*.html` — on retire `<head>` + `<script>` (zones GARDER : title/meta/OG/JSON-LD), puis on classe chaque cadratin du body en « attribut » (alt/aria-label = GARDER) vs « texte visible ». Résultat : **41 cadratins body, 41 dans des attributs, 0 en texte visible**. Décompte indépendant : `grep "—"` sur HTML = 27 fichiers, mais **0 cadratin hors-liste dans le texte rendu**. Critère done (1) MET.

**Tests** : 3 specs e2e `contact-form.spec.ts` asséraient l'ancien copy avec cadratin (email invalide L78, description courte L95, alerte 500 L112) — **mises à jour** vers le copy approuvé (`:` / `.`), car la source ContactForm.tsx + contact-validation.ts portent déjà la ponctuation révisée. Aucune autre régression (les cadratins restants en tests = descriptions de specs + sujets/corps email INTERNES `[LEAD x/7 — segment]` + suffixe meta `« — Réalisations »`, tous GARDER).

---

## D-22 — Lot P0 desktop (placeholders) + footer + P1 mentions légales (@fullstack, 2026-06-12)

> Source : `desktop-audit.md` (4 P0 + 12 P1) + `footer-audit.md`. Tokens uniquement. Pas de commit, pas de déploiement.

**P0 ×4 — blocs « Visuel à venir » vides (Piscines ×1, Jardins ×2, Notre approche ×1).** Diagnostic : le composant `PhotoPlaceholder` n'avait PAS de bug CSS (tokens `bg-background-secondary` #ede8df, `border-border-muted` #e0d8cc, `text-foreground-muted` #6b6058 tous définis dans `globals.css` + `tailwind.config.ts` — la boîte se rendait bien). Le vrai problème est de **perception** (desktop-audit Top 5 #1, répété L117/320/335) : un emplacement d'image vide affiché sur une page commerciale premium = « maquette inachevée ». **Reco du rapport appliquée : masquer le placeholder tant qu'aucune photo n'existe.** Solution : suppression des slots image vides, rendu des sections concernées en **texte éditorial centré resserré** (`max-w-3xl` centré + corps `max-w-[60ch] text-left`) — lecture délibérée, zéro trou visuel.
- `jardins-paysage` : `PlaceholderSplit` (grille 2 col + figure placeholder) → `TextBlock` (colonne unique centrée). 2 blocs convertis (Bureau d'études, Création).
- `piscines-bien-etre` : `SpaBlock` (grille 2 col + placeholder) → bloc texte centré.
- `notre-approche` : section ancrage local (grille 2 col + placeholder drone) → colonne unique centrée (communes serif italic centrées).
- `PhotoPlaceholder.tsx` **supprimé** (plus aucune référence ; D-18 NF-1 devient caduque — le placeholder n'est plus affiché du tout, ce qui dépasse l'intention NF-1). Imports retirés des 3 pages, doc-comments mis à jour.
**Preuve out/** : `grep "Visuel à venir"` sur `out/` = **0 occurrence**. Critère done (2) MET.

**Footer — refonte `footer-audit.md` (composant global, toutes pages).** Bloc navigation dupliqué **SUPPRIMÉ** (`<nav aria-label="Navigation secondaire">` + 6 liens — redondant avec la navbar sticky). Grille `md:grid-cols-3` → `md:grid-cols-[2fr_1fr_1fr]` (identité large + 2 blocs adresses). Réseaux sociaux (LinkedIn/Facebook) remontés en col 1 sous les badges. Mention partenariat (paragraphe 2 lignes) retirée de la col 1 → fusionnée dans la barre légale (`· En partenariat avec {PARTNER_NAME}.`). Spacing resserré : `pt-16→pt-10`, `pb-12→pb-8`, `gap-12→gap-6 md:gap-8`, `mt-12→mt-8`, `pt-6→pt-5`, badges `mt-5→mt-4`. Adresses sur 1 ligne (virgule + CP/ville, `<br>` supprimé). `FOOTER_NAV_LINKS` reste exporté dans `constants.ts` (non utilisé mais inoffensif, pas de test cassé). **Mesure réelle** : footer mobile (375px) = **589 px = 0.73× écran** (≤ 1 écran, critère done (3) MET) ; footer desktop (1280px) = **274 px** (cible audit ~300-310px atteinte).

**P1 #5 — placeholders légaux publics « à confirmer » (`mentions-legales`).** Reco brief : formulations neutres sans crochets. Appliqué : lignes **RCS** et **TVA intracommunautaire OMISES** (SIREN identifie déjà l'éditeur ; TVA/RCS non obligatoires sur un site vitrine de services). Section 5 garanties : décennale affirmée + « références de l'assureur et numéro de police communiqués sur demande » ; certification Socotec + « attestation disponible sur demande » (n° de certif omis). Composant `ToConfirm` + note de bas de page « à faire valider par un avocat » **supprimés**. **Preuve out/** : `grep -i "à confirmer"` sur `out/` = **0 occurrence**. Décennale reste un placeholder validé non bloquant côté devis/contrat (project-context.md 2026-06-12 §4) — non affiché en crochet public.

**P1 restants — statut.** Déjà résolus en sessions antérieures (confirmés par relecture code + brief) : contraste sous-titres hero (overlay renforcé `OVERLAY_DEFAULT` 0.85→0.50→0.15 + text-shadow 3 couches H1 / 2 couches sous-titre, design-fixes-fondateur §A.2/§A.4) ; badges « en cours de documentation » sortis de l'image → ligne texte discrète sous le titre (`RealisationCard.tsx`, P0-D1) ; trio cartes services jardins → cartes `bg-background-secondary` + `border-l-2` + titres DM Sans semibold (D-18 NF-2). **[BLOQUÉ FONDATEUR]** (nécessitent de NOUVEAUX assets, hors code) : photo « partenariat LTE » accueil hors-sujet végétal (archi verre/piscine au lieu de jardinerie/pierre) ; photos jardinerie « retail » en écart de gamme (cagette Orgeval /la-maison, serre chrysanthèmes /jardins-paysage) → reshoot/retouche ou cadrage Kei-Stone à fournir. P2 non traités (hors périmètre lot).

**Vérification finale** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `build` PASS (30 routes) · **Vitest 102/102** · **Playwright 43/43**. Baselines régénérées fold + fullpage, 10 pages × 3 viewports = 60 PNG (`scripts/capture-baselines.mjs`, dev server 127.0.0.1:3100). Relecture visuelle desktop (jardins/piscines/notre-approche : blocs texte propres sans trou ; mentions sans crochets) + mobile (footer compact ≤ 1 écran). Pas de commit, pas de déploiement (consigne).

---

## D-23 — Corrections post gate-perception passe 1 (D1-D4) (@fullstack, 2026-06-12)

> Source : `docs/reviews/gate-perception-passe1.md` (verdict NON, défauts D1-D4). Périmètre STRICT, tokens uniquement. Pas de commit, pas de déploiement.

**Décision de fond** : le signal « Fiche en cours de documentation » est une **excuse d'inachevé** rendue côté client. Une fiche draft n'a pas besoin de s'excuser : photos réelles + titre factuel + métadonnées = page galerie sobre, **complète en soi**. On retire le signal, on n'ajoute AUCUN contenu pour combler (règle zéro invention).

**D1-D3 (P0) — suppression du libellé « Fiche en cours de documentation » partout où il était visible.**
- `RealisationCard.tsx` : ligne texte draft sous le titre **supprimée** (le bloc `{draft && ...}` de la passe précédente / P0-D1). Import `isDraft` + variable `draft` retirés (plus utilisés ici). La carte ne montre plus que photo + type + zone + « Voir → ».
- `realisations/[slug]/page.tsx` : encart `FicheDraftNotice` (icône FileText + « Fiche en cours de documentation » + paragraphe « récit bientôt publié ») **supprimé entièrement**. Un draft ne rend plus aucun bloc éditorial ni séparateur — la fiche devient photos + H1 + (cardType, zone) + CTA. `FicheEditorial` reste rendu **uniquement** pour les fiches non-draft (texte réel). Import `FileText` retiré. `isDraft` CONSERVÉ (toujours utilisé par `generateMetadata` pour `robots: noindex` + l'exclusion sitemap). **Les drafts restent noindex / hors sitemap — non touché** (logique SEO inchangée).

**D4 (P1) — note interne « avocat » sur `/politique-confidentialite`.** La phrase « À faire valider par un avocat avant publication définitive » **retirée du rendu** et déplacée en **commentaire TSX** (`{/* NOTE INTERNE ... */}`). Grep `/mentions-legales` + toutes pages `src/**/*.tsx` : aucune autre note interne rendue (« à valider », « note interne », « TODO », « À CONFIRMER » → toutes en JSDoc/commentaires uniquement, jamais dans le rendu ; `placeholder=` HTML d'inputs = légitime). Le `[À CONFIRMER]` de mentions-legales avait déjà été neutralisé en D-22 (formulations « sur demande »).

**Tests** : aucune assertion e2e/unit ne référençait les libellés supprimés (`grep` tests/ = 0 pour « en cours de documentation » / « avocat » / « FicheDraftNotice »). `static-html-no-js.spec.ts` asserte le **nombre de cartes** (14) et la structure, inchangés → reste vert sans modification. `realisations.test.ts` teste `isDraft` pour la logique noindex/sitemap (comportement conservé) → reste vert.

**Vérification finale** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `build` PASS (30 routes) · **Vitest 102/102** · **Playwright 43/43**. **Grep `out/` : « en cours de documentation » = 0 · « avocat » = 0 · « Fiche en cours » = 0 · « valider » = 0.** Baselines impactées re-capturées (realisations, fiche draft `piscine-debordement-foret`, politique-confidentialite) × 3 viewports = 18 PNG, **fold + clip ≤ 900px, jamais fullPage** (consigne gate). Relecture visuelle : grille réalisations = cartes propres (photo + type + zone + « Voir ») ; fiche draft = page galerie sobre (photo + titre + CTA, zéro encart d'inachevé). Pas de commit, pas de déploiement (consigne).

---

## D-24 — Application audit photo (P0/P1/P2) (@fullstack, 2026-06-12)

> Source : `docs/reviews/audit-2026-06-12/photo-audit-exhaustif.md` §5 (tableau avant→après). Périmètre STRICT (liste brief), tokens uniquement. Hero accueil VERROUILLÉ fondateur (intouché). Pas de commit, pas de déploiement.

**P0 — blocs maisons accueil (`page.tsx`).**
- Bloc **Aqua System** : `piscine-terrasse-bois-plongee` (4/10, vue aérienne sans identité) → **`piscine-interieure-pierre-poutres`** (9.5/10, couloir de nage pierre+poutres, non utilisée ailleurs), cadrage `object-[center_40%]` conservé. Alt refait (factuel).
- Bloc **Les Terres Essentielles** : aucune photo du stock ne tient au format carré sans tromperie éditoriale (A3) → **option TYPOGRAPHIQUE** (TSX fourni par l'audit §5) : `<div>` carré `bg-[#1A2A1A]`, filet `#4a7a4a/40`, titre serif « Jardins & Paysage » sand-100 + label vert. `<Image>` LTE supprimé. **Correctif WCAG 2.2 AA** : le label `text-[#7ab87a]/70` de l'audit rendait 3.9:1 sur #1A2A1A (axe-core color-contrast, échec gate e2e) → opacité retirée (`text-[#7ab87a]` plein ≈6:1). Filet décoratif non concerné (élément non textuel).

**P1/P2 — autres pages.**
- `/prescripteurs` PORTFOLIO_SLUGS[0] : `piscine-paroi-verre-travertin` (doublon intra-page avec hero split) → **`piscine-interieure-pierre-poutres`**. Doublon INTER-page avec le bloc Aqua accueil ACCEPTÉ (pages distinctes). Doublon intra-page levé.
- `/la-maison` hero : `piscine-terrasse-bois-plongee` (4/10) → **`piscine-interieure-beton-baies`** + alt. Doublon INTER-page avec MediaSplit /piscines accepté (formats/rôles distincts).
- `/piscines-bien-etre` CrossSelling : `projet-bassin-jardin-paysage` (3/10) → **`piscine-jardin-arbre`** + alt.
- `/jardins-paysage` CrossSelling : `jardin-bassin-maison-bois` (3/10) → **`piscine-jardin-arbre`** + alt. Vérif intra-page : aucune autre occurrence sur la page → pas de doublon.
- `/jardins-paysage` MediaSplit **Pépinière** : photo `jardinerie-serre-chrysanthemes` (panneau « Mes saisons florales » nuisible, 4/10) **SUPPRIMÉE** → bloc rendu en `TextBlock` (même pattern que BureauEtudes/Creation, D-22). Imports morts retirés (`MediaSplit`, `JARDINERIE_PHOTOS`, `jardinerieSrc`), doc-comment de page mis à jour.

**Hors périmètre brief (NON traité, signalé)** : audit §5 #8 (cross-sell intra-fiche `realisations.ts`, slug `piscine_bien_etre`, `projet-bassin-jardin-paysage` → `piscine-jardin-arbre`) n'est PAS dans la liste du brief (« rien d'autre ») → laissé en l'état. À traiter dans un lot ultérieur si souhaité.

**Anti-doublon (vérif finale, Grep `photoSrc(`/`jardinerieSrc(` par page).**
- `/` : hero couloir-demeure-ancienne · Aqua interieure-pierre-poutres · LTE typo (0 photo) · featured (debordement-foret, enterree-maison-brique, projet-piscine-jardin-banquette). **0 doublon intra-page.**
- `/la-maison` : interieure-beton-baies · cagette-lauriers-orgeval · nicolas-berg · piscine-jardin-arbre. **0 doublon.**
- `/piscines-bien-etre` : paroi-verre-travertin · debordement-foret · interieure-beton-baies · piscine-jardin-arbre. **0 doublon.**
- `/jardins-paysage` : enterree-maison-brique · piscine-jardin-arbre. **0 doublon.**
- `/prescripteurs` : paroi-verre-travertin (hero) · interieure-pierre-poutres + couloir-demeure-ancienne + projet-piscine-jardin-banquette (cards). **0 doublon intra-page** (doublon levé).

**Vérification finale** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `build` PASS (30 routes) · **Vitest 102/102** · **Playwright 43/43** (color-contrast accueil corrigé). Baselines impactées régénérées (accueil, prescripteurs, la-maison, piscines-bien-etre, jardins-paysage) × 3 viewports, **fold clip = hauteur viewport ≤ 812px (< 900px)** + fullpage (`scripts/screenshots.mjs`, export statique servi sur 127.0.0.1:3000). Baselines non impactées restaurées (`git checkout`) pour limiter le diff au périmètre. Relecture visuelle : accueil (Aqua = pool intérieur pierre, LTE = tableau typo vert lisible), la-maison hero (béton/baies), jardins (pépinière en bloc texte, cross-sell piscine-jardin-arbre). Pas de commit, pas de déploiement (consigne).

---

## D-26 — Refonte éditoriale du bloc preuves ProofBadges (@fullstack, 2026-06-12)

> Retour fondateur (capture) : « est-ce que ce bloc est suffisamment haut de gamme ? ». Diagnostic orchestrateur : 4 cartouches beiges pleins à coins arrondis = pattern template ; « L'Esprit Piscine » casse en 2 lignes (désaligne hauteurs/lignes de base) ; chiffres et noms propres traités identiquement alors qu'ils sont de natures différentes. Périmètre STRICT : `ProofBadges.tsx` (tokens uniquement) + tokens proof-badge. Pas de commit, pas de déploiement.

**Direction (imposée brief).** Suppression des cartouches pleins. Figures posées sur le **fond NU de la section**, séparées par des **filets verticaux fins** (hairline gold.600 `#C4924A` à ~30 % — `border-gold-600/30`, décoratif). **Ligne de base commune** : hauteur réservée (`min-h-[3rem]` mobile / `[3.5rem]` desktop) sur laquelle la figure s'ancre en bas (`items-end`), libellé sous la ligne. Libellés en **petites capitales espacées** (`uppercase tracking-[0.16em]`, 11px mobile / 12px desktop).

**Gestion de la différence de nature** (nouveau champ `kind` sur `ProofItem`, défaut `'number'`, API `items` inchangée) :
- `kind:'number'` (30+, 350+) : serif Didone grand corps (`text-4xl` mobile → `text-5xl` desktop).
- `kind:'name'` (Socotec, L'Esprit Piscine) : serif corps réduit (`text-xl`→`text-2xl`) + `whitespace-nowrap` → tient sur **UNE ligne**. Sous-libellés abrégés pour la respiration (« certification CSP/ESP-001 », « réseau pisciniste »).

**Responsive.** 4 colonnes desktop (filets verticaux seulement, 1 rangée) → 2×2 mobile avec **filets adaptés** : vertical sur la colonne de droite + **filet horizontal** entre les 2 rangées (`border-t gold-600/25`, supprimé en `md`). Croix de hairlines centrée, deux rangées alignées sur leur baseline respective.

**Contraste (libellés ≥ 4.5:1, filets exemptés).** Chiffres `text-foreground` (sand.900 `#2A2420`) > 12:1. Libellés `text-foreground-secondary` (sand.700 `#6B6058`) : 4.95:1 sur sand-100 (piscines) et 4.58:1 sur sand-200 (accueil), **PASS AA**. Filets gold décoratifs exemptés WCAG.

**Usages vérifiés.** `/` (accueil, section preuves sur `bg-background-secondary`) et `/piscines-bien-etre` (sur `bg-background`). `/jardins-paysage` n'utilise PAS ProofBadges (bloc services dédié, D-18) → hors impact. Tokens cartouche (`bg`/`radius`/`padding`) conservés dans design-tokens.json marqués **obsolètes (rétrocompat)** ; ajout `rule-color`, `name-size` ; tokens passés v1.3.

**Boucle visuelle.** Build + export statique servi (127.0.0.1:3100), captures **clippées** du bloc (`scripts/shot-proof.mjs`, jamais fullPage, ≤ 1900px) × {mobile 375, desktop 1280} × {accueil, piscines} → lecture + jugement → 1 itération (ajout filet horizontal mobile + padding vertical des rangées pour équilibrer). Résultat jugé digne d'un site d'architecte (alignements stricts, respiration, aucun déséquilibre). Baselines clippées dans `tests/screenshots/proof-block/` ; baselines fullpage impactées (accueil, piscines-bien-etre, prescripteurs) régénérées × 3 viewports.

**Vérification finale** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `build` PASS · **Vitest 102/102**. Pas de commit, pas de déploiement (consigne).

---

## D-27 — Moisson galerie aqua-system.fr + zones honnêtes + descriptions visuelles (@fullstack, 2026-06-12)

> Brief fondateur : enrichir le portfolio depuis https://www.aqua-system.fr/galerie (droits accordés « tu as mon accord pour tout utiliser »), rendre les zones honnêtes, doter chaque réalisation d'une description du VISIBLE. Périmètre STRICT : `src/content/realisations.ts`, `public/images/realisations/`, scripts images, `docs/`. **Aucune page/composant touché** (autre agent). Pas de commit, pas de déploiement.

### 1. Moisson galerie (bilan chiffré)
- **Récupérées** : 64 URLs d'images originales extraites du HTML galerie (`curl -A` navigateur, HTTP 200), téléchargées en pleine résolution depuis `cdn.website-editor.net/.../multi/`. La plupart en **1920px** (vs 1280px du set esprit-piscine initial). Variantes `/opt/-640w/-1920w/-2880w` et `cache_*` (thumbnails < 800px) ignorées.
- **Dédoublonnage visuel** (lecture des 14 thumbs existants + des 55 candidats HD, lots ≤ 3, aperçus 700px) → cartographie réalisation par réalisation via les codes chantier des noms de fichiers (ADL, ARN, ABA, SOL, GIR, TOU, DEV, JUB, NOG, GAU, PER, GIL, Corniche…).
- **Ajoutées (10 nouvelles réalisations)**, absentes du set initial : `piscine-nocturne-murets-eclaires` (IMG_1313, vue nocturne plongeante), `piscine-terrasse-engazonnee-volet` (maison ocre, volet immergé), `piscine-terrasse-bois-mur-vegetal` (PER/Garches), `piscine-pierre-demeure-beige` (JUB), `piscine-pierre-mur-ancien` (ST NOM), `piscine-mur-brique-jardin` (GAU), `bassin-miroir-crepuscule` (DEV14), `bassin-pierre-rosiers` (NOG36), `piscine-fond-mobile-terrasse` (GIL/Aqualift — fond mobile, différenciant technique), `bien-etre-eclairage-ambiance` (Corniche, spa intérieur chromothérapie).
- **Remplacées (4 fichiers HD, mêmes slugs/noms)** car même réalisation mais résolution 1920 + meilleur cadrage : `projet-pool-house-toit-vegetalise` (GIR60, passerelle vitrée frontale crépuscule), `piscine-interieure-veranda-soir` (SOL25, mur de pierre éclairé), `piscine-interieure-beton-baies` (ABA10, bassin en eau), `projet-bassin-jardin-paysage` (ARN26, vue d'ensemble). Alts ré-écrits pour décrire la nouvelle photo.
- **Écartées** :
  - **Watermark réseau incrustée** « l'esprit piscine » → toute la série `l-esprit-piscine_..._Photo-Philippe-Leroy_*` (CHA, KRI, ENN, g50) — un crop pour la retirer dégraderait. Inutilisables (~16 fichiers).
  - **Nommage générique réseau non attribuable** `Swimming-Pool-FRANCE-00XX` (g03/g04/g05) — pas de preuve de réalisation PROPRE Aqua System ; g05 montre des montagnes (hors ouest parisien) → cohérence zone.
  - **Logos** (Logo.png, Aqua-system-solutions-logo.png).
  - **Doublons d'angle** des réalisations déjà retenues (TOU13, GIR53/56, SOL02/10, ABA04/06, ADL01/34/43, ARN12, DEV04/26, JUB33, PER07, corn_spa 0559/0585/0615 → 1 angle gardé par réalisation).
  - **< 1000px** : `cache_*` (8 fichiers, 407–800px). Note : `piscine-pierre-mur-ancien` (1038px) et `piscine-pierre-demeure-beige` (1000px) retenues car ≥ 1000px et sujet net (générées sans upscale, `withoutEnlargement`).
- **Résultat manifeste** : 14 → **24 réalisations** ; **42 nouveaux fichiers WebP** (3 tailles × 14 entrées traitées : 10 ajouts + 4 remplacements) via `scripts/build-new-realisation-images.mjs` (sharp, q80, ≤ 1280w). Source documentée dans chaque crédit (`aqua-system.fr / Aqua System` pour les ajouts).

### 2. Zones honnêtes
- Toutes les `zone` passées de `'Yvelines (78)'` / `'Hauts-de-Seine (92)'` (attribution **par défaut, non vérifiée projet par projet**) à **`'Ouest parisien'`** (zone d'activité documentée — toujours vraie), + commentaire TSX par entrée `// zone précise [À CONFIRMER Nicolas Berg]`.
- **Alts** : toutes les mentions « Yvelines (78) » / « Hauts-de-Seine (92) » par photo remplacées par « ouest parisien ». Au passage, 2 alts corrigés pour coller au visible réel (`piscine-jardin-arbre` : pas de « parasol orange / maison contemporaine » → demeure ancienne + banquette ; `jardin-bassin-maison-bois` : pas de « grande table conviviale »).
- **Titres** : suffixes géographiques (« , Yvelines » etc.) retirés des `title` (plus aucune commune/département affirmé). `shortTitle()` mis à jour (regex inclut « ouest parisien » par sécurité, test SEO < 60 car. toujours PASS).
- **Doc** : section D ajoutée à `docs/photos-a-fournir.md` (tableau 24 slugs, demande « préciser commune/département par réalisation »).

### 3. Descriptions visuelles
- Nouveau champ **`visualDescription: string`** (non-nullable) sur l'interface `Realisation`, renseigné sur **100 % (24/24)** des entrées. Chaque texte rédigé après **lecture de la photo**, 2-3 phrases, ton brand-voice soutenu-accessible, **UNIQUE** (aucune formule répétée), décrivant UNIQUEMENT le visible (matériaux, implantation, lumière, rapport jardin/maison). Zéro intention client / durée / commune / technique non visible. **Zéro cadratin** dans les textes (vérifié par Grep).

### Vérification finale
`npx tsc --noEmit` **PASS** · slugs **24 uniques** · `bases` photos uniques · **0 fichier image manquant** (24 × 3 tailles présents) · **Vitest `realisations.test.ts` 19/19 PASS**. Boucle visuelle : remplacements HD relus (gain net confirmé). Pas de `next lint`/`build` complet exécuté (périmètre = 1 fichier data + assets, pas de page modifiée ; l'agent pages lancera le pre-commit complet). Pas de commit, pas de déploiement (consigne).

---

## D-28 — Lot design V2 (retours fondateur 2026-06-12, 7 points) (@fullstack, 2026-06-12)

**Périmètre** : `design-fixes-fondateur-2.md` (7 points) + retours additionnels fondateur. Interdiction stricte de toucher `src/content/realisations.ts` / `public/images/realisations/` (autre agent, D-27).

**1. Menu « Notre maison » → « À propos »** (DÉCISION FONDATEUR — *override* du point 7 de la spec qui proposait « La maison », signalé comme erreur dans le brief). `NAV_LINKS` + `FOOTER_NAV_LINKS` (constants.ts), breadcrumb JSON-LD `/la-maison`, `constants.test.ts`, `parcours.spec.ts`. Sous-libellé drawer conditionné sur `link.href === '/la-maison'` → propagé automatiquement, conservé. Grep `À propos` : 0 collision préexistante. Les occurrences « Notre maison Aqua System » dans les copys (piscines/jardins subtitle, BureauEtudes) = **expression de marque de l'entité**, PAS un libellé de menu → non touchées (intentionnel).

**2. Drawer mobile refonte** : bottom-sheet → **panneau latéral glissant depuis la droite** (design-system §5 d'origine : 80% largeur, `max-w-sm`, panneau sand). Animation sobre (keyframes `drawer-overlay-in` 200ms fade + `drawer-panel-in` 280ms translateX, globals.css ; reduced-motion couvert par le `@media` global). **Focus initial sur le CONTENEUR** (`tabIndex={-1}` + `focus:outline-none`) au lieu de la croix → plus d'anneau par défaut (focus-visible au clavier uniquement). Fermeture croix + Escape + tap overlay conservée ; focus trap inchangé (boucle croix↔CTA). Hiérarchie raffinée (header sous filet, entrées serif, filets `border-border-muted/60`, CTA pleine largeur en bas).

**3. Héros /piscines-bien-etre & /jardins-paysage — doctrine CROP-FIRST** : 2-3 variantes de recadrage de la photo actuelle capturées et **lues** avant tout swap (captures `docs/reviews/hero-crops/`). Verdict : aucun recadrage ne sauve les photos actuelles (`paroi-verre-travertin` reste « catalogue résidentiel » à tous crops ; `enterree-maison-brique` reste « une piscine sur une page jardin »). → **swaps spec appliqués** : piscines = `piscine-interieure-pierre-poutres` center_35% (overlay défaut) ; jardins = `jardin-bassin-maison-bois` center_40% + overlay allégé 60%.

**4. Cross-sells** : `border-t border-border-muted` sur le wrapper `<section>` de `CrossSellingBlock`. **Retrait complet du CrossSellingBlock des fiches `/realisations/[slug]`** (retour fondateur « cheveu sur la soupe ») → remplacé par `SectionCTA` (amorce « Ce projet vous inspire ? Parlons du vôtre. », href `/contact?source=realisations`, `trackPosition="realisation_detail"`). `showCrossSell` (mort) supprimé. **Tracking E-09 `cross_selling_clicked` ne vit plus que sur les pages univers** /piscines-bien-etre et /jardins-paysage — comportement attendu.

**5. Claims GEO** : (4a) accueil — bloc texte sous ProofBadges → ligne de crédit centrée sous filet (`border-t pt-5 text-center`, `text-sm text-foreground-muted max-w-[72ch]`), texte complet FPP/EUSA fusionné en 1 paragraphe. (4b) /jardins-paysage — section GEO standalone supprimée, claim LTE intégré comme **3e paragraphe du `body[]` du BureauEtudesBlock**.

**6. /la-maison hero** : colonne texte enrichie (eyebrow water + ligne de preuve « 30 ans · Équipe de 8 · Yvelines & Hauts-de-Seine » + filet `h-px w-12 bg-foreground-accent-water`, pb 16→14 / py 24→20). Photo : `piscine-interieure-veranda-soir` **vérifiée visuellement en split** (capture lue) → retenue (plus chaleureuse/identité que `beton-baies` industriel ; **libère le doublon** beton-baies ↔ MediaSplit /piscines-bien-etre ; 0 doublon). §5 CTA ghost `pb-20→pb-12`.

**7. Footer réseaux** : liens texte LinkedIn/Facebook → icônes `lucide-react` (`Linkedin`, `Facebook` — présents en 0.456.0), `h-9 w-9` zone tactile, `h-5 w-5` icône, `aria-label` FR + `sr-only`, hover sand-400→foreground-inverse, focus-ring inverse.

**Test e2e adapté** : `static-html-no-js.spec.ts` assertait `toHaveCount(14)` (magic number obsolète depuis D-27 = 24 fiches) → dérivé de `REALISATIONS.length` (import `@/content/realisations`, résolu par Playwright via tsconfig paths). Donnée non modifiée.

**Vérification finale** : `tsc --noEmit` **PASS** · `next lint` **PASS** (0 warning) · `npm run build` **PASS** (toutes routes < 200KB First Load JS) · **Vitest 102/102 PASS** · **Playwright 46/46 PASS** (dont drawer ouverture/Escape/focus-trigger + a11y axe-core /realisations + parcours « À propos » 3 devices). Baselines régénérées (fold + sections + footer + fiche SectionCTA, **jamais fullPage**, ≤1900px) dans `tests/screenshots/` et relues. Captures de jugement crop-first / drawer / la-maison dans `docs/reviews/hero-crops/`. Pas de commit, pas de déploiement (consigne).

---

## D-29 — Mise au niveau /prescripteurs (2026-06-12)
Agent interrompu en fin de mission — travail vérifié et finalisé par l'orchestrateur (tsc/lint/build/102 tests PASS).
Écarts corrigés au standard passe 4 : hero travertin (« catalogue ») → piscine-pierre-mur-ancien
(registre architectural, object center_45%, voile bas 0.22) ; preuves cartouches pleins → filets
éditoriaux (point médian) ; encart qualification cartouche beige → ligne éditoriale sous filet
(pattern claim GEO accueil) ; cards portfolio rafraîchies (doublon travertin levé, nocturne ajoutée).

## D-30 — Intégration de la strate savoir-faire piscines & jardins (2026-06-12)
Source copy : `docs/copy/savoir-faire-copy.md` (mot pour mot). Étape 3 chaîne « fond ».

**Nouveaux composants** (`src/components/sections/`) :
- `OuvrageCard.tsx` — card type d'ouvrage : photo 4:3 + titre serif (h3) + corps.
  Server component, NON cliquable → volontairement distincte de `RealisationCard`
  (qui émet E-06 et pointe une fiche). Standard passe 4 : pas de cartouche plein
  beige — photo en tête, texte sur le fond de section.
- `OuvragesSection.tsx` — section « Ce que nous savons construire » : SectionHeading
  centré (eyebrow water natif) + intro 2 phrases + grille 6 cards (1/2/3 col selon
  breakpoint, gap-x 24px / gap-y 48px). 6 slugs PROUVÉS du copy (débordement, miroir
  crépuscule, couloir intérieur pierre-poutres, intérieure béton-baies, fond mobile,
  paroi verre travertin), photoSrc 800w.
- `TextBlock.tsx` — EXTRAIT du local de `/jardins-paysage` en composant partagé
  (anti-duplication, Grep rollout). Ajout prop `accent` ('forest' défaut | 'water')
  pour aligner l'eyebrow sur l'univers. Le local de jardins est supprimé.

**`/piscines-bien-etre`** : insertion entre MediaSplit « Suivi annuel » et ProofBadges —
(a) `<OuvragesSection/>` ; (b) TextBlock « Construit pour durer » (tone alt, accent water,
eyebrow Construction) ; (c) TextBlock « La matière qui reste » (neutre, accent water,
eyebrow Finitions). Rythme validé au rendu : alternance fond sable/sable-alt entre les
2 TextBlocks puis ProofBadges — respiration nette, pas de doublon visuel.
**Meta description enrichie** (savoir-faire §5, verdict explicite copywriter) : intègre les
types d'ouvrage (158 car.). Title inchangé (proposition §5 optionnelle → arbitrage @seo).

**`/jardins-paysage`** : TextBlock « Pierre, végétal, sol » (neutre, eyebrow Matières) inséré
entre `CreationBlock` et `PepiniereBlock`.

**Validation** : tsc + lint + build (First Load 111 kB piscines & jardins, < 130 kB) +
102 tests vitest + 46 E2E Playwright PASS. Boucle visuelle 3 devices (clip ≤900px, jamais
fullPage) lue et jugée standard passe 4 ; baselines piscines/jardins régénérées en fold +
sections clippées (anciennes fullPage supprimées — incompatibles contrainte ≤900px).

**Point d'attention (signalé, NON corrigé)** : le MediaSplit « Conception sur mesure » (haut de
page, body « bureau d'études traduit cette vision en un plan ») et les nouveaux blocs Construction/
Finitions partagent le registre conception/bureau d'études — pas un doublon de contenu (l'un est
le récit du processus, l'autre la preuve structurelle/matière), mais la page est désormais longue.
Si @ux/@design jugent la redondance gênante, candidat naturel : resserrer le body du MediaSplit
« Conception ». Aucune suppression effectuée (consigne).

---

## D-31 — Réécriture des 24 visualDescription de realisations.ts (2026-06-12)

Agent : @copywriter | Demande fondateur 2026-06-12.

**Problème** : les `visualDescription` des 24 réalisations étaient de courtes descriptions visuelles
(2-3 phrases purement descriptives) sans fond métier ni accroche CTA. Valeur pour le visiteur : faible.

**Décision** : réécriture intégrale des 24 champs `visualDescription` avec la grille suivante :
1. Ce qu'on voit nommé avec le vocabulaire juste (type d'ouvrage, matériau identifié sur la photo)
2. Ce que ça révèle du métier — contrainte technique impliquée par le visible, sans rien inventer
3. Ouverture vers le projet du visiteur (phrase qui transpose vers sa propriété, amorce du CTA)

**Matière source** : photos lues par lots de 3 (800w) + `savoir-faire-facts.md` (21 termes, 7 différenciants)
+ `savoir-faire-copy.md` (registre des 6 ouvrages — pas de répétition de leurs formulations) + `brand-voice.md`.

**Contraintes respectées** :
- Chaque texte est unique (aucune phrase d'ouverture ou de clôture partagée entre fiches)
- Zéro intention client inventée, zéro commune, zéro durée, zéro budget
- Techniques mentionnées uniquement si elles sont impliquées par le visible (ex. fond mobile → mécanisme de levage ; volet immergé → coffre de roulement intégré à la structure)
- Zéro technique [À CONFIRMER AS] affirmée (Neobloc, PVC armé spécifique, filtration 5 µm)
- Registre brand-voice soutenu-accessible — aucun superlatif creux, aucun cadratin en début
- Textes 3-4 phrases (légèrement plus longs que les originaux : la richesse technique le justifie)

**Fichier modifié** : `src/content/realisations.ts` — champ `visualDescription` uniquement.
Aucun autre fichier `src/` touché.

**Vérifications** : tsc --noEmit PASS · npm test (vitest run) à lancer · relecture croisée variété 24 fiches effectuée.

---

## D-32 — Intégration finale du cycle FOND (jardins + resserrage piscines) (2026-06-12)

Agent : @fullstack | Demande fondateur 2026-06-12. Mise en œuvre de `fond-jardins-copy.md` (copy @copywriter, mot pour mot) + resserrage P1 du bas de /piscines-bien-etre.

**A — /jardins-paysage (3 ajouts)**
1. **Nouvelle section « Ce que le vivant impose »** (`VivantSection.tsx`) insérée entre `MatieresBlock` et `PepiniereBlock` — pendant jardin de `OuvragesSection`. Grille 2 col desktop / 1 mobile, eyebrow forest. 4 entrées, doctrine photos différenciée par entrée :
   - Entrée 1 « Le choix des essences » → `PhotoPlaceholder` (slot F1 à fournir).
   - Entrée 2 « Le sol comme contrainte réelle » → **card texte sur fond neutre, sans visuel forcé** (reco copy §7 : sujet sol peu porteur de conversion). Pas un `TextBlock` pleine largeur mais une card dans la grille (cohérence visuelle de la rangée).
   - Entrée 3 « L'entretien au bon moment » → `PhotoPlaceholder` (slot F2 à fournir).
   - Entrée 4 « La pépinière » → `OuvrageCard` avec **photo réelle** `/images/jardinerie/jardinerie-allee-pepiniere-800w.webp` (lieu réel LTE).
   Card text-only et placeholder forcés en `aspect-[4/3]` (via twMerge) pour aligner la hauteur sur les `OuvrageCard` photo de la rangée.
2. **BureauEtudesBlock** : ajout du paragraphe §2 (ombres portées / vues depuis la maison / circulations) inséré en **2e position** pour conserver le claim GEO en clôture (4 paragraphes au total).
3. **PepiniereBlock** (MediaSplit) : `body` remplacé par la version enrichie §3 (effet du geste régulier + sélection sur la plante).

**B — /piscines-bien-etre (resserrage P1, gate passe 5)**
Fusion ÉDITORIALE des anciens `TextBlock` « Construit pour durer » + « La matière qui reste » en **un seul** `TextBlock` (tone alt, eyebrow « Construction & finitions », titre « Ce qui tient dans le temps », sobre, zéro cadratin). 3 paragraphes : structure béton/CSTB → engagement Socotec/Propiscines/décennale → finitions matières + pont jardin. **Aucun fait perdu** (CSTB, décennale, Socotec CSP/ESP-001, Propiscines, margelles/grès cérame/revêtement, terrasses/allées/soubassements). −1 H2 sur la page (resserrage du bas).

**C — Vérifications** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `next build` PASS (39 pages, /jardins-paysage et /piscines-bien-etre = 111 kB First Load JS) · `vitest run` 102/102 · `playwright test` 46/46. Baselines régénérées (`scripts/baselines-fond-d32.mjs`, clip ≤900px, jamais fullPage) pour jardins + piscines (folds + sections clippées 3 devices) + fiche réalisation `piscine-debordement-foret` (vérifie le rendu du texte D-31). Captures RELUES (standard passe 5) : section vivant équilibrée, card sol texte-only distincte, photo pépinière chargée, bloc piscines fusionné sans doublon de titre, texte D-31 bien rendu sur la fiche.

**Fichiers modifiés** : `src/components/sections/VivantSection.tsx` (nouveau), `src/app/jardins-paysage/page.tsx`, `src/app/piscines-bien-etre/page.tsx`, `scripts/baselines-fond-d32.mjs` (nouveau). Copy exact respecté, tokens uniquement, aucun composant partagé modifié (pas de Grep rollout nécessaire — `OuvrageCard`/`PhotoPlaceholder`/`TextBlock` consommés tels quels).

---

## D-33 — Audit + fix de tous les CTA : zéro retour à la ligne (2026-06-12)

Agent : @fullstack | Retour fondateur (capture 2026-06-12) : le CTA « Parlez-nous de votre projet » se cassait sur 2 lignes dans le drawer mobile (panneau latéral étroit, 80 %) — « pas propre ».

**Diagnostic (audit exhaustif, captures 390 + 320 + 1440)** : tous les CTA de type bouton dérivent de 2 composants partagés (`Button`, `ButtonLink`). Aucun n'avait `whitespace-nowrap` → le libellé long (28-30 car.) wrappait dans tout conteneur étroit (drawer) et, une fois `nowrap` posé, débordait l'horizontale à 320px sur les CTA `size="lg"` (hero accueil, SectionCTA, fiche réalisation, submit formulaire).

**Règle système retenue (pas de cas par cas)** :
1. **`whitespace-nowrap` ajouté aux classes de base de `Button` ET `ButtonLink`** → un CTA bouton ne wrappe JAMAIS, partout.
2. **Taille `lg` rendue fluide** (`px-[clamp(1rem,4vw,2rem)]` + `text-[clamp(0.9375rem,3.9vw,1.125rem)]`) dans les deux composants → les libellés longs rétrécissent légèrement < 400px au lieu de déborder ; valeurs pleines (px-8 / text-lg) dès ~400px. Couvre hero, SectionCTA, submit, CTA final prescripteurs en un seul endroit.
3. **Drawer (worst case, panneau ≥ 320px)** : passage de `size="lg"` à `size="md"` + `px-4` + `text-[clamp(0.8125rem,3.6vw,1rem)]` (le bouton est `w-full`, donc seuls texte/padding pilotent le fit) → tient sur 1 ligne à 320px ET 390px.

**Uniformisation des incohérences trouvées** : la flèche « → » manquait sur la navbar desktop ET le drawer alors que tous les CTA de page (hero, SectionCTA, 404, fiche) l'avaient → flèche ajoutée aux 2 CTA navbar pour cohérence du système. Tailles/gaps/padding désormais homogènes (gap-2, rounded-md, clamp partagé).

**Vérification** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `next build` PASS · `vitest run` 102/102 · `playwright test` 46/46 (dont a11y axe-core + test drawer mobile). Contrôle programmatique d'overflow horizontal à **320px ET 390px** sur 5 pages (drawer ouvert inclus) : `scrollWidth === clientWidth` partout, **zéro bouton dépassant le viewport**. Re-captures (`docs/reviews/cta-audit/`, clips ≤ 900px) RELUES : drawer 320/390 sur 1 ligne, hero/SectionCTA/404 alignés avec flèche cohérente.

**Baselines** : régénérées via `scripts/baselines-cta-d33.mjs` (clips ≤ 900px, jamais fullPage) — folds des 7 pages publiques (navbar + hero), section CTA sombre accueil, fold 404, sur les 3 devices (375/768/1280).

**Fichiers modifiés** : `src/components/ui/Button.tsx`, `src/components/ui/ButtonLink.tsx`, `src/components/layout/NavBar.tsx`. Nouveaux : `scripts/baselines-cta-d33.mjs`, `tests/cta-audit-shots.mjs`. Aucune autre instance de CTA à modifier (le fix vit dans les 2 composants partagés → couverture totale par héritage, pas de Grep rollout par fichier nécessaire).

---

## D-34 — Nommage /la-maison aligné « À propos » + reflets d'expertise (2026-06-12)

Agent : @fullstack | Retour fondateur 2026-06-12 : « la page s'appelle toujours La maison [alors que le menu dit À propos] ; relis bien que tout notre travail d'expertise amené sur les autres pages soit également reflété sur cette page de manière cohérente. »

**A — Décision nommage (3 lignes).** La nav et le breadcrumb disaient déjà « À propos » (choix fondateur, override de la reco « Notre maison » de `nav-label-arbitrage.md`) ; seuls le H1 et les metas restaient sur « La maison » → écart visible signalé. **H1 retenu : « À propos » sobre** (pas « La maison Aquasystem ») : le candidat 4 de l'arbitrage échouait sur la dépendance au nom PROVISOIRE [Aquasystem] (coder le nom de marque dans le H1 = dette au checkpoint naming) et l'eyebrow « Aqua System & Les Terres Essentielles » + le sous-titre signature portent déjà l'identité au-dessus du H1. Alignement total nav = H1 = breadcrumb = metas. **URL `/la-maison/` INCHANGÉE** (pas de nouvelle 301). Le terme « maison »/« les deux maisons » reste libre en corps (§4 conservé).

**B — Reflets d'expertise (retouches éditoriales sourcées, zéro fait nouveau).** Audit section par section au rendu (build + serve statique + captures 3 devices) :
1. **§2 Notre histoire** : la phrase « piscines sur mesure » générique → précisée par la gamme d'ouvrage PROUVÉE (débordement, intérieures, paroi de verre, fond mobile — `savoir-faire-facts.md` §3, tous illustrés en photo).
2. **§4 panneau Aqua System** : ajout d'un reflet de la preuve structure déjà LIVE sur /piscines-bien-etre (D-32, « Ce qui tient dans le temps ») — béton armé, Avis Technique CSTB, bureau d'études, marché unique → garantie décennale. Formulation condensée, register-matched (pas de duplication). Nouvelle chip « Avis Technique CSTB » dans la rangée de preuves.
3. **§4 panneau Les Terres Essentielles** : panneau plus mince que l'AS et muet sur le vivant → ajout d'un reflet de la maîtrise LIVE sur /jardins-paysage (D-32, PepiniereBlock §3, `fond-jardins-copy.md`) — pépinière des Alluets-le-Roi, sélection sur la plante, sol argilo-calcaire. Substance prouvée LTE, **aucune création paysagère livrée revendiquée** (contrainte d'honnêteté project-context respectée).
4. **§3 méthode (étape « Le bureau d'études »)** : NON modifiée — la section méthode est au registre « rassurant, structuré, humain » (brand-voice §2), pas catalogue technique ; le langage « implantation / matériaux / lignes directrices » y est déjà juste. Sur-techniciser violerait la voix.
5. **§6 valeurs / distinctions FPP-EUSA** : laissées en place — valeurs déjà au registre des 3 mots de marque (Exigence/Confiance/Sur-mesure), distinctions à leur meilleure place dans le panneau AS (faits validés faq-geo-copy §B.3).

**Garde-fous** : CSTB et FPP/EUSA déjà validés et live ailleurs (D-32 + faq-geo-copy) → reflet, pas invention. Neobloc/classe A/filtration 5 µm [À CONFIRMER AS] NON introduits. Tokens uniquement, zéro composant partagé touché (pas de Grep rollout : seul `la-maison/page.tsx` modifié + libellé déjà unifié dans constants/tests).

**Tests label** : aucune adaptation nécessaire — `constants.test.ts` et `parcours.spec.ts` assertaient déjà « À propos » (nav/breadcrumb antérieurs) ; aucun test n'assertait le H1 « La maison » (commentaire seul). Tests verts inchangés.

**Vérification** : `tsc --noEmit` PASS · `next lint` PASS (0 warning) · `next build` PASS (39 pages) · `vitest run` 102/102 · `playwright test` 46/46. Grep `« La maison »` dans `src/` après coup : 0 occurrence (tout migré). Baselines `/la-maison` régénérées via `scripts/baselines-la-maison-d34.mjs` (clip ≤ 900px, jamais fullPage ; anciennes baselines fullPage `la-maison-{device}.png` supprimées). RELUES (3 devices) : fold H1 « À propos » sobre + eyebrow identité + signature préservée ; panneau AS avec reflet CSTB/décennale et chip CSTB ; panneau LTE avec reflet pépinière des Alluets — les deux maisons désormais équilibrées en substance.

**Fichiers modifiés** : `src/app/la-maison/page.tsx`. Nouveau : `scripts/baselines-la-maison-d34.mjs`.

**Escalade @copywriter (hors périmètre retouche)** : aucune réécriture nécessaire — toutes les retouches réutilisent des formulations sources déjà validées (D-32, savoir-faire-facts, fond-jardins-copy). Si une refonte du panneau LTE était souhaitée (le mettre à parité narrative avec l'AS au-delà du reflet), elle dépasserait la retouche → @copywriter.

---

## D-35 — Méga-lot corrections (1/2) : indexation portfolio, JSON-LD, séparateur « | », GEO, alignements (2026-06-12)

Application des correctifs P0/P1 des 4 audits (copy/seo/alignements/geo) sur les pages EXISTANTES. Aucune route blog créée (lot 2/2 à suivre).

**Chantier 1 — Indexation portfolio (P0-SEO-01 / audit-seo T4)** : `isDraft()` bascule du test « tous champs éditoriaux null » vers « visualDescription absente » (= jamais le cas, chaque fiche en a une). Mécanisme draft neutralisé proprement : les 24 fiches deviennent indexables (robots `index, follow` + incluses au sitemap). Champs éditoriaux (intention/réponse/exécution/prestations) CONSERVÉS dans le manifeste pour bascule future sur FicheEditorial. `sitemap.ts` inchangé (filtre `!isDraft` déjà en place) → **sitemap passe de 10 à 33 URLs** (9 statiques + 24 fiches). NB : le brief annonçait 34 ; le compte réel est 33 (24 fiches confirmées par Grep `^    slug: '`). Tests adaptés : `realisations.test.ts` (2 it réécrites : isDraft faux dès visualDescription présente ; bloc « 24 fiches indexables »). Les e2e (static-html, parcours) n'avaient aucune assertion noindex/count à modifier (la grille assertait déjà `REALISATIONS.length`). La 301 /notre-approche est dans `_redirects`, indépendante.

**Chantier 2 — JSON-LD** : `'@type': ['LocalBusiness', 'Organization']` dans `organizationJsonLd()` ET `partnerOrganizationJsonLd()` (Knowledge Panel, audit-seo T2 / P0-01). Vérifié dans out/index.html.

**Chantier 3 — Metas validées (megalot §1)** : title /la-maison (54 car.), desc /la-maison (132 car.), desc /piscines (154 car.), desc /jardins (152 car. + CTA), ancres « Découvrir nos piscines sur mesure » / « Découvrir nos créations paysagères » accueil, sous-titre P1 accueil (« …dans les Yvelines et les Hauts-de-Seine. Un seul interlocuteur, depuis 30 ans. » — tagline H1 intouchée), sous-titre /realisations (§1.7).

**Chantier 4 — Séparateur « | »** : template layout `%s | ${SITE_NAME}` + title.default + OG title. Tous les title absolus migrés `—`→`|` (contact, realisations, fiches `${shortTitle} | Réalisations`, jardins, accueil, piscines, la-maison) + **prescripteurs** (absent du tableau copy §2.1.B — oubli, soumis à la même règle actée). OG titles migrés aussi. Vérif out/ : **0 « — » dans les `<title>`** (grep `<title>[^<]*—` = vide). Le `name` du JSON-LD ImageObject fiche garde `—` (non-title, conforme note copy §2.1.B). Tests `realisations.test.ts` shortTitle adaptés (« | Réalisations », 15 car. = identique).

**Chantier 5 — Sweep cadratins §2.2** : 3 remplacements dans le copy rendu (piscines L127 « : … . », jardins MatieresBlock virgule, OuvragesSection piscine intérieure point).

**Chantier 6 — Alignements (audit-alignements)** : `TextBlock.tsx` text-left retiré L44 (corrige P0-03/P0-04, tous les TextBlock) ; claims GEO /piscines fusionnés en 1 § centré sous filet max-w-[72ch] (pattern accueil, P0-01) ; la-maison text-left retiré §2 histoire + §5 ancrage local (P1-02/P1-01) ; eyebrow « Notre maison » ajouté avant H2 Aqua System §4 (P1-06, symétrie LTE) ; prescripteurs CTA portfolio `text-center` (P2-03) ; accueil articles `max-w-[45ch]`→`52ch` (P1-05) ; fiche aside `max-w-[60ch]` retiré (P1-10). Écartés (screenshots obsolètes documentés dans l'audit) : P0-05, P1-03, P1-09.

**Chantier 7 — GEO** : bloc extractible sous H1 /realisations (texte §3, 24 réalisations + 6 ouvrages + zones + bureau d'études) ; FAQ /piscines 3 Q/R (§4) en `FAQ_PISCINES` (faq.ts) → `FaqSection` visible (heading « Questions fréquentes », tone alt, après TextBlock + Preuves) + `faqPageJsonLd` avec `@id` ancré URL. `faqPageJsonLd(qa, id?)` étendu avec `@id` optionnel : les 3 FAQPage du site (la-maison, prescripteurs, piscines) portent désormais chacun un `@id` unique ancré sur leur URL canonique (`/…/#faq`) — unicité vérifiée dans out/.

**Chantier 8 — P1 SEO restants** : P1-03 twitter:image fiches aligné sur og:image (audit T3). P1-01 IndexNow (clé Bing requise) et P1-02 footer nav (annule D-22, validation @design/@regard-fondateur) NON appliqués → handoff.

**Vérification** : `tsc --noEmit` PASS · `next lint` 0 warning · `next build` 39 pages PASS · `vitest run` 103/103 · `playwright test` 46/46. out/ : 0 cadratin dans les `<title>`, sitemap 33 URLs, 24 fiches `index, follow`, `@type` array présent, 3 FAQPage @id uniques, bloc GEO + 3 Q/R FAQ visibles. Baselines (fold + fullpage, 9 pages × 3 devices = 54) régénérées via `scripts/capture-baselines.mjs` (serveur statique `serve out` port 3100) et RELUES : realisations (sous-titre 78/92 + bloc GEO), la-maison (axes corrigés), piscines (claims centrés + FAQ), accueil (sous-titre + ancres), jardins (TextBlock centré). NB baselines `-sec1/-sec2` accueil non couvertes par le script (artefacts session antérieure) — non bloquant.

**Fichiers modifiés** : `src/content/realisations.ts`, `src/app/sitemap.ts`, `src/lib/seo.ts`, `src/content/faq.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/contact/page.tsx`, `src/app/realisations/page.tsx`, `src/app/realisations/[slug]/page.tsx`, `src/app/jardins-paysage/page.tsx`, `src/app/piscines-bien-etre/page.tsx`, `src/app/la-maison/page.tsx`, `src/app/prescripteurs/page.tsx`, `src/components/sections/TextBlock.tsx`, `src/components/sections/OuvragesSection.tsx`, `tests/unit/realisations.test.ts`.


---

## D-37 — Intégration des 6 photos jardins fondateur + casting hero plongeante (2026-06-12)

6 photos jardins fournies par le fondateur (page Facebook/Instagram Les Terres Essentielles, droits accordés 2026-06-12). Triage orchestrateur : 3 SITE (créations paysagères), 3 RÉSERVE SOCIALE (registre jardinerie/ambiance). Toutes ≤ 1900px les deux dimensions à la source (1440×1078 pour les 3 site).

**Optimisation** — `scripts/build-jardins-fondateur-images.mjs` :
- SITE → `public/images/realisations/` WebP 3 tailles (1280/800/400, qualité 80) : `jardin-terrasses-plongee`, `massif-exotique-escalier`, `massif-palmier-agaves`.
- RÉSERVE → `assets/social-media/` JPEG mozjpeg q82, fit inside 1900px : `bananiers-serre-jardinerie`, `fleurs-blanches-macro`, `rosiers-jardin`. README social-media mis à jour. Racine nettoyée (6 jpg supprimés ; Grep des noms d'origine → seul le script de build les référence).

**Casting hero /jardins-paysage — DÉCISION : PAS de swap.** La plongeante (469671333) est une composition VERTICALE/diagonale qui se lit de haut en bas (terrasse bois + couloir de nage en haut → escaliers + graminées → pavés en bas). Test empirique : crop au ratio réel du hero desktop (60vh ≈ 2.78:1) à 4 positions verticales (`/tmp/casting/hero-{top,center,pos40,pos65}`). Verdict : le bandeau large **mutile** la composition — `top` ne montre que la terrasse haute (perd l'étagement, le sujet), `center` donne une bande confuse d'escaliers sans sujet lisible. De plus le bloc texte bas-gauche du hero tomberait sur la zone pavée chargée (lisibilité H1 dégradée). Le hero actuel `jardin-bassin-maison-bois` (composition horizontale végétale, validé D-28) est conservé. La plongeante est utilisée là où son format vertical excelle : (1) grille réalisations à son ratio natif, (2) pas de MediaSplit dédié (le slot Création est pris par le massif exotique, plus représentatif d'« une création plantée » que d'une vue d'ensemble).

**Slots comblés (doctrine conversion)** :
- Slot « Création » /jardins-paysage : `CreationBlock` passe de `TextBlock` à `MediaSplit` (accent forest, tone alt) avec `massif-exotique-escalier` (palmiers, escalier pierre, paillage minéral). Alt factuel « Massif exotique planté par Les Terres Essentielles… » — pas de revendication de chantier complet ni de commune.
- Slot F1 « essences » de `VivantSection` : placeholder → photo réelle `massif-palmier-agaves` (kind `photo`, rendu OuvrageCard). Alt factuel essences visibles.
- Slot F2 « entretien » de `VivantSection` : RESTE en PhotoPlaceholder (aucune photo entretien parmi les 6 — zéro invention).

**Manifeste** : `jardin-terrasses-plongee` ajoutée (type `projet_complet`, filtres projet_complet/jardin_parc/piscine). `visualDescription` rédigée au registre D-31 (description visible + réalité d'exécution + clôture conditionnelle « Si votre terrain… »). Crédit `Les Terres Essentielles`. Entre dans la grille (25 fiches) + sitemap.

**Vérification** : `tsc --noEmit` PASS · `next lint` 0 warning · `next build` PASS (25 fiches réalisations, fiche `jardin-terrasses-plongee` générée + au sitemap) · `vitest run` 115/115 · baselines jardins + accueil × 3 devices régénérées (`scripts/screenshots-casting.mjs`, serveur `serve out` port 3000) et RELUES : Création MediaSplit (photo droite OK), VivantSection (essences photo top-left, F2 placeholder conservé, pépinière photo OK). Crops casting archivés `/tmp/casting/` (hors repo).

**Fichiers modifiés** : `scripts/build-jardins-fondateur-images.mjs` (nouveau), `src/content/realisations.ts`, `src/app/jardins-paysage/page.tsx`, `src/components/sections/VivantSection.tsx`, `assets/social-media/README.md`.

---

## D-39 — Dates blog antidatées + logo/lien L'Esprit Piscine (2026-06-12)

**Dates blog (retour fondateur)** : les 6 articles étaient échelonnés VERS LE FUTUR depuis le 2026-06-12 (jusqu'au 2026-08-26) — incohérent pour le visiteur (« on est le 12 juin ») et nocif SEO (Google ignore/déclasse les datePublished futures). Correction : même ordre de publication du programme (A1, A4, A5, A2, A3, A6), même cadence 15 jours, mais en REMONTANT depuis le jour du lancement — le programme est présenté comme déjà en cours. A1 2026-03-29 · A4 2026-04-13 · A5 2026-04-28 · A2 2026-05-13 · A3 2026-05-28 · A6 2026-06-12 (jour J). Prochain article du programme : ~2026-06-27. Règle : JAMAIS de datePublished future. Grep `2026-0[78]` dans src/ → 0 résultat.

**Logo + lien L'Esprit Piscine (retour fondateur « est-on juste ? »)** : OUI, on est juste — adhésion réelle et vérifiée (page membre https://www.esprit-piscine.fr/aqua-system/ HTTP 200, JSON-LD memberOf + sameAs déjà en place, crédits photo fiches). Manquait : logo visible + lien cliquable. Fait :
- `public/images/partenaires/logo-esprit-piscine.png` (215×45, 989 o, source officielle esprit-piscine.fr, transparent).
- Footer : badge texte « Réseau L'Esprit Piscine » → badge LOGO cliquable vers la page membre (logotype noir inversé blanc `brightness-0 invert` — usage monochrome footer ; l'usage du logo est conforme au statut de membre du GIE).
- /la-maison : mention « réseau L'Esprit Piscine » → lien éditorial vers la page membre (preuve tierce directe).
- Constante unique `ESPRIT_PISCINE_MEMBER_URL` (constants.ts).
- ProofBadges accueil : INCHANGÉ (harmonie typographique du bandeau de preuves — pas de mélange logo/texte).

**Fichiers modifiés** : `src/content/blog.ts` (dates), `src/lib/constants.ts`, `src/components/layout/Footer.tsx`, `src/app/la-maison/page.tsx`, `public/images/partenaires/logo-esprit-piscine.png` (nouveau).

---

## D-40 — Heros nets (palier 1920w) + slot entretien F2 comblé (@fullstack, 2026-06-12)

**Contexte (retour fondateur)** : heros FLOUS sur /piscines-bien-etre et /jardins-paysage. Diagnostic : WebP 1280×720 affichés full-bleed → sur desktop 1440-1920px upscalés ~1,5× → flou perçu. Les sources esprit-piscine plafonnaient à 1280px. Le fondateur a fourni les **originaux pro 1920px** de son site aqua-system.fr (droits OK — c'est son site ; ~50 fichiers 1920px dans `/tmp/hero-hr/`, mapping `urls.txt`, crédits photographes dans les noms de fichiers : Philippe Leroy / Fred Pieau / Architecte Jonny Sturari SKP).

### Casting (previews 800px lues par lots de 3, jamais d'original >1900px lu directement)
Identification du même visuel que les heros actuels parmi les 60 :
- **Hero ACCUEIL — CAS A** : `img42` (SAI07, Photo Philippe Leroy) = MÊME visuel que `piscine-couloir-demeure-ancienne` (demeure ancienne pierre/brique + bassin couloir, FONDATEUR-APPROVED) en 1920×1292. → set régénéré SOUS LE MÊME NOM DE BASE (4 tailles), alt + cadrage INCHANGÉS, aucune perception modifiée, juste de la netteté. Bénéficie aussi à la fiche réalisation homonyme + au hero blog (même base).
- **Hero PISCINES — CAS B** : le couloir intérieur `piscine-interieure-pierre-poutres` (pierre + charpente bois) N'EXISTE PAS en 1920 dans le gisement. Meilleur candidat 1920 du même registre premium : `img17` (série « Spa Corniche » Aqua System) — piscine intérieure bien-être, transats bas-gauche (zone calme H1) + bassin éclairé à droite, composition horizontale qui survit au bandeau (crop 2.6:1 testé). → **nouveau set** `piscine-interieure-spa-transats`, alt factuel réécrit, `object-center`. L'ancien `pierre-poutres` reste utilisé ailleurs (fiche, OuvragesSection, blog, prescripteurs) — fichiers conservés.
- **Hero JARDINS — CAS B** : `img41` (TOU32, Photo Philippe Leroy) = MÊME PROJET maison-bois que l'actuel `jardin-bassin-maison-bois`, mais **cadrage frontal différent** (la 1280w actuelle était un crop 3/4). Un cadrage différent = changement de perception → traité en CAS B (nom distinct, honnête) plutôt qu'en CAS A. → **nouveau set** `jardin-bassin-maison-bois-paysage`, alt factuel révisé (maison à bardage bois, pas « contemporaine à ossature bois »), `object-center`. L'ancien `jardin-bassin-maison-bois` reste utilisé (fiche, grille) — fichiers conservés.

### Optimisation (`scripts/build-hero-1920-images.mjs`, réutilisable)
4 tailles WebP (1920/1280/800/400). Qualité 80 sur ≤1280w (qualité conservée mobile/tablet) ; **q66 sur la 1920w** (le palier desktop large) pour tenir la cible poids. Poids 1920w finaux : accueil **333 Ko**, piscines **73 Ko**, jardins **366 Ko**. Le hero jardins (feuillage très dense, original 4:3 1920×1440) pesait >450 Ko même à q52 → **recadré en 16:9** (`crop169`, ratio bandeau réellement affiché par le hero, q60) : 366 Ko + meilleure compo (maison+bassin centrés, pelouse en bas pour le H1). Le « ~5 % au-dessus de 350 Ko » est assumé : descendre la qualité dégraderait la netteté, objet même de la correction ; hero unique en `fetchPriority=high`.

### Système Hero étendu (`Hero.tsx` + `realisations.ts`)
- Prop optionnelle **`imageSrc1920`** (chemin explicite, pas de dérivation magique). Si fournie → `<source media="(min-width: 1280px)" srcSet={imageSrc1920} type="image/webp">` émis AVANT l'`<img>` (premier `<source>` qui matche gagne ; sous 1280px on retombe sur l'img 1280w ; sous 768px la source mobile 800w prévaut, ordre préservé). `width/height` de l'img inchangés (1280×720). Les heros sans 1920w (autres pages) restent strictement en 1280w — zéro régression.
- `toWidthVariant` étendu pour accepter `1920w` (type `PhotoSize`), robustesse.
- 3 pages mises à jour : `/` (CAS A, prop ajoutée seule), `/piscines-bien-etre` + `/jardins-paysage` (CAS B : nouveau base name + `imageSrc1920` + alt + object-position).

### Slot entretien F2 de `VivantSection.tsx` (D-37 l'avait laissé en PhotoPlaceholder)
Le fondateur voulait « quelque chose de bien qu'on a ». Retenu parmi les 60 : `img34` (GAU24, Photo Philippe Leroy) — abords d'un bassin dans un **jardin manifestement entretenu** (pelouse tondue ras, massifs taillés, soutènement en traverses de bois, transats alignés). Légitime pour illustrer « l'entretien ». → set 3 tailles `jardin-paysage-abords-entretenus` (PAS de 1920w : rendu en OuvrageCard 800w max). Placeholder → `kind: 'photo'`. **Alt FACTUEL décrivant la photo** (registre D-31), zéro revendication de prestation d'entretien sur CE jardin précis (le texte du slot porte déjà le propos). Plus AUCUN placeholder « Visuel à venir » sur /jardins-paysage (vérifié out/ : 0).

### Vérifications
`tsc --noEmit` PASS · `next lint` 0 warning · `npm run build` PASS (48 pages, clean depuis `.next` vide — un échec `collect-build-traces` nft.json venait d'un cache concurrent, non bloquant en export statique) · `vitest run` **115/115** · `playwright test` **55/55** (a11y axe-core inclus). out/ : 3 `<source min-width:1280px>` 1920w présents (accueil/piscines/jardins), photo entretien rendue, 0 placeholder F2. Captures AVANT/APRÈS RELUES (clips ≤900px, jamais fullPage) dans `tests/screenshots/AFTER-hero-*` + `AFTER-vivant-entretien-*` : netteté visiblement meilleure desktop 1280, H1 lisibles (overlay préservé), VivantSection homogène 4 visuels.

### Crédits / sources (gisement aqua-system.fr, droits fondateur)
img42→`piscine-couloir-demeure-ancienne` (P. Leroy, SAI07) · img17→`piscine-interieure-spa-transats` (série Spa Corniche AS) · img41→`jardin-bassin-maison-bois-paysage` (P. Leroy, TOU32) · img34→`jardin-paysage-abords-entretenus` (P. Leroy, GAU24).

**Fichiers modifiés** : `scripts/build-hero-1920-images.mjs` (nouveau), `src/components/sections/Hero.tsx`, `src/content/realisations.ts` (toWidthVariant + type PhotoSize), `src/app/page.tsx`, `src/app/piscines-bien-etre/page.tsx`, `src/app/jardins-paysage/page.tsx`, `src/components/sections/VivantSection.tsx`, + 15 WebP dans `public/images/realisations/` (4×accueil/piscines/jardins-hero + 3×entretien).

**Grep rollout** : anciens base names hero (`piscine-interieure-pierre-poutres`, `jardin-bassin-maison-bois`) — Grep src/ : trouvés dans fiches/blog/OuvragesSection/prescripteurs, **non touchés** (usages légitimes hors hero, fichiers conservés). Nouveaux base names — Grep src/ : présents uniquement aux points d'intégration voulus.

---

## D-41 — Correctifs P1 des ré-audits SEO (8.9/10) et GEO (8.6/10) (2026-06-12)

Re-scoring page par page livré (`docs/seo/re-audit-scoring.md`, `docs/geo/re-audit-scoring.md`) suite à la question fondateur « as-tu bien itéré jusqu'à 10/10 ? ». SEO 6.7 → 8.9 ; GEO 7.1 → 8.6 (verdict : le site fait tout ce qu'un site peut faire ; le reste = bloqué fondateur ou structurel/temps).

Correctifs appliqués dans la foulée (session principale, éditions mineures) :
- R-02/R-03 : metaTitle A4 → « Prix d'une piscine haut de gamme | Aqua System » (46 c., brand unifiée « Aqua System ») ; A1 → suppression « 78/92 » (57 c.).
- R-04/R-05 : /notre-regard — og:image explicite + autodiscovery RSS (`alternates.types`) + cadratin du og:title remplacé par « | ».
- R-06 : mentions légales + politique de confidentialité passées `index:false, follow:true` et RETIRÉES du sitemap (budget crawl).
- SITE-03 : `partnerOrganizationJsonLd` + `foundingDate: '2015'` + `taxID: '811198217'` (données légales publiques pappers/societe.com).
- SITE-04/R-08 : ItemList JSON-LD sur /realisations (25 fiches, positions = ordre manifeste) + compteur du bloc GEO visible passé de « 24 » codé en dur à `ITEM_LIST.numberOfItems` (la D-37 avait porté la grille à 25 sans ce texte).
- SITE-05 : llms.txt — ligne dirigeant enrichie (signataire Charte Pro Gens de Confiance + URL profil).
- SITE-06 : Blog JSON-LD sur /notre-regard (publisher @id organization, 6 BlogPosting).
- SITE-02 : /prescripteurs — assertion extractible des 6 types d'ouvrage (intérieure : 4 construites) dans la preuve « 30 ans ».

EN ATTENTE (conflit de fichiers avec le lot heros D-40 en cours) : R-01 (meta description /jardins-paysage 168 → ≤155 c.). REPORTÉS au lot P2 : R-07 (FAQPage /jardins-paysage), R-10 (FAQPage articles), R-11/R-12 (maillage fiches ↔ pages services). REJETÉ : R-09 (5 liens nav footer) — contredit D-22 (suppression nav footer validée fondateur) ; ne pas réintroduire sans nouvel arbitrage.

---

## D-42 — Lot P2 des ré-audits SEO/GEO : FAQ visibles + maillage interne (@fullstack, 2026-06-12)

Application des 4 correctifs P2 reportés par D-41 (`docs/seo/re-audit-scoring.md`). RÈGLE ZÉRO INVENTION respectée : chaque Q/R et chaque libellé de lien est une reformulation/condensation STRICTE de contenu déjà validé (corps d'articles `src/content/blog/*.ts`, pages services, `faq.ts`) — aucun fait, chiffre ou commune nouveau. Aucun corps d'article altéré. « en partenariat avec Les Terres Essentielles » conforme. Zéro cadratin dans les titres/questions (vérifié).

### R-07 — FAQPage /jardins-paysage
`FAQ_JARDINS` (4 Q/R) ajouté dans `src/content/faq.ts` + `FaqSection` (tone alt, accent forest) avant le CrossSelling + `faqPageJsonLd` @id `absoluteUrl('/jardins-paysage/#faq')`. Accent forest ajouté à `FaqSection` (prop `accent`, défaut water — zéro régression piscines). Q/R et sources de reformulation :
- « Pouvez-vous concevoir le jardin en même temps que la piscine ? » ← BureauEtudesBlock §3 + A5 (« les deux études menées au même moment »).
- « Faites-vous une étude avant de planter ? » ← BureauEtudesBlock §1-2 (« pose le plan avant que la première pelle entre dans la terre »).
- « D'où viennent les végétaux et comment sont-ils choisis ? » ← PepiniereBlock + CreationBlock (sélection sur la plante, sol argilo-calcaire ouest parisien).
- « Assurez-vous aussi l'entretien des jardins que vous créez ? » ← PepiniereBlock §1 (geste régulier vs rattrapage ponctuel).

### R-10 — FAQ visible + FAQPage JSON-LD par article
Champ optionnel `faq?: { q; a }[]` ajouté au type `Article` (`src/content/blog.ts`) + rendu dans `notre-regard/[slug]/page.tsx` (bloc `FaqSection` tone alt avant le CTA + `faqPageJsonLd` @id `/notre-regard/<slug>/#faq`). 6 articles × 2-3 Q/R reformulées du corps de CHAQUE article (souvent à partir des blocs `kind: 'geo'` déjà présents, condensés en réponses auto-contenues) :
- **A1 débordement** : terrain en pente adapté ? / différence débordement vs miroir / génie civil interne.
- **A4 prix** : béton vs coque / fourchettes publiques 2026 (non tarifs AS) / garantie décennale.
- **A5 piscine+jardin** : pourquoi concevoir ensemble (niveaux) / synergie pierre Kei-Stone / un seul interlocuteur-marché.
- **A2 intérieure** : qu'est-ce que l'hygrométrie / conséquences non maîtrisée / 4 configurations.
- **A3 fond mobile** : fond mobile vs terrasse mobile / ajout sur piscine existante (non) / prix de marché.
- **A6 rénovation** : quand rénover / test du seau / meilleure saison (automne).

### R-11 — fiche réalisation → page(s) service
`realisations/[slug]/page.tsx` : nav discrète « Notre savoir-faire » dans l'aside (filet supérieur, liens texte sobres, pas de bloc lourd, pas de doublon avec le SectionCTA). Mapping par `cardType` via `serviceLinks()` : Piscine sur mesure + Espace bien-être → /piscines-bien-etre ; Jardin & Parc → /jardins-paysage ; Projet complet eau + jardin → les deux. Vérifié out/ : fiche piscine = 1 lien, fiche projet complet = 2 liens.

### R-12 — page service → fiches individuelles
- **Piscines** : prop optionnelle `realisationHref` sur `OuvrageCard` + `realisationSlug` sur 3 ouvrages emblématiques de `OuvragesSection` (Couloir de nage → `piscine-interieure-pierre-poutres` ; Piscine intérieure → `piscine-interieure-beton-baies` ; Fond mobile → `piscine-fond-mobile-terrasse`). Lien texte « Voir cette réalisation » ; les 3 autres cards restent non cliquables (design d'origine préservé).
- **Jardins** : prop optionnelle `link` sur `MediaSplit` ; posée une fois sur `CreationBlock` (le corps évoque enrochements/terrasses végétalisées) → « Voir un jardin en terrasses étagées » vers `jardin-terrasses-plongee`. Aucune mention forcée ailleurs (consigne « ne force pas »).

### Grep rollout
- `FaqSection` (composant partagé modifié : prop `accent`) — Grep src/ : 4 usages (`/la-maison`, `/notre-approche` via /la-maison, `/piscines-bien-etre`, + nouveaux jardins/articles). Tous conservent le défaut `water` sauf jardins (`forest`). Aucune régression.
- `MediaSplit` (prop `link` additive) / `OuvrageCard` (prop `realisationHref` additive) : props optionnelles, tous les usages existants inchangés.

### Vérifications
`tsc --noEmit` PASS · `next lint` 0 warning · `npm run build` PASS (export statique) · `vitest run` 115/115 · `playwright test` 55/55 (a11y axe-core inclus). out/ : FAQPage @id tous UNIQUES sur l'ensemble du site (10 @id distincts, 1 par page : la-maison, prescripteurs, piscines, jardins + 6 articles). Zéro cadratin dans les questions/headings (les cadratins résiduels sont dans le corps des réponses, ponctuation legitime alignée sur les corps d'articles validés). Captures fold RELUES (clips ≤900px, jamais fullPage) : `tests/screenshots/P2-faq-jardins-{mobile375,desktop1280}.png` + `P2-faq-article-fond-mobile-{mobile375,desktop1280}.png` — rendu propre, design system respecté.

**Fichiers modifiés** : `src/content/faq.ts`, `src/content/blog.ts`, `src/components/sections/FaqSection.tsx`, `src/components/sections/MediaSplit.tsx`, `src/components/sections/OuvrageCard.tsx`, `src/components/sections/OuvragesSection.tsx`, `src/app/jardins-paysage/page.tsx`, `src/app/notre-regard/[slug]/page.tsx`, `src/app/realisations/[slug]/page.tsx` + 4 captures `tests/screenshots/P2-*`.

NON COMMITTÉ, NON DÉPLOYÉ (consigne brief).
