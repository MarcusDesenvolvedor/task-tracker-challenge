import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getCategoryColorLabel } from "@/lib/constants/category";
import type { Category } from "@/lib/types/category";
import { CategoryColorDot } from "./CategoryColorDot";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

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
      <BackLink href="/categories" label="Back to Manage Categories" />
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

      <dl className="grid gap-4 rounded-xl border border-zinc-800 bg-surface-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Color
          </dt>
          <dd className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
            <CategoryColorDot color={category.color} size="lg" />
            {getCategoryColorLabel(category.color)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Tasks
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">{taskCount}</dd>
        </div>
      </dl>
    </ContentPanel>
  );
}
