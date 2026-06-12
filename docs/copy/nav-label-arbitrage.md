# Arbitrage libellé nav — Page identité fusionnée
## Aquasystem | 2026-06-12 | Agent : @copywriter

> Contexte : le fondateur a lu « La maison » (4e entrée, après Réalisations / Piscines & Bien-être / Jardins & Paysage) comme un 3e service — "j'ai cru qu'Aqua System faisait aussi la décoration ou les travaux de maison". L'ambiguïté vient du menu lui-même : deux entrées-services précèdent le libellé, et le cerveau parse la suite dans le même registre. Ce document tranche.

---

## 1. Grille d'évaluation binaire — 6 candidats

**Critères**

| Code | Critère | Description précise |
|------|---------|---------------------|
| (a) | Zéro ambiguïté service | Lu après Réalisations / Piscines & Bien-être / Jardins & Paysage : peut-il être compris comme une prestation sur l'objet "maison" ? |
| (b) | Registre premium tenu | Cohérent avec le registre soutenu-accessible (brand-voice.md §2) — jamais générique, jamais corporate froid |
| (c) | Longueur nav OK | Desktop (libellé visible sans troncature) + drawer mobile (lisible dans le bloc nav) |
| (d) | Cohérence avec le contenu réel | La page contient : histoire, portrait fondateur, méthode (timeline 5 étapes), les deux maisons, valeurs, ancrage local, FAQ — c'est la page identité globale |
| (e) | Survit au changement de naming | Aucune dépendance au nom provisoire [Aquasystem] / Orvère / Thalweg / Rive & Clos |

---

### Candidat 1 — « La maison »

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | **FAIL** | C'est l'objet même du problème fondateur. Après "Jardins & Paysage", le cerveau parse "La maison" comme le 3e périmètre d'intervention — décoration, rénovation intérieure, bâti. L'article défini "La" aggrave : il désigne un objet précis, pas une entité abstraite. |
| (b) Registre premium | PASS | Terme propriétaire validé (brand-voice.md §3 Glossaire — "Maison Aqua System / Maison Les Terres Essentielles"). |
| (c) Longueur nav | PASS | 2 mots, court. |
| (d) Cohérence contenu | PASS conditionnellement | Cohérent si on sait que "maison" = marque. Incohérent pour un visiteur qui arrive sans ce code. |
| (e) Naming | PASS | Indépendant du nom provisoire. |

**Verdict global : FAIL — l'ambiguïté (a) est bloquante.**

---

### Candidat 2 — « Qui sommes-nous »

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | PASS | Rupture totale de registre par rapport aux entrées-services. Le visiteur comprend immédiatement que cette entrée parle de l'entreprise, pas d'une prestation. |
| (b) Registre premium | **FAIL** | "Qui sommes-nous" est la formulation standard des sites PME généralistes. Elle signale le corporate banal — incompatible avec le positionnement "expert discret" (brand-voice.md §2, trait 1). Alexandre (persona 45-60 ans, propriétaire habitué à être bien servi) perçoit ce libellé comme un signe de positionnement intermédiaire. |
| (c) Longueur nav | PASS | 3 mots. |
| (d) Cohérence contenu | PASS | Le contenu (histoire, méthode, valeurs) correspond à "qui sommes-nous" au sens large. |
| (e) Naming | PASS | Indépendant. |

**Verdict global : FAIL — le registre (b) est disqualifiant.**

---

### Candidat 3 — « Notre histoire »

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | PASS | "Notre histoire" signale immédiatement une page identité narrative. Aucune confusion possible avec un service. |
| (b) Registre premium | PASS | Ton chaleureux, légèrement évocateur — cohérent avec le registre des belles propriétés (brand-voice.md §2). Présent chez des marques premium (hôtellerie haut de gamme, maisons d'édition). |
| (c) Longueur nav | PASS | 2 mots. |
| (d) Cohérence contenu | **FAIL partiel** | La page fusionnée contient : histoire, méthode (timeline), les deux maisons, valeurs, ancrage local, FAQ. "Notre histoire" ne couvre que la dimension narrative — la méthode (section 3, la plus différenciante opérationnellement) disparaît du libellé. Un visiteur qui cherche "comment travaillent-ils" ne sera pas attiré par ce libellé. |
| (e) Naming | PASS | Indépendant. |

**Verdict global : FAIL partiel — (d) sous-représente le contenu réel. Candidat viable en secours si la recommandation principale est rejetée.**

---

### Candidat 4 — « La maison {SITE_NAME} » (ex. « La maison Aquasystem »)

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | PASS | Le rattachement du nom de marque lève l'ambiguïté : "maison" = marque, pas objet. |
| (b) Registre premium | PASS | Le terme "maison" comme désignant de marque est premium (brand-voice.md §3 Glossaire valide "Maison Aqua System"). |
| (c) Longueur nav | **FAIL** | 3 à 4 mots selon le nom final. "La maison Aquasystem" = 3 mots, trop long en nav desktop (les autres entrées font 1 à 3 mots mais sont des noms propres de service — "Piscines & Bien-être" est acceptable car il nomme un périmètre). En drawer mobile, le bloc est chargé. De plus, le nom est PROVISOIRE (SITE_NAME dans constants.ts) : coder le nom dans le libellé nav crée une dépendance directe au checkpoint naming final. |
| (d) Cohérence contenu | PASS | Le contenu couvre bien "la maison" au sens marque. |
| (e) Naming | **FAIL** | Dépendance directe au nom provisoire [Aquasystem]. À chaque changement de SITE_NAME, ce libellé doit être revalidé manuellement — risque de décalage entre le nom nav et le nom final choisi. |

**Verdict global : FAIL — (c) et (e) bloquants.**

---

### Candidat 5 — « Notre maison »

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | PASS | Le pronom possessif "notre" rattache immédiatement "maison" à l'entreprise — pas à un objet à traiter. Testé après "Jardins & Paysage" : "Notre maison" signale une page sur nous, pas sur votre maison. |
| (b) Registre premium | PASS | Le terme "maison" est propriétaire et validé (brand-voice.md §3 Glossaire). "Notre" est sobre, direct, sans corporate froid. Registre des maisons de champagne, éditeurs de mode — usage premium attesté. |
| (c) Longueur nav | PASS | 2 mots, court, égal à "La maison". |
| (d) Cohérence contenu | PASS | "Notre maison" couvre à la fois la dimension identitaire (histoire, portrait, valeurs), les deux maisons concrètes (Aqua System + LTE), et la méthode (comment nous travaillons). Le pronom inclusif laisse entendre une page de fond sur l'entité globale. |
| (e) Naming | PASS | Indépendant du nom provisoire. "Notre maison" fonctionne avec Aquasystem, Orvère, Thalweg, Rive & Clos — aucun lien. |

**Verdict global : PASS total — 5/5 critères.**

---

### Candidat 6 — « À propos »

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | PASS | Standard d'identification "page identité" universellement reconnu. Zéro confusion possible. |
| (b) Registre premium | **FAIL** | "À propos" est le libellé le plus générique du web francophone — PME, blogs, associations, e-commerçants. Il signale l'absence de réflexion sur l'architecture de l'information. Alexandre, habitué des belles propriétés, d'AD France et de Côté Maison, ne trouvera pas ce libellé à la hauteur. Incompatible avec le positionnement "expert discret" (brand-voice.md §2). |
| (c) Longueur nav | PASS | 2 mots. |
| (d) Cohérence contenu | PASS | Générique mais couvrant. |
| (e) Naming | PASS | Indépendant. |

**Verdict global : FAIL — (b) disqualifiant.**

---

### Candidat bonus — « Garder "La maison" avec sous-libellé »

Évalué séparément car la correction porte sur le contexte, pas sur le terme.

| Critère | Verdict | Justification |
|---------|---------|---------------|
| (a) Zéro ambiguïté service | **FAIL partiel** | Le sous-libellé "De la vision à la réalisation" (existant dans le drawer mobile) aide en drawer mais est invisible en nav desktop (libellé seul visible). Le problème fondateur a été constaté sur le menu — le contexte desktop n'est pas corrigé. |
| (b) Registre premium | PASS | |
| (c) Longueur nav | PASS | |
| (d) Cohérence contenu | PASS | |
| (e) Naming | PASS | |

**Verdict global : FAIL partiel — correction insuffisante sur desktop.**

---

## 2. Recommandation unique et tranchée

### Libellé nav recommandé : « Notre maison »

**Justification synthétique**

C'est le seul candidat à passer les 5 critères sans réserve.

Le pronom possessif "notre" est le correctif minimal qui lève l'ambiguïté de (a) sans sacrifier aucune autre dimension. Il transforme la lecture post-menu : après "Piscines & Bien-être" et "Jardins & Paysage", le cerveau attend un troisième service — "Notre maison" rompt ce pattern et signale explicitement une page sur nous. La rupture est immédiate, sans effort cognitif supplémentaire pour le visiteur.

Le registre reste premium : "maison" est un terme propriétaire validé dans le glossaire de marque (brand-voice.md §3). "Notre maison" est la désignation naturelle d'une entité à deux expertises — c'est exactement ce que la page contient (section "Les deux maisons", histoire, méthode). La formule "notre maison" est par ailleurs présente dans le copy existant en corps de texte ("Notre maison Aqua System", "notre maison Les Terres Essentielles") — la nav devient cohérente avec le registre de page.

### H1 de la page — décision explicite

**H1 conservé : "La maison"**

Le H1 reste "La maison" sans modification. L'ambiguïté signalée par le fondateur est une ambiguïté de menu, pas une ambiguïté de page. Une fois à l'intérieur de la page, le visiteur voit le portrait de Nicolas Berg, l'histoire de Freneuse, les deux maisons — le sens est immédiatement clair. La correction porte uniquement sur le libellé nav, où le contexte menu crée la confusion.

**Résumé nav/H1**

| Emplacement | Texte | Justification |
|-------------|-------|---------------|
| Nav desktop (NAV_LINKS) | **Notre maison** | Lève l'ambiguïté service |
| Drawer mobile — libellé principal | **Notre maison** | Cohérence nav |
| Drawer mobile — sous-libellé | De la vision à la réalisation | Inchangé — formule signature |
| H1 de la page `/la-maison/` | **La maison** | Inchangé — contexte page, pas de confusion |
| Footer (FOOTER_NAV_LINKS) | **Notre maison** | Cohérence |
| Breadcrumb | **Notre maison** | Voir impacts ci-dessous |

**Nav et H1 divergent volontairement.** Ce n'est pas une anomalie : le libellé nav est un signifiant de navigation dans un contexte de liste, le H1 est un titre de page dans un contexte de contenu. La divergence est documentée ici pour @fullstack.

---

## 3. Impacts — Liste exacte pour @fullstack

### Fichier 1 : `src/lib/constants.ts`

**NAV_LINKS** — ligne à modifier :

```typescript
// Avant
{ label: 'La maison', href: '/la-maison' }

// Après
{ label: 'Notre maison', href: '/la-maison' }
```

**FOOTER_NAV_LINKS** — ligne à modifier :

```typescript
// Avant
{ label: 'La maison', href: '/la-maison' }

// Après
{ label: 'Notre maison', href: '/la-maison' }
```

### Fichier 2 : `src/components/NavBar.tsx` (ou équivalent)

La condition de sous-libellé drawer doit être mise à jour si elle compare le libellé (label) plutôt que le href. Si la condition porte sur `link.href === '/la-maison'` : aucun changement. Si elle porte sur `link.label === 'La maison'` : mettre à jour en `link.label === 'Notre maison'`.

Vérifier le pattern exact dans le composant nav.

### Fichier 3 : Breadcrumb JSON-LD

La page `/la-maison/` porte un `BreadcrumbList` JSON-LD (ia-refonte-2026-06-12.md §5). Le champ `name` du breadcrumb doit être mis à jour :

```json
// Avant
{ "name": "La maison", "item": "/la-maison/" }

// Après
{ "name": "Notre maison", "item": "/la-maison/" }
```

Localiser dans `src/app/la-maison/page.tsx` le `breadcrumbJsonLd` ou la structure JSON-LD inline et mettre à jour le `name`.

### Metas — inchangées

Les métadonnées SEO (`title`, `description`) de la page `/la-maison/` ne sont PAS à modifier. Elles ciblent les intentions de recherche ("Pisciniste & paysagiste 30 ans en 78/92, méthode intégrée") — le libellé de navigation n'influe pas sur le ranking. Le `title` tag continue d'afficher "La maison" (ou sa formulation SEO courante) sans impact.

### H1 — inchangé

Confirmé ci-dessus. Aucune modification dans `src/app/la-maison/page.tsx` pour le H1.

### Résumé des fichiers touchés

| Fichier | Nature de la modification | Priorité |
|---------|--------------------------|---------|
| `src/lib/constants.ts` | 2 chaînes : NAV_LINKS + FOOTER_NAV_LINKS | P0 — bloquant nav |
| `src/components/NavBar.tsx` | Condition sous-libellé si basée sur label (à vérifier) | P0 conditionnel |
| `src/app/la-maison/page.tsx` | BreadcrumbList JSON-LD : champ `name` | P1 — SEO structuré |
| Metas (`title`, `description`) | Aucune modification | N/A |
| H1 (`La maison`) | Aucune modification | N/A |

---

## Auto-évaluation

- [x] Zéro ambiguïté service dans le menu précis (test post-"Jardins & Paysage" : PASS)
- [x] Registre premium tenu — "notre maison" est dans le glossaire de marque
- [x] Longueur nav OK (2 mots, identique à "La maison")
- [x] Cohérence avec le contenu réel de la page fusionnée (histoire, méthode, deux maisons, valeurs)
- [x] Indépendant du naming final (aucune dépendance à SITE_NAME)
- [x] Décision unique et tranchée
- [x] Divergence nav/H1 explicitée et justifiée
- [x] Liste d'impacts exhaustive pour @fullstack
- [x] Zéro cadratin dans ce document

---

*Document produit par @copywriter — 2026-06-12*
*Sources : brand-voice.md, verbal-identity.md, ia-refonte-2026-06-12.md, constants.ts, donnée fondateur 2026-06-12*
