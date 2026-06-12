import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Button — design-system.md §4.
 * 3 variants (primary / ghost / forest), 3 tailles (sm / md / lg), 6 états
 * (default, hover, active, focus-visible, disabled, loading).
 * Tokens uniquement (classes sémantiques de tailwind.config.ts).
 */
export type ButtonVariant = 'primary' | 'ghost' | 'forest';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Focus ring inversé (clair) pour les fonds sombres (hero, overlay, drawer). */
  inverseFocus?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary text-action-primary-text hover:bg-action-primary-hover active:bg-action-primary-active',
  ghost:
    'bg-transparent text-foreground-accent-water border border-action-primary hover:bg-water-50 active:bg-water-100',
  forest:
    'bg-action-forest text-action-primary-text hover:bg-action-forest-hover active:bg-forest-700',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm', // 36px
  md: 'h-11 px-6 text-base', // 44px — touch target WCAG 2.5.8
  // 52px — CTA hero / formulaire. Padding/texte fluides : libellés longs +
  // whitespace-nowrap ne débordent jamais ≥ 320px (D-33). Pleines valeurs ≥ 400px.
  lg: 'h-[52px] px-[clamp(1rem,4vw,2rem)] text-[clamp(0.9375rem,3.9vw,1.125rem)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    inverseFocus = false,
    disabled,
    type = 'button',
    className,
    children,
    ...props
  },
  ref,
) {
  const isInert = disabled || loading;
  return (
    <button
      ref={ref}
      type={type}
      // On garde l'élément dans le tab order (a11y) : aria-disabled plutôt que
      // disabled seul, sauf en loading où on bloque réellement le double-submit.
      disabled={loading ? true : disabled}
      aria-disabled={isInert || undefined}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[0.01em]',
        'transition-colors duration-fast ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        inverseFocus
          ? 'focus-visible:ring-[var(--color-focus-ring-inverse)]'
          : 'focus-visible:ring-[var(--color-focus-ring)]',
        'disabled:cursor-not-allowed disabled:bg-background-tertiary disabled:text-foreground-muted disabled:border-transparent',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
          <span>Envoi en cours…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});
