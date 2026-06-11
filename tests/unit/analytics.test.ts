// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { trackEvent } from '@/lib/analytics';

/**
 * Helper analytics (tracking-plan §"Architecture trackEvent").
 * Règles : fire-and-forget, fail-silent, route umami puis plausible.
 */

interface UmamiLike {
  track: (name: string, props?: Record<string, unknown>) => void;
}
type PlausibleLike = (name: string, opts?: { props?: Record<string, unknown> }) => void;

function setUmami(track?: UmamiLike['track']): void {
  (window as Window & { umami?: UmamiLike }).umami = track ? { track } : undefined;
}
function setPlausible(fn?: PlausibleLike): void {
  (window as Window & { plausible?: PlausibleLike }).plausible = fn;
}

afterEach(() => {
  setUmami(undefined);
  setPlausible(undefined);
  vi.restoreAllMocks();
});

describe('trackEvent', () => {
  it('appelle window.umami.track quand présent', () => {
    const track = vi.fn();
    setUmami(track);
    trackEvent('cta_clicked', { cta_id: 'hero' });
    expect(track).toHaveBeenCalledWith('cta_clicked', { cta_id: 'hero' });
  });

  it('passe un objet vide si aucune propriété', () => {
    const track = vi.fn();
    setUmami(track);
    trackEvent('form_start');
    expect(track).toHaveBeenCalledWith('form_start', {});
  });

  it('fallback plausible si umami absent', () => {
    const plausible = vi.fn();
    setPlausible(plausible);
    trackEvent('portfolio_filter_clicked', { filtre: 'piscine' });
    expect(plausible).toHaveBeenCalledWith('portfolio_filter_clicked', {
      props: { filtre: 'piscine' },
    });
  });

  it('umami prioritaire sur plausible si les deux présents', () => {
    const track = vi.fn();
    const plausible = vi.fn();
    setUmami(track);
    setPlausible(plausible);
    trackEvent('form_submission_success', { has_cross_selling: true });
    expect(track).toHaveBeenCalledOnce();
    expect(plausible).not.toHaveBeenCalled();
  });

  it('no-op silencieux si aucun outil chargé (pas d’exception)', () => {
    expect(() => trackEvent('cross_selling_clicked')).not.toThrow();
  });

  it('fail-silent si umami.track lève une exception', () => {
    setUmami(() => {
      throw new Error('umami crash');
    });
    expect(() => trackEvent('prescripteur_cta_clicked')).not.toThrow();
  });
});
