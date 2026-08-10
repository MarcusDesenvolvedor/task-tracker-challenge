import { TASK_STATUS_LABELS } from "@/lib/constants/task";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";

interface TaskDetailViewProps {
  task: Task;
  category?: Category;
}

export function TaskDetailView({ task, category }: TaskDetailViewProps) {
  return (
    <ContentPanel>
      <ContentHeader
        eyebrow="View task"
        title={task.title}
        actions={
          <>
            <ButtonLink href={`/tasks/${task.id}/edit`} variant="secondary">
              Edit
            </ButtonLink>
            <DeleteTaskButton taskId={task.id} taskTitle={task.title} />
          </>
        }
      />

      <dl className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Status
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {TASK_STATUS_LABELS[task.status]}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Category
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {category ? (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </span>
            ) : (
              "Uncategorized"
            )}
          </dd>
        </div>
      </dl>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Description
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-700 sm:text-base dark:text-zinc-300">
          {task.description || "No description provided."}
        </p>
      </section>
    </ContentPanel>
  );
}
