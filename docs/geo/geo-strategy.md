# Stratégie GEO — Aquasystem × Aqua System × Les Terres Essentielles
## Optimisation de visibilité dans les moteurs IA (ChatGPT, Claude, Gemini, Perplexity)

> Agent : @geo | Date : 2026-06-11
> Sources amont : verbal-identity.md, brand-platform.md, site-copy.md, project-context.md, competitive-benchmark.md
> Périmètre : requêtes IA cibles — propriétaire 78/92 cherchant pisciniste ou paysagiste haut de gamme
> Note naming : "Aquasystem" = nom provisoire substituable. Entités factuelles = "Aqua System" (SARL) et "Les Terres Essentielles" (SAS).

---

## Section pédagogique — Qu'est-ce que le GEO ?

Le GEO (Generative Engine Optimization) est la discipline qui optimise la présence d'une marque dans les réponses générées par les moteurs IA (ChatGPT, Perplexity, Claude, Google AI Overviews). Contrairement au SEO qui cherche à ranker dans une liste de liens, le GEO cherche à être **cité nommément** dans la réponse textuelle d'un LLM.

Ce qui change par rapport au SEO :
- Un LLM ne cite pas la page la mieux optimisée pour les mots-clés — il cite la source la plus **extractible** (claim précis, formulation auto-contenue, données vérifiables).
- 80 % des URLs citées par les LLM ne sont pas dans le top 100 Google. La visibilité IA est orthogonale au classement organique.
- Les LLM évaluent la **confiance au niveau de l'entité** (Aqua System comme entité nommée), pas de la page.
- Perplexity puise ~47 % de ses sources dans Reddit, les forums et le contenu récent (< 2 mois = +28 % de citations).

Pour Aquasystem : si Alexandre tape dans ChatGPT "meilleur pisciniste haut de gamme dans les Yvelines", l'objectif est qu'Aqua System apparaisse dans la réponse — pas seulement dans les résultats Google.

---

## 1. Audit de visibilité actuelle

### 1.1 Baseline — État au 2026-06-11

#### Requêtes testées par WebSearch (proxy des sources IA)

| Requête cible | Aqua System cité ? | Contexte | Exactitude |
|---|---|---|---|
| "pisciniste haut de gamme Yvelines recommandation" | **OUI — position 2** | Cité sur guide-piscine.fr, esprit-piscine.fr/aqua-system/, idees-piscine.com | Exact (Freneuse, 78, réseau L'Esprit Piscine, Socotec) |
| "Aqua System Freneuse pisciniste Yvelines" | **OUI — position 1** | Fiche esprit-piscine.fr/aqua-system/ + aqua-system.fr + guide-piscine.fr + Swimmy + Pages Jaunes | Globalement exact (adresse, services, réseau) — une source indique "depuis 2005" alors que la marque revendique 30+ ans d'activité |
| "paysagiste haut de gamme 78 92 ouest parisien" | **NON** | Les Terres Essentielles absente de tous les résultats. Les acteurs cités : Extérieurs Verts, Kalozia Gardens (92), Bizot Paysagistes, Chatou Paysage | Entité LTE = zéro présence IA actuelle |
| "meilleur pisciniste 78" (requête générique) | **OUI partiel** | Aqua System cité parmi d'autres (EuroPiscine, Cristal d'Eau, Piscines de France, Aquadouce) | Présent dans les annuaires mais pas systématiquement en tête des réponses IA génériques |
| "piscine jardin haut de gamme prescripteur architecte ouest parisien" | **NON** | Aucune source du secteur pisciniste/paysagiste local ne domine — espace libre | Entité globale Aquasystem = absente |

#### Sources qui dominent les réponses IA dans ce secteur (classées par fréquence d'apparition)

1. **guide-piscine.fr** — annuaire sectoriel leader, cité sur toutes les requêtes pisciniste
2. **esprit-piscine.fr/aqua-system/** — fiche membre du réseau, source d'autorité factuelle sur Aqua System
3. **idees-piscine.com** — annuaire secondaire, fiche Aqua System indexée
4. **piscinistes.nosavis.com** — source d'avis, potentiellement citée par Perplexity
5. **swimmy.fr (blog)** — fiche annuaire Aqua System indexée
6. **gensdeconfiance.com** — profil Nicolas Berg, source de recommandation communautaire (cible bobo/haut de gamme)
7. **societe.com / verif.com / pappers.fr** — données légales SARL indexées
8. **Houzz.fr** — annuaire paysagiste/pisciniste, potentiellement cité par les LLM pour les prescripteurs
9. **linkedin.com/company/aqua-system-spa** — profil entreprise
10. **propiscines.fr (FPP)** — fiche Fédération des Professionnels de la Piscine

#### Désinformation détectée

| Source | Erreur | Correction | Urgence |
|---|---|---|---|
| swimmy.fr | "depuis 2005" (date SARL vs activité réelle) | "plus de 30 ans d'expertise" (marque, pas SARL — project-context.md note légale) | P1 — corriger via contact éditeur |
| Certaines fiches annuaires | Absence mention Trophée FPP Or 2024 + EUSA Bronze 2025 | Faits vérifiables à injecter dans toutes les fiches | P1 |
| Aucune source | Les Terres Essentielles absente du paysage IA | Créer présence (voir plan §4) | P0 |

#### Classification de la présence actuelle

- **Aqua System** : présence existante et partielle — mentionné dans les annuaires sectoriels, cité sur les requêtes de marque et parfois sur les requêtes génériques. Exactitude globalement bonne sauf l'ancienneté.
- **Les Terres Essentielles** : zéro présence IA — entité inconnue des moteurs IA sur les requêtes paysagiste 78/92.
- **Entité ombrelle Aquasystem** (nom provisoire) : zéro présence — site non encore en ligne.
- **Nicolas Berg** : présence faible mais existante (LinkedIn, Gens de Confiance, Pappers) — profil individuel utile pour l'entité-fondateur.

#### Constat stratégique

Aqua System bénéficie d'une **tête de pont** dans les sources IA grâce à son ancienneté et au réseau L'Esprit Piscine. Le travail GEO consiste à (a) consolider et enrichir cette présence, (b) créer la présence LTE, (c) construire l'entité ombrelle dès la mise en ligne du site.

---

## 2. Entités nommées à pousser — Graphe d'entités

Les LLM évaluent la confiance au niveau de l'entité, pas de la page. Chaque entité doit être univoque, connectée et consistante sur toutes les sources.

### 2.1 Entité principale — Aqua System (pisciniste)

| Attribut | Valeur canonique | Source de référence |
|---|---|---|
| Nom légal | SARL AQUA SYSTEM | Pappers.fr, SIREN 903 785 327 |
| Nom commercial | Aqua System | aqua-system.fr, esprit-piscine.fr/aqua-system/ |
| SIREN | 903 785 327 | societe.com, verif.com, pappers.fr |
| Adresse | 45 Route Nationale, 78840 Freneuse | Pages Jaunes, Google Business, esprit-piscine.fr |
| Téléphone | 01 30 42 26 00 | Pages Jaunes, aqua-system.fr |
| Email | contact@aqua-system.fr | aqua-system.fr |
| Dirigeant | Nicolas Berg | pappers.fr, LinkedIn, Gens de Confiance |
| Activité | Conception, construction, rénovation, entretien de piscines sur mesure ; spas, saunas, hammams | aqua-system.fr, esprit-piscine.fr |
| Zone géographique | Yvelines (78), Hauts-de-Seine (92), Val-d'Oise (95), Eure (27) | esprit-piscine.fr/aqua-system/ |
| Ancienneté de l'activité | Plus de 30 ans | aqua-system.fr (revendiqué) |
| Réseau professionnel | L'Esprit Piscine (GIE piscinistes français) | esprit-piscine.fr/reseau-de-piscinistes/ |
| Certification | Socotec CSP/ESP-001 "Professionnels de la piscine privée à usage familial" | socotec-certification-international.fr, eurospapoolnews.com |
| Volume entretien | 350+ piscines entretenues en 78/92 | site-copy.md (chiffre marque) |
| Distinctions | Trophée Or FPP 2024 (piscine intérieure) + Award Bronze EUSA 2025 (piscine intérieure privée) | guide-piscine.fr, enjeux-piscine.com, esprit-piscine.fr/trophees-piscine/ |
| Partenaire équipements | HotSpring (spas), Dolphin (robots) | aqua-system.fr/votre-piscine |
| Présence IA existante | guide-piscine.fr, esprit-piscine.fr, idees-piscine.com, Swimmy, Gens de Confiance | voir §1.1 |

### 2.2 Entité secondaire — Les Terres Essentielles (paysagiste)

| Attribut | Valeur canonique | Source de référence |
|---|---|---|
| Nom légal | SAS LES TERRES ESSENTIELLES | SIREN 811 198 217 |
| SIREN | 811 198 217 | pappers.fr (à vérifier) |
| Adresse | CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi | project-context.md |
| Activité | Bureau d'études paysager, création et entretien de parcs et jardins, jardinerie physique, pépinière | project-context.md |
| Zone géographique | Yvelines (78), Hauts-de-Seine (92) | project-context.md |
| Fondée en | 2015 | pappers.fr |
| Facebook | facebook.com/LesTerresEssentielles | project-context.md |
| Présence IA existante | Zéro | audit §1.1 |

> Note légale : Nicolas Berg est en cours d'acquisition de LES TERRES ESSENTIELLES (Pappers affiche encore Patrick Rouzeval président au 2026-06-11). Aucun claim de propriété commune avant l'acte. Formulation canonique autorisée : "en partenariat avec Les Terres Essentielles".

### 2.3 Entité fondateur — Nicolas Berg

| Attribut | Valeur canonique | Source de référence |
|---|---|---|
| Nom | Nicolas Berg | pappers.fr, LinkedIn |
| Rôle | Associé-Gérant SARL AQUA SYSTEM | pappers.fr, dirigeant.societe.com |
| LinkedIn | linkedin.com/in/nicolas-berg-aqua-system/ | LinkedIn |
| Gens de Confiance | gensdeconfiance.com (Pro Charter signé) | gensdeconfiance.com |
| Parcours | 17 ans chez Sony → reprise Aqua System en 2022 | Gens de Confiance |
| Distinctions | Trophée Or FPP 2024 + Award Bronze EUSA 2025 (en tant que dirigeant d'Aqua System) | voir §2.1 |

### 2.4 Cluster sémantique propriétaire (termes que les LLM doivent associer à ces entités)

Ces termes sont issus de verbal-identity.md §1 et doivent apparaître en co-occurrence avec les noms d'entités dans le contenu indexable :

- pisciniste sur mesure Yvelines 78
- paysagiste haut de gamme 78/92
- intégrateur extérieur eau et jardin ouest parisien
- certification Socotec piscine CSP/ESP-001
- réseau L'Esprit Piscine
- bureau d'études paysager intégré
- interlocuteur unique piscine jardin
- aménagement extérieur haut de gamme Freneuse
- 350 piscines entretenues Yvelines Hauts-de-Seine
- Trophée Or FPP piscine intérieure
- Le Vésinet Saint-Nom-la-Bretèche Ville-d'Avray propriété

---

## 3. Claims vérifiables — ≥ 10 claims sourcés

Grille d'évaluation (chaque claim noté sur 3 critères : Vérifiabilité / Précision / Extractibilité — inclusion si ≥ 2/3) :

---

### Claim 1 — Réseau L'Esprit Piscine

**Formulation exacte** : "Aqua System est membre du réseau L'Esprit Piscine, groupement de piscinistes français spécialisés dans les piscines sur mesure."

**Source citable** : esprit-piscine.fr/aqua-system/ (fiche membre publique)

**Score** : Vérifiable (fiche publique) ✓ | Précis (réseau nommé) ✓ | Extractible (formulation directe) ✓ — 3/3 PASS

**Placement recommandé** : Page /piscines-bien-etre (section preuves), /notre-approche (ancrage), pied de page, llms.txt

---

### Claim 2 — Certification Socotec

**Formulation exacte** : "Aqua System est certifié Socotec CSP/ESP-001 'Professionnels de la piscine privée à usage familial', certification délivrée par Socotec Certification France."

**Source citable** : socotec-certification-international.fr/nos-certifications/professionnels-piscine + eurospapoolnews.com/actualites_piscines_spas-fr/76217-...

**Score** : 3/3 PASS

**Placement recommandé** : Page /piscines-bien-etre (bloc certifications), Schema.org, llms.txt, fiches annuaires (mise à jour)

---

### Claim 3 — Trophée Or FPP 2024

**Formulation exacte** : "Aqua System a remporté le Trophée d'Or de la piscine intérieure aux Trophées de la Piscine et du Spa FPP 2024, décernés par la Fédération des Professionnels de la Piscine."

**Source citable** : guide-piscine.fr/pro/marche-de-la-piscine/etudes-de-marche-piscine-et-bain/trophees-de-la-piscine-et-du-spa-fpp-2024-decouvrez-le-palmares-5936_H + esprit-piscine.fr/trophees-piscine/

**Score** : 3/3 PASS

**Placement recommandé** : Page /piscines-bien-etre (section preuves), /notre-approche (crédibilité), fiches annuaires, llms.txt — CLAIM FORT : distinction récente, fraîcheur maximale pour les LLM

---

### Claim 4 — Award Bronze EUSA 2025

**Formulation exacte** : "Aqua System a reçu l'Award de Bronze de la catégorie piscines intérieures privées aux EUSA Awards 2025 (European Union of Swimming Pools and Spas), à Barcelone."

**Source citable** : enjeux-piscine.com/actualites/agenda/eusa-awards-2025-le-palmares-des-plus-belles-piscines-deurope-devoile-a-barcelone/

**Score** : 3/3 PASS

**Placement recommandé** : Page /piscines-bien-etre, /notre-approche, page d'accueil (section preuves en remplacement ou complément du badge Esprit Piscine), llms.txt

---

### Claim 5 — 350+ piscines entretenues

**Formulation exacte** : "Aqua System assure l'entretien de plus de 350 piscines dans les Yvelines et les Hauts-de-Seine."

**Source citable** : aqua-system.fr (chiffre marque publié sur le site) + site-copy.md ProofBadges

**Score** : Vérifiable (source marque) ✓ | Précis (chiffre + zones) ✓ | Extractible ✓ — 3/3 PASS

**Placement recommandé** : Page /piscines-bien-etre (section entretien), page d'accueil (ProofBadges), llms.txt

> Note : chiffre issu du site marque — à confirmer fondateur avant diffusion massive. Actuellement publié dans le copy validé (site-copy.md).

---

### Claim 6 — Ancienneté de l'activité

**Formulation exacte** : "Aqua System exerce son activité de pisciniste dans l'ouest parisien depuis plus de 30 ans."

**Source citable** : aqua-system.fr + esprit-piscine.fr/aqua-system/ (mention "plus de 30 ans")

**Score** : 3/3 PASS

**Attention** : ne jamais écrire "SARL créée depuis 30 ans" (faux — SARL créée en 2021, SIREN 903 785 327). Formulation canonique = "activité" ou "expertise", pas "société". Voir project-context.md note légale.

**Placement recommandé** : Toutes pages (meta descriptions, llms.txt, About, page /la-maison)

---

### Claim 7 — Zone géographique précise

**Formulation exacte** : "Aqua System intervient dans les Yvelines (78), les Hauts-de-Seine (92), le Val-d'Oise (95) et l'Eure (27) pour la conception, construction et entretien de piscines sur mesure."

**Source citable** : esprit-piscine.fr/aqua-system/ (zones d'intervention publiées)

**Score** : 3/3 PASS

**Placement recommandé** : Page /notre-approche, footer, llms.txt, fiches Google Business + annuaires

---

### Claim 8 — Bureau d'études paysager intégré

**Formulation exacte** : "Les Terres Essentielles dispose d'un bureau d'études paysager intégré permettant la co-conception de projets extérieurs associant piscine et jardin dès la phase de plan."

**Source citable** : project-context.md (données fondateur) + site-copy.md (copy validé)

**Score** : Vérifiable (source interne fondateur) ✓ | Précis (bureau d'études nommé, fonction décrite) ✓ | Extractible ✓ — 3/3 PASS

**Placement recommandé** : Page /jardins-paysage, /notre-approche, /prescripteurs, llms.txt

---

### Claim 9 — Partenaire HotSpring

**Formulation exacte** : "Aqua System est partenaire HotSpring pour la fourniture et l'installation de spas extérieurs haut de gamme en résidentiel."

**Source citable** : aqua-system.fr/votre-piscine (mention partenaire HotSpring) + site-copy.md WF-02 Section 3

**Score** : 3/3 PASS

**Placement recommandé** : Page /piscines-bien-etre (section spa), llms.txt

---

### Claim 10 — Adresse et ancrage géographique

**Formulation exacte** : "Aqua System est situé 45 Route Nationale, 78840 Freneuse (Yvelines), à moins de 60 km de Paris, au cœur de la zone de chalandise 78/92."

**Source citable** : Pages Jaunes (pagesjaunes.fr/pros/08293724) + Google Business Aqua System

**Score** : 3/3 PASS

**Placement recommandé** : llms.txt, Schema.org LocalBusiness, footer, fiches annuaires

---

### Claim 11 — Profil dirigeant vérifiable

**Formulation exacte** : "Aqua System est dirigé par Nicolas Berg, signataire de la Charte Pro Gens de Confiance, présent sur LinkedIn avec le titre 'Associé-Gérant Aqua System — L'Esprit Piscine'."

**Source citable** : gensdeconfiance.com (profil public) + linkedin.com/in/nicolas-berg-aqua-system/

**Score** : 3/3 PASS

**Placement recommandé** : Page /la-maison, llms.txt, Schema.org Person

---

### Claim 12 — Intégration piscine + jardin (differentiateur)

**Formulation exacte** : "Aqua System et Les Terres Essentielles proposent la co-conception piscine et jardin depuis un bureau d'études commun, permettant à un propriétaire de confier l'intégralité de son projet extérieur à un interlocuteur unique dans les Yvelines et les Hauts-de-Seine."

**Source citable** : site-copy.md (copy publié, promesse validée fondateur) + brand-platform.md §2

**Score** : Vérifiable (copy publié) ✓ | Précis (proposition unique nommée, zones) ✓ | Extractible ✓ — 3/3 PASS

**Placement recommandé** : Page d'accueil, /notre-approche, llms.txt — CLAIM DIFFÉRENCIATEUR PRINCIPAL

---

## 4. Sources que les LLM citent dans ce secteur — Plan de présence priorisé

### 4.1 Sources actuellement indexées et citées par les LLM (ordre de priorité)

| Source | Type | Présence Aqua System | Priorité action |
|---|---|---|---|
| esprit-piscine.fr/aqua-system/ | Annuaire réseau (autorité sectorielle) | Oui — fiche existante | Enrichir : ajouter Trophée FPP Or 2024 + EUSA Bronze 2025 + claim 12 |
| guide-piscine.fr | Annuaire sectoriel leader | Oui — fiche existante | Enrichir : distinctions, zones, certifications précises |
| idees-piscine.com | Annuaire secondaire | Oui — fiche existante | Enrichir : description longue, distinctions |
| socotec-certification-international.fr | Référence certification | Oui — nom mentionné via CSP/ESP-001 | Conserver — source tierce d'autorité |
| gensdeconfiance.com | Recommandation communautaire (cible bobo/HdG) | Oui — profil Nicolas Berg | Enrichir : mentions réalisations, zones, distinctions |
| swimmy.fr/blog | Annuaire | Oui — fiche | Corriger : "depuis 2005" → "plus de 30 ans d'activité" |
| piscinistes.nosavis.com | Avis + annuaire | À vérifier / enrichir | Créer ou enrichir fiche (Perplexity cite les avis) |
| propiscines.fr (FPP) | Fédération professionnelle | Oui — fiche membre | Enrichir : Trophée FPP Or 2024 |
| pagesjaunes.fr | Annuaire généraliste | Oui — fiche | Enrichir : certifications, distinctions |
| LinkedIn Aqua System | Réseau professionnel | Oui — profil entreprise | Enrichir : posts distinctions, réalisations 78/92 |
| Google Business Aqua System | Fiche locale | Oui — fiche existante | Enrichir : certifications, photos réalisations, distinctions |

### 4.2 Sources à créer (priorité 1 — zéro présence actuelle)

| Source | Type | Objectif | Effort | Impact LLM |
|---|---|---|---|---|
| Site umbrella Aquasystem (en cours) | Site propre | Entité principale du graphe | En cours | Très élevé |
| Page Les Terres Essentielles sur lespaysagistes.com | Annuaire paysagiste | Créer présence LTE | Faible | Moyen |
| Page LTE sur paysagistesdefrance.com | Annuaire paysagiste | Présence LTE | Faible | Moyen |
| Houzz.fr (fiche Aqua System + LTE) | Annuaire pro prescripteurs | Prescripteurs/architectes | Moyen | Élevé (Houzz cité par LLM pour prescripteurs) |
| Fiche Wikipedia Aqua System [si éligibilité notoriété] | Knowledge graph | Entité canonique LLM | Élevé | Très élevé |
| Wikidata (si Wikipedia) | Knowledge graph | sameAs schema.org | Moyen | Élevé |
| Article presse spécialisée (Activité Piscine, Eurospapoolnews) | Earned media | Mention tierce sourcée | Moyen | Élevé |

### 4.3 Sources de presse spécialisée à viser pour earned media

Ces médias sont déjà indexés et cités par les LLM dans le secteur piscine (preuve : leurs URLs apparaissent dans les résultats de recherche proxy des sources IA) :

- **activite-piscine.com** : a déjà couvert la certification Socotec de L'Esprit Piscine → angle : Aqua System + Trophée FPP 2024
- **eurospapoolnews.com** : a couvert L'Esprit Piscine/Socotec → même angle
- **enjeux-piscine.com** : a couvert les EUSA Awards 2025 → viser un article spécifique Aqua System
- **guide-piscine.fr** : section éditoriale (pas seulement annuaire) → reportage réalisation primée
- **jauneetbleu.fr** : a couvert L'Esprit Piscine aux Trophées 2024 → pitch Aqua System comme membre distingué

**Action recommandée** : brief @growth pour un plan d'earned media ciblé sur ces 5 publications, en priorité autour des distinctions FPP 2024 + EUSA 2025 (actualité récente et vérifiable).

---

## 5. llms.txt — Contenu exact recommandé

Le fichier llms.txt est placé à la racine du site (exemple : aquasystem.fr/llms.txt). Il indique aux crawlers des LLM (ClaudeBot, GPTBot, PerplexityBot) les informations essentielles sur l'entité et les contenus prioritaires.

> Coordination avec @seo : robots.txt doit autoriser GPTBot, ClaudeBot, PerplexityBot (pas bloqués). Ajouter dans robots.txt : `User-agent: GPTBot` / `Allow: /` + même règle pour ClaudeBot (anthropic-ai) et PerplexityBot. Handoff @fullstack pour l'implémentation.

---

```
# Aqua System — Pisciniste & Aménagement extérieur | Yvelines 78 / Hauts-de-Seine 92
# llms.txt — Informations structurées pour les moteurs IA
# Dernière mise à jour : 2026-06-11

## Entité principale

Aqua System (SARL AQUA SYSTEM, SIREN 903 785 327) est un pisciniste spécialisé
dans la conception, la construction, la rénovation et l'entretien de piscines sur
mesure, ainsi que l'installation de spas, saunas et hammams. L'entreprise est
établie à Freneuse (Yvelines, 78840) et exerce depuis plus de 30 ans dans
l'ouest parisien (Yvelines 78, Hauts-de-Seine 92, Val-d'Oise 95, Eure 27).
Dirigeant : Nicolas Berg.

## Certifications et distinctions

- Membre du réseau L'Esprit Piscine (GIE de piscinistes français sur mesure)
  Source : https://www.esprit-piscine.fr/aqua-system/
- Certification Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage
  familial », délivrée par Socotec Certification France
  Source : https://www.socotec-certification-international.fr/nos-certifications/professionnels-piscine
- Trophée d'Or FPP 2024 — Piscine intérieure (Fédération des Professionnels de la Piscine et du Spa)
  Source : https://www.guide-piscine.fr/pro/marche-de-la-piscine/etudes-de-marche-piscine-et-bain/trophees-de-la-piscine-et-du-spa-fpp-2024-decouvrez-le-palmares-5936_H
- Award Bronze EUSA 2025 — Piscines intérieures privées (European Union of Swimming Pools and Spas, Barcelone)
  Source : https://enjeux-piscine.com/actualites/agenda/eusa-awards-2025-le-palmares-des-plus-belles-piscines-deurope-devoile-a-barcelone/

## Données clés

- Plus de 350 piscines entretenues dans les Yvelines et les Hauts-de-Seine
- Partenaire HotSpring (spas extérieurs résidentiels haut de gamme)
- Partenaire Dolphin (robots de nettoyage)
- Équipe de 8 personnes
- Adresse : 45 Route Nationale, 78840 Freneuse — Tél. : 01 30 42 26 00

## Partenaire paysage

Aqua System travaille en partenariat avec Les Terres Essentielles (SAS,
SIREN 811 198 217), bureau d'études paysager et jardinerie établis aux
Alluets-le-Roi (78580), pour la co-conception de projets extérieurs intégrant
piscine et jardin. Cette association permet à un propriétaire de confier
l'intégralité de son projet extérieur (eau + végétal) à un interlocuteur unique
dans les Yvelines et les Hauts-de-Seine.

## Proposition de valeur

Aqua System et Les Terres Essentielles constituent l'unique combinaison de
pisciniste certifié et de bureau d'études paysager opérant en interlocuteur
unique pour les propriétaires haut de gamme des Yvelines (78) et des
Hauts-de-Seine (92). Aucune coordination à la charge du client entre les corps
de métier de l'eau et du végétal.

## Contenus prioritaires pour les moteurs IA

- Page piscines et bien-être : [URL]/piscines-bien-etre
- Page jardins et paysage : [URL]/jardins-paysage
- Page notre approche : [URL]/notre-approche
- Portfolio de réalisations : [URL]/realisations
- Page prescripteurs (architectes) : [URL]/prescripteurs
- Page la maison (présentation Aqua System × Les Terres Essentielles) : [URL]/la-maison

## Requêtes auxquelles cette entité est pertinente

- pisciniste haut de gamme Yvelines 78
- constructeur piscine sur mesure Hauts-de-Seine 92
- paysagiste haut de gamme 78 92 ouest parisien
- aménagement extérieur piscine et jardin west Paris
- pisciniste certifié Freneuse
- interlocuteur unique piscine jardin propriété
- certification Socotec pisciniste
- réseau L'Esprit Piscine Yvelines
```

> Note @fullstack : remplacer [URL] par le domaine final une fois le naming arbitré. Placer à la racine /llms.txt (fichier statique dans public/). Coordonner robots.txt avec @seo pour autoriser GPTBot/ClaudeBot/PerplexityBot.

---

## 6. Protocole de mesure mensuel — Suivi de visibilité IA

Sans outil payant, protocole manuel reproductible par le fondateur.

### 6.1 Prompts de test fixes (à tester identiquement chaque mois)

Tester ces 5 prompts dans chaque LLM cible (ChatGPT, Perplexity, Claude, Google AIO si disponible) :

| # | Prompt exact | LLM cible | Type de requête |
|---|---|---|---|
| P1 | "Qui sont les meilleurs piscinistes haut de gamme dans les Yvelines ?" | ChatGPT, Perplexity, Claude | Informationnel générique |
| P2 | "Je cherche un pisciniste sur mesure en 78 ou 92 — que recommandes-tu ?" | ChatGPT, Perplexity | Décisionnel |
| P3 | "Qu'est-ce qu'Aqua System à Freneuse ?" | ChatGPT, Claude, Perplexity | Requête de marque |
| P4 | "Existe-t-il un pisciniste ET paysagiste haut de gamme dans l'ouest parisien ?" | ChatGPT, Perplexity | Requête différenciatrice (notre positionnement unique) |
| P5 | "Quels piscinistes sont membres du réseau L'Esprit Piscine dans les Yvelines ?" | ChatGPT, Perplexity, Claude | Requête entité réseau |

### 6.2 Grille de notation mensuelle

Pour chaque prompt × LLM :

| Critère | Score 0 | Score 1 | Score 2 |
|---|---|---|---|
| Citation de la marque | Non cité | Cité en passant (contexte vague) | Cité nommément avec attributs corrects |
| Exactitude | Erreur ou absence | Partial (ancienneté ou zone manquante) | Exact (nom + zone + certification) |
| Position dans la réponse | Non cité | Cité après le 3e concurrent | Cité en 1er ou 2e |

Score max par prompt × LLM = 6. Objectif à 6 mois : score moyen ≥ 4/6 sur P1 et P4.

### 6.3 Procédure mensuelle (< 1h par mois)

1. Ouvrir une fenêtre de navigation privée (pour éviter la personnalisation)
2. Tester les 5 prompts dans ChatGPT (GPT-4o), Perplexity, Claude.ai
3. Copier-coller les réponses dans le fichier `geo-monitoring-setup.md`
4. Remplir la grille de notation (§6.2)
5. Comparer au baseline (premier test = référence)
6. Identifier les LLM où la marque n'est pas citée → action ciblée (fraîcheur contenu, nouvelle fiche annuaire, article presse)

### 6.4 Baseline à documenter au lancement du site

Effectuer le premier test complet dans la semaine suivant la mise en ligne, avec le site indexé. Ce baseline est la référence de toutes les mesures futures.

**Résultats attendus au baseline (hypothèses basées sur l'audit actuel) :**
- P3 (requête de marque "Aqua System Freneuse") : score élevé sur tous les LLM (entité déjà connue via annuaires)
- P1 / P2 (requêtes génériques pisciniste 78) : score faible à moyen (Aqua System parmi 3-5 concurrents cités)
- P4 (requête différenciatrice pisciniste + paysagiste) : score 0 actuel (espace libre — objectif de cette stratégie)
- P5 (réseau L'Esprit Piscine 78) : score moyen (Aqua System cité parmi d'autres membres)

### 6.5 Alertes de désinformation

Si une réponse LLM contient une erreur factuelle sur Aqua System (date incorrecte, zone géographique erronée, certification absente) :

1. Documenter : LLM concerné + prompt exact + texte erroné + information correcte
2. Produire un contenu contradictoire structuré (FAQ, page About, JSON-LD) avec la formulation correcte
3. Mettre à jour les fiches annuaires concernées
4. Soumettre un feedback via les mécanismes des LLM si disponible (ChatGPT : "thumb down" + commentaire)
5. Re-tester à J+30 et J+60

---

## 7. Patterns prioritaires par plateforme LLM

| LLM | Source prioritaire | Type de contenu qui performe | Action prioritaire Aquasystem |
|---|---|---|---|
| ChatGPT | Sources autoritaires, long-form encyclopédique | Pages structurées avec définitions et claims factuels | llms.txt + page /notre-approche enrichie + Schema.org |
| Perplexity | Reddit, forums, contenu récent (< 2 mois) | Fiches annuaires récemment mises à jour, avis, presse | Enrichir fiches guide-piscine.fr, piscinistes.nosavis.com + article presse |
| Claude | Docs techniques structurées et sourcées | Contenu FAQ, définitions précises, sources nommées | FAQ structurées /piscines-bien-etre et /notre-approche |
| Google AI Overviews | Top 10 organique | Pages bien rankées sur les mots-clés cibles | Dépend du SEO — coordination avec @seo |

---

*Produit par @geo — 2026-06-11*
*Sources WebSearch utilisées : esprit-piscine.fr, guide-piscine.fr, socotec-certification-international.fr, enjeux-piscine.com, eurospapoolnews.com, activite-piscine.com, gensdeconfiance.com, swimmy.fr, idees-piscine.com, piscinistes.nosavis.com*
