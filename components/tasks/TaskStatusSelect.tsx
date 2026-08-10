import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";
import { formInputClassName } from "@/components/ui/FormField";
import { TASK_STATUS_LABELS, TASK_STATUS_OPTIONS } from "@/lib/constants/task";
import type { TaskStatus } from "@/lib/types/task";

interface TaskStatusSelectProps {
  id?: string;
  name?: string;
  defaultValue?: TaskStatus;
}

export function TaskStatusSelect({
  id = "status",
  name = "status",
  defaultValue = "todo",
}: TaskStatusSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={`${formInputClassName(false)} appearance-none pr-10`}
      >
        {TASK_STATUS_OPTIONS.map((status) => (
          <option key={status} value={status} className="bg-surface-input text-foreground">
            {TASK_STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}
