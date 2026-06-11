import { cn } from '@/lib/cn';

/**
 * Chip — pill sélectionnable (design-system.md §10 FilterPill / tokens
 * component.filter-pill). Utilisé pour les chips « Votre projet concerne »
 * du formulaire (sélection multiple, optionnelle).
 *
 * État non-sélectionné = fond secondaire + contour discret ; sélectionné =
 * fond action primaire + texte clair (différenciation forte — critère @ux).
 * Rendu comme <button> dans un groupe ARIA (aria-pressed = état toggle).
 */
export interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  /** id du champ caché associé (pour le fallback form natif). */
  className?: string;
}

export function Chip({ label, selected, onToggle, className }: ChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        'inline-flex h-11 min-h-11 items-center rounded-full border px-4 text-sm transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2',
        selected
          ? 'border-action-primary bg-action-primary font-medium text-action-primary-text'
          : 'border-border bg-background-secondary text-foreground-secondary hover:bg-background-tertiary hover:text-foreground',
        className,
      )}
    >
      {label}
    </button>
  );
}
