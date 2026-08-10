import type { Category } from "@/lib/types/category";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";

interface CategoryDetailViewProps {
  category: Category;
  taskCount: number;
  deleteBlockReason?: string | null;
}

export function CategoryDetailView({
  category,
  taskCount,
  deleteBlockReason,
}: CategoryDetailViewProps) {
  return (
    <ContentPanel>
      <ContentHeader
        eyebrow="View category"
        title={category.name}
        actions={
          <>
            <ButtonLink
              href={`/categories/${category.id}/edit`}
              variant="secondary"
            >
              Edit
            </ButtonLink>
            <DeleteCategoryButton
              categoryId={category.id}
              categoryName={category.name}
              blockReason={deleteBlockReason}
            />
          </>
        }
      />

      <dl className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Color
          </dt>
          <dd className="mt-1.5 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span
              aria-hidden
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.color}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Tasks
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {taskCount}
          </dd>
        </div>
      </dl>
    </ContentPanel>
  );
}
