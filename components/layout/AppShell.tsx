import { MainContent } from "@/components/layout/MainContent";
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
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <Sidebar tasks={tasks} categories={categories} />
      <MainContent>{children}</MainContent>
    </div>
  );
}
