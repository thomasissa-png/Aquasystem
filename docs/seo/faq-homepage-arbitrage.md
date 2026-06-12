# Arbitrage — FAQ Homepage
## Aquasystem × Aqua System × Les Terres Essentielles

> Agent : @seo | Date : 2026-06-12
> Mission : arbitrage fondateur "manque-t-il une FAQ sur la homepage ?"
> Sources : Google Search Central (officiel), SERP research, content-restructuring.md, faq-geo-copy.md, keyword-map.md, brand-voice.md
> Décision binaire documentée avec données réelles.

---

## 1. État 2026 des FAQ rich results Google — Politique officielle

### Chronologie de la dépréciation

La politique Google sur les rich results FAQPage a évolué en deux temps :

**Août 2023** : Google annonce la restriction des FAQ rich results aux seuls sites gouvernementaux et de santé « de référence ». Pour tous les autres secteurs (incluant les prestataires B2C premium comme Aquasystem), les rich results FAQPage cessent d'apparaître dans les SERPs.

**7 mai 2026** : Google supprime totalement les FAQ rich results. Plus aucun site, y compris les sites gouvernementaux et de santé, ne bénéficie de rich results FAQPage dans la SERP. Le retrait du rapport dans Search Console est prévu en juin 2026, le retrait du support API en août 2026.

Source officielle : [Google Search Central Blog — Changes to HowTo and FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes) + [Google Search Central — FAQPage documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage)

### Ce que FAQPage JSON-LD produit encore en 2026

**Ce qui est mort (rich results SERP)** : la liste déroulante Q/R visible dans la SERP Google — la raison initiale d'utiliser FAQPage. Ce bénéfice SEO direct est nul depuis 2023 pour Aquasystem et nul pour tout le monde depuis mai 2026.

**Ce qui reste vivant (GEO/LLM)** : le FAQPage JSON-LD est activement parsé par les moteurs de réponse IA. En 2025, Google et Microsoft ont confirmé publiquement utiliser les données structurées pour leurs fonctions d'IA générative (AI Overviews, Copilot). ChatGPT Search, Perplexity et les crawlers IA (ClaudeBot, GPTBot, PerplexityBot) extraient le contenu structuré pour former leurs réponses. Une étude 2025 citée par CompleteSEO documente une probabilité de citation 2,5x supérieure pour les pages avec schema correct.

**Conclusion technique** : FAQPage JSON-LD n'est plus un levier SEO au sens rich results. C'est désormais exclusivement un levier GEO (visibilité dans les réponses IA). Ce distinguo est central pour l'arbitrage.

Sources : [SearchEngineJournal — Google Drops FAQ Rich Results](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/) | [CompleteSEO — Why FAQ schema matters for LLM visibility](https://completeseo.com/why-faq-schema-matters-for-llm-visibility/) | [UnoSearch — FAQ schema for LLM citations](https://unosearch.io/blogs/what-is-faq-schema-for-llm-citations/) | [Stackmatix — Optimizing FAQ Schema for Google AI Overviews](https://www.stackmatix.com/blog/optimizing-faq-schema-google-ai-overviews)

### Bing : comportement différent

Bing n'a pas adopté les rich results FAQPage de la même manière que Google. Le FAQPage JSON-LD sur la homepage n'apporte aucun bénéfice SERP visible sur Bing non plus. Les leviers Bing prioritaires pour Aquasystem restent : mot-clé exact en H1/title/P1, IndexNow, signaux sociaux, canonicals absolus — pas le schema FAQ.

---

## 2. Pratique des sites premium comparables — Benchmark réel

### Sites piscinistes haut de gamme analysés

**Diffazur (diffazur.fr)** — leader européen constructeur béton, positionnement premium, site bien référencé. La homepage ne comporte pas de section FAQ. Les FAQ sont isolées en sous-pages de services (/entretien, /construction). La homepage est full visual : portfolio, témoignages, CTA. Aucune Q/R en page d'accueil.

**Lifescape Colorado (lifescapecolorado.com)** — cabinet de paysagisme haut de gamme américain (depuis 1976, positionnement identique Aquasystem : luxury outdoor, piscine + jardin intégrés). Homepage : galerie de réalisations, positionnement, expertise. Aucune FAQ en homepage. Les questions sont traitées dans les pages de services dédiées.

**OPI Design (opidesign.net)** — architectes paysagistes premium. Homepage épurée, visuels dominants, témoignage unique. Aucune section FAQ.

### Observation transversale

Sur les 3 sites premium comparables observés, aucun ne comporte de FAQ en homepage. Le consensus du secteur haut de gamme est cohérent avec la décision antérieure @geo (content-restructuring.md §F) : la homepage est un espace de conviction et d'identification de marque, pas un espace de questions techniques. Les acheteurs premium ne viennent pas en homepage avec des questions opérationnelles — ils y viennent pour ressentir si la marque est à leur niveau.

### Le risque registre documenté (content-restructuring.md §F) — Validé par le benchmark

La décision de @geo d'écarter la FAQ homepage était motivée par le risque de dilution du registre. Ce risque est confirmé par l'observation : les 3 sites premium observés évitent la FAQ homepage non pas par choix SEO mais par cohérence de positionnement. Une FAQ visible en homepage — même sobre — induit un rapport "question / réponse" qui interrompt la dynamique de conviction. L'accueil d'Aquasystem est conçu pour qu'Alexandre se reconnaisse, pas pour répondre à ses doutes.

---

## 3. Analyse de la requête cible — "Peut-on combiner piscine et jardin avec le même prestataire ?"

### Pourquoi cette requête est stratégique

Cette requête (identifiée dans keyword-map.md §Cluster 8 comme PAA P0 : "Peut-on combiner piscine et jardin avec le même prestataire ?") correspond exactement au positionnement différenciateur d'Aquasystem. Elle est émergente — quasi-absente des SERPs actuelles — et représente un espace libre total. C'est la requête qu'un Alexandre formule une fois qu'il a compris qu'un interlocuteur unique est possible.

### Où cette requête est-elle déjà traitée ?

La réponse à cette question existe déjà sur le site, en deux endroits :

**Sur /notre-approche** : FAQ Q1 "Est-il possible de faire appel à Aqua System pour la piscine uniquement ?" répond indirectement (aborde la modularité).

**Sur /prescripteurs** : FAQ Q4 "Intervenez-vous sur des projets intégrant jardin et piscine simultanément ?" répond directement à la version B2B de la même question.

**Sur la homepage** : la tagline, le hero copy et le positionnement umbrella répondent à cette question sans la formuler explicitement — c'est précisément le design voulu pour un site haut de gamme.

### La question prix — "Combien coûte une piscine sur mesure ?"

Cette PAA (keyword-map.md §Cluster 8) est explicitement écartée de l'analyse homepage pour une raison documentée dans la mission : les fourchettes publiées (50k–150k+) viennent du formulaire, pas d'une page publique de tarification. Une Q/R prix sur la homepage sans réponse substantielle serait creuse et contraire aux règles brand-voice. Elle reste allouée à un article blog V2 ou à la FAQ /piscines-bien-etre, pas à la homepage.

---

## 4. RECOMMANDATION BINAIRE

**NON — ne pas ajouter de FAQ sur la homepage.**

### Arguments décisifs

**Argument 1 — SEO : bénéfice nul en 2026.**
Le FAQPage JSON-LD ne produit plus aucun rich result Google depuis mai 2026. Pour les SERP features, la homepage cible les requêtes de Cluster 4 (aménagement extérieur haut de gamme 78, pisciniste paysagiste Yvelines) qui se jouent sur le Local Pack et les balises title/H1/meta — pas sur une section FAQ. Ajouter une FAQ sur la homepage n'améliorerait aucun indicateur SEO Google ni Bing.

**Argument 2 — La requête émergente est déjà couverte, mieux, par la structure existante.**
"Peut-on combiner piscine et jardin avec le même prestataire ?" trouve sa meilleure réponse dans la page /notre-approche (FAQ Q4 /prescripteurs + copy umbrlle homepage). Mettre cette question sur la homepage en format Q/R revient à expliquer quelque chose que le hero et la structure umbrella montrent déjà. Sur un site haut de gamme, montrer vaut mieux qu'expliquer.

**Argument 3 — GEO : la homepage n'est pas la page à optimiser pour cette question.**
Les LLM citent les pages qui répondent le mieux à une question précise. La réponse la plus complète et structurée à la question "intégrateur piscine+jardin" est dans /notre-approche (FAQ Q1 + Q4 prescripteurs + copy de conviction). La homepage, même avec une FAQ, ne rivaliserait pas avec ces pages déjà optimisées pour l'extractabilité. Fragmenter le signal de citabilité entre homepage et /notre-approche dilue la force GEO.

**Argument 4 — Risque registre non-négociable.**
Brand-voice.md §1 définit la homepage comme "posé, légèrement évocateur". Une FAQ interrompt cette dynamique. Le benchmark confirme : 0 site premium comparable n'a de FAQ homepage. La cohérence avec le secteur est un signal de positionnement pour Alexandre.

**Argument 5 — Cannibalisation SEO/GEO.**
Les FAQ existantes (/notre-approche : 4 Q/R, /prescripteurs : 4 Q/R) sont les pages cibles pour les requêtes informationnelles sur le fonctionnement d'Aquasystem. Ajouter une FAQ homepage avec des questions similaires créerait une cannibalisation directe : Google et les LLM ne sauraient plus quelle page prioriser pour ces questions.

### Ce qu'il faut faire à la place

La requête émergente "piscine + jardin + même prestataire" gagne à être renforcée non pas par une FAQ homepage, mais par deux actions ciblées :

1. **Enrichir le copy de la section differentiation homepage** (déjà prévue) avec une formulation qui capte explicitement cette intention : "Un seul interlocuteur pour la piscine et le jardin." (formule déjà en place dans le hero et la section positionnement).

2. **S'assurer que /notre-approche FAQ Q4 des prescripteurs** ("Intervenez-vous sur des projets intégrant jardin et piscine simultanément ?") est bien maillée depuis la homepage via le CTA "Notre approche" — pour que les LLM tracent le chemin depuis la homepage jusqu'à la réponse.

Ces deux ajustements sont non-invasifs, zéro risque registre, et alignés avec la stratégie GEO existante.

---

## 5. Spec d'implémentation pour @fullstack — SI la décision était OUI (documentation de référence future)

> Clause : la recommandation est NON. Cette spec est documentée à titre de référence si le fondateur tranche différemment ou si un test A/B futur est envisagé.

**Composant** : `FaqSection` existant (`src/components/sections/FaqSection.tsx`) — détails/summary natifs, zéro JS.

**Données** : créer `FAQ_HOMEPAGE` dans `src/content/faq.ts`, sur le modèle des constantes `FAQ_NOTRE_APPROCHE` et `FAQ_PRESCRIPTEURS` existantes. Maximum 3 Q/R (pas 4 : la homepage doit rester courte).

**Position dans la page** : bas de page, avant le `ContactCta` final. Fond `bg-background-secondary` (alternance avec la section précédente).

**JSON-LD** : ne PAS ajouter de FAQPage JSON-LD sur la homepage. Le bénéfice rich results est nul. Pour le GEO, les crawlers LLM descendent déjà vers /notre-approche et /prescripteurs qui ont leurs propres FAQPage JSON-LD. Doubler sur la homepage risque de créer un conflit de signal sans apport.

**Zéro modification** aux pages /notre-approche et /prescripteurs — leurs FAQ existantes ne sont pas touchées.

---

## 6. Questions finales SI le fondateur veut quand même tester — Q/R prêtes

> Si après lecture de cet arbitrage le fondateur souhaite tester une FAQ homepage (décision override), voici les 3 questions maximales, dans le ton brand-voice, sans cannibalisation des FAQ existantes.

### Contraintes appliquées
- Questions différentes de celles de /notre-approche et /prescripteurs (zéro cannibalisation)
- Réponses auto-contenues, claims sourcés, aucune donnée inventée
- Pas de question prix (réponse serait creuse — pas de page tarif publique existante)
- Fourchettes budget uniquement depuis les tranches du formulaire (50k–150k+), utilisables car publiques
- Ton brand-voice §2 : soutenu-accessible, expert discret, ancré

---

**Q1 — La requête émergente (espace libre stratégique)**

Question :
> Un même prestataire peut-il concevoir à la fois la piscine et l'aménagement du jardin ?

Réponse :
> Oui — c'est précisément ce que nous faisons. Aqua System (piscines sur mesure, Yvelines et Hauts-de-Seine) et Les Terres Essentielles (bureau d'études paysager, Les Alluets-le-Roi) co-conçoivent depuis un bureau d'études unique. La piscine et le jardin sont pensés ensemble dès le premier plan, pas assemblés après coup.

*Justification : répond à la PAA P0 keyword-map §Cluster 8. Claims : double expertise (claim 8 + claim 12). Formulation LTE vérifiée : "en partenariat avec" implicite dans la structure de la réponse. Zéro cannibalisation : la version /prescripteurs demande "simultanément", ici on demande "le même prestataire" — angle persona Alexandre, pas Camille.*

---

**Q2 — La zone géographique (angle discovery)**

Question :
> Dans quelle zone intervenez-vous pour la conception d'une piscine ou d'un jardin haut de gamme ?

Réponse :
> Notre cœur d'activité est l'ouest parisien : Yvelines (78), Hauts-de-Seine (92), et les communes limitrophes du Val-d'Oise (95) et de l'Eure (27). Aqua System travaille dans cette zone depuis plus de 30 ans.

*Justification : différente de la Q zone /notre-approche ("intervenez-vous uniquement dans les Yvelines ?") — ici l'angle est "haut de gamme" + discovery locale depuis la homepage. Claim 6 (30 ans) + claim 7 (4 départements). Extractible pour les LLM géographiques.*

---

**Q3 — La première conversation (levée de frein d'entrée)**

Question :
> Comment savoir si un projet d'aménagement extérieur haut de gamme entre dans votre périmètre ?

Réponse :
> Un projet piscine sur mesure implique généralement un budget à partir de 70 000 à 80 000 euros — c'est l'ordre de grandeur de nos réalisations dans l'ouest parisien. Pour un jardin ou un projet combiné, les fourchettes varient. Le plus simple est de nous en parler : nous répondons sous 48 heures et proposons un rendez-vous sur votre propriété si le projet s'y prête.

*Justification : utilise les fourchettes publiques du formulaire (50k–150k+ = données publiques). Ne cite pas "devis gratuit" (interdit brand-voice). Répond à "quel est votre ticket minimum" sans page tarif. Note : "48 heures" est désormais validé fondateur (project-context.md §Validations 2026-06-12 point 3). Angle différent de la Q5 /notre-approche ("comment se déroule la première prise de contact") — ici l'entrée est par le budget/périmètre.*

---

## Récapitulatif décisionnel

| Critère | Verdict | Raison |
|---|---|---|
| SEO Google (rich results) | NON | FAQPage totalement déprécié depuis mai 2026 |
| SEO Bing | NON | Aucun rich result FAQPage sur Bing |
| SEO SERP organiques homepage | NON | Les requêtes homepage visent Cluster 4, pas PAA FAQ |
| GEO / LLM citations homepage | NON | /notre-approche + /prescripteurs répondent mieux, plus précisément |
| Cannibalisation SEO/GEO | RISQUE | Questions similaires aux FAQ existantes = signal dilué |
| Registre haut de gamme | NON | Rupture du parcours de conviction Alexandre |
| Benchmark secteur premium | NON | 0/3 sites comparables n'a de FAQ homepage |
| Requête émergente piscine+jardin | COUVERTE | Homepage umbrella + /notre-approche FAQ + maillage CTA |

**RECOMMANDATION FINALE : NON.**

La FAQ homepage est inutile en SEO (mort des rich results), risquée en GEO (dilution du signal déjà fort sur /notre-approche), contradictoire avec le positionnement premium, et inutile pour la requête émergente piscine+jardin qui est déjà traitée mieux ailleurs.

Action requise du fondateur : aucune implémentation. Décision archivée.

---

*Produit par @seo — 2026-06-12*
*Sources consultées : Google Search Central Blog (2023 + 2026), SearchEngineJournal, SearchEngineLand, CompleteSEO, UnoSearch, Stackmatix, Walker Sands, IOVISTA, Diffazur.fr (homepage analysée), Lifescape Colorado (homepage analysée), OPI Design (homepage analysée)*
*Alignement vérifié : keyword-map.md (zéro cannibalisation), content-restructuring.md §F (décision @geo maintenue), faq-geo-copy.md (Q/R IF YES sourcées des mêmes claims), brand-voice.md (formulations et interdits)*
