# Contexte Projet — Site umbrella Aqua System × Les Terres Essentielles

> Ce fichier est lu par tous les agents avant toute action.
> **ATTENTION** : contient des informations stratégiques — repo à garder **privé**.
> Dernière mise à jour : 2026-06-11

---

## Identité
- **Nom du projet** : Site vitrine umbrella (nom de marque ombrelle À CRÉER — livrable Phase 0/1, l'équipe est force de proposition + vérification dispo domaines .fr)
- **URL (si existante)** : aucune pour l'umbrella. Existant : https://www.aqua-system.fr/ (très daté, deviendra à terme une landing dédiée refaite ou redirigé — décision finale en Phase 0)
- **Secteur** : aménagement extérieur haut de gamme — piscines sur mesure + paysage/jardins (B2C premium + prescripteurs B2B architectes)
- **Stade** : [x] Idée (nouveau site) — les 2 activités sous-jacentes sont en production depuis des années
- **Date de début** : 2026-06-11

### Architecture de marque (décision validée fondateur)
**Option (a)** : marque ombrelle NOUVELLE qui chapeaute les deux maisons. Aqua System et Les Terres Essentielles restent visibles comme « expertises maison ». Objectif croisé : que chaque marque amène du business à l'autre.

### Les deux entités
| | Aqua System | Les Terres Essentielles |
|---|---|---|
| Activité | Conception, construction, rénovation, entretien de piscines sur mesure ; spas (HotSpring), saunas, hammams ; traitement d'eau, robots (Dolphin), SAV | Jardinerie, bureau d'études paysager, création et entretien de parcs & jardins, pépinière |
| Preuves | Réseau L'Esprit Piscine, certification Socotec « Professionnels de la piscine » (CSP/ESP-001), 30+ ans d'activité, 350+ piscines entretenues ouest parisien, équipe de 8 | Bureau d'études intégré, jardinerie physique |
| Forme juridique | SARL AQUA SYSTEM, SIREN 903 785 327, capital 20 000 €, NAF 4399D, gérant Nicolas Berg | SAS LES TERRES ESSENTIELLES, SIREN 811 198 217, NAF 47.76Z, créée 2015. ⚠️ [À CONFIRMER : Pappers indique Patrick Rouzeval président — lien exact avec Nicolas Berg à clarifier avant mentions légales] |
| Adresse | 45 Route Nationale, 78840 Freneuse — 01 30 42 26 00 — contact@aqua-system.fr | CD n°45, Route d'Orgeval, 78580 Les Alluets-le-Roi |
| Présence en ligne | aqua-system.fr + fiche Google Business existante + LinkedIn | Page Facebook uniquement (pas de site) |

---

## Cible
- **Persona principal** : « Alexandre », 45-60 ans, capital élevé (chef d'entreprise, sportif pro, acteur, héritier), propriétaire d'une belle maison dans le 78/92 (Le Vésinet, Saint-Nom-la-Bretèche, Ville-d'Avray…). Projet global extérieur (piscine + jardin) vu comme un projet de vie. Ticket piscine : 70 000-80 000 € minimum.
- **Problème principal** : trouver UN partenaire de confiance capable de porter la vision globale (eau + végétal) au niveau d'exigence attendu, sans avoir à coordonner lui-même plusieurs artisans. [HYPOTHÈSE — à affiner avec verbatims réels en Phase 0, autorisé fondateur « il va falloir qu'on soit créatif »]
- **Alternative actuelle** : descendre en gamme (concurrents moins chers) — la concurrence directe de Nicolas se fait par le prix, pas par la qualité. Ou bien : juxtaposer pisciniste + paysagiste séparés.
- **Persona secondaire** : architecte / architecte paysagiste prescripteur cherchant un exécutant fiable haut de gamme pour ses clients dans le 78/92.
- **Verbatims persona** : AUCUN verbatim réel fourni. À construire en Phase 0 comme verbatims [HYPOTHÈSE] plausibles (autorisation fondateur), à valider/remplacer par du réel dès que possible. Interdiction de les utiliser comme faux témoignages publics (règle anti-témoignage fictif).

---

## Positionnement
- **Promesse unique** : « Rendre réels de vrais projets de vie — de la vision à la réalisation. » Un seul interlocuteur pour l'eau et le jardin, au niveau d'exigence des belles propriétés de l'ouest parisien.
- **Ton de marque** : expert proche — respectueux, sobre, adapté à une cible exigeante ; « sur qui on peut compter » ; on en a pour son argent. Jamais tape-à-l'œil, jamais discount.
- **3 mots qui DÉFINISSENT la marque** : exigence, confiance, sur-mesure [HYPOTHÈSE — à valider checkpoint Phase 0]
- **3 mots qui ne DÉFINISSENT PAS la marque** : low-cost, standardisé, bling-bling [HYPOTHÈSE]
- **Concurrent principal** : acteurs moins chers du marché (réseaux/concessions et artisans positionnés prix). Pas de concurrent nommé dans les livrables client-facing (règle commune n°9).
- **Notre différence clé vs eux** : le haut de gamme assumé + la double expertise intégrée piscine/paysage + 30 ans d'ancrage local 78/92.

---

## Objectifs
- **Objectif principal à 6 mois** : générer du lead entrant qualifié via le site umbrella.
- **KPI North Star** : **10 leads entrants qualifiés / mois** (demandes de contact projet haut de gamme, toutes activités confondues).
- **Objectif secondaire** : (1) perception de marque premium alignée sur la réalité des prestations (le site actuel dessert la marque) ; (2) cross-selling mesurable entre les 2 maisons ; (3) référencement local incontournable 78/92.
- **Ce que le succès ressemble à 12 mois** : le site est LA carte de visite citée en rendez-vous ; flux régulier de leads entrants ≥ 10/mois ; les architectes prescripteurs le partagent ; positions SEO locales fortes sur piscine haut de gamme + paysagiste 78/92.

---

## Stack technique
- **Frontend** : [x] Next.js (App Router, export statique en V1 — pas de backend nécessaire hors formulaire)
- **Backend** : [x] Cloudflare Workers/Pages Functions uniquement pour le formulaire de contact (envoi email). Pas de BDD en V1.
- **Base de données** : aucune en V1
- **Authentification** : aucune en V1
- **Hébergement** : [x] Cloudflare Pages (validé fondateur — VPS écarté : maintenance inutile pour un site vitrine)
- **Outils IA utilisés** : aucun en production V1
- **Budget IA mensuel (tokens)** : à définir (génération d'assets éventuelle en phase design)
- **Volume d'usage IA prévu** : n/a en V1
- **Latence IA cible** : n/a
- **Outils d'analytics** : à recommander par @data-analyst (contrainte : léger, RGPD-friendly, idéalement sans bandeau cookie type Plausible/Cloudflare Analytics) [HYPOTHÈSE]

---

## Modèle économique et juridique
- **Modèle économique** : [x] Site vitrine (génération de leads pour 2 sociétés de services)
- **Pays de commercialisation** : France (zone de chalandise : Yvelines 78 + Hauts-de-Seine 92 ; historiquement aussi 27 et 95)
- **Données sensibles collectées** : [x] Non — formulaire de contact uniquement (nom, coordonnées, projet)
- **Utilisation d'IA générative** : [ ] Non en production. Possible pour assets visuels en conception (à valider).
- **Mentions légales** : 2 entités à mentionner (cf. tableau Identité). ⚠️ Clarifier la gouvernance Terres Essentielles avant publication.

---

## Contraintes
- **Budget mensuel infrastructure** : ~0-20 €/mois (Cloudflare Pages + domaine)
- **Budget mensuel acquisition** : à définir au fur et à mesure
- **Budget analytics** : à recommander (gratuit de préférence)
- **Timeline de lancement** : pas d'échéance dure — « on avance ». Vélocité IA : V1 complète sans couper de feature.
- **Contraintes légales ou sectorielles** : mentions légales 2 sociétés ; garanties construction (décennale) à vérifier avant affichage ; droit à l'image sur photos de propriétés clients.
- **Ressources disponibles** : [x] Solo (fondateur côté client : Nicolas Berg, représenté par team@sarani.studio qui PRÉVALIDE TOUT — checkpoint obligatoire après Phase 0 et avant toute publication)

---

## Existant
- **URL du site actuel** : https://www.aqua-system.fr/ (très daté — ne PAS reprendre le design, seulement les faits/contenus)
- **Comptes sociaux existants** : Facebook Les Terres Essentielles (https://www.facebook.com/LesTerresEssentielles/), LinkedIn Aqua System + profil Nicolas Berg
- **Outils analytics en place** : inconnus (probablement aucun exploitable)
- **Contenu existant** : book Calameo de réalisations : https://www.calameo.com/read/0061881082b3b1e358f6f?authid=U7NQqdhG904V — source principale de photos/projets pour le portfolio. Photos du site actuel en complément. Témoignages : placeholders interdits en public → utiliser preuves factuelles (30 ans, 350 piscines entretenues, Esprit Piscine, Socotec) tant que pas de témoignages réels autorisés.
- **Historique SEO** : aqua-system.fr indexé de longue date (trafic inconnu) ; fiche Google Business Aqua System existante ; Terres Essentielles : aucune présence web propre.

---

## Décisions de scope validées fondateur (2026-06-11)
1. Architecture de marque : option (a) marque ombrelle nouvelle, 2 maisons visibles.
2. Naming : aucune contrainte (pas besoin de « Berg »), équipe force de proposition + check domaines.
3. aqua-system.fr : deviendra probablement une landing dédiée refaite ; redirection/301 à trancher en Phase 0.
4. Assets : partir de l'existant (site actuel + book Calameo).
5. Périmètre services : se baser sur les présences en ligne existantes des 2 marques.
6. Pages V1 + formulaire : conception confiée à l'équipe (@product-manager/@ux) — « viser l'excellence », pas de liste imposée.
7. Langues : FR d'abord, EN prévu (architecture i18n-ready dès la V1).
8. Stack : Cloudflare Pages validé, VPS écarté.
9. Domaine/emails : géré plus tard (ne bloque pas la conception).
10. Validation : le fondateur prévalide tout (checkpoints obligatoires).

---

## Historique des interventions agents

> Chaque agent DOIT compléter ce tableau après chaque livrable. Colonne "Pourquoi" obligatoire.

| Agent | Date | Livrable produit | Décisions clés | Pourquoi / Alternatives écartées |
|-------|------|-----------------|----------------|----------------------------------|
| (session principale) | 2026-06-11 | Installation framework + project-context.md initial | Scope validé en 20 questions/réponses ; architecture marque (a) ; Cloudflare Pages | VPS écarté (maintenance sans bénéfice pour un site vitrine) ; marque unique (b) écartée (les 2 marques ont un capital existant) |
| @legal | 2026-06-11 | Audit juridique complet : `docs/legal/legal-audit.md`, `docs/legal/rgpd-checklist.md`, `docs/legal/mentions-legales-draft.md`, `docs/legal/privacy-policy.md` | SARL AQUA SYSTEM désignée éditrice unique (gouvernance LTE incertaine jusqu'à acquisition) ; formulations "partenariat" recommandées jusqu'à l'acte ; Cloudflare encadré par DPF EU-US ; analytics exemptée CNIL recommandée (Cloudflare Web Analytics ou Plausible) ; EU AI Act non applicable | Co-édition écartée (régime non défini LCEN, risque juridique pendant acquisition) ; Google Analytics sans consentement écarté (non exempt CNIL en configuration standard) |

---

## Performance des agents

| Agent | Date | Livrable | Complétude | Cohérence | Actionnabilité | Messages | Spécificité | Notes |
|-------|------|----------|------------|-----------|----------------|----------|-------------|-------|
| | | | | | | | | |

**Légende (échelle 1-5 alignée avec CLAUDE.md) :**
- **Complétude** : 1 (sections manquantes) → 5 (tout rempli)
- **Cohérence** : 1 (contredit l'existant) → 5 (référence les livrables amont)
- **Actionnabilité** : 1 (vague) → 5 (zéro ambiguïté)
- **Messages** : 1 (silencieux sur les manques) → 5 (tous les manques signalés)
- **Spécificité** : 1 (générique) → 5 (100% taillé pour ce projet)

---

## Notes libres

- **Légal Terres Essentielles (réponse fondateur 2026-06-11)** : Nicolas Berg est **en train de racheter** LES TERRES ESSENTIELLES (Pappers affiche encore Patrick Rouzeval comme président). Le site est préparé pour l'après-acquisition. Conséquences : (1) mentions légales finalisées seulement une fois l'acquisition actée ; (2) pas de mise en ligne publique mentionnant la gouvernance avant ; (3) le copy peut présenter les « deux maisons » réunies, sans affirmation juridique sur la propriété tant que non finalisé.
- L'entité SARL AQUA SYSTEM date de 2021 mais la marque revendique 30+ ans d'activité : utiliser « plus de 30 ans d'expertise » (marque), pas « société créée il y a 30 ans » (faux juridiquement).
- Le book Calameo est protégé par un authid : récupérer les photos sources auprès du fondateur si l'extraction échoue — JAMAIS d'images placeholder identiques labellées différemment dans le portfolio.
- Zéro fausse promesse dans le copy : ne promettre que ce que le site V1 fait réellement.
- CTAs conviction-first : qualification du projet en fin de parcours, pas au premier écran.
