export interface CategoryInput {
  name: string;
  color: string;
}

export interface CategoryFormErrors {
  name?: string;
  color?: string;
}

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export function parseCategoryFormData(formData: FormData): CategoryInput {
  return {
    name: String(formData.get("name") ?? ""),
    color: String(formData.get("color") ?? ""),
  };
}

export function validateCategoryInput(input: CategoryInput): CategoryFormErrors {
  const errors: CategoryFormErrors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!input.color.trim()) {
    errors.color = "Color is required.";
  } else if (!HEX_COLOR_PATTERN.test(input.color.trim())) {
    errors.color = "Color must be a valid hex value (for example, #3b82f6).";
  }

  return errors;
}

export function hasValidationErrors(errors: CategoryFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
