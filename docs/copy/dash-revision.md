# Révision typographique — Cadratin (—)
## Inventaire et verdicts complets pour application mécanique par @fullstack

> Décision fondateur : 2026-06-12
> Règle : le cadratin est INTERDIT dans les titres (H1/H2/hero/sous-titres) et meta-titles. Toléré avec PARCIMONIE dans le corps de texte (max ~1 par section, uniquement quand une vraie incise le justifie).
> Agent : @copywriter | Date : 2026-06-12

---

## PÉRIMÈTRE

Seul le texte visible rendu (JSX/template strings) est traité. Les commentaires de code (`// —` ou `/* — */`) sont exclus : ils ne sont jamais affichés à l'utilisateur. Les chaînes regex et les données structurées JSON-LD (invisibles pour l'utilisateur) sont traitées séparément en section 2.

---

## SECTION 1 — Texte visible rendu

### Légende
- **RÉÉCRIRE** : cadratin à supprimer ou remplacer. Phrase de remplacement exacte fournie.
- **GARDER** : vraie incise justifiée dans le corps de texte (max ~1 par section).
- **GARDER-SEO** : élément de données structurées ou titre de réalisation non affiché en H1/H2 de page — non soumis à la règle typographique des titres.
- **NEUTRE** : occurrence dans une expression latine ou formule technique (tiret dans une expression comme `—` dans COMMUNES.join).

---

### 1.1 src/app/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 68 | `subtitle` du hero (sous-titre de page d'accueil — affiché en gros sous le H1) | `De la vision à la réalisation — eau, jardin, propriété — un seul interlocuteur, depuis 30 ans dans l'ouest parisien.` | `De la vision à la réalisation : eau, jardin, propriété. Un seul interlocuteur, depuis 30 ans dans l'ouest parisien.` | **RÉÉCRIRE** — double cadratin en sous-titre hero = exactement le tic dénoncé. La formule signature est préservée. Les cadratins remplacés par deux-points (séquence logique) + point (fin de liste) + nouvelle phrase. |
| 186 | Prop `amorce` du SectionCTA (affiché en grand, contexte d'accroche de section sombre) | `Un projet d'extérieur mérite une conversation — pas un formulaire.` | `Un projet d'extérieur mérite une conversation, pas un formulaire.` | **RÉÉCRIRE** — l'amorce est affichée en serif 3xl, équivalent d'un titre de section. Le cadratin avant « pas un formulaire » est un tic d'emphase ; la virgule suffit et améliore la fluidité sans perdre le contraste. |

---

### 1.2 src/app/layout.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 43 | `metadata.title.default` (meta-title générique, rendu dans `<title>`, donc dans les SERP) | `` `${SITE_NAME} — ${SITE_TAGLINE}` `` | Inchangé — voir note | **GARDER** — le cadratin séparateur entre nom de marque et tagline dans un `<title>` est une convention SEO universelle (équivalent du pipe `|` ou du trait). Ce n'est pas un tic stylistique : c'est la ponctuation standard des meta-titles. Aucun utilisateur ne lit ce cadratin comme un cadratin littéraire. |
| 44 | `metadata.title.template` (pattern pour les meta-titles de toutes les sous-pages) | `` `%s — ${SITE_NAME}` `` | Inchangé | **GARDER** — même raison. Convention meta-title SEO, pas du copy visible en page. |

---

### 1.3 src/app/realisations/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 16 | `metadata.title` (meta-title, SERP) | `'Réalisations — Piscines, jardins sur mesure, 78/92'` | Inchangé | **GARDER** — convention meta-title SEO. |
| 22 | `openGraph.title` (OG, non visible dans la page) | `'Réalisations — Piscines & Jardins, Yvelines 78/92'` | Inchangé | **GARDER** — OG title, non affiché en page. |
| 58 | Prop `amorce` du SectionCTA (affiché en grand, bas de page) | `Un projet d'extérieur mérite une conversation — pas un formulaire.` | `Un projet d'extérieur mérite une conversation, pas un formulaire.` | **RÉÉCRIRE** — même cas que `src/app/page.tsx` ligne 186. Cette chaîne est identique : une seule correction dans le composant SectionCTA si l'amorce est en prop, sinon corriger les 2 occurrences indépendamment (ici et ligne 186). |

---

### 1.4 src/app/piscines-bien-etre/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 23 | `metadata.title` (meta-title, SERP) | `'Piscines sur mesure Yvelines & 92 — Pisciniste Aqua System'` | Inchangé | **GARDER** — convention meta-title SEO. |
| 29 | `openGraph.title` (OG) | `'Piscines sur mesure Yvelines 78/92 — Aqua System'` | Inchangé | **GARDER** — OG title, non affiché en page. |
| 54 | `subtitle` du hero (sous-titre de page — affiché en dessous du H1 `Piscines & Bien-être`) | `Notre maison Aqua System — conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine.` | `Notre maison Aqua System : conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine.` | **RÉÉCRIRE** — cadratin dans un sous-titre de hero (fond sur photo). Le deux-points est ici la ponctuation correcte pour introduire une précision après un sujet nommé. |
| 101–102 | Corps de texte (paragraphe de preuves, fond clair, taille sm) | `Trophée d'Or FPP 2024 — Piscine intérieure (Fédération des Professionnels de la Piscine et du Spa) | Award Bronze EUSA 2025 — Piscines intérieures privées (European Union of Swimming Pools and Spas, Barcelone).` | `Trophée d'Or FPP 2024, Piscine intérieure (Fédération des Professionnels de la Piscine et du Spa). Award Bronze EUSA 2025, Piscines intérieures privées (European Union of Swimming Pools and Spas, Barcelone).` | **RÉÉCRIRE** — les cadratins servent ici de séparateurs entre un label de distinction et sa catégorie. Une virgule suffit. Le `|` de séparation entre les deux distinctions devient un point (nouvelle phrase). Registre sobre préservé. |
| 114 | Prop `body` du CrossSellingBlock (corps de texte de section) | `L'eau et le végétal se conçoivent ensemble ou ne se conçoivent pas vraiment — c'est ce que nous faisons depuis 30 ans.` | `L'eau et le végétal se conçoivent ensemble ou ne se conçoivent pas vraiment : c'est ce que nous faisons depuis 30 ans.` | **RÉÉCRIRE** — le cadratin introduit une conclusion. Le deux-points est la ponctuation correcte pour introduire une conséquence logique. Registre intact. |

---

### 1.5 src/app/jardins-paysage/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 72 | `subtitle` du hero (sous-titre affiché sous le H1 `Jardins & Paysage`) | `En partenariat avec Les Terres Essentielles — bureau d'études paysager, création et entretien de parcs et jardins sur mesure.` | `En partenariat avec Les Terres Essentielles : bureau d'études paysager, création et entretien de parcs et jardins sur mesure.` | **RÉÉCRIRE** — cadratin dans un sous-titre de hero. Le deux-points introduit correctement la liste des prestations après le sujet. |
| 126 | Prop `title` du CrossSellingBlock (titre de section H2) | `Un jardin pensé avec la piscine — depuis le même bureau d'études.` | `Un jardin pensé avec la piscine, depuis le même bureau d'études.` | **RÉÉCRIRE** — c'est un H2 de section (titre visible). Le cadratin est un tic d'emphase ; la virgule préserve le rythme sans tiret. |
| 147 | Corps de texte (premier `body` de BureauEtudesBlock, paragraphe 1) | `Notre bureau d'études — en partenariat avec Les Terres Essentielles — pose le plan avant que la première pelle entre dans la terre.` | `Notre bureau d'études, en partenariat avec Les Terres Essentielles, pose le plan avant que la première pelle entre dans la terre.` | **RÉÉCRIRE** — double cadratin encadrant une incise dans un paragraphe de corps. L'incise est courte et ne justifie pas le cadratin : des virgules suffisent et améliorent la fluidité. |

---

### 1.6 src/app/la-maison/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 26 | `metadata.title` (meta-title, SERP) | `"Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise"` | Inchangé | **GARDER** — convention meta-title SEO. |
| 28 | `metadata.description` (meta-description, SERP) | `"Aqua System et Les Terres Essentielles — 30 ans dans le 78/92. Certification Socotec. Membre L'Esprit Piscine. Rencontrons-nous."` | `"Aqua System et Les Terres Essentielles : 30 ans dans le 78/92. Certification Socotec. Membre L'Esprit Piscine. Rencontrons-nous."` | **RÉÉCRIRE** — la meta-description est lue par l'utilisateur dans les SERP (sous le titre). Un deux-points est la ponctuation correcte pour introduire un contenu informatif après un sujet nommé. Le cadratin dans une meta-description est un tic visible. |
| 32 | `openGraph.title` (OG) | `"Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise"` | Inchangé | **GARDER** — OG title, non affiché en page. |
| 38 | `openGraph.images.alt` (texte alt OG) | `'Aqua System — Pisciniste à Freneuse dans les Yvelines depuis 30 ans'` | Inchangé | **GARDER** — texte alt d'image OG, non affiché en page pour l'utilisateur. |
| 80 | `subtitle` du hero (sous-titre affiché sous le H1 `La maison`) | `Plus de 30 ans d'expertise dans les plus belles propriétés de l'ouest parisien — et une conviction : le détail fait tout.` | `Plus de 30 ans d'expertise dans les plus belles propriétés de l'ouest parisien. Une conviction : le détail fait tout.` | **RÉÉCRIRE** — cadratin dans un sous-titre de hero. Le cadratin cherche à lier deux propositions indépendantes ; un point crée une pause nette et un effet rhétorique plus fort (la conviction se pose seule). |
| 92–93 | Corps de texte (paragraphe 1 de « Notre histoire ») | `le 78 et le 92 — ces communes où les propriétés ont du caractère et où les propriétaires ont des exigences que le standard ne satisfait pas.` | `le 78 et le 92 : ces communes où les propriétés ont du caractère et où les propriétaires ont des exigences que le standard ne satisfait pas.` | **RÉÉCRIRE** — le cadratin introduit une apposition explicative. Le deux-points est ici la ponctuation correcte pour introduire une précision sur un terme venant d'être nommé. |
| 148 | Corps de texte (distinctions, paragraphe dans la section Aqua System) | `Trophée d'Or FPP 2024 — Piscine intérieure. Award Bronze EUSA 2025 — Piscines intérieures privées (Barcelone).` | `Trophée d'Or FPP 2024, Piscine intérieure. Award Bronze EUSA 2025, Piscines intérieures privées (Barcelone).` | **RÉÉCRIRE** — même cas que `piscines-bien-etre/page.tsx` lignes 101–102. Virgule entre label et catégorie. |
| 54 | Corps de texte (VALEURS, objet Exigence) | `Chaque terrain est différent — chaque réalisation l'est aussi.` | `Chaque terrain est différent : chaque réalisation l'est aussi.` | **RÉÉCRIRE** — le cadratin sert ici de liant logique (conséquence). Le deux-points est la ponctuation correcte. L'effet de parallélisme est conservé. |
| 59 | Corps de texte (VALEURS, objet Confiance) | `Nous construisons pour la pérennité — pas pour la saison.` | `Nous construisons pour la pérennité, pas pour la saison.` | **RÉÉCRIRE** — cadratin d'emphase avant une négation de contraste. La virgule est la ponctuation correcte et plus naturelle. |
| 64 | Corps de texte (VALEURS, objet Sur-mesure) | `Aucune piscine ne ressemble à la précédente — parce qu'aucun terrain ne se ressemble.` | `Aucune piscine ne ressemble à la précédente, parce qu'aucun terrain ne se ressemble.` | **RÉÉCRIRE** — le cadratin précède une causale. La virgule est la ponctuation correcte et plus fluide. |

---

### 1.7 src/app/notre-approche/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 27 | `metadata.description` (meta-description, SERP) | `"Aqua System et Les Terres Essentielles portent ensemble votre projet d'extérieur en 78/92 — de la conception au suivi. Un seul interlocuteur."` | `"Aqua System et Les Terres Essentielles portent ensemble votre projet d'extérieur en 78/92, de la conception au suivi. Un seul interlocuteur."` | **RÉÉCRIRE** — meta-description lue dans les SERP. Le cadratin est un tic visible ; la virgule suffit pour introduire la précision. |
| 109 | Sous-titre du hero split (affiché en p.text-xl, sous le H1 `De la vision à la réalisation`) | `Comment nous portons un projet d'extérieur de bout en bout — et pourquoi cela change tout.` | `Comment nous portons un projet d'extérieur de bout en bout, et pourquoi cela change tout.` | **RÉÉCRIRE** — affiché immédiatement sous un H1, ce texte a le statut fonctionnel d'un sous-titre. Le cadratin avant « et » est un tic courant pour simuler une pause dramatique ; la virgule est correcte et plus sobre. |
| 168 | Titre H2 (ancrage local, section fond secondaire) | `Nous connaissons ces propriétés — et leurs contraintes.` | `Nous connaissons ces propriétés, et leurs contraintes.` | **RÉÉCRIRE** — H2 explicite. Cadratin avant « et » interdit dans les titres. Virgule préservant le rythme binaire. |
| 179 | Expression italique des communes (texte visible affiché en p.font-serif.italic) | `COMMUNES.join(' — ')` → affiché : `Le Vésinet — Saint-Nom-la-Bretèche — Ville-d'Avray — Marnes-la-Coquette — Saint-Cloud` | `COMMUNES.join(', ')` → affiché : `Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray, Marnes-la-Coquette, Saint-Cloud` | **RÉÉCRIRE** — liste de communes affichée dans un élément avec un style décoratif (italic, serif). Les cadratins entre noms de lieux sont un tic stylistique répandu mais ici particulièrement visible (5 cadratins d'un coup). La virgule est la ponctuation correcte pour une énumération géographique. |
| 184 | Corps de texte (alinéa GEO après les communes) | `— et l'ensemble des communes des Yvelines (78) et des Hauts-de-Seine (92).` | `Et l'ensemble des communes des Yvelines (78) et des Hauts-de-Seine (92).` | **RÉÉCRIRE** — cadratin en début de phrase dans le corps. Ici il introduit une continuation qui se veut légèrement décalée (effet de parenthèse), mais en début de phrase il est brusque. Supprimer le cadratin et mettre la majuscule à « Et » : la phrase continue naturellement la liste. |

---

### 1.8 src/app/prescripteurs/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 30 | `metadata.title` (meta-title, SERP) | `'Espace prescripteurs — Pisciniste & Paysagiste, 78/92'` | Inchangé | **GARDER** — convention meta-title SEO. |
| 36 | `openGraph.title` (OG) | `'Espace prescripteurs — Aqua System, pisciniste 78/92'` | Inchangé | **GARDER** — OG title, non affiché en page. |
| 72 | VALEURS[2].titre — affiché en H2 de section (font-serif text-2xl) | `'30 ans de réalisations en 78/92 — portfolio sur demande.'` | `'30 ans de réalisations en 78/92. Portfolio sur demande.'` | **RÉÉCRIRE** — H2 explicite. Le cadratin est interdit dans les titres. Un point sépare les deux propositions : chacune tient seule, et la seconde gagne en force par son isolement. |
| 85 | PREUVES[0].desc — corps de texte (paragraphe de preuve) | `'« Professionnels de la piscine privée à usage familial » — certification délivrée par Socotec Certification France (socotec-certification-international.fr). Disponible sur demande pour tout dossier de prescription.'` | `'« Professionnels de la piscine privée à usage familial », certification délivrée par Socotec Certification France (socotec-certification-international.fr). Disponible sur demande pour tout dossier de prescription.'` | **RÉÉCRIRE** — le cadratin sépare une citation entre guillemets de son explication. Une virgule suffit et est plus correcte après une citation. Le sens est intact. |
| 124 | H1 de section (font-serif, hero split) | `L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription.` | `L'exécutant haut de gamme que vos clients méritent, et qui fait honneur à votre prescription.` | **RÉÉCRIRE** — H1 affiché en grand. Cadratin avant « et » dans un titre = tic proscrit. La virgule préserve la structure à deux membres sans cadratin. |

---

### 1.9 src/app/contact/page.tsx

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 19 | `metadata.title` (meta-title, SERP) | `'Parlez-nous de votre projet — Contact, Yvelines 78/92'` | Inchangé | **GARDER** — convention meta-title SEO. |
| 21 | `metadata.description` (meta-description, SERP) | `"Décrivez-nous votre projet extérieur — piscine, jardin ou les deux. Un seul interlocuteur pour les belles propriétés du 78/92. Nous vous répondons."` | `"Décrivez-nous votre projet extérieur : piscine, jardin ou les deux. Un seul interlocuteur pour les belles propriétés du 78/92. Nous vous répondons."` | **RÉÉCRIRE** — meta-description visible dans les SERP. Le cadratin introduit une liste ; le deux-points est la ponctuation correcte. |

---

### 1.10 src/content/faq.ts

| Ligne | Contexte (prop/rôle) | Texte AVANT | Texte APRÈS | Verdict |
|-------|---------------------|-------------|-------------|---------|
| 18 | FAQ_NOTRE_APPROCHE Q1, champ `a` (réponse FAQ affichée dans FaqSection et JSON-LD) | `intervention indépendante pour la conception, la construction, la rénovation ou l'entretien de piscines — membre du réseau L'Esprit Piscine et certifié Socotec CSP/ESP-001.` | `intervention indépendante pour la conception, la construction, la rénovation ou l'entretien de piscines. Membre du réseau L'Esprit Piscine et certifié Socotec CSP/ESP-001.` | **RÉÉCRIRE** — le cadratin précède une incise de qualification longue dans un corps de texte FAQ. Deux propositions distinctes : un point est plus lisible et permet à la certification de se poser seule, ce qui renforce son poids. |
| 26 | FAQ_NOTRE_APPROCHE Q3, champ `a` | `certifié Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial » et membre du réseau L'Esprit Piscine — deux certifications délivrées par des organismes tiers indépendants` | `certifié Socotec CSP/ESP-001 « Professionnels de la piscine privée à usage familial » et membre du réseau L'Esprit Piscine : deux certifications délivrées par des organismes tiers indépendants` | **RÉÉCRIRE** — le cadratin introduit une explication. Le deux-points est la ponctuation correcte pour introduire une précision sur ce qui vient d'être listé. |
| 30 | FAQ_NOTRE_APPROCHE Q4, champ `a` | `Vous nous décrivez votre projet en quelques mots — sans plan ni budget précis.` | `Vous nous décrivez votre projet en quelques mots, sans plan ni budget précis.` | **RÉÉCRIRE** — incise courte dans une réponse FAQ. La virgule est la ponctuation correcte et plus naturelle. |
| 45 | FAQ_PRESCRIPTEURS Q3, champ `a` | `Vous nous présentez à votre client si vous le souhaitez — ou pas.` | `Vous nous présentez à votre client si vous le souhaitez, ou pas.` | **RÉÉCRIRE** — cadratin avant une alternative courte. La virgule suffit ; le cadratin ici sert d'emphase non justifiée (l'effet voulu est obtenu par la brièveté de « ou pas » seul). |
| 49 | FAQ_PRESCRIPTEURS Q4, champ `a` | `nous assurons la co-conception eau et végétal depuis un interlocuteur unique — piscine et jardin pensés ensemble dès la phase de plan` | `nous assurons la co-conception eau et végétal depuis un interlocuteur unique : piscine et jardin pensés ensemble dès la phase de plan` | **RÉÉCRIRE** — le cadratin introduit une précision sur ce qui vient d'être affirmé. Le deux-points est la ponctuation correcte. |

---

### 1.11 src/content/realisations.ts — titres de fiches (affichés en H1 de fiche + cards)

| Ligne | Texte AVANT | Texte APRÈS | Verdict |
|-------|-------------|-------------|---------|
| 98 | `'Piscine à débordement en lisière de forêt — Yvelines'` | `'Piscine à débordement en lisière de forêt, Yvelines'` | **RÉÉCRIRE** — titre affiché en H1 de fiche réalisation. Le cadratin séparateur avant la zone est un tic structurel généralisé dans tous les titres de fiches. La virgule est la ponctuation correcte pour séparer un titre descriptif de sa localisation. |
| 117 | `'Piscine et jardin intégrés autour d'une terrasse — Yvelines'` | `'Piscine et jardin intégrés autour d'une terrasse, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 136 | `'Bassin miroir devant une demeure de caractère — Yvelines'` | `'Bassin miroir devant une demeure de caractère, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 155 | `'Piscine à paroi vitrée et margelles en travertin — Yvelines'` | `'Piscine à paroi vitrée et margelles en travertin, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 174 | `'Piscine à paroi vitrée en parement de pierre — Hauts-de-Seine'` | `'Piscine à paroi vitrée en parement de pierre, Hauts-de-Seine'` | **RÉÉCRIRE** — même règle. |
| 193 | `'Piscine intégrée dans un jardin arboré — Yvelines'` | `'Piscine intégrée dans un jardin arboré, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 212 | `'Piscine et large terrasse en bois — Hauts-de-Seine'` | `'Piscine et large terrasse en bois, Hauts-de-Seine'` | **RÉÉCRIRE** — même règle. |
| 231 | `'Piscine enterrée au pied d'une maison en brique — Hauts-de-Seine'` | `'Piscine enterrée au pied d'une maison en brique, Hauts-de-Seine'` | **RÉÉCRIRE** — même règle. |
| 250 | `'Bassin compact dans un jardin paysagé en terrasses — Hauts-de-Seine'` | `'Bassin compact dans un jardin paysagé en terrasses, Hauts-de-Seine'` | **RÉÉCRIRE** — même règle. |
| 269 | `'Pool-house à toiture végétalisée et jardin structuré — Yvelines'` | `'Pool-house à toiture végétalisée et jardin structuré, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 288 | `'Piscine intérieure en béton brut, ouverte sur le jardin — Yvelines'` | `'Piscine intérieure en béton brut, ouverte sur le jardin, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 307 | `'Couloir de nage intérieur sous charpente bois — Yvelines'` | `'Couloir de nage intérieur sous charpente bois, Yvelines'` | **RÉÉCRIRE** — même règle. |
| 326 | `'Piscine intérieure sous véranda, ambiance de soirée — Hauts-de-Seine'` | `'Piscine intérieure sous véranda, ambiance de soirée, Hauts-de-Seine'` | **RÉÉCRIRE** — même règle. |
| 345 | `'Jardin paysagé et bassin de nage devant une maison bois — Hauts-de-Seine'` | `'Jardin paysagé et bassin de nage devant une maison bois, Hauts-de-Seine'` | **RÉÉCRIRE** — même règle. |

> **Note @fullstack** : la chaîne regex ligne 390 (`r.title.replace(/\s*[—-]\s*(Yvelines|Hauts-de-Seine).*$/u, '')`) devra être mise à jour en même temps pour matcher la nouvelle ponctuation virgule. Nouvelle regex : `r.title.replace(/\s*,\s*(Yvelines|Hauts-de-Seine).*$/u, '')`. Ligne 390 est de la logique de code, pas du copy — la prise en charge est celle de @fullstack.

---

### 1.12 src/lib/contact-validation.ts — messages d'erreur (affichés inline dans le formulaire)

| Ligne | Texte AVANT | Texte APRÈS | Verdict |
|-------|-------------|-------------|---------|
| 20 | `"L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr)."` | `"L'adresse email semble incorrecte. Vérifiez le format : prenom@domaine.fr."` | **RÉÉCRIRE** — message d'erreur affiché dans le formulaire. Le cadratin dans un micro-copy d'erreur est un tic (l'utilisateur n'a pas besoin d'effet stylistique dans un contexte d'erreur). Deux phrases courtes et directes. Le registre empathique est préservé. |
| 22 | `'Ce numéro ne semble pas valide — vérifiez ou laissez ce champ vide si vous préférez.'` | `'Ce numéro ne semble pas valide. Vérifiez-le ou laissez ce champ vide si vous préférez.'` | **RÉÉCRIRE** — même raison. Deux phrases courtes. Ajout de « -le » pour éviter l'ellipse (« vérifiez » quoi ? → « Vérifiez-le »). |
| 25 | `'Décrivez votre projet en quelques mots — cela guidera notre premier échange.'` | `'Décrivez votre projet en quelques mots : cela guidera notre premier échange.'` | **RÉÉCRIRE** — le cadratin introduit une conséquence. Le deux-points est la ponctuation correcte. |

---

### 1.13 src/lib/seo.ts — textes dans les données structurées JSON-LD (non affichés en page)

Les lignes 96, 106, 107 contiennent des cadratins dans des chaînes JSON-LD injectées en `<script type="application/ld+json">`. Ces textes ne sont pas affichés à l'utilisateur dans la page — ils sont lus par les moteurs de recherche. La règle typographique du fondateur ne s'applique pas à ce périmètre.

| Ligne | Texte | Verdict |
|-------|-------|---------|
| 96 | `'Certification Socotec CSP/ESP-001 — Professionnels de la piscine privée à usage familial'` | **GARDER-SEO** — chaîne JSON-LD, non affichée en page. |
| 106 | `"Trophée d'Or FPP 2024 — Piscine intérieure (Fédération des Professionnels de la Piscine et du Spa)"` | **GARDER-SEO** — chaîne JSON-LD, non affichée en page. |
| 107 | `'Award Bronze EUSA 2025 — Piscines intérieures privées (European Union of Swimming Pools and Spas)'` | **GARDER-SEO** — chaîne JSON-LD, non affichée en page. |

---

### 1.14 src/app/notre-approche/page.tsx — imageAlt OG

| Ligne | Texte | Verdict |
|-------|-------|---------|
| 37 | `"Bureau d'études intégré Aqua System et Les Terres Essentielles"` | **GARDER** — pas de cadratin ici (ligne citée pour mémoire, aucun cadratin). |

---

## SECTION 2 — Occurrences dans les meta-titles (résumé consolidé)

Toutes les occurrences `SITE_NAME — SITE_TAGLINE` ou `titre — SITE_NAME` dans les meta-titles (`metadata.title`, `openGraph.title`, `metadata.title.default`, `metadata.title.template`) sont **GARDER** : convention universelle SEO, non affichée dans la page HTML rendue à l'utilisateur.

---

## RÉCAPITULATIF CHIFFRÉ

| Statut | Nombre d'occurrences |
|--------|---------------------|
| **RÉÉCRIRE** | 34 |
| **GARDER** (incise justifiée corps de texte) | 0 en titres, 3 dans JSON-LD |
| **GARDER** (meta-title SEO convention) | 9 |
| **GARDER-SEO** (JSON-LD invisible) | 3 |
| **Total inventorié** | 49 |

> Après application des RÉÉCRIRE : 0 cadratin restant dans les titres (H1/H2/hero/sous-titres) et meta-descriptions.

---

## SECTION 3 — Ordre de priorité d'application (@fullstack)

1. **Priorité absolue (P0)** — hero sous-titres et H1 : `page.tsx` ligne 68, `piscines-bien-etre/page.tsx` ligne 54, `jardins-paysage/page.tsx` ligne 72, `la-maison/page.tsx` ligne 80, `prescripteurs/page.tsx` ligne 124
2. **Priorité haute (H2 et amorces affichées en grand)** : `notre-approche/page.tsx` lignes 168 et 109, `jardins-paysage/page.tsx` ligne 126, `prescripteurs/page.tsx` ligne 72, `page.tsx` lignes 186 et `realisations/page.tsx` ligne 58
3. **Titres de fiches réalisations** : `realisations.ts` — 14 occurrences + mise à jour regex ligne 390
4. **Corps de texte et FAQ** : `la-maison/page.tsx` VALEURS, `faq.ts`, `contact-validation.ts`
5. **Meta-descriptions** : `la-maison/page.tsx` ligne 28, `notre-approche/page.tsx` ligne 27, `contact/page.tsx` ligne 21

---

## SECTION 4 — Note sur les occurrences hors périmètre (commentaires)

Les occurrences suivantes sont dans des commentaires de code et ne sont jamais rendues à l'utilisateur. Elles ne sont pas soumises à la règle typographique. Elles figurent ici uniquement pour exhaustivité.

`layout.tsx` L17, L97, L108 — `realisations/page.tsx` L8, L11, L15, L34 — `realisations/[slug]/page.tsx` L20–41 — `piscines-bien-etre/page.tsx` L13–19, L41, L89 — `jardins-paysage/page.tsx` L13–19, L41, L79, L94 — `la-maison/page.tsx` L24–44, L73, L103, L145, L151, L203, L210 — `notre-approche/page.tsx` L22, L34, L44, L49, L180 — `prescripteurs/page.tsx` L22, L34, L48, L53, L82, L205, L222 — `contact/page.tsx` L9–17, L25, L33, L44, L75 — `contact/merci/page.tsx` L9–13 — `lib/seo.ts` L11, L28, L35, L58, L120, L140, L182, L203 — `lib/constants.ts` L4, L6, L15, L50, L54, L70, L80, L87, L100 — `lib/analytics.ts` L2, L26, L61 — `lib/contact-validation.ts` L4, L15, L88 — `content/faq.ts` L2, L9 — `content/realisations.ts` L4, L8, L10, L43, L54, L58, L63, L64, L366, L382–391 — `content/jardinerie.ts` L4, L6 — `app/sitemap.ts` L6, L12, L17, L39 — `app/robots.ts` L5, L10.

Ces lignes n'appellent aucune action.
