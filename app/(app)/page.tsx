import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        title="Select a task"
        description="Choose a task from the sidebar to view its details, or create a new one to get started."
      />
      <div className="pb-10 text-center">
        <Link
          href="/tasks/new"
          className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Create task
        </Link>
      </div>
    </div>
  );
}
