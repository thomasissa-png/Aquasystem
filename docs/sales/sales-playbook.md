# Sales Playbook — Nicolas Berg
## Aqua System × Les Terres Essentielles

> Document d'usage interne uniquement. Outille Nicolas Berg en solo, vendeur et fondateur.
> Framework : SPIN Discovery + Challenger LIGHT pour la vente consultative. BANT/MEDDIC écartés (inadaptés au B2C patrimonial sans budget formalisé ni comité de décision structuré).
> Emails = brouillons obligatoires — jamais d'envoi direct (règle commune n°10).
> Dernière mise à jour : 2026-06-11 | Agent : @sales-enablement

---

## Principes directeurs

**Ce playbook outille UN homme de terrain, pas une équipe SDR.**

Nicolas Berg est l'unique vendeur. Son avantage : 30 ans d'expertise locale, une légitimité technique immédiate, une connaissance fine des propriétés 78/92. Son risque : le temps. Chaque étape du pipeline doit maximiser la qualité de l'échange, pas le volume.

**Cycle de vente type :**
- Piscine seule : 4-8 semaines lead → signature [HYPOTHÈSE — à confirmer Nicolas Berg]
- Projet intégré piscine + jardin : 6-12 semaines [HYPOTHÈSE]
- Décision en couple pour Alexandre : toujours impliquer les deux dès la visite

**Frameworks retenus :**
- **SPIN** : pour la découverte (Situation, Problème, Implication, Need-payoff) — extrait l'intention réelle derrière la demande formulaire
- **Challenger LIGHT** : pour la proposition — Nicolas apporte un point de vue expert, pas seulement une réponse à une demande. Il "enseigne" quelque chose à Alexandre sur son propre projet.
- Qualification douce inspirée BANT : Budget et Timeline contextualisés (projet patrimonial, pas achat impulsif)

---

## Pipeline complet — 11 étapes

---

### ÉTAPE 1 — Lead entrant (formulaire / recommandation)

**Objectif :** Réceptionner, qualifier, décider GO/PAUSE/NO en moins d'une heure de lecture.

**Durée :** 5 minutes de lecture du formulaire [HYPOTHÈSE]

**Document :** `lead-qualification.md` — grille de scoring formulaire

**Métrique de conversion :** % leads GO sur leads totaux reçus [HYPOTHÈSE cible : 40-60% des leads formulaire sont dans la zone 78/92 avec budget cohérent]

**Actions Nicolas :**
1. Lire les 4 champs du formulaire : type_projet, commune, budget_tranche, description
2. Appliquer la grille de scoring (cf. `lead-qualification.md`)
3. Classer : GO (répondre sous SLA) / HORS ZONE (répondre courtoisement) / HORS BUDGET (répondre avec orientation)
4. Ouvrir une ligne dans le Google Sheets leads (cf. dashboard-specs) : date, prénom, commune, score, statut

**Automatisation possible :** Cloudflare Function → email de notification Nicolas avec score pré-calculé et suggestion de segment (GO/HORS ZONE/HORS BUDGET) + brouillon de première réponse pré-rempli selon le segment.
- Trigger : soumission formulaire /contact
- Input : type_projet, commune, budget_tranche, description
- Output : email interne Nicolas avec score + gabarit de réponse suggéré
- Logique : commune IN [78, 92] → score +2 ; budget_tranche IN [80_150k, 150k_plus] → score +2 ; description length > 50 chars → score +1 ; type_projet not null → score +1
- Implémentation : @fullstack — extension de functions/api/contact.ts

---

### ÉTAPE 2 — Première réponse (< délai à confirmer)

**Objectif :** Montrer qu'on a LU le projet, pas juste reçu un formulaire. Obtenir un premier échange téléphonique ou email.

**Durée :** 15-20 minutes de rédaction [HYPOTHÈSE]

**SLA recommandé :** [À CONFIRMER Nicolas Berg — voir `lead-qualification.md` §SLA]

**Document :** Gabarit de première réponse (cf. `lead-qualification.md` + `brand-voice.md` §4e)

**Métrique :** Taux de réponse au premier email [HYPOTHÈSE cible : 60-70%]

**Brouillon type — Lead GO (projet qualifié) :**

> [BROUILLON — validation Nicolas avant envoi]
>
> Objet : Votre projet [type + commune si mentionné]
>
> Bonjour [Prénom],
>
> Merci pour votre message.
>
> [Reformulation du projet en 1-2 phrases : reprendre les mots exacts du formulaire, pas un résumé générique]
>
> C'est un projet que nous abordons régulièrement dans le [commune/secteur] — avec les spécificités que ça implique [mentionner 1 contrainte locale pertinente si connue : nappe phréatique, PLU, pente de terrain, végétation existante].
>
> Pour que notre premier échange soit utile, pourriez-vous me préciser [1 question SPIN Situation au maximum] ?
>
> Je vous propose qu'on échange [par téléphone / par email selon préférence indiquée] — je suis disponible [créneau à renseigner].
>
> Nicolas Berg
> Aqua System — 01 30 42 26 00
> [Aquasystem] — L'extérieur à la hauteur de votre propriété.

**Règles :**
- Toujours reformuler le projet (signe qu'on a lu)
- Maximum 1 question de qualification — pas d'interrogatoire
- Jamais "devis" dans la première réponse
- Signature humaine : Nicolas Berg, pas "l'équipe"

---

### ÉTAPE 3 — Qualification douce (téléphone ou email)

**Objectif :** Comprendre si le projet est réel, le timing, qui décide, et si la double expertise intéresse. Scorer pour décider si une visite vaut la peine.

**Durée :** 10-20 minutes de call [HYPOTHÈSE]

**Framework :** BANT adapté au patrimonial

| Dimension | Question adaptée | Signal fort | Signal faible |
|-----------|-----------------|-------------|---------------|
| Budget (B) | "Avez-vous une enveloppe globale en tête pour ce projet ?" | "Plutôt 100 000 €+" ou "on a mis de côté pour ça" | "Le moins cher possible" |
| Autorité (A) | "Est-ce que vous prenez cette décision seul ou en famille ?" | Couple impliqué, décision commune | "C'est ma femme qui décide, je lui transmettrai" |
| Besoin (N) | "Qu'est-ce qui vous a décidé à contacter quelqu'un maintenant ?" | Projet mûri, timing motivé | "On cherche juste des idées" |
| Timing (T) | "Vous pensez à un calendrier pour le chantier ?" | Saison visée, délai > 6 mois = normal | Projet "dans 5 ans" |

**Questions SPIN de qualification douce :**

*Situation :*
- "Vous avez une piscine actuellement, ou c'est un projet de création ?"
- "Le terrain est déjà paysagé ou c'est une réflexion globale ?"
- "Un architecte est impliqué sur votre projet ?"

*Problème :*
- "Qu'est-ce qui vous a freiné jusqu'ici dans ce type de projet ?"
- "Vous avez déjà eu des expériences avec d'autres prestataires ?"

**Règles de qualification :**
- GO visite : commune 78/92 + budget cohérent (> 70 k€) + timing < 18 mois + décision couple impliquée
- PAUSE : hors zone mais réseau prescripteur potentiel → conserver contact
- NO : budget < 40 k€ + hors zone → orientation douce, toujours courtoise

---

### ÉTAPE 4 — Visite sur site

**Objectif :** Voir la propriété, comprendre la vision, initier la relation de confiance. C'est ici que Nicolas fait la différence — pas en salle de réunion.

**Durée :** 1h30-2h [HYPOTHÈSE]

**Participants :** Nicolas + les deux membres du couple si projet Alexandre (impératif)

**Document :** Guide de visite avec questions SPIN développées (ci-dessous)

**Métrique :** Taux visite → avant-projet [HYPOTHÈSE cible : 70-80%]

**Séquence de la visite :**
1. Tour complet de la propriété SANS parler de solutions (20 min) — écouter, observer
2. Questions SPIN Discovery (voir ci-dessous) — 30-40 min
3. Partage de 2-3 réalisations comparables du portfolio (photos réelles) — 15 min
4. Reformulation de la vision Nicolas : "Ce que je comprends de votre projet, c'est..." — 10 min
5. Prochaines étapes : "On peut préparer un avant-projet — ça vous convient ?"

**Questions SPIN Discovery — Visite (Challenger LIGHT) :**

*Situation — comprendre le terrain de jeu :*
- "Comment utilisez-vous cet espace aujourd'hui ?"
- "Qu'est-ce que vous gardez absolument ?"
- "Qui profite le plus de cet extérieur dans la famille ?"
- "Vous avez des contraintes de voisinage ou de PLU dont vous avez connaissance ?"

*Problème — comprendre ce qui coince :*
- "Qu'est-ce qui vous dérange le plus dans l'état actuel ?"
- "Pourquoi maintenant — qu'est-ce qui a changé ?"
- "Vous avez eu des expériences passées avec ce type de projet ? Qu'est-ce qui a bien ou mal marché ?"

*Implication — faire ressentir le coût de l'inaction :*
- "Si ce projet ne se fait pas cet été, ça change quelque chose pour vous ?"
- "La coordination entre plusieurs prestataires, vous avez déjà vécu ça ?"
- [Ne pas insister — l'implication doit émerger naturellement, pas être forcée]

*Need-payoff — projeter dans la solution :*
- "Si on résolvait ça, qu'est-ce que ça vous apporterait concrètement ?"
- "C'est quoi votre image de la réussite de ce projet ?"
- "Qu'est-ce qui vous ferait dire, à la fin du chantier, que vous avez fait le bon choix ?"

**Note Challenger LIGHT :** Nicolas peut introduire 1-2 informations que le prospect ne connaît pas (contrainte technique locale, erreur classique à éviter, approche intégrée vs séparée). Pas pour impressionner — pour montrer qu'on a déjà réfléchi à leur situation spécifique.

---

### ÉTAPE 5 — Avant-projet (bureau d'études)

**Objectif :** Produire un document qui démontre qu'on a COMPRIS avant de proposer. C'est la preuve de l'expertise, pas encore une proposition commerciale.

**Durée :** 1-3 semaines selon complexité [HYPOTHÈSE]

**Intervenants :** Nicolas + bureau d'études Les Terres Essentielles si volet jardin

**Document :** Plans, coupes, moodboard de matériaux — présenté avant la proposition financière

**Métrique :** Taux avant-projet → proposition [HYPOTHÈSE cible : 85-90% — l'avant-projet est le premier filtre naturel]

**Règles :**
- Présenter l'avant-projet en personne — jamais par email seul
- Reformuler l'intention du client au début de la présentation (ses mots, son vocabulaire)
- Montrer l'intégration eau + jardin si applicable — c'est le différenciateur central

---

### ÉTAPE 6 — Proposition

**Objectif :** Formaliser la valeur avec un document qui porte le projet, pas seulement les prix. La proposition doit pouvoir "vendre" en l'absence de Nicolas.

**Durée :** 1 semaine de préparation [HYPOTHÈSE]

**Document :** `proposal-template.md` — trame complète

**Présentation :** En personne, avec les deux membres du couple

**Métrique :** Taux proposition → signature [HYPOTHÈSE cible : 50-65%]

**Structure de présentation :**
1. Rappel de la vision (leurs mots)
2. Parti pris de conception (pourquoi cette approche)
3. Descriptif par postes
4. Planning
5. Investissement par postes
6. Garanties et certifications
7. Prochaines étapes avec date

**Règle :** Ne jamais envoyer la proposition par email sans l'avoir présentée en personne d'abord.

---

### ÉTAPE 7 — Relance élégante

**Objectif :** Maintenir la relation sans pression. Un "non" aujourd'hui peut devenir un "oui" dans 6 mois.

**Durée :** Séquence sur 3-6 semaines selon signal [HYPOTHÈSE]

**Framework :** 3 touches max, espacées, jamais insistantes

**Séquence type :**

*Touch 1 — J+7 après envoi proposition (si pas de retour) :*

> [BROUILLON]
>
> Objet : [Prénom] — votre projet [commune]
>
> Bonjour [Prénom],
>
> Je voulais m'assurer que la proposition vous était bien parvenue et que vous aviez eu le temps d'en prendre connaissance.
>
> Si vous avez des questions sur un poste ou sur le planning, je suis disponible pour qu'on en parle.
>
> Nicolas Berg — 01 30 42 26 00

*Touch 2 — J+21 (si toujours pas de retour) :*

> [BROUILLON]
>
> Objet : Votre projet — un point rapide
>
> Bonjour [Prénom],
>
> Je prends de vos nouvelles sans vous presser. Ces décisions méritent le temps qu'elles prennent.
>
> Si entre-temps vous avez eu de nouvelles questions — sur le planning, sur un aspect technique, sur la manière dont on gère [contrainte spécifique mentionnée en visite] — n'hésitez pas.
>
> Nicolas Berg

*Touch 3 — J+45 (clôture douce, sans relance ultérieure automatique) :*

> [BROUILLON]
>
> Objet : [Prénom] — dernier point de ma part
>
> Bonjour [Prénom],
>
> Je ne veux pas vous solliciter indéfiniment. Si votre projet a pris une autre direction, c'est tout à fait normal.
>
> Si un jour vous souhaitez reprendre la conversation — pour ce projet ou pour un autre — je suis là.
>
> Nicolas Berg — 01 30 42 26 00

**Règle :** Après la touch 3, classer en "nurture passif" dans le Google Sheets. Ne pas relancer de façon proactive — attendre une entrante.

---

### ÉTAPE 8 — Signature et onboarding chantier

**Objectif :** Sécuriser la signature et poser les bases d'un chantier sans friction. C'est ici que la confiance se mérite.

**Durée :** RDV signature + briefing chantier = 1-2h [HYPOTHÈSE]

**Documents :** Devis signé (formulations LTE vérifiées) ; planning de chantier détaillé ; fiche de contacts chantier (interlocuteurs, urgences)

**Vérifications légales obligatoires :**
- Formulation LTE dans le devis : "En partenariat avec Les Terres Essentielles" (pas "notre groupe", pas "nos deux sociétés")
- Garantie décennale : [À CONFIRMER assureur — numéro de police + coordonnées de l'assureur obligatoires avant publication et avant signature de devis incluant des travaux de construction]
- Mention du droit de rétractation si applicable (vente hors établissement — vérifier avec juriste si le RDV chez le client déclenche le droit de rétractation 14j)

**Actions onboarding :**
1. Remettre le planning de chantier par phases
2. Désigner l'interlocuteur chantier (Nicolas lui-même ou chef de chantier désigné)
3. Définir la fréquence des points d'avancement
4. Confirmer les accès propriété, numéros d'urgence, contraintes de voisinage

---

### ÉTAPE 9 — Suivi chantier

**Objectif :** Tenir les délais et les spécifications. Éviter les frustrations documentées dans personas.md (dépassement de budget, interlocuteur qui change, artisan qui dévie du plan).

**Durée :** Durée variable selon chantier [HYPOTHÈSE : 4-16 semaines selon projet]

**Métrique :** % chantiers livrés sans dépassement de délai > 2 semaines [À MESURER — indicateur de réputation]

**Règles de suivi :**
- Point hebdomadaire au client (email ou appel) : avancement, prochaine étape, alerte anticipée si risque de délai
- Toute modification par rapport au plan = accord écrit du client AVANT exécution
- Coordination piscine + jardin gérée en interne — le client ne coordonne pas

**Brouillon point hebdomadaire :**

> [BROUILLON]
>
> Objet : [Prénom] — point chantier semaine [N]
>
> Bonjour [Prénom],
>
> Voici le point de la semaine :
> - Ce qui a été réalisé : [à renseigner]
> - Prochaine étape : [à renseigner] — prévue pour [date]
> - Point d'attention : [si applicable — sinon supprimer cette ligne]
>
> N'hésitez pas si vous avez des questions.
>
> Nicolas Berg

---

### ÉTAPE 10 — Demande d'avis et témoignage

**Objectif :** Capitaliser sur les chantiers réussis pour alimenter le portfolio et obtenir des prescriptions. Timing : 4-6 semaines après la fin du chantier.

**Durée :** 15 minutes de rédaction du message [HYPOTHÈSE]

**Conditions préalables :** Le client est satisfait. Ne jamais demander un avis si la livraison a eu une friction non résolue.

**Brouillon demande d'avis :**

> [BROUILLON]
>
> Objet : Votre avis sur notre travail
>
> Bonjour [Prénom],
>
> Quelques semaines après la fin du chantier, j'espère que vous profitez pleinement de [reformulation courte du projet].
>
> Si vous êtes satisfait de notre travail, votre témoignage aurait beaucoup de valeur pour nous — une phrase sur votre expérience, que nous pourrions utiliser (avec votre accord explicite) sur notre site ou dans nos présentations.
>
> Et si des amis ou des voisins évoquent un projet similaire, je suis à leur disposition — une mise en relation de votre part compte plus que n'importe quelle publicité.
>
> Merci pour votre confiance.
>
> Nicolas Berg — 01 30 42 26 00

**Note sur les avis publics :** Ne jamais utiliser un verbatim sans accord écrit du client, avec mention du contexte d'utilisation autorisé (site web, présentations, réseaux sociaux). Attribuer sous la forme "Propriétaire, [commune]" uniquement.

---

### ÉTAPE 11 — Cross-sell jardin ↔ piscine + entretien récurrent

**Objectif :** Activer les 350 clients entretien comme base de cross-selling. C'est le levier de croissance le plus immédiat, sans acquisition.

**Segment :** Clients actifs en contrat d'entretien piscine → proposition jardin ; ou clients jardin → proposition piscine ou spa

**Timing naturel de cross-sell :**
- Visite d'entretien annuelle → moment de conversation idéal
- Avant la saison (mars-avril) → relance personnalisée
- Après un chantier voisin dans la même commune → signal de quartier

**Brouillon cross-sell entretien → jardin :**

> [BROUILLON]
>
> Objet : [Prénom] — votre extérieur cette saison
>
> Bonjour [Prénom],
>
> En venant faire la mise en route de votre piscine, j'ai remarqué [observation concrète sur l'état du jardin — ne jamais inventer, noter lors de la visite].
>
> Notre maison Les Terres Essentielles travaille sur ce type de projet dans le secteur — si vous souhaitez qu'on passe voir ensemble ce qu'on pourrait faire, c'est avec plaisir.
>
> Nicolas Berg

**Règle :** Le cross-sell est contextuel et observationnel — jamais en rafale à toute la base.

---

## Volet prescripteurs — Camille

### Spécificités du cycle prescripteur

Le cycle Camille est différent du cycle Alexandre :
- **Trigger :** Camille a un client avec un projet, elle cherche un exécutant
- **Décision :** Camille seule (pas de couple) — mais sa réputation est engagée
- **Durée :** Prise de contact → mission possible en 1-3 semaines si urgent
- **Récurrence :** Si premier projet réussi → collaboration continue (5-10 projets/an potentiellement)

### Process de collaboration prescripteur

**Étape A — Premier contact Camille :**
- Souvent via le formulaire /prescripteurs ou par email direct
- Réponse sous [SLA À CONFIRMER — délai court recommandé, ex. 24h ouvrées]
- Ton : pair à pair, pas de posture commerciale

**Étape B — Réunion de présentation (30-45 min) :**
- Présenter : portfolio 78/92, certifications (Socotec), process de collaboration
- Écouter : cahier des charges de Camille, ses clients types, ses contraintes
- Définir : protocole de communication (qui parle au client final, et quand)

**Règle absolue :** Ne jamais contacter le client final de Camille sans son accord préalable. C'est la frustration n°1 documentée dans personas.md.

**Étape C — Protocole de collaboration chantier :**
- Lecture du plan de Camille AVANT toute proposition
- Retours techniques avant exécution (pas d'improvisation)
- Points d'avancement vers Camille (pas vers le client directement)
- Alerte précoce si contrainte technique impacte le plan

**Étape D — Remontée de chantier et co-signature :**
- À la livraison : proposition de photos pour portfolio (accord des deux parties + accord client)
- Co-crédit de réalisation : "Conception : [Cabinet Camille] — Réalisation : Aqua System × Les Terres Essentielles"
- Partage du portfolio réalisé sur LinkedIn (demander accord Camille)

**Brouillon email post-chantier Camille :**

> [BROUILLON]
>
> Objet : [Projet client] — bilan et photos
>
> Bonjour [Prénom],
>
> Le chantier est terminé. Je tenais à vous faire un retour direct avant tout.
>
> [Points factuels : délais tenus / point d'attention à noter si applicable]
>
> Les photos sont disponibles si vous souhaitez les intégrer à votre portfolio — nous pourrions envisager une co-signature si vous l'estimez pertinent.
>
> Merci pour votre confiance sur ce projet. Je serais ravi de collaborer à nouveau.
>
> Nicolas Berg

---

## Automatisations IA recommandées

> Toutes les automatisations produisent des BROUILLONS à valider par Nicolas. Jamais d'envoi automatique.

| Étape | Automatisation | Trigger | Output | Implémentation |
|-------|---------------|---------|--------|----------------|
| Étape 1 | Score lead + brouillon première réponse selon segment | Soumission formulaire /contact | Email interne Nicolas : score + gabarit suggéré par segment | @fullstack — extension functions/api/contact.ts |
| Étape 2 | Brouillon première réponse personnalisé | Score GO confirmé par Nicolas | Email brouillon avec champs à compléter | Prompt template + variables (prénom, commune, type_projet) |
| Étape 7 | Rappel relance J+7, J+21, J+45 | Date d'envoi proposition dans Google Sheets | Alerte Nicolas + brouillon touch correspondante | Google Sheets formule + notification email |
| Étape 9 | Brouillon point chantier hebdo | Fréquence hebdomadaire configurée | Template brouillon avec champs à renseigner | Rappel agenda Nicolas — brouillon manuel à compléter |
| Étape 10 | Rappel demande d'avis J+30 post-livraison | Date de livraison dans Google Sheets | Alerte Nicolas + brouillon demande d'avis | Google Sheets formule |
| Étape 11 | Rappel cross-sell pré-saison | Chaque année : liste clients entretien | Liste clients à contacter + brouillon contextuel | Export Google Sheets mars/avril |

---

## Métriques de pipeline à suivre

> Dans Google Sheets leads — [À CONFIRMER colonnes avec fondateur]

| Étape | Métrique | Fréquence de suivi |
|-------|---------|-------------------|
| Lead entrant | Volume total / % GO / % hors zone / % hors budget | Mensuel |
| Qualification → Visite | Taux de conversion | Mensuel |
| Visite → Avant-projet | Taux de conversion | Mensuel |
| Avant-projet → Proposition | Taux de conversion | Mensuel |
| Proposition → Signature | Taux de conversion + délai moyen | Mensuel |
| Entretien → Cross-sell | % clients entretien ayant un second service | Trimestriel |
| Prescripteurs | Nombre de projets apportés par Camille | Trimestriel |

---

*Fichier produit par @sales-enablement — 2026-06-11*
*Sources : personas.md, brand-platform.md, brand-voice.md, legal-audit.md §B*
*Handoff : @copywriter pour finalisation emails types ; @fullstack pour automatisation scoring lead*
