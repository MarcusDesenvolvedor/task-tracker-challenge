"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTaskSection } from "@/components/layout/SidebarTaskSection";
import { HomeIcon } from "@/components/ui/HomeIcon";
import {
  isCategoriesSection,
  isOverviewRoute,
} from "@/lib/navigation/pathnames";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface SidebarProps {
  tasks: Task[];
  categories: Category[];
}

function navItemClassName(isActive: boolean): string {
  return `flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-zinc-900 text-white"
      : "text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
  }`;
}

export function Sidebar({ tasks, categories }: SidebarProps) {
  const pathname = usePathname();
  const isCategoriesActive = isCategoriesSection(pathname);
  const isOverviewActive = isOverviewRoute(pathname);
  const isNewTaskActive = pathname === "/tasks/new";

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-zinc-800 bg-black lg:h-full lg:w-72 lg:border-b-0 lg:border-r xl:w-80">
      <div className="shrink-0 border-b border-zinc-800 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href="/"
              className="block rounded-md focus-visible:outline-offset-4"
            >
              <h1 className="truncate text-lg font-semibold text-white">
                Task Tracker
              </h1>
            </Link>
            <p className="mt-1 text-sm text-zinc-500">
              {tasks.length} task{tasks.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href="/tasks/new"
            className={`inline-flex min-h-8 shrink-0 items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isNewTaskActive
                ? "bg-zinc-700 text-white"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            New task
          </Link>
        </div>
      </div>

      <nav aria-label="Main" className="shrink-0 px-3 pt-3">
        <Link
          href="/"
          aria-current={isOverviewActive ? "page" : undefined}
          className={navItemClassName(isOverviewActive)}
        >
          <HomeIcon />
          Overview
        </Link>
      </nav>

      <SidebarTaskSection tasks={tasks} categories={categories} />

      <nav
        aria-label="Secondary"
        className="mt-auto shrink-0 border-t border-zinc-800 p-3"
      >
        <Link
          href="/categories"
          aria-current={isCategoriesActive ? "page" : undefined}
          className={navItemClassName(isCategoriesActive)}
        >
          <GearIcon />
          Manage categories
        </Link>
        <div className="mt-1 flex min-h-10 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400">
          <span
            aria-hidden
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-white"
          >
            D
          </span>
          Developer Profile
        </div>
      </nav>
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
