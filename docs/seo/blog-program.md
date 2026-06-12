# Programme Blog « Notre Regard » — Aquasystem
## Architecture, planning 6 mois, briefs complets — Décision fondateur 2026-06-12

> Document de référence pour @copywriter, @fullstack, @geo.
> Sources : keyword-map.md, seo-strategy.md, savoir-faire-facts.md, brand-voice.md, geo-strategy.md, faq-homepage-arbitrage.md, SERP WebSearch 2026-06-12.
> Mis à jour : 2026-06-12 | Agent : @seo

---

## BLOC 1 — ARCHITECTURE

### 1.1 Slug tranché : /notre-regard

**Décision : `/notre-regard`** — écarté `/le-regard`.

Justification :
- "Notre regard" est à la première personne du pluriel : la marque prend position, affirme un point de vue. C'est un blog de maison, pas un blog SEO.
- "Notre" ancre l'autorialité (Nicolas Berg, Aqua System) : signal E-E-A-T fort pour les crawlers comme pour les lecteurs.
- "Le regard" est plus abstrait, moins propriétaire — on pourrait le lire comme un blog éditorial générique.
- SEO : les deux slugs sont équivalents en termes de mots-clés. "Notre regard" est plus mémorable et différenciant.

### 1.2 Structure d'URL

```
/notre-regard/                          → index blog (liste des articles)
/notre-regard/[slug]/                   → article individuel
```

Exemples de slugs :
```
/notre-regard/piscine-debordement-terrain-en-pente/
/notre-regard/piscine-interieure-guide-complet/
/notre-regard/fond-mobile-terrasse-piscine/
/notre-regard/investissement-piscine-haut-de-gamme/
/notre-regard/piscine-jardin-concevoir-ensemble/
/notre-regard/renovation-piscine-haut-de-gamme/
```

Règles de slug :
- Tirets uniquement (jamais underscore)
- Pas de date dans l'URL (évite la dépréciation de l'article par les crawlers)
- Mot-clé principal en première position
- Max 5-6 mots

### 1.3 Maillage interne

Principe : chaque article est un nœud dans le cocon. Il pointe vers les pages services et reçoit un lien en retour.

**Direction article → pages services (liens entrants pour les pages piliers)**

| Sujet article | Lien vers | Ancre recommandée |
|---|---|---|
| Piscine à débordement (terrain en pente) | `/piscines-bien-etre/` | "conception d'une piscine à débordement" |
| Piscine intérieure | `/piscines-bien-etre/` | "nos réalisations de piscines intérieures" |
| Fond mobile | `/piscines-bien-etre/` | "piscine à fond mobile sur mesure" |
| Investissement piscine HdG | `/piscines-bien-etre/` + `/notre-approche/` | "notre approche du sur-mesure" |
| Piscine + jardin ensemble | `/notre-approche/` + `/jardins-paysage/` | "concevoir l'eau et le jardin depuis le même bureau d'études" |
| Rénovation piscine | `/piscines-bien-etre/` + `/contact/` | "parlez-nous de votre projet de rénovation" |

**Direction pages services → /notre-regard (liens sortants depuis les pages piliers)**

Ajouter dans chaque page service une section "Pour aller plus loin" ou "Sur notre blog" pointant vers les articles correspondants. Implémentation : composant statique en bas de page (voir spec @fullstack).

**Maillage entre articles** : chaque article cite au moins un autre article du blog (lien naturel dans le corps de texte). Le registre des sujets publiés (voir §4) documente les liens croisés disponibles.

### 1.4 Intégration footer + teaser accueil

**Footer** : ajouter une colonne "Notre regard" dans le footer avec les 3 derniers articles (titre + date) et un lien "Tous nos articles". La section /notre-regard était signalée dans faq-homepage-arbitrage.md comme le déblocage prévu de la FAQ footer : le blog arrivant plein (6 articles dès le lancement), le lien footer devient justifié.

Implémentation footer : liste statique des 3 derniers slugs dans `src/content/blog.ts` (mise à jour manuelle à chaque publication). Pas de fetching dynamique en export statique.

**Teaser accueil (recommandation)** : ajouter une section "Derniers articles" en bas de homepage, avant le SectionCTA final. Format : 2 cards (titre + aperçu 1 ligne + lien "Lire l'article"). Conditions : section visible uniquement quand ≥ 2 articles publiés. Justification : signal de fraîcheur pour Google, maillage naturel, argument de conviction pour Alexandre (une maison qui partage son expertise).

### 1.5 JSON-LD Article + auteur

Schéma à implémenter sur chaque page article (`/notre-regard/[slug]/page.tsx`) :

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Titre de l'article]",
  "description": "[Meta description]",
  "image": "[SITE_URL]/images/blog/[slug]-hero-1200w.webp",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": {
    "@type": "Person",
    "name": "Nicolas Berg",
    "jobTitle": "Fondateur, Aqua System",
    "worksFor": {
      "@type": "Organization",
      "name": "Aqua System",
      "@id": "[SITE_URL]/#organization-aquasystem"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Aqua System",
    "@id": "[SITE_URL]/#organization-aquasystem"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[SITE_URL]/notre-regard/[slug]/"
  }
}
```

Signal E-E-A-T : Nicolas Berg est identifié comme auteur avec son titre réel. Une bio courte (3-4 lignes : fondateur Aqua System, 30+ ans pisciniste Yvelines/92, Socotec CSP/ESP-001) doit apparaître en pied d'article — composant `AuthorBlock` à créer par @fullstack.

### 1.6 Flux RSS

**Décision : OUI au flux RSS.**

Justification :
- Les crawlers IA (GPTBot, PerplexityBot, ClaudeBot) consomment les flux RSS comme source de fraîcheur. Coordination avec @geo : le flux RSS amplifie la visibilité GEO.
- Coût d'implémentation nul sur export statique Next.js (fichier statique `public/rss.xml` mis à jour manuellement à chaque publication, ou via un script de génération simple).
- Format RSS 2.0 standard, pas Atom (compatibilité maximale).
- URL : `/rss.xml`

---

## BLOC 2 — PLANNING 6 MOIS (12 articles, bimensuel)

### Logique de priorisation

Croisement de 4 critères :
1. Volume/intention keyword-map : requêtes à espace libre et intention forte
2. Autorité savoir-faire : sujets couverts par des faits PROUVÉS chez Aqua System (savoir-faire-facts.md §2)
3. Saisonnalité (mi-juin 2026) : les projets de l'hiver et du printemps 2027 se décident en automne 2026. Les articles publiés en juillet-août nourrissent les décisions d'octobre-décembre.
4. Impact "n°1 ouest parisien" : sujets sur lesquels aucun concurrent local n'a produit de contenu expert sourcé

### Tableau planning

| # | Date cible | Titre provisoire | Mot-clé / cluster cible | Intention | Angle maison | Type | CTA cible |
|---|---|---|---|---|---|---|---|
| A1 | 01/07/2026 | Piscine à débordement : comment un terrain en pente devient un atout | piscine à débordement Yvelines / terrain en pente piscine | Informationnelle pré-achat + commerciale | La contrainte du relief comme parti pris : on l'utilise, on ne l'aplanit pas. Réalisation `piscine-debordement-foret` à l'appui. | Regard d'expert + coulisses technique | /contact/ |
| A2 | 15/07/2026 | Piscine intérieure : ce que l'hygrométrie impose (et ce que personne ne dit) | piscine intérieure sur mesure 78 / piscine intérieure hygrométrie | Informationnelle expert | L'enjeu n°1 de la piscine intérieure n'est pas la piscine — c'est l'air. 4 réalisations intérieures AS, trophée FPP [À CONFIRMER Nicolas]. | Guide technique expert E-E-A-T fort | /piscines-bien-etre/ + /contact/ |
| A3 | 01/08/2026 | Fond mobile : quand la terrasse devient piscine (et réciproquement) | piscine fond mobile / fond mobile terrasse piscine | Informationnelle + commerciale | L'ouvrage le plus rare de notre portfolio. Comment ça fonctionne, ce que ça change au quotidien, ce que ça coûte vraiment. | Coulisses technique + guide | /contact/ |
| A4 | 15/08/2026 | Ce qui fait le prix d'une piscine haut de gamme : les vraies raisons | prix piscine sur mesure / investissement piscine haut de gamme | Informationnelle pré-achat (PAA fort) | Pas de prix inventés. Décortiquer les variables réelles : structure béton armé, finitions, équipements, génie civil, garantie décennale. | Guide objectif + regard d'expert | /notre-approche/ + /contact/ |
| A5 | 01/09/2026 | Piscine et jardin conçus ensemble : ce que ça change | piscine et jardin sur mesure / pisciniste paysagiste Yvelines | Commerciale différenciatrice | Le seul angle qui n'existe pas chez les concurrents locaux : on ne rattrape pas le jardin après la piscine. Notre bureau d'études unit les deux depuis le premier plan. | Regard d'expert + réalisation complète | /notre-approche/ + /contact/ |
| A6 | 15/09/2026 | Rénover une piscine haut de gamme : quand et pourquoi | rénovation piscine 78 / rénover piscine béton | Commerciale (intention de remplacement) | Quand une rénovation s'impose, ce qu'elle permet (au-delà de l'étanchéité), l'automne comme saison idéale. Angle sincère : les signes qui ne trompent pas. | Guide expert + saisonnalité | /contact/ |
| A7 | 01/10/2026 | La piscine miroir : quand l'eau disparaît dans le ciel | piscine miroir sur mesure 78 | Informationnelle + commerciale | Distinction technique piscine miroir vs débordement. Nos réalisations. L'angle lumière et horizon. | Regard d'expert + esthétique | /piscines-bien-etre/ + /contact/ |
| A8 | 15/10/2026 | Piscine et pool-house : penser l'architecture ensemble | pool-house piscine sur mesure / piscine et architecture extérieure | Commerciale premium | La piscine comme pièce à vivre extérieure. Pool-house, véranda, abri bas : les configurations qui fonctionnent sur les propriétés de l'ouest parisien. | Regard d'expert + réalisations | /contact/ |
| A9 | 01/11/2026 | L'entretien annuel d'une piscine : ce que le contrat doit couvrir | entretien piscine Yvelines / contrat entretien piscine 78 | Commerciale récurrente | Ce qu'un bon contrat d'entretien protège (pas seulement l'eau). 350 piscines suivies, ce qu'on observe après 10 ans sans entretien sérieux. | Guide expert + preuve chiffre | /piscines-bien-etre/ + /contact/ |
| A10 | 15/11/2026 | Couloir de nage : la piscine sportive sur une propriété privée | couloir de nage / piscine sportive maison | Informationnelle + commerciale | Pas un compromis : un ouvrage à part entière. Dimensions, longueurs, contre-courant, réalisations AS. | Guide technique | /contact/ |
| A11 | 01/12/2026 | Margelles et plages : le détail qui fait la piscine | margelles piscine pierre naturelle / travertin piscine | Informationnelle | Synergie directe avec Kei-Stone (Les Terres Essentielles). Les matériaux, comment on les choisit, ce qu'ils durent. | Regard d'expert matière | /jardins-paysage/ + /contact/ |
| A12 | 15/12/2026 | Préparer un projet piscine+jardin : les bonnes questions à se poser | comment choisir pisciniste haut de gamme / projet piscine 78 | Informationnelle pré-achat | Guide de conviction pour Alexandre. Les questions qui distinguent un bon prestataire. Maillage vers toutes les pages services. | Guide + maillage complet | /contact/ |

### Note saisonnalité

- Juillet-août : articles techniques (débordement, intérieure, fond mobile) — lus pendant la saison, décision en automne.
- Septembre : article piscine+jardin — moment clé de la décision pour les projets hiver.
- Octobre-novembre : articles entretien et matière — relance des contacts existants + prospects automne.
- Décembre : article guide "comment préparer" — capte les projets du printemps 2027 tôt.

---

## BLOC 3 — BRIEFS COMPLETS POUR @COPYWRITER (articles A1 à A6)

---

### BRIEF A1 — Piscine à débordement : comment un terrain en pente devient un atout

**Date de publication cible** : 01/07/2026
**Longueur cible** : 1 400-1 800 mots
**Type** : regard d'expert + coulisses technique

**Requête(s) cible(s)**
- Principale : "piscine à débordement Yvelines" (volume Faible, difficulté Faible — espace libre)
- Secondaires : "piscine terrain en pente", "piscine débordement terrain incliné", "piscine sur mesure terrain pente 78"

**SERP observée (WebSearch 2026-06-12)**
Qui ranke : diffazur.fr (article "piscine à débordement pente et terrain idéal", mars 2025 + mise à jour oct 2025), alpinarchi.fr (guide technique 2026), habitatpresto.com (listicle grand public), aeropaint.fr (guide générique).
Angle manquant : aucun article n'est rédigé par un pisciniste local 78/92 avec des réalisations prouvées. Tous les articles existants sont génériques ou de portée nationale. L'angle "regard d'expert ancré local avec photos de vraies réalisations" est totalement libre.
Standard à dépasser : diffazur.fr est l'article le mieux positionné — technique solide mais sans ancrage local, sans réalisation nommée, sans voix d'expert. Notre article doit avoir la substance technique + la localité + la preuve.

**Structure Hn détaillée**

```
H1 : Piscine à débordement : comment un terrain en pente devient un atout

Intro (150 mots) :
Répondre immédiatement à l'intention : oui, un terrain en pente est
compatible avec une piscine à débordement — mieux, il la rend unique.
Planter le contexte local (Yvelines, 78, propriétés en dénivelé, Seine,
collines de l'ouest parisien). Annoncer l'angle : on ne combat pas la pente,
on la travaille.

H2 : Pourquoi la pente n'est pas un obstacle

  H3 : Ce que la topographie permet
  (l'eau déborde vers le point bas — effet naturel, plus simple à réaliser
  que sur terrain plat. Le dénivelé crée la lame sans artifice.)

  H3 : La différence entre une piscine à débordement et une piscine miroir
  (utiliser le lexique exact de savoir-faire-facts.md §4 — ne pas confondre
  les deux ouvrages ; distinction technique : lame d'eau côté aval vs eau
  affleurante tout le pourtour)

H2 : Les variables techniques qui comptent

  H3 : La goulotte de récupération
  (comment elle fonctionne, positionnement côté aval — sans jargon BTP brut,
  avec le vocabulaire de brand-voice.md)

  H3 : La structure béton armé sur terrain incliné
  (murs de soutènement, génie civil — on a les compétences internes ;
  Aqua System = bureau d'études + collaborateurs génie civil)

  H3 : L'intégration paysagère
  (la pente crée des niveaux — la piscine et le jardin conçus ensemble
  depuis le départ ; maillage vers /notre-approche/ et /jardins-paysage/)

H2 : Notre réalisation — [décrire la réalisation piscine-debordement-foret]
(slug preuve : piscine-debordement-foret — lame de débordement visible sur
la forêt de pins. Décrire l'intention du propriétaire, la réponse apportée,
l'exécution. Format Intention/Réponse/Exécution — brand-voice §4b.
AUCUNE donnée inventée — uniquement ce qui est visible sur la photo et
connu du projet.)

H2 : Ce qui détermine le coût d'une piscine à débordement

  H3 : Les variables réelles (goulotte, pompes de récupération, structure,
  finitions — sans fourchettes inventées. Indiquer que le coût dépend de
  l'ouvrage complet et orienter vers la prise de contact.)

H2 : Les questions à poser à votre pisciniste

(3-4 questions concrètes qu'Alexandre doit poser : le génie civil est-il
géré en interne ? La goulotte est-elle dimensionnée pour votre débit ?
Le jardin est-il pensé en même temps que la piscine ?)

CTA final : "Votre terrain en pente — parlons-en." → /contact/
```

**Points techniques à mobiliser (savoir-faire-facts.md UNIQUEMENT)**
- Piscine à débordement : PROUVÉ (slug `piscine-debordement-foret`) — §2, ligne 1
- Structure béton armé : bureau d'études + collaborateurs génie civil internes — §1.5
- Piscine paysagée / projet intégré eau+jardin : PROUVÉ — §2, ligne 7
- Margelles pierre naturelle (travertin) : PROUVÉ — §2, ligne 9
- Différence débordement vs miroir : §1.1 + §4 lexique

**Claims à mobiliser**
- "Plus de 30 ans d'expertise dans l'ouest parisien" (ancrage local)
- Bureau d'études intégré (génie civil + technique piscine)
- Réalisation prouvée (photo `piscine-debordement-foret`)
- Certification Socotec CSP/ESP-001 (preuve qualité)

**Maillage interne obligatoire**
- Lien → `/piscines-bien-etre/` (ancre : "piscine à débordement sur mesure")
- Lien → `/notre-approche/` (ancre : "piscine et jardin conçus depuis le même bureau d'études")
- Lien → `/notre-regard/piscine-jardin-concevoir-ensemble/` (quand A5 sera publié — ajouter en mise à jour)

**Meta title** : Piscine à débordement sur terrain en pente — Regard d'expert Aqua System
**Meta description** : Un terrain incliné dans les Yvelines n'est pas un obstacle pour une piscine à débordement. C'est souvent un atout. Nicolas Berg, pisciniste depuis 30 ans en 78/92, explique pourquoi.

**Critères 10/10 mesurables**
- [ ] L'intention (terrain en pente + débordement = compatible ?) est répondue dès le H1 et les 2 premières phrases
- [ ] La distinction débordement/miroir est expliquée clairement (valeur unique vs SERP)
- [ ] La réalisation `piscine-debordement-foret` est décrite avec la structure Intention/Réponse/Exécution
- [ ] Nicolas Berg est identifié comme auteur avec son titre et ses credentials
- [ ] Aucune donnée inventée (aucune fourchette de prix sans source, aucun chantier fictif)
- [ ] Ton brand-voice : expert discret, ancré local (lieux nommés), sobre — zéro superlatif creux
- [ ] Extractibilité GEO : au moins 2 définitions/réponses directes formulées de façon extractible (question → réponse concise)
- [ ] Au moins 2 liens internes valides

---

### BRIEF A2 — Piscine intérieure : ce que l'hygrométrie impose (et ce que personne ne dit)

**Date de publication cible** : 15/07/2026
**Longueur cible** : 1 600-2 000 mots
**Type** : guide technique expert (E-E-A-T maximal)

**Requête(s) cible(s)**
- Principale : "piscine intérieure sur mesure 78" (volume Très faible, difficulté Faible — niche)
- Secondaires : "piscine intérieure hygrométrie", "piscine intérieure déshumidification", "piscine intérieure coût réel"

**SERP observée (WebSearch 2026-06-12)**
Qui ranke : guide-piscine.fr (article hygrométrie technique — bon mais sans pisciniste identifié), leguidepiscine.com (coûts), dbm-energie.fr (déshumidificateur uniquement), geco.fr (spécialiste déshumidification). Desjoyaux.fr (guide générique).
Angle manquant : aucun article n'est rédigé par un constructeur de piscines intérieures avec ses propres réalisations. Le sujet hygrométrie est traité par des installateurs de déshumidificateurs, pas par des piscinistes. Notre angle : le pisciniste qui construit 4 piscines intérieures différentes dans les Yvelines et qui explique ce que ça impose vraiment.
Standard à dépasser : guide-piscine.fr est factuel mais sans identité, sans cas réels, sans auteur. Notre article apporte l'expertise de terrain + les 4 réalisations prouvées + le trophée FPP [à confirmer].

**Structure Hn détaillée**

```
H1 : Piscine intérieure : ce que l'hygrométrie impose (et ce que personne ne dit)

Intro (150 mots) :
L'erreur la plus fréquente dans un projet de piscine intérieure : concentrer
toute l'attention sur le bassin et négliger l'air. Une piscine intérieure
génère une évaporation permanente — 60 à 65 % d'humidité relative dans l'espace,
28°C ambiants. Sans traitement de l'air dimensionné depuis la conception, les
dégradations commencent dans les 2-3 premières années (moisissures, condensation,
détérioration des structures). On le voit sur les chantiers de rénovation.

H2 : La piscine intérieure : un ouvrage à part entière

  H3 : Ce qui la distingue d'une piscine extérieure couverte
  (le bâtiment est partie intégrante de l'ouvrage — pas seulement le bassin)

  H3 : Les quatre configurations possibles
  (intégrée à la maison / bâtiment dédié / sous abri adossé / véranda —
  utiliser le lexique savoir-faire-facts.md §1.1, ligne piscine intérieure)

H2 : L'hygrométrie : la contrainte n°1

  H3 : Ce que produit une piscine intérieure dans l'air
  (évaporation : surface d'eau exposée × température × usage.
  Taux cible : 60-65 % HR — source guide-piscine.fr hygrométrie)

  H3 : Ce que ça fait sans déshumidification adaptée
  (condensation sur les surfaces vitrées, moisissures, détérioration
  des matériaux — béton, bois de charpente, aluminium des menuiseries)

  H3 : Comment on dimensionne la déshumidification
  (calcul selon la surface d'eau, le volume d'air, l'usage prévu —
  sans donner de formule inventée : c'est le bureau d'études qui
  fait ce calcul en amont. C'est pourquoi on l'intègre à la conception.)

H2 : Ce que nos 4 réalisations nous ont appris

(Décrire les 4 réalisations prouvées de façon factuelle — 1 paragraphe chacune :
piscine-interieure-beton-baies / piscine-interieure-pierre-poutres /
piscine-interieure-veranda-soir / bien-etre-eclairage-ambiance.
Format : parti pris architectural + contrainte résolue + ce qu'on en a appris.
AUCUNE donnée inventée — uniquement ce qui est visible sur les photos
et connu du projet. Les noms de communes peuvent être utilisés si connus.)

H2 : Le trophée FPP — ce que la Fédération des Professionnels de la Piscine distingue
[À CONFIRMER Nicolas Berg : Aqua System a-t-il un trophée FPP propre,
distinct du réseau ? Si OUI : détailler. Si NON : supprimer ce H2 et
reformuler autour de la Certification Socotec et de la FPP (adhésion).]

H2 : Les questions à poser avant de lancer un projet de piscine intérieure

(5 questions clés : le traitement de l'air est-il dimensionné dans les plans ?
La charpente est-elle prévue pour le chargement + l'humidité ?
Quel revêtement pour la longévité dans un contexte humide ?
Le chauffage de l'eau est-il intégré au système de chauffage de la maison ?
Qui porte la garantie décennale sur le bâtiment et le bassin ensemble ?)

CTA : "Un projet de piscine intérieure dans les Yvelines — parlons-en avant les plans." → /contact/
```

**Points techniques à mobiliser (savoir-faire-facts.md UNIQUEMENT)**
- Piscine intérieure : PROUVÉ — 4 slugs (`piscine-interieure-beton-baies`, `piscine-interieure-pierre-poutres`, `piscine-interieure-veranda-soir`, `bien-etre-eclairage-ambiance`) — §2, ligne 4
- Béton brut / parti pris architectural : PROUVÉ — §2, ligne 11
- Éclairage d'ambiance : PROUVÉ — §2, ligne 13
- Bureau d'études intégré : §1.2 + §1.5
- Garantie décennale + marché unique : §1.5
- Trophée FPP : [À CONFIRMER — §2 note en bas "Trophées FPP / EUSA Awards — HORS PÉRIMÈTRE réseau, pas AS"]

**Claims à mobiliser**
- 4 réalisations de piscines intérieures prouvées (fait différenciant rare en 78/92)
- Bureau d'études intégré (dimensionnement amont)
- Certification Socotec CSP/ESP-001
- Adhérent FPP (si pas de trophée propre, utiliser l'adhésion)

**Maillage interne obligatoire**
- Lien → `/piscines-bien-etre/` (ancre : "nos réalisations de piscines intérieures")
- Lien → `/notre-approche/` (ancre : "bureau d'études intégré, de la conception à l'entretien")
- Lien → `/notre-regard/investissement-piscine-haut-de-gamme/` (A4 — quand publié)

**Meta title** : Piscine intérieure : l'hygrométrie, la vraie contrainte — Aqua System
**Meta description** : 4 piscines intérieures construites dans les Yvelines et les Hauts-de-Seine. Nicolas Berg explique ce que l'hygrométrie impose dès la conception — et pourquoi c'est l'enjeu n°1 du projet.

**Critères 10/10 mesurables**
- [ ] L'enjeu hygrométrique est nommé dès le H1 et l'intro (répond à l'intention "ce que personne ne dit")
- [ ] Les 4 réalisations sont décrites avec des faits réels uniquement
- [ ] Le trophée FPP est utilisé seulement si confirmé par Nicolas Berg — sinon supprimé
- [ ] Les 5 questions en fin d'article sont actionnables et différenciantes
- [ ] Ton expert discret : technique sans jargon BTP brut, accessible à Alexandre
- [ ] Nicolas Berg identifié comme auteur + credentials
- [ ] Extractibilité GEO : au moins 3 réponses directes (qu'est-ce que l'hygrométrie d'une piscine intérieure ? quel taux ? quelles conséquences ?)
- [ ] Aucun chiffre inventé sur les coûts (hygrométrie et déshumidification : indiquer "variable selon l'ouvrage" et orienter contact)

---

### BRIEF A3 — Fond mobile : quand la terrasse devient piscine (et réciproquement)

**Date de publication cible** : 01/08/2026
**Longueur cible** : 1 200-1 500 mots
**Type** : coulisses technique + guide

**Requête(s) cible(s)**
- Principale : "piscine fond mobile" (volume Faible, difficulté Faible — longue traîne qualifiante)
- Secondaires : "fond mobile terrasse piscine", "piscine fond mobile prix", "piscine terrasse fond mobile sur mesure"

**SERP observée (WebSearch 2026-06-12)**
Qui ranke : pagesjaunes.fr (guide générique), habitatpresto.com (price-first), jardipros.com (tarifs 2025), diffazur.fr (article commercial), guide-piscine.fr (prix).
Angle manquant : tous les articles existants sont price-first ou générique. Aucun est rédigé par un pisciniste avec sa propre réalisation de fond mobile. Notre article : le regard du pisciniste qui l'a construit, qui explique ce que ça change dans la vie quotidienne d'une propriété.
Standard à dépasser : diffazur.fr est l'article le plus complet — mais sans réalisation propre identifiée, sans auteur, commercial. Notre article apporte la réalisation prouvée + la voix de l'expert.

**Structure Hn détaillée**

```
H1 : Fond mobile : quand la terrasse devient piscine (et réciproquement)

Intro (120 mots) :
L'ouvrage le plus rare de notre portfolio. Pas parce qu'il est compliqué
à désirer — mais parce qu'il exige une conception rigoureuse en amont.
Un fond mobile ne s'ajoute pas à une piscine : il se décide avec elle,
depuis le bureau d'études. Ce que ça change, comment ça fonctionne,
ce que ça implique pour une propriété dans l'ouest parisien.

H2 : Fond mobile et terrasse mobile : deux ouvrages différents

(Utiliser le lexique exact de savoir-faire-facts.md §4 :
Fond mobile = plancher motorisé réglable en hauteur (la piscine devient
terrasse, le niveau d'eau s'ajuste).
Terrasse mobile = terrasse coulissante qui découvre/recouvre le bassin
(le plancher se déplace, pas le fond).
CETTE DISTINCTION EST CRITIQUE — la confondre est l'erreur la plus courante
dans le secteur.)

H2 : Ce que le fond mobile change dans l'usage quotidien

  H3 : La propriété comme espace polyvalent
  (terrasse praticable en intersaison, pataugeoire pour les enfants,
  piscine sportive — sans changer d'installation)

  H3 : L'argument sécurité
  (fond remonté = pas d'accès à l'eau — norme NF P90-308 mentionnée
  dans savoir-faire-facts.md §1.4 pour les volets, vérifier si applicable
  aux fonds mobiles [À CONFIRMER Nicolas])

  H3 : L'intégration visuelle (disparaît quand non utilisé)

H2 : Notre réalisation — [décrire piscine-fond-mobile-terrasse]

(Slug preuve : `piscine-fond-mobile-terrasse` — platelage bois affleurant,
fond remonté = terrasse praticable.
Format Intention/Réponse/Exécution brand-voice §4b.
Décrire l'intention du propriétaire, le parti pris architectural, l'exécution.
AUCUNE donnée fictive — uniquement ce que la photo montre et ce qui est connu.)

H2 : Ce qu'il faut anticiper

  H3 : La conception (le fond mobile se décide au plan, pas en cours de chantier)

  H3 : La maintenance (mécanisme motorisé = entretien spécifique, prestataire
  formé — Aqua System assure le suivi dans le cadre du contrat d'entretien)

  H3 : Le coût : les fourchettes publiques disponibles
  (Utiliser les fourchettes sourcées WebSearch 2026-06-12 :
  fond mobile seul sur mesure : 45 000-90 000 € TTC ;
  piscine + fond mobile sur mesure : 70 000-120 000 €.
  Ces fourchettes sont des données publiques de marché — citer la source,
  préciser que le coût exact dépend de l'ouvrage, orienter contact.)

CTA : "Envisagez-vous un fond mobile ? Parlons de votre projet avant les plans." → /contact/
```

**Points techniques à mobiliser (savoir-faire-facts.md UNIQUEMENT)**
- Piscine à fond mobile : PROUVÉ — slug `piscine-fond-mobile-terrasse` — §2, ligne 5
- Ne pas confondre avec terrasse mobile (§2, ligne 20 — terrasse mobile À CONFIRMER)
- Platelage bois : PROUVÉ — §2, ligne 10
- Bureau d'études + marché unique : §1.5

**Maillage interne obligatoire**
- Lien → `/piscines-bien-etre/` (ancre : "piscine à fond mobile sur mesure")
- Lien → `/notre-approche/` (ancre : "conception intégrée depuis le bureau d'études")

**Meta title** : Fond mobile : la piscine qui devient terrasse — Aqua System, Yvelines
**Meta description** : Un fond mobile ne s'ajoute pas à une piscine — il se conçoit avec elle. Notre réalisation dans les Yvelines et ce que cet ouvrage change dans l'usage d'une propriété.

**Critères 10/10 mesurables**
- [ ] La distinction fond mobile / terrasse mobile est expliquée clairement dès H2 (valeur unique vs SERP)
- [ ] La réalisation `piscine-fond-mobile-terrasse` est décrite factuellement
- [ ] Les fourchettes de prix utilisées sont sourcées (données publiques de marché, citées avec précaution)
- [ ] Aucune confusion entre fond mobile et terrasse mobile
- [ ] Ton expert discret : ni alarmiste sur le coût, ni promotionnel
- [ ] Extractibilité GEO : définitions claires fond mobile vs terrasse mobile

---

### BRIEF A4 — Ce qui fait le prix d'une piscine haut de gamme : les vraies raisons

**Date de publication cible** : 15/08/2026
**Longueur cible** : 1 600-2 000 mots
**Type** : guide objectif + regard d'expert (PAA fort, sujet n°1 en volume)

**Requête(s) cible(s)**
- Principale : "prix piscine sur mesure" / "combien coûte une piscine sur mesure" (PAA fort, volume Élevé)
- Secondaires : "prix piscine haut de gamme", "investissement piscine béton", "budget piscine sur mesure 78"

**SERP observée (WebSearch 2026-06-12)**
Qui ranke : travaux.com (aggregateur générique, fourchettes 20-50k€), diffazur.fr (fourchettes commerciales), piscinesriviera.fr (guide budget), prix-piscine-devis.fr (aggregateur leads), bouchet-piscines.com (pisciniste haut de gamme 2026).
Angle manquant : tous les articles donnent des fourchettes génériques ou sont des outils de génération de leads. Aucun n'explique POURQUOI une piscine haut de gamme coûte ce qu'elle coûte — les variables réelles, le rôle de chaque poste. Notre angle : pas de prix inventés, mais une explication honnête et sourcée de ce qui compose le coût, depuis la perspective du pisciniste qui fait le génie civil en interne.
Standard à dépasser : bouchet-piscines.com approche le sujet "pisciniste haut de gamme" mais sans la granularité des postes de coût. Diffazur.fr donne des fourchettes mais sans démonstration de légitimité. Notre article ajoute l'expertise locale + la transparence sur les composantes.

**Structure Hn détaillée**

```
H1 : Ce qui fait le prix d'une piscine haut de gamme : les vraies raisons

Intro (150 mots) :
C'est la question que tout propriétaire se pose avant de lancer un projet.
Pas pour négocier — pour comprendre. Parce que comprendre ce qui compose
le coût d'une piscine sur mesure, c'est aussi comprendre ce qu'on achète,
et ce qu'on protège. Ce guide ne donne pas de prix fermes (ils dépendent
de chaque ouvrage) mais décortique les variables qui font la différence
entre une piscine à 30 000 € et une piscine à 120 000 €.

H2 : La structure : le poste qui ne se voit pas mais qui dure

  H3 : Béton armé vs coque polyester (pourquoi le béton armé coûte plus)
  H3 : Le génie civil sur terrain complexe (pente, nappe phréatique, rocher)
  H3 : Ce que "bureau d'études intégré" change dans le coût (et dans la garantie)

H2 : Les finitions : où la piscine haut de gamme se distingue visuellement

  H3 : Le revêtement intérieur (PVC, carrelage, mosaïque, pierre — gamme de prix)
  H3 : Les margelles et la plage (pierre naturelle, travertin, grès cérame, bois)
  H3 : L'escalier, les banquettes, les encastrements (les détails qui fondent le prix)

H2 : Les équipements : filtration, volet, éclairage

  H3 : La filtration (basse vitesse, verre recyclé — efficacité + économie d'énergie)
  H3 : Le volet immergé (les 4 familles — fond de fosse = plus discret, plus cher)
  H3 : L'éclairage d'ambiance (scénographie lumière = registre premium)

H2 : Le type d'ouvrage : pourquoi un débordement, un miroir ou un fond mobile coûtent plus

(Expliquer simplement : goulotte, pompes de récupération, mécanisme motorisé —
des équipements supplémentaires, une conception plus complexe.)

H2 : Ce que la garantie décennale comprend (et ce qu'elle protège)

(La garantie décennale est ce que le constructeur engage sur l'ouvrage.
Pour une piscine béton sur mesure, avec un bureau d'études interne et
un marché unique, elle couvre la structure 10 ans. C'est une valeur réelle,
pas une clause de style.)

H2 : Fourchettes indicatives — données publiques 2026

(Utiliser les fourchettes des sources WebSearch, citées avec précaution :
- Piscine béton sur mesure standard : 30 000-70 000 €
- Piscine béton haut de gamme (débordement, miroir, plage immergée) : 70 000-120 000 €+
- Fond mobile sur mesure + piscine : 70 000-120 000 €
Ces fourchettes sont des données de marché public — ne pas les présenter
comme les prix d'Aqua System, mais comme le contexte marché.
Le coût exact de votre projet dépend de chaque ouvrage. → Contact.)

CTA : "Ce que vaut votre projet — une conversation, pas un formulaire en ligne." → /contact/
```

**Points techniques à mobiliser (savoir-faire-facts.md UNIQUEMENT)**
- Structure béton armé isolé + bureau d'études + génie civil interne : §1.2 + §1.5
- Finitions : margelles pierre (PROUVÉ), travertin (PROUVÉ), platelage bois (PROUVÉ) : §2
- Équipements : volet immergé (PROUVÉ — `piscine-terrasse-engazonnee-volet`) : §1.4 + §2
- Filtration : [À CONFIRMER — mentionner le principe sans revendiquer le chiffre 5 µm] : §1.4
- Éclairage : PROUVÉ — §2, ligne 13
- Garantie décennale + marché unique : §1.5
- Fourchettes de prix : données publiques WebSearch (sources citées dans ce brief)

**Maillage interne obligatoire**
- Lien → `/notre-approche/` (ancre : "bureau d'études intégré, marché unique")
- Lien → `/piscines-bien-etre/` (ancre : "nos réalisations de piscines sur mesure dans les Yvelines")
- Lien → `/notre-regard/piscine-debordement-terrain-en-pente/` (A1 — quand publié)

**Meta title** : Prix d'une piscine haut de gamme : ce qui fait vraiment la différence — Aquasystem
**Meta description** : Pas de fourchettes inventées : une explication honnête des postes de coût d'une piscine sur mesure en béton armé. Structure, finitions, équipements, garantie décennale.

**Critères 10/10 mesurables**
- [ ] L'intention PAA ("combien coûte") est traitée honnêtement dès l'intro (on explique pourquoi on ne donne pas de prix ferme)
- [ ] Chaque poste de coût est expliqué avec un fait technique réel (savoir-faire-facts.md uniquement)
- [ ] Les fourchettes utilisées sont des données publiques de marché, citées comme telles — jamais présentées comme les prix d'Aqua System
- [ ] La garantie décennale est expliquée comme valeur réelle, pas comme clause générique
- [ ] Ton expert honnête : ni rassurant à outrance, ni alarmiste
- [ ] Nicolas Berg identifié comme auteur
- [ ] Extractibilité GEO : question "combien coûte une piscine sur mesure ?" → réponse structurée avec les variables

---

### BRIEF A5 — Piscine et jardin conçus ensemble : ce que ça change

**Date de publication cible** : 01/09/2026
**Longueur cible** : 1 400-1 800 mots
**Type** : regard d'expert + réalisation complète (article différenciateur stratégique)

**Requête(s) cible(s)**
- Principale : "piscine et jardin sur mesure" / "pisciniste paysagiste Yvelines" (volume Très faible — requête émergente à construire)
- Secondaires : "aménagement extérieur piscine jardin", "concevoir piscine et jardin ensemble", "intégrateur extérieur piscine jardin"

**SERP observée (WebSearch 2026-06-12)**
Qui ranke : pagesjaunes.fr (générique), homepool.fr ("paysagiste change tout"), guide-piscine.fr (piscine paysagée), diffazur.fr (piscine paysagée commercial), desiles-piscine.fr ("paysagiste-pisciniste : le duo gagnant").
Angle manquant : tous les articles traitent de la question "comment intégrer une piscine au jardin APRÈS sa construction" ou "faire appel à un paysagiste EN PLUS du pisciniste". AUCUN n'est rédigé par un acteur qui fait les deux depuis le même bureau d'études, avec des réalisations prouvées. Notre angle est unique : ce n'est pas un duo — c'est un seul ouvrage.
Standard à dépasser : homepool.fr et desiles-piscine.fr approchent l'angle — mais sans réalisations propres, sans auteur, sans ancrage local. Notre article a les 10+ réalisations "projet complet" prouvées + la voix de l'expert + le bureau d'études intégré.

**Structure Hn détaillée**

```
H1 : Piscine et jardin conçus ensemble : ce que ça change

Intro (150 mots) :
La plupart des projets extérieurs fonctionnent en deux temps : la piscine
d'abord, le jardin ensuite (ou l'inverse). Résultat : on rattrape. On adapte.
On compromet. Ce n'est pas notre façon de travailler. Depuis le premier plan,
notre bureau d'études réunit l'eau et le végétal — parce qu'une propriété
extérieure n'est pas la somme d'un bassin et d'un jardin : c'est un espace.
Ce que ça change, concrètement.

H2 : Pourquoi le "après" ne fonctionne pas

  H3 : Le problème des contraintes découvertes trop tard
  (terrassement déjà fait, implantation de la piscine fixée, espace restant
  pour le jardin subi plutôt que choisi — exemples concrets sans nommer de cas)

  H3 : La logique des niveaux
  (pente, niveaux de plage, relation eau-végétal : ces décisions se prennent
  ensemble au bureau d'études, pas en ajustement après coup)

H2 : Ce que le bureau d'études réunit en amont

  H3 : Le sol, la pente, les vues
  (lecture du terrain avant le premier plan — ombres portées, circulations
  naturelles, contrainte pédologique — brand-voice fond-jardins-copy.md §2)

  H3 : La relation eau-végétal comme partition
  (la couleur de l'eau en miroir de la végétation, les margelles comme
  transition minéral-végétal, la pierre qui fait pont entre les deux maisons)

H2 : Ce que nos réalisations "projet complet" montrent

(Décrire 2-3 réalisations parmi les slugs prouvés :
`projet-piscine-jardin-banquette`, `projet-bassin-jardin-paysage`,
`piscine-jardin-arbre` — ou ceux que Nicolas juge les plus représentatifs.
Format Intention/Réponse/Exécution, 1 paragraphe par réalisation.
AUCUNE donnée inventée.)

H2 : La synergie pierre : Kei-Stone et Aqua System

(Les margelles en travertin ou pierre naturelle que nous utilisons pour
les bassins sont les mêmes matériaux que Les Terres Essentielles distribue
via Kei-Stone pour les dalles et cheminements. La cohérence matière entre
piscine et jardin n'est pas un effet visuel fortuit — elle est construite
depuis l'approvisionnement.)
[Vérifier : ce passage n'engage PAS une formulation "groupe" — utiliser
"en partenariat avec Les Terres Essentielles" et "nos deux maisons".]

H2 : Ce que vous gagnez à partir ensemble

(Un seul interlocuteur. Un seul bureau d'études. Un seul marché, une seule
garantie. Pas de coordination entre prestataires. Pas de compromis imposé
par les délais croisés.)

CTA : "Parlez-nous de votre projet — eau et jardin, depuis le début." → /contact/
```

**Points techniques à mobiliser (savoir-faire-facts.md UNIQUEMENT)**
- Piscine paysagée / projet intégré eau+jardin : PROUVÉ — 10+ slugs : §2, ligne 7
- Margelles pierre naturelle / travertin : PROUVÉ — §2, ligne 9 (synergie Kei-Stone)
- Bureau d'études intégré (les deux maisons) : §1.2 + §1.5
- Niveau, dénivelé, soubassement appareillé : §2, ligne 14
- Fond-jardins-copy.md §2 : enrichissement BureauEtudesBlock (ombres portées, vues, circulations)

**Maillage interne obligatoire**
- Lien → `/notre-approche/` (ancre : "un seul bureau d'études pour la piscine et le jardin")
- Lien → `/jardins-paysage/` (ancre : "en partenariat avec Les Terres Essentielles")
- Lien → `/piscines-bien-etre/` (ancre : "nos réalisations de piscines paysagées")
- Lien → `/notre-regard/piscine-debordement-terrain-en-pente/` (A1)

**Meta title** : Piscine et jardin conçus ensemble : le regard d'Aqua System × Les Terres Essentielles
**Meta description** : Concevoir la piscine et le jardin depuis le même bureau d'études — pas en deux temps. Ce que ça change dans le résultat final, sur les propriétés de l'ouest parisien.

**Critères 10/10 mesurables**
- [ ] L'angle unique (un seul bureau d'études, pas un duo externe) est posé dès le H1 et l'intro
- [ ] La distinction "concevoir ensemble vs rattraper après" est illustrée concrètement
- [ ] Les réalisations "projet complet" sont décrites factuellement
- [ ] La synergie Kei-Stone est expliquée sans formulation légale interdite
- [ ] Formulations LTE vérifiées : "en partenariat avec", "nos deux maisons" — jamais "groupe", "filiales"
- [ ] Extractibilité GEO : réponse directe à "peut-on faire concevoir piscine et jardin par le même prestataire ?"

---

### BRIEF A6 — Rénover une piscine haut de gamme : quand et pourquoi

**Date de publication cible** : 15/09/2026
**Longueur cible** : 1 300-1 600 mots
**Type** : guide expert + saisonnalité

**Requête(s) cible(s)**
- Principale : "rénovation piscine 78" (volume Moyen, difficulté Moyenne)
- Secondaires : "rénover piscine béton", "quand rénover piscine", "rénovation piscine haut de gamme"

**SERP observée (WebSearch 2026-06-12)**
Qui ranke : piscines-jacques-brens.com (retour de la mosaïque 2026), harmonie-piscines.com (guide complet jan 2025), azurcleanpiscine.fr (guide béton), infopiscine.fr (guide béton), maison-etanche.com (guide A-Z).
Angle manquant : les guides existants sont des guides techniques génériques (étapes de rénovation, prix des revêtements). Aucun n'est rédigé par un pisciniste constructeur local qui explique QUAND une rénovation est vraiment nécessaire (et quand elle ne l'est pas), avec un angle honnête et une vision sur le haut de gamme. L'article de piscines-jacques-brens.com est intéressant (retour de la mosaïque = tendance) mais sans ancrage local.
Standard à dépasser : harmonie-piscines.com est le plus complet techniquement — mais générique, national, sans auteur. Notre article : le regard local, honnête, du pisciniste qui a vu des piscines vieillir dans le 78 et le 92.

**Structure Hn détaillée**

```
H1 : Rénover une piscine haut de gamme : quand et pourquoi

Intro (120 mots) :
Une piscine en béton armé bien construite dure. Pas indéfiniment.
Après 10-15 ans, certains signes ne trompent pas. Pas tous les signes
qu'on voit sur internet — certains sont des alarmes réelles, d'autres
sont de simples défauts d'entretien qu'on a tendance à confondre avec
une usure structurelle. Ce guide distingue les deux : ce qui impose
une rénovation, ce qui se règle avec un entretien sérieux, et ce que
l'automne offre comme fenêtre pour intervenir efficacement.

H2 : Les signes qui imposent une rénovation

  H3 : Les fissures structurelles (vs les micro-fissures superficielles)
  H3 : Le revêtement en fin de vie (liner dégonflé, carrelage décollé, PVC percé)
  H3 : Les défauts d'étanchéité (perte d'eau anormale — le test du seau)
  H3 : Les équipements devenus obsolètes (filtration insuffisante, absence de volet)

H2 : Ce que la rénovation permet (au-delà du revêtement)

  H3 : Repenser le revêtement : la tendance 2026 des matériaux nobles
  (mosaïque, pierre naturelle, travertin — le retour de la matière ;
  source : piscines-jacques-brens.com mars 2026, citation possible)

  H3 : Intégrer des équipements manquants
  (volet immergé, éclairage d'ambiance, régulation automatique — une
  rénovation est une occasion de mettre à niveau ce qui manquait)

  H3 : Repenser l'abord : plage, margelles, integration jardin
  (la rénovation du bassin est l'occasion de repenser l'ensemble de la
  plage et des margelles — synergie avec Les Terres Essentielles /
  Kei-Stone pour les abords minéraux)

H2 : Pourquoi l'automne est la bonne saison

(La logique est simple : intervenir en automne-hiver permet de profiter
de la saison de baignade suivante. Les chantiers sont plus disponibles.
Les propriétaires qui décident en octobre-novembre ont leur piscine rénovée
pour mai. Ceux qui décident en mai ont raté la saison.)

H2 : Le cas particulier de la rénovation haut de gamme

(Rénover une piscine haut de gamme, ce n'est pas seulement repeindre.
C'est l'occasion de la remettre au niveau de ce qu'elle devrait être.
Un revêtement pierre naturelle, un volet immergé fond de fosse, un éclairage
repensé — la rénovation peut transformer radicalement l'ouvrage.)

H2 : Ce qu'Aqua System prend en charge dans une rénovation

(Diagnostic, étanchéité, revêtement, équipements, abords — marché unique,
garantie décennale sur les parties structurelles réalisées. Aqua System
assure aussi les piscines en entretien post-rénovation.)

CTA : "Votre piscine montre des signes — parlons-en avant l'hiver." → /contact/
```

**Points techniques à mobiliser (savoir-faire-facts.md UNIQUEMENT)**
- Volet immergé (4 familles, fond de fosse) : PROUVÉ — §1.4 + §2, ligne 8
- Éclairage d'ambiance : PROUVÉ — §2, ligne 13
- Margelles pierre naturelle / travertin : PROUVÉ — §2, ligne 9
- Filtration (principe) : [À CONFIRMER chiffre exact — mentionner le principe sans revendiquer 5 µm]
- Rénovation : dans le périmètre Aqua System (project-context : "conception, construction, rénovation")
- Garantie décennale : §1.5

**Maillage interne obligatoire**
- Lien → `/piscines-bien-etre/` (ancre : "rénovation de piscine dans les Yvelines et les Hauts-de-Seine")
- Lien → `/contact/` (ancre : CTA + lien dans le corps "diagnostic de votre piscine")
- Lien → `/notre-regard/investissement-piscine-haut-de-gamme/` (A4 — quand publié)

**Meta title** : Rénover une piscine haut de gamme : quand et pourquoi — Aqua System
**Meta description** : Les signes qui imposent une rénovation (et ceux qui ne font que signaler un entretien insuffisant). Le regard du pisciniste, en Yvelines et Hauts-de-Seine.

**Critères 10/10 mesurables**
- [ ] La distinction "rénovation nécessaire vs entretien manquant" est posée clairement en intro
- [ ] Aucun signe de rénovation inventé — tous vérifiables (fissures, liner, test du seau)
- [ ] L'angle saisonnalité automne est argumenté rationnellement
- [ ] Le haut de gamme est traité comme une opportunité de mise à niveau (pas seulement réparation)
- [ ] La synergie margelles / Kei-Stone est mentionnée sobrement
- [ ] Extractibilité GEO : "quand faut-il rénover une piscine ?" → réponse structurée avec signaux

---

## BLOC 4 — WORKFLOW DE PRODUCTION

### 4.1 Pipeline de génération

**Template par type d'article** (3 types définis dans ce programme) :

| Type | Structure | Longueur | Ton dominant |
|---|---|---|---|
| Regard d'expert | Intro → Contexte → Technique → Réalisation → Questions à poser → CTA | 1 400-1 800 mots | Expert discret, ancré local |
| Guide technique | Intro → Définitions → Variables → Explication des composantes → Fourchettes si sourcées → CTA | 1 600-2 000 mots | Expert accessible, factuel |
| Coulisses technique | Intro → Définition précise → Usage quotidien → Réalisation → Anticiper → CTA | 1 200-1 500 mots | Expert proche, concret |

**Prompt calibré brand-voice (à passer à l'IA génératrice)** :

Inclure dans chaque prompt :
- Référence à brand-voice.md §2 (registre soutenu-accessible, 4 traits permanents)
- Référence à savoir-faire-facts.md (techniques PROUVÉES uniquement)
- Interdits explicites : aucun superlatif sans preuve, aucune donnée inventée, aucun cadratin dans les titres, aucun emoji
- Auteur : Nicolas Berg, fondateur Aqua System, 30+ ans Yvelines/92, Socotec CSP/ESP-001
- Structure Hn issue du brief correspondant
- Checklist de validation en fin de prompt

### 4.2 Relecture Nicolas Berg (15 minutes)

Checklist de relecture fondateur :

- [ ] Tous les faits techniques sont exacts et correspondent à ce qu'Aqua System pratique
- [ ] Les réalisations décrites sont identifiées correctement
- [ ] Aucun chiffre (prix, délai, volume) n'est inventé
- [ ] Les points [À CONFIRMER] ont été vérifiés ou supprimés
- [ ] Le ton reflète la façon dont il parlerait à un propriétaire en rendez-vous
- [ ] Pas de promesse non tenue dans les CTAs

Format : Nicolas Berg valide par email à team@sarani.studio. Délai maximum 48h. Si pas de retour sous 48h, l'article est mis en attente — pas publié.

### 4.3 Validation croisée @seo / @copywriter

Avant toute publication, vérification en 10 points :

**Critères SEO**
- [ ] Meta title ≤ 65 caractères, mot-clé principal en première position
- [ ] Meta description ≤ 155 caractères, répond à l'intention, donne envie de cliquer
- [ ] H1 unique, contient le mot-clé principal
- [ ] Au moins 2 liens internes valides (URLs vérifiées)
- [ ] JSON-LD Article complet (author, publisher, datePublished, dateModified, image)
- [ ] Image hero : WebP 1200×630 minimum, alt text descriptif

**Critères brand-voice**
- [ ] Aucun mot de la liste interdite (brand-voice.md §3)
- [ ] Aucune formulation légale proscrite (groupe, filiales, nos sociétés)
- [ ] Ton vérifié : expert discret, ancré, sobre — pas générique

**Critère GEO**
- [ ] Au moins 2 blocs extractibles (question → réponse concise, formulés pour les LLM)

### 4.4 Registre anti-répétition (post-register pattern)

Fichier : `docs/seo/blog-post-register.md` (à créer par @fullstack lors de l'implémentation du blog)

Structure minimale :

```markdown
| # | Date publication | Slug | Sujet | Angle | Mots-clés | Liens internes |
|---|---|---|---|---|---|---|
| A1 | 2026-07-01 | piscine-debordement-terrain-en-pente | Débordement + pente | Contrainte comme atout | piscine à débordement Yvelines | /piscines-bien-etre/, /notre-approche/ |
```

Règle : avant de briefer un nouvel article, vérifier que le sujet ET l'angle ne sont pas déjà couverts dans le registre. Même sujet + nouvel angle = autorisé. Même sujet + même angle = interdit.

### 4.5 Gate qualité avant publication

Un article est prêt à publier si et seulement si :

1. Brief @copywriter suivi à 100 % (structure Hn respectée, longueur dans la fourchette)
2. Validation Nicolas Berg reçue par écrit
3. 10 critères de validation @seo/@copywriter cochés
4. Aucun point [À CONFIRMER] non résolu dans le texte final
5. Image hero présente (WebP, 1200×630 minimum)
6. JSON-LD Article validé (Rich Results Test Google)
7. Enregistrement dans le registre anti-répétition

**Publication interdite** si l'une de ces conditions n'est pas remplie.

---

## Handoff @copywriter

**Ordre de rédaction des 6 premiers articles**

| Priorité | Article | Raison |
|---|---|---|
| 1 | A1 — Débordement terrain en pente | Sujet le plus illustré (photo prouvée), SERP libre, intention claire, lancement du blog |
| 2 | A4 — Prix piscine haut de gamme | PAA n°1 en volume, demande fondateur explicite, article de conviction stratégique |
| 3 | A5 — Piscine + jardin ensemble | Différenciateur unique, espace libre total en SERP, article pilier de la topical authority |
| 4 | A2 — Piscine intérieure | 4 réalisations prouvées, E-E-A-T maximal, sujet niche très qualifiant |
| 5 | A3 — Fond mobile | Réalisation unique, longue traîne très qualifiante, moins urgent en saisonnalité |
| 6 | A6 — Rénovation | Saisonnalité automne (publié 15/09 — délai plus long toléré) |

**Points d'attention transversaux**
- Trophée FPP (A2) : [À CONFIRMER Nicolas Berg] avant de rédiger ce passage — si non confirmé, le H2 est supprimé et remplacé par un paragraphe sur la Certification Socotec + adhésion FPP.
- Norme NF P90-308 sur les fonds mobiles (A3) : vérifier avec Nicolas si applicable aux fonds mobiles ou uniquement aux volets.
- Formulations LTE dans A5 : Grep avant publication sur "groupe", "nos sociétés", "filiales" — rule CLAUDE.md règle commune n°9.
- Fourchettes de prix dans A4 : données publiques sourcées WebSearch 2026-06-12 uniquement — jamais présentées comme les tarifs d'Aqua System.

**Fichiers produits par ce brief**
- `/home/user/Aquasystem/docs/seo/blog-program.md` (ce document)

**Fichiers à créer par @fullstack (implémentation technique)**
- `src/app/notre-regard/page.tsx` — index blog
- `src/app/notre-regard/[slug]/page.tsx` — article individuel
- `src/content/blog.ts` — manifeste des articles
- `src/components/blog/ArticleCard.tsx`, `AuthorBlock.tsx`, `ArticleJsonLd.tsx`
- `docs/seo/blog-post-register.md` — registre anti-répétition

---

*Document produit par @seo — 2026-06-12*
*Sources : keyword-map.md, seo-strategy.md, savoir-faire-facts.md, brand-voice.md, geo-strategy.md, faq-homepage-arbitrage.md, fond-jardins-copy.md, project-context.md*
*SERP WebSearch 2026-06-12 : diffazur.fr, alpinarchi.fr, guide-piscine.fr, geco.fr, leguidepiscine.com, jardipros.com, habitatpresto.com, pagesjaunes.fr, bouchet-piscines.com, homepool.fr, desiles-piscine.fr, piscines-jacques-brens.com, harmonie-piscines.com*
