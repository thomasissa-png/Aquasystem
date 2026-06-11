# Infrastructure — Site vitrine umbrella (Aquasystem [PROVISOIRE])

> Produit par @infrastructure — 2026-06-11
> Stack VERROUILLÉE : Next.js export statique + Cloudflare Pages + 1 Pages Function.
> Référence dev : `docs/dev-decisions.md` (justification des choix).

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

## 5. Sécurité — checklist headers

Fichier `public/_headers` (copié tel quel dans `out/` au build — vérifié). Couvre :

- [x] `Content-Security-Policy` restrictive (default-src self ; script-src self + Umami ; object-src none ; frame-ancestors none ; form-action self).
- [x] `Strict-Transport-Security` (HSTS 2 ans + preload).
- [x] `X-Frame-Options: DENY` + `frame-ancestors 'none'`.
- [x] `X-Content-Type-Options: nosniff`.
- [x] `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] `Permissions-Policy` (caméra/micro/géoloc désactivés).

**Action requise après choix du domaine Umami** : remplacer `https://*.umami.is` par le domaine self-hosted dans `script-src` et `connect-src`. **Valider sur securityheaders.com (cible A) après mise en ligne.**

CORS : la Pages Function renvoie `Access-Control-Allow-Origin: *` (squelette). **À restreindre au domaine de production** une fois connu.

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

## 7. Monitoring V1 minimal

- **Cloudflare Analytics intégré** : trafic/erreurs Pages + observabilité Functions (logs `POST /api/contact`) — natif, gratuit.
- **Uptime externe** : UptimeRobot (free) — check HTTP sur `/` toutes les 5 min, alerte email si down > 1 min. Ajouter un check sur `/api/contact` (OPTIONS → 204) optionnel.
- **Email délivrabilité** : surveiller le dashboard Resend (bounces, plaintes).
- **Erreurs Function** : Cloudflare Workers Logs. Sentry différé (budget 0 € — `console.error` structuré suffit en V1 ; le risque "formulaire échoue silencieusement" est couvert par le 502/500 explicite + fallback téléphone affiché côté UI).

---

## 8. Actions infra MANUELLES restantes — fondateur (liste exhaustive)

> Rien de tout ceci ne bloque le code ; à faire avant mise en ligne publique.

1. [ ] **Confirmer le service email** : Resend (hypothèse) ou autre. Créer le compte.
2. [ ] **Connecter le repo GitHub à Cloudflare Pages** (§2, étapes 1-4).
3. [ ] **Créer le namespace KV** `aquasystem-rate-limit` + binding `RATE_LIMIT_KV` (§2.6).
4. [ ] **Saisir les variables d'environnement** Production + Preview (§6) — sans valeur en clair dans le repo.
5. [ ] **Choisir l'hébergement Umami** (Cloud recommandé vs VPS self-host) puis récupérer `website-id` + URL script (§3).
6. [ ] **Vérifier le domaine d'envoi Resend** : créer SPF, DKIM, DMARC chez Cloudflare DNS (§4).
7. [ ] **Décider et configurer le domaine ombrelle** (après naming final) : Custom domain Pages + DNS. **Pas de DNS root sans validation.**
8. [ ] **Restreindre CSP + CORS** au domaine final (§5).
9. [ ] **Configurer UptimeRobot** sur `/` (§7).
10. [ ] **Test end-to-end formulaire** une fois les P0 résolus et la Function complétée (gate G-FORM @qa).
11. [ ] (Optionnel) **Token Cloudflare scopé + secrets GitHub** si déploiement piloté par wrangler-action (§2).
12. [ ] **Activer la protection de branche `main`** sur GitHub (PR obligatoires, CI requise).

---

## 9. Sauvegarde / restauration

- **Code** : Git (GitHub) = source de vérité. Pas de backup additionnel requis.
- **Contenu portfolio** : JSON versionné dans le repo (pas de CMS V1) → sauvegardé par Git.
- **Leads** : aucun stockage (email uniquement). Pas de BDD à sauvegarder. La boîte `contact@aqua-system.fr` est la persistance des leads → sauvegarde = politique email du fondateur.
- **Umami** (si self-hosted) : `pg_dump` automatisé du Postgres Umami sur le VPS (cron hebdo, rétention 4 semaines). En Umami Cloud : géré par l'éditeur.
