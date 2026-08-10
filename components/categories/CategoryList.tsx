import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCategoryColorLabel } from "@/lib/constants/category";
import type { Category } from "@/lib/types/category";
import { CategoryColorDot } from "./CategoryColorDot";

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
    <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface-elevated">
      {categories.map((category) => {
        const taskCount = taskCountByCategoryId[category.id] ?? 0;

        return (
          <li key={category.id}>
            <Link
              href={`/categories/${category.id}`}
              className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 transition-colors duration-200 hover:bg-accent-soft/60 sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <CategoryColorDot color={category.color} size="lg" />
                <div className="min-w-0">
                  <span className="block truncate font-medium text-foreground">
                    {category.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {getCategoryColorLabel(category.color)}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-sm text-muted">
                {taskCount} task{taskCount === 1 ? "" : "s"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
