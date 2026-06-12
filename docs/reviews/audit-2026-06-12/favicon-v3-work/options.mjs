/**
 * favicon-v3 — générateur des 3 options + rendus de jugement.
 * Travail temporaire (docs/), NE TOUCHE PAS public/.
 * Le « A » est un tracé serif (DM Serif Display-like) substituable : id="glyphA".
 */
import sharp from 'sharp';

const OUT = new URL('./', import.meta.url).pathname;

// --- Tokens DA "Rive privée" ---
const SAND = '#F5F0E8';
const BRUN = '#1A1510';
const EAU = '#3A6675';
const OR = '#C4924A';

/**
 * Tracé "A" serif Didone (contraste plein/délié, empattements dalle, apex net).
 * Dessiné dans une boîte 64x64, centré, hauteur de capitale ~46u.
 * Conçu pour rester lisible une fois réduit à 16px.
 *
 *  - jambage gauche fin (délié), jambage droit épais (plein)
 *  - empattements (pieds) en dalle bracketée légère
 *  - barre transversale fine, placée bas (signature Didone)
 *  - apex pointu
 */
function glyphA(fill) {
  // "A" Didone v2 : apex pointu, jambage droit (plein) plus épais que le gauche
  // (délié), empattements en dalle fine bracketée, barre transversale fine
  // remontée pour ouvrir le compteur (lisibilité 16px). evenodd pour le compteur.
  return `<path fill="${fill}" fill-rule="evenodd" d="
    M 31.4 8
    L 39.2 8
    L 51.6 51
    L 58 51
    L 58 55.4
    L 38.2 55.4
    L 38.2 51
    L 43.6 51
    L 41.0 41.4
    L 24.6 41.4
    L 22.0 51
    L 28 51
    L 28 55.4
    L 9.4 55.4
    L 9.4 51
    L 14.9 51
    L 26.9 8
    Z
    M 33.0 15.6
    L 25.8 36.6
    L 39.8 36.6
    Z
  "/>`;
}

// Close-up isolé pour juger la finesse du tracé.
async function glyphCloseups() {
  const sizes = [16, 24, 32];
  const cell = 52, gap = 6;
  const variants = [
    { bg: SAND, fg: BRUN },
    { bg: EAU, fg: SAND },
    { bg: BRUN, fg: SAND },
  ];
  const cells = [];
  for (const v of variants) for (const sz of sizes) {
    const svg = svgWrap(sz, tile({ size: sz, bg: v.bg, radius: sz * 0.22 }) + glyphGroup(v.fg, sz, sz * 0.13));
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    cells.push(await sharp({ create: { width: cell, height: cell, channels: 4, background: '#DDDAD4' } })
      .composite([{ input: png, left: Math.round((cell - sz) / 2), top: Math.round((cell - sz) / 2) }]).png().toBuffer());
  }
  const cols = sizes.length;
  const w = cols * cell + (cols + 1) * gap;
  const h = variants.length * cell + (variants.length + 1) * gap;
  const comps = cells.map((b, i) => ({ input: b, left: gap + (i % cols) * (cell + gap), top: gap + Math.floor(i / cols) * (cell + gap) }));
  await sharp({ create: { width: w, height: h, channels: 4, background: '#FFFFFF' } }).composite(comps).png().toFile(`${OUT}closeup.png`);
  console.log('OK closeup.png');
}

// Variante "A" inversé (fill clair) — même tracé, couleur paramétrée.

function tile({ size, bg, radius, stroke, strokeColor, strokeW }) {
  const r = radius;
  const inset = strokeW ? strokeW / 2 : 0;
  return `<rect x="${inset}" y="${inset}" width="${size - 2 * inset}" height="${size - 2 * inset}" rx="${r}" ry="${r}" fill="${bg}"${stroke ? ` stroke="${strokeColor}" stroke-width="${strokeW}"` : ''}/>`;
}

// scale du glyphe (boîte 64) à l'intérieur d'une tuile de `size`, avec padding
function glyphGroup(fill, size, pad) {
  const s = (size - 2 * pad) / 64;
  return `<g transform="translate(${pad},${pad}) scale(${s})">${glyphA(fill)}</g>`;
}

function svgWrap(size, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${inner}</svg>`;
}

// --- 3 OPTIONS (boîte de référence 64) ---

// (a) "A" serif brun sur tuile sand arrondie, filet or fin
function optionA(size) {
  const r = size * 0.22;
  const sw = Math.max(size * 0.022, 0.8);
  return svgWrap(
    size,
    tile({ size, bg: SAND, radius: r, stroke: true, strokeColor: OR, strokeW: sw }) +
      glyphGroup(BRUN, size, size * 0.13),
  );
}

// (b) Médaillon/sceau : A sand dans cercle filé or sur fond brun (tuile brun arrondie)
function optionB(size) {
  const r = size * 0.22;
  const cx = size / 2;
  const ring = size * 0.40;
  const sw = Math.max(size * 0.018, 0.7);
  return svgWrap(
    size,
    tile({ size, bg: BRUN, radius: r }) +
      `<circle cx="${cx}" cy="${cx}" r="${ring}" fill="none" stroke="${OR}" stroke-width="${sw}"/>` +
      glyphGroup(SAND, size, size * 0.17),
  );
}

// (c) Monogramme inversé : A sand sur tuile eau arrondie, filet or
function optionC(size) {
  const r = size * 0.22;
  const sw = Math.max(size * 0.022, 0.8);
  return svgWrap(
    size,
    tile({ size, bg: EAU, radius: r, stroke: true, strokeColor: OR, strokeW: sw }) +
      glyphGroup(SAND, size, size * 0.13),
  );
}

const OPTIONS = { a: optionA, b: optionB, c: optionC };
const SIZES = [16, 32, 48];

// fonds de barre d'onglet simulés
const TABBAR_LIGHT = '#E8E6E1';
const TABBAR_DARK = '#202124';

async function renderCell(svg, size, bgBar) {
  // tuile centrée sur une vignette 72px représentant la barre d'onglet
  const cell = 72;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return sharp({
    create: { width: cell, height: cell, channels: 4, background: bgBar },
  })
    .composite([{ input: png, left: Math.round((cell - size) / 2), top: Math.round((cell - size) / 2) }])
    .png()
    .toBuffer();
}

// Compose une ligne : [16 clair][32 clair][48 clair] | [16 sombre][32 sombre][48 sombre]
async function optionStrip(key) {
  const fn = OPTIONS[key];
  const cells = [];
  for (const bar of [TABBAR_LIGHT, TABBAR_DARK]) {
    for (const sz of SIZES) {
      cells.push(await renderCell(fn(sz), sz, bar));
    }
  }
  const cell = 72;
  const gap = 8;
  const width = cells.length * cell + (cells.length + 1) * gap + 40; // +40 séparateur clair/sombre
  const comps = [];
  let x = gap;
  cells.forEach((buf, i) => {
    if (i === 3) x += 40; // séparateur entre clair et sombre
    comps.push({ input: buf, left: x, top: gap });
    x += cell + gap;
  });
  const strip = await sharp({
    create: { width, height: cell + 2 * gap, channels: 4, background: '#FFFFFF' },
  })
    .composite(comps)
    .png()
    .toBuffer();
  await sharp(strip).toFile(`${OUT}strip-${key}.png`);
  console.log(`OK strip-${key}.png`);
  return strip;
}

// Composite final : 3 bandes empilées + écrit aussi les SVG sources
import { writeFileSync } from 'fs';
for (const key of Object.keys(OPTIONS)) {
  writeFileSync(`${OUT}option-${key}.svg`, OPTIONS[key](64));
}

await glyphCloseups();

const strips = [];
for (const key of Object.keys(OPTIONS)) strips.push(await optionStrip(key));

// empile les 3 strips
const sMeta = await sharp(strips[0]).metadata();
const stripH = sMeta.height;
const stripW = sMeta.width;
const labelH = 22;
const totalH = strips.length * (stripH + labelH) + 10;
const labels = strips
  .map((_, i) => {
    const y = 6 + i * (stripH + labelH) + (stripH + labelH) - 6;
    const name = ['(a) A serif brun / tuile sand + filet or', '(b) Medaillon A sand / cercle or / fond brun', '(c) A sand inverse / tuile eau + filet or'][i];
    return `<text x="10" y="${6 + i * (stripH + labelH) + 16}" font-family="Arial" font-size="13" fill="#1A1510" font-weight="bold">${name}</text>`;
  })
  .join('');
const header = `<text x="${stripW / 2 - 60}" y="0" font-family="Arial" font-size="11" fill="#7E7468"></text>`;
const labelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${stripW}" height="${totalH}">${labels}</svg>`;
const comp = strips.map((buf, i) => ({ input: buf, left: 0, top: 6 + i * (stripH + labelH) + labelH }));
await sharp({ create: { width: stripW, height: totalH, channels: 4, background: '#FFFFFF' } })
  .composite([{ input: Buffer.from(labelSvg), left: 0, top: 0 }, ...comp])
  .png()
  .toFile(`${OUT}composite.png`);
console.log('OK composite.png', stripW, totalH);
