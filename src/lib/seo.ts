import { AREA_SERVED, CONTACT, SITE_NAME, SITE_TAGLINE } from './constants';

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
 * JSON-LD Organization minimal (données réelles de constants.ts).
 * Posé une fois dans le layout. `LocalBusiness`-compatible (adresse + téléphone).
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    legalName: CONTACT.editor,
    description: SITE_TAGLINE,
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      postalCode: CONTACT.address.postalCode,
      addressLocality: CONTACT.address.city,
      addressCountry: CONTACT.address.country,
    },
    areaServed: AREA_SERVED.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
  };
}
