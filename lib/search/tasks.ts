import type { Task } from "@/lib/types/task";

/** Case-insensitive title match. Empty query returns no results. */
export function searchTasksByTitle(tasks: Task[], query: string): Task[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return tasks.filter((task) => task.title.toLowerCase().includes(normalized));
}
