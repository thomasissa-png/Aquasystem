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
| 1.9 | @reviewer re-check ciblé | critère 11 + 5 P0 uniquement (+ scan page-compositions non relancé) | LIVRÉ 2026-06-11 | **GO @fullstack** — 5 P0 LEVÉS, critère 11 LEVÉ (états critiques). 4 résiduels (1 P1 labels chips, 3 P2) → micro-correctifs @product-manager. Précédence wording : ux-writing v1.2. Boucle corrective close en 1 itération |

**Phase 1 : COMPLETE (2026-06-11) — checkpoint specs levé.**

### Phase 2 — Développement — DÉMARRÉE PARTIELLEMENT (GO conditionnel reviewer)
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 2.1 | @infrastructure (setup) | Socle Next.js statique + functions/api/contact squelette + CI + tokens→Tailwind + infrastructure.md + dev-decisions.md | LIVRÉ 2026-06-11 | OK — build PASS (tsc+lint+next build, re-vérifié par orchestrateur + hook pre-commit actif). Décisions : images.unoptimized (divergence F-11 assumée → AVIF/WebP pré-encodés, à signaler @qa G-PERF) ; rate limit KV ; i18n sans middleware. Validation champs formulaire balisée [BLOQUÉ P0-2/P0-3] |
| 2.2 (∥) | @fullstack tranche A | Composants UI + NavBar/Footer + ContactForm + /contact + /contact/merci + Function complète + boucle visuelle 2 pages | LIVRÉ 2026-06-11 | OK — build PASS re-vérifié orchestrateur ; 7 baselines ; E-01 avant redirect ; REPLY_DELAY_TEXT sans délai chiffré [À CONFIRMER fondateur] |
| 2.2b (∥) | @copywriter | docs/copy/site-copy.md (copy complet 9 pages, metas provisoires) | LIVRÉ 2026-06-11 | OK — 1013 lignes, AIDA conviction-first, template réalisation sans fictif, metas provisoires pour @seo |
| 2.2c (∥) | @product-manager | functional-specs v1.2 (4 micro-correctifs résiduels) | LIVRÉ 2026-06-11 | OK — 4 correctifs + Grep propre ; contrat dev 100% cohérent avec ux-writing v1.2 |
| 2.3 | @fullstack tranche B | Pages de contenu + portfolio + photos réelles + boucle visuelle complète | LIVRÉ 2026-06-11 | OK — build PASS re-vérifié (28 routes) ; 14 photos réelles esprit-piscine.fr (1280px max, aqua-system.fr 403) ; 42 WebP ; 33 baselines ; PhotoPlaceholders jardins/spa/portrait [photos Nicolas attendues] ; droit à l'image P0 fondateur |
| 2.4 | @ux (review post-implémentation) | docs/ux/ux-review.md (wireframes vs rendu réel, 33 baselines) | LIVRÉ 2026-06-11 | GO conditionnel — 7 PASS, 3 écarts mineurs ; 2 frictions H2 conception résolues ; P0-1 = /jardins-paysage sans photo réelle (décision fondateur, bloquant launch) |
| 2.4b | @fullstack (corrections UX) | P1-3 layout fiche, P2-1 lien 404, P2-3 min-h-11 + baselines | LIVRÉ 2026-06-11 | OK — 3 corrections, build PASS, baselines à jour |
| 2.5 | @qa | qa-strategy + matrice traçabilité + Vitest + Playwright E2E + CI activée | LIVRÉ 2026-06-11 | OK — 113 tests verts (89 unit + 24 E2E ×3 devices), coverage 97,8 % ; BUG-A11Y-1 P1 (contraste gold/proof) → @design+@fullstack ; INFO-1 harmonisé ; M-1→M-7 manuels pré-launch |
| 2.5b (∥) | @design (correctif A11Y) | design-tokens v1.1 contrastes recalculés | LIVRÉ 2026-06-11 | OK — gold.800 texte 3,92:1, proof-label 7,39:1, footer-legal 6,87:1, ratios documentés |
| 2.5c | @fullstack (application tokens) | Vérif rendu + tests axe + baselines | LIVRÉ 2026-06-11 | OK — BUG-A11Y-1 RÉSOLU (0 violation contraste, 5 pages). Révélé BUG-A11Y-2 préexistant (target-size : inputs 21px, liens footer) → 2.7 |
| 2.6 (∥) | @infrastructure (finalisation) | Perf budgets réels, _headers, monitoring, runbook déploiement, checklist fondateur | LIVRÉ 2026-06-11 | OK — PRÊT au déploiement côté code. First Load max 114 ko PASS ; cache-control ajoutés ; runbook 11 étapes + rollback ; reco P1 hero mobile srcset → @fullstack ; bloquants restants = fondateur (photos jardins, naming, comptes/secrets) |
| 2.7 | @fullstack (A11Y-2 + perf hero) | Espacement liens footer/nav + 4 tests axe verts + picture/srcset hero mobile 800w | LIVRÉ 2026-06-11 | OK — 28/28 E2E + 89/89 unit verts, 0 fixme ; hero mobile 124 ko (< 130) ; note : inputs étaient déjà 44px (FIXME obsolète), liens renforcés WCAG 2.5.8 |

**Phase 2 : COMPLETE (2026-06-11) — build vert, 117 tests verts, 0 violation axe, PRÊT au déploiement côté code.**

### Phase 3 — Contenu/SEO/GEO — EN COURS — @seo ∥ @geo
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 3.1 (∥) | @seo | docs/seo/seo-strategy.md (SEO local 78/92), keyword-map.md (≥20 mots-clés réels), metadata-templates.md | LIVRÉ 2026-06-11 | OK — 28 mots-clés/8 clusters (volumes qualitatifs sourcés SERP) ; GBP 2 fiches (pas d'ombrelle avant naming) ; pages géo reportées V2 (anti-thin-content, seuil 3 réalisations/commune) ; mapping 301 aqua-system.fr (10 URLs, bascule à J+30 stabilité) ; espace libre confirmé « pisciniste paysagiste yvelines » |
| 3.2b (∥) | @copywriter | docs/copy/faq-geo-copy.md (9 Q/R + 5 avant/après + distinctions FPP/EUSA dans site-copy) | EN COURS | — |
| 3.2 (∥) | @geo | docs/geo/geo-strategy.md (≥10 claims sourcés, llms.txt, audit visibilité IA), content-restructuring.md | LIVRÉ 2026-06-11 | OK — 12 claims 3/3 dont **Trophée Or FPP 2024 (vérifié par orchestrateur)** + EUSA Bronze 2025 ; désinformation swimmy.fr documentée ; FAQ limitées à /notre-approche + /prescripteurs (registre préservé) ; protocole mensuel < 1h |
| 3.2b | @copywriter | docs/copy/faq-geo-copy.md | LIVRÉ 2026-06-11 | OK — 9 Q/R + 5 avant/après ; arbitrage B.5 tranché par orchestrateur (méta enrichie FPP) |
| 3.3 | @fullstack (implémentation SEO/GEO) | sitemap, robots.txt, llms.txt, JSON-LD enrichis, metas finales, FAQ intégrées | LIVRÉ 2026-06-11 | OK — build PASS 30 routes, 117 tests verts ; sitemap 24 URLs date fixe ; FAQ details/summary 0 violation axe ; coordonnées GPS vérifiées ; B.5 appliqué par orchestrateur ; Q3 FAQ en attente durée chantier fondateur |

**Phase 3 : COMPLETE (2026-06-11).**

### Phase 4 — Acquisition — EN COURS — @growth ∥ @social ∥ @sales-enablement
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 4.1 (∥) | @growth | acquisition-plan.md + earned-media-plan.md | LIVRÉ 2026-06-11 | OK — prescripteurs canal n°1 (séquence 5 étapes), IG+Houzz, avis 350 clients ; indicateur = taux leads qualifiés > 70% (pas le CAC) ; communiqué FPP budget 0 ; 4 quick wins fondateur |
| 4.2 (∥) | @social | social-strategy.md | LIVRÉ 2026-06-11 | OK — IG carrousels dominants (saves), LinkedIn « je » Nicolas, FB repurposing 0 min, TikTok écarté ; pilier différenciant « regard de l'expert » local ; transition naming documentée |
| 4.3 (∥) | @sales-enablement | playbook, proposal-template ×2, objection-handling (11), lead-qualification | LIVRÉ 2026-06-11 | OK — pipeline 11 étapes Nicolas solo, preuves toutes réelles, scoring mappé champs réels formulaire ; [À CONFIRMER : décennale, SLA, seuil budget, clients référents] |
| 4.4 (∥) | @copywriter (consolidé) | press-release-fpp, prescripteurs-sequence, content-templates + post-register, révision gabarits sales | LIVRÉ 2026-06-11 | OK — communiqué publiable hors blocs [À OBTENIR] ; 5 touches prescripteurs avec opt-out ; 8 légendes finales ; Grep propre |
| 4.5 (∥) | @fullstack | Scoring lead dans email interne Function (specs sales §7) | LIVRÉ 2026-06-11 | OK — [LEAD x/7 — segment] email interne uniquement, étanchéité PII testée, 99 tests verts, contrat public intact |

**Phase 4 : COMPLETE (2026-06-11).**

### Phase 5 — Dernier kilomètre — EN COURS — @qa revue finale
| Ordre | Agent | Livrables attendus | Statut | Verdict |
|---|---|---|---|---|
| 5.1 | @qa | docs/qa/page-review-report.md (21 dims × toutes pages + a11y + cross-browser + cohérence) | EN COURS | — |
| 5.2 | @fullstack | Correction de TOUS les bugs P0+P1+P2 | Dépend 5.1 | — |
| 5.3 | @qa re-check + @ux/@design validation | Pages ≥ 19/21, parcours et design system respectés | Dépend 5.2 | — |
| 5.4 | Checklist jour de lancement + GO/NO-GO fondateur | Consolidation [À CONFIRMER] + checkpoint final | Dépend 5.3 | — |
| 5.5 | Synthèse finale | docs/project-synthesis.md + lessons-learned + CHANGELOG | Dépend 5.4 | — |
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
