import { beforeEach, describe, expect, it } from "vitest";
import { CategoryInUseError } from "@/lib/rules/deletion";
import { resetStore } from "@/lib/test/reset-store";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategoryTaskCount,
} from "./categories";
import { createTask } from "./tasks";

beforeEach(() => {
  resetStore();
});

describe("deleteCategory", () => {
  it("throws CategoryInUseError when tasks still reference the category", () => {
    const category = createCategory({ name: "Blocked", color: "red" });
    createTask({
      title: "Linked task",
      description: "",
      status: "todo",
      categoryId: category.id,
      dueAt: null,
    });

    expect(getCategoryTaskCount(category.id)).toBe(1);
    expect(() => deleteCategory(category.id)).toThrow(CategoryInUseError);

    try {
      deleteCategory(category.id);
    } catch (error) {
      expect(error).toBeInstanceOf(CategoryInUseError);
      expect((error as CategoryInUseError).taskCount).toBe(1);
      expect((error as CategoryInUseError).message).toContain(
        "1 task still reference",
      );
    }

    expect(getCategoryById(category.id)).toBeDefined();
  });

  it("deletes a category when it has no linked tasks", () => {
    const category = createCategory({ name: "Unused", color: "yellow" });

    expect(getCategoryTaskCount(category.id)).toBe(0);
    expect(() => deleteCategory(category.id)).not.toThrow();
    expect(getCategoryById(category.id)).toBeUndefined();
  });
});
