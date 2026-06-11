import { describe, it, expect } from 'vitest';
import {
  validateField,
  validateAll,
  normalizePhone,
  EMAIL_REGEX,
  PHONE_REGEX,
  DESCRIPTION_MIN,
  DESCRIPTION_MAX,
  ERROR_MESSAGES,
  type ContactFormValues,
} from '@/lib/contact-validation';

/**
 * Validation CLIENT du formulaire (F-08, US-08 #4/#5).
 * Wording = source de vérité ux-writing-guide §2 — on assert les messages EXACTS.
 */

const valid: ContactFormValues = {
  prenom_nom: 'Alexandre Dupont',
  email: 'alexandre@domaine.fr',
  telephone: '',
  type_projet: [],
  commune: 'Le Vésinet',
  budget_tranche: '',
  description: 'Je souhaite une piscine à débordement et un jardin paysagé.',
};

function withField(over: Partial<ContactFormValues>): ContactFormValues {
  return { ...valid, ...over };
}

describe('normalizePhone', () => {
  it('retire espaces, points et tirets', () => {
    expect(normalizePhone('06 12.34-56 78')).toBe('0612345678');
  });
});

describe('regex', () => {
  it.each([
    ['alexandre@domaine.fr', true],
    ['a@b.co', true],
    ['alexandre.test', false],
    ['alexandre@domaine', false],
    ['@domaine.fr', false],
    ['espace dans@mail.fr', false],
    ['', false],
  ])('EMAIL_REGEX(%s) = %s', (input, ok) => {
    expect(EMAIL_REGEX.test(input)).toBe(ok);
  });

  it.each([
    ['0612345678', true],
    ['0130422600', true],
    ['0012345678', false], // 0 puis 0
    ['612345678', false], // pas de 0 initial
    ['06123456789', false], // 11 chiffres
    ['061234567', false], // 9 chiffres
  ])('PHONE_REGEX(%s) = %s', (input, ok) => {
    expect(PHONE_REGEX.test(input)).toBe(ok);
  });
});

describe('validateField — prenom_nom', () => {
  it('rejette < 2 caractères avec wording exact', () => {
    expect(validateField('prenom_nom', withField({ prenom_nom: 'A' }))).toBe(
      ERROR_MESSAGES.prenom_nom,
    );
  });
  it('rejette vide / espaces', () => {
    expect(validateField('prenom_nom', withField({ prenom_nom: '   ' }))).toBe(
      ERROR_MESSAGES.prenom_nom,
    );
  });
  it('accepte un nom valide', () => {
    expect(validateField('prenom_nom', valid)).toBeUndefined();
  });
  it('accepte accents et caractères composés (donnée adversariale)', () => {
    expect(
      validateField('prenom_nom', withField({ prenom_nom: "Anaïs Müller-O'Connor" })),
    ).toBeUndefined();
  });
});

describe('validateField — email', () => {
  it('vide → message email_empty', () => {
    expect(validateField('email', withField({ email: '' }))).toBe(
      ERROR_MESSAGES.email_empty,
    );
  });
  it('mal formaté → message email_invalid (US-08 #4)', () => {
    expect(validateField('email', withField({ email: 'alexandre.test' }))).toBe(
      ERROR_MESSAGES.email_invalid,
    );
  });
  it('email +tag valide (donnée adversariale)', () => {
    expect(
      validateField('email', withField({ email: 'alex+devis@domaine.fr' })),
    ).toBeUndefined();
  });
});

describe('validateField — telephone (optionnel)', () => {
  it('vide → pas d’erreur', () => {
    expect(validateField('telephone', withField({ telephone: '' }))).toBeUndefined();
  });
  it('formaté avec séparateurs → valide après normalisation', () => {
    expect(
      validateField('telephone', withField({ telephone: '06 12 34 56 78' })),
    ).toBeUndefined();
  });
  it('invalide → message telephone_invalid', () => {
    expect(validateField('telephone', withField({ telephone: '12345' }))).toBe(
      ERROR_MESSAGES.telephone_invalid,
    );
  });
});

describe('validateField — commune', () => {
  it('vide → message commune', () => {
    expect(validateField('commune', withField({ commune: '' }))).toBe(
      ERROR_MESSAGES.commune,
    );
  });
  it('accepte une commune avec tiret/apostrophe', () => {
    expect(
      validateField('commune', withField({ commune: 'Saint-Nom-la-Bretèche' })),
    ).toBeUndefined();
  });
});

describe('validateField — description (bornes US-08 #5)', () => {
  it('19 chars → message description', () => {
    expect(
      validateField('description', withField({ description: 'a'.repeat(19) })),
    ).toBe(ERROR_MESSAGES.description);
  });
  it(`${DESCRIPTION_MIN} chars → OK (borne basse incluse)`, () => {
    expect(
      validateField('description', withField({ description: 'a'.repeat(DESCRIPTION_MIN) })),
    ).toBeUndefined();
  });
  it(`${DESCRIPTION_MAX} chars → OK (borne haute incluse)`, () => {
    expect(
      validateField('description', withField({ description: 'a'.repeat(DESCRIPTION_MAX) })),
    ).toBeUndefined();
  });
  it(`${DESCRIPTION_MAX + 1} chars → message description_long`, () => {
    expect(
      validateField('description', withField({ description: 'a'.repeat(DESCRIPTION_MAX + 1) })),
    ).toBe(ERROR_MESSAGES.description_long);
  });
  it('emojis et < > comptent dans la longueur (donnée adversariale)', () => {
    const desc = '<script>😀 projet piscine & jardin pour ma propriété</script>';
    expect(desc.length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
    expect(validateField('description', withField({ description: desc }))).toBeUndefined();
  });
});

describe('validateAll', () => {
  it('formulaire complet valide → aucune erreur', () => {
    expect(validateAll(valid)).toEqual({});
  });
  it('plusieurs champs invalides → map d’erreurs ciblée', () => {
    const errors = validateAll(
      withField({ prenom_nom: '', email: 'x', description: 'court' }),
    );
    expect(errors.prenom_nom).toBe(ERROR_MESSAGES.prenom_nom);
    expect(errors.email).toBe(ERROR_MESSAGES.email_invalid);
    expect(errors.description).toBe(ERROR_MESSAGES.description);
    expect(errors.commune).toBeUndefined(); // commune valide → absente
  });
});
