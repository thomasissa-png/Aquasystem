// Régénère les baselines IMPACTÉES par D-33 (audit CTA : whitespace-nowrap +
// lg/drawer responsive). Le CTA apparaît dans la navbar (toutes pages, dans le
// fold), le hero accueil (fold), les SectionCTA (sections sombres) et la 404.
// Contrainte D-33 : clips ≤ 900px de haut, JAMAIS fullPage.
// Usage : node scripts/baselines-cta-d33.mjs  (serveur statique sur :3200)
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:3200';
const OUT = 'tests/screenshots';
mkdirSync(OUT, { recursive: true });

const DEVICES = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'desktop', width: 1280, height: 900 },
];

// Pages dont le FOLD change (navbar CTA + arrow, hero CTA accueil).
const FOLD_PAGES = [
  ['accueil', '/'],
  ['piscines-bien-etre', '/piscines-bien-etre/'],
  ['jardins-paysage', '/jardins-paysage/'],
  ['la-maison', '/la-maison/'],
  ['realisations', '/realisations/'],
  ['prescripteurs', '/prescripteurs/'],
  ['contact', '/contact/'],
];

const browser = await chromium.launch();
let count = 0;

for (const device of DEVICES) {
  const ctx = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const stable =
    '*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;animation-delay:0s!important}.reveal{opacity:1!important;transform:none!important}';

  // 1. Folds (navbar + hero CTA)
  for (const [slug, path] of FOLD_PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.addStyleTag({ content: stable });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/${slug}-${device.name}-fold.png`, fullPage: false });
    count++;
  }

  // 2. SectionCTA (section sombre finale) — accueil + 404
  for (const [slug, path] of [['accueil', '/']]) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.addStyleTag({ content: stable });
    const sec = page.locator('section.bg-background-inverse').last();
    if (await sec.count()) {
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const box = await sec.boundingBox();
      if (box) {
        const h = Math.min(Math.round(box.height) + 20, 900);
        await page.screenshot({
          path: `${OUT}/${slug}-${device.name}-cta.png`,
          clip: { x: 0, y: Math.max(box.y - 10, 0), width: device.width, height: h },
        });
        count++;
      }
    }
  }

  // 3. 404 — fold (les 2 ButtonLink CTA y sont visibles)
  await page.goto(`${BASE}/page-inexistante-baseline/`, { waitUntil: 'load' }).catch(() => {});
  await page.addStyleTag({ content: stable });
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}/404-${device.name}-fold.png`, fullPage: false });
  count++;

  await ctx.close();
}

await browser.close();
console.log(`Régénéré ${count} baselines CTA (D-33), clips ≤ 900px, sans fullPage.`);
