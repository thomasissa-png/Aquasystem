/**
 * OuvrageCard — card « type d'ouvrage » (strate savoir-faire piscines).
 * Photo réelle (ratio 4:3) + titre serif + corps explicatif.
 * Server component, non cliquable (pédagogique, pas un lien portfolio) :
 * reste donc distincte de RealisationCard (qui émet E-06 et pointe une fiche).
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
}

export function OuvrageCard({
  photoSrc,
  imageAlt,
  title,
  body,
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
    </article>
  );
}
