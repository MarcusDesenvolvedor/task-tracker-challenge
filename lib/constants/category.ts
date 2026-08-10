import type { CategoryColorName } from "@/lib/types/category";

export const CATEGORY_COLOR_NAMES: CategoryColorName[] = [
  "blue",
  "yellow",
  "red",
  "green",
  "orange",
  "purple",
  "pink",
];

export const CATEGORY_COLOR_LABELS: Record<CategoryColorName, string> = {
  blue: "Blue",
  yellow: "Yellow",
  red: "Red",
  green: "Green",
  orange: "Orange",
  purple: "Purple",
  pink: "Pink",
};

export const CATEGORY_COLOR_HEX: Record<CategoryColorName, string> = {
  blue: "#3b82f6",
  yellow: "#eab308",
  red: "#ef4444",
  green: "#22c55e",
  orange: "#f97316",
  purple: "#a855f7",
  pink: "#ec4899",
};

export const DEFAULT_CATEGORY_COLOR: CategoryColorName = "blue";

export function isCategoryColorName(value: string): value is CategoryColorName {
  return (CATEGORY_COLOR_NAMES as string[]).includes(value);
}

/** Guards against stored values that predate the predefined palette. */
function resolveCategoryColor(color: string): CategoryColorName {
  return isCategoryColorName(color) ? color : DEFAULT_CATEGORY_COLOR;
}

export function getCategoryColorHex(color: CategoryColorName): string {
  return CATEGORY_COLOR_HEX[resolveCategoryColor(color)];
}

export function getCategoryColorLabel(color: CategoryColorName): string {
  return CATEGORY_COLOR_LABELS[resolveCategoryColor(color)];
}
