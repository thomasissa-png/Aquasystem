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

#### Champ 1 — Type de projet

**Label** : Votre projet
**Placeholder** : Piscine, jardin, les deux… décrivez librement
**Note @fullstack** : champ texte libre (pas de menu déroulant forcé — obligation creative-brief.md §9). Texte gris clair (#placeholder), disparaît à la saisie.

---

#### Champ 2 — Commune

**Label** : Commune
**Placeholder** : Le Vésinet, Saint-Nom-la-Bretèche…
**Note** : Les noms de communes dans le placeholder servent de signal implicite : "on connaît votre territoire". Ne pas écrire "votre adresse" (trop intrusif pour un premier contact).

---

#### Champ 3 — Budget (optionnel — formulation non intrusive)

**Label** : Budget envisagé — *facultatif*
**Type** : liste déroulante (non obligatoire)
**Options** :
- *(Choisir si vous le souhaitez)*
- 50 000 – 80 000 €
- 80 000 – 150 000 €
- 150 000 € et plus
- Je préfère en discuter

**Note** : L'astérisque ou l'indication "facultatif" est obligatoire pour cette cible. Jamais "budget maximum" — la formulation "envisagé" est plus neutre et plus respectueuse. L'option "Je préfère en discuter" permet de ne pas forcer la réponse sans frustrer.

---

#### Champ 4 — Description du projet

**Label** : Décrivez-nous votre projet
**Placeholder** : Ce que vous souhaitez créer, rénover ou transformer — en quelques mots ou en détail, comme vous préférez.
**Note @fullstack** : textarea, min 3 lignes visibles. Pas de compteur de caractères visible (contraignant pour la cible).

---

#### Champ 5 — Prénom et nom

**Label** : Votre nom
**Placeholder** : Prénom et nom
**Note** : un seul champ — ne pas découper en deux champs séparés. La cible est habituée à être traitée comme une personne, pas comme un formulaire administratif.

---

#### Champ 6 — Email

**Label** : Email
**Placeholder** : votre@email.com
**Note** : minuscules, ton fonctionnel. Pas de "adresse email professionnelle" — la cible peut utiliser une adresse personnelle.

---

#### Champ 7 — Téléphone (optionnel)

**Label** : Téléphone — *facultatif*
**Placeholder** : 06 xx xx xx xx
**Note** : facultatif explicite. L'email suffit pour un premier contact. Ne pas forcer le téléphone — certains leads de qualité préfèrent l'email.

---

#### Bouton d'envoi

**Texte du bouton** : Envoyer ma demande
**Variante si l'espace le permet** : Parlez-nous de votre projet
**Note** : jamais "Envoyer", "Valider", "Soumettre" — trop administratif. Jamais "Demander un devis" — registre discount.

---

### Mention RGPD sous le formulaire

> Texte issu de rgpd-checklist.md §D — à intégrer tel quel, sans modification.

**Texte à intégrer (version courte recommandée)** :

> Les informations recueillies dans ce formulaire sont utilisées exclusivement pour traiter votre demande et établir un éventuel devis. Elles sont conservées 3 ans et ne sont partagées avec aucun tiers commercial. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition : contact@aqua-system.fr. [Politique de confidentialité →]

**Note @fullstack** : le lien "Politique de confidentialité →" pointe vers `/politique-de-confidentialite`. Texte en corps 12px, couleur secondaire (gris sobre), jamais en rouge ou en gras — ce n'est pas une alerte, c'est une information.

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
> Nicolas Berg reviendra vers vous [À CONFIRMER : délai de réponse réel de Nicolas] pour un premier échange autour de votre projet.
>
> Si votre demande est urgente, vous pouvez aussi nous appeler directement au **01 30 42 26 00**.

---

**Note critique** : la mention `[À CONFIRMER : délai de réponse réel de Nicolas]` est un placeholder balisé obligatoire. Ne jamais promettre "sous 24h" ou "sous 48h" sans confirmation de Nicolas Berg sur sa capacité réelle à tenir ce délai. Si le délai est confirmé, remplacer par : "sous [X] jours ouvrés" — toujours en jours ouvrés, jamais en heures.

**Variante si le délai est confirmé (exemple avec 2 jours ouvrés)** :
> Nicolas Berg reviendra vers vous dans les 2 jours ouvrés pour un premier échange autour de votre projet.

**Note @fullstack** : ne pas rediriger vers une autre page — afficher le message dans la même page, à la place du formulaire. Pas de confetti, pas d'animation excessive. Ton sobre.

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

### Navigation principale (ordre suggéré)

| Label | URL suggérée | Note |
|-------|-------------|------|
| Réalisations | /realisations | Premier niveau — c'est le vecteur de conviction principal (brand-platform.md §6) |
| Piscines | /piscines | Expertise Aqua System |
| Jardins | /jardins | Expertise Les Terres Essentielles |
| Notre approche | /approche | Méthode, les deux maisons, preuves |
| Architectes | /prescripteurs | Espace Camille — label sobre, pas "Professionnels" |
| Contact | /contact | Toujours en dernier — conviction avant action |

**Note** : pas de "Accueil" dans la navigation (logo = lien home). Pas de "Services" générique — les deux expertises ont chacune leur page.

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

1. **[À CONFIRMER : délai de réponse réel de Nicolas]** — le message de succès du formulaire contient ce placeholder. Le texte exact ne peut être finalisé qu'avec ce délai confirmé par Nicolas Berg.
2. **Formulation LTE** — vérifier par Grep avant publication : "groupe", "nos sociétés", "filiales", "même propriétaire". Formulations autorisées rappelées dans brand-voice.md §3.
3. **Mention RGPD** — intégrer le texte exact de rgpd-checklist.md §D sans modification. L'email contact@aqua-system.fr doit être opérationnel au lancement.
4. **Budget du formulaire** — le champ budget (optionnel) avec liste déroulante nécessite une validation @product-manager sur les tranches retenues.
5. **Nom de marque ombrelle** — "[Aquasystem]" est le nom de travail provisoire (project-context.md). Remplacer par une variable/token dans le code, jamais en dur dans des assets difficiles à modifier.

---

*Fichier produit par @copywriter — 2026-06-11*
*Source : brand-voice.md, brand-platform.md §4, creative-brief.md §8, legal-audit.md §B, rgpd-checklist.md §D, personas.md*
