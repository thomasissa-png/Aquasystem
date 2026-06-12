// Mobile audit capture — iPhone 13, section by section
import { chromium, devices } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = 'https://aquasystem.pages.dev';
const OUT = path.resolve('docs/reviews/audit-mobile-2026-06-12/shots');
fs.mkdirSync(OUT, { recursive: true });

const iphone = devices['iPhone 13'];

const PAGES = [
  ['home', '/'],
  ['piscines-bien-etre', '/piscines-bien-etre/'],
  ['jardins-paysage', '/jardins-paysage/'],
  ['notre-approche', '/notre-approche/'],
  ['la-maison', '/la-maison/'],
  ['realisations', '/realisations/'],
  ['fiche', '/realisations/piscine-debordement-foret/'],
  ['prescripteurs', '/prescripteurs/'],
  ['contact', '/contact/'],
  ['contact-merci', '/contact/merci/'],
  ['mentions-legales', '/mentions-legales/'],
  ['politique-confidentialite', '/politique-confidentialite/'],
  ['404', '/cette-page-nexiste-pas/'],
];

const VIEWPORT_H = 844;
const STEP = 700;

async function captureSections(page, name) {
  // total scroll height
  const total = await page.evaluate(() => document.body.scrollHeight);
  let y = 0;
  let i = 1;
  const max = Math.min(Math.ceil(total / STEP) + 1, 18);
  while (y < total && i <= max) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(450);
    const file = path.join(OUT, `${name}-s${String(i).padStart(2, '0')}.jpg`);
    await page.screenshot({ path: file, quality: 72, type: 'jpeg' });
    i++;
    y += STEP;
    const newTotal = await page.evaluate(() => document.body.scrollHeight);
    if (newTotal > total) { /* lazy content grew; loop continues via max */ }
  }
  return i - 1;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...iphone, ignoreHTTPSErrors: true });
  const page = await context.newPage();

  const report = {};
  for (const [name, url] of PAGES) {
    try {
      await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(800);
      const n = await captureSections(page, name);
      report[name] = n;
      console.log(`OK ${name}: ${n} sections`);
    } catch (e) {
      console.log(`ERR ${name}: ${e.message}`);
      report[name] = 'ERR ' + e.message;
    }
  }
  fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify(report, null, 2));
  await browser.close();
})();
