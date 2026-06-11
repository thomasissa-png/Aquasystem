# Scope V1 — Site vitrine [NOM OMBRELLE]
## Aqua System × Les Terres Essentielles

> MINDSET IA : V1 COMPLÈTE, pas MVP. Critère d'exclusion unique : pas de valeur persona (jamais "trop long/complexe").
> Chaque feature retenue a : justification persona + lien NSM. Chaque feature exclue a une raison business valide.
> Dernière mise à jour : 2026-06-11 | Agent : @product-manager

---

## Hypothèse business centrale

> Un propriétaire patrimonial de l'ouest parisien (Alexandre) convaincu par la double expertise intégrée eau + jardin et rassuré par 30 ans de preuves locales est susceptible de soumettre un formulaire de contact qualitatif. Une page dédiée aux prescripteurs (Camille) est l'unique espace différenciant vs tous les acteurs locaux et multiplie les leads par effet de réseau.

**Validation attendue** : 10 leads qualifiés/mois à M+6, avec ≥ 2 leads prescripteurs/mois.

---

## 1. Features RETENUES — Architecture complète

---

### F-01 — Page d'accueil

**Persona** : Alexandre (principal) + Camille (secondaire)
**Opportunité** : OPP-A2 (convaincre), OPP-T1 (cross-selling)
**Lien NSM** : Premier écran de conviction — détermine si le visiteur continue vers les réalisations
**Roadmap** : R-05

**Contenu requis** :
- Hero : tagline "L'extérieur à la hauteur de votre propriété" + photo réelle réalisation premium (piscine + jardin en contexte) + CTA "Parlez-nous de votre projet"
- Présentation des deux univers (piscines & bien-être / jardins & paysage) avec appel à l'intégration
- Composant preuves : 30+ ans, 350+ piscines entretenues, Socotec CSP/ESP-001, L'Esprit Piscine
- Extrait portfolio (3-4 réalisations phares avec lien vers page réalisations)
- Mention discrète espace prescripteurs
- CTA footer "Parlez-nous de votre projet"

**Dépendances** : R-02 (design), R-04 (photos), copy validé

---

### F-02 — Page univers piscines & bien-être

**Persona** : Alexandre
**Opportunité** : OPP-A2 (convaincre par le détail), OPP-T1 (cross-selling vers jardins)
**Lien NSM** : Page de conversion pour les visiteurs avec intention piscine
**Roadmap** : R-08

**Contenu requis** :
- Prestations Aqua System : conception et construction sur mesure, rénovation, spas HotSpring, saunas, hammams, traitement d'eau, robots Dolphin, SAV/entretien annuel
- Photos réalisations piscines (issues du book Calameo)
- Certifications (Socotec, L'Esprit Piscine) intégrées en contexte
- Composant cross-selling : "Votre piscine mérite un jardin à sa mesure — en partenariat avec Les Terres Essentielles"
- CTA "Parlez-nous de votre projet"
- Formulation "notre maison Aqua System" (vocabulaire prescrit brand-platform.md)

**Dépendances** : F-01, R-04

---

### F-03 — Page univers jardins & paysage

**Persona** : Alexandre
**Opportunité** : OPP-A2 (convaincre par le détail), OPP-C2 (distinguer LTE)
**Lien NSM** : Page de conversion pour les visiteurs avec intention jardin / paysagiste
**Roadmap** : R-09

**Contenu requis** :
- Prestations Les Terres Essentielles : bureau d'études paysager, création de parcs et jardins, entretien, pépinière
- Formulation légale obligatoire : "en partenariat avec Les Terres Essentielles" (jamais "notre filiale", jamais "nos deux sociétés")
- Photos réalisations jardins/paysage
- Composant cross-selling : "Votre jardin gagne à naître avec la piscine — [NOM OMBRELLE] conçoit les deux ensemble"
- CTA "Parlez-nous de votre projet"
- Adresse : CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi

**Dépendances** : F-01, R-04, validation formulation @legal

---

### F-04 — Page approche / méthode

**Persona** : Alexandre (principal) + Camille (secondaire)
**Opportunité** : OPP-A3 (rassurer sur la fiabilité), OPP-C1 (transparence process pour prescripteurs)
**Lien NSM** : Convertit les visiteurs en considération active — ils savent "comment ça se passe"
**Roadmap** : R-10

**Contenu requis** :
- Narration du processus "de la vision à la réalisation" : étapes clés (écoute / bureau d'études / conception / réalisation / suivi annuel)
- Pilier 4 (relation de long terme) : entretien annuel, interlocuteur stable
- Ancrage local : connaissance des contraintes 78/92 (nappe phréatique, PLU, sol argilo-calcaire)
- Réponse implicite aux frustrations d'Alexandre : pas de sous-traitance forcée, interlocuteur unique
- Pour Camille : mention discrète du respect des cahiers des charges et de la chaîne de prescription
- CTA "Parlez-nous de votre projet"

**Dépendances** : copy validé

---

### F-05 — Page portfolio / réalisations (filtrable)

**Persona** : Alexandre + Camille
**Opportunité** : OPP-A2 (preuves tangibles), OPP-C1 (références vérifiables)
**Lien NSM** : Vecteur de conviction principal — conversion trafic en contact qualifié
**Roadmap** : R-07

**Contenu requis** :
- Galerie de réalisations avec filtre par type : Piscine / Spa-Sauna / Jardin-Parc / Projet intégré eau + jardin
- Chaque réalisation : 1-3 photos, type de projet, zone géographique (commune ou département), prestations réalisées — PAS de nom de propriétaire (droit à l'image / vie privée)
- Photos réelles uniquement (source : book Calameo + site existant + shooting si nécessaire)
- Statique en V1 (pas de CMS) — contenu intégré dans le code ou fichiers JSON
- Minimum viable du portfolio : 8 réalisations distinctes (piscines prioritaires + jardins si dispo)
- CTA en bas de page "Vous avez un projet similaire ? Parlez-nous-en"

**Dépendances** : R-04 (photos sources validées) — CRITIQUE

**Note technique** : Portfolio statique Next.js avec données JSON. Pas de back-office en V1. Mise à jour = déploiement. Acceptable pour la fréquence de production Nicolas Berg.

---

### F-06 — Page à propos / maison

**Persona** : Alexandre
**Opportunité** : OPP-A3 (rassurer, humaniser)
**Lien NSM** : Signal de continuité et de sérieux — réduit le taux de rebond des visiteurs en recherche de preuve humaine
**Roadmap** : R-11

**Contenu requis** :
- Nicolas Berg : nom, rôle (gérant), ancrage local, philosophie de projet — sans biographie corporate
- Histoire de la marque : "plus de 30 ans d'expertise" (formulation validée — jamais "société créée il y a 30 ans")
- Les deux maisons : Aqua System + "en partenariat avec Les Terres Essentielles"
- Équipe : à définir avec Nicolas (mentionner l'équipe de 8 d'Aqua System sans nommer si pas d'autorisation)
- Valeurs : exigence, confiance, durabilité (ton sobre — pas de liste de bullet points génériques)
- Preuves : 30+ ans, 350+ piscines, certifications
- Photo(s) : Nicolas Berg si autorisation, sinon aucune photo de personnes (jamais de photo banque d'images de "team")

**Dépendances** : copy validé, autorisation photos Nicolas

---

### F-07 — Page espace prescripteurs / architectes (OBLIGATOIRE — espace libre vs concurrence)

**Persona** : Camille
**Opportunité** : OPP-C1 (outil de recommandation), OPP-C2 (clarté des deux maisons)
**Lien NSM** : Chaque prescripteur activé = multiplicateur de leads (potentiel 3-5 leads/prescripteur/an)
**Roadmap** : R-13

**Contenu requis** :
- Accroche : "L'exécutant haut de gamme que vos clients méritent — et qui fait honneur à votre prescription"
- Valeur prop Camille : respect du cahier des charges, interlocuteur technique dédié, pas de court-circuit de la relation avec le client
- Preuves pour Camille : Socotec CSP/ESP-001, L'Esprit Piscine, 30+ ans en 78/92, bureau d'études intégré
- Protocole de collaboration : lecture des plans, retours avant exécution, points d'avancement
- Portfolio : accès direct vers page réalisations (avec filtre "projet intégré")
- Certifications téléchargeables ou accessibles — [À CONFIRMER : disponibilité fichiers certification avec Nicolas Berg]
- CTA distinct : "Présentons-nous — portfolio et références disponibles" (formulaire standard avec type "prescripteur")

**Dépendances** : F-05 (portfolio), copy Camille, confirmations certifications

---

### F-08 — Page contact avec formulaire qualifiant

**Persona** : Alexandre (principal) + Camille (secondaire)
**Opportunité** : OPP-A4 (faciliter la prise de contact)
**Lien NSM** : Conversion directe — SEUL point de génération du KPI North Star
**Roadmap** : R-06, R-12

**Champs du formulaire** :

| Champ | Type | Obligatoire | Validation | Exemple |
|-------|------|-------------|------------|---------|
| Prénom et nom | Texte | Oui | Non vide | "Alexandre Moreau" |
| Email | Email | Oui | Format email valide | "a.moreau@..." |
| Téléphone | Tél | Oui | Format FR (10 chiffres) | "06 12 34 56 78" |
| Type de projet | Multi-select | Oui | ≥ 1 option | Piscine / Spa-Sauna / Jardin & Parc / Projet complet eau+jardin / Prescripteur-Architecte |
| Commune | Texte | Oui | Non vide | "Le Vésinet" |
| Budget indicatif | Select | Non (optionnel) | N/A | < 50k€ / 50-100k€ / 100-200k€ / 200k€+ / Je préfère en discuter |
| Votre projet | Textarea | Oui | ≥ 20 caractères | "J'ai un terrain de 2 000 m² et..." |

**Mention RGPD** (texte exact sous le formulaire — source : rgpd-checklist.md section D) :
> "Vos données sont utilisées uniquement pour répondre à votre demande. SARL AQUA SYSTEM, responsable de traitement. Durée de conservation : 3 ans. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition : contact@aqua-system.fr."

**CTA bouton** : "Parlez-nous de votre projet" (jamais "Envoyer", jamais "Demander un devis")

**Page de confirmation** : message humain ("Votre message nous est parvenu. Nous revenons vers vous sous [X] jours ouvrés."), pas de redirection vers accueil — [À CONFIRMER délai réponse avec Nicolas Berg]

**Infrastructure** : Cloudflare Pages Function (email) — pas de BDD, pas de CRM en V1

**Dépendances** : R-03 (infra Cloudflare), setup email (contact@aqua-system.fr)

---

### F-09 — Page mentions légales + politique de confidentialité

**Persona** : N/A (conformité légale)
**Opportunité** : N/A — obligation légale LCEN + RGPD
**Lien NSM** : Indirect — protège la mise en ligne publique du site
**Roadmap** : R-19

**Contenu requis** :
- Mentions légales : éditeur (SARL AQUA SYSTEM, SIREN 903 785 327, capital 20 000 €, NAF 4399D, 45 Route Nationale, 78840 Freneuse, 01 30 42 26 00, contact@aqua-system.fr), directeur publication (Nicolas Berg), hébergeur (Cloudflare Inc., 101 Townsend St, San Francisco, CA 94107, USA)
- Politique de confidentialité : source docs/legal/privacy-policy.md (produit par @legal)
- Mention LTE : "en partenariat avec Les Terres Essentielles, SAS LES TERRES ESSENTIELLES, SIREN 811 198 217" — formulation conforme @legal
- Droits RGPD exercer vers : contact@aqua-system.fr

**Dépendances** : @legal (validation avant mise en ligne)

---

### F-10 — Composants transversaux (réutilisables sur toutes les pages)

**Persona** : Alexandre + Camille
**Opportunité** : Toutes
**Lien NSM** : Cohérence de la conviction à travers tout le parcours

**Composants requis** :

| Composant | Description | Pages d'utilisation |
|-----------|-------------|---------------------|
| Header / navigation | Logo [NOM OMBRELLE], navigation principale (Accueil, Piscines, Jardins, Approche, Réalisations, Architectes, À propos, Contact), responsive mobile | Toutes |
| Footer | Logo, deux maisons, adresses, téléphone, liens légaux, certifications discrètes, liens réseaux sociaux (Facebook LTE, LinkedIn AS) | Toutes |
| CTA global | Bouton "Parlez-nous de votre projet" → /contact, style cohérent, accessible depuis toutes les pages | Toutes |
| Composant preuves | 4 proof points (30+ ans, 350+ piscines, Socotec, L'Esprit Piscine) — affiché en bas de page d'accueil et pages univers | Accueil, F-02, F-03 |
| Composant cross-selling | Bloc contextuel d'une maison vers l'autre | F-02, F-03, F-05 |
| OG / social cards | Image, titre, description par page — format 1200×630px | Toutes |
| Favicons | 32×32, 192×192, Apple touch icon, SVG fallback | Toutes |

---

### F-11 — Infrastructure technique V1

**Persona** : N/A (technique)
**Opportunité** : OPP-A1 (être trouvé), OPP-A4 (faciliter le contact)
**Lien NSM** : Conditionne la découvrabilité et la performance perçue (signal de sérieux)
**Roadmap** : R-03, R-14, R-15, R-17, R-18, R-20, R-21

**Requis** :
- Next.js App Router — export statique (`next export`)
- Cloudflare Pages — déploiement depuis GitHub, preview branches
- Cloudflare Pages Function — formulaire de contact (envoi email via Resend ou SendGrid — [À CONFIRMER avec @infrastructure])
- Cloudflare Web Analytics — exempté CNIL, pas de cookie, pas de bandeau consentement
- i18n-ready : architecture next-intl (ou next/i18n natif), locale FR active, locale EN structurée mais vide en V1
- SEO technique : sitemap.xml auto-généré, robots.txt, données structurées LocalBusiness + ProfessionalService (schema.org)
- Core Web Vitals : LCP < 2,5s, CLS < 0,1, FID/INP < 100ms — images WebP avec next/image, lazy loading, optimisation fonts
- HTTPS obligatoire (Cloudflare gère le SSL)
- Page 404 custom sobre (lien retour accueil)

---

## 2. Features REPORTÉES V2 — Raisons business uniquement

| Feature | Raison du report | Condition de déclenchement V2 |
|---------|-----------------|-------------------------------|
| **Version EN** | Dépend des contenus FR validés et stables — traduire du copy non finalisé est un gaspillage | 3 mois post-launch + copy FR gel + décision fondateur |
| **Témoignages / verbatims clients réels** | Aucun verbatim réel disponible ni autorisé. Règle anti-fictif absolue (CLAUDE.md). Les preuves factuelles (30 ans, 350 piscines) sont plus crédibles que des témoignages en V1 | Dès que Nicolas obtient 3+ autorisations écrites |
| **Blog / journal des réalisations** | Dépend du rythme de production réel : si Nicolas ne peut pas publier 1 article/mois, le blog deviendra un signal négatif (dernière publication = 8 mois) | GO/NO-GO à 3 mois post-launch sur la capacité de production |
| **Landing dédiée aqua-system.fr + redirections 301** | Décision domaine non tranchée (cf. orchestration-plan.md) — dépend de la stratégie SEO définitive (marque ombrelle vs Aqua System comme marque principale) | Décision fondateur post-checkpoint Phase 0 |
| **Back-office portfolio (CMS)** | Pas de BDD en V1 — le portfolio statique JSON est suffisant pour la fréquence de mise à jour actuelle | Si Nicolas veut mettre à jour seul ≥ 1 réalisation/mois |
| **Formulaire prescripteur avancé** (téléchargements certif., accès références dédiées) | Dépend du retour utilisateur Camille en V1 — ne pas sur-concevoir avant de valider l'usage | 2-3 contacts prescripteurs en V1 → interview → V2 |
| **Animations / vidéo hero** | Risque Core Web Vitals (LCP dégradé) + contenu vidéo non disponible en V1 | Si photos insuffisantes en V2 + shooting vidéo réalisé |

---

## 3. Dépendances inter-features

```
F-10 (composants) → F-01 à F-09 (toutes les pages)
F-04 (photos sources) → F-01, F-02, F-03, F-05
R-02 (identité visuelle) → F-01 à F-10
copy validé fondateur → F-01 à F-09
F-06 (formulaire) → F-08 (page contact)
F-05 (portfolio) → F-07 (prescripteurs qui l'utilisent)
F-09 (légal) → mise en ligne publique (bloquant)
@legal validation → F-09 (bloquant)
```

---

## 4. Backlog user stories — Format allégé (specs complètes dans functional-specs.md Phase 1)

---

### US-01 — Accéder au site et comprendre l'offre en moins de 10 secondes

**Persona** : Alexandre | **Epic** : Core site | **RICE** : R-05 → 1200
**Dépendances** : R-02, R-04, F-10

**JTBD** : En tant qu'Alexandre, je veux comprendre en un coup d'œil ce que fait [NOM OMBRELLE] afin de décider si ça vaut la peine de rester.

**Critères d'acceptance (Given/When/Then)** :

Happy path :
- G: Alexandre arrive sur la page d'accueil / W: Il voit le hero (photo + tagline) / T: La tagline "L'extérieur à la hauteur de votre propriété" et le CTA "Parlez-nous de votre projet" sont visibles sans scroll sur desktop ET mobile
- G: Alexandre cherche les preuves de sérieux / W: Il scrolle sous le hero / T: Il voit en moins de 2 scrolls les 4 proof points (30+ ans, 350+ piscines, Socotec, L'Esprit Piscine) et les deux maisons
- G: Alexandre veut voir les réalisations / W: Il clique sur "Voir les réalisations" depuis l'accueil / T: Il arrive sur la page portfolio

Erreur / cas limite :
- G: Connexion lente (3G) / W: Alexandre charge l'accueil / T: LCP ≤ 4s sur mobile (seuil dégradé acceptable) ; le texte apparaît avant l'image (pas de FOUC)
- G: Alexandre arrive sur mobile / W: Il voit la navigation / T: Le menu burger est accessible, les CTA sont tappables (zone ≥ 44px)
- G: Photo hero non disponible (erreur CDN) / W: Alexandre charge l'accueil / T: Un fond uni (couleur brand) s'affiche — la page reste lisible, le CTA reste visible

Limites / permissions :
- G: Alexandre tente d'accéder à une URL invalide / W: La page 404 s'affiche / T: Message sobre + lien retour accueil

---

### US-02 — Parcourir le portfolio et filtrer par type de projet

**Persona** : Alexandre + Camille | **Epic** : Portfolio | **RICE** : R-07 → 1147
**Dépendances** : R-04, R-02

**JTBD** : En tant qu'Alexandre, je veux voir des réalisations similaires à mon projet afin d'évaluer si la marque peut faire ce que j'imagine.

**Critères d'acceptance** :

Happy path :
- G: Alexandre arrive sur la page portfolio / W: Il voit toutes les réalisations par défaut / T: ≥ 8 réalisations s'affichent avec photo, type, zone géographique
- G: Alexandre veut voir seulement les piscines / W: Il clique sur le filtre "Piscine" / T: Seules les réalisations "Piscine" s'affichent — filtre actif visuellement indiqué
- G: Camille cherche des projets intégrés / W: Elle clique sur "Projet complet eau + jardin" / T: Les réalisations combinées s'affichent

Erreur / cas limite :
- G: Aucune réalisation ne correspond au filtre / W: Filtre actif sans résultat / T: Message "Aucune réalisation dans cette catégorie pour le moment" + CTA "Voir toutes les réalisations"
- G: Image d'une réalisation ne charge pas / W: Erreur réseau / T: Placeholder gris sobre — pas d'image cassée

---

### US-03 — Soumettre le formulaire de contact

**Persona** : Alexandre | **Epic** : Conversion | **RICE** : R-06 → 1020
**Dépendances** : R-03, R-06, F-08

**JTBD** : En tant qu'Alexandre, je veux décrire mon projet en 2 minutes afin d'obtenir un premier retour de l'équipe.

**Critères d'acceptance** :

Happy path :
- G: Alexandre remplit tous les champs obligatoires + description ≥ 20 caractères / W: Il clique "Parlez-nous de votre projet" / T: Formulaire soumis avec succès, page de confirmation affichée avec délai de réponse
- G: Alexandre n'indique pas de budget / W: Il soumet le formulaire / T: La soumission réussit — le budget est optionnel
- G: Alexandre sélectionne "Projet complet eau + jardin" / W: Soumission réussie / T: L'email reçu par Nicolas Berg contient le tag [PROJET COMPLET] pour priorisation

Erreur / cas limite :
- G: Email mal formaté / W: Alexandre tente de soumettre / T: Message d'erreur inline sous le champ email "Format d'email invalide" — pas de soumission
- G: Champ "votre projet" vide / W: Tentative de soumission / T: Message "Décrivez votre projet en quelques mots (20 caractères minimum)"
- G: Erreur réseau lors de la soumission / W: La Pages Function échoue / T: Message "Une erreur est survenue. Vous pouvez nous joindre directement au 01 30 42 26 00" — l'état du formulaire est préservé (pas de perte de saisie)
- G: Double-clic sur le bouton / W: Formulaire en cours d'envoi / T: Le bouton est désactivé pendant l'envoi (loading state) — 1 seule soumission

Permissions :
- G: Robot / bot tente de soumettre le formulaire / T: Honeypot field ou validation côté server Cloudflare Function — soumission silencieusement rejetée

---

### US-04 — Accéder à l'espace prescripteurs

**Persona** : Camille | **Epic** : Prescripteurs | **RICE** : R-13 → 180 (obligatoire)
**Dépendances** : F-05, F-07

**JTBD** : En tant que Camille, je veux accéder à une page professionnelle que je peux partager à mon client afin de légitimer ma recommandation.

**Critères d'acceptance** :

Happy path :
- G: Camille arrive sur la page prescripteurs / W: Elle lit le contenu / T: La valeur prop "L'exécutant haut de gamme que vos clients méritent" est visible dès le premier écran
- G: Camille veut voir le portfolio / W: Elle clique sur le lien portfolio / T: La page réalisations s'ouvre avec le filtre "Projet intégré" pré-activé [HYPOTHÈSE : à valider si pertinent UX]
- G: Camille veut contacter l'équipe / W: Elle clique sur "Présentons-nous" / T: Elle arrive sur le formulaire avec "Prescripteur/Architecte" pré-sélectionné comme type de projet

Erreur / cas limite :
- G: Camille partage le lien à son client / W: Le client ouvre le lien / T: La page est lisible et crédible pour quelqu'un qui découvre la marque pour la première fois (pas de jargon interne, pas de message uniquement compréhensible par les architectes)

---

### US-05 — Naviguer entre les deux univers (cross-selling)

**Persona** : Alexandre | **Epic** : Cross-selling | **RICE** : R-08/R-09 → OPP-T1
**Dépendances** : F-02, F-03

**JTBD** : En tant qu'Alexandre venu pour la piscine, je veux découvrir naturellement l'offre jardin afin de comprendre que je peux confier les deux à un seul interlocuteur.

**Critères d'acceptance** :

Happy path :
- G: Alexandre est sur la page piscines / W: Il scrolle vers le bas / T: Il voit le composant cross-selling "Votre piscine mérite un jardin à sa mesure — en partenariat avec Les Terres Essentielles" avec CTA vers la page jardins
- G: Alexandre clique sur le composant cross-selling / W: T: Il arrive sur la page jardins sans perte de contexte (navigation reste cohérente)

Cas limite :
- G: Alexandre est sur la page jardins et vient du formulaire "piscine seule" / W: Il voit le cross-selling / T: Il peut cliquer sur "Modifier mon projet" (link retour formulaire) OU ignorer et continuer

---

### US-06 — Trouver le site sur Google (SEO local)

**Persona** : Alexandre | **Epic** : Acquisition | **RICE** : R-14 → 750
**Dépendances** : R-14, contenu pages

**JTBD** : En tant qu'Alexandre qui recherche "pisciniste sur mesure Yvelines" ou "paysagiste haut de gamme 92", je veux trouver [NOM OMBRELLE] en première page afin de le consulter.

**Critères d'acceptance** :

Happy path :
- G: Googlebot crawle le site / W: T: sitemap.xml retourne HTTP 200, robots.txt ne bloque aucune page V1
- G: Alexandre cherche "piscine sur mesure Le Vésinet" / W: T: La page d'accueil ou la page piscines contient la commune "Le Vésinet" dans le copy (H1 ou corps de texte)
- G: Google analyse les données structurées / W: T: Données structurées LocalBusiness valides (schema.org) sans erreur dans Google Search Console à M+1

Cas limite :
- G: La version EN est vide en V1 / W: Googlebot crawle /en/ / T: Les pages EN retournent 404 ou sont exclues du sitemap — pas d'indexation de pages vides

---

### US-07 — Lire les mentions légales et la politique de confidentialité

**Persona** : N/A (conformité) | **Epic** : Conformité | **RICE** : R-19 → 950

**JTBD** : En tant que visiteur souhaitant connaître ses droits, je veux accéder aux informations légales afin d'exercer mes droits RGPD.

**Critères d'acceptance** :

Happy path :
- G: Visiteur clique sur "Mentions légales" dans le footer / W: T: Page mentions légales s'affiche avec SIREN, capital, adresse, directeur publication, hébergeur
- G: Visiteur clique sur "Politique de confidentialité" / W: T: Page s'affiche avec les 3 traitements (formulaire, logs Cloudflare, analytics), droits exercer, contact@aqua-system.fr
- G: Visiteur veut exercer son droit d'opposition / W: T: L'adresse email contact@aqua-system.fr est présente sur la page confidentialité

Cas limite :
- G: Acquisition LTE non encore actée / W: T: Les mentions légales affichent "en partenariat avec Les Terres Essentielles" (jamais propriété commune) — conformes à la validation @legal

---

## 5. Trois risques V1 avec mitigation

### Risque technique — Formulaire Cloudflare Pages Function échoue silencieusement

**Description** : La Pages Function d'envoi email peut échouer (rate limit, service email down, déploiement raté) sans que le visiteur ne le sache ni que Nicolas ne soit notifié.

**Impact** : Leads perdus sans trace → KPI North Star sous-compté → fausse impression d'échec SEO.

**Mitigation** :
- Monitoring : Cloudflare Workers observability + alerting email sur error 500
- Page de confirmation avec numéro de téléphone en fallback (01 30 42 26 00)
- Test end-to-end formulaire en pré-launch (gate @qa)
- [À CONFIRMER : copie BCC sur une 2e adresse ou log Cloudflare D1 en V1.1 si besoin]

### Risque marché — 10 leads/mois non atteints à M+3

**Description** : Si le trafic organique démarre lentement (SEO long terme) et que le bouche-à-oreille ne génère pas de trafic direct immédiat, le KPI North Star pourrait mettre 6-9 mois à se matérialiser.

**Impact** : Frustration fondateur → remise en question du site avant qu'il ait eu le temps de performer.

**Mitigation** :
- Alerte à M+2 si < 3 leads qualifiés : déclencher campagne Google Ads locale ciblée (budget minimal 500€/mois sur requêtes premium 78/92)
- Activer LinkedIn de Nicolas Berg comme canal de distribution du site dès le lancement
- Seuil de réévaluation formalisé dans assumption-map.md HYP-08

### Risque UX — Alexandre perçoit le site comme trop "généraliste" (deux maisons = dilution)

**Description** : Si la page d'accueil n'établit pas clairement la complémentarité des deux expertises, Alexandre peut percevoir la marque comme un généraliste "à tout faire" plutôt qu'un spécialiste premium de chaque domaine.

**Impact** : Taux de rebond élevé page d'accueil → aucune navigation vers les pages univers → 0 lead.

**Mitigation** :
- Review UX obligatoire du hero et de la navigation par @ux avant validation fondateur (Jalon J1)
- Test utilisateur qualitatif : montrer la page d'accueil à 2-3 personnes du profil Alexandre et noter leur première interprétation — [HYPOTHÈSE : possible via réseau Nicolas Berg]
- Seuil d'alerte : si taux rebond accueil > 70% à M+1 → A/B test hero message avec variante "spécialiste piscines" vs "intégrateur eau + jardin"

---

## 6. Critères de succès V1 (gates de lancement)

| Gate | Critère | Responsable | Seuil GO |
|------|---------|-------------|----------|
| G-CONTENU | Toutes les pages ont du copy validé fondateur | @copywriter + Nicolas | 100% des pages |
| G-PHOTO | Portfolio ≥ 8 réalisations avec photos HD réelles | Nicolas Berg | 8 réalisations minimum |
| G-LEGAL | Mentions légales et RGPD validées @legal | @legal | 0 non-conformité P0 |
| G-PERF | Core Web Vitals dans les seuils | @fullstack + @qa | LCP < 2,5s, CLS < 0,1 |
| G-FORM | Formulaire end-to-end fonctionnel (email reçu par Nicolas) | @qa | 100% des soumissions test |
| G-RESPONSIVE | Site lisible et navigable sur mobile, tablette, desktop | @qa | 0 bug critique 3 devices |
| G-SEO | sitemap.xml valide, données structurées sans erreur | @seo | 0 erreur critique Search Console |
| G-FOND | Validation go/no-go fondateur | Nicolas Berg | GO explicite |

---

*Fichier produit par @product-manager — 2026-06-11*
