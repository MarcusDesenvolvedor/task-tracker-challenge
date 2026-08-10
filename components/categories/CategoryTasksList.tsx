import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Task } from "@/lib/types/task";

interface CategoryTasksListProps {
  tasks: Task[];
  categoryName: string;
}

export function CategoryTasksList({
  tasks,
  categoryName,
}: CategoryTasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface-elevated">
        <EmptyState
          compact
          title="No tasks in this category"
          description={`Assign a task to ${categoryName} to see it here.`}
          action={<ButtonLink href="/tasks/new">Create task</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface-elevated">
      {tasks.map((task) => (
        <li key={task.id}>
          <Link
            href={`/tasks/${task.id}`}
            className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 transition-colors duration-200 hover:bg-accent-soft/60 sm:px-5"
          >
            <div className="min-w-0">
              <span className="block truncate font-medium text-foreground">
                {task.title}
              </span>
              {task.description ? (
                <span className="mt-0.5 block truncate text-xs text-muted">
                  {task.description}
                </span>
              ) : null}
            </div>
            <StatusBadge status={task.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
