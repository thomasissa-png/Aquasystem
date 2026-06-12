import { cn } from '@/lib/cn';
import { frTypo } from '@/lib/typography';
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
 *
 * Netteté desktop large (anti-flou D-40) : sur 1440-1920px, la 1280w était
 * upscalée ~1,5× → flou perçu. Quand la page fournit `imageSrc1920` (variante
 * WebP 1920w pré-générée), un palier `(min-width: 1280px)` la sert sur grand
 * écran. Prop EXPLICITE (pas de dérivation magique) : une page ne sert la 1920w
 * que si elle existe réellement pour ce visuel — les autres heros restent en 1280w.
 */
export interface HeroProps {
  variant?: 'home' | 'page';
  /** Chemin de l'image (WebP 1280w). */
  imageSrc: string;
  /**
   * Chemin de la variante 1920w (WebP), optionnel. Servie via `<source>` au-dessus
   * de 1280px de viewport pour éviter l'upscale flou sur desktop large (D-40).
   * À ne passer QUE si le fichier `-1920w.webp` existe pour ce visuel.
   */
  imageSrc1920?: string;
  imageAlt: string;
  /** Eyebrow optionnel au-dessus du H1. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Slot CTA (ButtonLink) — accueil uniquement. */
  cta?: React.ReactNode;
  /**
   * Cadrage `object-position` de l'image, par viewport (casting-visuels §5).
   * Classes Tailwind `object-[...]` (mobile/tablet/desktop). Optionnel et
   * rétro-compatible : sans valeur, le cadrage par défaut `object-center` est
   * conservé pour toutes les autres pages.
   */
  objectPosition?: { base?: string; md?: string; lg?: string };
  /**
   * Override du dégradé d'overlay (classes Tailwind `bg-gradient-*`). Optionnel :
   * sans valeur, l'overlay standard (0.78 → 0.30 → transparent) est conservé.
   */
  overlayClassName?: string;
}

/**
 * Overlay standard (WF-01) — fort en bas, lisible à mi-hauteur.
 * Renforcé (design-fixes-fondateur §A.4) : mid-stop 0.30→0.50 (zone H1),
 * from 0.78→0.85 (zone CTA). Calibré pour ne pas tuer les photos sombres
 * (0.15 en haut laisse respirer).
 */
const OVERLAY_DEFAULT =
  'bg-gradient-to-t from-[rgba(26,21,16,0.85)] via-[rgba(26,21,16,0.50)] via-35% to-[rgba(26,21,16,0.15)]';

export function Hero({
  variant = 'page',
  imageSrc,
  imageSrc1920,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  cta,
  objectPosition,
  overlayClassName,
}: HeroProps) {
  const isHome = variant === 'home';
  const mobileSrc = toWidthVariant(imageSrc, '800w');
  return (
    <section
      className={cn(
        // items-end : le bloc texte est TOUJOURS ancré en bas, y compris mobile,
        // pour reposer sur la zone forte du dégradé (façade visible au-dessus).
        // Mobile en `svh` (barre d'URL incluse) + hauteur généreuse pour dégager
        // la photo au-dessus du texte (finding fondateur 2026-06-12, WF-01 mobile).
        'relative flex w-full items-end overflow-hidden',
        isHome
          ? 'min-h-[85svh] md:min-h-[90vh]'
          : 'min-h-[72svh] md:min-h-[60vh]',
      )}
    >
      <picture>
        {mobileSrc && (
          <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" />
        )}
        {/* Palier desktop large : 1920w servie au-dessus de 1280px (anti-flou D-40),
            uniquement si la page a fourni la variante. Émis avant l'img (le premier
            <source> qui matche gagne ; sous 1280px, on retombe sur l'img 1280w). */}
        {imageSrc1920 && (
          <source media="(min-width: 1280px)" srcSet={imageSrc1920} type="image/webp" />
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
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            objectPosition?.base ?? 'object-center',
            objectPosition?.md,
            objectPosition?.lg,
          )}
        />
      </picture>
      {/* Overlay : dégradé sombre en bas → transparent à mi-hauteur (WF-01). */}
      <div
        aria-hidden
        className={cn('absolute inset-0', overlayClassName ?? OVERLAY_DEFAULT)}
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
            style={{
              ['--reveal-delay' as string]: '0ms',
              // design-fixes-fondateur §A.2 : text-shadow 3 couches (sand-950)
              // pour garantir le 4.5:1 sur zones claires de la photo.
              textShadow:
                '0 1px 4px rgba(26,21,16,0.60), 0 2px 16px rgba(26,21,16,0.45), 0 4px 40px rgba(26,21,16,0.25)',
            }}
          >
            {frTypo(title)}
          </h1>
          {subtitle && (
            <p
              className="reveal mt-4 max-w-[45ch] text-base leading-8 text-sand-100/90 md:text-lg lg:text-xl"
              style={{
                ['--reveal-delay' as string]: '100ms',
                // design-fixes-fondateur §A.2 : text-shadow 2 couches sous-titre.
                textShadow:
                  '0 1px 3px rgba(26,21,16,0.55), 0 2px 12px rgba(26,21,16,0.35)',
              }}
            >
              {frTypo(subtitle)}
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
