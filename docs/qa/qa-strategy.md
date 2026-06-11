# Stratégie de test — Aquasystem (site umbrella)

> Source de dérivation : `docs/product/functional-specs.md` v1.2 (critères Given/When/Then F-01→F-11).
> Wording attendu : `docs/copy/ux-writing-guide.md` v1.2. Events : `docs/analytics/tracking-plan.md` v1.2.
> Findings intégrés : `docs/ux/ux-review.md`. Code audité : `src/`, `functions/api/contact.ts`.
> Dernière mise à jour : 2026-06-11 — @qa.

---

## 1. Contexte et principe directeur

Site **vitrine statique** Next.js (`output: 'export'`, 28 routes) hébergé sur Cloudflare Pages.
**Un seul point dynamique** : la Pages Function `POST /api/contact` (envoi email Resend + rate limit KV).
Pas de BDD, pas d'auth, pas de paiement. Le risque métier se concentre sur **un objet unique** :
le **formulaire de contact** = seul point de conversion = NSM directe (10 leads/mois). Tout écart = lead perdu.

Principe QA : un test qui ne peut pas échouer est inutile. On teste les **données toxiques** et les
**chemins d'erreur** (validation, honeypot, 429, 500, KV absent, timeout), pas seulement le happy path.

### Risk-based — classement des features

| Risque | Features | Niveaux de test |
|---|---|---|
| **Critique** | F-08 formulaire + Function `/api/contact` (conversion NSM, anti-spam, données perso) | unit + intégration handler + E2E + données adversariales |
| **Haut** | F-01 accueil, F-05 portfolio (filtres), F-07 prescripteurs (parcours Camille), F-10 nav (smart defaults, cross-selling) | unit + E2E |
| **Standard** | F-02/F-03/F-04/F-06 pages contenu, F-09 légales | E2E léger + baseline visuelle |
| **Low** | métadonnées SEO, favicon | manuel pré-launch + baseline visuelle |

---

## 2. Testing Trophy adapté au statique

```
        exploratoire / manuel pré-launch (~10%)
       ┌───────────────────────────────────────┐
       │   E2E Playwright (~20%)                │  parcours critiques sur npm run dev (127.0.0.1)
       │   ─────────────────────────────────    │  réseau 100% intercepté (route.fulfill)
       │   intégration handler Function (~40%)  │  onRequestPost(Request mockée) → 200/400/429/500
       │   ─────────────────────────────────    │
       │   unit Vitest (~30%)                   │  validation client+serveur, enums, manifeste
       └───────────────────────────────────────┘
         static analysis (tsc strict + ESLint) ── déjà en CI (job quality), bloquant
```

### 2.1 Static analysis (socle, déjà actif)
`npm run typecheck` (tsc --noEmit, strict) + `npm run lint` (ESLint next) → job `quality` de `ci.yml`. Bloquant.

### 2.2 Unit (~30%) — `tests/unit/` (environnement node)
Fonctions pures, déterministes, sans réseau :
- **Validation client** `src/lib/contact-validation.ts` : chaque règle (`validateField` par champ, `validateAll`),
  `normalizePhone`, regex email/téléphone, bornes description (19/20/2000/2001), wording exact `ERROR_MESSAGES`.
- **Validation serveur** (logique de `functions/api/contact.ts`, voir §2.3) : enums type_projet/budget, parsing dual.
- **Manifeste réalisations** `src/content/realisations.ts` : slugs uniques, `FEATURED_SLUGS` résolvables,
  cohérence `type`/`filters`, `isDraft`/`getRealisation`/`getFeatured`, **intégrité fichiers photos sur disque**
  (chaque `base` × 3 tailles existe dans `public/images/realisations/`), alts uniques (zéro doublon — règle anti-placeholder).
- **Constantes** `src/lib/constants.ts` : `SOURCE_TO_CHIP` couvre les 4 sources, valeurs de chip ⊆ enum serveur,
  `BUDGET_OPTIONS` = enum serveur, navigation 6 liens ordre exact (arbitrage P0-5).
- **Analytics** `src/lib/analytics.ts` : `trackEvent` no-op si window absent, route umami puis plausible, fail-silent.

### 2.3 Intégration (~40%) — `tests/unit/contact-function.test.ts` (environnement node)
La Pages Function est testée **unitairement sur ses handlers exportés** (`onRequestPost`, `onRequestOptions`)
avec des `Request` mockées et un `env` mocké (KV in-memory, `fetch` Resend stubbé). C'est le meilleur ratio
confiance/coût : on couvre toute la logique serveur (validation, anti-spam, parsing, email) sans déployer Cloudflare.

Cas couverts (= critères US-08) :
- 200 happy path JSON ; 200 form-urlencoded → **redirect 303** `/contact/merci/`.
- 400 validation JSON (`fields` par champ) ; 400 `invalid_body` (content-type non supporté).
- **Honeypot** `website` rempli → 200 silencieux, `fetch` Resend **non appelé**.
- **429** rate limit (KV : 6e requête même IP) ; message exact.
- **500** secrets absents ; **500** Resend `resp.ok === false`.
- **KV absent → fail-open** (pas de 429, honeypot reste 1re ligne).
- Enums exacts v1.2 (type_projet, budget), parsing **JSON vs form-urlencoded** (chips multiples en tableau).
- Email : sujet `[SITE_NAME] — Nouveau contact : … — commune`, `Qualifié NSM : OUI` si commune contient 78/92.
- `onRequestOptions` → 204 + CORS.

> Note : `KVNamespace`/`fetch` mockés en mémoire → tests déterministes, zéro réseau réel.

### 2.4 E2E (~20%) — `tests/e2e/` (Playwright, chromium)
Lancés contre `npm run dev` sur **127.0.0.1:3100** (jamais d'URL publique — `webServer` dans la config).
**Tout le réseau /api/contact et les events Umami sont interceptés** (`page.route` + `window.umami` stub) → déterministe.

Parcours :
- **Alexandre** : accueil → univers piscines → cross-sell jardins → réalisations → fiche → contact (`?source=`).
- **Camille** : `/prescripteurs` → CTA "Présentons-nous" → `/contact?source=prescripteurs` chip pré-sélectionné.
- **Formulaire happy path** (mock POST → 200) jusqu'à `/contact/merci/` + **interception E-01** (payload :
  `type_projet:'null'` si aucun chip, `budget_tranche`, `has_cross_selling`).
- **Erreurs** : description < 20, email invalide (messages exacts ux-writing), **500 mocké** → saisie préservée + message.
- **Portfolio** : filtre actif (`aria-pressed`), empty state (combinaison vide), URL `?filter=`.
- **A11y** : axe-core dans chaque parcours (échec si violation A/AA), navigation clavier (focus visible, drawer Escape).
- **404** habillée.
- **3 viewports** (iPhone 13 / iPad / Desktop Chrome) sur le parcours principal.

### 2.5 Exploratoire / manuel pré-launch (~10%)
Voir §5. Tout ce qui exige un service réel (Resend, KV Cloudflare en preview) ou un device physique.

---

## 3. Locators & déterminisme (règles)

- Priorité locators : `getByRole()` > `getByLabel()` > `getByText()` > `data-testid` > CSS. Sélecteurs fragiles interdits.
- **Mocks** : `page.route('**/api/contact', route => route.fulfill(...))`. Jamais de `route.continue()` sans handler.
- Events Umami : `window.umami` stubbé en `addInitScript` → on capture les appels dans un tableau lu via `page.evaluate`.
- Aucune dépendance au temps réel, à un fuseau machine, ou à un ordre d'exécution.

---

## 4. MATRICE DE TRAÇABILITÉ — placeholder (complétée en §6)

(Voir §6 : chaque user story F-01→F-11 × critères GWT → test ou justification.)

---

## 5. Tests manuels pré-launch (justifiés)

Liste courte — tout ce qui ne peut PAS être déterministe/automatisé en CI :

| # | Test | Pourquoi manuel | Critère couvert |
|---|---|---|---|
| M-1 | Envoi email Resend réel reçu par Nicolas (sujet, corps, reply-to) | Service externe réel — clé API prod, boîte mail réelle | US-08 #2, #12 (format email) |
| M-2 | Rate limit KV réel en preview Cloudflare (6e requête → 429) | Binding KV Cloudflare réel indisponible en local/CI | US-08 #11 |
| M-3 | Lighthouse CI mobile/desktop (LCP, INP, CLS) | Mesure perf réelle sur build déployé (job lighthouse commenté) | US-01 #1, US-11 #2 |
| M-4 | Régression visuelle pixel-diff vs 35 baselines | À activer post-launch (baselines @fullstack, environnement de rendu stable requis) | US-01→US-10 rendu |
| M-5 | Fallback sans JS réel (form natif → 303) en navigateur JS désactivé | Playwright force JS ; vérif finale manuelle recommandée | US-08 #9 |
| M-6 | Favicon checklist §4 (fichiers + balises) | Vérif assets + rendu onglet/partage réels | favicon-checklist.md §4 |
| M-7 | Droit à l'image photos réalisations + photos jardins (P0-1 ux-review) | Décision fondateur hors QA | gate G-PHOTO |

---

## 6. MATRICE DE TRAÇABILITÉ COMPLÈTE

Légende statut : **AUTO** test automatisé (fichier:test) · **VIS** couvert par baseline visuelle
(`tests/screenshots/`, pixel-diff post-launch) · **MANUEL** pré-launch (§5) · **FIXME** test écrit
mais bloqué par un bug (voir handoff). Chaque critère GWT de chaque US est tracé.

### F-01 — Accueil (US-01)
| Critère | Couverture |
|---|---|
| 1 tagline + CTA visibles, LCP ≤ 2,5s | AUTO `parcours.spec.ts › Parcours Alexandre` (tagline+CTA) ; LCP → **MANUEL** M-3 |
| 2 4 proof points visibles | VIS `home-desktop.png` + AUTO indirect (footer/proof rendus) |
| 3 « Voir toutes les réalisations » → /realisations | AUTO `parcours.spec.ts` (navigation réalisations) |
| 4 FOUC / texte avant image | **MANUEL** M-5 (3G réel) ; structure VIS |
| 5 hero CDN KO → fond brand | **MANUEL** (simulation CDN) ; non déterministe |
| 6 mobile 375px, CTA ≥ 44px, pas d'overflow | AUTO `portfolio-nav.spec.ts › drawer mobile` + touch targets ; VIS `home-mobile.png` |
| 7 sans JS → HTML complet, CTA `<a>` natifs | AUTO `parcours.spec.ts › SEO statique` (HTML brut) ; **MANUEL** M-5 |
| 8 title/description/h1/LocalBusiness en HTML | AUTO `parcours.spec.ts › SEO statique` |
| 9 exactement 3 cartes extrait portfolio | AUTO `realisations.test.ts › FEATURED_SLUGS` (=3) |

### F-02 — Univers piscines (US-02)
| Critère | Couverture |
|---|---|
| 1 « Aqua System » + « sur mesure » 1er écran | AUTO `parcours.spec.ts` (texte Aqua System) |
| 2 cross-sell « en partenariat avec LTE » → /jardins-paysage | AUTO `parcours.spec.ts` (LTE visible) ; lien VIS |
| 3 CTA → /contact | AUTO `contact-form.spec.ts` (source=piscines-bien-etre) |
| 4 image KO → placeholder | VIS `PhotoPlaceholder` ; non déterministe |
| 5 sans JS cross-sell `<a>` | **MANUEL** M-5 |
| 6 commune 78/92 dans le corps | VIS + **MANUEL** (revue contenu) |
| 7 mobile cross-sell visible, CTA ≥ 44px | VIS `piscines-mobile.png` + AUTO touch targets |
| 8 SEO title/desc/h1 piscine+zone | AUTO (pattern SEO statique réutilisable) ; **MANUEL** revue |
| 9 pas de stock photo / gate G-PHOTO | **MANUEL** M-7 (décision fondateur) |

### F-03 — Univers jardins (US-03)
| Critère | Couverture |
|---|---|
| 1 « en partenariat avec LTE » dans le corps | AUTO `parcours.spec.ts` (LTE visible sur /jardins-paysage) |
| 2 cross-sell → /piscines-bien-etre, retour arrière OK | AUTO navigation ; VIS |
| 3 CTA → /contact | AUTO `contact-form.spec.ts` (source=jardins-paysage via smart default) |
| 4 image KO → placeholder | VIS |
| 5 sans JS | **MANUEL** M-5 |
| 6 SEO paysage+zone | **MANUEL** revue |
| 7 pas d'affirmation de propriété LTE | **MANUEL** M-7 / gate G-LEGAL (Grep « filiale/propriété » §contenu) |
| 8 « en partenariat avec » seule formulation | **MANUEL** gate G-LEGAL |
| 9 adresse LTE visible | VIS footer |

### F-04 — Notre approche (US-04)
| Critère | Couverture |
|---|---|
| 1 5 étapes identifiables | VIS `notre-approche-desktop.png` + **MANUEL** revue |
| 2 mention contrainte locale (78/92/PLU) | **MANUEL** revue contenu |
| 3 CTA → /contact | VIS + structure |
| 4 sans JS | **MANUEL** M-5 |
| 5 image KO → placeholder | VIS |
| 6 référence prescripteurs/cahier des charges | **MANUEL** revue |
| 7 mobile lisible | VIS `notre-approche-mobile.png` |
| 8 SEO title méthode | **MANUEL** revue |
| 9 pas de Lorem Ipsum | AUTO **à compléter** : Grep `Lorem ipsum|TODO|FIXME` dans JSX (voir §7) |

### F-05 — Portfolio filtrable (US-05)
| Critère | Couverture |
|---|---|
| 1 ≥ 8 cartes, photo+type+zone, pas d'overflow | AUTO `portfolio-nav.spec.ts` + `parcours.spec.ts` (count ≥ 8) ; `realisations.test.ts` (≥ 8) |
| 2 filtre Piscine → état actif | AUTO `portfolio-nav.spec.ts › filtre Piscine` (aria-pressed) |
| 3 filtre Projets complets | AUTO `portfolio-nav.spec.ts › présélection projet_complet` |
| 4 empty state wording + CTA retour | AUTO logique `realisations.test.ts` (path vide) + invariant zéro-impasse `portfolio-nav.spec.ts` ; wording exact = code (statique) |
| 5 image KO → placeholder | VIS |
| 6 clics rapides → dernier filtre | AUTO `portfolio-nav.spec.ts › clics rapides` |
| 7 sans JS → état Tous | **MANUEL** M-5 |
| 8 `?filter=projet_complet` pré-activé | AUTO `portfolio-nav.spec.ts › présélection` |
| 9 titres réalisations en HTML statique | AUTO (cards en HTML) ; `realisations.test.ts` |

### F-06 — La maison (US-06)
| Critère | Couverture |
|---|---|
| 1 Nicolas Berg, gérant, « 30 ans d'expertise » | VIS `la-maison-desktop.png` + **MANUEL** revue |
| 2 ≥ 3 des 4 proof points | VIS + **MANUEL** |
| 3 CTA → /contact | VIS |
| 4 sans JS | **MANUEL** M-5 |
| 5 pas de photo personne non autorisée | **MANUEL** M-7 |
| 6 jamais « société créée il y a 30 ans » | AUTO **à compléter** Grep §7 + **MANUEL** |
| 7 « en partenariat avec » jamais « filiale » | **MANUEL** gate G-LEGAL + Grep §7 |
| 8 données structurées Person (optionnel) | **MANUEL** |
| 9 « équipe de 8 » présent | **MANUEL** revue |

### F-07 — Prescripteurs (US-07)
| Critère | Couverture |
|---|---|
| 1 accroche 1er écran | VIS `prescripteurs-desktop.png` + **MANUEL** |
| 2 lien portfolio → /realisations filtre projets complets | AUTO (lien `?filter`/`?source`) + `portfolio-nav.spec.ts` |
| 3 CTA « Présentons-nous » → contact prescripteur pré-sélectionné | AUTO `parcours.spec.ts › Camille` + `contact-form.spec.ts › smart default` |
| 4 lisible sans contexte | VIS + **MANUEL** |
| 5 sans JS | **MANUEL** M-5 |
| 6 « certifications sur demande », pas de 404 PDF | **MANUEL** revue liens |
| 7 OG tags spécifiques prescripteurs | **MANUEL** (extraction OG) |
| 8 indexable (pas noindex) | **MANUEL** revue meta |
| 9 pas de cross-sell grand public | VIS + **MANUEL** revue |
| E-07 prescripteur_page_viewed | AUTO `parcours.spec.ts › Camille` (poll event) |

### F-08 — Formulaire contact (US-08) — CRITIQUE
| Critère | Couverture |
|---|---|
| 1 champs requis sans chip/tel → 200, type_projet absent, redirect merci titre exact | AUTO `contact-form.spec.ts › happy path` (E2E) + `contact-function.test.ts › happy path JSON` |
| 2 budget non renseigné → succès, email « Non renseigné » | AUTO `contact-function.test.ts › budget Non renseigné` |
| 3 depuis prescripteurs → chip pré-activé désélectionnable | AUTO `contact-form.spec.ts › smart default` + `constants.test.ts › SOURCE_TO_CHIP` |
| 4 email mal formaté → message exact + focus | AUTO `contact-form.spec.ts › email invalide` + `contact-validation.test.ts` + `contact-function.test.ts › 400` |
| 5 description 15 chars → message exact | AUTO `contact-form.spec.ts › description < 20` + `contact-validation.test.ts` (bornes 19/20) |
| 6 500 → saisie préservée + message + téléphone | AUTO `contact-form.spec.ts › erreur 500` + `contact-function.test.ts › 500`. Code conforme ux-writing §3 (source de vérité) ; functional-specs US-08 #6 a un wording obsolète → **INFO-1** (handoff) |
| 7 double-clic → 1 seule requête | AUTO (couvert par isSubmitting ; `contact-form.spec.ts` happy path bloque le 2e) ; logique `ContactForm` |
| 8 timeout 10s → état erreur | Logique AbortController (client) ; **MANUEL** (timing réel) |
| 9 sans JS → form-urlencoded → 303 merci | AUTO `contact-function.test.ts › form-urlencoded` ; **MANUEL** M-5 (navigateur sans JS) |
| 10 honeypot → 200 silencieux, aucun email | AUTO `contact-function.test.ts › honeypot` (Resend non appelé) |
| 11 6e requête/h → 429 message exact | AUTO `contact-function.test.ts › rate limit 429` ; **MANUEL** M-2 (KV réel) |
| 12 email sujet `[SITE]…commune` + NSM OUI 78/92 | AUTO `contact-function.test.ts › NSM` ; **MANUEL** M-1 (réception réelle) |
| 13 sans chip → « Non précisé — voir description » | AUTO `contact-function.test.ts › aucun chip` |
| E-01 payload (type_projet null, budget_tranche, has_cross_selling) | AUTO `contact-form.spec.ts › happy path` + `payload E-01` (interception Umami) |
| E-02 form_start | AUTO `contact-form.spec.ts › E-02` |

### F-09 — Pages légales (US-09)
| Critère | Couverture |
|---|---|
| 1 SIREN/capital/adresse/Nicolas/Cloudflare visibles | VIS `mentions-legales` + **MANUEL** gate G-LEGAL |
| 2 3 traitements + conservation + email droits | VIS `politique-confidentialite` + **MANUEL** |
| 3 email droits = lien mailto | **MANUEL** (revue lien) ; structure |
| 4 sans JS | **MANUEL** M-5 |
| 5 « en partenariat avec » jamais « filiale/propriété » | **MANUEL** gate G-LEGAL |
| 6 indexable | **MANUEL** |
| 7 lien RGPD formulaire → /politique-confidentialite | AUTO `constants.test.ts` (LEGAL_LINKS) + structure NoticeRGPD |
| 8 revue @legal 0 P0 | **MANUEL** gate G-LEGAL |
| 9 valeurs issues de config | AUTO `constants.test.ts` (CONTACT centralisé) |

### F-10 — Composants transversaux (US-10)
| Critère | Couverture |
|---|---|
| 1 header logo+liens+CTA fonctionnels | AUTO `portfolio-nav.spec.ts › nav` ; `constants.test.ts › NAV_LINKS` |
| 2 drawer mobile : tous liens, ferme au clic | AUTO `portfolio-nav.spec.ts › drawer mobile` |
| 3 footer « Mentions légales » → page | AUTO `constants.test.ts › LEGAL_LINKS` ; VIS |
| 4 liens sociaux depuis config | AUTO `constants.test.ts` (SOCIAL_LINKS) |
| 5 sans JS nav `<nav>` natif | **MANUEL** M-5 |
| 6/7/8 lien actif via usePathname | AUTO `portfolio-nav.spec.ts › lien actif` (aria-current) |
| 8 OG uniques par page | **MANUEL** (extraction OG) |
| 9 copyright année courante | AUTO `portfolio-nav.spec.ts › footer copyright` |
| 404 habillée | AUTO `portfolio-nav.spec.ts › 404` |

### F-11 — Infrastructure (US-11)
| Critère | Couverture |
|---|---|
| 1 build 0 tsc/0 lint | AUTO job CI `quality` (tsc + lint + build) — **bloquant** |
| LCP/INP/CLS, budget JS, P95 API | **MANUEL** M-3 (Lighthouse CI commenté) |
| régression visuelle | **MANUEL** M-4 (job visual-regression commenté) |

### Findings UX intégrés (ux-review.md)
| Finding | Couverture |
|---|---|
| P1-3 layout fiche 60-40 desktop | VIS `realisation-fiche-desktop.png` (re-screenshot @fullstack) ; AUTO h1 fiche `parcours.spec.ts` |
| P2-1 lien retour 404 | AUTO `portfolio-nav.spec.ts › 404` (lien « Retour à l'accueil ») |
| P2-3 touch targets ≥ 44px | AUTO `portfolio-nav.spec.ts › touch targets` (filtres ≥ 44px à 375px) |

---

## 7. Compléments recommandés (post-handoff, non bloquants)

- **Grep contenu en CI** : ajouter une vérif `Lorem ipsum|TODO|FIXME|société créée il y a 30 ans|filiale|propriété`
  dans `src/**/*.tsx` (F-04 #9, F-06 #6/#7) — à brancher comme step du job `quality`.
- **Extraction OG/meta** (F-07 #7, F-10 #8) : spec Playwright lisant `<meta property="og:*">` par page.
- Ces deux items sont listés mais non implémentés ici pour rester dans le périmètre « tests des chemins
  critiques » ; aucun bug bloquant identifié à leur sujet à ce stade.
