"use client";

import { useTransition } from "react";
import { deleteTaskAction } from "@/lib/actions/tasks";
import { Button } from "@/components/ui/Button";

interface DeleteTaskButtonProps {
  taskId: string;
}

export function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this task? This action cannot be undone.",
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
