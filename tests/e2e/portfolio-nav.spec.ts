import { test, expect } from '@playwright/test';
import { stubUmami, getEvents, expectNoA11yViolations } from './helpers';

/**
 * F-05 portfolio filtrable + F-10 navigation/drawer/404.
 */

test.describe('Portfolio — filtres (F-05)', () => {
  test('filtre Piscine → état actif + URL ?filter (US-05 #2/#8)', async ({ page }) => {
    await stubUmami(page);
    await page.goto('/realisations/');

    const piscineBtn = page.getByRole('button', { name: 'Filtrer : piscines sur mesure' });
    await piscineBtn.click();
    await expect(piscineBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(/\?filter=piscine/);

    // E-05 portfolio_filter_clicked émis.
    const events = await getEvents(page);
    expect(events.some((e) => e.name === 'portfolio_filter_clicked')).toBe(true);
  });

  test('présélection via ?filter=projet_complet après hydration (US-05 #8)', async ({
    page,
  }) => {
    await page.goto('/realisations/?filter=projet_complet');
    await expect(
      page.getByRole('button', { name: 'Filtrer : projets complets eau et jardin' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('aucun filtre exposé ne mène à une impasse (US-05 #4 — invariant)', async ({
    page,
  }) => {
    // Le manifeste actuel garantit ≥ 1 résultat pour CHAQUE filtre exposé :
    // l'empty state ne doit jamais être atteignable via l'UI (sinon dead-end).
    // Le wording exact de l'empty state est couvert par realisations.test.ts
    // (logique de filtrage) ; ici on vérifie l'invariant UX zéro-impasse.
    await page.goto('/realisations/');
    const filters = [
      'Filtrer : piscines sur mesure',
      'Filtrer : spas et saunas',
      'Filtrer : jardins et parcs',
      'Filtrer : projets complets eau et jardin',
    ];
    const cards = page.getByRole('main').locator('a[href^="/realisations/"]:not([href="/realisations/"])');
    for (const name of filters) {
      await page.getByRole('button', { name }).click();
      await expect(cards.first()).toBeVisible();
      await expect(
        page.getByText('Aucune réalisation ne correspond à cette sélection'),
      ).toHaveCount(0);
    }
  });

  test('clics rapides successifs → seul le dernier filtre actif (US-05 #6)', async ({
    page,
  }) => {
    await page.goto('/realisations/');
    const piscine = page.getByRole('button', { name: 'Filtrer : piscines sur mesure' });
    const tous = page.getByRole('button', { name: 'Afficher toutes les réalisations' });

    await piscine.click();
    await expect(piscine).toHaveAttribute('aria-pressed', 'true');
    await page.waitForURL(/\?filter=piscine/);

    // Retour à « Tous » : le filtre Piscine se désactive, toutes les cartes reviennent.
    await tous.click();
    await expect(piscine).toHaveAttribute('aria-pressed', 'false');
    await expect(tous).toHaveAttribute('aria-pressed', 'true');
    expect(
      await page.getByRole('main').locator('a[href^="/realisations/"]:not([href="/realisations/"])').count(),
    ).toBeGreaterThanOrEqual(8);
  });
});

test.describe('Navigation (F-10)', () => {
  test('lien actif via aria-current sur la page courante (US-10 #6)', async ({ page }) => {
    await page.goto('/piscines-bien-etre/');
    await expect(
      page.getByRole('link', { name: 'Piscines & Bien-être' }).first(),
    ).toHaveAttribute('aria-current', 'page');
  });

  test('drawer mobile : ouverture, Escape ferme, focus rendu au trigger', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: 'Ouvrir le menu' });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Menu navigation' });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('footer : copyright année courante (US-10 #9)', async ({ page }) => {
    await page.goto('/');
    const year = new Date().getFullYear().toString();
    await expect(page.getByRole('contentinfo')).toContainText(year);
  });
});

test.describe('404 (F-10)', () => {
  test('page inconnue → 404 habillée avec lien retour accueil', async ({ page }) => {
    await page.goto('/cette-page-nexiste-pas/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Retour à l'accueil/ }).first(),
    ).toBeVisible();
  });
});

test.describe('Touch targets (P2-3 ux-review)', () => {
  test('filtres portfolio ≥ 44px de hauteur à 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/realisations/');
    const btn = page.getByRole('button', { name: 'Filtrer : piscines sur mesure' });
    const box = await btn.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });
});

test.describe('a11y portfolio', () => {
  // BUG-A11Y-1 (color-contrast) RÉSOLU par tokens v1.1. Reste FIXME(BUG-A11Y-2) :
  // target-size WCAG 2.2 AA 2.5.8 (cartes/liens < 24px d'espacement) — distinct,
  // préexistant, hors périmètre couleurs (retour @ux/@design).
  test.fixme('axe-core sur /realisations', async ({ page }) => {
    await page.goto('/realisations/');
    await expectNoA11yViolations(page, 'realisations');
  });
});
