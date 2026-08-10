"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTask,
  deleteTask,
  TaskNotFoundError,
  TaskValidationError,
  updateTask,
  updateTaskStatus,
} from "@/lib/services/tasks";
import type { TaskStatus } from "@/lib/types/task";
import {
  hasValidationErrors,
  parseTaskFormData,
  type TaskFormErrors,
  validateTaskFormData,
} from "@/lib/validation/task";

export interface TaskStatusActionState {
  message?: string;
  status?: TaskStatus;
}

export interface TaskActionState {
  errors?: TaskFormErrors;
  message?: string;
}

export async function createTaskAction(
  _prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const errors = validateTaskFormData(formData);

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  const input = parseTaskFormData(formData);
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
  const errors = validateTaskFormData(formData);

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  const input = parseTaskFormData(formData);

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
  revalidatePath(`/tasks/${taskId}/edit`);
  redirect(`/tasks/${taskId}`);
}

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
): Promise<TaskStatusActionState> {
  try {
    const task = updateTaskStatus(taskId, status);
    revalidatePath("/", "layout");
    revalidatePath(`/tasks/${taskId}`);
    revalidatePath(`/tasks/${taskId}/edit`);
    return { status: task.status };
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return { message: "This task no longer exists." };
    }

    return { message: "Unable to update status. Please try again." };
  }
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
