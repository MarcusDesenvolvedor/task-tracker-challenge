import { TASK_STATUS_OPTIONS } from "@/lib/constants/task";
import { getStore } from "@/lib/data/store";
import { getCategoryById } from "@/lib/services/categories";
import type { Task, TaskStatus } from "@/lib/types/task";
import {
  hasValidationErrors,
  type TaskInput,
  validateTaskInput,
} from "@/lib/validation/task";

export class TaskValidationError extends Error {
  constructor(public errors: ReturnType<typeof validateTaskInput>) {
    super("Task validation failed.");
    this.name = "TaskValidationError";
  }
}

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task not found: ${id}`);
    this.name = "TaskNotFoundError";
  }
}

function createTaskId(): string {
  return `task-${crypto.randomUUID()}`;
}

function assertValidCategory(categoryId: string): void {
  if (!getCategoryById(categoryId)) {
    throw new TaskValidationError({ categoryId: "Selected category is not available." });
  }
}

export function getTasks(): Task[] {
  const { tasks } = getStore();
  return [...tasks].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getTaskById(id: string): Task | undefined {
  const { tasks } = getStore();
  return tasks.find((task) => task.id === id);
}

export function getTasksByCategoryId(categoryId: string): Task[] {
  return getTasks().filter((task) => task.categoryId === categoryId);
}

export function createTask(input: TaskInput): Task {
  const errors = validateTaskInput(input);
  if (hasValidationErrors(errors)) {
    throw new TaskValidationError(errors);
  }

  assertValidCategory(input.categoryId);

  const now = new Date().toISOString();
  const task: Task = {
    id: createTaskId(),
    title: input.title.trim(),
    description: input.description.trim(),
    status: input.status,
    categoryId: input.categoryId,
    createdAt: now,
    updatedAt: now,
  };

  getStore().tasks.push(task);
  return task;
}

export function updateTask(id: string, input: TaskInput): Task {
  const errors = validateTaskInput(input);
  if (hasValidationErrors(errors)) {
    throw new TaskValidationError(errors);
  }

  assertValidCategory(input.categoryId);

  const { tasks } = getStore();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new TaskNotFoundError(id);
  }

  const updatedTask: Task = {
    ...tasks[index],
    title: input.title.trim(),
    description: input.description.trim(),
    status: input.status,
    categoryId: input.categoryId,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updatedTask;
  return updatedTask;
}

export function updateTaskStatus(id: string, status: TaskStatus): Task {
  if (!(TASK_STATUS_OPTIONS as string[]).includes(status)) {
    throw new Error(`Invalid task status: ${status}`);
  }

  const { tasks } = getStore();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new TaskNotFoundError(id);
  }

  if (tasks[index].status === status) {
    return tasks[index];
  }

  const updatedTask: Task = {
    ...tasks[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updatedTask;
  return updatedTask;
}

export function deleteTask(id: string): void {
  const { tasks } = getStore();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new TaskNotFoundError(id);
  }

  tasks.splice(index, 1);
}
