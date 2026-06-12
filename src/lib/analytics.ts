/**
 * Helper analytics — contrat technique défini par @data-analyst.
 * Source : docs/analytics/tracking-plan.md > "Architecture du helper trackEvent".
 *
 * Règles (non négociables) :
 * - fire-and-forget : jamais `await`, jamais bloquant.
 * - fail-silent : un bug analytics ne doit JAMAIS casser l'UX.
 * - zéro PII dans les propriétés (vérifié en code review).
 * - Umami chargé en `afterInteractive` (layout) → window.umami peut être absent
 *   tôt dans le cycle de vie : on teste sa présence à chaque appel.
 * - Fallback Plausible conservé si bascule outil au moment de l'implémentation.
 */

/** Noms d'events autorisés (E-01 à E-09 du tracking-plan). */
export type EventName =
  | 'form_submission_success'
  | 'form_start'
  | 'form_abandonment'
  | 'cta_clicked'
  | 'portfolio_filter_clicked'
  | 'blog_filter_clicked'
  | 'portfolio_realisation_viewed'
  | 'prescripteur_page_viewed'
  | 'prescripteur_cta_clicked'
  | 'cross_selling_clicked';

/** Propriétés d'event — valeurs scalaires uniquement, jamais de PII. */
export type EventProperties = Record<string, string | number | boolean>;

interface UmamiGlobal {
  track: (name: string, properties?: EventProperties) => void;
}

interface PlausibleGlobal {
  (name: string, options?: { props?: EventProperties }): void;
}

declare global {
  interface Window {
    umami?: UmamiGlobal;
    plausible?: PlausibleGlobal;
  }
}

/**
 * Émet un event analytics. No-op silencieux si aucun outil n'est chargé
 * (ex: NEXT_PUBLIC_UMAMI_WEBSITE_ID absent) ou en SSR/SSG (window indéfini).
 */
export function trackEvent(name: EventName, properties?: EventProperties): void {
  try {
    if (typeof window === 'undefined') return;

    if (window.umami) {
      window.umami.track(name, properties ?? {});
      return;
    }

    if (window.plausible) {
      window.plausible(name, { props: properties ?? {} });
    }
  } catch {
    // fail-silent — voir règles ci-dessus.
  }
}
