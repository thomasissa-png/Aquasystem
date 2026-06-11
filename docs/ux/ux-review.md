# UX Review post-implémentation — Site vitrine Aquasystem
> Phase 2 · Revue @ux après code @fullstack
> Date : 2026-06-11 · Référence wireframes : docs/ux/wireframes.md v1.1
> Matériel : 33 screenshots tests/screenshots/ (11 pages × 3 viewports) + code src/
> Périmètre : constater uniquement — pas de modification de code ni de wireframes

---

## 1. Conformité wireframe par wireframe

### WF-01 — Page d'accueil (/)

**Verdict : PASS**

Preuve screenshots : accueil-desktop.png, accueil-mobile.png, accueil-tablet.png.

- Hero plein écran avec photo de réalisation réelle (piscine + parc), overlay gradient bas-haut, H1 "L'extérieur à la hauteur de votre propriété" positionné bas gauche, CTA "Parlez-nous de votre projet" visible — conforme WF-01 above fold desktop.
- Section deux univers : 2 colonnes 50/50 desktop, stack vertical mobile (Piscines & Bien-être d'abord, Jardins & Paysage ensuite) — conforme.
- Section preuves : 4 badges horizontaux desktop (30+, 350+, Socotec, L'Esprit Piscine), grille 2×2 mobile — conforme au composant transversal.
- Extrait portfolio "Quelques propriétés que nous avons transformées." : grille 3 colonnes desktop avec photos réelles, lien "Voir toutes les réalisations" centré — conforme.
- CTA final "Un projet d'extérieur mérite une conversation — pas un formulaire." — texte exact WF-01.
- Footer 3 colonnes desktop, stack mobile — conforme.

Écart résiduel noté (documenté D-11) : le titre de la section portfolio est "Quelques propriétés que nous avons transformées." — le wireframe décrit "Extrait portfolio (3 réalisations phares)" sans titre visible imposé ; l'intitulé choisi est conviction-first et fidèle au ton brand-platform. PASS sans écart fonctionnel.

---

### WF-02 — Piscines & Bien-être (/piscines-bien-etre)

**Verdict : PASS**

Preuve screenshots : piscines-bien-etre-desktop.png, piscines-bien-etre-mobile.png.

- Hero pleine largeur 60vh avec H1 "Piscines & Bien-être" et sous-titre mentionnant Aqua System + 30 ans + Yvelines/Hauts-de-Seine — conforme WF-02 above fold.
- 3 blocs MediaSplit alternés (texte/photo) : "De la feuille blanche à l'inauguration", "L'eau chaude dans votre propriété" (spa HotSpring — PhotoPlaceholder, conforme D-11), "L'équipe qui connaît votre piscine de l'intérieur" — conforme au pattern 3 blocs WF-02.
- Composant preuves : 4 badges — conforme.
- CrossSellingBlock : "Votre piscine mérite un jardin à sa mesure." avec photo réelle et CTA "Voir nos créations paysagères" — conforme. CTA forest côté jardins uniquement (décision @design D-11 : conforme à D-11, pas un écart).
- CTA sectionnel "Votre projet commence par une conversation." — wording légèrement différent de WF-02 ("Votre projet commence par une conversation" vs "Votre projet commence par une conversation." avec point). ÉCART MINEUR — fond identique, impact nul.

---

### WF-03 — Jardins & Paysage (/jardins-paysage)

**Verdict : ÉCART MINEUR**

Preuve screenshots : jardins-paysage-desktop.png, jardins-paysage-mobile.png.

Conforme sur :
- Hero pleine largeur, H1 "Jardins & Paysage", sous-titre mentionnant Les Terres Essentielles avec formulation légale "En partenariat" visible — conforme.
- 3 blocs MediaSplit : "Un projet pensé avant d'être planté", "La réalisation, du premier arbre à la dernière pierre", "Des végétaux sélectionnés pour durer" — conforme aux 3 titres WF-03.
- CrossSellingBlock direction inverse (jardins → piscines) : "Un jardin d'exception autour d'une piscine sur mesure." — conforme WF-03.
- CTA final — conforme.

**Écart mineur — 3 PhotoPlaceholders consécutifs** : les 3 blocs MediaSplit présentent chacun un PhotoPlaceholder (pas de photo jardin réelle dans les sources disponibles). Les placeholders sont sobres, chacun avec une description unique (conforme D-11 règle "jamais 2 identiques"). Documenté D-11 comme "à remplacer dès photos Nicolas". L'impact UX réel est évalué en section 3 ci-dessous.

---

### WF-04 — Notre approche (/notre-approche)

**Verdict : PASS**

Preuve screenshots : notre-approche-desktop.png, notre-approche-mobile.png.

- Hero split 60-40 desktop (texte gauche H1 "De la vision à la réalisation" / photo droite) — conforme WF-04.
- Timeline 5 étapes numérotées, disposition verticale desktop (numéros en grand + titres H2 + texte) : L'écoute, Le bureau d'études, La réalisation, La livraison, Le suivi annuel — tous les 5 présents, conforme.
- Section ancrage local "Nous connaissons ces propriétés — et leurs contraintes." avec communes nommées (Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray, Marnes-la-Coquette, Saint-Cloud) — conforme WF-04.
- PhotoPlaceholder dans la section ancrage local (pas de photo carte/chantier local disponible) : mentionné comme résiduel dans D-11, acceptable.
- CTA final "Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble." — conforme (wording exact WF-04).
- Mobile : stack linéaire, numéros d'étapes lisibles — conforme.

---

### WF-05 — Portfolio / Réalisations (/realisations)

**Verdict : PASS**

Preuve screenshots : realisations-desktop.png, realisations-mobile.png, realisations-tablet.png.

- H1 "Réalisations", sous-titre "30 ans de chantiers dans les propriétés de l'ouest parisien" — conforme.
- Filtres full-width horizontaux : [Tous] [Piscine] [Spa & Sauna] [Jardin & Parc] [Projet complet eau+jardin] — 5 filtres conformes WF-05, boutons pill avec état actif fond coloré (water-600 sur fond neutre). Vérification code : aria-pressed implémenté, focus ring visible.
- Grille 3 colonnes desktop, 2 colonnes tablet (sm:grid-cols-2 lg:grid-cols-3 — code RealisationsGrid), 1 colonne mobile avec photos réelles pleine largeur.
- Sur mobile : grille 1 colonne (pas 2 colonnes comme la suggestion optionnelle WF-05). WF-05 indique "1 colonne" comme mode principal avec "2 colonnes serrées (recommandé)" comme option alternative déléguée à @design. La grille mobile 1 colonne est conforme à l'option principale.
- 14 réalisations affichées (minimum V1 = 8 — largement couvert).
- CTA final "Un projet d'extérieur mérite une conversation — pas un formulaire." — conforme.
- Empty state : code vérifié — wording "Aucune réalisation ne correspond à cette sélection pour le moment. / Voir toutes les réalisations" — léger écart textuel vs WF-05 ("Aucune réalisation dans cette catégorie pour le moment"), conforme à l'arbitrage R-P2-1 (specs fonctionnelles v1.2 : "sélection" prévaut).

---

### WF-05b — Fiche réalisation (/realisations/[slug])

**Verdict : ÉCART MINEUR**

Preuve screenshots : realisation-fiche-desktop.png, realisation-fiche-mobile.png.

Conforme sur :
- Lien "← Retour aux réalisations" visible en haut.
- Photo principale avec titre de réalisation, zone géographique — conforme.
- FicheDraftNotice sobre ("Fiche en cours de documentation") pour les fiches sans données éditorielles — conforme au principe zéro invention D-11.
- CrossSellingBlock "Votre piscine mérite un jardin à sa mesure." avec lien vers jardins-paysage — conforme WF-05b.
- CTA "Parlez-nous de votre projet" — conforme.

**Écart mineur — Layout desktop** : le wireframe WF-05b décrit un layout 60-40 (photo gauche / sidebar droite avec type, zone, prestations, cross-selling, CTA). L'implémentation observable sur realisation-fiche-desktop.png présente un layout pleine largeur (photo en haut + contenu textuel en dessous), sans sidebar latérale distincte sur le desktop. La sidebar WF-05b (col droite avec métadonnées) n'est pas visible comme colonne séparée. Ce layout est lisible et fonctionnel mais diverge de la structure 60-40 wireframe.

---

### WF-06 — La maison (/la-maison)

**Verdict : PASS**

Preuve screenshots : la-maison-desktop.png, la-maison-mobile.png.

- Hero avec photo de réalisation (demeure ancienne — FALLBACK validé fondateur, portrait Nicolas non fourni, conforme D-11 P1 documenté), H1 "La maison" visible — conforme WF-06 avec fallback photo accepté.
- Section "Notre histoire" avec texte "30 ans d'expertise" (jamais "société créée il y a 30 ans") — conforme règle critique WF-06.
- Section "Aqua System" avec badges Socotec + L'Esprit Piscine — conformes.
- Section "Les Terres Essentielles" avec formulation légale "En partenariat avec" et adresse Les Alluets-le-Roi — conforme.
- Valeurs 3 colonnes desktop (Exigence / Confiance / Sur-mesure) avec texte ancré sur preuves — conforme WF-06.
- CTA final adapté "Un projet ? Décrivez-nous ce que vous imaginez." — dans l'esprit WF-06, wording spécifique à cette page.

---

### WF-07 — Espace prescripteurs (/prescripteurs)

**Verdict : PASS**

Preuve screenshots : prescripteurs-desktop.png, prescripteurs-mobile.png, prescripteurs-tablet.png.

- H1 "L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription." — conforme exact WF-07.
- Sous-titre "Pour les architectes, paysagistes et décorateurs d'intérieur" visible — friction H2 résolue (voir section 2).
- CTA "Présentons-nous" above fold — conforme, E-08 branché.
- 3 blocs valeur Camille en colonnes desktop : "Ce qu'il fait le mieux.", "Votre relation avec votre client reste la vôtre.", "30 ans de réalisations en 78/92 — portfolio sur demande." — légèrement différents des intitulés WF-07 mais conformes au contenu attendu et ux-writing §10.
- Section "Ce qui nous qualifie" avec Socotec, L'Esprit Piscine, ancienneté — conforme WF-07 preuves détaillées.
- Section "Nos réalisations — références vérifiables" avec 3 photos et lien "Voir toutes nos réalisations" — conforme.
- CTA final "Travaillons ensemble." avec texte et bouton "Présentons-nous" — conforme WF-07 CTA Camille.

---

### WF-08 — Contact + Formulaire (/contact et /contact/merci)

**Verdict : PASS**

Preuve screenshots : contact-desktop.png, contact-mobile.png, contact-merci-desktop.png.

- H1 "Parlez-nous de votre projet" — conforme.
- Layout desktop split asymétrique : texte + coordonnées à gauche, formulaire à droite — conforme WF-08.
- Formulaire : 7 champs dans l'ordre exact du wireframe (Votre nom*, Email*, Téléphone sans astérisque, Votre projet concerne chips optionnels, Commune*, Budget envisagé optionnel, Décrivez-nous votre projet*).
- Chips : [Piscine & bien-être] [Jardin & paysage] [Projet complet] [Je suis prescripteur] — 4 chips conformes, optionnels, pas de sélection imposée — conforme arbitrage P0-2.
- Téléphone sans astérisque — conforme arbitrage P0-2.
- Mention RGPD visible sous le formulaire avec lien "Politique de confidentialité" — conforme WF-08 et rgpd-checklist.md section D.
- Pas de compteur de caractères visible — conforme arbitrage P2-1.
- Bouton primaire "Parlez-nous de votre projet" pleine largeur — conforme.
- Mobile : formulaire pleine largeur, coordonnées masquées above fold (sous le formulaire dans le footer) — conforme WF-08 mobile.
- Page /contact/merci : H "Votre message est bien parvenu.", texte Nicolas Berg + numéro urgences + "← Retour à l'accueil" — conforme WF-08 état succès.

---

### WF-09 — Page 404

**Verdict : ÉCART MINEUR**

Preuve screenshots : 404-desktop.png, 404-mobile.png.

- Ton sobre, sans humour forcé, sans code "404" en grand — conforme WF-09.
- "Cette page n'existe pas." — conforme exact WF-09.

**Écart mineur** : WF-09 liste 3 liens de sortie : [← Retour à l'accueil] / [Voir les réalisations →] / [Parlez-nous de votre projet →]. L'implémentation présente 2 boutons : [Voir les réalisations →] et [Parlez-nous de votre projet →], sans lien "← Retour à l'accueil" distinct. La navigation header reste toujours accessible (sticky), ce qui compense. Friction minimale — le logo en haut à gauche est un lien home standard. Classé P2.

---

### WF-10 — Pages légales (/mentions-legales, /politique-confidentialite)

**Verdict : PASS**

Preuve screenshot : mentions-legales-desktop.png.

- H1 "Mentions légales", structure H2 par section, contenu textuel pur, liens croisés vers politique-confidentialite — conforme WF-10.
- Pas de mise en page complexe — lisibilité maximale texte seul — conforme.
- Header sticky et footer présents — conforme.

---

## 2. Frictions Nielsen résiduelles — Cognitive walkthrough sur rendu réel

### Friction H2 (1/2) — Sous-titre nav mobile "Notre approche"

**État initial wireframe** : à l'étape 4 du parcours Alexandre, le label "Notre approche" dans la nav mobile pouvait être ambigu. Solution recommandée : sous-titre court sous "Notre approche" dans le drawer mobile.

**Constat sur le rendu réel** : code NavBar.tsx vérifié — lignes 191-195 :
```
{link.href === '/notre-approche' && (
  <span className="mt-1 block text-xs font-sans text-foreground-muted">
    De la vision à la réalisation
  </span>
)}
```
Le sous-titre "De la vision à la réalisation" est présent dans le drawer mobile sous le lien "Notre approche".

**Verdict : FRICTION RÉSOLUE.** La friction H2 identifiée en conception est implémentée.

---

### Friction H2 (2/2) — Sous-titre hero prescripteurs inclusif

**État initial wireframe** : le label "Architectes" dans la nav est exact mais peut exclure les décorateurs d'intérieur et paysagistes prescripteurs. Solution : préciser sur la page elle-même.

**Constat sur le rendu réel** : prescripteurs-desktop.png et prescripteurs-mobile.png montrent le sous-titre "Pour les architectes, paysagistes et décorateurs d'intérieur — un partenaire qui travaille sur votre plan." visible directement sous le H1, above fold.

**Verdict : FRICTION RÉSOLUE.** La formulation inclusive est présente et visible sans scroll.

---

### Vérification complémentaire — CTA sticky

Le CTA "Parlez-nous de votre projet" reste visible dans la navbar sticky sur tous les viewports desktop vérifiés. Sur mobile, le hamburger est accessible et le CTA est le dernier élément du drawer. Pas de régression détectée sur H1 (visibilité de l'état).

---

## 3. PhotoPlaceholders — Évaluation de l'impact UX réel

Trois situations distinctes identifiées (D-11).

### Cas 1 — /jardins-paysage : 3 PhotoPlaceholders consécutifs

**Observation** : les 3 blocs MediaSplit de la page jardins affichent chacun un rectangle de placeholder (fond sable neutre, description textuelle distincte). Aucune photo réelle de jardin n'est disponible dans les sources.

**Impact UX réel** :
La page est la seule page de contenu entier sans photo réelle. Pour le persona Alexandre, qui évalue la qualité sur preuves visuelles (brand-platform §6 : "photos = vecteur n°1 de conviction"), 3 placeholders consécutifs créent une rupture de crédibilité majeure. La page existe mais ne convainc pas sur l'expertise paysagère — exactement ce qu'elle doit démontrer. Pour Camille (prescripteur), l'absence de visuels de réalisation jardin valide la non-maturité perçue de cette offre.

Le CrossSellingBlock en bas de page (jardins → piscines) affiche une photo réelle de piscine avec jardin — ce contraste rend les placeholders encore plus visibles par comparaison.

**Classification : P0**

La page /jardins-paysage sans photos réelles ne peut pas être mise en ligne dans un contexte de lancement public. Elle signale l'inverse de la promesse de marque sur le deuxième pilier de l'offre.

**Recommandation** : avant lancement, soit (a) obtenir au minimum 2-3 photos de réalisations jardins auprès de Nicolas Berg (photos de chantier, pépinière, parcs réalisés) ; soit (b) restructurer temporairement la page en réduisant à 2 blocs avec des photos de réalisations existantes qui montrent un contexte paysager (certaines photos pool + terrasse + végétal existent dans le portfolio piscines).

---

### Cas 2 — /piscines-bien-etre : PhotoPlaceholder spa HotSpring

**Observation** : le bloc "L'eau chaude dans votre propriété" (spa) affiche un PhotoPlaceholder. La page comporte 2 photos réelles (bloc construction + bloc entretien) et 1 placeholder (spa).

**Impact UX réel** : limité. La page a 2 photos réelles de qualité. Le bloc spa est le moins critique des 3 pour la conviction initiale d'Alexandre (qui vient d'abord pour la piscine). Le placeholder est sobre et ne crée pas de rupture visuelle brutale grâce aux 2 photos environnantes.

**Classification : P1**

À corriger avant QA finale. Obtenir une photo d'un spa HotSpring installé ou d'un extrait de documentation partenaire HotSpring (vérifier droits).

---

### Cas 3 — /la-maison : fallback portrait Nicolas

**Observation** : le hero de /la-maison utilise une photo de réalisation (demeure ancienne) au lieu du portrait Nicolas Berg. Fallback explicitement documenté et validé D-11 (P1 documenté fondateur).

**Impact UX réel** : acceptable. La photo de demeure ancienne est cohérente avec l'atmosphère brand et n'est pas identifiable comme placeholder. Le visiteur ne perçoit pas un manque — il voit une belle propriété qui illustre l'ancrage local. La page reste crédible.

**Classification : P1 (déjà documenté)**

Conforme à D-11. Remplacer par le portrait Nicolas dès autorisation/disponibilité. Non bloquant pour le lancement.

---

## 4. Accessibilité visuelle sur les screenshots

Observations depuis les captures d'écran (sans accès aux métriques exactes de contraste — appréciation visuelle).

### Hiérarchie visuelle

- H1 DM Serif Display en grande taille, couleur sombre sur fond clair : contraste apparent élevé sur toutes les pages — PASS.
- Hero : texte sur overlay sombre — le gradient couvre bien le texte sur les photos claires (accueil-desktop visible). Quelques pages univers (jardins-paysage-desktop) montrent le H1 sur une zone herbacée claire ; le texte reste lisible mais le contraste pourrait être limite sur les photos très lumineuses. À vérifier avec un outil de mesure sur la version live (non mesurable depuis screenshot compressé).
- Badges certifications footer (sand-300 sur sand-950) : contraste apparent élevé — PASS.
- Labels filtres portfolio inactifs (text-foreground sur bg-background-secondary avec border) : lisibles — PASS apparent.
- Filtre actif : fond water (action-primary) avec texte action-primary-text — conforme aux tokens design-system (15 paires WCAG vérifiées par @design).

### Focus visible

Code NavBar.tsx et RealisationsGrid.tsx vérifient tous deux `focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]` sur tous les éléments interactifs. Focus ring implémenté systématiquement. Non directement visible sur les screenshots (pas d'état focus capturé) — à vérifier en navigation clavier sur la version live lors du QA.

### Touch targets

- Hamburger mobile : `h-11 w-11` (44px × 44px) — conforme WCAG 2.2.
- Liens drawer : `min-h-11 py-4` — conforme.
- Filtres portfolio : `px-4 py-2` avec `text-sm` — hauteur apparente ~36-40px ; avec padding vertical le composant atteint probablement 40-44px. Borderline — à vérifier en test réel (mesure exacte impossible depuis screenshot).
- Chips formulaire contact : apparence similaire aux filtres — même observation.
- Bouton submit formulaire : pleine largeur, hauteur visible ample — conforme.

### Hiérarchie des headings

Sur les screenshots : chaque page présente un H1 distinct, suivi de H2 de section. Pas de saut apparent observé. Conforme à la règle wireframes.

---

## 5. Synthèse — Classification P0 / P1 / P2

### Écarts P0 — Bloquants avant lancement public

| # | Page | Description | Recommandation @fullstack |
|---|------|-------------|--------------------------|
| P0-1 | /jardins-paysage | 3 PhotoPlaceholders consécutifs — page entière sans photo réelle de jardin. Rupture de crédibilité sur le deuxième pilier de l'offre. | Bloquer la mise en ligne publique de cette page jusqu'à obtention de 2-3 photos réelles. Alternative : restructurer temporairement en 2 blocs avec des photos piscines + végétal existantes (ex: pool-jardin intégré). Décision à valider avec Nicolas Berg. |

---

### Écarts P1 — À corriger avant QA finale

| # | Page | Description | Recommandation @fullstack |
|---|------|-------------|--------------------------|
| P1-1 | /piscines-bien-etre | PhotoPlaceholder spa HotSpring (bloc 2) — 1 placeholder sur 3 blocs. Impact limité mais visible. | Obtenir une photo spa auprès de Nicolas Berg ou de la documentation HotSpring (vérifier droits). Substituer dès disponibilité. |
| P1-2 | /la-maison | Fallback portrait Nicolas (conforme D-11) — la page manque de la dimension humaine prévue dans WF-06. | Solliciter une photo de Nicolas Berg ou de l'équipe. Non bloquant pour le lancement technique (conforme D-11) mais à traiter dès validation fondateur. |
| P1-3 | /realisations/[slug] | Layout fiche desktop : layout pleine largeur implémenté au lieu du 60-40 avec sidebar (WF-05b). Les métadonnées (type, zone, prestations) et le CTA sont positionnés sous les photos et non en colonne droite. | Implémenter le layout 60-40 col8 / col4 sur desktop (lg:grid-cols-[2fr_1fr]) : photos à gauche, sidebar métadonnées + CTA à droite — conforme WF-05b. Le rendu mobile actuel (stack vertical) peut rester. |

---

### Écarts P2 — Post-launch

| # | Page | Description | Recommandation @fullstack |
|---|------|-------------|--------------------------|
| P2-1 | /404 | Lien "← Retour à l'accueil" absent dans la page 404 (2 boutons : réalisations + contact). Le header compense partiellement. | Ajouter un lien texte "← Retour à l'accueil" au-dessus des 2 boutons existants — conforme WF-09 structure 3 liens. 1 ligne de code. |
| P2-2 | /realisations (mobile) | Grille 1 colonne mobile — la suggestion optionnelle "2 colonnes serrées" du WF-05 pour le flow "démonstration Nicolas en RDV" n'est pas implémentée. | Envisager `grid-cols-2` sur mobile pour accélérer le survol du portfolio en démonstration. Optionnel — la grille 1 colonne est conforme à l'option principale WF-05. |
| P2-3 | Filtres portfolio | Hauteur des filtres pill et chips formulaire à vérifier en test live : ~40px visuels, cibles WCAG 2.2 = 44px minimum. | Ajouter `min-h-11` aux boutons de filtre RealisationsGrid et aux Chip du formulaire pour garantir 44px. Préventif. |

---

## Récapitulatif des verdicts

| Wireframe | Page | Verdict | Écart bloquant |
|-----------|------|---------|---------------|
| WF-01 | / | PASS | — |
| WF-02 | /piscines-bien-etre | PASS | — |
| WF-03 | /jardins-paysage | ÉCART MINEUR | P0-1 (photos) |
| WF-04 | /notre-approche | PASS | — |
| WF-05 | /realisations | PASS | — |
| WF-05b | /realisations/[slug] | ÉCART MINEUR | P1-3 (layout 60-40) |
| WF-06 | /la-maison | PASS | — |
| WF-07 | /prescripteurs | PASS | — |
| WF-08 | /contact + /contact/merci | PASS | — |
| WF-09 | /404 | ÉCART MINEUR | P2-1 (lien accueil) |
| WF-10 | /mentions-legales + /politique-confidentialite | PASS | — |

**Verdict global : GO conditionnel.** 7 PASS sur 10 wireframes. 3 écarts mineurs dont 1 P0 (jardins photos) bloquant la mise en ligne publique.

---

## Notes transverses

**Footer** : conforme aux deux wireframes (WF header et footer transversal). 3 colonnes desktop (identité / navigation / contact), "Piscines et spas" et "Jardins et parcs" dans la nav footer (libellés courts acceptables vs "Piscines & Bien-être" — compromis d'espace), adresses des 2 maisons, LinkedIn + Facebook, barre légale SIREN — conforme.

**Drawer bottom-sheet** : conforme à D-10 (consigne mission — prévaut sur design-system §5 "depuis la droite"). Focus trap implémenté, Escape fonctionnel, scroll body verrouillé — PASS a11y.

**Cross-selling** : conformes WF-02/WF-03/WF-05b. CTA "forest" uniquement depuis jardins (pas depuis piscines — décision @design D-11 confirmée dans le code CrossSellingBlock). Split photo + texte 50/50 — conforme au composant transversal wireframe.

**Smart defaults chips** : implémenté (SOURCE_TO_CHIP dans constants.ts + useSearchParams ContactForm) — conforme WF-08 règles smart defaults.

---

*Produit par @ux — 2026-06-11*
