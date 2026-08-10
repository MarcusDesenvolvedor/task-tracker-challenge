import { ContentPanel } from "@/components/layout/ContentPanel";
import { OverviewAnalytics } from "@/components/overview/analytics/OverviewAnalytics";
import { CategoryBreakdown } from "@/components/overview/CategoryBreakdown";
import { CategoryProgress } from "@/components/overview/CategoryProgress";
import { DashboardPanel } from "@/components/overview/DashboardPanel";
import { OverviewGreeting } from "@/components/overview/OverviewGreeting";
import { PriorityTasks } from "@/components/overview/PriorityTasks";
import { StatCard } from "@/components/overview/StatCard";
import { TaskStatusBar } from "@/components/overview/TaskStatusBar";
import {
  TASK_STATUS_COLOR_HEX,
  TASK_STATUS_OPTIONS,
  TASK_STATUS_SUMMARY_LABELS,
} from "@/lib/constants/task";
import {
  getCategories,
  getCategoryTaskCount,
} from "@/lib/services/categories";
import { getTasks } from "@/lib/services/tasks";
import { summarizeCategoryProgress } from "@/lib/stats/category-progress";
import { getPriorityTasks } from "@/lib/stats/priority";
import { summarizeTasksByStatus } from "@/lib/stats/tasks";

const STAT_CARD_STAGGER_MS = 60;

export default function OverviewPage() {
  const tasks = getTasks();
  const summary = summarizeTasksByStatus(tasks);
  const priorityTasks = getPriorityTasks(tasks);
  const categories = getCategories();
  const categoryProgress = summarizeCategoryProgress(categories, tasks);
  const taskCountByCategoryId = Object.fromEntries(
    categories.map((category) => [
      category.id,
      getCategoryTaskCount(category.id),
    ]),
  );

  return (
    <ContentPanel wide>
      <OverviewGreeting />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total tasks" value={summary.total} />
        {TASK_STATUS_OPTIONS.map((status, index) => (
          <StatCard
            key={status}
            label={TASK_STATUS_SUMMARY_LABELS[status]}
            value={summary.counts[status]}
            accentColor={TASK_STATUS_COLOR_HEX[status]}
            delayMs={(index + 1) * STAT_CARD_STAGGER_MS}
          />
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4">
        <OverviewAnalytics tasks={tasks} categories={categories} />

        <DashboardPanel title="Priority tasks" delayMs={180}>
          <PriorityTasks tasks={priorityTasks} categories={categories} />
        </DashboardPanel>

        <DashboardPanel title="Category progress" delayMs={210}>
          <CategoryProgress items={categoryProgress} />
        </DashboardPanel>

        <DashboardPanel title="Task distribution" delayMs={240}>
          <TaskStatusBar summary={summary} />
        </DashboardPanel>

        <DashboardPanel title="By category" delayMs={300}>
          <CategoryBreakdown
            categories={categories}
            taskCountByCategoryId={taskCountByCategoryId}
          />
        </DashboardPanel>
      </div>
    </ContentPanel>
  );
}
