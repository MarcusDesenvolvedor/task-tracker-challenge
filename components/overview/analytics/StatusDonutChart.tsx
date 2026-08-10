"use client";

import { useEffect, useState } from "react";
import {
  TASK_STATUS_COLOR_HEX,
  TASK_STATUS_SUMMARY_LABELS,
} from "@/lib/constants/task";
import type { NamedCount } from "@/lib/stats/analytics";
import type { TaskStatus } from "@/lib/types/task";

interface StatusDonutChartProps {
  items: NamedCount[];
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StatusDonutChart({ items }: StatusDonutChartProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const total = items.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [items]);

  if (total === 0) {
    return (
      <p className="text-sm text-muted">
        No status data matches these filters.
      </p>
    );
  }

  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 100 100" className="-rotate-90 h-full w-full">
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth="12"
          />
          {items.map((item) => {
            if (item.count === 0) {
              return null;
            }

            const length = (item.count / total) * CIRCUMFERENCE;
            const dashOffset = -offset;
            offset += length;
            const status = item.id as TaskStatus;

            return (
              <circle
                key={item.id}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={TASK_STATUS_COLOR_HEX[status]}
                strokeWidth="12"
                strokeDasharray={
                  hasEntered
                    ? `${length} ${CIRCUMFERENCE - length}`
                    : `0 ${CIRCUMFERENCE}`
                }
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dasharray 500ms var(--motion-easing)" }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums text-foreground">
            {total}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            tasks
          </span>
        </div>
      </div>

      <ul className="w-full space-y-2">
        {items.map((item) => {
          const status = item.id as TaskStatus;
          const percent = Math.round((item.count / total) * 100);

          return (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: TASK_STATUS_COLOR_HEX[status] }}
                />
                {TASK_STATUS_SUMMARY_LABELS[status]}
              </span>
              <span className="tabular-nums">
                {item.count} · {percent}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
