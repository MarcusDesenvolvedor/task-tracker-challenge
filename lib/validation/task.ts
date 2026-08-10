import type { TaskStatus } from "@/lib/types/task";

export interface TaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;
}

export interface TaskFormErrors {
  title?: string;
  categoryId?: string;
}

export function parseTaskFormData(formData: FormData): TaskInput {
  const status = formData.get("status");

  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    status:
      status === "todo" || status === "in_progress" || status === "done"
        ? status
        : "todo",
    categoryId: String(formData.get("categoryId") ?? ""),
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

export function hasValidationErrors(errors: TaskFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
