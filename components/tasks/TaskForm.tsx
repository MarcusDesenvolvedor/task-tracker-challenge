"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
    <form action={handleSubmit} className="space-y-5">
      <Field label="Title" htmlFor="title" error={errors.title} required>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={task?.title ?? ""}
          required
          className={inputClassName(Boolean(errors.title))}
        />
      </Field>

      <Field label="Description" htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={task?.description ?? ""}
          className={inputClassName(false)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Status" htmlFor="status">
          <select
            id="status"
            name="status"
            defaultValue={task?.status ?? "todo"}
            className={inputClassName(false)}
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {TASK_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </Field>

        <Field
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
            className={inputClassName(Boolean(errors.categoryId))}
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
        </Field>
      </div>

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
