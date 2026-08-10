import { beforeEach, describe, expect, it } from "vitest";
import { resetStore } from "@/lib/test/reset-store";
import type { TaskInput } from "@/lib/validation/task";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategoryTaskCount,
} from "./categories";
import {
  createTask,
  deleteTask,
  getTaskById,
  TaskNotFoundError,
  TaskValidationError,
  updateTask,
} from "./tasks";

const validInput = (overrides: Partial<TaskInput> = {}): TaskInput => ({
  title: "  Draft release notes  ",
  description: "  Collect changelog items.  ",
  status: "todo",
  categoryId: "cat-work",
  dueAt: null,
  ...overrides,
});

beforeEach(() => {
  resetStore();
});

describe("createTask", () => {
  it("creates a task with trimmed fields, category, timestamps, and dueAt", () => {
    const dueAt = "2026-08-10T15:00:00.000Z";
    const before = Date.now();

    const task = createTask(
      validInput({
        dueAt,
        status: "in_progress",
      }),
    );

    const after = Date.now();

    expect(task.id).toMatch(/^task-/);
    expect(task.title).toBe("Draft release notes");
    expect(task.description).toBe("Collect changelog items.");
    expect(task.status).toBe("in_progress");
    expect(task.categoryId).toBe("cat-work");
    expect(task.dueAt).toBe(dueAt);
    expect(task.createdAt).toBe(task.updatedAt);
    expect(new Date(task.createdAt).getTime()).toBeGreaterThanOrEqual(before);
    expect(new Date(task.createdAt).getTime()).toBeLessThanOrEqual(after);
    expect(getTaskById(task.id)).toEqual(task);
  });

  it("rejects a missing title", () => {
    expect(() => createTask(validInput({ title: "   " }))).toThrow(
      TaskValidationError,
    );

    try {
      createTask(validInput({ title: "" }));
    } catch (error) {
      expect(error).toBeInstanceOf(TaskValidationError);
      expect((error as TaskValidationError).errors.title).toBe(
        "Title is required.",
      );
    }
  });

  it("rejects a missing category id", () => {
    expect(() => createTask(validInput({ categoryId: "" }))).toThrow(
      TaskValidationError,
    );

    try {
      createTask(validInput({ categoryId: "" }));
    } catch (error) {
      expect(error).toBeInstanceOf(TaskValidationError);
      expect((error as TaskValidationError).errors.categoryId).toBe(
        "Category is required.",
      );
    }
  });

  it("rejects an unknown category id", () => {
    expect(() =>
      createTask(validInput({ categoryId: "cat-does-not-exist" })),
    ).toThrow(TaskValidationError);

    try {
      createTask(validInput({ categoryId: "cat-does-not-exist" }));
    } catch (error) {
      expect(error).toBeInstanceOf(TaskValidationError);
      expect((error as TaskValidationError).errors.categoryId).toBe(
        "Selected category is not available.",
      );
    }
  });
});

describe("updateTask", () => {
  it("updates fields, bumps updatedAt, and preserves id and createdAt", async () => {
    const created = createTask(validInput());
    const originalCreatedAt = created.createdAt;

    await new Promise((resolve) => setTimeout(resolve, 5));

    const updated = updateTask(
      created.id,
      validInput({
        title: "Final release notes",
        description: "Ready for publish.",
        status: "done",
        categoryId: "cat-personal",
        dueAt: "2026-08-11T12:00:00.000Z",
      }),
    );

    expect(updated.id).toBe(created.id);
    expect(updated.createdAt).toBe(originalCreatedAt);
    expect(updated.title).toBe("Final release notes");
    expect(updated.description).toBe("Ready for publish.");
    expect(updated.status).toBe("done");
    expect(updated.categoryId).toBe("cat-personal");
    expect(updated.dueAt).toBe("2026-08-11T12:00:00.000Z");
    expect(new Date(updated.updatedAt).getTime()).toBeGreaterThan(
      new Date(originalCreatedAt).getTime(),
    );
  });

  it("throws TaskNotFoundError for a missing task id", () => {
    expect(() => updateTask("task-missing", validInput())).toThrow(
      TaskNotFoundError,
    );
  });

  it("rejects invalid input", () => {
    const created = createTask(validInput());

    expect(() =>
      updateTask(created.id, validInput({ title: "" })),
    ).toThrow(TaskValidationError);
  });
});

describe("assigning categories", () => {
  it("persists a valid category on create", () => {
    const task = createTask(validInput({ categoryId: "cat-shopping" }));

    expect(task.categoryId).toBe("cat-shopping");
    expect(getCategoryById("cat-shopping")).toBeDefined();
    expect(getCategoryTaskCount("cat-shopping")).toBeGreaterThanOrEqual(1);
  });

  it("switches a task to another existing category on update", () => {
    const task = createTask(validInput({ categoryId: "cat-work" }));
    const workCountBefore = getCategoryTaskCount("cat-work");
    const personalCountBefore = getCategoryTaskCount("cat-personal");

    const updated = updateTask(
      task.id,
      validInput({ categoryId: "cat-personal" }),
    );

    expect(updated.categoryId).toBe("cat-personal");
    expect(getCategoryTaskCount("cat-work")).toBe(workCountBefore - 1);
    expect(getCategoryTaskCount("cat-personal")).toBe(personalCountBefore + 1);
  });

  it("rejects assigning a non-existent category on update", () => {
    const task = createTask(validInput());

    expect(() =>
      updateTask(task.id, validInput({ categoryId: "cat-missing" })),
    ).toThrow(TaskValidationError);
  });
});

describe("deleteTask with categories", () => {
  it("allows deleting a task that has a category", () => {
    const task = createTask(validInput({ categoryId: "cat-work" }));

    expect(() => deleteTask(task.id)).not.toThrow();
    expect(getTaskById(task.id)).toBeUndefined();
  });

  it("reduces category task count so an emptied category can be deleted", () => {
    const category = createCategory({ name: "Ephemeral", color: "pink" });
    const task = createTask(
      validInput({
        title: "Only task",
        categoryId: category.id,
      }),
    );

    expect(getCategoryTaskCount(category.id)).toBe(1);
    expect(() => deleteCategory(category.id)).toThrow();

    deleteTask(task.id);

    expect(getCategoryTaskCount(category.id)).toBe(0);
    expect(() => deleteCategory(category.id)).not.toThrow();
    expect(getCategoryById(category.id)).toBeUndefined();
  });
});
