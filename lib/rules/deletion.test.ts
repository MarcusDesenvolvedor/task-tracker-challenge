import { describe, expect, it } from "vitest";
import {
  assertCategoryCanBeDeleted,
  CategoryInUseError,
  categoryHasReferencingTasks,
  getCategoryDeletionBlockReason,
} from "./deletion";

describe("category deletion rules", () => {
  it("detects when a category has referencing tasks", () => {
    expect(categoryHasReferencingTasks(0)).toBe(false);
    expect(categoryHasReferencingTasks(1)).toBe(true);
    expect(categoryHasReferencingTasks(3)).toBe(true);
  });

  it("returns a block reason only when tasks remain", () => {
    expect(getCategoryDeletionBlockReason(0)).toBeNull();
    expect(getCategoryDeletionBlockReason(2)).toContain(
      "2 tasks still reference",
    );
  });

  it("throws CategoryInUseError when taskCount is greater than zero", () => {
    expect(() => assertCategoryCanBeDeleted(1)).toThrow(CategoryInUseError);
    expect(() => assertCategoryCanBeDeleted(4)).toThrow(CategoryInUseError);
  });

  it("allows deletion when taskCount is zero", () => {
    expect(() => assertCategoryCanBeDeleted(0)).not.toThrow();
  });
});
