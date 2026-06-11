'use client';

import { useEffect } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { trackEvent } from '@/lib/analytics';

/**
 * Îlots client de la page /prescripteurs (E-07 / E-08).
 * - PrescripteurPageView : émet prescripteur_page_viewed (E-07) au montage,
 *   une seule fois. Sert de segment « prescripteur non converti » côté analytics.
 * - PrescripteurCtaLink : ButtonLink qui émet prescripteur_cta_clicked (E-08)
 *   avec sa position (above_fold / milieu_page).
 */
export function PrescripteurPageView() {
  useEffect(() => {
    trackEvent('prescripteur_page_viewed', {});
  }, []);
  return null;
}

export interface PrescripteurCtaLinkProps {
  href: string;
  position: 'above_fold' | 'milieu_page';
  label: string;
  variant?: 'primary' | 'ghost' | 'forest';
  size?: 'sm' | 'md' | 'lg';
  inverseFocus?: boolean;
  className?: string;
}

export function PrescripteurCtaLink({
  href,
  position,
  label,
  variant = 'primary',
  size = 'md',
  inverseFocus = false,
  className,
}: PrescripteurCtaLinkProps) {
  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      inverseFocus={inverseFocus}
      className={className}
      onClick={() => trackEvent('prescripteur_cta_clicked', { position })}
    >
      {label}
    </ButtonLink>
  );
}
