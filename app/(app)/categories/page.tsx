import Link from "next/link";
import { CategoryList } from "@/components/categories/CategoryList";
import {
  getCategories,
  getCategoryTaskCount,
} from "@/lib/services/categories";

export default function CategoriesPage() {
  const categories = getCategories();
  const taskCountByCategoryId = Object.fromEntries(
    categories.map((category) => [
      category.id,
      getCategoryTaskCount(category.id),
    ]),
  );

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Categories
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Manage categories
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Create and organize categories for your tasks.
          </p>
        </div>
        <Link
          href="/categories/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          New category
        </Link>
      </header>

      <CategoryList
        categories={categories}
        taskCountByCategoryId={taskCountByCategoryId}
      />
    </article>
  );
}
