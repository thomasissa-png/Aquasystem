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
| 1.1 (∥) | @ux | docs/ux/user-flows.md, wireframes.md | EN COURS | — |
| 1.2 (∥) | @copywriter | docs/copy/brand-voice.md, ux-writing-guide.md | EN COURS | — |
| 1.3 (∥) | @product-manager | docs/product/functional-specs.md | EN COURS | — |
| 1.4 | @creative-strategy | docs/strategy/verbal-identity.md (territoire verbal) | Dépend 1.2 | — |
| 1.5 | @design | docs/design/art-direction.md, design-system.md, design-tokens.json, page-compositions.md, favicons specs | Dépend 1.1 | — |
| 1.6 | CHECKPOINT specs | @reviewer quick-check functional-specs (« @fullstack peut-il coder sans question ? ») | Bloquant avant Phase 2 | — |
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
