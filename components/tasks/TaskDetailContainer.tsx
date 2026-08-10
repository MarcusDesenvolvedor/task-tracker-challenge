"use client";

import { useState } from "react";
import { updateTaskAction } from "@/lib/actions/tasks";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { TaskDetailView } from "./TaskDetailView";
import { TaskForm } from "./TaskForm";

interface TaskDetailContainerProps {
  task: Task;
  category?: Category;
  categories: Category[];
}

export function TaskDetailContainer({
  task,
  category,
  categories,
}: TaskDetailContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const boundUpdateAction = updateTaskAction.bind(null, task.id);

  if (isEditing) {
    return (
      <article className="mx-auto w-full max-w-3xl px-6 py-8">
        <header className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Edit task
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {task.title}
          </h1>
        </header>

        <TaskForm
          task={task}
          categories={categories}
          action={boundUpdateAction}
          submitLabel="Save changes"
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <TaskDetailView
      task={task}
      category={category}
      onEdit={() => setIsEditing(true)}
    />
  );
}
