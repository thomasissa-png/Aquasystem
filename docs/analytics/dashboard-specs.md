# Dashboard Specs — Site vitrine [NOM OMBRELLE]
## Aqua System × Les Terres Essentielles

> 3 dashboards, 3 audiences, 3 fréquences. Chaque métrique a un seuil d'alerte et une action.
> En V1 sans CRM : les dashboards sont des vues manuelles dans l'outil analytics + un récapitulatif email mensuel préparé par Nicolas Berg lui-même (protocole défini en fin de fichier).
> Dernière mise à jour : 2026-06-11 | Agent : @data-analyst

---

**v1.2 — 2026-06-11 — Harmonisation post-arbitrages P0**
- URLs `page_source` mises à jour dans R-02 : `/piscines` → `/piscines-bien-etre`, `/jardins` → `/jardins-paysage` (P0-1).
- Définition NSM cohérente avec kpi-framework v1.2 : `type_projet non null` retiré des critères stricts.

**v1.1 — 2026-06-11 — Gaps UX intégrés**
4 requêtes/analyses documentées suite aux gaps @ux :
- Gap 1 : requête "temps moyen sur /realisations" via Umami natif — voir section "Requêtes analytiques complémentaires".
- Gap 2 : requête "séquence de conviction accueil → univers → portfolio → contact" via funnel Umami — voir même section.
- Gap 3 : vue croisée `has_cross_selling × type_projet = projet_complet` dans Dashboard 2 — voir "Vue Cross-selling".
- Gap 4 : segment prescripteurs non convertis via filtre `prescripteur_page_viewed` sans `form_submission_success(type_projet=prescripteur)` — voir même section.

---

## Dashboard 1 — Vue Fondateur (mensuel)

**Audience** : Nicolas Berg — non technicien, lecture ≤ 5 minutes

**Fréquence** : Mensuelle (1er de chaque mois, données du mois précédent)

**Outil** : Umami (ou Plausible) — interface web accessible par Nicolas

**Format de livraison V1** : Nicolas ouvre l'interface Umami le 1er de chaque mois et note les 5 métriques ci-dessous dans un fichier texte ou Google Sheets. Durée estimée : 10 minutes. Aucune automatisation requise en V1.

---

### Bloc 1 — North Star Metric

```
┌─────────────────────────────────────────────────────┐
│  LEADS QUALIFIÉS CE MOIS                            │
│                                                     │
│  [ X leads ]   vs mois précédent : +/- Y            │
│                                                     │
│  Cible M+3 : 5 leads/mois                           │
│  Cible M+6 : 10 leads/mois                          │
│                                                     │
│  Source : emails reçus sur contact@aqua-system.fr   │
│  (vérification manuelle — l'outil analytics est     │
│  un signal, l'email fait foi)                       │
└─────────────────────────────────────────────────────┘
```

**Alerte** : < 5 à M+3 → déclencher budget Google Ads local (500 €/mois)
**Alerte** : 0 lead dans les 2 premières semaines post-launch → vérifier que le formulaire fonctionne (test end-to-end immédiat)

---

### Bloc 2 — Répartition des leads (à compléter manuellement par Nicolas)

```
┌─────────────────────────────────────────────────────┐
│  RÉPARTITION DES LEADS DU MOIS                      │
│                                                     │
│  Par type de projet :                               │
│  - Piscine seule         : X leads                  │
│  - Spa / Sauna           : X leads                  │
│  - Jardin & Parc         : X leads                  │
│  - Projet complet eau+jardin : X leads  ← à surveiller │
│  - Prescripteur/Architecte   : X leads  ← à surveiller │
│                                                     │
│  Par zone géographique :                            │
│  - 78 (Yvelines)  : X leads                        │
│  - 92 (Hauts-de-Seine) : X leads                   │
│  - Autres : X leads                                 │
│                                                     │
│  Leads hors zone (non qualifiés) : X                │
└─────────────────────────────────────────────────────┘
```

**Alerte** : 0 lead "Projet complet" 3 mois consécutifs → revoir copy d'intégration des deux maisons
**Alerte** : > 30% leads hors 78/92 → ciblage géographique SEO à renforcer

---

### Bloc 3 — Trafic global (depuis l'outil analytics)

```
┌─────────────────────────────────────────────────────┐
│  TRAFIC DU MOIS                                     │
│                                                     │
│  Visiteurs uniques  : X                             │
│  Sessions totales   : X                             │
│                                                     │
│  Sources de trafic :                                │
│  - Direct / marque   : X%                          │
│  - Google organique  : X%  ← cible ≥ 20% à M+3    │
│  - Réseaux sociaux   : X%                          │
│  - Autre             : X%                          │
│                                                     │
│  Page la plus visitée : [nom page]                  │
└─────────────────────────────────────────────────────┘
```

**Alerte** : Trafic organique < 10% à M+3 → audit SEO urgent avec @seo
**Alerte** : < 150 visiteurs/mois à M+3 → activation LinkedIn Nicolas Berg + bouche-à-oreille

---

### Bloc 4 — Signal de conversion (depuis analytics)

```
┌─────────────────────────────────────────────────────┐
│  CONVERSION CE MOIS                                 │
│                                                     │
│  Clics CTA "Parlez-nous de votre projet" : X        │
│  Formulaires démarrés (form_start)       : X        │
│  Formulaires soumis (form_submission)    : X        │
│                                                     │
│  Taux complétion formulaire : X%  (cible ≥ 60%)    │
└─────────────────────────────────────────────────────┘
```

**Alerte** : Taux complétion < 40% → ouvrir Dashboard 2 (Funnel & Friction) pour diagnostiquer

---

### Bloc 5 — Alertes actives ce mois

```
┌─────────────────────────────────────────────────────┐
│  ALERTES                                            │
│                                                     │
│  [ ] NSM < seuil du mois → action : [voir ci-dessus]│
│  [ ] Taux complétion < 40% → investiguer frictions  │
│  [ ] 0 lead prescripteur depuis 2 mois → activer   │
│      réseau Nicolas                                 │
│  [ ] Trafic organique < 10% → audit SEO             │
└─────────────────────────────────────────────────────┘
```

**Filtres disponibles** : par mois (comparaison M vs M-1), par type de projet, par zone géo

**Granularité** : mensuelle (hebdomadaire si NSM < seuil d'alerte)

---

## Dashboard 2 — Funnel & Friction (hebdomadaire ou à la demande)

**Audience** : @data-analyst / fondateur en cas d'alerte NSM

**Fréquence** : Hebdomadaire si en phase d'optimisation ; sinon à la demande en cas d'alerte

**Outil** : Umami (ou Plausible) — interface events + filtres

**Utilité principale** : Identifier POURQUOI les leads ne se convertissent pas

---

### Vue Funnel complet

```
ACQUISITION
  Sessions totales : X
      |
      ↓ [taux de rétention accueil]
CONSIDÉRATION
  Sessions avec ≥ 2 pages vues : X  (cible : ≥ 40% des sessions)
  dont sessions ayant vu les réalisations : X  (cible : ≥ 30% des sessions)
      |
      ↓ [taux intention]
INTENTION
  Clics CTA "Parlez-nous de votre projet" : X  (cible : ≥ 10% des sessions)
  Vues page /contact : X  (cible : ≥ 40% des clics CTA)
      |
      ↓ [taux démarrage formulaire]
FORMULAIRE DÉMARRÉ (form_start)
  X formulaires démarrés  (cible : ≥ 70% des vues /contact)
      |
      ↓ [taux complétion]
FORMULAIRE SOUMIS (form_submission_success)
  X formulaires soumis  (cible : ≥ 60% des form_start)
      |
      ↓ [taux qualification]
LEAD QUALIFIÉ
  X leads qualifiés  (vérification manuelle Nicolas)  (cible : ≥ 70% des soumissions)
```

**Lecture** : Le point de friction est là où le taux chute le plus brutalement entre deux étapes.

---

### Vue Abandons formulaire

```
┌─────────────────────────────────────────────────────┐
│  ABANDONS PAR CHAMP (form_abandonment)              │
│                                                     │
│  Dernier champ avant abandon :                      │
│  - Prénom/Nom       : X abandons                    │
│  - Email            : X abandons                    │
│  - Téléphone        : X abandons   ← souvent élevé │
│  - Type de projet   : X abandons                    │
│  - Commune          : X abandons                    │
│  - Budget           : X abandons   ← à surveiller  │
│  - Description      : X abandons   ← souvent élevé │
│                                                     │
│  Nb moyen de champs remplis avant abandon : X/7     │
└─────────────────────────────────────────────────────┘
```

**Alerte** : Si > 30% des abandons se produisent sur le champ Budget → rendre encore plus clair que c'est optionnel, ou déplacer ce champ en dernier
**Alerte** : Si > 30% des abandons se produisent sur la Description → ajouter un placeholder guidant ("Mon terrain fait environ 500 m², je veux...")

---

### Vue Portfolio engagement

```
┌─────────────────────────────────────────────────────┐
│  ENGAGEMENT PORTFOLIO                               │
│                                                     │
│  Filtres les plus cliqués :                         │
│  1. [filtre] : X clics                              │
│  2. [filtre] : X clics                              │
│                                                     │
│  Réalisations les plus vues : [top 3]               │
│                                                     │
│  % sessions portfolio → CTA contact : X%            │
│  (cible : ≥ 15%)                                    │
└─────────────────────────────────────────────────────┘
```

**Alerte** : Filtre "Projet complet eau+jardin" jamais utilisé → HYP-02 en danger, revoir la dénomination du filtre

---

### Vue Cross-selling

```
┌─────────────────────────────────────────────────────┐
│  CROSS-SELLING INTER-UNIVERS                        │
│                                                     │
│  Clics cross_selling_clicked total : X              │
│  - Piscines → Jardins : X  (X% des sessions /piscines) │
│  - Jardins → Piscines : X  (X% des sessions /jardins)  │
│                                                     │
│  Cible : ≥ 10% des sessions sur une page univers    │
│  cliquent vers l'autre univers                      │
│                                                     │
│  [Gap 3 — Conviction cross-selling mesurée]         │
│  Soumissions avec has_cross_selling = true          │
│    dont type_projet = "projet_complet" : X  (X%)   │
│  Soumissions avec has_cross_selling = false         │
│    dont type_projet = "projet_complet" : X  (X%)   │
│                                                     │
│  Interprétation : si le taux projet_complet est     │
│  nettement plus élevé dans la cohorte               │
│  has_cross_selling=true → HYP-02 confirmée.         │
└─────────────────────────────────────────────────────┘
```

**Alerte** : < 3% de clics cross-selling → le composant est invisible ou peu convaincant → revoir placement et wording

**Alerte** : has_cross_selling=true mais type_projet ≠ projet_complet dans > 80% des cas → le composant convainc à cliquer mais pas à demander un projet global → revoir la promesse du composant cross-selling

---

### Vue Page prescripteurs

```
┌─────────────────────────────────────────────────────┐
│  ESPACE PRESCRIPTEURS                               │
│                                                     │
│  Vues page prescripteurs : X (X% du trafic total)  │
│  Clics CTA prescripteur  : X (X% des vues page)    │
│  Leads prescripteur ce mois : X                    │
│                                                     │
│  Referrer principal page prescripteurs : [source]  │
└─────────────────────────────────────────────────────┘
```

**Alerte** : < 3% du trafic atteint la page prescripteurs → la page est introuvable dans la navigation → revoir le header et les renvois internes

**Filtres disponibles** : par semaine, par page source, par device type

**Granularité** : hebdomadaire. En cas d'alerte, granularité quotidienne disponible dans l'outil.

---

## Dashboard 3 — Validation Hypothèses (mensuel, pilotage stratégique)

**Audience** : Fondateur + @data-analyst

**Fréquence** : Mensuelle — revue formelle à M+1, M+3, M+6 post-launch

**Outil** : Combinaison analytics (events) + vérification manuelle Nicolas Berg (emails reçus)

**Format** : Tableau de bord textuel — chaque hypothèse avec verdict GO/NO-GO

---

```
REVUE DES HYPOTHÈSES — [MOIS] [ANNÉE]
Données couvrant : [date début] → [date fin]
Nombre de leads reçus : X

┌──────┬─────────────────────────────────┬──────────────┬───────────────┬─────────┬─────────────────────────────┐
│ ID   │ Hypothèse                       │ Métrique clé │ Valeur actuelle│ Verdict │ Action                      │
├──────┼─────────────────────────────────┼──────────────┼───────────────┼─────────┼─────────────────────────────┤
│HYP-01│ Formulaire court préféré premium│ Taux complétion│ X%           │ GO/⚠️/NO│ Si <40% : simplifier champs │
│HYP-02│ Réunion 2 maisons = crédibilité │ % leads "projet│ X%          │ GO/⚠️/NO│ Si 0% : revoir copy intégr. │
│      │                                 │ complet"     │               │         │                             │
│HYP-03│ Prescripteurs utilisent le site │ Nb leads      │ X leads      │ GO/⚠️/NO│ Si 0 : activer réseau NB    │
│      │                                 │ prescripteur  │               │         │                             │
│HYP-04│ Photos portfolio suffisantes    │ Taux rebond   │ X%           │ GO/⚠️/NO│ Si >70% : shooting à planif.│
│      │                                 │ page portfolio│               │         │                             │
│HYP-05│ Cible cherche sur Google        │ % trafic org. │ X%           │ GO/⚠️/NO│ Si <10% : audit SEO urgent  │
│HYP-06│ Bouche-à-oreille = 1er vecteur  │ % trafic direct│ X%          │ GO/⚠️/NO│ Si <20% : push LinkedIn NB  │
│HYP-07│ i18n non bloquant V1            │ Nb soumissions│ X            │ GO/⚠️/NO│ Si >5% anglais : acc. V2 EN │
│      │                                 │ en anglais    │               │         │                             │
│HYP-08│ 10 leads/mois sans pub          │ NSM           │ X leads/mois │ GO/⚠️/NO│ Si <3 leads : Ads local     │
│HYP-09│ Budget optionnel améliore quali │ % budget >50k │ X%           │ GO/⚠️/NO│ Feedback NB sur qualité     │
│HYP-10│ Blog améliorerait SEO V2        │ Capacité NB   │ oui/non      │ REPORT  │ GO/NO-GO à M+3              │
└──────┴─────────────────────────────────┴──────────────┴───────────────┴─────────┴─────────────────────────────┘

Légende verdicts :
  GO  = hypothèse validée, continuer dans cette direction
  ⚠️   = hypothèse incertaine, surveiller 1 mois supplémentaire
  NO  = hypothèse infirmée, action corrective immédiate (voir colonne Action)
```

---

### Grille de décision par jalon

#### Revue M+1 (4 semaines post-launch)

**Objectif** : Vérifier que le tracking fonctionne et que le site est opérationnel.

| Question | Source | Action si NON |
|----------|--------|---------------|
| Le formulaire reçoit-il des soumissions ? | Email Nicolas | Test end-to-end immédiat |
| Les events analytics se déclenchent-ils ? | Outil analytics (onglet events) | Debug @fullstack |
| La page prescripteurs est-elle indexée ? | Google Search Console | Vérifier sitemap + robots.txt |
| Y a-t-il ≥ 1 lead qualifié ? | Email Nicolas | Signal normal si < 2 semaines post-launch |

---

#### Revue M+3 (checkpoint roadmap — gate officiel)

**Décision attendue** : GO (continuer organique) ou NO-GO (activer acquisition payante)

| Métrique | Seuil GO | Seuil NO-GO | Action NO-GO |
|----------|----------|-------------|--------------|
| NSM mensuel | ≥ 5 leads/mois | < 3 leads/mois | Google Ads local 78/92, 500 €/mois |
| % trafic organique | ≥ 20% | < 10% | Audit SEO complet avec @seo |
| Taux complétion formulaire | ≥ 60% | < 40% | Test qualitatif formulaire (montrer à 3 personnes profil Alexandre) |
| Au moins 1 lead prescripteur | Oui | 0 lead prescripteur | Partage direct de la page par Nicolas à 2-3 architectes connus |
| Au moins 1 lead "Projet complet" | Oui | 0 lead projet complet | Revoir le copy d'intégration des deux maisons |

---

#### Revue M+6 (objectif North Star)

**Décision attendue** : Valider V2 ou consolider V1

| Métrique | Seuil GO V2 | Action si non atteint |
|----------|-------------|----------------------|
| NSM mensuel | ≥ 10 leads/mois | Maintenir V1 + budget acquisition |
| Part prescripteurs | ≥ 5% des leads | Formulaire prescripteur avancé (V2-06 roadmap) |
| Taux conversion leads → devis | ≥ 50% | Requalifier les critères de qualification |
| Site cité en rendez-vous par Nicolas | Oui (qualitatif) | Vérifier que le site est partageable facilement |

---

## Requêtes analytiques complémentaires (Umami — gaps UX v1.1)

Ces requêtes ne nécessitent pas d'events supplémentaires. Elles s'exécutent manuellement dans l'interface Umami (filtres et rapports) lors des revues Dashboard 2.

---

### Requête R-01 — Temps moyen sur /realisations (Gap 1 : signal de conviction portfolio)

**Objectif** : Mesurer si les visiteurs qui cliquent ensuite sur un CTA passent plus de temps sur le portfolio que les visiteurs qui partent sans contacter. Signal de conviction, pas de conversion directe.

**Source** : Umami → rapport "Pages" → filtre sur `/realisations` → colonne "Durée moyenne".

**Lecture** :
- Durée moyenne < 60 secondes sur /realisations → les photos ne retiennent pas → revoir le shooting ou la présentation de la grille.
- Durée moyenne > 3 minutes → le portfolio engage, HYP-04 confirmée.

**Limites** : Umami mesure le temps de session par page de manière approximative (différence entre timestamp d'arrivée et prochain event). À traiter comme signal directionnel.

**Décision alimentée** : HYP-04 (photos portfolio suffisantes). Seuil d'alerte : durée moyenne < 60 s sur ≥ 20 sessions.

---

### Requête R-02 — Séquence de conviction accueil → univers → portfolio → contact (Gap 2 : chemin de conviction complet)

**Objectif** : Quantifier la part des sessions qui suivent le chemin de conviction idéal défini par @ux. `cta_clicked.page_source` ne donne que la dernière étape — cette requête restitue la séquence complète.

**Source** : Umami → rapport "Funnels" (fonctionnalité native Umami v2+). Configurer le funnel suivant :

```
Étape 1 : page_viewed → page_path = "/"
Étape 2 : page_viewed → page_path contient "/piscines-bien-etre" OU "/jardins-paysage"
Étape 3 : page_viewed → page_path = "/realisations"
Étape 4 : cta_clicked (event custom)
Étape 5 : form_submission_success (event custom)
```

**Lecture** :
- Taux de complétion étapes 1→5 = taux du chemin de conviction idéal.
- Point de chute le plus important entre étapes → friction à corriger en priorité.
- Si < 5% des sessions complètent les 5 étapes → normal (chemin long) ; surveiller l'étape de chute majoritaire.

**Décision alimentée** : Allocation des efforts CRO — si la chute se produit en étape 2 (univers), revoir l'accueil ; si en étape 3 (portfolio), revoir la navigation vers /realisations ; si en étape 4 (CTA), revoir le wording ou le placement du CTA.

**Fréquence** : mensuelle, lors de la revue Dashboard 2.

---

### Requête R-03 — Sessions prescripteur non converties (Gap 4 : Camille sans soumission)

**Objectif** : Distinguer les visiteurs qui ont consulté la page prescripteurs mais n'ont pas soumis de formulaire. Signal pour évaluer si la page convainc de contacter.

**Source** : Umami → "Sessions" avec filtre :
- Inclure : sessions contenant l'event `prescripteur_page_viewed`
- Exclure : sessions contenant l'event `form_submission_success` avec `type_projet = "prescripteur"`

**Calcul** :
```
Taux de non-conversion prescripteur =
  sessions(prescripteur_page_viewed) - sessions(form_submission_success[type_projet=prescripteur])
  ────────────────────────────────────────────────────────────────────────────────────────────────
                    sessions(prescripteur_page_viewed)
```

**Lecture** :
- Taux de non-conversion > 95% → normal en phase de démarrage (les prescripteurs évaluent avant de contacter).
- Si le ratio `prescripteur_page_viewed` / sessions totales est > 3% mais le taux de soumission prescripteur reste 0 pendant 2 mois → la page ne convainc pas → test qualitatif avec un architecte réel (recommandé dans user-flows.md).

**Décision alimentée** : Revue M+3, HYP-03. Seuil d'alerte : 0 soumission prescripteur à M+3 avec ≥ 5 vues de la page.

---

**Constat** : En V1, il n'y a pas d'email automatisé, pas de Slack, pas de CRM. Le fondateur est la seule personne qui reçoit les leads. Le protocole suivant garantit que les données sont collectées et utilisées, sans infrastructure supplémentaire.

### Routine mensuelle Nicolas Berg (1er de chaque mois, 15 minutes)

```
ÉTAPE 1 — Compter les leads (source : boîte email)
  → Ouvrir contact@aqua-system.fr
  → Compter les emails reçus depuis le formulaire du site
  → Pour chaque email : noter type_projet, commune, budget_renseigne (oui/non)
  → Reporter dans un Google Sheets simple (1 ligne par lead)

ÉTAPE 2 — Consulter l'outil analytics (Umami ou Plausible)
  → Ouvrir l'interface (URL fournie par @fullstack à la mise en ligne)
  → Copier les 5 métriques du Dashboard 1 :
    - Visiteurs uniques du mois
    - Top source de trafic
    - Clics CTA total
    - form_start total
    - form_submission_success total

ÉTAPE 3 — Calculer les 2 taux clés
  → Taux complétion = form_submission_success / form_start × 100
  → Taux qualification = leads qualifiés (étape 1) / form_submission_success × 100

ÉTAPE 4 — Comparer aux cibles
  → NSM ce mois vs cible du jalon : GO ou alerte ?
  → Taux complétion ≥ 60% ? GO ou alerte ?

ÉTAPE 5 — Décider 1 action si nécessaire
  → Maximum 1 action corrective identifiée par mois (focus)
  → Consigner dans le Google Sheets (colonne "Action décidée")
```

**Évolution V2** : Si NSM ≥ 10 leads/mois à M+6, envisager Notion ou une simple intégration Zapier (email → tableau de suivi) pour automatiser l'étape 1. Pas nécessaire avant.

---

*Fichier produit par @data-analyst — 2026-06-11*
