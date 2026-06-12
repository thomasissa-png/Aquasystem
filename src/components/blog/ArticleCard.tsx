import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { photoSrc } from '@/content/realisations';
import { formatArticleDate, type Article } from '@/content/blog';
import { categoryLabel } from '@/content/blog-categories';
import { frTypo } from '@/lib/typography';

/**
 * ArticleCard — card d'un article (index /notre-regard, teaser accueil, « Pour
 * aller plus loin »). Au standard des primitives du site (RealisationCard) :
 * image en aspect-[4/3], date, titre serif, excerpt, lien accent eau.
 *
 * Server Component. Toute la card est cliquable (lien sur le titre, overlay
 * d'accessibilité via le bloc <Link> — pattern « card link » sans imbrication
 * de liens). Le hero est servi depuis nos photos de réalisations (heroBase).
 */
export function ArticleCard({ article }: { article: Article }) {
  const href = `/notre-regard/${article.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-md">
      <Link
        href={href}
        className="relative block aspect-[4/3] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
      >
        <Image
          src={photoSrc(article.heroBase, '800w')}
          alt={article.heroAlt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
            {categoryLabel(article.category)}
          </span>
          <time
            dateTime={article.datePublished}
            className="text-xs text-foreground-muted"
          >
            {formatArticleDate(article.datePublished)}
          </time>
        </div>
        <h3 className="mt-3 font-serif text-xl leading-snug text-foreground md:text-2xl">
          <Link
            href={href}
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            {frTypo(article.title)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-foreground-secondary">
          {frTypo(article.excerpt)}
        </p>
        <Link
          href={href}
          aria-label={`Lire l'article : ${article.title}`}
          className="group/link mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
        >
          Lire l&apos;article
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
