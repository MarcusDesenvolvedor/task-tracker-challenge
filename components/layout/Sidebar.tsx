import { TaskList } from "@/components/tasks/TaskList";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface SidebarProps {
  tasks: Task[];
  categories: Category[];
}

export function Sidebar({ tasks, categories }: SidebarProps) {
  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-4 py-5 dark:border-zinc-800">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Task Tracker
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {tasks.length} task{tasks.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <TaskList tasks={tasks} categories={categories} />
      </div>
    </aside>
  );
}
