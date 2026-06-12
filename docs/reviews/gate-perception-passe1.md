# Gate de perception — Aquasystem (13 pages) — Passe 1 + Passe 2 + Passe 3 — 2026-06-12

## Verdict global ACTUEL (Passe 3) : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 1 : **NON** (4 défauts D1-D4). Passe 2 : 4 corrigés, OUI avec 1 P1 favicon dark-mode.
> Passe 3 (2026-06-12, refonte IA) : page /la-maison fusionnée jugée en entier (mobile+desktop),
> placeholders « Visuel à venir » élégants et assumés, nav 5 entrées « Notre maison » non ambiguë,
> prescripteurs renvoyé au footer, favicon v3 (tuile pleine) **résout** le P1 dark-mode de la passe 2.
> Zéro P0, zéro P1 bloquant → **OUI**. Détail : section « PASSE 3 ».

## Verdict Passe 1 (historique) : PRÉSENTABLE AU FONDATEUR — **NON**

Passe 1 terminée : **13 pages jugées** en viewport réel mobile 390×844 + desktop 1440×900, fold + sections.

Un défaut de perception MAJEUR (cas canonique #5) est présent et **massivement répété** : le libellé
« **Fiche en cours de documentation** » apparaît sous **chaque** carte de réalisation — ~3 sur la home,
~17 sur la page Réalisations, + un encart explicite sur chaque fiche détail. La page qui doit prouver
30 ans de savoir-faire affiche « pas documenté » partout. Un client premium pressé lit « site pas fini /
agence qui n'a rien à montrer ». Verdict binaire → NON tant que ce libellé est visible.

Un **second inachevé** plus discret a été attrapé en finissant la passe : une note interne « À faire
valider par un avocat avant publication définitive » est rendue en prod en bas de la Politique de
confidentialité (D4, P1).

**Le reste du site (8 pages sur 13) est au niveau** : heros lisibles sur fond réel (cas #1 OK partout),
drawer propre, photos de demeures/piscines au standard maison premium (cas #4 OK), footer maîtrisé
desktop ET mobile (cas #6 OK), pas de tic typographique perçu (cas #2 OK), split marque/raison sociale
cohérent. Aucun autre défaut de perception. Le NON tient à 2 inachevés textuels, tous deux corrigeables
sans retoucher le design : supprimer le libellé « Fiche en cours de documentation » (carte + encart
détail) et la note « à faire valider par un avocat ».

**Périmètre non couvert par cette passe** : favicon/onglet à 16px (aucune capture d'onglet dans
gate-shots/) → à vérifier en passe 2 (cas canonique #3 non tranché).

Captures : `docs/reviews/gate-shots/` — viewport réel mobile 390×844 + desktop 1440×900, fold + sections.

---

## Défauts — synthèse

| # | Page(s) | Device | Défaut perçu | Sévérité | Capture |
|---|---|---|---|---|---|
| D1 | Home (section Réalisations) | desktop+mobile | « Fiche en cours de documentation » sous les 3 cartes | **P0** | `home-desktop-sec3.png`, `home-desktop-sec4.png` |
| D2 | Réalisations (grille) | desktop+mobile | « Fiche en cours de documentation » sous les ~17 cartes | **P0** | `realisations-desktop-fold/sec1/sec2.png` |
| D3 | Réalisation détail | desktop+mobile | Encart « Fiche en cours de documentation — sera bientôt publié » au centre, avant le CTA | **P0** (requalifié) | `realisation-detail-desktop-fold.png`, `realisation-detail-mobile-fold.png` |
| D4 | Politique de confidentialité | desktop+mobile | Note interne rendue en prod : « À faire valider par un avocat avant publication définitive » | **P1** | `confidentialite-mobile-sec4.png`, `confidentialite-desktop-sec2.png` |

**Pages OUI (8/13, hors libellé d'inachevé) : Piscines, Jardins, Notre approche, La maison, Architectes,
Contact, Merci, Mentions.** Pages NON : Home, Réalisations, Réalisation détail (D1/D2/D3 P0).
Politique de confidentialité : OUI avec réserve P1 (D4).

---

## PASSE 2 — Re-vérification ciblée après corrections D1-D4 — 2026-06-12

### Verdict Passe 2 : PRÉSENTABLE AU FONDATEUR — **OUI**

Les 4 défauts D1-D4 de la passe 1 sont corrigés et vérifiés **au rendu visuel** (pas seulement au HTML).
Aucune régression sur l'accueil. Cas canonique #3 (favicon 16px) tranché : lisible, **pas un NON**.
Reste un seul point cosmétique **P1 non bloquant** (favicon PNG peu contrasté en dark-mode d'onglet,
voir #3). Verdict binaire du gate (zéro P0, P1 cosmétique assumé) → **OUI**.

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3300`). Contrôle HTML préalable :
zéro occurrence de « en cours de documentation » / « sera bientôt publié » sur la home, la grille
/realisations et les 3 fiches testées ; zéro « valider par un avocat » sur /politique-confidentialite.
Le jugement ci-dessous porte sur le **rendu visuel** (captures viewport réel, contrainte clip ≤ 900px).

Captures passe 2 : `tests/screenshots/perception/p2-*.png`.

#### D1/D2 — /realisations (cartes) → **CORRIGÉ**
Grille desktop + mobile : chaque carte n'affiche plus que **type + zone + « Voir → »** (ex. « PROJET
COMPLET EAU + JARDIN / Yvelines (78) »). **Zéro occurrence** de « Fiche en cours de documentation ».
Photos au standard maison premium, grille équilibrée, fold + filtres propres. Idem section home (HTML
vérifié : 0 libellé). `p2-realisations-desktop-fold/grid.png`, `p2-realisations-mobile-grid.png`.

#### D3 — Fiche draft (galerie sobre) → **CORRIGÉ — digne, pas « page cassée »**
Fiche `piscine-debordement-foret` (tous champs éditoriaux `null`). Desktop : split 60/40, grande photo
premium + caption « Photo publiée avec l'autorisation du propriétaire », à droite titre serif + type +
zone + accroche « Ce projet vous inspire ? Parlons du vôtre. » + CTA. Mobile : photo, titre, type, zone,
CTA pleine largeur. **Aucun encart d'inachevé, aucun blanc cassé** ; le cross-sell « Votre piscine mérite
un jardin à sa mesure » enchaîne proprement. Perçu comme « belle réalisation présentée simplement », pas
comme une fiche vide. `p2-fiche-draft-desktop-fold.png`, `p2-fiche-draft-mobile-fold/info.png`.

#### D4 — /politique-confidentialite → **CORRIGÉ**
Tout-bas de page (mobile + desktop) : la mention finale est désormais « Cette politique a été rédigée en
conformité avec le RGPD et la loi Informatique et Libertés. » La phrase **« À faire valider par un avocat
avant publication définitive » a été retirée**. Section 8. Contact complète. Présentable.
`p2-confid-mobile-toutbas.png`, `p2-confid-desktop-toutbas.png`.

#### Cas canonique #3 — Favicon à 16px réels → **TRANCHÉ : lisible (pas un NON)**
Page de test 1:1 (PNG 16/32 + SVG, fonds clair ET sombre, capture 320px) + composites x10 au plus proche
voisin pour juger le contraste réel. **Sur fond clair** (cas dominant : barre d'onglet claire de
Chrome/Edge/Firefox, onglet actif blanc) : le « A » sérigraphié est **net et reconnaissable au premier
coup d'œil**, formes franches, aucune bouillie → cas #3 (logo détaillé illisible réduit) **ne déclenche
pas**. La ligne d'onglet simulée affiche « A + Aquasystem — Pisciniste & p… » lisible.
**Réserve P1 (non bloquante)** : le favicon PNG/ICO est figé en couleur sombre (#1A1510) et **quasi
invisible sur une barre d'onglet en dark-mode** (le SVG, lui, bascule en clair via `prefers-color-scheme`,
mais les navigateurs privilégient l'ICO/PNG pour l'onglet). Recommandation @fullstack : générer un PNG
dark-mode (ou un « A » avec léger contour/halo) pour couvrir le thème sombre. Impact perception : faible
(barre claire majoritaire) → P1 cosmétique, pas P0. `p2-favicon-1to1.png`,
`p2-favicon16-on-light-x10.png`, `p2-favicon16-on-dark-x10.png`.

#### Régression accueil → **AUCUNE**
Fold mobile : titre serif blanc « L'extérieur à la hauteur de votre propriété. » lisible sur la façade
(overlay/text-shadow tient — cas #1 reste corrigé), sous-titre + CTA nets. Fold desktop : demeure +
piscine miroir, titre lisible sur zone sombre, premium. Identique à passe 1, aucune dégradation introduite
par les corrections D1-D4. `p2-home-mobile-fold.png`, `p2-home-desktop-fold.png`.

#### Synthèse Passe 2
| Défaut P1 | Page(s) | Statut | Sévérité |
|---|---|---|---|
| D1/D2 « Fiche en cours de documentation » (cartes) | Home + Réalisations | ✅ corrigé | — |
| D3 encart d'inachevé fiche détail | Fiche draft | ✅ corrigé (galerie sobre digne) | — |
| D4 note « valider par un avocat » | Politique de confidentialité | ✅ corrigé | — |
| Favicon PNG peu contrasté en dark-mode d'onglet | Toutes (onglet) | ⚠ ouvert | **P1 cosmétique** non bloquant |

Zéro P0 restant. Un seul P1 cosmétique (favicon dark-mode) → verdict binaire du gate : **OUI**.

---

## PASSE 3 — Re-jugement de la refonte IA — 2026-06-12

### Verdict Passe 3 : PRÉSENTABLE AU FONDATEUR — **OUI**

Build rebâti (`npm run build`, exit 0) puis servi (`npx serve out -l 3400`). Redirect vérifié :
`/notre-approche` → `/la-maison` en 301 (présent dans `out/_redirects`), page `/notre-approche`
absente de `out/`. Captures en viewport réel mobile 390×844 + desktop 1440×900, clips ≤ 880px.
Captures : `tests/screenshots/perception/p3-*.png` (43 fichiers).

Quatre changements jugés, **aucun défaut de perception** sur le rendu réel. Détail ci-dessous.

#### (1) Page /la-maison fusionnée — jugée EN ENTIER → **OUI, rythme maîtrisé, pas indigeste**
Mobile (scrollHeight ~8600px) et desktop (~6500px) lus section par section. Enchaînement :
**hero split** (texte « La maison » gauche / photo spa premium droite) → **Notre histoire** (Aqua
System née à Freneuse, équipe de 8, partenariat LTE + portrait Nicolas Berg, Associé-Gérant) →
**méthode 5 étapes** (1. L'écoute, 2. Le bureau d'études, 3. La réalisation, 4. La livraison,
5. Le suivi annuel — timeline numérotée serif, sobre) → **deux maisons** (« Aqua System » eau +
« Les Terres Essentielles » végétal, photo pépinière réelle) → **ancrage territoire** (Le Vésinet,
Saint-Nom-la-Bretèche…, nappes phréatiques, PLU) → **valeurs** (Sur-mesure, confiance, photo
piscine premium) → **FAQ** (accordéon 4 questions) → **CTA dark**. Malgré la longueur, **jamais
indigeste** : alternance de fonds clairs/sombres, transitions serif en italique entre blocs, jamais
deux pavés de texte identiques d'affilée. Heros et corps lisibles sur fond réel (cas #1 OK).
`p3-lamaison-mobile-y0…8000.png`, `p3-lamaison-desktop-y0…4400.png`.

#### (2) Placeholders « Visuel à venir » restaurés → **ÉLÉGANTS et assumés (pas « inachevé »)**
Doctrine cohérente sur les 3 emplacements (bloc LTE/Jardins accueil, spa /piscines, pépinière
/jardins) : **cadre beige sobre + icône image discrète + libellé « VISUEL À VENIR » + caption
descriptive précise** (ex. « Spa extérieur HotSpring intégré à une terrasse, en soirée — propriété
78/92 » ; « Allée de la pépinière Les Terres Essentielles, végétaux en conteneurs alignés »), en
split avec un bloc éditorial soigné. **Ne déclenche PAS le cas canonique #5** : ce n'est pas une
étiquette technique d'inachevé ni une maquette cassée, mais un emplacement assumé qui annonce le
visuel à venir. Perçu comme une intention éditoriale, pas comme un manque. `p3-piscines-desktop-y1050.png`,
`p3-jardins-desktop-y1500.png`, `p3-home-mobile-y1700.png`.

#### (3) Nouvelles photos (blocs accueil pierre-poutres + hero la-maison) → **au standard premium**
Hero accueil (demeure + piscine miroir) et hero /la-maison (spa pierre-poutres, baie vitrée sur
jardin) au standard maison premium (cas #4 OK). Bloc Piscines accueil = vraie photo de spa intérieur
pierre/bois, lumineuse. Aucun visuel hors-niveau ni casting complaisant. `p3-home-desktop-y0.png`,
`p3-lamaison-desktop-y0.png`.

#### Nav 5 entrées + drawer — « Notre maison » → **NON AMBIGU**, prescripteurs absent
Nav desktop : « Réalisations · Piscines & Bien-être · Jardins & Paysage · **Notre maison** » + CTA.
Drawer mobile : mêmes 4 entrées + sous-titre « De la vision à la réalisation » sous « Notre maison ».
Lu **après** Piscines et Jardins, « Notre maison » n'est plus perçu comme une catégorie de service :
le sous-titre descriptif et la position finale lèvent toute ambiguïté → c'est clairement la page
« à propos / maison ». **Prescripteurs absent de la nav** (correctement renvoyé au footer).
`p3-home-desktop-y0.png`, `p3-drawer-mobile.png`.

#### Footer — lien prescripteurs → **à sa place, discret**
Footer dark structuré (Aquasystem + certifs + réseaux / Aqua System adresse / Les Terres Essentielles
adresse) puis ligne légale « **Espace prescripteurs & architectes** · Mentions légales · Politique de
confidentialité ». Lien prescripteurs dans la ligne utilitaire, ni mis en avant ni perdu. Proportions
footer maîtrisées mobile ET desktop (cas #6 OK). `p3-foot-desktop.png`, `p3-foot-mobile.png`.

#### (4) Favicon v3 (tuile eau + A sand + filet or) → **RÉSOUT le P1 dark-mode de la passe 2**
Re-jugé en rendu 1:1, PNG 16/32 sur fonds clair, gris (onglet inactif), sombre et sombre2 + lignes
d'onglet simulées clair/sombre. La tuile est désormais **pleine bleu-eau** avec « A » serif blanc et
filet or. À 16px réel : **net et reconnaissable au premier coup d'œil sur fond clair ET sombre** — la
tuile pleine se détache du noir, le A blanc reste lisible. Le **P1 de la passe 2** (favicon sombre
quasi invisible en dark-mode d'onglet) est **résolu** par ce fond plein. Aucune bouillie. Détail
mineur non bloquant : le filet or est peu perceptible à 16px (l'œil voit tuile bleue + A blanc) —
raffinement de marque sans incidence sur la lisibilité, **pas même un P1**. `p3-favicon-1to1.png`.

#### Synthèse Passe 3
| Élément jugé | Statut | Sévérité |
|---|---|---|
| /la-maison fusionnée (rythme, lisibilité, pas indigeste) | ✅ OUI | — |
| Placeholders « Visuel à venir » (LTE home, spa, pépinière) | ✅ élégants/assumés | — |
| Nouvelles photos (heros, blocs accueil) | ✅ standard premium | — |
| Nav « Notre maison » non ambiguë + prescripteurs au footer | ✅ OUI | — |
| Favicon v3 tuile pleine (P1 passe 2 dark-mode) | ✅ **résolu** | — |

**Zéro P0, zéro P1 bloquant.** Tous les changements de la refonte IA améliorent ou maintiennent la
perception. Le seul P1 ouvert de la passe 2 (favicon dark-mode) est corrigé. Verdict binaire : **OUI**.

#### Recommandation Passe 3 : **OUI — présentable au fondateur en l'état.**
Refonte IA validée au rendu réel. Aucun agent à relancer. (Optionnel, hors gate : @design peut
épaissir légèrement le filet or du favicon pour le rendre perceptible à 16px — pur raffinement.)

---

## Détail par page (Passe 1)

### Home — OUI (hors D1/D2)
Hero mobile + desktop OK (text-shadow/overlay corrigé, titre lisible sur façade claire — cas #1 corrigé).
Sections services au niveau, bloc chiffres lisible, CTA dark élégant, drawer mobile propre. D1 (P0) :
libellé d'inachevé sur les cartes réalisations.

### Réalisations — NON (D2 P0)
Fold + filtres premium. Grille ~17 cartes, photos au standard maison premium (cas #4 sain). D2 (P0) :
« Fiche en cours de documentation » sous CHAQUE carte → NON.

### Réalisation détail — NON (D3 P0, requalifié de P1)
Grande photo au niveau, mention autorisation propriétaire rassurante. D3 (P0) : encart boxé « Fiche en
cours de documentation — sera bientôt publié » avant le CTA, sur la page la plus engageante.

### Piscines, Jardins, Notre approche, La maison, Architectes, Contact, Merci, Mentions — OUI
Heros lisibles sur fond réel, sections éditoriales soignées, footers maîtrisés desktop ET mobile (cas #6
OK), split marque « Aquasystem » / raison sociale « Aqua System » cohérent. Aucun inachevé.

### Politique de confidentialité — OUI (avec D4 P1)
Politique RGPD complète et lisible. D4 (P1) : note interne « À faire valider par un avocat avant
publication définitive » rendue en prod avant le footer.

---

## Croisement specs (parti pris assumé vs vrai défaut)
- Libellé « Fiche en cours de documentation » (D1/D2/D3) : placeholder de contenu non documenté → défaut P0.
- Note « à faire valider par un avocat » (D4) : commentaire @legal laissé en prod → défaut P1.
- Split « Aquasystem » / « Aqua System » : cohérent et systématique → parti pris assumé, pas un défaut.

## Recommandation Passe 1 : **NON** (re-soumettre après correction)
1. Supprimer le libellé « Fiche en cours de documentation » (cartes + encart fiche détail).
2. Retirer la note « À faire valider par un avocat » de la Politique de confidentialité.
3. Passe 2 : capturer l'onglet/favicon à 16px (cas #3 non tranché) + re-vérifier les 3 pages corrigées.
