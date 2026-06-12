# Gate de perception — checklist 1 page

> Rappelée à @fullstack / @design AVANT chaque déploiement. Exécutée par @regard-fondateur.
> Principe : **REGARDER à taille réelle AVANT de lire les specs.** On juge l'impression d'un client premium pressé, pas la conformité aux critères.
> Règle d'or : **« si le fondateur risque de le voir, c'est que tu aurais dû le voir avant lui ».**

## 1. Capturer (viewport RÉEL, Playwright)
- [ ] Mobile **390×844** ET desktop **1440×900** (les deux).
- [ ] **Fold d'abord**, puis chaque section au scroll.
- [ ] États interactifs : menu ouvert, formulaire (vide/soumis/erreur), hover CTA, galerie ouverte.
- [ ] Onglet navigateur : favicon + titre à 16px réel.

## 2. Regarder & juger (lire chaque capture)
- [ ] **Lisibilité réelle** : chaque texte lisible sur SON fond RÉEL (pas « token conforme »). → cas #1 hero clair/clair.
- [ ] **Proportions** : rien d'inexplicablement géant ; footer ≤ 1 écran mobile. → cas #6.
- [ ] **Chaque visuel au niveau premium** : un visuel moyen/complaisant = à changer ou enlever. → cas #4.
- [ ] **Tics typo & répétitions** : cadratins en série (surtout titres), tournures et images répétées. → cas #2.
- [ ] **Inachevé visible** : placeholders, badges/étiquettes techniques (« en cours de documentation »), doublons, blocs vides. → cas #5.
- [ ] **Nom de marque** identique partout (header, footer, onglet, alt, mentions).
- [ ] **Favicon** reconnaissable et lisible à 16px. → cas #3.

## 3. Puis croiser les specs
- [ ] Lire specs UX/design/copy SEULEMENT ici, pour distinguer défaut vs parti pris assumé.
- [ ] Parti pris documenté mais qui dégrade la perception = signaler quand même (P1).

## Verdict
**PRÉSENTABLE AU FONDATEUR : OUI / NON** — un seul défaut de perception MAJEUR = NON.

## Les 6 cas canoniques (déjà attrapés par le fondateur — ne jamais relaisser passer)
1. Hero mobile illisible (texte clair sur zone claire). 2. Tic des cadratins (y c. titres).
3. Favicon illisible à 16px. 4. Photos « pas au niveau » (casting complaisant).
5. Badges « en cours de documentation » sur les images. 6. Footer sur 2 écrans mobiles.
