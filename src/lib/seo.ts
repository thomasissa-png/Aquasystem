import {
  AREA_SERVED,
  CONTACT,
  PARTNER_CONTACT,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from './constants';

/**
 * Helpers SEO — URL canonique, OG, JSON-LD.
 *
 * SITE_URL : lu depuis NEXT_PUBLIC_SITE_URL au build (export statique).
 * Tant que le domaine ombrelle n'est pas tranché (project-context.md décision 9),
 * fallback PROVISOIRE sur un placeholder substituable. Renseigner la variable
 * dans Cloudflare Pages avant la mise en ligne.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aquasystem.fr'
).replace(/\/$/, '');

/** Construit une URL absolue à partir d'un chemin (canonical, og:image). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Coordonnées géographiques de Freneuse (78840) — VÉRIFIÉ via cartesfrance.fr
 * (49.0482 N, 1.60076 E). Utilisé par le LocalBusiness Aqua System (signal
 * local fort pour le Knowledge Panel Bing/Google).
 */
const FRENEUSE_GEO = { latitude: 49.0482, longitude: 1.6008 } as const;

/**
 * JSON-LD LocalBusiness Aqua System — enrichi (seo-strategy.md §C.6.1 +
 * geo-strategy/content-restructuring.md §C.3).
 *
 * Posé une fois dans le layout. Données réelles (constants.ts) + claims sourcés
 * @geo (sameAs, logo, geo, areaServed, hasOfferCatalog, award, hasCredential,
 * memberOf). Toute valeur factuelle = vérifiée (project-context.md / geo §2-3).
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization-aquasystem`,
    name: 'Aqua System',
    legalName: CONTACT.editor,
    description:
      "Pisciniste haut de gamme en Yvelines et Hauts-de-Seine. Conception, construction et entretien de piscines sur mesure depuis plus de 30 ans. Certification Socotec CSP/ESP-001.",
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    sameAs: [
      'https://www.esprit-piscine.fr/aqua-system/',
      SOCIAL_LINKS.linkedinAS,
      // facebookLTE retiré (arbitrage seo-audit P0-2, 2026-06-12) : le profil
      // Facebook de LTE appartient au bloc partnerOrganizationJsonLd — pas à
      // l'entité Aqua System (intégrité du Knowledge Graph).
    ],
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/favicon.svg'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/og-image.jpg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      postalCode: CONTACT.address.postalCode,
      addressLocality: CONTACT.address.city,
      addressRegion: 'Yvelines',
      addressCountry: CONTACT.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: FRENEUSE_GEO.latitude,
      longitude: FRENEUSE_GEO.longitude,
    },
    areaServed: AREA_SERVED.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Aqua System',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction de piscines sur mesure' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rénovation de piscines' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Entretien annuel de piscines' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Installation de spas HotSpring' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Saunas et hammams' } },
      ],
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Socotec CSP/ESP-001 — Professionnels de la piscine privée à usage familial',
        credentialCategory: 'Certification professionnelle',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Socotec Certification France',
          url: 'https://www.socotec-certification-international.fr',
        },
      },
    ],
    award: [
      "Trophée d'Or FPP 2024 — Piscine intérieure (Fédération des Professionnels de la Piscine et du Spa)",
      'Award Bronze EUSA 2025 — Piscines intérieures privées (European Union of Swimming Pools and Spas)',
    ],
    memberOf: {
      '@type': 'Organization',
      name: "L'Esprit Piscine",
      url: 'https://www.esprit-piscine.fr',
    },
  };
}

/**
 * JSON-LD LocalBusiness Les Terres Essentielles (seo-strategy.md §C.6.2).
 * Entité partenaire (paysagiste). Posé en 2e bloc dans le layout. Aucune
 * affirmation de propriété commune (acquisition non actée — project-context.md
 * Notes libres). Adresse + zone + Facebook = données réelles.
 */
export function partnerOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization-lte`,
    name: PARTNER_CONTACT.name,
    description:
      "Paysagiste et bureau d'études paysager en Yvelines. Création et entretien de parcs et jardins sur mesure pour les belles propriétés de l'ouest parisien.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: PARTNER_CONTACT.address.street,
      postalCode: PARTNER_CONTACT.address.postalCode,
      addressLocality: PARTNER_CONTACT.address.city,
      addressRegion: 'Yvelines',
      addressCountry: 'FR',
    },
    areaServed: AREA_SERVED.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
    // P1-GEO-02 : graphe LTE enrichi — identifiants légaux publics croisés par
    // les LLM (pas de site propre en V1, SIREN 811 198 217).
    sameAs: [
      SOCIAL_LINKS.facebookLTE,
      'https://www.pappers.fr/entreprise/les-terres-essentielles-811198217',
      'https://www.societe.com/societe/les-terres-essentielles-811198217.html',
    ],
  };
}

/**
 * JSON-LD Person Nicolas Berg (content-restructuring.md §C.2).
 * À poser sur /la-maison uniquement. sameAs = profils publics vérifiables.
 */
export function nicolasBergJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nicolas Berg',
    jobTitle: 'Associé-Gérant',
    image: absoluteUrl('/images/equipe/nicolas-berg-400w.webp'),
    worksFor: {
      '@type': 'LocalBusiness',
      name: 'Aqua System',
      legalName: CONTACT.editor,
      taxID: CONTACT.siren.replace(/\s/g, ''),
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.city,
        postalCode: CONTACT.address.postalCode,
        addressCountry: CONTACT.address.country,
      },
    },
    sameAs: [
      'https://www.linkedin.com/in/nicolas-berg-aqua-system/',
      'https://gensdeconfiance.com/us/ui/profiles/8eaf1fde-5477-41b7-8f4f-357d886d2296',
    ],
  };
}

/**
 * JSON-LD BreadcrumbList — fil d'Ariane par page (seo-strategy.md §C.6.3).
 * `items` : liste ordonnée [{ name, path }] de l'accueil à la page courante
 * incluse. L'accueil (position 1) est toujours ajouté automatiquement.
 *
 * @example breadcrumbJsonLd([{ name: 'Piscines & Bien-être', path: '/piscines-bien-etre/' }])
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: 'Accueil', path: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * JSON-LD FAQPage (content-restructuring.md §C.1). `qa` : liste { q, a } —
 * questions/réponses déjà rédigées par @geo (réponses auto-contenues, claims
 * sourcés). À poser sur /notre-approche et /prescripteurs.
 */
export function faqPageJsonLd(qa: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
