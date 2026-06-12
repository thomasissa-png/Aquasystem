'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics';

/**
 * CrossSellingBlock — split 50/50 (design-system) entre les deux maisons.
 * Posé sur /piscines-bien-etre (→ jardins) et /jardins-paysage (→ piscines).
 *
 * Au clic du CTA :
 * - sessionStorage 'has_cross_selling' = 'true' (consommé par form_submission_success)
 * - event cross_selling_clicked (E-09) avec source/destination_univers
 *
 * CTA forest UNIQUEMENT côté section jardins (destination=piscines → on est SUR
 * la page jardins ; décision @design : l'accent forest n'apparaît que là).
 * Fond du panneau texte : forest-50 (depuis piscines) / water-50 (depuis jardins).
 */
export interface CrossSellingBlockProps {
  sourceUnivers: 'piscines' | 'jardins';
  destinationUnivers: 'piscines' | 'jardins';
  destinationHref: string;
  title: string;
  body: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
}

export function CrossSellingBlock({
  sourceUnivers,
  destinationUnivers,
  destinationHref,
  title,
  body,
  ctaLabel,
  imageSrc,
  imageAlt,
}: CrossSellingBlockProps) {
  // CTA forest seulement quand on est sur la page jardins (source=jardins).
  const isForest = sourceUnivers === 'jardins';

  function handleClick() {
    try {
      window.sessionStorage.setItem('has_cross_selling', 'true');
    } catch {
      // sessionStorage indisponible → on n'empêche jamais la navigation.
    }
    trackEvent('cross_selling_clicked', {
      source_univers: sourceUnivers,
      destination_univers: destinationUnivers,
    });
  }

  return (
    <section className="border-t border-border-muted">
      <div className="grid lg:grid-cols-2">
        <figure className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </figure>

        <div
          className={cn(
            'flex flex-col justify-center px-6 py-12 md:px-12 md:py-16',
            isForest
              ? 'bg-background-accent-water/30'
              : 'bg-background-accent-forest/30',
          )}
        >
          <h2 className="max-w-[24ch] font-serif text-3xl leading-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-base leading-8 text-foreground-secondary">
            {body}
          </p>
          <Link
            href={destinationHref}
            onClick={handleClick}
            className={cn(
              'group mt-6 inline-flex items-center gap-2 self-start rounded-md font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isForest
                ? 'text-foreground-accent-forest focus-visible:ring-[var(--color-action-forest-bg)]'
                : 'text-foreground-accent-water focus-visible:ring-[var(--color-focus-ring)]',
            )}
          >
            {ctaLabel}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
