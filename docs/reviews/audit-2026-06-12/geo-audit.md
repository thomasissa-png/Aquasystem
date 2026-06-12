# Audit GEO — Aquasystem × Aqua System × Les Terres Essentielles
## Citabilité IA du site rendu (src/app + src/content)

> Agent : @geo | Date : 2026-06-12
> Référentiels : docs/geo/geo-strategy.md + docs/geo/content-restructuring.md
> Site audité : https://aquasystem.pages.dev (code dans src/)
> Périmètre : 6 dimensions, claim par claim, entité par entité

---

## Score global : 8,1 / 10

| Dimension | Score | Détail |
|---|---|---|
| D1 — 12 claims sourcés | 9 / 10 | 11/12 présents, 1 partiellement |
| D2 — FAQ citabilité | 8 / 10 | 2 FAQ conformes ; FAQPage JSON-LD présent ; Q3 placeholder absent (attendu) |
| D3 — Entités graphe | 8,5 / 10 | Orthographes correctes ; 1 écart AREA_SERVED ; 1 sameAs incomplet |
| D4 — llms.txt | 9 / 10 | Conforme spec §5 ; URLs provisoires assumées |
| D5 — Structure extractible | 7,5 / 10 | Bonne structure ; 2 gaps chiffrés en badges visuels sans fallback texte accueil |
| D6 — Cohérence claims ↔ contenu | 7 / 10 | 1 claim orphelin partiel (claim 8 bureau d'études — page /jardins-paysage sans preuve textuelle dense) |

---

## Dimension 1 — Les 12 claims sourcés

### Claim 1 — Réseau L'Esprit Piscine
**Présent ?** OUI — multiple  
**Emplacements vérifiés :**
- `/piscines-bien-etre` : paragraphe de synthèse sous ProofBadges (visible HTML) — formulation exacte conforme §B.1
- `/notre-approche` : FAQ Q1 (faq.ts ligne 18) — « membre du réseau L'Esprit Piscine et certifié Socotec CSP/ESP-001 »
- `/prescripteurs` : bloc VALEURS[0] (« Certification Socotec CSP/ESP-001. Membre du réseau L'Esprit Piscine. ») + bloc PREUVES[1]
- `/la-maison` : bloc Aqua System texte (« Membre du réseau L'Esprit Piscine. »)
- `public/llms.txt` : ligne 21 avec URL source esprit-piscine.fr
- `src/lib/seo.ts` : `memberOf` dans organizationJsonLd + `sameAs` esprit-piscine.fr
- **ProofBadges** : figure "L'Esprit Piscine" (texte rendu, pas seulement image)

**Verdict : PASS — présent sur toutes les pages recommandées**

---

### Claim 2 — Certification Socotec CSP/ESP-001
**Présent ?** OUI — multiple  
**Emplacements vérifiés :**
- `/piscines-bien-etre` : paragraphe de synthèse (« certifié Socotec CSP/ESP-001 »)
- `/notre-approche` : FAQ Q3 (faq.ts ligne 26) — formulation avec organismes tiers nommés
- `/prescripteurs` : PREUVES[0] reformulé avec source « socotec-certification-international.fr » (§B.4 PASS)
- `/la-maison` : « Certification Socotec "Professionnels de la piscine" CSP/ESP-001 »
- `public/llms.txt` : lignes 23-25 avec URL source
- `src/lib/seo.ts` : `hasCredential` complet avec `recognizedBy` et URL

**Verdict : PASS — formulation avec source nommée présente sur /prescripteurs conformément à §B.4**

---

### Claim 3 — Trophée Or FPP 2024
**Présent ?** OUI  
**Emplacements vérifiés :**
- `/piscines-bien-etre` : `<p>` distinct lignes 100-104 — texte visible avec entité FPP nommée
- `/la-maison` : « Trophée d'Or FPP 2024 — Piscine intérieure. » (§B.3 PASS)
- `public/llms.txt` : ligne 27 avec URL guide-piscine.fr (source primaire)
- `src/lib/seo.ts` : tableau `award[0]`
- **Accueil (/)** : ABSENT du texte visible (ProofBadges sans trophée — normale, décision design, mais notée)

**Verdict : PASS — présent sur les pages recommandées, URL source dans llms.txt**  
**Note P2** : l'accueil ne mentionne pas les trophées en texte extractible. Impact faible car les LLM piochent rarement dans la page d'accueil pour des claims précis.

---

### Claim 4 — Award Bronze EUSA 2025
**Présent ?** OUI  
**Emplacements vérifiés :**
- `/piscines-bien-etre` : même `<p>` que claim 3 — « Award Bronze EUSA 2025 — Piscines intérieures privées (European Union of Swimming Pools and Spas, Barcelone) »
- `/la-maison` : « Award Bronze EUSA 2025 — Piscines intérieures privées (Barcelone). »
- `public/llms.txt` : ligne 29 avec URL enjeux-piscine.com
- `src/lib/seo.ts` : tableau `award[1]`

**Verdict : PASS**

---

### Claim 5 — 350+ piscines entretenues
**Présent ?** OUI  
**Emplacements vérifiés :**
- `/piscines-bien-etre` : corps MediaSplit (ligne 79) : « Plus de 350 piscines entretenues dans le 78 et le 92 » + paragraphe de synthèse (ligne 97)
- ProofBadges DEFAULT_PROOFS[1] : figure « 350+ », label « piscines entretenues en 78/92 » (texte HTML rendu)
- `public/llms.txt` : « Plus de 350 piscines entretenues dans les Yvelines et les Hauts-de-Seine »

**Verdict : PASS — doublement extractible (corps texte + badge texte + llms.txt)**

---

### Claim 6 — Ancienneté 30+ ans
**Présent ?** OUI — omniprésent  
**Emplacements vérifiés :**
- Accueil : Hero subtitle, meta description
- `/piscines-bien-etre` : Hero subtitle, paragraphe de synthèse
- `/notre-approche` : FAQ Q2, section ancrage local
- `/la-maison` : Hero subtitle, histoire, meta description
- `public/llms.txt` : « exerce depuis plus de 30 ans »
- `src/lib/seo.ts` : description organizationJsonLd

**Formulation** : toujours « plus de 30 ans d'expertise/activité » — jamais « SARL créée depuis 30 ans » (règle respectée, SIREN 903 785 327 = SARL 2021)

**Verdict : PASS — formulation légale respectée sur toutes les occurrences**

---

### Claim 7 — Zone géographique précise (78, 92, 95, 27)
**Présent ?** PARTIELLEMENT  
**Emplacements vérifiés :**
- `/notre-approche` : FAQ Q2 (faq.ts ligne 22) — 4 départements nommés + « ouest parisien »
- `/notre-approche` : section ancrage local (§B.2) — « Yvelines (78) et des Hauts-de-Seine (92) » mais 95 et 27 absents du texte visible
- `public/llms.txt` : « Yvelines 78, Hauts-de-Seine 92, Val-d'Oise 95, Eure 27 » (PASS)
- `src/lib/seo.ts` : `AREA_SERVED = ['Yvelines (78)', 'Hauts-de-Seine (92)']` — **ECART : 95 et 27 absents du JSON-LD**

**Verdict : PASS partiel**  
**Correctif P1** : ajouter Val-d'Oise (95) et Eure (27) à la constante `AREA_SERVED` dans `src/lib/constants.ts`. Actuellement la couverture JSON-LD est tronquée à 78/92. La FAQ /notre-approche est conforme, le JSON-LD ne l'est pas.

---

### Claim 8 — Bureau d'études paysager intégré (Les Terres Essentielles)
**Présent ?** OUI mais concentré  
**Emplacements vérifiés :**
- `/jardins-paysage` : BureauEtudesBlock — texte « Notre bureau d'études — en partenariat avec Les Terres Essentielles — pose le plan avant que la première pelle entre dans la terre » (corps narratif, pas de claim chiffré)
- `/prescripteurs` : VALEURS[0] et PREUVES[3] (« Bureau d'études paysager intégré »)
- `/notre-approche` : étape 2 timeline (« Piscine et jardin conçus ensemble dès le premier plan »)
- FAQ /prescripteurs Q1 (faq.ts) : « co-concevons depuis notre bureau d'études »
- `public/llms.txt` : paragraphe « Partenaire paysage »

**Ecart constaté** : sur /jardins-paysage le claim est noyé dans un corps narratif sans formulation auto-contenue extractible. Le passage manque de la phrase-clé directe recommandée par content-restructuring §A (réponse dans les 40-60 premiers mots).

**Verdict : PASS avec réserve P2**  
**Correctif P2** : ajouter un `<p>` de synthèse extractible sous le BureauEtudesBlock, analogue au paragraphe de synthèse ProofBadges de /piscines-bien-etre. Formulation recommandée : « Les Terres Essentielles dispose d'un bureau d'études paysager intégré à Les Alluets-le-Roi (Yvelines) pour la co-conception de projets extérieurs associant piscine et jardin. »

---

### Claim 9 — Partenaire HotSpring
**Présent ?** OUI  
**Emplacements vérifiés :**
- `/piscines-bien-etre` : SpaBlock, 2e paragraphe — « Partenaire HotSpring pour les spas — une gamme pensée pour le résidentiel haut de gamme. »
- `public/llms.txt` : « Partenaire HotSpring (spas extérieurs résidentiels haut de gamme) »

**Verdict : PASS**

---

### Claim 10 — Adresse et ancrage géographique (Freneuse, < 60 km Paris)
**Présent ?** OUI  
**Emplacements vérifiés :**
- `/notre-approche` : §B.2 « Aqua System est établie à Freneuse (Yvelines, 78840), à moins de 60 km de Paris »
- `/la-maison` : adresse structurée `<address>` + CONTACT.address (45 Route Nationale, 78840 Freneuse)
- `public/llms.txt` : « Adresse : 45 Route Nationale, 78840 Freneuse »
- `src/lib/seo.ts` : PostalAddress + GeoCoordinates (49.0482 N, 1.6008 E) — coordonnées vérifiées

**Verdict : PASS — triplement ancré (texte visible + Schema.org + llms.txt)**

---

### Claim 11 — Profil dirigeant Nicolas Berg
**Présent ?** OUI  
**Emplacements vérifiés :**
- `/la-maison` : portrait photographique (`nicolas-berg-400w.webp`) + figcaption « Nicolas Berg / Associé-Gérant, Aqua System »
- `src/lib/seo.ts` : `nicolasBergJsonLd()` — Person avec jobTitle, sameAs LinkedIn + Gens de Confiance
- `public/llms.txt` : « Dirigeant : Nicolas Berg »
- `src/app/la-maison/page.tsx` : `<JsonLd data={PERSON} />` posé sur la page

**Charte Pro Gens de Confiance** : mentionnée dans geo-strategy §2.3 mais absente du texte HTML visible — uniquement dans le sameAs JSON-LD.

**Verdict : PASS — JSON-LD conforme ; texte visible correct**  
**Note P2** : ajouter une ligne sobre « Signataire de la Charte Pro Gens de Confiance » dans la figcaption ou le corps /la-maison pour rendre le claim extractible en texte.

---

### Claim 12 — Intégration piscine + jardin (différenciateur principal)
**Présent ?** OUI  
**Emplacements vérifiés :**
- Accueil : article LTE (« L'eau et le végétal conçus ensemble — au même bureau d'études, avant le premier plan »)
- `/notre-approche` : étape 2 timeline + section hero (« Comment nous portons un projet d'extérieur de bout en bout »)
- `/notre-approche` : §B.2 (deux adresses dans le même passage — signal géo vérifiable)
- `/prescripteurs` : FAQ Q4 (faq.ts ligne 47) — formulation très extractible avec zones et entité LTE nommée
- `public/llms.txt` : section « Proposition de valeur » — formulation directe et auto-contenue
- CrossSellingBlock sur /piscines-bien-etre et /jardins-paysage

**Verdict : PASS — claim différenciateur le mieux couvert du set**

---

### Récapitulatif claims

| # | Claim | Statut | Priorité correctif |
|---|---|---|---|
| C1 | Réseau L'Esprit Piscine | PASS | — |
| C2 | Certification Socotec CSP/ESP-001 | PASS | — |
| C3 | Trophée Or FPP 2024 | PASS | — |
| C4 | Award Bronze EUSA 2025 | PASS | — |
| C5 | 350+ piscines entretenues | PASS | — |
| C6 | Ancienneté 30+ ans | PASS | — |
| C7 | Zone géographique 78/92/95/27 | PASS partiel | P1 : AREA_SERVED constants.ts |
| C8 | Bureau d'études paysager intégré | PASS avec réserve | P2 : phrase extractible /jardins-paysage |
| C9 | Partenaire HotSpring | PASS | — |
| C10 | Adresse Freneuse / ancrage géo | PASS | — |
| C11 | Profil Nicolas Berg | PASS | P2 : Charte GdC en texte visible |
| C12 | Intégration piscine + jardin | PASS | — |

**Score D1 : 9 / 10** (11 PASS complets, 1 partiel C7)

---

## Dimension 2 — FAQ /notre-approche et /prescripteurs

### /notre-approche — FaqSection

**Format de citabilité (critères ≥ 2/3) :**

| Critère | Statut |
|---|---|
| Réponses < 3 phrases | PASS — Q1: 2 phrases, Q2: 2 phrases, Q3: 2 phrases, Q4: 2 phrases |
| Claim vérifiable dans chaque réponse | PASS — Q1: L'Esprit Piscine + Socotec nommés, Q2: 4 départements, Q3: 2 certifications avec organismes, Q4: processus factuel |
| Zéro rhétorique commerciale | PASS — aucun adjectif promotionnel, registre affirmatif sobre |
| Titre de section | PASS — H2 « Questions fréquentes » (ton DM Serif Display) |
| Position dans la page | PASS — après timeline étape 5 + ancrage local, avant SectionCTA |
| FAQPage JSON-LD | PASS — `<JsonLd data={FAQ_JSONLD} />` dans le `<head>` (via layout), données issues de `faq.ts` |

**Q3 durée de chantier** : absente (placeholder [À CONFIRMER fondateur] non résolu). Décision documentée dans faq.ts commentaire ligne 10. Bonne pratique — règle anti-invention respectée.

**Réponses de /notre-approche — auto-contenance vérifiée :**
- Q1 : ouvre avec « Oui. » — réponse directe dans les 40 premiers mots. Auto-contenu.
- Q2 : ouvre par « Aqua System intervient dans les Yvelines (78)... » — entité + géographie dans les 20 premiers mots.
- Q3 (certifications) : « Aqua System est certifié Socotec... » — entité + claim dans les 10 premiers mots.
- Q4 (contact) : commence par le processus côté client. Auto-contenu.

**Note technique** : FaqSection utilise `<details>/<summary>` natif sans JS, conforme instruction content-restructuring §F (zéro accordéon lourd). Le texte des réponses est dans un `<p>` visible (pas sr-only) — extractible par Perplexity.

**Verdict /notre-approche : PASS**

---

### /prescripteurs — FaqSection

**Format de citabilité :**

| Critère | Statut |
|---|---|
| Réponses < 3 phrases | PASS — 4 Q/R, 2 phrases max chacune |
| Claim vérifiable | PASS — Q1: bureau d'études nommé, Q2: Socotec + Esprit Piscine + Alluets-le-Roi |
| Zéro rhétorique commerciale | PASS |
| Titre de section | PASS — H2 « Ce que les architectes nous demandent » (ton B2B, recommandé §A.2) |
| Position dans la page | PASS — entre section PREUVES et portfolio |
| FAQPage JSON-LD | PASS — `<JsonLd data={FAQ_JSONLD} />` posé dans le head |

**Réponses auto-contenues :**
- Q1 (DCE) : commence par « Les deux. » — réponse directe.
- Q2 (certifications) : commence par « Nous fournissons la certification Socotec... » — claim au premier mot.
- Q3 (relation propriétaire) : commence par « Vous nous présentez... » — processus factuel direct.
- Q4 (jardin + piscine) : commence par « Oui. En partenariat avec Les Terres Essentielles, bureau d'études paysager établi aux Alluets-le-Roi (Yvelines, 78) » — entité + géographie + claim dans les 20 premiers mots. Meilleure formulation du set.

**Ecart mineur** : Q2 liste 3 éléments en une seule phrase longue (Socotec + L'Esprit Piscine + références). Reste < 3 phrases. Extractibilité préservée.

**Verdict /prescripteurs : PASS**

**Score D2 : 8 / 10** (retrait de 2 pts : Q3 durée de chantier attendue mais absente et dépendance fondateur non résolue — pas une anomalie mais une lacune de citabilité sur ce créneau de requête précis)

---

## Dimension 3 — Entités du graphe : présence et orthographe

### 3.1 Aqua System
| Mention | Orthographe constatée | Verdict |
|---|---|---|
| Texte HTML visible (hero, corps) | « Aqua System » — espace présent | PASS |
| JSON-LD `name` (seo.ts L47) | « Aqua System » | PASS |
| llms.txt | « Aqua System » | PASS |
| `CONTACT.editor` (constants.ts) | « SARL AQUA SYSTEM » (forme légale) | PASS |
| ProofBadges | Pas de mention nominale — figure « Socotec » / « L'Esprit Piscine » | Neutre |
| sameAs | esprit-piscine.fr/aqua-system/ + LinkedIn | PASS |

### 3.2 Les Terres Essentielles
| Mention | Orthographe constatée | Verdict |
|---|---|---|
| Texte HTML visible | « Les Terres Essentielles » (avec majuscules) | PASS |
| JSON-LD `name` (seo.ts L127) | via `PARTNER_CONTACT.name = PARTNER_NAME` = « Les Terres Essentielles » | PASS |
| llms.txt | « Les Terres Essentielles » | PASS |
| Formule légale | « en partenariat avec Les Terres Essentielles » — visible sur /la-maison, /jardins-paysage, /piscines-bien-etre | PASS |
| `sameAs` LTE | `SOCIAL_LINKS.facebookLTE` uniquement | **ECART P1** — Facebook seul. Manquent : site propre (inexistant), fiche Pappers/Société.com. Acceptable en V1 mais limite la fiabilité du graphe LTE pour les LLM. |

### 3.3 L'Esprit Piscine
| Mention | Orthographe | Verdict |
|---|---|---|
| Texte HTML visible (multiple pages) | « L'Esprit Piscine » | PASS |
| JSON-LD `memberOf.name` (seo.ts L108) | « L'Esprit Piscine » | PASS |
| llms.txt | « L'Esprit Piscine (GIE de piscinistes français sur mesure) » | PASS |
| ProofBadges figure | « L'Esprit Piscine » | PASS |

### 3.4 Socotec CSP/ESP-001
| Mention | Orthographe | Verdict |
|---|---|---|
| Texte HTML (multiple) | « Socotec CSP/ESP-001 » | PASS |
| JSON-LD `hasCredential.name` | « Certification Socotec CSP/ESP-001 — Professionnels de la piscine privée à usage familial » | PASS |
| Organisme source nommé | « Socotec Certification France » dans JSON-LD + page /prescripteurs | PASS |

### 3.5 Zones géographiques 78/92
| Mention | Verdict |
|---|---|
| « Yvelines (78) » et « Hauts-de-Seine (92) » dans texte | PASS |
| « Val-d'Oise (95) » et « Eure (27) » dans texte FAQ | PASS |
| `AREA_SERVED` JSON-LD | **ECART P1** — seulement 78 et 92 (cf. claim 7) |
| Communes (Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray, Marnes-la-Coquette, Saint-Cloud) | PASS — présentes sur /notre-approche et /prescripteurs |

### 3.6 Freneuse
| Mention | Verdict |
|---|---|
| Texte HTML visible | PASS — /notre-approche §B.2, /la-maison titre |
| PostalAddress JSON-LD | PASS — « Freneuse », postalCode « 78840 » |
| GeoCoordinates | PASS — 49.0482 N, 1.6008 E vérifié |
| llms.txt | PASS |

### 3.7 Nicolas Berg
| Mention | Verdict |
|---|---|
| Texte HTML visible (/la-maison) | PASS — figcaption + corps |
| Person JSON-LD | PASS — jobTitle, sameAs LinkedIn + Gens de Confiance |
| llms.txt | PASS — « Dirigeant : Nicolas Berg » |

**Score D3 : 8,5 / 10**
Deux écarts P1 : AREA_SERVED tronquée (95 et 27 absents JSON-LD) + sameAs LTE limitée à Facebook.

---

## Dimension 4 — llms.txt

**Fichier** : `public/llms.txt`

**Vérification contre la spec geo-strategy.md §5 :**

| Élément spec §5 | Présent dans public/llms.txt | Verdict |
|---|---|---|
| Entité principale (SIREN, adresse, activité, dirigeant) | OUI — lignes 12-17 | PASS |
| Certifications avec URL sources | OUI — 4 items lignes 20-29 | PASS |
| Données clés (350+, HotSpring, Dolphin, équipe 8, adresse complète) | OUI — lignes 32-37 | PASS |
| Partenaire paysage (LTE, SIREN, adresse, proposition de valeur) | OUI — lignes 40-48 | PASS |
| Proposition de valeur extractible | OUI — lignes 51-54 | PASS |
| Contenus prioritaires avec URLs | OUI — lignes 57-63 (URLs provisoires assumées) | PASS |
| Requêtes cibles | OUI — lignes 66-74 | PASS |
| Timestamp « Dernière mise à jour » | OUI — ligne 3 : 2026-06-11 | PASS |

**URLs provisoires** : le fichier utilise `https://www.aquasystem.fr/...` (domaine fallback provisoire), avec note @fullstack en commentaire lignes 6-8. Comportement attendu — non bloquant au stade naming différé.

**Note sur le format** : llms.txt suit la convention adopte par Anthropic/Stripe/Cloudflare (sections `##` + bullet points). Conforme. Aucune section promotionnelle (zéro « révolutionnaire », « meilleur »).

**Fraîcheur** : daté 2026-06-11 — à mettre à jour lors de chaque modification de claim (protocole mensuel).

**Score D4 : 9 / 10** (retrait de 1 pt pour URLs provisoires — non bloquant mais à corriger au lancement réel)

---

## Dimension 5 — Structure extractible

### 5.1 Listes et données chiffrées en texte HTML

| Élément | Page | Format | Extractible ? |
|---|---|---|---|
| 350+ piscines entretenues | /piscines-bien-etre ProofBadges | `<span>` texte dans `<li>` | PASS |
| 30+ ans expertise | ProofBadges DEFAULT | `<span>` texte | PASS |
| Certifications (Socotec, L'Esprit Piscine) | ProofBadges DEFAULT | `<span>` texte | PASS |
| Trophées FPP + EUSA | /piscines-bien-etre §B.1 | `<p>` visible (pas sr-only) | PASS |
| Timeline 5 étapes | /notre-approche | `<ol><li>` ordonné | PASS |
| 3 blocs valeur | /prescripteurs | `<article><h2>+<p>` | PASS |
| 4 preuves | /prescripteurs PREUVES | `<ul><li>` | PASS |
| FAQ (réponses) | /notre-approche + /prescripteurs | `<p>` dans `<details>` | PASS — contenu dans le DOM, pas masqué JS |
| Adresses structurées | /la-maison | `<address>` sémantique | PASS |
| Communes liste | /notre-approche | Texte itéré via `COMMUNES.join(' — ')` | PASS |

**Gap identifié — accueil (/) :**
La section 3 « Preuves » de l'accueil affiche les ProofBadges sans paragraphe de synthèse (contrairement à /piscines-bien-etre qui a le `<p>` de synthèse §B.1). Les LLM qui extraient depuis l'accueil voient les badges texte, mais pas la formulation synthétique « certifié Socotec CSP/ESP-001 et membre du réseau L'Esprit Piscine ». Impact modéré (l'accueil est moins extrait que les pages de profondeur).

**Gap identifié — /jardins-paysage :**
Page sans données chiffrées en texte (ProofBadges jardins = « Bureau d'études », « Pépinière propre », « Jardinerie & expertise depuis 2015 »). Les corps narratifs sont bons mais aucune phrase de synthèse extractible sur le bureau d'études (cf. claim 8 — correctif P2 recommandé).

### 5.2 Définitions extractibles

| Définition | Page | Verdict |
|---|---|---|
| Qu'est-ce qu'Aqua System | llms.txt + organizationJsonLd description | PASS |
| Qu'est-ce que L'Esprit Piscine | llms.txt (« GIE de piscinistes français sur mesure ») | PASS — formulation auto-contenue |
| Qu'est-ce que CSP/ESP-001 | FAQ /notre-approche Q3 + /prescripteurs Q2 | PASS |
| Qu'est-ce que Les Terres Essentielles | llms.txt §Partenaire paysage | PASS |

### 5.3 Données chiffrées absentes du texte (seulement dans les images)

Vérification des `<img>` alt texts dans le portfolio :
- Alt texts de `realisations.ts` (14 fiches) : 100% factuels (lieu, type de piscine, matériaux) — signal marque+zone présent. Les données chiffrées (prix, surface) sont correctement ABSENTES (zéro invention CLAUDE.md n°2). Pas d'anomalie.
- Photos jardinerie : alts factuels (« serre de la jardinerie ») — PASS.

**Score D5 : 7,5 / 10**
Pertes : absence du `<p>` de synthèse sur l'accueil (impact modéré) + /jardins-paysage sans claim extractible dense pour le bureau d'études (impact modéré sur la requête « paysagiste haut de gamme 78 »).

---

## Dimension 6 — Cohérence claims ↔ réalité du site

### 6.1 Claims orphelins détectés

**Claim orphelin partiel — Claim 8 (bureau d'études LTE sur /jardins-paysage)**
- La page /jardins-paysage mentionne le bureau d'études dans le corps narratif mais ne dispose pas de la formulation auto-contenue spécifiée en §A. Le visiteur humain comprend l'offre ; un LLM extrayant un passage isolé de BureauEtudesBlock ne recevra pas la phrase-clé « Les Terres Essentielles dispose d'un bureau d'études paysager intégré à Les Alluets-le-Roi ». Ce n'est pas un claim orphelin au sens strict (le claim est présent en llms.txt et sur /prescripteurs) mais la page la plus attendue (par le type de requête) manque de densité.

### 6.2 Claims cohérents avec le contenu réel

| Claim | Contenu correspondant existe ? | Verdict |
|---|---|---|
| C1 : membre L'Esprit Piscine | Fiche esprit-piscine.fr/aqua-system/ réelle | PASS |
| C2 : certifié Socotec CSP/ESP-001 | Source externe vérifiable | PASS |
| C3 : Trophée FPP 2024 | Source guide-piscine.fr dans llms.txt | PASS |
| C4 : EUSA 2025 | Source enjeux-piscine.com dans llms.txt | PASS |
| C5 : 350+ piscines | Chiffre marque publié (confirmé fondateur) | PASS |
| C6 : 30+ ans activité | Formulation « activité », pas « société » — légalement juste | PASS |
| C7 : zones 78/92/95/27 | Esprit Piscine confirme les 4 zones | PASS |
| C8 : bureau d'études LTE | project-context.md fondateur + copy validé | PASS |
| C9 : partenaire HotSpring | aqua-system.fr/votre-piscine + copy | PASS |
| C10 : adresse Freneuse | Google Business + Pages Jaunes | PASS |
| C11 : Nicolas Berg dirigeant | Pappers + LinkedIn | PASS |
| C12 : intégration eau+jardin | Promesse fondateur validée | PASS |

**Aucun claim ne pointe vers un contenu absent.**

### 6.3 Vérification des formulations interdites dans le contenu livré

Recherche des patterns interdits (verbal-identity §2) :
- « révolutionnaire » : absent — PASS
- « leader du marché » : absent — PASS
- « best-in-class » : absent — PASS
- « clé en main » : absent — PASS
- « devis gratuit » : absent — PASS
- « expert passionné » : absent — PASS
- Témoignages fictifs : absents — PASS (règle anti-fictif CLAUDE.md n°2)

**Score D6 : 7 / 10**
Retrait de 3 pts : 1 point pour le claim orphelin partiel C8 sur la page la plus ciblée (/jardins-paysage), 1 point pour l'absence du `<p>` de synthèse sur l'accueil (deux points d'entrée LLM sous-optimisés), 1 point pour AREA_SERVED JSON-LD tronquée.

---

## Synthèse des correctifs

### P0 — Aucun correctif bloquant identifié

Le site est en état de déploiement pour la visibilité IA. Aucun claim mal sourcé, aucune désinformation injectée, aucun JSON-LD invalide.

---

### P1 — Correctifs à appliquer avant ou juste après le lancement

**P1-GEO-01** — AREA_SERVED tronquée dans `src/lib/constants.ts`

```typescript
// Avant :
export const AREA_SERVED = ['Yvelines (78)', 'Hauts-de-Seine (92)'] as const;

// Après :
export const AREA_SERVED = [
  'Yvelines (78)',
  'Hauts-de-Seine (92)',
  "Val-d'Oise (95)",
  'Eure (27)',
] as const;
```

Fichiers impactés : `constants.ts` → propagé automatiquement à `seo.ts` (organizationJsonLd + partnerOrganizationJsonLd). Aucune autre modification.  
Impact : JSON-LD `areaServed` conforme aux 4 zones réelles — signal de couverture géographique pour les LLM (requêtes « pisciniste 95 » ou « 27 »).

**P1-GEO-02** — sameAs LTE incomplet

Les Terres Essentielles n'a pas de site propre en V1 (project-context.md). Ajouter dans `partnerOrganizationJsonLd()` les identifiants légaux publics :

```typescript
sameAs: [
  SOCIAL_LINKS.facebookLTE,
  'https://www.pappers.fr/entreprise/les-terres-essentielles-811198217',
  'https://www.societe.com/societe/les-terres-essentielles-811198217.html',
],
```

Impact : graph LTE plus robuste pour les LLM qui croisent les sources.

**P1-GEO-03** — llms.txt : mise à jour de la date à la bascule du domaine

Modifier la ligne 3 de `public/llms.txt` à chaque refresh de contenu ou au lancement réel. Date actuelle : 2026-06-11 — à passer à la date du déploiement public.

---

### P2 — Améliorations post-lancement

**P2-GEO-01** — Paragraphe de synthèse extractible sur /jardins-paysage (claim 8)

Après `BureauEtudesBlock`, dans `src/app/jardins-paysage/page.tsx`, ajouter avant `<CrossSellingBlock>` :

```tsx
<section className="bg-background">
  <div className="mx-auto max-w-container px-4 py-8 md:px-8">
    <p className="max-w-[70ch] text-base leading-8 text-foreground-secondary">
      Les Terres Essentielles dispose d'un bureau d'études paysager intégré aux
      Alluets-le-Roi (Yvelines, 78580), permettant la co-conception de projets
      extérieurs associant piscine et jardin dès la phase de plan, dans les
      Yvelines et les Hauts-de-Seine.
    </p>
  </div>
</section>
```

**P2-GEO-02** — Charte Gens de Confiance en texte visible (/la-maison)

Dans le bloc Aqua System de /la-maison, après la ligne sur les certifications, ajouter :

```tsx
<p>
  Nicolas Berg, signataire de la Charte Pro Gens de Confiance.
</p>
```

Impact : claim 11 devient extractible en texte (pas seulement en JSON-LD sameAs).

**P2-GEO-03** — `<p>` de synthèse sur l'accueil (/)

Sur `src/app/page.tsx`, section 3 Preuves, après `<ProofBadges />` :

```tsx
<p className="mt-6 max-w-[70ch] text-sm leading-7 text-foreground-secondary">
  Aqua System — certifié Socotec CSP/ESP-001, membre du réseau L'Esprit Piscine.
  Plus de 350 piscines entretenues dans les Yvelines et les Hauts-de-Seine depuis
  plus de 30 ans. Trophée d'Or FPP 2024. Award Bronze EUSA 2025.
</p>
```

Impact : rend la page d'accueil extractible sur les requêtes de marque génériques (ChatGPT utilise l'accueil comme point d'entrée).

---

## Vérification auto-évaluation agent

| Critère | Statut |
|---|---|
| Chaque claim ≥ 2/3 sur la grille ? | PASS — 12 claims vérifiés, tous sourcés (vérif faq.ts + pages) |
| Contenu restructuré conserve les mots-clés keyword-map ? | PASS — aucun terme SEO supprimé par la restructuration GEO |
| Entités et définitions en format extractible ? | PASS sauf écarts P1/P2 documentés |
| Protocole de veille avec prompts de test précis ? | PASS — geo-strategy.md §6 documenté (5 prompts × 3 LLM) |
| Entités structurées en Schema.org ? | PASS — LocalBusiness + Person + FAQPage + BreadcrumbList + ImageObject |

---

*Produit par @geo — 2026-06-12*
*Audit réalisé sur le code src/ — aucun outil payant — vérification fichier par fichier.*
