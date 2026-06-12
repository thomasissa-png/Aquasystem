import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { REALISATIONS, isDraft } from '@/content/realisations';

/**
 * Sitemap (/sitemap.xml) — seo-strategy.md §C.1 (P0-SEO-1).
 *
 * `force-static` est OBLIGATOIRE en export statique : sans cette directive,
 * Next ne génère pas le fichier au build (route handler servie au runtime,
 * indisponible sur Cloudflare Pages statique).
 *
 * RÈGLE BING CRITIQUE : `lastModified` est une DATE FIXE — jamais `new Date()`.
 * Un lastModified qui change à chaque build = signal spam pour Bing Webmaster.
 * À mettre à jour MANUELLEMENT lors d'une vraie modification de contenu.
 *
 * Exclusions : /contact/merci (noindex). Les 24 fiches réalisations sont
 * INDEXABLES (D-35, megalot SEO P0-01) : critère `isDraft` = visualDescription
 * absente (jamais le cas) → toutes incluses (sitemap = 9 statiques + 24 fiches).
 * Même critère `isDraft` partagé avec le `robots` de la page (cohérence).
 * Les pages légales sont incluses (index:true) en priorité basse.
 */
export const dynamic = 'force-static';

const LAST_MODIFIED = new Date('2026-06-11');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 1.0 },
    { url: absoluteUrl('/piscines-bien-etre/'), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/jardins-paysage/'), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/realisations/'), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.85 },
    { url: absoluteUrl('/la-maison/'), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/prescripteurs/'), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.75 },
    { url: absoluteUrl('/contact/'), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/mentions-legales/'), lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/politique-confidentialite/'), lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.2 },
  ];

  // Fiches réalisations — itère sur le manifeste (slugs réels). Les fiches en
  // draft (noindex) sont EXCLUES pour ne pas soumettre de thin content à Bing.
  const realisationPages: MetadataRoute.Sitemap = REALISATIONS.filter(
    (r) => !isDraft(r),
  ).map((r) => ({
    url: absoluteUrl(`/realisations/${r.slug}/`),
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...realisationPages];
}
