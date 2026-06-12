import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { ARTICLES_BY_DATE } from '@/content/blog';

/**
 * Flux RSS du blog « Notre regard » (/notre-regard/rss.xml) — blog-program.md §1.6.
 *
 * `force-static` + `dynamic = 'force-static'` OBLIGATOIRES en export statique :
 * le route handler est rendu au build et émis comme fichier statique (servable
 * sur Cloudflare Pages). Format RSS 2.0 (compatibilité maximale, pas Atom).
 *
 * Les crawlers IA (GPTBot, PerplexityBot, ClaudeBot) consomment les flux RSS
 * comme source de fraîcheur — coordination @geo, amplifie la visibilité GEO.
 * Items triés par date décroissante (titres, dates RFC-822, excerpts, liens).
 */
export const dynamic = 'force-static';

/** Échappe les caractères XML réservés dans le texte des balises. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Date ISO (YYYY-MM-DD) → RFC-822 (format RSS 2.0). */
function toRfc822(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toUTCString();
}

export function GET() {
  const channelLink = absoluteUrl('/notre-regard/');
  const lastBuild = ARTICLES_BY_DATE[0]
    ? toRfc822(ARTICLES_BY_DATE[0].datePublished)
    : new Date().toUTCString();

  const items = ARTICLES_BY_DATE.map((article) => {
    const link = absoluteUrl(`/notre-regard/${article.slug}/`);
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${toRfc822(article.datePublished)}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Notre regard — Aqua System</title>
    <link>${channelLink}</link>
    <description>Le regard d'un pisciniste haut de gamme sur la conception, la construction et la rénovation de piscines sur mesure dans les Yvelines et les Hauts-de-Seine.</description>
    <language>fr-FR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE_URL}/notre-regard/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
