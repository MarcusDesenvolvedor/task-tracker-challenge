import { getStore } from "@/lib/data/store";
import {
  assertCategoryCanBeDeleted,
} from "@/lib/rules/deletion";
import type { Category } from "@/lib/types/category";
import {
  hasValidationErrors,
  type CategoryInput,
  validateCategoryInput,
} from "@/lib/validation/category";

export class CategoryValidationError extends Error {
  constructor(public errors: ReturnType<typeof validateCategoryInput>) {
    super("Category validation failed.");
    this.name = "CategoryValidationError";
  }
}

export class CategoryNotFoundError extends Error {
  constructor(id: string) {
    super(`Category not found: ${id}`);
    this.name = "CategoryNotFoundError";
  }
}

export { CategoryInUseError } from "@/lib/rules/deletion";

function createCategoryId(): string {
  return `cat-${crypto.randomUUID()}`;
}

export function getCategories(): Category[] {
  const { categories } = getStore();
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
}

export function getCategoryById(id: string): Category | undefined {
  const { categories } = getStore();
  return categories.find((category) => category.id === id);
}

export function getCategoryTaskCount(categoryId: string): number {
  const { tasks } = getStore();
  return tasks.filter((task) => task.categoryId === categoryId).length;
}

export function createCategory(input: CategoryInput): Category {
  const errors = validateCategoryInput(input);
  if (hasValidationErrors(errors) || !input.color) {
    throw new CategoryValidationError(errors);
  }

  const category: Category = {
    id: createCategoryId(),
    name: input.name.trim(),
    color: input.color,
  };

  getStore().categories.push(category);
  return category;
}

export function updateCategory(id: string, input: CategoryInput): Category {
  const errors = validateCategoryInput(input);
  if (hasValidationErrors(errors) || !input.color) {
    throw new CategoryValidationError(errors);
  }

  const { categories } = getStore();
  const index = categories.findIndex((category) => category.id === id);

  if (index === -1) {
    throw new CategoryNotFoundError(id);
  }

  const updatedCategory: Category = {
    ...categories[index],
    name: input.name.trim(),
    color: input.color,
  };

  categories[index] = updatedCategory;
  return updatedCategory;
}

export function deleteCategory(id: string): void {
  const { categories, tasks } = getStore();
  const index = categories.findIndex((category) => category.id === id);

  if (index === -1) {
    throw new CategoryNotFoundError(id);
  }

  const taskCount = tasks.filter((task) => task.categoryId === id).length;
  assertCategoryCanBeDeleted(taskCount);

  categories.splice(index, 1);
}
