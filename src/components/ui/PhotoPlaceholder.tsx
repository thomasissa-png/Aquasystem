import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * PhotoPlaceholder — slot photo élégant « Visuel à venir » (doctrine photos
 * fondateur 2026-06-12 : conversion d'abord — un placeholder sobre vaut mieux
 * que pas de photo là où une photo convertirait mieux).
 *
 * Sobre et assumé : fond sand alterné, filet, libellé discret + sujet attendu
 * (factuel). Pas une « maquette inachevée » — un cadre éditorial qui annonce
 * le visuel à fournir. La liste consolidée des prises vit dans
 * docs/photos-a-fournir.md.
 *
 * `subject` : description courte du visuel attendu (rendu sous le libellé).
 * `aspect`  : ratio du cadre (défaut 3/2, comme MediaSplit).
 */
export interface PhotoPlaceholderProps {
  subject: string;
  aspect?: '3/2' | 'square';
  className?: string;
}

export function PhotoPlaceholder({
  subject,
  aspect = '3/2',
  className,
}: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Visuel à venir : ${subject}`}
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-border bg-background-secondary p-8 text-center',
        aspect === 'square' ? 'aspect-square' : 'aspect-[3/2]',
        className,
      )}
    >
      <ImageIcon
        aria-hidden
        className="h-8 w-8 text-foreground-muted"
        strokeWidth={1.25}
      />
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
        Visuel à venir
      </span>
      <span className="max-w-[34ch] text-sm leading-6 text-foreground-secondary">
        {subject}
      </span>
    </div>
  );
}
