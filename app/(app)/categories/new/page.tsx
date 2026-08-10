import { createCategoryAction } from "@/lib/actions/categories";
import { CategoryForm } from "@/components/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8">
      <header className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Create category
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          New category
        </h1>
      </header>

      <CategoryForm
        action={createCategoryAction}
        submitLabel="Create category"
      />
    </article>
  );
}
