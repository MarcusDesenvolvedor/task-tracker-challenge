import { TASK_STATUS_LABELS } from "@/lib/constants/task";
import type { TaskStatus } from "@/lib/types/task";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-300 ${className}`}
    >
      {TASK_STATUS_LABELS[status]}
    </span>
  );
}
