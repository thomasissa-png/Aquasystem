# Re-audit ITÉRATION 2 — Site Aquasystem (board 10/10)
## Vérification des corrections D-17 + re-score des 8 dimensions
## Date : 2026-06-12 | Agent : @reviewer | Cible : https://aquasystem.pages.dev

> **Méthode de preuve — transparence (CLAUDE.md n°2)** : l'environnement de ce
> re-audit n'expose **pas d'outil Bash/curl**. La vérification « live » a donc été
> conduite sur le **dossier `out/`** (export statique Next = artefact EXACT uploadé
> sur Cloudflare Pages — le déploiement Pages est un simple upload de `out/`, donc
> `out/index.html` == ce que sert `aquasystem.pages.dev` pour le même build) +
> **code source `src/`** + **40 screenshots `tests/screenshots/`** lus visuellement.
> Là où une preuve exige une requête HTTP réelle (statuts 308/404, headers, Resend,
> Lighthouse), je m'appuie sur le tech-audit @qa `[LIVE]` du 2026-06-12 et le signale.
> Aucune correction n'a été appliquée par le reviewer (rôle : vérifier, pas produire).

---

## Résumé exécutif (non-technique)

L'itération 1 de corrections (D-17) **tient ses promesses sur l'essentiel**. Le bug
le plus grave — la page Réalisations et le formulaire de contact qui sortaient VIDES
du site (invisibles pour Google et les IA) — est **réellement corrigé** : les 14
réalisations et le formulaire complet sont désormais dans la page. Les corrections de
texte, de typographie et de référencement IA demandées sont **toutes en place et
vérifiées**. Il reste **2 finitions de design non traitées** (les encadrés dorés de la
page Jardins, la mention « IMAGE À REMPLACER » visible par le visiteur) et **1 vrai
bloquant non-code** : le formulaire n'envoie aucun email tant que le fondateur n'a pas
branché le service d'envoi (Resend). **On peut avancer**, mais le site ne génèrera
0 lead tant que Resend n'est pas configuré — c'est le chemin critique vers le « GO réel ».

## Résumé technique

Cohérence : code ↔ out/ ↔ docs alignés, 0 régression introduite par D-17. Blocages
résiduels CODE/COPY : 3 findings nouveaux (1 P1 « IMAGE À REMPLACER » visible, 1 P1
encadrés dorés jardins non traités, 1 P2 submit mobile placé avant le textarea).
Bloquant GO réel : Resend (config fondateur, hors-code). **Verdict : GO sur les
corrections D-17 (toutes vérifiées), avec itération 3 CODE/COPY courte recommandée
avant de déclarer le plafond atteint.**

---

## 1. Vérification item par item des corrections D-17

Légende : **CONFIRMÉ** = preuve trouvée · **NON-CONFORME** = correction annoncée absente/partielle · preuve = fichier (out/ = HTML déployé, src/ = source).

### P0 — bloquants (100% vérifiés)

| # | Correction annoncée | Verdict | Preuve |
|---|---|---|---|
| P0-1 | CSR bailout : grille /realisations dans le HTML | **CONFIRMÉ** | `out/realisations/index.html` : **14** liens `/realisations/<slug>/` (grep `-o` listé, slugs distincts) |
| P0-2 | CSR : badges draft dans la grille | **CONFIRMÉ** | `out/realisations/index.html` : **14×** « En cours de documentation » |
| P0-3 | CSR : `<form>` complet dans /contact | **CONFIRMÉ** | `out/contact/index.html` : `<form>` + champs `prenom_nom/email/telephone/commune/budget_tranche/description/langue/page_source/website` (honeypot) tous présents (no-JS réel opérationnel) |
| P0-4 | 0 `useSearchParams` actif (cause racine) | **CONFIRMÉ** | `src/` : 4 occurrences, **toutes en commentaire** (RealisationsGrid, ContactForm, contact/page). Lecture inline `window.location.search` confirmée |
| P0-5 | Qualification prescripteurs (ux P0-C1) | **CONFIRMÉ** | `src/app/prescripteurs/page.tsx:210` « Dossier de qualification complet disponible sur demande. » + CTA « Présentons-nous → ». **Visuel** : `prescripteurs-desktop.png` (encart doré sous « Ce qui nous qualifie ») |

### Copy (7 corrections — 100% vérifiées, échantillon > 50 %)

| # | Correction | Verdict | Preuve |
|---|---|---|---|
| C-1 | « d'exception » ×4 supprimés | **CONFIRMÉ** | grep `d.exception` = **0** dans `src/` ET `out/` (toutes pages) |
| C-2 | Insécables U+00A0 avant `?` (faq.ts, 8 questions) | **CONFIRMÉ** | `faq.ts` : `[\x{00a0}]\?` = **8** matchs ; ` \?` (espace normal) = **0** |
| C-3 | Footer labels alignés (F4-01/02) | **CONFIRMÉ** | `constants.ts:59,60` FOOTER_NAV « Piscines & Bien-être » / « Jardins & Paysage » ; `accueil-desktop.png` footer |
| C-4 | Hero accueil = phrase signature (F3-01) | **CONFIRMÉ** | `out/index.html` « De la vision à la réalisation » présent |
| C-5 | /piscines « réseau national de piscinistes professionnels » (F6-01) | **CONFIRMÉ** | `out/piscines-bien-etre/index.html` présent |
| C-6 | Contact : « sans engagement » retiré + 48h (F1-02/F3-03) | **CONFIRMÉ** | « sans engagement » = **0** dans `out/` ; « sous 48 » présent ; `contact-mobile.png` |
| C-7 | Erreur ContactForm « par email ou téléphone » (F5-01) | **CONFIRMÉ** | `ContactForm.tsx:241-242` (texte coupé sur 2 lignes, présent) |

### GEO (3 P1 + 3 P2 — 100% vérifiées)

| # | Correction | Verdict | Preuve |
|---|---|---|---|
| G-1 | AREA_SERVED + 95 + 27 (4 départements dans JSON-LD live) | **CONFIRMÉ** | `constants.ts:37-42` 4 entrées ; `out/index.html` JSON-LD : « Val-d'Oise (95) » + « Eure (27) » présents (org + partner) |
| G-2 | sameAs Aqua System SANS facebookLTE (arbitrage seo P0-2) | **CONFIRMÉ** | `out/index.html` : bloc `#organization-aquasystem` a exactement `sameAs:[esprit-piscine, linkedin/aqua-system]` (match exact, 1×) — **facebookLTE absent du bloc Aqua System** ; les 4 occurrences facebookLTE = bloc partner LTE + footer |
| G-3 | sameAs LTE enrichi (Pappers + societe.com) | **CONFIRMÉ** | `out/index.html` : `pappers.fr/...les-terres-essentielles` + `societe.com/...les-terres-essentielles` présents (bloc partner) |
| G-4 | date llms.txt → 2026-06-12 | **CONFIRMÉ** | `out/llms.txt` « Dernière mise à jour : 2026-06-12 » |
| G-5 | `<p>` synthèse extractible /accueil | **CONFIRMÉ** | `out/index.html` « certifié Socotec CSP/ESP-001, membre du réseau » + « 350 piscines entretenues dans les Yvelines » |
| G-6 | bureau d'études /jardins + Charte GdC /la-maison | **CONFIRMÉ** | `out/jardins-paysage/index.html` « dispose d'un bureau d'études » + « co-conception de projets extérieurs » ; `out/la-maison/index.html` « Charte Pro Gens de Confiance » |

### Design (D-17 prétend : FAQ spacing, CTA mi-page, min-h placeholders)

| # | Correction | Verdict | Preuve |
|---|---|---|---|
| D-1 | FAQ /notre-approche extraTopSpacing (P1-FAQ-1) | **CONFIRMÉ** | `notre-approche/page.tsx:211` `extraTopSpacing` |
| D-2 | CTA mi-page ghost /notre-approche (P1-APPROCHE-2) | **CONFIRMÉ** | `notre-approche/page.tsx:199` `<ButtonLink variant="ghost">` |
| D-3 | min-h-64 placeholders jardins (P1-JARDINS-2) | **CONFIRMÉ** | `jardins-paysage/page.tsx:208` `className="min-h-64"` |
| D-4 | Encadrés services jardins fond doré → secondaire (P1-JARDINS-1 / P1-HIERAR-1) | **NON-CONFORME** | D-17 a déclaré « déjà en MediaSplit, structure obsolète » — **FAUX** : `jardins-paysage-mobile.png` montre TOUJOURS 3 encadrés « Bureau d'études / Pépinière / Jardinerie & expertise » sur **fond doré**, H2 de même poids. Correction design P1 non appliquée (voir §3 NF-2) |

### UX (badges footer, sticky submit mobile, drawer)

| # | Correction | Verdict | Preuve |
|---|---|---|---|
| U-1 | Badges Socotec + Esprit Piscine footer global (P1-N2) | **CONFIRMÉ** | `Footer.tsx:51-56` 2 badges ; `accueil-desktop.png` + `contact-mobile.png` (colonne 1) |
| U-2 | Submit sticky-bottom mobile /contact (P1-F1) | **CONFIRMÉ (avec réserve)** | `ContactForm.tsx:409` `sticky bottom-3 ... md:static` ; `contact-mobile.png` : bouton visible. **Réserve** : placé avant le textarea (voir §3 NF-3) |
| U-3 | Sous-titre drawer « Maîtres d'œuvre & prescripteurs » (P2-C2) | **CONFIRMÉ** | `NavBar.tsx:200` |
| U-4 | Badge draft RealisationCard (P0-D1) | **CONFIRMÉ** | `RealisationCard.tsx:50-54` + label « Voir → » `:63-69` (couvre aussi design P2-REALISA-1) |

**Bilan vérification : 26 items vérifiés — 25 CONFIRMÉS, 1 NON-CONFORME (encadrés dorés jardins).** 100 % des P0 vérifiés ; 100 % des P1/P2 échantillonnés (> 50 % requis).

---

## 2. Re-scores des 8 dimensions — RÉEL vs PLAFOND hors-fondateur

> **RÉEL** = note de l'état actuel du site déployé.
> **PLAFOND** = note si tous les éléments **corrigeables par code/copy** étaient parfaits
> (les [BLOQUÉ FONDATEUR] restant comptés comme imparfaits → ils plafonnent la note).

| # | Dimension | Itér.1 | **RÉEL itér.2** | **PLAFOND hors-fondateur** | Justification courte |
|---|---|---|---|---|---|
| 1 | UX | 8,3 | **8,8** | **9,2** | 2 P0 levés (badge draft + qualification), badges footer, sticky submit, drawer. Plafond < 10 : fiches draft (récit), délai RDV B2B = fondateur |
| 2 | Design | 7,5 | **7,8** | **8,7** | min-h + CTA + FAQ OK. **Mais encadrés dorés jardins NON traités** (-) + « IMAGE À REMPLACER » visible (-). Plafond < 10 : hero jardins + chaises longues = fondateur |
| 3 | Copy | 8,2 | **9,2** | **9,5** | 7/7 P1 levés (d'exception, insécables, footer, hero, 48h, erreur). Reste P3 (apostrophes typo) corrigeable mais marginal |
| 4 | SEO | 8,1 | **8,7** | **9,0** | Grille pré-rendue (P1 levé), JSON-LD facebookLTE corrigé. Plafond bridé par config domaine `NEXT_PUBLIC_SITE_URL` + title fiches (à la publication) |
| 5 | GEO | 8,1 | **9,0** | **9,2** | AREA_SERVED + sameAs LTE + date + 3 synthèses extractibles tous levés. Reste Q3 durée chantier = fondateur |
| 6 | Tech | 8,5 | **8,5** | **9,0** | Inchangé depuis tech-audit `[LIVE]` (D-17 non redéployé/non re-mesuré Lighthouse). LCP 2,6s + ordre gardes = code. **Resend = config fondateur**, plafonne le « GO réel » |
| 7 | Prospect Alexandre | 5,3 | **6,5** | **7,0** | Grille remplie + badge draft + 48h aident. Plafond bas : fiches sans récit, garanties écrites, qui-signe, décennale = **tout fondateur** |
| 8 | Prescripteur Camille | 5,9 | **6,8** | **7,2** | Qualification + drawer + DCE/anti-court-circuit OK. Plafond bas : référence confrère, décennale, fiches techniques, charte signable = **tout fondateur** |
| | **MOYENNE** | **7,5** | **8,2** | **8,7** | |

### Points [BLOQUÉ FONDATEUR] restants par dimension

- **UX** : récit des fiches (au moins 3-4 documentées), délai/RDV B2B affiché, photos jardins.
- **Design** : photo hero /jardins-paysage premium (serre ≠ paysagiste) ; vérif photo « chaises longues » /piscines-bien-etre (DA §9) ; photos réalisations jardins.
- **SEO** : `NEXT_PUBLIC_SITE_URL` (domaine final) + activation 301 `_redirects` (= config, pas fondateur stricto sensu mais décision domaine).
- **GEO** : Q3 « durée de chantier » FAQ /notre-approche (placeholder [À CONFIRMER]).
- **Tech** : **Resend** (`RESEND_API_KEY`/`CONTACT_EMAIL_TO`/`FROM`) + binding `RATE_LIMIT_KV` — **bloquant NSM** (0 email ne part).
- **Alexandre** : fiches racontées, témoignages attribuables, garanties écrites, qui-signe/responsabilité AS↔LTE, décennale, délai de réponse, photo équipe chantier.
- **Camille** : 1 référence prescripteur vérifiable, charte signable + modèle éco, décennale affichée, délais par typologie, fiches profondeur technique.

---

## 3. Nouveaux findings introduits / non traités par D-17

> Régressions strictes : **AUCUNE** (out/ ↔ code ↔ docs cohérents, builds D-17 PASS d'après l'historique). Les findings ci-dessous sont des corrections annoncées **non/mal traitées** ou des effets de bord copy.

| ID | Sév. | Dimension | Constat | Preuve | Correction (CODE/COPY) |
|---|---|---|---|---|---|
| **NF-1** | **P1** | Design / UX | « **IMAGE À REMPLACER** » s'affiche en **uppercase, client-facing** sur /jardins-paysage (2 blocs) et autres slots. C'est un message interne de chantier vu par le prospect — exactement l'irritant n°2 d'Alexandre (« vous publiez une page avec un Post-it de chantier dessus »). Contredit « le détail fait tout » | `PhotoPlaceholder.tsx:40-42` (« Image à remplacer ») ; `jardins-paysage-mobile.png` | Soit neutraliser le placeholder (visuel sobre sans texte « à remplacer », ex. motif/aplat de marque), soit **masquer** les blocs sans photo. Le label ne doit jamais crier « à remplacer » en prod |
| **NF-2** | **P1** | Design | Encadrés services jardins (« Bureau d'études / Pépinière / Jardinerie & expertise ») **toujours sur fond doré**, 3 H2 de même poids — D-17 a **déclaré la correction faite à tort** (« déjà en MediaSplit ») | `jardins-paysage-mobile.png` (3 cartes dorées) ; design-audit P1-JARDINS-1 + P1-HIERAR-1 | Appliquer la correction design : `bg-background-secondary` + `border-l-2` OU sous-titres `DM Sans 18px semibold` (libère la hiérarchie H2). **Re-déclarer honnêtement le statut** |
| **NF-3** | **P2** | UX | Submit mobile rendu **sticky AU-DESSUS du textarea** (entre chips et Commune), pas en bas. Risque : clic avant d'avoir décrit le projet (champ description obligatoire → erreur de validation au 1er essai) | `contact-mobile.png` ; `ContactForm.tsx:409` | Acceptable en l'état (validation inline rattrape), mais préférer un sticky réellement bottom-of-viewport OU garder un seul submit en fin de formulaire. Aligner sur l'intention ux P1-F1 |

Findings antérieurs **non traités et toujours valides** (rappel, non re-scorés ici car déjà couverts) : seo title fiches (P1, à la publication), LCP mobile 2,6s (P2 tech), aria-label chips ≠ texte (P2 tech 2.5.3), ordre des gardes Function (P2 tech).

---

## 4. Verdict

### Reste-t-il des corrections CODE/COPY qui rapprochent du 10 ? **OUI — itération 3 courte.**

Le **plafond hors-fondateur n'est PAS encore atteint** : 2 corrections design P1 et 1 UX
P2 (les 3 findings NF ci-dessus) sont 100 % code/copy et chiffrent ~+0,5 à +0,9 sur la
dimension Design. Liste exacte itération 3 (toutes @fullstack, sans asset fondateur) :

1. **NF-1 (P1)** — neutraliser/masquer le placeholder « IMAGE À REMPLACER » client-facing.
2. **NF-2 (P1)** — encadrés services /jardins-paysage : retirer le fond doré + casser l'égalité des 5 H2 (design P1-JARDINS-1 + P1-HIERAR-1).
3. **NF-3 (P2)** — repositionner/clarifier le submit mobile (ne pas le placer avant le champ description obligatoire).
4. *(optionnel, polish déjà listés audits)* : title fiches au template (à activer avant `isDraft:false`), aria-label chips = texte visible (2.5.3), ordre des gardes Function (observabilité sans Resend).

### Une fois NF-1/2/3 traités → **plafond hors-fondateur atteint (~8,7/10).**

Au-delà, **le 10/10 passe EXCLUSIVEMENT par le fondateur** (chemin exact) :

1. **Resend + KV** (config Cloudflare) → débloque la NSM (sans ça, 0 lead — bloquant GO réel).
2. **Domaine final** → `NEXT_PUBLIC_SITE_URL` + activer 301 `_redirects` + substituer llms.txt.
3. **Photos** : hero jardins paysager premium, vérif/remplacement « chaises longues » /piscines, photos réalisations jardins (plans/chantier).
4. **3-4 fiches réalisations documentées** (récit, matériaux, contraintes, durée) → débloque Alexandre ET Camille d'un coup.
5. **1 référence prescripteur vérifiable** (plan d'architecte ↔ livré) → débloque Camille.
6. **Décennale** (assureur + n° police) affichée → due diligence Alexandre + Camille.
7. **Naming/domaine définitif** (bascule globale substituable déjà en place).

**Recommandation : GO** sur D-17 (toutes corrections vérifiées, 0 régression).
**Itération 3 CODE/COPY de 3 fixes recommandée AVANT de déclarer le plafond.** Le « GO réel »
(site qui convertit) reste conditionné à **Resend** — seul bloquant NSM, hors-code.

---

## Auto-évaluation

- [x] 100 % des P0 vérifiés (CSR grille/form/badges, qualification) sur preuve out/+code+screenshot.
- [x] > 50 % des P1 échantillonnés (copy 7/7, geo 6/6, design 4/4, ux 4/4).
- [x] Re-scores à double colonne (réel / plafond) + [BLOQUÉ FONDATEUR] listés par dimension.
- [x] Nouveaux findings (NF-1/2/3) avec fichier:ligne + preuve screenshot.
- [x] Screenshots LUS visuellement (realisations, jardins-paysage, prescripteurs, contact, accueil), pas seulement leur existence.
- [x] Transparence sur l'absence de curl (out/ = artefact déployé) — pas de fausse claim « live HTTP ».
- [x] Aucune correction appliquée par le reviewer.

*Re-audit @reviewer — 2026-06-12 — itération 2.*
