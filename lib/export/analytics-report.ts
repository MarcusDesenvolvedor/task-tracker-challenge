import {
  TASK_STATUS_LABELS,
  TASK_STATUS_SUMMARY_LABELS,
} from "@/lib/constants/task";
import { formatDateTime } from "@/lib/format/date";
import type {
  AnalyticsDateRange,
  AnalyticsFilters,
  AnalyticsSummary,
} from "@/lib/stats/analytics";
import type { Category } from "@/lib/types/category";
import type { TaskStatus } from "@/lib/types/task";

const RANGE_LABELS: Record<AnalyticsDateRange, string> = {
  "7d": "Last 7 days",
  "30d": "Past month",
  "90d": "Last 90 days",
  all: "All time",
};

export interface AnalyticsExportContext {
  summary: AnalyticsSummary;
  filters: AnalyticsFilters;
  categories: Category[];
  exportedAt?: Date;
}

export function describeFilters(
  filters: AnalyticsFilters,
  categories: Category[],
): {
  range: string;
  category: string;
  status: string;
} {
  const category =
    filters.categoryId === "all"
      ? "All categories"
      : (categories.find((item) => item.id === filters.categoryId)?.name ??
        "Unknown");

  const status =
    filters.status === "all"
      ? "All statuses"
      : TASK_STATUS_LABELS[filters.status];

  return {
    range: RANGE_LABELS[filters.range],
    category,
    status,
  };
}

export function buildAnalyticsReportLines(
  context: AnalyticsExportContext,
): string[] {
  const exportedAt = context.exportedAt ?? new Date();
  const filterLabels = describeFilters(context.filters, context.categories);
  const { summary } = context;
  const lines: string[] = [
    "Task Tracker Analytics Report",
    `Exported: ${formatDateTime(exportedAt.toISOString())}`,
    "",
    "Filters",
    `Date range: ${filterLabels.range}`,
    `Category: ${filterLabels.category}`,
    `Status: ${filterLabels.status}`,
    "",
    "Summary",
    `Completed: ${summary.completedInRange}`,
    `Created: ${summary.createdInRange}`,
    "",
    "Completions over time",
    "Period,Count",
  ];

  for (const point of summary.completionTrend) {
    lines.push(`${point.label},${point.count}`);
  }

  lines.push("", "By category", "Category,Count");
  for (const item of summary.byCategory) {
    lines.push(`${item.label},${item.count}`);
  }

  lines.push("", "Status mix", "Status,Count");
  for (const item of summary.byStatus) {
    const status = item.id as TaskStatus;
    lines.push(`${TASK_STATUS_SUMMARY_LABELS[status]},${item.count}`);
  }

  lines.push("", "Filtered tasks", "Title,Status,Category,Due,Updated");
  for (const task of summary.filteredTasks) {
    const categoryName =
      context.categories.find((category) => category.id === task.categoryId)
        ?.name ?? "Uncategorized";
    lines.push(
      [
        task.title,
        TASK_STATUS_LABELS[task.status],
        categoryName,
        task.dueAt ? formatDateTime(task.dueAt) : "None",
        formatDateTime(task.updatedAt),
      ].join(","),
    );
  }

  return lines;
}
