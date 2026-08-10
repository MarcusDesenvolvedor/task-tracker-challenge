import { getStore } from "@/lib/data/store";
import type { Category } from "@/lib/types/category";

export function getCategories(): Category[] {
  const { categories } = getStore();
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
}

export function getCategoryById(id: string): Category | undefined {
  const { categories } = getStore();
  return categories.find((category) => category.id === id);
}
