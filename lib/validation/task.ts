import { combineDateAndTime } from "@/lib/format/date";
import type { TaskStatus } from "@/lib/types/task";

export interface TaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;
  dueAt: string | null;
}

export interface TaskFormErrors {
  title?: string;
  categoryId?: string;
  dueAt?: string;
}

export function parseTaskFormData(formData: FormData): TaskInput {
  const status = formData.get("status");
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const dueTime = String(formData.get("dueTime") ?? "").trim();

  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    status:
      status === "todo" || status === "in_progress" || status === "done"
        ? status
        : "todo",
    categoryId: String(formData.get("categoryId") ?? ""),
    dueAt:
      dueDate || dueTime ? combineDateAndTime(dueDate, dueTime) : null,
  };
}

export function validateTaskInput(input: TaskInput): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!input.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!input.categoryId) {
    errors.categoryId = "Category is required.";
  }

  return errors;
}

/** Validates form fields including incomplete due date/time pairs. */
export function validateTaskFormData(formData: FormData): TaskFormErrors {
  const input = parseTaskFormData(formData);
  const errors = validateTaskInput(input);
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const dueTime = String(formData.get("dueTime") ?? "").trim();

  if ((dueDate && !dueTime) || (!dueDate && dueTime)) {
    errors.dueAt = "Set both a due date and a due time.";
  } else if ((dueDate || dueTime) && input.dueAt === null) {
    errors.dueAt = "Pick a valid due date and time.";
  }

  return errors;
}

export function hasValidationErrors(errors: TaskFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
