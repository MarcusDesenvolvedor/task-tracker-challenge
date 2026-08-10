"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BellIcon } from "@/components/ui/BellIcon";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/format/date";
import {
  processDueTaskNotifications,
  requestNotificationPermission,
} from "@/lib/notifications/due-tasks";
import {
  clearNotificationHistory,
  markAllNotificationsRead,
  readNotificationHistory,
} from "@/lib/notifications/storage";
import type { AppNotification } from "@/lib/notifications/types";
import type { Task } from "@/lib/types/task";

interface NotificationBellProps {
  tasks: Task[];
}

const CHECK_INTERVAL_MS = 30_000;

const KIND_LABELS: Record<AppNotification["kind"], string> = {
  due_soon: "Due soon",
  overdue: "Overdue",
};

export function NotificationBell({ tasks }: NotificationBellProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isRequesting, setIsRequesting] = useState(false);

  const refreshHistory = useCallback(() => {
    setNotifications(readNotificationHistory());
  }, []);

  const runDueCheck = useCallback(() => {
    const showBrowserNotifications =
      typeof Notification !== "undefined" &&
      Notification.permission === "granted";

    processDueTaskNotifications(tasks, { showBrowserNotifications });
    refreshHistory();
  }, [tasks, refreshHistory]);

  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }

    refreshHistory();
    runDueCheck();

    const intervalId = window.setInterval(runDueCheck, CHECK_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [refreshHistory, runDueCheck]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  async function handleToggle() {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      runDueCheck();
      setNotifications(markAllNotificationsRead());
    }
  }

  async function handleEnableNotifications() {
    setIsRequesting(true);

    try {
      const result = await requestNotificationPermission();
      setPermission(result);

      if (result === "granted") {
        runDueCheck();
      }
    } finally {
      setIsRequesting(false);
    }
  }

  function handleClear() {
    clearNotificationHistory();
    setNotifications([]);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
          isOpen
            ? "border-border-strong bg-accent-soft text-foreground"
            : "border-border bg-surface-elevated text-muted-foreground hover:border-border-strong hover:text-foreground"
        }`}
      >
        <BellIcon />
        {unreadCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400" />
        ) : null}
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Notifications"
          className="popover-enter absolute right-0 top-full z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-2xl shadow-[var(--shadow)]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="mt-0.5 text-xs text-muted">
                Due soon and overdue task alerts
              </p>
            </div>
            {notifications.length > 0 ? (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md px-2 py-1 text-xs text-muted transition-colors hover:bg-accent-soft hover:text-muted-foreground"
              >
                Clear
              </button>
            ) : null}
          </div>

          {permission !== "granted" ? (
            <div className="border-b border-border px-4 py-3">
              <p className="text-xs leading-5 text-muted-foreground">
                {permission === "denied"
                  ? "Browser notifications are blocked. You can still see alerts here."
                  : "Allow notifications to get alerts when tasks are due."}
              </p>
              {permission === "default" ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleEnableNotifications}
                  disabled={isRequesting}
                  className="mt-2 min-h-8 px-3 text-xs"
                >
                  {isRequesting ? "Requesting…" : "Enable notifications"}
                </Button>
              ) : null}
            </div>
          ) : null}

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted">
                No notifications yet.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <Link
                      href={`/tasks/${notification.taskId}`}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 transition-colors hover:bg-accent-soft/70"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wide ${
                            notification.kind === "overdue"
                              ? "text-red-400"
                              : "text-amber-400"
                          }`}
                        >
                          {KIND_LABELS[notification.kind]}
                        </span>
                        <time className="text-[10px] text-muted">
                          {formatDateTime(notification.createdAt)}
                        </time>
                      </div>
                      <p className="mt-1 truncate text-sm font-medium text-foreground">
                        {notification.taskTitle}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        Due {formatDateTime(notification.dueAt)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
