export function formInputClassName(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
  }`;
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-400" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p
          id={hintId}
          className="mb-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400"
        >
          {hint}
        </p>
      ) : null}
      <div aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
        {children}
      </div>
      {error ? (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
