import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

export const seedCategories: Category[] = [
  { id: "cat-work", name: "Work", color: "#3b82f6" },
  { id: "cat-personal", name: "Personal", color: "#22c55e" },
  { id: "cat-shopping", name: "Shopping", color: "#f97316" },
];

export const seedTasks: Task[] = [
  {
    id: "task-1",
    title: "Review project requirements",
    description: "Read through the challenge brief and outline the MVP scope.",
    status: "done",
    categoryId: "cat-work",
    createdAt: "2026-08-10T09:00:00.000Z",
    updatedAt: "2026-08-10T10:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Set up application architecture",
    description: "Create types, services, layout shell, and placeholder pages.",
    status: "in_progress",
    categoryId: "cat-work",
    createdAt: "2026-08-10T10:30:00.000Z",
    updatedAt: "2026-08-10T11:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and coffee.",
    status: "todo",
    categoryId: "cat-shopping",
    createdAt: "2026-08-10T08:00:00.000Z",
    updatedAt: "2026-08-10T08:00:00.000Z",
  },
];
