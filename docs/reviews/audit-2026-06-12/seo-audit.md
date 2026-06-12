# Audit SEO Live — Aquasystem
## Site : https://aquasystem.pages.dev
## Date : 2026-06-12 | Agent : @seo

> Audit réalisé par curl direct sur le site déployé + lecture du code source.
> Référentiels : `docs/seo/seo-strategy.md`, `docs/seo/keyword-map.md`, `docs/seo/metadata-templates.md`.
> Domaine provisoire `.pages.dev` : non pénalisé en tant que tel, mais l'impact sur les canonicals est documenté.

---

## Résumé exécutif

| Dimension | Score | Statut |
|-----------|-------|--------|
| 1. Metas (title / description / canonical) | 8/10 | Bon — 2 écarts mineurs |
| 2. JSON-LD | 7.5/10 | Solide — 2 problèmes à corriger |
| 3. Sitemap / robots.txt / llms.txt | 8.5/10 | Très bon — 1 point d'attention sitemap |
| 4. Hiérarchie Hn | 9.5/10 | Quasi-parfait |
| 5. Maillage interne | 8/10 | Bon — 2 ancres à améliorer |
| 6. Mots-clés / contenu | 7.5/10 | Bon sur les pages principales, lacune sur /jardins-paysage/ |
| 7. Images (alt / noms de fichiers) | 9/10 | Très bon |
| 8. noindex / index | 8.5/10 | Bon — 2 points à documenter |
| 9. Préparation bascule domaine | 7/10 | Architecture saine, 1 bug sémantique à corriger |

**Score global : 8.1/10**

---

## Note préliminaire : domaine provisoire

Le canonical de toutes les pages pointe vers `https://www.aquasystem.fr/` (fallback `NEXT_PUBLIC_SITE_URL` non configuré dans Cloudflare Pages). Le site est servi sur `aquasystem.pages.dev`. Cela crée un écart canonical/URL effective qui n'est pas pénalisant en phase de développement mais qui **doit être résolu avant toute soumission à Google Search Console ou Bing Webmaster Tools**. Les robots et le sitemap déclarent également `www.aquasystem.fr` comme domaine de référence. La configuration sera propre dès que `NEXT_PUBLIC_SITE_URL` sera défini dans Cloudflare Pages avec le domaine final.

---

## Dimension 1 — Metas (title / description / canonical) : 8/10

### Ce qui fonctionne

- Toutes les pages ont un `<title>`, une `<meta name="description">` et un `<link rel="canonical">` absolus.
- Longueurs conformes sur 8/9 pages (titres testés après décodage HTML entities) :

| Page | Title (chars) | Description (chars) | Status |
|------|:---:|:---:|:---:|
| / | 57 | 131 | PASS |
| /piscines-bien-etre/ | 58 | 139 | PASS |
| /jardins-paysage/ | 50 | 133 | PASS |
| /notre-approche/ | 59 | 141 | PASS |
| /la-maison/ | 58 | 128 | PASS |
| /realisations/ | 50 | 133 | PASS |
| /prescripteurs/ | 53 | 117 | PASS |
| /contact/ | 53 | 147 | PASS |
| /mentions-legales/ | 29 | 97 | PASS (légales) |

- `twitter:card: summary_large_image` défini en layout (confirmé).
- `og:image` 1200×630 accessible (vérifié : HTTP 200, dimensions JPEG correctes).
- `robots: index, follow` explicite sur toutes les pages publiques.
- `/contact/merci/` : `noindex, follow` confirmé.
- Les metas des fiches réalisations (draft) sont générées dynamiquement avec le bon H1.

### Points < 10

**P1 — Fiche réalisation : title non conforme au template `metadata-templates.md`**

Preuve curl (`/realisations/piscine-debordement-foret/`) :
```
TITLE actuel :   "Piscine à débordement en lisière de forêt — Réalisations"
TITLE template : "[titre] — Réalisation Aqua System, [commune]"
```
Le suffix `— Réalisations` (breadcrumb) est utilisé à la place du template `— Réalisation Aqua System, [commune]`. Conséquences : pas de signal "Aqua System" dans le title, pas de commune (signal local Bing manquant). Idem sur toutes les fiches vérifiées (`piscine-paroi-verre-travertin`, `piscine-couloir-demeure-ancienne`, `jardin-bassin-maison-bois`).

**Correctif** dans `src/app/realisations/[slug]/page.tsx`, fonction `generateMetadata` :
```ts
title: { absolute: `${realisation.titre} — Réalisation Aqua System, ${realisation.commune}` }
// Exemple : "Piscine à débordement en lisière de forêt — Réalisation Aqua System, Yvelines"
```
Note : les fiches étant en noindex pour l'instant, ce correctif peut attendre la publication des fiches. À implémenter avant de passer `isDraft: false` sur la première fiche.

**P2 — Descriptions des fiches : absentes de commune**

Les descriptions générées (`"Piscine sur mesure — Yvelines (78). Une réalisation Aqua System dans l'ouest parisien. Parlez-nous de votre projet."`) ne contiennent pas le type exact du projet (débordement, miroir, etc.) — signal de longue traîne manqué. Correctif : utiliser `realisation.description_courte` enrichi dans le template.

---

## Dimension 2 — JSON-LD : 7.5/10

### Ce qui fonctionne

- **2 blocs `LocalBusiness`** sur toutes les pages : Aqua System (complet) + Les Terres Essentielles.
- Aqua System LocalBusiness : `logo`, `telephone`, `sameAs` (3 URLs), `geo`, `areaServed`, `hasOfferCatalog`, `award` (FPP + EUSA), `hasCredential` (Socotec), `memberOf` — tout présent et valide JSON.
- **`BreadcrumbList`** présent sur toutes les pages de niveau 2+ (7 pages confirmées, structure `ListItem` correcte).
- **`FAQPage`** sur `/notre-approche/` (4 questions) et `/prescripteurs/` (4 questions) — structure `Question / Answer` valide pour Rich Results.
- **`Person` (Nicolas Berg)** sur `/la-maison/` avec `jobTitle`, `worksFor`, `image`, `sameAs` LinkedIn + Gens de Confiance.
- **`ImageObject`** sur les fiches réalisations (1 bloc par fiche) avec `contentUrl`, `creator`, `copyrightHolder`.
- Tous les blocs parsent en JSON valide (aucune erreur de syntaxe détectée).

### Points < 10

**P1 — `sameAs` Facebook LTE présent dans le bloc Aqua System (erreur sémantique)**

Preuve curl (accueil, Block 1) :
```json
{
  "@type": "LocalBusiness",
  "name": "Aqua System",
  "sameAs": [
    "https://www.esprit-piscine.fr/aqua-system/",
    "https://www.linkedin.com/company/aqua-system",
    "https://www.facebook.com/LesTerresEssentielles/"  // INCORRECT
  ]
}
```
Le Facebook de Les Terres Essentielles est attribué à Aqua System. Pour les moteurs de recherche, cela associe la page Facebook LTE à l'entité Aqua System, ce qui peut créer une confusion dans le Knowledge Graph.

**Correctif** dans `src/lib/seo.ts`, `organizationJsonLd()` — retirer l'entrée Facebook LTE du bloc Aqua System :
```ts
sameAs: [
  'https://www.esprit-piscine.fr/aqua-system/',
  'https://www.linkedin.com/company/aqua-system',
  // Retirer : 'https://www.facebook.com/LesTerresEssentielles/'
],
```
Le sameAs Facebook LTE reste dans le bloc Les Terres Essentielles (Block 2) — correct.

**P2 — Bloc LTE incomplet (logo, telephone, geo absents)**

Le bloc `LocalBusiness` Les Terres Essentielles (Block 2) n'a pas de `logo`, `telephone`, ni `geo`. C'est acceptable tant que l'acquisition n'est pas actée et le site LTE inexistant. Mais le `telephone` LTE est public (jardinerie physique). À compléter post-acquisition selon la règle seo-strategy.md §C.6.2.

**P2 — `Person` schema : `description` absente**

La fiche Nicolas Berg sur `/la-maison/` n'a pas de champ `description`. Pour les LLMs et le Knowledge Panel, une description courte (bio, expertise, ancrage local) est recommandée par geo-strategy.md. Correctif : ajouter `"description": "Associé-gérant de SARL AQUA SYSTEM, pisciniste haut de gamme dans les Yvelines et les Hauts-de-Seine depuis plus de 30 ans."` dans `nicolasBergJsonLd()`.

---

## Dimension 3 — Sitemap / robots.txt / llms.txt : 8.5/10

### Ce qui fonctionne

**Sitemap (`/sitemap.xml`)** :
- 10 URLs — aucune fiche draft incluse (fiches `isDraft: true` correctement exclues).
- `lastModified: 2026-06-11T00:00:00.000Z` — date fixe, non régénérée à chaque build (conformité Bing anti-spam PASS).
- Toutes les URLs utilisent le domaine `www.aquasystem.fr` avec trailing slash.
- `changeFrequency` et `priority` cohérents par type de page.
- Le sitemap est déclaré dans `robots.txt`.

**robots.txt** :
- Structure multi-agent correcte : `*`, `GPTBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Bytespider`.
- AI crawlers autorisés (coordination @geo respectée).
- `Bytespider` bloqué (scraper de mauvaise qualité).
- `/contact/merci` interdit à tous les bots.
- `Sitemap:` déclaré.

**llms.txt** :
- Accessible (HTTP 200, content-type: text/plain).
- Contenu riche : entités, certifications sourcées, données clés, proposition de valeur, partenaire LTE, pages clés.
- Note : les URLs dans llms.txt utilisent le domaine provisoire `www.aquasystem.fr` — déjà balisé dans le fichier (`# NOTE @fullstack : à substituer post-naming`).

### Points < 10

**P2 — Mentions légales et politique de confidentialité dans le sitemap**

Les URLs `/mentions-legales/` et `/politique-confidentialite/` sont incluses dans le sitemap. Ces pages ont peu de valeur SEO et diluent le crawl budget (minimal pour un site de cette taille, mais principe de propreté). Elles sont indexables (pas de noindex) ce qui est correct, mais les exclure du sitemap est recommandé.

**Correctif** dans `src/app/sitemap.ts` : retirer les 2 entrées légales.

**P2 — IndexNow non implémenté (Bing)**

L'IndexNow n'est pas en place (recommandé dans seo-strategy.md §F.2 P1-SEO-5). Sur un site statique hébergé Cloudflare Pages, l'implémentation la plus simple est un appel POST depuis le webhook de déploiement. Non bloquant en phase `pages.dev`, à implémenter au lancement.

---

## Dimension 4 — Hiérarchie Hn : 9.5/10

### Ce qui fonctionne

Chaque page a exactement **1 seul `<h1>`** — confirmé sur toutes les pages auditées. Aucun saut de niveau (h1 → h3 sans h2).

| Page | H1 | H2s | H3s | Sauts |
|------|:---:|:---:|:---:|:---:|
| / | 1 | 3 | 0 | aucun |
| /piscines-bien-etre/ | 1 | 4 | 0 | aucun |
| /jardins-paysage/ | 1 | 4 | 0 | aucun |
| /notre-approche/ | 1 | 7 | 0 | aucun |
| /la-maison/ | 1 | 3 | 3 | aucun |
| /prescripteurs/ | 1 | 7 | 0 | aucun |
| /contact/ | 1 | 0 | 0 | n/a |
| /realisations/ | 1 | 0 | 0 | n/a |

Hiérarchie sémantiquement propre : H1 = identité de page, H2 = sections thématiques, H3 = sous-sections.

### Point < 10

**P2 — H1 de `/la-maison/` peu keyword-rich**

H1 actuel : `"La maison"`. Le title est excellent (`"Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise"`) mais le H1 n'apporte pas de signal local ou sémantique. Pour Bing, la cohérence title/H1 est un facteur. Recommandation : envisager `"La maison — Aqua System"` ou conserver tel quel si le ton editorial prime (le sous-titre H2 `"Notre histoire"` + copy compensent partiellement).

---

## Dimension 5 — Maillage interne : 8/10

### Ce qui fonctionne

- Toutes les pages sont accessibles en **≤ 1 clic** depuis la navigation principale.
- Le maillage contextuel existe sur les pages de service (cross-selling entre /piscines-bien-etre/ et /jardins-paysage/).
- Contact accessible depuis toutes les pages (header CTA + liens dans les sections).
- Les pages profondes `/realisations/[slug]/` ont des liens retour vers `/realisations/` et vers la page de service correspondante (BreadcrumbList + liens visuels).

### Points < 10

**P1 — Ancre de navigation `/prescripteurs/` = "Architectes" (non descriptif pour les moteurs)**

Preuve curl (navigation de toutes les pages) :
```
[/prescripteurs/] 'Architectes'
```
La recommandation de `metadata-templates.md` est "Espace prescripteurs". "Architectes" est acceptable pour l'UX (persona Camille s'y reconnaît immédiatement) mais c'est un signal sémantique perdu pour le clustering "prescripteur / architecte paysagiste" visé dans `keyword-map.md` Cluster 5. Le compromis actuel a été documenté par @qa comme intentionnel — à maintenir ou ajuster selon le retour fondateur.

**P1 — Ancres de maillage contextuel génériques sur certaines pages**

Sur `/realisations/`, `/notre-approche/`, `/la-maison/` : les CTA principaux de maillage utilisent des ancres génériques :
- `"Piscines et spas"` (au lieu de `"Piscines sur mesure en Yvelines — Aqua System"`)
- `"Jardins et parcs"` (au lieu de `"Jardins et parcs sur mesure en 78/92"`)

Ces ancres sont dans le footer et les blocs cross-selling. Les ancres recommandées dans `metadata-templates.md` §"Ancres de maillage" sont plus descriptives. Impact modéré (le footer est un signal faible), mais le maillage contextuel (dans le corps de page) est conforme et plus impactant.

**P2 — `/realisations/` ne contient aucun lien vers les fiches dans l'HTML statique**

Preuve curl : la grille de réalisations sur `/realisations/` est chargée côté client (JavaScript). L'HTML statique de la page ne contient aucun lien vers `/realisations/[slug]/`. Les bots (en particulier Bing avec son rendu JS limité) ne voient aucun lien vers les fiches depuis la page hub. **Impact limité** tant que les fiches sont en noindex, mais c'est un point à corriger avant la publication des fiches.

---

## Dimension 6 — Mots-clés / contenu : 7.5/10

### Ce qui fonctionne

- `/piscines-bien-etre/` : "pisciniste", "Yvelines", "piscine sur mesure", "Socotec", "HotSpring" tous présents — Cluster 1 et 2 bien couverts.
- `/la-maison/` : "30 ans", "Freneuse", "Socotec", "Esprit Piscine", "Nicolas Berg" tous présents — E-E-A-T page solide.
- Accueil : "pisciniste", "78/92", "Yvelines", "sur mesure" présents dans le body.
- `/prescripteurs/` : "architecte", "prescripteur", "pisciniste", "78/92" tous présents.
- `/notre-approche/` : FAQPage répond aux PAA identifiés dans keyword-map.md (zones d'intervention, certifications, première prise de contact, double expertise).

### Points < 10

**P1 — `/jardins-paysage/` : mots-clés Bing (P1 Bing) absents du `<main>` statique**

Preuve curl (contenu du `<main>`) :
```
ABSENT dans <main> : 'yvelines', 'bureau d'études', '78', 'jardin sur mesure'
PRESENT dans <main> : 'paysagiste', 'terres essentielles', 'sur mesure'
```

Le contenu "paysagiste Yvelines" est dans le `<head>` (title, description) et probablement dans le corps de page (rendu JS), mais le contenu statique parseable sans JS ne contient pas "Yvelines" ni "78". Bing indexe avec un rendu JS faible — c'est le cluster 3 (`paysagiste Yvelines` = mot-clé P0) qui est le plus exposé.

**Analyse** : le problème vient du fait que le texte "Yvelines" est dans les blocs qui ne font pas partie du composant `<main>` initial (il est dans les sections chargées via React/JSX mais rendus en SSG). Il faut vérifier si le SSG exporte réellement ce contenu ou si c'est un artefact de parsing. Le titre H1 est "Jardins & Paysage" et le sous-titre contient "bureau d'études paysager, création de parcs et jardins d'exception" — sans mention de "Yvelines" ni "78".

**Correctif recommandé** : s'assurer que la phrase d'accroche visible "en Yvelines et Hauts-de-Seine" apparaît dans les 100 premiers mots du contenu principal (P1 Bing). Le copy `site-copy.md` §WF-03 le prévoit — à vérifier si c'est bien dans le composant Hero ou dans une section chargée plus tard.

**P2 — "jardin sur mesure" absent du contenu visible de `/jardins-paysage/`**

Le terme "jardin sur mesure" (Cluster 3, P0) n'apparaît pas dans le contenu statique parseable. La page préfère "jardins d'exception", "jardins sur-mesure" ou des formulations branding. Un occurrence naturelle de "jardin sur mesure" dans le premier paragraphe ou une H2 renforcerait le signal sans dégrader le ton.

**P2 — Accueil : "paysagiste" et "Hauts-de-Seine" absents du `<main>` statique**

Même logique que /jardins-paysage/ : ces termes sont dans le footer (navigation) mais pas dans le contenu principal parseable. Impact moindre car la page d'accueil cible d'abord le différenciateur double expertise, pas un mot-clé générique.

---

## Dimension 7 — Images (alt / noms de fichiers) : 9/10

### Ce qui fonctionne

- Toutes les images auditées ont un `alt` text présent et non vide (0 image sans alt sur accueil, /piscines-bien-etre/).
- Les alt texts des fiches réalisations sont factuels et descriptifs :
  ```
  "Piscine à débordement bordée d'une terrasse en bois et d'une pelouse, plan d'eau ouvert sur
  une forêt de pins, mur en pierre, transats au bord — réalisation Aqua System, Yvelines (78)"
  ```
- Noms de fichiers sémantiques : `piscine-debordement-foret-1280w.webp`, `projet-bassin-jardin-paysage-800w.webp`.
- `og:image` alt défini dans les generateMetadata (vérifié dans metadata-templates).
- Photos jardinerie : alt factuels ("serre de la jardinerie", pas "jardin réalisé") — conformité éditoriale respectée.

### Point < 10

**P2 — /realisations/ : 0 image dans le HTML statique**

La page hub `/realisations/` ne contient aucune image dans l'HTML parseable (les cards de réalisation sont rendues JS). Les bots sans JS voient une page sans aucune image. Cela pénalise le signal visuel de richesse de contenu. Même observation que la dimension 5 : impact limité tant que les fiches sont noindex, à résoudre simultanément avec la publication des fiches.

---

## Dimension 8 — noindex corrects : 8.5/10

### Ce qui fonctionne

- `/contact/merci/` : `noindex, follow` confirmé.
- Toutes les 14 fiches `isDraft: true` : `noindex` confirmé sur chacune.
- Toutes les pages publiques principales (/, /piscines-bien-etre/, /jardins-paysage/, /notre-approche/, /la-maison/, /realisations/, /prescripteurs/, /contact/, /mentions-legales/, /politique-confidentialite/) : `index, follow` confirmé.
- Aucun noindex accidentel sur les pages publiques principales.

### Points < 10

**P1 — Les fiches draft sont liées depuis `/prescripteurs/` (liens publics vers pages noindex)**

Preuve curl (`/prescripteurs/`) — 3 fiches liées directement dans le corps de page :
```
[/realisations/piscine-paroi-verre-travertin/]     noindex confirmé
[/realisations/piscine-couloir-demeure-ancienne/]   noindex confirmé
[/realisations/projet-piscine-jardin-banquette/]    noindex confirmé
```
Ces liens mènent vers des pages noindex. Ce n'est pas une erreur critique (les bots suivent les liens même vers des pages noindex, le jus de lien est perdu mais la page n'est pas pénalisée), mais c'est un signal de maturité SEO faible. La page `/prescripteurs/` est la seule page de conversion B2B — elle mérite des liens vers des fiches publiées.

**Recommandation** : dès que la première fiche est publiée (`isDraft: false`), s'assurer que les 3 fiches liées depuis `/prescripteurs/` sont parmi les premières publiées. Critère de sélection : choisir les fiches avec les photos les plus qualitatives.

**P2 — `/mentions-legales/` et `/politique-confidentialite/` sont indexables ET dans le sitemap**

Ces pages ont `robots: index, follow` (correct) mais sont aussi dans le sitemap (consomme du crawl budget inutilement). Voir dimension 3. Pas de noindex recommandé sur ces pages (LCEN/CNIL impose leur accessibilité) — seulement les retirer du sitemap.

---

## Dimension 9 — Préparation bascule domaine : 7/10

### Ce qui fonctionne

- Architecture `NEXT_PUBLIC_SITE_URL` correcte : toutes les URLs sont générées depuis `src/lib/seo.ts` via `absoluteUrl()`.
- Grep du code confirme : 0 URL `aquasystem.fr` en dur dans les composants — seulement dans `src/lib/seo.ts` (le fallback), `src/lib/constants.ts` (commentaire) et `src/content/realisations.ts` (commentaire).
- Le fallback dans `seo.ts` est documenté comme provisoire.
- `public/llms.txt` contient une note `@fullstack` demandant la substitution post-naming.
- `public/_redirects` avec les 10 redirections 301 depuis `aqua-system.fr` est prêt (commenté — à activer à la bascule).

### Points < 10

**P0 — `NEXT_PUBLIC_SITE_URL` non configuré dans Cloudflare Pages (environnement de production)**

Preuve curl : canonical de l'accueil = `https://www.aquasystem.fr/` alors que le site est servi sur `aquasystem.pages.dev`. Le fallback hardcodé est utilisé. Conséquence : si un bot crawle `aquasystem.pages.dev` et suit le canonical `www.aquasystem.fr`, il va sur un domaine différent (non configuré) et peut créer une confusion ou une duplication.

Ce point était documenté dans `seo-strategy.md §C.4` comme P0 avant lancement. Il est toujours en attente. La variable doit être configurée dans Cloudflare Pages (Settings > Environment Variables > Production) dès que le domaine final est connu — ou au minimum pointer vers `aquasystem.pages.dev` en attendant.

**P1 — sameAs Facebook LTE dans le JSON-LD Aqua System (déjà noté D2)**

Ceci impacte aussi la préparation à la bascule : quand le domaine final sera configuré, ce sameAs incorrect sera soumis au Knowledge Graph de Google avec le mauvais attribut. À corriger avant soumission à Search Console.

**P2 — `llms.txt` URLs provisoires non substituées**

Les URLs dans `/llms.txt` utilisent `https://www.aquasystem.fr` (fallback). Ce fichier est statique (non interpolé au build). La note est en place, mais l'action doit être tracée pour la bascule.

---

## Résumé des correctifs priorisés

### P0 — Bloquant avant soumission Search Console / indexation

| # | Problème | Correctif | Fichier |
|---|----------|-----------|---------|
| P0-1 | `NEXT_PUBLIC_SITE_URL` non configuré — canonical pointe vers `www.aquasystem.fr` sur un site servi en `.pages.dev` | Configurer dans Cloudflare Pages > Environment Variables avec le domaine final (ou `aquasystem.pages.dev` en attendant) | Cloudflare Dashboard |
| P0-2 | `sameAs` Facebook LTE dans le bloc JSON-LD Aqua System (erreur d'attribution d'entité) | Retirer `'https://www.facebook.com/LesTerresEssentielles/'` du tableau `sameAs` d'Aqua System dans `organizationJsonLd()` | `src/lib/seo.ts` |

### P1 — Avant publication des premières fiches réalisations

| # | Problème | Correctif | Fichier |
|---|----------|-----------|---------|
| P1-1 | Title des fiches non conforme : `"[titre] — Réalisations"` au lieu de `"[titre] — Réalisation Aqua System, [commune]"` | Modifier `generateMetadata` pour utiliser `title: { absolute: \`${realisation.titre} — Réalisation Aqua System, ${realisation.commune}\` }` | `src/app/realisations/[slug]/page.tsx` |
| P1-2 | `/jardins-paysage/` : "Yvelines" et "78" absents du contenu statique parseable | S'assurer que la phrase d'accroche Hero contient "en Yvelines et Hauts-de-Seine" dans les 100 premiers mots du `<main>` — vérifier le rendu SSG | `src/app/jardins-paysage/page.tsx` |
| P1-3 | Fiches draft liées depuis `/prescripteurs/` : 3 liens publics vers des pages noindex | Prioriser la publication des fiches `piscine-paroi-verre-travertin`, `piscine-couloir-demeure-ancienne`, `projet-piscine-jardin-banquette` dès que les données sont confirmées | `src/content/realisations.ts` (`isDraft: false`) |
| P1-4 | `/realisations/` : grille non rendue en HTML statique (0 fiche dans le HTML) | Vérifier que le SSG exporte bien les fiches dans le HTML — si les cards sont en client-only, envisager un rendu serveur de la liste (même partiel) pour les bots Bing | `src/app/realisations/page.tsx` |

### P2 — Dans les 30 jours post-lancement

| # | Problème | Correctif | Fichier |
|---|----------|-----------|---------|
| P2-1 | Mentions légales + politique de confidentialité dans le sitemap | Retirer les 2 entrées du sitemap | `src/app/sitemap.ts` |
| P2-2 | `Person` schema Nicolas Berg : `description` absente | Ajouter `"description"` dans `nicolasBergJsonLd()` | `src/lib/seo.ts` |
| P2-3 | "jardin sur mesure" absent du contenu /jardins-paysage/ | Insérer le terme naturellement dans le premier paragraphe ou une H2 | `src/app/jardins-paysage/page.tsx` ou copy |
| P2-4 | IndexNow non implémenté (Bing) | Implémenter le ping IndexNow post-déploiement Cloudflare Pages | `seo-strategy.md §F.2 P1-SEO-5` |
| P2-5 | Descriptions fiches : ne contiennent pas le type de piscine/jardin | Enrichir `realisation.description_courte` dans le manifeste | `src/content/realisations.ts` |

---

## Ce qui est exemplaire (à ne pas toucher)

- Structure technique SSG + trailing slash + canonicals absolus : architecture Bing-compatible.
- `lastModified` du sitemap en date fixe : conformité anti-spam Bing.
- robots.txt multi-agents avec Bytespider bloqué et AI crawlers autorisés.
- 2 blocs `LocalBusiness` distincts avec `@id` uniques.
- `FAQPage` sur /notre-approche/ et /prescripteurs/ : structure valide, questions alignées sur les PAA identifiés.
- `hasOfferCatalog`, `award`, `hasCredential` dans le JSON-LD Aqua System : rare dans le secteur, fort signal E-E-A-T.
- Alt texts des fiches : factuels, descriptifs, contenant le nom de marque et la zone géographique.
- OG image 1200×630 accessible et conforme.
- Cache-control : assets statiques Next.js (`immutable`, 1 an), images WebP (30j + stale-while-revalidate), fonts (immutable). Conforme aux recommandations de `infrastructure.md`.
- `/contact/merci/` : noindex confirmé, aucun accidentel sur les pages publiques.

---

## Checklist bascule domaine

Prête à cocher au moment du passage au domaine final :

- [ ] Configurer `NEXT_PUBLIC_SITE_URL` dans Cloudflare Pages (sans trailing slash, avec www ou non — décision cohérente).
- [ ] Activer les redirections 301 dans `public/_redirects` (décommenter les lignes).
- [ ] Substituer le domaine dans `public/llms.txt` (Grep `aquasystem.fr` dans le fichier).
- [ ] Corriger le `sameAs` Facebook LTE dans `src/lib/seo.ts` (P0-2).
- [ ] Redéclencher un build Cloudflare Pages (toutes les URLs seront mises à jour via `absoluteUrl()`).
- [ ] Soumettre le sitemap dans Google Search Console.
- [ ] Soumettre le sitemap dans Bing Webmaster Tools.
- [ ] Vérifier les propriétés Google Search Console + Bing Webmaster Tools post-bascule.

---

*Audit réalisé par @seo — 2026-06-12*
*Sources : curl live sur https://aquasystem.pages.dev, src/lib/seo.ts, src/app/**/page.tsx, docs/seo/*.*
