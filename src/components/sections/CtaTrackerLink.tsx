'use client';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { trackEvent } from '@/lib/analytics';
import { CTA_LABEL } from '@/lib/constants';

/**
 * CtaTrackerLink — îlot client minimal : un ButtonLink qui émet cta_clicked
 * (E-04) au clic. Permet de garder les pages en Server Components, n'isolant
 * que le besoin d'interactivité (le tracking). Fail-silent (helper analytics).
 */
export interface CtaTrackerLinkProps {
  href: string;
  /** Valeur de la propriété `position` de l'event (hero/footer/…). */
  position: string;
  label?: string;
  variant?: 'primary' | 'ghost' | 'forest';
  size?: 'sm' | 'md' | 'lg';
  inverseFocus?: boolean;
  className?: string;
}

export function CtaTrackerLink({
  href,
  position,
  label = `${CTA_LABEL} →`,
  variant = 'primary',
  size = 'lg',
  inverseFocus = true,
  className,
}: CtaTrackerLinkProps) {
  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      inverseFocus={inverseFocus}
      className={className}
      onClick={() =>
        trackEvent('cta_clicked', { position, label_cta: CTA_LABEL })
      }
    >
      {label}
    </ButtonLink>
  );
}
