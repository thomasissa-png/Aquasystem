import { test, expect } from '@playwright/test';

/**
 * D-17 — Garde anti-régression du bailout CSR en export statique.
 *
 * useSearchParams() vidait /realisations (grille) et /contact (formulaire) du
 * HTML pré-rendu (bailout client de toute la page sous Suspense). Désormais ces
 * composants lisent l'URL après montage (window.location) : le HTML statique
 * contient la grille COMPLÈTE et le <form> COMPLET, et le fallback no-JS fonctionne.
 *
 * Ces tests désactivent JavaScript : ce que voit Playwright = exactement le HTML
 * pré-rendu (et ce que voient Google/Bing/les LLM + un visiteur sans JS).
 */
test.describe('HTML statique sans JavaScript (D-17 — anti-bailout CSR)', () => {
  test.use({ javaScriptEnabled: false });

  test('/realisations : la grille complète (14 fiches) est dans le HTML pré-rendu', async ({
    page,
  }) => {
    await page.goto('/realisations/');
    const cards = page
      .getByRole('main')
      .locator('a[href^="/realisations/"]:not([href="/realisations/"])');
    await expect(cards).toHaveCount(14);
  });

  test('/contact : le formulaire complet est dans le HTML pré-rendu (fallback no-JS)', async ({
    page,
  }) => {
    await page.goto('/contact/');
    // Le <form> et ses champs critiques existent sans JS (action POST native).
    await expect(page.locator('form[action="/api/contact"]')).toHaveCount(1);
    await expect(page.locator('input[name="prenom_nom"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="commune"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Parlez-nous de votre projet' }),
    ).toBeVisible();
  });
});
