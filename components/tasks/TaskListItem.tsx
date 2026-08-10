import Link from "next/link";
import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface TaskListItemProps {
  task: Task;
  category?: Category;
  isSelected?: boolean;
  showStatus?: boolean;
}

export function TaskListItem({
  task,
  category,
  isSelected = false,
  showStatus = true,
}: TaskListItemProps) {
  return (
    <li>
      <Link
        href={`/tasks/${task.id}`}
        aria-current={isSelected ? "page" : undefined}
        className={`block rounded-lg px-3 py-3 transition-colors duration-200 ${
          isSelected ? "bg-accent-soft" : "hover:bg-accent-soft/50"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
            {task.title}
          </span>
          {showStatus ? <StatusBadge status={task.status} /> : null}
        </div>
        {category ? (
          <div className="mt-2 flex items-center gap-2 text-xs text-muted">
            <CategoryColorDot color={category.color} size="sm" />
            <span>{category.name}</span>
          </div>
        ) : null}
      </Link>
    </li>
  );
}
