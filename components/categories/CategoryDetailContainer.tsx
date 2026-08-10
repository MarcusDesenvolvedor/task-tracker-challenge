"use client";

import { useState } from "react";
import { updateCategoryAction } from "@/lib/actions/categories";
import type { Category } from "@/lib/types/category";
import { CategoryDetailView } from "./CategoryDetailView";
import { CategoryForm } from "./CategoryForm";

interface CategoryDetailContainerProps {
  category: Category;
  taskCount: number;
}

export function CategoryDetailContainer({
  category,
  taskCount,
}: CategoryDetailContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const boundUpdateAction = updateCategoryAction.bind(null, category.id);

  if (isEditing) {
    return (
      <article className="mx-auto w-full max-w-3xl px-6 py-8">
        <header className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Edit category
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {category.name}
          </h1>
        </header>

        <CategoryForm
          category={category}
          action={boundUpdateAction}
          submitLabel="Save changes"
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <CategoryDetailView
      category={category}
      taskCount={taskCount}
      onEdit={() => setIsEditing(true)}
    />
  );
}
