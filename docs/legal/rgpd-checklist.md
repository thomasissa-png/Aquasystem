# Registre des traitements & Checklist RGPD
> Site vitrine umbrella [NOM OMBRELLE] — SARL AQUA SYSTEM, responsable de traitement
> Rédigé par l'agent @legal — 2026-06-11
> Draft de référence. Faire valider par un avocat ou un DPO externe pour la version finale.

---

## RISQUES EN 5 POINTS (résumé exécutif)

1. **P0 — CONSENTEMENT ANALYTIQUE** : Si une solution d'analytics avec cookies est choisie (hors liste exemptée CNIL), la bannière de consentement devient obligatoire avant tout dépôt de traceur. Solution recommandée : Plausible Analytics ou Cloudflare Web Analytics (exemptés de consentement).
2. **P1 — DURÉE DE CONSERVATION** : Les données du formulaire de contact doivent être supprimées à 3 ans (prospects non convertis). Absence de procédure de purge = non-conformité.
3. **P1 — DROITS DES PERSONNES** : Obligation d'afficher une mention d'information directement sous le formulaire de contact (point de collecte). Texte prêt à l'emploi fourni section D.
4. **P2 — LOGS CLOUDFLARE** : Les logs serveur constituent un traitement de données personnelles (adresses IP). À mentionner dans le registre et dans la politique de confidentialité.
5. **P2 — EMAIL DE RÉCEPTION** : L'adresse contact@aqua-system.fr qui reçoit les formulaires doit être sécurisée et les données ne pas transiter vers des outils tiers non encadrés par un DPA.

---

## A. REGISTRE DES TRAITEMENTS

> Obligation RGPD art. 30 — applicable à toute organisation, même sans DPO désigné.

### Traitement 1 — Formulaire de contact

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Réception et traitement des demandes de contact / devis |
| **Responsable de traitement** | SARL AQUA SYSTEM — Nicolas Berg, gérant — 45 Route Nationale, 78840 Freneuse |
| **Finalité** | Répondre aux demandes de contact, établir des devis, gérer la prospection commerciale |
| **Base légale** | Intérêt légitime (art. 6.1.f RGPD) — intérêt légitime du responsable à répondre à des demandes initiées par les personnes elles-mêmes. Alternative acceptable : consentement (art. 6.1.a) via case à cocher, mais l'intérêt légitime est suffisant et moins contraignant pour un formulaire de contact à l'initiative de l'utilisateur. |
| **Catégories de données** | Nom et prénom, adresse email, numéro de téléphone, description du projet (données libres), [éventuellement : adresse postale si fournie volontairement] |
| **Données sensibles** | Non — aucune donnée de l'art. 9 RGPD |
| **Destinataires** | Nicolas Berg et les membres de l'équipe Aqua System habilités à traiter les demandes commerciales. Sous-traitant : prestataire d'envoi email (Pages Function Cloudflare + service d'email — [À CONFIRMER : SendGrid / Resend / autre service email utilisé ?]) |
| **Transfert hors UE** | Cloudflare Inc. (USA) — encadré par le Data Privacy Framework EU-US (Cloudflare certifié) + DPA Cloudflare |
| **Durée de conservation** | 3 ans à compter du dernier contact pour les prospects non convertis. Pour les clients ayant conclu un contrat : durée du contrat + 5 ans (prescription commerciale) |
| **Mesures de sécurité** | Transmission chiffrée HTTPS, accès restreint aux habilités, boîte email sécurisée |
| **Droit de retrait** | Sans objet (base = intérêt légitime) — droit d'opposition applicable (voir section C) |

### Traitement 2 — Logs d'hébergement Cloudflare

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Journaux d'accès serveur (logs techniques) |
| **Responsable de traitement** | SARL AQUA SYSTEM |
| **Finalité** | Sécurité du site, diagnostic technique, détection d'attaques (DDoS, bots) |
| **Base légale** | Intérêt légitime (art. 6.1.f RGPD) — sécurité des systèmes d'information |
| **Catégories de données** | Adresses IP, horodatage, URL consultées, type de navigateur (user-agent), code HTTP de réponse |
| **Données sensibles** | Non |
| **Destinataires** | Cloudflare Inc. (hébergeur/sous-traitant) |
| **Transfert hors UE** | Cloudflare Inc. (USA) — encadré par le Data Privacy Framework EU-US |
| **Durée de conservation** | 30 jours maximum (durée standard des logs Cloudflare) — [À CONFIRMER : paramétrage effectif dans le dashboard Cloudflare] |
| **Mesures de sécurité** | Infogérée par Cloudflare — infrastructure ISO 27001 |

### Traitement 3 — Analytics (à venir)

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Mesure d'audience du site vitrine |
| **Responsable de traitement** | SARL AQUA SYSTEM |
| **Finalité** | Analyse du comportement de navigation, amélioration du site, mesure des performances SEO |
| **Base légale** | **Si solution exemptée CNIL** (Plausible, Cloudflare Web Analytics) : intérêt légitime — aucun consentement requis. **Si solution avec cookies** (Google Analytics 4, Matomo avec cookies) : consentement (art. 6.1.a) — bannière obligatoire. |
| **Catégories de données** | **Solution exemptée** : pages vues, source de trafic, type d'appareil — données agrégées, non individualisées, adresse IP tronquée/non conservée. **Solution avec cookies** : identifiant unique (cookie), parcours de navigation, données techniques |
| **Données sensibles** | Non |
| **Destinataires** | Fournisseur analytics — [À CONFIRMER : choix de l'outil par @data-analyst] |
| **Transfert hors UE** | Dépend de l'outil choisi — voir section B |
| **Durée de conservation** | **Solution exemptée** : données agrégées uniquement, pas de conservation individuelle. **Solution avec cookies** : 13 mois maximum (recommandation CNIL) |
| **Mesures de sécurité** | Dépend de l'outil |

---

## B. RECOMMANDATION ANALYTICS — SOLUTION EXEMPTÉE DE CONSENTEMENT

### Critères d'exemption CNIL (délibération n°2020-091 du 17 septembre 2020)

Pour être exemptée de consentement, une solution d'analytics doit satisfaire TOUS ces critères :
- Finalité strictement limitée à la mesure d'audience (pas de croisement avec d'autres traitements)
- Pas de transmission des données à des tiers
- Pas de réidentification des personnes
- Information des personnes (mention dans la politique de confidentialité)
- Adresse IP tronquée ou non conservée
- Pas de cookie persistant cross-domaines

### Solutions recommandées (exemptées CNIL)

**Option 1 — Cloudflare Web Analytics (recommandée prioritaire)**
- Intégration native Cloudflare Pages → zéro démarche d'activation supplémentaire
- Pas de cookie, pas de fingerprinting
- Données restent dans l'infrastructure Cloudflare déjà utilisée
- Gratuit
- Tableaux de bord : vues, visiteurs uniques (agrégés), sources de trafic, pages populaires
- Limite : moins granulaire que Google Analytics — suffisant pour un site vitrine à faible volume

**Option 2 — Plausible Analytics**
- Open source, hébergement EU disponible (Allemagne/Union européenne)
- Certifié conforme RGPD par ses concepteurs, retenu par de nombreux DPO européens
- Pas de cookie, pas de données personnelles collectées
- Coût : ~9 €/mois (jusqu'à 10 000 pages vues/mois)
- Tableaux de bord complets : conversions, sources, géographie, appareil

**Option 3 — Matomo (hébergement propre ou cloud EU)**
- Open source, configurable pour exemption CNIL (anonymisation IP, désactivation cookies)
- Si hébergé sur Cloudflare Workers → zéro transfert hors UE
- Coût : gratuit (auto-hébergé) ou ~23 €/mois (cloud EU)
- Plus complexe à configurer correctement pour l'exemption

### Ce qui change si cookies marketing un jour

Si le fondateur décide d'activer Google Ads (remarketing), Meta Pixel, ou tout outil de publicité ciblée :
1. **Bannière de consentement obligatoire** (opt-in positif AVANT dépôt de cookie — CJUE C-673/17, 1er octobre 2019)
2. **Gestionnaire de consentement (CMP)** requis : Axeptio, Didomi, ou équivalent certifié IAB TCF
3. **Politique de confidentialité** à mettre à jour avec les finalités publicitaires
4. **Durée de conservation cookies** : 13 mois maximum
5. **Droit de retrait du consentement** : aussi simple que l'octroi du consentement
6. **Impact mesure d'audience** : si GA4 est ajouté pour le remarketing, il ne peut plus être considéré comme une mesure d'audience pure → quitter l'exemption et passer au consentement pour l'analytics aussi

---

## C. DROITS DES PERSONNES

### Droits applicables (RGPD art. 15 à 22)

| Droit | Applicable ? | Conditions |
|-------|-------------|------------|
| Accès (art. 15) | Oui | Toute personne peut demander quelles données la concernant sont traitées |
| Rectification (art. 16) | Oui | Corriger des données inexactes |
| Effacement / "droit à l'oubli" (art. 17) | Oui | Hors obligation légale de conservation (ex : prescription commerciale 5 ans si client) |
| Limitation du traitement (art. 18) | Oui | Pendant la durée de traitement d'une contestation |
| Portabilité (art. 20) | Limité | Applicable seulement si base légale = consentement ou contrat. Sur intérêt légitime : non applicable pour le formulaire de contact |
| Opposition (art. 21) | Oui | Droit d'opposition au traitement sur intérêt légitime — à traiter dans un délai raisonnable (1 mois) |

### Canal d'exercice des droits

**Point de contact** : contact@aqua-system.fr — mentionner dans la politique de confidentialité et sous le formulaire.

**Délai de réponse** : 1 mois (art. 12 RGPD), prorogeable de 2 mois supplémentaires pour les demandes complexes (information du demandeur requise).

**Autorité de contrôle** : Commission Nationale de l'Informatique et des Libertés (CNIL) — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — www.cnil.fr — 01 53 73 22 22. À mentionner dans la politique de confidentialité.

---

## D. MENTION D'INFORMATION SOUS LE FORMULAIRE DE CONTACT

> Texte prêt à l'emploi — à intégrer directement sous le bouton d'envoi du formulaire. Ton sobre, haut de gamme.

---

**Version courte (recommandée — lien vers politique complète)**

> Les informations recueillies dans ce formulaire sont utilisées exclusivement pour traiter votre demande et établir un éventuel devis. Elles sont conservées 3 ans et ne sont partagées avec aucun tiers commercial. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition : contact@aqua-system.fr. [Politique de confidentialité complète →]

---

**Version longue (si le design permet plus de texte)**

> SARL AQUA SYSTEM (SIREN 903 785 327) traite les données saisies dans ce formulaire sur la base de son intérêt légitime à répondre à votre demande. Ces données (nom, coordonnées, description du projet) sont conservées pendant 3 ans à compter de notre dernier échange. Elles sont transmises à nos équipes et à notre prestataire d'hébergement (Cloudflare Inc., États-Unis, couvert par le cadre EU-US Data Privacy Framework). Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition en écrivant à contact@aqua-system.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).

---

## E. CHECKLIST CONFORMITÉ RGPD — ÉTAT DES LIEUX

| # | Point de contrôle | Statut | Action requise |
|---|-------------------|--------|----------------|
| 1 | Registre des traitements formalisé | En cours (ce document) | Valider avec fondateur |
| 2 | Mention d'information sous le formulaire | Rédigée (section D) | Intégrer dans le code (@fullstack) |
| 3 | Politique de confidentialité accessible | Rédigée (privacy-policy.md) | Mettre en ligne avec le site |
| 4 | Lien politique de confidentialité dans le footer | A faire | @fullstack |
| 5 | DPA Cloudflare signé | [À CONFIRMER] | Nicolas Berg à signer |
| 6 | Solution analytics exemptée retenue | A décider | @data-analyst + fondateur |
| 7 | Procédure de purge à 3 ans (prospects) | Non existante | Mettre en place rappel calendaire |
| 8 | Droits des personnes : canal de réception | contact@aqua-system.fr | Vérifier suivi opérationnel |
| 9 | Sécurité email réception formulaire | [À CONFIRMER] | Vérifier chiffrement + accès |
| 10 | Bannière cookies | Non requise (si solution exemptée) | A activer si cookies marketing |
| 11 | DPO désigné | Non obligatoire | Désigner Nicolas Berg comme référent interne |
| 12 | Mentions légales LCEN | Rédigées (mentions-legales-draft.md) | Mettre en ligne avec le site |
