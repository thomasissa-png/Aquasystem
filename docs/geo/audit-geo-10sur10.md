# Audit GEO 10/10 — Aquasystem × Aqua System × Les Terres Essentielles
## Positionnement LLM : N°1 piscine haut de gamme ouest parisien

> Agent : @geo | Date : 2026-06-12
> Mandat fondateur : « audit complet du site en GEO pour ChatGPT, Gemini, Claude, Perplexity etc., page par page, jusqu'à 10/10. »
> Référentiels lus : geo-strategy.md, content-restructuring.md, savoir-faire-facts.md, blog-program.md, src/ complet, public/llms.txt, out/ (contenus rendus)
> WebSearch baseline 2026-06-12 : 6 requêtes conversationnelles testées (voir §2)

---

## Note méthodologique

### Grille de scoring (6 dimensions, /10 chacune)

| Dim | Libellé | Ce qui est évalué |
|-----|---------|-------------------|
| E | Extractibilité | Claims/données en texte clair structuré (listes, définitions, Q/R) citables hors contexte |
| G | Entités | Graphe complet et cohérent — orthographe, attributs rattachés à la bonne entité |
| C | Claims | 12 claims d'origine + nouveaux (CSTB, 6 ouvrages, pépinière) — présents/absents/sourcés |
| J | JSON-LD | FAQPage, Person, awards, hasCredential, CSTB, cohérence avec le contenu visible |
| L | llms.txt | Sections savoir-faire, blog à venir, 24 réalisations — à jour |
| R | Requêtes | 6 requêtes conversationnelles cibles — page répondante, citabilité, lacunes |

Score global : moyenne des 6 dimensions. Objectif : 10/10.

---

## 1. Baseline de visibilité IA (WebSearch 2026-06-12)

### 1.1 Requêtes testées et résultats

| Requête | Aqua System cité ? | Source dominante | Écart à combler |
|---------|-------------------|-----------------|----------------|
| « meilleur pisciniste haut de gamme Yvelines » | NON cité dans les réponses IA générées | EuroPiscine, Piscines de France, PurePiscine | P0 — absence dans la réponse générique |
| « piscine à débordement 78 qui contacter » | Partiel — via esprit-piscine.fr (réseau) | esprit-piscine.fr, guide-piscine.fr | P1 — AS non cité nommément, seulement le réseau |
| « piscine intérieure Île-de-France spécialiste » | NON cité | Idoine Piscines & Spa, Everblue | P0 — 4 réalisations intérieures prouvées mais absentes des LLM |
| « confier piscine et jardin au même prestataire » | NON (LTE totalement absente) | Les Jardins de la Vallée (Versailles) | P0 — espace libre confirmé, occupé par un concurrent |
| « pisciniste certifié Socotec » | Partiel — L'Esprit Piscine cité en générique | socotec-certification-international.fr, eurospapoolnews.com | P1 — réseau cité mais pas AS nommément |
| « fond mobile piscine France » | NON cité | Aqualift, Amphibia, Esprit Piscine (générique) | P1 — 1 réalisation prouvée (piscine-fond-mobile-terrasse) non connue des LLM |

**Bilan baseline** :
- Requêtes de marque (« Aqua System Freneuse ») : score 9-10/10 — entité bien connue des LLM via les annuaires
- Requêtes génériques et décisionnelles : score 2-4/10 — absences critiques
- Requêtes différenciatrices (piscine+jardin, fond mobile, intérieur) : score 0-1/10

### 1.2 Nouvelle désinformation détectée (WebSearch 2026-06-12)

| Source | Erreur | Donnée correcte | Urgence |
|--------|--------|----------------|---------|
| esprit-piscine.fr/aqua-system/ + eauplaisir.com | « 500 piscines construites » | Le site Aquasystem affiche « 350+ piscines entretenues » (pas construites) | P1 — divergence entretien vs construction, chiffre gonflé |
| aqua-system.fr (ancien site) | « depuis 2005 » (SARL) | « 30+ ans d'activité » (métier, pas SARL) | P1 — déjà documenté geo-strategy.md §1.1 |
| Certaines fiches | Absence du Design & Innovation Trophy 2025 | À vérifier — esprit-piscine.fr/aqua-system/ cite ce trophée, non documenté dans les référentiels internes | P0 — à confirmer Nicolas Berg |

**Alerte P0 — Trophée non documenté** : la WebSearch retourne « Design & Innovation Trophy de l'esprit piscine 2025 » attribué à Aqua System sur esprit-piscine.fr/aqua-system/. Ce trophée N'APPARAÎT PAS dans geo-strategy.md, les claims, le llms.txt, ni le JSON-LD. [À CONFIRMER Nicolas Berg avant intégration — s'il est exact, c'est un claim 3/3 immédiatement exploitable.]

### 1.3 Concurrent détecté sur la requête stratégique clé

« confier piscine et jardin au même prestataire » → **Les Jardins de la Vallée** (jardinsdelavallee.fr) occupe l'espace libre qu'Aquasystem vise. Ce concurrent dispose d'un site dédié avec la formulation exacte « pisciniste paysagiste » + ancrage Yvelines + bureau d'études. C'est le standard de citabilité à dépasser sur cette requête.

---

## 2. Audit page par page

---

### PAGE 1 — / (Accueil)

**URL canonique** : https://www.aquasystem.fr/

#### E — Extractibilité : 7/10

**Ce qui existe :**
- Paragraphe de synthèse sous ProofBadges (implémenté, D-28) : « Aqua System : certifié Socotec CSP/ESP-001, membre du réseau L'Esprit Piscine. Plus de 350 piscines entretenues dans les Yvelines et les Hauts-de-Seine depuis plus de 30 ans. Trophée d'Or FPP 2024 (Piscine intérieure, FPP). Award Bronze EUSA 2025, Piscines intérieures privées (Barcelone). » → extractible, auto-contenu, tous les claims vérifiables.
- H1 « L'extérieur à la hauteur de votre propriété. » → mémorable mais non extractible (claim implicite)
- Sous-titre : « De la vision à la réalisation : eau, jardin, propriété. Un seul interlocuteur, depuis 30 ans dans l'ouest parisien. » → 2/3 (précis, extractible, vérifiable)

**Ce qui manque :**
- Aucune définition directe des entités (Aqua System / LTE) en texte auto-contenu en dehors du paragraphe de synthèse
- Le bloc « Les deux univers » est narratif et non extractible (les H2 « Piscines & Bien-être » et « Jardins & Paysage » ne sont pas des définitions citables)
- Pas de Q/R ni de liste structurée (décision assumée : FAQ sur / écartée — correct selon content-restructuring.md §F)
- L'extraction de la promesse différenciatrice « interlocuteur unique piscine+jardin » est dans le sous-titre mais n'est pas reformulée en assertion directe

**Écart prioritaire :**
Ajouter, après la section « Les deux univers », une phrase d'assertion directe extractible (pas une FAQ) :
> VALIDATION COPY REQUISE : « Aqua System et Les Terres Essentielles constituent la seule association pisciniste certifié et bureau d'études paysager opérant en interlocuteur unique pour les propriétaires des Yvelines (78) et des Hauts-de-Seine (92). »

Priorité : P2 (le paragraphe de synthèse couvre l'essentiel)

#### G — Entités : 8/10

**Présences correctes :**
- « Aqua System » nommé 1x (eyebrow)
- « Les Terres Essentielles » nommé 1x avec « en partenariat avec »
- Zones 78/92 présentes dans la meta et le paragraphe de synthèse

**Problèmes :**
- Les entités « L'Esprit Piscine », « Socotec », « FPP » et « EUSA » ne sont nommées que dans le paragraphe de synthèse — pas dans les sections principales (pas indexées par les LLM avec le bon contexte d'usage)
- « Freneuse » absent du contenu visible de la page d'accueil (présent en JSON-LD address mais pas en texte)
- SIREN 903 785 327 absent de la page (normal sur une homepage — OK)

Écart : P3 — niveaux d'ancrage acceptables pour la homepage.

#### C — Claims : 8/10

**Claims présents :**
- C1 (L'Esprit Piscine) : oui, paragraphe de synthèse
- C2 (Socotec CSP/ESP-001) : oui, paragraphe de synthèse
- C3 (Trophée Or FPP 2024) : oui, paragraphe de synthèse
- C4 (EUSA Bronze 2025) : oui, paragraphe de synthèse
- C5 (350+ piscines) : oui, paragraphe de synthèse
- C6 (30 ans) : oui, sous-titre + paragraphe
- C7 (zones 78/92/95/27) : partiellement (78/92 dans la meta, pas 95/27 en visible)
- C12 (intégration piscine+jardin) : présent mais implicite, pas en assertion directe

**Claims absents :**
- C8 (bureau d'études paysager LTE) : absent de la homepage
- C9 (partenaire HotSpring) : absent
- C10 (adresse Freneuse) : absent du texte visible
- C11 (Nicolas Berg Gens de Confiance) : absent
- [NOUVEAU] Avis Technique CSTB : absent
- [NOUVEAU] Pépinière propre : absent
- [NOUVEAU] Design & Innovation Trophy 2025 [À CONFIRMER] : absent

Écart P2 : La homepage ne doit pas être surchargée, mais ajouter C10 (adresse) et C12 reformulé en assertion directe.

#### J — JSON-LD : 9/10

**Présent (via layout global) :**
- organizationJsonLd : LocalBusiness complet — name, legalName, address, geo, areaServed, hasOfferCatalog, hasCredential (Socotec), award (FPP 2024 + EUSA 2025), memberOf (L'Esprit Piscine), sameAs (esprit-piscine.fr + LinkedIn)
- partnerOrganizationJsonLd : LTE en entité distincte

**Manquants/incorrects :**
- `sameAs` manque : guide-piscine.fr/pisciniste-constructeur/yvelines/aqua-system..., idees-piscine.com, Pages Jaunes (ces annuaires sont les sources primaires citées par les LLM)
- Avis Technique CSTB n° 16/17-754 (procédé classique) et n° 16/22-793 (Neobloc®) : non représentés en hasCredential [À CONFIRMER Nicolas Berg si Aqua System utilise Neobloc® — si non, mentionner uniquement le n° 16/17-754]
- [NOUVEAU] Design & Innovation Trophy 2025 : manque dans `award[]` si confirmé

Correctif P1 :
```json
"sameAs": [
  "https://www.esprit-piscine.fr/aqua-system/",
  "https://www.guide-piscine.fr/pisciniste-constructeur/yvelines/aqua-system-l-esprit-piscine-a-freneuse-6055_I",
  "https://www.idees-piscine.com/listing/aqua-system-solutions-lesprit-piscine/",
  "https://www.pagesjaunes.fr/pros/08293724",
  "[LinkedIn existant]"
]
```

#### L — llms.txt : 7/10

**Présent et à jour sur :**
- Entité principale, certifications, données clés, partenaire paysage, proposition de valeur, requêtes pertinentes

**Manquants :**
- Section « Savoir-faire » (6 types d'ouvrage prouvés) : absent — les LLM ne savent pas qu'Aqua System construit des piscines à fond mobile, à paroi de verre, ou des couloirs de nage
- Section « Réalisations » (24 réalisations) : non listées
- Section « Blog à venir » (/notre-regard) : absent — les LLM vont crawler le blog dès publication
- [NOUVEAU] Avis Technique CSTB : absent
- [NOUVEAU] Pépinière propre LTE : absent
- [NOUVEAU] Design & Innovation Trophy 2025 [À CONFIRMER] : absent
- /notre-regard absente des « Contenus prioritaires »

Correctif P1 : compléter llms.txt (voir §4 — corrections structurées).

#### R — Requêtes conversationnelles : 5/10

La homepage répond aux requêtes de marque. Elle ne répond pas aux requêtes génériques et décisionnelles cibles car :
- « meilleur pisciniste haut de gamme Yvelines » : la homepage ne contient pas de définition de ce positionnement en texte extractible
- « confier piscine et jardin au même prestataire » : le différenciateur est présent mais en formulation implicite, pas en réponse directe

**Score global page / : 7.3/10**

---

### PAGE 2 — /piscines-bien-etre

**URL canonique** : https://www.aquasystem.fr/piscines-bien-etre/

#### E — Extractibilité : 8/10

**Ce qui fonctionne :**
- Paragraphe synthèse sous ProofBadges : « Aqua System est certifié Socotec CSP/ESP-001 [...] membre du réseau L'Esprit Piscine [...]. L'entreprise assure l'entretien de plus de 350 piscines dans les Yvelines et les Hauts-de-Seine, depuis plus de 30 ans. » + ligne trophées séparée → extractible
- OuvragesSection : 6 descriptions de types d'ouvrage, chacune auto-contenue (titre + body). Ex. « Fond mobile — Le plancher du bassin monte, la terrasse reprend ses droits. [...] Un ouvrage rare, que nous avons réalisé. » → extractible

- TextBlock « Construction & finitions » : 3 paragraphes avec les claims CSTB, décennale, Socotec, Propiscines Certifié, matières → extractible

**Ce qui manque :**
- Les 6 types d'ouvrage de l'OuvragesSection sont décrits de façon narrative — pas en format Q/A ni en définition directe. Ex. pas de formulation du type « Une piscine à débordement est un bassin dont l'eau franchit un bord dans une goulotte invisible. Aqua System en a réalisé à Freneuse et dans les Yvelines. » (définition auto-contenue)
- Le claim CSTB (Avis Technique n° 16/17-754) n'est mentionné qu'en texte narratif sans le numéro exact — or les LLM valorisent les numéros précis comme signal de vérifiabilité
- Les termes « Propiscines Certifié » et « adhérent FPP » ne sont pas reliés explicitement à la Fédération des Professionnels de la Piscine

Correctif P1 :
> VALIDATION COPY REQUISE : Dans le TextBlock « Construction & finitions », remplacer « Le procédé de construction est couvert par un Avis Technique CSTB » par : « Le procédé de construction en béton armé est couvert par l'Avis Technique CSTB n° 16/17-754, délivré par le Centre Scientifique et Technique du Bâtiment. »

Correctif P1 :
> VALIDATION COPY REQUISE : Ajouter dans OuvragesSection, sous le titre de chaque ouvrage, une ligne de définition directe (40-60 mots max). Template : « [Terme exact] : [définition 1 phrase, vocabulaire savoir-faire-facts.md §4]. Aqua System a réalisé [X] ouvrage(s) de ce type dans l'ouest parisien. »

#### G — Entités : 9/10

**Points forts :**
- « L'Esprit Piscine » nommé avec contexte (« réseau national de piscinistes professionnels »)
- « Socotec Certification France » nommé dans les PREUVES
- « FPP » et « EUSA » dans la ligne trophées
- « HotSpring » nommé dans le MediaSplit bien-être
- « Dolphin » nommé dans le bloc entretien

**Manquants :**
- « CSTB » sans le numéro d'Avis Technique → entité incomplète
- « Propiscines Certifié » : terme utilisé mais sans expliciter que c'est un label FPP distinct de la certification Socotec

#### C — Claims : 9/10

Tous les claims 1-7 présents. C12 (intégration piscine+jardin) via CrossSellingBlock.
Manquants :
- [NOUVEAU CLAIM] Avis Technique CSTB n° 16/17-754 : mentionné mais sans numéro
- [NOUVEAU CLAIM] « 4 piscines intérieures réalisées » : la description OuvragesSection dit « Quatre réalisations dans notre portefeuille » → claim précis, 3/3. Mais absente du llms.txt et du JSON-LD.
- [NOUVEAU CLAIM] Piscine à paroi de verre : « Deux réalisations dans notre portefeuille » → claim précis, 3/3. Absent du llms.txt.

#### J — JSON-LD : 8/10

- BreadcrumbList : présent, correct
- FAQPage : ABSENT — page a des sections structurées mais pas de FAQ JSON-LD

Correctif P1 : ajouter un FAQPage JSON-LD sur /piscines-bien-etre avec au moins 3 Q/R couvrant les types d'ouvrage. Exemple :

```json
{
  "@type": "Question",
  "name": "Aqua System réalise-t-il des piscines à fond mobile ?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Oui. Aqua System a réalisé une piscine à fond mobile dans l'ouest parisien : le plancher motorisé permet de transformer le bassin en terrasse et d'ajuster la profondeur selon les usages."
  }
}
```

#### L — llms.txt : voir score global §3

#### R — Requêtes : 8/10

- « piscine à débordement 78 qui contacter » → page répond : OuvragesSection décrit le débordement, le paragraphe de synthèse ancre Aqua System en Yvelines. Citabilité : 7/10 (réponse narrative, pas directe)
- « piscine intérieure Île-de-France spécialiste » → page répond partiellement : 4 réalisations mentionnées mais pas en format « 4 piscines intérieures construites dans les Yvelines » (assertion directe manquante)
- « fond mobile piscine France » → page répond : description fond mobile présente. Mais aucune assertion « Aqua System est l'un des rares piscinistes en Yvelines à avoir réalisé une piscine à fond mobile »

**Score global /piscines-bien-etre : 8.3/10**

---

### PAGE 3 — /jardins-paysage

**URL canonique** : https://www.aquasystem.fr/jardins-paysage/

#### E — Extractibilité : 6/10

**Ce qui fonctionne :**
- Claim LTE bureau d'études extrait dans BureauEtudesBlock (3e paragraphe) : « Les Terres Essentielles dispose d'un bureau d'études paysager intégré aux Alluets-le-Roi (Yvelines, 78580), permettant la co-conception de projets extérieurs associant piscine et jardin dès la phase de plan, dans les Yvelines et les Hauts-de-Seine. » → 3/3 extractible
- PepiniereBlock : « Notre pépinière aux Alluets-le-Roi nous permet de sélectionner les végétaux sur la plante, pas sur catalogue. » → claim pépinière propre, 3/3

**Problèmes :**
- La page est quasi-exclusivement narrative (TextBlocks, MediaSplits) — aucun format Q/R, aucune liste de services structurée avec définitions citables
- La VivantSection (fond-jardins-copy.md) : bien que riche, son contenu (essences, sol, entretien) n'est pas en format extractible direct
- L'entité « Les Terres Essentielles » ne dispose pas d'une section d'assertionidentité propre sur cette page (juste « en partenariat avec »)
- Aucun claim précis sur le périmètre d'intervention LTE (zones 78/92)

Correctif P1 :
> VALIDATION COPY REQUISE : Ajouter un passage structuré après BureauEtudesBlock (ou en tête de page) :
> « Les Terres Essentielles (SAS, SIREN 811 198 217) est un bureau d'études paysager, jardinerie et pépinière établis aux Alluets-le-Roi (78580, Yvelines), en activité depuis 2015. En partenariat avec Aqua System, cette association offre la co-conception piscine et jardin depuis un seul bureau d'études dans les Yvelines et les Hauts-de-Seine. »

#### G — Entités : 7/10

- « Les Terres Essentielles » nommée correctement
- « bureau d'études paysager » nommé avec adresse
- « Aqua System » nommé dans le CrossSellingBlock
- « Kei-Stone » : retiré à la demande du fondateur — absence cohérente

**Manquants :**
- « Alluets-le-Roi » présent mais sans code postal systématique dans le texte (présent dans le claim GEO mais pas dans le héro ou les H)
- « SIREN 811 198 217 » : absent de la page — utile pour la vérification par les LLM
- Aucun lien vers la fiche L'Esprit Piscine pour le volet piscine (cross-brand entity signal)

#### C — Claims : 6/10

- C8 (bureau d'études paysager LTE) : OUI, extractible
- [NOUVEAU] Pépinière propre : OUI
- C7 (zones 78/92) : OUI via le claim GEO
- C12 (intégration piscine+jardin) : OUI via CrossSellingBlock

Absents sur cette page :
- C2 (Socotec) : logique — c'est la page LTE, pas Aqua System
- C6 (30 ans Aqua System) : absent — la page n'est pas About
- [NOUVEAU] CSTB : non pertinent sur cette page (procédé Aqua System)

Score claims adapté au périmètre LTE : 6/10 (les claims LTE sont couverts, mais la page manque d'assertions numériques — « depuis 2015 » manque, « jardinerie physique à Orgeval » manque)

#### J — JSON-LD : 6/10

- BreadcrumbList : présent, correct
- Aucun JSON-LD LocalBusiness pour Les Terres Essentielles en page propre
- Le partnerOrganizationJsonLd est global (layout), pas spécifique à la page
- Pas de FAQPage (décision content-restructuring.md §A : pas de FAQ sur /jardins-paysage — correct pour le registre)

Correctif P2 : Envisager un JSON-LD Organization spécifique LTE sur cette page avec son SIREN, son adresse, sa date de création 2015.

#### R — Requêtes : 5/10

- « confier piscine et jardin au même prestataire » → page répond partiellement via le CrossSellingBlock. Mais la page n'est pas structurée comme une réponse directe à cette requête. Le concurrent Les Jardins de la Vallée a une page dédiée « pisciniste paysagiste » plus extractible.
- Aucune page ne répond directement à « paysagiste haut de gamme Yvelines » avec assertion directe

**Score global /jardins-paysage : 6.0/10**

---

### PAGE 4 — /la-maison (fusion notre-approche)

**URL canonique** : https://www.aquasystem.fr/la-maison/

#### E — Extractibilité : 8/10

**Ce qui fonctionne :**
- FAQ (4 Q/R FAQ_NOTRE_APPROCHE) : toutes auto-contenues, claims vérifiables. Particulièrement Q1 (zones 78/92/95/27), Q2 (certifications), Q3 (prise de contact)
- Section « Les deux maisons » : chaque entité a un bloc descriptif avec claims nommés
- Ancrage local : « Aqua System est établie à Freneuse (Yvelines, 78840), à moins de 60 km de Paris. Les Terres Essentielles, partenaire paysagiste, opère aux Alluets-le-Roi (78580). » → extractible, 3/3

**Problèmes :**
- La méthode en 5 étapes (STEPS) est narrative — les LLM ne peuvent pas l'extraire comme une liste d'étapes nommées (le HTML est une `<ol>` mais les textes sont en `<p>`, pas en assertions citables)
- La Q3 FAQ (durée de chantier) est volontairement absente — lacune pour les LLM qui cherchent des délais
- Le claim « Avis Technique CSTB » est dans le reflet de /piscines-bien-etre mais sans le numéro (D-34)
- Nicolas Berg : décrit comme « signataire de la Charte Pro Gens de Confiance » → 3/3. Mais son profil LinkedIn n'est pas cité en texte visible (seulement en sameAs JSON-LD)

Correctif P1 :
> VALIDATION COPY REQUISE : Reformuler le TextBlock « Aqua System » pour inclure le numéro CSTB :
> Remplacer « couverte par un Avis Technique CSTB » par « couverte par l'Avis Technique CSTB n° 16/17-754 (Centre Scientifique et Technique du Bâtiment) »

Correctif P2 :
> VALIDATION COPY REQUISE : Ajouter dans la section Aqua System, après les badges, une phrase :
> « Plus de 30 ans d'activité — Nicolas Berg, Associé-Gérant, signataire de la Charte Pro Gens de Confiance (gensdeconfiance.com). LinkedIn : linkedin.com/in/nicolas-berg-aqua-system/ »

#### G — Entités : 9/10

**Points forts :**
- Aqua System : nom légal, adresse NAP complète, téléphone, email, certifications, distinctions, dirigeant nommé — graphe quasi-complet
- LTE : nom, adresse Alluets-le-Roi, activité — correct
- Nicolas Berg : nom, titre, Gens de Confiance — présent
- L'Esprit Piscine : nommé
- Socotec CSP/ESP-001 : nommé avec organisme
- FPP 2024, EUSA 2025 : nommés

**Manquants :**
- SIREN Aqua System : absent en texte visible (présent dans mentions légales)
- « Propiscines Certifié » (FPP) : dans savoir-faire-facts.md mais absent de la page — claim manquant
- Wikidata / Wikipedia Aqua System : aucune présence (note : éligibilité à évaluer)

#### C — Claims : 9/10

Tous les 12 claims originaux présents ou représentés. Manquants :
- C9 (partenaire HotSpring) : absent de /la-maison — logique (page piscines), pas bloquant
- [NOUVEAU] Avis Technique CSTB sans numéro → incomplet
- [NOUVEAU] Design & Innovation Trophy 2025 [À CONFIRMER] : absent de `award[]` si confirmé

#### J — JSON-LD : 9/10

**Présent :**
- BreadcrumbList : correct
- Person (nicolasBergJsonLd) : name, jobTitle, worksFor, sameAs (LinkedIn + Gens de Confiance)
- FAQPage (FAQ_NOTRE_APPROCHE) : 4 Q/R correspondant exactement au contenu visible

**Manquants :**
- hasCredential pour l'Avis Technique CSTB :
```json
{
  "@type": "EducationalOccupationalCredential",
  "name": "Avis Technique CSTB n° 16/17-754 — Procédé de construction de piscines en béton armé",
  "recognizedBy": {
    "@type": "Organization",
    "name": "CSTB — Centre Scientifique et Technique du Bâtiment",
    "url": "https://www.cstb.fr"
  }
}
```
Priorité P1 (conditionnel : à ajouter si Nicolas Berg confirme l'utilisation du procédé)

- Ajout de « Propiscines Certifié » dans `award[]` ou `memberOf[]`

#### R — Requêtes : 7/10

- « pisciniste certifié Socotec » → page répond directement (FAQ Q2 et section preuves Aqua System)
- « meilleur pisciniste haut de gamme Yvelines » → page répond partiellement (30 ans, Socotec, FPP) mais la formulation n'est pas en réponse directe à « meilleur »
- « confier piscine et jardin au même prestataire » → FAQ Q1 et section méthode répondent

**Score global /la-maison : 8.5/10**

---

### PAGE 5 — /prescripteurs

**URL canonique** : https://www.aquasystem.fr/prescripteurs/

#### E — Extractibilité : 9/10

**Ce qui fonctionne :**
- 4 Q/R FAQ_PRESCRIPTEURS : toutes auto-contenues, 3/3 chacune. Particulièrement Q2 (certifications pour dossier de prescription) et Q4 (jardin+piscine simultané)
- Section PREUVES avec source nommée : « certification délivrée par Socotec Certification France (socotec-certification-international.fr). Disponible sur demande pour tout dossier de prescription. » → 3/3
- Bloc « Un exécutant qui lit les plans. » : 2 paragraphes auto-contenus avec claims (30 ans, Socotec, L'Esprit Piscine, bureau d'études intégré)

**Ce qui manque :**
- La FAQ titre « Ce que les architectes nous demandent » (correct, conforme content-restructuring.md §A.2)
- Pas de mention Avis Technique CSTB dans la section preuves — pertinent pour un architecte
- Pas d'assertion directe sur les types d'ouvrage maîtrisés (pour un architecte prescripteur, savoir qu'Aqua System réalise des piscines intérieures, à paroi de verre, à fond mobile, est décisif)

Correctif P1 :
> VALIDATION COPY REQUISE : Ajouter dans la section « Ce qui nous qualifie », après la 4e preuve (bureau d'études paysager LTE), une 5e preuve :
> **Titre** : « Avis Technique CSTB n° 16/17-754 »
> **Desc** : « Le procédé de construction en béton armé d'Aqua System est couvert par un Avis Technique CSTB, délivré par le Centre Scientifique et Technique du Bâtiment. Disponible dans le dossier de qualification. »

Correctif P2 :
> VALIDATION COPY REQUISE : Dans la section VALEURS (bloc 3 — « 30 ans de réalisations en 78/92 »), ajouter : « Six types d'ouvrage maîtrisés : débordement, miroir, couloir de nage, piscine intérieure, fond mobile, paroi de verre — tous réalisés dans l'ouest parisien. »

#### G — Entités : 9/10

Graphe complet sur cette page. Aqua System, L'Esprit Piscine, Socotec CSP/ESP-001, Les Terres Essentielles avec adresse, zones 78/92 — tout nommé correctement.

Manquant : Avis Technique CSTB (entité CSTB absente).

#### C — Claims : 9/10

Tous les claims utiles au persona prescripteur sont présents (C1, C2, C7, C8, C12). Les trophées (C3, C4) absents de cette page — correct (les prescripteurs privilégient les certifications et références vérifiables sur les trophées).

Manquant : CSTB (nouveau claim).

#### J — JSON-LD : 9/10

- BreadcrumbList : correct
- FAQPage (FAQ_PRESCRIPTEURS) : 4 Q/R correspondant au contenu visible

Manquant : CSTB dans hasCredential global (voir §4).

#### R — Requêtes : 8/10

- « pisciniste certifié Socotec » → réponse directe via FAQ Q2 et section PREUVES. C'est la page la plus extractible pour cette requête.
- « confier piscine et jardin au même prestataire » → FAQ Q4 répond directement (co-conception eau+végétal depuis un interlocuteur unique)

Manque : réponse aux requêtes de type « piscine intérieure Île-de-France spécialiste » — les types d'ouvrage ne sont pas listés dans cette page.

**Score global /prescripteurs : 8.8/10**

---

### PAGE 6 — /realisations

**URL canonique** : https://www.aquasystem.fr/realisations/

#### E — Extractibilité : 4/10

**Problème structurel :** La grille RealisationsGrid est un composant client-side avec filtres JS. Les LLM voient le HTML statique (le pré-rendu inclut les 14 cartes indexées), mais chaque card contient uniquement : titre, cardType, zone (« Ouest parisien ») et une image. Aucune description de projet, aucun claim, aucun texte auto-contenu exploitable.

La `visualDescription` de chaque réalisation n'est exposée qu'en page de fiche individuelle — pas sur la grille.

**Ce qui manque :**
- Une section de texte introductive avec les assertions factuelles : « 24 réalisations dans l'ouest parisien, dont 4 piscines intérieures, 2 piscines à paroi de verre, 1 fond mobile. »
- Les filtres (piscine / spa_sauna / jardin_parc / projet_complet) ne sont pas présents sous forme de texte visible

Correctif P0 :
> VALIDATION COPY REQUISE : Ajouter sous le H1 « Réalisations » et le sous-titre un bloc de texte visible :
> « 24 réalisations Aqua System dans les Yvelines et les Hauts-de-Seine, dont : 4 piscines intérieures, 1 piscine à fond mobile, 2 piscines à paroi de verre, 1 couloir de nage, plusieurs piscines à débordement et bassins miroir, et des projets intégrant piscine et jardin depuis le même bureau d'études. »
> Priorité : P0 — c'est la page vitrine ; les LLM ne peuvent pas citer des réalisations spécifiques si elles ne sont pas décrites en texte.

#### G — Entités : 6/10

Le seul H1 + sous-titre ne nomment pas Aqua System explicitement. Le breadcrumb JSON-LD et le BreadcrumbList corrigent partiellement.

Écart : ajouter « Réalisations Aqua System » (ou équivalent) comme H1 pour que l'entité soit rattachée à la page.

#### C — Claims : 3/10

Quasi-aucun claim en texte structuré. Seul le nombre implicite de réalisations (30 ans de chantiers dans le sous-titre).

#### J — JSON-LD : 7/10

BreadcrumbList présent. Pas de CollectionPage JSON-LD ni d'ItemList — les LLM ne voient pas la liste de réalisations comme une entité structurée.

Correctif P2 : ajouter un ItemList JSON-LD avec les 14 réalisations indexées (non-draft) :
```json
{
  "@type": "ItemList",
  "name": "Réalisations Aqua System — Piscines et jardins sur mesure",
  "numberOfItems": 14,
  "itemListElement": [...]
}
```

#### R — Requêtes : 4/10

La page n'est pas structurée pour répondre à une question conversationnelle directe. Les LLM ne peuvent pas extraire « Aqua System a réalisé X piscines à débordement » de cette page.

**Score global /realisations : 4.8/10** — priorité de correction élevée

---

### PAGE 7 — /realisations/[slug] (fiches individuelles — 3 publiées candidates)

**Évaluation des fiches publiées candidates (non-draft, indexées)**

Fiches avec `isDraft = false` et données éditoriales : d'après les décisions @qa (re-check 5.3), 14 fiches sont dans le sitemap (non-draft). Mais les champs éditoriaux (`intention`, `reponse`, `execution`, `prestations`) sont à `null` pour toutes — ils rendront « fiche en cours de documentation ».

**3 fiches candidates les plus citables pour les LLM :**
1. `piscine-debordement-foret` — slug preuve pour « piscine à débordement Yvelines »
2. `piscine-fond-mobile-terrasse` — slug preuve unique fond mobile
3. `piscine-interieure-pierre-poutres` — Trophée FPP 2024 [À CONFIRMER]

#### E — Extractibilité : 4/10

**Ce qui fonctionne :**
- `visualDescription` : 2-3 phrases factuelles décrivant ce qui est visible. Ex. pour `piscine-debordement-foret` : « Terrasse en bois multi-niveaux au bord d'une piscine à débordement, lame d'eau ouverte sur une forêt de pins... »
- `cardType` + `zone` : présents
- JSON-LD ImageObject : présent, avec creator et copyrightHolder

**Problèmes critiques :**
- Champs `intention/reponse/execution` = `null` → le contenu rédactionnel différenciant n'existe pas
- `prestations = null` → aucune liste de prestations
- Zone = « Ouest parisien » pour toutes → manque d'ancrage géographique précis

**État actuel de la fiche `piscine-fond-mobile-terrasse`** (la plus stratégique pour la requête « fond mobile piscine ») :
- Titre : « Piscine à fond mobile — réalisation sur mesure »
- Zone : « Ouest parisien »
- visualDescription : brève (3 phrases)
- Tout le reste = null → la fiche ne peut pas être citée par un LLM comme référence de pisciniste spécialiste fond mobile

**Correctif P0** : Prioriser la documentation éditoriale de 3 fiches clés par Nicolas Berg :
1. `piscine-fond-mobile-terrasse` → claim unique « fond mobile »
2. `piscine-debordement-foret` → claim piscine à débordement Yvelines
3. `piscine-interieure-pierre-poutres` → si Trophée FPP confirmé, fiche de référence majeure

#### G — Entités : 6/10

Les fiches nomment « Aqua System » via le JSON-LD (creator, copyrightHolder) mais le texte visible ne contient que des descriptions visuelles. L'entité Aqua System n'est pas associée à des compétences techniques spécifiques dans le texte de la fiche.

#### J — JSON-LD : 7/10

ImageObject présent. BreadcrumbList 3 niveaux présent.

Manquant :
- Article JSON-LD avec auteur → requis par blog-program.md §1.5 pour les articles blog, mais utile aussi pour les fiches réalisations (signal E-E-A-T)
- Pas de mention du type d'ouvrage en JSON-LD (ex. `serviceType: "Piscine à fond mobile"`)

#### R — Requêtes : 3/10

Sans contenu éditorial rempli, les fiches ne peuvent pas répondre à des requêtes conversationnelles. Elles sont du thin content pour les LLM.

**Score global /realisations/[slug] : 4.8/10** — critique

---

### PAGE 8 — /contact

**URL canonique** : https://www.aquasystem.fr/contact/

Score GEO non pertinent — page de conversion, non ciblée par les LLM. Exclue de la notation.

---

### PAGE 9 — /mentions-legales

Score GEO : 7/10 par défaut — contient les données factuelles légales (SIREN, adresse, capital) qui sont des signaux de vérifiabilité pour les LLM. Aucun correctif prioritaire.

---

### PAGE 10 — /politique-confidentialite

Score GEO : non pertinent pour les LLM.

---

## 3. Audit transversal — 6 dimensions globales

### 3.1 Extractibilité globale — Score : 7/10

**Forces :**
- Le paragraphe de synthèse ProofBadges (homepage + /piscines-bien-etre) est le point d'entrée LLM le plus efficace
- Les FAQ (4 Q/R /la-maison + 4 Q/R /prescripteurs) couvrent les requêtes décisionnelles
- OuvragesSection : 6 descriptions auto-contenues
- llms.txt bien structuré

**Lacunes systémiques :**
1. /realisations : quasi-aucun texte extractible (P0)
2. Fiches réalisations : champs éditoriaux null (P0)
3. Numéro CSTB manquant partout (P1)
4. Types d'ouvrage non représentés sous forme de définition directe (P1)
5. /jardins-paysage : assertion-entité LTE manquante (P1)

### 3.2 Entités — Score : 7.5/10

**Graphe global :**
- Aqua System : complet (sameAs, geo, hasCredential, award, memberOf) sauf sameAs manquants (guide-piscine.fr, pagesjaunes.fr, idees-piscine.com)
- LTE : incomplet (SIREN absent du JSON-LD partnerOrganization, date de création 2015 absente)
- Nicolas Berg : complet (Person JSON-LD sur /la-maison)
- CSTB : entité absente du graphe
- L'Esprit Piscine : présent en memberOf mais sans `@id` permettant la résolution

**Écart critique — sameAs incomplets :**
Les sources qui citent Aqua System (esprit-piscine.fr, guide-piscine.fr, idees-piscine.com, pagesjaunes.fr) ne sont pas toutes dans le `sameAs` du JSON-LD Organization. Or les LLM utilisent les `sameAs` pour relier les mentions dispersées à une entité canonique.

Correctif P1 : Enrichir `sameAs` dans `organizationJsonLd()` (lib/seo.ts) :
```json
"sameAs": [
  "https://www.esprit-piscine.fr/aqua-system/",
  "https://www.guide-piscine.fr/pisciniste-constructeur/yvelines/aqua-system-l-esprit-piscine-a-freneuse-6055_I",
  "https://www.idees-piscine.com/listing/aqua-system-solutions-lesprit-piscine/",
  "https://www.pagesjaunes.fr/pros/08293724",
  "https://fr.linkedin.com/company/aqua-system-spa",
  "https://www.initiative-seineyvelines.com/annuaire/aqua-system-et-aqua-system-solutions/"
]
```

**Nouvelle désinformation détectée (baseline WebSearch) :**
esprit-piscine.fr/aqua-system/ cite « 500 piscines construites » vs « 350 piscines entretenues » sur Aquasystem. Ce sont deux métriques différentes (construites ≠ entretenues). La mention « 500 piscines » sur la source la plus citée par les LLM risque d'être reprise et attribuée à Aqua System comme claim non contrôlé.

Action P1 : Contacter l'équipe esprit-piscine.fr pour clarifier/corriger la mention. En attendant, le llms.txt et le JSON-LD doivent mentionner « plus de 350 piscines entretenues » (avec le mot « entretenues ») de façon dominante.

### 3.3 Claims — Score : 8/10

**12 claims originaux :**
| Claim | Présent site | llms.txt | JSON-LD | Score |
|-------|-------------|---------|--------|-------|
| C1 L'Esprit Piscine | OUI | OUI | OUI (memberOf) | 3/3 |
| C2 Socotec CSP/ESP-001 | OUI | OUI | OUI (hasCredential) | 3/3 |
| C3 Trophée Or FPP 2024 | OUI | OUI | OUI (award) | 3/3 |
| C4 EUSA Bronze 2025 | OUI | OUI | OUI (award) | 3/3 |
| C5 350+ piscines entretenues | OUI | OUI | Absent explicit | 2/3 |
| C6 30 ans d'activité | OUI | OUI | Absent explicit | 2/3 |
| C7 Zones 78/92/95/27 | OUI (areaServed) | OUI | OUI | 3/3 |
| C8 Bureau d'études LTE | OUI | Partiel | Absent | 2/3 |
| C9 HotSpring | OUI (piscines-bien-etre) | OUI | Absent | 2/3 |
| C10 Adresse Freneuse | OUI (JSON-LD, la-maison) | OUI | OUI | 3/3 |
| C11 Nicolas Berg GdC | OUI (la-maison) | Absent | OUI (Person sameAs) | 2/3 |
| C12 Intégration piscine+jardin | OUI | OUI | Absent | 2/3 |

**Nouveaux claims à formaliser (savoir-faire-facts.md) :**

| Claim nouveau | Statut | Score actuel | Action |
|--------------|--------|-------------|--------|
| Avis Technique CSTB n° 16/17-754 | PROUVÉ réseau (à confirmer AS) | 1/3 (cité sans numéro) | P1 — ajouter numéro partout |
| 4 piscines intérieures réalisées | PROUVÉ (4 slugs photos) | 1/3 (mentionné sur /piscines-bien-etre) | P1 — formaliser claim chiffré |
| 2 piscines à paroi de verre réalisées | PROUVÉ (2 slugs) | 1/3 (mentionné OuvragesSection) | P1 — formaliser claim chiffré |
| 1 piscine à fond mobile réalisée | PROUVÉ (1 slug) | 1/3 (mentionné OuvragesSection) | P1 — formaliser claim chiffré |
| Pépinière propre LTE aux Alluets-le-Roi | PROUVÉ (texte + photo) | 2/3 (présent /jardins-paysage) | P2 — ajouter llms.txt |
| Propiscines Certifié (FPP) | PROUVÉ (fiche réseau) | 1/3 (cité 1x /la-maison) | P2 — renforcer |
| Design & Innovation Trophy L'Esprit Piscine 2025 | [À CONFIRMER Nicolas Berg] | 0/3 | P0 — vérifier avant intégration |

### 3.4 JSON-LD — Score : 7.5/10

**Bilan global des JSON-LD :**

| Schema type | Présent ? | Pages | Complet ? |
|-------------|-----------|-------|-----------|
| LocalBusiness (Aqua System) | OUI | layout (global) | Partiel — sameAs incomplets, CSTB manquant |
| LocalBusiness (LTE) | OUI | layout (global) | Partiel — SIREN manquant, date création manquante |
| Person (Nicolas Berg) | OUI | /la-maison | Complet |
| FAQPage | OUI | /la-maison + /prescripteurs | Complet |
| BreadcrumbList | OUI | toutes pages sauf / | Correct |
| ImageObject | OUI | fiches réalisations | Correct |
| Article | ABSENT | — | Requis pour le blog /notre-regard |
| FAQPage | ABSENT | /piscines-bien-etre | P1 — à ajouter |
| ItemList | ABSENT | /realisations | P2 — à envisager |
| EducationalOccupationalCredential CSTB | ABSENT | — | P1 — si Nicolas confirme |

**Correctif prioritaire P1 — CSTB dans hasCredential :**
```json
{
  "@type": "EducationalOccupationalCredential",
  "name": "Avis Technique CSTB n° 16/17-754 — Construction de piscines en béton armé",
  "credentialCategory": "Avis technique de construction",
  "recognizedBy": {
    "@type": "Organization",
    "name": "CSTB — Centre Scientifique et Technique du Bâtiment",
    "url": "https://www.cstb.fr"
  }
}
```
Conditionnel : Nicolas Berg doit confirmer que le procédé 16/17-754 est bien celui utilisé par Aqua System (vs Neobloc® 16/22-793 qui appartient à la marque Esprit Piscine).

### 3.5 llms.txt — Score : 7/10

**État actuel :** Bon fondamental. Entité principale complète, certifications et distinctions sourcées, proposition de valeur claire.

**Manquants critiques :**

```
## Savoir-faire — Types d'ouvrage maîtrisés

Aqua System réalise six types de bassins d'exception, tous prouvés en réalisation
dans l'ouest parisien :
- Piscine à débordement (lame d'eau sur une ou plusieurs faces, goulotte de récupération)
- Bassin miroir (eau affleurante au ras de la plage sur tout le pourtour)
- Couloir de nage (bassin allongé dédié à la pratique sportive, 9 à 20 m)
- Piscine intérieure (4 réalisations : béton brut, charpente bois, véranda, lumière d'ambiance)
- Piscine à fond mobile (plancher motorisé réglable — terrasse et bassin en alternance)
- Piscine à paroi de verre (2 réalisations — paroi transparente sur bassin surélevé)
Toutes ces réalisations sont photographiées et consultables sur le portfolio.

## Construction

Structure béton armé isolé, procédé couvert par Avis Technique CSTB.
Bureau d'études intégré + collaborateurs génie civil + techniciens piscine.
Marché unique (un seul contrat) + garantie décennale.
Certification Socotec CSP/ESP-001 + Propiscines Certifié (FPP).

## Réalisations

24 réalisations Aqua System dans l'ouest parisien, dont 14 indexées publiquement :
- Portfolio complet : [SITE_URL]/realisations/
- Exemples : piscine à débordement (terrain en dénivelé, forêt), piscine intérieure
  (béton brut + baies vitrées), piscine à fond mobile (terrasse affleurante),
  piscine à paroi de verre (travertin + pierre naturelle).

## Blog « Notre Regard » (à venir — juillet 2026)

Un blog bimensuel sur la conception de piscines et jardins haut de gamme,
rédigé par Nicolas Berg :
- URL : [SITE_URL]/notre-regard/
- Sujets : piscine à débordement et terrain, hygrométrie piscine intérieure,
  fond mobile, prix piscine haut de gamme, piscine et jardin conçus ensemble,
  rénovation piscine.
```

### 3.6 Requêtes conversationnelles — Score : 5.5/10

**Analyse des 6 requêtes cibles :**

#### Requête 1 : « meilleur pisciniste haut de gamme yvelines »

- Page qui devrait répondre : /la-maison (About) + /piscines-bien-etre
- Contenu existant : certifications, trophées, 30 ans, zones — bon fond
- Ce qui manque : formulation directe « Aqua System est le pisciniste haut de gamme certifié Socotec [...] dans les Yvelines et les Hauts-de-Seine depuis plus de 30 ans. » — assertion en tête de page /la-maison ou dans le llms.txt (section Proposition de valeur déjà existante mais insuffisamment directe)
- Citabilité actuelle : 5/10
- Priorité correctif : P1

#### Requête 2 : « piscine à débordement 78 qui contacter »

- Page qui devrait répondre : /piscines-bien-etre (OuvragesSection) + fiche `piscine-debordement-foret`
- Contenu existant : description narrative de la piscine à débordement dans OuvragesSection
- Ce qui manque : assertion directe « Aqua System a réalisé des piscines à débordement dans les Yvelines. Téléphone : 01 30 42 26 00. » dans le texte visible (le numéro est dans le footer et le JSON-LD mais pas dans le corps de la page /piscines-bien-etre)
- Citabilité actuelle : 6/10
- Priorité correctif : P2

#### Requête 3 : « piscine intérieure île-de-france spécialiste »

- Page qui devrait répondre : /piscines-bien-etre (OuvragesSection)
- Contenu existant : description de la piscine intérieure, mention « Quatre réalisations dans notre portefeuille »
- Ce qui manque : assertion directe et extractible « Aqua System a construit 4 piscines intérieures dans les Yvelines et les Hauts-de-Seine : des ouvrages intégrés au bâti avec traitement de l'air, certification Socotec. » — la page dit la même chose mais de façon narrative et non en réponse directe
- Citabilité actuelle : 5/10
- Priorité correctif : P1

#### Requête 4 : « confier piscine et jardin au même prestataire »

- Page qui devrait répondre : /notre-approche (fusionnée dans /la-maison) + /jardins-paysage
- Contenu existant : FAQ Q4 /prescripteurs répond parfaitement (« En partenariat avec Les Terres Essentielles [...] co-conception eau et végétal depuis un interlocuteur unique »), mais cette Q/R est contextualisée pour les architectes
- Ce qui manque : une réponse directe orientée propriétaire (pas architecte) à cette requête — sur /la-maison section méthode ou sur /jardins-paysage en début de page
- Concurrent occupant cet espace : Les Jardins de la Vallée (jardinsdelavallee.fr) avec une page dédiée « paysagiste-pisciniste »
- Citabilité actuelle : 5/10
- Priorité correctif : P0 (requête différenciatrice principale)

#### Requête 5 : « pisciniste certifié socotec »

- Page qui devrait répondre : /prescripteurs (section PREUVES) + /la-maison (section Aqua System)
- Contenu existant : excellent — certification Socotec CSP/ESP-001 nommée avec organisme et domaine source, disponible sur demande pour prescription
- Citabilité actuelle : 8/10
- Priorité correctif : P3 — déjà bien couvert

#### Requête 6 : « fond mobile piscine france »

- Page qui devrait répondre : /piscines-bien-etre (OuvragesSection fond mobile) + fiche `piscine-fond-mobile-terrasse`
- Contenu existant : description narrative du fond mobile dans OuvragesSection
- Ce qui manque : assertion directe « Aqua System est l'un des rares piscinistes en Yvelines à avoir réalisé une piscine à fond mobile — l'ouvrage le plus rare de notre portfolio. » La fiche est noindex ou thin content.
- Citabilité actuelle : 4/10
- Priorité correctif : P1

---

## 4. Plan correctif — Priorisé P0 → P3

### P0 — Bloquants (score < 5/10 sur la dimension)

**P0-GEO-01 : /realisations — Texte extractible absent**
- Page : /realisations
- Dimension : Extractibilité (2/10), Claims (2/10)
- Correctif : Ajouter un bloc texte sous le H1 « Réalisations » avec assertion structurée des 24 réalisations (voir §3.1)
- Agent : @copywriter (formulation) → @fullstack (intégration)
- Effort : 30 min
- Impact GEO : élevé (la page /realisations est indexée et visitée par les bots)

**P0-GEO-02 : Fiches réalisations — Contenu éditorial null**
- Pages : /realisations/piscine-fond-mobile-terrasse, /realisations/piscine-debordement-foret, /realisations/piscine-interieure-pierre-poutres (priorité)
- Dimension : Extractibilité (1/10), Requêtes (2/10)
- Correctif : Demander à Nicolas Berg de remplir intention/réponse/exécution/prestations pour ces 3 fiches
- Agent : Fondateur → @copywriter (mise en forme) → @fullstack (intégration dans realisations.ts)
- Effort : 2h fondateur + 30 min copy + 15 min dev
- Impact GEO : très élevé (ce sont les pages que les LLM citent pour les requêtes type « piscine fond mobile France »)

**P0-GEO-03 : Design & Innovation Trophy L'Esprit Piscine 2025 — Vérification**
- Source : esprit-piscine.fr/aqua-system/ (WebSearch 2026-06-12)
- Statut actuel : non documenté dans les référentiels internes
- Action : [À CONFIRMER Nicolas Berg] — si confirmé : ajouter dans `award[]` JSON-LD, dans le paragraphe de synthèse ProofBadges, dans llms.txt, et dans les badges /la-maison
- Urgence : P0 — c'est un claim 3/3 potentiel récent (2025), mais risque d'erreur si non confirmé
- Impact GEO : élevé (trophée réseau 2025 = signal de fraîcheur pour les LLM)

**P0-GEO-04 : Requête « confier piscine et jardin au même prestataire » — Page répondante manquante**
- Concurrent détecté : Les Jardins de la Vallée occupe cet espace
- Correctif : Ajouter sur /la-maison (section méthode §3) ou en tête de /jardins-paysage une réponse directe orientée propriétaire :
  > VALIDATION COPY REQUISE : « Aqua System et Les Terres Essentielles proposent la co-conception et la réalisation d'un projet extérieur intégrant piscine et jardin depuis un interlocuteur unique, dans les Yvelines et les Hauts-de-Seine. Un seul bureau d'études pour les deux disciplines, un seul marché, une seule garantie. »
- Agent : @copywriter → @fullstack
- Effort : 45 min
- Impact GEO : très élevé (requête différenciatrice, espace libre en partie)

---

### P1 — Importants (améliorations significatives)

**P1-GEO-01 : sameAs JSON-LD incomplets**
- Page : layout global (lib/seo.ts — organizationJsonLd)
- Correctif : Ajouter guide-piscine.fr, idees-piscine.com, pagesjaunes.fr, initiative-seineyvelines.com dans `sameAs`
- Agent : @fullstack
- Effort : 10 min
- Impact GEO : moyen-élevé (chaque sameAs renforce la résolution d'entité par les LLM)

**P1-GEO-02 : Avis Technique CSTB — Numéro et entité manquants**
- Pages : /piscines-bien-etre (TextBlock), /la-maison (section Aqua System), JSON-LD hasCredential, llms.txt
- Conditionnel : Nicolas Berg doit confirmer le n° 16/17-754 (procédé classique) vs Neobloc® (16/22-793 — marque réseau)
- Si confirmé :
  - TextBlock /piscines-bien-etre : « Avis Technique CSTB n° 16/17-754 »
  - hasCredential JSON-LD : nouveau credential CSTB (voir §3.4)
  - llms.txt section Construction : « Procédé béton armé sous Avis Technique CSTB n° 16/17-754 »
- Agent : @fullstack (JSON-LD + llms.txt) + @copywriter (texte pages)
- Effort : 45 min
- Impact GEO : élevé (les numéros exacts = signal fort de vérifiabilité pour les LLM)

**P1-GEO-03 : FAQPage JSON-LD manquante sur /piscines-bien-etre**
- Correctif : Ajouter 3 Q/R extractibles :
  1. « Quels types de piscines Aqua System réalise-t-il ? » → liste des 6 types d'ouvrage
  2. « Aqua System réalise-t-il des piscines à fond mobile ? » → assertion directe + réalisation prouvée
  3. « Qu'est-ce qu'une piscine intérieure Aqua System ? » → 4 réalisations + certification
- Agent : @copywriter (Q/R) → @fullstack (FAQPage JSON-LD + FaqSection visible)
- Effort : 1h
- Impact GEO : élevé (les FAQ sur les pages services sont le format le plus cité par les LLM)

**P1-GEO-04 : llms.txt — Sections manquantes**
- Ajouter les sections : Savoir-faire (6 ouvrages), Construction (CSTB, décennale), Réalisations (24 dont 14 indexées), Blog à venir
- Agent : @fullstack (modification public/llms.txt)
- Effort : 30 min
- Impact GEO : moyen-élevé (les crawlers IA lisent llms.txt à chaque visite)

**P1-GEO-05 : Piscine intérieure — Assertion directe manquante**
- Page : /piscines-bien-etre (OuvragesSection ou TextBlock « Construction & finitions »)
- Correctif :
  > VALIDATION COPY REQUISE : Ajouter après la description OuvragesSection « Piscine intérieure » : « Aqua System compte 4 réalisations de piscines intérieures dans l'ouest parisien — des ouvrages intégrés au bâti avec traitement de l'air et gestion de l'hygrométrie, réalisés en béton brut, charpente bois et sous véranda. »
- Agent : @copywriter → @fullstack
- Effort : 30 min
- Impact GEO : élevé (requête « piscine intérieure Île-de-France » = P0 en citabilité actuelle)

**P1-GEO-06 : Désinformation « 500 piscines construites » — Clarification**
- Source : esprit-piscine.fr/aqua-system/ (dominant dans les LLM)
- Action : contacter l'équipe esprit-piscine.fr pour clarifier que c'est 350+ piscines entretenues (pas 500 construites)
- Si pas de réponse : renforcer dans llms.txt la formulation « 350 piscines entretenues » (avec « entretenues ») pour contrebalancer
- Agent : Fondateur (contact esprit-piscine.fr) + @geo (monitoring)
- Effort : 15 min contact + monitoring à J+30

**P1-GEO-07 : /prescripteurs — CSTB dans les preuves**
- Correctif : Ajouter « Avis Technique CSTB n° 16/17-754 » comme 5e preuve dans la section « Ce qui nous qualifie »
- Conditionnel au P1-GEO-02
- Agent : @copywriter → @fullstack

**P1-GEO-08 : /jardins-paysage — Assertion-entité LTE manquante**
- Correctif : Ajouter en début de BureauEtudesBlock ou en paragraphe distinct une assertion directe sur LTE avec SIREN, année de création, zone
- Agent : @copywriter → @fullstack

---

### P2 — Utiles

**P2-GEO-01 : Claims numériques ouvrages — Renforcement llms.txt**
- Ajouter : « 4 piscines intérieures, 2 piscines à paroi de verre, 1 fond mobile — réalisations prouvées par photo »

**P2-GEO-02 : sameAs LTE — Compléter le partnerOrganizationJsonLd**
- Ajouter SIREN 811 198 217, date de création 2015, facebook.com/LesTerresEssentielles dans `sameAs`

**P2-GEO-03 : Propiscines Certifié — Renforcement**
- Ajouter dans la section preuves /piscines-bien-etre et dans ProofBadges

**P2-GEO-04 : Nicolas Berg — Mention LinkedIn en texte visible**
- Page /la-maison : ajouter sous le portrait « linkedin.com/in/nicolas-berg-aqua-system/ » en texte visible (pas seulement en JSON-LD sameAs)

**P2-GEO-05 : /realisations — ItemList JSON-LD**
- Ajouter un ItemList Schema.org pour les 14 réalisations indexées

**P2-GEO-06 : Article JSON-LD pour le blog**
- À implémenter lors du lancement de /notre-regard (blog-program.md §1.5)
- AuthorBlock Nicolas Berg obligatoire + datePublished/dateModified

---

### P3 — Optimisations mineures

**P3-GEO-01 : Monitoring mensuel — Nouveaux prompts**
Ajouter aux 5 prompts existants (geo-strategy.md §6.1) :
- P6 : « Qui réalise des piscines à fond mobile dans les Yvelines ? »
- P7 : « Qu'est-ce qu'une piscine à paroi de verre ? Qui en construit en Île-de-France ? »
- P8 : « Aqua System a-t-il remporté des trophées récents ? »

**P3-GEO-02 : RSS pour le blog**
Confirmer implémentation `/rss.xml` à la création du blog (blog-program.md §1.6)

---

## 5. Scores récapitulatifs

### Par page

| Page | E | G | C | J | Score moyen |
|------|---|---|---|---|------------|
| / | 7 | 8 | 8 | 9 | 7.3/10 |
| /piscines-bien-etre | 8 | 9 | 9 | 8 | 8.3/10 |
| /jardins-paysage | 6 | 7 | 6 | 6 | 6.0/10 |
| /la-maison | 8 | 9 | 9 | 9 | 8.5/10 |
| /prescripteurs | 9 | 9 | 9 | 9 | 8.8/10 |
| /realisations | 4 | 6 | 3 | 7 | 4.8/10 |
| /realisations/[slug] | 4 | 6 | 4 | 7 | 4.8/10 |

### Dimensions globales

| Dimension | Score actuel | Score cible | Priorité |
|-----------|-------------|------------|---------|
| Extractibilité | 7/10 | 9/10 | P0-P1 |
| Entités | 7.5/10 | 9/10 | P1 |
| Claims | 8/10 | 9.5/10 | P0-P1 |
| JSON-LD | 7.5/10 | 9/10 | P1 |
| llms.txt | 7/10 | 9/10 | P1 |
| Requêtes | 5.5/10 | 8/10 | P0-P1 |
| **MOYEN** | **7.1/10** | **9.1/10** | — |

**Score actuel global : 7.1/10**
**Objectif post-corrections : 9.1/10** (les 0.9 restants dépendent du fondateur : CSTB confirmé, fiches documentées, Design & Innovation Trophy vérifié)

### Décompte des écarts

| Priorité | Nb écarts | Pages concernées |
|----------|-----------|----------------|
| P0 | 4 | /realisations, fiches, /jardins-paysage (requête clé) |
| P1 | 8 | /piscines-bien-etre, /la-maison, /prescripteurs, JSON-LD global, llms.txt |
| P2 | 6 | JSON-LD enrichissements, mentions mineures |
| P3 | 2 | Monitoring, RSS |
| **Total** | **20** | — |

---

## 6. Requêtes conversationnelles — Carte de correspondance

| Requête | Page optimale | Citabilité actuelle | Citabilité cible (post-fix) |
|---------|--------------|--------------------|-----------------------------|
| « meilleur pisciniste haut de gamme yvelines » | /la-maison + llms.txt | 5/10 | 8/10 (P1-GEO-04 + llms.txt enrichi) |
| « piscine à débordement 78 qui contacter » | /piscines-bien-etre | 6/10 | 8/10 (P1-GEO-05 style + fiche documentée) |
| « piscine intérieure île-de-france spécialiste » | /piscines-bien-etre | 5/10 | 8/10 (P1-GEO-05 + FAQPage) |
| « confier piscine et jardin au même prestataire » | /la-maison + /jardins-paysage | 5/10 | 8/10 (P0-GEO-04) |
| « pisciniste certifié socotec » | /prescripteurs | 8/10 | 9/10 (déjà bon) |
| « fond mobile piscine france » | /piscines-bien-etre + fiche | 4/10 | 7/10 (P0-GEO-02 + P1-GEO-03) |

---

## 7. Exigences GEO pour le blog /notre-regard

Chaque article du blog doit respecter ces critères pour être GEO-ready dès la publication :

### 7.1 Structure minimale extractible par article

1. **Réponse directe dans les 60 premiers mots** : l'intention de la requête cible doit être répondue dans le premier paragraphe (pas après les H2)
2. **Au moins 2 blocs Q/R extractibles** : formater explicitement sous forme de question → réponse concise (40-80 mots) — peut être intégré dans le texte narratif avec des sous-titres interrogatifs
3. **1 claim vérifiable / 150-200 mots** : source nommée ou fait factuel Aqua System (savoir-faire-facts.md)
4. **Zéro langage promotionnel** : « révolutionnaire », « exceptionnel », « le meilleur » → filtrés par les LLM
5. **Définition directe des termes techniques** : utiliser le lexique savoir-faire-facts.md §4 (terme + définition 1 ligne)

### 7.2 JSON-LD obligatoire par article

Article JSON-LD complet (blog-program.md §1.5) :
- `author`: Nicolas Berg + jobTitle + worksFor → @id organization-aquasystem
- `datePublished` + `dateModified` : fraîcheur critique (+28% citations LLM pour contenu < 2 mois)
- `headline` : contient le mot-clé principal
- `image` : WebP 1200×630 avec alt descriptif factuel

### 7.3 Patterns par article (blog-program.md §BLOC 3)

| Article | Requête cible LLM | Format GEO prioritaire | Claim extractible clé |
|---------|------------------|----------------------|----------------------|
| A1 — Débordement terrain en pente | « piscine à débordement Yvelines » | Définition débordement + comparatif vs miroir | « Aqua System a réalisé une piscine à débordement face à une forêt de pins dans les Yvelines » |
| A2 — Piscine intérieure hygrométrie | « piscine intérieure spécialiste » | Q/R : qu'est-ce que l'hygrométrie d'une piscine intérieure ? | « 4 piscines intérieures réalisées dans l'ouest parisien » |
| A3 — Fond mobile | « fond mobile piscine France » | Définition fond mobile vs terrasse mobile | « Aqua System a réalisé une piscine à fond mobile — l'ouvrage le plus rare du portfolio » |
| A4 — Prix piscine haut de gamme | « combien coûte une piscine sur mesure » | Liste des postes de coût + fourchettes sourcées | Bureau d'études intégré + garantie décennale |
| A5 — Piscine+jardin ensemble | « confier piscine et jardin au même prestataire » | Définition directe de la proposition de valeur | « Un seul bureau d'études, un seul marché, une seule garantie » |
| A6 — Rénovation | « quand rénover une piscine » | Signaux de rénovation en liste | « Aqua System assure la rénovation des piscines qu'il a construites » |

### 7.4 Freshin du contenu existant au lancement blog

À la mise en ligne du blog (article A1 — 01/07/2026) :
- Mettre à jour le `last-updated` de llms.txt
- Ajouter /notre-regard dans les « Contenus prioritaires » du llms.txt
- Mettre à jour le sitemap (sitemap.ts) pour inclure les URLs blog
- Mettre à jour les ProofBadges ou le paragraphe de synthèse si un nouveau fait confirme un claim en attente (CSTB, Trophy 2025)

---

## Handoff

**→ @orchestrator** (si orchestré)

**Fichiers produits :**
- `/home/user/Aquasystem/docs/geo/audit-geo-10sur10.md` (ce document)

**Score moyen actuel : 7.1/10**

**Écarts prioritaires :**
- 4 P0 : /realisations sans texte extractible, fiches réalisations sans contenu éditorial, confirmation Trophy 2025, requête différenciatrice « piscine+jardin même prestataire »
- 8 P1 : sameAs JSON-LD, CSTB numéro, FAQPage /piscines-bien-etre, llms.txt sections manquantes, assertion piscine intérieure, désinformation 500 piscines, CSTB /prescripteurs, assertion LTE /jardins-paysage
- 6 P2, 2 P3

**Décisions prises :**
- Scoring sur 6 dimensions (E/G/C/J/L/R) — llms.txt et Requêtes traités globalement (non par page)
- /notre-approche confirmée fusionnée dans /la-maison — pas de page séparée à auditer
- /contact et /politique-confidentialite : hors périmètre GEO
- Nouveau claim détecté : Design & Innovation Trophy L'Esprit Piscine 2025 [À CONFIRMER Nicolas Berg AVANT tout ajout]
- Divergence « 500 piscines construites » (esprit-piscine.fr) vs « 350 piscines entretenues » (Aquasystem) : documentée, action P1

**Points d'attention (ne pas modifier sans re-vérification GEO) :**
- Le paragraphe de synthèse ProofBadges est la pierre angulaire de l'extractibilité — toute modification doit maintenir les 4 claims nommés avec source implicite
- Le wording exact des FAQ (faq.ts) est la source de vérité pour les FAQPage JSON-LD — toujours modifier en synchrone texte + JSON-LD
- llms.txt n'est pas interpolé au build (fichier statique) — toute mise à jour nécessite un redéploiement
- Les `sameAs` JSON-LD doivent pointer vers des URLs qui nomment explicitement « Aqua System » (pas des URLs de catégorie)

**Fréquence monitoring recommandée :**
- Hebdomadaire pendant les 2 premiers mois post-corrections
- Mensuelle ensuite (protocole geo-strategy.md §6)
- Re-tester les 6 requêtes conversationnelles dans ChatGPT + Perplexity dès que le blog A1 est publié (fraîcheur = +28% citations)

---

*Produit par @geo — 2026-06-12*
*Sources WebSearch utilisées : esprit-piscine.fr/aqua-system/, guide-piscine.fr, purepiscine.com, piscines-de-france.fr, houzz.fr, piscinistes.nosavis.com, socotec-certification-international.fr, eurospapoolnews.com, idoine-piscines.com, fond-mobile-aqualift.com, amphibia.fr, groupecileo.com, jardinsdelavallee.fr, pisciniste-yvelines.fr, initiative-seineyvelines.com*
