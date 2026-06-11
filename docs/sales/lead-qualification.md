# Qualification des leads entrants
## Aqua System × Les Terres Essentielles

> Usage interne — outil de qualification par Nicolas Berg uniquement.
> Champs du formulaire source : type_projet (chips optionnels), commune, budget_tranche, description (texte libre obligatoire, 20 chars min).
> Emails = brouillons obligatoires — jamais d'envoi direct (règle commune n°10).
> Dernière mise à jour : 2026-06-11 | Agent : @sales-enablement

---

## Principes de qualification

**Ce qu'on qualifie :** la probabilité que ce lead devienne un projet de la zone 78/92, à un ticket cohérent avec le positionnement (> 70 000 € piscine, > 30 000 € paysage), avec une intention d'achat dans les 18 mois.

**Ce qu'on ne fait jamais :** mépriser un lead hors zone ou hors budget. Un "hors budget" d'aujourd'hui recommande demain. Un "hors zone" peut avoir un cousin en 78. La courtoisie est une règle, pas une option.

**Qui qualifie :** Nicolas Berg seul. La grille est un outil d'aide à la décision rapide — elle ne remplace pas le jugement humain sur la description.

---

## SECTION 1 — Les 4 champs du formulaire

Sources : `functional-specs.md` F-08, `tracking-plan.md` E-01, `arbitrations-p0-checkpoint.md` P0-2/P0-3.

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|------------------|-------------|
| `type_projet` | Chips optionnels (multi-select) | `piscine` / `jardin-paysage` / `renovation` / `entretien` / `je-suis-prescripteur` | Non — qualification douce |
| `commune` | Texte libre | Texte saisi par le prospect | Oui |
| `budget_tranche` | Select unique | `50_80k` / `80_150k` / `150k_plus` / `prefere_discuter` | Non [HYPOTHÈSE — vérifier si obligatoire dans la spec finale] |
| `description` | Texte libre | Min 20 caractères | Oui |

**Rappel nomenclature budget_tranche (arbitrage P0-3) :**
- `50_80k` = "Entre 50 000 € et 80 000 €"
- `80_150k` = "Entre 80 000 € et 150 000 €"
- `150k_plus` = "Plus de 150 000 €"
- `prefere_discuter` = "Je préfère en discuter"

---

## SECTION 2 — Grille de scoring

**Durée d'application :** 2-3 minutes par lead.

**Score total sur 7 points** → détermine le segment.

### Critère 1 — Zone géographique (0-3 points)

| Situation | Points |
|-----------|--------|
| Commune identifiée en 78 (Yvelines) | 3 |
| Commune identifiée en 92 (Hauts-de-Seine) | 3 |
| Commune identifiée en 95 (Val-d'Oise) ou 27 (Eure) | 2 |
| Commune hors zone mais secteur limitrophe identifiable | 1 |
| Commune hors zone sans lien avec le secteur | 0 |
| Commune non mentionnée | 0 — vérifier en réponse |

**Communes de référence haute valeur (78) :** Le Vésinet, Saint-Nom-la-Bretèche, Marnes-la-Coquette, Saint-Cloud, Ville-d'Avray, Chaville, Cernay-la-Ville, Versailles, Marly-le-Roi, L'Étang-la-Ville, Louveciennes, Croissy-sur-Seine, Bougival, Jouy-en-Josas.

**Communes de référence haute valeur (92) :** Neuilly-sur-Seine, Rueil-Malmaison, Sèvres, Meudon, Garches, Vaucresson, La Celle-Saint-Cloud.

### Critère 2 — Budget (0-2 points)

| Budget déclaré | Points |
|---------------|--------|
| `150k_plus` | 2 |
| `80_150k` | 2 |
| `50_80k` + type_projet = piscine seule | 1 (cohérent minimum) |
| `prefere_discuter` | 1 (neutre — pas négatif) |
| `50_80k` + type_projet = projet intégré | 0 (sous le seuil — appeler pour comprendre) |
| Budget non renseigné | 1 (neutre — qualification douce) |

### Critère 3 — Signaux de la description (0-2 points)

Lire la description texte libre. Attribuer 0, 1 ou 2 points selon les signaux présents.

**Signaux forts (+ 2 points si plusieurs présents) :**
- Mention d'une propriété avec terrain (superficie, "ma propriété", "jardin de Xm²")
- Projet mûri : "on réfléchit depuis", "on a un architecte", "on a le permis"
- Calendrier mentionné : "pour l'été prochain", "avant l'automne"
- Demande spécifique (type de bassin, essence végétale, matériau)
- Mention du réseau : "recommandé par", "vos réalisations à [commune]"
- Décision en couple : "mon mari/ma femme et moi"

**Signaux moyens (1 point) :**
- Description générique mais sincère ("on cherche à créer une piscine")
- Budget "prefere_discuter" + description développée
- Prescripteur identifié (chips `je-suis-prescripteur`) = traitement Camille (voir Section 4)

**Signaux faibles / alertes (0 point) :**
- Description très courte (< 30 mots) sans détail
- "Je cherche un devis" sans autre information
- Demande de prix catalogue ou de "bon rapport qualité/prix"
- Mention de comparer plusieurs entreprises pour prix le plus bas

---

## SECTION 3 — Segments et actions

### SEGMENT GO (score 4-7 points)

**Définition :** Lead qualifié pour une première réponse personnalisée et un échange de qualification téléphonique.

**Action Nicolas :**
1. Ouvrir une ligne dans le Google Sheets leads
2. Rédiger et envoyer le brouillon de première réponse GO (voir Section 5A) sous SLA [À CONFIRMER Nicolas Berg]
3. Proposer un échange téléphonique

**Suivi Google Sheets :** Statut = "GO - À contacter"

---

### SEGMENT PRESCRIPTEUR (chips `je-suis-prescripteur` cochée)

**Définition :** Camille ou profil similaire — traitement différent du flux Alexandre. Voir sales-playbook.md §Volet prescripteurs.

**Action Nicolas :**
1. Ouvrir une ligne dans le Google Sheets — colonne Type = "Prescripteur"
2. Rédiger et envoyer le brouillon prescripteur (voir Section 5D)
3. Proposer une réunion de présentation (30-45 min) — pas de qualification téléphonique courte

**Suivi Google Sheets :** Statut = "Prescripteur - À contacter"

---

### SEGMENT HORS ZONE (score 0-1 point sur critère 1 + commune hors 78/92/95/27)

**Définition :** Lead situé hors de la zone de chalandise sans lien géographique avec le réseau.

**Action Nicolas :**
1. Pas de ligne complète dans le Google Sheets — juste une entrée avec statut "HORS ZONE"
2. Répondre avec le brouillon hors zone (voir Section 5B) sous 48h maximum
3. Ne pas proposer de visite ni de qualification

**Règle :** Toujours répondre, toujours courtois. Orienter vers une ressource utile si possible (réseau L'Esprit Piscine pour trouver un professionnel local, par exemple).

---

### SEGMENT HORS BUDGET (score 0-1 point sur critère 2 — budget < seuil sans autre signal fort)

**Définition :** Lead avec budget déclaré `50_80k` sur un projet intégré piscine + jardin, ou signaux de recherche du prix le plus bas.

**Action Nicolas :**
1. Entrée dans Google Sheets avec statut "HORS BUDGET - Nurture"
2. Répondre avec le brouillon hors budget (voir Section 5C) — jamais méprisant, toujours orientant
3. Conserver le contact dans la base nurture — relance possible si réactivation

**Règle :** Un "hors budget" d'aujourd'hui peut recommander demain, ou revenir dans 2 ans avec un projet différent. La réponse doit mériter ce bénéfice du doute.

---

### SEGMENT AMBIGU (score 2-3 points)

**Définition :** Lead avec des signaux contradictoires — zone bonne mais budget faible, ou description vague dans zone correcte.

**Action Nicolas :**
1. Entrée dans Google Sheets avec statut "AMBIGU - À clarifier"
2. Répondre avec le brouillon GO mais avec une question de clarification sur le budget ou le projet
3. Décision GO/HORS BUDGET après la réponse du prospect

---

## SECTION 4 — SLA de réponse

> [À CONFIRMER Nicolas Berg — ces délais sont des recommandations, pas des engagements publics. Ne jamais afficher de délai de réponse sur le site sans confirmation.]

| Segment | SLA recommandé | Justification |
|---------|---------------|---------------|
| GO | Le jour même (ouvré) ou J+1 | Lead chaud — la réactivité est une preuve de sérieux |
| Prescripteur | J+1 (ouvré) | Camille juge la réactivité comme un signal professionnel |
| Ambigu | J+1 à J+2 | Pas d'urgence mais rester dans la fenêtre d'attention |
| Hors zone | J+2 à J+3 | Courtoisie — pas de priorité commerciale |
| Hors budget | J+2 à J+3 | Même traitement courtois |

**Note SLA saison haute (mai-septembre) :** En période de forte demande, le délai GO peut être J+2 si le volume est élevé. Ne pas sacrifier la qualité de la réponse à la rapidité.

---

## SECTION 5 — Gabarits de première réponse

> Tous les gabarits ci-dessous sont des BROUILLONS. Validation Nicolas avant tout envoi. Champs entre [crochets] = à compléter obligatoirement.

---

### 5A — Brouillon GO (projet qualifié)

**Objet :** Votre projet [type si mentionné] — [commune si mentionnée]

---

> [BROUILLON — validation Nicolas avant envoi]
>
> Bonjour [Prénom],
>
> Merci pour votre message.
>
> [Reformulation du projet en 1-2 phrases — reprendre les termes exacts du formulaire. Exemple : "Vous cherchez à créer une piscine sur mesure avec un aménagement paysager cohérent sur votre propriété à [commune]." Ne jamais résumer de façon générique.]
>
> C'est un type de projet que nous menons régulièrement dans ce secteur — [ajouter si pertinent : 1 contrainte ou particularité locale pertinente connue : nappe phréatique, terrain argileux, PLU de la commune, pente, ou réalisation proche].
>
> Pour que notre premier échange soit réellement utile, pourriez-vous me préciser [1 seule question max — choisir selon ce qui manque : "si un architecte est déjà impliqué" / "si vous avez une idée de superficie pour le bassin" / "si le terrain est déjà paysagé ou à créer"] ?
>
> Je vous propose qu'on échange rapidement — par téléphone si vous préférez, ou par email. Je suis disponible [indiquer 1-2 créneaux concrets].
>
> Nicolas Berg
> Aqua System — 01 30 42 26 00
> [Aquasystem] — L'extérieur à la hauteur de votre propriété.

---

**Règles d'usage 5A :**
- Toujours reformuler le projet (jamais de copier-coller du formulaire brut)
- Maximum 1 question — pas d'interrogatoire
- Jamais le mot "devis" dans la première réponse
- Signature humaine : Nicolas Berg, pas "l'équipe"
- Créneau concret : si Nicolas ne peut pas répondre avec un créneau, laisser la ligne vide plutôt que d'écrire "dès que possible"

---

### 5B — Brouillon hors zone

**Objet :** Votre projet — [commune]

---

> [BROUILLON — validation Nicolas avant envoi]
>
> Bonjour [Prénom],
>
> Merci pour votre message.
>
> Notre zone d'intervention principale est centrée sur les Yvelines (78) et les Hauts-de-Seine (92) — [commune mentionnée] ne fait pas partie de notre secteur habituel, et nous ne serions pas en mesure de vous proposer le niveau de suivi que ce type de projet mérite.
>
> Pour trouver un professionnel qualifié dans votre secteur, vous pouvez consulter l'annuaire du réseau L'Esprit Piscine (esprit-piscine.fr) — les membres sont sélectionnés sur des critères de compétence technique.
>
> Je vous souhaite une belle réalisation.
>
> Nicolas Berg
> Aqua System — 01 30 42 26 00

---

**Règles d'usage 5B :**
- Jamais de condescendance
- Toujours une ressource utile (Esprit Piscine est vérifiable et pertinent)
- Court et clair — ne pas s'étendre
- Pas de promesse de rappel ou de "revenez si vous changez de zone"

---

### 5C — Brouillon hors budget

**Objet :** Votre projet — [commune]

---

> [BROUILLON — validation Nicolas avant envoi]
>
> Bonjour [Prénom],
>
> Merci pour votre message.
>
> Votre projet est dans notre zone — [commune] est un secteur où nous travaillons. Avant d'aller plus loin, je voudrais être honnête avec vous sur le budget.
>
> Les projets que nous portons — piscine sur mesure, aménagement paysager intégré — démarrent généralement à partir de [seuil à indiquer selon type de projet — À CONFIRMER Nicolas Berg]. [Si le budget déclaré est significativement en dessous] : si votre enveloppe est sensiblement en dessous, nous ne serions pas le prestataire le plus adapté, et je préfère vous le dire maintenant plutôt que de vous faire venir pour rien.
>
> Si votre budget est flexible ou si je me trompe sur ce que vous aviez en tête, dites-le moi — j'en tiendrai compte.
>
> Nicolas Berg
> Aqua System — 01 30 42 26 00

---

**Règles d'usage 5C :**
- Toujours laisser une porte ouverte (le budget déclaré n'est pas toujours le budget réel)
- Jamais de jugement sur le budget — "l'enveloppe que vous décrivez" pas "c'est trop petit"
- Seuil de budget à indiquer = [À CONFIRMER Nicolas Berg selon type de projet — ne pas inventer ici]
- Court — 100 mots maximum

---

### 5D — Brouillon prescripteur (Camille)

**Objet :** Votre demande — collaboration prescripteur

---

> [BROUILLON — validation Nicolas avant envoi]
>
> Bonjour [Prénom],
>
> Merci pour votre prise de contact.
>
> [Si projet précis mentionné : "Vous mentionnez un projet [type + commune] — c'est un secteur et un type de projet que nous menons régulièrement."] [Si pas de projet précis : "Je suis toujours heureux d'échanger avec des architectes qui cherchent un exécutant fiable dans le 78/92."]
>
> Ce serait utile qu'on se présente mutuellement — 30 minutes en visio ou en présentiel, selon ce qui vous convient. Je vous montrerai notre portfolio dans votre périmètre, nos certifications, et la manière dont nous travaillons avec les maîtres d'œuvre (protocole de communication, respect du cahier des charges, remontée de chantier).
>
> Quelles sont vos disponibilités prochainement ?
>
> Nicolas Berg
> Aqua System — 01 30 42 26 00
> Certification Socotec CSP/ESP-001 — réseau L'Esprit Piscine

---

**Règles d'usage 5D :**
- Ton pair à pair — jamais de posture commerciale
- Proposer une réunion (pas un échange d'emails ou une qualification rapide)
- Mentionner les certifications dès le premier mail (Camille juge ça sur le premier email)
- Signature enrichie (certifications) uniquement pour les prescripteurs

---

## SECTION 6 — Suivi dans le Google Sheets leads

> Référence : dashboard-specs.md §Dashboard 2 (Vue Commerciale)

### Structure recommandée du Google Sheets

| Colonne | Contenu | Format |
|---------|---------|--------|
| Date | Date de réception du formulaire | DD/MM/AAAA |
| Prénom | Prénom du prospect | Texte |
| Nom | Nom du prospect | Texte |
| Commune | Commune déclarée dans le formulaire | Texte |
| Département | 78 / 92 / 95 / 27 / Autre | Menu |
| Type projet | Chips cochées (piscine / jardin / rénovation / entretien / prescripteur) | Texte |
| Budget déclaré | Tranche déclarée dans le formulaire | Menu |
| Score | Score 0-7 calculé selon la grille Section 2 | Nombre |
| Segment | GO / Prescripteur / Hors zone / Hors budget / Ambigu | Menu |
| Statut | À contacter / Contacté / Visite planifiée / Avant-projet / Proposition / Signé / Perdu / Nurture | Menu |
| Date 1ère réponse | Date d'envoi de la première réponse | DD/MM/AAAA |
| Date visite | Si visite planifiée | DD/MM/AAAA |
| Montant estimé | Estimation du projet en € HT | Nombre |
| Notes | Notes libres de Nicolas | Texte |

### Règles de mise à jour

- Chaque lead GO reçoit une ligne dès la qualification
- Mise à jour du statut à chaque étape du pipeline
- Le champ "Notes" est un historique de la relation — chaque interaction clé y est résumée
- Les leads "Nurture" restent dans le Google Sheets — ne jamais supprimer un contact

### Vues recommandées (filtres Google Sheets)

- **Vue active :** Statut IN [À contacter, Contacté, Visite planifiée, Avant-projet, Proposition] → les opportunités vivantes
- **Vue relance :** Statut = "Contacté" + Date 1ère réponse < J-7 → leads sans retour à relancer
- **Vue bilan mensuel :** Filtrer par mois de réception → métriques du mois

---

## SECTION 7 — Automatisation (specs pour @fullstack)

> Objectif : Nicolas reçoit un email interne dès qu'un formulaire est soumis, avec le score pré-calculé et le brouillon suggéré. Il valide, ajuste, envoie. Jamais d'envoi automatique au prospect.

**Trigger :** Soumission POST /api/contact (functions/api/contact.ts)

**Inputs disponibles dans le payload :**
```
prenom_nom: string
email: string
telephone?: string
type_projet?: Array<"piscine" | "jardin-paysage" | "renovation" | "entretien" | "je-suis-prescripteur">
commune: string
budget_tranche?: "50_80k" | "80_150k" | "150k_plus" | "prefere_discuter"
description: string
```

**Logique de scoring (à implémenter côté Function) :**

```
Score = 0

// Critère 1 — Zone géographique (0-3)
communes_78 = ["78", "vésinet", "saint-nom", "versailles", "marly", "louveciennes",
               "croissy", "bougival", "jouy-en-josas", "freneuse", "cernay",
               "saint-cloud", "l'étang-la-ville"]  // liste à compléter
communes_92 = ["92", "neuilly", "rueil", "sèvres", "meudon", "garches", "vaucresson"]
communes_limitrophes = ["95", "27"]

IF commune.includes(communes_78 OR communes_92) → Score += 3
ELSE IF commune.includes(communes_limitrophes) → Score += 2
ELSE IF commune ≠ "" → Score += 1  // commune mentionnée mais hors zone
// Note : matching insensible à la casse, partiel (ex: "saint-nom" matche "Saint-Nom-la-Bretèche")

// Critère 2 — Budget (0-2)
IF budget_tranche IN ["80_150k", "150k_plus"] → Score += 2
IF budget_tranche == "50_80k" AND type_projet includes "piscine" only → Score += 1
IF budget_tranche == "prefere_discuter" → Score += 1
IF budget_tranche == null → Score += 1

// Critère 3 — Signaux description (0-2)
signaux_forts = ["propriété", "terrain", "superficie", "m²", "architecte",
                 "recommandé", "pour l'été", "avant l'automne", "ma femme", "mon mari",
                 "on réfléchit depuis", "on a le permis"]
signaux_faibles = ["devis", "prix le plus bas", "comparer", "moins cher"]

count_forts = count(signaux_forts IN description.toLowerCase())
count_faibles = count(signaux_faibles IN description.toLowerCase())

IF count_forts >= 2 → Score += 2
ELSE IF count_forts == 1 → Score += 1
IF count_faibles >= 1 → Score -= 1  // signal négatif

// Segment final
IF type_projet includes "je-suis-prescripteur" → Segment = "PRESCRIPTEUR" (override)
ELSE IF Score >= 4 → Segment = "GO"
ELSE IF Score == 2 OR Score == 3 → Segment = "AMBIGU"
ELSE IF Score <= 1 AND commune hors zone → Segment = "HORS_ZONE"
ELSE → Segment = "HORS_BUDGET"
```

**Output — Email interne Nicolas :**

```
Objet : [Segment] — Nouveau lead : [prénom_nom] / [commune]

Bonjour Nicolas,

Nouveau formulaire reçu le [date] à [heure].

SCORE : [X/7] → SEGMENT : [GO / AMBIGU / PRESCRIPTEUR / HORS_ZONE / HORS_BUDGET]

DONNÉES DU FORMULAIRE :
- Nom : [prenom_nom]
- Email : [email]
- Téléphone : [telephone ou "non renseigné"]
- Commune : [commune]
- Projet : [type_projet ou "non précisé"]
- Budget : [budget_tranche ou "non précisé"]
- Description : "[description]"

--- BROUILLON DE RÉPONSE SUGGÉRÉ (segment [Segment]) ---
[Gabarit 5A / 5B / 5C / 5D correspondant — pré-rempli avec les variables disponibles]
---

Ce brouillon est une suggestion. Validez et personnalisez avant envoi.

---
Aquasystem — Qualification automatique (brouillon uniquement)
```

**Implémentation :** Extension de functions/api/contact.ts — ajouter après l'envoi de la confirmation prospect :
1. Calculer le score selon la logique ci-dessus
2. Sélectionner le gabarit correspondant au segment
3. Envoyer l'email interne à contact@aqua-system.fr (ou adresse dédiée Nicolas — [À CONFIRMER])
4. L'envoi au prospect (confirmation de réception) reste inchangé

**Contraintes :**
- Zéro PII dans les logs Cloudflare
- L'email interne ne doit PAS contenir les champs téléphone ou email dans les logs (seulement dans l'email)
- Le score et le segment sont loggés pour le reporting mensuel (sans PII)

---

*Fichier produit par @sales-enablement — 2026-06-11*
*Sources : functional-specs.md F-08, tracking-plan.md E-01, arbitrations-p0-checkpoint.md, personas.md, brand-voice.md §4e, dashboard-specs.md*
*Champs du formulaire mappés sur la spec réelle v1.2 — aucune invention*
*Handoff : @fullstack pour automatisation scoring (extension functions/api/contact.ts) ; @copywriter pour révision tonalité des gabarits 5A-5D*
