import type { TaskStatus } from "@/lib/types/task";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

/** Longer wording for dashboard summaries, where the badge shorthand reads terse. */
export const TASK_STATUS_SUMMARY_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Completed",
};

export const TASK_STATUS_COLOR_HEX: Record<TaskStatus, string> = {
  todo: "#f97316",
  in_progress: "#3b82f6",
  done: "#22c55e",
};

export const TASK_STATUS_OPTIONS: TaskStatus[] = [
  "todo",
  "in_progress",
  "done",
];
