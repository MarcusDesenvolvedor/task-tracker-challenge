export function formInputClassName(hasError: boolean) {
  return `w-full rounded-lg border bg-surface-input px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:ring-2 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-900/40"
      : "border-border focus:border-border-strong focus:ring-border/80"
  }`;
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  /** Wraps the field in an elevated card, matching the task form layout. */
  card?: boolean;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  hint,
  card = false,
  children,
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={
        card ? "rounded-xl border border-border/80 bg-surface-elevated p-4 sm:p-5" : ""
      }
    >
      <label
        htmlFor={htmlFor}
        className="mb-3 block text-[11px] font-semibold uppercase tracking-wider text-muted"
      >
        {label}
        {required ? (
          <span className="text-red-400" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="mb-3 text-xs leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      <div aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
        {children}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
