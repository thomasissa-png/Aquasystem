// Boucle visuelle strate savoir-faire (D-30) — fold + sections clippées ≤900px,
// JAMAIS fullPage (contrainte mission). Mobile 375 + desktop 1280.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:3100';
const OUT = 'docs/reviews/savoir-faire-shots';
mkdirSync(OUT, { recursive: true });

const DEVICES = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
];
const PAGES = [
  ['piscines', '/piscines-bien-etre/'],
  ['jardins', '/jardins-paysage/'],
];

const browser = await chromium.launch();
for (const d of DEVICES) {
  const ctx = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  for (const [slug, path] of PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content:
        '*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;animation-delay:0s!important}.reveal{opacity:1!important;transform:none!important}',
    });
    // scroll pour déclencher le lazy, puis remonter
    const total = await page.evaluate(async () => {
      await new Promise((r) => {
        let y = 0;
        const t = setInterval(() => {
          window.scrollBy(0, 600);
          y += 600;
          if (y >= document.body.scrollHeight) {
            clearInterval(t);
            r();
          }
        }, 60);
      });
      return document.body.scrollHeight;
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    // fold
    await page.screenshot({
      path: `${OUT}/${slug}-${d.name}-fold.png`,
      clip: { x: 0, y: 0, width: d.width, height: d.height },
    });
    // sections clippées ≤900px
    let y = d.height;
    let idx = 1;
    while (y < total && idx <= 8) {
      const segH = Math.min(d.height, total - y);
      if (segH < 80) break;
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${OUT}/${slug}-${d.name}-sec${idx}.png`,
        clip: { x: 0, y: 0, width: d.width, height: segH },
      });
      y += d.height;
      idx++;
    }
  }
  await ctx.close();
}
await browser.close();
console.log('DONE savoir-faire shots');
