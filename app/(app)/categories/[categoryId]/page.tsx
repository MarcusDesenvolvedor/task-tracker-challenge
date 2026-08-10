import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";
import { getCategoryDeletionBlockReason } from "@/lib/rules/deletion";
import { getCategoryById } from "@/lib/services/categories";
import { getTasksByCategoryId } from "@/lib/services/tasks";

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[categoryId]">) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const tasks = getTasksByCategoryId(categoryId);
  const deleteBlockReason = getCategoryDeletionBlockReason(tasks.length);

  return (
    <CategoryDetailView
      category={category}
      tasks={tasks}
      deleteBlockReason={deleteBlockReason}
    />
  );
}
