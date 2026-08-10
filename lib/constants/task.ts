import type { TaskStatus } from "@/lib/types/task";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export const TASK_STATUS_OPTIONS: TaskStatus[] = [
  "todo",
  "in_progress",
  "done",
];
