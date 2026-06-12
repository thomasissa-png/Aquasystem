import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:3200';
const OUT = 'docs/reviews/cta-audit';

const browser = await chromium.launch();

async function shot(page, name, clipH = 260) {
  const h = Math.min(clipH, 900);
  const w = page.viewportSize().width;
  await page.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: w, height: h } });
}

// 1. Drawer open — mobile 390 ET 320 (worst case fondateur)
for (const w of [390, 320]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.waitForTimeout(500);
  await shot(page, `drawer-${w}`, 844);
  await ctx.close();
}

// 2. Page-level CTA instances. clipH borné à 900, scroll vers le CTA via anchor.
const targets = [
  // [name, path, device-w, selector-text, scrollSelector]
  ['navbar-desktop', '/', 1440],
  ['hero-cta-mobile', '/', 390],
  ['hero-cta-desktop', '/', 1440],
  ['contact-submit-mobile', '/contact/', 390],
  ['contact-submit-desktop', '/contact/', 1440],
  ['404-mobile', '/page-inexistante/', 390],
  ['404-desktop', '/page-inexistante/', 1440],
  ['presc-fold-mobile', '/prescripteurs/', 390],
  ['presc-fold-desktop', '/prescripteurs/', 1440],
];

for (const [name, path, w] of targets) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
  }
  await page.waitForTimeout(800);
  await shot(page, name, 900);
  await ctx.close();
}

// 3. SectionCTA (footer) + sticky submit — scroll to bottom of pages with SectionCTA
const sectionPages = [
  ['sectioncta-home-mobile', '/', 390],
  ['sectioncta-home-desktop', '/', 1440],
  ['sectioncta-presc-final-mobile', '/prescripteurs/', 390],
  ['realisation-detail-cta-mobile', '/realisations/piscine-debordement-foret/', 390],
];
for (const [name, path, w] of sectionPages) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
  }
  await page.waitForTimeout(600);
  // find the dark SectionCTA section and scroll it into view
  const sec = page.locator('section.bg-background-inverse').last();
  if (await sec.count()) {
    await sec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box = await sec.boundingBox();
    if (box) {
      const h = Math.min(box.height + 40, 900);
      await page.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: Math.max(box.y - 10, 0), width: w, height: h } });
    }
  }
  await ctx.close();
}

await browser.close();
console.log('CTA audit shots done');
