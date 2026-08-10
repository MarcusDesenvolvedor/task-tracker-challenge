export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;
  /** ISO timestamp for when the task should be completed. Null when unset. */
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
}
