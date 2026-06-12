import { test, expect } from '@playwright/test';
import { stubUmami, getEvents, expectNoA11yViolations } from './helpers';
import { ARTICLES_BY_DATE } from '@/content/blog';

/**
 * Filtre du blog « Notre regard » (/notre-regard) — même mécanique que le
 * portfolio (RealisationsGrid) : chips, état actif, URL ?categorie= partageable,
 * filtre client sur grille pré-rendue, event blog_filter_clicked.
 */

const cards = (page: import('@playwright/test').Page) =>
  page.getByRole('main').getByRole('link', { name: /Lire l'article/ });

const TYPES_COUNT = ARTICLES_BY_DATE.filter(
  (a) => a.category === 'types-piscine',
).length;

test.describe('Blog — filtre catégories', () => {
  test('chip Types de piscine → état actif + URL ?categorie + nb résultats', async ({
    page,
  }) => {
    await stubUmami(page);
    await page.goto('/notre-regard/');

    const chip = page.getByRole('button', { name: 'Filtrer : types de piscine' });
    await chip.click();
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(/\?categorie=types-piscine/);
    await expect(cards(page)).toHaveCount(TYPES_COUNT);

    const events = await getEvents(page);
    const ev = events.find((e) => e.name === 'blog_filter_clicked');
    expect(ev).toBeTruthy();
    expect(ev?.props.categorie).toBe('types-piscine');
  });

  test('présélection via ?categorie=eau-jardin après hydration', async ({ page }) => {
    await page.goto('/notre-regard/?categorie=eau-jardin');
    await expect(
      page.getByRole('button', { name: 'Filtrer : eau et jardin' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('retour à Tous → toutes les cards reviennent', async ({ page }) => {
    await page.goto('/notre-regard/');
    await page.getByRole('button', { name: 'Filtrer : eau et jardin' }).click();
    const tous = page.getByRole('button', { name: 'Afficher tous les articles' });
    await tous.click();
    await expect(tous).toHaveAttribute('aria-pressed', 'true');
    await expect(cards(page)).toHaveCount(ARTICLES_BY_DATE.length);
  });

  test('aucune catégorie exposée ne mène à une impasse (zéro empty state)', async ({
    page,
  }) => {
    await page.goto('/notre-regard/');
    const chips = [
      'Filtrer : types de piscine',
      'Filtrer : eau et jardin',
      'Filtrer : investissement et projet',
    ];
    for (const name of chips) {
      await page.getByRole('button', { name }).click();
      await expect(cards(page).first()).toBeVisible();
      await expect(
        page.getByText('Aucun article ne correspond à cette catégorie'),
      ).toHaveCount(0);
    }
  });

  test('chips ≥ 44px de hauteur à 375px (touch target)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/notre-regard/');
    const box = await page
      .getByRole('button', { name: 'Filtrer : types de piscine' })
      .boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test('axe-core sur /notre-regard', async ({ page }) => {
    await page.goto('/notre-regard/');
    await expectNoA11yViolations(page, 'notre-regard');
  });
});
