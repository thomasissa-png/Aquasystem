# Audit technique final — Site LIVE aquasystem.pages.dev

> Auteur : @qa · Date : 2026-06-12 · Cible : https://aquasystem.pages.dev
> Périmètre : perf réelle (Lighthouse) + a11y axe-core + robustesse (formulaire live, headers, pages d'erreur)
> Honnêteté : `[LIVE]` = mesure réelle observée · `[BLOQUÉ]` = non mesurable (Resend non configuré)
> Environnement : Lighthouse v13.4.0 (Chromium Playwright 1223), mobile + throttling `simulate` (3G + 4× CPU). Le proxy du bac à sable impose un certificat MITM rejeté par Chrome → flag `--ignore-certificate-errors` ajouté (cf. §1 méthode). N'affecte pas les scores (TLS non audité).

---

## 0. Verdict global

| Dimension | Score live | Cible | Statut |
|-----------|-----------|-------|--------|
| Performance (moy. 3 pages) | **97/100** | ≥ 90 | PASS |
| Accessibilité (Lighthouse) | **100/100** | ≥ 95 | PASS |
| Accessibilité (axe-core 3 pages) | **0 violation** | 0 | PASS |
| Best Practices | **100/100** | ≥ 90 | PASS |
| SEO (Lighthouse) | **100/100** | ≥ 90 | PASS |
| Robustesse formulaire | partielle | — | **[BLOQUÉ Resend]** |
| Headers cache/sécurité | conformes | — | PASS |
| Pages d'erreur / redirects | conformes | — | PASS |

### Note globale : **8,5 / 10**

Décomposition pondérée :
- **Perf** (3,5/4) : scores 96–99, mais LCP 2,6 s sur 2 pages = à la limite haute du budget 2,5 s mobile (audit LCP scoré 0,87 < 0,9).
- **A11y** (3/3) : 100 Lighthouse + 0 violation axe-core sur les 3 pages, double mesure indépendante. Parfait sur l'automatisable. Deux contrastes `incomplete` (texte sur photo/gradient) vérifiés manuellement = lisibles.
- **Robustesse** (2/3) : headers, sécurité, méthodes, pages d'erreur, redirects = nickel. **−1 point** : le formulaire ne peut PAS être validé de bout en bout en live (honeypot, validation 400, rate-limit 429 tous inatteignables tant que Resend n'est pas configuré — voir §3, défaut d'ordre des gardes). Ce n'est pas un bug de code mais un trou de couverture live à lever avant lancement réel.

Le site est **techniquement prêt à 8,5/10**. Le demi-point manquant tient à un seul vrai sujet bloquant le « GO réel » : **le formulaire est aveugle en production** (tout renvoie 500) jusqu'à configuration de Resend — donc impossible de prouver qu'un lead part. C'est la NSM directe : à lever avant d'annoncer le site.

---

## 1. Lighthouse réel (M-3 — enfin mesuré en live)

### Méthode `[LIVE]`
`npx lighthouse@latest <url> --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox --ignore-certificate-errors"` — CHROME_PATH = chromium Playwright 1223. Profil par défaut = **mobile, throttling `simulate` (3G lent + CPU 4×)**. JSON bruts : `/tmp/lh-{home,real,contact}.json`. Premier run échouait (interstitiel = certificat MITM du proxy rejeté par Chrome) → flag cert ajouté ; n'altère pas les métriques perf/a11y/seo.

### Résultats par page `[LIVE]`

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP | SI |
|------|------|------|-----|-----|-----|-----|-----|-----|-----|
| `/` | **96** | 100 | 100 | 100 | 2,6 s | 0 | 50 ms | 1,4 s | 1,4 s |
| `/realisations/` | **97** | 100 | 100 | 100 | 2,6 s | 0,006 | 20 ms | 1,0 s | 1,0 s |
| `/contact/` | **99** | 100 | 100 | 100 | 2,0 s | 0 | 20 ms | 1,0 s | 1,0 s |

TTFB document : 40–60 ms (excellent, edge Cloudflare). CLS ≈ 0 partout (largeur/hauteur d'images posées → 0 reflow visuel). TBT 20–50 ms (≪ 200 ms).

### Écarts vs cibles
- **Toutes les cibles sont atteintes** : Perf ≥ 90, A11y ≥ 95, BP ≥ 90, SEO ≥ 90, sur les 3 pages.
- **Seul point d'attention — LCP 2,6 s sur `/` et `/realisations/`** (mobile simulé) : audit `largest-contentful-paint` scoré 0,87 (sous 0,9). Cause = image hero (LCP element) sur réseau 3G throttlé. Marge faible mais > budget 2,5 s. La variante mobile 800w (124 KB) est bien servie (§2), donc le levier restant est marginal (préchargement / format). **P2**, non bloquant (Perf globale reste 96–97).
- Audits informatifs non scorés (`network-dependency-tree-insight`, `forced-reflow-insight`) = diagnostics LH v13, sans impact sur le score, non bloquants.

---

## 2. Poids réels & headers `[LIVE]`

### Poids des documents et de l'asset LCP

| Ressource | Poids brut | Transféré (Brotli/gzip CF) | Verdict |
|-----------|-----------|----------------------------|---------|
| HTML `/` | 64,8 KB | **10,6 KB** | OK |
| HTML `/realisations/` | 45,0 KB | ~ | OK |
| HTML `/contact/` | 48,3 KB | ~ | OK |
| Hero **mobile** `piscine-debordement-foret-800w.webp` | **124 KB** | — | OK (< 200 KB) |
| Hero **desktop** `…-1280w.webp` | **307 KB** | — | **> 200 KB** (P2) |
| Framework chunk `fd9d1056…js` | 173 KB | 54 KB | OK |
| Total JS chunks (somme brute) | 494 KB | compressé par CF | OK (Perf le confirme) |
| CSS `75eb8057…css` | 27,9 KB | — | OK |
| Font woff2 (subset latin) | 37 KB | — | OK |

**Variante mobile servie correctement (M-3 vérifié)** `[LIVE]` : le `<picture>` du hero contient `<source media="(max-width:767px)" srcSet="…-800w.webp">` + `<img src="…-1280w.webp" fetchPriority="high" loading="eager" width=1280 height=720>`. **Le mobile reçoit bien la 800w (124 KB)**, le desktop la 1280w (307 KB). Le `<picture>` natif compense l'absence de srcset de `next/image` en export `unoptimized`. Conforme reco @infra D7 / fix @fullstack.

- **P2 — hero desktop 307 KB > 200 KB** : seule image au-dessus du budget. Desktop uniquement (≥ 768 px), priority/eager → impact LCP desktop faible. Correctif possible : ré-encodage AVIF ou qualité WebP réduite. Type = **code** (`src/content/realisations.ts` / pipeline images).

### Headers de cache (`_headers` actifs) `[LIVE]`

| Chemin | Cache-Control observé | Attendu | Statut |
|--------|----------------------|---------|--------|
| `/_next/static/css/*` | `public, max-age=31536000, immutable` | immutable 1 an | **PASS** |
| `/_next/static/media/*` (fonts) | `public, max-age=31536000, immutable` | immutable 1 an | **PASS** |
| `/images/*` | `public, max-age=2592000, stale-while-revalidate=86400` | 30 j + SWR | **PASS** |
| HTML `/` | `public, max-age=0, must-revalidate` | revalidate | **PASS** |

### Headers de sécurité `[LIVE]`
Tous présents et conformes infrastructure.md §5 :
- **HSTS** : `max-age=63072000; includeSubDomains; preload` — PASS.
- **CSP** : `default-src 'self'; script-src 'self' 'unsafe-inline' https://*.umami.is; … connect-src 'self' https://*.umami.is https://api.resend.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'` — PASS. (`'unsafe-inline' script-src` = limite connue Next inline bootstrap ; sans nonce en export statique, documenté, non bloquant.)
- `x-content-type-options: nosniff`, `x-frame-options: DENY`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy` (camera/micro/geo/interest-cohort off) — PASS.
- `access-control-allow-origin: *` — documenté (P3 infra, à restreindre post-domaine, sans faille V1 — pas de credentials, GET/POST publics).

---

## 3. Formulaire live — POST /api/contact `[LIVE]` + `[BLOQUÉ Resend]`

| Cas | Attendu | Observé live | Statut |
|-----|---------|--------------|--------|
| 1. Payload valide | 500 send_failure propre (Resend non config) | **500** `{"success":false,"error":"send_failure","message":"Une erreur est survenue. Veuillez réessayer ou nous appeler au 01 30 42 26 00."}` | PASS (message exact = ux-writing v1.2) |
| 2. Honeypot rempli (`website`) | 200 silencieux | **500 send_failure** (jamais atteint) | **[BLOQUÉ]** |
| 3. Payload invalide | 400 codes machine `error:"validation"` | **500 send_failure** (jamais atteint) | **[BLOQUÉ]** |
| 4. 8 POST rapides | 429 après seuil KV | **8× 500** (jamais atteint) | **[BLOQUÉ]** |
| 5. text/plain (content-type non géré) | 400 invalid_body | **400** `{"success":false,"error":"invalid_body"}` | PASS |
| 6. GET | — | **404** | OK (Pages Function POST-only) |
| 7. PUT | 405 | **405** | PASS |
| 8. OPTIONS (préflight CORS) | 204 | **204** | PASS |

### Cause racine du `[BLOQUÉ]` — ordre des gardes dans `functions/api/contact.ts`
La garde de configuration (**étape 1**, lignes 503-515) court-circuite TOUT le reste **avant** honeypot (étape 2), rate-limit (étape 3) et validation (étape 4) :
```
if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_TO || !env.CONTACT_EMAIL_FROM) → 500 send_failure
```
Resend n'étant pas configuré sur l'environnement live, **chaque requête (valide, honeypot, invalide, 9ᵉ tentative) renvoie 500**. Conséquences :
1. Impossible de prouver en live que honeypot/validation/rate-limit fonctionnent (couverts uniquement en `[STATIQUE]` par les 102 tests Vitest, jamais exécutés contre le edge réel).
2. **Le rate-limit KV (429) est inatteignable** : même si le binding `RATE_LIMIT_KV` est configuré, l'étape 3 est derrière la garde config. Les 8 POST → 500, pas 429.

C'est un **trou de couverture live**, pas un bug isolé : le seul cas réellement observable aujourd'hui est le 500 (et le 400 invalid_body, qui passe AVANT la garde car le parsing échoue d'abord).

### Correctifs
- **P0 [config Cloudflare] — configurer Resend** (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`) + binding `RATE_LIMIT_KV` (+ `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SECONDS`). C'est le **seul vrai bloquant du GO réel** : tant qu'il n'est pas levé, **aucun lead ne part** (la NSM = 0 par construction). Après config : re-jouer les cas 1-4 en live (payload valide → 200, honeypot → 200 silencieux, invalide → 400, 8 POST → 429 au seuil). `[BLOQUÉ : Resend non configuré]`.
- **P2 [code] — ordre des gardes** : envisager de placer le honeypot (étape 2) et le rejet de validation (400) AVANT la garde config 500. Bénéfice : l'API reste testable/observable même sans Resend, et un bot rempli reçoit 200 silencieux plutôt qu'un 500 qui le renseigne. Non bloquant (l'ordre actuel est sûr, jamais d'exposition), mais améliore la robustesse de diagnostic.
- **P3 [code, optionnel] — GET → 404 au lieu de 405** : Pages Functions ne déclare pas de handler GET → 404 générique. Un `onRequestGet` renvoyant 405 + `Allow: POST, OPTIONS` serait plus correct sémantiquement. Cosmétique.

Le message d'erreur 500 affiché est **mot pour mot** celui de ux-writing-guide v1.2 (n° tel inclus) — conforme.

---

## 4. Axe-core LIVE — 3 pages clés `[LIVE]`

axe-core via `@axe-core/playwright`, tags `wcag2a/aa + wcag21a/aa + wcag22aa`, sur la page rendue réelle :

| Page | Violations | Passes | Incomplete |
|------|-----------|--------|------------|
| `/` | **0** | 24 | 1 (`color-contrast` ×2) |
| `/realisations/` | **0** | 24 | 0 |
| `/contact/` | **0** | 29 | 0 |

**0 violation A/AA/2.2 sur les 3 pages en live** — confirme le travail a11y (BUG-A11Y-1→4 résolus, skip link, target-size, contrastes tokens). Double validation : Lighthouse a11y = 100 ET axe = 0 violation, deux moteurs indépendants concordants.

**Incomplete (`color-contrast` ×2 sur `/`)** : H1 et sous-titre du hero — *« background color could not be determined due to a background gradient »*. axe ne calcule pas le contraste d'un texte sur photo + gradient. **Vérification manuelle obligatoire (lecture visuelle, §5)** : texte blanc `sand-100` sur la zone sombre du hero → lisible, hiérarchie nette. PASS manuel. Pas un échec.

`label-content-name-mismatch` (Lighthouse, A11y, **poids 0** = informatif, n'affecte pas le 100) : les chips de filtre `/realisations/` ont un `aria-label` (« Filtrer : spas et saunas ») qui ne contient pas le texte visible (« Spas & saunas »). **P2 [code]** : pour la commande vocale (WCAG 2.5.3 Label in Name), le nom accessible devrait inclure le libellé visible. Correctif : préfixer/inclure le texte visible dans l'aria-label, ou retirer le préfixe « Filtrer : ». Non bloquant, mais à corriger pour la conformité vocale.

---

## 5. Pages d'erreur & redirects `[LIVE]`

### 404
- `/url-inexistante-test-404/` → **HTTP 404** (vrai statut, pas 200 soft-404). PASS.
- Page **stylée et habillée** : title « Aquasystem — L'extérieur à la hauteur de votre propriété », H1 « Cette page n'existe pas. », header + nav + footer présents, lien « ← Retour à l'accueil » + 2 CTA (« Voir les réalisations » / « Parlez-nous de votre projet »). Lecture visuelle (`live-404.png`) : PROPRE, BRAND-ALIGNED, hiérarchie claire, copy ux-writing §7. PASS.
  - *Micro-observation P3* : à 1280 px les 2 boutons CTA passent sur 2 lignes (texte un peu serré) — esthétique, non bloquant.

### Redirects
- **Trailing slash** : `/realisations`, `/jardins-paysage`, `/piscines-bien-etre`, `/notre-approche`, `/la-maison`, `/prescripteurs` → **308** vers la version avec slash. `/contact` → 308 `/contact/`. Cohérent avec `trailingSlash:true`. PASS.
- `/index.html` → 308 `/`. PASS.
- **`_redirects` 301 (anciennes URLs aqua-system.fr)** : `/piscines`, `/entretien`, `/piscine` → **404**. Les 10 mappings 301 sont livrés **commentés** dans `public/_redirects` (handoff @fullstack D-12 : à activer à la bascule de domaine). **Par design**, pas un bug — mais **à décommenter avant/à la bascule** pour ne pas perdre l'historique SEO d'aqua-system.fr. **P1 [config] au moment de la bascule domaine**.

### Lecture visuelle hero (`live-home-hero.png`) — critères Thomas
PRO ✓ · BEAU ✓ · BRAND-ALIGNED ✓ (sobre premium, photo piscine/forêt, or discret) · PROPRE ✓ · ALIGNÉ ✓ · AÉRÉ ✓ · HIÉRARCHIE ✓ (H1 serif blanc dominant + sous-titre + 2 CTA) · ACCESSIBLE ✓ (texte blanc lisible sur zone sombre). Aucun texte tronqué, aucun chevauchement, aucun « undefined/null ». PASS.

---

## 6. SEO technique — observations live `[LIVE]`

- **sitemap.xml** : 200, **10 URLs** (fiches draft exclues, conforme noindex). PASS.
- **robots.txt** : 200, AI crawlers (GPTBot/ClaudeBot/anthropic-ai/PerplexityBot/Google-Extended) autorisés, Bytespider bloqué, `/contact/merci` Disallow. PASS. *Note : `Disallow: /api/` et `/dashboard/` non listés — pas de /dashboard (site vitrine), /api non sensible (POST-only). Acceptable.*
- **canonical / og:url / sitemap pointent vers `https://www.aquasystem.fr/`** (= `NEXT_PUBLIC_SITE_URL`, futur domaine de prod), **pas vers `aquasystem.pages.dev`**.
  - **Si aquasystem.fr est bien le domaine de lancement** : correct par design (le preview ne cannibalise pas l'index, prod pré-configurée). RAS.
  - **Si aquasystem.pages.dev reste l'URL publique** : alors tous les canonicals pointent vers un domaine qui 404 aujourd'hui → **P1 SEO**. À trancher à la bascule domaine.
  - Verdict : **[À CONFIRMER domaine de prod]** — config, pas bug. Le `Sitemap:` de robots.txt référence aussi `www.aquasystem.fr/sitemap.xml`.

---

## 7. Synthèse correctifs priorisés

| ID | Sévérité | Dim. | Écart (mesure live) | Correctif | Type |
|----|----------|------|---------------------|-----------|------|
| C-1 | **P0** | Robustesse | Formulaire : tout → 500, aucun email ne part, honeypot/400/429 inatteignables | Configurer `RESEND_API_KEY` + `CONTACT_EMAIL_TO/FROM` + binding `RATE_LIMIT_KV` (+seuils), puis re-jouer cas 1-4 | **config Cloudflare** `[BLOQUÉ Resend]` |
| C-2 | P1 | SEO | canonical/og/sitemap → `www.aquasystem.fr` (404 aujourd'hui) | Confirmer domaine de prod ; aligner `NEXT_PUBLIC_SITE_URL` à la bascule | **config** (à confirmer) |
| C-3 | P1 | SEO | `_redirects` 301 anciennes URLs commentés → /piscines 404 | Décommenter les 10× 301 à la bascule domaine | **config** Cloudflare |
| C-4 | P2 | Perf | LCP 2,6 s mobile sur `/` et `/realisations/` (> 2,5 s, audit 0,87) | Préchargement hero / AVIF / qualité ; gain marginal | **code** |
| C-5 | P2 | Perf | Hero desktop 1280w = 307 KB > budget 200 KB | Ré-encoder AVIF ou baisser qualité WebP desktop | **code** |
| C-6 | P2 | A11y | Chips filtre : aria-label ≠ texte visible (Label in Name 2.5.3) | Inclure le libellé visible dans l'aria-label | **code** |
| C-7 | P2 | Robustesse | Ordre des gardes : config 500 avant honeypot/validation → API non observable sans Resend | Placer honeypot + 400 validation avant la garde config | **code** |
| C-8 | P3 | Robustesse | GET /api/contact → 404 au lieu de 405 | `onRequestGet` → 405 + `Allow` | **code** (cosmétique) |
| C-9 | P3 | Sécurité | CORS `Access-Control-Allow-Origin: *` | Restreindre à l'origine du domaine post-bascule | **config** |
| C-10 | P3 | UI | 404 : CTA sur 2 lignes à 1280 px | Élargir boutons / réduire texte | **code** (cosmétique) |

**Aucun P0 de code.** Le seul P0 est une config (Resend) qui conditionne le GO réel. Les P1 sont des actions de bascule domaine. Le reste est du polish.

### Scores Lighthouse bruts (résumé)
```
PAGE            PERF  A11Y  BP   SEO   LCP    CLS    TBT
/                96   100  100  100   2.6s   0      50ms
/realisations/   97   100  100  100   2.6s   0.006  20ms
/contact/        99   100  100  100   2.0s   0      20ms
```
JSON complets : `/tmp/lh-home.json`, `/tmp/lh-real.json`, `/tmp/lh-contact.json` (LH v13.4.0, mobile/simulate).
Captures lues : `live-home-hero.png`, `live-404.png` (ce dossier).
