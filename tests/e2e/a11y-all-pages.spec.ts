import { test } from '@playwright/test';
import { stubUmami, expectNoA11yViolations } from './helpers';

/**
 * Couverture axe-core ÉLARGIE — 12 pages (BUG-A11Y-3, élargissement Phase 5.2).
 *
 * Historiquement l'audit axe E2E ne couvrait que 5 pages (accueil, piscines,
 * prescripteurs, realisations, contact), ce qui a laissé passer BUG-A11Y-3
 * (contraste muted) sur les pages non couvertes. Cette boucle paramétrée scanne
 * les 12 pages distinctes du site (les fiches /realisations/[slug] sont
 * structurellement identiques → 1 échantillon représentatif), incluant la
 * vérification du skip link (BUG-A11Y-4) au niveau du DOM via axe.
 * /notre-approche supprimée — fusionnée dans /la-maison (refonte IA, D-25).
 *
 * Exécutée sur Desktop Chrome (déterministe). Échoue sur toute violation
 * WCAG 2.0/2.1/2.2 niveau A/AA.
 */
const PAGES: { name: string; path: string }[] = [
  { name: 'accueil', path: '/' },
  { name: 'piscines-bien-etre', path: '/piscines-bien-etre/' },
  { name: 'jardins-paysage', path: '/jardins-paysage/' },
  { name: 'realisations', path: '/realisations/' },
  { name: 'fiche-realisation', path: '/realisations/piscine-debordement-foret/' },
  { name: 'la-maison', path: '/la-maison/' },
  { name: 'prescripteurs', path: '/prescripteurs/' },
  { name: 'notre-regard', path: '/notre-regard/' },
  {
    name: 'article-blog',
    path: '/notre-regard/piscine-debordement-terrain-en-pente/',
  },
  { name: 'contact', path: '/contact/' },
  { name: 'contact-merci', path: '/contact/merci/' },
  { name: 'mentions-legales', path: '/mentions-legales/' },
  { name: 'politique-confidentialite', path: '/politique-confidentialite/' },
  { name: '404', path: '/cette-page-nexiste-pas/' },
];

test.describe('a11y axe-core — 14 pages (BUG-A11Y-3 / BUG-A11Y-4)', () => {
  for (const { name, path } of PAGES) {
    test(`axe-core sur ${name}`, async ({ page }) => {
      await stubUmami(page);
      await page.goto(path);
      // Le skip link doit être le 1er enfant focusable (BUG-A11Y-4) : présent au DOM.
      await page.locator('a.skip-link[href="#main"]').first().waitFor({ state: 'attached' });
      await expectNoA11yViolations(page, name);
    });
  }
});
