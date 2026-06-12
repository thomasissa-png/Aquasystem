/**
 * build-hero-1920-images.mjs (ponctuel — heros nets palier 1920w, 2026-06-12, D-40)
 *
 * Contexte : les heros full-bleed étaient des WebP 1280×720 upscalés ~1,5× sur
 * desktop 1440-1920px → flou perçu (retour fondateur). Les sources esprit-piscine
 * plafonnaient à 1280px. Le fondateur a fourni les ORIGINAUX pro 1920px du site
 * aqua-system.fr (droits OK — c'est son site). On régénère les sets WebP avec un
 * palier 1920w EN PLUS, depuis l'original 1920, qualité 80.
 *
 * Source : /tmp/hero-hr/imgN.jpg (mapping ci-dessous → urls.txt ligne N).
 * Crédits photographes (extraits des noms de fichiers source) :
 *   - img42 (SAI07)   : Photo Philippe Leroy — demeure ancienne, bassin couloir (hero ACCUEIL, CAS A)
 *   - img17 (corn_spa): série « Spa Corniche » Aqua System — piscine intérieure spa (hero PISCINES, CAS B)
 *   - img41 (TOU32)   : Photo Philippe Leroy — maison bois + bassin jardin (hero JARDINS, CAS B)
 *   - img34 (GAU24)   : Photo Philippe Leroy — abords paysagés entretenus (slot ENTRETIEN F2, CAS B)
 *
 * CAS A (accueil) : MÊME visuel que le hero actuel `piscine-couloir-demeure-ancienne`
 *   trouvé en 1920 → on régénère le set SOUS LE MÊME NOM DE BASE (4 tailles), aucune
 *   perception changée, juste de la netteté.
 * CAS B (piscines + jardins) : pas de version 1920 du visuel exact actuel → nouveau
 *   set sous nom descriptif, alt/object-position revus côté pages.
 *
 * Lancer (racine projet) : node scripts/build-hero-1920-images.mjs
 */
import sharp from 'sharp';

const SRC_DIR = '/tmp/hero-hr/';
const ROOT = new URL('../', import.meta.url).pathname;
const OUT = `${ROOT}public/images/realisations/`;

// Qualité par taille : la 1920w est plafonnée à ≤ ~350 Ko/hero (contrainte perf).
// Les photos végétales (haute fréquence) gonflent en q80 → q66 sur la 1920w suffit
// (le palier 1920 ne sert qu'au desktop large, déjà très net à cette densité).
// Les tailles ≤1280 restent en q80 (qualité conservée sur mobile/tablet).
const SIZES = [
  { suffix: '1920w', width: 1920, quality: 66 },
  { suffix: '1280w', width: 1280, quality: 80 },
  { suffix: '800w', width: 800, quality: 80 },
  { suffix: '400w', width: 400, quality: 80 },
];

/**
 * mapping source 1920 → base name de sortie.
 * `name` = base utilisé par photoSrc()/toWidthVariant() dans le code.
 */
const HEROS = [
  // CAS A — hero accueil : même visuel, même base name (upgrade netteté seule).
  { src: 'img42.jpg', name: 'piscine-couloir-demeure-ancienne', hero: true },
  // CAS B — hero piscines : spa intérieur premium (transats + bassin), composition
  // horizontale, zone basse-gauche calme pour le H1.
  { src: 'img17.jpg', name: 'piscine-interieure-spa-transats', hero: true },
  // CAS B — hero jardins : même projet maison-bois que l'actuel mais cadrage frontal
  // HR (la version 1280 actuelle était un crop 3/4 différent → nom distinct, honnête).
  // crop169 : la source 4:3 (1920×1440) pèse > 450 Ko même à q52 (feuillage très
  // dense). Recadrée en 16:9 (ratio bandeau réellement affiché par le hero), le
  // poids tombe à ~366 Ko à q60 tout en améliorant la compo (maison+bassin centrés,
  // pelouse en bas pour le H1). Toutes les tailles sont croppées à l'identique →
  // ratio + object-position cohérents quel que soit le palier servi.
  { src: 'img41.jpg', name: 'jardin-bassin-maison-bois-paysage', hero: true, q1920: 60, crop169: true },
  // Slot ENTRETIEN F2 (VivantSection) : abords paysagés manifestement entretenus
  // (pelouse nette, massifs taillés, traverses bois) — illustre « l'entretien ».
  // Rendu en OuvrageCard (800w max) → PAS de palier 1920w (inutile, hero:false).
  { src: 'img34.jpg', name: 'jardin-paysage-abords-entretenus', hero: false },
];

let count = 0;
for (const { src, name, hero, q1920, crop169 } of HEROS) {
  // Pré-calcule la zone d'extraction 16:9 si demandé (même crop pour tous les paliers).
  let extract = null;
  if (crop169) {
    const m = await sharp(`${SRC_DIR}${src}`).metadata();
    const ch = Math.round(m.width * 9 / 16);
    extract = {
      left: 0,
      top: Math.max(0, Math.round((m.height - ch) / 2)),
      width: m.width,
      height: Math.min(ch, m.height),
    };
  }
  for (const { suffix, width, quality } of SIZES) {
    // Pas de 1920w pour les images non-hero (ex. slot entretien en OuvrageCard 800w).
    if (suffix === '1920w' && !hero) continue;
    const q = suffix === '1920w' && q1920 ? q1920 : quality;
    let pipe = sharp(`${SRC_DIR}${src}`);
    if (extract) {
      pipe = pipe.extract(extract).resize({ width, height: Math.round(width * 9 / 16), fit: 'cover' });
    } else {
      pipe = pipe.resize({ width, withoutEnlargement: true });
    }
    await pipe.webp({ quality: q }).toFile(`${OUT}${name}-${suffix}.webp`);
    count += 1;
  }
  console.log(`OK ${name} (${hero ? '4 WebP : 1920/1280/800/400' : '3 WebP : 1280/800/400'})`);
}

console.log(`\n${count} fichiers générés dans ${OUT}`);
