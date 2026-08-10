import { formatDateTime } from "@/lib/format/date";
import type { Task } from "@/lib/types/task";
import {
  notificationDedupeKey,
  prependNotifications,
  readFiredNotificationKeys,
  writeFiredNotificationKeys,
} from "./storage";
import type { AppNotification, AppNotificationKind } from "./types";

/** Warn when a task is due within this window. */
export const DUE_SOON_WINDOW_MS = 60 * 60 * 1000;

export interface DueNotificationCandidate {
  task: Task;
  kind: AppNotificationKind;
  dueAt: string;
}

export function getDueNotificationCandidates(
  tasks: Task[],
  now = new Date(),
): DueNotificationCandidate[] {
  const nowMs = now.getTime();
  const candidates: DueNotificationCandidate[] = [];

  for (const task of tasks) {
    if (task.status === "done" || !task.dueAt) {
      continue;
    }

    const dueMs = new Date(task.dueAt).getTime();

    if (Number.isNaN(dueMs)) {
      continue;
    }

    if (dueMs <= nowMs) {
      candidates.push({ task, kind: "overdue", dueAt: task.dueAt });
      continue;
    }

    if (dueMs - nowMs <= DUE_SOON_WINDOW_MS) {
      candidates.push({ task, kind: "due_soon", dueAt: task.dueAt });
    }
  }

  return candidates.sort(
    (a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime(),
  );
}

export function buildNotificationMessage(
  candidate: DueNotificationCandidate,
): { title: string; body: string } {
  if (candidate.kind === "overdue") {
    return {
      title: "Task overdue",
      body: `"${candidate.task.title}" was due ${formatDateTime(candidate.dueAt)}.`,
    };
  }

  return {
    title: "Task due soon",
    body: `"${candidate.task.title}" is due at ${formatDateTime(candidate.dueAt)}.`,
  };
}

export function createAppNotification(
  candidate: DueNotificationCandidate,
  now = new Date(),
): AppNotification {
  return {
    id: crypto.randomUUID(),
    taskId: candidate.task.id,
    taskTitle: candidate.task.title,
    kind: candidate.kind,
    dueAt: candidate.dueAt,
    createdAt: now.toISOString(),
    read: false,
  };
}

/**
 * Creates in-app history entries (and optional browser notifications) for any
 * due-soon/overdue tasks that have not already been fired for the same dueAt.
 */
export function processDueTaskNotifications(
  tasks: Task[],
  options: { showBrowserNotifications: boolean; now?: Date } = {
    showBrowserNotifications: false,
  },
): AppNotification[] {
  const now = options.now ?? new Date();
  const fired = readFiredNotificationKeys();
  const created: AppNotification[] = [];

  for (const candidate of getDueNotificationCandidates(tasks, now)) {
    const key = notificationDedupeKey(
      candidate.task.id,
      candidate.kind,
      candidate.dueAt,
    );

    if (fired.has(key)) {
      continue;
    }

    fired.add(key);
    const notification = createAppNotification(candidate, now);
    created.push(notification);

    if (
      options.showBrowserNotifications &&
      typeof Notification !== "undefined" &&
      Notification.permission === "granted"
    ) {
      const message = buildNotificationMessage(candidate);
      try {
        new Notification(message.title, {
          body: message.body,
          tag: key,
        });
      } catch {
        // Some browsers block Notification construction outside service workers.
      }
    }
  }

  if (created.length > 0) {
    writeFiredNotificationKeys(fired);
    prependNotifications(created);
  }

  return created;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof Notification === "undefined") {
    return "denied";
  }

  if (Notification.permission !== "default") {
    return Notification.permission;
  }

  return Notification.requestPermission();
}
