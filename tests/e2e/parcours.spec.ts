import { test, expect } from '@playwright/test';
import { stubUmami, getEvents, expectNoA11yViolations } from './helpers';

/**
 * Parcours critiques personas (user-flows.md). Multi-device sur le parcours
 * principal Alexandre (@main → iPhone 13 / iPad / Desktop Chrome).
 */

test.describe('Parcours Alexandre', () => {
  test('accueil → piscines → cross-sell → réalisations → fiche → contact @main', async ({
    page,
  }) => {
    await stubUmami(page);

    // 1. Accueil : tagline + CTA visibles.
    await page.goto('/');
    await expect(
      page.getByText("L'extérieur à la hauteur de votre propriété").first(),
    ).toBeVisible();

    // 2. Univers piscines via la navigation (lien direct, robuste mobile+desktop).
    await page.goto('/piscines-bien-etre/');
    await expect(page.getByText('Aqua System').first()).toBeVisible();

    // 3. Cross-sell → jardins (CTA "en partenariat avec Les Terres Essentielles").
    await page.goto('/jardins-paysage/');
    await expect(
      page.getByText('Les Terres Essentielles').first(),
    ).toBeVisible();

    // 4. Réalisations : >= 8 cartes (F-05 #1). Les cards = liens vers une fiche
    // (slug), à distinguer du lien de nav « Réalisations » (href=/realisations/).
    await page.goto('/realisations/');
    const cards = page
      .getByRole('main')
      .locator('a[href^="/realisations/"]:not([href="/realisations/"])');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThanOrEqual(8);

    // 5. Fiche : ouvre la première réalisation.
    await cards.first().click();
    await page.waitForURL('**/realisations/**');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // 6. Contact depuis la fiche (CTA ?source=).
    await page.goto('/contact/?source=piscines-bien-etre');
    await expect(
      page.getByRole('checkbox', { name: 'Piscine & bien-être', checked: true }),
    ).toBeVisible();
  });
});

test.describe('Parcours Camille (prescripteur)', () => {
  test('/prescripteurs → CTA Présentons-nous → contact chip pré-sélectionné', async ({
    page,
  }) => {
    await stubUmami(page);
    await page.goto('/prescripteurs/');

    // E-07 prescripteur_page_viewed à l'arrivée (îlot client useEffect).
    await expect
      .poll(async () =>
        (await getEvents(page)).some((e) => e.name === 'prescripteur_page_viewed'),
      )
      .toBe(true);

    // CTA "Présentons-nous" → /contact?source=prescripteurs.
    await page.getByRole('link', { name: /Présentons-nous/ }).first().click();
    await page.waitForURL('**/contact/**');
    await expect(
      page.getByRole('checkbox', { name: 'Je suis prescripteur', checked: true }),
    ).toBeVisible();
  });

  // BUG-A11Y-1 (color-contrast) RÉSOLU par tokens v1.1. Reste FIXME(BUG-A11Y-2) :
  // target-size WCAG 2.2 AA 2.5.8 — distinct, préexistant, hors périmètre couleurs
  // (retour @ux/@design).
  test.fixme('a11y axe-core sur /prescripteurs', async ({ page }) => {
    await page.goto('/prescripteurs/');
    await expectNoA11yViolations(page, 'prescripteurs');
  });
});

test.describe('Accueil — SEO statique & a11y', () => {
  test('title, meta description, h1 et JSON-LD LocalBusiness dans le HTML (US-01 #8)', async ({
    page,
  }) => {
    const resp = await page.goto('/');
    const html = (await resp?.text()) ?? '';
    expect(html).toContain('<title>');
    expect(html).toMatch(/<meta name="description"/);
    expect(html).toContain('application/ld+json');
    expect(html).toContain('LocalBusiness');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // BUG-A11Y-1 (color-contrast) RÉSOLU par tokens v1.1. Reste FIXME(BUG-A11Y-2) :
  // target-size WCAG 2.2 AA 2.5.8 — distinct, préexistant, hors périmètre couleurs
  // (retour @ux/@design).
  test.fixme('a11y axe-core sur l’accueil', async ({ page }) => {
    await page.goto('/');
    await expectNoA11yViolations(page, 'accueil');
  });
});
