import { chromium } from 'playwright';

/**
 * Baselines visuelles du LOT BLOG (boucle visuelle) :
 * - /notre-regard (index, fold) sur mobile 375 / tablet 768 / desktop 1280
 * - 1 article (fold + 1 section corps) sur les 3 devices
 * - accueil teaser « Notre regard » (section dédiée) sur les 3 devices
 *
 * Contraintes brief : clips ≤ 900px. Sortie : tests/screenshots/.
 */
const BASE = process.env.SHOT_BASE ?? 'http://127.0.0.1:3210';
const OUT = 'tests/screenshots';
const ARTICLE = '/notre-regard/piscine-debordement-terrain-en-pente/';

const devices = [
  ['mobile', 375, 812],
  ['tablet', 768, 900],
  ['desktop', 1280, 900],
];

function clip(y, w, h) {
  return { x: 0, y, width: w, height: Math.min(h, 900) };
}

const browser = await chromium.launch();

async function shot(page, name, dev, w, y, h) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/blog-${name}-${dev}.png`, clip: clip(0, w, h) });
}

for (const [dev, w, h] of devices) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // Index fold
  await page.goto(BASE + '/notre-regard/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(900);
  await shot(page, 'index-fold', dev, w, 0, h);

  // Article fold + une section de corps
  await page.goto(BASE + ARTICLE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(900);
  await shot(page, 'article-fold', dev, w, 0, h);
  await shot(page, 'article-body', dev, w, h + 200, h);

  // Accueil — section teaser « Notre regard » : localiser par l'eyebrow.
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(900);
  // scroll progressif pour déclencher le lazy-load des images
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 600);
        y += 600;
        if (y >= document.body.scrollHeight) {
          clearInterval(t);
          r();
        }
      }, 70);
    });
  });
  const teaserY = await page.evaluate(() => {
    const eyebrows = [...document.querySelectorAll('p')];
    const el = eyebrows.find((p) => p.textContent?.trim() === 'Notre regard');
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, top - 40);
  });
  await shot(page, 'accueil-teaser', dev, w, teaserY, h);

  await ctx.close();
}

await browser.close();
console.log('DONE');
