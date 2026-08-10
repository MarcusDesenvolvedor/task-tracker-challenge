import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface TaskDetailPanelProps {
  task: Task;
  category?: Category;
}

const statusLabels = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
} as const;

export function TaskDetailPanel({ task, category }: TaskDetailPanelProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8">
      <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Task details
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          {task.title}
        </h1>
        <dl className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {statusLabels[task.status]}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {category?.name ?? "Uncategorized"}
            </dd>
          </div>
        </dl>
      </header>

      <section className="py-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Description
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-zinc-700 dark:text-zinc-300">
          {task.description || "No description provided."}
        </p>
      </section>

      <section className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900/40">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Task form placeholder
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Create and edit forms will live here in a later step.
        </p>
      </section>
    </article>
  );
}
