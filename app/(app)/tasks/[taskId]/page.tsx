import { notFound } from "next/navigation";
import { TaskDetailContainer } from "@/components/tasks/TaskDetailContainer";
import { getCategories, getCategoryById } from "@/lib/services/categories";
import { getTaskById } from "@/lib/services/tasks";

export default async function TaskPage({
  params,
}: PageProps<"/tasks/[taskId]">) {
  const { taskId } = await params;
  const task = getTaskById(taskId);

  if (!task) {
    notFound();
  }

  const category = getCategoryById(task.categoryId);
  const categories = getCategories();

  return (
    <TaskDetailContainer
      task={task}
      category={category}
      categories={categories}
    />
  );
}
