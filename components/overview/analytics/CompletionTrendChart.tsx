"use client";

import { useEffect, useState } from "react";
import type { TrendPoint } from "@/lib/stats/analytics";

interface CompletionTrendChartProps {
  points: TrendPoint[];
}

export function CompletionTrendChart({ points }: CompletionTrendChartProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const max = Math.max(...points.map((point) => point.count), 1);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [points]);

  if (points.length === 0) {
    return (
      <p className="text-sm text-muted">No completion data for this range.</p>
    );
  }

  return (
    <div>
      <div
        role="img"
        aria-label="Completed tasks over time"
        className="flex h-40 items-end gap-1.5 sm:gap-2"
      >
        {points.map((point) => {
          const height = hasEntered ? (point.count / max) * 100 : 0;

          return (
            <div
              key={point.key}
              className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[10px] tabular-nums text-muted">
                {point.count > 0 ? point.count : ""}
              </span>
              <div className="flex h-28 w-full items-end justify-center">
                <div
                  title={`${point.label}: ${point.count}`}
                  className="w-full max-w-8 rounded-t-md bg-emerald-500/90"
                  style={{
                    height: `${Math.max(height, point.count > 0 ? 8 : 2)}%`,
                    opacity: point.count > 0 ? 1 : 0.25,
                    transition: "height 500ms var(--motion-easing)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {points.map((point) => (
          <span
            key={point.key}
            className="min-w-0 flex-1 truncate text-center text-[10px] text-muted"
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}
