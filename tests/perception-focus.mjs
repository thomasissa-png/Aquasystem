import { chromium } from 'playwright';
const BASE = 'http://127.0.0.1:3200';
const OUT = 'docs/reviews/gate-shots';
const browser = await chromium.launch();
for (const [dev, w, h] of [['mobile',390,844],['desktop',1440,900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/contact/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  const input = await page.$('input:visible, textarea:visible');
  if (input) { await input.scrollIntoViewIfNeeded(); await input.focus(); await input.type('Jean', {delay:20}); await page.waitForTimeout(400); }
  const box = input ? await input.boundingBox() : null;
  const cy = box ? Math.max(0, box.y - 100) : 0;
  await page.evaluate((yy)=>window.scrollTo(0,yy), cy);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/contact-${dev}-focus.png`, clip: { x:0, y:0, width:w, height:h } });
  await ctx.close();
}
await browser.close();
console.log('FOCUS DONE');
