# Arbitrages P0 — Checkpoint specs Phase 1
## Aquasystem [PROVISOIRE] — 2026-06-11

> Arbitre : @product-manager
> Hiérarchie : persona principal > KPI North Star > budget. Obligations creative-brief load-bearing.
> Ce document fait autorité sur tous les livrables Phase 1. Il sert de contrat pour les mises à jour @ux, @copywriter, @data-analyst.

---

## P0-1 — URLs des pages (C1)

### Décision arbitrée : URLs longues (version wireframes/page-compositions/user-flows)

**Mapping final des 9 routes — définitif**

| Page | URL définitive | Ancienne URL dans specs |
|------|---------------|------------------------|
| Accueil | `/` | `/` (identique) |
| Piscines & Bien-être | `/piscines-bien-etre` | `/piscines` |
| Jardins & Paysage | `/jardins-paysage` | `/jardins` |
| Notre approche | `/notre-approche` | `/approche` |
| Réalisations | `/realisations` | `/realisations` (identique) |
| La maison | `/la-maison` | `/a-propos` |
| Espace prescripteurs | `/prescripteurs` | `/prescripteurs` (identique) |
| Contact | `/contact` | `/contact` (identique) |
| Mentions légales | `/mentions-legales` | `/mentions-legales` (identique) |

Note : la page `/contact/merci` reste définie par P0-4 ci-dessous.

**Justification** : la majorité des livrables (wireframes, page-compositions, user-flows = 3 fichiers) utilisent les URLs longues. Argument SEO additionnel décisif pour la cible Alexandre : `/piscines-bien-etre` contient le terme "bien-être" (différenciateur premium vs piscinistes concurrents) et `/la-maison` signale l'identité de la marque ombrelle. `/notre-approche` vs `/approche` : l'article "notre" porte la relation humaine attendue par le persona. Le seul livrable en opposition est functional-specs.md, produit en silo — il est aligné.

**Impact page_source analytics** : les valeurs de `page_source` dans les events E-01, E-02, E-03, E-04, E-09 doivent utiliser les slugs sans slash. Mapping :
- `piscines-bien-etre` (remplace `piscines`)
- `jardins-paysage` (remplace `jardins`)
- `notre-approche` (remplace `approche`)
- `la-maison` (remplace `about`)

**Fichiers impactés — modifications exactes attendues**

| Fichier | Section | Modification |
|---------|---------|-------------|
| `docs/product/functional-specs.md` | F-02 ligne URL | `/piscines` → `/piscines-bien-etre` |
| `docs/product/functional-specs.md` | F-03 ligne URL | `/jardins` → `/jardins-paysage` |
| `docs/product/functional-specs.md` | F-04 ligne URL | `/approche` → `/notre-approche` |
| `docs/product/functional-specs.md` | F-06 ligne URL | `/a-propos` → `/la-maison` |
| `docs/product/functional-specs.md` | F-09 liens légaux footer | `/mentions-legales#confidentialite` — vérifier cohérence (voir P1-2) |
| `docs/product/functional-specs.md` | F-01 destinations succès | `/piscines` → `/piscines-bien-etre`, `/jardins` → `/jardins-paysage` |
| `docs/product/functional-specs.md` | F-02 événement E-10 page_path | `"/piscines"` → `"/piscines-bien-etre"` |
| `docs/product/functional-specs.md` | F-03 événement E-10 page_path | `"/jardins"` → `"/jardins-paysage"` |
| `docs/product/functional-specs.md` | F-02/F-03 cross-selling href | liens vers `/jardins` et `/piscines` → `/jardins-paysage` et `/piscines-bien-etre` |
| `docs/product/functional-specs.md` | F-08 smart defaults commentaire | `/piscines-bien-etre`, `/jardins-paysage` |
| `docs/product/functional-specs.md` | F-10 nav desktop | mettre à jour les URLs dans le tableau |
| `docs/analytics/tracking-plan.md` | E-01 enum page_source | `about` → `la-maison`, `piscines` → `piscines-bien-etre`, `jardins` → `jardins-paysage`, `approche` → `notre-approche` |
| `docs/ux/wireframes.md` | Déjà conforme | Aucune modification requise |
| `docs/copy/ux-writing-guide.md` | §6 tableau nav URLs | `Piscines` `/piscines` → `/piscines-bien-etre` ; `Jardins` `/jardins` → `/jardins-paysage` ; `Notre approche` `/approche` → `/notre-approche` |

---

## P0-2 — Structure du formulaire (C2) — CRITIQUE

### Décision arbitrée : chips de qualification OPTIONNELS + champ description texte libre OBLIGATOIRE

**Contexte du conflit** :
- creative-brief.md §9 (obligation non négociable) : « champ "votre projet" (texte libre) — pas de menu déroulant forcé »
- functional-specs + wireframes : checkboxes multi-select obligatoires
- tracking-plan E-01 : `type_projet` typé `Array<enum>` (incompatible texte libre pur)

**Solution retenue : chips/boutons de sélection OPTIONNELS + description texte libre OBLIGATOIRE**

Le brief impose de ne pas FORCER une qualification. Il n'interdit pas de proposer des options de façon non-contraignante. La solution honore les deux impératifs :

1. Des chips (boutons pill, non cochés par défaut) au-dessus du champ description :
   ```
   Votre projet concerne :
   [Piscine & bien-être]  [Jardin & paysage]  [Projet complet]  [Espace prescripteur]
   (sélection optionnelle — cliquer pour ajouter une étiquette)
   ```
   - Aucun chip n'est obligatoire (le formulaire soumet même si zéro chip sélectionné)
   - Sélection multiple possible
   - Smart default par page source : si `?source=piscines-bien-etre` → chip "Piscine & bien-être" pré-activé
   - Visual : état non-sélectionné = contour, sélectionné = fond brand couleur sobre

2. Le champ « Décrivez votre projet » reste un textarea texte libre, OBLIGATOIRE (minimum 20 caractères). C'est ce champ qui répond à l'obligation creative-brief §9.

3. Le champ téléphone : **optionnel** (conforme ux-writing-guide, conforme creative-brief §9 esprit "pas de forçage"). Les leads de qualité existent sans téléphone communiqué.

**Schéma de champ FINAL**

| Champ | ID HTML | Type | Obligatoire | Valeurs / Validation |
|-------|---------|------|-------------|---------------------|
| Prénom et nom | `prenom_nom` | `text` | Oui | Non vide, ≥ 2 chars, ≤ 100 |
| Email | `email` | `email` | Oui | Format RFC 5322 |
| Téléphone | `telephone` | `tel` | **Non — facultatif** | Si rempli : regex `^0[1-9][0-9]{8}$` après nettoyage |
| Votre projet (chips) | `type_projet` | `checkbox` multi (UI en chips) | **Non** | Enum : `piscine_bien_etre` / `jardin_paysage` / `projet_complet` / `prescripteur` — absent du payload si aucun coché |
| Commune | `commune` | `text` | Oui | Non vide, ≤ 100 |
| Budget indicatif | `budget_tranche` | `select` | Non | Enum (cf. P0-3) |
| Description du projet | `description` | `textarea` | Oui | ≥ 20 chars, ≤ 2000 |
| Honeypot | `website` | `text` (caché CSS) | N/A | Doit être vide |
| Langue | `langue` | `hidden` | Auto | `"fr"` |

**Schéma API ContactRequest mis à jour**

```typescript
interface ContactRequest {
  prenom_nom: string;           // obligatoire
  email: string;                // obligatoire
  telephone?: string;           // optionnel — si présent, validé format FR
  type_projet?: Array<          // optionnel — absent si aucun chip sélectionné
    "piscine_bien_etre" | "jardin_paysage" | "projet_complet" | "prescripteur"
  >;
  commune: string;              // obligatoire
  budget_tranche?: string;      // optionnel
  description: string;          // obligatoire, ≥ 20 chars
  langue: string;               // "fr"
  website: string;              // honeypot
}
```

**Impact E-01** : `type_projet` dans l'event devient `Array<string> | null`. La qualification NSM ne change pas : `type_projet` non null reste un critère — un lead sans chip mais avec une bonne description est valide (Nicolas lit la description). La qualification fine (piscine vs jardin) se fait à la lecture du contenu de `description`.

**Raison de la décision téléphone optionnel** : le creative-brief §9 impose une posture de "qualification douce". Forcer le téléphone contredit cette posture pour un persona (Alexandre) qui peut préférer l'email pour un premier contact avec quelqu'un qu'il ne connaît pas. Le lead reste utilisable : Nicolas peut rappeler depuis l'email.

**Fichiers impactés — modifications exactes attendues**

| Fichier | Section | Modification |
|---------|---------|-------------|
| `docs/product/functional-specs.md` | F-08 tableau champs | Téléphone → obligatoire **Non** ; `type_projet` → obligatoire **Non**, type → `checkbox (chips, UI)` |
| `docs/product/functional-specs.md` | F-08 section Valeurs des énumérations type_projet | Mettre à jour enum (4 valeurs, supprimer `prescripteur` comme valeur forcée en V1 — remplacé par chip) |
| `docs/product/functional-specs.md` | F-08 schéma API ContactRequest | `telephone` → optionnel ; `type_projet` → optionnel avec nouveaux slugs |
| `docs/product/functional-specs.md` | F-08 Validations serveur | Supprimer validation obligatoire téléphone ; supprimer validation obligatoire type_projet ; ajouter : si type_projet présent → valider enum |
| `docs/product/functional-specs.md` | F-08 messages erreur inline | Supprimer ligne `telephone` invalide (reste si rempli) ; supprimer ligne `type_projet` non sélectionné (plus obligatoire) |
| `docs/product/functional-specs.md` | F-08 état Défaut | 6 champs + chips optionnels (pas 7-8 champs) |
| `docs/product/functional-specs.md` | F-08 critères d'acceptance | Adapter critère 3 (prescripteur → chip pré-activé, pas "pré-coché") ; supprimer cas erreur "≥ 1 case cochée" |
| `docs/analytics/tracking-plan.md` | E-01 type_projet | Changer type `Array<enum>` → `Array<string> \| null` ; ajouter note "null si aucun chip sélectionné" |
| `docs/ux/wireframes.md` | WF-08 champ "Votre projet" | Remplacer checkboxes par chips optionnels ; téléphone non marqué * |
| `docs/copy/ux-writing-guide.md` | §1 champ 1 et champ 7 | Confirmer : champ 1 = chips (déjà conforme esprit) ; champ 7 téléphone = facultatif (déjà conforme) |

---

## P0-3 — Tranches de budget (C3)

### Décision arbitrée : 4 options, tranches ux-writing-guide validées @copywriter

**Grille définitive**

| Label affiché (UI) | Valeur API | Justification |
|-------------------|-----------|---------------|
| *(Choisir si vous le souhaitez)* | *(absent du payload)* | Option vide par défaut |
| 50 000 – 80 000 € | `50_80k` | Plancher cohérent avec ticket piscine Alexandre (70-80k€ project-context) |
| 80 000 – 150 000 € | `80_150k` | Tranche mid-range projet complet |
| 150 000 € et plus | `150k_plus` | Projets d'envergure — signaux cross-selling forts |
| Je préfère en discuter | `prefere_discuter` | Présent dans ux-writing-guide — permet de ne pas bloquer un lead qui ne veut pas se positionner |

**Décision sur le palier < 50 000 €** : supprimé. Justification persona : le ticket minimum qualifié est 70-80k€ (project-context.md L31). Proposer un palier "< 50 000 €" enverrait un signal ambigu sur le positionnement haut de gamme et ne correspond à aucun projet qualifié selon le NSM. Si un prospect se reconnaît dans ce palier, il le dira dans la description libre.

**Décision sur "Je préfère en discuter"** : maintenu. Il figure dans l'ux-writing-guide validé par @copywriter et correspond à l'esprit "qualification douce" du creative-brief.

**Fichiers impactés — modifications exactes attendues**

| Fichier | Section | Modification |
|---------|---------|-------------|
| `docs/product/functional-specs.md` | F-08 enum `budget_tranche` | Remplacer les 5 options actuelles par les 4 de la grille ci-dessus (supprimer `moins_50k`, `50_100k`, `100_200k`, `200k_plus` ; ajouter `50_80k`, `80_150k`, `150k_plus`, garder `prefere_discuter`) |
| `docs/product/functional-specs.md` | F-08 schéma API | Mettre à jour le commentaire sur `budget_tranche` enum |
| `docs/product/functional-specs.md` | F-08 validations serveur | Mettre à jour l'enum de validation budget_tranche |
| `docs/product/functional-specs.md` | F-08 events E-01 | Mettre à jour exemple `budget_tranche: "50_100k"` → `"50_80k"` |
| `docs/product/functional-specs.md` | F-08 email Nicolas | Mettre à jour l'exemple dans le template email si budget mentionné |
| `docs/analytics/tracking-plan.md` | E-01 propriété `budget_tranche` | Mettre à jour l'enum vers `50_80k` / `80_150k` / `150k_plus` / `prefere_discuter` |
| `docs/ux/wireframes.md` | WF-08 options budget | Remplacer les 4 tranches affichées par les nouvelles |
| `docs/copy/ux-writing-guide.md` | §1 champ 3 | Déjà conforme (50-80/80-150/150+/Je préfère en discuter) — aucune modification |

---

## P0-4 — Comportement succès formulaire (C8)

### Décision arbitrée : page distincte `/contact/merci`

**Justification** :
1. **Tracking E-01 fiable** : un URL distinct est la méthode de mesure la plus robuste pour compter les conversions NSM. Un bloc inline peut être compté plusieurs fois (retour/avance navigateur) ou ne pas être compté si le script Umami charge avant la mutation DOM. L'URL `/contact/merci` = une pageview = un lead = une donnée propre.
2. **Anti-double soumission** : le refresh du navigateur sur `/contact/merci` ne re-soumet pas le formulaire (contrairement à un inline où un refresh pourrait déclencher une re-soumission selon l'implémentation).
3. **Partage URL** : un utilisateur peut bookmarker ou partager la confirmation (cas rare mais sans coût).
4. **Continuité UX** : la page `/contact/merci` peut reproduire le ton sobre attendu par le copywriter (pas de confetti, message sobre) — l'argument de continuité UX est satisfait sur la page de confirmation elle-même.

**Contre-argument inline écarté** : le copy/UX invoquent "ne pas rediriger" pour préserver la continuité. Cet argument est valide pour les sites e-commerce où la confirmation inline évite l'abandon du panier. Sur un site vitrine avec un seul formulaire de contact, le redirect est la norme attendue (LinkedIn, Typeform, tous les formulaires B2B premium) et ne crée pas de friction perçue. Alexandre ne sera pas dérouté par une page de remerciement.

**Implémentation** :
- Route : `/contact/merci` (page statique Next.js)
- Contenu : wording ux-writing-guide §3 (texte sobre, pas de CTA) — voir wording final section P0-4a
- Comportement retour : retour arrière navigateur → `/contact` avec formulaire vide (comportement natif export statique)
- Event E-01 : déclenché côté client AVANT le redirect (`trackEvent(...)` puis `router.push('/contact/merci')` — ou sur `/contact/merci` via `useEffect` au chargement si le tracking sur la page de destination est plus robuste — décision @fullstack, documenter le choix)

**Wording page `/contact/merci` — version arbitrée** : combiner les deux sources.
- Titre : « Votre message est bien parvenu. » (version ux-writing-guide — plus sobre que "nous est bien parvenu")
- Corps : « Nicolas Berg reviendra vers vous [À CONFIRMER : délai de réponse réel de Nicolas] pour un premier échange autour de votre projet. » + « Si votre demande est urgente, appelez-nous directement : 01 30 42 26 00 »
- Lien : « ← Retour à l'accueil » → `/`

Note : le placeholder `[À CONFIRMER]` est maintenu jusqu'à confirmation de Nicolas Berg. La version specs ("2 jours ouvrés") était une hypothèse non confirmée et est retirée.

**Fichiers impactés — modifications exactes attendues**

| Fichier | Section | Modification |
|---------|---------|-------------|
| `docs/product/functional-specs.md` | F-08 état Succès | Clarifier que le bloc inline visible dans les wireframes = template de la page `/contact/merci` (pas un remplacement inline de la page `/contact`) |
| `docs/product/functional-specs.md` | F-08 page `/contact/merci` contenu | Remplacer wording par version arbitrée ci-dessus ; supprimer "2 jours ouvrés" → `[À CONFIRMER]` |
| `docs/product/functional-specs.md` | F-08 critère 1 happy path | Mettre à jour la phrase de confirmation avec le wording arbitré |
| `docs/ux/wireframes.md` | WF-08 état succès | Ajouter note : le bloc inline = contenu de la page `/contact/merci`, pas remplacement inline. @ux aligne sa note. |
| `docs/copy/ux-writing-guide.md` | §3 note @fullstack | Remplacer "ne pas rediriger" par "afficher sur la page `/contact/merci`" — @copywriter aligne |

---

## P0-5 — Navigation principale (F-10)

### Décision arbitrée : 6 liens, libellés wireframes, ordre ux-writing-guide

**Principe de l'arbitrage** : wireframes = source de vérité structure (libellés complets, cohérents avec les titres H1 des pages) ; ux-writing-guide = source de vérité ordre (Réalisations en premier = vecteur de conviction principal, brand-platform.md §6 confirmé) ; specs (8 liens) = invalide car inclut "Accueil" (redondant avec logo) et sépare "À propos" qui s'appelle "La maison" partout ailleurs.

**Jeu de liens définitif — nav principale (ordre exact)**

| Position | Label | URL | Logique |
|----------|-------|-----|---------|
| 1 | Réalisations | `/realisations` | Vecteur de conviction principal (brand-platform §6) — vient en premier |
| 2 | Piscines & Bien-être | `/piscines-bien-etre` | Expertise principale Aqua System |
| 3 | Jardins & Paysage | `/jardins-paysage` | Expertise LTE, logique binome |
| 4 | Notre approche | `/notre-approche` | Méthode — après les preuves (portfolio) et les offres |
| 5 | La maison | `/la-maison` | Identité, histoire — en fin de parcours de conviction |
| 6 | Architectes | `/prescripteurs` | Cible secondaire Camille — sobre, pas "Espace prescripteurs" dans la nav (trop long) |

**Règles complémentaires** :
- Pas de "Accueil" dans la nav (logo = lien home — règle ux-writing-guide §6 confirmée)
- Pas de "Contact" dans la nav principale : "Contact" = bouton CTA "Parlez-nous de votre projet" dans le header (distinct des liens de navigation)
- Mobile drawer : même ordre, avec le CTA en bas du drawer (conforme wireframes)
- Footer navigation : peut reproduire les 6 liens + "Contact" comme lien supplémentaire (footer = contexte différent, lisibilité complète)

**Libellés footer** (source ux-writing-guide §6, aligné avec noms pages arbitrés) :
- Réalisations
- Piscines & Bien-être
- Jardins & Paysage
- Notre approche
- La maison
- Espace prescripteurs
- Contact

**Fichiers impactés — modifications exactes attendues**

| Fichier | Section | Modification |
|---------|---------|-------------|
| `docs/product/functional-specs.md` | F-10 tableau Navigation desktop | Remplacer « Accueil / Piscines / Jardins / Approche / Réalisations / Architectes / À propos / Contact » par le tableau ci-dessus (6 liens, ordre exact, libellés exacts) |
| `docs/product/functional-specs.md` | F-10 état actif nav critère 6/7 | Adapter : lien actif "Piscines & Bien-être" sur `/piscines-bien-etre`, etc. |
| `docs/ux/wireframes.md` | Header desktop nav | Déjà conforme aux libellés — vérifier ordre (Réalisations en 1er) |
| `docs/copy/ux-writing-guide.md` | §6 tableau nav | Mettre à jour URLs (Piscines → `/piscines-bien-etre`, Jardins → `/jardins-paysage`, Notre approche → `/notre-approche`) ; confirmer ordre |

---

## P1/P2 — Findings non-bloquants : agent responsable et calendrier

### P1 — À corriger pendant le setup Phase 2

| ID | Problème résumé | Agent responsable | Quand |
|----|----------------|-------------------|-------|
| P1-1 | Page détail réalisation `/realisations/[slug]` existe en UX/design, absente des specs | @product-manager | Ajout F-05b aux specs avant démarrage F-05 en dev |
| P1-2 | URL politique de confidentialité : 3 variantes | **Décision arbitrée ici** : page distincte `/politique-confidentialite` (sans tiret de trait d'union avant "de") — séparée de `/mentions-legales` pour deux raisons : (1) référencée directement depuis la mention RGPD du formulaire (lien doit arriver exactement là, pas sur une ancre qui peut mal défiler) ; (2) cohérence avec ux-writing-guide qui est la source copy | @product-manager (spec) + @ux (wireframe) + @copywriter (lien RGPD) |
| P1-3 | Wording erreurs inline divergent specs vs ux-writing | @copywriter = source de vérité ; @product-manager retire les textes en dur des specs et renvoie vers ux-writing-guide section §2 | @copywriter (déjà correct) + @product-manager (nettoyage specs) |
| P1-4 | Bouton submit "Envoyer ma demande" interdit par specs | @copywriter retire cette variante de ux-writing-guide §1 bouton — seul "Parlez-nous de votre projet" | @copywriter |
| P1-5 | Wording corps page prescripteurs absent de ux-writing-guide | @copywriter produit les 3 blocs valeur (wording complet) de `/prescripteurs` | @copywriter (nouveau livrable) |

### P2 — Fin de run / nettoyage

| ID | Problème résumé | Agent responsable | Quand |
|----|----------------|-------------------|-------|
| P2-1 | Compteur caractères description : visible (wireframes) vs masqué (ux-writing) | Décision arbitrée : **pas de compteur visible** — conforme creative-brief §9 et persona Alexandre (contraignant et trop administratif). Afficher uniquement le message d'erreur si < 20 chars à la soumission. | @ux aligne WF-08 ; @copywriter déjà conforme |
| P2-2 | id premier champ `#form-prenom` (tracking) vs `#prenom_nom` (specs) | @data-analyst aligne E-02 trigger sur `#prenom_nom` | @data-analyst |
| P2-3 | Naming [PROVISOIRE] "Aquasystem" | Substitution via `SITE_NAME` — non bloquant | @creative-strategy (naming final) |

---

## Vérification croisée finale — zéro nouvelle contradiction

Après application de tous les arbitrages :

| Élément | functional-specs | ux-writing-guide | wireframes | tracking-plan | Cohérent ? |
|---------|-----------------|-----------------|-----------|--------------|-----------|
| URL piscines | `/piscines-bien-etre` | `/piscines-bien-etre` | `/piscines-bien-etre` | `piscines-bien-etre` | OUI |
| URL jardins | `/jardins-paysage` | `/jardins-paysage` | `/jardins-paysage` | `jardins-paysage` | OUI |
| URL approche | `/notre-approche` | `/notre-approche` | `/notre-approche` | `notre-approche` | OUI |
| URL à-propos | `/la-maison` | n/a | `/la-maison` | `la-maison` | OUI |
| Tél. formulaire | Facultatif | Facultatif | Facultatif | n/a | OUI |
| type_projet | Chips optionnels | Texte libre + chips | Chips optionnels | Optional array | OUI |
| Budget tranches | 4 options (`50_80k` etc.) | 4 options (labels) | 4 options | 4 options | OUI |
| Comportement succès | Redirect `/contact/merci` | Page `/contact/merci` | Contenu = page merci | URL distinct E-01 | OUI |
| Nav 6 liens | 6 liens, ordre arbitré | 6 liens, URLs à jour | 6 liens | n/a | OUI |
| Politique confidentialité | `/politique-confidentialite` | `/politique-confidentialite` | (à mettre à jour) | n/a | OUI (après mises à jour agents) |

---

*Arbitrages produits par @product-manager — 2026-06-11*
*Handoff → @ux, @copywriter, @data-analyst pour alignement de leurs livrables*
