import { notFound } from "next/navigation";
import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { TaskForm } from "@/components/tasks/TaskForm";
import { updateTaskAction } from "@/lib/actions/tasks";
import { getCategories, getCategoryById } from "@/lib/services/categories";
import { getTaskById } from "@/lib/services/tasks";

export default async function EditTaskPage({
  params,
}: PageProps<"/tasks/[taskId]/edit">) {
  const { taskId } = await params;
  const task = getTaskById(taskId);

  if (!task) {
    notFound();
  }

  const categories = getCategories();
  const category = getCategoryById(task.categoryId);
  const boundUpdateAction = updateTaskAction.bind(null, task.id);

  return (
    <ContentPanel>
      <BackLink href={`/tasks/${task.id}`} label="Back to task" />
      <ContentHeader
        eyebrow="Edit task"
        title={task.title}
        description={
          category
            ? `Currently assigned to ${category.name}.`
            : undefined
        }
      />
      <TaskForm
        task={task}
        categories={categories}
        action={boundUpdateAction}
        submitLabel="Save changes"
        cancelHref={`/tasks/${task.id}`}
      />
    </ContentPanel>
  );
}
