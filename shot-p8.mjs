import { chromium } from 'playwright';

const BASE = 'http://localhost:3900';
const OUT = 'tests/screenshots/perception';
const args = process.argv.slice(2);
const batch = args[0] || 'blog';

const browser = await chromium.launch();

async function shots(jobs) {
  for (const j of jobs) {
    const ctx = await browser.newContext({
      viewport: { width: j.w, height: j.h },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(BASE + j.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    if (j.scroll) { await page.evaluate((y) => window.scrollTo(0, y), j.scroll); await page.waitForTimeout(500); }
    const clipH = Math.min(j.h, 900);
    await page.screenshot({
      path: `${OUT}/${j.name}.png`,
      clip: { x: 0, y: 0, width: j.w, height: clipH },
    });
    console.log('OK', j.name);
    await ctx.close();
  }
}

const batches = {
  blog: [
    { name: 'p8-blog-index-mobile-fold', url: '/notre-regard/', w: 390, h: 844 },
    { name: 'p8-blog-index-mobile-grid', url: '/notre-regard/', w: 390, h: 844, scroll: 700 },
    { name: 'p8-blog-index-desktop-fold', url: '/notre-regard/', w: 1440, h: 900 },
    { name: 'p8-blog-index-desktop-grid', url: '/notre-regard/', w: 1440, h: 900, scroll: 650 },
  ],
  a1: [
    { name: 'p8-a1-desktop-hero', url: '/notre-regard/piscine-debordement-terrain-en-pente/', w: 1440, h: 900 },
    { name: 'p8-a1-desktop-body1', url: '/notre-regard/piscine-debordement-terrain-en-pente/', w: 1440, h: 900, scroll: 900 },
    { name: 'p8-a1-desktop-body2', url: '/notre-regard/piscine-debordement-terrain-en-pente/', w: 1440, h: 900, scroll: 1800 },
  ],
  a1b: [
    { name: 'p8-a1-desktop-geo', url: '/notre-regard/piscine-debordement-terrain-en-pente/', w: 1440, h: 900, scroll: 2900 },
    { name: 'p8-a1-mobile-read', url: '/notre-regard/piscine-debordement-terrain-en-pente/', w: 390, h: 844, scroll: 1100 },
    { name: 'p8-a1-desktop-end', url: '/notre-regard/piscine-debordement-terrain-en-pente/', w: 1440, h: 900, scroll: 4200 },
  ],
  a4: [
    { name: 'p8-a4-desktop-hero', url: '/notre-regard/investissement-piscine-haut-de-gamme/', w: 1440, h: 900 },
    { name: 'p8-a4-desktop-body', url: '/notre-regard/investissement-piscine-haut-de-gamme/', w: 1440, h: 900, scroll: 1400 },
    { name: 'p8-a4-mobile-read', url: '/notre-regard/investissement-piscine-haut-de-gamme/', w: 390, h: 844, scroll: 1000 },
  ],
  a4b: [
    { name: 'p8-a4-desktop-author', url: '/notre-regard/investissement-piscine-haut-de-gamme/', w: 1440, h: 900, scroll: 3400 },
    { name: 'p8-a4-desktop-end', url: '/notre-regard/investissement-piscine-haut-de-gamme/', w: 1440, h: 900, scroll: 4400 },
  ],
  home: [
    { name: 'p8-home-teaser', url: '/', w: 1440, h: 900, scroll: 4200 },
    { name: 'p8-home-teaser-mobile', url: '/', w: 390, h: 844, scroll: 6000 },
    { name: 'p8-home-footer', url: '/', w: 390, h: 844, scroll: 8000 },
  ],
  align: [
    { name: 'p8-piscines-geo', url: '/piscines-bien-etre/', w: 1440, h: 900, scroll: 2200 },
    { name: 'p8-jardins-textblock', url: '/jardins-paysage/', w: 1440, h: 900, scroll: 1600 },
    { name: 'p8-lamaison-textblock', url: '/la-maison/', w: 1440, h: 900, scroll: 1200 },
  ],
  prim: [
    { name: 'p8-home-lte-as', url: '/', w: 1440, h: 900, scroll: 2400 },
    { name: 'p8-crosssell-mobile', url: '/piscines-bien-etre/', w: 390, h: 844, scroll: 4200 },
    { name: 'p8-home-fold', url: '/', w: 390, h: 844 },
  ],
  reg: [
    { name: 'p8-realisations-grid', url: '/realisations/', w: 1440, h: 900, scroll: 600 },
    { name: 'p8-lamaison-mobile-fold', url: '/la-maison/', w: 390, h: 844 },
    { name: 'p8-home-desktop-fold', url: '/', w: 1440, h: 900 },
  ],
};

await shots(batches[batch]);
await browser.close();
