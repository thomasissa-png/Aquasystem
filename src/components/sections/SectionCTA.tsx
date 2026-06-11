import { ButtonLink } from '@/components/ui/ButtonLink';
import { CONTACT_PATH, CTA_LABEL } from '@/lib/constants';
import { CtaTrackerLink } from './CtaTrackerLink';

/**
 * SectionCTA — bloc CTA sectionnel sombre (page-compositions WF-01 §5).
 * Fond sand-950, amorce serif centrée, Button primary lg.
 * `href` par défaut = /contact ; surchargeable pour ajouter ?source=…
 * `trackPosition` → event cta_clicked (E-04) au clic (client island léger).
 */
export interface SectionCTAProps {
  amorce: string;
  ctaLabel?: string;
  href?: string;
  /** Position pour l'event cta_clicked (ex: "footer"). */
  trackPosition?: string;
}

export function SectionCTA({
  amorce,
  ctaLabel = `${CTA_LABEL} →`,
  href = CONTACT_PATH,
  trackPosition,
}: SectionCTAProps) {
  return (
    <section className="bg-background-inverse">
      <div className="mx-auto max-w-container px-4 py-20 text-center md:px-8">
        <p className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-sand-100 md:text-4xl">
          {amorce}
        </p>
        <div className="mt-8">
          {trackPosition ? (
            <CtaTrackerLink
              href={href}
              position={trackPosition}
              label={ctaLabel}
            />
          ) : (
            <ButtonLink href={href} variant="primary" size="lg" inverseFocus>
              {ctaLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
