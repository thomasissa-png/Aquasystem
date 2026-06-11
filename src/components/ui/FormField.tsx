import { forwardRef, useId } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * FormField — design-system.md §14 (FormField 6 états).
 * Enveloppe label + champ + aide + erreur, gère l'association a11y
 * (label[for], aria-describedby, aria-invalid). Supporte <input>, <textarea>
 * et <select> via la prop `as`.
 *
 * États couverts : default, focus (CSS), filled/valid (neutre), error, disabled.
 * L'état « success » du formulaire global = remplacement par la page /merci
 * (géré au niveau ContactForm), pas ici.
 */
type BaseProps = {
  label: string;
  /** Texte d'aide sous le label (optionnel). */
  hint?: string;
  /** Message d'erreur — déclenche l'état error si défini. */
  error?: string;
  /** Champ obligatoire → astérisque visible + aria. */
  required?: boolean;
  /** Masque l'astérisque même si required (champ obligatoire sans marquage). */
  hideRequiredMark?: boolean;
  className?: string;
};

const FIELD_BASE =
  'w-full rounded-md border bg-[var(--color-background-tertiary)] px-4 text-base text-foreground placeholder:text-foreground-muted ' +
  'transition-colors duration-fast ' +
  'focus:border-action-primary focus:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:bg-background-secondary disabled:text-foreground-secondary';

function fieldClasses(hasError: boolean, extra: string): string {
  return cn(
    FIELD_BASE,
    hasError
      ? 'border-[var(--color-border-error)] bg-[var(--color-bg-error)]/40'
      : 'border-border',
    extra,
  );
}

type LabelRowProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  hideRequiredMark?: boolean;
  hint?: string;
  hintId: string;
};

function LabelRow({
  htmlFor,
  label,
  required,
  hideRequiredMark,
  hint,
  hintId,
}: LabelRowProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
        {required && !hideRequiredMark && (
          <span className="text-[var(--color-text-error)]" aria-hidden>
            {' '}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mb-2 text-sm text-foreground-secondary">
          {hint}
        </p>
      )}
    </>
  );
}

function ErrorRow({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1 text-xs text-[var(--color-text-error)]"
    >
      <AlertCircle aria-hidden className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

// --- Input ------------------------------------------------------------------
export type InputFieldProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { label, hint, error, required, hideRequiredMark, className, id, ...props },
    ref,
  ) {
    const reactId = useId();
    const fieldId = id ?? reactId;
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;
    const describedBy =
      [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
      undefined;

    return (
      <div className={className}>
        <LabelRow
          htmlFor={fieldId}
          label={label}
          required={required}
          hideRequiredMark={hideRequiredMark}
          hint={hint}
          hintId={hintId}
        />
        <input
          ref={ref}
          id={fieldId}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={fieldClasses(Boolean(error), 'h-11')}
          {...props}
        />
        {error && <ErrorRow id={errorId} message={error} />}
      </div>
    );
  },
);

// --- Textarea ---------------------------------------------------------------
export type TextareaFieldProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField(
  { label, hint, error, required, hideRequiredMark, className, id, ...props },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className={className}>
      <LabelRow
        htmlFor={fieldId}
        label={label}
        required={required}
        hideRequiredMark={hideRequiredMark}
        hint={hint}
        hintId={hintId}
      />
      <textarea
        ref={ref}
        id={fieldId}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={fieldClasses(
          Boolean(error),
          'min-h-[120px] resize-y py-3 leading-7',
        )}
        {...props}
      />
      {error && <ErrorRow id={errorId} message={error} />}
    </div>
  );
});

// --- Select -----------------------------------------------------------------
export type SelectFieldProps = BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: ReadonlyArray<{ value: string; label: string }>;
    placeholder?: string;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    {
      label,
      hint,
      error,
      required,
      hideRequiredMark,
      className,
      id,
      options,
      placeholder,
      ...props
    },
    ref,
  ) {
    const reactId = useId();
    const fieldId = id ?? reactId;
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;
    const describedBy =
      [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
      undefined;

    return (
      <div className={className}>
        <LabelRow
          htmlFor={fieldId}
          label={label}
          required={required}
          hideRequiredMark={hideRequiredMark}
          hint={hint}
          hintId={hintId}
        />
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            required={required}
            aria-required={required || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={fieldClasses(Boolean(error), 'h-11 appearance-none pr-10')}
            {...props}
          >
            <option value="" disabled={required}>
              {placeholder ?? '—'}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-secondary"
          />
        </div>
        {error && <ErrorRow id={errorId} message={error} />}
      </div>
    );
  },
);
