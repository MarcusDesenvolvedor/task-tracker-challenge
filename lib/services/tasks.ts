import { getStore } from "@/lib/data/store";
import type { Task } from "@/lib/types/task";

export function getTasks(): Task[] {
  const { tasks } = getStore();
  return [...tasks].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getTaskById(id: string): Task | undefined {
  const { tasks } = getStore();
  return tasks.find((task) => task.id === id);
}

export function getTasksByCategoryId(categoryId: string): Task[] {
  return getTasks().filter((task) => task.categoryId === categoryId);
}
