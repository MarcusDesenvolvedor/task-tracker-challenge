import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

export interface CategoryProgress {
  category: Category;
  total: number;
  done: number;
  percent: number;
}

/** Completion progress for each category, sorted by name. */
export function summarizeCategoryProgress(
  categories: Category[],
  tasks: Task[],
): CategoryProgress[] {
  return categories
    .map((category) => {
      const categoryTasks = tasks.filter(
        (task) => task.categoryId === category.id,
      );
      const done = categoryTasks.filter((task) => task.status === "done").length;
      const total = categoryTasks.length;

      return {
        category,
        total,
        done,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      };
    })
    .sort((a, b) => a.category.name.localeCompare(b.category.name));
}
