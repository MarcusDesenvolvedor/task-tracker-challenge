import { notFound } from "next/navigation";
import { TaskDetailView } from "@/components/tasks/TaskDetailView";
import { getCategoryById } from "@/lib/services/categories";
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

  return <TaskDetailView task={task} category={category} />;
}
