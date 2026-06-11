# Synthèse projet — Site umbrella Aqua System × Les Terres Essentielles

> Produit par l'orchestrateur en clôture de l'autopilot phases 0→5 — 2026-06-11.
> Reprise : « Lis project-context.md et docs/orchestration-plan.md, continue où on s'est arrêté. »

## Verdict

**GO technique de lancement** (re-check @qa 5.3 : score 20,5/21, 0 bug P0/P1/P2 résiduel, 102 tests unit + 41 E2E verts, 0 violation axe sur 13 pages, build 30 routes). **La mise en ligne attend uniquement des décisions et assets fondateur** (liste ci-dessous).

## Ce qui est livré

| Domaine | Livrables clés |
|---|---|
| Stratégie | brand-platform (Kapferer, vitrine conviction-first), 12 propositions de naming (shortlist Orvère/Thalweg/Rive & Clos — nom de travail « Aquasystem »), personas Alexandre + Camille, benchmark 5 concurrents, brief créatif, territoire verbal |
| Produit | discovery map, assumption map, vision, roadmap RICE, scope V1 11 features, functional-specs v1.2 (réconciliées après checkpoint reviewer — 5 P0 arbitrés), arbitrations-p0 |
| Légal | audit, RGPD (formulaire intérêt légitime, analytics exemptée sans bandeau), mentions légales bi-sociétés (bloc LTE post-acquisition balisé), privacy policy |
| Analytics | KPI framework (NSM 10 leads/mois), tracking plan v1.2 (10 events, zéro PII), dashboard specs, scoring lead [LEAD x/7] dans l'email interne |
| UX/Design | user flows (Nielsen 10), wireframes 9 écrans, ux-review post-implémentation, DA « Rive privée », tokens v1.2.0 (20 paires WCAG chiffrées), design system 16 composants, compositions |
| Copy | brand voice, ux-writing v1.2, site-copy 9 pages, FAQ GEO, communiqué FPP + media kit, séquence prescripteurs 5 touches, templates sociaux + légendes |
| **Code** | **Site complet : 30 routes statiques Next.js (export Cloudflare Pages), formulaire + Pages Function (validation, honeypot, rate limit KV, scoring, fallback no-JS), 14 photos réelles (manifeste sourcé), favicons/OG/JSON-LD (LocalBusiness, Person, FAQPage, award FPP), sitemap (drafts exclus), robots + llms.txt, i18n-ready, CI bloquante, hook pre-commit, 143 tests, 40+ baselines visuelles** |
| SEO/GEO | stratégie locale (GBP, NAP, 301 aqua-system.fr), keyword-map 28 mots-clés réels, metas finales, 12 claims sourcés (Trophée Or FPP 2024 vérifié), protocole de mesure IA mensuel |
| Acquisition/Vente | plan d'acquisition (prescripteurs n°1), earned media (communiqué FPP budget 0), stratégie sociale (IG carrousels, calendrier 4 sem.), playbook 11 étapes, 2 trames de proposition, 11 objections, qualification leads |
| Infra | runbook déploiement 11 étapes, monitoring, perf budgets (First Load 114 ko, LCP est. < 2,2 s), checklist fondateur A/B/C/D (infrastructure.md §8) |

## Décisions structurantes (rappel)

Marque ombrelle nouvelle (option a) ; nom de travail « Aquasystem » substituable ; vitrine conviction-first, CTA unique ; formulaire chips optionnels + texte libre (NSM = commune 78/92 + description ≥ 20 car.) ; Cloudflare Pages + Umami self-hosted ; éditeur unique SARL AQUA SYSTEM, « en partenariat avec » LTE jusqu'à l'acquisition ; fiches réalisations draft en noindex jusqu'à documentation.

## BLOQUANTS FONDATEUR avant mise en ligne (P0)

1. **Naming final** (1er nœud : domaine, INPI classes 35/37/44, emails, substitution SITE_NAME + llms.txt) — shortlist prête.
2. **Photos jardins** : /jardins-paysage n'a aucune photo réelle de jardin (2-3 photos de Nicolas, ou restructuration temporaire).
3. **Droit à l'image** : confirmation pour les 14 photos (sources esprit-piscine.fr documentées) + autorisations propriétaires.
4. **Mentions légales LTE** : finalisation post-acquisition (bloc balisé prêt).
5. **Comptes & secrets** : Cloudflare Pages (repo → build `npx next build`, output `out`), KV, Resend (SPF/DKIM), Umami, `NEXT_PUBLIC_SITE_URL` — runbook infrastructure.md §11.

## À CONFIRMER fondateur (P1 — n'empêchent pas le déploiement en preview)

Délai de réponse réel (REPLY_DELAY_TEXT + FAQ Q3 durée chantier) ; assureur décennale + n° police ; TVA intracom + greffe RCS ; données de la réalisation primée FPP + citation Nicolas (communiqué) ; seuil « hors budget » ; clients référents ; photos manquantes (spa, portrait Nicolas) ; documentation des 3 fiches réalisations featured (lève le noindex automatiquement) ; validation des verbatims [HYPOTHÈSE].

## Tests manuels pré-prod (en preview Cloudflare) : M-1 email Resend réel, M-2 rate limit KV, M-3 Lighthouse, M-5 no-JS réel, M-6 favicons, + Rich Results Test.

## Quick wins activables dès maintenant (sans le site)

Optimiser la fiche Google Business Aqua System · créer le profil Houzz · faire corriger « depuis 2005 » sur swimmy.fr · configurer les 7 Google Alerts · demander les avis aux 350 clients entretien.

## Prochaines étapes recommandées

1. Fondateur : trancher le naming + fournir les assets (photos, données FPP, délais).
2. @fullstack : substitution naming (Grep SITE_NAME/aquasystem.fr — règle commune n°11) + déploiement preview via runbook.
3. QA : tests manuels M-1→M-7 en preview → bascule prod + 301 aqua-system.fr à J+30 stabilité.
4. Activer : calendrier social S1, séquence prescripteurs, communiqué FPP (après données réelles).
5. V2 (conditions documentées) : version EN, pages communes (≥ 3 réalisations/commune), blog, témoignages réels, dark mode.
