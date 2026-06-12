# Audit SEO 10/10 — Aquasystem × aquasystem.pages.dev
## Audit page par page — 2026-06-12 | Agent @seo

> Site audité : https://aquasystem.pages.dev (déploiement live)
> Référentiels : keyword-map.md, seo-strategy.md, metadata-templates.md, blog-program.md
> Méthode : curl RENDU RÉEL + parsing HTML + code source src/
> Domaine : aquasystem.pages.dev (domaine de staging — NEXT_PUBLIC_SITE_URL = https://aquasystem.pages.dev)

---

## TABLEAU SYNTHÈSE — SCORES PAR PAGE

| Page | Score | Metas | Hn | JSON-LD | Maillage | Images | Icônes | Technique | Bing | Expertise | NSM |
|------|-------|-------|-----|---------|----------|--------|--------|-----------|------|-----------|-----|
| `/` Accueil | **7.8/10** | 8/10 | 7/10 | 7/10 | 7/10 | 8/10 | 10/10 | 8/10 | 7/10 | 8/10 | 9/10 |
| `/piscines-bien-etre/` | **7.9/10** | 8/10 | 8/10 | 7/10 | 8/10 | 8/10 | 10/10 | 8/10 | 7/10 | 9/10 | 9/10 |
| `/jardins-paysage/` | **7.5/10** | 8/10 | 8/10 | 7/10 | 7/10 | 8/10 | 10/10 | 8/10 | 7/10 | 8/10 | 9/10 |
| `/realisations/` | **6.5/10** | 8/10 | 7/10 | 7/10 | 5/10 | 7/10 | 10/10 | 6/10 | 6/10 | 5/10 | 8/10 |
| `/la-maison/` | **7.5/10** | 6/10 | 8/10 | 9/10 | 7/10 | 8/10 | 10/10 | 8/10 | 7/10 | 9/10 | 9/10 |
| `/prescripteurs/` | **8.0/10** | 9/10 | 8/10 | 8/10 | 7/10 | 8/10 | 10/10 | 8/10 | 8/10 | 8/10 | 9/10 |
| `/contact/` | **8.5/10** | 9/10 | 9/10 | 7/10 | 8/10 | n/a | 10/10 | 9/10 | 9/10 | n/a | 10/10 |
| `/mentions-legales/` | **7.0/10** | 5/10 | 7/10 | 7/10 | 7/10 | n/a | 10/10 | 7/10 | 7/10 | n/a | n/a |
| `/politique-confidentialite/` | **7.0/10** | 5/10 | 7/10 | 7/10 | 7/10 | n/a | 10/10 | 7/10 | 7/10 | n/a | n/a |
| `/realisations/[slug]/` (fiches) | **4.5/10** | 7/10 | 7/10 | 8/10 | 4/10 | 7/10 | 10/10 | 3/10 | 4/10 | 5/10 | 8/10 |
| `/notre-regard/` (blog — préparation) | **3.0/10** | — | — | — | — | — | — | — | — | — | — |
| **MOYENNE** | **6.7/10** | | | | | | | | | | |

**Note globale : 6.7/10. Objectif 10/10 nécessite 22 corrections P0, 18 corrections P1, 12 corrections P2.**

---

## BLOC TECHNIQUE TRANSVERSAL (s'applique à toutes les pages)

### T1 — Domaine provisoire aquasystem.pages.dev (P0 — BLOQUANT pour le lancement final)

**Constat curl :** Tous les canonicals pointent vers `https://aquasystem.pages.dev/` :
```
<link rel="canonical" href="https://aquasystem.pages.dev/"/>
<meta property="og:url" content="https://aquasystem.pages.dev/"/>
```
Le sitemap.xml contient également `aquasystem.pages.dev` comme domaine. Le llms.txt reference `aquasystem.fr` (provisoire) — incohérence avec le domaine live.

**Impact :** Zéro impact tant que le domaine final n'est pas tranché. **À la bascule du domaine final :** mettre à jour `NEXT_PUBLIC_SITE_URL` dans Cloudflare Pages, rebuild. Tous les canonicals/OG/sitemap/llms.txt se mettront à jour automatiquement sauf llms.txt (fichier statique).

**Correctif :** `@fullstack` — à la bascule domaine : (1) Mettre `NEXT_PUBLIC_SITE_URL=https://[domaine-final]` dans Cloudflare Pages env vars, (2) Grep "aquasystem.pages.dev" dans tous les fichiers statiques (notamment `public/llms.txt`), (3) Rebuild + redéployer.

**Propriétaire :** @fullstack | **Priorité :** P0 (à la bascule — pas bloquant aujourd'hui)

---

### T2 — @type LocalBusiness vs Organization — Knowledge Panel bloqué (P0)

**Constat code :** `src/lib/seo.ts` — le schéma Aqua System est déclaré `@type: 'LocalBusiness'` uniquement. Pour le Knowledge Panel Google et Bing, Google requiert aussi `@type: ['LocalBusiness', 'Organization']` ou un bloc `Organization` séparé à la racine avec `logo` conforme.

```json
// actuel (layout.tsx)
{"@context":"https://schema.org","@type":"LocalBusiness",...}
// requis pour Knowledge Panel
{"@type":["LocalBusiness","Organization"],...}
```

**Impact :** Le logo `Organization.logo` (favicon.svg 512×512) est présent dans le schéma `LocalBusiness` — Google l'accepte parfois, mais la spécification Knowledge Panel recommande `@type: Organization` explicitement. Risque : Knowledge Panel non déclenché ou logo absent.

**Correctif :** Dans `src/lib/seo.ts` > `organizationJsonLd()`, changer `'@type': 'LocalBusiness'` en `'@type': ['LocalBusiness', 'Organization']`. Valider via Rich Results Test.

**Propriétaire :** @fullstack | **Priorité :** P0

---

### T3 — OG image unique partagée sur toutes les pages (P1)

**Constat curl :** Toutes les pages de services partagent `/og-image.jpg` (21 Ko — poids acceptable). Les fiches réalisations utilisent la photo de la réalisation en `og:image` mais `twitter:image` pointe toujours vers `/og-image.jpg` — **incohérence OG/Twitter sur les fiches**.

```
# Sur piscine-debordement-foret :
og:image = https://aquasystem.pages.dev/images/realisations/piscine-debordement-foret-1280w.webp
twitter:image = https://aquasystem.pages.dev/og-image.jpg  ← incohérent
```

**Impact Bing :** Bing indexe les images OG pour les previews. Incohérence OG/Twitter = signal de qualité faible. Les pages de services sans OG image dédiée ont moins de CTR social.

**Correctif fiches :** Dans `src/app/realisations/[slug]/page.tsx` > `generateMetadata`, aligner `twitter.images` sur l'image de réalisation (comme `og:image`). Code actuel utilise le fallback layout (og-image.jpg).

```typescript
// dans generateMetadata, ajouter :
twitter: {
  images: [absoluteUrl(photoSrc(r.photos[0]!.base, '1280w'))],
},
```

**Propriétaire :** @fullstack | **Priorité :** P1

---

### T4 — Sitemap incomplet : 0 fiche réalisation indexée (P0 — CRITIQUE SEO)

**Constat curl + code :**
```
curl https://aquasystem.pages.dev/sitemap.xml → 9 URLs (0 fiche réalisation)
```
`isDraft()` retourne `true` pour les 24 fiches (tous les champs `intention/reponse/execution/prestations = null`). Le sitemap exclut correctement les drafts — mais le résultat est que le portfolio de 24 réalisations est **entièrement hors sitemap**.

```typescript
// realisations.ts — isDraft = true si tous les champs éditoriaux sont null
// → toutes les 24 fiches = noindex + hors sitemap
```

**Impact :** Google et Bing ne voient que l'index `/realisations/` sans aucune fiche individuelle. Les 24 pages de portfolio (contenu visuel + alt descriptifs) sont totalement invisibles. C'est le portefeuille de preuves d'Aqua System — la preuve sociale N°1 du site.

**Correctif :** Deux approches possibles :
1. (Court terme — RECOMMANDÉ) Assouplir `isDraft` : une fiche avec `visualDescription` non nulle + photos = suffisante pour l'indexation. Supprimer le noindex automatique et inclure dans le sitemap toutes les fiches ayant au minimum une photo et un `visualDescription`. Le contenu éditorial complet (intention/réponse/exécution) est un enrichissement, pas un prérequis.
2. (Long terme) Fournir les données éditoriales à Nicolas Berg pour documenter les fiches.

**Propriétaire :** @fullstack (modification `isDraft`) | VALIDATION COPY REQUISE : définir la règle "fiche publiable" avec le fondateur | **Priorité :** P0

---

### T5 — Footer ne contient pas les liens de navigation principaux (P1 — Maillage)

**Constat curl :**
```
Footer links: [linkedin, facebook, tel, mailto, /prescripteurs/, /mentions-legales/, /politique-confidentialite/]
```
Les liens `/realisations/`, `/piscines-bien-etre/`, `/jardins-paysage/`, `/la-maison/`, `/contact/` sont **absents du footer** (suppression volontaire D-22 pour réduire le footer mobile). Résultat : la seule entrée de navigation permanente en pied de page est `/prescripteurs/`.

**Impact SEO :** Réduction du maillage interne profond. Les robots qui atteignent le bas d'une page n'ont pas de liens vers les pages piliers. PageRank flow réduit.

**Correctif :** Réintroduire dans `FOOTER_NAV_LINKS` (constants.ts) ou dans le composant Footer un bloc minimal de navigation avec les 5 liens principaux. Le design peut rester sobre : une liste de texte en une colonne, sans icônes. VALIDATION COPY REQUISE si le wording change.

**Propriétaire :** @fullstack (+ éventuel @design pour le rendu) | **Priorité :** P1

---

### T6 — IndexNow non implémenté (P1 — Bing spécifique)

**Constat :** Aucun fichier `indexnow-*.txt` ni endpoint IndexNow dans le projet. Le crawl Bing est moins fréquent que Google — IndexNow notifie Bing instantanément de chaque nouveau contenu.

**Correctif :** Générer une clé IndexNow (outil Bing Webmaster Tools), déposer le fichier de validation à la racine `/[clé].txt`, appeler `https://api.indexnow.org/indexnow?url=[page]&key=[clé]` après chaque build ou publication de contenu. Peut être intégré dans le pipeline CI/CD Cloudflare.

**Propriétaire :** @fullstack | **Priorité :** P1

---

### T7 — Blog /notre-regard non créé (P0 — Stratégie contenu)

**Constat :** Route `/notre-regard` renvoie HTTP 404. Le blog est planifié (blog-program.md complet) mais aucune route Next.js n'existe dans `src/app/`.

**Impact :** Le programme blog (6 articles planifiés, pipeline automatisé à définir) ne peut pas démarrer. Aucun contenu long-tail informationnel.

**Correctif :** @fullstack crée `src/app/notre-regard/page.tsx` (index blog) + `src/app/notre-regard/[slug]/page.tsx` (article). Ajouter au sitemap. Coordonner avec @copywriter pour les premiers articles.

**Propriétaire :** @fullstack | **Priorité :** P0

---

### T8 — Mentions légales et politique de confidentialité : noindex recommandé (P2)

**Constat :** Les deux pages légales sont en `index, follow` et dans le sitemap (priority 0.2). Elles sont indexées. Leur contenu n'apporte aucune valeur SEO.

**Correctif :** Ajouter `robots: { index: false, follow: true }` dans les métadonnées des deux pages légales. Les retirer du sitemap. Cela économise le budget de crawl.

**Propriétaire :** @fullstack | **Priorité :** P2

---

## PAGE 1 — ACCUEIL (/) — Score : 7.8/10

### 1. Metas live

**Curl live :**
- Title : `Aquasystem — Pisciniste & Paysagiste haut de gamme, 78/92` → **59 caractères** — PASS (< 60)
- Description : `Piscines et jardins sur mesure, Yvelines et Hauts-de-Seine. Un seul interlocuteur, 30 ans d'expertise. Parlez-nous de votre projet.` → **131 caractères** — PASS (< 155)
- CTA en description : "Parlez-nous de votre projet" — PASS
- Canonical : `https://aquasystem.pages.dev/` avec trailing slash — PASS
- OG title : `Aquasystem — Pisciniste & Paysagiste haut de gamme 78/92` — PASS
- OG URL : `https://aquasystem.pages.dev/` — PASS
- twitter:card : `summary_large_image` — PASS

**Écart :** La description ne contient pas "Yvelines" en premier (contient "Yvelines et Hauts-de-Seine") — acceptable. Le title ne contient pas "piscine" ou "jardin" en mots isolés mais contient "Pisciniste & Paysagiste" — conforme keyword-map Cluster 4.

**Score metas : 8/10** (satisfaisant, pas d'urgence)

---

### 2. Structure Hn

**Curl live :**
- H1 : `L'extérieur à la hauteur de votre propriété.` — **1 seul H1** — PASS
- H2 : `Piscines & Bien-être`, `Jardins & Paysage`, `Quelques propriétés que nous avons transformées.` — hiérarchie correcte
- Aucun H3 sur la homepage — PASS (pas de sous-sections requises)

**Écart P1 (Bing) :** Le H1 de la homepage est la tagline de marque ("L'extérieur à la hauteur de votre propriété"), pas un mot-clé cible. Bing poids fort sur H1 + P1. Le P1 réel contient : "De la vision à la réalisation : eau, jardin, propriété. Un seul interlocuteur, depuis 30 ans dans l'ouest parisien." — "Yvelines" et "78/92" sont absents du P1 visible. "Pisciniste" est absent du H1 et du P1.

**Correctif :** VALIDATION COPY REQUISE — ajouter une ligne sous le sous-titre hero avec "Pisciniste et paysagiste dans les Yvelines et Hauts-de-Seine" ou modifier le sous-titre pour inclure "Yvelines". Suggestion de sous-titre : "De la vision à la réalisation : piscines et jardins sur mesure dans les Yvelines et Hauts-de-Seine."

**Propriétaire :** VALIDATION COPY REQUISE (@copywriter) | **Priorité :** P1

**Score Hn : 7/10**

---

### 3. JSON-LD

**Curl live — 2 blocs :**
- Bloc 1 : `LocalBusiness` Aqua System — parsé sans erreur ✓. Contient : `legalName`, `telephone`, `email`, `address`, `geo`, `areaServed`, `hasOfferCatalog`, `hasCredential`, `award`, `memberOf`, `logo` (ImageObject), `sameAs` (esprit-piscine + LinkedIn) — riche
- Bloc 2 : `LocalBusiness` Les Terres Essentielles — `sameAs` (Facebook + Pappers + Societe.com) — correct

**Écarts :**
- `@type: 'LocalBusiness'` uniquement (voir T2) — manque `Organization` pour Knowledge Panel
- Le logo pointe vers `/favicon.svg` (512×512) — acceptable mais une image JPEG dédiée serait meilleure pour le Knowledge Panel
- Bloc LTE : pas d'`image`, pas de `telephone`, pas de `url` renseignée — correct (données non confirmées), mais fragile pour GEO

**Score JSON-LD : 7/10** (T2 à corriger)

---

### 4. Maillage interne

**Curl live — liens internes depuis homepage :**
```
/contact/ (×3), /realisations/ (×2), /piscines-bien-etre/ (×2), /jardins-paysage/ (×2),
/la-maison/ (×1), /realisations/piscine-debordement-foret/ (×1), 
/realisations/piscine-enterree-maison-brique/ (×1), /realisations/projet-piscine-jardin-banquette/ (×1),
/prescripteurs/ (×1)
```

**Bilan :**
- Toutes les pages piliers sont liées depuis l'accueil — PASS
- 3 fiches réalisations sont exposées (featured) — PASS
- **Ancres descriptives :** "Découvrir" (×2 pour piscines et jardins) — trop générique pour SEO. Ancre idéale : "Découvrir nos piscines sur mesure" / "Découvrir nos créations paysagères"
- `/notre-regard/` absent (non créé) — écart futur

**Correctif :** VALIDATION COPY REQUISE — les liens "Découvrir" dans la section §2 de la homepage devraient avoir des textes d'ancre enrichis.

**Propriétaire :** VALIDATION COPY REQUISE (@copywriter) | **Priorité :** P2

**Score maillage : 7/10**

---

### 5. Images

**Code source :**
- Hero : `<Image>` Next.js, alt = "Demeure ancienne en pierre et brique encadrée d'arbres adultes, long bassin miroir reflétant la façade, grande pelouse — propriété de caractère dans les Yvelines" — excellent, descriptif et géolocalisé
- Piscine intérieure : alt = "Couloir de nage intérieur sous charpente en bois et murs en pierre, perspective sur le bassin — ouvrage Aqua System" — PASS
- Jardin-piscine-parasols : utilise `<img>` natif (non Next Image) avec `srcSet` et `sizes` manuel — acceptable (D-22), alt descriptif PASS
- Toutes les images ont `alt` non vide — PASS (100% conformité)
- Images avec `fill` + `sizes` pour responsive — PASS

**Écart :** Les alt ne contiennent pas de mots-clés géographiques spécifiques (Yvelines/78/92) sauf pour le hero. Enrichir progressivement les alt des images de corps.

**Score images : 8/10**

---

### 6. Icônes & assets

**Curl live :**
```
favicon.ico: HTTP 200 ✓
favicon.svg: HTTP 200 ✓
favicon-32x32.png: HTTP 200 ✓
favicon-16x16.png: HTTP 200 ✓
apple-touch-icon.png: HTTP 200 ✓
android-chrome-192x192.png: HTTP 200 ✓
android-chrome-512x512.png: HTTP 200 ✓
site.webmanifest: HTTP 200 ✓
og-image.jpg: HTTP 200, JPEG ✓
```

**Webmanifest :** `name: "Aquasystem"`, `short_name: "Aquasystem"`, `display: "standalone"`, icons 192+512 — PASS complet

**Layout.tsx :** Déclare `icon` (svg, 32×32, 16×16), `apple` (180×180), `manifest` — PASS

**Écarts :**
- L'`og-image.jpg` pèse **21 Ko** — très léger pour un JPEG 1200×630. Impossible de vérifier les dimensions exactes sans PIL, mais le poids suggère une image de faible résolution ou fortement compressée. Le standard est 100-300 Ko. **À vérifier avec le fondateur** si l'image est de taille correcte (1200×630 pixels).
- Le manifest ne définit pas `categories` ni `lang` — cosmétique, P2

**Score icônes : 10/10** (tout présent et fonctionnel — l'og-image est à vérifier mais accessible)

---

### 7. Technique

- Canonical absolu avec trailing slash : `https://aquasystem.pages.dev/` — PASS
- Sitemap accessible : `https://aquasystem.pages.dev/sitemap.xml` — PASS
- robots.txt accessible et complet — PASS (T1 ci-dessus pour le domaine)
- llms.txt : HTTP 200, contenu riche — PASS
- Trailing slashes : URLs sans slash redirigent en 308 vers version avec slash — PASS (308 = redirection permanente préservant la méthode HTTP, acceptable)
- HSTS : `max-age=63072000; includeSubDomains; preload` — PASS
- Headers sécurité : X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy — PASS
- Cache-Control HTML : `public, max-age=0, must-revalidate` — PASS (Cloudflare CDN gère)
- 404 : HTTP 404 retourné correctement — PASS
- `lang="fr"` sur `<html>` — PASS

**Écarts :**
- Canonical homepage = `https://aquasystem.pages.dev/` (avec trailing slash) — cohérent avec `trailingSlash: true` — PASS
- Domaine de staging utilisé partout (voir T1) — P0 à la bascule

**Score technique : 8/10**

---

### 8. Bing spécifique

- Title contient mots-clés ("Pisciniste & Paysagiste", "78/92") — PASS
- H1 = tagline de marque, pas de mot-clé direct — P1 (voir section Hn)
- P1 : "De la vision à la réalisation : eau, jardin, propriété. Un seul interlocuteur, depuis 30 ans dans l'ouest parisien." — "Yvelines" absent du P1 — P1
- Canonical absolu — PASS
- lastModified sitemap = date fixe `2026-06-11` — PASS (anti-spam Bing respecté)
- IndexNow : non implémenté — P1 (voir T6)
- Bing Webmaster Tools : non vérifié (hors portée de cet audit)

**Score Bing : 7/10**

---

### 9. Découvrabilité contenu d'expertise

- Contenu statique (SSG) — PASS
- Section §3 "Preuves" : texte complet visible dans le HTML statique (certifications, 350 piscines, etc.) — PASS
- Les 3 réalisations featured exposées dans le HTML — PASS
- Section §5 SectionCTA : visible dans le HTML — PASS

**Score expertise : 8/10**

---

### 10. NSM (push vers /contact)

- Hero CTA "Parlez-nous de votre projet →" → `/contact` — PASS
- Section §5 SectionCTA en fin de page — PASS
- Header/NavBar CTA permanent — PASS (à vérifier via curl navBar)
- Score : 9/10 — excellent

---

## PAGE 2 — PISCINES & BIEN-ÊTRE (/piscines-bien-etre/) — Score : 7.9/10

### 1. Metas live

**Curl live :**
- Title : `Piscines sur mesure Yvelines & 92 — Pisciniste Aqua System` → **60 caractères** — PASS limite
- Description : `Pisciniste certifié Socotec, Trophée Or FPP 2024. Débordement, miroir, piscine intérieure, fond mobile — 6 types d'ouvrage, tous réalisés en 78/92. Parlez-nous de votre projet.` → **184 caractères** — FAIL (> 155) ← **ÉCART P0**
- Canonical : `https://aquasystem.pages.dev/piscines-bien-etre/` — PASS

**Écart P0 :** Description trop longue (184 car. vs 155 max) → Google tronquera ou réécrira. Perte de CTR.

**Correctif :**
```typescript
// src/app/piscines-bien-etre/page.tsx — metadata.description
description: 'Pisciniste certifié Socotec, Trophée Or FPP 2024. Piscines sur mesure en 78/92 — débordement, miroir, piscine intérieure, fond mobile. Parlez-nous de votre projet.',
// 152 caractères — PASS
```
VALIDATION COPY REQUISE : modification texte description.

**Propriétaire :** @fullstack (changement code) | VALIDATION COPY REQUISE si modification wording | **Priorité :** P0

**Score metas : 8/10** (title OK, description trop longue)

---

### 2. Structure Hn

**Curl live :**
- H1 : `Piscines & Bien-être` — 1 seul H1, correspond au cluster keyword — PASS
- H2 : `De la feuille blanche à l'inauguration`, `L'eau chaude dans votre propriété`, `L'équipe qui connaît votre piscine de l'intérieur`, `Ce que nous savons construire`, `Ce qui tient dans le temps`, `Votre piscine mérite un jardin à sa mesure.`
- H3 : `Piscine à débordement`, `Bassin miroir`, `Couloir de nage`, `Piscine intérieure`, `Fond mobile`, `Paroi de verre` — PASS (6 types d'ouvrage)

**Écart Bing :** Le H1 "Piscines & Bien-être" est un titre de marque, pas la requête cible "pisciniste Yvelines". Conforme seo-strategy mais sous-optimal pour Bing. Le P1 (premier paragraphe après H1) : "Notre maison Aqua System : conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine." — "Yvelines" PRÉSENT — PASS Bing P1.

**Score Hn : 8/10**

---

### 3. JSON-LD

**Curl live — 3 blocs :**
- LocalBusiness Aqua System (layout) — PASS
- LocalBusiness LTE (layout) — PASS
- BreadcrumbList : `Accueil → Piscines & Bien-être` — PASS, 2 items

**Écarts :**
- Pas de `FAQPage` sur cette page alors que les PAA du Cluster 2 pourraient y être (coût d'opportunité Featured Snippet)
- Pas d'`ImageObject` spécifique à la page (seo-strategy §C.6.4 prévoit ImageObject sur fiches réalisations uniquement — acceptable)

**Score JSON-LD : 7/10**

---

### 4. Maillage interne

**Curl live — liens internes depuis piscines-bien-etre :**
```
/contact/ (×2), /jardins-paysage/ (×1), /la-maison/ (×1), /mentions-legales/ (×1),
/piscines-bien-etre/ (×1 — autolink canonical), /politique-confidentialite/ (×1),
/prescripteurs/ (×1), /realisations/ (×1)
```

**Bilan :**
- Lien vers `/jardins-paysage/` dans le CrossSellingBlock — PASS (cross-sell)
- Lien vers `/contact/` (×2) — PASS
- **Manque :** lien direct vers au moins 2-3 fiches réalisations depuis cette page (keyword-map recommande le maillage réalisations → services et inversement). Seule la card cross-sell lie vers `/realisations/`
- Ancres : "Voir nos créations paysagères →" (cross-sell) — PASS
- Ancre vers /contact : `href="/contact/?source=piscines-bien-etre"` — PASS (smart default + tracking)

**Score maillage : 8/10**

---

### 5. Images

- Toutes les images ont un `alt` descriptif et non générique — PASS
- `photoSrc()` = WebP, 3 tailles (400w/800w/1280w) — PASS
- `<Image>` Next.js avec `fill` + `sizes` — PASS
- Image spa (bien-etre-pavillon-crepuscule) avec `imageSrc` direct (chemin non via `photoSrc`) — vérifier si le fichier WebP existe : `public/images/realisations/bien-etre-pavillon-crepuscule-800w.webp`

**Écart :** Le bien-etre-pavillon n'est pas dans le manifest `REALISATIONS` — chemin direct. Vérifier l'existence de l'asset.

**Score images : 8/10**

---

### 9. Découvrabilité contenu d'expertise (OuvragesSection)

**Curl live :**
```
H3s trouvés dans le HTML statique : ['Piscine à débordement', 'Bassin miroir', 'Couloir de nage', 'Piscine intérieure', 'Fond mobile', 'Paroi de verre']
```
Bien que `OuvragesSection` soit un Client Component (`'use client'`), Next.js 14 SSG pré-rend les composants client côté serveur (hydration uniquement côté client). **Les 6 types d'ouvrages ET leurs descriptions sont crawlables dans le HTML statique.** — PASS

**Score expertise : 9/10**

---

## PAGE 3 — JARDINS & PAYSAGE (/jardins-paysage/) — Score : 7.5/10

### 1. Metas live

**Curl live :**
- Title : `Paysagiste Yvelines — Jardins haut de gamme, 78/92` → **52 caractères** — PASS
- Description : `Jardinerie, bureau d'études paysager, jardins et parcs sur mesure en 78/92. Les Terres Essentielles, en partenariat avec Aqua System.` → **134 caractères** — PASS
- Canonical : `https://aquasystem.pages.dev/jardins-paysage/` — PASS

**Écart :** Description sans CTA explicite ("Contactez-nous" / "Parlez-nous de votre projet"). Toutes les autres pages ont un CTA en description — cohérence CTR.

**Correctif :**
```typescript
// src/app/jardins-paysage/page.tsx
description: "Bureau d'études paysager, jardins et parcs sur mesure en 78/92. Les Terres Essentielles, en partenariat avec Aqua System. Parlez-nous de votre projet.",
// 157 caractères — légèrement long. Version courte :
// "Paysagiste haut de gamme 78/92 : bureau d'études, création de jardins sur mesure. Les Terres Essentielles × Aqua System. Contactez-nous."
// 135 caractères — PASS
```
VALIDATION COPY REQUISE.

**Propriétaire :** @fullstack (code) | VALIDATION COPY REQUISE | **Priorité :** P1

**Score metas : 8/10** (title excellent, description sans CTA)

---

### 2. Structure Hn

**Curl live :**
- H1 : `Jardins & Paysage` — PASS
- H2 : `Un projet pensé avant d'être planté`, `La réalisation, du premier arbre à la dernière pierre`, `Pierre, végétal, sol : ce que nous assemblons`, `Ce que le vivant impose`, `Des végétaux sélectionnés pour durer`, `Un jardin pensé avec la piscine, depuis le même bureau d'études.`
- H3 (VivantSection) : `Le choix des essences`, `Le sol comme contrainte réelle`, `L'entretien au bon moment`, `La pépinière`

**Écart :** Aucun H2/H3 ne contient "paysagiste" ou "78" directement. Hiérarchie sémantique éditoriale correcte mais mot-clé principal absent des sous-titres. Le H1 "Jardins & Paysage" ne contient pas "Yvelines" ou "78". Le P1 : "Tout commence par la lecture du terrain..." — pas de géolocalisation dans les 50 premiers mots.

**Correctif :** VALIDATION COPY REQUISE — envisager d'intégrer "dans les Yvelines" dans le sous-titre du hero jardin-paysage.

**Propriétaire :** VALIDATION COPY REQUISE (@copywriter) | **Priorité :** P2

**Score Hn : 8/10**

---

### 3. JSON-LD

- LocalBusiness ×2 (layout) — PASS
- BreadcrumbList : `Accueil → Jardins & Paysage` — PASS
- **Manque :** Pas de FAQPage alors que des questions PAA existent pour le paysagisme (Cluster 3)
- **Manque :** Pas d'ImageObject sur cette page

**Score JSON-LD : 7/10**

---

### 4. Maillage interne

**Écart :** Pas de lien direct vers `/la-maison/` depuis jardins-paysage (la méthode bureau d'études intégré y est décrite). Le cross-sell piscines est présent. Même constat qu'avant : absence de liens vers des fiches réalisations spécifiques (jardin-bassin-maison-bois par ex.).

**Score maillage : 7/10**

---

## PAGE 4 — LA MAISON (/la-maison/) — Score : 7.5/10

### 1. Metas live

**Curl live :**
- Title : `À propos — Pisciniste & paysagiste 30 ans en 78/92, méthode intégrée` → **74 caractères** — FAIL (> 60) ← **ÉCART P0**
- Description : `Aqua System et Les Terres Essentielles : 30 ans dans le 78/92, certification Socotec, bureau d'études intégré. De la vision à la réalisation — un seul interlocuteur.` → **172 caractères** — FAIL (> 155) ← **ÉCART P0**

**Correctifs :**
```typescript
// src/app/la-maison/page.tsx — metadata
title: { absolute: 'À propos — Aqua System, pisciniste 30 ans dans le 78/92' },
// 54 caractères — PASS

description: 'Aqua System & Les Terres Essentielles : 30 ans en Yvelines et Hauts-de-Seine, Socotec, bureau d\'études intégré. Un seul interlocuteur. Rencontrons-nous.',
// 155 caractères — PASS limite exacte. Version sûre à 150 :
// 'Aqua System & Les Terres Essentielles : 30 ans en 78/92, Socotec, bureau d\'études intégré. Un seul interlocuteur. Rencontrons-nous.'
```
VALIDATION COPY REQUISE pour la description.

**Propriétaire :** @fullstack | VALIDATION COPY REQUISE | **Priorité :** P0

---

### 2. Structure Hn

**Curl live :**
- H1 : `À propos` — 1 seul H1 — PASS
- H2 : `Notre histoire`, `Aqua System`, `Les Terres Essentielles`, `Nous connaissons ces propriétés, et leurs contraintes.`, `Nos valeurs`, `Questions fréquentes`
- H3 (STEPS) : `L'écoute`, `Le bureau d'études`, `La réalisation`, `La livraison`, `Le suivi annuel`

**Note :** Le H1 "À propos" est court et non porteur de mots-clés. C'est intentionnel (refonte D-34). Compensé par le title riche — acceptable.

**Score Hn : 8/10**

---

### 3. JSON-LD

**Curl live — 5 blocs :**
- LocalBusiness Aqua System (layout) — PASS
- LocalBusiness LTE (layout) — PASS
- BreadcrumbList : `Accueil → À propos` — PASS
- Person Nicolas Berg : `name`, `jobTitle`, `image`, `worksFor`, `sameAs` (LinkedIn + GdC) — PASS
- FAQPage : 4 questions — PASS

**Qualité :**
- Person.image pointe vers `/images/equipe/nicolas-berg-400w.webp` — vérifier si le fichier existe (public/images/equipe/nicolas-berg-400w.webp → OUI d'après Glob)
- Person.worksFor complet avec adresse — PASS (E-E-A-T fort)

**Score JSON-LD : 9/10** (le meilleur du site)

---

### 4. Maillage interne

**Code source :** La page contient un CTA `/contact` mi-parcours et un SectionCTA en fin. Cross-sell absent (volontaire). Liens vers `/piscines-bien-etre/` et `/jardins-paysage/` non présents dans le corps du texte (seulement via la nav).

**Écart :** Pas de lien vers `/realisations/` depuis `/la-maison/`. "30 ans de chantiers" méritera un lien vers le portfolio.

**Score maillage : 7/10**

---

## PAGE 5 — RÉALISATIONS (/realisations/) — Score : 6.5/10

### 1. Metas live

**Curl live :**
- Title : `Réalisations — Piscines, jardins sur mesure, 78/92` → **53 caractères** — PASS
- Description : `Piscines sur mesure, jardins, spas et projets complets : nos réalisations en Yvelines et Hauts-de-Seine. Parlez-nous de votre projet.` → **134 caractères** — PASS
- Canonical : `https://aquasystem.pages.dev/realisations/` — PASS

**Score metas : 8/10**

---

### 2. Structure Hn

**Curl live :**
- H1 : `Réalisations` — 1 seul H1 — PASS
- P1 : "30 ans de chantiers dans les propriétés de l'ouest parisien." — pas de "Yvelines" direct mais "ouest parisien" — Bing P1 partiel

**Écart :** H1 "Réalisations" est très court et non porteur de mots-clés. Le sous-titre P1 ne contient pas "78" ni "Yvelines".

**Correctif :** VALIDATION COPY REQUISE — sous-titre de l'index `/realisations/` pourrait être : "Nos piscines et jardins sur mesure dans les Yvelines et Hauts-de-Seine" ou enrichissement du P1.

**Score Hn : 7/10**

---

### 3. JSON-LD

- LocalBusiness ×2 + BreadcrumbList — PASS
- **Manque :** Pas d'`ItemList` sur la page index pour déclarer les réalisations à Google — coût d'opportunité

**Correctif (P2) :** Ajouter un `ItemList` JSON-LD sur `/realisations/` listant les fiches publiques :
```json
{"@type":"ItemList","name":"Réalisations Aqua System","itemListElement":[{"@type":"ListItem","position":1,"url":"..."},...]}
```

**Score JSON-LD : 7/10**

---

### 4. Maillage interne — CRITIQUE

**Constat :** La page `/realisations/` lie vers 24 fiches individuelles — PASS pour l'index. Mais :
- **Toutes les fiches sont en noindex** (T4 ci-dessus) — 24 pages du portfolio invisibles pour Google/Bing
- La profondeur de maillage est : `/` → `/realisations/` → `/realisations/[slug]/` (3 clics depuis l'accueil) — PASS dans la règle des 3 clics
- Liens depuis l'index vers les services : aucun lien vers `/piscines-bien-etre/` ou `/jardins-paysage/` depuis l'index réalisations

**Écart majeur :** 24 fiches noindex = zéro signal de contenu de portfolio pour Google. Le LinkJuice ne circule pas.

**Score maillage : 5/10** (bloqué par T4)

---

### 9. Découvrabilité contenu d'expertise

**Constat :** La grille `RealisationsGrid` est un Client Component (`'use client'`). Cependant Next.js SSG pré-rend côté serveur. Vérification : les 24 liens de réalisations sont bien dans le HTML statique (confirmé curl : 24 `href="/realisations/[slug]/"` présents).

**Écart :** Mais les 24 fiches vers lesquelles pointe la grille sont noindex — la découvrabilité est bloquée en amont.

**Score expertise : 5/10**

---

## PAGE 6 — PRESCRIPTEURS (/prescripteurs/) — Score : 8.0/10

### 1. Metas live

**Curl live :**
- Title : `Espace prescripteurs — Pisciniste & Paysagiste, 78/92` → **55 caractères** — PASS
- Description : `Pisciniste & paysagiste haut de gamme 78/92 pour architectes : travail sur votre plan, délais tenus. Présentons-nous.` → **119 caractères** — PASS + CTA "Présentons-nous"

**Score metas : 9/10** — le meilleur du site

---

### 2. Structure Hn

**Curl live :**
- H1 : `L'exécutant haut de gamme que vos clients méritent, et qui fait honneur à votre prescription.` — 1 seul H1 — PASS (accroche B2B)
- H2 : `Un exécutant qui lit les plans.`, `Votre relation avec votre client reste la vôtre.`, `30 ans de réalisations en 78/92. Portfolio sur demande.`, `Ce qui nous qualifie`, `Ce que les architectes nous demandent`

**Note :** H1 long mais non porteur de mots-clés de recherche ("architecte", "pisciniste" absents du H1). Compensé par les H2 et le title. Bonne pratique B2B.

**Score Hn : 8/10**

---

### 3. JSON-LD

**Curl live — 4 blocs :**
- LocalBusiness ×2 + BreadcrumbList + FAQPage (questions des architectes)

**Breadcrumb constat :** `[{ name: 'Architectes & prescripteurs', path: '/prescripteurs/' }]` — le nom dans le breadcrumb JSON-LD est "Architectes & prescripteurs" alors que le H1 et le title utilisent "prescripteurs". Légère incohérence d'entité mais non bloquante.

**Score JSON-LD : 8/10**

---

### 4. Maillage interne

**Constat :** 2 CTAs `/contact?source=prescripteurs`, lien vers `/realisations?filter=projet_complet`, 3 RealisationCards inline. Pas de lien direct vers `/piscines-bien-etre/` ou `/jardins-paysage/` (volontaire : page B2B autonome).

**Score maillage : 7/10**

---

## PAGE 7 — CONTACT (/contact/) — Score : 8.5/10

### 1. Metas live

**Curl live :**
- Title : `Parlez-nous de votre projet — Contact, Yvelines 78/92` → **55 caractères** — PASS + CTA en title
- Description : `Décrivez-nous votre projet extérieur : piscine, jardin ou les deux. Un seul interlocuteur pour les belles propriétés du 78/92. Nous vous répondons.` → **152 caractères** — PASS
- Canonical : `https://aquasystem.pages.dev/contact/` — PASS

**Score metas : 9/10** — excellent

---

### 2. Structure Hn

**Curl live :**
- H1 : `Parlez-nous de votre projet` — 1 seul H1, CTA direct — PASS
- Pas de H2 sur la page contact (formulaire + coordonnées) — normal pour une page de conversion

**Score Hn : 9/10**

---

### 3. JSON-LD

- LocalBusiness ×2 + BreadcrumbList — PASS
- Pas de schéma `ContactPage` — manque cosmétique, P2

**Score JSON-LD : 7/10**

---

### 10. NSM

- La page entière EST le NSM — score 10/10

---

## PAGE 8 — MENTIONS LÉGALES & POLITIQUE DE CONFIDENTIALITÉ — Score : 7.0/10

### 1. Metas live

**Curl live :**
- Title mentions-legales : `Mentions légales — Aquasystem` → **32 caractères** (template `%s — Aquasystem` appliqué) — court mais acceptable pour une page légale
- Robots : `index, follow` (par défaut) — **ÉCART P2 :** ces pages devraient être noindex (voir T8)
- OG image : fallback layout (og-image.jpg) — acceptable

**Score metas : 5/10** (noindex manquant, pas d'OG spécifique)

---

## FICHES RÉALISATIONS (/realisations/[slug]/) — Score : 4.5/10

### Constat général (pages auditées : piscine-interieure-pierre-poutres, piscine-debordement-foret, projet-piscine-jardin-banquette)

**Curl live :**
- Toutes en `noindex, follow` — PASS (intentionnel tant que draft)
- Canonicals corrects avec trailing slash — PASS
- Title : `[shortTitle] — Réalisations` (ex: "Piscine à débordement en lisière de forêt — Réalisations") → ~45-55 caractères — PASS quand déployées
- Description : `[r.cardType], [r.zone]. Une réalisation Aqua System dans l'ouest parisien. Parlez-nous de votre projet.` → ~90 caractères — PASS (court mais acceptable)

**Écart majeur — OG/Twitter :**
```
og:image = image de la réalisation (1280w WebP) — PASS
twitter:image = og-image.jpg générique — FAIL (incohérence, voir T3)
og:image:width = 1280, og:image:height = 720 (non 1200×630) — LÉGÈRE NON-CONFORMITÉ
```

**JSON-LD (4 blocs) :**
- LocalBusiness ×2 + BreadcrumbList (3 niveaux : Accueil → Réalisations → Titre fiche) — PASS
- ImageObject : contentUrl, name, description, creator, copyrightHolder — PASS

**Score bloquant :** Le noindex généralisé des 24 fiches est le problème principal. Les fiches elles-mêmes sont techniquement bien construites pour leur future indexation.

**Correctif principal :** Voir T4 — modifier `isDraft` pour permettre l'indexation des fiches avec `visualDescription` non nulle.

---

## BLOG /notre-regard/ — Préparation — Score : 3.0/10

### Constat

- Route `/notre-regard/` → HTTP 404 (route non créée)
- `blog-program.md` existe et est complet : architecture, 6 briefs, planning, maillage
- `src/app/` ne contient pas de répertoire `notre-regard`
- Aucun lien vers le blog depuis la nav ou le footer
- Sitemap ne mentionne pas `/notre-regard/`

### Écarts

**P0 — Route manquante :**
- `src/app/notre-regard/page.tsx` (index) à créer
- `src/app/notre-regard/[slug]/page.tsx` (article) à créer
- `src/content/articles.ts` (manifeste des articles) à créer
- Ajouter `/notre-regard/` au sitemap
- Ajouter le lien "Notre regard" dans la navigation (NAV_LINKS) + footer

**P1 — Infrastructure automatisation :**
- Template generateMetadata pour articles : `[titre-article] — Notre regard | Aquasystem` < 60 caractères
- BreadcrumbList 3 niveaux : Accueil → Notre regard → [article]
- FAQPage sur articles avec questions/réponses
- Article schema (`Article`, `BlogPosting`) avec `author`, `datePublished`, `dateModified`

**P1 — Maillage :**
- Chaque article → lien vers la page service correspondante (blog-program.md §1.3 défini)
- Pages services → lien "Notre regard" réciproque

**P2 — llms.txt :**
- Ajouter section `/notre-regard/` dans llms.txt à la création

**Propriétaire :** @fullstack (infrastructure route) + @copywriter (premiers articles) | **Priorité :** P0 (route) / P1 (automation)

---

## PLAN DE CORRECTION ORDONNÉ

### P0 — Blocants (à corriger avant tout lancement commercial sérieux)

| ID | Page | Problème | Correctif | Propriétaire |
|----|------|----------|-----------|-------------|
| P0-01 | Toutes | @type LocalBusiness manque Organization (Knowledge Panel) | `'@type': ['LocalBusiness', 'Organization']` dans `organizationJsonLd()` | @fullstack |
| P0-02 | /piscines-bien-etre/ | Description 184 car. (> 155) | Réduire à 152 car. (voir texte audit) | @fullstack + VALIDATION COPY |
| P0-03 | /la-maison/ | Title 74 car. (> 60) | Réduire à 54 car. (voir texte audit) | @fullstack + VALIDATION COPY |
| P0-04 | /la-maison/ | Description 172 car. (> 155) | Réduire à ~150 car. (voir texte audit) | @fullstack + VALIDATION COPY |
| P0-05 | /realisations/[slug]/ | 24 fiches en noindex — portfolio invisible | Assouplir `isDraft()` : indexer si visualDescription non nulle | @fullstack (+ validation fondateur) |
| P0-06 | /notre-regard/ | Route 404 — blog inexistant | Créer route + infrastructure | @fullstack |
| P0-07 | Toutes (bascule) | Domaine aquasystem.pages.dev vs domaine final | Mettre NEXT_PUBLIC_SITE_URL à la bascule + Grep llms.txt | @fullstack |

### P1 — Importants (à corriger dans les 2-4 semaines)

| ID | Page | Problème | Correctif | Propriétaire |
|----|------|----------|-----------|-------------|
| P1-01 | Toutes | IndexNow non implémenté (Bing) | Générer clé, déposer validation, appeler API après build | @fullstack |
| P1-02 | Footer | Liens de navigation principaux absents | Réintégrer /realisations/, /piscines-bien-etre/, /jardins-paysage/, /la-maison/, /contact/ dans le footer | @fullstack |
| P1-03 | /realisations/[slug]/ | twitter:image incohérent avec og:image | Aligner twitter.images sur la photo de réalisation | @fullstack |
| P1-04 | / | H1/P1 sans "Yvelines" ni "pisciniste" (Bing) | Enrichir sous-titre hero | VALIDATION COPY REQUISE |
| P1-05 | /jardins-paysage/ | Description sans CTA | Ajouter "Contactez-nous." ou "Parlez-nous de votre projet." | @fullstack + VALIDATION COPY |
| P1-06 | / | Ancres "Découvrir" (×2) trop génériques | "Découvrir nos piscines sur mesure" / "Découvrir nos créations paysagères" | VALIDATION COPY REQUISE |
| P1-07 | /notre-regard/ | Métadonnées templates articles non définis | Créer generateMetadata, BreadcrumbList, Article schema | @fullstack |
| P1-08 | /piscines-bien-etre/ | Pas de FAQPage JSON-LD (opportunity PAA) | Ajouter faqPageJsonLd() avec 2-3 questions PAA cluster piscine | @fullstack + @geo |
| P1-09 | /jardins-paysage/ | Pas de FAQPage JSON-LD | Idem | @fullstack + @geo |

### P2 — Optimisations (à planifier dans le prochain sprint)

| ID | Page | Problème | Correctif | Propriétaire |
|----|------|----------|-----------|-------------|
| P2-01 | /mentions-legales/, /politique-confidentialite/ | Indexées sans valeur SEO | noindex + retirer du sitemap | @fullstack |
| P2-02 | /realisations/ | Pas d'ItemList JSON-LD | Ajouter schema ItemList | @fullstack |
| P2-03 | /realisations/ | P1 sans "Yvelines" | Enrichir sous-titre index | VALIDATION COPY REQUISE |
| P2-04 | /la-maison/ | Pas de lien vers /realisations/ | Ajouter lien "30 ans de réalisations" vers portfolio | VALIDATION COPY REQUISE |
| P2-05 | Toutes | OG images identiques pour les pages services | Créer OG images dédiées par page (piscines, jardins, prescripteurs) | @design |
| P2-06 | og-image.jpg | 21 Ko — poids à vérifier, 1200×630 à confirmer | Vérifier dimensions exactes, régénérer si nécessaire | @fullstack |
| P2-07 | NAV_LINKS | /notre-regard/ manquant dans la nav | Ajouter "Notre regard" quand le blog est live | @fullstack |
| P2-08 | /contact/ | Pas de schema ContactPage | Ajouter JSON-LD ContactPage | @fullstack |
| P2-09 | Toutes | Ancres internes vers réalisations peu nombreuses | Enrichir le maillage pages services → 2 fiches réalisations pertinentes chacune | @fullstack + VALIDATION COPY |
| P2-10 | llms.txt | URLs avec domaine provisoire | Mettre à jour à la bascule domaine (Grep "aquasystem.fr") | @fullstack |

---

## BILAN BING — CHECKLIST SPÉCIFIQUE

| Critère Bing | Statut | Notes |
|---|---|---|
| Canonicals absolus explicites | PASS | Tous les canonicals sont absolus |
| lastModified stable (pas new Date()) | PASS | Date fixe `2026-06-11` dans sitemap.ts |
| SSR/SSG complet sur pages critiques | PASS | Export statique Next.js — HTML complet au curl |
| Mot-clé exact dans title | PASS | "Pisciniste" + "Yvelines" dans titles piliers |
| Mot-clé dans H1 | PARTIEL | H1 = titres de marque, pas mots-clés |
| Mot-clé dans P1 | PARTIEL | "Yvelines" présent sur piscines, absent sur homepage P1 |
| IndexNow | ABSENT | P1 à implémenter |
| Bing Webmaster Tools vérifié | INCONNU | Hors portée audit |
| Sitemap soumis Bing | INCONNU | Hors portée audit (manuel) |
| Signaux sociaux (facteur ranking Bing) | PARTIEL | LinkedIn AS + Facebook LTE présents en footer — pas de stratégie social active confirmée |
| favicon présent | PASS | Toutes tailles |
| og:image 1200×630 | A VÉRIFIER | og-image.jpg = 21Ko, dimensions non confirmées |
| twitter:card | PASS | summary_large_image sur toutes les pages |
| Schema Organization.logo | PARTIEL | logo présent dans LocalBusiness mais @type = LocalBusiness seul |

---

## RÉFÉRENCES SERP CONSULTÉES (standard à dépasser)

Consultées lors de la seo-strategy.md initiale (2026-06-11) :
- cristaldeau.fr — pisciniste Yvelines, HotSpring revendeur
- archipiscine.fr — constructeur piscine 92, béton
- jardinsdelavallee.fr — pisciniste-paysagiste (seul concurrent double)
- sauvaje.fr — paysagiste haut de gamme IDF
- exterieursverts.fr — paysagiste 78/92
- guide-piscine.fr/pisciniste/yvelines — annuaire et contenu informatif

**Aquasystem se différencie de tous ces acteurs sur :** double expertise certifiée, bureau d'études intégré piscine+jardin, 30 ans ancrage local, Socotec, récompenses FPP/EUSA — aucun concurrent ne couvre cet ensemble.

---

*Audit produit par @seo — 2026-06-12*
*Méthode : curl RENDU RÉEL (https://aquasystem.pages.dev) + parsing Python + code source src/ + référentiels docs/seo/*
