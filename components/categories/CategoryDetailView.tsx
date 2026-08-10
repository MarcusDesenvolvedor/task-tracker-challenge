"use client";

import type { Category } from "@/lib/types/category";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { Button } from "@/components/ui/Button";

interface CategoryDetailViewProps {
  category: Category;
  taskCount: number;
  deleteBlockReason?: string | null;
  onEdit: () => void;
}

export function CategoryDetailView({
  category,
  taskCount,
  deleteBlockReason,
  onEdit,
}: CategoryDetailViewProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8">
      <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Category details
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span
                aria-hidden
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                {category.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-3">
            <Button type="button" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            <DeleteCategoryButton
              categoryId={category.id}
              blockReason={deleteBlockReason}
            />
          </div>
        </div>

        <dl className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Color</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {category.color}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Tasks</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {taskCount}
            </dd>
          </div>
        </dl>
      </header>
    </article>
  );
}
