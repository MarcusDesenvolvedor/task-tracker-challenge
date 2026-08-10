import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { createTaskAction } from "@/lib/actions/tasks";
import { getCategories } from "@/lib/services/categories";

const FORM_ID = "create-task-form";

export default function NewTaskPage() {
  const categories = getCategories();

  return (
    <ContentPanel wide>
      <ContentHeader
        eyebrow="New task"
        title="Create New Task"
        actions={
          <>
            <ButtonLink href="/" variant="secondary">
              Cancel
            </ButtonLink>
            <Button type="submit" form={FORM_ID} className="gap-2">
              <PlusIcon />
              Create Task
            </Button>
          </>
        }
      />
      <TaskForm
        formId={FORM_ID}
        categories={categories}
        action={createTaskAction}
        submitLabel="Create Task"
        hideFooterActions
      />
    </ContentPanel>
  );
}
