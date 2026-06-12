import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * PhotoPlaceholder — slot photo dont la photo RÉELLE n'est pas encore disponible.
 *
 * NF-1 (re-audit-iteration2 §3, D-18) : AUCUN texte technique client-facing.
 * Pas de mention « à remplacer » visible (irritant Alexandre n°2). Traitement
 * sobre et assumé : motif discret + description du visuel en petit texte neutre
 * (« Visuel à venir », DM Sans, foreground-muted), conforme au registre premium.
 *
 * Règle anti-placeholder (page-compositions §715) : JAMAIS deux placeholders
 * identiques. Chaque instance porte une `description` UNIQUE du visuel attendu.
 * Aucune banque d'images générique.
 *
 * Utilisé pour les slots illustratifs non couverts par les photos de
 * réalisations réelles (plans de jardin, serre de pépinière, technicien SAV…).
 * Dimensionné comme la photo finale (pas de CLS au remplacement).
 */
export interface PhotoPlaceholderProps {
  /** Description UNIQUE du visuel attendu (sert de légende sobre). */
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
      aria-label={`Visuel à venir : ${description}`}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-border-muted bg-background-secondary p-6 text-center',
        ratioClassName,
        className,
      )}
    >
      <ImageIcon aria-hidden className="h-6 w-6 text-foreground-muted/60" />
      <p className="max-w-[40ch] text-sm leading-6 text-foreground-muted">
        <span className="block text-xs font-medium tracking-[0.08em] text-foreground-muted/70">
          Visuel à venir
        </span>
        <span className="mt-1 block">{description}</span>
      </p>
    </div>
  );
}
