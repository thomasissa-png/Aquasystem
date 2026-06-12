import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:3200';
const OUT = 'docs/reviews/gate-shots';

const pages = [
  ['home', '/'],
  ['la-maison', '/la-maison/'],
  ['piscines', '/piscines-bien-etre/'],
  ['jardins', '/jardins-paysage/'],
  ['realisations', '/realisations/'],
  ['realisation-detail', '/realisations/piscine-debordement-foret/'],
  ['prescripteurs', '/prescripteurs/'],
  ['contact', '/contact/'],
  ['merci', '/contact/merci/'],
  ['mentions', '/mentions-legales/'],
  ['confidentialite', '/politique-confidentialite/'],
];

const devices = [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
];

function clip(y, w, h) { return { x: 0, y, width: w, height: h }; }

const browser = await chromium.launch();

for (const [name, path] of pages) {
  for (const [dev, w, h] of devices) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
    }
    await page.waitForTimeout(1200);
    // scroll to bottom to trigger lazy images, then back up
    const total = await page.evaluate(async () => {
      await new Promise(r => { let y=0; const t=setInterval(()=>{window.scrollBy(0,600); y+=600; if(y>=document.body.scrollHeight){clearInterval(t);r();}},80); });
      return document.body.scrollHeight;
    });
    await page.evaluate(() => window.scrollTo(0,0));
    await page.waitForTimeout(800);
    // fold
    await page.screenshot({ path: `${OUT}/${name}-${dev}-fold.png`, clip: clip(0, w, h) });
    // sectioned full page
    let y = h, idx = 1;
    while (y < total && idx <= 6) {
      const segH = Math.min(h, total - y);
      if (segH < 60) break;
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/${name}-${dev}-sec${idx}.png`, clip: clip(0, w, segH) });
      y += h; idx++;
    }
    await ctx.close();
  }
}

// Drawer (mobile) on home
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  const burst = await page.$('button[aria-label*="enu" i], button[aria-label*="avigation" i], header button');
  if (burst) { await burst.click(); await page.waitForTimeout(700); }
  await page.screenshot({ path: `${OUT}/home-mobile-drawer.png` });
  await ctx.close();
}

// Contact form focus (desktop + mobile)
for (const [dev, w, h] of devices) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/contact/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  const input = await page.$('input, textarea');
  if (input) { await input.scrollIntoViewIfNeeded(); await input.focus(); await page.waitForTimeout(400); }
  const box = input ? await input.boundingBox() : null;
  const cy = box ? Math.max(0, box.y - 120) : 0;
  await page.evaluate((yy)=>window.scrollTo(0,yy), cy);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/contact-${dev}-focus.png`, clip: clip(0, w, h) });
  await ctx.close();
}

await browser.close();
console.log('DONE');
