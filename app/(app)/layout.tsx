import { AppShell } from "@/components/layout/AppShell";
import { getCategories } from "@/lib/services/categories";
import { getTasks } from "@/lib/services/tasks";

export default function AppLayout({ children }: LayoutProps<"/">) {
  const tasks = getTasks();
  const categories = getCategories();

  return (
    <AppShell tasks={tasks} categories={categories}>
      {children}
    </AppShell>
  );
}
