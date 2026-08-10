import {
  CATEGORY_COLOR_NAMES,
  isCategoryColorName,
} from "@/lib/constants/category";
import type { CategoryColorName } from "@/lib/types/category";

export interface CategoryInput {
  name: string;
  color: CategoryColorName | "";
}

export interface CategoryFormErrors {
  name?: string;
  color?: string;
}

export function parseCategoryFormData(formData: FormData): CategoryInput {
  const color = String(formData.get("color") ?? "").trim();

  return {
    name: String(formData.get("name") ?? ""),
    color: isCategoryColorName(color) ? color : "",
  };
}

export function validateCategoryInput(input: CategoryInput): CategoryFormErrors {
  const errors: CategoryFormErrors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!input.color) {
    errors.color = `Choose one of the available colors: ${CATEGORY_COLOR_NAMES.join(", ")}.`;
  }

  return errors;
}

export function hasValidationErrors(errors: CategoryFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
