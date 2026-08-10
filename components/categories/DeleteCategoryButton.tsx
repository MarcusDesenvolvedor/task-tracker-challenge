"use client";

import { useState, useTransition, type MouseEvent as ReactMouseEvent } from "react";
import { deleteCategoryAction } from "@/lib/actions/categories";
import { Button } from "@/components/ui/Button";

interface DeleteCategoryButtonProps {
  categoryId: string;
  categoryName: string;
  blockReason?: string | null;
}

interface TooltipPosition {
  x: number;
  y: number;
}

export function DeleteCategoryButton({
  categoryId,
  categoryName,
  blockReason,
}: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(
    null,
  );
  const isBlocked = Boolean(blockReason);
  const tooltipMessage = blockReason ?? errorMessage;

  function handleDelete() {
    if (isBlocked) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${categoryName}"?\n\nThis action cannot be undone.`,
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

  function updateTooltipPosition(event: ReactMouseEvent<HTMLSpanElement>) {
    if (!tooltipMessage) {
      return;
    }

    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function hideTooltip() {
    setTooltipPosition(null);
  }

  return (
    <>
      <span
        className="relative inline-flex"
        onMouseEnter={updateTooltipPosition}
        onMouseMove={updateTooltipPosition}
        onMouseLeave={hideTooltip}
      >
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          disabled={isPending || isBlocked}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </span>
      {tooltipMessage && tooltipPosition ? (
        <span
          role="tooltip"
          className="pointer-events-none fixed z-50 w-max max-w-xs -translate-x-1/2 rounded-lg bg-zinc-900 px-3 py-2 text-center text-xs leading-5 text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y + 16,
          }}
        >
          {tooltipMessage}
        </span>
      ) : null}
    </>
  );
}
