import { chromium } from 'playwright';
const browser = await chromium.launch();
const base = 'http://127.0.0.1:3400';
const OUT = '/home/user/Aquasystem/tests/screenshots/perception/';
// args: triplets name::path::vw::y  (vw 375|1280)  y = scroll offset
const targets = process.argv.slice(2);
async function shot(name, path, vw, y) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: 860 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(500);
  if (y > 0) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(400); }
  await page.screenshot({ path: OUT + name + '.png', clip: { x: 0, y: 0, width: vw, height: 860 } });
  await ctx.close();
  console.log('shot', name);
}
for (const t of targets) {
  const [name, path, vw, y] = t.split('::');
  await shot(name, path, parseInt(vw), parseInt(y || '0'));
}
await browser.close();
