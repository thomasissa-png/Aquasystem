# Lessons Learned — Site umbrella Aqua System × Les Terres Essentielles

> Format v2 — 11 colonnes obligatoires. Cap : 80 lignes. TTL learnings : 5 sessions OU 90 jours.
> Gate orchestrator : aucun agent lancé tant qu'un P0/P1 a statut propagation = non-propagé.

| # | Date | Sévérité | Learning | Contexte | Agent source | Règle dérivée | Cible propagation | Fichiers impactés | Statut correction | Statut propagation |
|---|------|----------|----------|----------|--------------|---------------|-------------------|-------------------|-------------------|--------------------|
| 1 | 2026-06-11 | P1 | functional-specs produites EN PARALLÈLE d'ux/copy/design → 5 contradictions P0 au checkpoint (URLs, formulaire, enums, succès, nav) | Phase 1, checkpoint specs NO-GO | @reviewer | Séquencer : specs détaillées APRÈS (ou réconciliées AVEC) wireframes+ux-writing, jamais en parallèle aveugle ; le checkpoint reviewer reste le filet | Orchestration future | docs/orchestration-plan.md (note séquencement Phase 1) | Corrigée (boucle 1 itération) | propagé (note dans orchestration-plan §Phase 1) |
| 2 | 2026-06-11 | P1 | Claim design « paires contrastes vérifiées AA » fausse 2 fois (BUG-A11Y-1 puis A11Y-3) — les violations ne se voient qu'en mesurant | Phases 2 et 5, axe-core | @qa | Exiger les RATIOS CHIFFRÉS par paire dès la 1re livraison design-tokens ; tests axe sur TOUTES les pages dès la Phase 2 (pas un échantillon) | @design, @qa | docs/design/design-system.md (tableau 20 ratios v1.2) ; tests/e2e/a11y-all-pages.spec.ts | Corrigée | propagé (ratios chiffrés + suite axe 13 pages en place) |
| 3 | 2026-06-11 | P2 | Sources photos publiques plafonnent à 1280px et aqua-system.fr bloque le scraping (403) — la qualité photo est le risque n°1 d'un site premium | Phase 2 tranche B | @fullstack | Demander les fichiers sources HD au client dès le checkpoint Phase 0 (pas en Phase 2) | Projets futurs | docs/project-synthesis.md (bloquants fondateur) | Mitigée (WebP 1280 acceptable) | propagé (listé bloquants fondateur) |
| 4 | 2026-06-11 | P2 | L'audit GEO a déterré des preuves majeures inconnues du brief (Trophée Or FPP 2024, EUSA 2025) — l'audit de visibilité externe enrichit le positionnement, pas seulement le référencement | Phase 3 | @geo | Lancer l'audit de visibilité externe (presse/annuaires) dès la Phase 0 stratégie quand la marque a un historique | Projets futurs avec marque existante | — (learning de méthode) | n/a | propagé (consigné ici, TTL 5 sessions) |
| 5 | 2026-06-12 | P1 | Les baselines fullPage écrasent le rendu : la composition above-the-fold mobile (hero accueil illisible) a traversé 3 itérations d'audit sans être vue — c'est le FONDATEUR qui l'a attrapée | Boucle d'audit post-launch | fondateur | Toute boucle visuelle DOIT inclure des captures VIEWPORT du premier écran (fold) par device, relues en taille réelle — le fullPage ne suffit jamais pour juger une composition | @fullstack, @design, @qa | scripts/screenshots.mjs (captures -fold ajoutées) ; baselines tests/screenshots/*-fold.png | En cours (D-20) | propagé (script + baselines fold) |

## Learnings cross-projets hérités (pré-propagés à l'installation, 2026-06-11)

Déjà intégrés dans les prompts de lancement et project-context.md — pas de propagation en attente :
zéro fausse promesse copy ; anti-témoignage fictif ; CTAs conviction-first ; anti-placeholder galerie ;
backoffice = même design system ; self-fetch 127.0.0.1 ; hooks avant returns ; SWR si fetch > 3s ;
seuil réécriture 10+ edits ; migrations idempotentes ; flux progressifs IA ; protocole migration modèle IA ;
parcours testé end-to-end ; bugs corrigés immédiatement ; testeurs calibrés valeur ; @sales-enablement Phase 4 ;
earned media Phase 4 ; pre-commit build check ; handoff actions infra ; favicons design→fullstack→seo.
