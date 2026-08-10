"use client";

import { usePathname } from "next/navigation";
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
      <p className="px-4 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        No tasks yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-1 p-2">
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
