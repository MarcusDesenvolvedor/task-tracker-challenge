import {
  TASK_STATUS_LABELS,
  TASK_STATUS_SUMMARY_LABELS,
} from "@/lib/constants/task";
import { formatDateTime } from "@/lib/format/date";
import type { TaskStatus } from "@/lib/types/task";
import {
  describeFilters,
  type AnalyticsExportContext,
} from "./analytics-report";
import { buildExportFilename, downloadBlob } from "./download";

function escapeCsv(value: string | number): string {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function rowsToCsv(rows: Array<Array<string | number>>): string {
  return rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
}

export function buildAnalyticsCsv(context: AnalyticsExportContext): string {
  const exportedAt = context.exportedAt ?? new Date();
  const filterLabels = describeFilters(context.filters, context.categories);
  const { summary } = context;

  const sections: string[] = [];

  sections.push(
    rowsToCsv([
      ["Task Tracker Analytics Report"],
      ["Exported", formatDateTime(exportedAt.toISOString())],
      [],
      ["Filters"],
      ["Date range", filterLabels.range],
      ["Category", filterLabels.category],
      ["Status", filterLabels.status],
      [],
      ["Summary"],
      ["Completed", summary.completedInRange],
      ["Created", summary.createdInRange],
    ]),
  );

  sections.push(
    rowsToCsv([
      [],
      ["Completions over time"],
      ["Period", "Count"],
      ...summary.completionTrend.map((point) => [point.label, point.count]),
    ]),
  );

  sections.push(
    rowsToCsv([
      [],
      ["By category"],
      ["Category", "Count"],
      ...summary.byCategory.map((item) => [item.label, item.count]),
    ]),
  );

  sections.push(
    rowsToCsv([
      [],
      ["Status mix"],
      ["Status", "Count"],
      ...summary.byStatus.map((item) => [
        TASK_STATUS_SUMMARY_LABELS[item.id as TaskStatus],
        item.count,
      ]),
    ]),
  );

  sections.push(
    rowsToCsv([
      [],
      ["Filtered tasks"],
      ["Title", "Status", "Category", "Due", "Updated"],
      ...summary.filteredTasks.map((task) => {
        const categoryName =
          context.categories.find((category) => category.id === task.categoryId)
            ?.name ?? "Uncategorized";

        return [
          task.title,
          TASK_STATUS_LABELS[task.status],
          categoryName,
          task.dueAt ? formatDateTime(task.dueAt) : "None",
          formatDateTime(task.updatedAt),
        ];
      }),
    ]),
  );

  // BOM helps Excel open UTF-8 CSV correctly.
  return `\uFEFF${sections.join("\r\n")}`;
}

export function exportAnalyticsCsv(context: AnalyticsExportContext): void {
  const csv = buildAnalyticsCsv(context);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, buildExportFilename("task-analytics", "csv"));
}
