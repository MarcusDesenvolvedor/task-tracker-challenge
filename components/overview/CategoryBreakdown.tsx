import Link from "next/link";
import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import type { Category } from "@/lib/types/category";

interface CategoryBreakdownProps {
  categories: Category[];
  taskCountByCategoryId: Record<string, number>;
}

export function CategoryBreakdown({
  categories,
  taskCountByCategoryId,
}: CategoryBreakdownProps) {
  if (categories.length === 0) {
    return (
      <p className="text-xs text-zinc-500">
        No categories yet.{" "}
        <Link
          href="/categories/new"
          className="rounded font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
        >
          Create one
        </Link>{" "}
        to group your tasks.
      </p>
    );
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {categories.map((category) => {
        const taskCount = taskCountByCategoryId[category.id] ?? 0;

        return (
          <li key={category.id}>
            <Link
              href={`/categories/${category.id}`}
              className="flex min-h-10 items-center justify-between gap-3 rounded-lg border border-zinc-800/80 px-3 py-2 transition-colors duration-200 hover:bg-zinc-900/60"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <CategoryColorDot color={category.color} />
                <span className="truncate text-sm font-medium text-white">
                  {category.name}
                </span>
              </span>
              <span className="shrink-0 text-xs tabular-nums text-zinc-500">
                {taskCount} task{taskCount === 1 ? "" : "s"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
