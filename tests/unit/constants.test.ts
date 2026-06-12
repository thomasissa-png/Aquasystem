import { describe, it, expect } from 'vitest';
import {
  NAV_LINKS,
  PROJECT_CHIPS,
  SOURCE_TO_CHIP,
  BUDGET_OPTIONS,
  CTA_LABEL,
  SITE_TAGLINE,
} from '@/lib/constants';

/**
 * Cohérence des constantes formulaire (F-08) et navigation (F-10, arbitrage P0-5).
 * Garde-fou contre une désynchronisation chip front ↔ enum serveur.
 */

// Enums serveur (functions/api/contact.ts) — répliqués ici comme contrat attendu.
const SERVER_TYPE_ENUM = [
  'piscine_bien_etre',
  'jardin_paysage',
  'projet_complet',
  'prescripteur',
];
const SERVER_BUDGET_ENUM = ['50_80k', '80_150k', '150k_plus', 'prefere_discuter'];

describe('navigation (arbitrage P0-5 + refonte IA D-25)', () => {
  // Refonte IA 2026-06-12 : « Notre approche » fusionnée dans « La maison »,
  // « Architectes » sortie du menu (page /prescripteurs conservée, accès footer).
  // Nav grand public : 4 liens + le CTA « Parlez-nous de votre projet » (séparé)
  // = 5 éléments visibles (brief : 6→5).
  it('expose exactement 4 liens dans l’ordre Réalisations en premier', () => {
    expect(NAV_LINKS.map((l) => l.label)).toEqual([
      'Réalisations',
      'Piscines & Bien-être',
      'Jardins & Paysage',
      'La maison',
    ]);
  });
  it('Réalisations pointe vers /realisations ; ni « Notre approche » ni « Architectes » dans la nav', () => {
    expect(NAV_LINKS[0]?.href).toBe('/realisations');
    expect(NAV_LINKS.find((l) => l.label === 'Notre approche')).toBeUndefined();
    expect(NAV_LINKS.find((l) => l.label === 'Architectes')).toBeUndefined();
    expect(NAV_LINKS.find((l) => l.href === '/notre-approche')).toBeUndefined();
  });
});

describe('chips type_projet ⊆ enum serveur', () => {
  it('chaque valeur de chip est un membre de l’enum serveur', () => {
    for (const chip of PROJECT_CHIPS) {
      expect(SERVER_TYPE_ENUM).toContain(chip.value);
    }
  });
  it('couvre les 4 valeurs (chips optionnels arbitrage P0-2)', () => {
    expect(PROJECT_CHIPS.map((c) => c.value).sort()).toEqual(
      [...SERVER_TYPE_ENUM].sort(),
    );
  });
});

describe('SOURCE_TO_CHIP (smart defaults F-08)', () => {
  it('mappe les 4 sources vers un chip valide', () => {
    expect(SOURCE_TO_CHIP['piscines-bien-etre']).toBe('piscine_bien_etre');
    expect(SOURCE_TO_CHIP['jardins-paysage']).toBe('jardin_paysage');
    expect(SOURCE_TO_CHIP['projet-complet']).toBe('projet_complet');
    expect(SOURCE_TO_CHIP['prescripteurs']).toBe('prescripteur');
  });
  it('chaque chip cible est un membre de l’enum serveur', () => {
    for (const target of Object.values(SOURCE_TO_CHIP)) {
      expect(SERVER_TYPE_ENUM).toContain(target);
    }
  });
  it('source inconnue → undefined (ignorée silencieusement)', () => {
    expect(SOURCE_TO_CHIP['source-bidon']).toBeUndefined();
  });
});

describe('budget options = enum serveur', () => {
  it('les valeurs budget correspondent à l’enum serveur', () => {
    expect(BUDGET_OPTIONS.map((b) => b.value).sort()).toEqual(
      [...SERVER_BUDGET_ENUM].sort(),
    );
  });
});

describe('wording de marque', () => {
  it('CTA unique = "Parlez-nous de votre projet" (ux-writing §5)', () => {
    expect(CTA_LABEL).toBe('Parlez-nous de votre projet');
  });
  it('tagline = baseline validée fondateur', () => {
    expect(SITE_TAGLINE).toBe("L'extérieur à la hauteur de votre propriété");
  });
});
