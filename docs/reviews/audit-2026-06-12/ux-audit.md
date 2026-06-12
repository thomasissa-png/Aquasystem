# Audit UX — Site Aquasystem en ligne
## Date : 2026-06-12 | Auditeur : @ux | Site : https://aquasystem.pages.dev

> Source de vérité : 40 screenshots baselines (3 devices) + code src/app + src/components + docs/ux/user-flows.md + docs/ux/wireframes.md + docs/analytics/kpi-framework.md.
> Référentiel personas : Alexandre (propriétaire patrimonial, ticket ≥ 70 k€) + Camille (architecte prescriptrice).
> NSM : 10 leads qualifiés/mois à M+6. Chaque friction documentée est évaluée à l'aune de ce NSM.

---

## Tableau des scores

| # | Dimension | Score /10 | Verdict |
|---|-----------|-----------|---------|
| 1 | Parcours de conviction Alexandre (entrée → réalisations → preuves → contact) | 8,0 | Solide — 2 frictions résiduelles |
| 2 | Parcours Camille (/prescripteurs) | 8,5 | Très bon — 1 lacune de preuve |
| 3 | Formulaire (friction, réassurance, mobile) | 9,0 | Quasi-parfait — 1 point de friction mobile |
| 4 | Navigation & orientation | 8,5 | Robuste — 1 ambiguïté tablette |
| 5 | Mobile (thumb zones, lisibilité, parcours RDV plein écran) | 8,0 | Bon — 2 points d'attention |
| 6 | Hiérarchie de l'information par page | 8,5 | Excellente — 1 page sous-hiérarchisée |
| 7 | Gestion des contenus imparfaits (placeholders, fiches draft) | 7,5 | Honnête — 1 risque de décrédibilisation |
| **GLOBAL** | | **8,3 / 10** | **Site premium opérationnel — 2 P0, 6 P1, 4 P2** |

---

## Dimension 1 — Parcours de conviction Alexandre (8,0/10)

### Ce qui fonctionne

**Hero accueil (accueil-desktop.png)** : la photo pleine largeur d'un bassin dans un parc est immédiatement lisible comme "leur niveau de qualité". La tagline "L'extérieur à la hauteur de votre propriété" est alignée sur le JTBD d'Alexandre. Le CTA dans la nav est visible sans scroll. Conviction-first respecté : pas de CTA au-dessus du fold.

**Enchaînement accueil → réalisations** : la section "Quelques propriétés que nous avons transformées" sur l'accueil (accueil-desktop.png, partie basse) sert d'avant-goût et oriente naturellement vers /realisations. 3 photos de niveau avec zones identifiées (Yvelines 78) — le signal géographique est présent dès la home.

**Portfolio filtrable (realisations-desktop.png)** : grille 3 colonnes propre, filtres clairs (Tous / Piscine / Spa & Sauna / Jardin & Parc / Projet complet eau+jardin), filtre actif visuellement distinct. La densité d'images de qualité (12 visible dans la grille) génère une impression de richesse de portfolio. L'aha moment "ils ont déjà fait ça près de chez moi" est atteignable.

**Page /notre-approche (notre-approche-desktop.png)** : les 5 étapes numérotées (Écoute, Bureau d'études, Réalisation, Livraison, Suivi annuel) répondent directement à l'objection principale d'Alexandre ("je ne veux pas coordonner plusieurs artisans"). La section "Nous connaissons ces propriétés et leurs contraintes" avec les communes (Le Vésinet, Saint-Nom-la-Bretèche…) est l'ancrage local le plus fort du site. La FAQ intégrée adresse 4 objections clés.

### Frictions identifiées

**[FRICTION A1 — P1]** Page d'accueil, section "Quelques propriétés que nous avons transformées" (accueil-desktop.png, bloc central) : les cartes réalisation en aperçu sur l'accueil n'affichent que le titre et la zone, sans le label de type (Piscine sur mesure / Projet complet). Alexandre en 10 secondes de scan ne distingue pas immédiatement quelles réalisations sont des projets eau+jardin intégrés vs piscine seule. La double expertise — différenciateur n°1 — n'est pas signalée dans cet aperçu.
- Correction : ajouter le `cardType` (ex. "Projet complet eau + jardin") sous la zone sur les 3 cartes de la home, identique à ce qui s'affiche sur /realisations.

**[FRICTION A2 — P1]** Fiches réalisation (realisation-fiche-desktop.png) : la notice "Fiche en cours de documentation" est visuellement sobre et non alarmante — c'est une bonne gestion du manque. MAIS le bloc de droite (sidebar) ne contient que cette notice + le CTA. Alexandre scanne la sidebar pour des données factuelles (superficie, budget de référence, délai) : la sidebar vide est une perte de signal de conviction précisément là où il cherche de la preuve tangible. Le CTA "Parlez-nous de votre projet" est visible et bien positionné, ce qui atténue la friction.
- Correction : voir dimension 7 pour le plan complet sur les fiches draft.

**[FRICTION A3 — P2]** Flow depuis /piscines-bien-etre (piscines-bien-etre-desktop.png) : le composant cross-selling vers /jardins-paysage est présent et bien wording ("Votre piscine mérite un jardin à sa mesure"). MAIS visuellement sur le screenshot desktop, le bloc apparaît après les proof badges mais avant le CTA final de page — il y a deux blocs de "Votre projet commence par une conversation" visibles dans le scroll bas de page, ce qui crée une légère redondance. L'utilisateur reçoit deux invitations distinctes à contacter avant la fin du scroll.
- Correction : vérifier que le CTA de section et le CTA du bloc cross-selling ne se juxtaposent pas dans un même viewport sur une résolution 1280px. Potentiellement décaler le composant cross-selling après le CTA principal.

---

## Dimension 2 — Parcours Camille (/prescripteurs, 8,5/10)

### Ce qui fonctionne

**Hero /prescripteurs (prescripteurs-desktop.png)** : l'accroche "L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription" nomme directement la peur première de Camille (un prestataire qui dégradent sa réputation). Above the fold immédiat. Les deux badges Certification Socotec et Réseau Esprit Piscine sont visibles dès le hero.

**Grille 3 colonnes (desktop) des 3 promesses** : "En exécutant qui les élève", "Votre relation avec votre client restera la vôtre", "30 ans de réalisations en 78/92, portfolio sur demande" — structure claire, vocabulaire Camille (pas de jargon interne, termes pro reconnaissables).

**Section "Ce qui nous qualifie" (prescripteurs-desktop.png)** : 4 éléments hiérarchisés (Socotec, Esprit Piscine, 30+ ans, bureau d'études). La mention du bureau d'études intégré est une preuve forte pour Camille qui a besoin d'un interlocuteur capable de lire un DCE.

**Section "Ce que les architectes nous demandent" avec FAQ en accordéon** : les 4 questions sont formulées du point de vue de Camille ("Quelles certifications peuvent vous fournir un dossier de prescription ?"). Format questions-réponses natif, sans JS requis (details/summary).

**Portfolio avec lien "Voir toutes nos réalisations"** : 3 fiches visibles sur la page, avec lien vers /realisations. Le filtre projet_complet n'est pas automatiquement présélectionné depuis ce CTA (à vérifier en code — non visible dans le screenshot).

### Frictions identifiées

**[FRICTION C1 — P0]** La page /prescripteurs ne mentionne pas explicitement la possibilité de renvoyer des **documents de qualification** (assurance décennale, Kbis, références projet). Pour Camille architecte, c'est souvent la première chose demandée avant même de qualifier un prestataire. L'existence de ces documents est implicite (Socotec, Esprit Piscine sont des signaux), mais Camille a besoin d'un signal explicite du type : "Dossier de qualification disponible sur demande — assurance décennale, références chantiers, certifications."
- Correction P0 : ajouter dans la section "Ce qui nous qualifie", après les 4 proof points, une ligne ou un encart : "Dossier de qualification complet disponible sur demande" avec le CTA "Présentons-nous". Cela transforme la page en outil de qualification actif, pas seulement en vitrine.
- Note : [BLOQUÉ FONDATEUR partiellement] — le contenu du dossier (décennale confirmée, liste références) nécessite confirmation de Nicolas Berg, mais la phrase de promesse peut être ajoutée dès maintenant.

**[FRICTION C2 — P2]** Label "Architectes" dans la nav (visible sur tous les screenshots header) : correct pour Camille architecte, mais potentiellement exclusif pour un décorateur d'intérieur ou un maître d'ouvrage professionnel qui se glisse dans ce rôle. La friction H2 identifiée dans user-flows.md v1.1 est documentée mais non résolue dans l'implémentation actuelle. La page elle-même précise "Pour les architectes, maîtres d'œuvre et décorateurs d'intérieur" (visible prescripteurs-desktop.png) — ce qui atténue mais ne supprime pas l'ambiguïté de la nav.
- Correction P2 : sous-titre contextuel dans le drawer mobile sous "Architectes" : "Maîtres d'œuvre & prescripteurs" (pattern déjà implémenté pour "Notre approche" avec sous-titre "De la vision à la réalisation" — cf. NavBar.tsx ligne 191).

---

## Dimension 3 — Formulaire (9,0/10)

### Ce qui fonctionne

**Architecture des champs (contact-desktop.png)** : ordre logique (identité → projet → lieu → budget → description). Le champ budget est en SelectField optionnel sans astérisque — conforme à la posture "qualification douce". Les chips type de projet sont optionnels et visuellement légers (pas de cases à cocher, pas de radio buttons contraignants).

**Réassurance sous formulaire** : la mention RGPD est intégrée avant le bouton submit, avec lien vers /politique-confidentialite — visible et non intrusif. Le bloc contact (téléphone + email + adresse) à gauche du formulaire en desktop offre une sortie de secours sans forcer un nouveau champ.

**Page de succès (contact-merci-desktop.png)** : sobre et fonctionnelle. "Nicolas Berg reviendra vers vous pour un premier échange autour de votre projet" — personnalisé (prénom), sans promesse de délai chiffré (conforme à la règle anti-invention, délai non confirmé). Le numéro de téléphone est en lien href="tel:" pour les urgences. "← Retour à l'accueil" disponible.

**État d'erreur (contact-error-state-desktop.png)** : les messages d'erreur inline sont visibles sous les champs (texte orange avec icône AlertCircle). Le formulaire préserve la saisie en cas d'erreur réseau. Fallback email + téléphone dans le bloc d'erreur serveur.

**Mobile (contact-mobile.png)** : le formulaire est lisible en stack, les chips s'affichent correctement en wrap sur 2 lignes pour 4 chips, le bouton submit est pleine largeur — correctement dimensionné pour les pouces.

### Frictions identifiées

**[FRICTION F1 — P1]** Sur mobile (contact-mobile.png, partie basse), le bouton submit "Parlez-nous de votre projet" n'est pas sticky — il faut scroller jusqu'en bas du formulaire pour le voir. Sur un formulaire avec 7 champs (dont un textarea long), un utilisateur mobile peut remplir le textarea sur 3-4 écrans de scroll. Le CTA n'est jamais visible pendant la saisie. Un visiteur peu engagé peut abandonner avant d'avoir trouvé le bouton.
- Correction P1 : rendre le bouton submit sticky-bottom sur mobile pendant la saisie active, avec disparition au scroll vers le bas (pattern "apparaît si formulaire incomplet"). Alternative plus simple : placer le bouton submit également au-dessus du textarea (avant la notice RGPD), en second CTA visible sans grand scroll.

**[FRICTION F2 — P2]** Tablette contact (contact-tablet.png) : le layout passe en stack single-column sur la tablette (768px), ce qui signifie que le bloc de contact (téléphone, adresse, email) qui était à gauche sur desktop disparaît au-dessus du formulaire. La réassurance de contact alternatif est absente de l'écran tablette sauf à scroller sous le formulaire pour trouver le footer. Camille sur iPad peut soumettre le formulaire sans jamais voir l'adresse physique — signal de crédibilité perdu.
- Correction P2 : sur breakpoint 768-1023px, afficher un bandeau compact "Vous préférez nous appeler ? 01 30 42 26 00" entre le chapeau de page et le formulaire.

---

## Dimension 4 — Navigation & orientation (8,5/10)

### Ce qui fonctionne

**Navigation desktop (tous screenshots desktop)** : 6 liens + CTA, sticky, libellés clairs. L'ordre Réalisations en premier est le bon choix (portfolio = preuve première pour Alexandre). Le CTA "Parlez-nous de votre projet" est visuellement distinct (fond sombre, texte clair) — impossible de le confondre avec un lien de nav. Lien actif mis en évidence (couleur water, soulignement).

**Drawer mobile (accueil-mobile.png visible via icon hamburger)** : conforme au wireframe. Focus piégé dans le drawer (NavBar.tsx lignes 45-58). Sous-titre "De la vision à la réalisation" sous "Notre approche" visible dans le drawer — friction H2 partiellement adressée.

**Footer (contact-desktop.png, bas)** : 3 colonnes correctes (Identité / Navigation / Contact). Les deux maisons (Aqua System + Les Terres Essentielles) sont mentionnées avec leurs adresses distinctes — crédibilité de l'ancrage local renforcée. Badges manquants (Socotec + Esprit Piscine) : le wireframe les prévoyait dans le footer, mais ils sont absents des screenshots footer — voir friction N2.

**Page /notre-approche** : le fil narratif des 5 étapes constitue une navigation implicite dans le service — pas de désorientation possible sur cette page.

### Frictions identifiées

**[FRICTION N1 — P1]** Tablette (contact-tablet.png, header) : la navigation passe en hamburger menu sur tablette (la nav complète 6 liens n'est pas visible). Or la tablette 768px est le device de consultation "week-end sofa" d'Alexandre. Un visiteur sur iPad Air (768px) n'a pas accès immédiatement aux 6 liens — il doit ouvrir le hamburger. Le wireframe prévoyait "header desktop simplifié ou full hamburger si les liens ne tiennent pas" (wireframes.md ligne 64). Le résultat actuel est full hamburger à 768px.
- Correction P1 : à 768px, tenter de loger les liens critiques (Réalisations, Piscines, Jardins + CTA) sans les 3 liens moins prioritaires (Notre approche, La maison, Architectes) avec un lien "Plus ▾". Si impossible pour la taille de l'écran, documenter la décision comme acceptable (hamburger reste fonctionnel).

**[FRICTION N2 — P2]** Badges Socotec et Esprit Piscine absents du footer sur les screenshots (contact-desktop.png, la-maison-desktop.png). Le wireframe les prévoyait en colonne 1 du footer (wireframes.md ligne 79). Sur le screenshot du footer, la colonne 1 affiche : Logo, tagline, "En partenariat avec Les Terres Essentielles" — mais aucun badge. Les badges sont présents sur /piscines-bien-etre (proof bar) et /prescripteurs, mais pas dans le footer global qui garantit leur visibilité sur toutes les pages.
- Correction P2 : ajouter les 2 badges (Socotec + Esprit Piscine) en colonne 1 du footer conforme au wireframe. Impact fort sur la perception premium (un pisciniste certifié Socotec sur toutes les pages = signal constant de qualité).

---

## Dimension 5 — Mobile (8,0/10)

### Ce qui fonctionne

**Accueil mobile (accueil-mobile.png)** : le hero occupe 100vw, la tagline est lisible (DM Serif Display, taille correcte), le bouton "Parlez-nous de votre projet" dans la nav mobile est accessible via le hamburger. L'image hero est servie en 800w (121 ko) grâce au `<picture>` implementé en D-14 — LCP mobile estimé < 2,5 s.

**Portfolio mobile (realisations-mobile.png)** : 1 colonne, cartes pleine largeur avec photos correctement proportionnées. Les filtres sont accessibles via wrap horizontal. L'image de chaque card est large et lisible — utilisable en démonstration pendant un RDV (Flow 4 Nicolas).

**Page réalisation mobile (realisation-fiche-mobile.png)** : stack correct — image en premier, titre, zone, notice draft, CTA. Le bouton "Parlez-nous de votre projet" est visible sans scroll excessif. Cross-selling en bas de page.

**Accessibilité tactile** : BUG-A11Y-2 corrigé (target-size WCAG 2.2). min-h-11 sur les chips et filtres. Liens footer inline-flex avec py-1.

### Frictions identifiées

**[FRICTION M1 — P1]** Jardins mobile (jardins-paysage-mobile.png) : la page est nettement plus longue que les autres en raison de la structure en MediaSplit alternée (4 blocs texte + image). Sur mobile, les images sont réduites et le texte prédomine visuellement. Le ratio texte/visuel est inversé par rapport à /piscines-bien-etre — la page jardins paraît plus "éditoriale" et moins "portfolio". Cela affaiblit la conviction visuelle pour une page censée vendre une offre sans photos de réalisations paysagères réelles.
- Correction P1 [BLOQUÉ FONDATEUR en partie] : demander au fondateur 2-3 photos de réalisations jardin (plans, chantiers achevés, parcs existants côté LTE). Avec les assets actuels (seule photo de serre disponible), la page fait ce qu'elle peut — les 4 blocs MediaSplit sont la meilleure solution sans photos réelles. Le label [BLOQUÉ FONDATEUR] s'applique aux photos — pas à la structure.

**[FRICTION M2 — P2]** La maison mobile (la-maison-mobile.png) : la photo de Nicolas Berg (portrait N&B) est visible et bien positionnée. MAIS les 3 blocs de valeur (Exigence / Confiance / Sur mesure) en bas de page s'affichent en stack single-column avec des titres en DM Serif Display — ils prennent une grande hauteur verticale et noient visuellement la fin du parcours de la page. L'utilisateur mobile doit scroller longtemps pour atteindre le CTA final.
- Correction P2 : sur mobile, condenser les 3 blocs valeur en format cards 2 colonnes (grille 2×1 + 1 centré) pour réduire la hauteur et garder le CTA dans un scroll raisonnable.

---

## Dimension 6 — Hiérarchie de l'information par page (8,5/10)

### Ce qui fonctionne

**Accueil (accueil-desktop.png)** : hiérarchie claire — Hero (tagline + photo) → Deux univers (split 50/50) → Proof bar (4 preuves) → Mini-portfolio → CTA final. Chaque section a un objectif unique. Max 2 actions principales par section (respecte la règle ≤ 3 actions/écran).

**Notre approche (notre-approche-desktop.png)** : 5 étapes numérotées + section ancrage local + FAQ. La FAQ en accordéon évite de noyer les réponses dans le texte. H1 unique, H2 pour les sections, H3 pour les étapes. Hiérarchie heading correcte.

**Prescripteurs (prescripteurs-desktop.png)** : Hero → 3 promesses → Ce qui nous qualifie → FAQ architectes → Portfolio → CTA. Chaque bloc a un rôle précis dans la logique de conviction de Camille.

**Contact (contact-desktop.png)** : split 40/60 avec chapeau à gauche + formulaire à droite sur desktop. Simple, pas de distraction. Hiérarchie visuelle : titre → sous-titre → formulaire → notice RGPD → CTA.

### Frictions identifiées

**[FRICTION H1 — P1]** Page /jardins-paysage (jardins-paysage-desktop.png) : 6 blocs MediaSplit alternés de densité textuelle élevée, suivis de 3 cards (Bureau d'études, Pépinière, Jardinerie & expertise) en grille 3 colonnes, puis un bloc cross-selling, puis le CTA. C'est la page avec le plus d'informations à la fois les moins hiérarchisées et les moins appuyées visuellement. Le H1 "Jardins & Paysage" est clair, mais les sous-sections n'ont pas de titres H2 assez contrastés dans la mise en page — tout se lit comme un long texte avec images. Le visiteur perd le fil de la structure.
- Correction P1 : ajouter des ancres visuelles claires (H2 en DM Serif Display, taille 32px+) pour chaque grande section de la page (Conception / Réalisation / Matériaux / Végétaux / Nos expertises). La page bénéficierait d'un summary visuel en haut (à la façon de la proof bar de /piscines-bien-etre) pour orienter d'emblée le visiteur.

---

## Dimension 7 — Gestion des contenus imparfaits (7,5/10)

### Ce qui fonctionne

**Notice "Fiche en cours de documentation" (realisation-fiche-desktop.png)** : le wording est élégant — "Le récit complet de cette réalisation — l'intention, le parti-pris et les choix d'exécution — sera bientôt publié." Le ton est assumé, pas défensif. La photo réelle est toujours affichée en grand format. Le CTA "Ce projet vous inspire ? Parlons du vôtre." est présent et fonctionnel. La notice évite de laisser la sidebar vide sans explication.

**Fiches noindex** : les 14 fiches draft sont en noindex + hors sitemap (arbitrage Phase 5.2). Elles ne nuisent pas au SEO et ne génèrent pas de thin content indexé. L'IA ne les cite pas non plus (llms.txt les exclurait implicitement).

**Page /jardins-paysage sans réalisations** : la page assume l'absence de photos de réalisations paysagères avec le copy "Un projet pensé avant d'être planté" — l'offre création est présentée comme en construction sans le dire explicitement. La photo de serre est la seule vraie photo LTE disponible — elle est utilisée dans le bloc adéquat (MediaSplit "serre de la jardinerie").

### Frictions identifiées

**[FRICTION D1 — P0]** Grille /realisations (realisations-desktop.png) : les 14 réalisations affichées dans la grille n'indiquent pas qu'une fiche est "en cours de documentation" avant d'y cliquer. Alexandre voit une belle grille de 14 photos → clique sur la première → découvre que le contenu est vide sauf la photo. Si Alexandre clique sur 3 fiches consécutivement et trouve 3 notices identiques, l'effet répété brise la perception premium. La fiche individuelle gère bien cet état — le problème est que la grille ne prépare pas l'utilisateur.
- Correction P0 : sur les cards de la grille /realisations dont les données éditoriales sont null (`isDraft === true`), ajouter un badge discret "En cours de documentation" (fond sand-200, texte muted, position bottom-left de la card). Cela prépare le visiteur et rend la notice individuelle non surprenante. Alternative : ne présenter que les fiches avec au moins une prestation renseignée dans la grille principale, le reste en "bientôt" visuel.

**[FRICTION D2 — P1]** La notice "Fiche en cours de documentation" est identique sur les 14 fiches. Pour un visiteur qui navigue le portfolio en séquence (clique sur 2, 3, 4 fiches), le message répété crée une impression d'un site "pas terminé" qui dépasse la gestion élégante du manque. Le premier contact avec la notice est élégant ; le 4e contact casse la suspension of disbelief premium.
- Correction P1 : prioritiser la documentation d'au moins 3-4 fiches avec les vraies données de Nicolas Berg (prestations, intention, zone précise) pour créer un corpus de fiches "complètes" qui intercalent les fiches draft. Même 3 fiches complètes sur 14 changent significativement la perception. [BLOQUÉ FONDATEUR pour les données — l'implémentation peut recevoir les données dès qu'elles sont fournies]

---

## Résumé des corrections priorisées

### P0 — Bloquent le 10/10, action obligatoire (sans dépendance fondateur)

| ID | Page / Élément | Friction | Correction |
|----|---------------|----------|------------|
| P0-D1 | /realisations — cards grille | Fiches draft non signalées avant le clic → surprise répétée brise la perception premium | Ajouter badge "En cours de documentation" sur les cards dont `isDraft === true` dans la grille |
| P0-C1 | /prescripteurs — section qualification | Pas de mention explicite d'un dossier de qualification disponible → Camille ne sait pas qu'elle peut obtenir les docs requis | Ajouter "Dossier de qualification complet disponible sur demande" + CTA "Présentons-nous" dans la section preuves |

### P1 — Empêchent 9/10, à traiter en priorité

| ID | Page / Élément | Friction | Correction |
|----|---------------|----------|------------|
| P1-A1 | Accueil — cartes aperçu réalisations | Type de réalisation (projet complet vs piscine seule) non affiché sur les 3 cartes home | Ajouter `cardType` sous la zone sur les cartes home |
| P1-A2 | /piscines-bien-etre — bas de page | Double CTA (section CTA + cross-selling) potentiellement dans le même viewport | Vérifier sur 1280px : si juxtaposés, décaler le cross-selling après le CTA principal |
| P1-F1 | /contact — mobile | Bouton submit non visible pendant la saisie du textarea (scroll trop long) | Bouton submit sticky-bottom sur mobile OU second bouton submit avant le textarea |
| P1-N1 | Navigation tablette 768px | Full hamburger sur tablette — liens invisibles sans action | Tester nav horizontale réduite (4 liens prioritaires + "Plus") sur 768-1023px |
| P1-N2 | Footer — badges manquants | Socotec + Esprit Piscine absents du footer global (présents uniquement sur 2 pages) | Ajouter les 2 badges en colonne 1 du footer conforme au wireframe |
| P1-H1 | /jardins-paysage — structure | 6 blocs MediaSplit sans ancres H2 visuelles fortes → page longue et sans hiérarchie lisible | Ajouter H2 distincts en DM Serif Display pour chaque grande section + summary visuel en haut |
| P1-M1 | /jardins-paysage — mobile | Ratio texte/visuel inversé vs /piscines-bien-etre, perception "éditoriale" pas "portfolio" | [BLOQUÉ FONDATEUR] Demander 2-3 photos réalisations jardins à Nicolas Berg |

### P2 — Finition, ne bloquent pas la conversion

| ID | Page / Élément | Friction | Correction |
|----|---------------|----------|------------|
| P2-C2 | Nav mobile — "Architectes" | Label potentiellement exclusif pour décorateurs/MOE | Sous-titre dans le drawer : "Maîtres d'œuvre & prescripteurs" (pattern déjà implémenté pour /notre-approche) |
| P2-F2 | /contact tablette | Bloc contact alternatif (tel, adresse) absent above le formulaire tablette | Bandeau compact "01 30 42 26 00" entre le chapeau et le formulaire à 768-1023px |
| P2-M2 | /la-maison mobile | 3 blocs valeur en stack single-column → scroll excessif avant CTA | Grille 2 colonnes sur mobile pour les 3 blocs valeur |
| P2-D2 | /realisations — fiches | Notice identique sur 14 fiches → impression "site pas terminé" au 4e clic | [BLOQUÉ FONDATEUR pour le contenu] Documenter 3-4 fiches avec données réelles de Nicolas Berg en priorité |

---

## Bilan Nielsen 10 — état du site en production

| # | Heuristique | Statut global | Preuves |
|---|-------------|--------------|---------|
| H1 | Visibilité de l'état | PASS | Nav sticky, filtre actif mis en évidence (aria-pressed), état chargement formulaire (bouton disabled), page /contact/merci après soumission |
| H2 | Vocabulaire du monde réel | PASS avec réserve | Vocabulaire "propriété", "réalisation", "bureau d'études" aligné personas. Réserve : "Architectes" dans la nav (ambiguïté C2) |
| H3 | Contrôle et liberté | PASS | Nav toujours accessible, filtre réinitialisable, retour "← Retour aux réalisations" sur fiches, 404 avec chemin de sortie triple |
| H4 | Cohérence et standards | PASS | CTA unique "Parlez-nous de votre projet" sur toutes les pages, nav identique, footer identique |
| H5 | Prévention des erreurs | PASS | Validation inline au blur, chips optionnels, champ budget optionnel, honeypot, timeout 10s |
| H6 | Reconnaissance > rappel | PASS | Filtres portfolio visuels avec labels, fil actif dans la nav, breadcrumb sur fiches |
| H7 | Flexibilité et efficacité | PASS | Alexandre peut aller directement à /realisations, Camille à /prescripteurs, filtre URL partageable |
| H8 | Design minimaliste | PASS avec réserve | Pages bien focalisées. Réserve : /jardins-paysage trop dense (H1) |
| H9 | Messages d'erreur humains | PASS | Erreurs inline avec solution ("Vérifiez votre adresse"), fallback tel+email sur erreur serveur, texte non-jargon |
| H10 | Aide contextuelle | PASS | FAQ /notre-approche + /prescripteurs, mention RGPD sous formulaire, notice draft contextualisée |

---

## Métriques HEART — état au lancement

| Flow | Dimension | Signal | Cible M+6 | Risque actuel |
|------|----------|--------|-----------|---------------|
| Alexandre | Task Success | form_submission_success avec commune 78/92 + description ≥ 20 chars | ≥ 10/mois | FAIBLE — parcours complet opérationnel |
| Alexandre | Adoption | Sessions accueil → /realisations | ≥ 30% | FAIBLE — portfolio accessible en 1 clic |
| Camille | Adoption | prescripteur_page_viewed / sessions | ≥ 3% | MOYEN — absence dossier qualification (P0-C1) peut freiner la conversion |
| Cross-selling | Engagement | cross_selling_clicked | ≥ 10% sessions univers | MOYEN — composant présent mais potentiel doublon CTA (P1-A2) |

---

## Verdict final

Le site Aquasystem est **opérationnel comme vitrine premium** et peut générer des leads qualifiés dès aujourd'hui. Les 8 dimensions auditées oscillent entre 7,5 et 9,0 — aucune dimension n'est en dessous du seuil acceptable. Le seul risque NSM direct est **P0-D1** (effet répétition des fiches draft non signalées qui peut casser la perception premium de plusieurs visiteurs Alexandre qui naviguent en profondeur le portfolio). **P0-C1** (dossier qualification absent sur /prescripteurs) est le deuxième frein identifié, directement sur le parcours Camille.

La note de **7,5 sur la gestion des contenus imparfaits** reflète une réalité : 14 fiches sur 14 sont en draft. Dès que 3-4 fiches sont documentées par Nicolas Berg, cette dimension monte à 8,5-9,0 sans aucune modification de code.

**Score 10/10 = 2 P0 + 7 P1/P2 résolus + 4 fiches réalisations documentées par le fondateur.**
