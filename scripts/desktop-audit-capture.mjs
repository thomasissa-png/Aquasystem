import { chromium } from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';

// Compress a PNG buffer to a JPG <=150KB, downscaling width if needed.
async function saveCompact(buf, outPath) {
  for (const w of [1440, 1200, 1000, 880]) {
    for (const q of [70, 60, 50, 42]) {
      const out = await sharp(buf).resize({ width: w }).jpeg({ quality: q, mozjpeg: true }).toBuffer();
      if (out.length <= 150 * 1024) {
        fs.writeFileSync(outPath, out);
        return out.length;
      }
    }
  }
  const out = await sharp(buf).resize({ width: 800 }).jpeg({ quality: 40, mozjpeg: true }).toBuffer();
  fs.writeFileSync(outPath, out);
  return out.length;
}

const BASE = 'https://aquasystem.pages.dev';
const OUT = 'docs/reviews/audit-desktop-2026-06-12/shots';
const VW = 1440, VH = 900;
const STEP = 800;

const PAGES = [
  ['home', '/'],
  ['piscines-bien-etre', '/piscines-bien-etre/'],
  ['jardins-paysage', '/jardins-paysage/'],
  ['notre-approche', '/notre-approche/'],
  ['la-maison', '/la-maison/'],
  ['realisations', '/realisations/'],
  ['fiche-a', '/realisations/piscine-debordement-foret/'],
  ['fiche-b', '/realisations/piscine-interieure-pierre-poutres/'],
  ['prescripteurs', '/prescripteurs/'],
  ['contact', '/contact/'],
  ['contact-merci', '/contact/merci/'],
  ['mentions-legales', '/mentions-legales/'],
  ['politique-confidentialite', '/politique-confidentialite/'],
  ['404', '/this-page-does-not-exist/'],
];

// Only capture the page name(s) passed as CLI args, or all if none.
const onlyArg = process.argv.slice(2);
const targets = onlyArg.length ? PAGES.filter((p) => onlyArg.includes(p[0])) : PAGES;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: VW, height: VH },
  deviceScaleFactor: 1,
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();

for (const [name, path] of targets) {
  const url = BASE + path;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  }
  await page.waitForTimeout(1200);
  // Lazy-load: scroll to bottom once then back to top.
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += STEP) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const sections = Math.max(1, Math.ceil(height / STEP));
  let s = 0;
  for (let y = 0; y < height; y += STEP) {
    s++;
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(350);
    const file = `${OUT}/${name}-s${String(s).padStart(2, '0')}.jpg`;
    const buf = await page.screenshot({ type: 'png' });
    const sz = await saveCompact(buf, file);
    process.stdout.write(`${file} (${Math.round(sz / 1024)}KB)\n`);
  }
  console.log(`### ${name} : ${sections} sections, hauteur ${height}px`);
}

await browser.close();
console.log('DONE');
