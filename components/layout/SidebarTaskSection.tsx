"use client";

import { useState } from "react";
import { TaskList } from "@/components/tasks/TaskList";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";
import { TASK_STATUS_LABELS, TASK_STATUS_OPTIONS } from "@/lib/constants/task";
import type { Category } from "@/lib/types/category";
import type { Task, TaskStatus } from "@/lib/types/task";

interface SidebarTaskSectionProps {
  tasks: Task[];
  categories: Category[];
}

interface TaskGroupProps {
  id: string;
  title: string;
  tasks: Task[];
  categories: Category[];
  showStatus?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function TaskGroup({
  id,
  title,
  tasks,
  categories,
  showStatus = true,
  isExpanded,
  onToggle,
}: TaskGroupProps) {
  const listId = `sidebar-tasks-${id}`;

  return (
    <div className="flex min-h-0 flex-col">
      <div className="shrink-0 px-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={listId}
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
          <span className="flex-1 text-left">{title}</span>
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
        id={listId}
        inert={!isExpanded}
        className="grid min-h-0 transition-[grid-template-rows,opacity] duration-200 ease-out"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="min-h-0 overflow-hidden py-2">
          {tasks.length === 0 ? (
            <p className="px-5 py-2 text-xs text-zinc-600">No tasks</p>
          ) : (
            <TaskList
              tasks={tasks}
              categories={categories}
              showStatus={showStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function SidebarTaskSection({
  tasks,
  categories,
}: SidebarTaskSectionProps) {
  const [openGroupId, setOpenGroupId] = useState<string | null>("all");

  const tasksByStatus = Object.fromEntries(
    TASK_STATUS_OPTIONS.map((status) => [
      status,
      tasks.filter((task) => task.status === status),
    ]),
  ) as Record<TaskStatus, Task[]>;

  function handleToggle(groupId: string) {
    setOpenGroupId((current) => (current === groupId ? null : groupId));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pt-3">
      <TaskGroup
        id="all"
        title="All tasks"
        tasks={tasks}
        categories={categories}
        showStatus
        isExpanded={openGroupId === "all"}
        onToggle={() => handleToggle("all")}
      />
      {TASK_STATUS_OPTIONS.map((status) => (
        <TaskGroup
          key={status}
          id={status}
          title={TASK_STATUS_LABELS[status]}
          tasks={tasksByStatus[status]}
          categories={categories}
          showStatus={false}
          isExpanded={openGroupId === status}
          onToggle={() => handleToggle(status)}
        />
      ))}
    </div>
  );
}
