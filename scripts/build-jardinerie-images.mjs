/**
 * build-jardinerie-images.mjs
 * Convertit les 4 photos SITE de la jardinerie Les Terres Essentielles
 * (fournies par le fondateur — page Facebook, droits accordés 2026-06-12)
 * en WebP multi-tailles vers public/images/jardinerie/.
 *
 * IMPORTANT : ces photos montrent la JARDINERIE (point de vente, serres,
 * présentoirs) — PAS des réalisations paysagères. Elles ne sont utilisées
 * QUE là où c'est honnête (ambiance jardinerie/pépinière).
 *
 * Source : templates/ (JPG originaux fournis, formats carré 1440² ou
 * portrait 1536×2048). Sorties par photo : -1280w / -800w / -400w, WebP q80.
 *
 * sharp est installé en --no-save (outil de build ponctuel, jamais requis au
 * runtime — le site est en export statique avec images.unoptimized).
 *
 * Lancer : node scripts/build-jardinerie-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';

const SRC = new URL('../templates/', import.meta.url).pathname;
const OUT = new URL('../public/images/jardinerie/', import.meta.url).pathname;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// Mapping fichier source (templates/) → nom de sortie descriptif et FACTUEL.
// Aucune réalisation paysagère ici : uniquement le point de vente.
const MAP = [
  ['572900163_1431130772352390_8880604338828498838_n.jpg', 'jardinerie-serre-chrysanthemes'],
  ['710469904_1624157183049747_3572731399164516117_n.jpg', 'jardinerie-presentoir-exterieur'],
  ['710755934_1624157153049750_7121710088515628160_n.jpg', 'jardinerie-allee-pepiniere'],
  ['710098588_1624157193049746_6174973259668083539_n.jpg', 'jardinerie-cagette-lauriers-orgeval'],
];

const SIZES = [
  { suffix: '1280w', width: 1280 },
  { suffix: '800w', width: 800 },
  { suffix: '400w', width: 400 },
];

let count = 0;
for (const [src, name] of MAP) {
  for (const { suffix, width } of SIZES) {
    const dest = `${OUT}${name}-${suffix}.webp`;
    await sharp(`${SRC}${src}`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);
    count += 1;
  }
  console.log(`OK ${name} (3 tailles)`);
}
console.log(`\n${count} fichiers WebP générés dans ${OUT}`);
