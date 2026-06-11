import { type Page, type Route, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Helpers E2E partagés.
 * - Stub window.umami AVANT chargement → capture des events dans window.__events.
 * - Mock réseau /api/contact (route.fulfill) → jamais d'appel réel.
 * - Scan a11y axe-core (échec sur violations A/AA).
 */

export interface CapturedEvent {
  name: string;
  props: Record<string, unknown>;
}

const STORE_KEY = '__pw_events';

/**
 * Injecte un stub umami avant tout script de page. À appeler avant page.goto.
 * Les events sont persistés en sessionStorage → survivent au redirect plein
 * page (window.location.assign vers /contact/merci) qui réinitialise le window.
 */
export async function stubUmami(page: Page): Promise<void> {
  await page.addInitScript((key: string) => {
    function read(): unknown[] {
      try {
        return JSON.parse(window.sessionStorage.getItem(key) ?? '[]');
      } catch {
        return [];
      }
    }
    (window as unknown as { umami: unknown }).umami = {
      track: (name: string, props: Record<string, unknown> = {}) => {
        const events = read();
        events.push({ name, props });
        try {
          window.sessionStorage.setItem(key, JSON.stringify(events));
        } catch {
          /* ignore */
        }
      },
    };
  }, STORE_KEY);
}

export async function getEvents(page: Page): Promise<CapturedEvent[]> {
  return page.evaluate((key) => {
    try {
      return JSON.parse(window.sessionStorage.getItem(key) ?? '[]') as CapturedEvent[];
    } catch {
      return [] as CapturedEvent[];
    }
  }, STORE_KEY);
}

/** Mock POST /api/contact avec un status/body donné. GET/navigation non touchés. */
export async function mockContact(
  page: Page,
  opts: { status: number; body?: unknown } = { status: 200, body: { success: true } },
): Promise<void> {
  await page.route('**/api/contact', async (route: Route) => {
    if (route.request().method() !== 'POST') {
      await route.fallback();
      return;
    }
    await route.fulfill({
      status: opts.status,
      contentType: 'application/json',
      body: JSON.stringify(opts.body ?? { success: opts.status === 200 }),
    });
  });
}

/** Scan a11y — échoue sur toute violation WCAG 2.0/2.1/2.2 niveau A/AA. */
export async function expectNoA11yViolations(page: Page, context?: string): Promise<void> {
  // AxeBuilder embarque sa propre copie des types Playwright → cast nécessaire.
  const builder = new AxeBuilder({ page } as unknown as ConstructorParameters<typeof AxeBuilder>[0]);
  const results = await builder
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    results.violations,
    `Violations a11y${context ? ` (${context})` : ''} : ${results.violations
      .map((v) => `${v.id} [${v.nodes.length}]`)
      .join(', ')}`,
  ).toEqual([]);
}

/** Remplit le formulaire de contact avec des valeurs valides. */
export async function fillValidContactForm(page: Page): Promise<void> {
  await page.getByLabel('Votre nom').fill('Alexandre Dupont');
  await page.getByLabel(/^Email/).fill('alexandre@domaine.fr');
  await page.getByLabel('Commune').fill('Le Vésinet');
  await page
    .getByLabel('Décrivez-nous votre projet')
    .fill('Je souhaite une piscine à débordement et un jardin paysagé sur ma propriété.');
}
