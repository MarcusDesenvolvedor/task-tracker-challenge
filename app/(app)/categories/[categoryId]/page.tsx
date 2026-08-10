import { notFound } from "next/navigation";
import { CategoryDetailContainer } from "@/components/categories/CategoryDetailContainer";
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

  return (
    <CategoryDetailContainer category={category} taskCount={taskCount} />
  );
}
