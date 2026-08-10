"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CategorySelect } from "@/components/categories/CategorySelect";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FormAlert } from "@/components/ui/FormAlert";
import { FormField, formInputClassName } from "@/components/ui/FormField";
import type { TaskActionState } from "@/lib/actions/tasks";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import {
  hasValidationErrors,
  type TaskFormErrors,
  validateTaskFormData,
} from "@/lib/validation/task";
import { DueDatePicker } from "./DueDatePicker";
import { DueTimePicker } from "./DueTimePicker";
import { TaskStatusSelect } from "./TaskStatusSelect";

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
  formId?: string;
  /** Rendered before the submit label, for example a plus glyph on creation. */
  submitIcon?: React.ReactNode;
  /** Hide the bottom Cancel/Submit row when those actions live in the page header. */
  hideFooterActions?: boolean;
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
  formId = "task-form",
  submitIcon,
  hideFooterActions = false,
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
    const errors = validateTaskFormData(formData);
    setClientErrors(errors);

    if (hasValidationErrors(errors)) {
      return;
    }

    formAction(formData);
  }

  const errors = { ...clientErrors, ...state.errors };

  return (
    <form id={formId} action={handleSubmit} className="space-y-4">
      <FormField
        card
        label="Task title"
        htmlFor="title"
        error={errors.title}
        required
      >
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={task?.title ?? ""}
          required
          autoFocus={!task}
          placeholder="e.g. Prepare Q3 presentation"
          className={formInputClassName(Boolean(errors.title))}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField card label="Status" htmlFor="status">
          <TaskStatusSelect defaultValue={task?.status ?? "todo"} />
        </FormField>

        <FormField
          card
          label="Category"
          htmlFor="categoryId"
          error={errors.categoryId}
          required
        >
          <CategorySelect
            categories={categories}
            defaultValue={task?.categoryId ?? categories[0]?.id ?? ""}
            hasError={Boolean(errors.categoryId)}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          card
          label="Due date"
          htmlFor="dueDate"
          hint="Optional. Tap the calendar to pick a date."
          error={errors.dueAt}
        >
          <DueDatePicker
            defaultValue={task?.dueAt}
            hasError={Boolean(errors.dueAt)}
          />
        </FormField>

        <FormField
          card
          label="Due time"
          htmlFor="dueTime"
          hint="Optional. Tap the clock to pick a time."
        >
          <DueTimePicker
            defaultValue={task?.dueAt}
            hasError={Boolean(errors.dueAt)}
          />
        </FormField>
      </div>

      <FormField card label="Description" htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={task?.description ?? ""}
          placeholder="Add detailed notes, links, or sub-tasks here..."
          className={`${formInputClassName(false)} min-h-[140px] resize-y`}
        />
      </FormField>

      {state.message ? <FormAlert>{state.message}</FormAlert> : null}

      {hideFooterActions ? null : (
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
          <Button
            type="submit"
            disabled={isPending}
            className="gap-2 px-6 sm:ml-auto"
          >
            {isPending ? "Saving..." : (
              <>
                {submitIcon}
                {submitLabel}
              </>
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
