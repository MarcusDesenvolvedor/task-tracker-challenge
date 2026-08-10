import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
    <ContentPanel>
      <BackLink href="/" label="Back to tasks" />
      <ContentHeader
        eyebrow="Categories"
        title="Manage categories"
        description="Create and organize categories for your tasks."
        actions={
          <ButtonLink href="/categories/new">New category</ButtonLink>
        }
      />
      <CategoryList
        categories={categories}
        taskCountByCategoryId={taskCountByCategoryId}
      />
    </ContentPanel>
  );
}
