import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";
import { seedCategories, seedTasks } from "./seed";

interface Store {
  tasks: Task[];
  categories: Category[];
}

const globalStore = globalThis as typeof globalThis & {
  __taskTrackerStore?: Store;
};

function createStore(): Store {
  return {
    tasks: structuredClone(seedTasks),
    categories: structuredClone(seedCategories),
  };
}

export function getStore(): Store {
  if (!globalStore.__taskTrackerStore) {
    globalStore.__taskTrackerStore = createStore();
  }

  return globalStore.__taskTrackerStore;
}
