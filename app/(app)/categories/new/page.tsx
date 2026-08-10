import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { createCategoryAction } from "@/lib/actions/categories";

export default function NewCategoryPage() {
  return (
    <ContentPanel>
      <BackLink href="/categories" label="Back to categories" />
      <ContentHeader
        eyebrow="Create category"
        title="New category"
        description="Choose a name and color for this category."
      />
      <CategoryForm
        action={createCategoryAction}
        submitLabel="Create category"
        cancelHref="/categories"
      />
    </ContentPanel>
  );
}
