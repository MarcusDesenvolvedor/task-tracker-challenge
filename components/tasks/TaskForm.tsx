"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FormAlert } from "@/components/ui/FormAlert";
import { FormField, formInputClassName } from "@/components/ui/FormField";
import { TASK_STATUS_LABELS, TASK_STATUS_OPTIONS } from "@/lib/constants/task";
import type { TaskActionState } from "@/lib/actions/tasks";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import {
  hasValidationErrors,
  parseTaskFormData,
  type TaskFormErrors,
  validateTaskInput,
} from "@/lib/validation/task";

interface TaskFormProps {
  task?: Task;
  categories: Category[];
  action: (
    prevState: TaskActionState,
    formData: FormData,
  ) => Promise<TaskActionState>;
  submitLabel: string;
  cancelHref?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const initialState: TaskActionState = {};

export function TaskForm({
  task,
  categories,
  action,
  submitLabel,
  cancelHref,
  onCancel,
  onSuccess,
}: TaskFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [clientErrors, setClientErrors] = useState<TaskFormErrors>({});
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
    const input = parseTaskFormData(formData);
    const errors = validateTaskInput(input);
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
      <FormField label="Title" htmlFor="title" error={errors.title} required>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={task?.title ?? ""}
          required
          autoFocus={!task}
          className={formInputClassName(Boolean(errors.title))}
        />
      </FormField>

      <FormField
        label="Description"
        htmlFor="description"
        hint="Optional. Add context or notes for this task."
      >
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={task?.description ?? ""}
          className={formInputClassName(false)}
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Status" htmlFor="status">
          <select
            id="status"
            name="status"
            defaultValue={task?.status ?? "todo"}
            className={formInputClassName(false)}
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {TASK_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Category"
          htmlFor="categoryId"
          error={errors.categoryId}
          required
        >
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={task?.categoryId ?? ""}
            required
            className={formInputClassName(Boolean(errors.categoryId))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

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
