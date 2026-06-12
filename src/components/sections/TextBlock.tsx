/**
 * TextBlock — bloc prestation éditorial pleine largeur, centré et resserré.
 *
 * D-22 (P0 desktop 2026-06-12) : les PhotoPlaceholder « Visuel à venir » étaient
 * perçus comme une maquette inachevée sur une page premium → on rend le bloc en
 * texte éditorial sans trou visuel. La photo réelle pourra réintroduire un
 * MediaSplit plus tard.
 *
 * Extrait de /jardins-paysage en composant partagé (strate savoir-faire D-30 :
 * réutilisé sur /piscines-bien-etre). `accent` aligne la couleur d'eyebrow sur
 * l'univers (water = piscines, forest = jardins).
 */
export interface TextBlockProps {
  eyebrow: string;
  title: string;
  body: string[];
  tone?: 'default' | 'alt';
  /** Couleur de l'eyebrow : forest (jardins, défaut) ou water (piscines). */
  accent?: 'forest' | 'water';
}

export function TextBlock({
  eyebrow,
  title,
  body,
  tone = 'default',
  accent = 'forest',
}: TextBlockProps) {
  return (
    <section className={tone === 'alt' ? 'bg-background-secondary' : undefined}>
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-20">
        <p
          className={`mb-3 text-xs font-medium uppercase tracking-[0.1em] ${
            accent === 'water'
              ? 'text-foreground-accent-water'
              : 'text-foreground-accent-forest'
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-5 max-w-[60ch] space-y-4 text-left">
          {body.map((p, i) => (
            <p key={i} className="text-base leading-8 text-foreground-secondary">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
