import Link from "next/link";
import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime, formatTime } from "@/lib/format/date";
import type { PriorityTask, PriorityUrgency } from "@/lib/stats/priority";
import type { Category } from "@/lib/types/category";

const URGENCY_LABELS: Record<PriorityUrgency, string> = {
  overdue: "Overdue",
  today: "Due today",
  upcoming: "Upcoming",
};

const URGENCY_CLASSES: Record<PriorityUrgency, string> = {
  overdue: "text-red-400",
  today: "text-amber-400",
  upcoming: "text-zinc-400",
};

interface PriorityTasksProps {
  tasks: PriorityTask[];
  categories: Category[];
}

export function PriorityTasks({ tasks, categories }: PriorityTasksProps) {
  const categoryById = new Map(
    categories.map((category) => [category.id, category]),
  );

  if (tasks.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No upcoming deadlines. Add a due date when creating a task to prioritize
        it here.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-800 overflow-hidden rounded-lg border border-zinc-800/80">
      {tasks.map((task) => {
        const category = categoryById.get(task.categoryId);
        const dueAt = task.dueAt as string;

        return (
          <li key={task.id}>
            <Link
              href={`/tasks/${task.id}`}
              className="flex items-start justify-between gap-4 px-3 py-3 transition-colors duration-200 hover:bg-zinc-900/60 sm:px-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium text-white">
                    {task.title}
                  </span>
                  <StatusBadge status={task.status} />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span className={URGENCY_CLASSES[task.urgency]}>
                    {URGENCY_LABELS[task.urgency]}
                    {task.urgency === "today"
                      ? ` · ${formatTime(dueAt)}`
                      : ` · ${formatDateTime(dueAt)}`}
                  </span>
                  {category ? (
                    <span className="inline-flex items-center gap-1.5">
                      <CategoryColorDot color={category.color} size="sm" />
                      {category.name}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
