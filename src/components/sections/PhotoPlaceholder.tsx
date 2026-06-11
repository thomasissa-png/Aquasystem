import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * PhotoPlaceholder — slot photo dont la photo RÉELLE n'est pas encore disponible.
 *
 * Règle anti-placeholder (page-compositions §715) : JAMAIS deux placeholders
 * identiques. Chaque instance porte une `description` UNIQUE du visuel attendu
 * (= [IMAGE À REMPLACER : …]). Aucune banque d'images générique.
 *
 * Utilisé pour les slots illustratifs non couverts par les photos de
 * réalisations réelles (plans de jardin, serre de pépinière, technicien SAV…).
 * Dimensionné comme la photo finale (pas de CLS au remplacement).
 */
export interface PhotoPlaceholderProps {
  /** Description UNIQUE du visuel attendu (sert de légende [IMAGE À REMPLACER]). */
  description: string;
  /** Ratio d'aspect Tailwind (ex: 'aspect-[3/2]'). */
  ratioClassName?: string;
  className?: string;
}

export function PhotoPlaceholder({
  description,
  ratioClassName = 'aspect-[3/2]',
  className,
}: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image à venir : ${description}`}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-background-secondary p-6 text-center',
        ratioClassName,
        className,
      )}
    >
      <ImageOff aria-hidden className="h-6 w-6 text-foreground-muted" />
      <p className="max-w-[36ch] text-xs leading-5 text-foreground-muted">
        <span className="font-medium uppercase tracking-wide">
          Image à remplacer
        </span>
        <br />
        {description}
      </p>
    </div>
  );
}
