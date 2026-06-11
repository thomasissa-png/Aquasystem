import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ButtonSize, ButtonVariant } from './Button';

/**
 * ButtonLink — un lien (<Link> Next) avec l'apparence d'un Button.
 * Préféré à un pattern `asChild`/Radix : 1 composant natif suffit pour nos
 * 2 usages (CTA navbar/footer/404) sans embarquer une dépendance.
 * Mêmes variants/tailles/états visuels que Button (design-system.md §4).
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary text-action-primary-text hover:bg-action-primary-hover active:bg-action-primary-active',
  ghost:
    'bg-transparent text-foreground-accent-water border border-action-primary hover:bg-water-50 active:bg-water-100',
  forest:
    'bg-action-forest text-action-primary-text hover:bg-action-forest-hover active:bg-forest-700',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-[52px] px-8 text-lg',
};

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  inverseFocus?: boolean;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  inverseFocus = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[0.01em]',
        'transition-colors duration-fast ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        inverseFocus
          ? 'focus-visible:ring-[var(--color-focus-ring-inverse)]'
          : 'focus-visible:ring-[var(--color-focus-ring)]',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
