'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { isDraft, photoSrc, type Realisation } from '@/content/realisations';

/**
 * RealisationCard — card du portfolio (page-compositions WF-01 §4 / WF-05 §2).
 * Photo réelle (ratio 4:3), type + zone, lien « Voir → ».
 * Émet portfolio_realisation_viewed (E-06) au clic (îlot client).
 * Image lazy (jamais LCP — toujours en grille sous l'en-tête).
 */
export interface RealisationCardProps {
  realisation: Realisation;
  /** Si true, n'émet pas E-06 (contexte hors portfolio, ex: accueil). */
  silent?: boolean;
}

export function RealisationCard({ realisation, silent }: RealisationCardProps) {
  const photo = realisation.photos[0];
  if (!photo) return null;

  // P0-D1 (ux-audit) : signale les fiches sans données éditoriales AVANT le clic
  // → l'effet de répétition « Fiche en cours de documentation » ne surprend plus.
  const draft = isDraft(realisation);

  return (
    <Link
      href={`/realisations/${realisation.slug}`}
      onClick={() => {
        if (silent) return;
        trackEvent('portfolio_realisation_viewed', {
          slug: realisation.slug,
          type_realisation: realisation.type,
        });
      }}
      className="group block overflow-hidden rounded-lg bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={photoSrc(photo.base, '800w')}
          alt={photo.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-normal ease-out group-hover:scale-[1.03]"
        />
        {draft && (
          <span className="absolute bottom-2 left-2 rounded-full bg-background-secondary/95 px-3 py-1 text-xs font-medium text-foreground-muted shadow-sm">
            En cours de documentation
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-foreground-accent-water">
            {realisation.cardType}
          </p>
          <p className="mt-1 text-base text-foreground">{realisation.zone}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground-accent-water">
          Voir
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
