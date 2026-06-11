# Spécifications Fonctionnelles — Site vitrine [SITE_NAME]
## Aqua System × Les Terres Essentielles

> **Contrat product → dev.** Objectif : @fullstack peut coder sans poser une seule question.
> Références : `docs/product/v1-scope.md` (IDs F-01…F-11), `docs/analytics/tracking-plan.md` (events E-01…E-09), `docs/legal/rgpd-checklist.md` (section D), `docs/product/discovery-map.md`, `docs/product/assumption-map.md`
> Constante globale : `SITE_NAME` = "Aquasystem" [PROVISOIRE — substituer par le naming validé dans une seule constante `src/config/site.ts`]
> **v1.1 — réconciliation post-checkpoint, 2026-06-11** : 5 P0 résolus (URLs, formulaire, budget, succès, nav). Arbitrages dans `docs/product/arbitrations-p0-checkpoint.md`. Source de vérité wording erreurs : `docs/copy/ux-writing-guide.md` §2.
> Dernière mise à jour : 2026-06-11 | Agent : @product-manager

---

## Règles transversales (s'appliquent à TOUTES les features)

### Stack et contraintes export statique

- Next.js App Router en mode export statique (`output: 'export'` dans `next.config.js`).
- **Pas de `getServerSideProps`, pas de middleware server, pas de route handler Next.js** — toute logique serveur passe par une Cloudflare Pages Function dans `/functions/`.
- **Seule route dynamique côté serveur** : `POST /api/contact` → `/functions/api/contact.ts`.
- Tout autre contenu dynamique (portfolio filtres, i18n) : résolu côté client ou au build.
- Images : `next/image` obligatoire, formats AVIF/WebP auto, `lazy` par défaut sauf hero (priorité LCP).

### Constante SITE_NAME

```typescript
// src/config/site.ts
export const SITE_NAME = "Aquasystem"; // [PROVISOIRE — substituer ici uniquement]
export const SITE_EMAIL = "contact@aqua-system.fr";
export const SITE_PHONE = "01 30 42 26 00";
export const SITE_ADDRESS = "45 Route Nationale, 78840 Freneuse";
export const SITE_SIREN = "903 785 327";
```

### i18n

- Architecture : `next-intl` avec locale `fr` active.
- Route `/fr/...` OU locale par défaut sans préfixe (décision @fullstack — documenter le choix).
- Locale `en` : structure de fichiers créée (`messages/en.json` vide), **aucune page EN rendue en V1**.
- **Pas de sélecteur de langue visible en V1** (locale EN absente = sélecteur inutile, potentiellement trompeur). Ajouter le sélecteur en V2 quand EN est disponible.

### Analytics — helper trackEvent

Voir `docs/analytics/tracking-plan.md` section "Contrat technique". Résumé :
- Fichier : `src/lib/analytics.ts`
- Fail-silent : jamais await, jamais bloquant
- Script Umami chargé en `strategy="afterInteractive"`
- Zéro PII dans les propriétés

### SEO transversal

- `<title>` et `<meta description>` uniques par page (via Next.js `generateMetadata`).
- Données structurées `LocalBusiness` + `ProfessionalService` (schema.org) sur la page d'accueil.
- `sitemap.xml` auto-généré (next-sitemap ou équivalent).
- `robots.txt` : autoriser tout sauf `/api/`.
- Pages EN exclues du sitemap en V1.

### Accessibilité (WCAG 2.1 AA — seuil minimum)

- Zones cliquables ≥ 44×44px.
- Contraste texte ≥ 4,5:1.
- Focus visible sur tous les éléments interactifs.
- Attributs `alt` sur toutes les images (descriptifs, pas "image").
- Formulaire : labels associés aux inputs (`htmlFor`/`id`), messages d'erreur liés par `aria-describedby`.

### Fallback JS désactivé

- Pages statiques : rendues normalement (Next.js génère du HTML pur).
- Formulaire contact : dégradation progressive → `<form action="/api/contact" method="POST">` natif, sans JS. La Pages Function accepte `application/x-www-form-urlencoded` ET `application/json`.
- Filtres portfolio : sans JS, afficher "Tous" (aucun filtre actif) — les cartes s'affichent toutes.

---

## F-01 — Page d'accueil

**Persona** : Alexandre (principal) + Camille (secondaire)
**URL** : `/` (ou `/fr/` selon choix i18n)
**Lien NSM** : Premier écran de conviction — détermine si le visiteur continue
**Roadmap** : R-05

### US-01 — Comprendre l'offre et décider de rester

**Persona** : Alexandre | **Epic** : Core site | **RICE** : R-05 → 1200
**Dépendances** : F-10 (composants), R-02 (design), R-04 (photos)

#### Job-to-be-done
En tant qu'Alexandre, je veux comprendre en un coup d'œil ce que fait [SITE_NAME] afin de décider en moins de 10 secondes si ce partenaire est à la hauteur de mon projet.

#### Contexte de navigation
- **Origine** : Google (recherche "pisciniste sur mesure 78/92"), bouche-à-oreille (URL directe), réseaux sociaux
- **Déclencheur** : chargement de la page
- **Destination succès** : clic CTA → `/contact`, ou navigation vers `/piscines-bien-etre`, `/jardins-paysage`, `/realisations`
- **Destination échec** : rebond (fermeture onglet, retour Google)

#### Contenu requis (structure de page)

| Section | Contenu | Règle |
|---------|---------|-------|
| Hero | Tagline "L'extérieur à la hauteur de votre propriété" + photo réalisation premium (piscine+jardin) + CTA "Parlez-nous de votre projet" | Photo priorité LCP (`priority` next/image), CTA → `/contact` avec `data-track="cta"` `data-position="hero"` |
| Deux univers | Blocs Piscines & Bien-être + Jardins & Paysage — appel à l'intégration | Liens vers `/piscines-bien-etre` et `/jardins-paysage` |
| Composant preuves | 30+ ans, 350+ piscines entretenues, Socotec CSP/ESP-001, L'Esprit Piscine | Composant `<ProofPoints />` réutilisable |
| Extrait portfolio | 3-4 réalisations phares | Données depuis `src/data/realisations.json`, lien "Voir toutes les réalisations" → `/realisations` |
| Mention prescripteurs | Lien discret vers `/prescripteurs` | Texte sobre, pas CTA principal |
| CTA footer | "Parlez-nous de votre projet" | `data-track="cta"` `data-position="footer"` |

#### 5 états UI

| État | Affichage |
|------|-----------|
| **Défaut** | Page complète : hero, deux univers, preuves, portfolio extrait, CTA |
| **Loading** | Next.js export statique : pas de loading state page — hydration React côté client. Skeleton optionnel sur les cartes portfolio si chargement images lent (LCP cible ≤ 2,5s) |
| **Vide** | N/A — page statique, contenu toujours présent |
| **Erreur image** | Si photo hero fail : fond couleur brand (défini dans le design system), tagline et CTA restent visibles. Si photo réalisation fail : placeholder gris sobre `aspect-ratio: 4/3` |
| **Succès** | N/A — page d'entrée |

#### Critères d'acceptation

**Happy path :**
1. Given Alexandre charge la page d'accueil en desktop / When la page se charge / Then la tagline "L'extérieur à la hauteur de votre propriété" et le bouton CTA "Parlez-nous de votre projet" sont visibles sans scroll, LCP ≤ 2,5s mesuré par Lighthouse.
2. Given Alexandre scrolle sous le hero / When il atteint la section preuves / Then les 4 proof points (30+ ans, 350+ piscines entretenues, Socotec CSP/ESP-001, L'Esprit Piscine) sont visibles en moins de 2 unités de scroll desktop.
3. Given Alexandre veut voir les réalisations / When il clique sur "Voir toutes les réalisations" dans l'extrait portfolio / Then il est redirigé vers `/realisations` et le scroll se positionne en haut de page.

**Erreurs :**
4. Given la connexion est lente (3G simulé) / When Alexandre charge la page / Then le texte du hero s'affiche avant l'image (CSS `color: var(--brand-fg)` sur fond) — aucun FOUC (Flash Of Unstyled Content).
5. Given l'image hero est inaccessible (erreur CDN) / When la page charge / Then un fond couleur brand s'affiche en remplacement, la tagline et le CTA restent lisibles et cliquables.

**Cas limites :**
6. Given Alexandre accède depuis un mobile 375px / When il voit la navigation / Then le menu hamburger est visible, la zone de tap du CTA est ≥ 44×44px, aucun contenu ne déborde horizontalement.
7. Given Alexandre désactive JavaScript / When il charge la page / Then le HTML statique s'affiche intégralement (texte, images, liens), les CTA sont des `<a href="/contact">` natifs fonctionnels.

**Permissions :**
8. Given Googlebot crawle la page d'accueil / When il analyse le HTML / Then les balises `<title>`, `<meta name="description">`, `<h1>` et les données structurées `LocalBusiness` sont présents dans le HTML statique généré (pas dans du JavaScript exécuté).

**Données existantes :**
9. Given 3 réalisations sont listées dans `src/data/realisations.json` / When la page d'accueil se charge / Then exactement 3 cartes s'affichent dans l'extrait portfolio (pas plus de 4).

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement page — automatique Umami | `page_path: "/"` |
| `cta_clicked` (E-04) | Clic CTA hero | `page_source: "accueil"`, `position: "hero"`, `label_cta: "Parlez-nous de votre projet"` |
| `cta_clicked` (E-04) | Clic CTA footer | `page_source: "accueil"`, `position: "footer"` |

#### SEO

- `<title>` : [WORDING : voir ux-writing-guide.md] — format : "[Métier principal] haut de gamme [zone] — [SITE_NAME]"
- `<meta description>` : [WORDING : voir ux-writing-guide.md] — 150-160 caractères
- `<h1>` : tagline "L'extérieur à la hauteur de votre propriété"
- Données structurées : `LocalBusiness` + `ProfessionalService` avec adresse, téléphone, zone de service 78/92

#### Notes

- **@fullstack** : hero image avec `priority={true}` et `sizes` adaptatifs — critique pour le LCP.
- **@ux** : vérifier que les deux univers (piscines/jardins) sont perçus comme complémentaires, pas concurrents — risque UX identifié dans v1-scope.md risque 3.
- **@qa** : tester le fallback image hero sur Chrome DevTools > Network > Offline.

---

## F-02 — Page univers piscines & bien-être

**Persona** : Alexandre
**URL** : `/piscines-bien-etre`
**Lien NSM** : Page de conversion intent piscine
**Roadmap** : R-08

### US-02 — Découvrir l'expertise piscines et se projeter

**Persona** : Alexandre | **Epic** : Core site | **RICE** : R-08 → 595
**Dépendances** : F-01, R-04 (photos), F-10 (composants)

#### Job-to-be-done
En tant qu'Alexandre ayant un projet de piscine sur mesure, je veux comprendre précisément ce que [SITE_NAME] réalise afin d'évaluer si le niveau d'exigence correspond à mes attentes.

#### Contexte de navigation
- **Origine** : accueil (clic bloc univers piscines), navigation principale, Google
- **Déclencheur** : intention de projet piscine
- **Destination succès** : clic CTA → `/contact`, ou cross-selling → `/jardins-paysage`
- **Destination échec** : rebond ou retour accueil

#### Contenu requis

| Section | Contenu | Règle |
|---------|---------|-------|
| Hero section | Titre univers piscines + photo phare réalisation piscine | Photo priorité LCP si premier chargement |
| Prestations Aqua System | Conception et construction sur mesure, rénovation, spas HotSpring, saunas, hammams, traitement d'eau, robots Dolphin, SAV/entretien annuel | Liste structurée, pas de bullet points génériques |
| Photos réalisations piscines | 3-5 photos issues du book Calameo / site existant | `next/image` lazy, alt descriptifs |
| Certifications en contexte | Socotec CSP/ESP-001, L'Esprit Piscine | Intégrées dans le flux de texte, pas en annexe |
| Composant cross-selling | "Votre piscine mérite un jardin à sa mesure — en partenariat avec Les Terres Essentielles" + CTA vers `/jardins-paysage` | `data-track="cross-selling"` `data-source="piscines-bien-etre"` `data-destination="jardins-paysage"` |
| CTA | "Parlez-nous de votre projet" → `/contact` | `data-track="cta"` `data-position="section_milieu"` et `data-position="footer"` |

**Formulation obligatoire** : "notre maison Aqua System" (vocabulaire prescrit brand-platform.md).

#### 5 états UI

| État | Affichage |
|------|-----------|
| **Défaut** | Page complète avec toutes les sections |
| **Loading** | Hydration React — skeleton images si nécessaire |
| **Vide** | N/A — page statique |
| **Erreur image** | Placeholder gris `aspect-ratio: 4/3` + alt text visible |
| **Succès** | N/A |

#### Critères d'acceptation

**Happy path :**
1. Given Alexandre arrive sur `/piscines-bien-etre` / When il lit la page / Then le terme "Aqua System" et la mention "conception et construction sur mesure" sont visibles dans le premier écran desktop.
2. Given Alexandre scrolle vers le bas / When il atteint le composant cross-selling / Then il voit "en partenariat avec Les Terres Essentielles" et peut cliquer pour aller vers `/jardins`.
3. Given Alexandre clique sur le CTA "Parlez-nous de votre projet" / When la navigation se produit / Then il arrive sur `/contact` avec scroll en haut de page.

**Erreurs :**
4. Given une image de réalisation piscine ne charge pas / When la page s'affiche / Then un placeholder gris sobre s'affiche à la place — aucune image "cassée" (alt + CSS `object-fit: cover`).
5. Given JavaScript est désactivé / When Alexandre charge la page / Then tout le contenu textuel est accessible en HTML pur, le cross-selling est un `<a>` fonctionnel.

**Cas limites :**
6. Given Alexandre arrive depuis une recherche Google "piscine sur mesure Le Vésinet" / When il voit la page / Then au moins une commune du 78 ou 92 est mentionnée dans le corps du texte (ancrage géographique SEO).
7. Given Alexandre est sur mobile 375px / When il scrolle / Then le composant cross-selling est entièrement visible sans scroll horizontal, le CTA est tappable (≥ 44px).

**Permissions :**
8. Given Googlebot crawle `/piscines` / When il analyse le HTML / Then les balises `<title>`, `<meta description>` et `<h1>` contiennent des termes piscine + zone géographique.

**Données existantes :**
9. Given aucune photo de piscine n'est disponible (R-04 bloquée) / When la page est déployée / Then la page ne s'affiche pas avec des images placeholder "stock photo" — la section photos est soit absente soit indique [WORDING manquant] en développement. En production : gate G-PHOTO bloque le déploiement (cf. v1-scope.md).

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement page — auto | `page_path: "/piscines-bien-etre"` |
| `cross_selling_clicked` (E-09) | Clic composant cross-sell | `source_univers: "piscines-bien-etre"`, `destination_univers: "jardins-paysage"` |
| `cta_clicked` (E-04) | Clic CTA | `page_source: "piscines-bien-etre"`, `position: "section_milieu"` ou `"footer"` |

#### Notes

- **@fullstack** : la formulation "en partenariat avec Les Terres Essentielles" est une contrainte légale — ne pas paraphraser.
- **@qa** : vérifier que le texte "en partenariat avec" est présent dans le HTML rendu (pas injecté JS post-rendu).

---

## F-03 — Page univers jardins & paysage

**Persona** : Alexandre
**URL** : `/jardins-paysage`
**Lien NSM** : Page de conversion intent jardin
**Roadmap** : R-09

### US-03 — Découvrir l'expertise jardins et la complémentarité

**Persona** : Alexandre | **Epic** : Core site | **RICE** : R-09 → 480
**Dépendances** : F-01, R-04 (photos), F-10, validation formulation @legal

#### Job-to-be-done
En tant qu'Alexandre propriétaire d'un grand terrain, je veux comprendre ce que [SITE_NAME] peut réaliser en matière de jardin afin d'envisager un projet global eau + végétal avec un seul interlocuteur.

#### Contexte de navigation
- **Origine** : accueil (bloc univers jardins), cross-selling depuis `/piscines`, navigation principale
- **Déclencheur** : curiosité pour le paysagisme ou intention jardin directe
- **Destination succès** : clic CTA → `/contact`, ou cross-selling → `/piscines-bien-etre`
- **Destination échec** : rebond

#### Contenu requis

| Section | Contenu | Règle |
|---------|---------|-------|
| Prestations LTE | Bureau d'études paysager, création de parcs et jardins, entretien, pépinière | Formulation légale obligatoire partout : "en partenariat avec Les Terres Essentielles" |
| Adresse LTE | CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi | Afficher dans le contexte de l'ancrage local |
| Photos jardins | Issues du book Calameo ou site existant | `next/image` lazy, alt descriptifs |
| Composant cross-selling | "Votre jardin gagne à naître avec la piscine — [SITE_NAME] conçoit les deux ensemble" + CTA vers `/piscines-bien-etre` | `data-track="cross-selling"` `data-source="jardins-paysage"` `data-destination="piscines-bien-etre"` |
| CTA | "Parlez-nous de votre projet" → `/contact` | `data-track="cta"` |

**Formulations INTERDITES** : "notre filiale", "nos deux sociétés", "notre division jardins".
**Formulation OBLIGATOIRE** : "en partenariat avec Les Terres Essentielles" — validée @legal.

#### 5 états UI

Identique à F-02 (page statique avec même structure).

#### Critères d'acceptation

**Happy path :**
1. Given Alexandre arrive sur `/jardins-paysage` / When il lit la page / Then la formulation "en partenariat avec Les Terres Essentielles" apparaît au moins une fois dans le corps de la page (visible, pas seulement dans les meta).
2. Given Alexandre veut voir les piscines en cross-selling / When il clique sur le composant cross-selling / Then il arrive sur `/piscines-bien-etre` sans perte de contexte navigateur (retour arrière fonctionnel).
3. Given Alexandre est intéressé et clique sur le CTA / When la navigation se produit / Then il arrive sur `/contact`.

**Erreurs :**
4. Given une image de jardin ne charge pas / When la page s'affiche / Then un placeholder gris s'affiche, aucune image cassée.
5. Given JavaScript est désactivé / When la page charge / Then tout le contenu textuel est accessible, les CTA sont des `<a>` natifs.

**Cas limites :**
6. Given Alexandre cherche "paysagiste haut de gamme 92" sur Google / When Googlebot crawle `/jardins` / Then les balises SEO mentionnent paysage + zone 78 ou 92.
7. Given la gouvernance LTE n'est pas encore finalisée (acquisition en cours) / When la page est publiée / Then aucune affirmation de propriété n'est présente — uniquement "en partenariat avec".

**Permissions :**
8. Given @legal demande une vérification pré-launch / When les specs sont relues / Then la formulation "en partenariat avec Les Terres Essentielles" est la seule formulation utilisée pour décrire la relation — confirmé en critère bloquant.

**Données existantes :**
9. Given l'adresse LTE (CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi) est présente dans la config / When la page s'affiche / Then l'adresse est visible dans un contexte d'ancrage local (ex: section "Nos implantations").

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement — auto | `page_path: "/jardins-paysage"` |
| `cross_selling_clicked` (E-09) | Clic cross-sell | `source_univers: "jardins-paysage"`, `destination_univers: "piscines-bien-etre"` |
| `cta_clicked` (E-04) | Clic CTA | `page_source: "jardins-paysage"`, `position: "footer"` |

#### Notes

- **@fullstack** : la formulation LTE est une contrainte de validation légale — intégrer dans les fixtures de test.
- **@qa** : test de régression automatique sur la présence du texte "en partenariat avec Les Terres Essentielles" dans le HTML.

---

## F-04 — Page approche / méthode

**Persona** : Alexandre (principal) + Camille (secondaire)
**URL** : `/notre-approche`
**Lien NSM** : Convertit les visiteurs en considération active
**Roadmap** : R-10

### US-04 — Comprendre le processus et être rassuré sur la fiabilité

**Persona** : Alexandre | **Epic** : Core site | **RICE** : R-10 → 525
**Dépendances** : copy validé

#### Job-to-be-done
En tant qu'Alexandre hésitant entre plusieurs prestataires, je veux comprendre comment [SITE_NAME] travaille concrètement afin d'être rassuré sur la qualité de l'exécution et la stabilité de l'interlocuteur.

#### Contexte de navigation
- **Origine** : accueil, navigation principale, pages univers
- **Déclencheur** : recherche de preuve de méthode / fiabilité
- **Destination succès** : clic CTA → `/contact`
- **Destination échec** : rebond

#### Contenu requis

| Section | Contenu | Règle |
|---------|---------|-------|
| Étapes processus | Écoute → bureau d'études → conception → réalisation → suivi annuel | Narration fluide, pas une liste à puces basique |
| Relation de long terme | Entretien annuel, interlocuteur stable (pilier 4) | Formulation sobre |
| Ancrage local 78/92 | Connaissance nappe phréatique, PLU, sol argilo-calcaire | Montre l'expertise locale — signal de confiance pour Alexandre |
| Réponse frustrations | Pas de sous-traitance forcée, interlocuteur unique | Implicite dans la narration, pas de liste de douleurs explicites |
| Mention prescripteurs | Respect des cahiers des charges, chaîne de prescription | Discret, pour Camille qui lirait cette page |
| CTA | "Parlez-nous de votre projet" | `data-track="cta"` |

#### 5 états UI

Page statique — mêmes états que F-02.

#### Critères d'acceptation

**Happy path :**
1. Given Alexandre arrive sur `/notre-approche` / When il lit la page / Then les 5 étapes du processus (écoute, bureau d'études, conception, réalisation, suivi) sont identifiables dans le contenu visible.
2. Given Alexandre cherche une preuve de l'ancrage local / When il lit la page / Then au moins une mention des contraintes locales (78/92, PLU, ou sol argilo-calcaire) est présente.
3. Given Alexandre clique sur le CTA / When la navigation se produit / Then il arrive sur `/contact`.

**Erreurs :**
4. Given JavaScript est désactivé / When la page charge / Then tout le contenu et le CTA sont accessibles en HTML pur.
5. Given une image illustrative de la méthode ne charge pas / When la page s'affiche / Then un placeholder sobre s'affiche — la page reste lisible sans l'image.

**Cas limites :**
6. Given Camille (architecte) lit la page / When elle cherche la mention prescripteurs / Then une référence au respect des cahiers des charges est présente (même si discrète).
7. Given Alexandre est sur mobile / When il lit la page / Then le contenu est lisible sans zoom, hiérarchie visuelle maintenue.

**Permissions :**
8. Given Googlebot crawle `/notre-approche` / When il analyse le HTML / Then la balise `<title>` contient un terme de méthode ou d'expertise (ex: "notre approche", "méthode", "processus").

**Données existantes :**
9. Given le copy de la page n'est pas encore validé fondateur / When la page est déployée / Then une gate de build ou un composant placeholder indique l'état "contenu en attente" — jamais de texte Lorem Ipsum en production.

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement — auto | `page_path: "/notre-approche"` |
| `cta_clicked` (E-04) | Clic CTA | `page_source: "notre-approche"`, `position: "footer"` |

#### Notes

- **@copywriter** : cette page est la plus narrative du site — le copy est critique. Gate G-CONTENU bloquant.
- **@fullstack** : pas de logique dynamique — page purement statique.

---

## F-05 — Page portfolio / réalisations (filtrable)

**Persona** : Alexandre + Camille
**URL** : `/realisations`
**Lien NSM** : Vecteur de conviction principal
**Roadmap** : R-07

### US-05 — Parcourir les réalisations et filtrer par type de projet

**Persona** : Alexandre + Camille | **Epic** : Portfolio | **RICE** : R-07 → 1147
**Dépendances** : R-04 (photos — CRITIQUE), R-02 (design)

#### Job-to-be-done
En tant qu'Alexandre, je veux voir des réalisations concrètes similaires à mon projet afin d'évaluer si le niveau de réalisation correspond à mes attentes et de trouver une référence à montrer à ma conjointe.

#### Contexte de navigation
- **Origine** : accueil (extrait portfolio), navigation principale, pages univers (cross-selling)
- **Déclencheur** : désir de preuve visuelle
- **Destination succès** : conviction établie → clic CTA → `/contact`
- **Destination échec** : portfolio insuffisant (< 8 réalisations) → rebond

#### Structure de données — `src/data/realisations.json`

```typescript
// Type de chaque réalisation
interface Realisation {
  id: string;              // ex: "real-001"
  titre: string;           // ex: "Piscine à débordement — Le Vésinet"
  type: "piscine" | "spa_sauna" | "jardin_parc" | "projet_complet";
  zone_geo: string;        // Commune ou département — JAMAIS nom de propriétaire
  departement: "78" | "92" | "27" | "95"; // Pour le filtre analytics
  prestations: string[];   // ex: ["Conception", "Construction", "Traitement eau"]
  photos: string[];        // Chemins relatifs — 1 à 3 photos par réalisation
  description_courte: string; // Max 120 caractères
}
```

**Minimum viable** : 8 réalisations dont prioritairement des piscines.
**Gate bloquante** : G-PHOTO (cf. v1-scope.md) — pas de déploiement sans 8 réalisations réelles.

#### Filtres

| Filtre | Valeur `data-filter` | Label affiché |
|--------|---------------------|---------------|
| Tous | `tous` | "Toutes les réalisations" |
| Piscine | `piscine` | "Piscines" |
| Spa & Sauna | `spa_sauna` | "Spas & Saunas" |
| Jardin & Parc | `jardin_parc` | "Jardins & Parcs" |
| Projet complet | `projet_complet` | "Projets complets eau + jardin" |

**Filtre actif par défaut** : "Tous".
**Filtre "Projet intégré" depuis F-07** : URL `/realisations?filter=projet_complet` — le filtre se positionne sur "projet_complet" au chargement. [HYPOTHÈSE : ce mécanisme URL doit être validé UX avec Camille — alternative : lien direct sans pré-filtre]

#### 5 états UI

| État | Affichage |
|------|-----------|
| **Défaut** | Grille de toutes les réalisations (≥ 8), filtres actifs, filtre "Tous" sélectionné |
| **Loading** | Skeleton cards (CSS) pendant hydration — visible < 200ms sur connexion standard |
| **Vide (filtre sans résultat)** | Message : "Aucune réalisation dans cette catégorie pour le moment." + CTA "Voir toutes les réalisations" (reset filtre) |
| **Erreur image** | Placeholder gris `aspect-ratio: 4/3` avec icône sobre — pas d'image cassée |
| **Succès filtre** | Nombre de résultats affichés mis à jour visuellement — filtre actif mis en évidence (style actif CSS) |

#### Critères d'acceptation

**Happy path :**
1. Given Alexandre arrive sur `/realisations` / When la page charge / Then ≥ 8 cartes de réalisations s'affichent, chacune avec photo, type, zone géographique — sans scroll horizontal.
2. Given Alexandre clique sur le filtre "Piscines" / When le filtre est appliqué / Then seules les réalisations de type `piscine` s'affichent, le bouton "Piscines" est visuellement en état actif.
3. Given Camille cherche des projets intégrés / When elle clique sur "Projets complets eau + jardin" / Then seules les réalisations `projet_complet` s'affichent.

**Erreurs :**
4. Given Alexandre clique sur un filtre sans réalisation disponible / When le filtre est appliqué / Then le message "Aucune réalisation dans cette catégorie pour le moment." s'affiche avec un CTA "Voir toutes les réalisations".
5. Given une image de réalisation ne charge pas / When la grille s'affiche / Then un placeholder gris sobre s'affiche — aucune image cassée, la carte reste lisible (titre, type, zone).

**Cas limites :**
6. Given Alexandre change de filtre plusieurs fois rapidement / When plusieurs clics successifs / Then seul le dernier filtre est appliqué — pas de cumul d'animations, pas de race condition.
7. Given JavaScript est désactivé / When Alexandre arrive sur `/realisations` / Then toutes les réalisations s'affichent sans filtre actif (état "Tous" par défaut), les filtres sont absents ou non fonctionnels — pas d'écran vide.
8. Given Alexandre arrive avec `?filter=projet_complet` dans l'URL / When la page charge / Then le filtre "Projets complets" est pré-activé côté client après hydration.

**Permissions :**
9. Given Googlebot crawle `/realisations` / When il analyse le HTML / Then les titres et descriptions des réalisations sont dans le HTML statique initial (pas uniquement injectés par JS) — important pour le SEO.

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement — auto | `page_path: "/realisations"` |
| `portfolio_filter_clicked` (E-05) | Clic sur un filtre | `filtre: "piscine"` (ou valeur du filtre), `device_type` |
| `portfolio_realisation_viewed` (E-06) | Clic sur une carte | `type_projet: "piscine"`, `zone_geo: "78"` |
| `cta_clicked` (E-04) | Clic CTA footer | `page_source: "realisations"`, `position: "footer"` |

#### Notes

- **@fullstack** : les filtres sont côté client (état React) — le HTML statique contient TOUTES les cartes, la visibilité est gérée par CSS/JS. Cela garantit le SEO ET le fonctionnement sans JS.
- **@fullstack** : le paramètre URL `?filter=` est lu après hydration côté client (`useSearchParams`), pas au build. Prévoir `Suspense` wrapping si Next.js App Router.
- **@qa** : tester le filtre avec 0 résultat (cas vide), avec 1 résultat, avec tous les résultats. Tester l'URL `?filter=projet_complet`.
- **@ux** : vérifier que la zone de tap des filtres est ≥ 44px sur mobile.

---

## F-06 — Page à propos / maison

**Persona** : Alexandre
**URL** : `/la-maison`
**Lien NSM** : Signal de continuité et de sérieux — réduit le taux de rebond des profils "chercheurs de preuve humaine"
**Roadmap** : R-11

### US-06 — Connaître les hommes et l'histoire derrière la marque

**Persona** : Alexandre | **Epic** : Core site | **RICE** : R-11 → 480
**Dépendances** : copy validé, autorisation photos Nicolas Berg

#### Job-to-be-done
En tant qu'Alexandre qui investit 70 000 € minimum dans un projet de vie, je veux savoir à qui je confie ce projet afin d'être rassuré par des personnes réelles et une histoire authentique.

#### Contexte de navigation
- **Origine** : navigation principale, accueil (curiosité)
- **Déclencheur** : désir de preuve humaine et historique
- **Destination succès** : clic CTA → `/contact`
- **Destination échec** : rebond (si la page semble corporate et impersonnelle)

#### Contenu requis

| Section | Contenu | Règle |
|---------|---------|-------|
| Nicolas Berg | Nom, rôle (gérant Aqua System), ancrage local, philosophie de projet | Sobre — pas de biographie corporate formatée |
| Histoire | "Plus de 30 ans d'expertise" dans l'aménagement extérieur haut de gamme | **JAMAIS** "société créée il y a 30 ans" (SARL Aqua System datant de 2021) |
| Les deux maisons | Aqua System + "en partenariat avec Les Terres Essentielles" | Formulation légale obligatoire |
| Équipe | Équipe de 8 chez Aqua System — sans nommer si pas d'autorisation | Si photos indisponibles : ZÉRO photo de banque d'images "team" |
| Valeurs | Exigence, confiance, durabilité — ton sobre | Pas de liste de bullet points génériques — intégrées dans la narration |
| Preuves | 30+ ans, 350+ piscines, Socotec, L'Esprit Piscine | Composant `<ProofPoints />` ou mention dans le texte |
| Photo Nicolas | Si autorisation confirmée par fondateur | Si pas d'autorisation : pas de photo de personne, jamais de photo banque d'images |
| CTA | "Parlez-nous de votre projet" → `/contact` | `data-track="cta"` |

#### 5 états UI

Page statique — mêmes états que F-02. Cas particulier : si la photo de Nicolas n'est pas autorisée, la section photo est absente (pas de placeholder humain).

#### Critères d'acceptation

**Happy path :**
1. Given Alexandre arrive sur `/la-maison` / When il lit la page / Then le nom "Nicolas Berg", le rôle "gérant" et la formulation "plus de 30 ans d'expertise" sont visibles.
2. Given Alexandre cherche les preuves de sérieux / When il scrolle / Then au moins 3 des 4 proof points (30+ ans, 350+ piscines, Socotec, L'Esprit Piscine) sont présents sur la page.
3. Given Alexandre clique sur le CTA / When la navigation se produit / Then il arrive sur `/contact`.

**Erreurs :**
4. Given JavaScript est désactivé / When la page charge / Then tout le contenu textuel est accessible en HTML pur.
5. Given la photo de Nicolas n'a pas été autorisée / When la page est déployée en production / Then aucune photo de personne n'est présente — ni photo de Nicolas, ni photo banque d'images — la page fonctionne sans.

**Cas limites :**
6. Given le copy mentionne "société créée il y a 30 ans" (formulation interdite) / When @qa relit la page / Then ce texte n'est nulle part présent — uniquement "plus de 30 ans d'expertise".
7. Given la relation avec LTE est mentionnée / When @qa vérifie / Then la formulation est "en partenariat avec Les Terres Essentielles" — jamais "filiale" ou "propriété".

**Permissions :**
8. Given Googlebot crawle `/la-maison` / When il analyse le HTML / Then les données structurées `Person` (Nicolas Berg) sont optionnellement présentes — à minima les meta tags sont corrects.

**Données existantes :**
9. Given "équipe de 8" est mentionné dans le copy / When la page s'affiche / Then ce chiffre est présent dans le HTML — pas d'invention de chiffre différent sans validation fondateur.

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement — auto | `page_path: "/la-maison"` |
| `cta_clicked` (E-04) | Clic CTA | `page_source: "la-maison"`, `position: "footer"` |

#### Notes

- **@fullstack** : la variable `SITE_NAME` est utilisée partout à la place du nom provisoire. Sur cette page, "Aqua System" (avec espace, le nom de la société) est différent de `SITE_NAME` (le nom de la marque ombrelle) — distinguer les deux dans le code.
- **@qa** : vérifier l'absence de la formulation "société créée il y a 30 ans" et de toute photo banque d'images.

---

## F-07 — Page espace prescripteurs / architectes

**Persona** : Camille (architecte prescripteur)
**URL** : `/prescripteurs`
**Lien NSM** : Multiplicateur de leads (3-5 leads/prescripteur/an)
**Roadmap** : R-13

### US-07 — Évaluer la fiabilité comme partenaire d'exécution et recommander à ses clients

**Persona** : Camille | **Epic** : Prescripteurs | **RICE** : R-13 → 180 (obligatoire V1)
**Dépendances** : F-05 (portfolio), copy Camille, confirmations certifications

#### Job-to-be-done
En tant que Camille, architecte paysagiste, je veux accéder à une page professionnelle dédiée que je peux montrer à mon client afin de légitimer ma recommandation par des preuves objectives.

#### Contexte de navigation
- **Origine** : bouche-à-oreille professionnel, LinkedIn, partage direct d'URL
- **Déclencheur** : Camille cherche un exécutant fiable pour un client 78/92
- **Destination succès** : clic CTA "Présentons-nous" → `/contact?type=prescripteur`
- **Destination échec** : page trop généraliste (lue comme site grand public, pas espace pro)

#### Contenu requis

| Section | Contenu | Règle |
|---------|---------|-------|
| Accroche | "L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription" | Texte exact — [WORDING : confirmer avec ux-writing-guide.md si livré] |
| Valeur prop Camille | Respect du cahier des charges, interlocuteur technique dédié, pas de court-circuit de la relation client | Ton professionnel, pas marketing |
| Preuves pour Camille | Socotec CSP/ESP-001, L'Esprit Piscine, 30+ ans en 78/92, bureau d'études intégré | |
| Protocole de collaboration | Lecture des plans, retours avant exécution, points d'avancement | Process concret — rassure Camille sur le fonctionnement |
| Accès portfolio | Lien vers `/realisations?filter=projet_complet` | Filtre pré-activé sur "Projets complets" |
| Certifications | Mention des certifications — [À CONFIRMER : fichiers PDF téléchargeables ou non disponibles en V1] | [HYPOTHÈSE : si PDF non disponibles, mentionner "sur demande" — à valider avec Nicolas Berg] |
| CTA distinct | "Présentons-nous — portfolio et références disponibles sur demande" → `/contact` avec type pré-sélectionné | `data-track="cta"` `data-position="prescripteur_cta"` |

#### 5 états UI

| État | Affichage |
|------|-----------|
| **Défaut** | Page complète, lisible par Camille ET par le client d'un architecte |
| **Loading** | Hydration React — skeleton si nécessaire |
| **Vide** | N/A — page statique |
| **Erreur** | N/A — pas d'interaction dynamique |
| **Succès** | N/A |

#### Critères d'acceptation

**Happy path :**
1. Given Camille arrive sur `/prescripteurs` / When elle lit le premier écran / Then l'accroche "L'exécutant haut de gamme que vos clients méritent" est visible sans scroll desktop.
2. Given Camille veut voir le portfolio / When elle clique sur le lien portfolio / Then elle arrive sur `/realisations` avec le filtre "Projets complets" pré-activé.
3. Given Camille clique sur le CTA "Présentons-nous" / When la navigation se produit / Then elle arrive sur `/contact` avec le type de projet "Prescripteur / Architecte" pré-sélectionné.

**Erreurs :**
4. Given Camille partage l'URL à son client / When le client ouvre la page sans contexte / Then la page est lisible et crédible sans jargon interne — le client comprend ce que fait [SITE_NAME].
5. Given JavaScript est désactivé / When Camille charge la page / Then tout le contenu et le CTA sont accessibles en HTML pur.

**Cas limites :**
6. Given les certifications PDF ne sont pas disponibles en V1 / When Camille cherche les certifications / Then la page indique "certifications disponibles sur demande" — jamais de lien PDF vers un fichier manquant (404).
7. Given Camille arrive depuis LinkedIn / When la page charge / Then les OG tags (titre, description, image) correspondent à la page prescripteurs (pas à l'accueil).

**Permissions :**
8. Given Googlebot crawle `/prescripteurs` / When il analyse le HTML / Then la page est indexable (pas de `noindex`) — Camille peut la partager par email ET la retrouver sur Google.

**Données existantes :**
9. Given le composant cross-selling jardins ↔ piscines est sur d'autres pages / When Camille lit `/prescripteurs` / Then le composant cross-selling grand public N'est PAS présent sur cette page — ton professionnel maintenu de bout en bout.

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement — auto | `page_path: "/prescripteurs"` |
| `prescripteur_page_viewed` (E-07) | `useEffect` au montage | `referrer_type: "direct"/"google"/"social"/"internal"`, `device_type` |
| `prescripteur_cta_clicked` (E-08) | Clic CTA "Présentons-nous" | `position: "above_fold"/"milieu_page"/"footer_page"` |
| `cta_clicked` (E-04) | Clic CTA | `page_source: "prescripteurs"`, `position: "prescripteur_cta"` |

#### Notes

- **@fullstack** : le pré-remplissage du type "Prescripteur/Architecte" dans le formulaire se fait via query param : `/contact?type=prescripteur` lu côté client après hydration. Voir US-08 (F-08) pour le comportement côté formulaire.
- **@qa** : vérifier que le composant cross-selling grand public est absent. Vérifier le pré-remplissage du formulaire.
- **@ux** : page doit fonctionner pour deux audiences (Camille + client de Camille) — ne pas sur-techniciser.

---

## F-08 — Page contact avec formulaire qualifiant

**Persona** : Alexandre (principal) + Camille (secondaire)
**URL** : `/contact`
**Lien NSM** : SEUL point de génération du KPI North Star — conversion directe
**Roadmap** : R-06, R-12

> C'est la feature la plus critique du site. Toute ambiguïté ici = lead perdu ou bug silencieux.

### US-08 — Soumettre un formulaire de contact qualifiant

**Persona** : Alexandre | **Epic** : Conversion | **RICE** : R-06 → 1020
**Dépendances** : R-03 (infra Cloudflare), setup email contact@aqua-system.fr

#### Job-to-be-done
En tant qu'Alexandre convaincu par le site, je veux décrire mon projet en 2 minutes afin d'obtenir un premier contact de l'équipe sans avoir à passer un appel téléphonique.

#### Contexte de navigation
- **Origine** : toute page via CTA "Parlez-nous de votre projet", `/prescripteurs` via CTA "Présentons-nous"
- **Déclencheur** : clic sur un CTA de conversion
- **Destination succès** : soumission → page de confirmation `/contact/merci`
- **Destination échec** : abandon formulaire (tracking E-03), erreur d'envoi (feedback utilisateur)

---

### Champs du formulaire

| Champ | ID HTML | Type | Obligatoire | Validation client | Validation serveur | Exemple |
|-------|---------|------|-------------|-------------------|-------------------|---------|
| Prénom et Nom | `prenom_nom` | `text` | Oui | Non vide, ≥ 2 caractères | Non vide, trim, max 100 chars | "Alexandre Moreau" |
| Email | `email` | `email` | Oui | Format RFC 5322 (navigateur natif + regex) | Format email valide (regex serveur) | "a.moreau@domaine.fr" |
| Téléphone | `telephone` | `tel` | **Non — facultatif** | Si rempli : Format FR 10 chiffres, commence par 0 — accepter espaces/tirets | Si présent : Regex `^0[1-9][0-9]{8}$` après nettoyage | "06 12 34 56 78" |
| Votre projet (chips) | `type_projet` | `checkbox` (UI en chips optionnels) | **Non** | Aucun chip obligatoire | Si présent : enum valeurs valides uniquement | `["piscine_bien_etre"]` |
| Commune | `commune` | `text` | Oui | Non vide | Non vide, trim, max 100 chars | "Le Vésinet" |
| Budget indicatif | `budget_tranche` | `select` | Non | N/A | Enum ou absent | `"50_80k"` |
| Description du projet | `description` | `textarea` | Oui | ≥ 20 caractères | ≥ 20 chars, ≤ 2000 chars | "J'ai un terrain de 2 000 m² et..." |
| Honeypot | `website` | `text` (caché CSS) | N/A | N/A | Doit être vide — si rempli : rejet silencieux | _(vide)_ |
| Langue | _(champ caché)_ | `hidden` | Auto | N/A | Valeur : `"fr"` | "fr" |

> **Note arbitrage P0-2** : le creative-brief §9 impose « champ "votre projet" (texte libre) — pas de menu déroulant forcé ». La solution retenue honore cette obligation : des chips de qualification OPTIONNELS (sélection visuelle, zéro obligation) + le champ Description en texte libre OBLIGATOIRE. Le formulaire est valide sans aucun chip coché. La qualification fine se fait à la lecture de la description par Nicolas Berg.

#### Valeurs des énumérations

**type_projet** (chips optionnels — aucun chip n'est obligatoire, le formulaire est valide sans sélection) :

| Label affiché (chip) | Valeur API | Smart default (page source) |
|---------------------|-----------|---------------------------|
| Piscine & Bien-être | `piscine_bien_etre` | Depuis `/piscines-bien-etre` |
| Jardin & Paysage | `jardin_paysage` | Depuis `/jardins-paysage` |
| Projet complet | `projet_complet` | — |
| Espace prescripteur | `prescripteur` | Depuis `/prescripteurs` |
| _(aucun coché)_ | _(absent du payload)_ | — |

**budget_tranche** (select, facultatif) :

| Label affiché | Valeur API |
|--------------|-----------|
| _(Choisir si vous le souhaitez)_ | _(absent du payload)_ |
| 50 000 – 80 000 € | `50_80k` |
| 80 000 – 150 000 € | `80_150k` |
| 150 000 € et plus | `150k_plus` |
| Je préfère en discuter | `prefere_discuter` |

> **Note arbitrage P0-3** : grille validée par @copywriter (ux-writing-guide). Le palier "< 50 000 €" est supprimé — cohérent avec le ticket minimum qualifié 70-80k€ (project-context.md). "Je préfère en discuter" maintenu : conforme à l'esprit qualification douce du creative-brief.

#### Pré-remplissage depuis d'autres pages

- Depuis `/prescripteurs` → activer chip "Espace prescripteur" au chargement côté client (via `?source=prescripteurs` ou smart default sur la route entrante).
- Depuis `/piscines-bien-etre` → activer chip "Piscine & Bien-être".
- Depuis `/jardins-paysage` → activer chip "Jardin & Paysage".
- Lecture du paramètre après hydration (`useSearchParams` + `Suspense`).
- Si la valeur du paramètre n'est pas dans l'enum : ignorer silencieusement.
- Un chip activé par smart default reste désactivable par l'utilisateur (pas de pré-sélection forcée).

---

### API — Pages Function `POST /api/contact`

#### Endpoint

```
POST /api/contact
```

Fichier côté Cloudflare : `/functions/api/contact.ts`

#### Headers requis

```
Content-Type: application/json
   OU
Content-Type: application/x-www-form-urlencoded   (fallback JS désactivé)
```

#### Schéma request (JSON)

```typescript
interface ContactRequest {
  prenom_nom: string;           // obligatoire, trim, max 100
  email: string;                // obligatoire, format email
  telephone?: string;           // OPTIONNEL — si présent, validé format FR ^0[1-9][0-9]{8}$
  type_projet?: Array<          // OPTIONNEL — chips non cochés = absent du payload
    "piscine_bien_etre" | "jardin_paysage" | "projet_complet" | "prescripteur"
  >;
  commune: string;              // obligatoire, trim, max 100
  budget_tranche?: string;      // optionnel — enum ou absent
  description: string;          // obligatoire, ≥ 20 chars, ≤ 2000 chars
  langue: string;               // "fr" — injecté automatiquement
  website: string;              // honeypot — DOIT être vide string ""
}
```

#### Validations serveur (Cloudflare Pages Function)

1. `prenom_nom` : non vide après trim, longueur ≤ 100 → sinon 400
2. `email` : regex email valide → sinon 400
3. `telephone` : **si présent** — après nettoyage (suppression espaces/tirets/points), regex `^0[1-9][0-9]{8}$` → sinon 400. Si absent : valide (champ optionnel)
4. `type_projet` : **si présent** — tableau, toutes les valeurs dans l'enum `["piscine_bien_etre", "jardin_paysage", "projet_complet", "prescripteur"]` → sinon 400. Si absent : valide (chips optionnels)
5. `commune` : non vide après trim → sinon 400
6. `budget_tranche` : si présent, doit être dans l'enum `["50_80k", "80_150k", "150k_plus", "prefere_discuter"]` → sinon 400
7. `description` : ≥ 20 caractères après trim, ≤ 2000 → sinon 400
8. `website` (honeypot) : doit être vide string `""` ou absent → si non vide : retourner 200 silencieux (pas de 403 qui indiquerait au bot que le filtre est actif)
9. Rate limiting : [HYPOTHÈSE : max 5 requêtes/IP/heure via Cloudflare WAF rule ou KV counter — implémenter via Cloudflare Rate Limiting rule sur `/api/contact`, gratuit dans le free tier] → si dépassé : 429

#### Anti-spam — Décision technique

**Choix retenu : Honeypot + Rate Limiting Cloudflare**

Justification du choix vs Cloudflare Turnstile :
- Turnstile (CAPTCHA invisible) : ajout de 20-30 Ko JS + dépendance Cloudflare CAPTCHA API + risque de friction UX si le score de confiance est faible.
- Honeypot + Rate Limiting : zéro friction pour l'utilisateur réel, protection efficace contre les bots basiques, Cloudflare WAF rate limiting = natif à la stack.
- Décision : **Honeypot obligatoire + Cloudflare Rate Limiting (5 req/IP/heure)**. Si les spams deviennent un problème post-launch (> 10 spams/jour), activer Turnstile en V1.1.

[HYPOTHÈSE : le trafic du site en V1 étant faible, les bots sophistiqués cibleront d'autres sites. La protection basique est suffisante pour l'objectif 10 leads/mois.]

#### Envoi email

**Service email** : [À CONFIRMER avec @infrastructure — Resend recommandé (generous free tier, API simple, compatible Cloudflare Workers)] [HYPOTHÈSE : Resend.com, 100 emails/jour gratuits, DPA disponible]

**Format de l'email reçu par Nicolas Berg** :

```
Sujet : [SITE_NAME] — Nouveau contact : [type_projet(s) ou "projet à préciser"] — [commune]
  Exemple avec chips : "Aquasystem — Nouveau contact : Piscine & Bien-être, Projet complet — Le Vésinet"
  Exemple sans chips : "Aquasystem — Nouveau contact : projet à préciser — Le Vésinet"

De : noreply@[domaine-ombrelle].fr (Reply-To: email du contact)
À : contact@aqua-system.fr

---
NOUVEAU MESSAGE DE CONTACT

Nom : [prenom_nom]
Email : [email]  ← Reply-To configuré pour permettre réponse directe
Téléphone : [telephone ou "Non renseigné"]
Commune : [commune]
Type(s) de projet : [type_projet joint par " / " ou "Non précisé — voir description"]
Budget indicatif : [budget_tranche ou "Non renseigné"]

Description du projet :
[description]

---
Reçu le : [date ISO locale FR] à [heure]
Source page : [page_source si transmise, sinon "contact direct"]
Qualifié NSM : [OUI si commune 78/92 ET description ≥ 20 chars / NON si hors zone]
---
Répondre directement à cet email pour contacter [prenom_nom].
```

> **Note arbitrage P0-3** : la qualification NSM n'exige plus `type_projet non null` comme critère strict côté email — la description ≥ 20 chars suffit avec la commune 78/92. La qualification fine (piscine vs jardin) se fait à la lecture par Nicolas.

**Note NSM** : La qualification "lead qualifié" est calculée côté email/analytics uniquement — jamais côté formulaire (un lead hors 78/92 est accepté et transmis, simplement marqué "hors zone" dans l'email).

**Définition complète lead qualifié** (pour Umami dashboard) :
- `commune` appartient aux départements 78 ou 92 (détecté par @data-analyst dashboard — pas par la Function)
- `type_projet` : au moins une valeur non null
- `description` : ≥ 20 caractères
- Ces critères sont INFORMATIFS — le formulaire n'en bloque aucun.

#### Réponses API

**Succès :**
```json
HTTP 200
{
  "success": true,
  "message": "Votre message a bien été transmis."
}
```

**Erreur de validation (400) :**
```json
HTTP 400
{
  "success": false,
  "error": "validation",
  "fields": {
    "email": "Format d'email invalide.",
    "description": "Décrivez votre projet en quelques mots (20 caractères minimum).",
    "telephone": "Numéro de téléphone invalide (format français attendu : 06 XX XX XX XX) — ou laissez ce champ vide."
  }
}
```

**Erreur d'envoi email (500) :**
```json
HTTP 500
{
  "success": false,
  "error": "send_failure",
  "message": "Une erreur est survenue. Veuillez réessayer ou nous appeler au 01 30 42 26 00."
}
```

**Rate limit dépassé (429) :**
```json
HTTP 429
{
  "success": false,
  "error": "rate_limit",
  "message": "Trop de tentatives. Veuillez réessayer dans une heure ou nous appeler au 01 30 42 26 00."
}
```

**Honeypot déclenché :** HTTP 200 avec `{ "success": true }` — rejet silencieux.

#### Comportement si l'envoi email échoue (HTTP 500)

**Règle absolue : l'utilisateur ne perd JAMAIS sa saisie sans feedback.**

1. La Pages Function retourne HTTP 500 avec message d'erreur.
2. Côté client : le formulaire reste visible avec toutes les valeurs saisies.
3. Le bouton reprend son état normal (fin de loading).
4. Message d'erreur affiché : "Une erreur est survenue. Vos informations sont conservées dans cette page — vous pouvez réessayer ou nous appeler directement au 01 30 42 26 00."
5. Le numéro de téléphone dans le message d'erreur est un `<a href="tel:+33130422600">` cliquable.
6. [HYPOTHÈSE : en V1.1, envisager un log Cloudflare KV des soumissions en échec pour audit Nicolas Berg]

---

### 5 états UI du formulaire

| État | Affichage exact |
|------|----------------|
| **Défaut** | Formulaire : chips optionnels "Votre projet concerne :", champ description texte libre obligatoire, téléphone facultatif, sélecteur budget optionnel, mention RGPD version courte, bouton "Parlez-nous de votre projet" (actif, couleur brand) |
| **Loading** | Bouton désactivé (`disabled`), texte du bouton → "Envoi en cours…", spinner discret. **Aucun autre élément de la page ne change.** Durée max affichée : 10 secondes — si pas de réponse à 10s → basculer en état erreur (timeout). |
| **Vide (champ requis non rempli)** | Validation inline après `blur` ou tentative de soumission. Message sous le champ concerné : voir tableau messages d'erreur ci-dessous. Source de vérité wording : `docs/copy/ux-writing-guide.md` §2. Bouton reste actif (pas de désactivation préventive). |
| **Erreur (erreur réseau / 500)** | Formulaire reste visible avec toutes les valeurs saisies. Message en haut du formulaire (rôle `alert` ARIA) : cf. ux-writing-guide.md §2 "Erreur d'envoi — Échec technique". Bouton redevient actif. |
| **Succès (200)** | Redirection vers `/contact/merci` (page distincte). L'URL change pour permettre le tracking fiable de E-01 et éviter la re-soumission sur refresh. Voir section "Page de confirmation `/contact/merci`" ci-dessous. |

#### Messages d'erreur inline (champ par champ)

> **Source de vérité : `docs/copy/ux-writing-guide.md` §2.** Les textes ci-dessous sont la version specs — en cas de divergence, le ux-writing-guide prévaut (arbitrage P1-3).

| Champ | Message affiché (texte exact — source ux-writing-guide §2) |
|-------|-------------------------------|
| `prenom_nom` vide | "Votre nom nous permet de vous répondre personnellement." |
| `email` vide | "Nous avons besoin de votre email pour vous répondre." |
| `email` invalide | "L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr)." |
| `telephone` invalide (si rempli) | "Ce numéro ne semble pas valide — vérifiez ou laissez ce champ vide si vous préférez." |
| `commune` vide | "Précisez votre commune pour que nous puissions répondre de façon pertinente." |
| `description` vide | "Décrivez votre projet en quelques mots — cela guidera notre premier échange." |
| `description` < 20 chars | "Décrivez votre projet en quelques mots — cela guidera notre premier échange." |
| `description` > 2000 chars | "Description trop longue (2000 caractères maximum)." |

---

### Page de confirmation `/contact/merci`

> **Arbitrage P0-4** : page distincte retenue (vs bloc inline). Raisons : (1) tracking E-01 fiable — une URL = une conversion propre sans risque de double-comptage ; (2) anti-double soumission sur refresh ; (3) comportement standard attendu pour un formulaire B2B premium.

**Contenu** :
- Titre : "Votre message est bien parvenu." (source : ux-writing-guide §3)
- Corps : "Nicolas Berg reviendra vers vous [À CONFIRMER : délai de réponse réel de Nicolas] pour un premier échange autour de votre projet."
- Numéro de téléphone : "Si votre demande est urgente, vous pouvez aussi nous appeler directement au 01 30 42 26 00."
- Lien : "← Retour à l'accueil" → `/`
- **Pas de CTA vers `/contact`** (éviter la re-soumission immédiate).
- **Pas de confetti, pas d'animation excessive** — ton sobre conforme brand.

> **Note** : le placeholder `[À CONFIRMER]` est maintenu. La valeur "2 jours ouvrés" de la version v1.0 était une hypothèse non validée — retirée. Si Nicolas confirme un délai, remplacer uniquement dans cette section.

**Comportement navigation arrière** : Si l'utilisateur appuie sur "Retour" depuis `/contact/merci`, il revient sur `/contact` avec le formulaire **vide** (pas re-soumission). L'URL `/contact/merci` est accessible directement (pas de redirect guard côté server en export statique) — comportement acceptable.

**Double soumission** : Le bouton passe en `disabled` dès le premier clic et reste désactivé pendant le loading. Côté client, un flag `isSubmitting` empêche les appels multiples. Côté server, la Pages Function est idempotente pour la même session (pas de dedup sophistiqué en V1 — la protection client suffit).

---

### Mention RGPD sous le formulaire

**Texte exact à intégrer** (source : rgpd-checklist.md section D, version courte recommandée) :

> Les informations recueillies dans ce formulaire sont utilisées exclusivement pour traiter votre demande et établir un éventuel devis. Elles sont conservées 3 ans et ne sont partagées avec aucun tiers commercial. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition : contact@aqua-system.fr. [Politique de confidentialité →]

**Implémentation** : texte placé entre le dernier champ et le bouton de soumission, style `text-sm text-muted`, lien "Politique de confidentialité" → `/politique-confidentialite` (page distincte — arbitrage P1-2).

> **Note arbitrage P1-2** : la politique de confidentialité est une page distincte `/politique-confidentialite`, pas une ancre `#confidentialite` sur `/mentions-legales`. Raison : le lien RGPD du formulaire doit arriver directement sur le contenu de confidentialité sans dépendre du défilement d'une page longue.

---

### Critères d'acceptation US-08

**Happy path :**
1. Given Alexandre remplit les champs obligatoires (prenom_nom, email, commune, description ≥ 20 chars) sans sélectionner de chip ni renseigner de téléphone / When il clique sur "Parlez-nous de votre projet" / Then le bouton passe en loading, la Pages Function est appelée avec `type_projet: absent`, et Alexandre est redirigé vers `/contact/merci` avec le titre "Votre message est bien parvenu."
2. Given Alexandre ne renseigne pas le budget (champ optionnel) / When il soumet le formulaire avec tous les autres champs valides / Then la soumission réussit — l'email reçu par Nicolas indique "Budget : Non renseigné".
3. Given Alexandre arrive depuis `/prescripteurs` / When le formulaire se charge / Then le chip "Espace prescripteur" est activé côté client (smart default) — il reste désactivable par l'utilisateur.

**Erreurs :**
4. Given Alexandre saisit un email mal formaté (ex: "alexandre.test") / When il tente de soumettre / Then le formulaire ne soumet pas, le message "L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr)." apparaît sous le champ email (source : ux-writing-guide §2), le focus se positionne sur ce champ.
5. Given Alexandre saisit une description de 15 caractères / When il tente de soumettre / Then le message "Décrivez votre projet en quelques mots — cela guidera notre premier échange." apparaît sous le champ description (source : ux-writing-guide §2).
6. Given la Pages Function retourne une erreur 500 (service email indisponible) / When Alexandre a cliqué "Parlez-nous de votre projet" / Then le formulaire reste visible avec toutes les valeurs saisies, le message "Une erreur est survenue. Vos informations sont conservées dans cette page — vous pouvez réessayer ou nous appeler directement au 01 30 42 26 00." s'affiche en haut du formulaire.

**Cas limites :**
7. Given Alexandre double-clique sur le bouton de soumission / When le formulaire est en cours d'envoi / Then le bouton est désactivé après le premier clic — une seule requête est envoyée à la Pages Function.
8. Given le formulaire prend plus de 10 secondes à répondre (timeout réseau) / When Alexandre attend / Then après 10 secondes sans réponse, le client bascule en état erreur avec le message d'erreur 500 et le numéro de téléphone.
9. Given JavaScript est désactivé / When Alexandre soumet le formulaire via `<form method="POST" action="/api/contact">` natif / Then la Pages Function reçoit les données en `application/x-www-form-urlencoded`, les valide et envoie l'email — Alexandre voit la page de confirmation (redirect HTTP 303 vers `/contact/merci` renvoyé par la Function).

**Spam / abus :**
10. Given un bot remplit le champ honeypot `website` / When la Pages Function reçoit la requête / Then elle retourne HTTP 200 avec `{ "success": true }` — rejet silencieux, aucun email envoyé, aucun log d'erreur exposé.
11. Given une IP envoie 6 requêtes en moins d'une heure / When la 6e requête arrive / Then la Function retourne 429 avec le message "Trop de tentatives. Veuillez réessayer dans une heure ou nous appeler au 01 30 42 26 00."

**Données existantes :**
12. Given Nicolas Berg reçoit un email avec type_projet = "Piscine & Bien-être" et commune = "Versailles" (92) / When il lit l'email / Then le sujet contient "[SITE_NAME] — Nouveau contact : Piscine & Bien-être — Versailles" et le corps contient "Qualifié NSM : OUI" car Versailles est en 92.
13. Given Alexandre soumet le formulaire sans sélectionner aucun chip / When la Pages Function traite la requête / Then la soumission réussit (type_projet absent = valide) — l'email reçu indique "Type(s) de projet : Non précisé — voir description".

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement `/contact` — auto | `page_path: "/contact"` |
| `form_start` (E-02) | Focus sur le premier champ du formulaire (`#prenom_nom`) | `page_source: "contact"`, `device_type` |
| `form_abandonment` (E-03) | `beforeunload` si `form_start` déclenché ET pas de `form_submission_success` | `derniere_etape: "description"` (dernier champ modifié), `champs_remplis: 5` |
| `form_submission_success` (E-01) | Réponse HTTP 200 de la Pages Function | `type_projet: ["piscine_bien_etre"]` ou `null` si aucun chip, `commune: "le_vesinet"`, `budget_renseigne: true`, `budget_tranche: "50_80k"`, `has_description: true`, `page_source: "contact"` |
| `cta_clicked` (E-04) | Clic sur le bouton "Parlez-nous de votre projet" | `page_source: "contact"`, `position: "footer"` |

**Note RGPD E-01** : les propriétés `type_projet`, `commune`, `budget_tranche` (fourchette), `has_description` (booléen) ne contiennent jamais de valeur personnelle (nom, email, contenu libre). `commune` est la ville en clair — acceptable selon tracking-plan.md.

#### Notes

- **@fullstack** : la Pages Function doit gérer les deux content-types (`application/json` ET `application/x-www-form-urlencoded`) pour le fallback JS désactivé. En cas de form natif, la Function retourne `HTTP 303 Location: /contact/merci`.
- **@fullstack** : le champ honeypot `website` doit être caché par CSS (`display: none` ou `position: absolute; left: -9999px`) — jamais par `type="hidden"` (les bots lisent les hidden fields).
- **@fullstack** : timeout client à implémenter avec `AbortController` + `setTimeout(10000)`.
- **@qa** : scénarios critiques à tester en priorité :
  1. Soumission valide complète avec chips + téléphone → vérifier email reçu par Nicolas Berg
  2. Soumission valide sans aucun chip ni téléphone → email reçu avec "Type(s) de projet : Non précisé" + "Téléphone : Non renseigné"
  3. Soumission valide sans budget → email reçu avec "Budget : Non renseigné"
  4. Double-clic → 1 seul email reçu
  5. Honeypot rempli → 0 email reçu, réponse 200
  6. Rate limit → 429 après 5 tentatives
  7. Formulaire natif (JS désactivé) → email reçu, redirect `/contact/merci`
  8. Erreur 500 simulée → formulaire préservé, message d'erreur visible
  9. Timeout 10s simulé → état erreur, numéro visible
  10. Smart default depuis `/piscines-bien-etre` → chip "Piscine & Bien-être" pré-activé, désactivable
- **@ux** : vérifier que la mention RGPD est lisible (contraste, taille) sans gêner l'accès au bouton.

---

## F-09 — Pages légales (mentions légales + politique de confidentialité)

**Persona** : N/A (conformité légale)
**URLs** : `/mentions-legales` + `/politique-confidentialite` (2 pages distinctes — arbitrage P1-2)
**Lien NSM** : Indirect — protège la mise en ligne publique
**Roadmap** : R-19

### US-09 — Accéder aux informations légales et exercer ses droits RGPD

**Persona** : N/A (visiteur quelconque) | **Epic** : Conformité | **RICE** : R-19 → 950
**Dépendances** : @legal (validation avant mise en ligne — gate G-LEGAL bloquante)

#### Job-to-be-done
En tant que visiteur souhaitant connaître ses droits ou vérifier la légitimité du site, je veux accéder aux informations légales complètes afin d'exercer mes droits RGPD ou vérifier l'identité de l'éditeur.

#### Contexte de navigation
- **Origine** : lien footer "Mentions légales" ou "Politique de confidentialité"
- **Déclencheur** : curiosité légale, exercice d'un droit RGPD
- **Destination succès** : lecture + contact si exercice de droit
- **Destination échec** : N/A (page statique)

#### Contenu requis

**Section Mentions légales :**

| Champ | Valeur |
|-------|--------|
| Éditeur | SARL AQUA SYSTEM |
| SIREN | 903 785 327 |
| Capital social | 20 000 € |
| Code NAF | 4399D |
| Adresse | 45 Route Nationale, 78840 Freneuse |
| Téléphone | 01 30 42 26 00 |
| Email | contact@aqua-system.fr |
| Directeur de la publication | Nicolas Berg |
| Hébergeur | Cloudflare Inc., 101 Townsend St, San Francisco, CA 94107, USA |
| Mention LTE | "Le site présente également les services de Les Terres Essentielles, en partenariat avec SARL AQUA SYSTEM. SAS LES TERRES ESSENTIELLES, SIREN 811 198 217." |

**Section Politique de confidentialité :**
> **Arbitrage P1-2** : la politique de confidentialité est une PAGE DISTINCTE à l'URL `/politique-confidentialite`, PAS une ancre sur `/mentions-legales`. Raison : le lien depuis la mention RGPD du formulaire doit arriver directement sur cette page sans dépendre du défilement. La page `/mentions-legales` peut inclure un renvoi "Voir notre politique de confidentialité →" mais ne l'héberge pas.

Source : `docs/legal/privacy-policy.md` (produit par @legal). Contenu de `/politique-confidentialite` :
- Les 3 traitements : formulaire de contact, logs Cloudflare, analytics (Umami)
- Droits des personnes (accès, rectification, effacement, opposition)
- Contact pour exercice des droits : contact@aqua-system.fr
- Autorité de contrôle : CNIL (www.cnil.fr)

#### 5 états UI

Page statique — pas d'états dynamiques.

#### Critères d'acceptation

**Happy path :**
1. Given un visiteur clique sur "Mentions légales" dans le footer / When la page charge / Then SIREN 903 785 327, capital 20 000 €, adresse 45 Route Nationale 78840 Freneuse, directeur Nicolas Berg et hébergeur Cloudflare sont visibles.
2. Given un visiteur clique sur "Politique de confidentialité" dans le footer / When la page `/politique-confidentialite` charge / Then les 3 traitements, la durée de conservation (3 ans), et l'adresse contact@aqua-system.fr pour exercice des droits sont visibles.
3. Given un visiteur veut exercer son droit d'opposition / When il cherche le contact / Then l'email contact@aqua-system.fr est un lien `<a href="mailto:contact@aqua-system.fr">` cliquable.

**Erreurs :**
4. Given JavaScript est désactivé / When la page charge / Then tout le contenu légal est accessible en HTML pur.
5. Given la gouvernance LTE n'est pas finalisée / When la page est publiée / Then la formulation est "en partenariat avec" — jamais "filiale de" ou "propriété de" — validation @legal gate G-LEGAL.

**Cas limites :**
6. Given Googlebot crawle `/mentions-legales` / When il analyse / Then la page est indexable (pas de `noindex`) — les moteurs peuvent crawler les mentions légales.
7. Given le visiteur clique sur le lien "Politique de confidentialité →" depuis la mention RGPD du formulaire / When il arrive / Then il est sur `/politique-confidentialite`, la page charge directement sur le contenu de confidentialité (pas d'ancrage dans une page longue).

**Permissions :**
8. Given @legal effectue sa revue finale (gate G-LEGAL) / When il vérifie les informations légales / Then 0 non-conformité P0 détectée — le déploiement public est autorisé.

**Données existantes :**
9. Given les données SIREN, capital, adresse sont dans `src/config/site.ts` / When la page est générée / Then ces valeurs sont issues de la config (jamais dupliquées à la main dans le copy).

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `page_viewed` (E-10) | Chargement — auto | `page_path: "/mentions-legales"` |

#### Notes

- **@fullstack** : les données SIREN, adresse, capital doivent être importées depuis `src/config/site.ts` pour éviter les incohérences — pas de duplication.
- **@legal** : gate G-LEGAL bloquante avant mise en ligne publique.
- **@qa** : vérifier la présence de TOUS les éléments légaux listés dans le critère 1 et 2.

---

## F-10 — Composants transversaux

**Persona** : Alexandre + Camille (toutes les pages)
**Lien NSM** : Cohérence de la conviction et accessibilité du CTA sur tout le parcours
**Roadmap** : R-05, R-16, R-17

### US-10 — Naviguer de façon cohérente sur tout le site

**Persona** : Alexandre | **Epic** : Core site | **RICE** : fondation de toutes les autres stories
**Dépendances** : R-02 (design system)

#### Composants requis

---

**Header / Navigation**

| Élément | Valeur | Règle |
|---------|--------|-------|
| Logo | `SITE_NAME` ombrelle | Lien vers `/` |
| Navigation desktop | Réalisations / Piscines & Bien-être / Jardins & Paysage / Notre approche / La maison / Architectes | Ordre exact (arbitrage P0-5) — 6 liens, pas d'"Accueil" (logo = lien home), pas de "Contact" (bouton CTA distinct) — "Architectes" → `/prescripteurs` |
| Navigation mobile | Menu hamburger | Zone tap ≥ 44px, fermeture au clic extérieur |
| CTA Header | "Parlez-nous de votre projet" | `data-track="cta"` `data-position="navbar"` — visible desktop, masqué ou réduit mobile |

---

**Footer**

| Élément | Valeur |
|---------|--------|
| Logo ombrelle | Lien vers `/` |
| Aqua System | Adresse, téléphone (lien tel:), email (lien mailto:) |
| Les Terres Essentielles | "en partenariat avec Les Terres Essentielles" + adresse LTE |
| Liens légaux | "Mentions légales" → `/mentions-legales`, "Politique de confidentialité" → `/politique-confidentialite` |
| Certifications | Logo/mention Socotec + L'Esprit Piscine (discret) |
| Réseaux sociaux | Facebook LTE (`https://www.facebook.com/LesTerresEssentielles/`), LinkedIn Aqua System [URL à fournir par fondateur] |
| Copyright | © [année auto] [SITE_NAME]. Tous droits réservés. |

---

**Composant CTA global `<CTAButton />`**

```typescript
interface CTAButtonProps {
  page_source: string;   // Transmis à trackEvent
  position: "hero" | "section_milieu" | "footer" | "navbar" | "prescripteur_cta";
  label?: string;        // Défaut : "Parlez-nous de votre projet"
  href?: string;         // Défaut : "/contact"
}
```

- Déclenche `trackEvent('cta_clicked', { page_source, position, label_cta })` au clic.
- Rend un `<a>` (pas un `<button>`) pour la navigation — accessible au clavier et sans JS.

---

**Composant ProofPoints `<ProofPoints />`**

4 éléments statiques :
1. "30+ ans d'expertise"
2. "350+ piscines entretenues"
3. Certification Socotec CSP/ESP-001
4. Réseau L'Esprit Piscine

Données issues de `src/config/site.ts` (constantes, pas en dur dans le composant).

---

**Composant CrossSelling `<CrossSellingBlock />`**

```typescript
interface CrossSellingBlockProps {
  source: "piscines-bien-etre" | "jardins-paysage" | "realisations";
  destination: "piscines-bien-etre" | "jardins-paysage" | "contact";
  texte: string;         // Fourni par le copy
  cta_label: string;
  cta_href: string;      // ex: "/piscines-bien-etre" ou "/jardins-paysage"
}
```

Déclenche `trackEvent('cross_selling_clicked', { source_univers: source, destination_univers: destination })` au clic.

---

**OG / Social Cards**

| Propriété | Valeur |
|-----------|--------|
| `og:title` | Titre de la page (unique) |
| `og:description` | Meta description (unique) |
| `og:image` | Image 1200×630px spécifique à la page (si disponible) ou image par défaut [SITE_NAME] |
| `og:url` | URL canonique de la page |
| `twitter:card` | `summary_large_image` |

Généré via `generateMetadata` Next.js par page.

---

**Favicons**

| Format | Taille | Fichier |
|--------|--------|---------|
| ICO | 32×32 | `/favicon.ico` |
| PNG | 192×192 | `/icon-192.png` |
| PNG | 512×512 | `/icon-512.png` |
| Apple Touch | 180×180 | `/apple-touch-icon.png` |
| SVG | scalable | `/icon.svg` |

Générés à partir de l'identité visuelle (R-02) — dépendance @design.

---

#### Critères d'acceptation

**Happy path :**
1. Given un visiteur arrive sur n'importe quelle page / When il voit le header / Then le logo, les liens de navigation et le CTA sont visibles et fonctionnels.
2. Given un visiteur est sur mobile 375px / When il ouvre le menu hamburger / Then tous les liens de navigation sont accessibles, le menu se ferme au clic sur un lien ou sur l'extérieur.
3. Given un visiteur clique sur "Mentions légales" dans le footer / When la navigation se produit / Then il arrive sur `/mentions-legales`.

**Erreurs :**
4. Given l'URL des réseaux sociaux LTE change / When un visiteur clique sur le lien Facebook / Then le lien est défini dans `src/config/site.ts` (pas en dur dans le footer) — une seule modification corrige tout.
5. Given JavaScript est désactivé / When un visiteur navigue / Then le header, footer et tous les liens sont fonctionnels — la navigation est un `<nav>` HTML natif.

**Cas limites :**
6. Given la page active est `/piscines-bien-etre` / When le visiteur voit le header / Then le lien "Piscines & Bien-être" est en état actif visuellement (ex: souligné, couleur différente) — implémenté via `usePathname`.
7. Given la page `/prescripteurs` est affichée / When le visiteur voit la navigation / Then le lien "Architectes" est en état actif.
8. Given la page active est `/la-maison` / When le visiteur voit le header / Then le lien "La maison" est en état actif visuellement.

**Permissions :**
8. Given Googlebot visite toutes les pages / When il analyse les OG tags / Then chaque page a des `og:title` et `og:description` uniques — pas de doublon entre pages.

**Données existantes :**
9. Given l'année change (2027) / When le footer s'affiche / Then le copyright affiche automatiquement l'année courante (généré dynamiquement, pas une valeur en dur).

#### Events analytics

| Event | Déclencheur | Propriétés clés |
|-------|-------------|----------------|
| `cta_clicked` (E-04) | Clic CTA navbar | `page_source: [page courante]`, `position: "navbar"` |
| `cta_clicked` (E-04) | Clic CTA footer (si dans le footer) | `position: "footer"` |

#### Notes

- **@fullstack** : toutes les URLs sociales, adresses, téléphones dans `src/config/site.ts` — jamais en dur dans les composants.
- **@design** : fournir les favicons dans tous les formats listés avec l'identité visuelle finale.
- **@qa** : tester la navigation mobile sur 3 breakpoints : 375px, 768px, 1280px.

---

## F-11 — Infrastructure technique V1

**Persona** : N/A (technique)
**Lien NSM** : Conditionne la découvrabilité (SEO) et la performance perçue
**Roadmap** : R-03, R-14, R-15, R-17, R-18, R-20, R-21

### US-11 — Garantir la performance, le SEO et la conformité technique

**Persona** : N/A | **Epic** : Infrastructure | **RICE** : R-03 → 1425 (fondation)
**Dépendances** : R-01 (domaine), @infrastructure

> Cette story est une story technique sans UI — template allégé (JTBD + critères + notes).

#### Job-to-be-done
En tant qu'équipe technique, nous voulons une infrastructure performante, conforme aux Core Web Vitals et prête pour le SEO local afin que le site soit découvrable et rapide dès le lancement.

#### Exigences techniques détaillées

**Export statique :**
- `next.config.js` : `output: 'export'`, `trailingSlash: true` (compatibilité Cloudflare Pages)
- `images.unoptimized: false` — utiliser le composant `next/image` avec optimisation au build
- Build check obligatoire avant tout commit `src/` : `npx tsc --noEmit && npx next lint && npm run build`

**Cloudflare Pages :**
- Déploiement automatique depuis branche `main` (GitHub)
- Preview déploiements sur branches feature
- Pages Function dans `/functions/api/contact.ts` (hors du build Next.js)
- Variables d'environnement : `RESEND_API_KEY`, `CONTACT_EMAIL`, `RATE_LIMIT_KV_BINDING` — configurées dans Cloudflare Dashboard, jamais dans le repo

**Core Web Vitals — seuils GO :**

| Métrique | Seuil GO | Outil de mesure |
|----------|----------|----------------|
| LCP | ≤ 2,5s | Lighthouse mobile (simulation 4G) |
| CLS | < 0,1 | Lighthouse |
| FID/INP | < 100ms | Lighthouse |

**Images :**
- Formats : AVIF (prioritaire) + WebP (fallback), générés par `next/image` au build
- Hero image : `priority={true}`, `sizes="100vw"` — jamais lazy
- Portfolio images : `loading="lazy"`, `sizes` adaptatifs
- Alt obligatoire, descriptif (pas vide, pas "image")

**SEO technique :**

| Élément | Implémentation |
|---------|----------------|
| sitemap.xml | `next-sitemap` package — auto-généré au build |
| robots.txt | Autoriser `/`, interdire `/api/` |
| Données structurées | `LocalBusiness` + `ProfessionalService` sur la page d'accueil (JSON-LD dans `<head>`) |
| Canonical URL | Via `generateMetadata` Next.js — canonique sur chaque page |
| Hreflang | FR uniquement en V1 — `<link rel="alternate" hreflang="fr" href="...">` sur toutes les pages |
| Pages EN | Exclues du sitemap, retournent 404 ou redirigent vers FR |

**i18n :**
- Package : `next-intl`
- Locale active : `fr`
- Locale EN : structure de fichiers créée (`messages/en.json` = objet vide `{}`), aucune page EN rendue
- Pas de sélecteur de langue visible en V1 (voir règle transversale)
- Format de messages : `messages/fr.json` (toutes les chaînes i18n, copie via @copywriter)

**Analytics Umami :**
- Script chargé via `next/script` avec `strategy="afterInteractive"`
- `data-website-id` configuré depuis variable d'environnement `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- Si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` absent : script non chargé, `trackEvent` fail-silent — pas d'erreur

**Page 404 :**
- Fichier : `src/app/not-found.tsx`
- Contenu : message sobre + lien "Retour à l'accueil" → `/`
- Pas de CTA formulaire sur le 404 (parcours de sortie)

#### Critères d'acceptation (story technique — binaires)

1. Given le build Next.js s'exécute / When `npm run build` se termine / Then 0 erreur TypeScript (`tsc --noEmit`), 0 erreur ESLint, build réussi — gate G-PERF pré-condition.
2. Given le site est déployé sur Cloudflare Pages / When Lighthouse mobile tourne sur `/` (simulation 4G) / Then LCP ≤ 2,5s, CLS < 0,1, INP < 100ms.
3. Given Googlebot crawle le site / When il accède à `/sitemap.xml` / Then HTTP 200, XML valide, toutes les pages V1 FR listées, aucune page EN incluse.
4. Given Googlebot accède à `/robots.txt` / When il lit le fichier / Then `Allow: /` et `Disallow: /api/` sont présents, `Sitemap:` pointe vers l'URL correcte.
5. Given un validateur schema.org analyse la page d'accueil / When il parse le JSON-LD / Then `LocalBusiness` valide avec `name`, `address`, `telephone`, `areaServed`.
6. Given la variable `NEXT_PUBLIC_UMAMI_WEBSITE_ID` est absente / When le site charge / Then aucune erreur JavaScript — `trackEvent` est un no-op silencieux.
7. Given un visiteur accède à une URL inexistante (ex: `/page-inexistante`) / When la page 404 s'affiche / Then le message sobre et le lien "Retour à l'accueil" sont visibles, le code HTTP est 404.
8. Given la Pages Function reçoit une requête valide / When la clé API email est absente de l'environnement / Then la Function retourne 500 avec le message d'erreur standard (pas de crash silencieux, pas d'exposition de la clé).

#### Events analytics

N/A — infrastructure sans interactions utilisateur directes.

#### Notes

- **@infrastructure** : configurer les variables d'environnement dans Cloudflare Dashboard : `RESEND_API_KEY`, `CONTACT_EMAIL` (= `contact@aqua-system.fr`), `RATE_LIMIT_KV_BINDING` (namespace KV pour le rate limiting), `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- **@fullstack** : `trailingSlash: true` est requis pour Cloudflare Pages (évite les 404 sur les URLs sans slash final).
- **@qa** : gate G-PERF = LCP < 2,5s mobile. Tester avec Lighthouse CLI, pas seulement DevTools (environnement contrôlé).

---

## Règles métier transversales

### Définition "lead qualifié" (KPI North Star)

Un lead est qualifié pour le comptage NSM si ET seulement si (détection côté dashboard Umami, PAS côté formulaire) :
- `commune` : appartient aux départements 78 (Yvelines) ou 92 (Hauts-de-Seine) — détection manuelle ou par liste de communes [HYPOTHÈSE : liste des communes 78/92 à maintenir dans le dashboard Umami, non automatisée en V1]
- `has_description` = `true` (description ≥ 20 chars)

> **Mise à jour arbitrage P0-2** : le critère `type_projet non null` est retiré de la définition NSM stricte. Les chips sont optionnels — un lead sans chip mais avec description ≥ 20 chars et commune 78/92 est qualifié. La qualification fine (piscine vs jardin) se fait à la lecture par Nicolas Berg. Le critère `type_projet` reste disponible comme filtre optionnel dans le dashboard pour la segmentation.

**Le formulaire n'applique jamais ce filtre** : un lead hors 78/92 est accepté, transmis par email avec la mention "hors zone principale" dans l'email Nicolas, et compté séparément.

### Filtres portfolio — catégories V1

| Valeur technique | Label | Pages concernées |
|-----------------|-------|-----------------|
| `piscine` | Piscines | F-05 |
| `spa_sauna` | Spas & Saunas | F-05 |
| `jardin_parc` | Jardins & Parcs | F-05 |
| `projet_complet` | Projets complets eau + jardin | F-05, F-07 |

### Comportement i18n V1

- Locale active : `fr` (routing par défaut ou `/fr/...`)
- Locale EN : structure créée, contenu vide, **pages non rendues, non indexées, non accessibles**
- **Pas de sélecteur de langue visible** — l'ajouter sans contenu EN serait trompeur
- Réévaluation V2 quand le copy FR est stabilisé (cf. roadmap.md V2-01)

### Gestion des images

- Toutes via `next/image`
- Hero images : `priority={true}` (pas de lazy loading — LCP)
- Portfolio images : `loading="lazy"`, `sizes` adaptatifs selon la grille
- Fallback image manquante : fond gris CSS (`background: var(--color-neutral-200)`), alt text visible, jamais d'icône "image cassée" du navigateur
- AVIF prioritaire, WebP fallback, JPEG source
- Gate G-PHOTO : 8 réalisations avec photos réelles avant déploiement — AUCUNE photo placeholder en production

### Formulations légales — règles de code

| Formulation | Statut | Usage |
|-------------|--------|-------|
| "en partenariat avec Les Terres Essentielles" | OBLIGATOIRE | F-02, F-03, F-06, F-07, footer |
| "notre maison Aqua System" | PRESCRIT | F-02 (vocabulaire brand) |
| "plus de 30 ans d'expertise" | OBLIGATOIRE | F-06, accueil |
| "filiale", "notre filiale" | INTERDIT | — |
| "nos deux sociétés" | INTERDIT | — |
| "société créée il y a 30 ans" | INTERDIT | — |
| "Envoyer", "Demander un devis" | INTERDIT (bouton CTA) | — |
| "Parlez-nous de votre projet" | OBLIGATOIRE (CTA principal) | Tous CTA formulaire |

---

## Cas limites transversaux

### Navigation arrière post-succès formulaire

- Depuis `/contact/merci`, le bouton "Retour" du navigateur ramène sur `/contact` (formulaire vide).
- Acceptable en export statique — pas de guard côté serveur possible.
- La page `/contact/merci` est accessible directement (pas de 404) — indiquer un message générique si accédée sans soumission préalable : [HYPOTHÈSE : même message de confirmation, sans personnalisation — acceptable car on ne sait pas si l'utilisateur vient de soumettre ou d'accéder directement]

### JS désactivé — synthèse

| Feature | Comportement sans JS |
|---------|---------------------|
| Pages statiques (F-01 à F-07, F-09) | HTML pur, tout visible, liens natifs |
| Formulaire F-08 | `<form method="POST">` natif → Pages Function → redirect 303 |
| Filtres portfolio F-05 | Tous les éléments affichés, filtres absents ou non fonctionnels |
| Menu mobile F-10 | Menu non fonctionnel (hamburger ne s'ouvre pas) — prévoir fallback CSS-only si critique [HYPOTHÈSE : non prioritaire pour la cible desktop-first] |
| Analytics | `trackEvent` no-op silencieux — aucun impact UX |

### 404 et pages manquantes

- Page 404 : `src/app/not-found.tsx` — message sobre + lien accueil.
- Aucun CTA de conversion sur le 404 (éviter la confusion).
- Pas de page 404 personnalisée par section.

### Images manquantes en production

- Gate G-PHOTO (cf. v1-scope.md) : bloque le déploiement sans 8 réalisations réelles.
- En développement : placeholder admis avec label `[IMAGE MANQUANTE — source: book Calameo]`.
- En production : **zéro placeholder visible** — la feature ne se déploie pas sans ses assets.

---

## Agents spécialisés recommandés

**Conclusion : AUCUN agent spécialisé supplémentaire n'est recommandé pour ce site vitrine V1.**

Justification :
- Les 9 events analytics sont couverts par `@data-analyst` (tracking-plan.md déjà livré).
- La Pages Function est couverte par `@fullstack` (specs complètes dans ce document).
- La conformité RGPD est couverte par `@legal` (rgpd-checklist.md + privacy-policy.md déjà livrés).
- Les tests QA sont couverts par `@qa` (matrice de traçabilité ci-dessous).
- La complexité du site (1 seule route dynamique, contenu statique, pas d'auth) ne justifie pas d'agents de verticale spécifiques.
- Si en V2 un blog, un CMS ou un espace prescripteur avancé est ajouté : reconsidérer un agent `@cms-specialist` ou un agent `@b2b-personas-tester`.

---

## Matrice de traçabilité US → Tests @qa

| US | Feature | Type | Stories critiques @qa | Events à vérifier |
|----|---------|------|----------------------|-------------------|
| US-01 | F-01 Accueil | Statique | Fallback image hero, LCP ≤ 2,5s, HTML sans JS | E-04, E-10 |
| US-02 | F-02 Piscines | Statique | Texte "en partenariat", cross-selling fonctionnel | E-09, E-04 |
| US-03 | F-03 Jardins | Statique | Formulation LTE obligatoire dans HTML | E-09, E-04 |
| US-04 | F-04 Approche | Statique | 5 étapes process visibles, mention ancrage local | E-04 |
| US-05 | F-05 Portfolio | Interactif (filtres) | Filtre 0 résultat, filtre rapide, URL ?filter=, HTML sans JS | E-05, E-06, E-04 |
| US-06 | F-06 À propos | Statique | Absence "société créée 30 ans", photo banque images absente | E-04 |
| US-07 | F-07 Prescripteurs | Statique | Cross-sell absent, pré-remplissage formulaire, certif "sur demande" | E-07, E-08 |
| US-08 | F-08 Contact | Interactif (formulaire) | 8 scénarios critiques listés dans Notes @qa — PRIORITÉ P0 | E-01, E-02, E-03, E-04 |
| US-09 | F-09 Légal | Statique | Présence de tous les champs légaux sur `/mentions-legales` + `/politique-confidentialite` (2 pages) | E-10 |
| US-10 | F-10 Composants | Transversal | Navigation mobile 3 breakpoints, copyright année auto, liens config | E-04 |
| US-11 | F-11 Infra | Technique | Build propre, Lighthouse, sitemap, robots, 404, vars env manquantes | — |

---

## Handoff

**Destinataires** : @fullstack (développement) + @qa (tests) + @ux (revue parcours)

**Fichiers produits** :
- `/home/user/Aquasystem/docs/product/functional-specs.md` (ce fichier)

**Décisions prises dans ces specs (v1.1 — post-arbitrages checkpoint)** :
1. Anti-spam : Honeypot + Rate Limiting Cloudflare (pas Turnstile) — décision avec justification dans F-08
2. Page de confirmation : URL distincte `/contact/merci` (pas d'inline) — tracking E-01 fiable + anti-resubmit (arbitrage P0-4)
3. Filtres portfolio : côté client (état React), HTML statique contient toutes les cartes (SEO + fallback JS)
4. Sélecteur de langue : absent en V1 (locale EN vide = sélecteur trompeur)
5. Délai réponse confirmation : `[À CONFIRMER fondateur]` — la valeur "2 jours ouvrés" de v1.0 était une hypothèse non validée (arbitrage P0-4)
6. Certifications prescripteurs V1 : "disponibles sur demande" si PDF non fournis par fondateur
7. Timeout formulaire : 10 secondes côté client (AbortController)
8. Qualification NSM : côté dashboard uniquement, jamais côté formulaire — critère `type_projet non null` retiré (arbitrage P0-2)
9. URLs pages : version longue retenue (arbitrage P0-1) — `/piscines-bien-etre`, `/jardins-paysage`, `/notre-approche`, `/la-maison`
10. Formulaire : chips optionnels + texte libre obligatoire — téléphone facultatif (arbitrage P0-2)
11. Budget : 4 tranches `50_80k` / `80_150k` / `150k_plus` / `prefere_discuter` (arbitrage P0-3)
12. Navigation : 6 liens, ordre Réalisations en premier (arbitrage P0-5)
13. Politique de confidentialité : page distincte `/politique-confidentialite` (arbitrage P1-2)
14. Wording erreurs inline : source de vérité = `docs/copy/ux-writing-guide.md` §2 (arbitrage P1-3)

**Points d'attention pour @fullstack** :
- `trailingSlash: true` dans `next.config.js` — obligatoire Cloudflare Pages
- Pages Function accepte JSON ET `application/x-www-form-urlencoded` (fallback JS)
- Champ honeypot caché CSS (pas `type="hidden"`)
- `useSearchParams` + `Suspense` requis pour lire `?filter=` et `?type=` (Next.js App Router)
- Variables d'environnement côté Cloudflare : `RESEND_API_KEY`, `CONTACT_EMAIL`, `RATE_LIMIT_KV_BINDING`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`

**Points d'attention pour @qa** :
- US-08 F-08 = priorité absolue — 12 critères d'acceptation, 8 scénarios critiques
- Tester le formulaire natif (JS désactivé) : email doit arriver chez Nicolas
- Tester le honeypot : 0 email reçu si champ `website` rempli
- Vérifier la formulation "en partenariat avec Les Terres Essentielles" dans le HTML des pages F-02, F-03, F-06, F-07 et footer
- Gate G-PHOTO : vérifier ≥ 8 réalisations avec photos réelles avant déploiement prod

**Hypothèses à confirmer avec Nicolas Berg** :
- [HYPOTHÈSE] Délai de réponse : "2 jours ouvrés" (message page confirmation)
- [HYPOTHÈSE] Rate limit : 5 requêtes/IP/heure (acceptable ?)
- [HYPOTHÈSE] Certifications téléchargeables ou "sur demande" (PDF disponibles ?)
- [HYPOTHÈSE] Photo de Nicolas Berg autorisée pour la page à propos ?
- [HYPOTHÈSE] Service email : Resend.com recommandé — à valider avec @infrastructure

---

*Fichier produit par @product-manager — 2026-06-11*
*Références amont : docs/product/v1-scope.md, docs/product/roadmap.md, docs/analytics/tracking-plan.md, docs/legal/rgpd-checklist.md, project-context.md*
