import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";
import { getCategoryDeletionBlockReason } from "@/lib/rules/deletion";
import {
  getCategoryById,
  getCategoryTaskCount,
} from "@/lib/services/categories";

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[categoryId]">) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const taskCount = getCategoryTaskCount(categoryId);
  const deleteBlockReason = getCategoryDeletionBlockReason(taskCount);

  return (
    <CategoryDetailView
      category={category}
      taskCount={taskCount}
      deleteBlockReason={deleteBlockReason}
    />
  );
}
