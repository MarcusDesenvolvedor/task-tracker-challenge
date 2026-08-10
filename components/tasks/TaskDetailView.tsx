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
            <DeleteTaskButton taskId={task.id} />
          </>
        }
      />

      <dl className="flex flex-wrap gap-4 border-b border-zinc-200 pb-6 text-sm dark:border-zinc-800">
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
          <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
            {TASK_STATUS_LABELS[task.status]}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
          <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
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

      <section className="py-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Description
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-zinc-700 dark:text-zinc-300">
          {task.description || "No description provided."}
        </p>
      </section>
    </ContentPanel>
  );
}
