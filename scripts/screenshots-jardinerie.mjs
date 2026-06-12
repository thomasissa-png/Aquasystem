/**
 * screenshots-jardinerie.mjs — boucle visuelle ciblée (mission D-15 §4).
 * Re-capture /jardins-paysage et /la-maison × 3 viewports après intégration
 * des photos jardinerie. Sert le build statique out/ via http-server local.
 *
 * Lancer (serveur sur 127.0.0.1:4321 requis) :
 *   node scripts/screenshots-jardinerie.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:4321';
const OUT = new URL('../tests/screenshots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

const PAGES = [
  ['jardins-paysage', '/jardins-paysage/'],
  ['la-maison', '/la-maison/'],
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
    const resp = await page.goto(`${BASE}${path}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}${name}-${vp.name}.png`, fullPage: true });
    console.log(`${resp?.status() ?? '???'}  ${name}-${vp.name}.png`);
  }
  await ctx.close();
}
await browser.close();
console.log('Done.');
