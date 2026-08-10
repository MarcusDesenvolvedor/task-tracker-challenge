"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TaskList } from "@/components/tasks/TaskList";
import { isCategoriesSection } from "@/lib/navigation/pathnames";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface SidebarProps {
  tasks: Task[];
  categories: Category[];
}

export function Sidebar({ tasks, categories }: SidebarProps) {
  const pathname = usePathname();
  const isCategoriesActive = isCategoriesSection(pathname);
  const isNewTaskActive = pathname === "/tasks/new";

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-zinc-200 bg-white lg:h-full lg:w-80 lg:border-b-0 lg:border-r dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-4 py-4 sm:px-5 sm:py-5 dark:border-zinc-800">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href="/" className="block rounded-md focus-visible:outline-offset-4">
              <h1 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Task Tracker
              </h1>
            </Link>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {tasks.length} task{tasks.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href="/tasks/new"
            className={`inline-flex min-h-9 shrink-0 items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              isNewTaskActive
                ? "bg-zinc-700 text-white dark:bg-zinc-300 dark:text-zinc-900"
                : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            }`}
          >
            New task
          </Link>
        </div>
      </div>

      <div className="flex max-h-64 flex-1 flex-col overflow-hidden lg:max-h-none">
        <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:px-5 dark:text-zinc-400">
          Tasks
        </p>
        <div className="flex-1 overflow-y-auto pb-2">
          <TaskList tasks={tasks} categories={categories} />
        </div>
      </div>

      <div className="border-t border-zinc-200 p-3 sm:p-4 dark:border-zinc-800">
        <Link
          href="/categories"
          className={`flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isCategoriesActive
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          <GearIcon />
          Manage categories
        </Link>
      </div>
    </aside>
  );
}

function GearIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-4 w-4 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
      />
    </svg>
  );
}
