import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { RealisationsGrid } from '@/components/sections/RealisationsGrid';
import { SectionCTA } from '@/components/sections/SectionCTA';

/**
 * Réalisations (/realisations) — F-05, WF-05.
 * Rendu : SSG. En-tête statique + grille filtrable (client island sous Suspense,
 * requis par useSearchParams en export statique). E-05/E-06 dans la grille/cards.
 */
export const metadata: Metadata = {
  title: 'Réalisations — Piscines & Jardins haut de gamme en 78/92',
  description:
    'Portfolio de réalisations Aqua System et Les Terres Essentielles : piscines sur mesure, jardins, spas, projets complets en Yvelines et Hauts-de-Seine.',
  alternates: { canonical: absoluteUrl('/realisations/') },
  openGraph: {
    url: `${SITE_URL}/realisations/`,
    title: 'Réalisations — Piscines & Jardins haut de gamme en 78/92',
  },
};

export default function RealisationsPage() {
  return (
    <>
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
