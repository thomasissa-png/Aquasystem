import { test, expect } from '@playwright/test';
import { REALISATIONS } from '@/content/realisations';
import { ARTICLES } from '@/content/blog';

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

  test('/realisations : la grille complète (toutes les fiches) est dans le HTML pré-rendu', async ({
    page,
  }) => {
    await page.goto('/realisations/');
    const cards = page
      .getByRole('main')
      .locator('a[href^="/realisations/"]:not([href="/realisations/"])');
    // Compte dérivé du contenu (pas de magic number) : la grille « Tous » rend
    // l'intégralité de REALISATIONS, donc autant de cards que d'entrées publiées.
    await expect(cards).toHaveCount(REALISATIONS.length);
  });

  test('/notre-regard : toutes les cards articles sont dans le HTML pré-rendu (filtre client)', async ({
    page,
  }) => {
    await page.goto('/notre-regard/');
    // L'état « Tous » par défaut rend l'intégralité des articles côté serveur :
    // autant de cards (lien « Lire l'article ») que d'entrées du manifeste.
    const cards = page
      .getByRole('main')
      .getByRole('link', { name: /Lire l'article/ });
    await expect(cards).toHaveCount(ARTICLES.length);
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
