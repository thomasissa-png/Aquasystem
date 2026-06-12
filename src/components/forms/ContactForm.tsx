'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import {
  BUDGET_OPTIONS,
  BUDGET_PLACEHOLDER,
  CONTACT,
  CTA_LABEL,
  PROJECT_CHIPS,
  SOURCE_TO_CHIP,
  type BudgetTranche,
  type ProjectType,
} from '@/lib/constants';
import {
  validateAll,
  validateField,
  type ContactErrors,
  type ContactFieldName,
  type ContactFormValues,
} from '@/lib/contact-validation';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import {
  InputField,
  SelectField,
  TextareaField,
} from '@/components/ui/FormField';
import { NoticeRGPD } from './NoticeRGPD';

const EMPTY: ContactFormValues = {
  prenom_nom: '',
  email: '',
  telephone: '',
  type_projet: [],
  commune: '',
  budget_tranche: '',
  description: '',
};

/** page_source pour les events — slug court (tracking-plan §E-01). */
const PAGE_SOURCE = 'contact';

/** Timeout réseau côté client (F-08 : bascule erreur à 10s). */
const REQUEST_TIMEOUT_MS = 10_000;

function detectDevice(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs pour focus a11y (premier champ en erreur, bloc d'erreur serveur).
  const fieldRefs = useRef<
    Partial<Record<ContactFieldName, HTMLInputElement | HTMLTextAreaElement>>
  >({});
  const submitErrorRef = useRef<HTMLDivElement>(null);

  // Suivi du funnel : start déclenché, succès atteint, dernier champ touché.
  const startedRef = useRef(false);
  const succeededRef = useRef(false);
  const lastFieldRef = useRef<string>('prenom_nom');

  // Smart default depuis ?source= — lu APRÈS le montage via window.location
  // (PAS useSearchParams, qui force le bailout CSR et vide le <form> du HTML
  // statique en export — D-17). Le formulaire complet est ainsi pré-rendu.
  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get('source');
    if (!source) return;
    const chip = SOURCE_TO_CHIP[source];
    if (chip) {
      setValues((prev) =>
        prev.type_projet.includes(chip)
          ? prev
          : { ...prev, type_projet: [...prev.type_projet, chip] },
      );
    }
  }, []);

  // E-03 form_abandonment : start sans succès → beforeunload.
  useEffect(() => {
    function onBeforeUnload() {
      if (!startedRef.current || succeededRef.current) return;
      const filled = (
        ['prenom_nom', 'email', 'telephone', 'commune', 'description'] as const
      ).filter((k) => values[k].trim() !== '').length;
      trackEvent('form_abandonment', {
        derniere_etape: lastFieldRef.current,
        champs_remplis: filled + (values.type_projet.length > 0 ? 1 : 0),
        device_type: detectDevice(),
      });
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [values]);

  // E-02 form_start : premier focus sur le formulaire.
  const handleFirstFocus = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('form_start', {
      page_source: PAGE_SOURCE,
      device_type: detectDevice(),
    });
  }, []);

  function setField(name: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function toggleChip(value: ProjectType) {
    lastFieldRef.current = 'type_projet';
    setValues((prev) => ({
      ...prev,
      type_projet: prev.type_projet.includes(value)
        ? prev.type_projet.filter((v) => v !== value)
        : [...prev.type_projet, value],
    }));
  }

  function handleBlur(name: ContactFieldName) {
    lastFieldRef.current = name;
    const err = validateField(name, values);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    const firstError = (
      ['prenom_nom', 'email', 'telephone', 'commune', 'description'] as const
    ).find((k) => nextErrors[k]);
    if (firstError) {
      fieldRefs.current[firstError]?.focus();
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    // Payload conforme functional-specs.md v1.1 (champs absents si vides).
    const payload: Record<string, unknown> = {
      prenom_nom: values.prenom_nom.trim(),
      email: values.email.trim(),
      commune: values.commune.trim(),
      description: values.description.trim(),
      langue: 'fr',
      website: '', // honeypot — toujours vide côté client réel
      page_source: PAGE_SOURCE,
    };
    if (values.telephone.trim()) payload.telephone = values.telephone.trim();
    if (values.type_projet.length > 0) payload.type_projet = values.type_projet;
    if (values.budget_tranche) payload.budget_tranche = values.budget_tranche;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (res.ok) {
        succeededRef.current = true;
        emitSuccessEvent(values);
        // Redirect après E-01 (timing critique — voir dev-decisions).
        window.location.assign('/contact/merci/');
        return;
      }

      // 400 : erreurs de validation serveur → re-mapper sous les champs.
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as {
          fields?: Record<string, string>;
        } | null;
        if (data?.fields) {
          setErrors((prev) => ({ ...prev, ...data.fields }));
        } else {
          setSubmitError('generic');
        }
      } else {
        setSubmitError('generic');
      }
    } catch {
      // Abort (timeout) ou erreur réseau → état erreur, saisie préservée.
      setSubmitError('generic');
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  }

  // Focus le bloc d'erreur serveur quand il apparaît (a11y).
  useEffect(() => {
    if (submitError) submitErrorRef.current?.focus();
  }, [submitError]);

  return (
    <form
      noValidate
      action="/api/contact"
      method="POST"
      onSubmit={handleSubmit}
      onFocus={handleFirstFocus}
      className="flex flex-col gap-5"
    >
      {/* Champ caché langue (fallback form natif) */}
      <input type="hidden" name="langue" value="fr" />
      <input type="hidden" name="page_source" value={PAGE_SOURCE} />

      {/* Bloc erreur serveur / réseau */}
      {submitError && (
        <div
          ref={submitErrorRef}
          role="alert"
          tabIndex={-1}
          className="rounded-md border border-[var(--color-border-error)] bg-[var(--color-bg-error)]/50 p-4 text-sm text-foreground"
        >
          <p className="flex items-start gap-2 font-medium">
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            Votre message n&apos;a pas pu être envoyé — une erreur technique est
            survenue de notre côté.
          </p>
          <p className="mt-2">
            Vos informations sont conservées dans cette page. Vous pouvez
            réessayer dans quelques instants, ou nous contacter directement :
          </p>
          <p className="mt-2 font-medium">
            <a
              href={`mailto:${CONTACT.email}`}
              className="underline underline-offset-2"
            >
              {CONTACT.email}
            </a>
            {' · '}
            <a
              href={`tel:${CONTACT.phoneE164}`}
              className="underline underline-offset-2"
            >
              {CONTACT.phone}
            </a>
          </p>
        </div>
      )}

      <InputField
        ref={(el) => {
          if (el) fieldRefs.current.prenom_nom = el;
        }}
        id="prenom_nom"
        name="prenom_nom"
        type="text"
        label="Votre nom"
        placeholder="Prénom et nom"
        autoComplete="name"
        required
        maxLength={100}
        value={values.prenom_nom}
        onChange={(e) => setField('prenom_nom', e.target.value)}
        onBlur={() => handleBlur('prenom_nom')}
        error={errors.prenom_nom}
      />

      <InputField
        ref={(el) => {
          if (el) fieldRefs.current.email = el;
        }}
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="votre@email.com"
        autoComplete="email"
        required
        value={values.email}
        onChange={(e) => setField('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
      />

      <InputField
        ref={(el) => {
          if (el) fieldRefs.current.telephone = el;
        }}
        id="telephone"
        name="telephone"
        type="tel"
        label="Téléphone"
        placeholder="06 xx xx xx xx"
        autoComplete="tel"
        value={values.telephone}
        onChange={(e) => setField('telephone', e.target.value)}
        onBlur={() => handleBlur('telephone')}
        error={errors.telephone}
      />

      {/* Chips type de projet (optionnels) */}
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-foreground">
          Votre projet concerne :
        </legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_CHIPS.map((chip) => {
            const selected = values.type_projet.includes(chip.value);
            return (
              <span key={chip.value}>
                <Chip
                  label={chip.label}
                  selected={selected}
                  onToggle={() => toggleChip(chip.value)}
                />
                {/* Miroir caché pour le fallback form natif sans JS */}
                {selected && (
                  <input
                    type="hidden"
                    name="type_projet"
                    value={chip.value}
                  />
                )}
              </span>
            );
          })}
        </div>
      </fieldset>

      <InputField
        ref={(el) => {
          if (el) fieldRefs.current.commune = el;
        }}
        id="commune"
        name="commune"
        type="text"
        label="Commune"
        placeholder="Le Vésinet, Saint-Nom-la-Bretèche…"
        autoComplete="address-level2"
        required
        maxLength={100}
        value={values.commune}
        onChange={(e) => setField('commune', e.target.value)}
        onBlur={() => handleBlur('commune')}
        error={errors.commune}
      />

      <SelectField
        id="budget_tranche"
        name="budget_tranche"
        label="Budget envisagé"
        placeholder={BUDGET_PLACEHOLDER}
        options={BUDGET_OPTIONS}
        value={values.budget_tranche}
        onChange={(e) =>
          setField('budget_tranche', e.target.value as BudgetTranche | '')
        }
        onBlur={() => {
          lastFieldRef.current = 'budget';
        }}
      />

      <TextareaField
        ref={(el) => {
          if (el) fieldRefs.current.description = el;
        }}
        id="description"
        name="description"
        label="Décrivez-nous votre projet"
        placeholder="Ce que vous souhaitez créer, rénover ou transformer — en quelques mots ou en détail, comme vous préférez."
        required
        rows={4}
        maxLength={2000}
        value={values.description}
        onChange={(e) => setField('description', e.target.value)}
        onBlur={() => handleBlur('description')}
        error={errors.description}
      />

      {/* Honeypot — masqué par CSS, jamais type=hidden (dev-decisions D-06) */}
      <div className="honeypot-field" aria-hidden>
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <NoticeRGPD />

      <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
        {CTA_LABEL}
      </Button>
    </form>
  );
}

/** Émet E-01 form_submission_success — fail-silent, AVANT le redirect. */
function emitSuccessEvent(values: ContactFormValues) {
  let hasCrossSelling = false;
  try {
    hasCrossSelling =
      window.sessionStorage.getItem('has_cross_selling') === 'true';
  } catch {
    // sessionStorage indisponible → false (fail-silent)
  }

  trackEvent('form_submission_success', {
    type_projet:
      values.type_projet.length > 0 ? values.type_projet.join(',') : 'null',
    commune: values.commune.trim().toLowerCase().replace(/\s+/g, '_'),
    budget_renseigne: values.budget_tranche !== '',
    budget_tranche: values.budget_tranche || 'non_renseigne',
    has_description: values.description.trim().length >= 20,
    has_cross_selling: hasCrossSelling,
    page_source: PAGE_SOURCE,
  });
}
