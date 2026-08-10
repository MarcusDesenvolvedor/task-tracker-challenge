"use client";

import { useEffect, useState } from "react";
import { getCategoryColorHex } from "@/lib/constants/category";
import type { NamedCount } from "@/lib/stats/analytics";
import type { CategoryColorName } from "@/lib/types/category";

interface CategoryBarsChartProps {
  items: NamedCount[];
}

export function CategoryBarsChart({ items }: CategoryBarsChartProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const max = Math.max(...items.map((item) => item.count), 1);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [items]);

  if (items.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No category activity matches these filters.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const percent = hasEntered ? (item.count / max) * 100 : 0;
        const color = getCategoryColorHex(item.color as CategoryColorName);

        return (
          <li key={item.id}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
              <span className="truncate font-medium text-white">{item.label}</span>
              <span className="tabular-nums text-zinc-500">{item.count}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: color,
                  transition: "width 500ms var(--motion-easing)",
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
