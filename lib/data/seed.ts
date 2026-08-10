import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

function atLocalHour(daysFromToday: number, hour: number, minute = 0): string {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export const seedCategories: Category[] = [
  { id: "cat-work", name: "Work", color: "blue" },
  { id: "cat-personal", name: "Personal", color: "green" },
  { id: "cat-shopping", name: "Shopping", color: "orange" },
];

export const seedTasks: Task[] = [
  {
    id: "task-1",
    title: "Review project requirements",
    description: "Read through the challenge brief and outline the MVP scope.",
    status: "done",
    categoryId: "cat-work",
    dueAt: atLocalHour(0, 12),
    createdAt: atLocalHour(-2, 9),
    updatedAt: atLocalHour(-1, 10, 30),
  },
  {
    id: "task-2",
    title: "Set up application architecture",
    description: "Create types, services, layout shell, and placeholder pages.",
    status: "in_progress",
    categoryId: "cat-work",
    dueAt: atLocalHour(0, 18),
    createdAt: atLocalHour(-1, 10, 30),
    updatedAt: atLocalHour(0, 11),
  },
  {
    id: "task-3",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and coffee.",
    status: "todo",
    categoryId: "cat-shopping",
    dueAt: atLocalHour(0, 20),
    createdAt: atLocalHour(0, 8),
    updatedAt: atLocalHour(0, 8),
  },
  {
    id: "task-4",
    title: "Prepare Q3 presentation",
    description: "Draft slides and gather metrics for the quarterly review.",
    status: "todo",
    categoryId: "cat-work",
    dueAt: atLocalHour(2, 15),
    createdAt: atLocalHour(0, 11),
    updatedAt: atLocalHour(0, 11),
  },
  {
    id: "task-5",
    title: "Ship overview dashboard",
    description: "Finish priority tasks and category progress widgets.",
    status: "done",
    categoryId: "cat-work",
    dueAt: atLocalHour(-3, 17),
    createdAt: atLocalHour(-10, 9),
    updatedAt: atLocalHour(-3, 16),
  },
  {
    id: "task-6",
    title: "Schedule dentist appointment",
    description: "Book a cleaning for next month.",
    status: "done",
    categoryId: "cat-personal",
    dueAt: atLocalHour(-8, 11),
    createdAt: atLocalHour(-14, 8),
    updatedAt: atLocalHour(-8, 10),
  },
  {
    id: "task-7",
    title: "Order household supplies",
    description: "Paper towels, detergent, and trash bags.",
    status: "done",
    categoryId: "cat-shopping",
    dueAt: atLocalHour(-12, 19),
    createdAt: atLocalHour(-18, 12),
    updatedAt: atLocalHour(-12, 18),
  },
  {
    id: "task-8",
    title: "Write weekly status update",
    description: "Summarize progress for the team standup.",
    status: "done",
    categoryId: "cat-work",
    dueAt: atLocalHour(-20, 16),
    createdAt: atLocalHour(-22, 9),
    updatedAt: atLocalHour(-20, 15),
  },
  {
    id: "task-9",
    title: "Plan weekend hike",
    description: "Pick a trail and check the weather.",
    status: "done",
    categoryId: "cat-personal",
    dueAt: atLocalHour(-25, 9),
    createdAt: atLocalHour(-28, 18),
    updatedAt: atLocalHour(-25, 8),
  },
  {
    id: "task-10",
    title: "Refactor task validation",
    description: "Centralize due date parsing helpers.",
    status: "in_progress",
    categoryId: "cat-work",
    dueAt: atLocalHour(1, 14),
    createdAt: atLocalHour(-4, 11),
    updatedAt: atLocalHour(-1, 13),
  },
];
