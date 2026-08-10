import { MainContent } from "@/components/layout/MainContent";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface AppShellProps {
  tasks: Task[];
  categories: Category[];
  children: React.ReactNode;
}

export function AppShell({ tasks, categories, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <Sidebar tasks={tasks} categories={categories} />
      <MainContent>
        <RouteTransition>{children}</RouteTransition>
      </MainContent>
    </div>
  );
}
