"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FormAlert } from "@/components/ui/FormAlert";
import { FormField, formInputClassName } from "@/components/ui/FormField";
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
    <form
      action={handleSubmit}
      className="space-y-6 rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <FormField label="Name" htmlFor="name" error={errors.name} required>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={category?.name ?? ""}
          required
          autoFocus={!category}
          className={formInputClassName(Boolean(errors.name))}
        />
      </FormField>

      <FormField
        label="Color"
        htmlFor="color-text"
        error={errors.color}
        required
        hint="Pick a color or enter a hex value (for example, #3b82f6)."
      >
        <div className="flex items-center gap-3">
          <input
            id="color-picker"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            aria-label="Color picker"
            className="h-11 w-14 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <input
            id="color-text"
            name="color"
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            pattern="^#[0-9A-Fa-f]{6}$"
            required
            className={formInputClassName(Boolean(errors.color))}
          />
        </div>
      </FormField>

      {state.message ? <FormAlert>{state.message}</FormAlert> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:items-center dark:border-zinc-800">
        {cancelHref ? (
          <ButtonLink href={cancelHref} variant="secondary">
            Cancel
          </ButtonLink>
        ) : onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isPending} className="sm:ml-auto">
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
