import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  REALISATIONS,
  FEATURED_SLUGS,
  getRealisation,
  getFeatured,
  isDraft,
  photoSrc,
  type Realisation,
} from '@/content/realisations';

/**
 * Intégrité du manifeste réalisations (F-01 #9, F-05 #1/#9).
 * Règle anti-placeholder (CLAUDE.md n°2, project-context Notes) : alts UNIQUES,
 * jamais d'image identique labellée différemment. Photos présentes sur disque.
 */

const PUBLIC_DIR = fileURLToPath(new URL('../../public', import.meta.url));
const SIZES = ['400w', '800w', '1280w'] as const;

describe('intégrité structurelle', () => {
  it('au moins 8 réalisations (F-05 #1)', () => {
    expect(REALISATIONS.length).toBeGreaterThanOrEqual(8);
  });

  it('slugs uniques', () => {
    const slugs = REALISATIONS.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('slugs au format kebab-case', () => {
    for (const r of REALISATIONS) {
      expect(r.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('chaque réalisation a 1 à 3 photos', () => {
    for (const r of REALISATIONS) {
      expect(r.photos.length).toBeGreaterThanOrEqual(1);
      expect(r.photos.length).toBeLessThanOrEqual(3);
    }
  });

  it('cohérence type ↔ filters (le filtre porte le type principal)', () => {
    for (const r of REALISATIONS) {
      if (r.type === 'piscine_bien_etre') {
        expect(r.filters.some((f) => f === 'piscine' || f === 'spa_sauna')).toBe(true);
      }
      if (r.type === 'jardin_paysage') {
        expect(r.filters).toContain('jardin_parc');
      }
      if (r.type === 'projet_complet') {
        expect(r.filters).toContain('projet_complet');
      }
    }
  });
});

describe('règle anti-placeholder', () => {
  it('tous les alts de photos sont uniques (zéro doublon)', () => {
    const alts = REALISATIONS.flatMap((r) => r.photos.map((p) => p.alt));
    expect(new Set(alts).size).toBe(alts.length);
  });
  it('tous les `base` de photos sont uniques', () => {
    const bases = REALISATIONS.flatMap((r) => r.photos.map((p) => p.base));
    expect(new Set(bases).size).toBe(bases.length);
  });
  it('aucun alt vide', () => {
    for (const r of REALISATIONS) {
      for (const p of r.photos) {
        expect(p.alt.trim().length).toBeGreaterThan(10);
      }
    }
  });
});

describe('intégrité fichiers sur disque', () => {
  it('chaque photo existe en 3 tailles WebP dans public/', () => {
    const missing: string[] = [];
    for (const r of REALISATIONS) {
      for (const p of r.photos) {
        for (const size of SIZES) {
          const rel = photoSrc(p.base, size); // /images/realisations/...
          const abs = `${PUBLIC_DIR}${rel}`;
          if (!existsSync(abs)) missing.push(rel);
        }
      }
    }
    expect(missing, `Fichiers manquants : ${missing.join(', ')}`).toEqual([]);
  });
});

describe('helpers', () => {
  it('FEATURED_SLUGS (3, accueil F-01 #9) sont tous résolvables', () => {
    expect(FEATURED_SLUGS.length).toBe(3);
    for (const slug of FEATURED_SLUGS) {
      expect(getRealisation(slug)).toBeDefined();
    }
  });
  it('getFeatured retourne 3 réalisations de types variés', () => {
    const featured = getFeatured();
    expect(featured.length).toBe(3);
    expect(new Set(featured.map((r) => r.type)).size).toBeGreaterThanOrEqual(2);
  });
  it('getRealisation(slug inconnu) → undefined', () => {
    expect(getRealisation('nope')).toBeUndefined();
  });
  it('isDraft vrai tant que champs éditoriaux null', () => {
    const draft = REALISATIONS.find((r) => r.intention === null) as Realisation;
    expect(isDraft(draft)).toBe(true);
  });
  it('photoSrc construit le chemin attendu', () => {
    expect(photoSrc('demo', '800w')).toBe('/images/realisations/demo-800w.webp');
  });
});

describe('logique de filtrage (US-05)', () => {
  const FILTERS = ['piscine', 'spa_sauna', 'jardin_parc', 'projet_complet'] as const;

  it('chaque filtre exposé renvoie ≥ 1 résultat (invariant zéro-impasse)', () => {
    for (const f of FILTERS) {
      const n = REALISATIONS.filter((r) => r.filters.includes(f)).length;
      expect(n, `filtre ${f}`).toBeGreaterThanOrEqual(1);
    }
  });

  it('un filtre inexistant produirait un état vide (chemin empty-state valide)', () => {
    // @ts-expect-error valeur volontairement hors enum pour prouver le path vide
    const n = REALISATIONS.filter((r) => r.filters.includes('inexistant')).length;
    expect(n).toBe(0);
  });
});
