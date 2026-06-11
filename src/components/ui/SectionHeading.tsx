import { cn } from '@/lib/cn';

/**
 * SectionHeading — design-system.md §8.
 * Surtitre (eyebrow) optionnel, H2 serif, sous-titre optionnel, séparateur
 * optionnel. Tailles responsives (30/32/36px). Alignement gauche par défaut,
 * centré via `centered`.
 */
export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Affiche la ligne séparatrice 40px sous le bloc. */
  separator?: boolean;
  centered?: boolean;
  /** Niveau de titre — H2 par défaut, H1 pour les en-têtes de page. */
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  separator = false,
  centered = false,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'pb-12',
        centered && 'mx-auto max-w-3xl text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-accent-water">
          {eyebrow}
        </p>
      )}
      <Heading className="font-serif text-3xl leading-tight text-foreground md:text-[32px] lg:text-4xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 max-w-[60ch] text-base leading-8 text-foreground-secondary md:text-[17px] lg:text-lg">
          {subtitle}
        </p>
      )}
      {separator && (
        <div
          aria-hidden
          className={cn(
            'mt-6 h-0.5 w-10 bg-action-primary',
            centered && 'mx-auto',
          )}
        />
      )}
    </div>
  );
}
