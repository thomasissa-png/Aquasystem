import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  faqPageJsonLd,
  ogPhoto,
} from '@/lib/seo';
import { photoSrc } from '@/content/realisations';
import {
  ARTICLES,
  formatArticleDate,
  getArticle,
  getRelatedArticles,
  type Article,
} from '@/content/blog';
import { toFaqJsonLd } from '@/content/faq';
import { categoryLabel } from '@/content/blog-categories';
import { Hero } from '@/components/sections/Hero';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { AuthorBlock } from '@/components/blog/AuthorBlock';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { FaqSection } from '@/components/sections/FaqSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Article du blog « Notre regard » (/notre-regard/[slug]) — blog-program.md §1.
 * Choix de rendu : SSG via generateStaticParams (export statique — tous les
 * articles pré-générés depuis le manifeste).
 *
 * Posé sur la page : hero bandeau (photo réalisation), corps Hn structuré,
 * AuthorBlock (Nicolas Berg), JSON-LD Article complet + BreadcrumbList, CTA de
 * fin contextuel, « Pour aller plus loin » (2 articles liés).
 */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: 'Article introuvable' };
  // OG/Twitter en JPEG (ogPhoto) — les .webp ne s'affichent pas en aperçu de
  // partage sur la plupart des messageries.
  const ogImg = ogPhoto(article.heroBase);
  return {
    // metaTitle du manifeste (frontmatter) — séparateur « | » si suffixe,
    // jamais de cadratin. Posé en `absolute` (pas le template marque).
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    alternates: { canonical: absoluteUrl(`/notre-regard/${article.slug}/`) },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/notre-regard/${article.slug}/`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.datePublished,
      authors: ['Nicolas Berg'],
      images: [
        { url: ogImg, width: 1200, height: 630, alt: article.heroAlt },
      ],
    },
    twitter: { card: 'summary_large_image', images: [ogImg] },
  };
}

/** JSON-LD Article complet (blog-program.md §1.5) — author=Person NB, publisher. */
function articleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: absoluteUrl(photoSrc(article.heroBase, '1280w')),
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: {
      '@type': 'Person',
      name: 'Nicolas Berg',
      jobTitle: 'Fondateur, Aqua System',
      worksFor: {
        '@type': 'Organization',
        name: 'Aqua System',
        '@id': `${SITE_URL}/#organization-aquasystem`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aqua System',
      '@id': `${SITE_URL}/#organization-aquasystem`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/notre-regard/${article.slug}/`,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 2);
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Notre regard', path: '/notre-regard/' },
    { name: article.title, path: `/notre-regard/${article.slug}/` },
  ]);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={breadcrumb} />

      {/* Hero bandeau — photo de réalisation, H1 en surimpression. */}
      <Hero
        variant="page"
        imageSrc={photoSrc(article.heroBase, '1280w')}
        imageAlt={article.heroAlt}
        eyebrow="Notre regard"
        title={article.title}
      />

      {/* Fil de retour + date de publication */}
      <div className="bg-background">
        <div className="mx-auto flex max-w-container flex-col gap-2 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <Link
            href="/notre-regard"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Tous nos articles
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href={`/notre-regard/?categorie=${article.category}`}
              className="text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
            >
              {categoryLabel(article.category)}
            </Link>
            <time
              dateTime={article.datePublished}
              className="text-sm text-foreground-muted"
            >
              Publié le {formatArticleDate(article.datePublished)}
            </time>
          </div>
        </div>
      </div>

      {/* Corps de l'article */}
      <article className="bg-background">
        <div className="mx-auto max-w-container px-4 pb-16 md:px-8">
          <ArticleBody blocks={article.body} />
          <AuthorBlock />
        </div>
      </article>

      {/* FAQ de fin d'article (R-10 re-audit SEO) — bloc visible + FAQPage JSON-LD
          (@id ancré, unique par article). Q/R reformulées du corps de l'article.
          Rendue avant le CTA, seulement si l'article porte une FAQ. */}
      {article.faq && article.faq.length > 0 && (
        <>
          <JsonLd
            data={faqPageJsonLd(
              toFaqJsonLd(article.faq),
              absoluteUrl(`/notre-regard/${article.slug}/#faq`),
            )}
          />
          <FaqSection
            heading="Questions fréquentes"
            items={article.faq}
            tone="alt"
          />
        </>
      )}

      {/* CTA de fin contextuel */}
      <SectionCTA
        amorce="Votre projet mérite une conversation, pas un formulaire en ligne."
        href={`/contact?source=notre-regard`}
        trackPosition={`article_${article.slug}`}
      />

      {/* Pour aller plus loin — 2 articles liés */}
      {related.length > 0 && (
        <section className="mx-auto max-w-container px-4 py-20 md:px-8 md:py-24">
          <SectionHeading
            eyebrow="Pour aller plus loin"
            title="À lire également"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
