/**
 * screenshots-a11y-1.mjs — re-capture ciblée post-correctif BUG-A11Y-1.
 * Régénère UNIQUEMENT les baselines des pages portant ProofBadges + footer
 * (accueil, piscines-bien-etre, prescripteurs) × 3 viewports, vers
 * tests/screenshots/. Mêmes conventions que scripts/screenshots.mjs (full-page).
 *
 * Lancer (dev server sur 127.0.0.1:3100 requis) :
 *   node scripts/screenshots-a11y-1.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:3100';
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
  ['prescripteurs', '/prescripteurs/'],
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    const url = `${BASE}${path}`;
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({
      path: `${OUT}${name}-${vp.name}.png`,
      fullPage: true,
    });
    console.log(`${resp?.status() ?? '???'}  ${name}-${vp.name}.png`);
  }
  await ctx.close();
}
await browser.close();
console.log('Done.');
