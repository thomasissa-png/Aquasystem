import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE_URL, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { RealisationsGrid } from '@/components/sections/RealisationsGrid';
import { SectionCTA } from '@/components/sections/SectionCTA';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Réalisations (/realisations) — F-05, WF-05.
 * Rendu : SSG. En-tête statique + grille filtrable (client island sous Suspense,
 * requis par useSearchParams en export statique). E-05/E-06 dans la grille/cards.
 */
export const metadata: Metadata = {
  // Metas finales — metadata-templates.md Page 6 (« Portfolio » retiré, CTA ajouté).
  title: { absolute: 'Réalisations — Piscines, jardins sur mesure, 78/92' },
  description:
    "Piscines sur mesure, jardins, spas et projets complets : nos réalisations en Yvelines et Hauts-de-Seine. Parlez-nous de votre projet.",
  alternates: { canonical: absoluteUrl('/realisations/') },
  openGraph: {
    url: `${SITE_URL}/realisations/`,
    title: 'Réalisations — Piscines & Jardins, Yvelines 78/92',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Réalisations Aqua System — piscines et jardins sur mesure dans les Yvelines',
      },
    ],
  },
};

/** Fil d'Ariane (BreadcrumbList JSON-LD) — seo-strategy.md §C.6.3. */
const BREADCRUMB = breadcrumbJsonLd([
  { name: 'Réalisations', path: '/realisations/' },
]);

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB} />
      <section className="bg-background">
        <div className="mx-auto max-w-container px-4 pb-12 pt-16 md:px-8">
          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            Réalisations
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-8 text-foreground-secondary md:text-xl">
            30 ans de chantiers dans les propriétés de l'ouest parisien.
          </p>
          <div className="mt-8">
            <Suspense fallback={<GridFallback />}>
              <RealisationsGrid />
            </Suspense>
          </div>
        </div>
      </section>

      <SectionCTA
        amorce="Un projet d'extérieur mérite une conversation — pas un formulaire."
        trackPosition="footer"
      />
    </>
  );
}

/** Fallback Suspense — squelette stable (pas de CLS) le temps de l'hydratation. */
function GridFallback() {
  return (
    <div
      aria-hidden
      className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/3] animate-pulse rounded-lg bg-background-tertiary"
        />
      ))}
    </div>
  );
}
