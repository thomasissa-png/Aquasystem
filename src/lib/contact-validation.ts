/**
 * Validation client du formulaire de contact (F-08).
 * Messages = wording EXACT de ux-writing-guide §2 (source de vérité).
 * Le serveur (functions/api/contact.ts) revalide tout — ne jamais faire
 * confiance à la seule validation client.
 */
import type { BudgetTranche, ProjectType } from './constants';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Téléphone FR après nettoyage des espaces/tirets/points. */
export const PHONE_REGEX = /^0[1-9][0-9]{8}$/;
export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 2000;

/** Messages d'erreur inline — wording exact ux-writing-guide §2. */
export const ERROR_MESSAGES = {
  prenom_nom: 'Votre nom nous permet de vous répondre personnellement.',
  email_empty: 'Nous avons besoin de votre email pour vous répondre.',
  email_invalid:
    "L'adresse email semble incorrecte — vérifiez le format (exemple : prenom@domaine.fr).",
  telephone_invalid:
    'Ce numéro ne semble pas valide — vérifiez ou laissez ce champ vide si vous préférez.',
  commune: 'Précisez votre commune pour que nous puissions répondre de façon pertinente.',
  description:
    'Décrivez votre projet en quelques mots — cela guidera notre premier échange.',
  description_long: 'Description trop longue (2000 caractères maximum).',
} as const;

export type ContactFieldName =
  | 'prenom_nom'
  | 'email'
  | 'telephone'
  | 'commune'
  | 'description';

export interface ContactFormValues {
  prenom_nom: string;
  email: string;
  telephone: string;
  type_projet: ProjectType[];
  commune: string;
  budget_tranche: BudgetTranche | '';
  description: string;
}

export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export function normalizePhone(raw: string): string {
  return raw.replace(/[\s.\-]/g, '');
}

/** Valide un champ unique (utilisé au blur et à la soumission). */
export function validateField(
  name: ContactFieldName,
  values: ContactFormValues,
): string | undefined {
  switch (name) {
    case 'prenom_nom':
      return values.prenom_nom.trim().length >= 2
        ? undefined
        : ERROR_MESSAGES.prenom_nom;
    case 'email': {
      const v = values.email.trim();
      if (v === '') return ERROR_MESSAGES.email_empty;
      return EMAIL_REGEX.test(v) ? undefined : ERROR_MESSAGES.email_invalid;
    }
    case 'telephone': {
      const v = values.telephone.trim();
      if (v === '') return undefined; // optionnel
      return PHONE_REGEX.test(normalizePhone(v))
        ? undefined
        : ERROR_MESSAGES.telephone_invalid;
    }
    case 'commune':
      return values.commune.trim().length > 0
        ? undefined
        : ERROR_MESSAGES.commune;
    case 'description': {
      const v = values.description.trim();
      if (v.length > DESCRIPTION_MAX) return ERROR_MESSAGES.description_long;
      return v.length >= DESCRIPTION_MIN ? undefined : ERROR_MESSAGES.description;
    }
    default:
      return undefined;
  }
}

/** Valide tous les champs requis — retourne la map d'erreurs (vide = OK). */
export function validateAll(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  (['prenom_nom', 'email', 'telephone', 'commune', 'description'] as const).forEach(
    (name) => {
      const err = validateField(name, values);
      if (err) errors[name] = err;
    },
  );
  return errors;
}
