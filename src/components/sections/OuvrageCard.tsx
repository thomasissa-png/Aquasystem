import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * OuvrageCard — card « type d'ouvrage » (strate savoir-faire piscines).
 * Photo réelle (ratio 4:3) + titre serif + corps explicatif.
 * Server component, pédagogique (pas une RealisationCard, n'émet pas E-06).
 *
 * R-12 (re-audit SEO) : prop optionnelle `realisationHref` — quand l'ouvrage
 * correspond à une réalisation emblématique, un lien texte discret « Voir cette
 * réalisation » est rendu sous le corps (maillage page service → fiche). Sans
 * cette prop, la card reste non cliquable (comportement d'origine inchangé).
 *
 * Design (standard passe 4) : pas de cartouche plein beige — photo en tête,
 * texte sur le fond de section, filet supérieur sobre pour rythmer la grille.
 * Photo `lazy` (jamais le LCP — toujours en grille sous le hero).
 */
export interface OuvrageCardProps {
  /** Slug de la photo preuve (base, sans suffixe de taille). */
  photoSrc: string;
  imageAlt: string;
  title: string;
  body: string;
  /** Lien vers la fiche réalisation emblématique de cet ouvrage (R-12). */
  realisationHref?: string;
}

export function OuvrageCard({
  photoSrc,
  imageAlt,
  title,
  body,
  realisationHref,
}: OuvrageCardProps) {
  return (
    <article className="flex flex-col">
      <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt={imageAlt}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </figure>
      <h3 className="mt-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-base leading-7 text-foreground-secondary">
        {body}
      </p>
      {realisationHref && (
        <Link
          href={realisationHref}
          className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground-accent-water underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
        >
          Voir cette réalisation
          <ArrowRight
            aria-hidden
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </article>
  );
}
