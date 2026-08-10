"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FormAlert } from "@/components/ui/FormAlert";
import { FormField, formInputClassName } from "@/components/ui/FormField";
import type { CategoryActionState } from "@/lib/actions/categories";
import { DEFAULT_CATEGORY_COLOR } from "@/lib/constants/category";
import type { Category } from "@/lib/types/category";
import {
  hasValidationErrors,
  parseCategoryFormData,
  type CategoryFormErrors,
  validateCategoryInput,
} from "@/lib/validation/category";
import { CategoryColorSelect } from "./CategoryColorSelect";

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
    <form action={handleSubmit} className="space-y-4">
      <FormField card label="Name" htmlFor="name" error={errors.name} required>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={category?.name ?? ""}
          required
          autoFocus={!category}
          placeholder="e.g. Work"
          className={formInputClassName(Boolean(errors.name))}
        />
      </FormField>

      <FormField
        card
        label="Color"
        htmlFor="color"
        error={errors.color}
        required
        hint="Pick one of the available colors."
      >
        <CategoryColorSelect
          defaultValue={category?.color ?? DEFAULT_CATEGORY_COLOR}
        />
      </FormField>

      {state.message ? <FormAlert>{state.message}</FormAlert> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center">
        {cancelHref ? (
          <ButtonLink href={cancelHref} variant="secondary">
            Cancel
          </ButtonLink>
        ) : onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isPending} className="px-6 sm:ml-auto">
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
