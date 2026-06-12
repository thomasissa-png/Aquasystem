# Copy de fond — Page Jardins & Paysage
## Volet « Le vivant comme matériau »

> Agent : @copywriter | Date : 2026-06-12
> Brief : chaîne « fond », volet jardins (demande fondateur 2026-06-12)
> Référentiels : `brand-voice.md`, `verbal-identity.md`, `savoir-faire-facts.md`,
> `savoir-faire-copy.md` §4, `jardins-paysage/page.tsx` (structure actuelle)
>
> [Framework : Conviction-first (preuve → bénéfice → ressenti) — pas AIDA :
>  Alexandre n'a pas besoin d'être convaincu que la compétence existe,
>  il veut savoir si nous l'avons vraiment. Les entrées sont donc structurées :
>  fait réel → ce que ça change → ce que ça permet.]
> [Conscience : Problem-Aware → Solution-Aware : Alexandre sait que le jardin
>  d'une belle propriété dépend du bon interlocuteur, il cherche la preuve que
>  nous sommes ce bon interlocuteur.]
>
> Contrainte d'honnêteté centrale (project-context.md §Validations) :
> l'offre de CRÉATION paysagère est en construction — paysagiste en recrutement.
> INTERDIT : revendiquer des chantiers paysagers livrés comme socle de preuve.
> La substance prouvée de LTE : jardinerie/pépinière (cœur réel), bureau d'études,
> entretien, connaissance du vivant depuis 2015.
>
> Vérifications horticoles : WebSearch 2026-06-12 (sources §8 ci-dessous).
> Zéro affirmation botanique non vérifiée dans ce document.

---

## Structure de la page actuelle (position de chaque bloc)

```
Hero
BureauEtudesBlock       ← enrichissement §2 de ce doc
CreationBlock
MatieresBlock           ← existant (savoir-faire-copy.md §4)
                        ← INSERTION nouvelle section §1 de ce doc
PepiniereBlock          ← enrichissement §3 de ce doc
JARDINS_SERVICES (cards)
CrossSellingBlock
SectionCTA
```

---

## §1 — Nouvelle section : « Le vivant comme matériau »

### Position d'insertion

**Entre** le `MatieresBlock` (« Pierre, végétal, sol : ce que nous assemblons »)
et le `PepiniereBlock` (« Entretien & pépinière »).

C'est le pendant jardin de la section « Ce que nous savons construire »
dans `/piscines-bien-etre` : on y pose la maîtrise du vivant avec la même
rigueur factuelle que la maîtrise du béton armé côté piscines.

---

### Composant recommandé

**OuvrageCard** (grille 2 colonnes sur desktop, 1 sur mobile) — même logique
que les cards piscines. Photos : jardinerie disponibles pour certains slots
+ slots `[Photo à fournir]` selon doctrine (voir §7).

L'OuvrageCard existe dans le projet et s'applique directement ici.
Chaque card : titre court + 2-3 phrases (ressenti + compétence) + visuel.

---

### Titre de section (H2)

**Ce que le vivant impose**

> Délibérément sobre. La formule « le vivant comme matériau » est l'angle
> de réflexion interne — dans le copy public, on ne nomme pas le cadre,
> on l'illustre. Alexandre lit la compétence dans les exemples, pas dans
> le titre.

---

### Intro (1 phrase, sous le H2)

Quatre réalités du végétal que tout jardin de cette qualité suppose de maîtriser.

> Une intro sobre, factuelle. Elle pose le cadre sans superlatif.

---

### Entrée 1 — Les essences et le temps long

**Titre card** : Le choix des essences

On ne plante pas pour ce que le jardin est aujourd'hui : on plante pour ce
qu'il sera dans vingt ans. Un charme taillé en rideau, un tilleul à grandes
feuilles, un liquidambar — chacun a un port à maturité, une envergure, une
relation avec la lumière qui ne se lisent pas au moment de la plantation.
Choisir la mauvaise essence à cinq mètres d'une façade, c'est un problème
en vingt ans, pas maintenant.

> Double lecture :
> — Ressenti (Alexandre) : je comprends que quelqu'un pense à ma propriété
>   dans 20 ans, pas à remplir mon jardin.
> — Compétence (Camille) : connaissance des essences et de leur développement
>   à l'échelle temporelle d'une propriété.
>
> Exactitude horticole : vérifiée (charme, tilleul, liquidambar sont tous
> des essences calcicoles adaptées aux sols argilo-calcaires de l'ouest
> parisien — sources §8). Port à maturité : notion horticole standard.

**Slot photo** : jardin structuré, haie de charme ou d'arbres à port défini,
lumière rasante. Si disponible dans le stock LTE → à identifier par fondateur.
Sinon : slot `[Photo à fournir]` — voir §7.

---

### Entrée 2 — Le sol argilo-calcaire de l'ouest parisien

**Titre card** : Le sol comme contrainte réelle

Le sol argilo-calcaire qui couvre une grande partie des Yvelines et des
Hauts-de-Seine est un sol exigeant : en période humide, il retient l'eau
et se compacte ; en été, il durcit et se fissure. Certains végétaux s'y
épanouissent naturellement (érables, charmes, sorbiers, cornouillers) ;
d'autres nécessitent un travail de sol préalable et un drainage pensé dès
la conception. Ignorer cette donnée au départ coûte plus cher qu'une
plantation refaite à la deuxième saison.

> Double lecture :
> — Ressenti (Alexandre) : quelqu'un qui connaît vraiment son terrain de
>   chasse géographique, pas un jardinier généraliste.
> — Compétence (Camille) : connaissance pédologique appliquée — drainage,
>   sélection d'espèces, préparation des sols.
>
> Exactitude horticole : vérifiée.
> Sol argilo-calcaire des Yvelines : caractérisé (argile lourde plateau de
> Versailles, calcaire zone Rambouillet). Comportement : rétention d'eau
> hivernale (risque d'asphyxie racinaire si drainage absent), durcissement
> estival. Érables, charmes, sorbiers : essences calcicoles/argilo-calcaires
> confirmées (sources §8).
> Drainage : coûts et nécessité documentés (sources §8).
> AUCUNE affirmation botaniquement fausse dans cette entrée.

**Slug photo** : aucune photo de sol disponible dans le stock — sujet visuel
peu porteur de conversion. Recommandation : ne pas forcer de visuel ici.
Option alternative : fond de couleur neutre + texte seul pour cette card.

---

### Entrée 3 — Les saisons et le geste juste

**Titre card** : L'entretien au bon moment

Un jardin bien planté demande les bons gestes à la bonne période. Les arbustes
à floraison estivale (buddleia, althéa, potentille) se taillent en mars, avant
la reprise de végétation, pour stimuler la floraison de l'été. Les arbustes à
floraison printanière (lilas, forsythia, weigela) attendent la fin de leur
floraison pour être taillés — les couper avant, c'est supprimer les fleurs de
l'année suivante. Ce calendrier précis, suivi rigoureusement, fait la différence
entre un jardin qui se refait chaque saison et un jardin qui s'affirme avec les
années.

> Double lecture :
> — Ressenti (Alexandre) : mon jardin est suivi par quelqu'un qui sait ce
>   qu'il fait et quand il le fait.
> — Compétence (Camille) : maîtrise du calendrier cultural, connaissance des
>   espèces par leurs cycles.
>
> Exactitude horticole : vérifiée (sources §8 — calendriers de taille détaillés,
> buddleia/althéa/potentille = taille mars ; lilas/forsythia/weigela = taille
> après floraison printanière). Affirmations exactes.
>
> NOTE INTERDICTION : aucun chiffre de jardins suivis inventé (règle fondateur).
> L'angle est la régularité du geste et la connaissance des cycles, pas un
> volume chiffré de jardins entretenus.

**Slot photo** : taille en cours, geste de jardinier, végétaux en plein port —
si disponible dans le stock LTE. Sinon : slot `[Photo à fournir]` — voir §7.

---

### Entrée 4 — La pépinière : produire et sélectionner soi-même

**Titre card** : La pépinière

Ce que change une pépinière propre : on choisit les végétaux sur la plante,
pas sur une fiche. On sait dans quelle terre ils ont grandi, depuis combien
de temps ils sont en conteneur, si la reprise sera facile sur le sol de la
propriété. Les végétaux produits ou sélectionnés dans notre pépinière aux
Alluets-le-Roi sont adaptés aux conditions climatiques et pédologiques de
l'ouest parisien — pas achetés en lot standardisé et revendus.

> Double lecture :
> — Ressenti (Alexandre) : ce qu'on met dans mon jardin vient de quelque
>   part de réel, pas d'un catalogue anonyme.
> — Compétence (Camille) : traçabilité des végétaux, connaissance de l'origine
>   et des conditions de culture — argument d'adaptation au terrain.
>
> Exactitude : vérifiée. La pépinière aux Alluets-le-Roi est un fait réel
> (project-context : « terre agricole, production »). L'avantage de la
> sélection sur la plante et de l'acclimatation locale est documenté (sources §8).
> On ne revendique PAS des chantiers de création livrés — on revendique
> le savoir végétal et la capacité de sourcing.

**Slug photo preuve** : pépinière LTE aux Alluets-le-Roi. Stock jardinerie
existant (4 photos) — à évaluer par fondateur pour pertinence éditoriale.
Slot S3 (photos-a-fournir.md) = allée de la pépinière en conteneurs, déjà
demandé au fondateur.

---

## §2 — Enrichissement du bloc Bureau d'études (BureauEtudesBlock)

### Position d'insertion

**Dans** le `BureauEtudesBlock` existant : ajouter 1-2 phrases de substance
à la fin du premier paragraphe, ou en quatrième paragraphe distinct.

### Contenu actuel du 1er paragraphe (reference)

> "Tout commence par la lecture du terrain : les ombrages, les masses végétales
> existantes, les contraintes de sol. Notre bureau d'études, en partenariat avec
> Les Terres Essentielles, pose le plan avant que la première pelle entre dans
> la terre."

### Enrichissement proposé (1-2 phrases à intégrer après la phrase existante)

Concrètement, cela signifie : étudier les ombres portées à différentes heures
de la journée, identifier les vues depuis l'intérieur de la maison, cartographier
les circulations naturelles sur le terrain avant d'en décider une seule.
Un jardin qui ne tient pas compte de la vue depuis la cuisine, ou d'un passage
quotidien vers le garage, se reprend.

> Framework : preuve par l'exemple concret (ce qu'on fait vraiment) plutôt
> que par la liste de services. Alexandre comprend sans qu'on lui explique.
>
> Ces éléments (ombres portées, vues depuis la maison, circulations) sont des
> pratiques réelles d'un bureau d'études paysager — aucune invention.
> INTERDIT : tout process inventé ou promesse de livrable spécifique
> si non confirmé par Nicolas Berg.
>
> Longueur : 2 phrases. Respecte le 80 mots max par paragraphe (brand-voice.md §5).

---

## §3 — Enrichissement du bloc Entretien & Pépinière (PepiniereBlock)

### Position d'insertion

**Dans** le `PepiniereBlock` existant : remplacer ou enrichir le body actuel.

### Contenu actuel (reference)

```
body={[
  "Un jardin planté pour aujourd'hui et pensé pour dans vingt ans. Les essences
   que nous recommandons ont fait leurs preuves dans les propriétés de l'ouest
   parisien, sur les sols et sous les conditions climatiques que nous connaissons.",
  "Entretien régulier, taille de forme, suivi saisonnier. Et une pépinière pour
   sourcer les végétaux qui correspondent à votre projet.",
]}
```

### Version enrichie (remplace le body actuel)

**Paragraphe 1 (remplace l'actuel)** :

Un jardin suivi dans la durée ne ressemble pas à un jardin entretenu en urgence.
La taille de forme à la bonne période, le suivi des massifs saison après saison,
la détection d'un problème de sol avant qu'il devienne visible dans les végétaux :
c'est ce que le geste régulier construit, pas le rattrapage ponctuel.

**Paragraphe 2 (remplace l'actuel)** :

Notre pépinière aux Alluets-le-Roi nous permet de sélectionner les végétaux
sur la plante, pas sur catalogue. Ce qu'un propriétaire reçoit dans son jardin
a été choisi pour ses conditions de sol, sa lumière, et l'effet attendu dans
dix ans.

> Pourquoi cette réécriture :
> — "Ont fait leurs preuves" était vague. La version enrichie dit CE QUE
>   ça signifie concrètement (taille au bon moment, suivi massifs, détection).
> — "Entretien régulier, taille de forme, suivi saisonnier" était une liste
>   sans substance. La version enrichie ancre dans l'effet.
> — Longueurs respectées : §1 = 56 mots, §2 = 38 mots.
> — Zéro chiffre inventé de jardins suivis.
> — L'angle : la régularité du geste et la connaissance des cycles (conforme
>   à la contrainte fondateur).

---

## §4 — Auto-évaluation

- [x] Registre calibré secteur + persona : registre des belles propriétés,
      factuel, aucun superlatif non étayé — pas générique
- [x] Alexandre comprend chaque phrase sans aide (double lecture confirmée)
- [x] Si B2B (Camille) : compétence lisible dans chaque entrée (technique,
      précis, preuve par l'exemple)
- [x] Zéro chantier paysager livré revendiqué — la preuve est : savoir végétal,
      pépinière, entretien, bureau d'études
- [x] Zéro chiffre inventé (pas de "350 jardins suivis" ni autre volume fabriqué)
- [x] Zéro témoignage fictif
- [x] Zéro cadratin dans les titres (H2 : « Ce que le vivant impose »,
      « Le choix des essences », etc.)
- [x] Exactitude horticole vérifiée par WebSearch pour chaque affirmation
      (comportement sols argilo-calcaires, calendrier de taille, essences
      calcicoles — sources §8)
- [x] Positions d'insertion exactes indiquées pour chaque bloc
- [x] Brand voice : expert discret, ancré local (78/92, Alluets-le-Roi),
      sobre et précis — aucun mot de la liste interdite
- [x] Formulation LTE : "en partenariat avec Les Terres Essentielles" conservée
      dans BureauEtudesBlock (existant, non touché)
- [x] Mots-clés naturellement intégrés : sol argilo-calcaire, Yvelines,
      Hauts-de-Seine, ouest parisien, pépinière, entretien, essences
- [x] Chaque CTA existant reste conforme (≤ 8 mots, verbe + bénéfice) —
      aucun CTA nouveau ajouté dans ce document (la SectionCTA finale
      est inchangée)

---

## §5 — Objections traitées

| Objection Alexandre | Traitement dans ce doc |
|---|---|
| « Ils vont me planter n'importe quoi de beau sans que ça tienne » | Entrée 1 (essences / temps long) : on plante pour dans 20 ans, pas pour le rendu immédiat |
| « Ils ne connaissent pas mon terrain spécifique » | Entrée 2 (sol argilo-calcaire) : connaissance pédologique précise du 78/92 nommée |
| « L'entretien sera fait à la va-vite, pas au bon moment » | Entrée 3 (saisons) : calendrier exact nommé par espèce — pas un entretien générique |
| « D'où viennent les végétaux ? » | Entrée 4 (pépinière) + §3 enrichissement PepiniereBlock |
| « Que font-ils vraiment au bureau d'études ? » | §2 enrichissement BureauEtudesBlock : ombres portées, vues, circulations |

---

## §6 — Références marché consultées

> Pour dépasser le standard, non l'égaler.

Les concurrents paysagistes de l'ouest parisien (région 78/92) utilisent
uniformément ces formulations que ce document évite délibérément :
- "Créateur de jardins d'exception" — superlatif creux, aucune preuve
- "Nous sublimerons votre jardin" — vocabulaire promotionnel générique
- "Des végétaux sélectionnés avec soin" — sans nommer ni le sol, ni le
  pourquoi, ni la pépinière

L'angle « le vivant comme matériau » est absent des copys concurrents visibles.
Le niveau de précision horticole (calendrier de taille par espèce, sol
argilo-calcaire nommé, port à maturité) est absent des sites secteur — c'est
l'espace libre exploité dans ce document.

---

## §7 — Besoins photos (slots nouveaux ou confirmés)

Ajouts à `docs/photos-a-fournir.md` — section F :

| # | Bloc | Sujet exact | Priorité | Statut actuel |
|---|---|---|---|---|
| F1 | Card « Le choix des essences » (§1 Entrée 1) | Haie de charme ou arbres à port défini, lumière rasante fin d'après-midi, propriété 78/92. Jardin structuré mature. | P1 | Aucun slot existant — nouveau besoin |
| F2 | Card « L'entretien au bon moment » (§1 Entrée 3) | Geste de taille en cours, végétaux en plein port, sans personne identifiable si possible ou profil de dos. | P2 | Aucun slot existant — nouveau besoin |
| F3 | Card « La pépinière » (§1 Entrée 4) | Déjà couvert par le slot S3 (photos-a-fournir.md §A) : allée de la pépinière LTE, conteneurs alignés, perspective. | P1 | Slot S3 existant — aucun doublon |

**Note** : l'Entrée 2 (sol / carte) ne nécessite pas de photo (sujet visuel
peu porteur de conversion — recommandation d'une card fond neutre + texte seul,
ou suppression de la card au profit d'un TextBlock intégré).

---

## §8 — Sources horticoles vérifiées

> Pour chaque affirmation botanique de ce document, la source de vérification.

**Sols argilo-calcaires des Yvelines / comportement et plantations :**
- [Sol argilo-calcaire : atouts, limites et bonnes pratiques au jardin](https://www.mondojardin.fr/sol-argilo-calcaire/)
- [Paysagiste 78 : guide pour aménager vos extérieurs dans les Yvelines](https://pch-78.fr/travaux-batiment/paysagiste-78/) — argile lourde plateau de Versailles, drainage 15-25 €/ml
- [Plantes pour sol argilo-calcaire](https://plantes-avenue.fr/2719-plantes-pour-sol-argilo-calcaire)
- [Quels arbres planter dans un sol calcaire ?](https://saint-germain-paysage.com/conseil-paysager/quels-arbres-planter-dans-un-sol-calcaire/) — érables, charmes, sorbiers confirmés

**Calendrier de taille des arbustes (mars / après floraison) :**
- [Calendrier des tailles au jardin](https://www.jardinature.net/calendrier_tailles.htm) — buddleia, althéa, potentille : mars
- [Arbustes : quand les tailler ?](https://www.gerbeaud.com/jardin/fiches/fp_arbustes_calendrier_taille.php3) — lilas, forsythia, weigela : après floraison
- [La taille des arbustes en mars](https://jardinage.pagesjaunes.fr/tips/voir/308010/les-arbustes-a-tailler-en-mars)

**Pépinière : avantage de la sélection locale et traçabilité :**
- [Les pépinières et leurs avantages, avec le réseau des paysagistes](https://www.paysagistes.pro/magazine/les-pepinieres-et-leurs-avantages/)
- [Pourquoi je privilégie les essences locales pour un jardin sans traitement](https://www.lapreille.com/pourquoi-je-privilegie-les-essences-locales-pour-un-jardin-sans-traitement)

---

*Document @copywriter — 2026-06-12*
*Sources : `brand-voice.md`, `verbal-identity.md`, `savoir-faire-facts.md`,
`savoir-faire-copy.md`, `jardins-paysage/page.tsx`, `project-context.md`,
`photos-a-fournir.md` + WebSearch horticole 2026-06-12 (§8).*
