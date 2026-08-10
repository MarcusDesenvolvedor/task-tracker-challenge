"use client";

import { useState, useTransition } from "react";
import { deleteCategoryAction } from "@/lib/actions/categories";
import { Button } from "@/components/ui/Button";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export function DeleteCategoryButton({ categoryId }: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this category? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      const result = await deleteCategoryAction(categoryId);

      if (result?.message) {
        setErrorMessage(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        type="button"
        variant="danger"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
      {errorMessage ? (
        <p className="max-w-xs text-right text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
