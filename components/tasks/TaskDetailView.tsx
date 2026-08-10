import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getCategoryColorLabel } from "@/lib/constants/category";
import { formatDateTime } from "@/lib/format/date";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { QuickTaskStatus } from "./QuickTaskStatus";

interface TaskDetailViewProps {
  task: Task;
  category?: Category;
}

export function TaskDetailView({ task, category }: TaskDetailViewProps) {
  return (
    <ContentPanel>
      <ContentHeader
        eyebrow="View task"
        title={task.title}
        actions={
          <>
            <ButtonLink href={`/tasks/${task.id}/edit`} variant="secondary">
              Edit
            </ButtonLink>
            <DeleteTaskButton taskId={task.id} taskTitle={task.title} />
          </>
        }
      />

      <dl className="grid gap-4 rounded-xl border border-border bg-surface-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Status
          </dt>
          <dd className="mt-2">
            <QuickTaskStatus taskId={task.id} status={task.status} />
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Category
          </dt>
          <dd className="mt-2 text-sm font-medium text-foreground">
            {category ? (
              <span className="inline-flex items-center gap-2">
                <CategoryColorDot color={category.color} />
                {category.name}
                <span className="text-xs font-normal text-muted">
                  {getCategoryColorLabel(category.color)}
                </span>
              </span>
            ) : (
              "Uncategorized"
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Due
          </dt>
          <dd className="mt-2 text-sm font-medium text-foreground">
            {task.dueAt ? (
              <time dateTime={task.dueAt}>{formatDateTime(task.dueAt)}</time>
            ) : (
              <span className="text-muted">No due date</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Created
          </dt>
          <dd className="mt-2 text-sm font-medium text-foreground">
            <time dateTime={task.createdAt}>{formatDateTime(task.createdAt)}</time>
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Last updated
          </dt>
          <dd className="mt-2 text-sm font-medium text-foreground">
            <time dateTime={task.updatedAt}>{formatDateTime(task.updatedAt)}</time>
          </dd>
        </div>
      </dl>

      <section className="mt-4 rounded-xl border border-border bg-surface-elevated p-4 sm:p-5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Description
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground sm:text-base">
          {task.description || "No description provided."}
        </p>
      </section>
    </ContentPanel>
  );
}
