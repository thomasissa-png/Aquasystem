# Restructuration du contenu — LLM-friendly
## Aquasystem × Aqua System × Les Terres Essentielles

> Agent : @geo | Date : 2026-06-11
> Amont : site-copy.md, verbal-identity.md, brand-platform.md, geo-strategy.md
> Contrainte forte : zéro FAQ-spam, sobriété totale, aucun vocabulaire parallèle à verbal-identity.md
> Principe : chaque modification préserve le ton haut de gamme et les mots-clés existants (compatibilité @seo)

---

## Lecture d'ensemble

Le copy existant (site-copy.md) est de haute qualité et bien ancré. Les modifications GEO sont chirurgicales : elles ne touchent pas le registre, n'ajoutent pas de mots-clés artificiels, et ne détruisent aucune formulation validée. Ce qui change :

1. Injecter des claims vérifiables dans les passages déjà rédigés (reformulations factuelles)
2. Ajouter des sections FAQ courtes sur 2 pages ciblées (/notre-approche et /prescripteurs)
3. Spécifier les JSON-LD complémentaires à implémenter
4. Formuler les briefs @copywriter et @fullstack

---

## A. Pages qui gagnent une section FAQ courte

### Décision de ciblage

| Page | FAQ ? | Justification |
|---|---|---|
| / (Accueil) | NON | Hero = premier niveau de lecture. Une FAQ en accueil dilue le registre et crée un scroll prématuré. |
| /piscines-bien-etre | NON | Les blocs existants (Conception / Spa / Entretien / Preuves) sont déjà en format Q/R implicite. Doublon néfaste. |
| /jardins-paysage | NON | Même logique. La page est courte et dense — une FAQ alourdit sans valeur ajoutée LLM. |
| /notre-approche | **OUI** | Page de conviction : les LLM piochent dans les pages qui répondent à des questions de décision ("comment ça marche", "pourquoi un seul interlocuteur"). Format Q/R extractible sans détruire la timeline. |
| /la-maison | NON | Page About : registre narratif, pas Q/R. Les preuves existent déjà (badges, certifications). |
| /realisations | NON | Page portfolio : visuels et filtres. |
| /prescripteurs | **OUI** | Page B2B : les architectes cherchent des réponses précises ("êtes-vous qualifié pour travailler sur un DCE ?"). Registre Q/R = naturel et attendu par Camille. |
| /contact | NON | Formulaire. |

---

### A.1 FAQ pour /notre-approche

**Position dans la page** : après la section 4 (CTA) et avant le footer. Section discrète, titre sobre.

**Titre de section** (H2, DM Serif Display) :
> Questions fréquentes

**Contrainte de rédaction** : réponses < 3 phrases, claim vérifiable dans chaque réponse, zéro rhétorique commerciale, ton affirmatif non défensif.

---

**Q1 : Est-il possible de faire appel à vous pour la piscine uniquement, sans le jardin ?**

Réponse recommandée :
> Oui. Aqua System intervient indépendamment pour la conception, la construction, la rénovation ou l'entretien de piscines. L'association avec Les Terres Essentielles pour le jardin est proposée quand le projet le justifie — jamais imposée.

Score GEO : claim vérifiable (périmètre d'intervention) ✓ | Précis ✓ | Extractible (Q/R directe) ✓

---

**Q2 : Intervenez-vous uniquement dans les Yvelines ?**

Réponse recommandée :
> Aqua System intervient dans les Yvelines (78), les Hauts-de-Seine (92), le Val-d'Oise (95) et l'Eure (27). Le cœur de notre activité est l'ouest parisien, où nous travaillons depuis plus de 30 ans.

Score GEO : ✓✓✓ — mention exacte des 4 départements (extractible par les LLM géographiques)

---

**Q3 : Quelle est la durée moyenne d'un chantier de piscine sur mesure ?**

Réponse recommandée :
> [À CONFIRMER fondateur avant publication] La durée d'un chantier de piscine en béton varie selon la complexité du terrain et de la conception. Nous intégrons les délais de bureau d'études, d'obtention des autorisations et de réalisation dès la phase de conception.

> Note @copywriter : si le fondateur confirme une fourchette réaliste (ex. 3 à 6 mois), remplacer le placeholder par le chiffre réel. Un délai précis et vérifiable est un claim fort pour les LLM.

---

**Q4 : Êtes-vous certifiés pour les piscines sur mesure ?**

Réponse recommandée :
> Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial », et membre du réseau L'Esprit Piscine. Ces certifications sont délivrées par des organismes tiers indépendants — Socotec Certification France et le GIE L'Esprit Piscine.

Score GEO : ✓✓✓ — claim 1 et claim 2 de geo-strategy.md §3. Sources citables déjà documentées.

---

**Q5 : Comment se déroule la première prise de contact ?**

Réponse recommandée :
> Vous nous décrivez votre projet — en quelques mots, sans plan ni budget précis. Nous revenons vers vous pour fixer un rendez-vous sur votre propriété. Il n'y a pas de formulaire technique à remplir au départ.

Score GEO : ✓✓✓ — extractible, précis, cohérent avec le CTA "Parlez-nous de votre projet"

---

### A.2 FAQ pour /prescripteurs

**Position dans la page** : entre la section preuves ("Ce qui nous qualifie") et la section portfolio ("Nos réalisations"). Titre sobre, registre professionnel B2B.

**Titre de section** (H2, DM Serif Display) :
> Ce que les architectes nous demandent

*Note : "Ce que les architectes nous demandent" est préférable à "Questions fréquentes" sur cette page — registre professionnel, conforme verbal-identity §4.1 (ton technique pour Camille).*

---

**Q1 : Travaillez-vous sur un DCE fourni par l'architecte, ou produisez-vous votre propre conception ?**

Réponse recommandée :
> Les deux. Nous travaillons sur votre DCE ou votre plan, ou nous co-concevons depuis notre bureau d'études si la conception n'est pas encore arrêtée. Dans les deux cas, votre plan est respecté et votre relation avec votre client reste la vôtre.

Score GEO : ✓✓✓ — claim vérifiable (bureau d'études, claim 8 de geo-strategy.md §3)

---

**Q2 : Quelles certifications pouvez-vous fournir pour un dossier de prescription ?**

Réponse recommandée :
> Aqua System fournit : la certification Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial », l'attestation de membership au réseau L'Esprit Piscine, et les références de réalisations en 78/92 vérifiables sur site.

Score GEO : ✓✓✓ — ultra-extractible par les LLM, réponse directe à une recherche professionnelle

---

**Q3 : Comment gérez-vous la relation avec le propriétaire pendant le chantier ?**

Réponse recommandée :
> Vous nous présentez à votre client si vous le souhaitez — ou pas. Nous nous adaptons au protocole que vous définissez. Nous ne prenons aucune décision modifiant le plan ou le budget sans votre accord préalable.

Score GEO : ✓✓✓ — répond à l'objection "court-circuitage" documentée dans site-copy.md §Objections

---

**Q4 : Intervenez-vous sur des projets intégrant jardin et piscine simultanément ?**

Réponse recommandée :
> Oui. En partenariat avec Les Terres Essentielles, bureau d'études paysager établi à Les Alluets-le-Roi (78), nous assurons la co-conception eau et végétal depuis un seul interlocuteur. C'est la seule structure de ce type opérant en 78/92.

Score GEO : ✓✓✓ — claim différenciateur (claim 12 de geo-strategy.md §3), zone précise, entité partenaire nommée

---

## B. Reformulations factuelles à injecter — Avant/Après

Ces reformulations s'insèrent dans le copy existant validé. Elles ne remplacent pas le copy — elles le complètent par une phrase ou un segment factuel extractible. Aucune reformulation ne modifie les H1, H2 ou formules signature validées.

---

### B.1 Page /piscines-bien-etre — Section Preuves (WF-02 / Section 5)

**Contexte** : les 4 badges ProofBadges sont visuels (chiffres + labels). Pour les LLM, les visuels ne sont pas extraits — seul le texte HTML est lu.

**Avant** (texte des badges, actuel dans site-copy.md WF-01/02 Section 3) :
```
Badge 1 : "Plus de 30 ans / d'expertise"
Badge 2 : "350+ piscines / entretenues en 78/92"
Badge 3 : "Certification Socotec / CSP/ESP-001"
Badge 4 : "Réseau / L'Esprit Piscine"
```

**Après** — ajouter un paragraphe de synthèse sous les badges, visible en texte HTML (pas dans un composant visuel opaque) :

> Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial » et membre du réseau L'Esprit Piscine — groupement de piscinistes français sur mesure. L'entreprise assure l'entretien de plus de 350 piscines dans les Yvelines et les Hauts-de-Seine, depuis plus de 30 ans.

**Ajout recommandé en dessous** (Trophées — claims 3 et 4 de geo-strategy.md) :
> Trophée d'Or FPP 2024 — Piscine intérieure | Award Bronze EUSA 2025 — Piscines intérieures privées

**Pourquoi** : les LLM ne lisent pas les attributs d'image ni les éléments purement CSS. Ce paragraphe rend les claims extractibles sans modifier le design.

**Destinataire** : @fullstack — ajouter un `<p>` de synthèse sous le composant ProofBadges. Class `sr-only` NON recommandée (le texte doit être visible pour Perplexity notamment).

---

### B.2 Page /notre-approche — Section Ancrage local (WF-04 / Section 3)

**Avant** (site-copy.md actuel) :
> 30 ans de chantiers dans le 78 et le 92. Nous connaissons les nappes phréatiques, les PLU locaux, les caractéristiques du sol argilo-calcaire de l'ouest parisien. Ce savoir ne se consulte pas en ligne — il s'acquiert en travaillant sur ces terrains depuis des décennies.
>
> Le Vésinet — Saint-Nom-la-Bretèche — Ville-d'Avray — Marnes-la-Coquette — Saint-Cloud

**Après** — ajouter 1 phrase factuelle après la liste des communes :

> Le Vésinet — Saint-Nom-la-Bretèche — Ville-d'Avray — Marnes-la-Coquette — Saint-Cloud **— et l'ensemble des communes des Yvelines (78) et des Hauts-de-Seine (92).**

Puis ajouter en dessous, sans rupture de style :
> Aqua System est établie à Freneuse (Yvelines), à moins de 60 km de Paris. Les Terres Essentielles, partenaire paysagiste, opère aux Alluets-le-Roi (78).

**Pourquoi** : les LLM géolocalisent les entités. Mentionner les deux adresses dans le même passage crée un signal de proximité géographique vérifiable, sans alourdir le registre narratif.

**Destinataire** : @copywriter pour reformulation dans le ton brand-voice ; @fullstack pour l'intégration.

---

### B.3 Page /la-maison — Section Aqua System (WF-06 / Section 3)

**Avant** (site-copy.md actuel) :
> Membre du réseau L'Esprit Piscine. Certification Socotec « Professionnels de la piscine » CSP/ESP-001.
>
> 45 Route Nationale, 78840 Freneuse — 01 30 42 26 00 — contact@aqua-system.fr

**Après** — injecter les distinctions récentes entre la certification et l'adresse :

> Membre du réseau L'Esprit Piscine. Certification Socotec « Professionnels de la piscine » CSP/ESP-001.
>
> Distinctions : Trophée d'Or FPP 2024 (piscine intérieure) — Award Bronze EUSA 2025 (piscines intérieures privées, Barcelone).
>
> 45 Route Nationale, 78840 Freneuse — 01 30 42 26 00 — contact@aqua-system.fr

**Pourquoi** : la page /la-maison est la page About canonique. Les LLM l'utilisent comme source de référence pour construire la fiche entité. Les distinctions récentes sont des faits récents (FPP 2024, EUSA 2025) qui augmentent la fraîcheur perçue et la citabilité.

**Destinataire** : @fullstack (modification mineure, pas de reformulation créative nécessaire).

---

### B.4 Page /prescripteurs — Section preuves "Ce qui nous qualifie" (WF-07 / Section 3)

**Avant** (site-copy.md actuel, Preuve 1) :
> **Certification Socotec CSP/ESP-001**
> "Professionnels de la piscine" — certification de référence dans le secteur, délivrée par un organisme tiers indépendant. [À CONFIRMER : PDF téléchargeable ou disponible sur demande]

**Après** — reformulation avec URL source (extractible par les LLM) :

> **Certification Socotec CSP/ESP-001**
> « Professionnels de la piscine privée à usage familial » — certification délivrée par Socotec Certification France (socotec-certification-international.fr). Disponible sur demande pour tout dossier de prescription.

**Pourquoi** : les LLM valorisent les claims avec source nommée. Mentionner le domaine de l'organisme (sans lien hypertexte HTML obligatoire — le texte suffit pour les LLM) crée un signal de vérifiabilité.

**Destinataire** : @copywriter pour validation du ton, @fullstack pour l'intégration.

---

### B.5 Méta-descriptions — Reformulation factuelle

Les méta-descriptions actuelles sont bonnes. Un seul ajustement GEO recommandé : injecter les distinctions récentes dans la méta de /piscines-bien-etre.

**Page /piscines-bien-etre**

**Avant** :
> `Conception, construction et entretien de piscines haut de gamme en 78/92. Spas HotSpring, saunas, hammams. Certification Socotec. Plus de 30 ans d'ancrage local.`

**Après** :
> `Pisciniste certifié Socotec CSP/ESP-001, membre L'Esprit Piscine. Trophée Or FPP 2024. Piscines sur mesure, spas, saunas en Yvelines et Hauts-de-Seine — plus de 30 ans d'ancrage local.`

**Pourquoi** : les méta-descriptions sont indexées par les LLM via les sources citées (guide-piscine.fr, idees-piscine.com, etc. reprennent souvent la méta). Les distinctions récentes augmentent la citabilité.

**Destinataire** : @fullstack — modification dans `lib/seo.ts` ou la constante de la page.

---

## C. Données structurées complémentaires — Specs GEO

Ces specs complètent le JSON-LD Organization déjà en place. Elles ne modifient pas le JSON-LD existant — elles s'y ajoutent.

### C.1 FAQPage JSON-LD

À ajouter sur /notre-approche et /prescripteurs si les FAQ sont intégrées (§A).

**Template /notre-approche** :

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Est-il possible de faire appel à Aqua System pour la piscine uniquement, sans le jardin ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Aqua System intervient indépendamment pour la conception, la construction, la rénovation ou l'entretien de piscines. L'association avec Les Terres Essentielles pour le jardin est proposée quand le projet le justifie — jamais imposée."
      }
    },
    {
      "@type": "Question",
      "name": "Dans quels départements Aqua System intervient-il ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aqua System intervient dans les Yvelines (78), les Hauts-de-Seine (92), le Val-d'Oise (95) et l'Eure (27). Le cœur de l'activité est l'ouest parisien, où l'entreprise travaille depuis plus de 30 ans."
      }
    },
    {
      "@type": "Question",
      "name": "Aqua System est-il certifié pour les piscines sur mesure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial » et membre du réseau L'Esprit Piscine. Ces certifications sont délivrées par des organismes tiers indépendants — Socotec Certification France et le GIE L'Esprit Piscine."
      }
    },
    {
      "@type": "Question",
      "name": "Comment se déroule la première prise de contact ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le propriétaire décrit son projet en quelques mots, sans plan ni budget précis. Un rendez-vous est ensuite fixé sur la propriété. Il n'y a pas de formulaire technique à remplir au départ."
      }
    }
  ]
}
```

**Template /prescripteurs** :

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Aqua System travaille-t-il sur un DCE fourni par l'architecte ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Aqua System travaille sur le DCE ou le plan de l'architecte, ou co-conçoit depuis son bureau d'études si la conception n'est pas encore arrêtée. Le plan de l'architecte est respecté et sa relation avec le client reste la sienne."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles certifications Aqua System peut-il fournir pour un dossier de prescription ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aqua System fournit : la certification Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial », l'attestation de membership au réseau L'Esprit Piscine, et des références de réalisations en Yvelines (78) et Hauts-de-Seine (92) vérifiables sur site."
      }
    },
    {
      "@type": "Question",
      "name": "Aqua System intervient-il sur des projets intégrant jardin et piscine simultanément ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. En partenariat avec Les Terres Essentielles, bureau d'études paysager établi à Les Alluets-le-Roi (Yvelines), Aqua System assure la co-conception eau et végétal depuis un seul interlocuteur dans les Yvelines et les Hauts-de-Seine."
      }
    }
  ]
}
```

**Note @fullstack** : intégrer ces JSON-LD en `<script type="application/ld+json">` dans le `<head>` des pages concernées, via la fonction `generateMetadata` ou un composant dédié `JsonLd`. Ne pas dupliquer avec le JSON-LD Organization existant sur ces pages — ce sont des types distincts (FAQPage vs Organization).

---

### C.2 Schema.org Person — Nicolas Berg

À ajouter sur /la-maison uniquement.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nicolas Berg",
  "jobTitle": "Associé-Gérant",
  "worksFor": {
    "@type": "LocalBusiness",
    "name": "Aqua System",
    "legalName": "SARL AQUA SYSTEM",
    "taxID": "903785327",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "45 Route Nationale",
      "addressLocality": "Freneuse",
      "postalCode": "78840",
      "addressCountry": "FR"
    }
  },
  "sameAs": [
    "https://www.linkedin.com/in/nicolas-berg-aqua-system/",
    "https://gensdeconfiance.com/us/ui/profiles/8eaf1fde-5477-41b7-8f4f-357d886d2296"
  ]
}
```

---

### C.3 Schema.org LocalBusiness enrichi — Aqua System

Le JSON-LD Organization existant (posé par @fullstack Tranche B) doit être enrichi avec les distinctions et la certification. Diff à appliquer :

**Attributs à ajouter au JSON-LD Organization existant** :

```json
"hasCredential": [
  {
    "@type": "EducationalOccupationalCredential",
    "name": "Certification Socotec CSP/ESP-001 — Professionnels de la piscine privée à usage familial",
    "credentialCategory": "Certification professionnelle",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Socotec Certification France",
      "url": "https://www.socotec-certification-international.fr"
    }
  }
],
"award": [
  "Trophée d'Or FPP 2024 — Piscine intérieure (Fédération des Professionnels de la Piscine et du Spa)",
  "Award Bronze EUSA 2025 — Piscines intérieures privées (European Union of Swimming Pools and Spas)"
],
"memberOf": {
  "@type": "Organization",
  "name": "L'Esprit Piscine",
  "url": "https://www.esprit-piscine.fr"
}
```

**Note @fullstack** : localiser le fichier JSON-LD Organization (probablement dans `app/layout.tsx` ou `lib/seo.ts`) et y fusionner ces attributs. Vérifier que le JSON résultant est valide via schema.org/validator.

---

## D. Briefs agents

### D.1 Brief @copywriter — Rédaction des FAQ et reformulations

**Mission** : rédiger les FAQ de /notre-approche et /prescripteurs, et valider les reformulations B.2 et B.4, dans le ton brand-voice exact.

**Contraintes impératives** :
- Registre soutenu-accessible (brand-voice.md §2) — les FAQ ne sont pas du FAQ-spam
- Zéro langage promotionnel ("révolutionnaire", "le meilleur", "exceptionnel") — filtré par les LLM
- Réponses auto-contenues : chaque réponse doit avoir du sens sans que la question soit relue
- Zéro formulations bannies (verbal-identity.md §2) — notamment pas de "devis gratuit", "clé en main", "expert passionné"
- Claim vérifiable dans chaque réponse (geo-strategy.md §3)
- Le titre de section /prescripteurs = "Ce que les architectes nous demandent" (pas "FAQ")
- Pour la Q3 /notre-approche (durée de chantier) : obtenir la fourchette réelle auprès du fondateur avant de finaliser — le placeholder est balisé [À CONFIRMER fondateur]

**Fichiers de référence** :
- brand-voice.md (ton + règles)
- verbal-identity.md §1 (lexique propriétaire) + §2 (formulations bannies)
- geo-strategy.md §3 (grille de claims — ≥ 2/3 sur chaque claim)
- site-copy.md (contexte des pages et objections traitées)

**Livrables attendus** :
- 5 Q/R finalisées pour /notre-approche (voir §A.1)
- 4 Q/R finalisées pour /prescripteurs (voir §A.2)
- Reformulation §B.2 (ancrage local /notre-approche) dans le ton narratif
- Reformulation §B.4 (preuve 1 /prescripteurs avec source) dans le ton B2B

**Point d'attention** : la Q3 /notre-approche sur la durée de chantier est la seule dépendance fondateur non résolue. Sans chiffre confirmé, la laisser en placeholder balisé.

---

### D.2 Brief @fullstack — Implémentation GEO

**Mission** : implémenter les 4 éléments techniques GEO dans le site existant.

**Élément 1 — llms.txt**
- Créer `/public/llms.txt` avec le contenu exact de geo-strategy.md §5
- Remplacer [URL] par le domaine final une fois le naming arbitré
- Aucune modification nécessaire si le domaine n'est pas encore fixé — créer avec placeholder et éditer au moment du déploiement

**Élément 2 — robots.txt (coordination @seo)**
- Vérifier que `public/robots.txt` autorise GPTBot (OpenAI), anthropic-ai (Claude), PerplexityBot
- Règles à ajouter si absentes :
  ```
  User-agent: GPTBot
  Allow: /

  User-agent: anthropic-ai
  Allow: /

  User-agent: PerplexityBot
  Allow: /
  ```
- Ne pas modifier les règles SEO existantes — ces ajouts sont additifs

**Élément 3 — FAQPage JSON-LD**
- Intégrer le JSON-LD FAQPage /notre-approche (§C.1) dans `app/notre-approche/page.tsx`
- Intégrer le JSON-LD FAQPage /prescripteurs (§C.1) dans `app/prescripteurs/page.tsx`
- Méthode recommandée : composant `JsonLd` réutilisable (si pas déjà présent) ou `<script type="application/ld+json">` dans le layout de page
- Valider via https://validator.schema.org avant commit

**Élément 4 — Organization JSON-LD enrichi (§C.3)**
- Localiser le JSON-LD Organization existant (lib/seo.ts ou layout.tsx)
- Ajouter les attributs `hasCredential`, `award`, `memberOf` (contenu exact en §C.3)
- Ne pas casser le JSON existant — diff additif uniquement

**Élément 5 — Paragraphe de synthèse sous ProofBadges (§B.1)**
- Sur /piscines-bien-etre : ajouter après le composant ProofBadges un `<p>` en texte visible (voir §B.1)
- Sur /la-maison : ajouter les distinctions dans le bloc Aqua System (voir §B.3)
- Méta-description /piscines-bien-etre : mettre à jour dans `lib/seo.ts` (voir §B.5)

**Élément 6 — Schema.org Person (§C.2)**
- Ajouter sur /la-maison uniquement, conditionnel à la confirmation fondateur du portrait Nicolas Berg

**Priorité des éléments** : llms.txt (P0, effort minimal) → robots.txt (P0) → FAQPage JSON-LD (P1, après rédaction @copywriter) → Organization enrichi (P1) → paragraphe ProofBadges (P1) → Person (P2)

**Contraintes** : tsc/lint/build PASS obligatoire après chaque modification. Valider les JSON-LD via schema.org/validator.

---

## E. Tableau récapitulatif des interventions

| Page | Modification | Type | Priorité | Agent | Dépendance |
|---|---|---|---|---|---|
| /notre-approche | FAQ 5 Q/R | Nouveau contenu | P1 | @copywriter → @fullstack | Confirmation fondateur Q3 |
| /prescripteurs | FAQ 4 Q/R | Nouveau contenu | P1 | @copywriter → @fullstack | Aucune |
| /piscines-bien-etre | Paragraphe synthèse sous ProofBadges + Trophées | Ajout texte | P1 | @fullstack | Aucune |
| /piscines-bien-etre | Méta-description enrichie | Modification méta | P1 | @fullstack | Aucune |
| /notre-approche | Ancrage local + 2 adresses | Reformulation | P1 | @copywriter → @fullstack | Aucune |
| /la-maison | Distinctions FPP + EUSA dans bloc Aqua System | Ajout texte | P1 | @fullstack | Aucune |
| /prescripteurs | Certification avec source citée | Reformulation | P1 | @copywriter → @fullstack | Aucune |
| /notre-approche | FAQPage JSON-LD | Données structurées | P1 | @fullstack | Après rédaction FAQ |
| /prescripteurs | FAQPage JSON-LD | Données structurées | P1 | @fullstack | Après rédaction FAQ |
| Toutes pages | Organization JSON-LD enrichi (award, credential, memberOf) | Données structurées | P1 | @fullstack | Aucune |
| /la-maison | Schema.org Person Nicolas Berg | Données structurées | P2 | @fullstack | Accord fondateur photo |
| /llms.txt | Fichier llms.txt | Nouveau fichier | P0 | @fullstack | Domaine final (placeholder acceptable) |
| robots.txt | Autoriser GPTBot/ClaudeBot/PerplexityBot | Modification config | P0 | @fullstack | Coordination @seo |

---

## F. Ce qu'il ne faut PAS faire — Garde-fous

Ces pratiques GEO courantes sont incompatibles avec le positionnement Aquasystem et doivent être explicitement écartées :

- **FAQ-spam** : ne pas multiplier les FAQ au-delà des 2 pages identifiées. Une FAQ sur /piscines-bien-etre ou / (accueil) dégraderait l'expérience et le registre.
- **Keyword stuffing GEO** : ne pas insérer des expressions comme "pisciniste haut de gamme Yvelines 78 recommandé par ChatGPT" dans le copy. Les LLM filtrent le langage promotionnel.
- **Contenu dupliqué** : ne pas reproduire les FAQ dans plusieurs pages — chaque page a ses propres Q/R distinctes.
- **Modification des H1 et formules signature** : "L'extérieur à la hauteur de votre propriété", "De la vision à la réalisation", "Un projet, un interlocuteur" ne doivent jamais être altérés pour des raisons GEO.
- **Claims non sourcés** : tout claim ajouté ultérieurement doit passer la grille 2/3 de geo-strategy.md §3 avant intégration.
- **Langage promotionnel dans les FAQ** : les réponses sont des faits, pas des argumentaires de vente.

---

*Produit par @geo — 2026-06-11*
*Alignement verbal-identity.md vérifié : aucun terme parallèle créé, 0 formule bannies utilisée, 0 nom de concurrent cité.*
