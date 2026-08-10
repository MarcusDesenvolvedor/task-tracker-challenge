"use client";

import { useState, useTransition } from "react";
import {
  TASK_STATUS_COLOR_HEX,
  TASK_STATUS_LABELS,
  TASK_STATUS_OPTIONS,
} from "@/lib/constants/task";
import { updateTaskStatusAction } from "@/lib/actions/tasks";
import type { TaskStatus } from "@/lib/types/task";

interface QuickTaskStatusProps {
  taskId: string;
  status: TaskStatus;
}

export function QuickTaskStatus({ taskId, status }: QuickTaskStatusProps) {
  const [optimisticStatus, setOptimisticStatus] = useState<TaskStatus | null>(
    null,
  );
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const currentStatus =
    isPending && optimisticStatus ? optimisticStatus : status;

  function handleChange(nextStatus: TaskStatus) {
    if (nextStatus === currentStatus || isPending) {
      return;
    }

    setOptimisticStatus(nextStatus);
    setError(undefined);

    startTransition(async () => {
      const result = await updateTaskStatusAction(taskId, nextStatus);

      if (result.message) {
        setError(result.message);
      }

      setOptimisticStatus(null);
    });
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Task status"
        className="inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-border bg-accent-soft/60 p-1"
      >
        {TASK_STATUS_OPTIONS.map((option) => {
          const isActive = option === currentStatus;

          return (
            <button
              key={option}
              type="button"
              disabled={isPending}
              aria-pressed={isActive}
              onClick={() => handleChange(option)}
              className={`rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                isActive
                  ? "text-foreground"
                  : "text-muted hover:bg-accent-soft hover:text-muted-foreground"
              }`}
              style={
                isActive
                  ? { backgroundColor: TASK_STATUS_COLOR_HEX[option] }
                  : undefined
              }
            >
              {TASK_STATUS_LABELS[option]}
            </button>
          );
        })}
      </div>
      <p className="mt-2 min-h-4 text-xs text-muted" aria-live="polite">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : isPending ? (
          "Saving…"
        ) : (
          "Changes save automatically"
        )}
      </p>
    </div>
  );
}
