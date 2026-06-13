/**
 * build-favicons.mjs — génère les assets favicon depuis le logo v5 "vague".
 * sharp ponctuel.
 *
 * Sorties dans public/ : favicon-16/32.png, apple-touch-icon.png,
 * android-chrome-192/512.png, favicon.ico.
 * favicon.svg + site.webmanifest sont écrits à la main (versionnés).
 *
 * Logo v5 "Rive privée" (D-46, direction fondateur « simple et élégant, signe
 * d'eau, beau bleu, ton sur ton ») : tuile bleu profond + vague d'eau ton sur
 * ton. Parle du métier (eau/piscine), monochrome, lisible onglet clair ET sombre.
 *
 * NB : og-image.jpg N'EST PAS générée ici — voir scripts/build-og-image.mjs.
 *
 * Lancer : node scripts/build-favicons.mjs
 */
import sharp from 'sharp';

const PUB = new URL('../public/', import.meta.url).pathname;
const NAVY = '#16304A';
const WAVE1 = '#4E86A6';
const WAVE2 = '#3C6E8E';

/**
 * Icône : tuile bleu profond arrondie + vague (2 traits ton sur ton).
 * `rxFrac` = rayon d'arrondi. `bleed` = tuile pleine bord à bord (apple).
 */
function iconSvg({ size, rxFrac = 0.22 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="${(rxFrac * 64).toFixed(1)}" ry="${(rxFrac * 64).toFixed(1)}" fill="${NAVY}"/>
    <g fill="none" stroke-linecap="round">
      <path d="M15 39 C 23 31 29 31 34 36 C 39 41 45 41 50 34" stroke="${WAVE1}" stroke-width="3.2"/>
      <path d="M19 45 C 24.5 40.5 29.5 40.5 33 43.5" stroke="${WAVE2}" stroke-width="2.8"/>
    </g>
  </svg>`;
}

async function png(opts, out) {
  await sharp(Buffer.from(iconSvg(opts)), { density: 300 }).png().toFile(`${PUB}${out}`);
  console.log(`OK ${out} (${opts.size}x${opts.size})`);
}

await png({ size: 16 }, 'favicon-16x16.png');
await png({ size: 32 }, 'favicon-32x32.png');
await png({ size: 192 }, 'android-chrome-192x192.png');
await png({ size: 512 }, 'android-chrome-512x512.png');
// Apple : iOS re-arrondit/masque — tuile pleine, rayon réduit.
await png({ size: 180, rxFrac: 0.18 }, 'apple-touch-icon.png');
await sharp(Buffer.from(iconSvg({ size: 32 })), { density: 300 })
  .png()
  .toFile(`${PUB}favicon.ico`);
console.log('OK favicon.ico (32x32 PNG)');
