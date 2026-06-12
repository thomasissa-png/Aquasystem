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
export const AREA_SERVED = [
  'Yvelines (78)',
  'Hauts-de-Seine (92)',
  "Val-d'Oise (95)",
  'Eure (27)',
] as const;

/** Réseaux sociaux existants (footer). */
export const SOCIAL_LINKS = {
  facebookLTE: 'https://www.facebook.com/LesTerresEssentielles/',
  linkedinAS: 'https://www.linkedin.com/company/aqua-system',
} as const;

/** Mention de partenariat (formulation validée @legal — avant acquisition LTE). */
export const PARTNER_NAME = 'Les Terres Essentielles';

/**
 * Navigation principale — ordre et libellés définitifs (arbitrage P0-5,
 * ux-writing-guide §6). Ne JAMAIS réordonner sans repasser par l'arbitrage.
 */
export const NAV_LINKS = [
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Piscines & Bien-être', href: '/piscines-bien-etre' },
  { label: 'Jardins & Paysage', href: '/jardins-paysage' },
  { label: 'Notre maison', href: '/la-maison' },
] as const;

/** CTA de conversion unique de marque (ux-writing-guide §5). */
export const CTA_LABEL = 'Parlez-nous de votre projet';
export const CONTACT_PATH = '/contact';

/** Navigation footer (ux-writing-guide §6 — section 2). */
export const FOOTER_NAV_LINKS = [
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Piscines & Bien-être', href: '/piscines-bien-etre' },
  { label: 'Jardins & Paysage', href: '/jardins-paysage' },
  { label: 'Notre maison', href: '/la-maison' },
  { label: 'Espace prescripteurs & architectes', href: '/prescripteurs' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Liens légaux du footer (ux-writing-guide §6 — section 3). */
export const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
] as const;

/**
 * Coordonnées de la seconde maison (Les Terres Essentielles) — footer.
 * Source : project-context.md > Identité.
 */
export const PARTNER_CONTACT = {
  name: PARTNER_NAME,
  address: {
    street: "CD n°45, Route d'Orgeval",
    postalCode: '78580',
    city: 'Les Alluets-le-Roi',
  },
} as const;

/**
 * Formulaire de contact — énumérations alignées sur functional-specs.md v1.1
 * et ux-writing-guide v1.2 (wording AFFICHÉ = source de vérité).
 */
export const PROJECT_CHIPS = [
  { value: 'piscine_bien_etre', label: 'Piscine & bien-être' },
  { value: 'jardin_paysage', label: 'Jardin & paysage' },
  { value: 'projet_complet', label: 'Projet complet' },
  { value: 'prescripteur', label: 'Je suis prescripteur' },
] as const;

export type ProjectType = (typeof PROJECT_CHIPS)[number]['value'];

/**
 * Mapping page source (?source=) → valeur de chip pré-activée (smart default).
 * Toute valeur hors de cette table est ignorée silencieusement (F-08).
 */
export const SOURCE_TO_CHIP: Record<string, ProjectType> = {
  'piscines-bien-etre': 'piscine_bien_etre',
  'jardins-paysage': 'jardin_paysage',
  'projet-complet': 'projet_complet',
  prescripteurs: 'prescripteur',
};

export const BUDGET_OPTIONS = [
  { value: '50_80k', label: '50 à 80 k€' },
  { value: '80_150k', label: '80 à 150 k€' },
  { value: '150k_plus', label: 'Plus de 150 k€' },
  { value: 'prefere_discuter', label: 'Je préfère en discuter' },
] as const;

export type BudgetTranche = (typeof BUDGET_OPTIONS)[number]['value'];

/** Placeholder neutre du select budget (ux-writing-guide §1, champ 6). */
export const BUDGET_PLACEHOLDER = 'Choisir si vous le souhaitez';

/**
 * Délai de réponse affiché sur /contact/merci.
 * Délai CONFIRMÉ fondateur (2026-06-12) : réponse sous 48 heures.
 */
export const REPLY_DELAY_TEXT = 'reviendra vers vous sous 48 heures';
