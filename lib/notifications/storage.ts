import type { AppNotification } from "./types";

const HISTORY_KEY = "task-tracker:notification-history";
const FIRED_KEY = "task-tracker:notification-fired";
const MAX_HISTORY = 30;

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readNotificationHistory(): AppNotification[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as AppNotification[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeNotificationHistory(
  notifications: AppNotification[],
): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(notifications.slice(0, MAX_HISTORY)),
  );
}

export function prependNotifications(
  incoming: AppNotification[],
): AppNotification[] {
  if (incoming.length === 0) {
    return readNotificationHistory();
  }

  const existing = readNotificationHistory();
  const next = [...incoming, ...existing].slice(0, MAX_HISTORY);
  writeNotificationHistory(next);
  return next;
}

export function markAllNotificationsRead(): AppNotification[] {
  const next = readNotificationHistory().map((item) => ({
    ...item,
    read: true,
  }));
  writeNotificationHistory(next);
  return next;
}

export function clearNotificationHistory(): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(HISTORY_KEY);
}

export function readFiredNotificationKeys(): Set<string> {
  if (!canUseStorage()) {
    return new Set();
  }

  try {
    const raw = window.localStorage.getItem(FIRED_KEY);
    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function writeFiredNotificationKeys(keys: Set<string>): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(FIRED_KEY, JSON.stringify([...keys]));
}

export function notificationDedupeKey(
  taskId: string,
  kind: AppNotification["kind"],
  dueAt: string,
): string {
  return `${taskId}:${kind}:${dueAt}`;
}
