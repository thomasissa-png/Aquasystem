# Gate de perception — Aquasystem (13 pages) — Passe 1 COMPLÈTE — 2026-06-12

## Verdict global : PRÉSENTABLE AU FONDATEUR — **NON**

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

## Détail par page

### Home — OUI (hors D1/D2)
- **Hero mobile + desktop** : OK. Le retravail text-shadow/overlay fonctionne — le titre blanc « L'extérieur
  à la hauteur de votre propriété » reste lisible sur la façade claire (cas canonique #1 = corrigé).
  Desktop : demeure + piscine miroir, premium. `home-mobile-fold.png`, `home-desktop-fold.png`.
- **Sections services** (Piscines / Jardins & Paysage) : visuels au niveau, deux colonnes équilibrées,
  partenariat Les Terres Essentielles affiché proprement. `home-desktop-sec1.png`.
- **Bloc chiffres** (30+ / 350+ / Socotec / L'Esprit Piscine) : cartes beige lisibles, hiérarchie crédible.
- **Bloc CTA dark** « Un projet d'extérieur mérite une conversation, pas un formulaire » : élégant, bon contraste.
- **Drawer mobile** : `home-mobile-drawer.png` — propre, typo serif lisible, sous-libellés, CTA pleine largeur. RAS.
- **D1 (P0)** : libellé d'inachevé sur les cartes réalisations (voir synthèse).

### Réalisations — NON (D2 P0)
- **Fold desktop + mobile** : titre « Réalisations » + « 30 ans de chantiers dans les propriétés de
  l'ouest parisien », filtres (Tous / Piscine / Spa & Sauna / Jardin & Parc / Projet complet eau+jardin)
  en pills. Hiérarchie propre, premium. `realisations-desktop-fold.png`, `realisations-mobile-fold.png`.
- **Grille (sec1/sec2/sec3)** : ~17 cartes, photos de piscines/demeures au standard maison premium
  (casting, lumière, cadrage OK — cas canonique #4 = sain). Catégorie + localisation (Yvelines 78 /
  Hauts-de-Seine 92) crédibles.
- **D2 (P0)** : « Fiche en cours de documentation » sous **CHAQUE** carte (~17). Cas canonique #5,
  répété en masse. La page-preuve du savoir-faire affiche « rien à documenter » partout → NON.
- **Bloc CTA dark** « Un projet d'extérieur mérite une conversation » en pied : élégant, bon contraste.

### Réalisation détail — NON (D3 P0, requalifié de P1)
- **Fold desktop + mobile** : grande photo (piscine à débordement en lisière de forêt, Yvelines) au
  niveau, titre serif élégant, mention « Photo publiée avec l'autorisation du propriétaire » (rassurant).
- **D3 (requalifié P0)** : encart boxé **« Fiche en cours de documentation »** + « Le récit complet de
  cette réalisation… sera bientôt publié. Les photographies, elles, sont bien celles de ce chantier. » —
  placé AVANT le CTA, au centre de la fiche, sur mobile ET desktop. C'est un aveu d'inachevé explicite
  sur la page la plus engageante (celle qu'on ouvre pour être convaincu). Cas #5 → **P0**, pas P1.
  `realisation-detail-desktop-fold.png`, `realisation-detail-mobile-fold.png`.
- **Cross-sell** « Votre piscine mérite un jardin à sa mesure » (partenariat Les Terres Essentielles) :
  bien amené, photo au niveau. `realisation-detail-desktop-sec1.png`.

### Piscines & Bien-être — OUI
- **Hero desktop + mobile** : photo piscine + terrasse premium, titre serif blanc « Piscines & Bien-être »
  lisible sur la zone sombre du bassin, sous-titre gris lisible. Cas #1 OK. `piscines-desktop-fold.png`.
- **Sections éditoriales** (De la feuille blanche à l'inauguration / L'eau chaude dans votre propriété /
  Suivi annuel) : mise en page magazine, photos au niveau, partenaire HotSpring cité proprement.
- **Bloc crédentiels** (30+ / 350+ / Socotec / L'Esprit Piscine) : cartes beige lisibles, crédibles.
- **Footer** : compact, dark, structuré (Aquasystem / Aqua System contact / Les Terres Essentielles),
  proportions maîtrisées desktop ET mobile (cas #6 OK — pas de footer 2 écrans). `piscines-mobile-sec5.png`.
- **Note marque** : header « Aquasystem » (marque) vs « Aqua System » + `aqua-system.fr` (raison sociale) :
  split cohérent et constant partout, **pas un défaut** (parti pris assumé).

### Jardins & Paysage — OUI
- **Hero desktop + mobile** : demeure brique + jardin + piscine, titre serif blanc « Jardins & Paysage »
  lisible sur zone sombre, sous-titre (partenariat Les Terres Essentielles) lisible. `jardins-desktop-fold.png`.
- **Sections** (Un projet pensé avant d'être planté / La réalisation, du premier arbre à la dernière pierre /
  pépinière) : éditorial soigné, photo pépinière au niveau, tuiles crédentiels (Bureau d'études / Pépinière /
  Jardinerie & expertise depuis 2015). Aucun inachevé.
- **Footer / CTA dark** : cohérent avec les autres pages. `jardins-desktop-sec3.png`. RAS.

### Notre approche — OUI
- **Fold desktop + mobile** : titre serif « De la vision à la réalisation », sous-titre lisible (texte
  foncé sur fond clair), photo piscine premium. `notre-approche-desktop-fold.png`.
- **Process numéroté** (1. L'écoute / …) : hiérarchie claire, lisible.
- **Bloc territoire** « Nous connaissons ces propriétés, et leurs contraintes » + communes citées
  (Le Vésinet, Saint-Nom-la-Bretèche…) : crédibilise l'ancrage local. `notre-approche-desktop-sec2.png`.
- **FAQ accordéon** (certifications, première prise de contact) : propre, lisible. Aucun inachevé. RAS.

### La maison — OUI
- **Hero desktop + mobile** : photo aérienne piscine/terrasse premium, titre « La maison » blanc lisible
  sur zone sombre, sous-titre lisible. `la-maison-desktop-fold.png`.
- **Notre histoire** (texte foncé sur fond clair) + valeurs (Exigence / Confiance / Sur-mesure) : lisible,
  ton premium assumé. `la-maison-desktop-sec2.png`.
- **Photo jardinerie Les Terres Essentielles** (enseigne « La Ferroux Orgeval ») : branding partenaire
  légitime, pas un défaut.
- **CTA dark final + photo piscine** au niveau. Aucun inachevé. RAS.

### Architectes / Prescripteurs — OUI
- **Fold desktop + mobile** : titre « L'exécutant haut de gamme que vos clients méritent… », ton B2B
  juste, photo piscine premium, badges crédentiels + CTA « Présentons-nous ». Lisible. `prescripteurs-desktop-fold.png`.
- **Encart** « Dossier de qualification complet disponible sur demande » : positif, **pas** un libellé
  d'inachevé (à ne pas confondre avec cas #5). `prescripteurs-desktop-sec2.png`.
- **FAQ B2B** (DCE, certifications, gestion relation propriétaire) + CTA dark « Travaillons ensemble » :
  propre. Aucun inachevé. RAS.

### Contact — OUI
- **Fold desktop + mobile** : titre « Parlez-nous de votre projet », sous-titre rassurant (« Nicolas Berg
  reviendra vers vous sous 48 heures »). Formulaire structuré : labels + astérisques requis, pills type de
  projet, select budget. Lisible, premium. `contact-desktop-fold.png`, `contact-mobile-fold.png`.
- **État focus** : anneau de focus net sur le champ (a11y OK). `contact-desktop-focus.png`.
- **Mention RGPD** + coordonnées (01 30 42 26 00 / contact@aqua-system.fr / 45 Route Nationale Freneuse) :
  complet, lisible. Aucun inachevé. RAS.

### Merci (confirmation) — OUI
- **Fold desktop + mobile** : « Votre message est bien parvenu », message rassurant 48h, lien téléphone
  pour urgence, « Retour à l'accueil ». Lisible, ton premium. `merci-desktop-fold.png`, `merci-mobile-fold.png`.
- **Footer** complet (SARL Aqua System, SIREN 903 785 327, partenariat Les Terres Essentielles) :
  proportions maîtrisées, pas de footer 2 écrans (cas #6 OK). Aucun inachevé. RAS.

### Mentions légales — OUI
- **Fold desktop + mobile** : titre serif « Mentions légales », contenu complet et lisible (SARL Aqua
  System, capital 20 000 €, SIREN 903 785 327, NAF 4399D, hébergeur Cloudflare). `mentions-desktop-fold.png`.
- **Sections 6/7/8** (données/cookies, limitation de responsabilité, droit applicable) : propres, lien
  interne vers politique de confidentialité. RAS.
- **Note** : sur le fold desktop downscalé, l'email apparaît « aqua-systemfr » (point fin avalé par le
  rééchantillonnage 2880→1440) ; le mobile pleine taille affiche bien « aqua-system.fr ». Artefact de
  capture, **pas un défaut**.

### Politique de confidentialité — OUI (avec D4 P1)
- **Fold + sections desktop + mobile** : politique RGPD complète et bien structurée (qui sommes-nous,
  données collectées, durée de conservation, droits, CNIL, cookies, sécurité HTTPS/Cloudflare ISO 27001).
  Lisible, premium. `confidentialite-mobile-fold.png`.
- **D4 (P1 — NOUVEAU défaut, cas #5)** : note interne **rendue en prod** juste avant le footer :
  « Cette politique a été rédigée en conformité avec le RGPD et la loi Informatique et Libertés. **À faire
  valider par un avocat avant publication définitive.** » Aveu d'inachevé visible par le client. Page
  secondaire (faible trafic) → P1, mais **à supprimer** avant mise au fondateur. `confidentialite-mobile-sec4.png`,
  `confidentialite-desktop-sec2.png`.

---

## Croisement specs (parti pris assumé vs vrai défaut)
- **Libellé « Fiche en cours de documentation » (D1/D2/D3)** : non couvert par les compositions/copy comme
  un état assumé — c'est un placeholder de contenu, pas un parti pris éditorial. Reste un défaut P0.
- **Note « à faire valider par un avocat » (D4)** : commentaire de rédaction @legal laissé dans le rendu
  public. Aucun spec ne demande de l'afficher. Défaut P1.
- **Split « Aquasystem » (marque) / « Aqua System » (raison sociale)** : cohérent et systématique → parti
  pris assumé, **pas** un défaut de cohérence de marque (cas canonique de nom incohérent NON déclenché).

## Recommandation : **NON** (re-soumettre après correction)
Corrections requises avant passage au fondateur (toutes textuelles, zéro retouche design) :
1. **@copywriter / @fullstack** : supprimer le libellé « Fiche en cours de documentation » des cartes
   réalisation (home + page Réalisations) et l'encart de la fiche détail. Remplacer par rien, ou par une
   métadonnée valorisante (lieu + type, déjà présents).
2. **@fullstack / @legal** : retirer la note « À faire valider par un avocat avant publication définitive »
   du rendu de la Politique de confidentialité.
3. **Passe 2** : capturer l'onglet/favicon à 16px (cas #3 non tranché) + re-vérifier les 3 pages corrigées.
