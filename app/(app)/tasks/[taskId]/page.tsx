import { notFound } from "next/navigation";
import { TaskDetailPanel } from "@/components/tasks/TaskDetailPanel";
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

  return <TaskDetailPanel task={task} category={category} />;
}
