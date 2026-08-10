"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CategoryActionState } from "@/lib/actions/categories";
import type { Category } from "@/lib/types/category";
import {
  hasValidationErrors,
  parseCategoryFormData,
  type CategoryFormErrors,
  validateCategoryInput,
} from "@/lib/validation/category";

interface CategoryFormProps {
  category?: Category;
  action: (
    prevState: CategoryActionState,
    formData: FormData,
  ) => Promise<CategoryActionState>;
  submitLabel: string;
  cancelHref?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const initialState: CategoryActionState = {};
const DEFAULT_COLOR = "#3b82f6";

export function CategoryForm({
  category,
  action,
  submitLabel,
  cancelHref,
  onCancel,
  onSuccess,
}: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [clientErrors, setClientErrors] = useState<CategoryFormErrors>({});
  const [color, setColor] = useState(category?.color ?? DEFAULT_COLOR);
  const wasPending = useRef(false);

  useEffect(() => {
    if (isPending) {
      wasPending.current = true;
      return;
    }

    if (wasPending.current && !state.errors && !state.message) {
      onSuccess?.();
      wasPending.current = false;
    }
  }, [isPending, state.errors, state.message, onSuccess]);

  function handleSubmit(formData: FormData) {
    formData.set("color", color);

    const input = parseCategoryFormData(formData);
    const errors = validateCategoryInput(input);
    setClientErrors(errors);

    if (hasValidationErrors(errors)) {
      return;
    }

    formAction(formData);
  }

  const errors = { ...clientErrors, ...state.errors };

  return (
    <form action={handleSubmit} className="space-y-5">
      <Field label="Name" htmlFor="name" error={errors.name} required>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={category?.name ?? ""}
          required
          className={inputClassName(Boolean(errors.name))}
        />
      </Field>

      <Field label="Color" htmlFor="color-text" error={errors.color} required>
        <div className="flex items-center gap-3">
          <input
            id="color-picker"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="h-10 w-14 cursor-pointer rounded border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <input
            id="color-text"
            name="color"
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            pattern="^#[0-9A-Fa-f]{6}$"
            required
            className={inputClassName(Boolean(errors.color))}
          />
        </div>
      </Field>

      {state.message ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
        {cancelHref ? (
          <ButtonLink href={cancelHref} variant="secondary">
            Cancel
          </ButtonLink>
        ) : onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function inputClassName(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
  }`;
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, required, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-400"> *</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
