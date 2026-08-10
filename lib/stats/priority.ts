import { getLocalDateKey, isSameLocalDay } from "@/lib/format/date";
import type { Task } from "@/lib/types/task";

export type PriorityUrgency = "overdue" | "today" | "upcoming";

export interface PriorityTask extends Task {
  urgency: PriorityUrgency;
}

/**
 * Incomplete tasks with a due date, ordered soonest-first so today's (and
 * overdue) work surfaces above later deadlines.
 */
export function getPriorityTasks(
  tasks: Task[],
  now = new Date(),
): PriorityTask[] {
  const todayKey = getLocalDateKey(now);

  return tasks
    .filter((task) => task.status !== "done" && task.dueAt)
    .map((task) => {
      const dueAt = task.dueAt as string;
      const dueKey = getLocalDateKey(dueAt);
      let urgency: PriorityUrgency = "upcoming";

      if (dueKey < todayKey) {
        urgency = "overdue";
      } else if (isSameLocalDay(dueAt, now)) {
        urgency = "today";
      }

      return { ...task, urgency };
    })
    .sort((a, b) => {
      const urgencyRank = { overdue: 0, today: 1, upcoming: 2 } as const;
      const byUrgency = urgencyRank[a.urgency] - urgencyRank[b.urgency];

      if (byUrgency !== 0) {
        return byUrgency;
      }

      return (
        new Date(a.dueAt as string).getTime() -
        new Date(b.dueAt as string).getTime()
      );
    });
}
