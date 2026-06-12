/**
 * FaqSection — section FAQ sobre, conforme au design system (tokens uniquement).
 *
 * Balisage `<ul>`/`<li>` + `<details>`/`<summary>` natif : ouverture/fermeture
 * sans JavaScript (zéro accordéon JS lourd — consigne mission). Accessible
 * clavier par défaut. Pas de `<dl>` (axe definition-list exige des enfants
 * directs dt/dd, incompatible avec details/summary).
 * Le JSON-LD FAQPage est rendu séparément par la page (composant JsonLd) à partir
 * des MÊMES données — cohérence contenu visible / données structurées.
 *
 * Contenu : 100 % issu des Q/R @geo (content-restructuring.md §A) — zéro texte
 * inventé. Registre haut de gamme préservé (réponses factuelles, non défensives).
 */
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSectionProps {
  /** Titre de section (H2). Varie selon la page (ex: « Questions fréquentes »). */
  heading: string;
  items: FaqItem[];
  /** Variante de fond (alterne avec la section précédente). */
  tone?: 'default' | 'alt';
  /** Couleur d'accent du chevron : water (piscines, défaut) ou forest (jardins). */
  accent?: 'water' | 'forest';
  /** Respiration supplémentaire en haut (design-audit P1-FAQ-1 /notre-approche). */
  extraTopSpacing?: boolean;
}

export function FaqSection({
  heading,
  items,
  tone = 'default',
  accent = 'water',
  extraTopSpacing = false,
}: FaqSectionProps) {
  return (
    <section className={tone === 'alt' ? 'bg-background-secondary' : 'bg-background'}>
      <div
        className={`mx-auto max-w-3xl px-4 pb-20 md:px-8 md:pb-24 ${extraTopSpacing ? 'pt-28 md:pt-32' : 'pt-20 md:pt-24'}`}
      >
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
          {heading}
        </h2>
        <ul className="mt-8 divide-y divide-border border-t border-border">
          {items.map((item) => (
            <li key={item.q} className="py-2">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2">
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={`h-5 w-5 shrink-0 transition-transform group-open:rotate-180 ${
                      accent === 'forest'
                        ? 'text-foreground-accent-forest'
                        : 'text-foreground-accent-water'
                    }`}
                  />
                </summary>
                <p className="max-w-[68ch] pb-4 text-base leading-8 text-foreground-secondary">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
