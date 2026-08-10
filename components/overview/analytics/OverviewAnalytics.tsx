"use client";

import { useMemo, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";
import {
  TASK_STATUS_LABELS,
  TASK_STATUS_OPTIONS,
} from "@/lib/constants/task";
import {
  buildAnalyticsSummary,
  type AnalyticsDateRange,
  type AnalyticsFilters,
} from "@/lib/stats/analytics";
import type { Category } from "@/lib/types/category";
import type { Task, TaskStatus } from "@/lib/types/task";
import { AnalyticsExportButtons } from "./AnalyticsExportButtons";
import { CategoryBarsChart } from "./CategoryBarsChart";
import { CompletionTrendChart } from "./CompletionTrendChart";
import { StatusDonutChart } from "./StatusDonutChart";

interface OverviewAnalyticsProps {
  tasks: Task[];
  categories: Category[];
}

const RANGE_OPTIONS: { value: AnalyticsDateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Past month" },
  { value: "90d", label: "Last 90 days" },
  { value: "all", label: "All time" },
];

function selectClassName() {
  return "w-full appearance-none rounded-lg border border-zinc-800 bg-surface-input px-3 py-2 pr-9 text-sm text-white outline-none transition-colors focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800/80";
}

export function OverviewAnalytics({
  tasks,
  categories,
}: OverviewAnalyticsProps) {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    range: "30d",
    categoryId: "all",
    status: "all",
  });

  const summary = useMemo(
    () => buildAnalyticsSummary(tasks, categories, filters),
    [tasks, categories, filters],
  );

  return (
    <section className="view-enter rounded-xl border border-zinc-800 bg-surface-elevated p-4 sm:p-5">
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Analytics
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Completions and activity with date, category, and status filters.
            </p>
          </div>
          <AnalyticsExportButtons
            context={{ summary, filters, categories }}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Date
            </span>
            <div className="relative">
              <select
                value={filters.range}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    range: event.target.value as AnalyticsDateRange,
                  }))
                }
                className={selectClassName()}
              >
                {RANGE_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-surface-input text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
          </label>

          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Category
            </span>
            <div className="relative">
              <select
                value={filters.categoryId}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    categoryId: event.target.value,
                  }))
                }
                className={selectClassName()}
              >
                <option value="all" className="bg-surface-input text-white">
                  All categories
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-surface-input text-white"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
          </label>

          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Status
            </span>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    status: event.target.value as TaskStatus | "all",
                  }))
                }
                className={selectClassName()}
              >
                <option value="all" className="bg-surface-input text-white">
                  All statuses
                </option>
                {TASK_STATUS_OPTIONS.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-surface-input text-white"
                  >
                    {TASK_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
          </label>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-zinc-800/80 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Completed
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-emerald-400">
            {summary.completedInRange}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800/80 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Created
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-white">
            {summary.createdInRange}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-800/80 p-3 sm:p-4 lg:col-span-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Completions over time
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {filters.range === "7d"
              ? "Daily completed tasks in the selected window."
              : "Weekly completed tasks in the selected window."}
          </p>
          <div className="mt-4">
            <CompletionTrendChart points={summary.completionTrend} />
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800/80 p-3 sm:p-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            By category
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Task volume across categories for the current filters.
          </p>
          <div className="mt-4">
            <CategoryBarsChart items={summary.byCategory} />
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800/80 p-3 sm:p-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Status mix
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Share of each status inside the filtered set.
          </p>
          <div className="mt-4">
            <StatusDonutChart items={summary.byStatus} />
          </div>
        </div>
      </div>
    </section>
  );
}
