import { BackLink } from "@/components/layout/BackLink";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { TaskForm } from "@/components/tasks/TaskForm";
import { createTaskAction } from "@/lib/actions/tasks";
import { getCategories } from "@/lib/services/categories";

export default function NewTaskPage() {
  const categories = getCategories();

  return (
    <ContentPanel>
      <BackLink href="/" label="Back to tasks" />
      <ContentHeader
        eyebrow="Create task"
        title="New task"
        description="Add a task and assign it to a category."
      />
      <TaskForm
        categories={categories}
        action={createTaskAction}
        submitLabel="Create task"
        cancelHref="/"
      />
    </ContentPanel>
  );
}
