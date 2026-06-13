/**
 * build-og-image.mjs — image de partage social (Open Graph / Twitter card).
 *
 * Direction « Éditorial centré » (audit @design, docs/reviews/audit-og-image.md,
 * note cible 10/10) : photo hero signature (demeure ancienne symétrique + bassin
 * miroir), scrim vertical bas pur, monogramme de marque haut-gauche, bloc texte
 * CENTRÉ sur l'axe de symétrie de la façade (eyebrow + wordmark + tagline).
 *
 * Source : public/images/realisations/piscine-couloir-demeure-ancienne-1920w.webp
 * Sortie : public/og-image.jpg (qualité 88, < 200 Ko).
 * Polices : DM Serif Display + DM Sans (installées dans ~/.fonts).
 *
 * Génère aussi les OG photos JPEG par visuel (articles/fiches) — cf. plus bas.
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

// Tokens « Rive privée ».
const SAND = '#F5F0E8';
const GOLD = '#C4924A';
const WATER = '#3A6675';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Monogramme de marque (favicon.svg) — tuile water, « A » sand, filet or.
// Placé haut-gauche (48×48 @ x:48,y:40), marquage immédiat en vignette.
const MONOGRAM = `<g transform="translate(48,40) scale(0.75)">
    <rect x="0.7" y="0.7" width="62.6" height="62.6" rx="14" ry="14" fill="${WATER}" stroke="${GOLD}" stroke-width="1.4"/>
    <path fill="${SAND}" fill-rule="evenodd" transform="translate(8.32,8.32) scale(0.74)" d="M 31.4 8 L 39.2 8 L 51.6 51 L 58 51 L 58 55.4 L 38.2 55.4 L 38.2 51 L 43.6 51 L 41.0 41.4 L 24.6 41.4 L 22.0 51 L 28 51 L 28 55.4 L 9.4 55.4 L 9.4 51 L 14.9 51 L 26.9 8 Z M 33.0 15.6 L 25.8 36.6 L 39.8 36.6 Z"/>
  </g>`;

// Bloc texte centré, calé dans le tiers bas (protégé par le scrim) — légère
// descente vs spec brute (lisibilité du wordmark sur le reflet du bassin,
// vérifiée au rendu). Ombre portée douce pour sécuriser le contraste.
const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1A1510" stop-opacity="0"/>
      <stop offset="0.38" stop-color="#1A1510" stop-opacity="0"/>
      <stop offset="0.66" stop-color="#1A1510" stop-opacity="0.55"/>
      <stop offset="0.82" stop-color="#1A1510" stop-opacity="0.80"/>
      <stop offset="1" stop-color="#1A1510" stop-opacity="0.90"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="7" flood-color="#1A1510" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  ${MONOGRAM}
  <g filter="url(#soft)">
    <text x="600" y="468" text-anchor="middle" font-family="DM Sans" font-weight="500"
          font-size="18" letter-spacing="3.4" fill="${GOLD}">${esc('HAUT DE GAMME — DEPUIS 30 ANS')}</text>
    <text x="600" y="538" text-anchor="middle" font-family="DM Serif Display"
          font-size="76" fill="${SAND}">Aquasystem</text>
    <text x="600" y="580" text-anchor="middle" font-family="DM Sans" font-weight="400"
          font-size="24" fill="${SAND}" fill-opacity="0.85">${esc("L'extérieur à la hauteur de votre propriété.")}</text>
  </g>
</svg>`);

// Crop : y=80 (rogne le ciel gris, remonte le reflet du bassin), façade centrée.
const photo = await sharp(SRC)
  .extract({ left: 0, top: 80, width: 1920, height: 1024 })
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(photo)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`og-image.jpg ${meta.width}x${meta.height}`);

/**
 * OG photos par visuel (articles de blog + fiches réalisations).
 * Les og:image en `.webp` ne sont PAS rendus par la plupart des messageries
 * (iMessage, WhatsApp, LinkedIn) → aperçu vide. JPEG 1200×630 (photo nue, le
 * titre vient de la card) pour chaque visuel, consommé via `ogPhoto(base)`.
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
