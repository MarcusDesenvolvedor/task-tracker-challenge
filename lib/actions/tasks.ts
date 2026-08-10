"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTask,
  deleteTask,
  TaskNotFoundError,
  TaskValidationError,
  updateTask,
} from "@/lib/services/tasks";
import {
  hasValidationErrors,
  parseTaskFormData,
  type TaskFormErrors,
  validateTaskInput,
} from "@/lib/validation/task";

export interface TaskActionState {
  errors?: TaskFormErrors;
  message?: string;
}

export async function createTaskAction(
  _prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const input = parseTaskFormData(formData);
  const errors = validateTaskInput(input);

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  let task;

  try {
    task = createTask(input);
  } catch (error) {
    if (error instanceof TaskValidationError) {
      return { errors: error.errors };
    }

    return { message: "Unable to create task. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect(`/tasks/${task.id}`);
}

export async function updateTaskAction(
  taskId: string,
  _prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const input = parseTaskFormData(formData);
  const errors = validateTaskInput(input);

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  try {
    updateTask(taskId, input);
  } catch (error) {
    if (error instanceof TaskValidationError) {
      return { errors: error.errors };
    }

    if (error instanceof TaskNotFoundError) {
      return { message: "This task no longer exists." };
    }

    return { message: "Unable to update task. Please try again." };
  }

  revalidatePath("/", "layout");
  revalidatePath(`/tasks/${taskId}`);
  return {};
}

export async function deleteTaskAction(taskId: string): Promise<void> {
  try {
    deleteTask(taskId);
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      redirect("/");
    }

    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
