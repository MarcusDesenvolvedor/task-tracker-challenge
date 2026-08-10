import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getCategoryColorLabel } from "@/lib/constants/category";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { DeleteTaskButton } from "./DeleteTaskButton";

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

      <dl className="grid gap-4 rounded-xl border border-zinc-800 bg-surface-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Status
          </dt>
          <dd className="mt-2">
            <StatusBadge status={task.status} />
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Category
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {category ? (
              <span className="inline-flex items-center gap-2">
                <CategoryColorDot color={category.color} />
                {category.name}
                <span className="text-xs font-normal text-zinc-500">
                  {getCategoryColorLabel(category.color)}
                </span>
              </span>
            ) : (
              "Uncategorized"
            )}
          </dd>
        </div>
      </dl>

      <section className="mt-4 rounded-xl border border-zinc-800 bg-surface-elevated p-4 sm:p-5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Description
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-300 sm:text-base">
          {task.description || "No description provided."}
        </p>
      </section>
    </ContentPanel>
  );
}
