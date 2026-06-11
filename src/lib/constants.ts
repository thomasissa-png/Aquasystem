/**
 * Constantes globales du site.
 *
 * SITE_NAME est PROVISOIRE (naming ombrelle final différé — checkpoint Phase 0).
 * Il est substituable depuis CET UNIQUE endroit : ne jamais coder "Aquasystem"
 * en dur ailleurs (règle commune n°11 — renommage global). Les composants et
 * metadata importent SITE_NAME.
 */
export const SITE_NAME = 'Aquasystem';

/** Baseline de marque validée fondateur (brand-platform.md). */
export const SITE_TAGLINE = "L'extérieur à la hauteur de votre propriété";

/**
 * Coordonnées de l'éditeur (SARL AQUA SYSTEM — éditeur unique, cf. @legal).
 * Source : project-context.md > Identité. Utilisées en footer, mentions légales,
 * données structurées LocalBusiness.
 */
export const CONTACT = {
  editor: 'SARL AQUA SYSTEM',
  siren: '903 785 327',
  phone: '01 30 42 26 00',
  phoneE164: '+33130422600',
  email: 'contact@aqua-system.fr',
  address: {
    street: '45 Route Nationale',
    postalCode: '78840',
    city: 'Freneuse',
    country: 'FR',
  },
} as const;

/**
 * Zone de chalandise (areaServed des données structurées + copy SEO local).
 * Source : project-context.md > Pays de commercialisation.
 */
export const AREA_SERVED = ['Yvelines (78)', 'Hauts-de-Seine (92)'] as const;

/** Réseaux sociaux existants (footer). */
export const SOCIAL_LINKS = {
  facebookLTE: 'https://www.facebook.com/LesTerresEssentielles/',
  linkedinAS: 'https://www.linkedin.com/company/aqua-system',
} as const;
