"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { getSelectedTaskId } from "@/lib/navigation/pathnames";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { TaskListItem } from "./TaskListItem";

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
}

export function TaskList({ tasks, categories }: TaskListProps) {
  const pathname = usePathname();
  const selectedTaskId = getSelectedTaskId(pathname);

  const categoryById = new Map(
    categories.map((category) => [category.id, category]),
  );

  if (tasks.length === 0) {
    return (
      <EmptyState
        compact
        title="No tasks yet"
        description="Create your first task to start tracking work."
        action={
          <Link
            href="/tasks/new"
            className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
          >
            Create task
          </Link>
        }
      />
    );
  }

  return (
    <ul className="flex flex-col gap-0.5 px-2 sm:px-3">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          category={categoryById.get(task.categoryId)}
          isSelected={task.id === selectedTaskId}
        />
      ))}
    </ul>
  );
}
