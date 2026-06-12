/**
 * shot-proof.mjs — capture CLIPPÉE du bloc ProofBadges (refonte D-26).
 * Contraintes images : ≤ 1900px, jamais fullPage. Clip de la <ul> du composant.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:3100';
const OUT = '/tmp/proof/';
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 900 },
  { name: 'desktop', width: 1280, height: 900 },
];
const PAGES = [
  ['accueil', '/'],
  ['piscines', '/piscines-bien-etre/'],
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
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
    const ul = page.locator('ul:has(li span.uppercase)').first();
    await ul.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await ul.boundingBox();
    if (!box) { console.log(`NO BOX ${name}-${vp.name}`); continue; }
    const pad = 24;
    await page.screenshot({
      path: `${OUT}${name}-${vp.name}.png`,
      clip: {
        x: Math.max(0, box.x - pad),
        y: Math.max(0, box.y - pad),
        width: Math.min(vp.width, box.width + pad * 2),
        height: box.height + pad * 2,
      },
    });
    console.log(`OK ${name}-${vp.name}.png  ${Math.round(box.width)}x${Math.round(box.height)}`);
  }
  await ctx.close();
}
await browser.close();
console.log('Done.');
