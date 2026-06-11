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
