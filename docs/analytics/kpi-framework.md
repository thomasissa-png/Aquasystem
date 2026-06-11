# KPI Framework — Site vitrine [NOM OMBRELLE]
## Aqua System × Les Terres Essentielles

> Outil de décision, pas de reporting. Chaque métrique affichée a une formule, un seuil d'alerte et une action corrective.
> Zéro vanité : si une métrique ne change aucune décision, elle n'est pas ici.
> Dernière mise à jour : 2026-06-11 | Agent : @data-analyst

---

**v1.2 — 2026-06-11 — Harmonisation post-arbitrages P0**
- NSM : `type_projet non null` retiré des critères stricts. Lead qualifié = commune 78/92 + description ≥ 20 chars. `type_projet` = critère d'enrichissement uniquement (chips optionnels P0-2).
- Formule NSM mise à jour en conséquence.

---

## 1. North Star Metric (NSM)

### Définition précise

**Leads entrants qualifiés / mois** — une demande de contact est qualifiée si ET SEULEMENT SI :
1. La commune renseignée appartient au 78 ou au 92 (ou limitrophe accepté : 27, 95)
2. Le champ `description` contient ≥ 20 caractères (soumission non vide)

Un formulaire qui échoue à L'UN de ces 2 critères = lead non qualifié (à signaler séparément à Nicolas Berg, pas compté dans la NSM).

**Note `type_projet`** : Le champ `type_projet` (chips optionnels) n'est PAS un critère de qualification strict. Un lead sans chip sélectionné mais avec une bonne description et une commune 78/92 est qualifié — Nicolas lit la description pour identifier le type de projet. `type_projet` est un critère d'enrichissement utilisé pour la répartition par activité (indicateur V-03, HYP-02, HYP-03) et pour les smart defaults de la page de confirmation, pas pour filtrer les leads valides.

### Formule de calcul exacte

```
NSM(mois M) = COMPTE(form_submission_success)
              où commune IN [78*, 92*, 27*, 95*]
              ET longueur(description) >= 20
              FENÊTRE = du 1er au dernier jour du mois calendaire M
```

**Numérateur** : nombre de soumissions formulaire validant les 3 critères dans la fenêtre mensuelle.

**Dénominateur** : 1 (c'est un comptage absolu, pas un taux).

**Source de mesure unique** : log de la Cloudflare Pages Function (email de réception par Nicolas Berg) — l'event `form_submission_success` est la trace analytics correspondante. En cas de divergence entre l'email reçu et l'event analytics, **l'email fait foi** (source of truth opérationnelle).

**Fenêtre** : mensuelle, réinitialisée le 1er de chaque mois. Suivi hebdomadaire indicatif = NSM cumulée dans le mois en cours.

### Cibles

| Jalon | Cible NSM | Statut |
|-------|-----------|--------|
| M+1 post-launch | ≥ 2 leads qualifiés | Amorçage — signal de fonctionnement |
| M+3 post-launch | ≥ 5 leads qualifiés/mois | Seuil de revue stratégique (roadmap.md J M+3) |
| M+6 post-launch | ≥ 10 leads qualifiés/mois | Objectif North Star validé fondateur |

**Seuil d'alerte** : Si NSM < 3 leads au bout de 4 semaines post-launch → activer diagnostic funnel immédiat (voir section 2).

**Action si M+3 < 5** : déclencher Google Ads local 78/92 (budget minimal 500 €/mois, requêtes premium) + activation LinkedIn Nicolas Berg comme canal de distribution.

---

## 2. Funnel vitrine adapté

> Ce site est conviction-first, pas funnel-first. Les étapes mesurent la progression qualitative d'un visiteur vers la prise de contact. Pas de Revenue ni de Referral classiques — remplacés par les étapes métier réelles.

### Architecture du funnel

```
ACQUISITION → CONSIDÉRATION → INTENTION → CONVERSION → CLOSING OFFLINE → PRESCRIPTION
```

---

### Étape 1 — Acquisition (être trouvé)

| Métrique | Formule | Outil | Cible M+3 | Seuil alerte |
|----------|---------|-------|-----------|--------------|
| Visiteurs uniques/mois | COMPTE(sessions distinctes) | Analytics (pageviews) | ≥ 300 visiteurs/mois [HYPOTHÈSE — estimé à partir de 10 leads attendus / taux conversion cible 3%] | < 150/mois → SEO insuffisant |
| % trafic organique | sessions_organic / sessions_total × 100 | Analytics (referrer) | ≥ 20% à M+3 | < 10% → revoir stratégie SEO |
| % trafic direct + brand | sessions_direct / sessions_total × 100 | Analytics | > 40% [HYPOTHÈSE : bouche-à-oreille fort HYP-06] | < 20% → bouche-à-oreille inactif |
| Source de trafic #1 | Top referrer par volume | Analytics | À observer — pas de cible prescrite | Si top source ≠ organique/direct après M+3 → revoir |

**Benchmark** : taux de conversion visiteur → lead pour services premium à domicile : 3-8% [source : Ruler Analytics, home services premium, 2025 — voir sources]. Cible conservatrice retenue : 3% (10 leads / 300 visiteurs à M+6).

---

### Étape 2 — Considération (rester et explorer)

| Métrique | Formule | Outil | Cible M+3 | Seuil alerte |
|----------|---------|-------|-----------|--------------|
| Taux de rebond page d'accueil | visiteurs 1 page seule / total × 100 | Analytics (pageviews) | < 60% [HYPOTHÈSE — vitrine premium] | > 70% → hero inefficace, tester HYP-02 |
| Navigation accueil → réalisations | COMPTE(portfolio_page_view après accueil) / visiteurs accueil × 100 | Event analytics | ≥ 30% | < 15% → CTA accueil peu clair |
| Temps moyen sur site | moyenne(durée session) | Analytics | > 2 min [HYPOTHÈSE] | < 1 min → contenu insuffisamment engageant |
| Profondeur de navigation | moyenne(pages/session) | Analytics | ≥ 2,5 pages | < 1,8 → parcours trop court |

---

### Étape 3 — Intention (signaux d'intérêt fort)

| Métrique | Formule | Outil | Cible M+3 | Seuil alerte |
|----------|---------|-------|-----------|--------------|
| Clics CTA "Parlez-nous de votre projet" | COMPTE(cta_click) par page_source | Event analytics | ≥ 10% des sessions | < 5% → conviction insuffisante |
| Vues page contact | COMPTE(page_view où page = /contact) | Event/pageview | ≥ 40% des clics CTA | < 25% → friction entre CTA et formulaire |
| Form starts | COMPTE(form_start) | Event analytics | ≥ 70% des vues /contact | < 50% → page contact trop froide |

---

### Étape 4 — Conversion (lead généré — NSM)

| Métrique | Formule | Outil | Cible M+3 | Seuil alerte |
|----------|---------|-------|-----------|--------------|
| **NSM : leads qualifiés/mois** | cf. section 1 | Email + event analytics | ≥ 5 à M+3 | < 3 → diagnostic urgent |
| Taux de complétion formulaire | form_submission_success / form_start × 100 | Event analytics | ≥ 60% | < 40% → friction formulaire (HYP-01) |
| % leads qualifiés sur total soumissions | leads qualifiés / form_submission_success × 100 | Email (vérification manuelle Nicolas) | ≥ 70% | < 50% → critères qualification à revoir |
| Abandons formulaire | COMPTE(form_abandonment) par derniere_etape | Event analytics | < 40% | > 60% → champ bloquant identifié |

---

### Étape 5 — Closing offline (suivi manuel fondateur)

> Pas d'outil automatisé en V1. Suivi par Nicolas Berg dans un fichier Excel ou carnet (aucun CRM déployé).

| Métrique | Formule | Outil | Cible | Seuil alerte |
|----------|---------|-------|-------|--------------|
| Taux de réponse à 48h | leads répondus ≤ 48h / leads reçus × 100 | Suivi manuel Nicolas | 100% | < 80% → délai trop long, risque de perte |
| Taux de transformation lead → devis | devis envoyés / leads qualifiés × 100 | Suivi manuel Nicolas | ≥ 50% [HYPOTHÈSE — première estimation] | < 30% → seuil d'alerte qualité leads |
| Taux de transformation devis → chantier | chantiers signés / devis envoyés × 100 | Suivi manuel Nicolas | ≥ 30% [HYPOTHÈSE — secteur haut de gamme, cycle long] | < 15% → positionnement ou concurrence |
| Valeur moyenne du projet signé | total CA signé / nb chantiers signés | Suivi manuel Nicolas | > 50 000 € (seuil haut de gamme) | < 30 000 € → leads non qualifiés en réalité |

---

### Étape 6 — Prescription (leads via espace prescripteurs)

| Métrique | Formule | Outil | Cible M+3 | Seuil alerte |
|----------|---------|-------|-----------|--------------|
| Part leads prescripteurs | leads avec type_projet = "Prescripteur-Architecte" / NSM × 100 | Event analytics + email | ≥ 5% à M+3 (soit ≥ 1 lead prescripteur tous les 2 mois) | 0 lead prescripteur à M+3 → page inefficace, investiguer |
| Vues page prescripteurs | COMPTE(prescripteur_page_view) / total visiteurs × 100 | Event analytics | ≥ 3% des sessions | < 1% → page prescripteurs non trouvée |
| Clics CTA prescripteur | COMPTE(prescripteur_cta_click) / prescripteur_page_view × 100 | Event analytics | ≥ 20% | < 10% → valeur prop Camille insuffisante |

---

## 3. KPIs par feature

| Feature | KPI principal | Formule | Cible | Seuil alerte | Action corrective |
|---------|--------------|---------|-------|--------------|-------------------|
| Formulaire de contact (F-08) | Taux complétion | form_submission_success / form_start | ≥ 60% | < 40% | Analyser abandons par étape ; alléger ou réordonner les champs |
| Formulaire de contact (F-08) | % leads qualifiés | leads quali / soumissions totales | ≥ 70% | < 50% | Revoir critères de qualification ou rendre commune/description obligatoires |
| Navigation accueil → portfolio | Taux de clic vers réalisations | cta_realisation_click / sessions_accueil | ≥ 30% | < 15% | A/B test position/wording du CTA "Voir nos réalisations" |
| Page prescripteurs (F-07) | Part des leads via prescripteurs | type_projet = prescripteur / NSM | ≥ 5% à M+3 | 0 lead à 3 mois | Activer réseau Nicolas Berg ; proposer la page à 2-3 architectes connus |
| Cross-selling univers (F-02/F-03) | Clics inter-univers | cross_selling_click / sessions_univers | ≥ 10% | < 3% | Renforcer le composant cross-selling ; tester wording alternatif |
| Trafic organique (SEO) | Part SEO | sessions_organic / sessions_total | ≥ 20% à M+3 | < 10% | Audit SEO on-page ; vérifier indexation dans Search Console |

---

## 4. Validation persona — Alexandre et Camille sont-ils réels ?

Ces 3 métriques permettent de vérifier que les visiteurs et les leads correspondent aux personas ciblés.

### Indicateur V-01 — Profil géographique des leads

**Métrique** : % leads avec commune dans le 78 ou 92 / total leads reçus

**Formule** : leads_78_92 / form_submission_success × 100

**Source** : champ `commune` du formulaire (vérification manuelle Nicolas)

**Cible** : ≥ 80% des leads en zone cible 78/92 (ou limitrophe 27/95)

**Seuil alerte** : < 60% → problème de ciblage SEO ou de perception géographique de la marque

**Action** : revoir le copy et les mentions géographiques dans les balises title/meta

---

### Indicateur V-02 — Ticket perçu des projets

**Métrique** : % leads ayant renseigné un budget ≥ 50 000 € parmi les leads ayant renseigné un budget

**Formule** : leads_budget_50k_plus / leads_budget_renseigne × 100

**Source** : champ `budget_indicatif` du formulaire (optionnel) + event `form_submission_success.budget_renseigne`

**Cible** : ≥ 50% des budgets renseignés ≥ 50 000 € [HYPOTHÈSE — persona Alexandre, ticket minimum 70 000 €]

**Seuil alerte** : > 40% de leads avec budget < 50 000 € → présence de personas hors cible

**Action** : revoir le positionnement prix dans le copy (les mentions "sur mesure" et "haut de gamme" doivent filtrer naturellement)

---

### Indicateur V-03 — Type de projet soumis

**Métrique** : répartition des leads par type_projet (Piscine / Spa-Sauna / Jardin & Parc / Projet complet / Prescripteur)

**Formule** : COMPTE par valeur de type_projet / total leads

**Source** : event `form_submission_success.type_projet`

**Cible** : ≥ 5% leads "Projet complet eau+jardin" dès M+3 (valide HYP-02), ≥ 5% "Prescripteur" dès M+3 (valide HYP-03)

**Seuil alerte** : 0 lead "Projet complet" dans les 3 premiers mois → copy d'intégration inefficace, revoir le hero et les pages univers

---

## 5. Mesure des hypothèses critiques (assumption-map.md)

| ID Hyp | Hypothèse | Métrique(s) de test | Seuil GO | Seuil NO-GO | Source de mesure |
|--------|-----------|--------------------|-----------|-----------|----|
| HYP-01 | Formulaire court préféré par le premium | Taux complétion + % leads avec description utile | ≥ 60% complétion ET ≥ 70% descriptions ≥ 50 mots | < 40% complétion → simplifier encore ; < 40% descriptions utiles → ajouter 1 guideline | Event form_abandonment + review manuelle Nicolas |
| HYP-02 | Réunion 2 maisons = crédibilisation (pas dilution) | % leads "Projet complet" sur NSM + cross_selling_click > 10% | ≥ 5% leads "Projet complet" à M+3 ET cross_selling_click ≥ 10% | 0 lead "Projet complet" à M+3 → revoir copy intégration et composant cross-selling | Event form_submission_success.type_projet + cross_selling_click |
| HYP-03 | Prescripteurs utilisent le site pour recommander | Part leads prescripteur / NSM + prescripteur_page_view | ≥ 1 lead prescripteur à M+3 ET taux de rebond page prescripteurs < 50% | 0 lead prescripteur à 3 mois + < 10 vues page prescripteur → page introuvable ou inintéressante | Event prescripteur_page_view + form_submission_success.type_projet |
| HYP-04 | Photos suffisantes pour portfolio premium | Taux de navigation vers portfolio + temps sur page portfolio | > 30% des sessions accèdent au portfolio ET durée > 1 min | Taux rebond page portfolio > 70% à M+1 → qualité photo insuffisante | Event portfolio_realisation_view + pageview analytics |
| HYP-05 | Cible recherche sur Google | % trafic organique / total à M+3 | ≥ 30% trafic organique à M+3 | < 10% → SEO insuffisant, activer LinkedIn/réseau | Analytics referrer |
| HYP-06 | Bouche-à-oreille = 1er vecteur actuel | % trafic direct + brand / total | > 40% trafic direct à M+3 | < 20% → visibilité brand faible, activer distribution Nicolas | Analytics referrer |
| HYP-07 | i18n non bloquant en V1 | % formulaires soumis en anglais | < 5% soumissions anglaises confirme le report EN | > 5% → accélérer V2 EN | Review manuelle Nicolas |
| HYP-08 | 10 leads/mois atteignable sans pub | NSM mensuel à M+3 et M+6 | ≥ 5 leads/mois à M+3 | < 3 leads/mois à M+3 → budget acquisition payant à déclencher | Email + event analytics |
| HYP-09 | Budget optionnel améliore qualification | Taux de remplissage champ budget + feedback Nicolas | > 50% budgets renseignés ≥ 50k€ | Feedback Nicolas : leads hors budget → rendre champ budget obligatoire | form_submission_success.budget_renseigne |
| HYP-10 | Blog améliorera SEO en V2 | Non mesurable en V1 — condition préalable : capacity production | GO si Nicolas confirme 1 fiche/mois à M+3 | NO-GO si < 1 publication/3 mois → maintenir scope V1 | Décision fondateur à M+3 |

---

*Fichier produit par @data-analyst — 2026-06-11*
