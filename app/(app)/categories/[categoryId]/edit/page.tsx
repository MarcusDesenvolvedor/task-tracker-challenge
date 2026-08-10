import { notFound } from "next/navigation";
import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { updateCategoryAction } from "@/lib/actions/categories";
import { getCategoryById } from "@/lib/services/categories";

export default async function EditCategoryPage({
  params,
}: PageProps<"/categories/[categoryId]/edit">) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const boundUpdateAction = updateCategoryAction.bind(null, category.id);

  return (
    <ContentPanel>
      <BackLink href={`/categories/${category.id}`} label="Back to category" />
      <ContentHeader eyebrow="Edit category" title={category.name} />
      <CategoryForm
        category={category}
        action={boundUpdateAction}
        submitLabel="Save changes"
        cancelHref={`/categories/${category.id}`}
      />
    </ContentPanel>
  );
}
