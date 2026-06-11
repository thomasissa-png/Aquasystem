# Vision Produit — Site vitrine [NOM OMBRELLE]
## Aqua System × Les Terres Essentielles

> Ce document définit le "pourquoi" du produit numérique. Il guide toutes les décisions de scope, de priorisation et de design.
> Dernière mise à jour : 2026-06-11 | Agent : @product-manager

---

## 1. Vision produit (3-5 phrases)

Pour Nicolas Berg, le site vitrine [NOM OMBRELLE] est la carte de visite numérique que ses trente ans d'expertise méritent — un outil qui existe 24h/24 et transforme la réputation construite localement en leads entrants qualifiés, sans qu'il ait à en parler lui-même.

Pour Alexandre, ce site est la preuve qu'il cherche avant d'appeler : la confirmation que quelqu'un comprend ce qu'une belle propriété exige, que ce quelqu'un a déjà réalisé des projets comparables à deux kilomètres de chez lui, et qu'il peut lui faire confiance pour porter sa vision de bout en bout.

En résolvant le problème de la fragmentation (coordonner pisciniste + paysagiste soi-même) et celui de la preuve (comment savoir que ce sera bien fait ?), le site crée les conditions d'un premier contact qui est déjà une conversation, pas une demande de prix.

À six mois, le succès se mesure à dix conversations qualifiées par mois — des propriétaires et des architectes qui ont vu les réalisations, compris l'intégration eau + jardin, et décidé d'eux-mêmes qu'il était temps de parler.

---

## 2. Problème résolu pour chaque acteur

### Pour Alexandre (propriétaire patrimonial 78/92)

| Avant le site | Après le site |
|---------------|---------------|
| Il cherche sur Google et tombe sur des sites génériques ou datés | Il trouve en première page un site qui parle le même langage que lui |
| Il ne sait pas si l'entreprise est sérieuse sans appeler | Il voit les réalisations locales, les preuves factuelles, le process — avant d'appeler |
| Il doit trouver ET coordonner pisciniste ET paysagiste | Il voit que les deux expertises sont réunies — une seule conversation à avoir |
| Le formulaire de contact ressemble à un formulaire de devis bas de gamme | Il décrit son projet en quelques lignes, comme il le ferait à un interlocuteur de confiance |

### Pour Nicolas Berg (fondateur)

| Avant le site | Après le site |
|---------------|---------------|
| Le site aqua-system.fr date et nuit à la perception premium | Le site exprime le niveau réel des prestations |
| Les Terres Essentielles n'ont aucune présence web | Les deux maisons sont visibles, complémentaires, crédibles |
| Les leads entrants sont rares et peu qualifiés | 10 leads qualifiés/mois avec description projet et zone géographique |
| Les architectes prescripteurs n'ont pas d'outil de recommandation | Une page dédiée qu'ils peuvent partager à leurs clients |

### Pour Camille (architecte prescripteur)

| Avant le site | Après le site |
|---------------|---------------|
| Pas de page professionnelle à montrer à ses clients | Une section dédiée avec certifications et portfolio vérifiable |
| Risque de recommander sans preuve tangible | Références 78/92, protocole de collaboration visible, interlocuteur nommé |
| Elle doit expliquer qui est la marque à chaque recommandation | Elle envoie un lien — le site explique mieux qu'elle ne pourrait le faire |

---

## 3. Principes produit non négociables (décisions de scope)

Ces principes s'appliquent à chaque feature, chaque décision UX, chaque ligne de copy. Toute proposition qui les contredit doit être rejetée ou justifiée devant le fondateur.

**P1 — Conviction-first, jamais conversion-first**
Le site ne cherche pas à "capturer" un lead. Il cherche à mériter la confiance d'Alexandre. Un CTA agressif est une perte de lead, pas un gain.

**P2 — Photos réelles ou rien**
La promesse "ancrage local, réalisations réelles" ne peut être tenue qu'avec des photos authentiques. Une image de banque est un mensonge visible pour la cible.

**P3 — Espace prescripteurs obligatoire**
La section Camille n'est pas optionnelle. Elle représente le canal B2B à plus fort levier — chaque prescripteur peut multiplier les leads par 3-5 au fil du temps.

**P4 — Formulations légales non négociables**
"En partenariat avec Les Terres Essentielles" tant que l'acquisition n'est pas actée. Jamais "nos deux sociétés". Jamais "société créée il y a 30 ans".

**P5 — V1 complète, pas MVP**
Le contexte IA permet une V1 complète. Une feature retirée l'est uniquement parce qu'elle n'apporte pas de valeur persona — jamais parce qu'elle est "trop complexe à développer".

---

## 4. Trois risques produit majeurs et leur mitigation

---

### RISQUE 1 — Contenu photo insuffisant (criticité : TRÈS ÉLEVÉE)

**Description** : Le book Calameo et le site aqua-system.fr sont les seules sources photo disponibles. Si les fichiers sources sont basse résolution, si les droits à l'image ne sont pas clairs, ou si la qualité perçue est insuffisante pour un positionnement premium, le site ne peut pas être lancé sans shooting dédié.

**Impact si non mitigé** : Portfolio visuellement faible → Alexandre quitte le site en 10 secondes → KPI North Star impossible à atteindre. C'est la condition nécessaire à toute la promesse de marque.

**Mitigation** :
1. Action immédiate (avant Phase 1) : Nicolas Berg fournit les fichiers sources haute résolution + liste des propriétaires dont les biens sont photographiés (droit à l'image).
2. Évaluation de la qualité par @design avant tout travail de maquette.
3. Plan B documenté : si < 10 photos exploitables, déclencher un shooting ciblé sur 2-3 réalisations récentes (1 journée, budget à définir avec Nicolas).
4. En aucun cas : photos de banque d'images génériques (interdit absolu — creative-brief.md section 8).

**Responsable** : Nicolas Berg (accès) + @design (évaluation) — checkpoint Phase 0.

---

### RISQUE 2 — Naming non tranché bloque le chemin critique (criticité : ÉLEVÉE)

**Description** : Le nom de la marque ombrelle n'est pas encore choisi (shortlist : Orvère / Thalweg / Rive & Clos). Sans nom validé, le design d'identité visuelle est bloqué. Sans identité visuelle, le développement front ne peut pas commencer. Sans développement, pas de lancement.

**Impact si non mitigé** : Chaque semaine de décision reportée = une semaine de retard sur le chemin critique entier.

**Mitigation** :
1. Présentation de la shortlist au fondateur au checkpoint Phase 0 (avec naming-proposals.md produit par @creative-strategy).
2. Vérification disponibilité domaines .fr et dépôt INPI (classes 35/37/44) dès le choix fait.
3. Fallback : si le fondateur ne tranche pas au checkpoint → @product-manager présente un scénario A/B limité à 2 noms pour forcer la décision.

**Responsable** : Nicolas Berg (décision) + session principale (coordination) — bloquant Phase 0.

---

### RISQUE 3 — Acquisition LTE non actée retarde la mise en ligne publique (criticité : MOYENNE)

**Description** : Les mentions légales finales ne peuvent pas mentionner Les Terres Essentielles comme co-propriété tant que Patrick Rouzeval est officiellement président (Pappers, 2026-06-11). Le site peut être conçu et développé, mais pas mis en ligne publiquement avec les mentions définitives avant l'acquisition.

**Impact si non mitigé** : Le site est prêt mais bloqué à la phase de publication. Ou pire : mis en ligne avec des mentions légales inexactes → risque LCEN + RGPD.

**Mitigation** :
1. Toutes les pages et le copy sont écrits avec les formulations validées par @legal ("en partenariat avec Les Terres Essentielles").
2. Les mentions légales definitives sont préparées en deux versions : avant acquisition (SARL AQUA SYSTEM éditeur unique) et après acquisition (à compléter). Voir docs/legal/mentions-legales-draft.md.
3. Pas de mise en ligne publique avant la validation du fondateur sur ce point précis.
4. Timeline : l'acquisition est "en cours" au 2026-06-11 — aucun délai communiqué. Ce risque est structurel, pas technique.

**Responsable** : Nicolas Berg (acquisition) + @legal (suivi) — point de contrôle à chaque checkpoint.

---

## 5. Définition du succès V1 (binaire)

| Critère | Mesure | Seuil GO |
|---------|--------|----------|
| KPI North Star | Leads qualifiés/mois | ≥ 10 à M+3 |
| Qualité des leads | % leads avec commune 78/92 + description non vide | ≥ 80% |
| Leads prescripteurs | Formulaires avec type "prescripteur" | ≥ 2/mois à M+6 |
| Performance | LCP moyen pages principales | < 2,5s |
| SEO local | Positions sur requêtes cibles 78/92 | Top 5 sur ≥ 3 requêtes à M+3 |
| Formulaire | Taux de complétion | > 70% des démarrages |

---

*Fichier produit par @product-manager — 2026-06-11*
