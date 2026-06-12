# IA — Refonte architecture navigation
## Aquasystem — 2026-06-12 | Agent : @ux

> Demande fondateur : (1) regrouper notre-approche + la-maison (trop de sections) ;
> (2) reconsidérer la page architectes dans la nav principale.
> Ce document tranche, justifie, et fournit le plan fichier par fichier pour @fullstack.

---

## 1. INVENTAIRE DES SECTIONS — Les deux pages actuelles

### /notre-approche (page F-04)

| Section | Contenu exact | Type |
|---|---|---|
| Hero split | H1 « De la vision à la réalisation » + sous-titre méthode | Formule signature + positionnement |
| Timeline 5 étapes | Écoute → Bureau d'études → Réalisation → Livraison → Suivi annuel | Méthode différenciante |
| Ancrage local | 30 ans, PLU, nappes phréatiques, communes, adresses | Preuve géo + E-E-A-T |
| CTA mi-parcours | ButtonLink ghost « Parlez-nous de votre projet » | Conversion |
| FAQ GEO | FAQ_NOTRE_APPROCHE (questions interlocuteur unique, méthode) | SEO + réassurance |
| SectionCTA | CTA footer standard | Conversion |

### /la-maison (page F-06)

| Section | Contenu exact | Type |
|---|---|---|
| Hero plein | « La maison » + subtitle 30 ans + photo piscine intérieure | Identité / confiance |
| Notre histoire | Freneuse, équipe de 8, partenariat LTE | Narrative fondateur |
| Portrait Nicolas Berg | Photo N&B 160px, titre gérant | Humanisation / E-E-A-T |
| Les deux maisons | Aqua System (certifs, distinctions, contact) + LTE (photo jardinerie, adresse) | Preuves concrètes + coordonnées |
| Valeurs | Exigence / Confiance / Sur-mesure (3 paragraphes) | Positionnement |
| Photo propriété pleine largeur | piscine-jardin-arbre | Aspiration |
| SectionCTA | CTA footer standard | Conversion |

### Chevauchements identifiés

Les deux pages racontent la même histoire de fond : **qui nous sommes, pourquoi nous faire confiance**. Les redondances sont :

1. Le positionnement premium (présent dans le hero des deux pages)
2. La preuve « 30 ans » (notre-approche §ancrage, la-maison §histoire)
3. Le message « un seul interlocuteur » (notre-approche §intro, la-maison §histoire)
4. La certification Socotec + L'Esprit Piscine (la-maison §Aqua System — non répétée dans notre-approche mais déjà dans le footer global)

### Ce qui est UNIQUE à chaque page

- **Notre-approche uniquement** : la timeline 5 étapes (méthode opérationnelle — clé pour Alexandre et Camille), la FAQ GEO (valeur SEO Cluster 4)
- **La-maison uniquement** : portrait Nicolas Berg, section « Les deux maisons » avec coordonnées, section Valeurs, photo propriété pleine largeur, distinctions FPP/EUSA

---

## 2. STRUCTURE FUSIONNÉE — Page unique

### Décision URL : /la-maison conserve, /notre-approche → 301

**Justification SEO (keyword-map.md) :**

- `/notre-approche/` cible le Cluster 4 (aménagement extérieur intégré) et la PAA « Comment choisir un pisciniste haut de gamme ». Mots-clés cibles : « interlocuteur unique piscine jardin », « méthode conception piscine », « bureau d'études paysager pisciniste ». Volume faible, espace libre.
- `/la-maison/` cible « Aqua System Freneuse », « pisciniste 30 ans Yvelines », « Socotec pisciniste » — intention E-E-A-T / confiance. Mots-clés plus fortement ancrés dans l'identité.
- **Le contenu de notre-approche (timeline + FAQ) migre vers /la-maison/ — la page absorbante récupère aussi les signaux SEO de notre-approche via la richesse du contenu fusionné.**
- La métadonnée title de la page survivante sera réécrite pour couvrir les deux intentions : titre orienté identité + méthode. Le canonical pointe sur `/la-maison/`.
- **301 propre** : `/notre-approche/` → `/la-maison/` (permanent, pas de perte de jus).

**Titre nav unique :** « La maison »
**Sous-titre drawer mobile :** « De la vision à la réalisation » (formule signature préservée, visible uniquement dans le drawer où il y a l'espace — même pattern que l'existant pour /notre-approche)

### Structure fusionnée section par section

```
PAGE : /la-maison/
Titre H1 : La maison
URL : /la-maison/ (canonique)
301 source : /notre-approche/ → /la-maison/
```

| # | Section | Contenu | Source | Action | Justification |
|---|---|---|---|---|---|
| 1 | **Hero split** | H1 « La maison » / sous-titre « De la vision à la réalisation — trente ans dans les plus belles propriétés de l'ouest parisien. » / Photo : piscine-intérieure-béton-baies (identité forte) | Fusion des deux heroes | FUSIONNER — le H1 de la-maison + la formule signature de notre-approche en sous-titre | La formule « De la vision à la réalisation » préservée visible dès le dessus du fold |
| 2 | **Notre histoire** | Texte Freneuse + équipe 8 + partenariat LTE + portrait Nicolas Berg | la-maison | CONSERVER tel quel | Narrative fondateur irremplaçable — E-E-A-T humain |
| 3 | **Notre méthode** (ex-timeline) | Les 5 étapes numérotées (Écoute, Bureau d'études, Réalisation, Livraison, Suivi annuel) | notre-approche | MIGRER intégralement | Différenciateur opérationnel majeur — montre COMMENT, pas seulement QUI |
| 4 | **Les deux maisons** | Aqua System (certifs, distinctions, FPP Or, EUSA, Gens de Confiance, contact) + LTE (photo jardinerie, adresse) | la-maison | CONSERVER tel quel | Section de preuve concrète non redondante — noms, certifications, adresses |
| 5 | **Nous connaissons ces propriétés** (ex-ancrage local) | 30 ans de chantiers 78/92, nappes phréatiques, PLU, liste communes, adresses 2 entités | notre-approche | MIGRER — après les deux maisons | Passage SEO géo extractible — contient les 2 adresses NAP en texte visible |
| 6 | **Nos valeurs** | Exigence / Confiance / Sur-mesure | la-maison | CONSERVER | Grille 3 colonnes — dense mais utile (différencie du discours commercial) |
| 7 | **Photo propriété pleine largeur** | piscine-jardin-arbre | la-maison | CONSERVER | Respiration visuelle + aspiration — avant le CTA final |
| 8 | **FAQ** | FAQ_NOTRE_APPROCHE (questions méthode + interlocuteur unique) | notre-approche | MIGRER | Valeur SEO préservée (FAQPage JSON-LD suit) — aucune perte |
| 9 | **SectionCTA** | « Parlez-nous de votre projet. Nous vous dirons ce qu'on peut faire ensemble. » | standard | CONSERVER | Conversion finale |

**Sections supprimées** : aucune — tout le contenu de preuve migre. Seul le hero de /notre-approche/ (texte seul) est absorbé dans le sous-titre du hero de /la-maison/. Zéro perte de contenu factuel.

### Ordre des raccords (besoins @copywriter)

La page fusionnée nécessite 3 transitions courtes (1 à 2 phrases maximum, ton sobre) :

- **Raccord 1** — Entre §2 « Notre histoire » et §3 « Notre méthode » : une phrase qui passe de « qui nous sommes » à « voici comment nous travaillons ». Exemple de registre : « Voici comment ce projet prend forme, de la première conversation à la livraison. »
- **Raccord 2** — Entre §3 « Notre méthode » et §4 « Les deux maisons » : une phrase qui ancre la méthode dans les deux entités concrètes. Exemple : « Derrière cette méthode : deux maisons, deux expertises, un seul interlocuteur. »
- **Raccord 3** — Entre §5 « Ancrage local » et §6 « Valeurs » : transition facultative — peut être une simple séparation visuelle sans texte (section change de fond).

Ces raccords sont les SEULS besoins copy. Le contenu des sections elles-mêmes n'est PAS réécrit.

### Métadonnées de la page fusionnée (à mettre à jour)

```
title: "La maison — Pisciniste & paysagiste 30 ans en 78/92, méthode intégrée"
description: "Aqua System et Les Terres Essentielles : 30 ans dans le 78/92, certification Socotec, bureau d'études intégré. De la vision à la réalisation — un seul interlocuteur."
canonical: /la-maison/
```

Les deux intentions SEO (identité E-E-A-T + méthode) sont couvertes dans le même title (≤ 65 caractères à vérifier).

### JSON-LD à fusionner

La page fusionnée doit porter :
- `BreadcrumbList` existant (la-maison)
- `Person` (nicolasBergJsonLd) existant
- `FAQPage` (migré depuis notre-approche) — `FAQ_NOTRE_APPROCHE`

---

## 3. DÉCISION PAGE ARCHITECTES — Analyse des options

### Rappel du contexte stratégique

La page `/prescripteurs/` est décrite dans acquisition-plan.md comme **l'asset principal du canal n°1** (programme prescripteurs). La séquence outreach Camille pointe directement dessus (étape 3 : « lien direct vers /prescripteurs »). Elle génère deux events analytics critiques : `prescripteur_page_viewed` (E-07) et `prescripteur_cta_clicked` (E-08). C'est une page qui existe pour être **partagée directement**, pas navigable organiquement.

### Analyse des 4 options

**Option (a) — Sortir du menu principal, page conservée**
La page `/prescripteurs/` reste accessible en URL directe mais disparaît de la nav principale (6 entrées → 5 entrées grand public). L'accès passe par :
- Footer : lien « Espace prescripteurs & architectes »
- Formulaire contact : chip « Je suis prescripteur » pré-active le parcours
- Liens directs dans les emails outreach (séquence B.3)
- SEO : indexée, canonique maintenue, Cluster 5 préservé

**Option (b) — Fusion dans Contact**
Problème structurel : Contact est une page transactionnelle (formulaire). Fusionner 5 sections B2B spécialisées (hero, valeurs, preuves, FAQ, portfolio prescripteur) dedans transforme Contact en une page composite illisible. Les 2 events de tracking Camille seraient perdus ou dilués. Incompatible avec le fonctionnement de la séquence outreach. **ÉCARTÉ.**

**Option (c) — Fusion dans la page La Maison**
Camille lirait d'abord tout le contenu B2C identité avant d'arriver à ses informations pertinentes. La page deviendrait trop longue (9 sections B2C + 5 sections B2B). Le tracking prescripteur ne peut pas s'isoler. Les 3 CTAs spécifiques `PrescripteurCtaLink` perdent leur contexte. **ÉCARTÉ.**

**Option (d) — Statu quo**
La nav reste à 6 entrées. Le problème fondateur persiste : un visiteur grand public (Alexandre) voit « Architectes » dans la nav et doit se demander si ce site lui parle ou s'il est destiné aux professionnels. **Friction de persona confirmée. ÉCARTÉ.**

### Recommandation : Option (a) — Sortie du menu, page préservée

**Justification principale — Alexandre (persona B2C) :**
Alexandre (45-60 ans, propriétaire) arrive sur le site pour se convaincre de faire appel à l'entreprise. Voir « Architectes » dans la nav principale crée une friction cognitive : « ce site est-il fait pour moi ou pour des professionnels ? ». Avec 5 entrées grand public, chaque entrée lui parle directement. La page prescripteurs n'a pas à être dans sa ligne de vue — elle n'est pas pour lui.

**Justification principale — Camille (persona B2B) :**
Camille (architecte prescripteur) arrive sur la page /prescripteurs/ **par lien direct** (email outreach, LinkedIn DM, Houzz). Elle ne découvre pas cette page en naviguant. La nav principale n'est pas son point d'entrée. Retirer la page du menu ne change rien à son parcours. Le lien dans le footer « Espace prescripteurs & architectes » reste un signal visible si elle atterrit sur la page d'accueil par curiosité.

**Préservation des assets growth :**
- URL `/prescripteurs/` : inchangée (aucun 301 à faire)
- `prescripteur_page_view` (E-07) : conservé
- `prescripteur_cta_clicked` (E-08) : conservé
- Chip « Je suis prescripteur » formulaire : conservé et fonctionnel
- SEO Cluster 5 : indexation maintenue, canonical inchangé
- Séquence outreach B.3 : lien dans les emails inchangé

**Le seul point d'attention** : un prescripteur qui arrive directement sur la page d'accueil sans lien direct ne voit pas de signal prescripteur dans la nav. Contrebalancé par : (a) footer visible sur toutes les pages, (b) le scénario d'arrivée directe est minoritaire selon acquisition-plan.md (canal outreach = entry direct, pas découverte organique).

---

## 4. NAV FINALE — Avant / Après

### Desktop — liens horizontaux (NAV_LINKS dans constants.ts)

| Avant (6 entrées) | Après (5 entrées) |
|---|---|
| Réalisations | Réalisations |
| Piscines & Bien-être | Piscines & Bien-être |
| Jardins & Paysage | Jardins & Paysage |
| Notre approche | ~~Notre approche~~ (supprimé — fusionné) |
| La maison | La maison |
| Architectes | ~~Architectes~~ (sorti du menu) |
| + CTA « Parlez-nous de votre projet » | + CTA « Parlez-nous de votre projet » |

### Drawer mobile — comportement des sous-titres

| Lien | Sous-titre drawer |
|---|---|
| Réalisations | (aucun) |
| Piscines & Bien-être | (aucun) |
| Jardins & Paysage | (aucun) |
| La maison | « De la vision à la réalisation » |
| (Architectes retiré) | — |

Le sous-titre « De la vision à la réalisation » qui était sur `/notre-approche` dans le drawer migre sur `/la-maison`. C'est la formule signature du projet — elle reste visible dans le drawer.

### Footer — ajustements

**FOOTER_NAV_LINKS** (constants.ts) — actuellement 6 entrées :

| Avant | Après |
|---|---|
| Réalisations | Réalisations |
| Piscines & Bien-être | Piscines & Bien-être |
| Jardins & Paysage | Jardins & Paysage |
| Notre approche | La maison *(remplace Notre approche)* |
| Espace prescripteurs | Espace prescripteurs & architectes *(label ajusté — plus explicite)* |
| Contact | Contact |

Le footer devient le point d'accès visible et permanent à la page prescripteurs pour Camille qui arriverait sur le site par d'autres voies. Le label « Espace prescripteurs & architectes » est plus explicite que l'actuel « Espace prescripteurs ».

---

## 5. IMPACTS TECHNIQUES ET SEO

### Redirections 301 (une seule)

| Source | Destination | Type | Urgence |
|---|---|---|---|
| `/notre-approche/` | `/la-maison/` | 301 permanent | Avant indexation de la refonte |
| `/notre-approche` (sans slash) | `/la-maison/` | 301 permanent | Idem |

Implémentation : `next.config.ts` dans le tableau `redirects`. Pas de middleware nécessaire.

### Sitemap

Retirer `/notre-approche/` du sitemap (ou laisser la redirection gérer — les crawlers suivront le 301). S'assurer que `/la-maison/` est présent avec la bonne priorité.

### Breadcrumbs

Le breadcrumb de la page fusionnée reste : `[{ name: 'La maison', path: '/la-maison/' }]`. Pas de changement structurel.

### Events analytics (Umami)

| Event | Impact |
|---|---|
| `prescripteur_page_viewed` (E-07) | Aucun impact — page /prescripteurs/ inchangée |
| `prescripteur_cta_clicked` (E-08) | Aucun impact — page /prescripteurs/ inchangée |
| `notre_approche_page_view` (si existant) | Disparaît — à archiver dans le tableau de bord Umami |
| `cta_clicked` position `footer` /notre-approche | Migre sur /la-maison — l'event continue d'être émis par SectionCTA |

Si un event spécifique `notre_approche_page_view` existe dans Umami, noter dans le dashboard que la métrique est discontinuée à la date de la refonte. Les données historiques restent lisibles.

### Maillage interne

- Les pages qui pointent vers `/notre-approche/` doivent être mises à jour pour pointer vers `/la-maison/`. Rechercher dans les fichiers .tsx la chaîne `/notre-approche` et remplacer par `/la-maison`.
- Les pages qui pointent vers `/prescripteurs/` : aucun changement (URL inchangée).

---

## 6. PLAN D'IMPLÉMENTATION — Fichier par fichier pour @fullstack

### Priorité d'exécution : séquentielle (chaque étape dépend de la précédente)

**ÉTAPE 1 — Créer la page fusionnée /la-maison/**

Fichier : `src/app/la-maison/page.tsx`

Modifications :
1. Mise à jour des métadonnées (title + description couvrant les deux intentions SEO)
2. Hero : passer du composant `<Hero>` à un hero split (pattern de notre-approche) — H1 « La maison » + sous-titre incluant « De la vision à la réalisation » + photo piscine-intérieure-béton-baies
3. Conserver §2 « Notre histoire » + portrait Nicolas
4. Insérer §3 « Notre méthode » : copier le bloc `STEPS` et son rendu `<ol>` depuis notre-approche/page.tsx
5. Conserver §4 « Les deux maisons »
6. Insérer §5 « Ancrage local » : copier le bloc section `.bg-background-secondary` depuis notre-approche/page.tsx (communes + adresses + CTA mi-parcours)
7. Conserver §6 « Valeurs »
8. Conserver §7 « Photo propriété pleine largeur »
9. Insérer §8 « FAQ » : ajouter `<FaqSection>` avec `FAQ_NOTRE_APPROCHE` (import depuis `@/content/faq`)
10. Ajouter l'import `faqPageJsonLd`, `toFaqJsonLd`, `FAQ_NOTRE_APPROCHE` et le JSON-LD FAQPage
11. Conserver §9 `<SectionCTA>`

Imports à ajouter dans la-maison/page.tsx :
```typescript
import { FaqSection } from '@/components/sections/FaqSection';
import { faqPageJsonLd } from '@/lib/seo';
import { FAQ_NOTRE_APPROCHE, toFaqJsonLd } from '@/content/faq';
```

Les raccords texte entre sections : placeholders `{/* RACCORD @copywriter : [description] */}` — @copywriter livre 3 phrases (voir §2 ci-dessus).

**ÉTAPE 2 — Supprimer ou archiver /notre-approche/**

Option A (recommandée) : supprimer `src/app/notre-approche/` — le dossier et son page.tsx. La redirection next.config.ts gère le trafic résiduel.
Option B : conserver le dossier mais renvoyer depuis page.tsx un redirect côté serveur (moins propre — préférer la suppression + config redirect).

**ÉTAPE 3 — Ajouter la redirection dans next.config.ts**

```typescript
async redirects() {
  return [
    {
      source: '/notre-approche',
      destination: '/la-maison',
      permanent: true,
    },
    {
      source: '/notre-approche/',
      destination: '/la-maison/',
      permanent: true,
    },
  ];
},
```

**ÉTAPE 4 — Mettre à jour constants.ts**

Dans `NAV_LINKS` : retirer `{ label: 'Notre approche', href: '/notre-approche' }` et `{ label: 'Architectes', href: '/prescripteurs' }`.

Dans `FOOTER_NAV_LINKS` : remplacer `{ label: 'Notre approche', href: '/notre-approche' }` par `{ label: 'La maison', href: '/la-maison' }`. Mettre à jour le label prescripteurs : `{ label: 'Espace prescripteurs & architectes', href: '/prescripteurs' }`.

**ÉTAPE 5 — Mettre à jour NavBar.tsx**

Le bloc conditionnel qui ajoute le sous-titre dans le drawer :
```tsx
{link.href === '/notre-approche' && (
  <span className="mt-1 block text-xs font-sans text-foreground-muted">
    De la vision à la réalisation
  </span>
)}
```
Changer la condition de `/notre-approche` à `/la-maison`.

Retirer le bloc conditionnel prescripteurs (le lien n'est plus dans NAV_LINKS) :
```tsx
{link.href === '/prescripteurs' && (
  <span className="mt-1 block text-xs font-sans text-foreground-muted">
    Maîtres d'œuvre & prescripteurs
  </span>
)}
```
Ce bloc disparaît car l'entrée n'est plus dans la nav.

**ÉTAPE 6 — Grep et mise à jour des liens internes**

```bash
grep -r "/notre-approche" src/ --include="*.tsx" --include="*.ts"
```
Remplacer tous les href `/notre-approche` par `/la-maison` dans les fichiers trouvés.

**ÉTAPE 7 — Vérification sitemap**

Si `src/app/sitemap.ts` existe : retirer `/notre-approche`, vérifier que `/la-maison` est présent.

**ÉTAPE 8 — Build check (CLAUDE.md commandement 6)**

```bash
npx tsc --noEmit && npx next lint && npm run build
```

---

## 7. BESOINS COPY — @copywriter

Unique livrable demandé : 3 raccords de transition (1 à 2 phrases max chacun, ton sobre conforme brand-platform.md §4).

| Raccord | Positionnement dans la page | Registre |
|---|---|---|
| R1 | Entre §2 « Notre histoire » et §3 « Notre méthode » | Passe de « qui » à « comment » |
| R2 | Entre §3 « Notre méthode » et §4 « Les deux maisons » | Ancre la méthode dans les entités concrètes |
| R3 | Facultatif — entre §5 « Ancrage local » et §6 « Valeurs » | Peut être remplacé par séparation visuelle |

**Aucune réécriture de contenu existant.** Les textes des sections conservées et migrées sont intégralement préservés.

---

## 8. TESTS UX POST-IMPLÉMENTATION

| Test | Critère | Méthode |
|---|---|---|
| Parcours Alexandre sans aide | Trouve « La maison » dans la nav, comprend que la page parle de l'entreprise ET de la méthode | Walkthrough cognitif — 5 clics max |
| Parcours Camille | Arrive sur la page d'accueil → trouve « Espace prescripteurs & architectes » dans le footer → accède à /prescripteurs/ | Walkthrough cognitif — 3 clics max |
| Redirection 301 | `/notre-approche/` → `/la-maison/` sans erreur 404 | Curl + browser |
| Sous-titre drawer « De la vision à la réalisation » | Visible sur La maison dans le drawer mobile | Screenshot mobile |
| FAQ JSON-LD | FAQPage valide dans Rich Results Test Google | Test manuel |
| Maillage interne | Zéro lien mort vers `/notre-approche` | Grep + build |

---

## 9. MÉTRIQUES HEART — Impacts de la refonte

| Dimension | Signal avant | Signal après | Cible |
|---|---|---|---|
| Task Success (Alexander) | Risque confusion nav 6 entrées (« Architectes » dans son champ visuel) | Nav 5 entrées 100% grand public | Taux de bounce /la-maison ≤ 40% |
| Adoption (Camille) | prescripteur_page_viewed mesuré via nav | prescripteur_page_viewed mesuré via lien direct (inchangé) | Taux maintenu ou supérieur |
| Engagement | Scroll depth sur /notre-approche et /la-maison séparés (2 pages) | Scroll depth sur /la-maison fusionné (1 page enrichie) | Time on page ≥ 90s |
| Retention | N/A | N/A | N/A |
| Happiness | Nav perçue comme cohérente par Alexandre | Nav 5 entrées épurée et lisible | Mesurable via CSAT post-launch |

---

## Checklist de done

- [x] Structure fusionnée section par section documentée
- [x] Décision URL survivante justifiée (SEO + identité)
- [x] Formule « De la vision à la réalisation » préservée visible (hero + drawer)
- [x] Aucun contenu de preuve perdu (certifications, distinctions, FAQ, portrait, valeurs, ancrage)
- [x] Décision page architectes justifiée (option a) avec impact séquence prescripteurs analysé
- [x] Nav avant/après documentée (desktop + drawer + footer)
- [x] Plan fichier par fichier pour @fullstack
- [x] Besoins copy isolés pour @copywriter (3 raccords uniquement)
- [x] Events analytics : prescripteur_page_view conservé, impact null
- [x] Redirections 301 spécifiées
- [x] SEO : Cluster 4 (notre-approche) absorbé dans /la-maison/ par richesse de contenu

---

*Document produit par @ux — 2026-06-12*
*Calibré sur : project-context.md, keyword-map.md, acquisition-plan.md, brand-platform.md, NavBar.tsx, Footer.tsx, notre-approche/page.tsx, la-maison/page.tsx, prescripteurs/page.tsx, constants.ts*
