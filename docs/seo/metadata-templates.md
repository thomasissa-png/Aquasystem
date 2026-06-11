# Metadata templates — Version finale optimisée
## Aquasystem — 9 pages + modèles composants

> Source de vérité metas SEO pour @fullstack (intégration) et @geo.
> Base : metas provisoires @copywriter (site-copy.md) + keyword-map.md.
> Règles : title < 60 caractères, description < 155 caractères, CTA en description.
> Token `{SITE_NAME}` substituable par le nom final — ne jamais coder en dur.
> Dernière mise à jour : 2026-06-11 | Agent : @seo

---

## Conventions

- `{SITE_NAME}` = constante SITE_NAME de constants.ts (actuellement "Aquasystem")
- `{SITE_URL}` = NEXT_PUBLIC_SITE_URL (jamais le fallback hardcodé en prod)
- Tous les canonicals : URL absolue avec trailing slash (trailingSlash:true confirmé)
- OG title : même que title sauf si title > 60 — alors simplifier pour les cards
- twitter:card : `summary_large_image` (défini en layout — pas à répéter par page)

---

## Page 1 — Accueil (/)

**Metas provisoires @copywriter** :
- Title : `{SITE_NAME} — Piscines & Jardins haut de gamme, Yvelines et Hauts-de-Seine`
- Description : `Plus de 30 ans d'expertise dans l'aménagement extérieur sur mesure en 78/92. Piscines, spas, jardins et parcs — un seul interlocuteur pour l'eau et le végétal.`

**Analyse** : Title provisoire = 72 caractères avec "Aquasystem" = trop long. Description = 145 caractères — dans la limite mais sans CTA explicite. À optimiser : intégrer "pisciniste paysagiste" ou "aménagement extérieur" en title + raccourcir.

**Version finale** :

```ts
title: `${SITE_NAME} — Pisciniste & Paysagiste haut de gamme, 78/92`,
// 56 caractères avec "Aquasystem" — PASS
// Contient : différenciateur double expertise + géo 78/92 (Bing : mot-clé en title)

description: "Piscines et jardins sur mesure dans l'ouest parisien — un seul interlocuteur. Plus de 30 ans d'expertise. Aqua System × Les Terres Essentielles. Contactez-nous.",
// 162 caractères — légèrement long, version courte ci-dessous si besoin de marge :
// "Piscines et jardins sur mesure, Yvelines et Hauts-de-Seine. Un seul interlocuteur, 30 ans d'expertise. Parlez-nous de votre projet."
// 134 caractères — PASS

alternates: { canonical: SITE_URL + '/' },

openGraph: {
  url: SITE_URL + '/',
  title: `${SITE_NAME} — Pisciniste & Paysagiste haut de gamme 78/92`,
  description: "Piscines et jardins sur mesure dans l'ouest parisien — un seul interlocuteur depuis 30 ans.",
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Aquasystem — Piscine et jardin sur mesure, propriété de l\'ouest parisien' }],
},
```

**Paragraphe P1 (H1 sous-jacent)** : "L'extérieur à la hauteur de votre propriété." (tagline validée) — Bing cherche le mot-clé dans P1 : le sous-titre "Un seul interlocuteur pour l'eau et le jardin — depuis plus de 30 ans dans l'ouest parisien" couvre les termes "interlocuteur", "eau", "jardin", "ouest parisien" — satisfaisant.

---

## Page 2 — Piscines & Bien-être (/piscines-bien-etre/)

**Metas provisoires @copywriter** :
- Title : `Piscines sur mesure Yvelines & Hauts-de-Seine — Aqua System`
- Description : `Conception, construction et entretien de piscines haut de gamme en 78/92. Spas HotSpring, saunas, hammams. Certification Socotec. Plus de 30 ans d'ancrage local.`

**Analyse** : Title = 57 caractères — PASS, bon ancrage géo. Description = 159 caractères — 4 caractères trop longs. Pas de CTA. Manque le terme "pisciniste" (requête principale du cluster 1).

**Version finale** :

```ts
title: 'Pisciniste Yvelines — Piscines sur mesure 78/92 | Aqua System',
// 62 caractères — légèrement long avec le pipe, version alternative :
// 'Piscines sur mesure Yvelines & 92 — Pisciniste Aqua System'
// 58 caractères — PASS
// Contient : "pisciniste" (requête principale) + "Yvelines" + "piscines sur mesure"

description: 'Aqua System conçoit et construit des piscines sur mesure en Yvelines et Hauts-de-Seine. Spas HotSpring, saunas. Certification Socotec. Parlez-nous de votre projet.',
// 162 caractères — légèrement long, version courte :
// 'Construction de piscines sur mesure en 78/92. Spas HotSpring, saunas. Certification Socotec CSP/ESP-001. Parlez-nous de votre projet.'
// 133 caractères — PASS + CTA

alternates: { canonical: absoluteUrl('/piscines-bien-etre/') },

openGraph: {
  url: `${SITE_URL}/piscines-bien-etre/`,
  title: 'Piscines sur mesure Yvelines 78/92 — Aqua System',
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Piscine sur mesure réalisée par Aqua System dans les Yvelines' }],
},
```

**H1 recommandé** : "Piscines & Bien-être" (existant en nav) — renforcé par le sous-titre copy site-copy.md WF-02.
**P1 recommandé** : intégrer "pisciniste" et "Yvelines" ou "78" dans les 50 premiers mots du body (Bing) — le copy actuel commence par "Conception, construction et entretien..." — conforme si "Yvelines" ou "78/92" apparaît dans les 2 premières phrases.

---

## Page 3 — Jardins & Paysage (/jardins-paysage/)

**Metas provisoires @copywriter** :
- Title : `Jardins & Paysage haut de gamme 78/92 — Les Terres Essentielles`
- Description : `Bureau d'études paysager, création de parcs et jardins sur mesure en Yvelines et Hauts-de-Seine. En partenariat avec Les Terres Essentielles. 30 ans d'ancrage local.`

**Analyse** : Title = 64 caractères — trop long. Description = 166 caractères — trop longue. "Paysagiste" absent du title (requête principale cluster 3). La mention LTE est un marqueur de confiance mais le title doit contenir "paysagiste 78" ou "paysagiste Yvelines".

**Version finale** :

```ts
title: 'Paysagiste Yvelines haut de gamme — Jardins & Parcs sur mesure',
// 63 caractères — légèrement long, version courte :
// 'Paysagiste Yvelines — Jardins haut de gamme, 78/92'
// 50 caractères — PASS et contient les termes clés

description: 'Les Terres Essentielles : bureau d\'études paysager, création de jardins et parcs sur mesure en Yvelines et Hauts-de-Seine. 30 ans d\'ancrage local. Parlez-nous de votre projet.',
// 181 caractères — trop long, version courte :
// 'Bureau d\'études paysager, jardins et parcs sur mesure en 78/92. Les Terres Essentielles, en partenariat avec Aqua System. Contactez-nous.'
// 138 caractères — PASS + CTA

alternates: { canonical: absoluteUrl('/jardins-paysage/') },

openGraph: {
  url: `${SITE_URL}/jardins-paysage/`,
  title: 'Paysagiste Yvelines — Jardins sur mesure 78/92',
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Jardin sur mesure réalisé par Les Terres Essentielles dans les Yvelines' }],
},
```

---

## Page 4 — Notre approche (/notre-approche/)

**Metas provisoires @copywriter** :
- Title : `Notre approche — De la vision à la réalisation, un seul interlocuteur`
- Description : `Comment {SITE_NAME} porte un projet d'extérieur complet en Yvelines et Hauts-de-Seine : écoute, bureau d'études, réalisation et suivi — une seule équipe de bout en bout.`

**Analyse** : Title = 71 caractères — trop long. Description = 171 caractères avec SITE_NAME = trop longue. Page de conviction / TOFU — moins besoin de mots-clés transactionnels, mais "extérieur haut de gamme Yvelines" ou "méthode pisciniste" peuvent être intégrés.

**Version finale** :

```ts
title: 'Notre approche — Piscine & Jardin, un seul interlocuteur 78/92',
// 63 caractères — légèrement long :
// 'Notre approche — Un seul interlocuteur, 78/92'
// 46 caractères — PASS mais peu de mots-clés. Compromis :
// 'Notre méthode — Piscine, jardin, extérieur complet en 78/92'
// 59 caractères — PASS + ancrage géo

description: 'De la première conversation à la livraison et au suivi annuel — Aqua System porte votre projet d\'extérieur complet en Yvelines et Hauts-de-Seine. Parlez-nous de votre vision.',
// 180 caractères — trop long. Version courte :
// 'Aqua System et Les Terres Essentielles portent ensemble votre projet d\'extérieur en 78/92 — de la conception au suivi. Un seul interlocuteur.'
// 141 caractères — PASS + CTA implicite

alternates: { canonical: absoluteUrl('/notre-approche/') },

openGraph: {
  url: `${SITE_URL}/notre-approche/`,
  title: 'Notre méthode — Piscine & Jardin intégrés, 78/92',
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Bureau d\'études intégré Aqua System et Les Terres Essentielles' }],
},
```

---

## Page 5 — La maison (/la-maison/)

**Metas provisoires @copywriter** :
- Title : `La maison — 30 ans d'expertise, Freneuse (78) — {SITE_NAME}`
- Description : `Aqua System et Les Terres Essentielles : histoire, valeurs, équipe. Plus de 30 ans d'ancrage dans les Yvelines et les Hauts-de-Seine. Certification Socotec CSP/ESP-001.`

**Analyse** : Title avec SITE_NAME = ~60 caractères selon le naming final — à surveiller. L'ancrage "Freneuse" est un signal local fort pour Bing — à conserver. Description = 168 caractères — légèrement trop longue.

**Version finale** :

```ts
title: `La maison — Aqua System, pisciniste à Freneuse (78) depuis 30 ans`,
// 67 caractères — trop long avec l'info. Version :
// `Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise`
// 58 caractères — PASS + "Freneuse" signal local fort Bing

description: 'Aqua System et Les Terres Essentielles : plus de 30 ans d\'ancrage en Yvelines et Hauts-de-Seine. Certification Socotec CSP/ESP-001. L\'Esprit Piscine.',
// 152 caractères — PASS. Ajouter un CTA :
// 'Aqua System et Les Terres Essentielles — 30 ans dans le 78/92. Certification Socotec. Membre L\'Esprit Piscine. Rencontrons-nous.'
// 129 caractères — PASS + CTA

alternates: { canonical: absoluteUrl('/la-maison/') },

openGraph: {
  url: `${SITE_URL}/la-maison/`,
  title: `Aqua System — Pisciniste Freneuse (78), 30 ans d'expertise`,
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Aqua System — Pisciniste à Freneuse dans les Yvelines depuis 30 ans' }],
},
```

---

## Page 6 — Réalisations (/realisations/)

**Metas provisoires @copywriter** :
- Title : `Réalisations — Piscines & Jardins haut de gamme en 78/92`
- Description : `Portfolio de réalisations Aqua System et Les Terres Essentielles : piscines sur mesure, jardins, spas, projets complets en Yvelines et Hauts-de-Seine.`

**Analyse** : Title = 56 caractères — PASS. Description = 152 caractères — PASS mais sans CTA. Le terme "portfolio" est moins naturel que "réalisations" (verbal-identity §1.11 interdit "Portfolio", "Galerie"). À corriger. Pas de verbe d'action.

**Version finale** :

```ts
title: 'Réalisations — Piscines & Jardins sur mesure en Yvelines et 92',
// 63 caractères — légèrement long :
// 'Réalisations piscines & jardins — Aqua System, Yvelines 78/92'
// 61 caractères — limite. Version sûre :
// 'Réalisations — Piscines, jardins sur mesure, 78/92'
// 50 caractères — PASS

description: 'Découvrez les réalisations d\'Aqua System et Les Terres Essentielles : piscines sur mesure, jardins, spas et projets complets dans les Yvelines et Hauts-de-Seine.',
// 165 caractères — légèrement long. Version :
// 'Piscines sur mesure, jardins, spas et projets complets : nos réalisations en Yvelines et Hauts-de-Seine. Parlez-nous de votre projet.'
// 134 caractères — PASS + CTA

alternates: { canonical: absoluteUrl('/realisations/') },

openGraph: {
  url: `${SITE_URL}/realisations/`,
  title: 'Réalisations — Piscines & Jardins, Yvelines 78/92',
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Réalisations Aqua System — piscines et jardins sur mesure dans les Yvelines' }],
},
```

---

## Page 7 — Prescripteurs (/prescripteurs/)

**Metas provisoires @copywriter** :
- Title : `Espace architectes & prescripteurs — Aqua System, 78/92`
- Description : `Architectes, paysagistes et décorateurs : un exécutant haut de gamme qui travaille sur votre plan, protège votre relation client et respecte vos délais. 78/92.`

**Analyse** : Title = 56 caractères — PASS. Description = 163 caractères — légèrement trop longue. Bonne couverture de la valeur Camille. Intégrer "pisciniste" ou "exécutant" + "78/92" pour les signaux Bing.

**Version finale** :

```ts
title: 'Espace prescripteurs — Pisciniste & Paysagiste, 78/92',
// 55 caractères — PASS

description: 'Architectes et prescripteurs : pisciniste et paysagiste haut de gamme en 78/92, qui travaille sur votre plan et protège votre relation client. Présentons-nous.',
// 163 caractères — à 8 caractères de la limite. Version courte :
// 'Pisciniste & paysagiste haut de gamme 78/92 pour architectes : travail sur votre plan, délais tenus. Présentons-nous.'
// 116 caractères — PASS + CTA "Présentons-nous" (ux-writing §10)

alternates: { canonical: absoluteUrl('/prescripteurs/') },

openGraph: {
  url: `${SITE_URL}/prescripteurs/`,
  title: 'Espace prescripteurs — Aqua System, pisciniste 78/92',
  images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: 'Aqua System — Partenaire pisciniste des architectes en Yvelines et Hauts-de-Seine' }],
},
```

---

## Page 8 — Contact (/contact/)

**Metas provisoires @copywriter** :
- Title : `Contact`
- Description : `Décrivez-nous votre projet d'aménagement extérieur — piscine, jardin ou projet complet. Un seul interlocuteur pour les belles propriétés du 78/92.`

**Analyse** : Title "Contact" seul = 7 caractères — usage du template `%s — {SITE_NAME}` = "Contact — Aquasystem" = 21 caractères — trop court, manque de signaux. Description = 149 caractères — PASS. Enrichir le title.

**Version finale** :

```ts
title: 'Parlez-nous de votre projet — Contact, Yvelines 78/92',
// 55 caractères — PASS + CTA en title + ancrage local

description: 'Décrivez-nous votre projet extérieur — piscine, jardin ou les deux. Un seul interlocuteur pour les belles propriétés du 78/92. Nous vous répondons.',
// 151 caractères — PASS

alternates: { canonical: absoluteUrl('/contact/') },
// Note : le canonical actuel dans le code est '/contact' sans slash absolu — à vérifier si absoluteUrl est utilisé
```

---

## Page 9 — Fiche réalisation (/realisations/[slug]/)

**Metas générées dynamiquement** (template pour generateMetadata) :

```ts
// Dans src/app/realisations/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const realisation = getRealisationBySlug(params.slug);
  if (!realisation) return {};

  const title = `${realisation.titre} — Réalisation Aqua System, ${realisation.commune}`;
  // Exemple : "Piscine à débordement — Réalisation Aqua System, Le Vésinet"
  // S'assurer que < 60 caractères : si commune longue, tronquer le titre de réalisation

  const description = `${realisation.description_courte} Réalisation Aqua System en Yvelines. Parlez-nous de votre projet.`;
  // S'assurer < 155 caractères

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/realisations/${params.slug}/`) },
    openGraph: {
      url: `${SITE_URL}/realisations/${params.slug}/`,
      title,
      images: [{
        url: absoluteUrl(`/images/realisations/${params.slug}-hero-1200w.webp`),
        width: 1200,
        height: 630,
        alt: `${realisation.titre} — Réalisation Aqua System, ${realisation.commune}, Yvelines`,
      }],
    },
  };
}
```

**Template alt text pour les photos de portfolio** (modèle factuel — verbal-identity §1.11) :

| Type de photo | Template alt text | Exemple |
|--------------|-------------------|---------|
| Hero réalisation | `[Type de piscine/jardin] réalisé[e] par Aqua System à [commune], [département]` | "Piscine à débordement réalisée par Aqua System au Vésinet, Yvelines" |
| Détail technique | `Détail [élément] — [Type de réalisation] Aqua System, [commune]` | "Détail liner anthracite — piscine sur mesure Aqua System, Marly-le-Roi" |
| Vue d'ensemble jardin | `Parc et jardin réalisé par Les Terres Essentielles à [commune], Yvelines` | "Parc paysagé réalisé par Les Terres Essentielles aux Alluets-le-Roi, Yvelines" |
| Photo spa HotSpring | `Spa HotSpring [modèle] installé par Aqua System, [commune]` | "Spa HotSpring Highlife installé par Aqua System, Freneuse" |
| Photo projet complet | `Piscine et jardin sur mesure réalisés par Aqua System et Les Terres Essentielles, [commune]` | Idem |

**Règle** : toujours factuel, jamais d'adjectif creux ("magnifique", "splendide"). Le nom du prestataire dans l'alt text est un signal de marque locale fort (Bing valorise la cohérence entité).

---

## Pages légales (noindex ou index réduit)

### /contact/merci — noindex (existant, conforme)

```ts
title: 'Message envoyé',
robots: { index: false, follow: true }, // conforme, aucune modification
```

### /mentions-legales/ — index, description informative

```ts
title: 'Mentions légales — SARL AQUA SYSTEM, Freneuse (78)',
// 52 caractères — PASS + signal légal local
description: 'Mentions légales : éditeur SARL AQUA SYSTEM (Freneuse, 78), hébergeur Cloudflare. Informations légales du site {SITE_NAME}.',
// 122 caractères — PASS
robots: { index: true, follow: true }, // page légale = ok en index
```

### /politique-confidentialite/ — index

```ts
title: 'Politique de confidentialité — {SITE_NAME}',
// ~44 caractères selon naming — PASS
description: 'Traitement de vos données personnelles par SARL AQUA SYSTEM. Analytics Umami exempté CNIL. Droits RGPD, contact DPO.',
// 117 caractères — PASS
```

---

## Ancres de maillage interne recommandées

Les ancres doivent être descriptives (signal sémantique pour Google + accessibilité) — jamais "cliquez ici".

| Page source | Ancre recommandée | Page cible |
|-------------|------------------|------------|
| / | "Découvrir nos réalisations en Yvelines" | /realisations/ |
| / | "Piscines & Bien-être — Aqua System" | /piscines-bien-etre/ |
| / | "Jardins & Paysage — Les Terres Essentielles" | /jardins-paysage/ |
| /piscines-bien-etre/ | "Voir nos réalisations piscines" | /realisations/ |
| /piscines-bien-etre/ | "Notre méthode de conception" | /notre-approche/ |
| /jardins-paysage/ | "Voir nos réalisations jardins et parcs" | /realisations/ |
| /jardins-paysage/ | "Parler de votre projet paysager" | /contact/ |
| /realisations/ | "Piscines sur mesure en Yvelines" | /piscines-bien-etre/ |
| /realisations/ | "Jardins et parcs sur mesure" | /jardins-paysage/ |
| /notre-approche/ | "Voir nos réalisations" | /realisations/ |
| /notre-approche/ | "Parler de votre projet" | /contact/ |
| /la-maison/ | "Notre approche du projet" | /notre-approche/ |
| /la-maison/ | "Nos réalisations en Yvelines et Hauts-de-Seine" | /realisations/ |
| /prescripteurs/ | "Nos réalisations haut de gamme" | /realisations/ |
| /prescripteurs/ | "Présentons-nous — Parler de votre chantier" | /contact/ |
| /realisations/[slug] | "Découvrir d'autres réalisations" | /realisations/ |
| /realisations/[slug] | "Parler de votre projet" | /contact/ |
| /realisations/[slug] (piscine) | "Piscines & Bien-être — notre expertise" | /piscines-bien-etre/ |
| /realisations/[slug] (jardin) | "Jardins & Paysage — notre expertise" | /jardins-paysage/ |

**Profondeur de maillage** : toutes les pages à ≤ 2 clics de la homepage. Contact accessible depuis toutes les pages (header CTA). Réalisations = hub central — page la plus liée.

---

## Récapitulatif des modifications à apporter au code

| Page | Fichier | Modification principale |
|------|---------|------------------------|
| / | `src/app/page.tsx` | Title : remplacer template actuel par version 56 caractères avec "Pisciniste & Paysagiste" |
| /piscines-bien-etre/ | `src/app/piscines-bien-etre/page.tsx` | Title : ajouter "Pisciniste" en début, description : ajouter CTA |
| /jardins-paysage/ | `src/app/jardins-paysage/page.tsx` | Title : raccourcir à <60 + "Paysagiste Yvelines" en début |
| /notre-approche/ | `src/app/notre-approche/page.tsx` | Title : raccourcir à <60 |
| /la-maison/ | `src/app/la-maison/page.tsx` | Title : restructurer pour <60 + "Freneuse" conservé |
| /realisations/ | `src/app/realisations/page.tsx` | Description : supprimer "Portfolio", ajouter CTA |
| /prescripteurs/ | `src/app/prescripteurs/page.tsx` | Description : raccourcir + CTA "Présentons-nous" |
| /contact/ | `src/app/contact/page.tsx` | Title : enrichir avec mots-clés locaux + CTA |
| /realisations/[slug] | `src/app/realisations/[slug]/page.tsx` | generateMetadata dynamique + og:image par réalisation |
| layout.tsx | `src/app/layout.tsx` | Ajouter alt text sur og-image global |

---

*Fichier produit par @seo — 2026-06-11*
*Sources : site-copy.md (metas provisoires), keyword-map.md, src/app/**/page.tsx, verbal-identity.md*
