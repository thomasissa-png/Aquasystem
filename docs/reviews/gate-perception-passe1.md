# Gate de perception — Aquasystem (13 pages) — Passe 1 + Passe 2 — 2026-06-12

## Verdict global ACTUEL (Passe 2) : PRÉSENTABLE AU FONDATEUR — **OUI**
> Passe 1 (historique) : **NON** (4 défauts D1-D4). Passe 2 (2026-06-12) : les 4 corrigés et vérifiés au
> rendu, aucune régression accueil, favicon 16px tranché lisible → **OUI**. Détail : section « PASSE 2 ».

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
