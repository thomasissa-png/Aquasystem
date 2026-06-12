import { chromium } from 'playwright';

const base = 'http://127.0.0.1:3000';
const browser = await chromium.launch();

async function shot(path, file, { width, height, action }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  if (action) await action(page);
  await page.screenshot({ path: file });
  await ctx.close();
  console.log('saved', file);
}

// Drawer ouvert mobile 375
await shot('/', '/tmp/drawer-mobile-open.png', {
  width: 375, height: 780,
  action: async (page) => {
    const btn = page.locator('button[aria-label="Ouvrir le menu"]');
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
    await page.waitForTimeout(600);
  },
});

await browser.close();
