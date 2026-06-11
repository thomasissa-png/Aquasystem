# Tracking Plan — Site vitrine [NOM OMBRELLE]
## Aqua System × Les Terres Essentielles

> Contrat technique entre @data-analyst (définit) et @fullstack (implémente).
> Zéro PII dans les propriétés analytics — aucune donnée identifiante jamais transmise.
> Solution analytics retenue : voir section "Recommandation outil" ci-dessous.
> Dernière mise à jour : 2026-06-11 | Agent : @data-analyst

---

**v1.2 — 2026-06-11 — Harmonisation post-arbitrages P0**
Edits appliqués suite aux arbitrages actés dans `docs/product/arbitrations-p0-checkpoint.md` :
- E-01 `type_projet` : `Array<string> | null` (null si aucun chip sélectionné — chips optionnels P0-2)
- E-01 `budget_tranche` enum : `50_80k / 80_150k / 150k_plus / prefere_discuter` (P0-3)
- `page_source` enum mis à jour : `piscines-bien-etre`, `jardins-paysage`, `notre-approche`, `la-maison` (P0-1)
- E-02 trigger : `#form-prenom` → `#prenom_nom` (P2-2)
- NSM : `type_projet non null` retiré des critères stricts — lead qualifié = commune 78/92 + description ≥ 20 chars. `type_projet` = critère d'enrichissement uniquement.
- Double signal de conversion documenté : E-01 (event de référence) + pageview `/contact/merci` (signal de vérification P0-4)

**v1.1 — 2026-06-11 — Gaps UX intégrés**
4 points de décision signalés par @ux traités :
- Gap 1 (temps portfolio) : couvert par temps de session natif Umami — pas d'event supplémentaire.
- Gap 2 (chemin de conviction) : requête séquence pageviews documentée dans dashboard-specs.md — pas d'event.
- Gap 3 (cross-selling → projet_complet) : propriété `has_cross_selling` ajoutée sur `form_submission_success` (E-01).
- Gap 4 (prescripteur non converti) : couvert par filtre `prescripteur_page_viewed` existant — requête documentée dans dashboard-specs.md.

---

## Recommandation outil analytics — Décision à valider fondateur

### Contexte de la décision

Cloudflare Web Analytics (initialement prévu en v1-scope.md R-20) **ne supporte pas les events custom**. Il est limité aux pageviews. Or, 9 des 10 events du tracking plan nécessitent des propriétés custom. La solution doit être :
- Compatible events custom avec propriétés
- Exemptée de consentement CNIL (pas de bandeau cookie)
- Budget gratuit ou minimal

---

### Comparatif des options (sources WebSearch juin 2026)

#### Option A — Umami Cloud (recommandé)

**Statut CNIL** : Exempté. Umami ne stocke pas d'adresses IP (hash en mémoire détruit quotidiennement), pas de cookies, pas de tracking cross-domaines. Conforme aux critères CNIL délibération n°2020-091. [source : docs.umami.is/docs/faq]

**Events custom** : Oui, natifs (`umami.track('event_name', { prop: value })`).

**Tarif cloud** : 20 $/mois pour 1 million d'events. Pour un site vitrine < 1 000 visiteurs/mois avec 10 events par session : estimé < 10 000 events/mois → **self-hosted sur Cloudflare Workers = gratuit** (dans les limites Cloudflare free tier, compatible avec la stack existante). Umami self-hosted = open source MIT, gratuit en hébergement propre.

**Effort d'implémentation** : Faible. Script JS unique, 1 helper `trackEvent`, documentation officielle complète.

**Transfert hors UE** : Si cloud Umami, serveurs EU disponibles. Si self-hosted Cloudflare Workers, données restent dans l'infra Cloudflare déjà encadrée (DPF EU-US — déjà validé @legal).

**Recommandation** : Umami self-hosted sur un Cloudflare Worker ou un service Postgres hébergé EU (Railway, Neon free tier). Coût 0 €/mois. Complexité d'installation modérée (2-4h @fullstack). Alternative immédiate si self-host trop complexe : Umami Cloud à 20$/mois.

---

#### Option B — Plausible Analytics (fallback #1)

**Statut CNIL** : Exempté. Pas de cookies, pas d'IP stockée, données agrégées uniquement. Confirmé par CNIL et autorités européennes (DSK). [source : plausible.io/data-policy]

**Events custom** : Oui, via `plausible('goal_name', { props: { key: value } })`.

**Tarif** : 9 $/mois pour 10 000 pageviews + events combinés. Adapté au trafic estimé (< 1 000 visiteurs/mois en V1). Self-hosted possible (open source) mais plus complexe qu'Umami.

**Inconvénient** : Payant dès le 1er event. Budget minimum 9 $/mois.

**Quand choisir** : Si le fondateur préfère une solution clé-en-main avec interface soignée et pas de maintenance infrastructure. Recommander si le self-hosting Umami est jugé trop complexe.

---

#### Option C — PostHog (fallback #2)

**Statut CNIL** : PostHog utilise des cookies de session par défaut. **Attention** : en configuration standard, PostHog dépose des cookies persistants — NON exempté CNIL dans cette configuration. Il est possible de configurer PostHog en mode "cookieless" (option `persistence: 'memory'`), mais cette configuration n'est pas le mode par défaut et **sa conformité CNIL n'est pas explicitement confirmée par la CNIL**. Risque légal non nul. [source : posthog.com/docs/privacy]

**Tier gratuit** : 1 million d'events/mois gratuits — très généreux pour ce projet.

**Inconvénient** : Risque CNIL si mal configuré. Sur-dimensionné pour un site vitrine (product analytics, session recordings, feature flags — complexité inutile). Serveurs US par défaut (EU disponible en payant).

**Recommandation** : Écarté en V1. Si le projet évolue vers un produit SaaS avec funnel complexe, reconsidérer en V2.

---

#### Option D — Hybride Cloudflare Web Analytics + Pages Function maison

**Principe** : Cloudflare Web Analytics pour les pageviews (gratuit, CNIL-exempté), et les events custom sont loggés directement dans la Pages Function existante (formulaire) via un endpoint `/api/track` qui écrit dans Cloudflare D1 ou KV.

**Coût** : 0 € (Cloudflare free tier).

**Inconvénient** : Développement custom significatif (@fullstack estime 4-8h supplémentaires), pas de dashboard analytics natif (il faut construire des requêtes SQL manuelles sur D1), maintenance long terme. Effort non justifié vs Umami self-hosted.

**Recommandation** : Écarté. L'option hybride ajoute de la complexité sans valeur ajoutée vs Umami self-hosted.

---

### Décision recommandée

**RETENU : Umami self-hosted sur infrastructure Cloudflare (Workers + D1 ou Neon Postgres free tier)**

Justification :
1. Coût : 0 €/mois (dans les limites Cloudflare free tier, amplement suffisant pour < 50 000 events/mois)
2. Conformité CNIL : exemption sans ambiguïté (pas de cookies, pas d'IP, hash mémoire)
3. Events custom natifs avec propriétés typées
4. Stack cohérente avec l'infrastructure existante (Cloudflare)
5. Open source MIT — pas de dépendance fournisseur

**Fallback validé** : Plausible Cloud à 9 $/mois si le self-hosting Umami est jugé trop complexe au moment de l'implémentation.

**Point fondateur à valider** : accepter le coût 0 € avec maintenance minimale (Umami self-hosted) ou préférer payer 9 $/mois pour zéro maintenance (Plausible Cloud).

---

## Naming Convention

**Format** : `[objet]_[action]` en snake_case, verbe au passé

**Règles** :
- Objet = entité sur laquelle l'action se passe (form, cta, portfolio, page, etc.)
- Action = verbe passé décrivant ce qui s'est passé (viewed, clicked, started, submitted, etc.)
- Propriétés : snake_case, valeurs en minuscules sauf codes (ex: type_projet)
- Aucune PII : pas de nom, email, téléphone, IP dans aucune propriété
- Commune : OK en agrégé (ville), jamais d'adresse complète

**Exemples valides** : `form_submission_success`, `cta_clicked`, `page_viewed`
**Exemples invalides** : `formSubmitted`, `CTAClick`, `submit_form`

---

## Events P0 — Critiques au lancement (bloquer si absent)

Ces events mesurent directement la NSM ou un signal de conversion critique.

---

### E-01 — `form_submission_success`

**Description** : Formulaire de contact soumis avec succès (réponse 200 de la Pages Function).

**Trigger** : Réponse HTTP 200 reçue depuis `/api/contact` (Pages Function). Déclenché côté client après confirmation serveur.

**Type** : Système (déclenché automatiquement, pas par clic utilisateur)

**Pages** : `/contact` (F-08)

**Priorité** : P0 — C'est l'event NSM. Sans lui, impossible de compter les leads.

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `type_projet` | `Array<string> \| null` | `piscine_bien_etre`, `jardin_paysage`, `projet_complet`, `prescripteur` — `null` si aucun chip sélectionné | Non | OK — catégorie de projet, pas PII. Critère d'enrichissement (pas de qualification). |
| `commune` | string | Texte libre normalisé (ex: `le_vesinet`, `versailles`) | Oui | OK — commune en clair, jamais adresse complète |
| `budget_renseigne` | boolean | `true`, `false` | Oui | OK — présence/absence, pas la valeur |
| `budget_tranche` | string | `50_80k`, `80_150k`, `150k_plus`, `prefere_discuter`, `non_renseigne` | Non | OK — fourchette anonyme |
| `has_description` | boolean | `true`, `false` (description ≥ 20 caractères) | Oui | OK — présence/absence, pas le contenu |
| `page_source` | string | `contact`, `accueil`, `piscines-bien-etre`, `jardins-paysage`, `notre-approche`, `realisations`, `prescripteurs`, `la-maison` | Oui | OK |
| `has_cross_selling` | boolean | `true` si un clic `cross_selling_clicked` a eu lieu dans la même session (sessionStorage), `false` sinon | Oui | OK — flag de comportement de session, zéro PII |

**Note RGPD** : NE PAS inclure nom, email, téléphone, contenu de la description dans l'event.

**Note Gap 3 (cross-selling → projet_complet)** : La propriété `has_cross_selling` permet de corréler les soumissions avec `type_projet = "projet_complet"` qui proviennent d'une session où l'utilisateur a cliqué sur le composant cross-selling. Alimente la décision HYP-02. Implémentation : lors du déclenchement de `cross_selling_clicked`, @fullstack pose `sessionStorage.setItem('has_cross_selling', 'true')` ; la valeur est lue à la soumission du formulaire.

---

### E-02 — `form_start`

**Description** : Utilisateur commence à remplir le formulaire (premier champ focusé).

**Trigger** : Focus sur le premier champ du formulaire (`#form-prenom` ou premier input).

**Type** : User

**Pages** : `/contact`

**Priorité** : P0 — Nécessaire pour calculer le taux de complétion (funnel formulaire).

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `page_source` | string | Valeurs de E-01 | Oui | OK |
| `device_type` | string | `desktop`, `mobile`, `tablet` | Oui | OK — catégorie, pas modèle |

---

### E-03 — `form_abandonment`

**Description** : Utilisateur quitte la page `/contact` sans soumettre le formulaire, alors que ≥ 1 champ a été rempli.

**Trigger** : `beforeunload` ou navigation sortante détectée si `form_start` a été déclenché ET `form_submission_success` n'a pas encore été déclenché dans la même session.

**Type** : User/Système

**Pages** : `/contact`

**Priorité** : P0 — Identifie les frictions critiques du formulaire.

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `derniere_etape` | string | `prenom_nom`, `email`, `telephone`, `type_projet`, `commune`, `budget`, `description` | Oui | OK — nom de champ, pas valeur |
| `champs_remplis` | integer | 0-7 | Oui | OK — comptage |
| `device_type` | string | `desktop`, `mobile`, `tablet` | Non | OK |

**Note technique** : L'event `form_abandonment` n'est fiable qu'à environ 70% (limites de l'API `beforeunload`). Traiter comme signal directionnel, pas comme comptage absolu.

---

### E-04 — `cta_clicked`

**Description** : Clic sur un bouton CTA "Parlez-nous de votre projet" ou tout CTA de conversion majeur.

**Trigger** : `click` sur l'élément avec attribut `data-track="cta"`.

**Type** : User

**Pages** : Toutes (composant transversal)

**Priorité** : P0 — Mesure l'intention de prise de contact à travers tout le parcours.

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `page_source` | string | Valeurs de E-01 | Oui | OK |
| `position` | string | `hero`, `section_milieu`, `footer`, `navbar`, `prescripteur_cta` | Oui | OK |
| `label_cta` | string | Texte court du CTA (max 50 chars) | Non | OK |

---

## Events P1 — Importants (à implémenter avant M+1 post-launch)

---

### E-05 — `portfolio_filter_clicked`

**Description** : Utilisateur clique sur un filtre de la page portfolio.

**Trigger** : `click` sur un bouton filtre (`[data-filter]`).

**Type** : User

**Pages** : `/realisations` (F-05)

**Priorité** : P1

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `filtre` | string | `tous`, `piscine`, `spa_sauna`, `jardin_parc`, `projet_complet` | Oui | OK |
| `device_type` | string | `desktop`, `mobile`, `tablet` | Non | OK |

---

### E-06 — `portfolio_realisation_viewed`

**Description** : Utilisateur ouvre ou consulte une réalisation dans le portfolio (survol long ou ouverture modale/page détail si applicable en V1).

**Trigger** : `click` sur une carte de réalisation ou `IntersectionObserver` (visibilité ≥ 50% pendant ≥ 1,5 secondes). Préférer le `click` en V1 (moins complexe).

**Type** : User

**Pages** : `/realisations`

**Priorité** : P1

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `type_projet` | string | `piscine`, `spa_sauna`, `jardin_parc`, `projet_complet` | Oui | OK |
| `zone_geo` | string | Code département (ex: `78`, `92`) | Oui | OK — département, pas commune précise |

---

### E-07 — `prescripteur_page_viewed`

**Description** : Utilisateur charge la page espace prescripteurs.

**Trigger** : Pageview sur `/prescripteurs` (peut être géré via pageviews analytics standard si l'outil le supporte — mais l'event dédié permet de capturer le referrer).

**Type** : Système

**Pages** : `/prescripteurs` (F-07)

**Priorité** : P1

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `referrer_type` | string | `direct`, `google`, `social`, `internal`, `other` | Oui | OK — catégorie, pas URL complète |
| `device_type` | string | `desktop`, `mobile`, `tablet` | Non | OK |

---

### E-08 — `prescripteur_cta_clicked`

**Description** : Clic sur le CTA dédié de la page prescripteurs ("Présentons-nous").

**Trigger** : `click` sur le CTA principal de la page prescripteurs.

**Type** : User

**Pages** : `/prescripteurs`

**Priorité** : P1

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `position` | string | `above_fold`, `milieu_page`, `footer_page` | Oui | OK |

---

### E-09 — `cross_selling_clicked`

**Description** : Utilisateur clique sur le composant cross-selling (d'une maison vers l'autre).

**Trigger** : `click` sur l'élément avec `data-track="cross-selling"`.

**Type** : User

**Pages** : `/piscines` (F-02), `/jardins` (F-03), `/realisations` (F-05)

**Priorité** : P1 — Mesure directement HYP-02 (réunion des 2 maisons).

**Propriétés** :

| Propriété | Type | Valeurs possibles | Obligatoire | Note RGPD |
|-----------|------|-------------------|-------------|-----------|
| `source_univers` | string | `piscines`, `jardins`, `realisations` | Oui | OK |
| `destination_univers` | string | `piscines`, `jardins`, `contact` | Oui | OK |

---

## Events P2 — Surveillance (post-launch, selon besoins)

---

### E-10 — `page_viewed`

**Description** : Pageview de toute page du site.

**Trigger** : Chargement de page (automatiquement géré par Umami/Plausible via leur script — **ne pas implémenter manuellement**).

**Type** : Système (automatique via script analytics)

**Pages** : Toutes

**Priorité** : P2 — Couvert automatiquement par le script analytics. Inclus ici pour documentation.

**Propriétés capturées automatiquement** :

| Propriété | Type | Note RGPD |
|-----------|------|-----------|
| `page_path` | string | OK — URL sans paramètres personnels |
| `referrer_domain` | string | OK — domaine uniquement |
| `device_type` | string | OK — catégorie |
| `pays` | string | OK — pays uniquement, jamais région/ville |

**Note RGPD** : Umami/Plausible ne collectent jamais l'adresse IP en clair. Le pays est dérivé de l'IP de manière agrégée sans stockage de l'IP elle-même.

---

## Section Implémentation — Contrat technique pour @fullstack

### Architecture du helper `trackEvent`

Implémenter UN seul helper dans `/src/lib/analytics.ts` :

```typescript
// /src/lib/analytics.ts
// Helper trackEvent — fail-silent, zéro impact performance

type EventName =
  | 'form_submission_success'
  | 'form_start'
  | 'form_abandonment'
  | 'cta_clicked'
  | 'portfolio_filter_clicked'
  | 'portfolio_realisation_viewed'
  | 'prescripteur_page_viewed'
  | 'prescripteur_cta_clicked'
  | 'cross_selling_clicked';

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(name: EventName, properties?: EventProperties): void {
  try {
    // Umami : window.umami est injecté par le script Umami
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track(name, properties ?? {});
    }
    // Fallback Plausible si Umami non disponible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(name, { props: properties ?? {} });
    }
  } catch {
    // fail-silent : ne jamais laisser un bug analytics casser l'UX
  }
}
```

**Règles d'implémentation** :
- Le helper est appelé en fire-and-forget : jamais `await`, jamais dans un try/catch bloquant
- Le script Umami/Plausible est chargé en `strategy="afterInteractive"` (Next.js Script) — jamais en `beforeInteractive` pour ne pas impacter le LCP
- Zéro propriété PII dans les appels (vérification de code review obligatoire)
- En cas d'échec du script analytics, la page fonctionne normalement

---

### Placement des events dans l'arborescence V1

**Note sessionStorage (Gap 3)** : `sessionStorage` est natif au navigateur, sans cookie, sans PII — conforme CNIL. La valeur est détruite automatiquement à la fermeture de l'onglet. Aucune initialisation requise : l'absence de clé est traitée comme `false` à la lecture.

| Event | Fichier de composant | Déclencheur |
|-------|---------------------|-------------|
| `form_start` | `src/components/ContactForm.tsx` | `onFocus` premier champ |
| `form_submission_success` | `src/components/ContactForm.tsx` | `onSuccess` callback après API 200 — lire `sessionStorage.getItem('has_cross_selling') === 'true'` pour la propriété `has_cross_selling` |
| `form_abandonment` | `src/components/ContactForm.tsx` | `useEffect` + `beforeunload` listener |
| `cta_clicked` | `src/components/CTA.tsx` (composant global) | `onClick` — via prop `data-position` |
| `portfolio_filter_clicked` | `src/components/PortfolioFilters.tsx` | `onClick` bouton filtre |
| `portfolio_realisation_viewed` | `src/components/RealisationCard.tsx` | `onClick` carte |
| `prescripteur_page_viewed` | `src/app/prescripteurs/page.tsx` | `useEffect` au montage |
| `prescripteur_cta_clicked` | `src/app/prescripteurs/page.tsx` | `onClick` CTA dédié |
| `cross_selling_clicked` | `src/components/CrossSellingBlock.tsx` | `onClick` bloc cross-sell — ET `sessionStorage.setItem('has_cross_selling', 'true')` au même moment |

---

### Checklist RGPD par event

| Event | Risque PII | Vérification obligatoire |
|-------|-----------|--------------------------|
| `form_submission_success` | ÉLEVÉ — formulaire contient nom/email/tel | Vérifier que AUCUNE propriété n'inclut les valeurs des champs texte libres |
| `form_start` | FAIBLE | OK — uniquement page_source et device_type |
| `form_abandonment` | MOYEN | Vérifier que `derniere_etape` = nom du champ (ex: "email"), jamais la valeur saisie |
| `cta_clicked` | FAIBLE | OK |
| `portfolio_*` | FAIBLE | OK — type et zone géo uniquement |
| `prescripteur_*` | FAIBLE | OK |
| `cross_selling_clicked` | FAIBLE | OK — `has_cross_selling` ne contient pas de valeur saisie |
| `page_viewed` | GÉRÉ PAR L'OUTIL | Umami/Plausible s'en charge — ne pas re-implémenter |

---

*Fichier produit par @data-analyst — 2026-06-11*
