"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CategoryInUseError,
  CategoryNotFoundError,
  CategoryValidationError,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/services/categories";
import {
  hasValidationErrors,
  parseCategoryFormData,
  type CategoryFormErrors,
  validateCategoryInput,
} from "@/lib/validation/category";

export interface CategoryActionState {
  errors?: CategoryFormErrors;
  message?: string;
}

export async function createCategoryAction(
  _prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const input = parseCategoryFormData(formData);
  const errors = validateCategoryInput(input);

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  let category;

  try {
    category = createCategory(input);
  } catch (error) {
    if (error instanceof CategoryValidationError) {
      return { errors: error.errors };
    }

    return { message: "Unable to create category. Please try again." };
  }

  revalidatePath("/", "layout");
  revalidatePath("/categories");
  redirect(`/categories/${category.id}`);
}

export async function updateCategoryAction(
  categoryId: string,
  _prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const input = parseCategoryFormData(formData);
  const errors = validateCategoryInput(input);

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  try {
    updateCategory(categoryId, input);
  } catch (error) {
    if (error instanceof CategoryValidationError) {
      return { errors: error.errors };
    }

    if (error instanceof CategoryNotFoundError) {
      return { message: "This category no longer exists." };
    }

    return { message: "Unable to update category. Please try again." };
  }

  revalidatePath("/", "layout");
  revalidatePath("/categories");
  revalidatePath(`/categories/${categoryId}`);
  return {};
}

export async function deleteCategoryAction(
  categoryId: string,
): Promise<CategoryActionState> {
  try {
    deleteCategory(categoryId);
  } catch (error) {
    if (error instanceof CategoryNotFoundError) {
      redirect("/categories");
    }

    if (error instanceof CategoryInUseError) {
      return {
        message: `Cannot delete this category because ${error.taskCount} task${
          error.taskCount === 1 ? "" : "s"
        } still use it.`,
      };
    }

    throw error;
  }

  revalidatePath("/", "layout");
  revalidatePath("/categories");
  redirect("/categories");
}
