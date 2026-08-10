export function getSelectedTaskId(pathname: string): string | undefined {
  const match = pathname.match(/^\/tasks\/([^/]+)/);
  const taskId = match?.[1];

  if (!taskId || taskId === "new") {
    return undefined;
  }

  return taskId;
}

export function isCategoriesSection(pathname: string): boolean {
  return pathname.startsWith("/categories");
}

export function isOverviewRoute(pathname: string): boolean {
  return pathname === "/";
}
