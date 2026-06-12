/**
 * build-new-realisation-images.mjs (ponctuel — moisson galerie D-27)
 * Convertit les photos NOUVELLES + REMPLACEMENTS HD moissonnées depuis
 * aqua-system.fr/galerie (droits accordés fondateur 2026-06-12) en WebP
 * multi-tailles vers public/images/realisations/.
 *
 * Source : /tmp/aqua-new/orig (JPEG pleine résolution, dédoublonnés vs les 14
 * existantes — cf. dev-decisions.md D-27).
 * Sorties par photo : -1280w (hero), -800w (card), -400w (thumb), toutes WebP.
 *
 * sharp en dépendance projet (résolu depuis node_modules). Outil de build
 * ponctuel — jamais requis au runtime (export statique, images.unoptimized).
 *
 * Lancer (depuis la racine projet) : node scripts/build-new-realisation-images.mjs
 */
import sharp from 'sharp';
import { readdirSync } from 'fs';

const SRC = '/tmp/aqua-new/orig';
const OUT = new URL('../public/images/realisations/', import.meta.url).pathname;
const SIZES = [
  { suffix: '1280w', width: 1280 },
  { suffix: '800w', width: 800 },
  { suffix: '400w', width: 400 },
];

let count = 0;
for (const file of readdirSync(SRC)) {
  const name = file.replace(/\.[^.]+$/, '');
  for (const { suffix, width } of SIZES) {
    await sharp(`${SRC}/${file}`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${OUT}${name}-${suffix}.webp`);
    count += 1;
  }
  console.log(`OK ${name} (3 tailles)`);
}
console.log(`\n${count} fichiers WebP générés dans ${OUT}`);
