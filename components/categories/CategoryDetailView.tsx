import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getCategoryColorLabel } from "@/lib/constants/category";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { CategoryColorDot } from "./CategoryColorDot";
import { CategoryTasksList } from "./CategoryTasksList";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

interface CategoryDetailViewProps {
  category: Category;
  tasks: Task[];
  deleteBlockReason?: string | null;
}

export function CategoryDetailView({
  category,
  tasks,
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

      <dl className="grid gap-4 rounded-xl border border-border bg-surface-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Color
          </dt>
          <dd className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <CategoryColorDot color={category.color} size="lg" />
            {getCategoryColorLabel(category.color)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Tasks
          </dt>
          <dd className="mt-2 text-sm font-medium text-foreground">
            {tasks.length}
          </dd>
        </div>
      </dl>

      <section className="mt-4">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Linked tasks
        </h2>
        <CategoryTasksList tasks={tasks} categoryName={category.name} />
      </section>
    </ContentPanel>
  );
}
