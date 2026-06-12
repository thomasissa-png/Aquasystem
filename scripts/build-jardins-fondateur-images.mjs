/**
 * build-jardins-fondateur-images.mjs (ponctuel — 6 photos jardins fondateur, 2026-06-12)
 * Droits accordés fondateur. Source = racine du repo (JPEG FB/IG LTE).
 *
 * SITE (3) → public/images/realisations/ en WebP 3 tailles (1280/800/400) :
 *   - 469671333 → jardin-terrasses-plongee   (vue plongeante terrasses étagées)
 *   - 469667932 → massif-exotique-escalier   (massif exotique, palmiers, escalier pierre)
 *   - 469800690 → massif-palmier-agaves       (massif palmiers/agaves)
 *
 * RÉSERVE SOCIALE (3) → assets/social-media/ en JPEG optimisé (≤1900px) :
 *   - 472211552 → bananiers-serre-jardinerie
 *   - 482219680 → fleurs-blanches-macro
 *   - 487491327 → rosiers-jardin
 *
 * Lancer (racine projet) : node scripts/build-jardins-fondateur-images.mjs
 */
import sharp from 'sharp';

const ROOT = new URL('../', import.meta.url).pathname;
const OUT_SITE = `${ROOT}public/images/realisations/`;
const OUT_SOCIAL = `${ROOT}assets/social-media/`;

const SIZES = [
  { suffix: '1280w', width: 1280 },
  { suffix: '800w', width: 800 },
  { suffix: '400w', width: 400 },
];

const SITE = [
  { src: '469671333_18061770844852574_5827567304635393773_n.jpg', name: 'jardin-terrasses-plongee' },
  { src: '469667932_18061770850852574_4771760805686791393_n.jpg', name: 'massif-exotique-escalier' },
  { src: '469800690_18061770826852574_7938921787005888441_n.jpg', name: 'massif-palmier-agaves' },
];

const SOCIAL = [
  { src: '472211552_2120937838323427_1873967205539625905_n.jpg', name: 'bananiers-serre-jardinerie' },
  { src: '482219680_1216921647106638_8455438374221007668_n.jpg', name: 'fleurs-blanches-macro' },
  { src: '487491327_1234705318661604_6197834447656655910_n.jpg', name: 'rosiers-jardin' },
];

let count = 0;
for (const { src, name } of SITE) {
  for (const { suffix, width } of SIZES) {
    await sharp(`${ROOT}${src}`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${OUT_SITE}${name}-${suffix}.webp`);
    count += 1;
  }
  console.log(`SITE OK ${name} (3 WebP)`);
}

for (const { src, name } of SOCIAL) {
  await sharp(`${ROOT}${src}`)
    .resize({ width: 1900, height: 1900, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT_SOCIAL}${name}.jpg`);
  count += 1;
  console.log(`SOCIAL OK ${name}.jpg`);
}

console.log(`\n${count} fichiers générés.`);
