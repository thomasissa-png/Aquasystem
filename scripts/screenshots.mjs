/**
 * screenshots.mjs — boucle visuelle (mission Tranche B §6).
 * Capture les pages × 3 viewports vers tests/screenshots/.
 * Nommage :
 *   <page>-<viewport>.png        → pleine page (layout complet vs compositions).
 *   <page>-<viewport>-fold.png   → premier écran SEULEMENT (above-the-fold),
 *                                  à hauteur réelle du viewport. Indispensable
 *                                  pour juger les heros (le fullPage écrase la
 *                                  composition above-the-fold — finding fondateur
 *                                  2026-06-12 : hero mobile cassé invisible en
 *                                  fullPage).
 *
 * Lancer (dev server sur 127.0.0.1:3000 requis) :
 *   node scripts/screenshots.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:3000';
const OUT = new URL('../tests/screenshots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

const PAGES = [
  ['accueil', '/'],
  ['piscines-bien-etre', '/piscines-bien-etre/'],
  ['jardins-paysage', '/jardins-paysage/'],
  ['notre-approche', '/notre-approche/'],
  ['la-maison', '/la-maison/'],
  ['realisations', '/realisations/'],
  ['realisation-fiche', '/realisations/piscine-debordement-foret/'],
  ['prescripteurs', '/prescripteurs/'],
  ['mentions-legales', '/mentions-legales/'],
  ['politique-confidentialite', '/politique-confidentialite/'],
  ['404', '/cette-page-nexiste-pas/'],
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce', // capture l'état final (pas mi-animation)
  });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    const url = `${BASE}${path}`;
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Laisse les images lazy se charger.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    // 1) Above-the-fold à hauteur réelle du viewport (clip = premier écran).
    await page.screenshot({
      path: `${OUT}${name}-${vp.name}-fold.png`,
      clip: { x: 0, y: 0, width: vp.width, height: vp.height },
    });
    // 2) Pleine page (comparaison layout complet).
    await page.screenshot({
      path: `${OUT}${name}-${vp.name}.png`,
      fullPage: true,
    });
    console.log(
      `${resp?.status() ?? '???'}  ${name}-${vp.name}.png + -fold.png`,
    );
  }
  await ctx.close();
}
await browser.close();
console.log('Done.');
