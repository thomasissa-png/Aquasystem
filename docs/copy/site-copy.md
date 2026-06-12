# Copy complet — Site vitrine {SITE_NAME}
## Aqua System × Les Terres Essentielles

> Source de vérité copy pour @fullstack (intégration) et @seo (optimisation Phase 3).
> Mappé sur wireframes.md v1.1 (IDs WF-01 à WF-09) et page-compositions.md.
> Token de marque : `{SITE_NAME}` — substituer par le nom final (Orvère / Thalweg / Rive & Clos ou autre).
> Conformité : brand-voice.md, ux-writing-guide.md v1.2, verbal-identity.md, legal-audit.md §B.
> [Framework global : AIDA conviction-first — Attention → Intérêt → Désir → Action douce]
> [Conscience : Alexandre = Solution-Aware | Camille = Problem-Aware]
> Dernière mise à jour : 2026-06-11 | Agent : @copywriter

---

## Conventions de ce document

- `[Photo : description]` = slot photo réel mappé sur page-compositions.md — jamais à remplir avec du fictif
- `[DONNÉES PROJET RÉEL : ...]` = champs à remplir avec les données de chantiers réels par le fondateur
- `[À CONFIRMER : ...]` = placeholder balisé nécessitant validation fondateur avant mise en ligne
- `(WF-XX / Section Y)` = référence au wireframe et à la section de page-compositions.md
- Wording formulaire, erreurs, succès, footer, nav, 404 : référence à ux-writing-guide.md §§1-9 — **ne pas dupliquer ici**

---

## Objections traitées (suivi par page)

| Objection | Persona | Page principale de traitement |
|-----------|---------|-------------------------------|
| "Un seul interlocuteur n'est pas réaliste pour deux expertises" | Alexandre | Accueil (section méthode), /notre-approche |
| "Je vais devoir coordonner pisciniste et paysagiste moi-même" | Alexandre | Accueil (CTA final), /notre-approche (étape 2) |
| "Après la livraison, ils disparaissent" | Alexandre | /piscines-bien-etre (entretien), /la-maison (valeur Confiance) |
| "L'offre ressemble à tous les autres" | Alexandre | /realisations (portfolio ancré 78/92), /notre-approche (ancrage local) |
| "Les certifications sont auto-proclamées" | Alexandre + Camille | /piscines-bien-etre (Socotec + Esprit Piscine), /prescripteurs |
| "Vous allez court-circuiter ma relation client" | Camille | /prescripteurs (bloc 2 — protocole explicite) |
| "Je ne vois pas de réalisations dans MON secteur" | Camille + Alexandre | /realisations (ancrage communes 78/92), /notre-approche (ancrage local) |

---

## Page 1 — Accueil (/)
### Référence wireframe : WF-01 | page-compositions.md §WF-01

**Meta title** : `{SITE_NAME} — Piscines & Jardins haut de gamme, Yvelines et Hauts-de-Seine`
**Meta description** : `Plus de 30 ans d'expertise dans l'aménagement extérieur sur mesure en 78/92. Piscines, spas, jardins et parcs — un seul interlocuteur pour l'eau et le végétal.`
**Balises sémantiques** : H1 unique (hero) | H2 par section (deux univers / réalisations / preuves / CTA)

---

### WF-01 / Section 1 — Hero full-bleed

[Photo : piscine à débordement intégrée dans un parc paysagé d'une propriété des Yvelines — vue depuis la terrasse, plan d'eau calme en premier plan, végétation dense structurée en arrière-plan, lumière dorée de fin d'après-midi, aucune personne visible]

**H1** :
> L'extérieur à la hauteur de votre propriété.

**Sous-titre** :
> Un seul interlocuteur pour l'eau et le jardin — depuis plus de 30 ans dans l'ouest parisien.

**CTA** (ux-writing-guide §5) :
> Parlez-nous de votre projet →

*Note @fullstack : event cta_clicked (position: "hero") au clic. CTA pointe vers /contact.*
*Note copy : H1 = tagline officielle (verbal-identity §3.1). 7 mots, < 10 mots requis. Compréhensible en < 5 secondes. Sous-titre version mobile tronquée dans wireframes : "Un seul interlocuteur — 30 ans dans l'ouest parisien."*

---

### WF-01 / Section 2 — Les deux univers (deux maisons)

[Framework : Intérêt — montrer les deux expertises, poser la complémentarité avant toute persuasion]

**Surtitre colonne gauche** (DM Sans 12px water-600 uppercase) :
> Aqua System

**H2 colonne gauche** :
> Piscines & Bien-être

**Texte colonne gauche** (2-3 lignes, 60 mots max) :
> Conception, construction et entretien de piscines sur mesure. Spas HotSpring, saunas, hammams. Chaque ouvrage conçu depuis les contraintes réelles du terrain — pas depuis un catalogue.

**Lien colonne gauche** :
> Découvrir →

*Note @fullstack : lien vers /piscines-bien-etre*

---

**Surtitre colonne droite** (DM Sans 12px forest-600) :
> en partenariat avec Les Terres Essentielles

**H2 colonne droite** :
> Jardins & Paysage

**Texte colonne droite** (2-3 lignes, 60 mots max) :
> Bureau d'études paysager, création de parcs et jardins d'exception, entretien. L'eau et le végétal conçus ensemble — au même bureau d'études, avant le premier plan.

**Lien colonne droite** :
> Découvrir →

*Note @fullstack : lien vers /jardins-paysage*

---

### WF-01 / Section 3 — Preuves (composant ProofBadges)

*Wording des 4 badges (composant transversal, réutilisé sur plusieurs pages) :*

| Badge | Ligne 1 | Ligne 2 |
|-------|---------|---------|
| 1 | Plus de 30 ans | d'expertise |
| 2 | 350+ piscines | entretenues en 78/92 |
| 3 | Certification Socotec | CSP/ESP-001 |
| 4 | Réseau | L'Esprit Piscine |

---

### WF-01 / Section 4 — Extrait portfolio (3 réalisations phares)

**SectionHeading surtitre** (DM Sans 12px water-600 uppercase) :
> Réalisations

**H2 SectionHeading** :
> Quelques propriétés que nous avons transformées.

*Note : pas de sous-titre dans cette section (wireframes.md WF-01 Section 4 : "les photos parlent").*

**Cards — légendes** (type + zone géographique, jamais de données fictives) :

Card 1 :
> Type : Piscine sur mesure
> Zone : Yvelines (78)

Card 2 :
> Type : Jardin & Parc
> Zone : Hauts-de-Seine (92)

Card 3 :
> Type : Projet complet eau + jardin
> Zone : Yvelines (78)

**Lien bas de section** :
> Voir toutes les réalisations →

*Note @fullstack : lien vers /realisations*

---

### WF-01 / Section 5 — CTA final (composant CTA sectionnel)

**Texte d'amorce** (DM Serif Display 36px, sand-100) :
> Un projet d'extérieur mérite une conversation — pas un formulaire.

**CTA** :
> Parlez-nous de votre projet →

*Note @fullstack : event cta_clicked (position: "footer"). CTA vers /contact.*

---

### WF-01 / Section 6 — Footer

*Référence : ux-writing-guide §6 (wording footer exact — ne pas dupliquer ici).*

---

---

## Page 2 — Piscines & Bien-être (/piscines-bien-etre)
### Référence wireframe : WF-02 | page-compositions.md §WF-02

**Meta title** : `Piscines sur mesure Yvelines & Hauts-de-Seine — Aqua System`
**Meta description** : `Conception, construction et entretien de piscines haut de gamme en 78/92. Spas HotSpring, saunas, hammams. Certification Socotec. Plus de 30 ans d'ancrage local.`
**Balises sémantiques** : H1 unique (hero) | H2 par bloc prestation | H2 preuves | H2 cross-sell

---

### WF-02 / Section 1 — Hero page

[Photo : piscine sur mesure avec spa intégré — vue depuis le jardin, eau dormante turquoise-grise, carrelage de bord en pierre naturelle, propriété en arrière-plan reconnaissable comme haut de gamme, fin de journée]

**H1** :
> Piscines & Bien-être

**Sous-titre** :
> Notre maison Aqua System — conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine.

---

### WF-02 / Section 2 — Bloc 1 : Conception et construction

[Photo : bassin de piscine en cours de carrelage — vue de dessus montrant le travail artisanal de pose de mosaïque gris-bleu, mains de technicien visibles, contexte de chantier propre et maîtrisé]

**Surtitre** (DM Sans 12px water-600 uppercase) :
> Conception sur mesure

**H2** :
> De la feuille blanche à l'inauguration

**Corps** (3 lignes, 70 mots max) :
> Chaque piscine commence par l'écoute : la pente du terrain, l'orientation de la maison, les usages de la famille. Notre bureau d'études traduit cette vision en un plan — avant de poser la première pierre.
>
> De la conception à la livraison, un seul interlocuteur porte votre projet. Vous n'avez pas à gérer les interfaces entre les corps de métier.

*Note copy : traite l'objection "fragmentation" (Alexandre frustration principale). Lexique verbal-identity : bureau d'études, vision, interlocuteur unique.*

---

### WF-02 / Section 3 — Bloc 2 : Spas, saunas, hammams

[Photo : spa HotSpring encastré dans une terrasse en bois exotique, vapeur légère, entourage en pierre naturelle, jardin visible en arrière-plan flou, soir]

**Surtitre** (water-600 uppercase) :
> Spa & bien-être

**H2** :
> L'eau chaude dans votre propriété

**Corps** (3 lignes, 70 mots max) :
> Spa extérieur HotSpring, sauna finlandais, hammam — intégrés à l'architecture de votre propriété, pas posés en périphérie. Chaque installation est conçue avec le reste de l'espace : la terrasse, le jardin, les lignes de la maison.
>
> Partenaire HotSpring pour les spas — une gamme pensée pour le résidentiel haut de gamme.

---

### WF-02 / Section 4 — Bloc 3 : Entretien annuel & SAV

[Photo : technicien en tenue Aqua System (logo discret) contrôlant les paramètres d'eau d'une piscine avec tablette numérique, piscine propre en arrière-plan, lumière de matin]

**Surtitre** (water-600 uppercase) :
> Suivi annuel

**H2** :
> L'équipe qui connaît votre piscine de l'intérieur

**Corps** (3 lignes, 70 mots max) :
> La piscine que vous nous avez demandé de construire, nous la connaissons. L'équipement, les spécificités du terrain, les choix techniques faits au moment du chantier. Quand vous appelez, vous n'expliquez pas — vous continuez.
>
> Plus de 350 piscines entretenues dans le 78 et le 92. Robots Dolphin, traitement d'eau, SAV équipements.

*Note copy : métaphore fondatrice "l'ouvrage qui traverse les générations" (verbal-identity §4.2). Traite l'objection "disparaissent après livraison".*

---

### WF-02 / Section 5 — Preuves (ProofBadges Aqua System)

*Composant ProofBadges — wording identique à WF-01 Section 3.*

*Note @fullstack : sur cette page, afficher les 4 badges + les deux badges certifications en visuel (Socotec + L'Esprit Piscine) conformément à wireframes WF-02.*

---

### WF-02 / Section 6 — Cross-sell vers jardins (CrossSellSplit)

[Photo : piscine et jardin paysagé vus ensemble depuis un point de vue élevé — eau et végétal dialoguent dans un espace harmonieux, propriété 78/92]

**H2** (côté texte, fond forest-50) :
> Votre piscine mérite un jardin à sa mesure.

**Corps** :
> L'eau et le végétal se conçoivent ensemble ou ne se conçoivent pas vraiment — c'est ce que nous faisons depuis 30 ans. En partenariat avec Les Terres Essentielles, bureau d'études paysager.

**CTA secondaire** :
> Voir nos créations paysagères →

*Note @fullstack : event cross_selling_clicked (source_univers: "piscines", destination_univers: "jardins"). Lien vers /jardins-paysage.*

---

### WF-02 / Section 7 — CTA sectionnel

**Texte d'amorce** :
> Votre projet commence par une conversation.

**CTA** :
> Parlez-nous de votre projet →

*Note @fullstack : event cta_clicked (position: "footer"). CTA vers /contact?source=piscines-bien-etre.*

---

### WF-02 / Section 8 — Footer

*Référence : ux-writing-guide §6.*

---

---

## Page 3 — Jardins & Paysage (/jardins-paysage)
### Référence wireframe : WF-03 | page-compositions.md §WF-03

**Meta title** : `Jardins & Paysage haut de gamme 78/92 — Les Terres Essentielles`
**Meta description** : `Bureau d'études paysager, création de parcs et jardins sur mesure en Yvelines et Hauts-de-Seine. En partenariat avec Les Terres Essentielles. 30 ans d'ancrage local.`
**Balises sémantiques** : H1 unique (hero) | H2 par bloc prestation | H2 cross-sell

---

### WF-03 / Section 1 — Hero page

[Photo : parc de propriété 78/92 — large pelouse structurée avec arbres adultes en perspective, massifs de fleurs en bord de propriété, lumière de fin de matinée, aucune personne]

**H1** :
> Jardins & Paysage

**Sous-titre** :
> En partenariat avec Les Terres Essentielles — bureau d'études paysager, création de parcs et jardins d'exception.

---

### WF-03 / Section 2 — Bloc 1 : Bureau d'études paysager

[Photo : plans de jardin déroulés sur une grande table, réglettes et crayons, mains d'un paysagiste en train de travailler, lumière de bureau naturelle, atmosphère de conception professionnelle]

**Surtitre** (DM Sans 12px forest-600 uppercase) :
> Bureau d'études

**H2** :
> Un projet pensé avant d'être planté

**Corps** (3 lignes, 70 mots max) :
> Tout commence par la lecture du terrain : les ombrages, les masses végétales existantes, les contraintes de sol. Notre bureau d'études — en partenariat avec Les Terres Essentielles — pose le plan avant que la première pelle entre dans la terre.
>
> Quand un projet comporte aussi une piscine, les deux études sont menées au même moment. Le résultat : un espace qui tient ensemble, pas une somme de parties.

*Note copy : lexique verbal-identity : bureau d'études, propriété comme tout vivant (métaphore §4.1). Formulation LTE vérifiée.*

---

### WF-03 / Section 3 — Bloc 2 : Création de parcs et jardins

[Photo : chantier de création d'un jardin — ouvriers posant des pavés naturels sur une allée dans une grande propriété, arbres fraîchement plantés, sol travaillé, après-midi ensoleillé]

**Surtitre** (forest-600 uppercase) :
> Création

**H2** :
> La réalisation, du premier arbre à la dernière pierre

**Corps** (3 lignes, 70 mots max) :
> Allées, massifs, pelouses, enrochements, terrasses végétalisées — chaque élément est choisi pour son rapport avec les autres et avec l'architecture de la maison. Aucune réalisation ne ressemble à la précédente, parce qu'aucun terrain ne se ressemble.
>
> Nos végétaux sont sélectionnés ou issus de notre pépinière. Adaptés au sol argilo-calcaire de l'ouest parisien.

*Note copy : ancrage sol local = preuve de connaissance terrain (verbal-identity §1.7 ancrage).*

---

### WF-03 / Section 4 — Bloc 3 : Entretien et pépinière

[Photo : serre de pépinière Les Terres Essentielles — plants en rangées, végétaux prêts à la vente ou à la plantation, lumière naturelle tamisée, ambiance de production artisanale soignée]

**Surtitre** (forest-600 uppercase) :
> Entretien & pépinière

**H2** :
> Des végétaux sélectionnés pour durer

**Corps** (3 lignes, 70 mots max) :
> Un jardin planté pour aujourd'hui et pensé pour dans vingt ans. Les essences que nous recommandons ont fait leurs preuves dans les propriétés de l'ouest parisien — sur les sols et sous les conditions climatiques que nous connaissons.
>
> Entretien régulier, taille de forme, suivi saisonnier. Et une pépinière pour sourcer les végétaux qui correspondent à votre projet.

*Note copy : métaphore "ouvrage qui traverse les générations" (verbal-identity §4.2). Pérennité.*

---

### WF-03 / Section 5 — Preuves (ProofBadges jardins)

*Composant ProofBadges adapté — 3 badges pertinents pour cette expertise :*

| Badge | Ligne 1 | Ligne 2 |
|-------|---------|---------|
| 1 | Bureau d'études | paysager intégré |
| 2 | Pépinière | propre |
| 3 | Plus de 30 ans | en 78/92 |

---

### WF-03 / Section 6 — Cross-sell vers piscines (CrossSellSplit)

[Photo : jardin de grande propriété avec piscine visible en fond — végétation dense premier plan, bassin turquoise-gris en perspective, harmonie eau/vert parfaite]

**H2** (côté texte, fond water-50) :
> Un jardin d'exception autour d'une piscine sur mesure.

**Corps** :
> Notre maison Aqua System les conçoit ensemble — un seul interlocuteur, un seul bureau d'études, aucune interface à gérer entre un pisciniste et un paysagiste qui ne se parlent pas.

**CTA secondaire** :
> Découvrir nos piscines sur mesure →

*Note @fullstack : event cross_selling_clicked (source_univers: "jardins", destination_univers: "piscines"). Lien vers /piscines-bien-etre.*

---

### WF-03 / Sections 7-8 — CTA + Footer

**Texte d'amorce CTA** :
> Votre projet commence par une conversation.

**CTA** :
> Parlez-nous de votre projet →

*Note @fullstack : CTA vers /contact?source=jardins-paysage.*
*Footer : référence ux-writing-guide §6.*

---

---

## Page 4 — Notre approche (/notre-approche)
### Référence wireframe : WF-04 | page-compositions.md §WF-04

**Meta title** : `Notre approche — De la vision à la réalisation, un seul interlocuteur`
**Meta description** : `Comment {SITE_NAME} porte un projet d'extérieur complet en Yvelines et Hauts-de-Seine : écoute, bureau d'études, réalisation et suivi — une seule équipe de bout en bout.`
**Balises sémantiques** : H1 unique (hero) | H2 par étape + ancrage local + CTA

---

### WF-04 / Section 1 — Hero split

[Photo : propriété transformée vue d'ensemble — piscine et jardin intégrés dans un même espace cohérent, architecture de la maison visible en arrière-plan, lumière de début de soirée, zone 78]

**H1** :
> De la vision à la réalisation

**Sous-titre** :
> Comment nous portons un projet d'extérieur de bout en bout — et pourquoi cela change tout.

*Note copy : H1 = formule de marque officielle (verbal-identity §1.4, §3.2 — ne pas modifier, ne pas abréger). Sous-titre conforme wireframes WF-04.*

---

### WF-04 / Section 2 — Timeline des 5 étapes

*[Framework : Désir — montrer concrètement comment l'objection "fragmentation" est résolue, étape par étape]*

**Étape 1**
**H2** : L'écoute

> Nous commençons par comprendre ce que vous imaginez — l'espace, les usages, ce que vous souhaitez ressentir. Pas un formulaire à remplir. Une conversation.
>
> À ce stade, il n'est pas nécessaire d'avoir un plan ou un budget précis. Votre vision est suffisante.

---

**Étape 2**
**H2** : Le bureau d'études

> Piscine et jardin conçus ensemble dès le premier plan — pas l'un après l'autre. Les deux maisons coordonnent à cette étape : les choix d'implantation, les matériaux, les lignes directrices de l'espace.
>
> Vous n'avez pas à arbitrer entre deux prestataires qui ne se sont jamais parlé.

*Note copy : "les deux maisons" = lexique propriétaire autorisé (verbal-identity §1.1). Traite l'objection "coordination impossible".*

---

**Étape 3**
**H2** : La réalisation

> Un seul interlocuteur sur le chantier. Nous gérons les corps de métier, les délais, les interfaces techniques. Ce qui se passe sur votre propriété est sous notre responsabilité — vous en êtes informé, vous n'avez pas à le piloter.

*Note copy : verbal-identity §1.6 interlocuteur unique.*

---

**Étape 4**
**H2** : La livraison

> Réception conjointe de la piscine et du jardin. Votre propriété n'est pas livrée en deux temps — avec six mois de chantier jardin après la piscine. Le projet s'achève quand l'espace est complet.

---

**Étape 5**
**H2** : Le suivi annuel

> Votre piscine est entretenue par ceux qui l'ont construite. L'équipe connaît votre équipement — les choix faits au moment du chantier, les spécificités de votre terrain, les réglages propres à votre bassin.
>
> Vous n'avez pas à tout réexpliquer à chaque saison.

*Note copy : métaphore "l'ouvrage qui traverse les générations" (verbal-identity §4.2). Traite l'objection "disparaissent après livraison".*

---

### WF-04 / Section 3 — Ancrage local

[Photo : vue aérienne d'une commune de l'ouest parisien (78 ou 92) montrant des propriétés avec jardins et piscines dans un quartier résidentiel arboré — shot drone, lumière de journée]

**H2** :
> Nous connaissons ces propriétés — et leurs contraintes.

**Corps** :
> 30 ans de chantiers dans le 78 et le 92. Nous connaissons les nappes phréatiques, les PLU locaux, les caractéristiques du sol argilo-calcaire de l'ouest parisien. Ce savoir ne se consulte pas en ligne — il s'acquiert en travaillant sur ces terrains depuis des décennies.

**Liste des communes** (DM Serif Display italic ou tiret cadratin) :
> Le Vésinet — Saint-Nom-la-Bretèche — Ville-d'Avray — Marnes-la-Coquette — Saint-Cloud

*Note copy : verbal-identity §3.5B "Nous connaissons ces propriétés — et leurs contraintes." (formule PASS). Nommer les communes = preuve de connaissance locale, pas un registre SEO artificiel.*

---

### WF-04 / Section 4 — CTA sectionnel

**Texte d'amorce** :
> Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble.

**CTA** :
> Décrivez-nous votre projet →

*Note @fullstack : CTA vers /contact. Event cta_clicked (position: "footer").*

---

### WF-04 / Section 5 — Footer

*Référence : ux-writing-guide §6.*

---

---

## Page 5 — La maison (/la-maison)
### Référence wireframe : WF-06 | page-compositions.md §WF-06

**Meta title** : `La maison — 30 ans d'expertise, Freneuse (78) — {SITE_NAME}`
**Meta description** : `Aqua System et Les Terres Essentielles : histoire, valeurs, équipe. Plus de 30 ans d'ancrage dans les Yvelines et les Hauts-de-Seine. Certification Socotec CSP/ESP-001.`
**Balises sémantiques** : H1 unique (hero) | H2 : histoire / Aqua System / Les Terres Essentielles / valeurs

---

### WF-06 / Section 1 — Hero page

[Photo : portrait de Nicolas Berg debout devant une piscine réalisée par Aqua System — si autorisation photo obtenue et confirmée par fondateur. FALLBACK : équipe Aqua System sur un chantier, ouvriers en tenue professionnelle devant une piscine en cours de finition, contexte de travail sérieux]

*Note @fullstack : utiliser le slot FALLBACK si photo Nicolas Berg non disponible au moment de l'intégration. Jamais de banque d'images. Confirmer droit à l'image équipe au fondateur.*

**H1** :
> La maison

**Sous-titre** :
> Plus de 30 ans d'expertise dans les plus belles propriétés de l'ouest parisien — et une conviction : le détail fait tout.

---

### WF-06 / Section 2 — Notre histoire

**H2** :
> Notre histoire

**Corps** (paragraphes 3-4 lignes, 120 mots max) :
> Aqua System est née à Freneuse, dans les Yvelines, il y a plus de 30 ans. Depuis, nous n'avons pas changé de territoire : le 78 et le 92 — ces communes où les propriétés ont du caractère et où les propriétaires ont des exigences que le standard ne satisfait pas.
>
> Aujourd'hui, nous sommes une équipe de 8. Nous concevons, construisons et entretenons des piscines sur mesure. En partenariat avec Les Terres Essentielles, nous portons aussi le végétal — pour que l'eau et le jardin ne soient jamais pensés séparément.
>
> [À CONFIRMER : photo de Nicolas Berg — présentation sobre, nom + titre "Fondateur, Aqua System"]

*Note copy : jamais "société créée il y a 30 ans" (brand-voice §3 Glossaire, verbal-identity §1.13). "Équipe de 8" = preuve factuelle confirmée project-context.md. Section Nicolas Berg balisée — à remplir avec accord fondateur sur formulation exacte.*

---

### WF-06 / Section 3 — Les deux maisons

**Colonne gauche : Aqua System**

**H2** :
> Aqua System

**Corps** :
> Conception, construction, rénovation et entretien de piscines sur mesure. Spas extérieurs HotSpring, saunas, hammams. Traitement d'eau, robots Dolphin, SAV équipements.
>
> Membre du réseau L'Esprit Piscine. Certification Socotec « Professionnels de la piscine » CSP/ESP-001.
>
> Trophée d'Or FPP 2024 — Piscine intérieure. Award Bronze EUSA 2025 — Piscines intérieures privées (Barcelone).
>
> 45 Route Nationale, 78840 Freneuse — 01 30 42 26 00 — contact@aqua-system.fr

*Note @fullstack : afficher badges Socotec + L'Esprit Piscine (SVG) sous ce bloc, sobrement. Distinctions FPP/EUSA en texte sobre (1 ligne), pas de section trophées séparée. Mise à jour 2026-06-11 — @geo.*

---

**Colonne droite : Les Terres Essentielles**

**Surtitre** (forest-600 12px) :
> en partenariat avec

**H2** :
> Les Terres Essentielles

**Corps** :
> Bureau d'études paysager, création et entretien de parcs et jardins, pépinière. Des végétaux sélectionnés pour les sols et le climat de l'ouest parisien.
>
> CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi.

*Note copy : formulation "en partenariat avec" obligatoire avant finalisation acquisition (legal-audit §B, verbal-identity §1.12).*

---

### WF-06 / Section 4 — Valeurs (3 piliers)

*[Framework : consolidation de la confiance — les preuves ancrent chaque valeur]*

**Pilier 1**
**Titre** : Exigence

> Pas de standard, pas de catalogue. Chaque terrain est différent — chaque réalisation l'est aussi. L'exigence, c'est refuser le compromis qui ferait tenir un projet dans une offre existante.

---

**Pilier 2**
**Titre** : Confiance

> Nous construisons pour la pérennité — pas pour la saison. Le client dont la piscine a été construite il y a 15 ans : nous connaissons encore chaque équipement sans rouvrir un dossier. C'est ça, la confiance.

*Note copy : verbal-identity §4.2 "l'ouvrage qui traverse les générations". Traite l'objection "disparaissent après livraison".*

---

**Pilier 3**
**Titre** : Sur-mesure

> Aucune piscine ne ressemble à la précédente — parce qu'aucun terrain ne se ressemble. Le sur-mesure n'est pas une option : c'est la seule façon de bien faire.

---

### WF-06 / Section 5 — Photo propriété représentative

[Photo : propriété rénovée de grande ampleur — vue sur la terrasse avec piscine et jardin en arrière-plan, ambiance de fin de chantier réussi, sans personnes, lumière d'été]

*Pleine largeur, hauteur 480px desktop. Pas d'overlay, pas de texte superposé.*

---

### WF-06 / Section 6 — CTA discret

**Texte d'amorce** :
> Un projet ? Décrivez-nous ce que vous imaginez.

**CTA** :
> Parlez-nous de votre projet →

*Note copy : CTA "discret" dans le brief — le mettre sur fond sand-200 plutôt que sand-950, Button ghost ou primary selon design-system. Lien vers /contact.*

---

### WF-06 / Section 7 — Footer

*Référence : ux-writing-guide §6.*

---

---

## Page 6 — Réalisations (/realisations)
### Référence wireframe : WF-05 + WF-05b | page-compositions.md §WF-05 / §WF-05b

**Meta title** : `Réalisations — Piscines & Jardins haut de gamme en 78/92`
**Meta description** : `Portfolio de réalisations Aqua System et Les Terres Essentielles : piscines sur mesure, jardins, spas, projets complets en Yvelines et Hauts-de-Seine.`
**Balises sémantiques** : H1 unique (en-tête) | filtres (ARIA labels) | chaque fiche = H1 propre

---

### WF-05 / Section 1 — En-tête de page

**H1** :
> Réalisations

**Sous-titre** :
> 30 ans de chantiers dans les propriétés de l'ouest parisien.

---

### WF-05 / FilterBar — Wording des filtres

*Note @fullstack : wireframes.md WF-05 spécifie 4 filtres + "Tous". Wording exact ci-dessous.*

| Label affiché | Valeur data-filter | ARIA-label |
|--------------|-------------------|-----------|
| Tous | `tous` | Afficher toutes les réalisations |
| Piscine | `piscine` | Filtrer : piscines sur mesure |
| Spa & Sauna | `spa_sauna` | Filtrer : spas et saunas |
| Jardin & Parc | `jardin_parc` | Filtrer : jardins et parcs |
| Projet complet eau+jardin | `projet_complet` | Filtrer : projets complets eau et jardin |

*Note @fullstack : état actif du filtre = `aria-pressed="true"`. Filtre "Tous" actif par défaut.*

---

### WF-05 / Grille réalisations — Wording des cards

*Cards : type + zone seulement. Jamais de données fictives. Wording conforme page-compositions.md §WF-05.*

| Card | Type affiché | Zone |
|------|-------------|------|
| 1 | Piscine sur mesure | Yvelines (78) |
| 2 | Spa & Sauna | Hauts-de-Seine (92) |
| 3 | Projet complet eau + jardin | Yvelines (78) |
| 4 | Jardin & Parc | Hauts-de-Seine (92) |
| 5 | Piscine sur mesure | Hauts-de-Seine (92) |
| 6 | Spa & Sauna | Yvelines (78) |
| 7 | Jardin & Parc | Hauts-de-Seine (92) |
| 8 | Piscine sur mesure (rénovation) | Hauts-de-Seine (92) |

**Lien sur chaque card** :
> Voir →

---

### WF-05 / État "filtre sans résultat" (empty state)

*Référence : ux-writing-guide §4 (wording exact — ne pas dupliquer ici). Wording officiel : "Aucune réalisation ne correspond à cette sélection pour le moment." + lien vers toutes les réalisations.*

---

### WF-05b — Template fiche réalisation (/realisations/[slug])

> **RÈGLE ABSOLUE** : ce template ne contient AUCUNE donnée pré-remplie fictive.
> Tous les champs `[DONNÉES PROJET RÉEL : ...]` sont à remplir par le fondateur avec des données réelles.
> Source des projets réels : book Calameo + aqua-system.fr + esprit-piscine.fr/aqua-system.
> Droits à l'image à confirmer avant publication de chaque fiche.

---

**Structure de la fiche (layout 60-40, wireframes WF-05b)**

**Fil d'Ariane** :
> ← Retour aux réalisations

**Colonne gauche — Photos**

[Photo principale : [DONNÉES PROJET RÉEL : description de la photo — jamais d'adresse précise, jamais de nom de propriétaire]]

[Photo 2 si disponible : [DONNÉES PROJET RÉEL : description du détail]]

[Photo 3 si disponible : [DONNÉES PROJET RÉEL : description de la vue complémentaire]]

**Colonne droite — Informations**

**Type de projet** (DM Sans 12px water-600 uppercase) :
> [DONNÉES PROJET RÉEL : Piscine sur mesure | Spa & Sauna | Jardin & Parc | Projet complet]

**Zone géographique** :
> [DONNÉES PROJET RÉEL : Yvelines (78) | Hauts-de-Seine (92)]

**Prestations réalisées** (liste 3 items max) :
> [DONNÉES PROJET RÉEL : ex. Conception et construction | Aménagement paysager | Spa intégré]
> [DONNÉES PROJET RÉEL : ...]
> [DONNÉES PROJET RÉEL : ...]

---

**Texte éditorial de la fiche — Structure Intention → Réponse → Exécution**

*(brand-voice §4b — structure obligatoire pour chaque fiche)*

**Titre** (court, lieu ou type — jamais de superlatif) :
> [DONNÉES PROJET RÉEL : ex. "Propriété, Le Vésinet" ou "Piscine sur mesure, Yvelines"]

**Paragraphe 1 — Intention** (40-60 mots) :
> [DONNÉES PROJET RÉEL : Ce que le propriétaire cherchait. Jamais de verbatim fictif — décrire l'intention depuis les caractéristiques réelles du chantier.]

**Paragraphe 2 — Réponse** (40-60 mots) :
> [DONNÉES PROJET RÉEL : Ce que nous avons conçu. La logique de l'espace, le parti pris, la relation eau-végétal si pertinent.]

**Paragraphe 3 — Exécution** (40-60 mots) :
> [DONNÉES PROJET RÉEL : Ce qui fait la réalisation. Les choix techniques concrets, les contraintes surmontées, les matériaux choisis.]

**Légende photo** (en bas de chaque photo) :
> Réalisation [DONNÉES PROJET RÉEL : Aqua System | Aqua System × Les Terres Essentielles], [DONNÉES PROJET RÉEL : commune] — photo publiée avec l'autorisation du propriétaire.

---

**CTA fiche réalisation**

**Texte** :
> Ce projet vous inspire ? Parlons du vôtre.

*(ux-writing-guide §5 — "Ce projet vous inspire ? Parlons du vôtre" est la variante CTA pour les fiches)*

**Bouton** :
> Parlez-nous de votre projet →

*Note @fullstack : lien vers /contact avec smart default chip selon type de projet de la fiche.*

---

**Cross-sell conditionnel (si piscine seule)**

*Composant CrossSellSplit — wording identique à WF-02 Section 6.*

---

---

## Page 7 — Prescripteurs (/prescripteurs)
### Référence wireframe : WF-07 | page-compositions.md §WF-07

> Cette page reprend intégralement le wording produit dans ux-writing-guide v1.2 §10.
> La présente section complète avec le hero (H1 + sous-titre) et la clôture (CTA principal),
> en cohérence totale avec les 3 blocs valeur déjà rédigés.

**Meta title** : `Espace architectes & prescripteurs — Aqua System, 78/92`
**Meta description** : `Architectes, paysagistes et décorateurs : un exécutant haut de gamme qui travaille sur votre plan, protège votre relation client et respecte vos délais. 78/92.`
**Balises sémantiques** : H1 unique (hero) | H2 par bloc valeur + preuves + accès portfolio + clôture

---

### WF-07 / Section 1 — Hero prescripteur

[Photo : détail de finition de chantier haut de gamme — margelle en pierre reconstituée posée avec précision, joint parfait, niveau à bulle en appui, focus sur le travail artisanal, aucune personne identifiable]

**H1** :
> L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription.

**Sous-titre** :
> Pour les architectes, paysagistes et décorateurs d'intérieur — un partenaire qui travaille sur votre plan.

**CTA above fold** :
> Présentons-nous →

*Note @fullstack : event prescripteur_cta_clicked (E-08, position: "above_fold"). CTA vers /contact?source=prescripteurs.*
*Note copy : H1 conforme wireframes WF-07 / page-compositions §WF-07 hero. Sous-titre aussi. Label "partenaire" validé ici (contexte professionnel B2B, non soumis aux restrictions LTE qui concernent la structure capitalistique — distinct des formulations proscrites par legal-audit §B).*

---

### WF-07 / Sections 2-4 — Blocs valeur + preuves + portfolio

*Référence intégrale : ux-writing-guide v1.2 §10 (wording exact — H2, corps, CTAs secondaires).*

*Rappel du sommaire de §10 pour @fullstack :*
- *Bloc 1 : H2 "Un exécutant qui lit les plans." — bureau d'études, certifications*
- *Bloc 2 : H2 "Votre relation avec votre client reste la vôtre." — protocole, interlocuteur dédié*
- *Bloc 3 : H2 "30 ans de réalisations en 78/92 — portfolio sur demande." — communes nommées*

*Ces trois blocs constituent les colonnes 3 du WF-07 (3 blocs valeur 4-4-4). Le contenu de page-compositions §WF-07 Section 2 (titre + corps par colonne) reprend les H2 de §10.*

---

### WF-07 / Section 3 (compositions) — Preuves détaillées

**H2** :
> Ce qui nous qualifie

*Wording des 4 preuves (wireframes WF-07, Section "Preuves détaillées") :*

**Preuve 1**
> **Certification Socotec CSP/ESP-001**
> "Professionnels de la piscine" — certification de référence dans le secteur, délivrée par un organisme tiers indépendant. [À CONFIRMER : PDF téléchargeable ou disponible sur demande]

**Preuve 2**
> **Réseau L'Esprit Piscine**
> Réseau national de piscinistes professionnels. Sélection sur critères techniques et de service.

**Preuve 3**
> **Plus de 30 ans d'activité en 78/92**
> Connaissance des sols, des PLU, des contraintes propres aux propriétés de l'ouest parisien. Des références locales, identifiables, vérifiables.

**Preuve 4**
> **Bureau d'études paysager intégré**
> En partenariat avec Les Terres Essentielles — capacité de projet global eau + végétal depuis un seul bureau d'études.

*Note copy : formulation LTE vérifiée. "En partenariat avec" = formule légale validée (legal-audit §B).*

---

### WF-07 / Section 4 — Accès portfolio

**H2** :
> Nos réalisations — références vérifiables

*Wording 3 cards portfolio (conforme page-compositions §WF-07 Section 4) :*

Card 1 :
> Type : Piscine sur mesure | Zone : Yvelines (78)

Card 2 :
> Type : Jardin & Parc | Zone : Hauts-de-Seine (92)

Card 3 :
> Type : Projet complet | Zone : Yvelines (78)

**CTA secondaire** :
> Voir toutes les réalisations →

*Note @fullstack : lien vers /realisations avec filtre "projet_complet" présélectionné.*

---

### WF-07 / Section 5 — CTA principal Camille

**H2** :
> Travaillons ensemble.

**Corps** :
> Présentez-nous votre projet. Nous vous répondons avec notre portfolio, nos références et notre méthode de collaboration.

**CTA** :
> Présentons-nous →

*Note @fullstack : event prescripteur_cta_clicked (E-08, position: "milieu_page"). CTA vers /contact?source=prescripteurs.*
*Note copy : "Présentons-nous" = CTA validé ux-writing-guide §5 (ton pair-à-pair, aucune posture commerciale). Pas de CTA "Demandez un devis".*

---

### WF-07 / Section 6 — Footer

*Référence : ux-writing-guide §6.*

---

---

## Page 8 — Contact (/contact)
### Référence wireframe : WF-08 | page-compositions.md §WF-08

**Meta title** : `Contact — Parlez-nous de votre projet, Yvelines & Hauts-de-Seine`
**Meta description** : `Décrivez votre projet d'extérieur — piscine, jardin, spa. Aqua System vous répond pour un premier échange. 01 30 42 26 00 — Freneuse (78).`
**Balises sémantiques** : H1 unique | coordonnées en bas colonne gauche

---

### WF-08 / Section 1 — En-tête et formulaire

**H1** :
> Parlez-nous de votre projet

**Texte intro** (colonne gauche, 3 lignes, DM Sans 18px) :
> Décrivez-nous ce que vous imaginez — en quelques mots ou en détail, comme vous préférez.
>
> Nicolas Berg reviendra vers vous [À CONFIRMER : délai réel de Nicolas Berg] pour un premier échange. Pas un devis au téléphone — une conversation.

*Note copy : "pas un devis au téléphone" répond à l'objection implicite d'Alexandre : il ne veut pas être qualifié immédiatement. Conforme brand-voice §4a (CTA non agressif). Le placeholder délai est identique à ux-writing-guide §3.*

**Coordonnées** (bas colonne gauche, discrètes) :
> 01 30 42 26 00
> contact@aqua-system.fr
> 45 Route Nationale, 78840 Freneuse

---

**Formulaire et wording champs** :
*Référence intégrale : ux-writing-guide §1 (labels, placeholders, chips, erreurs, bouton, mention RGPD — wording exact, ne pas dupliquer ici).*

---

### WF-08 / Page /contact/merci (post-soumission)

*Référence intégrale : ux-writing-guide §3 (message de succès exact — ne pas dupliquer ici).*

*Note @fullstack : page statique distincte /contact/merci. Event form_submission_success (E-01). Pas de confetti, ton sobre.*

---

---

## Page 9 — Page 404

*Référence intégrale : ux-writing-guide §7 (H1, corps, CTAs exacts — ne pas dupliquer ici).*
*Référence wireframe : WF-09 | page-compositions.md §WF-09.*

**Meta title** : `Page introuvable — {SITE_NAME}`
**Meta description** : *Non indexable (noindex sur les 404 — note @fullstack).*

*Note @fullstack : `<meta name="robots" content="noindex">` sur cette page.*

---

---

## Annexe A — Synthèse des références croisées

| Élément | Source de vérité | Note |
|---------|-----------------|------|
| Wording formulaire complet (labels, placeholders, erreurs, bouton, RGPD) | ux-writing-guide §1-2 | Ne pas dupliquer dans site-copy.md |
| Message de succès /contact/merci | ux-writing-guide §3 | Placeholder délai À CONFIRMER |
| Empty state portfolio | ux-writing-guide §4 | Idem |
| CTAs — variantes par page | ux-writing-guide §5 | Tableau récapitulatif complet |
| Nav + footer wording | ux-writing-guide §6 | Ordre nav + libellés définitifs |
| Page 404 wording | ux-writing-guide §7 | Ton sobre, sans humour forcé |
| Wording /prescripteurs §10 | ux-writing-guide §10 | Blocs 1-3 valeur Camille + CTA |
| Lexique propriétaire (13 termes) | verbal-identity §1 | Usage + contre-usage |
| Formules signature (6) | verbal-identity §3 | PASS toutes — ne pas modifier |
| Formulations interdites | brand-voice §3 + verbal-identity §2 | Grep avant publication |

---

## Annexe B — Placeholders à confirmer avant mise en ligne

| Placeholder | Page | Criticité |
|-------------|------|-----------|
| [À CONFIRMER : délai de réponse réel de Nicolas] | /contact, /contact/merci | P0 — bloque le message de succès |
| [À CONFIRMER : photo Nicolas Berg] | /la-maison (hero) | P1 — fallback disponible |
| [À CONFIRMER : PDF certifications téléchargeables] | /prescripteurs (preuves 1) | P1 — mention balisée |
| [DONNÉES PROJET RÉEL : ...] — tous les champs template fiche | /realisations/[slug] | P0 — aucune fiche publiable sans données réelles |
| Droits à l'image — photos Calameo, aqua-system.fr, esprit-piscine.fr | Toutes pages | P0 — confirmation fondateur avant mise en ligne |

---

## Annexe C — Grep de contrôle (à exécuter avant intégration)

Termes interdits à vérifier dans ce fichier :

- `groupe` → absent [à vérifier]
- `nos sociétés` → absent [à vérifier]
- `leader` → absent [à vérifier]
- `n°1` → absent [à vérifier]
- `filiale` → absent [à vérifier]
- `même propriétaire` → absent [à vérifier]
- `devis gratuit` → absent [à vérifier]
- `passionnés` → absent [à vérifier]
- `clé en main` → absent [à vérifier]
- `premium` → absent [à vérifier]

---

*Fichier produit par @copywriter — 2026-06-11*
*Sources : brand-voice.md, ux-writing-guide.md v1.2, verbal-identity.md, wireframes.md v1.1, page-compositions.md, project-context.md, legal-audit.md §B*
*Framework : AIDA conviction-first | Conscience : Alexandre Solution-Aware, Camille Problem-Aware*
*Objections traitées : 7 (voir Tableau objections en tête de document)*

---

---

## RECALIBRAGE v1.1 — LTE réalité jardinerie + Kei-Stone (2026-06-12)

> Contexte : précision fondateur du 2026-06-12 (project-context.md §"Validations fondateur" point 7).
> LTE est avant tout une JARDINERIE + bureau d'études + distribution Kei-Stone (pierre naturelle).
> L'offre création paysagère reste affichée (ambition assumée, validée fondateur) mais AUCUNE formulation
> ne peut laisser croire à un historique de réalisations paysagères livrées.
> Les 30 ans d'ancrage sont côté Aqua System, pas côté LTE.
> Recrutement paysagiste en cours : ne pas mentionner sur le site (règle : pas de recrutement en cours sur site client).
>
> Source Kei-Stone vérifiée par WebSearch : kei-stone.fr — fabricant/importateur et distributeur de pierre
> naturelle (dallages, margelles, carrelage, parements) depuis 2001 ; gamme spécifique piscine (dallages plage +
> margelles Saint-Côme, Montfort, Bleu d'Asie, Gris d'Asie, Bluestone) ; réseau de magasins propres en PACA +
> concessionnaires en France. [À CONFIRMER : nature exacte du partenariat LTE ↔ Kei-Stone — "distributeur
> agréé", "concessionnaire" ou autre — avant publication de ce bloc.]

### Périmètre des modifications

| # | Page / Section | Élément | Avant | Après | Criticité |
|---|---------------|---------|-------|-------|-----------|
| 1 | /jardins-paysage (WF-03 §5) | ProofBadge 3 | "Plus de 30 ans / en 78/92" | "Jardinerie & expertise / depuis 2015" | P0 — le badge 30 ans est faux pour LTE |
| 2 | /jardins-paysage (WF-03 §3) | Bloc Création — corps §2 | "Aucune réalisation ne ressemble à la précédente, parce qu'aucun terrain ne se ressemble." | "Chaque projet est pensé depuis la contrainte réelle du terrain : aucun plan ne ressemble au précédent." | P1 — "réalisation" sous-entend un historique livré |
| 3 | /jardins-paysage (WF-03 §3) | Nouveau bloc entre Création et Pépinière | — (absent) | Bloc "Pierre naturelle — Kei-Stone" (voir copie complète ci-dessous) | P1 — offre réelle non représentée |
| 4 | /la-maison (WF-06 §3) | Bloc LTE corps §1 | "Bureau d'études paysager, création et entretien de parcs et jardins, pépinière." | "Jardinerie, bureau d'études paysager, création et entretien de parcs et jardins, pépinière. Distribution de pierre naturelle Kei-Stone." | P1 — jardinerie absente, Kei-Stone absent |
| 5 | /jardins-paysage meta OG imageAlt (TSX) | alt OG image | "Jardin sur mesure réalisé par Les Terres Essentielles dans les Yvelines" | "Jardin et terrasse en pierre naturelle dans une propriété des Yvelines — Les Terres Essentielles" | P0 — "réalisé par LTE" = fausse promesse directe ; à corriger dans page.tsx |
| 6 | /jardins-paysage meta description | description | "Bureau d'études paysager, jardins et parcs sur mesure en 78/92. Les Terres Essentielles, en partenariat avec Aqua System. Contactez-nous." | "Jardinerie, bureau d'études paysager et pierre naturelle Kei-Stone en 78/92. Les Terres Essentielles, en partenariat avec Aqua System." | P1 — intégrer la réalité jardinerie + Kei-Stone sans sur-promettre |

---

### Édits site-copy.md — texte de référence modifié

#### Édit 1 — ProofBadges /jardins-paysage (WF-03 §5)

**REMPLACE** dans "Page 3 — Jardins & Paysage", section "WF-03 / Section 5 — Preuves (ProofBadges jardins)" :

| Badge | Ligne 1 | Ligne 2 |
|-------|---------|---------|
| 1 | Bureau d'études | paysager intégré |
| 2 | Pépinière | propre |
| ~~3~~ | ~~Plus de 30 ans~~ | ~~en 78/92~~ |
| 3 (nouveau) | Jardinerie & expertise | depuis 2015 |

> Justification : "Plus de 30 ans en 78/92" est la preuve d'Aqua System. LTE est créée en 2015 (SIREN 811 198 217,
> project-context.md). Utiliser "depuis 2015" est factuel et n'invente rien. L'ancrage 78/92 reste dans
> "bureau d'études paysager intégré" (Alluets-le-Roi, 78580 — connu du persona).

---

#### Édit 2 — Bloc Création (WF-03 §3) — corps §1 seul

**REMPLACE** dans "WF-03 / Section 3 — Bloc 2 : Création de parcs et jardins", paragraphe 1 du Corps :

AVANT :
> Allées, massifs, pelouses, enrochements, terrasses végétalisées — chaque élément est choisi pour son rapport avec les autres et avec l'architecture de la maison. Aucune réalisation ne ressemble à la précédente, parce qu'aucun terrain ne se ressemble.

APRÈS :
> Allées, massifs, pelouses, enrochements, terrasses végétalisées — chaque élément est conçu pour son rapport avec les autres et avec l'architecture de la maison. Chaque projet part du terrain : aucun plan ne ressemble au précédent, parce qu'aucun terrain ne se ressemble.

> Justification : "chaque élément est choisi" → "est conçu" (plus juste pour une offre en construction d'équipe) ;
> "Aucune réalisation ne ressemble" → "Chaque projet part du terrain : aucun plan ne ressemble" — on parle de
> conception, pas de chantiers livrés. Changement minimal, ton identique, reformulation chirurgicale.

---

#### Édit 3 — Nouveau bloc "Pierre naturelle — Kei-Stone" (WF-03, entre §3 et §4)

**INSÉRER** après la section "WF-03 / Section 3 — Bloc 2 : Création de parcs et jardins" et avant "WF-03 / Section 4 — Bloc 3 : Entretien et pépinière" :

---

### WF-03 / Section 3b — Bloc Pierre naturelle : Kei-Stone

[Photo : dallage en pierre naturelle autour d'une plage de piscine — margelles posées à ras, surface calcaire beige-gris, harmonie avec la végétation en bordure — à obtenir : photo de réalisation ou visuel fournisseur Kei-Stone]

**Surtitre** (DM Sans 12px forest-600 uppercase) :
> Pierre naturelle

**H2** :
> La pierre comme trait d'union entre l'eau et le jardin

**Corps** (3 lignes, 70 mots max) :
> Dallages de plage, margelles de piscine, allées et pas japonais — la pierre naturelle est le matériau qui fait tenir ensemble l'eau et le végétal. Elle vieillit avec la propriété, absorbe la lumière, et ne ressemble à rien de standard.
>
> Les Terres Essentielles distribuent les pierres naturelles Kei-Stone [À CONFIRMER : nature exacte du partenariat LTE ↔ Kei-Stone] — une gamme pensée pour les extérieurs haut de gamme : travertin, calcaire, bluestone, pierre grise d'Asie. Disponibles pour vos projets d'aménagement.

*Note copy : "distribuent" peut être remplacé par "proposent en partenariat avec" ou "sont concessionnaires de" selon la confirmation fondateur. Ne pas écrire "vendent" (trop commercial, hors registre). Kei-Stone est une marque réelle, vérifiée kei-stone.fr — fabricant/importateur de pierre naturelle, réseau de concessionnaires en France depuis 2001.*

*Note @fullstack : ce bloc s'insère entre CreationBlock et PepiniereBlock dans src/app/jardins-paysage/page.tsx. Même composant PlaceholderSplit que Bureau d'études (accent forest, photo placeholder jusqu'à obtention d'une photo réelle). Le slot photo "à obtenir" est P1 — ne bloque pas la mise en ligne.*

---

#### Édit 4 — Bloc LTE dans /la-maison (WF-06 §3)

**REMPLACE** dans "Page 5 — La maison", section "WF-06 / Section 3 — Les deux maisons", colonne droite, Corps §1 :

AVANT :
> Bureau d'études paysager, création et entretien de parcs et jardins, pépinière. Des végétaux sélectionnés pour les sols et le climat de l'ouest parisien.

APRÈS :
> Jardinerie, bureau d'études paysager, création et entretien de parcs et jardins, pépinière. Pierre naturelle Kei-Stone [À CONFIRMER]. Des végétaux et des matériaux sélectionnés pour les propriétés de l'ouest parisien.

> Justification : "Jardinerie" en premier (réalité fondateur, cœur de l'activité LTE actuelle) ; "Pierre naturelle
> Kei-Stone" ajoutée sobrement ; "Des végétaux et des matériaux" — élargissement du périmètre sans rupture de ton.
> Modification minimale : 2 ajouts, 1 substitution de fin de phrase. Le reste du bloc est inchangé.

---

### Éléments à corriger dans src/ (pour @fullstack)

#### Fix 1 — src/app/jardins-paysage/page.tsx : alt OG image (ligne 37)

FICHIER : `src/app/jardins-paysage/page.tsx`
AVANT (ligne 37) :
```
alt: 'Jardin sur mesure réalisé par Les Terres Essentielles dans les Yvelines',
```
APRÈS :
```
alt: 'Jardin et terrasse en pierre naturelle dans une propriété des Yvelines — Les Terres Essentielles',
```

#### Fix 2 — src/app/jardins-paysage/page.tsx : meta description (ligne 26-27)

FICHIER : `src/app/jardins-paysage/page.tsx`
AVANT (lignes 26-27) :
```
description:
    "Bureau d'études paysager, jardins et parcs sur mesure en 78/92. Les Terres Essentielles, en partenariat avec Aqua System. Contactez-nous.",
```
APRÈS :
```
description:
    "Jardinerie, bureau d'études paysager et pierre naturelle Kei-Stone en 78/92. Les Terres Essentielles, en partenariat avec Aqua System.",
```

#### Fix 3 — src/app/jardins-paysage/page.tsx : JARDINS_PROOFS (ligne 48-52)

FICHIER : `src/app/jardins-paysage/page.tsx`
AVANT (ligne 50-52) :
```
  { figure: "Bureau d'études", label: 'paysager intégré' },
  { figure: 'Pépinière', label: 'propre' },
  { figure: '30+', label: 'ans en 78/92' },
```
APRÈS :
```
  { figure: "Bureau d'études", label: 'paysager intégré' },
  { figure: 'Pépinière', label: 'propre' },
  { figure: 'Jardinerie & expertise', label: 'depuis 2015' },
```

#### Fix 4 — src/app/jardins-paysage/page.tsx : nouveau bloc KeiStone (après CreationBlock, avant PepiniereBlock)

FICHIER : `src/app/jardins-paysage/page.tsx`
INSÉRER après la ligne `{/* Bloc 2 — Création de parcs et jardins (placeholder : chantier création). */}` et son composant `<CreationBlock />` :

```tsx
{/* Bloc 3b — Pierre naturelle Kei-Stone (distributeur LTE — synergie piscines/jardins). */}
<KeiStoneBlock />
```

ET ajouter la fonction composant suivante dans le fichier (avant `PlaceholderSplit`) :

```tsx
function KeiStoneBlock() {
  return (
    <PlaceholderSplit
      eyebrow="Pierre naturelle"
      title="La pierre comme trait d'union entre l'eau et le jardin"
      body={[
        "Dallages de plage, margelles de piscine, allées et pas japonais — la pierre naturelle est le matériau qui fait tenir ensemble l'eau et le végétal. Elle vieillit avec la propriété, absorbe la lumière, et ne ressemble à rien de standard.",
        "Les Terres Essentielles distribuent les pierres naturelles Kei-Stone — une gamme pensée pour les extérieurs haut de gamme : travertin, calcaire, bluestone, pierre grise d'Asie.",
      ]}
      placeholder="Dallage en pierre naturelle autour d'une plage de piscine — margelles posées à ras, surface calcaire beige-gris, harmonie avec la végétation en bordure. [Photo à obtenir — fournisseur Kei-Stone ou réalisation LTE]"
    />
  );
}
```

> Note @fullstack : "distribuent" dans le corps peut être ajusté une fois la nature du partenariat confirmée
> par le fondateur [À CONFIRMER]. Le composant PlaceholderSplit existant est réutilisé sans modification.
> Renommer les numéros de blocs dans les commentaires : ancien Bloc 3 Pépinière → Bloc 4.

---

### Critères de done — vérification post-application

- [ ] Zéro badge "30+ ans" sur /jardins-paysage (les 30 ans restent sur l'accueil et /piscines-bien-etre où ils désignent Aqua System)
- [ ] Bloc Kei-Stone présent entre Création et Pépinière — factuel, sourcé, [À CONFIRMER partenariat] visible
- [ ] "réalisé par Les Terres Essentielles" absent de tous les alt/meta publics
- [ ] Bloc LTE /la-maison : "Jardinerie" en premier mot
- [ ] Grep "réalisation" sur /jardins-paysage : seules occurrences acceptables = "Aucun plan ne ressemble au précédent" (contexte conception) et cross-sell (vers piscines, hors périmètre LTE)
- [ ] build/tsc/lint PASS post-édits

---

*Section v1.1 produite par @copywriter — 2026-06-12*
*Framework : audit anti-fausse-promesse + AIDA | Conscience : Alexandre Solution-Aware*
*Source Kei-Stone : kei-stone.fr (WebSearch 2026-06-12) — fabricant/importateur pierre naturelle, réseau concessionnaires France*
