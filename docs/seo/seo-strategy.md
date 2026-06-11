# Stratégie SEO — Aquasystem × Aqua System × Les Terres Essentielles
## Site vitrine umbrella — Zone 78/92 — SEO LOCAL prioritaire

> Document interne — usage @seo, @geo, @fullstack, @orchestrator.
> Source : project-context.md, site-copy.md, verbal-identity.md, competitive-benchmark.md, code src/.
> Noms de concurrents réservés à ce document (règle CLAUDE.md n°9).
> Dernière mise à jour : 2026-06-11 | Agent : @seo

---

## 0. Situation de départ

| Élément | État |
|---------|------|
| Site umbrella | En construction — export statique Next.js 14, 28 routes générées, déployé sur Cloudflare Pages |
| Domaine ombrelle | Non défini (NEXT_PUBLIC_SITE_URL = placeholder `aquasystem.fr` provisoire) |
| aqua-system.fr | Indexé de longue date, pages connues (10+ URLs indexées dont galerie, votre-piscine, spa HotSpring, saunas) |
| Google Business | Fiche Aqua System existante (à optimiser). Fiche Les Terres Essentielles : absente |
| Sitemap | ABSENT — à générer au build |
| robots.txt | ABSENT — à créer |
| llms.txt | ABSENT — à créer |
| Structured data | JSON-LD LocalBusiness posé en layout (Organization + LocalBusiness mixte) — incomplet : pas de 2e établissement, pas de BreadcrumbList, pas d'ImageObject |
| KPI cible | 10 leads qualifiés/mois, ≥ 20% trafic organique à M+3 |

---

## A. Stratégie SEO LOCAL

### A.1 Google Business Profile — Arbitrage et séquencement

**Situation actuelle** : 1 fiche GBP existante pour Aqua System (Freneuse, 78). Aucune fiche pour Les Terres Essentielles.

**Décision : 2 fiches distinctes + fiche ombrelle différée**

| Fiche | Statut | Action |
|-------|--------|--------|
| Aqua System (Freneuse) | Existante | Optimiser immédiatement (P0) |
| Les Terres Essentielles (Les Alluets-le-Roi) | À créer | Créer après confirmation acquisition (P1) |
| Marque ombrelle | Différée | Créer uniquement après naming final + domaine résolu (P2) — risque de confusion de marque si créée avant |

**Justification de l'arbitrage** : Une fiche GBP par entité légale et adresse physique distincte est la règle Google (2 SIREN, 2 adresses). La fiche ombrelle n'a pas encore d'adresse ni de raison sociale propre — la créer maintenant générerait une fiche orpheline pénalisante.

**Optimisation fiche Aqua System — checklist P0** :

- Catégorie principale : "Pisciniste" (ou "Construction de piscines") — vérifier la catégorie actuelle et actualiser
- Catégories secondaires : "Spa et bain à remous", "Sauna", "Entretien de piscine"
- NAP exact : SARL AQUA SYSTEM — 45 Route Nationale — 78840 Freneuse — 01 30 42 26 00 — contact@aqua-system.fr
- Description (750 caractères max) : intégrer "piscines sur mesure", "Yvelines", "78/92", "L'Esprit Piscine", "Socotec", "HotSpring", "plus de 30 ans" — éviter les termes génériques
- Photos : a minima 10 photos de réalisations réelles (pool + jardin), photo de l'équipe, photo du showroom/site (droits à vérifier avec le fondateur)
- Horaires : à jour (SAV actif)
- Lien site : pointer vers le nouveau domaine ombrelle après lancement (pas aqua-system.fr qui sera redirigé)
- Attributs : "Rendez-vous en personne", certifications professionnelles si disponibles en attributs GBP
- Services : lister Conception piscine, Construction piscine, Rénovation piscine, Entretien annuel, Spas HotSpring, Saunas, Hammams, Traitement d'eau

**Création fiche Les Terres Essentielles (P1)** :

- À déclencher après confirmation juridique de l'acquisition (project-context.md Notes libres)
- Catégorie principale : "Paysagiste" ou "Aménagement de jardins"
- Catégories secondaires : "Jardinerie", "Bureau d'études paysager", "Entretien de jardins"
- NAP : SAS LES TERRES ESSENTIELLES — CD n°45, Route d'Orgeval — 78580 Les Alluets-le-Roi
- Note : ne pas créer avec les informations de gouvernance LTE incertaines (Patrick Rouzeval vs Nicolas Berg — cf. project-context.md)

### A.2 Cohérence NAP

**NAP de référence Aqua System** (à répliquer à l'identique partout) :
```
SARL AQUA SYSTEM
45 Route Nationale
78840 Freneuse
01 30 42 26 00
contact@aqua-system.fr
```

**NAP de référence Les Terres Essentielles** :
```
LES TERRES ESSENTIELLES
CD n°45, Route d'Orgeval
78580 Les Alluets-le-Roi
```

Règle stricte : le NAP doit être IDENTIQUE (virgule, abréviation, espace) sur le site, GBP, PagesJaunes, Houzz et tous les annuaires. Toute divergence affaiblit la confiance locale.

### A.3 Citations locales — Priorités

| Annuaire | Priorité | Entité | Action |
|----------|----------|--------|--------|
| PagesJaunes.fr | P0 | Aqua System | Vérifier/créer fiche + NAP exact |
| Houzz.fr | P0 | Aqua System | Créer profil pro avec portfolio (prescripteurs Camille y sont présents) |
| esprit-piscine.fr | P0 | Aqua System | Fiche membre existante (lien de valeur) — vérifier que l'URL du site pointe vers le nouveau domaine après lancement |
| Propiscines / guide-piscine.fr | P1 | Aqua System | Créer ou réclamer la fiche |
| BatiPrix / annuaires BTP locaux | P1 | Aqua System | Fiche entreprise |
| Societe.com / Pappers.fr | P1 | Les deux | Vérifier les données automatiques (SIREN, adresse) — pas de création, juste vérification |
| Houzz.fr | P1 | Les Terres Essentielles | Après acquisition confirmée |
| Architectes.org / annuaires DPLG | P2 | Les deux | Référencement partenaire prescripteurs |

### A.4 Stratégie d'avis Google

**Collecte éthique uniquement — aucun avis fictif ni incitation monétaire**

Phase 1 — Clients actifs (M+0 à M+3) :
1. Après chaque livraison ou contrat d'entretien signé, Nicolas Berg envoie personnellement un email de suivi satisfaction avec le lien direct vers la fiche GBP (lien court Google Reviews)
2. Mention orale en fin de chantier : "Si votre expérience vous a satisfait, un avis Google nous aide beaucoup à être trouvés par des propriétaires ayant des projets similaires dans le secteur"
3. Ne jamais conditionner une remise ou un service à la publication d'un avis (pratique interdite Google)
4. Répondre à TOUS les avis (positifs et négatifs) sous 72h — réponses sobres, professionnelles, sans nommer les clients

Phase 2 — Clients historiques (M+1 à M+6) :
- Mailing aux 350+ propriétaires de piscines entretenues — "Nous lançons notre nouveau site, votre avis Google nous serait précieux"
- Ne contacter qu'une fois par client

**Objectif réaliste à M+6** : 20+ avis, note ≥ 4,5. Le volume d'avis est un signal local ranking fort — priorité à la quantité d'abord, qualité suit naturellement.

### A.5 Pages géolocalisées V2 — Décision et justification

**Verdict : NE PAS créer de pages géolocalisées en V1. Préparation V2 documentée ici.**

Justification anti-thin-content :
- En V1, le site ne dispose pas encore de contenu de blog, de données chantiers granulaires par commune, ni de témoignages clients géolocalisés. Créer une page "Pisciniste Le Vésinet" sans contenu spécifique = thin content pénalisant.
- L'ancrage géographique est déjà présent dans toutes les pages via le copy ("78/92", "ouest parisien", "Yvelines", "Hauts-de-Seine") — suffisant pour les signaux locaux en V1.
- Les fiches GBP + citations NAP + schéma LocalBusiness areaServed couvrent la géographie sans thin content.

**Plan V2 — pages géolocalisées valides** (après ≥ 3 réalisations documentées par commune) :

| Page | Justification de valeur |
|------|------------------------|
| /piscines-le-vesinet | Volume de recherche local + propriétés patrimoniales = persona Alexandre parfait |
| /piscines-saint-nom-la-breteche | Commune haut de gamme, terrain de golf = clients cibles |
| /piscines-marly-le-roi | Forte densité de propriétés, proximité Freneuse |
| /jardins-versailles | LTE : parc, bureau d'études paysager, proximité ENSP = légitimité |
| /piscines-ville-davray | 92 haut de gamme, communes limitrophes Paris |

Condition de déclenchement V2 : ≥ 3 réalisations documentées par commune (photos réelles + données projet) + ≥ 1 témoignage client par page ou à défaut un contenu local factuel unique (PLU, sol, histoire du lieu). Sans ces prérequis, la page reste en noindex ou n'est pas créée.

---

## B. Topical Authority Map — Vitrine sans blog V1

### B.1 Topic principal

**Aménagement extérieur haut de gamme, propriétés Yvelines et Hauts-de-Seine**

### B.2 Piliers couverts par les pages V1 existantes

| Pilier | Page(s) couvrante(s) | Clusters sémantiques couverts |
|--------|---------------------|-------------------------------|
| Construction de piscines sur mesure | /piscines-bien-etre | piscine sur mesure, constructeur piscine 78, piscine béton, piscine débordement, pisciniste Yvelines |
| Bien-être aquatique | /piscines-bien-etre | spa HotSpring, sauna, hammam, bain à remous, traitement d'eau |
| Aménagement paysager | /jardins-paysage | paysagiste 78, création jardin, entretien parc, bureau d'études paysager, jardin sur mesure |
| Réalisations locales | /realisations + /realisations/[slug] | portfolio 78/92, preuves sociales géolocalisées, projets réels |
| Approche et méthode | /notre-approche | interlocuteur unique, bureau d'études intégré, suivi long terme |
| Identité et confiance | /la-maison | 30 ans expertise, Socotec, L'Esprit Piscine, équipe, ancrage Freneuse |
| Espace prescripteurs | /prescripteurs | partenaire architecte, exécutant haut de gamme, DCE, relation client protégée |

### B.3 Clusters reportés V2 — Plan esquissé

**Cluster 1 : Entretien et SAV piscine** (fort volume, longue traîne commerciale)
- Nœuds : contrat entretien piscine 78, traitement eau piscine, robot piscine Dolphin, hivernage piscine
- Format : FAQ + page service dédiée
- Déclencheur : trafic organique V1 ≥ 5 leads/mois (validation que le SEO fonctionne avant d'investir en contenu)

**Cluster 2 : Pages géolocalisées** (voir A.5 ci-dessus)
- Communes cibles : Le Vésinet, Saint-Nom-la-Bretèche, Marly-le-Roi, Ville-d'Avray, Versailles (LTE)

**Cluster 3 : Guides et contenus informationnels** (blog V2)
- "Combien coûte une piscine sur mesure en 2026 ?" (fort PAA)
- "Pisciniste ou constructeur : quelle différence ?"
- "Quelle piscine pour un terrain en pente ?"
- "Permis de construire pour une piscine dans les Yvelines"
- "HotSpring vs autres marques de spa"

**Cluster 4 : Produits complémentaires** (entretien jardin, jardinerie LTE)
- Nœuds : entretien jardin domaine, pépinière Yvelines, plantes pour sol argilo-calcaire

---

## C. Audit technique — Code réel src/

### C.1 Sitemap — ABSENT — Solution pour export statique

**Problème** : export statique Next.js (`output: 'export'`) ne génère pas de sitemap.ts côté serveur par défaut. La route handler `app/sitemap.ts` doit être marquée `force-static`.

**Solution recommandée** (à implémenter par @fullstack — P0) :

Créer `src/app/sitemap.ts` :
```ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// force-static est requis pour l'export statique Next.js
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-11'); // DATE FIXE — JAMAIS new Date() au runtime
  // Bing pénalise un lastModified qui change à chaque build (signal spam).
  // Mettre à jour manuellement lors d'une vraie modification de contenu.

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/piscines-bien-etre/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/jardins-paysage/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/realisations/`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/notre-approche/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/la-maison/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/prescripteurs/`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    // /realisations/[slug] — 14 fiches réalisations
    // À compléter : itérer sur realisations.ts et ajouter chaque slug ici
    // Exclure : /contact/merci (noindex), /mentions-legales, /politique-confidentialite
  ];
}
```

**Règle Bing critique** : `lastModified` doit être une date fixe (date de dernière vraie modification), jamais `new Date()`. Une date qui change à chaque build = signal spam pour Bing Webmaster.

Après déploiement : soumettre le sitemap dans Bing Webmaster Tools ET Google Search Console.

### C.2 robots.txt — ABSENT

**Solution** (à créer par @fullstack — P0) :

Créer `src/app/robots.ts` :
```ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/contact/merci'] },
      // AI crawlers : autorisés par défaut (coordination @geo — llms.txt recommandé)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // Bloqué : scraper de mauvaise qualité
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

### C.3 llms.txt — ABSENT (à créer, valeur IDE + GEO)

Créer `public/llms.txt` (fichier statique, pas de route handler — plus simple) :

```
# Aquasystem — Aqua System × Les Terres Essentielles
# Pisciniste et paysagiste haut de gamme, Yvelines (78) et Hauts-de-Seine (92)

## Identité
Aqua System est un pisciniste spécialisé dans la conception, construction et entretien de piscines sur mesure dans l'ouest parisien depuis plus de 30 ans. Certification Socotec CSP/ESP-001. Membre du réseau L'Esprit Piscine. Revendeur agréé HotSpring.

Les Terres Essentielles est un paysagiste et bureau d'études paysager basé à Les Alluets-le-Roi (78580), spécialisé dans la création et l'entretien de parcs et jardins sur mesure pour les belles propriétés de l'ouest parisien.

## Pages clés
- Accueil : {SITE_URL}/
- Piscines & Bien-être : {SITE_URL}/piscines-bien-etre/
- Jardins & Paysage : {SITE_URL}/jardins-paysage/
- Réalisations : {SITE_URL}/realisations/
- Notre approche : {SITE_URL}/notre-approche/
- La maison : {SITE_URL}/la-maison/
- Architectes et prescripteurs : {SITE_URL}/prescripteurs/
- Contact : {SITE_URL}/contact/

## Usage autorisé
Les contenus de ce site peuvent être utilisés par les moteurs de recherche IA pour répondre aux questions des utilisateurs sur les piscines, l'aménagement paysager, l'extérieur haut de gamme et les prestataires dans les Yvelines et les Hauts-de-Seine.
```

Note : coordonner avec @geo pour enrichir ce fichier avec les entités et claims prioritaires (verbatim.md, métaphores fondatrices).

### C.4 Canonical — Vérification NEXT_PUBLIC_SITE_URL

**Constat code** (`src/lib/seo.ts`) :
```ts
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aquasystem.fr'
).replace(/\/$/, '');
```

**Problème** : le fallback `'https://www.aquasystem.fr'` est un placeholder provisoire. En export statique, les variables d'environnement `NEXT_PUBLIC_*` sont injectées au BUILD, pas au runtime.

**Action requise avant lancement** (P0 — @fullstack) :
1. Configurer `NEXT_PUBLIC_SITE_URL` dans Cloudflare Pages (Settings > Environment Variables)
2. Valeur = URL définitive avec www ou sans, HTTPS, sans slash final
3. Le canonical de la homepage est `SITE_URL` sans slash (correct pour Bing — canonical absolu obligatoire)
4. Toutes les autres pages utilisent `absoluteUrl('/chemin/')` — correct avec trailing slash (trailingSlash:true en next.config.mjs)

**Cohérence www vs sans-www** : trancher définitivement dans NEXT_PUBLIC_SITE_URL et implémenter une redirection 301 côté Cloudflare (règle de redirect) de l'autre version vers la version canonique.

### C.5 hreflang — Préparé, pas actif V1

L'architecture i18n-ready est en place (constants.ts, generateStaticParams V2). En V1, aucune balise hreflang à poser — les mettre sans page EN existante serait une erreur Bing/Google.

Action V2 : quand la version EN sera déployée, ajouter dans le layout :
```html
<link rel="alternate" hreflang="fr" href="{SITE_URL}/chemin/" />
<link rel="alternate" hreflang="en" href="{SITE_URL}/en/chemin/" />
<link rel="alternate" hreflang="x-default" href="{SITE_URL}/" />
```

### C.6 Données structurées — Specs JSON-LD à implémenter

**Situation actuelle** : 1 seul JSON-LD dans layout.tsx — type LocalBusiness avec adresse Aqua System uniquement.

**À ajouter (P0 — @fullstack)** :

#### C.6.1 — Enrichir le LocalBusiness Aqua System existant

Modifier `src/lib/seo.ts`, fonction `organizationJsonLd()` :

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "{SITE_URL}/#organization-aquasystem",
  "name": "Aqua System",
  "legalName": "SARL AQUA SYSTEM",
  "description": "Pisciniste haut de gamme en Yvelines et Hauts-de-Seine. Conception, construction et entretien de piscines sur mesure depuis plus de 30 ans. Certification Socotec CSP/ESP-001.",
  "url": "{SITE_URL}",
  "telephone": "+33130422600",
  "email": "contact@aqua-system.fr",
  "sameAs": [
    "https://www.esprit-piscine.fr/aqua-system/",
    "https://www.linkedin.com/company/aqua-system"
  ],
  "logo": {
    "@type": "ImageObject",
    "url": "{SITE_URL}/favicon.svg",
    "width": 512,
    "height": 512
  },
  "image": "{SITE_URL}/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 Route Nationale",
    "postalCode": "78840",
    "addressLocality": "Freneuse",
    "addressRegion": "Yvelines",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.0154,
    "longitude": 1.5432
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Yvelines" },
    { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Aqua System",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction de piscines sur mesure" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rénovation de piscines" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Entretien annuel de piscines" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Installation de spas HotSpring" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Saunas et hammams" } }
    ]
  }
}
```

Note sur les coordonnées géo : vérifier les coordonnées exactes de Freneuse avant implémentation (les valeurs ci-dessus sont approximatives — [À CONFIRMER avec Google Maps / API Geocoding]).

#### C.6.2 — Ajouter LocalBusiness Les Terres Essentielles (en partenariat)

À ajouter dans le layout.tsx en 2e bloc JSON-LD (P1 — après confirmation acquisition) :

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "{SITE_URL}/#organization-lte",
  "name": "Les Terres Essentielles",
  "description": "Paysagiste et bureau d'études paysager en Yvelines. Création et entretien de parcs et jardins sur mesure pour les belles propriétés de l'ouest parisien.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "CD n°45, Route d'Orgeval",
    "postalCode": "78580",
    "addressLocality": "Les Alluets-le-Roi",
    "addressRegion": "Yvelines",
    "addressCountry": "FR"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Yvelines" },
    { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" }
  ],
  "sameAs": [
    "https://www.facebook.com/LesTerresEssentielles/"
  ]
}
```

#### C.6.3 — BreadcrumbList (par page, sauf homepage)

À ajouter dans chaque page.tsx de niveau 2+ via generateMetadata ou composant dédié :

Exemple `/piscines-bien-etre/page.tsx` :
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "{SITE_URL}/" },
    { "@type": "ListItem", "position": 2, "name": "Piscines & Bien-être", "item": "{SITE_URL}/piscines-bien-etre/" }
  ]
}
```

#### C.6.4 — ImageObject pour le portfolio (sur chaque fiche réalisation)

Sur `/realisations/[slug]/page.tsx`, ajouter par photo principale :
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "{SITE_URL}/images/realisations/{slug}-hero-1200w.webp",
  "name": "Piscine à débordement — Réalisation Aqua System, {commune}, Yvelines",
  "description": "Conception et construction d'une piscine sur mesure par Aqua System dans les Yvelines.",
  "creator": { "@type": "Organization", "name": "Aqua System" },
  "copyrightHolder": { "@type": "Organization", "name": "SARL AQUA SYSTEM" },
  "license": "https://creativecommons.org/licenses/by-nc-nd/4.0/"
}
```

---

## D. E-E-A-T

### D.1 Page /la-maison — Déjà riche, à compléter

La page /la-maison couvre : histoire 30 ans, équipe 8, Freneuse, certifications. C'est la page E-E-A-T principale.

Actions à ajouter :
- Photo de Nicolas Berg avec nom et titre "Fondateur, Aqua System" (balisée [À CONFIRMER] dans site-copy.md — P1)
- Baliser les certifications Socotec et L'Esprit Piscine en `schema:Certification` imbriqué dans le JSON-LD LocalBusiness
- Lien sortant vers l'annuaire esprit-piscine.fr/aqua-system/ (source externe qui valide les credentials)
- Mentionner explicitement le SIREN 903 785 327 dans les mentions légales (déjà prévu) — signal légal fort

### D.2 Stratégie backlinks locaux

| Source | Opportunité | Priorité | Action |
|--------|-------------|----------|--------|
| esprit-piscine.fr | Lien membre déjà présent (fiche Aqua System) | P0 | Vérifier que le lien pointe vers le nouveau domaine après lancement |
| Presse locale 78 | Le Courrier des Yvelines, actu78.fr — projet de site notable | P1 | Contact journaliste avec angle "pisciniste local + paysagiste = intégrateur unique d'extérieur" |
| Partenaires architectes | Architectes prescripteurs qui travaillent avec AS | P1 | Proposer lien réciproque sur leur site de partenaires/références |
| Mairie de Freneuse / Communauté de communes | Annuaire entreprises locales | P2 | Inscription annuaire entreprises du territoire |
| Houzz.fr | Profil pro avec lien vers site | P0 | Créer profil (double bénéfice : citation NAP + backlink) |
| Bloggers/magazines déco jardin | Marie Claire Maison, Côté Maison | P2 | Long terme — après que le portfolio soit complet et les photos pros disponibles |

---

## E. Stratégie aqua-system.fr — Redirections 301

### E.1 Pages indexées identifiées (site:aqua-system.fr)

URLs actuellement indexées sur aqua-system.fr :
- `/` — Homepage
- `/contact`
- `/galerie`
- `/votre-piscine`
- `/spa-accessoires`
- `/spa-collection-highlife`
- `/Saunas_hammams`
- `/spa-pourquoi-hotspring`
- `/spa-collection-limelight`
- `/spa-collection-hot-spot`

### E.2 Mapping de redirections 301 (au moment de la bascule)

| URL source (aqua-system.fr) | Redirection vers (domaine ombrelle) | Justification |
|-----------------------------|------------------------------------|---------------|
| `/` | `/` (homepage ombrelle) | Jus SEO historique → homepage |
| `/votre-piscine` | `/piscines-bien-etre/` | Correspondance directe contenu |
| `/galerie` | `/realisations/` | Portfolio → réalisations |
| `/spa-collection-highlife` | `/piscines-bien-etre/` | HotSpring → section spas |
| `/spa-collection-limelight` | `/piscines-bien-etre/` | HotSpring → section spas |
| `/spa-collection-hot-spot` | `/piscines-bien-etre/` | HotSpring → section spas |
| `/spa-accessoires` | `/piscines-bien-etre/` | Accessoires → section bien-être |
| `/spa-pourquoi-hotspring` | `/piscines-bien-etre/` | Contenu spa → section piscines |
| `/Saunas_hammams` | `/piscines-bien-etre/` | Saunas → section bien-être |
| `/contact` | `/contact/` | Contact direct |

**Implémentation** : via les règles de redirect Cloudflare Pages (fichier `_redirects` dans `public/`) OU via la configuration Cloudflare Bulk Redirects. À implémenter par @fullstack après décision de bascule.

**Délai de bascule recommandé** : ne pas rediriger avant que le nouveau site soit en production stable ≥ 30 jours (risque de perte de trafic existant pendant la phase de rodage). La redirection 301 doit être permanente — ne pas utiliser de 302.

---

## F. Audit multi-moteurs — Google + Bing

### F.1 Google — Points d'attention

- Metas present et conformes sur les 9 pages ✓
- JSON-LD Organization en layout ✓ (à enrichir selon C.6)
- Canonical absolu sur toutes les pages ✓ (via absoluteUrl)
- og:image 1200x630 défini en layout ✓ (og-image.jpg)
- Sitemap : ABSENT — P0 bloquant
- robots.txt : ABSENT — P0 bloquant
- SSG complet : ✓ (export statique)

### F.2 Bing — Points d'attention spécifiques

- **Canonical absolu** : utilisé via `absoluteUrl()` — conforme. La homepage utilise `SITE_URL` direct (correct). Aucun canonical relatif détecté.
- **lastModified sitemap stable** : NON encore implémenté (sitemap absent). La future implémentation DOIT utiliser une date fixe (voir C.1).
- **Rendering JS** : SSG complet = HTML pré-rendu ✓ — Bing peut parser sans JS.
- **Mot-clé exact en title/H1/P1** : partiellement couvert (voir metadata-templates.md pour optimisation page par page).
- **IndexNow** : non implémenté. Recommandé (@fullstack P1) — compense le crawl Bing moins fréquent. Intégrer dans le workflow de build Cloudflare Pages après chaque déploiement.
- **Signaux sociaux** : LinkedIn Aqua System existant. Coordonner avec @social pour activer les publications régulières — signal ranking Bing direct.
- **Bing Webmaster Tools** : non vérifié. À configurer après lancement (P1).
- **favicon** : SVG + PNG 32/16 + apple-touch-icon + manifest en place ✓
- **schema Organization.logo** : à ajouter (voir C.6.1 — champ "logo") — requis Knowledge Panel Bing.

---

## G. Recommandations priorisées

### P0 — Avant lancement (bloquants)

| # | Action | Responsable | Livrable |
|---|--------|-------------|---------|
| P0-SEO-1 | Créer `src/app/sitemap.ts` (force-static, date fixe, 9 pages + 14 slugs réalisations) | @fullstack | out/sitemap.xml au build |
| P0-SEO-2 | Créer `src/app/robots.ts` (force-static, règles par bot, AI crawlers autorisés) | @fullstack | out/robots.txt au build |
| P0-SEO-3 | Configurer `NEXT_PUBLIC_SITE_URL` dans Cloudflare Pages (URL définitive, HTTPS, www ou non) | @fullstack | Build avec canonical réel |
| P0-SEO-4 | Enrichir JSON-LD `organizationJsonLd()` dans seo.ts (sameAs, logo, image, geo, hasOfferCatalog) | @fullstack | Rich Results Test PASS |
| P0-SEO-5 | Créer `public/llms.txt` avec les pages clés et description entités | @fullstack | /llms.txt accessible |
| P0-SEO-6 | Optimiser fiche GBP Aqua System (catégories, description, photos, lien nouveau domaine) | Fondateur + @seo | Fiche GBP à jour |

### P1 — Dans les 30 jours post-lancement

| # | Action | Responsable | Livrable |
|---|--------|-------------|---------|
| P1-SEO-1 | Ajouter BreadcrumbList JSON-LD sur les 7 pages de niveau 2+ | @fullstack | Validation Rich Results |
| P1-SEO-2 | Ajouter ImageObject JSON-LD sur les fiches réalisations (14 slugs) | @fullstack | Validation Rich Results |
| P1-SEO-3 | Créer profil Houzz.fr (Aqua System + futur LTE) + PagesJaunes | Fondateur | NAP cohérent + backlinks |
| P1-SEO-4 | Vérifier Bing Webmaster Tools + soumettre sitemap | Fondateur | Bing indexation lancée |
| P1-SEO-5 | Implémenter IndexNow — clé API dans public/ + appel POST après build CI | @fullstack | Indexation Bing instantanée |
| P1-SEO-6 | Lancer collecte d'avis GBP clients actifs (email post-livraison) | Fondateur | Objectif 10 avis M+3 |
| P1-SEO-7 | Créer fiche GBP Les Terres Essentielles (après confirmation acquisition) | Fondateur | 2e signal GBP local |
| P1-SEO-8 | Démarrer la relation presse locale 78 (Le Courrier des Yvelines) | Fondateur | 1 article avec lien entrant |

### P2 — Dans les 90 jours (V2 et croissance)

| # | Action | Responsable | Livrable |
|---|--------|-------------|---------|
| P2-SEO-1 | Mapping et implémentation redirections 301 aqua-system.fr (bascule coordinée) | @fullstack | Zéro 404 post-bascule |
| P2-SEO-2 | Ajouter JSON-LD LocalBusiness LTE (après acquisition) | @fullstack | 2e entité structurée |
| P2-SEO-3 | Préparer les pages géolocalisées V2 (Le Vésinet, St-Nom-la-Bretèche) si ≥ 3 réalisations par commune | @fullstack + @copywriter | Pages géo à valeur |
| P2-SEO-4 | Lancer le blog V2 (pipeline de contenu automatisé — cluster entretien, guides d'achat) | @fullstack + @copywriter | Topical authority étendue |
| P2-SEO-5 | Obtenir le lien L'Esprit Piscine mis à jour vers nouveau domaine | Fondateur | Backlink autorité |

---

*Fichier produit par @seo — 2026-06-11*
*Sources : project-context.md, site-copy.md, verbal-identity.md, competitive-benchmark.md, src/lib/seo.ts, src/app/layout.tsx, src/lib/constants.ts, SERP WebSearch 2026-06-11*
