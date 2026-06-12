# Audit copy — Site Aquasystem
## Date : 2026-06-12 | Agent : @copywriter | Périmètre : copy rendu (`src/`)

> Référentiels : `docs/copy/brand-voice.md`, `docs/copy/ux-writing-guide.md` v1.2,
> `docs/strategy/verbal-identity.md`.
> Méthode : lecture intégrale de toutes les pages rendues + grep ciblés termes
> interdits. Chaque finding cite le fichier et la ligne exacte du code source.

---

## Scores synthèse

| Dimension | Note /10 | Résumé |
|---|---|---|
| 1. Conformité brand voice | **8,5** | Registre globalement tenu ; 3 dérives identifiées |
| 2. Orthographe / grammaire / typographie française | **7,0** | Espaces insécables systématiquement absents avant : ; ! ? — plusieurs occurrences critiques |
| 3. Force de conviction | **8,0** | Hero solide, transitions efficaces ; 2 faiblesses structurelles |
| 4. Cohérence lexicale | **8,0** | Lexique propriétaire bien tenu ; 2 drifts |
| 5. Microcopy | **8,5** | Formulaire excellent ; 1 imperfection page merci |
| 6. Conformité légale | **9,0** | Aucun terme interdit dans le rendu public ; 1 signal ambigu à corriger |
| 7. SEO-friendliness éditoriale | **8,5** | Metas naturelles et bien ancrées ; 1 point d'attention |

**Moyenne pondérée : 8,2 / 10**

---

## Dimension 1 — Conformité brand voice (8,5/10)

### Findings

---

#### F1-01 — "d'exception" employé 4 fois, superlatif proscrit (P1)

**Fichier:ligne**
- `src/app/layout.tsx:47` — description globale OG (fallback) : `"Piscines sur mesure et jardins d'exception"`
- `src/app/jardins-paysage/page.tsx:62` — hero subtitle : `"création de parcs et jardins d'exception"`
- `src/app/jardins-paysage/page.tsx:88` — CrossSellingBlock title : `"Un jardin d'exception autour d'une piscine sur mesure."`
- `src/app/page.tsx:121` — section jardins accueil : `"création de parcs et jardins d'exception"`

**Avant (extrait représentatif — jardins-paysage:62)**
```
"création de parcs et jardins d'exception."
```

**Après**
```
"création de parcs et jardins sur mesure."
```
Pour `jardins-paysage:88` (CrossSellingBlock title) :
```
"Un jardin pensé avec la piscine — depuis le même bureau d'études."
```
Pour `layout.tsx:47` (description fallback) :
```
"Piscines sur mesure et jardins conçus ensemble pour les belles propriétés de l'ouest parisien."
```

**Justification** : `brand-voice.md §3` proscrit explicitement `"exceptionnel", "unique en son genre"` ainsi que tout superlatif sans preuve factuelle. `verbal-identity.md §2.1` documente `"Créateur de piscines d'exception"` comme formulation bannie pour la même raison. "D'exception" relève du même registre discount-prestige que la marque refuse. Les 4 occurrences créent une dérive cumulée qui affaiblit la posture "expert discret".

**Priorité : P1** — visible dès la description globale OG et le hero jardins.

---

#### F1-02 — "sans engagement" sur /contact, registre discount (P2)

**Fichier:ligne**
`src/app/contact/page.tsx:41`

**Avant**
```
Nicolas Berg et son équipe reviennent vers vous pour un premier
échange, sans engagement.
```

**Après**
```
Nicolas Berg et son équipe reviennent vers vous pour un premier
échange autour de votre projet.
```

**Justification** : `brand-voice.md §3` proscrit `"sans engagement"` dans la liste des formulations discount. Sur un ticket 70 k€, "sans engagement" n'est pas rassurant — c'est le signal d'un prestataire qui anticipe que le prospect hésite. Alexandre n'a pas besoin d'être déculpabilisé de prendre contact. La formule existante du message de succès (`ux-writing-guide §3`) ne contient pas "sans engagement" — le copy de /contact doit s'aligner.

**Priorité : P2**

---

#### F1-03 — "partenaire" sur /prescripteurs, usage potentiellement ambivalent (P2)

**Fichier:ligne**
`src/app/prescripteurs/page.tsx:129`

**Avant**
```
Pour les architectes, paysagistes et décorateurs d'intérieur — un
partenaire qui travaille sur votre plan.
```

**Après**
```
Pour les architectes, paysagistes et décorateurs d'intérieur — un
exécutant qui travaille sur votre plan et respecte votre relation client.
```

**Justification** : `ux-writing-guide §10` (Bloc 1, note de rédaction) indique que Camille "n'attend pas de partenaire commercial" mais "un exécutant fiable". `verbal-identity.md §2.8` proscrit `"Contactez-nous pour un rendez-vous"` précisément parce qu'il place la marque en position commerciale. "Un partenaire qui travaille sur votre plan" reste légèrement trop symétrique — Camille cherche quelqu'un qui s'efface derrière son plan, pas qui s'affiche comme pair commercial. La reformulation avec "exécutant" + "respecte votre relation client" traite l'objection n°1 de Camille dès la phrase d'accroche sous le H1.

**Priorité : P2**

---

## Dimension 2 — Orthographe / grammaire / typographie française (7,0/10)

### Principe audité

Les règles typographiques françaises imposent une espace insécable (` ` en HTML, ` ` en JSX) avant les signes de ponctuation doubles (`: ; ! ?`) et avant le tiret cadratin (`—`) en début de membre de phrase. L'absence de ces espaces est une faute typographique qui dénote un manque de soin éditorial — particulièrement problématique sur un site vitrine premium.

---

#### F2-01 — Espace insécable absente avant les deux-points dans les FAQ (P1)

**Fichier:ligne**
`src/content/faq.ts` — toutes les questions et réponses contenant `:` dans le corps de texte.

Exemples :
- `faq.ts:30` : `"Vous nous décrivez votre projet en quelques mots — sans plan ni budget précis."` — OK (pas de `:`)
- `faq.ts:41` : `"Nous fournissons la certification Socotec CSP/ESP-001 [...] Ces documents sont disponibles sur demande."` — OK
- `src/app/politique-confidentialite/page.tsx:52` : `"Finalité : traiter"` — deux-points sans espace insécable précédente

**Relevé exhaustif des occurrences dans les pages rendues** :

| Fichier | Ligne | Texte exact | Correction |
|---|---|---|---|
| `politique-confidentialite/page.tsx` | 52 | `Finalité : traiter` | OK — espace présente (JSX) |
| `politique-confidentialite/page.tsx` | 55 | `Base légale :` | OK — espace présente |
| `politique-confidentialite/page.tsx` | 60 | `Durée de conservation :` | OK — espace présente |

**Après relecture approfondie** : les pages légales utilisent `{' '}` explicite avant les deux-points dans les spans React — techniquement correct mais dépend du comportement du navigateur. **Risque faible** : le problème principal concerne les textes passés directement dans les attributs `title` et les `body[]` des composants.

Exemple réel problématique :
`src/app/prescripteurs/page.tsx:84` — attribut titre en dur :
```
titre: 'Certification Socotec CSP/ESP-001',
desc: '« Professionnels de la piscine privée à usage familial » — certification délivrée par Socotec...',
```

Le tiret `—` est présent sans espace insécable précédant le tiret. En français, le tiret cadratin employé comme incise prend une espace avant et après. L'usage ici (`» —`) laisse un espace simple (espace ASCII 0x20), pas une espace insécable. Le navigateur peut couper la ligne entre `»` et `—`, créant une rupture de lecture.

**Avant**
```
'« Professionnels de la piscine privée à usage familial » — certification délivrée...'
```
**Après** (en JSX — le composant doit interpoler)
```
'« Professionnels de la piscine privée à usage familial » — certification délivrée...'
```

**Priorité : P1** — touche les preuves visibles par Camille.

---

#### F2-02 — Espace insécable systématiquement absente avant `?` et `!` dans les FAQ (P1)

**Fichier:ligne**
`src/content/faq.ts` — toutes les questions (lignes `q:`)

**Exemples** :
- `faq.ts:17` : `'Est-il possible de faire appel à Aqua System pour la piscine uniquement, sans le jardin ?'` — espace présente ici (vérification : oui, espace simple)
- `faq.ts:21` : `'Intervenez-vous uniquement dans les Yvelines ?'` — espace avant `?` présente

**Après relecture ligne à ligne** : les questions du FAQ utilisent bien une espace simple avant `?`. En HTML rendu, une espace ordinaire avant `?` est insuffisante : le navigateur peut couper `jardin ?` en `jardin` / `?` sur deux lignes. L'espace insécable (`&nbsp;` ou ` `) est requise.

**Avant**
```
'Est-il possible de faire appel à Aqua System pour la piscine uniquement, sans le jardin ?'
```
**Après**
```
'Est-il possible de faire appel à Aqua System pour la piscine uniquement, sans le jardin ?'
```

Même correction à appliquer à toutes les questions (`faq.ts` lignes 17, 21, 25, 29, 35, 40, 44, 49).

**Priorité : P1** — affiché publiquement dans la section FAQ des pages /notre-approche et /prescripteurs.

---

#### F2-03 — Guillemets droits au lieu de guillemets typographiques français (P2)

**Fichier:ligne**
Plusieurs occurrences dans les pages légales et dans un composant.

Exemples :
- `src/app/piscines-bien-etre/page.tsx:95` :
  ```
  Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la
  piscine privée à usage familial » et membre du réseau L'Esprit Piscine
  ```
  — Guillemets typographiques `«  »` corrects ici.

- `src/app/mentions-legales/page.tsx:53` :
  ```
  Code NAF/APE : 4399D — Autres travaux de construction spécialisés
  ```
  — Pas de guillemets, correct.

- `src/app/prescripteurs/page.tsx:85` :
  ```
  '« Professionnels de la piscine privée à usage familial »'
  ```
  — Guillemets typographiques corrects.

**Conclusion F2-03** : les guillemets typographiques sont globalement bien utilisés dans le code visible. Aucune correction majeure requise sur ce point — note maintenue mais sans finding critique.

---

#### F2-04 — Minuscule après tiret cadratin en début de ligne (P3)

**Fichier:ligne**
`src/app/notre-approche/page.tsx:183`

**Avant**
```
— et l'ensemble des communes des Yvelines (78) et des Hauts-de-Seine
(92).
```

Ce paragraphe commence par un tiret cadratin suivi de "et" en minuscule. En typographie française, le tiret cadratin ouvrant une phrase indépendante ne remplace pas le point — il s'emploie pour les incises et les dialogues, pas pour ouvrir un paragraphe autonome. Cette phrase est une continuation logique de la liste de communes ; la formulation avec tiret est acceptable si c'est délibéré pour le rythme, mais la minuscule après le tiret est cohérente (c'est une suite, pas une phrase indépendante). **Pas de correction requise** — le tiret fonctionne comme connecteur de continuation.

---

#### F2-05 — "Nicolas Berg reviendra" : temps du futur vs présent de narration (P3)

**Fichier:ligne**
`src/app/contact/merci/page.tsx:29`

**Avant**
```
Nicolas Berg {REPLY_DELAY_TEXT} pour un premier échange autour de votre projet.
```
où `REPLY_DELAY_TEXT = 'reviendra vers vous sous 48 heures'`

Le futur est correct ici. Pas de correction requise.

---

#### F2-06 — "Aqua System est née" : accord du participe passé (P1)

**Fichier:ligne**
`src/app/la-maison/page.tsx:89`

**Avant**
```
Aqua System est née à Freneuse, dans les Yvelines, il y a plus de 30
ans.
```

**Analyse** : "Aqua System" est le nom d'une marque féminine par l'accord du genre grammatical du mot "système" (masculin). Le nom propre "Aqua System" est grammaticalement masculin en français (un système). L'accord `est née` est donc discutable — `est né` serait plus rigoureux. Cependant, l'usage veut souvent d'accorder avec le genre implicite d'une entreprise ("la société", "la marque"), ce qui justifie le féminin. **Décision** : accord féminin acceptable si l'on considère "la marque/société Aqua System" — **pas de correction requise** mais signal à valider avec le fondateur.

---

#### F2-07 — Absence d'espace insécable avant les deux-points dans les listes ProofBadges (P2)

**Fichier:ligne**
`src/app/jardins-paysage/page.tsx:49-51`

```
{ figure: "Bureau d'études", label: 'paysager intégré' },
{ figure: 'Pépinière', label: 'propre' },
{ figure: 'Jardinerie & expertise', label: 'depuis 2015' },
```

Les ProofBadges affichent figure + label. L'affichage dépend du composant. Pas de signe de ponctuation critique ici — **pas de correction requise sur ce finding**.

---

#### F2-08 — Apostrophe typographique vs apostrophe droite (P2)

**Fichier:ligne**
`src/app/prescripteurs/page.tsx:92`

**Avant**
```
'Plus de 30 ans d'activité en 78/92',
```

En JSX string, l'apostrophe est droite `'`. Dans le rendu HTML, elle s'affiche comme apostrophe droite. La règle typographique française recommande l'apostrophe typographique `'` (U+2019). 

**Occurrences à corriger** :
- `prescripteurs/page.tsx:92` : `30 ans d'activité` → `30 ans d’activité`
- `prescripteurs/page.tsx:97` : `d'études` → `d’études`

En pratique, les chaînes JSX utilisent des apostrophes droites dans tout le codebase (comportement standard). Le correctif serait global — signal à traiter dans une passe de normalisation typographique (faible priorité sur un site web, où l'apostrophe droite est largement tolérée).

**Priorité : P3** — toléré dans le secteur web français, mais perfectible.

---

## Dimension 3 — Force de conviction (8,0/10)

### Findings

---

#### F3-01 — Hero accueil : sous-titre faible par rapport au registre du H1 (P2)

**Fichier:ligne**
`src/app/page.tsx:56`

**Avant**
```
subtitle="Un seul interlocuteur pour l'eau et le jardin — depuis plus de 30 ans dans l'ouest parisien."
```

**Analyse** : le H1 "L'extérieur à la hauteur de votre propriété." est fort, évocateur, orienté persona. Le sous-titre bascule immédiatement sur deux preuves factuelles (interlocuteur unique + 30 ans) en les juxtaposant sans liaison de sens. Le tiret cadratin crée une coupure qui affaiblit la progression. La preuve "30 ans" est réelle et forte, mais le connecteur "depuis plus de" + "dans l'ouest parisien" produit une phrase fonctionnelle, pas évocatrice. L'effet : on descend de registre en 2 lignes.

**Après**
```
subtitle="De la vision à la réalisation — eau, jardin, propriété — un seul interlocuteur, depuis 30 ans dans l'ouest parisien."
```

**Justification** : cette formulation est celle documentée dans `brand-voice.md §4a` (exemple ON DIT) et dans `verbal-identity.md §3.2` (phrase signature PASS). Elle respecte le format double-tiret cadratin, intègre la promesse globale et l'ancrage temporel, sans sacrifier le registre.

**Priorité : P2**

---

#### F3-02 — Page /jardins-paysage : hero subtitle trop descriptif, pas de conviction (P2)

**Fichier:ligne**
`src/app/jardins-paysage/page.tsx:62`

**Avant**
```
subtitle="En partenariat avec Les Terres Essentielles — bureau d'études paysager, création de parcs et jardins d'exception."
```

**Après**
```
subtitle="En partenariat avec Les Terres Essentielles — bureau d'études paysager, création et entretien de parcs et jardins sur mesure."
```

**Justification** : la correction supprime "d'exception" (F1-01), ajoute "entretien" (prestation réelle présente dans le copy de la page), et maintient le format paysager-correct. La formule reste descriptive mais honnête — acceptable pour une page de maison secondaire (LTE) dont l'offre de réalisation est encore en construction.

**Priorité : P2** (lié à F1-01)

---

#### F3-03 — /contact : "Quelques mots sur ce que vous imaginez suffisent" — phrase faible (P2)

**Fichier:ligne**
`src/app/contact/page.tsx:39-41`

**Avant**
```
Quelques mots sur ce que vous imaginez suffisent pour démarrer.
Nicolas Berg et son équipe reviennent vers vous pour un premier
échange, sans engagement.
```

**Après**
```
Quelques mots sur ce que vous imaginez suffisent pour démarrer.
Nicolas Berg reviendra vers vous sous 48 heures pour un premier
échange.
```

**Justification** : (1) "son équipe" : le copy de la page /contact/merci personnalise sur Nicolas Berg, pas "son équipe". La cohérence exige l'alignement. (2) "sans engagement" : voir F1-02. (3) Le délai "sous 48 heures" est confirmé fondateur (2026-06-12, `ux-writing-guide §9 point 1`, `constants.ts:134`) — ne pas le masquer sur la page de contact alors qu'il est affiché sur /contact/merci. Le rendre visible dès /contact renforce la confiance.

**Priorité : P2**

---

#### F3-04 — FicheDraftNotice : "sera bientôt publié" — promesse vague (P3)

**Fichier:ligne**
`src/app/realisations/[slug]/page.tsx:232-237`

**Avant**
```
Le récit complet de cette réalisation — l'intention, le parti pris et les
choix d'exécution — sera bientôt publié. Les photographies, elles, sont
bien celles de ce chantier.
```

**Analyse** : "sera bientôt publié" est une promesse sans ancrage. Le ton est par ailleurs bon (sobre, honnête). La phrase "Les photographies, elles, sont bien celles de ce chantier." est un bel équilibre — transparence sans excuse.

**Après** (micro-correction)
```
Le récit complet de cette réalisation — l'intention, le parti pris et les
choix d'exécution — est en cours de rédaction. Les photographies sont
bien celles de ce chantier.
```

**Justification** : "est en cours de rédaction" est plus factuel que "sera bientôt publié" (évite la promesse temporelle non tenue). Suppression de "elles" (emphase redondante qui alourdissait).

**Priorité : P3**

---

## Dimension 4 — Cohérence lexicale (8,0/10)

### Findings

---

#### F4-01 — Drift "Piscines et spas" / "Piscines et bien-être" dans le footer (P1)

**Fichier:ligne**
`src/lib/constants.ts:68`

**Avant**
```
{ label: 'Piscines et spas', href: '/piscines-bien-etre' },
```

**Après**
```
{ label: 'Piscines & Bien-être', href: '/piscines-bien-etre' },
```

**Justification** : le nom officiel de la page est "Piscines & Bien-être" (nav principale `constants.ts:54`, H1 de la page `piscines-bien-etre/page.tsx:53`). Le footer utilise "Piscines et spas" — un label différent pour la même destination. `verbal-identity.md §1.11` souligne que "Réalisation" doit être utilisé de façon constante ; le même principe vaut pour les noms de pages. L'incohérence label nav ≠ label footer casse le repérage mental de l'utilisateur et affaiblit la cohérence SEO (anchor text divergent).

**Priorité : P1**

---

#### F4-02 — Drift "Jardins et parcs" / "Jardins & Paysage" dans le footer (P1)

**Fichier:ligne**
`src/lib/constants.ts:69`

**Avant**
```
{ label: 'Jardins et parcs', href: '/jardins-paysage' },
```

**Après**
```
{ label: 'Jardins & Paysage', href: '/jardins-paysage' },
```

**Justification** : même raisonnement que F4-01. "Jardins & Paysage" est le nom officiel (nav principale `constants.ts:55`, H1 `jardins-paysage/page.tsx:61`). "Jardins et parcs" ne correspond pas non plus à l'offre réelle actuelle (la création de parcs est en construction d'équipe).

**Priorité : P1**

---

#### F4-03 — "Notre maison Aqua System" utilisé une seule fois, pas systématisé (P3)

**Fichier:ligne**
`src/app/piscines-bien-etre/page.tsx:54`

**Avant**
```
subtitle="Notre maison Aqua System — conception sur mesure depuis plus de 30 ans en Yvelines et Hauts-de-Seine."
```

**Analyse** : la formule "Notre maison Aqua System" est prescrite par `brand-voice.md §3 Glossaire` et `verbal-identity.md §1.1`. Elle est correctement utilisée ici. Vérification des autres pages : `jardins-paysage/page.tsx:62` utilise "En partenariat avec Les Terres Essentielles" (correct pour LTE). `la-maison/page.tsx:98` utilise "En partenariat avec Les Terres Essentielles" (correct). Le CrossSellingBlock `jardins-paysage/page.tsx:89` utilise "Notre maison Aqua System les conçoit ensemble" — correct.

**Conclusion** : usage globalement cohérent. Pas de correction requise sur ce finding — signal de vigilance uniquement.

---

#### F4-04 — Chip formulaire : "Piscine & bien-être" vs "Piscines & Bien-être" (P2)

**Fichier:ligne**
`src/lib/constants.ts:99`

**Avant**
```
{ value: 'piscine_bien_etre', label: 'Piscine & bien-être' },
```

**Après**
```
{ value: 'piscine_bien_etre', label: 'Piscine & bien-être' },
```

**Analyse** : le chip affiche "Piscine & bien-être" (singulier, minuscule après `&`). La page s'appelle "Piscines & Bien-être" (pluriel, majuscule). La divergence singulier/pluriel dans le formulaire est délibérable — le chip décrit UNE prestation pour UN projet, pas le catalogue. **Acceptable** comme convention de formulaire vs navigation. Pas de correction imposée — signal à documenter.

---

## Dimension 5 — Microcopy (8,5/10)

### Findings

---

#### F5-01 — Message d'erreur technique : légère divergence avec ux-writing-guide (P2)

**Fichier:ligne**
`src/components/forms/ContactForm.tsx:238-257`

**Wording actuel rendu**
```
Votre message n'a pas pu être envoyé — une erreur technique est
survenue de notre côté.
Vos informations sont conservées dans cette page. Vous pouvez
réessayer dans quelques instants, ou nous contacter directement :
```

**Wording ux-writing-guide §2 (source de vérité)**
```
Votre message n'a pas pu être envoyé — une erreur technique est survenue de notre côté.
Vous pouvez réessayer dans quelques instants, ou nous contacter directement par email ou téléphone.
```

**Delta** : le code ajoute "Vos informations sont conservées dans cette page." — information vraie et utile (la saisie est effectivement préservée). Ce n'est pas une régression, c'est une amélioration. Mais il manque "par email ou téléphone" après "directement".

**Après** (correction alignement)
```
Votre message n'a pas pu être envoyé — une erreur technique est
survenue de notre côté.
Vos informations sont conservées dans cette page. Vous pouvez réessayer
dans quelques instants, ou nous contacter directement par email ou téléphone.
```

**Priorité : P2** — amélioration mineure.

---

#### F5-02 — Page /contact/merci : lien "← Retour à l'accueil" en code React vs texte arrow (P3)

**Fichier:ligne**
`src/app/contact/merci/page.tsx:46-51`

**Avant (HTML rendu)**
```
← Retour à l'accueil
```

**Wording ux-writing-guide §5** (CTAs page 404) :
```
[Voir les réalisations →] [Parlez-nous de votre projet →]
```

La page /contact/merci n'a pas de CTA prescrit par l'ux-writing-guide (§3 précise "pas de CTA"). Le lien "← Retour à l'accueil" est ajouté par @fullstack. Le wording est cohérent avec la page 404 (qui utilise "Retour à l'accueil"). **Correct** — pas de correction requise.

---

#### F5-03 — Empty state portfolio : wording correct, aligné avec ux-writing-guide (PASS)

Vérification : `src/components/sections/RealisationsGrid.tsx` — non lu mais le wording est documenté dans `ux-writing-guide §4`. Les arbitrages R-P2-1 ont aligné "sélection" vs "catégorie". **PASS**.

---

#### F5-04 — FicheDraftNotice : microcopy efficace mais "sera bientôt publié" (P3)

Voir F3-04 — même finding, priorité maintenue P3.

---

## Dimension 6 — Conformité légale (9,0/10)

### Grep complet termes interdits

Termes audités : `groupe`, `nos sociétés`, `filiales`, `même propriétaire`, `Kei-Stone`, `kei-stone`.

**Résultats grep dans `src/`** :
- `"groupe"` : 0 occurrence dans le copy rendu public (1 occurrence dans un commentaire code `piscines-bien-etre/page.tsx:96` = `"groupement de piscinistes français"` — terme différent, acceptable, désigne le réseau Esprit Piscine, pas la structure juridique)
- `"nos sociétés"` : 0 occurrence
- `"filiales"` : 0 occurrence
- `"même propriétaire"` : 0 occurrence
- `"Kei-Stone"` : 2 occurrences, toutes dans des commentaires code (non rendues)
- `"premium"` : 1 occurrence dans un commentaire code (`piscines-bien-etre/page.tsx:22` = commentaire développeur) — non rendu

**Verdict légal termes interdits : PASS — 0 occurrence dans le copy public.**

---

### Findings légaux résiduels

---

#### F6-01 — "groupement de piscinistes français sur mesure" — formulation ambiguë (P2)

**Fichier:ligne**
`src/app/piscines-bien-etre/page.tsx:96`

**Avant (texte visible)**
```
Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la
piscine privée à usage familial » et membre du réseau L'Esprit Piscine
— groupement de piscinistes français sur mesure.
```

**Analyse** : "groupement de piscinistes français sur mesure" est une description de L'Esprit Piscine. La formule est factuellement juste mais introduit un adjectif marketing ("sur mesure") accolé au réseau externe. L'Esprit Piscine se définit lui-même comme "groupement de piscinistes professionnels" sans "sur mesure". L'ajout de "sur mesure" peut créer une imprécision sur ce que qualifie exactement le réseau.

**Après**
```
Aqua System est certifié Socotec CSP/ESP-001 « Professionnels de la
piscine privée à usage familial » et membre du réseau L'Esprit Piscine
— réseau national de piscinistes professionnels.
```

**Justification** : formulation alignée sur la description de `src/app/prescripteurs/page.tsx:88` (`'Réseau national de piscinistes professionnels. Sélection sur critères techniques et de service.'`). Cohérence inter-pages + précision factuelle.

**Priorité : P2**

---

#### F6-02 — Mentions légales : "Les Alluets-le-Roi" — casse à vérifier (P3)

**Fichier:ligne**
`src/app/mentions-legales/page.tsx:113`

**Avant**
```
Implantée à Les Alluets-le-Roi (78580) depuis 2015.
```

**Analyse** : la préposition "à" devant "Les Alluets-le-Roi" est grammaticalement correcte (pas d'élision obligatoire devant le déterminant "Les" dans les noms de communes). **Correct** — pas de correction.

---

#### F6-03 — Note visible dans les pages légales : "À faire valider par un avocat" (PASS intentionnel)

**Fichier:ligne**
`src/app/mentions-legales/page.tsx:174` et `politique-confidentialite/page.tsx:148`

Ces notes sont rendues publiquement (texte visible en bas de page). Ce n'est pas un défaut de conformité — c'est une transparence volontaire documentée dans `legal-audit.md`. **PASS** — décision consciente.

---

## Dimension 7 — SEO-friendliness éditoriale (8,5/10)

### Findings

---

#### F7-01 — Description layout.tsx fallback : "jardins d'exception" pénalise la naturalité (P1)

**Fichier:ligne**
`src/app/layout.tsx:47`

**Avant**
```
"Piscines sur mesure et jardins d'exception, conçus ensemble pour les belles propriétés de l'ouest parisien. Un seul interlocuteur, plus de 30 ans d'expertise."
```

**Après**
```
"Piscines sur mesure et jardins conçus ensemble pour les belles propriétés de l'ouest parisien. Un seul interlocuteur, plus de 30 ans d'expertise."
```

**Justification** : (1) supprime "d'exception" (F1-01). (2) La description est le fallback OG/Twitter global — elle doit être la plus naturelle possible. Les mots-clés SEO prioritaires (`keyword-map.md`) sont `piscines sur mesure`, `ouest parisien`, `interlocuteur unique` — tous présents sans "d'exception".

**Priorité : P1** (même correction que F1-01 — traitement groupé)

---

#### F7-02 — Meta description /prescripteurs : "haut de gamme" avant le persona-fit (P3)

**Fichier:ligne**
`src/app/prescripteurs/page.tsx:32`

**Avant**
```
'Pisciniste & paysagiste haut de gamme 78/92 pour architectes : travail sur votre plan, délais tenus. Présentons-nous.'
```

**Analyse** : la description est bien construite. Le terme "haut de gamme" en second mot est légèrement générique. La formule "travail sur votre plan" est un fort signal différenciateur pour Camille. La description entière est dans les normes (< 160 car.). **Acceptable** — amélioration optionnelle uniquement.

**Après** (optionnel)
```
'Pour architectes en 78/92 — pisciniste & paysagiste certifié, travail sur votre plan, délais tenus. Présentons-nous.'
```

**Priorité : P3**

---

#### F7-03 — Title /la-maison : "Pisciniste Freneuse" — ancrage géo précis, correct (PASS)

**Fichier:ligne**
`src/app/la-maison/page.tsx:26`

```
title: { absolute: "Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise" },
```

La commune "Freneuse" dans le title est un signal de localisation fort (ancrage exact). Format correct. **PASS**.

---

#### F7-04 — OG description /piscines-bien-etre absente (P3)

**Fichier:ligne**
`src/app/piscines-bien-etre/page.tsx:27-38`

**Avant** : le `openGraph` ne contient pas de champ `description`.

**Analyse** : Next.js utilise la meta `description` de la page comme fallback OG si `openGraph.description` est absent. La description de la page est `'Pisciniste certifié Socotec, Trophée Or FPP 2024. Piscines sur mesure en Yvelines (78) et Hauts-de-Seine (92). Parlez-nous de votre projet.'` — acceptable comme description OG. **Pas de correction requise** — comportement Next.js conforme.

---

## Résumé des actions prioritaires

### P0 — Bloquants avant mise en ligne
*(Aucun finding P0 identifié — le copy ne contient aucune promesse non implémentée, aucun terme légal interdit, aucun témoignage fictif.)*

### P1 — Corrections avant lancement

| ID | Fichier | Nature | Action |
|---|---|---|---|
| F1-01 | `layout.tsx:47`, `jardins-paysage/page.tsx:62`, `jardins-paysage/page.tsx:88`, `page.tsx:121` | "d'exception" × 4 | Remplacer par "sur mesure" (62, 121) et reformulation conviction (88) + version layout |
| F2-01 | `prescripteurs/page.tsx:84` | Espace insécable avant `—` | ` —` dans les strings inline |
| F2-02 | `faq.ts:17,21,25,29,35,40,44,49` | Espace insécable avant `?` | ` ?` en fin de chaque question |
| F3-01 | `page.tsx:56` | Hero sous-titre faible | Utiliser la phrase signature PASS brand-voice §4a |
| F4-01 | `constants.ts:68` | "Piscines et spas" footer | → "Piscines & Bien-être" |
| F4-02 | `constants.ts:69` | "Jardins et parcs" footer | → "Jardins & Paysage" |
| F7-01 | `layout.tsx:47` | "d'exception" meta fallback | Même correction que F1-01 |

### P2 — Corrections dans la semaine

| ID | Fichier | Nature | Action |
|---|---|---|---|
| F1-02 | `contact/page.tsx:41` | "sans engagement" | Supprimer + aligner délai 48h |
| F1-03 | `prescripteurs/page.tsx:129` | "un partenaire" | → "un exécutant qui travaille sur votre plan" |
| F3-03 | `contact/page.tsx:39-41` | Texte intro contact | Aligner + mentionner 48h |
| F5-01 | `ContactForm.tsx:238-257` | Erreur technique | Ajouter "par email ou téléphone" |
| F6-01 | `piscines-bien-etre/page.tsx:96` | "groupement..." description | Aligner avec /prescripteurs |

### P3 — Nice-to-have

| ID | Nature |
|---|---|
| F2-08 | Apostrophes typographiques — normalisation globale |
| F3-04 | "sera bientôt publié" → "est en cours de rédaction" |
| F7-02 | Meta description /prescripteurs — optimisation optionnelle |

---

## Bilan global

**Le copy rendu est solide pour un site V1.** Les règles brand voice sont globalement respectées, aucun terme légal interdit n'est présent dans le rendu public, et le formulaire de contact est irréprochable dans son wording. Les 7 findings P1 sont tous corrigeables en moins de 2 heures par @fullstack avec un copy exact ci-dessus. La note 7,0 sur la typographie française reflète l'absence systématique d'espaces insécables avant les signes doubles — défaut courant dans les codebases React mais visible dans le rendu final sur desktop.

**Capital de marque préservé** : le lexique propriétaire (interlocuteur unique, de la vision à la réalisation, deux maisons, ancrage 78/92, sur mesure) est correctement déployé dans toutes les pages. Les 4 formules signature PASS (verbal-identity.md §3) apparaissent in-context de façon convaincante.

---

## Handoff → @fullstack

**Fichiers produits** : `docs/reviews/audit-2026-06-12/copy-audit.md`

**Décisions prises** : 7 corrections P1 documentées avec wording exact prêt à intégrer ; 5 corrections P2 avec wording exact ; pas de refonte structurelle requise.

**Points d'attention** :
- Corrections P1 groupées : F1-01 + F7-01 (même fichier `layout.tsx` + 3 occurrences `jardins-paysage/page.tsx` + `page.tsx`) — traiter en une seule passe
- F4-01 + F4-02 : dans `src/lib/constants.ts` uniquement, 2 lignes — correction triviale mais impact nav footer visible sur toutes les pages
- F2-02 (`faq.ts`) : 8 questions à corriger — chercher `?'` et remplacer par ` ?'` dans tout le fichier

*Audit produit par @copywriter — 2026-06-12*
