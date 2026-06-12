import { chromium } from 'playwright';

const BASE = 'https://aquasystem.pages.dev';
const OUT = 'docs/reviews/audit-desktop-2026-06-12/shots';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
const page = await ctx.newPage();

// HOME: nav link hover + first card hover + primary CTA hover
await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(1000);

// Nav link hover
try {
  const nav = page.locator('header a, nav a').nth(1);
  await nav.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/home-hover-nav.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
} catch (e) { console.log('nav hover fail', e.message); }

// Primary CTA hover (hero button)
try {
  const cta = page.getByRole('link', { name: /contact|projet|parler|échanger|demander/i }).first();
  await cta.scrollIntoViewIfNeeded();
  await cta.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/home-hover-cta.png` });
} catch (e) { console.log('cta hover fail', e.message); }

// Card hover: scroll to first card grid, hover first card
try {
  const card = page.locator('a[href*="piscines"], a[href*="jardins"], article a').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await card.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/home-hover-card.png` });
} catch (e) { console.log('card hover fail', e.message); }

// REALISATIONS: hover a realisation card (badge + image)
await page.goto(BASE + '/realisations/', { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(1000);
try {
  const rcard = page.locator('a[href*="/realisations/"]').first();
  await rcard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await rcard.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/realisations-hover-card.png` });
} catch (e) { console.log('rcard hover fail', e.message); }

await browser.close();
console.log('HOVER DONE');
