"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { getCategoryColorHex } from "@/lib/constants/category";
import type { CategoryProgress as CategoryProgressItem } from "@/lib/stats/category-progress";

interface CategoryProgressProps {
  items: CategoryProgressItem[];
}

export function CategoryProgress({ items }: CategoryProgressProps) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No categories yet.{" "}
        <Link
          href="/categories/new"
          className="rounded font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
        >
          Create one
        </Link>{" "}
        to track progress here.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map(({ category, total, done, percent }) => (
        <li key={category.id}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <Link
              href={`/categories/${category.id}`}
              className="flex min-w-0 items-center gap-2.5 rounded transition-colors hover:text-white"
            >
              <CategoryColorDot color={category.color} />
              <span className="truncate text-sm font-medium text-white">
                {category.name}
              </span>
            </Link>
            <span className="shrink-0 text-xs tabular-nums text-zinc-500">
              {done}/{total} done · {percent}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${category.name}: ${done} of ${total} tasks completed`}
            className="h-2 w-full overflow-hidden rounded-full bg-zinc-800"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: hasEntered ? `${percent}%` : "0%",
                backgroundColor: getCategoryColorHex(category.color),
                transition: "width 500ms var(--motion-easing)",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
