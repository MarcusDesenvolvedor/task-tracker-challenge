"use client";

import { useState } from "react";
import { TaskList } from "@/components/tasks/TaskList";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

const TASK_LIST_ID = "sidebar-all-tasks";

interface SidebarTaskSectionProps {
  tasks: Task[];
  categories: Category[];
}

export function SidebarTaskSection({
  tasks,
  categories,
}: SidebarTaskSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-3 pt-4">
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          aria-controls={TASK_LIST_ID}
          className={`flex min-h-10 w-full items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
            isExpanded
              ? "border-zinc-700 bg-zinc-900 text-white"
              : "border-transparent text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-300"
          }`}
        >
          <ChevronDownIcon
            className={`transition-transform duration-200 ease-out ${
              isExpanded ? "" : "-rotate-90"
            }`}
          />
          <span className="flex-1 text-left">All tasks</span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] tabular-nums transition-colors ${
              isExpanded ? "bg-zinc-800 text-zinc-200" : "bg-zinc-900 text-zinc-500"
            }`}
          >
            {tasks.length}
          </span>
        </button>
      </div>

      <div
        id={TASK_LIST_ID}
        inert={!isExpanded}
        className="grid min-h-0 transition-[grid-template-rows,opacity] duration-200 ease-out lg:flex-1"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="max-h-72 min-h-0 overflow-y-auto py-2 lg:max-h-none">
          <TaskList tasks={tasks} categories={categories} />
        </div>
      </div>
    </div>
  );
}
