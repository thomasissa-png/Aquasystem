/**
 * screenshots-iter3.mjs — re-baselines itération 3 (D-18, NF-1/2/3).
 * Pages modifiées uniquement : /jardins-paysage (3 viewports, NF-1 + NF-2)
 * et /contact mobile (NF-3). Sert le build statique out/ sur 127.0.0.1:3000.
 *   node scripts/screenshots-iter3.mjs
 */
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:3000';
const OUT = new URL('../tests/screenshots/', import.meta.url).pathname;

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

// [page, path, [viewports]]
const TARGETS = [
  ['jardins-paysage', '/jardins-paysage/', ['mobile', 'tablet', 'desktop']],
  ['contact', '/contact/', ['mobile']],
];

const browser = await chromium.launch();
for (const [name, path, vps] of TARGETS) {
  for (const vpName of vps) {
    const ctx = await browser.newContext({
      viewport: VIEWPORTS[vpName],
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    const resp = await page.goto(`${BASE}${path}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({
      path: `${OUT}${name}-${vpName}.png`,
      fullPage: true,
    });
    console.log(`${resp?.status() ?? '???'}  ${name}-${vpName}.png`);
    await ctx.close();
  }
}
await browser.close();
console.log('Done.');
