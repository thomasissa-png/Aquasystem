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
