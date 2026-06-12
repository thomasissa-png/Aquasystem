/**
 * build-favicons.mjs — génère les assets favicon + OG depuis le wordmark.
 * page-compositions §favicon. sharp en --no-save (outil de build ponctuel).
 *
 * Sorties dans public/ : favicon-16/32.png, apple-touch-icon.png,
 * android-chrome-192/512.png, favicon.ico, og-image.jpg.
 * favicon.svg + site.webmanifest sont écrits à la main (versionnés).
 *
 * Lancer : node scripts/build-favicons.mjs
 */
import sharp from 'sharp';

const PUB = new URL('../public/', import.meta.url).pathname;
const SAND_100 = '#F5F0E8';
const SAND_950 = '#1A1510';
const SAND_400 = '#D4CCC0';
const SAND_600 = '#7E7468';

// Géométrie "A" serif v2 (design-fixes-fondateur §B) — lisible à 16px :
// jambages épais en polygones, barre transversale renforcée, empattements
// massifs. Source unique partagée avec public/favicon.svg.
const iconShapes = `
  <polygon points="29,9 35,9 18,54 11,54"/>
  <polygon points="35,9 29,9 46,54 53,54"/>
  <rect x="18" y="33" width="28" height="7"/>
  <rect x="6" y="52" width="16" height="5"/>
  <rect x="42" y="52" width="16" height="5"/>`;

function iconSvg({ size, fg, bg, padding = 0 }) {
  const inner = 64;
  const scale = (size - 2 * padding) / inner;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}
    <g transform="translate(${padding},${padding}) scale(${scale})" fill="${fg}">
      ${iconShapes}
    </g>
  </svg>`;
}

async function png(size, opts, out) {
  await sharp(Buffer.from(iconSvg({ size, ...opts })))
    .png()
    .toFile(`${PUB}${out}`);
  console.log(`OK ${out} (${size}x${size})`);
}

// Favicons transparents, initiale sand-950.
await png(16, { fg: SAND_950 }, 'favicon-16x16.png');
await png(32, { fg: SAND_950 }, 'favicon-32x32.png');
// Android : fond sand-100, initiale sand-950.
await png(192, { fg: SAND_950, bg: SAND_100 }, 'android-chrome-192x192.png');
await png(512, { fg: SAND_950, bg: SAND_100 }, 'android-chrome-512x512.png');
// Apple : padding intérieur + fond sand-100, pas de coins arrondis.
await png(180, { fg: SAND_950, bg: SAND_100, padding: 20 }, 'apple-touch-icon.png');
// favicon.ico (32x32 — sharp écrit un PNG dans un conteneur ICO via .ico non
// supporté nativement ; on génère un PNG 32 et on le copie en .ico, accepté par
// les navigateurs modernes qui lisent le content-type, fallback historique).
await sharp(Buffer.from(iconSvg({ size: 32, fg: SAND_950 })))
  .png()
  .toFile(`${PUB}favicon.ico`);
console.log('OK favicon.ico (32x32 PNG)');

// --- OG image 1200x630 (composition sobre tokens) ---
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${SAND_950}"/>
  <g transform="translate(560,150) scale(2.5)" fill="${SAND_100}">
    ${iconShapes}
  </g>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="56" fill="${SAND_100}">Aquasystem</text>
  <text x="600" y="455" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${SAND_400}">L'extérieur à la hauteur de votre propriété.</text>
  <text x="60" y="595" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="${SAND_600}">Aqua System  |  Les Terres Essentielles</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 82 }).toFile(`${PUB}og-image.jpg`);
console.log('OK og-image.jpg (1200x630)');
