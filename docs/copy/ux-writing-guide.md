# Guide UX Writing
## [Aquasystem] × Aqua System × Les Terres Essentielles

> Wording exact, prêt à intégrer par @fullstack. Aucun placeholder non balisé.
> Chaque texte d'interface suit le ton de marque : expert proche, sobre, jamais tape-à-l'œil.
> Source : brand-voice.md, brand-platform.md §4, legal-audit.md, rgpd-checklist.md §D.
> Dernière mise à jour : 2026-06-11 | Agent : @copywriter

[Framework : Utilité radicale — chaque microcopy réduit la friction ou renforce la confiance. Jamais décoratif.]

---

## 1. Formulaire de contact qualifiant — Wording exact

> Ce formulaire est le seul point de conversion du site V1. Son copy est critique.
> Philosophie : qualification douce, ton non-intrusif, respect du persona Alexandre (cible fortunée qui n'apprécie pas les champs intrusifs).

### Labels et placeholders — Champ par champ

> Structure arbitrée P0-2 (arbitrations-p0-checkpoint.md) : chips optionnels + texte libre obligatoire.

#### Champ 1 — Prénom et nom

**Label** : Votre nom
**Placeholder** : Prénom et nom
**Obligatoire** : oui (marqué d'un astérisque)
**Note** : un seul champ — ne pas découper en deux champs séparés. La cible est habituée à être traitée comme une personne, pas comme un formulaire administratif.

---

#### Champ 2 — Email

**Label** : Email
**Placeholder** : votre@email.com
**Obligatoire** : oui (marqué d'un astérisque)
**Note** : minuscules, ton fonctionnel. Pas de "adresse email professionnelle" — la cible peut utiliser une adresse personnelle.

---

#### Champ 3 — Téléphone (optionnel)

**Label** : Téléphone
**Placeholder** : 06 xx xx xx xx
**Obligatoire** : non — pas d'astérisque, pas de mention "facultatif" accolée au label (le champ est simplement non marqué)
**Note** : L'email suffit pour un premier contact. Ne pas forcer le téléphone — certains leads de qualité préfèrent l'email. Conforme creative-brief.md §9 (qualification douce). Arbitrage P0-2.

---

#### Champ 4 — Type de projet (chips optionnels)

**Label au-dessus des chips** : Votre projet concerne :
**Type** : chips/boutons pill, sélection multiple, aucun coché par défaut
**Obligatoire** : non — le formulaire soumet même si aucun chip sélectionné
**Labels des chips (wording exact — correspondance API)** :

| Label affiché | Valeur API (`type_projet`) |
|--------------|--------------------------|
| Piscine & bien-être | `piscine_bien_etre` |
| Jardin & paysage | `jardin_paysage` |
| Projet complet | `projet_complet` |
| Je suis prescripteur | `prescripteur` |

**Note @fullstack** : état non-sélectionné = contour, sélectionné = fond brand couleur sobre. Smart default par page source : si `?source=piscines-bien-etre` → chip "Piscine & bien-être" pré-activé. Labels affichés en français exactement comme ci-dessus. Arbitrage P0-2.

---

#### Champ 5 — Commune

**Label** : Commune
**Placeholder** : Le Vésinet, Saint-Nom-la-Bretèche…
**Obligatoire** : oui (marqué d'un astérisque)
**Note** : Les noms de communes dans le placeholder servent de signal implicite : "on connaît votre territoire". Ne pas écrire "votre adresse" (trop intrusif pour un premier contact).

---

#### Champ 6 — Budget (optionnel — formulation non intrusive)

**Label** : Budget envisagé
**Type** : liste déroulante (non obligatoire — pas d'astérisque)
**Obligatoire** : non
**Options (wording français exact — correspondance API)** :

| Label affiché | Valeur API (`budget_tranche`) |
|--------------|------------------------------|
| *(Choisir si vous le souhaitez)* | *(absent du payload)* |
| 50 à 80 k€ | `50_80k` |
| 80 à 150 k€ | `80_150k` |
| Plus de 150 k€ | `150k_plus` |
| Je préfère en discuter | `prefere_discuter` |

**Note** : Jamais "budget maximum" — la formulation "envisagé" est neutre et respectueuse. L'option "Je préfère en discuter" permet de ne pas bloquer un lead qui ne veut pas se positionner. Pas de palier < 50 k€ (non cohérent avec le ticket minimum qualifié). Arbitrage P0-3.

---

#### Champ 7 — Description du projet

**Label** : Décrivez-nous votre projet
**Placeholder** : Ce que vous souhaitez créer, rénover ou transformer — en quelques mots ou en détail, comme vous préférez.
**Obligatoire** : oui (marqué d'un astérisque) — minimum 20 caractères
**Note @fullstack** : textarea, min 3 lignes visibles. Pas de compteur de caractères visible (contraignant pour la cible — arbitrage P2-1). Message d'erreur uniquement si < 20 chars à la soumission.

---

#### Bouton d'envoi

**Texte du bouton** : Parlez-nous de votre projet
**Note** : jamais "Envoyer ma demande", "Envoyer", "Valider", "Soumettre" — trop administratif. Jamais "Demander un devis" — registre discount. Wording arbitré P1-4 (arbitrations-p0-checkpoint.md).

---

### Mention RGPD sous le formulaire

> Texte issu de rgpd-checklist.md §D — à intégrer tel quel, sans modification.

**Texte à intégrer (version courte recommandée)** :

> Les informations recueillies dans ce formulaire sont utilisées exclusivement pour traiter votre demande et établir un éventuel devis. Elles sont conservées 3 ans et ne sont partagées avec aucun tiers commercial. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition : contact@aqua-system.fr. [Politique de confidentialité →]

**Note @fullstack** : le lien "Politique de confidentialité →" pointe vers `/politique-confidentialite` (URL arbitrée P1-2 — arbitrations-p0-checkpoint.md). Texte en corps 12px, couleur secondaire (gris sobre), jamais en rouge ou en gras — ce n'est pas une alerte, c'est une information.

---

## 2. Messages d'erreur du formulaire — Wording exact par champ

> Ton : empathique, actionnable, jamais technique. Jamais "Erreur 422" ni "Champ invalide".
> Jamais de point d'exclamation. Jamais de majuscules d'alerte.

### Erreurs de validation côté champ (inline)

| Champ | Condition d'erreur | Message affiché |
|-------|-------------------|-----------------|
| Votre projet | Champ vide à la soumission | Ce champ nous aide à préparer notre réponse — quelques mots suffisent. |
| Commune | Champ vide à la soumission | Précisez votre commune pour que nous puissions répondre de façon pertinente. |
| Description | Champ vide à la soumission | Décrivez votre projet en quelques mots — cela guidera notre premier échange. |
| Votre nom | Champ vide à la soumission | Votre nom nous permet de vous répondre personnellement. |
| Email | Champ vide à la soumission | Nous avons besoin de votre email pour vous répondre. |
| Email | Format invalide (pas d'@) | L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr). |
| Téléphone | Format invalide (si rempli) | Ce numéro ne semble pas valide — vérifiez ou laissez ce champ vide si vous préférez. |

**Note @fullstack** : les messages d'erreur apparaissent sous le champ concerné, en rouge sobre (#DC2626 ou équivalent de la charte), après tentative de soumission ou sur blur du champ (pas en temps réel à chaque frappe — trop intrusif).

---

### Erreur d'envoi — Échec technique (erreur réseau ou serveur)

> Contexte : la fonction Cloudflare Workers a échoué ou le délai a expiré.

**Message affiché** (bloc visible, en haut du formulaire ou à la place du formulaire) :

> Votre message n'a pas pu être envoyé — une erreur technique est survenue de notre côté.
>
> Vous pouvez réessayer dans quelques instants, ou nous contacter directement par email ou téléphone.
>
> **contact@aqua-system.fr**
> **01 30 42 26 00**

**Note @fullstack** : ne pas effacer le contenu du formulaire lors de l'erreur d'envoi. L'utilisateur ne doit pas avoir à tout ressaisir. Proposer un bouton "Réessayer" à côté du message.

---

### Erreur de spam / protection anti-bot

> Si un honeypot ou un CAPTCHA silencieux rejette la soumission.

**Message affiché** :

> Nous n'avons pas pu traiter votre demande. Si vous avez rempli le formulaire normalement, réessayez ou contactez-nous directement.
>
> **contact@aqua-system.fr**
> **01 30 42 26 00**

**Note** : ne pas mentionner "spam" ni "bot" dans le message visible — cela peut embarrasser un utilisateur légitime.

---

## 3. Message de succès — Post-soumission

> Contexte : formulaire envoyé avec succès. C'est le dernier contact avant le silence de l'attente — le message doit rassurer sans promettre un délai non confirmé.

**Message affiché** (page de confirmation ou bloc de remplacement du formulaire) :

---

> **Votre message est bien parvenu.**
>
> Nicolas Berg reviendra vers vous sous 48 heures pour un premier échange autour de votre projet.
>
> Si votre demande est urgente, vous pouvez aussi nous appeler directement au **01 30 42 26 00**.

---

**Note** : délai CONFIRMÉ par le fondateur (2026-06-12) : sous 48 heures. Si la capacité réelle change, mettre à jour REPLY_DELAY_TEXT (constants.ts) et cette section ensemble.

**Variante si le délai est confirmé** :
> Nicolas Berg reviendra vers vous dans les [X] jours ouvrés pour un premier échange autour de votre projet.

**Note @fullstack** : afficher sur la page `/contact/merci` (page statique distincte — P0-4, arbitrations-p0-checkpoint.md). Pas de remplacement inline. Pas de confetti, pas d'animation excessive. Ton sobre.

---

## 4. Empty states — Portfolio filtré sans résultat

> Contexte : l'utilisateur a filtré le portfolio par type de projet ou par zone et aucune réalisation ne correspond.

**Message affiché** :

> Aucune réalisation ne correspond à cette sélection pour le moment.
>
> Notre portfolio s'enrichit régulièrement — revenez consulter prochainement, ou [découvrez l'ensemble de nos réalisations →].

**Note** : ne pas écrire "Aucun résultat trouvé" — registre moteur de recherche. Proposer une sortie (lien vers portfolio complet). Ne pas promettre de délai de mise à jour du portfolio.

---

## 5. CTAs — Variantes contextuelles

> CTA unique de marque : "Parlez-nous de votre projet"
> Déclinaisons par page — toujours ≤ 8 mots, verbe d'action + bénéfice immédiat.
> Jamais "Demandez un devis", "Contactez-nous", "En savoir plus" seul.

| Page / contexte | CTA principal | CTA secondaire (si besoin) |
|----------------|--------------|--------------------------|
| Hero d'accueil | Parlez-nous de votre projet | Découvrir nos réalisations |
| Page réalisations | Parlez-nous de votre projet | — |
| Une réalisation spécifique | Ce projet vous inspire ? Parlons du vôtre | — |
| Page méthode / process | Décrivez-nous votre projet | — |
| Espace prescripteurs | Présentons-nous — portfolio et références disponibles | Parlez-nous d'un projet en cours |
| Footer | Parlez-nous de votre projet | — |
| Page 404 | Découvrir nos réalisations | Parlez-nous de votre projet |
| Message succès formulaire | — (pas de CTA — l'action est faite) | — |

**Règle** : un seul CTA par vue. Si deux CTA coexistent, l'un est principal (plein), l'autre est secondaire (contour ou lien texte).

---

## 6. Navigation et footer — Wording exact

### Navigation principale (ordre définitif — arbitrage P0-5)

| Position | Label | URL | Note |
|----------|-------|-----|------|
| 1 | Réalisations | /realisations | Vecteur de conviction principal (brand-platform.md §6) — vient en premier |
| 2 | Piscines & Bien-être | /piscines-bien-etre | Expertise Aqua System |
| 3 | Jardins & Paysage | /jardins-paysage | Expertise Les Terres Essentielles |
| 4 | Notre approche | /notre-approche | Méthode, les deux maisons, preuves |
| 5 | La maison | /la-maison | Identité, histoire — en fin de parcours de conviction |
| 6 | Architectes | /prescripteurs | Espace Camille — label sobre, pas "Professionnels" ni "Espace prescripteurs" |

**Note** : pas de "Accueil" dans la navigation (logo = lien home). Pas de "Contact" dans la nav principale — "Contact" = bouton CTA "Parlez-nous de votre projet" dans le header. Pas de "Services" générique. Ordre et libellés font autorité (arbitrations-p0-checkpoint.md §P0-5).

### Footer — Wording exact des sections

**Section 1 — Description courte**
> [Aquasystem] — eau, jardin, propriété.
> En partenariat avec Les Terres Essentielles.

**Section 2 — Navigation footer**
- Réalisations
- Piscines et spas
- Jardins et parcs
- Notre approche
- Espace prescripteurs
- Contact

**Section 3 — Mentions légales**
- Mentions légales
- Politique de confidentialité
- [Nom de l'outil analytics retenu — Umami — ne requiert pas de mention cookie si exempté CNIL]

**Section 4 — Contact**
> Aqua System
> 45 Route Nationale, 78840 Freneuse
> 01 30 42 26 00
> contact@aqua-system.fr

**Copyright**
> © [Année] SARL AQUA SYSTEM — SIREN 903 785 327. Tous droits réservés.

**Note @fullstack** : l'année dans le copyright est dynamique (JS ou build-time). Ne pas hardcoder 2026.

---

## 7. Page 404 — Ton de marque

> Sobre, humain, sans humour forcé (source : brand-platform.md §4 ton variable).
> Jamais de dessin animé, de blague, de "oups !".

**Titre H1** :
> Cette page n'existe pas.

**Corps** :
> Elle a peut-être été déplacée ou l'adresse a été mal copiée.
>
> Vous pouvez retrouver nos réalisations, découvrir notre approche ou nous décrire votre projet.

**CTAs** :
> [Voir les réalisations →] [Parlez-nous de votre projet →]

**Note** : la page 404 ne comporte pas de formulaire. Deux sorties claires suffisent.

---

## 8. Synthèse des besoins @fullstack

| Élément | Fichier concerné | Statut copy |
|---------|-----------------|-------------|
| Labels + placeholders formulaire | Formulaire de contact | Wording exact — prêt à intégrer |
| Erreurs inline par champ | Formulaire de contact | Wording exact — prêt à intégrer |
| Erreur d'envoi technique | Cloudflare Workers response | Wording exact — prêt à intégrer |
| Message de succès | Confirmation post-soumission | Wording exact — [À CONFIRMER délai] |
| Mention RGPD sous formulaire | Formulaire de contact | Texte de rgpd-checklist.md §D — prêt |
| Navigation principale | Layout | Labels exacts — ordre suggéré |
| Footer | Layout | Wording exact — prêt à intégrer |
| Page 404 | /404 ou /_not-found | Wording exact — prêt à intégrer |
| Empty state portfolio | Page réalisations | Wording exact — prêt à intégrer |
| CTAs par page | Toutes les pages | Tableau section 5 — prêt |

---

## 9. Points d'attention avant mise en ligne

1. ~~Délai de réponse~~ — CONFIRMÉ fondateur 2026-06-12 : sous 48 heures (appliqué dans constants.ts et le message de succès).
2. **Formulation LTE** — vérifier par Grep avant publication : "groupe", "nos sociétés", "filiales", "même propriétaire". Formulations autorisées rappelées dans brand-voice.md §3.
3. **Mention RGPD** — intégrer le texte exact de rgpd-checklist.md §D sans modification. L'email contact@aqua-system.fr doit être opérationnel au lancement.
4. **Budget du formulaire** — le champ budget (optionnel) avec liste déroulante nécessite une validation @product-manager sur les tranches retenues.
5. **Nom de marque ombrelle** — "[Aquasystem]" est le nom de travail provisoire (project-context.md). Remplacer par une variable/token dans le code, jamais en dur dans des assets difficiles à modifier.

---

## 10. Wording corps page /prescripteurs (P1-5)

> Destinataire : Camille — architecte DPLG, architecte paysagiste, décorateur d'intérieur (35-55 ans, cabinet 78/92 ou Paris).
> Ton : pair à pair, professionnel, sans posture commerciale. Elle juge en 30 secondes. Zéro formule de vente.
> [Framework : AIDA conviction-first — Attention (reconnaissance entre pairs) → Intérêt (preuves opposables) → Désir (protocole protecteur de sa relation client) → Action douce]
> [Conscience : Problem-Aware — Camille a été déçue par des exécutants qui dévient du plan ou court-circuitent la relation. Elle cherche une exception.]

---

### H1

> Pour les architectes et paysagistes prescripteurs.

---

### Bloc 1 — Ce que nous apportons

**H2** : Un exécutant qui lit les plans.

> Bureau d'études intégré, 30 ans de chantiers dans le 78 et le 92. Nous travaillons sur votre cahier des charges ou co-concevons en amont — avant le premier plan de masse, si vous le souhaitez.
>
> Certification Socotec CSP/ESP-001. Membre du réseau L'Esprit Piscine. [À CONFIRMER : PDF téléchargeables ou disponibles sur demande]

**Note rédaction** : les preuves viennent avant la promesse — c'est l'inverse du discours commercial. Camille lit les certifications avant de lire le pitch.

---

### Bloc 2 — Comment nous travaillons ensemble

**H2** : Votre relation avec votre client reste la vôtre.

> Nous ne parlons pas budget directement à votre client. Toutes les décisions de chantier vous passent par vous — c'est notre protocole, pas une exception accordée sur demande.
>
> Interlocuteur technique dédié par chantier. Points d'avancement à la cadence que vous choisissez. Si un problème d'exécution se pose, vous êtes le premier appelé.

**Note rédaction** : ce bloc traite l'objection n°1 de Camille (prestataire qui court-circuite la relation). Le dire explicitement en fait un engagement, pas un argument vague.

---

### Bloc 3 — Nos réalisations dans votre périmètre

**H2** : 30 ans de réalisations en 78/92 — portfolio sur demande.

> Terrains en pente, contraintes PLU, délais de réalisation stricts. Nous connaissons les sols de Saint-Nom-la-Bretèche, les servitudes du Vésinet, les exigences des propriétaires de Ville-d'Avray.
>
> Nos références sont locales, identifiables et vérifiables.

**Note rédaction** : nommer les communes crée la reconnaissance. Camille sait si un exécutant connaît vraiment son territoire. "Vérifiables" répond à sa frustration n°4 (manque de lisibilité sur les preuves).

---

### CTA

**Texte du bouton** : Présentons-nous

**Note @fullstack** : le CTA pointe vers le formulaire de contact `/contact` avec `?source=prescripteurs` pour le smart default chip "Je suis prescripteur". Pas de lien séparé — le formulaire unique est suffisant. Texte du bouton : 2 mots, pair à pair, aucune posture commerciale.

**CTA secondaire (optionnel, en lien texte)** : Parlez-nous d'un projet en cours

---

### Note copywriting — Ce qui est délibérément absent

- Pas de mention tarifaire (Camille ne cherche pas son coût, elle cherche la valeur pour son client)
- Pas de "partenariat" sans définir le cadre (formulation proscrite avant acquisition LTE)
- Pas de superlatif ("le meilleur", "référence absolue") — les preuves factuelles suffisent
- Pas d'invitation à "rejoindre notre réseau" — registre franchise incompatible avec le ton pair

---

*Section P1-5 ajoutée par @copywriter — 2026-06-11*
*Source : personas.md §Camille, brand-voice.md §4d, arbitrations-p0-checkpoint.md P1-5*

---

*Fichier produit par @copywriter — 2026-06-11 | Mise à jour harmonisation P0 — 2026-06-11*
*Source : brand-voice.md, brand-platform.md §4, creative-brief.md §8, legal-audit.md §B, rgpd-checklist.md §D, personas.md, arbitrations-p0-checkpoint.md*
