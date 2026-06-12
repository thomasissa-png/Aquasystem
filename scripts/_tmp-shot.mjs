import { chromium } from 'playwright';
const browser = await chromium.launch();
const targets = process.argv.slice(2); // pairs name:path
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await ctx.newPage();
for (const t of targets) {
  const [name, path] = t.split('::');
  await page.goto('http://127.0.0.1:3000' + path, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/fold-${name}.png`, clip: { x: 0, y: 0, width: 375, height: 812 } });
  console.log('shot', name);
}
await browser.close();
