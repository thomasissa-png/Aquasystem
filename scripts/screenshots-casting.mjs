/**
 * screenshots-casting.mjs — re-baseline ciblé après swaps casting-visuels (D-19).
 * Pages : accueil + jardins-paysage × 3 viewports → tests/screenshots/.
 * Serveur statique requis : npx serve out -l 3000.
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
  ['jardins-paysage', '/jardins-paysage/'],
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
