import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * robots.txt (/robots.txt) — seo-strategy.md §C.2 (P0-SEO-2) + geo-strategy.md §5.
 *
 * `force-static` OBLIGATOIRE en export statique (même raison que sitemap.ts).
 *
 * Crawlers IA : GPTBot (OpenAI), ClaudeBot + anthropic-ai (Anthropic),
 * PerplexityBot, Google-Extended AUTORISÉS (coordination @geo — visibilité GEO).
 * Bytespider (ByteDance) BLOQUÉ (scraper de mauvaise qualité, geo-strategy.md).
 *
 * Disallow /contact/merci sur toutes les règles (page noindex de confirmation).
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/contact/merci'] },
      // Crawlers IA explicitement autorisés (visibilité GEO).
      { userAgent: 'GPTBot', allow: '/', disallow: ['/contact/merci'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/contact/merci'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/contact/merci'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/contact/merci'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/contact/merci'] },
      // Scraper bloqué.
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
