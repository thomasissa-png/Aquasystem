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

### Phase 0 — Fondations — EN COURS — dernier agent : (lancement)
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 0.1 (∥ 0.2) | @creative-strategy | docs/strategy/brand-platform.md, personas.md, competitive-benchmark.md, creative-brief.md, naming-proposals.md | À lancer | — |
| 0.2 (∥ 0.1) | @legal | docs/legal/legal-audit.md, rgpd-checklist.md, mentions-legales-draft.md, privacy-policy.md | À lancer | — |
| 0.3 | @product-manager | docs/product/product-vision.md, roadmap.md, backlog.md, v1-scope.md (V1 complète, pas MVP) | Dépend 0.1 | — |
| 0.4 | @data-analyst | docs/analytics/kpi-framework.md, tracking-plan.md, dashboard-specs.md | Dépend 0.3 | — |
| 0.5 | CHECKPOINT fondateur | positionnement + nom + persona + NSM + scope V1 + contraintes légales | Bloquant | — |

### Phase 0b — Agents custom — CONDITIONNELLE (si recommandés en 0.1)
### Phase 1 — Expérience : @ux → @design ; @copywriter ∥ @ux dès brand-platform.md — À VENIR
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

## P2 résiduels / anomalies
(aucun)
