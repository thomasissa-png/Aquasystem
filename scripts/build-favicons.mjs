/**
 * build-favicons.mjs — génère les assets favicon + OG depuis le monogramme v3.
 * page-compositions §favicon + audit-2026-06-12/favicon-v3.md. sharp ponctuel.
 *
 * Sorties dans public/ : favicon-16/32.png, apple-touch-icon.png,
 * android-chrome-192/512.png, favicon.ico, og-image.jpg.
 * favicon.svg + site.webmanifest sont écrits à la main (versionnés).
 *
 * Monogramme v3 "Rive privée" : "A" serif (DM Serif Display-like, contraste
 * plein/délié, empattements dalle) sand inversé sur TUILE eau arrondie, filet
 * or discret. La tuile garantit la visibilité sur onglet clair ET sombre.
 *
 * Lancer : node scripts/build-favicons.mjs
 */
import sharp from 'sharp';

const PUB = new URL('../public/', import.meta.url).pathname;
const SAND_100 = '#F5F0E8';
const SAND_950 = '#1A1510';
const SAND_400 = '#D4CCC0';
const SAND_600 = '#7E7468';
const EAU = '#3A6675';
const OR = '#C4924A';

// Tracé "A" serif Didone (boîte 64), apex pointu, jambage droit plein / gauche
// délié, empattements dalle bracketée, barre fine remontée (lisible à 16px).
// Source unique partagée avec public/favicon.svg (#glyphA). Substituable.
const glyphPath = `M 31.4 8 L 39.2 8 L 51.6 51 L 58 51 L 58 55.4 L 38.2 55.4 L 38.2 51 L 43.6 51 L 41.0 41.4 L 24.6 41.4 L 22.0 51 L 28 51 L 28 55.4 L 9.4 55.4 L 9.4 51 L 14.9 51 L 26.9 8 Z M 33.0 15.6 L 25.8 36.6 L 39.8 36.6 Z`;

/**
 * Icône tuilée. `pad` = marge intérieure du glyphe (fraction de size).
 * `rxFrac` = rayon d'arrondi (fraction de size). `filet` active le filet or.
 * `safe` = marge de sécurité autour de la tuile (pour apple-touch qui re-arrondit).
 */
function iconSvg({ size, rxFrac = 0.22, pad = 0.13, filet = true, safe = 0 }) {
  const sw = filet ? Math.max(size * 0.022, 0.8) : 0;
  const t = safe + (filet ? sw / 2 : 0);
  const w = size - 2 * t;
  const rx = size * rxFrac;
  const padPx = size * pad;
  const inner = 64;
  const scale = (size - 2 * padPx) / inner;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect x="${t}" y="${t}" width="${w}" height="${w}" rx="${rx}" ry="${rx}" fill="${EAU}"${filet ? ` stroke="${OR}" stroke-width="${sw}"` : ''}/>
    <g transform="translate(${padPx},${padPx}) scale(${scale})" fill="${SAND_100}" fill-rule="evenodd">
      <path d="${glyphPath}"/>
    </g>
  </svg>`;
}

async function png(opts, out) {
  await sharp(Buffer.from(iconSvg(opts))).png().toFile(`${PUB}${out}`);
  console.log(`OK ${out} (${opts.size}x${opts.size})`);
}

// Favicons : tuile eau + filet or (visibles sur onglet clair ET sombre).
await png({ size: 16 }, 'favicon-16x16.png');
await png({ size: 32 }, 'favicon-32x32.png');
// Android : même tuile, filet or, coins arrondis natifs.
await png({ size: 192 }, 'android-chrome-192x192.png');
await png({ size: 512 }, 'android-chrome-512x512.png');
// Apple : iOS re-arrondit/masque — tuile pleine bord à bord (rxFrac réduit),
// marge de sécurité, sans filet (le filet serait rogné par le masque iOS).
await png({ size: 180, rxFrac: 0.18, pad: 0.15, filet: false, safe: 0 }, 'apple-touch-icon.png');
// favicon.ico (PNG 32 en conteneur .ico, lu par les navigateurs modernes).
await sharp(Buffer.from(iconSvg({ size: 32 })))
  .png()
  .toFile(`${PUB}favicon.ico`);
console.log('OK favicon.ico (32x32 PNG)');

// --- OG image 1200x630 (composition sobre tokens, monogramme tuilé en médaillon) ---
const tileSize = 132;
const tx = 600 - tileSize / 2;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${SAND_950}"/>
  <g transform="translate(${tx},120)">
    <rect x="1.5" y="1.5" width="${tileSize - 3}" height="${tileSize - 3}" rx="${tileSize * 0.22}" ry="${tileSize * 0.22}" fill="${EAU}" stroke="${OR}" stroke-width="3"/>
    <g transform="translate(${tileSize * 0.13},${tileSize * 0.13}) scale(${(tileSize - 2 * tileSize * 0.13) / 64})" fill="${SAND_100}" fill-rule="evenodd"><path d="${glyphPath}"/></g>
  </g>
  <text x="600" y="345" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="56" fill="${SAND_100}">Aquasystem</text>
  <text x="600" y="400" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${SAND_400}">L'extérieur à la hauteur de votre propriété.</text>
  <text x="60" y="595" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="${SAND_600}">Aqua System  |  Les Terres Essentielles</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 82 }).toFile(`${PUB}og-image.jpg`);
console.log('OK og-image.jpg (1200x630)');
