import { describe, expect, it } from 'vitest';
import { frTypo } from '@/lib/typography';

const NBSP = '\u00A0';

/**
 * D-44 — aucune ligne ne doit commencer par une ponctuation (retour fondateur).
 * frTypo pose des insécables U+00A0 devant : ; ! ? » et après «.
 */
describe('frTypo', () => {
  it("remplace l'espace devant la ponctuation double par un insécable", () => {
    expect(frTypo('Fond mobile : la piscine')).toBe(
      `Fond mobile${NBSP}: la piscine`,
    );
    expect(frTypo('Pourquoi ?')).toBe(`Pourquoi${NBSP}?`);
    expect(frTypo('Attention !')).toBe(`Attention${NBSP}!`);
    expect(frTypo('a ; b')).toBe(`a${NBSP}; b`);
  });

  it('traite les guillemets français des deux côtés', () => {
    expect(frTypo('« mot »')).toBe(`«${NBSP}mot${NBSP}»`);
  });

  it('ne touche pas aux ponctuations déjà collées ou simples', () => {
    expect(frTypo('Prix, structure, finitions.')).toBe(
      'Prix, structure, finitions.',
    );
    expect(frTypo('a: b')).toBe('a: b');
  });

  it("est idempotente (un insécable existant n'est pas doublé)", () => {
    const once = frTypo('Titre : exemple');
    expect(frTypo(once)).toBe(once);
    expect(once).toBe(`Titre${NBSP}: exemple`);
  });
});
