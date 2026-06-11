# Checkpoint Reviewer — Specs Phase 1 → Phase 2 — Aquasystem [PROVISOIRE]

> Question centrale : « @fullstack peut-il coder ça sans poser UNE SEULE question ? »
> Date : 2026-06-11 | Agent : @reviewer | Périmètre : livrables Phase 0 + Phase 1
> Méthode : binaire et factuel — chaque PASS a une preuve (fichier:section), chaque FAIL un exemple exact. Le reviewer constate, ne corrige rien.

---

## Résumé exécutif (non-technique)

La Phase 1 est de très bonne qualité de fond : positionnement, persona, ton, structure de pages et payload du formulaire sont solides et cohérents sur l'intention. **Mais le checkpoint échoue sur un point dur** : trois livrables ne s'accordent pas sur des éléments que le développeur doit prendre tels quels — les **URLs des pages** (le contrat dev dit `/piscines`, l'UX et le design disent `/piscines-bien-etre`), le **formulaire** (6 champs avec « projet » en texte libre côté copy/UX vs 7-8 champs avec checkboxes côté specs), et les **tranches de budget** (deux grilles de chiffres différentes). Un développeur tomberait sur ces contradictions dès le premier écran et devrait poser des questions. Réponse à la question centrale : **NON, pas encore.** Ces points sont corrigeables en quelques heures par les agents producteurs ; aucune remise en cause de la stratégie.

## Verdict global

**NO-GO pour le démarrage du codage des pages — GO conditionnel pour le setup infra (F-11)**

Justification : F-11 (infrastructure) et l'architecture API du formulaire (couche serveur) sont codables sans ambiguïté → @infrastructure peut démarrer. Mais les pages client (F-01 à F-08, F-10) reposent sur des URLs, un formulaire et des tranches budget contradictoires → @fullstack poserait des questions. Le NO-GO est levé dès résolution des **3 findings P0** ci-dessous (relance @product-manager + @ux + @copywriter, ~quelques heures).

---

## 1. Vérification binaire des critères de cohérence inter-livrables

| # | Critère | Verdict | Preuve |
|---|---------|---------|--------|
| (1) | Le copy cite brand-platform.md | **PASS** | brand-voice.md L6 « Source : brand-platform.md » ; L43 « 4 traits permanents (source : brand-platform.md §4) » ; L25 « 3 mots… validés fondateur ». ux-writing-guide.md L6 source brand-platform.md §4. |
| (3) | Chaque critère d'acceptance des specs a un flow @ux | **PASS avec réserve** | Les 11 features ont un WF correspondant (WF-01→WF-10 + composants). Réserve : WF-05b (fiche réalisation détail `/realisations/[slug]`) existe dans wireframes.md L579 et page-compositions.md L411 mais **n'est PAS une feature des specs** (F-05 ne décrit pas la page détail, seulement la grille). Voir F-DETAIL en findings (P1). |
| (4) | Chaque event du tracking-plan a son point d'implémentation dans les specs | **PASS** | E-01→E-09 tous référencés dans functional-specs (ex. E-09 cross-selling F-02 L227, E-07/E-08 prescripteurs F-07 L623-625, E-01 has_cross_selling F-08 L948). E-10 page_viewed = auto Umami, non implémenté manuellement (cohérent tracking-plan L339). |
| (7) | Persona identique partout (zéro drift Alexandre/Camille) | **PASS** | « Alexandre » (45-60, 78/92, ≥70-80k€) et « Camille » (architecte prescripteur) cohérents : personas project-context.md L31-34, brand-voice.md L19-23, functional-specs (toutes les US), wireframes WF-07. Aucun autre prénom détecté. |
| (8) | Métriques alignées NSM 10 leads/mois | **PASS** | NSM = 10 leads qualifiés/mois (commune 78/92 + type_projet non null + description ≥ 20 chars) cohérent : project-context.md L51, functional-specs L799-805 + L1301-1308, tracking-plan E-01. Qualification côté dashboard, jamais côté formulaire (cohérent partout). |
| (10) | Zéro placeholder résiduel non balisé | **PASS** | Grep `lorem/TODO/XXX/à compléter/FIXME` : 0 occurrence non balisée. Tous les « [À CONFIRMER] », « [À COMPLÉTER] », « [HYPOTHÈSE] », slots « [Photo : …] » sont explicitement balisés. mentions-legales-draft.md L143 « [À compléter avec la date de mise en ligne] » = balisé. |
| (11) | Wording exact disponible pour chaque état UI des specs | **FAIL** | Voir détail ci-dessous. Le wording existe pour la majorité des états mais **diverge** entre functional-specs (textes exacts) et ux-writing-guide (textes exacts différents) pour les mêmes états. Le dev ne sait pas lequel est faisant foi. |

**Critères 2, 5, 6, 9 : NON APPLICABLES avant le code.** Ils portent sur l'implémentation livrée (exactitude du rendu, comportement runtime observé, perf mesurée Lighthouse, conformité du code aux specs) — vérifiables seulement en Phase 2, post-build.

### Détail critère (11) — Divergences de wording entre specs et ux-writing pour les MÊMES états

| État UI | functional-specs.md (texte exact) | ux-writing-guide.md (texte exact) | Verdict |
|---------|-----------------------------------|-----------------------------------|---------|
| Message succès | « Votre message nous est bien parvenu. » + « Nous revenons vers vous dans les 2 jours ouvrés. » (L895-896) | « Votre message est bien parvenu. » + « Nicolas Berg reviendra vers vous [À CONFIRMER : délai] » (L164-166) | DIVERGENT — texte ET délai (« 2 jours ouvrés » figé vs `[À CONFIRMER]`) |
| Erreur prénom vide | « Votre nom est requis. » (L882) | « Votre nom nous permet de vous répondre personnellement. » (L115) | DIVERGENT |
| Erreur email invalide | « Format d'email invalide (exemple : prenom@domaine.fr). » (L883) | « L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr). » (L117) | DIVERGENT |
| Erreur description < 20 | « Décrivez votre projet en quelques mots (20 caractères minimum). » (L887) | « Décrivez votre projet en quelques mots — cela guidera notre premier échange. » (L114) | DIVERGENT |
| Empty state portfolio | « Aucune réalisation dans cette catégorie pour le moment. » (L441) | « Aucune réalisation ne correspond à cette sélection pour le moment. » (L187) | DIVERGENT |
| Bouton submit | « Parlez-nous de votre projet » (CTA obligatoire, L1346) | « Envoyer ma demande » (variante : « Parlez-nous de votre projet », L85-86) | DIVERGENT + l'ux-writing recommande un libellé INTERDIT par les specs |

Conclusion (11) : le wording exact existe en double exemplaire avec des valeurs différentes. @fullstack ne peut pas trancher seul → FAIL.

---

## 2. Test de codabilité par feature (F-01 → F-11)

Légende : OK = sans ambiguïté / **AMB** = ambiguïté ou contradiction bloquante.

| Feature | Structure | Composants | Wording | Tokens | Events | Erreur | Verdict |
|---------|-----------|-----------|---------|--------|--------|--------|---------|
| F-01 Accueil | OK | OK | OK | OK | OK | OK | **OK** |
| F-02 Piscines | **AMB** (URL) | OK | OK | OK | OK | OK | **AMB** |
| F-03 Jardins | **AMB** (URL) | OK | OK | OK | OK | OK | **AMB** |
| F-04 Approche | **AMB** (URL) | OK | OK | OK | OK | OK | **AMB** |
| F-05 Portfolio | OK | OK | **AMB** | OK | OK | OK | **AMB** |
| F-06 À propos | **AMB** (URL) | OK | OK | OK | OK | OK | **AMB** |
| F-07 Prescripteurs | OK | OK | **AMB** | OK | OK | OK | **AMB** |
| F-08 Contact | OK | **AMB** | **AMB** | OK | OK | OK | **AMB** |
| F-09 Légal | **AMB** (URL) | OK | OK | OK | OK | OK | **AMB** |
| F-10 Composants | **AMB** (nav) | OK | **AMB** | OK | OK | OK | **AMB** |
| F-11 Infra | OK | n/a | n/a | n/a | n/a | OK | **OK** |

### Détail des ambiguïtés bloquantes par feature

**F-02 / F-03 / F-04 / F-06 / F-09 — URL des pages (P0)**
Les specs définissent : `/piscines` (F-02 L158), `/jardins` (F-03 L238), `/approche` (F-04 L314), `/a-propos` (F-06 L485). Les wireframes ET page-compositions définissent : `/piscines-bien-etre` (wireframes L319, compositions L15), `/jardins-paysage` (L402/L16), `/notre-approche` (L428/L17), `/la-maison` (L640/L20). user-flows.md L25-29 confirme la version longue. **Le dev ne sait pas quelle URL créer.** Impact SEO, sitemap, liens internes, `page_source` analytics, canonical.

**F-05 / F-07 — Wording (P1)**
F-05 empty state et F-07 accroche : textes divergents entre specs et ux-writing (cf. critère 11). F-07 L580 renvoie « [WORDING : confirmer avec ux-writing-guide.md si livré] » — l'ux-writing-guide ne contient PAS le wording corps de la page prescripteurs (seulement le CTA). Manque réel.

**F-08 — Formulaire : structure des champs (P0)**
Contradiction majeure sur le nombre et le type de champs :
- functional-specs L661-673 : **7-8 champs**, « Type de projet » = `checkbox multi-select` (5 options), « Téléphone » = **obligatoire**, « Prénom et Nom » obligatoire.
- ux-writing-guide L20-79 : **6 champs**, « Votre projet » = **champ texte libre** (« pas de menu déroulant forcé — obligation creative-brief.md §9 », L24), « Téléphone » = **facultatif** (L77).
- wireframes WF-08 L848-856 : « Votre projet » = **checkboxes multi-select** (5 options), « Téléphone » = **obligatoire** (L843).

Donc : copy dit « texte libre + tél facultatif », specs+wireframes disent « checkboxes + tél obligatoire ». **Et le copy invoque une obligation creative-brief.md §9 contre le menu déroulant.** Le dev ne peut pas coder le champ central du seul point de conversion du site. Conséquence en cascade : E-01 `type_projet` est typé `Array<enum>` (tracking-plan L142) → incompatible avec un champ texte libre.

**F-08 — Wording bouton + messages erreur (P1)** : cf. critère 11.

**F-10 — Labels de navigation (P0)**
Trois ordres/intitulés différents :
- functional-specs L1077 : « Accueil / Piscines / Jardins / Approche / Réalisations / Architectes / À propos / Contact » (8 liens, inclut « Accueil »).
- wireframes L41 : « Piscines & Bien-être · Jardins & Paysage · Notre approche · Réalisations · La maison · Architectes » (6 liens, pas d'« Accueil », pas de « Contact » dans la nav — Contact = bouton CTA).
- ux-writing-guide L218-227 : « Réalisations / Piscines / Jardins / Notre approche / Architectes / Contact » (6 liens, ORDRE différent, Réalisations en premier, pas de « La maison »).

Trois sources de vérité contradictoires pour la barre de nav. Le dev ne sait pas quels liens, dans quel ordre, avec quels libellés.

---

## 3. Contradictions inter-livrables

| # | Livrable A | Livrable B | Contradiction | Criticité | Résolution proposée | Agent |
|---|-----------|-----------|---------------|-----------|---------------------|-------|
| C1 | functional-specs (`/piscines`, `/jardins`, `/approche`, `/a-propos`) | wireframes + page-compositions + user-flows (`/piscines-bien-etre`, `/jardins-paysage`, `/notre-approche`, `/la-maison`) | URLs des 4 pages divergentes | **P0** | Trancher une convention unique. La majorité (3 livrables vs 1) + le SEO (URL descriptive) favorisent la version longue. @product-manager aligne functional-specs sur les URLs longues OU justifie le raccourci et fait corriger @ux/@design. | @product-manager (arbitre) |
| C2 | functional-specs + wireframes (checkbox multi-select, tél obligatoire) | ux-writing-guide + **creative-brief.md §9 L115 (texte libre OBLIGATOIRE, « pas de menu déroulant forcé »)** | Type du champ « projet » et obligation du téléphone. Le brief amont tranche en faveur du texte libre → specs+wireframes en infraction. | **P0** | Aligner sur le brief : champ projet = texte libre. Refondre E-01 `type_projet` (incompatible Array enum). Trancher obligation tél (brief muet → décision @product-manager). | @product-manager + @copywriter + @data-analyst |
| C3 | ux-writing-guide (50-80 / 80-150 / 150+ k€) | functional-specs + wireframes (moins_50k / 50-100k / 100-200k / 200k+) | Tranches de budget totalement différentes (valeurs ET nombre d'options) | **P0** | Trancher une grille unique. L'orchestration-plan L35 valide « tranches 50-80/80-150/150+ » côté copy. Les enums API (specs L688-695, tracking-plan E-01) doivent matcher exactement. | @product-manager + @copywriter |
| C4 | ux-writing-guide (`/politique-de-confidentialite`) | functional-specs (`/mentions-legales#confidentialite`) ; wireframes/user-flows (`/politique-confidentialite`) | URL de la politique de confidentialité : 3 variantes | **P1** | Trancher : page distincte `/politique-confidentialite` OU ancre `#confidentialite` sur `/mentions-legales`. Aligner les 3 livrables + le lien RGPD du formulaire. | @product-manager |
| C5 | ux-writing-guide (bouton « Envoyer ma demande ») | functional-specs (« Parlez-nous de votre projet » OBLIGATOIRE, « Envoyer » INTERDIT L1345) | Le copy recommande comme libellé principal un terme que les specs interdisent | **P1** | @copywriter retire « Envoyer ma demande » du bouton submit (garder « Parlez-nous de votre projet »). | @copywriter |
| C6 | wireframes WF-08 L873/L877 (compteur caractères visible + « Minimum 20 caractères ») | ux-writing-guide L55 (« Pas de compteur de caractères visible (contraignant pour la cible) ») | Présence/absence du compteur de caractères sur la description | **P2** | Trancher UX : @ux et @copywriter s'accordent. Mineur mais le dev doit savoir. | @ux + @copywriter |
| C7 | functional-specs F-05 (grille seule, pas de page détail) | wireframes WF-05b + page-compositions WF-05b (`/realisations/[slug]` page détail complète) | La fiche réalisation détail existe en UX/design mais n'est pas une feature spec | **P1** | @product-manager : ajouter F-05b aux specs (route, données, events E-06, états) OU @ux/@design retirent WF-05b du scope V1 si non prévu. | @product-manager |
| C8 | functional-specs L948 (form_submission_success déclenché après HTTP 200) | functional-specs L876/L901 (succès = redirect vers `/contact/merci`) vs wireframes L938 (succès = bloc inline à la place du formulaire, pas de redirect) | Comportement de succès : page distincte `/contact/merci` (specs) vs remplacement inline (wireframes + ux-writing L177 « ne pas rediriger ») | **P0** | Trancher. Les specs justifient `/contact/merci` (partage URL + anti-resubmit) ; le copy/UX veulent l'inline. Impact direct : routing, event timing, page à créer. | @product-manager + @ux |
| C9 | tracking-plan E-01 `page_source` enum inclut `about` (L147) ; E-02 trigger `#form-prenom` (L160) | functional-specs : page_source `about` (F-06 L546) mais id du champ = `prenom_nom` (L665, F-08 L946 `#prenom_nom`) | id du premier champ du formulaire : `#form-prenom` (tracking) vs `#prenom_nom` (specs) | **P2** | @data-analyst aligne E-02 trigger sur `#prenom_nom`. Mineur (le dev verrait le bon id dans les specs) mais à nettoyer. | @data-analyst |
| C10 | functional-specs (formulaire i18n via `next-intl`, L34) | wireframes/compositions (textes en dur FR) | Cohérent — pas de contradiction réelle, FR en dur acceptable V1 avec messages/fr.json. | — | RAS | — |

**Vérifications demandées qui PASSENT (pas de contradiction) :**
- **Formulation LTE « en partenariat avec »** : cohérente partout (specs L1339, wireframes WF-03 L421, page-compositions L74/L212/L246, brand-voice L141). Jamais violée. **PASS.**
- **CTA « Parlez-nous de votre projet »** : présent et cohérent partout comme CTA principal (sauf le bouton submit, cf. C5). **PASS** hors C5.
- **has_cross_selling** : cohérent entre tracking-plan v1.1 (E-01 L148-152) et functional-specs (F-08 L948) — sessionStorage, posé sur clic cross-selling. **PASS.**
- **Types de filtres portfolio** : identiques partout (`tous/piscine/spa_sauna/jardin_parc/projet_complet`) — specs L424-430, tracking E-05 L243, wireframes WF-05 L510. **PASS.**
- **Design tokens 3 tiers** : design-tokens.json L8 architecture « primitives > semantics > component », L9 « composants référencent UNIQUEMENT sémantiques/component ». **PASS.**

---

## 4. Liste consolidée des [À CONFIRMER fondateur] / [HYPOTHÈSE] — pour le prochain checkpoint utilisateur

**Bloquants produit/copy :**
1. **Délai de réponse** du message de succès (« 2 jours ouvrés » figé dans specs L896 vs `[À CONFIRMER]` dans copy L166). Nicolas doit confirmer un délai réel.
2. **Tranches de budget** définitives (cf. C3) — valider la grille retenue.
3. **Type du champ projet** : checkboxes vs texte libre (cf. C2, réf. creative-brief.md §9 à vérifier).
4. **Certifications prescripteurs** : PDF téléchargeables ou « sur demande » (specs F-07 L585).
5. **Photo de Nicolas Berg** autorisée pour `/la-maison` ? (specs F-06 L513, compositions WF-06 L452).

**Bloquants techniques/infra :**
6. **Service email** : Resend recommandé (specs L767) — à valider avec @infrastructure.
7. **Rate limit** : 5 req/IP/heure acceptable ? (specs L752).
8. **Analytics** : Umami self-hosted (0 €, maintenance) vs Plausible Cloud (9 $/mois, zéro maintenance) (tracking-plan L100). Note : project-context L102 indique « Umami self-hosted » déjà tranché au checkpoint Phase 0 — à reconfirmer comme acté.
9. **URL réseaux sociaux** : LinkedIn Aqua System à fournir (specs F-10 L1092).

**Bloquants juridiques (rappel — déjà au backlog @legal/orchestrator) :**
10. Gouvernance LES TERRES ESSENTIELLES (acquisition en cours, Pappers = Patrick Rouzeval) — mentions légales finalisées post-acquisition (project-context L24/L156).
11. Assureur décennale + n° police ; TVA intracom ; greffe RCS ; DPA Cloudflare ; droits à l'image book Calameo (orchestration-plan L63).

**Naming :**
12. Nom de marque ombrelle final (« Aquasystem » [PROVISOIRE], shortlist Orvère/Thalweg/Rive & Clos). Substituable via `SITE_NAME` — non bloquant pour le code.

---

## 5. Findings P0 / P1 / P2

### P0 — Bloquants Phase 2 (à corriger AVANT le code des pages)

| ID | Fichier:section | Problème | Correction proposée | Agent |
|----|-----------------|----------|---------------------|-------|
| **P0-1** | functional-specs F-02/03/04/06 vs wireframes/page-compositions/user-flows | URLs des 4 pages divergentes (`/piscines` vs `/piscines-bien-etre`, etc.) — cf. C1 | Trancher une convention unique sur les 4 URLs, propager dans les 4 livrables + sitemap + canonical + `page_source` | @product-manager (arbitre) + @ux + @design |
| **P0-2** | functional-specs F-08 L661-695 vs ux-writing-guide L20-79 vs wireframes WF-08 | Structure du formulaire contradictoire : nb de champs (6 vs 7-8), type « projet » (texte libre vs checkboxes), téléphone (facultatif vs obligatoire) — cf. C2. **VÉRIFIÉ : creative-brief.md §9 L115 impose « champ "votre projet" (texte libre) — pas de menu déroulant forcé » comme OBLIGATION.** Les specs+wireframes (checkboxes) violent donc une obligation stratégique amont. Impacte E-01 type_projet (typé Array enum dans tracking-plan — incompatible texte libre). | Aligner sur le copy/brief (texte libre) → @product-manager refond le payload + @data-analyst refond E-01 `type_projet` (libre → catégorisation côté dashboard, ou champ projet structuré séparé). Si dérogation au brief souhaitée → escalade fondateur. | @product-manager + @copywriter + @data-analyst |
| **P0-3** | ux-writing-guide L40-46 vs functional-specs L688-695 vs tracking-plan E-01 L145 | Tranches budget différentes (3 vs 4 options, valeurs distinctes) — cf. C3. Enums API et analytics doivent matcher au caractère près. | Figer une grille unique, propager dans labels + enum API + enum E-01 | @product-manager + @copywriter |
| **P0-4** | functional-specs L876/L901 vs wireframes L938 vs ux-writing-guide L177 | Comportement succès formulaire : redirect `/contact/merci` vs bloc inline — cf. C8. Impacte routing, page à créer, timing E-01. | Trancher redirect vs inline, aligner les 3 livrables | @product-manager + @ux |
| **P0-5** | functional-specs L1077 vs wireframes L41 vs ux-writing-guide L218-227 | Nav principale : 3 jeux de liens/ordres/libellés contradictoires — cf. F-10 détail | Figer la liste, l'ordre et les libellés de nav (+ présence ou non d'« Accueil »/« Contact ») | @ux (arbitre nav) + @product-manager + @copywriter |

### P1 — À corriger pendant le setup Phase 2 (n'empêche pas de démarrer)

| ID | Fichier:section | Problème | Correction proposée | Agent |
|----|-----------------|----------|---------------------|-------|
| **P1-1** | functional-specs F-05 vs wireframes/page-compositions WF-05b | Page détail réalisation `/realisations/[slug]` existe en UX/design, absente des specs — cf. C7 | Ajouter F-05b aux specs OU la retirer du scope V1 | @product-manager |
| **P1-2** | ux-writing-guide (politique-de-confidentialite) vs specs (#confidentialite) vs wireframes (politique-confidentialite) | URL politique de confidentialité : 3 variantes — cf. C4 | Trancher page distincte vs ancre, aligner le lien RGPD du formulaire | @product-manager |
| **P1-3** | functional-specs F-08 messages erreur L880-888 vs ux-writing-guide L110-118 | Wording des erreurs inline divergent (critère 11) — le dev ne sait pas quel texte intégrer | @copywriter = source de vérité wording ; @product-manager retire les textes en dur des specs et renvoie vers ux-writing-guide | @copywriter + @product-manager |
| **P1-4** | ux-writing-guide L85-86 | Bouton submit « Envoyer ma demande » = libellé INTERDIT par specs L1345 — cf. C5 | Retirer la variante « Envoyer ma demande », garder « Parlez-nous de votre projet » | @copywriter |
| **P1-5** | functional-specs F-07 L580 + ux-writing-guide | Wording corps page prescripteurs : specs renvoient à ux-writing-guide « si livré », mais le guide ne contient que le CTA, pas le corps | @copywriter produit le wording corps de `/prescripteurs` (3 blocs valeur, preuves) | @copywriter |

### P2 — Fin de run / nettoyage

| ID | Fichier:section | Problème | Correction proposée | Agent |
|----|-----------------|----------|---------------------|-------|
| **P2-1** | wireframes WF-08 L873/877 vs ux-writing-guide L55 | Compteur de caractères description : visible vs masqué — cf. C6 | Accord @ux/@copywriter | @ux + @copywriter |
| **P2-2** | tracking-plan E-02 L160 (`#form-prenom`) vs specs (`#prenom_nom`) | id du premier champ incohérent — cf. C9 | @data-analyst aligne sur `#prenom_nom` | @data-analyst |
| **P2-3** | functional-specs L33 SITE_NAME vs partout | « Aquasystem » [PROVISOIRE] — non bloquant (variable `SITE_NAME`), mais checkpoint naming à planifier | Substitution centralisée déjà prévue (site.ts) — RAS technique | @creative-strategy (naming) |

---

## Auto-évaluation reviewer

- TOUS les livrables Phase 0/1 lus (pas seulement les récents) : functional-specs (intégral 1456 L), wireframes, ux-writing-guide, brand-voice, brand-platform, tracking-plan v1.1, page-compositions, design-tokens, user-flows, project-context, orchestration-plan. **OK**
- Chaque contradiction a une résolution + un agent responsable. **OK**
- Angles morts = vrais manques (F-05b, wording prescripteurs), pas des hors-scope volontaires. **OK**
- Véracité externe : non requise ici (pas de claim tarif/benchmark/réglementation nouveau à vérifier — décision Umami/CNIL déjà sourcée par @data-analyst, hors périmètre de ce checkpoint specs). **N/A**
- Screenshots : aucun `src/` ni `tests/screenshots/` encore (Phase 2 non démarrée) — walkthrough post-code non applicable. **N/A**

---

## Handoff

---
**Handoff → @orchestrator**
- **Fichier produit** : `/home/user/Aquasystem/docs/reviews/reviewer-checkpoint-specs-phase1-2026-06-11.md`
- **Verdict** : **NO-GO pour le code des pages** (F-01→F-10) / **GO conditionnel pour le setup infra @infrastructure** (F-11 + couche API formulaire codables). NO-GO levé dès résolution des 5 P0.
- **Findings par sévérité** : **5 P0**, **5 P1**, **3 P2** (13 au total).
- **Cause racine** : functional-specs (contrat dev) a été produit en parallèle de wireframes/ux-writing/design (orchestration-plan L31-36, livraisons simultanées 1.1/1.2/1.3) → divergences non réconciliées sur URLs, formulaire, budget, nav, comportement succès.
- **Agents à relancer** : @product-manager (arbitre P0-1/2/3/4, P1-1/2/3), @ux (P0-4/5, P2-1), @copywriter (P0-2/3, P1-3/4/5, P2-1), @data-analyst (P2-2).
- **Points d'attention** : P0-2 touche le SEUL point de conversion du site (formulaire) — priorité absolue. Vérifier creative-brief.md §9 invoqué par le copy avant de trancher le type du champ projet.
- **Re-check** : re-vérifier UNIQUEMENT les gates/critères en FAIL (critère 11) et la résolution des 5 P0 après corrections. Max 3 itérations puis escalade.
---
