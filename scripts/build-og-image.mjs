/**
 * build-og-image.mjs — image de partage social (Open Graph / Twitter card).
 *
 * Remplace le placeholder D-? (fond uni + logo « A »). Compose la photo hero
 * signature (demeure ancienne + bassin miroir, fondateur-approved) en plein
 * cadre 1200×630, dégradé de lisibilité, wordmark + tagline + ligne de preuve,
 * dans les polices de marque (DM Serif Display + DM Sans).
 *
 * Source photo : public/images/realisations/piscine-couloir-demeure-ancienne-1920w.webp
 * Sortie : public/og-image.jpg (qualité 86, < 200 Ko).
 *
 * Lancer : node scripts/build-og-image.mjs
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'fs';

const W = 1200;
const H = 630;
const SRC =
  'public/images/realisations/piscine-couloir-demeure-ancienne-1920w.webp';
const OUT = 'public/og-image.jpg';

// Couleurs de marque (design-tokens.json).
const SAND = '#F5F0E8';
const GOLD = '#C4924A';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#15110C" stop-opacity="0.95"/>
      <stop offset="0.30" stop-color="#15110C" stop-opacity="0.78"/>
      <stop offset="0.58" stop-color="#15110C" stop-opacity="0.30"/>
      <stop offset="0.80" stop-color="#15110C" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#15110C" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#15110C" stop-opacity="0.60"/>
      <stop offset="0.55" stop-color="#15110C" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <rect width="${W}" height="${H}" fill="url(#h)"/>
  <!-- Ligne de preuve -->
  <text x="72" y="404" font-family="DM Sans" font-weight="600" font-size="22"
        letter-spacing="2.5" fill="${GOLD}">${esc('PISCINISTE & PAYSAGISTE HAUT DE GAMME')}</text>
  <!-- Wordmark -->
  <text x="70" y="488" font-family="DM Serif Display" font-size="84"
        fill="${SAND}">Aquasystem</text>
  <!-- Tagline -->
  <text x="72" y="540" font-family="DM Sans" font-weight="400" font-size="32"
        fill="${SAND}" fill-opacity="0.95">${esc("L'extérieur à la hauteur de votre propriété.")}</text>
  <!-- Géo discrète -->
  <text x="72" y="582" font-family="DM Sans" font-weight="500" font-size="22"
        fill="${SAND}" fill-opacity="0.66">${esc('Yvelines & Hauts-de-Seine — depuis 30 ans')}</text>
</svg>`);

const photo = await sharp(SRC)
  .resize(W)
  // Bande basse (top=110) : montre le bassin miroir + reflet de la façade
  // (la composition signature), demeure conservée. Cf. casting D-45.
  .extract({ left: 0, top: 110, width: W, height: H })
  .toBuffer();

await sharp(photo)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`og-image.jpg ${meta.width}x${meta.height}`);

/**
 * OG photos par visuel (articles de blog + fiches réalisations).
 * Les balises og:image pointaient vers des `.webp` — non rendus par la plupart
 * des messageries (iMessage, WhatsApp, LinkedIn) → aperçu vide. On génère un
 * JPEG 1200×630 (photo nue, sans texte : le titre vient de la card) pour chaque
 * visuel de réalisation, consommé via `ogPhoto(base)` (lib/seo.ts).
 */
const SRC_DIR = 'public/images/realisations';
const OG_DIR = 'public/images/og';
mkdirSync(OG_DIR, { recursive: true });

const bases = [
  ...new Set(
    readdirSync(SRC_DIR)
      .filter((f) => f.endsWith('-1280w.webp'))
      .map((f) => f.replace('-1280w.webp', '')),
  ),
];

let n = 0;
for (const base of bases) {
  await sharp(`${SRC_DIR}/${base}-1280w.webp`)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OG_DIR}/${base}.jpg`);
  n++;
}
console.log(`OG photos générées : ${n} (public/images/og/*.jpg)`);
