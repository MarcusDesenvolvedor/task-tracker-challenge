import { ContentHeader } from "@/components/layout/ContentHeader";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { CategoryBreakdown } from "@/components/overview/CategoryBreakdown";
import { DashboardPanel } from "@/components/overview/DashboardPanel";
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
import { summarizeTasksByStatus } from "@/lib/stats/tasks";

const STAT_CARD_STAGGER_MS = 60;

export default function OverviewPage() {
  const tasks = getTasks();
  const summary = summarizeTasksByStatus(tasks);
  const categories = getCategories();
  const taskCountByCategoryId = Object.fromEntries(
    categories.map((category) => [
      category.id,
      getCategoryTaskCount(category.id),
    ]),
  );

  return (
    <ContentPanel wide>
      <ContentHeader
        eyebrow="Dashboard"
        title="Overview"
        description="A quick summary of where all of your tasks currently stand."
      />

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
