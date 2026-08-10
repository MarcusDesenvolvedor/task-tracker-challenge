"use client";

import { useEffect, useState } from "react";
import {
  TASK_STATUS_COLOR_HEX,
  TASK_STATUS_OPTIONS,
  TASK_STATUS_SUMMARY_LABELS,
} from "@/lib/constants/task";
import type { TaskStatusSummary } from "@/lib/stats/tasks";

interface TaskStatusBarProps {
  summary: TaskStatusSummary;
}

function describeDistribution(summary: TaskStatusSummary): string {
  if (summary.total === 0) {
    return "No tasks yet.";
  }

  const parts = TASK_STATUS_OPTIONS.map(
    (status) =>
      `${summary.counts[status]} ${TASK_STATUS_SUMMARY_LABELS[status].toLowerCase()}`,
  );

  return `${summary.total} tasks: ${parts.join(", ")}.`;
}

export function TaskStatusBar({ summary }: TaskStatusBarProps) {
  // Segments start collapsed so the bar grows into place on first paint; later
  // data changes then transition from the previous widths instead of from zero.
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div>
      <div
        role="img"
        aria-label={describeDistribution(summary)}
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-chip"
      >
        {TASK_STATUS_OPTIONS.map((status) => (
          <div
            key={status}
            className="h-full"
            style={{
              width: hasEntered ? `${summary.percentages[status]}%` : "0%",
              backgroundColor: TASK_STATUS_COLOR_HEX[status],
              transition: "width 500ms var(--motion-easing)",
            }}
          />
        ))}
      </div>

      {summary.total === 0 ? (
        <p className="mt-3 text-xs text-muted">
          No tasks yet. Create a task to see its distribution here.
        </p>
      ) : (
        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {TASK_STATUS_OPTIONS.map((status) => (
            <li
              key={status}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: TASK_STATUS_COLOR_HEX[status] }}
              />
              <span className="tabular-nums">
                {summary.percentages[status]}%
              </span>
              {TASK_STATUS_SUMMARY_LABELS[status]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
