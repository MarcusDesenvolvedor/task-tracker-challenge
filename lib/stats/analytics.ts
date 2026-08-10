import { getLocalDateKey } from "@/lib/format/date";
import type { Category } from "@/lib/types/category";
import type { Task, TaskStatus } from "@/lib/types/task";

export type AnalyticsDateRange = "7d" | "30d" | "90d" | "all";

export interface AnalyticsFilters {
  range: AnalyticsDateRange;
  categoryId: string | "all";
  status: TaskStatus | "all";
}

export interface TrendPoint {
  key: string;
  label: string;
  count: number;
}

export interface NamedCount {
  id: string;
  label: string;
  count: number;
  color: string;
}

export interface AnalyticsSummary {
  filteredTasks: Task[];
  completedInRange: number;
  createdInRange: number;
  completionTrend: TrendPoint[];
  byCategory: NamedCount[];
  byStatus: NamedCount[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function startOfLocalDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getRangeStart(
  range: AnalyticsDateRange,
  now = new Date(),
): Date | null {
  if (range === "all") {
    return null;
  }

  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  return startOfLocalDay(addDays(now, -(days - 1)));
}

export function isTimestampInRange(
  iso: string,
  rangeStart: Date | null,
  now = new Date(),
): boolean {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime()) || date.getTime() > now.getTime()) {
    return false;
  }

  if (!rangeStart) {
    return true;
  }

  return date.getTime() >= rangeStart.getTime();
}

function matchesCategoryAndStatus(
  task: Task,
  filters: AnalyticsFilters,
): boolean {
  if (filters.categoryId !== "all" && task.categoryId !== filters.categoryId) {
    return false;
  }

  if (filters.status !== "all" && task.status !== filters.status) {
    return false;
  }

  return true;
}

export function filterTasks(
  tasks: Task[],
  filters: AnalyticsFilters,
  now = new Date(),
): Task[] {
  const rangeStart = getRangeStart(filters.range, now);

  return tasks.filter((task) => {
    if (!matchesCategoryAndStatus(task, filters)) {
      return false;
    }

    return (
      isTimestampInRange(task.createdAt, rangeStart, now) ||
      isTimestampInRange(task.updatedAt, rangeStart, now)
    );
  });
}

function buildDailyKeys(rangeStart: Date, now: Date): string[] {
  const keys: string[] = [];
  let cursor = startOfLocalDay(rangeStart);
  const end = startOfLocalDay(now);

  while (cursor.getTime() <= end.getTime()) {
    keys.push(getLocalDateKey(cursor));
    cursor = addDays(cursor, 1);
  }

  return keys;
}

function buildWeeklyKeys(rangeStart: Date, now: Date): string[] {
  const keys: string[] = [];
  let cursor = startOfLocalDay(rangeStart);
  const end = startOfLocalDay(now);

  while (cursor.getTime() <= end.getTime()) {
    keys.push(getLocalDateKey(cursor));
    cursor = addDays(cursor, 7);
  }

  return keys;
}

function weekStartKey(iso: string, rangeStart: Date): string {
  const date = startOfLocalDay(new Date(iso));
  const start = startOfLocalDay(rangeStart);
  const diffDays = Math.floor((date.getTime() - start.getTime()) / DAY_MS);
  const weekIndex = Math.max(0, Math.floor(diffDays / 7));
  return getLocalDateKey(addDays(start, weekIndex * 7));
}

/**
 * Completions use `updatedAt` on done tasks as the completion timestamp, since
 * the store does not keep a separate completedAt field.
 */
export function buildCompletionTrend(
  tasks: Task[],
  range: AnalyticsDateRange,
  now = new Date(),
): TrendPoint[] {
  let rangeStart = getRangeStart(range, now);

  if (!rangeStart) {
    const doneDates = tasks
      .filter((task) => task.status === "done")
      .map((task) => new Date(task.updatedAt).getTime())
      .filter((time) => !Number.isNaN(time));

    rangeStart =
      doneDates.length > 0
        ? startOfLocalDay(new Date(Math.min(...doneDates)))
        : startOfLocalDay(addDays(now, -29));
  }

  const useDaily = range === "7d";
  const keys = useDaily
    ? buildDailyKeys(rangeStart, now)
    : buildWeeklyKeys(rangeStart, now);

  const counts = Object.fromEntries(keys.map((key) => [key, 0])) as Record<
    string,
    number
  >;

  for (const task of tasks) {
    if (task.status !== "done") {
      continue;
    }

    if (!isTimestampInRange(task.updatedAt, rangeStart, now)) {
      continue;
    }

    const key = useDaily
      ? getLocalDateKey(task.updatedAt)
      : weekStartKey(task.updatedAt, rangeStart);

    if (key in counts) {
      counts[key] += 1;
    }
  }

  return keys.map((key) => ({
    key,
    label: shortDateFormatter.format(new Date(`${key}T12:00:00`)),
    count: counts[key] ?? 0,
  }));
}

export function countCompletedInRange(
  tasks: Task[],
  range: AnalyticsDateRange,
  now = new Date(),
): number {
  const rangeStart = getRangeStart(range, now);

  return tasks.filter(
    (task) =>
      task.status === "done" &&
      isTimestampInRange(task.updatedAt, rangeStart, now),
  ).length;
}

export function buildCategoryCounts(
  tasks: Task[],
  categories: Category[],
): NamedCount[] {
  return categories
    .map((category) => ({
      id: category.id,
      label: category.name,
      count: tasks.filter((task) => task.categoryId === category.id).length,
      color: category.color,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function buildStatusCounts(tasks: Task[]): NamedCount[] {
  const statuses: TaskStatus[] = ["todo", "in_progress", "done"];

  return statuses.map((status) => ({
    id: status,
    label: status,
    count: tasks.filter((task) => task.status === status).length,
    color: status,
  }));
}

export function buildAnalyticsSummary(
  tasks: Task[],
  categories: Category[],
  filters: AnalyticsFilters,
  now = new Date(),
): AnalyticsSummary {
  const filteredTasks = filterTasks(tasks, filters, now);
  const rangeStart = getRangeStart(filters.range, now);

  // Completions stay category/date scoped so the trend remains useful while
  // browsing status slices.
  const categoryScoped = tasks.filter(
    (task) =>
      filters.categoryId === "all" || task.categoryId === filters.categoryId,
  );

  return {
    filteredTasks,
    completedInRange: countCompletedInRange(categoryScoped, filters.range, now),
    createdInRange: tasks.filter(
      (task) =>
        matchesCategoryAndStatus(task, filters) &&
        isTimestampInRange(task.createdAt, rangeStart, now),
    ).length,
    completionTrend: buildCompletionTrend(
      categoryScoped,
      filters.range,
      now,
    ),
    byCategory: buildCategoryCounts(filteredTasks, categories),
    byStatus: buildStatusCounts(filteredTasks),
  };
}
