# Audit OG Image — Aquasystem / Rive privée
**Date :** 2026-06-13  
**Fichier audité :** `public/og-image.jpg` (1200×630)  
**Auditeur :** @design  
**Destinataire :** @fullstack (implémentation via `scripts/build-og-image.mjs`)

---

## A. SCORECARD — Image actuelle

| # | Critère | Note /10 | Justification |
|---|---|---|---|
| 1 | Impact / premium au premier regard | 5/10 | La photo est belle (demeure haussmannienne + bassin miroir), mais le texte trop dense et le scrim trop agressif en bas-gauche noient l'atout. L'œil est distrait, pas capturé. |
| 2 | Hiérarchie typographique | 5/10 | 4 niveaux de texte superposés (eyebrow + wordmark + tagline + géo/durée). Trop de lignes pour un format 1200×630. La ligne géo « Yvelines & Hauts-de-Seine — depuis 30 ans » est précieuse mais se perd en 5e ligne. |
| 3 | Lisibilité texte / contraste / scrim | 6/10 | Le dégradé assure la lisibilité du blanc sur fond sombre, mais sa forme radiale (bas-gauche vers centre-droit) crée un halo artificiel qui « tache » la photo. La demeure en partie haute reste très lumineuse, sans protection — si WhatsApp/LinkedIn recadre au tiers supérieur, zéro texte lisible. |
| 4 | Composition / équilibre | 5/10 | La façade est parfaitement symétrique sur l'axe vertical — un atout fort. Placer TOUT le texte en bas-gauche brise cette symétrie sans raison éditoriale. Le bloc texte « pèse » à gauche et laisse le quart inférieur-droit vide. Visuellement déséquilibré. |
| 5 | Cohérence design system site | 5/10 | Le wordmark « Aquasystem » serif correspond au DM Serif Display du site. Mais l'eyebrow en capitales espacées gold est correct, la tagline en DM Sans blanc aussi — sauf que le site (accueil-desktop) utilise un layout centré avec grand espace négatif. L'OG image est bas-gauche dense alors que le site respire. Rupture de registre. |
| 6 | Rendu en contexte réel (WhatsApp / iMessage / LinkedIn) | 4/10 | **Problème critique :** WhatsApp et iMessage recadrent l'OG en vignette carrée en prenant le centre de l'image (x:300–900, y:0–630 environ). Le bloc texte est en bas-gauche (x:60–700, y:370–580). Il est partiellement hors cadre ou tronqué dans la vignette. Sur LinkedIn, le ratio est respecté mais le titre de la page HTML apparaît en surimpression — l'eyebrow « PISCINISTE & PAYSAGISTE HAUT DE GAMME » fait doublon avec le titre de lien. |
| **GLOBAL** | | **5/10** | Honnête pour un premier jet ; insuffisant pour le positionnement n°1 haut de gamme ouest parisien. |

---

## B. DIAGNOSTIC — Ce qui fait douter

**Défauts structurels (par ordre d'impact) :**

1. **4 lignes de texte = surcharge fatale.** Sur un format 1200×630 vu en vignette, le cerveau n'a le temps de lire qu'1 à 2 informations. L'eyebrow + wordmark + tagline + géo représentent 4 messages distincts. Il faut trancher : une ligne hero + une ligne de contexte. Pas plus.

2. **Positionnement bas-gauche VS symétrie de la photo.** La façade est sur l'axe central vertical. Le jardin et le bassin s'étendent à gauche. Placer le texte en bas-gauche masque le reflet du bassin (le seul élément « eau » dans l'image) et casse la symétrie sans bénéfice éditorial.

3. **Scrim en halo radial, pas en bande.** Le dégradé actuel part du coin bas-gauche en rayonnant vers le centre. Cela assombrit la photo là où elle était la plus vivante (le jardin, les transats) et laisse le ciel et la façade brûlés et sans protection. Un scrim en bande horizontale basse serait plus propre et préserverait davantage la photo.

4. **Monogramme absent.** Le favicon SVG contient un « A » serif sur tuile #3A6675 avec filet or — un actif de marque fort. Il est absent de l'OG image, qui se contente du wordmark textuel. Missed opportunity de marquage visuel immédiat.

5. **L'eyebrow est trop chargé.** « PISCINISTE & PAYSAGISTE HAUT DE GAMME » = 5 mots en majuscules. Dans un contexte de partage social, l'eyebrow est la première chose lue AVANT le wordmark. 5 mots = on perd l'attention avant d'arriver au nom. 2–3 mots maximum.

6. **La ligne géo/durée est la plus fragile mais la plus différenciante.** « Yvelines & Hauts-de-Seine — depuis 30 ans » est l'une des preuves de crédibilité les plus fortes pour le persona local (Alexandre, 45–60 ans, propriétaire 78/92). Elle est traitée en toute dernière ligne, taille minimale. Soit la monter en hiérarchie, soit la supprimer pour ne pas la diluer.

7. **Crop photo non optimal.** La source 1920×1292 montre la demeure + bassin miroir + jardin. En 1200×630 (ratio 1.9:1), le recadrage actuel semble centré horizontalement mais garde trop de ciel gris au-dessus de la toiture. Le point focal idéal = axe de symétrie de la façade, avec le reflet du bassin visible en bas. Décaler le crop vers y+80px (moins de ciel, plus de bassin) renforcerait l'impact.

---

## C. SPÉCIFICATION DE REFONTE CHIFFRÉE

### Paramètres communs aux deux directions

**Source photo :** `public/images/realisations/piscine-couloir-demeure-ancienne-1920w.webp`  
**Crop recommandé :** x:0, y:80, width:1920, height:1024 (ratio ~1.87:1 → recadrage final 1200×630 via sharp.resize)  
— Objectif : couper 80px de ciel gris en haut, gain de bassin reflet en bas. La façade reste centrée.  
**Palette tokens utilisés :**  
- `#F5F0E8` sand (blanc chaud — texte principal)  
- `#C4924A` gold (eyebrow / accent)  
- `#3A6675` water (background monogramme)  
- `#1A1510` encre (fond scrim)  
**Polices :** DM Serif Display (wordmark, weight 400) + DM Sans (eyebrow + géo, weight 500)

---

### Direction 1 — « Éditorial centré »

**Concept :** Le texte s'inscrit au centre de l'image sur un axe vertical, aligné sur la symétrie de la façade. 2 lignes maximum. Le monogramme positionné en haut-gauche marque le territoire sans alourdir le centre. Sobre, contemporain, journalistique — proche du registre Maisons & Jardins ou AD.

**Scrim :**  
- Type : dégradé linéaire vertical (top → bottom)  
- Stop 1 : `rgba(26,21,16,0.00)` à `y=0%`  
- Stop 2 : `rgba(26,21,16,0.00)` à `y=35%`  
- Stop 3 : `rgba(26,21,16,0.72)` à `y=75%`  
- Stop 4 : `rgba(26,21,16,0.88)` à `y=100%`  
→ La moitié supérieure de la photo reste intacte. La demeure et le ciel respirent. Le scrim n'affecte que le bas.

**Monogramme (haut-gauche) :**  
- Taille : 48×48 px  
- Position : x:48, y:40  
- Rendu : SVG favicon (tuile #3A6675, « A » #F5F0E8, filet or #C4924A)

**Bloc texte central :**  
- Ancrage vertical : centré à y=420 (dans la bande scrim)  
- Ancrage horizontal : centré x=600

**Eyebrow :**  
- Texte : `HAUT DE GAMME — DEPUIS 30 ANS`  
- Police : DM Sans, weight 500, taille 16px  
- Lettrespacing : 0.18em  
- Couleur : `#C4924A` (gold)  
- Position : 1 ligne, centrée, y=390

**Wordmark :**  
- Texte : `Aquasystem`  
- Police : DM Serif Display, weight 400, taille 72px  
- Couleur : `#F5F0E8` (sand)  
- Lettrespacing : -0.01em  
- Position : centrée, y=420 (baseline)

**Tagline :**  
- Texte : `L'extérieur à la hauteur de votre propriété.`  
- Police : DM Sans, weight 400, taille 20px  
- Couleur : `#F5F0E8` à opacité 0.80  
- Lettrespacing : 0  
- Position : centrée, y=460

**Filet :**  
- Aucun — la version centrée n'en a pas besoin (l'espace négatif joue ce rôle)

**Lignes supprimées :** `Yvelines & Hauts-de-Seine — depuis 30 ans` (intégrée dans l'eyebrow raccourci)

**Rendu contexte social :**  
- Vignette carrée WhatsApp (recadrage centre x:300–900) : le wordmark et l'eyebrow sont au centre → survivent au crop. PASS.  
- LinkedIn : titre HTML en doublon acceptable (l'OG est sobre, pas redondant).

---

### Direction 2 — « Bas-gauche affirmé, resserré »

**Concept :** Conserver le principe bas-gauche de la version actuelle, mais le resserrer à 2 lignes seulement et introduire le monogramme comme ancre haut-gauche. Le scrim devient une bande basse horizontale pure. Plus affirmé, plus territorial, proche du registre publicité presse haut de gamme.

**Scrim :**  
- Type : dégradé linéaire vertical (top → bottom)  
- Stop 1 : `rgba(26,21,16,0.00)` à `y=0%`  
- Stop 2 : `rgba(26,21,16,0.00)` à `y=42%`  
- Stop 3 : `rgba(26,21,16,0.78)` à `y=70%`  
- Stop 4 : `rgba(26,21,16,0.92)` à `y=100%`  
→ Bande plus marquée en bas, transition plus franche — le contraste est assumé.

**Monogramme (haut-gauche) :**  
- Taille : 44×44 px  
- Position : x:48, y:40  
- Même rendu SVG que Direction 1

**Bloc texte :**  
- Ancrage horizontal : x:60 (marge gauche fixe)  
- Ancrage vertical bas : baseline tagline à y=570

**Eyebrow :**  
- Texte : `PISCINISTE · PAYSAGISTE`  
- Police : DM Sans, weight 500, taille 14px  
- Lettrespacing : 0.22em  
- Couleur : `#C4924A` (gold)  
- Position : x:60, y:492

**Wordmark :**  
- Texte : `Aquasystem`  
- Police : DM Serif Display, weight 400, taille 80px  
- Couleur : `#F5F0E8` (sand)  
- Lettrespacing : -0.02em  
- Position : x:60, y:548 (baseline)

**Tagline :**  
- SUPPRIMÉE — trop de lignes  
- Remplacée par : filet hairline or + ligne géo

**Filet hairline :**  
- Couleur : `#C4924A` (gold), opacité 0.60  
- Épaisseur : 1px  
- Largeur : 320px  
- Position : x:60, y:562

**Ligne géo :**  
- Texte : `Yvelines & Hauts-de-Seine — depuis 30 ans`  
- Police : DM Sans, weight 400, taille 13px  
- Couleur : `#F5F0E8` à opacité 0.65  
- Lettrespacing : 0.08em  
- Position : x:60, y:578

**Rendu contexte social :**  
- Vignette carrée WhatsApp (recadrage centre x:300–900) : le bloc texte est à x:60, donc partiellement hors cadre (x:300 coupera l'eyebrow et le début du wordmark « Aqua »). Risque modéré — le « system » sera lisible, l'eyebrow tronqué.  
- LinkedIn : correct (ratio respecté).  
- VERDICT CROP : légèrement pénalisé vs Direction 1.

---

## RECOMMANDATION

**Direction retenue : Direction 1 — « Éditorial centré »**

**Justification persona et marque :**

1. **Symétrie exploitée** : la façade haussmannienne est le seul actif visuel disponible avec un axe de symétrie fort. Le centrage textuel l'honore au lieu de le contredire. Aucun pisciniste concurrent ne fait ce choix — ils restent tous sur le bas-gauche par convention. C'est un espace libre.

2. **Robustesse cross-plateforme** : le wordmark centré survit au crop carré de WhatsApp/iMessage. C'est le critère le plus dur à satisfaire et la Direction 1 le passe sans compromis.

3. **Cohérence avec le site** : l'accueil desktop (accueil-desktop.png) est construit sur un registre aéré, centré, avec grand espace négatif. La Direction 1 prolonge ce registre dans le format social. La Direction 2, plus affirmée et verticale, crée une légère rupture de ton.

4. **Persona Alexandre (45–60 ans, chef d'entreprise)** : le centrage sobre est lu comme « confiance assurée » — le genre de marque qui n'a pas besoin de crier. La Direction 2 est plus « annonce presse immobilière » que « artisan haut de gamme ».

5. **Eyebrow raccourci** : `HAUT DE GAMME — DEPUIS 30 ANS` sur une ligne fusionne les deux messages les plus différenciants (positionnement + durée) sans surcharger.

---

## D. CRITÈRES DE RÉCEPTION 10/10 (checklist binaire)

Toute nouvelle version doit cocher TOUS les points suivants avant validation :

**Composition**
- [ ] Maximum 3 éléments texte dans le champ visuel (eyebrow + wordmark + tagline OU filet géo — pas les deux)
- [ ] Monogramme SVG présent et lisible à 48×48 px (fond #3A6675, pas de fond transparent sur photo)
- [ ] Aucun élément texte au-delà de x:1140 ou en deçà de x:60 (marges 60px)

**Photo / scrim**
- [ ] Crop source : y:80 minimum (ciel gris rogné, bassin visible)
- [ ] Scrim linéaire vertical pur (pas radial, pas en vignette)
- [ ] La moitié supérieure de la photo (y:0–315) contient zéro texte
- [ ] La façade demeure reste visible et non noircie au-delà de 40% d'opacité dans sa zone (y:0–300)

**Typographie**
- [ ] Wordmark DM Serif Display, taille ≥ 64px (lisible en vignette 400×210)
- [ ] Eyebrow DM Sans, ≤ 4 mots + lettrespacing ≥ 0.16em, couleur gold #C4924A
- [ ] Contraste texte principal sur scrim ≥ 7:1 (blanc #F5F0E8 sur #1A1510 à 0.88 = PASS)

**Contexte social**
- [ ] Wordmark intact dans un recadrage carré x:300–900 (test manuel crop)
- [ ] Rendu correct sur fond sombre (mode sombre WhatsApp / X)
- [ ] Poids fichier final < 500 Ko (JPEG quality 88)

**Cohérence marque**
- [ ] Aucune couleur hors palette : sand, water, forest, gold, encre uniquement
- [ ] Aucune police hors DM Serif Display / DM Sans
- [ ] L'image « sent » la même marque que l'accueil desktop — passer les 10 critères Thomas visuellement

---

AUDIT-OG-DONE
