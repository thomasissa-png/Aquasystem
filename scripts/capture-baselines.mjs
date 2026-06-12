// Régénère les baselines screenshots (fold + fullpage) pour les pages touchées
// par le lot D-21/D-22 (cadratins, P0 placeholders, footer, mentions légales).
// Footer = composant global → toutes les pages voient leur fullpage changer ;
// on capture donc l'ensemble des pages publiques. Usage : node scripts/capture-baselines.mjs
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:3100';
const OUT = 'tests/screenshots';
mkdirSync(OUT, { recursive: true });

const DEVICES = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
];

// slug baseline -> chemin de la page
const PAGES = [
  ['accueil', '/'],
  ['piscines-bien-etre', '/piscines-bien-etre/'],
  ['jardins-paysage', '/jardins-paysage/'],
  ['la-maison', '/la-maison/'],
  ['realisations', '/realisations/'],
  ['prescripteurs', '/prescripteurs/'],
  ['contact', '/contact/'],
  ['mentions-legales', '/mentions-legales/'],
  ['politique-confidentialite', '/politique-confidentialite/'],
];

const browser = await chromium.launch();
let count = 0;
for (const device of DEVICES) {
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const [slug, path] of PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    // neutralise les animations reveal pour un rendu stable
    await page.addStyleTag({
      content:
        '*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;animation-delay:0s!important}.reveal{opacity:1!important;transform:none!important}',
    });
    await page.waitForTimeout(250);
    // fold (viewport only)
    await page.screenshot({
      path: `${OUT}/${slug}-${device.name}-fold.png`,
      fullPage: false,
    });
    // fullpage
    await page.screenshot({
      path: `${OUT}/${slug}-${device.name}.png`,
      fullPage: true,
    });
    count += 2;
  }
  await context.close();
}
await browser.close();
console.log(`Captured ${count} screenshots across ${DEVICES.length} devices.`);
