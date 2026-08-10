import Link from "next/link";
import type { Category } from "@/lib/types/category";

interface CategoryListProps {
  categories: Category[];
  taskCountByCategoryId: Record<string, number>;
}

export function CategoryList({
  categories,
  taskCountByCategoryId,
}: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No categories yet. Create one to start organizing tasks.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/categories/${category.id}`}
            className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {category.name}
              </span>
            </div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {taskCountByCategoryId[category.id] ?? 0} task
              {(taskCountByCategoryId[category.id] ?? 0) === 1 ? "" : "s"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
