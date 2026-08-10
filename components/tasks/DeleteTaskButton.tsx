"use client";

import { useTransition } from "react";
import { deleteTaskAction } from "@/lib/actions/tasks";
import { Button } from "@/components/ui/Button";

interface DeleteTaskButtonProps {
  taskId: string;
  taskTitle: string;
}

export function DeleteTaskButton({ taskId, taskTitle }: DeleteTaskButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${taskTitle}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteTaskAction(taskId);
    });
  }

  return (
    <Button
      type="button"
      variant="danger"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
