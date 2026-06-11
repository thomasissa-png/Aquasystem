import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * Hero — page-compositions WF-01/WF-02/WF-03/WF-06.
 * Variante `home` (90vh, H1 display 72px) ou `page` (60vh, H1 60px).
 * Photo full-bleed + overlay dégradé bas→haut, texte bas-gauche.
 * Server component. Image `priority` (LCP) — toujours le premier paint.
 *
 * Le srcset est fourni par le parent (WebP réel 1280w des réalisations).
 * `sizes="100vw"` : le hero couvre toute la largeur sur tous les breakpoints.
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
  return (
    <section
      className={cn(
        'relative flex w-full items-end overflow-hidden',
        isHome ? 'min-h-[60vh] md:min-h-[90vh]' : 'min-h-[50vh] md:min-h-[60vh]',
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
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
