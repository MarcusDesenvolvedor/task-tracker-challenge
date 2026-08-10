"use client";

import { TASK_STATUS_LABELS } from "@/lib/constants/task";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { Button } from "@/components/ui/Button";

interface TaskDetailViewProps {
  task: Task;
  category?: Category;
  onEdit: () => void;
}

export function TaskDetailView({ task, category, onEdit }: TaskDetailViewProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8">
      <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Task details
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              {task.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            <DeleteTaskButton taskId={task.id} />
          </div>
        </div>

        <dl className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {TASK_STATUS_LABELS[task.status]}
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
    </article>
  );
}
