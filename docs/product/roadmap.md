# Roadmap — Priorisation RICE horizon 6 mois
## Site vitrine [NOM OMBRELLE] — Aqua System × Les Terres Essentielles

> Roadmap par dépendances et jalons, jamais par sprints. Chaque item lié au KPI North Star : 10 leads qualifiés/mois.
> Formule RICE utilisée : Reach × Impact × Confidence / Effort. Effort calibré IA (quasi nul) → Score = Reach × Impact × Confidence.
> Reach : nb visiteurs potentiellement impactés/mois [HYPOTHÈSE]. Impact : 0,25/0,5/1/2/3. Confidence : 20-100%. Effort : 1 (low) / 2 (med) / 3 (high).
> Dernière mise à jour : 2026-06-11 | Agent : @product-manager

---

## Chemin critique par dépendances (non négociable)

```
JALON 0 — Décisions fondateur (checkpoint Phase 0)
  └─ Naming validé (Orvère / Thalweg / Rive & Clos)
  └─ Photos sources confirmées (book Calameo haute résolution + droits)
  └─ Éditeur unique AQUA SYSTEM validé + formulations LTE
      │
      ▼
JALON 1 — Identité visuelle et contenu
  ├─ @design : identité visuelle ombrelle (logo, palette, typographie, système de design)
  │     ↓ débloque →
  └─ @copywriter : copy toutes pages FR (dépend brand-platform + personas + brief design)
        ↓ débloque →
JALON 2 — Architecture et développement
  ├─ @infrastructure : setup Cloudflare Pages + domaine + Pages Function formulaire
  │     ↓ débloque →
  └─ @fullstack : développement Next.js (dépend design system + copy + infra)
        ↓ débloque →
JALON 3 — Contenu et SEO
  ├─ @seo : keyword mapping local 78/92 + implémentation on-page (parallèle dev)
  ├─ @data-analyst : setup tracking Cloudflare Web Analytics + events (parallèle dev)
  └─ Intégration photos portfolio (dépend fichiers sources réels)
        ↓ débloque →
JALON 4 — Qualité et validation
  ├─ @qa : tests fonctionnels (formulaire, navigation, responsive, performance)
  ├─ @ux : review parcours conviction-first sur prototype haute fidélité
  └─ @legal : validation mentions légales + RGPD avant mise en ligne
        ↓ débloque →
JALON 5 — Lancement
  └─ Validation fondateur (checkpoint Phase 5)
  └─ Mise en ligne publique (dépend acquisition LTE — voir risque 3)
        ↓ débloque →
JALON 6 — Post-launch V2
  └─ Analyse données 4-6 semaines → décisions V2
  └─ Version EN (dépend contenus FR validés + retours V1)
```

**Dépendances bloquantes identifiées :**
- Sans naming → pas de design → pas de dev → pas de lancement
- Sans photos sources validées → pas de portfolio → V1 incomplète
- Sans acquisition LTE actée → pas de mentions légales définitives → pas de mise en ligne publique des pages LTE
- Sans copy → pas de dev front (le copy structure les pages)

---

## Phase V1 — Items à livrer (score RICE décroissant)

### BLOC A — Foundation (déblocage de tout le reste)

| ID | Feature | Opportunité | Reach | Impact | Conf. | Effort | Score RICE | Dépendance |
|----|---------|------------|-------|--------|-------|--------|-----------|------------|
| R-01 | Naming validé + domaine réservé + dépôt INPI | OPP-A1, toutes | 500 | 3 | 90% | 1 | 1350 | Checkpoint fondateur |
| R-02 | Identité visuelle ombrelle (logo, palette, typo, système de design) | OPP-A2, OPP-A3 | 500 | 3 | 85% | 1 | 1275 | R-01 |
| R-03 | Setup infrastructure Cloudflare Pages + domaine + HTTPS | OPP-A1 | 500 | 3 | 95% | 1 | 1425 | R-01 |
| R-04 | Photos sources (fichiers HD + droits validés) | OPP-A2 | 500 | 3 | 40% | 1 | 600 | Checkpoint fondateur |

**Note R-04** : Score ajusté à la baisse (confidence 40%) car l'accessibilité des photos n'est pas garantie — RISQUE 1 du product-vision. Si les photos sont disponibles, le score monte à 1425.

---

### BLOC B — Core du site (valeur principale Alexandre + KPI North Star)

| ID | Feature | Opportunité | Reach | Impact | Conf. | Effort | Score RICE | Dépendance |
|----|---------|------------|-------|--------|-------|--------|-----------|------------|
| R-05 | Page d'accueil (hero conviction-first, tagline, preuves, cross-selling, CTA) | OPP-A2, OPP-T1 | 500 | 3 | 80% | 1 | 1200 | R-02, R-04 |
| R-06 | Formulaire qualifiant (7 champs, mention RGPD, Pages Function, page confirmation) | OPP-A4 | 400 | 3 | 85% | 1 | 1020 | R-03, copy |
| R-07 | Page réalisations / portfolio filtrable (filtre type de projet) | OPP-A2, OPP-C1 | 450 | 3 | 85% | 2 | 1147 | R-04, R-02 |
| R-08 | Page univers piscines & bien-être (prestations, photos, CTA) | OPP-A2, OPP-T1 | 350 | 2 | 85% | 1 | 595 | R-02, copy |
| R-09 | Page univers jardins & paysage / LTE (prestations, photos, formulation partenariat) | OPP-A2, OPP-T1 | 300 | 2 | 80% | 1 | 480 | R-02, copy, formulation légale |
| R-10 | Page approche / méthode "de la vision à la réalisation" | OPP-A3, OPP-C1 | 350 | 2 | 75% | 1 | 525 | R-02, copy |
| R-11 | Page à propos / maison (Nicolas, équipe, valeurs, ancienneté, preuves) | OPP-A3 | 300 | 2 | 80% | 1 | 480 | R-02, copy |
| R-12 | Page contact (formulaire + informations pratiques) | OPP-A4 | 450 | 3 | 90% | 1 | 1215 | R-06 |

---

### BLOC C — Espace prescripteurs (Camille — OBLIGATOIRE V1)

| ID | Feature | Opportunité | Reach | Impact | Conf. | Effort | Score RICE | Dépendance |
|----|---------|------------|-------|--------|-------|--------|-----------|------------|
| R-13 | Page espace prescripteurs / architectes (valeur prop Camille, certifications, CTA dédié) | OPP-C1, OPP-C2 | 100 | 3 | 60% | 1 | 180 | R-02, copy |

**Note R-13** : Score RICE faible en Reach (peu d'architectes vs propriétaires) mais OBLIGATOIRE V1 car (1) décision fondateur, (2) espace libre vs concurrence, (3) effet de levier prescripteur sur plusieurs leads. Règle : une feature n'est pas exclue pour score RICE faible si sa valeur persona est prouvée.

---

### BLOC D — Infrastructure technique et conformité

| ID | Feature | Opportunité | Reach | Impact | Conf. | Effort | Score RICE | Dépendance |
|----|---------|------------|-------|--------|-------|--------|-----------|------------|
| R-14 | SEO on-page local 78/92 (title tags, H1, meta, balises structurées, sitemap, robots.txt) | OPP-A1 | 500 | 2 | 75% | 1 | 750 | R-05 à R-12 |
| R-15 | Performance Core Web Vitals (LCP < 2,5s, CLS < 0,1, FID < 100ms) | OPP-A1 | 500 | 2 | 80% | 1 | 800 | Dev front |
| R-16 | OG / social cards toutes pages | OPP-A1 | 200 | 1 | 90% | 1 | 180 | R-02, pages |
| R-17 | Favicons (tous formats, toutes plateformes) | OPP-A1 | 500 | 0,5 | 95% | 1 | 237 | R-02 |
| R-18 | Architecture i18n-ready (next-intl ou équivalent, structure locale FR, placeholder EN) | OPP-A1 | 100 | 1 | 95% | 1 | 95 | Dev front |
| R-19 | Mentions légales + politique de confidentialité (conformes @legal) | Conformité | 500 | 2 | 95% | 1 | 950 | @legal |
| R-20 | Tracking events Cloudflare Web Analytics (formulaire, CTAs, portfolio) | KPI tracking | 500 | 2 | 90% | 1 | 900 | @data-analyst, dev |
| R-21 | Page 404 (sobre, lien retour accueil) | OPP-A3 | 100 | 0,5 | 90% | 1 | 45 | Dev front |

---

### Classement RICE global V1 (décroissant)

| Rang | ID | Feature | Score RICE | Jalon |
|------|-----|---------|-----------|-------|
| 1 | R-03 | Setup infrastructure Cloudflare | 1425 | J0/J2 |
| 2 | R-01 | Naming validé | 1350 | J0 |
| 3 | R-02 | Identité visuelle | 1275 | J1 |
| 4 | R-05 | Page d'accueil | 1200 | J2 |
| 5 | R-12 | Page contact + formulaire complet | 1215 | J2 |
| 6 | R-07 | Portfolio filtrable | 1147 | J2 |
| 7 | R-06 | Formulaire qualifiant | 1020 | J2 |
| 8 | R-19 | Mentions légales + RGPD | 950 | J3/J4 |
| 9 | R-20 | Tracking events | 900 | J3 |
| 10 | R-15 | Core Web Vitals | 800 | J3 |
| 11 | R-14 | SEO on-page | 750 | J3 |
| 12 | R-08 | Page univers piscines | 595 | J2 |
| 13 | R-10 | Page approche | 525 | J2 |
| 14 | R-09 | Page univers jardins/LTE | 480 | J2 |
| 15 | R-11 | Page à propos | 480 | J2 |
| 16 | R-17 | Favicons | 237 | J3 |
| 17 | R-16 | OG / social cards | 180 | J3 |
| 18 | R-13 | Page prescripteurs (OBLIGATOIRE) | 180* | J2 |
| 19 | R-18 | i18n-ready | 95 | J2 |
| 20 | R-21 | Page 404 | 45 | J3 |

*Score faible mais non négociable — valeur prescripteur dépasse le score RICE seul.

---

## Phase V2 — Items post-launch (dépendants des retours V1)

| ID | Feature | Opportunité | Raison du report | Condition de déclenchement |
|----|---------|------------|-----------------|--------------------------|
| V2-01 | Version EN du site | OPP-A1 | Dépend contenus FR validés + décision fondateur | 3 mois post-launch + contenus FR stables |
| V2-02 | Témoignages / verbatims clients réels | OPP-A2, OPP-A3 | Aucun verbatim réel disponible et autorisé (règle anti-fictif) | Dès que Nicolas obtient 3+ autorisations écrites |
| V2-03 | Blog / journal des réalisations | OPP-A1 | Dépend rythme de production contenu réel Nicolas Berg | GO/NO-GO à 3 mois : capacity 1 article/mois confirmée |
| V2-04 | Landing dédiée aqua-system.fr + redirection 301 | OPP-A1 | Décision domaine non tranchée en Phase 0 | Décision fondateur post-checkpoint Phase 0 |
| V2-05 | Google Ads local (piscine haut de gamme 78/92) | OPP-A1 | Pas de budget acquisition défini en V1 | Si NSM < 5 leads/mois à M+3 |
| V2-06 | Notifications email interne (alerte lead nouveau) | OPP-A4 | Pas de BDD V1, mais améliore le temps de réponse | Analyse des premiers leads : si délai réponse > 24h → déclencher |

---

## Indicateurs de succès par jalon

| Jalon | Critère GO/NO-GO |
|-------|-----------------|
| J0 — Checkpoint fondateur | Naming choisi + photos sources confirmées + éditeur validé |
| J1 — Design | Identité visuelle validée fondateur (logo, palette, 3 maquettes pages clés) |
| J2 — Dev | Toutes les pages V1 construites, formulaire fonctionnel, responsive 3 devices |
| J3 — Contenu/SEO | Copy validé fondateur, SEO on-page implémenté, tracking events actifs |
| J4 — QA | 0 bug critique, formulaire 100% fonctionnel, Core Web Vitals dans les seuils |
| J5 — Launch | Validation @legal mentions légales + GO fondateur + acquisition LTE confirmée ou V lite publiée |
| M+3 — Revue | ≥ 5 leads qualifiés/mois, SEO top 5 sur ≥ 3 requêtes |
| M+6 — Objectif | ≥ 10 leads qualifiés/mois |

---

*Fichier produit par @product-manager — 2026-06-11*
