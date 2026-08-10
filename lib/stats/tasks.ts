import { TASK_STATUS_OPTIONS } from "@/lib/constants/task";
import type { Task, TaskStatus } from "@/lib/types/task";

export interface TaskStatusSummary {
  total: number;
  counts: Record<TaskStatus, number>;
  /** Whole percentages that always add up to 100 so the progress bar has no gap. */
  percentages: Record<TaskStatus, number>;
}

function createStatusRecord(): Record<TaskStatus, number> {
  return Object.fromEntries(
    TASK_STATUS_OPTIONS.map((status) => [status, 0]),
  ) as Record<TaskStatus, number>;
}

/**
 * Largest remainder method: floor every share, then hand the leftover points to
 * the statuses with the biggest fractions so rounding never loses or invents a
 * percent.
 */
function toWholePercentages(
  counts: Record<TaskStatus, number>,
  total: number,
): Record<TaskStatus, number> {
  const percentages = createStatusRecord();

  if (total === 0) {
    return percentages;
  }

  const shares = TASK_STATUS_OPTIONS.map((status) => ({
    status,
    exact: (counts[status] / total) * 100,
  }));

  let leftover = 100;

  for (const share of shares) {
    percentages[share.status] = Math.floor(share.exact);
    leftover -= percentages[share.status];
  }

  const byLargestFraction = [...shares].sort(
    (a, b) => (b.exact % 1) - (a.exact % 1),
  );

  for (let index = 0; index < leftover; index += 1) {
    percentages[byLargestFraction[index % shares.length].status] += 1;
  }

  return percentages;
}

export function summarizeTasksByStatus(tasks: Task[]): TaskStatusSummary {
  const counts = createStatusRecord();

  for (const task of tasks) {
    counts[task.status] += 1;
  }

  return {
    total: tasks.length,
    counts,
    percentages: toWholePercentages(counts, tasks.length),
  };
}
