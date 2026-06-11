# Infrastructure — Site vitrine umbrella (Aquasystem [PROVISOIRE])

> Produit par @infrastructure — 2026-06-11. Enrichi Phase 2 (finalisation) — 2026-06-11.
> Stack VERROUILLÉE : Next.js export statique + Cloudflare Pages + 1 Pages Function.
> Référence dev : `docs/dev-decisions.md` (justification des choix).

**Sommaire** : §1 Architecture · §2 Déploiement Pages · §3 Umami · §4 Resend ·
§5 Sécurité · §6 Variables d'env · §7 Monitoring & alerting · §8 Actions fondateur ·
§9 Sauvegarde · **§10 Audit de performance** · **§11 Runbook de déploiement & rollback**.

---

## 1. Architecture (schéma textuel)

```
                          ┌──────────────────────────────┐
   Visiteur (navigateur)  │  GitHub (thomasissa-png/      │
            │             │  Aquasystem)                 │
            │  HTTPS       │  branche main = production    │
            ▼             └───────────────┬──────────────┘
   ┌─────────────────────┐                │ build auto sur push/merge
   │  Cloudflare Pages    │◄───────────────┘ (npx next build → out/)
   │  ─ assets statiques  │
   │    (out/, AVIF/WebP) │   ┌──────────────────────────────────────┐
   │  ─ _headers (CSP...) │   │  Pages Function  /api/contact          │
   │  ─ Pages Function ───┼──►│  ─ honeypot + rate limit (KV)          │
   └─────────┬───────────┘   │  ─ envoi email  ───► Resend ──► boîte  │
             │               └──────────────────────────────────────┘   contact@aqua-system.fr
             │  script afterInteractive
             ▼
   ┌─────────────────────┐
   │  Umami (analytics)   │  self-hosted VPS fondateur  OU  Umami Cloud
   │  events E-01..E-09   │  (exempté CNIL, sans cookie)
   └─────────────────────┘
```

**Principes** :
- Tout est statique sauf `POST /api/contact` (seul code serveur — Pages Function, hors build Next).
- Aucune BDD. Aucun état serveur hormis le compteur KV de rate limiting (TTL court).
- Storage : aucun fichier uploadé en V1 (formulaire texte only).

---

## 2. Déploiement Cloudflare Pages — pas-à-pas

> Prérequis : compte Cloudflare, repo GitHub connecté. **À faire par le fondateur** (ou @infrastructure avec un token scopé).

1. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.**
2. Sélectionner le repo `thomasissa-png/Aquasystem`.
3. **Build configuration** :
   - Framework preset : `Next.js (Static HTML Export)` (ou `None`).
   - Build command : `npx next build`
   - Build output directory : `out`
   - Root directory : `/` (laisser vide)
   - Node version : variable d'env `NODE_VERSION = 20`
4. **Production branch** : `main`. Les autres branches génèrent des **preview deployments** automatiques (1 URL par PR).
5. **Variables d'environnement** (Settings → Environment variables) — voir §6. Les saisir pour `Production` ET `Preview`.
6. **KV namespace** (rate limiting) : Workers & Pages → KV → Create namespace `aquasystem-rate-limit`. Puis Pages → Settings → Functions → **KV namespace bindings** → ajouter binding `RATE_LIMIT_KV` → ce namespace.
7. **Domaine** : Settings → Custom domains → ajouter le domaine ombrelle final (après décision naming). DNS géré chez Cloudflare. **Ne jamais toucher au DNS root sans validation fondateur.**
8. Déclencher un déploiement (push sur `main` ou bouton "Retry deployment").

**Auto-deploy GitHub Actions (optionnel, V1.1)** : non activé. Le déploiement natif Pages↔GitHub suffit. Si on veut piloter le deploy depuis le CI (`cloudflare/wrangler-action`), il faudra un token Cloudflare scopé au projet en secret GitHub `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`. **Tokens non configurés à ce jour — action fondateur requise.**

---

## 3. Umami (analytics) — self-hosted VPS vs Umami Cloud

Décision validée : Umami (exempté CNIL, events custom). Reste à choisir l'hébergement.

| Critère | Self-hosted (VPS fondateur) | Umami Cloud |
|---|---|---|
| Coût | 0 € (VPS déjà payé) | 0 € jusqu'à 10k events/mois puis ~20 $/mois |
| Maintenance | Docker + Postgres + reverse proxy + MAJ à gérer | Aucune |
| Données UE | Selon localisation du VPS | Serveurs EU disponibles |
| Mise en route | ~2-4h | ~15 min |

**Recommandation** : pour < 10k events/mois (trafic V1), **Umami Cloud free tier** est le meilleur ratio effort/valeur (zéro maintenance, exempté CNIL identique). Le VPS reste l'option 0 € absolue si le fondateur veut tout maîtriser.

**Self-hosted — prérequis** (si retenu) :
- Docker + docker-compose sur le VPS.
- `docker-compose.yml` officiel Umami (image `ghcr.io/umami-software/umami:postgresql-latest` + service `postgres`).
- Reverse proxy (Caddy/Nginx/Traefik) avec TLS Let's Encrypt sur un sous-domaine `analytics.<domaine>.fr`.
- Créer le site dans Umami → récupérer le `website-id` (UUID) → variable `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- `NEXT_PUBLIC_UMAMI_URL = https://analytics.<domaine>.fr/script.js`.
- Mettre à jour le `connect-src`/`script-src` de `public/_headers` (CSP) avec ce domaine.

---

## 4. Resend (email du formulaire) — vérification domaine DNS

[HYPOTHÈSE à confirmer] Service email = Resend (100 emails/jour gratuits, API simple, compatible Workers).

Étapes (dashboard Resend) :
1. Créer un compte, **Add Domain** → saisir le domaine d'envoi (ex: `<domaine-ombrelle>.fr`).
2. Resend fournit des enregistrements DNS à créer chez Cloudflare DNS :
   - **SPF** : TXT `@` → `v=spf1 include:resend.com ~all` (ou MX/CNAME selon Resend).
   - **DKIM** : CNAME(s) `resend._domainkey...` fournis par Resend.
   - **DMARC** (recommandé) : TXT `_dmarc` → `v=DMARC1; p=none; rua=mailto:contact@aqua-system.fr`.
3. Vérifier le domaine dans Resend (statut "Verified").
4. Créer une **API key** (scope sending) → secret Cloudflare `RESEND_API_KEY`.
5. `CONTACT_EMAIL_FROM = noreply@<domaine-ombrelle>.fr` (domaine vérifié), `CONTACT_EMAIL_TO = contact@aqua-system.fr`.
6. **Test délivrance** : envoyer un lead test, vérifier réception + score (mail-tester.com cible > 8/10). Cibles : délivrance > 95%, bounces < 5%, plaintes < 0,1%.

> Alternative si Resend non retenu : SendGrid (free tier 100/jour aussi). Le stub `sendEmail` de `functions/api/contact.ts` est à adapter (endpoint + payload).

---

## 5. Sécurité — revue finale des en-têtes

Fichier `public/_headers` (copié tel quel dans `out/` au build — **vérifié build Phase 2 :
`out/_headers` contient bien les en-têtes ET les 4 règles Cache-Control**).

### 5.1 En-têtes de sécurité (bloc `/*`)
| En-tête | Valeur | Statut |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'` ; `script-src 'self' 'unsafe-inline' https://*.umami.is` ; `style-src 'self' 'unsafe-inline'` ; `img-src 'self' data: https:` ; `connect-src 'self' https://*.umami.is https://api.resend.com` ; `frame-ancestors 'none'` ; `form-action 'self'` ; `object-src 'none'` ; `base-uri 'self'` | [x] |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (2 ans) | [x] |
| `X-Frame-Options` | `DENY` (+ `frame-ancestors 'none'` en redondance CSP) | [x] |
| `X-Content-Type-Options` | `nosniff` | [x] |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | [x] |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` (tout désactivé) | [x] |

**Revue CSP `script-src`** : la seule source externe autorisée est **`https://*.umami.is`**
(script Umami). Aucun autre script tiers (pas de Google, pas de CDN externe — les fonts
sont auto-hébergées via `next/font`). `'unsafe-inline'` sur `script-src` est requis par le
runtime Next (script d'hydratation inline) ; `'unsafe-eval'` est **absent** (bien).
`'unsafe-inline'` sur `style-src` est requis par Tailwind/Next (styles inline runtime).
> **Cas Umami self-hosted** : si le fondateur héberge Umami sur `analytics.<domaine>.fr`
> au lieu d'Umami Cloud, remplacer `https://*.umami.is` par ce domaine exact dans
> **`script-src` ET `connect-src`** (les deux). Si Umami Cloud EU : garder `*.umami.is`.

### 5.2 En-têtes de cache (ajout Phase 2)
Corrigé en Phase 2 (manquait avant) — voir §10.4 pour l'impact perf :
- `/_next/static/*` → `public, max-age=31536000, immutable` (fingerprintés, jamais revalidés).
- `/images/*` → `public, max-age=2592000, stale-while-revalidate=86400` (30 j + revalidation différée).
- `/fonts/*` → `public, max-age=31536000, immutable`.
- `/*.html` → `public, max-age=0, must-revalidate` (toujours frais, le CDN edge gère la diffusion).

### 5.3 CORS de la Function
La Pages Function renvoie aujourd'hui `Access-Control-Allow-Origin: *` (squelette).
- **Sans impact V1** : le formulaire est appelé depuis la **même origine** que le site →
  le `*` ne crée pas de faille exploitable ici (pas de cookie/credential, pas de donnée
  sensible renvoyée). Le risque réel est qu'un tiers poste sur la Function depuis un autre
  site — mitigé par le honeypot + rate limit KV.
- **TODO post-naming (action fondateur / @infrastructure)** : remplacer `*` par le domaine
  de prod exact dans `CORS_HEADERS` de `functions/api/contact.ts`
  (`'Access-Control-Allow-Origin': 'https://<domaine-final>'`). À faire en même temps que
  la bascule du custom domain (§11, étape 9). Modification d'une ligne, re-déploiement Pages.

### 5.4 Vérifications repo
- **Aucun secret en clair commité** (vérifié Phase 2 : Grep `re_…`, `sk-…`, `api_key=…`,
  `RESEND_API_KEY=re_` → 0 occurrence ; aucun `.env`/`.env.local` tracké par Git).
  `.env.example` ne contient que des placeholders vides + URLs publiques d'obtention.
- **Validation post-déploiement** : `securityheaders.com` (cible **A/A+**) + `observatory.mozilla.org`.

---

## 6. Variables d'environnement (sans valeur)

| Variable | Portée | Type | Où la saisir |
|---|---|---|---|
| `RESEND_API_KEY` | Function | Secret | Cloudflare Pages env (+ GitHub secret si wrangler) |
| `CONTACT_EMAIL_TO` | Function | Config | `contact@aqua-system.fr` |
| `CONTACT_EMAIL_FROM` | Function | Config | `noreply@<domaine>.fr` (vérifié Resend) |
| `RATE_LIMIT_WINDOW_SECONDS` | Function | Config | défaut `3600` |
| `RATE_LIMIT_MAX` | Function | Config | défaut `5` |
| `RATE_LIMIT_KV` (binding) | Function | KV binding | Settings → Functions → KV bindings |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Client | Public | UUID du site Umami |
| `NEXT_PUBLIC_UMAMI_URL` | Client | Public | URL du script Umami |
| `NEXT_PUBLIC_SITE_URL` | Client | Public | URL prod sans slash final |
| `NODE_VERSION` | Build | Config | `20` |

Modèle documenté : `.env.example` (racine). **Aucune valeur secrète n'est commitée.**

---

## 7. Monitoring & alerting V1 (opérationnel, 0 €)

Quatre couches, toutes gratuites/incluses. Objectif : détecter une panne en < 5 min
et ne JAMAIS perdre silencieusement un lead (le formulaire = NSM).

### 7.1 Trafic / pageviews de secours — Cloudflare Web Analytics (natif)
- Activer **Cloudflare Dashboard → le projet Pages → Web Analytics → Enable**. Aucun
  script à ajouter (injection automatique côté edge), **sans cookie, exempté CNIL**
  (confirmé @legal). Sert de **filet de secours** si Umami tombe ou n'est pas encore
  configuré : on garde toujours les pageviews. Umami reste la source des events custom (E-01…E-09).
- Coût 0 €, illimité sur Pages.

### 7.2 Disponibilité — UptimeRobot (free)
- Compte gratuit (50 monitors). Créer **2 monitors HTTP(s)** :
  1. `https://<domaine>/` — intervalle **5 min**, alerte si down (keyword optionnel :
     vérifier la présence du H1 « L'extérieur à la hauteur »).
  2. `https://<domaine>/api/contact` en méthode **OPTIONS** (attendu **204**) — vérifie
     que la Function répond (pas seulement le statique). Intervalle 5 min.
- **Alerte e-mail au fondateur** (contact@aqua-system.fr) si down > 1 min. Pas de SMS
  (payant) en V1 ; l'e-mail suffit pour un site vitrine.

### 7.3 Échec de build / CI — notification GitHub native
- **GitHub → Settings → Notifications → Actions** : activer « Send notifications for
  failed workflows only » sur le repo. Le fondateur reçoit un e-mail si la CI
  (`quality` / `tests` / `e2e`) échoue sur `main` → un déploiement Pages ne part jamais
  sur un build cassé sans alerte. Aucun coût, aucun outil tiers.
- Rappel : la CI **bloque déjà** le merge (branche `main` protégée — §8 action #12).

### 7.4 Santé du formulaire — surveillance des 500 (réaliste, sans outil payant)
Le formulaire est le seul point dynamique ; son échec = lead perdu. Stratégie V1 sans
budget :
- **Logs Functions** : la Function émet déjà des `console.error` structurés. Consultables
  en temps réel via **Cloudflare Dashboard → Pages → le projet → Functions → Real-time
  Logs**, ou `wrangler pages deployment tail` en CLI.
- **Symptôme côté UX** : un 500 affiche un message d'erreur explicite + **le téléphone
  en fallback** (01 30 42 26 00) — le lead n'est jamais perdu silencieusement, il a une
  voie de secours.
- **Alerte 500 répétés (manuelle V1)** : Cloudflare Pages n'a pas d'alerte e-mail native
  sur taux d'erreur Functions dans le plan gratuit. Procédure recommandée :
  1. **Rituel hebdomadaire** : ouvrir les Real-time Logs après chaque campagne / pic de
     trafic, vérifier l'absence de `5xx` sur `/api/contact`.
  2. **Signal indirect** : le monitor UptimeRobot 7.2 #2 (OPTIONS → 204) détecte une
     Function totalement KO. Un 500 sur le POST (Resend down, KV indispo) n'est pas vu
     par ce monitor → d'où le rituel manuel.
  3. **Test de bout en bout mensuel** : envoyer un lead test réel (M-1) et vérifier la
     réception. C'est le contrôle le plus fiable de la chaîne complète Function→Resend.
  4. **Upgrade V1.1 (si budget)** : Sentry free (5 000 events/mois) branché dans la
     Function (`captureException` sur le bloc 500) → alerte e-mail/Slack automatique.
     Documenté comme évolution, **non requis V1**.

### 7.5 Délivrabilité e-mail — dashboard Resend
- Surveiller **Resend → Logs / Analytics** : taux de délivrance (cible > 95 %), bounces
  (< 5 %), plaintes (< 0,1 %). Vérifier SPF/DKIM/DMARC « Verified » (§4).
- Contrôle initial : `mail-tester.com` (cible > 8/10) au premier envoi réel (M-1).

### 7.6 Erreurs JS client
- Volume faible + budget 0 € → pas de Sentry client en V1. Les events Umami (taux de
  `form_submission_error`) servent de proxy de santé côté client. Sentry client = même
  upgrade V1.1 que 7.4.

---

## 8. Checklist « actions fondateur » consolidée (à jour Phase 2)

> Vue unique fusionnant infra + findings QA/UX/légal. Rien ici ne bloque le **code**
> (build vert, 113 tests verts) ; ce sont les actions **hors-code** avant mise en ligne
> publique. Classées par bloquant de lancement.

### A. Bloquants CONTENU / LÉGAL (sans quoi on ne publie pas)
| # | Action | Source | Réf |
|---|---|---|---|
| A1 | **Photos de jardins réelles** (Les Terres Essentielles) — actuellement `PhotoPlaceholder` sur les slots jardins, **bloque la mise en ligne** | @ux ux-review.md P0-1 | — |
| A2 | **Droit à l'image** : confirmer par écrit que les réalisations Aqua System publiées (source esprit-piscine.fr) peuvent être réaffichées sur le nouveau site | project-context HYP-04 ; @qa M-7 | §11.4 |
| A3 | **Données de projets réels** pour les fiches réalisations (commune, surface, prestations) — aujourd'hui « fiche en cours de documentation » (zéro invention) | @copywriter site-copy Annexe B | — |
| A4 | **Délai de réponse** affiché dans le copy (placeholder P0 non confirmé) — décider « sous X jours ouvrés » ou retirer la mention | @copywriter Annexe B | — |
| A5 | **Mentions légales** : finaliser une fois l'acquisition LTE actée (gouvernance) — éditeur unique SARL AQUA SYSTEM en attendant | @legal ; project-context Notes | — |

### B. Bloquants INFRA / MISE EN LIGNE
| # | Action | Réf |
|---|---|---|
| B1 | **Naming final → domaine ombrelle** : trancher le nom, **vérifier dispo + déposer le `.fr`**, dépôt **INPI** de la marque | §11.9 |
| B2 | **Connecter le repo GitHub à Cloudflare Pages** (build `npx next build`, output `out`, `NODE_VERSION=20`) | §2, §11.1 |
| B3 | **Créer le namespace KV** `aquasystem-rate-limit` + binding `RATE_LIMIT_KV` | §2.6, §11.2 |
| B4 | **Compte Resend** + vérifier le domaine d'envoi (SPF, DKIM, DMARC chez Cloudflare DNS) | §4, §11.3 |
| B5 | **Saisir les variables d'env** Production + Preview (Resend, Umami, site URL) | §6, §11.5 |
| B6 | **Choisir l'hébergement Umami** (Cloud recommandé vs VPS) → `website-id` + URL script | §3 |
| B7 | **Configurer le custom domain** Pages + DNS Cloudflare (après B1). **Pas de DNS root sans validation.** | §11.9 |
| B8 | **Restreindre CORS** de la Function au domaine final (1 ligne) ; ajuster CSP si Umami self-host | §5.3 |
| B9 | **DPA Cloudflare** : accepter/archiver l'avenant de traitement des données (RGPD, sous-traitant) | §11.8 |

### C. Bloquants QUALITÉ avant bascule prod
| # | Action | Réf |
|---|---|---|
| C1 | **Tests manuels @qa sur la preview** : M-1 (email Resend réel reçu), M-2 (rate limit KV → 429), M-5 (fallback sans JS) | §11.10, qa-strategy §5 |
| C2 | **Test délivrabilité** : mail-tester.com > 8/10 + vérifier réception boîte fondateur | §4, §7.5 |
| C3 | **Activer la protection de branche `main`** (PR obligatoires, CI `quality`/`tests`/`e2e` requise) | — |

### D. Post-launch (non bloquant J0)
| # | Action | Réf |
|---|---|---|
| D1 | **UptimeRobot** : 2 monitors (`/` et `/api/contact` OPTIONS), alerte e-mail fondateur | §7.2 |
| D2 | **Cloudflare Web Analytics** : activer (pageviews de secours) | §7.1 |
| D3 | **Notifications GitHub Actions** : activer l'alerte sur workflow en échec | §7.3 |
| D4 | **Validation sécurité** : securityheaders.com (cible A/A+) | §5.4 |
| D5 | (Optionnel) **Token Cloudflare scopé + secrets GitHub** si deploy piloté par wrangler-action | §2 |
| D6 | (Optionnel V1.1) **Sentry free** branché sur le 500 de la Function (alerte 5xx auto) | §7.4 |
| D7 | (Optionnel V1.1) **Resize hero mobile** (srcset manuel) si LCP mobile mesuré > 2 s | §10.3 |

---

## 9. Sauvegarde / restauration

- **Code** : Git (GitHub) = source de vérité. Pas de backup additionnel requis.
- **Contenu portfolio** : JSON versionné dans le repo (pas de CMS V1) → sauvegardé par Git.
- **Leads** : aucun stockage (email uniquement). Pas de BDD à sauvegarder. La boîte `contact@aqua-system.fr` est la persistance des leads → sauvegarde = politique email du fondateur.
- **Umami** (si self-hosted) : `pg_dump` automatisé du Postgres Umami sur le VPS (cron hebdo, rétention 4 semaines). En Umami Cloud : géré par l'éditeur.

---

## 10. Audit de performance (build réel — `npm run build` Phase 2)

Mesuré sur le build de production réel + analyse de `out/`. Seuils cibles :
**TTI < 2 s · LCP < 2,5 s · INP < 200 ms · CLS < 0,1**.

### 10.1 Poids JavaScript par route (First Load JS — sortie `next build`)
| Route | Page | First Load JS | Budget 130 ko |
|---|---|---|---|
| `/` (home) | 1,04 ko | **113 ko** | PASS |
| `/realisations` | 2,24 ko | **114 ko** | PASS |
| `/prescripteurs` | 469 B | **112 ko** | PASS |
| `/piscines-bien-etre` · `/jardins-paysage` | 3,04 ko | **111 ko** | PASS |
| `/realisations/[slug]` | 2,03 ko | **110 ko** | PASS |
| `/contact` | 6,26 ko | **109 ko** | PASS |
| `/notre-approche` · `/la-maison` | 1,59 ko | **109 ko** | PASS |
| `/contact/merci` | 178 B | **94,2 ko** | PASS |
| `/mentions-legales` · `/politique-confidentialite` | 146 B | **87,4 ko** | PASS |
| **Shared by all** | — | **87,2 ko** (chunks 31,7 + 53,6 + 1,9) | — |

**Verdict JS** : toutes les routes ≤ **114 ko** First Load JS, **bien sous** le budget de
130 ko (référentiel « bundle léger » pour un site statique). Le chunk partagé de 87,2 ko =
runtime React + Next ; rien d'inhabituel. **Aucune action requise sur le JS.**

### 10.2 Poids des pages et des assets
- **HTML** : home 56 ko, pages section ~53-57 ko, réalisations 36 ko, contact 39 ko —
  acceptable (HTML pré-rendu, gzip CDN ramène à ~10-15 ko sur le fil).
- **`_next/static`** : **1,1 Mo** total (chunks + fonts woff2), servi **une fois** puis mis
  en cache 1 an immutable (§5.2).
- **Images portfolio** : **4,4 Mo** au total sur 42 fichiers WebP (14 visuels × 3 tailles
  400w/800w/1280w). Les 1280w pèsent 120-305 ko. **Lazy-load** sur tout le portfolio
  (`loading="lazy"` vérifié dans le HTML) → ces 4,4 Mo ne sont JAMAIS chargés en une fois ;
  seules les images du viewport initial comptent pour le LCP.
- **`out/` total** : 7,4 Mo (dont 4,4 Mo d'images lazy + 1,1 Mo de JS caché).

### 10.3 LCP — calcul sur le hero (élément LCP réel)
Le LCP de chaque page = le **hero full-bleed** (composant `Hero`, image `priority` +
`<link rel=preload as=image fetchpriority=high>` — **vérifié présent dans `out/index.html`**).

- **Home** : hero = `piscine-debordement-foret-1280w.webp` = **300 ko**.
- ⚠️ **Limite identifiée** : `next.config.mjs` impose `images.unoptimized: true` (obligatoire
  en export statique). Conséquence : **`next/image` ne génère PAS de `srcset`** malgré
  `sizes="100vw"`. Le HTML rendu sert **le 1280w (300 ko) sur TOUS les écrans, mobile inclus**
  (vérifié : `<img … src="…-1280w.webp">`, aucun `srcset`).

**Estimation LCP mobile (Slow-4G, ~1,6 Mbps utile, throttling Lighthouse mobile)** :
| Étape | Hero actuel 300 ko | Hero 800w (121 ko) — reco |
|---|---|---|
| Transfert image | ~1,5 s | ~0,6 s |
| + RTT preload + decode WebP | ~0,4 s | ~0,3 s |
| **LCP estimé** | **~1,9-2,2 s** | **~0,9-1,1 s** |

→ **Sous le seuil 2,5 s, mais marge faible** sur mobile en réseau dégradé. Sur desktop
(câble) le 300 ko reste < 1 s : PASS confortable.

**Recommandation P1 (D7, non bloquant) — `resize hero mobile`** : faire servir le **800w
(121 ko) en dessous de 768px** au lieu du 1280w. Comme `next/image` ne produit pas de
srcset en mode `unoptimized`, l'option propre est un **`<picture>` manuel** dans le composant
`Hero` :
```html
<picture>
  <source media="(max-width: 768px)" srcset="…-800w.webp" type="image/webp" />
  <img src="…-1280w.webp" fetchpriority="high" … />
</picture>
```
Les 3 tailles (400w/800w/1280w) **existent déjà** dans `public/images/` → aucun ré-encodage.
Cette modification touche `src/components/sections/Hero.tsx` (hors périmètre de la présente
finalisation infra) → **handoff @fullstack**. Gain : LCP mobile divisé par ~2, et marge LCP
confortable. À implémenter si une mesure Lighthouse mobile réelle (job CI `lighthouse` à
décommenter post-launch) dépasse 2 s.

**Preload déjà optimal** : le hero est préchargé (`fetchpriority=high`) — ne pas ajouter de
preload supplémentaire (les autres images doivent rester lazy).

### 10.4 Cache — corrigé en Phase 2
Avant : `public/_headers` ne définissait **aucun** `Cache-Control` → les assets fingerprintés
`/_next/static` et les images étaient soumis au cache par défaut de Cloudflare (court,
revalidation fréquente) = gaspillage de bande passante et de TTI en visite répétée.
**Corrigé** (§5.2) : `immutable` 1 an sur `/_next/static` et `/fonts`, 30 j +
`stale-while-revalidate` sur `/images`. **Vérifié** : `out/_headers` contient bien les 4
règles après build. Impact : visites répétées quasi instantanées (assets depuis le cache),
TTI réduit, charge CDN minimale.

### 10.5 CLS et INP
- **CLS** : le hero utilise `next/image` `fill` dans un conteneur à hauteur fixe (`min-h-[…vh]`)
  → pas de reflow à l'arrivée de l'image. Fonts via `next/font` (woff2 préchargés, `font-display`
  géré par Next) → pas de FOIT/FOUT déstabilisant. CLS attendu **< 0,1**. À confirmer par
  Lighthouse réel (test manuel M-3 / job CI lighthouse post-launch).
- **INP** : site quasi sans JS interactif (filtres portfolio en HTML/CSS first, formulaire
  validé en JS léger). Aucune librairie lourde. INP attendu **< 200 ms**.

### 10.6 Synthèse budgets perf
| Métrique | Cible | Estimé build réel | Statut |
|---|---|---|---|
| First Load JS (max route) | < 130 ko | 114 ko | **PASS** |
| LCP desktop | < 2,5 s | < 1 s | **PASS** |
| LCP mobile (Slow-4G) | < 2,5 s | ~1,9-2,2 s | **PASS (marge faible → D7)** |
| CLS | < 0,1 | ~0 (hauteurs réservées) | **PASS attendu** |
| INP | < 200 ms | faible (JS minimal) | **PASS attendu** |
| Cache assets | immutable | corrigé Phase 2 | **PASS** |

> Les estimations LCP/CLS/INP sont des **calculs**, pas des mesures Lighthouse réelles
> (job `lighthouse` commenté dans la CI jusqu'au déploiement). **Mesure obligatoire en
> preview** (M-3) avant bascule prod ; décommenter le job `lighthouse` (desktop + mobile
> 4×CPU/3G) post-launch pour le suivi continu.

---

## 11. Runbook de déploiement & rollback (pas-à-pas, exécutable non-expert)

> Public : fondateur ou @orchestrator. Ordre **strict**. Chaque étape a un critère de
> validation (« ✓ Vérifier »). Ne pas passer à la suivante tant que ✓ n'est pas vert.

### Prérequis
- [ ] Compte **Cloudflare** (gratuit).
- [ ] Compte **GitHub** avec accès au repo `thomasissa-png/Aquasystem`.
- [ ] Compte **Resend** (gratuit, 100 e-mails/j).
- [ ] **Naming final tranché** (sinon : déployer d'abord sur l'URL `*.pages.dev` de Pages,
      ajouter le custom domain plus tard — étape 9 différée).

### Étape 1 — Créer le projet Cloudflare Pages
1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Autoriser GitHub, sélectionner `thomasissa-png/Aquasystem`.
3. **Build configuration** :
   - Framework preset : `Next.js (Static HTML Export)` (ou `None`).
   - **Build command** : `npx next build`
   - **Build output directory** : `out`
   - Root directory : laisser vide.
4. Variables d'environnement de build : ajouter **`NODE_VERSION` = `20`**.
5. **Production branch** : `main`.
6. **Ne pas encore lancer** le déploiement → d'abord les bindings/secrets (étapes 2-5).
- ✓ Vérifier : le projet apparaît dans Workers & Pages, statut « not deployed ».

### Étape 2 — Créer le KV namespace + binding
1. **Workers & Pages → KV → Create namespace** : nom `aquasystem-rate-limit`.
2. Projet Pages → **Settings → Functions → KV namespace bindings → Add binding** :
   variable **`RATE_LIMIT_KV`** → pointer sur `aquasystem-rate-limit`.
3. L'ajouter pour **Production ET Preview**.
- ✓ Vérifier : binding `RATE_LIMIT_KV` listé sous les deux environnements.
- ℹ️ Si le binding manque, le rate limit est **fail-open** (la Function laisse passer sans
  bloquer — vérifié dans le code) : le formulaire marche quand même, mais sans anti-flood.

### Étape 3 — Resend : domaine + SPF/DKIM/DMARC
1. Resend → **Add Domain** → saisir le domaine d'envoi (ex. `<domaine-ombrelle>.fr`).
2. Resend affiche des enregistrements DNS. Les créer dans **Cloudflare → DNS** :
   - **SPF** (TXT), **DKIM** (CNAME), **DMARC** (TXT
     `v=DMARC1; p=none; rua=mailto:contact@aqua-system.fr`).
3. Dans Resend, cliquer **Verify** → attendre le statut **« Verified »** (propagation DNS
   quelques min à 1 h).
4. Resend → **API Keys → Create** (scope *Sending*) → copier la clé `re_…`.
- ✓ Vérifier : domaine « Verified » dans Resend ; clé `re_…` en main (à coller en étape 5,
  **jamais dans le repo**).

### Étape 4 — Umami (analytics)
1. Choisir : **Umami Cloud** (recommandé, EU, 0 € < 10k events) ou self-host VPS (§3).
2. Créer le site → récupérer le **`website-id`** (UUID) et l'**URL du script**.
- ✓ Vérifier : `website-id` + URL script en main.

### Étape 5 — Variables d'environnement (Pages → Settings → Environment variables)
Saisir pour **Production ET Preview** (voir §6 pour la liste complète) :
| Variable | Valeur | Secret ? |
|---|---|---|
| `RESEND_API_KEY` | clé `re_…` (étape 3) | **Oui (Encrypt)** |
| `CONTACT_EMAIL_TO` | `contact@aqua-system.fr` | non |
| `CONTACT_EMAIL_FROM` | `noreply@<domaine>.fr` (domaine vérifié) | non |
| `RATE_LIMIT_WINDOW_SECONDS` | `3600` | non |
| `RATE_LIMIT_MAX` | `5` | non |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | UUID (étape 4) | non |
| `NEXT_PUBLIC_UMAMI_URL` | URL script (étape 4) | non |
| `NEXT_PUBLIC_SITE_URL` | URL prod sans slash final | non |
- ✓ Vérifier : `RESEND_API_KEY` marquée « Encrypted » ; toutes présentes en Prod + Preview.

### Étape 6 — Premier déploiement PREVIEW
1. Pousser sur une branche (ex. `preview-launch`) **ou** ouvrir une PR → Pages génère
   automatiquement un **déploiement preview** (`https://<hash>.<projet>.pages.dev`).
2. Attendre le build vert (Pages → Deployments).
- ✓ Vérifier : build « Success », URL preview accessible, le site s'affiche.

### Étape 7 — Tests manuels @qa sur la PREVIEW (gate qualité)
Exécuter sur l'URL preview (qa-strategy §5) — **bloquant avant prod** :
- [ ] **M-1** : envoyer un vrai lead via le formulaire → vérifier la **réception de l'e-mail**
      dans la boîte fondateur (sujet `[SITE]…commune`, reply-to, corps lisible).
- [ ] **M-2** : envoyer **6 requêtes en < 1 h** → la 6e doit renvoyer **429** + message exact
      (rate limit KV réel).
- [ ] **M-5** : **désactiver JavaScript** dans le navigateur → soumettre le formulaire →
      redirection `303` vers `/contact/merci` (fallback no-JS).
- ✓ Vérifier : M-1 reçu, M-2 = 429, M-5 = merci. Si un échoue → corriger **avant** prod.
- ℹ️ Recommandé en complément : **M-3** Lighthouse mobile sur l'URL preview (LCP < 2,5 s,
  cf. §10.3) ; mail-tester.com > 8/10.

### Étape 8 — DPA Cloudflare (conformité RGPD)
1. Cloudflare → **Account Home → Members/Configurations → Data Processing Addendum** (ou
   via le support/legal). **Accepter et archiver** le DPA (Cloudflare = sous-traitant des
   données du formulaire, encadré DPF EU-US — cf. @legal legal-audit.md).
- ✓ Vérifier : DPA accepté/archivé. (Idem côté Resend et Umami : confirmer leurs DPA.)

### Étape 9 — Domaine + DNS (après naming final) + CORS
1. Pages → **Custom domains → Set up a custom domain** → saisir le domaine ombrelle.
2. Cloudflare gère les enregistrements DNS automatiquement (domaine sur Cloudflare).
   **Ne jamais modifier le DNS root sans validation fondateur.**
3. **Restreindre le CORS** : dans `functions/api/contact.ts`, remplacer
   `'Access-Control-Allow-Origin': '*'` par le domaine final, commit + push (déclenche un
   nouveau déploiement). Ajuster la CSP si Umami self-host (§5.1).
- ✓ Vérifier : le domaine résout en HTTPS ; certificat actif ; formulaire OK depuis le domaine.

### Étape 10 — Bascule PRODUCTION
1. **Merger** la branche validée dans `main` (PR → merge) → Pages déclenche le **déploiement
   de production** automatiquement.
2. Attendre le build vert.
- ✓ Vérifier : déploiement prod « Success » + « Active » ; le domaine sert la nouvelle version ;
  refaire un **M-1 rapide** en prod (1 lead test réel reçu).

### Étape 11 — Activer le monitoring (post-bascule, cf. §7)
- [ ] UptimeRobot : 2 monitors (`/` + `/api/contact` OPTIONS).
- [ ] Cloudflare Web Analytics : Enable.
- [ ] GitHub Actions : notifications d'échec.
- [ ] securityheaders.com : viser A/A+.

### Procédure de ROLLBACK (en cas de régression en prod)
Cloudflare Pages conserve **tous** les déploiements précédents → rollback **natif, instantané,
sans rebuild** :
1. Cloudflare → projet Pages → **Deployments**.
2. Repérer le **dernier déploiement sain** (celui d'avant l'incident).
3. Menu **⋯ → Rollback to this deployment** (ou « Retry / Manage deployment » → définir
   comme production).
4. La prod bascule **immédiatement** sur ce build (les assets sont déjà sur le CDN).
- ✓ Vérifier : le domaine sert à nouveau la version saine ; refaire M-1.
- **Puis** : corriger la cause sur une branche, re-tester en preview (étape 6-7) avant de
  re-merger sur `main`. **Ne jamais re-merger un fix non testé en preview.**
- ℹ️ Le rollback ne touche **pas** les variables d'env ni les bindings KV (persistants au
  niveau projet) → un rollback de code n'affecte pas les secrets.
