export class CategoryInUseError extends Error {
  constructor(public taskCount: number) {
    super(getCategoryDeletionBlockMessage(taskCount));
    this.name = "CategoryInUseError";
  }
}

export function categoryHasReferencingTasks(taskCount: number): boolean {
  return taskCount > 0;
}

export function getCategoryDeletionBlockMessage(taskCount: number): string {
  return `Cannot delete this category because ${taskCount} task${
    taskCount === 1 ? "" : "s"
  } still reference it. Reassign or delete those tasks first.`;
}

export function getCategoryDeletionBlockReason(taskCount: number): string | null {
  if (!categoryHasReferencingTasks(taskCount)) {
    return null;
  }

  return getCategoryDeletionBlockMessage(taskCount);
}

export function assertCategoryCanBeDeleted(taskCount: number): void {
  if (categoryHasReferencingTasks(taskCount)) {
    throw new CategoryInUseError(taskCount);
  }
}
