import { cn } from '@/lib/cn';
import { toWidthVariant } from '@/content/realisations';
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder';

/**
 * MediaSplit — bloc prestation texte/photo (page-compositions WF-02/WF-03 §2-4).
 * Split desktop (texte + photo), stack mobile (photo dessus, texte dessous).
 * `reversed` inverse l'ordre desktop (alternance visuelle). `tone` change le
 * fond de section (sand-100 défaut / sand-200 alterné).
 * Server component. Photo `lazy` (jamais le LCP — toujours sous le hero).
 *
 * Perf (P1 @infrastructure D7) : `<picture>` sert la 800w sous 768px quand une
 * variante plus lourde est passée (export statique → srcset natif).
 */
export interface MediaSplitProps {
  eyebrow: string;
  /** Couleur de l'eyebrow : water (piscines) ou forest (jardins). */
  accent?: 'water' | 'forest';
  title: string;
  /** Paragraphes du corps (chaque entrée = un <p>). */
  body: string[];
  /**
   * Photo réelle. Optionnelle : si absente et `placeholderSubject` fourni, le
   * slot rend un PhotoPlaceholder élégant (doctrine photos — conversion d'abord).
   */
  imageSrc?: string;
  imageAlt?: string;
  /** Sujet attendu — bascule le slot en PhotoPlaceholder « Visuel à venir ». */
  placeholderSubject?: string;
  reversed?: boolean;
  tone?: 'default' | 'alt';
}

export function MediaSplit({
  eyebrow,
  accent = 'water',
  title,
  body,
  imageSrc,
  imageAlt,
  placeholderSubject,
  reversed = false,
  tone = 'default',
}: MediaSplitProps) {
  const mobileSrc = imageSrc ? toWidthVariant(imageSrc, '800w') : undefined;
  return (
    <section className={cn(tone === 'alt' && 'bg-background-secondary')}>
      <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-20">
        <div
          className={cn(
            'grid items-center gap-8 md:gap-12 lg:grid-cols-2',
            reversed && 'lg:[&>figure]:order-first',
          )}
        >
          <div className={cn(reversed ? 'lg:order-last' : '')}>
            <p
              className={cn(
                'mb-3 text-xs font-medium uppercase tracking-[0.1em]',
                accent === 'water'
                  ? 'text-foreground-accent-water'
                  : 'text-foreground-accent-forest',
              )}
            >
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <div className="mt-4 space-y-4">
              {body.map((para, i) => (
                <p
                  key={i}
                  className="max-w-[52ch] text-base leading-8 text-foreground-secondary"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {imageSrc ? (
            <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <picture>
                {mobileSrc && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={mobileSrc}
                    type="image/webp"
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={imageAlt ?? ''}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </figure>
          ) : (
            // Doctrine photos : slot photo conservé avec placeholder élégant
            // plutôt que supprimé (conversion d'abord).
            <PhotoPlaceholder subject={placeholderSubject ?? imageAlt ?? ''} />
          )}
        </div>
      </div>
    </section>
  );
}
