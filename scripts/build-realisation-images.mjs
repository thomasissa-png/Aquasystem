/**
 * build-realisation-images.mjs
 * Convertit les photos sources (réalisations réelles Aqua System, téléchargées
 * depuis esprit-piscine.fr/aqua-system) en WebP multi-tailles vers
 * public/images/realisations/.
 *
 * Source : /tmp/aqua-dl/orig (1280x720 JPEG, 16:9).
 * Sorties par photo : -1280w (hero), -800w (card), -400w (thumb), toutes WebP.
 *
 * sharp est installé en --no-save (outil de build ponctuel, jamais requis au
 * runtime — le site est en export statique avec images.unoptimized).
 *
 * Lancer : node scripts/build-realisation-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';

const SRC = '/tmp/aqua-dl/orig';
const OUT = new URL('../public/images/realisations/', import.meta.url).pathname;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// Mapping fichier source → nom de sortie descriptif (déduit de la photo).
// Aucune commune inventée : noms génériques basés sur le TYPE de bassin observé.
const MAP = [
  ['construire-piscine-a-debordement.jpg', 'piscine-debordement-foret'],
  ['piscine-exterieure-a-debordement-sur-le-jardin-aqua-system-solutions-78.jpg', 'projet-piscine-jardin-banquette'],
  ['092.jpg', 'piscine-couloir-demeure-ancienne'],
  ['aqua-syste-freneuse-yvelines-2025-01.jpg', 'piscine-paroi-verre-travertin'],
  ['construire-piscine-paroi-en-verre-transparente.jpg', 'piscine-paroi-verre-pierre'],
  ['aquasystem-piscine-freneuse-photofredpieau-2017.jpg', 'piscine-jardin-arbre'],
  ['022.jpg', 'piscine-terrasse-bois-plongee'],
  ['042.jpg', 'piscine-enterree-maison-brique'],
  ['102.jpg', 'projet-bassin-jardin-paysage'],
  ['l-esprit-piscine_Aqua-system-solutions-78_Architecte-Jonny-Sturari-SKP-Architecture_Photo-Philippe-Leroy_GIR49.jpg', 'projet-pool-house-toit-vegetalise'],
  ['052.jpg', 'piscine-interieure-beton-baies'],
  ['aqua-system-freneuse-yvelines-78-01.jpg', 'piscine-interieure-pierre-poutres'],
  ['072.jpg', 'piscine-interieure-veranda-soir'],
  ['082.jpg', 'jardin-bassin-maison-bois'],
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
    await sharp(`${SRC}/${src}`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);
    count += 1;
  }
  console.log(`OK ${name} (3 tailles)`);
}
console.log(`\n${count} fichiers WebP générés dans ${OUT}`);
