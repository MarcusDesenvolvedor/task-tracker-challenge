import Link from "next/link";
import { TASK_STATUS_LABELS } from "@/lib/constants/task";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface TaskListItemProps {
  task: Task;
  category?: Category;
  isSelected?: boolean;
}

export function TaskListItem({
  task,
  category,
  isSelected = false,
}: TaskListItemProps) {
  return (
    <li>
      <Link
        href={`/tasks/${task.id}`}
        className={`block rounded-lg px-3 py-2 transition-colors ${
          isSelected
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="line-clamp-2 text-sm font-medium">{task.title}</span>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
              isSelected
                ? "bg-white/15 text-white dark:bg-zinc-900/10 dark:text-zinc-900"
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {TASK_STATUS_LABELS[task.status]}
          </span>
        </div>
        {category ? (
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className={isSelected ? "text-white/80 dark:text-zinc-700" : "text-zinc-500"}>
              {category.name}
            </span>
          </div>
        ) : null}
      </Link>
    </li>
  );
}
