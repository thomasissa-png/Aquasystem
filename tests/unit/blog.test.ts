import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  ARTICLES,
  ARTICLES_BY_DATE,
  getArticle,
  getRelatedArticles,
  formatArticleDate,
} from '@/content/blog';
import { photoSrc } from '@/content/realisations';

/**
 * Intégrité du manifeste blog « Notre regard » (blog-program.md §1).
 * - 6 articles publiés, slugs/dates uniques.
 * - Heros mappés sur des photos de réalisations RÉELLES présentes sur disque
 *   (pas de génération — brief LOT BLOG 2/2).
 * - Aucune citation [CITATION À VALIDER NB] ne fuit dans le corps rendu.
 * - Tri par date décroissante cohérent.
 */
const PUBLIC_DIR = fileURLToPath(new URL('../../public', import.meta.url));
const SIZES = ['400w', '800w', '1280w'] as const;

describe('intégrité structurelle', () => {
  it('expose 6 articles', () => {
    expect(ARTICLES).toHaveLength(6);
  });

  it('slugs uniques', () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('dates de publication uniques et au format ISO', () => {
    const dates = ARTICLES.map((a) => a.datePublished);
    expect(new Set(dates).size).toBe(dates.length);
    for (const d of dates) {
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('métadonnées présentes et titres sans cadratin', () => {
    for (const a of ARTICLES) {
      expect(a.title.length).toBeGreaterThan(0);
      expect(a.metaTitle.length).toBeGreaterThan(0);
      expect(a.metaDescription.length).toBeGreaterThan(0);
      expect(a.excerpt.length).toBeGreaterThan(0);
      // Zéro cadratin dans les <title> (brief LOT BLOG : « 0 — dans les titres »).
      expect(a.metaTitle).not.toContain('—');
    }
  });

  it('meta_description ≤ 160 caractères (marge SERP)', () => {
    for (const a of ARTICLES) {
      expect(a.metaDescription.length).toBeLessThanOrEqual(160);
    }
  });
});

describe('images hero (photos réalisations réelles)', () => {
  it('chaque hero existe en 400w/800w/1280w sur disque', () => {
    for (const a of ARTICLES) {
      for (const size of SIZES) {
        const rel = photoSrc(a.heroBase, size);
        const abs = `${PUBLIC_DIR}${rel}`;
        expect(existsSync(abs), `${a.slug} → ${rel} manquant`).toBe(true);
      }
    }
  });
});

describe('exclusion des citations non validées', () => {
  it('aucun corps ne contient « CITATION À VALIDER » ni « Regard de Nicolas Berg »', () => {
    for (const a of ARTICLES) {
      const text = a.body
        .map((b) => JSON.stringify(b))
        .join(' ');
      expect(text).not.toContain('CITATION À VALIDER');
      expect(text).not.toContain('Regard de Nicolas Berg');
    }
  });

  it('aucune formulation légale proscrite dans le corps (LTE)', () => {
    const proscrits = ['groupe', 'filiales', 'nos sociétés', 'même propriétaire'];
    for (const a of ARTICLES) {
      const text = a.body.map((b) => JSON.stringify(b)).join(' ').toLowerCase();
      for (const mot of proscrits) {
        expect(text, `${a.slug} contient « ${mot} »`).not.toContain(mot);
      }
    }
  });
});

describe('tri et helpers', () => {
  it('ARTICLES_BY_DATE est trié par date décroissante', () => {
    const dates = ARTICLES_BY_DATE.map((a) => a.datePublished);
    const sorted = [...dates].sort((x, y) => y.localeCompare(x));
    expect(dates).toEqual(sorted);
  });

  it('getArticle retrouve par slug et renvoie undefined sinon', () => {
    expect(getArticle(ARTICLES[0]!.slug)?.slug).toBe(ARTICLES[0]!.slug);
    expect(getArticle('slug-inexistant')).toBeUndefined();
  });

  it('getRelatedArticles renvoie 2 articles distincts de l’article courant', () => {
    const current = ARTICLES[0]!.slug;
    const related = getRelatedArticles(current, 2);
    expect(related).toHaveLength(2);
    expect(related.every((a) => a.slug !== current)).toBe(true);
  });

  it('formatArticleDate produit une date française', () => {
    expect(formatArticleDate('2026-06-12')).toBe('12 juin 2026');
  });
});
