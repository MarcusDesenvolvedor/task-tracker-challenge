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
              blockReason={deleteBlockReason}
            />
          </>
        }
      />

      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Category color preview
        </span>
      </div>

      <dl className="flex flex-wrap gap-4 text-sm">
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
    </ContentPanel>
  );
}
