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

<!-- SECTIONS SUIVANTES AJOUTÉES INCRÉMENTALEMENT -->
