# Orchestration Plan — Site umbrella Aqua System × Les Terres Essentielles

> Plan vivant. Mode : AUTOPILOT phases 0→5, checkpoint obligatoire après Phase 0 (fondateur prévalide tout).
> Reprise : « Lis project-context.md et docs/orchestration-plan.md, continue où on s'est arrêté. »
> Dernière mise à jour : 2026-06-11

## Paramètres verrouillés
- **Type projet** : site vitrine (priorisation 0 → 3 → 1, mais livraison complète demandée → toutes phases)
- **Vitrine vs Funnel** : dominante VITRINE [HYPOTHÈSE ORCHESTRATEUR — identité/crédibilité haut de gamme, CTAs conviction-first en fin de parcours ; à confirmer par @creative-strategy en Phase 0]
- **KPI North Star** : 10 leads entrants qualifiés / mois
- **Persona** : « Alexandre », patrimoine élevé, 78/92, projet de vie piscine+jardin ≥ 70-80 k€ ; secondaire : architecte prescripteur
- **Stack** : Next.js statique + Cloudflare Pages, formulaire via Pages Functions, pas de BDD V1, FR d'abord (i18n-ready)
- **Spécificité** : marque ombrelle À NOMMER (livrable Phase 0) ; acquisition Terres Essentielles par Nicolas Berg en cours (mentions légales différées)

## Gate learnings
- docs/lessons-learned.md créé (projet neuf) — aucun P0/P1 non-propagé. PASS 2026-06-11.

## Phases

### Phase 0 — Fondations — COMPLETE (2026-06-11, checkpoint validé)
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 0.1 (∥ 0.2) | @creative-strategy | docs/strategy/brand-platform.md, personas.md, competitive-benchmark.md, creative-brief.md, naming-proposals.md | LIVRÉ 2026-06-11 | OK — gates PASS. Décisions : Kapferer ; promesse 18 mots ; tagline « L'extérieur à la hauteur de votre propriété » ; VITRINE conviction-first ; naming top 3 Orvère/Thalweg/Rive & Clos [choix fondateur au checkpoint] ; personas Alexandre + Camille (prescripteur) ; section prescripteurs obligatoire en V1 |
| 0.2 (∥ 0.1) | @legal | docs/legal/legal-audit.md, rgpd-checklist.md, mentions-legales-draft.md, privacy-policy.md | LIVRÉ 2026-06-11 | OK — gates PASS (anti-placeholder, données réelles, blocs [À CONFIRMER]/[POST-ACQUISITION] balisés) |
| 0.3 | @product-manager | docs/product/discovery-map.md, assumption-map.md, product-vision.md, roadmap.md, v1-scope.md | LIVRÉ 2026-06-11 | OK — gates PASS. V1 complète 11 features ; NSM défini strictement (commune 78/92 + type projet + description) ; HYP-04 photos Calameo = hypothèse BLOQUANTE Phase 1 ; naming = 1er nœud du chemin critique |
| 0.4 | @data-analyst | docs/analytics/kpi-framework.md, tracking-plan.md, dashboard-specs.md | EN COURS | À trancher : outil analytics event-compatible exempté CNIL (CF Web Analytics ne fait pas d'events custom) |
| 0.5 | CHECKPOINT fondateur | positionnement + nom + persona + NSM + scope V1 + contraintes légales | VALIDÉ 2026-06-11 | GO. Naming différé → nom de travail « Aquasystem » [PROVISOIRE, substituable] ; Umami self-hosted ; photos fallback esprit-piscine.fr + aqua-system.fr |

### Phase 0b — Agents custom — SAUTÉE (aucun agent custom recommandé par la Phase 0 ; site vitrine simple, @reviewer + G_PROOF suffisent)

### Phase 1 — Expérience — EN COURS — derniers agents : @ux ∥ @copywriter ∥ @product-manager(specs)
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 1.1 (∥) | @ux | docs/ux/user-flows.md, wireframes.md | LIVRÉ 2026-06-11 | OK — gates PASS. Nav plate 6 liens + CTA sticky ; formulaire 6 champs single-page ; 2 frictions H2 documentées avec solutions ; 4 gaps tracking remontés |
| 1.2 (∥) | @copywriter | docs/copy/brand-voice.md, ux-writing-guide.md | LIVRÉ 2026-06-11 | OK — gates PASS. Registre AD/Côté Maison ; tranches budget 50-80/80-150/150+ k€ ; [À CONFIRMER : délai réponse Nicolas] |
| 1.3 (∥) | @product-manager | docs/product/functional-specs.md | LIVRÉ 2026-06-11 | OK — gates PASS. 11 features, 1455 lignes ; payload POST /api/contact complet ; anti-spam honeypot + rate limit ; 5 hypothèses [À CONFIRMER fondateur] dont délai réponse « 2 j ouvrés » et service email Resend |
| 1.4 | @creative-strategy | docs/strategy/verbal-identity.md (territoire verbal) | LIVRÉ 2026-06-11 | OK — gates PASS. Lexique propriétaire, 2 métaphores fondatrices, entités SEO/GEO, indépendant du naming final |
| 1.4b | @data-analyst | tracking-plan v1.1 + dashboard-specs v1.1 (4 gaps UX) | LIVRÉ 2026-06-11 | OK — 4 gaps résolus : 3 requêtes Umami (R-01/02/03) + propriété has_cross_selling sur E-01 (sessionStorage, zéro PII) ; 9 events inchangés |
| 1.5 | @design | docs/design/art-direction.md, design-tokens.json, design-system.md, page-compositions.md (+ favicons specs) | LIVRÉ 2026-06-11 | OK — gates PASS (JSON parsable, 3 tiers, slots photo uniques). DA « Rive privée » : sand #F5F0E8, water #3A6675, forest #3B5240, gold #C4924A ; DM Serif Display + DM Sans ; dark mode différé V2 |
| 1.6 | CHECKPOINT specs | @reviewer : 11 critères cohérence + codabilité F-01→F-11 + contradictions + consolidation [À CONFIRMER] | LIVRÉ 2026-06-11 | **NO-GO pages / GO conditionnel infra**. 6/7 critères PASS ; FAIL critère 11 (wording en double). 13 findings : 5 P0 (URLs, formulaire, tranches budget, succès, nav — cause racine : specs non réconciliées), 5 P1, 3 P2 |
| 1.7 | @product-manager (corrective) | docs/product/arbitrations-p0-checkpoint.md + functional-specs v1.1 | LIVRÉ 2026-06-11 | OK — 5 P0 arbitrés : URLs longues ; chips optionnels + texte libre obligatoire (NSM sans type_projet) ; 4 tranches budget (50_80k/80_150k/150k_plus/prefere_discuter) ; page /contact/merci ; nav Réalisations 1er, Contact = CTA |
| 1.8 | @ux + @copywriter + @data-analyst (harmonisation ∥) | Edits wireframes/ux-writing/tracking v1.2 selon arbitrages | LIVRÉ 2026-06-11 | OK — 3 agents, Greps de vérification propres ; + wording /prescripteurs produit (P1-5) |
| 1.9 | @reviewer re-check ciblé | critère 11 + 5 P0 uniquement (+ scan page-compositions non relancé) | EN COURS | — |

### Phase 2 — Développement — DÉMARRÉE PARTIELLEMENT (GO conditionnel reviewer)
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 2.1 | @infrastructure (setup) | Socle Next.js statique + functions/api/contact squelette + CI + tokens→Tailwind + infrastructure.md + dev-decisions.md | LIVRÉ 2026-06-11 | OK — build PASS (tsc+lint+next build, re-vérifié par orchestrateur + hook pre-commit actif). Décisions : images.unoptimized (divergence F-11 assumée → AVIF/WebP pré-encodés, à signaler @qa G-PERF) ; rate limit KV ; i18n sans middleware. Validation champs formulaire balisée [BLOQUÉ P0-2/P0-3] |
### Checkpoint specs (entre 1 et 2) : @reviewer quick-check functional-specs.md — À VENIR
### Phase 2 — Développement : @infrastructure (setup CF Pages) → @fullstack (boucle visuelle 3 devices obligatoire, gate G26 baselines) → @ux review → @qa → @infrastructure finalisation — À VENIR
### Phase 3 — Contenu : @copywriter → @seo ∥ @geo (seo-strategy + keyword-map + geo-strategy distincts) — À VENIR
### Phase 4 — Acquisition : @growth ∥ @social + @sales-enablement (services B2C premium + prescripteurs B2B) + earned media — À VENIR
### Phase 5 — Conformité & dernier kilomètre : @legal finalisation + revue finale chirurgicale @qa 21 dimensions → @fullstack corrige P0+P1+P2 → re-check → GO/NO-GO lancement — À VENIR

## Journal des décisions
| Date | Décision | Pourquoi |
|---|---|---|
| 2026-06-11 | Scope validé en 20 Q/R fondateur, GO Phase 0 | cf. project-context.md « Décisions de scope » |
| 2026-06-11 | @legal lancé dès Phase 0 en parallèle de @creative-strategy | protocole orchestrator + situation d'acquisition en cours à cadrer tôt |
| 2026-06-11 | naming-proposals.md ajouté aux livrables 0.1 | la marque ombrelle n'a pas de nom — bloquant pour copy/design/SEO/domaine |

## Décisions @legal actées (à respecter par tous les agents aval)
- Éditeur unique du site : SARL AQUA SYSTEM ; directeur de publication : Nicolas Berg (à valider checkpoint).
- Formulation LTE avant acquisition : « en partenariat avec Les Terres Essentielles » — formulations sûres/proscrites dans legal-audit.md section B (OBLIGATOIRE pour @copywriter).
- Formulaire : base légale intérêt légitime, mention d'information prête dans rgpd-checklist.md section D.
- Analytics : Cloudflare Web Analytics (ou Plausible) — exempté CNIL, pas de bandeau cookie.
- Dépôt INPI du nom ombrelle (classes 35/37/44) à déclencher dès le choix du nom.

## Infos à demander au fondateur (checkpoint Phase 0)
- P0 : valider éditeur unique AQUA SYSTEM + formulations « partenariat ».
- P1 : assureur décennale + n° police ; n° TVA intracom ; greffe RCS ; DPA Cloudflare ; autorisations droit à l'image des photos du book Calameo.
- P2 : données SAS LTE post-acquisition (capital, greffe, TVA, représentant).

## P2 résiduels / anomalies
(aucun)
