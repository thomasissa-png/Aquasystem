# Audit desktop exhaustif — Aquasystem (LIVE)

> **Viewport** : 1440 × 900 (desktop réel, DPR 1) — **Site** : https://aquasystem.pages.dev
> **Date** : 2026-06-12 · **Méthode** : capture section par section (~800px de scroll), lecture visuelle de CHAQUE image, jugement OK / P0 / P1 / P2.
> **Cadre** : audit jumeau de l'audit mobile en cours, mêmes pages. Verdict **uniquement** sur images lues. Aucune correction appliquée.
> **Shots** : `docs/reviews/audit-desktop-2026-06-12/shots/<page>-sNN.jpg` (≤ 150 Ko chacun) + shots de survol `*-hover-*.jpg`.

## Légende sévérité
- **P0** : bloquant perception premium / lisibilité / crédibilité — à corriger avant tout RDV.
- **P1** : défaut net visible par la cible, nuit au haut de gamme.
- **P2** : finition / micro-ajustement.
- **OK** : conforme au niveau attendu.

---

## 1. Accueil `/` — 5 sections + 4 survols

### Hero (s01) — retour fondateur #1 (contraste texte blanc)
Photo : belle demeure ancienne crème/brique, ciel bleu, grande pelouse, **piscine miroir au premier plan** reflétant la façade. Image nette à 1440 (pas de pixellisation perceptible malgré source 1280 — le bas, zone piscine + pelouse, reste propre). Cadrage premium, cohérent avec le positionnement.

**Contraste H1/sous-titre, ligne par ligne (texte blanc crème, en bas-gauche)** :
- H1 ligne 1 « L'extérieur à la hauteur » : posée sur le **tronc clair du pin à gauche + pelouse vert moyen + reflet d'eau** → contraste correct sur la majorité, mais le mot « hauteur » à droite croise une **zone de pelouse claire ensoleillée** → lisibilité affaiblie en bout de ligne.
- H1 ligne 2 « de votre propriété. » : sur **margelle pierre claire + eau turquoise clair (reflet ciel)** → **c'est la ligne la plus à risque** : le « de votre » passe sur de la pelouse, mais « propriété. » chevauche la **margelle pierre très claire** → le contraste blanc-sur-clair devient limite.
- Sous-titre (2 lignes, gris-blanc plus fin, plus petit) : « De la vision à la réalisation… » sur **eau turquoise claire + reflet** → **le plus faible de tout le hero** : texte fin + couleur claire + fond clair = le fondateur a raison, **ça manque de visibilité**. Aucun voile/scrim assombrissant lisible sous le texte.
- Bouton « Parlez-nous de votre projet » : pétrole plein, texte blanc → contraste OK.

> **Constat** : pas de calque d'assombrissement (overlay/gradient) sous la colonne de texte. Sur cette photo très lumineuse (eau + pierre + pelouse ensoleillée), le blanc « flotte ». **P1 (proche P0 sur le sous-titre)**.

**Verdict Hero : P1** — ajouter un scrim/gradient sombre localisé sous le bloc texte (ou ombre portée renforcée). Le sous-titre fin est le maillon faible.

### Bloc « Aqua System » / « En partenariat avec Les Terres Essentielles » (s02) — retour fondateur #5
Deux colonnes, séparateur vertical fin au centre. Sur-titres en petites capitales pétrole.
- **Colonne gauche « AQUA SYSTEM »** : photo d'une piscine contemporaine — margelle/banquette pierre claire, **bardage bois clair en fond**, jardinières anthracite alignées, graminées + sphères décoratives, transats. Image nette, propre, premium. **On y voit clairement une réalisation piscine + abords paysagers** → cohérente avec l'expertise eau.
- **Colonne droite « EN PARTENARIAT AVEC LES TERRES ESSENTIELLES »** : photo d'une **maison contemporaine à toit végétalisé, structure verre + couloir vitré au sol, bassin/piscine intérieure vitrée, massifs de rosiers, haies taillées**. Image nette. **Problème de pertinence** : cette photo illustre surtout une **architecture verre + piscine** (univers eau/archi), pas une réalisation de **jardinerie / création paysagère** qui est le cœur réel de LTE (terre agricole, produits jardin, Kei-Stone). Le rosier + la haie en périphérie sont les seuls éléments « végétal ». La photo est belle mais **ne raconte pas LTE** → décalage promesse/preuve.

> **Constat fondateur #5** : les deux photos sont nettes et de bonne facture. Le souci n'est pas la qualité brute mais **l'adéquation** : la colonne LTE montre une archi verre/piscine et non l'identité jardinerie/pierre naturelle. **P1** (cohérence narrative). Hauteurs d'images alignées, bon équilibre des colonnes.

**Verdict : P1** — repositionner une image qui dit « végétal / pierre naturelle / jardinerie » côté LTE.

### Deux offres « Piscines & Bien-être » / « Jardins & Paysage » (s03 haut)
Deux colonnes texte, titres serif, paragraphes + lien « Découvrir → ». Texte gris foncé sur fond crème → **contraste OK**. Longueur de ligne ~60-65ch → confortable, **pas trop long**. Séparateur central cohérent avec s02.
**Verdict : OK.**

### Bandeau preuves (s03 bas) — 30+ / 350+ / Socotec / L'Esprit Piscine
4 cartes beige sable, gros chiffres/mots serif brun doré, libellés gris. Lisibles, alignées, hauteurs égales. Sous-texte récap (Trophée d'Or FPP 2024, Award Bronze EUSA 2025) gris sur crème → OK. Esthétique sobre premium.
**Verdict : OK** (P2 mineur : les 4 cartes sable sur fond crème manquent un poil de contraste de séparation, mais acceptable).

### Réalisations — grille 3 cards (s04) — retour fondateur #4 (badges)
Titre « Quelques propriétés que nous avons transformées. » serif, centré. 3 cards : image + type + zone + « Voir → ».
- **Badge « en cours de documentation »** : présent **en bas-gauche de chaque image** (visible sur la card du milieu : `en cours de documentation`). **Texte gris clair, minuscule, italique léger, SANS fond plein lisible**, posé directement sur la photo → **illisible et peu qualitatif**, exactement le reproche fondateur. Sur images claires il disparaît presque ; sur images sombres il reste faible. **P1.**
- Cards : images nettes, ratio homogène, hover testé (cf. infra). Libellés type en petites capitales pétrole + zone serif → propres.

**Verdict grille : OK**, **mais badge = P1**.

### CTA final + Footer (s05)
- Bandeau sombre (anthracite/noir) : « Un projet d'extérieur mérite une conversation — pas un formulaire. » serif blanc centré + bouton pétrole. **Contraste excellent**, beau contraste de section vs le crème au-dessus. Premium.
- Footer : colonnes Aquasystem / Navigation / Nous trouver. Deux entités (Aqua System Freneuse + Les Terres Essentielles Les Alluets). Badges « Certifié Socotec » / « Réseau L'Esprit Piscine ». Mentions légales + politique en bas. **Texte gris clair sur anthracite → contraste OK mais le gris des adresses est un peu faible (P2)**. Bien structuré, complet.
**Verdict : OK** (P2 contraste gris footer).

### Survols (retour fondateur #2)
- **Nav** (`home-hover-nav.jpg`) : lien survolé = **soulignement fin** (ex. « Réalisations »). Sobre, élégant, cohérent. **OK.**
- **CTA hero** (`home-hover-cta.jpg`) : le bouton pétrole **s'éclaircit/désature légèrement** au survol — effet subtil, lisible, pas tape-à-l'œil. **OK** (P2 : effet presque imperceptible, on pourrait l'assumer un peu plus).
- **Card** : pas de card dans le hero ; le survol a atterri sur la nav (soulignement). Le vrai hover de card est documenté page Réalisations.

### Note page Accueil : **7/10**
Hero superbe mais contraste texte = vrai sujet (fondateur a raison). Badges drafts dégradent la grille. Cohérence photo LTE à revoir. Le reste (preuves, CTA, footer) est au niveau premium.

---

## 2. Piscines & Bien-être `/piscines-bien-etre` — 6 sections (s05/s06 = doublon CTA+footer)

### Hero (s01) — contraste
Photo : piscine contemporaine, **banquette/margelles pierre claire, bardage bois clair, jardinières anthracite + graminées, transats, baies vitrées**. Nette, premium.
- H1 « Piscines & Bien-être » serif blanc, posé sur la **zone pierre claire + eau** au centre-bas → le « Piscines & » sur eau sombre passe bien ; « Bien-être » sur **margelle/pierre claire** → contraste affaibli. **Limite.**
- Sous-titre « Notre maison Aqua System — conception sur mesure depuis plus de 30 ans… » sur **pierre claire ensoleillée + graminées** → **faible**, même symptôme qu'en accueil (texte fin clair sur fond clair, pas de scrim). **P1.**

**Verdict Hero : P1** (contraste sous-titre).

### Bureau d'études + 1er bloc « De la feuille blanche à l'inauguration » (s01 bas / s02 haut)
Texte gris foncé sur crème → OK. Photo droite (piscine en lisière de forêt, transats) nette et premium. Lignes ~60ch → OK.
**Verdict : OK.**

### Spa & Bien-être — **bloc « Visuel à venir »** (s02 bas) — **placeholder vide**
Colonne gauche = **boîte grise vide avec icône image + « Visuel à venir » + description du visuel attendu** (« Spa HotSpring encastré dans une terrasse en bois exotique… »). Colonne droite = texte « L'eau chaude dans votre propriété ».
> **Constat** : un **emplacement d'image vide** affiché en production sur une page commerciale premium = **P0 perception**. La cible voit une maquette inachevée. Le texte descriptif du visuel manquant est visible publiquement (note de production exposée). **P0.**

### Suivi annuel « L'équipe qui connaît votre piscine de l'intérieur » (s03)
Texte gauche + photo droite (piscine intérieure béton brut + baies, nette, très belle). Premium, cohérent.
**Verdict : OK.**

### Bandeau preuves (s03 bas / s04 haut) — 30+/350+/Socotec/L'Esprit Piscine
Mêmes 4 cartes sable. **Problème de débordement** : sur Socotec « CSP/ESP-001 — certification technique » et « L'Esprit Piscine / réseau professionnel piscinistes », **le texte touche / déborde le bas de la carte** (mot « technique » coupé par le bord en s03, « Piscine » qui descend très bas en s04). **P2** (hauteur de carte insuffisante pour le contenu le plus long).

### Cross-link « Votre piscine mérite un jardin à sa mesure » (s04 bas)
Image pleine-hauteur à gauche (piscine + jardin fleuri, parasols), texte droite + lien. Belle compo. **OK.**

### CTA + Footer (s05/s06) : identiques à l'accueil. **OK** (P2 gris footer).

### Note page Piscines & Bien-être : **6/10**
Page solide et premium SAUF le **bloc « Visuel à venir » vide (P0)** qui casse la crédibilité, + contraste hero + débordement cartes preuves.

---

## 3. Jardins & Paysage `/jardins-paysage` — 5 sections

### Hero (s01) — contraste
Photo : maison brique contemporaine + bambous + piscine béton. Nette. H1 « Jardins & Paysage » serif blanc sur **muret brique sombre** → contraste **OK** (fond plus sombre que les autres heros). Sous-titre « En partenariat avec Les Terres Essentielles… » sur **margelle/eau plus claire** → un peu faible mais **moins critique** ici. **P2** (mieux que les autres heros).
> Remarque : le hero d'une page « Jardins » montre **surtout une piscine** — léger décalage thématique (la végétation est secondaire dans le cadrage). **P2.**

### Bureau d'études « Un projet pensé avant d'être planté » + **« Visuel à venir » #1** (s01 bas / s02 haut)
Colonne droite = **boîte grise vide « Visuel à venir » + « Plans de jardin déroulés sur une grande table… »**. **P0** (placeholder vide en prod).

### Bloc co-conception (s02 milieu) : texte LTE bureau d'études — OK contraste.

### Création « La réalisation, du premier arbre à la dernière pierre » + **« Visuel à venir » #2** (s02 bas / s03 haut)
Colonne gauche = **2e boîte grise vide « Visuel à venir » + « Chantier de création d'un jardin… »**. **P0** (deuxième placeholder vide sur la même page).
> **Constat** : la page cœur du positionnement « jardin » affiche **2 emplacements d'images vides**. Pour une page censée prouver l'expertise paysagère, c'est le **point le plus dommageable du site en perception premium**. Cohérent avec le contexte (offre création en construction, pas de photos), mais **à masquer plutôt qu'afficher un vide**.

### Entretien & pépinière « Des végétaux sélectionnés pour durer » (s03 bas)
Texte gauche + **photo jardinerie réelle (chrysanthèmes en pots, serre, panneau « Florales »)**. Photo **authentique mais de niveau « point de vente / retail »** : pots plastique, sol béton, cagettes — **écart de gamme net** vs les photos de piscines très léchées. Sur un site premium, elle détonne. **P1** (cohérence premium des visuels LTE — exactement le sujet fondateur #5 côté jardinerie).

### Trio cartes « Bureau d'études / Pépinière / Jardinerie & expertise » (s04 haut)
3 cartes **gris très clair sur fond crème**, texte gris → **contraste très faible, cartes presque invisibles**, libellés secondaires (« paysager intégré », « propre », « depuis 2015 ») peu lisibles. **P1** (lisibilité + manque de présence).

### Cross-link « Un jardin pensé avec la piscine » (s04 bas) : image piscine+jardin pleine hauteur gauche, texte droite. **OK.**

### CTA + Footer (s05) : identiques. **OK.**

### Note page Jardins & Paysage : **5/10**
**2 placeholders vides (P0)** + photo jardinerie en écart de gamme (P1) + trio de cartes fantômes (P1). C'est la page la plus en retrait. Paradoxalement la plus stratégique pour le cross-sell.

---

## 4. Notre approche `/notre-approche` — 6 sections (s05/s06 = doublon CTA+footer)

### En-tête « De la vision à la réalisation » (s01)
**Pas de hero pleine image** : titre serif noir sur crème à gauche, **photo (piscine + jardin) à droite**. Contraste **excellent** (texte noir/gris sur crème). Photo nette, premium. Bonne composition asymétrique. **OK** — c'est le modèle de hero le plus lisible du site.

### Process numéroté 1→5 (s01 bas / s02 / s03 haut)
Étapes « L'écoute / Le bureau d'études / La réalisation / La livraison / Le suivi annuel » : gros chiffres serif pétrole + filet vertical reliant les étapes + titres + texte. Contraste OK, rythme clair, **très lisible et premium**. Lignes ~70ch côté texte → confortable. **OK.**

### « Nous connaissons ces propriétés » + **« Visuel à venir »** (s03 bas / s04 haut)
Texte gauche (communes en italique : Le Vésinet, Saint-Nom-la-Bretèche…) + **boîte grise vide « Visuel à venir » / « Vue aérienne d'une commune… prise de vue drone »** à droite. **P0** (3e type de placeholder vide, ici sur une page de réassurance).

### CTA intermédiaire + FAQ (s04) : bouton outline « Parlez-nous… » + accordéon « Questions fréquentes » (filets fins, chevrons). Propre, lisible. **OK.**

### CTA final + Footer (s05/s06)
CTA spécifique : « Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble. » + bouton « Décrivez-nous votre projet → ». Sombre, contraste excellent. **OK.**

### Note page Notre approche : **7.5/10**
Page la mieux construite (process clair, lisibilité parfaite, pas de souci de contraste hero car pas de hero image). Seul accroc : le **placeholder vide (P0)**.

---

## 5. La maison `/la-maison` — 5 sections

### Hero (s01) — contraste
Photo : vue plongeante piscine + terrasse bois + fauteuils filaires colorés + pelouse. Nette. H1 « La maison » serif blanc sur **terrasse bois moyen + eau** → OK ; sous-titre « Plus de 30 ans d'expertise… le détail fait tout. » sur **terrasse bois clair ensoleillée** → **faible** (même symptôme). **P1.**

### « Notre histoire » + portrait Nicolas Berg (s01 bas / s02)
Texte centré (contraste OK) + **portrait N&B circulaire de Nicolas Berg, « Associé-Gérant, Aqua System »**. Photo propre, sobre, incarne la marque → **excellent point premium / confiance**. **OK.**

### Bloc « Aqua System » / « En partenariat avec Les Terres Essentielles » (s02 bas / s03 haut)
Deux colonnes texte. Contraste OK. **Photo LTE = la jardinerie (cagette « FÉROUX ORGEVAL » + lauriers-roses)**, légende « La jardinerie Les Terres Essentielles, route d'Orgeval. »
> **Constat fondateur #5** : photo **authentique mais de niveau retail** (cagette usée, porte bleue défraîchie en fond). Sur une page « La maison » premium, à côté du portrait soigné et des piscines léchées, **l'écart de gamme est visible**. Honnête (vraie jardinerie) mais pas flatteur. **P1.**

### Badges + coordonnées (s03) : pastilles sable « Certification Socotec / Réseau L'Esprit Piscine / Trophée Or FPP 2024 » + adresses. Lisibles. **OK.**

### Valeurs « Exigence / Confiance / Sur-mesure » (s03 bas / s04 haut) : 3 colonnes serif + texte. Contraste OK. **OK.**

### Image pleine largeur (s04) : superbe piscine + jardin clos (murs ocre, haies, banquette coussins). **Très premium.** **OK.**

### CTA + Footer (s05) : « Un projet ? Décrivez-nous ce que vous imaginez. » Sombre, OK.

### Note page La maison : **7/10**
Belle page incarnée (portrait, histoire, valeurs, grande image finale). Deux accrocs : contraste sous-titre hero (P1) + photo jardinerie en écart de gamme (P1).

---

## 6. Réalisations (index) `/realisations` — 5 sections + survol card

### En-tête + filtres (s01 haut)
« Réalisations » serif noir + sous-titre + **pills de filtre** (Tous / Piscine / Spa & Sauna / Jardin & Parc / Projet complet eau+jardin). Pill actif = pétrole plein, inactifs = outline crème. Contraste OK, lisibles, alignés. **OK.**

### Grille de cards (s01 bas / s02 / s03) — retour fondateur #4 (badges)
Grille 3 colonnes, ~13 cards. Images nettes et premium (piscines extérieures/intérieures, projets complets). Type en petites capitales pétrole + zone serif + « Voir → ».
> **Badge « En cours de documentation »** : présent **sur TOUTES les cards**, bas-gauche, **gris clair minuscule italique sans fond plein**. Sa lisibilité **dépend de l'image** :
> - sur images claires (piscines ensoleillées, pierre) → **quasi invisible / illisible** (s01, s02 hauts) ;
> - sur images sombres (piscine intérieure béton, s03 droite « Espace bien-être ») → lisible mais terne.
> **Incohérence + manque de qualité** = exactement le reproche fondateur. **P1.** À transformer en pastille à fond plein, OU à retirer des cards (l'info « draft » est déjà gérée proprement sur la fiche). Répété ~13 fois, l'effet « catalogue inachevé » s'accumule.

> **Survol** (`realisations-hover-card.jpg`) : au hover d'une card, **léger zoom/assombrissement de l'image** + soulignement nav. Effet correct, discret. **OK.**

### CTA + Footer (s04/s05) : standards. **OK.**

### Note page Réalisations : **6.5/10**
Belle galerie, filtres propres, images premium. **Le badge draft répété (P1)** est le seul vrai défaut — mais très visible car multiplié.

---

## 7. Fiche réalisation A (draft) `/realisations/piscine-debordement-foret` — 3 sections

> **Note** : toutes les fiches du site sont actuellement en **draft** (aucun contenu éditorial réel saisi — `intention/reponse/execution = null`). Il n'existe **pas de fiche « publiée »** sur le LIVE. A et B sont donc deux drafts ; le traitement « draft » est ce qui est jugé.

### En-tête fiche (s01)
« ← Retour aux réalisations » + **grande photo gauche (piscine à débordement en lisière de forêt — superbe, nette, premium)** + colonne droite : H1 serif, « PISCINE SUR MESURE » + zone + **encart sable « Fiche en cours de documentation »** (icône + texte : « Le récit complet… sera bientôt publié. Les photographies, elles, sont bien celles de ce chantier. ») + CTA « Parlez-nous de votre projet ».
> **Traitement draft EXCELLENT** : contrairement au badge sur les cards, ici l'état « en cours » est **assumé proprement, lisible, rassurant et premium**. Légende sous l'image (« photo publiée avec l'autorisation du propriétaire ») = bon réflexe confiance. **OK — modèle à répliquer sur les cards.**

### Cross-link « Votre piscine mérite un jardin » + Footer (s02/s03) : standard, image pleine hauteur. **OK.**

### Note fiche A : **8/10** — la page la mieux gérée du site malgré l'absence de contenu éditorial.

---

## 8. Fiche réalisation B (draft) `/realisations/piscine-interieure-pierre-poutres` — 3 sections

### En-tête fiche (s01)
Même gabarit. **Photo : couloir de nage intérieur sous charpente bois + murs pierre — magnifique, très premium.** H1 « Couloir de nage intérieur sous charpente bois — Yvelines », « ESPACE BIEN-ÊTRE », même encart « Fiche en cours de documentation ». Contraste, hiérarchie, légende = OK.
> Cross-link + footer identiques à la fiche A (composant partagé). **OK.**

### Note fiche B : **8/10** — même qualité que A. La photo intérieure est l'un des plus beaux visuels du site.

---

## 9. Architectes / Prescripteurs `/prescripteurs` — 6 sections

### Hero (s01)
**Texte-gauche + image-droite** (pas d'overlay). H1 serif noir « L'exécutant haut de gamme que vos clients méritent… » sur crème → **contraste parfait**. Photo droite (piscine + pierre + graminées) nette, premium. Pastilles certif + CTA « Présentons-nous ». **OK — l'un des meilleurs en-têtes du site.**

### 3 arguments (s01 bas / s02) : « Un exécutant qui lit les plans / Votre relation client reste la vôtre / 30 ans de réalisations 78/92 ». Texte propre, contraste OK. **OK.**

### « Ce qui nous qualifie » + callout (s02/s03) : liste qualifs (Socotec, Esprit Piscine, 30 ans, Bureau d'études LTE) + **encart sable « Dossier de qualification complet disponible sur demande » + bouton « Présentons-nous »**. Lisible, premium. **OK** (P2 : dans l'encart, le bouton pétrole force le libellé sur 2 lignes « Présentons-nous » — léger).

### FAQ « Ce que les architectes nous demandent » (s03/s04) : accordéon propre. **OK.**

### Mini-grille « Nos réalisations — références vérifiables » (s04/s05)
3 cards réalisations → **mêmes badges « En cours de documentation » illisibles** que la page Réalisations. **P1** (même cause, autre page).

### CTA « Travaillons ensemble » + Footer (s05/s06) : sombre, contraste OK, copy dédiée prescripteurs. **OK.**

### Note page Prescripteurs : **7.5/10**
Page B2B solide, en-tête lisible, argumentaire clair. Seul accroc : badges draft dans la mini-grille (P1).

---

## 10. Contact `/contact` — 3 sections

### Formulaire (s01/s02)
**Titre-gauche + formulaire-droite** (carte sable). Champs : Nom*, Email*, Téléphone, pills « Votre projet concerne », Commune*, Budget (select), Message*. Labels lisibles, astérisques requis visibles, inputs bien contrastés, **pills + select cohérents**. Mention RGPD + lien politique sous le champ. **Bouton submit pleine largeur pétrole**. Coordonnées (tél/email/adresse) en bas de la colonne gauche.
> **P2** : la colonne gauche est **très vide sous le titre** (grand blanc) alors que le formulaire à droite est long → léger déséquilibre vertical à 1440 (typique grandes largeurs). Les coordonnées remontées en haut-gauche combleraient le vide.
**Verdict : OK** (P2 vide colonne gauche).

### Footer (s02/s03) : standard. **OK.**

### Note page Contact : **7.5/10** — formulaire clair, complet, RGPD présent. Seul le vide colonne gauche (P2).

---

## 11. Contact / Merci `/contact/merci` — 2 sections

### Message de confirmation (s01)
« Votre message est bien parvenu. » serif noir + « Nicolas Berg reviendra vers vous sous 48 heures… » + numéro cliquable pour l'urgence + « ← Retour à l'accueil ». Contraste parfait, rassurant, **délai 48h cohérent** avec le reste du site. **OK.**

### Footer (s01 bas / s02) : standard. **OK.**

### Note page Merci : **8/10** — page de confirmation nette, humaine, sans faute.

---

## 12. Mentions légales `/mentions-legales` — 5 sections

Page texte sobre, **bien typographiée**, contraste OK, structure numérotée (Éditeur / Hébergeur / Propriété intellectuelle / Marques / Garanties / Données / Limitation…). Cloudflare correctement déclaré hébergeur.
> **P1 — placeholders légaux publics** : plusieurs « à confirmer » visibles en production : **RCS « à confirmer »**, **TVA intracommunautaire « à confirmer »** (s01), **Assureur décennale « à confirmer »**, **Numéro de police « à confirmer »**, **Numéro de certification Socotec « à confirmer »** (s03). Pour une cible premium + des prescripteurs qui vérifient, ces trous nuisent à la crédibilité. Cohérent avec le contexte (décennale en placeholder validé non bloquant), mais à compléter avant diffusion large.
**Verdict : OK structurellement, P1 contenu (placeholders à confirmer).**

### Note page Mentions légales : **7/10** (forme 9/10, fond pénalisé par les « à confirmer »).

---

## 13. Politique de confidentialité `/politique-confidentialite` — 4 sections

Même gabarit légal sobre. RGPD complet (responsable de traitement, finalités, base légale art. 6.1.f, durées 3/5 ans, mesure d'audience exemptée CNIL). Contraste OK, lisible, pas de placeholder visible. **OK.**

### Note page Politique : **8.5/10** — page légale propre et complète.

---

## 14. Page 404 `/<inexistante>` — 2 sections

« Cette page n'existe pas. » serif noir centré + sous-texte + « ← Retour à l'accueil » + 2 boutons « Voir les réalisations » / « Parlez-nous de votre projet ». Contraste parfait, ton de marque respecté, options de rattrapage. **Bonne 404.**
> **P2** : à 1440, les **2 boutons côte-à-côte wrappent leur libellé sur 2 lignes** (« Voir les / réalisations » et « Parlez-nous de votre / projet ») → hauteurs irrégulières, finition perfectible. Élargir les boutons ou réduire le libellé.

### Note page 404 : **7.5/10** — efficace, juste un wrap de boutons à lisser.

---

# Synthèse

## Tableau par page

| # | Page | Note /10 | P0 | P1 | P2 | Point fort | Point faible majeur |
|---|------|:---:|:--:|:--:|:--:|---|---|
| 1 | Accueil `/` | 7 | 0 | 3 | 2 | Hero + CTA + footer premium | Contraste sous-titre hero ; badges drafts ; photo LTE |
| 2 | Piscines & Bien-être | 6 | 1 | 1 | 1 | Photos piscines superbes | **« Visuel à venir » vide (P0)** |
| 3 | Jardins & Paysage | 5 | 2 | 2 | 1 | Texte clair, cross-link | **2 « Visuel à venir » vides (P0)** + photo jardinerie retail |
| 4 | Notre approche | 7.5 | 1 | 0 | 0 | Process 1→5 ultra-lisible | 1 « Visuel à venir » vide (P0) |
| 5 | La maison | 7 | 0 | 2 | 0 | Portrait N. Berg + grande image | Contraste hero ; photo jardinerie retail |
| 6 | Réalisations (index) | 6.5 | 0 | 1 | 0 | Galerie + filtres propres | Badge draft illisible × ~13 |
| 7 | Fiche A (draft) | 8 | 0 | 0 | 0 | Traitement draft exemplaire | — (manque contenu éditorial) |
| 8 | Fiche B (draft) | 8 | 0 | 0 | 0 | Photo intérieure magnifique | — (manque contenu éditorial) |
| 9 | Prescripteurs | 7.5 | 0 | 1 | 1 | En-tête lisible, argumentaire B2B | Badge draft mini-grille |
| 10 | Contact | 7.5 | 0 | 0 | 1 | Formulaire clair + RGPD | Vide colonne gauche (grandes largeurs) |
| 11 | Contact / Merci | 8 | 0 | 0 | 0 | Confirmation humaine, 48h | — |
| 12 | Mentions légales | 7 | 0 | 1 | 0 | Bien structuré | Placeholders « à confirmer » publics |
| 13 | Politique confidentialité | 8.5 | 0 | 0 | 0 | RGPD complet | — |
| 14 | 404 | 7.5 | 0 | 0 | 1 | Rattrapage + ton de marque | Boutons wrap 2 lignes |
| | **TOTAL** | **moy. 7.2** | **4** | **12** | **8** | | |

> **Décompte sévérités** (occurrences distinctes par page) : **P0 = 4** (tous des blocs « Visuel à venir » vides : 1 Piscines, 2 Jardins, 1 Notre approche) · **P1 = 12** · **P2 = 8**.
> Les 4 P0 relèvent d'**une seule cause** : le composant « Visuel à venir » placeholder rendu en production. Les corriger (masquer le bloc tant qu'il n'y a pas d'image) résout 100% des P0.

## Réponses ciblées aux 5 retours fondateur

1. **HERO — contraste texte blanc** : **CONFIRMÉ, le fondateur a raison.** Sur Accueil, Piscines, La maison, le **sous-titre fin (gris-blanc) passe sur des zones claires** (eau, pierre, pelouse ensoleillée) **sans aucun scrim/gradient d'assombrissement** → lisibilité faible (proche P0 sur le sous-titre accueil). Heros sans image (Notre approche, Prescripteurs : texte noir sur crème) = parfaits. **Reco : gradient sombre localisé sous le bloc texte de chaque hero-image.** P1.
2. **SURVOLS** : nav = soulignement (élégant) ; CTA = bouton qui s'éclaircit légèrement (subtil, OK) ; card réalisation = léger zoom/assombrissement (OK). **Aucun hover cassé.** États cohérents et sobres. OK.
3. **GRANDES LARGEURS (1440)** : longueurs de ligne **maîtrisées partout (~60-70ch, jamais > 75ch)**. Images **nettes à 1440 malgré sources 1280** (pas de pixellisation perceptible sur les heros lus). Grilles alignées. Seuls vides notables : **colonne gauche du Contact** et **espaces des blocs « Visuel à venir »**. Globalement **bon comportement desktop**.
4. **BADGES « En cours de documentation »** : **CONFIRMÉ illisibles/moches.** Gris clair minuscule italique **sans fond plein**, posé sur l'image → invisible sur images claires, terne sur images sombres, **incohérent** selon la photo. Présent sur ~13 cards (Réalisations) + 3 (Prescripteurs). **Paradoxe** : le même état « draft » est **très bien traité sur les fiches** (encart sable lisible). **Reco : répliquer le traitement « fiche » OU retirer le badge des cards.** P1.
5. **PHOTOS ACCUEIL / partenariat LTE** : 
   - Bloc **« Aqua System »** (accueil) : belle piscine + abords, **au niveau premium**. OK.
   - Bloc **« En partenariat avec Les Terres Essentielles »** (accueil) : photo **archi verre + toit végétalisé + piscine intérieure** — belle mais **raconte l'eau/l'architecture, pas la jardinerie/le végétal/la pierre** (cœur réel de LTE). Décalage promesse/preuve. P1.
   - Photos **jardinerie réelles** (cagette « Féroux Orgeval » sur /la-maison ; chrysanthèmes en pots sur /jardins-paysage) : **authentiques mais niveau retail/point-de-vente** (pots plastique, cagettes usées, sol béton) → **écart de gamme visible** à côté des piscines léchées. Honnêtes mais pas flatteuses. P1.

## Top 5 — perception premium (par ordre d'impact)

1. **[P0 × 4] Blocs « Visuel à venir » vides** (Piscines, Jardins ×2, Notre approche) — effet « maquette inachevée » sur des pages commerciales. **Le plus dommageable.** → masquer le placeholder tant qu'aucune image n'est fournie.
2. **[P1] Badges « En cours de documentation » illisibles** sur ~16 cards (Réalisations + Prescripteurs) — incohérents, peu qualitatifs. → reprendre le traitement propre des fiches, ou retirer.
3. **[P1] Contraste des sous-titres de hero** (Accueil, Piscines, La maison) — texte clair sur fond clair sans scrim. → gradient/scrim sombre sous le bloc texte.
4. **[P1] Photos LTE en écart de gamme** (jardinerie retail) + **photo « partenariat » hors-sujet végétal** sur l'accueil — affaiblit la promesse « double expertise eau + jardin ». → recadrer/retoucher les photos jardinerie OU choisir des cadrages « pierre naturelle Kei-Stone / massifs » plus qualitatifs ; côté accueil, une image qui dit « végétal ».
5. **[P1] Placeholders légaux « à confirmer »** (RCS, TVA, assureur décennale, n° police, n° certification Socotec) visibles publiquement sur les mentions — la cible premium et les prescripteurs vérifient. → compléter avant diffusion large.

## Constats transverses (positifs)

- **Système de design cohérent** sur les 14 pages : palette crème/pétrole/sable/anthracite, serif éditorial pour les titres, footer + CTA sombres récurrents = **identité forte et tenue**.
- **Lisibilité du corps de texte excellente** partout (gris foncé sur crème), longueurs de ligne maîtrisées.
- **Heros sans image (texte sur crème) parfaits** — modèle de contraste.
- **Traitement « draft » des fiches exemplaire** (encart sable explicite) — à généraliser aux cards.
- **Pages légales + RGPD + 404 + merci** propres et au niveau.

---

> **Méthodologie** : 14 pages × captures section par section (1440×900, ~800px/scroll), **toutes les images lues visuellement** (critères PRO/BEAU/BRAND/PROPRE/ALIGNÉ/AÉRÉ/CONVERSION/HIÉRARCHIE/ACCESSIBLE). Survols capturés souris positionnée (nav, CTA, card). Aucune correction appliquée (audit constat). Validation **[LIVE]** (browser réel sur le site déployé, sorties observées).
