import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
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
      <EmptyState
        title="No categories yet"
        description="Categories help you organize tasks by type or project."
        action={<ButtonLink href="/categories/new">Create category</ButtonLink>}
      />
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/categories/${category.id}`}
            className="flex min-h-14 items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 sm:px-5 dark:hover:bg-zinc-900"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                {category.name}
              </span>
            </div>
            <span className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">
              {taskCountByCategoryId[category.id] ?? 0} task
              {(taskCountByCategoryId[category.id] ?? 0) === 1 ? "" : "s"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
