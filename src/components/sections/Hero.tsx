import { cn } from '@/lib/cn';
import { toWidthVariant } from '@/content/realisations';

/**
 * Hero — page-compositions WF-01/WF-02/WF-03/WF-06.
 * Variante `home` (90vh, H1 display 72px) ou `page` (60vh, H1 60px).
 * Photo full-bleed + overlay dégradé bas→haut, texte bas-gauche.
 * Server component.
 *
 * Perf (P1 @infrastructure D7) : `<picture>` sert la 800w (~121 ko) sous 768px
 * au lieu de la 1280w (~300 ko). Export statique (images.unoptimized) → on émet
 * un `srcset` natif depuis les variantes pré-générées. `fetchPriority="high"` +
 * `loading="eager"` conservent le statut LCP (pas de lazy sur le premier paint).
 */
export interface HeroProps {
  variant?: 'home' | 'page';
  /** Chemin de l'image (WebP 1280w). */
  imageSrc: string;
  imageAlt: string;
  /** Eyebrow optionnel au-dessus du H1. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Slot CTA (ButtonLink) — accueil uniquement. */
  cta?: React.ReactNode;
}

export function Hero({
  variant = 'page',
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  cta,
}: HeroProps) {
  const isHome = variant === 'home';
  const mobileSrc = toWidthVariant(imageSrc, '800w');
  return (
    <section
      className={cn(
        'relative flex w-full items-end overflow-hidden',
        isHome ? 'min-h-[60vh] md:min-h-[90vh]' : 'min-h-[50vh] md:min-h-[60vh]',
      )}
    >
      <picture>
        {mobileSrc && (
          <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={1280}
          height={720}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {/* Overlay : dégradé sombre en bas → transparent à mi-hauteur (WF-01). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[rgba(26,21,16,0.78)] via-[rgba(26,21,16,0.30)] to-transparent"
      />
      <div className="relative mx-auto w-full max-w-container px-4 pb-12 md:px-8 md:pb-16">
        <div className={cn('max-w-2xl', isHome ? 'lg:max-w-3xl' : '')}>
          {eyebrow && (
            <p
              className="reveal mb-3 text-xs font-medium uppercase tracking-[0.1em] text-sand-100/90"
              style={{ ['--reveal-delay' as string]: '0ms' }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              'reveal font-serif text-sand-100',
              isHome
                ? 'text-5xl leading-tight md:text-6xl lg:text-display lg:leading-[1.05]'
                : 'text-4xl leading-tight md:text-5xl lg:text-6xl',
            )}
            style={{ ['--reveal-delay' as string]: '0ms' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="reveal mt-4 max-w-[45ch] text-base leading-8 text-sand-100/90 md:text-lg lg:text-xl"
              style={{ ['--reveal-delay' as string]: '100ms' }}
            >
              {subtitle}
            </p>
          )}
          {cta && (
            <div
              className="reveal mt-8"
              style={{ ['--reveal-delay' as string]: '200ms' }}
            >
              {cta}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
