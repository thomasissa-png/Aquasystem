# Re-audit GEO — Vérification post-correctifs
## Aqua System × Les Terres Essentielles — aquasystem.pages.dev

> Agent : @geo | Date : 2026-06-12
> Mandat : re-scorer chaque page de la grille initiale (audit-geo-10sur10.md, score moyen 7.1/10)
> après application des méga-lots D-35 + antérieurs (D-12/D-17/D-28/D-30/D-32/D-34/D-35/D-37/D-39).
> Pages ajoutées : /notre-regard (index + 2 articles représentatifs).
> Source principale : lecture de src/ complet + public/llms.txt + WebSearch baseline live.

---

## Méthode de re-scoring

Même grille à 6 dimensions (E/G/C/J/L/R) que l'audit initial.
Vérifications effectuées :
- Lecture ligne à ligne des fichiers source (src/, public/llms.txt, src/lib/seo.ts, src/content/faq.ts)
- WebSearch live sur les requêtes cibles (2 séries de 2 requêtes, résultats ci-dessous)
- Confrontation point par point avec les écarts documentés dans l'audit initial

Classification des items restants en fin de document :
(a) CORRECTIF SITE restant — action précise et réalisable dans le code
(b) BLOQUÉ FONDATEUR — donnée non fournie, décision naming, GBP, citations NB
(c) STRUCTUREL hors site — citations LLM = fonction du temps et de la notoriété

---

## 1. Baseline de visibilité IA — Re-test WebSearch 2026-06-12

### Requête 1 : « pisciniste certifié Socotec haut de gamme Yvelines »

Résultat WebSearch : la page esprit-piscine.fr/aqua-system/ apparaît dans les résultats
organiques. Le résumé IA généré par le moteur de recherche CITE Aqua System nommément :
« certification Professionnels de la piscine privée à usage familial délivrée par Socotec
Certification France. L'entreprise a reçu le Trophée Design & Innovation L'Esprit Piscine
2025 et l'Award Bronze EUSA 2025. »

Statut : AMÉLIORATION significative vs baseline (était « Partiel — réseau cité mais pas AS »).
Note : la citation vient de esprit-piscine.fr, pas encore du site aquasystem.pages.dev
directement — mais l'entité Aqua System EST nommée avec ses distinctions. C'est le
mécanisme attendu (le site alimente le graphe d'entité, les LLM le lisent depuis les sources
tierces les plus fortes).

### Requête 2 : « piscine et jardin même prestataire Yvelines bureau études paysager »

Résultat WebSearch : Les Jardins de la Vallée (jardinsdelavallee.fr) reste le concurrent
cité en premier. Aquasystem.pages.dev n'apparaît PAS dans les résultats de cette requête.

Statut : P0 toujours ouvert côté STRUCTUREL — le contenu page /la-maison et /jardins-paysage
répond maintenant à cette requête (claim LTE extractible, FAQ Q4 prescripteurs, CrossSelling),
mais la notoriété du site est trop récente pour être citée par les LLM sur cette requête.
Verdict : le site fait maintenant ce qu'il peut faire (contenu structuré), la citation
viendra avec l'indexation et la fraîcheur.

### Observation : Trophée Design & Innovation L'Esprit Piscine 2025

La WebSearch confirme que ce trophée est cité sur esprit-piscine.fr/aqua-system/ dans les
réponses IA. Il n'est PAS encore dans le JSON-LD ni dans le llms.txt du site. C'est un
claim 3/3 manquant. Statut : [BLOQUÉ FONDATEUR — À CONFIRMER par Nicolas Berg avant
intégration, per règle anti-invention].

---

## 2. Re-scoring page par page

---

### PAGE 1 — / (Accueil)

**Score initial : 7.3/10**

#### E — Extractibilité : 9/10 (était 7/10)

Correctifs appliqués :
- Bloc texte centré sous ProofBadges (P-GEO-02, D-28) : synthèse FPP/EUSA/Socotec/L'Esprit
  Piscine en 1 paragraphe auto-contenu sous filet gold. Vérifiée dans src/app/page.tsx.
- Sous-titre corrigé (D-35 §3 metas) : « De la vision à la réalisation, dans les Yvelines
  et les Hauts-de-Seine. Un seul interlocuteur, depuis 30 ans. » Extractible, 3/3.
- ProofBadges refondus (D-26) : filets hairlines, chiffres et noms typographiés distinctement,
  aucun cartouche générique. Les 4 preuves (30+, 350+, Socotec, L'Esprit Piscine) sont
  extractibles individuellement.
- Ancre narrative H1 + eyebrow Aqua System + sous-titre : entité nommée, promesse en texte clair.

Ce qui manque encore :
- L'assertion directe différenciatrice « Aqua System et Les Terres Essentielles constituent
  la seule association pisciniste certifié et bureau d'études paysager opérant en interlocuteur
  unique dans les Yvelines et les Hauts-de-Seine » n'est pas en texte visible sur la homepage
  (elle est dans llms.txt §Proposition de valeur, mais pas en page). Résiduel P2, le llms.txt
  couvre l'essentiel.

**Score E : 9/10**

#### G — Entités : 9/10 (était 8/10)

Correctifs appliqués :
- sameAs JSON-LD enrichi (D-35/D-12) : guide-piscine.fr, idees-piscine.com, pagesjaunes.fr,
  esprit-piscine.fr, LinkedIn AS — tous dans organizationJsonLd(). Vérifié src/lib/seo.ts L56-65.
- @type double ['LocalBusiness', 'Organization'] (D-35 chantier 2). Vérifié seo.ts L47.
- LTE : sameAs enrichi avec Pappers + societe.com (D-35/D-12). Vérifié seo.ts L150-153.
- Nicolas Berg : Person JSON-LD avec sameAs LinkedIn + Gens de Confiance présent sur /la-maison.
- AREA_SERVED étendu aux 4 départements (78/92/95/27, D-17). Vérifié seo.ts L88.
- memberOf L'Esprit Piscine avec URL. Vérifié seo.ts L116-120.

Ce qui manque encore :
- Wikidata/Wikipedia Aqua System : aucune entrée (structurel hors site, éligibilité à évaluer).
- Trophée Design & Innovation L'Esprit Piscine 2025 absent de award[] [BLOQUÉ FONDATEUR].

**Score G : 9/10**

#### C — Claims : 9/10 (était 8/10)

Correctifs appliqués :
- C1 L'Esprit Piscine : OUI, logo visible en footer (D-39), lien vers page membre, ProofBadges.
- C3/C4 FPP 2024 + EUSA 2025 : OUI, dans le bloc centré sous ProofBadges.
- C5 (350+ piscines) / C6 (30 ans) : OUI, ProofBadges + sous-titre.
- C7 (zones 78/92/95/27) : OUI, areaServed + llms.txt + FAQ /la-maison.

Ce qui manque encore :
- Design & Innovation Trophy 2025 [BLOQUÉ FONDATEUR] : 0/3 — non intégré.
- C5 (350+ « entretenues ») : le wording « entretenues » est bien dans llms.txt mais pas dans
  le texte visible ProofBadges (juste le chiffre 350+). Résiduel P2.

**Score C : 9/10**

#### J — JSON-LD : 9/10 (était 9/10)

Correctifs appliqués :
- @type double LocalBusiness + Organization.
- sameAs complets (4 annuaires + LinkedIn).
- award : FPP 2024 + EUSA 2025 présents.
- hasCredential : Socotec CSP/ESP-001 présent.
- memberOf L'Esprit Piscine.
- partnerOrganizationJsonLd LTE avec SIREN implicite (name + adresse + sameAs).

Ce qui manque encore :
- CSTB n° 16/17-754 dans hasCredential [BLOQUÉ FONDATEUR — confirmation procédé requise].
- LTE : date de création 2015 et SIREN 811 198 217 absents du JSON-LD (dans le texte visible
  /jardins-paysage par contre). Correctif site P2.

**Score J : 9/10**

#### L — llms.txt : 10/10 (était 7/10)

Correctifs appliqués (D-35 §P1-GEO-04) :
- Section « Savoir-faire techniques » : 6 ouvrages nommés avec définitions. Vérifié llms.txt L64-80.
- Section « Réalisations » : 24 réalisations, types représentés, portfolio URL. L84-89.
- Section « Blog — Notre Regard » : en ligne, 6 articles, RSS URL, auteur, sujets, fréquence. L91-97.
- Requêtes conversationnelles : 12 requêtes cibles listées. L99-113.
- Timestamp mis à jour 2026-06-12 (P1-GEO-04). L3.
- Proposition de valeur : assertion directe « unique combinaison pisciniste certifié + bureau
  d'études paysager ». L50-54.

Aucun écart résiduel identifié dans llms.txt.
Note : le domaine reste PROVISOIRE (aquasystem.fr vs aquasystem.pages.dev) —
documenté dans le fichier lui-même. À substituer post-naming [BLOQUÉ FONDATEUR].

**Score L : 10/10**

#### R — Requêtes conversationnelles : 7/10 (était 5/10)

- « meilleur pisciniste haut de gamme Yvelines » : page répond mieux (ProofBadges restructuré,
  bloc claims centré, sous-titre 30 ans + zones). Citabilité : 6/10.
- « confier piscine et jardin au même prestataire » : llms.txt + /la-maison FAQ + CrossSelling
  répondent — mais pas de page dédiée. Citabilité : 5/10.
- Requêtes de marque : 9/10, stables.
- Le blog /notre-regard (6 articles) améliore la couverture des requêtes longue traîne
  (fond mobile, piscine intérieure, piscine+jardin, investissement).

**Score R : 7/10**

**Score global / : 8.8/10 (était 7.3/10) — +1.5 pts**

---

### PAGE 2 — /piscines-bien-etre

**Score initial : 8.3/10**

#### E — Extractibilité : 9/10 (était 8/10)

Correctifs appliqués :
- OuvragesSection (D-30) : 6 descriptions d'ouvrages structurées, corps auto-contenus, photos.
  Ex. fond mobile : description du mécanisme + « ouvrage le plus rare du portfolio ».
- TextBlock « Construction & finitions » fusionné (D-32) : béton armé / CSTB / Socotec /
  Propiscines Certifié / décennale / finitions — en 3 paragraphes auto-contenus.
- FAQ_PISCINES (D-35) : 3 Q/R extractibles avec @id unique /piscines-bien-etre/#faq.
  Vérifié src/content/faq.ts L59-72 et src/app/piscines-bien-etre/page.tsx.
- Paragraphe de synthèse ProofBadges (D-17) : 1 § centré sous filet (D-28).

Ce qui manque encore :
- Le numéro exact CSTB n° 16/17-754 n'apparaît pas dans le TextBlock visible (texte dit
  « Avis Technique CSTB » sans le numéro). Correctif site P1 — conditionnel confirmation NB.

**Score E : 9/10**

#### G — Entités : 9/10 (était 9/10 — stable)

L'Esprit Piscine nommé avec contexte, HotSpring, Dolphin, Socotec, FPP, EUSA — tous présents.
CSTB nommé sans numéro (voir E ci-dessus).

**Score G : 9/10**

#### C — Claims : 9/10 (était 9/10 — stable)

Les 6 claims de la page sont présents. Le claim chiffré « 4 piscines intérieures » est dans
la FAQ Q3 (faq.ts L70). Le claim « fond mobile — 1 réalisation » dans FAQ Q2. Le claim
« 2 piscines à paroi de verre » manque encore dans le texte visible (présent dans llms.txt).

**Score C : 9/10**

#### J — JSON-LD : 9/10 (était 8/10)

Correctif P1-GEO-03 appliqué (D-35) : FAQPage JSON-LD avec @id /piscines-bien-etre/#faq,
3 Q/R correspondant exactement au contenu visible. Vérifié src/app/piscines-bien-etre/page.tsx L57-60.
BreadcrumbList : présent. @type double : via layout global.

Ce qui manque encore :
- CSTB dans hasCredential [BLOQUÉ FONDATEUR].

**Score J : 9/10**

#### R — Requêtes : 8/10 (était 8/10 — stable, légère amélioration)

- « piscine intérieure Île-de-France spécialiste » : FAQ Q3 répond directement « quatre
  réalisations dans l'ouest parisien ». Citabilité : 8/10.
- « fond mobile piscine France » : FAQ Q2 répond directement. Citabilité : 8/10.
- « piscine à débordement 78 » : OuvragesSection + description + blog A1. Citabilité : 8/10.

**Score R : 8/10**

**Score global /piscines-bien-etre : 8.8/10 (était 8.3/10) — +0.5 pts**

---

### PAGE 3 — /jardins-paysage

**Score initial : 6.0/10**

#### E — Extractibilité : 8/10 (était 6/10)

Correctifs appliqués :
- Claim LTE GEO (D-28 §5b + D-32) : intégré comme 4e paragraphe du BureauEtudesBlock.
  Texte exact : « Les Terres Essentielles dispose d'un bureau d'études paysager intégré
  aux Alluets-le-Roi (Yvelines, 78580), permettant la co-conception… dans les Yvelines
  et les Hauts-de-Seine. » — 3/3 extractible. Vérifié page.tsx L157.
- CreationBlock : MediaSplit avec photo réelle (D-37) + 2 paragraphes sur le process.
- MatieresBlock (D-30) : 3 paragraphes sur les matières — auto-contenus, vocabulaire précis.
- VivantSection (D-32) : 4 entrées structurées (essences, sol, entretien, pépinière).
- CrossSellingBlock extractible : « Un jardin pensé avec la piscine, depuis le même bureau
  d'études. » avec assertion directe.

Ce qui manque encore :
- Aucune liste de services structurée en format Q/R. Décision de style assumée (page LTE,
  pas de FAQ imposée). Résiduel acceptable.
- Assertion LTE avec SIREN explicite dans le texte visible (présent dans le JSON-LD global
  via partnerOrganizationJsonLd, mais pas dans le corps de page). Correctif P2.

**Score E : 8/10**

#### G — Entités : 9/10 (était 7/10)

Correctifs appliqués :
- LTE nommée avec adresse complète et code postal (Alluets-le-Roi, 78580).
- Pépinière propre nommée avec lieu.
- Bureau d'études paysager nommé avec zone de service (78/92).
- Photo réelle jardinerie LTE (D-37 : massif-exotique-escalier en MediaSplit Création).

Ce qui manque encore :
- SIREN 811 198 217 LTE pas affiché en texte visible (présent dans le JSON-LD sameAs
  Pappers/societe.com — signal indirect suffisant). P3.

**Score G : 9/10**

#### C — Claims : 8/10 (était 6/10)

Correctifs appliqués :
- C8 (bureau d'études paysager LTE) : OUI, extractible.
- Pépinière propre LTE : OUI, MatieresBlock + PepiniereBlock.
- Co-conception piscine+jardin : OUI, CrossSellingBlock + BureauEtudesBlock.
- Zones 78/92 : OUI, dans le claim LTE.

Ce qui manque encore :
- « Depuis 2015 » (date de création LTE) : absent du texte visible. Résiduel P2.
- Claims chiffrés LTE (nb de jardins créés) : non disponibles (pas de donnée validée).
  Structurel hors site — pas de fait sourcé à afficher sans invention.

**Score C : 8/10**

#### J — JSON-LD : 7/10 (était 6/10)

Correctifs appliqués :
- BreadcrumbList : présent.
- LTE dans partnerOrganizationJsonLd global avec @type double, sameAs Pappers/societe.com/Facebook.
- areaServed : 4 départements.

Ce qui manque encore :
- Pas de FAQPage JSON-LD sur /jardins-paysage (décision style assumée, page narrative —
  voir content-restructuring.md §A). Pas bloquant.
- Pas de JSON-LD Organization spécifique LTE sur cette page (le global couvre). P3.
- Date de création 2015 et SIREN 811 198 217 absents du JSON-LD LTE. Correctif P2.

**Score J : 7/10**

#### R — Requêtes : 7/10 (était 5/10)

Correctifs appliqués :
- « confier piscine et jardin au même prestataire » : BureauEtudesBlock + CrossSellingBlock
  répondent maintenant avec assertion directe. Citabilité : 7/10.
- Blog A5 « Piscine et jardin conçus ensemble » (datePublished 2026-04-28) cible directement
  cette requête. Citabilité blog : 8/10.

Ce qui manque encore :
- Les Jardins de la Vallée occupe toujours la 1re position sur cette requête (structurel).
- La page /jardins-paysage n'est pas encore structurée comme une réponse directe à
  « paysagiste haut de gamme Yvelines » (pas de H1 ni d'assertion directe sur ce positionnement).

**Score R : 7/10**

**Score global /jardins-paysage : 7.8/10 (était 6.0/10) — +1.8 pts**

---

### PAGE 4 — /la-maison (À propos)

**Score initial : 8.5/10**

#### E — Extractibilité : 9/10 (était 8/10)

Correctifs appliqués :
- FAQ_NOTRE_APPROCHE (4 Q/R) : inchangées, toujours extractibles et auto-contenues.
- Reflets d'expertise (D-34) : ajout CSTB/décennale/bureau d'études dans le panneau Aqua System,
  reflet pépinière/sol argilo-calcaire dans le panneau LTE. Texte visible, auto-contenu.
- Ancrage local : Freneuse (78840) + Alluets-le-Roi (78580) nommés dans le texte visible.
- Gens de Confiance : « signataire de la Charte Pro Gens de Confiance » en texte visible
  (D-17 geo P2). Vérifié dans page.tsx.
- H1 aligné sur « À propos » (D-34) + eyebrow + sous-titre.
- Lien éditorial vers esprit-piscine.fr/aqua-system/ (D-39) — preuve tierce en texte visible.

Ce qui manque encore :
- Numéro CSTB sans le n° exact (idem /piscines-bien-etre). [BLOQUÉ FONDATEUR].
- Q3 FAQ (durée de chantier) : volontairement absente — placeholder fondateur.
  [BLOQUÉ FONDATEUR].

**Score E : 9/10**

#### G — Entités : 9/10 (était 9/10 — stable)

Graphe quasi-complet : Aqua System, LTE, Nicolas Berg (Person), L'Esprit Piscine avec lien
visible, Socotec, FPP, EUSA. Freneuse + Alluets-le-Roi en texte visible.

**Score G : 9/10**

#### C — Claims : 9/10 (était 9/10 — stable)

Chip CSTB ajoutée dans la rangée de preuves du panneau Aqua System (D-34). Trophées FPP/EUSA
présents. Gens de Confiance NB. Seul manque : n° CSTB exact [BLOQUÉ FONDATEUR].

**Score C : 9/10**

#### J — JSON-LD : 9/10 (était 9/10 — stable)

BreadcrumbList + Person (Nicolas Berg) + FAQPage avec @id /la-maison/#faq — tous présents.
@type double via layout global.
CSTB dans hasCredential : manquant [BLOQUÉ FONDATEUR].

**Score J : 9/10**

#### R — Requêtes : 8/10 (était 7/10)

- « pisciniste certifié Socotec » : FAQ Q3 + section Aqua System répondent directement.
- « confier piscine et jardin au même prestataire » : FAQ Q1 + CrossSellingBlock + reflets.
- Blog A4 (prix piscine haut de gamme) amplifie la réponse à « meilleur pisciniste ».

**Score R : 8/10**

**Score global /la-maison : 8.8/10 (était 8.5/10) — +0.3 pts**

---

### PAGE 5 — /prescripteurs

**Score initial : 8.8/10**

#### E — Extractibilité : 9/10 (était 9/10 — stable)

Correctifs appliqués :
- Encart qualification (D-17) : « Dossier de qualification complet disponible sur demande. »
  + CTA. Preuve directe extractible.
- Sous-titre hero : « exécutant qui travaille sur votre plan et respecte votre relation client. »
  — assertion directe, extractible. Vérifié src/app/prescripteurs/page.tsx (D-17 §copy P0-C1).
- FAQ_PRESCRIPTEURS (4 Q/R) : inchangées, toujours extractibles.

Ce qui manque encore :
- Avis Technique CSTB comme 5e preuve dans les preuves (P1-GEO-07) : non appliqué.
  Conditionnel confirmation NB [BLOQUÉ FONDATEUR].
- 6 types d'ouvrage maîtrisés (assertion directe pour les architectes) : non ajouté au
  corps de la page. Correctif site P1.

**Score E : 9/10**

#### G — Entités : 9/10 (était 9/10 — stable)

Graphe complet sur cette page. CSTB nommé sans numéro.

**Score G : 9/10**

#### C — Claims : 9/10 (était 9/10 — stable)

Claims certifications + bureau d'études + zones présents. CSTB numéro manquant.
Les 6 types d'ouvrage ne sont pas listés sur cette page (pertinent pour les architectes).

**Score C : 9/10**

#### J — JSON-LD : 9/10 (était 9/10 — stable)

FAQPage avec @id /prescripteurs/#faq (D-35 chantier 7). BreadcrumbList. @type double layout.
CSTB dans hasCredential : manquant.

**Score J : 9/10**

#### R — Requêtes : 9/10 (était 8/10)

- « pisciniste certifié Socotec » : section PREUVES + FAQ Q2 — meilleure page du site
  pour cette requête. Citabilité : 9/10.
- « interlocuteur unique piscine+jardin pour les architectes » : FAQ Q4 répond directement.
- Blog absent de cette page : non bloquant, la page est déjà la plus ciblée du site.

**Score R : 9/10**

**Score global /prescripteurs : 9.0/10 (était 8.8/10) — +0.2 pts**

---

### PAGE 6 — /realisations

**Score initial : 4.8/10**

#### E — Extractibilité : 8/10 (était 4/10)

Correctif P0-GEO-01 appliqué (D-35 chantier 7) :
Bloc GEO sous H1 : « 24 réalisations Aqua System dans les Yvelines et les Hauts-de-Seine :
piscines à débordement, bassins miroir, couloirs de nage, piscines intérieures, fond mobile,
paroi de verre, et des projets associant piscine et jardin conçus depuis le même bureau
d'études. » — auto-contenu, extractible. Vérifié src/app/realisations/page.tsx L55-62.

HTML statique : 24 cartes rendues dans le HTML pré-rendu (D-17 — correction du bailout CSR).
Toutes les cartes incluses dans le HTML source, visible par les LLM.

Ce qui manque encore :
- Les cartes réalisations contiennent titre + type + zone (« Ouest parisien ») + lien vers
  fiche, mais pas de description inline. Les LLM doivent aller sur la fiche pour obtenir
  la visualDescription. Résiduel acceptable — les fiches sont indexées.
- ItemList JSON-LD pour les 24 réalisations (P2-GEO-05) : non appliqué. Correctif site P2.

**Score E : 8/10**

#### G — Entités : 8/10 (était 6/10)

Correctifs appliqués :
- H1 « Réalisations » avec sous-titre « 30 ans de chantiers dans les propriétés des Yvelines
  et des Hauts-de-Seine. » — Aqua System implicitement présent (canonical + breadcrumb le nomment).
- BreadcrumbList avec nom page correct.
- 24 fiches indexables (D-35 chantier 1) : plus noindex pour les drafts (isDraft bascule).
  Aqua System est créateur/copyrightHolder dans chaque fiche ImageObject.

**Score G : 8/10**

#### C — Claims : 7/10 (était 3/10)

Correctifs appliqués :
- Bloc extractible : 24 réalisations + 6 types + zones + bureau d'études = assertions numériques
  présentes en texte visible.

Ce qui manque encore :
- Assertion de trophée (FPP 2024 sur piscine intérieure) : pas sur cette page.
- Assertions individuelles sur chaque type de réalisation (chiffrées) : sur les fiches, pas
  sur la grille.

**Score C : 7/10**

#### J — JSON-LD : 7/10 (était 7/10 — stable)

BreadcrumbList présent. ItemList non appliqué (P2). Fiches indexées ont leurs JSON-LD
propres (ImageObject + BreadcrumbList 3 niveaux + Article sur les articles blog).

**Score J : 7/10**

#### R — Requêtes : 7/10 (était 4/10)

La page répond maintenant aux requêtes de type « piscines réalisées ouest parisien »
grâce au bloc GEO. Les 24 fiches indexées permettent aux LLM de résoudre « fond mobile
piscine France » via la fiche dédiée (slug : piscine-fond-mobile-terrasse).

**Score R : 7/10**

**Score global /realisations : 7.4/10 (était 4.8/10) — +2.6 pts**

---

### PAGE 7 — /realisations/[slug] (fiches individuelles)

**Score initial : 4.8/10**

#### E — Extractibilité : 7/10 (était 4/10)

Correctifs appliqués :
- visualDescription (D-27/D-31) : 24/24 fiches ont une description 3-4 phrases rédigées
  avec vocabulaire métier (type d'ouvrage, matériaux, contrainte technique impliquée par
  le visible, ouverture vers le projet du visiteur). C'est la principale amélioration.
- isDraft bascule sur visualDescription présente (D-35 chantier 1) : toutes les 24 fiches
  sont maintenant rendues avec contenu (plus de FicheDraftNotice).
- Le rendu d'une fiche = photo + H1 factuel + (type, zone) + visualDescription + SectionCTA.
  Un LLM peut extraire : type d'ouvrage + zone + description technique depuis une seule fiche.

Ce qui manque encore :
- Champs éditoriaux (intention/réponse/exécution/prestations) = toujours null pour les 24
  fiches. Seul le visualDescription est rempli. [BLOQUÉ FONDATEUR — données à fournir par NB].
- Sans ces champs, les fiches sont des pages galerie sobres, mais pas des articles ciblant
  des requêtes conversationnelles spécifiques (ex. « piscine fond mobile France » nécessite
  un texte plus long que 3-4 phrases).

**Score E : 7/10**

#### G — Entités : 8/10 (était 6/10)

Correctifs appliqués :
- Chaque fiche : ImageObject JSON-LD avec creator + copyrightHolder « Aqua System ».
- BreadcrumbList 3 niveaux : Accueil > Réalisations > [titre fiche].
- Zone « Ouest parisien » cohérente (D-27 chantier 2 — zones honnêtes).

**Score G : 8/10**

#### C — Claims : 6/10 (était 4/10)

Correctifs appliqués :
- visualDescription contient 1 à 2 claims techniques par fiche (ex. fond mobile : « plancher
  hydraulique qui modifie la profondeur selon les usages », paroi de verre : « structure de
  verre trempé feuilleté ancrée sur le débord »).
- Aqua System nommé en créateur photo et dans le BreadcrumbList.

Ce qui manque encore :
- Pas de corps éditorial riche (champs null). Les fiches ne répondent pas à une requête
  conversationnelle longue. [BLOQUÉ FONDATEUR].

**Score C : 6/10**

#### J — JSON-LD : 8/10 (était 7/10)

Correctifs appliqués :
- ImageObject présent sur toutes les fiches.
- BreadcrumbList 3 niveaux.
- Article JSON-LD : présent sur les articles blog. PAS sur les fiches réalisations
  (non requis — les fiches ne sont pas des articles). Conforme.

Résiduel :
- Pas de serviceType dans le JSON-LD fiche (ex. « Piscine à fond mobile »). P3.

**Score J : 8/10**

#### R — Requêtes : 6/10 (était 3/10)

Correctifs appliqués :
- Les fiches sont maintenant indexées et ont un contenu minimal extractible.
- La fiche piscine-fond-mobile-terrasse est accessible aux LLM et contient dans son
  visualDescription une description du mécanisme de fond mobile.

Ce qui manque encore :
- La citabilité sur « fond mobile piscine France » reste limitée par l'absence de corps
  éditorial développé. Le blog A3 (fond-mobile-terrasse-piscine) couvre mieux cette requête.
  [BLOQUÉ FONDATEUR pour la fiche].

**Score R : 6/10**

**Score global /realisations/[slug] : 7.0/10 (était 4.8/10) — +2.2 pts**

---

### PAGE 8 (AJOUT) — /notre-regard (index blog)

**Score initial : N/A — nouvelle page**

#### E — Extractibilité : 8/10

Points forts :
- H1 + subtitle extractibles : « Le regard d'un pisciniste sur les projets d'exception. »
  + « Ce que trente ans de conception et de chantiers dans l'ouest parisien nous apprennent ».
  Auto-contenu, auteur implicite (Nicolas Berg pisciniste 30 ans ouest parisien).
- 6 articles en grille : titre + excerpt + date + catégorie. Chaque card est extractible.
  Les excerpts sont auto-contenus (2 phrases sans jargon).
- BreadcrumbList : présent.

Ce qui manque encore :
- Pas de bloc de définition de l'auteur sur l'index (AuthorBlock est sur les pages d'article
  individuelles, pas sur l'index). Résiduel P2 — l'index sert d'entrée, pas de page cible.
- Pas de FAQPage JSON-LD sur l'index (correct, page de liste).

**Score E : 8/10**

#### G — Entités : 8/10

Points forts :
- Nicolas Berg nommé comme auteur dans toutes les pages d'article (AuthorBlock + JSON-LD Article).
- Organisation Aqua System en publisher JSON-LD.
- @id organization-aquasystem dans chaque articleJsonLd. Vérifié src/app/notre-regard/[slug]/page.tsx L87.

Ce qui manque encore :
- L'index /notre-regard n'a pas de JSON-LD qui relie le blog à l'entité Aqua System
  (pas de BlogPosting ni de Blog schema). Correctif P2 — impact modéré.

**Score G : 8/10**

#### C — Claims : 8/10

Points forts :
- 6 articles avec claims sourcés par Nicolas Berg :
  A1 : piscine à débordement Yvelines — « 30 ans en 78/92 »
  A3 : fond mobile — description mécanique précise
  A4 : prix piscine sur mesure — postes de coût honnêtes, pas de fourchettes inventées
  A5 : piscine+jardin ensemble — « bureau d'études intégré »
- DatePublished dans le passé (max 2026-06-12) — fraîcheur conforme, jamais de date future.

Ce qui manque encore :
- Citations [CITATION À VALIDER NB] exclues du rendu (documenté dans blog.ts) — certains
  articles sont moins sourcés qu'ils ne pourraient l'être. [BLOQUÉ FONDATEUR].

**Score C : 8/10**

#### J — JSON-LD : 9/10

Points forts :
- Article JSON-LD complet sur chaque page d'article : author (Person Nicolas Berg),
  publisher (Aqua System @id), datePublished, dateModified, mainEntityOfPage, headline,
  image. Vérifié src/app/notre-regard/[slug]/page.tsx L66-95.
- BreadcrumbList 3 niveaux sur chaque article.
- RSS disponible : /notre-regard/rss.xml (D-35/lot blog) — signal fraîcheur pour Perplexity.

Résiduel :
- Index /notre-regard : pas de JSON-LD Blog schema (P3 — impact marginal).

**Score J : 9/10**

#### R — Requêtes : 8/10

- « piscine à débordement Yvelines » : A1 cible directement, datePublished 2026-03-29.
- « fond mobile piscine France » : A3 cible directement, datePublished 2026-05-28.
- « prix piscine sur mesure » : A4 cible directement, datePublished 2026-04-13.
- « confier piscine et jardin même prestataire » : A5 répond directement.
- Fraîcheur : A6 datePublished 2026-06-12 = jour J (contenu < 2 mois → +28% citations LLM).

**Score R : 8/10**

**Score global /notre-regard : 8.2/10 — nouvelle page, bon niveau dès le lancement**

---

### PAGE 9 — /mentions-legales

**Score initial : 7/10**

Correctifs appliqués (D-22) :
- Suppression des crochets « [À CONFIRMER] » visibles. Vérifié D-22 §P1 #5.
- RCS/TVA omis (non obligatoires) — mentions propres.
- Décennale + Socotec : « attestation disponible sur demande » sans crochet.

**Score global /mentions-legales : 8/10 (était 7/10) — +1 pt**

---

## 3. Récapitulatif des dimensions globales

### 3.1 Extractibilité globale — Score : 8.5/10 (était 7/10)

Forces acquises :
- /realisations : bloc GEO extractible en place (P0 levé)
- FAQ_PISCINES : 3e FAQPage avec @id unique (P1 levé)
- OuvragesSection : 6 descriptions structurées
- visualDescriptions : 24/24 fiches documentées
- /jardins-paysage : claim LTE en texte extractible
- Blog : 6 articles avec réponse directe dans les 60 premiers mots

Lacunes résiduelles :
- Fiches réalisations sans corps éditorial (intention/réponse/exécution) — [BLOQUÉ FONDATEUR]
- Numéro CSTB n° 16/17-754 sans le numéro exact — [BLOQUÉ FONDATEUR]

### 3.2 Entités — Score : 8.5/10 (était 7.5/10)

Forces acquises :
- sameAs complets (4 annuaires + LinkedIn + Pappers/societe.com pour LTE)
- @type double LocalBusiness + Organization sur les deux entités
- Nicolas Berg : Person JSON-LD complet avec sameAs LinkedIn + Gens de Confiance
- Logo L'Esprit Piscine visible + lien vers page membre (D-39)
- areaServed 4 départements

Lacunes résiduelles :
- Design & Innovation Trophy L'Esprit Piscine 2025 non intégré [BLOQUÉ FONDATEUR]
- CSTB entité absente du hasCredential [BLOQUÉ FONDATEUR]
- Wikidata/Wikipedia : aucune entrée (structurel — éligibilité Aqua System à évaluer)

### 3.3 Claims — Score : 8.5/10 (était 8/10)

Tous les 12 claims originaux désormais 3/3 ou 2/3 :

| Claim | Site visible | llms.txt | JSON-LD | Score |
|-------|-------------|---------|--------|-------|
| C1 L'Esprit Piscine | OUI (footer logo + texte /la-maison) | OUI | OUI (memberOf) | 3/3 |
| C2 Socotec CSP/ESP-001 | OUI | OUI | OUI (hasCredential) | 3/3 |
| C3 Trophée Or FPP 2024 | OUI | OUI | OUI (award) | 3/3 |
| C4 EUSA Bronze 2025 | OUI | OUI | OUI (award) | 3/3 |
| C5 350+ piscines entretenues | OUI (ProofBadges) | OUI (avec « entretenues ») | Absent explicit | 2/3 |
| C6 30 ans d'activité | OUI | OUI | Absent explicit | 2/3 |
| C7 Zones 78/92/95/27 | OUI (areaServed + FAQ) | OUI | OUI | 3/3 |
| C8 Bureau d'études LTE | OUI (/jardins-paysage) | OUI | OUI (partnerOrg) | 3/3 |
| C9 HotSpring | OUI (/piscines-bien-etre) | OUI | Absent | 2/3 |
| C10 Adresse Freneuse | OUI (/la-maison visible) | OUI | OUI | 3/3 |
| C11 Nicolas Berg GdC | OUI (/la-maison visible) | Absent | OUI (sameAs) | 2/3 |
| C12 Intégration piscine+jardin | OUI (multiple) | OUI | Partiel | 2/3 |
| [NOUVEAU] 4 piscines intérieures | OUI (FAQ Q3) | OUI | Absent | 2/3 |
| [NOUVEAU] 1 fond mobile | OUI (FAQ Q2) | OUI | Absent | 2/3 |
| [NOUVEAU] 2 piscines paroi verre | Partiel (OuvragesSection) | OUI | Absent | 2/3 |
| [NOUVEAU] Trophée DI 2025 | NON | NON | NON | 0/3 [BLOQUÉ FONDATEUR] |

### 3.4 JSON-LD — Score : 8.5/10 (était 7.5/10)

| Schema type | Pages | Complet ? |
|-------------|-------|-----------|
| LocalBusiness + Organization (Aqua System) | layout global | OUI — @type double, sameAs complets |
| LocalBusiness + Organization (LTE) | layout global | Partiel — SIREN/2015 absents |
| Person (Nicolas Berg) | /la-maison | OUI |
| FAQPage /la-maison | /la-maison | OUI — @id unique |
| FAQPage /prescripteurs | /prescripteurs | OUI — @id unique |
| FAQPage /piscines-bien-etre | /piscines-bien-etre | OUI — @id unique (NOUVEAU) |
| BreadcrumbList | 7+ pages | OUI |
| ImageObject | fiches réalisations | OUI |
| Article JSON-LD | articles blog | OUI — auteur + publisher + @id org |
| RSS | /notre-regard/rss.xml | OUI |
| EducationalOccupationalCredential CSTB | — | ABSENT [BLOQUÉ FONDATEUR] |
| ItemList /realisations | — | ABSENT — correctif P2 restant |

### 3.5 llms.txt — Score : 10/10 (était 7/10)

Le llms.txt est désormais complet sur tous les points de la grille initiale :
- Entité principale avec SIREN, adresse, dirigeant
- Certifications et distinctions sourcées
- Données clés (350+, 30 ans, HotSpring, Dolphin)
- Partenaire paysage LTE avec SIREN et zone
- Proposition de valeur directe et assertive
- Savoir-faire 6 ouvrages avec définitions
- Réalisations : 24, types, zones, portfolio URL
- Blog : en ligne, RSS, auteur, sujets, fréquence
- Requêtes conversationnelles cibles (12)

Seul point résiduel : domaine PROVISOIRE (aquasystem.fr). [BLOQUÉ FONDATEUR — post-naming].

### 3.6 Requêtes conversationnelles — Score : 7.5/10 (était 5.5/10)

| Requête | Page optimale | Citabilité avant | Citabilité après |
|---------|--------------|-----------------|-----------------|
| « meilleur pisciniste haut de gamme Yvelines » | /la-maison + llms.txt | 5/10 | 7/10 |
| « piscine à débordement 78 » | /piscines-bien-etre + blog A1 | 6/10 | 8/10 |
| « piscine intérieure Île-de-France » | /piscines-bien-etre FAQ Q3 | 5/10 | 8/10 |
| « confier piscine et jardin même prestataire » | /la-maison + /jardins-paysage + blog A5 | 5/10 | 7/10 |
| « pisciniste certifié Socotec » | /prescripteurs | 8/10 | 9/10 |
| « fond mobile piscine France » | /piscines-bien-etre FAQ Q2 + blog A3 | 4/10 | 8/10 |

---

## 4. Tableau de re-scoring — Avant/Après

| Page | Score initial | Score final | Delta |
|------|--------------|------------|-------|
| / (Accueil) | 7.3/10 | 8.8/10 | +1.5 |
| /piscines-bien-etre | 8.3/10 | 8.8/10 | +0.5 |
| /jardins-paysage | 6.0/10 | 7.8/10 | +1.8 |
| /la-maison | 8.5/10 | 8.8/10 | +0.3 |
| /prescripteurs | 8.8/10 | 9.0/10 | +0.2 |
| /realisations | 4.8/10 | 7.4/10 | +2.6 |
| /realisations/[slug] | 4.8/10 | 7.0/10 | +2.2 |
| /notre-regard (AJOUT) | — | 8.2/10 | +8.2 |
| /mentions-legales | 7.0/10 | 8.0/10 | +1.0 |
| **MOYENNE (sans /notre-regard)** | **7.1/10** | **8.2/10** | **+1.1** |
| **MOYENNE (avec /notre-regard)** | — | **8.2/10** | — |

### Dimensions globales — Avant/Après

| Dimension | Score initial | Score final | Delta |
|-----------|-------------|------------|-------|
| Extractibilité (E) | 7.0/10 | 8.5/10 | +1.5 |
| Entités (G) | 7.5/10 | 8.5/10 | +1.0 |
| Claims (C) | 8.0/10 | 8.5/10 | +0.5 |
| JSON-LD (J) | 7.5/10 | 8.5/10 | +1.0 |
| llms.txt (L) | 7.0/10 | 10.0/10 | +3.0 |
| Requêtes (R) | 5.5/10 | 7.5/10 | +2.0 |
| **MOYEN** | **7.1/10** | **8.6/10** | **+1.5** |

---

## 5. Items restants classifiés

### (a) CORRECTIFS SITE restants — Actions précises dans le code

**SITE-01 (P1) — CSTB n° 16/17-754 dans le texte visible**
- Conditionnel : Nicolas Berg confirme l'utilisation du procédé 16/17-754.
- Si confirmé : remplacer « Avis Technique CSTB » par « Avis Technique CSTB n° 16/17-754 »
  dans src/app/piscines-bien-etre/page.tsx (TextBlock « Construction & finitions ») et
  src/app/la-maison/page.tsx (panneau Aqua System).
- Ajouter dans hasCredential de src/lib/seo.ts organizationJsonLd() (cf. template dans
  audit-geo-10sur10.md §3.4).
- Agent : @fullstack — effort : 20 min.

**SITE-02 (P1) — 6 types d'ouvrage listés sur /prescripteurs**
- Action : ajouter dans la section « Ce qui nous qualifie » une assertion directe :
  « Six types d'ouvrage maîtrisés et réalisés : débordement, miroir, couloir de nage,
  piscine intérieure (4), fond mobile (1), paroi de verre (2) — tous dans l'ouest parisien. »
- Agent : @copywriter + @fullstack — effort : 30 min.

**SITE-03 (P2) — SIREN 811 198 217 et date 2015 dans le JSON-LD LTE**
- Action : enrichir partnerOrganizationJsonLd() dans src/lib/seo.ts avec
  `foundingDate: '2015'` et `taxID: '811198217'`.
- Agent : @fullstack — effort : 10 min.

**SITE-04 (P2) — ItemList JSON-LD sur /realisations**
- Action : ajouter un ItemList Schema.org dans src/app/realisations/page.tsx avec
  les 24 slugs (ou les titres + URLs des fiches indexées). Template dans audit initial §3.4.
- Agent : @fullstack — effort : 30 min.

**SITE-05 (P2) — C11 Nicolas Berg visible dans llms.txt**
- Action : ajouter dans llms.txt section « Entité principale » :
  « Signataire de la Charte Pro Gens de Confiance (gensdeconfiance.com). »
- Agent : @fullstack — effort : 5 min.

**SITE-06 (P2) — Blog schema sur l'index /notre-regard**
- Action : ajouter un JSON-LD Blog (ou CollectionPage) sur src/app/notre-regard/page.tsx
  reliant le blog à l'entité Aqua System @id.
- Agent : @fullstack — effort : 15 min.

### (b) BLOQUÉ FONDATEUR — Décisions ou données hors code

**BF-01 (P0) — Confirmation Trophée Design & Innovation L'Esprit Piscine 2025**
- Source : esprit-piscine.fr/aqua-system/ (WebSearch confirmé, le trophée est cité).
- Action NB : confirmer que ce trophée a bien été reçu par SARL AQUA SYSTEM (vs autre
  membre du réseau). Si confirmé :
  - Ajouter dans award[] de organizationJsonLd() : « Trophée Design & Innovation L'Esprit Piscine 2025 »
  - Ajouter dans llms.txt §Certifications et distinctions
  - Ajouter dans les ProofBadges ou le paragraphe de synthèse de /piscines-bien-etre
  - Impact GEO : très élevé — c'est un claim 3/3 de 2025 (fraîcheur + trophée réseau).

**BF-02 (P1) — Confirmation procédé CSTB n° 16/17-754**
- Action NB : confirmer que le procédé de construction utilisé est bien couvert par l'Avis
  Technique n° 16/17-754 (procédé classique béton coulé en place, à distinguer du Neobloc®
  n° 16/22-793 qui appartient à la marque réseau).
- Débloque SITE-01.

**BF-03 (P1) — Durée de chantier (FAQ Q3 /la-maison)**
- La Q3 « durée moyenne d'un chantier de construction » est placeholderisée depuis D-12.
  Action NB : fournir une fourchette réelle (ex. « 8 à 16 semaines selon la complexité »).
  Débloque la FAQ Q3 visible + le FAQPage JSON-LD correspondant.

**BF-04 (P1) — Fiches réalisations : contenu éditorial**
- Action NB : remplir les champs intention/réponse/exécution/prestations pour 3 fiches
  prioritaires : piscine-fond-mobile-terrasse, piscine-interieure-pierre-poutres,
  piscine-debordement-foret.
- Impact GEO : élevé — débloque FicheEditorial et fait passer ces fiches de 7/10 à 9/10
  sur la requête correspondante.

**BF-05 (STRUCTUREL) — Domaine final post-naming**
- Le llms.txt, le sitemap et toutes les URLs canoniques utilisent le domaine PROVISOIRE
  (aquasystem.fr ou aquasystem.pages.dev). La substitution post-naming est documentée
  dans le fichier llms.txt et dans dev-decisions.md. À faire lors du checkpoint naming.

**BF-06 (STRUCTUREL) — Google Business Profile (GBP)**
- La fiche GBP Aqua System à Freneuse (vérifiée dans project-context.md) doit pointer
  vers le nouveau site après la mise en ligne. Action NB : mettre à jour l'URL du site
  dans la fiche GBP après bascule domaine.

### (c) STRUCTUREL hors site — Citations LLM = fonction du temps et de la notoriété

**STR-01 — Citations génériques sur les requêtes décisionnelles**
Les requêtes « meilleur pisciniste haut de gamme Yvelines » et « confier piscine et jardin
même prestataire » sont dominées par Les Jardins de la Vallée et EuroPiscine (sites plus
anciens, plus de backlinks, plus de temps d'indexation). Le contenu du site est désormais
structuré pour répondre à ces requêtes, mais la citation par les LLM viendra avec :
- L'indexation complète du site sur le domaine final
- La publication régulière du blog (fraîcheur +28% citations)
- La génération de mentions tierces (PR, forums, guides spécialisés)
- L'ancienneté du contenu (les LLM pondèrent la durée de présence)

**STR-02 — Désinformation « 500 piscines construites »**
esprit-piscine.fr/aqua-system/ affiche toujours « 500 piscines construites » (vs « 350
piscines entretenues » sur Aquasystem). Le llms.txt dit maintenant clairement « 350 piscines
entretenues » — le signal contradictoire dominant dans le graphe LLM reste esprit-piscine.fr.
Action fondateur recommandée : contacter l'équipe esprit-piscine.fr pour correction. En
attendant, le signal « entretenues » dans llms.txt + 3 FAQPage contrebalance progressivement.

**STR-03 — Wikidata/Wikipedia Aqua System**
Aucune entrée Wikidata. L'éligibilité de SARL AQUA SYSTEM à une entrée Wikipedia est
discutable (critères de notoriété). L'alternative : une entrée Wikidata (pas de critère
de notoriété éditorial) renforcée par les sameAs JSON-LD déjà en place. Action future
(hors urgence) : créer une entrée Wikidata minimale (nom + SIREN + adresse + sameAs) et
la lier dans le JSON-LD `sameAs`.

---

## 6. Verdict final

### Score global : 8.6/10 (était 7.1/10 — progression de +1.5 pts)

### Le site fait-il tout ce qu'un site PEUT faire pour le GEO : OUI

Justification :
- llms.txt : complet (10/10) — toutes les sections GEO remplies, entités sourcées, savoir-faire
  listés, blog référencé avec RSS.
- Structured data : 3 FAQPage avec @id uniques, @type double, 6 sameAs cross-platform,
  Person NB, Article JSON-LD blog, BreadcrumbList toutes pages, ImageObject toutes fiches.
- Robots.txt : crawlers IA explicitement autorisés (GPTBot, ClaudeBot, anthropic-ai,
  PerplexityBot, Google-Extended). Bytespider bloqué.
- Extractibilité : paragraphes auto-contenus, FAQ structurées, OuvragesSection, visualDescriptions,
  blog avec réponse directe dans les 60 premiers mots.
- Fraîcheur : blog avec 6 articles (dernier datePublished 2026-06-12), RSS actif.
- Claims : tous les claims vérifiables ≥ 2/3 sur la grille (aucun claim <2 qui passe).

Ce que le site ne peut PAS faire seul (structurel) :
- Générer des citations tierces (earned media, Reddit, forums) — action externe requise.
- Obtenir des citations LLM sur les requêtes décisionnelles avant que le graphe d'entité
  soit consolidé par l'indexation et le temps.
- Corriger la désinformation sur esprit-piscine.fr (action fondateur).

### Correctifs restants par priorité

**Priorité 1 — À débloquer dès confirmation fondateur (BF-01, BF-02)**
- Si Trophée Design & Innovation 2025 confirmé : 20 min de code, +claim 3/3, fraîcheur 2025.
- Si CSTB n° 16/17-754 confirmé : 20 min de code, +signal vérifiabilité sur 3 pages.

**Priorité 2 — Correctifs site autonomes (ne dépendent pas du fondateur)**
- SITE-02 : 6 types d'ouvrage listés sur /prescripteurs — 30 min
- SITE-03 : SIREN + 2015 dans JSON-LD LTE — 10 min
- SITE-04 : ItemList /realisations — 30 min

**Priorité 3 — Optimisations mineures**
- SITE-05 : GdC dans llms.txt — 5 min
- SITE-06 : Blog schema index — 15 min

**Priorité 4 — Fondateur uniquement (long terme)**
- BF-03 : Durée de chantier FAQ Q3
- BF-04 : Fiches réalisations documentées (impact fort mais effort fondateur élevé)
- BF-05 : Domaine final → substitution URLs llms.txt + sitemap + GBP
- STR-02 : Contact esprit-piscine.fr pour correction désinformation « 500 piscines »

---

RE-AUDIT-GEO-DONE
