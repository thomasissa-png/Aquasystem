// Régénère les baselines après le cycle FOND (D-32) :
// - /jardins-paysage : nouvelle section « Ce que le vivant impose » + enrichts.
// - /piscines-bien-etre : fusion bas de page « Construction & finitions ».
// - 1 fiche réalisation : vérifie le rendu du texte D-31 (visualDescription).
// Contrainte mission : clip ≤900px, JAMAIS fullPage. Fold + sections clippées,
// 3 devices, dans tests/screenshots/ (baselines officielles).
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3100';
const OUT = 'tests/screenshots';
mkdirSync(OUT, { recursive: true });

const DEVICES = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
];
const PAGES = [
  ['jardins-paysage', '/jardins-paysage/'],
  ['piscines-bien-etre', '/piscines-bien-etre/'],
  ['realisation-fiche-d31', '/realisations/piscine-debordement-foret/'],
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
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `${OUT}/${slug}-${d.name}-fold.png`,
      clip: { x: 0, y: 0, width: d.width, height: d.height },
    });
    let y = d.height;
    let idx = 1;
    while (y < total && idx <= 12) {
      const segH = Math.min(d.height, total - y);
      if (segH < 80) break;
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(250);
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
console.log('DONE baselines fond D-32');
